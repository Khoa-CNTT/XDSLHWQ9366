import { FaLaptopCode } from "react-icons/fa";
import { MdPhoneIphone } from "react-icons/md";
import { SiMysql } from "react-icons/si";
import { SiJenkins } from "react-icons/si";
import { FaNetworkWired } from "react-icons/fa";

const categoryItems = [
  {
    id: 1,
    title: "Lập trình Web",
    description:
      "Các khóa học lập trình web từ cơ bản đến nâng cao với HTML, CSS, JavaScript, ReactJS...",
    icon: <FaLaptopCode />,
    link: "/category/1",
    delay: 0.2,
    courses: [
      {
        id: 101,
        title: "ReactJS từ cơ bản đến nâng cao",
        description: "Học cách xây dựng ứng dụng web hiện đại bằng ReactJS.",
        image: "https://source.unsplash.com/400x300/?reactjs,code",
        link: "/courses/101",
      },
      {
        id: 102,
        title: "HTML/CSS Mastery",
        description:
          "Thành thạo giao diện web chuẩn responsive với HTML5 & CSS3.",
        image: "https://source.unsplash.com/400x300/?html,css",
        link: "/courses/102",
      },
    ],
  },
  {
    id: 2,
    title: "Lập trình Mobile",
    description:
      "Tìm hiểu cách phát triển ứng dụng di động với Flutter, React Native, hoặc Android Native.",
    icon: <MdPhoneIphone />,
    link: "/category/2",
    delay: 0.2,
    courses: [
      {
        id: 201,
        title: "Flutter cơ bản đến nâng cao",
        description: "Xây dựng ứng dụng cross-platform với Flutter.",
        image: "https://source.unsplash.com/400x300/?flutter,mobile",
        link: "/courses/201",
      },
      {
        id: 202,
        title: "React Native cho người mới bắt đầu",
        description: "Tạo app mobile sử dụng JavaScript & React Native.",
        image: "https://source.unsplash.com/400x300/?react-native",
        link: "/courses/202",
      },
    ],
  },
  {
    id: 3,
    title: "SQL",
    description:
      "Nắm vững ngôn ngữ truy vấn SQL, thiết kế CSDL và thao tác dữ liệu.",
    icon: <SiMysql />,
    link: "/category/3",
    delay: 0.2,
    courses: [
      {
        id: 301,
        title: "SQL cho người mới bắt đầu",
        description: "Học các câu truy vấn cơ bản, JOIN, GROUP BY...",
        image: "https://source.unsplash.com/400x300/?sql,database",
        link: "/courses/301",
      },
    ],
  },
  {
    id: 4,
    title: "DevOps & CI/CD",
    description:
      "Khám phá công cụ và quy trình DevOps hiện đại như Jenkins, Docker, CI/CD pipelines.",
    icon: <SiJenkins />,
    link: "/category/4",
    delay: 0.2,
    courses: [
      {
        id: 401,
        title: "DevOps Fundamentals",
        description: "Làm quen với các khái niệm, tools trong DevOps.",
        image: "https://source.unsplash.com/400x300/?devops,ci-cd",
        link: "/courses/401",
      },
    ],
  },
  {
    id: 5,
    title: "Mạng máy tính",
    description:
      "Hiểu rõ cơ chế hoạt động của mạng, TCP/IP, subnetting, routing...",
    icon: <FaNetworkWired />,
    link: "/category/5",
    delay: 0.2,
    courses: [
      {
        id: 501,
        title: "Networking cơ bản",
        description: "Các kiến thức nền tảng về mạng máy tính.",
        image: "https://source.unsplash.com/400x300/?network,computer",
        link: "/courses/501",
      },
    ],
  },
];

export default categoryItems;
