<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML xmlns="http://www.w3.org/1999/xhtml" style="OVERFLOW: hidden;">
<HEAD>
<META content="IE=7.0000" http-equiv="X-UA-Compatible">
<TITLE>上海移动重要区域保障</TITLE>
<META content="text/html; charset=utf-8" http-equiv=Content-Type>
<%@ include file="/common/lib.jsp"%>
<%@ include file="/common/bootstrap.jsp"%> 
<%@ include file="/common/echarts.jsp"%>
<script>
	var CTX="${ctx}";
</script>
<SCRIPT type=text/javascript src="${ctx}/pages/local-lsm/ctrl/assets/commonModule.js"></SCRIPT>
<SCRIPT type=text/javascript src="${ctx}/pages/local-lsm/ctrl/assets/json2.js"></SCRIPT>

<SCRIPT type=text/javascript src="${ctx}/pages/local-lsm/ctrl/assets/common_zh_CN.js"></SCRIPT>

<LINK rel=stylesheet type=text/css href="assets/validate.css"></LINK>

<SCRIPT type=text/javascript src="${ctx}/pages/local-lsm/ctrl/assets/jquery.validate.min.js"></SCRIPT>

<SCRIPT type=text/javascript src="${ctx}/pages/local-lsm/ctrl/assets/messages_bs_zh.js"></SCRIPT>
<!-- 这里是获取到国际化文件  -->
<SCRIPT type=text/javascript src="${ctx}/pages/local-lsm/ctrl/assets/InasLogin_zh_CN.js"></SCRIPT>

<SCRIPT type=text/javascript src="${ctx}/pages/local-lsm/ctrl/assets/commonModule.js"></SCRIPT>

<SCRIPT type=text/javascript src="${ctx}/pages/local-lsm/ctrl/assets/common_zh_CN.js"></SCRIPT>
<SCRIPT type=text/javascript src="${ctx}/scripts/local-lsm/common/utils.js"></SCRIPT>
<SCRIPT type=text/javascript src="${ctx}/scripts/local-lsm/common/cacheDataManager.js"></SCRIPT>
<LINK rel=stylesheet type=text/css href="${ctx}/pages/local-lsm/ctrl/assets/font-awesome.min.css"></LINK>
<META name=renderer content=webkit>
<LINK rel=stylesheet type=text/css href="${ctx}/pages/local-lsm/ctrl/assets/common.css">
<LINK rel=stylesheet type=text/css href="${ctx}/pages/local-lsm/ctrl/assets/login.css">
<STYLE>
:unknown {
	FONT-FAMILY: "微软雅黑";
	COLOR: #ccc
}

:unknown {
	FONT-FAMILY: "微软雅黑";
	COLOR: #ccc
}

:unknown {
	FONT-FAMILY: "微软雅黑";
	COLOR: #ccc
}

:unknown {
	FONT-FAMILY: "微软雅黑";
	COLOR: #ccc
}
.underline{
	border-bottom: 2px solid;
    padding-bottom: 1px;
    display: inline-block;
    line-height: .9;
}
</STYLE>

<SCRIPT type=text/javascript src="${ctx}/pages/local-lsm/ctrl/assets/placeholder.js"></SCRIPT>

<SCRIPT type=text/javascript src="${ctx}/pages/local-lsm/ctrl/assets/pswCookie.js"></SCRIPT>

<SCRIPT type=text/javascript src="${ctx}/pages/local-lsm/ctrl/assets/jquery.cookie(1).js"></SCRIPT>
<SCRIPT type=text/javascript src="${ctx}/pages/local-lsm/ctrl/assets/common.js"></SCRIPT>
<SCRIPT type=text/javascript src="${ctx}/pages/local-lsm/ctrl/assets/login1.js"></SCRIPT>
<SCRIPT type=text/javascript src="${ctx}/pages/local-lsm/ctrl/assets/login_ciie.js"></SCRIPT>
<SCRIPT type=text/javascript src="${ctx}/pages/local-lsm/ctrl/assets/sha1.js"></SCRIPT>

<SCRIPT>

window.onload = function(){ 
	changeImg(); 
	$("#username").val(""); 
	$("#password").val(""); 
};
</SCRIPT>

<META name=GENERATOR content="MSHTML 11.00.9600.18052">
</HEAD>
<BODY style="OVERFLOW: hidden; BACKGROUND-COLOR: #fff">
	<IMG src="${ctx}/pages/local-lsm/ctrl/assets/images/login/bg.jpg" style="position:absolute;width:6400px;height:1200px;top:50%;left:50%;margin-left:-3200px;margin-top:-600px;">
	<DIV class="login_box" style="POSITION: absolute;width:6400px;height:1200px;top:50%;left:50%;margin-left:-3200px;margin-top:-600px;">
		<img src="assets/images/login/t.png" style="position:absolute;width:1400px;height:200px;top:30px;left:50%;margin-left:-700px;">
		<FORM id=loginForm method=post
					action="" autocomplete="off"
					style="POSITION: absolute;width:1260px;height:730px;top:50%;left:50%;margin-left:-630px;margin-top:-325px;">
					<DIV class=login_banner></DIV>
					<DIV style="MARGIN-RIGHT: 50px">
						<TABLE width="100%">
							<TBODY>
								<TR>
									<TD></TD>
									<TD></TD>
									<TD></TD>
									<TD>
										<DIV id=promptInfo title="" class=LoginInfo
											style="OVERFLOW: hidden; FONT-SIZE: 32px; WHITE-SPACE: nowrap; TEXT-OVERFLOW: ellipsis; COLOR: #e33539; PADDING-BOTTOM: 5px; PADDING-TOP: 0px; PADDING-LEFT: 0px; DISPLAY: block; PADDING-RIGHT: 0px; MARGIN-TOP: 20px;TEXT-ALIGN:CENTER;"
											align=right></DIV>
									</TD>
								</TR>
							</TBODY>
						</TABLE>
					</DIV>
					<DIV class=login_main_right>
						<INPUT style="DISPLAY: none">
						<!-- for disable autocomplete on chrome -->
						<INPUT id=username class=login_input name=username
							autocomplete="off" placeholder="请输入手机号..." style="float:left;"> 
						<INPUT tabIndex=3 id=verification_code class=login_input
							style="float:left;HEIGHT: 90px; WIDTH: 410px; VERTICAL-ALIGN: bottom;  MARGIN: 60px 0px 0px 10px"
							name=verification_code autocomplete="off" placeholder="请输入验证码..."> 
						<IMG onclick=changeImg() id=captcha_img title=看不清楚，换一张
							style="float:left;CURSOR: pointer; HEIGHT: 90px; WIDTH: 280px; MARGIN: 63px 0px 0px 20px" 
							alt=看不清楚，换一张 src="">
							<!-- for disable autocomplete on chrome -->
						<INPUT id=userPassword class=login_input
							onkeydown="if(event.keyCode==13){checkedForm('promptInfo');}"
							type=text autocomplete="off" placeholder="请输入短信验证码..." 
							style="float:left;HEIGHT: 90px; WIDTH: 410px;MARGIN: 55px 0px 30px 15px">   
						
						<input id="smsBtn" 
											onmouseover="" 
											onmouseout=""
											src="assets/images/login/b1.png"
											class="login_btn2 btn_style"
											style="float:left;margin-top:42px;margin-left:5px;"
											type=button value="短信验证码" />
						<DIV class=login_btn_container>
							<TABLE cellSpacing=0 cellPadding=0 width="100%" border=0 style="color:white;font-size:28px;">
								<TBODY>
									<TR style="height:50px;">
										<TD valign="middle" align=left >
											<img id="typeRadio_screen" onclick="switchTarget('screen')" alt="" src="assets/images/login/select.png" style="cursor:pointer;margin-bottom:-10px;">大屏版<img alt="" src="assets/images/login/screen.png" style="margin-bottom:-10px;margin-left:10px;">
											<img id="typeRadio_pc" onclick="switchTarget('pc')" alt="" src="assets/images/login/unselect.png" style="cursor:pointer;margin-bottom:-10px;margin-left:13px;">PC版<img alt="" src="assets/images/login/pc.png" style="margin-bottom:-10px;margin-left:10px;">
										</TD>
										<TD valign="middle" align=left style="width:325px;" >
											<img id="typeRadio_tgj" onclick="switchTarget('tgj')" alt="" src="assets/images/login/unselect.png" style="cursor:pointer;margin-bottom:-10px;">管局版<img alt="" src="assets/images/login/pc.png" style="margin-bottom:-10px;margin-left:10px;">
											<select id="dataSmooth" style="display:none;color:black;margin-left:10px;">
												<option value="true" selected = "selected" >保障数据</option>
												<option value="false">生产数据</option>
											</select>
										</TD>
									</TR>
									<TR style="height:30px;">
										<td></td>
										<td></td>
									</TR>
									<TR>
										<TD align=left><img onclick="checkedForm('promptInfo')"
											onmouseover=""
											onmouseout=""
											src="assets/images/login/b2.png"
											class="login_btn1 btn_style"
											style="FONT-FAMILY: 'Microsoft YaHei', '黑体', sans-serif"
											type=button name="登 录" /></TD>
										<TD align=right><img id="resetBtn" onclick="resetBox()"
											onmouseover=""
											onmouseout=""
											class="login_btn1 btn_style"
											src="assets/images/login/b3.png"
											style="FONT-FAMILY: 'Microsoft YaHei', '黑体', sans-serif"
											type=button name="重置" /></TD>
									</TR>
								</TBODY>
							</TABLE>
						</DIV>
					</DIV>
						<div class="a_class" style="width:200px;height:50px;z-index:10;position: absolute;top:95.5%;left:40px"><a href="${ctx}/static/Unity/UnityWebPlayer.exe" class="underline" style="font-size:26px;color:#ff0000;">3D插件下载</a></div>
						
						<div class="a_class" style="width:240px;height:50px;z-index:10;position: absolute;top:100%;left:40px"><a href="${ctx}/static/Unity/WebComponents.exe" class="underline" style="font-size:26px;color:#ff0000;">机房视频插件下载</a></div>
				</FORM> 
	</DIV>
	<SCRIPT>
		var userName = "null";
		
		if (userName != null && userName != "" && userName != "null") {

			$
					.ajax({
						type : 'POST',
						dataType : "json",
						url : eastcom.baseURL
								+ '/projectInfo-unAuth/userInfo/getnamebydecipher',//解密用户名
						data : {
							name : userName
						},
						success : function(result) {
							var flag = result.success;
							if (flag == "true" && result.data != null) {
								var oldUserName = result.data;

								$
										.ajax({
											type : 'POST',
											dataType : "json",
											url : eastcom.baseURL
													+ '/projectInfo-unAuth/userInfo/checkuserbyname',//查询用户名是否存在
											data : {
												name : oldUserName
											},
											success : function(result) {
												var oldPassword = result.data;
												if (oldPassword != null) {
													$.cookie(
																	"inas_portallogin_user_username",
																	oldUserName);
													//alert("username=="+oldUserName+";;;;"+"password=="+oldPassword);
													window.location.href = "http://10.221.247.7:8080/INAS/pages/login/ssoSHOA.jsp?userName="
															+ oldUserName
															+ "&oldPassword="
															+ oldPassword;
												} else {
													alert("用户名不存在，请输入正确的用户名和密码！");
												}
											},
											error : function(request,
													textStatus, errorThrown) {

											}
										});

							} else {
								alert("用户名不存在，请输入正确的用户名和密码！");
							}
						},
						error : function(request, textStatus, errorThrown) {

						}
					});
		}

		
		
		
	</SCRIPT>
</BODY>
</HTML>
