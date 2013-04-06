<script type="text/template" id="index">
<!--		<img src="<?= $site_assets ?>emoticon-test.svg" width="100" height="100"> -->

	<div class="row text-center">	
		<h1 class="index-logo">emo<span class="name_ome">ome</span></h1>
		<div id="index-logo-circles">
			<ul>
				<li class="circle-E"></li>
				<li class="circle-I"></li>
				<li class="circle-D"></li>
				<li class="circle-S"></li>
				<li class="circle-P"></li>
				<li class="circle-A"></li>
			</ul>
		</div>
		<h2 class="hide">record your experiences & feelings</h2>
		<h2 class="hide">visualize moments from your life</h2>
		<h2 class="hide">discover patterns in your thinking</h2>
	</div>

	<div class="six columns alpha text-center animated bounceInLeft">
		<img src="<?= $site_assets ?>images/index-art-top-1.png">
	</div>
	<div class="three columns text-center animated fadeIn">
		<img class="index-art-top-2" src="<?= $site_assets ?>images/index-art-top-2.png">
	</div>
	<div class="six columns omega text-center animated bounceInRight">
		<img src="<?= $site_assets ?>images/index-art-top-3.png">
	</div>


	<div class="clearfix animated fadeIn">
		<div class="one column alpha"></div>
		<div class="seven columns">
			<p><strong>emo</strong> - <em>a complex psychophysiological experience of an individual's state of mind; interacting w/ biochemical & environmental influences</em></p>
		</div>
		<div class="seven columns">
			<p><strong>ome</strong> - <em>as used in biology, refers to a totality of some sort</em></p>
		</div>
		<div class="one column omega"></div>
	</div>


	<div class="eight columns alpha text-center animated fadeIn">
		<h2 class="hide">discover patterns in your thinking</h2>
		<img src="<?= $site_assets ?>images/index-art-bot-1.png">
	</div>


	<div class="seven columns omega animated fadeIn">
		<h2>Ready to begin?</h2>
		<form method="post" name="user_signup_short" id="user_signup_short">
			<label>Name</label>
			<input type="text" name="name" id="signup_name_short" placeholder="Joe Smith" autocorrect="off" value=""><br>
			<span id="signup_name_short_error"></span>
			<label>Email</label>
			<input type="text" name="email" id="signup_email_short" placeholder="your@email.com" autocorrect="off" value=""><br>
			<span id="signup_email_short_error"></span>
			<label>Password</label>
			<input type="password" name="password" id="signup_password_short" placeholder="********" autocorrect="off" value=""><br>
			<span id="signup_password_short_error"></span>
			<label>Language</lable>
			<select name="language" id="">
				<option value="" selected="selected">--select--</option>
				<option value="en">English</option>
				<option value="fr">French</option>
				<option value="de">German</option>
				<option value="es">Spanish</option>
				<option value="it">Italian</option>
				<option value="ru">Russian</option>
				<option value="cn">Chinese</option>
				<option value="ot">Other</option>
			</select>
			<input type="button" name="submit" id="button_signup_short" value="Signup">
		</form>
	</div>


	<div class="row text-center">
		<h1>Read about emo<span class="name_ome">ome</span></h1>
	</div>

	
	<div class="one-third column text-center">
		<a href="http://www.readwriteweb.com/archives/how-well-get-beyond-the-emoticon.php" class="no-line" target="_blank">
			<span class="quote_title">How We'll Get Beyond the Emoticon</span>
			<span class="quote_quote">"Reveals shifts around major life events, which is powerful to look back on after the fact"</span>
			<span class="quote_image"><img src="/application/views/site_emoome/assets/images/press-rrw.png"></span>
		</a>
	</div>

	<div class="one-third column text-center">
		<a href="http://www.informationisbeautifulawards.com/shortlist-2/web-tools-shortlist-2/" class="no-line" target="_blank">
			<span class="quote_title">Shortlisted in Information Is Beautiful Awards 2012</span>
			<span class="quote_quote">Emoome was shortlisted in the "Tool or Website" category of last years competition!</span>
			<span class="quote_image"><img src="/application/views/site_emoome/assets/images/press-info.png"></span>
		</a>
	</div>

	<div class="one-third column text-center">
		<a href="http://siliconflorist.com/2012/05/01/emoome-emotional/" class="no-line" target="_blank">
			<span class="quote_title">Are you trying to get all emotional on me?</span>
			<span class="quote_quote">"The site is addictive. And the visualizations are beautiful, even in this early iteration."</span>
			<span class="quote_image"><img src="/application/views/site_emoome/assets/images/press-silicon.png"></span>
		</a>
	</div>

	
</script>