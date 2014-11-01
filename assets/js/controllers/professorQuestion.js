app.controller('QuestionControllerProfessor', ['$scope',"$sailsBind","$timeout","$rootScope", function ($scope, $sailsBind,$timeout,$rootScope) {

	
	// currentClassId = 2;

	$scope.questions = [];
    $scope.saveOk = "";
    $scope.answers = [{},{}];

	$scope.getQuestion = function() {
		// var currentClassId = $scope.$parent.live_class_student
		$scope.getLiveClassStudent().then(function() {
			var currentCourseId = $scope.live_course;
			io.socket.get('/question/get_by_course', {courseId : currentCourseId }, function (data, jwres) {
				$scope.questions = data.questions;
				if (!$scope.$$phase) {
					$scope.$apply();
				}
			});
		});
		

	}
	
	$scope.getQuestion();
	
	$scope.responses = [];
	$scope.summaryAnswers = [];
	$scope.changeStatus = function (question) {
		
		$( "input:checkbox.checkButton" ).each(function(ind,element) {
			var questionId = $(element).attr("id");
			var isVisible = $(element).prop("checked");
			// var statusNow = "invisible"; 	
			
			var currentClassId = $scope.live_class_student;
			io.socket.put('/api/question/'+questionId, { visible: isVisible, live_class : currentClassId }, function (data) {
				// console.log(data)
			});	
		});
		io.socket.get('/question/reload');
		// io.socket.emit('newQuestion'); //no me deja :(
		// $rootScope.$broadcast('changedQuestionStatus', {'change': "pepeChange"});
	   

	};
	
	$scope.searchAnswers = function (ques) {

		io.socket.get('/answer/responses', { id: ques.question.id }, function (data, jwres) {
			$scope.responses = data.responsesArray;
			$scope.summaryAnswers = data.summary;
			console.log($scope.summaryAnswers );
			if (!$scope.$$phase) {
				$scope.$apply();
			}

		});
	};


	$scope.addQuestion = function() {
		if ($scope.question_text === '') {
			return;
		}

        if($scope.answers.length<2){
            $scope.error="Minimo 2 respuestas";
            return;
        }



        ans_text = $scope.answers.filter(function(e){return e.text});
        ans_text = ans_text.map(function(item) { if(item.text!="") {return item.text} });

        post_question={
            text: $scope.question_text,
            status: "si",
            answers: ans_text,
            course:{id:$scope.live_course}
        }
        io.socket.post(
            '/api/question',
            {
                text: $scope.question_text,
                status: "si",
                answers: ans_text,
                course:$scope.live_course
            },
            function (data, jwres) {
                $scope.question_text = '';
                $scope.saveOk="true";
                $scope.error="";
                $scope.answers=[{},{}];

                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            }
        );



		$timeout(function() {
			$scope.saveOk = "false";
		}, 2000);
	};
	//Load questions for course...
	


//    app.directive("answerDynamic",  ['$compile',function($compile) {
//
//        var base = $("#template");
//        var template= base.clone();
//        template.removeClass("hidden");
//        template.removeAttr("id");
//
//        return{
//            link: function(scope, element){
//                element.on("click", function() {
//                    scope.$apply(function() {
//                        var content = $compile(template)(scope);
//                        element.append(content);
//                    })
//                });
//            }
//        }
//    }]);


	$scope.addAnswer = function() {
        $scope.answers.push({});
	};

	$scope.removeAnswer = function(ans) {
        $scope.answers.pop(ans);
	}


}])
