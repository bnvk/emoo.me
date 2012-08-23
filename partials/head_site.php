<link rel="stylesheet" media="screen" href="<?= $site_assets ?>css/site.css" type="text/css" />

<!-- Apple Icons -->
<link rel="apple-touch-icon-precomposed" href="<?= $site_assets ?>apple-touch-icon-precomposed.png" />
<link rel="apple-touch-icon-precomposed" sizes="57x57" href="<?= $site_assets ?>apple-touch-icon-57x57-precomposed.png" />
<link rel="apple-touch-icon-precomposed" sizes="72x72" href="<?= $site_assets ?>apple-touch-icon-72x72-precomposed.png" />
<link rel="apple-touch-icon-precomposed" sizes="114x114" href="<?= $site_assets ?>apple-touch-icon-114x114-precomposed.png" />

<!-- Favicon -->
<link rel="shortcut icon" href="<?= $site_assets ?>favicon.ico" />
<link rel="icon" type="image/png" href="<?= $site_assets ?>icon-32.png" />

<script type="text/javascript" src="<?= base_url() ?>js/jquery.js"></script>
<script type="text/javascript" src="<?= base_url() ?>js/social.core.js"></script>
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
	"geo_lon":"",
	"language":"<?= $this->session->userdata('language') ?>",
	"privacy":"<?= $logged_privacy ?>",	 
	"consumer_key": "<?= $oauth_consumer_key ?>",
	"consumer_secret": "<?= $oauth_consumer_secret ?>",
	"token": "<?= $oauth_token ?>",
	"token_secret": "<?= $oauth_token_secret ?>",
	"source": "<?= $user_source ?>"
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

	$('body').append('<div id="request_lightbox"><div id="lightbox_message">Blah blah blah I am cool!</div></div>');

	// Language Hide
	if (user_data.language != 'en' && user_data.language != '')
	{
		$('#container').html('<h1>Sorry!</h1><h3>We are not setup to handle non english languages at present.</h3><h3>We will let you know when we are.</h3>');
	}
	
	// Render Logged In ToolBar
	if (user_data.user_id != '')
	{		
		// Show Content
		if (isNotLoggedUrl(window.location.href))
		{		
			window.location = base_url + 'record/feeling'; 
		}
		else
		{
			showWebLogged(user_data.name, user_data.image);
		}
	}
	else
	{
		$('#header_not_logged').fadeIn('normal');	
	}
	
});
</script>
