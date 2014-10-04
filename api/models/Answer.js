/**
* Answer.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
	// user: {type : "User", required: true, via: 'user'},
 // 	question: {type : "Question", required: true, via: 'question'},
 //  	userAnswer: { type: 'integer', required: true }
 	user: { required: true, via: 'user'},
 	question: { required: true, via: 'question'},
  	userAnswer: { type: 'integer', required: true }
  }
};

