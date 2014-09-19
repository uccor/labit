/**
 * Created by guille on 13/09/14.
 */
var app_getPdfs = angular.module('labit-app',['ngSailsBind']);


app_getPdfs.controller('PdfsController', ['$scope', "$sailsBind",function($scope, $sailsBind) {
    //$scope. =[{nombre:"PDF1",num:'1'}];
   /* $http.get("/api/pdf")
        .success(function(data) {
            $scope.list_pdf =  data ;
        })
        .error(function(){
            alert("error");
        });*/

    $sailsBind.bind("pdf", $scope);
}]);

