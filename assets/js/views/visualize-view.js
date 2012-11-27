// VISUALIZE
var VisualizeView = Backbone.View.extend(
{
	initialize: function()
	{
		this.render();
	},
	render: function()
	{
		var view_data	= {};
		var template	= _.template($("#visualize").html(), view_data);
		this.$el.html(template).hide().delay(250).fadeIn();

		console.log('insider visualize render()');

		// Less or More than 5
		if (VisualizeModel.get('logs_count') < 5)
		{
			$('#logs_needed_count').html(5 - VisualizeModel.get('logs_count'));
			$('#visualize_waiting').fadeIn('slow');
		}
		else
		{
			this.renderLastFive();
		}

		// More Than 10
		if (VisualizeModel.get('logs_count') > 10)
		{
			// Show Language Map Link
			if (UserData.get('source') !== 'mobile')
			{
				$('#your_language_map').fadeIn();
			}
		
			this.renderCommonWords();
		}

		// More Than 15
		if (VisualizeModel.get('logs_count') > 15)
		{
			this.renderStrongExperiences();
		}
	},
	renderLastFive: function()
	{
		// Create Pie Chart
		var types			= VisualizeModel.get('last_five').language;
		var types_colors	= [];
		var word_values		= [];
		var word_percents	= [];

		if (types['undecided'] !== undefined)
		{
			var types_total	= VisualizeModel.get('last_five').language_total - types['undecided'];
		}
		else
		{
			var types_total	= VisualizeModel.get('last_five').language_total;
		}

		// Build Data Values
		for (var type in types)
		{
			if (type !== 'undecided')
			{
				var type_percent = types[type] / types_total,
				type_percent = Math.round(type_percent * 100);
				word_values.push(types[type]);
				word_percents.push(type_percent + '% ' + type);
				types_colors.push(EmoomeSettings.type_colors[type]);
			}
		}

		this.renderPieChart(word_values, word_percents, types_colors);

		// Mood & Topics
		this.renderMoodTopics();
		
		// Show Summary
		$('#visualize_summary').fadeIn();
	},
	renderPieChart: function(word_values, word_percents, types_colors)
	{
		// Piechart
		var pie_container	= EmoomeSettings.visualization_sizes[UserData.get('source')].pie_word_types_container;
		var pie_size		= EmoomeSettings.visualization_sizes[UserData.get('source')].pie_word_types;
		var pie_placement	= pie_size;
		var paperpie = Raphael('visualize_language_pie', pie_container, pie_container);

		pie = paperpie.piechart(pie_placement, pie_placement, pie_size, word_values,
		{
			colors : types_colors
	    });
	    /*
		pie.hover(function() {
			this.sector.stop();
			this.sector.scale(1.1, 1.1, this.cx, this.cy);
		}, function() {
			this.sector.animate({ transform: 's1 1 ' + this.cx + ' ' + this.cy }, 1000, "bounce");
		});
		*/

		// Piechart Legend
		var paper = new Raphael(document.getElementById('visualize_language_pie_legend'), 200, 225);
		var circle_y = 10;
		var text_y = 8;

		$.each(word_percents, function(key, percent)
		{
			paper.circle(10, circle_y, 10).attr({fill: types_colors[key], opacity: 1, 'stroke-width': 1, 'stroke': '#c3c3c3'});
			paper.text(35, text_y, percent).attr({"text-anchor": "start", "color": "#333333", "font-family": "'Ralway', 'Helvetica Neue', Helvetica, Arial, Sans-Serif", "font-size": 18, "line-height": 18, "font-weight": 100, "letter-spacing": 2});

			circle_y = circle_y + 50;
			text_y = text_y + 25;
		});
	},
	renderMoodTopics: function()
	{
		// Mood
		var sentiment = Math.round(VisualizeModel.get('last_five').sentiment / 5);
		$('#visualize_mood_emoticon').append('<span class="language-map-emoticons emoticons-' + EmoomeSettings.core_emotions[sentiment] + '"></span>');

		// Topics
		$.each(VisualizeModel.get('last_five').topics, function(key, topic)
		{
			if (key !== 'undecided')
			{
				$('#visualize_mood_topics').append('<div class="topic_container"><div class="icons_topics icons_topics_' + key + '"></div><span class="topic_count">' + topic + '</span> <span class="topic_text">' + key + '</span></div>');		
			}
		});		
	},
	renderCommonWords: function()
	{
		$visualize_common_words = $('#visualize_common_words');

		var word_count_row	= 0;
		var common_words	= VisualizeModel.get('all_time').words;

		$.each(common_words, function(word, count)
		{
			if (word_count_row < 10)
			{
				if ($('#word_count_' +  count).length)
				{
					// Add Word To Row
					$('#word_count_' + count + '_words').append(', ' + word);
				}
				else
				{
					// Create HTML Row
					$visualize_common_words.append('<div id="word_count_' + count + '" class="common_words">' +
						'<div class="common_words_count">' + count + '</div>' +
						'<div id="word_count_' + count + '_words" class="common_words_words">' + word + '</div>' +
						'<div class="clear"></div>' +
					'</div>' +
					'<div class="common_words_line"></div>');

					word_count_row++;
				}
			}
		});

		$('#visualize_common').delay(750).fadeIn();
	},
	renderStrongExperiences: function()
	{
		$strong_experiences	= $('#strong_experiences');

		$.each(VisualizeModel.get('strong_experiences'), function(key, experience)
		{
			var color		= EmoomeSettings.type_colors[experience.type];
			var size		= experience.count * EmoomeSettings.visualization_sizes[UserData.get('source')].circle_strong_experiences;
			var svg_size	= 8 * EmoomeSettings.visualization_sizes[UserData.get('source')].circle_strong_experiences;
			var position	= svg_size / 2;

			// Create HTML Row
			$strong_experiences.append('<div class="strong_experience"><div class="strong_experience_circle" id="strong_experience_' + experience.log_id + '"></div><div class="strong_experience_experience">"' + experience.experience + '" <span class="strong_experience_date">' + mysqlDateParser(experience.date).date('short') + '</span></div>' + '<div class="clear"></div></div>');

			// Draw Circle
			var paper = new Raphael(document.getElementById('strong_experience_' + experience.log_id), svg_size, svg_size);
			paper.circle(position, position, size).attr({fill: color, opacity: 0, 'stroke-width': 1, 'stroke': '#c3c3c3'}).animate({opacity: 1}, 1500);
		});

		$('#visualize_experiences').delay(1000).fadeIn();
	}
});