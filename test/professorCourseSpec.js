var ProfessorCoursePage = require('./model/professorCourse.js');
var loginPage = require('./model/loginPage');
var homePage = require('./model/homePage');

describe('Professor course page', function () {

  beforeEach(function () {
  });

  it('should create a new course', function () {
    // before function
    homePage.get();
    //homePage.logout();
    homePage.get();
    //var loginPage = LoginPage;
    loginPage.fill('tstudent', '12');
    loginPage.login();
    ProfessorCoursePage.get();
    ProfessorCoursePage.addNewCourse();
    ProfessorCoursePage.newCourseName('CourseTest1');

    ProfessorCoursePage.editOK(0);
    expect(ProfessorCoursePage.getCourseName(0)).toEqual('CourseTest1');
  });
  it('should edit courses', function () {
    ProfessorCoursePage.get();
    ProfessorCoursePage.edit(0);
    ProfessorCoursePage.newCourseName('EditedCourseTest1');

    ProfessorCoursePage.editOK(0);
    expect(ProfessorCoursePage.getCourseName(0)).toEqual('EditedCourseTest1');
  });
  it('should enter class', function () {
    ProfessorCoursePage.get();
    ProfessorCoursePage.comenzar(0);

    loginPage.waitForTitleChange('Página Administración');
    expect(homePage.getTitle()).toEqual('Página Administración');
  });
});
