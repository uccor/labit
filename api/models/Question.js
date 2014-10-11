/**
* Question.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
		text: { type: 'string' , required: true},
		status: {type: 'string', required: true, defaultsTo: ''},
		answers: {type : "array", required: true},
		visible: {type: 'string', required: true, defaultsTo: 'true'},
	}
};

