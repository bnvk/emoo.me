<?php if ($user_id != $logged_user_id): ?>
<h3>Connect</h3>
<ul>
	<li><img src="<?= $dashboard_assets ?>icons/users_24.png"><input type="button" id="follow_button" value="<?= ucwords($follow_word) ?>"></li>
	<li><img src="<?= $dashboard_assets ?>icons/messages_24.png"><input type="button" id="message_button" href="<?= $message_url ?>" value="Message"></li>
</ul>
<?php else: ?>
<h3><?= random_element($this->lang->line('cool_salutations')) ?>,</h3>
<p>This is your <?= random_element($this->lang->line('cool_phrases')) ?> profile</p>
<?php endif; ?>
<div class="profile_sidebar_separator"></div>

<?php if ($connections): ?>
<h3>Connections</h3>
<ul>
<?php foreach ($connections as $connection): ?>
	<li><a class="profile_sidebar_icon" href="<?= $connection->url.$connection->connection_username ?>" target="_blank"> <img src="<?= base_url().'application/modules/'.$connection->module.'/assets/'.$connection->module ?>_24.png"> <?= $connection->connection_username ?></a></li>
<?php endforeach; ?>
</ul>
<div class="profile_sidebar_separator"></div>
<?php endif; ?>


<?php if ($followers): ?>
<h3>Followers</h3>
<ul>
<?php foreach ($followers as $follower): ?>
	<li><a href="<?= base_url().'profile/'.$follower->username ?>"><img src="<?= $this->social_igniter->profile_image($follower->user_id, $follower->image, $follower->gravatar); ?>"> <?= $follower->name ?></a></li>
<?php endforeach; ?>
</ul>
<?php endif; ?>


<?php if ($follows): ?>
<h3>Follows</h3>
<ul>
<?php foreach ($follows as $follow): ?>
	<li><a href="<?= base_url().'profile/'.$follow->username ?>"><img src="<?= $this->social_igniter->profile_image($follow->user_id, $follow->image, $follow->gravatar); ?>"> <?= $follow->name ?></a></li>
<?php endforeach; ?>
</ul>
<?php endif; ?>

<script type="text/javascript">
$(document).ready(function()
{
	$("#follow_button").bind("click", function(e)
	{
		e.preventDefault();
		var follow_word = $('#follow_button').attr('value').toLowerCase();
		var follow_data = $('#follow_button').serializeArray();
		follow_data.push({'name':'module','value':'users'},{'name':'type','value':'follow'});
		
		<?php if (!$this->social_auth->logged_in()): ?>
		$webfinger		= prompt('Enter your webfinger id');
		$match 			= $webfinger.match(/(.*?)@(.*)/);
		var username	= window.path.split('/')[1];
		var host 		= window.location.host;
		$.ajax(
		{
	        type	 : 'GET',
			url		 : 'http://' + $match[2] + '/webfinger/' + $match[1] + '@' + $match[2],
			dataType : 'xml',
			success	 : function(xml)
			{
				$(xml).find('Link').each(function()
				{ 
					if ($(this).attr('rel') == "webfinger#friend")
					{
						var remote_profile = $(this).attr('href');
						new_profile = remote_profile.replace(/{uri}/,username+"@"+host);
						window.location.href = new_profile;
					}
					 
				});
			}
		});
		return;
		<?php endif; ?>
		$.oauthAjax(
		{
			oauth 		: user_data,
			url			: base_url + 'api/relationships/' + follow_word + '/id/<?= $user_id; ?>',
			type		: 'POST',
			dataType	: 'json',
			data		: follow_data,
	  		success		: function(result)
	  		{	  				  			
				if (result.status == 'success')
				{
					if (follow_word == 'follow')
					{
						$('#follow_button').val('Unfollow');
					}
					else
					{
						$('#follow_button').val('Follow');					
					}
			 	}
			 	else
			 	{
					$('html, body').animate({scrollTop:0});
					$('#content_message').notify({status:result.status,message:result.message});				
			 	}
		 	}
		})
	});

	$('#message_button').bind('click', function(e)
	{
		e.preventDefault();
		var message_data = $('#message_button').serializeArray();
		message_data.push({'name':'receiver_id','name':user_data.user_id},{'name':'module','value':'messages'},{'name':'type','value':'personal'});

		$.oauthAjax(
		{
			oauth 		: user_data,
			url			: base_url + 'api/messages/send',
			type		: 'POST',
			dataType	: 'json',
			data		: message_data,
	  		success		: function(result)
	  		{  				  			
				if (result.status == 'success')
				{
					alert(result.message);
			 	}
			 	else
			 	{
					alert(result.message);
			 	}
		 	}
		})
	});
});
</script>