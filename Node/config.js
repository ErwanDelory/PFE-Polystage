const config = {
	node: {
		port: 5000,
	},
	mysql: {
		// paramètres de connexion à la base de données
		host: "localhost", //localhost en local, db en docker
		user: "root",
		password: "root",
		port: 3308, //enlever en docker
		database: "db",
		charset: "utf8",
	},

	//Liste des tables avec leurs noms de colonnes
	table: {
		utilisateur: {
			tablename: "utilisateur",
			id: "id",
			nom: "nom",
			prenom: "prenom",
			email: "email",
			mdp: "mdp",
			role: "role",
		},
		stage: {
			tablename: "stage",
			idstage: "idstage ",
			ideleve: "ideleve",
			niveau: "niveau",
			annee: "annee",
			idtuteur: "idtuteur",
			idens: "idens",
			datedebut: "datedebut",
			datefin: "datefin",
			nomentreprise: "nomentreprise",
			titrestage: "titrestage",
			description: "description",
			adressestage: "adressestage",
			adremailstage: "adremailstage",
			cheminrapport: "cheminrapport",
			daterapport: "daterapport",
			cheminpres: "cheminpres",
			datepres: "datepres",
			chemineval: "chemineval",
			dateeval: "dateeval",
			evallancee: "evallancee",
			confidentiel: "confidentiel",
			datelimiterendu: "datelimiterendu",
			datelimiteeval: "datelimiteeval",
			datesoutenance: "datesoutenance",
			datecomp: "datecomp",
			chemincomp: "chemincomp",
		},
		souscategorie: {
			tablename: "souscategorie",
			id: "idsouscat",
			name: "name",
		},
		retardtuteur: {
			tablename: "retardtuteur",
			id: "iduti ",
			mailenvoye: "mailenvoye",
		},
		retardeleve: {
			tablename: "retardeleve",
			id: "iduti",
			mailenvoye: "mailenvoye",
			rapport: "rapport",
			presentation: "presentation",
			autoeval: "autoeval",
		},
		question: {
			tablename: "questions",
			id: "idquest",
			question: "question",
			cat: "cat",
			souscat: "souscat",
			type: "type",
			is4a: "is4a",
			is5a: "is5a",
			choix: "choix",
			niveau: "niveau",
		},
		niveauxcompetences: {
			tablename: "niveauxcompetences",
			id: "idniveauxcompetences ",
			libelle: "libelle",
			idcompetence: "idcompetence ",
		},
		infoetu: {
			tablename: "infoetu",
			id: "idinfo",
			numetudiant: "numetudiant",
			annee: "annee",
			niveau: "niveau",
		},
		competence: {
			tablename: "competence",
			id: "idcompetence",
			sigle: "sigle",
			libelle: "libelle",
		},
		categorie: {
			tablename: "categorie",
			id: "idcat",
			name: "name",
		},
	},
};

module.exports = config;
