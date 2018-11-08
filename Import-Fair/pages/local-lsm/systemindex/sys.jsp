<!DOCTYPE html>
<html lang="zh-CN">
<head>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%
%>
<meta charset="UTF-8" http-equiv="X-UA-Compatible" content="IE=Edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<%@ include file="/common/lib.jsp"%>
<%@ include file="/common/bootstrap.jsp"%> 
<%@ include file="/common/echarts.jsp"%>
<link rel="stylesheet" href="assets/css/sys.css" />
<script src="sys.js" type="text/javascript"></script>

<title>大屏监控</title>
</head>
<body>
<div id="container" >
	<div id="list">
		<ul id="listul" class="listul">
			<li index="0" class="listItem listSelected"><img class="itemImg" src="assets/images/sys0.png"></img><span class="itemName">系统菜单</span><div style="clear:both;"></div></li>
		</ul>
	</div>
	<div id="imgSet">
		<div class="imgItem"></div>
		<div class="imgItem"></div>
		<div class="imgItem"></div>
		<div class="imgItem"></div>
	</div>
</div>

</body>
<script>

	
</script>
</html>