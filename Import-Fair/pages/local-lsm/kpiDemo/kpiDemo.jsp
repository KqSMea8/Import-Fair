<!DOCTYPE html>
<html lang="zh-CN" > 
<head>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<meta charset="UTF-8" http-equiv="X-UA-Compatible" content="IE=Edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<%@ include file="/common/lib.jsp"%>
<title>测试页面</title>
<c:set var="hotspot" value="common" />
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/My97DatePicker/WdatePicker.js"></script>
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/${hotspot}/style.css" />
<link rel="stylesheet" href="${ctx}/static/jslib/My97DatePicker/skin/My97DatePicker/WdatePicker.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/kpiview.css" />
<%@ include file="/common/bootstrap.jsp"%> 
<%@ include file="/common/echarts.jsp"%>
</head>
<body style="width:100%;height:100%;overflow-y:auto;"> 
    <div id="kpiDemo" class="kpiDemo"></div>
</body>
<%@ include file="/pages/local-lsm/common/screenbaseinclude.jsp"%>
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/common/custom_small.css" />
<link rel="stylesheet" href="${ctx}/scripts/local-lsm/common/lou-multi-select-e052211/css/multi-select.css" />


<style type="text/css">


</style>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/jquery.ux.loadMask.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/lou-multi-select-e052211/js/jquery.multi-select.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/dragger.js"></script>
<script type="text/javascript" src="${ctx}/pages/local-lsm/kpiDemo/kpiDemo.js"></script>

<script>
$(function(){
    new KpiDemo.initFun("kpiDemo");
})
</script>
</html>