<!-- Visualize Views -->
<script type="text/template" id="visualize">
	<div id="visualize_waiting" class="content_center text_center hide">
		<h1>We are computing your emotions</h1>
		<div id="logs_needed">
			<p>You need to record</p>
			<div id="logs_needed_count"></div> 
			<p>More feelings before you can visualize</p>
		</div>
	</div>
	<div id="visualize_summary" class="hide">
		<h1>From Last 5 Entries</h1>
		<div id="visualize_navigation"><a href="#/visualize/language" class="button">Language Map</a> &nbsp;&nbsp;<a href="#/visualize/search" class="button">Search</a></div>
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