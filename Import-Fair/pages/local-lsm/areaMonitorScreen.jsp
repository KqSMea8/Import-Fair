<!DOCTYPE html>
<html lang="zh-CN" >
<head>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<meta charset="UTF-8" http-equiv="X-UA-Compatible" content="IE=Edge">
<%@ include file="/common/lib.jsp"%>
<c:set var="hotspot" value="common" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/${hotspot}/style.css" />
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/displayConfig.js"></script>
<title>大屏监控</title>
</head>
<body style="width:6400px;height:1200px;padding:0px 0px 0px 0px;margin:0px 0px 0px 0px;">
<table style ="width:100%;height:100%;" cellpadding="0" cellspacing="0">
	<tr>
		<td style="width:25%;height:100%;">
			<iframe id="frame1" style="width:100%;height:100%;left:0px;border:none;" frameborder="no" src="areamonitor/areaMonitor1.jsp?hotspot=${hotspot}&isScreenMode=true" ></iframe>
		</td>
		<td style="width:50%;height:100%;">
			<iframe id="frame2" style="width:100%;height:100%;left:0px;border:none;" frameborder="no" src="areamonitor/areaMonitor2.jsp?hotspot=${hotspot}&isScreenMode=true" ></iframe>
		</td>
		<td style="width:25%;height:100%;">
			<iframe id="frame3" style="width:100%;height:100%;left:0px;border:none;" frameborder="no" src="areamonitor/areaMonitor3.jsp?hotspot=${hotspot}&isScreenMode=true" ></iframe>
		</td>
	</tr>
</table>
<div title="返回" id="returnURLBtn" class="returnIconBtn" style="display:none;position:absolute;top:20px;left:6340px;"></div>
</body>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/consts.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/utils.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/ctrl.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/screenCrossCtrl.js"></script>
<script type="text/javascript">
window.onkeypress=parent.window.onkeypress;//选择页面快捷键
if(DC_RETURN_SHOW){
	$("#returnURLBtn").css("display","block");
	$("#returnURLBtn").attr("title",DC_RETURN_TIP);
	$("#returnURLBtn").on("click",function(){window.location.href=DC_RETURN_URL;});
}
</script>
</html>