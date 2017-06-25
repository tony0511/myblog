
//1.获取元素属性值
function getPropertyValue (ele,propertyName) {
    var style;
    if (window.getComputedStyle) {
        style = window.getComputedStyle(ele,null);
    }else{
        style = ele.currentStyle;
    }
    return style[propertyName];
}

//2.1给元素添加className
function addClassName (ele,newClassName) {
    ele.className += " " + newClassName;
}
//2.2删除元素中的className
function removeClassName (ele,oldClassName) {
    var newClassNameArr = ele.className.split(oldClassName);
    ele.className = newClassNameArr.join("");
}

//3.获取[a,b]区间的随机整数
function randomInt (a,b) {
    if(b>=a){
        return parseInt(Math.random()*(b-a+1))+a;
    }
}

//4.判断一个数是否是质数
function isPrimeNumber (num) {
	num = parseInt(num);
	for(i=2;i<=num;i++){
		if(num%i != 0){
			continue;
		}
		else if(i != num){
			return false;
			break;
		}
		else{
			return true;
		}	
	}
}

//5.获取两个数的最大公约数
function greatestCommonDivisor (num1,num2) {
	num1 = parseInt(num1);
	num2 = parseInt(num2);
	for(var i=num1; i>=1; i--){
		if(num1%i == 0 && num2%i == 0){
			return i;
			break;
		}
	}  
}

//6.获取两个数的最小公倍数
function leastCommonMultiple (num1,num2) {
	num1 = parseInt(num1);
	num2 = parseInt(num2);
	for(var i=1; i<=num1*num2; i++){
		if(i%num1 == 0 && i%num2 == 0){
			return i;
			break;
		}
	}  
}

//7.求 n!
function nFactorial(num){  //函数递归
	num = parseInt(num);
	if(num==1||num==0){  //递归终止条件
		return 1;
	}
	return nFactorial(num-1) * num;
}

//8.对一个数进行因式分解，返回因子组成的数组
function primeFactorization (num) {
	var factors = [];
	num = parseInt(num);
	if (num==0||num==1||num==-1) {
	    factors.push(num);
	    return factors;
	}else{
		if (num < 0) {
		    factors.push(-1);
		    num = Math.abs(num);
		}
		for(var i = 2, temp = num; i <= temp; i++){
			if(temp % i === 0){
				factors.push(i);
				temp /= i;
				i--;
			}
		}
		return factors;
	}
}

//9.1在指定长度中获取一个小于或等于长度的随机数组（数组元素值为[0,length-1]）
function randomNumberArray (length,num) {
	if (length < num) {
	    return;
	}
	var arr = [];
	var newArray = [];
	for (var i = 0; i < length; i++) {
	    arr.push(i);
	}
    arr.sort(function (a,b) {
        return Math.random()-0.5;
    });
	for (var i = 0; i < num; i++) {
	    newArray.push(arr[i]);
	}
	return newArray;
}
//9.2在指定数组中获取一个小于或等于该数组长度的随机数组
function refreshRandomArray (arr,num) {
	if (arr.length < num) {
	    return;
	}
	var newArray = [];
    arr.sort(function (a,b) {
        return Math.random()-0.5;
    });
	for (var i = 0; i < num; i++) {
	    newArray.push(arr[i]);
	}
	return newArray;
}