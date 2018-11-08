<!DOCTYPE html>
<html lang="zh-CN">
<head>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<meta charset="UTF-8" http-equiv="X-UA-Compatible" content="IE=Edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>视屏端到端保障大屏</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link rel="stylesheet" href="style.css" />
	<%@ include file="/common/lib.jsp"%>
	<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/My97DatePicker/WdatePicker.js"></script>
<link rel="stylesheet" href="${ctx}/static/jslib/My97DatePicker/skin/My97DatePicker/WdatePicker.css" />
	<%@ include file="/common/bootstrap.jsp"%> 
	<%@ include file="/common/echarts.jsp"%>
</head>

<body>
    <div class="EAE">
    <!--s-->
    	<div class="eae_title"><span id="titleTime" class="eae_time">10:00-10:05<span></div>
        <!---2-->
        <div class="eae_fv">
        	<div name="0" class="fv fv_mr">
                <div class="fv_icon">
                    <i id="titleIcon1" class="icon icon-i1"></i> 
                    <span class="titleKpiName" id="kpiName1">用户数</span>
                 </div>   
                 <div class="fv_value">
                    <h1 id="kpiValue1">--&nbsp;</h1>
                    <span id="kpiUnit1">万人</span>
                 </div>
            </div>
            
            <div name="1" class="fv fv_mr">
                <div class="fv_icon">
                    <i id="titleIcon2" class="icon icon-i2"></i> 
                    <span class="titleKpiName" id="kpiName2">流量</span>
                 </div>   
                 <div class="fv_value">
                    <h1 id="kpiValue2">--&nbsp;</h1>
                    <span id="kpiUnit2">GB</span>
                 </div>
            </div>
            
            <div name="2" class="fv fv_mr">
                <div class="fv_icon">
                    <i id="titleIcon3" class="icon icon-i3"></i> 
                    <span class="titleKpiName" id="kpiName3">下载速率</span>
                 </div>   
                 <div class="fv_value">
                    <h1 id="kpiValue3">--&nbsp;</h1>
                    <span id="kpiUnit3">Kbps</span>
                 </div>
            </div>
            
            <div name="3" class="fv fv_mr">
                <div class="fv_icon">
                    <i id="titleIcon4" class="icon icon-i4"></i> 
                    <span class="titleKpiName" id="kpiName4">本省率</span>
                 </div>   
                 <div class="fv_value">
                    <h1 id="kpiValue4">--&nbsp;</h1>
                    <span id="kpiUnit4">%</span>
                 </div>
            </div>            
            
            <div name="4" class="fv">
                <div class="fv_icon">
                    <i id="titleIcon5" class="icon icon-i5"></i> 
                    <span class="titleKpiName" id="kpiName5">本网率</span>
                 </div>   
                 <div class="fv_value">
                    <h1 id="kpiValue5">--&nbsp;</h1>
                    <span id="kpiUnit5">%</span>
                 </div>
            </div>         
            
            <div id="majorConfig" title="业务大类" style="position:absolute;top:45px;right:95px;cursor:pointer;"></div>
         	<img name="titleKc" class="kpiConfig" title="指标配置" src="images/config.png" style="position:absolute;top:50px;right:45px;cursor:pointer;"/>
            <img src="images/allbus_percent.png" title="地图" onclick='openMap();' style="cursor:pointer;position:absolute;top:45px;right:0px;cursor:pointer;"/>
                 	
        </div>
        <!---3-->
        <div class="eae_trendline">
            <div class="tl t1_mr">
                <div class="tl_title">
                  <div class="tl_font" id="chartTitle0">用户数</div>
                  <div class="tl_b1"><img class="chartbtn" name="0" title="刷新" func="refresh" src="images/b1.png" /></div>
                  <div class="tl_b2"><img class="chartbtn" name="0" title="切换指标" func="kpichange" src="images/config.png" /></div>
                  <div class="tl_b3"><img class="chartbtn" name="0" title="选择时间" func="timechange" src="images/time.png" /></div>
                </div>
                <div id="chartParent0" index="0" class="tl_content chartParent"><div id="chartContent0" class="chartDiv"></div></div>
            </div>
            
            <div class="tl t1_mr">
                <div class="tl_title">
                  <div class="tl_font" id="chartTitle1">流量</div>
                  <div class="tl_b1"><img class="chartbtn" name="1" title="刷新" func="refresh" src="images/b1.png" /></div>
                  <div class="tl_b2"><img class="chartbtn" name="1" title="切换指标" func="kpichange" src="images/config.png" /></div>
                  <div class="tl_b3"><img class="chartbtn" name="1" title="选择时间" func="timechange" src="images/time.png" /></div>
                </div>
                <div id="chartParent1" index="1" class="tl_content chartParent"><div id="chartContent1" class="chartDiv"></div></div>
            </div>
            
            <div class="tl">
                <div class="tl_title">
                  <div class="tl_font" id="chartTitle2">下载速率</div>
                  <div class="tl_b1"><img class="chartbtn" name="2" title="刷新" func="refresh" src="images/b1.png" /></div>
                  <div class="tl_b2"><img class="chartbtn" name="2" title="切换指标" func="kpichange" src="images/config.png" /></div>
                  <div class="tl_b3"><img class="chartbtn" name="2" title="选择时间" func="timechange" src="images/time.png" /></div>
                </div>
                <div id="chartParent2" index="2" class="tl_content chartParent"><div id="chartContent2" class="chartDiv"></div></div>
            </div>
                
        </div>
        <!---4-->
        <!--left table-->
        <div class="eae_tb"> 
            <div class="tb_left tb_mr" style="position:relative;">
            	<div id="focusMajorTab" class="tb_nav"></div>
                <div id="leftgrid" class="tb_content" style="padding:20px 20px 20px 20px;">
                </div>
                <img name="focusMajor" title="关注业务配置" id="focusMajorConfig" src="images/major_config.png" style="position:absolute;top:25px;right:0px;cursor:pointer;"/>
            	<img id="appColConfig" title="列配置" name="majorKc" class="kpiConfig" src="images/config.png" style="position:absolute;top:25px;right:35px;cursor:pointer;"/>
            	<img id="appExcel" title="导出" src="images/b2.png" style="position:absolute;top:25px;right:70px;cursor:pointer;"/>
            
            </div>
            <!--right table-->
             <!--right map-->
            <div class="tb_right" style="position:relative;">
                <div class="tb_nav">
                	<div class="nav nav_mr rightmr"><img name="SP流向" class="rightTabIcon rightTabIconSelected" src="images/ts_sp.png" /></div>
                    <div class="nav nav_mr rightmr"><img name="属地分布" class="rightTabIcon" src="images/t_sd.png" /></div>
                </div>
                <div  id="mapdistribute"  class="tb_map" style="position:relative;display:none;">
                	<div class="map">
                		<img src="images/map.png" />
                		<div id="mapKpiFrame" style="position:absolute;top:0px;left:0px;width:100%;height:100%;">
                			<div name="嘉定" class="mapKpiDiv"></div>
                			<div name="宝山" class="mapKpiDiv"></div>
                			<div name="青浦" class="mapKpiDiv"></div>
                			<div name="松江" class="mapKpiDiv"></div>
                			<div name="金山" class="mapKpiDiv"></div>
                			<div name="奉贤" class="mapKpiDiv"></div>
                			<div name="浦东" class="mapKpiDiv"></div>
                			<div name="崇明" class="mapKpiDiv"></div>
                			<div name="闵行" class="mapKpiDiv"></div>
                			<div name="北区" class="mapKpiDiv"></div>
                			<div name="西区" class="mapKpiDiv"></div>
                			<div name="南区" class="mapKpiDiv"></div>
                		</div>
                		<div id="mapUnit" style="position:absolute;top:25px;left:25px;color:white;font-size:20px;font-weight:bold;"></div>
                	</div>
                    <div class="tb_list" style="position:relative;">
                    	<div id="tb_list" style="position:absolute;top:0px;"></div>
                    </div>
                    <img name="up" class="kpiArrow" src="images/T.png" style="position:absolute;top:5px;right:160px;cursor:pointer;"/>
                   	<img name="down" class="kpiArrow" src="images/D.png" style="position:absolute;bottom:10px;right:160px;cursor:pointer;"/>
                </div>
                <div  id="rightgridParent"  class="tb_content" style="display:block;padding:20px 20px 20px 20px;">
                	<table id="rightgrid" style="width:100%;height:100%;"></table>
                </div>
                <div style="position:absolute;top:0px;right:70px;color:white;font-weight:bold;">
                	<div style="display:none;margin-right:20px;" id="hour_time_txt" class="hour_time_txt">--</div>
                	<div class="day_txt">小时</div>
                    <div class="btn_day" style="cursor:pointer;">
                    <img id="btn_period" name="realtime" src="${ctx}/static/styles/local-lsm/common/images/realtime.png" /></div>
                    <div class="realtime_txt">实时</div>
                </div>
                <img name="spDirKc" title="列配置" class="kpiConfig" src="images/config.png" style="position:absolute;top:25px;right:0px;cursor:pointer;"/>
            	<img id="spdirExcel" title="导出" src="images/b2.png" style="position:absolute;top:25px;right:35px;cursor:pointer;"/>
            
            </div>
        </div>
        <!--bottom-->
        <div class="eae_bottom"></div>

    <!--e-->
    </div>
    
    <%@ include file="/pages/local-lsm/common/screenbaseinclude.jsp"%>
    <link rel="stylesheet" href="${ctx}/static/styles/local-lsm/common/custom.css" />
    <link rel="stylesheet" href="baseCss.css" />
    <script type="text/javascript" src="${ctx}/scripts/local-lsm/common/dragger.js"></script>
    <script type="text/javascript" src="${ctx}/scripts/local-lsm/shvideoe2e/shvideoe2e.js"></script>
    <script type="text/javascript">
    	var BASEPATH="${ctx}";
    	var videoscreen=new SHVIDEOSCREEN.ScreenController();
    	window.onkeypress=parent.window.onkeypress;//选择页面快捷键
    	function closeDrillApp(){
    		if(videoscreen) videoscreen.closeDrillApp();
    	}
    	function openMap(){
    		var url=LSMConsts.IPPORT+"/sh/shUltimate/commonGuard.html?isVideo=true";
    		window.open("videoMap.jsp?url="+encodeURIComponent(url), "_blank");
    	}
    </script>
</body>
</html>
