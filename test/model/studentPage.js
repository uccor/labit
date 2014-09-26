//var protractor = require('protractor');


var StudentPage= function() {
    this.get = function() {
        browser.get('http://localhost:1337/student');
    }

    this.suscribeToClass= function(classToSelect) {
        //e=element(by.model('id_subscribedClass'));
        element(by.cssContainingText('option', classToSelect)).click();
        element(by.id('subcribeBTN')).click();
    }
    this.nextPdfPage = function () {
        e=element(by.id('pdfNext')).click();
    }
    this.prevPdfPage = function () {
        e=element(by.id('pdfPrev')).click();
    }


    this.mockProfesorShare = function(classToShare,file){
        browser.executeScript("io.socket.put('/api/live_class_student/"+classToShare+"', {pdf_activo: 'true', pdf_ruta: '"+file+"' });  ");
    }
    this.mockProfesorChangePage = function(classToShare,page){
        browser.executeScript("io.socket.put('/api/live_class_student/"+classToShare+"', {pdf_numeroPagina: "+page+"});  ");
    }

    this.getCurrentPage = function () {
        return element(by.id('page_num')).getText();
    }
    this.getTotalPages = function () {
        return element(by.id('page_count')).getText();
    }

}
module.exports = new StudentPage();