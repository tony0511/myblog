function addScroll(selecter1, selecter2){
    var all_width = document.querySelector(selecter1).scrollWidth;
    document.querySelector(selecter1).style.width = all_width + 'px';
    var myScroll = new IScroll(selecter2, {
        scrollX: true,
        scrollY: false,
        hScrollbar:false,
        vScrollbar : false,
        vScroll:false,
        preventDefault:false
    });
}
function addScrollY(selecter1, selecter2){
    var all_height = document.querySelector(selecter1).scrollHeight;
    document.querySelector(selecter1).style.height = all_height + 'px';
    var myScroll = new IScroll(selecter2);
}
function loadingImg(arr, dosomething, selecter){
    var num = 0;
    for (var i=0; i<arr.length; i++){
        var imgObj = new Image();
        imgObj.src=arr[i].src;
        imgObj.onload = function (){
            num++;
            if(num>=arr.length){
                dosomething(selecter);
            }
        }
    }
}
function createSwiper(selecter){
    // swiper.updateSlidesSize();
    // swiper.update();
    var swiperIndexPre;
    var swiper = new Swiper(selecter, {
        autoplay: 4000,
        speed: 800,
        loop: true,
        preloadImages:true,
        updateOnImagesReady:true,
        // observer:true,
        autoplayDisableOnInteraction: false,
        direction: "horizontal",
        pagination: ".swiper_pages",
        paginationClickable: true,
        onSlideChangeStart: function (swiper){
            var index = (swiper.activeIndex - 1) % $(".pics_info > div").length;
            $(".pics_info > div").eq(index).css({
                "display": "block"
            });
            $(".pics_info > div").eq(swiperIndexPre).css({
                "display": "none"
            });
            swiperIndexPre = index;
        }
    });
}