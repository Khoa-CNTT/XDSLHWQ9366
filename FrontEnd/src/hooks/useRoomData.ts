import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { PhongHoc } from "../components/Type/Types";

export function usePhongHocData() {
  const [phongHocs, setPhongHocs] = useState<PhongHoc[]>([]);
  const [loading, setLoading] = useState(false);

  const samplePhongHocs = useMemo<PhongHoc[]>(
    () => [
      {
        maPhongHoc: "PH001",
        tenPhongHoc: "Phòng 101",
        soChoNgoi: 30,
        ghiChu: "",
      },
    ],
    []
  );

  useEffect(() => {
    const fetchPhongHocs = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8080/phonghoc/all");
        setPhongHocs(response.data?.data || []);
      } catch {
        setPhongHocs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPhongHocs();
  }, []);

  const displayPhongHocs = phongHocs.length > 0 ? phongHocs : samplePhongHocs;
  return { phongHocs: displayPhongHocs, loading };
}