import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Course } from "../components/Type/Types";

export function useCourseData(itemsPerPage = 10, currentPage = 1) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);

  // Dữ liệu mẫu
  const sampleCourses = useMemo<Course[]>  (
    () => [
      {
        maKhoaHoc: "KH001",
        tenKhoaHoc: "Fullstack Web Development",
        maLinhVuc: "LV01",
        soBuoi: 20,
        hocPhi: 3000000,
        noiDung: `
        - Introduction to web development and client-server model
        - Basic to advanced HTML
        - CSS and responsive design
        - JavaScript ES6+, DOM manipulation
        - Basic ReactJS: components, state, props, hooks
        - Backend connection via REST API
        - Final project: build an e-commerce website
      `,
        ghichu:
          "Suitable for beginners who want to become fullstack developers.",
      },
      {
        maKhoaHoc: "KH002",
        tenKhoaHoc: "SQL from Basic to Advanced",
        maLinhVuc: "LV02",
        soBuoi: 15,
        hocPhi: 2000000,
        noidungtomtatkhoahoc:
          "Learn how to query, analyze data, and design databases with SQL.",
        noiDung: `
        - Overview of databases and DBMS
        - SELECT, WHERE, GROUP BY, JOIN statements
        - Table creation, primary & foreign key constraints
        - Aggregate functions, subqueries, views
        - Indexes, transactions, backup & restore
        - Query optimization and basic security
      `,
        ghichu: "Requires basic computer knowledge.",
      },
      {
        maKhoaHoc: "KH003",
        tenKhoaHoc: "Mobile Development with Flutter",
        maLinhVuc: "LV03",
        soBuoi: 18,
        hocPhi: 3500000,
        noidungtomtatkhoahoc:
          "Build cross-platform mobile apps using Flutter and Dart.",
        noiDung: `
        - Setting up Flutter and Dart environment
        - Widgets, layout, and navigation
        - State management (Provider)
        - API communication and local storage
        - Firebase authentication and Firestore
        - Final project: Personal note-taking app
      `,
        ghichu: "Requires basic programming knowledge (JavaScript or Java/C#).",
      },
      {
        maKhoaHoc: "KH004",
        tenKhoaHoc: "Introduction to DevOps",
        maLinhVuc: "LV04",
        soBuoi: 12,
        hocPhi: 2500000,
        noidungtomtatkhoahoc:
          "Introduction to DevOps, CI/CD, Docker, and automation tools.",
        noiDung: `
        - Concepts and DevOps workflow
        - Git, GitHub, and source code management
        - Basic Docker and container creation
        - Jenkins, GitLab CI/CD pipelines
        - System monitoring with Prometheus and Grafana
      `,
        ghichu:
          "Recommended to have knowledge of operating systems and networking.",
      },
      {
        maKhoaHoc: "KH005",
        tenKhoaHoc: "Computer Networking from Basic to Advanced",
        maLinhVuc: "LV01",
        soBuoi: 14,
        hocPhi: 2200000,
        noidungtomtatkhoahoc:
          "Understand and configure network components: IP, routers, switches, TCP/IP, OSI model.",
        noiDung: `
        - OSI and TCP/IP models
        - IP addressing, subnetting, NAT
        - Network protocols: HTTP, FTP, DHCP, DNS
        - Router and switch setup and configuration
        - Network simulation practice with Cisco Packet Tracer
      `,
        ghichu:
          "Suitable for IT students or those preparing for networking certifications.",
      },
    ],
    []
  );

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8080/khoahoc/pagination?page=${currentPage}&size=${itemsPerPage}`
        );
        const { content } = response.data;
        setCourses(content || []);
      } catch (error) {
        setCourses([]);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [currentPage, itemsPerPage]);

  // Nếu API không trả về dữ liệu, dùng dữ liệu mẫu
  const displayCourses = courses.length > 0 ? courses : sampleCourses;

  return { courses: displayCourses, loading };
}