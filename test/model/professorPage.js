/**
 * Created by guille on 24/09/14.
 */
var ProfessorPage = function () {
    this.get = function () {
        browser.get('http://localhost:1337/professor');
    }

    this.getFirtListItem = function () {
        return element(By.repeater('pdf in pdfs').row(0).column('id')).getText();
    }

    this.selectClass = function (classToSelect) {
        //e=element(by.model('id_subscribedClass'));
        element(by.cssContainingText('option', classToSelect)).click();
    }
    this.selectPdf = function (id) {
        return element(By.id('img_' + id)).click();
    }
    this.getSailsPDFdata = function () {
        //TODO: Ver como saber si se compartio o no.
        //browser.executeScript("io.socket.put('/api/live_class_student/" + classToShare + "', {pdf_activo: 'true', pdf_ruta: '" + file + "' });  ");
    }
    this.class_box_change = function () {

    }
    this.getCurrentPage = function () {
        return element(by.id('page_num')).getText();
    }
    this.getTotalPages = function () {
        return element(by.id('page_count')).getText();
    }
    this.nextPdfPage = function () {
        e=element(by.id('pdfNext')).click();
    }
    this.prevPdfPage = function () {
        e=element(by.id('pdfPrev')).click();
    }

}
module.exports = new ProfessorPage();