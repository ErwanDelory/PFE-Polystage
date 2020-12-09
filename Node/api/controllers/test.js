const mysql = require("mysql");
const conn = require("../../mysqlConnect");
const fs = require("fs");

//avec Async await
async function example1(req, res, next) {
	try {
		const result = await query("select * from stage");
		res.status(200).json({ message: "Ok .", data: result });
	} catch (err) {
		console.log("une erreur", err);
	}
}

//dl file
function example2(req, res, next) {
	let x = 0;
	if (x === 0) {
		//DL PDF
		var file = fs.createReadStream(
			"public/2020/5A/2020_5A_BECHARI_Bilal_rapport.pdf"
		);
		var stat = fs.statSync(
			"public/2020/5A/2020_5A_BECHARI_Bilal_rapport.pdf"
		);
		res.setHeader("Content-Length", stat.size);
		res.setHeader("Content-Type", "application/pdf");
		res.setHeader(
			"Content-Disposition",
			"attachment; filename=rapport.pdf"
		);
		file.pipe(res);
	} else {
		// AFFICHER PDF
		var data = fs.readFileSync(
			"public/2020/5A/2020_5A_BECHARI_Bilal_rapport.pdf"
		);
		res.contentType("application/pdf");
		res.send(data);
	}
}
exports.example1 = example1;

exports.example2 = example2;
