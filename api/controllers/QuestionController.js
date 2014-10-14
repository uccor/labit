/**
 * QuestionController
 *
 * @description :: Server-side logic for managing questions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	getVisible : function (req, res) {
		
		Answer.find({
			user: req.user.id,
		})
		.exec(function(err, ans) {
			// console.log('ans from user: ',ans);
			quesAnswered = [];
			ans.forEach(function(an) {
				quesAnswered.push(an.question);
			});
			// console.log('answered: ',quesAnswered);
			Question.find({
				visible : true,
				id : {"!" : quesAnswered}
			})
			.exec(function(err, ques) {	
				res.json({"questions": ques});
			});
		});
	}
	

};

