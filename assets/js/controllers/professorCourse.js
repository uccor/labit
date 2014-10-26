/**
 * Created by martin on 21/10/14.
 */


app.controller('professorCourse', ['$scope', '$rootScope', "$sailsBind", function ($scope, $rootScope, $sailsBind) {
    $scope.courses = {};
    $scope.loading = '';

    $sailsBind.bind("api/course", $scope);

    $scope.removeCourse = function (index) {
        $scope.courses.splice(index, 1);
    };
// add user
    $scope.addCourse = function () {

        $scope.inserted = {
            name: ''
        };
        io.socket.put("/api/course/create/", $scope.inserted);
    };
    $scope.saveCourse = function (data, id) {
        angular.extend(data, {id: id});
        $scope.courses.push(data);
    };
    $scope.checkName = function (data) {
        if (data == '') {
            return "Please fill a name";
        }
    };
    $scope.loading = 'hidden';
}]);