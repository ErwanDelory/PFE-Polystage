const config = {
	node: {
		port: 5000,
	},
	mysql: {
		// paramètres de connexion à la base de données
		host: "db", //localhost en local, db en docker
		user: "root",
		password: "root",
		//port: 8889, //enlever en docker
		database: "db",
		charset: "utf8",
	},

	//Liste des tables avec leurs noms de colonnes
	table: {
		utilisateur: {
			nom: "utilisateur",
			id: "id",
			nom: "nom",
			prenom: "prenom",
			email: "email",
			mdp: "mdp",
			role: "role",
		},
		stage: {
			nom: "stage",
			idstage: "idstage ",
			ideleve: "ideleve",
			niveau: "niveau",
			annee: "annee",
			idtuteur: "idtuteur",
			idens: "idens",
			datedebut: "datedebut",
			datefin: "datefin",
			ididentreprise: "identreprise",
			titrestage: "titrestage",
			description: "description",
			adressestage: "adressestage",
			adremailstage: "adremailstage",
			cheminrapport: "cheminrapport",
			daterapport: "daterapport",
			nocheminpresm: "stacheminpresge",
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
			nom: "souscategorie",
			id: "idsouscat",
			name: "nom",
		},
		retardtuteur: {
			nom: "retardtuteur",
			id: "iduti ",
			mailenvoye: "mailenvoye",
		},
		retardeleve: {
			nom: "retardeleve",
			id: "iduti",
			mailenvoye: "mailenvoye",
			rapport: "rapport",
			presentation: "presentation",
			autoeval: "autoeval",
		},
		question: {
			nom: "question",
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
			nom: "niveauxcompetences",
			id: "idniveauxcompetences ",
			libelle: "libelle",
			idcompetence: "idcompetence ",
		},
		infoetu: {
			nom: "infoetu",
			id: "id",
			numetudiant: "numetudiant",
			annee: "annee",
			niveau: "niveau",
		},
		entreprise: {
			nom: "entreprise",
			id: "identreprise",
			sigle: "sigle",
			nomcomplet: "nomcomplet",
		},
		competence: {
			nom: "competence",
			id: "idcompetence",
			sigle: "sigle",
			libelle: "libelle",
		},
		categorie: {
			nom: "categorie",
			id: "idcat",
			name: "name",
		},
	},

	gmail: {
		user: "polystage.alert@gmail.com",
		mdp: "...",
	},
};

module.exports = config;
