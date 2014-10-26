/**
 * Created by martin on 21/10/14.
 */


app.controller('professorCourse', ['$scope', '$rootScope', "$sailsBind", function ($scope, $rootScope, $sailsBind) {
    $scope.courses = {};
    $scope.loading = '';
    $scope.userId = '';

    io.socket.get('/api/user/getUser', function (data) {
        $scope.userId = data.userId;
        console.log(data.userId);
    });
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
            return "Complete un nombre valido";
        }
    };

    $scope.courseStart = function (cid) {
        var live_class = {
            course: cid,
            status: 'Live',
            pdf_sharing: false,
            pdf_synchronize: false,
            pdf_allowNavigation: false,
            pdf_url: "",
            pdf_studentPageNumber: 0,
            pdf_screenPageNumber: 0
        }

        io.socket.put("/api/live_class_student/create/", live_class, function (data) {
            var user = {
                live_class_student: data.id
            };
            io.socket.put("/api/user/" + $scope.userId, user, function(data){

            });
        });
    };

    $scope.loading = 'hidden';
}]);