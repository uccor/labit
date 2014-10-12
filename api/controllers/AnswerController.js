/**
 * AnswerController
 *
 * @description :: Server-side logic for managing answers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
//var answer = require('../models/Answer.js')
module.exports = {
	sendAnswer: function (req, res) {
		var status = 'error';
			try {
			// var userSelected = req.user["id"];
			var userSelected = req.user;
			var answerSelected = req.param('answer');
			var questionSelectedId = req.param('question');
			
			if (userSelected) {
				Question.findOne({id: questionSelectedId}).exec(function(err, ques) {
					var questionSelected = ques;
					Answer.create({
						user : userSelected,
						question : questionSelected,
						userAnswer : answerSelected
					}).exec(function(err, ans) {
						if (ans) {
							status = 'ok';
						}
						res.json({"status": status});
					});	
				});

				// console.log('emit: ', 'newAnswerFromQuestion', questionSelectedId);
				// sails.io.sockets.emit('newAnswerFromQuestion'+ questionSelectedId, {msg: 'Hi!'});
				
			}
			else {console.error('user is login?');}
			// console.log ('user:', userSelected["id"], ' question: ', questionSelected, ' ans: ', answerSelected);
		} 
		catch (err) {
			console.error('Error in AnswerController: user is login?'); 
		}		
	},

	getResponses: function (req, res) {
		var questionId = req.param('id');

		var result = [];
		if(questionId) {
			Answer.find({question : questionId})
			.populate('user')
			.populate('question')
			.exec(function(err, ans) {
				
				console.log('questionId', questionId);
				console.log('answerLength: ',ans.length );
				var answers = [];
				ans.forEach(function(an) {
					a = {
						"user": an.user.username,
						"answer": an.question.answers[an.userAnswer]
					};	
					answers.push(a);
				});

				var quest = Question.findOne({id:questionId}).exec(function(err, ques) {
					res.json({"responsesArray": answers});
				});	
			});
		
		}
	}
};

