'use strict';

/**
 * @ngdoc function
 * @name angularAceAdminApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the angularAceAdminApp
 */
angular.module('angularAceAdminApp')
  .controller('LoginCtrl', [
    '$scope',
    '$state',
    function ($scope, $state) {
      $scope.loginInfo = {
        'title': 'Angular Ace Admin'
      };

      $scope.login = function () {
        $state.go('main');
      };
    }]);
