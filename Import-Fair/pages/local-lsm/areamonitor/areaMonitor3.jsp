<!DOCTYPE html>
<html lang="zh-CN">
<head>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%
String isScreenMode = request.getParameter("isScreenMode");
String hotspotId = request.getParameter("hotspotId");
%>
<meta charset="UTF-8" http-equiv="X-UA-Compatible" content="IE=Edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<%@ include file="/common/lib.jsp"%>
<c:set var="hotspot" value="common" />
<link type="text/css" rel="stylesheet" href="${ctx}/scripts/local-lsm/common/slide/css/reset.css" />
<link type="text/css" rel="stylesheet" href="${ctx}/scripts/local-lsm/common/slide/css/style.css" />
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/slide/jquery_slide.js"></script>
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/componentsStyle.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/${hotspot}/style.css" />
<%@ include file="/common/bootstrap.jsp"%>
<%@ include file="/common/echarts.jsp"%>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/baiduapi/baiduApiScript.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/baiduapi/codemirror.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/baiduapi/javascript.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/baiduapi/BMap.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/displayConfig.js"></script>
<title>大屏监控</title>
</head>
<body> 
<div class="Disney_R">
    <!--RIGHT 开始--->
    <div class="disney_right">
        <div class="DR1" style="display:none;"></div>      
        <div class="DR2" style="display:none;">
            <div class="DR2_left">
                <div class="subtitle subtitle_txt4" ><img src="${ctx}/static/styles/local-lsm/${hotspot}/images/subtitle5.png" /></div>
                <div id="chart" class="DR2_left_content">
                	<div id="normalChart" class="DR2_left_chart"></div>
                	<div id="extensionChart" class="DR2_left_chart"></div>
				</div>
            </div>
            <div class="DR2_right">
                <div class="subtitle subtitle_txt5" ><img src="${ctx}/static/styles/local-lsm/${hotspot}/images/subtitle6.png" /></div>
                <div class="DR2_right_content">
                <span class="DR2_TIME"></span>
                <table id="cityUserTable" width="100%" border="0">
 <tr class="table_subtitle">
    <td class="table_borderR">地市</td>
    <td id="kpiColumn">用户</td>
  </tr>
	<tr class="tr_1">
    <td class="tr_txt"></td>
    <td class="tr_txt3"></td>
  </tr>
	<tr class="tr_2">
    <td class="tr_txt"></td>
    <td class="tr_txt3"></td>
  </tr>
	<tr class="tr_1">
    <td class="tr_txt"></td>
    <td class="tr_txt3"></td>
  </tr>
	<tr class="tr_2">
    <td class="tr_txt"></td>
    <td class="tr_txt3"></td> 
  </tr>
	<tr class="tr_1">
    <td class="tr_txt"></td>
    <td class="tr_txt3"></td>
  </tr>
	<tr class="tr_2">
    <td class="tr_txt"></td>
    <td class="tr_txt3"></td>
  </tr>
	<tr class="tr_1">
    <td class="tr_txt"></td>
    <td class="tr_txt3"></td>
  </tr>
	<tr class="tr_2">
    <td class="tr_txt"></td>
    <td class="tr_txt3"></td>
  </tr>
	<tr class="tr_1">
    <td class="tr_txt"></td>
    <td class="tr_txt3"></td>
  </tr>
	<tr class="tr_2">
    <td class="tr_txt"></td>
    <td class="tr_txt3"></td> 
  </tr>
	<tr class="tr_1">
    <td class="tr_txt"></td>
    <td class="tr_txt3"></td>
  </tr>
	<tr class="tr_2">
    <td class="tr_txt"></td>
    <td class="tr_txt3"></td>
  </tr> 

	<tr class="tr_1">
    <td class="tr_txt"></td>
    <td class="tr_txt3"></td>
  </tr>
	<tr class="tr_2">
    <td class="tr_txt"></td>
    <td class="tr_txt3"></td>
  </tr> 

</table>

                </div>
            </div>
        </div>
        <div class="DR3"  style="display:none;">
       	 <div class="DR3_content">
         	<div class="DR3_left icon2 arrowBtn"><img src="${ctx}/static/styles/local-lsm/${hotspot}/images/iconl.png" /></div>
            <div class="DR3_centre">
            	<div class="banner banner_r" name="0">
                	<div class="slider_content banner_content"><img src="${ctx}/static/styles/local-lsm/${hotspot}/images/chart4.png" /></div>
                    <div class="Chooseregion">
                      <div class="txt_bg"> <span class="Chooseregion_txt">国内游客量</span></div>
                    </div>
                    <div class="SelectBG" style="display:none;"></div>
                </div>
               	<div class="banner banner_r" name="1">
                	<div class="slider_content banner_content"><img src="${ctx}/static/styles/local-lsm/${hotspot}/images/chart4.png" /></div>
                    <div class="Chooseregion">
                      <div class="txt_bg"> <span class="Chooseregion_txt">国外游客量</span></div>
                    </div>  
                    <div class="SelectBG" style="display:none;"></div>             
                </div>
               	<div class="banner banner_r" name="2">
                	<div class="slider_content banner_content2"><img src="${ctx}/static/styles/local-lsm/${hotspot}/images/chart5.jpg" /></div>
                    <div class="Chooseregion2">
                      <div class="txt_bg"> <span class="Chooseregion_txt">国内游客分布</span></div>
                    </div>   
                    <div class="SelectBG"></div>            
                </div>
                <div class="banner" name="3">
                	<div class="slider_content banner_content2"><img src="${ctx}/static/styles/local-lsm/${hotspot}/images/chart6.jpg" /></div>
                    <div class="Chooseregion2">
                      <div class="txt_bg"> <span class="Chooseregion_txt">国外游客分布</span></div>
                    </div>           
                    <div class="SelectBG" style="display:none;"></div>      
                </div>
            </div>
            <div class="DR3_right icon2 arrowBtn"><img src="${ctx}/static/styles/local-lsm/${hotspot}/images/iconr.png" /></div>
         </div>
        </div> 
  
    </div>
    <!--RIGHT 结束--->
    <div id="swfIframe"  style="display:none;width:1600px;height:1200px;position:absolute;top:0px;left:0px;background:transparent;">
    	<div class="disney3Top">
    		<div class="picTitle" style="left:60px;"><img src="${ctx}/static/styles/local-lsm/${hotspot}/images/disney3top_title.png" /><span class="subtitle" id="rightTime" style="position:absolute;left:350px;float:none;"></span></div>
    		<div id="frameTopContent" class="frameContent">
    			<div id="topContent1">
    				<div class="topTitle"><img src="${ctx}/static/styles/local-lsm/${hotspot}/images/network.png" />流量占比<span style="color:red;">高于</span>全网</div>
    				<div id="topContent1Grid">
    				</div>
    			</div>
    			<div id="topContent2">
    				<div class="topTitle">数据业务分布</div>
    				<div id="topContent2Chart">
    				</div>
    			</div>
    			<div id="topContent3">
    				<div class="topTitle"><img src="${ctx}/static/styles/local-lsm/${hotspot}/images/network.png" />流量占比<span style="color:green;">低于</span>全网</div>
    				<div id="topContent3Grid">
    				</div>
    			</div>
    		</div>
    	</div>
    	<div class="disney3BottomLeft">
    		<div class="picTitle" style="width:100%;">
    			<img src="${ctx}/static/styles/local-lsm/${hotspot}/images/disney3bl_title.png" />
    			<div class="majorCtrl" style="position:absolute;left:475px;top:0px;display:none;">
               		<div class="cellTypeBtnDiv"><div name="全部" class="majorRadio customRadio customRadioSelected"></div></div>
              		<div class="cellTypeTxt">全部</div>
              		<div class="cellTypeBtnDiv"><div name="即时通信" class="majorRadio customRadio"></div></div>
              		<div class="cellTypeTxt">即时通信</div>
              		<div class="cellTypeBtnDiv"><div name="浏览下载" class="majorRadio customRadio"></div></div>
              		<div class="cellTypeTxt">浏览下载</div>
              		<div class="cellTypeBtnDiv"><div name="视频" class="majorRadio customRadio"></div></div>
              		<div class="cellTypeTxt">视频</div>
              		<div class="cellTypeBtnDiv"><div name="应用商店" class="majorRadio customRadio"></div></div>
              		<div class="cellTypeTxt">应用商店</div>
               	</div>
    		</div>
    		<div id="frameBottomLeftContent" class="frameContent"></div>
    	</div>
    	<div class="disney3BottomRight">
    		<div class="picTitle"><img src="${ctx}/static/styles/local-lsm/${hotspot}/images/terminal.png" /><div id="terminalReturn" style="position:absolute;right:5px;" class="regionDetailReturn"></div></div>
    		<div id="frameBottomRightContent" class="frameContent"></div>
    	</div>
    </div>
    
    <div id="lbMenu_expand" class="menu_expand">
               		<img id="lbMenu_expand_bg" src="${ctx}/static/styles/local-lsm/${hotspot}/images/menu.png" />
               		<div id="menu1" name="区域" class="menuselector" style="left:15px;top:15px;"></div>
               		<div id="menu2" name="左屏" class="menuselector" style="left:90px;top:20px;"></div>
               		<div id="menu3" name="中屏" class="menuselector" style="left:135px;top:75px;"></div>
               		<div id="menu4" name="右屏" class="menuselector" style="left:140px;top:145px;"></div>
               	</div> 
               <div id="lbMenu" class="menu"  style="display:none;"><img src="${ctx}/static/styles/local-lsm/${hotspot}/images/menuicon.png" /></div> 
               
               <div title="返回" id="returnURLBtn" class="returnIconBtn" style="display:none;position:absolute;top:20px;right:10px;"></div>
</div>

</body>
<%@ include file="/pages/local-lsm/common/screenbaseinclude.jsp"%>
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/${hotspot}/custom.css" />
<script type="text/javascript" src="${ctx}/scripts/local-lsm/p2pscreen.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/scenebaseRight.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/areamonitor/areaMonitor3.js"></script>
<script>
	window.onkeypress=parent.window.onkeypress;//选择页面快捷键
	var paramHotspotId="<%=hotspotId%>";
	var BASEPATH="${ctx}";
	var disneyRight;
	var disneyRightNew;
	var HOTSPOT=LSMConsts.hotspots[0];
	$(document).ready(function(){
		if(paramHotspotId!="null"){
			SUtils.updeteBaseHotspotsById(paramHotspotId,function(){
				HOTSPOT=LSMConsts.hotspots[0];
				disneyRightNew=new CommonScreen.NewVersionRight(HOTSPOT);
				
				$(".disney_right").addClass("disney_right2");
				$(".DR1").css("display","none");
				$(".DR2").css("display","none");
				$(".DR3").css("display","none");
				
				$("#swfIframe").css("display","block");
			});
			
		}else{
			SUtils.initCommonScene(function(){
				HOTSPOT=LSMConsts.hotspots[0];
				disneyRightNew=new CommonScreen.NewVersionRight(HOTSPOT);
				
				$(".disney_right").addClass("disney_right2");
				$(".DR1").css("display","none");
				$(".DR2").css("display","none");
				$(".DR3").css("display","none");
				
				$("#swfIframe").css("display","block");
			});
		}
		
	});
	function changeRegion(area,hotspots,lng,lat){
		LSMConsts.lng=lng;
		LSMConsts.lat=lat;
		LSMConsts.area=area;
		LSMConsts.hotspots=hotspots;
		HOTSPOT=hotspots[0];
		if(disneyRightNew){
			disneyRightNew.hotspot=HOTSPOT;
			disneyRightNew.update();
		}
		if(disneyRight){
			disneyRight.hotspot=HOTSPOT;
			disneyRight.update();
		}
	}
	function chartClick(N){
		if(disneyRight!=null){
			disneyRight.setSelectedChartIndex(N);
			disneyRight.showChart(N,true);
		}
	}
	function navClick(type){
		if(disneyRight==null){
			disneyRight=new CommonScreen.RightScreen(HOTSPOT);
		}
		disneyRight.navClick(type);
	}
	
	
	var isScreenMode="<%=isScreenMode%>";
	if(isScreenMode!="true"){
		$("#lbMenu").css("display","block");
		var docWidth=$(document).width();
		var docHeight=$(document).height();
		$(".Disney_R").css("position","absolute");
		
		if(docWidth>1600){
			$(".Disney_R").css("left","50%");
			$(".Disney_R").css("margin-left",-800);
		}
		
		if(docHeight>1200){
			$(".Disney_R").css("top","50%");
			$(".Disney_R").css("margin-top",-600);
		}
		if(DC_RETURN_SHOW){
			$("#returnURLBtn").css("display","block");
			$("#returnURLBtn").attr("title",DC_RETURN_TIP);
			$("#returnURLBtn").on("click",function(){window.location.href=DC_RETURN_URL;});
		}
	}else{
		
	}
	
	///菜单
	new CommonScreen.ScreenMenu();
</script>
</html>