<h1>Login</h1>
<form method="post" name="user_login" id="user_login">
	
	<p>
		<label>Email</label><br>
		<input type="text" name="email" id="login_email" placeholder="you@email.com" autocorrect="off" value=""><br>
		<span id="login_email_error"></span>
	</p>
	<p>
		<label>Password</label><br>
		<input type="password" name="password" id="login_password" placeholder="********" autocorrect="off" value=""><br>
		<span id="login_password_error"></span>
	</p>
	<p>
		<label>Remember</label> <?= form_checkbox('remember', '1', TRUE, 'id="login_remember"');?> 
		<a href="<?= base_url() ?>forgot_password">Forgot password?</a>
	</p>
	<p>
		<input type="hidden" name="session" value="1">
		<input type="submit" name="submit" value="Login">
  	</p>

</form>
<?= $this->social_igniter->get_social_logins('<div class="social_login">', '</div>'); ?>
<script type="text/javascript">
$(document).ready(function()
{

	$('#user_login').bind('submit', function(e)
	{	
		e.preventDefault();
		$.validator(
		{
			elements :
				[{
					'selector' 	: '#login_email', 
					'rule'		: 'email', 
					'field'		: 'Please enter a valid Email',
					'action'	: 'label'	
				},{
					'selector' 	: '#login_password', 
					'rule'		: 'require', 
					'field'		: 'Please enter your Password',
					'action'	: 'label'
				}],
			message : '',
			success	: function()
			{
				var login_data = $('#user_login').serializeArray();
				login_data.push({'name':'session','value':'1'});		
			
				$.ajax(
				{
					url			: base_url + 'api/users/login',
					type		: 'POST',
					dataType	: 'json',
					data		: login_data,
					error		: function(request, ajaxOptions, thrownError)
					{
						console.log(request.status);
						console.log(request.responseText);
						console.log(thrownError);
					},
			  		success		: function(result)
			  		{
						if (result.status == 'success')
						{
							setTimeout(function() { window.location.href = base_url + 'record/feeling' });					
						}
						else
						{
							$('html, body').animate({scrollTop:0});
							$('#content_message').notify({status:result.status,message:result.message});					
						}
				 	}
				});
			}
		});
	});

});
</script>