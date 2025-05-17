import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function UserMonthlyChart() {
  const [data, setData] = useState([]);

  const demoList = useMemo(
    () => [
      {
        month: "2025-01",
        count: 2,
      },
      {
        month: "2025-02",
        count: 10,
      },
      {
        month: "2025-03",
        count: 4,
      },
      {
        month: "2025-04",
        count: 20,
      },
    ],
    []
  );
  const chartData = data.length > 0 ? data : demoList;
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/stats/users/count-by-month")
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      <h2 className="text-xl font-bold mb-4">Số lượng người dùng theo tháng</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#60a5fa" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
