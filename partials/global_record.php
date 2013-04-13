<!-- Record Views -->
<script type="text/template" id="record">
	<div class="animated bounceInUp">
		<div class="five columns"></div>
		<div id="content_test" class="six columns text-center">
			<h1>Record</h1>	
			<a class="button-big-secondary full-width" href="/#record/feeling"><span class="icon-profile"></span>How You Feel</a>
			<a class="button-big-secondary full-width" href="/#record/challenges"><span class="icon-profile"></span>Challenges</a>
			<a class="button-big-secondary full-width" href="/#record/lifepath"><span class="icon-lightbulb"></span>Lifepath</a>
			<a class="button-big-secondary full-width" href="/#record/thought"><span class="icon-brain"></span>Group Thought</a>
		</div>
		<div class="five columns omega"></div>
	</div>
</script>

<script type="text/template" id="record_feeling">
	<div class="animated bounceInLeft">	
		<div class="four columns alpha">
			<!--
			<div id="record-sub-controls">
				<a id="log_feeling_use_text" class="icon-text"></a>
				<a id="log_feeling_use_emoticons" class="icon-smile"></a>
				<a id="log_feeling_use_audio" class="left_control_links icon-microphone"></a>
			</div>
			-->
		</div>
	
		<!-- Text -->
		<div class="eight columns text-center">
			<h1>How do you feel right now?</h1>
			<input type="text" name="log_feeling" id="log_feeling_value" class="center" placeholder="Good" value="">
			<button id="log_feel_next" class="button-secondary">Next</button>
			<!-- <a href="#" class="button-primary" id="log_save_feeling" >Finish</a> -->
		</div>
	
		<div class="four columns omega"></div>
	
		<!--  Emoticons & Audio
		<div id="record_feeling_emoticons" class="eight columns text-center">
			<div id="emoticons"></div>
		</div>
		<div id="record_feeling_audio">
			<h2>Record / Stop</h2>
		</div>
		-->		
	</div>
</script>

<script type="text/template" id="record_experience">
	<div class="animated bounceInLeft">	
		<div class="four columns alpha"></div>
		<div class="eight columns text-center">
		<h1>What is one thing you did today?</h1>
		<textarea name="log_experience" id="log_experience_value" class="center" placeholder="Walked my pet dog"></textarea>
		<button id="log_experience_next" class="button-secondary">Next</button>
		<!-- <p><a href="#" class="log_save_feeling">Finish</a></p> -->
		</div>
		<div class="four columns omega"></div>
	</div>
</script>

<script type="text/template" id="record_describe">
	<div class="animated bounceInLeft">	
		<div class="four columns alpha"></div>
		<div class="eight columns text-center">
			<h1>Describe in three words</h1>
			<p id="log_describe_this">"{{ describe_this }}"</p>
			<input type="text" name="log_describe_1" id="log_describe_1_value" class="center" placeholder="Three" value="">
			<input type="text" name="log_describe_2" id="log_describe_2_value" class="center" placeholder="Separate" value="">
			<input type="text" name="log_describe_3" id="log_describe_3_value" class="center" placeholder="Words" value="">
			<button id="log_describe_next">Finish</button>
		</div>
		<div class="four columns omega"></div>
	</div>
</script>

<script type="text/template" id="record_thanks">
	<div id="log_thanks_view" class="content_center text-center">
		<h1>Thanks</h1>
		<h3 id="log_completion_message">{{ complete_message }}</h3>
		<p><a id="log_thanks_next" class="button-secondary" href="#">Another</a></p>
	</div>
</script>
