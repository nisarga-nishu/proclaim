-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 24, 2019 at 06:33 AM
-- Server version: 10.1.36-MariaDB
-- PHP Version: 5.6.38

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `proclaim`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `id` int(11) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `customer_type` int(11) NOT NULL,
  `industry` int(11) NOT NULL,
  `business_location` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `insert_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`id`, `user_name`, `first_name`, `last_name`, `customer_type`, `industry`, `business_location`, `email`, `password`, `status`, `insert_date`) VALUES
(1, 'hemant7474', 'hemant', 'sharma', 1, 334, 29, 'hemant650@gmail.com', '123456', 1, '2019-05-20 17:42:47'),
(6, 'jazz8781', 'jazz', 'homi', 1, 333, 42, 'jazz.homi@gmail.com', '123456', 1, '2019-05-21 16:19:50');

-- --------------------------------------------------------

--
-- Table structure for table `ticket`
--

CREATE TABLE `ticket` (
  `ticket_id` int(11) NOT NULL,
  `ticket_no` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  `threat_faced` varchar(255) NOT NULL,
  `priority` int(11) NOT NULL,
  `datetime` datetime NOT NULL,
  `location` varchar(255) NOT NULL,
  `desc_offence` text NOT NULL,
  `name_offenders` varchar(255) NOT NULL,
  `evidence1` varchar(255) NOT NULL,
  `evidence2` varchar(255) NOT NULL,
  `evidence3` varchar(255) NOT NULL,
  `ticket_status` int(11) NOT NULL DEFAULT '1',
  `insert_date` datetime NOT NULL,
  `token` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ticket`
--

INSERT INTO `ticket` (`ticket_id`, `ticket_no`, `user_id`, `threat_faced`, `priority`, `datetime`, `location`, `desc_offence`, `name_offenders`, `evidence1`, `evidence2`, `evidence3`, `ticket_status`, `insert_date`, `token`) VALUES
(1, '1411', 1, 'Work harassment', 2, '2019-05-21 19:00:00', 'Ambabari', 'Joy test', 'Joy', '414232-PDD5TA-7.jpg', '', '', 1, '2019-05-21 18:03:30', '0'),
(2, '1412', 1, 'Stone pelting', 3, '2019-05-21 08:00:00', 'Ambabari', 'test', 'Joy', '39580107-business-wallpapers.jpg', 'assembly-area.png', '', 1, '2019-05-21 19:05:37', '0'),
(3, '1413', 1, 'Favoring enemies', 2, '2019-05-22 10:28:00', 'G-66,Cross Road Mall, Central Spine Rd, Vidyadhar Nagar, Jaipur, Rajasthan 302023, India', 'test', 'Raj', '414232-PDD5TA-7.jpg', '1457224438932982445.jpeg', '', 1, '2019-05-22 10:17:29', '0'),
(4, '1414', 1, 'Work harassment', 1, '2019-05-22 11:48:00', 'G-66,Cross Road Mall, Central Spine Rd, Vidyadhar Nagar, Jaipur, Rajasthan 302023, India', 'test', 'Aman', 'Badminton-Promo-Register-Interest-Blue.png', '', '', 1, '2019-05-22 11:48:02', '0'),
(5, '1415', 1, 'Work harassment', 1, '2019-05-22 16:12:00', 'G-66,Cross Road Mall, Central Spine Rd, Vidyadhar Nagar, Jaipur, Rajasthan 302023, India', 'test', 'Raj', '', '', '', 1, '2019-05-22 16:10:48', '0'),
(8, '1416', 0, 'Work harassment', 2, '2019-05-24 10:00:00', 'G-66,Cross Road Mall, Central Spine Rd, Vidyadhar Nagar, Jaipur, Rajasthan 302023, India', 'test', 'Joy', 'air-conditioner.png', '', '', 1, '2019-05-24 10:00:21', 'hemant4451'),
(9, '1417', 1, 'Work harassment', 2, '2019-05-24 10:02:00', 'G-66,Cross Road Mall, Central Spine Rd, Vidyadhar Nagar, Jaipur, Rajasthan 302023, India', 'test', 'Raj', '580b57fcd9996e24bc43c4c4.png', '', '', 1, '2019-05-24 10:02:10', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ticket`
--
ALTER TABLE `ticket`
  ADD PRIMARY KEY (`ticket_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `ticket`
--
ALTER TABLE `ticket`
  MODIFY `ticket_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
