app.controller('contentShared', ['$scope', '$rootScope', "$sailsBind", function ($scope, $rootScope, $sailsBind) {

    $scope.idClase = '';
    $scope.actClass = {}
    $scope.paginaActualPDF = 0;


    $scope.avaibleClasses = {};
    io.socket.get('/api/live_class_student/', function messageReceived(jsonObject) {
        $scope.avaibleClasses = jsonObject;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    });

    //Subscribe to live_class_student  :
    $scope.subscribe_to_class = function () {

        // If already subscribed to one class, unsubscribe from it
        if ($scope.idClase != '') {
            io.socket.get('/api/live_class_student/unsubscribe/' + $scope.idClase, function messageReceived(data) {

            });
        }

        // Subscription
        io.socket.get('/api/live_class_student/' + $scope.id_subscribedClass, function messageReceived(jsonObject) {

                $scope.idClase = jsonObject.id;
                $scope.actClass = jsonObject;
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
                $scope.updatePDF();

            }
        )
        ;
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
                    pag: $scope.actClass.pdf_studentPageNumber,
                    nav: $scope.actClass.pdf_allowNavigation
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
}])
;
