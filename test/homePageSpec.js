/**
 * Created by SeminarioII on 24/10/14.
 */


var homePage = require('./model/homePage');
var registerPage = require('./model/registerPage');
var loginPage = require('./model/loginPage');


describe('home page', function () {

    var rand;

    it('should exist', function () {
        homePage.get();
        expect(homePage.getTitle()).toEqual('Bienvenido a Labit');
    });


  it('should allow to register a new student', function () {
    homePage.get();

    // Parametros de fill: name, lastName, username, email, pass, pass2
    //------como se hace esto porque cuando querramos pasar muchos test hay que -
    //cambiar estos datos siempre??
    registerPage.fill('test', 'student', 'tstudent', 'student@p.com', '12', '12',false);
    registerPage.register();
    loginPage.waitForTitleChange('Labit - Estudiante');
    expect(homePage.getTitle()).toEqual('Labit - Estudiante');
  });

  it('should allow to register a new professor', function () {
    homePage.logout();
    homePage.get();

    registerPage.fill('test', 'professor', 'tprofessor', 'professor@p.com', '12', '12',true);
    registerPage.register();
    loginPage.waitForTitleChange('Labit - Professor');
    expect(homePage.getTitle()).toEqual('Labit - Professor');

  });

    it('should  allow me to login', function () {
      homePage.logout();
        homePage.get();
        //var loginPage = LoginPage;
        loginPage.fill('tstudent', '12');
        loginPage.login();

       loginPage.waitForTitleChange('Labit - Estudiante');
        expect(homePage.getTitle()).toEqual('Labit - Estudiante');
    });
});
