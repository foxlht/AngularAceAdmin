'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:aceSelectTreeCheck
 * @description
 * # aceSelectTreeCheck
 */
angular.module('angularAceAdminApp')
  .directive('aceSelectTreeCheck', function () {
    return {
      templateUrl: 'template/frame/selectTreeCheck/aceSelectTreeCheck.html',
      restrict: 'A',
      scope: {
        bindArray: '=',
        checkedArray: '=',
        keyTitle: '@',
        keyId: '@',
        keyChildren: '@',
        keyCheck: '@'
      },
      replace: true,
      link: function postLink(scope, element, attrs) {

      },
      controller: [
        '$scope',
        function ($scope) {

          // 选择框内显示的选中项
          $scope.showTitle = '';


          /**
           * 判断是含有子节点
           * 有返回false, 否则返回true
           * @param item
           */
          $scope.isLeaf = function (item) {
            return !item[$scope.keyChildren] || !item[$scope.keyChildren].length;
          };

          $scope.setBindObj = function (item) {
            $scope.bindObject = item;
          };

          $scope.checkObj = function (item) {
            // 阻止click事件冒泡广播
            $('.menu-item-title').bind("click", function (event) {
              event.stopPropagation();
            });
            checkChildrenNode(item);
            checkParentNode(item);
          };

          /**
           * 判断子选项的选中状态
           * 若子选项全部未选中, 则将该节点的选中状态设置为false
           * 若子选项中有一个的选中状态为true, 则该节点的选中状态为true
           * @param node
             */
          function isChildNodeEmpty(node) {
            var status = false;
            // 遍历子节点判断选中状态
            angular.forEach(node, function (item) {
              if (item[$scope.keyCheck]) {
                status = true;
              }
            });
            // 如果全部子节点都为未选中状态, 则将该节点的选中状态设置为false
            if (!status) {
              node[$scope.keyCheck] = false;
            }
            // 若子节点中还包含子节点, 则递归判断状态
            if (node[$scope.keyChildren].length !== 0) {
              isChildNodeEmpty(node[$scope.keyChildren]);
            }
          }

          /**
           * 选中全部的子节点
           * 若传入节点还包含子节点, 则将所有的子节点选中状态设置为和该节点的选中状态相同
           * @param item
             */
          function checkChildrenNode(item) {
            // 判断是否存在子节点
            if (item[$scope.keyChildren].length !== 0) {
              // 遍历子节点
              angular.forEach(item[$scope.keyChildren], function (itemNode) {
                // 设置子节点的选中状态和父级节点相同的状态
                itemNode[$scope.keyCheck] = item[$scope.keyCheck];
                if (item[$scope.keyChildren][$scope.keyCheck]) {
                  item[$scope.keyCheck] = true;
                }
                // 若子节点还包含子节点, 则递归设置选中状态
                if (itemNode[$scope.keyChildren].length !== 0) {
                  checkChildrenNode(itemNode);
                }
              })
            }
          }

          // 获得父级节点并设置父节点状态
          function checkParentNode(childNode) {
            var parentNode = null;

            var arr = {};
            arr[$scope.keyChildren] = $scope.bindArray;

            // 通过遍历获得父级节点
            (function _getParentNode(item) {
              angular.forEach(item[$scope.keyChildren], function (_item) {
                if (_item[$scope.keyId] == childNode[$scope.keyId]) {
                  parentNode = item;
                  return;
                } else {
                  _getParentNode(_item);
                }
              })
            })(arr);

            // 根据父节点的各个子节点状态判断选中状态, 若子节点选中状态全部为false, 则父节点的选中状态为false 否则为true
            if (parentNode) {
              var checkStatus = false;
              angular.forEach(parentNode[$scope.keyChildren], function (item) {
                if (!checkStatus && item[$scope.keyCheck]) {
                  checkStatus = true;
                }
              });

              // 设置父节点状态
              (function _setParentNodeCheckStatus(item) {
                angular.forEach(item, function (_item) {
                  if (_item[$scope.keyId] == parentNode[$scope.keyId]) {
                    _item[$scope.keyCheck] = checkStatus;
                    checkParentNode(_item);
                  } else {
                    _setParentNodeCheckStatus(_item[$scope.keyChildren])
                  }
                });
              })($scope.bindArray);
            }


          }

          // 获得全部选中项的id
          function getCheckedIds(item) {
            angular.forEach(item, function (itemData, index) {
              if (itemData[$scope.keyCheck]) {
                $scope.checkedArray.push(itemData[$scope.keyId]);
              }
              if (itemData[$scope.keyChildren]) {
                getCheckedIds(itemData[$scope.keyChildren]);
              }
            })
          }

          // 监听bindArray的变化, 一旦值发生了改变, 则重新遍历选中项的id
          $scope.$watch('bindArray', function (newValue, oldValue) {
            if (newValue != oldValue) {
              $scope.checkedArray = [];
              $scope.showTitle = '';
              getCheckedIds($scope.bindArray);
              // isChildNodeEmpty($scope.bindArray);
            }
          }, true);
        }
      ]
    };
  });
