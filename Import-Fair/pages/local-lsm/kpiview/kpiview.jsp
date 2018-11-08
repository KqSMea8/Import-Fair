<!DOCTYPE html>
<html lang="zh-CN" > 
<head>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<meta charset="UTF-8" http-equiv="X-UA-Compatible" content="IE=Edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<%@ include file="/common/lib.jsp"%>
<c:set var="hotspot" value="common" />
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/My97DatePicker/WdatePicker.js"></script>
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/${hotspot}/style.css" />
<link rel="stylesheet" href="${ctx}/static/jslib/My97DatePicker/skin/My97DatePicker/WdatePicker.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/kpiview.css" />
<%@ include file="/common/bootstrap.jsp"%> 
<%@ include file="/common/echarts.jsp"%>


<title>菜单窗口</title>
</head>
<body style="width:100%;height:100%;overflow-y:hidden;"> 
	<div id="kpiview" class="kpiview" style="width:100%;height:100%;overflow-y:auto;position:relative;">
		
	</div>
	
	
</body>
<%@ include file="/pages/local-lsm/common/screenbaseinclude.jsp"%>
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/common/custom_small.css" />
<link rel="stylesheet" href="${ctx}/scripts/local-lsm/common/lou-multi-select-e052211/css/multi-select.css" />
<style type="text/css">
	html{
		width:100%;
		height:100%;
	}
	.formLb{
		color:white;
	}
	#conditionBar{
		width:100%;
	}
	.conditionsRow{
		margin-top:5px;
	}
	.conditions{
		padding:5px;
		width:100%;
	}
	.multiSpan { 
		display:inline-block;
		table-layout: fixed; 
		word-wrap: break-word; 
		overflow: hidden; 
	} 
	.radios{
		color:white; 
	}
	.colchooser li {
	    width: 90px;
	    height: 55px;
	    float: left;
	    font-size: 14px;
	    list-style: none;
	    margin: 5px;
	    padding: 10px;
	    color: white;
	}
	.tempWinTitle {
	    font-size: 24px;
	    font-weight: bold;
	    color: #ffffff;
	    text-indent: 10px;
	}
	
	.tempWinClose {
	    width: 24px;
	    height: 24px;
	    background-size:100% 100%;
	}
	.thresholdSplit{
		width:100%;
		color:white;
		font-size: 16px;
	    font-weight: bold;
	    border-bottom:solid 1px #ffffff;
	    margin-bottom:5px;
	    margin-top:5px;
	}
	
	.thresholdRecord span{
		color:white;
		margin-right:5px;
	}
	.thresholdRecord input{
		width:38px;
		margin-right:5px;
	}

</style>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/jquery.ux.loadMask.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/lou-multi-select-e052211/js/jquery.multi-select.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/dragger.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/kpiview/chartcomponent.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/kpiview/internetTv.js"></script>
<script>
$(function(){
	new KpiView.ChartGroupList('kpiview');
})

</script>
</html>