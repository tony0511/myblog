define([],function(){
	function slide(){
		var mySwiper = new Swiper('.swiper-container',{
			pagination: '.swiper-pagination',
	  		paginationClickable: true,
		    loop: true,
			autoplay: 2000,
			autoplayDisableOnInteraction: false,
		});
	}
	
	return {
		slide:slide,
	}
})
	