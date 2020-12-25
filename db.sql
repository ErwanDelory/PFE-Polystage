-- phpMyAdmin SQL Dump
-- version 4.9.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Dec 25, 2020 at 09:10 PM
-- Server version: 5.7.26
-- PHP Version: 7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `db`
--

-- --------------------------------------------------------

--
-- Table structure for table `categorie`
--

CREATE TABLE `categorie` (
  `idcat` tinyint(11) NOT NULL,
  `name` mediumtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `categorie`
--

INSERT INTO `categorie` (`idcat`, `name`) VALUES
(1, 'IDENTIFICATION'),
(2, 'ÉVALUATION DES COMPÉTENCES'),
(3, 'APPRÉCIATION GLOBALE SUR LE STAGE'),
(4, 'APRÈS LE STAGE'),
(5, 'SOUTENANCE DE STAGE');

-- --------------------------------------------------------

--
-- Table structure for table `competences`
--

CREATE TABLE `competences` (
  `idcompetence` tinyint(4) NOT NULL,
  `sigle` char(6) NOT NULL,
  `libelle` mediumtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `competences`
--

INSERT INTO `competences` (`idcompetence`, `sigle`, `libelle`) VALUES
(1, 'C2', 'Capacité à choisir, mettre en oeuvre ses connaissances (outils et méthodes). Utiliser ses savoirs et ses capacités d’analyse.'),
(2, 'C3', 'Capacité à identifier et analyser les besoins et contraintes, formaliser le cadre de l\'étude.'),
(3, 'C4.1', 'Capacité à proposer, concevoir et formaliser et faire evoluer une solution.'),
(4, 'C4.2', 'Capacité à mettre en oeuvre et évaluer une solution.'),
(5, 'C4.3', 'Capacité à rédiger un document technique.'),
(6, 'C5', 'Capacité à concevoir, mener et analyser des expérimentations à des fins de recherche ou de devéloppement.'),
(7, 'C6', 'Capacité à trouver l\'information pertinente et à l\'exploiter. Recherche d’information (externe ou interne de l’entreprise).'),
(8, 'C7', 'Capacité à prendre en compte les enjeux économiques de l’entreprise, respect de la qualité, exigences commerciales, intelligence économique'),
(9, 'C8', 'Capacité à prendre en compte les enjeux de santé et de sécurité au travail ainsi que de l\'éthique.'),
(10, 'C9/C10', 'Capacité à prendre en compte les enjeux liés à la RSE (responsabilité sociétale des entreprises): responsabilité environnementale et sociale.'),
(11, 'C11.1', 'Capacité à mettre oeuvre une démarche de gestion de projet.'),
(12, 'C11.2', 'Capacité à communiquer/interagir avec différents interlocuteurs dans sa mission.'),
(13, 'C11.3', 'Capacité à respecter les règles de la vie professionnelle, dans une organisation (Tenue adaptée, Ponctualité, Assiduité, Comportement et Politesse).'),
(14, 'C11.4', 'Capacité à animer, faire évoluer une équipe et faire preuve de leadership.'),
(15, 'C12', 'Capacite à innover, à avoir une ouverture d\'esprit et à s\'engager.'),
(16, 'C13', 'Capacité à travailler en contexte international.'),
(17, 'C14', 'Capacité à se connaître, s\'autoévaluer (Analyse SWOT) et définir son projet professionel.');

-- --------------------------------------------------------

--
-- Table structure for table `infoetu`
--

CREATE TABLE `infoetu` (
  `idinfo` int(10) NOT NULL,
  `numetudiant` int(20) DEFAULT NULL,
  `annee` int(5) DEFAULT NULL,
  `niveau` enum('3','4','5') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `infoetu`
--

INSERT INTO `infoetu` (`idinfo`, `numetudiant`, `annee`, `niveau`) VALUES
(3, 18009015, 2021, '4');

-- --------------------------------------------------------

--
-- Table structure for table `niveauxcompetences`
--

CREATE TABLE `niveauxcompetences` (
  `idniveauxcompetences` tinyint(4) NOT NULL,
  `libelle` mediumtext NOT NULL,
  `idcompetence` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `niveauxcompetences`
--

INSERT INTO `niveauxcompetences` (`idniveauxcompetences`, `libelle`, `idcompetence`) VALUES
(1, 'Niveau débutant : Même avec de l\'aide, l\'apprenant n\'est pas encore capable de mettre en oeuvre des outils et méthodes.', 1),
(2, 'Niveau intermédiaire : Avec de l\'aide, l\'apprenant met en oeuvre des outils et méthodes, sans s\'interroger sur leur pertinence.', 1),
(3, 'Niveau de maitrise : L\'apprenant propose des outils et méthodes adaptés. En autonomie : il les met en oeuvre.', 1),
(4, 'Niveau d\'expertise : L\'apprenant choisit, adapte et met en oeuvre des méthodes et outils en justifiant ses choix.', 1),
(5, 'Niveau débutant : L\'apprenant n\'est pas encore capable d\'identifier les besoins et les contraintes.', 2),
(6, 'Niveau intermédiaire : L\'apprenant identifie les besoins et les contraintes, mais avec des oublis majeurs.', 2),
(7, 'Niveau de maitrise : L\'apprenant analyse les besoins et les contraintes sans oubli majeur.', 2),
(8, 'Niveau d\'expertise : L\'apprenant formalise sans oubli majeur les besoins et contraintes dans un cahier des charges.', 2),
(9, 'Niveau débutant : L\'apprenant n\'est pas encore capable de concevoir une solution.', 3),
(10, 'Niveau intermédiaire : Avec de l\'aide, l\'apprenant conçoit une solution, sans formalisation.', 3),
(11, 'Niveau de maitrise : Avec de l\'aide, l\'apprenant conçoit et formalise une solution.', 3),
(12, 'Niveau d\'expertise : En autonomie, l\'apprenant conçoit et formalise une solution.', 3),
(13, 'Niveau débutant : L\'apprenant n\'est pas encore capable de mettre en oeuvre une solution', 4),
(14, 'Niveau intermédiaire : Avec de l\'aide, l\'apprenant met en oeuvre et évalue une solution.', 4),
(15, 'Niveau de maitrise : En autonomie, l\'apprenant met en oeuvre une solution. Avec de l\'aide: il l\'évalue.', 4),
(16, 'Niveau d\'expertise : En autonomie, l\'apprenant met en oeuvre une solution et l\'évalue.', 4),
(17, 'Niveau débutant : Les documents ou présentations de l\'apprenant contiennent encore de nombreuses erreurs dans le contenu et/ou dans la forme et en conséquence ils ne sont pas exploitables.', 5),
(18, 'Niveau intermédiaire : L’apprenant produit des documents et présentations exploitables en interne avec encore quelques erreurs dans le contenu et/ou dans la forme.', 5),
(19, 'Niveau de maitrise : En autonomie, l\'apprenant produit des documents et présentation exploitables en interne.', 5),
(20, 'Niveau d\'expertise : En autonomie, l\'apprenant produit des documents et présentations exploitables et diffusables.', 5),
(21, 'Niveau débutant : L\'apprenant n\'est pas encore capable de mener des mesures et des expérimentations.', 6),
(22, 'Niveau intermédiaire : Avec de l\'aide, l\'apprenant mène et analyse des mesures et des expérimentations.', 6),
(23, 'Niveau de maitrise : Avec de l\'aide, l\'apprenant conçoit des mesures et des expérimentations. Il les mène et les analyse en autonomie.', 6),
(24, 'Niveau d\'expertise : En autonomie, l\'apprenant conçoit et mène des mesures et des expérimentations.', 6),
(25, 'Niveau débutant : L\'apprenant ne sait pas encore chercher des informations pertinantes.', 7),
(26, 'Niveau intermédiaire : Avec de l\'aide, l\'apprenant trouve des informations pertinentes et les exploite.', 7),
(27, 'Niveau de maitrise : En autonomie, l\'apprenant trouve des informations pertinentes. Avec de l\'aide, il les exploite.', 7),
(28, 'Niveau d\'expertise : En autonomie, l\'apprenant trouve des informations pertinentes et les exploite.', 7),
(29, 'Niveau débutant : L\'apprenant n\'a pas encore  conscience de ces enjeux.', 8),
(30, 'Niveau intermédiaire : L\'apprenant a conscience de ces enjeux mais ne les prend pas en compte.', 8),
(31, 'Niveau de maitrise : L\'apprenant prend en compte ces enjeux dans sa mission.', 8),
(32, 'Niveau d\'expertise : L\'apprenant prend en compte ces enjeux au-delà de sa mission.', 8),
(33, 'Niveau débutant : L\'apprenant n\'a pas encore conscience de ces enjeux.', 9),
(34, 'Niveau intermédiaire : L\'apprenant a conscience de ces enjeux mais ne les prend pas en compte.', 9),
(35, 'Niveau de maitrise : L\'apprenant prend en compte ces enjeux dans sa mission.', 9),
(36, 'Niveau d\'expertise : L\'apprenant prend en compte ces enjeux au-delà de sa mission.', 9),
(37, 'Niveau débutant : L\'apprenant n\'a pas encore  conscience de ces enjeux.', 10),
(38, 'Niveau intermédiaire : L\'apprenant a conscience de ces enjeux mais ne les prend pas en compte.', 10),
(39, 'Niveau de maitrise : L\'apprenant prend en compte ces enjeux dans sa mission.', 10),
(40, 'Niveau d\'expertise : L\'apprenant prend en compte ces enjeux au-delà de sa mission.', 10),
(41, 'Niveau débutant : L\'apprenant n\'est pas encore capable de mettre en oeuvre une démarche de gestion de projet.', 11),
(42, 'Niveau intermédiaire : L\'apprenant met partiellement en oeuvre une démarche de gestion de projet.', 11),
(43, 'Niveau de maitrise : Avec de l\'aide, l\'apprenant met en oeuvre une démarche de gestion de projet.', 11),
(44, 'Niveau d\'expertise : En autonomie, l\'apprenant met en oeuvre une démarche de gestion de projet.', 11),
(45, 'Niveau débutant : L\'apprenant n\'est pas encore capable de communiquer et interagir avec différents interlocuteurs de son service.', 12),
(46, 'Niveau intermédiaire : L\'apprenant communique/interagit de manière adaptée dans son service uniquement.', 12),
(47, 'Niveau de maitrise : L\'apprenant communique/ interagit de manière adaptée dans son entreprise uniquement.', 12),
(48, 'Niveau d\'expertise : L\'apprenant communique/ interagit de manière adaptée dans son entreprise et à l\'extérieur de l\'entreprise.', 12),
(49, 'Niveau débutant : L\'apprenant ne respecte pas encore les règles et les codes (horaires, présentation…).', 13),
(50, 'Niveau intermédiaire : L\'apprenant se contente de respecter a minima des règles et codes (horaires, présentation…).', 13),
(51, 'Niveau de maitrise : L\'apprenant  s\'implique dans la dynamique de son service.', 13),
(52, 'Niveau d\'expertise : L\'apprenant participe par son action à la diffusion de la culture d\'entreprise.', 13),
(53, 'Niveau débutant : L\'apprenant n\'est pas encore capable de participer à l\'animation d\'une équipe.', 14),
(54, 'Niveau intermédiaire : Par son action l\'apprenant est capable de contribuer de façon constructive à l\'animation d\'une équipe.', 14),
(55, 'Niveau de maitrise : L\'apprenant est capable d\'animer une équipe.', 14),
(56, 'Niveau d\'expertise : L\'apprenant est capable d\'animer une équipe, de la dynamiser et de la faire progresser.', 14),
(57, 'Niveau débutant : L\'apprenant n\'est pas encore capable de concevoir une solution innovante.', 15),
(58, 'Niveau intermédiaire : Avec de l\'aide, l\'apprenant conçoit une solution innovante, sans formalisation.', 15),
(59, 'Niveau de maitrise : En autonomie, l\'apprenant conçoit une solution innovante sans formalisation.', 15),
(60, 'Niveau d\'expertise : En autonomie, l\'apprenant conçoit et formalise une solution innovante.', 15),
(61, 'Niveau débutant : L\'apprenant n\'adapte pas son comportement aux différentes cultures et réglementations rencontrées', 16),
(62, 'Niveau intermédiaire : L\'apprenant commence à adapter son comportement aux différentes cultures et réglementations rencontrées.', 16),
(63, 'Niveau de maitrise : L\'apprenant adapte son comportement aux différentes cultures et réglementations rencontrées.', 16),
(64, 'Niveau d\'expertise : L\'apprenant est capable de travailler en contexte international en intégrant des éléments de management interculturel.', 16),
(65, 'Niveau débutant : L\'apprenant n\'analyse pas ses forces et faiblesses pour construire son projet professionel.', 17),
(66, 'Niveau intermédiaire : L\'apprenant commence à identifier ses compétences  (\'soft skills\') sans les lier à un projet professionel.', 17),
(67, 'Niveau de maitrise : L\'apprenant a un projet professionnel consolidé par une analyse type SWOT mais pas de plan d\'action pour le réaliser.', 17),
(68, 'Niveau d\'expertise : L\'apprenant a un projet professionnel consolidé par une analyse type SWOT et un plan d\'action pour le réaliser.', 17),
(69, 'Sans objet', 1),
(70, 'Sans objet', 2),
(71, 'Sans objet', 3),
(72, 'Sans objet', 4),
(73, 'Sans objet', 5),
(74, 'Sans objet', 6),
(75, 'Sans objet', 7),
(76, 'Sans objet', 8),
(77, 'Sans objet', 9),
(78, 'Sans objet', 10),
(79, 'Sans objet', 11),
(80, 'Sans objet', 12),
(81, 'Sans objet', 13),
(82, 'Sans objet', 14),
(83, 'Sans objet', 15),
(84, 'Sans objet', 16),
(85, 'Sans objet', 17);

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `idquest` smallint(6) NOT NULL,
  `question` mediumtext NOT NULL,
  `cat` tinyint(4) NOT NULL,
  `souscat` tinyint(4) DEFAULT NULL,
  `type` varchar(50) NOT NULL,
  `is4a` tinyint(1) NOT NULL,
  `is5a` tinyint(1) NOT NULL,
  `choix` varchar(50) DEFAULT NULL,
  `niveau` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`idquest`, `question`, `cat`, `souscat`, `type`, `is4a`, `is5a`, `choix`, `niveau`) VALUES
(2, 'Nom du stagiaire', 1, NULL, 'text', 1, 1, NULL, 4),
(3, 'Prénom du stagiaire', 1, NULL, 'text', 1, 1, NULL, 4),
(4, 'Nom de l\'entreprise', 1, NULL, 'text', 1, 1, NULL, 4),
(5, 'Ville/Pays', 1, NULL, 'text', 1, 1, NULL, 4),
(6, 'Nom du tuteur de stage', 1, NULL, 'text', 1, 1, NULL, 4),
(7, 'Fonction du tuteur', 1, NULL, 'text', 1, 1, NULL, 4),
(8, 'Courriel du tuteur', 1, NULL, 'text', 1, 1, NULL, 4),
(9, 'Téléphone du tuteur', 1, NULL, 'text', 1, 1, NULL, 4),
(10, 'Capacité d\'analyse / compréhension des problèmes', 2, 1, 'enum', 1, 1, 'notation', 4),
(11, 'Mise en oeuvre de ses connaissances', 2, 1, 'enum', 1, 1, 'notation', 4),
(12, 'Aptitudes à acquérir de nouvelles connaissances', 2, 1, 'enum', 1, 1, 'notation', 4),
(13, 'Méthodologie / organisation du travail, gestion de projet', 2, 2, 'enum', 1, 1, 'notation', 4),
(14, 'Synhtèse et communication des résultats, maîtrise des outils de communication', 2, 2, 'enum', 1, 1, 'notation', 4),
(15, 'Réalisation des objectifs - Qualité du travail réalisé', 2, 3, 'enum', 1, 1, 'notation', 4),
(16, 'Autonomie -initiative / créativité / ouverture d\'esprit', 2, 3, 'enum', 1, 1, 'notation', 4),
(17, 'Capacité à s\'intégrer dans une équipe', 2, 4, 'enum', 1, 1, 'notation', 4),
(18, 'Communication sur ses activités et capacité à rendre compte', 2, 4, 'enum', 1, 1, 'notation', 4),
(19, 'Prise en compte des enjeux métiers et économiques', 2, 4, 'enum', 1, 1, 'notation', 4),
(20, 'Appropriation des valeurs, codes et de la culture de l\'équipe et de l\'organisation', 2, 5, 'enum', 1, 1, 'notation', 4),
(21, 'Attitude / assiduité / ponctualité', 2, 5, 'enum', 1, 1, 'notation', 4),
(22, 'Sur le stagiaire', 3, NULL, 'text', 1, 1, NULL, 4),
(23, 'Sur le déroulé du stage', 3, NULL, 'text', 1, 1, NULL, 4),
(24, 'Classement du stagiaire parmi les stagiaires du même niveau accueillis par votre entreprise', 3, NULL, 'enum', 1, 1, 'classement', 4),
(25, 'Quels conseils donneriez-vous à ce futur ingénieur?', 3, NULL, 'text', 1, 1, NULL, 4),
(26, 'Sur la formation d\'ingénieur de Polytech Marseille', 3, NULL, 'text', 1, 1, NULL, 4),
(27, 'Sur l\'accueil d\'un stagiaire pour l\'année prochaine?', 3, NULL, 'enum', 1, 1, 'ouinon', 4),
(28, 'Sur l\'accueil d\'un élève en contrat de professionnalisation pour l\'année prochaine?', 3, NULL, 'enum', 1, 1, 'ouinon', 4),
(29, 'L\'entreprise a-t-elle fait une proposition d\'emploi au stagiaire?', 4, NULL, 'enum', 1, 1, 'ouinon', 4),
(30, 'Si une proposition a été faite, quel est le type de contrat?', 4, NULL, 'enum', 1, 1, 'contrat', 4),
(31, 'L\'entreprise ne recrute pas sur le profil du stagiaire', 4, NULL, 'enum', 1, 1, 'ouinon', 4),
(32, 'La stagiaire aurait pu être recruté si l\'entreprise avait eu un poste à pourvoir', 4, NULL, 'enum', 1, 1, 'ouinon', 4),
(33, 'Le stagiaire n\'a pas été retenu pour un recrutement', 4, NULL, 'enum', 1, 1, 'ouinon', 4),
(34, 'Autres:', 4, NULL, 'text', 1, 1, NULL, 4),
(35, 'Le rapport de stage est-il confidentiel? ', 5, NULL, 'enum', 1, 1, 'ouinon', 4),
(36, 'Souhaitez-vous participer à la soutenance?', 5, NULL, 'enum', 1, 1, 'ouinon', 4),
(37, 'Si oui, seriez-vous disponible pour participer au repas le jeudi 12 septembre à midi?', 5, NULL, 'enum', 0, 1, 'ouinon', 5),
(38, 'Si oui, indiquez le nombre de personnes qui participeront ', 5, NULL, 'text', 0, 1, NULL, 5),
(39, 'Avez-vous des impératifs horaires éventuels?', 5, NULL, 'text', 1, 1, NULL, 4),
(40, 'Sujet du stage en quelques mots', 1, NULL, 'text', 1, 1, NULL, 4);

-- --------------------------------------------------------

--
-- Table structure for table `retardeleve`
--

CREATE TABLE `retardeleve` (
  `iduti` int(9) NOT NULL,
  `mailenvoye` tinyint(1) NOT NULL,
  `rapport` tinyint(1) NOT NULL,
  `presentation` tinyint(1) NOT NULL,
  `autoeval` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `retardeleve`
--

INSERT INTO `retardeleve` (`iduti`, `mailenvoye`, `rapport`, `presentation`, `autoeval`) VALUES
(3, 1, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `retardtuteur`
--

CREATE TABLE `retardtuteur` (
  `iduti` int(9) NOT NULL,
  `mailenvoye` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `souscategorie`
--

CREATE TABLE `souscategorie` (
  `idsouscat` tinyint(11) NOT NULL,
  `name` mediumtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `souscategorie`
--

INSERT INTO `souscategorie` (`idsouscat`, `name`) VALUES
(1, 'Maîtrise des domaines scientifiques et techniques'),
(2, 'Maîtrise des méthodes et des outils de l\'ingénieur'),
(3, 'Conduite de l\'action et prise de décision'),
(4, 'Intégration dans une organisation et capacité d\'animation'),
(5, 'Respect des valeurs sociétales, sociales et environnementales');

-- --------------------------------------------------------

--
-- Table structure for table `stage`
--

CREATE TABLE `stage` (
  `idstage` int(9) NOT NULL,
  `ideleve` int(9) DEFAULT NULL,
  `niveau` enum('3','4','5') DEFAULT NULL,
  `annee` year(4) DEFAULT NULL,
  `idtuteur` int(9) DEFAULT NULL,
  `idens` int(9) DEFAULT NULL,
  `datedebut` date DEFAULT NULL,
  `datefin` date DEFAULT NULL,
  `titrestage` varchar(45) DEFAULT NULL,
  `description` mediumtext COMMENT 'quelques phrases expliquant le contenu du stage',
  `nomentreprise` varchar(100) NOT NULL,
  `adressestage` mediumtext COMMENT 'adresse ou le stage a lieu',
  `adremailstage` varchar(255) DEFAULT NULL COMMENT 'adresse mail du stagiaire durant le stage (email entreprise)',
  `cheminrapport` varchar(150) DEFAULT NULL COMMENT 'chemin vers le fichier du rapport de stage',
  `daterapport` timestamp NULL DEFAULT NULL COMMENT 'date upload du rapport',
  `cheminpres` varchar(150) DEFAULT NULL COMMENT 'chemin vers le fichier de la présentation en vue de la soutenance',
  `datepres` timestamp NULL DEFAULT NULL COMMENT 'date d''upload de la présentation',
  `chemineval` varchar(150) DEFAULT NULL COMMENT 'chemin vers le fichier correspondant à l''évaluation remplie par le tuteur d''entreprise',
  `dateeval` timestamp NULL DEFAULT NULL COMMENT 'date de l''évaluation',
  `evallancee` datetime DEFAULT NULL,
  `confidentiel` tinyint(1) DEFAULT '0',
  `datelimiterendu` date DEFAULT NULL,
  `datelimiteeval` date DEFAULT NULL,
  `datesoutenance` date DEFAULT NULL COMMENT 'Date de la soutenance',
  `datecomp` timestamp NULL DEFAULT NULL,
  `chemincomp` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `stage`
--

INSERT INTO `stage` (`idstage`, `ideleve`, `niveau`, `annee`, `idtuteur`, `idens`, `datedebut`, `datefin`, `titrestage`, `description`, `nomentreprise`, `adressestage`, `adremailstage`, `cheminrapport`, `daterapport`, `cheminpres`, `datepres`, `chemineval`, `dateeval`, `evallancee`, `confidentiel`, `datelimiterendu`, `datelimiteeval`, `datesoutenance`, `datecomp`, `chemincomp`) VALUES
(1, 3, '5', 2019, 5, 4, '2077-04-06', '2077-04-06', 'Super Stage 13', 'Un stage de Kalitey up', 'AIRBUS', NULL, NULL, './public/2020/5A/2020_5A_BECHARI_Bilal_rapport.pdf', '2019-04-06 20:00:00', './public/2020/5A/2020_5A_BECHARI_Bilal_presentation.pdf', NULL, NULL, NULL, NULL, 0, '2018-01-01', '2018-01-01', '2018-01-01', NULL, NULL),
(2, 14, '5', 2021, 5, 4, '2020-12-15', '2020-12-30', 'Super Stage Erwan', 'Un stage de defe', 'CGI', 'ededfede', 'dddd', 'chemin', '2020-12-08 22:00:00', 'chemin', '2020-12-08 22:00:00', 'fefe', '2020-12-08 22:00:00', '2020-11-30 23:00:00', 0, '2020-12-30', '2020-12-30', '2020-12-30', '2020-12-30 22:00:00', 'chemin'),
(3, 15, '5', 2021, 5, 4, '2020-12-01', '2022-12-31', 'Ingénieur DevOps', 'Réalisation d\'un stage d\'ingénieur DevOps', 'Thalès', 'blablabla', 'fiorehuguif', 'hirueghi', '2020-12-02 20:37:37', 'vktuiehrg', '2020-12-10 20:37:37', 'serdtj', '2020-12-26 20:37:37', '2020-12-26 21:37:37', 0, '2020-12-31', '2020-12-31', '2020-12-31', '2020-12-31 20:37:37', 'ertdfyguhi'),
(4, 15, '5', 2021, 5, 4, '2020-11-05', '2021-10-31', 'Ingénieur DevOps', 'En attente ....', 'Pytheas Navigation', '', '', '', '2020-10-09 22:00:00', '', '2020-10-09 22:00:00', '', '2020-10-09 22:00:00', '2020-10-10 00:00:00', 0, '2020-10-10', '2020-10-10', '2020-10-10', '2020-10-09 22:00:00', '');

-- --------------------------------------------------------

--
-- Table structure for table `utilisateur`
--

CREATE TABLE `utilisateur` (
  `id` int(10) NOT NULL,
  `nom` varchar(30) NOT NULL,
  `prenom` varchar(30) NOT NULL,
  `email` varchar(60) NOT NULL,
  `mdp` varchar(255) NOT NULL,
  `role` enum('Etudiant','Enseignant','Tuteur','Admin') NOT NULL DEFAULT 'Etudiant'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `utilisateur`
--

INSERT INTO `utilisateur` (`id`, `nom`, `prenom`, `email`, `mdp`, `role`) VALUES
(2, 'root', 'root', 'root@root.fr', '4813494d137e1631bba301d5acab6e7bb7aa74ce1185d456565ef51d737677b2', 'Admin'),
(3, 'etu', 'etu', 'etu@etu.fr', '4813494d137e1631bba301d5acab6e7bb7aa74ce1185d456565ef51d737677b2', 'Etudiant'),
(4, 'ens', 'ens', 'ens@ens.fr', '4813494d137e1631bba301d5acab6e7bb7aa74ce1185d456565ef51d737677b2', 'Enseignant'),
(5, 'tut', 'tut', 'tut@tut.fr', '4813494d137e1631bba301d5acab6e7bb7aa74ce1185d456565ef51d737677b2', 'Tuteur'),
(14, 'etu2', 'etu2', 'etu2@etu2.fr', '4813494d137e1631bba301d5acab6e7bb7aa74ce1185d456565ef51d737677b2', 'Etudiant'),
(15, 'Delory', 'Erwan', 'erwan.delory@gmail.com', '4813494d137e1631bba301d5acab6e7bb7aa74ce1185d456565ef51d737677b2', 'Etudiant'),
(16, 'El Kourdi', 'Maha', 'maha@elkourdi.fr', '4813494d137e1631bba301d5acab6e7bb7aa74ce1185d456565ef51d737677b2', 'Tuteur');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categorie`
--
ALTER TABLE `categorie`
  ADD PRIMARY KEY (`idcat`);

--
-- Indexes for table `competences`
--
ALTER TABLE `competences`
  ADD PRIMARY KEY (`idcompetence`);

--
-- Indexes for table `infoetu`
--
ALTER TABLE `infoetu`
  ADD PRIMARY KEY (`idinfo`),
  ADD UNIQUE KEY `idinfo` (`idinfo`),
  ADD UNIQUE KEY `numetudiant` (`numetudiant`),
  ADD KEY `ide` (`idinfo`);

--
-- Indexes for table `niveauxcompetences`
--
ALTER TABLE `niveauxcompetences`
  ADD PRIMARY KEY (`idniveauxcompetences`),
  ADD KEY `idcompetence` (`idcompetence`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`idquest`),
  ADD KEY `cat` (`cat`),
  ADD KEY `souscat` (`souscat`);

--
-- Indexes for table `retardeleve`
--
ALTER TABLE `retardeleve`
  ADD PRIMARY KEY (`iduti`);

--
-- Indexes for table `retardtuteur`
--
ALTER TABLE `retardtuteur`
  ADD PRIMARY KEY (`iduti`);

--
-- Indexes for table `souscategorie`
--
ALTER TABLE `souscategorie`
  ADD PRIMARY KEY (`idsouscat`);

--
-- Indexes for table `stage`
--
ALTER TABLE `stage`
  ADD PRIMARY KEY (`idstage`),
  ADD UNIQUE KEY `idstage` (`idstage`),
  ADD KEY `fk_stage_1_idx` (`ideleve`),
  ADD KEY `fk_stage_2_idx` (`idtuteur`),
  ADD KEY `fk_stage_4_idx` (`idens`);

--
-- Indexes for table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categorie`
--
ALTER TABLE `categorie`
  MODIFY `idcat` tinyint(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `competences`
--
ALTER TABLE `competences`
  MODIFY `idcompetence` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `niveauxcompetences`
--
ALTER TABLE `niveauxcompetences`
  MODIFY `idniveauxcompetences` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `idquest` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `souscategorie`
--
ALTER TABLE `souscategorie`
  MODIFY `idsouscat` tinyint(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `stage`
--
ALTER TABLE `stage`
  MODIFY `idstage` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `utilisateur`
--
ALTER TABLE `utilisateur`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `infoetu`
--
ALTER TABLE `infoetu`
  ADD CONSTRAINT `Fkinfoetu` FOREIGN KEY (`idinfo`) REFERENCES `utilisateur` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `niveauxcompetences`
--
ALTER TABLE `niveauxcompetences`
  ADD CONSTRAINT `niveauxcompetences_ibfk_1` FOREIGN KEY (`idcompetence`) REFERENCES `competences` (`idcompetence`);

--
-- Constraints for table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`cat`) REFERENCES `categorie` (`idcat`),
  ADD CONSTRAINT `questions_ibfk_2` FOREIGN KEY (`souscat`) REFERENCES `souscategorie` (`idsouscat`);

--
-- Constraints for table `retardeleve`
--
ALTER TABLE `retardeleve`
  ADD CONSTRAINT `fk1re` FOREIGN KEY (`iduti`) REFERENCES `utilisateur` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `retardtuteur`
--
ALTER TABLE `retardtuteur`
  ADD CONSTRAINT `fk1rt` FOREIGN KEY (`iduti`) REFERENCES `utilisateur` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `stage`
--
ALTER TABLE `stage`
  ADD CONSTRAINT `fk_stage_1` FOREIGN KEY (`ideleve`) REFERENCES `utilisateur` (`id`),
  ADD CONSTRAINT `fk_stage_2` FOREIGN KEY (`idtuteur`) REFERENCES `utilisateur` (`id`),
  ADD CONSTRAINT `fk_stage_4` FOREIGN KEY (`idens`) REFERENCES `utilisateur` (`id`);
