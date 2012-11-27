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