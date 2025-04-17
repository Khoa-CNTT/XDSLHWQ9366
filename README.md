# Hệ Thống Quản Lý Học Tập Thông Minh

![Phiên bản](https://img.shields.io/badge/phiên%20bản-1.0.0-blue.svg)
![Trạng thái](https://img.shields.io/badge/trạng%20thái-đang%20phát%20triển-yellow.svg)
![Giấy phép](https://img.shields.io/badge/giấy%20phép-MIT-green.svg)
![PRs](https://img.shields.io/badge/PRs-chào%20mừng-brightgreen.svg)

Hệ thống quản lý học tập toàn diện được hỗ trợ bởi AI để nâng cao trải nghiệm giáo dục.

## 🚀 Tính Năng Nổi Bật

- 🤖 **AI Gợi Ý Khóa Học** theo năng lực và sở thích cá nhân
- 👥 **Quản lý toàn diện** học viên, giảng viên, khóa học, lịch học, điểm số
- 🔔 **Hệ thống thông báo & nhắc nhở thông minh**
- 📊 **Phân tích tiến độ học tập bằng AI**
- 📈 **Thống kê – báo cáo hệ thống trực quan**
- 💬 **Tích hợp Chatbot AI hỗ trợ học tập**
- 🔐 **Quản trị phân quyền, thông tin người dùng**
- 🎨 **Giao diện web hiện đại, thân thiện**

## 🛠️ Công Nghệ Sử Dụng

| Backend | Frontend | AI | Xác thực | Cơ sở dữ liệu |
|---------|----------|-------|----------------|----------|
| Spring Boot | ReactJS / Angular | Python (ML/AI) | JWT / OAuth2 | MySQL / PostgreSQL |

## 📋 Các Chức Năng Chính

### Chức Năng Chung
- Đăng nhập
- Quản lý học viên
- Quản lý giảng viên
- Quản lý thí sinh dự thi
- Quản lý lĩnh vực
- Quản lý khóa học
- Quản lý phòng học
- Quản lý lớp học
- Quản lý lịch thi
- Quản lý chi tiết lớp học
- Quản lý bài viết
- Quản lý liên hệ

### Dành Cho Quản Trị Viên
- Quản lý tài khoản
- Quản lý chức vụ
- Quản lý nhân viên
- Quản lý phiếu thu / chi

## 🔄 Cải Tiến & Sửa Lỗi

| Tối ưu streaming | Nâng cao AI đề xuất | Sửa lỗi thanh toán | Cải thiện UX/UI |
|------------------------|----------------------------|-------------------|-------------------|
| Cải thiện chất lượng phát video trên nhiều thiết bị | Cải thiện độ chính xác thuật toán đề xuất nội dung | Khắc phục vấn đề trong quy trình thanh toán | Nâng cao trải nghiệm người dùng trên mọi nền tảng |

## 🚀 Bắt Đầu Sử Dụng

### Yêu cầu hệ thống
- Java 11+
- Node.js 14+
- Python 3.8+
- MySQL/PostgreSQL

### Cài đặt & Chạy thử

```bash
# Clone dự án
git clone 
# Backend
cd backend
./mvnw clean install
java -jar target/smart-learning-hub.jar

# Frontend
cd frontend
npm install
npm run dev

# Module AI
cd ai-module
pip install -r requirements.txt
python app.py