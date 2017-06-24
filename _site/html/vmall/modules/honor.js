define(['text!../views/honor.html','$css!../css/honor.css'],function(html){
	
	function render(){
		$(".container").html(html);
	}
	
	return {
		render:render,
	}
})