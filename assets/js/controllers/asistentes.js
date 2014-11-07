/**
 * Created by martin on 03/10/14.
 */



app.controller("Asistentes", function ($scope, $sailsBind) {
    $scope.$parent.getLiveClassStudent().then(function (liveClassID) {

        $sailsBind.bind("api/user", $scope, {"role": "student"});
        $scope.colorFor = {
            'Online': 'success',
            'Offline': 'danger'
        };
    });
});