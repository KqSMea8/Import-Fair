<!DOCTYPE html>
<html lang="zh-CN" style="width:100%;height:100%;background:rgba(0,0,0,0);">
<head>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%
	String exturl = request.getParameter("exturl");
%>
<meta charset="UTF-8" http-equiv="X-UA-Compatible" content="IE=Edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<%@ include file="/common/lib.jsp"%>
<c:set var="hotspot" value="common" />
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/My97DatePicker/WdatePicker.js"></script>
<link rel="stylesheet" href="${ctx}/static/jslib/My97DatePicker/WdatePicker.css" />
<%@ include file="/common/bootstrap.jsp"%> 
<link rel="stylesheet" href="${jslib}/jquery-1.7.2/external/jqgrid/css/ui.jqgrid.css" />
<link rel="stylesheet" href="${jslib}/jquery-1.7.2/external/jqgrid/themes/redmond/jquery-ui-1.9.2.custom.min.css" />

<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciie/ciie.css" />

<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciienew/ciie.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciie/ciie.css" />

<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciienew/ciie.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciienew/navi.css" />


<title>中国国际进口博览会</title>
<style type="text/css">
	html{
		width:100%;
		height:100%;
		padding:0;
		margin:0;
	}
	body{
		width:100%;
		height:100%;
		padding:0;
		margin:0;
	}
</style>
</head>
<body style="background:rgba(0,0,0,0);overflow:hidden;"> 
	<iframe id="SCREENFRAME"></iframe>
</body>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/navigator.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/navigatorSingle.js"></script>

<script>
var BASEPATH="${ctx}";
var JSLIB="${jslib}";
var comp=null;
var exturl="<%=exturl%>";
$(function(){
	$('#SCREENFRAME').width($('body').width());
	$('#SCREENFRAME').height($('body').height());
	$('#SCREENFRAME').attr('src',exturl);
});
</script>


</html>