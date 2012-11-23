<!-- Web Visualize Views -->
<script type="text/template" id="visualize_language">
	<h1>Language Map</h1>	
	<div id="user_word_container">
		<div id="user_word_map"><div id="user_word_colors"></div></div>
		<div class="clear"></div>
	</div>
</script>

<script type="text/template" id="visualize_search_box">
	<h2 id="search_title">
		<%= title %>
		<select name="start_time" id="start_time">
			<option value="01">1</option>
			<option value="02">2</option>
			<option value="03">3</option>
			<option value="04" selected="selected">4</option>
			<option value="05">5</option>
			<option value="06">6</option>
			<option value="07">7</option>
			<option value="08">8</option>
			<option value="09">9</option>
			<option value="10">10</option>
			<option value="11">11</option>
			<option value="12">12</option>
		</select>		
		<select name="start_meridian" id="start_meridian">
			<option value="AM">AM</option>
			<option value="PM" selected="selected">PM</option>
		</select>
		to
		<select name="end_time" id="end_time">
			<option value="01">1</option>
			<option value="02">2</option>
			<option value="03">3</option>
			<option value="04">4</option>
			<option value="05">5</option>
			<option value="06">6</option>
			<option value="07" selected="selected">7</option>
			<option value="08">8</option>
			<option value="09">9</option>
			<option value="10">10</option>
			<option value="11">11</option>
			<option value="12">12</option>
		</select>
		<select name="end_meridian" id="end_meridian">
			<option value="AM">AM</option>
			<option value="PM" selected="selected">PM</option>
		</select>
	</h2>
	<input type="button" name="search_button" id="search_button" value="Go">
	<div class="clear"></div>
	<h2 id="search_visualization_title"></h2>
	<div id="search_visualization">
		<h3>~What would you like to find out about yourself?</h3>
	</div>
</script>	

<script type="text/template" id="search_hour_mood">
	<div id="mood_bar_<%= mood %>" class="search_mood_row">
		<div class="search_mood_emoticon"><span class="emoticons-small-<%= mood %>"></span></div>
		<div class="search_mood_pie_chart" id="search_mood_language_<%= mood %>"></div>
		<div class="search_mood_topics"><%= topics %></div>
		<div class="search_mood_words" id="search_mood_words_<%= mood %>"></div>
	</div>		
</script>