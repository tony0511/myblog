---
layout: post
title: Chrome WebInspector对网页前端性能的简单的分析
category: experience
---

### 对shein网站前端性能的简单分析

![](http://i.imgur.com/aSKa54u.png)

## 一、	[首页](http://www.shein.com/) ##

### 1.	Chorme Timeline分析 ###

根据上图，将分析的时间段控制在打开页面的5S中以内，如下图可以看到，首页的性能还是不错的，包括HTML解析、JS执行、渲染和重绘的总事件为1894ms，也就是说在2S以内完成了能够自由浏览页面所需要的动作。主要消耗的时间在js执行部分，包括加载图片和js文件以及js的执行，即下图中的黄色和灰色块，总耗时1407ms，占比74%。

![](http://i.imgur.com/XBZdPq1.png)

### 2.	Chrome WebInspector分析results ###

下图是Chrome WebInspector自动检测出来的可以进行性能优化的部分，主要包括：

- 多个js、css文件的合并
- 利用浏览器缓存图片
- css文件提前到js文件前面
- 将CSS放在head中
- 优化CSS代码

![](http://i.imgur.com/bJgcKGq.png)

## 二、	[What’s New页面](http://www.shein.com/daily-new.html?icn=what%27snew&ici=www_navbar01) ##

### 1.	Chrome Timeline分析 ###

选取what’s new页面的原因是该页面需要加载大量的图片，对于电商类网站具有一定的典型性。
然后选取页面打开到页面可以自由浏览的时间段进行分析，如图1选取时间段长6.46s，非空闲时间3.17s，其中js执行+other耗时2.10s，占比66.25%。加载图片和js文件是主要的耗时原因。

从图2和图3可以看出，加载了大量的图片，究其原因是没有使用懒加载/滚动加载技术，打开页面一次性加载了所有图片造成的。这对于电商类网站是至关重要的，国内任意大型电商网站都一定使用了懒加载/滚动加载技术，否则大量图片请求容易造成页面的卡顿，浏览不畅等。

[懒加载](https://wilsonis.github.io/myblog//blog/posts/lazyload)以及其他[前端性能优化的最佳实践](https://wilsonis.github.io/myblog//blog/posts/performance-optimazition)点击链接查看。

![图1](http://i.imgur.com/2m5ywUQ.png)

![图2](http://i.imgur.com/PRK8oRn.png)

![图3](http://i.imgur.com/6vFULOk.png)

### 2.	Chrome WebInspector分析results ###

WebInspector对该页面的优化推荐与首页类似，这里就不做分析了。

![](http://i.imgur.com/YDUfZ6d.png)


