
app.controller('QuestionControllerStudent', ['$scope',"$sailsBind","$compile", function ($scope, $sailsBind, $compile) {
	// $sailsBind.bind("api/question", $scope, {"visible": {"equals": "true"}});
	
	currentClassId = 2;

	$scope.questions = [];
	$scope.getQuestion = function() {
		io.socket.get('/question/visible', {courseId : currentClassId}, function (data, jwres) {
			// data.questions;
			// console.log();
			$scope.questions = data.questions;
			if (!$scope.$$phase) {
				$scope.$apply();
			}
			
		});  
	}
	/*When new question is visible reload questions*/
	io.socket.on("newQuestion", function onServerSentEvent (data) { 
		$scope.getQuestion();
	});

	$scope.$on('changedQuestionStatus', function (event, args) {
		
	});

	$scope.getQuestion();
   
	$scope.validAnswers = 0;     
	
	$scope.sendResult = function(answer) {
		var questionId = answer.$parent.question.id;
		var question = answer.$parent.question;
		var answerUser = answer.$index;
		io.socket.post(
			'/answer/send', 
			{
				question: questionId,
				answer: answerUser

			}, 
			function (data, jwres) {
				//if the answer was saved, then remove the question only in form..
				if (data.status == "ok") {
					// $("#" + answer.$parent.question.id).parents('.question').delay( 100 ).fadeOut( 300 );
					//var delQuestion = $scope.questions[questionId];

					$scope.questions.splice( question, 1 );
					if (!$scope.$$phase) {
						$scope.$apply();
					}
				} 
			}
		);
	};
	
}]);



