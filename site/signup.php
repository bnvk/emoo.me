<h1>Signup</h1>
<?php if (config_item('users_signup') == 'TRUE'): ?>
<form method="post" name="user_signup" id="user_signup">
	
	<p>
		<label>Name</label><br>
		<input type="text" name="name" id="signup_name" placeholder="Joe Smith" autocorrect="off" value=""><br>
		<span id="signup_name_error"></span>
	</p>
	<p>
		<label>Email</label><br>
		<input type="text" name="email" id="signup_email" placeholder="your@email.com" autocorrect="off" value=""><br>
		<span id="signup_email_error"></span>
	</p>
	<p>
		<label>Password</label><br>
		<input type="password" name="password" id="signup_password" placeholder="********" autocorrect="off" value=""><br>
		<span id="signup_password_error"></span>
	</p>
	<p>	
		<label>Confirm Password</label><br>
		<input type="password" name="password_confirm" id="signup_password_confirm" placeholder="********" autocorrect="off" value=""><br>
		<span id="signup_password_confirm_error"></span>
	</p>
	<p>
		<input type="submit" name="submit" value="Signup">
	</p>

</form>
<?= $this->social_igniter->get_social_logins('<div class="social_login">', '</div>'); ?>
<script type="text/javascript">
$(document).ready(function()
{
	$("#user_signup").bind('submit', function(e)
	{	
		e.preventDefault();	
		$.validator(
		{
			elements :		
				[{
					'selector' 	: '#signup_name', 
					'rule'		: 'require', 
					'field'		: 'Enter your name',
					'action'	: 'label'					
				},{
					'selector' 	: '#signup_email', 
					'rule'		: 'email', 
					'field'		: 'Please enter a valid email',
					'action'	: 'label'							
				},{
					'selector' 	: '#signup_password', 
					'rule'		: 'require', 
					'field'		: 'Please enter a password',
					'action'	: 'label'					
				},{
					'selector' 	: '#signup_password_confirm', 
					'rule'		: 'confirm', 
					'field'		: 'Please confirm your password',
					'action'	: 'label'					
				}],
			message : '',
			success	: function()
			{					
				var signup_data = $('#user_signup').serializeArray();
				signup_data.push({'name':'session','value':'1'});
				$.ajax(
				{
					url			: base_url + 'api/users/signup',
					type		: 'POST',
					dataType	: 'json',
					data		: signup_data,
			  		success		: function(result)
			  		{
						$('html, body').animate({scrollTop:0});
						if (result.status == 'success')
						{							
							$('[name=name]').val('');
							$('[name=email]').val('');
							$('[name=password]').val('');
							$('[name=password_confirm]').val('');						

							setTimeout(function() { window.location.href = base_url + 'record/feeling' });
						}
						else
						{
							$('#content_message').notify({status:result.status,message:result.message});					
						}
				 	}
				});
			}
		});
	});	
});
</script>
<?php else: ?>
<p>Sorry user signup is currently turned off</p>
<?php endif; ?>