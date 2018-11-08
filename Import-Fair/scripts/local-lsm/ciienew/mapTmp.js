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
CIIE.Map.prototype.heatMapOfAll4BigClass=null;//热力图数据(全量)
CIIE.Map.prototype.heatKpi='用户数';//热力图数据
CIIE.Map.prototype.heatKpiOfAll='用户数';//热力图数据全量
CIIE.Map.prototype.heatTimeLine=[];//热力图数据
CIIE.Map.prototype.heatTimeMap={};//热力图数据
CIIE.Map.prototype.infobroadcastnum=0;  //信息播报基数
CIIE.Map.prototype.infobroadmaxTime=0;  //信息播报最大时间
CIIE.Map.prototype.infobroadmaxTimeFirst=0;  //信息播报最大时间

CIIE.Map.prototype.markerHotelArr=[];  //存放酒店图标marker
CIIE.Map.prototype.markerAirplaneArr=[];  //存放飞机图标marker
CIIE.Map.prototype.markerTrainArr=[];  //存放火车头图标marker


CIIE.Map.prototype.pdtitle = null;
CIIE.Map.prototype.hqtitle = null;
CIIE.Map.prototype.hqttitle = null;

CIIE.Map.prototype.loadHotMapFirstNum=0;  //第一次加载热力图次数
CIIE.Map.prototype.loadHotalFirstNum=0;  //第一次加载宾馆不定位

CIIE.Map.prototype.specialLayerHotelNum = []; // 存放随机数量的 酒店

CIIE.Map.prototype.locationMap={
	'J-国家会展中心':{lon:121.308613,lat:31.195766},
    'J-上海站':{lon:121.462188,lat:31.256074},
    'J-上海南站':{lon:121.435742,lat:31.159293},
    'J-虹桥火车站':{lon:121.327424,lat:31.200322},
    'J-虹桥机场':{lon:121.345336,lat:31.201449},
    'J-浦东机场':{lon:121.81179,lat:31.1573},
    'J-虹桥火车站-国家会展中心':{lon:121.30518,lat:31.18941},
    'J-虹桥机场-国家会展中心':{lon:121.29646,lat:31.18686},
    'J-沪杭高铁':{lon:121.026721,lat:31.867761},
    'J-浦东机场-国家会展中心':{lon:121.829031,lat:31.108225},
    
    //5个主要酒店
    'J-浦东香格里拉':{lon:121.505935,lat:31.241713},
    'J-淳大万丽':{lon:121.558823,lat:31.230123},
    'J-淳大万丽（世纪公园）':{lon:121.558823,lat:31.230123},
    'J-国际会议中心':{lon:121.503475,lat:31.245151},
    'J-东湖宾馆':{lon:121.461185,lat:31.221892},
    'J-和平饭店' :{lon:121.495665,lat:31.244819},

    //非主要酒店
    'J-富豪环球东亚酒店':{lon:121.450078,lat:31.208074},
    'J-国际会议中心东方滨江':{lon:121.503438,lat:31.245145},
    'J-锦江饭店':{lon:121.467919,lat:31.226249},
    'J-凯宾斯基大酒店':{lon:121.510815,lat:31.248141},


    'J-虹桥锦江大酒店':{lon:121.411872,lat:31.209543},
    'J-波特曼丽嘉':{lon:121.458178,lat:31.23357},
    'J-浦西四季酒店':{lon:121.468607,lat:31.233415},
    'J-上海威斯汀大饭店' :{lon:121.49382,lat:31.238243},
    'J-上海大酒店':{lon:121.488006,lat:31.240934},
    'J-新锦江大酒店':{lon:121.469449,lat:31.226987},
    'J-花园饭店' :{lon:121.466275,lat:31.226142},
    'J-半岛酒店' :{lon:121.495725,lat:31.247014},
    'J-上海外滩茂悦大酒店':{lon:121.49955,lat:31.251136},
    'J-凯宾斯基':{lon:121.510815,lat:31.248141},
    'J-文华东方':{lon:121.514474,lat:31.249154},
    'J-世博洲际酒店':{lon:121.511973,lat:31.204507},
    'J-浦东四季酒店':{lon:121.516723,lat:31.239856},
    'J-上海静安希尔顿':{lon:121.45183,lat:31.225693},
    'J-西郊宾馆':{lon:121.385368,lat:31.20726},
    'J-东郊宾馆':{lon:121.60122,lat:31.229677},
    'J-兴国宾馆':{lon:121.44153,lat:31.217165},
    'J-瑞金宾馆':{lon:121.471014,lat:31.219252},
    'J-虹桥迎宾馆':{lon:121.402266,lat:31.20785}
};//固定经纬度

//快速导航热点
CIIE.Map.prototype.qlHotMap={
		'J-国家会展中心':true,
		'J-虹桥机场':true,
		'J-虹桥火车站':true,
		'J-浦东机场':true
};

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
CIIE.Map.prototype.hotalCache=[];

CIIE.Map.prototype.switchControlPos='topleft';
CIIE.Map.prototype.switchControl=null;

CIIE.Map.prototype.baseLayer=null;
CIIE.Map.prototype.satLayer=null;

CIIE.Map.prototype.heatMapLayer=null;
CIIE.Map.prototype.heatMapLayerOfAll4BigClass=null;
CIIE.Map.prototype.shangxingLayer=null;
CIIE.Map.prototype.shangxingLayerTDD_D=null;
CIIE.Map.prototype.shangxingLayerTDD_E=null;
CIIE.Map.prototype.shangxingLayerTDD_F=null;
CIIE.Map.prototype.shangxingLayerFDD_S=null;
CIIE.Map.prototype.shangxingLayer900M=null;
CIIE.Map.prototype.shangxingLayer1800M=null;
CIIE.Map.prototype.markersLayerExpand=null;
CIIE.Map.prototype.markersLayer2G=null;
CIIE.Map.prototype.markersLayer3G=null;
CIIE.Map.prototype.markersLayer4G=null;

CIIE.Map.prototype.markersLayerTDD=null;
CIIE.Map.prototype.markersLayerFDD=null;
CIIE.Map.prototype.markersLayerCAR=null;
CIIE.Map.prototype.markersLayerCAR2=null;
CIIE.Map.prototype.markersLayerCAR3=null;
CIIE.Map.prototype.markersLayerCAR4=null;

CIIE.Map.prototype.markersLayerMan=null;
CIIE.Map.prototype.markersLayerSearchPre=null;
CIIE.Map.prototype.markersLayerPin=null;

CIIE.Map.prototype.specialLayerTraffic=null;
CIIE.Map.prototype.specialLayerHotel=null;
CIIE.Map.prototype.specialLayerHotelOf5=null;
CIIE.Map.prototype.specialLayerHotelOf5_1=null;
CIIE.Map.prototype.specialLayerHotelOf5_2=null;
CIIE.Map.prototype.specialLayerHotelOf5_3=null;
CIIE.Map.prototype.specialLayerHotelOf5_4=null;
CIIE.Map.prototype.specialLayerHotelOf5_5=null;
CIIE.Map.prototype.specialLayerLine=null;


CIIE.Map.prototype.specialLayer_pudongjichang_traffic=null;
CIIE.Map.prototype.specialLayer_hongqiaojichang_traffic=null;
CIIE.Map.prototype.specialLayer_hongqiaohuochezhan_traffic=null;
CIIE.Map.prototype.specialLayer_shanghaizhan_traffic=null;
CIIE.Map.prototype.specialLayer_shanghainanzhan_traffic=null;


CIIE.Map.prototype.specialLayer_pudongjichang_line=null;
CIIE.Map.prototype.specialLayer_hongqiaojichang_line=null;
CIIE.Map.prototype.specialLayer_huhanggaotie_line=null;
CIIE.Map.prototype.specialLayer_jinghuhuning_line=null;
CIIE.Map.prototype.specialLayer_hongqiaohuochezhan_line=null;
CIIE.Map.prototype.specialLayer_shanghaizhan_line=null;
CIIE.Map.prototype.specialLayer_shanghainanzhan_line=null;

CIIE.Map.prototype.specialLayer_all_line=null;








CIIE.Map.prototype.marker2G=null;
CIIE.Map.prototype.marker2G_l=null;
CIIE.Map.prototype.marker3G=null;
CIIE.Map.prototype.marker4G=null;
CIIE.Map.prototype.marker4G_l=null;
CIIE.Map.prototype.marker2GH=null;
CIIE.Map.prototype.marker3GH=null;
CIIE.Map.prototype.marker4GH=null;
CIIE.Map.prototype.markerYJC=null;
CIIE.Map.prototype.markerZHC=null;
CIIE.Map.prototype.markerFDC=null;
CIIE.Map.prototype.markerWRJ=null;
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
	this.hotspot=_hotspot;//'J-国家会展中心';
	this.divId=mapDivId;
	this.dm=LSMScreen.DataManager.getInstance();
	this.cdm=LSMScreen.CacheDataManager.getInstance();
    this.initHotalData();
	this.initMap();
	this.initMarker();
    
	this.updateHotspot(this.hotspot,FROMMODEL!='ciie');
    if(FROMMODEL!='ciie'){
        this.map.setView([31.12884, 121.41756], 17);
        if(this.ciieImageAdded==null){
            //this.addCiieImage();
            this.addPolygon();
        }
        //this.map.setView([31.12884, 121.41756], 12);
		this.map.setView([31.195179, 121.306601], 14);
	}else{
        this.map.setView([31.195179, 121.306601], 17);
        this.addPolygon();
    }
	
	
	
	this.createInfoWins();
	this.createCtrlBtns();
    this.createLiveVideo();
    this.createCoreNet();
    this.createTransCable();
	this.createPlaySelector();

    
	
	$('#modelframereturn').on('click',this.showModel.bind(this));

    //first load page get maxTime from database

    this.getmaxTimeToInfobroad();
    //定时加载
    //this.infobroadcasDataFirst();
    //setInterval(this.infobroadcasData.bind(this),5*1000);
};
CIIE.Map.prototype.initMarker=function(){
	this.marker2G=L.icon({
        iconUrl: this.ctx+'/static/styles/local-lsm/map/2GS.png',
        iconSize: [48, 48]
    });
    this.marker2G_l=L.icon({
        iconUrl: this.ctx+'/static/styles/local-lsm/map/2GS.png',
        iconSize: [48, 48],
        className:'addSearchStyle'
    });
	this.marker3G=L.icon({
        iconUrl: this.ctx+'/static/styles/local-lsm/map/3GS.png',
        iconSize: [48, 48]
    });
	this.marker4G=L.icon({
        iconUrl: this.ctx+'/static/styles/local-lsm/map/4GS.png',
        iconSize: [48, 48]
    });
    this.marker4G_l=L.icon({
        iconUrl: this.ctx+'/static/styles/local-lsm/map/4GS.png',
        iconSize: [48, 48],
        className:'addSearchStyle'
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
        iconSize: [64,64]
    });
    this.markerZHC = L.icon({
        iconUrl: this.ctx+'/static/styles/local-lsm/map/commandcar.png',
        iconSize: [64,64]
    });
    this.markerFDC = L.icon({
        iconUrl: this.ctx+'/static/styles/local-lsm/map/electriccar.png',
        iconSize: [64,64]
    });
    this.markerWRJ = L.icon({
        iconUrl: this.ctx+'/static/styles/local-lsm/map/aircraft.png',
        iconSize: [64,64]
    });
    
    this.markerMTM = L.icon({
        iconUrl: this.ctx+'/static/styles/local-lsm/map/maintainman.png',
        iconSize: [48,48]
    });
    this.marker4G_FDD = L.icon({
        iconUrl: this.ctx+'/static/styles/local-lsm/map/4GS_FDD.png',
        iconSize: [48, 48]
    });
    this.marker5G = L.icon({
        iconUrl: this.ctx+'/static/styles/local-lsm/map/5GS.png',
        iconSize: [72, 72]
    });
    this.markerMotorCell = L.icon({
        iconUrl: this.ctx+'/static/styles/local-lsm/map/motorcell.png',
        iconSize: [48, 48]
    });
    this.markerRoomIn = L.icon({
        iconUrl: this.ctx+'/static/styles/local-lsm/map/roomin.png',
        iconSize: [48, 48]
    });
    this.markerRoomSplit = L.icon({
        iconUrl: this.ctx+'/static/styles/local-lsm/map/roomsplit.png',
        iconSize: [48, 48]
    });
    this.markerRoomOut = L.icon({
        iconUrl: this.ctx+'/static/styles/local-lsm/map/roomout.png',
        iconSize: [48, 48]
    });
    this.markerStreet = L.icon({
        iconUrl: this.ctx+'/static/styles/local-lsm/map/street.png',
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
    this.marker_pin = L.icon({
        iconUrl: this.ctx+'/static/styles/local-lsm/map/pin.png',
        iconSize: [48, 48],
        iconAnchor: [24,42],
    });
    
    this.markerAIRPLANE = L.icon({
        iconUrl: this.ctx+'/static/styles/local-lsm/map/airplane.png',
        iconSize: [128,128]
        //iconSize: [100,100]
    });
    this.markerTRAIN = L.icon({
        iconUrl: this.ctx+'/static/styles/local-lsm/map/train.png',
        iconSize: [128,128]
        //iconSize: [100,100]
    });
    this.markerHOTEL = L.icon({
        iconUrl: this.ctx+'/static/styles/local-lsm/map/hotel.png',
        iconSize: [100,100]
    });
    this.markerHOTEL_NoBorder = L.icon({
        iconUrl: this.ctx+'/static/styles/local-lsm/map/hotelOld.png',
        iconSize: [100,100]
    });
    this.markerBaseStation=L.icon({
        iconUrl: this.ctx+'/static/styles/local-lsm/map/BaseStation.png',
        iconSize: [48, 48]
    });
    this.markerSparePart=L.icon({
        iconUrl: this.ctx+'/static/styles/local-lsm/map/sparepart.png',
        iconSize: [48, 48]
    });

    this.markerDialTestRed=L.icon({
        iconUrl: this.ctx+'/static/styles/local-lsm/map/dialTest_red.png',
        iconSize: [48, 48]
    });
    this.markerDialTestYellow=L.icon({
        iconUrl: this.ctx+'/static/styles/local-lsm/map/dialTest_yellow.png',
        iconSize: [48, 48]
    });
    this.markerDialTestGreen=L.icon({
        iconUrl: this.ctx+'/static/styles/local-lsm/map/dialTest_green.png',
        iconSize: [48, 48]
    });   

    this.markertestPng=L.icon({
        iconUrl: this.ctx+'/static/styles/local-lsm/map/testPng.png',
        iconSize: [64, 64]
    });
    
    for(var i=1;i<=18;i++){
    	this['markerMM_'+i] = L.icon({
            iconUrl: this.ctx+'/static/styles/local-lsm/map/MM_'+i+'.png',
            iconSize: [48, 48]
        });
    }
	
};

CIIE.Map.prototype.initHotalData=function(){
            var url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-hotel-location-query';
            //this.heatMap = []; //全局变量,存放热点图的数据
            $.ajax({
                url: url,
                type: 'get',         //数据发送方式
                dataType: 'json',     //接受数据格式
                async:false,
                //contentType: "application/json",
                //accessType: "application/json",
                data:{},
                beforeSend: function(XMLHttpRequest){
                },
                complete: function(XMLHttpRequest,textStatus){
                }
            }).done(function(result){
                //console.log(result);
                var data = result.data;
                data.sort(function(a, b) {return a.location_ - b.location_});
                for (var i = 0; i < data.length; i++) {
                    var currObj = data[i];
                    var name = currObj.name;
                    var lon = currObj.lon;
                    var lat = currObj.lat;
                    //'J-国家会展中心':{lon:121.308613,lat:31.195766},
                    this.locationMap['J-'+name] = {lon:lon,lat:lat};

                    CIIE.Map.prototype['hotalLayerHotelOfNum_'+i]=null;

                    this.specialLayerHotelNum.push(CIIE.Map.prototype['hotalLayerHotelOfNum_'+i]);
                }
                this.hotalCache = data; 
            }.bind(this));
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
	 
	this.baseLayer=L.tileLayer.baiduLayer('customLayerNormalSH.Map');
	this.satLayer=L.tileLayer.baiduLayer('customLayerSatSH.Map');
	
	this.baseLayer.addTo(this.map);
	
	var baseLayers = {
		'地图':this.baseLayer
    };
	
    
    this.map.on('zoomend', this.rerenderHeatMap.bind(this));//重新绘制热力图
    this.map.on('zoomend', this.rerenderHeatMapOfAll4BigClass.bind(this));//重新绘制热力图(全量)
    this.map.on('zoomend', this.changemarkerHotelBigSmall.bind(this));//更改酒店图标大小
    this.map.on('overlayremove', this.layerUnselected.bind(this));
    this.map.on('overlayadd', this.layerSelected.bind(this));
    this.map.on('click', this.showMapPosition.bind(this));
    
    this.initLayers();
    this.update();
    setInterval(this.update.bind(this),5*60*1000);

};



//changemarkerHotelBigSmall
CIIE.Map.prototype.changemarkerHotelBigSmall=function(){
    var map=this.map;
    var curZoom = map.getZoom();
    var iconSize = [100,100];
    switch (curZoom){
        case 10:
            iconSize = [20,20];
            break;
        case 11:
            iconSize = [30,30];
            break;
        case 12:
            iconSize = [40,40];
            break;
        case 13:
            iconSize = [50,50];
            break;
        case 14:
            iconSize = [60,60];
            break;
        case 15:
            iconSize = [100,100];
            break;
        case 16:
            iconSize = [100,100];
            break;
        case 17:
            iconSize = [100,100];
            break;
        default:
            iconSize = [100,100];
            break;
    }

    //修改酒店
    var markerArr1 = this.markerHotelArr;
    for (var i = 0; i < markerArr1.length; i++) {
        var currObj = markerArr1[i];
        var icon = L.icon({
                iconUrl: this.ctx+'/static/styles/local-lsm/map/hotel.png',
                //iconSize: [100,100]
                iconSize: iconSize
        });
        currObj.setIcon(icon);
    };

    //修改飞机
    var markerArr2 = this.markerAirplaneArr;
    for (var i = 0; i < markerArr2.length; i++) {
        var currObj = markerArr2[i];
        var icon = L.icon({
                iconUrl: this.ctx+'/static/styles/local-lsm/map/airplane.png',
                //iconSize: [100,100]
                iconSize: iconSize
        });
        currObj.setIcon(icon);
    };


    //修改火车头
    var markerArr3 = this.markerTrainArr;
    for (var i = 0; i < markerArr3.length; i++) {
        var currObj = markerArr3[i];
        var icon = L.icon({
                iconUrl: this.ctx+'/static/styles/local-lsm/map/train.png',
                //iconSize: [100,100]
                iconSize: iconSize
        });
        currObj.setIcon(icon);
    };

};











CIIE.Map.prototype.update=function(){
	this.cdm.getHotspotKpi({},this.updateKpis.bind(this));
};

CIIE.Map.prototype.initLayers=function(){
    if(this.map.hasLayer(this.markersLayer2G)) this.map.removeLayer(this.markersLayer2G);
    if(this.map.hasLayer(this.markersLayerTDD)) this.map.removeLayer(this.markersLayerTDD);
    if(this.map.hasLayer(this.markersLayerFDD)) this.map.removeLayer(this.markersLayerFDD);
    if(this.map.hasLayer(this.markersLayer5G)) this.map.removeLayer(this.markersLayer5G);

    if(this.map.hasLayer(this.shangxingLayer)) this.map.removeLayer(this.shangxingLayer);
    if(this.map.hasLayer(this.shangxingLayerTDD_D)) this.map.removeLayer(this.shangxingLayerTDD_D);
    if(this.map.hasLayer(this.shangxingLayerTDD_E)) this.map.removeLayer(this.shangxingLayerTDD_E);
    if(this.map.hasLayer(this.shangxingLayerTDD_F)) this.map.removeLayer(this.shangxingLayerTDD_F);
    if(this.map.hasLayer(this.shangxingLayerFDD_S)) this.map.removeLayer(this.shangxingLayerFDD_S);
    if(this.map.hasLayer(this.shangxingLayer900M)) this.map.removeLayer(this.shangxingLayer900M);
    if(this.map.hasLayer(this.shangxingLayer1800M)) this.map.removeLayer(this.shangxingLayer1800M);
    
    if(this.map.hasLayer(this.markersLayerMotorCell)) this.map.removeLayer(this.markersLayerMotorCell);
    if(this.map.hasLayer(this.markersLayerRoomIn)) this.map.removeLayer(this.markersLayerRoomIn);
    if(this.map.hasLayer(this.markersLayerRoomSplit)) this.map.removeLayer(this.markersLayerRoomSplit);
    if(this.map.hasLayer(this.markersLayerRoomOut)) this.map.removeLayer(this.markersLayerRoomOut);
    if(this.map.hasLayer(this.markersLayerStreet)) this.map.removeLayer(this.markersLayerStreet);
    if(this.map.hasLayer(this.markersLayerBaseStation)) this.map.removeLayer(this.markersLayerBaseStation);
    if(this.map.hasLayer(this.markersLayerSparePart)) this.map.removeLayer(this.markersLayerSparePart);
	if(this.map.hasLayer(this.markersLayerDialTest)) this.map.removeLayer(this.markersLayerDialTest);
    
    if(this.map.hasLayer(this.markersLayerCAR)) this.map.removeLayer(this.markersLayerCAR);
    if(this.map.hasLayer(this.markersLayerCAR2)) this.map.removeLayer(this.markersLayerCAR2);
    if(this.map.hasLayer(this.markersLayerCAR3)) this.map.removeLayer(this.markersLayerCAR3);
    if(this.map.hasLayer(this.markersLayerCAR4)) this.map.removeLayer(this.markersLayerCAR4);
    if(this.map.hasLayer(this.markersLayerMan)) this.map.removeLayer(this.markersLayerMan);
    if(this.map.hasLayer(this.markerClusters)) this.map.removeLayer(this.markerClusters);
    if(this.map.hasLayer(this.heatMapLayer)) this.map.removeLayer(this.heatMapLayer);
    if(this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
    
    if(this.map.hasLayer(this.opticalLayer)) this.map.removeLayer(this.opticalLayer);
    

    if(this.map.hasLayer(this.markersLayerSearchPre)) this.map.removeLayer(this.markersLayerSearchPre);
    if(this.map.hasLayer(this.markersLayerPin)) this.map.removeLayer(this.markersLayerPin);
	
    this.opticalLayer = new L.featureGroup();
	this.markersLayer2G = new L.featureGroup();
	this.markersLayerTDD = new L.featureGroup();
	this.markersLayerFDD = new L.featureGroup();
	this.markersLayer5G = new L.featureGroup();

    this.shangxingLayer = new L.featureGroup();
    this.shangxingLayerTDD_D = new L.featureGroup();
    this.shangxingLayerTDD_E = new L.featureGroup();
    this.shangxingLayerTDD_F = new L.featureGroup();
    this.shangxingLayerFDD_S = new L.featureGroup();
    this.shangxingLayer900M = new L.featureGroup();
    this.shangxingLayer1800M = new L.featureGroup();
	
	this.markersLayerMotorCell = new L.featureGroup();
	this.markersLayerRoomIn = new L.featureGroup();
	this.markersLayerRoomSplit = new L.featureGroup();
	this.markersLayerRoomOut = new L.featureGroup();
    this.markersLayerStreet = new L.featureGroup();
    this.markersLayerBaseStation = new L.featureGroup();

    this.markersLayerSparePart = new L.featureGroup();
	this.markersLayerDialTest = new L.featureGroup();
	
	this.markersLayerCAR = new L.featureGroup();
	this.markersLayerCAR2 = new L.featureGroup();
	this.markersLayerCAR3 = new L.featureGroup();
	this.markersLayerCAR4 = new L.featureGroup();
	this.markersLayerMan = new L.featureGroup();
	this.markersLayerSearchPre = new L.featureGroup();
    this.markersLayerPin = new L.featureGroup();
	
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

        case '高LTE话务量小区TOP5':
            this.infoWin5.show();
            break;
        case '高GSM话务量小区TOP5':
            this.infoWin6.show();
            break;
        case '高LTE无线接通率TOP5':
            this.infoWin7.show();
            break;
        case '高GSM无线接通率TOP5':
            this.infoWin8.show();
            break;                

		case '回放功能':
			this.updateHeatTimeLine(function(){
				$('#conditionsSelect').css('display','block');
			});
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
        case '高LTE话务量小区TOP5':
            this.infoWin5.hide();
            break;
        case '高GSM话务量小区TOP5':
            this.infoWin6.hide();
            break;
        case '高LTE无线接通率TOP5':
            this.infoWin7.hide();
            break;
        case '高GSM无线接通率TOP5':
            this.infoWin8.hide();
            break;       
		case '回放功能':
			this.updateHeatTimeLine(function(){
				$('#conditionsSelect').css('display','none');
			});
			break;
	}
};
CIIE.Map.prototype.updateHeatTimeLine=function(callback){
	this.cdm.getHeatTimeLine({},function(result){
		this.heatTimeLine=result;
		this.heatTimeMap={};
		for(var i=0;i<this.heatTimeLine.length;i++){
			this.heatTimeMap[this.heatTimeLine[i]]=true;
		}
		var stime=this.heatTimeLine[0];
		var etime=this.heatTimeLine[this.heatTimeLine.length-1];
		
		
		var startTime=$('#timeBeginSelect').val(this.reformatDateStr(stime));
		var endTime=$('#timeEndSelect').val(this.reformatDateStr(etime));
		if(callback!=null){
			callback.apply(this,[]);
		}
	}.bind(this));
};
CIIE.Map.prototype.reformatDateStr=function(nomarkDateStr){
	var year=nomarkDateStr.substring(0,4);
	var month=nomarkDateStr.substring(4,6);
	var date=nomarkDateStr.substring(6,8);
	var hour=nomarkDateStr.substring(8,10);
	var min=nomarkDateStr.substring(10,12);
	
	var result=year+'-'+month+'-'+date+' '+hour+':'+min+':00';
	return result;
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
// add video div
CIIE.Map.prototype.createLiveVideo=function(){
    var html='<div id="liveVideo" class="liveVideo">'
                +'<img style="position:absolute;width:100%;height:100%;pointer-events: none;" src="'+this.ctx+'/static/styles/local-lsm/map/videoBackFrame.png">'
                +'<div id="liveVideoTitleBar" class="liveVideoTitleBar">'
                    +'<div id="videoTitle" class="videoTitle"></div>'
                    +'<div style="float: left;"><span id="videoTitleSpan" class="videoTitleSpan">上海进博会交易团成立四大采购商联盟</span></div>'
                    +'<div id="liveVideo_winclose" class="liveVideo_winclose"></div>'
                    +'<div id="liveVideo_winSmall" class="liveVideo_winSmall"></div>'
                    +'<div id="liveVideo_winBig" class="liveVideo_winBig"></div>'
                    //+'<img id="liveVideo_winSmall" alt="最小化" title="最小化" src="'+this.ctx+'/static/styles/local-lsm/map/videoSmall.png" style="float: right; margin-right: 10px; cursor: pointer; margin-top: 6px;"  />'
                +'</div>'
                +'<div id="chenggaodu" class="chenggaodu">'
                +'</div>'
                +'<div id="videoContent" class="videoContent" style="">'
                    +'<iframe id="liveVideoIframe" src="'+liveVideoUrl+'" frameborder="0" style="width:100%;height:100%"></iframe>'
                +'</div>'
            +'</div>';
    
    $('#'+this.divId).parent().append(html);
    //$('#liveVideo_winctrl').on('click',this.playLiveVideoCtrl.bind(this));
    $('#liveVideo_winclose').on('click',this.hideLiveVideoCtrl.bind(this));
    $('#liveVideo_winSmall').on('click',this.smallLiveVideoCtrl.bind(this));
    $('#liveVideo_winBig').on('click',this.bigLiveVideoCtrl.bind(this));
    
    
    $('#liveVideoTitleBar').on('mousedown',this.liveVideoTitleBarMouseDown.bind(this));
    
};

// add corenet div
CIIE.Map.prototype.createCoreNet=function(){
    var html = '';
    //********核心网
    // html +='<div id="corenet" class="corenet maxzIndex">'
    //             +'<div id="toTraditionTopo" class="toTraditionTopo"></div>'  
    //             +'<div id="toCMNETTopo" class="toCMNETTopo"></div>'  
    //             +'<div id="toEPCTopo" class="toEPCTopo">'
    //                 +'<div id="topool1Topo" class="topool1Topo"></div>'
    //                 +'<div id="topool2Topo" class="topool2Topo"></div>'
    //             +'</div>'  
    //             +'<div id="toWIRELESSTopo" class="toWIRELESSTopo"></div>'  
    //             +'<div id="corenetTitleBar" class="corenetTitleBar">'
    //                 //+'<div id="videoTitle" class="videoTitle"></div>'
    //                 +'<div style="float: left;"><span id="corenetSpan" class="corenetSpan"></span></div>'
    //                 +'<div id="corenet_winclose" class="corenet_winclose"></div>'
    //             +'</div>'
    //         +'</div>';

    var corenetUrl = BASEPATH+'/pages/local-lsm/topo/cmnetTopo.jsp?topoName='+encodeURIComponent("core_network");
    html +='<div id="corenet" class="corenettopo">'
                    +'<div class="topohbdrgfsdfvasg">'
                        +'<div id="toCMNETTopoDivTitle" class="toTraditionTopoDivTitle" style="float: left;"></div>'
                        +'<div style="float: left;"><span id="toCMNETTopoDivSpan" class="toTraditionTopoDivSpan">核心网(EPC) </span></div>'
                        +'<div id="tocorenetDiv_winclose" class="toTraditionTopoDiv_winclose" style="float: right;"></div>'
                    +'</div>'
                +'<div id="corenetTitleBar" class="topogrfsasfw">'
                    // +'<div style="float: left;"><span id="corenetSpan" class="corenetSpan"></span></div>'
                    // +'<div id="corenet_winclose" class="corenet_winclose"></div>'
                    +'<iframe id="cmnetIframe" src="'+corenetUrl+'" frameborder="0" style="width:100%;height:100%"></iframe>'
                +'</div>'
            +'</div>'; 




    //传输ttopo        
    html  +='<div id="toTraditionTopoDiv" class="toTraditionTopoDiv">'
                +'<div id="toTraditionTopoDivContent" class="toTraditionTopoDivContent">'
                    +'<div class="toTraditionTopoDivtitleClose">'
                        +'<div id="toTraditionTopoDivTitle" class="toTraditionTopoDivTitle" style="float: left;"></div>'
                        +'<div style="float: left;"><span id="toTraditionTopoDivSpan" class="toTraditionTopoDivSpan">传输拓扑</span></div>'
                        +'<div id="toTraditionTopoDiv_winclose" class="toTraditionTopoDiv_winclose" style="float: right;"></div>'
                    +'</div>'
                +'</div>'
            +'</div>'; 
    //CMNET城域网拓扑   
    // var cmnetUrl = BASEPATH+'/pages/local-lsm/topo/cmnetTopo.jsp?topoName='+encodeURIComponent("net_overview_CMNET城域网总体质量监控图")
    // html  +='<div id="toCMNETTopoDiv" class="toTraditionTopoDiv">'
    //             +'<div id="toCMNETTopoDivContent" class="toCMNETTopoDivContent">'
    //                 +'<iframe id="cmnetIframe" src="'+cmnetUrl+'" frameborder="0" style="width:100%;height:100%"></iframe>'
    //                 +'<div class="toTraditionTopoDivtitleClose">'
    //                     +'<div id="toCMNETTopoDivTitle" class="toTraditionTopoDivTitle" style="float: left;"></div>'
    //                     +'<div style="float: left;"><span id="toCMNETTopoDivSpan" class="toTraditionTopoDivSpan">CMNET城域网拓扑 </span></div>'
    //                     +'<div id="toCMNETTopoDiv_winclose" class="toTraditionTopoDiv_winclose" style="float: left;"></div>'
    //                 +'</div>'
    //             +'</div>'
    //         +'</div>'; 

    var cmnetUrl = BASEPATH+'/pages/local-lsm/topo/cmnetTopo.jsp?topoName='+encodeURIComponent("net_overview_CMNET城域网总体质量监控图");
    html +='<div id="toCMNETTopoDiv" class="corenettopo">'
                    +'<div class="topohbdrgfsdfvasg">'
                        +'<div id="toCMNETTopoDivTitle" class="toTraditionTopoDivTitle" style="float: left;"></div>'
                        +'<div style="float: left;"><span id="toCMNETTopoDivSpan" class="toTraditionTopoDivSpan">CMNET城域网拓扑 </span></div>'
                        +'<div id="toCMNETTopoDiv_winclose" class="toTraditionTopoDiv_winclose" style="float: right;"></div>'
                    +'</div>'
                +'<div id="corenetTitleBar" class="topogrfsasfw">'
                    // +'<div style="float: left;"><span id="corenetSpan" class="corenetSpan"></span></div>'
                    // +'<div id="corenet_winclose" class="corenet_winclose"></div>'
                    +'<iframe id="cmnetIframe" src="'+cmnetUrl+'" frameborder="0" style="width:100%;height:100%"></iframe>'
                +'</div>'
            +'</div>'; 




    //核心网EPC        
    html  +='<div id="toEPCTopoDiv" class="toTraditionTopoDiv">'
                +'<div id="toEPCTopoDivContent" class="toEPCTopoDivContent">'
                    +'<div class="toTraditionTopoDivtitleClose">'
                        +'<div id="toEPCTopoDivTitle" class="toTraditionTopoDivTitle" style="float: left;"></div>'
                        +'<div style="float: left;"><span id="toEPCTopoDivSpan" class="toTraditionTopoDivSpan">核心网EPC</span></div>'
                        +'<div id="toEPCTopoDiv_winclose" class="toTraditionTopoDiv_winclose" style="float: left;"></div>'
                    +'</div>'
                +'</div>'
            +'</div>';
    //传统语音无线        
    html  +='<div id="toWIRELESSTopoDiv" class="toTraditionTopoDiv">'
                +'<div id="toWIRELESSTopoDivContent" class="toWIRELESSTopoDivContent">'
                    +'<div class="toTraditionTopoDivtitleClose">'
                        +'<div id="toWIRELESSTopoDivTitle" class="toTraditionTopoDivTitle" style="float: left;"></div>'
                        +'<div style="float: left;"><span id="toWIRELESSTopoDivSpan" class="toTraditionTopoDivSpan">EPC覆盖</span></div>'
                        +'<div id="toWIRELESSTopoDiv_winclose" class="toTraditionTopoDiv_winclose" style="float: left;"></div>'
                    +'</div>'
                +'</div>'
            +'</div>'; 
    html  +='<div id="toWIRELESS2TopoDiv" class="toTraditionTopoDiv">'
                +'<div id="toWIRELESSTopoDivContent2" class="toWIRELESS2TopoDivContent">'
                    +'<div class="toTraditionTopoDivtitleClose">'
                        +'<div id="toWIRELESSTopoDivTitle2" class="toTraditionTopoDivTitle" style="float: left;"></div>'
                        +'<div style="float: left;"><span id="toWIRELESSTopoDivSpan2" class="toTraditionTopoDivSpan">传统语音覆盖</span></div>'
                        +'<div id="toWIRELESS2TopoDiv_winclose" class="toTraditionTopoDiv_winclose" style="float: left;"></div>'
                    +'</div>'
                +'</div>'
            +'</div>';         

    //pool

    // var pool1Url = BASEPATH+'/pages/local-lsm/topo/cmnetTopo.jsp?topoName=mme_01';
    // html  +='<div id="topool1TopoDiv" class="toTraditionTopoDiv">'
    //             +'<div id="toCMNETTopoDivContent" class="toCMNETTopoDivContent">'
    //                 +'<iframe id="cmnetIframe" src="'+pool1Url+'" frameborder="0" style="width:100%;height:100%"></iframe>'
    //                 +'<div class="toTraditionTopoDivtitleClose">'
    //                     +'<div id="toCMNETTopoDivTitle" class="toTraditionTopoDivTitle" style="float: left;"></div>'
    //                     +'<div style="float: left;"><span id="toCMNETTopoDivSpan" class="toTraditionTopoDivSpan">MMEPOOL1 </span></div>'
    //                     +'<div id="topool1TopoDiv_winclose" class="toTraditionTopoDiv_winclose" style="float: left;"></div>'
    //                 +'</div>'
    //             +'</div>'
    //         +'</div>';

    //var pool1Url = BASEPATH+'/pages/local-lsm/topo/cmnetTopo.jsp?topoName=mme_01';
    var pool1Url = BASEPATH+'/pages/local-lsm/topo/cmnetTopo.jsp?topoName='+encodeURIComponent("mme_01");
    html +='<div id="topool1TopoDiv" class="corenettopo">'
                    +'<div class="topohbdrgfsdfvasg">'
                        +'<div id="toCMNETTopoDivTitle" class="toTraditionTopoDivTitle" style="float: left;"></div>'
                        +'<div style="float: left;"><span id="toCMNETTopoDivSpan" class="toTraditionTopoDivSpan">MMEPOOL1 </span></div>'
                        +'<div id="topool1TopoDiv_winclose" class="toTraditionTopoDiv_winclose" style="float: right;"></div>'
                    +'</div>'
                +'<div id="corenetTitleBar" class="topogrfsasfw">'
                    // +'<div style="float: left;"><span id="corenetSpan" class="corenetSpan"></span></div>'
                    // +'<div id="corenet_winclose" class="corenet_winclose"></div>'
                    +'<iframe id="cmnetIframe" src="'+pool1Url+'" frameborder="0" style="width:100%;height:100%"></iframe>'
                +'</div>'
            +'</div>';         
            
    //pool2   
    // var pool2Url = BASEPATH+'/pages/local-lsm/topo/cmnetTopo.jsp?topoName=mme_02';
    // html  +='<div id="topool2TopoDiv" class="toTraditionTopoDiv">'
    //             +'<div id="toCMNETTopoDivContent" class="toCMNETTopoDivContent">'
    //                 +'<iframe id="cmnetIframe" src="'+pool2Url+'" frameborder="0" style="width:100%;height:100%"></iframe>'
    //                 +'<div class="toTraditionTopoDivtitleClose">'
    //                     +'<div id="toCMNETTopoDivTitle" class="toTraditionTopoDivTitle" style="float: left;"></div>'
    //                     +'<div style="float: left;"><span id="toCMNETTopoDivSpan" class="toTraditionTopoDivSpan">MMEPOOL2 </span></div>'
    //                     +'<div id="topool2TopoDiv_winclose" class="toTraditionTopoDiv_winclose" style="float: left;"></div>'
    //                 +'</div>'
    //             +'</div>'
    //         +'</div>';
   // var pool2Url = BASEPATH+'/pages/local-lsm/topo/cmnetTopo.jsp?topoName=mme_02';
    var pool2Url = BASEPATH+'/pages/local-lsm/topo/cmnetTopo.jsp?topoName='+encodeURIComponent("mme_02");
    html +='<div id="topool2TopoDiv" class="corenettopo">'
                    +'<div class="topohbdrgfsdfvasg">'
                        +'<div id="toCMNETTopoDivTitle" class="toTraditionTopoDivTitle" style="float: left;"></div>'
                        +'<div style="float: left;"><span id="toCMNETTopoDivSpan" class="toTraditionTopoDivSpan">MMEPOOL2 </span></div>'
                        +'<div id="topool2TopoDiv_winclose" class="toTraditionTopoDiv_winclose" style="float: right;"></div>'
                    +'</div>'
                +'<div id="corenetTitleBar" class="topogrfsasfw">'
                    // +'<div style="float: left;"><span id="corenetSpan" class="corenetSpan"></span></div>'
                    // +'<div id="corenet_winclose" class="corenet_winclose"></div>'
                    +'<iframe id="cmnetIframe" src="'+pool2Url+'" frameborder="0" style="width:100%;height:100%"></iframe>'
                +'</div>'
            +'</div>';                                                 


//********核心网(传统语音)
    // html  +='<div id="corenetTraditional" class="corenet corenetTraditional maxzIndex">'
    //             +'<div id="toWIRELESSTopo2" class="toWIRELESSTopo2"></div>' 
    //             +'<div id="corenetTraditionalTitleBar" class="corenetTraditionalTitleBar">'
    //                 //+'<div id="videoTitle" class="videoTitle"></div>'
    //                 +'<div style="float: left;"><span id="corenetTraditionalSpan" class="corenetTraditionalSpan"></span></div>'
    //                 +'<div id="corenetTraditional_winclose" class="corenetTraditional_winclose"></div>'
    //             +'</div>'
    //         +'</div>';  

    var coreneTraditionaltUrl = BASEPATH+'/pages/local-lsm/topo/cmnetTopo.jsp?topoName='+encodeURIComponent("chuantongyuyin");
    html +='<div id="corenetTraditional" class="corenettopo">'
                    +'<div class="topohbdrgfsdfvasg">'
                        +'<div id="toCMNETTopoDivTitle" class="toTraditionTopoDivTitle" style="float: left;"></div>'
                        +'<div style="float: left;"><span id="toCMNETTopoDivSpan" class="toTraditionTopoDivSpan">核心网(传输语音)</span></div>'
                        +'<div id="toTraditionalTopoDiv_winclose" class="toTraditionTopoDiv_winclose" style="float: right;"></div>'
                    +'</div>'
                +'<div id="corenetTitleBar" class="topogrfsasfw">'
                    // +'<div style="float: left;"><span id="corenetSpan" class="corenetSpan"></span></div>'
                    // +'<div id="corenet_winclose" class="corenet_winclose"></div>'
                    +'<iframe id="cmnetIframe" src="'+coreneTraditionaltUrl+'" frameborder="0" style="width:100%;height:100%"></iframe>'
                +'</div>'
            +'</div>';          
//********城域网
var metropolitanAreaNetUrl = BASEPATH+'/pages/local-lsm/topo/cmnetTopo.jsp?topoName='+encodeURIComponent("net_overview_CMNET城域网总体质量监控图");
html +='<div id="metropolitanAreaNet" class="corenettopo">'
                +'<div class="topohbdrgfsdfvasg">'
                    +'<div id="toCMNETTopoDivTitle" class="toTraditionTopoDivTitle" style="float: left;"></div>'
                    +'<div style="float: left;"><span id="toCMNETTopoDivSpan" class="toTraditionTopoDivSpan">城域网</span></div>'
                    +'<div id="tometropolitanAreaNetDiv_winclose" class="toTraditionTopoDiv_winclose" style="float: right;"></div>'
                +'</div>'
            +'<div id="corenetTitleBar" class="topogrfsasfw">'
                // +'<div style="float: left;"><span id="corenetSpan" class="corenetSpan"></span></div>'
                // +'<div id="corenet_winclose" class="corenet_winclose"></div>'
                +'<iframe id="cmnetIframe" src="'+metropolitanAreaNetUrl+'" frameborder="0" style="width:100%;height:100%"></iframe>'
            +'</div>'
        +'</div>';    


//********传输网   
var transmissionNetUrl = BASEPATH+'/pages/local-lsm/topo/cmnetTopo.jsp?topoName='+encodeURIComponent("C469948E-49F5-75A9-3082-AD4A0D5DB120");
html +='<div id="transmissionNet" class="corenettopo">'
                +'<div class="topohbdrgfsdfvasg">'
                    +'<div id="toCMNETTopoDivTitle" class="toTraditionTopoDivTitle" style="float: left;"></div>'
                    +'<div style="float: left;"><span id="toCMNETTopoDivSpan" class="toTraditionTopoDivSpan">传输网</span></div>'
                    +'<div id="totransmissionNetDiv_winclose" class="toTraditionTopoDiv_winclose" style="float: right;"></div>'
                +'</div>'
            +'<div id="corenetTitleBar" class="topogrfsasfw">'
                // +'<div style="float: left;"><span id="corenetSpan" class="corenetSpan"></span></div>'
                // +'<div id="corenet_winclose" class="corenet_winclose"></div>'
                +'<iframe id="cmnetIframe" src="'+transmissionNetUrl+'" frameborder="0" style="width:100%;height:100%"></iframe>'
            +'</div>'
        +'</div>';                        
    
    $('#'+this.divId).parent().append(html);
    $('#corenet_winclose').on('click',this.hidecorenetCtrl.bind(this));
    $('#corenetTitleBar').on('mousedown',this.corenetTitleBarMouseDown.bind(this));

    //核心网(EPC)
    $('#tocorenetDiv_winclose').on('click',this.hidecorenetCtrl.bind(this));

    //核心网(传统语音)
    $('#toTraditionalTopoDiv_winclose').on('click',this.hidecorenetTraditionalCtrl.bind(this));

    //城域网
    $('#tometropolitanAreaNetDiv_winclose').on('click',this.hidemetropolitanAreaNetCtrl.bind(this));

    //传输网
    $('#totransmissionNetDiv_winclose').on('click',this.hidetransmissionNetCtrl.bind(this));

 

    //传输ttopo       
    $('#toTraditionTopo').on('click',this.showtoTraditionTopoCtrl.bind(this));
    $('#toTraditionTopoDiv_winclose').on('click',this.hidetoTraditionTopoCtrl.bind(this));

    //CMNET城域网拓扑       
    $('#toCMNETTopo').on('click',this.showtoCMNETTopoCtrl.bind(this));
    $('#toCMNETTopoDiv_winclose').on('click',this.hidetoCMNETTopoCtrl.bind(this));

    //核心网EPC       
    // $('#toEPCTopo').on('click',this.showtoEPCTopoCtrl.bind(this));
    // $('#toEPCTopoDiv_winclose').on('click',this.hidetoEPCTopoCtrl.bind(this));

    //传统语音无线       
    $('#toWIRELESSTopo').on('click',this.showtoWIRELESSTopoCtrl.bind(this));
    $('#toWIRELESSTopoDiv_winclose').on('click',this.hidetoWIRELESSTopoCtrl.bind(this));

    //传统语音无线 2      
    $('#toWIRELESSTopo2').on('click',this.showtoWIRELESS2TopoCtrl.bind(this));
    $('#toWIRELESS2TopoDiv_winclose').on('click',this.hidetoWIRELESS2TopoCtrl.bind(this));


    //pool1       
    $('#topool1Topo').on('click',this.showtopool1TopoCtrl.bind(this));
    $('#topool1TopoDiv_winclose').on('click',this.hidetopool1TopoCtrl.bind(this));

    //pool2     
    $('#topool2Topo').on('click',this.showtopool2TopoCtrl.bind(this));
    $('#topool2TopoDiv_winclose').on('click',this.hidetopool2TopoCtrl.bind(this));


    $('#corenetTraditional_winclose').on('click',this.hidecorenetTraditionalCtrl.bind(this));
    $('#corenetTraditionalTitleBar').on('mousedown',this.corenetTraditionalTitleBarMouseDown.bind(this));
    
};



CIIE.Map.prototype.hidemetropolitanAreaNetCtrl=function(){
    $("#metropolitanAreaNet").css('display', 'none');
    $('.metropolitanAreaNetcloselogo').parent().removeClass('mapCtrlItemSelected');
};

CIIE.Map.prototype.hidetransmissionNetCtrl=function(){
    $("#transmissionNet").css('display', 'none');
    $('.transmissionNetcloselogo').parent().removeClass('mapCtrlItemSelected');
};

CIIE.Map.prototype.showtoTraditionTopoCtrl=function(){
    $("#toTraditionTopoDiv").css('display', 'block');
};
CIIE.Map.prototype.hidetoTraditionTopoCtrl=function(){
    $("#toTraditionTopoDiv").css('display', 'none');
};


CIIE.Map.prototype.showtoCMNETTopoCtrl=function(){
    $("#toCMNETTopoDiv").css('display', 'block');
};
CIIE.Map.prototype.hidetoCMNETTopoCtrl=function(){
    $("#toCMNETTopoDiv").css('display', 'none');
};

CIIE.Map.prototype.showtopool1TopoCtrl=function(){
    event.stopPropagation(); 
    $("#topool1TopoDiv").css('display', 'block');
};
CIIE.Map.prototype.hidetopool1TopoCtrl=function(){
    event.stopPropagation(); 
    $("#topool1TopoDiv").css('display', 'none');
};

CIIE.Map.prototype.showtopool2TopoCtrl=function(){
    event.stopPropagation(); 
    $("#topool2TopoDiv").css('display', 'block');
};
CIIE.Map.prototype.hidetopool2TopoCtrl=function(){
    event.stopPropagation(); 
    $("#topool2TopoDiv").css('display', 'none');
};


CIIE.Map.prototype.showtoEPCTopoCtrl=function(){
    $("#toEPCTopoDiv").css('display', 'block');
};
CIIE.Map.prototype.hidetoEPCTopoCtrl=function(){
    $("#toEPCTopoDiv").css('display', 'none');
};


CIIE.Map.prototype.showtoWIRELESSTopoCtrl=function(){
    $("#toWIRELESSTopoDiv").css('display', 'block');
};
CIIE.Map.prototype.hidetoWIRELESSTopoCtrl=function(){
    $("#toWIRELESSTopoDiv").css('display', 'none');
};

CIIE.Map.prototype.showtoWIRELESS2TopoCtrl=function(){
    $("#toWIRELESS2TopoDiv").css('display', 'block');
};
CIIE.Map.prototype.hidetoWIRELESS2TopoCtrl=function(){
    $("#toWIRELESS2TopoDiv").css('display', 'none');
}




CIIE.Map.prototype.conditionsSelectTitleBarMouseDown=function(e){
	this.conditionsSelectLeft=$('#conditionsSelect').css('left').replace('px','');
	this.conditionsSelectTop=$('#conditionsSelect').css('top').replace('px','');
	this.pageX=e.pageX;
	this.pageY=e.pageY;
	
	$(document).on('mousemove',this.conditionsSelectTitleBarMove.bind(this));
	$(document).on('mouseup',this.conditionsSelectTitleBarMouseUp.bind(this));
};
CIIE.Map.prototype.liveVideoTitleBarMouseDown=function(e){
    this.liveVideoLeft=$('#liveVideo').css('left').replace('px','');
    this.liveVideoTop=$('#liveVideo').css('top').replace('px','');
    this.pageX=e.pageX;
    this.pageY=e.pageY;
    
    $(document).on('mousemove',this.liveVideoTitleBarMove.bind(this));
    $(document).on('mouseup',this.liveVideoTitleBarMouseUp.bind(this));
};
CIIE.Map.prototype.conditionsSelectTitleBarMouseUp=function(e){
	$(document).off('mousemove');
	$(document).off('mouseup');
};
CIIE.Map.prototype.liveVideoTitleBarMouseUp=function(e){
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
CIIE.Map.prototype.liveVideoTitleBarMove=function(e){
    var pageX=e.pageX;
    var pageY=e.pageY;
    
    var deltaX=pageX-this.pageX;
    var deltaY=pageY-this.pageY;
    
    var left=this.liveVideoLeft*1+deltaX*1;
    var top=this.liveVideoTop*1+deltaY*1;
    
    $('#liveVideo').css('left',left+'px');
    $('#liveVideo').css('top',top+'px');
    
    console.log(left+','+top);
    
};

//corenetTitleBarMouseDown
CIIE.Map.prototype.corenetTitleBarMouseDown=function(e){
    this.corenetLeft=$('#corenet').css('left').replace('px','');
    this.corenetTop=$('#corenet').css('top').replace('px','');
    this.pageX=e.pageX;
    this.pageY=e.pageY;
     
    var zIndexArr = [];
    $(e.currentTarget).parent().siblings('div.maxzIndex').each(function(index, el) {
        zIndexArr.push( parseInt( $(el).css('z-index')=="auto"?0:$(el).css('z-index')));
    });
    var zIndexMax = parseInt(  Math.max.apply(Math,zIndexArr)  );
    $(e.currentTarget).parent().css({"z-index":zIndexMax+1});


    
    $(document).on('mousemove',this.corenetTitleBarMove.bind(this));
    $(document).on('mouseup',this.corenetTitleBarMouseUp.bind(this));
};
CIIE.Map.prototype.corenetTitleBarMouseUp=function(e){
    $(document).off('mousemove');
    $(document).off('mouseup');
};
CIIE.Map.prototype.corenetTitleBarMove=function(e){
    var pageX=e.pageX;
    var pageY=e.pageY;
    
    var deltaX=pageX-this.pageX;
    var deltaY=pageY-this.pageY;
    
    var left=this.corenetLeft*1+deltaX*1;
    var top=this.corenetTop*1+deltaY*1;
    
    $('#corenet').css('left',left+'px');
    $('#corenet').css('top',top+'px');
    
    console.log(left+','+top);
    
};


//corenetTraditionalTitleBarMouseDown
CIIE.Map.prototype.corenetTraditionalTitleBarMouseDown=function(e){
    this.corenetTraditionalLeft=$('#corenetTraditional').css('left').replace('px','');
    this.corenetTraditionalTop=$('#corenetTraditional').css('top').replace('px','');
    this.pageX=e.pageX;
    this.pageY=e.pageY;


    var zIndexArr = [];
    $(e.currentTarget).parent().siblings('div.maxzIndex').each(function(index, el) {
        zIndexArr.push( parseInt( $(el).css('z-index')=="auto"?0:$(el).css('z-index')));
    });
    var zIndexMax = parseInt(  Math.max.apply(Math,zIndexArr)  );
    $(e.currentTarget).parent().css({"z-index":zIndexMax+1});


    
    $(document).on('mousemove',this.corenetTraditionalTitleBarMove.bind(this));
    $(document).on('mouseup',this.corenetTraditionalTitleBarMouseUp.bind(this));
};
CIIE.Map.prototype.corenetTraditionalTitleBarMouseUp=function(e){
    $(document).off('mousemove');
    $(document).off('mouseup');
};
CIIE.Map.prototype.corenetTraditionalTitleBarMove=function(e){
    var pageX=e.pageX;
    var pageY=e.pageY;
    
    var deltaX=pageX-this.pageX;
    var deltaY=pageY-this.pageY;
    
    var left=this.corenetTraditionalLeft*1+deltaX*1;
    var top=this.corenetTraditionalTop*1+deltaY*1;
    
    $('#corenetTraditional').css('left',left+'px');
    $('#corenetTraditional').css('top',top+'px');
    
    console.log(left+','+top);
    
};









CIIE.Map.prototype.hideSelectorCtrl=function(e){
	$('#conditionsSelect').css('display','none');
	$('.ctrlIconREPLAY').parent().removeClass('mapCtrlItemSelected');
};
CIIE.Map.prototype.hideLiveVideoCtrl=function(e){
    $('#liveVideo').css('display','none');
    $('.ctrlIconVideo').parent().removeClass('mapCtrlItemSelected');
};
CIIE.Map.prototype.hidecorenetCtrl=function(e){
    $('#corenet').css('display','none');
    //$('#corenetTraditional').css('display','none');
    $('.corenetcloselogo').parent().removeClass('mapCtrlItemSelected');
};
CIIE.Map.prototype.hidecorenetTraditionalCtrl=function(e){
    //$('#corenet').css('display','none');
    $('#corenetTraditional').css('display','none');
    $('.corenetTraditionalcloselogo').parent().removeClass('mapCtrlItemSelected');
};
CIIE.Map.prototype.smallLiveVideoCtrl=function(e){
    $("#liveVideo").removeClass().addClass('liveVideo');
    $("#liveVideoTitleBar").removeClass().addClass('liveVideoTitleBar');
    $("#videoTitle").removeClass().addClass('videoTitle');
    $("#videoTitleSpan").removeClass().addClass('videoTitleSpan');
    $("#liveVideo_winclose").removeClass().addClass('liveVideo_winclose');
    $("#liveVideo_winSmall").removeClass().addClass('liveVideo_winSmall');
    $("#liveVideo_winBig").removeClass().addClass('liveVideo_winBig');
    $("#videoContent").removeClass().addClass('videoContent');
    $("#chenggaodu").removeClass().addClass('chenggaodu');


    $("#liveVideo_winSmall").css("display","none");
    $("#liveVideo_winBig").css("display","");
    
};
CIIE.Map.prototype.bigLiveVideoCtrl=function(e){
    $("#liveVideo").removeClass().addClass('liveVideo_big');
    $("#liveVideoTitleBar").removeClass().addClass('liveVideoTitleBar_big');
    $("#videoTitle").removeClass().addClass('videoTitle_big');
    $("#videoTitleSpan").removeClass().addClass('videoTitleSpan_big');
    $("#liveVideo_winclose").removeClass().addClass('liveVideo_winclose_big');
    $("#liveVideo_winSmall").removeClass().addClass('liveVideo_winSmall_big');
    $("#liveVideo_winBig").removeClass().addClass('liveVideo_winBig_big');
    $("#videoContent").removeClass().addClass('videoContent_big');
    $("#chenggaodu").removeClass().addClass('chenggaodu_big');

    $("#liveVideo_winSmall").css("display","");
    $("#liveVideo_winBig").css("display","none");
    
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
CIIE.Map.prototype.updatePlaySelectorTime=function(time){
	$('#timeNow').text(time);
};
CIIE.Map.prototype.playHeat=function(data){
	if($('#querySelect').val()=='停 止'){
		
		var time=this.heatStartDate.Format('yyyy-MM-dd hh:mm:00');
		this.updatePlaySelectorTime(time);
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
CIIE.Map.prototype.quickLocateHandler=function(e){
	var hot=$(e.currentTarget).attr('name');
	var location=this.locationMap[hot];
    this.updateHotspot(hot);
	
	
	var hot=$(e.currentTarget).attr('name');
	$('.QLCONTENT').css('display','none');
	$('.QLCONTENT[name='+hot+']').css('display','block');
	//this.setView(location.lat,location.lon);

    

};
CIIE.Map.prototype.updateKpis=function(result){
	var qlHotMap=this.qlHotMap;
	var dataMap=result;
	for(var key in qlHotMap){
		var record=dataMap[key];
		var ql=$('.QLCONTENT[name='+key+']');
		if(key=="J-国家会展中心"){
			ql.find('.QLCKPI:eq(0)').find('div:eq(2)').text(Math.ceil(record['s_091']*0.7));
			ql.find('.QLCKPI:eq(1)').find('div:eq(2)').text('0');
			ql.find('.QLCKPI:eq(1)').find('div:eq(2)').css('color','red');
			ql.find('.QLCKPI:eq(2)').find('div:eq(2)').text((record['s_083']/1024/1024*0.7).toFixed(2));
		}else{
			ql.find('.QLCKPI:eq(0)').find('div:eq(2)').text(record['s_091']);
			ql.find('.QLCKPI:eq(1)').find('div:eq(2)').text(record['hwl']);
			ql.find('.QLCKPI:eq(2)').find('div:eq(2)').text((record['s_083']/1024/1024).toFixed(2));
		}
		
    }
    //this.updatePercent(this.hotspot);
    setTimeout(this.updatePercent(this.hotspot),5000);
};
CIIE.Map.prototype.getLocateContentHtml=function(name,show){
	var display="none";
	if(show==true){
		display="block";
	}
    


	var html='<div name="'+name+'" class="QLCONTENT" style="display:'+display+';">'
				+'<div class="horizontalRow" style="margin-top:20px;">'
					+'<div class="QLCKPI">'
						+'<div>用户数</div>'
						+'<div>(人)</div>'
						+'<div>--</div>'
					+'</div>'
					+'<div class="QLCKPI" style="margin-left:5px;">'
						+'<div>2G话务量</div>'
						+'<div>(Erl)</div>'
						+'<div>--</div>'
					+'</div>'
					+'<div class="QLCKPI" style="margin-left:5px;">'
						+'<div>流量</div>'
						+'<div>(GB)</div>'
						+'<div>--</div>'
					+'</div>'
				+'</div>'
				+'<div class="horizontalRow" style="margin-top:30px;">'
					+'<div class="QLCKPI">'
						+'<div>2G小区</div>'
						+'<div>(个)</div>'
						+'<div>--</div>'
					+'</div>'
					+'<div class="QLCKPI" style="margin-left:5px;">'
						+'<div>4G小区</div>'
						+'<div>(个)</div>'
						+'<div>--</div>'
					+'</div>'
					+'<div class="QLCKPI" style="display:none;margin-left:5px;">'
						+'<div>5G站点数</div>'
						+'<div>(个)</div>'
						+'<div>--</div>'
					+'</div>'
					+'<div style="clear:both;"></div>'
				+'</div>'
				+'<div style="clear:both;"></div>'
				+'<div class="horizontalRow" style="padding:20px;">';
                if(true){
				//if(name=='J-国家会展中心'){
					// html+='<div class="horizontalRow" style="width:300px;margin-top:0px;">'
					// 	+'<div>'
					// 		+'<div class="fontSubInfo">人流密度</div>'
					// 		+'<div class="QLCPb01"></div>'
					// 	+'</div>'
					// 	+'<div class="QLCNice" style="margin-left:10px;"></div>'
					// 	+'<div style="clear:both;"></div>'
					// +'</div>'
					
					// +'<div class="horizontalRow" style="width:300px;margin-top:40px;">'
					// 	+'<div>'
					// 		+'<div class="fontSubInfo">网络质量</div>'
					// 		+'<div class="QLCPb02"></div>'
					// 	+'</div>'
					// 	+'<div class="QLCNice" style="margin-left:10px;"></div>'
					// 	+'<div style="clear:both;"></div>'
					// +'</div>';
                    html+='<div class="horizontalRow" style="width:300px;margin-top:0px;">'
                        +'<div>'
                            +'<div class="fontSubInfo">人流密度</div>'
                            +'<div class="QLCProgress">'
                                +'<div class="QLCPoint"></div>'
                            +'</div>'
                        +'</div>'
                        +'<div class="" style="margin-left:10px;"></div>'
                        +'<div style="clear:both;"></div>'
                    +'</div>'
                    
                    +'<div class="horizontalRow" style="width:300px;margin-top:40px;">'
                        +'<div>'
                            +'<div class="fontSubInfo">网络质量</div>'
                            +'<div class="QLCProgress">'
                                +'<div class="QLCPoint"></div>'
                            +'</div>'
                        +'</div>'
                        +'<div class="" style="margin-left:10px;"></div>'
                        +'<div style="clear:both;"></div>'
                    +'</div>';
				// }else{
				// 	html+='<div class="horizontalRow" style="width:300px;margin-top:0px;">'
				// 		+'<div>'
				// 			+'<div class="fontSubInfo">人流密度</div>'
				// 			+'<div class="QLCPb03"></div>'
				// 		+'</div>'
				// 		+'<div class="QLCOk" style="margin-left:10px;"></div>'
				// 		+'<div style="clear:both;"></div>'
				// 	+'</div>'
					
				// 	+'<div class="horizontalRow" style="width:300px;margin-top:40px;">'
				// 		+'<div>'
				// 			+'<div class="fontSubInfo">网络质量</div>'
				// 			+'<div class="QLCPb02"></div>'
				// 		+'</div>'
				// 		+'<div class="QLCNice" style="margin-left:10px;"></div>'
				// 		+'<div style="clear:both;"></div>'
				// 	+'</div>';
				}
				
					
					html+='<div style="margin-top:-50px;">'
						+'<div class="QLCFaultCircle" style="padding-top:20px;">'
							+'<div class="fontContentTitle fontColorRed">0</div>'
							+'<div class="fontUnitTime fontColorRed">个</div>'
						+'</div>'
						+'<div class="fontSubInfo" style="margin-top:15px;">基站故障</div>'
					+'</div>'
				+'</div>'
			+'</div>';
	
	return html;
};
CIIE.Map.prototype.showAll=function(){
	var map=this.qlHotMap;
	var list=[];
	for(var key in map){
		list.push(key);
	}
    //this.hotspot = list.join(',');
	this.updateHotspot(list.join(','));
};
CIIE.Map.prototype.createCtrlBtns=function(){
	var showAll='<img id="showAllBtn" style="cursor:pointer;position:absolute;right:40px;top:70px;"" src="'+BASEPATH+'/static/styles/local-lsm/map/showAll.png" />'
	$('#'+this.divId).append(showAll);
	$('#showAllBtn').on('click',this.showAll.bind(this));
	
	var quickLocate='<div id="quickLocateItems" style="position:absolute;left:40px;top:200px;">'
		+'<div>'
			+'<div content="locateCIIE" class="quickLocate locateCIIE" style="margin-top:20px;" name="J-国家会展中心"></div>'
			+this.getLocateContentHtml('J-国家会展中心',this.hotspot=='J-国家会展中心')
			+'<div content="locateHQA" class="quickLocate locateHQA" style="margin-top:20px;" name="J-虹桥机场"></div>'
			+this.getLocateContentHtml('J-虹桥机场',this.hotspot=='J-虹桥机场')
			+'<div content="locateHQT" class="quickLocate locateHQT" style="margin-top:20px;" name="J-虹桥火车站"></div>'
			+this.getLocateContentHtml('J-虹桥火车站',this.hotspot=='J-虹桥火车站')
			+'<div content="locatePDA" class="quickLocate locatePDA" style="margin-top:20px;" name="J-浦东机场"></div>'
			+this.getLocateContentHtml('J-浦东机场',this.hotspot=='J-浦东机场')
		+'</div>'
		+'<div id="qcMin" stat="normal" class="qcMin" style="position:absolute;left:-50px;top:-30px;width:100px;height:100px;"></div>'
		+'</div>';
		
	
	$('#'+this.divId).append(quickLocate);
	this.setDivMovable($('#quickLocateItems')[0]);
	$('.quickLocate').on('click',this.quickLocateHandler.bind(this));
	
	
	var mapLayerChoosers='<div class="layerChooser mapLayerD2 glowSelected2" style="position:absolute;right:33px;top:236px;"></div>'
						+'<div class="layerChooser mapLayerSat" style="position:absolute;right:33px;top:328px;"></div>'
						+'<div class="layerChooser mapLayerD3" style="position:absolute;right:33px;top:420px;"></div>';
	
	$('#'+this.divId).append(mapLayerChoosers);
	var btnList='<div id="ctrlResource" class="mapCtrlContent" style="position:absolute;right:120px;bottom:10px;display:block;">'
					+'<div style="width:100%;padding-left:10px;">'
						+'<div class="ctrlTitle" style="float:left;">保障资源:</div>'
                        +'<div class="mapCtrlItem" func="2G小区"><div class="ctrlIcon2G"></div><div>2G小区<span class="ctrlCount" id="legendCount2GCell">0</span>个</div><div style="clear:both;"></div></div>'
                        +'<div class="mapCtrlItem" func="FDD小区"><div class="ctrlIconFDD"></div><div>FDD小区<span class="ctrlCount" id="legendCountFDD">0</span>个</div><div style="clear:both;"></div></div>'
                        +'<div class="mapCtrlItem" func="TDD小区"><div class="ctrlIconTDD"></div><div>TDD小区<span class="ctrlCount" id="legendCountTDD">0</span>个</div><div style="clear:both;"></div></div>'
                        +'<div class="mapCtrlItem mapCtrlItemSelected" func="5G站点数" style="display:none;"><div class="ctrlIcon5G"></div><div>5G站点数<span class="ctrlCount" id="legendCount5G">0</span>个</div><div style="clear:both;"></div></div>'
                        +'<div class="mapCtrlItem" func="聚合小区"><div class="ctrlIconCLUSTER"></div><div>聚合小区</div><div style="clear:both;"></div></div>'
						+'<div class="mapCtrlItem" func="基站"><div class="ctrlIconBaseStation"></div><div>基站<span class="ctrlCount" id="legendCount2GBaseStation">0</span>个</div><div style="clear:both;"></div></div>'
						+'<div style="clear:both;"></div>'
						+'<div class="ctrlTitle" style="float:left;width:120px;display:none;"></div>'
						+'<div style="display:none;" class="mapCtrlItem" func="宏站"><div class="ctrlMetrocell"></div><div>宏站<span class="ctrlCount" id="legendCountMotorCell">0</span>个</div><div style="clear:both;"></div></div>'
						+'<div style="display:none;" class="mapCtrlItem" func="室内"><div class="ctrlRoomIn"></div><div>室内<span class="ctrlCount" id="legendCountRoomIn">0</span>个</div><div style="clear:both;"></div></div>'
						+'<div style="display:none;" class="mapCtrlItem" func="室分"><div class="ctrlRoomSplit"></div><div>室分<span class="ctrlCount" id="legendCountRoomSplit">0</span>个</div><div style="clear:both;"></div></div>'
						+'<div style="display:none;" class="mapCtrlItem" func="室外"><div class="ctrlRoomOut"></div><div>室外<span class="ctrlCount" id="legendCountRoomOut">0</span>个</div><div style="clear:both;"></div></div>'
						+'<div style="display:none;" class="mapCtrlItem" func="街道站"><div class="ctrlStreet"></div><div>街道站<span class="ctrlCount" id="legendCountStreet">0</span>个</div><div style="clear:both;"></div></div>'
						+'<div style="clear:both;"></div>'
                        +'<div class="ctrlTitle mapCtrlItem" func="4G扇区" style="float:left;margin: 9px 0px 0px 0px;padding-top: 10px;">4G扇区:</div>'
                        +'<div class="mapCtrlItem mapCtrlItemSelected yjutreds" func="TDD-D"><div class="ctrlIconTDD-D"></div><div>TDD-D</div><div style="clear:both;"></div></div>'
                        +'<div class="mapCtrlItem mapCtrlItemSelected yjutreds" func="TDD-E"><div class="ctrlIconTDD-E"></div><div>TDD-E</div><div style="clear:both;"></div></div>'
                        +'<div class="mapCtrlItem mapCtrlItemSelected yjutreds" func="TDD-F"><div class="ctrlIconTDD-F"></div><div>TDD-F</div><div style="clear:both;"></div></div>'
                        +'<div class="mapCtrlItem mapCtrlItemSelected yjutreds" func="FDD-S"><div class="ctrlIconFDD_S"></div><div>FDD</div><div style="clear:both;"></div></div>'
                        +'<div style="clear:both;"></div>'
                        +'<div class="ctrlTitle mapCtrlItem" func="2G扇区" style="float:left;margin: 9px 0px 0px 0px;padding-top: 10px;">2G扇区:</div>'
                        +'<div class="mapCtrlItem mapCtrlItemSelected yjutreds" func="900M"><div class="ctrlIcon900M"></div><div>900M</div><div style="clear:both;"></div></div>'
                        +'<div class="mapCtrlItem mapCtrlItemSelected yjutreds" func="1800M"><div class="ctrlIcon1800M"></div><div>1800M</div><div style="clear:both;"></div></div>'
                        +'<div style="clear:both;"></div>'
						+'<div class="ctrlTitle" style="float:left;">应急资源:</div>'
						+'<div class="mapCtrlItem mapCtrlItemSelected" func="应急车"><div class="ctrlIconEMERCAR"></div><div>应急车<span class="ctrlCount" id="legendCountEC">0</span>辆</div><div style="clear:both;"></div></div>'
						+'<div class="mapCtrlItem mapCtrlItemSelected" func="指挥车"><div class="map-icon-commandcar" style="width:40px;height:40px;"></div><div>指挥车<span class="ctrlCount" id="legendCountCC">0</span>辆</div><div style="clear:both;"></div></div>'
						+'<div class="mapCtrlItem mapCtrlItemSelected" func="发电车"><div class="ctrlIconELECTRICCAR"></div><div>发电车<span class="ctrlCount" id="legendCountELECTRIC">0</span>辆</div><div style="clear:both;"></div></div>'
						+'<div class="mapCtrlItem mapCtrlItemSelected" func="无人机"><div class="ctrlIconAIRCRAFT"></div><div>无人机<span class="ctrlCount" id="legendCountAIR">0</span>架</div><div style="clear:both;"></div></div>'
						+'<div class="mapCtrlItem mapCtrlItemSelected" func="保障人员"><div class="map-icon-maintainman" style="width:40px;height:40px;"></div><div>保障人员<span class="ctrlCount" id="legendCountMM">0</span>人</div><div style="clear:both;"></div></div>'
						+'<div style="clear:both;"></div>'
                        +'<div class="ctrlTitle" style="float:left;">其&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;他:</div>'
                        //+'<div class="mapCtrlItem" func="备品备件"><div class="ctrlIconsparepart" style="width:40px;height:40px;"></div><div>备品备件<span class="ctrlCount" id="legendCountsparepart">0</span>个</div><div style="clear:both;"></div></div>'
                        +'<div class="mapCtrlItem" func="拨测"><div class="ctrlIcondailtest_red" style="width:40px;height:40px;"></div><div>拨测</div><div style="clear:both;"></div></div>'
                        +'<div style="clear:both;"></div>'
					+'</div>'
				+'</div>'
				+'<div id="ctrlPerformance" class="mapCtrlContent" style="position:absolute;right:30px;bottom:220px;display:none;">'
					+'<div style="width:100%;">'
//						+'<div name="咪咕视频" class="mapCtrlItem"><div class="ctrlIconTOPAPP"></div><div>咪咕视频</div><div style="clear:both;"></div></div>'
						+'<div name="应用小类业务量TOP5" class="mapCtrlItem"><div class="ctrlIconTOPAPP"></div><div>应用小类业务量TOP5</div><div style="clear:both;"></div></div>'
						+'<div name="高流量小区TOP5" class="mapCtrlItem"><div class="ctrlIconTOPFLOW"></div><div>高流量小区TOP5</div><div style="clear:both;"></div></div>'
						+'<div name="低LTE无线接通率TOP5" class="mapCtrlItem"><div class="ctrlIconLOWLTECONN"></div><div>低LTE无线接通率TOP5</div><div style="clear:both;"></div></div>'
                        +'<div name="低GSM无线接通率TOP5" class="mapCtrlItem"><div class="ctrlIconLOWGSMCONN"></div><div>低GSM无线接通率TOP5</div><div style="clear:both;"></div></div>'
                        +'<div style="clear:both;"></div>'
                        +'<div name="高LTE话务量小区TOP5" class="mapCtrlItem"><div class="ctrlIcontopErl"></div><div>高LTE话务量小区TOP5</div><div style="clear:both;"></div></div>'
                        +'<div name="高GSM话务量小区TOP5" class="mapCtrlItem"><div class="ctrlIcontopErl"></div><div>高GSM话务量小区TOP5</div><div style="clear:both;"></div></div>'
                        //+'<div name="高LTE无线接通率TOP5" class="mapCtrlItem"><div class="ctrlIconLOWLTECONN"></div><div>高LTE无线接通率TOP5</div><div style="clear:both;"></div></div>'
						//+'<div name="高GSM无线接通率TOP5" class="mapCtrlItem"><div class="ctrlIconLOWGSMCONN"></div><div>高GSM无线接通率TOP5</div><div style="clear:both;"></div></div>'
						+'<div style="clear:both;"></div>'
					+'</div>'
				+'</div>'
				+'<div id="ctrlFunction" class="mapCtrlContent" style="position:absolute;right:30px;bottom:10px;display:none;">'
					+'<div style="width:100%;">'
						+'<div class="mapCtrlItem"><div class="ctrlIconREPLAY"></div><div>回放功能</div><div style="clear:both;"></div></div>'


                        //保障333333
                        +'<div class="mapCtrlItem protectiveheatlayer" func="场景热力图" style="positon:relative">'
                        +   '<div class="mapCtrlContentSubmenueDiv"><div class="mapCtrlContentSubmenue">'
                        +       '<div class="mapCtrlItemSub selfstyle" func="用户数_c"><div class="ctrlIconRedCircle ctrlIconRedCircleSelect"></div><div style="display: inline-block;">用户数</div><div style="clear:both;"></div></div>'
                        +       '<div class="mapCtrlItemSub selfstyle" func="流量_c"><div class="ctrlIconRedCircle"></div><div style="display: inline-block;">流量</div><div style="clear:both;"></div></div>'
                        +       '<div class="mapCtrlItemSub selfstyle" func="话务量_c"><div class="ctrlIconRedCircle"></div><div style="display: inline-block;">话务量</div><div style="clear:both;"></div></div>'
                        +   '</div></div>'
                        +   '<div class="ctrlIconHEAT hotMap"></div><div>场景热力图</div><div style="clear:both;"></div>'
                        +'</div>'


                        //+'<div class="mapCtrlItem mapCtrlItemSelected"><div class="ctrlIconHEAT hotMap"></div><div>场景热力图</div><div style="clear:both;"></div></div>'
                        



                        //保障44444
                        +'<div class="mapCtrlItem protectiveheatlayer reyhgtsdeagSelect" func="全景热力图" style="positon:relative">'
                        +	'<div class="mapCtrlContentSubmenueDiv"><div class="mapCtrlContentSubmenue">'
                        +       '<div class="mapCtrlItemSub selfstyle" func="用户数"><div class="ctrlIconRedCircle ctrlIconRedCircleSelect"></div><div style="display: inline-block;">用户数</div><div style="clear:both;"></div></div>'
                        +       '<div class="mapCtrlItemSub selfstyle" func="流量"><div class="ctrlIconRedCircle"></div><div style="display: inline-block;">流量</div><div style="clear:both;"></div></div>'
                        +       '<div class="mapCtrlItemSub selfstyle" func="话务量"><div class="ctrlIconRedCircle"></div><div style="display: inline-block;">话务量</div><div style="clear:both;"></div></div>'
                        +   '</div></div>'
                        +   '<div class="ctrlIconHEAT hotMapOfAll4Class"></div><div>全景热力图</div><div style="clear:both;"></div>'
                        +'</div>'

                        // +'<div class="mapCtrlItem protectiveheatlayerDDDDD"><div class="ctrlIconHEAT hotMapOfAll4Class"></div><div>全景热力图</div><div style="clear:both;"></div></div>'
						+'<div class="mapCtrlItem"><div class="ctrlIconDIAL"></div><div>拨测质量</div><div style="clear:both;"></div></div>'
						+'<div class="mapCtrlItem"><div class="ctrlIconSPLINE"></div><div>集客专线</div><div style="clear:both;"></div></div>'
						+'<div name="WiFi运行情况" class="mapCtrlItem"><div class="ctrlIconWIFI"></div><div>WiFi运行情况</div><div style="clear:both;"></div></div>'
						//+'<div class="mapCtrlItem"><div class="ctrlIconVideo"></div><div>现场视频</div><div style="clear:both;"></div></div>'
                        +'<div style="clear:both;"></div>'
                        +'<div class="mapCtrlItem"><div class="ctrlIconVideo"></div><div>现场视频</div><div style="clear:both;"></div></div>'
                        // +'<div class="mapCtrlItem"><div class="ctrlIconTraffic"></div><div>交通枢纽</div><div style="clear:both;"></div></div>'
                        // +'<div class="mapCtrlItem"><div class="ctrlIconHotel"></div><div>酒店</div><div style="clear:both;"></div></div>'
                        // +'<div class="mapCtrlItem"><div class="ctrlIconLine"></div><div>保障线路</div><div style="clear:both;"></div></div>'
						//+'<div style="clear:both;"></div>'
                        
					+'</div>'
				+'</div>'
                +'<div id="ctrlFactor" class="mapCtrlContent" style="position:absolute;right:30px;bottom:10px;display:none;z-index:2">'
                    +'<div style="width:100%;padding-left:10px;">'
                        +'<div class="ctrlTitle mapCtrlItem" func="交通枢纽" style="float:left;padding-top: 10px;">交通枢纽:</div>'
                        +'<div class="mapCtrlItem" func="浦东机场"><div class="ctrlIconAirplane"></div><div>浦东机场</div><div style="clear:both;"></div></div>'
                        +'<div class="mapCtrlItem" func="虹桥机场"><div class="ctrlIconAirplane"></div><div>虹桥机场</div><div style="clear:both;"></div></div>'
                        +'<div class="mapCtrlItem" func="虹桥火车站"><div class="ctrlIconTrain"></div><div>虹桥火车站</div><div style="clear:both;"></div></div>'
                        +'<div class="mapCtrlItem" func="上海站"><div class="ctrlIconTrain"></div><div>上海站</div><div style="clear:both;"></div></div>'
                        +'<div class="mapCtrlItem" func="上海南站"><div class="ctrlIconTrain"></div><div>上海南站</div><div style="clear:both;"></div></div>'
                        +'<div style="clear:both;"></div>'
                        +'<div class="ctrlTitle mapCtrlItem" func="酒店" style="float:left;padding-top: 10px;">酒&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;店:</div>'

                        
                        //666666  
                        +'<div id="top5Hotel">';
                            // +'<div class="mapCtrlItem" func="淳大万丽"><div class="ctrlIconHotel"></div><div>淳大万丽</div><div style="clear:both;"></div></div>'
                            // +'<div class="mapCtrlItem" func="国际会议中心"><div class="ctrlIconHotel"></div><div>国际会议中心</div><div style="clear:both;"></div></div>'
                            // +'<div class="mapCtrlItem" func="浦东香格里拉"><div class="ctrlIconHotel"></div><div>浦东香格里拉</div><div style="clear:both;"></div></div>'
                            // +'<div class="mapCtrlItem" func="和平饭店"><div class="ctrlIconHotel"></div><div>和平饭店</div><div style="clear:both;"></div></div>'
                            // +'<div class="mapCtrlItem" func="东湖宾馆"><div class="ctrlIconHotel"></div><div>东湖宾馆</div><div style="clear:both;"></div></div>'
                        //btnList
                        var hotalData = this.hotalCache;
                        for (var i = 0; i < hotalData.length; i++) {
                            var currObj = hotalData[i];
                            var name = currObj.name;
                            if (i<5) {
                                btnList += '<div class="mapCtrlItem hotalSpecial" func="'+name+'"><div class="ctrlIconHotel"></div><div class="fixedLength" title="'+name+'">'+name+'</div><div style="clear:both;"></div></div>'
                            };
                        };

                        btnList += '</div>'
                        +'<div id="moreHotel">'
                            +'<div class="mapCtrlItem moreHotel" func="更多...." style="position:relative"><div class=""></div><div>更多....</div><div style="clear:both;"></div>'
                            +   '<div class="mapCtrlContentSubmenueOfHotalDiv">'
                            +      '<div id="mapCtrlContentSubmenueOfHotalDivReal" class="mapCtrlContentSubmenue" style="height: 419px;overflow-y: auto;">'
                            //+          '<div class="mapCtrlItem" style="float: none;height: 69px;" func="淳大万丽"><div class="ctrlIconHotel"></div><div class="htrdfhrgf">淳大万丽</div><div style="clear:both;"></div></div>'
                            for (var i = 0; i < hotalData.length; i++) {
                                var currObj = hotalData[i];
                                var name = currObj.name;
                                if (i>4){
                                    btnList += '<div class="mapCtrlItem hotalSpecial" style="float: none;height: 69px;" func="'+name+'"><div class="ctrlIconHotel"></div><div class="htrdfhrgf">'+name+'</div><div style="clear:both;"></div></div>'
                                }
                            };


                  btnList +=      '</div>'
                            +   '</div>'
                            +'</div>'
                        +'</div>'

                        +'<div style="clear:both;"></div>'
                        +'<div class="ctrlTitle mapCtrlItem" func="保障线路" style="float:left;padding-top: 10px;">保障线路:</div>'
                        +'<div class="mapCtrlItem" func="浦东机场线路"><div class="ctrlIconLine"></div><div>浦东机场</div><div style="clear:both;"></div></div>'
                        +'<div class="mapCtrlItem" func="虹桥机场线路"><div class="ctrlIconLine" style="width:40px;height:40px;"></div><div>虹桥机场</div><div style="clear:both;"></div></div>'
                        +'<div class="mapCtrlItem" func="沪杭高铁线路"><div class="ctrlIconLine"></div><div>沪杭高铁</div><div style="clear:both;"></div></div>'
                        +'<div class="mapCtrlItem" func="京沪/沪宁高铁线路"><div class="ctrlIconLine"></div><div>京沪/沪宁高铁</div><div style="clear:both;"></div></div>'
                        +'<div class="mapCtrlItem" func="虹桥火车站线路"><div class="ctrlIconLine" style="width:40px;height:40px;"></div><div>虹桥火车站</div><div style="clear:both;"></div></div>'
                        +'<div class="mapCtrlItem" func="上海站线路"><div class="ctrlIconLine" style="width:40px;height:40px;"></div><div>上海站</div><div style="clear:both;"></div></div>'
                        +'<div class="mapCtrlItem" func="上海南站线路"><div class="ctrlIconLine" style="width:40px;height:40px;"></div><div>上海南站</div><div style="clear:both;"></div></div>'
                        +'<div style="clear:both;"></div>'
                        // +'<div class="ctrlTitle" style="float:left;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>'
                        // +'<div class="mapCtrlItem" func="上海南站线路"><div class="ctrlIconLine" style="width:40px;height:40px;"></div><div>上海南站</div><div style="clear:both;"></div></div>'
                        // +'<div style="clear:both;"></div>'
                    +'</div>'
                +'</div>'
                +'<div id="ctrlTopology" class="mapCtrlContent" style="position:absolute;right:30px;bottom:220px;display:none;min-height: 100px;">'
                    +'<div style="width:100%;">'
                        //+'<div name="WiFi运行情况" class="mapCtrlItem"><div class="ctrlIconWIFI"></div><div>WiFi运行情况</div><div style="clear:both;"></div></div>'
                        //+'<div name="核心网" class="mapCtrlItem"><div class="ctrlIcontopology"></div><div>核心网</div><div style="clear:both;"></div></div>'
                        //+'<div name="核心网(传统语音)" class="mapCtrlItem"><div class="ctrlIcontopology"></div><div>核心网(传统语音)</div><div style="clear:both;"></div></div>'
                        //+'<div class="mapCtrlItem"><div class="ctrlIconVideo"></div><div>现场视频</div><div style="clear:both;"></div></div>'
                        +'<div class="mapCtrlItem"><div class="ctrlIcontopology corenetcloselogo"></div><div>核心网(EPC)</div><div style="clear:both;"></div></div>'
                        +'<div class="mapCtrlItem"><div class="ctrlIcontopology corenetTraditionalcloselogo"></div><div>核心网(传统语音)</div><div style="clear:both;"></div></div>'
                        +'<div class="mapCtrlItem"><div class="ctrlIcontopology metropolitanAreaNetcloselogo"></div><div>城域网</div><div style="clear:both;"></div></div>'
                        +'<div class="mapCtrlItem"><div class="ctrlIcontopology transmissionNetcloselogo"></div><div>传输网</div><div style="clear:both;"></div></div>'
                        +'<div id="opticalCableCtrl" class="mapCtrlItem"><div class="ctrlIcontopology transmissionNetcloselogo"></div><div>传输光缆</div><div style="clear:both;"></div></div>'
                        +'<div style="clear:both;"></div>'
                    +'</div>'
                +'</div>'
                +'<div title="保障要素" target="ctrlFactor" class="ctrlFactor mapCtrlBtns" style="position:absolute;right:30px;bottom:603px;"></div>'
                +'<div title="资源图层" target="ctrlResource" class="ctrlResource mapCtrlBtns glowSelected" style="position:absolute;right:30px;bottom:518px;"></div>'
				+'<div title="性能列表" target="ctrlPerformance" class="ctrlPerformance mapCtrlBtns" style="position:absolute;right:30px;bottom:433px;"></div>'
                +'<div title="功能图层" target="ctrlFunction" class="ctrlFunction mapCtrlBtns" style="position:absolute;right:30px;bottom:350px;"></div>'
                +'<div title="传输拓扑" target="ctrlTopology" class="ctrlTopology mapCtrlBtns" style="position:absolute;right:30px;bottom:265px;"></div>'
                +'<div title="信息播报" target="infobroadcast" class="ctrlRobot mapCtrlBtns" style="width:256px;height:256px;border:none;position:absolute;right:0px;bottom:0px;"><div id="infobroadnum" class="infobroadnum" style="display:none">0</div></div>'
	
	$('#'+this.divId).append(btnList);
	$('.mapCtrlBtns').on('click',this.ctrlBtnClick.bind(this));
    $('.mapCtrlItem').off('click').on('click',this.ctrlFuncClick.bind(this));
	$('.mapCtrlItemSub').on('click',this.ctrlFuncClickOfhot.bind(this));
	$('.layerChooser').on('click',this.baseLayerChange.bind(this));


    //特殊处理全景热力图二级菜单
    $('.protectiveheatlayer').on('mouseover',this.showMapCtrlContentSubmenue.bind(this));
    $('.protectiveheatlayer').on('mouseout',this.hideMapCtrlContentSubmenue.bind(this));

    $('.mapCtrlItemSub').on('click',this.loadHotAccordingIndex.bind(this));

    //酒店 
    $("#top5Hotel").off('click').on('click','.mapCtrlItem',this.ctrlFuncClickOfMoreHotal.bind(this));
    $("#mapCtrlContentSubmenueOfHotalDivReal").off('click').on('click','.mapCtrlItem',this.ctrlFuncClickOfMoreHotal.bind(this));

    if (FROMMODEL == null || FROMMODEL == "null"){
        $("div.mapCtrlItemSelected").removeClass('mapCtrlItemSelected');
        $("#ctrlResource").css('display', 'none');
        $("div[target='ctrlResource']").removeClass('glowSelected');

        $(".reyhgtsdeagSelect").addClass('mapCtrlItemSelected');
        $(".hotalSpecial").addClass('mapCtrlItemSelected');
        $(".protectiveheatlayerDDDDD").addClass('mapCtrlItemSelected');
    }
    if (FROMMODEL=='ciie'){
        $("#ctrlResource").css('display', 'none');
        $("div[target='ctrlResource']").removeClass('glowSelected');

    }


    //更多酒店操作 666666
    $('.moreHotel').on('mouseover',this.showMapCtrlContentSubmenueOfHotal.bind(this));
    $('.moreHotel').on('mouseout',this.hideMapCtrlContentSubmenueOfHotal.bind(this));

    
	
};
CIIE.Map.prototype.showMapCtrlContentSubmenue=function(e){
    //$('.mapCtrlContentSubmenueDiv').show();
    $(e.currentTarget).find('.mapCtrlContentSubmenueDiv').show();
};
CIIE.Map.prototype.hideMapCtrlContentSubmenue=function(e){
    //$('.mapCtrlContentSubmenueDiv').hide();
    $(e.currentTarget).find('.mapCtrlContentSubmenueDiv').hide();
};


CIIE.Map.prototype.showMapCtrlContentSubmenueOfHotal=function(e){
    if ($("#mapCtrlContentSubmenueOfHotalDiv").css('display') == "block") {}else{
        

        //控制样式
        //$('.mapCtrlContentSubmenueOfHotalDiv').show();
        $(e.currentTarget).find('.mapCtrlContentSubmenueOfHotalDiv').show();
        //控制外层宽度
        var widthArr = [];
        $("#mapCtrlContentSubmenueOfHotalDivReal").find('.htrdfhrgf').each(function(index, el) {
            widthArr.push($(el).width());
        });
        var maxWidth = Math.max.apply(null,widthArr) + 100 + 40 ;
        $(".mapCtrlContentSubmenueOfHotalDiv").width(maxWidth + 20);
        $("#mapCtrlContentSubmenueOfHotalDivReal").width(maxWidth);



        
    };
};
CIIE.Map.prototype.hideMapCtrlContentSubmenueOfHotal=function(e){
    //$('.mapCtrlContentSubmenueOfHotalDiv').hide();
    $(e.currentTarget).find('.mapCtrlContentSubmenueOfHotalDiv').hide();
    $(".mapCtrlContentSubmenueOfHotalDiv").width(300);
    $("#mapCtrlContentSubmenueOfHotalDivReal").width(300);
};





CIIE.Map.prototype.loadHotAccordingIndex=function(e){
    e.stopPropagation();
    $('.ctrlIconRedCircle').removeClass('ctrlIconRedCircleSelect').removeClass('mapCtrlItemSelected');
    $('.selfstyle ').removeClass('mapCtrlItemSelected');

    $(e.currentTarget).find('.ctrlIconRedCircle').eq(0).addClass('ctrlIconRedCircleSelect');

    //$(".protectiveheatlayer").addClass('mapCtrlItemSelected');
    $(e.currentTarget).parent().parent().parent().addClass('mapCtrlItemSelected');

}





CIIE.Map.prototype.baseLayerChange=function(e){
//	layerChooser
//	mapLayerD2 mapLayerD3 mapLayerSat
	
	$('.layerChooser').removeClass('glowSelected2');
	$(e.currentTarget).addClass('glowSelected2');
	
	if($(e.currentTarget).hasClass('mapLayerD2')){
		this.baseLayer.addTo(this.map);
		this.imgLayer3d.setOpacity(0);
		this.imgLayer2d.setOpacity(1);
		this.map.removeLayer(this.satLayer);
	}else if($(e.currentTarget).hasClass('mapLayerSat')){
		this.satLayer.addTo(this.map);
		this.imgLayer3d.setOpacity(1);
		this.imgLayer2d.setOpacity(0);
		this.map.removeLayer(this.baseLayer);
	}else if($(e.currentTarget).hasClass('mapLayerD3')){
		this.showModel();
	}
	
};
CIIE.Map.prototype.ctrlBtnClick=function(e){
	var target=$(e.currentTarget).attr('target');
	$('.mapCtrlBtns').removeClass('glowSelected');
	if($('#'+target).css('display')=='block'){
		$('#'+target).css('display','none');

        //特殊处理信息播报清空操作
        if(target == "infobroadcast"){
            this.infobroadcastnum = 0;
            $("#infobroadnum").css('display', 'none');
            //$("#infobroadcastcontentdiv").empty();
        }
	}else{
		$('.mapCtrlContent').css('display','none');
		$('#'+target).css('display','block');
		$(e.currentTarget).addClass('glowSelected');

            
        if(target == "ctrlFactor"){
            this.initHotalData();
            //修改酒店内容
            var hotalData = this.hotalCache;
            //添加数据
            //1.先添加top5  2.添加非top5酒店
            //+'<div class="mapCtrlItem" func="淳大万丽"><div class="ctrlIconHotel"></div><div>淳大万丽</div><div style="clear:both;"></div></div>'
            var htmlTop5Str = '';
            var htmlNoTop5Str = '';
            for (var i = 0; i < hotalData.length; i++) {
                var currObj = hotalData[i];
                var name = currObj.name;
                if (i<5) {
                    htmlTop5Str += '<div class="mapCtrlItem hotalSpecial" func="'+name+'"><div class="ctrlIconHotel"></div><div class="fixedLength" title="'+name+'">'+name+'</div><div style="clear:both;"></div></div>'
                };
                if (i>4){
                    htmlNoTop5Str += '<div class="mapCtrlItem hotalSpecial" style="float: none;height: 69px;" func="'+name+'"><div class="ctrlIconHotel"></div><div class="htrdfhrgf">'+name+'</div><div style="clear:both;"></div></div>'
                }
            };
            // $("#top5Hotel").html(htmlTop5Str);
            // $("#mapCtrlContentSubmenueOfHotalDivReal").html(htmlNoTop5Str);

            $("#top5Hotel").empty();
            $("#top5Hotel").append(htmlTop5Str);
            $("#mapCtrlContentSubmenueOfHotalDivReal").empty();
            $("#mapCtrlContentSubmenueOfHotalDivReal").append(htmlNoTop5Str);

            $(".hotalSpecial").addClass('mapCtrlItemSelected');
            $(".ctrlTitle[func='酒店']").addClass('mapCtrlItemSelected');


            //$("#top5Hotel").find('.mapCtrlItem').off('click').on('click',this.ctrlFuncClick.bind(this));
            $("#top5Hotel").off('click').on('click','.mapCtrlItem',this.ctrlFuncClickOfMoreHotal.bind(this));
            $("#mapCtrlContentSubmenueOfHotalDivReal").off('click').on('click','.mapCtrlItem',this.ctrlFuncClickOfMoreHotal.bind(this));

            var hotalData = this.hotalCache;
            for (var i = 0; i < hotalData.length; i++) {
                var currObj = hotalData[i];
                var name = currObj.name;
                this.ctrlSpecialLayerOfMoreHotal(name,true);
            }
        } 

	};
	
};
//55555
CIIE.Map.prototype.ctrlFuncClickOfhot=function(e){
    e.stopPropagation();
    var func=$(e.currentTarget).attr('func');
    var isToOff=$(e.currentTarget).find('.ctrlIconRedCircle').eq(0).hasClass('ctrlIconRedCircleSelect');

    $(e.currentTarget).parent().parent().parent().removeClass('mapCtrlItemSelected');
    $(e.currentTarget).parent().parent().parent().siblings('.protectiveheatlayer').removeClass('mapCtrlItemSelected');

    //if(isToOff){
    if(false){
        //$(e.currentTarget).find('.ctrlIconRedCircle').eq(0).hasClass('ctrlIconRedCircleSelect');
    }else{
        $(e.currentTarget).find('.ctrlIconRedCircle').eq(0).addClass('ctrlIconRedCircleSelect');

        if(this.heatMapLayerOfAll4BigClass !== undefined && this.heatMapLayerOfAll4BigClass != null){
            if (this.heatMapLayerOfAll4BigClass._data){
                this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
            }
        }
        if(this.heatMapLayer !== undefined && this.heatMapLayer != null){
            if (this.heatMapLayer._data){
                this.map.removeLayer(this.heatMapLayer);
            }
        }
        switch(func){
            case '用户数_c':
                // if (this.map.hasLayer(this.shangxingLayerTDD_D)) {this.map.removeLayer(this.shangxingLayerTDD_D);}
                // if (this.map.hasLayer(this.shangxingLayerTDD_E)) {this.map.removeLayer(this.shangxingLayerTDD_E);}
                // if (this.map.hasLayer(this.shangxingLayerTDD_F)) {this.map.removeLayer(this.shangxingLayerTDD_F);}
                // if (this.map.hasLayer(this.shangxingLayerFDD_S)) {this.map.removeLayer(this.shangxingLayerFDD_S);}
                // if (this.map.hasLayer(this.shangxingLayer900M)) {this.map.removeLayer(this.shangxingLayer900M);}
                // if (this.map.hasLayer(this.shangxingLayer1800M)) {this.map.removeLayer(this.shangxingLayer1800M);}
                $("div.yjutreds").each(function(index, el) {
                    $(el).removeClass('mapCtrlItemSelected')
                }.bind(this)); 
                
                $("div.hotMap").parent().removeClass('mapCtrlItemSelected'); 
                $("div.hotMapOfAll4Class").parent().removeClass('mapCtrlItemSelected'); 
                if (this.map.hasLayer(this.heatMapLayer)) {
                    this.map.removeLayer(this.heatMapLayer);
                }
                if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                    this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                }

                this.heatKpi = '用户数';
                this.heatMapLayer = null;
                if(this.heatMapLayer==null){
                    this.updateHeatTimeLine(this.updateHeat);
                }else{
                    this.map.addLayer(this.heatMapLayer);
                }
                break; 
            case '流量_c':
                // if (this.map.hasLayer(this.shangxingLayerTDD_D)) {this.map.removeLayer(this.shangxingLayerTDD_D);}
                // if (this.map.hasLayer(this.shangxingLayerTDD_E)) {this.map.removeLayer(this.shangxingLayerTDD_E);}
                // if (this.map.hasLayer(this.shangxingLayerTDD_F)) {this.map.removeLayer(this.shangxingLayerTDD_F);}
                // if (this.map.hasLayer(this.shangxingLayerFDD_S)) {this.map.removeLayer(this.shangxingLayerFDD_S);}
                // if (this.map.hasLayer(this.shangxingLayer900M)) {this.map.removeLayer(this.shangxingLayer900M);}
                // if (this.map.hasLayer(this.shangxingLayer1800M)) {this.map.removeLayer(this.shangxingLayer1800M);}
                $("div.yjutreds").each(function(index, el) {
                    $(el).removeClass('mapCtrlItemSelected')
                }.bind(this)); 
                
                $("div.hotMap").parent().removeClass('mapCtrlItemSelected'); 
                $("div.hotMapOfAll4Class").parent().removeClass('mapCtrlItemSelected'); 
                if (this.map.hasLayer(this.heatMapLayer)) {
                    this.map.removeLayer(this.heatMapLayer);
                }
                if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                    this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                }

                this.heatKpi = '流量';
                this.heatMapLayer = null;
                if(this.heatMapLayer==null){
                    this.updateHeatTimeLine(this.updateHeat);
                }else{
                    this.map.addLayer(this.heatMapLayer);
                }
                break;
            case '话务量_c':
                // if (this.map.hasLayer(this.shangxingLayerTDD_D)) {this.map.removeLayer(this.shangxingLayerTDD_D);}
                // if (this.map.hasLayer(this.shangxingLayerTDD_E)) {this.map.removeLayer(this.shangxingLayerTDD_E);}
                // if (this.map.hasLayer(this.shangxingLayerTDD_F)) {this.map.removeLayer(this.shangxingLayerTDD_F);}
                // if (this.map.hasLayer(this.shangxingLayerFDD_S)) {this.map.removeLayer(this.shangxingLayerFDD_S);}
                // if (this.map.hasLayer(this.shangxingLayer900M)) {this.map.removeLayer(this.shangxingLayer900M);}
                // if (this.map.hasLayer(this.shangxingLayer1800M)) {this.map.removeLayer(this.shangxingLayer1800M);}
                $("div.yjutreds").each(function(index, el) {
                    $(el).removeClass('mapCtrlItemSelected')
                }.bind(this)); 
                
                $("div.hotMap").parent().removeClass('mapCtrlItemSelected'); 
                $("div.hotMapOfAll4Class").parent().removeClass('mapCtrlItemSelected'); 
                if (this.map.hasLayer(this.heatMapLayer)) {
                    this.map.removeLayer(this.heatMapLayer);
                }
                if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                    this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                }

                this.heatKpi = '话务量';
                this.heatMapLayer = null;
                if(this.heatMapLayer==null){
                    this.updateHeatTimeLine(this.updateHeat);
                }else{
                    this.map.addLayer(this.heatMapLayer);
                }
                break;
            case '全景热力图':
                // if (this.map.hasLayer(this.shangxingLayerTDD_D)) {this.map.removeLayer(this.shangxingLayerTDD_D);}
                // if (this.map.hasLayer(this.shangxingLayerTDD_E)) {this.map.removeLayer(this.shangxingLayerTDD_E);}
                // if (this.map.hasLayer(this.shangxingLayerTDD_F)) {this.map.removeLayer(this.shangxingLayerTDD_F);}
                // if (this.map.hasLayer(this.shangxingLayerFDD_S)) {this.map.removeLayer(this.shangxingLayerFDD_S);}
                // if (this.map.hasLayer(this.shangxingLayer900M)) {this.map.removeLayer(this.shangxingLayer900M);}
                // if (this.map.hasLayer(this.shangxingLayer1800M)) {this.map.removeLayer(this.shangxingLayer1800M);}
                $("div.yjutreds").each(function(index, el) {
                    $(el).removeClass('mapCtrlItemSelected')
                }.bind(this)); 
                
                $("div.hotMap").parent().removeClass('mapCtrlItemSelected'); 
                if (this.map.hasLayer(this.heatMapLayer)) {
                    this.map.removeLayer(this.heatMapLayer);
                }

                $(".selfstyle").eq(0).find('div').eq(0).addClass('ctrlIconRedCircleSelect');
                this.heatKpiOfAll = '用户数';
                this.heatMapLayerOfAll4BigClass = null;
                if(this.heatMapLayerOfAll4BigClass==null){
                    this.updateHeatTimeLine(this.updateHeatOfAll4BigClass);
                }else{
                    this.map.addLayer(this.heatMapLayerOfAll4BigClass);
                }
                break; 
            case '用户数':
                // if (this.map.hasLayer(this.shangxingLayerTDD_D)) {this.map.removeLayer(this.shangxingLayerTDD_D);}
                // if (this.map.hasLayer(this.shangxingLayerTDD_E)) {this.map.removeLayer(this.shangxingLayerTDD_E);}
                // if (this.map.hasLayer(this.shangxingLayerTDD_F)) {this.map.removeLayer(this.shangxingLayerTDD_F);}
                // if (this.map.hasLayer(this.shangxingLayerFDD_S)) {this.map.removeLayer(this.shangxingLayerFDD_S);}
                // if (this.map.hasLayer(this.shangxingLayer900M)) {this.map.removeLayer(this.shangxingLayer900M);}
                // if (this.map.hasLayer(this.shangxingLayer1800M)) {this.map.removeLayer(this.shangxingLayer1800M);}
                $("div.yjutreds").each(function(index, el) {
                    $(el).removeClass('mapCtrlItemSelected')
                }.bind(this)); 
                
                $("div.hotMap").parent().removeClass('mapCtrlItemSelected'); 
                if (this.map.hasLayer(this.heatMapLayer)) {
                    this.map.removeLayer(this.heatMapLayer);
                }

                this.heatKpiOfAll = '用户数';
                this.heatMapLayerOfAll4BigClass = null;
                if(this.heatMapLayerOfAll4BigClass==null){
                    this.updateHeatTimeLine(this.updateHeatOfAll4BigClass);
                }else{
                    this.map.addLayer(this.heatMapLayerOfAll4BigClass);
                }
                break; 
            case '流量':
                // if (this.map.hasLayer(this.shangxingLayerTDD_D)) {this.map.removeLayer(this.shangxingLayerTDD_D);}
                // if (this.map.hasLayer(this.shangxingLayerTDD_E)) {this.map.removeLayer(this.shangxingLayerTDD_E);}
                // if (this.map.hasLayer(this.shangxingLayerTDD_F)) {this.map.removeLayer(this.shangxingLayerTDD_F);}
                // if (this.map.hasLayer(this.shangxingLayerFDD_S)) {this.map.removeLayer(this.shangxingLayerFDD_S);}
                // if (this.map.hasLayer(this.shangxingLayer900M)) {this.map.removeLayer(this.shangxingLayer900M);}
                // if (this.map.hasLayer(this.shangxingLayer1800M)) {this.map.removeLayer(this.shangxingLayer1800M);}
                $("div.yjutreds").each(function(index, el) {
                    $(el).removeClass('mapCtrlItemSelected')
                }.bind(this)); 
                
                $("div.hotMap").parent().removeClass('mapCtrlItemSelected'); 
                if (this.map.hasLayer(this.heatMapLayer)) {
                    this.map.removeLayer(this.heatMapLayer);
                }

                this.heatKpiOfAll = '流量';
                this.heatMapLayerOfAll4BigClass = null;
                if(this.heatMapLayerOfAll4BigClass==null){
                    this.updateHeatTimeLine(this.updateHeatOfAll4BigClass);
                }else{
                    this.map.addLayer(this.heatMapLayerOfAll4BigClass);
                }
                break;   
            case '话务量':
                // if (this.map.hasLayer(this.shangxingLayerTDD_D)) {this.map.removeLayer(this.shangxingLayerTDD_D);}
                // if (this.map.hasLayer(this.shangxingLayerTDD_E)) {this.map.removeLayer(this.shangxingLayerTDD_E);}
                // if (this.map.hasLayer(this.shangxingLayerTDD_F)) {this.map.removeLayer(this.shangxingLayerTDD_F);}
                // if (this.map.hasLayer(this.shangxingLayerFDD_S)) {this.map.removeLayer(this.shangxingLayerFDD_S);}
                // if (this.map.hasLayer(this.shangxingLayer900M)) {this.map.removeLayer(this.shangxingLayer900M);}
                // if (this.map.hasLayer(this.shangxingLayer1800M)) {this.map.removeLayer(this.shangxingLayer1800M);}
                $("div.yjutreds").each(function(index, el) {
                    $(el).removeClass('mapCtrlItemSelected')
                }.bind(this)); 
                
                $("div.hotMap").parent().removeClass('mapCtrlItemSelected'); 
                if (this.map.hasLayer(this.heatMapLayer)) {
                    this.map.removeLayer(this.heatMapLayer);
                }

                this.heatKpiOfAll = '话务量';
                this.heatMapLayerOfAll4BigClass = null;
                if(this.heatMapLayerOfAll4BigClass==null){
                    this.updateHeatTimeLine(this.updateHeatOfAll4BigClass);
                }else{
                    this.map.addLayer(this.heatMapLayerOfAll4BigClass);
                }
                break;

        }
    }

};
//666666
CIIE.Map.prototype.ctrlFuncClickOfMoreHotal=function(e){
        e.stopPropagation();
        var func=$(e.currentTarget).attr('func');
        if(func==''||func==null){
            func=$($(e.currentTarget).children()[1]).text();
        }
        var isToOff=$(e.currentTarget).hasClass('mapCtrlItemSelected');
        
        if(isToOff){
            $(e.currentTarget).removeClass('mapCtrlItemSelected');
            this.ctrlSpecialLayerOfMoreHotal(func,false);
            $(".ctrlTitle[func='酒店']").removeClass('mapCtrlItemSelected');
        }else{
            $(e.currentTarget).addClass('mapCtrlItemSelected');
            if (this.map.hasLayer(this.heatMapLayer)) {
                this.map.removeLayer(this.heatMapLayer);
                $("#ctrlFunction").find('div.hotMap').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
            }
            if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                $("#ctrlFunction").find('div.hotMapOfAll4Class').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
            }
            this.ctrlSpecialLayerOfMoreHotal(func,true);
            var selectNum = 0;
            $(".hotalSpecial").each(function(index, el) {
                if($(el).hasClass('mapCtrlItemSelected')){
                    selectNum++;
                }
            });
            if(selectNum == this.hotalCache.length){
                $(".ctrlTitle[func='酒店']").addClass('mapCtrlItemSelected');
            }


        }
}
CIIE.Map.prototype.ctrlFuncClick=function(e){
    e.stopPropagation();
	var func=$(e.currentTarget).attr('func');
	if(func==''||func==null){
		func=$($(e.currentTarget).children()[1]).text();
	}
	var isToOff=$(e.currentTarget).hasClass('mapCtrlItemSelected');
    
    //控制酒店不走此方法
    var flag = false;
    var hotalData = this.hotalCache;
    for (var i = 0; i < hotalData.length; i++) {
            var currObj = hotalData[i];
            if(func== currObj.name){
                flag = true;
                break;
            }
    }
    if(func.indexOf('更多')>-1 || func.indexOf('...')>-1){flag = true;}
    if(flag){return;};


    
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
			case 'WiFi运行情况':
				this.infoWin4.hide();
				break;
			case '低GSM无线接通率TOP5':
				this.infoWin3.hide();
				break;
            case '高LTE话务量小区TOP5':
                this.infoWin5.hide();
                break;
            case '高GSM话务量小区TOP5':
                this.infoWin6.hide();
                break;
            case '高LTE无线接通率TOP5':
                this.infoWin7.hide();
                break;    
            case '高GSM无线接通率TOP5':
                this.infoWin8.hide();
                break;            
			case '回放功能':
				this.updateHeatTimeLine(function(){
					$('#conditionsSelect').css('display','none');
				});
				break;
			case '2G小区':
				this.map.removeLayer(this.markersLayer2G);
				break;   
            case '基站':
                this.map.removeLayer(this.markersLayerBaseStation);
                break;    
            case '备品备件':
                this.map.removeLayer(this.markersLayerSparePart);
                break; 
            case '拨测':
                this.map.removeLayer(this.markersLayerDialTest);
                break;            
			case 'FDD小区':
				this.map.removeLayer(this.markersLayerFDD);
				break;
			case 'TDD小区':
				this.map.removeLayer(this.markersLayerTDD);
				break;
			case '5G站点数':
				this.map.removeLayer(this.markersLayer5G);
				break;
			case '宏站':
				this.map.removeLayer(this.markersLayerMotorCell);
				break;
			case '室内':
				this.map.removeLayer(this.markersLayerRoomIn);
				break;
			case '室分':
				this.map.removeLayer(this.markersLayerRoomSplit);
				break;
			case '室外':
				this.map.removeLayer(this.markersLayerRoomOut);
				break;
			case '街道站':
				this.map.removeLayer(this.markersLayerStreet);
				break;
			case '聚合小区':
				this.map.removeLayer(this.markerClusters);
				break;          
			case '应急车':
				this.map.removeLayer(this.markersLayerCAR);
				break;
			case '指挥车':
				this.map.removeLayer(this.markersLayerCAR2);
				break;
			case '发电车':
				this.map.removeLayer(this.markersLayerCAR3);
				break;
			case '无人机':
				this.map.removeLayer(this.markersLayerCAR4);
				break;
			case '保障人员':
				this.map.removeLayer(this.markersLayerMan);
				break;
			case '场景热力图':
                if (this.map.hasLayer(this.heatMapLayer)) {
                    this.map.removeLayer(this.heatMapLayer);
                };
                if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                    this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                    this.heatMapLayerOfAll4BigClass = null;
                };
                $(".selfstyle").each(function(index, el) {
                    $(el).find('div').eq(0).removeClass('ctrlIconRedCircleSelect');
                });
				//this.map.removeLayer(this.heatMapLayer);
				break;
            case '用户数_c':
                if (this.map.hasLayer(this.heatMapLayer)) {
                    this.map.removeLayer(this.heatMapLayer);
                    this.heatMapLayer = null;
                };
                //this.map.removeLayer(this.heatMapLayer);
                break;
            case '流量_c':
                if (this.map.hasLayer(this.heatMapLayer)) {
                    this.map.removeLayer(this.heatMapLayer);
                    this.heatMapLayer = null;
                };
                //this.map.removeLayer(this.heatMapLayer);
                break;
            case '话务量_c':
                if (this.map.hasLayer(this.heatMapLayer)) {
                    this.map.removeLayer(this.heatMapLayer);
                    this.heatMapLayer = null;
                };
                //this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                break;
            case '全景热力图':
                if (this.map.hasLayer(this.heatMapLayer)) {
                    this.map.removeLayer(this.heatMapLayer);
                };
                if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                    this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                    this.heatMapLayerOfAll4BigClass = null;
                };
                $(".selfstyle").each(function(index, el) {
                    $(el).find('div').eq(0).removeClass('ctrlIconRedCircleSelect');
                });

                //this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                break;  
            case '用户数':
                if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                    this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                    this.heatMapLayerOfAll4BigClass = null;
                };
                //this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                break;
            case '流量':
                if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                    this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                    this.heatMapLayerOfAll4BigClass = null;
                };
                //this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                break;
            case '话务量':
                if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                    this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                    this.heatMapLayerOfAll4BigClass = null;
                };
                //this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                break;              
            case '扇形图层':
                this.map.removeLayer(this.shangxingLayer);
                break;
            case '4G扇区':
                $('div.mapCtrlItem[func="TDD-D"]').eq(0).trigger('click'); 
                $('div.mapCtrlItem[func="TDD-E"]').eq(0).trigger('click');
                $('div.mapCtrlItem[func="TDD-F"]').eq(0).trigger('click');
                $('div.mapCtrlItem[func="FDD-S"]').eq(0).trigger('click');

                var flag1 = $('div.mapCtrlItem[func="TDD-D"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag1 == isToOff) {
                    $('div.mapCtrlItem[func="TDD-D"]').eq(0).trigger('click');
                };
                var flag2 = $('div.mapCtrlItem[func="TDD-E"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag2 == isToOff) {
                    $('div.mapCtrlItem[func="TDD-E"]').eq(0).trigger('click');
                }
                var flag3 = $('div.mapCtrlItem[func="TDD-F"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag3 == isToOff) {
                    $('div.mapCtrlItem[func="TDD-F"]').eq(0).trigger('click');
                }
                var flag4 = $('div.mapCtrlItem[func="FDD-S"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag4 == isToOff) {
                    $('div.mapCtrlItem[func="FDD-S"]').eq(0).trigger('click');
                }
                break;    
            case 'TDD-D':
                this.map.removeLayer(this.shangxingLayerTDD_D);
                break;
            case 'TDD-E':
                this.map.removeLayer(this.shangxingLayerTDD_E);
                break;    
            case 'TDD-F':
                this.map.removeLayer(this.shangxingLayerTDD_F);
                break;    
            case 'FDD-S':
                this.map.removeLayer(this.shangxingLayerFDD_S);
                break; 
            case '2G扇区':
                $('div.mapCtrlItem[func="900M"]').eq(0).trigger('click'); 
                $('div.mapCtrlItem[func="1800M"]').eq(0).trigger('click');

                var flag1 = $('div.mapCtrlItem[func="900M"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag1 == isToOff) {
                    $('div.mapCtrlItem[func="900M"]').eq(0).trigger('click');
                };
                var flag2 = $('div.mapCtrlItem[func="1800M"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag2 == isToOff) {
                    $('div.mapCtrlItem[func="1800M"]').eq(0).trigger('click');
                }
                break;          
            case '900M':
                this.map.removeLayer(this.shangxingLayer900M);
                break;    
            case '1800M':
                this.map.removeLayer(this.shangxingLayer1800M);
                break;    
			case '交通枢纽':
                // $('div.mapCtrlItem[func="浦东机场"]').removeClass('mapCtrlItemSelected');
                // $('div.mapCtrlItem[func="虹桥机场"]').removeClass('mapCtrlItemSelected');
                // $('div.mapCtrlItem[func="虹桥火车站"]').removeClass('mapCtrlItemSelected');
                // $('div.mapCtrlItem[func="上海站"]').removeClass('mapCtrlItemSelected');
                // $('div.mapCtrlItem[func="上海南站"]').removeClass('mapCtrlItemSelected');
                // this.ctrlSpecialLayer('浦东机场');
                // this.ctrlSpecialLayer('虹桥机场');
                // this.ctrlSpecialLayer('虹桥火车站');
                // this.ctrlSpecialLayer('上海站');
                // this.ctrlSpecialLayer('上海南站');
                if (this.pdtitle == null) {} else{
                    this.pdtitle.setOpacity(1);
                    this.hqtitle.setOpacity(1);
                    this.hqttitle.setOpacity(1);
                }
                
                $('div.mapCtrlItem[func="浦东机场"]').eq(0).trigger('click'); 
                $('div.mapCtrlItem[func="虹桥机场"]').eq(0).trigger('click');
                $('div.mapCtrlItem[func="虹桥火车站"]').eq(0).trigger('click');
                $('div.mapCtrlItem[func="上海站"]').eq(0).trigger('click');
                $('div.mapCtrlItem[func="上海南站"]').eq(0).trigger('click');

                var flag1 = $('div.mapCtrlItem[func="浦东机场"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag1 == isToOff) {
                    $('div.mapCtrlItem[func="浦东机场"]').eq(0).trigger('click');
                };
                var flag2 = $('div.mapCtrlItem[func="虹桥机场"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag2 == isToOff) {
                    $('div.mapCtrlItem[func="虹桥机场"]').eq(0).trigger('click');
                }
                var flag3 = $('div.mapCtrlItem[func="虹桥火车站"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag3 == isToOff) {
                    $('div.mapCtrlItem[func="虹桥火车站"]').eq(0).trigger('click');
                }
                var flag4 = $('div.mapCtrlItem[func="上海站"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag4 == isToOff) {
                    $('div.mapCtrlItem[func="上海站"]').eq(0).trigger('click');
                }
                var flag5 = $('div.mapCtrlItem[func="上海南站"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag5 == isToOff) {
                    $('div.mapCtrlItem[func="上海南站"]').eq(0).trigger('click');
                }

				break;
			case '酒店':
				//this.ctrlSpecialLayer(func);


                // $('div.mapCtrlItem[func="淳大万丽"]').eq(0).trigger('click'); 
                // $('div.mapCtrlItem[func="国际会议中心"]').eq(0).trigger('click'); 
                // $('div.mapCtrlItem[func="浦东香格里拉"]').eq(0).trigger('click'); 
                // $('div.mapCtrlItem[func="和平饭店"]').eq(0).trigger('click'); 
                // $('div.mapCtrlItem[func="东湖宾馆"]').eq(0).trigger('click'); 
                // var flag1 = $('div.mapCtrlItem[func="淳大万丽"]').eq(0).hasClass('mapCtrlItemSelected');
                // if (flag1 == isToOff) {
                //     $('div.mapCtrlItem[func="淳大万丽"]').eq(0).trigger('click');
                // };
                // var flag2 = $('div.mapCtrlItem[func="国际会议中心"]').eq(0).hasClass('mapCtrlItemSelected');
                // if (flag2 == isToOff) {
                //     $('div.mapCtrlItem[func="国际会议中心"]').eq(0).trigger('click');
                // };
                // var flag3 = $('div.mapCtrlItem[func="浦东香格里拉"]').eq(0).hasClass('mapCtrlItemSelected');
                // if (flag3 == isToOff) {
                //     $('div.mapCtrlItem[func="浦东香格里拉"]').eq(0).trigger('click');
                // };
                // var flag4 = $('div.mapCtrlItem[func="和平饭店"]').eq(0).hasClass('mapCtrlItemSelected');
                // if (flag4 == isToOff) {
                //     $('div.mapCtrlItem[func="和平饭店"]').eq(0).trigger('click');
                // };
                // var flag5 = $('div.mapCtrlItem[func="东湖宾馆"]').eq(0).hasClass('mapCtrlItemSelected');
                // if (flag5 == isToOff) {
                //     $('div.mapCtrlItem[func="东湖宾馆"]').eq(0).trigger('click');
                // };


                var hotalData = this.hotalCache;
                for (var i = 0; i < hotalData.length; i++) {
                    var currObj = hotalData[i];
                    var name = currObj.name;
                    //$('div.mapCtrlItem[func="'+name+'"]').eq(0).trigger('click'); 
                    //var flag1 = $('div.mapCtrlItem[func="'+name+'"]').eq(0).hasClass('mapCtrlItemSelected');
                    $('div.mapCtrlItem[func="'+name+'"]').eq(0).removeClass('mapCtrlItemSelected');
                    if (isToOff) {
                        //$('div.mapCtrlItem[func="'+name+'"]').eq(0).trigger('click');
                        this.ctrlSpecialLayerOfMoreHotal(name,false);
                    };
                        
                }






				break;
			case '保障线路':

                this.ctrlSpecialLayer(func,false); 
				$('div.mapCtrlItem[func="浦东机场线路"]').eq(0).trigger('click'); 
                $('div.mapCtrlItem[func="虹桥机场线路"]').eq(0).trigger('click');
                $('div.mapCtrlItem[func="沪杭高铁线路"]').eq(0).trigger('click');
                $('div.mapCtrlItem[func="京沪/沪宁高铁线路"]').eq(0).trigger('click');
                $('div.mapCtrlItem[func="虹桥火车站线路"]').eq(0).trigger('click');
                $('div.mapCtrlItem[func="上海站线路"]').eq(0).trigger('click');
                $('div.mapCtrlItem[func="上海南站线路"]').eq(0).trigger('click');

                var flag1 = $('div.mapCtrlItem[func="浦东机场线路"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag1 == isToOff) {
                    $('div.mapCtrlItem[func="浦东机场线路"]').eq(0).trigger('click');
                    this.ctrlSpecialLayer(func); 
                };
                var flag2 = $('div.mapCtrlItem[func="虹桥机场线路"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag2 == isToOff) {
                    $('div.mapCtrlItem[func="虹桥机场线路"]').eq(0).trigger('click');
                }
                var flag3 = $('div.mapCtrlItem[func="沪杭高铁线路"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag3 == isToOff) {
                    $('div.mapCtrlItem[func="沪杭高铁线路"]').eq(0).trigger('click');
                }
                var flag4 = $('div.mapCtrlItem[func="京沪/沪宁高铁线路"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag4 == isToOff) {
                    $('div.mapCtrlItem[func="京沪/沪宁高铁线路"]').eq(0).trigger('click');
                }
                var flag5 = $('div.mapCtrlItem[func="虹桥火车站线路"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag5 == isToOff) {
                    $('div.mapCtrlItem[func="虹桥火车站线路"]').eq(0).trigger('click');
                }
                var flag6 = $('div.mapCtrlItem[func="上海站线路"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag6 == isToOff) {
                    $('div.mapCtrlItem[func="上海站线路"]').eq(0).trigger('click');
                }
                var flag7 = $('div.mapCtrlItem[func="上海南站线路"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag7 == isToOff) {
                    $('div.mapCtrlItem[func="上海南站线路"]').eq(0).trigger('click');
                }
				break;
            case '现场视频':
                $('#liveVideo').css('display','none');
                break;
            case '核心网(EPC)':
                $('#corenet').css('display','none');
                break;  
            case '核心网(传统语音)':
                $('#corenetTraditional').css('display','none');
                break;
            case '城域网':
                $('#metropolitanAreaNet').css('display','none');
                break; 
            case '传输网':
                $('#transmissionNet').css('display','none');
                break;       
            case '传输光缆':
                this.closeTransCable();
                break;   
            case '浦东机场':
                if (this.pdtitle == null) {} else{
                    this.pdtitle.setOpacity(1);
                    this.hqtitle.setOpacity(1);
                    this.hqttitle.setOpacity(1);
                }    
                    this.ctrlSpecialLayer(func);
                    $(".ctrlTitle[func='交通枢纽']").removeClass('mapCtrlItemSelected');  

                break;  
            case '虹桥机场':
                if (this.pdtitle == null) {} else{
                    this.pdtitle.setOpacity(1);
                    this.hqtitle.setOpacity(1);
                    this.hqttitle.setOpacity(1);
                }    
                    this.ctrlSpecialLayer(func);
                     $(".ctrlTitle[func='交通枢纽']").removeClass('mapCtrlItemSelected'); 
                break; 
            case '虹桥火车站':
                if (this.pdtitle == null) {} else{
                    this.pdtitle.setOpacity(1);
                    this.hqtitle.setOpacity(1);
                    this.hqttitle.setOpacity(1);
                }    
                    this.ctrlSpecialLayer(func);
                     $(".ctrlTitle[func='交通枢纽']").removeClass('mapCtrlItemSelected'); 
                break; 
            case '上海站':
                if (this.pdtitle == null) {} else{
                    this.pdtitle.setOpacity(1);
                    this.hqtitle.setOpacity(1);
                    this.hqttitle.setOpacity(1);
                }    
                    this.ctrlSpecialLayer(func);
                     $(".ctrlTitle[func='交通枢纽']").removeClass('mapCtrlItemSelected'); 
                break; 
            case '上海南站':
                if (this.pdtitle == null) {} else{
                    this.pdtitle.setOpacity(1);
                    this.hqtitle.setOpacity(1);
                    this.hqttitle.setOpacity(1);
                }    
                    this.ctrlSpecialLayer(func);
                     $(".ctrlTitle[func='交通枢纽']").removeClass('mapCtrlItemSelected'); 
                break;  
            case '五星酒店':
                this.ctrlSpecialLayer(func);
                break;
            case '淳大万丽':
                this.ctrlSpecialLayer(func);
                break;
            case '国际会议中心':
                this.ctrlSpecialLayer(func);
                break; 
            case '浦东香格里拉':
                this.ctrlSpecialLayer(func);
                break; 
            case '和平饭店':
                this.ctrlSpecialLayer(func);
                break; 
            case '东湖宾馆':
                this.ctrlSpecialLayer(func);
                break;                     
            case '浦东机场线路':
                this.ctrlSpecialLayer(func);
                $(".ctrlTitle[func='保障线路']").removeClass('mapCtrlItemSelected'); 
                break;
            case '虹桥机场线路':
                this.ctrlSpecialLayer(func);
                $(".ctrlTitle[func='保障线路']").removeClass('mapCtrlItemSelected'); 
                break;
            case '沪杭高铁线路':
                this.ctrlSpecialLayer(func);
                $(".ctrlTitle[func='保障线路']").removeClass('mapCtrlItemSelected'); 
                break;
            case '京沪/沪宁高铁线路':
                this.ctrlSpecialLayer(func);
                $(".ctrlTitle[func='保障线路']").removeClass('mapCtrlItemSelected'); 
                break;
            case '虹桥火车站线路':
                this.ctrlSpecialLayer(func);
                $(".ctrlTitle[func='保障线路']").removeClass('mapCtrlItemSelected'); 
                break;
            case '上海站线路':
                this.ctrlSpecialLayer(func);
                $(".ctrlTitle[func='保障线路']").removeClass('mapCtrlItemSelected'); 
                break;
            case '上海南站线路':
                this.ctrlSpecialLayer(func);
                $(".ctrlTitle[func='保障线路']").removeClass('mapCtrlItemSelected'); 
                break;                        
				
			
		}
	}else{
        $(e.currentTarget).addClass('mapCtrlItemSelected');
		switch(func){
			case '咪咕视频':
				this.infoWin00.show();
				break;
			case '应用小类业务量TOP5':
                $("#qcMin").attr('stat','min');
                $('#quickLocateItems>div[id!=qcMin]').hide(1000);
				this.infoWin0.show();
				break;
			case '高流量小区TOP5':
                $("#qcMin").attr('stat','min');
                $('#quickLocateItems>div[id!=qcMin]').hide(1000);
				this.infoWin1.show();
				break;
			case '低LTE无线接通率TOP5':
                $("#qcMin").attr('stat','min');
                $('#quickLocateItems>div[id!=qcMin]').hide(1000);
				this.infoWin2.show();
				break;
			case '低GSM无线接通率TOP5':
                $("#qcMin").attr('stat','min');
                $('#quickLocateItems>div[id!=qcMin]').hide(1000);
				this.infoWin3.show();
				break;
			case 'WiFi运行情况':
				this.infoWin4.show();
				break;
            case '高LTE话务量小区TOP5':
                $("#qcMin").attr('stat','min');
                $('#quickLocateItems>div[id!=qcMin]').hide(1000);
                this.infoWin5.show();
                break;
            case '高GSM话务量小区TOP5':
                $("#qcMin").attr('stat','min');
                $('#quickLocateItems>div[id!=qcMin]').hide(1000);
                this.infoWin6.show();
                break;    
            case '高LTE无线接通率TOP5':
                $("#qcMin").attr('stat','min');
                $('#quickLocateItems>div[id!=qcMin]').hide(1000);
                this.infoWin7.show();
                break;
            case '高GSM无线接通率TOP5':
                $("#qcMin").attr('stat','min');
                $('#quickLocateItems>div[id!=qcMin]').hide(1000);
                this.infoWin8.show();
                break;     
			case '回放功能':
				this.updateHeatTimeLine(function(){
					$('#conditionsSelect').css('display','block');
				});
				break;
			case '2G小区':
				this.map.addLayer(this.markersLayer2G);
				break;  
            case '基站':
                this.map.addLayer(this.markersLayerBaseStation);
                break;   
            case '备品备件':
                //this.map.addLayer(this.markersLayerSparePart);
                this.getSpareParts();     //备件备品
                break; 
            case '拨测':
                this.map.addLayer(this.markersLayerDialTest);
                break;             
			case 'FDD小区':
				this.map.addLayer(this.markersLayerFDD);
				break;
			case 'TDD小区':
				this.map.addLayer(this.markersLayerTDD);
				break;
			case '5G站点数':
				this.map.addLayer(this.markersLayer5G);
				break;
			case '宏站':
				this.map.addLayer(this.markersLayerMotorCell);
				break;
			case '室内':
				this.map.addLayer(this.markersLayerRoomIn);
				break;
			case '室分':
				this.map.addLayer(this.markersLayerRoomSplit);
				break;
			case '室外':
				this.map.addLayer(this.markersLayerRoomOut);
				break;
			case '街道站':
				this.map.addLayer(this.markersLayerStreet);
				break;
			case '聚合小区':
				this.map.addLayer(this.markerClusters);
				break;          
			case '应急车':
				this.map.addLayer(this.markersLayerCAR);
				break;
			case '指挥车':
				this.map.addLayer(this.markersLayerCAR2);
				break;
			case '发电车':
				this.map.addLayer(this.markersLayerCAR3);
				break;
			case '无人机':
				this.map.addLayer(this.markersLayerCAR4);
				break;
			case '保障人员':
				this.map.addLayer(this.markersLayerMan);
				break;
			case '场景热力图':
                // if (this.map.hasLayer(this.shangxingLayerTDD_D)) {this.map.removeLayer(this.shangxingLayerTDD_D);}
                // if (this.map.hasLayer(this.shangxingLayerTDD_E)) {this.map.removeLayer(this.shangxingLayerTDD_E);}
                // if (this.map.hasLayer(this.shangxingLayerTDD_F)) {this.map.removeLayer(this.shangxingLayerTDD_F);}
                // if (this.map.hasLayer(this.shangxingLayerFDD_S)) {this.map.removeLayer(this.shangxingLayerFDD_S);}
                // if (this.map.hasLayer(this.shangxingLayer900M)) {this.map.removeLayer(this.shangxingLayer900M);}
                // if (this.map.hasLayer(this.shangxingLayer1800M)) {this.map.removeLayer(this.shangxingLayer1800M);}
                $("div.yjutreds").each(function(index, el) {
                    $(el).removeClass('mapCtrlItemSelected')
                }.bind(this)); 

                //$("div.hotMap").parent().removeClass('mapCtrlItemSelected'); 
                $("div.hotMapOfAll4Class").parent().removeClass('mapCtrlItemSelected'); 
                if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                    this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                };
                if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                    this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                }
                $(".selfstyle").each(function(index, el) {
                    $(el).find('div').eq(0).removeClass('ctrlIconRedCircleSelect');
                });
                $(".selfstyle").eq(0).find('div').eq(0).addClass('ctrlIconRedCircleSelect');
                this.heatKpi = '用户数';
                this.heatMapLayer = null;
				if(this.heatMapLayer==null){
					this.updateHeatTimeLine(this.updateHeat);
				}else{
					this.map.addLayer(this.heatMapLayer);
				}
				break;
            
            case '全景热力图':
                // if (this.map.hasLayer(this.shangxingLayerTDD_D)) {this.map.removeLayer(this.shangxingLayerTDD_D);}
                // if (this.map.hasLayer(this.shangxingLayerTDD_E)) {this.map.removeLayer(this.shangxingLayerTDD_E);}
                // if (this.map.hasLayer(this.shangxingLayerTDD_F)) {this.map.removeLayer(this.shangxingLayerTDD_F);}
                // if (this.map.hasLayer(this.shangxingLayerFDD_S)) {this.map.removeLayer(this.shangxingLayerFDD_S);}
                // if (this.map.hasLayer(this.shangxingLayer900M)) {this.map.removeLayer(this.shangxingLayer900M);}
                // if (this.map.hasLayer(this.shangxingLayer1800M)) {this.map.removeLayer(this.shangxingLayer1800M);}
                $("div.yjutreds").each(function(index, el) {
                    $(el).removeClass('mapCtrlItemSelected')
                }.bind(this)); 
                
                $("div.hotMap").parent().removeClass('mapCtrlItemSelected'); 
                //$("div.hotMapOfAll4Class").parent().removeClass('mapCtrlItemSelected'); 
                if (this.map.hasLayer(this.heatMapLayer)) {
                    this.map.removeLayer(this.heatMapLayer);
                }
                
                $(".selfstyle").each(function(index, el) {
                    $(el).find('div').eq(0).removeClass('ctrlIconRedCircleSelect');
                });
                $(".selfstyle").eq(3).find('div').eq(0).addClass('ctrlIconRedCircleSelect');
                this.heatKpiOfAll = '用户数';
                this.heatMapLayerOfAll4BigClass = null;
                if(this.heatMapLayerOfAll4BigClass==null){
                    this.updateHeatTimeLine(this.updateHeatOfAll4BigClass);
                }else{
                    this.map.addLayer(this.heatMapLayerOfAll4BigClass);
                }
                break;     
            case '扇形图层':
                if(this.shangxingLayer==null){
                    //this.updateHeatTimeLine(this.updateHeat);
                }else{
                    this.map.addLayer(this.shangxingLayer);
                }
                break; 
            case '4G扇区':
                // if (this.map.hasLayer(this.heatMapLayer)) {
                //     this.map.removeLayer(this.heatMapLayer);
                //     $("#ctrlFunction").find('div.hotMap').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }
                // if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                //     this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                //     $("#ctrlFunction").find('div.hotMapOfAll4Class').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }


                $('div.mapCtrlItem[func="TDD-D"]').eq(0).trigger('click'); 
                $('div.mapCtrlItem[func="TDD-E"]').eq(0).trigger('click');
                $('div.mapCtrlItem[func="TDD-F"]').eq(0).trigger('click');
                $('div.mapCtrlItem[func="FDD-S"]').eq(0).trigger('click');

                var flag1 = $('div.mapCtrlItem[func="TDD-D"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag1 == isToOff) {
                    $('div.mapCtrlItem[func="TDD-D"]').eq(0).trigger('click');
                };
                var flag2 = $('div.mapCtrlItem[func="TDD-E"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag2 == isToOff) {
                    $('div.mapCtrlItem[func="TDD-E"]').eq(0).trigger('click');
                }
                var flag3 = $('div.mapCtrlItem[func="TDD-F"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag3 == isToOff) {
                    $('div.mapCtrlItem[func="TDD-F"]').eq(0).trigger('click');
                }
                var flag4 = $('div.mapCtrlItem[func="FDD-S"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag4 == isToOff) {
                    $('div.mapCtrlItem[func="FDD-S"]').eq(0).trigger('click');
                }
                break;      
            case 'TDD-D':
                // if (this.map.hasLayer(this.heatMapLayer)) {
                //     this.map.removeLayer(this.heatMapLayer);
                //     $("#ctrlFunction").find('div.hotMap').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }
                // if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                //     this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                //     $("#ctrlFunction").find('div.hotMapOfAll4Class').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }
                // if (this.map.hasLayer(this.shangxingLayerTDD_D)) {this.map.removeLayer(this.shangxingLayerTDD_D);}
                // if (this.map.hasLayer(this.shangxingLayerTDD_E)) {this.map.removeLayer(this.shangxingLayerTDD_E);}
                // if (this.map.hasLayer(this.shangxingLayerTDD_F)) {this.map.removeLayer(this.shangxingLayerTDD_F);}
                // if (this.map.hasLayer(this.shangxingLayerFDD_S)) {this.map.removeLayer(this.shangxingLayerFDD_S);}
                // if (this.map.hasLayer(this.shangxingLayer900M)) {this.map.removeLayer(this.shangxingLayer900M);}
                // if (this.map.hasLayer(this.shangxingLayer1800M)) {this.map.removeLayer(this.shangxingLayer1800M);}
                $("div.yjutreds").each(function(index, el) {
                    if ($(el).hasClass('mapCtrlItemSelected')){
                        var func = $(el).attr('func');
                        if (func == 'TDD-D') {this.map.addLayer(this.shangxingLayerTDD_D);}
                        if (func == 'TDD-E') {this.map.addLayer(this.shangxingLayerTDD_E);}
                        if (func == 'TDD-F') {this.map.addLayer(this.shangxingLayerTDD_F);}
                        if (func == 'FDD-S') {this.map.addLayer(this.shangxingLayerFDD_S);}
                        if (func == '900M') {this.map.addLayer(this.shangxingLayer900M);}
                        if (func == '1800M') {this.map.addLayer(this.shangxingLayer1800M);}
                    }
                }.bind(this));  
                //this.map.addLayer(this.shangxingLayerTDD_D);
                break;
            case 'TDD-E':
                // if (this.map.hasLayer(this.heatMapLayer)) {
                //     this.map.removeLayer(this.heatMapLayer);
                //     $("#ctrlFunction").find('div.hotMap').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }
                // if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                //     this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                //     $("#ctrlFunction").find('div.hotMapOfAll4Class').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }
                // if (this.map.hasLayer(this.shangxingLayerTDD_D)) {this.map.removeLayer(this.shangxingLayerTDD_D);}
                // if (this.map.hasLayer(this.shangxingLayerTDD_E)) {this.map.removeLayer(this.shangxingLayerTDD_E);}
                // if (this.map.hasLayer(this.shangxingLayerTDD_F)) {this.map.removeLayer(this.shangxingLayerTDD_F);}
                // if (this.map.hasLayer(this.shangxingLayerFDD_S)) {this.map.removeLayer(this.shangxingLayerFDD_S);}
                // if (this.map.hasLayer(this.shangxingLayer900M)) {this.map.removeLayer(this.shangxingLayer900M);}
                // if (this.map.hasLayer(this.shangxingLayer1800M)) {this.map.removeLayer(this.shangxingLayer1800M);}
                $("div.yjutreds").each(function(index, el) {
                    if ($(el).hasClass('mapCtrlItemSelected')){
                        var func = $(el).attr('func');
                        if (func == 'TDD-D') {this.map.addLayer(this.shangxingLayerTDD_D);}
                        if (func == 'TDD-E') {this.map.addLayer(this.shangxingLayerTDD_E);}
                        if (func == 'TDD-F') {this.map.addLayer(this.shangxingLayerTDD_F);}
                        if (func == 'FDD-S') {this.map.addLayer(this.shangxingLayerFDD_S);}
                        if (func == '900M') {this.map.addLayer(this.shangxingLayer900M);}
                        if (func == '1800M') {this.map.addLayer(this.shangxingLayer1800M);}
                    }
                }.bind(this)); 
                //this.map.addLayer(this.shangxingLayerTDD_E);
                break;    
            case 'TDD-F':
                // if (this.map.hasLayer(this.heatMapLayer)) {
                //     this.map.removeLayer(this.heatMapLayer);
                //     $("#ctrlFunction").find('div.hotMap').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }
                // if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                //     this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                //     $("#ctrlFunction").find('div.hotMapOfAll4Class').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }
                // if (this.map.hasLayer(this.shangxingLayerTDD_D)) {this.map.removeLayer(this.shangxingLayerTDD_D);}
                // if (this.map.hasLayer(this.shangxingLayerTDD_E)) {this.map.removeLayer(this.shangxingLayerTDD_E);}
                // if (this.map.hasLayer(this.shangxingLayerTDD_F)) {this.map.removeLayer(this.shangxingLayerTDD_F);}
                // if (this.map.hasLayer(this.shangxingLayerFDD_S)) {this.map.removeLayer(this.shangxingLayerFDD_S);}
                // if (this.map.hasLayer(this.shangxingLayer900M)) {this.map.removeLayer(this.shangxingLayer900M);}
                // if (this.map.hasLayer(this.shangxingLayer1800M)) {this.map.removeLayer(this.shangxingLayer1800M);}
                $("div.yjutreds").each(function(index, el) {
                    if ($(el).hasClass('mapCtrlItemSelected')){
                        var func = $(el).attr('func');
                        if (func == 'TDD-D') {this.map.addLayer(this.shangxingLayerTDD_D);}
                        if (func == 'TDD-E') {this.map.addLayer(this.shangxingLayerTDD_E);}
                        if (func == 'TDD-F') {this.map.addLayer(this.shangxingLayerTDD_F);}
                        if (func == 'FDD-S') {this.map.addLayer(this.shangxingLayerFDD_S);}
                        if (func == '900M') {this.map.addLayer(this.shangxingLayer900M);}
                        if (func == '1800M') {this.map.addLayer(this.shangxingLayer1800M);}
                    }
                }.bind(this));  
                //this.map.addLayer(this.shangxingLayerTDD_F);
                break;    
            case 'FDD-S':
                // if (this.map.hasLayer(this.heatMapLayer)) {
                //     this.map.removeLayer(this.heatMapLayer);
                //     $("#ctrlFunction").find('div.hotMap').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }
                // if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                //     this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                //     $("#ctrlFunction").find('div.hotMapOfAll4Class').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }
                // if (this.map.hasLayer(this.shangxingLayerTDD_D)) {this.map.removeLayer(this.shangxingLayerTDD_D);}
                // if (this.map.hasLayer(this.shangxingLayerTDD_E)) {this.map.removeLayer(this.shangxingLayerTDD_E);}
                // if (this.map.hasLayer(this.shangxingLayerTDD_F)) {this.map.removeLayer(this.shangxingLayerTDD_F);}
                // if (this.map.hasLayer(this.shangxingLayerFDD_S)) {this.map.removeLayer(this.shangxingLayerFDD_S);}
                // if (this.map.hasLayer(this.shangxingLayer900M)) {this.map.removeLayer(this.shangxingLayer900M);}
                // if (this.map.hasLayer(this.shangxingLayer1800M)) {this.map.removeLayer(this.shangxingLayer1800M);}
                $("div.yjutreds").each(function(index, el) {
                    if ($(el).hasClass('mapCtrlItemSelected')){
                        var func = $(el).attr('func');
                        if (func == 'TDD-D') {this.map.addLayer(this.shangxingLayerTDD_D);}
                        if (func == 'TDD-E') {this.map.addLayer(this.shangxingLayerTDD_E);}
                        if (func == 'TDD-F') {this.map.addLayer(this.shangxingLayerTDD_F);}
                        if (func == 'FDD-S') {this.map.addLayer(this.shangxingLayerFDD_S);}
                        if (func == '900M') {this.map.addLayer(this.shangxingLayer900M);}
                        if (func == '1800M') {this.map.addLayer(this.shangxingLayer1800M);}
                    }
                }.bind(this)); 
                //this.map.addLayer(this.shangxingLayerFDD_S);
                break;
            case '2G扇区':
                // if (this.map.hasLayer(this.heatMapLayer)) {
                //     this.map.removeLayer(this.heatMapLayer);
                //     $("#ctrlFunction").find('div.hotMap').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }
                // if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                //     this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                //     $("#ctrlFunction").find('div.hotMapOfAll4Class').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }
                $('div.mapCtrlItem[func="900M"]').eq(0).trigger('click'); 
                $('div.mapCtrlItem[func="1800M"]').eq(0).trigger('click');

                var flag1 = $('div.mapCtrlItem[func="900M"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag1 == isToOff) {
                    $('div.mapCtrlItem[func="900M"]').eq(0).trigger('click');
                };
                var flag2 = $('div.mapCtrlItem[func="1800M"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag2 == isToOff) {
                    $('div.mapCtrlItem[func="1800M"]').eq(0).trigger('click');
                }
                break;        
            case '900M':
                // if (this.map.hasLayer(this.heatMapLayer)) {
                //     this.map.removeLayer(this.heatMapLayer);
                //     $("#ctrlFunction").find('div.hotMap').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }
                // if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                //     this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                //     $("#ctrlFunction").find('div.hotMapOfAll4Class').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }

                // if (this.map.hasLayer(this.shangxingLayerTDD_D)) {this.map.removeLayer(this.shangxingLayerTDD_D);}
                // if (this.map.hasLayer(this.shangxingLayerTDD_E)) {this.map.removeLayer(this.shangxingLayerTDD_E);}
                // if (this.map.hasLayer(this.shangxingLayerTDD_F)) {this.map.removeLayer(this.shangxingLayerTDD_F);}
                // if (this.map.hasLayer(this.shangxingLayerFDD_S)) {this.map.removeLayer(this.shangxingLayerFDD_S);}
                // if (this.map.hasLayer(this.shangxingLayer900M)) {this.map.removeLayer(this.shangxingLayer900M);}
                // if (this.map.hasLayer(this.shangxingLayer1800M)) {this.map.removeLayer(this.shangxingLayer1800M);}
                $("div.yjutreds").each(function(index, el) {
                    if ($(el).hasClass('mapCtrlItemSelected')){
                        var func = $(el).attr('func');
                        if (func == 'TDD-D') {this.map.addLayer(this.shangxingLayerTDD_D);}
                        if (func == 'TDD-E') {this.map.addLayer(this.shangxingLayerTDD_E);}
                        if (func == 'TDD-F') {this.map.addLayer(this.shangxingLayerTDD_F);}
                        if (func == 'FDD-S') {this.map.addLayer(this.shangxingLayerFDD_S);}
                        if (func == '900M') {this.map.addLayer(this.shangxingLayer900M);}
                        if (func == '1800M') {this.map.addLayer(this.shangxingLayer1800M);}
                    }
                }.bind(this));  
                //this.map.addLayer(this.shangxingLayer900M);
                break;    
            case '1800M':
                // if (this.map.hasLayer(this.heatMapLayer)) {
                //     this.map.removeLayer(this.heatMapLayer);
                //     $("#ctrlFunction").find('div.hotMap').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }
                // if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                //     this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                //     $("#ctrlFunction").find('div.hotMapOfAll4Class').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }

                // if (this.map.hasLayer(this.shangxingLayerTDD_D)) {this.map.removeLayer(this.shangxingLayerTDD_D);}
                // if (this.map.hasLayer(this.shangxingLayerTDD_E)) {this.map.removeLayer(this.shangxingLayerTDD_E);}
                // if (this.map.hasLayer(this.shangxingLayerTDD_F)) {this.map.removeLayer(this.shangxingLayerTDD_F);}
                // if (this.map.hasLayer(this.shangxingLayerFDD_S)) {this.map.removeLayer(this.shangxingLayerFDD_S);}
                // if (this.map.hasLayer(this.shangxingLayer900M)) {this.map.removeLayer(this.shangxingLayer900M);}
                // if (this.map.hasLayer(this.shangxingLayer1800M)) {this.map.removeLayer(this.shangxingLayer1800M);}
                $("div.yjutreds").each(function(index, el) {
                    if ($(el).hasClass('mapCtrlItemSelected')){
                        var func = $(el).attr('func');
                        if (func == 'TDD-D') {this.map.addLayer(this.shangxingLayerTDD_D);}
                        if (func == 'TDD-E') {this.map.addLayer(this.shangxingLayerTDD_E);}
                        if (func == 'TDD-F') {this.map.addLayer(this.shangxingLayerTDD_F);}
                        if (func == 'FDD-S') {this.map.addLayer(this.shangxingLayerFDD_S);}
                        if (func == '900M') {this.map.addLayer(this.shangxingLayer900M);}
                        if (func == '1800M') {this.map.addLayer(this.shangxingLayer1800M);}
                    }
                }.bind(this));  
                this.map.addLayer(this.shangxingLayer1800M);
                break;      
			case '交通枢纽':
                // $('div.mapCtrlItem[func="浦东机场"]').addClass('mapCtrlItemSelected');
                // $('div.mapCtrlItem[func="虹桥机场"]').addClass('mapCtrlItemSelected');
                // $('div.mapCtrlItem[func="虹桥火车站"]').addClass('mapCtrlItemSelected');
                // $('div.mapCtrlItem[func="上海站"]').addClass('mapCtrlItemSelected');
                // $('div.mapCtrlItem[func="上海南站"]').addClass('mapCtrlItemSelected');
                // this.ctrlSpecialLayer('浦东机场');
                // this.ctrlSpecialLayer('虹桥机场');
                // this.ctrlSpecialLayer('虹桥火车站');
                // this.ctrlSpecialLayer('上海站');
                // this.ctrlSpecialLayer('上海南站');
                if (this.pdtitle == null) {} else{
                    this.pdtitle.setOpacity(0);
                    this.hqtitle.setOpacity(0);
                    this.hqttitle.setOpacity(0);
                }
                if (this.map.hasLayer(this.heatMapLayer)) {
                    this.map.removeLayer(this.heatMapLayer);
                    $("#ctrlFunction").find('div.hotMap').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                }
                if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                    this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                    $("#ctrlFunction").find('div.hotMapOfAll4Class').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                }

                $('div.mapCtrlItem[func="浦东机场"]').eq(0).trigger('click');
                $('div.mapCtrlItem[func="虹桥机场"]').eq(0).trigger('click');
                $('div.mapCtrlItem[func="虹桥火车站"]').eq(0).trigger('click');
                $('div.mapCtrlItem[func="上海站"]').eq(0).trigger('click');
                $('div.mapCtrlItem[func="上海南站"]').eq(0).trigger('click');

                var flag1 = $('div.mapCtrlItem[func="浦东机场"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag1 == isToOff) {
                    $('div.mapCtrlItem[func="浦东机场"]').eq(0).trigger('click');
                };
                var flag2 = $('div.mapCtrlItem[func="虹桥机场"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag2 == isToOff) {
                    $('div.mapCtrlItem[func="虹桥机场"]').eq(0).trigger('click');
                }
                var flag3 = $('div.mapCtrlItem[func="虹桥火车站"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag3 == isToOff) {
                    $('div.mapCtrlItem[func="虹桥火车站"]').eq(0).trigger('click');
                }
                var flag4 = $('div.mapCtrlItem[func="上海站"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag4 == isToOff) {
                    $('div.mapCtrlItem[func="上海站"]').eq(0).trigger('click');
                }
                var flag5 = $('div.mapCtrlItem[func="上海南站"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag5 == isToOff) {
                    $('div.mapCtrlItem[func="上海南站"]').eq(0).trigger('click');
                }


				break;
			case '酒店':
                if (this.map.hasLayer(this.heatMapLayer)) {
                    this.map.removeLayer(this.heatMapLayer);
                    $("#ctrlFunction").find('div.hotMap').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                }
                if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                    this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                    $("#ctrlFunction").find('div.hotMapOfAll4Class').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                }

				//this.ctrlSpecialLayer(func);
                // $('div.mapCtrlItem[func="淳大万丽"]').eq(0).trigger('click'); 
                // $('div.mapCtrlItem[func="国际会议中心"]').eq(0).trigger('click'); 
                // $('div.mapCtrlItem[func="浦东香格里拉"]').eq(0).trigger('click'); 
                // $('div.mapCtrlItem[func="和平饭店"]').eq(0).trigger('click'); 
                // $('div.mapCtrlItem[func="东湖宾馆"]').eq(0).trigger('click'); 
                // var flag1 = $('div.mapCtrlItem[func="淳大万丽"]').eq(0).hasClass('mapCtrlItemSelected');
                // if (flag1 == isToOff) {
                //     $('div.mapCtrlItem[func="淳大万丽"]').eq(0).trigger('click');
                // };
                // var flag2 = $('div.mapCtrlItem[func="国际会议中心"]').eq(0).hasClass('mapCtrlItemSelected');
                // if (flag2 == isToOff) {
                //     $('div.mapCtrlItem[func="国际会议中心"]').eq(0).trigger('click');
                // };
                // var flag3 = $('div.mapCtrlItem[func="浦东香格里拉"]').eq(0).hasClass('mapCtrlItemSelected');
                // if (flag3 == isToOff) {
                //     $('div.mapCtrlItem[func="浦东香格里拉"]').eq(0).trigger('click');
                // };
                // var flag4 = $('div.mapCtrlItem[func="和平饭店"]').eq(0).hasClass('mapCtrlItemSelected');
                // if (flag4 == isToOff) {
                //     $('div.mapCtrlItem[func="和平饭店"]').eq(0).trigger('click');
                // };
                // var flag5 = $('div.mapCtrlItem[func="东湖宾馆"]').eq(0).hasClass('mapCtrlItemSelected');
                // if (flag5 == isToOff) {
                //     $('div.mapCtrlItem[func="东湖宾馆"]').eq(0).trigger('click');
                // };

                var hotalData = this.hotalCache;
                for (var i = 0; i < hotalData.length; i++) {
                    var currObj = hotalData[i];
                    var name = currObj.name;
                    //$('div.mapCtrlItem[func="'+name+'"]').eq(0).trigger('click'); 
                    //var flag1 = $('div.mapCtrlItem[func="'+name+'"]').eq(0).hasClass('mapCtrlItemSelected');
                    $('div.mapCtrlItem[func="'+name+'"]').eq(0).addClass('mapCtrlItemSelected');
                    if (!isToOff) {
                        //$('div.mapCtrlItem[func="'+name+'"]').eq(0).trigger('click');
                        this.ctrlSpecialLayerOfMoreHotal(name,true);
                    };
                        
                }



				break;
			case '保障线路':
                if (this.map.hasLayer(this.heatMapLayer)) {
                    this.map.removeLayer(this.heatMapLayer);
                    $("#ctrlFunction").find('div.hotMap').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                }
                if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                    this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                    $("#ctrlFunction").find('div.hotMapOfAll4Class').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                }
                this.ctrlSpecialLayer(func,true); 
				$('div.mapCtrlItem[func="浦东机场线路"]').eq(0).trigger('click'); 
                $('div.mapCtrlItem[func="虹桥机场线路"]').eq(0).trigger('click');
                $('div.mapCtrlItem[func="沪杭高铁线路"]').eq(0).trigger('click');
                $('div.mapCtrlItem[func="京沪/沪宁高铁线路"]').eq(0).trigger('click');
                $('div.mapCtrlItem[func="虹桥火车站线路"]').eq(0).trigger('click');
                $('div.mapCtrlItem[func="上海站线路"]').eq(0).trigger('click');
                $('div.mapCtrlItem[func="上海南站线路"]').eq(0).trigger('click');

                var flag1 = $('div.mapCtrlItem[func="浦东机场线路"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag1 == isToOff) {
                    $('div.mapCtrlItem[func="浦东机场线路"]').eq(0).trigger('click');
                    this.ctrlSpecialLayer(func);
                };
                var flag2 = $('div.mapCtrlItem[func="虹桥机场线路"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag2 == isToOff) {
                    $('div.mapCtrlItem[func="虹桥机场线路"]').eq(0).trigger('click');
                }
                var flag3 = $('div.mapCtrlItem[func="沪杭高铁线路"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag3 == isToOff) {
                    $('div.mapCtrlItem[func="沪杭高铁线路"]').eq(0).trigger('click');
                }
                var flag4 = $('div.mapCtrlItem[func="京沪/沪宁高铁线路"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag4 == isToOff) {
                    $('div.mapCtrlItem[func="京沪/沪宁高铁线路"]').eq(0).trigger('click');
                }
                var flag5 = $('div.mapCtrlItem[func="虹桥火车站线路"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag5 == isToOff) {
                    $('div.mapCtrlItem[func="虹桥火车站线路"]').eq(0).trigger('click');
                }
                var flag6 = $('div.mapCtrlItem[func="上海站线路"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag6 == isToOff) {
                    $('div.mapCtrlItem[func="上海站线路"]').eq(0).trigger('click');
                }
                var flag7 = $('div.mapCtrlItem[func="上海南站线路"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag7 == isToOff) {
                    $('div.mapCtrlItem[func="上海南站线路"]').eq(0).trigger('click');
                }
				break;
            case '现场视频':
                $('#liveVideo').css('display','block');

                if($("#liveVideo_winBig").hasClass('liveVideo_winBig_big')){
                    $("#liveVideo_winSmall").css("display","none");
                    $("#liveVideo_winBig").css("display","");
                }else{
                    $("#liveVideo_winSmall").css("display","none");
                    $("#liveVideo_winBig").css("display","");
                }

                //$("#liveVideoIframe").
                document.getElementById('liveVideoIframe').contentWindow.location.reload(true);
                break; 
            case '核心网(EPC)':
                $('#corenet').css('display','block');
                break;  
            case '核心网(传统语音)':
                $('#corenetTraditional').css('display','block');
                break;
            case '城域网':
                $('#metropolitanAreaNet').css('display','block');
                break;
            case '传输网':
                $('#transmissionNet').css('display','block');
                break; 
            case '传输光缆':
            	this.showTransCable();
                break;  
            case '浦东机场':
                if (this.pdtitle == null) {} else{
                    this.pdtitle.setOpacity(0);
                    this.hqtitle.setOpacity(0);
                    this.hqttitle.setOpacity(0);
                }
                if (this.map.hasLayer(this.heatMapLayer)) {
                    this.map.removeLayer(this.heatMapLayer);
                    $("#ctrlFunction").find('div.hotMap').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                }
                if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                    this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                    $("#ctrlFunction").find('div.hotMapOfAll4Class').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                }
                this.ctrlSpecialLayer(func);

                var flag1 = $('div.mapCtrlItem[func="浦东机场"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag2 = $('div.mapCtrlItem[func="虹桥机场"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag3 = $('div.mapCtrlItem[func="虹桥火车站"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag4 = $('div.mapCtrlItem[func="上海站"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag5 = $('div.mapCtrlItem[func="上海南站"]').eq(0).hasClass('mapCtrlItemSelected');

                if (flag1 && flag2 && flag3 && flag4 && flag5 ) {
                    $(".ctrlTitle[func='交通枢纽']").addClass('mapCtrlItemSelected');  
                }
                





                break;
            case '虹桥机场':
                if (this.pdtitle == null) {} else{
                    this.pdtitle.setOpacity(0);
                    this.hqtitle.setOpacity(0);
                    this.hqttitle.setOpacity(0);
                }
                if (this.map.hasLayer(this.heatMapLayer)) {
                    this.map.removeLayer(this.heatMapLayer);
                    $("#ctrlFunction").find('div.hotMap').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                }
                if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                    this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                    $("#ctrlFunction").find('div.hotMapOfAll4Class').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                }
                this.ctrlSpecialLayer(func);


                var flag1 = $('div.mapCtrlItem[func="浦东机场"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag2 = $('div.mapCtrlItem[func="虹桥机场"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag3 = $('div.mapCtrlItem[func="虹桥火车站"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag4 = $('div.mapCtrlItem[func="上海站"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag5 = $('div.mapCtrlItem[func="上海南站"]').eq(0).hasClass('mapCtrlItemSelected');

                if (flag1 && flag2 && flag3 && flag4 && flag5 ) {
                    $(".ctrlTitle[func='交通枢纽']").addClass('mapCtrlItemSelected');  
                }





                break; 
            case '虹桥火车站':
                if (this.pdtitle == null) {} else{
                    this.pdtitle.setOpacity(0);
                    this.hqtitle.setOpacity(0);
                    this.hqttitle.setOpacity(0);
                }
                if (this.map.hasLayer(this.heatMapLayer)) {
                    this.map.removeLayer(this.heatMapLayer);
                    $("#ctrlFunction").find('div.hotMap').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                }
                if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                    this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                    $("#ctrlFunction").find('div.hotMapOfAll4Class').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                }
                this.ctrlSpecialLayer(func);

                var flag1 = $('div.mapCtrlItem[func="浦东机场"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag2 = $('div.mapCtrlItem[func="虹桥机场"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag3 = $('div.mapCtrlItem[func="虹桥火车站"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag4 = $('div.mapCtrlItem[func="上海站"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag5 = $('div.mapCtrlItem[func="上海南站"]').eq(0).hasClass('mapCtrlItemSelected');

                if (flag1 && flag2 && flag3 && flag4 && flag5 ) {
                    $(".ctrlTitle[func='交通枢纽']").addClass('mapCtrlItemSelected');  
                }




                break; 
            case '上海站':
                if (this.pdtitle == null) {} else{
                    this.pdtitle.setOpacity(0);
                    this.hqtitle.setOpacity(0);
                    this.hqttitle.setOpacity(0);
                }
                if (this.map.hasLayer(this.heatMapLayer)) {
                    this.map.removeLayer(this.heatMapLayer);
                    $("#ctrlFunction").find('div.hotMap').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                }
                if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                    this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                    $("#ctrlFunction").find('div.hotMapOfAll4Class').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                }
                this.ctrlSpecialLayer(func);


                var flag1 = $('div.mapCtrlItem[func="浦东机场"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag2 = $('div.mapCtrlItem[func="虹桥机场"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag3 = $('div.mapCtrlItem[func="虹桥火车站"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag4 = $('div.mapCtrlItem[func="上海站"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag5 = $('div.mapCtrlItem[func="上海南站"]').eq(0).hasClass('mapCtrlItemSelected');

                if (flag1 && flag2 && flag3 && flag4 && flag5 ) {
                    $(".ctrlTitle[func='交通枢纽']").addClass('mapCtrlItemSelected');  
                }



                break; 
            case '上海南站':
                if (this.pdtitle == null) {} else{
                    this.pdtitle.setOpacity(0);
                    this.hqtitle.setOpacity(0);
                    this.hqttitle.setOpacity(0);
                }
                if (this.map.hasLayer(this.heatMapLayer)) {
                    this.map.removeLayer(this.heatMapLayer);
                    $("#ctrlFunction").find('div.hotMap').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                }
                if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                    this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                    $("#ctrlFunction").find('div.hotMapOfAll4Class').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                }
                this.ctrlSpecialLayer(func);
                var flag1 = $('div.mapCtrlItem[func="浦东机场"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag2 = $('div.mapCtrlItem[func="虹桥机场"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag3 = $('div.mapCtrlItem[func="虹桥火车站"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag4 = $('div.mapCtrlItem[func="上海站"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag5 = $('div.mapCtrlItem[func="上海南站"]').eq(0).hasClass('mapCtrlItemSelected');

                if (flag1 && flag2 && flag3 && flag4 && flag5 ) {
                    $(".ctrlTitle[func='交通枢纽']").addClass('mapCtrlItemSelected');  
                }
                break; 
            case '五星酒店':
                if (this.map.hasLayer(this.heatMapLayer)) {
                    this.map.removeLayer(this.heatMapLayer);
                    $("#ctrlFunction").find('div.hotMap').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                }
                if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                    this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                    $("#ctrlFunction").find('div.hotMapOfAll4Class').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                }
                this.ctrlSpecialLayer(func);


                


                break;
            case '淳大万丽':
                if (this.map.hasLayer(this.heatMapLayer)) {
                    this.map.removeLayer(this.heatMapLayer);
                    $("#ctrlFunction").find('div.hotMap').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                }
                if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                    this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                    $("#ctrlFunction").find('div.hotMapOfAll4Class').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                }
                this.ctrlSpecialLayer(func);
                break;
            case '国际会议中心':
                if (this.map.hasLayer(this.heatMapLayer)) {
                    this.map.removeLayer(this.heatMapLayer);
                    $("#ctrlFunction").find('div.hotMap').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                }
                if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                    this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                    $("#ctrlFunction").find('div.hotMapOfAll4Class').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                }
                this.ctrlSpecialLayer(func);
                break; 
            case '浦东香格里拉':
                if (this.map.hasLayer(this.heatMapLayer)) {
                    this.map.removeLayer(this.heatMapLayer);
                    $("#ctrlFunction").find('div.hotMap').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                }
                if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                    this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                    $("#ctrlFunction").find('div.hotMapOfAll4Class').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                }
                this.ctrlSpecialLayer(func);
                break; 
            case '和平饭店':
                if (this.map.hasLayer(this.heatMapLayer)) {
                    this.map.removeLayer(this.heatMapLayer);
                    $("#ctrlFunction").find('div.hotMap').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                }
                if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                    this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                    $("#ctrlFunction").find('div.hotMapOfAll4Class').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                }
                this.ctrlSpecialLayer(func);
                break; 
            case '东湖宾馆':
                if (this.map.hasLayer(this.heatMapLayer)) {
                    this.map.removeLayer(this.heatMapLayer);
                    $("#ctrlFunction").find('div.hotMap').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                }
                if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                    this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                    $("#ctrlFunction").find('div.hotMapOfAll4Class').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                }
                this.ctrlSpecialLayer(func);
                break;         
            case '浦东机场线路':
                if (this.map.hasLayer(this.heatMapLayer)) {
                    this.map.removeLayer(this.heatMapLayer);
                    $("#ctrlFunction").find('div.hotMap').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                }
                if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                    this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                    $("#ctrlFunction").find('div.hotMapOfAll4Class').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                }
                this.ctrlSpecialLayer(func);
                var flag1 = $('div.mapCtrlItem[func="浦东机场线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag2 = $('div.mapCtrlItem[func="虹桥机场线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag3 = $('div.mapCtrlItem[func="沪杭高铁线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag4 = $('div.mapCtrlItem[func="京沪/沪宁高铁线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag5 = $('div.mapCtrlItem[func="虹桥火车站线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag6 = $('div.mapCtrlItem[func="上海站线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag7 = $('div.mapCtrlItem[func="上海南站线路"]').eq(0).hasClass('mapCtrlItemSelected');

                if (flag1 && flag2 && flag3 && flag4 && flag5 && flag6 && flag7 ) {
                    $(".ctrlTitle[func='保障线路']").addClass('mapCtrlItemSelected');  
                }
                break; 
            case '虹桥机场线路':
                if (this.map.hasLayer(this.heatMapLayer)) {
                    this.map.removeLayer(this.heatMapLayer);
                    $("#ctrlFunction").find('div.hotMap').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                }
                if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                    this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                    $("#ctrlFunction").find('div.hotMapOfAll4Class').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                }
                this.ctrlSpecialLayer(func);
                var flag1 = $('div.mapCtrlItem[func="浦东机场线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag2 = $('div.mapCtrlItem[func="虹桥机场线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag3 = $('div.mapCtrlItem[func="沪杭高铁线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag4 = $('div.mapCtrlItem[func="京沪/沪宁高铁线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag5 = $('div.mapCtrlItem[func="虹桥火车站线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag6 = $('div.mapCtrlItem[func="上海站线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag7 = $('div.mapCtrlItem[func="上海南站线路"]').eq(0).hasClass('mapCtrlItemSelected');

                if (flag1 && flag2 && flag3 && flag4 && flag5 && flag6 && flag7 ) {
                    $(".ctrlTitle[func='保障线路']").addClass('mapCtrlItemSelected');  
                }
                break;
            case '沪杭高铁线路':
                if (this.map.hasLayer(this.heatMapLayer)) {
                    this.map.removeLayer(this.heatMapLayer);
                    $("#ctrlFunction").find('div.hotMap').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                }
                if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                    this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                    $("#ctrlFunction").find('div.hotMapOfAll4Class').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                }
                this.ctrlSpecialLayer(func);
                var flag1 = $('div.mapCtrlItem[func="浦东机场线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag2 = $('div.mapCtrlItem[func="虹桥机场线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag3 = $('div.mapCtrlItem[func="沪杭高铁线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag4 = $('div.mapCtrlItem[func="京沪/沪宁高铁线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag5 = $('div.mapCtrlItem[func="虹桥火车站线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag6 = $('div.mapCtrlItem[func="上海站线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag7 = $('div.mapCtrlItem[func="上海南站线路"]').eq(0).hasClass('mapCtrlItemSelected');

                if (flag1 && flag2 && flag3 && flag4 && flag5 && flag6 && flag7 ) {
                    $(".ctrlTitle[func='保障线路']").addClass('mapCtrlItemSelected');  
                }
                break;
            case '京沪/沪宁高铁线路':
                if (this.map.hasLayer(this.heatMapLayer)) {
                    this.map.removeLayer(this.heatMapLayer);
                    $("#ctrlFunction").find('div.hotMap').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                }
                if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                    this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                    $("#ctrlFunction").find('div.hotMapOfAll4Class').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                }
                this.ctrlSpecialLayer(func);
                var flag1 = $('div.mapCtrlItem[func="浦东机场线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag2 = $('div.mapCtrlItem[func="虹桥机场线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag3 = $('div.mapCtrlItem[func="沪杭高铁线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag4 = $('div.mapCtrlItem[func="京沪/沪宁高铁线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag5 = $('div.mapCtrlItem[func="虹桥火车站线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag6 = $('div.mapCtrlItem[func="上海站线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag7 = $('div.mapCtrlItem[func="上海南站线路"]').eq(0).hasClass('mapCtrlItemSelected');

                if (flag1 && flag2 && flag3 && flag4 && flag5 && flag6 && flag7 ) {
                    $(".ctrlTitle[func='保障线路']").addClass('mapCtrlItemSelected');  
                }
                break;
            case '虹桥火车站线路':
                if (this.map.hasLayer(this.heatMapLayer)) {
                    this.map.removeLayer(this.heatMapLayer);
                    $("#ctrlFunction").find('div.hotMap').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                }
                if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                    this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                    $("#ctrlFunction").find('div.hotMapOfAll4Class').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                }
                this.ctrlSpecialLayer(func);
                var flag1 = $('div.mapCtrlItem[func="浦东机场线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag2 = $('div.mapCtrlItem[func="虹桥机场线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag3 = $('div.mapCtrlItem[func="沪杭高铁线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag4 = $('div.mapCtrlItem[func="京沪/沪宁高铁线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag5 = $('div.mapCtrlItem[func="虹桥火车站线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag6 = $('div.mapCtrlItem[func="上海站线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag7 = $('div.mapCtrlItem[func="上海南站线路"]').eq(0).hasClass('mapCtrlItemSelected');

                if (flag1 && flag2 && flag3 && flag4 && flag5 && flag6 && flag7 ) {
                    $(".ctrlTitle[func='保障线路']").addClass('mapCtrlItemSelected');  
                }
                break;
            case '上海站线路':
                if (this.map.hasLayer(this.heatMapLayer)) {
                    this.map.removeLayer(this.heatMapLayer);
                    $("#ctrlFunction").find('div.hotMap').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                }
                if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                    this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                    $("#ctrlFunction").find('div.hotMapOfAll4Class').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                }
                this.ctrlSpecialLayer(func);
                var flag1 = $('div.mapCtrlItem[func="浦东机场线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag2 = $('div.mapCtrlItem[func="虹桥机场线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag3 = $('div.mapCtrlItem[func="沪杭高铁线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag4 = $('div.mapCtrlItem[func="京沪/沪宁高铁线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag5 = $('div.mapCtrlItem[func="虹桥火车站线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag6 = $('div.mapCtrlItem[func="上海站线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag7 = $('div.mapCtrlItem[func="上海南站线路"]').eq(0).hasClass('mapCtrlItemSelected');

                if (flag1 && flag2 && flag3 && flag4 && flag5 && flag6 && flag7 ) {
                    $(".ctrlTitle[func='保障线路']").addClass('mapCtrlItemSelected');  
                }
                break;
            case '上海南站线路':
                if (this.map.hasLayer(this.heatMapLayer)) {
                    this.map.removeLayer(this.heatMapLayer);
                    $("#ctrlFunction").find('div.hotMap').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                }
                if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                    this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                    $("#ctrlFunction").find('div.hotMapOfAll4Class').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                }
                this.ctrlSpecialLayer(func);
                var flag1 = $('div.mapCtrlItem[func="浦东机场线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag2 = $('div.mapCtrlItem[func="虹桥机场线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag3 = $('div.mapCtrlItem[func="沪杭高铁线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag4 = $('div.mapCtrlItem[func="京沪/沪宁高铁线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag5 = $('div.mapCtrlItem[func="虹桥火车站线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag6 = $('div.mapCtrlItem[func="上海站线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag7 = $('div.mapCtrlItem[func="上海南站线路"]').eq(0).hasClass('mapCtrlItemSelected');

                if (flag1 && flag2 && flag3 && flag4 && flag5 && flag6 && flag7 ) {
                    $(".ctrlTitle[func='保障线路']").addClass('mapCtrlItemSelected');  
                }
                break;                               
			
		}
	}
	
};

//666666
CIIE.Map.prototype.ctrlSpecialLayerOfMoreHotal=function(type,addCancel){
    var hotalData = this.hotalCache;
    for (var i = 0; i < hotalData.length; i++) {
            var currObj = hotalData[i];
            //{"name":"淳大万丽","lon":"121.558823","lat":"31.230123","location_":0},
            if (type == currObj.name) {
                var currLayerHote = this.specialLayerHotelNum[i];
                //if(this.map.hasLayer(currLayerHote)){
                if(!addCancel){
                    this.map.removeLayer(currLayerHote);
                }else{
                    if(currLayerHote==null){
                        var hot='J-酒店';
                        currLayerHote=new L.featureGroup();
                        this.specialLayerHotelNum[i] = currLayerHote;
                        this.map.addLayer(currLayerHote);



                        var name=currObj.name;
                        var lat=currObj.lat;
                        var lng=currObj.lon;
                        var title = name.replace('J-','');

                        //特殊处理酒店大小
                        var map=this.map;
                        var curZoom = map.getZoom();
                        var iconSize = [100,100];
                        switch (curZoom){
                            case 10:
                                iconSize = [20,20];
                                break;
                            case 11:
                                iconSize = [30,30];
                                break;
                            case 12:
                                iconSize = [40,40];
                                break;
                            case 13:
                                iconSize = [50,50];
                                break;
                            case 14:
                                iconSize = [60,60];
                                break;
                            case 15:
                                iconSize = [100,100];
                                break;
                            case 16:
                                iconSize = [100,100];
                                break;
                            case 17:
                                iconSize = [100,100];
                                break;
                            default:
                                iconSize = [100,100];
                                break;
                        }
                        var iconhotel = L.icon({
                                iconUrl: this.ctx+'/static/styles/local-lsm/map/hotel.png',
                                //iconSize: [100,100]
                                iconSize: iconSize
                        });
                        var markerthdrgsef = L.marker([lat,lng],{title: title, icon: iconhotel, keepInView:false}).addTo(currLayerHote);
                        this.markerHotelArr.push(markerthdrgsef);
                        var map=this.map;
                        var curZoom = map.getZoom();
                        var noNum = 0;
                        var yesNum = 0;
                        $("#ctrlFactor").find('.ctrlTitle ').each(function(index, el) {noNum++;});
                        $("#ctrlFactor").find('.mapCtrlItem  ').each(function(index, el) {yesNum++;});
                        var usenum = yesNum - noNum;
                        if (this.loadHotalFirst> usenum!= 0){
                            this.map.setView([lat,lng],curZoom);
                        };
                        this.loadHotalFirstNum++;
                        








// this.cdm.getHotspotTree({},function(result){
//     var list=result.children;
//     for(var i=0;i<list.length;i++){
//         var record=list[i];
//         if(record.id=='J-酒店'){
//             var hots=record.children;
//             for(var j=0;j<hots.length;j++){
//                 var hot=hots[j];
//                 var name=hot.id;
//                 if(this.locationMap[name]!=null ){
//                     if(name.indexOf('J-'+type)>-1){
//                         var lat=this.locationMap[name].lat;
//                         var lng=this.locationMap[name].lon;
//                         var title = name.replace('J-','');

//                         //特殊处理酒店大小
//                         var map=this.map;
//                         var curZoom = map.getZoom();
//                         var iconSize = [100,100];
//                         switch (curZoom){
//                             case 10:
//                                 iconSize = [20,20];
//                                 break;
//                             case 11:
//                                 iconSize = [30,30];
//                                 break;
//                             case 12:
//                                 iconSize = [40,40];
//                                 break;
//                             case 13:
//                                 iconSize = [50,50];
//                                 break;
//                             case 14:
//                                 iconSize = [60,60];
//                                 break;
//                             case 15:
//                                 iconSize = [100,100];
//                                 break;
//                             case 16:
//                                 iconSize = [100,100];
//                                 break;
//                             case 17:
//                                 iconSize = [100,100];
//                                 break;
//                             default:
//                                 iconSize = [100,100];
//                                 break;
//                         }
//                         var iconhotel = L.icon({
//                                 iconUrl: this.ctx+'/static/styles/local-lsm/map/hotel.png',
//                                 //iconSize: [100,100]
//                                 iconSize: iconSize
//                         });
//                         var markerthdrgsef = L.marker([lat,lng],{title: title, icon: iconhotel, keepInView:false}).addTo(currLayerHote);
//                         this.markerHotelArr.push(markerthdrgsef);
//                         var map=this.map;
//                         var curZoom = map.getZoom();
//                         var noNum = 0;
//                         var yesNum = 0;
//                         $("#ctrlFactor").find('.ctrlTitle ').each(function(index, el) {noNum++;});
//                         $("#ctrlFactor").find('.mapCtrlItem  ').each(function(index, el) {yesNum++;});
//                         var usenum = yesNum - noNum;
//                         if (this.loadHotalFirst> usenum!= 0){
//                             this.map.setView([lat,lng],curZoom);
//                         };
//                         this.loadHotalFirstNum++;

//                     }
//                 }
//             }
//             break;
//         }
//     }
// }.bind(this));






























                        //var url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/area-re_cellByHotname?hotspot='+ encodeURIComponent(hot);
                        // var url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/area-re_cellByHotname?hotspot='+ encodeURIComponent('J-'+type);
                        // //this.heatMap = []; //全局变量,存放热点图的数据
                        // $.ajax({
                        //     url: url,
                        //     type: 'get',         //数据发送方式
                        //     dataType: 'json',     //接受数据格式
                        //     //contentType: "application/json",
                        //     //accessType: "application/json",
                        //     data:{},
                        //     beforeSend: function(XMLHttpRequest){
                        //     },
                        //     complete: function(XMLHttpRequest,textStatus){
                        //     }
                        // }).done(function(result){
                        //      this.addCellsToLayer(result.data,currLayerHote);
                        // }.bind(this));

                    }else{
                        this.map.addLayer(currLayerHote);

                        var map=this.map;
                        var curZoom = map.getZoom();
                        var _layers = currLayerHote._layers;
                        var kk = 0 
                        for(var item in _layers){
                            if (kk == 0) {
                                var _1111 = _layers[item];
                                var _latlng = _1111._latlng; 
                                this.map.setView(_latlng,curZoom);
                            }
                            kk++;
                        }


                        
                    }
                    
                }
            };
            
    }

};
CIIE.Map.prototype.ctrlSpecialLayer=function(type,addCancel){
	switch(type){
		case '交通枢纽':
			if(this.map.hasLayer(this.specialLayerTraffic)){
				this.map.removeLayer(this.specialLayerTraffic);
			}else{
				if(this.specialLayerTraffic==null){
					var hot='J-交通枢纽';
					this.specialLayerTraffic=new L.featureGroup();
					this.map.addLayer(this.specialLayerTraffic);
					this.cdm.getHotspotTree({},function(result){
						var list=result.children;
						for(var i=0;i<list.length;i++){
							var record=list[i];
							if(record.id=='J-交通枢纽'){
								var hots=record.children;
								for(var j=0;j<hots.length;j++){
									var hot=hots[j];
									var name=hot.id;
									if(this.locationMap[name]!=null){
										var lat=this.locationMap[name].lat;
										var lng=this.locationMap[name].lon;
										if(name.indexOf('机场')!=-1){
                                            var title = name.replace('J-','');
											var markerthdrgsef = L.marker([lat,lng],{title: title, icon: this.markerAIRPLANE, keepInView:false}).addTo(this.specialLayerTraffic);
                                            this.markerAirplaneArr.push(markerthdrgsef);
                                            var map=this.map;
                                            var curZoom = map.getZoom();
                                            var noNum = 0;
                                            var yesNum = 0;
                                            $("#ctrlFactor").find('.ctrlTitle ').each(function(index, el) {noNum++;});
                                            $("#ctrlFactor").find('.mapCtrlItem  ').each(function(index, el) {yesNum++;});
                                            var usenum = yesNum - noNum;
                                            if (this.loadHotalFirstNum > usenum){
                                                this.map.setView([lat,lng],curZoom);
                                            };
                                            this.loadHotalFirstNum++;

										}else if(name.indexOf('火车站')!=-1){
                                            var title = name.replace('J-','');
											var markerthdrgsef = L.marker([lat,lng],{title: title, icon: this.markerTRAIN, keepInView:false}).addTo(this.specialLayerTraffic);
                                            this.markerTrainArr.push(markerthdrgsef);
                                            var map=this.map;
                                            var curZoom = map.getZoom();
                                            var noNum = 0;
                                            var yesNum = 0;
                                            $("#ctrlFactor").find('.ctrlTitle ').each(function(index, el) {noNum++;});
                                            $("#ctrlFactor").find('.mapCtrlItem  ').each(function(index, el) {yesNum++;});
                                            var usenum = yesNum - noNum;
                                            if (this.loadHotalFirstNum > usenum){
                                                this.map.setView([lat,lng],curZoom);
                                            };
                                            this.loadHotalFirstNum++;

										}
									}
									
								}
								break;
							}
						}
					}.bind(this));
					var url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/area-re_cellByHotname?hotspot='+ encodeURIComponent(hot);
				    //this.heatMap = []; //全局变量,存放热点图的数据
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
				    }).done(function(result){
			           this.addCellsToLayer(result.data,this.specialLayerTraffic);
				    }.bind(this));
				}else{
					this.map.addLayer(this.specialLayerTraffic);
                    
				}
				
			}
			
			break;
		case '酒店':
			if(this.map.hasLayer(this.specialLayerHotel)){
				this.map.removeLayer(this.specialLayerHotel);
			}else{
				if(this.specialLayerHotel==null){
					var hot='J-酒店';
					this.specialLayerHotel=new L.featureGroup();
					this.map.addLayer(this.specialLayerHotel);

                    var hotalData = this.hotalCache;
                    for (var i = 0; i < hotalData.length; i++) {
                            var currObj = hotalData[i];

                            var name=currObj.name;
                            var lat=currObj.lat;
                            var lng=currObj.lon;
                            var title = name.replace('J-','');
                            var markerthdrgsef = L.marker([lat,lng],{title: title, icon: this.markerHOTEL, keepInView:false}).addTo(this.specialLayerHotel);
                            this.markerHotelArr.push(markerthdrgsef);
                            var map=this.map;
                            var curZoom = map.getZoom();
                            var noNum = 0;
                            var yesNum = 0;
                            $("#ctrlFactor").find('.ctrlTitle ').each(function(index, el) {noNum++;});
                            $("#ctrlFactor").find('.mapCtrlItem  ').each(function(index, el) {yesNum++;});
                            var usenum = yesNum - noNum;
                            if (this.loadHotalFirstNum > usenum){
                                this.map.setView([lat,lng],curZoom);
                            };
                            this.loadHotalFirstNum++;
                            
                    }

                                                            
					
                    // this.cdm.getHotspotTree({},function(result){
                    //     var list=result.children;
                    //     for(var i=0;i<list.length;i++){
                    //         var record=list[i];
                    //         if(record.id=='J-酒店'){
                    //             var hots=record.children;
                    //             for(var j=0;j<hots.length;j++){
                    //                 var hot=hots[j];
                    //                 var name=hot.id;
                    //                 if(this.locationMap[name]!=null){
                    //                     var lat=this.locationMap[name].lat;
                    //                     var lng=this.locationMap[name].lon;
                    //                     var title = name.replace('J-','');
                    //                     var markerthdrgsef = L.marker([lat,lng],{title: title, icon: this.markerHOTEL, keepInView:false}).addTo(this.specialLayerHotel);
                    //                     this.markerHotelArr.push(markerthdrgsef);
                    //                     var map=this.map;
                    //                     var curZoom = map.getZoom();
                    //                     var noNum = 0;
                    //                     var yesNum = 0;
                    //                     $("#ctrlFactor").find('.ctrlTitle ').each(function(index, el) {noNum++;});
                    //                     $("#ctrlFactor").find('.mapCtrlItem  ').each(function(index, el) {yesNum++;});
                    //                     var usenum = yesNum - noNum;
                    //                     if (this.loadHotalFirstNum > usenum){
                    //                         this.map.setView([lat,lng],curZoom);
                    //                     };
                    //                     this.loadHotalFirstNum++;

                    //                 }
                    //             }
                    //             break;
                    //         }
                    //     }
                    // }.bind(this));
					var url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/area-re_cellByHotname?hotspot='+ encodeURIComponent(hot);
				    //this.heatMap = []; //全局变量,存放热点图的数据
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
				    }).done(function(result){
				    	 this.addCellsToLayer(result.data,this.specialLayerHotel);
				    }.bind(this));
				}else{
					this.map.addLayer(this.specialLayerHotel);
				}
				
			}
			break;
        case '淳大万丽':
            if(this.map.hasLayer(this.specialLayerHotelOf5_1)){
                this.map.removeLayer(this.specialLayerHotelOf5_1);
            }else{
                if(this.specialLayerHotelOf5_1==null){
                    var hot='J-酒店';
                    this.specialLayerHotelOf5_1=new L.featureGroup();
                    this.map.addLayer(this.specialLayerHotelOf5_1);
                    this.cdm.getHotspotTree({},function(result){
                        var list=result.children;
                        for(var i=0;i<list.length;i++){
                            var record=list[i];
                            if(record.id=='J-酒店'){
                                var hots=record.children;
                                for(var j=0;j<hots.length;j++){
                                    var hot=hots[j];
                                    var name=hot.id;
                                    if(this.locationMap[name]!=null ){
                                        if(name.indexOf('J-淳大万丽')>-1){
                                            var lat=this.locationMap[name].lat;
                                            var lng=this.locationMap[name].lon;
                                            var title = name.replace('J-','');
                                            var markerthdrgsef = L.marker([lat,lng],{title: title, icon: this.markerHOTEL, keepInView:false}).addTo(this.specialLayerHotelOf5_1);
                                            this.markerHotelArr.push(markerthdrgsef);
                                            var map=this.map;
                                            var curZoom = map.getZoom();
                                            var noNum = 0;
                                            var yesNum = 0;
                                            $("#ctrlFactor").find('.ctrlTitle ').each(function(index, el) {noNum++;});
                                            $("#ctrlFactor").find('.mapCtrlItem  ').each(function(index, el) {yesNum++;});
                                            var usenum = yesNum - noNum;
                                            if (this.loadHotalFirstNum > usenum){
                                                this.map.setView([lat,lng],curZoom);
                                            };
                                            this.loadHotalFirstNum++;

                                        }
                                    }
                                }
                                break;
                            }
                        }
                    }.bind(this));
                    //var url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/area-re_cellByHotname?hotspot='+ encodeURIComponent(hot);
                    var url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/area-re_cellByHotname?hotspot='+ encodeURIComponent('J-淳大万丽');
                    //this.heatMap = []; //全局变量,存放热点图的数据
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
                    }).done(function(result){
                         this.addCellsToLayer(result.data,this.specialLayerHotelOf5_1);
                    }.bind(this));

                }else{
                    this.map.addLayer(this.specialLayerHotelOf5_1);
                }
                
            }
            break; 
        case '国际会议中心':
            if(this.map.hasLayer(this.specialLayerHotelOf5_2)){
                this.map.removeLayer(this.specialLayerHotelOf5_2);
            }else{
                if(this.specialLayerHotelOf5_2==null){
                    var hot='J-酒店';
                    this.specialLayerHotelOf5_2=new L.featureGroup();
                    this.map.addLayer(this.specialLayerHotelOf5_2);
                    this.cdm.getHotspotTree({},function(result){
                        var list=result.children;
                        for(var i=0;i<list.length;i++){
                            var record=list[i];
                            if(record.id=='J-酒店'){
                                var hots=record.children;
                                for(var j=0;j<hots.length;j++){
                                    var hot=hots[j];
                                    var name=hot.id;
                                    if(this.locationMap[name]!=null ){
                                        if(name.indexOf('J-国际会议中心')>-1){
                                            var lat=this.locationMap[name].lat;
                                            var lng=this.locationMap[name].lon;
                                            var title = name.replace('J-','');
                                            var markerthdrgsef = L.marker([lat,lng],{title: title, icon: this.markerHOTEL, keepInView:false}).addTo(this.specialLayerHotelOf5_2);
                                            this.markerHotelArr.push(markerthdrgsef);
                                            var map=this.map;
                                            var curZoom = map.getZoom();
                                            var noNum = 0;
                                            var yesNum = 0;
                                            $("#ctrlFactor").find('.ctrlTitle ').each(function(index, el) {noNum++;});
                                            $("#ctrlFactor").find('.mapCtrlItem  ').each(function(index, el) {yesNum++;});
                                            var usenum = yesNum - noNum;
                                            if (this.loadHotalFirstNum > usenum){
                                                this.map.setView([lat,lng],curZoom);
                                            };
                                            this.loadHotalFirstNum++;

                                        }
                                    }
                                }
                                break;
                            }
                        }
                    }.bind(this));
                    //var url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/area-re_cellByHotname?hotspot='+ encodeURIComponent(hot);
                    var url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/area-re_cellByHotname?hotspot='+ encodeURIComponent('J-国际会议中心');
                    //this.heatMap = []; //全局变量,存放热点图的数据
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
                    }).done(function(result){
                         this.addCellsToLayer(result.data,this.specialLayerHotelOf5_2);
                    }.bind(this));

                }else{
                    this.map.addLayer(this.specialLayerHotelOf5_2);
                }
                
            }
            break;
        case '浦东香格里拉':
            if(this.map.hasLayer(this.specialLayerHotelOf5_3)){
                this.map.removeLayer(this.specialLayerHotelOf5_3);
            }else{
                if(this.specialLayerHotelOf5_3==null){
                    var hot='J-酒店';
                    this.specialLayerHotelOf5_3=new L.featureGroup();
                    this.map.addLayer(this.specialLayerHotelOf5_3);
                    this.cdm.getHotspotTree({},function(result){
                        var list=result.children;
                        for(var i=0;i<list.length;i++){
                            var record=list[i];
                            if(record.id=='J-酒店'){
                                var hots=record.children;
                                for(var j=0;j<hots.length;j++){
                                    var hot=hots[j];
                                    var name=hot.id;
                                    if(this.locationMap[name]!=null ){
                                        if(name.indexOf('J-浦东香格里拉')>-1){
                                            var lat=this.locationMap[name].lat;
                                            var lng=this.locationMap[name].lon;
                                            var title = name.replace('J-','');
                                            var markerthdrgsef = L.marker([lat,lng],{title: title, icon: this.markerHOTEL, keepInView:false}).addTo(this.specialLayerHotelOf5_3);
                                            this.markerHotelArr.push(markerthdrgsef);
                                            var map=this.map;
                                            var curZoom = map.getZoom();
                                            var noNum = 0;
                                            var yesNum = 0;
                                            $("#ctrlFactor").find('.ctrlTitle ').each(function(index, el) {noNum++;});
                                            $("#ctrlFactor").find('.mapCtrlItem  ').each(function(index, el) {yesNum++;});
                                            var usenum = yesNum - noNum;
                                            if (this.loadHotalFirstNum > usenum){
                                                this.map.setView([lat,lng],curZoom);
                                            };
                                            this.loadHotalFirstNum++;

                                        }
                                    }
                                }
                                break;
                            }
                        }
                    }.bind(this));
                    //var url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/area-re_cellByHotname?hotspot='+ encodeURIComponent(hot);
                    var url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/area-re_cellByHotname?hotspot='+ encodeURIComponent('J-浦东香格里拉');
                    //this.heatMap = []; //全局变量,存放热点图的数据
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
                    }).done(function(result){
                         this.addCellsToLayer(result.data,this.specialLayerHotelOf5_3);
                    }.bind(this));

                }else{
                    this.map.addLayer(this.specialLayerHotelOf5_3);
                }
                
            }
            break;
        case '和平饭店':
            if(this.map.hasLayer(this.specialLayerHotelOf5_4)){
                this.map.removeLayer(this.specialLayerHotelOf5_4);
            }else{
                if(this.specialLayerHotelOf5_4==null){
                    var hot='J-酒店';
                    this.specialLayerHotelOf5_4=new L.featureGroup();
                    this.map.addLayer(this.specialLayerHotelOf5_4);
                    this.cdm.getHotspotTree({},function(result){
                        var list=result.children;
                        for(var i=0;i<list.length;i++){
                            var record=list[i];
                            if(record.id=='J-酒店'){
                                var hots=record.children;
                                for(var j=0;j<hots.length;j++){
                                    var hot=hots[j];
                                    var name=hot.id;
                                    if(this.locationMap[name]!=null ){
                                        if(name.indexOf('J-和平饭店')>-1){
                                            var lat=this.locationMap[name].lat;
                                            var lng=this.locationMap[name].lon;
                                            var title = name.replace('J-','');
                                            var markerthdrgsef = L.marker([lat,lng],{title: title, icon: this.markerHOTEL, keepInView:false}).addTo(this.specialLayerHotelOf5_4);
                                            this.markerHotelArr.push(markerthdrgsef);
                                            var map=this.map;
                                            var curZoom = map.getZoom();
                                            var noNum = 0;
                                            var yesNum = 0;
                                            $("#ctrlFactor").find('.ctrlTitle ').each(function(index, el) {noNum++;});
                                            $("#ctrlFactor").find('.mapCtrlItem  ').each(function(index, el) {yesNum++;});
                                            var usenum = yesNum - noNum;
                                            if (this.loadHotalFirstNum > usenum){
                                                this.map.setView([lat,lng],curZoom);
                                            };
                                            this.loadHotalFirstNum++;

                                        }
                                    }
                                }
                                break;
                            }
                        }
                    }.bind(this));
                    //var url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/area-re_cellByHotname?hotspot='+ encodeURIComponent(hot);
                    var url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/area-re_cellByHotname?hotspot='+ encodeURIComponent('J-和平饭店');
                    //this.heatMap = []; //全局变量,存放热点图的数据
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
                    }).done(function(result){
                         this.addCellsToLayer(result.data,this.specialLayerHotelOf5_4);
                    }.bind(this));

                }else{
                    this.map.addLayer(this.specialLayerHotelOf5_4);
                }
                
            }
            break;
        case '东湖宾馆':
            if(this.map.hasLayer(this.specialLayerHotelOf5_5)){
                this.map.removeLayer(this.specialLayerHotelOf5_5);
            }else{
                if(this.specialLayerHotelOf5_5==null){
                    var hot='J-酒店';
                    this.specialLayerHotelOf5_5=new L.featureGroup();
                    this.map.addLayer(this.specialLayerHotelOf5_5);
                    this.cdm.getHotspotTree({},function(result){
                        var list=result.children;
                        for(var i=0;i<list.length;i++){
                            var record=list[i];
                            if(record.id=='J-酒店'){
                                var hots=record.children;
                                for(var j=0;j<hots.length;j++){
                                    var hot=hots[j];
                                    var name=hot.id;
                                    if(this.locationMap[name]!=null ){
                                        if(name.indexOf('J-东湖宾馆')>-1){
                                            var lat=this.locationMap[name].lat;
                                            var lng=this.locationMap[name].lon;
                                            var title = name.replace('J-','');
                                            var markerthdrgsef = L.marker([lat,lng],{title: title, icon: this.markerHOTEL, keepInView:false}).addTo(this.specialLayerHotelOf5_5);
                                            this.markerHotelArr.push(markerthdrgsef);
                                            var map=this.map;
                                            var curZoom = map.getZoom();
                                            var noNum = 0;
                                            var yesNum = 0;
                                            $("#ctrlFactor").find('.ctrlTitle ').each(function(index, el) {noNum++;});
                                            $("#ctrlFactor").find('.mapCtrlItem  ').each(function(index, el) {yesNum++;});
                                            var usenum = yesNum - noNum;
                                            if (this.loadHotalFirstNum > usenum){
                                                this.map.setView([lat,lng],curZoom);
                                            };
                                            this.loadHotalFirstNum++;

                                        }
                                    }
                                }
                                break;
                            }
                        }
                    }.bind(this));
                    //var url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/area-re_cellByHotname?hotspot='+ encodeURIComponent(hot);
                    var url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/area-re_cellByHotname?hotspot='+ encodeURIComponent('J-东湖宾馆');
                    //this.heatMap = []; //全局变量,存放热点图的数据
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
                    }).done(function(result){
                         this.addCellsToLayer(result.data,this.specialLayerHotelOf5_5);
                    }.bind(this));

                }else{
                    this.map.addLayer(this.specialLayerHotelOf5_5);
                }
                
            }
            break;                          
		// case '保障线路':
		// 	if(this.map.hasLayer(this.specialLayerLine)){
		// 		this.map.removeLayer(this.specialLayerLine);
		// 	}else{
		// 		if(this.specialLayerLine==null){
		// 			this.specialLayerLine=new L.featureGroup();
		// 			this.map.addLayer(this.specialLayerLine);
		// 			var colors=[
		// 			            "#cc0066",
		// 			            "#660099",
		// 			            "#0033ff",
		// 			            "#00cc00"
		// 			           ];
		// 			var lines=[
		// 			       	[//虹桥火车站-国家会展中心
		// 			       	 [[31.20034, 121.3249],[31.19327, 121.32515],[31.19192, 121.31069]]
		// 			       	],
		// 			       	[//虹桥机场-国家会展中心
		// 			       	 [[31.20057, 121.33364],[31.19372, 121.33182],[31.19168, 121.31043]]
		// 			       	],
		// 			       	[//沪杭高铁
		// 			       	 [[31.20029, 121.32575],[31.19726, 121.32593],[31.18519, 121.32827],[31.17901, 121.32726],[31.17722, 121.32744],[31.11874, 121.36675],[31.11605, 121.36823],[31.10551, 121.37282],[31.09987, 121.37405],[31.09609, 121.37218],[31.07949, 121.35518],[31.07528, 121.34846],[31.05957, 121.31954],[31.05084, 121.3079],[31.04206, 121.29942],[31.02442, 121.28008],[31.00418, 121.26219],[30.99594, 121.25141],[30.98146, 121.22281],[30.97403, 121.21131],[30.94615, 121.18587],[30.94163, 121.18055],[30.93339, 121.1674],[30.91276, 121.11724],[30.88456, 121.06686],[30.86355, 121.02231]]
		// 			       	],
		// 			       	[//京沪/沪宁高铁
		// 			       	 [[31.2025,121.32775],[31.2248, 121.32557],[31.22986, 121.32169],[31.24876, 121.30035],[31.27586, 121.28907],[31.28592, 121.28138],[31.2924, 121.27354],[31.29586, 121.26758],[31.30153, 121.24832]]
		// 			       	],
		// 			       	[//浦东机场-国家会展中心
		// 			       	 //[[31.15582, 121.81216],[31.16493, 121.80937],[31.18817, 121.79284],[31.19212, 121.78824],[31.19496, 121.77185],[31.19076, 121.75072],[31.16246, 121.66722],[31.15702, 121.61519],[31.15356, 121.60081],[31.15035, 121.56618],[31.13761, 121.49977],[31.13576, 121.48281],[31.13094, 121.46628],[31.12488, 121.41986],[31.12377, 121.37918],[31.11944, 121.36381],[31.12216, 121.3633],[31.14559, 121.34613],[31.16951, 121.33132],[31.11925, 121.36402],[31.12247, 121.36309],[31.14596, 121.34584],[31.16963, 121.33053],[31.17983, 121.32457],[31.18434, 121.32349],[31.19253, 121.31838],[31.192, 121.31111]]
  //                            [[31.15582, 121.81216],[31.16493, 121.80937],[31.18817, 121.79284],[31.19212, 121.78824],[31.19496, 121.77185],[31.19076, 121.75072],[31.16246, 121.66722],[31.15702, 121.61519],[31.15356, 121.60081],[31.15035, 121.56618],[31.13761, 121.49977],[31.13576, 121.48281],[31.13094, 121.46628],[31.12488, 121.41986],[31.12377, 121.37918],[31.11944, 121.36381],[31.12216, 121.3633],[31.14559, 121.34613],[31.16951, 121.33132],[31.11925, 121.36402],[31.12247, 121.36309],[31.14596, 121.34584],[31.16963, 121.33053],[31.17983, 121.32457],[31.18434, 121.32349],[31.19253, 121.31838],[31.192, 121.31111]]

		// 			       	],
		// 			       	[//上海站-国家会展中心
		// 			       	 [[31.25363, 121.45904],[31.25667, 121.45763],[31.26163, 121.45846],[31.26453, 121.45625],[31.2637, 121.45162],[31.26023, 121.44287],[31.2532, 121.43574],[31.24746, 121.42503],[31.2403, 121.41857],[31.2403, 121.41857],[31.23141, 121.41756],[31.2248, 121.41713],[31.21794, 121.41929],[31.21424, 121.41835],[31.2122, 121.41842],[31.20824, 121.4131],[31.20534, 121.40369],[31.19799, 121.39111],[31.18916, 121.36481],[31.17884, 121.35382],[31.17606, 121.34871],[31.16963, 121.33053],[31.17983, 121.32457],[31.18434, 121.32349],[31.19253, 121.31838],[31.192, 121.31111]]
		// 			       	],
		// 			       	[//上海南站-国家会展中心
		// 			       	 [[31.15929, 121.43089],[31.12451, 121.39507],[31.12377, 121.38026],[31.11925, 121.36402],[31.12247, 121.36309],[31.14596, 121.34584],[31.16963, 121.33053],[31.17983, 121.32457],[31.18434, 121.32349],[31.19253, 121.31838],[31.192, 121.31111]]
		// 			       	]
		// 			       ];
		// 			for(var i=0;i<lines.length;i++){
		// 				var list=lines[i];
		// 				for(var j=0;j<list.length;j++){
		// 					var latlngs=list[j];
		// 					var color=colors[i%colors.length];
		// 					var polyline = L.polyline(latlngs, {color: color,weight:10}).addTo(this.specialLayerLine);
		// 				}
		// 			}
		// 		}else{
		// 			this.map.addLayer(this.specialLayerLine);
		// 		}
		// 	}
		// 	break;
        case '浦东机场':
            if(this.map.hasLayer(this.specialLayer_pudongjichang_traffic)){
                this.map.removeLayer(this.specialLayer_pudongjichang_traffic);
            }else{
                if(this.specialLayer_pudongjichang_traffic==null){
                    var hot='J-交通枢纽';
                    this.specialLayer_pudongjichang_traffic=new L.featureGroup();
                    this.map.addLayer(this.specialLayer_pudongjichang_traffic);
                    this.cdm.getHotspotTree({},function(result){
                        var list=result.children;
                        for(var i=0;i<list.length;i++){
                            var record=list[i];
                            if(record.id=='J-交通枢纽'){
                                var hots=record.children;
                                for(var j=0;j<hots.length;j++){
                                    var hot=hots[j];
                                    var name=hot.id;
                                    if(this.locationMap[name]!=null){
                                        var lat=this.locationMap[name].lat;
                                        var lng=this.locationMap[name].lon;
                                        if(name.indexOf('浦东机场')!=-1){
                                            var title = name.replace('J-','');
                                            var markerthdrgsef = L.marker([lat,lng],{title: title, icon: this.markerAIRPLANE, keepInView:false}).addTo(this.specialLayer_pudongjichang_traffic);
                                            this.markerAirplaneArr.push(markerthdrgsef);
                                            var map=this.map;
                                            var curZoom = map.getZoom();
                                            var noNum = 0;
                                            var yesNum = 0;
                                            $("#ctrlFactor").find('.ctrlTitle ').each(function(index, el) {noNum++;});
                                            $("#ctrlFactor").find('.mapCtrlItem  ').each(function(index, el) {yesNum++;});
                                            var usenum = yesNum - noNum;
                                            if (this.loadHotalFirstNum > usenum){
                                                this.map.setView([lat,lng],curZoom);
                                            };
                                            this.loadHotalFirstNum++;

                                        }
                                    }
                                    
                                }
                                break;
                            }
                        }
                    }.bind(this));
                    var url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/area-re_cellByHotname?hotspot='+ encodeURIComponent('浦东机场');
                    //this.heatMap = []; //全局变量,存放热点图的数据
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
                    }).done(function(result){
                       this.addCellsToLayer(result.data,this.specialLayer_pudongjichang_traffic);
                    }.bind(this));
                }else{
                    this.map.addLayer(this.specialLayer_pudongjichang_traffic);
                    var map=this.map;
                    var curZoom = map.getZoom();
                    var _layers = this.specialLayer_pudongjichang_traffic._layers;
                    var kk = 0 
                    for(var item in _layers){
                        if (kk == 0) {
                            var _1111 = _layers[item];
                            var _latlng = _1111._latlng; 
                            this.map.setView(_latlng,curZoom);
                        }
                        kk++;
                    }
                }
                
            }
            break;    
        case '虹桥机场':
            if(this.map.hasLayer(this.specialLayer_hongqiaojichang_traffic)){
                this.map.removeLayer(this.specialLayer_hongqiaojichang_traffic);
            }else{
                if(this.specialLayer_hongqiaojichang_traffic==null){
                    var hot='J-交通枢纽';
                    this.specialLayer_hongqiaojichang_traffic=new L.featureGroup();
                    this.map.addLayer(this.specialLayer_hongqiaojichang_traffic);
                    this.cdm.getHotspotTree({},function(result){
                        var list=result.children;
                        for(var i=0;i<list.length;i++){
                            var record=list[i];
                            if(record.id=='J-交通枢纽'){
                                var hots=record.children;
                                for(var j=0;j<hots.length;j++){
                                    var hot=hots[j];
                                    var name=hot.id;
                                    if(this.locationMap[name]!=null){
                                        var lat=this.locationMap[name].lat;
                                        var lng=this.locationMap[name].lon;
                                        if(name.indexOf('虹桥机场')!=-1){
                                            var title = name.replace('J-','');
                                            var markerthdrgsef = L.marker([lat,lng],{title: title, icon: this.markerAIRPLANE, keepInView:false}).addTo(this.specialLayer_hongqiaojichang_traffic);
                                            this.markerAirplaneArr.push(markerthdrgsef);
                                            var map=this.map;
                                            var curZoom = map.getZoom();
                                            var noNum = 0;
                                            var yesNum = 0;
                                            $("#ctrlFactor").find('.ctrlTitle ').each(function(index, el) {noNum++;});
                                            $("#ctrlFactor").find('.mapCtrlItem  ').each(function(index, el) {yesNum++;});
                                            var usenum = yesNum - noNum;
                                            if (this.loadHotalFirstNum > usenum){
                                                this.map.setView([lat,lng],curZoom);
                                            };
                                            this.loadHotalFirstNum++;

                                        }
                                    }
                                    
                                }
                                break;
                            }
                        }
                    }.bind(this));
                    var url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/area-re_cellByHotname?hotspot='+ encodeURIComponent('虹桥机场');
                    //this.heatMap = []; //全局变量,存放热点图的数据
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
                    }).done(function(result){
                       this.addCellsToLayer(result.data,this.specialLayer_hongqiaojichang_traffic);
                    }.bind(this));
                }else{
                    this.map.addLayer(this.specialLayer_hongqiaojichang_traffic);
                    var map=this.map;
                    var curZoom = map.getZoom();
                    var _layers = this.specialLayer_hongqiaojichang_traffic._layers;
                    var kk = 0 
                    for(var item in _layers){
                        if (kk == 0) {
                            var _1111 = _layers[item];
                            var _latlng = _1111._latlng; 
                            this.map.setView(_latlng,curZoom);
                        }
                        kk++;
                    }
                }
                
            }
            break;    
        case '虹桥火车站':
            if(this.map.hasLayer(this.specialLayer_hongqiaohuochezhan_traffic)){
                this.map.removeLayer(this.specialLayer_hongqiaohuochezhan_traffic);
            }else{
                if(this.specialLayer_hongqiaohuochezhan_traffic==null){
                    var hot='J-交通枢纽';
                    this.specialLayer_hongqiaohuochezhan_traffic=new L.featureGroup();
                    this.map.addLayer(this.specialLayer_hongqiaohuochezhan_traffic);
                    this.cdm.getHotspotTree({},function(result){
                        var list=result.children;
                        for(var i=0;i<list.length;i++){
                            var record=list[i];
                            if(record.id=='J-交通枢纽'){
                                var hots=record.children;
                                for(var j=0;j<hots.length;j++){
                                    var hot=hots[j];
                                    var name=hot.id;
                                    if(this.locationMap[name]!=null){
                                        var lat=this.locationMap[name].lat;
                                        var lng=this.locationMap[name].lon;
                                        if(name.indexOf('虹桥火车站')!=-1){
                                            var title = name.replace('J-','');
                                            var markerthdrgsef = L.marker([lat,lng],{title: title, icon: this.markerTRAIN, keepInView:false}).addTo(this.specialLayer_hongqiaohuochezhan_traffic);
                                            this.markerTrainArr.push(markerthdrgsef);
                                            var map=this.map;
                                            var curZoom = map.getZoom();
                                            var noNum = 0;
                                            var yesNum = 0;
                                            $("#ctrlFactor").find('.ctrlTitle ').each(function(index, el) {noNum++;});
                                            $("#ctrlFactor").find('.mapCtrlItem  ').each(function(index, el) {yesNum++;});
                                            var usenum = yesNum - noNum;
                                            if (this.loadHotalFirstNum > usenum){
                                                this.map.setView([lat,lng],curZoom);
                                            };
                                            this.loadHotalFirstNum++;

                                        }
                                    }
                                    
                                }
                                break;
                            }
                        }
                    }.bind(this));
                    var url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/area-re_cellByHotname?hotspot='+ encodeURIComponent('虹桥火车站');
                    //this.heatMap = []; //全局变量,存放热点图的数据
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
                    }).done(function(result){
                       this.addCellsToLayer(result.data,this.specialLayer_hongqiaohuochezhan_traffic);
                    }.bind(this));
                }else{
                    this.map.addLayer(this.specialLayer_hongqiaohuochezhan_traffic);
                    var map=this.map;
                    var curZoom = map.getZoom();
                    var _layers = this.specialLayer_hongqiaohuochezhan_traffic._layers;
                    var kk = 0 
                    for(var item in _layers){
                        if (kk == 0) {
                            var _1111 = _layers[item];
                            var _latlng = _1111._latlng; 
                            this.map.setView(_latlng,curZoom);
                        }
                        kk++;
                    }
                }
                
            }
            break;    
        case '上海站':
            if(this.map.hasLayer(this.specialLayer_shanghaizhan_traffic)){
                this.map.removeLayer(this.specialLayer_shanghaizhan_traffic);
            }else{
                if(this.specialLayer_shanghaizhan_traffic==null){
                    var hot='J-交通枢纽';
                    this.specialLayer_shanghaizhan_traffic=new L.featureGroup();
                    this.map.addLayer(this.specialLayer_shanghaizhan_traffic);
                    this.cdm.getHotspotTree({},function(result){
                        var list=result.children;
                        for(var i=0;i<list.length;i++){
                            var record=list[i];
                            if(record.id=='J-交通枢纽'){
                                var hots=record.children;
                                for(var j=0;j<hots.length;j++){
                                    var hot=hots[j];
                                    var name=hot.id;
                                    if(this.locationMap[name]!=null){
                                        var lat=this.locationMap[name].lat;
                                        var lng=this.locationMap[name].lon;
                                        if(name.indexOf('上海站')!=-1){
                                            var title = name.replace('J-','');
                                            var markerthdrgsef = L.marker([lat,lng],{title: title, icon: this.markerTRAIN, keepInView:false}).addTo(this.specialLayer_shanghaizhan_traffic);
                                            this.markerTrainArr.push(markerthdrgsef);
                                            var map=this.map;
                                            var curZoom = map.getZoom();
                                            var noNum = 0;
                                            var yesNum = 0;
                                            $("#ctrlFactor").find('.ctrlTitle ').each(function(index, el) {noNum++;});
                                            $("#ctrlFactor").find('.mapCtrlItem  ').each(function(index, el) {yesNum++;});
                                            var usenum = yesNum - noNum;
                                            if (this.loadHotalFirstNum > usenum){
                                                this.map.setView([lat,lng],curZoom);
                                            };
                                            this.loadHotalFirstNum++;

                                        }
                                    }
                                    
                                }
                                break;
                            }
                        }
                    }.bind(this));
                    var url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/area-re_cellByHotname?hotspot='+ encodeURIComponent('上海站');
                    //this.heatMap = []; //全局变量,存放热点图的数据
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
                    }).done(function(result){
                       this.addCellsToLayer(result.data,this.specialLayer_shanghaizhan_traffic);
                    }.bind(this));
                }else{
                    this.map.addLayer(this.specialLayer_shanghaizhan_traffic);
                    var map=this.map;
                    var curZoom = map.getZoom();
                    var _layers = this.specialLayer_shanghaizhan_traffic._layers;
                    var kk = 0 
                    for(var item in _layers){
                        if (kk == 0) {
                            var _1111 = _layers[item];
                            var _latlng = _1111._latlng; 
                            this.map.setView(_latlng,curZoom);
                        }
                        kk++;
                    }
                }
                
            }
            break;    
        case '上海南站':
            if(this.map.hasLayer(this.specialLayer_shanghainanzhan_traffic)){
                this.map.removeLayer(this.specialLayer_shanghainanzhan_traffic);
            }else{
                if(this.specialLayer_shanghainanzhan_traffic==null){
                    var hot='J-交通枢纽';
                    this.specialLayer_shanghainanzhan_traffic=new L.featureGroup();
                    this.map.addLayer(this.specialLayer_shanghainanzhan_traffic);
                    this.cdm.getHotspotTree({},function(result){
                        var list=result.children;
                        for(var i=0;i<list.length;i++){
                            var record=list[i];
                            if(record.id=='J-交通枢纽'){
                                var hots=record.children;
                                for(var j=0;j<hots.length;j++){
                                    var hot=hots[j];
                                    var name=hot.id;
                                    if(this.locationMap[name]!=null){
                                        var lat=this.locationMap[name].lat;
                                        var lng=this.locationMap[name].lon;
                                        if(name.indexOf('上海南站')!=-1){
                                            var title = name.replace('J-','');
                                            var markerthdrgsef = L.marker([lat,lng],{title: title, icon: this.markerTRAIN, keepInView:false}).addTo(this.specialLayer_shanghainanzhan_traffic);
                                            this.markerTrainArr.push(markerthdrgsef);
                                            var map=this.map;
                                            var curZoom = map.getZoom();
                                            var noNum = 0;
                                            var yesNum = 0;
                                            $("#ctrlFactor").find('.ctrlTitle ').each(function(index, el) {noNum++;});
                                            $("#ctrlFactor").find('.mapCtrlItem  ').each(function(index, el) {yesNum++;});
                                            var usenum = yesNum - noNum;
                                            if (this.loadHotalFirstNum > usenum){
                                                this.map.setView([lat,lng],curZoom);
                                            };
                                            this.loadHotalFirstNum++;

                                        }
                                    }
                                    
                                }
                                break;
                            }
                        }
                    }.bind(this));
                    var url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/area-re_cellByHotname?hotspot='+ encodeURIComponent('上海南站');
                    //this.heatMap = []; //全局变量,存放热点图的数据
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
                    }).done(function(result){
                       this.addCellsToLayer(result.data,this.specialLayer_shanghainanzhan_traffic);
                    }.bind(this));
                }else{
                    this.map.addLayer(this.specialLayer_shanghainanzhan_traffic);
                    var map=this.map;
                    var curZoom = map.getZoom();
                    var _layers = this.specialLayer_shanghainanzhan_traffic._layers;
                    var kk = 0 
                    for(var item in _layers){
                        if (kk == 0) {
                            var _1111 = _layers[item];
                            var _latlng = _1111._latlng; 
                            this.map.setView(_latlng,curZoom);
                        }
                        kk++;
                    }
                }
                
            }
            break;  
        case '保障线路':
            if(!addCancel){
            //if(this.map.hasLayer(this.specialLayer_all_line)){
                this.map.removeLayer(this.specialLayer_all_line);
            }else{
                if(this.specialLayer_all_line==null){
                    this.specialLayer_all_line=new L.featureGroup();
                    this.map.addLayer(this.specialLayer_all_line);
                    var colors=[
                                "#cc0066",
                                "#660099",
                                "#0033ff",
                                "#00cc00"
                               ];
                    
                    var lines = [
                    
                             // [[[31.15982,121.818034],[31.144166,121.819949],[31.136894,121.821639],[31.128456,121.823329],[31.121183,121.826374],[31.116528,121.827049],[31.11129,121.826034],[31.108381,121.81589],[31.10547,121.803038],[31.103723,121.790864],[31.101106,121.775307],[31.100233,121.761103],[31.100233,121.744532],[31.099068,121.726609],[31.099068,121.71173],[31.097613,121.694482],[31.098195,121.681969],[31.09674,121.670807],[31.094702,121.658297],[31.092958,121.642401],[31.091211,121.627522],[31.090627,121.603171],[31.087426,121.589307],[31.083643,121.57747],[31.076656,121.565971],[31.070252,121.560561],[31.063848,121.546358],[31.060353,121.535535],[31.058606,121.528771],[31.058606,121.520654],[31.056859,121.50679],[31.056277,121.492247],[31.05657,121.480073],[31.054822,121.459782],[31.051909,121.445578],[31.048707,121.433065],[31.048999,121.43036],[31.040771,121.407125],[31.03786,121.395966],[31.033202,121.380745],[31.028832,121.371276],[31.024173,121.356397],[31.017763,121.345914],[31.017763,121.329681],[31.020093,121.313109]]],
                             // [[[31.098106,121.673903],[31.12837,121.663083],[31.146406,121.658346],[31.163276,121.653614],[31.156295,121.612353],[31.151059,121.586654],[31.147568,121.547422],[31.139423,121.510897],[31.135932,121.485199],[31.12837,121.452733],[31.124294,121.425678],[31.12604,121.395242],[31.116731,121.358039],[31.092287,121.329632],[31.065506,121.308665]]],
                             // [[[31.159786,121.820673],[31.160077,121.815956],[31.169965,121.807163],[31.17898,121.801414],[31.185957,121.793974],[31.193517,121.78755],[31.195262,121.774361],[31.192644,121.758465],[31.188574,121.745952],[31.183631,121.732087],[31.176652,121.713825],[31.169965,121.695563],[31.166764,121.680345],[31.165022,121.666817],[31.167637,121.655319],[31.177816,121.652953],[31.196134,121.651939],[31.209504,121.651939],[31.222586,121.65126],[31.232176,121.64957],[31.22956,121.636042],[31.226364,121.629617],[31.2252,121.610004],[31.221423,121.597827],[31.215901,121.586668],[31.213865,121.576524],[31.210668,121.566716],[31.20689,121.556232],[31.204274,121.548115],[31.204563,121.533911],[31.207762,121.519032],[31.213865,121.50821],[31.206307,121.490623],[31.203401,121.481154],[31.198751,121.471349],[31.19497,121.463231],[31.191772,121.457821],[31.186538,121.449367],[31.184795,121.446998],[31.187121,121.435161],[31.190027,121.430426],[31.198168,121.424002],[31.20689,121.419943],[31.212121,121.418253],[31.215318,121.425692]]],
                             // [[[31.158374,121.818259],[31.176696,121.796613],[31.186582,121.789849],[31.195014,121.781059],[31.195887,121.765162],[31.216526,121.751298],[31.233962,121.740136],[31.250817,121.728977],[31.244714,121.708686],[31.239774,121.685689],[31.235706,121.665397],[31.231638,121.649165]]],
                             // [[[31.161155,121.434767],[31.154695,121.427704],[31.150624,121.42297],[31.143933,121.417221],[31.137826,121.409103],[31.128224,121.399634],[31.128224,121.393209],[31.145679,121.38374],[31.16255,121.374272],[31.170692,121.370552],[31.181451,121.366154],[31.18872,121.363788],[31.195696,121.385094],[31.202964,121.399634],[31.206453,121.404032],[31.207906,121.413162],[31.212558,121.417896]]],
                             // [[[31.201133,121.326418],[31.207819,121.333182],[31.229037,121.333858],[31.230781,121.354489],[31.239789,121.35415],[31.248508,121.355503],[31.257515,121.358208],[31.257804,121.372412],[31.255191,121.385939],[31.253156,121.399128],[31.251704,121.418741],[31.252576,121.426184],[31.253156,121.436667],[31.262163,121.445121],[31.267393,121.460339],[31.26681,121.465749],[31.258967,121.464735],[31.254608,121.462705],[31.254319,121.45628],[31.251124,121.450195],[31.246764,121.443767],[31.258095,121.436328],[31.254319,121.4228],[31.253448,121.411302],[31.253708,121.40163],[31.254726,121.394191],[31.255742,121.387257],[31.256178,121.38337],[31.257485,121.378296],[31.258502,121.372885],[31.258211,121.367643],[31.258647,121.359866],[31.25516,121.357836],[31.251093,121.357159],[31.243423,121.355081],[31.235575,121.355081],[31.230926,121.356096],[31.231218,121.342229],[31.228602,121.328025],[31.225694,121.317542],[31.225114,121.307734],[31.216919,121.30922],[31.204419,121.311249],[31.204128,121.328497]]],
                             // [[[31.258676,121.358648],[31.270879,121.365412],[31.285111,121.366763],[31.294697,121.365748],[31.293243,121.38807],[31.293243,121.409037],[31.293825,121.42493],[31.296437,121.439812],[31.298762,121.456381],[31.301374,121.466528],[31.297308,121.480056],[31.298471,121.496625],[31.303116,121.516241],[31.307764,121.528754],[31.313281,121.545323],[31.314152,121.552426],[31.305439,121.551412],[31.292371,121.562234],[31.285982,121.565615],[31.279301,121.569335],[31.273492,121.576099],[31.267393,121.583202],[31.263615,121.585567],[31.261002,121.59301],[31.253736,121.600785],[31.248508,121.60383],[31.241825,121.610257],[31.239209,121.618033],[31.237756,121.624797],[31.23456,121.630885],[31.228456,121.632239]]],
                             // [[[31.267101,121.467879],[31.268845,121.473628],[31.273203,121.479717],[31.27843,121.484451],[31.282787,121.486141],[31.286273,121.489186],[31.291791,121.490876],[31.291211,121.50136],[31.293534,121.508802],[31.2915,121.516917],[31.291791,121.527064],[31.283368,121.531798],[31.275817,121.540253],[31.265649,121.547016],[31.260419,121.553102],[31.254028,121.563585],[31.24444,121.570349],[31.234269,121.575762],[31.221771,121.579143],[31.214214,121.581172],[31.21625,121.581511]]],
                             // [[[31.159291,121.297029],[31.164235,121.314955],[31.170052,121.332199],[31.174704,121.344712],[31.178194,121.352491],[31.181973,121.355874],[31.188952,121.360945],[31.193023,121.372783],[31.197384,121.382251],[31.19971,121.391384],[31.203488,121.397133],[31.206977,121.402882],[31.209882,121.413366],[31.213371,121.420805]]],
                             // [[[31.154624,121.491891],[31.151425,121.472953],[31.149679,121.465514],[31.149968,121.460104],[31.14648,121.450296],[31.14357,121.442517],[31.14037,121.430343],[31.138335,121.425609],[31.147061,121.418506],[31.149096,121.416815],[31.168292,121.408361],[31.176434,121.403963],[31.186904,121.401258],[31.196206,121.396524],[31.204056,121.392804],[31.205217,121.376622],[31.208706,121.345003],[31.21234,121.333335],[31.21234,121.33401]]]

                            [[[31.147726,121.816531],[31.116254,121.82773],[31.109828,121.82437],[31.106617,121.804211],[31.103404,121.784425],[31.100834,121.765387],[31.10212,121.741119],[31.098907,121.712374],[31.097621,121.670563],[31.09248,121.64443],[31.092161,121.621658],[31.090875,121.600004],[31.08702,121.583204],[31.069987,121.557445],[31.060346,121.533181],[31.056812,121.495102],[31.056812,121.481289],[31.053597,121.455156],[31.048132,121.42865],[31.040739,121.400278],[31.045239,121.397291],[31.106617,121.369293],[31.12075,121.362946],[31.171164,121.329348],[31.184323,121.322627],[31.2039,121.310306],[31.201654,121.324119]]],
                            [[[31.205232,121.310197],[31.225126,121.308702],[31.227372,121.323636],[31.229617,121.337822],[31.229938,121.356116],[31.237317,121.354621],[31.245337,121.354247],[31.260091,121.359847],[31.272595,121.366568],[31.295682,121.365447],[31.293438,121.390835],[31.2944,121.416965],[31.29953,121.457284],[31.301453,121.467738],[31.296323,121.48379],[31.313633,121.542403],[31.314275,121.552481],[31.304657,121.552107],[31.290231,121.56368],[31.276124,121.570401],[31.26458,121.586826],[31.244374,121.609599],[31.236032,121.632],[31.226087,121.631253]]],
                            [[[31.159647,121.813286],[31.185008,121.796857],[31.1956,121.780806],[31.193994,121.762886],[31.189501,121.749073],[31.218063,121.736753],[31.24918,121.722567],[31.242123,121.696434],[31.233782,121.66097],[31.226724,121.630356],[31.224158,121.604597],[31.216136,121.587051],[31.210683,121.570625],[31.209398,121.560547],[31.203942,121.545987],[31.21389,121.50716],[31.203942,121.483267],[31.193675,121.461616],[31.188861,121.452656],[31.188218,121.433991],[31.206831,121.419057],[31.21325,121.41831]]],
                            [[[31.204755,121.313264],[31.207965,121.332306],[31.228819,121.333798],[31.230744,121.357691],[31.245821,121.354704],[31.257369,121.358436],[31.252558,121.395023],[31.250632,121.418169],[31.253198,121.435342],[31.256727,121.443555],[31.248387,121.452888],[31.251916,121.470435],[31.264746,121.470435],[31.26699,121.467819],[31.264103,121.453259],[31.259614,121.441315],[31.254482,121.433473],[31.251916,121.404354],[31.258651,121.361051],[31.24486,121.35657],[31.22914,121.357317]]],
                            [[[31.267798,121.469475],[31.270363,121.476193],[31.276455,121.481419],[31.28415,121.484405],[31.287678,121.490008],[31.292166,121.489634],[31.292166,121.49822],[31.291524,121.50382],[31.294731,121.508299],[31.291524,121.516138],[31.291524,121.521737],[31.291524,121.527711],[31.281585,121.53294],[31.272287,121.542271],[31.261703,121.549739],[31.2508,121.568403],[31.23829,121.57475],[31.222248,121.579603],[31.214868,121.581845]]],
                            [[[31.157895,121.81359],[31.191278,121.791192],[31.196413,121.778871],[31.193524,121.761698],[31.214705,121.754607],[31.214384,121.732953],[31.20604,121.710554],[31.203794,121.685169],[31.192242,121.638876],[31.189031,121.63029],[31.181328,121.61237],[31.174909,121.589971],[31.169773,121.57429],[31.169451,121.560104],[31.155326,121.520907],[31.152436,121.484322],[31.149546,121.458563],[31.13927,121.425336],[31.159499,121.412641],[31.180366,121.402563],[31.200584,121.395098],[31.204863,121.392906],[31.213687,121.386746],[31.21481,121.374053],[31.216576,121.355574],[31.218018,121.332987]]],
                            [[[31.157531,121.813513],[31.180967,121.795593],[31.191878,121.785888],[31.194127,121.767594],[31.187707,121.742209],[31.17262,121.698156],[31.161707,121.665305],[31.161707,121.653732],[31.197014,121.652985],[31.231668,121.650372]]],
                            [[[31.099449,121.670905],[31.141416,121.657961],[31.157684,121.653482],[31.16004,121.649748],[31.15897,121.635065],[31.153833,121.601964],[31.151479,121.577823],[31.147625,121.55368],[31.141416,121.52481],[31.136708,121.493452],[31.13585,121.483497],[31.130927,121.465327],[31.127714,121.437702],[31.124504,121.414059],[31.124074,121.385934],[31.122363,121.374487],[31.119365,121.363785]]],
                            [[[31.193754,121.331426],[31.182198,121.339886],[31.175136,121.344615],[31.181128,121.356811],[31.190116,121.365024],[31.164008,121.372489],[31.140462,121.385431],[31.127403,121.394391],[31.128473,121.400117],[31.137037,121.408577],[31.149667,121.419776],[31.160369,121.435207]]],
                            [[[31.202645,121.309861],[31.198153,121.299906],[31.178466,121.315834],[31.176113,121.33201],[31.17547,121.340472],[31.184029,121.352669],[31.190663,121.363618],[31.194515,121.38303],[31.206495,121.406427],[31.214411,121.422355],[31.217618,121.435793],[31.226816,121.448735],[31.230667,121.462423],[31.23088,121.476112],[31.224464,121.479099],[31.217406,121.476362],[31.183602,121.491543],[31.178893,121.483827],[31.15471,121.49478]]],
                            [[[31.203028,121.388252],[31.197466,121.391239],[31.197893,121.402687],[31.196897,121.424988],[31.20567,121.447887],[31.210589,121.464809],[31.215296,121.478001]]]
                    ];       
                    for(var i=0;i<lines.length;i++){
                        var list=lines[i];
                        for(var j=0;j<list.length;j++){
                            var latlngs=list[j];
                            //var color=colors[i%colors.length];
                            var color='#0091ff';
                            var polyline = L.polyline(latlngs, {color: color,weight:5,opacity:1}).addTo(this.specialLayer_all_line);
                        }
                    }
                }else{
                    this.map.addLayer(this.specialLayer_all_line);
                }
            }
            break;    
        case '浦东机场线路':
            if(this.map.hasLayer(this.specialLayer_pudongjichang_line)){
                this.map.removeLayer(this.specialLayer_pudongjichang_line);
            }else{
                if(this.specialLayer_pudongjichang_line==null){
                    this.specialLayer_pudongjichang_line=new L.featureGroup();
                    this.map.addLayer(this.specialLayer_pudongjichang_line);
                    var colors=[
                                "#cc0066",
                                "#660099",
                                "#0033ff",
                                "#00cc00"
                               ];
                    var lines=[
                            [//虹桥火车站-国家会展中心
                             [[31.20034, 121.3249],[31.19327, 121.32515],[31.19192, 121.31069]]
                            ],
                            [//虹桥机场-国家会展中心
                             [[31.20057, 121.33364],[31.19372, 121.33182],[31.19168, 121.31043]]
                            ],
                            [//沪杭高铁
                             [[31.20029, 121.32575],[31.19726, 121.32593],[31.18519, 121.32827],[31.17901, 121.32726],[31.17722, 121.32744],[31.11874, 121.36675],[31.11605, 121.36823],[31.10551, 121.37282],[31.09987, 121.37405],[31.09609, 121.37218],[31.07949, 121.35518],[31.07528, 121.34846],[31.05957, 121.31954],[31.05084, 121.3079],[31.04206, 121.29942],[31.02442, 121.28008],[31.00418, 121.26219],[30.99594, 121.25141],[30.98146, 121.22281],[30.97403, 121.21131],[30.94615, 121.18587],[30.94163, 121.18055],[30.93339, 121.1674],[30.91276, 121.11724],[30.88456, 121.06686],[30.86355, 121.02231]]
                            ],
                            [//京沪/沪宁高铁
                             [[31.2025,121.32775],[31.2248, 121.32557],[31.22986, 121.32169],[31.24876, 121.30035],[31.27586, 121.28907],[31.28592, 121.28138],[31.2924, 121.27354],[31.29586, 121.26758],[31.30153, 121.24832]]
                            ],
                            [//浦东机场-国家会展中心
                             [[31.15582, 121.81216],[31.16493, 121.80937],[31.18817, 121.79284],[31.19212, 121.78824],[31.19496, 121.77185],[31.19076, 121.75072],[31.16246, 121.66722],[31.15702, 121.61519],[31.15356, 121.60081],[31.15035, 121.56618],[31.13761, 121.49977],[31.13576, 121.48281],[31.13094, 121.46628],[31.12488, 121.41986],[31.12377, 121.37918],[31.11944, 121.36381],[31.12216, 121.3633],[31.14559, 121.34613],[31.16951, 121.33132],[31.11925, 121.36402],[31.12247, 121.36309],[31.14596, 121.34584],[31.16963, 121.33053],[31.17983, 121.32457],[31.18434, 121.32349],[31.19253, 121.31838],[31.192, 121.31111]]
                            ],
                            [//上海站-国家会展中心
                             [[31.25363, 121.45904],[31.25667, 121.45763],[31.26163, 121.45846],[31.26453, 121.45625],[31.2637, 121.45162],[31.26023, 121.44287],[31.2532, 121.43574],[31.24746, 121.42503],[31.2403, 121.41857],[31.2403, 121.41857],[31.23141, 121.41756],[31.2248, 121.41713],[31.21794, 121.41929],[31.21424, 121.41835],[31.2122, 121.41842],[31.20824, 121.4131],[31.20534, 121.40369],[31.19799, 121.39111],[31.18916, 121.36481],[31.17884, 121.35382],[31.17606, 121.34871],[31.16963, 121.33053],[31.17983, 121.32457],[31.18434, 121.32349],[31.19253, 121.31838],[31.192, 121.31111]]
                            ],
                            [//上海南站-国家会展中心
                             [[31.15929, 121.43089],[31.12451, 121.39507],[31.12377, 121.38026],[31.11925, 121.36402],[31.12247, 121.36309],[31.14596, 121.34584],[31.16963, 121.33053],[31.17983, 121.32457],[31.18434, 121.32349],[31.19253, 121.31838],[31.192, 121.31111]]
                            ]
                           ];
                    //for(var i=0;i<lines.length;i++){
                        var i = 4;
                        var list=lines[i];
                        for(var j=0;j<list.length;j++){
                            var latlngs=list[j];
                            var color=colors[i%colors.length];
                            var polyline = L.polyline(latlngs, {color: color,weight:10}).addTo(this.specialLayer_pudongjichang_line);
                        }
                          
                    //}
                }else{
                    this.map.addLayer(this.specialLayer_pudongjichang_line);
                    var map=this.map;
                    var curZoom = map.getZoom();
                    var _layers = this.specialLayer_pudongjichang_line._layers;
                    var kk = 0 
                    for(var item in _layers){
                        if (kk == 0) {
                            var _1111 = _layers[item];
                            var _latlngs = _1111._latlngs;
                            var index_2 = parseInt((_latlngs.length) / 2);
                            this.map.setView(_latlngs[index_2],curZoom);
                        }
                        kk++;
                    }
                    var flag1 = $('div.mapCtrlItem[func="浦东机场线路"]').eq(0).hasClass('mapCtrlItemSelected');
                    var flag2 = $('div.mapCtrlItem[func="虹桥机场线路"]').eq(0).hasClass('mapCtrlItemSelected');
                    var flag3 = $('div.mapCtrlItem[func="沪杭高铁线路"]').eq(0).hasClass('mapCtrlItemSelected');
                    var flag4 = $('div.mapCtrlItem[func="京沪/沪宁高铁线路"]').eq(0).hasClass('mapCtrlItemSelected');
                    var flag5 = $('div.mapCtrlItem[func="虹桥火车站线路"]').eq(0).hasClass('mapCtrlItemSelected');
                    var flag6 = $('div.mapCtrlItem[func="上海站线路"]').eq(0).hasClass('mapCtrlItemSelected');
                    var flag7 = $('div.mapCtrlItem[func="上海南站线路"]').eq(0).hasClass('mapCtrlItemSelected');

                    if (flag1 && flag2 && flag3 && flag4 && flag5 && flag6 && flag7 ) {
                        $(".ctrlTitle[func='保障线路']").addClass('mapCtrlItemSelected');  
                    }

                }
            }
            break;
        case '虹桥机场线路':
            if(this.map.hasLayer(this.specialLayer_hongqiaojichang_line)){
                this.map.removeLayer(this.specialLayer_hongqiaojichang_line);
            }else{
                if(this.specialLayer_hongqiaojichang_line==null){
                    this.specialLayer_hongqiaojichang_line=new L.featureGroup();
                    this.map.addLayer(this.specialLayer_hongqiaojichang_line);
                    var colors=[
                                "#cc0066",
                                "#660099",
                                "#0033ff",
                                "#00cc00"
                               ];
                    var lines=[
                            [//虹桥火车站-国家会展中心
                             [[31.20034, 121.3249],[31.19327, 121.32515],[31.19192, 121.31069]]
                            ],
                            [//虹桥机场-国家会展中心
                             [[31.20057, 121.33364],[31.19372, 121.33182],[31.19168, 121.31043]]
                            ],
                            [//沪杭高铁
                             [[31.20029, 121.32575],[31.19726, 121.32593],[31.18519, 121.32827],[31.17901, 121.32726],[31.17722, 121.32744],[31.11874, 121.36675],[31.11605, 121.36823],[31.10551, 121.37282],[31.09987, 121.37405],[31.09609, 121.37218],[31.07949, 121.35518],[31.07528, 121.34846],[31.05957, 121.31954],[31.05084, 121.3079],[31.04206, 121.29942],[31.02442, 121.28008],[31.00418, 121.26219],[30.99594, 121.25141],[30.98146, 121.22281],[30.97403, 121.21131],[30.94615, 121.18587],[30.94163, 121.18055],[30.93339, 121.1674],[30.91276, 121.11724],[30.88456, 121.06686],[30.86355, 121.02231]]
                            ],
                            [//京沪/沪宁高铁
                             [[31.2025,121.32775],[31.2248, 121.32557],[31.22986, 121.32169],[31.24876, 121.30035],[31.27586, 121.28907],[31.28592, 121.28138],[31.2924, 121.27354],[31.29586, 121.26758],[31.30153, 121.24832]]
                            ],
                            [//浦东机场-国家会展中心
                             [[31.15582, 121.81216],[31.16493, 121.80937],[31.18817, 121.79284],[31.19212, 121.78824],[31.19496, 121.77185],[31.19076, 121.75072],[31.16246, 121.66722],[31.15702, 121.61519],[31.15356, 121.60081],[31.15035, 121.56618],[31.13761, 121.49977],[31.13576, 121.48281],[31.13094, 121.46628],[31.12488, 121.41986],[31.12377, 121.37918],[31.11944, 121.36381],[31.12216, 121.3633],[31.14559, 121.34613],[31.16951, 121.33132],[31.11925, 121.36402],[31.12247, 121.36309],[31.14596, 121.34584],[31.16963, 121.33053],[31.17983, 121.32457],[31.18434, 121.32349],[31.19253, 121.31838],[31.192, 121.31111]]
                            ],
                            [//上海站-国家会展中心
                             [[31.25363, 121.45904],[31.25667, 121.45763],[31.26163, 121.45846],[31.26453, 121.45625],[31.2637, 121.45162],[31.26023, 121.44287],[31.2532, 121.43574],[31.24746, 121.42503],[31.2403, 121.41857],[31.2403, 121.41857],[31.23141, 121.41756],[31.2248, 121.41713],[31.21794, 121.41929],[31.21424, 121.41835],[31.2122, 121.41842],[31.20824, 121.4131],[31.20534, 121.40369],[31.19799, 121.39111],[31.18916, 121.36481],[31.17884, 121.35382],[31.17606, 121.34871],[31.16963, 121.33053],[31.17983, 121.32457],[31.18434, 121.32349],[31.19253, 121.31838],[31.192, 121.31111]]
                            ],
                            [//上海南站-国家会展中心
                             [[31.15929, 121.43089],[31.12451, 121.39507],[31.12377, 121.38026],[31.11925, 121.36402],[31.12247, 121.36309],[31.14596, 121.34584],[31.16963, 121.33053],[31.17983, 121.32457],[31.18434, 121.32349],[31.19253, 121.31838],[31.192, 121.31111]]
                            ]
                           ];
                    //for(var i=0;i<lines.length;i++){
                        var i=1;
                        var list=lines[i];
                        for(var j=0;j<list.length;j++){
                            var latlngs=list[j];
                            var color=colors[i%colors.length];
                            var polyline = L.polyline(latlngs, {color: color,weight:10}).addTo(this.specialLayer_hongqiaojichang_line);
                        }
                          
                    //}
                }else{
                    this.map.addLayer(this.specialLayer_hongqiaojichang_line);
                    var map=this.map;
                    var curZoom = map.getZoom();
                    var _layers = this.specialLayer_hongqiaojichang_line._layers;
                    var kk = 0 
                    for(var item in _layers){
                        if (kk == 0) {
                            var _1111 = _layers[item];
                            var _latlngs = _1111._latlngs;
                            var index_2 = parseInt((_latlngs.length) / 2);
                            this.map.setView(_latlngs[index_2],curZoom);
                        }
                        kk++;
                    }
                    var flag1 = $('div.mapCtrlItem[func="浦东机场线路"]').eq(0).hasClass('mapCtrlItemSelected');
                    var flag2 = $('div.mapCtrlItem[func="虹桥机场线路"]').eq(0).hasClass('mapCtrlItemSelected');
                    var flag3 = $('div.mapCtrlItem[func="沪杭高铁线路"]').eq(0).hasClass('mapCtrlItemSelected');
                    var flag4 = $('div.mapCtrlItem[func="京沪/沪宁高铁线路"]').eq(0).hasClass('mapCtrlItemSelected');
                    var flag5 = $('div.mapCtrlItem[func="虹桥火车站线路"]').eq(0).hasClass('mapCtrlItemSelected');
                    var flag6 = $('div.mapCtrlItem[func="上海站线路"]').eq(0).hasClass('mapCtrlItemSelected');
                    var flag7 = $('div.mapCtrlItem[func="上海南站线路"]').eq(0).hasClass('mapCtrlItemSelected');

                    if (flag1 && flag2 && flag3 && flag4 && flag5 && flag6 && flag7 ) {
                        $(".ctrlTitle[func='保障线路']").addClass('mapCtrlItemSelected');  
                    }
                }
            }
            break; 
        case '沪杭高铁线路':
            if(this.map.hasLayer(this.specialLayer_huhanggaotie_line)){
                this.map.removeLayer(this.specialLayer_huhanggaotie_line);
            }else{
                if(this.specialLayer_huhanggaotie_line==null){
                    this.specialLayer_huhanggaotie_line=new L.featureGroup();
                    this.map.addLayer(this.specialLayer_huhanggaotie_line);
                    var colors=[
                                "#cc0066",
                                "#660099",
                                "#0033ff",
                                "#00cc00"
                               ];
                    var lines=[
                            [//虹桥火车站-国家会展中心
                             [[31.20034, 121.3249],[31.19327, 121.32515],[31.19192, 121.31069]]
                            ],
                            [//虹桥机场-国家会展中心
                             [[31.20057, 121.33364],[31.19372, 121.33182],[31.19168, 121.31043]]
                            ],
                            [//沪杭高铁
                             [[31.20029, 121.32575],[31.19726, 121.32593],[31.18519, 121.32827],[31.17901, 121.32726],[31.17722, 121.32744],[31.11874, 121.36675],[31.11605, 121.36823],[31.10551, 121.37282],[31.09987, 121.37405],[31.09609, 121.37218],[31.07949, 121.35518],[31.07528, 121.34846],[31.05957, 121.31954],[31.05084, 121.3079],[31.04206, 121.29942],[31.02442, 121.28008],[31.00418, 121.26219],[30.99594, 121.25141],[30.98146, 121.22281],[30.97403, 121.21131],[30.94615, 121.18587],[30.94163, 121.18055],[30.93339, 121.1674],[30.91276, 121.11724],[30.88456, 121.06686],[30.86355, 121.02231]]
                            ],
                            [//京沪/沪宁高铁
                             [[31.2025,121.32775],[31.2248, 121.32557],[31.22986, 121.32169],[31.24876, 121.30035],[31.27586, 121.28907],[31.28592, 121.28138],[31.2924, 121.27354],[31.29586, 121.26758],[31.30153, 121.24832]]
                            ],
                            [//浦东机场-国家会展中心
                             [[31.15582, 121.81216],[31.16493, 121.80937],[31.18817, 121.79284],[31.19212, 121.78824],[31.19496, 121.77185],[31.19076, 121.75072],[31.16246, 121.66722],[31.15702, 121.61519],[31.15356, 121.60081],[31.15035, 121.56618],[31.13761, 121.49977],[31.13576, 121.48281],[31.13094, 121.46628],[31.12488, 121.41986],[31.12377, 121.37918],[31.11944, 121.36381],[31.12216, 121.3633],[31.14559, 121.34613],[31.16951, 121.33132],[31.11925, 121.36402],[31.12247, 121.36309],[31.14596, 121.34584],[31.16963, 121.33053],[31.17983, 121.32457],[31.18434, 121.32349],[31.19253, 121.31838],[31.192, 121.31111]]
                            ],
                            [//上海站-国家会展中心
                             [[31.25363, 121.45904],[31.25667, 121.45763],[31.26163, 121.45846],[31.26453, 121.45625],[31.2637, 121.45162],[31.26023, 121.44287],[31.2532, 121.43574],[31.24746, 121.42503],[31.2403, 121.41857],[31.2403, 121.41857],[31.23141, 121.41756],[31.2248, 121.41713],[31.21794, 121.41929],[31.21424, 121.41835],[31.2122, 121.41842],[31.20824, 121.4131],[31.20534, 121.40369],[31.19799, 121.39111],[31.18916, 121.36481],[31.17884, 121.35382],[31.17606, 121.34871],[31.16963, 121.33053],[31.17983, 121.32457],[31.18434, 121.32349],[31.19253, 121.31838],[31.192, 121.31111]]
                            ],
                            [//上海南站-国家会展中心
                             [[31.15929, 121.43089],[31.12451, 121.39507],[31.12377, 121.38026],[31.11925, 121.36402],[31.12247, 121.36309],[31.14596, 121.34584],[31.16963, 121.33053],[31.17983, 121.32457],[31.18434, 121.32349],[31.19253, 121.31838],[31.192, 121.31111]]
                            ]
                           ];
                    //for(var i=0;i<lines.length;i++){
                        var i = 2;
                        var list=lines[i];
                        for(var j=0;j<list.length;j++){
                            var latlngs=list[j];
                            var color=colors[i%colors.length];
                            var polyline = L.polyline(latlngs, {color: color,weight:10}).addTo(this.specialLayer_huhanggaotie_line);
                        }
                          
                    //}
                }else{
                    this.map.addLayer(this.specialLayer_huhanggaotie_line);
                    var map=this.map;
                    var curZoom = map.getZoom();
                    var _layers = this.specialLayer_huhanggaotie_line._layers;
                    var kk = 0 
                    for(var item in _layers){
                        if (kk == 0) {
                            var _1111 = _layers[item];
                            var _latlngs = _1111._latlngs;
                            var index_2 = parseInt((_latlngs.length) / 2);
                            this.map.setView(_latlngs[index_2],curZoom);
                        }
                        kk++;
                    }
                    var flag1 = $('div.mapCtrlItem[func="浦东机场线路"]').eq(0).hasClass('mapCtrlItemSelected');
                    var flag2 = $('div.mapCtrlItem[func="虹桥机场线路"]').eq(0).hasClass('mapCtrlItemSelected');
                    var flag3 = $('div.mapCtrlItem[func="沪杭高铁线路"]').eq(0).hasClass('mapCtrlItemSelected');
                    var flag4 = $('div.mapCtrlItem[func="京沪/沪宁高铁线路"]').eq(0).hasClass('mapCtrlItemSelected');
                    var flag5 = $('div.mapCtrlItem[func="虹桥火车站线路"]').eq(0).hasClass('mapCtrlItemSelected');
                    var flag6 = $('div.mapCtrlItem[func="上海站线路"]').eq(0).hasClass('mapCtrlItemSelected');
                    var flag7 = $('div.mapCtrlItem[func="上海南站线路"]').eq(0).hasClass('mapCtrlItemSelected');

                    if (flag1 && flag2 && flag3 && flag4 && flag5 && flag6 && flag7 ) {
                        $(".ctrlTitle[func='保障线路']").addClass('mapCtrlItemSelected');  
                    }
                }
            }
            break; 
        case '京沪/沪宁高铁线路':
            if(this.map.hasLayer(this.specialLayer_jinghuhuning_line)){
                this.map.removeLayer(this.specialLayer_jinghuhuning_line);
            }else{
                if(this.specialLayer_jinghuhuning_line==null){
                    this.specialLayer_jinghuhuning_line=new L.featureGroup();
                    this.map.addLayer(this.specialLayer_jinghuhuning_line);
                    var colors=[
                                "#cc0066",
                                "#660099",
                                "#0033ff",
                                "#00cc00"
                               ];
                    var lines=[
                            [//虹桥火车站-国家会展中心
                             [[31.20034, 121.3249],[31.19327, 121.32515],[31.19192, 121.31069]]
                            ],
                            [//虹桥机场-国家会展中心
                             [[31.20057, 121.33364],[31.19372, 121.33182],[31.19168, 121.31043]]
                            ],
                            [//沪杭高铁
                             [[31.20029, 121.32575],[31.19726, 121.32593],[31.18519, 121.32827],[31.17901, 121.32726],[31.17722, 121.32744],[31.11874, 121.36675],[31.11605, 121.36823],[31.10551, 121.37282],[31.09987, 121.37405],[31.09609, 121.37218],[31.07949, 121.35518],[31.07528, 121.34846],[31.05957, 121.31954],[31.05084, 121.3079],[31.04206, 121.29942],[31.02442, 121.28008],[31.00418, 121.26219],[30.99594, 121.25141],[30.98146, 121.22281],[30.97403, 121.21131],[30.94615, 121.18587],[30.94163, 121.18055],[30.93339, 121.1674],[30.91276, 121.11724],[30.88456, 121.06686],[30.86355, 121.02231]]
                            ],
                            [//京沪/沪宁高铁
                             [[31.2025,121.32775],[31.2248, 121.32557],[31.22986, 121.32169],[31.24876, 121.30035],[31.27586, 121.28907],[31.28592, 121.28138],[31.2924, 121.27354],[31.29586, 121.26758],[31.30153, 121.24832]]
                            ],
                            [//浦东机场-国家会展中心
                             [[31.15582, 121.81216],[31.16493, 121.80937],[31.18817, 121.79284],[31.19212, 121.78824],[31.19496, 121.77185],[31.19076, 121.75072],[31.16246, 121.66722],[31.15702, 121.61519],[31.15356, 121.60081],[31.15035, 121.56618],[31.13761, 121.49977],[31.13576, 121.48281],[31.13094, 121.46628],[31.12488, 121.41986],[31.12377, 121.37918],[31.11944, 121.36381],[31.12216, 121.3633],[31.14559, 121.34613],[31.16951, 121.33132],[31.11925, 121.36402],[31.12247, 121.36309],[31.14596, 121.34584],[31.16963, 121.33053],[31.17983, 121.32457],[31.18434, 121.32349],[31.19253, 121.31838],[31.192, 121.31111]]
                            ],
                            [//上海站-国家会展中心
                             [[31.25363, 121.45904],[31.25667, 121.45763],[31.26163, 121.45846],[31.26453, 121.45625],[31.2637, 121.45162],[31.26023, 121.44287],[31.2532, 121.43574],[31.24746, 121.42503],[31.2403, 121.41857],[31.2403, 121.41857],[31.23141, 121.41756],[31.2248, 121.41713],[31.21794, 121.41929],[31.21424, 121.41835],[31.2122, 121.41842],[31.20824, 121.4131],[31.20534, 121.40369],[31.19799, 121.39111],[31.18916, 121.36481],[31.17884, 121.35382],[31.17606, 121.34871],[31.16963, 121.33053],[31.17983, 121.32457],[31.18434, 121.32349],[31.19253, 121.31838],[31.192, 121.31111]]
                            ],
                            [//上海南站-国家会展中心
                             [[31.15929, 121.43089],[31.12451, 121.39507],[31.12377, 121.38026],[31.11925, 121.36402],[31.12247, 121.36309],[31.14596, 121.34584],[31.16963, 121.33053],[31.17983, 121.32457],[31.18434, 121.32349],[31.19253, 121.31838],[31.192, 121.31111]]
                            ]
                           ];
                    //for(var i=0;i<lines.length;i++){
                        var i=3;
                        var list=lines[i];
                        for(var j=0;j<list.length;j++){
                            var latlngs=list[j];
                            var color=colors[i%colors.length];
                            var polyline = L.polyline(latlngs, {color: color,weight:10}).addTo(this.specialLayer_jinghuhuning_line);
                        }
                          
                    //}
                }else{
                    this.map.addLayer(this.specialLayer_jinghuhuning_line);
                    var map=this.map;
                    var curZoom = map.getZoom();
                    var _layers = this.specialLayer_jinghuhuning_line._layers;
                    var kk = 0 
                    for(var item in _layers){
                        if (kk == 0) {
                            var _1111 = _layers[item];
                            var _latlngs = _1111._latlngs;
                            var index_2 = parseInt((_latlngs.length) / 2);
                            this.map.setView(_latlngs[index_2],curZoom);
                        }
                        kk++;
                    }
                    var flag1 = $('div.mapCtrlItem[func="浦东机场线路"]').eq(0).hasClass('mapCtrlItemSelected');
                    var flag2 = $('div.mapCtrlItem[func="虹桥机场线路"]').eq(0).hasClass('mapCtrlItemSelected');
                    var flag3 = $('div.mapCtrlItem[func="沪杭高铁线路"]').eq(0).hasClass('mapCtrlItemSelected');
                    var flag4 = $('div.mapCtrlItem[func="京沪/沪宁高铁线路"]').eq(0).hasClass('mapCtrlItemSelected');
                    var flag5 = $('div.mapCtrlItem[func="虹桥火车站线路"]').eq(0).hasClass('mapCtrlItemSelected');
                    var flag6 = $('div.mapCtrlItem[func="上海站线路"]').eq(0).hasClass('mapCtrlItemSelected');
                    var flag7 = $('div.mapCtrlItem[func="上海南站线路"]').eq(0).hasClass('mapCtrlItemSelected');

                    if (flag1 && flag2 && flag3 && flag4 && flag5 && flag6 && flag7 ) {
                        $(".ctrlTitle[func='保障线路']").addClass('mapCtrlItemSelected');  
                    }
                }
            }
            break; 
        case '虹桥火车站线路':
            if(this.map.hasLayer(this.specialLayer_hongqiaohuochezhan_line)){
                this.map.removeLayer(this.specialLayer_hongqiaohuochezhan_line);
            }else{
                if(this.specialLayer_hongqiaohuochezhan_line==null){
                    this.specialLayer_hongqiaohuochezhan_line=new L.featureGroup();
                    this.map.addLayer(this.specialLayer_hongqiaohuochezhan_line);
                    var colors=[
                                "#cc0066",
                                "#660099",
                                "#0033ff",
                                "#00cc00"
                               ];
                    var lines=[
                            [//虹桥火车站-国家会展中心
                             [[31.20034, 121.3249],[31.19327, 121.32515],[31.19192, 121.31069]]
                            ],
                            [//虹桥机场-国家会展中心
                             [[31.20057, 121.33364],[31.19372, 121.33182],[31.19168, 121.31043]]
                            ],
                            [//沪杭高铁
                             [[31.20029, 121.32575],[31.19726, 121.32593],[31.18519, 121.32827],[31.17901, 121.32726],[31.17722, 121.32744],[31.11874, 121.36675],[31.11605, 121.36823],[31.10551, 121.37282],[31.09987, 121.37405],[31.09609, 121.37218],[31.07949, 121.35518],[31.07528, 121.34846],[31.05957, 121.31954],[31.05084, 121.3079],[31.04206, 121.29942],[31.02442, 121.28008],[31.00418, 121.26219],[30.99594, 121.25141],[30.98146, 121.22281],[30.97403, 121.21131],[30.94615, 121.18587],[30.94163, 121.18055],[30.93339, 121.1674],[30.91276, 121.11724],[30.88456, 121.06686],[30.86355, 121.02231]]
                            ],
                            [//京沪/沪宁高铁
                             [[31.2025,121.32775],[31.2248, 121.32557],[31.22986, 121.32169],[31.24876, 121.30035],[31.27586, 121.28907],[31.28592, 121.28138],[31.2924, 121.27354],[31.29586, 121.26758],[31.30153, 121.24832]]
                            ],
                            [//浦东机场-国家会展中心
                             [[31.15582, 121.81216],[31.16493, 121.80937],[31.18817, 121.79284],[31.19212, 121.78824],[31.19496, 121.77185],[31.19076, 121.75072],[31.16246, 121.66722],[31.15702, 121.61519],[31.15356, 121.60081],[31.15035, 121.56618],[31.13761, 121.49977],[31.13576, 121.48281],[31.13094, 121.46628],[31.12488, 121.41986],[31.12377, 121.37918],[31.11944, 121.36381],[31.12216, 121.3633],[31.14559, 121.34613],[31.16951, 121.33132],[31.11925, 121.36402],[31.12247, 121.36309],[31.14596, 121.34584],[31.16963, 121.33053],[31.17983, 121.32457],[31.18434, 121.32349],[31.19253, 121.31838],[31.192, 121.31111]]
                            ],
                            [//上海站-国家会展中心
                             [[31.25363, 121.45904],[31.25667, 121.45763],[31.26163, 121.45846],[31.26453, 121.45625],[31.2637, 121.45162],[31.26023, 121.44287],[31.2532, 121.43574],[31.24746, 121.42503],[31.2403, 121.41857],[31.2403, 121.41857],[31.23141, 121.41756],[31.2248, 121.41713],[31.21794, 121.41929],[31.21424, 121.41835],[31.2122, 121.41842],[31.20824, 121.4131],[31.20534, 121.40369],[31.19799, 121.39111],[31.18916, 121.36481],[31.17884, 121.35382],[31.17606, 121.34871],[31.16963, 121.33053],[31.17983, 121.32457],[31.18434, 121.32349],[31.19253, 121.31838],[31.192, 121.31111]]
                            ],
                            [//上海南站-国家会展中心
                             [[31.15929, 121.43089],[31.12451, 121.39507],[31.12377, 121.38026],[31.11925, 121.36402],[31.12247, 121.36309],[31.14596, 121.34584],[31.16963, 121.33053],[31.17983, 121.32457],[31.18434, 121.32349],[31.19253, 121.31838],[31.192, 121.31111]]
                            ]
                           ];
                    //for(var i=0;i<lines.length;i++){
                        var i=0;
                        var list=lines[i];
                        for(var j=0;j<list.length;j++){
                            var latlngs=list[j];
                            var color=colors[i%colors.length];
                            var polyline = L.polyline(latlngs, {color: color,weight:10}).addTo(this.specialLayer_hongqiaohuochezhan_line);
                        }
                          
                   // }
                }else{
                    this.map.addLayer(this.specialLayer_hongqiaohuochezhan_line);
                    var map=this.map;
                    var curZoom = map.getZoom();
                    var _layers = this.specialLayer_hongqiaohuochezhan_line._layers;
                    var kk = 0 
                    for(var item in _layers){
                        if (kk == 0) {
                            var _1111 = _layers[item];
                            var _latlngs = _1111._latlngs;
                            var index_2 = parseInt((_latlngs.length) / 2);
                            this.map.setView(_latlngs[index_2],curZoom);
                        }
                        kk++;
                    }
                    var flag1 = $('div.mapCtrlItem[func="浦东机场线路"]').eq(0).hasClass('mapCtrlItemSelected');
                    var flag2 = $('div.mapCtrlItem[func="虹桥机场线路"]').eq(0).hasClass('mapCtrlItemSelected');
                    var flag3 = $('div.mapCtrlItem[func="沪杭高铁线路"]').eq(0).hasClass('mapCtrlItemSelected');
                    var flag4 = $('div.mapCtrlItem[func="京沪/沪宁高铁线路"]').eq(0).hasClass('mapCtrlItemSelected');
                    var flag5 = $('div.mapCtrlItem[func="虹桥火车站线路"]').eq(0).hasClass('mapCtrlItemSelected');
                    var flag6 = $('div.mapCtrlItem[func="上海站线路"]').eq(0).hasClass('mapCtrlItemSelected');
                    var flag7 = $('div.mapCtrlItem[func="上海南站线路"]').eq(0).hasClass('mapCtrlItemSelected');

                    if (flag1 && flag2 && flag3 && flag4 && flag5 && flag6 && flag7 ) {
                        $(".ctrlTitle[func='保障线路']").addClass('mapCtrlItemSelected');  
                    }
                }
            }
            break; 
        case '上海站线路':
            if(this.map.hasLayer(this.specialLayer_shanghaizhan_line)){
                this.map.removeLayer(this.specialLayer_shanghaizhan_line);
            }else{
                if(this.specialLayer_shanghaizhan_line==null){
                    this.specialLayer_shanghaizhan_line=new L.featureGroup();
                    this.map.addLayer(this.specialLayer_shanghaizhan_line);
                    var colors=[
                                "#cc0066",
                                "#660099",
                                "#0033ff",
                                "#00cc00"
                               ];
                    var lines=[
                            [//虹桥火车站-国家会展中心
                             [[31.20034, 121.3249],[31.19327, 121.32515],[31.19192, 121.31069]]
                            ],
                            [//虹桥机场-国家会展中心
                             [[31.20057, 121.33364],[31.19372, 121.33182],[31.19168, 121.31043]]
                            ],
                            [//沪杭高铁
                             [[31.20029, 121.32575],[31.19726, 121.32593],[31.18519, 121.32827],[31.17901, 121.32726],[31.17722, 121.32744],[31.11874, 121.36675],[31.11605, 121.36823],[31.10551, 121.37282],[31.09987, 121.37405],[31.09609, 121.37218],[31.07949, 121.35518],[31.07528, 121.34846],[31.05957, 121.31954],[31.05084, 121.3079],[31.04206, 121.29942],[31.02442, 121.28008],[31.00418, 121.26219],[30.99594, 121.25141],[30.98146, 121.22281],[30.97403, 121.21131],[30.94615, 121.18587],[30.94163, 121.18055],[30.93339, 121.1674],[30.91276, 121.11724],[30.88456, 121.06686],[30.86355, 121.02231]]
                            ],
                            [//京沪/沪宁高铁
                             [[31.2025,121.32775],[31.2248, 121.32557],[31.22986, 121.32169],[31.24876, 121.30035],[31.27586, 121.28907],[31.28592, 121.28138],[31.2924, 121.27354],[31.29586, 121.26758],[31.30153, 121.24832]]
                            ],
                            [//浦东机场-国家会展中心
                             [[31.15582, 121.81216],[31.16493, 121.80937],[31.18817, 121.79284],[31.19212, 121.78824],[31.19496, 121.77185],[31.19076, 121.75072],[31.16246, 121.66722],[31.15702, 121.61519],[31.15356, 121.60081],[31.15035, 121.56618],[31.13761, 121.49977],[31.13576, 121.48281],[31.13094, 121.46628],[31.12488, 121.41986],[31.12377, 121.37918],[31.11944, 121.36381],[31.12216, 121.3633],[31.14559, 121.34613],[31.16951, 121.33132],[31.11925, 121.36402],[31.12247, 121.36309],[31.14596, 121.34584],[31.16963, 121.33053],[31.17983, 121.32457],[31.18434, 121.32349],[31.19253, 121.31838],[31.192, 121.31111]]
                            ],
                            [//上海站-国家会展中心
                             [[31.25363, 121.45904],[31.25667, 121.45763],[31.26163, 121.45846],[31.26453, 121.45625],[31.2637, 121.45162],[31.26023, 121.44287],[31.2532, 121.43574],[31.24746, 121.42503],[31.2403, 121.41857],[31.2403, 121.41857],[31.23141, 121.41756],[31.2248, 121.41713],[31.21794, 121.41929],[31.21424, 121.41835],[31.2122, 121.41842],[31.20824, 121.4131],[31.20534, 121.40369],[31.19799, 121.39111],[31.18916, 121.36481],[31.17884, 121.35382],[31.17606, 121.34871],[31.16963, 121.33053],[31.17983, 121.32457],[31.18434, 121.32349],[31.19253, 121.31838],[31.192, 121.31111]]
                            ],
                            [//上海南站-国家会展中心
                             [[31.15929, 121.43089],[31.12451, 121.39507],[31.12377, 121.38026],[31.11925, 121.36402],[31.12247, 121.36309],[31.14596, 121.34584],[31.16963, 121.33053],[31.17983, 121.32457],[31.18434, 121.32349],[31.19253, 121.31838],[31.192, 121.31111]]
                            ]
                           ];
                    //for(var i=0;i<lines.length;i++){
                        var i=5;
                        var list=lines[i];
                        for(var j=0;j<list.length;j++){
                            var latlngs=list[j];
                            var color=colors[i%colors.length];
                            var polyline = L.polyline(latlngs, {color: color,weight:10}).addTo(this.specialLayer_shanghaizhan_line);
                        }
                          
                    //}
                }else{
                    this.map.addLayer(this.specialLayer_shanghaizhan_line);
                    var map=this.map;
                    var curZoom = map.getZoom();
                    var _layers = this.specialLayer_shanghaizhan_line._layers;
                    var kk = 0 
                    for(var item in _layers){
                        if (kk == 0) {
                            var _1111 = _layers[item];
                            var _latlngs = _1111._latlngs;
                            var index_2 = parseInt((_latlngs.length) / 2);
                            this.map.setView(_latlngs[index_2],curZoom);
                        }
                        kk++;
                    }
                    var flag1 = $('div.mapCtrlItem[func="浦东机场线路"]').eq(0).hasClass('mapCtrlItemSelected');
                    var flag2 = $('div.mapCtrlItem[func="虹桥机场线路"]').eq(0).hasClass('mapCtrlItemSelected');
                    var flag3 = $('div.mapCtrlItem[func="沪杭高铁线路"]').eq(0).hasClass('mapCtrlItemSelected');
                    var flag4 = $('div.mapCtrlItem[func="京沪/沪宁高铁线路"]').eq(0).hasClass('mapCtrlItemSelected');
                    var flag5 = $('div.mapCtrlItem[func="虹桥火车站线路"]').eq(0).hasClass('mapCtrlItemSelected');
                    var flag6 = $('div.mapCtrlItem[func="上海站线路"]').eq(0).hasClass('mapCtrlItemSelected');
                    var flag7 = $('div.mapCtrlItem[func="上海南站线路"]').eq(0).hasClass('mapCtrlItemSelected');

                    if (flag1 && flag2 && flag3 && flag4 && flag5 && flag6 && flag7 ) {
                        $(".ctrlTitle[func='保障线路']").addClass('mapCtrlItemSelected');  
                    }
                }
            }
            break; 
        case '上海南站线路':
            if(this.map.hasLayer(this.specialLayer_shanghainanzhan_line)){
                this.map.removeLayer(this.specialLayer_shanghainanzhan_line);
            }else{
                if(this.specialLayer_shanghainanzhan_line==null){
                    this.specialLayer_shanghainanzhan_line=new L.featureGroup();
                    this.map.addLayer(this.specialLayer_shanghainanzhan_line);
                    var colors=[
                                "#cc0066",
                                "#660099",
                                "#0033ff",
                                "#00cc00"
                               ];
                    var lines=[
                            [//虹桥火车站-国家会展中心
                             [[31.20034, 121.3249],[31.19327, 121.32515],[31.19192, 121.31069]]
                            ],
                            [//虹桥机场-国家会展中心
                             [[31.20057, 121.33364],[31.19372, 121.33182],[31.19168, 121.31043]]
                            ],
                            [//沪杭高铁
                             [[31.20029, 121.32575],[31.19726, 121.32593],[31.18519, 121.32827],[31.17901, 121.32726],[31.17722, 121.32744],[31.11874, 121.36675],[31.11605, 121.36823],[31.10551, 121.37282],[31.09987, 121.37405],[31.09609, 121.37218],[31.07949, 121.35518],[31.07528, 121.34846],[31.05957, 121.31954],[31.05084, 121.3079],[31.04206, 121.29942],[31.02442, 121.28008],[31.00418, 121.26219],[30.99594, 121.25141],[30.98146, 121.22281],[30.97403, 121.21131],[30.94615, 121.18587],[30.94163, 121.18055],[30.93339, 121.1674],[30.91276, 121.11724],[30.88456, 121.06686],[30.86355, 121.02231]]
                            ],
                            [//京沪/沪宁高铁
                             [[31.2025,121.32775],[31.2248, 121.32557],[31.22986, 121.32169],[31.24876, 121.30035],[31.27586, 121.28907],[31.28592, 121.28138],[31.2924, 121.27354],[31.29586, 121.26758],[31.30153, 121.24832]]
                            ],
                            [//浦东机场-国家会展中心
                             [[31.15582, 121.81216],[31.16493, 121.80937],[31.18817, 121.79284],[31.19212, 121.78824],[31.19496, 121.77185],[31.19076, 121.75072],[31.16246, 121.66722],[31.15702, 121.61519],[31.15356, 121.60081],[31.15035, 121.56618],[31.13761, 121.49977],[31.13576, 121.48281],[31.13094, 121.46628],[31.12488, 121.41986],[31.12377, 121.37918],[31.11944, 121.36381],[31.12216, 121.3633],[31.14559, 121.34613],[31.16951, 121.33132],[31.11925, 121.36402],[31.12247, 121.36309],[31.14596, 121.34584],[31.16963, 121.33053],[31.17983, 121.32457],[31.18434, 121.32349],[31.19253, 121.31838],[31.192, 121.31111]]
                            ],
                            [//上海站-国家会展中心
                             [[31.25363, 121.45904],[31.25667, 121.45763],[31.26163, 121.45846],[31.26453, 121.45625],[31.2637, 121.45162],[31.26023, 121.44287],[31.2532, 121.43574],[31.24746, 121.42503],[31.2403, 121.41857],[31.2403, 121.41857],[31.23141, 121.41756],[31.2248, 121.41713],[31.21794, 121.41929],[31.21424, 121.41835],[31.2122, 121.41842],[31.20824, 121.4131],[31.20534, 121.40369],[31.19799, 121.39111],[31.18916, 121.36481],[31.17884, 121.35382],[31.17606, 121.34871],[31.16963, 121.33053],[31.17983, 121.32457],[31.18434, 121.32349],[31.19253, 121.31838],[31.192, 121.31111]]
                            ],
                            [//上海南站-国家会展中心
                             [[31.15929, 121.43089],[31.12451, 121.39507],[31.12377, 121.38026],[31.11925, 121.36402],[31.12247, 121.36309],[31.14596, 121.34584],[31.16963, 121.33053],[31.17983, 121.32457],[31.18434, 121.32349],[31.19253, 121.31838],[31.192, 121.31111]]
                            ]
                           ];
                    //for(var i=0;i<lines.length;i++){
                        var i=6;
                        var list=lines[i];
                        for(var j=0;j<list.length;j++){
                            var latlngs=list[j];
                            var color=colors[i%colors.length];
                            var polyline = L.polyline(latlngs, {color: color,weight:10}).addTo(this.specialLayer_shanghainanzhan_line);
                        }
                        
                          
                    //}
                }else{
                    this.map.addLayer(this.specialLayer_shanghainanzhan_line);
                    var map=this.map;
                    var curZoom = map.getZoom();
                    var _layers = this.specialLayer_shanghainanzhan_line._layers;
                    var kk = 0 
                    for(var item in _layers){
                        if (kk == 0) {
                            var _1111 = _layers[item];
                            var _latlngs = _1111._latlngs;
                            var index_2 = parseInt((_latlngs.length) / 2);
                            this.map.setView(_latlngs[index_2],curZoom);
                        }
                        kk++;
                    }
                    var flag1 = $('div.mapCtrlItem[func="浦东机场线路"]').eq(0).hasClass('mapCtrlItemSelected');
                    var flag2 = $('div.mapCtrlItem[func="虹桥机场线路"]').eq(0).hasClass('mapCtrlItemSelected');
                    var flag3 = $('div.mapCtrlItem[func="沪杭高铁线路"]').eq(0).hasClass('mapCtrlItemSelected');
                    var flag4 = $('div.mapCtrlItem[func="京沪/沪宁高铁线路"]').eq(0).hasClass('mapCtrlItemSelected');
                    var flag5 = $('div.mapCtrlItem[func="虹桥火车站线路"]').eq(0).hasClass('mapCtrlItemSelected');
                    var flag6 = $('div.mapCtrlItem[func="上海站线路"]').eq(0).hasClass('mapCtrlItemSelected');
                    var flag7 = $('div.mapCtrlItem[func="上海南站线路"]').eq(0).hasClass('mapCtrlItemSelected');

                    if (flag1 && flag2 && flag3 && flag4 && flag5 && flag6 && flag7 ) {
                        $(".ctrlTitle[func='保障线路']").addClass('mapCtrlItemSelected');  
                    }
                }
            }
            break;                               
	}
};
CIIE.Map.prototype.addCellsToLayer=function(data,layer){
	if(data==null||layer==null) return;
	 for(var i= 0, len = data.length; i<len;++i){
         if(data[i].lat && data[i].lon){
             var type = data[i].cell_nt;
             var latHeatMap = data[i].lat,        
             lngHeatMap = data[i].lon;
             var bdPoint = this.wgs84tobd09(lngHeatMap,latHeatMap);
             var point = bdPoint.reverse();
             if(point.length !== 2) continue;
             var lac = data[i].lac;
             var ci = data[i].ci;
             var lacci = lac + ':' + ci;
             var name = data[i].cell_name;
             var lte_type = data[i].lte_type;
             var station_type = data[i].station_type;
             var hot_id = data[i].hot_id;
             var cellType1 = data[i].cell_type;
             if(!cellType1){
                 cellType1 = '街道站';
             }


            var lg_subtype = ""; 
            if(data[i].lg_subtype === null || data[i].lg_subtype === '-') {
                lg_subtype = "D";
            }else{
                lg_subtype = data[i].lg_subtype;
            };
            var hori_direc_angle = 0;
            if(data[i].hori_direc_angle === null || data[i].hori_direc_angle === '-') {
                hori_direc_angle = 0;
            }else{
                hori_direc_angle = parseFloat(data[i].hori_direc_angle);
            };
            // if(true) {
            //     hori_direc_angle = Math.random()*360;
            // };

            var startAngle = parseFloat(hori_direc_angle) - parseFloat(20);
            var stopAngle = parseFloat(hori_direc_angle) + parseFloat(20);





             var cellType = cellType1.trim();
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
                 cellType: cellType
             };
             var lat=point[0];
             var lng=point[1];
             //var urlNew='../maptip/deviceDetail.jsp'
             var urlNew='../maptip/deviceDetailNew.jsp'
             			+'?cellname='+encodeURIComponent(name)
             			+'&nettype='+encodeURIComponent(type)
             			+'&lacci='+encodeURIComponent(lacci)
             var heatPopup4G = L.popup({maxWidth:1100,maxHeight:849,offset:L.point(0, 5),autoPanPaddingTopLeft:L.point(-30, 240),closeButton:true, closeOnClick:false})
                 .setLatLng([lat,lng]);
             heatPopup4G.setContent('<iframe allowtransparency="true" width="1001px" ondblclick="alert();" frameborder="no" height="840px" src="'+urlNew+'"></iframe>');
             
             var marker=null;
             // if(type === '5G'){
             // 	marker=L.marker([lat,lng],{title: name, icon: this.marker5G, keepInView:false}).bindPopup(heatPopup4G).addTo(layer);
             // }else if(type === '4G'){
             // 	if (lte_type === "FDD") {
             // 		marker=L.marker([lat,lng],{title: name, icon: this.marker4G, keepInView:false}).bindPopup(heatPopup4G).addTo(layer);
             //     }else if (lte_type === "TDD") {
             //     	marker=L.marker([lat,lng],{title: name, icon: this.marker4G, keepInView:false}).bindPopup(heatPopup4G).addTo(layer);
             //     }
             // }else if(type === '2G'){
             // 	marker=L.marker([lat,lng],{title: name, icon: this.marker2G, keepInView:false}).bindPopup(heatPopup4G).addTo(layer);
             // }




             //添加扇形
            // var circle = null;
            // if (station_type === '宏站'|| station_type === '街道站') {
            //     if (lg_subtype == "TDD-D") {
            //         var radius = 125;var color = '#408b22';
            //         //marker=L.marker([lat,lng],{title: name, icon: this.markertestPng, keepInView:false}).addTo(this.shangxingLayerTDD_D);
            //         circle = L.circle([lat,lng], radius, {fill: true,weight:1,className:name,fillColor: color,fillOpacity: 0.5,color: color,opacity: 0.9,startAngle: startAngle,stopAngle: stopAngle,pointerEvents:"auto"}).bindPopup(heatPopup4G).addTo(this.shangxingLayerTDD_D);
            //     }else if (lg_subtype == "TDD-E") {
            //         var radius = 110;var color = '#5ba931';
            //         //marker=L.marker([lat,lng],{title: name, icon: this.markertestPng, keepInView:false}).addTo(this.shangxingLayerTDD_E);
            //         circle = L.circle([lat,lng], radius, {fill: true,weight:1,className:name,fillColor: color,fillOpacity: 0.5,color: color,opacity: 0.9,startAngle: startAngle,stopAngle: stopAngle,pointerEvents:"auto"}).bindPopup(heatPopup4G).addTo(this.shangxingLayerTDD_E);
            //     }else if (lg_subtype == "TDD-F") {
            //         var radius = 95;var color = '#a8cf42';
            //         //marker=L.marker([lat,lng],{title: name, icon: this.markertestPng, keepInView:false}).addTo(this.shangxingLayerTDD_F);
            //         circle = L.circle([lat,lng], radius, {fill: true,weight:1,className:name,fillColor: color,fillOpacity: 0.5,color: color,opacity: 0.9,startAngle: startAngle,stopAngle: stopAngle,pointerEvents:"auto"}).bindPopup(heatPopup4G).addTo(this.shangxingLayerTDD_F);
            //     }else if (lg_subtype == "FDD-S") {
            //         var radius = 80;var color = '#d7e6af';
            //         //marker=L.marker([lat,lng],{title: name, icon: this.markertestPng, keepInView:false}).addTo(this.shangxingLayerFDD_S);
            //         circle = L.circle([lat,lng], radius, {fill: true,weight:1,className:name,fillColor: color,fillOpacity: 0.5,color: color,opacity: 0.9,startAngle: startAngle,stopAngle: stopAngle,pointerEvents:"auto"}).bindPopup(heatPopup4G).addTo(this.shangxingLayerFDD_S);
            //     }else if (lg_subtype == "900M") {
            //         var radius = 65;var color = '#3333cc';
            //         circle = L.circle([lat,lng], radius, {fill: true,weight:1,className:name,fillColor: color,fillOpacity: 0.5,color: color,opacity: 0.9,startAngle: startAngle,stopAngle: stopAngle,pointerEvents:"auto"}).bindPopup(heatPopup4G).addTo(this.shangxingLayer900M);
            //         //marker=L.marker([lat,lng],{title: name, icon: this.markertestPng, keepInView:false}).addTo(this.shangxingLayer900M);
            //     }else if (lg_subtype == "1800M") {
            //         var radius = 50;var color = '#3399cc';
            //         //marker=L.marker([lat,lng],{title: name, icon: this.markertestPng, keepInView:false}).addTo(this.shangxingLayer1800M);
            //         circle = L.circle([lat,lng], radius, {fill: true,weight:1,className:name,fillColor: color,fillOpacity: 0.5,color: color,opacity: 0.9,startAngle: startAngle,stopAngle: stopAngle,pointerEvents:"auto"}).bindPopup(heatPopup4G).addTo(this.shangxingLayer1800M);
            //     }; 
            // }







         }else{
             continue;
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
	//$('#'+this.divId).append(maintainCount);
	
	
	var infoWin='<div id="infobroadcast" class="infobroadcast" style="display:none;">'
					+'<div class="horizontalRow fontImportantInfo infobroadcasttitle" style="width:100%;">'
						+'<div class="icon-speaker"></div>'
						+'<div >信息播报&nbsp;:&nbsp;&nbsp;</div>'
						+'<div class="fontUnitTime">应到&nbsp;:&nbsp;&nbsp;</div>'
						+'<div class="ciiekpistyle" >139</div>'
						+'<div class="fontUnitTime">人</div>'
						+'<div class="fontUnitTime">&nbsp;&nbsp;|&nbsp;&nbsp;</div>'
						+'<div class="fontUnitTime">实到&nbsp;:&nbsp;&nbsp;</div>'
						+'<div class="ciiekpistyle" >132</div>'
						+'<div class="fontUnitTime">人</div>'
						+'<div style="clear:both;"></div>'
					+'</div>'
					+'<div style="clear:both;"></div>'
					+'<div id="infobroadcastcontentdiv" class="fontSubInfo" style="width:100%;height:476px;overflow:auto;">'
						// +'<div class="infobroadcastmessage">'
						// 	+'消息公告(1小时前)：<br>保障现场应急车、指挥车、发电车、无人机已全部预开启，业务测试正常'
						// +'</div>'
						// +'<div class="infobroadcastmessage">'
						// 	+'巡检消息(1小时前)：<br>当前保障区域设备告警0个，性能越限0个，高话务小区1个'
						// +'</div>'
						// +'<div class="infobroadcastmessage">'
						// 	+'巡检消息(2小时前)：<br>当前保障区域设备告警0个，性能越限0个，高话务小区0个'
						// +'</div>'
						// +'<div class="infobroadcastmessage">'
						// 	+'巡检消息(3小时前)：<br>当前保障区域设备告警0个，性能越限1个，高话务小区1个，已派发性能越限工单'
						// +'</div>'
						// +'<div class="infobroadcastmessage">'
						// 	+'故障恢复消息（7月24日）：<br>中国博览会会展中心A0馆NL9W_140 于22:57:08故障恢复。'
						// +'</div>'
						// +'<div class="infobroadcastmessage">'
						// 	+'故障消息（7月24日）：<br>中国博览会会展中心A0馆NL9W_140 于22:23:47发生（告警标题），目前已派单SH-051-20180724-08712。'
						// +'</div>'
						// +'<div class="infobroadcastmessage">'
						// 	+'故障恢复消息（7月19日）：<br>中国博览会会展中心-街道站6NL1H_54 于01:00:12故障恢复。'
						// +'</div>'
						// +'<div class="infobroadcastmessage">'
						// 	+'故障消息（7月18日）：<br>中国博览会会展中心-街道站6NL1H_54 于23:00:05发生（告警标题），目前已派单SH-051-20180718-07690。'
						// +'</div>'
					+'</div>'
				+'</div>';
	$('#'+this.divId).append(infoWin);
	
	var cellCount='<div id="cellCount" style="display:none;position:absolute;width:400px;height:90px;top:140px;right:30px;"><div class="map-info-win-bg0"></div>'
		+'<div class="map-info-win-content" style="font-size:1.6em;height:100%;text-align:left;padding:5px 5px 5px 15px;">'
		+'<div><span>2G小区数:</span>&nbsp;&nbsp;<span id="cellCount_2g" style="color:#fafe46;display:inline-block;width:55px;">--</span><span style="color:#0c076d;">&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;</span><span>2G退服小区数:</span>&nbsp;&nbsp;<span id="cellCount_2g_retire" style="color:#fafe46;">0</span></div>'
		+'<div><span>4G小区数:</span>&nbsp;&nbsp;<span id="cellCount_4g" style="color:#fafe46;display:inline-block;width:55px;">--</span><span style="color:#0c076d;">&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;</span><span>4G退服小区数:</span>&nbsp;&nbsp;<span id="cellCount_4g_retire" style="color:#fafe46;">0</span></div>'
		+'</div>'
		+'</div>';
	$('#'+this.divId).append(cellCount);
	
	var search='<div id="cellCountSearch" style="position:absolute;width:350px;height:70px;top:140px;right:107px;display:none"><div class="map-info-win-bg0"></div>'
		+'<div class="map-info-win-content" style="font-size:1.6em;height:100%;text-align:left;padding:5px 5px 5px 15px;">'
			+'<input id="mapSearch" style="color:#000000;font-size:18px;width:95%;border-radius:10px;height:45px;" placeholder="基站名称、小区名称、LAC:CI、应急资源名称"/>'
		+'</div>'
		+'</div>';
    search += '<div id="searchMagnifyingGlass" title="搜索" style="position:absolute;width:70px;height:70px;top:145px;right:30px;cursor:pointer"><div class="iconMagnifyingGlass"></div>'    
	$('#'+this.divId).append(search);
	
	$('#mapSearch').on('keypress',this.startSearch.bind(this));
	 
    $('#cellCount').on('click',this.resetCenter.bind(this));

	$('#searchMagnifyingGlass').on('click',this.showCellCountSearch.bind(this));
	
	var infoWinList='<div id="infoWinList" style="width:42em;position:absolute;top:155px;left:10px;"></div>';
	
	$('#'+this.divId).append(infoWinList);
	
	var parentDom=$('#infoWinList')[0];
	
	this.infoWin00=new CIIE.MapInfoWin('咪咕视频',parentDom,this.infoWinClosed.bind(this));
	this.infoWin0=new CIIE.MapInfoWin('应用小类业务量TOP5',parentDom,this.infoWinClosed.bind(this));
	this.infoWin1=new CIIE.MapInfoWin('高流量小区TOP5',parentDom,this.infoWinClosed.bind(this));
	this.infoWin2=new CIIE.MapInfoWin('低LTE无线接通率TOP5',parentDom,this.infoWinClosed.bind(this));
	this.infoWin3=new CIIE.MapInfoWin('低GSM无线接通率TOP5',parentDom,this.infoWinClosed.bind(this));
    this.infoWin4=new CIIE.MapInfoWin('WiFi运行情况',parentDom,this.infoWinClosed.bind(this));
    this.infoWin5=new CIIE.MapInfoWin('高LTE话务量小区TOP5',parentDom,this.infoWinClosed.bind(this));
    this.infoWin6=new CIIE.MapInfoWin('高GSM话务量小区TOP5',parentDom,this.infoWinClosed.bind(this));
    this.infoWin7=new CIIE.MapInfoWin('高LTE无线接通率TOP5',parentDom,this.infoWinClosed.bind(this));
	this.infoWin8=new CIIE.MapInfoWin('高GSM无线接通率TOP5',parentDom,this.infoWinClosed.bind(this));
	
	
	this.setDivMovable($('#'+this.infoWin00.winId)[0]);
	this.setDivMovable($('#'+this.infoWin0.winId)[0]);
	this.setDivMovable($('#'+this.infoWin1.winId)[0]);
	this.setDivMovable($('#'+this.infoWin2.winId)[0]);
	this.setDivMovable($('#'+this.infoWin3.winId)[0]);
    this.setDivMovable($('#'+this.infoWin4.winId)[0]);
    this.setDivMovable($('#'+this.infoWin5.winId)[0]);
    this.setDivMovable($('#'+this.infoWin6.winId)[0]);
    this.setDivMovable($('#'+this.infoWin7.winId)[0]);
	this.setDivMovable($('#'+this.infoWin8.winId)[0]);
	
	setInterval(this.updateInfoWin.bind(this),5*60*1000);
	
	
};


CIIE.Map.prototype.showCellCountSearch=function(){
    var disFlag = $("#cellCountSearch").css('display');
    console.log(disFlag);
    if (disFlag == "none"){
        $("#cellCountSearch").css('display', '');
    }else{
        $("#cellCountSearch").css('display', 'none');
    }
    
};
CIIE.Map.prototype.startSearch=function(e){
	if(e.keyCode==13){
		var list=this.cellMarkerCache;
		var target=$('#mapSearch').val();
		for(var i=0;i<list.length;i++){
			var marker=list[i];
			var info=marker.info;
			if(info.name==target||info.lacci==target){
//				$('.leaflet-marker-icon').removeClass('mapMarkerHighlight');
//				$('.leaflet-marker-icon[title='+info.name+']').addClass('mapMarkerHighlight');
//				this.setView(info.lat,info.lng);
                this.locateCellFirstAddCell(info.lacci,info.name,info.lat,info.lng,true);  //定位前先加小区点,防止右屏联动,地图上没有
				//this.locateCell(info.lacci,info.name,info.lat,info.lng);
				break;
			}else{
//				try{
//					marker._icon.className=marker._icon.className.replace(' mapMarkerHighlight','');
//				}catch(e){}
				
			}
			
		}
	}
};
CIIE.Map.prototype.updateInfoWin=function(){
	//this.updateInfoMigu();
    this.updateInfoTopFlowCell();
    this.updateInfoTopLowConnLteCell();
    this.updateInfoTopApp();
    this.updateInfoTopLowConnGsmCell();
    this.updateInfoWiFi();

    this.updateInfoTopHighErlLteCell();
    this.updateInfoTopHighErlGsmCell();
    this.updateInfoTopHighConnLteCell();
    this.updateInfoTopHighConnGsmCell();


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
	case 'WiFi运行情况':
		this.infoWin4.hide();
		break;
    case '高LTE话务量小区TOP5':
        this.infoWin5.hide();
        break;
    case '高GSM话务量小区TOP5':
        this.infoWin6.hide();
        break;    
    case '高LTE无线接通率TOP5':
        this.infoWin7.hide();
        break;
    case '高GSM无线接通率TOP5':
        this.infoWin8.hide();
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
			$('#'+this.infoWin0.winId).height(275);
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
	this.cdm.getCellKpiTopN({
		hotspot:this.hotspot,
		sidx:'s_083',
		sord:'desc',
		topN:5
	},function(result){
		var table=this.getInfoRankTableIgnoreAllZero(result,'s_083','流量','MB',1/1024,2,'cell_name');
		if(table!=''){
			this.infoWin1.setContentHtml(table);
			$('#'+this.infoWin1.winId).height(275);
		}
	}.bind(this));
};


CIIE.Map.prototype.updateInfoTopLowConnLteCell=function(){
	this.cdm.getCellKpiTopN({
		netType:'lte',
		hotspot:this.hotspot,
		sidx:'lte_wireless_conn_ratio',
		sord:'asc',
		topN:5
	},function(result){
		var table=this.getInfoRankTableIgnoreAllZero(result,'lte_wireless_conn_ratio','无线接通率','%',1,2,'cell_name');
		if(table!=''){
			this.infoWin2.setContentHtml(table);
			$('#'+this.infoWin2.winId).height(275);
		}
	}.bind(this));
};


CIIE.Map.prototype.updateInfoTopLowConnGsmCell=function(){
	
	this.cdm.getCellKpiTopN({
		netType:'gsm',
		hotspot:this.hotspot,
		sidx:'gsm_wireless_conn_ratio',
		sord:'asc',
		topN:5
	},function(result){
		var table=this.getInfoRankTableIgnoreAllZero(result,'gsm_wireless_conn_ratio','无线接通率','%',1,2,'cell_name');
		if(table!=''){
			this.infoWin3.setContentHtml(table);
			$('#'+this.infoWin3.winId).height(275);
		}
	}.bind(this));
};


CIIE.Map.prototype.updateInfoTopHighErlLteCell=function(){
    this.cdm.getCellKpiTopN({
        netType:'lte',
        hotspot:this.hotspot,
        sidx:'ltehwl',
        sord:'desc',
        topN:5
    },function(result){
        var table=this.getInfoRankTableIgnoreAllZero(result,'ltehwl','话务量','Erl',1,2,'cell_name');
        if(table!=''){
            this.infoWin5.setContentHtml(table);
            $('#'+this.infoWin5.winId).height(275);
        }
    }.bind(this));
};

CIIE.Map.prototype.updateInfoTopHighErlGsmCell=function(){
    this.cdm.getCellKpiTopN({
        netType:'gsm',
        hotspot:this.hotspot,
        sidx:'gsmhwl',
        sord:'desc',
        topN:5
    },function(result){
        var table=this.getInfoRankTableIgnoreAllZero(result,'gsmhwl','话务量','Erl',1,2,'cell_name');
        if(table!=''){
            this.infoWin6.setContentHtml(table);
            $('#'+this.infoWin6.winId).height(275);
        }
    }.bind(this));
};

CIIE.Map.prototype.updateInfoTopHighConnLteCell=function(){
    this.cdm.getCellKpiTopN({
        netType:'lte',
        hotspot:this.hotspot,
        sidx:'lte_wireless_conn_ratio',
        sord:'desc',
        topN:5
    },function(result){
        var table=this.getInfoRankTableIgnoreAllZero(result,'lte_wireless_conn_ratio','无线接通率','%',1,2,'cell_name');
        if(table!=''){
            this.infoWin7.setContentHtml(table);
            $('#'+this.infoWin7.winId).height(275);
        }
    }.bind(this));
};

CIIE.Map.prototype.updateInfoTopHighConnGsmCell=function(){
    
    this.cdm.getCellKpiTopN({
        netType:'gsm',
        hotspot:this.hotspot,
        sidx:'gsm_wireless_conn_ratio',
        sord:'desc',
        topN:5
    },function(result){
        var table=this.getInfoRankTableIgnoreAllZero(result,'gsm_wireless_conn_ratio','无线接通率','%',1,2,'cell_name');
        if(table!=''){
            this.infoWin8.setContentHtml(table);
            $('#'+this.infoWin8.winId).height(275);
        }
    }.bind(this));
};


//
CIIE.Map.prototype.updateInfoWiFi=function(){
	
	this.cdm.getWiFi({},function(result){
		var list=result.data;
		var html='<table class="mapInfoTable">';
		html+='<tr>'
				+'<td class="mapInfoTableHeader" style="width:16%;">场馆</td>'
				+'<td style="width:16%;" class="mapInfoTableHeader">馆层</td>'
				+'<td style="width:20%;" class="mapInfoTableHeader">展览名称</td>'
				+'<td style="width:16%;" class="mapInfoTableHeader">用户数(人)</td>'
				+'<td style="width:16%;" class="mapInfoTableHeader">上行流量(GB)</td>'
				+'<td style="width:16%;" class="mapInfoTableHeader">下行流量(GB)</td>'
			+'</tr>';
		for(var i=0;i<list.length;i++){
			var record=list[i];
			var scene_id=record['scene_id'];
            scene_id = scene_id.replace("J-","");
			html+='<tr>'
				+'<td style="width:16%;white-space:no-wrap;">'+scene_id+'</td>'
				+'<td>'+record.building_level+'</td>'
				+'<td style="width:20%;white-space:no-wrap;">'+record.scene_name+'</td>'
				+'<td>'+record.wifiusers+'</td>'
				+'<td>'+record.wifiups+'</td>'
				+'<td>'+record.wifidowns+'</td>'
				+'</tr>';
		}
		html+='</table>';
		$('#'+this.infoWin4.winId).height(385);
		$('#'+this.infoWin4.winId).width(720);
		if(html!=''){
			this.infoWin4.setContentHtml(html);
		}
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
		html+='<tr><td style="width:70%;white-space:no-wrap;">'+cellName+'</td><td>'+value+'</td></tr>';
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
		html+='<tr><td style="width:70%;white-space:no-wrap;">'+cellName+'</td><td>'+value+'</td></tr>';
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
	if(list.length==0||list[0]['总流量']==0){
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
CIIE.Map.prototype.getHotspotLatLon=function(_hotspot){
	var location={lat:31.195766,lon:121.308613};
	if(this.locationMap[_hotspot]!=null){
		location=this.locationMap[_hotspot];
	}
	return location;
};

CIIE.Map.prototype.updatePercent=function(_hotspot){
      

   
    var totalPersonNum = $("#quickLocateItems").find('div[name="'+_hotspot+'"]').find('div.horizontalRow').eq(0).find('div.QLCKPI').eq(0).find('div').eq(2).text();
    var _2gPersonNum = $("#quickLocateItems").find('div[name="'+_hotspot+'"]').find('div.horizontalRow').eq(1).find('div.QLCKPI').eq(0).find('div').eq(2).text();
    var _4gPersonNum = $("#quickLocateItems").find('div[name="'+_hotspot+'"]').find('div.horizontalRow').eq(1).find('div.QLCKPI').eq(1).find('div').eq(2).text();
    
    //随机测试数据

    var leftPercent1  = (parseInt(totalPersonNum) / (parseInt(_2gPersonNum) + parseInt(_4gPersonNum))).toFixed(2) || 0;
    
    // while(isNaN(leftPercent1)){
    //     totalPersonNum = $("#quickLocateItems").find('div[name="'+_hotspot+'"]').find('div.horizontalRow').eq(0).find('div.QLCKPI').eq(0).find('div').eq(2).text();
    //     _2gPersonNum = $("#quickLocateItems").find('div[name="'+_hotspot+'"]').find('div.horizontalRow').eq(1).find('div.QLCKPI').eq(0).find('div').eq(2).text();
    //     _4gPersonNum = $("#quickLocateItems").find('div[name="'+_hotspot+'"]').find('div.horizontalRow').eq(1).find('div.QLCKPI').eq(1).find('div').eq(2).text();

    //     leftPercent1  = (parseInt(totalPersonNum) / (parseInt(_2gPersonNum) + parseInt(_4gPersonNum))).toFixed(2) || 0;
    // }

    console.log("totalPersonNum:"+totalPersonNum);
    console.log("_2gPersonNum:"+_2gPersonNum);
    console.log("_4gPersonNum:"+_4gPersonNum);

    console.log("leftPercent1:"+leftPercent1);



    //var leftPercent2  = (Math.random() * 100).toFixed(2) || 0;
    var leftPercent2  = 92;
    


    var url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-cfg-scene-density';
    $.ajax({
        url: url,
        type: 'get',         //数据发送方式
        dataType: 'text',     //接受数据格式
        //contentType: "application/json",
        //accessType: "application/json",
        //timeout:5000,
        data:{},
        beforeSend: function(XMLHttpRequest){
        },
        complete: function(XMLHttpRequest,textStatus){
        }
    }).done(function(resultStr){
        //console.log(result) 
        var result = eval('(' + resultStr + ')');
        var data = result.data; 
        for (var i = 0; i < data.length; i++) {
            var currObj = data[i];
            if(_hotspot.indexOf(currObj.scene_name) !=-1){

                var excellentsmall_person = 0;
                var excellentbig_person = 30;
                var goodsmall_person = 30;
                var goodbig_person = 40;
                var mediumsmall_person = 40;
                var mediumbig_person = 50;
                var poorsmall_person = 50;
                var poorbig_person = 200;


               var cfg_content = eval('(' + currObj.cfg_content + ')');
               if (cfg_content != null) {
                   excellentsmall_person = cfg_content.person.excellent[0]==""?0:cfg_content.person.excellent[0];
                   excellentbig_person = cfg_content.person.excellent[1];
                   goodsmall_person = cfg_content.person.good[0];
                   goodbig_person = cfg_content.person.good[1];
                   mediumsmall_person = cfg_content.person.medium[0];
                   mediumbig_person = cfg_content.person.medium[1];
                   poorsmall_person = cfg_content.person.poor[0];
                   poorbig_person = cfg_content.person.poor[1]==""?200:cfg_content.person.poor[1];
               };




               var qlcTypeClass1 = "QLCNice";
               var realPercent = 95;
               if (leftPercent1 > 100) {leftPercent1 = 100};
               if (poorsmall_person <= leftPercent1 && leftPercent1<poorbig_person) {
                   qlcTypeClass1 = "QLCBad";      //差
                   realPercent = 30;
               };
               if (mediumsmall_person<=leftPercent1 && leftPercent1<mediumbig_person) {
                   qlcTypeClass1 = "QLCGeneral";   //一般
                   realPercent = 60
               };
               if (goodsmall_person<=leftPercent1 &&leftPercent1<goodbig_person) {
                   qlcTypeClass1 = "QLCOk";      //良
                   realPercent = 80;
               };
               if (excellentsmall_person<=leftPercent1 && leftPercent1<excellentbig_person) {
                   qlcTypeClass1 = "QLCNice";   //优
                   realPercent = 95;
               };


               var qlcTypeClass2 = "QLCBad";
               if (leftPercent2<30) {
                   qlcTypeClass2 = "QLCBad";
               };
               if (30<leftPercent2 && leftPercent2<70) {
                   qlcTypeClass2 = "QLCGeneral";
               };
               if (70<leftPercent2 && leftPercent2<90) {
                   qlcTypeClass2 = "QLCOk";
               };
               if (90<leftPercent2) {
                   qlcTypeClass2 = "QLCNice";
               };


               if (this.hotspot.indexOf(',') > -1) {return;}; 
               var ql=$('.QLCONTENT[name='+this.hotspot+']');

               //var realPercent = (parseInt(poorbig_person) - parseInt(leftPercent1))/parseInt(poorbig_person) *100;

               console.log("realPercent:"+realPercent);
               
               if(this.hotspot=="J-国家会展中心"){
            	   ql.find('div.QLCProgress:eq(0)').find('div').css('left', "50%");
                   ql.find('div.QLCProgress:eq(0)').parent().next().removeClass().addClass('QLCGeneral');

                   ql.find('div.QLCProgress:eq(1)').find('div').css('left', "30%");
                   ql.find('div.QLCProgress:eq(1)').parent().next().removeClass().addClass('QLCBad');
               }else{
            	   ql.find('div.QLCProgress:eq(0)').find('div').css('left', realPercent+"%");
                   ql.find('div.QLCProgress:eq(0)').parent().next().removeClass().addClass(qlcTypeClass1);

                   ql.find('div.QLCProgress:eq(1)').find('div').css('left', leftPercent2+"%");
                   ql.find('div.QLCProgress:eq(1)').parent().next().removeClass().addClass(qlcTypeClass2);
               }
               



            }
        }



    }.bind(this));







    


}

CIIE.Map.prototype.updateHotspot=function(_hotspot,ignoreLocate){
	var location=this.getHotspotLatLon(_hotspot);
	this.hotspotInfo={};
	this.hotspotInfo.lat=location.lat;
	this.hotspotInfo.lon=location.lon;
	this.hotspotInfo.hotCellInName=_hotspot;
	this.hotspot=_hotspot;
	this.initLayers();
	if(ignoreLocate!=true){
        if (FROMMODEL != 'ciie') {
            this.setView(location.lat,location.lon,14);
        }else{
            this.setView(location.lat,location.lon,17);
        }
	}
    this.getCells();
	
	this.updateInfoWin();
	
	
};

CIIE.Map.prototype.resetCenter=function(){
	
//	var lon=this.hotspotInfo.lon*1- 0.0045;
//	var lat=this.hotspotInfo.lat*1+0.0025;
//	var bdPoint = this.wgs84tobd09(lon,lat);
//	var point = bdPoint.reverse();
//	this.setView(point[0],point[1]);
	
	this.setView(this.hotspotInfo.lat,this.hotspotInfo.lon);
};
CIIE.Map.prototype.setViewConvert=function(lat,lon){
	var bdPoint = this.wgs84tobd09(lon*1,lat*1);
	var point = bdPoint.reverse();
	this.setView(point[0],point[1]);
};
CIIE.Map.prototype.setView=function(lat,lon,degree){
    if (degree == undefined) {
        this.map.setView([lat,lon], 17);
        this.radiusHeatMap = 0.001;
        if(this.ciieImageAdded==null){
            this.addCiieImage();
        }
    }else{
        this.map.setView([lat,lon], degree);
        this.radiusHeatMap = 0.001;
        if(this.ciieImageAdded==null){
            this.addCiieImage();
        }

    }
};
CIIE.Map.prototype.locateCell=function(lacci,cellName,lat,lon,donotReset){
	this.setView(lat,lon);
	
	if(this.map.hasLayer(this.markersLayerPin)){
		//if(donotReset!=true){
			this.map.removeLayer(this.markersLayerPin);
            this.markersLayerPin = new L.featureGroup();
			this.map.addLayer(this.markersLayerPin);
		//}
	}else{
		this.map.addLayer(this.markersLayerPin);
	}
	
	 
	if(lacci!=null){
        //var urlNew='../maptip/deviceDetail.jsp'
		var urlNew='../maptip/deviceDetailNew.jsp'
			+'?cellname='+encodeURIComponent(name)
			+'&lacci='+encodeURIComponent(lacci);
		
		var heatPopup4G = L.popup({maxWidth:1100,maxHeight:849,offset:L.point(0, 5),autoPanPaddingTopLeft:L.point(-30, 240),closeButton:true, closeOnClick:false})
	     .setLatLng([lat,lon]);
		heatPopup4G.setContent('<iframe allowtransparency="true" width="1001px" ondblclick="alert();" frameborder="no" height="840px" src="'+urlNew+'"></iframe>');
		L.marker([lat,lon],{title: cellName, icon: this.marker_pin, keepInView:false}).bindPopup(heatPopup4G).addTo(this.markersLayerPin);
	}else{
		L.marker([lat,lon],{title: cellName, icon: this.marker_pin, keepInView:false}).addTo(this.markersLayerPin);
	}
    
	var list=this.cellMarkerCache;
//	//收起所有
//	for(i=0;i<list.length;i++){
//		var marker=list[i];
//		try{
//			if(marker.options.title==cellName){
//				marker._icon.className=marker._icon.className.replace(' mapMarkerHighlight','')+' mapMarkerHighlight';
////				var content=marker._popup.getContent();
////				var popup = L.popup({maxWidth:800,maxHeight:800,offset:L.point(0, 5),closeButton:true, closeOnClick:false})
////                .setLatLng([lat,lng]);
////				popup.setContent(content);
//                 break;
//			}else{
//				marker._icon.className=marker._icon.className.replace(' mapMarkerHighlight','');
//			}
//		}catch(e){
//			//console.log(marker.options.title+' mapMarkerHighlight error');
//		}
//	}
};
CIIE.Map.prototype.locateCellFirstAddCell=function(lacci,name_,lat_,lng_,iswgs84tobd09){
    if(this.map.hasLayer(this.markersLayerSearchPre)){
        //if(donotReset!=true){
            this.map.removeLayer(this.markersLayerSearchPre);

            this.markersLayerSearchPre = new L.featureGroup();
            this.map.addLayer(this.markersLayerSearchPre);
        //}
    }else{
        this.map.addLayer(this.markersLayerSearchPre);
    }


    //获取数据
    //this.cdm=LSMScreen.CacheDataManager.getInstance();
    this.cdm.getCellKpiTopN({
        ids:lacci
    },function(result){
        var list=result;
        for(var i=0;i<list.length;i++){
            var record=list[i];
            var cell_name=record.cell_name;
            var lat=record.lat;
            var lon=record.lon;
            var cell_nt=record.cell_nt ==null?"gsm":record.cell_nt;  //小区类型,以供判断指标显示情况(2G,4G不同)
           
            if(iswgs84tobd09){
                var bdPoint = this.wgs84tobd09(lon,lat); 
                var point = bdPoint.reverse();
                lat = point[0];
                lon = point[1];
            }
            var type = '4G';
            if (cell_nt =="gsm") {type = '2G';};



            var hotspot=this.hotspot;
            //var urlNew='../maptip/deviceDetail.jsp?hotspot='+encodeURIComponent(hotspot)
            var urlNew='../maptip/deviceDetailNew.jsp?hotspot='+encodeURIComponent(hotspot)
                        +'&cellname='+encodeURIComponent(cell_name)
                        +'&nettype='+encodeURIComponent(cell_nt)
                        +'&lacci='+encodeURIComponent(lacci)
            var heatPopup4G = L.popup({maxWidth:1100,maxHeight:849,offset:L.point(0, 5),autoPanPaddingTopLeft:L.point(-30, 240),closeButton:true, closeOnClick:false})
                .setLatLng([lat,lon]);
            heatPopup4G.setContent('<iframe allowtransparency="true" width="1001px" ondblclick="alert();" frameborder="no" height="840px" src="'+urlNew+'"></iframe>');
            
            var marker=null;

            if(type === '4G'){
                marker=L.marker([lat,lon],{title: cell_name, icon: this.marker4G_l, keepInView:false}).bindPopup(heatPopup4G).addTo(this.markersLayerSearchPre);
            }else if(type === '2G'){
                marker=L.marker([lat,lon],{title: cell_name, icon: this.marker2G_l, keepInView:false}).bindPopup(heatPopup4G).addTo(this.markersLayerSearchPre);
            };
            
        };
        //this.map.addLayer(this.markersLayerSearchPre);
        this.locateCell(lacci,name_,lat_,lng_);
        
    }.bind(this));


};
CIIE.Map.prototype.addPolygon = function(){

    //多边形
    var optionStyle = {
        color:"#2196f3",
        fillColor:'#2196f3',
        weight:5,
        opacity:0.3,
        fillOpacity:0.2
    };  
    //国家会展中心
    L.polygon([
          [31.198878,121.293953],
          [31.182946,121.302137],
          [31.189835,121.31871],
          [31.204862,121.309269]
    ],optionStyle).addTo(this.map).bringToBack();

    // //虹桥机场
    // L.polygon([
    //       [31.228009,121.334485],
    //       [31.207117,121.330083],
    //       [31.194067,121.334395],
    //       [31.177601,121.34451],
    //       [31.190514,121.364021],
    //       [31.226527,121.3559],
    //       [31.230047,121.350474],
    //       [31.228009,121.334485]
    // ],optionStyle).addTo(this.map).bringToBack();

    // //虹桥火车站
    // L.polygon([
    //       [31.203086,121.312314],
    //       [31.192337,121.319106],
    //       [31.193511,121.334053],
    //       [31.206978,121.328232],
    //       [31.206113,121.31907],
    //       [31.203086,121.312314]
    // ],optionStyle).addTo(this.map).bringToBack();

    // //浦东机场
    // L.polygon([
    //       [31.179485,121.776559],
    //       [31.111089,121.797615],
    //       [31.12055,121.835523],
    //       [31.106328,121.844075],
    //       [31.117582,121.870593],
    //       [31.134893,121.887266],
    //       [31.190391,121.814791],
    //       [31.179485,121.776559]
    // ],optionStyle).addTo(this.map).bringToBack();
};
CIIE.Map.prototype.addCiieImage=function(){
	this.ciieImageAdded=true;
	var size=this.map.getSize();
	var bounds=this.map.getBounds();
	
	var width=size.x;
	var height=size.y;
	
	var latDelta=Math.abs(bounds._northEast.lat-bounds._southWest.lat);
	var lngDelta=Math.abs(bounds._northEast.lng-bounds._southWest.lng);
	
	var latPerPix=latDelta/height;
	var lngPerPix=lngDelta/width;
	
	var startLat=31.20101;
	var startLng=121.29936;
	
	var endLat=startLat*1-latPerPix*647;
	var endLng=startLng*1+lngPerPix*1140;

    endLat = 31.190939917577797;
    endLng = 121.31417796149016;
	
	
	var startLat2=31.20101;
	var startLng2=121.30250;
	
	var endLat2=startLat2*1-latPerPix*652;
	var endLng2=startLng2*1+lngPerPix*650;

    endLat2 = 31.190939917577797;
    endLng2 = 121.31417796149016;
	
	var imageUrl = BASEPATH+'/static/styles/local-lsm/ciienew/images/ciie.png';
    var imageBounds = [[startLat, startLng],[endLat, endLng]];
    

    //var imageBounds2 = [[startLat2, startLng2],[endLat2, endLng2]];
    
    var imageBounds2 = [[startLat2, startLng2],[endLat2, endLng2]];
    
    var imageUrl2 = BASEPATH+'/static/styles/local-lsm/map/ciie2d.png';
	
    ///console.log(endLat+','+endLng);
    
    this.imgLayer3d=L.imageOverlay(imageUrl, imageBounds).addTo(this.map);
    this.imgLayer2d=L.imageOverlay(imageUrl2, imageBounds2).addTo(this.map).bringToBack();
    this.imgLayer3d.setOpacity(0);


    

    
    
    var iconPd=L.icon({
        iconUrl: this.ctx+'/static/styles/local-lsm/map/pdtitle.png',
        iconSize: [294*2/3,81*2/3]
    });
    var iconHq=L.icon({
        iconUrl: this.ctx+'/static/styles/local-lsm/map/hqtitle.png',
        iconSize: [294*2/3,81*2/3]
    });
    var iconHqT=L.icon({
        iconUrl: this.ctx+'/static/styles/local-lsm/map/hqttitle.png',
        iconSize: [369*2/3,81*2/3]
    });
    this.pdtitle = L.marker([31.1573, 121.81179],{title: '浦东机场', icon: iconPd, keepInView:false}).addTo(this.map);
	this.hqtitle = L.marker([31.201449, 121.345336],{title: '虹桥机场', icon: iconHq, keepInView:false}).addTo(this.map);
	this.hqttitle =L.marker([31.200322, 121.327424],{title: '虹桥火车站', icon: iconHqT, keepInView:false}).addTo(this.map);





//    var L1 = L.icon({
//        iconUrl: this.ctx+'/static/styles/local-lsm/ciienew/images/tip/L1.png',
//        iconSize: [173,68]
//    });
//    var L2 = L.icon({
//        iconUrl: this.ctx+'/static/styles/local-lsm/ciienew/images/tip/L2.png',
//        iconSize: [123,68]
//    });
    //var marker0=L.marker([31.19728, 121.31285],{title: '服务贸易', icon: L1, keepInView:false}).addTo(this.map);
    
    //var marker1=L.marker([31.19643, 121.31557],{title: '汽车', icon: L2, keepInView:false}).addTo(this.map);
    
//    marker0.on({
//    	'click': function (e) { 
//    		this.showModel();
//    	}.bind(this)
//    });
    
};
CIIE.Map.prototype.showModel=function(){
	var src=$('#modelFrame').attr('src');
	$('#modelFrame').css('z-index',2);
	$('#modelframereturn').css('z-index',3);
	var display=$('#modelFrame').css('display');
	if(display=='none'){
		$('#modelFrame').css('display','block');
		$('#modelframereturn').attr('display','block');
//		if(FROMMODEL=='ciie'){
//			$('#modelFrame').attr('src','model/ciie.jsp');
//		}else{
//			$('#modelFrame').attr('src','unity/unityplayer/unityplayer.html');
//		}
		if($('#modelFrame').attr('src')==''){
			$('#modelFrame').attr('src','unity/unityplayer/unityplayer.html?smooth='+$.cookie('dataSmooth'));
		}
		
		//$('#modelFrame').attr('src','unity/webgl/index.html');
		//$('#modelFrame').attr('src','unity/unityplayer/unityplayer.html');
	}else{
		$('#modelFrame').css('display','none');
		$('#modelframereturn').attr('display','none');
		//$('#modelFrame').attr('src',''); 
	}
};
CIIE.Map.prototype.clearLayers=function(){
}
CIIE.Map.prototype.getEmers=function(){
	this.cdm.getEmers({},function(result){
		var list=result.data;
		var carCount=0;
		var carCount2=0;
		var carCount3=0;
		var carCount4=0;
		for(var i=0;i<list.length;i++){
			var record=list[i];
			var emclass=record.emclass;
			var lon=record.emlong*1;
			var lat=record.emlat*1;
			var marker=null;
			var name='';
			switch(emclass){
				case '应急通信车'://应急车
					name='应急车';
					marker=L.marker([lat,lon],{title:'应急车', icon: this.markerYJC, keepInView:false}).addTo(this.markersLayerCAR);
					carCount++;
					break;
				case '应急油机车'://指挥车
					name='指挥车';
					marker=L.marker([lat,lon],{title:'指挥车', icon: this.markerZHC, keepInView:false}).addTo(this.markersLayerCAR2);
					carCount2++;
					break;
				case '应急抢修车'://发电车
					name='发电车';
					marker=L.marker([lat,lon],{title:'发电车', icon: this.markerFDC, keepInView:false}).addTo(this.markersLayerCAR3);
					carCount3++;
					break;
				case '油机'://无人机
					name='无人机';
					marker=L.marker([lat,lon],{title:'无人机', icon: this.markerWRJ, keepInView:false}).addTo(this.markersLayerCAR4);
					carCount4++;
					break;
			}
			if(marker!=null){
				marker.info={name:name,lat:lat,lng:lon};
				this.cellMarkerCache.push(marker);
			}
			
		}
		$('#legendCountEC').text(carCount);
		$('#legendCountCC').text(carCount2);
		$('#legendCountELECTRIC').text(carCount3);
		$('#legendCountAIR').text(carCount4);
	}.bind(this));
	
	
	this.cdm.getMaintainMan({},function(result){
		var list=result.data;
		for(var i=0;i<list.length;i++){
			var record=list[i];
			var lon=record.selong*1;
			var lat=record.selat*1;
			var marker=L.marker([lat,lon],{title:record.seperson, icon: this.markerMTM, keepInView:false}).addTo(this.markersLayerMan);
			marker.info={name:record.seperson,lat:lat,lng:lon};
			this.cellMarkerCache.push(marker);
		}
		$('#legendCountMM').text(list.length);
		
	}.bind(this));
	
	
};
CIIE.Map.prototype.getCells=function(){
	
	
//	var list=[
//	  [31.19624, 121.30524],
//	  [31.19882, 121.30858],
//	  [31.19512, 121.31201],
//	  [31.19402, 121.30779]
//	];
//	for(var i=0;i<list.length;i++){
//		var marker=L.marker(list[i],{title: '5G站点数', icon: this.marker5G, keepInView:false}).addTo(this.markersLayer5G);
//		marker.addTo(this.markerClusters);
//	}
	
	
    var url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/area-re_cellByHotname?hotspot='+ encodeURIComponent(this.hotspot);
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
    }).done(function(result){
            //console.log(data)
        	var origin_data=result.data;
            if(!origin_data.length){
                //alert('暂无坐标数据');
                return;
            }
            var carCount=0;
            var detailedInfoVector = [];
            var num2g = 0,
                num3g = 0,
                num4g = 0;
            	num5g = 0;
            //后添加,只取1000个展示
            var data = origin_data;
//            origin_data.map(function(val){
//                var disType = val.cell_nt;
//                if(disType === '2G'){
//                    num2g++;
//                    if(num2g > 5000) return;
//                    data.push(val);
//                }else if(disType === '3G'){
//                    num3g++;
//                    if(num3g > 5000) return;
//                    data.push(val);
//                }else{
//                    num4g++;
//                    if(num4g > 3000) return;
//                    data.push(val);
//                }
//            });
           
            //console.time('getLatlng');
            
           this.cellMarkerCache=[];
           this.getEmers();
           var count2G=0;
           var countTDD=0;
           var countFDD=0;
           var countMotorCell=0;
           var countRoomIn=0;
           var countRoomSplit=0;
           var countRoomOut=0;
           var countStreet=0;
           
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
                        var station_type = data[i].station_type;
                        
                        var lg_subtype = ""; 
                        if(data[i].lg_subtype === null || data[i].lg_subtype === '-') {
                            lg_subtype = "D";
                        }else{
                            lg_subtype = data[i].lg_subtype;
                        };
                        // if(true) {
                        //     var  randomNum = Math.random()*100;
                        //     if (randomNum<20) {
                        //         lg_subtype = "TDD-D";
                        //     }else if (randomNum>20 && randomNum<45) {
                        //         lg_subtype = "TDD-E";
                        //     }else if (randomNum>45 && randomNum<60) {
                        //         lg_subtype = "TDD-F";
                        //     }else if (randomNum>60 && randomNum<75) {
                        //         lg_subtype = "FDD-S";
                        //     }else if (randomNum>75 && randomNum<90) {
                        //         lg_subtype = "900M";
                        //     }else if (randomNum>90 && randomNum<100) {
                        //         lg_subtype = "1800M";
                        //     }
                        // };

                        var hori_direc_angle = 0;
                        if(data[i].hori_direc_angle === null || data[i].hori_direc_angle === '-') {
                            hori_direc_angle = 0;
                        }else{
                            hori_direc_angle = parseFloat(data[i].hori_direc_angle);
                        };
                        // if(true) {
                        //     hori_direc_angle = Math.random()*360;
                        // };

                        var startAngle = parseFloat(hori_direc_angle) - parseFloat(20);
                        var stopAngle = parseFloat(hori_direc_angle) + parseFloat(20);

                        
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



                        // if(data[i].hori_direc_angle === null || data[i].hori_direc_angle === '-') {
                        //     var beginAngle = 0;
                        // }else{
                        //     var beginAngle = parseFloat(data[i].hori_direc_angle);
                        // }
                        // console.log(beginAngle);
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
                            hori_direc_angle: startAngle,
                            mechanical_dip_angle: stopAngle
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
                        //var urlNew='../maptip/deviceDetail.jsp?hotspot='+encodeURIComponent(hotspot)
	                    var urlNew='../maptip/deviceDetailNew.jsp?hotspot='+encodeURIComponent(hotspot)
	                    			+'&cellname='+encodeURIComponent(name)
	                    			+'&nettype='+encodeURIComponent(type)
	                    			+'&lacci='+encodeURIComponent(lacci)
                        var heatPopup4G = L.popup({maxWidth:1100,maxHeight:849,offset:L.point(0, 5),autoPanPaddingTopLeft:L.point(-30, 240),closeButton:true, closeOnClick:false})
	                        .setLatLng([lat,lng]);
	                    heatPopup4G.setContent('<iframe allowtransparency="true" width="1001px" ondblclick="alert();" frameborder="no" height="840px" src="'+urlNew+'"></iframe>');
	                    
	                    var marker=null;
	                    
//	                    if(name.indexOf('应急车') !== -1){
//	                    	carCount++;
//	                    	marker=L.marker([lat,lng],{title: name, icon: this.markerYJC, keepInView:false}).bindPopup(heatPopup2G).addTo(this.markersLayerCAR);
//	                        continue;
//	                    }
//	                    if(name.indexOf('嘉里中心')==-1) continue;
	                    if(type === '5G'){
	                    	num5g++;
	                    	marker=L.marker([lat,lng],{title: name, icon: this.marker5G, keepInView:false}).bindPopup(heatPopup4G).addTo(this.markersLayer5G);
                    		marker.addTo(this.markerClusters);
                        }else if(type === '4G'){
                        	
                        	if (lte_type === "FDD") {
                        		num4g++;
                        		countFDD++;
                        		marker=L.marker([lat,lng],{title: name, icon: this.marker4G, keepInView:false}).bindPopup(heatPopup4G).addTo(this.markersLayerFDD);
                        		marker.addTo(this.markerClusters);
                            }else if (lte_type === "TDD") {
                            	num4g++;
                            	countTDD++;
                            	marker=L.marker([lat,lng],{title: name, icon: this.marker4G, keepInView:false}).bindPopup(heatPopup4G).addTo(this.markersLayerTDD);
                            	marker.addTo(this.markerClusters);
                            }
                        }else if(type === '2G'){
                        	count2G++;
                        	num2g++;
                        	marker=L.marker([lat,lng],{title: name, icon: this.marker2G, keepInView:false}).bindPopup(heatPopup4G).addTo(this.markersLayer2G);
                        	marker.addTo(this.markerClusters);
                        }


	                    
	                    if(station_type === '宏站'){
	                    	countMotorCell++;
	                    	marker=L.marker([lat,lng],{title: name, icon: this.markerMotorCell, keepInView:false}).bindPopup(heatPopup4G).addTo(this.markersLayerMotorCell);
	                    }else if(station_type === '室内'){
	                    	countRoomIn++;
	                    	marker=L.marker([lat,lng],{title: name, icon: this.markerRoomIn, keepInView:false}).bindPopup(heatPopup4G).addTo(this.markersLayerRoomIn);
	                    }else if(station_type === '室分'){
	                    	countRoomSplit++;
	                    	marker=L.marker([lat,lng],{title: name, icon: this.markerRoomSplit, keepInView:false}).bindPopup(heatPopup4G).addTo(this.markersLayerRoomSplit);
	                    }else if(station_type === '室外'){
	                    	countRoomOut++;
	                    	marker=L.marker([lat,lng],{title: name, icon: this.markerRoomOut, keepInView:false}).bindPopup(heatPopup4G).addTo(this.markersLayerRoomOut);
	                    }else if(station_type === '街道站'){
	                    	countStreet++;
	                    	marker=L.marker([lat,lng],{title: name, icon: this.markerStreet, keepInView:false}).bindPopup(heatPopup4G).addTo(this.markersLayerStreet);
	                    }
                        

                        //添加扇形
                        var circle = null;
                        if (station_type === '宏站'|| station_type === '街道站') {
                            if (lg_subtype == "TDD-D") {
                                var radius = 125;var color = '#408b22';
                                //marker=L.marker([lat,lng],{title: name, icon: this.markertestPng, keepInView:false}).addTo(this.shangxingLayerTDD_D);
                                circle = L.circle([lat,lng], radius, {fill: true,weight:1,className:name,fillColor: color,fillOpacity: 0.5,color: color,opacity: 0.9,startAngle: startAngle,stopAngle: stopAngle,pointerEvents:"auto"}).bindPopup(heatPopup4G).addTo(this.shangxingLayerTDD_D);
                            }else if (lg_subtype == "TDD-E") {
                                var radius = 110;var color = '#5ba931';
                                //marker=L.marker([lat,lng],{title: name, icon: this.markertestPng, keepInView:false}).addTo(this.shangxingLayerTDD_E);
                                circle = L.circle([lat,lng], radius, {fill: true,weight:1,className:name,fillColor: color,fillOpacity: 0.5,color: color,opacity: 0.9,startAngle: startAngle,stopAngle: stopAngle,pointerEvents:"auto"}).bindPopup(heatPopup4G).addTo(this.shangxingLayerTDD_E);
                            }else if (lg_subtype == "TDD-F") {
                                var radius = 95;var color = '#a8cf42';
                                //marker=L.marker([lat,lng],{title: name, icon: this.markertestPng, keepInView:false}).addTo(this.shangxingLayerTDD_F);
                                circle = L.circle([lat,lng], radius, {fill: true,weight:1,className:name,fillColor: color,fillOpacity: 0.5,color: color,opacity: 0.9,startAngle: startAngle,stopAngle: stopAngle,pointerEvents:"auto"}).bindPopup(heatPopup4G).addTo(this.shangxingLayerTDD_F);
                            }else if (lg_subtype == "FDD-S") {
                                var radius = 80;var color = '#d7e6af';
                                //marker=L.marker([lat,lng],{title: name, icon: this.markertestPng, keepInView:false}).addTo(this.shangxingLayerFDD_S);
                                circle = L.circle([lat,lng], radius, {fill: true,weight:1,className:name,fillColor: color,fillOpacity: 0.5,color: color,opacity: 0.9,startAngle: startAngle,stopAngle: stopAngle,pointerEvents:"auto"}).bindPopup(heatPopup4G).addTo(this.shangxingLayerFDD_S);
                            }else if (lg_subtype == "900M") {
                                var radius = 65;var color = '#3333cc';
                                circle = L.circle([lat,lng], radius, {fill: true,weight:1,className:name,fillColor: color,fillOpacity: 0.5,color: color,opacity: 0.9,startAngle: startAngle,stopAngle: stopAngle,pointerEvents:"auto"}).bindPopup(heatPopup4G).addTo(this.shangxingLayer900M);
                                //marker=L.marker([lat,lng],{title: name, icon: this.markertestPng, keepInView:false}).addTo(this.shangxingLayer900M);
                            }else if (lg_subtype == "1800M") {
                                var radius = 50;var color = '#3399cc';
                                //marker=L.marker([lat,lng],{title: name, icon: this.markertestPng, keepInView:false}).addTo(this.shangxingLayer1800M);
                                circle = L.circle([lat,lng], radius, {fill: true,weight:1,className:name,fillColor: color,fillOpacity: 0.5,color: color,opacity: 0.9,startAngle: startAngle,stopAngle: stopAngle,pointerEvents:"auto"}).bindPopup(heatPopup4G).addTo(this.shangxingLayer1800M);
                            }; 
                        }
                        
                        
                        if(marker!=null){
                        	marker.info=temObj;
                        	this.cellMarkerCache.push(marker);
                        	//marker.on('click',this.showMarkerDetail.bind(this));
                        }
                       
                }else{
                    continue;
                }
            }
            $('#legendCount2GCell').text(count2G);
            $('#legendCountTDD').text(countTDD);
            $('#legendCountFDD').text(countFDD);
            $('#legendCount5G').text(num5g);
            
            $('#legendCountMotorCell').text(countMotorCell);
            $('#legendCountRoomIn').text(countRoomIn);
            $('#legendCountRoomSplit').text(countRoomSplit);
            $('#legendCountRoomOut').text(countRoomOut);
            $('#legendCountStreet').text(countStreet);
            
            var qlHotMap=this.qlHotMap;
            if(qlHotMap[this.hotspot]==true){
            	var ql=$('.QLCONTENT[name='+this.hotspot+']');
            	ql.find('.QLCKPI:eq(3)').find('div:eq(2)').text(num2g);
            	ql.find('.QLCKPI:eq(4)').find('div:eq(2)').text(num4g);
            	ql.find('.QLCKPI:eq(5)').find('div:eq(2)').text(num5g);
            }
            this.updatePercent(this.hotspot);
            console.timeEnd('getLatlng');
            //初始话扇形图层
            //this.addShanXing();

            //if (FROMMODEL == null || FROMMODEL == "null"){}else{
                this.getBaseStations();   //基站
                //this.getSpareParts();     //备件备品
                this.getDialTests();      //拨测
            //}

            //if(this.hotspot != "J-国家会展中心" ){  //防止切换其他热点,不加载热力图
            if(this.loadHotMapFirstNum != 0 ){  //防止切换其他热点,不加载热力图
                //初始化热力图
                this.updateHeatTimeLine(this.updateHeat);

                if (this.map.hasLayer(this.shangxingLayerTDD_D)) {this.map.removeLayer(this.shangxingLayerTDD_D);}
                if (this.map.hasLayer(this.shangxingLayerTDD_E)) {this.map.removeLayer(this.shangxingLayerTDD_E);}
                if (this.map.hasLayer(this.shangxingLayerTDD_F)) {this.map.removeLayer(this.shangxingLayerTDD_F);}
                if (this.map.hasLayer(this.shangxingLayerFDD_S)) {this.map.removeLayer(this.shangxingLayerFDD_S);}
                $("div.yjutreds").each(function(index, el) {
                    if ($(el).hasClass('mapCtrlItemSelected')){
                        var func = $(el).attr('func');
                        if (func == 'TDD-D') {this.map.addLayer(this.shangxingLayerTDD_D);}
                        if (func == 'TDD-E') {this.map.addLayer(this.shangxingLayerTDD_E);}
                        if (func == 'TDD-F') {this.map.addLayer(this.shangxingLayerTDD_F);}
                        if (func == 'FDD-S') {this.map.addLayer(this.shangxingLayerFDD_S);}
                    }
                }.bind(this)); 
                if (this.map.hasLayer(this.shangxingLayer900M)) {this.map.removeLayer(this.shangxingLayer900M);}
                if (this.map.hasLayer(this.shangxingLayer1800M)) {this.map.removeLayer(this.shangxingLayer1800M);}
                $("div.yjutreds").each(function(index, el) {
                    if ($(el).hasClass('mapCtrlItemSelected')){
                        var func = $(el).attr('func');
                        if (func == '900M') {this.map.addLayer(this.shangxingLayer900M);}
                        if (func == '1800M') {this.map.addLayer(this.shangxingLayer1800M);}
                    }
                }.bind(this));


                $("#ctrlResource").find('.mapCtrlItem').each(function(index, el) {
                    var func = $(el).attr('func');
                    if ($(el).hasClass('mapCtrlItemSelected')) {

                        if(func=="2G小区"){this.map.addLayer(this.markersLayer2G);}
                        if(func=="FDD小区"){this.map.addLayer(this.markersLayerTDD);}
                        if(func=="TDD小区"){this.map.addLayer(this.markersLayerFDD);}
                        if(func=="5G站点数"){this.map.addLayer(this.markersLayer5G);}

                        if(func=="聚合小区"){this.map.addLayer(this.markerClusters);}

                        if(func=="基站"){this.map.addLayer(this.markersLayerBaseStation);}     

                        if(func=="TDD-D"){this.map.addLayer(this.shangxingLayerTDD_D);}
                        if(func=="TDD-E"){this.map.addLayer(this.shangxingLayerTDD_E);}
                        if(func=="TDD-F"){this.map.addLayer(this.shangxingLayerTDD_F);}
                        if(func=="FDD-S"){this.map.addLayer(this.shangxingLayerFDD_S);}
                        if(func=="900M"){this.map.addLayer(this.shangxingLayer900M);}
                        if(func=="1800M"){this.map.addLayer(this.shangxingLayer1800M);}




                        if(func=="应急车"){this.map.addLayer(this.markersLayerCAR);}
                        if(func=="指挥车"){this.map.addLayer(this.markersLayerCAR2);}
                        if(func=="发电车"){this.map.addLayer(this.markersLayerCAR3);}
                        if(func=="无人机"){this.map.addLayer(this.markersLayerCAR4);}
                        if(func=="保障人员"){this.map.addLayer(this.markersLayerMan);}


                        if(func=="拨测"){this.map.addLayer(this.markersLayerDialTest);}  


                    }
                }.bind(this));



            }
            this.loadHotMapFirstNum++;



            if (FROMMODEL == null || FROMMODEL == "null"){

                $("#ctrlFactor").find('.ctrlTitle[func="交通枢纽"]').trigger('click');
                $("#ctrlFactor").find('.ctrlTitle[func="酒店"]').trigger('click');
                $("#ctrlFactor").find('.ctrlTitle[func="保障线路"]').trigger('click');

            }else{
                //初始化热力图
                $(".mapCtrlItem[func='场景热力图']").addClass('mapCtrlItemSelected')
                this.updateHeatTimeLine(this.updateHeat);
                
            
            
                // this.map.addLayer(this.markersLayer2G);
                // this.map.addLayer(this.markersLayerTDD);
                // this.map.addLayer(this.markersLayerFDD);
                // this.map.addLayer(this.markersLayer5G);


                this.map.addLayer(this.shangxingLayerTDD_D);
                this.map.addLayer(this.shangxingLayerTDD_E);
                this.map.addLayer(this.shangxingLayerTDD_F);
                this.map.addLayer(this.shangxingLayerFDD_S);
                this.map.addLayer(this.shangxingLayer900M);
                this.map.addLayer(this.shangxingLayer1800M);





                this.map.addLayer(this.markersLayerCAR);
                this.map.addLayer(this.markersLayerCAR2);
                this.map.addLayer(this.markersLayerCAR3);
                this.map.addLayer(this.markersLayerCAR4);
                this.map.addLayer(this.markersLayerMan);
            }

            this.updateHeatTimeLine(this.updateHeatOfAll4BigClass);

            
            
            $('.leaflet-marker-icon').on('dblclick',this.iconClick.bind(this));
           // $('#map-icon-emercar').text(carCount);
            

            
            
            
            $('#cellCount_4g').text(num4g);
            $('#cellCount_3g').text(num3g);
            $('#cellCount_2g').text(num2g);

            

        }.bind(this));
};
CIIE.Map.prototype.getBaseStations = function() {
    //var url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-rm-site?hotspot='+ encodeURIComponent(this.hotspot);
    var url = LSMScreen.CacheDataManager.baseUrl + '/sml/query/lsm-rm-site?cache=true&hotspot='+ encodeURIComponent(this.hotspot);
    $.ajax({
        url: url,
        type: 'get', //数据发送方式
        dataType: 'json', //接受数据格式
        //contentType: "application/json",
        //accessType: "application/json",
        data: {},
        beforeSend: function(XMLHttpRequest) {},
        complete: function(XMLHttpRequest, textStatus) {}
    }).done(function(result) {
        //console.log(data)
        var origin_data = result.data;
        if (!origin_data.length) {
            //alert('暂无坐标数据');
            return;
        }
        var carCount = 0;
        //后添加,只取1000个展示
        var data = origin_data;


        console.time('getLatlng');

        //this.cellMarkerCache = [];
        var countBaseStation = 0;
        

        for (var i = 0, len = data.length; i < len; ++i) {
            if (data[i].lat && data[i].lon) {
                // var latHeatMap = parseFloat(data[i].lat + 0.0025 + this.hotspotInfo.lat),        //偏移
                // lngHeatMap = parseFloat(data[i].lon - 0.0045 + this.hotspotInfo.lon);
                var latHeatMap = data[i].lat,
                    lngHeatMap = data[i].lon;

                var bdPoint = this.wgs84tobd09(lngHeatMap, latHeatMap);
                var point = bdPoint.reverse();
                if (point.length !== 2) continue;
                
                var name = data[i].name;
                var type = data[i].type;
                var id = data[i].id;
                                    
                var temObj = {
                    id: id,
                    point: point,
                    name: name,
                    lat: point[0],
                    lng: point[1],
                    type: type,
                };
                

                var lat=point[0];
                var lng=point[1];  

                var marker = null;
                //if (type === '接入站点') {
                if (true) {
                    countBaseStation++;
                    marker = L.marker([lat, lng], {
                        title: name,
                        icon: this.markerBaseStation,
                        keepInView: false
                    }).addTo(this.markersLayerBaseStation);
                    //marker.addTo(this.markerClusters);   //添加到汇聚
                }

                if (marker != null) {
                    marker.info = temObj;
                    this.cellMarkerCache.push(marker);
                }

            } else {
                continue;
            }
        }
        $('#legendCount2GBaseStation').text(countBaseStation);
        //this.map.addLayer(this.markersLayer2G);
    }.bind(this));

};

//markersLayerSparePart
CIIE.Map.prototype.getSparePartsBak = function() {
    var lat=31.19765;
    var lng=121.31447; 

    var center = this.map.getCenter();

    var name = "备品备件测试" ;

    var urlNew='../maptip/sparePart.jsp?hotspot='+encodeURIComponent(hotspot)
                +'&cellname='+encodeURIComponent(name)
                //+'&nettype='+encodeURIComponent(type)
                //+'&lacci='+encodeURIComponent(lacci)
    var heatPopup4G = L.popup({maxWidth:1100,maxHeight:489,offset:L.point(0, 5),autoPanPaddingTopLeft:L.point(-30, 240),closeButton:true, closeOnClick:false})
        .setLatLng([lat,lng]);
    heatPopup4G.setContent('<iframe allowtransparency="true" width="1001px" ondblclick="alert();" frameborder="no" height="480px" src="'+urlNew+'"></iframe>');
                            

    var marker = null;
    marker = L.marker([lat,lng], {
        title: name,
        icon: this.markerSparePart,
        keepInView: false
    }).bindPopup(heatPopup4G).addTo(this.markersLayerSparePart);
   
};
//演示用
CIIE.Map.prototype.getSpareParts = function() {
    var lat=31.19765;
    var lng=121.31447; 



    var center = this.map.getCenter();

    var name = "备品备件测试" ;

    var urlNew='../maptip/sparePart.jsp?hotspot='+encodeURIComponent(hotspot)
                +'&cellname='+encodeURIComponent(name)
                //+'&nettype='+encodeURIComponent(type)
                //+'&lacci='+encodeURIComponent(lacci)
    // var heatPopup4G = L.popup({maxWidth:1100,maxHeight:489,offset:L.point(0, 5),autoPanPaddingTopLeft:L.point(-30, 240),closeButton:true, closeOnClick:false})
    //     .setLatLng([lat,lng]);
    var heatPopup4G = L.popup({maxWidth:1100,maxHeight:489,offset:L.point(0, 5),autoPanPaddingTopLeft:L.point(-30, 240),closeButton:true, closeOnClick:false})
        .setLatLng(center);    
    heatPopup4G.setContent('<iframe allowtransparency="true" width="1001px" ondblclick="alert();" frameborder="no" height="480px" src="'+urlNew+'"></iframe>');
    heatPopup4G.openOn(this.map);
                            

    // var marker = null;
    // marker = L.marker(center, {
    //     title: name,
    //     icon: this.markerSparePart,
    //     keepInView: false
    // }).bindPopup(heatPopup4G).addTo(this.markersLayerSparePart);


    
   
};




//markersLayerDialTest
CIIE.Map.prototype.getDialTests = function() {

    var lat=31.195905;
    var lng=121.30838; 

    var name = "拨测测试" ;

    var urlNew='../maptip/dialTest.jsp?hotspot='+encodeURIComponent(hotspot)
                +'&cellname='+encodeURIComponent(name)
                //+'&nettype='+encodeURIComponent(type)
                //+'&lacci='+encodeURIComponent(lacci)
    // var heatPopup4G = L.popup({maxWidth:550,maxHeight:589,offset:L.point(0, 5),autoPanPaddingTopLeft:L.point(-30, 240),closeButton:false, closeOnClick:true})
    var heatPopup4G = L.popup({maxWidth:550,maxHeight:589,offset:L.point(0, 0),autoPanPaddingTopLeft:L.point(-530, 0),closeButton:false, closeOnClick:true,className:'changePositon'})
        .setLatLng([lat,lng]);
     
    heatPopup4G.setContent('<iframe allowtransparency="true" width="501px" ondblclick="alert();" frameborder="no" height="580px" src="'+urlNew+'"></iframe>');
    heatPopup4G.openOn(this.markersLayerDialTest);

    var marker = null;
    marker = L.marker([lat, lng], {
        title: name,
        icon: this.markerDialTestRed,
        keepInView: false
    }).bindPopup(heatPopup4G).addTo(this.markersLayerDialTest);


 

};

CIIE.Map.prototype.showMarkerDetail=function(e){
	alert();
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
//	this.cdm.
	
	var _format="yyyy-MM-dd hh:mm:ss";
	//var time = SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN, _format);
	if(selectTime!=null){
		time=selectTime;
		time=time.replace(/:/g,'').replace(/-/g,'').replace(/\s/g,'');
		time=time.substring(0,time.length-2);
	}else{
		time=this.heatTimeLine[this.heatTimeLine.length-1];
	}
	if(callBack==null){
		callBack=this.updatePlaySelectorTime.bind(this);
	}
	if(this.heatTimeMap[time]==null){
		this.heatDataHandler.apply(this,[[],'s_091']);
		callBack.apply(this,[this.reformatDateStr(time)]);
		return;
	}
	var url = '';
	if(this.heatKpi=='用户数'){
		this.cdm.getHeatData({
            hotspot:this.hotspot,
			//hotspot:'J-交通枢纽',
			time:time
		},function(result){
			this.heatDataHandler.apply(this,[result,'s_091']);
	    	if(callBack!=null){
	    		callBack.apply(this,[this.reformatDateStr(time)]);
	    	}
		}.bind(this));
		
	}else if(this.heatKpi=='4G流量' || this.heatKpi=='流量'){//s_213
		this.cdm.getHeatData({
			hotspot:this.hotspot,
			time:time
		},function(result){
			this.heatDataHandler.apply(this,[result,'s_213']);
	    	if(callBack!=null){
	    		callBack.apply(this,[this.reformatDateStr(time)]);
	    	}
		}.bind(this));
	}else if(this.heatKpi=='VOLTE话务量' || this.heatKpi=='话务量'){ //volte_voice_teletraffic
		this.cdm.getHeatData({
			hotspot:this.hotspot,
			time:time
		},function(result){
            //this.heatDataHandler.apply(this,[result,'volte_voice_teletraffic']);
			this.heatDataHandler.apply(this,[result,'ltehwl']);
	    	if(callBack!=null){
	    		callBack.apply(this,[this.reformatDateStr(time)]);
	    	}
		}.bind(this));
	}else if(this.heatKpi=='GSM话务量'){//gsmhwl
		this.cdm.getHeatData({
			hotspot:this.hotspot,
			time:time
		},function(result){
			this.heatDataHandler.apply(this,[result,'gsmhwl']);
	    	if(callBack!=null){
	    		callBack.apply(this,[this.reformatDateStr(time)]);
	    	}
		}.bind(this));
	}
	
};
CIIE.Map.prototype.heatDataHandler=function(result,key){
	
	var data={};
	
	for(var i=0;i<result.length;i++){ 
		var record=result[i];
		data[record.lacci]={total:record[key]}
	}
	
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

    var flagFlag = $("#ctrlFunction").find('div.hotMap').eq(0).parent('div').eq(0).hasClass('mapCtrlItemSelected');
    if (!flagFlag) {return;};


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
		 heatMap[i].value=heatMap[i].value*0.7;
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
	
    var map=this.map; 
    var curZoom = map.getZoom();  
	var aveHeatValue = Math.ceil(sum/heatMap.length);
	maxHeatValue=2000;//aveHeatValue;

    if (this.heatKpi == "用户数") {
        switch (curZoom){
            case 10:
                maxHeatValue = 25000;
                break;
            case 11:
                maxHeatValue = 22000;
                break;
            case 12:
                maxHeatValue = 8000;
                break;
            case 13:
                maxHeatValue = 7000;
                break;
            case 14:
                maxHeatValue = 6000;
                break;
            case 15:
                maxHeatValue = 5000;
                break;
            case 16:
                maxHeatValue = 4000;
                break;
            case 17:
                maxHeatValue = 3000;
                break;
            default:
                maxHeatValue = 2000;
                break;
        }

    }else if (this.heatKpi == "流量") {
        switch (curZoom){
            case 10:
                maxHeatValue = 85000000;
                break;
            case 11:
                maxHeatValue = 72000000;
                break;
            case 12:
                maxHeatValue = 32000000;
                break;
            case 13:
                maxHeatValue = 10000000;
                break;
            case 14:
                maxHeatValue = 7000000;
                break;
            case 15:
                maxHeatValue = 5000000;
                break;
            case 16:
                maxHeatValue = 4000000;
                break;
            case 17:
                maxHeatValue = 3000000;
                break;
            default:
                maxHeatValue = 2000000;
                break;
        }

    }else if (this.heatKpi == "话务量") {
        switch (curZoom){
            case 10:
                maxHeatValue = 250;
                break;
            case 11:
                maxHeatValue = 220;
                break;
            case 12:
                maxHeatValue = 80;
                break;
            case 13:
                maxHeatValue = 70;
                break;
            case 14:
                maxHeatValue = 60;
                break;
            case 15:
                maxHeatValue = 50;
                break;
            case 16:
                maxHeatValue = 40;
                break;
            case 17:
                maxHeatValue = 30;
                break;
            default:
                maxHeatValue = 20;
                break;
        }

    }




	testData={max: maxHeatValue, min: minHeatValue, data: heatMap};
	//testData = {data: heatMap};
	cfg.max=maxHeatValue;
	cfg.min=minHeatValue;
	
//	testData = {data: heatMap};
    this.heatMapLayer = new HeatmapOverlay(cfg);
    this.map.addLayer(this.heatMapLayer);
    this.heatMapLayer.setData(testData);
}



//添加全量热力图
CIIE.Map.prototype.updateHeatOfAll4BigClass=function(selectTime,callBack){
//  this.cdm.
    var allHotspot = 'J-交通枢纽';
    var allHotspot = 'J-国家会展中心,J-交通枢纽,J-保障线路,J-酒店';
    var _format="yyyy-MM-dd hh:mm:ss";
    //var time = SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN, _format);
    if(selectTime!=null){
        time=selectTime;
        time=time.replace(/:/g,'').replace(/-/g,'').replace(/\s/g,'');
        time=time.substring(0,time.length-2);
    }else{
        time=this.heatTimeLine[this.heatTimeLine.length-1];
    }
    if(callBack==null){
        callBack=this.updatePlaySelectorTime.bind(this);
    }
    if(this.heatTimeMap[time]==null){
        this.heatDataHandlerOfAll4BigClass.apply(this,[[],'s_091']);
        callBack.apply(this,[this.reformatDateStr(time)]);
        return;
    }
    var url = '';
    if(this.heatKpiOfAll=='用户数'){
        this.cdm.getHeatData({
            //hotspot:this.hotspot,
            hotspot:allHotspot,
            time:time
        },function(result){
            this.heatDataHandlerOfAll4BigClass.apply(this,[result,'s_091']);
            if(callBack!=null){
                callBack.apply(this,[this.reformatDateStr(time)]);
            }
        }.bind(this));
        
    }else if(this.heatKpiOfAll=='4G流量' || this.heatKpiOfAll=='流量'){//s_213
        this.cdm.getHeatData({
            //hotspot:this.hotspot,
            hotspot:allHotspot,
            time:time
        },function(result){
            this.heatDataHandlerOfAll4BigClass.apply(this,[result,'s_213']);
            if(callBack!=null){
                callBack.apply(this,[this.reformatDateStr(time)]);
            }
        }.bind(this));
    }else if(this.heatKpiOfAll=='VOLTE话务量' || this.heatKpiOfAll=='话务量'){ //volte_voice_teletraffic
        this.cdm.getHeatData({
            //hotspot:this.hotspot,
            hotspot:allHotspot,
            time:time
        },function(result){
            //this.heatDataHandlerOfAll4BigClass.apply(this,[result,'volte_voice_teletraffic']);
            this.heatDataHandlerOfAll4BigClass.apply(this,[result,'ltehwl']);
            if(callBack!=null){
                callBack.apply(this,[this.reformatDateStr(time)]);
            }
        }.bind(this));
    }else if(this.heatKpiOfAll=='GSM话务量'){//gsmhwl
        this.cdm.getHeatData({
            //hotspot:this.hotspot,
            hotspot:allHotspot,
            time:time
        },function(result){
            this.heatDataHandlerOfAll4BigClass.apply(this,[result,'gsmhwl']);
            if(callBack!=null){
                callBack.apply(this,[this.reformatDateStr(time)]);
            }
        }.bind(this));
    }
    
};
CIIE.Map.prototype.heatDataHandlerOfAll4BigClass=function(result,key){
    //heatMapOfAll4BigClass
    var data=[];
    
    for(var i=0;i<result.length;i++){ 
        var record=result[i];
        if (record.lat == null || record.lon == null) {
            //拍排除非法经纬度,避免地图打点异常 
            //console.log("非法经纬度==" + i);
        } else {
            var total = record[key] == null?0:record[key];  //NaN
            if (isNaN(total)) {total = 0};
            var bdPoint = this.wgs84tobd09(record.lon,record.lat);
            var point = bdPoint.reverse();
            data.push({lat:point[0],lng:point[1],value:total});
        }
    }
    
    if(this.isEmpty(data)){
        //alert('暂无用户数据');
        return;
    }
    console.time('getHeatMapData');
    // for(var i=0;i<this.heatMap.length;i++){
    //     if(data[this.heatMap[i].lacci]!=null){
    //         this.heatMap[i].value=data[this.heatMap[i].lacci].total;
    //     }else{
    //         this.heatMap[i].value=0;
    //     }
    // }

    this.heatMapOfAll4BigClass = data;
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
    this.heatMapRenderOfAll4BigClass(this.heatMapOfAll4BigClass,this.radiusHeatMap);
//    this.rerenderHeatMap();
    console.timeEnd('heatMapRender');
};

CIIE.Map.prototype.rerenderHeatMapOfAll4BigClass=function(){
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
    if(this.heatMapOfAll4BigClass==null||this.heatMapOfAll4BigClass.length <= 0) return;//无缓存数据不渲染
    this.heatMapRenderOfAll4BigClass(this.heatMapOfAll4BigClass,this.radiusHeatMap);
}

CIIE.Map.prototype.heatMapRenderOfAll4BigClass=function(temArr,radius) {

    var flagFlag = $("#ctrlFunction").find('div.hotMapOfAll4Class').eq(0).parent('div').eq(0).hasClass('mapCtrlItemSelected');
    if (!flagFlag) {return;};


    var heatMap = this.mergeSame(temArr.sort(this.keySort('lat')),'lat','lng');
    if(this.heatMapLayerOfAll4BigClass !== undefined && this.heatMapLayerOfAll4BigClass != null){
        if (this.heatMapLayerOfAll4BigClass._data){
            this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
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
    	 heatMap[i].value=heatMap[i].value*0.7;
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
    var map=this.map; 
    var curZoom = map.getZoom(); 
    var aveHeatValue = Math.ceil(sum/heatMap.length);
    maxHeatValue=2000;//aveHeatValue;

    if (this.heatKpiOfAll == "用户数") {
        switch (curZoom){
            case 10:
                maxHeatValue = 25000;
                break;
            case 11:
                maxHeatValue = 22000;
                break;
            case 12:
                maxHeatValue = 8000;
                break;
            case 13:
                maxHeatValue = 7000;
                break;
            case 14:
                maxHeatValue = 6000;
                break;
            case 15:
                maxHeatValue = 5000;
                break;
            case 16:
                maxHeatValue = 4000;
                break;
            case 17:
                maxHeatValue = 3000;
                break;
            default:
                maxHeatValue = 2000;
                break;
        }

    }else if (this.heatKpiOfAll == "流量") {
        switch (curZoom){
            case 10:
                maxHeatValue = 85000000;
                break;
            case 11:
                maxHeatValue = 72000000;
                break;
            case 12:
                maxHeatValue = 32000000;
                break;
            case 13:
                maxHeatValue = 10000000;
                break;
            case 14:
                maxHeatValue = 7000000;
                break;
            case 15:
                maxHeatValue = 5000000;
                break;
            case 16:
                maxHeatValue = 4000000;
                break;
            case 17:
                maxHeatValue = 3000000;
                break;
            default:
                maxHeatValue = 2000000;
                break;
        }

    }else if (this.heatKpiOfAll == "话务量") {
        switch (curZoom){
            case 10:
                maxHeatValue = 250;
                break;
            case 11:
                maxHeatValue = 220;
                break;
            case 12:
                maxHeatValue = 80;
                break;
            case 13:
                maxHeatValue = 70;
                break;
            case 14:
                maxHeatValue = 60;
                break;
            case 15:
                maxHeatValue = 50;
                break;
            case 16:
                maxHeatValue = 40;
                break;
            case 17:
                maxHeatValue = 30;
                break;
            default:
                maxHeatValue = 20;
                break;
        }

    }

    


    testData={max: maxHeatValue, min: minHeatValue, data: heatMap};
    //testData = {data: heatMap};
    cfg.max=maxHeatValue;
    cfg.min=minHeatValue;
    
//  testData = {data: heatMap};
    this.heatMapLayerOfAll4BigClass = new HeatmapOverlay(cfg);
    this.map.addLayer(this.heatMapLayerOfAll4BigClass);
    this.heatMapLayerOfAll4BigClass.setData(testData);
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

CIIE.Map.prototype.setDivMovable=function(dom){
	$(dom).on('mousedown',function(e){
		if(e.target.className=='map-icon-close'
			||e.target.className.indexOf('quickLocate ')!=-1){
			return;
		}
		
		if(e.target.id=='qcMin'){
			var stat=$(e.target).attr('stat');
			if(stat=="normal"){
				$(e.target).attr('stat','min');
				$('#quickLocateItems>div[id!=qcMin]').hide(1000);
			}else{
				$(e.target).attr('stat','normal');
				$('#quickLocateItems>div[id!=qcMin]').show(1000);
			}
		}
		e.preventDefault(); 
		e.cancelBubble = true;
		e.stopPropagation();
		var baseLeft=$(dom).css('left').replace('px','')*1;
		var baseTop=$(dom).css('top').replace('px','')*1;
		var startLeft=e.pageX;
		var startTop=e.pageY;
		
		var innerLeft=startLeft-baseLeft;
		var innerTop=startTop-baseTop;
		
		$('#map').css('pointer-events','none');
		$('#bgDiv').on('mousemove',function(e){
			var left=e.pageX;
			var top=e.pageY;
			$(dom).css('left',left-innerLeft);
			$(dom).css('top',top-innerTop);
		}.bind(this));
		$('#bgDiv').on('mouseup',function(e){
			$('#bgDiv').off('mousemove');
			$('#bgDiv').off('mouseup');
			$('#map').css('pointer-events','auto');
		}.bind(this));
	}.bind(this));
	
	$(dom).on('mouseup',function(e){
		$('#bgDiv').off('mousemove');
		$('#bgDiv').off('mouseup');
		$('#map').css('pointer-events','auto');
	});
}

CIIE.Map.prototype.getmaxTimeToInfobroad=function(){
    var iphone = $.cookie('phoneNum')==null?"13000000000":$.cookie('phoneNum');
    console.log("iphone:"+iphone);
    //var url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/area-re_cellByHotname?hotspot='+ encodeURIComponent(hot);
    var url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/eaebm-bsParCfg?type=maxTime&id='+iphone;
    $.ajax({
        url: url,
        type: 'get',         //数据发送方式
        dataType: 'json',     //接受数据格式
        //contentType: "application/json",
        //accessType: "application/json",
        //timeout:5000,
        data:{},
        beforeSend: function(XMLHttpRequest){
        },
        complete: function(XMLHttpRequest,textStatus){
        }
    }).done(function(result){
        //console.log(result) 

        //判断数据库是否存在,
        var total = result.data.length;
        if (total == 0) {   //不存在主动添加一条
            var paramA = {
                            "tableName":"dm_co_ba_cfg_bs",
                            "type":"insert",          //第一次插入时请使用insert
                            "conditions":["id"],
                            "data":{
                                    "type":"maxTime",      //自定义的分类
                                    "id":iphone,            //自定义的id
                                    "content":0
                            }
            };
            var url = LSMScreen.CacheDataManager.baseUrl +'/sml/update/common';
            $.ajax({
                url: url,
                type: 'post',         //数据发送方式
                dataType: 'josn',     //接受数据格式
                contentType: "application/json",
                //accessType: "application/json",
                //timeout:5000,
                data:JSON.stringify(paramA),
                beforeSend: function(XMLHttpRequest){
                },
                complete: function(XMLHttpRequest,textStatus){
                }
            }).done(function(resultStr){}.bind(this))
        }else{
            var data = result.data;
            this.infobroadmaxTime = data[iphone].content;
            this.infobroadmaxTimeFirst = data[iphone].content;
        }

        this.infobroadcasDataFirst();
    }.bind(this));
};

CIIE.Map.prototype.infobroadcasDataFirst=function(){
    var sub_id = "";
    if (FROMMODEL == "ciie") {sub_id = "ipms.lsm.cg";}else{sub_id = "ipms.lsm.gl";};
    var maxTime = "";
    if (this.infobroadmaxTime != 0 && this.infobroadmaxTime != undefined) {
           maxTime = '&maxTime=' + encodeURIComponent(this.infobroadmaxTime)
    };

    var infobroadnum = this.infobroadcastnum;

    var url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-msg-log?sub_id='+sub_id;

    $.ajax({
        url: url,
        type: 'get',         //数据发送方式
        dataType: 'text',     //接受数据格式
        //contentType: "application/json",
        //accessType: "application/json",
        timeout:5000,
        data:{},
        beforeSend: function(XMLHttpRequest){
        },
        complete: function(XMLHttpRequest,textStatus){
        }
    }).done(function(resultStr){
        //console.log(result) 
        var result = eval('(' + resultStr + ')');
        //$("#infobroadnum").text(result.total);
        var data = result.data;
        var htmlStr = "";
        
        //for (var i = data.length - 1; i >= 0; i--) {
        for (var i = 0; i < data.length; i++) {
            infobroadnum ++;
            var currObj = data[i];   
            //if (i ==  data.length - 1 ) {
            if (i ==  0 ) {
                this.infobroadmaxTime = currObj.time;
                if ( this.infobroadmaxTime == undefined || this.infobroadmaxTime =="undefined") {this.infobroadmaxTime = 0}
            }
            htmlStr += '<div class="infobroadcastmessage">'
                    +    currObj.msg_importance+'消息('+currObj.time+')'+'：<br>'+currObj.msg_content
                    +  '</div>'
        }


        $("#infobroadcastcontentdiv").append(htmlStr);

        $("#infobroadcastcontentdiv").find('div.infobroadcastmessage').each(function(index, el) {
            if (index > 19) {
                $(el).remove();
            }
        });

        if (infobroadnum>0 && this.infobroadmaxTimeFirst == 0) {
            $("#infobroadnum").css('display', '');
            $("#infobroadnum").text(infobroadnum);
            this.infobroadcastnum = infobroadnum;
        };

        setInterval(this.infobroadcasData.bind(this),5*1000);
    }.bind(this));

};
CIIE.Map.prototype.infobroadcasData=function(){
    var sub_id = "";
    if (FROMMODEL == "ciie") {sub_id = "ipms.lsm.cg";}else{sub_id = "ipms.lsm.gl";};
    var maxTime = "";
    if (this.infobroadmaxTime != 0 && this.infobroadmaxTime != undefined) {
           maxTime = '&maxTime=' + encodeURIComponent(this.infobroadmaxTime)
    };
    //更新数据库中 maxTime 
    //this.infobroadupDatemaxtime(this.infobroadmaxTime);

    //清空数据操作
    var infobroadnum = this.infobroadcastnum;

    //var url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-msg-log?sub_id=ipms.lsm.cg&maxTime=2018-08-17%2016:38:56';
    var url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-msg-log?sub_id='+sub_id+maxTime;

    //var url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/area-re_cellByHotname?hotspot='+ encodeURIComponent(hot);
    $.ajax({
        url: url,
        type: 'get',         //数据发送方式
        dataType: 'text',     //接受数据格式
        //contentType: "application/json",
        //accessType: "application/json",
        timeout:5000,
        data:{},
        beforeSend: function(XMLHttpRequest){
        },
        complete: function(XMLHttpRequest,textStatus){
        }
    }).done(function(resultStr){
        //console.log(result) 
        var result = eval('(' + resultStr + ')');
        //$("#infobroadnum").text(result.total);
        var data = result.data;
        var htmlStr = "";
        if (data.length == 0) {
            //htmlStr = '<div class="infobroadcastmessage">暂无消息!</div>';
        };
        /*
          +'<div class="infobroadcastmessage">'
             +'消息公告(1小时前)：<br>保障现场应急车、指挥车、发电车、无人机已全部预开启，业务测试正常'
          +'</div>'
        */
        //for (var i = data.length - 1; i >= 0; i--) {
        for (var i = 0; i < data.length; i++) {    
            infobroadnum ++;
            var currObj = data[i];   
            //if (i ==  data.length - 1 ) {
            if (i ==  0 ) {
                this.infobroadmaxTime = currObj.time;
                if ( this.infobroadmaxTime == undefined || this.infobroadmaxTime =="undefined") {this.infobroadmaxTime = 0}
                //更新数据库中 maxTime 
                this.infobroadupDatemaxtime(this.infobroadmaxTime);
            }
            htmlStr += '<div class="infobroadcastmessage">'
                    +    currObj.msg_importance+'消息('+currObj.time+')'+'：<br>'+currObj.msg_content
                    +  '</div>'
        }
        $("#infobroadnum").text(infobroadnum);
        $("#infobroadcastcontentdiv").prepend(htmlStr);

        $("#infobroadcastcontentdiv").find('div.infobroadcastmessage').each(function(index, el) {
            if (index > 19) {
                $(el).remove();
            }
        });


        if (infobroadnum>0) {
            $("#infobroadnum").css('display', '');
        };
        this.infobroadcastnum = infobroadnum;
    }.bind(this));
};
CIIE.Map.prototype.infobroadupDatemaxtime=function(maxTime){
    var iphone = $.cookie('phoneNum')==null?"13000000000":$.cookie('phoneNum');
    var param = {
                    "tableName":"dm_co_ba_cfg_bs",
                    "type":"update",          //第一次插入时请使用insert
                    "conditions":["id"],
                    "data":{
                            "type":"maxTime",      //自定义的分类
                            "id":iphone,            //自定义的id
                            "content":maxTime
                    }
    };
    var url = LSMScreen.CacheDataManager.baseUrl +'/sml/update/common';
    $.ajax({
        url: url,
        type: 'post',         //数据发送方式
        dataType: 'josn',     //接受数据格式
        contentType: "application/json",
        //accessType: "application/json",
        //timeout:5000,
        data:JSON.stringify(param),
        beforeSend: function(XMLHttpRequest){
        },
        complete: function(XMLHttpRequest,textStatus){
        }
    }).done(function(resultStr){
        //var result = eval('(' + resultStr + ')');
        //var data = result.data;
        

    }.bind(this));

};

CIIE.Map.prototype.createTransCable=function(){
	var html ='<div id="optical" class="baseborderwin" style="display:none;background:rgba(1,0,69,0.75);width:800px;height:650px;position:absolute;right:120px;top:200px;">'
				+'<div class="horizontalRow" style="width:100%;line-height:48px;">'
					+'<div class="gc-icon-sptopo" style="margin-right:20px;"></div>'
					+'<div class="fontContentTitle" id="lineTopoName">传输光缆</div>'
					+'<div id="opticalclose" class="map-icon-close" style="float:right;cursor:pointer;"></div>'
				+'</div>'
				+'<div style="clear:both;"></div>'
					+'<div id="opticalRegioDiv" style="float:left;width:250px;height:565px;margin-top:20px;overflow-y:hidden;overflow-x:hidden;"></div>'
					+'<div id="opticalDiv" style="float:left;width:500px;height:565px;margin-top:20px;overflow-y:auto;overflow-x:hidden;"></div>'
			+'</div>'; 
	
	 $('#'+this.divId).parent().append(html);
	 $('#opticalclose').on('click',this.closeTransCableList.bind(this));
};
CIIE.Map.prototype.closeTransCableList=function(){
	$('#optical').css('display','none');
};
CIIE.Map.prototype.showTransCable=function(){
	$('#optical').css('display','block');
	
	if(this.OPTICAL_CACHE==null){
		this.cdm.getTransCables({},this.drawOptical.bind(this));
	}else{
		if(!this.map.hasLayer(this.opticalLayer)) this.map.addLayer(this.opticalLayer);
	}
	
};
CIIE.Map.prototype.closeTransCable=function(){
	$('#optical').css('display','none');
	$('#opticalCableCtrl').removeClass('mapCtrlItemSelected');
	
	if(this.map.hasLayer(this.opticalLayer)) this.map.removeLayer(this.opticalLayer);
	
};

CIIE.Map.prototype.drawOptical=function(result){
	if(this.map.hasLayer(this.opticalLayer)){
		try{
			this.map.removeLayer(this.opticalLayer);
		}catch(e){
			
		}
	}
	this.opticalLayer=new L.featureGroup();
	this.map.addLayer(this.opticalLayer);
	var list=result.data;
//	var colors=[
//	            '#EF0238','#86D102','#F8D00C','#6C2E9B','#D40270',
//	            '#FD7102','#039ED7','#9C52B3','#782132','#7EC7E7',
//	            '#CC99CC','#1D5E3C','#6474C1','#F591C5','#05AF4F',
//	            '#B25C43','#668238','#BB118E','#019AA2','#9EA44E',
//	            '#00E487','#76664D','#A3E2C7','#783849','#ED5736',
//	            '#2CB69B','#C2262A','#DAC280','#A77F73','#FF4401'
//	           ];
	var colors=[
	            '#24fb2f'
	           ];
	$('#opticalDiv').html('');
	var html='';
	var regionHtml="";
	this.OPTICAL_CACHE=[];
	this.OPTICAL_DATA_CACHE=list;
	this.OPTICAL_EXIST_MAP={};
	var regionMap={};
	var firstRegion="青浦区";
	for(var i=0;i<list.length;i++){
		var record=list[i];
		if(isNaN(record.TOP_LATITUDE)||isNaN(record.TOP_LONGITUDE)
				||isNaN(record.END_LATITUDE)||isNaN(record.END_LONGITUDE)
				||record.TOP_LATITUDE==null||record.TOP_LONGITUDE==null
				||record.END_LATITUDE==null||record.END_LONGITUDE==null){
			continue;
		}
		var name=record.CABLE_SEG_NAME;
		var cityName=record.CITY_NAME;
		if(firstRegion=="") firstRegion=cityName;
		var showName=name;
		var point0=[record.TOP_LATITUDE,record.TOP_LONGITUDE];
		var point1=[record.END_LATITUDE,record.END_LONGITUDE];
		var latlngs=[point0,point1];
		var color=colors[i%colors.length];
		var polyline = L.polyline(latlngs, {color:color,weight:5,opacity:0.8});
		if(firstRegion==cityName){
			polyline.addTo(this.opticalLayer);
			this.OPTICAL_EXIST_MAP[i]=true;
		}
		this.OPTICAL_CACHE.push(polyline);
		if(showName.length>14){
			showName=showName.substring(0,14)+'..';
		}
		var lineChecked=firstRegion==cityName?'checked="true"':'';
		html+='<div style="line-height:30px;font-size:28px;width:500px;height:35px;overflow:hidden;">'
			+'<div style="margin-top:10px;float:left;background:'+color+';width:20px;height:20px;"></div>'
			+'<div style="float:left;"><input class="opticalCk" index="'+i+'" type="checkbox" style="width:20px;height:20px;margin-left:10px;" '+lineChecked+' /></div>'
			+'<div style="float:left;margin-left:10px;width:400px;" title="'+name+'">'+showName+'</div>'
			+'<div style="clear:both;"></div>'
			+'</div>';
		
		if(regionMap[cityName]==null){
			regionMap[cityName]=true;
			var regionChecked=firstRegion==cityName?'checked="true"':'';
			regionHtml+='<div style="line-height:30px;font-size:28px;width:200px;height:35px;overflow:hidden;">'
				+'<div style="float:left;"><input class="opticalCkRegion" region="'+cityName+'" type="checkbox" style="width:20px;height:20px;margin-left:10px;" '+regionChecked+' /></div>'
				+'<div style="float:left;margin-left:10px;width:150px;" title="'+cityName+'">'+cityName+'</div>'
				+'<div style="clear:both;"></div>'
				+'</div>';
		}else{
//			regionHtml+='<div style="line-height:30px;font-size:28px;width:100px;height:35px;overflow:hidden;">'
//				+'</div>';
		}
	}
	if(list.length>0){
		$('#optical').css('display','block');
	}
	
	$('#opticalRegioDiv').html(regionHtml);
	$('#opticalDiv').html(html);
	$('.opticalCk').on('change',this.opticalCheckBoxHandler.bind(this));
	$('.opticalCkRegion').on('change',this.opticalRegionCheckBoxHandler.bind(this));
	//this.setDivMovable($('#optical')[0]);
};
CIIE.Map.prototype.opticalRegionCheckBoxHandler=function(e){
	var region=$(e.currentTarget).attr('region');
	var list = this.OPTICAL_DATA_CACHE;
	var isChecked = $(e.currentTarget).is(":checked"); 
	var style={};
	if(isChecked){
		style={opacity:0.8};
	}else{
		style={opacity:0};
		
	}
	for(var i=0;i<list.length;i++){
		if(list[i].CITY_NAME==region){
			$('.opticalCk:eq('+i+')').prop("checked",isChecked);
			var polyline = this.OPTICAL_CACHE[i];
			if(this.OPTICAL_EXIST_MAP[i]==null){
				this.OPTICAL_EXIST_MAP[i]=true;
				polyline.addTo(this.opticalLayer);
			}
			polyline.setStyle(style);
		}
	}
};
CIIE.Map.prototype.opticalCheckBoxHandler=function(e){
	var index=$(e.currentTarget).attr('index');
	var polyline = this.OPTICAL_CACHE[index];
	if(this.OPTICAL_EXIST_MAP[index]==null){
		this.OPTICAL_EXIST_MAP[index]=true;
		polyline.addTo(this.opticalLayer);
	}
	var isChecked = $(e.currentTarget).is(":checked"); 
	if(isChecked){
		polyline.setStyle({opacity:0.8});
	}else{
		polyline.setStyle({opacity:0});
	}
};