app.controller('QuestionControllerProfessor', ['$scope',"$sailsBind","$timeout","$rootScope", function ($scope, $sailsBind,$timeout,$rootScope) {

	
	
	$scope.questions = [];
	$scope.getQuestion = function() {
		
			// var currentClassId = $scope.$parent.live_class_students[0].id;
		

		angular.element(document).ready(function () {
			debugger;
			$scope.$parent.live_class_students[0].id;
			
		});
		// $scope.$watch('live_class_students', function(newValue, oldValue) {
		// 	debugger;
			

		// }, true);
		

		//io.socket.get('/question/get_by_course',  function (data, jwres) {
		//	$scope.questions = data.questions;
		//	if (!$scope.$$phase) {
		//		$scope.$apply();
		//	}
		//});  
		
			// $scope.$apply();
			
		
	}
	
	$scope.responses = [];
	$scope.summaryAnswers = [];
	$scope.changeStatus = function (question) {
		var currentClassId = $scope.$parent.live_class_students[0].id;
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
	//Load questions for course...
	$scope.getQuestion();


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
