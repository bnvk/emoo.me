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