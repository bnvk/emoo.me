<div id="header">
	<?php if (is_public_page($this->uri->segment(1))): ?>
	<div id="header_logo"></div>
	<h1><a href="<?= base_url() ?>">emo<span class="name_ome">ome</span></a></h1>
	<ul id="header_links_public" class="header_links">
	<?php else: ?>
	<div id="header_logged_user">
		<div id="header_logged_avatar"></div>
		<h1 id="header_logged_name"></h1>
		<p id="header_logged_count"></p>
		<div class="clear"></div>
	</div>
	<ul id="header_links_logged" class="header_links">
	<?php endif; ?>
	<?php if ($this->social_auth->logged_in()): ?>
		<li><a href="<?= base_url() ?>record/feeling"><span class="header_icons icon_record"></span>Record</a></li>	
		<li><a href="<?= base_url() ?>visualize"><span class="header_icons icon_visualize"></span>Visualize</a></li>	
		<li><a href="<?= base_url() ?>emoome/user"><span class="header_icons icon_settings"></span>Settings</a></li>
	<?php else: ?>
		<li>Have<br>Account</li>
		<li><a id="button_login" href="<?= base_url().'#!/login' ?>"><span class="header_icons icon_login"></span>Login</a></li>
		<li>Create<br>Account</li>
		<li><a id="button_signup" href="<?= base_url().'#!/signup' ?>"><span class="header_icons icon_signup"></span>Signup</a></li>
	<?php endif; ?>
	</ul>
	<div class="clear"></div>
</div>
