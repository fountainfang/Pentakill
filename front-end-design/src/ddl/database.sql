-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 13, 2024 at 12:57 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pendakill`
--

-- --------------------------------------------------------

--
-- Table structure for table `Event`
--

CREATE TABLE `Event` (
  `eventId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `eventName` varchar(255) NOT NULL,
  `eventCategory` enum('Concert','Drama','Sport') NOT NULL,
  `eventDesc` text DEFAULT NULL,
  `eventDate` date NOT NULL,
  `startTime` time NOT NULL,
  `endTime` time NOT NULL,
  `address` varchar(255) NOT NULL,
  `totalTicket` int(11) NOT NULL,
  `ticketPrice` decimal(10,2) NOT NULL,
  `profileImage` varchar(255) DEFAULT NULL,
  `bannerImage` varchar(255) DEFAULT NULL,
  `rating` decimal(2,1) DEFAULT NULL,
  `approvalStatus` enum('Approved','Pending','Rejected') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Event`
--

INSERT INTO `Event` (`eventId`, `userId`, `eventName`, `eventCategory`, `eventDesc`, `eventDate`, `startTime`, `endTime`, `address`, `totalTicket`, `ticketPrice`, `profileImage`, `bannerImage`, `rating`, `approvalStatus`) VALUES
(1, 105, 'THE PHANTOM OF THE OPERA', 'Concert', 'Experience the magic of The Phantom of the Opera...', '2024-04-10', '19:00:00', '22:00:00', 'The Royal Opera House, London, UK', 1200, 150.00, '/sample_posters/small/s-1.jpg', '/sample_posters/small/s-1.jpg', 5.0, 'Rejected'),
(2, 105, 'The New Yorker', 'Drama', 'Explore the bustling city of New York through the eyes of The New Yorker...', '2024-05-05', '18:30:00', '21:30:00', 'Times Square, New York, NY', 800, 50.00, '/sample_posters/small/s-2.jpg', '../sample_posters/eventpage/drama/2.jpg', 4.0, 'Approved'),
(3, 0, 'Don Juan', 'Drama', 'Witness the captivating tale of Don Juan unfold...', '2024-06-20', '19:30:00', '22:30:00', 'Teatro Real, Madrid, Spain', 700, 180.00, '/sample_posters/small/s-3.jpg', '../sample_posters/eventpage/drama/3.jpg', 4.8, 'Rejected'),
(4, 0, 'Romeo and Juliet', 'Drama', 'Experience the timeless tragedy of Romeo and Juliet...', '2024-07-15', '20:00:00', '23:00:00', 'Globe Theatre, London, UK', 900, 120.00, '/sample_posters/small/s-4.jpg', '../sample_posters/eventpage/drama/4.jpg', 4.9, 'Approved'),
(5, 0, 'Alton\'s Jazz', 'Concert', 'Immerse yourself in the soulful melodies of Alton\'s Jazz...', '2024-08-10', '21:00:00', '00:00:00', 'Blue Note Jazz Club, New York, NY', 500, 75.00, '/sample_posters/small/s-5.jpg', '/sample_posters/small/s-5.jpg', 4.7, 'Rejected'),
(6, 0, 'ADELE LIVE CONCERT', 'Concert', 'Get ready for an electrifying performance by Adele...', '2024-09-05', '20:30:00', '23:30:00', 'Staples Center, Los Angeles, CA', 1500, 200.00, '/sample_posters/small/s-6.jpg', '/sample_posters/banner/concert.webp', 5.0, 'Approved'),
(7, 0, 'RACHELE GENSOLIN PIANO RECITAL', 'Concert', 'Experience the masterful piano performance by Rachele Gensolin...', '2024-10-20', '19:00:00', '22:00:00', 'Carnegie Hall, New York, NY', 600, 90.00, '/sample_posters/small/s-7.jpg', '/sample_posters/banner/orchestra.jpeg', 4.6, 'Approved'),
(8, 0, 'Senio\'s Recital Marianne Rohbock with Nie Maughan', 'Concert', 'Join us for an evening of classical music with Senio\'s Recital...', '2024-11-15', '18:00:00', '21:00:00', 'The Kennedy Center, Washington D.C., USA', 550, 110.00, '/sample_posters/small/s-8.jpg', '/sample_posters/banner/orchestra.jpeg', 4.5, 'Rejected'),
(9, 0, 'TORONTO RAPTORS', 'Sport', 'Cheer for the Toronto Raptors as they take on their rivals...', '2024-12-10', '19:30:00', '22:30:00', 'Scotiabank Arena, Toronto, Canada', 20000, 60.00, '/sample_posters/small/s-9.jpg', '/sample_posters/banner/sport.jpeg', 4.3, 'Rejected'),
(10, 0, 'LFC vs MANCHESTER UNITED', 'Sport', 'Witness the fierce rivalry between Liverpool FC and Manchester United...', '2025-01-05', '17:00:00', '20:00:00', 'Anfield, Liverpool, UK', 54000, 250.00, '/sample_posters/small/s-10.jpg', '/sample_posters/banner/sport.jpeg', 4.8, 'Pending'),
(11, 0, 'FIRST TEAM TO 60 WINS', 'Sport', 'Don\'t miss the excitement as teams battle it out to reach 60 points first...', '2025-02-20', '15:00:00', '18:00:00', 'Barclays Center, Brooklyn, NY', 18000, 100.00, '/sample_posters/small/s-11.jpg', '/sample_posters/banner/sport.jpeg', 4.4, 'Approved'),
(12, 0, 'MANCHESTER UNITED vs WOLVERHAMPTON', 'Sport', 'Catch the action-packed match between Manchester United and Wolverhampton...', '2025-03-15', '16:30:00', '19:30:00', 'Old Trafford, Manchester, UK', 76000, 95.00, '/sample_posters/small/s-12.jpg', '/sample_posters/banner/sport.jpeg', NULL, 'Pending'),
(14, 0, 'TAYLOR SWIFT CONCERT', 'Concert', 'Join us for an unforgettable night with Taylor Swift...', '2024-03-15', '20:00:00', '23:00:00', 'Madison Square Garden, New York, NY', 1000, 100.00, '/sample_posters/small/s-0.avif', '/sample_posters/banner/concert.webp', 4.5, 'Rejected'),
(15, 105, 'sampletest1-testupdate', 'Concert', 'dnfjkkkkkk', '2024-04-18', '18:22:00', '21:22:00', 'abcde', 1000, 100.00, '/sample_posters/small/s-1.jpg', '/sample_posters/small/s-1.jpg', 0.0, 'Rejected'),
(16, 105, 'sampletest3', 'Concert', 'adsa', '2024-04-09', '18:30:00', '22:30:00', 'sdfnajk', 100, 10.00, '/sample_posters/small/s-1.jpg', '/sample_posters/small/s-1.jpg', 0.0, 'Rejected'),
(17, 105, 'Maroon 5 concert', 'Concert', 'Maroon 5 concert test', '2024-04-20', '19:49:00', '22:49:00', 'abcde', 100, 100.00, '/sample_posters/small/s-11.jpg', '/sample_posters/small/s-11.jpg', 0.0, 'Approved'),
(18, 105, 'test concert111', 'Concert', 'aaaaaaaa', '2024-04-18', '23:42:00', '13:42:00', '111', 1000, 100.00, '/sample_posters/small/default.jpg', '/sample_posters/banner/concert.webp', 0.0, 'Rejected');

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `orderId` int(11) NOT NULL,
  `eventId` int(11) NOT NULL,
  `orderDate` text NOT NULL,
  `ticketPrice` decimal(10,0) NOT NULL,
  `customerId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order`
--

INSERT INTO `order` (`orderId`, `eventId`, `orderDate`, `ticketPrice`, `customerId`) VALUES
(1, 1, '2024-04-08T20:35:15.443Z', 150, 103),
(2, 1, '2024-04-08T20:36:24.196Z', 150, 103),
(9, 1, '2024-04-08T20:44:04.228Z', 150, 102),
(44, 2, '2024-04-09T17:27:33.821Z', 50, 103),
(45, 3, '2024-04-10T00:53:18.108Z', 180, 103),
(46, 6, '2024-04-10T18:26:14.761Z', 200, 108);

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE `review` (
  `reviewId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `firstname` text NOT NULL,
  `lastname` text NOT NULL,
  `phonenumber` text NOT NULL,
  `address` text NOT NULL,
  `city` text NOT NULL,
  `province` text NOT NULL,
  `postalCode` text NOT NULL,
  `country` text NOT NULL,
  `username` text NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `usertype` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `firstname`, `lastname`, `phonenumber`, `address`, `city`, `province`, `postalCode`, `country`, `username`, `email`, `password`, `usertype`) VALUES
(103, 'Charles', 'Bill', '5145779349', '2-235 Hood Rd', 'MARKHAM', 'Ontario', 'L3R4N3', 'Canada', 'user', 'arnold323@qq.com', 'YWFh', 2),
(105, '111', '111', '', '111', '111', '111', '111', 'Canada', 'org', '11111@qq.com', 'YWFh', 1),
(106, 'Cheng', 'Cheng', '2363381230', '15-610 academy way', 'kelowna', 'British Columbia', 'V1V 0H2', 'Canada', 'admin', 'teterussia@icloud.m', 'YWFh', 0),
(107, '111', '111', '', '111', '111', '111', '111', 'Canada', 'testuser', '111@qq.com', 'MWFh', 2),
(108, '111', '111', '', '111', '111', '111', '111', 'Canada', 'testuser1', '111@qq.c', 'YWFh', 2),
(109, '111', '111', '', '111', '111', '111', '111', 'Canada', 'testuser2', '111@qq.com', 'YWFh', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Event`
--
ALTER TABLE `Event`
  ADD PRIMARY KEY (`eventId`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`orderId`);

--
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`reviewId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`) USING HASH;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Event`
--
ALTER TABLE `Event`
  MODIFY `eventId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `orderId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `review`
--
ALTER TABLE `review`
  MODIFY `reviewId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=110;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
