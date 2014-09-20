/**
 * Created by guille on 13/09/14.
 */
//var app = angular.module('labit-app', ['ngSailsBind', 'http']);

app.controller('update_PdfsController', ['$scope', "$sailsBind",'$http',function($scope, $sailsBind, $http) {

    $sailsBind.bind("api/pdf", $scope);

    $scope.share = function(id, route){
        $scope.radioButtonState = id;
        $http.put('/api/live_class_student/' +id, {"pdf_activo": 'true'})
            .success(function(response, status, headers, config){
                if(status == '200'){
                    alert("Archivo compartido");
                    $scope.pdf_route = route;
                    $sailsBind.bind("api/live_class_student", $scope, {"id": {"contains": id}});
                }
            })
            .error(function(response, status, headers, config){
                alert(status);
            });
    };

}]);
