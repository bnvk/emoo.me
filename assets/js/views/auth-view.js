// AUTHENTICATE
var AuthView = Backbone.View.extend(
{
    initialize: function() {
		this.render();
    },
    render: function(){},
    events: {
    	"click #button_login" 				: "processLogin",
    	"submit #user_login" 				: "processLogin",
    	"click #button_signup"				: "processSignup",
    	"submit #user_signup"				: "processSignup",
    	"click #button_signup_short" 		: "processSignupShort",
    	"submit #button_signup_short" 		: "processSignupShort",
    	"click #button_forgot_password" 	: "processForgotPassword",
    	"submit #user_forgot_password" 		: "processForgotPassword"    	
    },
    viewLogin: function() {
        this.$el.html(_.template($("#login").html()));
    },
    viewSignup: function() {
        this.$el.html(_.template($("#signup").html()));
    },
    viewForgotPassword: function() {
        this.$el.html( _.template($("#forgot_password").html()));
    },
	processLogin: function(e) {

		e.preventDefault();
		$.validator({
			elements :
				[{
					'selector' 	: '#login_email',
					'rule'		: 'email',
					'field'		: 'is required (must be valid)',
					'action'	: 'label'
				},{
					'selector' 	: '#login_password',
					'rule'		: 'require',
					'field'		: 'is required',
					'action'	: 'label'
				}],
			message : '',
			success	: function() {

				var login_data = $('#user_login').serializeArray();
				login_data.push({'name':'session','value':'1'});

				$.ajax({
					url			: base_url + 'api/users/login',
					type		: 'POST',
					dataType	: 'json',
					data		: login_data,
					beforeSend	: Lightbox.requestMade('Logging You In'),
			  		success		: function(result) {

			  			Lightbox.requestComplete(result.message, result.status, function() {

				  			// Empty Stage
							$('#content').html('');

							// Update Model
							UserData.set({ logged: 'yes' });
							UserData.set(result.user);

							// Update Navigation
							Navigation.showLogged();

							// Update URL & View
							Backbone.history.navigate('#record/feeling', true);
						});
				 	}
				});
			}
		});
	},
	processSignup: function(e) {

		e.preventDefault();
		$.validator({
			elements :
				[{
					'selector' 	: '#signup_name',
					'rule'		: 'require',
					'field'		: 'is required',
					'action'	: 'label'			
				},{
					'selector' 	: '#signup_email',
					'rule'		: 'email',
					'field'		: 'is required (must be valid)',
					'action'	: 'label'				
				},{
					'selector' 	: '#signup_password',
					'rule'		: 'require',
					'field'		: 'is required (and should be clever)',
					'action'	: 'label'
				}],
			message : '',
			success	: function() {

				var signup_data = $('#user_signup').serializeArray();
				signup_data.push({'name':'session','value':'1'},{'name':'password_confirm','value':$('#signup_password').val()});
				$.ajax({
					url			: base_url + 'api/users/signup',
					type		: 'POST',
					dataType	: 'json',
					data		: signup_data,
					beforeSend	: Lightbox.requestMade('Creating Account'),
			  		success		: function(result) {

			  			Lightbox.requestComplete(result.message, result.status, function() {

							// Update Model
							UserData.set({ logged: 'yes' });
							UserData.set(result.user);

							// Update Navigation
							Navigation.showLogged();

							// Update URL & View
							Backbone.history.navigate('#record/feeling', true);
						});
				 	}
				});
			}
		});
	},
	processSignupShort: function(e) {

		e.preventDefault();
		$.validator({
			elements :
				[{
					'selector' 	: '#signup_name_short',
					'rule'		: 'require',
					'field'		: 'Enter your name',
					'action'	: 'label'	
				},{
					'selector' 	: '#signup_email_short',
					'rule'		: 'email',
					'field'		: 'Please enter a valid email',
					'action'	: 'label'		
				},{
					'selector' 	: '#signup_password_short',
					'rule'		: 'require',
					'field'		: 'Please enter a password',
					'action'	: 'label'
				}],
			message : '',
			success	: function() {

				var signup_data = $('#user_signup_short').serializeArray();
				signup_data.push({'name':'session','value':'1'},{'name':'password_confirm','value':$('#signup_password_short').val()});
				$.ajax({
					url			: base_url + 'api/users/signup',
					type		: 'POST',
					dataType	: 'json',
					data		: signup_data,
					beforeSend	: Lightbox.requestMade('Creating Account'),
			  		success		: function(result) {

			  			Lightbox.requestComplete(result.message, result.status, function() {

							// Update Model
							UserData.set({ logged: 'yes' });
							UserData.set(result.user);

							// Update Navigation
							Navigation.showLogged();

							// Update URL & View
							Backbone.history.navigate('#record/feeling', true);
						});
				 	}
				});
			}
		});
	},
	processForgotPassword: function(e) {

		e.preventDefault();
		$.validator({
			elements :
				[{
					'selector' 	: '#forgot_email',
					'rule'		: 'email',
					'field'		: 'Please enter a valid email',
					'action'	: 'label'
				}],
			message : '',
			success	: function() {

				$.ajax({
					url			: base_url + 'api/users/password_forgot',
					type		: 'POST',
					dataType	: 'json',
					data		: $('#user_forgot_password').serializeArray(),
					beforeSend	: Lightbox.requestMade('Resetting Password'),
			  		success		: function(result) {

			  			Lightbox.requestComplete(result.message, result.status, function() {
							Backbone.history.navigate('#login', true);
						});
			  		}
			  	});
			}
		});
	}
});