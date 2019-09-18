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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-11-04  1:45:28
