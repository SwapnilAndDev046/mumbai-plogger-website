-- MySQL dump 10.13  Distrib 8.0.39, for Win64 (x86_64)
--
-- Host: localhost    Database: events_db
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `date_time` datetime DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `join_link` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=129 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (111,'Maha plog','2024-10-03 10:30:00','kalyan','https://chatgpt.com/c/66eec88e-99f4-8011-a3f8-fd0eb57460b1'),(116,'Maha Marathon','2024-10-11 23:50:00','mumbai','https://chatgpt.com/c/66eec88e-99f4-8011-a3f8-fd0eb57460b1'),(117,'water foundation','2024-10-11 11:55:00','kalyan','https://www.google.com/'),(118,'ram ram ','2024-09-19 11:30:00','thane','https://example.com/'),(119,'water cup 3','2024-10-09 23:30:00','thane','https://example.com/'),(128,'pranit tarade','2024-10-31 11:45:00','Azad Maidan, dader','https://example.com/');
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `filename` varchar(255) NOT NULL,
  `filepath` varchar(255) NOT NULL,
  `upload_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (1,'economic-times.png','/images/gallery/economic-times.png','2024-09-30 12:58:11'),(2,'economic-times.png','/images/gallery/economic-times.png','2024-09-30 12:58:18'),(3,'economic-times.png','/images/gallery/economic-times.png','2024-09-30 12:58:18'),(4,'economic-times.png','/images/gallery/economic-times.png','2024-09-30 12:58:19'),(5,'economic-times.png','/images/gallery/economic-times.png','2024-09-30 12:58:32'),(6,'economic-times.png','/images/gallery/economic-times.png','2024-09-30 12:58:34'),(7,'economic-times.png','/images/gallery/economic-times.png','2024-09-30 12:58:49'),(8,'sakal-logo.png','/images/gallery/sakal-logo.png','2024-09-30 15:58:46'),(9,'times-of-india-logo.png','/images/gallery/times-of-india-logo.png','2024-09-30 16:18:18'),(10,'event-card-bg.jpg','/images/gallery/event-card-bg.jpg','2024-09-30 17:24:54'),(11,'V--AWARD-BY-UNITED-NATIONS-VOLUNTEERS-INDIA-AND-MINISTRY-OF-YOUTH-AFFAIRS-AND-SPORTS.png','/images/gallery/V--AWARD-BY-UNITED-NATIONS-VOLUNTEERS-INDIA-AND-MINISTRY-OF-YOUTH-AFFAIRS-AND-SPORTS.png','2024-10-01 05:46:05');
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-02 17:45:06
