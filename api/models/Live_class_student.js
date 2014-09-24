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

        pdf_activo:{
            type: 'boolean'
        },

        pdf_ruta: {
            type: 'string'
        },

        pdf_numeroPagina: {
            type: 'integer'
        }



    }
};

