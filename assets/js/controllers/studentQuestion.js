app.controller('QuestionControllerStudent', ['$scope', "$sailsBind", "$compile", "$rootScope", "toastr", function ($scope, $sailsBind, $compile, $rootScope, toastr) {
    // $sailsBind.bind("api/question", $scope, {"visible": {"equals": "true"}});

    var currentClassId = -1;

    $scope.questions = [];
    $scope.questionsCant = 0;
    // $scope.getQuestion = function(classId) {
    $rootScope.getQuestion = function (classId) {
        // currentClassId = $scope.id_subscribedClass
        currentClassId = classId;
        io.socket.get('/question/visible', {courseId: currentClassId}, function (data, jwres) {
            // data.questions;
            // console.log();
            $scope.questions = data.questions;
            if (data.questions.length > $scope.questionsCant)
                toastr.info('Hay nuevas preguntas para responder', 'Pregunta');

            $scope.questionsCant = data.questions.length;

            if (!$scope.$$phase) {
                $scope.$apply();
            }

        });
    }


    /*When new question is visible reload questions*/
    io.socket.on("newQuestion", function onServerSentEvent(data) {
        var classId = $rootScope.currentClassId;
        $rootScope.getQuestion(classId);
    });

    $scope.$on('changedQuestionStatus', function (event, args) {

    });

    // $scope.getQuestion();

    $scope.validAnswers = 0;

    $scope.sendResult = function (questionId, ansInd) {
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

                    $(".questionId#" + questionId).parent().delay(100).fadeOut(100);
                    // var delQuestion = $scope.questions[questionId];


//                     $scope.questions.pop(questionId);
// //					$scope.questions.splice( question, 1 );
// 					if (!$scope.$$phase) {
// 						$scope.$apply();
// 					}
                }
            }
        );
    };

}]);



