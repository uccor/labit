/**
 * Created by guille on 13/09/14.
 */
function customersController($scope,$http) {
    $http.get("/api/pdf")
        .success(function(response) {$scope.names = response;});
}