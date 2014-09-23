/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

      name:{
          type: 'string',
          required: true
      },
      lastName:{
          type: 'string',
          required: true
      },
      userName:{
          type: 'string',
          required: true
      },
      password:{
          type: 'string',
          required: true
      }

  }
};

