<div id="header">
	<a id="header_home" href="<?= base_url() ?>">
		<img src="<?= $site_assets ?>apple-touch-icon-72x72-precomposed.png">
		<?php if ($this->uri->segment(1)): ?>
		<img id="header_name" src="<?= $site_assets ?>emoome-name.png">
		<?php endif; ?>
	</a>
	<ul id="header_links">	
	<?php if ($this->social_auth->logged_in()): ?>
		<li><a class="button" href="<?= base_url() ?>record">Record</a></li>	
		<li><a class="button" href="<?= base_url() ?>visualize">Visualize</a></li>	
		<li><a class="button" href="<?= base_url() ?>visualize/experiences">Experiences</a></li>	
		<li><a class="button" href="<?= base_url() ?>visualize/map">Map</a></li>	
		<li><a class="button" href="<?= $link_logout ?>">Log Out</a></li>
	<?php else: ?>
		<?php if (config_item('users_signup') == 'TRUE'): ?>
		<li><a class="button" href="<?= base_url().'signup' ?>">Sign Up</a></li>
		<?php endif; ?>
		<li><a class="button" href="<?= base_url().'login' ?>">Log In</a></li>
	<?php endif; ?>
	</ul>
	<div class="clear"></div>
</div>