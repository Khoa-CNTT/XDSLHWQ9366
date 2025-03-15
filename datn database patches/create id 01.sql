DELIMITER //

CREATE TRIGGER trg_before_insert_nhanviens
BEFORE INSERT ON NHANVIENS
FOR EACH ROW
BEGIN
    DECLARE next_id INT;
    DECLARE formatted_id VARCHAR(255);

    SELECT IFNULL(MAX(CAST(SUBSTRING(MANHANVIEN, 3, 3) AS UNSIGNED)), 0) + 1 
    INTO next_id 
    FROM NHANVIENS;

    SET formatted_id = CONCAT('NV', LPAD(next_id, 3, '0'));

    IF NEW.MANHANVIEN IS NULL OR NEW.MANHANVIEN = '' THEN
        SET NEW.MANHANVIEN = formatted_id;
    END IF;
END;

//
DELIMITER ;

INSERT INTO CHUCVUS (MACHUCVU, TENCHUCVU, TRANGTHAI)
VALUES ('CV001', 'QuanTriVien', true),
		('CV002', 'NhanVienTuyenSinh', true),
        ('CV003', 'CongTacVien', true),
        ('CV004', 'NhanVienKeToan', true);


-- TEST 
INSERT INTO NHANVIENS (TENNHANVIEN, NGAYSINH, GIOITINH, SOCMND, SODIENTHOAI, EMAIL, DIACHI, MACHUCVU, NGUOINHAPTHONGTIN, GHICHU, URIHINHDAIDIEN)
VALUES 
('Nguyen Van A', '1995-06-15', 1, '123456789', '0987654321', 'a@example.com', 'Hanoi', 'CV001', 'Admin', 'Ghi chú A', 'avatar1.jpg'),
('Tran Thi B', '1998-09-20', 0, '987654321', '0912345678', 'b@example.com', 'Ho Chi Minh', 'CV001', 'Admin', 'Ghi chú B', 'avatar2.jpg'),
('Le Van C', '2000-01-10', 1, '567890123', '0934567890', 'c@example.com', 'Da Nang', 'CV001', 'Admin', 'Ghi chú C', 'avatar3.jpg');

SELECT * FROM NHANVIENS;
SELECT * FROM CHUCVUS;

DELETE FROM NHANVIENS;
DELETE FROM CHUCVUS;
