//var protractor = require('protractor');


var RegisterPage= function() {
    this.get = function() {
         browser.get('http://localhost:1337/register'); 
    }

    this.fill= function(user, pass) {
        e=element(by.id('username'));
        e.sendKeys(user);
        p=element(by.id('password'));
        p.sendKeys(pass);
    }
    this.login = function(){
       e=element(by.id('submit'));
       e.click();
    }
    this.check = function (){
         // ptor = protractor.getInstance();
        browser.getTitle().then(function (text) {
            console.log(text)
        });
        expect(browser.getTitle()).toEqual('Main');
    }
}
module.exports = new LoginPage();