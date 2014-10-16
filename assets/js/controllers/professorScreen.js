/**
 * Created by martin on 11/10/14.
 */
app.controller('professorScreen', ['$scope', '$rootScope', "$sailsBind", function ($scope, $rootScope, $sailsBind) {

    $scope.live_class_students = {};

     // Subscription
     $scope.subscribe_to_class = function () {
        io.socket.get('/api/live_class_student/' + $scope.id_subscribedClass, function messageReceived(jsonObject) {
                $scope.idClase ='Class1'; //aca va la extension del #http
                $scope.actClass = jsonObject;
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
                $scope.updatePDF();
            }
        );
    };
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
                    pag: $scope.actClass.pdf_studentPageNumber
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