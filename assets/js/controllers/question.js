
app.controller('QuestionControllerStudent', ['$scope',"$sailsBind","$compile", function ($scope, $sailsBind, $compile) {
	// $sailsBind.bind("api/question", $scope, {"visible": {"equals": "true"}});
	
	$scope.questions = [];
	$scope.getQuestion = function() {
		io.socket.get('/question/visible', function (data, jwres) {
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
		debugger;
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

app.controller('QuestionControllerProfessor', ['$scope',"$sailsBind","$timeout","$rootScope", function ($scope, $sailsBind,$timeout,$rootScope) {

	// $sailsBind.bind("api/question", $scope);

	// var x_act_class= $location.path();
	// $scope.subscribe_to_class = function () {
	//     io.socket.get('/api/live_class_student' + x_act_class, function messageReceived(jsonObject) {
	//        $scope.idClase = jsonObject.id;
	//        $scope.getQuestion(idCourse);
		   
	//     });
	// };
	$scope.questions = [];
	$scope.getQuestion = function() {
		io.socket.get('/question/get_by_course', function (data, jwres) {
			$scope.questions = data.questions;
			if (!$scope.$$phase) {
				$scope.$apply();
			}
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
			io.socket.put('/api/question/'+questionId, { visible: isVisible }, function (data) {
				console.log(data)
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

	$scope.saveOk = "";
	$scope.addQuestion = function() {
		if ($scope.text === '') {
			return;
		}
		var ans = [];
		var  answares = $("li > input.visible");

		angular.forEach(answares, function(val, key) {
			if(val.value != '') {
				ans.push(val.value);
				val.value = "";
			}
		});
		$scope.questions.push({
			text: $scope.text,
			status: "si",
			answers: ans,
            live_class:$scope.$parent.live_class_students
		});
		$scope.text = '';
		$scope.saveOk="true";
		$timeout(function() {
			$scope.saveOk = "false";
		}, 2000);
	};



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
		
		//var template = '<li answerDynamic="ans" id="template" class="hidden"><input type="text" placeholder="Respuesta"><button ng-click="removeAnswer($event)">X</button></li>';
		var template = $("#template");
		var newAns= template.clone();
		newAns.removeClass("hidden");
		newAns.removeAttr("id");
		newAns.find("input").addClass("visible");
		//var element = $compile(angular.element(clone))(scope);


		//var new_ans = angular.element($compile(newAns)($scope));
		//elem_0.append(a_input);
		$("#allAnswers").append(newAns);

	};

	$scope.removeAnswer = function($event) {
		$($event.target).parent("li").remove();
	}


}]).directive('answerDynamic', function($compile) {
	return {
		//template: '<li><input type="text" placeholder="Respuesta"><button ng-click="removeAnswer($event)">X</button></li>',
		replace: true,
		link: function($scope, element) {
			var el = angular.element('<ul>');
			el.append('<li><input type="text" placeholder="Respuesta"><button ng-click="removeAnswer($event)">X</button></li>');
			$compile(el)($scope);
		}
	}
});


