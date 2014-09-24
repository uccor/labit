/**
 * Created by Maria Eugenia on 24/09/2014.
 */

app.controller('pdfViewer', ['$scope', '$rootScope', "$sailsBind", function ($scope, $rootScope, $sailsBind) {

    $scope.pdf = {}

    $scope.pageNum = 0;
    $scope.pageRendering = false;
    $scope.pageNumPending = null;
    $scope.pageTotal = 0;

    $scope.getpdf = function(file){
        $scope.pageNum = 1;
        PDFJS.getDocument(file).then(function(pdf){
        $scope.pdf = pdf;
        $scope.changePage(1);

        });

    }


    $scope.changePage = function (pagina) {

        $scope.pageTotal = $scope.pdf.numPages;

        if ($scope.pageRendering) {
            $scope.pageNumPending = pagina;
            return;
        }

        $scope.pageRendering = true;

        $scope.pdf.getPage(pagina).then(function (page) {

            var scale = 1;
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
            var renderTask = page.render(renderContext);

            renderTask.promise.then(function () {

                $scope.pageRendering = false;
                if ($scope.pageNumPending !== null) {
                    // New page rendering is pending
                    $scope.changePage($scope.pageNumPending);
                    $scope.pageNumPending = null;
                }
            });
        });
    };

    $scope.$on('pdfPageChange', function(event, args) {
        $scope.changePage(args);
    });

    $scope.$on('pdfChange', function(event, args) {
        $scope.getpdf(args);
    });

    $scope.prevPage = function() {
        if ($scope.pageNum <= 1) {
            return;
        }
        $scope.pageNum--;
        $scope.changePage($scope.pageNum);
    };

    $scope.nextPage = function() {
        if ($scope.pageNum >= $scope.pageTotal) {
            return;
        }
        $scope.pageNum++;
        $scope.changePage($scope.pageNum);
    };
}]);


