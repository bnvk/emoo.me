<!doctype html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title><?= site_title($sub_title, $page_title, $site_title) ?></title>
<meta name="title" content="<?= site_title($sub_title, $page_title, $site_title) ?>" />
<meta name="description" content="<?= $site_description ?>" />
<meta name="keywords" content="<?= $site_keywords ?>" />
<meta name="author" content="">
<meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="stylesheet" href="<?= $site_assets ?>style.css">
<script src="<?= $site_assets ?>js/libs/modernizr-2.0.6.min.js"></script>

<?= $head ?>
</head>
<body>

<div id="container">
	<header>
		<?= $logged ?>		
	</header>
	<div id="main" role="main">
		<?= $content ?>
	</div>
	<footer>
		<?= $footer ?>
	</footer>
</div>

</body>
</html>
