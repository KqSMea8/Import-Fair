<!DOCTYPE html>
<html lang="zh-CN">
<head>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%
//String minor = request.getParameter("minor")==null?"":new String(request.getParameter("minor").getBytes("ISO8859-1"), "utf-8");
String minor = request.getParameter("minor");
String majorName = request.getParameter("majorName");
%>
<meta charset="UTF-8" http-equiv="X-UA-Compatible" content="IE=Edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>视屏端到端保障大屏钻取</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link rel="stylesheet" href="styleZcDrill.css" />
	<%@ include file="/common/lib.jsp"%>
	<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/My97DatePicker/WdatePicker.js"></script>
<link rel="stylesheet" href="${ctx}/static/jslib/My97DatePicker/skin/My97DatePicker/WdatePicker.css" />
	<%@ include file="/common/bootstrap.jsp"%> 
	<%@ include file="/common/echarts.jsp"%>
</head>

<body>
    <div class="itp">
    <!--s-->
    <div class="itp_title">
    	<div id="pageTitle" class="ititle">优酷网</div><span id="pageTime" class="itp_time">--</span>
    	<div id="pageClose" class="closeBtn"><img src="images/close.png"  style="width:80px;height:80px;"/></div>
    </div>
    <!--2-->
    <div class="itp_centre">
    	<div class="tmb">
       	<div class="chartContent">
        	<div id="chartContent0" style="position:relative;width:100%;height:100%;"></div>
        </div>
         	<div class="tl_title">
          <div class="tl_font" id="chartTitle0">TCP成功率<span>（%）</span></div>
          <div class="tl_b1"><img class="chartbtn" title="刷新" name="0" func="refresh" src="images/b1.png" /></div>
          <div class="tl_b2"><img class="chartbtn" title="切换指标" name="0" func="kpichange" src="images/config.png" /></div>
          <div class="tl_b3"><img class="chartbtn" title="选择时间" name="0" func="timechange" src="images/time.png" /></div>
        </div>
       </div>
    </div>
    <!--3-->
     <div class="itp_down">
        <div class="id_right" style="position:relative;width:100%;">
       		<div class="ir_nav">
                <div class="nav nav_mr"><img type="SGW" class="gridTabIcon gridTabIconSelected" src="images/ts_sgw.png" /></div>
                <div class="nav nav_mr"><img type="SP-IP" class="gridTabIcon" src="images/t_spip.png" /></div>
                <div class="nav nav_mr"><img type="HOST" class="gridTabIcon" src="images/t_host.png" /></div>
<!--                 <div class="nav nav_mr"><img type="终端" class="gridTabIcon" src="images/t_zd.png" /></div> -->
<!--                 <div class="nav nav_mr"><img type="小区" class="gridTabIcon" src="images/t_xq.png" /></div> -->
             </div>
             <div class="ir_content" >
             	<div id="tabGridParent" style="position:absolute;padding:20px 20px 20px 20px;width:100%;height:100%;">
        		
        		</div>
             </div>
             <div style="position:absolute;top:0px;right:80px;color:white;font-weight:bold;">
               	<div style="display:none;" id="hour_time_txt" class="hour_time_txt">时间:</div>
               	<div class="day_txt">小时</div>
                   <div class="btn_day" style="cursor:pointer;">
                   <img id="btn_period" name="realtime" style="height:36px;" src="${ctx}/static/styles/local-lsm/common/images/realtime.png" /></div>
                   <div class="realtime_txt">实时</div>
              </div>
             <img id="exportTab" title="导出" src="images/b2.png" style="position:absolute;right:30px;top:0px;cursor:pointer;"/>
        </div>
     </div>
     <div class="itp_bottom"></div>     
    </div>	
    <!--e-->
    </div>
    
    <%@ include file="/pages/local-lsm/common/screenbaseinclude.jsp"%>
    <link rel="stylesheet" href="${ctx}/static/styles/local-lsm/common/custom.css" />
    <link rel="stylesheet" href="baseCss.css" />
    <script type="text/javascript" src="${ctx}/scripts/local-lsm/common/dragger.js"></script>
    <script type="text/javascript" src="${ctx}/scripts/local-lsm/shvideoe2e/zcDrill.js"></script>
    <script type="text/javascript">
    	var BASEPATH="${ctx}";
    	var minor="<%=minor%>";
    	var majorName="<%=majorName%>";
    	var drillpage=new SHVIDEOSCREEN.ZcDrillPage(majorName,minor);
    </script>
</body>
</html>
