//设置菜单栏的事件------------
//onclick事件产生后立马消失？为什么。。。
var v_menu =document.getElementById('menuList');
var a_elem = v_menu.getElementsByTagName('a');
var str = location.href;
var strArr = str.split("/");
var strLength = strArr.length;
var strName =''+ strArr[strLength-1];
var strName = strName.replace('.html','');

//设置事件函数；
var aClick = function(event){
	var target =event.target||event.srcElement;
	//target.style.backgroundColor = "#77999a";
	target.focus();
}
var aFocus = function(event){
	var target = event.target||event.srcElement;
	target.style.backgroundColor = "#77999a";
}
var aBlur = function(event){
	var target = event.target||event.srcElement;
	target.style.backgroundColor = 'transparent';
}
var aKeyup = function(event){
	var target = event.target||event.srcElement;
	var m = event.keyCode;
	if (m==39) {
		target.parentNode.nextSibling.nextSibling.childNodes[0].focus();
		var target_href = target.parentNode.nextSibling.nextSibling.childNodes[0];
		window.open(target_href.href,"_self");
		return false;
	}else if (m==37) {
		target.parentNode.previousSibling.previousSibling.childNodes[0].focus();
		var target_href = target.parentNode.previousSibling.previousSibling.childNodes[0];
		window.open(target_href.href,"_self");
		}
	}
for(i=0;i<a_elem.length;i++){
	a_elem[i].addEventListener("click",aClick);
	a_elem[i].addEventListener("focus",aFocus);
	a_elem[i].addEventListener("blur",aBlur);
	a_elem[i].addEventListener('keyup',aKeyup);
}
//设置当前菜单栏背景色，不因为失去焦点而改变；
setInterval(function(){
	switch(strName){
	case 'index': a_elem[0].style.backgroundColor="#77999a";break;
	case 'about': a_elem[1].style.backgroundColor="#77999a";break;
	case 'photos': a_elem[2].style.backgroundColor="#77999a";break;
	case 'live': a_elem[3].style.backgroundColor="#77999a";break;
	case 'contact': a_elem[4].style.backgroundColor="#77999a";break;
}
},100)
