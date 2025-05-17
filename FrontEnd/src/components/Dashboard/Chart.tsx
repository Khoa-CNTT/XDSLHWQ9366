import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Stat {
  day: string;
  value: number;
}

export default function DashboardChart() {
  const [data, setData] = useState<Stat[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>("2025-05");

  const demoList = useMemo<Stat[]>(
    () => [
      { day: "01", value: 150 },
      { day: "02", value: 200 },
      { day: "03", value: 400 },
      { day: "04", value: 210 },
    ],
    []
  );
  const chartData = data.length > 0 ? data : demoList;
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/stats/monthly?month=${selectedMonth}`)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, [selectedMonth]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Thống kê theo tháng</h2>

      <input
        type="month"
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
        className="mb-4 border p-2 rounded"
      />

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#3b82f6" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
