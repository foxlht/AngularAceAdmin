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
      // 树形菜单列表
      $scope.treeViewList = navDataList;

      // 更新页面标题的监听
      $scope.$on('updatePageHeaderTitle', function (event, pageHeaderInfo) {
        $scope.pageHeader = pageHeaderInfo;
      });

      // 导航栏 Title & Icon (Font Awesome)
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
