package com.datn.controller.payment;

import com.datn.config.VNPayConfig;
import com.datn.dto.request.ThanhToanDTO;
import com.datn.dto.response.ResponseObject;
import com.datn.entity.ThanhToan;
import com.datn.repository.ThanhToanRepo;
import com.datn.service.VNPayService;
import com.datn.utils.LoaiGiaoDich;
import com.datn.utils.PhuongThucThanhToan;
import com.datn.utils.TrangThaiThanhToan;
import com.datn.utils.VNPayUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("/api/vnpay")
public class VNPayController {
    private static final Logger logger = LoggerFactory.getLogger(VNPayController.class);

    private final VNPayService vnPayService;
    private final VNPayConfig vnPayConfig;
    private final ThanhToanRepo thanhToanRepo;

    @Autowired
    public VNPayController(VNPayService vnPayService, VNPayConfig vnPayConfig, ThanhToanRepo thanhToanRepo) {
        this.vnPayService = vnPayService;
        this.vnPayConfig = vnPayConfig;
        this.thanhToanRepo = thanhToanRepo;
    }

    @PostMapping("/create")
    public ResponseObject<PaymentDTO.VNPayResponse> createPayment(
            HttpServletRequest request,
            @RequestParam("amount") String amount,
            @RequestParam(value = "bankCode", required = false) String bankCode,
            @RequestParam("maHocVien") String maHocVien,
            @RequestParam("maKhoaHoc") String maKhoaHoc,
            @RequestParam("nguoiTao") String nguoiTao) {
        try {
            // Validate amount
            long parsedAmount;
            try {
                parsedAmount = Long.parseLong(amount);
                if (parsedAmount <= 0) {
                    logger.error("Invalid amount: {}", amount);
                    return new ResponseObject<>(HttpStatus.BAD_REQUEST, "Số tiền phải lớn hơn 0", null);
                }
            } catch (NumberFormatException e) {
                logger.error("Invalid amount format: {}", amount, e);
                return new ResponseObject<>(HttpStatus.BAD_REQUEST, "Số tiền không hợp lệ", null);
            }

            // Tạo bản ghi thanh toán
            ThanhToanDTO thanhToanDTO = new ThanhToanDTO();
            thanhToanDTO.setSoTien((double) parsedAmount);
            thanhToanDTO.setPhuongThucThanhToan(PhuongThucThanhToan.VNPAY);
            thanhToanDTO.setTrangThai(TrangThaiThanhToan.CHO_XU_LY);
            thanhToanDTO.setMaHocVien(maHocVien);
            thanhToanDTO.setMaKhoaHoc(maKhoaHoc);
            thanhToanDTO.setNguoiTao(nguoiTao);
            thanhToanDTO.setLoaiGiaoDich(String.valueOf(LoaiGiaoDich.THU)); // Giả sử là giao dịch thu
            thanhToanDTO.setNgayThucHien(LocalDate.now());

            ThanhToan thanhToan;
            try {
                thanhToan = thanhToanRepo.createThanhToan(thanhToanDTO);
            } catch (IllegalArgumentException e) {
                logger.error("Failed to create transaction: {}", e.getMessage(), e);
                return new ResponseObject<>(HttpStatus.BAD_REQUEST, e.getMessage(), null);
            }

            // Gắn mã giao dịch vào request
            request.setAttribute("vnp_TxnRef", thanhToan.getMaGiaoDich());
            if (bankCode != null) {
                request.setAttribute("bankCode", bankCode);
            }

            logger.info("Created transaction: maGiaoDich={}, amount={}, maHocVien={}, maKhoaHoc={}",
                    thanhToan.getMaGiaoDich(), parsedAmount, maHocVien, maKhoaHoc);

            // Tạo URL thanh toán
            PaymentDTO.VNPayResponse response = vnPayService.createVnPayPayment(request);
            return new ResponseObject<>(HttpStatus.OK, "Tạo URL thanh toán thành công", response);
        } catch (Exception e) {
            logger.error("Error creating payment: {}", e.getMessage(), e);
            return new ResponseObject<>(HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi khi tạo thanh toán", null);
        }
    }

    @GetMapping("/return")
    public ResponseObject<PaymentDTO.VNPayResponse> payCallbackHandler(HttpServletRequest request) {
        try {
            String vnp_SecureHash = request.getParameter("vnp_SecureHash");
            Map<String, String> vnpData = VNPayUtil.getParamsWithoutHash(request);

            // Kiểm tra chữ ký
            String rawData = VNPayUtil.buildRawData(vnpData);
            String expectedHash = VNPayUtil.hmacSHA512(vnPayConfig.getSecretKey(), rawData);

            logger.debug("Callback received: vnp_TxnRef={}, vnp_ResponseCode={}, rawData={}",
                    vnpData.get("vnp_TxnRef"), vnpData.get("vnp_ResponseCode"), rawData);

            if (vnp_SecureHash == null || !expectedHash.equals(vnp_SecureHash)) {
                logger.warn("Invalid signature: expected={}, received={}", expectedHash, vnp_SecureHash);
                return new ResponseObject<>(HttpStatus.BAD_REQUEST, "Chữ ký không hợp lệ", null);
            }

            String responseCode = request.getParameter("vnp_ResponseCode");
            String txnRef = request.getParameter("vnp_TxnRef");

            if ("00".equals(responseCode)) {
                ThanhToan giaoDich = thanhToanRepo.findByMaGiaoDich(txnRef);
                if (giaoDich == null) {
                    logger.warn("Transaction not found: vnp_TxnRef={}", txnRef);
                    return new ResponseObject<>(HttpStatus.NOT_FOUND, "Không tìm thấy giao dịch", null);
                }
                if (giaoDich.getTrangThai() != TrangThaiThanhToan.CHO_XU_LY) {
                    logger.warn("Transaction already processed: vnp_TxnRef={}, status={}",
                            txnRef, giaoDich.getTrangThai());
                    return new ResponseObject<>(HttpStatus.BAD_REQUEST, "Giao dịch đã được xử lý", null);
                }

                giaoDich.setTrangThai(TrangThaiThanhToan.HOAN_THANH);
                thanhToanRepo.save(giaoDich);
                logger.info("Transaction completed: vnp_TxnRef={}", txnRef);

                return new ResponseObject<>(HttpStatus.OK, "Giao dịch thành công",
                        new PaymentDTO.VNPayResponse("00", "Giao dịch thành công", ""));
            } else {
                logger.warn("Transaction failed: vnp_TxnRef={}, responseCode={}", txnRef, responseCode);
                ThanhToan giaoDich = thanhToanRepo.findByMaGiaoDich(txnRef);
                if (giaoDich != null) {
                    giaoDich.setTrangThai(TrangThaiThanhToan.THAT_BAI);
                    thanhToanRepo.save(giaoDich);
                }
                return new ResponseObject<>(HttpStatus.BAD_REQUEST, "Giao dịch thất bại", null);
            }
        } catch (Exception e) {
            logger.error("Error processing callback: {}", e.getMessage(), e);
            return new ResponseObject<>(HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi xử lý callback", null);
        }
    }
}