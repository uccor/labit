/**
 * Created by martin on 11/10/14.
 */
app.controller('professorScreen', ['$scope', '$rootScope', "$sailsBind","$location", function ($scope, $rootScope, $sailsBind,$location) {
    $scope.idClase = '';
    $scope.actClass = {}
    $scope.paginaActualPDF = 0;
     // Subscription
    var x_act_class= $location.path();
     $scope.subscribe_to_class = function () {
         io.socket.get('/api/live_class_student' + x_act_class, function messageReceived(jsonObject) {
                 $scope.idClase = jsonObject.id;
                 $scope.actClass = jsonObject;
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
                $scope.updatePDF();
            }
        );
    };
    $scope.subscribe_to_class();
    // Listen to incoming Updates from Live_class_student we just suscribed to
    io.socket.on('live_class_student', function messageReceived(jsonObject) {

        if (jsonObject.id == $scope.idClase) {
            switch (jsonObject.verb) {
                case 'updated':
                    for (var k in jsonObject.data) {
                        $scope.actClass[k] = jsonObject.data[k];
                    }
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                    $scope.updatePDF();
                default:
                break;
            }
        }
    });

    $scope.updatePDF = function(){
        if ($scope.actClass.pdf_sharing) {
            $rootScope.$broadcast('pdfChange',
                { file: $scope.actClass.pdf_url,
                    pag: $scope.actClass.pdf_screenPageNumber
                }
            );
        } else {
            $rootScope.$broadcast('pdfChange',
                { file: '',
                    pag: 0,
                    nav: false
                }
            );
        }
    };

}]);