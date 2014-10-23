/**
 * Created by Mojarritas on 11/10/14.
 */

app.controller('professorFileShare', ['$scope', '$rootScope', "$sailsBind", function ($scope, $rootScope, $sailsBind) {

    $scope.live_class_students = {};
    $scope.warning = {
        msg: '',
        class: 'hidden'
    };

    /**
     * Funcion que se encarga de compartir el PDF
     * @method share
     * @param {} id
     * @param {} route
     * @param {} nombre
     * @return 
     */
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

    /**
     * Funcion que permite guardar modificaciones en el nombre del PDF
     * @method savePdf
     * @param {} data
     * @param {} id
     * @return 
     */
    $scope.savePdf = function (data, id) {
        angular.extend(data, {id: id});
        $scope.pdfs.push(data);
        console.log(JSON.stringify(data));
    };

    /**
     * Funcion que permite borrar el PDF de una lista de PDF's
     * @method removePdf
     * @param {} index
     * @return 
     */
    $scope.removePdf = function (index) {
        $scope.pdfs.splice(index, 1);
    };

    $sailsBind.bind("api/pdf", $scope);

}]);