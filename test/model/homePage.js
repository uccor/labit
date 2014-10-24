/**
 * Created by martin on 24/10/14.
 */

//var protractor = require('protractor');


var homePage= function() {
    this.get = function() {
        browser.get('http://localhost:'+process.env.PORT);
    }

    this.getTitle= function() {
        return browser.getTitle();
    }
}
module.exports = new homePage();