//获取起始牌的下标
function getIndex(point, str) {
	if (str == "big") {
	    return 15;
	}else if(str == "small"){
		 return 14;
	}else if(str[0] == "1"){
	    	    return 8;
	}else{
	    for(var index in point){
	    	if(str[0] == point[index]){
	    		return +index + 1;
	    	}
	    }
	}
}
//注：还有多连飞机未写
//单牌A
function create_1 (point, start) {
	if (start == 15) {
	    return [];
	}
	if (start == 14) {
	    return ["big"];
	}else{
		return point.slice(start).concat("small","big");
	}
}
//对子AA
function create_2 (point, start) {
    var arr = [];
    for (var i = start; i < point.length; i++) {
        arr.push(point[i].repeat(2));
    }
    arr.push("bigsmall");
    return arr;
}
//AAA
function create_3 (point, start) {
    var arr = [];
    for (var i = start; i < point.length; i++) {
        arr.push(point[i].repeat(3));
    }
    return arr;
}
//炸弹AAAA
function create_4 (point, start) {
    var arr = [];
    for (var i = start; i < point.length; i++) {
        arr.push(point[i].repeat(4));
    }
    return arr;
}
//三带一AAA3
function create_431 (point, start) {
    var arr = [];
    for (var i = start; i < point.length; i++) {
        for(var y = 0; y < point.length; y++){
        	if (y < i) {
        	    arr.push(point[i].repeat(3)+ point[y]);
        	}else if(y > i){
        	    arr.push(point[y] + point[i].repeat(3));
        	}
        }
        arr.push("small" + point[i].repeat(3));
        arr.push("big" + point[i].repeat(3));
    }
    return arr;
}
//三带二AAA33
function create_532 (point, start) {
    var arr = [];
    for (var i = start; i < point.length; i++) {
        for(var y = 0; y < point.length; y++){
        	if (y < i) {
        	    arr.push(point[i].repeat(3) + point[y].repeat(2));
        	}else if(y > i){
        	    arr.push(point[y].repeat(2) + point[i].repeat(3));
        	}
        }
    }
    return arr;
}
//四带二AAAA34
function create_6411 (point, start) {
    var arr = [];
    for (var i = start; i < point.length; i++) {
        for(var y = 0; y < point.length; y++){
        	for (var z = 0; z < point.length; z++) {
        	    if (y <= z && z < i) {
        	    	arr.push(point[i].repeat(4) + point[z] + point[y]);
        	    }else if(y < i && i < z){
        	    	arr.push(point[z] + point[i].repeat(4) + point[y]);
        	    }else if(i < y && y <= z){
        	    	arr.push(point[z] + point[y] + point[i].repeat(4));
        	    }else if (z < y && y < i) {
        	    	arr.push(point[i].repeat(4) + point[y] + point[z]);
        	    }else if(z < i && i < y){
        	    	arr.push(point[y] + point[i].repeat(4) + point[z]);
        	    }else if(i < z && z < y){
        	    	arr.push(point[y] + point[z] + point[i].repeat(4));
        	    }
        	}
        	if (y < i) {
	        	arr.push("small" + point[i].repeat(4) + point[y]);
	        	arr.push("big" + point[i].repeat(4) + point[y]);
        	}else if(y > i){
	        	arr.push("small" + point[y] + point[i].repeat(4));
	        	arr.push("big" + point[y] + point[i].repeat(4));
        	}
        }
        arr.push("bigsmall" + point[i].repeat(4));
    }
    return arr;
}
//function create_8422 (point, start) {
//  var arr = [];
//  for (var i = start; i < point.length; i++) {
//      for(var y = 0; y < point.length; y++){
//      	for (var z = 0; z < point.length; z++) {
//      	    if (y < z && z < i) {
//      	    	arr.push(point[i].repeat(4) + point[z].repeat(2) + point[y].repeat(2));
//      	    }else if(y < i && i < z){
//      	    	arr.push(point[z].repeat(2) + point[i].repeat(4) + point[y].repeat(2));
//      	    }else if(i < y && y < z){
//      	    	arr.push(point[z].repeat(2) + point[y].repeat(2) + point[i].repeat(4));
//      	    }else if (z < y && y < i) {
//      	    	arr.push(point[i].repeat(4) + point[y].repeat(2) + point[z].repeat(2));
//      	    }else if(z < i && i < y){
//      	    	arr.push(point[y].repeat(2) + point[i].repeat(4) + point[z].repeat(2));
//      	    }else if(i < z && z < y){
//      	    	arr.push(point[y].repeat(2) + point[z].repeat(2) + point[i].repeat(4));
//      	    }
//      	}
//      }
//  }
//  return arr;
//}
//飞机AAAKKK
function create_33 (point, start) {
    var arr = [];
    for (var i = start; i < point.length - 1; i++) {
        arr.push(point[i+1].repeat(3) + point[i].repeat(3));
    }
    return arr;
}
//飞机带两单牌AAAKKK34
function create_83311 (point, start) {
    var arr = [];
    for (var i = start; i < point.length - 2; i++) {
        for(var y = 0; y < point.length; y++){
        	for (var z = 0; z < point.length; z++) {
        	    if (y < z && z < i) {
        	    	arr.push(point[i+1].repeat(3) + point[i].repeat(3) + point[z] + point[y]);
        	    }else if(y < i && i+1< z){
        	    	arr.push(point[z] +point[i+1].repeat(3) +  point[i].repeat(3) + point[y]);
        	    }else if(i+1 < y && y < z){
        	    	arr.push(point[z] + point[y] + point[i+1].repeat(3) + point[i].repeat(3));
        	    }else if (z < y && y < i) {
        	    	arr.push(point[i+1].repeat(3) + point[i].repeat(3) + point[y] + point[z]);
        	    }else if(z < i && i+1 < y){
        	    	arr.push(point[y] + point[i+1].repeat(3) + point[i].repeat(3) + point[z]);
        	    }else if(i+1 < z && z < y){
        	    	arr.push(point[y] + point[z] + point[i+1].repeat(3) + point[i].repeat(3));
        	    }
        	}
        	if (y < i) {
	        	arr.push("small" + point[i+1].repeat(3) + point[i].repeat(3) + point[y]);
	        	arr.push("big" + point[i+1].repeat(3) + point[i].repeat(3) + point[y]);
        	}else if(y > i+1){
	        	arr.push("small" + point[y] + point[i+1].repeat(3) + point[i].repeat(3));
	        	arr.push("big" + point[y] + point[i+1].repeat(3) + point[i].repeat(3));
        	}
        }
        arr.push("bigsmall" + point[i+1].repeat(3) + point[i].repeat(3));
    }
    return arr;
}
//飞机带两对子AAAKKK3344
function create_103322 (point, start) {
    var arr = [];
    for (var i = start; i < point.length - 2; i++) {
        for(var y = 0; y < point.length; y++){
        	for (var z = 0; z < point.length; z++) {
        	    if (y < z && z < i) {
        	    	arr.push(point[i+1].repeat(3) + point[i].repeat(3) + point[z].repeat(2) + point[y].repeat(2));
        	    }else if(y < i && i+1< z){
        	    	arr.push(point[z].repeat(2) +point[i+1].repeat(3) +  point[i].repeat(3) + point[y].repeat(2));
        	    }else if(i+1 < y && y < z){
        	    	arr.push(point[z].repeat(2) + point[y].repeat(2) + point[i+1].repeat(3) + point[i].repeat(3));
        	    }else if (z < y && y < i) {
        	    	arr.push(point[i+1].repeat(3) + point[i].repeat(3) + point[y].repeat(2) + point[z].repeat(2));
        	    }else if(z < i && i+1 < y){
        	    	arr.push(point[y].repeat(2) + point[i+1].repeat(3) + point[i].repeat(3) + point[z].repeat(2));
        	    }else if(i+1 < z && z < y){
        	    	arr.push(point[y].repeat(2) + point[z].repeat(2) + point[i+1].repeat(3) + point[i].repeat(3));
        	    }
        	}
        }
    }
    return arr;
}
//顺子
function createStraight (point, start, num) {
    point.pop();
    var arr = [];
    var temp = "";
	if (num < 5 || num > 12) {
	    return arr;
	}
	for (var i = start; i < point.length; i++) {
		if ((i + num) > point.length) {
		    break;
		}
	    for (var y = i + num - 1; y >= i; y--) {
	        temp += point[y];
	    }
	    arr.push(temp);
	    temp = "";
	}
    return arr;
}
//连对
function createStraightTwo (point, start, num) {
    point.pop();
    var arr = [];
    var temp = "";
	if (num < 3 || num > 12) {
	    return arr;
	}
	for (var i = start; i < point.length; i++) {
		if ((i + num) > point.length) {
		    break;
		}
	    for (var y = i + num - 1; y >= i; y--) {
	        temp += point[y].repeat(2);
	    }
	    arr.push(temp);
	    temp = "";
	}
    return arr;
}