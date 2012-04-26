<!doctype html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<head>
<title><?= $site_title ?></title>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="title" content="<?= site_title($sub_title, $page_title, $site_title) ?>" />
<meta name="description" content="<?= $site_description ?>" />
<meta name="keywords" content="<?= $site_keywords ?>" />
<meta name="author" content="Brennan Novak">

<!-- OpenGraph (Facebook) http://ogp.me -->
<meta property="og:title" content="<?= $site_title ?>"/>
<meta property="og:type" content="website" />
<meta property="og:image" content="<?= $site_assets ?>apple-touch-icon-114x114-precomposed.png"/>
<meta property="og:url" content="<?= base_url() ?>"/>
<meta property="og:site_name" content="<?= $site_title ?>"/>
<meta property="og:description" content="<?= $site_description ?>">

<?= $head ?>
</head>
<body>
<header>
	<?= $logged ?>		
</header>
<div id="container">
	<div id="content_message" class="message_normal"><?= $message ?></div>
	<?= $content ?>
</div>
<footer>
	<?= $footer ?>
</footer>
<?php if (!$this->uri->segment(1)) echo $google_analytics; ?>
</body>
</html>
