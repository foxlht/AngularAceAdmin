# ace-tree-view

--------------------------------------------------------------------------------

## 说明

　　`ace-tree-view`是主页面左侧的树形菜单，通过模版的递归实现了无限深度的树状结构目录。基本api如下：

|      属性       |  类型   |   简介    |         备注|
|:------------: | :---: | :-----: | :----------------:|
|tree-view-list | Array | 树形菜单的数据 | 数据可以通过跳转到主页面之前进行预加载|

　　数据可以在跳转到主页面之前进行预加载，并在`MainCtrl`中注入预加载的数据：

app.js:

```javascript
// app.js
$stateProvider
    .state('main', {
        url: '/main',
        templateUrl: 'views/frame/main.html',
        controller: 'MainCtrl',
        resolve: {
          navDataList: [
            'NavigationServices',
            '$q',
            function (NavigationServices, $q) {
              var defer = $q.defer();
              NavigationServices.getNavigationData().then(function (data) {
                defer.resolve(data);
              });
              return defer.promise;
            }
         ]
      }
    })
```

MainCtrl:

```javascript
angular.module('angularAceAdminApp')
    .controller('MainCtrl', [
        '$scope',
        'navDataList',
        function ($scope, navDataList) {
          // 树形菜单列表
          $scope.treeViewList = navDataList;
        }
      ]
    );
```

Html：

```html
<div ace-tree-view tree-view-list="treeViewList"></div>
```

　　因为采用了预加载数据的方式，所以当预加载数据没有到达时，页面不会进行跳转。此时应弹出遮罩层以提示用户，避免在网络环境较差的情况下造成不好的用户体验。

## 基本功能介绍

1. `tree-view-list`

  　　树形菜单的数据, 数据应该从navigationServices中获取, JSON的层级可以无限嵌套, 自动递归出层级深度, `title`为菜单标题、`icon`为菜单图标(图标为Font Awesome的字体图标，请查看官方的[字体库](http://fontawesome.io/icons/))、`children`为子项、`link`为菜单的链接、`activeStatus`用于判断该菜单是否被选中，从后台获取到的数据中，该项应全部为false，JSON格式如下：

  ```JSON
  [
      {
          "title": "菜单标题",
          "icon": "fa-bus",
          "children": [
              {
                 "title": "子菜单1",
                 "link": "子菜单链接1",
                 "activeStatus": false
              },
              {
                 "title": "子菜单2",
                 "link": "子菜单链接2",
                 "activeStatus": false
              }
          ]
      }
  ]
  ```
