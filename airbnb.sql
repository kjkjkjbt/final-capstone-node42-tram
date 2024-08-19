/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `binh_luan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ma_phong` int DEFAULT NULL,
  `ma_nguoi_binh_luan` int DEFAULT NULL,
  `ngay_binh_luan` date DEFAULT NULL,
  `noi_dung` varchar(1000) DEFAULT NULL,
  `sao_binh_luan` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ma_phong` (`ma_phong`),
  KEY `ma_nguoi_binh_luan` (`ma_nguoi_binh_luan`),
  CONSTRAINT `binh_luan_ibfk_1` FOREIGN KEY (`ma_phong`) REFERENCES `phong` (`id`) ON DELETE CASCADE,
  CONSTRAINT `binh_luan_ibfk_2` FOREIGN KEY (`ma_nguoi_binh_luan`) REFERENCES `nguoi_dung` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `dat_phong` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ma_phong` int DEFAULT NULL,
  `ngay_den` date DEFAULT NULL,
  `ngay_di` date DEFAULT NULL,
  `so_luong_khach` int DEFAULT NULL,
  `ma_nguoi_dat` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ma_phong` (`ma_phong`),
  KEY `ma_nguoi_dat` (`ma_nguoi_dat`),
  CONSTRAINT `dat_phong_ibfk_1` FOREIGN KEY (`ma_phong`) REFERENCES `phong` (`id`) ON DELETE CASCADE,
  CONSTRAINT `dat_phong_ibfk_2` FOREIGN KEY (`ma_nguoi_dat`) REFERENCES `nguoi_dung` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `nguoi_dung` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `pass_word` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `birth_day` varchar(20) DEFAULT NULL,
  `gender` varchar(20) DEFAULT NULL,
  `role` varchar(50) DEFAULT NULL,
  `avatar` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `phong` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ten_phong` varchar(200) DEFAULT NULL,
  `khach` int DEFAULT NULL,
  `phong_ngu` int DEFAULT NULL,
  `giuong` int DEFAULT NULL,
  `phong_tam` int DEFAULT NULL,
  `mo_ta` varchar(1000) DEFAULT NULL,
  `gia_tien` int DEFAULT NULL,
  `may_giat` tinyint(1) DEFAULT NULL,
  `ban_la` tinyint(1) DEFAULT NULL,
  `tivi` tinyint(1) DEFAULT NULL,
  `dieu_hoa` tinyint(1) DEFAULT NULL,
  `wifi` tinyint(1) DEFAULT NULL,
  `bep` tinyint(1) DEFAULT NULL,
  `do_xe` tinyint(1) DEFAULT NULL,
  `ho_boi` tinyint(1) DEFAULT NULL,
  `ban_ui` tinyint(1) DEFAULT NULL,
  `ma_vi_tri` int DEFAULT NULL,
  `hinh_anh` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ma_vi_tri` (`ma_vi_tri`),
  CONSTRAINT `phong_ibfk_1` FOREIGN KEY (`ma_vi_tri`) REFERENCES `vi_tri` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `vi_tri` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ten_vi_tri` varchar(100) DEFAULT NULL,
  `tinh_thanh` varchar(100) DEFAULT NULL,
  `quoc_gia` varchar(100) DEFAULT NULL,
  `hinh_anh` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `binh_luan` (`id`, `ma_phong`, `ma_nguoi_binh_luan`, `ngay_binh_luan`, `noi_dung`, `sao_binh_luan`) VALUES
(1, 1, 3, '2023-01-20', 'The deluxe suite was amazing, and the view was breathtaking!', 5);
INSERT INTO `binh_luan` (`id`, `ma_phong`, `ma_nguoi_binh_luan`, `ngay_binh_luan`, `noi_dung`, `sao_binh_luan`) VALUES
(2, 2, 1, '2023-02-15', 'Stayed in the standard room, very cozy and comfortable.', 4);
INSERT INTO `binh_luan` (`id`, `ma_phong`, `ma_nguoi_binh_luan`, `ngay_binh_luan`, `noi_dung`, `sao_binh_luan`) VALUES
(3, 3, 4, '2023-03-08', 'The family suite was perfect for our family vacation.', 5);
INSERT INTO `binh_luan` (`id`, `ma_phong`, `ma_nguoi_binh_luan`, `ngay_binh_luan`, `noi_dung`, `sao_binh_luan`) VALUES
(4, 4, 2, '2023-04-05', 'The executive suite exceeded our expectations. Highly recommended!', 5),
(5, 5, 5, '2023-05-12', 'The cozy cabin provided a charming and intimate atmosphere.', 4),
(6, 6, 7, '2023-06-18', 'The spacious suite was impressive, especially the modern design.', 5),
(7, 7, 9, '2023-07-23', 'Enjoyed the rustic retreat for its quaint charm and peaceful surroundings.', 4),
(8, 8, 11, '2023-08-30', 'The penthouse suite offered breathtaking views and luxurious amenities.', 5),
(9, 9, 13, '2023-09-12', 'The sky high studio was perfect for our city escape with stunning city views.', 4),
(10, 10, 15, '2023-10-05', 'The beach bungalow provided a wonderful beachside experience with great amenities.', 5),
(11, 11, 17, '2023-11-21', 'The mountain lodge was cozy and had a fantastic view of the mountains.', 4),
(12, 12, 19, '2023-12-15', 'The skyline retreat provided a serene atmosphere with panoramic city views.', 5),
(13, 13, 21, '2024-01-02', 'The riverside mansion was grand and offered a luxurious stay with river views.', 5),
(14, 14, 23, '2024-02-08', 'The elegant duplex had a sophisticated design, making our stay truly elegant.', 4),
(15, 15, 25, '2024-03-14', 'The island paradise retreat was exclusive and perfect for a tropical getaway.', 5),
(16, 1, 3, '2023-01-20', 'The deluxe suite was amazing, and the view was breathtaking!', 5),
(17, 2, 1, '2023-02-15', 'Stayed in the standard room, very cozy and comfortable.', 4),
(18, 3, 4, '2023-03-08', 'The family suite was perfect for our family vacation.', 5),
(19, 4, 2, '2023-04-05', 'The executive suite exceeded our expectations. Highly recommended!', 5),
(20, 5, 5, '2023-05-12', 'The cozy cabin provided a charming and intimate atmosphere.', 4),
(21, 6, 7, '2023-06-18', 'The spacious suite was impressive, especially the modern design.', 5),
(22, 7, 9, '2023-07-23', 'Enjoyed the rustic retreat for its quaint charm and peaceful surroundings.', 4),
(23, 8, 11, '2023-08-30', 'The penthouse suite offered breathtaking views and luxurious amenities.', 5),
(24, 9, 13, '2023-09-12', 'The sky high studio was perfect for our city escape with stunning city views.', 4),
(25, 10, 15, '2023-10-05', 'The beach bungalow provided a wonderful beachside experience with great amenities.', 5),
(26, 11, 17, '2023-11-21', 'The mountain lodge was cozy and had a fantastic view of the mountains.', 4),
(27, 12, 19, '2023-12-15', 'The skyline retreat provided a serene atmosphere with panoramic city views.', 5),
(28, 13, 21, '2024-01-02', 'The riverside mansion was grand and offered a luxurious stay with river views.', 5),
(29, 14, 23, '2024-02-08', 'The elegant duplex had a sophisticated design, making our stay truly elegant.', 4),
(30, 15, 25, '2024-03-14', 'The island paradise retreat was exclusive and perfect for a tropical getaway.', 5);

INSERT INTO `dat_phong` (`id`, `ma_phong`, `ngay_den`, `ngay_di`, `so_luong_khach`, `ma_nguoi_dat`) VALUES
(31, 1, '2023-01-25', '2023-01-30', 2, 1);
INSERT INTO `dat_phong` (`id`, `ma_phong`, `ngay_den`, `ngay_di`, `so_luong_khach`, `ma_nguoi_dat`) VALUES
(32, 2, '2023-02-18', '2023-02-22', 1, 2);
INSERT INTO `dat_phong` (`id`, `ma_phong`, `ngay_den`, `ngay_di`, `so_luong_khach`, `ma_nguoi_dat`) VALUES
(33, 3, '2023-03-12', '2023-03-20', 4, 3);
INSERT INTO `dat_phong` (`id`, `ma_phong`, `ngay_den`, `ngay_di`, `so_luong_khach`, `ma_nguoi_dat`) VALUES
(34, 4, '2023-04-08', '2023-04-12', 2, 4),
(35, 5, '2023-05-15', '2023-05-20', 2, 5),
(36, 6, '2023-06-22', '2023-06-28', 3, 6),
(37, 7, '2023-07-25', '2023-07-30', 2, 7),
(38, 8, '2023-08-18', '2023-08-25', 4, 8),
(39, 9, '2023-09-10', '2023-09-15', 2, 9),
(40, 10, '2023-10-05', '2023-10-10', 3, 10),
(41, 11, '2023-11-12', '2023-11-18', 2, 11),
(42, 12, '2023-12-20', '2023-12-28', 4, 12),
(43, 13, '2024-01-15', '2024-01-20', 2, 13),
(44, 14, '2024-02-08', '2024-02-14', 2, 14),
(45, 15, '2024-03-18', '2024-03-25', 3, 15),
(46, 16, '2024-04-10', '2024-04-15', 1, 16),
(47, 17, '2024-05-22', '2024-05-28', 2, 17),
(48, 18, '2024-06-15', '2024-06-20', 3, 18),
(49, 19, '2024-07-08', '2024-07-15', 4, 19),
(50, 20, '2024-08-18', '2024-08-25', 2, 20),
(51, 21, '2024-09-10', '2024-09-15', 3, 21),
(52, 22, '2024-10-05', '2024-10-10', 2, 22),
(53, 23, '2024-11-12', '2024-11-18', 4, 23),
(54, 24, '2024-12-20', '2024-12-28', 2, 24),
(55, 25, '2025-01-15', '2025-01-20', 2, 25),
(56, 26, '2025-02-08', '2025-02-14', 3, 1),
(57, 27, '2025-03-18', '2025-03-25', 2, 2),
(58, 28, '2025-04-10', '2025-04-15', 1, 3),
(59, 29, '2025-05-22', '2025-05-28', 3, 4),
(60, 30, '2025-06-15', '2025-06-20', 2, 5);

INSERT INTO `nguoi_dung` (`id`, `full_name`, `email`, `pass_word`, `phone`, `birth_day`, `gender`, `role`, `avatar`) VALUES
(1, 'Nguyen Van A', 'nguyenvana@example.com', 'hashed_password_1', '123456789', '1990-05-15', 'Male', 'admin', 'avatar_a.jpg');
INSERT INTO `nguoi_dung` (`id`, `full_name`, `email`, `pass_word`, `phone`, `birth_day`, `gender`, `role`, `avatar`) VALUES
(2, 'Tran Thi B', 'tranthib@example.com', 'hashed_password_2', '987654321', '1985-08-21', 'Female', 'admin', 'avatar_b.jpg');
INSERT INTO `nguoi_dung` (`id`, `full_name`, `email`, `pass_word`, `phone`, `birth_day`, `gender`, `role`, `avatar`) VALUES
(3, 'Le Van C', 'levanc@example.com', 'hashed_password_3', '456789123', '1995-03-10', 'Male', 'user', 'avatar_c.jpg');
INSERT INTO `nguoi_dung` (`id`, `full_name`, `email`, `pass_word`, `phone`, `birth_day`, `gender`, `role`, `avatar`) VALUES
(4, 'Pham Thi D', 'phamthid@example.com', 'hashed_password_4', '741852963', '1992-11-30', 'Female', 'admin', 'avatar_d.jpg'),
(5, 'Hoang Van E', 'hoangvane@example.com', 'hashed_password_5', '369258147', '1988-07-05', 'Male', 'admin', 'avatar_e.jpg'),
(6, 'Nguyen Van F', 'nguyenvanf@example.com', 'hashed_password_6', '654321987', '1993-02-18', 'Male', 'user', 'avatar_f.jpg'),
(7, 'Tran Thi G', 'tranthig@example.com', 'hashed_password_7', '159487263', '1987-09-25', 'Female', 'admin', 'avatar_g.jpg'),
(8, 'Quach Van H', 'levanh@example.com', 'hashed_password_8', '852963741', '1998-06-14', 'Male', 'user', 'avatar_h.jpg'),
(9, 'Pham Thi I', 'phamthii@example.com', 'hashed_password_9', '369147258', '1994-12-08', 'Female', 'admin', 'avatar_i.jpg'),
(10, 'Lam Van J', 'hoangvanj@example.com', 'hashed_password_10', '741258963', '1989-04-20', 'Male', 'user', 'avatar_j.jpg'),
(11, 'Nguyen Van K', 'nguyenvank@example.com', 'hashed_password_11', '123654789', '1991-10-02', 'Male', 'user', 'avatar_k.jpg'),
(12, 'Le Thi L', 'tranthil@example.com', 'hashed_password_12', '987123654', '1986-01-17', 'Female', 'user', 'avatar_l.jpg'),
(13, 'Le Van M', 'levanm@example.com', 'hashed_password_13', '456321789', '1997-07-23', 'Male', 'admin', 'avatar_m.jpg'),
(14, 'Ly Thi N', 'phamthin@example.com', 'hashed_password_14', '789654123', '1999-05-05', 'Female', 'user', 'avatar_n.jpg'),
(15, 'Tran Van O', 'hoangvano@example.com', 'hashed_password_15', '321654987', '1984-11-12', 'Male', 'admin', 'avatar_o.jpg'),
(16, 'Nguyen Van P', 'nguyenvanp@example.com', 'hashed_password_16', '456987321', '1996-03-28', 'Male', 'admin', 'avatar_p.jpg'),
(17, 'Tran Thi Q', 'tranthiq@example.com', 'hashed_password_17', '987456321', '1990-08-03', 'Female', 'user', 'avatar_q.jpg'),
(18, 'Le Van R', 'levanr@example.com', 'hashed_password_18', '654789123', '1985-04-15', 'Male', 'user', 'avatar_r.jpg'),
(19, 'Hoai Thi S', 'phamthis@example.com', 'hashed_password_19', '147852369', '1992-12-20', 'Female', 'user', 'avatar_s.jpg'),
(20, 'Ho Van T', 'hoangvant@example.com', 'hashed_password_20', '987321654', '1988-06-09', 'Male', 'admin', 'avatar_t.jpg'),
(21, 'Ngo Van U', 'nguyenvanu@example.com', 'hashed_password_21', '369147852', '1995-01-31', 'Male', 'user', 'avatar_u.jpg'),
(22, 'Tran Thi V', 'tranthiv@example.com', 'hashed_password_22', '852369147', '1983-09-08', 'Female', 'user', 'avatar_v.jpg'),
(23, 'Ngo Van X', 'levanx@example.com', 'hashed_password_23', '123789456', '1992-07-11', 'Male', 'user', 'avatar_x.jpg'),
(24, 'Lam Thi Y', 'phamthiy@example.com', 'hashed_password_24', '456123789', '1986-02-26', 'Female', 'admin', 'avatar_y.jpg'),
(25, 'Ho Van Z', 'hoangvanz@example.com', 'hashed_password_25', '789321654', '1994-04-05', 'Male', 'user', 'avatar_z.jpg'),
(26, 'Nguyen Van A', 'nguyenvana@example.com', 'hashed_password_1', '123456789', '1990-05-15', 'Male', 'admin', 'avatar_a.jpg'),
(27, 'Tran Thi B', 'tranthib@example.com', 'hashed_password_2', '987654321', '1985-08-21', 'Female', 'admin', 'avatar_b.jpg'),
(28, 'Le Van C', 'levanc@example.com', 'hashed_password_3', '456789123', '1995-03-10', 'Male', 'user', 'avatar_c.jpg'),
(29, 'Pham Thi D', 'phamthid@example.com', 'hashed_password_4', '741852963', '1992-11-30', 'Female', 'admin', 'avatar_d.jpg'),
(30, 'Hoang Van E', 'hoangvane@example.com', 'hashed_password_5', '369258147', '1988-07-05', 'Male', 'admin', 'avatar_e.jpg'),
(31, 'Nguyen Van F', 'nguyenvanf@example.com', 'hashed_password_6', '654321987', '1993-02-18', 'Male', 'user', 'avatar_f.jpg'),
(32, 'Tran Thi G', 'tranthig@example.com', 'hashed_password_7', '159487263', '1987-09-25', 'Female', 'admin', 'avatar_g.jpg'),
(33, 'Quach Van H', 'levanh@example.com', 'hashed_password_8', '852963741', '1998-06-14', 'Male', 'user', 'avatar_h.jpg'),
(34, 'Pham Thi I', 'phamthii@example.com', 'hashed_password_9', '369147258', '1994-12-08', 'Female', 'admin', 'avatar_i.jpg'),
(35, 'Lam Van J', 'hoangvanj@example.com', 'hashed_password_10', '741258963', '1989-04-20', 'Male', 'user', 'avatar_j.jpg'),
(36, 'Nguyen Van K', 'nguyenvank@example.com', 'hashed_password_11', '123654789', '1991-10-02', 'Male', 'user', 'avatar_k.jpg'),
(37, 'Le Thi L', 'tranthil@example.com', 'hashed_password_12', '987123654', '1986-01-17', 'Female', 'user', 'avatar_l.jpg'),
(38, 'Le Van M', 'levanm@example.com', 'hashed_password_13', '456321789', '1997-07-23', 'Male', 'admin', 'avatar_m.jpg'),
(39, 'Ly Thi N', 'phamthin@example.com', 'hashed_password_14', '789654123', '1999-05-05', 'Female', 'user', 'avatar_n.jpg'),
(40, 'Tran Van O', 'hoangvano@example.com', 'hashed_password_15', '321654987', '1984-11-12', 'Male', 'admin', 'avatar_o.jpg'),
(41, 'Nguyen Van P', 'nguyenvanp@example.com', 'hashed_password_16', '456987321', '1996-03-28', 'Male', 'admin', 'avatar_p.jpg'),
(42, 'Tran Thi Q', 'tranthiq@example.com', 'hashed_password_17', '987456321', '1990-08-03', 'Female', 'user', 'avatar_q.jpg'),
(43, 'Le Van R', 'levanr@example.com', 'hashed_password_18', '654789123', '1985-04-15', 'Male', 'user', 'avatar_r.jpg'),
(44, 'Hoai Thi S', 'phamthis@example.com', 'hashed_password_19', '147852369', '1992-12-20', 'Female', 'user', 'avatar_s.jpg'),
(45, 'Ho Van T', 'hoangvant@example.com', 'hashed_password_20', '987321654', '1988-06-09', 'Male', 'admin', 'avatar_t.jpg'),
(46, 'Ngo Van U', 'nguyenvanu@example.com', 'hashed_password_21', '369147852', '1995-01-31', 'Male', 'user', 'avatar_u.jpg'),
(47, 'Tran Thi V', 'tranthiv@example.com', 'hashed_password_22', '852369147', '1983-09-08', 'Female', 'user', 'avatar_v.jpg'),
(48, 'Ngo Van X', 'levanx@example.com', 'hashed_password_23', '123789456', '1992-07-11', 'Male', 'user', 'avatar_x.jpg'),
(49, 'Lam Thi Y', 'phamthiy@example.com', 'hashed_password_24', '456123789', '1986-02-26', 'Female', 'admin', 'avatar_y.jpg'),
(50, 'Ho Van Z', 'hoangvanz@example.com', 'hashed_password_25', '789321654', '1994-04-05', 'Male', 'user', 'avatar_z.jpg');

INSERT INTO `phong` (`id`, `ten_phong`, `khach`, `phong_ngu`, `giuong`, `phong_tam`, `mo_ta`, `gia_tien`, `may_giat`, `ban_la`, `tivi`, `dieu_hoa`, `wifi`, `bep`, `do_xe`, `ho_boi`, `ban_ui`, `ma_vi_tri`, `hinh_anh`) VALUES
(1, 'Deluxe Suite', 2, 1, 1, 1, 'Spacious deluxe suite with a stunning view.', 1500, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 'path/to/deluxe-suite.jpg');
INSERT INTO `phong` (`id`, `ten_phong`, `khach`, `phong_ngu`, `giuong`, `phong_tam`, `mo_ta`, `gia_tien`, `may_giat`, `ban_la`, `tivi`, `dieu_hoa`, `wifi`, `bep`, `do_xe`, `ho_boi`, `ban_ui`, `ma_vi_tri`, `hinh_anh`) VALUES
(2, 'Standard Room', 1, 1, 1, 1, 'Comfortable standard room for a relaxing stay.', 800, 0, 1, 1, 1, 1, 1, 0, 0, 0, 2, 'path/to/standard-room.jpg');
INSERT INTO `phong` (`id`, `ten_phong`, `khach`, `phong_ngu`, `giuong`, `phong_tam`, `mo_ta`, `gia_tien`, `may_giat`, `ban_la`, `tivi`, `dieu_hoa`, `wifi`, `bep`, `do_xe`, `ho_boi`, `ban_ui`, `ma_vi_tri`, `hinh_anh`) VALUES
(3, 'Family Suite', 4, 2, 2, 2, 'Perfect for a family getaway with ample space.', 2000, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 'path/to/family-suite.jpg');
INSERT INTO `phong` (`id`, `ten_phong`, `khach`, `phong_ngu`, `giuong`, `phong_tam`, `mo_ta`, `gia_tien`, `may_giat`, `ban_la`, `tivi`, `dieu_hoa`, `wifi`, `bep`, `do_xe`, `ho_boi`, `ban_ui`, `ma_vi_tri`, `hinh_anh`) VALUES
(4, 'Executive Suite', 2, 1, 1, 1, 'Luxurious executive suite with top-notch amenities.', 2500, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 'path/to/executive-suite.jpg'),
(5, 'Cozy Cabin', 2, 1, 1, 1, 'A charming cabin for a cozy and intimate stay.', 1200, 0, 1, 1, 1, 1, 1, 0, 0, 0, 5, 'path/to/cozy-cabin.jpg'),
(6, 'Spacious Suite', 3, 2, 2, 1, 'Expansive suite with a modern design.', 1800, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6, 'path/to/spacious-suite.jpg'),
(7, 'Ocean View Room', 2, 1, 1, 1, 'Room with a breathtaking view of the ocean.', 1000, 0, 1, 1, 1, 1, 1, 0, 0, 0, 7, 'path/to/ocean-view-room.jpg'),
(8, 'Luxury Apartment', 4, 2, 2, 2, 'High-end apartment with luxurious amenities.', 2800, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8, 'path/to/luxury-apartment.jpg'),
(9, 'Rustic Retreat', 2, 1, 1, 1, 'Quaint retreat with a rustic charm.', 1100, 0, 1, 1, 1, 1, 1, 0, 0, 0, 9, 'path/to/rustic-retreat.jpg'),
(10, 'Penthouse Suite', 3, 2, 2, 2, 'Exclusive penthouse suite with panoramic views.', 3200, 1, 1, 1, 1, 1, 1, 1, 1, 1, 10, 'path/to/penthouse-suite.jpg'),
(11, 'Country Cottage', 2, 1, 1, 1, 'Cozy cottage in the heart of the countryside.', 1300, 0, 1, 1, 1, 1, 1, 0, 0, 0, 11, 'path/to/country-cottage.jpg'),
(12, 'Sky High Studio', 2, 1, 1, 1, 'Studio apartment with stunning city views.', 1500, 0, 1, 1, 1, 1, 1, 0, 0, 0, 12, 'path/to/sky-high-studio.jpg'),
(13, 'Beach Bungalow', 3, 1, 2, 1, 'Charming bungalow steps away from the beach.', 2000, 1, 1, 1, 1, 1, 1, 1, 1, 1, 13, 'path/to/beach-bungalow.jpg'),
(14, 'Serenity Suite', 2, 1, 1, 1, 'Tranquil suite for a peaceful retreat.', 1400, 0, 1, 1, 1, 1, 1, 0, 0, 0, 14, 'path/to/serenity-suite.jpg'),
(15, 'Urban Escape', 4, 2, 2, 2, 'Escape to the city with this modern urban space.', 2400, 1, 1, 1, 1, 1, 1, 1, 1, 1, 15, 'path/to/urban-escape.jpg'),
(16, 'Classic Room', 1, 1, 1, 1, 'Timeless classic room for a comfortable stay.', 900, 0, 1, 1, 1, 1, 1, 0, 0, 0, 16, 'path/to/classic-room.jpg'),
(17, 'Mountain Lodge', 2, 1, 1, 1, 'Lodge with a view nestled in the mountains.', 1300, 0, 1, 1, 1, 1, 1, 0, 0, 0, 17, 'path/to/mountain-lodge.jpg'),
(18, 'Skyline Retreat', 3, 2, 2, 2, 'Retreat with panoramic views of the city skyline.', 2100, 1, 1, 1, 1, 1, 1, 1, 1, 1, 18, 'path/to/skyline-retreat.jpg'),
(19, 'Riverside Mansion', 4, 2, 2, 2, 'Grand mansion with a view of the river.', 3000, 1, 1, 1, 1, 1, 1, 1, 1, 1, 19, 'path/to/riverside-mansion.jpg'),
(20, 'Elegant Duplex', 2, 1, 1, 1, 'Elegant duplex with sophisticated design.', 1600, 0, 1, 1, 1, 1, 1, 0, 0, 0, 20, 'path/to/elegant-duplex.jpg'),
(21, 'Island Paradise Retreat', 3, 2, 2, 2, 'Exclusive retreat on a tropical island.', 2600, 1, 1, 1, 1, 1, 1, 1, 1, 1, 21, 'path/to/island-paradise-retreat.jpg'),
(22, 'Modern City View', 2, 1, 1, 1, 'Modern room with stunning city views.', 1200, 0, 1, 1, 1, 1, 1, 0, 0, 0, 22, 'path/to/modern-city-view.jpg'),
(23, 'Chic Urban Loft', 4, 2, 2, 2, 'Chic loft in the heart of the urban landscape.', 2800, 1, 1, 1, 1, 1, 1, 1, 1, 1, 23, 'path/to/chic-urban-loft.jpg'),
(24, 'Secluded Cabin', 2, 1, 1, 1, 'Secluded cabin for a quiet and peaceful stay.', 1100, 0, 1, 1, 1, 1, 1, 0, 0, 0, 24, 'path/to/secluded-cabin.jpg'),
(25, 'Beachfront Paradise', 3, 2, 2, 2, 'Paradise by the beach with luxurious amenities.', 2500, 1, 1, 1, 1, 1, 1, 1, 1, 1, 25, 'path/to/beachfront-paradise.jpg'),
(26, 'Deluxe Suite', 2, 1, 1, 1, 'Spacious deluxe suite with a stunning view.', 1500, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 'path/to/deluxe-suite.jpg'),
(27, 'Standard Room', 1, 1, 1, 1, 'Comfortable standard room for a relaxing stay.', 800, 0, 1, 1, 1, 1, 1, 0, 0, 0, 2, 'path/to/standard-room.jpg'),
(28, 'Family Suite', 4, 2, 2, 2, 'Perfect for a family getaway with ample space.', 2000, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 'path/to/family-suite.jpg'),
(29, 'Executive Suite', 2, 1, 1, 1, 'Luxurious executive suite with top-notch amenities.', 2500, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 'path/to/executive-suite.jpg'),
(30, 'Cozy Cabin', 2, 1, 1, 1, 'A charming cabin for a cozy and intimate stay.', 1200, 0, 1, 1, 1, 1, 1, 0, 0, 0, 5, 'path/to/cozy-cabin.jpg'),
(31, 'Spacious Suite', 3, 2, 2, 1, 'Expansive suite with a modern design.', 1800, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6, 'path/to/spacious-suite.jpg'),
(32, 'Ocean View Room', 2, 1, 1, 1, 'Room with a breathtaking view of the ocean.', 1000, 0, 1, 1, 1, 1, 1, 0, 0, 0, 7, 'path/to/ocean-view-room.jpg'),
(33, 'Luxury Apartment', 4, 2, 2, 2, 'High-end apartment with luxurious amenities.', 2800, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8, 'path/to/luxury-apartment.jpg'),
(34, 'Rustic Retreat', 2, 1, 1, 1, 'Quaint retreat with a rustic charm.', 1100, 0, 1, 1, 1, 1, 1, 0, 0, 0, 9, 'path/to/rustic-retreat.jpg'),
(35, 'Penthouse Suite', 3, 2, 2, 2, 'Exclusive penthouse suite with panoramic views.', 3200, 1, 1, 1, 1, 1, 1, 1, 1, 1, 10, 'path/to/penthouse-suite.jpg'),
(36, 'Country Cottage', 2, 1, 1, 1, 'Cozy cottage in the heart of the countryside.', 1300, 0, 1, 1, 1, 1, 1, 0, 0, 0, 11, 'path/to/country-cottage.jpg'),
(37, 'Sky High Studio', 2, 1, 1, 1, 'Studio apartment with stunning city views.', 1500, 0, 1, 1, 1, 1, 1, 0, 0, 0, 12, 'path/to/sky-high-studio.jpg'),
(38, 'Beach Bungalow', 3, 1, 2, 1, 'Charming bungalow steps away from the beach.', 2000, 1, 1, 1, 1, 1, 1, 1, 1, 1, 13, 'path/to/beach-bungalow.jpg'),
(39, 'Serenity Suite', 2, 1, 1, 1, 'Tranquil suite for a peaceful retreat.', 1400, 0, 1, 1, 1, 1, 1, 0, 0, 0, 14, 'path/to/serenity-suite.jpg'),
(40, 'Urban Escape', 4, 2, 2, 2, 'Escape to the city with this modern urban space.', 2400, 1, 1, 1, 1, 1, 1, 1, 1, 1, 15, 'path/to/urban-escape.jpg'),
(41, 'Classic Room', 1, 1, 1, 1, 'Timeless classic room for a comfortable stay.', 900, 0, 1, 1, 1, 1, 1, 0, 0, 0, 16, 'path/to/classic-room.jpg'),
(42, 'Mountain Lodge', 2, 1, 1, 1, 'Lodge with a view nestled in the mountains.', 1300, 0, 1, 1, 1, 1, 1, 0, 0, 0, 17, 'path/to/mountain-lodge.jpg'),
(43, 'Skyline Retreat', 3, 2, 2, 2, 'Retreat with panoramic views of the city skyline.', 2100, 1, 1, 1, 1, 1, 1, 1, 1, 1, 18, 'path/to/skyline-retreat.jpg'),
(44, 'Riverside Mansion', 4, 2, 2, 2, 'Grand mansion with a view of the river.', 3000, 1, 1, 1, 1, 1, 1, 1, 1, 1, 19, 'path/to/riverside-mansion.jpg'),
(45, 'Elegant Duplex', 2, 1, 1, 1, 'Elegant duplex with sophisticated design.', 1600, 0, 1, 1, 1, 1, 1, 0, 0, 0, 20, 'path/to/elegant-duplex.jpg'),
(46, 'Island Paradise Retreat', 3, 2, 2, 2, 'Exclusive retreat on a tropical island.', 2600, 1, 1, 1, 1, 1, 1, 1, 1, 1, 21, 'path/to/island-paradise-retreat.jpg'),
(47, 'Modern City View', 2, 1, 1, 1, 'Modern room with stunning city views.', 1200, 0, 1, 1, 1, 1, 1, 0, 0, 0, 22, 'path/to/modern-city-view.jpg'),
(48, 'Chic Urban Loft', 4, 2, 2, 2, 'Chic loft in the heart of the urban landscape.', 2800, 1, 1, 1, 1, 1, 1, 1, 1, 1, 23, 'path/to/chic-urban-loft.jpg'),
(49, 'Secluded Cabin', 2, 1, 1, 1, 'Secluded cabin for a quiet and peaceful stay.', 1100, 0, 1, 1, 1, 1, 1, 0, 0, 0, 24, 'path/to/secluded-cabin.jpg'),
(50, 'Beachfront Paradise', 3, 2, 2, 2, 'Paradise by the beach with luxurious amenities.', 2500, 1, 1, 1, 1, 1, 1, 1, 1, 1, 25, 'path/to/beachfront-paradise.jpg');

INSERT INTO `vi_tri` (`id`, `ten_vi_tri`, `tinh_thanh`, `quoc_gia`, `hinh_anh`) VALUES
(1, 'Downtown Area', 'Ho Chi Minh City', 'Vietnam', 'path/to/downtown.jpg');
INSERT INTO `vi_tri` (`id`, `ten_vi_tri`, `tinh_thanh`, `quoc_gia`, `hinh_anh`) VALUES
(2, 'Beachfront Resort', 'Phuket', 'Thailand', 'path/to/beachfront-resort.jpg');
INSERT INTO `vi_tri` (`id`, `ten_vi_tri`, `tinh_thanh`, `quoc_gia`, `hinh_anh`) VALUES
(3, 'Mountain Retreat', 'Dalat', 'Vietnam', 'path/to/mountain-retreat.jpg');
INSERT INTO `vi_tri` (`id`, `ten_vi_tri`, `tinh_thanh`, `quoc_gia`, `hinh_anh`) VALUES
(4, 'City Center', 'Tokyo', 'Japan', 'path/to/city-center.jpg'),
(5, 'Seaside Villa', 'Nice', 'France', 'path/to/seaside-villa.jpg'),
(6, 'Riverside View', 'Can Tho', 'Vietnam', 'path/to/riverside-view.jpg'),
(7, 'Skyline Heights', 'Seoul', 'South Korea', 'path/to/skyline-heights.jpg'),
(8, 'Island Paradise', 'Bali', 'Indonesia', 'path/to/island-paradise.jpg'),
(9, 'Historic District', 'Kyoto', 'Japan', 'path/to/historic-district.jpg'),
(10, 'Garden Oasis', 'Singapore', 'Singapore', 'path/to/garden-oasis.jpg'),
(11, 'Lakefront Retreat', 'Hanoi', 'Vietnam', 'path/to/lakefront-retreat.jpg'),
(12, 'Urban Loft', 'New York City', 'United States', 'path/to/urban-loft.jpg'),
(13, 'Desert Escape', 'Dubai', 'United Arab Emirates', 'path/to/desert-escape.jpg'),
(14, 'Ski Chalet', 'Chamonix', 'France', 'path/to/ski-chalet.jpg'),
(15, 'Tropical Hideaway', 'Phuket', 'Thailand', 'path/to/tropical-hideaway.jpg'),
(16, 'Countryside Cottage', 'Oxford', 'United Kingdom', 'path/to/countryside-cottage.jpg'),
(17, 'Oceanfront Condo', 'Miami', 'United States', 'path/to/oceanfront-condo.jpg'),
(18, 'Cityscape Penthouse', 'Sydney', 'Australia', 'path/to/cityscape-penthouse.jpg'),
(19, 'Forest Cabin', 'Vancouver', 'Canada', 'path/to/forest-cabin.jpg'),
(20, 'Historical Landmark', 'Rome', 'Italy', 'path/to/historical-landmark.jpg'),
(21, 'Luxury Yacht', 'Monaco', 'Monaco', 'path/to/luxury-yacht.jpg'),
(22, 'Meadow View', 'Zurich', 'Switzerland', 'path/to/meadow-view.jpg'),
(23, 'Lakeside Mansion', 'Geneva', 'Switzerland', 'path/to/lakeside-mansion.jpg'),
(24, 'Skyscraper Oasis', 'Shanghai', 'China', 'path/to/skyscraper-oasis.jpg'),
(25, 'Rural Farmhouse', 'Auckland', 'New Zealand', 'path/to/rural-farmhouse.jpg'),
(26, 'Downtown Area', 'Ho Chi Minh City', 'Vietnam', 'path/to/downtown.jpg'),
(27, 'Beachfront Resort', 'Phuket', 'Thailand', 'path/to/beachfront-resort.jpg'),
(28, 'Mountain Retreat', 'Dalat', 'Vietnam', 'path/to/mountain-retreat.jpg'),
(29, 'City Center', 'Tokyo', 'Japan', 'path/to/city-center.jpg'),
(30, 'Seaside Villa', 'Nice', 'France', 'path/to/seaside-villa.jpg'),
(31, 'Riverside View', 'Can Tho', 'Vietnam', 'path/to/riverside-view.jpg'),
(32, 'Skyline Heights', 'Seoul', 'South Korea', 'path/to/skyline-heights.jpg'),
(33, 'Island Paradise', 'Bali', 'Indonesia', 'path/to/island-paradise.jpg'),
(34, 'Historic District', 'Kyoto', 'Japan', 'path/to/historic-district.jpg'),
(35, 'Garden Oasis', 'Singapore', 'Singapore', 'path/to/garden-oasis.jpg'),
(36, 'Lakefront Retreat', 'Hanoi', 'Vietnam', 'path/to/lakefront-retreat.jpg'),
(37, 'Urban Loft', 'New York City', 'United States', 'path/to/urban-loft.jpg'),
(38, 'Desert Escape', 'Dubai', 'United Arab Emirates', 'path/to/desert-escape.jpg'),
(39, 'Ski Chalet', 'Chamonix', 'France', 'path/to/ski-chalet.jpg'),
(40, 'Tropical Hideaway', 'Phuket', 'Thailand', 'path/to/tropical-hideaway.jpg'),
(41, 'Countryside Cottage', 'Oxford', 'United Kingdom', 'path/to/countryside-cottage.jpg'),
(42, 'Oceanfront Condo', 'Miami', 'United States', 'path/to/oceanfront-condo.jpg'),
(43, 'Cityscape Penthouse', 'Sydney', 'Australia', 'path/to/cityscape-penthouse.jpg'),
(44, 'Forest Cabin', 'Vancouver', 'Canada', 'path/to/forest-cabin.jpg'),
(45, 'Historical Landmark', 'Rome', 'Italy', 'path/to/historical-landmark.jpg'),
(46, 'Luxury Yacht', 'Monaco', 'Monaco', 'path/to/luxury-yacht.jpg'),
(47, 'Meadow View', 'Zurich', 'Switzerland', 'path/to/meadow-view.jpg'),
(48, 'Lakeside Mansion', 'Geneva', 'Switzerland', 'path/to/lakeside-mansion.jpg'),
(49, 'Skyscraper Oasis', 'Shanghai', 'China', 'path/to/skyscraper-oasis.jpg'),
(50, 'Rural Farmhouse', 'Auckland', 'New Zealand', 'path/to/rural-farmhouse.jpg');


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;