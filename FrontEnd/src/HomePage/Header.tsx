import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/Account/AuthContext";
import logo from "../assets/Logo.png";

function Header() {
  const { isLoggedIn, user, role, logout } = useAuth();
  const navigate = useNavigate();
  console.log("User:", user);
  console.log("Role:", role);

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  return (
    <div>
      <div className="flex h-16 w-full bg-orange-300 px-4 items-center justify-between">
        <button
          className="h-12 flex items-center gap-2 text-xl font-medium bg-white border border-black hover:bg-blue-500 hover:text-white "
          onClick={() => navigate("/")}
        >
          <img src={logo} className="h-14 w-auto" alt="Logo" />
          {/* <span className=" text-xl font-bold text-gray-700 ">Trang chủ</span> */}
        </button>

        {/* Nút Trang chủ */}

        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <>
              <div className="flex p-2 bg-yellow-50 items-center gap-2 rounded-xl border ">
                <div className="flex flex-col items-start ">
                  <p className="font-semibold">Hello {user}</p>
                  <p className="text-sm text-gray-600">{role}</p>
                </div>
              </div>
              <button
                className="p-2 bg-white border rounded-md hover:bg-blue-500 hover:text-white"
                onClick={handleLogout}
              >
                Đăng xuất
              </button>
            </>
          ) : (
            <button
              className="p-2 bg-white border rounded-md hover:bg-blue-500 hover:text-white"
              onClick={() => navigate("/signin")}
            >
              Đăng nhập
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
