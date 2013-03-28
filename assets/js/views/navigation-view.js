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
    	"click #navigation_logo"		: "goToIndex",
		"click #navigation_menu_toggle"	: "toggleMenu",
		"click .navigation_link"		: "toggleLinkSelected"
	},
	showPublic: function()
	{    
		// Show Info    
        $('#navigation_info').html('<h1 class="navigation_title"><a href="/#/">emo<span class="name_ome">ome</span></a></h1>');

        var navigation_links = [
        	'<li><a href="/#/login" class="navigation_link"><span class="navigation_icons icon-keyhole"></span> Login</a></li>',
        	'<li><a href="/#/signup" class="navigation_link"><span class="navigation_icons icon-person"></span> Signup</a></li>'
        ];

        this.showNavigation(navigation_links);
	},
	showLogged: function()
	{
		// Show Info
        $('#navigation_info').html('<a href="/#/" class="navigation_avatar"><img src="' + UserData.get('image') + '"></a><h1 class="navigation_name"><a href="/#/">' + UserData.get('name') + '</a></h1>');

        // Show Links
        var navigation_links = [
        	'<li><a href="/#/record/feeling" class="navigation_link"><span class="navigation_icons icon-pencil"></span> Record</a></li>',
        	'<li><a href="/#/visualize" class="navigation_link"><span class="navigation_icons icon-eye"></span> Visualize</a></li>',
        	'<li><a href="/#/settings" class="navigation_link"><span class="navigation_icons icon-gears"></span> Settings</a></li>'
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

				console.log('loop: ' + i + ' count_x: ' + count_x + ' circle_x: ' + circle_x + ' size: ' + sizes[i]);

				circle = paper.circle(circle_x, 25, sizes[i]).attr({fill: color, opacity: 0, 'stroke-width': 0});
				circle.animate({opacity: 1}, 1000);
				circle_x += 10;
				i++;
			}
		});		
	},
	toggleMenu: function()
	{
		if($('#navigation_menu').css('display') == 'none')
		{ 
		   $('#navigation_menu').slideDown();
		} else {
		   $('#navigation_menu').slideUp();
		}
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
