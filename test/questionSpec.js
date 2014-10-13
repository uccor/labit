
//var makeQuestionPage = require('./model/makeQuestionPage');
//describe('question page', function() {
//    it('should make new question', function() {
//        makeQuestionPage.get();
//        // Parametros de fill: name, lastName, username, email, pass, pass2
//        makeQuestionPage.fill('Pregunta?','si');
//        makeQuestionPage.save();
//        makeQuestionPage.check();
//    });
//});

var answerQuestionPage = require('./model/answerQuestionPage');
describe('student select an answer in questions', function() {
    it('the questions selected should be remove', function() {
        answerQuestionPage.get();
        answerQuestionPage.select();
    });
});