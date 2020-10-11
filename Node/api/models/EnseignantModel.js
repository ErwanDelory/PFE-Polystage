'user strict';

//Task object constructor
var Enseignant = function (enseignant) {
    this.nom = enseignant.nom;
    this.prenom = enseignant.prenom;
    this.emailens = enseignant.email;
};

Enseignant.getAllEnseignant = function (result) {

    var query = "Select * from enseignants"
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

Enseignant.getEnsAuth = function (username, mdp, result) {
    let query = "SELECT * FROM enseignants WHERE emailens = ? AND mdpens = ?";

    db.query(query, [username, mdp], function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};

Enseignant.getEnseignantById = function (enseignantId, result) {
    db.query("Select * from enseignants where idens = ? ", enseignantId, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);

        }
    });
};

Enseignant.createEnseignant = function (newEnseignant, result) {
    db.query("INSERT INTO enseignants set ?", newEnseignant, function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res.insertId);
        }
    });
};

module.exports = Enseignant;
