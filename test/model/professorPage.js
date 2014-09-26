/**
 * Created by guille on 24/09/14.
 */
var ProfessorPage= function() {
    this.get = function() {
        browser.get('http://localhost:1337/professor');
    }

    this.getListItem= function() {
        protractor.By.repeater('pdf in pdfs').column('id')
    }
    this.pdf_box_change = function(){

    }
    this.fill_class= function (){

    }
    this.class_box_change=function(){

    }
}
module.exports = new ProfessorPage();