package com.datn.service;

import com.datn.config.VNPayConfig;
import com.datn.controller.payment.PaymentDTO;
import com.datn.utils.VNPayUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.TreeMap;

@Service
public class VNPayService {
    private static final Logger logger = LoggerFactory.getLogger(VNPayService.class);

    private final VNPayConfig vnPayConfig;

    @Autowired
    public VNPayService(VNPayConfig vnPayConfig) {
        this.vnPayConfig = vnPayConfig;
    }

    public PaymentDTO.VNPayResponse createVnPayPayment(HttpServletRequest request) {
        try {
            String amountStr = request.getParameter("amount");
            String bankCode = request.getParameter("bankCode");
            String vnp_TxnRef = (String) request.getAttribute("vnp_TxnRef");

            if (vnp_TxnRef == null || vnp_TxnRef.isEmpty()) {
                logger.error("Missing vnp_TxnRef in request");
                throw new IllegalArgumentException("Mã giao dịch không được để trống");
            }

            long amount;
            try {
                amount = Long.parseLong(amountStr) * 100L;
                if (amount <= 0) {
                    logger.error("Invalid amount: {}", amountStr);
                    throw new IllegalArgumentException("Số tiền phải lớn hơn 0");
                }
            } catch (NumberFormatException e) {
                logger.error("Invalid amount format: {}", amountStr, e);
                throw new IllegalArgumentException("Số tiền không hợp lệ");
            }

            Map<String, String> vnpParamsMap = new TreeMap<>(vnPayConfig.getVNPayConfig());
            vnpParamsMap.put("vnp_Amount", String.valueOf(amount));
            vnpParamsMap.put("vnp_TxnRef", vnp_TxnRef);
            if (bankCode != null && !bankCode.isEmpty()) {
                vnpParamsMap.put("vnp_BankCode", bankCode);
            }
            vnpParamsMap.put("vnp_IpAddr", VNPayUtil.getIpAddress(request));

            logger.debug("VNPay params: {}", vnpParamsMap);

            String queryUrl = VNPayUtil.getPaymentURL(vnpParamsMap, true);
            String hashData = VNPayUtil.getPaymentURL(vnpParamsMap, false);
            String vnpSecureHash = VNPayUtil.hmacSHA512(vnPayConfig.getSecretKey(), hashData);
            queryUrl += "&vnp_SecureHash=" + vnpSecureHash;
            String paymentUrl = vnPayConfig.getVnp_PayUrl() + "?" + queryUrl;

            logger.info("Generated payment URL: {}", paymentUrl);

            return PaymentDTO.VNPayResponse.builder()
                    .code("ok")
                    .message("success")
                    .paymentUrl(paymentUrl)
                    .build();
        } catch (Exception e) {
            logger.error("Error creating VNPay payment URL: {}", e.getMessage(), e);
            throw e;
        }
    }
}