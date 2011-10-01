<link rel="alternate" type="application/rss+xml" title="<?= $site_title ?> RSS 2.0 Feed" href="<?= base_url() ?>feed" />
<link rel="alternate" type="application/rss+xml" title="<?= $site_title ?> RSS 2.0 Comments" href="<?= base_url() ?>feed/comments" />

<link type="text/css" href="<?= base_url() ?>css/common.css" rel="stylesheet" media="screen" />
<link type="text/css" href="<?= $site_assets ?>style.css" rel="stylesheet" media="screen" />
<link type="text/css" href="<?= base_url() ?>css/uniform.default.css" rel="stylesheet" media="screen" charset="utf-8" />
<link type="text/css" href="<?= base_url() ?>css/jplayer.css" rel="stylesheet" media="screen" charset="utf-8" />
<link type="text/css" href="<?= base_url() ?>css/fancybox.css" rel="stylesheet" media="screen" charset="utf-8" />

<script type="text/javascript" src="<?= base_url() ?>js/jquery.js"></script>
<script type="text/javascript" src="<?= base_url() ?>js/jquery-ui.js"></script>
<script type="text/javascript" src="<?= base_url() ?>js/jquery.uniform.min.js"></script>
<script type="text/javascript" src="<?= base_url() ?>js/jquery.timers.js"></script>
<script type="text/javascript" src="<?= base_url() ?>js/jquery.fancybox.js"></script>
<script type="text/javascript" src="<?= base_url() ?>js/jquery.jplayer.min.js"></script>
<script type="text/javascript" src="<?= base_url() ?>js/jquery.url.js"></script>
<script type="text/javascript" src="<?= base_url() ?>js/social.auth.js"></script>
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
	"geo_accuracy":"",	
	"privacy":"<?= $logged_privacy ?>",	 
	"consumer_key": "<?= $oauth_consumer_key ?>",
	"consumer_secret": "<?= $oauth_consumer_secret ?>",
	"token": "<?= $oauth_token ?>",
	"token_secret": "<?= $oauth_token_secret ?>"
}

var base_url 		= '<?= base_url() ?>';
var current_module	= jQuery.url.segment(1);

$(document).ready(function()
{
	// Generates Uniform
	$(function(){
		$("select, input:checkbox, input:radio, input:file").uniform();
	});
	
	// Hides Things
	$('.error').hide();

});
</script>
<script type="text/javascript" src="<?= base_url() ?>js/social.core.js"></script>
