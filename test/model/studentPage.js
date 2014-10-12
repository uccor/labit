//var protractor = require('protractor');

var StudentPage = function () {
    this.get = function () {
        browser.get('http://localhost:' + process.env.PORT + '/student');
        browser.wait(function () {
            return browser.executeScript(function () {
                return angular.element($('#contentShared')).scope()['avaibleClasses'];
            }).then(function (dat) {
                if (dat != null) {
                    if (typeof dat[0] != 'undefined') {
                        return dat[0]['id'] == 'CLASS1';
                    }
                }
                return false;
            });
        }, 20000);
    }

    this.suscribeToClass = function (classToSelect) {
        element(by.cssContainingText('option', classToSelect)).click();
        element(by.id('subcribeBTN')).click();
    }
    this.nextPdfPage = function () {
        e = element(by.id('pdfNext')).click();
    }
    this.prevPdfPage = function () {
        e = element(by.id('pdfPrev')).click();
    }


    this.mockProfesorShare = function (classToShare, file) {
        tiempo = typeof tiempo !== 'undefined' ? tiempo : 20000;
        browser.executeScript("io.socket.put('/api/live_class_student/" + classToShare + "', {pdf_sharing: 'true', pdf_url: '" + file + "' });  ");

        browser.wait(function () {
            return browser.executeScript(function () {
                return angular.element($('#contentShared')).scope()['actClass'];
            }).then(function (dat) {
                if (dat != null) {
                        return dat['pdf_url'] == file;
                }
                return false;
            });
        }, tiempo);
    }
    this.mockProfesorAllowNavigation = function (classToShare, allow) {
        tiempo = typeof tiempo !== 'undefined' ? tiempo : 20000;
        browser.executeScript("io.socket.put('/api/live_class_student/" + classToShare + "', {pdf_allowNavigation: '" + allow + "' });  ");

        browser.wait(function () {
            return browser.executeScript(function () {
                return angular.element($('#contentShared')).scope()['actClass'];
            }).then(function (dat) {
                if (dat != null) {
                        return dat['pdf_allowNavigation'] == allow;
                }
                return false;
            });
        }, tiempo);
    }

    this.mockProfesorChangePage = function (classToShare, page) {
        tiempo = typeof tiempo !== 'undefined' ? tiempo : 20000;
        browser.executeScript("io.socket.put('/api/live_class_student/" + classToShare + "', {pdf_studentPageNumber: " + page + "});  ");

        browser.wait(function () {
            return browser.executeScript(function () {
                return angular.element($('#contentShared')).scope()['actClass'];
            }).then(function (dat) {
                if (dat != null) {
                        return dat['pdf_studentPageNumber'] == page;
                }
                return false;
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
module.exports = new StudentPage();