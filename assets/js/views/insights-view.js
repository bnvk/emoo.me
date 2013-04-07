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