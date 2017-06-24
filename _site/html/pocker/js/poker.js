function Game () { //游戏对象构造函数
    this._init();
}
Game.prototype = {
	_init : function () {
		this.poker = new CreatePoker();
	},
	cardsToDesk : function () { //游戏开始
	    times.style.display = "block";
	    this.noGrab = 0;
	    this.grab = 0;
	    this.nosend = 0;
	    this.send = 0;
		this.times = 15;
		this._shuffle();
		this._distribute();
		this._toDesk();
	},
	_grabLandloadPre : function () { //抢地主开始时
	    callLandload.style.display = "block";
	    noCall.style.display = "block";
	    this.pre = randomInt(0, 2); //随机选择一个玩家抢地主
	    callLandload.className = `call_${this.pre}`;
	    noCall.className = `nocall_${this.pre}`;
	    this._grabLandloadNext(this.pre);
	},
	_grabLandloadNext : function (pre) { //进入到下一个玩家抢地主
		var self = this;
		if (pre - 4 == this.pre - 1) { //到第三个玩家时抢地主处理情况
		    if (this.noGrab == 3) { //都不抢地主，重新发牌
		        clearCall();
		        refresh();
				return;
		    }else if((this.noGrab == 2 && this.grab == 1) || (this.noGrab == 2 && this.grab == 2)
		    ||(this.noGrab == 2 && this.grab == 0)){ //第一个玩家不抢，第二或第三个玩家抢地主
		        clearCall();
		        this._addBottomCards();
				return;
		    }else if(this.noGrab == 1 && this.grab == 2){ //第一个玩家不抢，第二和第三个玩家都抢地主
		    	nextPerson(pre);
		    	self._grabLandloadNext(++pre);
		    }
		}
		if ((pre - 4 == this.pre && this.grab != 2) || (pre - 5 == this.pre && this.grab == 2)) {
			//到第四个玩家时抢地主的处理情况
	        clearCall();
	        this._addBottomCards();
			return;
		}
	    callLandload.onclick = function () {//抢地主并翻倍
	    	nextPerson(pre);
	        self.times *= 2;
	        times.innerHTML = "倍数：" + self.times;
	        self.index = pre%3;
	        self.landload = self.players[`player${self.index + 1}`];
	        (self.pre == pre) && (self.grab += 1); 
	        (self.pre == pre - 1) && (self.grab == 0) && (self.grab = 2);
	        self._grabLandloadNext(++pre);
	    };
	    noCall.onclick = function () {//不抢地主
	        nextPerson(pre);
	        self.noGrab += 1; 
	        self._grabLandloadNext(++pre);
	    };
	    function nextPerson(pre) {//按钮到下一家
			callLandload.innerHTML = "抢地主";
			noCall.innerHTML = "不抢";
	        callLandload.className = `call_${ (pre + 1) % 3 }`;
	        noCall.className = `nocall_${ (pre + 1) % 3 }`;
	    }
		function clearCall() {//刷新按钮
		    callLandload.className = "";
		    noCall.className = "";
			callLandload.style.display = "none";
		    noCall.style.display = "none";
		}
		function refresh () {//刷新牌
	    	oLeft.innerHTML = "";
	    	oRight.innerHTML = "";
	    	oBottom.innerHTML = "";
	    	self.cardsToDesk();
		}
	},
	_addBottomCards : function () { //把底牌加入到地主手中
	    var playerCards = this.landload.cards;
	    var bottomCards = this._sort(this.players.bottomcards);
	    var oLandload;
	    this.index == 0 ? oLandload = oLeft : this.index == 1 ? oLandload = oBottom : oLandload = oRight;
	    this.prePlayer = oLandload;
	    document.getElementById(`player${this.index + 1}`).style.color = "red";
	    document.getElementById(`residue${this.index + 1}`).innerHTML = 20;
	    playerCards = this._sort(playerCards.concat(bottomCards));
	    oLandload.innerHTML = "";
	    //把底牌展示在顶部
	    for (var i = 0; i < bottomCards.length; i++) {
	        let card = this._createACard(bottomCards[i], i+1);
		    card.style.left = 25*i + "px";
		    oTop.appendChild(card);	
	    }
	    //把玩家的牌展示在桌面上
	    for (var i = 0; i < playerCards.length; i++) {
	        let card = this._createACard(playerCards[i], i+1);
		    this.index == 1 ? card.style.left = 25*i + "px" : card.style.top = 25*i + "px";
		    oLandload.appendChild(card);
	    }
	    //底牌可能翻倍的情况
	    var c1 = bottomCards[0].color, c2 = bottomCards[1].color, c3 = bottomCards[2].color,
	    c4 = bottomCards[0].point, c5 = bottomCards[1].point, c6 = bottomCards[2].point;
	    var s = c1.concat(c2,c3,c4,c5,c6);
	    s.search(/(111)|(222)|(333)|(444)|(555)|(666)|(777)|(888)|(999)|(101010)|(JJJ)|(QQQ)|(KKK)/g) != -1 && (this.times *= 3);
	    s.search(/(2AK)|(AKQ)|(KQJ)|(J109)|(1098)|(987)|(876)|(765)|(654)|(543)|(♥♥♥)|(♣♣♣)|(♠♠♠)|(♦♦♦)/g) != -1 && (this.times *= 3);
	    s.search(/(small)|(big)/g) != -1 && (this.times *= 2);
	    times.innerHTML = "倍数：" + this.times;
		fun.playStart(this);
	},
	_shuffle : function () { //随机打乱牌
		this.poker.cards = this.poker.cards.sort(function (a,b) {
	        return Math.random() - 0.5;
	    });
	},
	_distribute : function () { //分牌
		var players =this.players;
		var cards = this.poker.cards;
	    players.player1.cards = this._sort(cards.slice(0,17));
	    players.player2.cards = this._sort(cards.slice(17,34));
	    players.player3.cards = this._sort(cards.slice(34,51));
	    players.bottomcards = cards.slice(51);
	},
	_toDesk : function () { //把牌展示在桌面
		var cards1 = this.players.player1.cards;
		var cards2 = this.players.player2.cards;
		var cards3 = this.players.player3.cards;
		var cards0 = this.players.bottomcards;
		var i = 1;
		var intervalId = setInterval(function () {
		    var left = this._createACard(cards1[i-1], i);
		    var right = this._createACard(cards3[i-1], i);
		    var bottom = this._createACard(cards2[i-1], i);
		    bottom.style.left = left.style.top = right.style.top = 25*i + "px";
		    oLeft.appendChild(left);
		    oRight.appendChild(right);
		    oBottom.appendChild(bottom);
		    if (i++ == 17) {
				this._grabLandloadPre();
		       	clearInterval(intervalId); 
			    residue1.style.display = residue2.style.display = residue3.style.display = "block";
		    }
		}.bind(this),50);
	},
	_createACard : function (cardContent, index){ //生成一张牌
	    var card = document.createElement("div");
	    var leftTop = document.createElement("div");
	    var rightBottom = document.createElement("div");
	    card.style.zIndex = index;
	    card.send = 0;
	    card.color = cardContent.color;
	    card.point = cardContent.point;
		addClassName(card, "card");
	    addClassName(leftTop, "left_top");
	    addClassName(rightBottom, "right_bottom");
	    if (cardContent.color == "♠" || cardContent.color == "♣" ) {
	        addClassName(card, "black");
	        rightBottom.innerHTML = leftTop.innerHTML = cardContent.point + "\n" + cardContent.color;
	    }else if (cardContent.color == "♥" || cardContent.color == "♦" ) {
	        addClassName(card, "red");
	        rightBottom.innerHTML = leftTop.innerHTML = cardContent.point + "\n" + cardContent.color;
	    }else if (cardContent.color == "small") {
	        addClassName(card, "black");
	        rightBottom.innerHTML = leftTop.innerHTML ="小王" + cardContent.point.split("").join("\n");
	    }else{
	    	addClassName(card, "red");
	        rightBottom.innerHTML = leftTop.innerHTML ="大王" +  cardContent.point.split("").join("\n");
	    }
	    card.appendChild(leftTop);
	    card.appendChild(rightBottom);
	    return card;
	},
	_sort : function (arr) { //把牌按降序排列
	    for (var i = 0; i < arr.length - 1; i++) {
	        for (var y = 1; y < arr.length - i; y++) {
	            if (arr[y-1].number < arr[y].number) {
	                [arr[y-1],arr[y]] = [arr[y],arr[y-1]];
	            }
	        }
	    }
	    return arr;
	}
};
function CreatePlayer (arr) { //生成玩家构造函数
    for (var index in arr) {
        this[`player${+index+1}`] = {name : arr[index]};
    }
}
function CreatePoker () { //生成一副扑克构造函数
    this.count = 54;
    this.cards = this._createCards();
}
CreatePoker.prototype = { 
	_createCards : function () { //生成一张牌的基本信息
	    var cards = [];
	    var color = ["♠","♥","♣","♦"];
	    var point = ["3","4","5","6","7","8","9","10","J","Q","K","A","2"];
	    var z = 1;
	    for (var i = 0; i < point.length; i++) {
	        for (var y = 0; y < color.length; y++) {
	        	cards.push({"color" : color[y], "point" : point[i], "number" : z++});
	        }
	    }
	    cards.push({"color" : "small", "point" : "JOKER", "number" : z++},{"color" : "big", "point" : "JOKER", "number" : z++});
	    return cards;
	}
};
