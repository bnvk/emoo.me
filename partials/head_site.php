<link rel="stylesheet" media="screen" href="<?= $site_assets ?>css/app-global.css" type="text/css" />

<?php if ($this->agent->is_mobile()): ?>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no;" />

<meta name="apple-mobile-web-app-capable" content="yes" />
<!-- <meta name="apple-mobile-web-app-status-bar-style" content="black" /> -->

<!-- Apple Icons -->
<link rel="apple-touch-icon-precomposed" href="<?= $site_assets ?>apple-touch-icon-precomposed.png" />
<link rel="apple-touch-icon-precomposed" sizes="57x57" href="<?= $site_assets ?>apple-touch-icon-57x57-precomposed.png" />
<link rel="apple-touch-icon-precomposed" sizes="72x72" href="<?= $site_assets ?>apple-touch-icon-72x72-precomposed.png" />
<link rel="apple-touch-icon-precomposed" sizes="114x114" href="<?= $site_assets ?>apple-touch-icon-114x114-precomposed.png" />

<!-- Apple Launch Screen -->
<link rel="apple-touch-startup-image" href="<?= $site_assets ?>app-startup-320.png">

<!-- Mobile CSS Stylesheets -->
<link rel="stylesheet" media="only screen and (max-device-width: 1024px)" href="<?= $site_assets ?>css/app-ipad.css" type="text/css" />		
<link rel="stylesheet" media="only screen and (max-device-width: 960px)" href="<?= $site_assets ?>css/app-iphone-4.css" type="text/css" />
<link rel="stylesheet" media="only screen and (max-device-width: 480px)" href="<?= $site_assets ?>css/app-iphone.css" type="text/css" />

<?php else: ?>
<meta name="viewport" content="width=device-width,initial-scale=1" />
<?php endif; ?>

<!-- Favicon -->
<link rel="shortcut icon" href="<?= $site_assets ?>favicon.ico" />
<link rel="icon" type="image/png" href="<?= $site_assets ?>icon-32.png" />

<script type="text/javascript" src="<?= base_url() ?>js/jquery.js"></script>
<script type="text/javascript" src="<?= base_url() ?>js/social.core.js"></script>
<script type="text/javascript" src="<?= base_url() ?>application/modules/emoome/assets/js/plugins.js"></script>
<script type="text/javascript" src="<?= base_url() ?>application/modules/emoome/assets/js/emoome.js"></script>
<script type="text/javascript">
//Global User Data:
var user_data = {
	"user_id":"<?= $logged_user_id ?>",
	"username":"<?= $logged_username ?>",
	"user_level_id":"<?= $logged_user_level_id ?>",
	"name":"<?= $logged_name ?>",
	"image":"<?= $logged_image ?>",
	"location":"<?= $logged_location ?>",
	"geo_enabled":"<?= $logged_geo_enabled ?>",
	"geo_lat":"",
	"geo_long":"",
	"privacy":"<?= $logged_privacy ?>",	 
	"consumer_key": "<?= $oauth_consumer_key ?>",
	"consumer_secret": "<?= $oauth_consumer_secret ?>",
	"token": "<?= $oauth_token ?>",
	"token_secret": "<?= $oauth_token_secret ?>"
}

var base_url 		= '<?= base_url() ?>';
var current_module	= jQuery.url.segment(1);
var core_modules	= jQuery.parseJSON('<?= json_encode(config_item('core_modules')) ?>');
var core_assets		= '<?= $dashboard_assets.'icons/' ?>';
var site_assets		= '<?= $site_assets ?>';

$(document).ready(function()
{	
	// Hides Things
	$('.error').hide();

	if ($('#content_message').html() != '') $('#content_message').notify({status:'success',message:$('#content_message').html()});
});
</script>
