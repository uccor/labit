/**
 * Created by martin on 21/10/14.
 */


app.controller('professorCourse', ['$scope', '$rootScope', "$sailsBind", "toastr", function ($scope, $rootScope, $sailsBind, toastr) {
    $scope.courses = {};
    $scope.loading = '';
    $scope.userId = '';
    $scope.areThereClases = 'hidden';
    $scope.liveClasses = {};


    io.socket.get('/api/user/getUser', function (data) {
        $scope.userId = data.userId;
        console.log(data.userId);
    });
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
            name: ''
        };
        io.socket.put("/api/course/create/", $scope.inserted);
    };

    /**
     * Description
     * @method saveCourse
     * @param {} data
     * @param {} id
     * @return 
     */
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
        io.socket.get('/api/live_class_student?where={"course":"' + cid + '", "status" : "live"}', function (data) {

            if (data.length == 0) {
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

                io.socket.post("/api/live_class_student", live_class, function (data) {
                    $scope.enterClass(data.id);
                });
            } else {
                toastr.error('Finalize las clases abiertas para Iniciar una nueva.', 'Hay clases sin finalizar');
                $scope.loadClasses(cid);
            }
        });
    };

    $scope.loadClasses = function (cid) {
        io.socket.get('/api/live_class_student?where={"course":"' + cid + '"}', function (data) {
            $scope.liveClasses = [];
            if (data.length > 0) {

                $scope.areThereClases = '';
                console.log(data);

                data.forEach(function (cla) {

                    $scope.liveClasses.push({
                        id: cla.id,
                        status: cla.status,
                        createdAt: cla.createdAt.substring(0, 10)
                    });

                });
            } else {
                $scope.areThereClases = 'hidden';
                toastr.info('Comienze al menos una clase', 'No hay clases en esta materia');

            }

            if (!$scope.$$phase) {
                $scope.$apply();
            }
        });
    };
    $scope.enterClass = function (cid) {
        var user = {
            live_class_student: cid
        };
        io.socket.put("/api/user/" + $scope.userId, user, function (data) {
            document.location.href = '/professorManager';
        });
    };

    $scope.loading = 'hidden';
}]);