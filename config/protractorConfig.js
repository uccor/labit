// conf.js
exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',

    suites: {
        login: ['../test/model/loginPage.js','../test/spec.js'],
        student: ['../test/studentSpec.js'],
        proffesor: ['../test/proffesorSpec.js']
    }
}	