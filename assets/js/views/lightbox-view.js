// LIGHTBOX
var LightboxView = Backbone.View.extend(
{
	initialize: function()
	{
		this.render();
	},
	render: function()
	{
		var data     = { lightbox_message: 'Yo dog, sup?' };
        var template = _.template($("#ligthbox_template").html(), data);        
        this.$el.append(template);
	},
	requestMade: function(message)
	{	
		$('#lightbox_message').removeClass('lightbox_message_success lightbox_message_error').addClass('lightbox_message_normal').html(message);
		$('#request_lightbox').delay(250).fadeIn();
	
		// Adjust Height For Device
		if (UserData.get('source') == 'mobile')
		{
			var new_lightbox_height = $('body').height() + 150;	
			var new_lightbox_scroll	= $(window).scrollTop() + 50;
		}
		else
		{
			var new_lightbox_height = $('body').height() + 100;
			var new_lightbox_scroll = $(window).scrollTop() + 100;
		}
	
		$('#lightbox_message').css('top', new_lightbox_scroll);
		$('#request_lightbox').height(new_lightbox_height);	
	},
	requestComplete: function(message, status)
	{
		$('#lightbox_message').html(message);
		
		if (status == 'success')
		{
			$('#lightbox_message').addClass('lightbox_message_success');
			$("#request_lightbox").delay(150).fadeOut();
		}
		else
		{
			$('#lightbox_message').addClass('lightbox_message_error');
			$("#request_lightbox").delay(2000).fadeOut();		
		}
	},
	printUserMessage: function(message)
	{
		$('#lightbox_message').removeClass('lightbox_message_success lightbox_message_error').addClass('lightbox_message_normal').html(message);
		$('#request_lightbox').delay(250).fadeIn();
		$("#request_lightbox").delay(1000).fadeOut();
	},
	closeFast: function()
	{
		$("#request_lightbox").fadeOut('fast');		
	}	
});

// Instantiate Lightbox
var Lightbox = new LightboxView({ el: $('body') });