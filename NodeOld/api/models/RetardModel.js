
var Retard = function (ideleve, idtuteur) {
    this.ideleve = ideleve;
    this.idtuteur = idtuteur;
    this.mailenvoye = 0;
};

Retard.getAllRetard = function (type, result) {
    var query = "Select * from retard" + type + " natural join " + type + "s"
    db.query(query, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            for (i in res) {
                if (res[i].mdp) delete res[i].mdp
            }
            result(null, res);
        }
    });
};

Retard.updateRetardEleve = function (retard) {
    delete retard.idtuteur;
    let query = "SELECT ideleve FROM retardeleve WHERE ideleve = ?";
    db.query(query, [retard.ideleve], function (err, res) {
        if (err) {
            console.log("error: ", err);
        }
        else {
            if (res && res.length) {
                let update = "UPDATE retardeleve SET ? WHERE ideleve = ?";
                db.query(update, [retard, res], function (err, newRetard) {
                    if (err) {
                        console.log("error: ", err);
                    }
                });
            } else {
                let insert = "INSERT INTO retardeleve set ?";
                db.query(insert, retard, function (err, newRetard) {
                    if (err) {
                        console.log("error: ", err);
                    }
                });
            }
        }
    })
}

Retard.updateRetardTuteur = function (retard) {
    delete retard.ideleve;
    let query = "SELECT idtuteur FROM retardtuteur WHERE idtuteur = ?";
    db.query(query, [retard.ideleve], function (err, res) {
        if (err) {
            console.log("error: ", err);
        }
        else {
            if (res && res.length) {
                let update = "UPDATE retardeleve SET ? WHERE ideleve = ?";
                db.query(update, [retard, res], function (err, newRetard) {
                    if (err) {
                        console.log("error: ", err);
                    }
                });
            } else {
                let insert = "INSERT INTO retardeleve set ?";
                db.query(insert, retard, function (err, newRetard) {
                    if (err) {
                        console.log("error: ", err);
                    }
                });
            }
        }
    })
}


Retard.UpdateMailTuteur = function () {
    var query = "UPDATE retardtuteur SET mailenvoye = 1"
    db.query(query, function (err, res) { });
};

Retard.UpdateMailEleve = function () {
    var query = "UPDATE retardeleve SET mailenvoye = 1"
    db.query(query, function (err, res) { });
};
module.exports = Retard;
