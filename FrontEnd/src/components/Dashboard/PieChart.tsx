import { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format, parseISO } from "date-fns";
import { useChiTietLopHocData } from "../../hooks/useChiTietLopHocData";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AA47BC",
  "#29B6F6",
];

interface Props {
  maKhoaHoc: string;
  currentPage: number;
  itemsPerPage: number;
}

export default function StudentMonthPieChart({
  maKhoaHoc,
  currentPage,
  itemsPerPage,
}: Props) {
  const { ctlhList, loading } = useChiTietLopHocData(currentPage, itemsPerPage);

  const chartData = useMemo(() => {
    if (!ctlhList || ctlhList.length === 0)
      return [
        { month: "01/2025", count: 5 },
        { month: "02/2025", count: 8 },
        { month: "03/2025", count: 4 },
      ];

    const filtered = ctlhList.filter((ct) => ct.lopHoc.maKhoaHoc === maKhoaHoc);

    const monthMap: Record<string, number> = {};
    filtered.forEach((ct) => {
      const date = parseISO(ct.lopHoc.ngayBatDau);
      const month = format(date, "MM/yyyy");
      monthMap[month] = (monthMap[month] || 0) + 1;
    });

    return Object.entries(monthMap).map(([month, count]) => ({
      month,
      count,
    }));
  }, [ctlhList, maKhoaHoc]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      <h2 className="text-xl font-bold mb-4">Số học viên theo tháng</h2>
      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="month"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label={({ name }) => name}
            >
              {chartData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
