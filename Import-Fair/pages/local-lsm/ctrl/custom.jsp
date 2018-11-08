<!DOCTYPE html>
<html lang="zh-CN">
<head>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<meta charset="UTF-8" http-equiv="X-UA-Compatible" content="IE=Edge">
<title>自定义组合(总部)</title>
<%@ include file="/common/lib.jsp"%>
</head>
<body style="width:5300px;height:1200px;padding:0px 0px 0px 0px;margin:0px 0px 0px 0px;">
<table style ="width:100%;height:100%;" cellpadding="0" cellspacing="0">
	<tr>
		<td style="width:1600px;height:100%;">
			<iframe id="frame1" style="width:100%;height:100%;left:0px;border:none;" frameborder="no" src="${ctx}/pages/local-lsm/areamonitor/areaMonitor1.jsp" ></iframe>
		</td>
		<td style="width:1600px;height:100%;">
			<iframe id="frame2" style="width:100%;height:100%;left:0px;border:none;" frameborder="no" src="http://10.221.18.38:28080/subject_rest_service/eve/black2.html" ></iframe>
		</td>
		<td style="width:2100px;height:100%;">
			<iframe id="frame3" style="width:100%;height:100%;left:0px;border:none;" frameborder="no" src="${ctx}/pages/local-lsm/shvideoe2e/videoScreen.jsp" ></iframe>
		</td>
	</tr>
</table>
</body>
</html>