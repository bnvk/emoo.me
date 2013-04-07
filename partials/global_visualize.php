<!-- Visualize Views -->
<script type="text/template" id="visualize-waiting">
	<div id="visualize_waiting" class="text-center">
		<h1>We are computing your emotions</h1>
		<div id="visualize_logs_needed">
			<p>You need to record</p>
			<div id="visualize_logs_needed_count"></div> 
			<p>More entries to visualize</p>
		</div>
		<a href="#/record/feeling" class="button">Log Entry</a>
	</div>
</script>

<script type="text/template" id="visualize">

	<div class="row">
		<h2>Recently You've Been</h2>
	</div>

	<div id="visualize_mood" style="border: 1px solid red" class="six columns alpha">
		<div id="visualize_mood_emoticon"></div>
	</div>
	<div id="visualize_language" style="border: 1px solid red" class="ten columns omega">
		<!--<div id="visualize_language_pie"></div>-->
		<div id="visualize_language_pie_legend"></div>
	</div>

	<div class="row">
		<h2>Topics</h2>
		<div id="visualize_mood_topics"></div>
	</div>

	<div class="clear"></div>

	<div id="visualize_common" class="sixteen columns hide">
		<h2>Common Words</h2>
		<div id="visualize_common_words"></div>
	</div>

	<div id="visualize_experiences" class="sixteen columns hide">
		<h2>Strong Experiences</h2>
		<div id="strong_experiences"></div>
	</div>

</script>