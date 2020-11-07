const config = {
	node: {
		port: 5000,
	},
	mysql: {
		// paramètres de connexion à la base de données
		host: "localhost",
		user: "root",
		password: "root",
		port: 3308,
		database: "polystage",
		charset: "utf8",
	},
	gmail: {
		user: "polystage.alert@gmail.com",
		mdp: "...",
	},
};

module.exports = config;
