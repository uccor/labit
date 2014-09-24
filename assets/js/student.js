
app.controller('contentShared', ['$scope', '$rootScope', "$sailsBind", function ($scope, $rootScope, $sailsBind) {

    //Subscribe to live_class_student  :
    $scope.subscribe_to_class = function () {

        // If already subscribed to one class, unsubscribe from it
        if($scope.idClase != '' ){

            io.socket.get('/api/live_class_student/unsubscribe/'+ $scope.idClase,function messageReceived(data){

            })
        };

        // Subscription
        io.socket.get('/api/live_class_student/'+ $scope.id_subscribedClass,function messageReceived(jsonObject) {

            $scope.idClase          = jsonObject.id;
            $scope.estadoPDF        = jsonObject.pdf_activo;
            $scope.rutaPDF          = jsonObject.pdf_ruta;
            $scope.paginaActualPDF  = jsonObject.pdf_numeroPagina;
            if(!$scope.$$phase) {
                $scope.$apply();
            }
        });
    };


    // Listen to incoming Updates from Live_class_student we just suscribed to
    io.socket.on('live_class_student',function messageReceived(jsonObject) {

        switch (jsonObject.verb) {
            case 'updated':
                if(typeof jsonObject.data.id !== "undefined"){
                    $scope.idClase          = jsonObject.data.id;
                }
                if(typeof jsonObject.data.pdf_activo !== "undefined"){
                    $scope.estadoPDF        = jsonObject.data.pdf_activo;
                }
                if(typeof jsonObject.data.pdf_ruta !== "undefined"){
                    $scope.rutaPDF          = jsonObject.data.pdf_ruta;
                    $rootScope.$broadcast('pdfChange', $scope.rutaPDF);
                }
                if(typeof jsonObject.data.pdf_numeroPagina !== "undefined"){
                    $scope.paginaActualPDF  = jsonObject.data.pdf_numeroPagina;
                    $rootScope.$broadcast('pdfPageChange', $scope.paginaActualPDF);
                }
                if(!$scope.$$phase) {
                    $scope.$apply();
                }
            default: break;
        }
    });

}]);
