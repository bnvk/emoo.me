<!-- Settings Views -->
<script type="text/template" id="settings">
	<div class="animated bounceInUp">
		<div class="five columns"></div>
		<div class="six columns text-center">
			<h1>Settings</h1>
			<!-- <a class="button-big-secondary full-width" href="/#settings/notifications"><span class="icon-antenna"></span> Notifications</a> -->
			<a class="button-big-secondary full-width" href="/#settings/account"><span class="icon-person"></span> Account</a>
			<a class="button-big-secondary full-width" href="/#settings/password"><span class="icon-key"></span> Password</a>
			<a class="button-big-secondary full-width" href="/#logout" id="settings_logout"><span class="icon-keyhole"></span> Logout</a>
		</div>
		<div class="five columns"></div>
	</div>
</script>

<script type="text/template" id="settings_notifications">
	<div class="animated bounceInLeft">
		<h1>Notifications</h1>
		<form name="settings_notifications" id="settings_notifications">	
			<label>How Often</label>
			<select name="notifications_frequency" id="notifications_frequency">
				<option value="none">---select---</option>
				<option value="daily_3">3 x Day</option>
				<option value="daily_1" selected="selected">1 x Day</option>
				<option value="daily_alternate">Every Other Day</option>
				<option value="weekly">Weekly</option>
				<option value="weekly_alternate">Every Other Week</option>
				<option value="never">Never</option>
			</select>
			<input type="checkbox" class="nullify" name="notifications_sms" value=""> &nbsp;Text Messages
			<input type="checkbox" class="nullify" name="notifications_email" value=""> &nbsp;Email
			<input type="submit" id="settings_button_notifications" value="Save"> &nbsp;&nbsp; <a href="#settings" class="button-secondary">Cancel</a>
		</form>
	</div>
</script>

<script type="text/template" id="settings_account">
	<div class="animated bounceInLeft">	
		<h1>Account</h1>
		<form name="settings_account" id="settings_account">	
			<label>Name <span id="profile_name_error"></span></label>
			<input type="text" name="name" id="profile_name" placeholder="Your Name" value="{{ name }}">
			<label>Email <span id="profile_email_error"></span></label>
			<input type="email" name="email" id="profile_email" placeholder="you@email.com" value="{{ email }}">
			<label>Phone (for reminders)</label>
			<input type="text" name="phone_number" id="profile_phone" placeholder="503-111-2222" value="{{ phone_number }}">
			<label>Language</lable>
			<select name="language" id="profile_language">
				<option value="">--select--</option>
				<option value="en" selected="selected">English</option>
				<option value="fr">French</option>
				<option value="de">German</option>
				<option value="es">Spanish</option>
				<option value="it">Italian</option>
				<option value="ru">Russian</option>
				<option value="cn">Chinese</option>
				<option value="ot">Other</option>
			</select>
			<label>Timezone</lable>	
			<select name="time_zone" id="profile_time_zone">
				<option value=''>---select---</option>
				<option value='UM10'>Hawaii Standard</option>
				<option value='UM9'>Alaska Standard</option>
				<option value='UM8'>Pacific Standard</option>
				<option value='UM7'>Mountain Standard</option>
				<option value='UM6'>Central Standard</option>
				<option value='UM5'>Eastern Standard</option>
				<option value='UTC'>Western European</option>
				<option value='UP1'>Central European</option>
				<option value='UP2'>Eastern European</option>
				<option value='UP3'>Moscow Time</option>
				<option value='UP8'>Australian Western / Beijing</option>
				<option value='UP875'>Australian Central</option>
				<option value='UP9'>Japan / Korea Standard</option>
				<option value='UP95'>Australian Central</option>
				<option value='UP10'>Australian Eastern</option>
			</select>
			<fieldset>
				<input type="checkbox" name="geo_enabled" id="profile_geo_enabled" value="" title="Add Location to Logs"> &nbsp;Add Location
			</fieldset>
			<input type="submit" id="settings_button_account" value="Save"> &nbsp;&nbsp; <a href="#settings" class="button-secondary">Cancel</a>
		</form>
	</div>
</script>

<script type="text/template" id="settings_password">
	<div class="animated bounceInLeft">
		<h1>Change Password</h1>
		<form name="settings_change_password" id="settings_change_password">
			<label>Old Password <span id="old_password_error"></span></label>
			<input type="password" id="old_password" name="old_password" value="">
			<label>New Password <span id="new_password_error"></span></label>
			<input type="password" id="new_password" name="new_password" value="">
			<label>New Password Confirm <span id="new_password_confirm_error"></span></label>
			<input type="password" id="new_password_confirm" name="new_password_confirm" value="">
			<input type="submit" id="settings_button_password" value="Save"> &nbsp;&nbsp; <a href="#settings" class="button-secondary">Cancel</a>
		</form>
	</div>
</script>