// conf.js

extend = require('node.extend');

var environment = process.env.NODE_ENV || "dev";

// console.log(environment);

var genericConfig = {
    suites: {
     //   student: ['../test/studentSpec.js'],
        homePage: ['../test/homePageSpec.js'],
     //   professorMFileShare:  ['../test/professorMFileShareSpec.js'],
     //   professorUploadSpec:    ['../test/professorUploadSpec.js']
    }
};

var genericCapability = {
    'name': process.env.CI_MESSAGE || 'Ad hoc message',
    'build': process.env.CI_BUILD_NUMBER + ' (' + (process.env.CI_COMMIT_ID || "No comments.").substring(0, 7) + ')',
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER
};

var configurationByEnvironment = {
    test: extend({
        sauceUser: process.env.SAUCE_USERNAME,
        sauceKey: process.env.SAUCE_ACCESS_KEY,
        multiCapabilities: [
            extend({
                browserName:'chrome'
            },genericCapability)
 //           extend({
 //               browserName:'firefox'
 //           },genericCapability),
 //           extend({
 //               browserName:'internet explorer',
 //               platform: 'windows 8.1',
 //               version: 11
 //           },genericCapability)

        ],
        baseUrl:'http://127.0.0.1:8080'
    }, genericConfig),

    dev: extend({
        seleniumAddress: 'http://localhost:4444/wd/hub',
        capabilities: {
            browserName: 'chrome',
            name: "developmentBuild",
            build: "NA"
        }
    }, genericConfig)

};

exports.config = configurationByEnvironment[environment];



//console.log(exports.config);
