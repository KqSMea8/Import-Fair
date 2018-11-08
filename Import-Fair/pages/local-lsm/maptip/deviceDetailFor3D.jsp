<!DOCTYPE html>
<%
String hotspot = request.getParameter("hotspot");//==null?"":new String(request.getParameter("hotspot").getBytes("ISO8859-1"), "utf-8");
String nettype = request.getParameter("nettype");
String cellname = request.getParameter("cellname");//==null?"":new String(request.getParameter("cellname").getBytes("ISO8859-1"), "utf-8");
String lacci = request.getParameter("lacci");
String smooth = request.getParameter("smooth");

%>
<html lang="zh-CN" style="width:100%;height:100%;background:rgba(0,0,0,0);overflow:hidden;">
<head>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
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
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/mapnew.css" />
<!-- 自己的 css -->
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/deviceDetailNew.css" />


<title>中国国际进口博览会</title>
<style type="text/css">
	
</style>
</head>
<body style="width:1008px;height:833px;background:rgba(0,0,0,0);overflow:hidden;"> 
	<iframe id="cellDetail" allowtransparency="false" width="1001px"  frameborder="no" height="840px" src="" style="position:absolute;top:0;left:0;overflow:hidden;"></iframe>
	<div onclick="return3D();" id="cellDetail_close" class="cellcellClose_ map-icon-close" style="position:absolute;right:5px;top:5px;"></div>
</body>

<script>
var BASEPATH="${ctx}";
var JSLIB="${jslib}";

var LACCI="<%=lacci %>";//"6152:37993";
var CELLNAME="<%=cellname%>";
var smooth="<%=smooth%>";
var LAT = "";
var LON = "";

var url='deviceDetailNew.jsp?lacci='+encodeURIComponent(LACCI)+'&cellname='+encodeURIComponent(CELLNAME); 
$('#cellDetail').attr('src',url);
function return3D(){
	parent.closeCellDetail();
}
function getSmoothParam(){
	return smooth;
}
function changeCloseBtnOfPopup(){
	
}

</script>


</html>