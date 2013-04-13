<script type="text/template" id="login">
	<div class="animated bounceInLeft">
		<h1>Login</h1>
		<form method="post" name="user_login" id="user_login">
			<label>Email <span id="login_email_error"></span></label>
			<input type="text" name="email" id="login_email" placeholder="you@email.com" autocorrect="off" value="">
			<label>Password <span id="login_password_error"></span></label>
			<input type="password" name="password" id="login_password" placeholder="********" autocorrect="off" value="">
			<input type="button" name="submit" id="button_login" value="Login">
			<a class="button-secondary" href="#/forgot_password">Forgot Password</a>
		</form>
	</div>
</script>

<script type="text/template" id="signup">
	<div class="animated bounceInLeft">
		<h1>Signup</h1>
		<form method="post" name="user_signup" id="user_signup">
			<label>Name <span id="signup_name_error"></span></label>
			<input type="text" name="name" id="signup_name" placeholder="Joe Smith" autocorrect="off" value="">
			<label>Email <span id="signup_email_error"></span></label>
			<input type="text" name="email" id="signup_email" placeholder="your@email.com" autocorrect="off" value="">
			<label>Phone (optional)</label>
			<input type="text" name="phone_number" id="profile_phone" placeholder="503-111-2222" value="<?= $this->session->userdata('phone') ?>">
			<label>Password <span id="signup_password_error"></span></label>
			<input type="password" name="password" id="signup_password" placeholder="********" autocorrect="off" value="">
			<label>Language</lable>
			<?= form_dropdown('language', config_item('languages'), 'en') ?>
			<input type="button" name="submit" id="button_signup" value="Signup">
		</form>
	</div>
</script>

<script type="text/template" id="logout">
	<div class="row text-center">
		<h1>Thanks</h1>
		<img src="<?= $site_assets ?>emoticons/happy.svg" width="150" height="150">
		<br><br>
		<h3>You are now logged out</h3>
	</div>
</script>

<script type="text/template" id="forgot_password">
	<div class="animated bounceInLeft">
		<h1>Forgot Password</h1>
		<p>Please enter your email address</p>
		<form name="user_forgot_password" id="user_forgot_password">
			<input type="text" name="email" id="forgot_email" placeholder="you@email.com" value="">
			<span id="forgot_email_error"></span>
			<p id="email_error"></p>
			<input type="button" name="submit" id="button_forgot_password" value="Reset Password" />
		</form>
	</div>
</script>
