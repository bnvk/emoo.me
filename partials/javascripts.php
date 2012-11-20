<script type="text/javascript" src="<?= $site_assets ?>js/libs/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="<?= $site_assets ?>js/libs-min.js"></script>
<script type="text/javascript" src="<?= $site_assets ?>js/plugins-<?= $user_source ?>-min.js"></script>
<script type="text/javascript" src="<?= $site_assets ?>js/dataviz-min.js"></script>
<script type="text/javascript" src="<?= $site_assets ?>js/models-<?= $user_source ?>-min.js"></script>
<script type="text/javascript" src="<?= $site_assets ?>js/views-<?= $user_source ?>-min.js"></script>
<script type="text/javascript" src="<?= $site_assets ?>js/routers-<?= $user_source ?>-min.js"></script>
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

// Instantiate Models
var UserData = new UserData();
var base_url = '<?= base_url() ?>';

$(document).ready(function()
{
	// Create Router
	var Router = new ApplicationRouter($('#content'));

	// History
	Backbone.history.start();
});
</script>