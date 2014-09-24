/**
 * Created by guille on 13/09/14.
 */

var app = angular.module('labit-app', ['ngSailsBind']);

app.controller('update_PdfsController', ['$scope', "$sailsBind",function($scope, $sailsBind) {

    $scope.share = function(id,route,nombre){

        $scope.pdf_id       = id;
        $scope.pdf_nombre   = nombre;
        $scope.pdf_route    = route;

        io.socket.put('/api/live_class_student/'+ $scope.id_class_to_share, {pdf_activo: 'true', pdf_ruta: route});
    };

    $scope.stopSharing = function(){

        $scope.pdf_id       = '';
        $scope.pdf_nombre   = '';
        $scope.pdf_route    = '';

        io.socket.put('/api/live_class_student/'+ $scope.id_class_to_share, {pdf_activo: 'false'});
    };

    $sailsBind.bind("api/pdf", $scope);


}]);
