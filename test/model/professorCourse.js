var ProfessorCoursePage = function () {
  this.get = function () {
    browser.get('http://localhost:' + process.env.PORT + '/professorCourse');
  }
  this.addNewCourse = function () {
    element(By.id('createClass')).click();
  }
  this.newCourseName = function (name) {
    element(By.model('$data')).sendKeys(name);
  }

  this.getCourseName = function (row) {
    return element.all(By.repeater('c in courses')).get(row).element(by.css(".courseName")).click();
  }
  this.getCourseName = function (row) {
    return element.all(By.repeater('c in courses')).get(row).element(by.css(".courseName")).getText();
  }
  this.editOK = function (row) {
    element.all(By.repeater('c in courses')).get(row).element(by.css(".fa-check")).click();
  }
  this.editCancel = function () {
    element.all(By.repeater('c in courses')).get(row).element(by.css(".pointer-danger")).click();
  }
  this.edit = function (row) {
    element.all(By.repeater('c in courses')).get(row).element(by.css(".fa-edit")).click();
  }
  this.delete = function (row) {
    element.all(By.repeater('c in courses')).get(row).element(by.css(".fa-trash")).click();
  }
  this.comenzar = function (row) {
    element.all(By.repeater('c in courses')).get(row).element(by.css(".fa-play")).click();
  }
}

module.exports = new ProfessorCoursePage();
