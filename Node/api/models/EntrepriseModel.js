'user strict';

//Task object constructor
var Entreprise = function (entreprise) {
    if (entreprise.nomcomplet) {
        this.nomcomplet = entreprise.nomcomplet.toUpperCase();
        this.sigle = this.nomcomplet.substring(0, 3);
    }
};

Entreprise.getAllEntreprise = function (fields, result) {
    let fields_search = "*"
    if (fields) {
        fields_search = fields
    }
    var query = "Select " + fields_search + " from entreprise order by nomcomplet"
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

Entreprise.createEntreprise = function (bodyForm, result) {
    var new_entreprise = new Entreprise(bodyForm);
    db.query("Select * from entreprise where nomcomplet = ?",
        new_entreprise.nomcomplet, function (err, entreprise) {
            if (err) {
                result(err, null);
            }
            if (entreprise && entreprise.length) {
                result(null, entreprise);
            }
            else {
                db.query("INSERT INTO entreprise set ?", new_entreprise, function (err, res) {
                    if (err) {
                        console.log("error: ", err);
                        result(err, null);
                    }
                    else {
                        result(null, res);
                    }
                });
            }
        })
};

Entreprise.updateEntreprise = function (req, result) {
    let query = "SELECT * FROM entreprise WHERE identreprise = ?"
    db.query(query, req.identreprise, function (err, entrepriseExistante) {
        if (err) {
            result(err, null);
        }
        if (entrepriseExistante && entrepriseExistante.length) {
            var newEntreprise = new Entreprise(entrepriseExistante[0]);
            db.query("UPDATE entreprise SET ? WHERE identreprise = ?", [newEntreprise, req.identreprise], function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else {
                    result(null, 200);
                }
            });
        }
        else {
            result(null, 404);
        }
    })
};

module.exports = Entreprise;
