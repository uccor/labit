
app.controller('QuestionController', ['$scope',"$sailsBind", function ($scope, $sailsBind) {
	$sailsBind.bind("api/question", $scope);
    $scope.userStatus = '';
   	$scope.responses = [];
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
    };
    $sailsBind.bind("api/answer", $scope);
    // $sailsBind.bind("api/answer", $scope, {"question": {"id": "13"}});
    $scope.searchAnswers = function(ques){
    	io.socket.get('/answer/responses', { id: ques.question.id }, function (data, jwres) {
    			// $scope.responses = [];
    			// ques.$parent.responses = [];
    			console.log(data);
    			$(data.responsesArray).each(function(ind, ans) {
    				// $scope.responses.push(ans);
    				ques.$parent.responses.push(ans);
    				//TENGO QUE HACER DOBLE CLICK... :S
    			});
    			console.log($scope.responses);
    		}
    	);
    };


    $scope.addQuestion = function() {
        if ($scope.text === '') {
            return;
        }
        var ans = [];
        var  answares = $("li > input");

        angular.forEach(answares, function(val, key) {
            ans.push(val.value);
            val.value="";
        });
        $scope.questions.push({
            text: $scope.text,
            status: $scope.status,
            answers: ans
        });
        $scope.text = '';
        $scope.status = '';
        $scope.answer = '';

    };

    $scope.addAnswer = function() {

        var template = $("#template");
        var clone= template.clone();
        clone.removeClass("hidden");
        clone.removeAttr("id");

        $("#allAnswers").append(clone);

    };


    // $scope.$on('pdfChangePage', function(event, args) {
    //     $scope.changePage(args);
    //     $scope.pageNum = args;
    // });
}]);

// io.socket.get('/question/getAll', function (data, e) {
// 	console.log (data);
// });