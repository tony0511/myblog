function cardIsOk(sPre, s, all, point) {
	var temp = [];
	var bomb = create_4(point, 0).concat("bigsmall");
	var regExp, longest = 1, numPre, num;
	var sPreNo10, arr10 = sPre.split("");
	//把牌中含有10的0去掉，方便计算牌数
	if (arr10.indexOf("0") != -1) {
	    sPreNo10 = sPre.split("0").join("");
	}else{
		sPreNo10 = sPre;
	}
	for(var ele of point){
		//找出之前出的牌中相同牌数量最多的牌及该牌的数量
		regExp = new RegExp(ele, "g");
		if (sPre.match(regExp) == null) {
		    continue;
		}
		if (sPre.match(regExp).length > longest || sPre.match(regExp).length == 3) {
		    longest = sPre.match(regExp).length;
		    numPre = num;
		    num = ele;
		}
	}
	//自己先出牌时
    if (sPre.length == "") {
        return checkTF(all);
    }else{
    	//出单牌A时
    	if (sPre.length == 1 || sPre == "10" || sPre == "small" || sPre == "big") {
    	    temp = create_1(point, getIndex(point, sPre)).concat(bomb);
    	    return checkTF(temp);
    	}else if((sPre.length == 2 && sPre != "10") || sPre == "1010"){ 
    		//出AA时
    		temp = create_2(point, getIndex(point, sPre)).concat(bomb);
    	    return checkTF(temp);
    	}else if(sPre.length == 3 || sPre == "101010"){
    		//出AAA时
    		temp = create_3(point, getIndex(point, sPre)).concat(bomb);
    	    return checkTF(temp);
    	}else if((sPre.length == 4 && sPre != "1010") || sPre == "10101010"|| sPre == "small101010"|| sPre == "big101010"||
    	(((sPre.length == 6 && sPre.indexOf("big") != -1) || (sPre.length == 8 && sPre.indexOf("small") != -1)) && longest == 3)){
    		//出AAA3时
    		if (longest == 3) {
	    		temp = create_431(point, getIndex(point, num)).concat(bomb);
	    	    return checkTF(temp);
    		}else{
    			//出AAAA时
	    		temp = create_4(point, getIndex(point, num)).concat("bigsmall");
	    	    return checkTF(temp);
    		}
    	}else if((sPreNo10[0] != sPreNo10[1] && sPreNo10[1] != sPreNo10[2] && sPreNo10[2] != sPreNo10[3]) && longest == 1){
    		//出顺子时
    		temp = createStraight(point, getIndex(point, sPreNo10.split("").reverse().join("")), sPreNo10.length).concat(bomb);
    	    return checkTF(temp);
    	}else if((sPreNo10.length == 6 || (sPreNo10.length > 6 && sPreNo10[5] != sPreNo10[6])) && (sPreNo10[0] == sPreNo10[1] && 
    		sPreNo10[1] != sPreNo10[2] && sPreNo10[2] == sPreNo10[3] && sPreNo10[3] != sPreNo10[4] && sPreNo10[4] == sPreNo10[5])){
    		//出连对时
    		temp = createStraightTwo(point, getIndex(point, sPreNo10.split("").reverse().join("")), sPreNo10.length/2).concat(bomb);
    	    return checkTF(temp);
    	}else if(sPreNo10.length == 5 && longest == 3){
    		//出AAA33时
    		temp = create_532(point, getIndex(point, num)).concat(bomb);
    	    return checkTF(temp);
    	}else if((sPreNo10.length == 6 || (sPreNo10.length == 8 && sPre.indexOf("big") != -1) || (sPreNo10.length == 10 && sPre.indexOf("small") != -1) || 
    	(sPreNo10.length == 12 && sPre.indexOf("big") != -1 && sPre.indexOf("small") != -1)) && longest == 4){
    		//出AAAA33时
    		temp = create_8411(point, getIndex(point, num)).concat(bomb);
    	    return checkTF(temp);
    	}else if(sPre == "bigsmall"){
    		//出王炸时
    		return false;
    	}else{
    		var s1 = sPre.split(num).join("").split(numPre).join("");
    		if (s1 == "") {
    			//出AAAKKK时
    		    temp = create_33(point, getIndex(point, numPre)).concat(bomb);
    	    	return checkTF(temp);
    		}else{
	    		for(var ele of point){
					regExp = new RegExp(ele, "g");
					if (s1.match(regExp) == null) {
					    continue;
					}
					if (s1.match(regExp).length > 1) {
					    longest = 10;
					    break;
					}
				}
	    		if (longest == 10) {
	    			//出AAAKKK3344时
	    		    temp = create_103322(point, getIndex(point, numPre)).concat(bomb);
	    	    	return checkTF(temp);
	    		}else{
	    			//出AAAKKK34时
	    		    temp = create_83311(point, getIndex(point, numPre)).concat(bomb);
	    	    	return checkTF(temp);
	    		}
    		}
    	}
    }
    function checkTF(temp) {
    	//判断出牌是否正确
	    for(var ele of temp){
	    	if (ele == s) {
	    	   return true; 
	    	}
	    }
    	return false;
    }
}