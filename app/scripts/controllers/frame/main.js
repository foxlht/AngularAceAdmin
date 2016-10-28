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
    '$rootScope',
    'navDataList',
    function ($scope, $rootScope, navDataList) {
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


      /** * * * * * * * * * * * * * * * * * * * *
       *                模态框
       ** * * * * * * * * * * * * * * * * * * * *
       */
      $scope.modalViewConfig = {
        title: '提示',
        show: false,
        modalFooterBlock: true,
        message: ''
      };

      /**
       * 显示模态框
       * @param message 模态框所要显示的信息
       * @param callback 显示模态框的同时所需要执行的回调函数
         */
      $rootScope.showMessageModal = function (message, callback) {
        if (callback) {
          callback();
        }
        $scope.modalViewConfig.message = message;
        $scope.modalViewConfig.show = true;
      };

      /**
       * 隐藏模态框
       */
      $rootScope.hideMessageModal = function () {
        $scope.modalViewConfig.show = false;
      }


    }]);
