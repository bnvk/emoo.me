<!-- Settings Views -->
<script type="text/template" id="settings">
	<div id="content_menu" class="content_center text_center">
		<?php if (!$this->agent->is_mobile()): ?>
		<h1>Settings</h1>
		<?php endif; ?>
		<p>
			<a class="list_button" href="<?= base_url() ?>#/settings/notifications">
				<span class="icon_small icon_small_notifications_on"></span> Notifications
			    <br class="clear">
			</a>
		</p>
		<p>
			<a class="list_button" href="<?= base_url() ?>#/settings/account">
				<span class="icon_small icon_small_account_on"></span> Account Info
		 	    <br class="clear">
			</a>
		</p>
		<p>
			<a class="list_button" href="<?= base_url() ?>#/settings/password">
				<span class="icon_small icon_small_password_on"></span>	Password
		  		<br class="clear">
			</a>
		</p>
		<p>
			<a id="settings_button_logout" class="list_button" href="<?= base_url() ?>#/settings/logout">
				<span class="icon_small icon_small_login_on"></span> Logout
		  		<br class="clear">
			</a>
		</p>
	</div>
</script>

<script type="text/template" id="settings_notifications">
	<h1>Notifications</h1>
	<form name="settings_notifications" id="settings_notifications">	
		<p>	
			<label>How Often</label><br>
			<select name="notifications_frequency" id="notifications_frequency">
				<option value="none">---select---</option>
				<option value="daily_3">3 x Day</option>
				<option value="daily_1" selected="selected">1 x Day</option>
				<option value="daily_alternate">Every Other Day</option>
				<option value="weekly">Weekly</option>
				<option value="weekly_alternate">Every Other Week</option>
				<option value="never">Never</option>
			</select>			
		</p>
		<p><input type="checkbox" class="nullify" name="notifications_sms" value=""> &nbsp;Text Messages</p>
		<p><input type="checkbox" class="nullify" name="notifications_email" value=""> &nbsp;Email</p>
		<p><input type="button" id="settings_button_notifications" class="center" value="Save"> &nbsp;&nbsp; <input type="button" class="center settings_button_cancel" value="Cancel"></p>			
	</form>
</script>

<script type="text/template" id="settings_account">
	<h1>Account Info</h1>
	<form name="settings_account" id="settings_account">	
		<p>	
			<label>Name</label><br>
			<input type="text" name="name" id="profile_name" placeholder="Your Name" value="<%= name %>">
			<span id="profile_name_error"></span>
		</p>
		<p>
			<label>Email</label><br>
			<input type="email" name="email" id="profile_email" placeholder="you@email.com" value="<%= email %>">
			<span id="profile_email_error"></span>
		</p>
		<p>
			<label>Phone (for reminders)</label><br>
			<input type="text" name="phone_number" id="profile_phone" placeholder="503-111-2222" value="<%= phone_number %>">
		</p>
		<p>
			<label>Language</lable><br>
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
		</p>
		<p>
			<label>Timezone</lable><br>	
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
		</p>
		<p><input type="checkbox" name="geo_enabled" id="profile_geo_enabled" value="" title="Add Location to Logs"> &nbsp;Add Location</p>
		<p>
			<input type="button" id="settings_button_account" value="Save"> &nbsp;&nbsp; <input type="button" class="center settings_button_cancel" value="Cancel">
		</p>		
	</form>	
</script>

<script type="text/template" id="settings_password">
	<h1>Change Password</h1>
	<form name="settings_change_password" id="settings_change_password">
		<p>
			<label>Old Password</label><br>
			<input type="password" id="old_password" name="old_password" value="">
			<span id="old_password_error"></span>
		</p>
		<p>
			<label>New Password</label><br>
			<input type="password" id="new_password" name="new_password" value="">
			<span id="new_password_error"></span>
		</p>
		<p>
			<label>New Password Confirm</label><br>
			<input type="password" id="new_password_confirm" name="new_password_confirm" value="">
			<span id="new_password_confirm_error"></span>			
		</p>
		<p><input type="button" id="settings_button_password" class="center" value="Save"> &nbsp;&nbsp; <input type="button" class="center settings_button_cancel" value="Cancel"></p>			
	</form>
</script>