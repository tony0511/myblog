---
layout: post
title: 前端性能测试工具介绍
category: experience
---

本文重点讲解WebPagetest的使用方法，其它工具略提一二。

测试网站以[国内最大的跨境电商平台shein](http://shein.com)为例。

### 1. 雅虎Yslow

下载地址：[雅虎Yslow](http://yslow.org/)，选择对应的浏览器下载安装插件使用。重启浏览器，按F12，在Firebug中可以看到安装好的Yslow,点击Run Test，可以得到分析后的结果。

### 2. 谷歌page speed ###

下载地址：[谷歌pageSpeed](http://developers.google.com/speed/pagespeed/insights_extensions)【**Not recomended**】

前面的一篇文章[Chrome WebInspector对网页前端性能的简单的分析](https://wilsonis.github.io/myblog//blog/posts/shein-performance-analysis)也对Chorme自带的分析工具的使用进行了简单的介绍，有兴趣的同学可以看看。

### 3. showslow ###

测试地址：[showslow](http://www.showslow.com),在线测试web应用。

### 4. HttpWatch和DynaTrace's Ajax ###

据说还有这两个测试工具,不过我不熟,有机会找来试试。

### 5. WebPagetest ###

测试地址：[WebPagetest](http://webpagetest.org/),在线测试web应用。

直接输入需要测试的网页，点击run test，等待一段时间后，就能得到测试结果。

下面是测试结果中一些不是很好理解的词汇进行了说明：

**First View: 第一次无缓存打开页面<br/>**

This is the view of the page for someone who has never been to the Lonely Planet site before (or has cleared their cache since their last visit).

**Repeat View:只访问过一次的页面，重新再打开该页面<br/>**

This is the view of a page if a user goes only to the page, closes their browser,and then reopens the browser and goes only to that page again as the first page they hit on the site.

**Flow View:之前至少访问过一次其它页面<br/>**

This is the view of the page when a customer has previously visited at least one other Lonely Planet page.

#### 3.1. 测试结果分析 ####

我们直接来看web page test给出的性能测试结果，因截图较长，放在文末。

截图中，右上角是页面速率指标，使用的是Yslow的字母分级格式。可以看到第五项Cache static content给出了很低的F级，在下方的清单列表中也给出了一系列的红X，表示这一块做得并不好。

继续往下看测试结果，在Detail部分，则指出了不同的速率指标的合格度，并详细地指出了所有可以改进的地方。截图中用红框框住的部分是特别需要进行优化的地方。非常的详细，对于网站开发人员来说，是非常有用的。

#### 3.2. 针对性的优化手段 ####

##### Use Progressive JPEGs #####

使用递增式编码来存储JPEG文件的好处可以从两个角度来说明：

- 用户体验

	一个以progressive方式编码的jpeg文件，在浏览器上的渲染方式是由模糊到清晰的。用户能在渐变的图像当中获得所需信息的反馈。如果内容不是用户所期待的，用户就能提前前往新的页面。

- 文件大小

	有实验证明，在JPEG文件小于10KB的时候，使用标准型编码（Huffman表已经被优化）的JPEG文件要小于使用渐变式编码的JPEG文件（发生概率为75%）。当文件大于10KB时，渐变式编码的JPEG文件有94%的概率拥有比标准编码的文件更小的体积。

- 使用方法

	photoshop中图片save for web，勾选progressive。
	也可以使用工具jpegtran（72KB）。基于命令行操作，参数在程序内都有说明，一个典型的命令行是这样的：jpegtran -copy none -progressive source.jpg result.jpg。

##### 压缩工具 #####

- gzip,通过命令行压缩文件，压缩率在3至10倍，能显著降低加载文件的大小。

- [Minify](http://code.google.com/p/minify),下载该文件，并解压到网站根目录下，打开Minify的控制面板，添加需要缩减的js文件，页面就生成了可链接到js文件缩减后的脚本标签。

- [YUI Compressor](http://yuilibrary.com/download/yuicompressor/),下载该jar文件,以命令行的形式运行：

	`java -jar yuicompressor-[version].jar [options] [file name]`

- [Closure Compiler](https://developers.google.com/closure/compiler/),它执行的是焦土优化策略，重写变量名，删除没用的函数,压缩效果显著，但压缩后的代码不具备可读性。

##### 设置缓存过期头  #####

- expires:

	指定缓存到期GMT的绝对时间，如果设了max-age，max-age就会覆盖expires。如果expires到期需要重新请求。设expires的目的就是让没有更新的资源不应该产生http请求，如果强制产生请求则返回304，减少服务器压力和降低带宽。exprires属于服务器优化范畴，需要修改服务器配置并重启。

- max-age:

	指定缓存过期的相对时间秒数，max-ag=0或者是负值，浏览器会在对应的缓存中把Expires设置为1970-01-01 08:00:00 。

#### 3.3. shein.com测试结果 ####

![shein测试结果](http://i.imgur.com/DzrMpH2.jpg)



