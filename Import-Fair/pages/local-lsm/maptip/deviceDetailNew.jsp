<!DOCTYPE html>
<%
String hotspot = request.getParameter("hotspot");//==null?"":new String(request.getParameter("hotspot").getBytes("ISO8859-1"), "utf-8");
String nettype = request.getParameter("nettype");
String cellname = request.getParameter("cellname");//==null?"":new String(request.getParameter("cellname").getBytes("ISO8859-1"), "utf-8");
String lacci = request.getParameter("lacci");
String Belonged = request.getParameter("Belonged");
String is_g = request.getParameter("is_g");
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
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciie/ciie_jqgrid.css" />

<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciienew/ciie.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/mapnew.css" />
<!-- 自己的 css -->
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/deviceDetailNew.css" />


<title>中国国际进口博览会</title>
<style type="text/css">
	
</style>
</head>
<body style="width:1000px;height:840px;background:rgba(0,0,0,0);"> 
	<div class="maptipbg">
		<div class="horizontalRow fontSubInfo" style="background-color: #020938;border-radius: 5px;">
            <span style="display: inline-block;line-height: 55px;background-color: #020938;border-radius: 6px;vertical-align: middle;padding: 0 10px;display: none">小区名称：</span>
            <!-- <select id="cellnameList" class="fontSubInfo" style="width: 550px;height: 50px;margin-bottom: 0px;">
                <option>测试小区</option>
            </select> -->
            <!-- <input id="cellnameList" title="" class="fontSubInfo" style="width: 750px;height: 55px;padding-left:8px;margin-bottom: 0px;background-color: #010045;border:none;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;" /> -->
            <span id="cellnameList" title="" class="fontSubInfo" style="display: inline-block;line-height: 55px;width: 750px;vertical-align: middle;height: 55px;padding-left:8px;margin-bottom: 0px;background-color: #010045;border:none;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"></span>
		</div>
        <div class="horizontalRow elementBackground" style="height:150px;position: relative;">
            <!-- <div class="chuanshutuopo"></div> -->
            <div style="height:100%;width:100%;padding: 0 10px;">
                <div>
                    <div class="fl icon-shu" style="margin-top: 10px;"></div>
                    <div class="fl fontImportantInfo ciiekpistyle" style="height:40px;margin-left:9px;line-height: 40px;">基础信息</div>
                <div class="clear"></div>    
                </div>
                <div style="padding:0 10px">
                    <table style="height: 98px;width: 100%;font-size: 21px">
                        <tr>
                            <td>LAC-CI：<span id="lacciSpan" class="clearValueSpan_"></span></td>
                            <td>类型：<span id="cellNetSpan" class="clearValueSpan_"></span></td>
                            <td>属地：<span id="citySpan" class="clearValueSpan_"></span></td>
                            <td style="max-width:300px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">所属基站：<span id="stationSpan" title="" class="clearValueSpan_"></span></td>
                        </tr>
                        <tr>
                            <td colspan="2" style="max-width:430px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">所属机房：<span id="roomSpan" title="" class="clearValueSpan_"></span></td>
                            <td colspan="2">维护单位：<span id="maintenancedeptSpan" class="clearValueSpan_"></span></td>
                        </tr>
                        <tr>
                            <td colspan="2" id="associatedTransmissionEquipmentTd" style="display: none;max-width:430px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">关联的传输设备：<span id="associatedTransmissionEquipment" title="" class="clearValueSpan_ ilkmjnygtbf"></span></td>
                            <td colspan="2" id="associatedTransmissionSubnetTd" style="display: none;max-width:430px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">关联的传输子网：<span id="associatedTransmissionSubnet_1" class="clearValueSpan_ ilkmjnygtbf hideCurr"></span><span id="symbolOfcomma" class="hideCurr">，</span><span id="associatedTransmissionSubnet_2" class="clearValueSpan_ ilkmjnygtbf hideCurr"></span><span id="noClickIndex" class="clearValueSpan_ hideCurr"></span></td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <div class="horizontalRow elementBackground" style="height:150px">
            <div style="height:100%;width:100%;">
                <div name="tab" class="tabContent" style="height:50px;width:100%;">
                    <li class="fl outserverAndwarning  selectLi" values="outServer">
                        <div class="fl  icon-shu"></div>
                        <div class="fl fontImportantInfo ciiekpistyle" style="height:50px;margin-left:9px;line-height: 50px;">小区退服</div>
                    </li>
                    <li class="fl outserverAndwarning" values="warning">
                        <div class="fl icon-shu"></div>
                        <div class="fl fontImportantInfo ciiekpistyle" style="height:50px;margin-left:9px;line-height: 50px;">性能告警</div>
                    </li>
                </div>
                <div name="content" style="padding:0 10px">
                    <div style="height:90px;padding:0 10px;overflow: auto">
                        <table id="cellOutServiceTab" style="width: 100%;height: 100%;font-size: 21px">
                            <tr>
                                <td style="width: 111px;vertical-align: top;">当前故障：</td>
                                <td id="outServerRt" class="valueTd_" style="vertical-align: top;">无</td>
                            </tr>
                            <tr>
                                <td style="width: 111px;vertical-align: top;">历史故障：</td>
                                <td id="outServerHis" class="valueTd_" style="vertical-align: top;">无</td>
                            </tr>
                        </table>
                        <table id="alarmInfo" style="width: 100%;height: 100%;font-size: 21px;display: none">
                            <tr>
                                <td style="width: 111px;vertical-align: top;">当前故障：</td>
                                <td id="alarmRt" class="valueTd_" style="vertical-align: top;">无</td>
                            </tr>
                            <tr>
                                <td style="width: 111px;vertical-align: top;">历史故障：</td>
                                <td id="alarmHis" class="valueTd_" style="vertical-align: top;">无</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="horizontalRow elementBackground" style="height:471px">
            <div style="height:100%;width:100%;">
                <div name="tab" class="tabContent" style="height:50px;width:100%;">
                    <li class="fl keyindexAndcommonaddresscell selectLi" values="keyIndex">
                        <div class="fl icon-shu"></div>
                        <div class="fl fontImportantInfo ciiekpistyle" style="height:50px;margin-left:9px;line-height: 50px;">关键指标<span id="timeTypeStr"></span></div>
                    </li>
                    <li class="fl keyindexAndcommonaddresscell" values="commonAddressCell">
                        <div class="fl icon-shu"></div>
                        <div class="fl fontImportantInfo ciiekpistyle" style="height:50px;margin-left:9px;line-height: 50px;">同址小区</div>
                    </li>
                </div>
                <div name="content" style="padding:0 0px">
                    <div name="keyIndex" class="contentDivOfkeyOfcell" style="padding:0 10px">
                        <!--2G指标-->
                        <div id="_2GIndexDiv">
                            <div class="horizontalRow fontSubInfo tipKpiPanel indexShowHide2G" style="display: none;">
                                <div class="tipKpis_4">
                                    <div class="pr"><div class="tipIconwuxiangdiaohualv"></div><span class="tiptitle">用户数1（人）</span></div>
                                    <div><span class="clearValueSpan" indexType="kpi" id="s_091">--</span><span style="font-size:20px;">人</span></div>
                                </div>
                                <div class="tipKpis_4">
                                    <div class="pr"><div class="tipIconliuliang"></div><span class="tiptitle">流量（MB）</span></div>
                                    <div><span class="clearValueSpan" indexType="kpi" id="s_206">--</span><span style="font-size:20px;">MB</span></div>
                                </div>
                                <div class="tipKpis_4">
                                    <div class="pr"><div class="tipIconhuawuliang"></div><span class="tiptitle">GSM话务量（Erl）</span></div>
                                    <div><span class="clearValueSpan" indexType="gsm" id="gsmhwl">--</span><span style="font-size:20px;">Erl</span></div>
                                </div>
                                <div class="tipKpis_4">
                                    <div class="pr"><div class="tipIconupprbliyonglv"></div><span class="tiptitle">GSM无线利用率（%）</span></div>
                                    <div><span class="clearValueSpan" indexType="gsm" id="gsm_wireless_use_ratio">--</span><span style="font-size:20px;">%</span></div>
                                </div>
                            </div>
                            <div class="horizontalRow fontSubInfo tipKpiPanel indexShowHide2G" style="display: none;">
                                <!-- <div class="tipKpis_4">
                                    <div class="pr"><div class="tipIconwuxiangdiaohualv"></div><span class="tiptitle">GSM无线掉话率（%）</span></div>
                                    <div><span class="clearValueSpan" indexType="gsm" id="gsm_wireless_drop_ratio">--</span><span style="font-size:20px;">%</span></div>
                                </div> -->
                                <div class="tipKpis_4">
                                    <div class="pr"><div class="tipIconwuxianjietonglv"></div><span class="tiptitle">GSM无线接通率（%）</span></div>
                                    <div><span class="clearValueSpan" indexType="gsm" id="gsm_wireless_conn_ratio">--</span><span style="font-size:20px;">%</span></div>
                                </div>
                                <div class="tipKpis_4">
                                    <div class="pr"><div class="tipIconwuxianjietonglv"></div><span class="tiptitle">上行TBF建立成功率（%）</span></div>
                                    <div><span class="clearValueSpan" indexType="gsm" id="gsm_ul_tbf_succ_ratio">--</span><span style="font-size:20px;">%</span></div>
                                </div>
                                <div class="tipKpis_4">
                                    <div class="pr"><div class="tipIconwuxianjietonglv"></div><span class="tiptitle">下行TBF建立成功率（%）</span></div>
                                    <div><span class="clearValueSpan" indexType="gsm" id="gsm_dl_tbf_succ_ratio">--</span><span style="font-size:20px;">%</span></div>
                                </div>
                                <div class="tipKpis_4">
                                    <div class="pr"><div class="tipIconwuxianjietonglv"></div><span class="tiptitle">GSM频带45占比（%）</span></div>
                                    <div><span class="clearValueSpan" indexType="gsm" id="gsm_disturb_45_ratio">--</span><span style="font-size:20px;">%</span></div>
                                </div>
                            </div>
                        </div>



                        <!--4G指标-->
                        <div id="_4GIndexDiv">
                            <div class="horizontalRow fontSubInfo tipKpiPanel indexShowHide4G" style="display: none;">
                                <div class="tipKpis_5">
                                    <div class="pr"><div class="tipIconwuxiangdiaohualv"></div><span class="tiptitle">用户数1（人）</span></div>
                                    <div><span class="clearValueSpan" indexType="kpi" id="s_091">--</span><span style="font-size:20px;">人</span></div>
                                </div>
                                <div class="tipKpis_5">
                                    <div class="pr"><div class="tipIconliuliang"></div><span class="tiptitle">流量（MB）</span></div>
                                    <div><span class="clearValueSpan" indexType="kpi" id="s_213">--</span><span style="font-size:20px;">MB</span></div>
                                </div>
                                <div class="tipKpis_5">
                                    <div class="pr"><div class="tipIconhuawuliang"></div><span class="tiptitle">4G话务量（Erl）</span></div>
                                    <div><span class="clearValueSpan" indexType="lte" id="ltehwl">--</span><span style="font-size:20px;">Erl</span></div>
                                </div>
                                <div class="tipKpis_5">
                                    <div class="pr"><div class="tipIconwuxianjietonglv"></div><span class="tiptitle">无线接通率（%）</span></div>
                                    <div><span class="clearValueSpan" indexType="kpi" id="s_211">--</span><span style="font-size:20px;">%</span></div>
                                </div>
                                <!-- <div class="tipKpis_5">
                                    <div class="pr"><div class="tipIconwuxiangdiaohualv"></div><span class="tiptitle">无线掉话率（%）</span></div>
                                    <div><span class="clearValueSpan" indexType="lte" id="lte_wireless_drop_ratio">--</span><span style="font-size:20px;">%</span></div>
                                </div> -->
                                <div class="tipKpis_5">
                                    <div class="pr"><div class="tipIconwuxianjietonglv"></div><span class="tiptitle">VOLTE接通率（%）</span></div>
                                    <div><span class="clearValueSpan" indexType="lte" id="lte_wireless_conn_ratio">--</span><span style="font-size:20px;">%</span></div>
                                </div>
                            </div>
                            <div class="horizontalRow fontSubInfo tipKpiPanel indexShowHide4G" style="display: none;">
                                <div class="tipKpis_4">
                                    <div class="pr"><div class="tipIconvoltediaohualv"></div><span class="tiptitle">VOLTE掉话率（%）</span></div>
                                    <div><span class="clearValueSpan" indexType="kpi" id="s_185">--</span><span style="font-size:20px;">%</span></div>
                                </div>
                                <div class="tipKpis_4">
                                    <div class="pr"><div class="tipIconupprbliyonglv"></div><span class="tiptitle">上行PRB利用率（%）</span></div>
                                    <div><span class="clearValueSpan" indexType="lte" id="lte_ul_prb_use_ratio">--</span><span style="font-size:20px;">%</span></div>
                                </div>
                                <div class="tipKpis_4">
                                    <div class="pr"><div class="tipIcondownprbliyonglv"></div><span class="tiptitle">下行PRB利用率（%）</span></div>
                                    <div><span class="clearValueSpan" indexType="lte" id="lte_dl_prb_use_ratio">--</span><span style="font-size:20px;">%</span></div>
                                </div>
                                <div class="tipKpis_4">
                                    <div class="pr"><div class="tipIconrrczuidalianjieshu"></div><span class="tiptitle">RRC最大连接数（个）</span></div>
                                    <div><span class="clearValueSpan" indexType="lte" id="succconnestab">--</span><span style="font-size:20px;">个</span></div>
                                </div>
                            </div>
                        </div>
                        <div name="echarts" class="horizontalRow" style="position: relative;margin-top: 10px;">
                            <div id="chartLoading" class="loading" style="position: absolute;width: 100%;height:100%;display: none">
                                <img src="../../../static/styles/local-lsm/map/loading.gif"  style="position:absolute;left:50%;top:50%;margin-top: -16px;margin-left: -16px">
                            </div>
                            <div style="position:absolute;">
                                <div id="echartsTitle" class="pr" style="position: absolute;top: -6px;display: inline-block;"></div>
                            </div>
                            <div id="chart" style="width:100%;height:216px"></div>
                        </div>
                    </div>
                    <div id="tableWaiDiv" name="commonAddressCell" class="contentDivOfkeyOfcell" style="padding:0 0px;height: 408px;overflow: auto;display: none">
                        <table id="table2"></table>
                    </div>
                </div>
            </div>
        </div>
	</div>
</body>

<!-- jquery loadmask -->
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/spinner/jquery.ux.loadMaskcss.js"></script>

<script type="text/javascript" src="${jslib}/jquery-1.7.2/external/jqgrid/js/i18n/grid.locale-cn.js"></script>
<script type="text/javascript" src="${jslib}/jquery-1.7.2/external/jqgrid/js/jquery.jqGrid.min.js"></script>

<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/consts.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/utils.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/screenDataManager.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/cacheDataManager.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/ciienew/ciie_config.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/dragger.js"></script>
<!-- 自己的 js -->
<script type="text/javascript" src="${ctx}/pages/local-lsm/maptip/deviceDetailNew.js"></script>

<script>
var BASEPATH="${ctx}";
var JSLIB="${jslib}";

var LACCI="<%=lacci %>";//"6152:37993";
var CELLNAME="<%=cellname%>";
var BELONGED="<%=Belonged %>";// 15   1  
var IS_G="<%=is_g %>";// 15   1  
var LAT = "";
var LON = "";

var SMOOTH = "";

$(function(){

    //var REAL_BELONGED = BELONGED || 15;

    SMOOTH = parent.getSmoothParam();
    parent.changeCloseBtnOfPopup();
	deviceDetailNew.init();
});




</script>


</html>