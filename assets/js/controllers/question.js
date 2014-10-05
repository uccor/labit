
app.controller('QuestionController', ['$scope',"$sailsBind", function ($scope, $sailsBind) {
	$sailsBind.bind("api/question", $scope);
    $scope.userStatus = '';
    $scope.validAnswers = 0;     
    $scope.sendResult = function(answer){
    	var questionId = answer.$parent.question.id;
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
    				$("#" + answer.$parent.question.id).parents('.question').delay( 100 ).fadeOut( 300 );
    			} 
    		}
    	);
    }
}]);

io.socket.get('/question/getAll', function (data, e) {
	console.log (data);
});