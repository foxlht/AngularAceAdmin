'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:aceSelectTree
 * @description
 * # aceSelectTree
 */
angular.module('angularAceAdminApp')
  .directive('aceSelectTree', function () {
    return {
      templateUrl: 'template/frame/selectTree/aceSelectTree.html',
      restrict: 'A',
      scope: {
        bindObject: '=',  // 绑定的对象
        bindArray: '=',   // 树形列表的数据源
        keyTitle: '@',    // 树形数据中, 要显示在列表中的标题
        keyId: '@',       // 树形数据中, 元素的主键
        keyChildren: '@'  // 树形数据中, 子项的key
      },
      replace: true,
      controller: [
        '$scope',
        function ($scope) {

          // 选中项的标题
          $scope.showTitle = "";

          /**
           * 判断是含有子节点
           * 有返回false, 否则返回true
           * @param item
           */
          $scope.isLeaf = function (item) {
            return !item[$scope.keyChildren] || !item[$scope.keyChildren].length;
          };

          /**
           * 设置绑定对象
           * @param item
           */
          $scope.setBindObj = function (item) {
            $scope.bindObject = item;
          };

          $scope.$watch('bindObject', function (newVal, oldVal) {
            if (!newVal) {
              $scope.showTitle = "";
            }
          });

          /**
           * 判断元素是否为选中项, 返回值为Boolean类型, 返回true时代表该项为选中向, 否则返回false
           * @param item
           * @returns {boolean}
           */
          $scope.isSelectObj = function (item) {
            if (item[$scope.keyId] == $scope.bindObject[$scope.keyId]) {
              $scope.showTitle = item[$scope.keyTitle];
            }
            return item[$scope.keyId] == $scope.bindObject[$scope.keyId];
          };
        }
      ]
    };
  });
