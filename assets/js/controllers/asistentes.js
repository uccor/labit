/**
 * Created by martin on 03/10/14.
 */



app.controller("AsistentesCtrl", function ($scope, $sailsBind) {
    $sailsBind.bind("user", $scope);
    $scope.colorFor = {
        'Online': 'success',
        'Offline': 'danger'
    };
});