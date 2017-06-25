window.onload = function (){
	var oStart = document.getElementById("start");
	var oWindow = document.getElementById("window");
	var oBox = document.getElementById("box");
	var oBoxBody = document.getElementById("boxBody");
	var intervalId_1;
	var intervalId_3;
	var tdIndex = [0,1,2,3];
	var firstNode;
	var count;
	var rightNum = 0;
	var secondTrTds;
	var settime = 20;
	if((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
    oWindow.style.width = '100%';
	}else{
	  oWindow.style.width = '400px';
	}
	
	oStart.addEventListener('click', function () {
		var top = 500;
		oBox.style.top = top + "px";
		
		oStart.style.display = "none";
		oBoxBody.innerHTML = "";
	    var timeOutId_1 = setTimeout(function () {
			intervalId_1 = setInterval(function () {
			    top -= 2;
				oBox.style.top = top + "px";  
			},settime);
		},settime*50);
		var intervalId_2 = setInterval(function () {
		    var oTr = document.createElement("tr");
		    var oTd = document.createElement("td");
		    var temp;
		    
		    tdIndex.sort(function (a,b) {
		        return Math.random() - 0.5;
		    });
			for (var i = 0; i < 4; i++) {
				temp = oTd.cloneNode();
			    oTr.appendChild(temp);
			    if (i == tdIndex[0]) {
			        addClassName(temp,"pre");
			        temp.onclick = function () {
			            addClassName(this,"right");
			            removeClassName(this,"pre")
			            rightNum++;
			        }
			    }else{
				    temp.onclick = function () {
				        addClassName(this,"error");
						clearTimeout(timeOutId_1);
					    clearInterval(intervalId_1);
					    clearInterval(intervalId_2);
					    clearTimeout(timeOutId_2);
					    clearInterval(intervalId_3);
					    alert("GAME OVER!\n恭喜你获得：" + rightNum + "分");
					    oStart.style.display = "block";
				    }	
			    }
			}
		    oBoxBody.appendChild(oTr);
		},settime*25);
		var timeOutId_2 = setTimeout(function () {
			intervalId_3 = setInterval(function () {
				firstNode = document.querySelector("#boxBody>tr:first-child"); 
			   	firstNode.parentElement.removeChild(firstNode);
			   	top += 50;
			   	oBox.style.top = top + "px";
				secondTrTds = document.querySelectorAll("#boxBody>tr:first-child>td"); 
				for (var i = 0; i < secondTrTds.length; i++) {
				    if (secondTrTds[i].className.indexOf("pre") != -1) {
				    	clearTimeout(timeOutId_1);
					    clearInterval(intervalId_1);
					    clearInterval(intervalId_2);
					    clearTimeout(timeOutId_2);
					    clearInterval(intervalId_3);
					    alert("GAME OVER!\n恭喜你获得：" + rightNum + "分");
					    oStart.style.display = "block";
					    break;
				    }
				}
			},settime*25);
		},settime*310);
	})
}
	