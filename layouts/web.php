<!doctype html>
<!--[if lt IE 7]><html class="no-js ie6 oldie" lang="en"> <![endif]-->
<!--[if IE 7]><html class="no-js ie7 oldie" lang="en"> <![endif]-->
<!--[if IE 8]><html class="no-js ie8 oldie" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<head>
<?= $head ?>
</head>
<body>
<div id="navigation">
	<div id="navigation_info"></div>
	<div id="navigation_menu">
		<ul id="navigation_menu_links"></ul>
	</div>
	<div id="navigation_logo"></div>
	<div class="clear"></div>
</div>	

<!-- Where The Magic Happens -->
<div class="container" id="content"></div>
<div class="clear"></div>

<!-- Partials -->
<script type="text/template" id="ligthbox_template">
	<div id="request_lightbox">
		<div id="lightbox_message"><%= lightbox_message %></div>
	</div>
</script>

<script type="text/template" id="not_found">
	<h1>Oops</h1>
	<p>Apologies, but we could not find what you were looking for</p>
</script>

<!-- Web Templates -->
<?= $template_public ?>
<?= $template_auth ?>
<?= $template_record ?>
<?= $template_visualize ?>
<?= $template_settings ?>

<!-- Web Javascripts -->
<script type="text/javascript" src="<?= $site_assets ?>js/libs/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="<?= $site_assets ?>js/libs-min.js"></script>
<script type="text/javascript" src="<?= $site_assets ?>js/plugins-<?= $user_source ?>-min.js"></script>
<script type="text/javascript" src="<?= $site_assets ?>js/dataviz-min.js"></script>
<script type="text/javascript" src="<?= $site_assets ?>js/emoome-<?= $user_source ?>-min.js"></script>
<script type="text/javascript">
//Global User Data:
var UserData = Backbone.Model.extend(
{
	defaults: {
		logged			: '<?= $logged_is ?>',
		user_id      	: "<?= $logged_user_id ?>",
		username     	: "<?= $logged_username ?>",
		user_level_id	: "<?= $logged_user_level_id ?>",
		name         	: "<?= $logged_name ?>",
		email        	: "<?= $logged_email ?>",
		phone_number    : "<?= $logged_phone_number ?>",
		image        	: "<?= $logged_image ?>",
		location     	: "<?= $logged_location ?>",
		geo_enabled  	: "<?= $logged_geo_enabled ?>",
		language     	: "<?= $this->session->userdata('language') ?>",
		privacy      	: "<?= $logged_privacy ?>",	 
		consumer_key 	: "<?= $oauth_consumer_key ?>",
		consumer_secret	: "<?= $oauth_consumer_secret ?>",
		token        	: "<?= $oauth_token ?>",
		token_secret 	: "<?= $oauth_token_secret ?>",
		source       	: "<?= $user_source ?>",
		user_meta	 	: {},
		notifications_frequency	: "daily",
		notifications_sms		: "yes",
		notifications_email		: "yes",
		default_feeling_type	: "text"
	},
    initialize: function() {}
});

var App = (function ($, Backbone, global) {

    var init = function() { 
        // URL
        global.base_url = '<?= base_url() ?>';

        // Model
        global.UserData = new UserData();

		// Create Router
		global.Router = new ApplicationRouter($('#content'));
		<?php if (!$this->agent->is_mobile()): ?>
		global.ExtraRouter = new VisualizeRouter($('#content'));
		<?php endif; ?>

        // Start Backbone History
        Backbone.history.start();
    };

    return { init: init };

} (jQuery, Backbone, window));

$(document).ready(function()
{
	App.init();
});
</script>
<?php if (!$this->uri->segment(1)) echo $google_analytics; ?>
</body>
</html>
