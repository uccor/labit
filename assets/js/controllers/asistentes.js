/**
 * Created by martin on 03/10/14.
 */



app.controller("Asistentes", function ($scope, $sailsBind) {
    $sailsBind.bind("api/user", $scope);
    $scope.colorFor = {
        'Online': 'success',
        'Offline': 'danger'
    };
});