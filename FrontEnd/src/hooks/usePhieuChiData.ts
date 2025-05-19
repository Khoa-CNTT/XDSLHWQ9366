import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { PhieuChi } from "../components/Type/Types";

export function usePhieuChiData() {
  const [phieuChis, setPhieuChis] = useState<PhieuChi[]>([]);
  const [loading, setLoading] = useState(false);

  const samplePhieuChis = useMemo<PhieuChi[]>(
    () => [
      {
        maPhieuChi: "PC001",
        noiDung: "Chi tiền điện",
        maNhanVien: "NV002",
        nguoiNhan: "Nguyễn Văn B",
        soTien: "500000",
        ngayChi: "2024-06-05",
        diaChi: "Đà Nẵng",
      },
    ],
    []
  );

  useEffect(() => {
    const fetchPhieuChis = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8080/phieuchi/all");
        setPhieuChis(response.data?.data || []);
      } catch {
        setPhieuChis([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPhieuChis();
  }, []);

  const displayPhieuChis = phieuChis.length > 0 ? phieuChis : samplePhieuChis;
  return { phieuChis: displayPhieuChis, loading };
}