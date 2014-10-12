//var protractor = require('protractor');


var StudentPage= function() {
    this.get = function() {
        browser.get('http://localhost:'+process.env.PORT+'/student');
    }

    this.suscribeToClass= function(classToSelect) {
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
        browser.executeScript("io.socket.put('/api/live_class_student/"+classToShare+"', {pdf_sharing: 'true', pdf_url: '"+file+"' });  ");
    }
    this.mockProfesorAllowNavigation = function(classToShare,allow){
        browser.executeScript("io.socket.put('/api/live_class_student/"+classToShare+"', {pdf_allowNavigation: '"+allow+"' });  ");
    }

    this.mockProfesorChangePage = function(classToShare,page){
        browser.executeScript("io.socket.put('/api/live_class_student/"+classToShare+"', {pdf_studentPageNumber: "+page+"});  ");
    }

    this.getCurrentPage = function () {
        return element(by.id('page_num')).getText();
    }
    this.getTotalPages = function () {
        return element(by.id('page_count')).getText();
    }

}
module.exports = new StudentPage();