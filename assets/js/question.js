function TestController($scope) {
    $scope.questions = [
        {
            id : 1,
            text:'Esto es una pregunta',
            validAnswer : 1,
            userAnswer : null,
            status : '',
            answers: [
                {id : 1, text : 'Respuesta 1.1'},
                {id : 2, text : 'Respuesta 1.2'},
                {id : 3, text : 'Respuesta 1.3'}
            ]
        },
        {
            id : 2,
            text:'Otra pregunta',
            validAnswer : 2,
            userAnswer : null,
            status : '',
            answers: [
                {id : 1, text : 'Respuesta 2.1'},
                {id : 2, text : 'Respuesta 2.2'}
            ]
        }
    ];
 
    $scope.userStatus = '';
 
    $scope.validAnswers = 0;
 
    $scope.validate = function (question) {
        if (question.validAnswer == question.userAnswer) {
            $scope.validAnswers ++;
            question.status = 'ok';
        } else {
            if (question.status == 'ok' && $scope.validAnswers > 0) {
                $scope.validAnswers --;
            }
            question.status = 'error';
        }
 
        updateUserStatus();
    };
 
    function updateUserStatus() {
        var avgValidAnswers = ($scope.validAnswers / $scope.questions.length) * 100;
        if (avgValidAnswers == 0) {
            $scope.userStatus = 'looser';
        } else if (avgValidAnswers == 100) {
            $scope.userStatus = 'guru';
        } else {
            $scope.userStatus = 'poor';
        }
    }
 
}