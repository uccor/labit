
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
