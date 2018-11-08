<!DOCTYPE html>
<html lang="zh-CN">
<head>

<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%request.setCharacterEncoding("UTF-8"); %>  
<%
String cellname = request.getParameter("cellname");//==null?"":new String(request.getParameter("cellname").getBytes("ISO8859-1"), "utf-8");
String celltype = request.getParameter("celltype");
String lac = request.getParameter("lac");
String ci = request.getParameter("ci");
String hotspot = request.getParameter("hotspot");
%>
<meta charset="UTF-8" http-equiv="X-UA-Compatible" content="IE=Edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<%@ include file="/common/lib.jsp"%>
<c:set var="hotspot" value="disney" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/${hotspot}/style.css" />
<%@ include file="/common/bootstrap.jsp"%> 
<%@ include file="/common/echarts.jsp"%>
<title>小区指标详情</title>
</head>
<body style="background:#000a24;overflow:hidden;"> 

</body>
<%@ include file="/pages/local-lsm/common/screenbaseinclude.jsp"%>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/cacheDataManager.js"></script>
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/${hotspot}/custom.css" />
<script>
var CELLNAME="<%=cellname%>";
var CELLTYPE="<%=celltype%>".toLowerCase();
var LAC="<%=lac%>";
var CI="<%=ci%>";
var HOTSPOT="<%=hotspot%>";
</script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/cellDetail.js"></script>
<script>
if(HOTSPOT!=""&&HOTSPOT!="null"){
	CELLTYPE="4g";
	showHotspotKpi();
}else{
	showCellKpi();
}

</script>
</html>