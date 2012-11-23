<!doctype html>
<!--[if lt IE 7]><html class="no-js ie6 oldie" lang="en"> <![endif]-->
<!--[if IE 7]><html class="no-js ie7 oldie" lang="en"> <![endif]-->
<!--[if IE 8]><html class="no-js ie8 oldie" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<head>
<?= $head ?>
</head>
<body>

<!-- Where The Magic Happens -->
<div id="container">
	<div id="content"></div>
</div>

<div id="navigation">
	<div class="clear"></div>
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

<!-- Web Templates -->
<?= $template_navigation ?>
<?= $template_public ?>
<?= $template_auth ?>
<?= $template_record ?>
<?= $template_visualize ?>
<?= $template_settings ?>

<!-- Mobile Javascripts -->
<?= $javascripts ?>

<script type="text/javascript">
function doOnOrientationChange()
{
	if (window.orientation == 90 || window.orientation == -90) 
	{
		$('#toolbar').fadeOut();
	}
	else
	{
		$('#toolbar').fadeIn();
	}
}

window.onorientationchange = function()
{
	doOnOrientationChange();
};

</script>

</body>
</html>
