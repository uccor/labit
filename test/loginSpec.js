
var loginPage = require('./model/loginPage');
describe('login page', function() { 
  it('should login with user test and pass test', function() {
      //var loginPage = LoginPage;
      loginPage.get();
      loginPage.fill('test','test');
      loginPage.login();
      loginPage.check();
      loginPage.close();
  });
});
