const db = require('../../mysqlConnect');
const PDFDocument = require('pdfkit');
const fs = require('fs');

async function startEval(req, res, next) {
	if (req.body.evallancee) {
		try {
			let q = `UPDATE stage SET evallancee = "${req.body.evallancee}", datelimiteeval = "${req.body.datelimiteeval}"
            WHERE idstage= ${req.body.idstage}`;
			db.query(q, (err, result) => {
				console.log(result);
				return res.status(200).json({ message: 'Ok .' });
			});
		} catch (err) {
			throw err;
		}
	} else {
		return res.status(400).json({ message: 'Missing data' });
	}
}

function GenererPdf(req, res, next) {
	// Recup Question
	if (
		(req.params.type != 'questions' && req.params.type != 'competences') ||
		isNaN(req.body.id)
	) {
		return res.status(404).json({ message: 'Invalid Args' });
	}
	let q = `SELECT role FROM utilisateur WHERE id = ${req.body.id}`;
	db.query(q, (err, resultat) => {
		if (!resultat[0] || resultat[0].role != 'Etudiant') {
			return res.status(404).json({ message: 'Invalid Etudiant Id' });
		}

		let i = 1;
		q = `SELECT ideleve, niveau, annee, nom, prenom from stage LEFT JOIN utilisateur ON utilisateur.id = stage.ideleve WHERE ideleve = ${req.body.id}`;
		db.query(q, (err, resu) => {
			let dir = 'public/' + resu[0].annee + '/' + resu[0].niveau + 'A/';
			let anneedir = 'public/' + resu[0].annee + '/';
			let nomFile =
				'./' +
				dir +
				resu[0].annee +
				'_' +
				resu[0].niveau +
				'A_' +
				resu[0].nom +
				'_' +
				resu[0].prenom +
				'_' +
				req.params.type +
				'.pdf';

			if (!fs.existsSync(anneedir)) {
				fs.mkdirSync(anneedir);
			}
			if (!fs.existsSync(dir)) {
				fs.mkdirSync(dir);
			}

			if (req.params.type === 'competences') {
				q = `SELECT idcompetence, libelle from competences`;
				db.query(q, (err, result) => {
					// Create PDF Competences

					const doc = new PDFDocument();
					doc.pipe(fs.createWriteStream(nomFile));
					doc.image('public/Polytech.png', 0, 0, {
						width: 150,
					});
					doc.fontSize(22).text(resu[0].nom + ' ' + resu[0].prenom, {
						align: 'center',
					});
					doc.fontSize(20).text('Competences ' + resu[0].annee, {
						align: 'center',
					});
					doc.moveDown();
					result.forEach((element) => {
						doc.fontSize(12).text(element.libelle);
						doc.fontSize(10).text(
							'    - ' + req.body.data[i] + '\n\n'
						);
						i++;
					});
					doc.end();
					q = `UPDATE stage SET chemincomp = '${nomFile}' WHERE ideleve = ${req.body.id}`;
					db.query(q, (err, result) => {
						return res.status(200).json({ message: 'Ok' });
					});
				});
			} else {
				q = `SELECT idquest, question from questions`;
				db.query(q, (err, result) => {
					// Create PDF Eval
					const doc = new PDFDocument();
					doc.pipe(fs.createWriteStream(nomFile));
					doc.image('public/Polytech.png', 0, 0, {
						width: 150,
					});
					doc.fontSize(22).text(resu[0].nom + ' ' + resu[0].prenom, {
						align: 'center',
					});
					doc.fontSize(20).text('Questions ' + resu[0].annee, {
						align: 'center',
					});
					doc.moveDown();

					result.forEach((element) => {
						doc.fontSize(12).text(element.question);
						doc.fontSize(10).text(
							'    - ' + req.body.data[i] + '\n\n'
						);
						i++;
					});
					doc.end();
					q = `UPDATE stage SET chemineval = '${nomFile}' WHERE ideleve = ${req.body.id}`;
					db.query(q, (err, result) => {
						return res.status(200).json({ message: 'Ok' });
					});
				});
			}
		});
	});
}

exports.GenererPdf = GenererPdf;
exports.startEval = startEval;
