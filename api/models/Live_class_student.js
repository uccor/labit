/**
* Live_class_student.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    autosubscribe:['update'],
    attributes: {

        id: {
            type: 'string',
            required: true,
            unique: true,
            primaryKey : true
        },

        pdf_sharing:{
            type: 'boolean'
        },

        pdf_synchronize:{
            type: 'boolean'
        },

        pdf_allowNavigation:{
            type: 'boolean'
        },

        pdf_url: {
            type: 'string'
        },

        pdf_studentPageNumber: {
            type: 'integer'
        },
        pdf_screenPageNumber: {
            type: 'integer'
        },
        course_id: {
            type: 'integer'
        }

    }
};

