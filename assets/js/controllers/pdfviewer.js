/**
 * Created by Maria Eugenia on 24/09/2014.
 */

app.controller('pdfViewer', ['$scope', '$rootScope', "$sailsBind", function ($scope, $rootScope, $sailsBind) {

    $scope.pdf = {};
    $scope.pdfUrl;

    $scope.pageNum = 0;
    $scope.pageRendering = false;
    $scope.pageNumPending = null;
    $scope.pageTotal = 0;
    $scope.navigation = false;

    $scope.getpdf = function (file, pag, navigation) {
        pag = typeof pag !== 'undefined' ? pag : 1;
        navigation = typeof navigation !== 'undefined' ? navigation : true;
        if (file == '') {
            $scope.pageNum = 0;
            $scope.pageTotal = 0;
            $scope.pdfUrl = '';
            $scope.navigation = false;

            // Limpio el canvas
            var canvas = document.getElementById('contentShareCanvas');
            var ctx = canvas.getContext('2d');
            // Store the current transformation matrix
            ctx.save();

            // Use the identity matrix while clearing the canvas
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Restore the transform
            ctx.restore();

        } else {
            $scope.navigation = navigation;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
            if (file != $scope.pdfUrl) {
                $scope.pdfUrl = file;
                PDFJS.getDocument(file).then(function (pdf) {
                    $scope.pdf = pdf;
                    $scope.pageTotal = pdf.numPages;
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                    $scope.changePage(pag);
                });
            } else if ($scope.pageNum != pag) {
                $scope.changePage(pag);
            }
        }
    }


    $scope.changePage = function (pagina) {

        $scope.pageTotal = $scope.pdf.numPages;
        $scope.pageNum = pagina;

        if ($scope.pageRendering) {
            $scope.pageNumPending = pagina;
            return;
        }

        $scope.pageRendering = true;

        $scope.pdf.getPage(pagina).then(function (page) {
            // Prepare canvas using PDF page dimensions
            var canvas = document.getElementById('contentShareCanvas');
            var context = canvas.getContext('2d');
            var scale = 1;
            canvas.width = canvas.offsetWidth;

            var viewport = page.getViewport(canvas.width / page.getViewport(1.0).width);


            canvas.height = viewport.height;

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
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            });
        });
    };
    $scope.prevPage = function () {
        if ($scope.pageNum <= 1) {
            return;
        }
        $scope.pageNum--;
        $scope.changePage($scope.pageNum);
    };

    $scope.nextPage = function () {
        if ($scope.pageNum >= $scope.pageTotal) {
            return;
        }
        $scope.pageNum++;
        $scope.changePage($scope.pageNum);
    };
    $scope.$on('pdfChange', function (event, args) {
        $scope.getpdf(args.file, args.pag, args.nav);
    });

}]);


