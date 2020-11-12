const config = {
	node: {
		port: 5000,
	},
	mysql: {
		// paramètres de connexion à la base de données
		host: "localhost",
		user: "root",
		password: "root",
		port: 8889,
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
};

module.exports = config;
