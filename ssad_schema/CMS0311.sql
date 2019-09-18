-- MySQL dump 10.13  Distrib 8.0.12, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: cms
-- ------------------------------------------------------
-- Server version	8.0.12

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `accounts` (
  `account_id` int(11) NOT NULL AUTO_INCREMENT,
  `un` varchar(255) NOT NULL,
  `pw` varchar(255) NOT NULL,
  `email` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `role` int(11) DEFAULT NULL,
  `contact_no` int(11) DEFAULT NULL,
  PRIMARY KEY (`account_id`),
  UNIQUE KEY `un_UNIQUE` (`un`),
  KEY `role_2_role_key_idx` (`role`),
  CONSTRAINT `role_2_role_key` FOREIGN KEY (`role`) REFERENCES `roles` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (1,'admin','password','test@test.com','tester',2,95550330),(2,'emailtest','pass','pbh928@hotmail.com','PMO',1,88888888);
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `agency`
--

DROP TABLE IF EXISTS `agency`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `agency` (
  `agency_id` int(11) NOT NULL AUTO_INCREMENT,
  `agency_name` varchar(255) DEFAULT NULL,
  `agency_contactno` varchar(45) DEFAULT NULL,
  `agency_email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`agency_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agency`
--

LOCK TABLES `agency` WRITE;
/*!40000 ALTER TABLE `agency` DISABLE KEYS */;
INSERT INTO `agency` VALUES (1,'Test_Agency','6593269309','cmsservices.gov@gmail.com '),(2,'SCDF','6591875648','SCDF@test'),(3,'Singapore Power','666','SP@gov.net');
/*!40000 ALTER TABLE `agency` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assistance`
--

DROP TABLE IF EXISTS `assistance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `assistance` (
  `assistance_id` int(11) NOT NULL,
  `assistance_name` varchar(155) DEFAULT NULL,
  `assistance_provider` int(11) DEFAULT NULL,
  PRIMARY KEY (`assistance_id`),
  KEY `assistance_provider_idx` (`assistance_provider`),
  CONSTRAINT `assistance_provider` FOREIGN KEY (`assistance_provider`) REFERENCES `agency` (`agency_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assistance`
--

LOCK TABLES `assistance` WRITE;
/*!40000 ALTER TABLE `assistance` DISABLE KEYS */;
INSERT INTO `assistance` VALUES (1,'Emergency Ambulance	',2),(2,'Rescue and Evacuation',2),(3,'Fire-Fighting',2),(4,'Gas Leak Control',3);
/*!40000 ALTER TABLE `assistance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assistance_requests`
--

DROP TABLE IF EXISTS `assistance_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `assistance_requests` (
  `report_id` int(11) NOT NULL,
  `assistance_needed_id` int(11) NOT NULL,
  PRIMARY KEY (`report_id`,`assistance_needed_id`),
  KEY `assistance_fk_idx` (`assistance_needed_id`),
  CONSTRAINT `assistance_fk` FOREIGN KEY (`assistance_needed_id`) REFERENCES `assistance` (`assistance_id`),
  CONSTRAINT `report_fk` FOREIGN KEY (`report_id`) REFERENCES `inreport` (`report_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assistance_requests`
--

LOCK TABLES `assistance_requests` WRITE;
/*!40000 ALTER TABLE `assistance_requests` DISABLE KEYS */;
INSERT INTO `assistance_requests` VALUES (1,1),(1,3),(1,4);
/*!40000 ALTER TABLE `assistance_requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dengue`
--

DROP TABLE IF EXISTS `dengue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `dengue` (
  `dengue_id` int(11) NOT NULL AUTO_INCREMENT,
  `address` varchar(45) DEFAULT NULL,
  `lat` varchar(45) DEFAULT NULL,
  `lng` varchar(45) DEFAULT NULL,
  `notes` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`dengue_id`),
  UNIQUE KEY `dengue_id_UNIQUE` (`dengue_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dengue`
--

LOCK TABLES `dengue` WRITE;
/*!40000 ALTER TABLE `dengue` DISABLE KEYS */;
INSERT INTO `dengue` VALUES (1,'61 Cho Chu Kang Loop Singapore 689668','1.3875402','103.7452','Mosquitoo in sewers!'),(2,'238 Thomson Rd Singapore 307683','1.3199153','103.8439456','Too Much DURIANS!!');
/*!40000 ALTER TABLE `dengue` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `denguead`
--

DROP TABLE IF EXISTS `denguead`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `denguead` (
  `dad_id` int(11) NOT NULL AUTO_INCREMENT,
  `cardtitle` varchar(45) NOT NULL,
  `title` varchar(45) NOT NULL,
  `content` mediumtext NOT NULL,
  PRIMARY KEY (`dad_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `denguead`
--

LOCK TABLES `denguead` WRITE;
/*!40000 ALTER TABLE `denguead` DISABLE KEYS */;
INSERT INTO `denguead` VALUES (1,'Afraid of Aedes mozzie?','Prevention is better than cure!','Do the 5 Step Mozzie Wipeout!'),(2,'Protect your family!','Stop mozzie breeeeeding spots!','Lookout for stagnant puddle of water'),(3,'What is dengue?','More than just black & white stripes','They are small but DANGEROUS'),(4,'Afraid of a bite?','Must-have essentials!','INSECT REPELLENT!!!!');
/*!40000 ALTER TABLE `denguead` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `emails`
--

DROP TABLE IF EXISTS `emails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `emails` (
  `officename` varchar(45) NOT NULL,
  `emailadd` varchar(45) DEFAULT NULL,
  `officenumber` int(11) DEFAULT NULL,
  PRIMARY KEY (`officename`),
  UNIQUE KEY `officename_UNIQUE` (`officename`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emails`
--

LOCK TABLES `emails` WRITE;
/*!40000 ALTER TABLE `emails` DISABLE KEYS */;
INSERT INTO `emails` VALUES ('Prime Minister\'s Office','pbh928@hotmail.com',12345678);
/*!40000 ALTER TABLE `emails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `generalmsg`
--

DROP TABLE IF EXISTS `generalmsg`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `generalmsg` (
  `msg_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `date` varchar(45) NOT NULL,
  `msg` longtext NOT NULL,
  PRIMARY KEY (`msg_id`),
  UNIQUE KEY `msg_id_UNIQUE` (`msg_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `generalmsg`
--

LOCK TABLES `generalmsg` WRITE;
/*!40000 ALTER TABLE `generalmsg` DISABLE KEYS */;
/*!40000 ALTER TABLE `generalmsg` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hazead`
--

DROP TABLE IF EXISTS `hazead`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `hazead` (
  `had_id` int(11) NOT NULL AUTO_INCREMENT,
  `cardtitle` varchar(45) NOT NULL,
  `title` varchar(45) NOT NULL,
  `content` mediumtext NOT NULL,
  PRIMARY KEY (`had_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hazead`
--

LOCK TABLES `hazead` WRITE;
/*!40000 ALTER TABLE `hazead` DISABLE KEYS */;
INSERT INTO `hazead` VALUES (1,'Haze Chart','Plan ahead your activities!','0 - 50 : Good <br/> \n51 - 100 : Moderate <br/> \n101 - 200 : Unhealthy <br/> \n201 - 300 : Very Unhealthy <br/> \n> 300 : Hazardous\n'),(2,'Fun Fact','Do YOU know?','The imapct of haze is dependent on one\'s health status.'),(3,'Caution','when PSI >300...','Reducing outdoor activities and physical exertion can help limit the ill effects.');
/*!40000 ALTER TABLE `hazead` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inreport`
--

DROP TABLE IF EXISTS `inreport`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `inreport` (
  `report_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `contactno` varchar(45) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `lat` varchar(45) DEFAULT NULL,
  `lng` varchar(45) DEFAULT NULL,
  `timereported` varchar(255) DEFAULT NULL,
  `lastupdated` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  PRIMARY KEY (`report_id`),
  KEY `status2report_idx` (`status`),
  KEY `type2report_idx` (`type`),
  CONSTRAINT `status2report` FOREIGN KEY (`status`) REFERENCES `status` (`status_id`),
  CONSTRAINT `type2report` FOREIGN KEY (`type`) REFERENCES `type` (`type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inreport`
--

LOCK TABLES `inreport` WRITE;
/*!40000 ALTER TABLE `inreport` DISABLE KEYS */;
INSERT INTO `inreport` VALUES (1,'hi','bo chup','639798 50 Nanyang Ave Singapore 639798','HELP GAS EXPROSSION KILL BIG BIG','666','BO@CHUP.net','1.3492007','103.6876833',NULL,NULL,1,3),(3,'test','bo chup3','Airport Blvd Changi Airport Singapore (SIN) Singapore','Its raining fireballs!!','0123541122','BO@CHUP3.net.com','1.3644202','103.9915308','','',2,1),(4,'test2','bo chup4','200 Turf Club Rd Singapore 287994','It is the beginning...','755646546','BO@CHUP4.net','1.3378923','103.7933377',NULL,NULL,1,1),(22,'he','dsa','186 Pandan Loop Singapore 128376 undefined','fd','d','dfs','1.3079068012972392','103.75395848666767','2018-11-2 16:11:02','2018-11-2 16:11:02',1,1);
/*!40000 ALTER TABLE `inreport` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `psi`
--

DROP TABLE IF EXISTS `psi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `psi` (
  `psicontrol` int(11) NOT NULL AUTO_INCREMENT,
  `current` int(11) DEFAULT NULL,
  `lastupdated` varchar(45) DEFAULT NULL,
  `current_north` int(11) DEFAULT NULL,
  `current_south` int(11) DEFAULT NULL,
  `current_east` int(11) DEFAULT NULL,
  `current_west` int(11) DEFAULT NULL,
  `current_central` int(11) DEFAULT NULL,
  PRIMARY KEY (`psicontrol`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `psi`
--

LOCK TABLES `psi` WRITE;
/*!40000 ALTER TABLE `psi` DISABLE KEYS */;
INSERT INTO `psi` VALUES (1,54,'2018-11-3 16:00:06',54,47,42,52,51);
/*!40000 ALTER TABLE `psi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `psi_twentyfour`
--

DROP TABLE IF EXISTS `psi_twentyfour`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `psi_twentyfour` (
  `time` varchar(45) NOT NULL,
  `psi` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `psi_twentyfour`
--

LOCK TABLES `psi_twentyfour` WRITE;
/*!40000 ALTER TABLE `psi_twentyfour` DISABLE KEYS */;
INSERT INTO `psi_twentyfour` VALUES ('00:00:00',NULL),('01:00:00','55'),('02:00:00','54'),('03:00:00','54'),('04:00:00','54'),('05:00:00','53'),('06:00:00','53'),('07:00:00','53'),('08:00:00','54'),('09:00:00','54'),('10:00:00','55'),('11:00:00','56'),('12:00:00','56'),('13:00:00','57'),('14:00:00','57'),('15:00:00','57'),('16:00:00','55'),('17:00:00','55'),('18:00:00','55'),('19:00:00','55'),('20:00:00','55'),('21:00:00','55'),('22:00:00','55'),('23:00:00','55');
/*!40000 ALTER TABLE `psi_twentyfour` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `publicsms`
--

DROP TABLE IF EXISTS `publicsms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `publicsms` (
  `person_id` int(11) NOT NULL AUTO_INCREMENT,
  `person_name` varchar(45) NOT NULL,
  `contactno` varchar(45) NOT NULL,
  PRIMARY KEY (`person_id`),
  UNIQUE KEY `person_id_UNIQUE` (`person_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publicsms`
--

LOCK TABLES `publicsms` WRITE;
/*!40000 ALTER TABLE `publicsms` DISABLE KEYS */;
INSERT INTO `publicsms` VALUES (1,'Zi Wei','6593269309'),(2,'Marc','6591151456'),(3,'Shan Jing','6591875648'),(4,'Zhi Hong','6597556495'),(5,'Joseph','6598000571'),(6,'Lung Kuang','6596409406');
/*!40000 ALTER TABLE `publicsms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `roles` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(65) NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'PMO'),(2,'Admin'),(3,'Operator');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `status` (
  `status_id` int(11) NOT NULL AUTO_INCREMENT,
  `status_name` varchar(145) DEFAULT NULL,
  PRIMARY KEY (`status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` VALUES (1,'Active'),(2,'Interim'),(3,'Completed'),(4,'Warning');
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `terroristad`
--

DROP TABLE IF EXISTS `terroristad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `terroristad` (
  `tad_id` int(11) NOT NULL AUTO_INCREMENT,
  `cardtitle` varchar(95) NOT NULL,
  `title` varchar(45) NOT NULL,
  `content` mediumtext NOT NULL,
  PRIMARY KEY (`tad_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `terroristad`
--

LOCK TABLES `terroristad` WRITE;
/*!40000 ALTER TABLE `terroristad` DISABLE KEYS */;
INSERT INTO `terroristad` VALUES (1,'Spotted a suspicious article?','Do you part!','Contact us at 1800-POLICE'),(2,'Have friends that are spreading radical ideologies?','Report them!','Contact us at 1800-POLICE'),(3,'Anonymous report?','Totally anonymous!','Contact us at 1800-POLICE'),(4,'Feeling afraid?','Don\'t be!','Contact us at 1800-POLICE'),(5,'Feeling suspicious?','Validate your suspicion!','Contact us at 1800-POLICE');
/*!40000 ALTER TABLE `terroristad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type`
--

DROP TABLE IF EXISTS `type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `type` (
  `type_id` int(11) NOT NULL AUTO_INCREMENT,
  `type_name` varchar(95) DEFAULT NULL,
  PRIMARY KEY (`type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type`
--

LOCK TABLES `type` WRITE;
/*!40000 ALTER TABLE `type` DISABLE KEYS */;
INSERT INTO `type` VALUES (1,'Terrorist Attack'),(2,'Fire'),(3,'Gas Leak'),(4,'Car Collision');
/*!40000 ALTER TABLE `type` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-11-03 16:01:12
