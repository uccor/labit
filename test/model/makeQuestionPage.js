var MakeQuestionPage = function() {
    this.get = function() {
        browser.get('http://localhost:'+process.env.PORT+'/make_question');
    },

    this.fill= function(text, answerText) {
        questionText=element(by.id('text'));
        questionText.sendKeys(text);
        //questionAnswer=element('li > input');
        element.all(by.css('input.visible')).reduce(function(acc,elem){
            elem.sendKeys(answerText);

        });


    },
    this.check = function() {
        expect(element(by.model("saveOk")).getText()).toEqual("true");
    },
    this.save = function() {
        sendButton = element(by.id('send'));
        sendButton.click();
    }
}
module.exports = new MakeQuestionPage();

