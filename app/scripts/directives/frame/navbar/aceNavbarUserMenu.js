'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:aceNavbarUserMenu
 * @description
 * # aceNavbarUserMenu
 */
angular.module('angularAceAdminApp')
  .directive('aceNavbarUserMenu', function () {
    return {
      templateUrl: 'template/frame/navbar/aceNavbarUserMenu.html',
      restrict: 'EA',
      replace: true,
      controller: [
        '$scope',
        function ($scope) {
          // 用户基本信息
          $scope.userInfo = {
            username: 'Manster'
          };

          // 修改密码
          $scope.changePassword = function () {

          };

          // 退出登录
          $scope.signOut = function () {

          };
        }
      ]
    };
  });
