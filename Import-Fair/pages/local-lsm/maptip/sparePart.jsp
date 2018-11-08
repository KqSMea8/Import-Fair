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
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/sparePart.css" />


<title>中国国际进口博览会</title>
<style type="text/css">
    
</style>
</head>
<body style="width:1676px;height:866px;background:rgba(0,0,0,0);"> 
    <div class="maptipbg">
        <div class="horizontalRow fontSubInfo" style="background-color: #020938;border-radius: 5px;">
            <span id="tongji" name="tongjiAndmingxi" class="getSelectgsearwga" style="display: inline-block;line-height: 55px;background-color: #020938;border-radius: 6px;vertical-align: middle;padding: 0 10px;cursor:pointer">统计</span>
            <span id="mingxi" name="tongjiAndmingxi" style="display: inline-block;line-height: 55px;background-color: #020938;border-radius: 6px;vertical-align: middle;padding: 0 10px;cursor:pointer">明细</span>
            <input id="cellnameList" class="fontSubInfo" style="width: 550px;height: 55px;padding-left:8px;margin-bottom: 0px;background-color: #010045;border:none;display: none;" />
        </div>
        <div id="tongjiDiv" class="horizontalRow jyuhgtrefd elementBackground" style="height:815px;position: relative;">
            <div name="commonAddressCell" class="contentDivOfkeyOfcell" style="padding:0 10px;height: 812px;overflow: auto;width: 100%;">
                <div name="table-head">
                    <table style="width:100%">
                        <colgroup>
                            <col style="width: 526px;" />
                            <col style="width: 526px;" />
                        </colgroup>
                        <thead id="commonAddressCellThead_tongji">
                            <tr>
                                <th>备件库</th>
                                <th>库存数</th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div name="table-body" style="height:747px;overflow-y:auto;">
                    <table style="width:100%">
                    <colgroup>
                        <col style="width: 526px;" />
                        <col style="width: 526px;" />
                    </colgroup>
                    <tbody id="commonAddressCellTbody_tongji"></tbody>
                    </table>
                </div>
            </div>
        </div>
        <div id="mingxiDiv" class="horizontalRow jyuhgtrefd elementBackground" style="height:815px;position: relative;display:none">
            <div name="commonAddressCell" class="contentDivOfkeyOfcell" style="padding:0 10px;height: 812px;overflow: auto;width: 100%;">
                <div name="table-head">
                    <table style="width:100%">
                        <colgroup>
                            <col style="width: 128px;" />
                            <col style="width: 92px;" />
                            <col style="width: 94px;" />
                            <col style="width: 188px;" />
                            <col style="width: 94px;" />
                            <col style="width: 278px;" />
                            <col style="width: 94px;" />
                        </colgroup>
                        <thead id="commonAddressCellThead">
                            <tr>
                                <th>备件名称</th>
                                <th>备件厂家</th>
                                <th>设备类型</th>
                                <th>设备型号</th>
                                <th>保障网格</th>
                                <th>备件库</th>
                                <th>调度状态</th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div name="table-body" style="height:747px;overflow-y:auto;">
                    <table style="width:100%">
                    <colgroup>
                        <col style="width: 100px;" />
                        <col style="width: 100px;" />
                        <col style="width: 100px;" />
                        <col style="width: 100px;" />
                        <col style="width: 100px;" />
                        <col style="width: 260px;" />
                        <col style="width: 100px;" />
                    </colgroup>
                    <tbody id="commonAddressCellTbody"></tbody>
                    </table>
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
<script type="text/javascript" src="${ctx}/pages/local-lsm/maptip/sparePart.js"></script>

<script>
var BASEPATH="${ctx}";
var JSLIB="${jslib}";

var LACCI="<%=lacci %>";//"6152:37993";
var CELLNAME="<%=cellname%>";
var LAT = "";
var LON = "";

$(function(){
    parent.changeCloseBtnOfPopup();
    parent.addCloseEvent();
    sparePart.init();
});




</script>


</html>