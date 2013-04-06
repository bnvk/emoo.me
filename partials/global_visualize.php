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

	<div id="visualize_language" class="four columns alpha">
		<h1>Your Language</h1>
		<div id="visualize_language_pie"></div>
		<div id="visualize_language_pie_legend"></div>
	</div>
	<div id="visualize_mood" class="eight columns omega">
		<h1>Mood & Topics</h1>
		<div id="visualize_mood_emoticon"></div>
		<div id="visualize_mood_topics"></div>
	</div>
	<div class="clear"></div>

	<h2>Explore Your Entries Further</h2>
	<a id="visualize_navigation_language" href="#/visualize/language" class="button-secondary hide"><span class="icon-language"></span> Language</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a id="visualize_navigation_search" href="#/visualize/search" class="button-secondary hide"><span class="icon-search"></span> Search</a>	

	<hr>


	<div id="visualize_common" class="sixteen columns hide">
		<h2>Common Words & Feelings</h2>
		<div id="visualize_common_words"></div>
		<hr>
	</div>

	<div id="visualize_experiences" class="sixteen columns hide">
		<h2>Strong Experiences</h2>
		<div id="strong_experiences"></div>
	</div>

</script>