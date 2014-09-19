/**
 * Created by guille on 13/09/14.
 */
var app_getPdfs = angular.module('app_getPdfs',[]);


app_getPdfs.controller('getPdfsController', ['$scope','$http', function($scope,$http) {

    $http.get("/api/pdf")
        .success(function(data) {
            $scope.list_pdf =  data ;
        })
        .error(function(){
            alert("error");
        });
}]);

