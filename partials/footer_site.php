<div class="clear"></div>
<div id="footer">
	<p><a href="<?= base_url() ?>">Home</a> <a href="<?= base_url() ?>blog">Blog</a> <a href="<?= base_url() ?>privacy">Privacy</a> <a href="mailto:info@emoo.me">Contact</a></p>
	<p>&copy;<?= date('Y').' '.$site_title ?></p>
</div>
<?php /* if ($this->uri->segment(1)): ?>
<style type="text/css">
#feedback {
    background-color: #919191;
    border-radius: 15px;
    height:330px;
    position:fixed;
    bottom:0;
    right:120px;
    margin-bottom: -280px;
    padding: 0 20px;
    z-index:10000;
    cursor: pointer;
    color: #e9e8e8;
}
#feedback:hover {
	background-color: #333333;
}
#feedback h3 {
	font-size: 24px;
	margin: 10px 15px 0 15px;
}
#feedback p {
	margin: 0;
}
</style>
<script type="text/javascript">
$(document).ready(function()
{	
	$('#feedback').bind('click', function()
	{
		$(this).css('margin-bottom', '-20px');	
	});
});
</script>
<div id="feedback">
	<h3>Feedback</h3>
	<form name="feedback_form" id="feedback_form">
		<p>
			<select name="feedback_type">
				<option value="general">General</option>
				<option value="bug">Bug</option>
				<option value="help">Help</option>
			</select>
		</p>
		<p><input type="text" name="subject" placeholder="Emoome is pretty cool" value=""></p>
		<p><textarea name="message" placeholder="But there are issues with..."></textarea></p>
		<p><input type="submit" name="submit" value="Send"></p>
	</form>
</div>
<?php endif; */ ?>