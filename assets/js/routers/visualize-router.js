var VisualizeRouter = Backbone.Router.extend(
{
	initialize: function(el) {
		this.el = el;
	},
	routes: {
		"visualize/language"	: "visualizeLanguage",
		"visualize/search"		: "visualizeSearch"
	},
	visualizeLanguage: function() {

		if (UserData.get('logged') !== 'yes' && UserData.get('source') === 'web') {
			Backbone.history.navigate('#/login', true);
		}

		// Instantiate Views
		VisualizeLanguage = new VisualizeLanguageView({ el: $('#content')});

		// Get / Render Visualize Language
		if (VisualizeLanguageModel.get('data') !== 'updated') {
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
		else {
			VisualizeLanguage.renderLanguage();
		}
	},
	visualizeSearch: function() {

		if (UserData.get('logged') !== 'yes' && UserData.get('source') === 'web') {
			Backbone.history.navigate('#/login', true);
		}

		// Instantiate Search
		VisualizeSearch = new SearchBox({ el: $("#content") });
	}
});