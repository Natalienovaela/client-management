CREATE DATABASE `client` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
CREATE TABLE `case` (
  `caseId` bigint NOT NULL AUTO_INCREMENT,
  `caseSubject` varchar(255) NOT NULL,
  `caseProgress` enum('IN_PROGRESS','COMPLETED') NOT NULL,
  `caseMessage` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL,
  `clientId` bigint DEFAULT NULL,
  `staffId` bigint DEFAULT NULL,
  PRIMARY KEY (`caseId`),
  KEY `clientId` (`clientId`),
  KEY `staffId` (`staffId`),
  CONSTRAINT `case_ibfk_1` FOREIGN KEY (`clientId`) REFERENCES `client` (`clientId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `case_ibfk_2` FOREIGN KEY (`staffId`) REFERENCES `staff` (`staffId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `client` (
  `clientId` bigint NOT NULL AUTO_INCREMENT,
  `clientName` varchar(255) NOT NULL,
  `clientBirthdate` datetime NOT NULL,
  `clientAddress` varchar(255) NOT NULL,
  `company` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL,
  PRIMARY KEY (`clientId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `staff` (
  `staffId` bigint NOT NULL AUTO_INCREMENT,
  `staffName` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateTimestamp` datetime NOT NULL,
  PRIMARY KEY (`staffId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
SELECT * FROM client.client;