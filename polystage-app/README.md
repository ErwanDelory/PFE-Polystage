Projet de fin d'études de Polytech Marseille.

## Guide d'utilisation du projet

Pour lancer le projet, il est nécéssaire d'avoir plusieurs outils:\
Il faut installer node.js et npm.\
Il faut installer docker ou un gestionnaire pour MySQL comme MAMP sur MacOS ou encore WAMP sur Windows.\
Il est nécéssaire aussi d'avoir la commande `docker-compose` pour exécuter l'application sur docker.\

### `Utilisation de docker`

Avec docker, l'utilisation de l'application est plus simple.
Il suffit de se placer à la racine du projet, donc à la racine de PFE-Polystage.\
Il faut exécuter la commande: `docker-compose up` pour réaliser la création des containers.\
Une fois que les containeurs seront créés, il est nécéssaire d'ajouter la base de données SQL pour que le backend puisse se connecter.\
Pour ce faire, il faut se rendre à l'adresse: [http://localhost:8080](http://localhost:8080).\
Les identifiants sont `root`et `root`.\
Puis il faut créer une base de données du nom de `db` pour ne pas avoir à modifier la connexion du backend.\
Ensuite, il faut ouvrir la base de données, appuyer sur `importer` puis `choisir le fichier` afin de sélectionner le fichier `db.sql` puis sur `exécuter`.\
Il est maintenant possible de relancer le container du backend depuis l'application docker ou encore en annulant et recommancant la commande: `docker-compose up`.\
L'application est maintenant totalement utilisable à l'adresse: [http://localhost:3000](http://localhost:3000).\

### `Utilisation sans docker`

Il suffit d'installer MAMP, WAMP ou un équivalent.\
Une fois que c'est fait, il est nécéssaire d'ajouter la base de données SQL pour que le backend puisse se connecter.\
Pour ce faire, il faut se rendre à l'adresse: [http://localhost:8888/phpMyAdmin/?lang=en](http://localhost:8888/phpMyAdmin/?lang=en) pour MAMP.\
Puis il faut créer une base de données du nom de `db` pour ne pas avoir à modifier la connexion du backend.\
Ensuite, il faut ouvrir la base de données, appuyer sur `importer` puis `choisir le fichier` afin de sélectionner le fichier `db.sql` puis sur `exécuter`.\
Il faut ensuite adapter la configuration du backend. Il faut donc modifier le fichier `config.js` qui se trouve dans le dossier `PFE-Polystage/Node/`.\
Il faut que l'host soit sur `localhost`, définir l'user et le mot de passe du logiciel (par défaut c'est root), et enfin définir le port (8889 sur MAMP).\
Ensuite, il faut se placer dans le dossier `PFE-Polystage/Node/` afin de faire la commande `npm install` pour installer les dépendances puis `npm start` pour démarrer le backend. Celui-ci démarre sur le port 5000.\
Ensuite, il faut se placer dans le dossier `PFE-Polystage/polystage-app/` afin de faire la commande `npm install` pour installer les dépendances puis `npm start` pour démarrer le frontend à l'adresse: [http://localhost:3000](http://localhost:3000).\

### `Utilisation de l'application``

Une fois sur l'application, il est possible de se créer un compte afin de voir les différentes pages en fonction du type de compte.\
Il y a 4 types de compte, élève, professeur, tuteur et administrateur.\
Il n'est pas possible de choisir le rôle administrateur lors de la création d'un compte, il faut le modifier directement dans la base de données en changeant le rôle par `Admin`.\

### `Compte déjà dans la base de données`

Il existe déjà des comptes dans la base de données:\
Compte élève: `erwan.delory@gmail.com` et mot de passe `root`.\
Compte professeur: `nicolas.baudru@univ-amu.fr` et mot de passe `root`.\
Compte administrateur: `nicolas.durand@univ-amu.fr` et mot de passe `root`.\
Compte tuteur: `tut@tut.fr` et mot de passe `root`.\
