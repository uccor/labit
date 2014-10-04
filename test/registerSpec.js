
var registerPage = require('./model/registerPage');
describe('register page', function() { 
  it('should register new user', function() {
      registerPage.get();
      // Parametros de fill: name, lastName, username, email, pass, pass2
      registerPage.fill('lucia44no','leu3si','per2e3uis','pu590o@p.com','12','12');
      //------como se hace esto porque cuando querramos pasar muchos test hay que - 
      //cambiar estos datos siempre??
      registerPage.register();
      registerPage.check();
  });
});
