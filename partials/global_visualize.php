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
		<h2>Last 5 Entries</h2>
	</div>

	<div class="seven columns alpha animated bounceIn">
		<div id="visualize_language_mood"></div>
	</div>
	<div class="seven columns animated bounceIn">
		<div id="visualize-language-types-pie"></div>
	</div>
	<div class="two columns omega animated bounceIn">
		<div id="visualize-language-types"></div>
	</div>
	<div class="clear"></div>

	<div id="visualize-topics" class="row">
		<h2>Topics</h2>
		<div id="visualize-mood-topics"></div>
	</div>

	<div id="visualize-common" class="sixteen columns hide">
		<h2>Common Words</h2>
		<div id="visualize-common-words"></div>
	</div>

	<div id="visualize-experiences" class="sixteen columns hide">
		<h2>Strong Experiences</h2>
		<div id="visualize-strong-experiences"></div>
	</div>
</script>


<!-- Language -->
<script type="text/template" id="template-visualize-language-type">
	<div class="visualize-language-bar">
		<div class="visualize-language-type-color" style="background: {{ color }};"></div>
		<div class="visualize-language-type-percent">{{ percent }}%</div>
		<div class="visualize-language-type-type">{{ type }}</div>
	</div>
</script>


<!-- Topics -->
<script type="text/template" id="template-visualize-topic">
	<div class="visualize-topic animated bounceIn">
		<div class="visualize-topic-icon icon-topic-{{ key }}"></div>
		<span class="visualize-topic-count">{{ topic }}</span> <span class="visualize-topic-text">{{ key }}</span>
	</div>
</script>


<!-- Common Words -->
<script type="text/template" id="template-visualize-common">
	<div id="word_count_{{ count }}" class="common-words">
		<div class="common-words-count">{{ count }}</div>
		<div id="word-count-{{ count }}-words" class="common-words-words">{{ word }}</div>
		<div class="clear"></div>
	</div>
	<div class="common-words-line"></div>
</script>


<!-- Strong Experiences -->
<script type="text/template" id="template-visualize-experiences">
	<div class="strong-experience animated bounceIn">
		<div class="strong-experience-circle" id="strong-experience-{{ log_id }}"></div>
		<div class="strong-experience-experience"> {{ experience }} <span class="strong-experience-date"> {{ date }} </span></div>
		<div class="clear"></div>
	</div>
</script>
