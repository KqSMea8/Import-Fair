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
    <title>流向分析钻取</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link rel="stylesheet" href="styleFlowAnalysisDrill.css" />
	<%@ include file="/common/lib.jsp"%>
	<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/My97DatePicker/WdatePicker.js"></script>
<link rel="stylesheet" href="${ctx}/static/jslib/My97DatePicker/skin/My97DatePicker/WdatePicker.css" />
	<%@ include file="/common/bootstrap.jsp"%> 
	<%@ include file="/common/echarts.jsp"%>
</head>

<body>
    <div class="itp">
	    <div class="itp_title">
	    	<div id="pageTitle" class="ititle">--</div><span id="pageTime" class="itp_time">--</span>
	    	<div id="pageClose" class="closeBtn"><img src="images/close.png" style="width:80px;height:80px;"/></div>
	    	<div style="position:absolute;top:0px;left:200px;color:white;font-weight:bold;">
               		<div class="day_txt">小时</div>
                   <div class="btn_day" style="cursor:pointer;">
                   <img id="btn_period" style="height:36px;" name="realtime" src="${ctx}/static/styles/local-lsm/common/images/realtime.png" /></div>
                   <div class="realtime_txt">实时</div>
              </div>
	    </div>
    	<div class="itp_down">
	    	<!--left-->
	    	<div>
	    		<div class="gridTitle" style="display:inline-block;width:710px;">业务流量占比</div>
	    		<div class="gridTitle" style="display:inline-block;">业务流量省网率</div>
	    	</div>
	        <div id="ringChartParent" class="id_left" style="padding:20px;">
	        	<div id="ringChart" style="width:100%;height:100%;"></div>
	        </div>
	     	<!--right-->
	        <div class="id_right" style="position:relative;">
	             <div id="lineChartParent" class="ir_content" >
	             	<div id="lineChart" style="position:absolute;padding:20px 20px 20px 20px;width:100%;height:100%;">
	        		
	        		</div>
	             </div>
	        </div>
	     	<!--------->   
	     </div>
	    
	     <div class="itp_down">
	     	<div id="title0" class="gridTitle">业务流量流向</div>
	        <div class="ir_content" style="width:100%;" >
             	<div id="gridParent0" style="position:absolute;padding:20px 20px 20px 20px;width:100%;height:100%;">
        		
        		</div>
             </div>
             <img id="exportTab0" title="导出" src="images/b2.png" style="position:absolute;right:30px;top:15px;cursor:pointer;"/>
	     </div>
	     <div class="itp_down">
	     	<div id="title1" class="gridTitle">IP归属</div>
	        <div class="ir_content" style="width:100%;" >
             	<div id="gridParent1" style="position:absolute;padding:20px 20px 20px 20px;width:100%;height:100%;">
        		
        		</div>
             </div>
             <img id="exportTab1" title="导出" src="images/b2.png" style="position:absolute;right:30px;top:15px;cursor:pointer;"/>
	     </div>
	     <div class="itp_down">
	     	<div id="title2" class="gridTitle">流向IP地址分析</div>
	        <div class="ir_content" style="width:100%;" >
             	<div id="gridParent2" style="position:absolute;padding:20px 20px 20px 20px;width:100%;height:100%;">
        		
        		</div>
             </div>
             <img id="exportTab2" title="导出" src="images/b2.png" style="position:absolute;right:30px;top:15px;cursor:pointer;"/>
	     </div>
	     
    	<div class="itp_bottom"></div>     
    </div>	
    
    <%@ include file="/pages/local-lsm/common/screenbaseinclude.jsp"%>
    <link rel="stylesheet" href="${ctx}/static/styles/local-lsm/common/custom.css" />
    <link rel="stylesheet" href="baseCss.css" />
    <script type="text/javascript" src="${ctx}/scripts/local-lsm/common/dragger.js"></script>
    <script type="text/javascript" src="${ctx}/scripts/local-lsm/shvideoe2e/flowAnalysisDrill.js"></script>
    <script type="text/javascript">
    	var BASEPATH="${ctx}";
    	var minor="<%=minor%>";
    	var majorName="<%=majorName%>";
    	
    	var drillpage=new SHVIDEOSCREEN.FlowAnalysisDrllPage(majorName,minor);
    	
    	function gridLv0Clicked(param,total){
    		drillpage.updateGridLv1(param,total);
    	}
    	function gridLv1Clicked(param,total){
    		drillpage.updateGridLv2(param,total);
    	}
    </script>
</body>
</html>
