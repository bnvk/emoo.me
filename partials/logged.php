<div id="header">
	<?php if ($this->social_auth->logged_in()): ?>
	<ul id="header_logged">
		<li><a href="<?= base_url() ?>emoome/visualize">Visualize</a></li>	
		<li><a href="<?= base_url() ?>emoome/visualize/experiences">Experiences</a></li>	
		<li><a href="<?= base_url() ?>emoome/visualize/map">Map</a></li>	
		<li><a href="<?= $link_logout ?>">Log Out</a></li>
	</ul>
	<?php else: ?>
	<ul id="header_not_logged">
		<?php if (config_item('users_signup') == 'TRUE'): ?>
		<li><a href="<?= base_url().'signup' ?>">Sign Up</a></li>
		<?php endif; ?>
		<li><a href="<?= base_url().'login' ?>">Log In</a></li>
	</ul>
	<?php endif; ?>
	<div class="clear"></div>
</div>