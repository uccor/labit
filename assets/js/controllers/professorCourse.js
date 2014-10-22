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
            id: $scope.courses.length + 1,
            name: ''
        };

        $scope.courses.push($scope.inserted);
    };

    $scope.saveCourse = function (data, id) {

        //$scope.user not updated yet
        //$scope.courses.pop();
        //return $http.post('/saveUser', data);
        angular.extend(data, {id: id});
        $scope.courses.push(data);
        console.log(JSON.stringify(data));
    };

/*
    $scope.addCourseDEPRUEBA = function () {
        io.socket.post('/api/newCourse/', {name: 'aolja'});
    };


    $scope.addCoursePruebaGET = function () {
        io.socket.get('/api/myCourses/');
    };*/

}]);