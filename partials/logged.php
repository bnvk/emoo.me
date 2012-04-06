<div id="header">
	<a id="header_home" href="<?= base_url() ?>"><img src="<?= $site_assets ?>apple-touch-icon-72x72-precomposed.png"></a>

	<ul id="header_links">	
	<?php if ($this->social_auth->logged_in()): ?>
		<li><a href="<?= base_url() ?>emoome/contribute">Contribute</a></li>	
		<li><a href="<?= base_url() ?>emoome/visualize">Visualize</a></li>	
		<li><a href="<?= base_url() ?>emoome/visualize/experiences">Experiences</a></li>	
		<li><a href="<?= base_url() ?>emoome/visualize/map">Map</a></li>	
		<li><a href="<?= $link_logout ?>">Log Out</a></li>
	<?php else: ?>
		<?php if (config_item('users_signup') == 'TRUE'): ?>
		<li><a href="<?= base_url().'signup' ?>">Sign Up</a></li>
		<?php endif; ?>
		<li><a href="<?= base_url().'login' ?>">Log In</a></li>
	<?php endif; ?>
	</ul>
	<div class="clear"></div>
</div>