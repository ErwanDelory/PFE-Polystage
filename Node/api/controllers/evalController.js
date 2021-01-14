const db = require("../../mysqlConnect");
const PDFDocument = require("pdfkit");
const fs = require("fs");

async function startEval(req, res, next) {
	if (req.body.evallancee) {
		try {
			let q = `UPDATE stage SET evallancee = "${req.body.evallancee}", datelimiteeval = "${req.body.datelimiteeval}"
            WHERE idstage= ${req.body.idstage}`;
			db.query(q, (err, result) => {
				console.log(result);
				res.status(200).json({ message: "Ok ." });
			});
		} catch (err) {
			throw err;
		}
	} else {
		res.status(400).json({ message: "Missing data" });
	}
}

function GenererPdf(req, res, next) {
	// Recup Question
	if (req.params.type != "questions" && req.params.type != "competences") {
		return res.status(404).json({ message: "Invalid Args" });
	}
	let i = 1;
	let q = `SELECT ideleve, niveau, annee, nom, prenom from stage LEFT JOIN utilisateur ON utilisateur.id = stage.ideleve WHERE ideleve = '3'`;
	db.query(q, (err, resu) => {
		let dir = "public/" + resu[0].annee + "/" + resu[0].niveau + "A/";
		let anneedir = "public/" + resu[0].annee + "/";
		let nomFile =
			"./" +
			dir +
			resu[0].annee +
			"_" +
			resu[0].niveau +
			"A_" +
			resu[0].nom +
			"_" +
			resu[0].prenom +
			"_" +
			req.params.type +
			".pdf";

		if (!fs.existsSync(anneedir)) {
			fs.mkdirSync(anneedir);
		}
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir);
		}

		if (req.params.type === "competences") {
			q = `SELECT idcompetence, libelle from competences`;
			db.query(q, (err, result) => {
				// Create PDF Eval

				const doc = new PDFDocument();
				doc.pipe(fs.createWriteStream(nomFile));
				result.forEach((element) => {
					doc.fontSize(12).text(element.libelle);
					doc.fontSize(10).text("    - " + req.body[i] + "\n\n");
					i++;
				});
				doc.end();
				res.status(200).json({ message: "Ok ." });
			});
		} else {
			q = `SELECT idquest, question from questions`;
			db.query(q, (err, result) => {
				// Create PDF Eval
				const doc = new PDFDocument();
				doc.pipe(fs.createWriteStream(nomFile));
				result.forEach((element) => {
					doc.fontSize(12).text(element.question);
					doc.fontSize(10).text("    - " + req.body[i] + "\n\n");
					i++;
				});
				doc.end();
				res.status(200).json({ message: "Ok" });
			});
		}
	});
}

exports.GenererPdf = GenererPdf;
exports.startEval = startEval;
