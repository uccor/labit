/**
 * Created by martin on 21/10/14.
 */


app.controller('professorCourse', ['$scope', '$rootScope', "$sailsBind", function ($scope, $rootScope, $sailsBind) {
    $scope.courses = {};
    $sailsBind.bind("api/course", $scope);


    /**
     * Description
     * @method removeCourse
     * @param {} index
     * @return 
     */
    $scope.removeCourse = function (index) {
        $scope.courses.splice(index, 1);
    };

    // add user
    /**
     * Description
     * @method addCourse
     * @return 
     */
    $scope.addCourse = function () {
        $scope.inserted = {
            id: $scope.courses.length + 1,
            name: ''
        };

        $scope.courses.push($scope.inserted);
    };

    /**
     * Description
     * @method saveCourse
     * @param {} data
     * @param {} id
     * @return 
     */
    $scope.saveCourse = function (data, id) {

        //$scope.user not updated yet
        //$scope.courses.pop();
        //return $http.post('/saveUser', data);
        angular.extend(data, {id: id});
        $scope.courses.push(data);
        console.log(JSON.stringify(data));
    };
}]);