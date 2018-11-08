<!DOCTYPE html>
<%
String hotspot = request.getParameter("hotspot");//==null?"":new String(request.getParameter("hotspot").getBytes("ISO8859-1"), "utf-8");
String nettype = request.getParameter("nettype");
String cellname = request.getParameter("cellname");//==null?"":new String(request.getParameter("cellname").getBytes("ISO8859-1"), "utf-8");
String lacci = request.getParameter("lacci");
%>
<html lang="zh-CN" style="width:100%;height:100%;background:rgba(0,0,0,0);">
<head>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<meta charset="UTF-8" http-equiv="X-UA-Compatible" content="IE=Edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<%@ include file="/common/lib.jsp"%>
<c:set var="hotspot" value="common" />
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/My97DatePicker/WdatePicker.js"></script>
<link rel="stylesheet" href="${ctx}/static/jslib/My97DatePicker/WdatePicker.css" />
<%@ include file="/common/bootstrap.jsp"%> 
<%@ include file="/common/echarts.jsp"%>
<link rel="stylesheet" href="${jslib}/jquery-1.7.2/external/jqgrid/css/ui.jqgrid.css" />
<link rel="stylesheet" href="${jslib}/jquery-1.7.2/external/jqgrid/themes/redmond/jquery-ui-1.9.2.custom.min.css" />

<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciie/ciie.css" />

<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciienew/ciie.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/mapnew.css" />
<!-- 自己的 css -->
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/dialTest.css" />


<title>中国国际进口博览会</title>
<style type="text/css">
    
</style>
</head>
<body style="width:500px;height:580px;background:rgba(0,0,0,0);"> 
    <div class="maptipbg">
        <div class="horizontalRow elementBackground" style="height:575px;position: relative;">
            <!-- 移动 -->
            <div class="horizontalRow gsdfvsea">
                <div class="width-grsee">
                    <div class="height-dsga"><div id="yidongUp" class="mapDiv"></div></div>
                    <div class="height-dsga"><div class="unit-gsdasas-common unit-gsdasas-up">Mbps</div><div class="index-name-common index-name-up">上行速率</div></div>
                </div>
                <div class="width-gsdgv"><div class="iconyld iconYIDONG"></div></div>
                <div class="width-grsee">
                    <div class="height-dsga"><div id="yidongDown" class="mapDiv"></div>
                    <div class="height-dsga"><div class="unit-gsdasas-common unit-gsdasas-down">Mbps</div><div class="index-name-common index-name-down">下行速率</div></div>
                </div>
            </div>
            <!-- 联通 -->
            <div class="horizontalRow gsdfvsea">
                <div class="width-grsee">
                    <div class="height-dsga"><div id="liantongUp" class="mapDiv"></div></div>
                    <div class="height-dsga"><div class="unit-gsdasas-common unit-gsdasas-up">Mbps</div><div class="index-name-common index-name-up">上行速率</div></div>
                </div>
                <div class="width-gsdgv"><div class="iconyld iconLIANTONG"></div></div>
                <div class="width-grsee">
                    <div class="height-dsga"><div id="liantongDown" class="mapDiv"></div>
                    <div class="height-dsga"><div class="unit-gsdasas-common unit-gsdasas-down">Mbps</div><div class="index-name-common index-name-down">下行速率</div></div>
                </div>
            </div>
            <!-- 电信 -->
            <div class="horizontalRow gsdfvsea">
                <div class="width-grsee">
                    <div class="height-dsga"><div id="dianxinUp" class="mapDiv"></div></div>
                    <div class="height-dsga"><div class="unit-gsdasas-common unit-gsdasas-up">Mbps</div><div class="index-name-common index-name-up">上行速率</div></div>
                </div>
                <div class="width-gsdgv"><div class="iconyld iconDAINXIN"></div></div>
                <div class="width-grsee">
                    <div class="height-dsga"><div id="dianxinDown" class="mapDiv"></div>
                    <div class="height-dsga"><div class="unit-gsdasas-common unit-gsdasas-down">Mbps</div><div class="index-name-common index-name-down">下行速率</div></div>
                </div>
            </div>
        </div>
    </div>
</body>

<!-- jquery loadmask -->
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/spinner/jquery.ux.loadMaskcss.js"></script>

<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/consts.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/utils.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/screenDataManager.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/cacheDataManager.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/ciienew/ciie_config.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/dragger.js"></script>
<!-- 自己的 js -->
<script type="text/javascript" src="${ctx}/pages/local-lsm/maptip/dialTest.js"></script>

<script>
var BASEPATH="${ctx}";
var JSLIB="${jslib}";

var LACCI="<%=lacci %>";//"6152:37993";
var CELLNAME="<%=cellname%>";
var LAT = "";
var LON = "";

$(function(){
    //parent.changeCloseBtnOfPopup();   
    dialTest.init();
});




</script>


</html>