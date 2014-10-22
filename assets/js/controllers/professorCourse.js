/**
 * Created by martin on 21/10/14.
 */


app.controller('professorCourse', ['$scope', '$rootScope', "$sailsBind", function ($scope, $rootScope, $sailsBind) {
    $scope.courses = {};
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
        //$scope.courses.push(c );
    };

    $scope.saveCourse = function (data,id) {
        angular.extend(data, {id: id});
        $scope.courses.push(data);
        console.log(JSON.stringify(data));
    };
    $scope.checkName = function(data) {
        console.log(data);
        if (data == '') {
            return "Please fill a name";
        }
    };
}]);