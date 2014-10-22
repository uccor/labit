/**
 * Created by martin on 21/10/14.
 */


app.controller('professorCourse', ['$scope', '$rootScope', "$sailsBind", function ($scope, $rootScope, $sailsBind) {
    $scope.courses = {};
    $sailsBind.bind("api/course", $scope);
}]);