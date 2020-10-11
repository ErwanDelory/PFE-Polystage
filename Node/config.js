const config = {
	node: {
		port: 5000,
	},
	mysql: {
		// paramètres de connexion à la base de données
		host: "db",
		user: "root",
		password: "root",
		database: "db",
		charset: "utf8",
	},
	gmail: {
		user: "polystage.alert@gmail.com",
		mdp: "...",
	},
};

module.exports = config;
