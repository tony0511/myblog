define(['text!../views/user.html','$css!../css/user.css'],function(html){
	
	function render(){
		$(".container").html(html);
	}
	
	return {
		render:render,
	}
})