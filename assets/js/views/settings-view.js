// SETTINGS
var SettingsView = Backbone.View.extend(
{
    initialize: function() {
		this.render();
    },
    render: function() {},
    events: {
    	"click #settings_button_notifications" 	: "processNotifications",
    	"submit #settings_notifications"		: "processNotifications",
    	"click #settings_button_account" 		: "processAccount",
    	"submit #settings_account"				: "processAccount",
    	"click #settings_button_password" 		: "processPassword",
      	"submit #settings_account"				: "processPassword",
      	"click #settings_logout"				: "processLogout"
    },
    viewNotifications: function() {
        this.$el.html(_.template($("#settings_notifications").html()));
    },
    viewAccount: function() {
        this.$el.html(_.template($("#settings_account").html(), UserData.attributes));
    },
    viewPassword: function() {
        this.$el.html(_.template($("#settings_password").html()));
    },
    processNotifications: function(e) {

		e.preventDefault();

		var notifications_data = $('#settings_notifications').serializeArray();
		notifications_data.push({'name':'module','value':'notifications'});

		$.oauthAjax({
			oauth 		: UserData,
			url			: base_url + 'api/users/details/id/' + UserData.get('user_id'),
			type		: 'POST',
			dataType	: 'json',
			data		: notifications_data,
			beforeSend	: Lightbox.requestMade('Saving notification settings'),
	  		success		: function(result) {

		  		Lightbox.requestComplete(result.message, result.status, function() {});
		 	}
		});
    },
    processAccount: function(e) {

		e.preventDefault();
		$.validator({
			elements :
				[{
					'selector' 	: '#profile_name',
					'rule'		: 'require',
					'field'		: 'is required',
					'action'	: 'label'				
				},{
					'selector' 	: '#profile_email',
					'rule'		: 'email',
					'field'		: 'is required (must be valid)',
					'action'	: 'label'
				}],
			message : '',
			success	: function() {

				var account_data = $('#settings_account').serializeArray();
				account_data.push({'name':'session','value':1});

				$.oauthAjax({
					oauth 		: UserData,
					url			: base_url + 'api/users/modify/id/' + UserData.get('user_id'),
					type		: 'POST',
					dataType	: 'json',
					data		: account_data,
					beforeSend	: Lightbox.requestMade('Saving account changes'),
			  		success		: function(result) {

				  		Lightbox.requestComplete(result.message, result.status, function() {
					  		$('#navigation_info').find('h1').html($('#profile_name').val());
							UserData.set(result.user);
						});
				 	}
				});
			}
		});
    },
    processPassword: function(e) {

		e.preventDefault();
		$.validator({
			elements :
				[{
					'selector' 	: '#old_password',
					'rule'		: 'require',
					'field'		: 'is required',
					'action'	: 'label'
				},{
					'selector' 	: '#new_password',
					'rule'		: 'require',
					'field'		: 'is required',
					'action'	: 'label'
				},{
					'selector' 	: '#new_password_confirm',
					'rule'		: 'confirm',
					'field'		: 'needs to match',
					'action'	: 'label'
				}],
			message : '',
			success	: function() {

				$.oauthAjax({
					oauth 		: UserData,
					url			: base_url + 'api/users/password',
					type		: 'POST',
					dataType	: 'json',
					data		: $('#settings_change_password').serializeArray(),
					beforeSend	: Lightbox.requestMade('Changing your password'),
					success		: function(result) {

						Lightbox.requestComplete(result.message, result.status, function() {
							$('#old_password').val('');
							$('#new_password').val('');
							$('#new_password_confirm').val('');
							Backbone.history.navigate('#settings', true);
						});
					}
				});
			}
		});
    },
    processLogout: function(e) {

	    e.preventDefault();	    
		$.oauthAjax({
			oauth 		: UserData,
			url			: base_url + 'api/users/logout',
			type		: 'GET',
			dataType	: 'json',
			beforeSend	: Lightbox.requestMade('Logging you out...'),
			success		: function(result) {	
			
				Lightbox.requestComplete(result.message, result.status, function() {
						
					// Update Model
					UserData.set({ logged: 'no', user_id: '', username: '', name: '', user_level_id	: '', name : '', image : '', location : '', geo_enabled : '', language : '', privacy : '', consumer_key : '', consumer_secret : '', token : '', token_secret : '' });		

					// Update Navigation
					Navigation.showPublic();

					// Redirect
					Backbone.history.navigate('#logout', true);
				});
			}
		});
    },
    processCancel: function(e) {

		e.preventDefault();
		Backbone.history.navigate('#settings', true);
    }
});