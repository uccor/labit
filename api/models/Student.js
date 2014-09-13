/**
* Student.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  schema: true, 
  attributes: {

    name:{
      type: 'string',
      // required: true
    },
    lastName:{
      type: 'string',
      // required: true
    },
    userName:{
      type: 'string',
      required: true
    },
    // password:{
    //   type: 'string',
    //   required: true

    // },
    passports : { 
      collection: 'Passport', 
      via: 'user' 
    }


  }

/* beforeCreate: function (attrs, next) {
var bcrypt = require('bcrypt');

bcrypt.genSalt(10, function(err, salt) {
if (err) return next(err);

bcrypt.hash(attrs.password, salt, function(err, hash) {
if (err) return next(err);

attrs.password = hash;
next();
});
});
}*/
};

