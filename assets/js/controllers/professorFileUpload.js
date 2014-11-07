/**
 * Created by Fabricio on 17/10/2014.
 */

app.controller("uploadFormController", function ($scope) {

  /*
   $scope.fileChanged = function () {
   console.log($scope.uploaded_file);
   //console.log();
   }*/
  $scope.testFormUpolad = function () {
    var fileVal = document.getElementById("uploadFile");
    if ($scope.newName_file_toUpload && fileVal.value) {
      return false;
    } else {
      return true;
    }
  }
});
