<!DOCTYPE html>
<html lang="zh-CN" > 
<head>
<%String groupType=request.getParameter("groupType")==null?"0":request.getParameter("groupType"); %>

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

<%@ include file="/pages/local-lsm/common/screenbaseinclude.jsp"%>
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/common/custom_small.css" />
<link rel="stylesheet" href="${ctx}/scripts/local-lsm/common/lou-multi-select-e052211/css/multi-select.css" />


<title>IDC</title>

<!--自己的css-->

<!--自己的js-->
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/jquery.ux.loadMask.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/lou-multi-select-e052211/js/jquery.multi-select.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/dragger.js"></script>

<script src="${ctx}/scripts/local-lsm/kpiview/idcView/idcView.js" type="text/javascript"></script>
<script src="${ctx}/scripts/local-lsm/kpiview/idcView/idcViewAssist.js" type="text/javascript"></script>

<style>
     html{
         height:100%;
     }
   /* .kpiview_chart_parent {
      width: 49%;
    }*/
    .tempWinClose {
        width: 24px;
        height: 24px;
        background-size:100% 100%;
    }
    .kpiview_chartExcel {
        background-image: url(../../../static/styles/local-lsm/images/download.png);
        background-repeat: no-repeat;
        width: 16px;
        height: 16px;
        background-size: 16px;
        cursor: pointer;
        z-index: 2;
    }
</style>
</head>
<!-- <body style="width:100%;height:100%;overflow-y:auto;">
    <div id="idcView" class="idcView" style="padding: 10px 0 0 0"></div>
</body> -->
<body style="width:100%;height:100%;overflow-y:hidden;"> 
    <div id="idcView" class="idcView" style="width:100%;height:100%;overflow-y:auto;position:relative;">
        
    </div>
    
    
</body>
<script type="text/javascript">
 var groupType=<%=groupType%>;
    $(function(){
        idcView.getGroupData();
        setInterval(idcView.initLoadData,5*60*1000)
        
    })
</script>
</html>