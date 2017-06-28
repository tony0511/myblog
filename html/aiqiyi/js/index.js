//调整rem值
var windowWidth = window.innerWidth||document.documentElement.clientWidth; //获取屏幕宽度
var windowHeight = window.innerHeight||document.documentElement.clientHeight; //获取屏幕的高度
var preWidth = 375, preHeight = 667;
var wPer = 1, hPer = 1;
if((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
    wPer = windowWidth / preWidth;
    hPer = windowHeight / preHeight;

    var htmlObj = document.getElementsByTagName("html")[0];
    htmlObj.style.fontSize = 20*wPer+"px";
}else{
    document.body.innerHTML = "请使用移动端浏览器打开";
}

//新建一个angular模块
var app = angular.module("myApp",["ui.router", "angularCSS"]);

//添加一个自定义服务
// app.factory("SelfServer", [function (){
//     var data = [];
//     return {
//         data: data,
//         setData: function (arr){
//             data = arr;
//         }
//     }
// }]);

//使用run方法初始化一些公共数据，用于连接控制器于控制器（模块一旦运行就会加载这些代码）
app.run(["$rootScope", "$location", "$http", function ($rootScope, $location, $http){
    $rootScope.pathReg = ['home/vip', 'home/mine', 'home/happylife', 'home/recommend',
    'home/recommend/recommend2', 'home/recommend/freak', 'home/recommend/hotdot', 'home/recommend/teleplay',
    'home/recommend/film', 'home/recommend/variety', 'home/recommend/cartoon', 'home/recommend/subscription',
    'home/recommend/information', 'home/vip/jingxuan', 'home/vip/julebu', 'home/vip/dianying',
    'home/vip/dianshiju', 'home/vip/yanchanghui', 'home/vip/jilupian', 'balls/kandian', 'balls/jinquan',
    'balls/faxian', 'balls/xiaoxi', 'balls/xiaoxi/news2', 'balls/xiaoxi/tongxunlu'];
    $http.get("./data/middlePics.json")
        .success(function (data){
            $rootScope.middlePics = data.data;
        });
    $http.get("./data/lunbotu.json")
        .success(function (data){
            $rootScope.lunbotuPics = data.data;
        });
    $http.get("./data/verticalPics.json")
        .success(function (data){
            $rootScope.verticalPics = data.data;
        });
    $rootScope.$on("$locationChangeSuccess", function (){
        if(/home\/vip/.test($location.path())){
            $rootScope.homeColorBol = true;
        }else{
            $rootScope.homeColorBol = false;
        }
        if(/home\/recommend\/(teleplay|film|variety|cartoon|subscription)/.test($location.path())){
            $rootScope.homeChooseBol = false;
        }else{
            $rootScope.homeChooseBol = true;
        }
        for(var ele of $rootScope.pathReg){
            var reg = new RegExp(ele, "");
            if(reg.test($location.path())){
                $rootScope[ele.split('/').join('') + 'Bol'] = true;
            }else {
                $rootScope[ele.split('/').join('') + 'Bol'] = false;
            }
        }
    });
    $rootScope.homeSearchColorFull = function (){
        if(!$rootScope.homeColorBol && $rootScope.homeChooseBol){
            return "1";
        }else if($rootScope.homeColorBol && $rootScope.homeChooseBol){
            return "2";
        }else if($rootScope.homeColorBol && !$rootScope.homeChooseBol){
            return "3";
        }
    };
}]);

//定义主控制器
/*app.controller("mainCtrl", ["$scope", function ($scope){

}]);*/

//添加路由配置（包括嵌套路由配置）
app.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider){
    $stateProvider
        .state("openvip", { //openvip及其子路由
            url: "/openvip",
            templateUrl: "./view/openVip.html",
            controller: "openVipCtrl"
        })
        .state("login", { //login及其子路由
            url: "/login",
            templateUrl: "./view/login.html",
            controller: "loginCtrl"
        })
        .state("history", { //history及其子路由
            url: "/history",
            templateUrl: "./view/history.html",
            controller: "historyCtrl"
        })
        .state("news", { //news及其子路由
            url: "/news",
            templateUrl: "./view/news.html",
            controller: "newsCtrl"
        })
        .state("search", { //search及其子路由
            url: "/search",
            templateUrl: "./view/search.html",
            controller: "searchCtrl"
        })
        .state("home", { //home及其子路由
            url: "/home",
            templateUrl: "./view/home.html",
            controller: "homeCtrl"
        })
        .state("home.recommend", { //“推荐”及其子路由
            url: "/recommend",
            templateUrl: "./view/recommend.html",
            controller: "recommendCtrl"
        })
        .state("home.recommend.recommend2", {
            url: "/recommend2",
            templateUrl: "./view/recommendRecommend.html",
            controller: "recommendRecommendCtrl"
        })
        .state("home.recommend.freak", {
            url: "/freak",
            templateUrl: "./view/recommendFreak.html",
            controller: "recommendFreakCtrl"
        })
        .state("home.recommend.hotdot", {
            url: "/hotdot",
            templateUrl: "./view/recommendHotdot.html",
            controller: "recommendHotdotCtrl"
        })
        .state("home.recommend.teleplay", {
            url: "/teleplay",
            templateUrl: "./view/recommendTeleplay.html",
            controller: "recommendTeleplayCtrl"
        })
        .state("home.recommend.film", {
            url: "/film",
            templateUrl: "./view/recommendFilm.html",
            controller: "recommendFilmCtrl"
        })
        .state("home.recommend.variety", {
            url: "/variety",
            templateUrl: "./view/recommendVariety.html",
            controller: "recommendVarietyCtrl"
        })
        .state("home.recommend.cartoon", {
            url: "/cartoon",
            templateUrl: "./view/recommendCartoon.html",
            controller: "recommendCartoonCtrl"
        })
        .state("home.recommend.subscription", {
            url: "/subscription",
            templateUrl: "./view/recommendSubscription.html",
            controller: "recommendSubscriptionCtrl"
        })
        .state("home.recommend.information", {
            url: "/information",
            templateUrl: "./view/recommendInformation.html",
            controller: "recommendInformationCtrl"
        })
        .state("home.happylife", { //“乐活”及其子路由
            url: "/happylife",
            templateUrl: "./view/happyLife.html",
            controller: "happyLifeCtrl"
        })
        .state("home.happylife.game", {
            url: "/game",
            templateUrl: "./view/happyLifeGame.html",
            controller: "happyLifeGameCtrl"
        })
        .state("home.happylife.manhua", {
            url: "/manhua",
            templateUrl: "./view/happyLifeManhua.html",
            controller: "happyLifeManhuaCtrl"
        })
        .state("home.happylife.shuben", {
            url: "/shuben",
            templateUrl: "./view/happyLifeShuben.html",
            controller: "happyLifeShubenCtrl"
        })
        .state("home.happylife.gamelive", {
            url: "/gamelive",
            templateUrl: "./view/happyLifeGamelive.html",
            controller: "happyLifeGameliveCtrl"
        })
        .state("home.happylife.dianying", {
            url: "/dianying",
            templateUrl: "./view/happyLifeDianying.html",
            controller: "happyLifeDianying"
        })
        .state("home.happylife.fourleaf", {
            url: "/fourleaf",
            templateUrl: "./view/happyLifeFourleaf.html",
            controller: "happyLifeFourleaf"
        })
        .state("home.happylife.baobao", {
            url: "/baobao",
            templateUrl: "./view/happyLifeBaobao.html",
            controller: "happyLifeBaobao"
        })
        .state("home.vip", { //“VIP”及其子路由
            url: "/vip",
            templateUrl: "./view/vip.html",
            controller: "vipCtrl"
        })
        .state("home.vip.jingxuan", {
            url: "/jingxuan",
            templateUrl: "./view/vipJingxuan.html",
            controller: "vipJingxuanCtrl"
        })
        .state("home.vip.julebu", {
            url: "/julebu",
            templateUrl: "./view/vipJulebu.html",
            controller: "vipJulebuCtrl"
        })
        .state("home.vip.dianying", {
            url: "/dianying",
            templateUrl: "./view/vipDianying.html",
            controller: "vipDianyingCtrl"
        })
        .state("home.vip.dianshiju", {
            url: "/dianshiju",
            templateUrl: "./view/vipDianshiju.html",
            controller: "vipDianshijuCtrl"
        })
        .state("home.vip.yanchanghui", {
            url: "/yanchanghui",
            templateUrl: "./view/vipYanchanghui.html",
            controller: "vipYanchanghuiCtrl"
        })
        .state("home.vip.jilupian", {
            url: "/jilupian",
            templateUrl: "./view/vipJilupian.html",
            controller: "vipJilupianCtrl"
        })
        .state("home.mine", { //“我的”及其子路由
            url: "/mine",
            templateUrl: "./view/mine.html",
            controller: "mineCtrl"
        })
        .state("balls", { //“泡泡”及其子路由
            url: "/balls",
            templateUrl: "./view/balls.html",
            controller: "ballsCtrl"
        })
        .state("balls.kandian", {
            url: "/kandian",
            templateUrl: "./view/ballsKandian.html",
            controller: "ballsKandianCtrl"
        })
        .state("balls.jinquan", {
            url: "/jinquan",
            templateUrl: "./view/ballsJinquan.html",
            controller: "ballsJinquanCtrl"
        })
        .state("balls.faxian", {
            url: "/faxian",
            templateUrl: "./view/ballsFaxian.html",
            controller: "ballsFaxianCtrl"
        })
        .state("balls.xiaoxi", { //“泡泡》消息”及其子通讯录
            url: "/xiaoxi",
            templateUrl: "./view/ballsXiaoxi.html",
            controller: "ballsXiaoxiCtrl"
        })
        .state("balls.xiaoxi.news2", { //“泡泡》消息”及其子通讯录
            url: "/news2",
            templateUrl: "./view/xiaoxiNews.html",
            controller: "xiaoxiNewsCtrl"
        })
        .state("balls.xiaoxi.tongxunlu", { //“泡泡》消息”及其子通讯录
            url: "/tongxunlu",
            templateUrl: "./view/xiaoxiTongxunlu.html",
            controller: "xiaoxiTongxunluCtrl"
        });
    $urlRouterProvider.otherwise("home");
}]);
