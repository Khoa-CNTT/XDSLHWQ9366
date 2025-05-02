import UserDropdown from "./UserDropdown";

const Dashboard = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

  return (
    <div>
      {/* Thanh điều hướng phía trên với dropdown tài khoản */}
      <UserDropdown />

      {/* Nội dung chính */}
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-2">
          Xin chào, {userInfo.name || "Admin"}
        </h1>
        <p className="text-gray-700">Vai trò: {userInfo.role || "Teacher"}</p>

        <div className="mt-6">
          {/* Bạn có thể đặt các nội dung dashboard tại đây */}
          Nội dung dashboard ở đây
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
