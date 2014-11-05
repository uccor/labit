/**
 * Created by Mojarritas on 13/09/14.
 */
app.config(['$routeProvider',
    function ($routeProvider) {

        //$routeProvider.when('/', {
        //    template: JST["assets/templates/professor/uploadPDF.html"]
        //controller : 'AlumnoCreateCtl'
        //});
        $routeProvider.when('/fileShare', {
            template: JST["assets/templates/professor/fileShare.html"]
        });
        $routeProvider.when('/fileUpload', {
            template: JST["assets/templates/professor/uploadPDF.html"]
        });
        $routeProvider.when('/makeQuestion', {
            template: JST["assets/templates/professor/makeQuestion.html"]
        });
        $routeProvider.when('/viewQuestion', {
            template: JST["assets/templates/professor/viewQuestion.html"]
        });
        $routeProvider.otherwise({
            template: JST["assets/templates/professor/fileShare.html"]
        });

    }]);

app.controller('professorTab', function ($scope, $location) {
    /**
     * Evaluate if the current route is selected
     * @method isActive
     * @param {} route
     * @return BinaryExpression
     */
    $scope.isActive = function (route) {
        return route === $location.path();
    }
});

app.controller('professorManagerFooter', ['$scope', '$rootScope', "$sailsBind", function ($scope, $rootScope, $sailsBind) {
    $scope.pageNum = 0;
    $scope.pageTotal = 0;
    $scope.sharing = false;
    $scope.allowNavigation = true;
    $scope.synchronize = true;
    $scope.pdfName = '';


    $scope.$parent.getLiveClassStudent().then(function (liveClass) {
        $scope.pageNum = $scope.$parent.class.pdf_screenPageNumber;
        $scope.allowNavigation = $scope.$parent.class.pdf_allowNavigation;
        $scope.synchronize = $scope.$parent.class.pdf_synchronize;

        $scope.getPdf( $scope.$parent.class.pdf_url,  $scope.$parent.class.pdf_screenPageNumber);
    });


    /**
     * Download and evalute a pdf file
     * @return
     * @method getPdf
     * @param {} file
     * @param {} pag
     * @return 
     */
    $scope.getPdf = function (file, pag) {
        pag = typeof pag !== 'undefined' ? pag : 1;

        $scope.pageStageChange(true, file, pag);
        if (file == '') {
            $scope.pageNum = 0;
            $scope.pageTotal = 0;
            $scope.sharing = false;
            $scope.pdfName = '';
        } else {
            $scope.pageNum = 1;
            PDFJS.getDocument(file).then(function (pdf) {
                $scope.pdf = pdf;
                $scope.pageTotal = pdf.numPages;
                $scope.sharing = true;
                $scope.$apply();
                //$scope.changePage(pag);
            });

        }
    }

    /**
     * Called to change the current page shared
     * @return
     * @method pageStageChange
     * @param {} sharing
     * @param {} file
     * @param {} page
     * @return 
     */
    $scope.pageStageChange = function (sharing, file, page) {

        var data = {};
        data['pdf_sharing'] = sharing;
        $scope.sharing = sharing;
        if (typeof page !== 'undefined')
            $scope.pageNum = page;

        data['pdf_screenPageNumber'] = $scope.pageNum;

        if ($scope.synchronize)
            data['pdf_studentPageNumber'] = $scope.pageNum;


        if (typeof file !== 'undefined' && file != '') {
            data['pdf_url'] = file;
        }

        data['pdf_synchronize'] = $scope.synchronize;
        data['pdf_allowNavigation'] = $scope.allowNavigation;


        $scope.$parent.getLiveClassStudent().then(function (liveClass) {
            io.socket.put('/api/live_class_student/' + liveClass, data);
        });
    }


    /**
     * Return the page of the current pdf Shared
     * @method prevPage
     */
    $scope.prevPage = function () {
        if ($scope.pageNum > 1) {
            $scope.pageNum--;
        }
        $scope.pageStageChange(true, '', $scope.pageNum);
        $rootScope.$broadcast('pdfPageChanged', $scope.pageNum);
    };

    /**
     * Advance the page of the current  pdf shared
     * @method nextPage
     */
    $scope.nextPage = function () {
        if ($scope.pageNum < $scope.pageTotal) {
            $scope.pageNum++;
        }
        $scope.pageStageChange(true, '', $scope.pageNum);

        $rootScope.$broadcast('pdfPageChanged', $scope.pageNum);
    };

    /**
     * Stop sharing content with the users and the proyector window
     * @method stopSharing
     */
    $scope.stopSharing = function () {
        $scope.$parent.getLiveClassStudent().then(function (liveClass) {
            io.socket.put('/api/live_class_student/' + liveClass, {pdf_sharing: false});
        });
        $scope.pageStageChange(false);
    }

    $scope.$on('pdfChange', function (event, args) {

        $scope.pdfName = args.name;
        $scope.getPdf(args.file, args.pag);
    });

    /**
     * Open an external windows with the current PDF shared
     * @method openShare
     */
    $scope.openShare = function () {

        $scope.$parent.getLiveClassStudent().then(function (liveClass) {
            window.open('/professorScreen#/' + liveClass, 'Screen', "height=800,width=600");
        });
    }
}])
;


app.controller('professorManager', ['$scope', '$rootScope', "$sailsBind", '$q' , function ($scope, $rootScope, $sailsBind, $q) {
    $scope.live_class_student = '';
    $scope.userId = '';
    $scope.live_course = '';
    $scope.class = ''

    /**
     * This function ask the server the current LifeClassID of the current user.
     * @method getLiveClassStudent
     * @return a Promise where the data is the current LifeClassID
     */
    $scope.getLiveClassStudent = function () {
        var deferred = $q.defer();

        if ($scope.live_class_student == '') {
            io.socket.get('/api/user/getUser', function (data) {
                $scope.userId = data.userId;
                io.socket.get('/api/user/' + $scope.userId, function (user) {
                    //console.log(user);
                    $scope.class =  user.live_class_student;
                    $scope.live_class_student = user.live_class_student.id;
                    $scope.live_course = user.live_class_student.course;

                    deferred.resolve(user.live_class_student.id);
                });
            });
        } else {
            deferred.resolve($scope.live_class_student);
        }
        return deferred.promise;
    }

    $scope.finishClass = function(){
        var user = {
            live_class_student: null
        };
        io.socket.put("/api/user/" + $scope.userId, user, function (data) {
            document.location.href = '/professorCourse';
        });
    }
    $scope.getLiveClassStudent();
}]);