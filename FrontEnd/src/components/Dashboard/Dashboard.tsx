import DashboardChart from "./Chart";
import UserRolePieChart from "./PieChart";
import ThuChiChart from "./BarChart";

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Bảng thống kê</h1>
      <DashboardChart />
      <div className="flex gap-4">
        <UserRolePieChart />
        <ThuChiChart />
      </div>
    </div>
  );
}
