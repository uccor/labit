/**
* Question.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {

		text: { type: 'string' , required: true},
		status: {type: 'string', defaultsTo: ''},
		answers: {type : "array", required: true},
		visible: {type: 'string', required: true, defaultsTo: 'false'},
		course: { required: true, model: 'course', defaultsTo: 1},
		live_class : { model: 'live_class_student'},
	}
};

