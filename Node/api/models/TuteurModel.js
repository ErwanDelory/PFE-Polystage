'user strict';

//Task object constructor
var Tuteur = function (tuteur) {
    this.nom = tuteur.nomtuteur;
    this.prenom = tuteur.prenomtuteur;
    this.emailtuteur = tuteur.emailtuteur;
    this.identreprise = tuteur.identreprise;
};

Tuteur.getAllTuteur = function (result) {

    var query = "Select * from tuteurs"
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

Tuteur.getTuteurById = function (idtuteur, result) {
    var query = "Select * from tuteurs where idtuteur = ?"
    db.query(query, idtuteur, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};


Tuteur.createTuteur = function (bodyForm, result) {
    var tuteur = new Tuteur(bodyForm);
    db.query("Select * from tuteurs where emailtuteur = ?",
        [tuteur.emailtuteur], function (err, tuteurExistant) {
            if (err) {
                result(err, null);
            }
            if (tuteurExistant && tuteurExistant.length) {
                db.query("UPDATE tuteurs SET ? where emailtuteur = ?", [tuteur, tuteur.emailtuteur]);
                result(null, tuteurExistant[0].idtuteur);
            }
            else {
                db.query("INSERT INTO tuteurs set ?", tuteur, function (err, res) {
                    if (err) {
                        console.log("error: ", err);
                        result(err, null);
                    }
                    result(null, res.insertId);
                })
            }
        });
};


Tuteur.getTuteurAuth = function (username, mdp, result) {
    let query = "SELECT * FROM tuteurs WHERE emailtuteur = ? AND mdp = ?";
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

Tuteur.updateTuteurAccById = function (email, mdp, result) {
    let query = "UPDATE tuteurs SET mdp = ? WHERE emailtuteur = ?"
    db.query(query, [mdp, email], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
}


module.exports = Tuteur;
