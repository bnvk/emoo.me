/* Helper Functions */
function sentimentFromArray(sentiment_array)
{
	var count			= sentiment_array.length;
	var total			= 0;
	var absolute_good	= 5 * count;
	var absolute_bad	= -5 * count;
	var	range_good		= absolute_good / 4;
	var	range_bad		= absolute_bad / 4;
	var feeling			= '';

	for (sentiment in sentiment_array)
	{
		total += parseInt(sentiment_array[sentiment]);
	}

	feeling = Math.round(total / count);

	return feeling;
}

var mysqlDateParser = function(str)
{
	if (str)
	{
		_str = str;
	}
	else
	{
		_str = '0000-00-00 00:00:00';
	}

	var api =
	{
		date: function(type)
		{
			type = type || 'number';
			m = _str.match(/([0-9])+/gi);

			if (type=='short')
			{
				months = {'00':'00','01':'Jan.','02':'Feb.','03':'Mar.','04':'Apr.','05':'May.','06':'Jun.','07':'Jul.','08':'Aug.','09':'Sep.','10':'Oct.','11':'Nov.','12':'Dec.'};
			}
			else if (type=='long')
			{
				months = {'00':'00','01':'January','02':'February','03':'March','04':'April','05':'May','06':'June','07':'July','08':'August','09':'September','10':'October','11':'November','12':'December'};
			}
			
			if (type!=='number')
			{
				m[1]=months[m[1]];
				d=' ';
			}
			else
			{
				d='/';
			}
			
			return m[1]+d+m[2]+d+m[0];
		},
		time: function()
		{
			m = _str.match(/([0-9])+/gi)
			pmOrAm = 'AM';
			if (m[3]>12)
			{
				m[3] = m[3]-12;
				pmOrAm = 'PM';
			}

			return m[3]+':'+m[4]+' '+pmOrAm;
		}
	}

	return api;
}

function countElementsArray(item, array)
{
    var count = 0;
	if (array !== undefined)
	{
    	$.each(array, function(i, v) { if (v === item) count++; });
   	}

    return count;
}

function determineHourStart(time, meridian)
{
	var result = 0;
	if ((meridian == 'PM') && (time != 12))
	{
		var time = parseFloat(time).toFixed(2);
		result = parseInt(time) + 12;
	}
	else
	{
		var time = parseFloat(time).toFixed(2);
		result = parseInt(time);
	}

	return result;
}

function determineHourEnd(time, meridian)
{
	var result = 0;
	if ((meridian == 'AM') && (time == 12))
	{
		result = '00';
	}
	else if ((meridian == 'PM') && (time != 12))
	{
		var time = parseFloat(time).toFixed(2);
		result = parseInt(time) + 12;
	}
	else
	{
		var time = parseFloat(time).toFixed(2);
		result = parseInt(time);
	}

	return result;
}