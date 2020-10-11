'user strict';

//Task object constructor
var Question = function (question) {
  this.question = question.question;
  this.cat = question.cat;
  this.souscat = question.souscat;
  this.type = question.type;
  this.is4a = question.is4a;
  this.is5a = question.is5a;
};

Question.list_QuestionsByCat = function (cat, result) {
  let query = "SELECT * FROM questions WHERE cat = ?";

  db.query(query, [cat], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    }
    else {
      result(null, res);
    }
  });
}


module.exports = Question;
