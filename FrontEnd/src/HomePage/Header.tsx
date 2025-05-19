import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/Account/AuthContext";
import TrueFocus from "./TrueFocus";

function Header() {
  const { isLoggedIn, user, role, logout } = useAuth();
  const navigate = useNavigate();
  console.log("User:", user);
  console.log("Role:", role);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
      <div className="flex h-16 w-full bg-gradient-to-r from-orange-500 to-blue-400 px-4 items-center justify-between ">
        <button
          className="h-12 flex items-center  text-xl font-medium"
          onClick={() => navigate("/")}
        >
          <TrueFocus
            sentence="HANTA Elearning"
            manualMode={false}
            blurAmount={5}
            borderColor="rgba(247, 186, 52, 0.6)"
            animationDuration={2}
            pauseBetweenAnimations={1}
          />
        </button>

        {/* Nút Trang chủ */}

        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <>
              <div className="flex px-2 py-1 bg-yellow-50 items-center gap-2 rounded-xl border">
                <div className="flex flex-col items-start ">
                  <p className="font-semibold">Hello {user}</p>
                  <p className="text-sm text-gray-600">{role}</p>
                </div>
              </div>
              <button
                className="min-w-[120px] p-2 font-medium bg-orange-400  text-gray-700 border rounded-md hover:bg-orange-500 hover:text-white hover:font-bold"
                onClick={handleLogout}
              >
                Đăng xuất
              </button>
            </>
          ) : (
            <button
              className="min-w-[120px] p-2 font-medium bg-orange-400  text-gray-700 border rounded-md hover:bg-orange-500 hover:text-white hover:font-bold"
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
