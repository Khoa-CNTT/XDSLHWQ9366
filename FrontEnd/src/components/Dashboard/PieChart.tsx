import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#020617", "#ff8f00", "#00897b", "#d81b60", "#1e88e5"];

export default function UserRolePieChart() {
  const [data, setData] = useState([]);

  const demoList = useMemo(
    () => [
      {
        role: "Admin",
        count: 2,
      },
      {
        role: "Lecture",
        count: 10,
      },
      {
        role: "Finance",
        count: 4,
      },
      {
        role: "Student",
        count: 40,
      },
    ],
    []
  );
  const chartData = data.length > 0 ? data : demoList;
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/stats/users/roles")
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      <h2 className="text-xl font-bold mb-4">Tỉ lệ vai trò người dùng</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="count"
            nameKey="role"
            cx="50%"
            cy="50%"
            outerRadius={120}
          >
            {chartData.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
