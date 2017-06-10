---
layout: post
title: 常用跨域方法总结
category: experience
---

### 1. 什么是跨域 ###

同源：相同protocal, domain, port的情况下，则为同源.

在非同源的情况下，则需要考虑跨域。

### 2. 常用跨域方法 ###

**1) 服务器端设置跨域**

nodejs的service.js中设置：

	app.all('*',function(req,res,next){
		res.header("Access-Control-Allow-Origin","*");   //接受任意域名的请求
		res.header("Access-Control-Allow-Header","X-Requested-With");
			//额外发送的头信息字段，用以区分传统请求和ajax请求
		res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
			//允许的请求方式
		res.header("Content-Type","application/json;charset=utf-8");
			//请求的数据类型
	})

**2) JSONP跨域**

通过script标签设置回调函数来实现，如：

	<script src = 'http://www.baidu.com/json/?callback=handleResponse'></script>

**3) H5 API postMessage跨域**

a.com/index.html的设置:

	<iframe id="ifr" src="b.com/index.html"></iframe>
	<script type="text/javascript">
		window.onload = function() {
			var ifr = document.getElementById('ifr');
			var targetOrigin = 'http://b.com';
				// 若写成'http://b.com/c/proxy.html'效果一样
	           // 若写成'http://c.com'就不会执行postMessage了
			ifr.contentWindow.postMessage('I was there!', targetOrigin);
		};
	</script>

b.com/index.html的设置:

	<script type="text/javascript">
   		 window.addEventListener('message', function(event){
     		   // 通过origin属性判断消息来源地址
      		  if (event.origin == 'http://a.com') {
         		 alert(event.data);    // 弹出"I was there!"
           		 alert(event.source);
					// 对a.com、index.html中window对象的引用
                    // 但由于同源策略，这里event.source不可以访问window对象
    		    }
   		 }, false);
	</script>

**4)Web Socket实现跨域**

web sockets是一种浏览器的API，它的目标是在一个单独的持久连接上提供全双工、双向通信。(同源策略对web sockets不适用)。

web sockets原理：在JS创建了web socket之后，会有一个HTTP请求发送到浏览器以发起连接。取得服务器响应后，建立的连接会使用HTTP升级从HTTP协议交换为web sockt协议。

只有在支持web socket协议的服务器上才能正常工作。

	var socket = new WebSockt('ws://www.baidu.com');//http->ws; https->wss
	socket.send('hello WebSockt');
	socket.onmessage = function(event){
		var data = event.data;
	}

### 3. 其它不常用的跨域方法 ###

**1)document.domain + iframe      (只有在主域相同的时候才能使用该方法)**

**2)location.hash + iframe**

**3)window.name + iframe**

详细见[前端解决跨域问题的8种方案](http://blog.csdn.net/joyhen/article/details/21631833)



















