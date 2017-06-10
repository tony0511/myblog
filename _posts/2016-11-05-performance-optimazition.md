---
layout: post
title: 前端优化最佳实践汇总
category: experience
---

### 一、前端优化的目的

> 最近在总结一些前端优化的方法，结合以往做项目的经验以及网上的一些资料，对常用的优化方法进行了汇总，以后如果遇到一些新的方法也会在这里进行补充。

1. 对用户：页面加载更快，用户操作响应及时，更友好的体验；

2. 对服务商：减少页面请求，减小请求所占带宽，节省资源。

![](http://i.imgur.com/WjHtaQh.jpg)

---

# 二、优化的途径#

## 1. 页面级别的优化 ##

如：减少HTTP请求数，脚本的无阻塞加载，内联脚本的位置优化等。

- 保持页面简洁，减少没有必要的结构。大家都听说过less is more，但是真正做起来却并不简单，插图式主页的兴起是这句话最好的证明。

- 合理的设置缓存（缓存越多越久，设置过期头、last-Modifed验证）

- 文件的压缩合并。CSS精灵图压缩，js代码压缩，img图片压缩发布(YUI工具等)，css,js文件的合并。

- 懒加载图片。jquery.lazyload.js+IntersectionObserver API(chrome51+)，解决高频scroll事件。

- 将外部脚本置底

- 使用web workder。解决耗时操作，主线程来控制子线程的耗时操作。

- 目录内跳转以/结尾，减少服务器跳转

- 根目录下放置favicon.ico网站头像，减少请求

- HTTP1.0头中，加入connection:Keep-Alive请求-应答模式，保持连接，减少重复请求

- 减少DNS请求，即减少不同域名的请求。

- 减少重定向。

- 建议删除干扰页面第一屏内容加载的js

- 避免404请求


## 2. 代码级别的优化 ##

如：js中DOM操作优化，CSS选择符优化，图片优化，HTML结构优化等。

- 访问DOM集合时，尽量转换为数组后进行遍历，可以用es6新方法Array.of()转换，或者使用Array.prototype.slice.call(items)方法来转换。

- 注意重排、重载的问题

- eval和Function函数执行效率低

- 减少作用域链的查找

- CSS选择符是从右向左解析，所以选择符节点尽量少，使用less。

- SEO语义化。如header,title,description等，利于搜索引擎

- 避免@import引入css，因为这是按顺序加载，导致阻塞

- 避免使用document.write

- 指定图像的尺寸，避免“回溯”

## 3. 服务器级别优化 ##

- 使用内容分发网络CDN，不同地域位置的服务器速度更快

- 对于静态文件使用expires:never expire文件头

- ajax请求使用get比post少一个请求

# 三、更多扩展 #

想了解更多的信息，可参考[Web前端优化最佳实践及工具集锦](http://www.csdn.net/article/2013-09-23/2817020-web-performance-optimization)，里面列出了谷歌和雅虎公司列出来的一系列前端优化最佳实践，同时也列出了一些性能测试和优化工具，有兴趣的coder可以了解下。

