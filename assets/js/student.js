var app = angular.module('labit-app', ['ngSailsBind']);

app.controller('contentShared', ['$scope', "$sailsBind", function ($scope, $sailsBind) {

    $scope.pdf = {}

    $scope.changePage = function (pagina) {

        $scope.pdf.getPage(pagina).then(function (page) {
            var scale = 1.5;
            var viewport = page.getViewport(scale);

            // Prepare canvas using PDF page dimensions
            var canvas = document.getElementById('contentShareCanvas');
            var context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            // Render PDF page into canvas context
            var renderContext = {
                canvasContext: context,
                viewport: viewport
            };
            page.render(renderContext);
        });
    }

    $sailsBind.bind("api/live_class_student", $scope);


}]);
