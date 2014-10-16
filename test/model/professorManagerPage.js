var ProfessorManagerPage = function () {
    this.get = function () {
        browser.get('http://localhost:' + process.env.PORT + '/professorManager#/fileShare');
        browser.wait(function () {
            return browser.executeScript(function () {
                return angular.element($('#professorManager')).scope()['live_class_students'];
            }).then(function (dat) {
                if (dat != null) {
                    if (typeof dat[0] != 'undefined') {
                        return dat[0]['id'] == 'CLASS1';
                    }
                }
                return false;
            });
        }, 30000);
    }
    this.get1 = function () {
        browser.get('http://localhost:' + process.env.PORT + '/professorManager#/fileShare');

        browser.wait(function () {
            return browser.executeScript(function () {
                return angular.element($('#professorFileShare')).scope()['pdfs'];
            }).then(function (dat) {
                if (dat != null) {
                    if (typeof dat[0] != 'undefined') {
                        return dat[0]['id'] == 'CLASS1';
                    }
                }
                return false;
            });
        }, 30000);
    }

    this.getPdfElement = function (pdf) {
        var row = 0;
        switch (pdf) {
            case 'PDF1':
                row = 0;
                break;
            case 'PDF2':
                row = 1;
                break;
            case 'PDF3':
                row = 2;
                break;

        }
        return element(By.repeater('pdf in pdfs').row(row).column('id'));
    }
    this.sharePDF = function (pdf) {
        switch (pdf) {
            case 'PDF1':
                row = 0;
                break;
            case 'PDF2':
                row = 1;
                break;
            case 'PDF3':
                row = 2;
                break;

        }
        element(By.repeater('pdf in pdfs').row(row).column('id')).click();
    }
    this.stopSharing = function () {
        element(By.id('stopSharing')).click();
    }

    this.isWarningHidden = function () {
        return element(By.id('warningMsg')).getAttribute('class').then(function (classes) {
            return classes.split(' ').indexOf('hidden') !== -1;
        });
    }


    this.selectClass = function (cla) {
        //e=element(by.model('id_subscribedClass'));
        element(by.cssContainingText('option', cla)).click();
    }

    this.getClass = function (cla) {
        //e=element(by.model('id_subscribedClass'));
        return element(by.cssContainingText('option', cla)).getText();
    }

    this.selectPdf = function (id) {
        return element(By.id('img_' + id)).click();
    }

    this.waitForRemote = function (index, value) {
        browser.wait(function () {
            return browser.executeScript(function () {
                return angular.element($('#professorManager')).scope()['live_class_students'];
            }).then(function (dat) {
                if (dat != null) {
                    if (typeof dat[0] != 'undefined') {
                        return dat[0][index] == value;
                    }
                }
                return false;
            });
        }, 30000);
    }

    this.getSailsClassData = function (que) {
        //TODO: Ver si es la mejor forma ver si sails-bind respondio.
        return browser.executeScript(function () {
            return angular.element($('#professorManager')).scope()['live_class_students'];
        }).then(function (cla) {
            return cla[0][que];
        });
    }

    this.setSynchronize = function (value) {
        c = element(by.model('synchronize'));
        c.getAttribute('checked').then(function (att) {
            if (att && !value) {
                c.click();
            } else if (!att && value) {
                c.click();
            }

        });
    }

    this.setNavigation = function (value) {
        c = element(by.model('allowNavigation'));
        c.getAttribute('checked').then(function (att) {
            if (att && !value) {
                c.click();
            } else if (!att && value) {
                c.click();
            }

        });
    }

    this.getCurrentPage = function () {
        return element(by.id('page_num')).getText();
    }

    this.getTotalPages = function () {
        return element(by.id('page_count')).getText();
    }

    this.nextPdfPage = function () {
        e = element(by.id('pdfNext')).click();
    }

    this.prevPdfPage = function () {
        e = element(by.id('pdfPrev')).click();
    }

}

module.exports = new ProfessorManagerPage();