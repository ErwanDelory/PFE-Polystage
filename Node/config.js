
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
		table: {
			Users: "eleves",
		},
	},
	gmail: {
		user: "polystage.alert@gmail.com",
		mdp: "...",
	},
	secret: "",
};

module.exports = config;