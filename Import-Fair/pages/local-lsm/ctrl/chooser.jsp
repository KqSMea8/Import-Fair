<!DOCTYPE html>
<html lang="zh-CN" >
<head>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%
String pageParam = request.getParameter("page");
 %>
<meta charset="UTF-8" http-equiv="X-UA-Compatible" content="IE=Edge">
<title>上海移动重要区域保障</title>
<%@ include file="/common/lib.jsp"%>
<script>
	var CTX="${ctx}";
	var PAGE="<%=pageParam%>";
</script>
<link rel="stylesheet" href="${ctx}/pages/local-lsm/ctrl/assets/bootstrap.min.css"/>
<link rel="stylesheet" href="${ctx}/pages/local-lsm/ctrl/assets/jqgrid/ui.jqgrid.css"/>
<link rel="stylesheet" href="${ctx}/pages/local-lsm/ctrl/assets/jqgrid/jquery-ui.css"/>
<link rel="stylesheet" href="${ctx}/pages/local-lsm/ctrl/assets/malihu-custom-scrollbar-plugin-master/jquery.mCustomScrollbar.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/common/custom.css"/>

<LINK rel=stylesheet type=text/css href="${ctx}/pages/local-lsm/ctrl/assets/sys.css" />
</head>
<body style="overflow-y:hidden;" >
<div id="container" >
	<iframe id="iframe" src="" frameborder="0" style="width:6400px;height:1200px;background:transparent;" ></iframe>
	<div id="list" class="mCustomScrollbar" data-mcs-theme="rounded" stat="hidden"> 
		<ul id="listul" class="listul">
			<li  class="listItem" itemIndex="17">
				<img index="17"  name="质量评估" frameWidth="100%" frameHeight="100%" url="${ctx}/pages/local-lsm/kpiview/MOAPart.jsp" class="drillItem itemImg" src="${ctx}/pages/local-lsm/ctrl/assets/images/r4d10.png"></img>
				<span class="itemName" style="font-size:20px;">质量评估</span>
				<div style="clear:both;"></div>
			</li>
			<li  class="listItem" itemIndex="15">
				<img index="15"  name="MWC保障" frameWidth="6400" frameHeight="1200" url="${ctx}/pages/local-lsm/ciie/ciie.jsp" class="drillItem itemImg" src="${ctx}/pages/local-lsm/ctrl/assets/images/matrix.png"></img>
				<span class="itemName" style="font-size:20px;">MWC保障</span>
				<div style="clear:both;"></div>
			</li>
			<li  class="listItem" itemIndex="16">
				<img index="16"  name="MWC专线保障" frameWidth="6400" frameHeight="1200" url="${ctx}/pages/local-lsm/groupcustomer/groupcustomer.jsp" class="drillItem itemImg" src="${ctx}/pages/local-lsm/ctrl/assets/images/gc_line.png"></img>
				<span class="itemName" style="font-size:20px;">MWC专线保障</span>
				<div style="clear:both;"></div>
			</li>
			<li style="border-top:none;" itemIndex="3" class="listItem listSelected">
				<img index="3"  name="场景保障(本地)" url="${ctx}/pages/local-lsm/areaMonitorScreen.jsp" class="drillItem itemImg" src="${ctx}/pages/local-lsm/ctrl/assets/images/scene.png"></img>
				<span class="itemName" style="font-size:22px;">场景保障(本地)</span>
				<img index="3001" name="场景保障PC版" title="场景保障PC版" url="${ctx}/pages/local-lsm/areamonitor/areaMonitor1.jsp" frameWidth="1600" frameHeight="1240" src="${ctx}/pages/local-lsm/ctrl/assets/images/PC.png" class="drillItem subIcon pcIcon"></img>
				<div style="clear:both;"></div>
			</li>
			<li  class="listItem" itemIndex="14">
				<img index="14" name="全网总览" frameWidth="100%" frameHeight="100%" url="../kpiview/menuEnter.jsp" class="drillItem itemImg" src="${ctx}/pages/local-lsm/ctrl/assets/images/overview.png"></img>
				<span class="itemName" style="font-size:22px;">全网总览</span>
				<div style="clear:both;"></div>
			</li>
			<li class="listItem" itemIndex="12" >
				<img index="12" name="场景保障(总部)" frameWidth="4800" frameHeight="1240" url="${ctx}/pages/local-lsm/ctrl/custom2.jsp"  class="drillItem itemImg" src="${ctx}/pages/local-lsm/ctrl/assets/images/scene.png"></img>
				<span class="itemName" style="font-size:22px;">场景保障(总部)</span>
				<div style="clear:both;"></div>
			</li>
			<li  class="listItem" itemIndex="11">
				<img index="11" name="自定义组合(总部)" frameWidth="5300" frameHeight="1240" url="${ctx}/pages/local-lsm/ctrl/custom.jsp" class="drillItem itemImg" src="${ctx}/pages/local-lsm/ctrl/assets/images/custom.png"></img>
				<span class="itemName" style="font-size:20px;">自定义组合(总部)</span>
				<div style="clear:both;"></div>
			</li>
			
			<li  class="listItem" itemIndex="2">
				<img index="2" name="业务保障" url="${ctx}/pages/local-lsm/shvideoe2e/videoScreen.jsp" frameWidth="2100" frameHeight="1200" class="drillItem itemImg" src="${ctx}/pages/local-lsm/ctrl/assets/images/video.png"></img>
				<span class="itemName">业务保障</span>
				<div style="clear:both;"></div>
			</li>
			<li class="listItem" itemIndex="7">
				<img index="7" name="短彩信节假日保障" frameWidth="1600" frameHeight="1240" url="http://10.221.18.38:28080/subject_rest_service/eve/spring.html" class="drillItem itemImg" src="${ctx}/pages/local-lsm/ctrl/assets/images/sms_holiday.png"></img>
				<span class="itemName" style="font-size:18px;">短彩信节假日保障</span>
				<div style="clear:both;"></div>
			</li>
			<li  class="listItem" itemIndex="13">
				<img index="13" name="行业网关拓扑监控" name="行业网关拓扑监控" frameWidth="2100" frameHeight="1240" url="http://10.221.18.38:28080/subject_rest_service/eve/hyTopoMain.html?token=f44c493daf75554ce0126ea66e6971cd" class="drillItem itemImg" src="${ctx}/pages/local-lsm/ctrl/assets/images/cmnet_topo.png"></img>
				<span class="itemName" style="font-size:18px;">行业网关拓扑监控</span>
				<div style="clear:both;"></div>
			</li>
			<li  class="listItem" itemIndex="9">
				<img index="9" name="CMNET拓扑监控" frameWidth="2100" frameHeight="1240" url="http://10.221.18.38:28080/subject_rest_service/eve/cmnetTopo.html" class="drillItem itemImg" src="${ctx}/pages/local-lsm/ctrl/assets/images/cmnet_topo.png"></img>
				<span class="itemName" style="font-size:20px;">CMNET拓扑监控</span>
				<div style="clear:both;"></div>
			</li>
			<li class="listItem" itemIndex="1">
				<img index="1" name="LTE端到端" url="http://10.221.247.7:58080/inas_gis/P2PFix.html" frameWidth="2200" frameHeight="1240" class="drillItem itemImg" src="${ctx}/pages/local-lsm/ctrl/assets/images/lte.png"></img>
				<span class="itemName">LTE端到端</span>
				<div style="clear:both;"></div>
			</li>
			<li  class="listItem" itemIndex="4">
				<img index="4" name="地铁" url="${ctx}/pages/local-lsm/metro/metronewscreen.jsp" class="drillItem itemImg" src="${ctx}/pages/local-lsm/ctrl/assets/images/metro.png"></img>
				<span class="itemName">地铁</span>
				<img index="4001"  name="地铁PC版" title="地铁PC版" url="${ctx}/pages/local-lsm/metroscreen.jsp" frameWidth="2100" frameHeight="1240" src="${ctx}/pages/local-lsm/ctrl/assets/images/PC.png" class="drillItem subIcon pcIcon"></img>
				<div style="clear:both;"></div>
			</li>
			<li  class="listItem" itemIndex="5">
				<img index="5"  name="节假日保障" frameWidth="2100" frameHeight="1240" url="http://10.221.247.7:58080/inas_gis/MainPage.html" class="drillItem itemImg" src="${ctx}/pages/local-lsm/ctrl/assets/images/matrix.png"></img>
				<span class="itemName" style="font-size:20px;">节假日保障</span>
				<div style="clear:both;"></div>
			</li>
			<li  class="listItem" itemIndex="6">
				<img index="6" name="迪士尼" url="${ctx}/pages/local-lsm/disneyscreen.jsp" class="drillItem itemImg" src="${ctx}/pages/local-lsm/ctrl/assets/images/disney.png"></img>
				<span class="itemName">迪士尼</span>
				<img index="6001" title="迪士尼PC版" url="${ctx}/pages/local-lsm/disney1.jsp" frameWidth="1600" frameHeight="1240" src="${ctx}/pages/local-lsm/ctrl/assets/images/PC.png" class="drillItem subIcon pcIcon"></img>
				<div style="clear:both;"></div>
			</li>
			
			
			<li  class="listItem" itemIndex="8">
				<img index="8" name="集客重保专线" frameWidth="2100" frameHeight="1240" url="http://10.221.213.86:8080/shjk/shjkImportantProtection.html" class="drillItem itemImg" src="${ctx}/pages/local-lsm/ctrl/assets/images/gc_line.png"></img>
				<span class="itemName" style="font-size:20px;">集客重保专线</span>
				<div style="clear:both;"></div>
			</li>
			
			<li  class="listItem" itemIndex="10">
				<img index="10" name="重点业务监测(BI工具)" frameWidth="2100" frameHeight="1240" url="http://10.221.247.52:8080/bi/Viewer?proc=1&action=viewer&hback=true&db=chenlei!2f!!6625!!8282!!4e1a!!52a1!!76d1!!6d4b!.db" class="drillItem itemImg" src="${ctx}/pages/local-lsm/ctrl/assets/images/focus_bus.png"></img>
				<span class="itemName" style="font-size:16px;">重点业务监测(BI工具)</span>
				<div style="clear:both;"></div>
			</li>
			
			
			
		</ul>
		<img id="showLog" title="查看日志" style="width:20px;height:20px;position:absolute;right:5px;bottom:5px;cursor:pointer;" src="${ctx}/pages/local-lsm/ctrl/assets/images/sys0.png"></img>
	</div>
</div>
<div class="wxapp-modal" id="wxapp-modal">
    <div class="content">
        <div class="header" style="width: 1200px;text-align:left;line-height:30px;">
           	<span class="titleLabel">开始时间:</span><input id="startTime" class="selectedTimeLabel" onclick="WdatePicker({dateFmt : 'yyyy-MM-dd HH:mm:ss'})"></input>
            <span class="titleLabel">结束时间:</span><input id="endTime" class="selectedTimeLabel" onclick="WdatePicker({dateFmt : 'yyyy-MM-dd HH:mm:ss'})"></input>
            <button type="button" class="btn btn-primary inputButton" onclick="updateLogList();">查询</button>  
            <span class="cancel-con" onclick="$('#wxapp-modal').hide();">x</span>
        </div>
        <div id="wxapp-modal-body" class="body"  style="width: 1200px;">
            <div id="gridParent" style="text-align:left;padding:5px;">
            	<table id="logGrid" style="width:100%" ></table>
            	<div id="logGridPager"></div>
            	<div id="logExport" class="icon_exportPic" style="background: url(assets/images/exportPic.png) center 0px no-repeat;position:absolute;right:10px;bottom:10px;" ></div>
            </div>
        </div>
    </div>
    <div class="mask" bindtap="closeModal"></div>
</div>

</body>

<script type="text/javascript" src="${ctx}/pages/local-lsm/ctrl/assets/malihu-custom-scrollbar-plugin-master/jquery.mCustomScrollbar.concat.min.js"></script>
<script type="text/javascript" src="${ctx}/pages/local-lsm/ctrl/assets/jqgrid/grid.locale-cn.js"></script>
<script type="text/javascript" src="${ctx}/pages/local-lsm/ctrl/assets/jqgrid/jquery.jqGrid.min.js"></script>
<script type="text/javascript" src="${jslib}/My97DatePicker/WdatePicker.js"></script>
<link rel="stylesheet" href="${jslib}/My97DatePicker/skin/My97DatePicker/WdatePicker.css" />

<SCRIPT type=text/javascript src="${ctx}/pages/local-lsm/ctrl/assets/common.js"></SCRIPT>
<SCRIPT type=text/javascript src="${ctx}/scripts/local-lsm/common/ToExcelOrCSV.js"></SCRIPT>
<SCRIPT type=text/javascript src="${ctx}/pages/local-lsm/ctrl/assets/chooser.js"></SCRIPT>
<script>

</script>

</html>