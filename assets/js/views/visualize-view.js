/* Visualize */
var VisualizeView = Backbone.View.extend(
{
	initialize: function() {
		this.render();
	},
	render: function() {
		var view_data	= {};
		var template	= _.template($("#visualize").html(), view_data);
		this.$el.html(template);

		// Less or More than 5
		if (VisualizeModel.get('logs_count') < 5) {

			$('#visualize_logs_needed_count').html(5 - VisualizeModel.get('logs_count'));
			$('#visualize_waiting').fadeIn('slow');
		}
		else {
			this.renderLastFive();
		}

		// More Than 10
		if (VisualizeModel.get('logs_count') > 10) {
	
			// Show Language Map Link
			if (UserData.get('source') !== 'mobile') {
				$('#your_language_map').fadeIn();
			}

			this.renderCommonWords();
		}

		// More Than 15
		if (VisualizeModel.get('logs_count') > 15) {
			this.renderStrongExperiences();
		}
	},
	renderLastFive: function() {

		// Create Pie Chart
		var types			= VisualizeModel.get('last_five').language;
		var types_colors	= [];
		var word_values		= [];
		var word_percents	= [];

		if (types['undecided'] !== undefined) {
			var types_total	= VisualizeModel.get('last_five').language_total - types['undecided'];
		}
		else {
			var types_total	= VisualizeModel.get('last_five').language_total;
		}

		// Build Data Values
		for (var type in types) {
			if (type !== 'undecided') {
				var type_percent = types[type] / types_total,
				type_percent = Math.round(type_percent * 100);
				word_values.push(types[type]);
				word_percents.push(type_percent + '%');
				types_colors.push(EmoomeSettings.type_colors[type]);
			}
		}

		this.renderPieChart(word_values, word_percents, types_colors);
		this.renderLineChart(word_values, word_percents, types_colors);

		// Mood & Topics
		this.renderMood();
		this.renderTopics();


		// Show Summary
		$('#visualize_summary').fadeIn();

		// Show Device (User Level Specific Navigation)
		if (UserData.get('source') !== 'mobile') {
			$('#visualize_navigation_language').show();

			if (UserData.get('user_level_id') <= 3) {
				$('#visualize_navigation_search').show();
			}
		}
	},
	renderPieChart: function(word_values, word_percents, types_colors) {

		// Piechart
		var pie_container	= 300;
		var pie_size		= 125;
		var pie_placement	= pie_size;
		var paperpie 		= Raphael('visualize-language-types-pie', pie_container, pie_container);

		pie = paperpie.piechart(pie_placement, pie_placement, pie_size, word_values, {
			colors : types_colors
	    });
	},
	renderLineChart: function(word_values, word_percents, types_colors) {
		
		$.each(VisualizeModel.get('last_five').language, function(type, score)
		{
			if (type !== 'undecided') {
				var decimal = score / VisualizeModel.get('last_five').language_total;
				var percent = Math.round(decimal * 100);			
				var type_data = {	
					color: EmoomeSettings.type_colors[type],
					percent: percent,
					type: type
				}

				var type_html = _.template($('#template-visualize-language-type').html(), type_data);
				$('#visualize-language-types').append(type_html);
			}
		});	
	},
	renderMood: function() {

		// Mood
		var sentiment = Math.round(VisualizeModel.get('last_five').sentiment / 20);		
		$('#visualize_language_mood').append('<img src="' + assets_url + 'emoticons/' + EmoomeSettings.core_emotions[sentiment] + '.svg">');
	},
	renderTopics: function() {

		$.each(VisualizeModel.get('last_five').topics, function(key, topic) {			
			if (key !== 'undecided') {
				var topic_html = _.template($('#template-visualize-topic').html(), { key: key, topic: topic });
				$('#visualize-mood-topics').append(topic_html);
			}
		});
	},
	renderCommonWords: function() {

		$visualize_common_words = $('#visualize-common-words');

		var word_count_row	= 0;
		var common_words	= VisualizeModel.get('all_time').words;

		$.each(common_words, function(word, count) {

			if (word_count_row < 10) {

				// Increment Existing
				if ($('#word-count-' +  count).length) {

					$('#word-count-' + count + '-words').append(', ' + word);
				}
				// Add New
				else {

					var common_html = _.template($('#template-visualize-common').html(), { count: count, word: word });
					$visualize_common_words.append(common_html);
					word_count_row++;
				}
			}
		});

		$('#visualize_common');
	},
	renderStrongExperiences: function() {

		$strong_experiences	= $('#visualize-strong-experiences');

		$.each(VisualizeModel.get('strong_experiences'), function(key, experience) {

			var color		= EmoomeSettings.type_colors[experience.type];
			var size		= experience.count * 10;
			var svg_size	= 8 * 10;
			var position	= svg_size / 2;

			// Create HTML Row
			var experience_data = { log_id: experience.log_id, experience: experience.experience, date: mysqlDateParser(experience.date).date('short') };
			var experience_html = _.template($('#template-visualize-experiences').html(), experience_data);
			$strong_experiences.append(experience_html);

			// Draw Circle
			setTimeout(function() {
				var paper = new Raphael(document.getElementById('strong-experience-' + experience.log_id), svg_size, svg_size);
				paper.circle(position, position, size).attr({fill: color, opacity: 0, 'stroke-width': 1, 'stroke': '#c3c3c3'}).animate({opacity: 1}, 1500);
			}, 250);
		});

		$strong_experiences.delay(1000).fadeIn();
	}
});