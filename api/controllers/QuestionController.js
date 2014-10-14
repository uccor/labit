/**
 * QuestionController
 *
 * @description :: Server-side logic for managing questions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	getVisible : function (req, res) {
		//console.log('user QuestionController: ',req.user);
		try {
			/* search answered questions from user */
			Answer.find({
				user: req.user.id,
			})
			.exec(function(err, ans) {
				
				quesAnswered = [];
				ans.forEach(function(an) {
					quesAnswered.push(an.question);
				});
				
				/* get the questions not answered by user */
				Question.find({
					visible : true,
					id : {"!" : quesAnswered}
				})
				.exec(function(err, ques) {	
					res.json({"questions": ques});
				});
			});	
		}
		catch (e) {
			console.error('User Not logined:    ', e);
		}
	}
	

};

