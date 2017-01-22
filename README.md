<<<<<<< HEAD
# 云沃客微信小程序

> 此项目由 [shinygang](https://github.com/shinygang)  [zhongru](https://github.com/zhongru)  [Yunkou](https://github.com/Yunkou) 协助完成

效果如下：

![](http://ww1.sinaimg.cn/large/006y8lVagw1fbpdeyudueg30aa0ikhdu.gif)

微信小程序，从周三开始上手做周三周四基本完成。周五调试和适配机型，提测debug，提交审核。时间虽短但是历经坎坷，可以用“坑多，路滑，坡陡”来形容，吐槽完毕如正题

### 1 从编辑器说起

![](http://ww1.sinaimg.cn/large/006y8lVagw1fbpdm7lc7ej311s0mzte3.jpg)

上手微信小程序要从这个编辑器，准确说应该是集成开发环境说起。

主要的面板三部分组成 **编辑器** **调试** **项目** 

##### 1 编辑器

没有体验winpc开发体验，mac上面编辑器基本不能用，建议开发者使用 自己熟悉的编辑器进行开发。

小程序的开发环境仅仅用来调试和打包。

##### 2 调试

调试面板基本和chrome 如出一辙 为了方便监控page 数据 开发环境中有个Appdata来监控数据。

##### 3 项目

项目主要用于项目发布个人开发者预览， 打包发布等功能。

个人对这个开发环境评价如下：这个工具最大的作用其实在调试和发布，微信小程序团队，为开发者提供了打开即用，拎包入住式的体验。槽点在于：个人觉得官方应该出一些generator 类似cli或者yoman，然后再用webpack 或者 gulp 插件的方式 更友好一些，给开发者提供一些ci机制，命令行打包，上传。插件的机制在于开发者更灵活，可以用自己更舒服的方式进行开发。

### 2 遇到的一些问题

##### 1. 虚拟DOM-阉割版本html标签和盒子模型。

小程序里面的虚拟DOM 处于对性能提升，阉割掉了，几乎所有html，当然你可以用标准的html标签开发，编译之后，转换成了 li -> wx-li  这样把原来DOM绑定事件绑定机制移除，取而代之的是虚拟DOM的共有API。因为是虚拟出来的DOM自然也没有盒子模型，只保留了, magin:0;  和view的display block。也就是说，当你用P ul li 等标签的时候，高度宽度都是0，要手动加 display

如果你view 和 text 标签嵌套使用的时候，因为不是标准的文档流了，经常遇到 view里面的内容超出 view 组件而产生滚动条。在安卓机上显而易见，在ios上不明显，如果误触，会造成页面整体滑动不流畅。

##### 2. 开发体验有所牺牲

如果你常规开发项目是用react 或者 vue 开发，那么小程序会非常憋手，目前还没有官方出品的编辑器插件和语法高亮插件，官方格式`wxss`(css)  `wxml`(html)，基本不被主流编辑器支持。开放体验上有所降级，做好心理准备。

##### 3. 不支持html渲染

在项目详情中需要渲染存储的html 富文本，但是官方是不支持的。解决方案：https://github.com/icindy/wxParse  基本原理是把 html 或者 markdown 转成 Json 提取出图片，再将json数据包装成 wxml 索支持的格式。插入图片。

##### 4. 可以使用es6

可以使用es6 https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/details.html 可以查询对es6的支持情况 ，其中遇到安卓手机 会出现 出现内部错误的弹框，定位为引用了bluebird.js ，换成 es6-promise.min.js 之后解决。

##### 5 1M的限制

小程序为了保证用户体验将打包后的文件大小限制到1M 超出则打包上传失败。此项目5个页面就到了500k。

建议可以压缩空间的地方

1. 图片icon 尽量用线上可访问的url
2. 产品体量要克制
3. 样式文件精良抽象到app.wxss，精良减少过度设计。



最后 如果有问题可以多看看 [微信小程序](https://gold.xitu.io/tag/%25E5%25BE%25AE%25E4%25BF%25A1%25E5%25B0%258F%25E7%25A8%258B%25E5%25BA%258F) 和[awesome 小程序](https://github.com/opendigg/awesome-github-wechat-weapp?hmsr=toutiao.io&utm_medium=toutiao.io&utm_source=toutiao.io)



 *祝好运 Happy Code* 

=======
# WeiChat
>>>>>>> yzj/master
