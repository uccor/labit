/**
* Live_class.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    attributes: {

        id: {
            type: 'string',
            required: true,
            unique: true,
            primaryKey : true
        },

        class_name: {
            type: 'string',
            required: true
        },


        ruta: {
            type: 'string',
            required: true
        }


    }
};

