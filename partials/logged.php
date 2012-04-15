<?php if ($this->agent->is_mobile()): ?>
<?php if ($this->social_auth->logged_in() AND $this->uri->segment(1) == ''): ?>
<div id="header">
	<a id="header_home" href="<?= base_url() ?>"></a>
	<ul id="header_links">	
		<?php if (config_item('users_signup') == 'TRUE'): ?>
		<li><a id="button_signup" class="button" href="<?= base_url().'record/feeling' ?>">Record</a></li>
		<?php endif; ?>
		<li><a id="button_login" class="button" href="<?= base_url().'logout' ?>">Log Out</a></li>
	</ul>
	<div class="clear"></div>
</div>
<?php elseif ($this->uri->segment(1) != ''): ?>
<?php else: ?>
<div id="header">
	<a id="header_home" href="<?= base_url() ?>"></a>
	<ul id="header_links">	
		<?php if (config_item('users_signup') == 'TRUE'): ?>
		<li><a id="button_signup" class="button" href="<?= base_url().'#!/signup' ?>">Sign Up</a></li>
		<?php endif; ?>
		<li><a id="button_login" class="button" href="<?= base_url().'#!/login' ?>">Log In</a></li>
	</ul>
</div>
<?php endif; ?>

<?php else: ?>
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
		<li><a id="button_signup" class="button" href="<?= base_url().'#!/signup' ?>">Sign Up</a></li>
		<?php endif; ?>
		<li><a id="button_login" class="button" href="<?= base_url().'#!/login' ?>">Log In</a></li>
	<?php endif; ?>
	</ul>
	<div class="clear"></div>
</div>
<?php endif; ?>