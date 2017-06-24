define(['text!../views/huawei.html','$css!../css/huawei.css'],function(html){
	
	function render(){
		$(".container").html(html);
	}
	
	return {
		render:render,
	}
})