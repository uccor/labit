/**
 * Created by Fabricio on 15/10/2014.
 */

var ProfessorUploadPage = function () {

    this.get = function () {
        browser.get('http://localhost:' + process.env.PORT + '/professorManager#/fileUpload');
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

    this.setFileName = function (nombre_local){
        element(by.model('newName_file_toUpload')).sendKeys(nombre_local);
    }

    this.selectFile = function (){
        //element(by.id('select_newFile_button')).click();
    }

    this.submitPDF = function (){

        var unhideFileInputs = function () {
            var makeInputVisible = function () {
                $('input[type="file"]').removeClass('hidden-uploader');
            };
            var ptor = protractor.getInstance();
            ptor.driver.executeScript(makeInputVisible);
        }

        unhideFileInputs();
        var path = require('path');
        var fileToUpload = '/File_Testing_Uploads/PDFtest.pdf';
        var absolutePath = path.resolve(__dirname, fileToUpload);
        $('input[type="file"]').sendKeys(absolutePath);

       // browser.debugger();
        element(by.id('submit_newFile_button')).click();
        browser.debugger();

    }

    this.getFileName = function (){
        return element(by.model(nombre_local).getAttribute('value'));
    }

    this.getUploadedPdfName = function (){
        return  element.all(by.repeater("pdf in pdfs")).last().getText();

    }
}

module.exports = new ProfessorUploadPage();