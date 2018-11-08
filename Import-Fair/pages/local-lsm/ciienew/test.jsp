<!DOCTYPE html>
<html lang="zh-CN">
<head>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%
String isScreenMode = request.getParameter("isScreenMode");
String hotspotId = request.getParameter("hotspotId");
String hotspotName = request.getParameter("hotspotName");
%>
<meta charset="UTF-8" http-equiv="X-UA-Compatible" content="IE=Edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<%@ include file="/common/lib.jsp"%>
<c:set var="hotspot" value="common" />
<%@ include file="/common/bootstrap.jsp"%> 
<title>大屏监控</title>
<style type="text/css">
	li{
		width:100px;
		height:100px;
		text-align:center;
		line-height:100px;
		float:left;
		margin:10px;
		border:solid 1px #ececec;
	}
</style>
</head>
<body> 
<div id="test" >
	<ul style="width:300px;">
		<li>面板1</li>
		<li>面板2</li>
		<li>面板3</li>
		<li>面板4</li>
	</ul>
</div>
</body>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/dragger.js"></script>
<script>
var lisJQ=$("#test").find("li");
var lis=[];
for(i=0;i<lisJQ.length;i++){
	lis.push(lisJQ[i]);
}
initLisEvent(lis);
</script>
</html>