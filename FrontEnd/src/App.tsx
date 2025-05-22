import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddLecture from "./components/Lecture/AddLecture";
import LectureList from "./components/Lecture/LectureList";
import LectureDetail from "./components/Lecture/LectureDetail";
import Sidebar from "./HomePage/SideBar";
import Header from "./HomePage/Header";
import HomePage from "./HomePage/HomePage";
import EmployeeList from "./components/Employees/EmployeeList";
import AddEmployee from "./components/Employees/AddEmployee";
import EmployeeDetail from "./components/Employees/EmployeeDetail";
import StudentList from "./components/Student/StudentList";
import StudentDetail from "./components/Student/StudentDetail";
import RoomList from "./components/Room/RoomList";
import RoomDetail from "./components/Room/RoomDetail";
import ExamList from "./components/Exam/ExamList";
import ExamDetail from "./components/Exam/ExamDetail";
import AddStudent from "./components/Student/AddStudent";
import AddRoom from "./components/Room/AddRoom";
import AddExam from "./components/Exam/AddExam";
import CourseList from "./components/Course/CourseList";
import AddCourse from "./components/Course/AddCourse";
import CourseDetail from "./components/Course/CourseDetail";
import Contestants from "./components/Exam/Contestants";
import AddContestant from "./components/Exam/AddContestant";
import ContestantDetail from "./components/Exam/ContestantDetail";
import Disbursements from "./components/Finance/Disbursements";
import AddDisbursement from "./components/Finance/AddDisbursement";
import DisbursementDetail from "./components/Finance/DisbursementDetail";
import Receipts from "./components/Finance/Receipts";
import AddReceipt from "./components/Finance/AddReceipt";
import ReceiptDetail from "./components/Finance/ReceiptDetail";
import Contacts from "./components/Contact/Contacts";
import AddContact from "./components/Contact/AddContact";
import ContactDetail from "./components/Contact/ContactDetail";
import Articles from "./components/Article/Articles";
import ArticleDetail from "./components/Article/ArticleDetail";
import AddArticle from "./components/Article/AddArticle";
import FieldList from "./components/Field/FieldList";
import AddField from "./components/Field/AddField";
import FieldDetail from "./components/Field/FieldDetail";
import RoleList from "./components/Role/RoleList";
import AddRole from "./components/Role/AddRole";
import RoleDetail from "./components/Role/RoleDetail";
import ClassList from "./components/Class/ClassList";
import AddClass from "./components/Class/AddClass";
import ClassDetail from "./components/Class/ClassDetail";
import SignIn from "./components/Account/SignIn";
import ForgotPassword from "./components/Account/ForgotPass";
import UserList from "./components/User/UserList";
import AddUser from "./components/User/AddUser";
import UserDetail from "./components/User/UserDetail";
import { AuthProvider } from "./components/Account/AuthContext";
import AccountSettings from "./components/Account/AccountSetting";
import Dashboard from "./components/Dashboard/Dashboard";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "./components/Account/useAuth";
import CTLHList from "./components/ChiTietLopHoc/CTLHList";
import CTLHDetail from "./components/ChiTietLopHoc/CTLHDetail";
import AddCTLH from "./components/ChiTietLopHoc/AddCTLH";
function AppContent() {
  const { isLoggedIn } = useAuth();
  return (
    <BrowserRouter>
      <Header />

      {isLoggedIn ? (
        <div className="flex flex-row h-screen bg-gray-100">
          <div className="w-1/5">
            <Sidebar />
          </div>
          <div className="w-full flex flex-col">
            <Routes>
              <Route path="/" element={<HomePage />} />

              <Route path="/khoahoc" element={<CourseList />} />
              <Route path="/khoahoc/add-khoahoc" element={<AddCourse />} />
              <Route
                path="/khoahoc/get-khoahoc/:id"
                element={<CourseDetail />}
              />

              <Route path="/giangvien/add-giangvien" element={<AddLecture />} />
              <Route path="/giangvien" element={<LectureList />} />
              <Route
                path="/giangvien/get-giangvien/:id"
                element={<LectureDetail />}
              />

              <Route path="/nhanvien" element={<EmployeeList />} />
              <Route path="/nhanvien/add-nhanvien" element={<AddEmployee />} />
              <Route
                path="/nhanvien/get-nhanvien/:id"
                element={<EmployeeDetail />}
              />

              <Route path="/hocvien" element={<StudentList />} />
              <Route path="/hocvien/add-hocvien" element={<AddStudent />} />
              <Route
                path="/hocvien/get-hocvien/:id"
                element={<StudentDetail />}
              />
              <Route path="/lophoc" element={<ClassList />} />
              <Route path="/lophoc/add-lophoc" element={<AddClass />} />
              <Route path="/lophoc/get-lophoc/:id" element={<ClassDetail />} />

              <Route path="/phonghoc" element={<RoomList />} />
              <Route path="/phonghoc/add-phonghoc" element={<AddRoom />} />
              <Route
                path="/phonghoc/get-phonghoc/:id"
                element={<RoomDetail />}
              />

              <Route path="/lichthi" element={<ExamList />} />
              <Route path="/lichthi/add-lichthi" element={<AddExam />} />
              <Route path="/lichthi/get-lichthi/:id" element={<ExamDetail />} />

              <Route path="/thisinh" element={<Contestants />} />
              <Route path="/thisinh/add-thisinh" element={<AddContestant />} />
              <Route
                path="/thisinh/get-thisinh/:id"
                element={<ContestantDetail />}
              />

              <Route path="/phieuthu" element={<Receipts />} />
              <Route path="/phieuthu/add-phieuthu" element={<AddReceipt />} />
              <Route
                path="/phieuthu/get-phieuthu/:id"
                element={<ReceiptDetail />}
              />

              <Route path="/phieuchi" element={<Disbursements />} />
              <Route
                path="/phieuchi/add-phieuchi"
                element={<AddDisbursement />}
              />
              <Route
                path="/phieuchi/get-phieuchi/:id"
                element={<DisbursementDetail />}
              />

              <Route path="/lienhe" element={<Contacts />} />
              <Route path="/lienhe/add-lienhe" element={<AddContact />} />
              <Route
                path="/lienhe/get-lienhe/:id"
                element={<ContactDetail />}
              />

              <Route path="/baiviet" element={<Articles />} />
              <Route path="/baiviet/add-baiviet" element={<AddArticle />} />
              <Route
                path="/baiviet/get-baiviet/:id"
                element={<ArticleDetail />}
              />

              <Route path="/linhvuc" element={<FieldList />} />
              <Route path="/linhvuc/add-linhvuc" element={<AddField />} />
              <Route
                path="/linhvuc/get-linhvuc/:id"
                element={<FieldDetail />}
              />

              <Route path="/chucvu" element={<RoleList />} />
              <Route path="/chucvu/add-chucvu" element={<AddRole />} />
              <Route path="/chucvu/get-chucvu/:id" element={<RoleDetail />} />

              <Route path="/taikhoan" element={<UserList />} />
              <Route path="/taikhoan/add-taikhoan" element={<AddUser />} />
              <Route
                path="/taikhoan/get-taikhoan/:id"
                element={<UserDetail />}
              />
              <Route path="/signin" element={<SignIn />} />
              {/* <Route path="/signup" element={<SignUp />} /> */}
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/change-password" element={<AccountSettings />} />
              <Route path="/dashboard" element={<Dashboard />} />

              <Route path="/ctlophoc" element={<CTLHList />} />
              <Route
                path="/ctlophoc/get-ctlophoc/:id"
                element={<CTLHDetail />}
              />
              <Route path="/ctlophoc/add" element={<AddCTLH />} />
            </Routes>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
