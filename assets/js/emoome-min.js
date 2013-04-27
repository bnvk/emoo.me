_.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
};

/* **********************************************
     Begin emoome-settings-model.js
********************************************** */

// Emoome Settings
var EmoomeSettings = Backbone.Model.extend({
	type_colors	: {
		"emotional": "#ff0000",
		"intellectual": "#142bd7",
		"descriptive": "#dcca07",
		"sensory": "#0aa80e",
		"action": "#ee9700",
		"physical": "#cf00ee",
		"undecided": "#c3c3c3"
	},
	word_types : {
		"E":"emotional",
		"I":"intellectual",
		"D":"descriptive",
		"S":"sensory",
		"A":"action",
		"P":"physical",
		"U":"undecided"
	},
	types_count : {
		"E":0,"I":0,"D":0,"S":0,"A":0,"P":0,"U":0
	},
	word_types_sub : {
		"M":"moral",
		"S":"slang",
		"P":"perception",
		"Y":"psychological",
		"L":"feeling",
		"F":"food",
		"C":"common",
		"U":"undecided"
	},
	types_sub_count	: {
		"M":0,"S":0,"P":0,"Y":0,"L":0,"F":0,"C":0
	},
	core_emotions : {
		"10":"joy",
		"9":"happy",
		"8":"amazement",
		"7":"serenity",
		"6":"interest",
		"5":"optimism",
		"4":"happy",
		"3":"goofy",
		"2":"acceptance",
		"1":"surprise",
		"0":"neutral",
		"-1":"annoyed",
		"-2":"crazy",
		"-3":"disapproval",
		"-4":"disgust",
		"-5":"fear",
		"-6":"sad",
		"-7":"shame",
		"-8":"grief",
		"-9":"loathing",
		"-10":"anger",
		"-11":"rage"
	}
});

/* **********************************************
     Begin ui-messages-model.js
********************************************** */

// UI Messages
var UIMessages = Backbone.Model.extend({
	log_feeling_complete : [
		"Every entry helps us build your emotional map",
		"We suggest logging 1-2 entries per day",
		"Try logging entries at different times of the day",
		"The best entries are when you feel something strongly",
		"If something is hard to describe it is a good entry",
		"The best entries are moments that seem important",
		"Had an intense experience? Log an entry for later analysis"
	],
	memory_quote : [
		"Memory is the scribe of the soul. ~Aristotle",
		"It is a poor sort of memory that only works backwards. ~Lewis Carroll"
	]
});

/* **********************************************
     Begin user-model.js
********************************************** */

// User Model
var UserModel = Backbone.Model.extend(
{
	defaults: {
		logged			: 'no',
		user_id      	: '',
		username     	: '',
		user_level_id	: '',
		name         	: '',
		email        	: '',
		phone_number    : '',
		image        	: '',
		location     	: '',
		geo_enabled  	: '',
		language     	: '',
		privacy      	: '',	 
		consumer_key 	: '',
		consumer_secret	: '',
		token        	: '',
		token_secret 	: '',
		source       	: 'web',
		user_meta	 	: {},
		notifications_frequency	: 'daily',
		notifications_sms		: 'yes',
		notifications_email		: 'yes',
		default_feeling_type	: 'text'
	},
    initialize: function() {}
});

var UserModel = new UserModel();


/* **********************************************
     Begin feeling-model.js
********************************************** */

// Record Feeling
var LogFeelingModel = Backbone.Model.extend({
    defaults: {
        source			: 'web',
        feeling			: '',
        experience		: '',
        describe_1		: '',
        describe_2		: '',
        describe_3		: '',
        time_feeling 	: 0,
        time_experience	: 0,
        time_describe 	: 0,
        time_total 		: 0,
        geo_lat			: 0.00,
        geo_lon			: 0.00
    },
    initialize: function() {},
    startFeeling: function() {
    
		this.set({ time_feeling : new Date().getTime() });
    },
    processFeeling: function(feeling) {
    	
	    var now_time = new Date().getTime();	
		var time_feeling = now_time - this.get('time_feeling');    
    
	 	this.set({
			feeling 		: feeling,
			time_feeling 	: time_feeling,
			time_experience : now_time,
	 	});	 	   
    },
    processExperience: function() {

	    var now_time = new Date().getTime();	
		var time_experience = now_time - this.get('time_experience');  
    
		this.set({
			type 			: 'experience',
			experience		: $('#log_experience_value').val(),
			time_experience : time_experience,
			time_describe	: now_time
		});    
    },
    processDescribe: function() {
    
	    var now_time		= new Date().getTime();	
		var time_describe	= now_time - this.get('time_describe');  
		var time_total		= this.get('time_feeling') + this.get('time_experience') + time_describe; 
      
		this.set({
			time_describe 	: time_describe,
			time_total		: time_total,
			describe_1		: $('#log_describe_1_value').val(),
			describe_2		: $('#log_describe_2_value').val(),
			describe_3		: $('#log_describe_3_value').val()
		});		    
    },
    returnData: function() {

		var log_data = [];
		
		$.each(LogFeelingModel.attributes, function(key, value)
		{
			log_data.push({ name: key, value: value });
		});
		
		return log_data;	
    }
});

/* **********************************************
     Begin visualize-model.js
********************************************** */

// Visualize Model
var VisualizeModel = Backbone.Model.extend({
    defaults: {
    	status				: 'error',
    	message				: 'No data loaded yet',
    	logs_count			: 0,
		last_five			: {},
		all_time			: {},
		strong_experiences	: {},
		data				: 'empty'   
    }
});

var VisualizeModel	= new VisualizeModel();

/* **********************************************
     Begin visualize-language-model.js
********************************************** */

// Visualize Language Model
var VisualizeLanguageModel = Backbone.Model.extend({
    defaults: {
    	status				: 'error',
    	message				: 'No data loaded yet',
		logs				: {},
		words				: {},
		data				: 'empty'   
    }
});

var VisualizeLanguageModel = new VisualizeLanguageModel();

/* **********************************************
     Begin lightbox-view.js
********************************************** */

// LIGHTBOX
var LightboxView = Backbone.View.extend(
{
	initialize: function() {
		this.render();
	},
	render: function() {
        this.$el.append(_.template($("#ligthbox_template").html(), { lightbox_message: 'Yo dog, sup?' }));
	},
	requestMade: function(message) {

		$('#lightbox_message').removeClass('lightbox_message_success lightbox_message_error').addClass('lightbox_message_normal').html(message);
		$('#request_lightbox').delay(150).fadeIn();

		// Adjust Height For Device
		if (UserData.get('source') === 'mobile') {
			$('#request_lightbox').height($('body').height() + 500);
			$('#request_lightbox').height($('body').width() + 500);
		}
		else {
			$('#request_lightbox').height($('body').height() + 1000);
			$('#request_lightbox').height($('body').width() + 1000);
		}
	},
	requestComplete: function(message, status, successCallback) {

		$('#lightbox_message').html(message);

		if (status === 'success') {

			// Empty Stage
			$('#content').html('');

			// Hide Lightbox
			$('#lightbox_message').addClass('lightbox_message_success');
			$("#request_lightbox").delay(250).fadeOut(function() {
				successCallback();
			});
		}
		else {
			$('#lightbox_message').addClass('lightbox_message_error');
			$("#request_lightbox").delay(2000).fadeOut();
		}
	},
	printUserMessage: function(message) {

		$('#lightbox_message').removeClass('lightbox_message_success lightbox_message_error').addClass('lightbox_message_normal').html(message);
		$('#request_lightbox').delay(150).fadeIn();
		$("#request_lightbox").delay(1000).fadeOut();
	},
	closeFast: function() {

		$("#request_lightbox").fadeOut('fast');
	}
});

/* **********************************************
     Begin navigation-view.js
********************************************** */

// HEADER
var NavigationView = Backbone.View.extend(
{
	initialize: function() {
		this.render();
	},
	render: function() {

		// Logged State
		if (UserData.get('user_id') != '') {
			this.showLogged();
		}
		else {
			this.showPublic();
		}
	},
    events: {
    	"click #navigation_logo"	: "goToIndex",
		"click .navigation_link"	: "toggleLinkSelected"
	},
	showPublic: function() {

		// Show Info
        $('#navigation_info').html('<h1 class="navigation_title"><a href="/#">emo<span class="name_ome">ome</span></a></h1>');

        var navigation_links = [
        	'<li id="navigation_link_home"><a href="/#" class="navigation_link"><span class="icon-home"></span> Home</a></li>',
        	'<li><a href="/#login" class="navigation_link"><span class="icon-keyhole"></span> Login</a></li>',
        	'<li><a href="/#signup" class="navigation_link"><span class="icon-person"></span> Signup</a></li>'
        ];

        this.showNavigation(navigation_links);
	},
	showLogged: function() {

		// Show Info
        $('#navigation_info').html('<img src="' + UserData.get('image') + '"> <h1>' + UserData.get('name') + '</h1>');

        // Show Links
        var navigation_links = [
        	//'<li><a href="/#insights" class="navigation_link"><span class="icon-lightbulb"></span> Insights</a></li>',
        	'<li><a href="/#record/feeling" class="navigation_link"><span class="icon-pencil"></span> Record</a></li>',
        	'<li><a href="/#visualize" class="navigation_link"><span class="icon-pie_graph"></span> Visualize</a></li>',
        	'<li><a href="/#settings" class="navigation_link"><span class="icon-gears"></span> Settings</a></li>'
        ];

        this.showNavigation(navigation_links);
	},
	showNavigation: function(links) {

		$('#navigation_menu_links').html('');

        $.each(links, function(key, link) {
	    	$('#navigation_menu_links').append(link);
        });

        setInterval(function() {
        	$('#navigation_menu_links').fadeIn();
        }, 250);
	},
	showLogo: function() {

		// Make Paper
		var paper = new Raphael(document.getElementById('navigation_logo'), 200, 50);
		var count_x = 0;
		var circle_x = 0;
		var sizes = [4, 7, 8, 6, 5, 9];
		var i=0;

		// Do 4 Types
		$.each(EmoomeSettings.type_colors, function(type, color) {

			if (type != 'undecided') {

				count_x = 0;
				circle_x += sizes[i] * 2;

				//console.log('loop: ' + i + ' count_x: ' + count_x + ' circle_x: ' + circle_x + ' size: ' + sizes[i]);
				circle = paper.circle(circle_x, 25, sizes[i]).attr({fill: color, opacity: 0, 'stroke-width': 0});
				circle.animate({opacity: 1}, 1000);
				circle_x += 10;
				i++;
			}
		});
	},
	toggleLinkSelected: function(e) {

		setInterval(function() {
			//$(e.target).addClass('selected');
		}, 250);
	},
	goToIndex: function() {
		Backbone.history.navigate('#/', true);
	}
});


/* **********************************************
     Begin content-view.js
********************************************** */

// GENERIC CONTENT
var ContentView = Backbone.View.extend(
{
	/* Initialize with the template-id */
	initialize: function(view) {
		this.view = view;
	},
	render: function() {
		/* Get the template content and render it into a new div-element */
		var template = $(this.view).html();
		$(this.el).html(template);
		return this;
	}
});

/* **********************************************
     Begin auth-view.js
********************************************** */

// AUTHENTICATE
var AuthView = Backbone.View.extend(
{
    initialize: function() {
		this.render();
    },
    render: function(){},
    events: {
    	"click #button_login" 				: "processLogin",
    	"submit #user_login" 				: "processLogin",
    	"click #button_signup"				: "processSignup",
    	"submit #user_signup"				: "processSignup",
    	"click #button_signup_short" 		: "processSignupShort",
    	"submit #button_signup_short" 		: "processSignupShort",
    	"click #button_forgot_password" 	: "processForgotPassword",
    	"submit #user_forgot_password" 		: "processForgotPassword"    	
    },
    viewLogin: function() {
        this.$el.html(_.template($("#login").html()));
    },
    viewSignup: function() {
        this.$el.html(_.template($("#signup").html()));
    },
    viewForgotPassword: function() {
        this.$el.html( _.template($("#forgot_password").html()));
    },
	processLogin: function(e) {

		e.preventDefault();
		$.validator({
			elements :
				[{
					'selector' 	: '#login_email',
					'rule'		: 'email',
					'field'		: 'is required (must be valid)',
					'action'	: 'label'
				},{
					'selector' 	: '#login_password',
					'rule'		: 'require',
					'field'		: 'is required',
					'action'	: 'label'
				}],
			message : '',
			success	: function() {

				var login_data = $('#user_login').serializeArray();
				login_data.push({'name':'session','value':'1'});

				$.ajax({
					url			: base_url + 'api/users/login',
					type		: 'POST',
					dataType	: 'json',
					data		: login_data,
					beforeSend	: Lightbox.requestMade('Logging You In'),
			  		success		: function(result) {

			  			Lightbox.requestComplete(result.message, result.status, function() {

				  			// Empty Stage
							$('#content').html('');

							// Update Model
							UserData.set({ logged: 'yes' });
							UserData.set(result.user);

							// Update Navigation
							Navigation.showLogged();

							// Update URL & View
							Backbone.history.navigate('#record/feeling', true);
						});
				 	}
				});
			}
		});
	},
	processSignup: function(e) {

		e.preventDefault();
		$.validator({
			elements :
				[{
					'selector' 	: '#signup_name',
					'rule'		: 'require',
					'field'		: 'is required',
					'action'	: 'label'			
				},{
					'selector' 	: '#signup_email',
					'rule'		: 'email',
					'field'		: 'is required (must be valid)',
					'action'	: 'label'				
				},{
					'selector' 	: '#signup_password',
					'rule'		: 'require',
					'field'		: 'is required (and should be clever)',
					'action'	: 'label'
				}],
			message : '',
			success	: function() {

				var signup_data = $('#user_signup').serializeArray();
				signup_data.push({'name':'session','value':'1'},{'name':'password_confirm','value':$('#signup_password').val()});
				$.ajax({
					url			: base_url + 'api/users/signup',
					type		: 'POST',
					dataType	: 'json',
					data		: signup_data,
					beforeSend	: Lightbox.requestMade('Creating Account'),
			  		success		: function(result) {

			  			Lightbox.requestComplete(result.message, result.status, function() {

							// Update Model
							UserData.set({ logged: 'yes' });
							UserData.set(result.user);

							// Update Navigation
							Navigation.showLogged();

							// Update URL & View
							Backbone.history.navigate('#record/feeling', true);
						});
				 	}
				});
			}
		});
	},
	processSignupShort: function(e) {

		e.preventDefault();
		$.validator({
			elements :
				[{
					'selector' 	: '#signup_name_short',
					'rule'		: 'require',
					'field'		: 'Enter your name',
					'action'	: 'label'	
				},{
					'selector' 	: '#signup_email_short',
					'rule'		: 'email',
					'field'		: 'Please enter a valid email',
					'action'	: 'label'		
				},{
					'selector' 	: '#signup_password_short',
					'rule'		: 'require',
					'field'		: 'Please enter a password',
					'action'	: 'label'
				}],
			message : '',
			success	: function() {

				var signup_data = $('#user_signup_short').serializeArray();
				signup_data.push({'name':'session','value':'1'},{'name':'password_confirm','value':$('#signup_password_short').val()});
				$.ajax({
					url			: base_url + 'api/users/signup',
					type		: 'POST',
					dataType	: 'json',
					data		: signup_data,
					beforeSend	: Lightbox.requestMade('Creating Account'),
			  		success		: function(result) {

			  			Lightbox.requestComplete(result.message, result.status, function() {

							// Update Model
							UserData.set({ logged: 'yes' });
							UserData.set(result.user);

							// Update Navigation
							Navigation.showLogged();

							// Update URL & View
							Backbone.history.navigate('#record/feeling', true);
						});
				 	}
				});
			}
		});
	},
	processForgotPassword: function(e) {

		e.preventDefault();
		$.validator({
			elements :
				[{
					'selector' 	: '#forgot_email',
					'rule'		: 'email',
					'field'		: 'Please enter a valid email',
					'action'	: 'label'
				}],
			message : '',
			success	: function() {

				$.ajax({
					url			: base_url + 'api/users/password_forgot',
					type		: 'POST',
					dataType	: 'json',
					data		: $('#user_forgot_password').serializeArray(),
					beforeSend	: Lightbox.requestMade('Resetting Password'),
			  		success		: function(result) {

			  			Lightbox.requestComplete(result.message, result.status, function() {
							Backbone.history.navigate('#login', true);
						});
			  		}
			  	});
			}
		});
	}
});

/* **********************************************
     Begin record-view.js
********************************************** */

// RECORD
var RecordFeelingView = Backbone.View.extend(
{
    initialize: function() {
		this.render();
    },
    render: function(){},
    events: {
		"click #log_feeling_use_text"       : "viewFeelingText",
		"click #log_feeling_use_emoticons"  : "viewFeelingEmoticons",
		"click #log_feeling_use_audio"      : "viewFeelingAudio",
		"click a.log_save_feeling"          : "processFeeling",
		"click div.emoticon_item"           : "processFeelingEmoticons",
		"keyup #log_feeling_value"          : "checkProcessFeelingText",
		"click #log_feel_next"              : "processFeelingText",
		"click #log_experience_next"        : "processExperience",
		"keyup #log_describe_3_value"       : "checkProcessDescribe",
		"click #log_describe_next"          : "processDescribe"
	},
	displayRecordType: function(type) {

		// Update Type
		UserData.set({ default_feeling_type : type });

		// Loop Types
		$.each(['text', 'emoticons', 'audio'], function(key, value) {

			// Show / Hide Record Types
			if (value === type) {
				$('#record_feeling_' + value).fadeIn();
			}
			else {
				$('#record_feeling_' + value).hide();
			}

			$('#log_feeling_use_' + value).addClass('icon_small_' + value);
		});

		// Do Control Buttons
		$('div.left_control_links').removeClass('icon_small_text_select icon_small_emoticons_select icon_small_audio_select');
		$('#log_feeling_use_' + type).removeClass('icon_small_' + type).addClass('icon_small_' +  type + '_select');
    },
    viewFeeling: function() {

		// Update Model
		LogFeelingModel.startFeeling();

		// GeoLocation
		if (navigator.geolocation) {

			function geoSuccess(position) {
				LogFeelingModel.set({ geo_lat: position.coords.latitude, geo_lon: position.coords.longitude });
			}

			navigator.geolocation.getCurrentPosition(geoSuccess);
		}

		// Load View
		this.$el.html(_.template($("#record_feeling").html()));

		// Emoticons
		/*
		var emoticons		= '';
		var emoticons_width	= 765;

		$.each(EmoomeSettings.core_emotions, function(key, value) {
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
		*/
		this.viewFeelingText();
    },
    viewFeelingText: function() {

		// View
		this.displayRecordType('text');
		
		// Limit Keys
		$('#log_feeling_value').jkey('space, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0', function(key) {
			Lightbox.printUserMessage('Enter only a single word (no spaces or numbers)');
		});
    },
    viewFeelingEmoticons: function() {

		// View
		this.displayRecordType('emoticons');
		
		// Hover Emoticon
		$('.emoticon_item').live('mouseover', function() {
			$(this).css('background-color', '#d6d6d6');
		}).live('mouseleave', function() {
			$(this).css('background-color', '');
		});
	},
    viewFeelingAudio: function() { 
		this.displayRecordType('audio');
    },
	checkProcessFeelingText: function(e) {
	    if (e.keyCode != 13) return;
        this.processFeelingText();	
	},
    processFeelingText: function() {

		$.validator({
			elements :
				[{
					'selector'	: '#log_feeling_value',
					'rule'		: 'require',
					'field'		: 'Feeling'
				}],
			message : 'Enter a ',
			success	: function() {

				// Update Model
				LogFeelingModel.processFeeling($('#log_feeling_value').val());

				// Update URL & View
				Backbone.history.navigate('#record/experience', true);
			},
			failed: function() {
				Lightbox.printUserMessage('Please enter how you feel right now');
			}
		});
    },
    processFeelingEmoticons: function(e) {
 
		// Update Model
		LogFeelingModel.processFeeling($(e.target).data('feeling'));

		// Update URL & View
		Backbone.history.navigate('#record/experience', true);
    },
    processFeeling: function(e) {

		e.preventDefault();
		$.validator({
			elements :
				[{
					'selector'	: '#log_feeling_value',
					'rule'		: 'require',
					'field'		: 'Experience'
				}],
			message : 'Enter a ',
			success	: function() {

				$.oauthAjax({
					oauth		: UserData,
					url			: base_url + 'api/emoome/logs/create_feeling',
					type		: 'POST',
					dataType	: 'json',
					data		: LogFeelingModel.returnData(),
					beforeSend	: Lightbox.requestMade('Saving your feeling'),
					success		: function(result) {

						// Close Loading
						Lightbox.requestComplete(result.message, result.status, function() {

							// Thanks Data
							$('#log_completion_message').html(_.shuffle(UIMessages.log_feeling_complete)[0]);

							// Update URL & View
							Backbone.history.navigate('#record/thanks', true);
						});
					}
				});
			},
			failed : function() {
				Lightbox.printUserMessage('Please enter how you feel right now');
			}
		});
    },
    viewExperience: function() {
        this.$el.html(_.template($("#record_experience").html()));
    },
    processExperience: function() {

		$.validator({
			elements :
				[{
					'selector'	: '#log_experience_value',
					'rule'		: 'require',
					'field'		: 'Experience'
				}],
			message : 'Enter a ',
			success	: function() {

				// Update Model
				LogFeelingModel.processExperience();

				// Update URL & View
				Backbone.history.navigate('#record/describe', true);
			},
			failed : function() {
				Lightbox.printUserMessage('Please enter one thing you did today');
			}
		});
    },
    viewDescribe: function() {

		var view_data = { describe_this: LogFeelingModel.get('experience') };
		this.$el.html(_.template($("#record_describe").html(), view_data)).hide().delay(250).fadeIn();

        // Limit Keys
		$('#log_describe_1_value, #log_describe_2_value, #log_describe_3_value').jkey('space, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0', function() {
			Lightbox.printUserMessage('Enter only a single word (no spaces or numbers)');
		});
	},
	checkProcessDescribe: function(e) {
	    if (e.keyCode != 13) return;
        this.processDescribe();
	},
	processDescribe: function() {

		$.validator({
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
			success	: function() {

				// Update Model
				LogFeelingModel.processDescribe();

				// Save To API
				$.oauthAjax({
					oauth		: UserData,
					url			: base_url + 'api/emoome/logs/create_experience',
					type		: 'POST',
					dataType	: 'json',
					data		: LogFeelingModel.returnData(),
					beforeSend	: Lightbox.requestMade('Saving your experience'),
					success		: function(result) {

						Lightbox.requestComplete(result.message, result.status, function() {
							Backbone.history.navigate('#record/thanks', true);
						});
					}
				});
			},
			failed : function() {
				Lightbox.printUserMessage('Please enter three words to describe what you did today');
			}
		});
    },
    viewThanks: function() {

		this.clearInput();

		var view_data = { complete_message: _.shuffle(UIMessages.log_feeling_complete)[0] };

		this.$el.html(_.template($("#record_thanks").html(), view_data));
    },
    clearInput: function() {
		this.$('#log_val_feeling').val('');
		this.$('#log_val_experience').val('');
		this.$('#log_val_describe_1').val('');
		this.$('#log_val_describe_2').val('');
		this.$('#log_val_describe_3').val('');
		this.$('#log_describe_this').html('');
    }
});


/* **********************************************
     Begin settings-view.js
********************************************** */

// SETTINGS
var SettingsView = Backbone.View.extend(
{
    initialize: function() {
		this.render();
    },
    render: function() {},
    events: {
    	"click #settings_button_notifications" 	: "processNotifications",
    	"submit #settings_notifications"		: "processNotifications",
    	"click #settings_button_account" 		: "processAccount",
    	"submit #settings_account"				: "processAccount",
    	"click #settings_button_password" 		: "processPassword",
      	"submit #settings_account"				: "processPassword",
      	"click #settings_logout"				: "processLogout"
    },
    viewNotifications: function() {
        this.$el.html(_.template($("#settings_notifications").html()));
    },
    viewAccount: function() {
        this.$el.html(_.template($("#settings_account").html(), UserData.attributes));
    },
    viewPassword: function() {
        this.$el.html(_.template($("#settings_password").html()));
    },
    processNotifications: function(e) {

		e.preventDefault();

		var notifications_data = $('#settings_notifications').serializeArray();
		notifications_data.push({'name':'module','value':'notifications'});

		$.oauthAjax({
			oauth 		: UserData,
			url			: base_url + 'api/users/details/id/' + UserData.get('user_id'),
			type		: 'POST',
			dataType	: 'json',
			data		: notifications_data,
			beforeSend	: Lightbox.requestMade('Saving notification settings'),
	  		success		: function(result) {

		  		Lightbox.requestComplete(result.message, result.status, function() {});
		 	}
		});
    },
    processAccount: function(e) {

		e.preventDefault();
		$.validator({
			elements :
				[{
					'selector' 	: '#profile_name',
					'rule'		: 'require',
					'field'		: 'is required',
					'action'	: 'label'				
				},{
					'selector' 	: '#profile_email',
					'rule'		: 'email',
					'field'		: 'is required (must be valid)',
					'action'	: 'label'
				}],
			message : '',
			success	: function() {

				var account_data = $('#settings_account').serializeArray();
				account_data.push({'name':'session','value':1});

				$.oauthAjax({
					oauth 		: UserData,
					url			: base_url + 'api/users/modify/id/' + UserData.get('user_id'),
					type		: 'POST',
					dataType	: 'json',
					data		: account_data,
					beforeSend	: Lightbox.requestMade('Saving account changes'),
			  		success		: function(result) {

				  		Lightbox.requestComplete(result.message, result.status, function() {
					  		$('#navigation_info').find('h1').html($('#profile_name').val());
							UserData.set(result.user);
						});
				 	}
				});
			}
		});
    },
    processPassword: function(e) {

		e.preventDefault();
		$.validator({
			elements :
				[{
					'selector' 	: '#old_password',
					'rule'		: 'require',
					'field'		: 'is required',
					'action'	: 'label'
				},{
					'selector' 	: '#new_password',
					'rule'		: 'require',
					'field'		: 'is required',
					'action'	: 'label'
				},{
					'selector' 	: '#new_password_confirm',
					'rule'		: 'confirm',
					'field'		: 'needs to match',
					'action'	: 'label'
				}],
			message : '',
			success	: function() {

				$.oauthAjax({
					oauth 		: UserData,
					url			: base_url + 'api/users/password',
					type		: 'POST',
					dataType	: 'json',
					data		: $('#settings_change_password').serializeArray(),
					beforeSend	: Lightbox.requestMade('Changing your password'),
					success		: function(result) {

						Lightbox.requestComplete(result.message, result.status, function() {
							$('#old_password').val('');
							$('#new_password').val('');
							$('#new_password_confirm').val('');
							Backbone.history.navigate('#settings', true);
						});
					}
				});
			}
		});
    },
    processLogout: function(e) {

	    e.preventDefault();	    
		$.oauthAjax({
			oauth 		: UserData,
			url			: base_url + 'api/users/logout',
			type		: 'GET',
			dataType	: 'json',
			beforeSend	: Lightbox.requestMade('Logging you out...'),
			success		: function(result) {	
			
				Lightbox.requestComplete(result.message, result.status, function() {
						
					// Update Model
					UserData.set({ logged: 'no', user_id: '', username: '', name: '', user_level_id	: '', name : '', image : '', location : '', geo_enabled : '', language : '', privacy : '', consumer_key : '', consumer_secret : '', token : '', token_secret : '' });		

					// Update Navigation
					Navigation.showPublic();

					// Redirect
					Backbone.history.navigate('#logout', true);
				});
			}
		});
    },
    processCancel: function(e) {

		e.preventDefault();
		Backbone.history.navigate('#settings', true);
    }
});

/* **********************************************
     Begin insights-view.js
********************************************** */

/* Insights */
var InsightsView = Backbone.View.extend(
{
	initialize: function() {
		this.render();
	},
	render: function() {
	
		var view_data	= {};
		var template	= _.template($("#template-insights").html(), view_data);
		this.$el.html(template);


	}
});

/* **********************************************
     Begin visualize-view.js
********************************************** */

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
		var pie_size		= 150;
		var pie_placement	= pie_size;
		var paperpie 		= Raphael('visualize-language-types-pie', pie_container, pie_container);

		pie = paperpie.piechart(pie_placement, pie_placement, pie_size, word_values, {
			colors : types_colors
	    });
	},
	renderLineChart: function(word_values, word_percents, types_colors) {
		
		$.each(VisualizeModel.get('last_five').language, function(type, score) {

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

/* **********************************************
     Begin global-router.js
********************************************** */

var ApplicationRouter = Backbone.Router.extend(
{
	initialize: function(el) {

		this.el = el;

		// Generic Views
		this.indexView				= new ContentView('#index');
		this.logoutView				= new ContentView('#logout');
		this.notFoundView			= new ContentView('#not_found');

		// Record Views
		this.recordIndex			= new ContentView('#record');
		this.recordFeeling			= new RecordFeelingView({ el: $('#content') });

		// Settings Views
		this.settingsIndex			= new ContentView('#settings');
		this.settingsViews			= new SettingsView({ el: $('#content')});
	},
	routes: {
		"" 						: "index",
		"login" 				: "login",
		"signup"				: "signup",
		"forgot_password"		: "forgotPassword",
		"logout"				: "logout",
		"record"				: "recordViews",
		"record/:view"			: "recordViews",
		"insights"				: "insights",
		"visualize"				: "visualize",
		"settings"				: "settingsViews",
		"settings/:view"		: "settingsViews"
	},
	currentView: null,
	switchView: function(view) {
		if (this.currentView) {
			this.currentView.remove();	// Detach the old view
		}

		this.el.html(view.el);			// Move the view element into the DOM (replacing the old content)
		view.render();					// Render view after it is in the DOM (styles are applied)
		this.currentView = view;
	},
	setActiveNav: function(url)	{	// For Main Nav Links and Shit
	    $.each(['record', 'visualize', 'settings'], function(key, value) {		
		    if (value == type) {
				$('#record_feeling_' + value).fadeIn();
			}
			else {
				$('#record_feeling_' + value).hide(); 
			}
	    });

	    // Do Control Buttons
	    $('div.left_control_links').removeClass('icon_small_text_on icon_small_emoticons_on icon_small_audio_on');
	    $('#log_feeling_use_' + type).addClass('icon_small_' +  type + '_on');
	},
	index: function() {
		if (UserData.get('logged') === 'yes') {
			Backbone.history.navigate('#record/feeling', true);	
		}
		else {
			this.switchView(this.indexView);
		}
	},
	login: function() {
		if (UserData.get('logged') === 'yes') {
			Backbone.history.navigate('#record/feeling', true);
		}
		else {
			AuthView.viewLogin();
		}
	},
	signup: function() {
		if (UserData.get('logged') === 'yes') {
			Backbone.history.navigate('#record/feeling', true);
		}
		else {
			AuthView.viewSignup();
		}
	},
	forgotPassword: function() {
		AuthView.viewForgotPassword();
	},
	logout: function() {
		this.switchView(this.logoutView);
	},
	notFound: function() {
		this.switchView(this.notFoundView);
	},
	recordViews: function(view) {
		if (UserData.get('logged') !== 'yes') {
			Backbone.history.navigate('#login', true);
		}
		else if (view === undefined) {
			this.switchView(this.recordIndex);
		}
		else if (view === 'feeling') {
			this.recordFeeling.viewFeeling();
		}
		else if (view === 'experience') {
			this.recordFeeling.viewExperience();
		}
		else if (view === 'describe') {
			this.recordFeeling.viewDescribe();
		}
		else if (view === 'thanks') {
			this.recordFeeling.viewThanks();
		}
		else {
			this.switchView(this.notFoundView);
		}
	},
	insights: function() {
		InsightViews = new InsightsView({ el: $('#content')});
	},
	visualize: function(view) {

		if (UserData.get('logged') !== 'yes') {
			Backbone.history.navigate('#/login', true);
		}
		else {

			// Get / Render Visualize
			if (VisualizeModel.get('data') !== 'updated') {
				$.oauthAjax({
					oauth		: UserData,
					url			: base_url + 'api/emoome/analyze/me',
					type		: 'GET',
					dataType	: 'json',
					success		: function(result) {

						// Is Saved
						if (result.status === 'success') {

							// Update Model
							VisualizeModel.set(result);
							VisualizeModel.set({ data : 'updated' });

							// Render View
							VisualizeViews = new VisualizeView({ el: $('#content')});
						}
						else {
							VisualizeViews = new VisualizeView({ el: $('#content')});
						}
					}
				});
			}
			else {
				VisualizeViews = new VisualizeView({ el: $('#content')});
			}
		}
	},
	settingsViews: function(view) {

		if (UserData.get('logged') !== 'yes') {
			Backbone.history.navigate('#login', true);
		}
		else if (view === undefined) {
			this.switchView(this.settingsIndex);
		}
		else if (view === 'notifications') {
			this.settingsViews.viewNotifications();
		}
		else if (view === 'account') {
			this.settingsViews.viewAccount();
		}
		else if (view === 'password') {
			this.settingsViews.viewPassword();
		}
		else {
			this.switchView(this.notFoundView);
		}
	}
});