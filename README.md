# Angular Ace Admin
==========
##简介
>**Angular Ace Admin**为后台模版 **Ace Admin** 和 **AngularJs** 组合搭建的一个后台框架, 目前实现的功能有树形菜单自动递归深度、点击树形菜单后自动更新breadcrumb导航和页面标题。路由定义使用 **ui.route** , 可以根据自己的需要在同一个页面分发不同的视图。后期计划继续封装一些常用的组件（datepicker、toggle button等）。
由于本人第一次尝试封装框架，所以会有很多不完善的地方，欢迎大家提出建议并指出不足, 最后感谢Ace Admin的作者提供这么优秀的后台框架。

##完成进度
### v 0.1.0
1. 完成框架的整体搭建
2. 树形菜单动态创建并自动递归深度
3. 点击树形菜单自动更新breadcrumb导航和页面标题


##Directive
###ace-navbar
1. `navbar-info` 配置导航栏的标题和图标,
JSON格式如下:

		{
			"title": "Angular Ace Admin",
			"icon": "fa-google"
		}
2. `user-info` 用户的信息,
JSON格式如下:

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
		

###ace-tree-view
1. `tree-view-list`: 树形菜单的数据, 数据应该从`navigationServices`中获取, JSON的层级可以无限嵌套, 自动递归出层级深度, JSON格式为：
		
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
	
