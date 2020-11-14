'user strict';
var moment = require('moment')

function formatDateForSQL(date) {
    return moment(date).format("YYYY/MM/DD")
}

//Task object constructor
var Stage = function (stage, idtuteur) {
    this.ideleve = stage.idEleve;
    this.niveau = stage.niveau;
    this.annee = stage.annee;
    if (idtuteur != 0) this.idtuteur = idtuteur;
    this.idens = stage.idenseignant;
    this.datedebut = stage.debutstage;
    this.datefin = stage.finstage;
    this.identreprise = stage.identreprise;
    this.titrestage = stage.titrestage;
    this.description = stage.descriptionstage;
    this.adremailstage = stage.emailstage;
    this.adressestage = stage.adresseentreprise;
};

function DateUpdate(stage) {
    stage.datedebut = formatDateForSQL(stage.datedebut);
    stage.datefin = formatDateForSQL(stage.datefin);
    delete stage.mdp
    return stage
}

Stage.getAllStage = function (result) {
    var query = "Select * from stage"
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

Stage.getStageById = function (idstage, result) {
    var query = "Select * from stage left join tuteurs on tuteurs.idtuteur = stage.idtuteur left join entreprise on entreprise.identreprise = stage.identreprise where idstage = ?"
    db.query(query, idstage, function (err, res) {
        for (i in res) {
            res[i] = DateUpdate(res[i])
        }
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
}

Stage.getStageByIdForEval = function (idstage, result) {
    var query = "Select * from stage natural join eleves left join entreprise on entreprise.identreprise = stage.identreprise where idstage = ?"
    db.query(query, idstage, function (err, res) {
        for (i in res) {
            res[i] = DateUpdate(res[i])
        }
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
}

Stage.getStageByEleveId = function (ideleve, result) {
    var query = "Select * from stage natural join entreprise where ideleve = ? order by annee desc"
    db.query(query, ideleve, function (err, res) {
        for (i in res) {
            res[i] = DateUpdate(res[i])
        }
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
}

Stage.getStageByTuteurId = function (idtuteur, result) {
    var query = "Select * from stage natural join entreprise left join eleves on eleves.ideleve = stage.ideleve where idtuteur = ? order by annee desc"
    db.query(query, idtuteur, function (err, res) {
        for (i in res) {
            res[i] = DateUpdate(res[i])
        }
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
}

Stage.getStageByEnsId = function (idens, result) {
    var query = "Select * from stage natural join entreprise left join eleves on eleves.ideleve = stage.ideleve where idens = ? order by annee desc"
    db.query(query, idens, function (err, res) {
        for (i in res) {
            res[i] = DateUpdate(res[i])
        }
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
}

Stage.getCurrentStageByEleveId = function (annee, ideleve, result) {

    var query = "Select * from stage where ideleve = ? and annee = ?"
    db.query(query, [ideleve, annee], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res)
        }
    });
}

Stage.getCurrentStageByTuteurId = function (annee, idtuteur, result) {

    var query = "Select * from stage left join eleves on eleves.ideleve = stage.ideleve where idtuteur = ? and annee = ?"
    db.query(query, [idtuteur, annee], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res)
        }
    });
}

Stage.getCurrentStageByEnsId = function (annee, idens, result) {

    var query = "Select * from stage left join eleves on eleves.ideleve = stage.ideleve where idens = ? and annee = ?"
    db.query(query, [idens, annee], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res)
        }
    });
}

Stage.createStage = function (newStage, result) {
    db.query("Select * from stage where ideleve = ? AND annee = ?",
        [newStage.ideleve, newStage.annee], function (err, stage) {
            if (err) {
                result(err, null);
            }
            if (stage && stage.length) {
                result(null, 409);
            }
            else {
                db.query("INSERT INTO stage set ?", newStage, function (err, res) {
                    if (err) {
                        console.log("error: ", err);
                        result(err, null);
                    }
                    else {
                        result(null, 200);
                    }
                });
            }
        })
};

Stage.updateStage = function (idstage, newStage, result) {
    let query = "SELECT * FROM stage WHERE idstage = ?"
    db.query(query, [idstage], function (err, stage) {
        if (err) {
            result(err, null);
        }
        if (stage && stage.length) {
            db.query("UPDATE stage SET ? WHERE idstage = ?", [newStage, idstage], function (err, res) {
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

module.exports = Stage;
