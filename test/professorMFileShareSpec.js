var ProfessorManagerPage = require('./model/professorManagerPage');

describe('Professor page', function () {
    it('should show available classes', function () {
        ProfessorManagerPage.get();
        expect(ProfessorManagerPage.getClass('CLASS1')).toEqual('CLASS1');

    });
    it('should show available files', function () {
        expect(ProfessorManagerPage.getPdfElement(0).getText()).toEqual('PDF1');

    });
    it('should not allow to subscribe if there is no class selected', function () {
        ProfessorManagerPage.sharePDF('PDF2');
        expect(ProfessorManagerPage.isWarningHidden()).toEqual(false);
    });
    it('should subscribe to a class and share a PDF', function () {
        ProfessorManagerPage.selectClass('CLASS1')
        ProfessorManagerPage.sharePDF('PDF2');
        browser.wait(function () {
            return  ProfessorManagerPage.getTotalPages().then(function (txt) {
                return (txt == '6');
            });
        }, 20000);

        expect(ProfessorManagerPage.getTotalPages()).toEqual('6');

        ProfessorManagerPage.getSailsClassData().then(function (cla) {
            expect(cla[0].id).toEqual('CLASS1');
            expect(cla[0].pdf_url).toEqual('/pdf/pdf2.pdf');
            expect(cla[0].pdf_sharing).toEqual(true);
        });
    });
    it('should advance the page with the next button and synchronize screen and students', function () {

        ProfessorManagerPage.nextPdfPage();
        expect(ProfessorManagerPage.getCurrentPage()).toEqual('2');
        ProfessorManagerPage.getSailsClassData().then(function (cla) {
            expect(cla[0].pdf_studentPageNumber).toEqual(2);
            expect(cla[0].pdf_screenPageNumber).toEqual(2);
        });

        ProfessorManagerPage.nextPdfPage();
        expect(ProfessorManagerPage.getCurrentPage()).toEqual('3');
        ProfessorManagerPage.getSailsClassData().then(function (cla) {
            expect(cla[0].pdf_studentPageNumber).toEqual(3);
            expect(cla[0].pdf_screenPageNumber).toEqual(3);
        });
    });
    it('should go back the page with the previous button and synchronize screen and students', function () {

        ProfessorManagerPage.prevPdfPage();
        expect(ProfessorManagerPage.getCurrentPage()).toEqual('2');
        ProfessorManagerPage.getSailsClassData().then(function (cla) {
            expect(cla[0].pdf_studentPageNumber).toEqual(2);
            expect(cla[0].pdf_screenPageNumber).toEqual(2);
        });

        ProfessorManagerPage.prevPdfPage();
        expect(ProfessorManagerPage.getCurrentPage()).toEqual('1');
        ProfessorManagerPage.getSailsClassData().then(function (cla) {
            expect(cla[0].pdf_studentPageNumber).toEqual(1);
            expect(cla[0].pdf_screenPageNumber).toEqual(1);
        });
    });
    it('should desynchronize the student when synchronize not checked', function () {

        ProfessorManagerPage.setSynchronize(false);
        ProfessorManagerPage.nextPdfPage();
        expect(ProfessorManagerPage.getCurrentPage()).toEqual('2');
        ProfessorManagerPage.getSailsClassData().then(function (cla) {
            expect(cla[0].pdf_studentPageNumber).toEqual(1);
            expect(cla[0].pdf_screenPageNumber).toEqual(2);
        });

        ProfessorManagerPage.nextPdfPage();
        expect(ProfessorManagerPage.getCurrentPage()).toEqual('3');
        ProfessorManagerPage.getSailsClassData().then(function (cla) {
            expect(cla[0].pdf_studentPageNumber).toEqual(1);
            expect(cla[0].pdf_screenPageNumber).toEqual(3);
        });

        ProfessorManagerPage.prevPdfPage();
        expect(ProfessorManagerPage.getCurrentPage()).toEqual('2');
        ProfessorManagerPage.getSailsClassData().then(function (cla) {
            expect(cla[0].pdf_studentPageNumber).toEqual(1);
            expect(cla[0].pdf_screenPageNumber).toEqual(2);
        });

        ProfessorManagerPage.prevPdfPage();
        expect(ProfessorManagerPage.getCurrentPage()).toEqual('1');
        ProfessorManagerPage.getSailsClassData().then(function (cla) {
            expect(cla[0].pdf_studentPageNumber).toEqual(1);
            expect(cla[0].pdf_screenPageNumber).toEqual(1);
        });
    });
    it('should disable student navigation when unchecked.', function () {
        ProfessorManagerPage.setNavigation(false);

        ProfessorManagerPage.getSailsClassData().then(function (cla) {
            expect(cla[0].pdf_allowNavigation).toEqual(false);
        });
    });
    it('should stop sharing when "dejar de compartir" is clicked', function () {
        ProfessorManagerPage.stopSharing();

        ProfessorManagerPage.getSailsClassData().then(function (cla) {
            expect(cla[0].pdf_sharing).toEqual(false);
        });
    });
});

