var picShow = document.getElementsByClassName('picShow')[0];
var speed = 150;
function slideShow(){
	if(picShow.offsetLeft==(-600)){
		picShow.style.left = 150+'px';
	}
	picShow.style.left = picShow.offsetLeft-speed+'px';
}
//每一秒移动一次图片
var slide = setInterval(function(){
	slideShow();
	},1000)
//以上代码为设置图片的滑动显示效果-------------





