define(['backbone','slide'],function(Backbone,slide){
	var Router = Backbone.Router.extend({

		routes: {
		    "home":                 "home",    
		    "huawei":        		"huawei",  
		    "honor":	 			"honor", 
			"category":				"category",
			"user":					"user",
			"*action":				"defaultAction",
		},
		
		home: function() {
		    require(['./modules/home'],function(home){
		    	home.render();
		    	slide.slide();
		    	
		    })
		},
		
		huawei: function() {
		   	require(['./modules/huawei'],function(huawei){
		    	huawei.render();
		    	slide.slide();
		   	})
		},
		
		honor: function() {
		   require(['./modules/honor'],function(honor){
		    	honor.render();
		    	slide.slide();
		    })
		},
		
		category: function() {
		    require(['./modules/category'],function(category){
		    	category.render();
		    	category.renderSel();
		    })
		},
		
		user: function() {
		    require(['./modules/user'],function(user){
		    	user.render();
		    })
		},
		
		defaultAction:function(){
			location.hash = "home";
		}
	
	});
	
	var router = new Router();
})