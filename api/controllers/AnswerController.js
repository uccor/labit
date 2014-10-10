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
		// Answer.user = userSelected;
		// Answer.question = questionSelected;
		// Answer.userAnswer = answerSelected;
		
		// answer.save(function (err) {
		// 	if (err) {
		// 		console.log(err)
		// 	}
		// 	// your change to the user was saved.
			
		// });
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

		Answer.find({
			or : [
    			{question : questionId},
    			{}
  			],limit: 3})
		.populate('user')
		.populate('question')
		.exec(function(err, ans) {
			// console.log('ans: ',ans );
			// console.log('questionId', questionId);
			var answers = [];
			ans.forEach(function(an) {
				a = {
					"user": an.user.username,
					"answer": an.question.answers[an.userAnswer]
				};	
				answers.push(a);
			});

			if(questionId) {
				var quest = Question.findOne({id:questionId}).exec(function(err, ques) {
					// res.view('answerRealTime', {"answers": answers, "question": ques.text});
					res.json({"responsesArray": answers});
				});	
			}
			// else {
			// 	res.view('answerRealTime', {"answers": answers,"question": "Todas las respuestas:"});
			// };
			
		});
		
	}
};

