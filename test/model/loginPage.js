//var protractor = require('protractor');


var LoginPage= function() {
    this.get = function() {
        browser.get('http://localhost:'+process.env.PORT+'/login');
    }

    this.fill= function(user, pass) {
        e=element(by.id('username'));
        e.sendKeys(user);
        p=element(by.id('pass'));
        p.sendKeys(pass);
    }
    this.login = function () {
       e=element(by.id('submit'));
       e.click();
    }
    this.check = function () {
         // ptor = protractor.getInstance();
        browser.getTitle().then(function (text) {
            console.log(text)
        });
        expect(browser.getTitle()).toEqual('Main');

    }
    this.close = function () {
        browser.get('http://localhost:'+process.env.PORT+'/logout');
    }
}
module.exports = new LoginPage();