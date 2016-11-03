# ace-toggle-button

--------------------------------------------------------------------------------

## 说明

`ace-toggle-button`为开关按钮，提供了7种显示样式，一般用于设置项的启动于关闭。基本api如下：

   属性     |                      类型                       |   简介    |    备注
:-------: | :---------------------------------------------: | :-----: | :-------:
btn-title |                    String                     | 按钮的提示文字 |     无
btn-style | [1, ..., 7]或[ace-switch-1, ..., ace-switch-7] |  按钮的样式  | 默认为1，详情请见api介绍
btn-model |                    Boolean                    | 按钮绑定的对象 |     无

Javascript

```javascript
$scope.btnConf = {
    title: 'Sample Toggle Button',
    style: 'ace-switch-7',
    status: true
}
```

Html

```html
<div ace-toggle-button btn-title="btnConf.title"  btn-model="btnConf.status" btn-style="btnConf.style"></div>
```

## 基本功能介绍

1. `btn-title`

  　　按钮右侧显示的文字，当点击文字时按钮也会被选中或取消。

1. `btn-style`

  　　按钮的样式设置，提供了7种风格可选，从`1`～`7`或`ace-switch-1`～`ace-switch-7`，默认为1。

1. `btn-model`

  　　开关按钮绑定的对象，被绑定对象应为`Boolean`，当按钮为选中状态时，绑定对象的值为`true`，当按钮为未选中状态时，绑定对象的值为`false`。由于该属性采用了双向数据绑定，所以当绑定对象的值发生变化时，页面也会作出相应的改变。
