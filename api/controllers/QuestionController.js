/**
 * QuestionController
 *
 * @description :: Server-side logic for managing questions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var self = {
	getVisible : function (req, res) {
		//console.log('user QuestionController: ',req.user);
		// console.log('getVisible');
		var currentClass = req.param('courseId');
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
					id : {"!" : quesAnswered},
					live_class : currentClass
				})
				.exec(function(err, ques) {	
					res.json({"questions": ques});
				});
			});	
		}
		catch (e) {
			console.error('User Not logined:    ', e);
		}
	},
	reloadQuestion : function (req, res) {
		// self.getVisible();
		sails.io.sockets.emit('newQuestion');
	},
	getAllByCourse : function (req, res) {
		// console.log('get by course');
		var currentCourse = req.param('courseId');
		//currentCourse = 1;
		// console.log('course:', currentCourse);
		Question.find({
			course : currentCourse
		})
		.exec(function(err, ques) {	
			res.json({"questions": ques});
		});
	}
};
module.exports = self;
