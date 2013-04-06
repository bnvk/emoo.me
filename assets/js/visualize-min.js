

/* **********************************************
     Begin visualize-language-view.js
********************************************** */

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
					var tooltip = '<span class="language-map-emoticons emoticons-small-' + EmoomeSettings.core_emotions[sentiment] + '"></span>';
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

/* **********************************************
     Begin visualize-search-view.js
********************************************** */

// SEARCH
SearchBox = Backbone.View.extend(
{
    initialize: function()
    {
        this.render();
    },
    render: function()
    {    
    	// ADD SEARCH FEATURES
    	// - When Do I Feel [search], What Makes Me Feel [search]
    	// - How Do I Feel Between [hours]
    	// - How Do I Feel Between [dates]
    	// - How Do I Feel About [keyword search]
    	// - How Do I Feel At [location]
    	var search_data = {
	    	title: "How Do I Feel Between"
    	}
    	
    	// Load Controls
    	var search_template = _.template($('#visualize_search_box').html(), search_data);
    	
    	// Add to HTML
    	this.$el.html(search_template);
    },
    events:
    {
        "click #search_button": "doSearch"  
    },
    doSearch: function()
    {	    	
	    // Search Vars
	    var search_options = {
	    	start_hour	: determineHourStart($('#start_time').val(), $('#start_meridian').val()),
	    	end_hour	: determineHourEnd($('#end_time').val(), $('#end_meridian').val())
	    }
	    	
	    // Do Search
	    this.getHourSearch(search_options);
    },
	getHourSearch: function(options)
	{
		$("#search_visualization").html('');
			
		$.oauthAjax(
		{
			oauth 		: UserData,		
			url			: base_url + 'api/emoome/analyze/time/start/' + options.start_hour + '/end/' + options.end_hour,
			type		: 'GET',
			dataType	: 'json',
		  	success		: function(result)
		  	{
		  		// Yay Feelings
				if (result.status == 'success')
				{
					// New View
					$('#search_visualization_title').html(result.log_count + ' entries found during those hours').hide().delay(250).fadeIn();
					
					var NewSearch = new ResultSearch({ el: $("#search_visualization") });
			  		NewSearch.renderHourSearch(result);
				}				
				else
				{
					$('#search_visualization').append('<div id="search_visualization_none">' + result.message + '</div>');
				}
		  	}
		});
	}
});

ResultSearch = Backbone.View.extend(
{
    initialize: function()
    {
        this.render();
    },
    render: function() {},
    renderHourSearch: function(result)
    {   
    	$.each(result.moods, function(mood, mood_value)
	    {
	    	console.log(mood_value);
	    	    
	    	if (mood != 'undefined')
	    	{
	    		// TOPICS
	    		var topics_data = mood_value.topics;
	    		var topics      = '';
	    		var topics_count= _.values(mood_value.topics).length;
	    	
	    		for (var topic in topics_data)
	    		{
		    		if (topic != 'undecided')
		    		{
		    			if ((topics_count > 6) && (topics_data[topic] > 1))
		    			{
		    				topics += '<div class="topic_container"><div class="icons_topics icons_topics_' + topic + '"></div><span class="topic_count">' + topics_data[topic] + '</span> <span class="topic_text">' + topic + '</span></div>';
		    			}
		    			else if (topics_count < 6)
		    			{
		    				topics += '<div class="topic_container"><div class="icons_topics icons_topics_' + topic + '"></div><span class="topic_count">' + topics_data[topic] + '</span> <span class="topic_text">' + topic + '</span></div>';
		    			}
		    					
		    		}
	    		}

				// INJECT DATA
		        var mood_data = { 
		        	mood      	: mood,
		        	emoticon 	: '<img src="' + base_url + 'application/modules/emoome/assets/images/emoticons-' + mood  + '.png">',
		        	log_count   : mood_value.log_count,
		        	topics  	: topics + '<div class="clear"></div>'
		        };
	
		        var mood_item = _.template($("#search_hour_mood").html(), mood_data);
		        
		        // INJECT HTML
		        $('#search_visualization').append(mood_item).hide().delay(500).fadeIn();


		        // LANGUAGE PIE CHART
				var types 			= mood_value.language;		
				var types_colors	= new Array();
				var word_values		= new Array();
				var word_percents	= new Array();
			
				for (var type in types)
				{					
					if (type != 'undecided')
					{			
						word_values.push(types[type]);			
						word_percents.push("%% " + type);
						types_colors.push(EmoomeSettings.type_colors[type]);
					}
				}		        
		        
			    var r = Raphael('search_mood_language_' + mood, 190, 190);
			    pie = r.piechart(90, 90, 90, word_values,
			    {
			    	colors : types_colors,
			    });
			    

	    		// WORDS
	    		$search_mood_words = $('#search_mood_words_' + mood);
	    		var words_data = mood_value.words;

	    		for (var word in words_data)
	    		{
	    			if ($('#search_words_' + mood + '_' + words_data[word]).length)
	    			{	
	    				$search_words_mood_words = $('#search_words_' + mood + '_words_' + words_data[word]);
	    				var word_count = $search_words_mood_words.data('word_count');
	    				word_count = parseInt(word_count) + 1;

		    			// Add Word To Row	
	    				if (word_count <= 10)	
	    				{
		    				$search_words_mood_words.data('word_count', word_count);
		    				$search_words_mood_words.append(', ' + word);
		    			}
		    		}
		    		else
		    		{			    		
						// Create HTML Row
						$search_mood_words.append('<div id="search_words_' + mood + '_' + words_data[word] + '" class="search_words_row">\
							<div class="search_words_count">' + words_data[word] + '</div>\
							<div id="search_words_' + mood + '_words_' + words_data[word] + '" data-word_count="1" class="search_words_words">' + word + '</div>\
							<div class="clear"></div>\
						</div>\
						<div class="search_common_words_line"></div>');
		    		}
	    		}			    
			}
	    });

    }
});

/* **********************************************
     Begin visualize-router.js
********************************************** */

var VisualizeRouter = Backbone.Router.extend(
{
	initialize: function(el)
	{
		this.el = el;
	},
	routes: {
		"visualize/language"	: "visualizeLanguage",
		"visualize/search"		: "visualizeSearch"
	},
	visualizeLanguage: function()
	{
		if (UserData.get('logged') !== 'yes' && UserData.get('source') === 'web') {
			Backbone.history.navigate('#/login', true);
		}

		// Instantiate Views
		VisualizeLanguage = new VisualizeLanguageView({ el: $('#content')});

		// Get / Render Visualize Language
		if (VisualizeLanguageModel.get('data') !== 'updated')
		{
			$.oauthAjax(
			{
				oauth		: UserData,
				url			: base_url + 'api/emoome/logs/user/id/' + UserData.get('user_id'),
				type		: 'GET',
				dataType	: 'json',
				success		: function(result)
				{
					// Update Model
					VisualizeLanguageModel.set(result);
					VisualizeLanguageModel.set({ data : 'updated' });
					
					// Render View
					VisualizeLanguage.renderLanguage();
				}
			});
		}
		else
		{
			VisualizeLanguage.renderLanguage();
		}
	},
	visualizeSearch: function()
	{
		if (UserData.get('logged') !== 'yes' && UserData.get('source') === 'web') {
			Backbone.history.navigate('#/login', true);
		}

		// Instantiate Search
		VisualizeSearch = new SearchBox({ el: $("#content") });
	}
});