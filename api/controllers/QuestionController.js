/**
 * QuestionController
 *
 * @description :: Server-side logic for managing questions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	getAll: function (req, res) {
		var currDate = new Date();
		//console.log('date:',currDate);
		// var yesterday = currDate;
		// yesterday.setHours(yesterday.getHours() - 24);
		// console.log('yestarday:',yesterday);


		Answer.find({createdAt: { '<=' : currDate }}).exec(function(err, ans) { 
			 //'>=': yesterday
			console.log('ans length: ',ans.length); 

			var result = [];
			// for (var i = 0 ; i < ans.length; i++ ) {
			ans.forEach(function(an) {
				// console.log('i: ',an);
				// Question.find({id: ans[i].question}).exec(function(err, ques) {
				Question.findOne({id: an.question}).exec(function(err, ques) {
					// console.log(ques);
					//var ques = ques;
					// console.log('int: ',an);
					// User.findOne({id: ans[i].user}).exec(function(err, us) {
					User.findOne({id: an.user}).exec(function(err, us) {
						//console.log(us);
						
						answerUser = ques.answers[an.userAnswer];
						a = {"question": ques.text, "user": us.username, "answer": answerUser};
						//question.answer.Answer
						result.push(a);
						console.log(a);
						
					});
					
				});
				
			});
			console.log(result);
		});
		
	}

};

