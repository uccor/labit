	var LoginPage= function() {
    this.get = function() {
       browser.get('http://localhost:1337/index'); 
    }

    this.fill= function(user, pass) {
      e=element(by.id('email'));
      e.sendKeys(user);
      p=element(by.id('pass'));
      p.sendKeys(pass);
      
      
    }
    this.login = function(){
       e=element(by.id('submit'));
       e.click();
    }
  }
module.exports = new LoginPage();