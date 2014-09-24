/**
 * Created by Maria Eugenia on 24/09/2014.
 */

app.controller('pdfViewer', ['$scope', '$rootScope', "$sailsBind", function ($scope, $rootScope, $sailsBind) {

    $scope.pdf = {}

    $scope.getpdf = function(file){
        PDFJS.getDocument(file).then(function(pdf){
        $scope.pdf = pdf;

        $scope.changePage(1);
        });
    }


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
    };

    $scope.$on('pdfPageChange', function(event, args) {
        $scope.changePage(args);
    });

    $scope.$on('pdfChange', function(event, args) {
        $scope.getpdf(args);
    });

}]);


