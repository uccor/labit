
app.controller('QuestionControllerStudent', ['$scope',"$sailsBind", function ($scope, $sailsBind) {
	// $sailsBind.bind("api/question", $scope, {"visible": {"equals": "true"}});
	$scope.questions = [];
	io.socket.get('/question/visible', function (data, jwres) {
		// data.questions;
		console.log();
	});
   
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
    
    
    
    // $scope.$on('pdfChangePage', function(event, args) {
    //     $scope.changePage(args);
    //     $scope.pageNum = args;
    // });
	
}]);


// io.socket.get('/question/getAll', function (data, e) {
// 	console.log (data);
// });

app.controller('QuestionControllerProfessor', ['$scope',"$sailsBind", function ($scope, $sailsBind) {
	$sailsBind.bind("api/question", $scope);
	$scope.responses = [];
	$scope.changeStatus = function (question) {
    	/*tengo que saber si esta click el check o no para pasarle distintos status...*/
   		//var questionId = ques.question.id;
   		
		
		$( "input:checkbox.checkButton" ).each(function(ind,element) {
			var questionId = $(element).attr("id");
			var isVisible = $(element).prop("checked");
			// var statusNow = "invisible"; 	
	    	io.socket.put('/api/question/'+questionId, { visible: isVisible }, function (data) {
	    		console.log(data)
	    	});	
		})


    };
	
    
    //var pepe = $scope;
    // $sailsBind.bind("api/answer", $scope);
    // $sailsBind.bind("api/answer", $scope, {"question" : {"id": {"equal": "13"}}});
    $scope.searchAnswers = function (ques) {

    	io.socket.get('/answer/responses', { id: ques.question.id }, function (data, jwres) {
    	// io.socket.on("newAnswerFromQuestion"+ques.question.id, function onServerSentEvent (data) {
    			// $scope.responses = [];
    			// ques.$parent.responses = [];
    			//console.log('recieve:', "newAnswerFromQuestion",ques.question.id);
    			//console.log(data);
    			// $scope.responses.splice(0, $scope.responses.length);
    			//pepe.responses = [];
    			$(data.responsesArray).each(function(ind, ans) {
    				// $scope.responses.push(ans);
    				$scope.responses.push(ans);
    				//TENGO QUE HACER DOBLE CLICK... :S
    			});
    			// console.log($scope.responses);
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
