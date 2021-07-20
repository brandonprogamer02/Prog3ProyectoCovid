-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 20, 2021 at 03:18 AM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tareacovid`
--

-- --------------------------------------------------------

--
-- Table structure for table `pacientes`
--

CREATE TABLE `pacientes` (
  `id` int(20) NOT NULL,
  `cedula` int(20) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `fecha_nacimiento` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pacientes`
--

INSERT INTO `pacientes` (`id`, `cedula`, `nombre`, `apellido`, `telefono`, `fecha_nacimiento`) VALUES
(1, 2554888, 'Brandon', 'Fernandez', '8955155', '2021-07-19'),
(2, 1188511, 'Maicol', 'Ulloa', '89559455', '2021-07-19'),
(3, 140851147, 'Carol', 'Mendez', '809658421055', '2021-07-19');

-- --------------------------------------------------------

--
-- Table structure for table `provincias`
--

CREATE TABLE `provincias` (
  `id` int(20) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `provincias`
--

INSERT INTO `provincias` (`id`, `nombre`) VALUES
(1, 'Barahona'),
(2, 'Azua'),
(3, 'Santo Domingo'),
(4, 'Pedernales'),
(5, 'Moca');

-- --------------------------------------------------------

--
-- Table structure for table `provincia_vacuna`
--

CREATE TABLE `provincia_vacuna` (
  `id` int(11) NOT NULL,
  `provincia_id` int(11) NOT NULL,
  `vacuna_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `provincia_vacuna`
--

INSERT INTO `provincia_vacuna` (`id`, `provincia_id`, `vacuna_id`) VALUES
(1, 3, 4),
(2, 3, 5);

-- --------------------------------------------------------

--
-- Table structure for table `vacunados`
--

CREATE TABLE `vacunados` (
  `id` int(20) NOT NULL,
  `paciente_id` int(20) NOT NULL,
  `vacuna_id` int(20) NOT NULL,
  `fecha_vacunacion` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `vacunas`
--

CREATE TABLE `vacunas` (
  `id` int(20) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vacunas`
--

INSERT INTO `vacunas` (`id`, `nombre`) VALUES
(4, 'synovac'),
(5, 'Johnson');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `pacientes`
--
ALTER TABLE `pacientes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cedula` (`cedula`);

--
-- Indexes for table `provincias`
--
ALTER TABLE `provincias`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `provincia_vacuna`
--
ALTER TABLE `provincia_vacuna`
  ADD PRIMARY KEY (`id`),
  ADD KEY `provincia_id` (`provincia_id`),
  ADD KEY `vacuna_id` (`vacuna_id`);

--
-- Indexes for table `vacunados`
--
ALTER TABLE `vacunados`
  ADD PRIMARY KEY (`id`),
  ADD KEY `paciente_id` (`paciente_id`),
  ADD KEY `vacuna_id` (`vacuna_id`);

--
-- Indexes for table `vacunas`
--
ALTER TABLE `vacunas`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pacientes`
--
ALTER TABLE `pacientes`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `provincias`
--
ALTER TABLE `provincias`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `provincia_vacuna`
--
ALTER TABLE `provincia_vacuna`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `vacunados`
--
ALTER TABLE `vacunados`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vacunas`
--
ALTER TABLE `vacunas`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `provincia_vacuna`
--
ALTER TABLE `provincia_vacuna`
  ADD CONSTRAINT `provincia_vacuna_ibfk_1` FOREIGN KEY (`provincia_id`) REFERENCES `provincias` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `provincia_vacuna_ibfk_2` FOREIGN KEY (`vacuna_id`) REFERENCES `vacunas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `vacunados`
--
ALTER TABLE `vacunados`
  ADD CONSTRAINT `vacunados_ibfk_1` FOREIGN KEY (`paciente_id`) REFERENCES `pacientes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `vacunados_ibfk_2` FOREIGN KEY (`vacuna_id`) REFERENCES `vacunas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
