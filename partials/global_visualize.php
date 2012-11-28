<!-- Visualize Views -->
<script type="text/template" id="visualize">
	<div id="visualize_waiting" class="content_center text_center hide">
		<h1>We are computing your emotions</h1>
		<div id="visualize_logs_needed">
			<p>You need to record</p>
			<div id="visualize_logs_needed_count"></div> 
			<p>More entries to visualize</p>
		</div>
		<a href="#/record/feeling" class="button">Log Entry</a>
	</div>

	<div id="visualize_summary" class="hide">
		<h1>Last 5 Entries</h1>
		<div id="visualize_navigation">
			<a id="visualize_navigation_language" href="#/visualize/language" class="button hide">Language Map</a> &nbsp;&nbsp;<a id="visualize_navigation_search" href="#/visualize/search" class="button hide">Search</a></div>
		<div class="clear"></div>
		<div id="visualize_language">
			<h2>Language</h2>
			<div id="visualize_language_pie"></div>
			<div id="visualize_language_pie_legend"></div>
		</div>
		<div id="visualize_mood">
			<h2>Mood & Topics</h2>
			<div id="visualize_mood_emoticon"></div>
			<div id="visualize_mood_topics"></div>
		</div>
		<div class="clear"></div>
	</div>

	<div id="visualize_common" class="hide">
		<h2>Common Words & Feelings</h2>
		<div id="visualize_common_words"></div>
	</div>
	<div id="visualize_experiences" class="hide">
		<h2>Strong Experiences</h2>
		<div id="strong_experiences"></div>
	</div>
</script>