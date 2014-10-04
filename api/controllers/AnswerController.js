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
			var userSelected = req.user["id"];
			var questionSelected = req.param('question');
			var answerSelected = req.param('answer');
			console.log ('user:', userSelected["id"], ' question: ', questionSelected, ' ans: ', answerSelected);
		} 
		catch (err) {
			console.error('Error in AnswerController: user is login?'); 
		}
		

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

		
	}
};

