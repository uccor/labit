
app.controller('QuestionControllerStudent', ['$scope',"$sailsBind","$compile", "$rootScope", function ($scope, $sailsBind, $compile, $rootScope) {
	// $sailsBind.bind("api/question", $scope, {"visible": {"equals": "true"}});
	
	var currentClassId = -1;

	$scope.questions = [];
	// $scope.getQuestion = function(classId) {
	$rootScope.getQuestion = function(classId) {
		// currentClassId = $scope.id_subscribedClass
		currentClassId = classId;
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
		var classId = $rootScope.currentClassId;
		$scope.getQuestion(classId);
	});

	$scope.$on('changedQuestionStatus', function (event, args) {
		
	});

	// $scope.getQuestion();
   
	$scope.validAnswers = 0;     
	
	$scope.sendResult = function(questionId,ansInd) {
		//var questionId = answer.$parent.question.id;
		//var question = answer.$parent.question;
		//var answerUser = answer.$index;
		io.socket.post(
			'/answer/send', 
			{
				question: questionId,
				answer: ansInd

			}, 
			function (data, jwres) {
				//if the answer was saved, then remove the question only in form..
				if (data.status == "ok") {
					// $("#" + answer.$parent.question.id).parents('.question').delay( 100 ).fadeOut( 300 );
					//var delQuestion = $scope.questions[questionId];

                    $scope.questions.pop(questionId);
//					$scope.questions.splice( question, 1 );
					if (!$scope.$$phase) {
						$scope.$apply();
					}
				} 
			}
		);
	};
	
}]);



