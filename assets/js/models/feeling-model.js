// Record Feeling
var LogFeelingModel = Backbone.Model.extend({
    defaults: {
        source			: 'web',
        feeling			: '',
        experience		: '',
        describe_1		: '',
        describe_2		: '',
        describe_3		: '',
        time_feeling 	: 0,
        time_experience	: 0,
        time_describe 	: 0,
        time_total 		: 0,
        geo_lat			: 0.00,
        geo_lon			: 0.00
    },
    initialize: function() {},
    startFeeling: function()
    {    
		this.set({ time_feeling : new Date().getTime() });
    },
    processFeeling: function(feeling)
    {    	
	    var now_time = new Date().getTime();	
		var time_feeling = now_time - this.get('time_feeling');    
    
	 	this.set({
			feeling 		: feeling,
			time_feeling 	: time_feeling,
			time_experience : now_time,
	 	});	 	   
    },
    processExperience: function()
    {
	    var now_time = new Date().getTime();	
		var time_experience = now_time - this.get('time_experience');  
    
		this.set({
			type 			: 'experience',
			experience		: $('#log_experience_value').val(),
			time_experience : time_experience,
			time_describe	: now_time
		});    
    },
    processDescribe: function()
    {
	    var now_time		= new Date().getTime();	
		var time_describe	= now_time - this.get('time_describe');  
		var time_total		= this.get('time_feeling') + this.get('time_experience') + time_describe; 
      
		this.set({
			time_describe 	: time_describe,
			time_total		: time_total,
			describe_1		: $('#log_describe_1_value').val(),
			describe_2		: $('#log_describe_2_value').val(),
			describe_3		: $('#log_describe_3_value').val()
		});		    
    },
    returnData: function()
    {
		var log_data = [];
		
		$.each(LogFeelingModel.attributes, function(key, value)
		{
			log_data.push({ name: key, value: value });
		});
		
		return log_data;	
    }
});

var LogFeelingModel = new LogFeelingModel();
