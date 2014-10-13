// conf.js

extend = require('node.extend');

var environment = process.env.NODE_ENV || "dev";

// console.log(environment);

var genericConfig = {
    suites: {
        //login: ['../test/loginSpec.js'],
        //student: ['../test/studentSpec.js'],
        //proffesor: ['../test/proffesorSpec.js'],
        makeQuestion: ['../test/questionSpec.js']

    }
};

var genericCapability = {
    'name': process.env.CI_MESSAGE || 'Ad hoc message',
    'build': process.env.CI_BUILD_NUMBER + ' (' + (process.env.CI_COMMIT_ID || "No comments.").substring(0, 7) + ')',
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER
};

var configurationByEnvironment = {
    test: extend({
        sauceUser: 'MEugeC',
        sauceKey: '360f20e6-cbab-4cdf-914f-cfd7b12ee329',
        multiCapabilities: [
            extend({
                browserName:'chrome'
            },genericCapability),
            extend({
                browserName:'firefox'
            },genericCapability),
            extend({
                browserName:'internet explorer',
                platform: 'windows 8.1',
                version: 11
            },genericCapability)

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
