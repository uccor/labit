/**
 * Created by guille on 13/09/14.
 */
var app_getPdfs = angular.module('labit-app',['ngSailsBind']);


app_getPdfs.controller('update_PdfsController', ['$scope', "$sailsBind",function($scope, $sailsBind) {
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

app_getPdfs.controller('share_PdfsController', ['$scope','$http',function($scope,$http) {

    $scope.share = function(id,route){
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
    /*
    $scope.person = {
            share:function(id){

                $http.put("/api/pdf",[{}])
                    .success(function(data) {
                        $scope.list_pdf =  data ;
                    })
                    .error(function(){
                        alert("error");
                    });

            }
        };

*/
}]);
