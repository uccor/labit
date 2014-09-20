/**
 * Created by guille on 13/09/14.
 */
var app_getPdfs = angular.module('labit-app',['ngSailsBind']);


app_getPdfs.controller('update_PdfsController', ['$scope', "$sailsBind",'$http',function($scope, $sailsBind, $http) {

    $sailsBind.bind("pdf", $scope,'api/');

    $scope.share = function(id, route){
        $scope.radioButtonState = id;
        $http.put('/live_class_student/' +id, {"pdf_activo": 'true'})
            .success(function(response, status, headers, config){
                alert("STATUS:"+status);
                if(status == '200'){
                    $scope.pdf_route = route;
                    // $sailsBind.bind("Live_class_student", $scope, {"id": {"contains": id}});
                }
            })
            .error(function(response, status, headers, config){
                alert(status);
            });
    };

}]);
