<!DOCTYPE html>
<html lang="zh-CN">
<head>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<meta charset="UTF-8" http-equiv="X-UA-Compatible" content="IE=Edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>上海移动数据管理1</title>
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
    <div class="data-box fl" style="width:516px;">
    	<div class="data-box-title">数据采集</div>
        <div class="data-cont">
        	<div class="data-cont-box1">
            	<h3>DPI接口</h3>
                <table class="data-indicator" cellpadding="0" cellspacing="0" border="0" width="100%">
                	<tr>
                    	<td width="33%"><label>接口数</label><span>1436</span>个</td>
                        <td width="34%"><label>核查规则数</label><span>3</span>条</td>
                        <td width="33%"><label>问题总数</label><span>3759</span>个</td>
                    </tr>
                </table>
                <div class="data-list">
                	<span>当日数据质量核查结果：</span>
                    <ul>
                    	<li class="list-style1 fl" style="width:33%"><label>及时率：</label><span style="color:#ff0066"><b>55</b>%</span></li>
                        <li class="list-style1 fl" style="width:34%"><label>完整率：</label><span style="color:#00ff66"><b>75</b>%</span></li>
                        <li class="list-style1 fl" style="width:33%"><label>准确率：</label><span style="color:#00ff66"><b>69</b>%</span></li>
                    </ul>
                    <div class="clear"></div>
                </div>
                <div class="data-chart-box">
                	<h4>数据质量趋势图</h4>
                	<div id="lineandstack1" style="height:290px; margin:5px 0 0 0;"></div>
                </div>
            </div>
        	<div class="data-cont-box1" style="margin-top:10px;">
            	<h3>ESB接口</h3>
                <table class="data-indicator" cellpadding="0" cellspacing="0" border="0" width="100%">
                	<tr>
                    	<td width="33%"><label>接口数</label><span>79</span>个</td>
                        <td width="34%"><label>核查规则数</label><span>3727</span>条</td>
                        <td width="33%"><label>问题总数</label><span>1841</span>个</td>
                    </tr>
                </table>
                <div class="data-list">
                	<span>当日数据质量核查结果：</span>
                    <ul>
                    	<li class="list-style1 fl" style="width:33%"><label>及时率：</label><span style="color:#ff0066"><b>55</b>%</span></li>
                        <li class="list-style1 fl" style="width:34%"><label>完整率：</label><span style="color:#00ff66"><b>75</b>%</span></li>
                        <li class="list-style1 fl" style="width:33%"><label>准确率：</label><span style="color:#00ff66"><b>69</b>%</span></li>
                    </ul>
                    <div class="clear"></div>
                </div>
                <div class="data-chart-box">
                	<h4>数据质量趋势图</h4>
                	<div id="lineandstack2" style="height:290px; margin:5px 0 0 0;"></div>
                </div>
            </div>
        </div>
    </div>
    <!--------------------数据处理------------------------------------------------------->
    <div class="data-box fl" style="width:580px; margin-left:83px;">
    	<div class="data-box-title">数据处理</div>
        <div class="data-cont">
        	<div class="data-cont-box2">
            	<h3>实时数据处理</h3>
                <table class="data-indicator" cellpadding="0" cellspacing="0" border="0" width="100%">
                	<tr>
                    	<td width="33%"><label>接口总数</label><span>1436</span>个</td>
                        <td width="34%"><label>核查规则数</label><span>3</span>条</td>
                        <td width="33%"><label>问题总数</label><span>3759</span>个</td>
                    </tr>
                </table>
                <div class="data-list fl">
                	<span>当日数据质量核查结果</span>
                    <ul>
                    	<li class="list-style2"><label>及时率：</label><span style="color:#ff0066"><b>55</b>%</span></li>
                        <li class="list-style2"><label>完整率：</label><span style="color:#00ff66"><b>75</b>%</span></li>
                        <li class="list-style2"><label>准确率：</label><span style="color:#00ff66"><b>69</b>%</span></li>
                    </ul>
                </div>
                <div class="data-chart-box fr" style="width:340px; height:182px; margin-top:20px;">
                	<h4>问题数分布情况</h4>
                	<div id="radarchart1" style="height:110px; margin:5px 0 0 0"></div>
                </div>
                <div class="clear"></div>
            </div>
        	<div class="data-cont-box2" style="margin-top:10px;">
            	<h3>清单数据存储处理</h3>
                <table class="data-indicator" cellpadding="0" cellspacing="0" border="0" width="100%">
                	<tr>
                    	<td width="33%"><label>清单总数</label><span>79</span>个</td>
                        <td width="34%"><label>核查规则数</label><span>3727</span>条</td>
                        <td width="33%"><label>问题总数</label><span>1841</span>个</td>
                    </tr>
                </table>
                <div class="data-list fl">
                	<span>当日数据质量核查结果</span>
                    <ul>
                    	<li class="list-style2"><label>及时率：</label><span style="color:#ff0066"><b>55</b>%</span></li>
                        <li class="list-style2"><label>完整率：</label><span style="color:#00ff66"><b>75</b>%</span></li>
                        <li class="list-style2"><label>准确率：</label><span style="color:#00ff66"><b>69</b>%</span></li>
                    </ul>
                </div>
                <div class="data-chart-box fr" style="width:340px; height:182px; margin-top:20px;">
                	<h4>问题数分布情况</h4>
                	<div id="radarchart2" style="height:110px; margin:5px 0 0 0"></div>
                </div>
                <div class="clear"></div>
            </div>
        	<div class="data-cont-box2" style="margin-top:10px;">
            	<h3>批量离线数据处理</h3>
                <table class="data-indicator" cellpadding="0" cellspacing="0" border="0" width="100%">
                	<tr>
                        <td class="data-tb-top" width="25%"></td>
                    	<td class="data-tb-top" width="25%"><label>模型总数</label></td>
                        <td class="data-tb-top" width="25%"><label>核查规则数</label></td>
                        <td class="data-tb-top" width="25%"><label>问题总数</label></td>
                    </tr>
                    <tr>
                        <td class="data-tb-row">DW层</td>
                    	<td class="data-tb-row"><span>20</span>个</td>
                        <td class="data-tb-row"><span>664</span>条</td>
                        <td class="data-tb-row"><span>130</span>个</td>
                    </tr>
                    <tr>
                        <td>基础层</td>
                    	<td><span>19</span>个</td>
                        <td><span>1931</span>条</td>
                        <td><span>64</span>个</td>
                    </tr>
                </table>
                <div class="data-list fl">
                	<span>当日数据质量核查结果</span>
                    <ul>
                    	<li class="list-style2"><label>及时率：</label><span style="color:#ff0066"><b>55</b>%</span></li>
                        <li class="list-style2"><label>完整率：</label><span style="color:#00ff66"><b>75</b>%</span></li>
                        <li class="list-style2"><label>准确率：</label><span style="color:#00ff66"><b>69</b>%</span></li>
                    </ul>
                </div>
                <div class="data-chart-box fr" style="width:340px; height:182px; margin-top:20px;">
                	<h4>问题数分布情况</h4>
                	<div id="radarchart3" style="height:110px; margin:5px 0 0 0"></div>
                </div>
                <div class="clear"></div>
            </div>
        </div>
    </div>
    <!--------------------数据共享------------------------------------------------------->
    <div class="data-box fl" style="width:580px; margin-left:83px;">
    	<div class="data-box-title">数据共享</div>
        <div class="data-cont">
        	<div class="data-cont-box2">
            	<h3>实时数据共享服务</h3>
                <table class="data-indicator" cellpadding="0" cellspacing="0" border="0" width="100%">
                	<tr>
                    	<td><label>发布服务总数</label><span>203</span>个</td>
                        <td><label>核查规则数</label><span>664</span>条</td>
                        <td><label>问题总数</label><span>1306</span>个</td>
                    </tr>
                </table>
                <div class="data-list">
                	<span>当日数据质量核查结果：</span>
                    <ul>
                    	<li class="list-style1 fl" style="width:50%"><label>及时率：</label><span style="color:#00ff66"><b>91</b>%</span></li>
                        <li class="list-style1 fl" style="width:50%"><label>完整率：</label><span style="color:#00ff66"><b>82</b>%</span></li>
                    </ul>
                    <div class="clear"></div>
                </div>
                <div class="data-chart-box">
                	<h4>问题数分布情况</h4>
                	<div id="pieandring1" style="height:125px; margin:5px 0 0 0"></div>
                </div>
            </div>
        	<div class="data-cont-box2" style="margin-top:10px;">
            	<h3>清单查询共享服务</h3>
                <table class="data-indicator" cellpadding="0" cellspacing="0" border="0" width="100%">
                	<tr>
                    	<td><label>发布服务总数</label><span>203</span>个</td>
                        <td><label>核查规则数</label><span>664</span>条</td>
                        <td><label>问题总数</label><span>1306</span>个</td>
                    </tr>
                </table>
                <div class="data-list">
                	<span>当日数据质量核查结果：</span>
                    <ul>
                    	<li class="list-style1 fl" style="width:50%"><label>及时率：</label><span style="color:#00ff66"><b>91</b>%</span></li>
                        <li class="list-style1 fl" style="width:50%"><label>完整率：</label><span style="color:#00ff66"><b>82</b>%</span></li>
                    </ul>
                    <div class="clear"></div>
                </div>
                <div class="data-chart-box">
                	<h4>问题数分布情况</h4>
                	<div id="pieandring2" style="height:125px; margin:5px 0 0 0"></div>
                </div>
            </div>
        	<div class="data-cont-box2" style="margin-top:10px;">
            	<h3>批量处理共享服务</h3>
                <table class="data-indicator" cellpadding="0" cellspacing="0" border="0" width="100%">
                	<tr>
                    	<td><label>发布服务总数</label><span>152</span>个</td>
                        <td><label>核查规则数</label><span>1800</span>条</td>
                        <td><label>问题总数</label><span>530</span>个</td>
                    </tr>
                </table>
                <div class="data-list">
                	<span>当日数据质量核查结果：</span>
                    <ul>
                    	<li class="list-style1 fl" style="width:50%"><label>及时率：</label><span style="color:#00ff66"><b>91</b>%</span></li>
                        <li class="list-style1 fl" style="width:50%"><label>完整率：</label><span style="color:#00ff66"><b>82</b>%</span></li>
                    </ul>
                    <div class="clear"></div>
                </div>
                <div class="data-chart-box">
                	<h4>问题数分布情况</h4>
                	<div id="pieandring3" style="height:125px; margin:5px 0 0 0"></div>
                </div>
            </div>
        </div>
    </div>
    <!--------------------数据应用------------------------------------------------------->
    <div class="data-box fr" style="width:170px;">
    	<div class="data-box-title" style="width:170px">数据应用</div>
        <div class="data-cont">
        	<div class="data-bubble" style="height:142px; margin:60px 0 0 3px">
            	<span style="left:50px; top:50px">实时业务<br/>质量保障</span>
            	<img src="images/bubble1.png"/>
            </div>
        	<div class="data-bubble" style="height:134px; margin:60px 0 0 18px">
            	<span style="left:50px; top:50px">客户溯源<br/>感知</span>
            	<img src="images/bubble2.png"/>
            </div>
        	<div class="data-bubble" style="height:142px; margin:60px 0 0 8px">
            	<span style="left:50px; top:40px">手机上网<br/>端到端<br/>感知分析</span>
            	<img src="images/bubble3.png"/>
            </div>
        	<div class="data-bubble" style="height:120px; margin:60px 0 0 4px">
            	<span style="left:60px; top:40px">CSFB<br/>专题</span>
            	<img src="images/bubble4.png"/>
            </div>
        	<div class="data-bubble" style="height:130px; margin:60px 0 0 18px">
            	<span style="left:55px; top:50px">LTE KPI<br/>分析</span>
            	<img src="images/bubble5.png"/>
            </div>
        </div>
    </div>
    <div class="clear"></div>
    <!--------------------箭头指向------------------------------------------------------->
    <div style="position:absolute; left:521px; top:99px; z-index:3;"><img src="images/line_l.gif"/></div>
    <div style="position:absolute; left:1184px; top:99px; z-index:3;"><img src="images/line_r.gif"/></div>
    <div style="position:absolute; right:175px; top:50%; z-index:3; margin:-38px 0 0 0"><img src="images/arrow.gif"/></div>
    <!--------------------流水窗口------------------------------------------------------->
    <div id="flowWinBtn" style="position:absolute; right:5px; bottom:0px; z-index:3;"><button class="data-button">流水窗口</button></div>
    <div id="flowWin" class="data-window" style="display:none;">
    	<h3 style="display: inline-block;">告警流水窗</h3>
        <i id="flowWinClose" class="fa fa-times" aria-hidden="true" style="position: absolute; right: 20px; top: 15px; cursor: pointer;"></i>
        <table id="flowTable" class="window-tb" cellpadding="0" cellspacing="0" border="0" width="100%">
        	<tr>
            	<th>告警标题</th>
                <th>告警级别</th>
                <th>发生时间</th>
            	<th>核查周期</th>
                <th>核查规则名称</th>
                <th>核查数据时间</th>
                <th>告警正文</th>
                <th>告警是否处理</th>
            	<th>告警处理时间</th>
                <th>核查类型</th>
                <th width="1%"></th>
            </tr>
        	<tr>
            	<td>采集异常超阀值</td>
                <td style="background-color:#ffa600">重要告警</td>
                <td>2016-08-24 13:30:00</td>
            	<td>小时</td>
                <td>ESB采集情况核查（小时）</td>
                <td>2016-08-24 13:30:00</td>
                <td> 核查字段:;数据源:f46c25272dc08e831e915714d2341810;...</td>
                <td>否</td>
            	<td></td>
                <td>数值核查</td>
                <td></td>
            </tr>
        	<tr class="window-td-row">
            	<td>采集异常超阀值</td>
                <td style="background-color:#ffa600">重要告警</td>
                <td>2016-08-24 13:30:00</td>
            	<td>小时</td>
                <td>ESB采集情况核查（小时）</td>
                <td>2016-08-24 13:30:00</td>
                <td> 核查字段:;数据源:f46c25272dc08e831e915714d2341810;...</td>
                <td>否</td>
            	<td></td>
                <td>数值核查</td>
                <td></td>
            </tr>
        	<tr>
            	<td>采集异常超阀值</td>
                <td style="background-color:#ffa600">重要告警</td>
                <td>2016-08-24 13:30:00</td>
            	<td>小时</td>
                <td>ESB采集情况核查（小时）</td>
                <td>2016-08-24 13:30:00</td>
                <td> 核查字段:;数据源:f46c25272dc08e831e915714d2341810;...</td>
                <td>否</td>
            	<td></td>
                <td>数值核查</td>
                <td></td>
            </tr>
        	<tr class="window-td-row">
            	<td>采集异常超阀值</td>
                <td style="background-color:#ffa600">重要告警</td>
                <td>2016-08-24 13:30:00</td>
            	<td>小时</td>
                <td>ESB采集情况核查（小时）</td>
                <td>2016-08-24 13:30:00</td>
                <td> 核查字段:;数据源:f46c25272dc08e831e915714d2341810;...</td>
                <td>否</td>
            	<td></td>
                <td>数值核查</td>
                <td></td>
            </tr>
        	<tr>
            	<td>采集异常超阀值</td>
                <td style="background-color:#ffa600">重要告警</td>
                <td>2016-08-24 13:30:00</td>
            	<td>小时</td>
                <td>ESB采集情况核查（小时）</td>
                <td>2016-08-24 13:30:00</td>
                <td> 核查字段:;数据源:f46c25272dc08e831e915714d2341810;...</td>
                <td>否</td>
            	<td></td>
                <td>数值核查</td>
                <td></td>
            </tr>
        	<tr class="window-td-row">
            	<td>采集异常超阀值</td>
                <td style="background-color:#ffa600">重要告警</td>
                <td>2016-08-24 13:30:00</td>
            	<td>小时</td>
                <td>ESB采集情况核查（小时）</td>
                <td>2016-08-24 13:30:00</td>
                <td> 核查字段:;数据源:f46c25272dc08e831e915714d2341810;...</td>
                <td>否</td>
            	<td></td>
                <td>数值核查</td>
                <td></td>
            </tr>
        	<tr>
            	<td>采集异常超阀值</td>
                <td style="background-color:#ffa600">重要告警</td>
                <td>2016-08-24 13:30:00</td>
            	<td>小时</td>
                <td>ESB采集情况核查（小时）</td>
                <td>2016-08-24 13:30:00</td>
                <td> 核查字段:;数据源:f46c25272dc08e831e915714d2341810;...</td>
                <td>否</td>
            	<td></td>
                <td>数值核查</td>
                <td></td>
            </tr>
        	<tr class="window-td-row">
            	<td>采集异常超阀值</td>
                <td style="background-color:#ffa600">重要告警</td>
                <td>2016-08-24 13:30:00</td>
            	<td>小时</td>
                <td>ESB采集情况核查（小时）</td>
                <td>2016-08-24 13:30:00</td>
                <td> 核查字段:;数据源:f46c25272dc08e831e915714d2341810;...</td>
                <td>否</td>
            	<td></td>
                <td>数值核查</td>
                <td></td>
            </tr>
        	<tr>
            	<td>采集异常超阀值</td>
                <td style="background-color:#ffa600">重要告警</td>
                <td>2016-08-24 13:30:00</td>
            	<td>小时</td>
                <td>ESB采集情况核查（小时）</td>
                <td>2016-08-24 13:30:00</td>
                <td> 核查字段:;数据源:f46c25272dc08e831e915714d2341810;...</td>
                <td>否</td>
            	<td></td>
                <td>数值核查</td>
                <td></td>
            </tr>
        </table>
    </div>
</body>
<%@ include file="/pages/local-lsm/common/screenbaseinclude.jsp"%>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/mobiledata/mobiledata1.js"></script>
<script type="text/javascript">
var MOBILEDATA1;
$(document).ready(function(){
	MOBILEDATA1=new MobileDataScreen.ScreenController();
});
</script>

</html>