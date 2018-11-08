<!DOCTYPE html>
<html lang="zh-CN" >
<head>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%
String pageParam = request.getParameter("page");
 %>
<meta charset="UTF-8" http-equiv="X-UA-Compatible" content="IE=Edge">
<title>进博会保障</title>
<%@ include file="/common/lib.jsp"%>
<script>
	var CTX="${ctx}";
	var PAGE="<%=pageParam%>";
</script>
<link rel="stylesheet" href="${ctx}/pages/local-lsm/ctrl/assets/bootstrap.min.css"/>
<link rel="stylesheet" href="${ctx}/pages/local-lsm/ctrl/assets/jqgrid/ui.jqgrid.css"/>
<link rel="stylesheet" href="${ctx}/pages/local-lsm/ctrl/assets/jqgrid/jquery-ui.css"/>
<link rel="stylesheet" href="${ctx}/pages/local-lsm/ctrl/assets/malihu-custom-scrollbar-plugin-master/jquery.mCustomScrollbar.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/common/custom.css"/>

<LINK rel=stylesheet type=text/css href="${ctx}/pages/local-lsm/ctrl/assets/sys.css" />
</head>
<body style="overflow-y:hidden;" >
<div id="container" >
	<iframe id="iframe" src="" frameborder="0" style="width:6400px;height:1200px;background:transparent;" ></iframe>
</div>
</body>

<script>

</script>

</html>