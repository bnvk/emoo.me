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