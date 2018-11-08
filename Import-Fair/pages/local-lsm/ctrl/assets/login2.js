var SMSBTN_COUNTDOWN=60;
var SMSBTN_INTERVAL_KEY=0;
var AUTH_BASE=CTX+"/auth";
var targetType="screen";
$(function(){
	$("#smsBtn").on("click",sendSms);
});
function resetBox() {
	$("#username").val('');
	$("#userPassword").val('');
	$("#verification_code").val('');
}
function sendSms() {
	$("#smsBtn").attr("disabled",true);
	$("#smsBtn").unbind("click",sendSms);
	var phoneNum = $("#username").val();
	var verCode=$("#verification_code").val();
	var url = AUTH_BASE+'/verCode?enabled_lsm=1&fromNumber='+phoneNum+'&verCode='+verCode+'&content='+encodeURIComponent("【上海移动重要场景监控】尊敬的用户，您的短信验证码为[%s]，请尽快完成登录操作。")+'&t='+(new Date()).getTime();
	$.ajax({
		url : url,
		type : "get",
		processData:false,
		dataType:'text'
	}).done(function(code) {
		if(code=="-1"){
			$("#promptInfo").text("图片验证码不正确").attr("title","图片验证码不正确");
			$("#smsBtn").attr("disabled",false);
			$("#smsBtn").on("click",sendSms);
		}else if(code=="-2"){
			$("#promptInfo").text("该手机号不在白名单中").attr("title","该手机号不正确或者没有权限");
			$("#smsBtn").attr("disabled",false);
			$("#smsBtn").on("click",sendSms);
		}else{
			$("#smsBtn").val("重新发送");
			clearInterval(SMSBTN_INTERVAL_KEY);
			$("#smsBtn").attr("disabled",true);
			SMSBTN_COUNTDOWN=60;
			SMSBTN_INTERVAL_KEY=setInterval(smsTimeInterval,1000);
		}
	});
}
function smsTimeInterval() {
	SMSBTN_COUNTDOWN--;
	if(SMSBTN_COUNTDOWN==0){
		$("#smsBtn").val("重新发送");
		$("#smsBtn").attr("disabled",false);
		$("#smsBtn").on("click",sendSms);
		clearInterval(SMSBTN_INTERVAL_KEY);
	}else{
		$("#smsBtn").val("重新发送("+SMSBTN_COUNTDOWN+"秒)");
	}
}
function changeImg(){
	$("#captcha_img").attr('src',AUTH_BASE+'/image?t='+(new Date()).getTime());
}
function checkedForm(d) {
	var phoneNum = $("#username").val();
	var smsCode=$("#userPassword").val();
	
	var url = AUTH_BASE+'/login?fromNumber='+phoneNum+'&content='+smsCode+'&t='+(new Date()).getTime();
//	var url = AUTH_BASE+'/loginDic?enabled_lsm=1&fromNumber='+phoneNum+'&content='+smsCode+'&t='+(new Date()).getTime();
	$.ajax({
		url : url,
		type : "get",
		processData:false,
		dataType:'text'
	}).done(function(code) {
		if(code!="-1"){
			window.location.href="chooser.jsp";
		}else if(code=="-1"){
			$("#promptInfo").text("短信验证码不正确").attr("title","短信验证码不正确");
		}
	});
	
}
function switchTarget(type) {
	var img=$("#typeRadio_"+targetType).attr('src');
	$("#typeRadio_"+targetType).attr('src',img.replace('select.png','unselect.png'));
	$("#typeRadio_"+type).attr('src',img.replace('unselect.png','select.png'));
	targetType=type;
}
