//var protractor = require('protractor');


var LoginPage= function() {
    this.get = function() {
        browser.get('http://localhost:'+process.env.PORT+'/login');
    }

    this.fill= function(user, pass) {
        e=element(by.id('login-username'));
        e.sendKeys(user);
        p=element(by.id('login-pass'));
        p.sendKeys(pass);
    }
    this.login = function () {
       e=element(by.id('login-submit'));
       e.click();
    }
    this.check = function () {
         // ptor = protractor.getInstance();
        browser.getTitle().then(function (text) {
            // console.log(text)
        });
        expect(browser.getTitle()).toEqual('Labit');

    }
    this.close = function () {
        browser.get('http://localhost:'+process.env.PORT+'/logout');
    }
}
module.exports = new LoginPage();