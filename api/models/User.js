/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  schema: true, 
  attributes: { 

    // name: { 
    //   type: 'string',
    //   // required: true
    // },
    // lastName:{
    //   type: 'string',
    //   // required: true
    // },
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
    passports : { collection: 'Passport', via: 'user' }
  }
};

