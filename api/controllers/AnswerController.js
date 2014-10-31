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
		var answersArray = [];
		//var result = [];
		// console.log('questionId', questionId);
		if(questionId) {
			Answer.find({question : questionId})
			.populate('user')
			.populate('question')
			.exec(function(err, ans) {
				// console.log('err:',err);
				// console.log('ans:',ans);
				if(ans[0]) { //if exist answer..
					
			
					var questionSelected = ans[0].question;
					var questionAnswersLength = questionSelected.answers.length;
					/* Generate array to save answers summary */
					var summary = new Array(questionAnswersLength + 1).join(0).split('').map(parseFloat);		
					// console.log('questionId', questionId);
					// console.log('answerLength: ',questionAnswersLength );
					ans.forEach(function(an) {
						var a = {
							"user": an.user.username,
							"answer": an.question.answers[an.userAnswer]
						};	
						
						// console.log('userAnswer: ',an.userAnswer);
						answersArray.push(a);
						/* Sum in each respenctive answer to make a summary */
						summary[an.userAnswer]++;
					});
					
					var summaryArray = {};
					/* Generate summary with question and number of answers*/
					(questionSelected.answers).forEach(function( answ, ind) {
						summaryArray[answ] = summary[ind]; 
					})
					// console.log('summ: ',summaryArray);
				
					res.json({"responsesArray": answersArray, "summary": summaryArray});
					return;
				}
				else {
					
					Question.findOne({id: questionId}).exec(function(err, ques) {
						var summary = new Array(ques.answers.length + 1).join(0).split('').map(parseFloat);		
						var summaryArray = {};
						(ques.answers).forEach(function( answ, ind) {
							summaryArray[answ] = summary[ind]; 
						})
						res.json({"responsesArray": "", "summary": summaryArray});
					});
				}
			});
			
		
		}
		
	}

	
};

