/**
 * Created by guille on 13/09/14.
 */


app.controller('update_PdfsController', ['$scope', '$rootScope', "$sailsBind",function($scope, $rootScope, $sailsBind) {

    $scope.live_class_students ={};
    /*io.socket.get('/api/live_class_student/',function messageReceived(jsonObject){
        $scope.avaibleClasses =jsonObject;
        if(!$scope.$$phase) {
            $scope.$apply();
        }
    })*/
    $sailsBind.bind("api/live_class_student", $scope);

    $scope.share = function(id,route,nombre){

        $scope.pdf_id       = id;
        $scope.pdf_nombre   = nombre;
        $scope.pdf_route    = route;

        io.socket.put('/api/live_class_student/'+ $scope.id_class_to_share, {pdf_activo: 'true', pdf_ruta: route});
        $rootScope.$broadcast('pdfChange', {file: route, pag: 1});
    };

    $scope.stopSharing = function(){

        $scope.pdf_id       = '';
        $scope.pdf_nombre   = '';
        $scope.pdf_route    = '';

        io.socket.put('/api/live_class_student/'+ $scope.id_class_to_share, {pdf_activo: 'false'});
    };

 /*   $scope.pageChange = function(numeroPagina){

        $scope.pdf_numeroPagina = numeroPagina;

        io.socket.put('/api/live_class_student/'+ $scope.id_class_to_share, {pdf_numeroPagina: 'true', pdf_ruta: route});

        $rootScope.$broadcast('pdfChangePage', pdf_numeroPagina);
    };*/

    $sailsBind.bind("api/pdf", $scope);
/*
    $scope.$on('pdfPageChanged', function(event, args) {
        io.socket.put('/api/live_class_student/'+ $scope.id_class_to_share, {pdf_numeroPagina: args});
    });
    */
}]);