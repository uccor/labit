/**
 * Created by guille on 13/09/14.
 */
app.config(['$routeProvider',
    function ($routeProvider) {

        $routeProvider.when('/', {
            template: JST["assets/templates/professor/uploadPDF.html"]
            //controller : 'AlumnoCreateCtl'
        });
        $routeProvider.when('/fileShare', {
            template: JST["assets/templates/professor/fileShare.html"]
        });
        $routeProvider.when('/fileUpload', {
            template: JST["assets/templates/professor/uploadPDF.html"]
        });
        $routeProvider.otherwise({
            template: JST["assets/templates/professor/fileShare.html"]
        });
    }]);

app.controller('professorTab', function ($scope, $location) {
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

    $scope.pageStageChange = function (sharing, file, page) {

        var data = {};
        data['pdf_sharing'] = sharing;
        $scope.sharing = sharing;
        if(typeof page !== 'undefined')
        $scope.pageNum = page;

        data['pdf_screenPageNumber'] = $scope.pageNum;

        if ($scope.synchronize)
            data['pdf_studentPageNumber'] = $scope.pageNum;


        if (typeof file !== 'undefined' && file != '') {
            data['pdf_url'] = file;
        }

        data['pdf_synchronize'] = $scope.synchronize;
        data['pdf_allowNavigation'] = $scope.allowNavigation;


        io.socket.put('/api/live_class_student/' + $scope.$parent.id_class_to_share, data);
    }


    $scope.prevPage = function () {
        if ($scope.pageNum > 1) {
            $scope.pageNum--;
        }
        $scope.pageStageChange(true, '', $scope.pageNum);
        $rootScope.$broadcast('pdfPageChanged', $scope.pageNum);
    };

    $scope.nextPage = function () {
        if ($scope.pageNum < $scope.pageTotal) {
            $scope.pageNum++;
        }
        $scope.pageStageChange(true, '', $scope.pageNum);

        $rootScope.$broadcast('pdfPageChanged', $scope.pageNum);
    };

    $scope.stopSharing = function () {
        io.socket.put('/api/live_class_student/' + $scope.$parent.id_class_to_share, {pdf_sharing: false});
        $scope.pageStageChange(false);
    }

    $scope.$on('pdfChange', function (event, args) {

        $scope.pdfName = args.name;
        $scope.getPdf(args.file, args.pag);
    });

    $scope.openShare = function (){

        window.open('/professorScreen#/'+$scope.$parent.id_class_to_share, 'Screen', "height=800,width=600");
    }
}])
;


app.controller('professorManager', ['$scope', '$rootScope', "$sailsBind", function ($scope, $rootScope, $sailsBind) {
    $scope.live_class_student = 'CLASS1';
    $scope.userId = '';

    io.socket.get('/api/user/getUser', function (data) {
        $scope.userId = data.userId;
        io.socket.get('/api/user/'+$scope.userId , function (data) {
            $scope.live_class_student = data.live_class_student.id;
        });
    });
}]);