'user strict';

//Task object constructor
var Competences = function (competence) {
    this.idcompetence = competence.idcompetence;
    this.sigle = competence.sigle;
    this.libelle = competence.libelle;
};

Competences.getAllCompetences = function (result) {
    var query = "Select * from competences"
    db.query(query, function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};

Competences.getAllNiveauxByIdComp = function (idcompetence, result) {
    var query = "Select * from niveauxcompetences WHERE idcompetence = ?"
    db.query(query, idcompetence, function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
}

module.exports = Competences;