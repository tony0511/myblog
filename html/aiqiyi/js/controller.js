// home及其子路由控制器
angular.module("myApp").controller("homeCtrl", ["$scope", "$css", "$state", function ($scope, $css, $state){
    $css.add("./css/home.css");
    $css.remove("./css/balls.css");
    $state.go("home.recommend");
    $scope.homeTitleBol = true;
}])

//“开通VIP”及其子路由控制器
    .controller("openVipCtrl", [function (){

    }])

    //“登陆”及其子路由控制器
    .controller("loginCtrl", [function (){

    }])

    //“历史”及其子路由控制器
    .controller("historyCtrl", [function (){

    }])

    //“消息”及其子路由控制器
    .controller("newsCtrl", [function (){

    }])

    //“搜索”及其子路由控制器
    .controller("searchCtrl", ["$scope", "$css", function ($scope, $css){
        $css.add("./css/search.css");
        localStorage.recond ? ($scope.searchHistory = JSON.parse(localStorage.recond).data) : ($scope.searchHistory = []);
        $scope.changeRecond = function (){
            localStorage.clear();
            $scope.searchHistory = [];
        };
        $scope.searchBol = function (){
            if($scope.searahValue){
                return false;
            }else{
                return true;
            }
        };
        $scope.search = function (){
            var recond;
            a:if(localStorage.recond){
                recond = JSON.parse(localStorage.recond);
                for(var ele of recond.data){
                    if($scope.searahValue === ele){
                        recond.data.splice(recond.data.indexOf(ele), 1);
                        recond.data.unshift(ele);
                        break a;
                    }
                }
                recond.data.unshift($scope.searahValue);
                if(recond.data.length > 10){
                    recond.data.pop();
                }
            }else{
                recond = {
                    "data": [$scope.searahValue]
                };
            }
            localStorage.recond = JSON.stringify(recond);
            $scope.searchHistory = JSON.parse(localStorage.recond).data;
        };
        $scope.hotSearch = ['欢乐颂2', '择天记', 'T.O.P或被判刑', '奔跑吧', '熊出没', '卧底归来', '奔跑吧！兄弟', '思美人', '熊熊乐园', '公寓'];
    }])

//“推荐”及其子路由控制器
    .controller("recommendCtrl", ["$state",function ($state){
        $state.go("home.recommend.recommend2");
        addScroll('.homeHeadBar>div', '.homeHeadBar');
    }])
    .controller("recommendRecommendCtrl", ['$http', '$rootScope', '$scope', function ($http, $rootScope, $scope){
        $http.get("./data/rmrmsildes.json")
            .success(function (data){
                $scope.rmrmslides = data;
                loadingImg(data.data, createSwiper, '.rmrmswiper_container');
            });
            /*$(window).on("scroll",function (){
                var t = $("body").scrollTop();
                // console.log(t);
                if (t>=$(".homeHead").height()){
                    $(".homeHeadBarWrapFixed").css({
                        "position":"fixed",
                        "top":"0",
                        "z-index":"2"
                    })
                }else{
                    $(".homeHeadBarWrapFixed").css({
                        "position":"relative",
                        "top":"0"
                    })
                }
            })*/
        /*$("#home > .change > .change").on('touchstart', function (ev){
            var moveHeight = $("#home > .change > .headFixed > .homeHead").eq(0).height();
            var startMarginTop = parseInt($("#home > .change > .headFixed").css("margin-top"));
            var ev = ev||event;
            var touch = ev.touches[0];
            var startClinetY = touch.clientY;
            // var scrollTopStart = $("#home > .change > .change").scrollTop();
            document.addEventListener("touchmove", foo = function(ev){
                var ev = ev || event;
                var touch = ev.touches[0];
                var YMore = touch.clientY - startClinetY;
                var marginTopWill = startMarginTop + YMore;
                // var marginTopWill = startMarginTop + $("#home > .change > .change").scrollTop() - scrollTopStart;
                if(marginTopWill >= -moveHeight && marginTopWill <= 0){
                    $rootScope.changeBol = true;
                    $("#home > .change > .headFixed").css("margin-top", marginTopWill + "px");
                }else if(marginTopWill < -moveHeight){
                    $rootScope.changeBol = false;
                    $("#home > .change > .headFixed").css("margin-top", (-moveHeight) + "px");
                }else{
                    $rootScope.changeBol = false;
                    $("#home > .change > .headFixed").css("margin-top", "0px");
                }
                ev.stopPropagation();
            });
            document.addEventListener("touchend", function (){
                document.removeEventListener("touchmove", foo);
            });
        });*/
        $http.get("./data/head.json")
            .success(function (data){
                $scope.headPics = data.data;
                loadingImg(data.data, function (){
                    addScroll('.stars>div', '.stars');
                    addScrollY('.scrollWrap', '#home > .change > .change');
                });
            });
    }])
    .controller("recommendFreakCtrl", [function (){

    }])
    .controller("recommendHotdotCtrl", [function (){

    }])
    .controller("recommendTeleplayCtrl", [function (){

    }])
    .controller("recommendFilmCtrl", [function (){

    }])
    .controller("recommendVarietyCtrl", [function (){

    }])
    .controller("recommendCartoonCtrl", [function (){

    }])
    .controller("recommendSubscriptionCtrl", [function (){

    }])
    .controller("recommendInformationCtrl", [function (){

    }])

    //“乐活”及其子路由控制器
    .controller("happyLifeCtrl", ["$state",function ($state){
        $state.go("home.happylife.game");
        addScroll('.homeHeadBar>div', '.homeHeadBar');
    }])
    .controller("happyLifeGameCtrl", ['$scope', '$http', function ($scope, $http){
        $http.get("./data/game.json")
            .success(function (data){
                $scope.hpgamePics = data.data;
                loadingImg(data.data, function (){
                    addScrollY('.scrollWrap', '#home > .change > .change');
                });
            });
    }])
    .controller("happyLifeManhuaCtrl", [function (){

    }])
    .controller("happyLifeShubenCtrl", [function (){

    }])
    .controller("happyLifeGameliveCtrl", [function (){

    }])
    .controller("happyLifeDianying", [function (){

    }])
    .controller("happyLifeFourleaf", [function (){

    }])
    .controller("happyLifeBaobao", [function (){

    }])

    //“VIP”及其子路由控制器
    .controller("vipCtrl",  ["$state",function ($state){
        $state.go("home.vip.jingxuan");
        addScroll('.homeHeadBar>div', '.homeHeadBar');
    }])
    .controller("vipJingxuanCtrl", ['$rootScope', function ($rootScope){
        loadingImg($rootScope.lunbotuPics.slice(0, 5), createSwiper, '.vipjxswiper_container');
        loadingImg($rootScope.verticalPics.slice(0, 15), function (){
            addScrollY('.scrollWrap', '#home > .change > .change');
        })
    }])
    .controller("vipJulebuCtrl", [function (){

    }])
    .controller("vipDianyingCtrl", [function (){

    }])
    .controller("vipDianshijuCtrl", [function (){

    }])
    .controller("vipYanchanghuiCtrl", [function (){

    }])
    .controller("vipJilupianCtrl", [function (){

    }])

    //“我的”子路由控制器
    .controller("mineCtrl", ['$http', '$scope', function ($http, $scope){
        $http.get("./data/head.json")
            .success(function (data){
                $scope.mineHeadPics = data.data;
                loadingImg(data.data, function (){
                    addScroll('.stars>div', '.stars');
                    addScrollY('.scrollWrap', '#home > .change > .change');
                });
            });
    }])

    // balls及其子路由控制器
    .controller("ballsCtrl", ["$scope", "$css", "$state", function ($scope, $css, $state){
        $css.remove("./css/home.css");
        $css.add("./css/balls.css");
        $state.go("balls.kandian");
        // $scope.ballsBack = function (){
        //     window.history.back();
        // };
        // $scope.homeTitleBol = true;
    }])
    .controller("ballsKandianCtrl", [function (){

    }])
    .controller("ballsJinquanCtrl", [function (){

    }])
    .controller("ballsFaxianCtrl", [function (){

    }])
    .controller("ballsXiaoxiCtrl", ['$state', function ($state){
        $state.go("balls.xiaoxi.news2");
    }])
    .controller("xiaoxiNewsCtrl", [function (){

    }])
    .controller("xiaoxiTongxunluCtrl", [function (){

    }]);
