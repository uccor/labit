/**
* Course.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  autosubscribe: ['update','create','destroy','remove','add'],
      attributes: {


      //Atributos ultimo sprint
      name: {
          type: 'string'
      },

      users: {
          collection: 'user',
          via: 'courses',
          required: true
      },

      live_classes_student: {
          collection: 'live_class_student',
          via: 'course'
      },

      pdfs:{
          collection: 'pdf',
          via: 'course'
      },

      questions: {
          collection: 'question',
          via: 'course'
      }


  }
};

