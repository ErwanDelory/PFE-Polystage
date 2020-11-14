module.exports = {
  auth: (req, res) => {
    var username = req.query.username;
    var password = req.query.password;

    let query = "SELECT * FROM eleves WHERE numetudiant = ? AND mdp = ?";
    let queryEmail = "SELECT * FROM eleves WHERE email = ? AND mdp = ?";
    if (username.includes('@')) {
      query = queryEmail
    }

    db.query(query, [username, password], (err, result) => {
      if (err) {
        res.status(500).send(err);
      }
      if (result && result.length) {
        result[0].role = "eleve";
        res.status(200).send(result);
      } else {
        let queryProf = "SELECT * FROM enseignants WHERE email = ? AND mdp = ?";
        db.query(queryProf, [username, password], (err, result) => {
          if (err) {
            res.status(500).send(err);
          }
          if (result && result.length) {
            result[0].role = "enseignant";
            res.status(200).send(result);
          } else {
            res.status(401).send("Authentification Failed");
          }
        })
      }
    });
  },
};