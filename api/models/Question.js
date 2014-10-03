/**
* Question.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
		text: { type: 'string' , required:true},
		userAnswer: { type: 'integer', required:true },
		status: {type: 'string', required:true, defaultsTo: 'not answered'},
		user: {type : "User"},
		answers: {type : "array", required:true}
	}
};

