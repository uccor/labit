app.controller('contentShared', ['$scope', '$rootScope', "$sailsBind", function ($scope, $rootScope, $sailsBind) {

    $scope.previous_idClase = '';
    $scope.actClass = {}
    $scope.paginaActualPDF = 0;
    $scope.subscribeState=true;
    $scope.unsubscribeState=false;
    $scope.selectClassState = true;


    $scope.avaibleClasses = {};

    //$sailsBind.bind("/api/live_class_student", $scope);

    io.socket.get('/api/live_class_student?status=live', function messageReceived(jsonObject) {
        $scope.avaibleClasses = jsonObject;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    });

    $scope.unsubscribe_from_class = function () {

        if ($scope.previous_idClase != '') {
            io.socket.get('/api/live_class_student/unsubscribe/' + $scope.previous_idClase, function messageReceived(data) {

                $scope.previous_idClase = '';

                $scope.subscribeState=true;
                $scope.unsubscribeState = false;
                $scope.selectClassState = true;

                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            });


        }
    };


//Subscribe to live_class_student  :
    /**
     * Description
     * @method subscribe_to_class
     * @return 
     */

    $scope.subscribe_to_class = function () {

        if(typeof $scope.itemSelectedClass == "undefined"){
            return;
        }
        $scope.subscribeState=false;
        $scope.unsubscribeState = true;
        $scope.selectClassState = false;
        // If already subscribed to one class, unsubscribe from it
        if ($scope.previous_idClase != '') {
            io.socket.get('/api/live_class_student/unsubscribe/' + $scope.previous_idClase, function messageReceived(data) {
            });
        }

        // Subscription
        io.socket.get('/api/live_class_student/' + $scope.currentClassId, function messageReceived(jsonObject) {

            $scope.previous_idClase = jsonObject.id;
            $scope.actClass = jsonObject;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
            $scope.updatePDF();

            io.socket.get('/api/user/getUser', function (data) {
                $scope.userId = data.userId;
                console.log(data.userId);

                //Asigno a mi usuario la clase en la cual me estoy inscribiendo

                io.socket.put("/api/user/" + $scope.userId,{"live_class_student" : {id: $scope.previous_idClase},"status":'Online'}, function (data){
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                });
            });

        });
    };

// Listen to incoming Updates from Live_class_student we just suscribed to
    io.socket.on('live_class_student', function messageReceived(jsonObject) {

        if (jsonObject.id == $scope.previous_idClase) {
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

    /**
     * Description
     * @method updatePDF
     * @return 
     */
    $scope.updatePDF = function(){
        if ($scope.actClass.pdf_sharing) {
            $rootScope.$broadcast('pdfChange',
                {
                    file: $scope.actClass.pdf_url,
                    pag: $scope.actClass.pdf_studentPageNumber,
                    nav: $scope.actClass.pdf_allowNavigation
                }
            );
        } else {
            $rootScope.$broadcast('pdfChange',
                {
                    file: '',
                    pag: 0,
                    nav: false
                }
            );
        }
    };

    $scope.onLiveClassClick = function(idClass) {
        //$scope.$parent.getQuestion(idClass);
        $rootScope.getQuestion(idClass);
        $rootScope.currentClassId = idClass;
    }


}]);
