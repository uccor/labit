
var registerPage = require('./model/registerPage');

describe('register page', function() {
  it('should register new user', function() {
      registerPage.get();
      // Parametros de fill: name, lastName, username, email, pass, pass2
      var rand = Math.floor((Math.random() * 1000) + 1);
      registerPage.fill('2'+rand,'leu3si','2'+rand,'p0'+rand+'o@p.com','12','12');
      //------como se hace esto porque cuando querramos pasar muchos test hay que - 
      //cambiar estos datos siempre??
      registerPage.register();
      registerPage.check();
  });
});