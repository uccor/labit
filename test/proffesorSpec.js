var ProfessorPage = require('./model/professorPage');

describe('Professor page', function () {
    it('should show available files', function () {
        ProfessorPage.get();
        expect(ProfessorPage.getFirtListItem()).toEqual('PDF1');

    });
    it('should subscribe to a class and share a PDF', function () {
        ProfessorPage.selectPdf('PDF2');
        browser.sleep(1000);
        ProfessorPage.nextPdfPage();

        expect(ProfessorPage.getTotalPages()).toEqual('5');
    });
    it('should change the page with the next and prev buttons', function () {

        ProfessorPage.nextPdfPage();
        expect(ProfessorPage.getCurrentPage()).toEqual('3');
        ProfessorPage.nextPdfPage();
        expect(ProfessorPage.getCurrentPage()).toEqual('4');
        ProfessorPage.prevPdfPage();
        expect(ProfessorPage.getCurrentPage()).toEqual('3');
        ProfessorPage.prevPdfPage();
        expect(ProfessorPage.getCurrentPage()).toEqual('2');
    });
});

