<!DOCTYPE html>
<html lang="zh-CN" > 
<head>
<%
String menuId = request.getParameter("menuId");
%>
<script>
	var MENU_ID="<%=menuId %>";
</script>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<meta charset="UTF-8" http-equiv="X-UA-Compatible" content="IE=Edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<%@ include file="/common/lib.jsp"%>
<c:set var="hotspot" value="common" />
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/My97DatePicker/WdatePicker.js"></script>
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/${hotspot}/style.css" />
<link rel="stylesheet" href="${ctx}/static/jslib/My97DatePicker/skin/My97DatePicker/WdatePicker.css" />
<%@ include file="/common/bootstrap.jsp"%> 
<%@ include file="/common/echarts.jsp"%>


<title>菜单窗口</title>
</head>
<body style="width:100%;height:100%;overflow:hidden;"> 
	<div id="conditionBar" style="padding-left:50px;">
		<div id="conditionCells" class="conditions" >
			<div class="conditionsRow" id="cellColBtnGroup" class="btn-group" style="display:none;">
			    <button type="button" class="cellColTypeBtn btn btn-primary btn-xs">LTE信令</button>
			    <button type="button" class="cellColTypeBtn btn btn-primary btn-xs active">LTE网管</button>
			    <button type="button" class="cellColTypeBtn btn btn-primary btn-xs">GSM网管</button>
			</div>
			<div class="conditionsRow" style="display:inline-block;">
				<div style="display:inline-block;color:white;margin-right:10px;">
					<input type="radio" name="radios" class="radios degradationRadios" id="degradationRadio" value="质差" >质差(<span id="degradationCount" style="">0</span>)</input>
					<input type="radio" name="radios" class="radios degradationRadios" id="degradationRadio2" value="全量" >全量(<span id="cellCount" >0</span>)</input>
				</div>
				<span class="formLb" >热点选择:</span>
				<select id="singleSelect"  style="display:none;"></select>
				<select id="singleSelect2"  style="display:none;"></select>
				<div id="multiSelectParent" class="dropdown" style="display:none;">
					<button type="button" class="btn btn-primary dropdown-toggle btn-xs" id="multiSelectResult" data-toggle="dropdown">
						<span id="selectedHotspots" class="multiSpan" style="max-width:200px;"></span>
				        <span class="caret"></span>
				    </button>
				    <ul class="dropdown-menu" role="menu" aria-labelledby="multiSelectResult">
				        <li data-stopPropagation="true" >
				        	<select id="multiSelect" data-stopPropagation="true" multiple="multiple" ></select>
				        </li>
				    </ul>
				</div>
				<span id="isQuerySubParent" style="color:#ffffff;display:none;"><input id="isQuerySub" type="checkbox">&nbsp;查询二级区域</span>
			</div>
			<div class="conditionsRow" style="display:inline-block;">
<!-- 				<span class="formLb">时间粒度:</span> -->
<!-- 			    <select id="periodSelect" style="width:60px;" > -->
<!-- 			    	<option>实时</option> -->
<!-- 			    	<option>日</option> -->
<!-- 			    </select> -->
			    <span class="formLb">时间:</span>
			    <input id="timeInput" style="color:white;height:25px;" readonly="readonly" type="text" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:00'})" class="Wdate" />
<!-- 			    <button id="thresholdCfgBtn" type="button" class="btn btn-primary btn-xs">阈值配置</button> -->
			    <button id="colCfgBtn" type="button" class="btn btn-primary btn-xs">列配置</button>
			    <button id="exportBtn" type="button" class="btn btn-success btn-xs">导出</button>
			    <button id="queryBtn" type="button" class="btn btn-success btn-xs">查询</button>
			</div>
			
		</div>
	</div>
	<div id="gridParent" style="height:100%;">
		<table id="grid"></table>
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
	    font-size: 16px;
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
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/wxthresholds.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/kpiview/chartcomponent.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/extraMenuHandler.js"></script>
<script>
	new SceneBase.ExtraMenuHandler(MENU_ID);
</script>
</html>