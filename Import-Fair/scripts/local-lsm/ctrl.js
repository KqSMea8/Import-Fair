/**
 * 控制器命名空间
 * @namespace
 */
var ScreenController = ScreenController || {};

ScreenController.ROLE_CONTROLLER="controller";
ScreenController.ROLE_RECIEVER="reciever";
/**
 * 大屏控制手机控制器WebSocket连接
 * @class LSMScreen.WsController
 * @classdesc 更新周期等
 */
ScreenController.WsConnection=function(){
	this.wsUrl=LSMConsts.wsUrl;
	this.mapUrl=LSMConsts.mapUrl;
	this.serviceUrl=LSMConsts.serviceUrl;
	/** 调用构造方法*/
	this.initialize.apply(this, arguments);
};

//ScreenController.WsConnection.prototype.mapUrl="http://192.168.1.128:7080/web-inas-local-lsm/pages/local-lsm/shUltimate/transCoordDSN.html";
ScreenController.WsConnection.prototype.wsUrl=LSMConsts.wsUrl;

ScreenController.WsConnection.prototype.mapUrl=LSMConsts.mapUrl;
//ScreenController.WsConnection.prototype.wsUrl="ws://10.221.247.7:17080/LsmController/wssocket";
ScreenController.WsConnection.prototype.serviceUrl=LSMConsts.serviceUrl;

ScreenController.WsConnection.prototype.ws;
ScreenController.WsConnection.prototype.wsConnected=false;
ScreenController.WsConnection.prototype.currentScreen=0;

ScreenController.WsConnection.prototype.screenLvMap={};

ScreenController.WsConnection.prototype.mainSliderPosDex=null;//function
ScreenController.WsConnection.prototype.chartSliderPosDex=null;//function

ScreenController.WsConnection.prototype.connectionOffPeriod=10*1000;//心跳30秒未收到显示为未连接状态
ScreenController.WsConnection.prototype.connectionOffIntervalKey=0;//定时key

ScreenController.WsConnection.prototype.reconnectPeriod=10*1000;//断连后30秒重连一次
ScreenController.WsConnection.prototype.reconnectIntervalKey=0;//定时key

ScreenController.WsConnection.prototype.connectionStatusDivId="ctrlStatusImg";
ScreenController.WsConnection.prototype.role="";

ScreenController.WsConnection.prototype.fileManagerWin=null;
/** 
 * 初始化websocket
 * @protected
 * @function 
 * @param {String} role 角色 controller/reciever 
 */
ScreenController.WsConnection.prototype.initialize=function(role){
	this.role=role;
	this.ws = new WebSocket(this.wsUrl);
	this.ws.onopen = function() { 
		clearInterval(this.reconnectIntervalKey);
		this.onOpen(role);
	}.bind(this);
	this.ws.onmessage = function(event) {
	    this.onMessage(event);
	}.bind(this);
	this.ws.onerror = function(event) {
		this.onError(event);
    }.bind(this);
    this.ws.onclose = function(event) {
    	this.onClose(event);
    }.bind(this);
    
    this.resetOffInterval();
};

ScreenController.WsConnection.prototype.onOpen=function(role){
	this.ws.send("role:"+role);
	this.wsConnected=true;
	this.connectionOn();
};
ScreenController.WsConnection.prototype.onMessage=function(event){
	var message=event.data;
	if(message=="beatFromServer"){
		this.connectionOn();
		this.resetOffInterval();
	}else{
		try{
			eval("this."+message);
		}catch(e){
			console.log("command exec error:"+"this."+message);
		}
		
	}
};
ScreenController.WsConnection.prototype.resetOffInterval=function(){
	clearInterval(this.connectionOffIntervalKey);
	this.connectionOffIntervalKey=setInterval(this.connectionOff.bind(this), this.connectionOffPeriod);
};
ScreenController.WsConnection.prototype.connectionOn=function(){
	$("#"+this.connectionStatusDivId).removeClass("ctrlStatusOff");
	$("#"+this.connectionStatusDivId).addClass("ctrlStatusOn");
	$(".reconnectText").css("display","none");
};
ScreenController.WsConnection.prototype.connectionOff=function(){
	$("#"+this.connectionStatusDivId).addClass("ctrlStatusOff");
	$("#"+this.connectionStatusDivId).removeClass("ctrlStatusOn");
	$(".reconnectText").css("display","block");
//	clearInterval(this.reconnectIntervalKey);
//	setInterval(this.reconnect.bind(this), this.reconnectPeriod);
};
ScreenController.WsConnection.prototype.reconnect=function(){
//	this.initialize(this.role);
};
ScreenController.WsConnection.prototype.reconnectWs=function(){
	
};

ScreenController.WsConnection.prototype.onError=function(event){
//	alert("error:"+event.data);
};
ScreenController.WsConnection.prototype.onClose=function(event){
	console.log("websocket closed");
	this.connectionOff();
};

ScreenController.WsConnection.prototype.sendCommand=function(commandStr){
	console.log(commandStr);
	if(this.wsConnected){
		this.ws.send(commandStr);
	}
};
////////////////初始化控制器////////////////////
ScreenController.WsConnection.prototype.initController=function(){
	//main
//	$(".main_menu li").on('click',this.mainMenuClick.bind(this));
	$(".returnBtn").on('click',this.returnBtnClick.bind(this));
	$("#"+this.connectionStatusDivId).on('click',this.reconnectWs.bind(this));
	
	
	var docHeight=$(document).height();
	var docWidth=$(document).width();
	var imgHeight=docHeight*0.9;
	var imgWidth=docWidth*0.5;
	var newopt={
			conuntW:docWidth,//整体内容宽度
			countH:imgHeight,//整体内容高度
			w1:imgWidth, 
			h1:imgHeight,
			w2:imgWidth*0.9,//小图宽度
			h2:imgHeight*0.9,
			imgTouch:this.mainMenuTouch.bind(this)
		};
		
//	this.mainSliderPosDex=i_slide($(".MainMenu"),newopt);
	$(".MainMenu div").on('click',this.mainMenuClick.bind(this));
	
	
	//screen1
	this.screen1CreateRegions();
	var fakeRegions=LSMConsts.FAKE_REGION;
	
	$(".screen1Return").on('click',this.screen1CreateRegions.bind(this));
	$("#screen1_tab a").on('click',this.screen1TabClick.bind(this));
	this.initSceneAndSub(fakeRegions[0].region);
	
	//screen2
	$(".screen2Left a").on('click',this.screen2LocateClick.bind(this));
	$(".screen2Btn_2 a").on('click',this.screen2LayerClick.bind(this));
	
//	var iframe=$("#map")[0];
//	iframe.onload = iframe. onreadystatechange = this.initMapEvent.bind(this);//.on('load',this.initMapEvent.bind(this));
	$("#map").attr("src",this.mapUrl);
	$("#map").height($(document).height()-$(".screen2Btn_2").height()*3);
	setTimeout(this.initMapEvent.bind(this), 500);
	//screen3
	var docHeight=$(document).height();
	var docWidth=$(document).width();
	var imgHeight=docHeight*0.8;
	var imgWidth=docWidth*0.5;
	var newopt={
			conuntW:docWidth,//整体内容宽度
			countH:imgHeight,//整体内容高度
			w1:imgWidth, 
			h1:imgHeight,
			w2:imgWidth*0.9,//小图宽度
			h2:imgHeight*0.9,//小图高度 
			changeCallBack:this.screen3ChartClick.bind(this)
		};
		
//	this.chartSliderPosDex=i_slide($("#screen3Menu"),newopt);
//	$(".screen3MenuIcon div").on('click',this.screen3ChartIconClick.bind(this));
	$(".screen3Btn a").on('click',this.screen3TypeClick.bind(this));
	$("#screen3Menu div").on('click',this.screen3ChartDomClick.bind(this));
};
ScreenController.WsConnection.prototype.initSceneAndSub=function(parentHot){
	var dm=LSMScreen.DataManager.getInstance();
	dm.getSubHotspots({hotspot:parentHot},this.subHotspotDataHandler.bind(this));
};

ScreenController.WsConnection.prototype.subHotspotDataHandler=function (data){
	$(".sceneImgs").empty();
	for(var i=0;i<data.length;i++){
		var hot_name=data[i].hot_name;
		var div=document.createElement("div");
		$(div).addClass("scene0");
		$(div).html('<span class="scenemask"></span><span class="sceneText">'+hot_name+'</span><div name="'+hot_name+'" class="subhot">子热点</div><div name="'+hot_name+'" class="subcell">小区</div>');
		$(".sceneImgs").append(div);
	}
	$(".scenemask").on('click',this.screen1MainHotClick.bind(this));//mainhotclick
	$(".subhot").on('click',this.screen1SubClick.bind(this));//subhotspot cell
	$(".subcell").on('click',this.screen1SubClick.bind(this));//subhotspot cell
};
ScreenController.WsConnection.prototype.initMapEvent=function(param){
	try{ 
		var iframe=$("#map")[0];
		var iframeWindow=iframe.window?iframe.window:iframe.contentWindow;
		iframeWindow.map.on('zoomend', this.mapZoomEnd.bind(this));
		iframeWindow.map.on('dragend ', this.mapDragEnd.bind(this));
	}catch(e){
		setTimeout(this.initMapEvent.bind(this), 500);
	}
};
ScreenController.WsConnection.prototype.mainMenuTouch=function(N){
	this.showMenu(N+1);
};
ScreenController.WsConnection.prototype.mainMenuClick=function(param){
	var screenName=$(param.currentTarget).attr("name");
	var screenIndex=screenName.split("_")[1];
	this.showMenu(screenIndex);
	
//	this.mainSliderPosDex(screenIndex-1);
//	setTimeout(function(){
//		this.showMenu(screenIndex);
//	}.bind(this), 500);
	
	
};
ScreenController.WsConnection.prototype.returnBtnClick=function(index){
	this.showMenu(0);
	$(".returnBtn").css('display','none');
};

ScreenController.WsConnection.prototype.showMenu=function(index){
	$(".main").css("display","none");
	$(".main:eq("+index+")").css("display","block");
	$(".returnBtn").css('display','block');
};

////////////////screen1 start////////////////////
ScreenController.WsConnection.prototype.screen1NavClick=function(tabName){
	
};
ScreenController.WsConnection.prototype.screen1CreateRegions=function(){
	var regions=LSMConsts.allAreas;
	var screen1=$("#screen1_regionkpi");
	screen1.empty();
	for(var i=0;i<regions.length;i++){
		var record=regions[i];
		var region=record.name;
		var btn=document.createElement("li");
		var a=document.createElement("a");
		$(btn).addClass("dropdown");
		$(a).addClass("tabli");
		$(a).addClass("s1navtop");
		$(a).text(region);
		$(a).attr("href","#");
		$(btn).on('click',this.screen1RegionClick.bind(this));
		$(btn).append(a);
		screen1.append(btn);
	}
};
ScreenController.WsConnection.prototype.screen1CreateKpis=function(parentRegion){
	var screen1=$("#screen1_regionkpi");
	screen1.empty();
	var kpis=LSMConsts.kpiChooserSource;
	for(var i=0;i<kpis.length;i++){
		var kpiName=kpis[i].kpiName;
		var btn=document.createElement("li");
		var a=document.createElement("a");
		$(btn).attr("name",i);
		$(btn).addClass("dropdown");
		$(a).addClass("tabli");
		$(a).addClass("s1navtop");
		$(a).text(kpiName);
		$(a).attr("href","#");
		$(btn).on('click',this.screen1KpiClick.bind(this));
		$(btn).append(a);
		screen1.append(btn);
	}
//	var returnBtn=document.createElement("button");
//	$(returnBtn).on('click',this.screen1CreateRegions.bind(this));
//	$(returnBtn).addClass("btn btn-primary regionBtn");
//	$(returnBtn).text("返回");
//	screen1.append(returnBtn);
	
};
ScreenController.WsConnection.prototype.screen1RegionClick=function(param){
	var region=$(param.currentTarget).text();
	this.screen1CreateKpis();
	this.initSceneAndSub(region);
	this.sendCommand("screen1_changeRegion('"+region+"')");
};
ScreenController.WsConnection.prototype.screen1TabClick=function(param){
	var tab=$(param.currentTarget).text();
	this.sendCommand("screen1_changeTab('"+tab+"')");
};
ScreenController.WsConnection.prototype.screen1MainHotClick=function(param){
	$(".scene0").find("div").css("display","none");
	var divsJQ=$(param.currentTarget).parent().find("div");
	if(divsJQ.css("display")=="none"){
		divsJQ.css("display","block");
	}else{
		divsJQ.css("display","none");
	}
};
ScreenController.WsConnection.prototype.screen1SubClick=function(param){
	var sub=$(param.currentTarget).text();
	var parentHot=$(param.currentTarget).attr("name");
	var divsJQ=$(param.currentTarget).parent().find("div");
	for(var i=0;i<divsJQ.length;i++){
		var divJQ=$(divsJQ[i]);
		if(divJQ.text()==sub){
			divJQ.addClass("subSelected");
		}else{
			divJQ.removeClass("subSelected");
		}
	}
	this.sendCommand("screen1_changeSub('"+sub+"','"+parentHot+"')");
};
ScreenController.WsConnection.prototype.screen1KpiClick=function(param){
	var kpi=$(param.currentTarget).attr("name");
	this.sendCommand("screen1_changeKpi('"+kpi+"')");
};


////////////////screen1 end////////////////////
////////////////screen2 start////////////////////

ScreenController.WsConnection.prototype.screen2LocateClick=function(param){
	var spot=$(param.currentTarget).text();
	this.sendCommand("screen2_changeLocate('"+spot+"')");
};
ScreenController.WsConnection.prototype.screen2LayerClick=function(param){
	var layer=$(param.currentTarget).text();
	$(".screen2Btn_2 a").removeClass("aNavSelected");
	$(param.currentTarget).addClass("aNavSelected");
	if(layer=="文件管理"){
		this.showFileManagerWin();
	}else{
		this.sendCommand("screen2_changeLayer('"+layer+"')");
	}
	
};

ScreenController.WsConnection.prototype.showFileManagerWin=function(){
	var titleHeight=50;
	var winWidth=$(document).width();
	var winHeight=$(document).height();
	this.fileManagerWin=new LSMScreen.SimpleWindow({
		title:"文件管理",
		width:winWidth,
		height:winHeight,
		x:0,
		y:0,
		beforeClose:function(){
			
		}.bind(this)
	});
	$(this.fileManagerWin.content).html('<iframe style="width:'+winWidth+'px;height:'+(winHeight-titleHeight)+'px;" frameborder="no" src="common/fileOrder.jsp"></iframe>');
//	var url=this.serviceUrl+"/FileManager?opt=list";
//	SUtils.crossSafeAjax({
//  		type:"GET",
//  		async:false,
//  		dataType:"application/json",
//  		contentType:"application/json",
//  		processData:false,
//  		url:encodeURI(_url),
//  		success : function(result_) 
//  		{
//  			
//  		},
//  		error:function(){
//  			
//  		}
//	});
//	$(win.content).append(gridDom);
};

ScreenController.WsConnection.prototype.mapZoomEnd=function(param){
	var iframe=$("#map")[0];
	var iframeWindow=iframe.window?iframe.window:iframe.contentWindow;
	
	var zoom=iframeWindow.map.getZoom();
	var lat=iframeWindow.map.getCenter().lat;
	var lng=iframeWindow.map.getCenter().lng;
	this.sendCommand("screen2_setLocAndLv("+lat+","+lng+","+zoom+")");
};
ScreenController.WsConnection.prototype.mapDragEnd=function(param){
	var iframe=$("#map")[0];
	var iframeWindow=iframe.window?iframe.window:iframe.contentWindow;
	
	var zoom=iframeWindow.map.getZoom();
	var lat=iframeWindow.map.getCenter().lat;
	var lng=iframeWindow.map.getCenter().lng;
	this.sendCommand("screen2_setLocAndLv("+lat+","+lng+","+zoom+")");
};
ScreenController.WsConnection.prototype.reorderFiles=function(){
	this.sendCommand("screen2_reorderFiles()");
};
////////////////screen2 end////////////////////
////////////////screen3 start////////////////////

ScreenController.WsConnection.prototype.screen3ChartIconClick=function(evt){
	var N=$(evt.currentTarget).attr("name");
	this.chartSliderPosDex(N);
};
ScreenController.WsConnection.prototype.screen3ChartClick=function(N){
	$(".screen3MenuIcon div").removeClass("roundIconSelected");
	$($(".screen3MenuIcon div")[N]).addClass("roundIconSelected");
	this.sendCommand("screen3_changeChart("+N+")");
};
ScreenController.WsConnection.prototype.screen3ChartDomClick=function(evt){
	var N=$(evt.currentTarget).attr("name");
	this.sendCommand("screen3_changeChart("+N+")");
	$("#screen3Menu div").removeClass("largerChart");
	$($("#screen3Menu div")[N]).addClass("largerChart");
};

ScreenController.WsConnection.prototype.screen3TypeClick=function(param){
	var type=$(param.currentTarget).text();
	$(".screen3Btn a").removeClass("aNavSelected");
	$(param.currentTarget).addClass("aNavSelected");
	this.sendCommand("screen3_changeType('"+type+"')");
};

////////////////screen3 end////////////////////

////////////接收端方法/////////////////
ScreenController.WsConnection.prototype.screen1_changeRegion=function(region){
	var iframe=$("#frame1")[0];
	var iframeWindow=iframe.window?iframe.window:iframe.contentWindow;
	iframeWindow.setTitle(region);
	iframeWindow.setRegionArea(region);
};

ScreenController.WsConnection.prototype.screen1_changeKpi=function(kpi){
	var iframe=$("#frame1")[0];
	var iframeWindow=iframe.window?iframe.window:iframe.contentWindow;
	iframeWindow.setKpiIndex(kpi);
};
ScreenController.WsConnection.prototype.screen1_changeTab=function(tab){
	var iframe=$("#frame1")[0];
	var iframeWindow=iframe.window?iframe.window:iframe.contentWindow;
	iframeWindow.setTab(tab);
};
ScreenController.WsConnection.prototype.screen1_changeSub=function(sub,parentHot){
	var iframe=$("#frame1")[0];
	var iframeWindow=iframe.window?iframe.window:iframe.contentWindow;
	iframeWindow.setSubArea(sub,parentHot);
};


ScreenController.WsConnection.prototype.screen2_changeLocate=function(loc){
	var iframe=$("#frame2")[0];
	var iframeWindow=iframe.window?iframe.window:iframe.contentWindow;
	iframeWindow.locate2Target(loc);
};
ScreenController.WsConnection.prototype.screen2_changeLayer=function(layer){
	var iframe=$("#frame2")[0];
	var iframeWindow=iframe.window?iframe.window:iframe.contentWindow;
	iframeWindow.getPhoneParas2baselayerChange(layer);
};
ScreenController.WsConnection.prototype.screen2_reorderFiles=function(){
	var iframe=$("#frame2")[0];
	var iframeWindow=iframe.window?iframe.window:iframe.contentWindow;
	iframeWindow.loadFiles();
};


ScreenController.WsConnection.prototype.screen2_setLocAndLv=function(lat,lng,zoom){
	var iframe=$("#frame2")[0];
	var iframeWindow=iframe.window?iframe.window:iframe.contentWindow;
	iframeWindow.getLocationParasAndLevel(lat,lng,zoom);
};


ScreenController.WsConnection.prototype.screen3_changeChart=function(N){
	var iframe=$("#frame3")[0];
	var iframeWindow=iframe.window?iframe.window:iframe.contentWindow;
	iframeWindow.chartClick(N);
};
ScreenController.WsConnection.prototype.screen3_changeType=function(type){
	var iframe=$("#frame3")[0];
	var iframeWindow=iframe.window?iframe.window:iframe.contentWindow;
	iframeWindow.navClick(type);
};

////////////控制端方法/////////////////



