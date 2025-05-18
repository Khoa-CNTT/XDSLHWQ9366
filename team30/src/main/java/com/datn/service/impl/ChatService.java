package com.datn.service.impl;

import org.springframework.stereotype.Service;

@Service
public class ChatService {

    public String generateReply(String message) {
        message = message.toLowerCase();

        if (message.contains("html")) {
            return "Khóa học HTML giúp bạn tạo cấu trúc website cơ bản đến nâng cao.";
        } else if (message.contains("css")) {
            return "Khóa học CSS giúp bạn thiết kế giao diện đẹp mắt, responsive cho website.";
        } else if (message.contains("javascript")) {
            return "Khóa học JavaScript dạy bạn lập trình web động, xử lý sự kiện và thao tác DOM.";
        } else if (message.contains("js")) {
            return "Bạn đang hỏi về JavaScript phải không? Đây là khóa học JS chi tiết dành cho bạn.";
        } else if (message.contains("react")) {
            return "ReactJS là thư viện frontend hiện đại. Khóa học React của chúng tôi giúp bạn xây dựng SPA.";
        } else if (message.contains("reactjs")) {
            return "Bạn sẽ học được cách dùng JSX, state, props, component và hook trong ReactJS.";

        } else if (message.contains("spring")) {
            return "Khóa học Spring Boot sẽ giúp bạn tạo REST API backend chuyên nghiệp với Java.";
        } else if (message.contains("spring boot")) {
            return "Spring Boot: Học cách cấu hình, tạo controller, service, repository, và kết nối DB.";
        }

        else if (message.contains("flutter")) {
            return "Flutter là framework của Google để tạo app Android/iOS từ một codebase.";
        } else if (message.contains("dart")) {
            return "Bạn sẽ học ngôn ngữ Dart – nền tảng để lập trình Flutter trong khóa học của chúng tôi.";
        } else if (message.contains("android")) {
            return "Khóa học Android native sẽ giúp bạn dùng Java hoặc Kotlin để tạo ứng dụng.";
        } else if (message.contains("java android")) {
            return "Bạn sẽ được hướng dẫn xây app Android bằng Java trong khóa học chi tiết này.";
        }

        else if (message.contains("sql")) {
            return "Khóa học SQL cơ bản đến nâng cao: SELECT, JOIN, GROUP BY, Subquery,...";
        } else if (message.contains("mysql")) {
            return "MySQL là hệ quản trị CSDL phổ biến – khóa học này sẽ hướng dẫn cài đặt và truy vấn dữ liệu.";
        } else if (message.contains("database")) {
            return "Bạn muốn học về cơ sở dữ liệu? Hãy bắt đầu với SQL hoặc MySQL.";
        }

        else if (message.contains("docker")) {
            return "Docker giúp bạn đóng gói và triển khai ứng dụng dễ dàng – đây là khóa học dành cho bạn.";
        } else if (message.contains("jenkins")) {
            return "Jenkins dùng để CI/CD – bạn sẽ học cách tự động hóa quá trình build và deploy.";
        } else if (message.contains("prometheus")) {
            return "Prometheus là công cụ monitoring phổ biến – khóa học sẽ giúp bạn nắm vững cách dùng nó.";
        } else if (message.contains("devops")) {
            return "Khóa học DevOps bao gồm Docker, Jenkins, CI/CD pipelines, Prometheus, và hơn thế nữa.";
        }

        else if (message.contains("security")) {
            return "Khóa học này giúp bạn nắm được các kỹ thuật bảo mật cơ bản và nâng cao.";
        } else if (message.contains("hacking")) {
            return "Bạn quan tâm đến hacking? Hãy học ethical hacking một cách hợp pháp và an toàn.";
        } else if (message.contains("firewall")) {
            return "Firewall là lớp bảo vệ quan trọng – khóa học này sẽ giúp bạn cấu hình và kiểm soát firewall.";
        }

        else {
            return """
                    Xin chào! Mình chưa rõ bạn đang quan tâm đến lĩnh vực nào.
                    Bạn có thể hỏi về các chủ đề sau:
                    
                    - Web: HTML, CSS, JavaScript, ReactJS
                    - Backend: Spring Boot
                    - Mobile: Flutter, Android
                    - Database: SQL, MySQL
                    - DevOps: Docker, Jenkins, Prometheus
                    - Security: Ethical Hacking, Firewall
                    
                    Ví dụ: "Tôi muốn học về backend với Java"
                    """;
        }
    }
}
