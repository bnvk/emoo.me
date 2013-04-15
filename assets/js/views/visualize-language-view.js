// VISUALIZE LANGUAGE
var VisualizeLanguageView = Backbone.View.extend(
{
	initialize: function()
	{
		this.render();		
	},
	render: function()
	{
        var template = _.template($("#visualize_language_map").html());
        this.$el.html(template).hide().delay(250).fadeIn();
	},
	renderLanguage: function()
	{
		var circle_x 	= 0;
		var circle_y	= 0;
		var circle_size	= 10;
		var height		= 40;
		var logs		= {};
		var words		= {};
		var log_sentiments	= {};
		var canvas_width= 0;
		var color_height= {};
		var logs_data	= VisualizeLanguageModel.get('logs');
		var words_data	= VisualizeLanguageModel.get('words');

		// Group Words By log_id
		for (link in words_data)
		{
			if (words[words_data[link].log_id] === undefined)
			{
				words[words_data[link].log_id] = new Array(words_data[link].type);
			}
			else
			{
				words[words_data[link].log_id].push(words_data[link].type);
			}

			if (log_sentiments[words_data[link].log_id] === undefined)
			{
				log_sentiments[words_data[link].log_id] = new Array(words_data[link].sentiment);
			}
			else
			{
				log_sentiments[words_data[link].log_id].push(words_data[link].sentiment);
			}
		}

		// Group Logs
		for (log in logs_data)
		{
			logs[logs_data[log].log_id] = {
				"created_date": logs_data[log].created_date,
				"experience": logs_data[log].experience
			};
		}

		// Do Color Key
		for (color in EmoomeSettings.type_colors)
  		{
	  		if (color !== 'U')
  			{
	  			var color_swatch = '<div class="type_swatch"><div class="color_swatch" style="background:' + EmoomeSettings.type_colors[color] + '"></div>' + color + '</div>';
  				$('#user_word_colors').append(color_swatch);
  			}
  		}

  		// Do Color Height
  		for (type in EmoomeSettings.word_types)
  		{
			color_height[type] = height;
			height = height + 100;
		}

		$word_map_container = $('#user_word_map');
		var set_width = 80 - 125;

		// Loop Groups of Types
		$.each(words, function(log_id, value)
  		{
			circle_x = circle_x + 40;

			if (log_id !== 'undefined')
			{
				// Make Container
				set_width = set_width + 80;

				if (jQuery.inArray('U', value) < 0)
				{
					$word_map_container.append('<div class="word_map_column" data-experience="' + logs[log_id].experience + '" data-sentiment="' + log_sentiments[log_id] + '" data-created_date="' + logs[log_id].created_date + '" id="word_map_column_' + log_id + '"></div>').width(set_width);

					// Make Paper
					var paper = new Raphael(document.getElementById('word_map_column_' + log_id), 80, 700);

					// Do 4 Types
					for (type in EmoomeSettings.word_types)
					{
						if (type !=='U')
						{
							var this_type	= EmoomeSettings.word_types[type];
							var color		= EmoomeSettings.type_colors[this_type];
							var circle_y	= color_height[type];
							var size		= circle_size * countElementsArray(type, value);

							if (size > 0)
							{
								//console.log(log_id + ' type: ' + type + ' color: ' + color + ' size: ' + size + ' circle_x: ' + circle_x + ' circle_y: ' + circle_y);						
								paper.circle(40, circle_y, size).attr({fill: color, opacity: 0, 'stroke-width': 1, 'stroke': '#c3c3c3'}).animate({opacity: 1}, 1500);
							}
						}
					}
				}
			}
		});
		
		// Size Containers
		var new_width = $('#user_word_map').width() + 180;
		$('#user_word_map').width(new_width);

		// Do ToolTips
		$('.word_map_column').qtip({
			content: {
				text: function(api)
				{
					var sentiment = sentimentFromArray($(this).data('sentiment').split(','));
					var tooltip = '<img class="language-map-emoticons" src="/application/views/site_emoome/assets/emoticons/' + EmoomeSettings.core_emotions[sentiment] + '.svg">';
					tooltip +='<span class="language-map-experience">' + $(this).data('experience') + ' <i>' + mysqlDateParser($(this).data('created_date')).date('short') + '</i></span>';
					return tooltip;
				}
			},
			position: {
				my: 'top left',
				target: 'mouse',
				viewport: $(window), // Keep it on-screen at all times if possible
				adjust: {
					x: 10,  y: 10
				}
			},
			hide: {
				fixed: true // Helps to prevent the tooltip from hiding ocassionally when tracking!-
			},
			style: {
				classes: 'ui-tooltip-tipsy'
			}
		});
	}
});