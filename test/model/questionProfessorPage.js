var QuestionProfessorPage = function() {
    this.get = function() {
        browser.get('http://localhost:'+process.env.PORT+'/question_professor');
    },

    this.clickQuestion = function(text, answerText) {
        
        pp = protractor.getInstance();
        pp.sleep(1000).then(function () {
            var buttonQuestion = element(by.css(".web_button"))
            // .then(function(button) {
            
            buttonQuestion.click();
        });
        

    },
    this.checkSummary = function() {
        pp.sleep(1000).then(function () {
            element.all(by.css('.summary')).then(function(sum) {
                //console.log('sumn:',sum);
                expect(sum[0].isDisplayed()).toBe(true);
            });
            
        });
      
    },
    this.checkAnswers = function() {
        element.all(by.css('.answers')).then(function(ans) {
            expect( ans[0].isDisplayed() ).toBe(true);    
        });
        // console.log('answers: ',answers);
    },
    this.hideQuestion = function () {
        element.all(by.css('.checkButton')).then(function(checkButton) {
            checkButton[0].click();
            var buttonQuestion = element(by.id("ready"))
            // .then(function(button) {
            
            buttonQuestion.click();
            //expect( ans[0].isDisplayed() ).toBe(true);    
        });
    }
}
module.exports = new QuestionProfessorPage();

