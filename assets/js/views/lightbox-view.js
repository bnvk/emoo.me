// LIGHTBOX
var LightboxView = Backbone.View.extend(
{
	initialize: function() {
		this.render();
	},
	render: function() {
        this.$el.append(_.template($("#ligthbox_template").html(), { lightbox_message: 'Yo dog, sup?' }));
	},
	requestMade: function(message) {

		$('#lightbox_message').removeClass('lightbox_message_success lightbox_message_error').addClass('lightbox_message_normal').html(message);
		$('#request_lightbox').delay(150).fadeIn();

		// Adjust Height For Device
		if (UserData.get('source') === 'mobile') {
			$('#request_lightbox').height($('body').height() + 500);
			$('#request_lightbox').height($('body').width() + 500);
		}
		else {
			$('#request_lightbox').height($('body').height() + 1000);
			$('#request_lightbox').height($('body').width() + 1000);
		}
	},
	requestComplete: function(message, status, successCallback) {

		$('#lightbox_message').html(message);

		if (status === 'success') {

			// Empty Stage
			$('#content').html('');

			// Hide Lightbox
			$('#lightbox_message').addClass('lightbox_message_success');
			$("#request_lightbox").delay(250).fadeOut(function() {
				successCallback();
			});
		}
		else {
			$('#lightbox_message').addClass('lightbox_message_error');
			$("#request_lightbox").delay(2000).fadeOut();
		}
	},
	printUserMessage: function(message) {

		$('#lightbox_message').removeClass('lightbox_message_success lightbox_message_error').addClass('lightbox_message_normal').html(message);
		$('#request_lightbox').delay(150).fadeIn();
		$("#request_lightbox").delay(1000).fadeOut();
	},
	closeFast: function() {

		$("#request_lightbox").fadeOut('fast');
	}
});