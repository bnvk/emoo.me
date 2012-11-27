// HEADER
var NavigationView = Backbone.View.extend(
{
	initialize: function()
	{
		this.render();
	},
	render: function()
	{	
		if (UserData.get('user_id') != '')
		{
			this.renderLogged();
		}
		else
		{
			this.renderPublic();
		}

		var myScroll;
		
//		myScroll = new iScroll('container', { scrollbarClass: 'myScrollbar' });
		
	},
	renderPublic: function()
	{
        var template = _.template($("#header_public").html(), UserData.attributes);
        this.$el.html(template);		
	},
	renderLogged: function()
	{
        var template = _.template($("#header_user").html(), UserData.attributes);
        this.$el.html(template);		
	}	
});
