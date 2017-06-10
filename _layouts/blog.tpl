<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<meta name="author" content="{{ site.meta.author.name }}" />
<meta name="keywords" content="{{ page.tags | join: ',' }}" />
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<title>{{ site.blog.name }}{% if page.title %} / {{ page.title }}{% endif %}</title>
<link rel="icon" href="/favicon.png" type="image/x-icon" />
<link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
<link href="http://{{ site.blog.host }}/blog/feed.xml" rel="alternate" title="{{ site.blog.name }}" type="application/atom+xml" />
<link rel="stylesheet" href="/lib/font-awesome/font-awesome.css" />
<link rel="stylesheet" type="text/css" href="/assets/css/blog.css" />
<link rel="stylesheet" type="text/css" href="/assets/css/code/sunburst.css" />
{% for style in page.styles %}<link rel="stylesheet" type="text/css" href="{{ style }}" />
{% endfor %}
<style>
	.particles-js-canvas-el {
	    position: absolute;
	    left: 0;
	    top: 0;
	    z-index: -1;
	}

	/*最近访客的设置*/
	#visitors{
		text-align: center;
	}
	#visitors p{
		font-weight: bold;
	    font-size: 16px;
	    padding: 20px;
	}
	#ds-recent-visitors {
	    display: flex;
	    justify-content: center;
	}
</style>
</head>

<body class="{{ layout.pageClass }}">

<div class="main">
	{{ content }}

	<footer>
		<p>&copy; Since 2016 <a href="http://wilsonis.github.io/myblog/">wilsonisonly.com</a></p>
	</footer>
</div>

<nav class="block">
	<ul>
		{% for category in site.custom.categories %}<li class="{{ category.name }}"><a href="/blog/category/{{ category.name }}/">{{ category.title }}</a></li>
		{% endfor %}
	</ul>
</nav>
<aside id="page">
	<h2><a href="/"><i class="fa fa-home"></i></a> / <a href="/blog/">{{ site.blog.name }}</a><a href="/blog/feed.xml" class="feed-link" title="Subscribe"><i class="fa fa-rss-square"></i></a></h2>

	<div class="block block-about">
		<h3>关于</h3>
		<figure>
			<img src="../potrait.png" width="80" height="80" />
			<figcaption><strong>{{ site.meta.author.name }}</strong></figcaption>
		</figure>
	</div>

	<div class="block block-license">
		<h3>版权申明</h3>
		<p><a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/2.5/cn/" target="_blank" class="hide-target-icon" title="本站(博客)作品全部采用知识共享署名-非商业性使用-禁止演绎 2.5 中国大陆许可协议进行许可。转载请通知作者并注明出处。"><img alt="知识共享许可协议" src="http://i.creativecommons.org/l/by-nc-nd/2.5/cn/88x31.png" /></a></p>
	</div>

	<div class="block block-thank">
		<h3>Powered by</h3>
		<p>
			<a href="http://elfjs.com/" target="_blank">elf+js</a>,
			<a href="https://github.com/" target="_blank">GitHub</a>,
			<a href="http://softwaremaniacs.org/soft/highlight/en/">HighlightJS</a>,
			<a href="https://github.com/mojombo/jekyll" target="_blank">jekyll</a>,
		</p>
	</div>

	<!--  最近访客 -->
	<div id="visitors" class="block">
		<p>最近访客</p>
		<ul class="ds-recent-visitors" data-num-items="10"></ul>
		<p>你是第
			<img border="0" src="http://cc.amazingcounters.com/counter.php?i=3212244&c=9637045" alt="AmazingCounters.com">
			位访客
		</p>
	</div>
</aside>

<script src="../lib/particles/particles.js"></script>
<script src="../lib/particles/app.js"></script>
<script type="text/javascript" src="/lib/elf/elf-0.5.0.min.js"></script>
<script src="/lib/highlight/highlight.min.js"></script>
<script src="/assets/js/site.js"></script>
{% for script in page.scripts %}<script src="{{ script }}"></script>
{% endfor %}
<script>
site.URL_GOOGLE_API = '{{site.meta.gapi}}';

site.VAR_SITE_NAME = '{{ site.blog.name }}';
site.VAR_AUTO_LOAD_ON_SCROLL = {{ site.custom.scrollingLoadCount }};
</script>
{% include baidu-stats.tpl %}
{% include sobot-chat.tpl %}
</body>
</html>
