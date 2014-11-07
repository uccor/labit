/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  schema: true,
  autosubscribe: ['update','create','destroy'],
  attributes: { 

    name: { type: 'string' },
    lastName:{ type: 'string' },
    // username:{
    //   type: 'string',
    //   required: true,
    //   unique: true
    // },
    // password:{
    //   type: 'string',
    //   required: true
    // },
    // email: {
    // 	type: 'string'
    // }
	username  : { type: 'string', unique: true },
    email     : { type: 'email',  unique: true },
    status    : { type: 'string', unique: false, defaultsTo: 'Offline', required: 'true'},
    passports : { collection: 'Passport', via: 'user' },
    role : {type:'string', defaultsTo:'student'},

      //Atributos ultimos sprint

      courses: {
          collection: 'course',
          via: 'users'
      },

      live_class_student:{
          model: 'live_class_student'
      }
      /*,


      answers: {
          collection: 'answer',
          via: ''

      }
      */

  }
};

