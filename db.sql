-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Hôte : db
-- Généré le : Dim 07 fév. 2021 à 13:34
-- Version du serveur :  8.0.22
-- Version de PHP : 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `db`
--

-- --------------------------------------------------------

--
-- Structure de la table `categorie`
--

CREATE TABLE `categorie` (
  `idcat` tinyint NOT NULL,
  `name` mediumtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `categorie`
--

INSERT INTO `categorie` (`idcat`, `name`) VALUES
(1, 'IDENTIFICATION'),
(2, 'ÉVALUATION DES COMPÉTENCES'),
(3, 'APPRÉCIATION GLOBALE SUR LE STAGE'),
(4, 'APRÈS LE STAGE'),
(5, 'SOUTENANCE DE STAGE');

-- --------------------------------------------------------

--
-- Structure de la table `competences`
--

CREATE TABLE `competences` (
  `idcompetence` tinyint NOT NULL,
  `sigle` char(6) NOT NULL,
  `libelle` mediumtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `competences`
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
-- Structure de la table `infoetu`
--

CREATE TABLE `infoetu` (
  `idinfo` int NOT NULL,
  `numetudiant` int DEFAULT NULL,
  `annee` int DEFAULT NULL,
  `niveau` enum('3','4','5') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `niveauxcompetences`
--

CREATE TABLE `niveauxcompetences` (
  `idniveauxcompetences` tinyint NOT NULL,
  `libelle1` mediumtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `libelle2` mediumtext,
  `libelle3` mediumtext,
  `libelle4` mediumtext,
  `libelle5` mediumtext,
  `idcompetence` tinyint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `niveauxcompetences`
--

INSERT INTO `niveauxcompetences` (`idniveauxcompetences`, `libelle1`, `libelle2`, `libelle3`, `libelle4`, `libelle5`, `idcompetence`) VALUES
(1, 'Niveau débutant : Même avec de l\'aide, l\'apprenant n\'est pas encore capable de mettre en oeuvre des outils et méthodes.', 'Niveau intermédiaire : Avec de l\'aide, l\'apprenant met en oeuvre des outils et méthodes, sans s\'interroger sur leur pertinence.', 'Niveau de maitrise : L\'apprenant propose des outils et méthodes adaptés. En autonomie : il les met en oeuvre.', 'Niveau d\'expertise : L\'apprenant choisit, adapte et met en oeuvre des méthodes et outils en justifiant ses choix.', 'Sans objet', 1),
(5, 'Niveau débutant : L\'apprenant n\'est pas encore capable d\'identifier les besoins et les contraintes.', 'Niveau intermédiaire : L\'apprenant identifie les besoins et les contraintes, mais avec des oublis majeurs.', 'Niveau de maitrise : L\'apprenant analyse les besoins et les contraintes sans oubli majeur.', 'Niveau d\'expertise : L\'apprenant formalise sans oubli majeur les besoins et contraintes dans un cahier des charges.', 'Sans objet', 2),
(9, 'Niveau débutant : L\'apprenant n\'est pas encore capable de concevoir une solution.', 'Niveau intermédiaire : Avec de l\'aide, l\'apprenant conçoit une solution, sans formalisation.', 'Niveau de maitrise : Avec de l\'aide, l\'apprenant conçoit et formalise une solution.', 'Niveau d\'expertise : En autonomie, l\'apprenant conçoit et formalise une solution.', 'Sans objet', 3),
(13, 'Niveau débutant : L\'apprenant n\'est pas encore capable de mettre en oeuvre une solution', 'Niveau intermédiaire : Avec de l\'aide, l\'apprenant met en oeuvre et évalue une solution.', 'Niveau de maitrise : En autonomie, l\'apprenant met en oeuvre une solution. Avec de l\'aide: il l\'évalue.', 'Niveau d\'expertise : En autonomie, l\'apprenant met en oeuvre une solution et l\'évalue.', 'Sans objet', 4),
(17, 'Niveau débutant : Les documents ou présentations de l\'apprenant contiennent encore de nombreuses erreurs dans le contenu et/ou dans la forme et en conséquence ils ne sont pas exploitables.', 'Niveau intermédiaire : L’apprenant produit des documents et présentations exploitables en interne avec encore quelques erreurs dans le contenu et/ou dans la forme.', 'Niveau de maitrise : En autonomie, l\'apprenant produit des documents et présentation exploitables en interne.', 'Niveau d\'expertise : En autonomie, l\'apprenant produit des documents et présentations exploitables et diffusables.', 'Sans objet', 5),
(21, 'Niveau débutant : L\'apprenant n\'est pas encore capable de mener des mesures et des expérimentations.', 'Niveau intermédiaire : Avec de l\'aide, l\'apprenant mène et analyse des mesures et des expérimentations.', 'Niveau de maitrise : Avec de l\'aide, l\'apprenant conçoit des mesures et des expérimentations. Il les mène et les analyse en autonomie.', 'Niveau d\'expertise : En autonomie, l\'apprenant conçoit et mène des mesures et des expérimentations.', 'Sans objet', 6),
(25, 'Niveau débutant : L\'apprenant ne sait pas encore chercher des informations pertinantes.', 'Niveau intermédiaire : Avec de l\'aide, l\'apprenant trouve des informations pertinentes et les exploite.', 'Niveau de maitrise : En autonomie, l\'apprenant trouve des informations pertinentes. Avec de l\'aide, il les exploite.', 'Niveau d\'expertise : En autonomie, l\'apprenant trouve des informations pertinentes et les exploite.', 'Sans objet', 7),
(29, 'Niveau débutant : L\'apprenant n\'a pas encore  conscience de ces enjeux.', 'Niveau intermédiaire : L\'apprenant a conscience de ces enjeux mais ne les prend pas en compte.', 'Niveau de maitrise : L\'apprenant prend en compte ces enjeux dans sa mission.', 'Niveau d\'expertise : L\'apprenant prend en compte ces enjeux au-delà de sa mission.', 'Sans objet', 8),
(33, 'Niveau débutant : L\'apprenant n\'a pas encore conscience de ces enjeux.', 'Niveau intermédiaire : L\'apprenant a conscience de ces enjeux mais ne les prend pas en compte.', 'Niveau de maitrise : L\'apprenant prend en compte ces enjeux dans sa mission.', 'Niveau d\'expertise : L\'apprenant prend en compte ces enjeux au-delà de sa mission.', 'Sans objet', 9),
(37, 'Niveau débutant : L\'apprenant n\'a pas encore  conscience de ces enjeux.', 'Niveau intermédiaire : L\'apprenant a conscience de ces enjeux mais ne les prend pas en compte.', 'Niveau de maitrise : L\'apprenant prend en compte ces enjeux dans sa mission.', 'Niveau d\'expertise : L\'apprenant prend en compte ces enjeux au-delà de sa mission.', 'Sans objet', 10),
(41, 'Niveau débutant : L\'apprenant n\'est pas encore capable de mettre en oeuvre une démarche de gestion de projet.', 'Niveau intermédiaire : L\'apprenant met partiellement en oeuvre une démarche de gestion de projet.', 'Niveau de maitrise : Avec de l\'aide, l\'apprenant met en oeuvre une démarche de gestion de projet.', 'Niveau d\'expertise : En autonomie, l\'apprenant met en oeuvre une démarche de gestion de projet.', 'Sans objet', 11),
(45, 'Niveau débutant : L\'apprenant n\'est pas encore capable de communiquer et interagir avec différents interlocuteurs de son service.', 'Niveau intermédiaire : L\'apprenant communique/interagit de manière adaptée dans son service uniquement.', 'Niveau de maitrise : L\'apprenant communique/ interagit de manière adaptée dans son entreprise uniquement.', 'Niveau d\'expertise : L\'apprenant communique/ interagit de manière adaptée dans son entreprise et à l\'extérieur de l\'entreprise.', 'Sans objet', 12),
(49, 'Niveau débutant : L\'apprenant ne respecte pas encore les règles et les codes (horaires, présentation…).', 'Niveau intermédiaire : L\'apprenant se contente de respecter a minima des règles et codes (horaires, présentation…).', 'Niveau de maitrise : L\'apprenant  s\'implique dans la dynamique de son service.', 'Niveau d\'expertise : L\'apprenant participe par son action à la diffusion de la culture d\'entreprise.', 'Sans objet', 13),
(53, 'Niveau débutant : L\'apprenant n\'est pas encore capable de participer à l\'animation d\'une équipe.', 'Niveau intermédiaire : Par son action l\'apprenant est capable de contribuer de façon constructive à l\'animation d\'une équipe.', 'Niveau de maitrise : L\'apprenant est capable d\'animer une équipe.', 'Niveau d\'expertise : L\'apprenant est capable d\'animer une équipe, de la dynamiser et de la faire progresser.', 'Sans objet', 14),
(57, 'Niveau débutant : L\'apprenant n\'est pas encore capable de concevoir une solution innovante.', 'Niveau intermédiaire : Avec de l\'aide, l\'apprenant conçoit une solution innovante, sans formalisation.', 'Niveau de maitrise : En autonomie, l\'apprenant conçoit une solution innovante sans formalisation.', 'Niveau d\'expertise : En autonomie, l\'apprenant conçoit et formalise une solution innovante.', 'Sans objet', 15),
(61, 'Niveau débutant : L\'apprenant n\'adapte pas son comportement aux différentes cultures et réglementations rencontrées', 'Niveau intermédiaire : L\'apprenant commence à adapter son comportement aux différentes cultures et réglementations rencontrées.', 'Niveau de maitrise : L\'apprenant adapte son comportement aux différentes cultures et réglementations rencontrées.', 'Niveau d\'expertise : L\'apprenant est capable de travailler en contexte international en intégrant des éléments de management interculturel.', 'Sans objet', 16),
(65, 'Niveau débutant : L\'apprenant n\'analyse pas ses forces et faiblesses pour construire son projet professionel.', 'Niveau intermédiaire : L\'apprenant commence à identifier ses compétences  (\'soft skills\') sans les lier à un projet professionel.', 'Niveau de maitrise : L\'apprenant a un projet professionnel consolidé par une analyse type SWOT mais pas de plan d\'action pour le réaliser.', 'Niveau d\'expertise : L\'apprenant a un projet professionnel consolidé par une analyse type SWOT et un plan d\'action pour le réaliser.', 'Sans objet', 17);

-- --------------------------------------------------------

--
-- Structure de la table `questions`
--

CREATE TABLE `questions` (
  `idquest` smallint NOT NULL,
  `question` mediumtext NOT NULL,
  `cat` tinyint NOT NULL,
  `souscat` tinyint DEFAULT NULL,
  `type` varchar(50) NOT NULL,
  `is4a` tinyint(1) NOT NULL,
  `is5a` tinyint(1) NOT NULL,
  `choix` varchar(50) DEFAULT NULL,
  `niveau` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `questions`
--

INSERT INTO `questions` (`idquest`, `question`, `cat`, `souscat`, `type`, `is4a`, `is5a`, `choix`, `niveau`) VALUES
(1, 'Nom du stagiaire', 1, NULL, 'text', 1, 1, NULL, 4),
(2, 'Prénom du stagiaire', 1, NULL, 'text', 1, 1, NULL, 4),
(3, 'Nom de l\'entreprise', 1, NULL, 'text', 1, 1, NULL, 4),
(4, 'Ville/Pays', 1, NULL, 'text', 1, 1, NULL, 4),
(5, 'Nom du tuteur de stage', 1, NULL, 'text', 1, 1, NULL, 4),
(6, 'Fonction du tuteur', 1, NULL, 'text', 1, 1, NULL, 4),
(7, 'Courriel du tuteur', 1, NULL, 'text', 1, 1, NULL, 4),
(8, 'Téléphone du tuteur', 1, NULL, 'text', 1, 1, NULL, 4),
(9, 'Sujet du stage en quelques mots', 1, NULL, 'text', 1, 1, NULL, 4),
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
(39, 'Avez-vous des impératifs horaires éventuels?', 5, NULL, 'text', 1, 1, NULL, 4);

-- --------------------------------------------------------

--
-- Structure de la table `retardeleve`
--

CREATE TABLE `retardeleve` (
  `iduti` int NOT NULL,
  `mailenvoye` tinyint(1) NOT NULL,
  `rapport` tinyint(1) NOT NULL,
  `presentation` tinyint(1) NOT NULL,
  `autoeval` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `retardeleve`
--

INSERT INTO `retardeleve` (`iduti`, `mailenvoye`, `rapport`, `presentation`, `autoeval`) VALUES
(15, 1, 0, 0, 0);

-- --------------------------------------------------------

--
-- Structure de la table `retardtuteur`
--

CREATE TABLE `retardtuteur` (
  `iduti` int NOT NULL,
  `mailenvoye` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `retardtuteur`
--

INSERT INTO `retardtuteur` (`iduti`, `mailenvoye`) VALUES
(37, 1);

-- --------------------------------------------------------

--
-- Structure de la table `souscategorie`
--

CREATE TABLE `souscategorie` (
  `idsouscat` tinyint NOT NULL,
  `name` mediumtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `souscategorie`
--

INSERT INTO `souscategorie` (`idsouscat`, `name`) VALUES
(1, 'Maîtrise des domaines scientifiques et techniques'),
(2, 'Maîtrise des méthodes et des outils de l\'ingénieur'),
(3, 'Conduite de l\'action et prise de décision'),
(4, 'Intégration dans une organisation et capacité d\'animation'),
(5, 'Respect des valeurs sociétales, sociales et environnementales');

-- --------------------------------------------------------

--
-- Structure de la table `stage`
--

CREATE TABLE `stage` (
  `idstage` int NOT NULL,
  `ideleve` int DEFAULT NULL,
  `niveau` enum('3','4','5') DEFAULT NULL,
  `annee` year DEFAULT NULL,
  `idtuteur` int DEFAULT NULL,
  `idens` int DEFAULT NULL,
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
-- Déchargement des données de la table `stage`
--

INSERT INTO `stage` (`idstage`, `ideleve`, `niveau`, `annee`, `idtuteur`, `idens`, `datedebut`, `datefin`, `titrestage`, `description`, `nomentreprise`, `adressestage`, `adremailstage`, `cheminrapport`, `daterapport`, `cheminpres`, `datepres`, `chemineval`, `dateeval`, `evallancee`, `confidentiel`, `datelimiterendu`, `datelimiteeval`, `datesoutenance`, `datecomp`, `chemincomp`) VALUES
(1, 19, '5', 2021, 38, 28, '2021-01-30', '2021-06-30', 'Développement d\'application web', 'Création d\'une application en React.js', 'Airbus', 'Aéroport International Marseille Provence, 13700 ', 'dorian.bonhomme@airbus.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL),
(2, 20, '5', 2021, 41, 32, '2021-02-02', '2021-07-03', 'Création d\'une application cloud', 'Création et déploiement d\'une application', 'CGI', ' 125 Avenue Galilée Immeuble Le Quartz, 13100 Aix-en-Provence', 'aymen.damak@cgi.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL),
(3, 15, '5', 2021, 37, 33, '2020-11-05', '2021-11-29', 'Ingénieur DevOps', 'Réalisation d\'un contrat d\'ingénieur DevOps', 'Pytheas Navigation', '52 rue Emmanuel Eydoux 13016 Marseille', 'erwan.delory@pytheasnavigation.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

CREATE TABLE `utilisateur` (
  `id` int NOT NULL,
  `nom` varchar(30) NOT NULL,
  `prenom` varchar(30) NOT NULL,
  `email` varchar(60) NOT NULL,
  `mdp` varchar(255) NOT NULL,
  `role` enum('Etudiant','Enseignant','Tuteur','Admin') NOT NULL DEFAULT 'Etudiant'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`id`, `nom`, `prenom`, `email`, `mdp`, `role`) VALUES
(15, 'Delory', 'Erwan', 'erwan.delory@etu.univ-amu.fr', '4813494d137e1631bba301d5acab6e7bb7aa74ce1185d456565ef51d737677b2', 'Etudiant'),
(19, 'Bonhomme', 'Dorian', 'dorian.bonhomme@etu.univ-amu.fr', '4813494d137e1631bba301d5acab6e7bb7aa74ce1185d456565ef51d737677b2', 'Etudiant'),
(20, 'Damak', 'Aymen', 'aymen.damak@etu.univ-amu.fr', '4813494d137e1631bba301d5acab6e7bb7aa74ce1185d456565ef51d737677b2', 'Etudiant'),
(21, 'Durand', 'Nicolas', 'nicolas.durand@univ-amu.fr', '4813494d137e1631bba301d5acab6e7bb7aa74ce1185d456565ef51d737677b2', 'Admin'),
(22, 'Ayache', 'Stephane', 'stephane.ayache@univ-amu.fr', '4813494d137e1631bba301d5acab6e7bb7aa74ce1185d456565ef51d737677b2', 'Enseignant'),
(23, 'Bac', 'Alexandra', 'alexandra.bac@univ-amu.fr', '4813494d137e1631bba301d5acab6e7bb7aa74ce1185d456565ef51d737677b2', 'Enseignant'),
(24, 'Banton', 'Peter', 'peter.banton@univ-amu.fr', '4813494d137e1631bba301d5acab6e7bb7aa74ce1185d456565ef51d737677b2', 'Enseignant'),
(25, 'Bonnecaze', 'Alexis', 'alexis.bonnecaze@univ-amu.fr', '4813494d137e1631bba301d5acab6e7bb7aa74ce1185d456565ef51d737677b2', 'Enseignant'),
(26, 'Baudru', 'Nicolas', 'nicolas.baudru@univ-amu.fr', '4813494d137e1631bba301d5acab6e7bb7aa74ce1185d456565ef51d737677b2', 'Enseignant'),
(27, 'Daniel', 'Marc', 'marc.daniel@univ-amu.fr', '4813494d137e1631bba301d5acab6e7bb7aa74ce1185d456565ef51d737677b2', 'Enseignant'),
(28, 'Gonzales', 'Christophe', 'christophe.gonzales@univ-amu.fr', '4813494d137e1631bba301d5acab6e7bb7aa74ce1185d456565ef51d737677b2', 'Enseignant'),
(29, 'Mavromatis', 'Sébastien', 'sebastien.mavromatis@univ-amu.fr', '4813494d137e1631bba301d5acab6e7bb7aa74ce1185d456565ef51d737677b2', 'Enseignant'),
(30, 'Mugwaneza', 'Léon', 'leon.mugwaneza@univ-amu.fr', '4813494d137e1631bba301d5acab6e7bb7aa74ce1185d456565ef51d737677b2', 'Enseignant'),
(31, 'Papini', 'Odile', 'odile.papini@univ-amu.fr', '4813494d137e1631bba301d5acab6e7bb7aa74ce1185d456565ef51d737677b2', 'Enseignant'),
(32, 'Prosperi', 'Serge', 'serge.prosperi@univ-amu.fr', '4813494d137e1631bba301d5acab6e7bb7aa74ce1185d456565ef51d737677b2', 'Enseignant'),
(33, 'Quafafou', 'Mohamed', 'mohamed.quafafou@univ-amu.fr', '4813494d137e1631bba301d5acab6e7bb7aa74ce1185d456565ef51d737677b2', 'Enseignant'),
(34, 'Tisserant', 'Sylvain', 'sylvain.tisserant@univ-amu.fr', '4813494d137e1631bba301d5acab6e7bb7aa74ce1185d456565ef51d737677b2', 'Enseignant'),
(35, 'Valiente', 'Julien', 'julien.valiente@univ-amu.fr', '4813494d137e1631bba301d5acab6e7bb7aa74ce1185d456565ef51d737677b2', 'Enseignant'),
(36, 'Darrin', 'Olivier', 'darrin.olivier@gmail.com', '4813494d137e1631bba301d5acab6e7bb7aa74ce1185d456565ef51d737677b2', 'Tuteur'),
(37, 'La Greca', 'Raphael', 'raphael.lagreca@pytheasnavigation.com', '4813494d137e1631bba301d5acab6e7bb7aa74ce1185d456565ef51d737677b2', 'Tuteur'),
(38, 'Barbier', 'Julien', 'julien.barbier@gmail.com', '4813494d137e1631bba301d5acab6e7bb7aa74ce1185d456565ef51d737677b2', 'Tuteur'),
(39, 'Leroy', 'Vincent', 'vincent.leroy@gmail.com', '4813494d137e1631bba301d5acab6e7bb7aa74ce1185d456565ef51d737677b2', 'Tuteur'),
(40, 'Dumont', 'Tristan', 'tristan.dumont@gmail.com', '4813494d137e1631bba301d5acab6e7bb7aa74ce1185d456565ef51d737677b2', 'Tuteur'),
(41, 'Claude', 'Jean', 'jean.claude@gmail.com', '4813494d137e1631bba301d5acab6e7bb7aa74ce1185d456565ef51d737677b2', 'Tuteur'),
(42, 'Blanc', 'Guillaume', 'guillaume.blanc@gmail.com', '4813494d137e1631bba301d5acab6e7bb7aa74ce1185d456565ef51d737677b2', 'Tuteur'),
(43, 'Quessandier', 'Théo', 'theo.quessandier@etu.univ-amu.fr', '4813494d137e1631bba301d5acab6e7bb7aa74ce1185d456565ef51d737677b2', 'Etudiant'),
(44, 'Feltin', 'Benjamin', 'benjamin.feltin@etu.univ-amu.fr', '4813494d137e1631bba301d5acab6e7bb7aa74ce1185d456565ef51d737677b2', 'Etudiant'),
(45, 'Grauso', 'Maxime', 'maxime.grauso@etu.univ-amu.fr', '4813494d137e1631bba301d5acab6e7bb7aa74ce1185d456565ef51d737677b2', 'Etudiant');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `categorie`
--
ALTER TABLE `categorie`
  ADD PRIMARY KEY (`idcat`);

--
-- Index pour la table `competences`
--
ALTER TABLE `competences`
  ADD PRIMARY KEY (`idcompetence`);

--
-- Index pour la table `infoetu`
--
ALTER TABLE `infoetu`
  ADD PRIMARY KEY (`idinfo`),
  ADD UNIQUE KEY `idinfo` (`idinfo`),
  ADD UNIQUE KEY `numetudiant` (`numetudiant`),
  ADD KEY `ide` (`idinfo`);

--
-- Index pour la table `niveauxcompetences`
--
ALTER TABLE `niveauxcompetences`
  ADD PRIMARY KEY (`idniveauxcompetences`),
  ADD KEY `idcompetence` (`idcompetence`);

--
-- Index pour la table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`idquest`),
  ADD KEY `cat` (`cat`),
  ADD KEY `souscat` (`souscat`);

--
-- Index pour la table `retardeleve`
--
ALTER TABLE `retardeleve`
  ADD PRIMARY KEY (`iduti`);

--
-- Index pour la table `retardtuteur`
--
ALTER TABLE `retardtuteur`
  ADD PRIMARY KEY (`iduti`);

--
-- Index pour la table `souscategorie`
--
ALTER TABLE `souscategorie`
  ADD PRIMARY KEY (`idsouscat`);

--
-- Index pour la table `stage`
--
ALTER TABLE `stage`
  ADD PRIMARY KEY (`idstage`),
  ADD UNIQUE KEY `idstage` (`idstage`),
  ADD KEY `fk_stage_1_idx` (`ideleve`),
  ADD KEY `fk_stage_2_idx` (`idtuteur`),
  ADD KEY `fk_stage_4_idx` (`idens`);

--
-- Index pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `categorie`
--
ALTER TABLE `categorie`
  MODIFY `idcat` tinyint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `competences`
--
ALTER TABLE `competences`
  MODIFY `idcompetence` tinyint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT pour la table `niveauxcompetences`
--
ALTER TABLE `niveauxcompetences`
  MODIFY `idniveauxcompetences` tinyint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- AUTO_INCREMENT pour la table `questions`
--
ALTER TABLE `questions`
  MODIFY `idquest` smallint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT pour la table `souscategorie`
--
ALTER TABLE `souscategorie`
  MODIFY `idsouscat` tinyint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `stage`
--
ALTER TABLE `stage`
  MODIFY `idstage` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=249;

--
-- AUTO_INCREMENT pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `infoetu`
--
ALTER TABLE `infoetu`
  ADD CONSTRAINT `Fkinfoetu` FOREIGN KEY (`idinfo`) REFERENCES `utilisateur` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `niveauxcompetences`
--
ALTER TABLE `niveauxcompetences`
  ADD CONSTRAINT `niveauxcompetences_ibfk_1` FOREIGN KEY (`idcompetence`) REFERENCES `competences` (`idcompetence`);

--
-- Contraintes pour la table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`cat`) REFERENCES `categorie` (`idcat`),
  ADD CONSTRAINT `questions_ibfk_2` FOREIGN KEY (`souscat`) REFERENCES `souscategorie` (`idsouscat`);

--
-- Contraintes pour la table `retardeleve`
--
ALTER TABLE `retardeleve`
  ADD CONSTRAINT `fk1re` FOREIGN KEY (`iduti`) REFERENCES `utilisateur` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `retardtuteur`
--
ALTER TABLE `retardtuteur`
  ADD CONSTRAINT `fk1rt` FOREIGN KEY (`iduti`) REFERENCES `utilisateur` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `stage`
--
ALTER TABLE `stage`
  ADD CONSTRAINT `fk_stage_1` FOREIGN KEY (`ideleve`) REFERENCES `utilisateur` (`id`),
  ADD CONSTRAINT `fk_stage_2` FOREIGN KEY (`idtuteur`) REFERENCES `utilisateur` (`id`),
  ADD CONSTRAINT `fk_stage_4` FOREIGN KEY (`idens`) REFERENCES `utilisateur` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
