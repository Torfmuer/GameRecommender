-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: gigagamer
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `games`
--

DROP TABLE IF EXISTS `games`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `games` (
  `ID` int DEFAULT NULL,
  `GameName` varchar(40) DEFAULT NULL,
  `ReleaseDate` varchar(40) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `games`
--

LOCK TABLES `games` WRITE;
/*!40000 ALTER TABLE `games` DISABLE KEYS */;
INSERT INTO `games` VALUES (1,'Assassins Creed Odyssey','October 5, 2018','https://image.api.playstation.com/cdn/UP0001/CUSA09311_00/2XEenNH5pD4Ro375xwOG8tBwC9xMfEAE.png'),(2,'Battlefield 1','October 21, 2016','https://media.contentapi.ea.com/content/dam/bf/images/bfcom-migration/battlefield-1.jpg.adapt.crop191x100.1200w.jpg'),(3,'Bloodborne','March 24, 2015','https://image.api.playstation.com/vulcan/img/rnd/202010/2614/NVmnBXze9ElHzU6SmykrJLIV.png'),(4,'FIFA 22','October 1, 2021','https://image.api.playstation.com/vulcan/img/rnd/202111/0822/syCdM5vjxZqsHgHDdT3XZUcF.jpg'),(5,'Forza Horizon 4','October 2, 2018','https://cdn.akamai.steamstatic.com/steam/apps/1293830/extras/FH4_Deluxe_TitledHero_HD_1920x1080.png?t=1667326422'),(6,'Grand Theft Auto V','September 17, 2013','https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V.png'),(7,'Halo 5: Guardians','October 27, 2015','https://upload.wikimedia.org/wikipedia/en/6/68/Halo_Guardians.png'),(8,'Super Mario Odyssey','October 27, 2017','https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/software/switch/70010000001130/c42553b4fd0312c31e70ec7468c6c9bccd739f340152925b9600631f2d29f8b5'),(9,'Mortal Kombat 11','April 23, 2019','https://upload.wikimedia.org/wikipedia/en/7/7e/Mortal_Kombat_11_cover_art.png'),(10,'Red Dead Redemption 2','October 26, 2018','https://image.api.playstation.com/cdn/UP1004/CUSA03041_00/Hpl5MtwQgOVF9vJqlfui6SDB5Jl4oBSq.png'),(11,'The Last of Us Part II','June 19, 2020','https://image.api.playstation.com/vulcan/img/rnd/202010/2618/w48z6bzefZPrRcJHc7L8SO66.png'),(12,'Overwatch','May 24, 2016','https://m.media-amazon.com/images/M/MV5BYjBkNTJkOWUtNTg1ZS00NGZhLWIxMGUtOWE0ZDA0NzRkODM3XkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_.jpg'),(13,'Fortnite','July 25, 2017','https://cdn2.unrealengine.com/thumbnail-cinematic-1920x1080-fe7e748660c2.jpg'),(14,'God of War','April 20, 2018','https://image.api.playstation.com/vulcan/ap/rnd/202207/1210/4xJ8XB3bi888QTLZYdl7Oi0s.png'),(15,'The Witcher 3: Wild Hunt','May 19, 2015','https://image.api.playstation.com/vulcan/ap/rnd/202211/0711/kh4MUIuMmHlktOHar3lVl6rY.png'),(16,'The Legend of Zelda: Breath of the Wild','March 3, 2017','https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/software/switch/70010000000025/7137262b5a64d921e193653f8aa0b722925abc5680380ca0e18a5cfd91697f58'),(17,'Minecraft','November 18, 2011','https://www.minecraft.net/content/dam/games/minecraft/key-art/CC-Update-Part-II_600x360.jpg'),(18,'Call of Duty: Modern Warfare','October 25, 2019','https://image.api.playstation.com/vulcan/img/rnd/202010/2320/i5l1jLAhFSTiO7lSCNDWjJ2J.jpg'),(19,'Spider-Man ','September 7, 2018','https://cdn1.epicgames.com/offer/4bc43145bb8245a5b5cc9ea262ffbe0e/EGS_MarvelsSpiderManRemastered_InsomniacGamesNixxesSoftware_S1_2560x1440-73702d11161b29a0b7c40a8b489b1808'),(20,'Destiny 2','September 6, 2017','https://cdn.cloudflare.steamstatic.com/steam/apps/1085660/extras/D2_S20_First_Party_STEAM_Steam_Special_Announcement_616x347_EN.jpg?t=1680800510'),(21,'Super Smash Bros. Ultimate','December 7, 2018','https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/software/switch/70010000012332/ac4d1fc9824876ce756406f0525d50c57ded4b2a666f6dfe40a6ac5c3563fad9'),(22,'Horizon Zero Dawn','February 28, 2017','https://cdn.cloudflare.steamstatic.com/steam/apps/1151640/capsule_616x353.jpg?t=1667297464'),(23,'Dark Souls III','April 12, 2016','https://image.api.playstation.com/cdn/UP0700/CUSA03388_00/v8JlD8KcQUtTqaLBmpFnj1ESRR5zMkLk.png'),(24,'The Elder Scrolls V: Skyrim','November 11, 2011','https://image.api.playstation.com/vulcan/ap/rnd/202009/2818/FuG72QFUf4aRYbSBAMNH2xwm.png'),(25,'Resident Evil 2 (2019)','January 25, 2019','https://image.api.playstation.com/vulcan/ap/rnd/202206/0204/uDFoGvnMTTCLVmTwjj0njGWC.png'),(26,'Uncharted 4: A Thiefs End','May 10, 2016','https://m.media-amazon.com/images/M/MV5BMTYzYzIxMjktMDM4NS00MTM5LWJlMDgtNDRhMDNhOGRmY2EwXkEyXkFqcGdeQXVyMTk2OTAzNTI@._V1_FMjpg_UX1000_.jpg'),(27,'Tom Clancys Rainbow Six Siege','December 1, 2015','https://m.media-amazon.com/images/M/MV5BZGFkYjM0YzQtNmI3My00OTg2LWJhMDUtZTk1NjA5YTJiMzE0XkEyXkFqcGdeQXVyNDAzNzA0MzE@._V1_FMjpg_UX1000_.jpg'),(28,'Titanfall 2','October 28, 2016','https://image.api.playstation.com/cdn/UP0006/CUSA04027_00/aXeiAjNxWELptZ2lgHiyW89wVAO0Fxxn.png'),(29,'Cuphead','September 29, 2017','https://upload.wikimedia.org/wikipedia/en/e/eb/Cuphead_%28artwork%29.png'),(30,'Persona 5','April 4, 2017','https://cdn.cloudflare.steamstatic.com/steam/apps/1687950/capsule_616x353.jpg?t=1679398700'),(31,'Final Fantasy VII Remake','April 10, 2020','https://image.api.playstation.com/vulcan/img/cfn/11307-dNapclgq_VqNtQ98Xp_LxovvAdjd5AknZhd_-k2Cckq9FPtKDXAHk-ODCfvDKChH6hkEO0VLtj7Vk4E-Z8G707oe0N.png'),(32,'For Honor','February 14, 2017','https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/7Gvgp3BRN1mNtb18XICaRZ/344574f0aeb0b75b94531572dbbcdcf6/ForHonor_og_meta.jpg'),(33,'Battlefield V','November 20, 2018','https://image.api.playstation.com/cdn/UP0006/CUSA08724_00/knyiQNrzbp6tEe8t04AYRhhJUF5wLIGO.png'),(34,'Assassins Creed Valhalla','November 10, 2020','https://cdn.akamai.steamstatic.com/steam/apps/2208920/capsule_616x353.jpg?t=1671135934'),(35,'Death Stranding','November 8, 2019','https://cdn1.epicgames.com/offer/0a9e3c5ab6684506bd624a849ca0cf39/EGS_DeathStrandingDirectorsCut_KOJIMAPRODUCTIONS_S4_1200x1600-5f99e16507795f9b497716b470cfd876'),(36,'Fallout 4','November 10, 2015','https://image.api.playstation.com/vulcan/ap/rnd/202009/2500/4GZyUQ1bHTjICP6GCRG7f65n.png'),(37,'Half-Life: Alyx','March 23, 2020','https://cdn.cloudflare.steamstatic.com/steam/apps/546560/capsule_616x353.jpg?t=1673391297'),(38,'Dead Cells','August 7, 2018','https://cdn.akamai.steamstatic.com/steam/apps/588650/capsule_616x353.jpg?t=1678188017'),(39,'Stardew Valley','February 26, 2016','https://upload.wikimedia.org/wikipedia/en/f/fd/Logo_of_Stardew_Valley.png');
/*!40000 ALTER TABLE `games` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-19 20:39:42
