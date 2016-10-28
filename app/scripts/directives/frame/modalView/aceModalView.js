'use strict';

/**
 * @ngdoc directive
 * @name angularAceAdminApp.directive:aceModalView
 * @description
 * # aceModalView
 */
angular.module('angularAceAdminApp')
  .directive('aceModalView', function () {
    return {
      templateUrl: 'template/frame/modalView/aceModalView.html',
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: {
        modalTitle: '=',      // 模态框的标题
        modalShow: '=',       // 模态框的显示与隐藏, 当值为true时显示模态框, 反之则隐藏
        modalSize: '=',       // 模态框的尺寸选项, 可省略
        modalBtnText: '=',    // 模态框按钮的文字, 当 modalFooterBlock 为false时, 此按钮不会显示
        modalBtnStyle: '=',   // 模态框按钮颜色的选项, 有danger、info、success、和primary四种选择, 默认为primary
        modalFooterBlock: '=',// 用于判断是否显示模态框的footer部分, 一般当模态框内部插入一个表单时, 将此选项设置为false
        modalViewSubmit: '&', // 此处应传入一个方法, 当点击模态框footer的自定义按钮时调用
        modalViewClose: '&'   // 此处应传入一个方法, 当模态框关闭时调用此方法
      },
      link: function (scope, element, attrs) {

        // 监听bootstrap的关闭模态框事件, 当触发此事件时, 关闭模态框, 并执行相应的函数
        $(element).on('hidden.bs.modal', function (e) {
          scope.$apply(function () {
            scope.modalShow = false;
            if (scope.modalViewClose) {
              scope.modalViewClose();
            }
          });
        });
        
        // 监听modalShow值的变化, 并进行相应的显示与隐藏
        // 由于angular的思想是通过事件或属性去驱动试图的变化
        // 所以在此我们监听了modalShow的值, 以此来驱动模态框的显示与隐藏
        scope.$watch('modalShow', function (newVal, oldVal) {
          if (newVal) {
            $(element).modal('show');
          } else {
            $(element).modal('hide');
          }
        });

        // 设置模态框尺寸
        scope.modalViewSize = function () {
          if (scope.modalSize == 'large') {
            return true;
          } else if (scope.modalSize == 'small') {
            return false;
          }
        };

        // 模态框按钮的颜色
        scope.modalBtnClass = function () {
          var returnValue = 'btn-primary';

          switch (scope.modalBtnStyle) {
            case 'danger':
              returnValue = 'btn-danger';
              break;
            case 'info':
              returnValue = 'btn-info';
              break;
            case 'success':
              returnValue = 'btn-success';
              break;
          }

          return returnValue;

        };

        // 点击关闭按钮时调用此方法
        scope.onCloseBtnClick = function () {
          scope.$broadcast('event_modalViewClose');
          scope.modalViewClose();
        };

      }
    };
  });
