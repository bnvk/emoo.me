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
		$('#request_lightbox').delay(150).fadeIn();

		// Adjust Height For Device
		if (UserData.get('source') === 'mobile')
		{
			$('#lightbox_message').css('top', $(window).scrollTop() + 50);
			$('#request_lightbox').height($('body').height() + 250);
		}
		else
		{
			$('#lightbox_message').css('top', $(window).scrollTop() + 100);
			$('#request_lightbox').height($('body').height() + 1000);
		}
	},
	requestComplete: function(message, status)
	{
		$('#lightbox_message').html(message);
		
		if (status === 'success')
		{
			$('#lightbox_message').addClass('lightbox_message_success');
			$("#request_lightbox").delay(250).fadeOut();
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
		$('#request_lightbox').delay(150).fadeIn();
		$("#request_lightbox").delay(1000).fadeOut();
	},
	closeFast: function()
	{
		$("#request_lightbox").fadeOut('fast');
	}
});

// Instantiate Lightbox
var Lightbox = new LightboxView({ el: $('body') });