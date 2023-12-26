-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 26, 2023 at 05:47 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `moviesdatabase`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `movieName` varchar(80) NOT NULL,
  `email` varchar(90) NOT NULL,
  `comment` varchar(3000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`movieName`, `email`, `comment`) VALUES
('Dunki ', 'tahir@gamil.com', 'hahh good movie'),
('Dunki', 'tahir@gmail.com', 'test comment'),
('Dunki', 'tahir@gmail.com', 'test comment'),
('Dunki', 'tahir@gmail.com', 'asdasd'),
('Dunki', 'tahir@gmail.com', 'sad'),
('Dunki', 'tahir@gmail.com', 'kesy ho bhai '),
('Dunki', 'tahir@gmail.com', 'sads'),
('Dunki', 'tahir@gmail.com', 'dddd'),
('Dunki', 'tahir@gmail.com', 'ddd'),
('Dunki', 'tahir@gmail.com', 'sds'),
('Dunki', 'tahir@gmail.com', 'ss'),
('Dunki', 'tahir@gmail.com', 'ssst'),
('Dunki', 'tahir@gmail.com', 'as'),
('Pathaan', 'tahir@gmail.com', 'good movie pathaan'),
('Pathaan', 'tahir@gmail.com', 'ad'),
('Pathaan', 'tahir@gmail.com', 'sdd'),
('Pathaan', 'tahir@gmail.com', 'g g'),
('Dunki', 'tahir@gmail.com', 'sdsd'),
('Dunki', 'tahir@gmail.com', 'sdsd'),
('Dunki', 'tahir@gmail.com', 'ad'),
('Dunki', 'tahir@gmail.com', 'perfect'),
('Dunki', 'tahir@gmail.com', 'sad'),
('Dunki', 'tahir@gmail.com', 'nice movie'),
('Oppenheimer', 'tahir@gmail.com', 'good movie openherimer'),
('Iron Man 3', 'tahir@gmail.com', 'best !'),
('Fast X', 'tahir@gmail.com', 'sad'),
('Spider Man 2', 'tahir@gmail.com', 'best movie !!'),
('The Gray Man', 'tahir@gmail.com', 'Good '),
('Thor', 'tahir@gmail.com', 'thor xD'),
('Thor', 'tahir@gmail.com', 'sdds'),
('Wonder Women', 'tahir@gmail.com', '<###'),
('Thor', 'tahir@gmail.com', 'sadasd'),
('Thor', 'tahir@gmail.com', 'sdsd'),
('Thor', 'tahir@gmail.com', 'asdsad'),
('Oppenheimer', 'tahir@gmail.com', 'sd'),
('Dunki', 'tahir@gmail.com', 'This is a great movie! -TESTING'),
('Dunki', 'tahir@gmail.com', 'cypress automated comment'),
('Dunki', 'tahir@gmail.com', 'cypress automated comment'),
('Dunki', 'tahir@gmail.com', 'cypress automated comment'),
('Dunki', 'tahir@gmail.com', 'cypress automated comment'),
('Dunki', 'tahir@gmail.com', 'cypress automated comment'),
('Dunki', 'tahir@gmail.com', 'cypress automated comment'),
('Testing Movie1', 'tahir@gmail.com', 'best '),
('Fast X', 'tahir@gmail.com', 'sadsda'),
('Fast X', 'tahir@gmail.com', 'sdasd'),
('Iron Man 3', 'tahir@gmail.com', 'sdasadsad'),
('Iron Man 3', 'tahir@gmail.com', 'fdsdaf'),
('Oppenheimer', 'tahir@gmail.com', 'sadsad'),
('Spider Man 2', 'tahir@gmail.com', 'sadsadsadsad'),
('Testing Movie1', 'tahir@gmail.com', 'asdsadsad'),
('The Gray Man', 'tahir@gmail.com', 'dfsasadf'),
('Thor', 'tahir@gmail.com', 'sadsad'),
('Wonder Women', 'tahir@gmail.com', 'fdsafsadf');

-- --------------------------------------------------------

--
-- Table structure for table `movies`
--

CREATE TABLE `movies` (
  `movieName` varchar(80) NOT NULL,
  `movieDesc` varchar(3000) NOT NULL,
  `posterurl` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `movies`
--

INSERT INTO `movies` (`movieName`, `movieDesc`, `posterurl`) VALUES
('Dunki ', 'Dunki is a 2023 Indian Hindi-language comedy drama film based on the eponymous illegal immigration technique. The film is directed and edited by Rajkumar ', 'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202310/new-poster-of-dunki-211301233-3x4.jpg?VersionId=o8tfsEsTPMcDibeMbV.Y7xPatJKRgMJ4'),
('Fast X', 'Over many missions and against impossible odds, Dom Toretto and his family have outsmarted and outdriven every foe in their path. Now, they must confront the most lethal opponent they\'ve ever faced. Fueled by revenge, a terrifying threat emerges from the shadows of the past to shatter Dom\'s world and destroy everything -- and everyone', 'https://upload.wikimedia.org/wikipedia/en/f/f2/Fast_X_poster.jpg'),
('Iron Man 3', 'Suffering from PTSD, Tony Stark encounters a formidable foe called the Mandarin. When he watches his world fall apart, he must rely on his own instincts as he embarks on a journey of retribution.', 'https://images.moviesanywhere.com/9e6a7d319487c4ef58543298ffdc2fb9/9cac9d6f-a5f5-4e3b-91b5-8ad8d538fbb4.jpg'),
('Oppenheimer', 'During World War II, Lt. Gen. Leslie Groves Jr. appoints physicist J. Robert Oppenheimer to work on the top-secret Manhattan Project. Oppenheimer and a team of scientists spend years developing and designing the atomic bomb. Their work comes to fruition on July 16, 1945, as they witness the world\'s ', 'https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_.jpg'),
('Pathaan', 'Pathaan is a 2023 Indian Hindi-language action thriller film co-written and directed by Siddharth Anand and produced by Aditya Chopra under Yash Raj Films.', 'https://m.media-amazon.com/images/M/MV5BM2QzM2JiNTMtYjU4Ny00MDZkLTk3MmUtYTRjMzVkZGJlNmYyXkEyXkFqcGdeQXVyMTUzNTgzNzM0._V1_.jpg'),
('Spider Man 2', 'Peter Parker is dissatisfied with life as he loses his job, the love of his life, Mary Jane, and his powers. Amid all the chaos, he must fight Doctor Octopus who threatens to destroy New York City.', 'https://image.api.playstation.com/vulcan/ap/rnd/202306/1219/60eca3ac155247e21850c7d075d01ebf0f3f5dbf19ccd2a1.jpg'),
('tahir', 'sadsad', 'tag'),
('Testing Movie1', 'Testing to Add movie', 'https://ih1.redbubble.net/image.3658479866.3563/fposter,small,wall_texture,square_product,600x600.jpg'),
('The Gray Man', 'When the CIA\'s top asset -- his identity known to no one -- uncovers agency secrets, he triggers a global hunt by assassins set loose by his ex-colleague.', 'https://m.media-amazon.com/images/M/MV5BOWY4MmFiY2QtMzE1YS00NTg1LWIwOTQtYTI4ZGUzNWIxNTVmXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg'),
('Thor', 'Thor is exiled by his father, Odin, the King of Asgard, to the Earth to live among mortals. When he lands on Earth, his trusted weapon Mjolnir is discovered and captured by S.H.I.E.L.D.', 'https://m.media-amazon.com/images/M/MV5BOGE4NzU1YTAtNzA3Mi00ZTA2LTg2YmYtMDJmMThiMjlkYjg2XkEyXkFqcGdeQXVyNTgzMDMzMTg@._V1_.jpg'),
('Wonder Women', 'Princess Diana of an all-female Amazonian race rescues US pilot Steve. Upon learning of a war, she ventures into the world of men to stop Ares, the god of war, from destroying mankind.', 'https://m.media-amazon.com/images/M/MV5BMTYzODQzYjQtNTczNC00MzZhLTg1ZWYtZDUxYmQ3ZTY4NzA1XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `email` varchar(90) NOT NULL,
  `movieName` varchar(250) NOT NULL,
  `rating` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`email`, `movieName`, `rating`) VALUES
('tahir@gmail.com', 'Dunki', 4),
('tahir@gmail.com', 'Oppenheimer', 5),
('tahir@gmail.com', 'Wonder Women', 5),
('tahir@gmail.com', 'Iron Man 3', 4),
('tahir@gmail.com', 'Spider Man 2', 3),
('tahir@gmail.com', 'The Gray Man', 5),
('tahir@gmail.com', 'Thor', 5);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `email` varchar(90) NOT NULL,
  `name` varchar(90) NOT NULL,
  `password` varchar(799) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`email`, `name`, `password`) VALUES
('tahir@gmail.com', 'Tahir Saeed', '123');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD KEY `fks` (`movieName`);

--
-- Indexes for table `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`movieName`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD KEY `fk` (`movieName`),
  ADD KEY `fk usera` (`email`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`email`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `fr key` FOREIGN KEY (`movieName`) REFERENCES `movies` (`movieName`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `fk` FOREIGN KEY (`movieName`) REFERENCES `movies` (`movieName`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk user` FOREIGN KEY (`email`) REFERENCES `users` (`email`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk usera` FOREIGN KEY (`email`) REFERENCES `users` (`email`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
