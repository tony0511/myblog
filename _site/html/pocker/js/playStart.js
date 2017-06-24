var fun = (function () {
	function playStart(self) { //游戏开始
		callLandload.style.display = "block";
		callLandload.innerHTML = "出牌";
		noCall.innerHTML = "不要";
	    next();
	    sendCardOut();
	    resetOnclick();
	    self.sendcards = [];
	    self.sendcardsPre = [];
	    function resetOnclick () {
	    	//给玩家手中每张牌添加事件
		    for (var y = 0; y < 3; y++) {
		    	if (y != 2) {
		    	    for (let i = 0, pre = y == 0 ? oLeft : oRight; i < pre.childElementCount; i++) {
						pre.children[i].onclick = function () {
							if (pre.children[i].send == 0) {
							    pre.children[i].style.left = -25 + "px";
							    pre.children[i].send = 1;
							}else{
							    pre.children[i].style.left = 0 + "px";
							    pre.children[i].send = 0;
							} 
						}
					}
		    	}else{
		    		for (let i = 0; i < oBottom.childElementCount; i++) {
						oBottom.children[i].onclick = function () {
							if (oBottom.children[i].send == 0) {
							    oBottom.children[i].style.top = -25 + "px";
							    oBottom.children[i].send = 1;
							}else{
							    oBottom.children[i].style.top = 0 + "px";
							    oBottom.children[i].send = 0;
							}
						}
					}
		    	}
		    }   
	    }
	    function sendCardOut() {
	        callLandload.onclick = function () { 
	        	//当出牌时发生事件
	        	var pre = self.index == 0 ? oLeft : self.index == 1 ? oBottom : oRight;
	        	var preOut = self.index == 0 ? leftOut : self.index == 1 ? bottomOut : rightOut;
	        	for (var i = 0; i < pre.children.length; i++) {
	        		if (pre.children[i].send == 1) {
	        			self.sendcards.push(pre.children[i]);
	        		}
	        	}
	        	if(self.sendcards.length == 0) { //判断有无出空牌
	        		sendCardOut();
	        		alert("至少出一张牌或取消出牌");
	        		return;
	        	}
	        	if (!judgeOk(self.sendcardsPre, self.sendcards)) { //判断出牌是否符合规则
					//alert("你当前不符合出牌规则");
	        		self.sendcards = [];
	        	    sendCardOut();
	        	    return;
	        	}
	        	var movePre = self.index != 1 ? (18 - pre.children.length + self.sendcards.length) * 25 / 2 : (18 -pre.children.length + self.sendcards.length) * 25 / 2 + 310;
	        	var movePreOut = self.index != 1 ? (440 - (self.sendcards.length * 25 + 140))/2 : (1200 - (self.sendcards.length * 25 + 80))/2;
	        	self.index != 1 ? pre.style.top = movePre + "px" : pre.style.left = movePre + "px";
	        	self.index != 1 ? preOut.style.top = movePreOut + "px" : preOut.style.left = movePreOut + "px";
	        	for(var i = 0; i < self.sendcards.length; i++){
	        		//出的牌添加到展示框中
	        		self.index != 1 ? self.sendcards[i].style.top = 25*i +"px" : self.sendcards[i].style.left = 25*i +"px";
	        		self.index != 1 ? self.sendcards[i].style.left = 0 +"px" : self.sendcards[i].style.bottom = 0 +"px";
	        		self.sendcards[i].onclick = null;
	        		preOut.appendChild(self.sendcards[i]);
	        	}
	        	for(var i = 0; i < pre.children.length; i++){
	        		//给出牌玩家的牌重新放置好在桌上
	        		self.index != 1 ? pre.children[i].style.top = 25*i +"px" : pre.children[i].style.left = 25*i +"px";
	        	}
	        	resetOnclick(); //重新给玩家手中每张牌添加事件
	        	(self.index + 1)%3 == 0 ? leftOut.innerHTML = "" : (self.index + 1)%3 == 1 ? bottomOut.innerHTML = "" : rightOut.innerHTML = "";
	    		document.getElementById(`residue${self.index + 1}`).innerHTML = +document.getElementById(`residue${self.index + 1}`).innerHTML - self.sendcards.length;
	        	if (pre.children.length == 0) {
	        		//游戏结束时显示地主赢还是农民赢
	        		self.landload.name == self.players[`player${self.index + 1}`].name ? alert("地主：" + self.landload.name + " 赢了")
	        		: self.landload.name == self.players[`player${(++self.index % 3) + 1}`].name ? 
	        		alert("农民：" + self.players[`player${(++self.index % 3) + 1}`].name + " 和 " + self.players[`player${(++self.index % 3) + 1}`].name + " 赢了")
	        		: alert("农民：" + self.players[`player${(--self.index % 3) + 1}`].name + " 和 " + self.players[`player${(++self.index % 3) + 1}`].name + " 赢了");
	        		setTimeout(function () {
	        			//游戏结束，重新开始，回复默认值
					    callLandload.className = "";
					    noCall.className = "";
					    callLandload.innerHTML = "叫地主";
					    noCall.innerHTML = "不叫";
						callLandload.style.display = "none";
					    noCall.style.display = "none";
					    residue1.style.display = residue2.style.display = residue3.style.display = "none";
					    residue1.innerHTML = residue2.innerHTML = residue3.innerHTML = 17;
						oLeft.innerHTML = "";
						oRight.innerHTML = "";
						oBottom.innerHTML = "";
						oTop.innerHTML = "";
						leftOut.innerHTML = "";
						rightOut.innerHTML = "";
						bottomOut.innerHTML = "";
						oLeft.style.top = `0px`;
						oRight.style.top = `0px`;
						oBottom.style.left = `310px`;
		    			times.innerHTML = "倍数：15";
		    			times.style.display = "none";
		    			oStart.style.display = "block";
		    			for (var i = 0; i < 3; i++) {
		    			    document.getElementById(`player${i + 1}`).style.color = "black";
		    			}
	        		},2000);
	        		return;
	        	}
	        	self.send == 0 && (noCall.style.display = "block");
	        	self.send = (self.send == 1) && (self.nosend == 0 || self.nosend == 1)
	        	? 1 : self.send + 1;
	        	self.nosend = 0;
	        	self.sendcardsPre = self.sendcards;
	        	self.sendcards = [];
	        	self.index = ++self.index % 3;
	            next();
	        };
	        noCall.onclick = function nocardOut() {
	        	//玩家不出牌时的情况
	        	self.nosend += 1;
	        	if (self.nosend == 2) {
	        	    self.send = 0;
	        	    noCall.style.display = "none";
	        	    self.sendcardsPre = [];
	        	}
	        	(self.index + 1)%3 == 0 ? leftOut.innerHTML = "" : (self.index + 1)%3 == 1 ? bottomOut.innerHTML = "" : rightOut.innerHTML = "";
	        	self.index = ++self.index % 3;
	            next();
	        };
	    }
	    //判断出牌是否符合规则
	    function judgeOk (arrPre, arr) {
	    	var sPre = "", s = "";
	    	var point = ["3","4","5","6","7","8","9","10","J","Q","K","A","2"];
	    	//把上家出的牌组合成字符串
	    	for (var i = 0; i < arrPre.length; i++) {
	    		if (arrPre[i].color == "big" || arrPre[i].color == "small") {
	    	    	sPre = sPre + arrPre[i].color;
	    		}else{
	    	    	sPre = sPre + arrPre[i].point;
	    		}
	    	}
	    	//把当前玩家出的牌组合成字符串
	    	for (var i = 0; i < arr.length; i++) {
	    		if (arr[i].color == "big" || arr[i].color == "small") {
	    	    	s = s + arr[i].color;
	    		}else{
	    	    	s = s + arr[i].point;
	    		}
	    	}
	    	//出炸弹时倍数翻倍
	    	if ((s.length == 4 && s[0] == s[1] && s[1] == s[2] && s[2] == s[3]) || s == "bigsmall" || s == "10101010" ) {
	    	    self.times *= 2;
	   			times.innerHTML = "倍数：" + self.times;
	    	}
	    	//所有非顺子和连对出牌可能的情况
		    var all = create_1(point, 0).concat(create_2(point, 0), create_33(point, 0), create_3(point, 0), create_4(point, 0), 
		    create_431(point, 0), create_532(point, 0), create_6411(point, 0), create_83311(point, 0), create_103322(point, 0));
		    var all_line = [];
		    //所有顺子或连对出牌可能的情况
		    for (var i = 3; i < 13; i++) {
		    	all_line = all_line.concat(createStraightTwo(["3","4","5","6","7","8","9","10","J","Q","K","A","2"], 0, i));
			    if (i > 4) {
			        all_line = all_line.concat(createStraight(["3","4","5","6","7","8","9","10","J","Q","K","A","2"], 0, i));
			    }
		    }
		    //所有出牌的可能情况
		    all = all.concat(all_line);
		    return cardIsOk(sPre, s, all, point);
	    }
	    //进入到下一个玩家
	    function next() {
		    callLandload.className = `call_${ self.index }`;
		    noCall.className = `nocall_${ self.index }`;
		}
	}
	//返回该函数
    return {
    	"playStart" : playStart
    }
}());
