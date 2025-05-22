import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useMemo } from "react";
import { usePhieuThuData } from "../../hooks/usePhieuThuData";
import { usePhieuChiData } from "../../hooks/usePhieuChiData";

// Hàm convert YYYY-MM-DD -> MM/yyyy
const getMonthYear = (dateStr: string) => {
  const d = new Date(dateStr);
  return `${d.getMonth() + 1}/${d.getFullYear()}`;
};

export default function ThuChiChart() {
  const { phieuThus } = usePhieuThuData();
  const { phieuChis } = usePhieuChiData();

  const data = useMemo(() => {
    const map: Record<string, { month: string; thu: number; chi: number }> = {};

    phieuThus.forEach((pt) => {
      const key = getMonthYear(pt.ngayThu);
      const soTien = parseFloat(pt.soTien);
      if (!map[key]) {
        map[key] = { month: key, thu: 0, chi: 0 };
      }
      map[key].thu += isNaN(soTien) ? 0 : soTien;
    });

    phieuChis.forEach((pc) => {
      const key = getMonthYear(pc.ngayChi);
      const soTien = parseFloat(pc.soTien);
      if (!map[key]) {
        map[key] = { month: key, thu: 0, chi: 0 };
      }
      map[key].chi += isNaN(soTien) ? 0 : soTien;
    });

    // Sắp xếp theo tháng tăng dần
    return Object.values(map).sort((a, b) => {
      const [m1, y1] = a.month.split("/").map(Number);
      const [m2, y2] = b.month.split("/").map(Number);
      return y1 !== y2 ? y1 - y2 : m1 - m2;
    });
  }, [phieuThus, phieuChis]);

  return (
    <div className="w-full h-[400px] p-2 bg-white shadow-md rounded-lg">
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-500 to-blue-400 rounded-t-lg">
        <h2 className="text-lg font-semibold mb-4 ">Biểu đồ thu chi</h2>
      </div>
      <ResponsiveContainer width="100%" height="100%" className="p-4">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="thu" fill="#82ca9d" name="Tiền Thu" />
          <Bar dataKey="chi" fill="#8884d8" name="Tiền Chi" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
