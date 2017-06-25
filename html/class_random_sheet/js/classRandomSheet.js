
var nameAll=["杨雅达","节晴虹","辜天青","畅千雁","芮鹏海","受良哲","斋新月","百幼仪","贡文耀","舒子珍","冒凝蕊","慈凌柏","贾千风",
"军清韵","摩子晋","井凌晓","钱瑜然","天世英","完颜映天","善惜芹","卢如柏","浦妍雅","党宏恺","进静枫","申莹琇","劳芳林","有羽彤","道春华"];
var oSelect = document.getElementsByTagName("button")[0];
var oClear = document.getElementsByTagName("button")[1];
var oRefresh = document.getElementsByTagName("button")[2];
var names = document.getElementsByClassName("name");
var oSelectNumber = document.getElementsByTagName("input")[0];
var table = document.getElementById('table');
var favorites = [];
var intervalId;
var intervalId1;
var timeSet = 40;

var w = window.innerWidth || document.documentElement.clientWidth;
if((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
  table.style.width = '100%';
}else{
  table.style.width = '900px';
}

for (var i = 0; i < names.length; i++) {
    names[names.length-1-i].innerHTML = nameAll[i];
}
oSelect.addEventListener('click', function () {
	var selectNumber = parseInt(oSelectNumber.value);
	for (var i = 0; i < names.length; i++) {
    removeClassName(names[i],"bgcolor");
	}
	if (selectNumber <= 0||selectNumber>names.length||isNaN(selectNumber)) {
		return;
	}
	favorites = randomNumberArray(names.length,selectNumber);
	console.log(favorites);
	move(favorites);
});
oClear.addEventListener('click', function () {
	clearInterval(intervalId);
	clearInterval(intervalId1);
	for (var i = 0; i < names.length; i++) {
    removeClassName(names[i],"bgcolor");
	}
  for (var i = 0; i < names.length; i++) {
  	names[names.length-1-i].innerHTML = nameAll[i];
	}
});
oRefresh.addEventListener('click', function () {
	clearInterval(intervalId);
	clearInterval(intervalId1);
	for (var i = 0; i < names.length; i++) {
    removeClassName(names[i],"bgcolor");
	}
	favorites = randomNumberArray(names.length,names.length);
	console.log(favorites);
	for (var i = 0; i < names.length; i++) {
		names[names.length-1-i].innerHTML = nameAll[favorites[i]];
	}
});

function move (arr) {
	var z = 0;
	intervalId1 = setInterval(function () {
		var i = 1;
	    addClassName(names[0],"bgcolor");
	    intervalId = setInterval(function () {
	    	if (favorites[z] == 0) {
	    	    clearInterval(intervalId);
	         	z++;
			    if (z == arr.length) {
			        clearInterval(intervalId1);
			    }
	    	}else{
	    		if (names[i-1].className.match(/bgcolor/gi).length > 1) {
	    		    removeClassName(names[i-1],"bgcolor");
	    		    addClassName(names[i-1],"bgcolor");
	    		}else{
	    			removeClassName(names[i-1],"bgcolor");
	    		}
	        	addClassName(names[i],"bgcolor");  
		        if (i == favorites[z]) {
		         	clearInterval(intervalId);
		         	z++;
				    if (z == arr.length) {
				        clearInterval(intervalId1);
				    }
		        }
		        i++;
	    	}
	    },timeSet);
	}, timeSet * (names.length + 10));
}
