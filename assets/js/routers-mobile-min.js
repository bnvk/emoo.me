/* **********************************************
     Begin global-router.js
********************************************** */var ApplicationRouter=Backbone.Router.extend({initialize:function(e){this.el=e;this.Navigation=new NavigationView({el:$("#navigation")});this.indexView=new ContentView("#index");this.authView=new AuthView({el:$("#content")});this.logoutView=new ContentView("#logout");this.notFoundView=new ContentView("#not_found");this.recordIndex=new ContentView("#record");this.recordFeeling=new RecordFeelingView({el:$("#content")});this.settingsIndex=new ContentView("#settings");this.settingsViews=new SettingsView({el:$("#content")})},routes:{"":"index",login:"login",signup:"signup",forgot_password:"forgotPassword",logout:"logout","logged/:destination":"logged",record:"recordViews","record/:view":"recordViews",visualize:"visualize",settings:"settingsViews","settings/:view":"settingsViews"},currentView:null,switchView:function(e){this.currentView&&this.currentView.remove();this.el.html(e.el);e.render();this.currentView=e},setActiveNav:function(e){$.each(["record","visualize","settings"],function(e,t){t==type?$("#record_feeling_"+t).fadeIn():$("#record_feeling_"+t).hide()});$("div.left_control_links").removeClass("icon_small_text_on icon_small_emoticons_on icon_small_audio_on");$("#log_feeling_use_"+type).addClass("icon_small_"+type+"_on")},index:function(){UserData.get("logged")==="yes"&&Backbone.history.navigate("#/record/feeling",!0);this.switchView(this.indexView)},login:function(){UserData.get("logged")==="yes"&&Backbone.history.navigate("#/record/feeling",!0);this.authView.viewLogin()},signup:function(){UserData.get("logged")==="yes"&&Backbone.history.navigate("#/record/feeling",!0);this.authView.viewSignup()},forgotPassword:function(){this.authView.viewForgotPassword()},logout:function(){UserData.set({logged:"no",user_id:"",username:"",name:"",user_level_id:"",name:"",image:"",location:"",geo_enabled:"",language:"",privacy:"",consumer_key:"",consumer_secret:"",token:"",token_secret:""});this.Navigation.renderPublic();this.switchView(this.logoutView)},notFound:function(){this.switchView(this.notFoundView)},recordViews:function(e){UserData.get("logged")!=="yes"&&Backbone.history.navigate("#/login",!0);console.log("here inside recordViews "+e);e===undefined?this.switchView(this.recordIndex):e==="feeling"?this.recordFeeling.viewFeeling():e==="experience"?this.recordFeeling.viewExperience():e==="describe"?this.recordFeeling.viewDescribe():e==="thanks"?this.recordFeeling.viewThanks():this.switchView(this.notFoundView)},visualize:function(e){UserData.get("logged")!=="yes"&&Backbone.history.navigate("#/login",!0);VisualizeModel.get("data")!=="updated"?$.oauthAjax({oauth:UserData,url:base_url+"api/emoome/analyze/me",type:"GET",dataType:"json",success:function(e){if(e.status==="success"){VisualizeModel.set(e);VisualizeModel.set({data:"updated"});VisualizeViews=new VisualizeView({el:$("#content")})}}}):VisualizeViews=new VisualizeView({el:$("#content")})},settingsViews:function(e){UserData.get("logged")!=="yes"&&Backbone.history.navigate("#/login",!0);e===undefined?this.switchView(this.settingsIndex):e==="notifications"?this.settingsViews.viewNotifications():e==="account"?this.settingsViews.viewAccount():e==="password"?this.settingsViews.viewPassword():e==="logout"?this.settingsViews.processLogout():this.switchView(this.notFoundView)}});