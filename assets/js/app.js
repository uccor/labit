/**
 * Created by martin on 03/10/14.
 */

var app = angular.module('labitApp', ['ngSailsBind','ngRoute','xeditable','toastr']);

app.run(function (editableOptions){

    editableOptions.theme = 'bs3';
});