define(['text!../views/home.html','$css!../css/home.css'],function(html){
	function render(){
		$(".container").html(html);
	}
	
	return {
		render:render,
	}
})