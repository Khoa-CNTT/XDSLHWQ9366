-- ********************
DELETE FROM CHUCVUS;

INSERT INTO CHUCVUS (MACHUCVU, TENCHUCVU, TRANGTHAI)
VALUES ('CV001', 'QuanTriVien', true),
	   ('CV002', 'NhanVienTuyenSinh', true),
	   ('CV003', 'CongTacVien', true),
	   ('CV004', 'NhanVienKeToan', true);

-- ********************
DELETE FROM LINHVUCS;

INSERT INTO LINHVUCS (MALINHVUC, TENLINHVUC)
VALUES ('LV001', 'Lập trình Web (Frontend, Backend, Fullstack)'),
	   ('LV002', 'Lập trình Mobile (Android, iOS, Cross-platform)'),
       ('LV003', 'SQL (MySQL, PostgreSQL, SQL Server)'),
       ('LV004', 'DevOps & CI/CD'),
       ('LV005', 'Mạng máy tính & An ninh mạng');

-- ********************
ALTER TABLE KHOAHOCS DROP FOREIGN KEY FK_KHOAHOCS_LINHVUCS;

ALTER TABLE KHOAHOCS
ADD CONSTRAINT FK_KHOAHOCS_LINHVUCS
FOREIGN KEY (MALINHVUC) REFERENCES LINHVUCS(MALINHVUC)
ON DELETE SET NULL;

ALTER TABLE LOPHOCS DROP FOREIGN KEY FK_LOPHOCS_KHOAHOCS;

ALTER TABLE LOPHOCS
ADD CONSTRAINT FK_LOPHOCS_KHOAHOCS
FOREIGN KEY (MAKHOAHOC) REFERENCES KHOAHOCS(MAKHOAHOC)
ON DELETE SET NULL;

DELETE FROM KHOAHOCS;

SELECT * FROM KHOAHOCS;

INSERT INTO KHOAHOCS (MAKHOAHOC, TENKHOAHOC, MALINHVUC, SOBUOI, HOCPHI, NOIDUNGTOMTATKHOAHOC, NOIDUNGKHOAHOC, GHICHU) VALUES
('KH001', 'HTML & CSS Cơ bản', 'LV001', 10, 1500000, 'Học cách tạo giao diện web cơ bản.', 'Nội dung chi tiết về HTML, CSS, layout, responsive.', NULL),
('KH002', 'JavaScript Nâng cao', 'LV001', 12, 2000000, 'Lập trình web tương tác với JS.', 'DOM, AJAX, Fetch API, ES6+', NULL),
('KH003', 'ReactJS từ cơ bản đến nâng cao', 'LV001', 15, 2500000, 'Học ReactJS và tạo ứng dụng SPA.', 'Components, Props, State, Hooks, Routing.', NULL),
('KH004', 'Spring Boot Web API', 'LV001', 18, 2800000, 'Tạo API REST với Spring Boot.', 'Spring MVC, JPA, Security, Swagger.', NULL),
('KH005', 'Flutter cơ bản', 'LV002', 12, 2300000, 'Học Flutter và Dart để tạo ứng dụng mobile.', 'Widgets, Navigation, API, Firebase.', NULL),
('KH006', 'React Native nâng cao', 'LV002', 14, 2700000, 'Phát triển ứng dụng mobile đa nền tảng.', 'Redux, Performance, Native Modules.', NULL),
('KH007', 'Lập trình Android với Kotlin', 'LV002', 16, 2500000, 'Học Android cơ bản và nâng cao.', 'Activity, Fragment, Room, Retrofit.', NULL),
('KH008', 'Lập trình iOS với Swift', 'LV002', 14, 2600000, 'Học lập trình ứng dụng iOS.', 'Storyboard, SwiftUI, CoreData.', NULL),
('KH009', 'SQL Cơ bản', 'LV003', 8, 1200000, 'Học cú pháp SQL cơ bản.', 'SELECT, INSERT, UPDATE, DELETE.', NULL),
('KH010', 'MySQL Nâng cao', 'LV003', 10, 1800000, 'Tối ưu và quản lý MySQL hiệu quả.', 'JOIN, Subquery, Indexing, Stored Procedures.', NULL),
('KH011', 'PostgreSQL cho Developer', 'LV003', 10, 1900000, 'Khám phá tính năng mạnh của PostgreSQL.', 'CTE, JSONB, Indexes, Performance.', NULL),
('KH012', 'SQL Server từ A-Z', 'LV003', 12, 2100000, 'Quản lý và lập trình với SQL Server.', 'T-SQL, View, Trigger, Function.', NULL),
('KH013', 'DevOps cơ bản với Git & Jenkins', 'LV004', 10, 2000000, 'Hiểu quy trình CI/CD cơ bản.', 'Git, Jenkins, Pipeline.', NULL),
('KH014', 'CI/CD nâng cao với Docker & Kubernetes', 'LV004', 14, 2800000, 'Triển khai ứng dụng với container.', 'Dockerfile, Helm, Ingress, Autoscaling.', NULL),
('KH015', 'Giám sát hệ thống với Prometheus & Grafana', 'LV004', 10, 2200000, 'Theo dõi và cảnh báo hiệu năng.', 'Metric, Dashboard, Alerting.', NULL),
('KH016', 'Linux cho DevOps', 'LV004', 12, 2000000, 'Làm việc với Linux trong môi trường DevOps.', 'Shell, systemctl, logs, network.', NULL),
('KH017', 'Mạng máy tính cơ bản', 'LV005', 10, 1500000, 'Kiến thức nền tảng về mạng máy tính.', 'OSI, TCP/IP, subnet, routing.', NULL),
('KH018', 'An toàn mạng cho lập trình viên', 'LV005', 10, 1900000, 'Bảo vệ ứng dụng khỏi các tấn công phổ biến.', 'XSS, SQL Injection, CSRF.', NULL),
('KH019', 'Ethical Hacking cơ bản', 'LV005', 12, 2200000, 'Kỹ thuật tấn công và phòng thủ.', 'Recon, Exploit, Mitigation.', NULL),
('KH020', 'Firewall & IDS nâng cao', 'LV005', 10, 2100000, 'Bảo vệ hệ thống với firewall và IDS.', 'iptables, Snort, Suricata.', NULL);
