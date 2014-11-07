/**
 * Created by martin on 24/10/14.
 */
var homePage = function () {
    this.get = function () {
        browser.get('http://localhost:' + process.env.PORT);
    }

    this.getTitle = function () {
        return browser.getTitle();
    }
    this.logout = function(){
      element(by.id('logout')).click();
    }
}
module.exports = new homePage();
