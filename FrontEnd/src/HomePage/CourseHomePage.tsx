import { useState } from "react";
import CourseList from "../components/Course/CourseList";
import ExamList from "../components/Exam/ExamList";
import AccountSetting from "../components/Account/AccountSetting";
import ClassList from "../components/Class/ClassList";
import LectureList from "../components/Lecture/LectureList";
import EmployeeList from "../components/Employees/EmployeeList";
import StudentList from "../components/Student/StudentList";
import Contestants from "../components/Exam/Contestants";
import Receipts from "../components/Finance/Receipts";
import Disbursements from "../components/Finance/Disbursements";
import Contacts from "../components/Contact/Contacts";
import Courses from "./HomePage";
import Articles from "../components/Article/Articles";
import FieldList from "../components/Field/FieldList";
import RoleList from "../components/Role/RoleList";
import RoomList from "../components/Room/RoomList";

export default function CourseHomePage() {
  const [activeDropdown, setActiveDropdown] = useState("");

  return (
    <div className=" h-full bg-blue-100">
      {/* Sidebar */}
      <div className="flex">
        <div className="w-1/5 bg-blue-50 p-4 shadow-md border ">
          <button
            onClick={() => setActiveDropdown("")}
            className="flex w-full py-2.5 text-xl font-medium rounded-xl bg-white
            hover:bg-blue-500 items-center px-2 border border-black hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 inline mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
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
              onClick={() => setActiveDropdown("QLKhoaHoc")}
              className="w-full flex items-center justify-between px-2 py-2.5  font-medium rounded-lg hover:bg-gray-700 hover:text-white"
            >
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6 inline mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                  />
                </svg>
                Khoá học trên HANTA
              </div>
            </button>
          </div>

          {/*Quản lý Giảng viên */}
          <div className="gap-y-1 text-sm">
            <button
              onClick={() => setActiveDropdown("QLGiangVien")}
              className="w-full flex items-center justify-between px-2 py-2.5 font-medium rounded-lg hover:bg-gray-700 hover:text-white"
            >
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6 inline mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
                Quản lý Giảng Viên
              </div>
            </button>
          </div>

          {/*Quản lý Nhân viên */}
          <div className="gap-y-1 text-sm">
            <button
              onClick={() => setActiveDropdown("QLNhanVien")}
              className="w-full flex items-center justify-between px-2 py-2.5 font-medium rounded-lg hover:bg-gray-700 hover:text-white"
            >
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6 inline mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
                  />
                </svg>
                Quản lý Nhân Viên
              </div>
            </button>
          </div>
          {/*Quản lý Học viên */}
          <div className="gap-y-1 text-sm">
            <button
              onClick={() => setActiveDropdown("QLHocVien")}
              className="w-full flex items-center justify-between px-2 py-2.5 font-medium rounded-lg hover:bg-gray-700 hover:text-white"
            >
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6 inline mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                  />
                </svg>
                Quản lý Học Viên
              </div>
            </button>
          </div>

          {/* Quản lý lớp học */}
          <div className="gap-y-1 text-sm">
            <button
              onClick={() => setActiveDropdown("QLLopHoc")}
              className="w-full flex items-center justify-between px-2 py-2.5  font-medium rounded-lg hover:bg-gray-700 hover:text-white"
            >
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6 inline mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 0 0 5.427-.63 48.05 48.05 0 0 0 .582-4.717.532.532 0 0 0-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 0 0 .658-.663 48.422 48.422 0 0 0-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 0 1-.61-.58v0Z"
                  />
                </svg>
                Quản lý lớp học
              </div>
            </button>
          </div>
          <div className="gap-y-1 text-sm">
            <button
              onClick={() => setActiveDropdown("QLPhongHoc")}
              className="w-full flex items-center justify-between px-2 py-2.5  font-medium rounded-lg hover:bg-gray-700 hover:text-white"
            >
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6 inline mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
                  />
                </svg>
                Quản lý phòng học
              </div>
            </button>
          </div>
          {/*Quản lý cuộc thi */}
          <div className="gap-y-1 text-sm">
            <button
              onClick={() => setActiveDropdown("QLLichThi")}
              className="w-full flex items-center justify-between px-2 py-2.5 font-medium rounded-lg hover:bg-gray-700 hover:text-white"
            >
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6 inline mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                  />
                </svg>
                Quản lý lịch thi
              </div>
            </button>
          </div>
          <div className="gap-y-1 text-sm">
            <button
              onClick={() => setActiveDropdown("QLThiSinh")}
              className="w-full flex items-center justify-between px-2 py-2.5 font-medium rounded-lg hover:bg-gray-700 hover:text-white"
            >
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6 inline mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                  />
                </svg>
                Quản lý thí sinh
              </div>
            </button>
          </div>
          {/* Khác */}
          <div className="gap-y-1 text-sm">
            <a className="flex items-center py-2  text-orange-500 rounded-md">
              KHÁC
            </a>

            {/* Quản lý thu, chi */}
            <div className="gap-y-1 text-sm">
              <button
                onClick={() => setActiveDropdown("QLPhieuThu")}
                className="w-full flex items-center justify-between px-2 py-2.5  font-medium rounded-lg hover:bg-gray-700 hover:text-white"
              >
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6 inline mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                    />
                  </svg>
                  Quản lý phiếu thu
                </div>
              </button>
            </div>
            <div className="gap-y-1 text-sm">
              <button
                onClick={() => setActiveDropdown("QLPhieuChi")}
                className="w-full flex items-center justify-between px-2 py-2.5  font-medium rounded-lg hover:bg-gray-700 hover:text-white"
              >
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6 inline mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                    />
                  </svg>
                  Quản lý phiếu chi
                </div>
              </button>
            </div>
            {/* Quản lý liên hệ và bài viết */}
            <div className="gap-y-1 text-sm">
              <button
                onClick={() => setActiveDropdown("QLLienHe")}
                className="w-full flex items-center justify-between px-2 py-2.5  font-medium rounded-lg hover:bg-gray-700 hover:text-white"
              >
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6 inline mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                    />
                  </svg>
                  Quản lý liên hệ
                </div>
              </button>
            </div>
            <div className="gap-y-1 text-sm">
              <button
                onClick={() => setActiveDropdown("QLBaiViet")}
                className="w-full flex items-center justify-between px-2 py-2.5  font-medium rounded-lg hover:bg-gray-700 hover:text-white"
              >
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6 inline mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"
                    />
                  </svg>
                  Quản lý bài viết
                </div>
              </button>
            </div>
            {/* Quản lý lĩnh vực */}
            <button
              onClick={() => setActiveDropdown("QLLinhVuc")}
              className="w-full flex items-center justify-between px-2 py-2.5  font-medium rounded-lg hover:bg-gray-700 hover:text-white"
            >
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6 inline mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z"
                  />
                </svg>
                Quản lý lĩnh vực
              </div>
            </button>

            {/* Quản lý chức vụ */}
            <button
              onClick={() => setActiveDropdown("QLChucVu")}
              className="w-full flex items-center justify-between px-2 py-2.5  font-medium rounded-lg hover:bg-gray-700 hover:text-white"
            >
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6 inline mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                  />
                </svg>
                Quản lý chức vụ
              </div>
            </button>

            {/* Quản lý tài khoản */}
            <button
              onClick={() => setActiveDropdown("QLTaiKhoan")}
              className="w-full flex items-center justify-between px-2 py-2.5 font-medium rounded-lg hover:bg-gray-700 hover:text-white"
            >
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6 inline mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
                Quản lý Tài khoản
              </div>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-4/5">
          <div className="flex h-16 w-full bg-blue-200 justify-end">
            <div className="flex p-2 gap-2">
              <div className="flex p-2 items-center bg-blue-100 gap-2 rounded border">
                <div className="flex flex-col items-start">
                  <p className=" font-semibold">Hello Lê Đức Thảo</p>
                  <p className="text-sm text-gray-600">Teacher</p>
                </div>
              </div>
              <button className="p-2 bg-white border rounded-md hover:bg-blue-500 hover:text-white">
                Đăng xuất
              </button>
            </div>
          </div>
          <div className="p-2 h-full">
            {activeDropdown === "QLKhoaHoc" && <CourseList />}

            {activeDropdown === "QLGiangVien" && <LectureList />}

            {activeDropdown === "QLNhanVien" && <EmployeeList />}

            {activeDropdown === "QLHocVien" && <StudentList />}

            {activeDropdown === "QLLopHoc" && <ClassList />}
            {activeDropdown === "QLPhongHoc" && <RoomList />}

            {activeDropdown === "QLLichThi" && <ExamList />}
            {activeDropdown === "QLThiSinh" && <Contestants />}

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
