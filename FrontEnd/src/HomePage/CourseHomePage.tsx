import { useState } from "react";
import CourseCategory from "../components/Course/CourseCategory";
import CourseList from "../components/Course/CourseList";
import ExamList from "../components/Exam/ExamList";
import AccountSetting from "../components/Account/AccountSetting";
import ClassList from "../components/Class/ClassList";
import LectureList from "../components/Lecture/LectureList";
import EmployeeList from "../components/Employees/EmployeeList";
import EmployeeDetail from "../components/Employees/EmployeeDetail";
import StudentList from "../components/Student/StudentList";
import StudentDetail from "../components/Student/StudentDetail";
import Contestants from "../components/Exam/Contestants";
import Receipts from "../components/Finance/Receipts";
import Disbursements from "../components/Finance/Disbursements";
import Contacts from "../components/Contact/Contacts";
import Courses from "./HomePage";
import AddLecture from "../components/Lecture/AddLecture";
import Articles from "../components/Article/Articles";
import FieldList from "../components/Field/FieldList";
import RoleList from "../components/Role/RoleList";
import RoomList from "../components/Room/RoomList";

export default function CourseHomePage() {
  const [activeDropdown, setActiveDropdown] = useState("");
  const [isDropdownKhoaHoc, setIsDropdownKhoaHoc] = useState(false);
  const [isDropdownTaiKhoan, setIsDropdownTaiKhoan] = useState(false);
  const [isDropdownBaiViet, setIsDropdownBaiViet] = useState(false);
  const [isDropdownCuocThi, setIsDropdownCuocThi] = useState(false);
  const [isDropdownLopHoc, setIsDropdownLopHoc] = useState(false);
  const [isDropdownGiangVien, setIsDropdownGiangVien] = useState(false);
  const [isDropdownNhanVien, setIsDropdownNhanVien] = useState(false);
  const [isDropdownHocVien, setIsDropdownHocVien] = useState(false);
  const [isDropdownThuChi, setIsDropdownThuChi] = useState(false);
  const toggleDropdown = (dropdownName: string) => {
    setActiveDropdown(dropdownName);
  };

  const toggleDropdownTaiKhoan = () => {
    setIsDropdownTaiKhoan((prev) => !prev);
  };
  const toggleDropdownKhoaHoc = () => {
    setIsDropdownKhoaHoc((prev) => !prev);
  };

  const toggleDropdownBV = () => {
    setIsDropdownBaiViet((prev) => !prev);
  };
  const toggleDropdownLH = () => {
    setIsDropdownLopHoc((prev) => !prev);
  };

  const toggleDropdownGV = () => {
    setIsDropdownGiangVien((prev) => !prev);
  };
  const toggleDropdownNV = () => {
    setIsDropdownNhanVien((prev) => !prev);
  };
  const toggleDropdownHV = () => {
    setIsDropdownHocVien((prev) => !prev);
  };
  const toggleDropdownCT = () => {
    setIsDropdownCuocThi((prev) => !prev);
  };

  const toggleDropdownTC = () => {
    setIsDropdownThuChi((prev) => !prev);
  };
  const resetDropdowns = () => {
    setActiveDropdown("");
    setIsDropdownKhoaHoc(false);
    setIsDropdownGiangVien(false);
    setIsDropdownNhanVien(false);
    setIsDropdownHocVien(false);
    setIsDropdownLopHoc(false);
    setIsDropdownThuChi(false);
    setIsDropdownBaiViet(false);
    setIsDropdownCuocThi(false);
  };

  return (
    <div className=" h-full bg-gray-100">
      {/* Sidebar */}
      <div className="flex">
        <div className="w-1/5 bg-white p-4 shadow-md">
          <button
            onClick={resetDropdowns}
            className="flex w-full py-2.5 text-xl font-medium rounded-xl
            hover:bg-gray-400 items-center px-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6 inline mr-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
            Trang chủ
          </button>

          {/* Chức năng chính */}
          <div className="gap-y-1 text-sm">
            <a className="flex items-center py-4  text-orange-500 rounded-md">
              CHỨC NĂNG CHÍNH
            </a>
            <button
              onClick={() => {
                toggleDropdownKhoaHoc();
              }}
              className="w-full flex items-center justify-between px-2 py-2.5  font-medium rounded-lg hover:bg-gray-700 hover:text-white"
            >
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6 inline mr-2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                  />
                </svg>
                Khoá học trên HANTA
              </div>

              <svg
                className={`h-5 w-5 transform transition-transform duration-200
                ${isDropdownKhoaHoc ? "rotate-180" : ""}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {isDropdownKhoaHoc && (
              <div className=" bg-gray-100 rounded-md shadow-md">
                <button
                  onClick={() => toggleDropdown("danhMucKH")}
                  className="py-2  text-left pl-12 w-full rounded-md hover:bg-gray-300"
                >
                  Danh mục khoá học
                </button>
                <button
                  onClick={() => {
                    toggleDropdown("khoaHoc");
                  }}
                  className=" py-2   text-left pl-12 w-full rounded-md hover:bg-gray-300"
                >
                  Khoá học
                </button>
              </div>
            )}
          </div>

          {/*Quản lý Giảng viên */}
          <div className="gap-y-1 text-sm">
            <button
              onClick={toggleDropdownGV}
              className="w-full flex items-center justify-between px-2 py-2.5 font-medium rounded-lg hover:bg-gray-700 hover:text-white"
            >
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6 inline mr-2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
                Quản lý Giảng Viên
              </div>
              <svg
                className={`h-5 w-5 transform transition-transform duration-200
                ${isDropdownGiangVien ? "rotate-180" : ""}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {isDropdownGiangVien && (
              <div className=" bg-gray-100 rounded-md shadow-md">
                <button
                  onClick={() => toggleDropdown("danhSachGV")}
                  className="py-2  text-left pl-12 w-full rounded-md hover:bg-gray-300"
                >
                  Danh sách Giảng viên
                </button>
                <button
                  onClick={() => toggleDropdown("chiTietGV")}
                  className="py-2 text-left pl-12 w-full rounded-md hover:bg-gray-300"
                >
                  Chi tiết Giảng viên
                </button>
              </div>
            )}
          </div>

          {/*Quản lý Nhân viên */}
          <div className="gap-y-1 text-sm">
            <button
              onClick={toggleDropdownNV}
              className="w-full flex items-center justify-between px-2 py-2.5 font-medium rounded-lg hover:bg-gray-700 hover:text-white"
            >
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6 inline mr-2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
                  />
                </svg>
                Quản lý Nhân Viên
              </div>
              <svg
                className={`h-5 w-5 transform transition-transform duration-200
                ${isDropdownNhanVien ? "rotate-180" : ""}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {isDropdownNhanVien && (
              <div className=" bg-gray-100 rounded-md shadow-md">
                <button
                  onClick={() => toggleDropdown("QLNhanVien")}
                  className="py-2  text-left pl-12 w-full rounded-md hover:bg-gray-300"
                >
                  Danh sách Nhân viên
                </button>
                <button
                  onClick={() => toggleDropdown("chiTietNV")}
                  className="py-2 text-left pl-12 w-full rounded-md hover:bg-gray-300"
                >
                  Chi tiết Nhân viên
                </button>
              </div>
            )}
          </div>
          {/*Quản lý Học viên */}
          <div className="gap-y-1 text-sm">
            <button
              onClick={toggleDropdownHV}
              className="w-full flex items-center justify-between px-2 py-2.5 font-medium rounded-lg hover:bg-gray-700 hover:text-white"
            >
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6 inline mr-2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                  />
                </svg>
                Quản lý Học Viên
              </div>
              <svg
                className={`h-5 w-5 transform transition-transform duration-200
                ${isDropdownHocVien ? "rotate-180" : ""}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {isDropdownHocVien && (
              <div className=" bg-gray-100 rounded-md shadow-md">
                <button
                  onClick={() => toggleDropdown("QLHocVien")}
                  className="py-2  text-left pl-12 w-full rounded-md hover:bg-gray-300"
                >
                  Danh sách Học viên
                </button>
                <button
                  onClick={() => toggleDropdown("chiTietHV")}
                  className="py-2 text-left pl-12 w-full rounded-md hover:bg-gray-300"
                >
                  Chi tiết Học viên
                </button>
              </div>
            )}
          </div>

          {/* Quản lý lớp học */}
          <div className="gap-y-1 text-sm">
            <button
              onClick={toggleDropdownLH}
              className="w-full flex items-center justify-between px-2 py-2.5  font-medium rounded-lg hover:bg-gray-700 hover:text-white"
            >
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6 inline mr-2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
                  />
                </svg>
                Quản lý lớp, phòng học
              </div>
              <svg
                className={`h-5 w-5 transform transition-transform duration-200
                ${isDropdownLopHoc ? "rotate-180" : ""}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {isDropdownLopHoc && (
              <div className=" bg-gray-100 rounded-md shadow-md">
                <button
                  onClick={() => toggleDropdown("QLLopHoc")}
                  className="py-2  text-left pl-12 w-full rounded-md hover:bg-gray-300"
                >
                  Quản lý lớp học
                </button>
                <button
                  onClick={() => toggleDropdown("QLPhongHoc")}
                  className="py-2  text-left pl-12 w-full rounded-md hover:bg-gray-300"
                >
                  Quản lý phòng học
                </button>
              </div>
            )}
          </div>

          {/*Quản lý cuộc thi */}
          <div className="gap-y-1 text-sm">
            <button
              onClick={toggleDropdownCT}
              className="w-full flex items-center justify-between px-2 py-2.5 font-medium rounded-lg hover:bg-gray-700 hover:text-white"
            >
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6 inline mr-2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                  />
                </svg>
                Quản lý lịch thi
              </div>
              <svg
                className={`h-5 w-5 transform transition-transform duration-200
                ${isDropdownCuocThi ? "rotate-180" : ""}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {isDropdownCuocThi && (
              <div className=" bg-gray-100 rounded-md shadow-md">
                <button
                  onClick={() => toggleDropdown("danhSachLT")}
                  className="py-2  text-left pl-12 w-full rounded-md hover:bg-gray-300"
                >
                  Danh sách lịch thi
                </button>
                <button
                  onClick={() => toggleDropdown("quanLyTS")}
                  className="py-2 text-left pl-12 w-full rounded-md hover:bg-gray-300"
                >
                  Quản lý thí sinh
                </button>
              </div>
            )}
          </div>

          {/* Khác */}
          <div className="gap-y-1 text-sm">
            <a className="flex items-center py-2  text-orange-500 rounded-md">
              KHÁC
            </a>

            {/* Quản lý thu, chi */}
            <div className="gap-y-1 text-sm">
              <button
                onClick={toggleDropdownTC}
                className="w-full flex items-center justify-between px-2 py-2.5  font-medium rounded-lg hover:bg-gray-700 hover:text-white"
              >
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-6 inline mr-2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                    />
                  </svg>
                  Quản lý phiếu thu, chi
                </div>
                <svg
                  className={`h-5 w-5 transform transition-transform duration-200
                ${isDropdownThuChi ? "rotate-180" : ""}`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {isDropdownThuChi && (
                <div className=" bg-gray-100 rounded-md shadow-md">
                  <button
                    onClick={() => toggleDropdown("QLPhieuThu")}
                    className="py-2  text-left pl-12 w-full rounded-md hover:bg-gray-300"
                  >
                    Quản lý phiếu thu
                  </button>
                  <button
                    onClick={() => toggleDropdown("QLPhieuChi")}
                    className="py-2  text-left pl-12 w-full rounded-md hover:bg-gray-300"
                  >
                    Quản lý phiếu chi
                  </button>
                </div>
              )}
            </div>
            {/* Quản lý liên hệ và bài viết */}
            <div className="gap-y-1 text-sm">
              <button
                onClick={toggleDropdownBV}
                className="w-full flex items-center justify-between px-2 py-2.5  font-medium rounded-lg hover:bg-gray-700 hover:text-white"
              >
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-6 inline mr-2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"
                    />
                  </svg>
                  Quản lý liên hệ, bài viết
                </div>
                <svg
                  className={`h-5 w-5 transform transition-transform duration-200
                ${isDropdownBaiViet ? "rotate-180" : ""}`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {isDropdownBaiViet && (
                <div className=" bg-gray-100 rounded-md shadow-md">
                  <button
                    onClick={() => toggleDropdown("QLLienHe")}
                    className="py-2  text-left pl-12 w-full rounded-md hover:bg-gray-300"
                  >
                    Quản lý liên hệ
                  </button>
                  <button
                    onClick={() => toggleDropdown("QLBaiViet")}
                    className="py-2  text-left pl-12 w-full rounded-md hover:bg-gray-300"
                  >
                    Quản lý bài viết
                  </button>
                </div>
              )}
            </div>
            {/* Quản lý lĩnh vực */}
            <button
              onClick={() => toggleDropdown("QLLinhVuc")}
              className="w-full flex items-center justify-between px-2 py-2.5  font-medium rounded-lg hover:bg-gray-700 hover:text-white"
            >
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6 inline mr-2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z"
                  />
                </svg>
                Quản lý lĩnh vực
              </div>
            </button>

            {/* Quản lý chức vụ */}
            <button
              onClick={() => toggleDropdown("QLChucVu")}
              className="w-full flex items-center justify-between px-2 py-2.5  font-medium rounded-lg hover:bg-gray-700 hover:text-white"
            >
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6 inline mr-2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                  />
                </svg>
                Quản lý chức vụ
              </div>
            </button>

            {/* Quản lý tài khoản */}
            <button
              onClick={() => toggleDropdown("QLTaiKhoan")}
              className="w-full flex items-center justify-between px-2 py-2.5 font-medium rounded-lg hover:bg-gray-700 hover:text-white"
            >
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6 inline mr-2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                  />
                </svg>
                Quản lý Tài khoản
              </div>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-4/5">
          <div className="flex h-16 w-full bg-gray-50 justify-end">
            <div className="flex p-2 gap-4">
              <button
                className="flex p-2 items-center gap-2 rounded-xl border"
                onClick={() => toggleDropdownTaiKhoan()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-12"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
                <div className="flex flex-col items-start">
                  <a href="" className=" font-semibold">
                    Le Van Aaaaaaaaaaa
                  </a>
                  <a href="" className="text-sm text-gray-600">
                    Teacher
                  </a>
                </div>
                <svg
                  className={`h-5 w-5 transform transition-transform duration-200  
                ${isDropdownTaiKhoan ? "rotate-180" : ""}`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="p-2 h-full">
            {activeDropdown === "danhMucKH" && <CourseCategory />}
            {activeDropdown === "khoaHoc" && <CourseList />}

            {activeDropdown === "danhSachGV" && <LectureList />}
            {activeDropdown === "chiTietGV" && <AddLecture />}

            {activeDropdown === "QLNhanVien" && <EmployeeList />}
            {activeDropdown === "chiTietNV" && <EmployeeDetail />}

            {activeDropdown === "QLHocVien" && <StudentList />}
            {activeDropdown === "chiTietHV" && <StudentDetail />}

            {activeDropdown === "QLLopHoc" && <ClassList />}
            {activeDropdown === "QLPhongHoc" && <RoomList />}

            {activeDropdown === "danhSachLT" && <ExamList />}
            {activeDropdown === "quanLyTS" && <Contestants />}

            {activeDropdown === "QLPhieuThu" && <Receipts />}
            {activeDropdown === "QLPhieuChi" && <Disbursements />}

            {activeDropdown === "QLBaiViet" && <Articles />}
            {activeDropdown === "QLLienHe" && <Contacts />}

            {activeDropdown === "QLChucVu" && <RoleList />}
            {activeDropdown === "QLLinhVuc" && <FieldList />}

            {activeDropdown === "QLTaiKhoan" && <AccountSetting />}
            {activeDropdown === "" && <Courses />}
          </div>
        </div>
      </div>
    </div>
  );
}
