// HEADER
var NavigationView = Backbone.View.extend(
{
	initialize: function()
	{
		this.render();
	},
	render: function()
	{
		// Logged State
		if (UserData.get('user_id') != '') {
			this.showLogged();
		}
		else {
			this.showPublic();
		}
		
		if (UserData.get('source') != 'mobile') {
			this.showLogo();
			$('#navigation_menu').show();
		}		
	},
    events:
    {
    	"click #navigation_logo"	: "goToIndex",
		"click .navigation_link"	: "toggleLinkSelected"
	},
	showPublic: function()
	{    
		// Show Info    
        $('#navigation_info').html('<h1 class="navigation_title"><a href="/#">emo<span class="name_ome">ome</span></a></h1>');

        var navigation_links = [
        	'<li id="navigation_link_home"><a href="/#" class="navigation_link"><span class="icon-home"></span> Home</a></li>',
        	'<li><a href="/#login" class="navigation_link"><span class="icon-keyhole"></span> Login</a></li>',
        	'<li><a href="/#signup" class="navigation_link"><span class="icon-person"></span> Signup</a></li>'
        ];

        this.showNavigation(navigation_links);
	},
	showLogged: function()
	{
		// Show Info
        $('#navigation_info').html('<img src="' + UserData.get('image') + '"> <h1>' + UserData.get('name') + '</h1>');

        // Show Links
        var navigation_links = [
        	'<li><a href="/#record/feeling" class="navigation_link"><span class="icon-pencil"></span> Record</a></li>',
        	'<li><a href="/#insights" class="navigation_link"><span class="icon-lightbulb"></span> Insights</a></li>',
        	'<li><a href="/#visualize" class="navigation_link"><span class="icon-eye"></span> Visualize</a></li>',
        	'<li><a href="/#settings" class="navigation_link"><span class="icon-gears"></span> Settings</a></li>'
        ];

        this.showNavigation(navigation_links);
	},
	showNavigation: function(links)
	{
		$('#navigation_menu_links').html('');
	
        $.each(links, function(key, link) {
	    	$('#navigation_menu_links').append(link);
        });

        setInterval(function() {
        	$('#navigation_menu_links').fadeIn();
        }, 250);
	},
	showLogo: function()
	{
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
	toggleLinkSelected: function(e)
	{
		setInterval(function() {
			//$(e.target).addClass('selected');
		}, 250);
	},
	goToIndex: function()
	{
		Backbone.history.navigate('#/', true);
	}
});
