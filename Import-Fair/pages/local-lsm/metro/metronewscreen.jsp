<!DOCTYPE html>
<html lang="zh-CN" >
<head>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<meta charset="UTF-8" http-equiv="X-UA-Compatible" content="IE=Edge">
<title>地铁新版大屏</title>
</head>
<body style="width:6400px;height:1200px;padding:0px 0px 0px 0px;margin:0px 0px 0px 0px;">
<table style ="width:100%;height:100%;" cellpadding="0" cellspacing="0">
	<tr>
		<td style="width:35%;height:100%;">
			<iframe id="frame1" style="width:100%;height:100%;left:0px;border:none;" frameborder="no" src="metro1.jsp" ></iframe>
		</td>
		<td style="width:40%;height:100%;">
			<iframe id="frame2" style="width:100%;height:100%;left:0px;border:none;" frameborder="no" src="metro2.jsp" ></iframe>
		</td>
		<td style="width:25%;height:100%;">
			<iframe id="frame3" style="width:100%;height:100%;left:0px;border:none;" frameborder="no" src="metro3.jsp" ></iframe>
		</td>
	</tr>
</table>
</body>
<script>
window.onkeypress=parent.window.onkeypress;//选择页面快捷键
function NS_SW_chooseLineBySwf(lineIndex){
	var lineName="地铁"+lineIndex+"号线";
	try{
		var iframe=document.getElementById("frame1");
		var iframeWindow=iframe.window?iframe.window:iframe.contentWindow;
		iframeWindow.NS_SW_chooseLineBySwf(lineName);
	}catch(e){
		console.log("metro1.NS_SW_chooseLineBySwf failed");
	}
	
	try{
		var iframe=document.getElementById("frame3");
		var iframeWindow=iframe.window?iframe.window:iframe.contentWindow;
		iframeWindow.NS_SW_chooseLineBySwf(lineName);
	}catch(e){
		console.log("metro3.NS_SW_chooseLineBySwf failed");
	}
}

function timeLinePlayCallBack(time){
	try{
		var iframe=document.getElementById("frame1");
		var iframeWindow=iframe.window?iframe.window:iframe.contentWindow;
		iframeWindow.timeLinePlayCallBack(time);
	}catch(e){
		console.log("metro1.timeLinePlayCallBack failed");
	}
}
</script>

</html>