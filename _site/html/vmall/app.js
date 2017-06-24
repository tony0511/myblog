require.config({
	paths:{
		'jquery':'./lib/jquery',
		'backbone':'./lib/backbone',
		'$css':'./lib/css',
		'text':'./lib/text',
		'underscore':'./lib/underscore',
		'slide':'./modules/slide'
	}
})


require(['jquery','backbone','./router.js'],function($,Backbone){
	
	Backbone.history.start();
	
})
