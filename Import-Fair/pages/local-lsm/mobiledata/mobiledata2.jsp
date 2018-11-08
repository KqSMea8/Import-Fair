<!DOCTYPE html>
<html lang="zh-CN">
<head>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<meta charset="UTF-8" http-equiv="X-UA-Compatible" content="IE=Edge">
<title>上海移动数据管理2</title>
<%@ include file="/common/lib.jsp"%>
<%@ include file="/common/bootstrap.jsp"%> 
<%@ include file="/common/echarts.jsp"%>
<link href="font-awesome-4.3.0/css/font-awesome.css" rel="stylesheet" type="text/css"/>
<link href="styles/common-all.css" rel="stylesheet" type="text/css"/>
<link href="styles/common.css" rel="stylesheet" type="text/css"/>
<link href="styles/sh-data.css" rel="stylesheet" type="text/css"/>
</head>
<body style="width:2100px; height:1200px; position:relative; z-index:1;">
	<div class="data-top">
    	<h2>上海移动数据共享平台数据质量管理视图</h2>
    </div>
	<!--------------------数据采集------------------------------------------------------->
    <div class="data-box fl" style="width:500px;">
    	<div class="data-box-title">数据采集</div>
        <div class="data-cont">
        	<div class="data-cont-box1">
            	<h3>接口数占比</h3>
                <div class="data-indicator" style="height:340px" id="interfaceRingChart">
                </div>
            </div>
        	<div class="data-cont-box1" style="margin-top:25px;">
            	<h3>记录数趋势图</h3>
                <div class="data-indicator" style="height:340px" id="recordBarChart">
                </div>
            </div>
            <table class="data-indicator" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:25px 0;">
                <tr>
                    <td width="50%"><label>总接口数</label><span id="if_all">357</span>个</td>
                    <td width="50%"><label>总记录数</label><span id="record_all">1436</span>亿条</td>
                </tr>
            </table>
            <div class="data-indicator data-progress" style="margin-top:25px;">
                当日任务完成率：<span style="color:#ffcc01" id="task_percent">80</span><font style="color:#ffcc01">%</font>
                <div class="progress-box">
                    <div class="progress-green" id="task_percent_bar" style="width:80%"></div>
                </div>
                <ul>
                    <li class="fl">当前完成任务数：<span id="task_done" style="color:#ffcc01">400</span><font style="color:#ffcc01">个</font></li>
                    <li class="fr">总任务数：<span id="task_all" style="color:#ffcc01">500</span><font style="color:#ffcc01">个</font></li>
                </ul>
                <div class="clear"></div>
            </div>
        </div>
    </div>
    <!--------------------数据处理------------------------------------------------------->
    <div class="data-box fl" style="width:500px; margin-left:122px;">
    	<div class="data-box-title">数据处理</div>
        <div class="data-cont">
        	<div class="data-cont-box1">
            	<h3>实时数据处理（storm）</h3>
                <table class="data-indicator" cellpadding="0" cellspacing="0" border="0" width="100%">
                    <tr>
                        <td width="50%"><label>总接口数</label><span id="if_storm">200</span>个</td>
                        <td width="50%"><label>总记录数</label><span id="record_storm">664</span>亿条</td>
                    </tr>
                </table>
                <div class="data-indicator data-progress" style="margin-top:10px;">
                	当日任务完成率：<span style="color:#ffcc01" id="task_storm_percent">80</span><font style="color:#ffcc01">%</font>
                    <div class="progress-box">
                    	<div class="progress-green" style="width:80%" id="task_storm_percent_bar"></div>
                    </div>
                    <ul>
                    	<li class="fl">当前完成任务数：<span style="color:#ffcc01" id="task_storm_done">400</span><font style="color:#ffcc01">个</font></li>
                        <li class="fr">总任务数：<span style="color:#ffcc01"  id="task_storm_all">500</span><font style="color:#ffcc01">个</font></li>
                    </ul>
                    <div class="clear"></div>
                </div>
            </div>
        	<div class="data-cont-box1" style="margin-top:25px;">
            	<h3>清单数据存储处理（Hbase）</h3>
                <table class="data-indicator" cellpadding="0" cellspacing="0" border="0" width="100%">
                    <tr>
                        <td width="33%"><label>清单总数</label><span id="sheet_hbase">203</span>个</td>
                        <td width="34%"><label>记录数</label><span id="record_hbase">1532</span>亿条</td>
                        <td width="33%"><label>存储量</label><span id="store_hbase">219</span>TB</td>
                    </tr>
                </table>
                <div id="hbase_btns" class="data-button-group">
                	<button class="btnSelected">GN</button>
                    <button style="color:#888; margin-left:6px">LTE</button>
                    <button style="color:#888; margin-left:7px">VOLTE</button>
                    <button style="margin-left:7px">用户级汇总数据</button>
                </div>
                <div class="data-indicator data-progress" style="margin-top:10px;">
                	当日任务完成率：<span style="color:#ffcc01" id="task_hbase_percent">50</span><font style="color:#ffcc01">%</font>
                    <div class="progress-box">
                    	<div class="progress-red" style="width:50%" id="task_hbase_percent_bar"></div>
                    </div>
                    <ul>
                    	<li class="fl">当前完成任务数：<span style="color:#ffcc01" id="task_hbase_done">250</span><font style="color:#ffcc01">个</font></li>
                        <li class="fr">总任务数：<span style="color:#ffcc01" id="task_hbase_all">500</span><font style="color:#ffcc01">个</font></li>
                    </ul>
                    <div class="clear"></div>
                </div>
            </div>
        	<div class="data-cont-box2" style="margin-top:25px;">
            	<h3>批量离线数据处理（impala）</h3>
                <table class="data-indicator" cellpadding="0" cellspacing="0" border="0" width="100%">
                	<tr>
                        <td class="data-tb-top" width="13%"></td>
                    	<td class="data-tb-top" width="29%"><label>模型总数</label></td>
                        <td class="data-tb-top" width="29%"><label>核查规则数</label></td>
                        <td class="data-tb-top" width="29%"><label>存储量</label></td>
                    </tr>
                    <tr>
                        <td class="data-tb-row">DW<br/>层</td>
                    	<td class="data-tb-row"><span id="impala_dw_model">20</span>个</td>
                        <td class="data-tb-row"><span id="impala_dw_rule">664</span>条</td>
                        <td class="data-tb-row"><span id="impala_dw_store">130</span>个</td>
                    </tr>
                    <tr>
                        <td>基础<br/>层</td>
                    	<td><span id="impala_base_model">19</span>个</td>
                        <td><span id="impala_base_rule">1931</span>条</td>
                        <td><span id="impala_base_store">64</span>个</td>
                    </tr>
                </table>
                <div class="data-indicator data-progress" style="margin-top:10px;">
                	当日任务完成率：<span style="color:#ffcc01" id="task_impala_percent">70</span><font style="color:#ffcc01">%</font>
                    <div class="progress-box">
                    	<div class="progress-green" style="width:70%" id="task_impala_percent_bar"></div>
                    </div>
                    <ul>
                    	<li class="fl">当前完成任务数：<span style="color:#ffcc01" id="task_impala_done">350</span><font style="color:#ffcc01">个</font></li>
                        <li class="fr">总任务数：<span style="color:#ffcc01" id="task_impala_all">500</span><font style="color:#ffcc01">个</font></li>
                    </ul>
                    <div class="clear"></div>
                </div>
            </div>
        </div>
    </div>
    <!--------------------数据共享------------------------------------------------------->
    <div class="data-box fl" style="width:500px; margin-left:122px;">
    	<div class="data-box-title">数据共享</div>
        <div class="data-cont">
        	<div class="data-cont-box2">
            	<h3>实时数据共享服务</h3>
                <table class="data-indicator" cellpadding="0" cellspacing="0" border="0" width="100%">
                    <tr>
                        <td width="50%"><label>发布服务数</label><span id="service_storm">200</span>个</td>
                        <td width="50%"><label>上层应用数</label><span id="upapp_storm">664</span>亿条</td>
                    </tr>
                </table>
                <div class="data-chart-box" style="margin-top:15px;">
                	<h4>访问次数趋势图</h4>
                	<div id="realTimeShareChart" style="height:145px; margin:15px 0 5px"></div>
                </div>
            </div>
        	<div class="data-cont-box2" style="margin-top:25px;">
            	<h3>清单查询共享服务</h3>
                <table class="data-indicator" cellpadding="0" cellspacing="0" border="0" width="100%">
                    <tr>
                        <td width="50%"><label>发布服务数</label><span id="service_hbase">200</span>个</td>
                        <td width="50%"><label>上层应用数</label><span id="upapp_hbase">664</span>亿条</td>
                    </tr>
                </table>
                <div class="data-button-group">
                	<button>GN</button>
                    <button style="color:#888; margin-left:6px">LTE</button>
                    <button style="color:#888; margin-left:7px">VOLTE</button>
                    <button style="margin-left:7px">用户级汇总数据</button>
                </div>
                <div class="data-chart-box" style="margin-top:15px;">
                	<h4>访问次数趋势图</h4>
                	<div id="sheetShareChart" style="height:145px; margin:15px 0 5px"></div>
                </div>
            </div>
        	<div class="data-cont-box2" style="margin-top:25px;">
            	<h3>批量处理共享服务</h3>
                <table class="data-indicator" cellpadding="0" cellspacing="0" border="0" width="100%">
                    <tr>
                        <td width="50%"><label>发布服务数</label><span id="service_impala">200</span>个</td>
                        <td width="50%"><label>上层应用数</label><span id="upapp_impala">664</span>亿条</td>
                    </tr>
                </table>
                <div class="data-chart-box" style="margin-top:15px;">
                	<h4>访问次数趋势图</h4>
                	<div id="batchShareChart" style="height:145px; margin:15px 0 5px"></div>
                </div>
            </div>
        </div>
    </div>
    <!--------------------数据应用------------------------------------------------------->
    <div class="data-box fr" style="width:220px;">
    	<div class="data-box-title" style="width:170px">数据应用</div>
        <div class="data-cont">
        	<div class="data-bubble" style="height:142px; margin:30px 0 0 23px">
            	<span style="left:50px; top:50px">实时业务<br/>质量保障</span>
            	<img src="images/bubble1.png"/>
            </div>
        	<div class="data-bubble" style="height:134px; margin:30px 0 0 38px">
            	<span style="left:50px; top:50px">客户溯源<br/>感知</span>
            	<img src="images/bubble2.png"/>
            </div>
        	<div class="data-bubble" style="height:142px; margin:30px 0 0 28px">
            	<span style="left:50px; top:40px">手机上网<br/>端到端<br/>感知分析</span>
            	<img src="images/bubble3.png"/>
            </div>
        	<div class="data-bubble" style="height:120px; margin:30px 0 0 24px">
            	<span style="left:60px; top:40px">CSFB<br/>专题</span>
            	<img src="images/bubble4.png"/>
            </div>
        	<div class="data-bubble" style="height:130px; margin:30px 0 0 38px">
            	<span style="left:55px; top:50px">LTE KPI<br/>分析</span>
            	<img src="images/bubble5.png"/>
            </div>
            <table class="data-indicator" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:58px">
                <tr>
                    <td class="data-tb-top">问题定界</td>
                </tr>
                <tr>
                   	<td class="data-tb-row"><label>问题数</label><span>664</span>个</td>
                </tr>
                <tr>
                   	<td class="data-tb-row"><label>工单数</label><span>130</span>张</td>
                </tr>
            </table>
        </div>
    </div>
    <div class="clear"></div>
    <!--------------------箭头指向------------------------------------------------------->
    <div style="position:absolute; left:525px; top:50%; z-index:3; margin:-38px 0 0 0"><img src="images/arrow.gif"/></div>
    <div style="position:absolute; left:1127px; top:99px; z-index:3;"><img src="images/line_c.gif"/></div>
    <div style="position:absolute; right:245px; top:50%; z-index:3; margin:-38px 0 0 0"><img src="images/arrow.gif"/></div>
</body>
<%@ include file="/pages/local-lsm/common/screenbaseinclude.jsp"%>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/mobiledata/mobiledata2.js"></script>
<script type="text/javascript">
var MOBILEDATA2;
$(document).ready(function(){
	MOBILEDATA2=new MobileDataScreen.ScreenController2();
});
</script>
</html>