//var protractor = require('protractor');

var RegisterPage= function() {
    var pageRegisterTitle = '';
    this.get = function() {
         browser.get('http://localhost:'+process.env.PORT+'/register');
         browser.getTitle().then(function (text) {
            pageRegisterTitle = text;
        });
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
        pp = protractor.getInstance();
        pp.sleep(1000).then(function () {
            var pageHomeTitle = '';
            pp.getCurrentUrl().then(function (text) {
                
                // console.log('home2: ',text);
                // console.log('register: ',pageRegisterTitle);
                pageHomeTitle = text;
                // expect(element('legend').text()).not().toBe("LOGIN_CONNECT");
                expect(pageRegisterTitle.not().toBe(pageHomeTitle);
            });
        });
        
    }
}
module.exports = new RegisterPage();