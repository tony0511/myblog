define(['text!../views/category.html','$css!../css/category.css'],function(html){
	
	function render(){
		$(".container").html(html);
	}
	
	function renderSel(){
		var menuList = document.querySelectorAll(".menuList");
		var itemRight = document.querySelectorAll(".itemRight");
		var itemUl = document.querySelectorAll(".itemRight ul");
		for(i=0;i<menuList.length;i++){
			(function(j){
				menuList[j].onclick = function(e){
					for(var i=0;i<menuList.length;i++){
						menuList[i].style.color = "#333";
						itemUl[i].style.display="none";
					}
					this.style.color = "red";
					itemUl[j].style.display="block";
				}
			})(i)
		}
	}
	
	return {
		render:render,
		renderSel:renderSel,
	}
})


	
		

