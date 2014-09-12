// conf.js
exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  
  suites: {
	login: ['../test/model/loginPage.js','../test/spec.js'],
	search: ['test/e2e/contact_search/**/*Spec.js',	'tests/e2e/venue_search/**/*Spec.js']
  }
}	