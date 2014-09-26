var ProfessorPage = require('./model/studentPage');

describe('Professor page', function () {
    it('should show available files', function () {
        ProfessorPage.get();
        studentPage.suscribeToClass('CLASS2');
        studentPage.mockProfesorShare('CLASS2', '/pdf/pdf1.pdf');

        //TODO: Eliminar este sleep, deberia esperar al cambio con un timeout o algo mas eficiente.
        browser.sleep(1000);
        studentPage.nextPdfPage();

        expect(element(by.id('page_count')).getText()).toEqual('3');
    });

    it('shoud change the page when the professor change the page', function (){
        studentPage.mockProfesorChangePage('CLASS2',1);
        expect(element(by.id('page_num')).getText()).toEqual('1');
        studentPage.mockProfesorChangePage('CLASS2',3);
        expect(element(by.id('page_num')).getText()).toEqual('3');
        studentPage.mockProfesorChangePage('CLASS2',2);
        expect(element(by.id('page_num')).getText()).toEqual('2');
    });

    it('should change the pdf when professor change the pdf', function () {

        studentPage.mockProfesorShare('CLASS2', '/pdf/pdf3.pdf');
        //TODO: Eliminar este sleep, deberia esperar al cambio con un timeout o algo mas eficiente.
        browser.sleep(1000);
        studentPage.nextPdfPage();

        expect(studentPage.getTotalPages()).toEqual('16');
    });

    it('should change the page with the next and prev buttons', function () {

        studentPage.nextPdfPage();
        expect(studentPage.getCurrentPage()).toEqual('3');
        studentPage.nextPdfPage();
        expect(studentPage.getCurrentPage()).toEqual('4');
        studentPage.prevPdfPage();
        expect(studentPage.getCurrentPage()).toEqual('3');
        studentPage.prevPdfPage();
        expect(studentPage.getCurrentPage()).toEqual('2');
    });
});

