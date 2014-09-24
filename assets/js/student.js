
app.controller('contentShared', ['$scope', "$sailsBind", function ($scope, $sailsBind) {

    $scope.pdf = {}

    $scope.changePage = function (pagina) {

        $scope.pdf.getPage(pagina).then(function (page) {
            var scale = 1.5;
            var viewport = page.getViewport(scale);

            // Prepare canvas using PDF page dimensions
            var canvas = document.getElementById('contentShareCanvas');
            var context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            // Render PDF page into canvas context
            var renderContext = {
                canvasContext: context,
                viewport: viewport
            };
            page.render(renderContext);
        });
    }

    //Subscribe to live_class_student  :
    $scope.subscribe_to_class = function () {

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
    /*
    io.socket.get('/api/live_class_student/CLASS1',function messageReceived(jsonObject) {

        $scope.idClase          = jsonObject.id;
        $scope.estadoPDF        = jsonObject.pdf_activo;
        $scope.rutaPDF          = jsonObject.pdf_ruta;
        $scope.paginaActualPDF  = jsonObject.pdf_numeroPagina;
        if(!$scope.$$phase) {
            $scope.$apply();
        }
    });*/

    // Listen to incoming Updates from Live_class_student we just suscribed to
    io.socket.on('live_class_student',function messageReceived(jsonObject) {

        switch (jsonObject.verb) {
            case 'updated':
                if(typeof jsonObject.data.id !== "undefined"){
                    $scope.idClase           = jsonObject.data.id;
                }
                if(typeof jsonObject.data.pdf_activo !== "undefined"){
                    $scope.estadoPDF        = jsonObject.data.pdf_activo;
                }
                if(typeof jsonObject.data.pdf_ruta !== "undefined"){
                    $scope.rutaPDF          = jsonObject.data.pdf_ruta;
                }
                if(typeof jsonObject.data.pdf_numeroPagina !== "undefined"){
                    $scope.paginaActualPDF  = jsonObject.data.pdf_numeroPagina;
                }
                if(!$scope.$$phase) {
                    $scope.$apply();
                }
            default: break;
        }
    });

}]);
