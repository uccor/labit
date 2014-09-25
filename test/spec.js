
var loginPage = require('./model/loginPage');
describe('login page', function() { 
  it('should login', function() {
      //var loginPage = LoginPage;
      loginPage.get();
      loginPage.fill('pepe','12');
      loginPage.login();
      loginPage.check();
      loginPage.close();
  });
});

var registerPage = require('./model/registerPage');
describe('register page', function() { 
  it('should register new user', function() {
      registerPage.get();
      // Parametros de fill: name, lastName, username, email, pass, pass2
      registerPage.fill('luciano','leusi','pere3uis','pu90o@p.com','por','por');
      //------como se hace esto porque cuando querramos pasar muchos test hay que - 
      //cambiar estos datos siempre??
      registerPage.register();
      registerPage.check();
  });
});




// describe('liverabbit homepage', function() { 
//   it('should have a title', function() {
//   	browser.get('http://localhost:1337');
//     expect(browser.getTitle()).toEqual('New Sails App');
   
//   });
//   it('should have a alert', function() {
//   	browser.get('http://localhost:1337');
// 	var b=element(by.id('bb')).click();
// 	// element(by.id('password')).sendKeys('secreta');
// 	// element(by.id('loginButton')).click();
// 	var mess = element(by.id('cc'));
// 	// console.log(mess);
// 	// name=mess.getText();
// 	var a=element(by.id('cc'))
	
// 	element(by.id('cc')).sendKeys('secreta'+ a.getText());
// 	// mess.sendKeys(name);
// 	//console.log(mess.getText().getText);
// 	// expect(element(by.id('cc')).getText() == "pepe").toBe(true);
// 	//expect(element(by.id('cc')).getText()).toEqual('pepe');
// 	//expect(element(by.id('cc')).getText()).toEqual("pepe");
// 	// expect(loginMessage.getText()).toEqual('Login Correcto');
//     expect(browser.getTitle()).toEqual('New Sails App');
   
//   });
// });


