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
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/${hotspot}/style_s.css" />
<%@ include file="/common/bootstrap.jsp"%>
<%@ include file="/pages/local-lsm/common/screenbaseinclude.jsp"%>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/displayConfig.js"></script>
<title>大屏监控</title>
</head>
<body> 
<div class="Disney_C">
   
    <!--CENTRE 开始--->
    <div class="disney_centre">
        <iframe id="frame2" style="width:1600px;height:1200px;left:0px;border:none;" frameborder="no" src="" ></iframe>
    </div>
    <!--CENTRE 结束--->
    <div id="lbMenu_expand" class="menu_expand">
               		<img id="lbMenu_expand_bg" src="${ctx}/static/styles/local-lsm/${hotspot}/images/menu.png" />
               		<div id="menu1" name="区域" class="menuselector" style="left:15px;top:15px;"></div>
               		<div id="menu2" name="左屏" class="menuselector" style="left:90px;top:20px;"></div>
               		<div id="menu3" name="中屏" class="menuselector" style="left:135px;top:75px;"></div>
               		<div id="menu4" name="右屏" class="menuselector" style="left:140px;top:145px;"></div>
               	</div> 
               <div id="lbMenu" class="menu" style="display:none;"><img src="${ctx}/static/styles/local-lsm/${hotspot}/images/menuicon.png" /></div> 
	<div title="返回" id="returnURLBtn" class="returnIconBtn" style="display:none;position:absolute;top:10px;right:100px;"></div>
</div>

</body>
<script>
	var changeFlag=false;
	var sizeKey=0;
	var isScreenMode="<%=isScreenMode%>";
	var paramHotspotId="<%=hotspotId%>";
	if(isScreenMode!="true"){
		var docWidth=$(document).width();
		var docHeight=$(document).height();
		$(".Disney_C").css("position","absolute");
		
		if(docWidth>1600){
			$(".Disney_C").css("left","50%");
			$(".Disney_C").css("margin-left",-800);
		}
		
		if(docHeight>1200){
			$(".Disney_C").css("top","50%");
			$(".Disney_C").css("margin-top",-600);
		}
		if(DC_RETURN_SHOW){
			$("#returnURLBtn").css("display","block");
			$("#returnURLBtn").attr("title",DC_RETURN_TIP);
			$("#returnURLBtn").on("click",function(){window.location.href=DC_RETURN_URL;});
		}
	}

	$(".nav").on('click',rightNavClick);
	$("#frame2").attr("src",LSMScreen.G_URLCONFIG.baseUrl+"/sh/shUltimate/commonGuard.html");
	function rightNavClick(evt){
		$(".SelectBG2").css("display","none");
		$(evt.currentTarget).find(".SelectBG2").css("display","block");
		var type=$(evt.currentTarget).find("span").text();
		try{
			parent.screen3_changeType(type);
		}catch(e){
			console.log("disney2 parent.screen3_changeType failed");
		}
	}
	
	function locate2Target(loc){
		var iframe=$("#frame2")[0];
		var iframeWindow=iframe.window?iframe.window:iframe.contentWindow;
		iframeWindow.locate2Target(loc);
	}
	function getPhoneParas2baselayerChange(layer){
		var iframe=$("#frame2")[0];
		var iframeWindow=iframe.window?iframe.window:iframe.contentWindow;
		iframeWindow.getPhoneParas2baselayerChange(layer);
	}
	function getLocationParasAndLevel(lat,lng,zoom){
		var iframe=$("#frame2")[0];
		var iframeWindow=iframe.window?iframe.window:iframe.contentWindow;
		iframeWindow.getLocationParasAndLevel(lat,lng,zoom);
	}
	//定位小区
	function getParasToOpenPopup(lat,lng,lacci,cellName,hotspot,ntType,isRo){
		var iframe=$("#frame2")[0];
		var iframeWindow=iframe.window?iframe.window:iframe.contentWindow;
		iframeWindow.getParasToOpenPopup(lat,lng,lacci,cellName,hotspot,ntType,isRo);
	};
	//渲染小区
	function getParasToSetStyle(color,cellNames){
		var iframe=$("#frame2")[0];
		var iframeWindow=iframe.window?iframe.window:iframe.contentWindow;
		iframeWindow.getParasToSetStyle(color,cellNames);
	};
	
	//渲染片区
	function screen2_renderArea(targetName,color){
		var iframe=$("#frame2")[0];
		var iframeWindow=iframe.window?iframe.window:iframe.contentWindow;
		iframeWindow.getParasToSetPolygonColor(color,targetName);
	}
	//清楚片区渲染
	function screen2_clearAreaRender(){
		var iframe=$("#frame2")[0];
		var iframeWindow=iframe.window?iframe.window:iframe.contentWindow;
		iframeWindow.getParasToSetPolygonColorBack();
	}
	//清楚小区渲染
	function screen2_clearCellRender(){
		var iframe=$("#frame2")[0];
		var iframeWindow=iframe.window?iframe.window:iframe.contentWindow;
		iframeWindow.getParasToSetSectorColorBack();
	}
	
	//地图准备完成
	function screen2_isReady(){
	};
	function screen2_allReady(){
		if(!changeFlag){
			clearTimeout(sizeKey);
			sizeKey=setTimeout(changeSize, 1000);
		}
		if(paramHotspotId!="null"&&paramHotspotId!=""){
			SUtils.updeteBaseHotspotsById(paramHotspotId,function(){
				switchSceneGuard(LSMConsts.hotspots[0],LSMConsts.lat,LSMConsts.lng,LSMConsts.area);
			});
			paramHotspotId="";
		}
	}
	function switchSceneGuard(hotspot,lat,lng,area){
		var iframe=$("#frame2")[0];
		var iframeWindow=iframe.window?iframe.window:iframe.contentWindow;
		iframeWindow.switchSceneGuard(hotspot,lat,lng,true);
	}
	function changeSize(){
		try{
			var iframe=$("#frame2")[0];
			var iframeWindow=iframe.window?iframe.window:iframe.contentWindow;
			iframeWindow.getParas2SetChartSize(true,true);
			changeFlag=true;
		}catch(e){
			console.log(e.message);
		}
	}
	
	//渲染片区和tip
	function screen2_renderAreaAndTip(color,name,time,level,downLimit,upLimit,content){
		var iframe=$("#frame2")[0];
		var iframeWindow=iframe.window?iframe.window:iframe.contentWindow;
		iframeWindow.getParasToSetPolygonColor(color,name,time,level,downLimit,upLimit,content);
	}
	
	function loadFiles(){
		
	}
	
	
	function createLis(arr){
		arr.sort(function(a,b){return a.order-b.order;});//按order 升序
		var count=0;
		$(".filesDiv").empty();
		for(var i=0;i<arr.length;i++){
			var record=arr[i];
			if(record.show=="true"&&count<3){
				createLiDom(i+1,record.file,record.show);
				count++;
			}
			
		}
	}
	function createLiDom(index,fileName,show){
		var fileWidth=600;
		var fileHeight=300;
		if(show=="true"){
			var div=document.createElement("div");
			var screw1='<div class="screw" style="left:15px;top:15px;"></div>';
			var screw2='<div class="screw" style="right:15px;top:15px;"></div>';
			var screw3='<div class="screw" style="left:15px;bottom:15px;"></div>';
			var screw4='<div class="screw" style="right:15px;bottom:15px;"></div>';
			$(div).addClass("fileLi");
			$(div).attr("name",fileName);
			$(div).html(
				SUtils.getFileNode(fileName,fileWidth,fileHeight,true)
				+screw1
				+screw2
				+screw3
				+screw4
			);
			$(div).on('click',zoomFile);
			$(".filesDiv").append(div);
		}
		
	}
	function zoomFile(evt){
		var fileName=$(evt.currentTarget).attr("name");
		var divJQ=getCenterLargeDom();
		divJQ.html(
				SUtils.getFileNode(fileName,1600,1200,true)
			);
	}
	function destroySelf(evt){
		$(evt.currentTarget).remove();
		$(".maptopo_mask").css("display","none");
	}
	function zoomTopo(evt){
		var src=$(evt.currentTarget).attr("url");
		var divJQ=getCenterLargeDom();
		$(".maptopo_mask").css("display","none");
		$(evt.currentTarget).find(".maptopo_mask").css("display","block");
		divJQ.html(
				'<iframe style="width:1600px;height:1200px;left:0px;border:none;" frameborder="no" src="'+src+'" ></iframe>'
				+'<div class="fileWinClose"></div>'
		);
	}
	function zoomJK(evt){
		var src=$(evt.currentTarget).attr("url");
		var divJQ=getCenterLargeDom("centerExtraIframe");
		$(".maptopo_mask").css("display","none");
		$(evt.currentTarget).find(".maptopo_mask").css("display","block");
		divJQ.html(
				'<iframe style="width:3200px;height:1078px;left:0px;border:none;" frameborder="no" src="'+src+'" ></iframe>'
				+'<div class="fileWinClose"></div>'
		);
	}
	function getCenterLargeDom(divClass){
		if(divClass==null) divClass="centerLargeFile";
		if($("."+divClass).length>0){
			return $("."+divClass);
		}else{
			var div=document.createElement("div");
			$(div).addClass(divClass);
			$(div).on('click',destroySelf);
			$(".Disney_C").append(div);
			return $(div);
		}
	}
	function TitleTimer(){
		var date=new Date();
		var time=date.Format("hh:mm");
		var month=date.Format("MM");
		var day=date.Format("dd");
		switch(month){
			case "01":
				month="Jan";
				break;
			case "02":
				month="Feb";
				break;
			case "03":
				month="Mar";
				break;
			case "04":
				month="Apr";
				break;
			case "05":
				month="May";
				break;
			case "06":
				month="Jun";
				break;
			case "07":
				month="July";
				break;
			case "08":
				month="Aug";
				break;
			case "09":
				month="Sep";
				break;
			case "10":
				month="Oct";
				break;
			case "11":
				month="Nov";
				break;
			case "12":
				month="Dec";
				break;
		}
		$("#TIME_MONTH").html(month+'&nbsp;<span id="TIME_DATE">'+day+'</span>');
		$("#TIME_HOURANDMIN").text(time);
	}
	
	function senseKpi(){
		var dm=LSMScreen.DataManager.getInstance();
		dm.getHotSpotsKpis([LSMConsts.hotspots[0]], null,null,
				kpiDataHandler);
	}
	
	function kpiDataHandler(result){
		var value=result[LSMConsts.hotspots[0]]["4GHTTP成功率"]*100;
		var stars=$("#netSense div");
		for(var i=0;i<stars.length;i++){
			if(value>=(i+1)*20){
				$(stars[i]).attr("class","icon2 icon-snowflake");
			}else{
				$(stars[i]).attr("class","icon2 icon-snowflake_w");
			}
		}
	}
	
	
	$("#lbMenu").css("display","block");
	///菜单
	new CommonScreen.ScreenMenu();
	
</script>
</html>