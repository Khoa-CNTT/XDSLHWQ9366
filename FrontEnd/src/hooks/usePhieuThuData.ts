import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { PhieuThu } from "../components/Type/Types";

export function usePhieuThuData() {
  const [phieuThus, setPhieuThus] = useState<PhieuThu[]>([]);
  const [loading, setLoading] = useState(false);

  const samplePhieuThus = useMemo<PhieuThu[]>(
    () => [
      {
        maPhieuThu: "PT001",
        noiDung: "Thu học phí",
        maNhanVien: "NV001",
        nguoiNop: "Nguyễn Văn A",
        soTien: "2000000",
        ngayThu: "2024-06-01",
        diaChi: "Hà Nội",
      },
    ],
    []
  );

  useEffect(() => {
    const fetchPhieuThus = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8080/phieuthu/all");
        setPhieuThus(response.data?.data || []);
      } catch {
        setPhieuThus([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPhieuThus();
  }, []);

  const displayPhieuThus = phieuThus.length > 0 ? phieuThus : samplePhieuThus;
  return { phieuThus: displayPhieuThus, loading };
}