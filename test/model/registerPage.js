//var protractor = require('protractor');


var RegisterPage= function() {
    this.get = function() {
         browser.get('http://localhost:1337/register'); 
    }

    this.fill= function(name, lastName, username, email, pass, pass2) {
        n=element(by.id('name'));
        n.sendKeys(name);
        ln=element(by.id('lastName'));
        ln.sendKeys(lastName);
        un=element(by.id('username'));
        un.sendKeys(username);
        em=element(by.id('email'));
        em.sendKeys(email);
        p=element(by.id('pass'));
        p.sendKeys(pass);
        p2=element(by.id('pass2'));
        p2.sendKeys(pass2);
    }
    this.register = function(){
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
module.exports = new RegisterPage();