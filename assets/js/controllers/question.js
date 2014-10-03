
app.controller('TestController', ['$scope',"$sailsBind", function ($scope, $sailsBind) {
	$sailsBind.bind("api/question", $scope);
    $scope.userStatus = '';
    $scope.validAnswers = 0;     
}]);
