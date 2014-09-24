/**
 * Created by guille on 13/09/14.
 */

var app = angular.module('labit-app', ['ngSailsBind']);

app.controller('update_PdfsController', ['$scope', '$rootScope', "$sailsBind",function($scope, $rootScope, $sailsBind) {

    $scope.avaibleClasses ={};
    io.socket.get('/api/live_class_student/',function messageReceived(jsonObject){
        $scope.avaibleClasses =jsonObject;
        if(!$scope.$$phase) {
            $scope.$apply();
        }
    })

    $scope.share = function(id,route,nombre){

        $scope.pdf_id       = id;
        $scope.pdf_nombre   = nombre;
        $scope.pdf_route    = route;

        io.socket.put('/api/live_class_student/'+ $scope.id_class_to_share, {pdf_activo: 'true', pdf_ruta: route});
        $rootScope.$broadcast('pdfChange', route);
    };

    $scope.stopSharing = function(){

        $scope.pdf_id       = '';
        $scope.pdf_nombre   = '';
        $scope.pdf_route    = '';

        io.socket.put('/api/live_class_student/'+ $scope.id_class_to_share, {pdf_activo: 'false'});
    };

    $scope.pageChange = function(numeroPagina){

        $scope.pdf_numeroPagina = numeroPagina;

        io.socket.put('/api/live_class_student/'+ $scope.id_class_to_share, {pdf_numeroPagina: 'true', pdf_ruta: route});

        $rootScope.$broadcast('pdfPageChange', pdf_numeroPagina);
    };

    $sailsBind.bind("api/pdf", $scope);

}]);