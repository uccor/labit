/**
 * Created by Fabricio on 15/10/2014.
 */
var ProfessorUploadPage = require('./model/professorUploadPage');
var ProfessorFileSharePage = require('./model/professorManagerPage');

describe('Professor Upload PDF', function () {

    it('should set a file name, select a file and upload a PDF', function () {
        ProfessorUploadPage.get();
        ProfessorUploadPage.setFileName('NuevoPDF');

        ProfessorUploadPage.selectFile();
        ProfessorUploadPage.submitPDF();

        ProfessorFileSharePage.get();

        expect(ProfessorUploadPage.getFileName()).toEqual('NuevoPDF');
        //expect(ProfessorUploadPage.getUploadedPdfName()).toContain('NuevoPDF');
    })

});