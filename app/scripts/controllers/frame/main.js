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


      // 导航栏 Title & 图标 (Font Awesome)
      $scope.navbarInfo = {
        title: 'Angular Ace Admin',
        icon: 'fa-google'
      };

      // 用户基本信息
      $scope.userInfo = {
        username: 'Manster'
      };

      // 修改密码
      $scope.changePassword = function () {
        console.log('change password');
      };

      // 退出登录
      $scope.signOut = function () {
        console.log('sign out');
      };
    }]);
