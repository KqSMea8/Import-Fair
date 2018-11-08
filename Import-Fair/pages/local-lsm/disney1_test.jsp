<!DOCTYPE html>
<html lang="zh-CN">
<head>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%
String isScreenMode = request.getParameter("isScreenMode");
%>
<meta charset="UTF-8" http-equiv="X-UA-Compatible" content="IE=Edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<%@ include file="/common/lib.jsp"%>
<c:set var="hotspot" value="disney" />
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/My97DatePicker/WdatePicker.js"></script>
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/${hotspot}/style.css" />
<link rel="stylesheet" href="${ctx}/static/jslib/My97DatePicker/skin/My97DatePicker/WdatePicker.css" />
<%@ include file="/common/bootstrap.jsp"%> 
<%@ include file="/common/echarts.jsp"%>
<title>迪士尼大屏</title>
</head>
<body> 
<div class="Disney_L">
    <!--LEFT 开始--->
    <div class="disney_left">
		<div class="DL1"></div>
        
        <div class="DL3">
            <div class="subtitle subtitle_txt2" ><img src="${ctx}/static/styles/local-lsm/${hotspot}/images/subtitle2.png" /><span class="qualityTime" id="qualityTime"></span></div>
            <div class="DL3_content">
                <div class="DL3_left">
                <div class="Lnorm2">
                	<div class="KPT_marginB">
                        <div class="indicators KPI KPT_marginR" onclick="kpiChangeHandler(0)">
                        	<div id="selectBg0" class="SelectBG1"></div>
                        	<div id="labelKpi0" class="KPI_top">
                             <h2 class="KPI_bluetxt">0&nbsp;<span>%</span></h2>
                            </div>
                            <div id="nameKpi0" class="KPI_down KPI_blue">HTTP下行速率</div>
                        </div>
                        <div class="indicators KPI KPT_marginR" onclick="kpiChangeHandler(1)">
                        	<div id="selectBg1" class="SelectBG1"></div>
                        	<div id="labelKpi1" class="KPI_top">
                             <h2 class="KPI_bluetxt">0&nbsp;<span>%</span></h2>
                            </div>
                            <div id="nameKpi1" class="KPI_down KPI_blue">HTTP成功率</div>                        
                        </div>
                        <div class="indicators KPI KPT_marginR" onclick="kpiChangeHandler(2)">
                        	<div id="selectBg2" class="SelectBG1"></div>
                        	<div id="labelKpi2" class="KPI_top">
                             <h2 class="KPI_bluetxt">0&nbsp;<span>%</span></h2>
                            </div>
                            <div id="nameKpi2" class="KPI_down KPI_blue">HTTP响应时延</div>                        
                        </div>
                        <div class="indicators KPI KPT_marginR" onclick="kpiChangeHandler(3)">
                        	<div id="selectBg3" class="SelectBG1"></div>
                        	<div id="labelKpi3" class="KPI_top">
                             <h2 class="KPI_bluetxt">0&nbsp;<span>%</span></h2>
                            </div>
                            <div id="nameKpi3" class="KPI_down KPI_blue">TCP成功率</div>                        
                        </div>
                        <div class="indicators KPI" onclick="kpiChangeHandler(4)">
                        	<div id="selectBg4" class="SelectBG1"></div>
                        	<div id="labelKpi4" class="KPI_top">
                             <h2 class="KPI_bluetxt">0&nbsp;<span>mbps</span></h2>
                            </div>
                            <div id="nameKpi4" class="KPI_down KPI_blue">TCP重传率</div>                        
                        </div>
                    </div>
                    <div class="KPT_marginB">
                        <div class="indicators KPI KPT_marginR" onclick="kpiChangeHandler(5)">
                        	<div id="selectBg5" class="SelectBG1"></div>
                        	<div id="labelKpi5" class="KPI_top">
                             <h2 class="KPI_bluetxt">0&nbsp;<span>%</span></h2>
                            </div>
                            <div id="nameKpi5" class="KPI_down KPI_blue">TCP时延</div>
                        
                        </div>
                        <div class="indicators KPI KPT_marginR" onclick="kpiChangeHandler(6)">
                        	<div id="selectBg6" class="SelectBG1"></div>
                        	<div id="labelKpi6" class="KPI_top">
                             <h2 class="KPI_bluetxt">0&nbsp;<span>%</span></h2>
                            </div>
                            <div id="nameKpi6" class="KPI_down KPI_blue">下行速率</div>                        
                        </div>
                        <div class="indicators KPI KPT_marginR" onclick="kpiChangeHandler(7)">
                        	<div id="selectBg7" class="SelectBG1"></div>
                        	<div id="labelKpi7" class="KPI_top">
                             <h2 class="KPI_bluetxt">0&nbsp;<span>%</span></h2>
                            </div>
                            <div id="nameKpi7" class="KPI_down  KPI_blue">用户数</div>                        
                        </div>
                        <div class="indicators KPI KPT_marginR" onclick="kpiChangeHandler(8)">
                        	<div id="selectBg8" class="SelectBG1"></div>
                        	<div id="labelKpi8" class="KPI_top">
                             <h2 class="KPI_bluetxt">0&nbsp;<span>%</span></h2>
                            </div>
                            <div id="nameKpi8" class="KPI_down KPI_blue">TCP下行乱序率</div>                        
                        </div>
                        <div class="indicators KPI" onclick="kpiChangeHandler(9)">
                        	<div id="selectBg9" class="SelectBG1"></div>
                        	<div id="labelKpi9" class="KPI_top">
                             <h2 class="KPI_bluetxt">0&nbsp;<span>mbps</span></h2>
                            </div> 
                            <div id="nameKpi9" class="KPI_down KPI_blue">流量</div>                        
                        </div>
                    </div>
                    
                    <div class="KPT_marginB">
                        <div class="indicators KPI KPT_marginR" onclick="kpiChangeHandler(10)">
                        	<div id="selectBg10" class="SelectBG1"></div>
                        	<div id="labelKpi10" class="KPI_top">
                             <h2 class="KPI_bluetxt">0&nbsp;<span>%</span></h2>
                            </div>
                            <div id="nameKpi10" class="KPI_down KPI_blue">TCP时延</div>
                        
                        </div>
                        <div class="indicators KPI KPT_marginR" onclick="kpiChangeHandler(11)">
                        	<div id="selectBg11" class="SelectBG1"></div>
                        	<div id="labelKpi11" class="KPI_top">
                             <h2 class="KPI_bluetxt">0&nbsp;<span>%</span></h2>
                            </div>
                            <div id="nameKpi11" class="KPI_down KPI_blue">下行速率</div>                        
                        </div>
                        <div class="indicators KPI KPT_marginR" onclick="kpiChangeHandler(12)">
                        	<div id="selectBg12" class="SelectBG1"></div>
                        	<div id="labelKpi12" class="KPI_top">
                             <h2 class="KPI_bluetxt">0&nbsp;<span>%</span></h2>
                            </div>
                            <div id="nameKpi12" class="KPI_down  KPI_blue">用户数</div>                        
                        </div>
                        <div class="indicators KPI KPT_marginR" onclick="kpiChangeHandler(13)">
                        	<div id="selectBg13" class="SelectBG1"></div>
                        	<div id="labelKpi13" class="KPI_top">
                             <h2 class="KPI_bluetxt">0&nbsp;<span>%</span></h2>
                            </div>
                            <div id="nameKpi13" class="KPI_down KPI_blue">TCP下行乱序率</div>                        
                        </div>
                        <div class="indicators KPI" onclick="kpiChangeHandler(14)">
                        	<div id="selectBg14" class="SelectBG1"></div>
                        	<div id="labelKpi14" class="KPI_top">
                             <h2 class="KPI_bluetxt">0&nbsp;<span>mbps</span></h2>
                            </div> 
                            <div id="nameKpi14" class="KPI_down KPI_blue">流量</div>                        
                        </div>
                    </div>
                </div>
                <div class="Lbtn">
                	<div class="KpiType">
                		<div class="KpiTypeBtnDiv"><div name="信令指标" class="kpiTypeRadio customRadio customRadioSelected"></div></div>
                		<div name="信令指标" class="KpiTypeTxt">信令指标</div>
                		<div class="KpiTypeBtnDiv"><div name="网管指标" class="kpiTypeRadio customRadio"></div></div>
                		<div name="网管指标" class="KpiTypeTxt">网管指标</div>
                	</div>
                    <div class="Lbtn_left">
                        <div class="day_txt">小时</div>
                        <div class="btn_day" style="cursor:pointer;"><img id="btn_period" name="realtime" src="${ctx}/static/styles/local-lsm/${hotspot}/images/realtime.png" /></div>
                        <div class="realtime_txt">实时</div>
                    </div>
                    <div id="kpiChooserBtn" class="Lbtn_right" style="cursor:pointer;"><img src="${ctx}/static/styles/local-lsm/${hotspot}/images/btn.png" /></div>
                </div>
                
                </div>
                <div class="DL3_right">
                    
                        <div id="kpiTitle" class="subject chart1_top">
                            <i class="icon icon-network"></i> 
                            <span id="compareTitle"></span>
                            <span id="compareTimeValue"></span>
                        </div>
  
                    <div id="compareChart" class="chart1">
                    
                    </div>
                    
                    </div>
            
            </div>
        </div>
        <div class="DL2">
        	<div class="subtitle subtitle_txt1" ><img src="${ctx}/static/styles/local-lsm/${hotspot}/images/subtitle1.png" /><span class="subtitleSpan">迪士尼</span><span class="leftTime">北京时间</span></div>
            <div class="DL2_content">
            <div class="Lnorm1" name="核心区域用户数">
            	<div class="caption">
                    <div class="subject">
                        <i class="icon icon-passenger"></i> 
                        <span>核心区域用户数</span>
                    </div>
                    <div id="labelCustomerTime" class="time">00:00</div>
                </div>
                <div class="data">
                    <div id="labelCustomerCount" class="exponent">
                    <h1>0&nbsp;<span>人</span></h1>
                    </div>
                    <div id="customerCompareChart" class="chart0"></div>
                </div>
                <table class="detailTable">
	        		<tr>
	        			<td><span class="kpiName" id="customerNowTime">当前:&nbsp;</span><span id="labelKpiValueNow1" class="kpiValue">--</span></td>
	        			<td><span class="kpiName">2G:&nbsp;</span><span id="labelKpiValue2G1" class="kpiValue">--</span></td>
	        			<td><span class="kpiName">园区内:&nbsp;</span><span id="labelKpiValueIn1" class="kpiValue">--</span></td>
	        		</tr>
	        		<tr>
	        			<td></td>
	        			<td><span class="kpiName">3G:&nbsp;</span><span id="labelKpiValue3G1" class="kpiValue">--</span></td>
	        			<td></td>
	        		</tr>
	        		<tr>
	        			<td><span class="kpiName" id="customerCompareTime">环比:&nbsp;</span><span id="labelKpiValueNowHb1" class="kpiValue">--</span></td>
	        			<td><span class="kpiName">4G:&nbsp;</span><span  id="labelKpiValue4G1" class="kpiValue">--</span></td>
	        			<td><span class="kpiName">园区外:&nbsp;</span><span id="labelKpiValueOut1" class="kpiValue">--</span></td>
	        		</tr>
        		</table>
            </div>
            
            <div class="line1 Lline"></div>
            <div class="Lnorm1"  name="语音话务量">
            	<div class="caption">
                    <div class="subject">
                        <i class="icon icon-traffic"></i> 
                        <span>语音话务量</span>
                    </div>
                    <div id="labelTrafficFlowTime" class="time">00:00</div>
                </div>
                <div class="data">
                    <div id="labelTrafficFlow" class="exponent">
                    <h1>0&nbsp;<span>Erl</span></h1>
                    </div>
                    <div id="trafficFlowCompareChart" class="chart0"></div>
                </div>
                <table class="detailTable">
	        		<tr>
	        			<td><span class="kpiName" id="trafficNowTime">当前:&nbsp;</span><span id="labelKpiValueNow2" class="kpiValue">--</span></td>
	        			<td><span class="kpiName">2G:&nbsp;</span><span id="labelKpiValue2G2" class="kpiValue">--</span></td>
	        			<td><span class="kpiName">园区内:&nbsp;</span><span id="labelKpiValueIn2" class="kpiValue">--</span></td>
	        		</tr>
	        		<tr>
	        			<td></td>
	        			<td><span class="kpiName">3G:&nbsp;</span><span id="labelKpiValue3G2" class="kpiValue">--</span></td>
	        			<td></td>
	        		</tr>
	        		<tr>
	        			<td><span class="kpiName" id="trafficCompareTime">环比:&nbsp;</span><span id="labelKpiValueNowHb2" class="kpiValue">--</span></td>
	        			<td><span class="kpiName">4G:&nbsp;</span><span  id="labelKpiValue4G2" class="kpiValue">--</span></td>
	        			<td><span class="kpiName">园区外:&nbsp;</span><span id="labelKpiValueOut2" class="kpiValue">--</span></td>
	        		</tr>
        		</table>
            </div>
            <div class="line1 Lline"></div>
            <div class="Lnorm1" name="数据流量">
            	<div class="caption">
                    <div class="subject">
                        <i class="icon icon-flow"></i> 
                        <span>数据流量</span>
                    </div>
                    <div id="labelFlowTime" class="time">0:00</div>
                    <img id="expandBtn" style="cursor:pointer;margin-top:10px;" src="${ctx}/static/styles/local-lsm/${hotspot}/images/toExpand.png"></img>
                </div>
                <div class="data">
                    <div id="totalFlow" class="exponent">
                    <h1>0&nbsp;<span>GB</span></h1>
                    </div>
                    <div id="flowCompareChart" class="chart0"></div>
                </div>                
            	<table class="detailTable">
	        		<tr>
	        			<td><span class="kpiName" id="flowNowTime">当前:&nbsp;</span><span id="labelKpiValueNow3" class="kpiValue">--</span></td>
	        			<td><span class="kpiName">2G:&nbsp;</span><span id="labelKpiValue2G3" class="kpiValue">--</span></td>
	        			<td><span class="kpiName">园区内:&nbsp;</span><span id="labelKpiValueIn3" class="kpiValue">--</span></td>
	        		</tr>
	        		<tr>
	        			<td></td>
	        			<td><span class="kpiName">3G:&nbsp;</span><span id="labelKpiValue3G3" class="kpiValue">--</span></td>
	        			<td></td>
	        		</tr>
	        		<tr>
	        			<td><span class="kpiName" id="flowCompareTime">环比:&nbsp;</span><span id="labelKpiValueNowHb3" class="kpiValue">--</span></td>
	        			<td><span class="kpiName">4G:&nbsp;</span><span  id="labelKpiValue4G3" class="kpiValue">--</span></td>
	        			<td><span class="kpiName">园区外:&nbsp;</span><span id="labelKpiValueOut3" class="kpiValue">--</span></td>
	        		</tr>
        		</table>
            </div>
            </div>
        </div>
        <div class="DL4">
            <div class="DL4_left">
            	<div class="subtitle subtitle_txt3" ><img src="${ctx}/static/styles/local-lsm/${hotspot}/images/subtitle3.png" /></div>
            	<div class="DL4_left_content">
<!--                     <div class="DL4_top"> -->
<!--                     	<div name="网元告警" class="DL4_switch line_green DL4bg_green">网元告警&nbsp;<span id="neAlarmCount">0</span></div> -->
<!--                         <div name="性能告警" class="DL4_switch line_blue">性能告警&nbsp;<span id="performanceAlarmCount">0</span></div> -->
<!--                         <div name="用户投诉" class="DL4_switch line_yellow">用户投诉&nbsp;<span id="userComplainCount">0</span></div> -->
<!--                     </div> -->
<!--                     <div id="alarmTable" class="alarmTable"></div> -->
<!--                     <div class="noAlarm"></div> -->
<!--                     <div class="alarmLegend"> -->
<!--                     	<ul> -->
<!--                     		<li><span class="alarmLv1"></span>&nbsp一级</li> -->
<!--                     		<li><span class="alarmLv2"></span>&nbsp二级</li> -->
<!--                     		<li style="display:none;"><span class="alarmLv3"></span>&nbsp三级</li> -->
<!--                     		<li style="display:none;"><span class="alarmLv4"></span>&nbsp四级</li> -->
<!--                     	</ul> -->
<!--                     </div> -->
                    <div class="alarmStatistic">
                    	<ul>
                    		<li><span class="alarmIcon alarmIconLv0"></span>网元告警&nbsp;<span name="网元告警" id="neAlarmCount" class="alarmStatisticNum">0</span>&nbsp;条</li>
                    		<li><span class="alarmIcon alarmIconLv0"></span>性能告警&nbsp;<span name="性能告警" id="performanceAlarmCount" class="alarmStatisticNum">0</span>&nbsp;条</li>
                    		<li><span class="alarmIcon alarmIconLv0"></span>用户投诉&nbsp;<span name="用户投诉" id="userComplainCount" class="alarmStatisticNum">0</span>&nbsp;条</li>
                    	</ul>
                    </div>
<!--                     <div class="filterIcon filter12" style="position:absolute;top:30px;right:10px;"></div> -->
                </div>
               <div id="lbMenu_expand" class="menu_expand">
               		<img id="lbMenu_expand_bg" src="${ctx}/static/styles/local-lsm/${hotspot}/images/menu.png" />
               		<div id="menu1" name="区域" class="menuselector" style="left:15px;top:15px;"></div>
               		<div id="menu2" name="左屏" class="menuselector" style="left:90px;top:20px;"></div>
               		<div id="menu3" name="中屏" class="menuselector" style="left:135px;top:75px;"></div>
               		<div id="menu4" name="右屏" class="menuselector" style="left:140px;top:145px;"></div>
               	</div> 
               <div id="lbMenu" class="menu"><img src="${ctx}/static/styles/local-lsm/${hotspot}/images/menuicon.png" /></div> 
            </div>
            
            
            <div class="DL4_right">
                <div id="cellCtrlTitle" class="subtitle subtitle_txt_right" >
                	<div class="DL4Right_title_block">
	                	<img src="${ctx}/static/styles/local-lsm/${hotspot}/images/subtitle4.png" />
	                	<span class="qualityTime" id="regionDetailTime"></span>
                	</div>
                	<div class="DL4Right_control_block">
	                	<div id="cellCount" class="cellTypeTxt" style="float:right;padding-top:0px;">总数：--</div>
	                	<div id="cellThresholdCtrl" class="cellTypeTxt" style="display:none;float:right;padding-top:0px;">
	                		<div class="cellThresholdCtrl">
								<div class="cellTypeBtnDiv"><div name="全部" class="cellThresholdRadio customRadio customRadioSelected"></div></div>
		               			<div class="cellTypeTxt">全部</div>
		               			<div class="cellTypeBtnDiv"><div name="劣化" class="cellThresholdRadio customRadio"></div></div>
		               			<div class="cellTypeTxt">劣化</div>
	               			</div>
						</div>
	                	<div class="regionDetailReturn" title="返回"></div>
	                	<div class="regionDetailZoom" title="放大" style="position:absolute;padding-top:0px;line-height:40px;left:50px;top:0px;"></div>
	                	<div class="regionDetailColConfig" title="列配置" style="position:absolute;padding-top:0px;line-height:40px;left:100px;top:0px;"></div>
	                	
	                	<div class="regionDetailCtrl">
		                	<div class="cellTypeCtrl">
		                		<div class="cellTypeBtnDiv"><div name="4g" class="cellTypeRadio customRadio customRadioSelected"></div></div>
	                			<div class="cellTypeTxt">LTE</div>
	                			<div class="cellTypeBtnDiv"><div name="3g" class="cellTypeRadio customRadio"></div></div>
	                			<div class="cellTypeTxt">TD</div>
	                			<div class="cellTypeBtnDiv"><div name="2g" class="cellTypeRadio customRadio"></div></div>
	                			<div class="cellTypeTxt">GSM</div>
		                	</div>
	                	</div>
	                	
	                	<div id="regionDetailKpiType" class="KpiType" style="display:none;position:relative;float:right;padding-top:0px;line-height:40px;">
	                		<div class="KpiTypeBtnDiv" style="padding-top:0px;"><div name="信令指标" class="kpiTypeRadio customRadio customRadioSelected"></div></div>
	                		<div name="信令指标" class="KpiTypeTxt" style="padding-top:0px;">信令指标</div>
	                		<div class="KpiTypeBtnDiv" style="padding-top:0px;"><div name="网管指标" class="kpiTypeRadio customRadio"></div></div>
	                		<div name="网管指标" class="KpiTypeTxt" style="padding-top:0px;">网管指标</div>
	                	</div>
	                	
                	</div>
                	
                </div>
                <div class="DL4_right_content">

                </div>
            </div>
        </div>
		<div class="DL5"></div>        
    </div>
    <!--LEFT 结束--->
</div>
<div id="context-menu">
  <ul class="dropdown-menu" role="menu">
    <li><a tabindex="-1" href="javascript:void(0);" >子热点</a></li>
    <li><a tabindex="-1" href="javascript:void(0);" >小区</a></li>
    <li><a tabindex="-1" href="javascript:void(0);" >查看所有指标</a></li>
    <li><a tabindex="-1" href="javascript:void(0);" >查看趋势图</a></li>
  </ul>
</div>

<div id="context-menu-hotcell">
  <ul class="dropdown-menu" role="menu">
    <li><a tabindex="-1" href="javascript:void(0);" >查看所有指标</a></li>
    <li><a tabindex="-1" href="javascript:void(0);" >查看趋势图</a></li>
    <li><a tabindex="-1" href="javascript:void(0);" >定位小区</a></li>
  </ul>
</div>

</body>
<%@ include file="/pages/local-lsm/common/screenbaseinclude.jsp"%>
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/${hotspot}/custom.css" />
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/dragger.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/scenebaseLeft_test.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/disney1.js"></script>
<script>

	var isScreenMode="<%=isScreenMode%>";
	if(isScreenMode!="true"){
		var docWidth=$(document).width();
		var docHeight=$(document).height();
		$(".Disney_L").css("position","absolute");
		
		if(docWidth>1600){
			$(".Disney_L").css("left","50%");
			$(".Disney_L").css("margin-left",-800);
		}
		
		if(docHeight>1200){
			$(".Disney_L").css("top","50%");
			$(".Disney_L").css("margin-top",-600);
		}
	}

	var HOTSPOT="";

	/** 大屏对象*/
	var disneyScreen;
	
	/** 设置title */
	function setTitle(value)
	{
		disneyScreen.setTitle(value);
	}
	
	/** 切换要显示的kpi指标 全部可选指标中 控制器*/
	function setKpiIndex(index_)
	{
		disneyScreen.showComparedKpiFromAll(index_);
	}
	
	/** 设置区域 */
	function setRegionArea(value)
	{
		disneyScreen.setRegionArea(value);
	}
	
	/** 设置子区域 */
	function setSubArea(value,parentHot)
	{
		disneyScreen.setSubArea(value,parentHot);
	}
	
	/** 设置tab的选中项 */
	function setTab(label)
	{
		disneyScreen.setTabSelectedLabel(label);
	}
	
	/** 切换要显示的kpi指标 配置选中范围内*/
	function kpiChangeHandler(index_)
	{
		disneyScreen.showComparedKpi(index_);
	}
	
	
	
	(function(){
		SUtils.initScene(function(){
			HOTSPOT=LSMConsts.hotspots[0];
			$(".subtitleSpan").text(HOTSPOT);
			disneyScreen=new DisneyScreen.ScreenController(HOTSPOT);
			kpiChangeHandler(0);
		});
		
		setInterval(TitleTimer, 1000);
	}());
	
	function TitleTimer(){
		var date=new Date();
		var time=date.Format("hh:mm");
		$(".leftTime").text("北京时间:"+time);
	}
	
</script>
</html>