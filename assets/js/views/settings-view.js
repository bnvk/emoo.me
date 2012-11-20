// SETTINGS
var SettingsView = Backbone.View.extend(
{
    initialize: function()
    {
		this.render();
    },
    render: function() {},
    events:
    {
    	"click #settings_button_notifications" 	: "processNotifications",
    	"click #settings_button_account" 		: "processAccount",
    	"click #settings_button_password" 		: "processPassword",
    	"click .settings_button_cancel"	 		: "processCancel"
    },
    viewNotifications: function()
    {
    	// Prep Template
    	var view_data	= { describe_this: LogFeelingModel.get('experience') };
        var template	= _.template($("#settings_notifications").html(), view_data);
        this.$el.html(template).hide().delay(250).fadeIn();	    
    },
    viewAccount: function()
    {    
        var template = _.template($("#settings_account").html(), UserData.attributes);
        this.$el.html(template).hide().delay(250).fadeIn();		    
    },
    viewPassword: function()
    {
        var template	= _.template($("#settings_password").html());
        this.$el.html(template).hide().delay(250).fadeIn();		    
    },    
    processNotifications: function()
    {
		var notifications_data = $('#settings_notifications').serializeArray();
		notifications_data.push({'name':'module','value':'notifications'});		

		$.oauthAjax(
		{
			oauth 		: UserData,
			url			: base_url + 'api/users/details/id/' + UserData.get('user_id'),
			type		: 'POST',
			dataType	: 'json',
			data		: notifications_data,
			beforeSend	: Lightbox.requestMade('Saving notification settings'),			
	  		success		: function(result)
	  		{
		  		Lightbox.requestComplete(result.message, result.status);
		 	}
		});
    },
    processAccount: function()
    {
		$.validator(
		{
			elements :		
				[{
					'selector' 	: '#profile_name', 
					'rule'		: 'require', 
					'field'		: 'Name is required',
					'action'	: 'label'							
				},{
					'selector' 	: '#profile_email', 
					'rule'		: 'email', 
					'field'		: 'Email is required',
					'action'	: 'label'							
				}],
			message : '',
			success	: function()
			{    	
				var account_data = $('#settings_account').serializeArray();
				account_data.push({'name':'session','value':1});		
				
				$.oauthAjax(
				{
					oauth 		: UserData,
					url			: base_url + 'api/users/modify/id/' + UserData.get('user_id'),
					type		: 'POST',
					dataType	: 'json',
					data		: account_data,
					beforeSend	: Lightbox.requestMade('Saving account changes'),			
			  		success		: function(result)
			  		{
				  		Lightbox.requestComplete(result.message, result.status);

						UserData.set(result.user);
				 	}
				});    	
			}
		});
    },
    processPassword: function()
    {
		$.validator(
		{
			elements :		
				[{
					'selector' 	: '#old_password', 
					'rule'		: 'required', 
					'field'		: 'Old Password is required',
					'action'	: 'label'							
				},{
					'selector' 	: '#new_password', 
					'rule'		: 'required', 
					'field'		: 'New Password is required',
					'action'	: 'label'							
				},{
					'selector' 	: '#new_password_confirm', 
					'rule'		: 'confirm', 
					'field'		: 'Needs to match New Password',
					'action'	: 'label'					
				}],
			message : '',
			success	: function()
			{
				$.oauthAjax(
				{
					oauth 		: UserData,
					url			: base_url + 'api/users/password',
					type		: 'POST',
					dataType	: 'json',
					data		: $('#settings_change_password').serializeArray(),
					beforeSend	: Lightbox.requestMade('Changing your password'),
			  		success		: function(result)
			  		{
						// Close Loading
				  		Lightbox.requestComplete(result.message, result.status);
					
					 	$('#old_password').val('');
					 	$('#new_password').val('');
					 	$('#new_password_confirm').val('');
				 	}
				});
			}
		});
    },    
    processLogout: function()
    {
		// Save To API
		$.oauthAjax(
		{
			oauth 		: UserData,
			url			: base_url + 'api/users/logout',
			type		: 'GET',
			dataType	: 'json',
			beforeSend	: Lightbox.requestMade('Logging you out...'),
		  	success		: function(result)
		  	{
				// Close Loading
	  			Lightbox.closeFast();

				// Update URL & View
				Backbone.history.navigate('#/logout', true); 
	  		}
	  	});	    
    },
    processCancel: function(e)
    {
		e.preventDefault();
		Backbone.history.navigate('#/settings', true); 
    }
});