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
        //angular.extend(data, {id: id});   //Esto te comente yo Marku, sails bind se fija si si el ''id'' ya esta asignado,
                                            // y cree que no es un item nuevo (linea 121 de angular-sails-bind.js).
                                            // De todas forma recibe el 'data' vacio por eso no lo manda al servidor
        $scope.courses.push(data);
        console.log(JSON.stringify(data));
    };
    $scope.checkName = function(data) {
        console.log(data);
        if (data == '') {
            return "Please fill a name";
        }
    }

    /*
     $scope.addCourseDEPRUEBA = function () {
     io.socket.post('/api/course', {name: '345vgv'});
         $scope.$apply();
     };


     $scope.addCoursePruebaGET = function () {
         io.socket.get('/api/course/');
         $scope.$apply();
     }

    $scope.destroyCoursePUT = function () {
        io.socket.delete('/api/course/destroy/40');
        $scope.$apply();
    },
    $scope.updateCoursePUT = function () {
        io.socket.put('/api/course/update/3?name=biologia1');
        $scope.$apply();
    }
    */
}]);