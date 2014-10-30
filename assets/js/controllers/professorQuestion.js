app.controller('QuestionControllerProfessor', ['$scope',"$sailsBind","$timeout","$rootScope", function ($scope, $sailsBind,$timeout,$rootScope) {

	currentCourseId = 1;
	currentClassId = 2;

	$scope.questions = [];
	$scope.getQuestion = function() {
		// var currentCourseId = $scope.$parent.live_class_students[0].id;
		io.socket.get('/question/get_by_course', {courseId : currentCourseId }, function (data, jwres) {
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
			
			// debugger;
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

	$scope.saveOk = "";
	$scope.addQuestion = function() {
		if ($scope.text === '') {
			return;
		}
		var ans = [];
		var  answares = $("li > input");
        var ansQuantity=0;
		angular.forEach(answares, function(val, key) {
			if(val.value != '') {
				ans.push(val.value);
				val.value = "";
                ansQuantity=ansQuantity+1;
			}
		});

        if(ansQuantity<2){
            $scope.error="Minimo 2 respuestas";
            return;
        }

//		$scope.questions.push({
//			text: $scope.text,
//			status: "si",
//			answers: ans,
//            live_class:1,
//            course:$scope.$parent.live_class_students[0].course.id
//		});


        io.socket.post(
            '/api/question',
            {
                text: $scope.text,
                status: "si",
                answers: ans,
                live_class:1,
                //course:$scope.$parent.live_class_students[0].course.id
                course:$scope.live_class_student
            },
            function (data, jwres) {
                $scope.text = '';
                $scope.saveOk="true";
                $scope.error="";
                $("li:not('#template') > input").parent("li").remove();

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
		
		//var template = '<li answerDynamic="ans" id="template" class="hidden"><input type="text" placeholder="Respuesta"><button ng-click="removeAnswer($event)">X</button></li>';
		var template = $("#template");
		var newAns= template.clone();
		newAns.removeClass("hidden");
		newAns.removeAttr("id");
        newAns.find("input").val("");
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
