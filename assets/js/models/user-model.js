// User Model
var UserModel = Backbone.Model.extend(
{
	defaults: {
		logged			: 'no',
		user_id      	: '',
		username     	: '',
		user_level_id	: '',
		name         	: '',
		email        	: '',
		phone_number    : '',
		image        	: '',
		location     	: '',
		geo_enabled  	: '',
		language     	: '',
		privacy      	: '',	 
		consumer_key 	: '',
		consumer_secret	: '',
		token        	: '',
		token_secret 	: '',
		source       	: 'web',
		user_meta	 	: {},
		notifications_frequency	: 'daily',
		notifications_sms		: 'yes',
		notifications_email		: 'yes',
		default_feeling_type	: 'text'
	},
    initialize: function() {}
});

var UserModel = new UserModel();
