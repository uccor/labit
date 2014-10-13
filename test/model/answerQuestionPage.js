var AnswerQuestionPage= function() {
    this.get = function() {
        browser.get('http://localhost:'+process.env.PORT+'/question');

    },
    this.select = function() {

        pp = protractor.getInstance();
        pp.sleep(10000).then(
            console.log("-----------------------cc", element.all(by.css('.question')))
        );

        element.all(by.css("question")).reduce(function(acc,elem){
            console.log("acc: ",acc,"-------elem: ",elem);
        });
    },

        this.check = function() {
            // ptor = protractor.getInstance();
            //var questions = browser.get('http://localhost:'+process.env.PORT+'/api/question');

            console.log("rta: ",element(by.binding("saveOk")));
            expect(element(by.model("saveOk")).getText()).toEqual("true");
            //question.find()
            //questions.then(function(text){console.log("aca",text)});

        },
        this.save = function() {
            sendButton = element(by.id('send'));
            sendButton.click();
        }
}
module.exports = new AnswerQuestionPage();

