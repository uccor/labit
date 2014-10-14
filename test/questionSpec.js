
// var makeQuestionPage = require('./model/makeQuestionPage');
// describe('make question page', function() {
//    it('should make new question', function() {
//        makeQuestionPage.get();
//        // Parametros de fill: name, lastName, username, email, pass, pass2
//        makeQuestionPage.fill('Pregunta?','si');
//        makeQuestionPage.save();
//        makeQuestionPage.check();
//    });
// });

var questionStudentPage = require('./model/questionStudentPage');
describe('student questions page', function() {
    it('the questions selected should be remove', function() {
        questionStudentPage.get();
        questionStudentPage.select();
    });
});

var questionProfessorPage = require('./model/questionProfessorPage');
describe('professor questions page', function() {
    it('should open the page', function() {
        questionProfessorPage.get();
        
    });
    it('should select a question', function() {
    	questionProfessorPage.clickQuestion();
    });
    it('should show summary ', function() {
    	
     	questionProfessorPage.checkSummary();
     	
    });
    it('should show responses', function() {
    	
     	
     	questionProfessorPage.checkAnswers();
    });
    it('should be able to hide a question', function() {
    	
     	questionProfessorPage.hideQuestion();
     	
    });


});