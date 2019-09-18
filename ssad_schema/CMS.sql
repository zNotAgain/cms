-- MySQL dump 10.13  Distrib 8.0.13, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: cms
-- ------------------------------------------------------
-- Server version	8.0.13

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
INSERT INTO `agency` VALUES (1,'Test_Agency','6593269309','cmsservices.gov@gmail.com '),(2,'SCDF','6591875648','SCDF@test'),(3,'Singapore Power','6591151456','SP@gov.net');
/*!40000 ALTER TABLE `agency` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `announcement`
--

DROP TABLE IF EXISTS `announcement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `announcement` (
  `ann_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) DEFAULT NULL,
  `datetime` varchar(45) DEFAULT NULL,
  `content` longtext,
  PRIMARY KEY (`ann_id`),
  UNIQUE KEY `ann_id_UNIQUE` (`ann_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `announcement`
--

LOCK TABLES `announcement` WRITE;
/*!40000 ALTER TABLE `announcement` DISABLE KEYS */;
INSERT INTO `announcement` VALUES (1,'ISIS Claims Credit for Attack in Egypt','Nov 3 2018 13:01:33','Islamist gunmen killed at least seven Coptic Christian pilgrims in Egypt on Friday and wounded at least 16 in an attack later claimed by the Islamic State.\n\nThe attack — an ambush on two buses — ended a nearly yearlong lull in major attacks on Copts in Egypt, and may signal a resumption of the Islamic State’s campaign to sow sectarian divisions in Egyptian society.\n\nIt was also a setback for President Abdel Fattah el-Sisi, who has put security concerns at the heart of his autocratic style of rule and has repeatedly vowed to protect Christians, a minority in the country, from attack.\n\nThe shooting occurred as two buses carrying pilgrims left the Monastery of Saint Samuel the Confessor, 85 miles south of Cairo, in Egypt’s Western Desert.'),(2,'Bomb Explodes at Russian Security Agency','Nov 03 2018 13:01:03','An explosive device detonated inside an office of Russia’s main security agency on Wednesday, wounding three workers and killing the person who carried it, the Russian authorities said.\nThe explosion at the local headquarters of the Federal Security Service in the northern city of Arkhangelsk was labeled a terrorist act by the Russian Investigative Committee, which is responsible for high-profile crimes and is investigating. It said in a statement that the attacker was a 17-year-old local resident, but did not offer any other information.\n“According to preliminary information, the person entered the building, took an unknown item out of a bag, which exploded shortly after in his hands,” the Russian Antiterrorism Committee said in a statement.\n“He suffered injuries that killed him,” it said. “Three employees of the Federal Security Service were injured.”'),(3,'Mail Bombs and Other Threats?','Nov 04 2018 01:01:03','In recent years, the unpredictability of terrorizing events has kept Americans on alert, wary of threats to their safety and well-being.\nA gunman killed 58 people attending an outdoor concert in Las Vegas last year. School violence has become commonplace enough that some teens carry bulletproof backpacks. And last week, at least a dozen homemade pipe bombs were mailed to outspoken critics of President Trump and forced the evacuation of a shopping mall in New York.\nSpecific threats and a general sense of anxiety, security experts say, are causing more people to seek the services of private security firms; some are hiring bodyguards and drivers trained to protect them in case of peril.\nAt Pinkerton, a private security and detective agency founded in 1850, requests for executive security have increased 20 to 30 percent annually over the last five years, said its vice chairman, Tim Williams. And people are looking for safeguards in all areas of their lives that pose risks, experts say, including information technology and social media.');
/*!40000 ALTER TABLE `announcement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assistance`
--

DROP TABLE IF EXISTS `assistance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `assistance` (
  `assistance_id` int(11) NOT NULL AUTO_INCREMENT,
  `assistance_name` varchar(155) DEFAULT NULL,
  `assistance_provider` int(11) DEFAULT NULL,
  PRIMARY KEY (`assistance_id`),
  KEY `assistance_provider_idx` (`assistance_provider`),
  CONSTRAINT `fkprovider` FOREIGN KEY (`assistance_provider`) REFERENCES `agency` (`agency_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assistance`
--

LOCK TABLES `assistance` WRITE;
/*!40000 ALTER TABLE `assistance` DISABLE KEYS */;
INSERT INTO `assistance` VALUES (1,'Emergency Ambulance',2),(2,'Rescue and Evacuation',2),(3,'Fire-Fighting',2),(4,'Gas Leak Control',3);
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
  KEY `2ndfk _idx` (`assistance_needed_id`),
  CONSTRAINT `2ndfk ` FOREIGN KEY (`assistance_needed_id`) REFERENCES `assistance` (`assistance_id`),
  CONSTRAINT `report_fk` FOREIGN KEY (`report_id`) REFERENCES `inreport` (`report_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assistance_requests`
--

LOCK TABLES `assistance_requests` WRITE;
/*!40000 ALTER TABLE `assistance_requests` DISABLE KEYS */;
INSERT INTO `assistance_requests` VALUES (1,1),(24,1),(28,1),(29,1),(30,1),(31,1),(32,1),(34,1),(36,1),(37,1),(38,1),(39,1),(40,1),(42,1),(43,1),(44,1),(45,1),(23,2),(24,2),(25,2),(26,2),(27,2),(28,2),(29,2),(30,2),(31,2),(32,2),(33,2),(34,2),(35,2),(36,2),(39,2),(40,2),(41,2),(42,2),(43,2),(44,2),(45,2),(1,3),(23,3),(25,3),(27,3),(28,3),(29,3),(30,3),(31,3),(32,3),(35,3),(37,3),(38,3),(41,3),(42,3),(43,3),(44,3),(1,4),(23,4),(24,4),(26,4),(28,4),(29,4),(30,4),(31,4),(32,4),(43,4);
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dengue`
--

LOCK TABLES `dengue` WRITE;
/*!40000 ALTER TABLE `dengue` DISABLE KEYS */;
INSERT INTO `dengue` VALUES (1,'61 Cho Chu Kang Loop Singapore 689668','1.3875402','103.7452','Mosquitoo in sewers!!!!'),(2,'238 Thomson Rd Singapore 307683','1.3199153','103.8439456','Too Much DURIANS!!'),(3,'21 Lower Kent Ridge Rd Singapore 119077','1.2966193545099025','103.77616882324219','Test'),(5,'366 Clementi Ave 2 Block 366 Singapore 120366','1.3123840008314929','103.77177176285852','Clementi sports hall overrun, by dengue'),(6,'93 Stamford Rd Singapore 178897','1.2966193545099025','103.8482666015625','Dengue at downtown');
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
INSERT INTO `emails` VALUES ('Prime Minister\'s Office','iamtzw@hotmail.com',12345678);
/*!40000 ALTER TABLE `emails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `fullcontrol`
--

DROP TABLE IF EXISTS `fullcontrol`;
/*!50001 DROP VIEW IF EXISTS `fullcontrol`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8mb4;
/*!50001 CREATE VIEW `fullcontrol` AS SELECT 
 1 AS `reportid`,
 1 AS `title`,
 1 AS `location`,
 1 AS `type_name`,
 1 AS `timereported`,
 1 AS `assistance_name`,
 1 AS `agency_name`*/;
SET character_set_client = @saved_cs_client;

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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hazead`
--

LOCK TABLES `hazead` WRITE;
/*!40000 ALTER TABLE `hazead` DISABLE KEYS */;
INSERT INTO `hazead` VALUES (1,'Haze Chart','Plan ahead your activities!','0 - 50 : Good <br/> \r 51 - 100 : Moderate <br/> \r 101 - 200 : Unhealthy <br/> \r 201 - 300 : Very Unhealthy <br/> \r > 300 : Hazardous\r '),(2,'Fun Fact','Do YOU know?','The imapct of haze is dependent on one\'s health status.'),(3,'Caution','when PSI >300...','Reducing outdoor activities and physical exertion can help limit the ill effects.');
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
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inreport`
--

LOCK TABLES `inreport` WRITE;
/*!40000 ALTER TABLE `inreport` DISABLE KEYS */;
INSERT INTO `inreport` VALUES (1,'Gas Explosion','John Doe','639798 50 Nanyang Ave Singapore 639798','HELP GAS EXPROSSION KILL BIG BIG','666','BO@CHUP.net','1.3492007','103.6876833','2018-11-2 16:11:02','2018-11-6 22:28:05',1,3),(3,'Unnatural Rain','Jack Kirby','Airport Blvd Changi Airport Singapore (SIN) Singapore','Its raining fireballs!!','0123541122','BO@CHUP3.net.com','1.3644202','103.9915308','2018-11-2 16:11:02','2018-11-7 09:49:27',3,1),(4,'Terrorist Encounter','Samantha','200 Turf Club Rd Singapore 287994','It is the beginning...','755646546','BO@CHUP4.net','1.3378923','103.7933377','2018-11-2 16:11:02',NULL,1,1),(22,'Drug Lord','Kirk Cousins','186 Pandan Loop Singapore 128376 undefined','fd','d','dfs','1.3079068012972392','103.75395848666767','2018-11-2 16:11:02','2018-11-2 16:11:02',1,1),(23,'Protestors','Ronald Darby','1 International Business Park Rd The Synergy Singapore 609917','Wad','213123123','wadwd@wad','1.3294609984567056','103.74869800794204','2018-11-5 15:23:06','2018-11-5 15:23:06',1,1),(24,'Gang Fight','Antonio Brown','22 Edgware Rd Singapore 799773','Wad','12312312315678','sj@sj','1.4033098761046587','103.8680649252758','2018-11-5 15:29:34','2018-11-6 17:26:33',2,1),(25,'Heavy Rain','Chua Shan Jing','KJE Singapore','Raining shan jings','99988877','csj@ntu.com','1.3682167117354918','103.72301234456063','2018-11-7 09:47:45','2018-11-7 09:50:00',1,4),(26,'Zombie attacks','Alan Tan','Novena Stn Singapore','zombie eating the train conductor','92831234','alantan@ntu.edu.sg','1.31969162575395','103.84343042947978','2018-11-7 09:55:45','2018-11-7 09:55:45',1,3);
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
INSERT INTO `psi` VALUES (1,52,'2018-11-7 10:32:41',44,52,52,29,44);
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
INSERT INTO `psi_twentyfour` VALUES ('00:00:00',NULL),('01:00:00','52'),('02:00:00','52'),('03:00:00','52'),('04:00:00','52'),('05:00:00','51'),('06:00:00','50'),('07:00:00','49'),('08:00:00','46'),('09:00:00','44'),('10:00:00','44'),('11:00:00','54'),('12:00:00','54'),('13:00:00','54'),('14:00:00','55'),('15:00:00','54'),('16:00:00','54'),('17:00:00','55'),('18:00:00','54'),('19:00:00','53'),('20:00:00','53'),('21:00:00','53'),('22:00:00','53'),('23:00:00','53');
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
INSERT INTO `publicsms` VALUES (1,'Zi Wei','6593269309'),(2,'Marc','6591151456'),(3,'Shan Jing','6591875648');
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
-- Table structure for table `telegram`
--

DROP TABLE IF EXISTS `telegram`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `telegram` (
  `t_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `idno` int(20) DEFAULT NULL,
  PRIMARY KEY (`t_id`),
  UNIQUE KEY `t_id_UNIQUE` (`t_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `telegram`
--

LOCK TABLES `telegram` WRITE;
/*!40000 ALTER TABLE `telegram` DISABLE KEYS */;
INSERT INTO `telegram` VALUES (1,'Shan Jing',27275274),(2,'Lungkuang',61290244);
/*!40000 ALTER TABLE `telegram` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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

--
-- Final view structure for view `fullcontrol`
--

/*!50001 DROP VIEW IF EXISTS `fullcontrol`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `fullcontrol` AS select `inreport`.`report_id` AS `reportid`,`inreport`.`title` AS `title`,`inreport`.`location` AS `location`,`type`.`type_name` AS `type_name`,`inreport`.`timereported` AS `timereported`,`assistance`.`assistance_name` AS `assistance_name`,`agency`.`agency_name` AS `agency_name` from ((((`inreport` join `assistance`) join `assistance_requests`) join `type`) join `agency`) where ((`inreport`.`report_id` = `assistance_requests`.`report_id`) and (`assistance`.`assistance_id` = `assistance_requests`.`assistance_needed_id`) and (`type`.`type_id` = `inreport`.`type`) and (`agency`.`agency_id` = `assistance`.`assistance_provider`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-11-07 10:37:59
