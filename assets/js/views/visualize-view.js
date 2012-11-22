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

		// Display Title
		if (VisualizeModel.get('logs_count') > 5 && UserData.get('source') !== 'mobile')
		{
			$('#visualize_title').fadeIn();
		}

		// Less or More than 5
		if (VisualizeModel.get('logs_count') < 5)
		{
			$('#logs_needed_count').html(5 - VisualizeModel.get('logs_count'));
			$('#visualize_waiting').fadeIn('slow');
		}
		else
		{
			$('#visualize_summary').fadeIn();
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
		
			this.renderAllTime();
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

		// Build Data Values
		for (var type in types)
		{
			if (type !== 'undecided')
			{
				word_values.push(types[type]);
				word_percents.push("%% " + type);
				types_colors.push(EmoomeSettings.type_colors[type]);
			}
		}

		this.renderPieChart("last_five", word_values, word_percents, types_colors);
	},
	renderAllTime: function()
	{
		// Create Pie Chart
		var types			= VisualizeModel.get('all_time').language;
		var types_colors	= [];
		var word_values		= [];
		var word_percents	= [];

		// Build Data Values
		for (var type in types)
		{
			if (type !== 'undecided')
			{
				word_values.push(types[type]);
				word_percents.push("%% " + type);
				types_colors.push(EmoomeSettings.type_colors[type]);
			}
		}

		this.renderPieChart("all_time", word_values, word_percents, types_colors);
	},
	renderPieChart: function(element, word_values, word_percents, types_colors)
	{
		var r = Raphael(element, 575, 375);
		pie = r.piechart(175, 175, 150, word_values,
		{
			colors : types_colors
		});//.attr({"font": "24px 'Ralway', 'Helvetica Neue', Helvetica, Arial, Sans-Serif", "font-family": "'Ralway', 'Helvetica Neue', Helvetica, Arial, Sans-Serif", "font-size": 24, "font-weight": 100, "letter-spacing": 2});

		pie.hover(function()
		{
			this.sector.stop();
			this.sector.scale(1.1, 1.1, this.cx, this.cy);
			
			if (this.label) {
				this.label[0].stop();
				this.label[0].attr({ r : 15 });
			}
		}, function()
		{
			this.sector.animate({ transform: 's1 1 ' + this.cx + ' ' + this.cy }, 1000, "bounce");

			if (this.label){
				this.label[0].animate({ r : 10 }, 750, "bounce");
			}
		});

		return true;
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
			var size		= experience.count * 10;
			var svg_size	= 8 * 10;
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