var AnswerQuestionPage= function() {
    this.get = function() {
        // browser.get('http://localhost:'+process.env.PORT+'/question').then(function() {
        //     AnswerQuestionPage.select();
        // });
        browser.get('http://localhost:'+process.env.PORT+'/question')
           
    },

    this.select = function() {

        pp = protractor.getInstance();
        pp.sleep(1000).then(function () {
            
            var first = element.all(by.css('.question')).first();
            // console.log(first);
            expect(first.isPresent()).toBe(true);
            // console.log('first: ',first);
            element.all(by.tagName('input')).first().then(function(inp) {
                // console.log(inp);
                inp.click();
                pp.sleep(1000).then(function () {
                    expect(first.isPresent()).toBe(false);    
                });
                
                
                
                
            });

                // elem.getAttribute("id").then(function(id) {
                //     console.log("id: ",id);
                //     answer = element(by.id(id));
                //     answer.parent('.question').find('input[type=radio]')[0]
                //     sendButton.click();
            //     // })
            // });
        });

        // console.log("-----------------------cc");
        // element.all(by.css('.question')).reduce(function(acc,elem){
        //     elem.getText().then(function(text) {
        //         console.log(text);
        //     })
        // });

        // element.all(by.css("question")).reduce(function(acc,elem){
        //     console.log("acc: ",acc,"-------elem: ",elem);
        // });
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

