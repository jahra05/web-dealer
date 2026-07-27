-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 27, 2026 at 08:59 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dealer_motor`
--

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `id_message` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `no_hp` varchar(20) NOT NULL,
  `subjek` varchar(150) NOT NULL,
  `pesan` text NOT NULL,
  `status` enum('Belum Dibaca','Sudah Dibaca') DEFAULT 'Belum Dibaca',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contact`
--

INSERT INTO `contact` (`id_message`, `nama`, `email`, `no_hp`, `subjek`, `pesan`, `status`, `created_at`) VALUES
(2, 'lilis', 'lilis@gmail', '08242546', 'pengajuan', 'dadada', 'Belum Dibaca', '2026-07-13 13:11:55'),
(4, 'jiso', 'jiso@gmail', '09530535353', 'harus dp berapa ', 'bisa sat aluhat produk nya', 'Sudah Dibaca', '2026-07-16 08:04:42'),
(6, 'jamal', 'jamal@gmail.com', '08978091008', 'alamat', 'lokasi atau alamt dealer ada dimana saja ', 'Belum Dibaca', '2026-07-24 08:01:01');

-- --------------------------------------------------------

--
-- Table structure for table `faq`
--

CREATE TABLE `faq` (
  `id_faq` int(11) NOT NULL,
  `pertanyaan` varchar(255) NOT NULL,
  `jawaban` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `faq`
--

INSERT INTO `faq` (`id_faq`, `pertanyaan`, `jawaban`) VALUES
(2, 'Apa saja pilihan jangka waktu (tenor) cicilan yang tersedia?', 'Kami menyediakan pilihan tenor yang bervariasi, mulai dari 11 bulan, 17 bulan, 23 bulan, hingga 35 bulan sesuai dengan kebijakan leasing yang bekerja sama dengan kami.'),
(3, 'Bagaimana cara melakukan simulasi kredit motor di website ini?', 'Kamu cukup memilih unit motor yang diinginkan, kemudian masuk ke fitur \"Simulasi Kredit\". Pilih jumlah Uang Muka (DP) yang diinginkan dan pilih jangka waktu cicilan (tenor). Sistem akan otomatis menghitung perkiraan angsuran per bulan secara real-time.'),
(4, 'Bagaimana jika saya ingin mengajukan kredit setelah melakukan simulasi?', 'Kamu bisa langsung menekan tombol \"Ajukan Kredit\" atau \"Hubungi Sales\" yang tertera di halaman detail motor untuk terhubung langsung dengan tim admin kami.'),
(5, 'Apakah hasil simulasi kredit di website ini sudah pasti akurat', 'Nilai simulasi yang tertera merupakan estimasi atau perkiraan awal menggunakan perhitungan standar. Nilai resmi, suku bunga terbaru, dan biaya admin final akan dikonfirmasi kembali oleh pihak dealer dan leasing saat pengajuan resmi diproses.'),
(6, 'Berapa minimal Uang Muka (DP) yang bisa saya pilih?', 'Batas minimal dan maksimal DP dihitung berdasarkan persentase harga motor yang dipilih (umumnya mulai dari 10% dari harga OTR motor).');

-- --------------------------------------------------------

--
-- Table structure for table `kategori`
--

CREATE TABLE `kategori` (
  `id_kategori` int(125) NOT NULL,
  `nama_kategori` varchar(355) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kategori`
--

INSERT INTO `kategori` (`id_kategori`, `nama_kategori`, `created_at`, `update_at`) VALUES
(1, 'Matic', '2026-07-08 12:19:29', '2026-07-08 12:19:29'),
(2, 'Sport', '2026-07-08 12:19:29', '2026-07-08 12:19:29'),
(3, 'Cub', '2026-07-16 02:04:57', '2026-07-16 02:04:57'),
(4, 'EV', '2026-07-16 02:04:57', '2026-07-16 02:04:57'),
(5, 'BigBike', '2026-07-16 02:05:13', '2026-07-16 02:05:13');

-- --------------------------------------------------------

--
-- Table structure for table `motor`
--

CREATE TABLE `motor` (
  `id_motor` int(125) NOT NULL,
  `nama_motor` varchar(150) NOT NULL,
  `id_kategori` int(11) NOT NULL,
  `id_tipe` int(11) NOT NULL,
  `harga` decimal(10,0) NOT NULL,
  `stok` int(11) NOT NULL,
  `tahun` int(11) NOT NULL,
  `deskripsi` text NOT NULL,
  `gambar` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `motor`
--

INSERT INTO `motor` (`id_motor`, `nama_motor`, `id_kategori`, `id_tipe`, `harga`, `stok`, `tahun`, `deskripsi`, `gambar`, `created_at`, `updated_at`) VALUES
(9, 'ADV 160 RoadSync', 1, 12, 41825000, 12, 2024, 'Skutik adventure dengan Honda RoadSync untuk perjalanan nyaman.', '1784877948926_adv160-readsync.png', '2026-07-21 04:20:50', '2026-07-21 04:20:50'),
(10, 'PCX 160 RoadSync', 1, 11, 40975000, 10, 2023, 'PCX premium dengan fitur Honda RoadSync dan konektivitas smartphone.', '1784877919970_pcx160-readsync.png', '2026-07-21 04:24:28', '2026-07-21 04:24:28'),
(11, 'PCX 160 ABS', 1, 11, 37675000, 21, 2024, 'PCX dengan sistem pengereman ABS untuk keamanan lebih baik.', '1784877929974_pcx160-abs.png', '2026-07-21 04:26:26', '2026-07-21 04:26:26'),
(12, 'PCX 160 CBS', 1, 11, 34150000, 30, 2014, 'Skutik premium 160 cc dengan kenyamanan maksimal.', '1784877939688_pcx160-cbs.png', '2026-07-21 04:27:19', '2026-07-21 04:27:19'),
(13, 'Genio CBS ISS', 1, 10, 21275000, 12, 2015, 'Genio dengan fitur Idling Stop System yang lebih efisien.', '1784877884938_vario125-cbs-iss.png', '2026-07-21 04:28:17', '2026-07-21 04:28:17'),
(14, 'Genio CBS', 1, 10, 20850000, 11, 2012, 'Skutik kompak yang lincah dan hemat bahan bakar.', '1784877902004_genio-cbs.png', '2026-07-21 04:29:10', '2026-07-21 04:29:10'),
(15, 'Scoopy Stylish', 1, 8, 24475000, 12, 2014, 'Skutik modern dengan desain elegan dan fitur lengkap.', '1784877795808_scoopy-stylish.png', '2026-07-21 04:30:22', '2026-07-21 04:30:22'),
(16, 'Scoopy Prestige', 1, 8, 24475000, 13, 2013, 'Skutik retro premium dengan tampilan eksklusif.', '1784877805959_scopy-prestige.png', '2026-07-21 04:32:07', '2026-07-21 04:32:07'),
(17, 'Scoopy Fashion', 1, 8, 23675000, 12, 2013, 'Skutik bergaya fashionable untuk penggunaan ', '1784608608036_scoopy-fashion.png', '2026-07-21 04:36:48', '2026-07-21 04:36:48'),
(18, 'Beat Deluxe Smart Key', 1, 7, 21050000, 13, 2013, 'Beat Deluxe dengan fitur Smart Key tanpa anak kunci.', '1784877782387_beat-deluxe.png', '2026-07-21 04:37:45', '2026-07-21 04:37:45'),
(19, 'Honda Stylo 160 ABS', 1, 5, 32725000, 21, 2012, 'Skutik premium bergaya klasik dengan pengereman ABS.', '1784877746295_stylo160-abs.png', '2026-07-21 04:38:36', '2026-07-21 04:38:36'),
(20, 'BeAt Street', 1, 6, 20600000, 12, 2014, 'Skutik bergaya street dengan setang telanjang.', '1784878134606_beat-street.png', '2026-07-21 04:39:56', '2026-07-21 04:39:56'),
(21, 'Honda Stylo 160 CBS', 1, 5, 29750000, 30, 2013, 'Skutik bergaya retro modern dengan mesin 160 cc.', '1784877757717_stylo160-cbs.png', '2026-07-21 04:41:50', '2026-07-21 04:41:50'),
(22, 'Vario Street ', 1, 4, 27250000, 12, 2012, 'Skutik bergaya sporty dengan tampilan modern.', '1784878203998_vario-street.png', '2026-07-21 04:42:40', '2026-07-21 04:42:40'),
(23, 'Vario 125 CBS ISS', 1, 3, 26750000, 12, 2012, 'Vario 125 dengan fitur Idling Stop System yang hemat bahan ', '1784877721599_vario125-cbs-iss.png', '2026-07-21 04:43:30', '2026-07-21 04:43:30'),
(24, 'Vario 125 CBS', 1, 3, 24875000, 12, 2012, 'Skutik irit dan nyaman untuk mobilitas sehari-hari.', '1784877733860_vario125-cbs.png', '2026-07-21 04:44:16', '2026-07-21 04:44:16'),
(25, 'Vario 160 ABS SP', 1, 2, 28850000, 12, 2012, 'Varian tertinggi Vario 160 dengan fitur lebih lengkap.', '1784877690414_vario160-abs.png', '2026-07-21 04:45:08', '2026-07-21 04:45:08'),
(26, 'Vario 160 ABS', 1, 2, 31625000, 12, 2013, 'Skutik premium dengan fitur ABS dan mesin 160 cc.', '1784877708536_vario16-abs.png', '2026-07-21 04:45:53', '2026-07-21 04:45:53'),
(27, 'Vario 160 CBS', 2, 2, 28600000, 12, 2012, 'Skutik 160 cc bertenaga untuk penggunaan harian.', '1784877984144_vario160-abs.png', '2026-07-21 04:47:31', '2026-07-21 04:47:31'),
(28, 'CBR 150R STD ABS', 1, 1, 43375000, 12, 2012, 'Motor sport premium dengan sistem pengereman ABS.', '1784877665639_cbr150-abs.png', '2026-07-21 04:48:26', '2026-07-21 04:48:26'),
(29, 'CBR 150 CBS', 2, 1, 39425000, 12, 2024, 'Motor sport 150 cc dengan fitur CBS untuk pengereman lebih stabil.', '1784877959977_cbr150-cbs..png', '2026-07-21 04:49:15', '2026-07-21 04:49:15');

-- --------------------------------------------------------

--
-- Table structure for table `pengajuan`
--

CREATE TABLE `pengajuan` (
  `id_pengajuan` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `no_hp` varchar(20) NOT NULL,
  `alamat` text NOT NULL,
  `pekerjaan` varchar(100) NOT NULL,
  `id_motor` int(11) NOT NULL,
  `tanggal_pengajuan` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` enum('Menunggu','Diproses','Disetujui','Ditolak') DEFAULT 'Menunggu'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pengajuan`
--

INSERT INTO `pengajuan` (`id_pengajuan`, `nama`, `no_hp`, `alamat`, `pekerjaan`, `id_motor`, `tanggal_pengajuan`, `status`) VALUES
(9, 'Rose', '0857836908', 'jalan kenangan berjudul solo', 'penyanyi', 29, '2026-07-24 07:59:41', 'Menunggu'),
(10, 'jeamin', '089734392', 'jeju korea selatan', 'karyawan SM', 20, '2026-07-24 08:01:54', 'Menunggu');

-- --------------------------------------------------------

--
-- Table structure for table `simulasi_kredit`
--

CREATE TABLE `simulasi_kredit` (
  `id_simulasi` int(11) NOT NULL,
  `id_motor` int(11) NOT NULL,
  `dp` int(11) NOT NULL,
  `tenor` int(11) NOT NULL,
  `bunga` decimal(5,2) NOT NULL,
  `cicilan` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `simulasi_kredit`
--

INSERT INTO `simulasi_kredit` (`id_simulasi`, `id_motor`, `dp`, `tenor`, `bunga`, `cicilan`) VALUES
(6, 23, 10000, 12, 12.00, 354507);

-- --------------------------------------------------------

--
-- Table structure for table `spesifikasi_motor`
--

CREATE TABLE `spesifikasi_motor` (
  `id_spesifikasi` int(11) NOT NULL,
  `id_motor` int(11) NOT NULL,
  `kapasitas_mesin` varchar(100) NOT NULL,
  `tenaga` varchar(100) NOT NULL,
  `torsi` varchar(100) NOT NULL,
  `transmisi` varchar(100) NOT NULL,
  `berat` varchar(11) NOT NULL,
  `tinggi_jok` varchar(11) NOT NULL,
  `kapasitas_tengki` varchar(100) NOT NULL,
  `mesin` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `spesifikasi_motor`
--

INSERT INTO `spesifikasi_motor` (`id_spesifikasi`, `id_motor`, `kapasitas_mesin`, `tenaga`, `torsi`, `transmisi`, `berat`, `tinggi_jok`, `kapasitas_tengki`, `mesin`) VALUES
(8, 9, '156,9 cc', '11,8 kW / 8.500 rpm', '14,7 Nm / 6.500 rpm', 'CVT Otomatis', '133 kg', '780 mm', '8,1 L', 'eSP+, 4 Katup'),
(9, 10, '156,9 cc', '11,8 kW / 8.500 rpm', '11,8 kW / 8.500 rpm', 'CVT Otomatis', '132 kg', '764 mm', '8,1 L', 'eSP+, 4 Katup'),
(10, 11, '156,9 cc', '11,8 kW / 8.500 rpm', '14,7 Nm / 6.500 rpm', 'CVT Otomatis', '132 kg', '764 mm', '8,1 L', 'eSP+, 4 Katup'),
(11, 12, '156,9 cc', '11,8 kW / 8.500 rpm', '14,7 Nm / 6.500 rpm', 'CVT Otomatis', '131 kg', '764 mm', '8,1 L', 'eSP+, 4 Katup'),
(12, 13, '109,5 cc', '6,6 kW / 7.500 rpm', '9,3 Nm / 5.500 rpm', 'CVT Otomatis', '93 kg', '740 mm', '4,2 L', 'eSP, PGM-FI'),
(13, 14, '109,5 cc', '6,6 kW / 7.500 rpm', '9,3 Nm / 5.500 rpm', 'CVT Otomatis', '92 kg', '740 mm', '4,2 L', 'eSP, PGM-FI'),
(14, 15, '109,5 cc', '6,6 kW / 7.500 rpm', '9,3 Nm / 5.500 rpm', 'CVT Otomatis', '94 kg', '746 mm', '4,2 L', 'eSP, PGM-FI'),
(15, 17, '109,5 cc', '6,6 kW / 7.500 rpm', '9,3 Nm / 5.500 rpm', 'CVT Otomatis', '94 kg', '746 mm', '4,2 L', 'eSP, PGM-FI'),
(16, 16, '109,5 cc', '6,6 kW / 7.500 rpm', '9,3 Nm / 5.500 rpm', 'CVT Otomatis', '94 kg', '746 mm', '4,2 L', 'eSP, PGM-FI'),
(17, 18, '109,5 cc', '6,6 kW / 7.500 rpm', '9,2 Nm / 6.000 rpm', 'CVT Otomatis', '90 kg', '740 mm', '4,2 L', 'eSP, PGM-FI'),
(18, 20, '109,5 cc', '6,6 kW / 7.500 rpm', '9,2 Nm / 6.000 rpm', 'CVT Otomatis', '89 kg', ' 742 mm', '4,2 L', 'eSP, PGM-FI'),
(19, 19, '156,9 cc', '11,3 kW / 8.500 rpm', '13,8 Nm / 7.000 rpm', 'CVT Otomatis', '118 kg', '768 mm', '5 L', 'eSP+, 4 Katup'),
(20, 21, '156,9 cc', '11,3 kW / 8.500 rpm', '13,8 Nm / 7.000 rpm', 'CVT Otomatis', '118 kg', '768 mm', '5 L', 'eSP+, 4 Katup'),
(21, 22, '124,8 cc', '8,2 kW / 8.500 rpm', '10,8 Nm / 5.000 rpm', 'CVT Otomatis', '113 kg', '769 mm', '5,5 L', 'eSP, PGM-FI'),
(22, 23, '124,8 cc', '8,2 kW / 8.500 rpm', '10,8 Nm / 5.000 rpm', 'CVT Otomatis', '113 kg', '769 mm', '5,5 L', 'eSP, PGM-FI'),
(23, 24, '124,8 cc', '8,2 kW / 8.500 rpm', '10,8 Nm / 5.000 rpm', 'CVT Otomatis', '112 kg', '769 mm', '5,5 L', 'eSP, PGM-FI'),
(24, 25, '156,9 cc', '11,3 kW / 8.500 rpm', '13,8 Nm / 7.000 rpm', 'CVT Otomatis', '117 kg', '778 mm', '5,5 L', 'eSP+, 4 Katup, PGM-FI'),
(26, 26, '156,9 cc', '11,3 kW / 8.500 rpm', '13,8 Nm / 7.000 rpm', 'CVT Otomatis', '117 kg', '778 mm', '5,5 L', 'eSP+, 4 Katup, PGM-FI'),
(27, 28, '149,16 cc', '12,6 kW / 9.000 rpm', '14,4 Nm / 7.000 rpm', 'Manual 6 Percepatan', '139 kg', '782 mm', '12 L', 'DOHC, 4 Katup, PGM-FI'),
(28, 29, '149,16 cc', '12,6 kW / 9.000 rpm', '14,4 Nm / 7.000 rpm', 'Manual 6 Percepatan', '137 kg', '782 mm', '12 L', 'DOHC, 4 Katup, PGM-FI');

-- --------------------------------------------------------

--
-- Table structure for table `testimoni`
--

CREATE TABLE `testimoni` (
  `id_testimoni` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `pekerjaan` varchar(100) DEFAULT NULL,
  `isi_testimoni` text NOT NULL,
  `rating` int(11) NOT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `testimoni`
--

INSERT INTO `testimoni` (`id_testimoni`, `nama`, `pekerjaan`, `isi_testimoni`, `rating`, `foto`, `created_at`) VALUES
(2, 'Edo', 'karyawan swasta', 'petugas atau karywanya ramah dan sabar dalam menjawab pertanyaan saya', 4, '1784622986177_user1.avif', '2026-07-11 13:57:55'),
(3, 'Syela', 'Arsitektur', 'Produk yang ditawarka sangat menarik dan ada banyak model dan warna ', 5, '1784621378319_user3.avif', '2026-07-13 03:06:04'),
(4, 'Nurul', 'Pedagang Roti', 'saya kurang nyama dengan salah satu pekerja , dia judes dalam melakukan pelayanana', 2, '1784623053701_user2.webp', '2026-07-21 08:37:33'),
(5, 'Sam', 'Chef', 'sangat suka dengan produk - produk nya ', 5, '1784623096173_user4.jpg', '2026-07-21 08:38:16');

-- --------------------------------------------------------

--
-- Table structure for table `tipe`
--

CREATE TABLE `tipe` (
  `id_tipe` int(125) NOT NULL,
  `nama_tipe` varchar(100) NOT NULL,
  `id_kategori` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tipe`
--

INSERT INTO `tipe` (`id_tipe`, `nama_tipe`, `id_kategori`, `created_at`, `update_at`) VALUES
(1, 'CBR 150R', 2, '2026-07-09 07:30:48', '2026-07-09 07:30:48'),
(2, 'Vario 160', 1, '2026-07-09 07:30:48', '2026-07-09 07:30:48'),
(3, 'Vario 125', 1, '2026-07-16 02:11:25', '2026-07-16 02:11:25'),
(4, 'Vario Street ', 1, '2026-07-16 02:11:25', '2026-07-16 02:11:25'),
(5, 'Stylo 160', 1, '2026-07-16 02:11:25', '2026-07-16 02:11:25'),
(6, 'BeAt Street', 1, '2026-07-16 02:11:25', '2026-07-16 02:11:25'),
(7, 'BeAt', 1, '2026-07-16 02:12:37', '2026-07-16 02:12:37'),
(8, 'Scoopy', 1, '2026-07-16 02:12:37', '2026-07-16 02:12:37'),
(9, 'Scoopy', 1, '2026-07-16 02:13:27', '2026-07-16 02:13:27'),
(10, 'Genio', 1, '2026-07-16 02:13:27', '2026-07-16 02:13:27'),
(11, 'PCX 160', 1, '2026-07-16 02:14:12', '2026-07-16 02:14:12'),
(12, 'ADV 160', 1, '2026-07-16 02:14:12', '2026-07-16 02:14:12');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `username` varchar(125) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `username`, `password`, `created_at`, `updated_at`) VALUES
(1, 'admin', '12345', '2026-07-08 09:00:03', '2026-07-08 09:00:03');

-- --------------------------------------------------------

--
-- Table structure for table `varian`
--

CREATE TABLE `varian` (
  `id_varian` int(125) NOT NULL,
  `nama_varian` varchar(125) NOT NULL,
  `id_tipe` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `varian`
--

INSERT INTO `varian` (`id_varian`, `nama_varian`, `id_tipe`, `created_at`, `update_at`) VALUES
(1, 'CBS', 1, '2026-07-09 10:00:54', '2026-07-09 10:00:54'),
(2, 'STD ABS', 1, '2026-07-16 02:21:48', '2026-07-16 02:21:48'),
(3, 'ABS', 2, '2026-07-16 02:21:48', '2026-07-16 02:21:48'),
(4, 'ABS SP', 2, '2026-07-16 03:24:53', '2026-07-16 03:24:53'),
(5, 'CBS ISS', 3, '2026-07-16 03:24:53', '2026-07-16 03:24:53'),
(6, 'Standart', 4, '2026-07-16 03:24:53', '2026-07-16 03:24:53'),
(7, 'Deluxe', 7, '2026-07-16 03:24:53', '2026-07-16 03:24:53'),
(8, 'Deluxe Smart Key', 7, '2026-07-16 03:24:53', '2026-07-16 03:24:53'),
(9, 'Prestige', 8, '2026-07-16 03:24:53', '2026-07-16 03:24:53'),
(10, 'Fashion', 8, '2026-07-16 03:24:53', '2026-07-16 03:24:53'),
(11, 'Stylish', 8, '2026-07-16 03:24:53', '2026-07-16 03:24:53'),
(12, 'RoadSync', 12, '2026-07-16 03:24:53', '2026-07-16 03:24:53'),
(13, 'ABS', 11, '2026-07-16 03:24:53', '2026-07-16 03:24:53'),
(14, 'CBS', 11, '2026-07-16 03:24:53', '2026-07-16 03:24:53');

-- --------------------------------------------------------

--
-- Table structure for table `warna`
--

CREATE TABLE `warna` (
  `id_warna` int(11) NOT NULL,
  `nama_warna` varchar(100) NOT NULL,
  `kode_warna` varchar(100) NOT NULL,
  `id_motor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`id_message`);

--
-- Indexes for table `faq`
--
ALTER TABLE `faq`
  ADD PRIMARY KEY (`id_faq`);

--
-- Indexes for table `kategori`
--
ALTER TABLE `kategori`
  ADD PRIMARY KEY (`id_kategori`);

--
-- Indexes for table `motor`
--
ALTER TABLE `motor`
  ADD PRIMARY KEY (`id_motor`),
  ADD KEY `fk_motor_kategori` (`id_kategori`),
  ADD KEY `fk_motor_tipe` (`id_tipe`);

--
-- Indexes for table `pengajuan`
--
ALTER TABLE `pengajuan`
  ADD PRIMARY KEY (`id_pengajuan`),
  ADD KEY `id_motor` (`id_motor`);

--
-- Indexes for table `simulasi_kredit`
--
ALTER TABLE `simulasi_kredit`
  ADD PRIMARY KEY (`id_simulasi`),
  ADD KEY `id_motor` (`id_motor`);

--
-- Indexes for table `spesifikasi_motor`
--
ALTER TABLE `spesifikasi_motor`
  ADD PRIMARY KEY (`id_spesifikasi`),
  ADD KEY `fk_motor_spesifikasi` (`id_motor`);

--
-- Indexes for table `testimoni`
--
ALTER TABLE `testimoni`
  ADD PRIMARY KEY (`id_testimoni`);

--
-- Indexes for table `tipe`
--
ALTER TABLE `tipe`
  ADD PRIMARY KEY (`id_tipe`),
  ADD KEY `fk_tipe_kategori` (`id_kategori`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

--
-- Indexes for table `varian`
--
ALTER TABLE `varian`
  ADD PRIMARY KEY (`id_varian`),
  ADD KEY `fk_varian_tipe` (`id_tipe`);

--
-- Indexes for table `warna`
--
ALTER TABLE `warna`
  ADD PRIMARY KEY (`id_warna`),
  ADD KEY `fk_warna_motor` (`id_motor`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `id_message` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `faq`
--
ALTER TABLE `faq`
  MODIFY `id_faq` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `kategori`
--
ALTER TABLE `kategori`
  MODIFY `id_kategori` int(125) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `motor`
--
ALTER TABLE `motor`
  MODIFY `id_motor` int(125) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `pengajuan`
--
ALTER TABLE `pengajuan`
  MODIFY `id_pengajuan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `simulasi_kredit`
--
ALTER TABLE `simulasi_kredit`
  MODIFY `id_simulasi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `spesifikasi_motor`
--
ALTER TABLE `spesifikasi_motor`
  MODIFY `id_spesifikasi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `testimoni`
--
ALTER TABLE `testimoni`
  MODIFY `id_testimoni` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tipe`
--
ALTER TABLE `tipe`
  MODIFY `id_tipe` int(125) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `varian`
--
ALTER TABLE `varian`
  MODIFY `id_varian` int(125) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT for table `warna`
--
ALTER TABLE `warna`
  MODIFY `id_warna` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `motor`
--
ALTER TABLE `motor`
  ADD CONSTRAINT `fk_motor_kategori` FOREIGN KEY (`id_kategori`) REFERENCES `kategori` (`id_kategori`),
  ADD CONSTRAINT `fk_motor_tipe` FOREIGN KEY (`id_tipe`) REFERENCES `tipe` (`id_tipe`);

--
-- Constraints for table `pengajuan`
--
ALTER TABLE `pengajuan`
  ADD CONSTRAINT `pengajuan_ibfk_1` FOREIGN KEY (`id_motor`) REFERENCES `motor` (`id_motor`);

--
-- Constraints for table `simulasi_kredit`
--
ALTER TABLE `simulasi_kredit`
  ADD CONSTRAINT `simulasi_kredit_ibfk_1` FOREIGN KEY (`id_motor`) REFERENCES `motor` (`id_motor`);

--
-- Constraints for table `spesifikasi_motor`
--
ALTER TABLE `spesifikasi_motor`
  ADD CONSTRAINT `fk_motor_spesifikasi` FOREIGN KEY (`id_motor`) REFERENCES `motor` (`id_motor`);

--
-- Constraints for table `tipe`
--
ALTER TABLE `tipe`
  ADD CONSTRAINT `fk_tipe_kategori` FOREIGN KEY (`id_kategori`) REFERENCES `kategori` (`id_kategori`);

--
-- Constraints for table `varian`
--
ALTER TABLE `varian`
  ADD CONSTRAINT `fk_varian_tipe` FOREIGN KEY (`id_tipe`) REFERENCES `tipe` (`id_tipe`);

--
-- Constraints for table `warna`
--
ALTER TABLE `warna`
  ADD CONSTRAINT `fk_warna_motor` FOREIGN KEY (`id_motor`) REFERENCES `motor` (`id_motor`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
