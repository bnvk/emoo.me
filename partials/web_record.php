<!-- Record Views -->
<script type="text/template" id="record">
	<div id="content_test" class="content_center text_center">
		<p><a id="button_cat_feeling" class="list_button" href="<?= base_url() ?>#/record/feeling"><span class="list_icon list_icon_profile"></span>How You Feel</a></p>
		<p><a id="button_cat_memory" class="list_button" href="<?= base_url() ?>#/record/thought"><span class="list_icon list_icon_brain"></span>Group Thought</a></p>
	</div>
</script>

<script type="text/template" id="record_feeling">
	<div class="left_control_container">
		<div id="log_feeling_use_text" class="left_control_links icon_small icon_small_text"></div>
		<div id="log_feeling_use_emoticons" class="left_control_links icon_small icon_small_emoticons"></div>
		<!-- <div id="log_feeling_use_audio" class="left_control_links icon_small icon_small_audio"></div> -->
	</div>
	<div class="right_control_container">
		<!-- Text -->
		<div id="record_feeling_text" class="content_center text_center">
			<h1>How do you feel right now?</h1>
			<p><input type="text" name="log_feeling" id="log_feeling_value" placeholder="Good" value=""></p>
			<p><button id="log_feel_next">Next</button></p>
			<!-- <p><a href="#" class="log_save_feeling">Finish</a></p> --> 
		</div>
		<!--  Emoticons -->
		<div id="record_feeling_emoticons">
			<div id="emoticons"></div>
		</div>
		<!-- Audio -->
		<div id="record_feeling_audio">
			<h2>Record / Stop</h2>
		</div>		
	</div>
</script>

<script type="text/template" id="record_experience">
	<div id="log_experience_view" class="content_center text_center">
		<h1>What is one thing you did today?</h1>
		<p><textarea name="log_experience" id="log_experience_value" placeholder="Walked my pet dog"></textarea></p>
		<p><button id="log_experience_next">Next</button></p>
		<!-- <p><a href="#" class="log_save_feeling">Finish</a></p> -->
	</div>
</script>

<script type="text/template" id="record_describe">
	<div id="log_describe_view" class="content_center text_center">
		<h1>Describe in three words</h1>
		<p id="log_describe_this">"<%= describe_this %>"</p>
		<p><input type="text" name="log_describe_1" id="log_describe_1_value" placeholder="Three" value=""></p>
		<p><input type="text" name="log_describe_2" id="log_describe_2_value" placeholder="Separate" value=""></p>
		<p><input type="text" name="log_describe_3" id="log_describe_3_value" placeholder="Words" value=""></p>
		<p><button id="log_describe_next">Finish</button></p>
	</div>
</script>

<script type="text/template" id="record_thanks">
	<div id="log_thanks_view" class="content_center text_center">
		<h1>Thanks :)</h1>
		<h3 id="log_completion_message"></h3>
		<p><a id="log_thanks_next" class="button" href="#">Another</a></p>
	</div>
</script>
