var studentPage = require('./model/studentPage');

describe('Student page', function () {
    it('should subscribe to a class and have 3 pages in the pdf1.pdf being shared.', function () {
        studentPage.get();
        studentPage.suscribeToClass('CLASS2');
        studentPage.mockProfesorShare('CLASS2', '/pdf/pdf1.pdf');
        browser.wait(function () {
            return  studentPage.getTotalPages().then(function (txt) {
                return (txt == '4');
            });
        }, 20000);

        expect(studentPage.getTotalPages().getText()).toEqual('4');
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

        studentPage.nextPdfPage();
        browser.wait(function () {
            return  studentPage.getTotalPages().then(function (txt) {
                return (txt == '3');
            });
        }, 20000);
        expect(studentPage.getTotalPages()).toEqual('3');
    });

    it('should change the page with the next and prev buttons when allowed', function () {
        studentPage.mockProfesorAllowNavigation('CLASS2', true);
        studentPage.mockProfesorChangePage('CLASS2',1);
        expect(studentPage.getCurrentPage()).toEqual('1');
        studentPage.nextPdfPage();
        expect(studentPage.getCurrentPage()).toEqual('2');
        studentPage.nextPdfPage();
        expect(studentPage.getCurrentPage()).toEqual('3');
        studentPage.prevPdfPage();
        expect(studentPage.getCurrentPage()).toEqual('2');
        studentPage.prevPdfPage();
        expect(studentPage.getCurrentPage()).toEqual('1');
    });

    it('should not change the page when not allowed', function () {

        studentPage.mockProfesorAllowNavigation('CLASS2', false);
        studentPage.nextPdfPage();
        expect(studentPage.getCurrentPage()).toEqual('1');
        studentPage.nextPdfPage();
        expect(studentPage.getCurrentPage()).toEqual('1');
        studentPage.prevPdfPage();
        expect(studentPage.getCurrentPage()).toEqual('1');
        studentPage.prevPdfPage();
        expect(studentPage.getCurrentPage()).toEqual('1');
    });
});

