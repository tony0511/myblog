
//1.获取元素属性值
function getPropertyValue (ele,propertyName) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(ele,null)[propertyName];
    }else{
         return ele.currentStyle[propertyName];
    }
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
function getRandomNumArr (length,num) {
	if (length < num) {
	    return;
	}
	var arr = [];
	var newArray = [];
	for (var i = 0; i < length; i++) {
	    arr.push(i);
	}
    arr.sort((a,b)=>Math.random()-0.5);
	for (var i = 0; i < num; i++) {
	    newArray.push(arr[i]);
	}
	return newArray;
}
//9.2在指定数组中获取一个小于或等于该数组长度的随机数组
function getRandomArrOfArr (arr,num) {
	if (arr.length < num) {
	    return;
	}
	var newArray = [];
    arr.sort((a,b)=>Math.random()-0.5);
	for (var i = 0; i < num; i++) {
	    newArray.push(arr[i]);
	}
	return newArray;
}

//10.判断某一年是不是闰年
function isLeapYear(year){
	return new Date(year,2,0).getDate() == 29 ? true : false;
}

//11.通过年月日判断某一天是一年当中第几天如果输入不合法返回false
function countDays (year,month,day){
	if( isNaN(year) || isNaN(month) || isNaN(day) ||  !Number.isInteger(parseFloat(year))
	|| !Number.isInteger(parseFloat(month)) || !Number.isInteger(parseFloat(day))
	||year<1 || month<1 || month>12 || day<1 || day > new Date(year,month,0).getDate() ){
		return false;
	}else{
		return countDays(year,month,day);
	}
	function countDays(year,month,day){
		return month==1 ? day : countMonth(year,month-1)+day;
	}
	function countMonth (year,month) {
	   return  month==1 ? 31 : countMonth(year,month-1) + new Date(year,month,0).getDate();
	}
}

//12.获取对象属性位置，0表示没有该属性，1表示该属性在当前对象中，2表示在对象的原型中
function getPropertyLocation (obj,propertyName) {
    return !(propertyName in obj) ? 0 : obj.hasOwnProperty(propertyName) ? 1 : 2; 
}

//13.