const multer = require("multer");
const fs = require("fs");

const fileUpload = multer({
	limits: 5000000,
	storage: multer.diskStorage({
		destination: (req, file, cb) => {
			let dir =
				"public/" + req.params.annee + "/" + req.params.niveau + "A/";
			let anneedir = "public/" + req.params.annee + "/";

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

try {
	const formData = new FormData();
	formData.append("file", file);
	fetch("http://localhost:5000/api/:nom/:prenom/:annee/:niveau/:type", {
		method: "POST",
		body: formData,
	});
} catch (err) {}
