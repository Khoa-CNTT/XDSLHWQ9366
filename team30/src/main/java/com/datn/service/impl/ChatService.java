package com.datn.service.impl;

import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ChatService {

    private static class Course {
        String code;
        String name;
        String level;
        int duration;
        int price;
        String description;
        String details;
        List<String> keywords;

        Course(String code, String name, String level, int duration, int price, String description, String details, List<String> keywords) {
            this.code = code;
            this.name = name;
            this.level = level;
            this.duration = duration;
            this.price = price;
            this.description = description;
            this.details = details;
            this.keywords = keywords;
        }
    }

    // Danh sách khóa học
    private final List<Course> courses = Arrays.asList(
            new Course("KH001", "HTML & CSS Cơ bản", "LV001", 10, 1500000,
                    "Học cách tạo giao diện web cơ bản.",
                    "Nội dung chi tiết về HTML, CSS, layout, responsive.",
                    Arrays.asList("html", "css", "web", "giao diện", "responsive")),
            new Course("KH002", "JavaScript Nâng cao", "LV001", 12, 2000000,
                    "Lập trình web tương tác với JS.",
                    "DOM, AJAX, Fetch API, ES6+.",
                    Arrays.asList("javascript", "js", "web", "tương tác", "dom", "ajax", "es6")),
            new Course("KH003", "ReactJS từ cơ bản đến nâng cao", "LV001", 15, 2500000,
                    "Học ReactJS và tạo ứng dụng SPA.",
                    "Components, Props, State, Hooks, Routing.",
                    Arrays.asList("react", "reactjs", "spa", "frontend", "components", "hooks")),
            new Course("KH004", "Spring Boot Web API", "LV001", 18, 2800000,
                    "Tạo API REST với Spring Boot.",
                    "Spring MVC, JPA, Security, Swagger.",
                    Arrays.asList("spring", "spring boot", "api", "rest", "backend", "java")),
            new Course("KH005", "Flutter cơ bản", "LV002", 12, 2300000,
                    "Học Flutter và Dart để tạo ứng dụng mobile.",
                    "Widgets, Navigation, API, Firebase.",
                    Arrays.asList("flutter", "dart", "mobile", "android", "ios")),
            new Course("KH006", "React Native nâng cao", "LV002", 14, 2700000,
                    "Phát triển ứng dụng mobile đa nền tảng.",
                    "Redux, Performance, Native Modules.",
                    Arrays.asList("react native", "mobile", "redux", "android", "ios")),
            new Course("KH007", "Lập trình Android với Kotlin", "LV002", 16, 2500000,
                    "Học Android cơ bản và nâng cao.",
                    "Activity, Fragment, Room, Retrofit.",
                    Arrays.asList("android", "kotlin", "mobile", "native")),
            new Course("KH008", "Lập trình iOS với Swift", "LV002", 14, 2600000,
                    "Học lập trình ứng dụng iOS.",
                    "Storyboard, SwiftUI, CoreData.",
                    Arrays.asList("ios", "swift", "mobile", "native")),
            new Course("KH009", "SQL Cơ bản", "LV003", 8, 1200000,
                    "Học cú pháp SQL cơ bản.",
                    "SELECT, INSERT, UPDATE, DELETE.",
                    Arrays.asList("sql", "database", "query")),
            new Course("KH010", "MySQL Nâng cao", "LV003", 10, 1800000,
                    "Tối ưu và quản lý MySQL hiệu quả.",
                    "JOIN, Subquery, Indexing, Stored Procedures.",
                    Arrays.asList("mysql", "database", "query", "indexing")),
            new Course("KH011", "PostgreSQL cho Developer", "LV003", 10, 1900000,
                    "Khám phá tính năng mạnh của PostgreSQL.",
                    "CTE, JSONB, Indexes, Performance.",
                    Arrays.asList("postgresql", "database", "query", "jsonb")),
            new Course("KH012", "SQL Server từ A-Z", "LV003", 12, 2100000,
                    "Quản lý và lập trình với SQL Server.",
                    "T-SQL, View, Trigger, Function.",
                    Arrays.asList("sql server", "database", "t-sql")),
            new Course("KH013", "DevOps cơ bản với Git & Jenkins", "LV004", 10, 2000000,
                    "Hiểu quy trình CI/CD cơ bản.",
                    "Git, Jenkins, Pipeline.",
                    Arrays.asList("devops", "git", "jenkins", "ci/cd")),
            new Course("KH014", "CI/CD nâng cao với Docker & Kubernetes", "LV004", 14, 2800000,
                    "Triển khai ứng dụng với container.",
                    "Dockerfile, Helm, Ingress, Autoscaling.",
                    Arrays.asList("devops", "docker", "kubernetes", "ci/cd", "container")),
            new Course("KH015", "Giám sát hệ thống với Prometheus & Grafana", "LV004", 10, 2200000,
                    "Theo dõi và cảnh báo hiệu năng.",
                    "Metric, Dashboard, Alerting.",
                    Arrays.asList("prometheus", "grafana", "monitoring", "devops")),
            new Course("KH016", "Linux cho DevOps", "LV004", 12, 2000000,
                    "Làm việc với Linux trong môi trường DevOps.",
                    "Shell, systemctl, logs, network.",
                    Arrays.asList("linux", "devops", "shell")),
            new Course("KH017", "Mạng máy tính cơ bản", "LV005", 10, 1500000,
                    "Kiến thức nền tảng về mạng máy tính.",
                    "OSI, TCP/IP, subnet, routing.",
                    Arrays.asList("network", "mạng máy tính", "tcp/ip", "routing")),
            new Course("KH018", "An toàn mạng cho lập trình viên", "LV005", 10, 1900000,
                    "Bảo vệ ứng dụng khỏi các tấn công phổ biến.",
                    "XSS, SQL Injection, CSRF.",
                    Arrays.asList("security", "an toàn mạng", "xss", "sql injection")),
            new Course("KH019", "Ethical Hacking cơ bản", "LV005", 12, 2200000,
                    "Kỹ thuật tấn công và phòng thủ.",
                    "Recon, Exploit, Mitigation.",
                    Arrays.asList("hacking", "ethical hacking", "security")),
            new Course("KH020", "Firewall & IDS nâng cao", "LV005", 10, 2100000,
                    "Bảo vệ hệ thống với firewall và IDS.",
                    "iptables, Snort, Suricata.",
                    Arrays.asList("firewall", "ids", "security"))
    );

    private final Map<String, List<String>> domains = new HashMap<>();
    {
        domains.put("Web Development", Arrays.asList("web", "html", "css", "javascript", "js", "react", "reactjs"));
        domains.put("Backend Development", Arrays.asList("spring", "spring boot", "api", "backend", "java"));
        domains.put("Mobile Development", Arrays.asList("flutter", "dart", "android", "kotlin", "ios", "swift", "react native", "mobile"));
        domains.put("Database", Arrays.asList("sql", "mysql", "postgresql", "sql server", "database", "query"));
        domains.put("DevOps", Arrays.asList("devops", "git", "jenkins", "docker", "kubernetes", "prometheus", "grafana", "linux", "ci/cd", "monitoring"));
        domains.put("Networking & Security", Arrays.asList("network", "mạng máy tính", "security", "an toàn mạng", "hacking", "ethical hacking", "firewall", "ids"));
    }

    public String generateReply(String message) {
        message = message.toLowerCase().trim();

        // Giá
        if (message.contains("giá") || message.contains("chi phí") || message.contains("bao nhiêu tiền")) {
            for (Course course : courses) {
                for (String keyword : course.keywords) {
                    if (message.contains(keyword)) {
                        return String.format("Khóa học %s (%s) có giá %,d VND.\nChi tiết: http://localhost:8080/khoahoc/getById/%s",
                                course.name, course.code, course.price, course.code);
                    }
                }
            }
            return "Vui lòng chỉ rõ khóa học bạn muốn biết giá, ví dụ: 'Giá khóa học HTML là bao nhiêu?'";
        }

        // Thời lượng
        if (message.contains("thời lượng") || message.contains("bao lâu") || message.contains("mấy buổi")) {
            for (Course course : courses) {
                for (String keyword : course.keywords) {
                    if (message.contains(keyword)) {
                        return String.format("Khóa học %s (%s) kéo dài %d buổi.\nChi tiết: http://localhost:8080/khoahoc/getById/%s",
                                course.name, course.code, course.duration, course.code);
                    }
                }
            }
            return "Vui lòng chỉ rõ khóa học bạn muốn biết thời lượng, ví dụ: 'Thời lượng khóa học ReactJS là bao lâu?'";
        }

        // So sánh
        if (message.contains("so sánh") || message.contains("khác nhau") || message.contains("khác biệt")) {
            List<Course> matchedCourses = new ArrayList<>();
            for (Course course : courses) {
                for (String keyword : course.keywords) {
                    if (message.contains(keyword)) {
                        matchedCourses.add(course);
                        break;
                    }
                }
            }
            if (matchedCourses.size() >= 2) {
                StringBuilder response = new StringBuilder("So sánh các khóa học:\n");
                for (Course course : matchedCourses) {
                    response.append(String.format("- %s (%s): %s %s Giá: %,d VND, Thời lượng: %d buổi.\nChi tiết: http://localhost:8080/khoahoc/getById/%s\n\n",
                            course.name, course.code, course.description, course.details, course.price, course.duration, course.code));
                }
                return response.toString();
            }
            return "Vui lòng chỉ rõ các khóa học bạn muốn so sánh, ví dụ: 'So sánh HTML và ReactJS'.";
        }

        // Theo lĩnh vực
        if (message.contains("lĩnh vực") || message.contains("học gì") || message.contains("bắt đầu")) {
            for (Map.Entry<String, List<String>> domain : domains.entrySet()) {
                for (String keyword : domain.getValue()) {
                    if (message.contains(keyword)) {
                        StringBuilder response = new StringBuilder(String.format("Trong lĩnh vực %s, bạn có thể học các khóa sau:\n", domain.getKey()));
                        for (Course course : courses) {
                            if (course.keywords.stream().anyMatch(k -> domain.getValue().contains(k))) {
                                response.append(String.format("- %s (%s): %s\nChi tiết: http://localhost:8080/khoahoc/getById/%s\n",
                                        course.name, course.code, course.description, course.code));
                            }
                        }
                        return response.toString();
                    }
                }
            }
            return "Bạn muốn học lĩnh vực nào? Ví dụ: Web, Backend, Mobile, Database, DevOps, hoặc Security.";
        }

        // Thông tin khóa học
        for (Course course : courses) {
            for (String keyword : course.keywords) {
                if (message.contains(keyword)) {
                    return String.format("Khóa học %s (%s): %s %s Giá: %,d VND, Thời lượng: %d buổi.\nChi tiết: http://localhost:8080/khoahoc/getById/%s",
                            course.name, course.code, course.description, course.details, course.price, course.duration, course.code);
                }
            }
        }

        // Mặc định
        return """
                Xin chào! Mình chưa rõ bạn đang quan tâm đến lĩnh vực nào.
                Bạn có thể hỏi về các chủ đề sau:

                - Web Development: HTML, CSS, JavaScript, ReactJS
                - Backend Development: Spring Boot
                - Mobile Development: Flutter, Android, iOS, React Native
                - Database: SQL, MySQL, PostgreSQL, SQL Server
                - DevOps: Git, Jenkins, Docker, Kubernetes, Prometheus, Grafana, Linux
                - Networking & Security: Mạng máy tính, An toàn mạng, Ethical Hacking, Firewall

                Ví dụ: "Tôi muốn học về lập trình iOS với Swift" hoặc "Giá khóa học SQL là bao nhiêu?"
                """;
    }
}
