-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-01-2023 a las 18:10:04
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `videoclub`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `peliculas`
--

CREATE TABLE `peliculas` (
  `codigo` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `genero` varchar(50) NOT NULL,
  `costo` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `peliculas`
--

INSERT INTO `peliculas` (`codigo`, `nombre`, `genero`, `costo`) VALUES
(1, 'Titanic', 'Romance', '13.30'),
(2, 'TNA', 'Accion', '10.50'),
(3, 'NWH', 'TERROR', '11.00'),
(4, 'Avatar', 'Accion', '20.00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rentas`
--

CREATE TABLE `rentas` (
  `codigo` int(11) NOT NULL,
  `cod_socio` int(11) NOT NULL,
  `cod_pelicula` int(11) NOT NULL,
  `fecha_alquiler` varchar(45) NOT NULL,
  `fecha_entrega` varchar(45) NOT NULL,
  `total` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rentas`
--

INSERT INTO `rentas` (`codigo`, `cod_socio`, `cod_pelicula`, `fecha_alquiler`, `fecha_entrega`, `total`) VALUES
(1, 1, 1, '2023-01-04', '2023-01-15', '131.67'),
(5, 1, 2, '2023-01-07', '2023-01-29', '207.90'),
(6, 1, 1, '2023-01-09', '2023-01-13', '47.88'),
(10, 1, 4, '2023-01-01', '2023-01-04', '54.00'),
(12, 1, 4, '2023-01-11', '2023-01-14', '54.00'),
(13, 3, 3, '2023-01-10', '2023-01-15', '55.00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `socios`
--

CREATE TABLE `socios` (
  `codigo` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `tipo` varchar(45) NOT NULL,
  `fecha_nacimiento` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `socios`
--

INSERT INTO `socios` (`codigo`, `nombre`, `tipo`, `fecha_nacimiento`) VALUES
(1, 'usuario1', 'VIP', '2005-01-11'),
(2, 'usuario1', 'VIP', '1994-01-11'),
(3, 'usuario2', 'NORMAL', '1994-01-11'),
(4, 'usuario3', 'EXCLUSIVO', '1994-01-11');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `peliculas`
--
ALTER TABLE `peliculas`
  ADD PRIMARY KEY (`codigo`);

--
-- Indices de la tabla `rentas`
--
ALTER TABLE `rentas`
  ADD PRIMARY KEY (`codigo`);

--
-- Indices de la tabla `socios`
--
ALTER TABLE `socios`
  ADD PRIMARY KEY (`codigo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `peliculas`
--
ALTER TABLE `peliculas`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `rentas`
--
ALTER TABLE `rentas`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `socios`
--
ALTER TABLE `socios`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
