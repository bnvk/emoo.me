/* **********************************************
     Begin auth.js
********************************************** *//* Auth & Crypto Functions 
	- jquery.oauth.js
	- sha1.js
	- oauth.js

	oauthAjax - jQuery Plugin
	- Extends normal $.ajax() to allow oauth1.0 signed for ajax calls
	- Requires: sha1() and OAuth
	- Example below:

	$.oauthAjax(
	{
		oauth 		: user_data,
		url			: base_url + 'api/content/create',
		type		: 'POST',
		dataType	: 'json',
		data		: status_data,
	  	success		: function(result)
	  	{	
	  	}
	});	
*/function hex_sha1(e){return binb2hex(core_sha1(str2binb(e),e.length*chrsz))}function b64_sha1(e){return binb2b64(core_sha1(str2binb(e),e.length*chrsz))}function str_sha1(e){return binb2str(core_sha1(str2binb(e),e.length*chrsz))}function hex_hmac_sha1(e,t){return binb2hex(core_hmac_sha1(e,t))}function b64_hmac_sha1(e,t){return binb2b64(core_hmac_sha1(e,t))}function str_hmac_sha1(e,t){return binb2str(core_hmac_sha1(e,t))}function sha1_vm_test(){return hex_sha1("abc")=="a9993e364706816aba3e25717850c26c9cd0d89d"}function core_sha1(e,t){e[t>>5]|=128<<24-t%32;e[(t+64>>9<<4)+15]=t;var n=Array(80),r=1732584193,i=-271733879,s=-1732584194,o=271733878,u=-1009589776;for(var a=0;a<e.length;a+=16){var f=r,l=i,c=s,h=o,p=u;for(var d=0;d<80;d++){d<16?n[d]=e[a+d]:n[d]=rol(n[d-3]^n[d-8]^n[d-14]^n[d-16],1);var v=safe_add(safe_add(rol(r,5),sha1_ft(d,i,s,o)),safe_add(safe_add(u,n[d]),sha1_kt(d)));u=o;o=s;s=rol(i,30);i=r;r=v}r=safe_add(r,f);i=safe_add(i,l);s=safe_add(s,c);o=safe_add(o,h);u=safe_add(u,p)}return Array(r,i,s,o,u)}function sha1_ft(e,t,n,r){return e<20?t&n|~t&r:e<40?t^n^r:e<60?t&n|t&r|n&r:t^n^r}function sha1_kt(e){return e<20?1518500249:e<40?1859775393:e<60?-1894007588:-899497514}function core_hmac_sha1(e,t){var n=str2binb(e);n.length>16&&(n=core_sha1(n,e.length*chrsz));var r=Array(16),i=Array(16);for(var s=0;s<16;s++){r[s]=n[s]^909522486;i[s]=n[s]^1549556828}var o=core_sha1(r.concat(str2binb(t)),512+t.length*chrsz);return core_sha1(i.concat(o),672)}function safe_add(e,t){var n=(e&65535)+(t&65535),r=(e>>16)+(t>>16)+(n>>16);return r<<16|n&65535}function rol(e,t){return e<<t|e>>>32-t}function str2binb(e){var t=Array(),n=(1<<chrsz)-1;for(var r=0;r<e.length*chrsz;r+=chrsz)t[r>>5]|=(e.charCodeAt(r/chrsz)&n)<<32-chrsz-r%32;return t}function binb2str(e){var t="",n=(1<<chrsz)-1;for(var r=0;r<e.length*32;r+=chrsz)t+=String.fromCharCode(e[r>>5]>>>32-chrsz-r%32&n);return t}function binb2hex(e){var t=hexcase?"0123456789ABCDEF":"0123456789abcdef",n="";for(var r=0;r<e.length*4;r++)n+=t.charAt(e[r>>2]>>(3-r%4)*8+4&15)+t.charAt(e[r>>2]>>(3-r%4)*8&15);return n}function binb2b64(e){var t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",n="";for(var r=0;r<e.length*4;r+=3){var i=(e[r>>2]>>8*(3-r%4)&255)<<16|(e[r+1>>2]>>8*(3-(r+1)%4)&255)<<8|e[r+2>>2]>>8*(3-(r+2)%4)&255;for(var s=0;s<4;s++)r*8+s*6>e.length*32?n+=b64pad:n+=t.charAt(i>>6*(3-s)&63)}return n}function sentimentFromArray(e){var t=e.length,n=0,r=5*t,i=-5*t,s=r/4,o=i/4,u="";for(sentiment in e)n+=parseInt(e[sentiment]);u=Math.round(n/t);return u}function countElementsArray(e,t){var n=0;t!==undefined&&$.each(t,function(t,r){r===e&&n++});return n}function determineHourStart(e,t){var n=0;if(t=="PM"&&e!=12){var e=parseFloat(e).toFixed(2);n=parseInt(e)+12}else{var e=parseFloat(e).toFixed(2);n=parseInt(e)}return n}function determineHourEnd(e,t){var n=0;if(t=="AM"&&e==12)n="00";else if(t=="PM"&&e!=12){var e=parseFloat(e).toFixed(2);n=parseInt(e)+12}else{var e=parseFloat(e).toFixed(2);n=parseInt(e)}return n}(function(e){e.oauthAjax=function(e){var t=e.oauth.get("consumer_key"),n=e.oauth.get("consumer_secret"),r=e.oauth.get("token"),i=e.oauth.get("token_secret"),s={consumerSecret:n,tokenSecret:i},o=[["oauth_consumer_key",t],["oauth_token",r]];if(e.data)for(var u=0;u<e.data.length;u++)o.push([e.data[u].name,e.data[u].value]);var a={method:e.type||"GET",action:e.url,parameters:o};OAuth.setTimestampAndNonce(a);OAuth.SignatureMethod.sign(a,s);var f=e.beforeSend;e.beforeSend=function(e){e.setRequestHeader("Authorization",OAuth.getAuthorizationHeader("",a.parameters));f&&f(e)};jQuery.ajax(e)}})(jQuery);var hexcase=0,b64pad="",chrsz=8,OAuth;OAuth==null&&(OAuth={});OAuth.setProperties=function(t,n){if(t!=null&&n!=null)for(var r in n)t[r]=n[r];return t};OAuth.setProperties(OAuth,{percentEncode:function(t){if(t==null)return"";if(t instanceof Array){var n="";for(var r=0;r<t.length;++t){n!=""&&(n+="&");n+=OAuth.percentEncode(t[r])}return n}t=encodeURIComponent(t);t=t.replace(/\!/g,"%21");t=t.replace(/\*/g,"%2A");t=t.replace(/\'/g,"%27");t=t.replace(/\(/g,"%28");t=t.replace(/\)/g,"%29");t=t.replace(/\%20/g,"%2B");return t},decodePercent:function(t){t!=null&&(t=t.replace(/\+/g," "));return decodeURIComponent(t)},getParameterList:function(t){if(t==null)return[];if(typeof t!="object")return OAuth.decodeForm(t+"");if(t instanceof Array)return t;var n=[];for(var r in t)n.push([r,t[r]]);return n},getParameterMap:function(t){if(t==null)return{};if(typeof t!="object")return OAuth.getParameterMap(OAuth.decodeForm(t+""));if(t instanceof Array){var n={};for(var r=0;r<t.length;++r){var i=t[r][0];n[i]===undefined&&(n[i]=t[r][1])}return n}return t},getParameter:function(t,n){if(t instanceof Array){for(var r=0;r<t.length;++r)if(t[r][0]==n)return t[r][1];return null}return OAuth.getParameterMap(t)[n]},formEncode:function(t){var n="",r=OAuth.getParameterList(t);for(var i=0;i<r.length;++i){var s=r[i][1];s==null&&(s="");n!=""&&(n+="&");n+=OAuth.percentEncode(r[i][0])+"="+OAuth.percentEncode(s)}return n},decodeForm:function(t){var n=[],r=t.split("&");for(var i=0;i<r.length;++i){var s=r[i];if(s=="")continue;var o=s.indexOf("="),u,a;if(o<0){u=OAuth.decodePercent(s);a=null}else{u=OAuth.decodePercent(s.substring(0,o));a=OAuth.decodePercent(s.substring(o+1))}n.push([u,a])}return n},setParameter:function(t,n,r){var i=t.parameters;if(i instanceof Array){for(var s=0;s<i.length;++s)if(i[s][0]==n)if(r===undefined)i.splice(s,1);else{i[s][1]=r;r=undefined}r!==undefined&&i.push([n,r])}else{i=OAuth.getParameterMap(i);i[n]=r;t.parameters=i}},setParameters:function(t,n){var r=OAuth.getParameterList(n);for(var i=0;i<r.length;++i)OAuth.setParameter(t,r[i][0],r[i][1])},completeRequest:function(t,n){t.method==null&&(t.method="GET");var r=OAuth.getParameterMap(t.parameters);r.oauth_consumer_key==null&&OAuth.setParameter(t,"oauth_consumer_key",n.consumerKey||"");r.oauth_token==null&&n.token!=null&&OAuth.setParameter(t,"oauth_token",n.token);r.oauth_version==null&&OAuth.setParameter(t,"oauth_version","1.0");r.oauth_timestamp==null&&OAuth.setParameter(t,"oauth_timestamp",OAuth.timestamp());r.oauth_nonce==null&&OAuth.setParameter(t,"oauth_nonce",OAuth.nonce(6));OAuth.SignatureMethod.sign(t,n)},setTimestampAndNonce:function(t){OAuth.setParameter(t,"oauth_timestamp",OAuth.timestamp());OAuth.setParameter(t,"oauth_nonce",OAuth.nonce(6))},addToURL:function(t,n){newURL=t;if(n!=null){var r=OAuth.formEncode(n);if(r.length>0){var i=t.indexOf("?");i<0?newURL+="?":newURL+="&";newURL+=r}}return newURL},getAuthorizationHeader:function(t,n){var r='OAuth realm="'+OAuth.percentEncode(t)+'"',i=OAuth.getParameterList(n);for(var s=0;s<i.length;++s){var o=i[s],u=o[0];u.indexOf("oauth_")==0&&(r+=","+OAuth.percentEncode(u)+'="'+OAuth.percentEncode(o[1])+'"')}return r},correctTimestampFromSrc:function(t){t=t||"oauth_timestamp";var n=document.getElementsByTagName("script");if(n==null||!n.length)return;var r=n[n.length-1].src;if(!r)return;var i=r.indexOf("?");if(i<0)return;parameters=OAuth.getParameterMap(OAuth.decodeForm(r.substring(i+1)));var s=parameters[t];if(s==null)return;OAuth.correctTimestamp(s)},correctTimestamp:function(t){OAuth.timeCorrectionMsec=t*1e3-(new Date).getTime()},timeCorrectionMsec:0,timestamp:function(){var t=(new Date).getTime()+OAuth.timeCorrectionMsec;return Math.floor(t/1e3)},nonce:function(t){var n=OAuth.nonce.CHARS,r="";for(var i=0;i<t;++i){var s=Math.floor(Math.random()*n.length);r+=n.substring(s,s+1)}return r}});OAuth.nonce.CHARS="0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";OAuth.declareClass=function(t,n,r){var i=t[n];t[n]=r;if(r!=null&&i!=null)for(var s in i)s!="prototype"&&(r[s]=i[s]);return r};OAuth.declareClass(OAuth,"SignatureMethod",function(){});OAuth.setProperties(OAuth.SignatureMethod.prototype,{sign:function(t){var n=OAuth.SignatureMethod.getBaseString(t),r=this.getSignature(n);OAuth.setParameter(t,"oauth_signature",r);return r},initialize:function(t,n){var r;n.accessorSecret!=null&&t.length>9&&t.substring(t.length-9)=="-Accessor"?r=n.accessorSecret:r=n.consumerSecret;this.key=OAuth.percentEncode(r)+"&"+OAuth.percentEncode(n.tokenSecret)}});OAuth.setProperties(OAuth.SignatureMethod,{sign:function(t,n){var r=OAuth.getParameterMap(t.parameters).oauth_signature_method;if(r==null||r==""){r="HMAC-SHA1";OAuth.setParameter(t,"oauth_signature_method",r)}OAuth.SignatureMethod.newMethod(r,n).sign(t)},newMethod:function(t,n){var r=OAuth.SignatureMethod.REGISTERED[t];if(r!=null){var i=new r;i.initialize(t,n);return i}var s=new Error("signature_method_rejected"),o="";for(var u in OAuth.SignatureMethod.REGISTERED){o!=""&&(o+="&");o+=OAuth.percentEncode(u)}s.oauth_acceptable_signature_methods=o;throw s},REGISTERED:{},registerMethodClass:function(t,n){for(var r=0;r<t.length;++r)OAuth.SignatureMethod.REGISTERED[t[r]]=n},makeSubclass:function(t){var n=OAuth.SignatureMethod,r=function(){n.call(this)};r.prototype=new n;r.prototype.getSignature=t;r.prototype.constructor=r;return r},getBaseString:function(t){var n=t.action,r=n.indexOf("?"),i;if(r<0)i=t.parameters;else{i=OAuth.decodeForm(n.substring(r+1));var s=OAuth.getParameterList(t.parameters);for(var o=0;o<s.length;++o)i.push(s[o])}return OAuth.percentEncode(t.method.toUpperCase())+"&"+OAuth.percentEncode(OAuth.SignatureMethod.normalizeUrl(n))+"&"+OAuth.percentEncode(OAuth.SignatureMethod.normalizeParameters(i))},normalizeUrl:function(t){var n=OAuth.SignatureMethod.parseUri(t),r=n.protocol.toLowerCase(),i=n.authority.toLowerCase(),s=r=="http"&&n.port==80||r=="https"&&n.port==443;if(s){var o=i.lastIndexOf(":");o>=0&&(i=i.substring(0,o))}var u=n.path;u||(u="/");return r+"://"+i+u},parseUri:function(t){var n={key:["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],parser:{strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@\/]*):?([^:@\/]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/}},r=n.parser.strict.exec(t),i={},s=14;while(s--)i[n.key[s]]=r[s]||"";return i},normalizeParameters:function(t){if(t==null)return"";var n=OAuth.getParameterList(t),r=[];for(var i=0;i<n.length;++i){var s=n[i];s[0]!="oauth_signature"&&r.push([OAuth.percentEncode(s[0])+" "+OAuth.percentEncode(s[1]),s])}r.sort(function(e,t){return e[0]<t[0]?-1:e[0]>t[0]?1:0});var o=[];for(var u=0;u<r.length;++u)o.push(r[u][1]);return OAuth.formEncode(o)}});OAuth.SignatureMethod.registerMethodClass(["PLAINTEXT","PLAINTEXT-Accessor"],OAuth.SignatureMethod.makeSubclass(function(t){return this.key}));OAuth.SignatureMethod.registerMethodClass(["HMAC-SHA1","HMAC-SHA1-Accessor"],OAuth.SignatureMethod.makeSubclass(function(t){b64pad="=";var n=b64_hmac_sha1(this.key,t);return n}));try{OAuth.correctTimestampFromSrc()}catch(e){}(function(e){e.fn.jkey=function(t,n,r){function c(e){var t,n={};for(t in e)e.hasOwnProperty(t)&&(n[e[t]]=t);return n}var i=this;this[0]&&!this[0].parentNode&&(i=document);var s={a:65,b:66,c:67,d:68,e:69,f:70,g:71,h:72,i:73,j:74,k:75,l:76,m:77,n:78,o:79,p:80,q:81,r:82,s:83,t:84,u:85,v:86,w:87,x:88,y:89,z:90,0:48,1:49,2:50,3:51,4:52,5:53,6:54,7:55,8:56,9:57,f1:112,f2:113,f3:114,f4:115,f5:116,f6:117,f7:118,f8:119,f9:120,f10:121,f11:122,f12:123,shift:16,ctrl:17,control:17,alt:18,option:18,opt:18,cmd:224,command:224,fn:255,"function":255,backspace:8,osxdelete:8,enter:13,"return":13,space:32,spacebar:32,esc:27,escape:27,tab:9,capslock:20,capslk:20,"super":91,windows:91,insert:45,"delete":46,home:36,end:35,pgup:33,pageup:33,pgdn:34,pagedown:34,left:37,up:38,right:39,down:40,"!":49,"@":50,"#":51,$:52,"%":53,"^":54,"&":55,"*":56,"(":57,")":48,"`":96,"~":96,"-":45,_:45,"=":187,"+":187,"[":219,"{":219,"]":221,"}":221,"\\":220,"|":220,";":59,":":59,"'":222,'"':222,",":188,"<":188,".":190,">":190,"/":191,"?":191},o="",u="";if(typeof n=="function"&&typeof r=="undefined"){r=n;n=!1}if(t.toString().indexOf(",")>-1)var a=t.match(/[a-zA-Z0-9]+/gi);else var a=[t];for(o in a){if(!a.hasOwnProperty(o))continue;if(a[o].toString().indexOf("+")>-1){var f=[],l=a[o].split("+");for(u in l)f[u]=s[l[u]];a[o]=f}else a[o]=s[a[o]]}var h=c(s);return this.each(function(){i=e(this);var t=[];i.bind("keydown.jkey",function(i){t[i.keyCode]=i.keyCode;if(e.inArray(i.keyCode,a)>-1){if(typeof r=="function"){r.call(this,h[i.keyCode]);n===!1&&i.preventDefault()}}else for(o in a)if(e.inArray(i.keyCode,a[o])>-1){var s="unchecked";for(u in a[o])s!=0&&(e.inArray(a[o][u],t)>-1?s=!0:s=!1);if(s===!0&&typeof r=="function"){var f="";for(var l in t)t[l]!=""&&(f+=h[t[l]]+"+");f=f.substring(0,f.length-1);r.call(this,f);n===!1&&i.preventDefault()}}}).bind("keyup.jkey",function(e){t[e.keyCode]=""})})}})(jQuery);jQuery.fn.extend({everyTime:function(e,t,n,r){return this.each(function(){jQuery.timer.add(this,e,t,n,r)})},oneTime:function(e,t,n){return this.each(function(){jQuery.timer.add(this,e,t,n,1)})},stopTime:function(e,t){return this.each(function(){jQuery.timer.remove(this,e,t)})}});jQuery.extend({timer:{global:[],guid:1,dataKey:"jQuery.timer",regex:/^([0-9]+(?:\.[0-9]*)?)\s*(.*s)?$/,powers:{ms:1,cs:10,ds:100,s:1e3,das:1e4,hs:1e5,ks:1e6},timeParse:function(e){if(e==undefined||e==null)return null;var t=this.regex.exec(jQuery.trim(e.toString()));if(t[2]){var n=parseFloat(t[1]),r=this.powers[t[2]]||1;return n*r}return e},add:function(e,t,n,r,i){var s=0;if(jQuery.isFunction(n)){i||(i=r);r=n;n=t}t=jQuery.timer.timeParse(t);if(typeof t!="number"||isNaN(t)||t<0)return;if(typeof i!="number"||isNaN(i)||i<0)i=0;i=i||0;var o=jQuery.data(e,this.dataKey)||jQuery.data(e,this.dataKey,{});o[n]||(o[n]={});r.timerID=r.timerID||this.guid++;var u=function(){(++s>i&&i!==0||r.call(e,s)===!1)&&jQuery.timer.remove(e,n,r)};u.timerID=r.timerID;o[n][r.timerID]||(o[n][r.timerID]=window.setInterval(u,t));this.global.push(e)},remove:function(e,t,n){var r=jQuery.data(e,this.dataKey),i;if(r){if(!t)for(t in r)this.remove(e,t,n);else if(r[t]){if(n){if(n.timerID){window.clearInterval(r[t][n.timerID]);delete r[t][n.timerID]}}else for(var n in r[t]){window.clearInterval(r[t][n]);delete r[t][n]}for(i in r[t])break;if(!i){i=null;delete r[t]}}for(i in r)break;i||jQuery.removeData(e,this.dataKey)}}}});jQuery(window).bind("unload",function(){jQuery.each(jQuery.timer.global,function(e,t){jQuery.timer.remove(t)})});jQuery.url=function(){var e={},t={},n={url:window.location,strictMode:!1,key:["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],q:{name:"queryKey",parser:/(?:^|&)([^&=]*)=?([^&]*)/g},parser:{strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/}},r=function(){str=decodeURI(n.url);var e=n.parser[n.strictMode?"strict":"loose"].exec(str),t={},r=14;while(r--)t[n.key[r]]=e[r]||"";t[n.q.name]={};t[n.key[12]].replace(n.q.parser,function(e,r,i){r&&(t[n.q.name][r]=i)});return t},i=function(e){jQuery.isEmptyObject(t)&&o();return e=="base"?t.port!==null&&t.port!==""?t.protocol+"://"+t.host+":"+t.port+"/":t.protocol+"://"+t.host+"/":t[e]===""?null:t[e]},s=function(e){jQuery.isEmptyObject(t)&&o();return t.queryKey[e]===null?null:t.queryKey[e]},o=function(){t=r();u()},u=function(){var n=t.path;e=[];e=t.path.length==1?{}:(n.charAt(n.length-1)=="/"?n.substring(1,n.length-1):path=n.substring(1)).split("/")};return{setMode:function(e){n.strictMode=e=="strict"?!0:!1;return this},setUrl:function(e){n.url=e===undefined?window.location:e;o();return this},segment:function(n){jQuery.isEmptyObject(t)&&o();return n===undefined?e.length:e[n]===""||e[n]===undefined?null:e[n]},attr:i,param:s}}();(function(e){e.validator=function(t){function u(e){return e!==""?!0:!1}function a(e){return e>0?!0:!1}function f(t,n){var r=n.replace("_confirm",""),i=e(r).val(),s=!1;t===i&&t!==""?s=!0:s=!1;return s}function l(e){var t=new RegExp(/^(("[\w-\s]+")|([\w- ]+(?:\.[\w- ]+)*)|("[\w-\s]+")([\w- ]+(?:\.[\w- ]+)*))(@((?:[\w- ]+\.)*\w[\w- ]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);return t.test(e)}function c(e){var t=/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;return t.test(e)}function h(e){return p(e)==="?"?!1:!0}function p(e){var t=(e+"").replace(/\s/g,"");return/^(34|37)/.test(t)&&t.length===15?"AMEX":/^(51|52|53|54|55)/.test(t)&&t.length===16?"MasterCard":!/^(4)/.test(t)||t.length!==13&&t.length!==16?/^(300|301|302|303|304|305|36|38)/.test(t)&&t.length===14?"DinersClub":/^(2014|2149)/.test(t)&&t.length===15?"enRoute":/^(6011)/.test(t)&&t.length===16?"Discover":/^(3)/.test(t)&&t.length===16?"JCB":/^(2131|1800)/.test(t)&&t.length===15?"JCB":"?":"Visa"}function d(t,n){var i=n.selector+"_error";if(t&&e(i).length!==0){e(n.selector+"_error").html("").removeClass(r.styles.error).addClass(r.styles.valid);e(n.selector+"_error").delay(300,function(){e(this).fadeOut()})}else if(e(i).length!==0){e(i).html(r.message+" "+n.field).removeClass(r.styles.valid).addClass(r.styles.error);e(n.selector+"_error").delay(150,function(){e(this).fadeIn()})}}function v(t,n){!t&&e(n.selector).length!==0&&e(n.selector).css("border","1px solid red")}function m(t,n){if(!t&&e(n.selector).length!==0){e(n.selector).val(n.field).addClass(r.styles.error);e(n.selector).delay(1e3,function(){e(n.selector).val("").removeClass(r.styles.error)})}}function g(){return!1}var n={elements:[],styles:{valid:"form_valid",error:"form_error"},message:"",success:function(){},failed:function(){}},r=e.extend(n,t),i=0,s=r.elements.length,o="";e.each(r.elements,function(t,n){var r=e(n.selector).val(),s=!1;n.rule==="require"?s=u(r):n.rule==="require_integer"?s=a(r):n.rule==="email"?s=l(r):n.rule==="us_phone"?s=c(r):n.rule==="confirm"?s=f(r,n.selector):n.rule==="credit_card"?s=h(r):jQuery.isFunction(n.rule)?s=n.rule(n.selector):s=!1;n.action==="label"?d(s,n):n.action==="border"?v(s,n):n.action==="element"?m(s,n):g();s?i++:o+=" "+n.field+","});if(i===s)r.success();else{var y=o.substring(0,o.length-1);r.failed(y)}}})($);(function(e,t){function A(e){if(i==="")return e;e=e.charAt(0).toUpperCase()+e.substr(1);return i+e}var n=Math,r=t.createElement("div").style,i=function(){var e="t,webkitT,MozT,msT,OT".split(","),t,n=0,i=e.length;for(;n<i;n++){t=e[n]+"ransform";if(t in r)return e[n].substr(0,e[n].length-1)}return!1}(),s=i?"-"+i.toLowerCase()+"-":"",o=A("transform"),u=A("transitionProperty"),a=A("transitionDuration"),f=A("transformOrigin"),l=A("transitionTimingFunction"),c=A("transitionDelay"),h=/android/gi.test(navigator.appVersion),p=/iphone|ipad/gi.test(navigator.appVersion),d=/hp-tablet/gi.test(navigator.appVersion),v=A("perspective")in r,m="ontouchstart"in e&&!d,g=i!==!1,y=A("transition")in r,b="onorientationchange"in e?"orientationchange":"resize",w=m?"touchstart":"mousedown",E=m?"touchmove":"mousemove",S=m?"touchend":"mouseup",x=m?"touchcancel":"mouseup",T=function(){if(i===!1)return!1;var e={"":"transitionend",webkit:"webkitTransitionEnd",Moz:"transitionend",O:"otransitionend",ms:"MSTransitionEnd"};return e[i]}(),N=function(){return e.requestAnimationFrame||e.webkitRequestAnimationFrame||e.mozRequestAnimationFrame||e.oRequestAnimationFrame||e.msRequestAnimationFrame||function(e){return setTimeout(e,1)}}(),C=function(){return e.cancelRequestAnimationFrame||e.webkitCancelAnimationFrame||e.webkitCancelRequestAnimationFrame||e.mozCancelRequestAnimationFrame||e.oCancelRequestAnimationFrame||e.msCancelRequestAnimationFrame||clearTimeout}(),k=v?" translateZ(0)":"",L=function(n,r){var i=this,c;i.wrapper=typeof n=="object"?n:t.getElementById(n);i.wrapper.style.overflow="hidden";i.scroller=i.wrapper.children[0];i.options={hScroll:!0,vScroll:!0,x:0,y:0,bounce:!0,bounceLock:!1,momentum:!0,lockDirection:!0,useTransform:!0,useTransition:!1,topOffset:0,checkDOMChanges:!1,handleClick:!0,hScrollbar:!0,vScrollbar:!0,fixedScrollbar:h,hideScrollbar:p,fadeScrollbar:p&&v,scrollbarClass:"",zoom:!1,zoomMin:1,zoomMax:4,doubleTapZoom:2,wheelAction:"scroll",snap:!1,snapThreshold:1,onRefresh:null,onBeforeScrollStart:function(e){e.preventDefault()},onScrollStart:null,onBeforeScrollMove:null,onScrollMove:null,onBeforeScrollEnd:null,onScrollEnd:null,onTouchEnd:null,onDestroy:null,onZoomStart:null,onZoom:null,onZoomEnd:null};for(c in r)i.options[c]=r[c];i.x=i.options.x;i.y=i.options.y;i.options.useTransform=g&&i.options.useTransform;i.options.hScrollbar=i.options.hScroll&&i.options.hScrollbar;i.options.vScrollbar=i.options.vScroll&&i.options.vScrollbar;i.options.zoom=i.options.useTransform&&i.options.zoom;i.options.useTransition=y&&i.options.useTransition;i.options.zoom&&h&&(k="");i.scroller.style[u]=i.options.useTransform?s+"transform":"top left";i.scroller.style[a]="0";i.scroller.style[f]="0 0";i.options.useTransition&&(i.scroller.style[l]="cubic-bezier(0.33,0.66,0.66,1)");i.options.useTransform?i.scroller.style[o]="translate("+i.x+"px,"+i.y+"px)"+k:i.scroller.style.cssText+=";position:absolute;top:"+i.y+"px;left:"+i.x+"px";i.options.useTransition&&(i.options.fixedScrollbar=!0);i.refresh();i._bind(b,e);i._bind(w);if(!m&&i.options.wheelAction!="none"){i._bind("DOMMouseScroll");i._bind("mousewheel")}i.options.checkDOMChanges&&(i.checkDOMTime=setInterval(function(){i._checkDOMChanges()},500))};L.prototype={enabled:!0,x:0,y:0,steps:[],scale:1,currPageX:0,currPageY:0,pagesX:[],pagesY:[],aniTime:null,wheelZoomCount:0,handleEvent:function(e){var t=this;switch(e.type){case w:if(!m&&e.button!==0)return;t._start(e);break;case E:t._move(e);break;case S:case x:t._end(e);break;case b:t._resize();break;case"DOMMouseScroll":case"mousewheel":t._wheel(e);break;case T:t._transitionEnd(e)}},_checkDOMChanges:function(){if(this.moved||this.zoomed||this.animating||this.scrollerW==this.scroller.offsetWidth*this.scale&&this.scrollerH==this.scroller.offsetHeight*this.scale)return;this.refresh()},_scrollbar:function(e){var r=this,i;if(!r[e+"Scrollbar"]){if(r[e+"ScrollbarWrapper"]){g&&(r[e+"ScrollbarIndicator"].style[o]="");r[e+"ScrollbarWrapper"].parentNode.removeChild(r[e+"ScrollbarWrapper"]);r[e+"ScrollbarWrapper"]=null;r[e+"ScrollbarIndicator"]=null}return}if(!r[e+"ScrollbarWrapper"]){i=t.createElement("div");r.options.scrollbarClass?i.className=r.options.scrollbarClass+e.toUpperCase():i.style.cssText="position:absolute;z-index:100;"+(e=="h"?"height:7px;bottom:1px;left:2px;right:"+(r.vScrollbar?"7":"2")+"px":"width:7px;bottom:"+(r.hScrollbar?"7":"2")+"px;top:2px;right:1px");i.style.cssText+=";pointer-events:none;"+s+"transition-property:opacity;"+s+"transition-duration:"+(r.options.fadeScrollbar?"350ms":"0")+";overflow:hidden;opacity:"+(r.options.hideScrollbar?"0":"1");r.wrapper.appendChild(i);r[e+"ScrollbarWrapper"]=i;i=t.createElement("div");r.options.scrollbarClass||(i.style.cssText="position:absolute;z-index:100;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);"+s+"background-clip:padding-box;"+s+"box-sizing:border-box;"+(e=="h"?"height:100%":"width:100%")+";"+s+"border-radius:3px;border-radius:3px");i.style.cssText+=";pointer-events:none;"+s+"transition-property:"+s+"transform;"+s+"transition-timing-function:cubic-bezier(0.33,0.66,0.66,1);"+s+"transition-duration:0;"+s+"transform: translate(0,0)"+k;r.options.useTransition&&(i.style.cssText+=";"+s+"transition-timing-function:cubic-bezier(0.33,0.66,0.66,1)");r[e+"ScrollbarWrapper"].appendChild(i);r[e+"ScrollbarIndicator"]=i}if(e=="h"){r.hScrollbarSize=r.hScrollbarWrapper.clientWidth;r.hScrollbarIndicatorSize=n.max(n.round(r.hScrollbarSize*r.hScrollbarSize/r.scrollerW),8);r.hScrollbarIndicator.style.width=r.hScrollbarIndicatorSize+"px";r.hScrollbarMaxScroll=r.hScrollbarSize-r.hScrollbarIndicatorSize;r.hScrollbarProp=r.hScrollbarMaxScroll/r.maxScrollX}else{r.vScrollbarSize=r.vScrollbarWrapper.clientHeight;r.vScrollbarIndicatorSize=n.max(n.round(r.vScrollbarSize*r.vScrollbarSize/r.scrollerH),8);r.vScrollbarIndicator.style.height=r.vScrollbarIndicatorSize+"px";r.vScrollbarMaxScroll=r.vScrollbarSize-r.vScrollbarIndicatorSize;r.vScrollbarProp=r.vScrollbarMaxScroll/r.maxScrollY}r._scrollbarPos(e,!0)},_resize:function(){var e=this;setTimeout(function(){e.refresh()},h?200:0)},_pos:function(e,t){if(this.zoomed)return;e=this.hScroll?e:0;t=this.vScroll?t:0;if(this.options.useTransform)this.scroller.style[o]="translate("+e+"px,"+t+"px) scale("+this.scale+")"+k;else{e=n.round(e);t=n.round(t);this.scroller.style.left=e+"px";this.scroller.style.top=t+"px"}this.x=e;this.y=t;this._scrollbarPos("h");this._scrollbarPos("v")},_scrollbarPos:function(e,t){var r=this,i=e=="h"?r.x:r.y,s;if(!r[e+"Scrollbar"])return;i=r[e+"ScrollbarProp"]*i;if(i<0){if(!r.options.fixedScrollbar){s=r[e+"ScrollbarIndicatorSize"]+n.round(i*3);s<8&&(s=8);r[e+"ScrollbarIndicator"].style[e=="h"?"width":"height"]=s+"px"}i=0}else if(i>r[e+"ScrollbarMaxScroll"])if(!r.options.fixedScrollbar){s=r[e+"ScrollbarIndicatorSize"]-n.round((i-r[e+"ScrollbarMaxScroll"])*3);s<8&&(s=8);r[e+"ScrollbarIndicator"].style[e=="h"?"width":"height"]=s+"px";i=r[e+"ScrollbarMaxScroll"]+(r[e+"ScrollbarIndicatorSize"]-s)}else i=r[e+"ScrollbarMaxScroll"];r[e+"ScrollbarWrapper"].style[c]="0";r[e+"ScrollbarWrapper"].style.opacity=t&&r.options.hideScrollbar?"0":"1";r[e+"ScrollbarIndicator"].style[o]="translate("+(e=="h"?i+"px,0)":"0,"+i+"px)")+k},_start:function(t){var r=this,i=m?t.touches[0]:t,s,u,a,f,l;if(!r.enabled)return;r.options.onBeforeScrollStart&&r.options.onBeforeScrollStart.call(r,t);(r.options.useTransition||r.options.zoom)&&r._transitionTime(0);r.moved=!1;r.animating=!1;r.zoomed=!1;r.distX=0;r.distY=0;r.absDistX=0;r.absDistY=0;r.dirX=0;r.dirY=0;if(r.options.zoom&&m&&t.touches.length>1){f=n.abs(t.touches[0].pageX-t.touches[1].pageX);l=n.abs(t.touches[0].pageY-t.touches[1].pageY);r.touchesDistStart=n.sqrt(f*f+l*l);r.originX=n.abs(t.touches[0].pageX+t.touches[1].pageX-r.wrapperOffsetLeft*2)/2-r.x;r.originY=n.abs(t.touches[0].pageY+t.touches[1].pageY-r.wrapperOffsetTop*2)/2-r.y;r.options.onZoomStart&&r.options.onZoomStart.call(r,t)}if(r.options.momentum){if(r.options.useTransform){s=getComputedStyle(r.scroller,null)[o].replace(/[^0-9\-.,]/g,"").split(",");u=+(s[12]||s[4]);a=+(s[13]||s[5])}else{u=+getComputedStyle(r.scroller,null).left.replace(/[^0-9-]/g,"");a=+getComputedStyle(r.scroller,null).top.replace(/[^0-9-]/g,"")}if(u!=r.x||a!=r.y){r.options.useTransition?r._unbind(T):C(r.aniTime);r.steps=[];r._pos(u,a);r.options.onScrollEnd&&r.options.onScrollEnd.call(r)}}r.absStartX=r.x;r.absStartY=r.y;r.startX=r.x;r.startY=r.y;r.pointX=i.pageX;r.pointY=i.pageY;r.startTime=t.timeStamp||Date.now();r.options.onScrollStart&&r.options.onScrollStart.call(r,t);r._bind(E,e);r._bind(S,e);r._bind(x,e)},_move:function(e){var t=this,r=m?e.touches[0]:e,i=r.pageX-t.pointX,s=r.pageY-t.pointY,u=t.x+i,a=t.y+s,f,l,c,h=e.timeStamp||Date.now();t.options.onBeforeScrollMove&&t.options.onBeforeScrollMove.call(t,e);if(t.options.zoom&&m&&e.touches.length>1){f=n.abs(e.touches[0].pageX-e.touches[1].pageX);l=n.abs(e.touches[0].pageY-e.touches[1].pageY);t.touchesDist=n.sqrt(f*f+l*l);t.zoomed=!0;c=1/t.touchesDistStart*t.touchesDist*this.scale;c<t.options.zoomMin?c=.5*t.options.zoomMin*Math.pow(2,c/t.options.zoomMin):c>t.options.zoomMax&&(c=2*t.options.zoomMax*Math.pow(.5,t.options.zoomMax/c));t.lastScale=c/this.scale;u=this.originX-this.originX*t.lastScale+this.x,a=this.originY-this.originY*t.lastScale+this.y;this.scroller.style[o]="translate("+u+"px,"+a+"px) scale("+c+")"+k;t.options.onZoom&&t.options.onZoom.call(t,e);return}t.pointX=r.pageX;t.pointY=r.pageY;if(u>0||u<t.maxScrollX)u=t.options.bounce?t.x+i/2:u>=0||t.maxScrollX>=0?0:t.maxScrollX;if(a>t.minScrollY||a<t.maxScrollY)a=t.options.bounce?t.y+s/2:a>=t.minScrollY||t.maxScrollY>=0?t.minScrollY:t.maxScrollY;t.distX+=i;t.distY+=s;t.absDistX=n.abs(t.distX);t.absDistY=n.abs(t.distY);if(t.absDistX<6&&t.absDistY<6)return;if(t.options.lockDirection)if(t.absDistX>t.absDistY+5){a=t.y;s=0}else if(t.absDistY>t.absDistX+5){u=t.x;i=0}t.moved=!0;t._pos(u,a);t.dirX=i>0?-1:i<0?1:0;t.dirY=s>0?-1:s<0?1:0;if(h-t.startTime>300){t.startTime=h;t.startX=t.x;t.startY=t.y}t.options.onScrollMove&&t.options.onScrollMove.call(t,e)},_end:function(r){if(m&&r.touches.length!==0)return;var i=this,s=m?r.changedTouches[0]:r,u,f,l={dist:0,time:0},c={dist:0,time:0},h=(r.timeStamp||Date.now())-i.startTime,p=i.x,d=i.y,v,g,y,b,w;i._unbind(E,e);i._unbind(S,e);i._unbind(x,e);i.options.onBeforeScrollEnd&&i.options.onBeforeScrollEnd.call(i,r);if(i.zoomed){w=i.scale*i.lastScale;w=Math.max(i.options.zoomMin,w);w=Math.min(i.options.zoomMax,w);i.lastScale=w/i.scale;i.scale=w;i.x=i.originX-i.originX*i.lastScale+i.x;i.y=i.originY-i.originY*i.lastScale+i.y;i.scroller.style[a]="200ms";i.scroller.style[o]="translate("+i.x+"px,"+i.y+"px) scale("+i.scale+")"+k;i.zoomed=!1;i.refresh();i.options.onZoomEnd&&i.options.onZoomEnd.call(i,r);return}if(!i.moved){if(m)if(i.doubleTapTimer&&i.options.zoom){clearTimeout(i.doubleTapTimer);i.doubleTapTimer=null;i.options.onZoomStart&&i.options.onZoomStart.call(i,r);i.zoom(i.pointX,i.pointY,i.scale==1?i.options.doubleTapZoom:1);i.options.onZoomEnd&&setTimeout(function(){i.options.onZoomEnd.call(i,r)},200)}else this.options.handleClick&&(i.doubleTapTimer=setTimeout(function(){i.doubleTapTimer=null;u=s.target;while(u.nodeType!=1)u=u.parentNode;if(u.tagName!="SELECT"&&u.tagName!="INPUT"&&u.tagName!="TEXTAREA"){f=t.createEvent("MouseEvents");f.initMouseEvent("click",!0,!0,r.view,1,s.screenX,s.screenY,s.clientX,s.clientY,r.ctrlKey,r.altKey,r.shiftKey,r.metaKey,0,null);f._fake=!0;u.dispatchEvent(f)}},i.options.zoom?250:0));i._resetPos(400);i.options.onTouchEnd&&i.options.onTouchEnd.call(i,r);return}if(h<300&&i.options.momentum){l=p?i._momentum(p-i.startX,h,-i.x,i.scrollerW-i.wrapperW+i.x,i.options.bounce?i.wrapperW:0):l;c=d?i._momentum(d-i.startY,h,-i.y,i.maxScrollY<0?i.scrollerH-i.wrapperH+i.y-i.minScrollY:0,i.options.bounce?i.wrapperH:0):c;p=i.x+l.dist;d=i.y+c.dist;if(i.x>0&&p>0||i.x<i.maxScrollX&&p<i.maxScrollX)l={dist:0,time:0};if(i.y>i.minScrollY&&d>i.minScrollY||i.y<i.maxScrollY&&d<i.maxScrollY)c={dist:0,time:0}}if(l.dist||c.dist){y=n.max(n.max(l.time,c.time),10);if(i.options.snap){v=p-i.absStartX;g=d-i.absStartY;if(n.abs(v)<i.options.snapThreshold&&n.abs(g)<i.options.snapThreshold)i.scrollTo(i.absStartX,i.absStartY,200);else{b=i._snap(p,d);p=b.x;d=b.y;y=n.max(b.time,y)}}i.scrollTo(n.round(p),n.round(d),y);i.options.onTouchEnd&&i.options.onTouchEnd.call(i,r);return}if(i.options.snap){v=p-i.absStartX;g=d-i.absStartY;if(n.abs(v)<i.options.snapThreshold&&n.abs(g)<i.options.snapThreshold)i.scrollTo(i.absStartX,i.absStartY,200);else{b=i._snap(i.x,i.y);(b.x!=i.x||b.y!=i.y)&&i.scrollTo(b.x,b.y,b.time)}i.options.onTouchEnd&&i.options.onTouchEnd.call(i,r);return}i._resetPos(200);i.options.onTouchEnd&&i.options.onTouchEnd.call(i,r)},_resetPos:function(e){var t=this,n=t.x>=0?0:t.x<t.maxScrollX?t.maxScrollX:t.x,r=t.y>=t.minScrollY||t.maxScrollY>0?t.minScrollY:t.y<t.maxScrollY?t.maxScrollY:t.y;if(n==t.x&&r==t.y){if(t.moved){t.moved=!1;t.options.onScrollEnd&&t.options.onScrollEnd.call(t)}if(t.hScrollbar&&t.options.hideScrollbar){i=="webkit"&&(t.hScrollbarWrapper.style[c]="300ms");t.hScrollbarWrapper.style.opacity="0"}if(t.vScrollbar&&t.options.hideScrollbar){i=="webkit"&&(t.vScrollbarWrapper.style[c]="300ms");t.vScrollbarWrapper.style.opacity="0"}return}t.scrollTo(n,r,e||0)},_wheel:function(e){var t=this,n,r,i,s,o;if("wheelDeltaX"in e){n=e.wheelDeltaX/12;r=e.wheelDeltaY/12}else if("wheelDelta"in e)n=r=e.wheelDelta/12;else{if(!("detail"in e))return;n=r=-e.detail*3}if(t.options.wheelAction=="zoom"){o=t.scale*Math.pow(2,1/3*(r?r/Math.abs(r):0));o<t.options.zoomMin&&(o=t.options.zoomMin);o>t.options.zoomMax&&(o=t.options.zoomMax);if(o!=t.scale){!t.wheelZoomCount&&t.options.onZoomStart&&t.options.onZoomStart.call(t,e);t.wheelZoomCount++;t.zoom(e.pageX,e.pageY,o,400);setTimeout(function(){t.wheelZoomCount--;!t.wheelZoomCount&&t.options.onZoomEnd&&t.options.onZoomEnd.call(t,e)},400)}return}i=t.x+n;s=t.y+r;i>0?i=0:i<t.maxScrollX&&(i=t.maxScrollX);s>t.minScrollY?s=t.minScrollY:s<t.maxScrollY&&(s=t.maxScrollY);t.maxScrollY<0&&t.scrollTo(i,s,0)},_transitionEnd
:function(e){var t=this;if(e.target!=t.scroller)return;t._unbind(T);t._startAni()},_startAni:function(){var e=this,t=e.x,r=e.y,i=Date.now(),s,o,u;if(e.animating)return;if(!e.steps.length){e._resetPos(400);return}s=e.steps.shift();s.x==t&&s.y==r&&(s.time=0);e.animating=!0;e.moved=!0;if(e.options.useTransition){e._transitionTime(s.time);e._pos(s.x,s.y);e.animating=!1;s.time?e._bind(T):e._resetPos(0);return}u=function(){var a=Date.now(),f,l;if(a>=i+s.time){e._pos(s.x,s.y);e.animating=!1;e.options.onAnimationEnd&&e.options.onAnimationEnd.call(e);e._startAni();return}a=(a-i)/s.time-1;o=n.sqrt(1-a*a);f=(s.x-t)*o+t;l=(s.y-r)*o+r;e._pos(f,l);e.animating&&(e.aniTime=N(u))};u()},_transitionTime:function(e){e+="ms";this.scroller.style[a]=e;this.hScrollbar&&(this.hScrollbarIndicator.style[a]=e);this.vScrollbar&&(this.vScrollbarIndicator.style[a]=e)},_momentum:function(e,t,r,i,s){var o=6e-4,u=n.abs(e)/t,a=u*u/(2*o),f=0,l=0;if(e>0&&a>r){l=s/(6/(a/u*o));r+=l;u=u*r/a;a=r}else if(e<0&&a>i){l=s/(6/(a/u*o));i+=l;u=u*i/a;a=i}a*=e<0?-1:1;f=u/o;return{dist:a,time:n.round(f)}},_offset:function(e){var t=-e.offsetLeft,n=-e.offsetTop;while(e=e.offsetParent){t-=e.offsetLeft;n-=e.offsetTop}if(e!=this.wrapper){t*=this.scale;n*=this.scale}return{left:t,top:n}},_snap:function(e,t){var r=this,i,s,o,u,a,f;o=r.pagesX.length-1;for(i=0,s=r.pagesX.length;i<s;i++)if(e>=r.pagesX[i]){o=i;break}o==r.currPageX&&o>0&&r.dirX<0&&o--;e=r.pagesX[o];a=n.abs(e-r.pagesX[r.currPageX]);a=a?n.abs(r.x-e)/a*500:0;r.currPageX=o;o=r.pagesY.length-1;for(i=0;i<o;i++)if(t>=r.pagesY[i]){o=i;break}o==r.currPageY&&o>0&&r.dirY<0&&o--;t=r.pagesY[o];f=n.abs(t-r.pagesY[r.currPageY]);f=f?n.abs(r.y-t)/f*500:0;r.currPageY=o;u=n.round(n.max(a,f))||200;return{x:e,y:t,time:u}},_bind:function(e,t,n){(t||this.scroller).addEventListener(e,this,!!n)},_unbind:function(e,t,n){(t||this.scroller).removeEventListener(e,this,!!n)},destroy:function(){var t=this;t.scroller.style[o]="";t.hScrollbar=!1;t.vScrollbar=!1;t._scrollbar("h");t._scrollbar("v");t._unbind(b,e);t._unbind(w);t._unbind(E,e);t._unbind(S,e);t._unbind(x,e);if(!t.options.hasTouch){t._unbind("DOMMouseScroll");t._unbind("mousewheel")}t.options.useTransition&&t._unbind(T);t.options.checkDOMChanges&&clearInterval(t.checkDOMTime);t.options.onDestroy&&t.options.onDestroy.call(t)},refresh:function(){var e=this,t,r,i,s,o=0,u=0;e.scale<e.options.zoomMin&&(e.scale=e.options.zoomMin);e.wrapperW=e.wrapper.clientWidth||1;e.wrapperH=e.wrapper.clientHeight||1;e.minScrollY=-e.options.topOffset||0;e.scrollerW=n.round(e.scroller.offsetWidth*e.scale);e.scrollerH=n.round((e.scroller.offsetHeight+e.minScrollY)*e.scale);e.maxScrollX=e.wrapperW-e.scrollerW;e.maxScrollY=e.wrapperH-e.scrollerH+e.minScrollY;e.dirX=0;e.dirY=0;e.options.onRefresh&&e.options.onRefresh.call(e);e.hScroll=e.options.hScroll&&e.maxScrollX<0;e.vScroll=e.options.vScroll&&(!e.options.bounceLock&&!e.hScroll||e.scrollerH>e.wrapperH);e.hScrollbar=e.hScroll&&e.options.hScrollbar;e.vScrollbar=e.vScroll&&e.options.vScrollbar&&e.scrollerH>e.wrapperH;t=e._offset(e.wrapper);e.wrapperOffsetLeft=-t.left;e.wrapperOffsetTop=-t.top;if(typeof e.options.snap=="string"){e.pagesX=[];e.pagesY=[];s=e.scroller.querySelectorAll(e.options.snap);for(r=0,i=s.length;r<i;r++){o=e._offset(s[r]);o.left+=e.wrapperOffsetLeft;o.top+=e.wrapperOffsetTop;e.pagesX[r]=o.left<e.maxScrollX?e.maxScrollX:o.left*e.scale;e.pagesY[r]=o.top<e.maxScrollY?e.maxScrollY:o.top*e.scale}}else if(e.options.snap){e.pagesX=[];while(o>=e.maxScrollX){e.pagesX[u]=o;o-=e.wrapperW;u++}e.maxScrollX%e.wrapperW&&(e.pagesX[e.pagesX.length]=e.maxScrollX-e.pagesX[e.pagesX.length-1]+e.pagesX[e.pagesX.length-1]);o=0;u=0;e.pagesY=[];while(o>=e.maxScrollY){e.pagesY[u]=o;o-=e.wrapperH;u++}e.maxScrollY%e.wrapperH&&(e.pagesY[e.pagesY.length]=e.maxScrollY-e.pagesY[e.pagesY.length-1]+e.pagesY[e.pagesY.length-1])}e._scrollbar("h");e._scrollbar("v");if(!e.zoomed){e.scroller.style[a]="0";e._resetPos(400)}},scrollTo:function(e,t,n,r){var i=this,s=e,o,u;i.stop();s.length||(s=[{x:e,y:t,time:n,relative:r}]);for(o=0,u=s.length;o<u;o++){if(s[o].relative){s[o].x=i.x-s[o].x;s[o].y=i.y-s[o].y}i.steps.push({x:s[o].x,y:s[o].y,time:s[o].time||0})}i._startAni()},scrollToElement:function(e,t){var r=this,i;e=e.nodeType?e:r.scroller.querySelector(e);if(!e)return;i=r._offset(e);i.left+=r.wrapperOffsetLeft;i.top+=r.wrapperOffsetTop;i.left=i.left>0?0:i.left<r.maxScrollX?r.maxScrollX:i.left;i.top=i.top>r.minScrollY?r.minScrollY:i.top<r.maxScrollY?r.maxScrollY:i.top;t=t===undefined?n.max(n.abs(i.left)*2,n.abs(i.top)*2):t;r.scrollTo(i.left,i.top,t)},scrollToPage:function(e,t,n){var r=this,i,s;n=n===undefined?400:n;r.options.onScrollStart&&r.options.onScrollStart.call(r);if(r.options.snap){e=e=="next"?r.currPageX+1:e=="prev"?r.currPageX-1:e;t=t=="next"?r.currPageY+1:t=="prev"?r.currPageY-1:t;e=e<0?0:e>r.pagesX.length-1?r.pagesX.length-1:e;t=t<0?0:t>r.pagesY.length-1?r.pagesY.length-1:t;r.currPageX=e;r.currPageY=t;i=r.pagesX[e];s=r.pagesY[t]}else{i=-r.wrapperW*e;s=-r.wrapperH*t;i<r.maxScrollX&&(i=r.maxScrollX);s<r.maxScrollY&&(s=r.maxScrollY)}r.scrollTo(i,s,n)},disable:function(){this.stop();this._resetPos(0);this.enabled=!1;this._unbind(E,e);this._unbind(S,e);this._unbind(x,e)},enable:function(){this.enabled=!0},stop:function(){this.options.useTransition?this._unbind(T):C(this.aniTime);this.steps=[];this.moved=!1;this.animating=!1},zoom:function(e,t,n,r){var i=this,s=n/i.scale;if(!i.options.useTransform)return;i.zoomed=!0;r=r===undefined?200:r;e=e-i.wrapperOffsetLeft-i.x;t=t-i.wrapperOffsetTop-i.y;i.x=e-e*s+i.x;i.y=t-t*s+i.y;i.scale=n;i.refresh();i.x=i.x>0?0:i.x<i.maxScrollX?i.maxScrollX:i.x;i.y=i.y>i.minScrollY?i.minScrollY:i.y<i.maxScrollY?i.maxScrollY:i.y;i.scroller.style[a]=r+"ms";i.scroller.style[o]="translate("+i.x+"px,"+i.y+"px) scale("+n+")"+k;i.zoomed=!1},isReady:function(){return!this.moved&&!this.zoomed&&!this.animating}};r=null;typeof exports!="undefined"?exports.iScroll=L:e.iScroll=L})(window,document);var mysqlDateParser=function(e){e?_str=e:_str="0000-00-00 00:00:00";var t={date:function(e){e=e||"number";m=_str.match(/([0-9])+/gi);e=="short"?months={"00":"00","01":"Jan.","02":"Feb.","03":"Mar.","04":"Apr.","05":"May.","06":"Jun.","07":"Jul.","08":"Aug.","09":"Sep.",10:"Oct.",11:"Nov.",12:"Dec."}:e=="long"&&(months={"00":"00","01":"January","02":"February","03":"March","04":"April","05":"May","06":"June","07":"July","08":"August","09":"September",10:"October",11:"November",12:"December"});if(e!=="number"){m[1]=months[m[1]];d=" "}else d="/";return m[1]+d+m[2]+d+m[0]},time:function(){m=_str.match(/([0-9])+/gi);pmOrAm="AM";if(m[3]>12){m[3]=m[3]-12;pmOrAm="PM"}return m[3]+":"+m[4]+" "+pmOrAm}};return t};