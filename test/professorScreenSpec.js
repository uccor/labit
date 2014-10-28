/**
 * Created by guille on 27/10/14.
 */
var professorScreenPage = require('./model/professorScreenPage');

describe('Professor Screen Page', function () {
    it('should have 4 pages in the pdf1.pdf being shared at CLASS 1', function () {
        professorScreenPage.get();
        professorScreenPage.mockProfesorShare('CLASS1', '/pdf/pdf1.pdf');
        browser.wait(function () {
            return  professorScreenPage.getTotalPages().then(function (txt) {
                return (txt == '4');
            });
        }, 30000);
        expect(professorScreenPage.getTotalPages().getText()).toEqual('4');
    });

    it('shoud change the page when the professor change the page', function () {
        professorScreenPage.mockProfesorChangePage('CLASS1', 1);
        expect(element(by.id('page_num')).getText()).toEqual('1');
        professorScreenPage.mockProfesorChangePage('CLASS1', 3);
        expect(element(by.id('page_num')).getText()).toEqual('3');
        professorScreenPage.mockProfesorChangePage('CLASS1', 2);
        expect(element(by.id('page_num')).getText()).toEqual('2');
    });

    it('should change the pdf when professor change the pdf', function () {

        professorScreenPage.mockProfesorShare('CLASS1', '/pdf/pdf3.pdf');

        browser.wait(function () {
            return  professorScreenPage.getTotalPages().then(function (txt) {
                return (txt == '3');
            });
        }, 30000);
        expect(professorScreenPage.getTotalPages()).toEqual('3');
    });
});