var MakeQuestionPage = function() {
    this.get = function() {
        browser.get('http://localhost:1337/professorManager#/makeQuestion');
    },

    this.fill= function(text, answerTexts) {
        questionText=element(by.id('text'));
        questionText.sendKeys(text);
        //questionAnswer=element('li > input');
        ans = element.all(by.css(".answer"));
        console.log("ans",ans);
        ans.each(function(element,ind) {
            element.sendKeys(answerTexts[ind]);
        });


    },
    this.check = function() {
        browser.debugger();
        expect(element(by.model("saveOk")).getText()).toEqual("true");
    },
    this.save = function() {
        sendButton = element(by.id('send'));
        sendButton.click();
    }
}
module.exports = new MakeQuestionPage();

