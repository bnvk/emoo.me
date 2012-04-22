<?php if (!$this->agent->is_mobile()): ?>
<div id="header">
	<a id="header_home" href="<?= base_url() ?>"></a>
	<ul id="header_links">	
	<?php if ($this->social_auth->logged_in()): ?>
		<li><a class="button" href="<?= base_url() ?>record/feeling">Record</a></li>	
		<li><a class="button" href="<?= base_url() ?>visualize">Visualize</a></li>	
		<li><a class="button" href="<?= base_url() ?>emoome/user">Settings</a></li>
		<li><a class="button" href="<?= $link_logout ?>">Log Out</a></li>
	<?php else: ?>
		<?php if (config_item('users_signup') == 'TRUE'): ?>
		<li><a class="button" id="button_signup" href="<?= base_url().'#!/signup' ?>">Sign Up</a></li>
		<?php endif; ?>
		<li><a class="button" id="button_login" href="<?= base_url().'#!/login' ?>">Log In</a></li>
	<?php endif; ?>
	</ul>
	<div class="clear"></div>
</div>
<?php endif; ?>