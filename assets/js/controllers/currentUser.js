/**
 * Created by martin on 03/10/14.
 */

app.controller('CurrentUserController', ['$scope', function ($scope) {
    $scope.currentUsers = [
        {text: 'learn angular', done: true},
        {text: 'build an angular app', done: false}
    ];

}]);
