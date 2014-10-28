//var protractor = require('protractor');

var professorScreenPage = function () {
    this.get = function () {
        browser.get('http://localhost:' + process.env.PORT + '/professorScreen#/CLASS1');
        //ante cambios en el modelo, cambiar CLASS1 por la clase de prueba
    }
    this.mockProfesorShare = function (classToShare, file) {
        tiempo = typeof tiempo !== 'undefined' ? tiempo : 30000;
        browser.executeScript("io.socket.put('/api/live_class_student/" + classToShare + "', {pdf_sharing: 'true', pdf_url: '" + file + "' });  ");
        browser.wait(function () {
            return browser.executeScript(function () {
                return angular.element($('#professorScreen')).scope()['actClass'];
            }).then(function (dat) {
                if (dat != null) {
                    return dat['pdf_url'] == file;
                }
                return false;
            });
        }, tiempo);
    }

    this.mockProfesorChangePage = function (classToShare, page) {
        tiempo = typeof tiempo !== 'undefined' ? tiempo : 10000;
        browser.executeScript("io.socket.put('/api/live_class_student/" + classToShare + "', {pdf_screenPageNumber: " + page + "});  ");
        browser.executeScript("io.socket.put('/api/live_class_student/" + classToShare + "', {pdf_screenPageNumber: " + page + "});  ");
        browser.wait(function () {
            return element(by.id('page_num')).getText().then(function (txt){
                return txt == page;
            });
        }, tiempo);
    }

    this.getCurrentPage = function () {
        return element(by.id('page_num')).getText();
    }
    this.getTotalPages = function () {
        return element(by.id('page_count')).getText();
    }
}
module.exports = new professorScreenPage();