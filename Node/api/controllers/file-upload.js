const multer = require("multer");
const fs = require("fs");
const { whoAmI } = require("./userController");
const db = require("../../mysqlConnect");

const fileUpload = multer({
	limits: 5000000,
	storage: multer.diskStorage({
		destination: (req, file, cb) => {
			let id = whoAmI(req);
			let dir =
				"public/" + req.params.annee + "/" + req.params.niveau + "A/";
			let anneedir = "public/" + req.params.annee + "/";
			let nomFile = "./" + dir + req.params.annee + "_" + req.params.niveau + "A_" + req.params.nom + "_" + req.params.prenom + "_" + req.params.type + ".pdf"

			if(req.params.type === "rapport"){
				q = `UPDATE stage SET cheminrapport = '${nomFile}' WHERE ideleve = ${id}`
			}else{
				q = `UPDATE stage SET cheminpres = '${nomFile}' WHERE ideleve = ${id}`
			}

			db.query(q, (err, result) => {
				if (err) throw err;
			});

			if (!fs.existsSync(anneedir)) {
				fs.mkdirSync(anneedir);
			}
			if (!fs.existsSync(dir)) {
				fs.mkdirSync(dir);
			}
			cb(
				null,
				"public/" + req.params.annee + "/" + req.params.niveau + "A/"
			);
		},
		filename: (req, file, cb) => {
			cb(
				null,
				req.params.annee +
					"_" +
					req.params.niveau +
					"A_" +
					req.params.nom +
					"_" +
					req.params.prenom +
					"_" +
					req.params.type +
					".pdf"
			);
		},
	}),
	fileFilter: (req, file, cb) => {
		const isValid = file.mimetype === "application/pdf";
		let error = isValid ? null : new Error("Invalid mine type");
		cb(error, isValid);
	},
});
module.exports = fileUpload;

