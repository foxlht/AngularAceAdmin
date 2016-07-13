# Angular Ace Admin
==========


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
1. `tree-view-list`: 树形菜单的数据, 数据应该从`navigationServices`中获取, JSON格式为：
		
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

