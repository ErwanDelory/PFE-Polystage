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
