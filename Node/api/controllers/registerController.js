const db = require('../../mysqlConnect');
var sha256 = require('js-sha256');

function register(req, res) {
  if (
    !req.body.lastname ||
    !req.body.firstname ||
    !req.body.email ||
    !req.body.password
  ) {
    return res.status(403).json({
      message: 'Error, argument is missing',
    });
  }

  let query = `
    INSERT INTO eleves (nom, prenom, email, numetudiant, mdp)
    VALUES ("${req.body.lastname}", "${req.body.firstname}", "${
    req.body.email
  }", "", "${sha256(req.body.password)}")`;

  db.query(query, (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(406).json({
          message: 'Address mail already used',
        });
      } else {
        throw err;
      }
    }
    return res.status(200).json({
      message: 'Register Ok.',
    });
  });
}
exports.register = register;