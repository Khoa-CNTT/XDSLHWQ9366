package com.datn.service.impl;

import org.springframework.stereotype.Service;

@Service
public class ChatService {

    public String generateReply(String message) {
        message = message.toLowerCase();

        if (message.contains("html") || message.contains("css")) {
            return "Khóa học 'HTML & CSS Cơ bản': Học cách tạo giao diện web cơ bản. Học phí: 1.500.000 VNĐ, 10 buổi. Nội dung chi tiết: HTML, CSS, layout, responsive. Khóa học này dành cho người mới bắt đầu và không yêu cầu kinh nghiệm lập trình trước.";
        } else if (message.contains("javascript")) {
            return "Khóa học 'JavaScript Nâng cao': Lập trình web tương tác với JavaScript. Học phí: 2.000.000 VNĐ, 12 buổi. Nội dung chi tiết: DOM, AJAX, Fetch API, ES6+. Khóa học này giúp bạn hiểu rõ về các kỹ thuật lập trình web động.";
        } else if (message.contains("reactjs")) {
            return "Khóa học 'ReactJS từ cơ bản đến nâng cao': Học ReactJS và tạo ứng dụng SPA. Học phí: 2.500.000 VNĐ, 15 buổi. Nội dung chi tiết: Components, Props, State, Hooks, Routing. Phù hợp với những ai muốn phát triển ứng dụng web hiện đại.";
        } else if (message.contains("spring boot")) {
            return "Khóa học 'Spring Boot Web API': Tạo API REST với Spring Boot. Học phí: 2.800.000 VNĐ, 18 buổi. Nội dung chi tiết: Spring MVC, JPA, Security, Swagger. Học viên sẽ nắm vững cách xây dựng ứng dụng Java hiệu quả với Spring Boot.";
        } else if (message.contains("flutter")) {
            return "Khóa học 'Flutter cơ bản': Học Flutter và Dart để tạo ứng dụng mobile. Học phí: 2.300.000 VNĐ, 12 buổi. Nội dung chi tiết: Widgets, Navigation, API, Firebase. Khóa học này thích hợp cho người mới bắt đầu và muốn phát triển ứng dụng đa nền tảng.";
        } else if (message.contains("react native")) {
            return "Khóa học 'React Native nâng cao': Phát triển ứng dụng mobile đa nền tảng. Học phí: 2.700.000 VNĐ, 14 buổi. Nội dung chi tiết: Redux, Performance, Native Modules. Dành cho lập trình viên muốn tạo ứng dụng mobile chất lượng cao với React Native.";
        } else if (message.contains("android") || message.contains("kotlin")) {
            return "Khóa học 'Lập trình Android với Kotlin': Học Android cơ bản và nâng cao. Học phí: 2.500.000 VNĐ, 16 buổi. Nội dung chi tiết: Activity, Fragment, Room, Retrofit. Khóa học này sẽ giúp bạn tạo ra các ứng dụng Android mạnh mẽ với Kotlin.";
        } else if (message.contains("ios") || message.contains("swift")) {
            return "Khóa học 'Lập trình iOS với Swift': Học lập trình ứng dụng iOS. Học phí: 2.600.000 VNĐ, 14 buổi. Nội dung chi tiết: Storyboard, SwiftUI, CoreData. Khóa học phù hợp với những ai muốn phát triển ứng dụng trên hệ điều hành iOS.";
        } else if (message.contains("sql")) {
            return "Khóa học 'SQL Cơ bản': Học cú pháp SQL cơ bản. Học phí: 1.200.000 VNĐ, 8 buổi. Nội dung chi tiết: SELECT, INSERT, UPDATE, DELETE. Phù hợp cho người mới bắt đầu học về cơ sở dữ liệu.";
        } else if (message.contains("mysql")) {
            return "Khóa học 'MySQL Nâng cao': Tối ưu và quản lý MySQL hiệu quả. Học phí: 1.800.000 VNĐ, 10 buổi. Nội dung chi tiết: JOIN, Subquery, Indexing, Stored Procedures. Dành cho những ai muốn nâng cao kỹ năng quản lý cơ sở dữ liệu MySQL.";
        } else if (message.contains("postgresql")) {
            return "Khóa học 'PostgreSQL cho Developer': Khám phá tính năng mạnh của PostgreSQL. Học phí: 1.900.000 VNĐ, 10 buổi. Nội dung chi tiết: CTE, JSONB, Indexes, Performance. Khóa học này giúp bạn hiểu sâu về PostgreSQL và cách tối ưu hóa cơ sở dữ liệu.";
        } else if (message.contains("sql server")) {
            return "Khóa học 'SQL Server từ A-Z': Quản lý và lập trình với SQL Server. Học phí: 2.100.000 VNĐ, 12 buổi. Nội dung chi tiết: T-SQL, View, Trigger, Function. Phù hợp cho những ai muốn học lập trình SQL chuyên sâu với SQL Server.";
        } else if (message.contains("devops")) {
            return "Khóa học 'DevOps cơ bản với Git & Jenkins': Hiểu quy trình CI/CD cơ bản. Học phí: 2.000.000 VNĐ, 10 buổi. Nội dung chi tiết: Git, Jenkins, Pipeline. Khóa học này giúp bạn hiểu về quy trình phát triển phần mềm và triển khai ứng dụng tự động.";
        } else if (message.contains("docker")) {
            return "Khóa học 'CI/CD nâng cao với Docker & Kubernetes': Triển khai ứng dụng với container. Học phí: 2.800.000 VNĐ, 14 buổi. Nội dung chi tiết: Dockerfile, Helm, Ingress, Autoscaling. Dành cho các DevOps muốn học cách triển khai ứng dụng trên nền tảng container.";
        } else if (message.contains("prometheus")) {
            return "Khóa học 'Giám sát hệ thống với Prometheus & Grafana': Theo dõi và cảnh báo hiệu năng. Học phí: 2.200.000 VNĐ, 10 buổi. Nội dung chi tiết: Metric, Dashboard, Alerting. Khóa học này giúp bạn giám sát và phân tích dữ liệu hệ thống.";
        } else if (message.contains("linux")) {
            return "Khóa học 'Linux cho DevOps': Làm việc với Linux trong môi trường DevOps. Học phí: 2.000.000 VNĐ, 12 buổi. Nội dung chi tiết: Shell, systemctl, logs, network. Khóa học này sẽ giúp bạn làm quen với hệ điều hành Linux cho DevOps.";
        } else if (message.contains("network")) {
            return "Khóa học 'Mạng máy tính cơ bản': Kiến thức nền tảng về mạng máy tính. Học phí: 1.500.000 VNĐ, 10 buổi. Nội dung chi tiết: OSI, TCP/IP, subnet, routing. Phù hợp với những ai muốn hiểu về cách thức hoạt động của mạng máy tính.";
        } else if (message.contains("ethical hacking")) {
            return "Khóa học 'Ethical Hacking cơ bản': Kỹ thuật tấn công và phòng thủ. Học phí: 2.200.000 VNĐ, 12 buổi. Nội dung chi tiết: Recon, Exploit, Mitigation. Khóa học này giúp bạn hiểu các phương thức tấn công và bảo vệ hệ thống an toàn.";
        } else if (message.contains("firewall")) {
            return "Khóa học 'Firewall & IDS nâng cao': Bảo vệ hệ thống với firewall và IDS. Học phí: 2.100.000 VNĐ, 10 buổi. Nội dung chi tiết: iptables, Snort, Suricata. Khóa học này giúp bạn triển khai các hệ thống bảo vệ mạng tiên tiến.";
        } else {
            return "Xin chào! Bạn muốn tìm hiểu về khóa học nào? (Ví dụ: Java, Python, Web, Mobile, DevOps...)";
        }
    }
}
