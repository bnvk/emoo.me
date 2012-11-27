// RECORD
var RecordFeelingView = Backbone.View.extend(
{
    initialize: function()
    {
		this.render();
    },
    render: function(){},
    events:
    {
		"click #log_feeling_use_text"		: "viewFeelingText",
		"click #log_feeling_use_emoticons"	: "viewFeelingEmoticons",
		"click #log_feeling_use_audio"		: "viewFeelingAudio",
		"click a.log_save_feeling"			: "processFeeling",
		"click div.emoticon_item"			: "processFeelingEmoticons",
		"click #log_feel_next"				: "processFeelingText",
		"click #log_experience_next"		: "processExperience",
		"click #log_describe_next"			: "processDescribe"
	},
	displayRecordType: function(type)
	{
		// Update Type
		UserData.set({ default_feeling_type : type });

		// Loop Types
		$.each(['text', 'emoticons', 'audio'], function(key, value)
		{
			if (value === type)
			{
				// Show View
				$('#record_feeling_' + value).fadeIn();
			}
			else
			{
				// Hide Views
				$('#record_feeling_' + value).hide();
			}

			$('#log_feeling_use_' + value).addClass('icon_small_' + value);
		});

		// Do Control Buttons
		$('div.left_control_links').removeClass('icon_small_text_select icon_small_emoticons_select icon_small_audio_select');
		$('#log_feeling_use_' + type).removeClass('icon_small_' + type).addClass('icon_small_' +  type + '_select');
    },
    viewFeeling: function()
    {
		// Update Model
		LogFeelingModel.startFeeling();

		// GeoLocation
		if (navigator.geolocation)
		{
			function geoSuccess(position)
			{
				LogFeelingModel.set({ geo_lat: position.coords.latitude, geo_lon: position.coords.longitude });
			}

			navigator.geolocation.getCurrentPosition(geoSuccess);
		}

		// Load View
		var template = _.template($("#record_feeling").html());
		this.$el.html(template).hide().delay(250).fadeIn();

		// Emoticons
		var emoticons		= '';
		var emoticons_width	= 765;

		$.each(EmoomeSettings.core_emotions, function(key, value)
		{
			emoticons += '<div class="emoticon_item"><div class="record_feeling_emoticon"><span data-feeling="' + value + '" class="emoticons-' + value + '"></span></div><div class="record_feeling_emoticon_text">' + value + '</div></div>';
			emoticons_width += 395;
		});
		
		$('#emoticons').html(emoticons).width(emoticons_width);

		// Show User Prefered Log Type
		if (UserData.get('default_feeling_type') === 'text') {
			this.viewFeelingText();
		}
		else if (UserData.get('default_feeling_type') === 'emoticons') {
			this.viewFeelingEmoticons();
		}
		else if (UserData.get('default_feeling_type') === 'audio') {
			this.viewFeelingAudio();
		}
		else {
			this.viewFeelingText();
		}
    },
    viewFeelingText: function()
    {
		// View
		this.displayRecordType('text');
		
		// Limit Keys
		$('#log_feeling_value').jkey('space, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0', function(key)
		{
			Lightbox.printUserMessage('Enter only a single word (no spaces or numbers)');
		});
    },
    viewFeelingEmoticons: function()
    {
		// View
		this.displayRecordType('emoticons');
		
		// Hover Emoticon
		$('.emoticon_item').live('mouseover', function()
		{
			$(this).css('background-color', '#d6d6d6');
		}).live('mouseleave', function()
		{
			$(this).css('background-color', '');
		});
	},
    viewFeelingAudio: function()
    {
		// View
		this.displayRecordType('audio');
    },
    processFeelingText: function()
    {
		$.validator(
		{
			elements :
				[{
					'selector'	: '#log_feeling_value',
					'rule'		: 'require',
					'field'		: 'Feeling'
				}],
			message : 'Enter a ',
			success	: function()
			{
				// Update Model
				LogFeelingModel.processFeeling($('#log_feeling_value').val());

				// Update URL & View
				Backbone.history.navigate('#/record/experience', true);
			},
			failed : function()
			{
				Lightbox.printUserMessage('Please enter how you feel right now');
			}
		});
    },
    processFeelingEmoticons: function(e)
    {
		// Update Model
		LogFeelingModel.processFeeling($(e.target).data('feeling'));

		// Update URL & View
		Backbone.history.navigate('#/record/experience', true);
    },
    processFeeling: function(e)
    {
		e.preventDefault();
		$.validator(
		{
			elements :
				[{
					'selector'	: '#log_feeling_value',
					'rule'		: 'require',
					'field'		: 'Experience'
				}],
			message : 'Enter a ',
			success	: function()
			{
				// Save To API
				$.oauthAjax(
				{
					oauth		: UserData,
					url			: base_url + 'api/emoome/logs/create_feeling',
					type		: 'POST',
					dataType	: 'json',
					data		: LogFeelingModel.returnData(),
					beforeSend	: Lightbox.requestMade('Saving your feeling'),
					success		: function(result)
					{
						// Close Loading
						Lightbox.requestComplete(result.message, result.status);

						// Is Saved
						if (result.status === 'success')
						{
							// Thanks Data
							$('#log_completion_message').html(_.shuffle(UIMessages.log_feeling_complete)[0]);

							// Update URL & View
							Backbone.history.navigate('#/record/thanks', true);
						}
					}
				});
			},
			failed : function()
			{
				Lightbox.printUserMessage('Please enter how you feel right now');
			}
		});
    },
    viewExperience: function()
    {
        var template = _.template($("#record_experience").html());
        this.$el.html(template).hide().delay(250).fadeIn();
    },
    processExperience: function()
    {
		$.validator(
		{
			elements :
				[{
					'selector'	: '#log_experience_value',
					'rule'		: 'require',
					'field'		: 'Experience'
				}],
			message : 'Enter a ',
			success	: function()
			{
				// Update Model
				LogFeelingModel.processExperience();

				// Update URL & View
				Backbone.history.navigate('#/record/describe', true);
			},
			failed : function()
			{
				Lightbox.printUserMessage('Please enter one thing you did today');
			}
		});
    },
    viewDescribe: function()
    {
		var view_data	= { describe_this: LogFeelingModel.get('experience') };
		var template	= _.template($("#record_describe").html(), view_data);
		this.$el.html(template).hide().delay(250).fadeIn();

        // Limit Keys
		$('#log_describe_1_value, #log_describe_2_value, #log_describe_3_value').jkey('space, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0', function()
		{
			Lightbox.printUserMessage('Enter only a single word (no spaces or numbers)');
		});
	},
	processDescribe: function()
    {
		$.validator(
		{
			elements :
				[{
					'selector'	: '#log_describe_1_value',
					'rule'		: 'require',
					'field'		: 'Describe 1'
				},{
					'selector'	: '#log_describe_2_value',
					'rule'		: 'require',
					'field'		: 'Describe 2'
				},{
					'selector'	: '#log_describe_3_value',
					'rule'		: 'require',
					'field'		: 'Describe 3'
				}],
			message : 'Enter a ',
			success	: function()
			{
				// Update Model
				LogFeelingModel.processDescribe();

				// Save To API
				$.oauthAjax(
				{
					oauth		: UserData,
					url			: base_url + 'api/emoome/logs/create_experience',
					type		: 'POST',
					dataType	: 'json',
					data		: LogFeelingModel.returnData(),
					beforeSend	: Lightbox.requestMade('Saving your experience'),
					success		: function(result)
					{
						// Close Loading
						Lightbox.requestComplete(result.message, result.status);

						// Is Saved
						if (result.status === 'success')
						{
							// Update URL & View
							Backbone.history.navigate('#/record/thanks', true);
						}
					}
				});
			},
			failed : function()
			{
				Lightbox.printUserMessage('Please enter three words to describe what you did today');
			}
		});
    },
    viewThanks: function()
    {
		// Clear Data
		this.clearInput();
		
		// Prep Template
		var view_data	= { describe_this: _.shuffle(UIMessages.log_feeling_complete)[0] };
		var template	= _.template($("#record_thanks").html(), view_data);

		// Render
		this.$el.html(template).hide().delay(250).fadeIn();
    },
    clearInput: function()
    {
		this.$('#log_val_feeling').val('');
		this.$('#log_val_experience').val('');
		this.$('#log_val_describe_1').val('');
		this.$('#log_val_describe_2').val('');
		this.$('#log_val_describe_3').val('');
		this.$('#log_describe_this').html('');
    }
});