/**
 * Created by SeminarioII on 24/10/14.
 */


var homePage = require('./model/homePage');
var registerPage = require('./model/registerPage');
var loginPage = require('./model/loginPage');
function waitForTitleChange() {
    browser.wait(function () {
        return homePage.getTitle().then(function (titulo) {
            if (titulo != 'Labit Student') {
                return false;
            } else {
                return true;
            }
        });
    }, 30000);
}
describe('home page', function () {

    var rand;

    it('should exist', function () {
        homePage.get();
        expect(homePage.getTitle()).toEqual('Labit Homepage');
    });


    it('should allow to register a new user', function () {
        homePage.get();

        rand = Math.floor((Math.random() * 1000) + 1);
        registerPage.fill('2' + rand, 'leu3si', '2' + rand, 'p0' + rand + 'o@p.com', '12', '12');
        registerPage.register();
        waitForTitleChange();
        expect(homePage.getTitle()).toEqual('Labit Student');

        // Parametros de fill: name, lastName, username, email, pass, pass2
        //------como se hace esto porque cuando querramos pasar muchos test hay que -
        //cambiar estos datos siempre??
    });

    it('should  allow me to login', function() {
        homePage.get();
        //var loginPage = LoginPage;
        loginPage.fill('2' + rand, '12');
        loginPage.login();

        waitForTitleChange();
        expect(homePage.getTitle()).toEqual('Labit Student');
    });
});
