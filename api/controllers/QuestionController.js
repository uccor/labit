/**
 * QuestionController
 *
 * @description :: Server-side logic for managing questions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	getVisible : function (req, res) {
		
		// var questionId = req.param('id');

		Question.find({visible : true})
		.exec(function(err, ques) {
			
			// console.log('questionId', questionId);
			// console.log('answerLength: ',ans.length );
			// var answers = [];
			// ans.forEach(function(an) {
			// 	a = {
			// 		"user": an.user.username,
			// 		"answer": an.question.answers[an.userAnswer]
			// 	};	
			// 	answers.push(a);
			// });

			// var quest = Question.findOne({id:questionId}).exec(function(err, ques) {
			// 	res.json({"responsesArray": answers});
			// });	
			res.json({"questions": ques});
		});
		
	
	}
	

};

