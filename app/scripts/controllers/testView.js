'use strict';

/**
 * @ngdoc function
 * @name angularAceAdminApp.controller:TestViewCtrl
 * @description
 * # TestViewCtrl
 * Controller of the angularAceAdminApp
 */
angular.module('angularAceAdminApp')
  .controller('TestViewCtrl', [
    '$scope',
    '$q',
    'CommonService',
    function ($scope, $q, CommonService) {

      $scope.modalViewConfig = {
        title: '模态框测试',
        show: false
      };

      $scope.showModal = function () {
        CommonService.messageModal().show('测试消息模态框', function () {
          console.log('测试消息模态框')
        });
      };

      $scope.treeList = [];
      $scope.idArray = [];

      function getTreeList() {
        var defer = $q.defer();
        CommonService.requestDataFromServerWithLoading(defer, null, 'json/permissionTree.json').then(function (data) {
          $scope.treeList = data;
        });
      }

      getTreeList();



    }
  ]);
