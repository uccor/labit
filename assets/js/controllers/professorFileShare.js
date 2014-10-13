/**
 * Created by martin on 11/10/14.
 */

app.controller('professorFileShare', ['$scope', '$rootScope', "$sailsBind", function ($scope, $rootScope, $sailsBind) {

    $scope.live_class_students = {};
    $scope.warning = {
        msg: '',
        class: 'hidden'
    };

    $scope.share = function (id, route, nombre) {

        $scope.pdf_id = id;
        $scope.pdf_nombre = nombre;
        $scope.pdf_route = route;

        if ($scope.$parent.id_class_to_share != '' && typeof $scope.$parent.id_class_to_share !== 'undefined') {
            $rootScope.$broadcast('pdfChange', {file: route, pag: 1, name: nombre});
            $scope.warning.msg = "";
            $scope.warning.class = 'hidden';
        }
        else {
            $scope.warning.msg = "Seleccione una clase";
            $scope.warning.class = '';
        }
    };

    $sailsBind.bind("api/pdf", $scope);

}]);