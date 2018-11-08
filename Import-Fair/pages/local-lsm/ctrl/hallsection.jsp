<!DOCTYPE html>
<html lang="zh-CN" style="width:100%;height:100%;background:rgba(0,0,0,0);">
<head>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%
	String authItem = request.getParameter("authItem");
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
		overflow:hidden;
	}
	body{
		width:100%;
		height:100%;
		padding:0;
		margin:0;
		overflow:hidden;
	}
</style>
</head>
<body class="frameBG"  style="overflow:hidden;"> 
	
</body>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/cacheDataManager.js"></script>

<script>
var BASEPATH="${ctx}";
var JSLIB="${jslib}";
var cdm=LSMScreen.CacheDataManager.getInstance();
var hotspots="J-WH馆,J-1号馆,J-2号馆,J-3号馆,J-4.1号馆,J-4.2号馆,J-5.1号馆,J-5.2号馆,J-6.1号馆,J-6.2号馆,J-7.1号馆,J-7.2号馆,J-8.1号馆,J-8.2号馆";
var CELLCONFIGDATA={};

initCellConfig();

function initCellConfig(){
	$.ajax({
		url : 'assets/hall/cellconfig1.txt',
		type : "get",
		processData:false,
		dataType:'text'
	}).done(function(result) {
		var list=result.split('\r\n');
		cacheCellConfig(list,1);
	});
	$.ajax({
		url : 'assets/hall/cellconfig2.txt',
		type : "get",
		processData:false,
		dataType:'text'
	}).done(function(result) {
		var list=result.split('\r\n');
		cacheCellConfig(list,2);
	});
	$.ajax({
		url : 'assets/hall/cellconfig3.txt',
		type : "get",
		processData:false,
		dataType:'text'
	}).done(function(result) {
		var list=result.split('\r\n');
		cacheCellConfig(list,3);
	});
}
function cacheCellConfig(list,lv){
	CELLCONFIGDATA[lv]=list;
	for(var i=0;i<list.length;i++){
		
	}
}
function loadData(){
	
}

function drawPics(){
	
}

</script>


</html>