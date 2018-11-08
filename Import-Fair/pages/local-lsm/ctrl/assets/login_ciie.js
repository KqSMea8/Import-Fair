var SMSBTN_COUNTDOWN=60;
var SMSBTN_INTERVAL_KEY=0;
var AUTH_BASE=CTX+"/auth";
var targetType="screen";
var dataSmoothShow=false;
var urlMap={
	'保障概览':'/pages/local-lsm/overview/overview.jsp',
	'场馆保障':'/pages/local-lsm/ciienew/ciie.jsp',
	'漫游保障':'/pages/local-lsm/roam/roam.jsp',
	'专线保障':'/pages/local-lsm/spline/spline.jsp',
	'集团返迁':'/pages/local-lsm/overview_g/overview_g.jsp',
	
	
	'保障概览-场景概览':'/pages/local-lsm/overview/overviewleftyd.jsp',
	'保障概览-全网概览':'/pages/local-lsm/overview/overviewleft.jsp',
	'保障概览-GIS概览':'/pages/local-lsm/ciienew/ciiecenter.jsp',
	'保障概览-指标概览':'/pages/local-lsm/overview/overviewright.jsp',
	
	'场景保障-场景导航':'/pages/local-lsm/ciienew/ciieleft.jsp',
	'场景保障-场景GIS':'/pages/local-lsm/ciienew/ciiecenter.jsp?fromModel=ciie',
	'场景保障-场景概览':'/pages/local-lsm/ciienew/ciieright.jsp',
	
	'漫游保障-漫游概览':'/pages/local-lsm/roam/roamleft.jsp',
	'漫游保障-漫游GIS':'/pages/local-lsm/roam/roamcentersvg.jsp',
	'漫游保障-漫游分析':'/pages/local-lsm/roam/roamright.jsp',
	
	'专线保障-政企客户':'/pages/local-lsm/spline/splineleft.jsp',
	'专线保障-GIS拓扑':'/pages/local-lsm/spline/mapTopo.jsp',
	'专线保障-专线清单':'/pages/local-lsm/spline/splineright.jsp'
	
};
$(function(){
	$("#smsBtn").on("click",sendSms);
	$(document).keyup(function(e){
		if(e.keyCode==191){
			if(dataSmoothShow){
				$("#dataSmooth").hide();
				dataSmoothShow=false;
			}else{
				$("#dataSmooth").show();
				dataSmoothShow=true;
			}
			
		}
	});
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
	clearInterval(SMSBTN_INTERVAL_KEY);
	$("#smsBtn").val("重新发送");
	$("#smsBtn").attr("disabled",true);
	SMSBTN_COUNTDOWN=60;
	SMSBTN_INTERVAL_KEY=setInterval(smsTimeInterval,1000);
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
			LSMScreen.CacheDataManager.getInstance().getCiieAuthList({tel:phoneNum},function(result){
				var ciieListStr=result.data[0].ciie_list;
				if(ciieListStr==null) ciieListStr="";
				var ciieList=ciieListStr.split(',');
				var targetCookie=targetType=="screen"?"大屏版":"PC版";
				var smooth=$("#dataSmooth").val();
				$.cookie('dataSmooth',smooth,{ path: '/' });
				$.cookie('ciieList',ciieListStr,{ path: '/' });
				$.cookie('phoneNum',phoneNum,{ path: '/' });
				$.cookie('targetType',targetCookie,{ path: '/' });
				if(targetType=="screen"){
					for(var i=0;i<ciieList.length;i++){
						var item=ciieList[i];
						if(item.indexOf('-')==-1&&urlMap[item]!=null){
							log();
							window.location.href='screenframe.jsp?authItem='+encodeURIComponent(item);
							return;
						}
					}
				}else if(targetType=="tgj"){
					for(var i=0;i<ciieList.length;i++){
						var item=ciieList[i];
						if(item.indexOf('-')!=-1&&urlMap[item]!=null){
							log();
							window.location.href='screenframeauto.jsp';
							return;
						}
					}
				}else{
					for(var i=0;i<ciieList.length;i++){
						var item=ciieList[i];
						if(item.indexOf('-')!=-1&&urlMap[item]!=null){
							log();
							window.location.href='screenframe.jsp?authItem='+encodeURIComponent(item);
							return;
						}
					}
				}
				$("#promptInfo").text("对不起，您没有相应的权限").attr("title","对不起，您没有相应的权限");
			});
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
function log(){
	var module_name="进博会";
	var url = AUTH_BASE+'/log';
	crossSafeAjax({
  		type : 'POST',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		data:JSON.stringify({"module_name":module_name,"message_":"",cost_time:(1000+Math.random()*1000).toFixed(0)}),
  		url : encodeURI(url),
  		success : function(rawData) {
  		},
  		error: function(rawData) {
  		}
	});
}
