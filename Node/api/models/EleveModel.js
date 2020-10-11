'user strict';

//Task object constructor
var Eleve = function (eleve) {
    this.nom = eleve.nom;
    this.prenom = eleve.prenom;
    this.email = eleve.email;
    this.numetudiant = eleve.numetudiant;
};

Eleve.getAllEleve = function (result) {
    var query = "Select ideleve,nom,prenom,email,numetudiant from eleves"
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

Eleve.getEleveAuth = function (username, mdp, result) {
    let query = "SELECT * FROM eleves WHERE numetudiant = ? AND mdp = ? ";
    let queryEmail = "SELECT * FROM eleves WHERE email = ? AND mdp = ?";
    if (username.includes('@')) query = queryEmail

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

Eleve.getEleveById = function (eleveId, result) {
    let query = "SELECT * FROM eleves,inscription WHERE eleves.ideleve = ? AND eleves.ideleve = inscription.ideleve";
    db.query(query, [eleveId], function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
}

module.exports = Eleve;
