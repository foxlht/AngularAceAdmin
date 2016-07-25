# Angular Ace Admin

----

## 简介

>**Angular Ace Admin**为后台模版 **Ace Admin** 和 **AngularJs** 组合搭建的一个后台框架, 目前实现的功能有树形菜单自动递归深度、点击树形菜单后自动更新breadcrumb导航和页面标题。路由定义使用 **ui.route** , 可以根据自己的需要在同一个页面分发不同的视图。后期计划继续封装一些常用的组件（datepicker、toggle button等）。
由于本人第一次尝试封装框架，所以会有很多不完善的地方，欢迎大家提出建议并指出不足, 最后感谢Ace Admin的作者提供这么优秀的后台框架。

## 完成进度

### v 0.1.0

1. 完成框架的整体搭建
2. 树形菜单动态创建并自动递归深度
3. 点击树形菜单自动更新breadcrumb导航和页面标题

### V 0.1.1

1. 完成Toggle Button指令的封装
2. 完成Modal View指令的封装


## Directive

### ace-navbar

1. `navbar-info` 配置导航栏的标题和图标, JSON格式如下:

		{
			"title": "Angular Ace Admin",
			"icon": "fa-google"
		}

2. `user-info` 用户的信息, JSON格式如下:

		{
			"name": "Manster"
		}

3. `change-password` 修改密码, 应传入一个方法:

		$scope.changePassword = function () {
			do something...
		};

		<div ace-navbar change-password="changePassword()"></div>

4. `sign-out` 退出登录, 应传入一个方法

		$scope.signOut = function () {
			do something...
		};

		<div ace-navbar sign-out="signOut()"></div>

	调用：

		<div ace-navbar change-password="changePassword()" sign-out="signOut()" user-info="userInfo"></div>


### ace-tree-view

1. `tree-view-list` 树形菜单的数据, 数据应该从`navigationServices`中获取, JSON的层级可以无限嵌套, 自动递归出层级深度, JSON格式为：

		[
			{
    			"title": "菜单标题",
			    "icon": "菜单图标",
			    "children": [ // 子菜单项
			      {
        			"title": "子菜单1",
		        	"link": "子菜单链接",
	        		"activeStatus": false
			      },
			      {
        			"title": "子菜单2",
		        	"link": "子菜单链接,
					"activeStatus": false
			      },
			      ...
				]
			},
			...
		]
请求JSON数据

		function ($scope, NavigationServices) {
			NavigationServices.getNavigationData().then(function (data) {
                  $scope.treeViewList = data;
                });
       	}
调用

 		 <div ace-tree-view tree-view-list="treeViewList"></div>

### ace-toggle-button

1. `btn-title` 按钮后要显示的文字, 当点击文字时按钮也会被选中或取消。

        <div ace-toggle-button btn-title="btnInfo.title"></div>

2. `btn-style` 选择按钮的样式（从1到7，或ace-switch-1到ace-switch-7）

        <div ace-toggle-button btn-style="1"></div>
        ...
        <div ace-toggle-button btn-style="7"></div>

    或

        <div ace-toggle-button btn-style="'ace-switch-1'"></div>
        ...
        <div ace-toggle-button btn-style="'ace-switch-7'"></div>

3. `btn-model` 和按钮绑定的对象

        <div ace-toggle-button btn-model="bindObject"></div>

### ace-modal-view
1. `modal-title` 模态框标题，双向数据绑定

        <div ace-modal-view modal-title="'This is a modal view.'"></div>

2. `modal-size` 模态框的尺寸，分别为`large`、`normal`和`small`，默认为`normal`

        <div ace-modal-view modal-size="'large'"></div>

3. `modal-btn-text` 模态框确认按钮的文字

		<div ace-modal-view modal-btn-text="'保存'"></div>

4. `modal-btn-style` 模态框确认按钮的颜色，分别为`primary`、`success`、`info`和`danger`, 默认为`danger`

		<div ace-modal-view modal-btn-style="'primary'"></div>

5. `modal-show` 用于判断模态框是否, 当**modal-show**绑定对象的值为**true**时, 显示模态框, 否则不显示

6.  `modal-view-submit` 当点击确认按钮时所需要执行的方法

		$scope.submit = function () {
			do something ...
		}

		<div ace-modal-view modal-view-submit="submit()"></div>

7. `modal-view-close` 当点击关闭或取消按钮时所需要执行的方法。

		$scope.onModalClose = function () {
			do something ...
		}

		<div ace-modal-view modal-view-close="onModalClose()"></div>

### ace-pagination

1. `pagination-conf` 分页的配置对象， 包含三个属性：`currentPage` 当前的页码, 默认为1; `itemsPerPage` 每页显示的条目, 默认为10; `totalItems` 总条目数 (必选)

		var paginationConf = {
			currentPage: 1,
			itemsPerPage: 10,
			totalItems: 287
		};

		<div ace-pagination pagination-conf="paginationConf"></div>

2. `pagination-click` 点击页码时执行的函数, 可在此函数中执行请求数据等操作。

		var paginationConf = {
			currentPage: 1,
			itemsPerPage: 10,
			totalItems: 287
		};

		$scope.getData = function () {
			dataService.getData().then(function (data) {
				do something...
			});
		};

		<div ace-pagination pagination-conf="paginationConf" pagination-click="getData()"></div>
