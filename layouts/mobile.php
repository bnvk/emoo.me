<!doctype html>
<!--[if lt IE 7]><html class="no-js ie6 oldie" lang="en"> <![endif]-->
<!--[if IE 7]><html class="no-js ie7 oldie" lang="en"> <![endif]-->
<!--[if IE 8]><html class="no-js ie8 oldie" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<head>
<?= $head ?>
</head>
<body>
<header>
	<div id="header">
		<div class="clear"></div>
	</div>	
</header>

<!-- Where The Magic Happens -->
<div id="container">
	<div id="content"></div>
</div>

<!-- Partials -->
<script type="text/template" id="ligthbox_template">
	<div id="request_lightbox">
		<div id="lightbox_message"><%= lightbox_message %></div>
	</div>
</script>

<script type="text/template" id="not_found">
	<h1>Ooops</h1>
	<p>Apologies, but we could not find what you were looking for</p>
</script>

<?= $template_navigation ?>
<?= $template_public ?>
<?= $template_auth ?>
<?= $template_record ?>
<?= $template_visualize ?>
<?= $template_settings ?>
<?= $javascripts ?>
</body>
</html>
