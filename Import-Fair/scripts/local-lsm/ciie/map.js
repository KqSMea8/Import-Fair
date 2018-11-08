var CIIE=CIIE||{};

CIIE.Map=function ()
{
	this.initialize.apply(this,arguments);
};
CIIE.Map.prototype.constructor=CIIE.Map;
CIIE.Map.prototype.ctx='http://localhost:8080/LsmScreen';
CIIE.Map.prototype.divId=null;
CIIE.Map.prototype.map=null;
CIIE.Map.prototype.hotspot=null;
CIIE.Map.prototype.dm=null;
CIIE.Map.prototype.heatMap=null;//热力图数据
CIIE.Map.prototype.heatKpi='用户数';//热力图数据

CIIE.Map.prototype.maintainManList=[
   {location:[31.15591, 121.80897],count:17},//机场
   {location:[31.20145, 121.33413],count:17},//机场
   {location:[31.24484, 121.44153],count:16},//酒店
   {location:[31.22992, 121.54947],count:16},//酒店
   {location:[31.21921, 121.56921],count:18},//嘉里中心
   
   {location:[31.2164, 121.57113],count:16},//左边
   {location:[31.21643, 121.57315],count:14},//指挥车
   {location:[31.21746, 121.57559],count:13},//斜边
   {location:[31.21899, 121.57422],count:12}//上边
];
CIIE.Map.prototype.commandCarList=[
	[31.2175, 121.57425]
];
CIIE.Map.prototype.emerCarList=[
   	{location:[31.21735, 121.57353],name:'MWC中心广场'},
   	{location:[31.21303674731307,121.57073980770532],name:'MWC-VIP停车场'},
   	{location:[31.22013, 121.57799],name:'3号入口厅'},
   	{location:[31.22047, 121.57184],name:'新国展N1馆应急车'}
];
CIIE.Map.prototype.cellMarkerCache=[];

CIIE.Map.prototype.switchControlPos='topleft';
CIIE.Map.prototype.switchControl=null;
CIIE.Map.prototype.heatMapLayer=null;
CIIE.Map.prototype.markersLayerExpand=null;
CIIE.Map.prototype.markersLayer2G=null;
CIIE.Map.prototype.markersLayer3G=null;
CIIE.Map.prototype.markersLayer4G=null;

CIIE.Map.prototype.markersLayerTDD=null;
CIIE.Map.prototype.markersLayerFDD=null;
CIIE.Map.prototype.markersLayerCAR=null;
CIIE.Map.prototype.markersLayerMan=null;



CIIE.Map.prototype.marker2G=null;
CIIE.Map.prototype.marker3G=null;
CIIE.Map.prototype.marker4G=null;
CIIE.Map.prototype.marker2GH=null;
CIIE.Map.prototype.marker3GH=null;
CIIE.Map.prototype.marker4GH=null;
CIIE.Map.prototype.markerYJC=null;
CIIE.Map.prototype.markerZHC=null;
CIIE.Map.prototype.markerMTM=null;

CIIE.Map.prototype.cellLacciMap={};

CIIE.Map.prototype.showInfoWins=false;

CIIE.Map.prototype.initialize=function(mapDivId,_hotspot,_ctrlPos,_ctx,_showInfoWins){
	if(_ctx!=null){
		this.ctx=_ctx;
	}
	if(_ctrlPos!=null){
		this.switchControlPos=_ctrlPos;
	}
	this.showInfoWins=_showInfoWins;
	this.hotspot=_hotspot;
	this.divId=mapDivId;
	this.dm=LSMScreen.DataManager.getInstance();
	this.initMap();
	this.initMarker();
	this.updateHotspot(_hotspot);
	this.createInfoWins();
	this.createCtrlBtns();
	this.createPlaySelector();
};
CIIE.Map.prototype.initMarker=function(){
	this.marker2G=L.icon({
        iconUrl: this.ctx+'/static/styles/local-lsm/map/2GS.png',
        iconSize: [48, 48]
    });
	this.marker3G=L.icon({
        iconUrl: this.ctx+'/static/styles/local-lsm/map/3GS.png',
        iconSize: [48, 48]
    });
	this.marker4G=L.icon({
        iconUrl: this.ctx+'/static/styles/local-lsm/map/4GS.png',
        iconSize: [48, 48]
    });
	this.marker2GH = L.icon({
        iconUrl: this.ctx+'/static/styles/local-lsm/map/2GH.png',
        iconSize: [48, 48]
    });
	this.marker3GH = L.icon({
        iconUrl: this.ctx+'/static/styles/local-lsm/map/3GH.png',
        iconSize: [48, 48]
    });
	this.marker4GH = L.icon({
        iconUrl: this.ctx+'/static/styles/local-lsm/map/4GH.png',
        iconSize: [48, 48]
    });
    this.markerYJC = L.icon({
        iconUrl: this.ctx+'/static/styles/local-lsm/map/emergencyCar.png',
        iconSize: [128,128]
    });
    this.markerZHC = L.icon({
        iconUrl: this.ctx+'/static/styles/local-lsm/map/commandcar.png',
        iconSize: [128,128]
    });
    
    this.markerMTM = L.icon({
        iconUrl: this.ctx+'/static/styles/local-lsm/map/maintainman.png',
        iconSize: [48,48]
    });
    this.marker4G_FDD = L.icon({
        iconUrl: this.ctx+'/static/styles/local-lsm/map/4GS_FDD.png',
        iconSize: [48, 48]
    });
    this.marker4G_NBIOT = L.icon({
        iconUrl: this.ctx+'/static/styles/local-lsm/map/4GS_NBIOT.png',
        iconSize: [48, 48]
    });
    this.marker4G_ONELTE = L.icon({
        iconUrl: this.ctx+'/static/styles/local-lsm/map/4GS_ONELTE.png',
        iconSize: [48, 48]
    });
    this.marker4G_WRJ = L.icon({
        iconUrl: this.ctx+'/static/styles/local-lsm/map/4GS_WRJ.png',
        iconSize: [100, 100]
    });
    this.marker4G_TDD = L.icon({
        iconUrl: this.ctx+'/static/styles/local-lsm/map/4GS_TDD.png',
        iconSize: [48, 48]
    });
    
    for(var i=1;i<=18;i++){
    	this['markerMM_'+i] = L.icon({
            iconUrl: this.ctx+'/static/styles/local-lsm/map/MM_'+i+'.png',
            iconSize: [48, 48]
        });
    }
	
};

CIIE.Map.prototype.initMap=function(){
	var southWest = L.latLng(31.959115, 122.3702),
    northEast = L.latLng(30.237952, 120.753598),
    bounds = L.latLngBounds(southWest, northEast);
	 //初始化地图
	 this.map = new L.map(this.divId,{
	     minZoom: 11,
	     maxZoom: 18,
	     crs: L.CRS.BEPSG3857,
	     contextmenu: true,
	     maxBounds: bounds,
	     zoomControl: false,
	     attributionControl: false,
	     doubleClickZoom:false
	 // });
	 });//.setView([lat,lon], 17);
	 
	var baseLayer=L.tileLayer.baiduLayer('customLayerSatSH.Map').addTo(this.map);
	 
	var baseLayers = {
		'地图':baseLayer
    };
    
    this.map.on('zoomend', this.rerenderHeatMap.bind(this));//重新绘制热力图
    this.map.on('overlayremove', this.layerUnselected.bind(this));
    this.map.on('overlayadd', this.layerSelected.bind(this));
    this.map.on('click', this.showMapPosition.bind(this));
    
    this.initLayers();
    
};
CIIE.Map.prototype.initLayers=function(){
	if(this.map.hasLayer(this.markersLayer2G)) this.map.removeLayer(this.markersLayer2G);
	if(this.map.hasLayer(this.markersLayerTDD)) this.map.removeLayer(this.markersLayerTDD);
	if(this.map.hasLayer(this.markersLayerFDD)) this.map.removeLayer(this.markersLayerFDD);
	if(this.map.hasLayer(this.markersLayerCAR)) this.map.removeLayer(this.markersLayerCAR);
	if(this.map.hasLayer(this.markersLayerMan)) this.map.removeLayer(this.markersLayerMan);
	if(this.map.hasLayer(this.markerClusters)) this.map.removeLayer(this.markerClusters);
	if(this.map.hasLayer(this.heatMapLayer)) this.map.removeLayer(this.heatMapLayer);
	
	this.markersLayer2G = new L.featureGroup();
	this.markersLayerTDD = new L.featureGroup();
	this.markersLayerFDD = new L.featureGroup();
	this.markersLayerCAR = new L.featureGroup();
	this.markersLayerMan = new L.featureGroup();
	this.markerClusters = L.markerClusterGroup({
        chunkedLoading: true, maxClusterRadius: 50, /*disableClusteringAtZoom: 17,*/ zoomToBoundsOnClick: true, spiderfyOnMaxZoom: true
    });
};
CIIE.Map.prototype.showMapPosition=function(e){
	console.log(e.latlng);
};
CIIE.Map.prototype.layerSelected=function(e){
	var layerName = e.name;
	switch(layerName){
		case '应用小类业务量TOP5':
			this.infoWin0.show();
			break;
		case '高流量小区TOP5':
			this.infoWin1.show();
			break;
		case '低LTE无线接通率TOP5':
			this.infoWin2.show();
			break;
		case '低GSM无线接通率TOP5':
			this.infoWin3.show();
			break;
		case '回放功能':
			$('#conditionsSelect').css('display','block');
			break;
	}
};
CIIE.Map.prototype.layerUnselected=function(e){
	var layerName = e.name;
	switch(layerName){
		case '应用小类业务量TOP5':
			this.infoWin0.hide();
			break;
		case '高流量小区TOP5':
			this.infoWin1.hide();
			break;
		case '低LTE无线接通率TOP5':
			this.infoWin2.hide();
			break;
		case '低GSM无线接通率TOP5':
			this.infoWin3.hide();
			break;
		case '回放功能':
			$('#conditionsSelect').css('display','none');
			break;
	}
};
CIIE.Map.prototype.createPlaySelector=function(){
	var html='<div id="conditionsSelect" class="img-preview" style="display: none;top:230px;left:1960px;z-index:2;">'
				+'<div id="conditionsSelectTitleBar" style="cursor:pointer;width: 100%; border-bottom: 1px solid gray;border-radius:20px;">'
					+'<span id="timeNow" style="line-height: 30px; margin-left: 10px;">--</span>'
					+'<div id="conditionsSelect_winclose" class="map-icon-close" style="float:right;width:24px;height:24px;margin-right:5px;margin-top:5px;"></div>'
					//+'<img id="conditionsSelect_winctrl" alt="最小化" title="最小化" src="'+this.ctx+'/static/styles/local-lsm/map/minimize.jpg" style="float: right; margin-right: 10px; cursor: pointer; margin-top: 6px;"  />'
				+'</div>'
				+'<div class="div-custom-wx">'
					+'<span>指标选择：</span>'
					+'<select id="indexSelect" class="selectpicker" style="display: inline-block;" AUTOCOMPLETE="off">'
						+'<option value="用户数">用户数（人）</option>'
						+'<option value="4G流量">4G流量（MB）</option>'
						+'<option value="VOLTE话务量">VOLTE话务量（Erl）</option>'
						+'<option value="GSM话务量">GSM话务量（Erl）</option>'
					+'</select>'
				+'</div>'
				+'<div class="div-custom-wx" id="timeInterval" style="display: block;">'
					+'<span>时间粒度：</span>'
					+'<select id="timeIntervalSelect" class="selectpicker" style="display: inline-block;">'
						+'<option value="5">5分钟</option>'
						+'<option value="15">15分钟</option>'                   
						+'<option value="30">30分钟</option>'
						+'<option value="60">1小时</option>'                   
					+'</select>'
				+'</div>'
				+'<div id="timeEndDiv"  class="div-custom-wx" style="display: block;">'
					+'<span>开始时间：</span>'
					+'<input type="text" id="timeBeginSelect" name="date" onfocus="WdatePicker({dateFmt:\'yyyy-MM-dd HH:00:00\'})" class="Wdate" value="" style="display: inline-block;" />'
				+'</div>'
				+'<div class="div-custom-wx">'
					+'<span id="modifyTimeName">结束时间：</span>'
					+'<input type="text" id="timeEndSelect" name="date" onfocus="WdatePicker({dateFmt:\'yyyy-MM-dd HH:00:00\'})" class="Wdate" value="" style="display: inline-block;" />'
				+'</div>'
				+'<div class="div-custom-wx">'
					//+'<span><input type="checkbox" id="playOrNot" placeholder="" value="回放" />&nbsp;回放</span>'
					+'<center>'
						+'<input type="button" id="querySelect" class="btn btn-info" value="播 放" placeholder=""  />'
						//+'<input type="button" id="playSelect" class="btn btn-primary" value="播 放" placeholder="" style="display: none;" />'
					+'</center>'
				+'</div>'
			+'</div>';
	
	$('#'+this.divId).parent().append(html);
	$('#conditionsSelect_winctrl').on('click',this.playSelectorCtrl.bind(this));
	$('#conditionsSelect_winclose').on('click',this.hideSelectorCtrl.bind(this));
	
	$('#querySelect').on('click',this.playSelectorQuery.bind(this));
	$('#indexSelect').on('change',this.playSelectorKpiChange.bind(this));
	
	$('#conditionsSelectTitleBar').on('mousedown',this.conditionsSelectTitleBarMouseDown.bind(this));
	
	var date=new Date();
	$('#timeEndSelect').val(date.Format('yyyy-MM-dd hh:mm:00'));
	date.setHours(date.getHours()-1);
	$('#timeBeginSelect').val(date.Format('yyyy-MM-dd hh:mm:00'));
	
	//this.playSelectorCtrl();
	
	//$('#playSelect').on('click',this.playSelectorPlay.bind(this));
};
CIIE.Map.prototype.conditionsSelectTitleBarMouseDown=function(e){
	this.conditionsSelectLeft=$('#conditionsSelect').css('left').replace('px','');
	this.conditionsSelectTop=$('#conditionsSelect').css('top').replace('px','');
	this.pageX=e.pageX;
	this.pageY=e.pageY;
	
	$(document).on('mousemove',this.conditionsSelectTitleBarMove.bind(this));
	$(document).on('mouseup',this.conditionsSelectTitleBarMouseUp.bind(this));
};
CIIE.Map.prototype.conditionsSelectTitleBarMouseUp=function(e){
	$(document).off('mousemove');
	$(document).off('mouseup');
};
CIIE.Map.prototype.conditionsSelectTitleBarMove=function(e){
	var pageX=e.pageX;
	var pageY=e.pageY;
	
	var deltaX=pageX-this.pageX;
	var deltaY=pageY-this.pageY;
	
	var left=this.conditionsSelectLeft*1+deltaX*1;
	var top=this.conditionsSelectTop*1+deltaY*1;
	
	$('#conditionsSelect').css('left',left+'px');
	$('#conditionsSelect').css('top',top+'px');
	
	console.log(left+','+top);
	
};
CIIE.Map.prototype.hideSelectorCtrl=function(e){
	$('#conditionsSelect').css('display','none');
	$('.ctrlIconREPLAY').parent().removeClass('mapCtrlItemSelected');
};
CIIE.Map.prototype.playSelectorKpiChange=function(e){
	var kpi=$(e.currentTarget).val();
	$('#timeIntervalSelect>option').removeAttr('disabled');
	if(kpi=='GSM话务量'){
		$('#timeIntervalSelect>option:lt(3)').attr('disabled','disabled');//disabled="disabled"
		$('#timeIntervalSelect').val(60);
	}else if(kpi=='VOLTE话务量'){
		$('#timeIntervalSelect>option:lt(1)').attr('disabled','disabled');
		if($('#timeIntervalSelect').val()<15){
			$('#timeIntervalSelect').val(15);
		}
	}
	
};
CIIE.Map.prototype.playSelectorCtrl=function(e){
	var title = $('#conditionsSelect_winctrl').attr('title');
    // console.log(title);
    if(title == '最小化') {
    	var normal=this.ctx+'/static/styles/local-lsm/map/returnNormal.png';
        $('#conditionsSelect').children().each(function(i,ele) {
            if(i == 0) {
            	$('#conditionsSelect_winctrl').attr('title', '最大化');
            	$('#conditionsSelect_winctrl').attr('src', normal);
                return;
            };
            $(this).css('display', 'none');
        });
    }else {
    	var mini=this.ctx+'/static/styles/local-lsm/map/minimize.jpg';
        $('#conditionsSelect').children().each(function(i,ele) {
            if(i == 0) {
            	$('#conditionsSelect_winctrl').attr('title', '最小化');
            	$('#conditionsSelect_winctrl').attr('src', mini);
                return;
            };
            $(this).css('display', 'block');
        });
    }
};

CIIE.Map.prototype.playSelectorQuery=function(e){
	var type=$(e.currentTarget).val();
//	updateHeat
	this.heatKpi=$('#indexSelect').val();
	if(type=="查 询"){
		var time=$('#timeEndSelect').val();
		time = time.replace(/-/g,"/");
		var date = new Date(time);
		var period=$('#timeIntervalSelect').val();
		var min=date.getMinutes()*1+period*1;
		min=Math.floor(min/period)*period;
		date.setMinutes(min);
		time=date.Format('yyyy-MM-dd hh:mm:00');
		this.updateHeat(time);
	}else if(type=="播 放"){
		var startTime=$('#timeBeginSelect').val();
		var endTime=$('#timeEndSelect').val();
		var period=$('#timeIntervalSelect').val();
		
		startTime = startTime.replace(/-/g,"/");
		endTime = endTime.replace(/-/g,"/");
		var startDate = new Date(startTime);
		var endDate = new Date(endTime);
		
		this.heatStartDate=startDate;
		this.heatEndDate=endDate;
		this.heatPeriod=period;
		this.initProgress();
		$('#querySelect').val('停 止');
		$('#heatProgress').css('display','block');
		this.playHeat();
		
	}else if(type=="停 止"){
		$('#querySelect').val('播 放');
		clearTimeout(this.playHeatKey);
		$('#heatProgress').css('display','none');
	}
};
CIIE.Map.prototype.initProgress=function(){
	var time=this.heatStartDate.Format('yyyy-MM-dd hh:mm:00');
	var min=this.heatStartDate.getMinutes()*1;
	min=Math.floor(min/this.heatPeriod)*this.heatPeriod;
	this.heatStartDate.setMinutes(min);
	
	var time=this.heatEndDate.Format('yyyy-MM-dd hh:mm:00');
	var min=this.heatEndDate.getMinutes()*1;
	min=Math.floor(min/this.heatPeriod)*this.heatPeriod;
	this.heatEndDate.setMinutes(min);
	
	var copyStart=new Date(this.heatStartDate.getTime());
	var copyEnd=new Date(this.heatEndDate.getTime());
	
	this.progressStart=new Date(this.heatStartDate.getTime());
	
	var html='';
	var count=0;
	while(copyStart.getTime()<=copyEnd.getTime()){
		var time=copyStart.Format('hh:mm');
		if(count==0){
			html+='<div style="float:left;width:90px;color:#00ff00;"><div class="icon-played" style="margin-left:21px;"></div>'+time+'</div>';
		}else{
			html+='<div style="float:left;width:90px;"><div class="icon-unplay" style="margin-left:21px;"></div>'+time+'</div>';
		}
		
		var min=copyStart.getMinutes()*1+this.heatPeriod*1;
		copyStart.setMinutes(min);
		count++;
	}
	var width=90*count;
	var bar='<div style="width:'+(width-80)+'px;height:8px;background:#ffffff;position:absolute;top:24px;left:40px;"><div id="progressGreen" style="height:100%;width:0;background:#00ff00;"></div></div>'
	html=bar+'<div style="position:absolute;left:0;top:10px;width:'+width+'px;">'+html+'</div>';
	$('#heatProgress').html(html);
};
CIIE.Map.prototype.updateProgress=function(){
//	progressGreen
	var deltaAll=this.heatEndDate.getTime()-this.progressStart.getTime();
	var deltaNow=this.heatEndDate.getTime()-this.heatStartDate.getTime();
	var ratio=(deltaAll-deltaNow)/deltaAll;
	var percent=ratio*100;
	var length=$('#progressGreen').parent().width()*ratio;
	$('#progressGreen').width(percent+'%');
	if(length>$('#heatProgress').width()/2){
		var step=this.heatPeriod*60*1000/deltaAll*$('#progressGreen').parent().width();
		$('#heatProgress').animate({scrollLeft:'+='+step},1000);
	}
	var domJq=$('.icon-unplay:eq(0)');
	domJq.removeClass('icon-unplay');
	domJq.addClass('icon-played');
	domJq.parent().css('color','#00ff00');
};
CIIE.Map.prototype.updatePlaySelectorTime=function(data){
	if(data!=null){
		for(var lacci in data){
			if(data[lacci]!=null){
				if(data[lacci].time!=null){
					$('#timeNow').text(data[lacci].time);
					break;
				}
			}
		}
	}
};
CIIE.Map.prototype.playHeat=function(data){
	if($('#querySelect').val()=='停 止'){
		this.updatePlaySelectorTime(data);
		var time=this.heatStartDate.Format('yyyy-MM-dd hh:mm:00');
		var min=this.heatStartDate.getMinutes()*1+this.heatPeriod*1;
		min=Math.floor(min/this.heatPeriod)*this.heatPeriod;
		this.heatStartDate.setMinutes(min);
		time=this.heatStartDate.Format('yyyy-MM-dd hh:mm:00');
		this.updateProgress();
		if(this.heatStartDate.getTime()<this.heatEndDate.getTime()){
			this.playHeatKey=setTimeout(function(){this.updateHeat.apply(this,[time,this.playHeat.bind(this)]);}.bind(this),3000);
			//this.updateHeat(time,this.playHeat.bind(this));
		}else{
			$('#querySelect').val('播 放');
			$('#heatProgress').css('display','none');
		}
	}
};
CIIE.Map.prototype.createCtrlBtns=function(){
	
	var btnList='<div id="ctrlResource" class="mapCtrlContent" style="position:absolute;right:30px;bottom:30px;display:none;">'
					+'<div style="width:100%;">'
						+'<div class="mapCtrlItem mapCtrlItemSelected"><div class="ctrlIcon2G"></div><div>2G小区</div><div style="clear:both;"></div></div>'
						+'<div class="mapCtrlItem mapCtrlItemSelected"><div class="ctrlIconFDD"></div><div>FDD小区</div><div style="clear:both;"></div></div>'
						+'<div class="mapCtrlItem mapCtrlItemSelected"><div class="ctrlIconTDD"></div><div>TDD小区</div><div style="clear:both;"></div></div>'
						+'<div class="mapCtrlItem mapCtrlItemSelected"><div class="ctrlIconEMERCAR"></div><div>应急车</div><div style="clear:both;"></div></div>'
						+'<div class="mapCtrlItem mapCtrlItemSelected"><div class="map-icon-maintainman" style="width:40px;height:40px;"></div><div>保障人员</div><div style="clear:both;"></div></div>'
						+'<div class="mapCtrlItem"><div class="ctrlIconFDD"></div><div>聚合小区</div><div style="clear:both;"></div></div>'
						+'<div style="clear:both;"></div>'
					+'</div>'
				+'</div>'
				+'<div id="ctrlPerformance" class="mapCtrlContent" style="position:absolute;right:30px;bottom:30px;display:none;">'
					+'<div style="width:100%;">'
						+'<div name="咪咕视频" class="mapCtrlItem"><div class="ctrlIconTOPAPP"></div><div>咪咕视频</div><div style="clear:both;"></div></div>'
						+'<div name="应用小类业务量TOP5" class="mapCtrlItem mapCtrlItemSelected"><div class="ctrlIconTOPAPP"></div><div>应用小类业务量TOP5</div><div style="clear:both;"></div></div>'
						+'<div name="高流量小区TOP5" class="mapCtrlItem mapCtrlItemSelected"><div class="ctrlIconTOPFLOW"></div><div>高流量小区TOP5</div><div style="clear:both;"></div></div>'
						+'<div name="低LTE无线接通率TOP5" class="mapCtrlItem"><div class="ctrlIconLOWLTECONN"></div><div>低LTE无线接通率TOP5</div><div style="clear:both;"></div></div>'
						+'<div name="低GSM无线接通率TOP5" class="mapCtrlItem"><div class="ctrlIconLOWGSMCONN"></div><div>低GSM无线接通率TOP5</div><div style="clear:both;"></div></div>'
						+'<div style="clear:both;"></div>'
					+'</div>'
				+'</div>'
				+'<div id="ctrlFunction" class="mapCtrlContent" style="position:absolute;right:30px;bottom:30px;display:none;">'
					+'<div style="width:100%;">'
						+'<div class="mapCtrlItem"><div class="ctrlIconREPLAY"></div><div>回放功能</div><div style="clear:both;"></div></div>'
						+'<div class="mapCtrlItem mapCtrlItemSelected"><div class="ctrlIconHEAT"></div><div>热力图层</div><div style="clear:both;"></div></div>'
						+'<div style="clear:both;"></div>'
					+'</div>'
				+'</div>'
				+'<div title="资源图层" target="ctrlResource" class="ctrlResource mapCtrlBtns" style="position:absolute;right:30px;bottom:170px;"></div>'
				+'<div title="性能列表" target="ctrlPerformance" class="ctrlPerformance mapCtrlBtns" style="position:absolute;right:30px;bottom:100px;"></div>'
				+'<div title="热力图层" target="ctrlFunction" class="ctrlFunction mapCtrlBtns" style="position:absolute;right:30px;bottom:30px;"></div>'
	
	$('#'+this.divId).append(btnList);
	$('.mapCtrlBtns').on('click',this.ctrlBtnClick.bind(this));
	$('.mapCtrlItem').on('click',this.ctrlFuncClick.bind(this));
};
CIIE.Map.prototype.ctrlBtnClick=function(e){
	var target=$(e.currentTarget).attr('target');
	$('.mapCtrlBtns').removeClass('glowSelected');
	if($('#'+target).css('display')=='block'){
		$('#'+target).css('display','none');
	}else{
		$('.mapCtrlContent').css('display','none');
		$('#'+target).css('display','block');
		$(e.currentTarget).addClass('glowSelected');
	}
	
};
CIIE.Map.prototype.ctrlFuncClick=function(e){
	var func=$($(e.currentTarget).children()[1]).text();
	var isToOff=$(e.currentTarget).hasClass('mapCtrlItemSelected');
	if(isToOff){
		$(e.currentTarget).removeClass('mapCtrlItemSelected');
		switch(func){
			case '咪咕视频':
				this.infoWin00.hide();
				break;
			case '应用小类业务量TOP5':
				this.infoWin0.hide();
				break;
			case '高流量小区TOP5':
				this.infoWin1.hide();
				break;
			case '低LTE无线接通率TOP5':
				this.infoWin2.hide();
				break;
			case '低GSM无线接通率TOP5':
				this.infoWin3.hide();
				break;
			case '回放功能':
				$('#conditionsSelect').css('display','none');
				break;
			case '2G小区':
				this.map.removeLayer(this.markersLayer2G);
				break;
			case 'FDD小区':
				this.map.removeLayer(this.markersLayerFDD);
				break;
			case 'TDD小区':
				this.map.removeLayer(this.markersLayerTDD);
				break;
			case '聚合小区':
				this.map.removeLayer(this.markerClusters);
				break;
			case '应急车':
				this.map.removeLayer(this.markersLayerCAR);
				break;
			case '保障人员':
				this.map.removeLayer(this.markersLayerMan);
				break;
			case '热力图层':
				this.map.removeLayer(this.heatMapLayer);
				break;
		}
	}else{
		$(e.currentTarget).addClass('mapCtrlItemSelected');
		switch(func){
			case '咪咕视频':
				this.infoWin00.show();
				break;
			case '应用小类业务量TOP5':
				this.infoWin0.show();
				break;
			case '高流量小区TOP5':
				this.infoWin1.show();
				break;
			case '低LTE无线接通率TOP5':
				this.infoWin2.show();
				break;
			case '低GSM无线接通率TOP5':
				this.infoWin3.show();
				break;
			case '回放功能':
				$('#conditionsSelect').css('display','block');
				break;
			case '2G小区':
				this.map.addLayer(this.markersLayer2G);
				break;
			case 'FDD小区':
				this.map.addLayer(this.markersLayerFDD);
				break;
			case 'TDD小区':
				this.map.addLayer(this.markersLayerTDD);
				break;
			case '聚合小区':
				this.map.addLayer(this.markerClusters);
				break;
			case '应急车':
				this.map.addLayer(this.markersLayerCAR);
				break;
			case '保障人员':
				this.map.addLayer(this.markersLayerMan);
				break;
			case '热力图层':
				this.map.addLayer(this.heatMapLayer);
				break;
		}
	}
	
};

CIIE.Map.prototype.ctrlBtnHover=function(e){
	$('.mapCtrlContent').css('display','block');
};
CIIE.Map.prototype.ctrlBtnHoverOut=function(e){
	$('.mapCtrlContent').css('display','none');
};
CIIE.Map.prototype.createInfoWins=function(){
	var legendWidth=$('#'+this.divId).width()*0.8;
	var legendHeight=legendWidth/1630*50;
	var legend='<div class="maplegend" style="width:'+legendWidth+'px;height:'+legendHeight+'px;position:absolute;left:'+$('#'+this.divId).width()*0.1+'px;bottom:0px;"></div>';
	//$('#'+this.divId).append(legend);
	
	var progress='<div id="heatProgress" class="maintainCount" style="left:50%;margin-left:-575px;bottom:140px;width:1150px;height:110px;overflow:hidden;display:none;">'
				
				+'</div>';
	$('#'+this.divId).append(progress);
	
	
	var maintainCount='<div class="maintainCount">'
					+'<div class="map-icon-maintainman"></div>'
					+'<div class="">保障人员</div>'
					+'<div id="map-icon-maintainman" class="" style="color:#00fcff">139</div>'
					+'<div class="">人</div>'
					+'<div class="map-icon-emercar" style="margin-left:30px;"></div>'
					+'<div class="">应急车</div>'
					+'<div id="map-icon-emercar" class="" style="color:#00fcff">3</div>'
					+'<div class="">辆</div>'
					+'<div class="map-icon-commandcar" style="margin-left:30px;"></div>'
					+'<div class="">指挥车</div>'
					+'<div id="map-icon-commandcar" class="" style="color:#00fcff">1</div>'
					+'<div class="">辆</div>'
					+'</div>';
	$('#'+this.divId).append(maintainCount);
	
	
	
	
	var cellCount='<div id="cellCount" style="position:absolute;width:400px;height:90px;top:100px;right:30px;"><div class="map-info-win-bg0"></div>'
		+'<div class="map-info-win-content" style="font-size:1.6em;height:100%;text-align:left;padding:5px 5px 5px 15px;">'
		+'<div><span>2G小区数:</span>&nbsp;&nbsp;<span id="cellCount_2g" style="color:#fafe46;display:inline-block;width:55px;">--</span><span style="color:#0c076d;">&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;</span><span>2G退服小区数:</span>&nbsp;&nbsp;<span id="cellCount_2g_retire" style="color:#fafe46;">0</span></div>'
		+'<div><span>4G小区数:</span>&nbsp;&nbsp;<span id="cellCount_4g" style="color:#fafe46;display:inline-block;width:55px;">--</span><span style="color:#0c076d;">&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;</span><span>4G退服小区数:</span>&nbsp;&nbsp;<span id="cellCount_4g_retire" style="color:#fafe46;">0</span></div>'
		+'</div>'
		+'</div>';
	$('#'+this.divId).append(cellCount);
	 
	$('#cellCount').on('click',this.resetCenter.bind(this));
	
	var infoWinList='<div id="infoWinList" style="width:42em;position:absolute;top:155px;left:10px;"></div>';
	
	$('#'+this.divId).append(infoWinList);
	
	var parentDom=$('#infoWinList')[0];
	
	this.infoWin00=new CIIE.MapInfoWin('咪咕视频',parentDom,this.infoWinClosed.bind(this));
	this.infoWin0=new CIIE.MapInfoWin('应用小类业务量TOP5',parentDom,this.infoWinClosed.bind(this));
	this.infoWin1=new CIIE.MapInfoWin('高流量小区TOP5',parentDom,this.infoWinClosed.bind(this));
	this.infoWin2=new CIIE.MapInfoWin('低LTE无线接通率TOP5',parentDom,this.infoWinClosed.bind(this));
	this.infoWin3=new CIIE.MapInfoWin('低GSM无线接通率TOP5',parentDom,this.infoWinClosed.bind(this));
	
	setInterval(this.updateInfoWin.bind(this),5*60*1000);
	
	
};
CIIE.Map.prototype.updateInfoWin=function(){
	this.updateInfoMigu();
	this.updateInfoTopFlowCell();
	this.updateInfoTopLowConnLteCell();
	this.updateInfoTopApp();
	this.updateInfoTopLowConnGsmCell();
};
CIIE.Map.prototype.infoWinClosed=function(title){
	switch(title){
	case '咪咕视频':
		this.infoWin00.hide();
		break;
	case '应用小类业务量TOP5':
		this.infoWin0.hide();
		break;
	case '高流量小区TOP5':
		this.infoWin1.hide();
		break;
	case '低LTE无线接通率TOP5':
		this.infoWin2.hide();
		break;
	case '低GSM无线接通率TOP5':
		this.infoWin3.hide();
		break;
		
	}
	$('.mapCtrlItemSelected[name='+title+']').removeClass('mapCtrlItemSelected');
};
CIIE.Map.prototype.updateInfoTopApp=function(){
	this.dm.getMinorKpisByHotspotRank({
		hotspot:this.hotspotInfo.hotCellInName,
		granularity:5,
		order:"desc",
		sortKey:"总用户数",
		exclude0:true,
		num:5
	},function(result){
		var table=this.getInfoAppRankTableIgnoreZeroAllZero(result);
		if(table!=''){
			this.infoWin0.setContentHtml(table);
		}
	}.bind(this));
};
CIIE.Map.prototype.updateInfoMigu=function(){
	this.dm.getMinorKpisByHotspot({
		hotspot:'东怡大酒店_'
	},function(result){
//		流量、人数、视频响应成功率、视频响应时延
		var record=result['咪咕视频'];
		var html='<table class="mapInfoTable" style="margin-top:20px">';
		html+='<tr>'
			+'<td>用户数(人)</td>'
			+'<td>'+record['总用户数']+'</td>'
			+'</tr>';
		html+='<tr>'
			+'<td>流量(MB)</td>'
			+'<td>'+(record['总流量']/1024).toFixed(2)+'</td>'
			+'</tr>';
		html+='<tr>'
			+'<td>视频响应成功率(%)</td>'
			+'<td>'+(record['视频业务HTTP响应成功率']*100).toFixed(2)+'</td>'
			+'</tr>';
		html+='<tr>'
			+'<td>视频响应时延(ms)</td>'
			+'<td>'+(record['视频业务HTTP响应时延']*1).toFixed(0)+'</td>'
			+'</tr>';
		html+='</table>';
		this.infoWin00.setContentHtml(html);
	}.bind(this));
};
CIIE.Map.prototype.updateInfoTopFlowCell=function(){
	this.dm.getSitesKpisRank({
		hotspot:this.hotspotInfo.hotCellInName,
		order:"desc",
		sortKey:"总流量",
		num:5,
		exclude0:true
	},function(result){
		var table=this.getInfoRankTableIgnoreAllZero(result,'总流量','流量','MB',1/1024,2);
		if(table!=''){
			this.infoWin1.setContentHtml(table);
		}
	}.bind(this));
};
CIIE.Map.prototype.updateInfoTopLowConnLteCell=function(){
//	this.dm.getSitesKpisRank({
//		hotspot:this.hotspot,
//		order:"asc",
//		sortKey:"4G无线接通率",
//		num:5,
//		exclude0:true
//	},function(result){
//		var table=this.getInfoRankTable(result,'4G无线接通率','无线接通率','%',100,2);
//		$('#topLowConnLteCell').find('.map-info-win-content').html(table);
//	}.bind(this));
	
	var params={
			"hotspot":this.hotspotInfo.hotCellInName,
			"group":"cell",
			"cell_fields":"cell_name",
			"domains":"4g",
			"orderName":"lte_wireless_conn_ratio",
			"orderType":"asc",
			"topN":"5"
	};
	this.dm.getXpmData(params, 
		function(result){
			var table=this.getInfoRankTable(result,'lte_wireless_conn_ratio','无线接通率','%',1,2,'cell_name');
			this.infoWin2.setContentHtml(table);
		}.bind(this));
	
	
};
CIIE.Map.prototype.updateInfoTopLowConnGsmCell=function(){
	var params={
			"hotspot":this.hotspotInfo.hotCellInName,
			"group":"cell",
			"cell_fields":"cell_name",
			"domains":"2g",
			"orderName":"gsm_wireless_conn_ratio",
			"orderType":"asc",
			"topN":"5"
	};
	this.dm.getXpmData(params, 
		function(result){
			var table=this.getInfoRankTable(result,'gsm_wireless_conn_ratio','无线接通率','%',1,2,'cell_name');
			this.infoWin3.setContentHtml(table);
		}.bind(this));
};
CIIE.Map.prototype.getInfoRankTable=function(list,kpiKey,kpiName,unit,ratio,fixed,nameKey){
	if(nameKey==null){
		nameKey='name';
	}
	var html='<table class="mapInfoTable">';
	html+='<tr><td class="mapInfoTableHeader" style="width:70%;">小区名称</td><td class="mapInfoTableHeader">'+kpiName+'('+unit+')</td></tr>';
	for(var i=0;i<list.length;i++){
		var record=list[i];
		var cellName=record[nameKey];
		var value=record[kpiKey];
		value=(value*ratio).toFixed(fixed);
		html+='<tr><td>'+cellName+'</td><td>'+value+'</td></tr>';
	}
	html+='</table>';
	return html;
};
CIIE.Map.prototype.getInfoRankTableIgnoreAllZero=function(list,kpiKey,kpiName,unit,ratio,fixed,nameKey){
	if(nameKey==null){
		nameKey='name';
	}
	if(list.length==0||list[0][kpiKey]==0){
		return '';
	}
	var html='<table class="mapInfoTable">';
	html+='<tr><td class="mapInfoTableHeader" style="width:70%;">小区名称</td><td class="mapInfoTableHeader">'+kpiName+'('+unit+')</td></tr>';
	for(var i=0;i<list.length;i++){
		var record=list[i];
		var cellName=record[nameKey];
		var value=record[kpiKey];
		value=(value*ratio).toFixed(fixed);
		html+='<tr><td>'+cellName+'</td><td>'+value+'</td></tr>';
	}
	html+='</table>';
	return html;
};
CIIE.Map.prototype.getInfoAppRankTable=function(result){
	var list=[];
	
	for(var key in result){
		list.push(result[key]);
	}
	list.sort(function(a,b){return b["总用户数"]-a["总用户数"];});
	var html='<table class="mapInfoTable">';
	html+='<tr>'
		+'<td class="mapInfoTableHeader" style="width:10%;"></td>'
		+'<td class="mapInfoTableHeader" style="width:45%;">用户数(人)</td>'
		+'<td class="mapInfoTableHeader">流量(MB)</td>'
		+'</tr>';
	for(var i=0;i<list.length;i++){
		var record=list[i];
		var app=record['minor'];
		var user=record['总用户数'];
		var flow=(record['总流量']/1024).toFixed(2);
		var iconPath=this.ctx+"/static/styles/local-lsm/app/"+SUtils.getAppIconPath(app);
		
		html+='<tr><td><img title="'+app+'" width="25" height="25" src="'+iconPath+'"/></td><td>'+user+'</td><td>'+flow+'</td></tr>';
	}
	html+='</table>';
	return html;
};
CIIE.Map.prototype.getInfoAppRankTableIgnoreZeroAllZero=function(result){
	var list=[];
	
	for(var key in result){
		list.push(result[key]);
	}
	list.sort(function(a,b){return b["总用户数"]-a["总用户数"];});
	if(list[0]['总流量']==0){
		return '';
	}
	var html='<table class="mapInfoTable">';
	html+='<tr>'
		+'<td class="mapInfoTableHeader" style="width:10%;"></td>'
		+'<td class="mapInfoTableHeader" style="width:20%;">应用</td>'
		+'<td class="mapInfoTableHeader" style="width:35%;">用户数(人)</td>'
		+'<td class="mapInfoTableHeader">流量(MB)</td>'
		+'</tr>';
	for(var i=0;i<list.length;i++){
		var record=list[i];
		var app=record['minor'];
		var user=record['总用户数'];
		var flow=(record['总流量']/1024).toFixed(2);
		var iconPath=this.ctx+"/static/styles/local-lsm/app/"+SUtils.getAppIconPath(app);
		
		html+='<tr><td><img title="'+app+'" width="25" height="25" src="'+iconPath+'"/></td><td>'+app+'</td><td>'+user+'</td><td>'+flow+'</td></tr>';
	}
	html+='</table>';
	return html;
};
CIIE.Map.prototype.updateHotspot=function(_hotspot){
	this.hotspot=_hotspot;
	if(this.hotspotInfo==null){
		this.dm.getBaseHotspotsList(null,function(list){
			for(var i=0;i<list.length;i++){
				if(list[i].hot_name==this.hotspot){
					this.dm.getBaseHotspots({id:list[i].id,isDefault:false},function(hotInfo){
						this.hotspotInfo=JSON.parse(hotInfo[0].content);
						//hotCellInName lat lon
						
//						var lon=this.hotspotInfo.lon*1- 0.0045;
//						var lat=this.hotspotInfo.lat*1+0.0025;
//						var bdPoint = this.wgs84tobd09(lon,lat);
//						var point = bdPoint.reverse();
//						this.setView(point[0],point[1]);
						this.updateInfoWin();
						this.setView(this.hotspotInfo.lat,this.hotspotInfo.lon);
						this.getCells();
					}.bind(this));
					break;
				}
			}
			
		}.bind(this));
	}else{
		this.initLayers();
		this.getCells();
//		this.updateInfoTopFlowCell();
//		this.updateInfoTopLowConnLteCell();
//		this.updateInfoTopApp();
//		this.updateInfoTopLowConnGsmCell();
	}
	
};

CIIE.Map.prototype.resetCenter=function(){
	
//	var lon=this.hotspotInfo.lon*1- 0.0045;
//	var lat=this.hotspotInfo.lat*1+0.0025;
//	var bdPoint = this.wgs84tobd09(lon,lat);
//	var point = bdPoint.reverse();
//	this.setView(point[0],point[1]);
	
	this.setView(this.hotspotInfo.lat,this.hotspotInfo.lon);
};
CIIE.Map.prototype.setView=function(lat,lon){
	this.map.setView([lat,lon], 17);
	this.radiusHeatMap = 0.001;
};
CIIE.Map.prototype.clearLayers=function(){
	
}
CIIE.Map.prototype.getCells=function(){
	for(var i=0;i<this.maintainManList.length;i++){
		L.marker(this.maintainManList[i].location,{title: '保障人员', icon: this['markerMM_'+this.maintainManList[i].count], keepInView:false}).addTo(this.markersLayerMan);
	}
	for(var i=0;i<this.commandCarList.length;i++){
		L.marker(this.commandCarList[i],{title: '指挥车', icon: this.markerZHC, keepInView:false}).addTo(this.markersLayerCAR);
	}
	for(var i=0;i<this.emerCarList.length;i++){
		L.marker(this.emerCarList[i].location,{title: this.emerCarList[i].name, icon: this.markerYJC, keepInView:false}).addTo(this.markersLayerCAR);
	}
	
	$('#map-icon-commandcar').text(this.commandCarList.length);
	$('#map-icon-emercar').text(this.emerCarList.length);
	
//	$('#map-icon-maintainman').text(this.maintainManList.length);
//	this.dm.getEmerCarByHotspotsPost({hot_name:this.hotspot},function(result){
//		var list=result.data;
//		for(var i=0;i<list.length;i++){
//			var record=list[i];
//			var lat=record.LAT*1;
//			var lng=record.LON*1;
//			var bdPoint = this.wgs84tobd09(lng,lat);
//            var point = bdPoint.reverse();
//            console.log(record.EMER_VEHICLE_NAME+',['+point[0]+','+point[1]+']')
//			L.marker([point[0],point[1]],{title: record.EMER_VEHICLE_NAME, icon: this.markerYJC, keepInView:false}).addTo(this.markersLayerCAR);
//		}
//		 $('#map-icon-emercar').text(list.length);
//	}.bind(this));
    var url = LSMConsts.G_URLCONFIG.urlWs+'/fast_query/area/re/re_cellByHotname?hotspot=' + encodeURIComponent(this.hotspot);
    this.heatMap = []; //全局变量,存放热点图的数据
    $.ajax({
        url: url,
        type: 'get',         //数据发送方式
        dataType: 'json',     //接受数据格式
        //contentType: "application/json",
        //accessType: "application/json",
        data:{},
        beforeSend: function(XMLHttpRequest){
        },
        complete: function(XMLHttpRequest,textStatus){
        }
    })
        .done(function(origin_data){
            //console.log(data)
            if(!origin_data.length){
                //alert('暂无坐标数据');
                return;
            }
            var carCount=0;
            var detailedInfoVector = [];
            var num2g = 0,
                num3g = 0,
                num4g = 0;
            //后添加,只取1000个展示
            var data = [];
            origin_data.map(function(val){
                var disType = val.cell_nt;
                if(disType === '2G'){
                    num2g++;
                    if(num2g > 5000) return;
                    data.push(val);
                }else if(disType === '3G'){
                    num3g++;
                    if(num3g > 5000) return;
                    data.push(val);
                }else{
                    num4g++;
                    if(num4g > 3000) return;
                    data.push(val);
                }
            });
           
            console.time('getLatlng');
            
           this.cellMarkerCache=[];
            for(var i= 0, len = data.length; i<len;++i){
                if(data[i].lat && data[i].lon){
//                    var latHeatMap = parseFloat(data[i].lat + 0.0025 + this.hotspotInfo.lat),        //偏移
//                        lngHeatMap = parseFloat(data[i].lon - 0.0045 + this.hotspotInfo.lon);
                	 var latHeatMap = data[i].lat,        
                     lngHeatMap = data[i].lon;
                    var type = data[i].cell_nt;
                    
                        var bdPoint = this.wgs84tobd09(lngHeatMap,latHeatMap);
                        var point = bdPoint.reverse();
                        if(point.length !== 2) continue;
                        var lac = data[i].lac;
                        var ci = data[i].ci;
                        var lacci = lac + ':' + ci;
                        var name = data[i].cell_name;
                        var lte_type = data[i].lte_type;
                        
                        this.cellLacciMap[name]=lacci;
                        // if(name === '迪士尼北侧市政管理用房HL84H_161'){
                        //     console.log(latHeatMap,lngHeatMap);
                        // }                        
                        var hot_id = data[i].hot_id;
                        var cellType1 = data[i].cell_type;
                        if(!cellType1){
                            cellType1 = '街道站';
                        }
                        var cellType = cellType1.trim();
                        //if(name === '浦迪停车HL1H_1') console.log(data[i]);
                        //console.log(data[i].hori_direc_angle,data[i].mechanical_dip_angle)
                        if(data[i].hori_direc_angle === null || data[i].hori_direc_angle === '-') {
                            var beginAngle = 0;
                        }else{
                            var beginAngle = parseFloat(data[i].hori_direc_angle);
                        }
                        //console.log(beginAngle);
                        //beginAngle = 90-(180-beginAngle);
                        //var endAngle = parseFloat(data[i].mechanical_dip_angle);
                        var endAngle = 0;
                        // if(beginAngle > 0 && beginAngle > endAngle){
                        //     var temVal = endAngle;
                        //     endAngle = beginAngle;
                        //     beginAngle = temVal;
                        // }
                        //console.log(point);
                        var temObj = {
                            lacci: lacci,
                            id: lacci,
                            point: point,
                            name: name,
                            lte_type: lte_type,
                            lat: point[0],
                            lng: point[1],
                            type: type,
                            hot_id: hot_id,
                            cellType: cellType,
                            hori_direc_angle: beginAngle,
                            mechanical_dip_angle: endAngle
                        };
                        this.heatMap.push(temObj);//cacheHeatMapData部分值
                        
                        //小区打点//'http://localhost:8080/LsmScreen'
                        var tmp=this.ctx.split('/');
                        var urlBase=tmp[0]+'//'+tmp[2]+'/sh/shUltimate/';
//                        var urlBase='http://10.221.247.7:8080/sh/shUltimate/';
                        var lat=point[0];
	                    var lng=point[1];
	                    var hotspot=this.hotspot;
	                    var hotId=this.hotspot;
                        var heatPopup4G = L.popup({maxWidth:800,maxHeight:800,offset:L.point(0, 5),closeButton:true, closeOnClick:false})
	                        .setLatLng([lat,lng]);
	                    heatPopup4G.setContent('<iframe width="680px" ondblclick="alert();" frameborder=no height="460px" src='+urlBase+"pagesDSN/sitePieChartsBig.html?lacci="+lacci+"&hotspot="+encodeURIComponent(hotspot) + "&name=" + encodeURIComponent(name)+ "&hotid=" + encodeURIComponent(hotId) + "&end=" + '&type=' + encodeURIComponent(type) + "&endType=" + '></iframe>');
	                    var heatPopup3G = L.popup({maxWidth:800,maxHeight:800,offset:L.point(0, 5),closeButton:true, closeOnClick:false})
	                        .setLatLng([lat,lng]);
	                    heatPopup3G.setContent('<iframe width="680px" ondblclick="alert();" frameborder=no height="460px" src='+urlBase+"pagesDSN/sitePieChartsBig23G.html?lacci="+lacci+"&hotspot="+encodeURIComponent(hotspot) + "&name=" + encodeURIComponent(name)+ "&hotid=" + encodeURIComponent(hotId) + "&end=" + '&type=' + encodeURIComponent(type) + "&endType=" + '></iframe>');
	                    
	                    var heatPopup2G = L.popup({maxWidth:800,maxHeight:800,offset:L.point(0, 5),closeButton:true, closeOnClick:false})
	                        .setLatLng([lat,lng]);
	                    heatPopup2G.setContent('<iframe width="680px" ondblclick="alert();" frameborder=no height="460px" src='+urlBase+"pagesDSN/sitePieChartsBig23G.html?lacci="+lacci+"&hotspot="+encodeURIComponent(hotspot) + "&name=" + encodeURIComponent(name)+ "&hotid=" + encodeURIComponent(hotId) + "&end=" + '&type=' + encodeURIComponent(type) + "&endType=" + '></iframe>');
	                    
	                    var marker=null;
	                    
//	                    if(name.indexOf('应急车') !== -1){
//	                    	carCount++;
//	                    	marker=L.marker([lat,lng],{title: name, icon: this.markerYJC, keepInView:false}).bindPopup(heatPopup2G).addTo(this.markersLayerCAR);
//	                        continue;
//	                    }
//	                    if(name.indexOf('嘉里中心')==-1) continue;
                        if(type === '4G'){
                        	if (lte_type === "FDD") {
                        		marker=L.marker([lat,lng],{title: name, icon: this.marker4G_FDD, keepInView:false}).bindPopup(heatPopup4G).addTo(this.markersLayerFDD);
                        		marker.addTo(this.markerClusters);
                            }else if (lte_type === "TDD") {
                            	marker=L.marker([lat,lng],{title: name, icon: this.marker4G_TDD, keepInView:false}).bindPopup(heatPopup4G).addTo(this.markersLayerTDD);
                            	marker.addTo(this.markerClusters);
                            }
                        }else if(type === '3G'){
                        }else{
                        	marker=L.marker([lat,lng],{title: name, icon: this.marker2G, keepInView:false}).bindPopup(heatPopup3G).addTo(this.markersLayer2G);
                        	marker.addTo(this.markerClusters);
                        }
                        
                        if(marker!=null){
                        	//marker.on('click',this.iconClick.bind(this));
                        }
                        this.cellMarkerCache.push(marker);
                }else{
                    continue;
                }
            }
            console.timeEnd('getLatlng');
            this.updateHeat();
            
            
            
            
            this.map.addLayer(this.markersLayer2G);
            
            this.map.addLayer(this.markersLayerTDD);
            this.map.addLayer(this.markersLayerFDD);
            this.map.addLayer(this.markersLayerCAR);
            this.map.addLayer(this.markersLayerMan);
            
            
            
            
            $('.leaflet-marker-icon').on('dblclick',this.iconClick.bind(this));
           // $('#map-icon-emercar').text(carCount);
            
            if(this.showInfoWins){
//                this.infoWin00.show();
                this.infoWin0.show();
                this.infoWin1.show();
//                this.infoWin2.show();
            }
            
            
            
            $('#cellCount_4g').text(num4g);
            $('#cellCount_3g').text(num3g);
            $('#cellCount_2g').text(num2g);
        }.bind(this));
};

CIIE.Map.prototype.iconClick=function(e){
	if(e.target.originLat!=null){//已经展开
		return;
	}
	var i=0;
	var list=this.cellMarkerCache;
	//收起所有
	for(i=0;i<list.length;i++){
		var marker=list[i];
		if(marker.originLat!=null&&marker.originLng!=null){
			marker.setLatLng([marker.originLat,marker.originLng]);
			marker._icon.className=marker._icon.className.replace(' mapMarkerHighlight','');
			marker.originLat=null;
			marker.originLng=null;
		}
	}
	
	var size=this.map.getSize();
	var bounds=this.map.getBounds();
	
	var width=size.x;
	var height=size.y;
	
	var latDelta=Math.abs(bounds._northEast.lat-bounds._southWest.lat);
	var lngDelta=Math.abs(bounds._northEast.lng-bounds._southWest.lng);
	
	var latPerPix=latDelta/height;
	var lngPerPix=lngDelta/width;
	
	var targetLat=e.target._latlng.lat;
	var targetLng=e.target._latlng.lng;
	
	var iconSize=48;
	
	var needToExpand=[];
	
	
	
	for(i=0;i<list.length;i++){
		var marker=list[i];
		var lat=marker._latlng.lat;
		var lng=marker._latlng.lng;
		
		if(lat<targetLat+(iconSize/2)*latPerPix&&lat>targetLat-(iconSize/2)*latPerPix
				&&lng<targetLng+(iconSize/2)*lngPerPix&&lng>targetLng-(iconSize/2)*lngPerPix){
			needToExpand.push(marker);
		}
		
	}
	
	//展开
	if(needToExpand.length>1){//至少有两个才展开
		var baseR=iconSize/2;
		var rad=Math.PI/6;
		var baseLat=needToExpand[0]._latlng.lat;
		var baseLng=needToExpand[0]._latlng.lng;
		for(i=0;i<needToExpand.length;i++){
			var markerE=needToExpand[i];
			markerE.originLat=markerE._latlng.lat;
			markerE.originLng=markerE._latlng.lng;
			var deltaLng=baseR*Math.cos(rad*i)*lngPerPix;
			var deltaLat=baseR*Math.sin(rad*i)*latPerPix;
			markerE.setLatLng([baseLat*1+deltaLat*1,baseLng*1+deltaLng*1]);
			markerE._icon.className+=' mapMarkerHighlight';
//			markerE.addTo(this.markersLayerExpand);
			baseR+=iconSize/6;
		}
	}
};

CIIE.Map.prototype.updateHeat=function(selectTime,callBack){
	var _format="yyyy-MM-dd hh:mm:ss";
	var time = SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN, _format);
	if(selectTime!=null){
		time=selectTime;
	}
	if(callBack==null){
		callBack=this.updatePlaySelectorTime.bind(this);
	}
	var url = '';
	if(this.heatKpi=='用户数'){
		url = LSMConsts.G_URLCONFIG.urlStream+'/usernum/sites?time=' + encodeURIComponent(time) + '&hotspot=' + encodeURIComponent(this.hotspot);
		$.ajax({
	        url: url,
	        type: 'get',         //数据发送方式
	        dataType: 'json',     //接受数据格式
	        contentType: "application/json",
	        accessType: "application/json",
	        data:{}
	    }).done(function(result){
	    	this.heatDataHandler.apply(this,[result]);
	    	if(callBack!=null){
	    		callBack.apply(this,[result]);
	    	}
	    }.bind(this));
	}else if(this.heatKpi=='4G流量'){
		var laccis=[];
		for(var key in this.cellLacciMap){
			laccis.push(this.cellLacciMap[key]);
		}
		this.dm.getCellsStreamKpiByCells({laccis:laccis,indicatorNameList:'4G流量',time:time},function(result){
			for(var key in result){
				result[key].total=result[key]['4G流量'];
			}
			this.heatDataHandler.apply(this,[result]);
			if(callBack!=null){
	    		callBack.apply(this,[result]);
	    	}
		}.bind(this));
	}else if(this.heatKpi=='VOLTE话务量'){ 
		var params={
				"hotspot":this.hotspot,
				"group":"cell",
				"cell_fields":"cell_name",
				"domains":"4g",
				"time":time
		};
		this.dm.getXpmData(params, 
			function(result){
				var map={};
				for(var i=0;i<result.length;i++){
					result[i].total=result[i].volte_voice_teletraffic;//volte_video_teletraffic
					map[result[i].lacci]=result[i];
				}
				this.heatDataHandler.apply(this,[map]);
				if(callBack!=null){
		    		callBack.apply(this,[result]);
		    	}
			}.bind(this));
	}else if(this.heatKpi=='GSM话务量'){
		var params={
				"hotspot":this.hotspot,
				"group":"cell",
				"cell_fields":"cell_name",
				"domains":"2g",
				"time":time
		};
		this.dm.getXpmData(params, 
			function(result){
				var map={};
				for(var i=0;i<result.length;i++){
					result[i].total=result[i].gsm_teletraffic;
					map[result[i].lacci]=result[i];
				}
				this.heatDataHandler.apply(this,[map]);
				if(callBack!=null){
		    		callBack.apply(this,[result]);
		    	}
			}.bind(this));
	}
	
};
CIIE.Map.prototype.heatDataHandler=function(data){
	if(this.isEmpty(data)){
        //alert('暂无用户数据');
        return;
    }
    console.time('getHeatMapData');
    for(var i=0;i<this.heatMap.length;i++){
    	if(data[this.heatMap[i].lacci]!=null){
    		this.heatMap[i].value=data[this.heatMap[i].lacci].total;
    	}else{
    		this.heatMap[i].value=0;
    	}
    }
//    this.heatMap = this.heatMap.map(function(obj){
//        for(var name in data){
//            if(obj&&name === obj.lacci){
//                var value = data[name].total;
//                if(value){
//                    obj.value = value;
//                }else{
//                    obj.value = 0;
//                }
//                return obj;
//            }
//        }
//    });
    console.timeEnd('getHeatMapData');
    //heatMap = arr;
    console.time('heatMapRender');
    this.heatMapRender(this.heatMap,this.radiusHeatMap);
//    this.rerenderHeatMap();
    console.timeEnd('heatMapRender');
};

CIIE.Map.prototype.rerenderHeatMap=function(){
    //console.log(map.latLngToContainerPoint([30.91350,121.4]));
	var map=this.map;
    var curZoom = map.getZoom();
    
    //热力图相关
    switch (curZoom){
	    case 10:
	        this.radiusHeatMap = 0.032;
	        break;
	    case 11:
	        this.radiusHeatMap = 0.016;
	        break;
	    case 12:
	        this.radiusHeatMap = 0.008;
	        break;
	    case 13:
	        this.radiusHeatMap = 0.004;
	        break;
	    case 14:
	        this.radiusHeatMap = 0.003;
	        break;
	    case 15:
	        this.radiusHeatMap = 0.002;
	        break;
	    case 16:
	        this.radiusHeatMap = 0.0015;
	        break;
	    case 17:
	        this.radiusHeatMap = 0.001;
	        break;
	    default:
	        this.radiusHeatMap = 0.0008;
	        break;
	}
    if(curZoom >= 19) return;
    if(this.heatMap==null||this.heatMap.length <= 0) return;//无缓存数据不渲染
    this.heatMapRender(this.heatMap,this.radiusHeatMap);
}

CIIE.Map.prototype.heatMapRender=function(temArr,radius) {
    var heatMap = this.mergeSame(temArr.sort(this.keySort('lat')),'lat','lng');
    if(this.heatMapLayer !== undefined && this.heatMapLayer != null){
        if (this.heatMapLayer._data){
            this.map.removeLayer(this.heatMapLayer);
        }
    }
    var testData = new Object();
    var cfg = {
        // radius should be small ONLY if scaleRadius is true (or small radius is intended)
        "radius": radius,
        "maxOpacity": 1,
        // scales the radius based on map zoom
        "scaleRadius": true,
        // if set to false the heatmap uses the global maximum for colorization
        // if activated: uses the data maximum within the current map boundaries
        //   (there will always be a red spot with useLocalExtremas true)
        "useLocalExtrema": false,
        // which field name in your data represents the latitude - default "lat"
        latField: 'lat',
        // which field name in your data represents the longitude - default "lng"
        lngField: 'lng',
        // which field name in your data represents the data value - default "value"
        valueField: 'value'
    };
	 var maxHeatValue = 0;
	 var minHeatValue = 0;
	 var sum =0;
	 for (var i= 0,len =heatMap.length; i<len; i++){
	     var temVal = heatMap[i].value;
	     var lat = heatMap[i].lat,
	         lng = heatMap[i].lng;
	     if(isNaN(temVal)){
	         heatMap[i].value = 0;
	     }
	     sum = sum + heatMap[i].value;
	     if (maxHeatValue < temVal){
	         maxHeatValue = temVal;
	         //console.log(heatMap[i].lacci+'======='+temVal);
	     }
	     if (minHeatValue > temVal){
	         minHeatValue = temVal;
	     }
	 }
	 
	var aveHeatValue = Math.ceil(sum/heatMap.length);
	maxHeatValue=2000;//aveHeatValue;
	testData={max: maxHeatValue, min: minHeatValue, data: heatMap};
	//testData = {data: heatMap};
	cfg.max=maxHeatValue;
	cfg.min=minHeatValue;
	
//	testData = {data: heatMap};
    this.heatMapLayer = new HeatmapOverlay(cfg);
    this.map.addLayer(this.heatMapLayer);
    this.heatMapLayer.setData(testData);
}

CIIE.Map.prototype.isEmpty=function (obj){
    for (var name in obj){
        return false;
    }
    return true;
};
CIIE.Map.prototype.wgs84tobd09=function (lng,lat){
	var temArr = wgs84togcj02(lng,lat);
    return gcj02tobd09(temArr[0],temArr[1]);
}

CIIE.Map.prototype.mergeSame=function (arr,para1,para2){
    var newArr = [],
        n = 0;
    for (var i = 0,lenI=arr.length; i <lenI; i++) {
        if(i<lenI-1){
            if (arr[i][para1] !== arr[i + 1][para1] || arr[i][para2] !== arr[i + 1][para2]) {
                newArr.push(arr.slice(n, i + 1));
                n = i + 1;
            }
        }else{
            newArr.push(arr.slice(n, i + 1));
        }
    }
    //console.log(newArr);
    var resultArr = [];
    for(var j= 0,lenJ=newArr.length; j<lenJ; ++j){
        var temArr = newArr[j];
        var temVal = 0;
        //console.log(temArr);
        for(var k= 0,lenK=temArr.length; k<lenK; ++k){
           temVal += temArr[k].value;
        }
        var temObj ={
            lat: temArr[0].lat,
            lng: temArr[0].lng,
            value: temVal
        };
        resultArr.push(temObj);
    }
    return resultArr;
    //console.log(resultArr);
};

CIIE.Map.prototype.keySort=function (name) {
    //return function(a,b){
    //    return desc ? ~~(a[key] < b[key]) : ~~(a[key] > b[key]);
    //}
    return  function(o,p){
        var a, b;
        if (typeof o === "object"  && typeof p === "object" && o && p) {
            a = o[name];
            b = p[name];
            if (a === b) {
                return 0;
            }
            if (typeof a === typeof b) {
                return a > b ? -1 : 1;
            }
            return typeof a > typeof b ? -1 : 1;
        }
        else {
            throw ("error");
        }
    }
}
