<script type="text/template" id="header_public">
	<ul id="toolbar_public" class="toolbar_links">
		<li><a class="navigation_button" href="<?= base_url() ?>#/"><span class="icon icon_home"></span>Home</a></li>
		<li><a class="navigation_button" href="<?= base_url() ?>#/login"><span class="icon icon_login"></span>Login</a></li>
		<li><a class="navigation_button" href="<?= base_url() ?>#/signup"><span class="icon icon_signup"></span>Signup</a></li>
	</ul>
</script>

<script type="text/template" id="header_user">
	<ul id="toolbar_logged" class="toolbar_links">
		<li><a class="toolbar_button" href="<?= base_url() ?>#/record/feeling"><span class="icon icon_record"></span>Record</a></li>	
		<li><a class="toolbar_button" href="<?= base_url() ?>#/visualize"><span class="icon icon_visualize"></span>Visualize</a></li>	
		<li><a class="toolbar_button" href="<?= base_url() ?>#/settings"><span class="icon icon_settings"></span>Settings</a></li>
	</ul>
</script>