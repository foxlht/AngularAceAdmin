'use strict';

/**
 * @ngdoc function
 * @name angularAceAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularAceAdminApp
 */
angular.module('angularAceAdminApp')
  .controller('MainCtrl', [
    '$scope',
    'navDataList',
    function ($scope, navDataList) {
      $scope.treeViewList = navDataList;

      $scope.navbarInfo = {
        title: 'Angular Ace Admin',
        icon: 'fa-google'
      }
    }]);
