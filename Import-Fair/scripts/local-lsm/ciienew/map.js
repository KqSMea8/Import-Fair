//全网率值(值越大 颜色越淡)
var allNetRate_yhs = 15;
var allNetRate_ll = 15;
var allNetRate_hwl = 15;
//场景率值(值越大 颜色越淡)
var cjRate_yhs = 2/3;   //2
var cjRate_ll = 0.14;    //2
var cjRate_hwl = 8;     //4
//保障区域率值(值越大 颜色越淡)
var allRate_yhs = 2.5;
var allRate_ll = 0.7;
var allRate_hwl  = 2;




function showAPList(hh,state){
	var url='../maptip/aplist.jsp?hall='+encodeURIComponent(hh)+'&state='+encodeURIComponent(state);
	var html='<div id="apListWin" style="position:absolute;top:50%;left:50%;margin-top:-400px;margin-left:-500px;width:1000px;height:900px;overflow:hidden;display:block;">'
	 		+'<iframe id="apListFrame" src="'+url+'" frameborder="0" allowtransparency="true" style="border-radius:10px;width:1000px;height:900px;"></iframe>'
	 		+'<div id="apListClose" class="map-icon-close" style="position:absolute;right:5px;top:5px;"></div>'
	     +'</div>';
	if($('#apListWin').length==0){
		$('body').parent().append(html);
		$('#apListClose').on('click',function(){
			$('#apListWin').hide();
		});
	}else{
		$('#apListWin').show();
		$('#apListFrame').attr('src',url);
	}
}



function showCellDetail(cell_name,cell_nt,lacci){
    var url='../maptip/deviceDetailNew.jsp?hotspot='+encodeURIComponent(hotspot)
                +'&cellname='+encodeURIComponent(cell_name)
                +'&nettype='+encodeURIComponent(cell_nt)
                +'&lacci='+encodeURIComponent(lacci)


    //var url='../maptip/aplist.jsp?hall='+encodeURIComponent(hh)+'&state='+encodeURIComponent(state);
    var html='<div id="cellDetailListWin" style="position:absolute;top:50%;left:50%;margin-top:-376px;margin-left:-500px;width:1000px;height:900px;overflow:hidden;display:block;">'
            +'<iframe id="cellDetailListFrame" src="'+url+'" frameborder="0" allowtransparency="true" style="border-radius:10px;width:1000px;height:900px;"></iframe>'
            +'<div id="cellDetailListClose" class="map-icon-close" style="position:absolute;right:5px;top:5px;"></div>'
         +'</div>';
    if($('#cellDetailListWin').length==0){
        $('body').parent().append(html);
        $('#cellDetailListClose').on('click',function(){
            $('#cellDetailListWin').hide();
        });
    }else{
        $('#cellDetailListWin').show();
        $('#cellDetailListFrame').attr('src',url);
    }
}













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
CIIE.Map.prototype.heatMapOfAll4BigClass=null;//热力图数据(4大类)
CIIE.Map.prototype.heatMapOfAllNet=null;     //热力图数据(全网)
CIIE.Map.prototype.heatKpi='用户数';//热力图数据
CIIE.Map.prototype.heatKpiOfAll='用户数';//热力图数据全量
CIIE.Map.prototype.heatKpiOfAllNet='用户数';//热力图数据全网
CIIE.Map.prototype.heatKpiOfRoad='用户数';//路段热力图
CIIE.Map.prototype.heatTimeLine=[];//热力图数据
CIIE.Map.prototype.heatTimeMap={};//热力图数据
CIIE.Map.prototype.infobroadcastnum=0;  //信息播报基数
CIIE.Map.prototype.infobroadmaxTime=0;  //信息播报最大时间
CIIE.Map.prototype.infobroadmaxTimeFirst=0;  //信息播报最大时间

CIIE.Map.prototype.markerHotelArr=[];  //存放酒店图标marker
CIIE.Map.prototype.markerAirplaneArr=[];  //存放飞机图标marker
CIIE.Map.prototype.markerTrainArr=[];  //存放火车头图标marker
CIIE.Map.prototype.markerJufangArr=[];  //存放局房图层图标marker

CIIE.Map.prototype.isLocationOfAllFctor=true;  //保障要素全量是否要定位


CIIE.Map.prototype.pdtitle = null;
CIIE.Map.prototype.hqtitle = null;
CIIE.Map.prototype.hqttitle = null;

CIIE.Map.prototype.loadHotMapFirstNum=0;  //第一次加载热力图次数
CIIE.Map.prototype.loadHotalFirstNum=0;  //第一次加载宾馆不定位

CIIE.Map.prototype.specialLayerHotelNum = []; // 存放随机数量的 酒店
CIIE.Map.prototype.hotelSelectObj = []; //  存放选中的酒店


CIIE.Map.prototype.commandVehicleConfig = {}; //  存放应急车种指挥车的属性, 供单独指挥车使用


CIIE.Map.prototype.hotMapColorCircle = []; //  存放热力图色环半径值




CIIE.Map.prototype.locationMap={
    'J-国家会展中心':{lon:121.308613,lat:31.195766},
    'J-外滩':{lon:121.49665,lat:31.24305},
    'J-上海站':{lon:121.462188,lat:31.256074},
    'J-上海南站':{lon:121.435742,lat:31.159293},
    'J-虹桥站':{lon:121.327424,lat:31.200322},
    'J-虹桥机场':{lon:121.345336,lat:31.201449},
    'J-浦东机场':{lon:121.81179,lat:31.1573},
    'J-虹桥站-国家会展中心':{lon:121.30518,lat:31.18941},
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
        'J-虹桥站':true,
        'J-浦东机场':true,
        'J-外滩':true
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
CIIE.Map.prototype.shangxingLayerTDD_D_C=null;
CIIE.Map.prototype.shangxingLayerTDD_E_C=null;
CIIE.Map.prototype.shangxingLayerTDD_F_C=null;
CIIE.Map.prototype.shangxingLayerFDD_S_C=null;
CIIE.Map.prototype.shangxingLayer900M_C=null;
CIIE.Map.prototype.shangxingLayer1800M_C=null;


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
CIIE.Map.prototype.specialLayer_jufang_traffic=null;


CIIE.Map.prototype.specialLayer_pudongjichang_line=null;
CIIE.Map.prototype.specialLayer_hongqiaojichang_line=null;
CIIE.Map.prototype.specialLayer_huhanggaotie_line=null;
CIIE.Map.prototype.specialLayer_jinghuhuning_line=null;
CIIE.Map.prototype.specialLayer_hongqiaohuochezhan_line=null;
CIIE.Map.prototype.specialLayer_shanghaizhan_line=null;
CIIE.Map.prototype.specialLayer_shanghainanzhan_line=null;

CIIE.Map.prototype.specialLayer_all_line=null;



CIIE.Map.prototype.heatMapLayerOfRoad=null; //路段热力图 (分段渲染颜色)











CIIE.Map.prototype.marker2G=null;
CIIE.Map.prototype.marker2G_l=null;
CIIE.Map.prototype.marker2G_trouble=null;
CIIE.Map.prototype.marker3G=null;
CIIE.Map.prototype.marker4G=null;
CIIE.Map.prototype.marker4G_trouble=null;
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
    this.initHotMapColorCircle();
    this.initMap();
    this.initMarker();
    
    this.updateHotspot(this.hotspot,FROMMODEL!='ciie');
    if(LOCATECELL=="true"){
    	this.locateCellFirstAddCell(LACCI,CELLNAME,LAT,LON);
    }else if(hotspot==CIIE.MAP_HOT||hotspot=="null"){
    	if(FROMMODEL!='ciie'){
            this.map.setView([31.12884, 121.41756], 17);
            if(this.ciieImageAdded==null){
                //this.addCiieImage();
                this.addPolygon();
            }
            //this.map.setView([31.12884, 121.41756], 12);
            this.map.setView([31.2777, 121.431933], 12);
            //this.map.setView([31.195179, 121.306601], 14);
        }else{
            this.map.setView([31.195179, 121.306601], 17);
            this.addPolygon();
        }
    }
    
    
    
    
    this.createInfoWins();
    this.createCtrlBtns();
    this.createLiveVideo();
    this.createRoomVideo();  //机房视频
    this.createCoreNet();
    this.createTransCable();
    this.createPlaySelector();
    this.createHotMapMenue1();
    this.createHotMapMenue2();
    this.createHotMapMenue3();   //全网热力图
    this.createHotMapMenue4();   //路段热力图(分段渲染)

    
    
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
    this.marker2G_trouble=L.icon({
        iconUrl: this.ctx+'/static/styles/local-lsm/map/2GT.png',
        iconSize: [48, 48]
    });
    this.marker2G_l=L.icon({
        iconUrl: this.ctx+'/static/styles/local-lsm/map/2GS.png',
        iconSize: [48, 48],
        //iconAnchor: [24,42],
        //className:'addSearchStyle'
    });
    this.marker3G=L.icon({
        iconUrl: this.ctx+'/static/styles/local-lsm/map/3GS.png',
        iconSize: [48, 48]
    }); 
    this.marker4G=L.icon({
        iconUrl: this.ctx+'/static/styles/local-lsm/map/4GS.png',
        iconSize: [48, 48]
    });
    this.marker4G_trouble=L.icon({
        iconUrl: this.ctx+'/static/styles/local-lsm/map/4GT.png',
        iconSize: [48, 48]
    });
    this.marker4G_l=L.icon({
        iconUrl: this.ctx+'/static/styles/local-lsm/map/4GS.png',
        iconSize: [48, 48],
        //iconAnchor: [24,42],
        //className:'addSearchStyle'
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
    this.markerBaseRoom_green = L.icon({
        iconUrl: this.ctx+'/static/styles/local-lsm/map/BaseRoom_green.png',
        iconSize: [48, 48]
    });
    this.markersJKSpecialLine = L.icon({
        iconUrl: this.ctx+'/static/styles/local-lsm/map/JKSpecialLine.png',
        iconSize: [48, 48]
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
        //iconUrl: this.ctx+'/static/styles/local-lsm/map/pin.gif',
        iconUrl: this.ctx+'/static/styles/local-lsm/map/pin.png',
        className:'addSearchStyle',
        iconSize: [48, 48],
        //iconAnchor: [24,42],
    });
    
    this.markerAIRPLANE = L.icon({
        iconUrl: this.ctx+'/static/styles/local-lsm/map/airplane_green.png',
        iconSize: [128,128]
        //iconSize: [100,100]
    });
    this.markerTRAIN = L.icon({
        iconUrl: this.ctx+'/static/styles/local-lsm/map/train_green.png',
        iconSize: [128,128]
        //iconSize: [100,100]
    });
    this.markerHOTEL = L.icon({
        iconUrl: this.ctx+'/static/styles/local-lsm/map/hotel_green.png',
        iconSize: [100,100]
    });
    this.markerHOTEL_NoBorder = L.icon({
        iconUrl: this.ctx+'/static/styles/local-lsm/map/hotelOld.png',
        iconSize: [100,100]
    });
    this.markerBaseStation=L.icon({
        iconUrl: this.ctx+'/static/styles/local-lsm/map/BaseStation_green.png',
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
            iconUrl: this.ctx+'/static/styles/local-lsm/map/MM_green_'+i+'.png',
            //iconSize: [48, 48]
            iconSize: [96, 96]
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







CIIE.Map.prototype.initHotMapColorCircle=function(){
var url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-cfg-hotchar-qry';
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
            var cfg_content_str = data.CFG_CONTENT;
            var cfg_content = eval('(' + cfg_content_str + ')')[0];

            var newArr = [];
            newArr.push((cfg_content.red)[1]);
            newArr.push((cfg_content.yellow)[1]);
            newArr.push((cfg_content.green)[1]);
            newArr.push((cfg_content.blue)[1]);

            this.hotMapColorCircle = newArr;




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
    this.map.on('zoomend', this.rerenderHeatMapOfAllNet.bind(this));//重新绘制热力图(全量)
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
    var iconSizeFont = [294*12/15,81*12/15];
    switch (curZoom){
        case 10:
            iconSize = [20,20];
            iconSizeFont = [294*4/15,81*4/15];
            break;
        case 11:
            iconSize = [30,30];
            iconSizeFont = [294*5/15,81*5/15];
            break;
        case 12:
            iconSize = [40,40];
            iconSizeFont = [294*6/15,81*6/15];
            break;
        case 13:
            iconSize = [50,50];
            iconSizeFont = [294*7/17,81*5/15];
            break;
        case 14:
            iconSize = [60,60];
            iconSizeFont = [294*7/15,81*7/15];
            break;
        case 15:
            iconSize = [100,100];
            iconSizeFont = [294*9/15,81*9/15];
            break;
        case 16:
            iconSize = [100,100];
            iconSizeFont = [294*10/15,81*10/15];
            break;
        case 17:
            iconSize = [100,100];
            iconSizeFont = [294*11/15,81*11/15];
            break;
        default:
            iconSize = [100,100];
            iconSizeFont = [294*12/15,81*12/15];
            break;
    }

    //修改酒店
    var markerArr1 = this.markerHotelArr;
    for (var i = 0; i < markerArr1.length; i++) {
        var currObj = markerArr1[i];
        var icon = L.icon({
                iconUrl: this.ctx+'/static/styles/local-lsm/map/hotel_green.png',
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
                iconUrl: this.ctx+'/static/styles/local-lsm/map/airplane_green.png',
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
                iconUrl: this.ctx+'/static/styles/local-lsm/map/train_green.png',
                //iconSize: [100,100]
                iconSize: iconSize
        });
        currObj.setIcon(icon);
    };

    //修改局房
    var markerArr4 = this.markerJufangArr;
    for (var i = 0; i < markerArr4.length; i++) {
        var currObj = markerArr4[i];
        var icon = L.icon({
                iconUrl: this.ctx+'/static/styles/local-lsm/map/BaseRoom_green.png',
                //iconSize: [100,100]
                iconSize: iconSize
        });
        currObj.setIcon(icon);
    };

   
    //修改车站 那几个字
    if (this.pdtitle != null && this.hqtitle != null && this.hqttitle != null) {
        var icon1 = L.icon({
                iconUrl: this.ctx+'/static/styles/local-lsm/map/pdtitle.png',
                //iconSize: [100,100]
                iconSize: iconSizeFont
        });
        this.pdtitle.setIcon(icon1);

        var icon2 = L.icon({
                iconUrl: this.ctx+'/static/styles/local-lsm/map/hqtitle.png',
                //iconSize: [100,100]
                iconSize: iconSizeFont
        });
        this.hqtitle.setIcon(icon2);

        var icon3 = L.icon({
                iconUrl: this.ctx+'/static/styles/local-lsm/map/hqttitle.png',
                //iconSize: [100,100]
                iconSize: iconSizeFont
        });
        this.hqttitle.setIcon(icon3);
    }

};











CIIE.Map.prototype.update=function(){
    this.cdm.getHotspotKpi({},this.updateKpis.bind(this));
};

CIIE.Map.prototype.initLayers=function(){
    if(this.map.hasLayer(this.markersLayer2G)) this.map.removeLayer(this.markersLayer2G);
    if(this.map.hasLayer(this.markersLayerTDD)) this.map.removeLayer(this.markersLayerTDD);
    if(this.map.hasLayer(this.markersLayerFDD)) this.map.removeLayer(this.markersLayerFDD);
    if(this.map.hasLayer(this.markersLayer5G)) this.map.removeLayer(this.markersLayer5G);
    if(this.map.hasLayer(this.markersLayerTroubleCell)) this.map.removeLayer(this.markersLayerTroubleCell);
    if(this.map.hasLayer(this.markersLayerBaseRoom)) this.map.removeLayer(this.markersLayerBaseRoom);
    if(this.map.hasLayer(this.markersLayerJKSpecialLine)) this.map.removeLayer(this.markersLayerJKSpecialLine);

    if(this.map.hasLayer(this.shangxingLayer)) this.map.removeLayer(this.shangxingLayer);
    if(this.map.hasLayer(this.shangxingLayerTDD_D)) this.map.removeLayer(this.shangxingLayerTDD_D);
    if(this.map.hasLayer(this.shangxingLayerTDD_E)) this.map.removeLayer(this.shangxingLayerTDD_E);
    if(this.map.hasLayer(this.shangxingLayerTDD_F)) this.map.removeLayer(this.shangxingLayerTDD_F);
    if(this.map.hasLayer(this.shangxingLayerFDD_S)) this.map.removeLayer(this.shangxingLayerFDD_S);
    if(this.map.hasLayer(this.shangxingLayer900M)) this.map.removeLayer(this.shangxingLayer900M);
    if(this.map.hasLayer(this.shangxingLayer1800M)) this.map.removeLayer(this.shangxingLayer1800M);

    if(this.map.hasLayer(this.shangxingLayerTDD_D_C)) this.map.removeLayer(this.shangxingLayerTDD_D_C);
    if(this.map.hasLayer(this.shangxingLayerTDD_E_C)) this.map.removeLayer(this.shangxingLayerTDD_E_C);
    if(this.map.hasLayer(this.shangxingLayerTDD_F_C)) this.map.removeLayer(this.shangxingLayerTDD_F_C);
    if(this.map.hasLayer(this.shangxingLayerFDD_S_C)) this.map.removeLayer(this.shangxingLayerFDD_S_C);
    if(this.map.hasLayer(this.shangxingLayer900M_C)) this.map.removeLayer(this.shangxingLayer900M_C);
    if(this.map.hasLayer(this.shangxingLayer1800M_C)) this.map.removeLayer(this.shangxingLayer1800M_C);
    
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

    if(this.map.hasLayer(this.heatMapLayerOfRoad)) this.map.removeLayer(this.heatMapLayerOfRoad);
    
    this.opticalLayer = new L.featureGroup();
    this.markersLayer2G = new L.featureGroup();
    this.markersLayerTDD = new L.featureGroup();
    this.markersLayerFDD = new L.featureGroup();
    this.markersLayer5G = new L.featureGroup();
    //this.markersLayerTroubleCell = new L.featureGroup();
    this.markersLayerBaseRoom = new L.featureGroup();
    this.markersLayerJKSpecialLine = new L.featureGroup();


    this.shangxingLayer = new L.featureGroup();
    this.shangxingLayerTDD_D = new L.featureGroup();
    this.shangxingLayerTDD_E = new L.featureGroup();
    this.shangxingLayerTDD_F = new L.featureGroup();
    this.shangxingLayerFDD_S = new L.featureGroup();
    this.shangxingLayer900M = new L.featureGroup();
    this.shangxingLayer1800M = new L.featureGroup();

    this.shangxingLayerTDD_D_C = new L.featureGroup();
    this.shangxingLayerTDD_E_C = new L.featureGroup();
    this.shangxingLayerTDD_F_C = new L.featureGroup();
    this.shangxingLayerFDD_S_C = new L.featureGroup();
    this.shangxingLayer900M_C = new L.featureGroup();
    this.shangxingLayer1800M_C = new L.featureGroup();
    
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
    this.heatMapLayerOfRoad = new L.featureGroup();


    
    this.markerClusters = L.markerClusterGroup({
        chunkedLoading: true, maxClusterRadius: 50, /*disableClusteringAtZoom: 17,*/ zoomToBoundsOnClick: true, spiderfyOnMaxZoom: true
    });


};
CIIE.Map.prototype.showMapPosition=function(e){
    console.log(e.latlng);

    //隐藏应急车右键
    $(".rightKeyStyle").parent('div.leaflet-popup-pane').empty();



    //点击空白处隐藏菜单栏
    //if (e.latlng.lng < 121.612456) {  
    if (e.containerPoint.x != -5) {  
        this.hideAllMenue();
    } //if

    //隐藏图例
    if (e.containerPoint.x < 2291) {  
        $("#hotMapMenue1").hide();
        $("#hotMapMenue2").hide();
        $("#hotMapMenue3").hide();
        $("#hotMapMenue4").hide();
    } //if
};

//隐藏菜单
CIIE.Map.prototype.hideAllMenue=function(){
    $('.mapCtrlBtns').removeClass('glowSelected_yaosu')
                     .removeClass('glowSelected_ziyuan')
                     .removeClass('glowSelected_xingneng')
                     .removeClass('glowSelected_gongneng')
                     .removeClass('glowSelected_tuopo');


    $('div.glowSelected').removeClass('glowSelected');
    $('.mapCtrlContent').css('display', 'none');
    
    //信息播报也隐藏
    var infobroadcastShowFlag = $('#infobroadcast').css('display');
    if(infobroadcastShowFlag != 'none'){
        this.infobroadcastnum = 0;
        $("#infobroadnum").css('display', 'none');
        $('#infobroadcast').css('display', 'none');
    };

}




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
                +'<div id="redFontTiShi"  class="div-custom-wx">'
                    +'<span id="modifyTimeName"></span>'
                    +'<span style="color:red">只有场景热力图才支持回放功能</span>'
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
                    //+'<div style="float: left;"><span id="videoTitleSpan" class="videoTitleSpan">上海进博会交易团成立四大采购商联盟</span></div>'
                    +'<div style="float: left;"><span id="videoTitleSpan" class="videoTitleSpan">现场视频</span></div>'
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


// add video Room div
CIIE.Map.prototype.createRoomVideo=function(){
    var html='<div id="roomVideo" class="liveVideo_big">'
                +'<img style="position:absolute;width:100%;height:100%;pointer-events: none;" src="'+this.ctx+'/static/styles/local-lsm/map/videoBackFrame.png">'
                +'<div id="roomVideoTitleBar" class="liveVideoTitleBar_big">'
                    +'<div id="videoTitle" class="videoTitle_big"></div>'
                    +'<div style="float: left;"><span id="roomVideoTitleSpan" class="videoTitleSpan_big">机房1</span></div>'
                    +'<div id="roomVideo_winclose" class="liveVideo_winclose_big"></div>'
                    +'<div id="roomVideo_set" values="0" title="设置" style="display:none" class="setIcon001" onclick="CIIE.Map.prototype.showSetIframe()"></div>'
                +'</div>'
                +'<div  class="chenggaodu_big">'
                +'</div>'
                +'<div class="videoContent_big" style="">'
                    +'<iframe id="roomVideoIframe" src="" frameborder="0" style="width:100%;height:100%"></iframe>'
                    +'<iframe id="roomVideoIframeOfset" src="" frameborder="0" style="width:100%;height:100%"></iframe>'
                +'</div>'
            +'</div>';
    
    $('#'+this.divId).parent().append(html);
    //$('#liveVideo_winctrl').on('click',this.playLiveVideoCtrl.bind(this));
    $('#roomVideo_winclose').on('click',this.hideRoomVideoCtrl.bind(this));
    
    $('#roomVideoTitleBar').on('mousedown',this.liveVideoTitleBarMouseDown.bind(this));
    
};
CIIE.Map.prototype.showSetIframe=function(){
    var isShow = $("#roomVideo_set").attr('values');

    if (isShow == "0") {  //显示
        $("#roomVideo_set").attr('values',"1");
        $("#roomVideo_set").removeClass().addClass('setIcon001N');
        $("#roomVideoIframe").hide();
        $("#roomVideoIframeOfset").show();
        var src = $("#roomVideoIframe").attr('src');

        if (src.indexOf('A0MK') > -1) {
            $('#roomVideoIframeOfset').attr('src', 'http://100.93.107.112/doc/page/preview.asp');
        };
        if (src.indexOf('A0NC') > -1) {
            $('#roomVideoIframeOfset').attr('src', 'http://100.93.107.110/doc/page/preview.asp');
        };
        if (src.indexOf('B0MK') > -1) {
            $('#roomVideoIframeOfset').attr('src', 'http://100.93.107.111/doc/page/preview.asp');
        };
        if (src.indexOf('B0NC') > -1) {
            $('#roomVideoIframeOfset').attr('src', 'http://100.93.107.113/doc/page/preview.asp');
        };
        if (src.indexOf('C0MK') > -1) {
            $('#roomVideoIframeOfset').attr('src', 'http://100.93.106.113/doc/page/preview.asp');
        };
        if (src.indexOf('C0NC') > -1) {
            $('#roomVideoIframeOfset').attr('src', 'http://100.93.106.114/doc/page/preview.asp');
        };
        if (src.indexOf('D0MK') > -1) {
            $('#roomVideoIframeOfset').attr('src', 'http://100.93.106.112/doc/page/preview.asp');
        };
        if (src.indexOf('E1MK') > -1) {
            $('#roomVideoIframeOfset').attr('src', 'http://100.93.107.114/doc/page/preview.asp');
        };
        if (src.indexOf('E1NC') > -1) {
            $('#roomVideoIframeOfset').attr('src', 'http://100.93.107.115/doc/page/preview.asp');
        };

    }else{//隐藏
        $("#roomVideo_set").attr('values',"0");
        $("#roomVideo_set").removeClass().addClass('setIcon001');

        $("#roomVideoIframe").show();
        $("#roomVideoIframeOfset").hide();
        $("#roomVideoIframeOfset").attr('src', '');

    }


   

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
//********关联的传输设备
//var transmissionEquipmentUrl = BASEPATH+'/pages/local-lsm/topo/deviceInfo.jsp?deviceName='+encodeURIComponent("汇聚怒江02/SHNJ11-2T/3-18-A-1/PTNZX9008");
var transmissionEquipmentUrl = BASEPATH+'/pages/local-lsm/topo/deviceInfo.jsp?deviceName='+encodeURIComponent("");
html +='<div id="transmissionEquipment" class="equipmenttopo">'
                +'<div class="topohbdrgfsdfvasg">'
                    +'<div class="toTraditionTopoDivTitle" style="float: left;"></div>'
                    +'<div style="float: left;"><span class="toTraditionTopoDivSpan">设备详情</span></div>'
                    +'<div id="totransmissionEquipmentDiv_winclose" class="toTraditionTopoDiv_winclose" style="float: right;"></div>'
                +'</div>'
            +'<div class="topogrfsasfw">'
                // +'<div style="float: left;"><span id="corenetSpan" class="corenetSpan"></span></div>'
                // +'<div id="corenet_winclose" class="corenet_winclose"></div>'
                +'<iframe id="transmissionEquipmentIframe" src="'+transmissionEquipmentUrl+'" frameborder="0" style="width:100%;height:93%"></iframe>'
            +'</div>'
        +'</div>'; 
//********关联的传输子网 - 西区中博会
var transmissionSubnet_1Url = BASEPATH+'/pages/local-lsm/topo/cmnetTopo.jsp?topoName='+encodeURIComponent("4A7407FF-A497-B47A-7322-AE15A8490B58");
html +='<div id="transmissionSubnet_1" class="corenettopo">'
                +'<div class="topohbdrgfsdfvasg">'
                    +'<div class="toTraditionTopoDivTitle" style="float: left;"></div>'
                    +'<div style="float: left;"><span class="toTraditionTopoDivSpan">传输子网详情 - 西区中博会</span></div>'
                    +'<div id="totransmissionSubnet_1Div_winclose" class="toTraditionTopoDiv_winclose" style="float: right;"></div>'
                +'</div>'
            +'<div class="topogrfsasfw">'
                // +'<div style="float: left;"><span id="corenetSpan" class="corenetSpan"></span></div>'
                // +'<div id="corenet_winclose" class="corenet_winclose"></div>'
                +'<iframe id="transmissionSubnet_1Iframe" src="'+transmissionSubnet_1Url+'" frameborder="0" style="width:100%;height:100%"></iframe>'
            +'</div>'
        +'</div>';             
//********关联的传输子网 - 青浦虹桥205环 
var transmissionSubnet_2Url = BASEPATH+'/pages/local-lsm/topo/cmnetTopo.jsp?topoName='+encodeURIComponent("B1C994BE-D16B-736C-3475-AE15D7120C40");
html +='<div id="transmissionSubnet_2" class="corenettopo">'
                +'<div class="topohbdrgfsdfvasg">'
                    +'<div class="toTraditionTopoDivTitle" style="float: left;"></div>'
                    +'<div style="float: left;"><span class="toTraditionTopoDivSpan">传输子网详情 - 青浦虹桥205环 </span></div>'
                    +'<div id="totransmissionSubnet_2Div_winclose" class="toTraditionTopoDiv_winclose" style="float: right;"></div>'
                +'</div>'
            +'<div class="topogrfsasfw">'
                // +'<div style="float: left;"><span id="corenetSpan" class="corenetSpan"></span></div>'
                // +'<div id="corenet_winclose" class="corenet_winclose"></div>'
                +'<iframe id="transmissionSubnet_2Iframe" src="'+transmissionSubnet_2Url+'" frameborder="0" style="width:100%;height:100%"></iframe>'
            +'</div>'
        +'</div>';  


//********无线覆盖   
//var transmissionNetUrl = BASEPATH+'/pages/local-lsm/topo/cmnetTopo.jsp?topoName='+encodeURIComponent("C469948E-49F5-75A9-3082-AD4A0D5DB120");
//var wirelessCoverageUrl = 'http://10.11.60.172:6790/mtnxnew/home/login';
//var wirelessCoverageUrl = 'http://10.222.42.22:8080/mtnxnew/session/loginsso?hidelogo=1&hideframe=1&app=6cc03ad0-4133-edb4-129e-cca5e61a8523&name=yT38Yza7iYOK/dBoDosJTw==&password=g2Fa6Ojgstp/fXmEfN8G3Q==';
var wirelessCoverageUrl = BASEPATH.replace("LsmScreen","") + 'mtnxnew/session/loginsso?hidelogo=1&hideframe=1&app=6cc03ad0-4133-edb4-129e-cca5e61a8523&name=yT38Yza7iYOK/dBoDosJTw==&password=g2Fa6Ojgstp/fXmEfN8G3Q==';
html +='<div id="wirelessCoverage" class="corenettopo">'
                +'<div class="topohbdrgfsdfvasg">'
                    +'<div id="wirelessCoverageTitle" class="toTraditionTopoDivTitle" style="float: left;"></div>'
                    +'<div style="float: left;"><span id="wirelessCoverageSpan" class="toTraditionTopoDivSpan">无线覆盖</span></div>'
                    +'<div id="wirelessCoverageDiv_winclose" class="toTraditionTopoDiv_winclose" style="float: right;"></div>'
                +'</div>'
            +'<div id="corenetTitleBar" class="topogrfsasfw">'
                // +'<div style="float: left;"><span id="corenetSpan" class="corenetSpan"></span></div>'
                // +'<div id="corenet_winclose" class="corenet_winclose"></div>'
                +'<iframe id="cmnetIframe" src="'+wirelessCoverageUrl+'" frameborder="0" style="width:100%;height:100%"></iframe>'
            +'</div>'
        +'</div>'; 
//********5G应用  
//var transmissionNetUrl = BASEPATH+'/pages/local-lsm/topo/cmnetTopo.jsp?topoName='+encodeURIComponent("C469948E-49F5-75A9-3082-AD4A0D5DB120");
var _5GApplicationUrl = 'https://officeddns.f3322.net:8090/gisnokia/map_V1/index.html';
html +='<div id="_5GApplication" class="corenettopo">'
                +'<div class="topohbdrgfsdfvasg">'
                    +'<div id="_5GApplicationTitle" class="toTraditionTopoDivTitle" style="float: left;"></div>'
                    +'<div style="float: left;"><span id="wirelessCoverageSpan" class="toTraditionTopoDivSpan">5G应用</span></div>'
                    +'<div id="_5GApplicationDiv_winclose" class="toTraditionTopoDiv_winclose" style="float: right;"></div>'
                +'</div>'
            +'<div id="corenetTitleBar" class="topogrfsasfw">'
                // +'<div style="float: left;"><span id="corenetSpan" class="corenetSpan"></span></div>'
                // +'<div id="corenet_winclose" class="corenet_winclose"></div>'
                +'<iframe id="cmnetIframe" src="'+_5GApplicationUrl+'" frameborder="0" style="width:100%;height:100%"></iframe>'
            +'</div>'
        +'</div>'; 


//********备品备件   
var sparepartsUrl = BASEPATH+'/pages/local-lsm//maptip/sparePart.jsp';
html +='<div id="spareparts" class="corenettopo">'
                +'<div class="topohbdrgfsdfvasg">'
                    +'<div id="sparepartsTitle" class="toTraditionTopoDivTitle" style="float: left;"></div>'
                    +'<div style="float: left;"><span id="sparepartsSpan" class="toTraditionTopoDivSpan">备品备件</span></div>'
                    +'<div id="sparepartsDiv_winclose" class="toTraditionTopoDiv_winclose" style="float: right;"></div>'
                +'</div>'
            +'<div id="corenetTitleBar" class="topogrfsasfw">'
                // +'<div style="float: left;"><span id="corenetSpan" class="corenetSpan"></span></div>'
                // +'<div id="corenet_winclose" class="corenet_winclose"></div>'
                +'<iframe id="cmnetIframe" src="'+sparepartsUrl+'" frameborder="0" style="width:100%;height:100%"></iframe>'
            +'</div>'
        +'</div>'; 






//处理事件    
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
    //无线覆盖
    $('#wirelessCoverageDiv_winclose').on('click',this.hidewirelessCoverageCtrl.bind(this));
    //5G应用
    $('#_5GApplicationDiv_winclose').on('click',this.hide_5GApplicationCtrl.bind(this));
    //备品备件
    $('#sparepartsDiv_winclose').on('click',this.hidesparepartsCtrl.bind(this));

    //关联的传输设备
    $('#totransmissionEquipmentDiv_winclose').on('click', function(event) {
        event.preventDefault();
        $("#transmissionEquipment").hide();  
    });
    //联的传输子网 - 西区中博会
    $('#totransmissionSubnet_1Div_winclose').on('click', function(event) {
        event.preventDefault();
        $("#transmissionSubnet_1").hide();  
    });
    //联的传输子网 - 青浦虹桥205环
    $('#totransmissionSubnet_2Div_winclose').on('click', function(event) {
        event.preventDefault();
        $("#transmissionSubnet_2").hide();  
    });

 

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

CIIE.Map.prototype.showAcAp=function(){
    var html='<div id="acApWin" style="position:absolute;top:50%;left:50%;margin-top:-400px;margin-left:-575px;width:1150px;height:960px;overflow:hidden;display:block;">'
	    		+'<iframe src="../maptip/acap.jsp" frameborder="0" allowtransparency="true" style="border-radius:10px;width:1150px;height:960px;"></iframe>'
	    		+'<div id="acapClose" class="map-icon-close" style="position:absolute;right:5px;top:5px;"></div>'
            +'</div>';
    if($('#acApWin').length==0){
    	$('#'+this.divId).parent().append(html);
    	$('#acapClose').on('click',function(){
    		$('#acApWin').hide();
    		$('#apListWin').hide();
    		$('div.mapCtrlItem[func="WIFI流量"]').removeClass('mapCtrlItemSelected');
    	});
    }else{
    	$('#acApWin').show();
    }
};

// add hotMapMenue1 div
CIIE.Map.prototype.createHotMapMenue1=function(){
    var html='<div id="hotMapMenue1" class="hotMapMenueCommon mapCtrlItem" style="display:none">'
            +    '<div class="closeBtnOfhotLegend"></div>'
            +    '<div class="_3line">'
            +        '<div class="indexName indexNameSelect" func="用户数">用户数(人)</div>'
            +        '<div class="indexName" func="流量">流量(MB)</div>'
            +        '<div class="indexName" func="话务量">话务量(Erl)</div>'
            +    '</div>'
            // +    '<div class="_3line" style="padding:0 0 0 10px">'
            // +        '<div class="indexThreshold">--</div>'
            // +        '<div class="indexThreshold">--</div>'
            // +        '<div class="indexThreshold">--</div>'
            // +        '<div class="indexThreshold">--</div>'
            // +    '</div>'
            +    '<div class="_3line" style="padding:15px 0 0 20px">'
            +        '<div class="indexColorDiv selfClolor1"></div>'
            +        '<div class="indexColorDiv selfClolor2"></div>'
            +        '<div class="indexColorDiv selfClolor3"></div>'
            +        '<div class="indexColorDiv selfClolor4" style="margin-right: 0px;"></div>'
            +    '</div>'

            +    '<div class="_3line" style="padding:15px 0 0 15%">'
            +        '<div class="indexValueDiv selfValue1">--</div>'
            +        '<div class="indexValueDiv selfValue2">--</div>'
            +        '<div class="indexValueDiv selfValue3">--</div>'
            // +        '<div class="indexValueDiv selfValue4" style="margin-right: 0px;">--</div>'
            +    '</div>'
            +'</div>';
    
    $('#'+this.divId).parent().append(html);
    //$('#liveVideo_winctrl').on('click',this.playLiveVideoCtrl.bind(this));
    //$('.indexName').on('click',this.ctrlFuncClickOfhot.bind(this));
    //$('.indexName').on('click',this.loadHotAccordingIndexNew.bind(this));

    if (FROMMODEL == null || FROMMODEL == "null") {
        //$("#hotMapMenue1").show();
    }
    
};
// add hotMapMenue2 div
CIIE.Map.prototype.createHotMapMenue2=function(){
    var html='<div id="hotMapMenue2" class="hotMapMenueCommon mapCtrlItem" style="display:none">'
            +    '<div class="closeBtnOfhotLegend"></div>'
            +    '<div class="_3line">'
            +        '<div class="indexName indexNameSelect" func="用户数_c">用户数(人)</div>'
            +        '<div class="indexName" func="流量_c">流量(MB)</div>'
            +        '<div class="indexName" func="话务量_c">话务量(Erl)</div>'
            +    '</div>'
            // +    '<div class="_3line" style="padding:0 0 0 10px">'
            // +        '<div class="indexThreshold">--</div>'
            // +        '<div class="indexThreshold">--</div>'
            // +        '<div class="indexThreshold">--</div>'
            // +        '<div class="indexThreshold">--</div>'
            // +    '</div>'
            +    '<div class="_3line" style="padding:15px 0 0 20px">'
            +        '<div class="indexColorDiv selfClolor1"></div>'
            +        '<div class="indexColorDiv selfClolor2"></div>'
            +        '<div class="indexColorDiv selfClolor3"></div>'
            +        '<div class="indexColorDiv selfClolor4" style="margin-right: 0px;"></div>'
            +    '</div>'

            +    '<div class="_3line" style="padding:15px 0 0 15%">'
            +        '<div class="indexValueDiv selfValue1">--</div>'
            +        '<div class="indexValueDiv selfValue2">--</div>'
            +        '<div class="indexValueDiv selfValue3">--</div>'
            // +        '<div class="indexValueDiv selfValue4" style="margin-right: 0px;">--</div>'
            +    '</div>'
            +'</div>';
    
    $('#'+this.divId).parent().append(html);
    //$('#liveVideo_winctrl').on('click',this.playLiveVideoCtrl.bind(this));
    // $('.indexName').on('click',this.ctrlFuncClickOfhot.bind(this));
    // $('.indexName').on('click',this.loadHotAccordingIndexNew.bind(this));
    

    if (FROMMODEL == 'ciie') {
        // $("#hotMapMenue2").show();
        $("#legendControlBtn").show();
    }
};

// add hotMapMenue3 div    全网热力图
CIIE.Map.prototype.createHotMapMenue3=function(){
    var html='<div id="hotMapMenue3" class="hotMapMenueCommon mapCtrlItem" style="display:none">'
            +    '<div class="closeBtnOfhotLegend"></div>'
            +    '<div class="_3line">'
            +        '<div class="indexName indexNameSelect" func="用户数_a">用户数(人)</div>'
            +        '<div class="indexName" func="流量_a">流量(MB)</div>'
            +        '<div class="indexName" func="话务量_a">话务量(Erl)</div>'
            +    '</div>'
            // +    '<div class="_3line" style="padding:0 0 0 10px">'
            // +        '<div class="indexThreshold">--</div>'
            // +        '<div class="indexThreshold">--</div>'
            // +        '<div class="indexThreshold">--</div>'
            // +        '<div class="indexThreshold">--</div>'
            // +    '</div>'
            +    '<div class="_3line" style="padding:15px 0 0 20px">'
            +        '<div class="indexColorDiv selfClolor1"></div>'
            +        '<div class="indexColorDiv selfClolor2"></div>'
            +        '<div class="indexColorDiv selfClolor3"></div>'
            +        '<div class="indexColorDiv selfClolor4" style="margin-right: 0px;"></div>'
            +    '</div>'

            +    '<div class="_3line" style="padding:15px 0 0 15%">'
            +        '<div class="indexValueDiv selfValue1">--</div>'
            +        '<div class="indexValueDiv selfValue2">--</div>'
            +        '<div class="indexValueDiv selfValue3">--</div>'
            // +        '<div class="indexValueDiv selfValue4" style="margin-right: 0px;">--</div>'
            +    '</div>'

            +'</div>';
    
    $('#'+this.divId).parent().append(html);
    //$('#liveVideo_winctrl').on('click',this.playLiveVideoCtrl.bind(this));
    $('.indexName').on('click',this.ctrlFuncClickOfhot.bind(this));
    $('.indexName').on('click',this.loadHotAccordingIndexNew.bind(this));



    $('.closeBtnOfhotLegend').on('click',this.closeBtnOfAllHotMap.bind(this));
    

    // if (FROMMODEL == 'ciie') {
    //     $("#hotMapMenue2").show();
    // }
    if (FROMMODEL == null || FROMMODEL == "null") {
        //$("#hotMapMenue3").show();
        $("#legendControlBtn").show();
    }
};
// add hotMapMenue4 div    路段热力图
CIIE.Map.prototype.createHotMapMenue4=function(){
    var html='<div id="hotMapMenue4" class="hotMapMenueCommon mapCtrlItem" style="display:none">'
            +    '<div id="closeBtnOfhotLegendOfRoad" class="closeBtnOfhotLegend"></div>'
            +    '<div class="_3line">'
            +        '<div class="indexName selfstyleOfRoad indexNameSelect" func="用户数_r">用户数(人)</div>'
            +        '<div class="indexName selfstyleOfRoad" func="流量_r">流量(MB)</div>'
            +        '<div class="indexName selfstyleOfRoad" func="话务量_r">话务量(Erl)</div>'
            +    '</div>'
            // +    '<div class="_3line" style="padding:0 0 0 10px">'
            // +        '<div class="indexThreshold">--</div>'
            // +        '<div class="indexThreshold">--</div>'
            // +        '<div class="indexThreshold">--</div>'
            // +        '<div class="indexThreshold">--</div>'
            // +    '</div>'
            +    '<div class="_3line" style="padding:15px 0 0 20px">'
            +        '<div class="indexColorDiv selfClolor1"></div>'
            +        '<div class="indexColorDiv selfClolor2"></div>'
            +        '<div class="indexColorDiv selfClolor3"></div>'
            +        '<div class="indexColorDiv selfClolor4" style="margin-right: 0px;"></div>'
            +    '</div>'

            +    '<div class="_3line" style="padding:15px 0 0 15%">'
            +        '<div class="indexValueDiv selfValue1">--</div>'
            +        '<div class="indexValueDiv selfValue2">--</div>'
            +        '<div class="indexValueDiv selfValue3">--</div>'
            // +        '<div class="indexValueDiv selfValue4" style="margin-right: 0px;">--</div>'
            +    '</div>'
            +'</div>';
    
    $('#'+this.divId).parent().append(html);
    //$('#liveVideo_winctrl').on('click',this.playLiveVideoCtrl.bind(this));
    $('.selfstyleOfRoad').on('click',this.ctrlFuncClickOfhot.bind(this));
    $('.selfstyleOfRoad').on('click',this.loadHotAccordingIndexNew.bind(this));



    $('#closeBtnOfhotLegendOfRoad').on('click',this.closeBtnOfAllHotMap.bind(this));
    
    // if (FROMMODEL == 'ciie') {
    //     $("#hotMapMenue2").show();
    // }
};





CIIE.Map.prototype.closeBtnOfAllHotMap=function(){
    $("#hotMapMenue1").hide();
    $("#hotMapMenue2").hide();
    $("#hotMapMenue3").hide();
    $("#hotMapMenue4").hide();
    // if (this.map.hasLayer(this.heatMapLayer)) {
    //     this.map.removeLayer(this.heatMapLayer);
    //     this.heatMapLayer = null;
    // };
    // if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
    //     this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
    //     this.heatMapLayerOfAll4BigClass = null;
    // };
    // if (this.map.hasLayer(this.heatMapLayerOfAllNet)) {
    //     this.map.removeLayer(this.heatMapLayerOfAllNet);
    //     this.heatMapLayerOfAllNet = null;
    // };
    // if (this.map.hasLayer(this.heatMapLayerOfRoad)) {
    //     this.map.removeLayer(this.heatMapLayerOfRoad);
    //     this.heatMapLayerOfRoad = null;
    // };


    // $(".selfstyle").each(function(index, el) {
    //     $(el).find('div').eq(0).removeClass('ctrlIconRedCircleSelect');
    // });

    // $(".protectiveheatlayer").removeClass('mapCtrlItemSelected');

}









CIIE.Map.prototype.hidemetropolitanAreaNetCtrl=function(){
    $("#metropolitanAreaNet").css('display', 'none');
    $('.metropolitanAreaNetcloselogo').parent().removeClass('mapCtrlItemSelected');
};

CIIE.Map.prototype.hidetransmissionNetCtrl=function(){
    $("#transmissionNet").css('display', 'none');
    $('.transmissionNetcloselogo').parent().removeClass('mapCtrlItemSelected');
};
CIIE.Map.prototype.hidewirelessCoverageCtrl=function(){
    $("#wirelessCoverage").css('display', 'none');
    $('.wirelessCoveragecloselogo').parent().removeClass('mapCtrlItemSelected');
};
CIIE.Map.prototype.hide_5GApplicationCtrl=function(){   
    $("#_5GApplication").css('display', 'none');
    $('._5GApplicationcloselogo').parent().removeClass('mapCtrlItemSelected');
};
CIIE.Map.prototype.hidesparepartsCtrl=function(){   
    $("#spareparts").css('display', 'none');
    $('.sparepartscloselogo').parent().removeClass('mapCtrlItemSelected');
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







CIIE.Map.prototype.hideRoomVideoCtrl=function(e){
    $('#roomVideo').css('display','none');
    $("#roomVideo_set").hide();
    $("#roomVideoIframeOfset").attr('src', '');


    document.getElementById('roomVideoIframe').contentWindow.document.getElementById('setIframe').src=""; 



    $(".mapCtrlItem[func='机房视频']").removeClass('mapCtrlItemSelected');

};

CIIE.Map.prototype.hideSelectorCtrl=function(e){
    $('#conditionsSelect').css('display','none');
    $('#redFontTiShi').show();
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

    if (! $("div.mapCtrlItem[func='场景热力图']").hasClass('mapCtrlItemSelected')) {return;};
    
    var type=$(e.currentTarget).val();
//  updateHeat
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
        $("#redFontTiShi").hide();

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
        $("#redFontTiShi").show();

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
//  progressGreen
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
    this.updateHotspot(hot,false);
    
    
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
        ql.find('.QLCKPI:eq(0)').find('div:eq(2)').find('span:eq(0)').text(record['s_091']);
        ql.find('.QLCKPI:eq(1)').find('div:eq(2)').find('span:eq(0)').text((record['hwl']*1).toFixed(1));
        ql.find('.QLCKPI:eq(2)').find('div:eq(2)').find('span:eq(0)').text((record['s_083']/1024/1024).toFixed(1));
    }
    //this.updatePercent(this.hotspot);
    setTimeout(this.updatePercent(this.hotspot),5000);
    setTimeout(this.updateBaseStationTrouble(this.hotspot),5000);
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
                        +'<div></div>'
                        +'<div><span>--</span><span class="fontUnitTime">(人)</span></div>'
                    +'</div>'
                    +'<div class="QLCKPI" style="margin-left:5px;">'
                        +'<div>话务量</div>'
                        +'<div></div>'
                        +'<div><span>--</span><span class="fontUnitTime">(Erl)</span></div>'
                    +'</div>'
                    +'<div class="QLCKPI" style="margin-left:5px;">'
                        +'<div>流量</div>'
                        +'<div></div>'
                        +'<div><span>--</span><span class="fontUnitTime">(GB)</span></div>'
                    +'</div>'
                +'</div>'
                +'<div class="horizontalRow" style="margin-top:30px;">'
                    +'<div class="QLCKPI">'
                        +'<div>2G小区</div>'
                        +'<div></div>'
                        +'<div><span>--</span><span class="fontUnitTime">(个)</span></div>'
                    +'</div>'
                    +'<div class="QLCKPI" style="margin-left:5px;">'
                        +'<div>4G小区</div>'
                        +'<div></div>'
                        +'<div><span>--</span><span class="fontUnitTime">(个)</span></div>'
                    +'</div>'
                    +'<div class="QLCKPI" style="display:none;margin-left:5px;">'
                        +'<div>5G站点数</div>'
                        +'<div></div>'
                        +'<div><span>--</span><span class="fontUnitTime">(个)</span></div>'
                    +'</div>'
                    +'<div style="clear:both;"></div>'
                +'</div>'
                +'<div style="clear:both;"></div>'
                +'<div class="horizontalRow" style="padding:20px;">';
                if(true){
                //if(name=='J-国家会展中心'){
                    // html+='<div class="horizontalRow" style="width:300px;margin-top:0px;">'
                    //  +'<div>'
                    //      +'<div class="fontSubInfo">人流密度</div>'
                    //      +'<div class="QLCPb01"></div>'
                    //  +'</div>'
                    //  +'<div class="QLCNice" style="margin-left:10px;"></div>'
                    //  +'<div style="clear:both;"></div>'
                    // +'</div>'
                    
                    // +'<div class="horizontalRow" style="width:300px;margin-top:40px;">'
                    //  +'<div>'
                    //      +'<div class="fontSubInfo">网络质量</div>'
                    //      +'<div class="QLCPb02"></div>'
                    //  +'</div>'
                    //  +'<div class="QLCNice" style="margin-left:10px;"></div>'
                    //  +'<div style="clear:both;"></div>'
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
                    
                    +'<div class="horizontalRow" style="width:300px;margin-top:13px;">'
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
                //  html+='<div class="horizontalRow" style="width:300px;margin-top:0px;">'
                //      +'<div>'
                //          +'<div class="fontSubInfo">人流密度</div>'
                //          +'<div class="QLCPb03"></div>'
                //      +'</div>'
                //      +'<div class="QLCOk" style="margin-left:10px;"></div>'
                //      +'<div style="clear:both;"></div>'
                //  +'</div>'
                    
                //  +'<div class="horizontalRow" style="width:300px;margin-top:40px;">'
                //      +'<div>'
                //          +'<div class="fontSubInfo">网络质量</div>'
                //          +'<div class="QLCPb02"></div>'
                //      +'</div>'
                //      +'<div class="QLCNice" style="margin-left:10px;"></div>'
                //      +'<div style="clear:both;"></div>'
                //  +'</div>';
                }
                
                    
                    html+='<div style="margin-top:-65px;margin-left: 16px;">'
                        +'<div class="QLCFaultCircle" style="padding-top:20px;">'
                            +'<div class="fontContentTitle fontColorRed" style="cursor:pointer">0</div>'
                            +'<div class="fontUnitTime fontColorRed">个</div>'
                        +'</div>'
                        +'<div class="fontSubInfo" style="margin-top:15px;">基站故障</div>'
                    +'</div>'
                +'</div>'
            +'</div>';
    
    return html;
};

CIIE.Map.prototype.drillTroubleCell=function(){
    //console.log(this.hotspot);

    //markersLayerTroubleCell
    if(this.map.hasLayer(this.markersLayerTroubleCell)) {
        this.map.removeLayer(this.markersLayerTroubleCell);
        this.markersLayerTroubleCell = null;
    }else{
        this.markersLayerTroubleCell = new L.featureGroup();
        this.map.addLayer(this.markersLayerTroubleCell);

        //添加 dom
        var selfPopupStr = '';
            selfPopupStr += '<div id="troublecell_" class="troublecell_" style="position:absolute;top:50%;left:50%;margin-top:-372px;margin-left:-604px;width:1008px;height:833px;overflow:hidden;display:none;">'
            
            selfPopupStr += '<div class="maptipbg" style="width:100%;height:100%;padding:0px;overflow:hidden;">'
            //selfPopupStr += '<div class="map-info-win-title2">'
            //selfPopupStr += '<div class="wifiWinIcon" style="float:left;display:none"></div>'
            //selfPopupStr += '<div id="popuptitle" style="float:left;margin-left: 10px;">'+name+'</div>'
            //selfPopupStr += '</div>'
            selfPopupStr += '<div style="clear:both;"></div>'
            selfPopupStr += '<iframe id="troublecellListIframe" src="" frameborder="0" allowtransparency="true" style="border-radius:10px;width:1100px;height:849px;"></iframe>';
            selfPopupStr += '</div>'



            selfPopupStr += '<div class="troublecellClose_ map-icon-close" style="position:absolute;right:9px;top:6px;"></div>';
            selfPopupStr += '</div>';

            $('#map').parent().append(selfPopupStr);
            $('.troublecellClose_').off().on('click',function(){
                $('.troublecell_').hide();
            });

        var cellArrBak = [
                        {carrier_num: null,cell_id: null,cell_name: "中国博览会会展中心E1馆ND20W_2",cell_nt: "2G",cell_type: null,ci: "9845",hori_direc_angle: "0",hot_id: "20180730092609",hot_name: "J-大道及广场",lac: "6152",lat: 31.18481,lg_subtype: "900M",lon: 121.29697,lte_type: null,mechanical_dip_angle: null,pro_status: null,station: "中国博览会会展中心E1馆NG20W",station_type: "室内覆盖"},
                        {carrier_num: null,cell_id: "13273166",cell_name: "中国博览会会展中心D0馆NL31W_78",cell_nt: "4G",cell_type: null,ci: "78",hori_direc_angle: "0",hot_id: "20180730091958",hot_name: "J-5.1号馆",lac: "51848",lat: 31.19481,lg_subtype: "TDD-F",lon: 121.29697,lte_type: "TDD",mechanical_dip_angle: null,pro_status: null,station: null,station_type: null}
        ]    

        var url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-alarm-hot?hotspot='+ encodeURIComponent(this.hotspot);
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
            var total = result.total;
            //var total = 8;

            //$('#quickLocateItems').find("div[name='"+_hotspot+"']").eq(1).find(".fontContentTitle.fontColorRed").eq(0).text(total);

            var cellArr =result.data 

            for (var i = 0; i < cellArr.length; i++) {
                var currCell = cellArr[i];

                var hotspot=this.hotspot;
                var name = currCell.cell_name;
                var type = currCell.cell_net;
                //var lac = currCell.lac;
                //var ci = currCell.ci;
                //var lacci = lac + ':' + ci;
                var lacci = (currCell.lacci).replace("-",":");


                //经纬度的处理
                var latHeatMap = currCell.lat,lngHeatMap = currCell.lon;
                var bdPoint = this.wgs84tobd09(lngHeatMap,latHeatMap);
                var point = bdPoint.reverse();
                var lat = point[0];
                var lng = point[1];

                if (type == "4G") {
                    L.marker([lat,lng],{titleName: name,_hotspot:hotspot,_name:name,_type:type,_lacci:lacci, icon: this.marker4G_trouble, keepInView:false}).on('mouseover', function(event) {
                            console.log(event);
                            if(event.originalEvent) {
                                var x = event.originalEvent.x;
                                var y = event.originalEvent.y + 37;
                                $("#circleTitle").text(event.target.options.titleName);
                                $("#circleTitle").css({top: y,left: x});
                                $("#circleTitle").show();
                            }
                        }).on('mouseout', function(event) {
                            if(event.originalEvent) {
                                $("#circleTitle").hide();
                            }
                        }).on('click',function(){clickEvent(this);}).addTo(this.markersLayerTroubleCell);
                }else if (type == "2G") {
                    L.marker([lat,lng],{titleName: name,_hotspot:hotspot,_name:name,_type:type,_lacci:lacci, icon: this.marker2G_trouble, keepInView:false}).on('mouseover', function(event) {
                            console.log(event);
                            if(event.originalEvent) {
                                var x = event.originalEvent.x;
                                var y = event.originalEvent.y + 37;
                                $("#circleTitle").text(event.target.options.titleName);
                                $("#circleTitle").css({top: y,left: x});
                                $("#circleTitle").show();
                            }
                        }).on('mouseout', function(event) {
                            if(event.originalEvent) {
                                $("#circleTitle").hide();
                            }
                        }).on('click',function(){clickEvent(this);}).addTo(this.markersLayerTroubleCell);
                };



               

            };
            function clickEvent(ee){
                //var i = ee.options.num; 
                var hotspot = ee.options._hotspot; 
                var name = ee.options._name; 
                var type = ee.options._type; 
                var lacci = ee.options._lacci; 

                var urlNew='../maptip/deviceDetailNew.jsp?hotspot='+encodeURIComponent(hotspot)
                        +'&cellname='+encodeURIComponent(name)
                        +'&nettype='+encodeURIComponent(type)
                        +'&lacci='+encodeURIComponent(lacci)
                $('#troublecell_').off().show();
                $("#troublecellListIframe").attr('src', urlNew);
                CIIE.Map.prototype.hideAllMenue();
            };
            //定位
            if (cellArr.length > 0) {
                var lastPoint = cellArr[cellArr.length-1];
                var latHeatMap0 = lastPoint.lat,lngHeatMap0 = lastPoint.lon;
                var bdPoint0 = this.wgs84tobd09(lngHeatMap0,latHeatMap0);
                var point0 = bdPoint0.reverse();
                var lat0 = point0[0];
                var lng0 = point0[1];

                var map=this.map;
                var curZoom = map.getZoom();
                map.setView([lat0, lng0], curZoom);
            }




        }.bind(this));







        // var lat = latHeatMap,
        // var lng = lngHeatMap,






        

    };


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
    // var showAll='<img id="showAllBtn" style="cursor:pointer;position:absolute;right:40px;top:70px;"" src="'+BASEPATH+'/static/styles/local-lsm/map/showAll.png" />'
    // $('#'+this.divId).append(showAll);
    // $('#showAllBtn').on('click',this.showAll.bind(this));


    //特殊添加扇形(圆形)tip 
    var specialTipOfCircle =  '<div id="circleTitle" class="circleTitle"></div>'
    $('#'+this.divId).append(specialTipOfCircle);





    
    var quickLocate='<div id="quickLocateItems" style="position:absolute;left:40px;top:200px;">'
        +'<div>'
            +'<div content="locateCIIE" class="quickLocate locateCIIE" style="margin-top:20px;" name="J-国家会展中心"></div>'
            +this.getLocateContentHtml('J-国家会展中心',this.hotspot=='J-国家会展中心')
            +'<div content="locatePDA" class="quickLocate locateWT" style="margin-top:20px;" name="J-外滩"></div>'
            +this.getLocateContentHtml('J-外滩',this.hotspot=='J-外滩')
            +'<div content="locateHQA" class="quickLocate locateHQA" style="margin-top:20px;" name="J-虹桥机场"></div>'
            +this.getLocateContentHtml('J-虹桥机场',this.hotspot=='J-虹桥机场')
            +'<div content="locateHQT" class="quickLocate locateHQT" style="margin-top:20px;" name="J-虹桥站"></div>'
            +this.getLocateContentHtml('J-虹桥站',this.hotspot=='J-虹桥站')
            +'<div content="locatePDA" class="quickLocate locatePDA" style="margin-top:20px;" name="J-浦东机场"></div>'
            +this.getLocateContentHtml('J-浦东机场',this.hotspot=='J-浦东机场')
           +'</div>'
        +'<div id="qcMin" stat="normal" class="qcMin" style="position:absolute;left:-50px;top:-30px;width:100px;height:100px;"></div>'
        +'</div>';
        
    
    $('#'+this.divId).append(quickLocate);
    this.setDivMovable($('#quickLocateItems')[0]);
    $('.quickLocate').on('click',this.quickLocateHandler.bind(this));
    $('#quickLocateItems').on('click',$('.fontContentTitle.fontColorRed'),this.drillTroubleCell.bind(this));
    
    
    //var mapLayerChoosers='<div class="layerChooser mapLayerD2 glowSelected2" style="position:absolute;right:33px;top:420px;"></div>'
    var mapLayerChoosers='<div class="layerChooser mapLayerD2" style="position:absolute;right:33px;top:434px;display:none"></div>'
                        //+'<div class="layerChooser mapLayerSat" style="position:absolute;right:33px;top:328px;"></div>'
                        +'<div class="layerChooser mapLayerD3" style="position:absolute;right:33px;top:434px;"></div>';
    
    $('#'+this.divId).append(mapLayerChoosers);
    var btnList='<div id="ctrlResource" class="mapCtrlContent" style="position:absolute;right:120px;bottom:10px;display:block;">'
                    +'<div style="width:100%;padding-left:10px;">'
                        +'<div class="ctrlTitle" style="float:left;">保障资源:</div>'
                        //+'<div class="mapCtrlItem" func="2G小区"><div class="ctrlIcon2G"></div><div>2G小区<span class="ctrlCount" id="legendCount2GCell">0</span>个</div><div style="clear:both;"></div></div>'
                        //+'<div class="mapCtrlItem" func="FDD小区"><div class="ctrlIconFDD"></div><div>FDD小区<span class="ctrlCount" id="legendCountFDD">0</span>个</div><div style="clear:both;"></div></div>'
                        //+'<div class="mapCtrlItem" func="TDD小区"><div class="ctrlIconTDD"></div><div>TDD小区<span class="ctrlCount" id="legendCountTDD">0</span>个</div><div style="clear:both;"></div></div>'
                        +'<div class="mapCtrlItem mapCtrlItemSelected" func="5G站点数" style="display:none;"><div class="ctrlIcon5G"></div><div>5G站点数<span class="ctrlCount" id="legendCount5G">0</span>个</div><div style="clear:both;"></div></div>'
                        //+'<div class="mapCtrlItem" func="聚合小区"><div class="ctrlIconCLUSTER"></div><div>聚合小区</div><div style="clear:both;"></div></div>'
                        +'<div class="mapCtrlItem" func="基站"><div class="ctrlIconBaseStation"></div><div>基站<span class="ctrlCount" id="legendCount2GBaseStation">0</span>个</div><div style="clear:both;"></div></div>'
                        +'<div class="mapCtrlItem" func="机房"><div class="ctrlIconBaseRoom"></div><div>机房<span class="ctrlCount" id="legendCountBaseRoom">0</span>个</div><div style="clear:both;"></div></div>'
                        +'<div class="mapCtrlItem" func="集客专线"><div class="ctrlIconSPLINE"></div><div>集客专线<span class="ctrlCount" id="legendCountJKSpecialLine">0</span>条</div><div style="clear:both;"></div></div>'
                        +'<div style="clear:both;"></div>'
                        +'<div class="ctrlTitle" style="float:left;width:120px;display:none;"></div>'
                        +'<div style="display:none;" class="mapCtrlItem" func="宏站"><div class="ctrlMetrocell"></div><div>宏站<span class="ctrlCount" id="legendCountMotorCell">0</span>个</div><div style="clear:both;"></div></div>'
                        +'<div style="display:none;" class="mapCtrlItem" func="室内"><div class="ctrlRoomIn"></div><div>室内<span class="ctrlCount" id="legendCountRoomIn">0</span>个</div><div style="clear:both;"></div></div>'
                        +'<div style="display:none;" class="mapCtrlItem" func="室分"><div class="ctrlRoomSplit"></div><div>室分<span class="ctrlCount" id="legendCountRoomSplit">0</span>个</div><div style="clear:both;"></div></div>'
                        +'<div style="display:none;" class="mapCtrlItem" func="室外"><div class="ctrlRoomOut"></div><div>室外<span class="ctrlCount" id="legendCountRoomOut">0</span>个</div><div style="clear:both;"></div></div>'
                        +'<div style="display:none;" class="mapCtrlItem" func="街道站"><div class="ctrlStreet"></div><div>街道站<span class="ctrlCount" id="legendCountStreet">0</span>个</div><div style="clear:both;"></div></div>'
                        +'<div style="clear:both;"></div>'
                        // +'<div class="ctrlTitle mapCtrlItem mapCtrlItemSelected" func="室外小区" style="float:left;margin: 9px 0px 0px 0px;padding-top: 10px;">室外小区:</div>'
                        // +'<div class="mapCtrlItem mapCtrlItemSelected yjutreds" func="TDD-D"><div class="ctrlIconTDD-D"></div><div>TDD-D</div><div style="clear:both;"></div></div>'
                        // +'<div class="mapCtrlItem mapCtrlItemSelected yjutreds" func="TDD-E"><div class="ctrlIconTDD-E"></div><div>TDD-E</div><div style="clear:both;"></div></div>'
                        // +'<div class="mapCtrlItem mapCtrlItemSelected yjutreds" func="TDD-F"><div class="ctrlIconTDD-F"></div><div>TDD-F</div><div style="clear:both;"></div></div>'
                        // +'<div class="mapCtrlItem mapCtrlItemSelected yjutreds" func="FDD-S"><div class="ctrlIconFDD-S"></div><div>FDD</div><div style="clear:both;"></div></div>'
                        // +'<div class="mapCtrlItem mapCtrlItemSelected yjutreds" func="900M"><div class="ctrlIcon900M"></div><div>900M</div><div style="clear:both;"></div></div>'
                        // +'<div class="mapCtrlItem mapCtrlItemSelected yjutreds" func="1800M"><div class="ctrlIcon1800M"></div><div>1800M</div><div style="clear:both;"></div></div>'
                        // +'<div style="clear:both;"></div>'
                        // +'<div class="ctrlTitle mapCtrlItem mapCtrlItemSelected" func="室内小区" style="float:left;margin: 9px 0px 0px 0px;padding-top: 10px;">室内小区:</div>'
                        // +'<div class="mapCtrlItem mapCtrlItemSelected yjutreds" func="TDD-D-C"><div class="ctrlIconTDD-D-C"><div class="ctrlIconTDD-D-C-N"></div></div><div>TDD-D</div><div style="clear:both;"></div></div>'
                        // +'<div class="mapCtrlItem mapCtrlItemSelected yjutreds" func="TDD-E-C"><div class="ctrlIconTDD-E-C"><div class="ctrlIconTDD-E-C-N"></div></div><div>TDD-E</div><div style="clear:both;"></div></div>'
                        // +'<div class="mapCtrlItem mapCtrlItemSelected yjutreds" func="TDD-F-C"><div class="ctrlIconTDD-F-C"><div class="ctrlIconTDD-F-C-N"></div></div><div>TDD-F</div><div style="clear:both;"></div></div>'
                        // +'<div class="mapCtrlItem mapCtrlItemSelected yjutreds" func="FDD-S-C"><div class="ctrlIconFDD-S-C"><div class="ctrlIconFDD-S-C-N"></div></div><div>FDD</div><div style="clear:both;"></div></div>'
                        // +'<div class="mapCtrlItem mapCtrlItemSelected yjutreds" func="900M-C"><div class="ctrlIcon900M-C"><div class="ctrlIcon900M-C-N"></div></div><div>900M</div><div style="clear:both;"></div></div>'
                        // +'<div class="mapCtrlItem mapCtrlItemSelected yjutreds" func="1800M-C"><div class="ctrlIcon1800M-C"><div class="ctrlIcon1800M-C-N"></div></div><div>1800M</div><div style="clear:both;"></div></div>'
                        // +'<div style="clear:both;"></div>'


                        //99999 
                        +'<div class="ctrlTitle mapCtrlItem"  func="2G小区总数" style="float:left;margin: 9px 0px 0px 0px;padding-top: 10px;">2G小区<span class="ctrlCount" id="legendCount2GCell">0</span>个:</div>'
                        +'<div class="mapCtrlItemFontLeft">室外 | </div>'
                        +'<div class="mapCtrlItem yjutreds" func="900M"><div class="ctrlIcon900M"></div><div>900M</div><div style="clear:both;"></div></div>'
                        +'<div class="mapCtrlItem yjutreds" func="1800M"><div class="ctrlIcon1800M"></div><div>1800M</div><div style="clear:both;"></div></div>'
                        +'<div class="mapCtrlItemFontCenter"> &nbsp;&nbsp;&nbsp;&nbsp;室内 | </div>'
                        +'<div class="mapCtrlItem yjutreds" func="900M-C"><div class="ctrlIcon900M-C"><div class="ctrlIcon900M-C-N"></div></div><div>900M</div><div style="clear:both;"></div></div>'
                        +'<div class="mapCtrlItem yjutreds" func="1800M-C"><div class="ctrlIcon1800M-C"><div class="ctrlIcon1800M-C-N"></div></div><div>1800M</div><div style="clear:both;"></div></div>'
                        +'<div class="mapCtrlItemFontRight"></div>'
                        +'<div style="clear:both;"></div>'


                        +'<div class="ctrlTitle mapCtrlItem"  func="4G小区总数" style="float:left;margin: 9px 0px 0px 0px;padding-top: 10px;">4G小区<span class="ctrlCount" id="legendCountFDDAndTDD">0</span>个:</div>'
                        +'<div class="mapCtrlItemFontLeft">室外 | </div>'
                        +'<div class="mapCtrlItem yjutreds" func="TDD-D"><div class="ctrlIconTDD-D"></div><div>4G-D</div><div style="clear:both;"></div></div>'
                        +'<div class="mapCtrlItem yjutreds" func="TDD-E"><div class="ctrlIconTDD-E"></div><div>4G-E</div><div style="clear:both;"></div></div>'
                        +'<div class="mapCtrlItem yjutreds" func="TDD-F"><div class="ctrlIconTDD-F"></div><div>4G-F</div><div style="clear:both;"></div></div>'
                        +'<div class="mapCtrlItem yjutreds" func="FDD-S"><div class="ctrlIconFDD-S"></div><div>4G+</div><div style="clear:both;"></div></div>'
                        +'<div class="mapCtrlItemFontCenter"> &nbsp;&nbsp;&nbsp;&nbsp;室内 | </div>'
                        +'<div class="mapCtrlItem yjutreds ttttttttt" func="TDD-D-C"><div class="ctrlIconTDD-D-C"><div class="ctrlIconTDD-D-C-N"></div></div><div>4G-D</div><div style="clear:both;"></div></div>'
                        +'<div class="mapCtrlItem yjutreds ttttttttt" func="TDD-E-C"><div class="ctrlIconTDD-E-C"><div class="ctrlIconTDD-E-C-N"></div></div><div>4G-E</div><div style="clear:both;"></div></div>'
                        +'<div class="mapCtrlItem yjutreds ttttttttt" func="TDD-F-C"><div class="ctrlIconTDD-F-C"><div class="ctrlIconTDD-F-C-N"></div></div><div>4G-F</div><div style="clear:both;"></div></div>'
                        +'<div class="mapCtrlItem yjutreds ttttttttt" func="FDD-S-C"><div class="ctrlIconFDD-S-C"><div class="ctrlIconFDD-S-C-N"></div></div><div>4G+</div><div style="clear:both;"></div></div>'
                        +'<div class="mapCtrlItemFontRight"></div>'
                        +'<div style="clear:both;"></div>'


                        // +'<div class="ctrlTitle mapCtrlItem" func="4G扇区" style="float:left;margin: 9px 0px 0px 0px;padding-top: 10px;">4G扇区:</div>'
                        // +'<div class="mapCtrlItem mapCtrlItemSelected yjutreds" func="TDD-D"><div class="ctrlIconTDD-D"></div><div>TDD-D</div><div style="clear:both;"></div></div>'
                        // +'<div class="mapCtrlItem mapCtrlItemSelected yjutreds" func="TDD-E"><div class="ctrlIconTDD-E"></div><div>TDD-E</div><div style="clear:both;"></div></div>'
                        // +'<div class="mapCtrlItem mapCtrlItemSelected yjutreds" func="TDD-F"><div class="ctrlIconTDD-F"></div><div>TDD-F</div><div style="clear:both;"></div></div>'
                        // +'<div class="mapCtrlItem mapCtrlItemSelected yjutreds" func="FDD-S"><div class="ctrlIconFDD_S"></div><div>FDD</div><div style="clear:both;"></div></div>'
                        // +'<div style="clear:both;"></div>'
                        // +'<div class="ctrlTitle mapCtrlItem" func="2G扇区" style="float:left;margin: 9px 0px 0px 0px;padding-top: 10px;">2G扇区:</div>'
                        // +'<div class="mapCtrlItem mapCtrlItemSelected yjutreds" func="900M"><div class="ctrlIcon900M"></div><div>900M</div><div style="clear:both;"></div></div>'
                        // +'<div class="mapCtrlItem mapCtrlItemSelected yjutreds" func="1800M"><div class="ctrlIcon1800M"></div><div>1800M</div><div style="clear:both;"></div></div>'
                        // +'<div style="clear:both;"></div>'
                        +'<div class="ctrlTitle" style="float:left;">应急资源:</div>'
                        +'<div class="mapCtrlItem mapCtrlItemSelected" func="应急车"><div class="ctrlIconEMERCAR"></div><div>应急车<span class="ctrlCount" id="legendCountEC">0</span>辆</div><div style="clear:both;"></div></div>'
                        +'<div class="mapCtrlItem mapCtrlItemSelected" func="指挥车"><div class="map-icon-commandcar" style="width:40px;height:40px;"></div><div>指挥车<span class="ctrlCount" id="legendCountCC">0</span>辆</div><div style="clear:both;"></div></div>'
                        +'<div class="mapCtrlItem " func="发电车"><div class="ctrlIconELECTRICCAR"></div><div>发电车<span class="ctrlCount" id="legendCountELECTRIC">0</span>辆</div><div style="clear:both;"></div></div>'
                        //+'<div class="mapCtrlItem mapCtrlItemSelected" func="无人机"><div class="ctrlIconAIRCRAFT"></div><div>无人机<span class="ctrlCount" id="legendCountAIR">0</span>架</div><div style="clear:both;"></div></div>'
                        +'<div class="mapCtrlItem mapCtrlItemSelected" func="保障人员"><div class="map-icon-maintainman" style="width:40px;height:40px;"></div><div>保障人员<span class="ctrlCount" id="legendCountMM">0</span>人</div><div style="clear:both;"></div></div>'
                        +'<div class="mapCtrlItem" func="备品备件"><div class="ctrlIconsparepart sparepartscloselogo" style="width:40px;height:40px;"></div><div>备品备件<span class="ctrlCount" id="legendCountsparepart">0</span>个</div><div style="clear:both;"></div></div>'
                        +'<div style="clear:both;"></div>'
                        //+'<div class="ctrlTitle" style="float:left;">其&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;他:</div>'
                        //+'<div class="mapCtrlItem" func="拨测"><div class="ctrlIcondailtest_red" style="width:40px;height:40px;"></div><div>拨测</div><div style="clear:both;"></div></div>'
                        //+'<div style="clear:both;"></div>'
                    +'</div>'
                +'</div>'
                +'<div id="ctrlPerformance" class="mapCtrlContent" style="position:absolute;right:120px;bottom:10px;display:none;">'
                    +'<div style="width:100%;padding-left:10px;">'
                        +'<div class="ctrlTitle" style="float:left;">业&nbsp;&nbsp;务&nbsp;&nbsp;量:</div>'
//                      +'<div name="咪咕视频" class="mapCtrlItem"><div class="ctrlIconTOPAPP"></div><div>咪咕视频</div><div style="clear:both;"></div></div>'
                        +'<div name="应用小类业务量TOP5" func="应用小类业务量TOP5" class="mapCtrlItem"><div class="ctrlIconTOPAPP"></div><div>应用小类业务量</div><div style="clear:both;"></div></div>'
                        +'<div name="高流量小区TOP5" func="高流量小区TOP5" class="mapCtrlItem"><div class="ctrlIconTOPFLOW"></div><div>高流量小区</div><div style="clear:both;"></div></div>'
                        +'<div name="高LTE话务量小区TOP5" func="高LTE话务量小区TOP5" class="mapCtrlItem"><div class="ctrlIcontopErl"></div><div>高LTE话务量小区</div><div style="clear:both;"></div></div>'
                        //+'<div style="clear:both;"></div>'
                        //+'<div style="width:124px;height:1px;float: left;"></div>'// 占空使用
                        +'<div name="高GSM话务量小区TOP5" func="高GSM话务量小区TOP5" class="mapCtrlItem"><div class="ctrlIcontopErl"></div><div>高GSM话务量小区</div><div style="clear:both;"></div></div>'
                        +'<div name="WIFI流量" func="WIFI流量" class="mapCtrlItem"><div class="ctrlIconWIFI"></div><div>WIFI流量</div><div style="clear:both;"></div></div>'
                        +'<div style="clear:both;"></div>'
                        +'<div class="ctrlTitle" style="float:left;">网络质量:</div>'
                        +'<div name="低LTE无线接通率TOP5" func="低LTE无线接通率TOP5" class="mapCtrlItem"><div class="ctrlIconLOWLTECONN"></div><div>低LTE无线接通率</div><div style="clear:both;"></div></div>'
                        +'<div name="低GSM无线接通率TOP5" func="低GSM无线接通率TOP5" class="mapCtrlItem"><div class="ctrlIconLOWGSMCONN"></div><div>低GSM无线接通率</div><div style="clear:both;"></div></div>'
                        //+'<div class="mapCtrlItem"><div class="ctrlIconDIAL"></div><div>拨测质量</div><div style="clear:both;"></div></div>'
                        +'<div class="mapCtrlItem" func="拨测"><div class="ctrlIcondailtest_red" style="width:40px;height:40px;"></div><div>无线拨测</div><div style="clear:both;"></div></div>'
                        //+'<div name="高LTE无线接通率TOP5" func="高LTE无线接通率TOP5" class="mapCtrlItem"><div class="ctrlIconLOWLTECONN"></div><div>高LTE无线接通率</div><div style="clear:both;"></div></div>'
                        //+'<div name="高GSM无线接通率TOP5" func="高GSM无线接通率TOP5" class="mapCtrlItem"><div class="ctrlIconLOWGSMCONN"></div><div>高GSM无线接通率</div><div style="clear:both;"></div></div>'
                        +'<div style="clear:both;"></div>'
                    +'</div>'
                +'</div>'
                +'<div id="ctrlFunction" class="mapCtrlContent" style="position:absolute;right:30px;bottom:10px;display:none;min-height: 100px;">'
                    +'<div style="width:100%;">'
                        +'<div class="mapCtrlItem"><div class="ctrlIconREPLAY"></div><div>回放功能</div><div style="clear:both;"></div></div>'

                        //保障88888
                        +'<div class="mapCtrlItem protectiveheatlayer reyhgtsdeagSelect" func="全网热力图" style="positon:relative">'
                        +   '<div class="mapCtrlContentSubmenueDiv"><div class="mapCtrlContentSubmenue">'
                        +       '<div class="mapCtrlItemSub selfstyle" func="用户数_a"><div class="ctrlIconRedCircle ctrlIconRedCircleSelect"></div><div style="display: inline-block;">用户数</div><div style="clear:both;"></div></div>'
                        +       '<div class="mapCtrlItemSub selfstyle" func="流量_a"><div class="ctrlIconRedCircle"></div><div style="display: inline-block;">流量</div><div style="clear:both;"></div></div>'
                        +       '<div class="mapCtrlItemSub selfstyle" func="话务量_a"><div class="ctrlIconRedCircle"></div><div style="display: inline-block;">话务量</div><div style="clear:both;"></div></div>'
                        +   '</div></div>'
                        +   '<div class="ctrlIconHEAT hotMapOfAllNet"></div><div>全网热力图</div><div style="clear:both;"></div>'
                        +'</div>'


                        //保障44444
                        +'<div class="mapCtrlItem protectiveheatlayer" func="全景热力图" style="positon:relative">'
                        +   '<div class="mapCtrlContentSubmenueDiv"><div class="mapCtrlContentSubmenue">'
                        +       '<div class="mapCtrlItemSub selfstyle" func="用户数"><div class="ctrlIconRedCircle ctrlIconRedCircleSelect"></div><div style="display: inline-block;">用户数</div><div style="clear:both;"></div></div>'
                        +       '<div class="mapCtrlItemSub selfstyle" func="流量"><div class="ctrlIconRedCircle"></div><div style="display: inline-block;">流量</div><div style="clear:both;"></div></div>'
                        +       '<div class="mapCtrlItemSub selfstyle" func="话务量"><div class="ctrlIconRedCircle"></div><div style="display: inline-block;">话务量</div><div style="clear:both;"></div></div>'
                        +   '</div></div>'
                        +   '<div class="ctrlIconHEAT hotMapOfAll4Class"></div><div>保障区域热力图</div><div style="clear:both;"></div>'
                        +'</div>'
                        

                        //保障333333
                        +'<div class="mapCtrlItem protectiveheatlayer" func="场景热力图" style="positon:relative">'
                        +   '<div class="mapCtrlContentSubmenueDiv"><div class="mapCtrlContentSubmenue">'
                        +       '<div class="mapCtrlItemSub selfstyle" func="用户数_c"><div class="ctrlIconRedCircle ctrlIconRedCircleSelect"></div><div style="display: inline-block;">用户数</div><div style="clear:both;"></div></div>'
                        +       '<div class="mapCtrlItemSub selfstyle" func="流量_c"><div class="ctrlIconRedCircle"></div><div style="display: inline-block;">流量</div><div style="clear:both;"></div></div>'
                        +       '<div class="mapCtrlItemSub selfstyle" func="话务量_c"><div class="ctrlIconRedCircle"></div><div style="display: inline-block;">话务量</div><div style="clear:both;"></div></div>'
                        +   '</div></div>'
                        +   '<div class="ctrlIconHEAT hotMap"></div><div>场景热力图</div><div style="clear:both;"></div>'
                        +'</div>'



                        //保障999999
                        +'<div class="mapCtrlItem protectiveheatlayer" func="路段热力图" style="positon:relative">'
                        +   '<div class="mapCtrlContentSubmenueDiv"><div class="mapCtrlContentSubmenue">'
                        +       '<div class="mapCtrlItemSub selfstyle" func="用户数_r"><div class="ctrlIconRedCircle ctrlIconRedCircleSelect"></div><div style="display: inline-block;">用户数</div><div style="clear:both;"></div></div>'
                        +       '<div class="mapCtrlItemSub selfstyle" func="流量_r"><div class="ctrlIconRedCircle"></div><div style="display: inline-block;">流量</div><div style="clear:both;"></div></div>'
                        +       '<div class="mapCtrlItemSub selfstyle" func="话务量_r"><div class="ctrlIconRedCircle"></div><div style="display: inline-block;">话务量</div><div style="clear:both;"></div></div>'
                        +   '</div></div>'
                        +   '<div class="ctrlIconHEAT hotMapOfRoad"></div><div>道路热力图</div><div style="clear:both;"></div>'
                        +'</div>'


                        +'<div style="clear:both;"></div>'
                        //+'<div style="width:124px;height:1px;float: left;"></div>'// 占空使用




                        //+'<div class="mapCtrlItem mapCtrlItemSelected"><div class="ctrlIconHEAT hotMap"></div><div>场景热力图</div><div style="clear:both;"></div></div>'
                        


                        // +'<div class="mapCtrlItem protectiveheatlayerDDDDD"><div class="ctrlIconHEAT hotMapOfAll4Class"></div><div>全景热力图</div><div style="clear:both;"></div></div>'
                        //+'<div class="mapCtrlItem"><div class="ctrlIconDIAL"></div><div>拨测质量</div><div style="clear:both;"></div></div>'
                        //+'<div class="mapCtrlItem"><div class="ctrlIconSPLINE"></div><div>集客专线</div><div style="clear:both;"></div></div>'
                        //+'<div name="WIFI流量" class="mapCtrlItem"><div class="ctrlIconWIFI"></div><div>WIFI流量</div><div style="clear:both;"></div></div>'
                        //+'<div class="mapCtrlItem"><div class="ctrlIconVideo"></div><div>现场视频</div><div style="clear:both;"></div></div>'
                        //+'<div class="mapCtrlItem"><div class="ctrlIconVideo"></div><div>现场视频</div><div style="clear:both;"></div></div>'
                        +'<div class="mapCtrlItem" func="机房视频"><div class="ctrlIconbaseroomVideo"></div><div>机房视频</div><div style="clear:both;"></div></div>'
                        +'<div class="mapCtrlItem"><div class="ctrlIconwuxianfugai wirelessCoveragecloselogo"></div><div>无线覆盖</div><div style="clear:both;"></div></div>'
                        +'<div class="mapCtrlItem"><div class="ctrlIcon_5g _5GApplicationcloselogo"></div><div>5G应用</div><div style="clear:both;"></div></div>'
                        // +'<div class="mapCtrlItem"><div class="ctrlIconTraffic"></div><div>交通枢纽</div><div style="clear:both;"></div></div>'
                        // +'<div class="mapCtrlItem"><div class="ctrlIconHotel"></div><div>酒店</div><div style="clear:both;"></div></div>'
                        // +'<div class="mapCtrlItem"><div class="ctrlIconLine"></div><div>保障线路</div><div style="clear:both;"></div></div>'
                        //+'<div style="clear:both;"></div>'
                        
                    +'</div>'
                +'</div>'
                +'<div id="ctrlFactor" class="mapCtrlContent" style="position:absolute;right:30px;bottom:10px;display:none;z-index:2;min-width:1262px;">'
                    +'<div style="width:100%;padding-left:10px;">'
                        +'<div class="ctrlTitle mapCtrlItem" func="交通枢纽" style="float:left;padding-top: 10px;">交通枢纽:</div>'
                        +'<div class="mapCtrlItem" func="浦东机场"><div class="ctrlIconAirplane"></div><div>浦东机场</div><div style="clear:both;"></div></div>'
                        +'<div class="mapCtrlItem" func="虹桥机场"><div class="ctrlIconAirplane"></div><div>虹桥机场</div><div style="clear:both;"></div></div>'
                        +'<div class="mapCtrlItem" func="虹桥站"><div class="ctrlIconTrain"></div><div>虹桥站</div><div style="clear:both;"></div></div>'
                        +'<div class="mapCtrlItem" func="上海站"><div class="ctrlIconTrain"></div><div>上海站</div><div style="clear:both;"></div></div>'
                        +'<div class="mapCtrlItem" func="上海南站"><div class="ctrlIconTrain"></div><div>上海南站</div><div style="clear:both;"></div></div>'
                        +'<div class="mapCtrlItem" style="width:1px;height:45px;border:1px solid #fff"></div>'
                        +'<div class="mapCtrlItem" func="局房图层"><div class=""></div><div>局房</div><div style="clear:both;"></div></div>'
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
                                    btnList += '<div class="mapCtrlItem hotalSpecial" style="float: none;height: 49px;" func="'+name+'"><div class="ctrlIconHotel"></div><div class="htrdfhrgf">'+name+'</div><div style="clear:both;"></div></div>'
                                }
                            };


                  btnList +=      '</div>'
                            +   '</div>'
                            +'</div>'
                        +'</div>'
                        +'<div style="clear:both;"></div>'



                        //77777
//                        +'<div class="ctrlTitle mapCtrlItem" func="保障线路" style="float:left;padding-top: 10px;">保障线路:</div>'
//                        +'<div name="base5">'
//                        +    '<div class="mapCtrlItem" func="浦东机场线路"><div class="ctrlIconLine"></div><div class="fixedLength" title="浦东机场">浦东机场</div><div style="clear:both;"></div></div>'
//                        +    '<div class="mapCtrlItem" func="虹桥机场线路"><div class="ctrlIconLine"></div><div class="fixedLength" title="虹桥机场">虹桥机场</div><div style="clear:both;"></div></div>'
//                        +    '<div class="mapCtrlItem" func="沪杭高铁线路"><div class="ctrlIconLine"></div><div class="fixedLength" title="沪杭高铁">沪杭高铁</div><div style="clear:both;"></div></div>'
//                        +    '<div class="mapCtrlItem" func="京沪/沪宁高铁线路"><div class="ctrlIconLine"></div><div class="fixedLength" title="京沪高铁">京沪高铁</div><div style="clear:both;"></div></div>'
//                        +    '<div class="mapCtrlItem" func="虹桥站线路"><div class="ctrlIconLine"></div><div class="fixedLength" title="虹桥站">虹桥站</div><div style="clear:both;"></div></div>'
//                        +'</div>'
//                        +'<div name="more5">'
//
//                        +'<div class="mapCtrlItem moreCommon" func="更多...." style="position:relative"><div class=""></div><div>更多....</div><div style="clear:both;"></div>'
//                        +   '<div class="mapCtrlContentSubmenueOfCommonDiv">'
//                        +      '<div id="mapCtrlContentSubmenueOfCommonDivReal" class="mapCtrlContentSubmenueOfCommonDivReal mapCtrlContentSubmenue" style="overflow-y: auto;">'
//                        +          '<div class="mapCtrlItem" style="float: none;height: 49px;" func="上海站线路"><div class="ctrlIconLine"></div><div class="htrdfhrgf">上海站</div><div style="clear:both;"></div></div>'
//                        +          '<div class="mapCtrlItem" style="float: none;height: 49px;" func="上海南站线路"><div class="ctrlIconLine"></div><div class="htrdfhrgf">上海南站</div><div style="clear:both;"></div></div>'
//                        +      '</div>'
//                        +   '</div>'
//                        +'</div>'
//                        //+    '<div class="mapCtrlItem" func="上海站线路"><div class="ctrlIconLine" style="width:40px;height:40px;"></div><div>上海站</div><div style="clear:both;"></div></div>'
//                        //+    '<div class="mapCtrlItem" func="上海南站线路"><div class="ctrlIconLine" style="width:40px;height:40px;"></div><div>上海南站</div><div style="clear:both;"></div></div>'
//                        +'</div>'
//                        +'<div style="clear:both;"></div>'
                        






                        // +'<div class="ctrlTitle mapCtrlItem" func="保障线路" style="float:left;padding-top: 10px;">保障线路:</div>'
                        // +'<div class="mapCtrlItem" func="浦东机场线路"><div class="ctrlIconLine"></div><div>浦东机场</div><div style="clear:both;"></div></div>'
                        // +'<div class="mapCtrlItem" func="虹桥机场线路"><div class="ctrlIconLine" style="width:40px;height:40px;"></div><div>虹桥机场</div><div style="clear:both;"></div></div>'
                        // +'<div class="mapCtrlItem" func="沪杭高铁线路"><div class="ctrlIconLine"></div><div>沪杭高铁</div><div style="clear:both;"></div></div>'
                        // +'<div class="mapCtrlItem" func="京沪/沪宁高铁线路"><div class="ctrlIconLine"></div><div>京沪/沪宁高铁</div><div style="clear:both;"></div></div>'
                        // +'<div class="mapCtrlItem" func="虹桥站线路"><div class="ctrlIconLine" style="width:40px;height:40px;"></div><div>虹桥站</div><div style="clear:both;"></div></div>'
                        // +'<div class="mapCtrlItem" func="上海站线路"><div class="ctrlIconLine" style="width:40px;height:40px;"></div><div>上海站</div><div style="clear:both;"></div></div>'
                        // +'<div class="mapCtrlItem" func="上海南站线路"><div class="ctrlIconLine" style="width:40px;height:40px;"></div><div>上海南站</div><div style="clear:both;"></div></div>'
                        // +'<div style="clear:both;"></div>' 
                        //
                        // +'<div class="ctrlTitle" style="float:left;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>'
                        // +'<div class="mapCtrlItem" func="上海南站线路"><div class="ctrlIconLine" style="width:40px;height:40px;"></div><div>上海南站</div><div style="clear:both;"></div></div>'
                        // +'<div style="clear:both;"></div>'
                    


                    +'</div>'
                +'</div>'
                +'<div id="ctrlTopology" class="mapCtrlContent" style="position:absolute;right:30px;bottom:220px;display:none;min-height: 100px;">'
                    +'<div style="width:100%;">'
                        //+'<div name="WIFI流量" class="mapCtrlItem"><div class="ctrlIconWIFI"></div><div>WIFI流量</div><div style="clear:both;"></div></div>'
                        //+'<div name="核心网" class="mapCtrlItem"><div class="ctrlIcontopology"></div><div>核心网</div><div style="clear:both;"></div></div>'
                        //+'<div name="核心网(传统语音)" class="mapCtrlItem"><div class="ctrlIcontopology"></div><div>核心网(传统语音)</div><div style="clear:both;"></div></div>'
                        //+'<div class="mapCtrlItem"><div class="ctrlIconVideo"></div><div>现场视频</div><div style="clear:both;"></div></div>'
                        // +'<div class="mapCtrlItem"><div class="ctrlIcontopology corenetcloselogo"></div><div>核心网(EPC)</div><div style="clear:both;"></div></div>'
                        // +'<div class="mapCtrlItem"><div class="ctrlIcontopology corenetTraditionalcloselogo"></div><div>核心网(传统语音)</div><div style="clear:both;"></div></div>'
                        // +'<div class="mapCtrlItem"><div class="ctrlIcontopology metropolitanAreaNetcloselogo"></div><div>城域网</div><div style="clear:both;"></div></div>'
                        +'<div class="mapCtrlItem"><div class="ctrlIcontopology transmissionNetcloselogo"></div><div>传输网</div><div style="clear:both;"></div></div>'
                        +'<div id="opticalCableCtrl" class="mapCtrlItem"><div class="ctrlIcontopology transmissionNetcloselogo"></div><div>传输光缆</div><div style="clear:both;"></div></div>'
                        +'<div style="clear:both;"></div>'
                    +'</div>'
                +'</div>'
                // +'<div title="保障要素" target="ctrlFactor" class="ctrlFactor mapCtrlBtns" style="position:absolute;right:30px;bottom:603px;"></div>'
                // +'<div title="资源图层" target="ctrlResource" class="ctrlResource mapCtrlBtns glowSelected" style="position:absolute;right:30px;bottom:518px;"></div>'
                // +'<div title="性能列表" target="ctrlPerformance" class="ctrlPerformance mapCtrlBtns" style="position:absolute;right:30px;bottom:433px;"></div>'
                // +'<div title="功能图层" target="ctrlFunction" class="ctrlFunction mapCtrlBtns" style="position:absolute;right:30px;bottom:350px;"></div>'
                // +'<div title="传输拓扑" target="ctrlTopology" class="ctrlTopology mapCtrlBtns" style="position:absolute;right:30px;bottom:265px;"></div>'
                // +'<div title="信息播报" target="infobroadcast" class="ctrlRobot mapCtrlBtns" style="width:256px;height:256px;border:none;position:absolute;right:0px;bottom:0px;"><div id="infobroadnum" class="infobroadnum" style="display:none">0</div></div>'

                +'<div target="ctrlFactor" class="ctrlFactor mapCtrlBtns" style="position:absolute;right:30px;bottom:603px;"></div>'
                +'<div target="ctrlResource" class="ctrlResource mapCtrlBtns" style="position:absolute;right:30px;bottom:518px;"></div>'
                +'<div target="ctrlPerformance" class="ctrlPerformance mapCtrlBtns" style="position:absolute;right:30px;bottom:433px;"></div>'
                +'<div target="ctrlFunction" class="ctrlFunction mapCtrlBtns" style="position:absolute;right:30px;bottom:350px;"></div>'
                +'<div target="ctrlTopology" class="ctrlTopology mapCtrlBtns" style="position:absolute;right:30px;bottom:265px;"></div>'
                //+'<div target="infobroadcast" class="ctrlRobot mapCtrlBtns" style="width:256px;height:256px;border:none;position:absolute;right:0px;bottom:0px;"><div id="infobroadnum" class="infobroadnum" style="display:none">0</div></div>'
                +'<div target="infobroadcast" class="ctrlRobot mapCtrlBtns" style="width:162px;height:247px;border:none;position:absolute;right:15px;bottom:7px;"><div id="infobroadnum" class="infobroadnum" style="display:none">0</div></div>'
    
    $('#'+this.divId).append(btnList);

    $('.mapCtrlContent').on('click', function(event) {
        event.stopPropagation();
    });

    $('.mapCtrlBtns').on('click',this.ctrlBtnClick.bind(this));
    $('.mapCtrlItem').off('click').on('click',this.ctrlFuncClick.bind(this));
    $('.mapCtrlItemSub').on('click',this.ctrlFuncClickOfhot.bind(this));
    $('.mapCtrlItemSub').on('click',this.loadHotAccordingIndex.bind(this));

    $('.layerChooser').on('click',this.baseLayerChange.bind(this));


    //特殊处理全景热力图二级菜单
    //$('.protectiveheatlayer').on('mouseover',this.showMapCtrlContentSubmenue.bind(this));
    //$('.protectiveheatlayer').on('mouseout',this.hideMapCtrlContentSubmenue.bind(this));


    //酒店 
    $("#top5Hotel").off('click').on('click','.mapCtrlItem',this.ctrlFuncClickOfMoreHotal.bind(this));
    $("#mapCtrlContentSubmenueOfHotalDivReal").off('click').on('click','.mapCtrlItem',this.ctrlFuncClickOfMoreHotal.bind(this));

    if (FROMMODEL == null || FROMMODEL == "null"){
        $("div.mapCtrlItemSelected").removeClass('mapCtrlItemSelected');
        $("#ctrlResource").css('display', 'none');
        $("div[target='ctrlResource']").removeClass('glowSelected_ziyuan');

        $(".reyhgtsdeagSelect").addClass('mapCtrlItemSelected');
        $(".hotalSpecial").addClass('mapCtrlItemSelected');
        $(".protectiveheatlayerDDDDD").addClass('mapCtrlItemSelected');
    }
    if (FROMMODEL=='ciie'){
        //$("#ctrlResource").css('display', 'none');
        //$("div[target='ctrlResource']").removeClass('glowSelected_ziyuan');
        $("div[target='ctrlResource']").addClass('glowSelected_ziyuan');

        $(".ttttttttt").removeClass('mapCtrlItemSelected');

    }


    //更多酒店操作 666666
    $('.moreHotel').on('mouseover',this.showMapCtrlContentSubmenueOfHotal.bind(this));
    $('.moreHotel').on('mouseout',this.hideMapCtrlContentSubmenueOfHotal.bind(this));

    //更多线路操作 77777
    $('.moreCommon').on('mouseover',this.showMapCtrlContentSubmenueOfCommon.bind(this));
    $('.moreCommon').on('mouseout',this.hideMapCtrlContentSubmenueOfCommon.bind(this));

    
    
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

//showMapCtrlContentSubmenueOfCommon
CIIE.Map.prototype.showMapCtrlContentSubmenueOfCommon=function(e){
    if ($(".mapCtrlContentSubmenueOfCommonDiv").css('display') == "block") {}else{
        //控制样式
        //$('.mapCtrlContentSubmenueOfHotalDiv').show();
        $(e.currentTarget).find('.mapCtrlContentSubmenueOfCommonDiv').show();
        //控制外层宽度
        var widthArr = [];
        $(e.currentTarget).find(".mapCtrlContentSubmenueOfCommonDivReal").find('.htrdfhrgf').each(function(index, el) {
            widthArr.push($(el).width());
        });
        var maxWidth = Math.max.apply(null,widthArr) + 100 + 40 ;
        $(e.currentTarget).find(".mapCtrlContentSubmenueOfCommonDiv").width(maxWidth + 20);
        $(e.currentTarget).find(".mapCtrlContentSubmenueOfCommonDivReal").width(maxWidth);
    };
};
CIIE.Map.prototype.hideMapCtrlContentSubmenueOfCommon=function(e){
    //$('.mapCtrlContentSubmenueOfHotalDiv').hide();
    $(e.currentTarget).find('.mapCtrlContentSubmenueOfCommonDiv').hide();
    $(e.currentTarget).find(".mapCtrlContentSubmenueOfCommonDiv").width(300);
    $(e.currentTarget).find(".mapCtrlContentSubmenueOfCommonDivReal").width(300);
};





CIIE.Map.prototype.loadHotAccordingIndex=function(e){
    e.stopPropagation();
    $('.ctrlIconRedCircle').removeClass('ctrlIconRedCircleSelect').removeClass('mapCtrlItemSelected');
    $('.selfstyle ').removeClass('mapCtrlItemSelected');

    $(e.currentTarget).find('.ctrlIconRedCircle').eq(0).addClass('ctrlIconRedCircleSelect');

    //$(".protectiveheatlayer").addClass('mapCtrlItemSelected');
    $(e.currentTarget).parent().parent().parent().addClass('mapCtrlItemSelected');

}

CIIE.Map.prototype.loadHotAccordingIndexNew=function(e){
    e.stopPropagation();
    $('.indexName').removeClass('indexNameSelect');
    $(e.currentTarget).addClass('indexNameSelect');
}





CIIE.Map.prototype.baseLayerChange=function(e){
//  layerChooser
//  mapLayerD2 mapLayerD3 mapLayerSat
    
    // $('.layerChooser').removeClass('glowSelected2');
    // $(e.currentTarget).addClass('glowSelected2');
    //$('.layerChooser').hide();
    //$(e.currentTarget).siblings('.layerChooser').show();
    
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
    e.stopPropagation();
    var target=$(e.currentTarget).attr('target');
    //$('.mapCtrlBtns').removeClass('glowSelected');
    
    $('.mapCtrlBtns').removeClass('glowSelected_yaosu')
                     .removeClass('glowSelected_ziyuan')
                     .removeClass('glowSelected_xingneng')
                     .removeClass('glowSelected_gongneng')
                     .removeClass('glowSelected_tuopo');



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
        //$(e.currentTarget).addClass('glowSelected');

        if (target == "ctrlFactor") {$(e.currentTarget).addClass('glowSelected_yaosu');}
        if (target == "ctrlResource") {$(e.currentTarget).addClass('glowSelected_ziyuan');}
        if (target == "ctrlPerformance") {$(e.currentTarget).addClass('glowSelected_xingneng');}
        if (target == "ctrlFunction") {$(e.currentTarget).addClass('glowSelected_gongneng');}
        if (target == "ctrlTopology") {$(e.currentTarget).addClass('glowSelected_tuopo');}
        
       

            
        if(target == "ctrlFactor"){
            this.isLocationOfAllFctor = false;
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
                    htmlNoTop5Str += '<div class="mapCtrlItem hotalSpecial" style="float: none;height: 49px;" func="'+name+'"><div class="ctrlIconHotel"></div><div class="htrdfhrgf">'+name+'</div><div style="clear:both;"></div></div>'
                }
            };
            // $("#top5Hotel").html(htmlTop5Str);
            // $("#mapCtrlContentSubmenueOfHotalDivReal").html(htmlNoTop5Str);

            $("#top5Hotel").empty();
            $("#top5Hotel").append(htmlTop5Str);
            $("#mapCtrlContentSubmenueOfHotalDivReal").empty();
            $("#mapCtrlContentSubmenueOfHotalDivReal").append(htmlNoTop5Str);



            //特殊要求先清空 所有酒店  图层  
            var hotalData = this.hotalCache;
            for (var i = 0; i < hotalData.length; i++) {
                var currLayerHote = this.specialLayerHotelNum[i];
                if(this.map.hasLayer(currLayerHote)){
                    this.map.removeLayer(currLayerHote);
                }    
            }
            if (FROMMODEL == null || FROMMODEL == "null"){    //概览大屏
                // $(".hotalSpecial").addClass('mapCtrlItemSelected');
                // $(".ctrlTitle[func='酒店']").addClass('mapCtrlItemSelected');

                if ($(".ctrlTitle[func='酒店']").hasClass('mapCtrlItemSelected')) {
                    $(".hotalSpecial").addClass('mapCtrlItemSelected');
                }

            }else{
                //啥也不干
            }    



            //$("#top5Hotel").find('.mapCtrlItem').off('click').on('click',this.ctrlFuncClick.bind(this));
            $("#top5Hotel").off('click').on('click','.mapCtrlItem',this.ctrlFuncClickOfMoreHotal.bind(this));
            $("#mapCtrlContentSubmenueOfHotalDivReal").off('click').on('click','.mapCtrlItem',this.ctrlFuncClickOfMoreHotal.bind(this));

            

            
            if ($(".ctrlTitle[func='酒店']").hasClass('mapCtrlItemSelected')){   //如果全选,直接选中所有
                for (var i = 0; i < hotalData.length; i++) {
                    var currObj = hotalData[i];
                    var name = currObj.name;
                    if (FROMMODEL == null || FROMMODEL == "null"){    //概览大屏
                        if ($(".ctrlTitle[func='酒店']").hasClass('mapCtrlItemSelected')) {
                            this.ctrlSpecialLayerOfMoreHotal(name,true);
                        }
                    }else{
                        if ($(".ctrlTitle[func='酒店']").hasClass('mapCtrlItemSelected')) {
                            $(".hotalSpecial").addClass('mapCtrlItemSelected');
                            this.ctrlSpecialLayerOfMoreHotal(name,true);
                        }

                    }   
                } 
            } else{  //未全选中,一个一个来
                var hotalData = this.hotalCache;
                for (var i = 0; i < hotalData.length; i++) {
                    var currObj = hotalData[i];
                    var name = currObj.name;
                    var pre_select_hotal = this.hotelSelectObj;
                    for (var j = 0; j < pre_select_hotal.length; j++) {
                        var currObj = pre_select_hotal[j];
                        if (name == currObj) {
                            $(".hotalSpecial[func='"+name+"']").addClass('mapCtrlItemSelected');
                            this.ctrlSpecialLayerOfMoreHotal(name,true);
                        }
                    };
                }
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

            case '用户数_a':
                // if (this.map.hasLayer(this.shangxingLayerTDD_D)) {this.map.removeLayer(this.shangxingLayerTDD_D);}
                // if (this.map.hasLayer(this.shangxingLayerTDD_E)) {this.map.removeLayer(this.shangxingLayerTDD_E);}
                // if (this.map.hasLayer(this.shangxingLayerTDD_F)) {this.map.removeLayer(this.shangxingLayerTDD_F);}
                // if (this.map.hasLayer(this.shangxingLayerFDD_S)) {this.map.removeLayer(this.shangxingLayerFDD_S);}
                // if (this.map.hasLayer(this.shangxingLayer900M)) {this.map.removeLayer(this.shangxingLayer900M);}
                // if (this.map.hasLayer(this.shangxingLayer1800M)) {this.map.removeLayer(this.shangxingLayer1800M);}
                // $("div.yjutreds").each(function(index, el) {
                //     $(el).removeClass('mapCtrlItemSelected')
                // }.bind(this)); 
                
                //$("div.hotMap").parent().removeClass('mapCtrlItemSelected'); 
                //$("div.hotMapOfAll4Class").parent().removeClass('mapCtrlItemSelected'); 
                if (this.map.hasLayer(this.heatMapLayer)) {
                    this.map.removeLayer(this.heatMapLayer);
                }
                if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                    this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                }
                if (this.map.hasLayer(this.heatMapLayerOfAllNet)) {
                    this.map.removeLayer(this.heatMapLayerOfAllNet);
                }
                if (this.map.hasLayer(this.heatMapLayerOfRoad)) {
                    this.map.removeLayer(this.heatMapLayerOfRoad);
                }

                this.heatKpiOfAllNet = '用户数';
                this.heatMapLayer = null;
                if(this.heatMapLayer==null){
                    this.updateHeatTimeLine(this.updateHeatOfAllNet);
                }else{
                    this.map.addLayer(this.heatMapLayerOfAllNet);
                }
                break; 
            case '流量_a':
                // if (this.map.hasLayer(this.shangxingLayerTDD_D)) {this.map.removeLayer(this.shangxingLayerTDD_D);}
                // if (this.map.hasLayer(this.shangxingLayerTDD_E)) {this.map.removeLayer(this.shangxingLayerTDD_E);}
                // if (this.map.hasLayer(this.shangxingLayerTDD_F)) {this.map.removeLayer(this.shangxingLayerTDD_F);}
                // if (this.map.hasLayer(this.shangxingLayerFDD_S)) {this.map.removeLayer(this.shangxingLayerFDD_S);}
                // if (this.map.hasLayer(this.shangxingLayer900M)) {this.map.removeLayer(this.shangxingLayer900M);}
                // if (this.map.hasLayer(this.shangxingLayer1800M)) {this.map.removeLayer(this.shangxingLayer1800M);}
                // $("div.yjutreds").each(function(index, el) {
                //     $(el).removeClass('mapCtrlItemSelected')
                // }.bind(this)); 
                
                // $("div.hotMap").parent().removeClass('mapCtrlItemSelected'); 
                // $("div.hotMapOfAll4Class").parent().removeClass('mapCtrlItemSelected'); 
                if (this.map.hasLayer(this.heatMapLayer)) {
                    this.map.removeLayer(this.heatMapLayer);
                }
                if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                    this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                }
                if (this.map.hasLayer(this.heatMapLayerOfAllNet)) {
                    this.map.removeLayer(this.heatMapLayerOfAllNet);
                }
                if (this.map.hasLayer(this.heatMapLayerOfRoad)) {
                    this.map.removeLayer(this.heatMapLayerOfRoad);
                }

                this.heatKpiOfAllNet = '流量';
                this.heatMapLayer = null;
                if(this.heatMapLayer==null){
                    this.updateHeatTimeLine(this.updateHeatOfAllNet);
                }else{
                    this.map.addLayer(this.heatMapLayerOfAllNet);
                }
                break;
            case '话务量_a':
                // if (this.map.hasLayer(this.shangxingLayerTDD_D)) {this.map.removeLayer(this.shangxingLayerTDD_D);}
                // if (this.map.hasLayer(this.shangxingLayerTDD_E)) {this.map.removeLayer(this.shangxingLayerTDD_E);}
                // if (this.map.hasLayer(this.shangxingLayerTDD_F)) {this.map.removeLayer(this.shangxingLayerTDD_F);}
                // if (this.map.hasLayer(this.shangxingLayerFDD_S)) {this.map.removeLayer(this.shangxingLayerFDD_S);}
                // if (this.map.hasLayer(this.shangxingLayer900M)) {this.map.removeLayer(this.shangxingLayer900M);}
                // if (this.map.hasLayer(this.shangxingLayer1800M)) {this.map.removeLayer(this.shangxingLayer1800M);}
                // $("div.yjutreds").each(function(index, el) {
                //     $(el).removeClass('mapCtrlItemSelected')
                // }.bind(this)); 
                
                // $("div.hotMap").parent().removeClass('mapCtrlItemSelected'); 
                // $("div.hotMapOfAll4Class").parent().removeClass('mapCtrlItemSelected'); 
                if (this.map.hasLayer(this.heatMapLayer)) {
                    this.map.removeLayer(this.heatMapLayer);
                }
                if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                    this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                }
                if (this.map.hasLayer(this.heatMapLayerOfAllNet)) {
                    this.map.removeLayer(this.heatMapLayerOfAllNet);
                }
                if (this.map.hasLayer(this.heatMapLayerOfRoad)) {
                    this.map.removeLayer(this.heatMapLayerOfRoad);
                }

                this.heatKpiOfAllNet = '话务量';
                this.heatMapLayer = null;
                if(this.heatMapLayer==null){
                    this.updateHeatTimeLine(this.updateHeatOfAllNet);
                }else{
                    this.map.addLayer(this.heatMapLayerOfAllNet);
                }
                break;
            case '用户数_c':
                // if (this.map.hasLayer(this.shangxingLayerTDD_D)) {this.map.removeLayer(this.shangxingLayerTDD_D);}
                // if (this.map.hasLayer(this.shangxingLayerTDD_E)) {this.map.removeLayer(this.shangxingLayerTDD_E);}
                // if (this.map.hasLayer(this.shangxingLayerTDD_F)) {this.map.removeLayer(this.shangxingLayerTDD_F);}
                // if (this.map.hasLayer(this.shangxingLayerFDD_S)) {this.map.removeLayer(this.shangxingLayerFDD_S);}
                // if (this.map.hasLayer(this.shangxingLayer900M)) {this.map.removeLayer(this.shangxingLayer900M);}
                // if (this.map.hasLayer(this.shangxingLayer1800M)) {this.map.removeLayer(this.shangxingLayer1800M);}
                // $("div.yjutreds").each(function(index, el) {
                //     $(el).removeClass('mapCtrlItemSelected')
                // }.bind(this)); 
                
                //$("div.hotMap").parent().removeClass('mapCtrlItemSelected'); 
                //$("div.hotMapOfAll4Class").parent().removeClass('mapCtrlItemSelected'); 
                if (this.map.hasLayer(this.heatMapLayer)) {
                    this.map.removeLayer(this.heatMapLayer);
                }
                if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                    this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                }
                if (this.map.hasLayer(this.heatMapLayerOfAllNet)) {
                    this.map.removeLayer(this.heatMapLayerOfAllNet);
                }
                if (this.map.hasLayer(this.heatMapLayerOfRoad)) {
                    this.map.removeLayer(this.heatMapLayerOfRoad);
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
                // $("div.yjutreds").each(function(index, el) {
                //     $(el).removeClass('mapCtrlItemSelected')
                // }.bind(this)); 
                
                // $("div.hotMap").parent().removeClass('mapCtrlItemSelected'); 
                // $("div.hotMapOfAll4Class").parent().removeClass('mapCtrlItemSelected'); 
                if (this.map.hasLayer(this.heatMapLayer)) {
                    this.map.removeLayer(this.heatMapLayer);
                }
                if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                    this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                }
                if (this.map.hasLayer(this.heatMapLayerOfAllNet)) {
                    this.map.removeLayer(this.heatMapLayerOfAllNet);
                }
                if (this.map.hasLayer(this.heatMapLayerOfRoad)) {
                    this.map.removeLayer(this.heatMapLayerOfRoad);
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
                // $("div.yjutreds").each(function(index, el) {
                //     $(el).removeClass('mapCtrlItemSelected')
                // }.bind(this)); 
                
                // $("div.hotMap").parent().removeClass('mapCtrlItemSelected'); 
                // $("div.hotMapOfAll4Class").parent().removeClass('mapCtrlItemSelected'); 
                if (this.map.hasLayer(this.heatMapLayer)) {
                    this.map.removeLayer(this.heatMapLayer);
                }
                if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                    this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                }
                if (this.map.hasLayer(this.heatMapLayerOfAllNet)) {
                    this.map.removeLayer(this.heatMapLayerOfAllNet);
                }
                if (this.map.hasLayer(this.heatMapLayerOfRoad)) {
                    this.map.removeLayer(this.heatMapLayerOfRoad);
                }

                this.heatKpi = '话务量';
                this.heatMapLayer = null;
                if(this.heatMapLayer==null){
                    this.updateHeatTimeLine(this.updateHeat);
                }else{
                    this.map.addLayer(this.heatMapLayer);
                }
                break;
            case '用户数':
                // if (this.map.hasLayer(this.shangxingLayerTDD_D)) {this.map.removeLayer(this.shangxingLayerTDD_D);}
                // if (this.map.hasLayer(this.shangxingLayerTDD_E)) {this.map.removeLayer(this.shangxingLayerTDD_E);}
                // if (this.map.hasLayer(this.shangxingLayerTDD_F)) {this.map.removeLayer(this.shangxingLayerTDD_F);}
                // if (this.map.hasLayer(this.shangxingLayerFDD_S)) {this.map.removeLayer(this.shangxingLayerFDD_S);}
                // if (this.map.hasLayer(this.shangxingLayer900M)) {this.map.removeLayer(this.shangxingLayer900M);}
                // if (this.map.hasLayer(this.shangxingLayer1800M)) {this.map.removeLayer(this.shangxingLayer1800M);}
                // $("div.yjutreds").each(function(index, el) {
                //     $(el).removeClass('mapCtrlItemSelected')
                // }.bind(this)); 
                
                //$("div.hotMap").parent().removeClass('mapCtrlItemSelected'); 
                if (this.map.hasLayer(this.heatMapLayer)) {
                    this.map.removeLayer(this.heatMapLayer);
                }
                if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                    this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                }
                if (this.map.hasLayer(this.heatMapLayerOfAllNet)) {
                    this.map.removeLayer(this.heatMapLayerOfAllNet);
                }
                if (this.map.hasLayer(this.heatMapLayerOfRoad)) {
                    this.map.removeLayer(this.heatMapLayerOfRoad);
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
                // $("div.yjutreds").each(function(index, el) {
                //     $(el).removeClass('mapCtrlItemSelected')
                // }.bind(this)); 
                
                //$("div.hotMap").parent().removeClass('mapCtrlItemSelected'); 
                if (this.map.hasLayer(this.heatMapLayer)) {
                    this.map.removeLayer(this.heatMapLayer);
                }
                if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                    this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                }
                if (this.map.hasLayer(this.heatMapLayerOfAllNet)) {
                    this.map.removeLayer(this.heatMapLayerOfAllNet);
                }
                if (this.map.hasLayer(this.heatMapLayerOfRoad)) {
                    this.map.removeLayer(this.heatMapLayerOfRoad);
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
                // $("div.yjutreds").each(function(index, el) {
                //     $(el).removeClass('mapCtrlItemSelected')
                // }.bind(this)); 
                
                //$("div.hotMap").parent().removeClass('mapCtrlItemSelected'); 
                if (this.map.hasLayer(this.heatMapLayer)) {
                    this.map.removeLayer(this.heatMapLayer);
                }
                if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                    this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                }
                if (this.map.hasLayer(this.heatMapLayerOfAllNet)) {
                    this.map.removeLayer(this.heatMapLayerOfAllNet);
                }
                if (this.map.hasLayer(this.heatMapLayerOfRoad)) {
                    this.map.removeLayer(this.heatMapLayerOfRoad);
                }

                this.heatKpiOfAll = '话务量';
                this.heatMapLayerOfAll4BigClass = null;
                if(this.heatMapLayerOfAll4BigClass==null){
                    this.updateHeatTimeLine(this.updateHeatOfAll4BigClass);
                }else{
                    this.map.addLayer(this.heatMapLayerOfAll4BigClass);
                }
                break;
            case '用户数_r':
                // if (this.map.hasLayer(this.shangxingLayerTDD_D)) {this.map.removeLayer(this.shangxingLayerTDD_D);}
                // if (this.map.hasLayer(this.shangxingLayerTDD_E)) {this.map.removeLayer(this.shangxingLayerTDD_E);}
                // if (this.map.hasLayer(this.shangxingLayerTDD_F)) {this.map.removeLayer(this.shangxingLayerTDD_F);}
                // if (this.map.hasLayer(this.shangxingLayerFDD_S)) {this.map.removeLayer(this.shangxingLayerFDD_S);}
                // if (this.map.hasLayer(this.shangxingLayer900M)) {this.map.removeLayer(this.shangxingLayer900M);}
                // if (this.map.hasLayer(this.shangxingLayer1800M)) {this.map.removeLayer(this.shangxingLayer1800M);}
                // $("div.yjutreds").each(function(index, el) {
                //     $(el).removeClass('mapCtrlItemSelected')
                // }.bind(this)); 
                
                //$("div.hotMap").parent().removeClass('mapCtrlItemSelected'); 
                if (this.map.hasLayer(this.heatMapLayer)) {
                    this.map.removeLayer(this.heatMapLayer);
                }
                if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                    this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                }
                if (this.map.hasLayer(this.heatMapLayerOfAllNet)) {
                    this.map.removeLayer(this.heatMapLayerOfAllNet);
                }
                if (this.map.hasLayer(this.heatMapLayerOfRoad)) {
                    this.map.removeLayer(this.heatMapLayerOfRoad);
                }

                this.heatKpiOfRoad = '用户数';
                this.heatMapLayerOfRoad = null;
                if(this.heatMapLayerOfRoad==null){
                    this.addLayerOfRoad();
                }
                break; 
            case '流量_r':
                // if (this.map.hasLayer(this.shangxingLayerTDD_D)) {this.map.removeLayer(this.shangxingLayerTDD_D);}
                // if (this.map.hasLayer(this.shangxingLayerTDD_E)) {this.map.removeLayer(this.shangxingLayerTDD_E);}
                // if (this.map.hasLayer(this.shangxingLayerTDD_F)) {this.map.removeLayer(this.shangxingLayerTDD_F);}
                // if (this.map.hasLayer(this.shangxingLayerFDD_S)) {this.map.removeLayer(this.shangxingLayerFDD_S);}
                // if (this.map.hasLayer(this.shangxingLayer900M)) {this.map.removeLayer(this.shangxingLayer900M);}
                // if (this.map.hasLayer(this.shangxingLayer1800M)) {this.map.removeLayer(this.shangxingLayer1800M);}
                // $("div.yjutreds").each(function(index, el) {
                //     $(el).removeClass('mapCtrlItemSelected')
                // }.bind(this)); 
                
                //$("div.hotMap").parent().removeClass('mapCtrlItemSelected'); 
                if (this.map.hasLayer(this.heatMapLayer)) {
                    this.map.removeLayer(this.heatMapLayer);
                }
                if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                    this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                }
                if (this.map.hasLayer(this.heatMapLayerOfAllNet)) {
                    this.map.removeLayer(this.heatMapLayerOfAllNet);
                }
                if (this.map.hasLayer(this.heatMapLayerOfRoad)) {
                    this.map.removeLayer(this.heatMapLayerOfRoad);
                }

                this.heatKpiOfRoad = '流量';
                this.heatMapLayerOfRoad = null;
                if(this.heatMapLayerOfRoad==null){
                    this.addLayerOfRoad();
                }
                break;   
            case '话务量_r':
                // if (this.map.hasLayer(this.shangxingLayerTDD_D)) {this.map.removeLayer(this.shangxingLayerTDD_D);}
                // if (this.map.hasLayer(this.shangxingLayerTDD_E)) {this.map.removeLayer(this.shangxingLayerTDD_E);}
                // if (this.map.hasLayer(this.shangxingLayerTDD_F)) {this.map.removeLayer(this.shangxingLayerTDD_F);}
                // if (this.map.hasLayer(this.shangxingLayerFDD_S)) {this.map.removeLayer(this.shangxingLayerFDD_S);}
                // if (this.map.hasLayer(this.shangxingLayer900M)) {this.map.removeLayer(this.shangxingLayer900M);}
                // if (this.map.hasLayer(this.shangxingLayer1800M)) {this.map.removeLayer(this.shangxingLayer1800M);}
                // $("div.yjutreds").each(function(index, el) {
                //     $(el).removeClass('mapCtrlItemSelected')
                // }.bind(this)); 
                
                //$("div.hotMap").parent().removeClass('mapCtrlItemSelected'); 
                if (this.map.hasLayer(this.heatMapLayer)) {
                    this.map.removeLayer(this.heatMapLayer);
                }
                if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                    this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                }
                if (this.map.hasLayer(this.heatMapLayerOfAllNet)) {
                    this.map.removeLayer(this.heatMapLayerOfAllNet);
                }
                if (this.map.hasLayer(this.heatMapLayerOfRoad)) {
                    this.map.removeLayer(this.heatMapLayerOfRoad);
                }

                this.heatKpiOfRoad = '话务量';
                this.heatMapLayerOfRoad = null;
                if(this.heatMapLayerOfRoad==null){
                    this.addLayerOfRoad();
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
            // if (this.map.hasLayer(this.heatMapLayer)) {
            //     this.map.removeLayer(this.heatMapLayer);
            //     $("#ctrlFunction").find('div.hotMap').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
            // }
            // if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
            //     this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
            //     $("#ctrlFunction").find('div.hotMapOfAll4Class').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
            // }
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

        //存放所有选中的酒店
        this.hotelSelectObj = [];
        if($(e.currentTarget).hasClass('hotalSpecial')){
            $('.hotalSpecial').each(function(index, el) {
                if ($(el).hasClass('mapCtrlItemSelected')) {
                    this.hotelSelectObj.push($(el).attr('func'));
                }
            }.bind(this));
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
            case 'WIFI流量':
                $('#acApWin').hide();
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
                $("#redFontTiShi").show();
                });
                break;
            // case '2G小区':
            //     this.map.removeLayer(this.markersLayer2G);
            //     break;   
            case '基站':
                this.map.removeLayer(this.markersLayerBaseStation);
                break;    
            case '备品备件':
                //this.map.removeLayer(this.markersLayerSparePart);
                $("#spareparts").css('display', 'none');
                break; 
            case '拨测':
                this.map.removeLayer(this.markersLayerDialTest);
                break;            
            // case 'FDD小区':
            //     this.map.removeLayer(this.markersLayerFDD);
            //     break;
            // case 'TDD小区':
            //     this.map.removeLayer(this.markersLayerTDD);
            //     break;
            case '5G站点数':
                this.map.removeLayer(this.markersLayer5G);
                break;
            case '机房':
                this.map.removeLayer(this.markersLayerBaseRoom);
                break;
            case '集客专线':
            this.map.removeLayer(this.markersLayerJKSpecialLine);
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
            case '全网热力图':
                $("#hotMapMenue1").hide();
                $("#hotMapMenue2").hide();
                $("#hotMapMenue3").hide();
                $("#hotMapMenue4").hide();
                $("#legendControlBtn").hide();
                if (this.map.hasLayer(this.heatMapLayer)) {
                    this.map.removeLayer(this.heatMapLayer);
                    this.heatMapLayer = null;
                };
                if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                    this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                    this.heatMapLayerOfAll4BigClass = null;
                };
                if (this.map.hasLayer(this.heatMapLayerOfAllNet)) {
                    this.map.removeLayer(this.heatMapLayerOfAllNet);
                    this.heatMapLayerOfAllNet = null;
                };
                $(".selfstyle").each(function(index, el) {
                    $(el).find('div').eq(0).removeClass('ctrlIconRedCircleSelect');
                });
                //this.map.removeLayer(this.heatMapLayer);
                break;
            case '用户数_a':
                if (this.map.hasLayer(this.heatMapLayerOfAllNet)) {
                    this.map.removeLayer(this.heatMapLayerOfAllNet);
                    this.heatMapLayerOfAllNet = null;
                };
                //this.map.removeLayer(this.heatMapLayerOfAllNet);
                break;
            case '流量_a':
                if (this.map.hasLayer(this.heatMapLayerOfAllNet)) {
                    this.map.removeLayer(this.heatMapLayerOfAllNet);
                    this.heatMapLayerOfAllNet = null;
                };
                //this.map.removeLayer(this.heatMapLayerOfAllNet);
                break;
            case '话务量_a':
                if (this.map.hasLayer(this.heatMapLayerOfAllNet)) {
                    this.map.removeLayer(this.heatMapLayerOfAllNet);
                    this.heatMapLayerOfAllNet = null;
                };
                //this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                break;
            case '场景热力图':
                $("#hotMapMenue1").hide();
                $("#hotMapMenue2").hide();
                $("#hotMapMenue3").hide();
                $("#hotMapMenue4").hide();
                $("#legendControlBtn").hide();
                if (this.map.hasLayer(this.heatMapLayer)) {
                    this.map.removeLayer(this.heatMapLayer);
                    this.heatMapLayer = null;
                };
                if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                    this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                    this.heatMapLayerOfAll4BigClass = null;
                };
                if (this.map.hasLayer(this.heatMapLayerOfAllNet)) {
                    this.map.removeLayer(this.heatMapLayerOfAllNet);
                    this.heatMapLayerOfAllNet = null;
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
                $("#hotMapMenue1").hide();
                $("#hotMapMenue2").hide();
                $("#hotMapMenue3").hide();
                $("#hotMapMenue4").hide();
                $("#legendControlBtn").hide();
                if (this.map.hasLayer(this.heatMapLayer)) {
                    this.map.removeLayer(this.heatMapLayer);
                    this.heatMapLayer = null;
                };
                if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                    this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                    this.heatMapLayerOfAll4BigClass = null;
                };
                if (this.map.hasLayer(this.heatMapLayerOfAllNet)) {
                    this.map.removeLayer(this.heatMapLayerOfAllNet);
                    this.heatMapLayerOfAllNet = null;
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
            case '路段热力图':
                $("#hotMapMenue1").hide();
                $("#hotMapMenue2").hide();
                $("#hotMapMenue3").hide();
                $("#hotMapMenue4").hide();
                $("#legendControlBtn").hide();
                if (this.map.hasLayer(this.heatMapLayer)) {
                    this.map.removeLayer(this.heatMapLayer);
                    this.heatMapLayer = null;
                };
                if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                    this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                    this.heatMapLayerOfAll4BigClass = null;
                };
                if (this.map.hasLayer(this.heatMapLayerOfAllNet)) {
                    this.map.removeLayer(this.heatMapLayerOfAllNet);
                    this.heatMapLayerOfAllNet = null;
                };
                if (this.map.hasLayer(this.heatMapLayerOfRoad)) {
                    this.map.removeLayer(this.heatMapLayerOfRoad);
                    this.heatMapLayerOfRoad = null;
                };


                $(".selfstyle").each(function(index, el) {
                    $(el).find('div').eq(0).removeClass('ctrlIconRedCircleSelect');
                });

                //this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                break; 
            case '用户数_r':
                if (this.map.hasLayer(this.heatMapLayerOfRoad)) {
                    this.map.removeLayer(this.heatMapLayerOfRoad);
                    this.heatMapLayerOfRoad = null;
                };
                //this.map.removeLayer(this.heatMapLayerOfRoad);
                break;
            case '流量_r':
                if (this.map.hasLayer(this.heatMapLayerOfRoad)) {
                    this.map.removeLayer(this.heatMapLayerOfRoad);
                    this.heatMapLayerOfRoad = null;
                };
                //this.map.removeLayer(this.heatMapLayerOfRoad);
                break;
            case '话务量_r':
                if (this.map.hasLayer(this.heatMapLayerOfRoad)) {
                    this.map.removeLayer(this.heatMapLayerOfRoad);
                    this.heatMapLayerOfRoad = null;
                };
                //this.map.removeLayer(this.heatMapLayerOfRoad);
                break;             
            case '扇形图层':
                this.map.removeLayer(this.shangxingLayer);
                break;
            case '室内小区':
                $('div.mapCtrlItem[func="TDD-D-C"]').eq(0).trigger('click'); 
                $('div.mapCtrlItem[func="TDD-E-C"]').eq(0).trigger('click');
                $('div.mapCtrlItem[func="TDD-F-C"]').eq(0).trigger('click');
                $('div.mapCtrlItem[func="FDD-S-C"]').eq(0).trigger('click');

                $('div.mapCtrlItem[func="900M-C"]').eq(0).trigger('click'); 
                $('div.mapCtrlItem[func="1800M-C"]').eq(0).trigger('click');

                var flag1 = $('div.mapCtrlItem[func="TDD-D-C"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag1 == isToOff) {
                    $('div.mapCtrlItem[func="TDD-D-C"]').eq(0).trigger('click');
                };
                var flag2 = $('div.mapCtrlItem[func="TDD-E-C"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag2 == isToOff) {
                    $('div.mapCtrlItem[func="TDD-E-C"]').eq(0).trigger('click');
                }
                var flag3 = $('div.mapCtrlItem[func="TDD-F-C"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag3 == isToOff) {
                    $('div.mapCtrlItem[func="TDD-F-C"]').eq(0).trigger('click');
                }
                var flag4 = $('div.mapCtrlItem[func="FDD-S-C"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag4 == isToOff) {
                    $('div.mapCtrlItem[func="FDD-S-C"]').eq(0).trigger('click');
                }

                var flag11 = $('div.mapCtrlItem[func="900M-C"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag11 == isToOff) {
                    $('div.mapCtrlItem[func="900M-C"]').eq(0).trigger('click');
                };
                var flag22 = $('div.mapCtrlItem[func="1800M-C"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag22 == isToOff) {
                    $('div.mapCtrlItem[func="1800M-C"]').eq(0).trigger('click');
                }
                break;     
            case '室外小区':
                $('div.mapCtrlItem[func="TDD-D"]').eq(0).trigger('click'); 
                $('div.mapCtrlItem[func="TDD-E"]').eq(0).trigger('click');
                $('div.mapCtrlItem[func="TDD-F"]').eq(0).trigger('click');
                $('div.mapCtrlItem[func="FDD-S"]').eq(0).trigger('click');

                $('div.mapCtrlItem[func="900M"]').eq(0).trigger('click'); 
                $('div.mapCtrlItem[func="1800M"]').eq(0).trigger('click');

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

                var flag11 = $('div.mapCtrlItem[func="900M"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag11 == isToOff) {
                    $('div.mapCtrlItem[func="900M"]').eq(0).trigger('click');
                };
                var flag22 = $('div.mapCtrlItem[func="1800M"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag22 == isToOff) {
                    $('div.mapCtrlItem[func="1800M"]').eq(0).trigger('click');
                }
                break; 
            case '2G小区总数':
                this.map.removeLayer(this.markersLayer2G);


                $('div.mapCtrlItem[func="900M"]').eq(0).trigger('click'); 
                $('div.mapCtrlItem[func="1800M"]').eq(0).trigger('click');
                $('div.mapCtrlItem[func="900M-C"]').eq(0).trigger('click'); 
                $('div.mapCtrlItem[func="1800M-C"]').eq(0).trigger('click');


                


                var flag111 = $('div.mapCtrlItem[func="900M"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag111 == isToOff) {
                    $('div.mapCtrlItem[func="900M"]').eq(0).trigger('click');
                };
                var flag222 = $('div.mapCtrlItem[func="1800M"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag222 == isToOff) {
                    $('div.mapCtrlItem[func="1800M"]').eq(0).trigger('click');
                }
                var flag1111 = $('div.mapCtrlItem[func="900M-C"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag1111 == isToOff) {
                    $('div.mapCtrlItem[func="900M-C"]').eq(0).trigger('click');
                };
                var flag2221 = $('div.mapCtrlItem[func="1800M-C"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag2221 == isToOff) {
                    $('div.mapCtrlItem[func="1800M-C"]').eq(0).trigger('click');
                };
                break;
            case '4G小区总数':      //off


                this.map.removeLayer(this.markersLayerFDD);



                $('div.mapCtrlItem[func="TDD-D"]').eq(0).trigger('click'); 
                $('div.mapCtrlItem[func="TDD-E"]').eq(0).trigger('click');
                $('div.mapCtrlItem[func="TDD-F"]').eq(0).trigger('click');
                $('div.mapCtrlItem[func="FDD-S"]').eq(0).trigger('click');
                $('div.mapCtrlItem[func="TDD-D-C"]').eq(0).trigger('click'); 
                $('div.mapCtrlItem[func="TDD-E-C"]').eq(0).trigger('click');
                $('div.mapCtrlItem[func="TDD-F-C"]').eq(0).trigger('click');
                $('div.mapCtrlItem[func="FDD-S-C"]').eq(0).trigger('click');

                


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

                var flag11 = $('div.mapCtrlItem[func="TDD-D-C"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag11 == isToOff) {
                    $('div.mapCtrlItem[func="TDD-D-C"]').eq(0).trigger('click');
                };
                var flag22 = $('div.mapCtrlItem[func="TDD-E-C"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag22 == isToOff) {
                    $('div.mapCtrlItem[func="TDD-E-C"]').eq(0).trigger('click');
                }
                var flag33 = $('div.mapCtrlItem[func="TDD-F-C"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag33 == isToOff) {
                    $('div.mapCtrlItem[func="TDD-F-C"]').eq(0).trigger('click');
                }
                var flag44 = $('div.mapCtrlItem[func="FDD-S-C"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag44 == isToOff) {
                    $('div.mapCtrlItem[func="FDD-S-C"]').eq(0).trigger('click');
                }



                
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
                $(".ctrlTitle[func='室外小区']").removeClass('mapCtrlItemSelected');  
                $(".ctrlTitle[func='4G小区总数']").removeClass('mapCtrlItemSelected');  
                this.map.removeLayer(this.shangxingLayerTDD_D);
                this.map.removeLayer(this.markersLayerFDD);
                break;
            case 'TDD-E':
                $(".ctrlTitle[func='室外小区']").removeClass('mapCtrlItemSelected');  
                $(".ctrlTitle[func='4G小区总数']").removeClass('mapCtrlItemSelected');  
                this.map.removeLayer(this.shangxingLayerTDD_E);
                this.map.removeLayer(this.markersLayerFDD);
                break;    
            case 'TDD-F':
                $(".ctrlTitle[func='室外小区']").removeClass('mapCtrlItemSelected');  
                $(".ctrlTitle[func='4G小区总数']").removeClass('mapCtrlItemSelected');  
                this.map.removeLayer(this.shangxingLayerTDD_F);
                this.map.removeLayer(this.markersLayerFDD);
                break;    
            case 'FDD-S':
                $(".ctrlTitle[func='室外小区']").removeClass('mapCtrlItemSelected');  
                $(".ctrlTitle[func='4G小区总数']").removeClass('mapCtrlItemSelected');  
                this.map.removeLayer(this.shangxingLayerFDD_S);
                this.map.removeLayer(this.markersLayerFDD);
                break;
            case 'TDD-D-C':
                $(".ctrlTitle[func='室内小区']").removeClass('mapCtrlItemSelected');  
                $(".ctrlTitle[func='4G小区总数']").removeClass('mapCtrlItemSelected');  
                this.map.removeLayer(this.shangxingLayerTDD_D_C);
                this.map.removeLayer(this.markersLayerFDD);
                break;
            case 'TDD-E-C':
                $(".ctrlTitle[func='室内小区']").removeClass('mapCtrlItemSelected');  
                $(".ctrlTitle[func='4G小区总数']").removeClass('mapCtrlItemSelected');  
                this.map.removeLayer(this.shangxingLayerTDD_E_C);
                this.map.removeLayer(this.markersLayerFDD);
                break;    
            case 'TDD-F-C':
                $(".ctrlTitle[func='室内小区']").removeClass('mapCtrlItemSelected');  
                $(".ctrlTitle[func='4G小区总数']").removeClass('mapCtrlItemSelected');  
                this.map.removeLayer(this.shangxingLayerTDD_F_C);
                this.map.removeLayer(this.markersLayerFDD);
                break;    
            case 'FDD-S-C':
                $(".ctrlTitle[func='室内小区']").removeClass('mapCtrlItemSelected');  
                $(".ctrlTitle[func='4G小区总数']").removeClass('mapCtrlItemSelected');  
                this.map.removeLayer(this.shangxingLayerFDD_S_C);
                this.map.removeLayer(this.markersLayerFDD);
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
                $(".ctrlTitle[func='室外小区']").removeClass('mapCtrlItemSelected');  
                $(".ctrlTitle[func='2G小区总数']").removeClass('mapCtrlItemSelected');  
                this.map.removeLayer(this.shangxingLayer900M);
                this.map.removeLayer(this.markersLayer2G);
                break;    
            case '1800M':
                $(".ctrlTitle[func='室外小区']").removeClass('mapCtrlItemSelected');  
                $(".ctrlTitle[func='2G小区总数']").removeClass('mapCtrlItemSelected');  
                this.map.removeLayer(this.shangxingLayer1800M);
                this.map.removeLayer(this.markersLayer2G);
                break;
            case '900M-C':
                $(".ctrlTitle[func='室内小区']").removeClass('mapCtrlItemSelected');  
                $(".ctrlTitle[func='2G小区总数']").removeClass('mapCtrlItemSelected');  
                this.map.removeLayer(this.shangxingLayer900M_C);
                this.map.removeLayer(this.markersLayer2G);
                break;    
            case '1800M-C':
                $(".ctrlTitle[func='室内小区']").removeClass('mapCtrlItemSelected');  
                $(".ctrlTitle[func='2G小区总数']").removeClass('mapCtrlItemSelected');  
                this.map.removeLayer(this.shangxingLayer1800M_C);
                this.map.removeLayer(this.markersLayer2G);
                break;     
            case '交通枢纽':
                // $('div.mapCtrlItem[func="浦东机场"]').removeClass('mapCtrlItemSelected');
                // $('div.mapCtrlItem[func="虹桥机场"]').removeClass('mapCtrlItemSelected');
                // $('div.mapCtrlItem[func="虹桥站"]').removeClass('mapCtrlItemSelected');
                // $('div.mapCtrlItem[func="上海站"]').removeClass('mapCtrlItemSelected');
                // $('div.mapCtrlItem[func="上海南站"]').removeClass('mapCtrlItemSelected');
                // this.ctrlSpecialLayer('浦东机场');
                // this.ctrlSpecialLayer('虹桥机场');
                // this.ctrlSpecialLayer('虹桥站');
                // this.ctrlSpecialLayer('上海站');
                // this.ctrlSpecialLayer('上海南站');
                if (this.pdtitle == null) {} else{
                    this.pdtitle.setOpacity(1);
                    this.hqtitle.setOpacity(1);
                    this.hqttitle.setOpacity(1);
                }
                
                $('div.mapCtrlItem[func="浦东机场"]').eq(0).trigger('click'); 
                $('div.mapCtrlItem[func="虹桥机场"]').eq(0).trigger('click');
                $('div.mapCtrlItem[func="虹桥站"]').eq(0).trigger('click');
                $('div.mapCtrlItem[func="上海站"]').eq(0).trigger('click');
                $('div.mapCtrlItem[func="上海南站"]').eq(0).trigger('click');
                $('div.mapCtrlItem[func="局房图层"]').eq(0).trigger('click');

                var flag1 = $('div.mapCtrlItem[func="浦东机场"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag1 == isToOff) {
                    $('div.mapCtrlItem[func="浦东机场"]').eq(0).trigger('click');
                };
                var flag2 = $('div.mapCtrlItem[func="虹桥机场"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag2 == isToOff) {
                    $('div.mapCtrlItem[func="虹桥机场"]').eq(0).trigger('click');
                }
                var flag3 = $('div.mapCtrlItem[func="虹桥站"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag3 == isToOff) {
                    $('div.mapCtrlItem[func="虹桥站"]').eq(0).trigger('click');
                }
                var flag4 = $('div.mapCtrlItem[func="上海站"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag4 == isToOff) {
                    $('div.mapCtrlItem[func="上海站"]').eq(0).trigger('click');
                }
                var flag5 = $('div.mapCtrlItem[func="上海南站"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag5 == isToOff) {
                    $('div.mapCtrlItem[func="上海南站"]').eq(0).trigger('click');
                }
                 var flag6 = $('div.mapCtrlItem[func="局房图层"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag6 == isToOff) {
                    $('div.mapCtrlItem[func="局房图层"]').eq(0).trigger('click');
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
                $('div.mapCtrlItem[func="虹桥站线路"]').eq(0).trigger('click');
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
                var flag5 = $('div.mapCtrlItem[func="虹桥站线路"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag5 == isToOff) {
                    $('div.mapCtrlItem[func="虹桥站线路"]').eq(0).trigger('click');
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
            case '机房视频':
                $('#roomVideo').css('display','none');
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
            case '无线覆盖':
                $('#wirelessCoverage').css('display','none');
                break;
            case '5G应用':
                $('#_5GApplication').css('display','none');
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
            case '虹桥站':
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
            case '局房图层':
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
            case '虹桥站线路':
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
            case 'WIFI流量':
                $("#qcMin").attr('stat','min');
                $('#quickLocateItems>div[id!=qcMin]').hide(1000);
                this.showAcAp();
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
            // case '2G小区':
            //     this.map.addLayer(this.markersLayer2G);
            //     break;  
            case '基站':
                this.map.addLayer(this.markersLayerBaseStation);
                break;   
            case '备品备件':
                //this.map.addLayer(this.markersLayerSparePart);
                $("#spareparts").css('display', 'block');
                //this.getSpareParts();     //备件备品
                break; 
            case '拨测':
                this.map.addLayer(this.markersLayerDialTest);
                break;             
            // case 'FDD小区':
            //     this.map.addLayer(this.markersLayerFDD);
            //     break;
            // case 'TDD小区':
                this.map.addLayer(this.markersLayerTDD);
                break;
            case '5G站点数':
                this.map.addLayer(this.markersLayer5G);
                break;markersLayerJKSpecialLine
            case '机房':
                this.map.addLayer(this.markersLayerBaseRoom);
                break;
            case '集客专线':
                this.map.addLayer(this.markersLayerJKSpecialLine);
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
            case '全网热力图':
                // $("#hotMapMenue1").hide();
                // $("#hotMapMenue2").hide();
                // $("#hotMapMenue3").show();
                // $("#hotMapMenue4").hide();

                $("#hotMapMenue1").hide();
                $("#hotMapMenue2").hide();
                $("#hotMapMenue3").hide();
                $("#hotMapMenue4").hide();

                $("#legendControlBtn").show();
                // if (this.map.hasLayer(this.shangxingLayerTDD_D)) {this.map.removeLayer(this.shangxingLayerTDD_D);}
                // if (this.map.hasLayer(this.shangxingLayerTDD_E)) {this.map.removeLayer(this.shangxingLayerTDD_E);}
                // if (this.map.hasLayer(this.shangxingLayerTDD_F)) {this.map.removeLayer(this.shangxingLayerTDD_F);}
                // if (this.map.hasLayer(this.shangxingLayerFDD_S)) {this.map.removeLayer(this.shangxingLayerFDD_S);}
                // if (this.map.hasLayer(this.shangxingLayer900M)) {this.map.removeLayer(this.shangxingLayer900M);}
                // if (this.map.hasLayer(this.shangxingLayer1800M)) {this.map.removeLayer(this.shangxingLayer1800M);}
                // $("div.yjutreds").each(function(index, el) {
                //     $(el).removeClass('mapCtrlItemSelected')
                // }.bind(this)); 
                
                $("div.hotMap").parent().removeClass('mapCtrlItemSelected'); 
                //$("div.hotMapOfAllNet").parent().removeClass('mapCtrlItemSelected'); 
                $("div.hotMapOfAll4Class").parent().removeClass('mapCtrlItemSelected');
                $("div.hotMapOfRoad").parent().removeClass('mapCtrlItemSelected'); 
                if (this.map.hasLayer(this.heatMapLayer)) {
                    this.map.removeLayer(this.heatMapLayer);
                }
                if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                    this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                }
                if (this.map.hasLayer(this.heatMapLayerOfAllNet)) {
                    this.map.removeLayer(this.heatMapLayerOfAllNet);
                }
                if (this.map.hasLayer(this.heatMapLayerOfRoad)) {
                    this.map.removeLayer(this.heatMapLayerOfRoad);
                }
                
                $(".selfstyle").each(function(index, el) {
                    $(el).find('div').eq(0).removeClass('ctrlIconRedCircleSelect');
                });
                $(".indexName").each(function(index, el) {
                    $(el).removeClass('indexNameSelect');
                });
                $(".selfstyle").eq(6).find('div').eq(0).addClass('ctrlIconRedCircleSelect');
                $(".indexName").eq(6).addClass('indexNameSelect');
                this.heatKpiOfAll = '用户数';
                this.heatMapLayerOfAll4BigClass = null;
                if(this.heatMapLayerOfAll4BigClass==null){
                    this.updateHeatTimeLine(this.updateHeatOfAllNet);
                }else{
                    this.map.addLayer(this.heatMapLayerOfAllNet);
                }
                break;
            case '场景热力图':

                //定位到  国际会展中心
                $("div.quickLocate[name='J-国家会展中心']").trigger('click');

                 // $("#hotMapMenue1").hide();
                 // $("#hotMapMenue3").hide();
                 // $("#hotMapMenue2").show();
                 // $("#hotMapMenue4").hide();

                 $("#hotMapMenue1").hide();
                 $("#hotMapMenue2").hide();
                 $("#hotMapMenue3").hide();
                 $("#hotMapMenue4").hide();

                 $("#legendControlBtn").show();
                // if (this.map.hasLayer(this.shangxingLayerTDD_D)) {this.map.removeLayer(this.shangxingLayerTDD_D);}
                // if (this.map.hasLayer(this.shangxingLayerTDD_E)) {this.map.removeLayer(this.shangxingLayerTDD_E);}
                // if (this.map.hasLayer(this.shangxingLayerTDD_F)) {this.map.removeLayer(this.shangxingLayerTDD_F);}
                // if (this.map.hasLayer(this.shangxingLayerFDD_S)) {this.map.removeLayer(this.shangxingLayerFDD_S);}
                // if (this.map.hasLayer(this.shangxingLayer900M)) {this.map.removeLayer(this.shangxingLayer900M);}
                // if (this.map.hasLayer(this.shangxingLayer1800M)) {this.map.removeLayer(this.shangxingLayer1800M);}
                // $("div.yjutreds").each(function(index, el) {
                //     $(el).removeClass('mapCtrlItemSelected')
                // }.bind(this)); 

                //$("div.hotMap").parent().removeClass('mapCtrlItemSelected'); 
                $("div.hotMapOfAll4Class").parent().removeClass('mapCtrlItemSelected'); 
                $("div.hotMapOfAllNet").parent().removeClass('mapCtrlItemSelected'); 
                $("div.hotMapOfRoad").parent().removeClass('mapCtrlItemSelected'); 
                if (this.map.hasLayer(this.heatMapLayer)) {
                    this.map.removeLayer(this.heatMapLayer);
                }
                if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                    this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                }
                if (this.map.hasLayer(this.heatMapLayerOfAllNet)) {
                    this.map.removeLayer(this.heatMapLayerOfAllNet);
                }
                if (this.map.hasLayer(this.heatMapLayerOfRoad)) {
                    this.map.removeLayer(this.heatMapLayerOfRoad);
                }

                $(".selfstyle").each(function(index, el) {
                    $(el).find('div').eq(0).removeClass('ctrlIconRedCircleSelect');
                });
                $(".indexName").each(function(index, el) {
                    $(el).removeClass('indexNameSelect');
                });
                $(".selfstyle").eq(3).find('div').eq(0).addClass('ctrlIconRedCircleSelect');
                $(".indexName").eq(3).addClass('indexNameSelect');
                this.heatKpi = '用户数';
                this.heatMapLayer = null;
                if(this.heatMapLayer==null){
                    this.updateHeatTimeLine(this.updateHeat);
                }else{
                    this.map.addLayer(this.heatMapLayer);
                }
                break;
            
            case '全景热力图':
                // $("#hotMapMenue2").hide();
                // $("#hotMapMenue3").hide();
                // $("#hotMapMenue1").show();
                // $("#hotMapMenue4").hide();

                $("#hotMapMenue1").hide();
                $("#hotMapMenue2").hide();
                $("#hotMapMenue3").hide();
                $("#hotMapMenue4").hide();

                $("#legendControlBtn").show();
                // if (this.map.hasLayer(this.shangxingLayerTDD_D)) {this.map.removeLayer(this.shangxingLayerTDD_D);}
                // if (this.map.hasLayer(this.shangxingLayerTDD_E)) {this.map.removeLayer(this.shangxingLayerTDD_E);}
                // if (this.map.hasLayer(this.shangxingLayerTDD_F)) {this.map.removeLayer(this.shangxingLayerTDD_F);}
                // if (this.map.hasLayer(this.shangxingLayerFDD_S)) {this.map.removeLayer(this.shangxingLayerFDD_S);}
                // if (this.map.hasLayer(this.shangxingLayer900M)) {this.map.removeLayer(this.shangxingLayer900M);}
                // if (this.map.hasLayer(this.shangxingLayer1800M)) {this.map.removeLayer(this.shangxingLayer1800M);}
                // $("div.yjutreds").each(function(index, el) {
                //     $(el).removeClass('mapCtrlItemSelected')
                //}.bind(this)); 
                
                $("div.hotMap").parent().removeClass('mapCtrlItemSelected'); 
                $("div.hotMapOfAllNet").parent().removeClass('mapCtrlItemSelected');
                //$("div.hotMapOfAll4Class").parent().removeClass('mapCtrlItemSelected'); 
                $("div.hotMapOfRoad").parent().removeClass('mapCtrlItemSelected');  
                if (this.map.hasLayer(this.heatMapLayer)) {
                    this.map.removeLayer(this.heatMapLayer);
                }
                if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                    this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                }
                if (this.map.hasLayer(this.heatMapLayerOfAllNet)) {
                    this.map.removeLayer(this.heatMapLayerOfAllNet);
                }
                if (this.map.hasLayer(this.heatMapLayerOfRoad)) {
                    this.map.removeLayer(this.heatMapLayerOfRoad);
                }
                
                $(".selfstyle").each(function(index, el) {
                    $(el).find('div').eq(0).removeClass('ctrlIconRedCircleSelect');
                });
                $(".indexName").each(function(index, el) {
                    $(el).removeClass('indexNameSelect');
                });
                $(".selfstyle").eq(0).find('div').eq(0).addClass('ctrlIconRedCircleSelect');
                $(".indexName").eq(0).addClass('indexNameSelect');
                this.heatKpiOfAll = '用户数';
                this.heatMapLayerOfAll4BigClass = null;
                if(this.heatMapLayerOfAll4BigClass==null){
                    this.updateHeatTimeLine(this.updateHeatOfAll4BigClass);
                }else{
                    this.map.addLayer(this.heatMapLayerOfAll4BigClass);
                }
                break; 
            case '路段热力图':
                // $("#hotMapMenue2").hide();
                // $("#hotMapMenue3").hide();
                // $("#hotMapMenue1").hide();
                // $("#hotMapMenue4").show();

                $("#hotMapMenue1").hide();
                $("#hotMapMenue2").hide();
                $("#hotMapMenue3").hide();
                $("#hotMapMenue4").hide();

                $("#legendControlBtn").show();
                // if (this.map.hasLayer(this.shangxingLayerTDD_D)) {this.map.removeLayer(this.shangxingLayerTDD_D);}
                // if (this.map.hasLayer(this.shangxingLayerTDD_E)) {this.map.removeLayer(this.shangxingLayerTDD_E);}
                // if (this.map.hasLayer(this.shangxingLayerTDD_F)) {this.map.removeLayer(this.shangxingLayerTDD_F);}
                // if (this.map.hasLayer(this.shangxingLayerFDD_S)) {this.map.removeLayer(this.shangxingLayerFDD_S);}
                // if (this.map.hasLayer(this.shangxingLayer900M)) {this.map.removeLayer(this.shangxingLayer900M);}
                // if (this.map.hasLayer(this.shangxingLayer1800M)) {this.map.removeLayer(this.shangxingLayer1800M);}
                // $("div.yjutreds").each(function(index, el) {
                //     $(el).removeClass('mapCtrlItemSelected')
                // }.bind(this)); 
                
                $("div.hotMap").parent().removeClass('mapCtrlItemSelected'); 
                $("div.hotMapOfAllNet").parent().removeClass('mapCtrlItemSelected'); 
                $("div.hotMapOfAll4Class").parent().removeClass('mapCtrlItemSelected'); 
                //$("div.hotMapOfRoad").parent().removeClass('mapCtrlItemSelected'); 
                if (this.map.hasLayer(this.heatMapLayer)) {
                    this.map.removeLayer(this.heatMapLayer);
                }
                if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                    this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                }
                if (this.map.hasLayer(this.heatMapLayerOfAllNet)) {
                    this.map.removeLayer(this.heatMapLayerOfAllNet);
                }
                if (this.map.hasLayer(this.heatMapLayerOfRoad)) {
                    this.map.removeLayer(this.heatMapLayerOfRoad);
                }
                
                $(".selfstyle").each(function(index, el) {
                    $(el).find('div').eq(0).removeClass('ctrlIconRedCircleSelect');
                });
                $(".indexName").each(function(index, el) {
                    $(el).removeClass('indexNameSelect');
                });
                $(".selfstyle").eq(9).find('div').eq(0).addClass('ctrlIconRedCircleSelect');
                $(".indexName").eq(9).addClass('indexNameSelect');
                this.heatKpiOfRoad = '用户数';
                this.heatMapLayerOfRoad = null;
                if(this.heatMapLayerOfRoad==null){
                    this.addLayerOfRoad();
                }
                break;     
            case '扇形图层':
                if(this.shangxingLayer==null){
                    //this.updateHeatTimeLine(this.updateHeat);
                }else{
                    this.map.addLayer(this.shangxingLayer);
                }
                break;
            case '室内小区':
                $('div.mapCtrlItem[func="TDD-D-C"]').eq(0).trigger('click'); 
                $('div.mapCtrlItem[func="TDD-E-C"]').eq(0).trigger('click');
                $('div.mapCtrlItem[func="TDD-F-C"]').eq(0).trigger('click');
                $('div.mapCtrlItem[func="FDD-S-C"]').eq(0).trigger('click');

                $('div.mapCtrlItem[func="900M-C"]').eq(0).trigger('click'); 
                $('div.mapCtrlItem[func="1800M-C"]').eq(0).trigger('click');

                var flag1 = $('div.mapCtrlItem[func="TDD-D-C"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag1 == isToOff) {
                    $('div.mapCtrlItem[func="TDD-D-C"]').eq(0).trigger('click');
                };
                var flag2 = $('div.mapCtrlItem[func="TDD-E-C"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag2 == isToOff) {
                    $('div.mapCtrlItem[func="TDD-E-C"]').eq(0).trigger('click');
                }
                var flag3 = $('div.mapCtrlItem[func="TDD-F-C"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag3 == isToOff) {
                    $('div.mapCtrlItem[func="TDD-F-C"]').eq(0).trigger('click');
                }
                var flag4 = $('div.mapCtrlItem[func="FDD-S-C"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag4 == isToOff) {
                    $('div.mapCtrlItem[func="FDD-S-C"]').eq(0).trigger('click');
                }

                var flag11 = $('div.mapCtrlItem[func="900M-C"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag11 == isToOff) {
                    $('div.mapCtrlItem[func="900M-C"]').eq(0).trigger('click');
                };
                var flag22 = $('div.mapCtrlItem[func="1800M-C"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag22 == isToOff) {
                    $('div.mapCtrlItem[func="1800M-C"]').eq(0).trigger('click');
                }
                $("div.yjutreds").each(function(index, el) {
                    if ($(el).hasClass('mapCtrlItemSelected')){
                        var func = $(el).attr('func');
                        if (func == 'TDD-D-C') {this.map.addLayer(this.shangxingLayerTDD_D_C);}
                        if (func == 'TDD-E-C') {this.map.addLayer(this.shangxingLayerTDD_E_C);}
                        if (func == 'TDD-F-C') {this.map.addLayer(this.shangxingLayerTDD_F_C);}
                        if (func == 'FDD-S-C') {this.map.addLayer(this.shangxingLayerFDD_S_C);}
                        if (func == '900M-C') {this.map.addLayer(this.shangxingLayer900M_C);}
                        if (func == '1800M-C') {this.map.addLayer(this.shangxingLayer1800M_C);}
                    }
                }.bind(this));
                break;      
            case '室外小区':
                $('div.mapCtrlItem[func="TDD-D"]').eq(0).trigger('click'); 
                $('div.mapCtrlItem[func="TDD-E"]').eq(0).trigger('click');
                $('div.mapCtrlItem[func="TDD-F"]').eq(0).trigger('click');
                $('div.mapCtrlItem[func="FDD-S"]').eq(0).trigger('click');

                $('div.mapCtrlItem[func="900M"]').eq(0).trigger('click'); 
                $('div.mapCtrlItem[func="1800M"]').eq(0).trigger('click');

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

                var flag11 = $('div.mapCtrlItem[func="900M"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag11 == isToOff) {
                    $('div.mapCtrlItem[func="900M"]').eq(0).trigger('click');
                };
                var flag22 = $('div.mapCtrlItem[func="1800M"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag22 == isToOff) {
                    $('div.mapCtrlItem[func="1800M"]').eq(0).trigger('click');
                }
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
                break; 
            case '2G小区总数':


                 this.map.addLayer(this.markersLayer2G);
                

                // $('div.mapCtrlItem[func="TDD-D"]').eq(0).trigger('click'); 
                // $('div.mapCtrlItem[func="TDD-E"]').eq(0).trigger('click');
                // $('div.mapCtrlItem[func="TDD-F"]').eq(0).trigger('click');
                // $('div.mapCtrlItem[func="FDD-S"]').eq(0).trigger('click');
                // $('div.mapCtrlItem[func="TDD-D-C"]').eq(0).trigger('click'); 
                // $('div.mapCtrlItem[func="TDD-E-C"]').eq(0).trigger('click');
                // $('div.mapCtrlItem[func="TDD-F-C"]').eq(0).trigger('click');
                // $('div.mapCtrlItem[func="FDD-S-C"]').eq(0).trigger('click');

                $('div.mapCtrlItem[func="900M"]').eq(0).trigger('click'); 
                $('div.mapCtrlItem[func="1800M"]').eq(0).trigger('click');
                $('div.mapCtrlItem[func="900M-C"]').eq(0).trigger('click'); 
                $('div.mapCtrlItem[func="1800M-C"]').eq(0).trigger('click');


                // var flag1 = $('div.mapCtrlItem[func="TDD-D"]').eq(0).hasClass('mapCtrlItemSelected');
                // if (flag1 == isToOff) {
                //     $('div.mapCtrlItem[func="TDD-D"]').eq(0).trigger('click');
                // };
                // var flag2 = $('div.mapCtrlItem[func="TDD-E"]').eq(0).hasClass('mapCtrlItemSelected');
                // if (flag2 == isToOff) {
                //     $('div.mapCtrlItem[func="TDD-E"]').eq(0).trigger('click');
                // }
                // var flag3 = $('div.mapCtrlItem[func="TDD-F"]').eq(0).hasClass('mapCtrlItemSelected');
                // if (flag3 == isToOff) {
                //     $('div.mapCtrlItem[func="TDD-F"]').eq(0).trigger('click');
                // }
                // var flag4 = $('div.mapCtrlItem[func="FDD-S"]').eq(0).hasClass('mapCtrlItemSelected');
                // if (flag4 == isToOff) {
                //     $('div.mapCtrlItem[func="FDD-S"]').eq(0).trigger('click');
                // }

                // var flag11 = $('div.mapCtrlItem[func="TDD-D-C"]').eq(0).hasClass('mapCtrlItemSelected');
                // if (flag11 == isToOff) {
                //     $('div.mapCtrlItem[func="TDD-D-C"]').eq(0).trigger('click');
                // };
                // var flag22 = $('div.mapCtrlItem[func="TDD-E-C"]').eq(0).hasClass('mapCtrlItemSelected');
                // if (flag22 == isToOff) {
                //     $('div.mapCtrlItem[func="TDD-E-C"]').eq(0).trigger('click');
                // }
                // var flag33 = $('div.mapCtrlItem[func="TDD-F-C"]').eq(0).hasClass('mapCtrlItemSelected');
                // if (flag33 == isToOff) {
                //     $('div.mapCtrlItem[func="TDD-F-C"]').eq(0).trigger('click');
                // }
                // var flag44 = $('div.mapCtrlItem[func="FDD-S-C"]').eq(0).hasClass('mapCtrlItemSelected');
                // if (flag44 == isToOff) {
                //     $('div.mapCtrlItem[func="FDD-S-C"]').eq(0).trigger('click');
                // }



                var flag111 = $('div.mapCtrlItem[func="900M"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag111 == isToOff) {
                    $('div.mapCtrlItem[func="900M"]').eq(0).trigger('click');
                };
                var flag222 = $('div.mapCtrlItem[func="1800M"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag222 == isToOff) {
                    $('div.mapCtrlItem[func="1800M"]').eq(0).trigger('click');
                }
                var flag1111 = $('div.mapCtrlItem[func="900M-C"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag1111 == isToOff) {
                    $('div.mapCtrlItem[func="900M-C"]').eq(0).trigger('click');
                };
                var flag2221 = $('div.mapCtrlItem[func="1800M-C"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag2221 == isToOff) {
                    $('div.mapCtrlItem[func="1800M-C"]').eq(0).trigger('click');
                };

                // $("div.yjutreds").each(function(index, el) {
                //     if ($(el).hasClass('mapCtrlItemSelected')){
                //         var func = $(el).attr('func');

                //         if (func == 'TDD-D') {this.map.addLayer(this.shangxingLayerTDD_D);}
                //         if (func == 'TDD-E') {this.map.addLayer(this.shangxingLayerTDD_E);}
                //         if (func == 'TDD-F') {this.map.addLayer(this.shangxingLayerTDD_F);}
                //         if (func == 'FDD-S') {this.map.addLayer(this.shangxingLayerFDD_S);}

                //         if (func == 'TDD-D-C') {this.map.addLayer(this.shangxingLayerTDD_D_C);}
                //         if (func == 'TDD-E-C') {this.map.addLayer(this.shangxingLayerTDD_E_C);}
                //         if (func == 'TDD-F-C') {this.map.addLayer(this.shangxingLayerTDD_F_C);}
                //         if (func == 'FDD-S-C') {this.map.addLayer(this.shangxingLayerFDD_S_C);}
                        
                //         if (func == '900M') {this.map.addLayer(this.shangxingLayer900M);}
                //         if (func == '1800M') {this.map.addLayer(this.shangxingLayer1800M);}

                //         if (func == '900M-C') {this.map.addLayer(this.shangxingLayer900M_C);}
                //         if (func == '1800M-C') {this.map.addLayer(this.shangxingLayer1800M_C);}
                //     }
                // }.bind(this));
                break;
            case '4G小区总数':    //on


             
                 this.map.addLayer(this.markersLayerFDD);



                $('div.mapCtrlItem[func="TDD-D"]').eq(0).trigger('click'); 
                $('div.mapCtrlItem[func="TDD-E"]').eq(0).trigger('click');
                $('div.mapCtrlItem[func="TDD-F"]').eq(0).trigger('click');
                $('div.mapCtrlItem[func="FDD-S"]').eq(0).trigger('click');
                $('div.mapCtrlItem[func="TDD-D-C"]').eq(0).trigger('click'); 
                $('div.mapCtrlItem[func="TDD-E-C"]').eq(0).trigger('click');
                $('div.mapCtrlItem[func="TDD-F-C"]').eq(0).trigger('click');
                $('div.mapCtrlItem[func="FDD-S-C"]').eq(0).trigger('click');

                // $('div.mapCtrlItem[func="900M"]').eq(0).trigger('click'); 
                // $('div.mapCtrlItem[func="1800M"]').eq(0).trigger('click');
                // $('div.mapCtrlItem[func="900M-C"]').eq(0).trigger('click'); 
                // $('div.mapCtrlItem[func="1800M-C"]').eq(0).trigger('click');


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

                var flag11 = $('div.mapCtrlItem[func="TDD-D-C"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag11 == isToOff) {
                    $('div.mapCtrlItem[func="TDD-D-C"]').eq(0).trigger('click');
                };
                var flag22 = $('div.mapCtrlItem[func="TDD-E-C"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag22 == isToOff) {
                    $('div.mapCtrlItem[func="TDD-E-C"]').eq(0).trigger('click');
                }
                var flag33 = $('div.mapCtrlItem[func="TDD-F-C"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag33 == isToOff) {
                    $('div.mapCtrlItem[func="TDD-F-C"]').eq(0).trigger('click');
                }
                var flag44 = $('div.mapCtrlItem[func="FDD-S-C"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag44 == isToOff) {
                    $('div.mapCtrlItem[func="FDD-S-C"]').eq(0).trigger('click');
                }



                // var flag111 = $('div.mapCtrlItem[func="900M"]').eq(0).hasClass('mapCtrlItemSelected');
                // if (flag111 == isToOff) {
                //     $('div.mapCtrlItem[func="900M"]').eq(0).trigger('click');
                // };
                // var flag222 = $('div.mapCtrlItem[func="1800M"]').eq(0).hasClass('mapCtrlItemSelected');
                // if (flag222 == isToOff) {
                //     $('div.mapCtrlItem[func="1800M"]').eq(0).trigger('click');
                // }
                // var flag1111 = $('div.mapCtrlItem[func="900M-C"]').eq(0).hasClass('mapCtrlItemSelected');
                // if (flag1111 == isToOff) {
                //     $('div.mapCtrlItem[func="900M-C"]').eq(0).trigger('click');
                // };
                // var flag2221 = $('div.mapCtrlItem[func="1800M-C"]').eq(0).hasClass('mapCtrlItemSelected');
                // if (flag2221 == isToOff) {
                //     $('div.mapCtrlItem[func="1800M-C"]').eq(0).trigger('click');
                // };

                
                // $("div.yjutreds").each(function(index, el) {
                //     if ($(el).hasClass('mapCtrlItemSelected')){
                //         var func = $(el).attr('func');

                //         if (func == 'TDD-D') {this.map.addLayer(this.shangxingLayerTDD_D);}
                //         if (func == 'TDD-E') {this.map.addLayer(this.shangxingLayerTDD_E);}
                //         if (func == 'TDD-F') {this.map.addLayer(this.shangxingLayerTDD_F);}
                //         if (func == 'FDD-S') {this.map.addLayer(this.shangxingLayerFDD_S);}

                //         if (func == 'TDD-D-C') {this.map.addLayer(this.shangxingLayerTDD_D_C);}
                //         if (func == 'TDD-E-C') {this.map.addLayer(this.shangxingLayerTDD_E_C);}
                //         if (func == 'TDD-F-C') {this.map.addLayer(this.shangxingLayerTDD_F_C);}
                //         if (func == 'FDD-S-C') {this.map.addLayer(this.shangxingLayerFDD_S_C);}
                        
                        if (func == '900M') {this.map.addLayer(this.shangxingLayer900M);}
                        if (func == '1800M') {this.map.addLayer(this.shangxingLayer1800M);}

                        if (func == '900M-C') {this.map.addLayer(this.shangxingLayer900M_C);}
                        if (func == '1800M-C') {this.map.addLayer(this.shangxingLayer1800M_C);}
                //     }
                // }.bind(this));
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
                if (this.map.hasLayer(this.shangxingLayerTDD_D)) {this.map.removeLayer(this.shangxingLayerTDD_D);}
                if (this.map.hasLayer(this.shangxingLayerTDD_E)) {this.map.removeLayer(this.shangxingLayerTDD_E);}
                if (this.map.hasLayer(this.shangxingLayerTDD_F)) {this.map.removeLayer(this.shangxingLayerTDD_F);}
                if (this.map.hasLayer(this.shangxingLayerFDD_S)) {this.map.removeLayer(this.shangxingLayerFDD_S);}

                if (this.map.hasLayer(this.shangxingLayerTDD_D_C)) {this.map.removeLayer(this.shangxingLayerTDD_D_C);}
                if (this.map.hasLayer(this.shangxingLayerTDD_E_C)) {this.map.removeLayer(this.shangxingLayerTDD_E_C);}
                if (this.map.hasLayer(this.shangxingLayerTDD_F_C)) {this.map.removeLayer(this.shangxingLayerTDD_F_C);}
                if (this.map.hasLayer(this.shangxingLayerFDD_S_C)) {this.map.removeLayer(this.shangxingLayerFDD_S_C);}

                if (this.map.hasLayer(this.shangxingLayer900M)) {this.map.removeLayer(this.shangxingLayer900M);}
                if (this.map.hasLayer(this.shangxingLayer1800M)) {this.map.removeLayer(this.shangxingLayer1800M);}
                
                if (this.map.hasLayer(this.shangxingLayer900M_C)) {this.map.removeLayer(this.shangxingLayer900M_C);}
                if (this.map.hasLayer(this.shangxingLayer1800M_C)) {this.map.removeLayer(this.shangxingLayer1800M_C);}
                
                /*$("div.yjutreds").each(function(index, el) {
                    if ($(el).hasClass('mapCtrlItemSelected')){
                        var func = $(el).attr('func');
                        if (func == 'TDD-D') {this.map.addLayer(this.shangxingLayerTDD_D);}
                        if (func == 'TDD-E') {this.map.addLayer(this.shangxingLayerTDD_E);}
                        if (func == 'TDD-F') {this.map.addLayer(this.shangxingLayerTDD_F);}
                        if (func == 'FDD-S') {this.map.addLayer(this.shangxingLayerFDD_S);}

                        if (func == 'TDD-D-C') {this.map.addLayer(this.shangxingLayerTDD_D_C);}
                        if (func == 'TDD-E-C') {this.map.addLayer(this.shangxingLayerTDD_E_C);}
                        if (func == 'TDD-F-C') {this.map.addLayer(this.shangxingLayerTDD_F_C);}
                        if (func == 'FDD-S-C') {this.map.addLayer(this.shangxingLayerFDD_S_C);}

                        if (func == '900M') {this.map.addLayer(this.shangxingLayer900M);}
                        if (func == '1800M') {this.map.addLayer(this.shangxingLayer1800M);}

                        if (func == '900M-C') {this.map.addLayer(this.shangxingLayer900M_C);}
                        if (func == '1800M-C') {this.map.addLayer(this.shangxingLayer1800M_C);}
                        
                    }
                }.bind(this));  */ 

                var TDD_D_DOM = $("div.yjutreds").eq(4);
                if (TDD_D_DOM.hasClass('mapCtrlItemSelected')) {
                    var func1 = TDD_D_DOM.attr('func');
                    if (func1 == 'TDD-D') {
                        this.map.addLayer(this.shangxingLayerTDD_D);
                    };
                };
                var TDD_E_DOM = $("div.yjutreds").eq(5);
                if (TDD_E_DOM.hasClass('mapCtrlItemSelected')) {
                    var func2 = TDD_E_DOM.attr('func');
                    if (func2 == 'TDD-E') {
                        this.map.addLayer(this.shangxingLayerTDD_E);
                    }
                }
                var TDD_F_DOM = $("div.yjutreds").eq(6);
                if (TDD_F_DOM.hasClass('mapCtrlItemSelected')) {
                    var func3 = TDD_F_DOM.attr('func');
                    if (func3 == 'TDD-F') {
                        this.map.addLayer(this.shangxingLayerTDD_F);
                    }
                }
                var FDD_S_DOM = $("div.yjutreds").eq(7);
                if (FDD_S_DOM.hasClass('mapCtrlItemSelected')) {
                    var func4 = FDD_S_DOM.attr('func');
                    if (func4 == 'FDD-S') {
                        this.map.addLayer(this.shangxingLayerFDD_S);
                    }
                }

                var TDD_D_C_DOM = $("div.yjutreds").eq(8);
                if (TDD_D_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func11 = TDD_D_C_DOM.attr('func');
                    if (func11 == 'TDD-D-C') {
                        this.map.addLayer(this.shangxingLayerTDD_D_C);
                    }
                }
                var TDD_E_C_DOM = $("div.yjutreds").eq(9);
                if (TDD_E_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func22 = TDD_E_C_DOM.attr('func');
                    if (func22 == 'TDD-E-C') {
                        this.map.addLayer(this.shangxingLayerTDD_E_C);
                    }
                }
                var TDD_F_C_DOM = $("div.yjutreds").eq(10);
                if (TDD_F_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func33 = TDD_F_C_DOM.attr('func');
                    if (func33 == 'TDD-F-C') {
                        this.map.addLayer(this.shangxingLayerTDD_F_C);
                    }
                }
                var FDD_S_C_DOM = $("div.yjutreds").eq(11);
                if (FDD_S_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func44 = FDD_S_C_DOM.attr('func');
                    if (func44 == 'FDD_S-C') {
                        this.map.addLayer(this.shangxingLayerFDD_S_C);
                    }
                }

                var _900M_DOM = $("div.yjutreds").eq(0);
                if (_900M_DOM.hasClass('mapCtrlItemSelected')) {
                    var func111 = _900M_DOM.attr('func');
                    if (func111 == '900M') {
                        this.map.addLayer(this.shangxingLayer900M);
                    }
                }
                var _1800M_DOM = $("div.yjutreds").eq(1);
                if (_1800M_DOM.hasClass('mapCtrlItemSelected')) {
                    var func222 = _1800M_DOM.attr('func');
                    if (func222 == '1800M') {
                        this.map.addLayer(this.shangxingLayer1800M);
                    }
                }

                var _900M_C_DOM = $("div.yjutreds").eq(2);
                if (_900M_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func1111 = _900M_C_DOM.attr('func');
                    if (func1111 == '900M-C') {
                        this.map.addLayer(this.shangxingLayer900M_C);
                    }
                }
                var _1800M_C_DOM = $("div.yjutreds").eq(3);
                if (_1800M_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func2222 = _1800M_C_DOM.attr('func');
                    if (func2222 == '1800M-C') {
                        this.map.addLayer(this.shangxingLayer1800M_C);
                    }
                }

                





                //this.map.addLayer(this.shangxingLayerTDD_D);

                var flag1 = $('div.mapCtrlItem[func="TDD-D"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag2 = $('div.mapCtrlItem[func="TDD-E"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag3 = $('div.mapCtrlItem[func="TDD-F"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag4 = $('div.mapCtrlItem[func="FDD-S"]').eq(0).hasClass('mapCtrlItemSelected');
                
                var flag11 = $('div.mapCtrlItem[func="TDD-D-C"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag22 = $('div.mapCtrlItem[func="TDD-E-C"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag33 = $('div.mapCtrlItem[func="TDD-F-C"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag44 = $('div.mapCtrlItem[func="FDD-S-C"]').eq(0).hasClass('mapCtrlItemSelected');
                

                if (flag1 && flag2 && flag3 && flag4 && flag11 && flag22 && flag33 && flag44 ) {
                    $(".ctrlTitle[func='室外小区']").addClass('mapCtrlItemSelected');  
                    $(".ctrlTitle[func='4G小区总数']").addClass('mapCtrlItemSelected');  
                    this.map.addLayer(this.markersLayerFDD);
                }
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
                if (this.map.hasLayer(this.shangxingLayerTDD_D)) {this.map.removeLayer(this.shangxingLayerTDD_D);}
                if (this.map.hasLayer(this.shangxingLayerTDD_E)) {this.map.removeLayer(this.shangxingLayerTDD_E);}
                if (this.map.hasLayer(this.shangxingLayerTDD_F)) {this.map.removeLayer(this.shangxingLayerTDD_F);}
                if (this.map.hasLayer(this.shangxingLayerFDD_S)) {this.map.removeLayer(this.shangxingLayerFDD_S);}

                if (this.map.hasLayer(this.shangxingLayerTDD_D_C)) {this.map.removeLayer(this.shangxingLayerTDD_D_C);}
                if (this.map.hasLayer(this.shangxingLayerTDD_E_C)) {this.map.removeLayer(this.shangxingLayerTDD_E_C);}
                if (this.map.hasLayer(this.shangxingLayerTDD_F_C)) {this.map.removeLayer(this.shangxingLayerTDD_F_C);}
                if (this.map.hasLayer(this.shangxingLayerFDD_S_C)) {this.map.removeLayer(this.shangxingLayerFDD_S_C);}

                if (this.map.hasLayer(this.shangxingLayer900M)) {this.map.removeLayer(this.shangxingLayer900M);}
                if (this.map.hasLayer(this.shangxingLayer1800M)) {this.map.removeLayer(this.shangxingLayer1800M);}
                
                if (this.map.hasLayer(this.shangxingLayer900M_C)) {this.map.removeLayer(this.shangxingLayer900M_C);}
                if (this.map.hasLayer(this.shangxingLayer1800M_C)) {this.map.removeLayer(this.shangxingLayer1800M_C);}
                
                /*$("div.yjutreds").each(function(index, el) {
                    if ($(el).hasClass('mapCtrlItemSelected')){
                        var func = $(el).attr('func');
                        if (func == 'TDD-D') {this.map.addLayer(this.shangxingLayerTDD_D);}
                        if (func == 'TDD-E') {this.map.addLayer(this.shangxingLayerTDD_E);}
                        if (func == 'TDD-F') {this.map.addLayer(this.shangxingLayerTDD_F);}
                        if (func == 'FDD-S') {this.map.addLayer(this.shangxingLayerFDD_S);}

                        if (func == 'TDD-D-C') {this.map.addLayer(this.shangxingLayerTDD_D_C);}
                        if (func == 'TDD-E-C') {this.map.addLayer(this.shangxingLayerTDD_E_C);}
                        if (func == 'TDD-F-C') {this.map.addLayer(this.shangxingLayerTDD_F_C);}
                        if (func == 'FDD-S-C') {this.map.addLayer(this.shangxingLayerFDD_S_C);}

                        if (func == '900M') {this.map.addLayer(this.shangxingLayer900M);}
                        if (func == '1800M') {this.map.addLayer(this.shangxingLayer1800M);}

                        if (func == '900M-C') {this.map.addLayer(this.shangxingLayer900M_C);}
                        if (func == '1800M-C') {this.map.addLayer(this.shangxingLayer1800M_C);}
                        
                    }
                }.bind(this));  */ 

                var TDD_D_DOM = $("div.yjutreds").eq(4);
                if (TDD_D_DOM.hasClass('mapCtrlItemSelected')) {
                    var func1 = TDD_D_DOM.attr('func');
                    if (func1 == 'TDD-D') {
                        this.map.addLayer(this.shangxingLayerTDD_D);
                    };
                };
                var TDD_E_DOM = $("div.yjutreds").eq(5);
                if (TDD_E_DOM.hasClass('mapCtrlItemSelected')) {
                    var func2 = TDD_E_DOM.attr('func');
                    if (func2 == 'TDD-E') {
                        this.map.addLayer(this.shangxingLayerTDD_E);
                    }
                }
                var TDD_F_DOM = $("div.yjutreds").eq(6);
                if (TDD_F_DOM.hasClass('mapCtrlItemSelected')) {
                    var func3 = TDD_F_DOM.attr('func');
                    if (func3 == 'TDD-F') {
                        this.map.addLayer(this.shangxingLayerTDD_F);
                    }
                }
                var FDD_S_DOM = $("div.yjutreds").eq(7);
                if (FDD_S_DOM.hasClass('mapCtrlItemSelected')) {
                    var func4 = FDD_S_DOM.attr('func');
                    if (func4 == 'FDD-S') {
                        this.map.addLayer(this.shangxingLayerFDD_S);
                    }
                }

                var TDD_D_C_DOM = $("div.yjutreds").eq(8);
                if (TDD_D_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func11 = TDD_D_C_DOM.attr('func');
                    if (func11 == 'TDD-D-C') {
                        this.map.addLayer(this.shangxingLayerTDD_D_C);
                    }
                }
                var TDD_E_C_DOM = $("div.yjutreds").eq(9);
                if (TDD_E_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func22 = TDD_E_C_DOM.attr('func');
                    if (func22 == 'TDD-E-C') {
                        this.map.addLayer(this.shangxingLayerTDD_E_C);
                    }
                }
                var TDD_F_C_DOM = $("div.yjutreds").eq(10);
                if (TDD_F_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func33 = TDD_F_C_DOM.attr('func');
                    if (func33 == 'TDD-F-C') {
                        this.map.addLayer(this.shangxingLayerTDD_F_C);
                    }
                }
                var FDD_S_C_DOM = $("div.yjutreds").eq(11);
                if (FDD_S_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func44 = FDD_S_C_DOM.attr('func');
                    if (func44 == 'FDD_S-C') {
                        this.map.addLayer(this.shangxingLayerFDD_S_C);
                    }
                }

                var _900M_DOM = $("div.yjutreds").eq(0);
                if (_900M_DOM.hasClass('mapCtrlItemSelected')) {
                    var func111 = _900M_DOM.attr('func');
                    if (func111 == '900M') {
                        this.map.addLayer(this.shangxingLayer900M);
                    }
                }
                var _1800M_DOM = $("div.yjutreds").eq(1);
                if (_1800M_DOM.hasClass('mapCtrlItemSelected')) {
                    var func222 = _1800M_DOM.attr('func');
                    if (func222 == '1800M') {
                        this.map.addLayer(this.shangxingLayer1800M);
                    }
                }

                var _900M_C_DOM = $("div.yjutreds").eq(2);
                if (_900M_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func1111 = _900M_C_DOM.attr('func');
                    if (func1111 == '900M-C') {
                        this.map.addLayer(this.shangxingLayer900M_C);
                    }
                }
                var _1800M_C_DOM = $("div.yjutreds").eq(3);
                if (_1800M_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func2222 = _1800M_C_DOM.attr('func');
                    if (func2222 == '1800M-C') {
                        this.map.addLayer(this.shangxingLayer1800M_C);
                    }
                } 
                //this.map.addLayer(this.shangxingLayerTDD_D);

                var flag1 = $('div.mapCtrlItem[func="TDD-D"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag2 = $('div.mapCtrlItem[func="TDD-E"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag3 = $('div.mapCtrlItem[func="TDD-F"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag4 = $('div.mapCtrlItem[func="FDD-S"]').eq(0).hasClass('mapCtrlItemSelected');
                
                var flag11 = $('div.mapCtrlItem[func="TDD-D-C"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag22 = $('div.mapCtrlItem[func="TDD-E-C"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag33 = $('div.mapCtrlItem[func="TDD-F-C"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag44 = $('div.mapCtrlItem[func="FDD-S-C"]').eq(0).hasClass('mapCtrlItemSelected');
                

                if (flag1 && flag2 && flag3 && flag4 && flag11 && flag22 && flag33 && flag44 ) {
                    $(".ctrlTitle[func='室外小区']").addClass('mapCtrlItemSelected');  
                    $(".ctrlTitle[func='4G小区总数']").addClass('mapCtrlItemSelected');  
                    this.map.addLayer(this.markersLayerFDD);
                }
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
                if (this.map.hasLayer(this.shangxingLayerTDD_D)) {this.map.removeLayer(this.shangxingLayerTDD_D);}
                if (this.map.hasLayer(this.shangxingLayerTDD_E)) {this.map.removeLayer(this.shangxingLayerTDD_E);}
                if (this.map.hasLayer(this.shangxingLayerTDD_F)) {this.map.removeLayer(this.shangxingLayerTDD_F);}
                if (this.map.hasLayer(this.shangxingLayerFDD_S)) {this.map.removeLayer(this.shangxingLayerFDD_S);}

                if (this.map.hasLayer(this.shangxingLayerTDD_D_C)) {this.map.removeLayer(this.shangxingLayerTDD_D_C);}
                if (this.map.hasLayer(this.shangxingLayerTDD_E_C)) {this.map.removeLayer(this.shangxingLayerTDD_E_C);}
                if (this.map.hasLayer(this.shangxingLayerTDD_F_C)) {this.map.removeLayer(this.shangxingLayerTDD_F_C);}
                if (this.map.hasLayer(this.shangxingLayerFDD_S_C)) {this.map.removeLayer(this.shangxingLayerFDD_S_C);}

                if (this.map.hasLayer(this.shangxingLayer900M)) {this.map.removeLayer(this.shangxingLayer900M);}
                if (this.map.hasLayer(this.shangxingLayer1800M)) {this.map.removeLayer(this.shangxingLayer1800M);}
                
                if (this.map.hasLayer(this.shangxingLayer900M_C)) {this.map.removeLayer(this.shangxingLayer900M_C);}
                if (this.map.hasLayer(this.shangxingLayer1800M_C)) {this.map.removeLayer(this.shangxingLayer1800M_C);}
                
                /*$("div.yjutreds").each(function(index, el) {
                    if ($(el).hasClass('mapCtrlItemSelected')){
                        var func = $(el).attr('func');
                        if (func == 'TDD-D') {this.map.addLayer(this.shangxingLayerTDD_D);}
                        if (func == 'TDD-E') {this.map.addLayer(this.shangxingLayerTDD_E);}
                        if (func == 'TDD-F') {this.map.addLayer(this.shangxingLayerTDD_F);}
                        if (func == 'FDD-S') {this.map.addLayer(this.shangxingLayerFDD_S);}

                        if (func == 'TDD-D-C') {this.map.addLayer(this.shangxingLayerTDD_D_C);}
                        if (func == 'TDD-E-C') {this.map.addLayer(this.shangxingLayerTDD_E_C);}
                        if (func == 'TDD-F-C') {this.map.addLayer(this.shangxingLayerTDD_F_C);}
                        if (func == 'FDD-S-C') {this.map.addLayer(this.shangxingLayerFDD_S_C);}

                        if (func == '900M') {this.map.addLayer(this.shangxingLayer900M);}
                        if (func == '1800M') {this.map.addLayer(this.shangxingLayer1800M);}

                        if (func == '900M-C') {this.map.addLayer(this.shangxingLayer900M_C);}
                        if (func == '1800M-C') {this.map.addLayer(this.shangxingLayer1800M_C);}
                        
                    }
                }.bind(this));  */ 

                var TDD_D_DOM = $("div.yjutreds").eq(4);
                if (TDD_D_DOM.hasClass('mapCtrlItemSelected')) {
                    var func1 = TDD_D_DOM.attr('func');
                    if (func1 == 'TDD-D') {
                        this.map.addLayer(this.shangxingLayerTDD_D);
                    };
                };
                var TDD_E_DOM = $("div.yjutreds").eq(5);
                if (TDD_E_DOM.hasClass('mapCtrlItemSelected')) {
                    var func2 = TDD_E_DOM.attr('func');
                    if (func2 == 'TDD-E') {
                        this.map.addLayer(this.shangxingLayerTDD_E);
                    }
                }
                var TDD_F_DOM = $("div.yjutreds").eq(6);
                if (TDD_F_DOM.hasClass('mapCtrlItemSelected')) {
                    var func3 = TDD_F_DOM.attr('func');
                    if (func3 == 'TDD-F') {
                        this.map.addLayer(this.shangxingLayerTDD_F);
                    }
                }
                var FDD_S_DOM = $("div.yjutreds").eq(7);
                if (FDD_S_DOM.hasClass('mapCtrlItemSelected')) {
                    var func4 = FDD_S_DOM.attr('func');
                    if (func4 == 'FDD-S') {
                        this.map.addLayer(this.shangxingLayerFDD_S);
                    }
                }

                var TDD_D_C_DOM = $("div.yjutreds").eq(8);
                if (TDD_D_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func11 = TDD_D_C_DOM.attr('func');
                    if (func11 == 'TDD-D-C') {
                        this.map.addLayer(this.shangxingLayerTDD_D_C);
                    }
                }
                var TDD_E_C_DOM = $("div.yjutreds").eq(9);
                if (TDD_E_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func22 = TDD_E_C_DOM.attr('func');
                    if (func22 == 'TDD-E-C') {
                        this.map.addLayer(this.shangxingLayerTDD_E_C);
                    }
                }
                var TDD_F_C_DOM = $("div.yjutreds").eq(10);
                if (TDD_F_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func33 = TDD_F_C_DOM.attr('func');
                    if (func33 == 'TDD-F-C') {
                        this.map.addLayer(this.shangxingLayerTDD_F_C);
                    }
                }
                var FDD_S_C_DOM = $("div.yjutreds").eq(11);
                if (FDD_S_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func44 = FDD_S_C_DOM.attr('func');
                    if (func44 == 'FDD_S-C') {
                        this.map.addLayer(this.shangxingLayerFDD_S_C);
                    }
                }

                var _900M_DOM = $("div.yjutreds").eq(0);
                if (_900M_DOM.hasClass('mapCtrlItemSelected')) {
                    var func111 = _900M_DOM.attr('func');
                    if (func111 == '900M') {
                        this.map.addLayer(this.shangxingLayer900M);
                    }
                }
                var _1800M_DOM = $("div.yjutreds").eq(1);
                if (_1800M_DOM.hasClass('mapCtrlItemSelected')) {
                    var func222 = _1800M_DOM.attr('func');
                    if (func222 == '1800M') {
                        this.map.addLayer(this.shangxingLayer1800M);
                    }
                }

                var _900M_C_DOM = $("div.yjutreds").eq(2);
                if (_900M_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func1111 = _900M_C_DOM.attr('func');
                    if (func1111 == '900M-C') {
                        this.map.addLayer(this.shangxingLayer900M_C);
                    }
                }
                var _1800M_C_DOM = $("div.yjutreds").eq(3);
                if (_1800M_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func2222 = _1800M_C_DOM.attr('func');
                    if (func2222 == '1800M-C') {
                        this.map.addLayer(this.shangxingLayer1800M_C);
                    }
                } 
                //this.map.addLayer(this.shangxingLayerTDD_D);

                var flag1 = $('div.mapCtrlItem[func="TDD-D"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag2 = $('div.mapCtrlItem[func="TDD-E"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag3 = $('div.mapCtrlItem[func="TDD-F"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag4 = $('div.mapCtrlItem[func="FDD-S"]').eq(0).hasClass('mapCtrlItemSelected');
                
                var flag11 = $('div.mapCtrlItem[func="TDD-D-C"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag22 = $('div.mapCtrlItem[func="TDD-E-C"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag33 = $('div.mapCtrlItem[func="TDD-F-C"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag44 = $('div.mapCtrlItem[func="FDD-S-C"]').eq(0).hasClass('mapCtrlItemSelected');
                

                if (flag1 && flag2 && flag3 && flag4 && flag11 && flag22 && flag33 && flag44 ) {
                    $(".ctrlTitle[func='室外小区']").addClass('mapCtrlItemSelected');  
                    $(".ctrlTitle[func='4G小区总数']").addClass('mapCtrlItemSelected');  
                    this.map.addLayer(this.markersLayerFDD);
                }
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
                if (this.map.hasLayer(this.shangxingLayerTDD_D)) {this.map.removeLayer(this.shangxingLayerTDD_D);}
                if (this.map.hasLayer(this.shangxingLayerTDD_E)) {this.map.removeLayer(this.shangxingLayerTDD_E);}
                if (this.map.hasLayer(this.shangxingLayerTDD_F)) {this.map.removeLayer(this.shangxingLayerTDD_F);}
                if (this.map.hasLayer(this.shangxingLayerFDD_S)) {this.map.removeLayer(this.shangxingLayerFDD_S);}

                if (this.map.hasLayer(this.shangxingLayerTDD_D_C)) {this.map.removeLayer(this.shangxingLayerTDD_D_C);}
                if (this.map.hasLayer(this.shangxingLayerTDD_E_C)) {this.map.removeLayer(this.shangxingLayerTDD_E_C);}
                if (this.map.hasLayer(this.shangxingLayerTDD_F_C)) {this.map.removeLayer(this.shangxingLayerTDD_F_C);}
                if (this.map.hasLayer(this.shangxingLayerFDD_S_C)) {this.map.removeLayer(this.shangxingLayerFDD_S_C);}

                if (this.map.hasLayer(this.shangxingLayer900M)) {this.map.removeLayer(this.shangxingLayer900M);}
                if (this.map.hasLayer(this.shangxingLayer1800M)) {this.map.removeLayer(this.shangxingLayer1800M);}
                
                if (this.map.hasLayer(this.shangxingLayer900M_C)) {this.map.removeLayer(this.shangxingLayer900M_C);}
                if (this.map.hasLayer(this.shangxingLayer1800M_C)) {this.map.removeLayer(this.shangxingLayer1800M_C);}
                
                /*$("div.yjutreds").each(function(index, el) {
                    if ($(el).hasClass('mapCtrlItemSelected')){
                        var func = $(el).attr('func');
                        if (func == 'TDD-D') {this.map.addLayer(this.shangxingLayerTDD_D);}
                        if (func == 'TDD-E') {this.map.addLayer(this.shangxingLayerTDD_E);}
                        if (func == 'TDD-F') {this.map.addLayer(this.shangxingLayerTDD_F);}
                        if (func == 'FDD-S') {this.map.addLayer(this.shangxingLayerFDD_S);}

                        if (func == 'TDD-D-C') {this.map.addLayer(this.shangxingLayerTDD_D_C);}
                        if (func == 'TDD-E-C') {this.map.addLayer(this.shangxingLayerTDD_E_C);}
                        if (func == 'TDD-F-C') {this.map.addLayer(this.shangxingLayerTDD_F_C);}
                        if (func == 'FDD-S-C') {this.map.addLayer(this.shangxingLayerFDD_S_C);}

                        if (func == '900M') {this.map.addLayer(this.shangxingLayer900M);}
                        if (func == '1800M') {this.map.addLayer(this.shangxingLayer1800M);}

                        if (func == '900M-C') {this.map.addLayer(this.shangxingLayer900M_C);}
                        if (func == '1800M-C') {this.map.addLayer(this.shangxingLayer1800M_C);}
                        
                    }
                }.bind(this));  */ 

                var TDD_D_DOM = $("div.yjutreds").eq(4);
                if (TDD_D_DOM.hasClass('mapCtrlItemSelected')) {
                    var func1 = TDD_D_DOM.attr('func');
                    if (func1 == 'TDD-D') {
                        this.map.addLayer(this.shangxingLayerTDD_D);
                    };
                };
                var TDD_E_DOM = $("div.yjutreds").eq(5);
                if (TDD_E_DOM.hasClass('mapCtrlItemSelected')) {
                    var func2 = TDD_E_DOM.attr('func');
                    if (func2 == 'TDD-E') {
                        this.map.addLayer(this.shangxingLayerTDD_E);
                    }
                }
                var TDD_F_DOM = $("div.yjutreds").eq(6);
                if (TDD_F_DOM.hasClass('mapCtrlItemSelected')) {
                    var func3 = TDD_F_DOM.attr('func');
                    if (func3 == 'TDD-F') {
                        this.map.addLayer(this.shangxingLayerTDD_F);
                    }
                }
                var FDD_S_DOM = $("div.yjutreds").eq(7);
                if (FDD_S_DOM.hasClass('mapCtrlItemSelected')) {
                    var func4 = FDD_S_DOM.attr('func');
                    if (func4 == 'FDD-S') {
                        this.map.addLayer(this.shangxingLayerFDD_S);
                    }
                }

                var TDD_D_C_DOM = $("div.yjutreds").eq(8);
                if (TDD_D_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func11 = TDD_D_C_DOM.attr('func');
                    if (func11 == 'TDD-D-C') {
                        this.map.addLayer(this.shangxingLayerTDD_D_C);
                    }
                }
                var TDD_E_C_DOM = $("div.yjutreds").eq(9);
                if (TDD_E_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func22 = TDD_E_C_DOM.attr('func');
                    if (func22 == 'TDD-E-C') {
                        this.map.addLayer(this.shangxingLayerTDD_E_C);
                    }
                }
                var TDD_F_C_DOM = $("div.yjutreds").eq(10);
                if (TDD_F_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func33 = TDD_F_C_DOM.attr('func');
                    if (func33 == 'TDD-F-C') {
                        this.map.addLayer(this.shangxingLayerTDD_F_C);
                    }
                }
                var FDD_S_C_DOM = $("div.yjutreds").eq(11);
                if (FDD_S_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func44 = FDD_S_C_DOM.attr('func');
                    if (func44 == 'FDD_S-C') {
                        this.map.addLayer(this.shangxingLayerFDD_S_C);
                    }
                }

                var _900M_DOM = $("div.yjutreds").eq(0);
                if (_900M_DOM.hasClass('mapCtrlItemSelected')) {
                    var func111 = _900M_DOM.attr('func');
                    if (func111 == '900M') {
                        this.map.addLayer(this.shangxingLayer900M);
                    }
                }
                var _1800M_DOM = $("div.yjutreds").eq(1);
                if (_1800M_DOM.hasClass('mapCtrlItemSelected')) {
                    var func222 = _1800M_DOM.attr('func');
                    if (func222 == '1800M') {
                        this.map.addLayer(this.shangxingLayer1800M);
                    }
                }

                var _900M_C_DOM = $("div.yjutreds").eq(2);
                if (_900M_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func1111 = _900M_C_DOM.attr('func');
                    if (func1111 == '900M-C') {
                        this.map.addLayer(this.shangxingLayer900M_C);
                    }
                }
                var _1800M_C_DOM = $("div.yjutreds").eq(3);
                if (_1800M_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func2222 = _1800M_C_DOM.attr('func');
                    if (func2222 == '1800M-C') {
                        this.map.addLayer(this.shangxingLayer1800M_C);
                    }
                } 
                //this.map.addLayer(this.shangxingLayerTDD_D);

                var flag1 = $('div.mapCtrlItem[func="TDD-D"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag2 = $('div.mapCtrlItem[func="TDD-E"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag3 = $('div.mapCtrlItem[func="TDD-F"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag4 = $('div.mapCtrlItem[func="FDD-S"]').eq(0).hasClass('mapCtrlItemSelected');
                
                var flag11 = $('div.mapCtrlItem[func="TDD-D-C"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag22 = $('div.mapCtrlItem[func="TDD-E-C"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag33 = $('div.mapCtrlItem[func="TDD-F-C"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag44 = $('div.mapCtrlItem[func="FDD-S-C"]').eq(0).hasClass('mapCtrlItemSelected');
                

                if (flag1 && flag2 && flag3 && flag4 && flag11 && flag22 && flag33 && flag44 ) {
                    $(".ctrlTitle[func='室外小区']").addClass('mapCtrlItemSelected');  
                    $(".ctrlTitle[func='4G小区总数']").addClass('mapCtrlItemSelected');  
                    this.map.addLayer(this.markersLayerFDD);
                }
                break;
            case 'TDD-D-C':
                // if (this.map.hasLayer(this.heatMapLayer)) {
                //     this.map.removeLayer(this.heatMapLayer);
                //     $("#ctrlFunction").find('div.hotMap').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }
                // if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                //     this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                //     $("#ctrlFunction").find('div.hotMapOfAll4Class').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }
                if (this.map.hasLayer(this.shangxingLayerTDD_D_C)) {this.map.removeLayer(this.shangxingLayerTDD_D_C);}
                if (this.map.hasLayer(this.shangxingLayerTDD_E_C)) {this.map.removeLayer(this.shangxingLayerTDD_E_C);}
                if (this.map.hasLayer(this.shangxingLayerTDD_F_C)) {this.map.removeLayer(this.shangxingLayerTDD_F_C);}
                if (this.map.hasLayer(this.shangxingLayerFDD_S_C)) {this.map.removeLayer(this.shangxingLayerFDD_S_C);}
                if (this.map.hasLayer(this.shangxingLayer900M_C)) {this.map.removeLayer(this.shangxingLayer900M_C);}
                if (this.map.hasLayer(this.shangxingLayer1800M_C)) {this.map.removeLayer(this.shangxingLayer1800M_C);}
                /*$("div.yjutreds").each(function(index, el) {
                    if ($(el).hasClass('mapCtrlItemSelected')){
                        var func = $(el).attr('func');
                        if (func == 'TDD-D') {this.map.addLayer(this.shangxingLayerTDD_D);}
                        if (func == 'TDD-E') {this.map.addLayer(this.shangxingLayerTDD_E);}
                        if (func == 'TDD-F') {this.map.addLayer(this.shangxingLayerTDD_F);}
                        if (func == 'FDD-S') {this.map.addLayer(this.shangxingLayerFDD_S);}

                        if (func == 'TDD-D-C') {this.map.addLayer(this.shangxingLayerTDD_D_C);}
                        if (func == 'TDD-E-C') {this.map.addLayer(this.shangxingLayerTDD_E_C);}
                        if (func == 'TDD-F-C') {this.map.addLayer(this.shangxingLayerTDD_F_C);}
                        if (func == 'FDD-S-C') {this.map.addLayer(this.shangxingLayerFDD_S_C);}

                        if (func == '900M') {this.map.addLayer(this.shangxingLayer900M);}
                        if (func == '1800M') {this.map.addLayer(this.shangxingLayer1800M);}

                        if (func == '900M-C') {this.map.addLayer(this.shangxingLayer900M_C);}
                        if (func == '1800M-C') {this.map.addLayer(this.shangxingLayer1800M_C);}
                        
                    }
                }.bind(this)); */

                var TDD_D_DOM = $("div.yjutreds").eq(4);
                if (TDD_D_DOM.hasClass('mapCtrlItemSelected')) {
                    var func1 = TDD_D_DOM.attr('func');
                    if (func1 == 'TDD-D') {
                        this.map.addLayer(this.shangxingLayerTDD_D);
                    };
                };
                var TDD_E_DOM = $("div.yjutreds").eq(5);
                if (TDD_E_DOM.hasClass('mapCtrlItemSelected')) {
                    var func2 = TDD_E_DOM.attr('func');
                    if (func2 == 'TDD-E') {
                        this.map.addLayer(this.shangxingLayerTDD_E);
                    }
                }
                var TDD_F_DOM = $("div.yjutreds").eq(6);
                if (TDD_F_DOM.hasClass('mapCtrlItemSelected')) {
                    var func3 = TDD_F_DOM.attr('func');
                    if (func3 == 'TDD-F') {
                        this.map.addLayer(this.shangxingLayerTDD_F);
                    }
                }
                var FDD_S_DOM = $("div.yjutreds").eq(7);
                if (FDD_S_DOM.hasClass('mapCtrlItemSelected')) {
                    var func4 = FDD_S_DOM.attr('func');
                    if (func4 == 'FDD-S') {
                        this.map.addLayer(this.shangxingLayerFDD_S);
                    }
                }

                var TDD_D_C_DOM = $("div.yjutreds").eq(8);
                if (TDD_D_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func11 = TDD_D_C_DOM.attr('func');
                    if (func11 == 'TDD-D-C') {
                        this.map.addLayer(this.shangxingLayerTDD_D_C);
                    }
                }
                var TDD_E_C_DOM = $("div.yjutreds").eq(9);
                if (TDD_E_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func22 = TDD_E_C_DOM.attr('func');
                    if (func22 == 'TDD-E-C') {
                        this.map.addLayer(this.shangxingLayerTDD_E_C);
                    }
                }
                var TDD_F_C_DOM = $("div.yjutreds").eq(10);
                if (TDD_F_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func33 = TDD_F_C_DOM.attr('func');
                    if (func33 == 'TDD-F-C') {
                        this.map.addLayer(this.shangxingLayerTDD_F_C);
                    }
                }
                var FDD_S_C_DOM = $("div.yjutreds").eq(11);
                if (FDD_S_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func44 = FDD_S_C_DOM.attr('func');
                    if (func44 == 'FDD_S-C') {
                        this.map.addLayer(this.shangxingLayerFDD_S_C);
                    }
                }

                var _900M_DOM = $("div.yjutreds").eq(0);
                if (_900M_DOM.hasClass('mapCtrlItemSelected')) {
                    var func111 = _900M_DOM.attr('func');
                    if (func111 == '900M') {
                        this.map.addLayer(this.shangxingLayer900M);
                    }
                }
                var _1800M_DOM = $("div.yjutreds").eq(1);
                if (_1800M_DOM.hasClass('mapCtrlItemSelected')) {
                    var func222 = _1800M_DOM.attr('func');
                    if (func222 == '1800M') {
                        this.map.addLayer(this.shangxingLayer1800M);
                    }
                }

                var _900M_C_DOM = $("div.yjutreds").eq(2);
                if (_900M_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func1111 = _900M_C_DOM.attr('func');
                    if (func1111 == '900M-C') {
                        this.map.addLayer(this.shangxingLayer900M_C);
                    }
                }
                var _1800M_C_DOM = $("div.yjutreds").eq(3);
                if (_1800M_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func2222 = _1800M_C_DOM.attr('func');
                    if (func2222 == '1800M-C') {
                        this.map.addLayer(this.shangxingLayer1800M_C);
                    }
                }
 

                //this.map.addLayer(this.shangxingLayerTDD_D);
                var flag1 = $('div.mapCtrlItem[func="TDD-D-C"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag2 = $('div.mapCtrlItem[func="TDD-E-C"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag3 = $('div.mapCtrlItem[func="TDD-F-C"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag4 = $('div.mapCtrlItem[func="FDD-S-C"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag5 = $('div.mapCtrlItem[func="900M-C"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag6 = $('div.mapCtrlItem[func="1800M-C"]').eq(0).hasClass('mapCtrlItemSelected');

                if (flag1 && flag2 && flag3 && flag4 && flag5 && flag6 ) {
                    $(".ctrlTitle[func='室内小区']").addClass('mapCtrlItemSelected'); 
                    $(".ctrlTitle[func='4G小区总数']").addClass('mapCtrlItemSelected');  
                    this.map.addLayer(this.markersLayerFDD); 
                }
                break;
            case 'TDD-E-C':
                // if (this.map.hasLayer(this.heatMapLayer)) {
                //     this.map.removeLayer(this.heatMapLayer);
                //     $("#ctrlFunction").find('div.hotMap').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }
                // if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                //     this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                //     $("#ctrlFunction").find('div.hotMapOfAll4Class').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }
                if (this.map.hasLayer(this.shangxingLayerTDD_D)) {this.map.removeLayer(this.shangxingLayerTDD_D);}
                if (this.map.hasLayer(this.shangxingLayerTDD_E)) {this.map.removeLayer(this.shangxingLayerTDD_E);}
                if (this.map.hasLayer(this.shangxingLayerTDD_F)) {this.map.removeLayer(this.shangxingLayerTDD_F);}
                if (this.map.hasLayer(this.shangxingLayerFDD_S)) {this.map.removeLayer(this.shangxingLayerFDD_S);}

                if (this.map.hasLayer(this.shangxingLayerTDD_D_C)) {this.map.removeLayer(this.shangxingLayerTDD_D_C);}
                if (this.map.hasLayer(this.shangxingLayerTDD_E_C)) {this.map.removeLayer(this.shangxingLayerTDD_E_C);}
                if (this.map.hasLayer(this.shangxingLayerTDD_F_C)) {this.map.removeLayer(this.shangxingLayerTDD_F_C);}
                if (this.map.hasLayer(this.shangxingLayerFDD_S_C)) {this.map.removeLayer(this.shangxingLayerFDD_S_C);}

                if (this.map.hasLayer(this.shangxingLayer900M)) {this.map.removeLayer(this.shangxingLayer900M);}
                if (this.map.hasLayer(this.shangxingLayer1800M)) {this.map.removeLayer(this.shangxingLayer1800M);}
                
                if (this.map.hasLayer(this.shangxingLayer900M_C)) {this.map.removeLayer(this.shangxingLayer900M_C);}
                if (this.map.hasLayer(this.shangxingLayer1800M_C)) {this.map.removeLayer(this.shangxingLayer1800M_C);}
                
                /*$("div.yjutreds").each(function(index, el) {
                    if ($(el).hasClass('mapCtrlItemSelected')){
                        var func = $(el).attr('func');
                        if (func == 'TDD-D') {this.map.addLayer(this.shangxingLayerTDD_D);}
                        if (func == 'TDD-E') {this.map.addLayer(this.shangxingLayerTDD_E);}
                        if (func == 'TDD-F') {this.map.addLayer(this.shangxingLayerTDD_F);}
                        if (func == 'FDD-S') {this.map.addLayer(this.shangxingLayerFDD_S);}

                        if (func == 'TDD-D-C') {this.map.addLayer(this.shangxingLayerTDD_D_C);}
                        if (func == 'TDD-E-C') {this.map.addLayer(this.shangxingLayerTDD_E_C);}
                        if (func == 'TDD-F-C') {this.map.addLayer(this.shangxingLayerTDD_F_C);}
                        if (func == 'FDD-S-C') {this.map.addLayer(this.shangxingLayerFDD_S_C);}

                        if (func == '900M') {this.map.addLayer(this.shangxingLayer900M);}
                        if (func == '1800M') {this.map.addLayer(this.shangxingLayer1800M);}

                        if (func == '900M-C') {this.map.addLayer(this.shangxingLayer900M_C);}
                        if (func == '1800M-C') {this.map.addLayer(this.shangxingLayer1800M_C);}
                        
                    }
                }.bind(this));  */ 

                var TDD_D_DOM = $("div.yjutreds").eq(4);
                if (TDD_D_DOM.hasClass('mapCtrlItemSelected')) {
                    var func1 = TDD_D_DOM.attr('func');
                    if (func1 == 'TDD-D') {
                        this.map.addLayer(this.shangxingLayerTDD_D);
                    };
                };
                var TDD_E_DOM = $("div.yjutreds").eq(5);
                if (TDD_E_DOM.hasClass('mapCtrlItemSelected')) {
                    var func2 = TDD_E_DOM.attr('func');
                    if (func2 == 'TDD-E') {
                        this.map.addLayer(this.shangxingLayerTDD_E);
                    }
                }
                var TDD_F_DOM = $("div.yjutreds").eq(6);
                if (TDD_F_DOM.hasClass('mapCtrlItemSelected')) {
                    var func3 = TDD_F_DOM.attr('func');
                    if (func3 == 'TDD-F') {
                        this.map.addLayer(this.shangxingLayerTDD_F);
                    }
                }
                var FDD_S_DOM = $("div.yjutreds").eq(7);
                if (FDD_S_DOM.hasClass('mapCtrlItemSelected')) {
                    var func4 = FDD_S_DOM.attr('func');
                    if (func4 == 'FDD-S') {
                        this.map.addLayer(this.shangxingLayerFDD_S);
                    }
                }

                var TDD_D_C_DOM = $("div.yjutreds").eq(8);
                if (TDD_D_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func11 = TDD_D_C_DOM.attr('func');
                    if (func11 == 'TDD-D-C') {
                        this.map.addLayer(this.shangxingLayerTDD_D_C);
                    }
                }
                var TDD_E_C_DOM = $("div.yjutreds").eq(9);
                if (TDD_E_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func22 = TDD_E_C_DOM.attr('func');
                    if (func22 == 'TDD-E-C') {
                        this.map.addLayer(this.shangxingLayerTDD_E_C);
                    }
                }
                var TDD_F_C_DOM = $("div.yjutreds").eq(10);
                if (TDD_F_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func33 = TDD_F_C_DOM.attr('func');
                    if (func33 == 'TDD-F-C') {
                        this.map.addLayer(this.shangxingLayerTDD_F_C);
                    }
                }
                var FDD_S_C_DOM = $("div.yjutreds").eq(11);
                if (FDD_S_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func44 = FDD_S_C_DOM.attr('func');
                    if (func44 == 'FDD_S-C') {
                        this.map.addLayer(this.shangxingLayerFDD_S_C);
                    }
                }

                var _900M_DOM = $("div.yjutreds").eq(0);
                if (_900M_DOM.hasClass('mapCtrlItemSelected')) {
                    var func111 = _900M_DOM.attr('func');
                    if (func111 == '900M') {
                        this.map.addLayer(this.shangxingLayer900M);
                    }
                }
                var _1800M_DOM = $("div.yjutreds").eq(1);
                if (_1800M_DOM.hasClass('mapCtrlItemSelected')) {
                    var func222 = _1800M_DOM.attr('func');
                    if (func222 == '1800M') {
                        this.map.addLayer(this.shangxingLayer1800M);
                    }
                }

                var _900M_C_DOM = $("div.yjutreds").eq(2);
                if (_900M_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func1111 = _900M_C_DOM.attr('func');
                    if (func1111 == '900M-C') {
                        this.map.addLayer(this.shangxingLayer900M_C);
                    }
                }
                var _1800M_C_DOM = $("div.yjutreds").eq(3);
                if (_1800M_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func2222 = _1800M_C_DOM.attr('func');
                    if (func2222 == '1800M-C') {
                        this.map.addLayer(this.shangxingLayer1800M_C);
                    }
                } 
                //this.map.addLayer(this.shangxingLayerTDD_D);

                var flag1 = $('div.mapCtrlItem[func="TDD-D"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag2 = $('div.mapCtrlItem[func="TDD-E"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag3 = $('div.mapCtrlItem[func="TDD-F"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag4 = $('div.mapCtrlItem[func="FDD-S"]').eq(0).hasClass('mapCtrlItemSelected');
                
                var flag11 = $('div.mapCtrlItem[func="TDD-D-C"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag22 = $('div.mapCtrlItem[func="TDD-E-C"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag33 = $('div.mapCtrlItem[func="TDD-F-C"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag44 = $('div.mapCtrlItem[func="FDD-S-C"]').eq(0).hasClass('mapCtrlItemSelected');
                

                if (flag1 && flag2 && flag3 && flag4 && flag11 && flag22 && flag33 && flag44 ) {
                    $(".ctrlTitle[func='室外小区']").addClass('mapCtrlItemSelected');  
                    $(".ctrlTitle[func='4G小区总数']").addClass('mapCtrlItemSelected');  
                    this.map.addLayer(this.markersLayerFDD);
                }
                break;    
            case 'TDD-F-C':
                // if (this.map.hasLayer(this.heatMapLayer)) {
                //     this.map.removeLayer(this.heatMapLayer);
                //     $("#ctrlFunction").find('div.hotMap').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }
                // if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                //     this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                //     $("#ctrlFunction").find('div.hotMapOfAll4Class').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }
                if (this.map.hasLayer(this.shangxingLayerTDD_D)) {this.map.removeLayer(this.shangxingLayerTDD_D);}
                if (this.map.hasLayer(this.shangxingLayerTDD_E)) {this.map.removeLayer(this.shangxingLayerTDD_E);}
                if (this.map.hasLayer(this.shangxingLayerTDD_F)) {this.map.removeLayer(this.shangxingLayerTDD_F);}
                if (this.map.hasLayer(this.shangxingLayerFDD_S)) {this.map.removeLayer(this.shangxingLayerFDD_S);}

                if (this.map.hasLayer(this.shangxingLayerTDD_D_C)) {this.map.removeLayer(this.shangxingLayerTDD_D_C);}
                if (this.map.hasLayer(this.shangxingLayerTDD_E_C)) {this.map.removeLayer(this.shangxingLayerTDD_E_C);}
                if (this.map.hasLayer(this.shangxingLayerTDD_F_C)) {this.map.removeLayer(this.shangxingLayerTDD_F_C);}
                if (this.map.hasLayer(this.shangxingLayerFDD_S_C)) {this.map.removeLayer(this.shangxingLayerFDD_S_C);}

                if (this.map.hasLayer(this.shangxingLayer900M)) {this.map.removeLayer(this.shangxingLayer900M);}
                if (this.map.hasLayer(this.shangxingLayer1800M)) {this.map.removeLayer(this.shangxingLayer1800M);}
                
                if (this.map.hasLayer(this.shangxingLayer900M_C)) {this.map.removeLayer(this.shangxingLayer900M_C);}
                if (this.map.hasLayer(this.shangxingLayer1800M_C)) {this.map.removeLayer(this.shangxingLayer1800M_C);}
                
                /*$("div.yjutreds").each(function(index, el) {
                    if ($(el).hasClass('mapCtrlItemSelected')){
                        var func = $(el).attr('func');
                        if (func == 'TDD-D') {this.map.addLayer(this.shangxingLayerTDD_D);}
                        if (func == 'TDD-E') {this.map.addLayer(this.shangxingLayerTDD_E);}
                        if (func == 'TDD-F') {this.map.addLayer(this.shangxingLayerTDD_F);}
                        if (func == 'FDD-S') {this.map.addLayer(this.shangxingLayerFDD_S);}

                        if (func == 'TDD-D-C') {this.map.addLayer(this.shangxingLayerTDD_D_C);}
                        if (func == 'TDD-E-C') {this.map.addLayer(this.shangxingLayerTDD_E_C);}
                        if (func == 'TDD-F-C') {this.map.addLayer(this.shangxingLayerTDD_F_C);}
                        if (func == 'FDD-S-C') {this.map.addLayer(this.shangxingLayerFDD_S_C);}

                        if (func == '900M') {this.map.addLayer(this.shangxingLayer900M);}
                        if (func == '1800M') {this.map.addLayer(this.shangxingLayer1800M);}

                        if (func == '900M-C') {this.map.addLayer(this.shangxingLayer900M_C);}
                        if (func == '1800M-C') {this.map.addLayer(this.shangxingLayer1800M_C);}
                        
                    }
                }.bind(this));  */ 

                var TDD_D_DOM = $("div.yjutreds").eq(4);
                if (TDD_D_DOM.hasClass('mapCtrlItemSelected')) {
                    var func1 = TDD_D_DOM.attr('func');
                    if (func1 == 'TDD-D') {
                        this.map.addLayer(this.shangxingLayerTDD_D);
                    };
                };
                var TDD_E_DOM = $("div.yjutreds").eq(5);
                if (TDD_E_DOM.hasClass('mapCtrlItemSelected')) {
                    var func2 = TDD_E_DOM.attr('func');
                    if (func2 == 'TDD-E') {
                        this.map.addLayer(this.shangxingLayerTDD_E);
                    }
                }
                var TDD_F_DOM = $("div.yjutreds").eq(6);
                if (TDD_F_DOM.hasClass('mapCtrlItemSelected')) {
                    var func3 = TDD_F_DOM.attr('func');
                    if (func3 == 'TDD-F') {
                        this.map.addLayer(this.shangxingLayerTDD_F);
                    }
                }
                var FDD_S_DOM = $("div.yjutreds").eq(7);
                if (FDD_S_DOM.hasClass('mapCtrlItemSelected')) {
                    var func4 = FDD_S_DOM.attr('func');
                    if (func4 == 'FDD-S') {
                        this.map.addLayer(this.shangxingLayerFDD_S);
                    }
                }

                var TDD_D_C_DOM = $("div.yjutreds").eq(8);
                if (TDD_D_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func11 = TDD_D_C_DOM.attr('func');
                    if (func11 == 'TDD-D-C') {
                        this.map.addLayer(this.shangxingLayerTDD_D_C);
                    }
                }
                var TDD_E_C_DOM = $("div.yjutreds").eq(9);
                if (TDD_E_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func22 = TDD_E_C_DOM.attr('func');
                    if (func22 == 'TDD-E-C') {
                        this.map.addLayer(this.shangxingLayerTDD_E_C);
                    }
                }
                var TDD_F_C_DOM = $("div.yjutreds").eq(10);
                if (TDD_F_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func33 = TDD_F_C_DOM.attr('func');
                    if (func33 == 'TDD-F-C') {
                        this.map.addLayer(this.shangxingLayerTDD_F_C);
                    }
                }
                var FDD_S_C_DOM = $("div.yjutreds").eq(11);
                if (FDD_S_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func44 = FDD_S_C_DOM.attr('func');
                    if (func44 == 'FDD_S-C') {
                        this.map.addLayer(this.shangxingLayerFDD_S_C);
                    }
                }

                var _900M_DOM = $("div.yjutreds").eq(0);
                if (_900M_DOM.hasClass('mapCtrlItemSelected')) {
                    var func111 = _900M_DOM.attr('func');
                    if (func111 == '900M') {
                        this.map.addLayer(this.shangxingLayer900M);
                    }
                }
                var _1800M_DOM = $("div.yjutreds").eq(1);
                if (_1800M_DOM.hasClass('mapCtrlItemSelected')) {
                    var func222 = _1800M_DOM.attr('func');
                    if (func222 == '1800M') {
                        this.map.addLayer(this.shangxingLayer1800M);
                    }
                }

                var _900M_C_DOM = $("div.yjutreds").eq(2);
                if (_900M_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func1111 = _900M_C_DOM.attr('func');
                    if (func1111 == '900M-C') {
                        this.map.addLayer(this.shangxingLayer900M_C);
                    }
                }
                var _1800M_C_DOM = $("div.yjutreds").eq(3);
                if (_1800M_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func2222 = _1800M_C_DOM.attr('func');
                    if (func2222 == '1800M-C') {
                        this.map.addLayer(this.shangxingLayer1800M_C);
                    }
                } 
                //this.map.addLayer(this.shangxingLayerTDD_D);

                var flag1 = $('div.mapCtrlItem[func="TDD-D"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag2 = $('div.mapCtrlItem[func="TDD-E"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag3 = $('div.mapCtrlItem[func="TDD-F"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag4 = $('div.mapCtrlItem[func="FDD-S"]').eq(0).hasClass('mapCtrlItemSelected');
                
                var flag11 = $('div.mapCtrlItem[func="TDD-D-C"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag22 = $('div.mapCtrlItem[func="TDD-E-C"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag33 = $('div.mapCtrlItem[func="TDD-F-C"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag44 = $('div.mapCtrlItem[func="FDD-S-C"]').eq(0).hasClass('mapCtrlItemSelected');
                

                if (flag1 && flag2 && flag3 && flag4 && flag11 && flag22 && flag33 && flag44 ) {
                    $(".ctrlTitle[func='室外小区']").addClass('mapCtrlItemSelected');  
                    $(".ctrlTitle[func='4G小区总数']").addClass('mapCtrlItemSelected');  
                    this.map.addLayer(this.markersLayerFDD);
                }   
            case 'FDD-S-C':
                // if (this.map.hasLayer(this.heatMapLayer)) {
                //     this.map.removeLayer(this.heatMapLayer);
                //     $("#ctrlFunction").find('div.hotMap').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }
                // if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                //     this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                //     $("#ctrlFunction").find('div.hotMapOfAll4Class').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }
                if (this.map.hasLayer(this.shangxingLayerTDD_D)) {this.map.removeLayer(this.shangxingLayerTDD_D);}
                if (this.map.hasLayer(this.shangxingLayerTDD_E)) {this.map.removeLayer(this.shangxingLayerTDD_E);}
                if (this.map.hasLayer(this.shangxingLayerTDD_F)) {this.map.removeLayer(this.shangxingLayerTDD_F);}
                if (this.map.hasLayer(this.shangxingLayerFDD_S)) {this.map.removeLayer(this.shangxingLayerFDD_S);}

                if (this.map.hasLayer(this.shangxingLayerTDD_D_C)) {this.map.removeLayer(this.shangxingLayerTDD_D_C);}
                if (this.map.hasLayer(this.shangxingLayerTDD_E_C)) {this.map.removeLayer(this.shangxingLayerTDD_E_C);}
                if (this.map.hasLayer(this.shangxingLayerTDD_F_C)) {this.map.removeLayer(this.shangxingLayerTDD_F_C);}
                if (this.map.hasLayer(this.shangxingLayerFDD_S_C)) {this.map.removeLayer(this.shangxingLayerFDD_S_C);}

                if (this.map.hasLayer(this.shangxingLayer900M)) {this.map.removeLayer(this.shangxingLayer900M);}
                if (this.map.hasLayer(this.shangxingLayer1800M)) {this.map.removeLayer(this.shangxingLayer1800M);}
                
                if (this.map.hasLayer(this.shangxingLayer900M_C)) {this.map.removeLayer(this.shangxingLayer900M_C);}
                if (this.map.hasLayer(this.shangxingLayer1800M_C)) {this.map.removeLayer(this.shangxingLayer1800M_C);}
                
                /*$("div.yjutreds").each(function(index, el) {
                    if ($(el).hasClass('mapCtrlItemSelected')){
                        var func = $(el).attr('func');
                        if (func == 'TDD-D') {this.map.addLayer(this.shangxingLayerTDD_D);}
                        if (func == 'TDD-E') {this.map.addLayer(this.shangxingLayerTDD_E);}
                        if (func == 'TDD-F') {this.map.addLayer(this.shangxingLayerTDD_F);}
                        if (func == 'FDD-S') {this.map.addLayer(this.shangxingLayerFDD_S);}

                        if (func == 'TDD-D-C') {this.map.addLayer(this.shangxingLayerTDD_D_C);}
                        if (func == 'TDD-E-C') {this.map.addLayer(this.shangxingLayerTDD_E_C);}
                        if (func == 'TDD-F-C') {this.map.addLayer(this.shangxingLayerTDD_F_C);}
                        if (func == 'FDD-S-C') {this.map.addLayer(this.shangxingLayerFDD_S_C);}

                        if (func == '900M') {this.map.addLayer(this.shangxingLayer900M);}
                        if (func == '1800M') {this.map.addLayer(this.shangxingLayer1800M);}

                        if (func == '900M-C') {this.map.addLayer(this.shangxingLayer900M_C);}
                        if (func == '1800M-C') {this.map.addLayer(this.shangxingLayer1800M_C);}
                        
                    }
                }.bind(this));  */ 

                var TDD_D_DOM = $("div.yjutreds").eq(4);
                if (TDD_D_DOM.hasClass('mapCtrlItemSelected')) {
                    var func1 = TDD_D_DOM.attr('func');
                    if (func1 == 'TDD-D') {
                        this.map.addLayer(this.shangxingLayerTDD_D);
                    };
                };
                var TDD_E_DOM = $("div.yjutreds").eq(5);
                if (TDD_E_DOM.hasClass('mapCtrlItemSelected')) {
                    var func2 = TDD_E_DOM.attr('func');
                    if (func2 == 'TDD-E') {
                        this.map.addLayer(this.shangxingLayerTDD_E);
                    }
                }
                var TDD_F_DOM = $("div.yjutreds").eq(6);
                if (TDD_F_DOM.hasClass('mapCtrlItemSelected')) {
                    var func3 = TDD_F_DOM.attr('func');
                    if (func3 == 'TDD-F') {
                        this.map.addLayer(this.shangxingLayerTDD_F);
                    }
                }
                var FDD_S_DOM = $("div.yjutreds").eq(7);
                if (FDD_S_DOM.hasClass('mapCtrlItemSelected')) {
                    var func4 = FDD_S_DOM.attr('func');
                    if (func4 == 'FDD-S') {
                        this.map.addLayer(this.shangxingLayerFDD_S);
                    }
                }

                var TDD_D_C_DOM = $("div.yjutreds").eq(8);
                if (TDD_D_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func11 = TDD_D_C_DOM.attr('func');
                    if (func11 == 'TDD-D-C') {
                        this.map.addLayer(this.shangxingLayerTDD_D_C);
                    }
                }
                var TDD_E_C_DOM = $("div.yjutreds").eq(9);
                if (TDD_E_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func22 = TDD_E_C_DOM.attr('func');
                    if (func22 == 'TDD-E-C') {
                        this.map.addLayer(this.shangxingLayerTDD_E_C);
                    }
                }
                var TDD_F_C_DOM = $("div.yjutreds").eq(10);
                if (TDD_F_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func33 = TDD_F_C_DOM.attr('func');
                    if (func33 == 'TDD-F-C') {
                        this.map.addLayer(this.shangxingLayerTDD_F_C);
                    }
                }
                var FDD_S_C_DOM = $("div.yjutreds").eq(11);
                if (FDD_S_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func44 = FDD_S_C_DOM.attr('func');
                    if (func44 == 'FDD_S-C') {
                        this.map.addLayer(this.shangxingLayerFDD_S_C);
                    }
                }

                var _900M_DOM = $("div.yjutreds").eq(0);
                if (_900M_DOM.hasClass('mapCtrlItemSelected')) {
                    var func111 = _900M_DOM.attr('func');
                    if (func111 == '900M') {
                        this.map.addLayer(this.shangxingLayer900M);
                    }
                }
                var _1800M_DOM = $("div.yjutreds").eq(1);
                if (_1800M_DOM.hasClass('mapCtrlItemSelected')) {
                    var func222 = _1800M_DOM.attr('func');
                    if (func222 == '1800M') {
                        this.map.addLayer(this.shangxingLayer1800M);
                    }
                }

                var _900M_C_DOM = $("div.yjutreds").eq(2);
                if (_900M_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func1111 = _900M_C_DOM.attr('func');
                    if (func1111 == '900M-C') {
                        this.map.addLayer(this.shangxingLayer900M_C);
                    }
                }
                var _1800M_C_DOM = $("div.yjutreds").eq(3);
                if (_1800M_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func2222 = _1800M_C_DOM.attr('func');
                    if (func2222 == '1800M-C') {
                        this.map.addLayer(this.shangxingLayer1800M_C);
                    }
                } 
                //this.map.addLayer(this.shangxingLayerTDD_D);

                var flag1 = $('div.mapCtrlItem[func="TDD-D"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag2 = $('div.mapCtrlItem[func="TDD-E"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag3 = $('div.mapCtrlItem[func="TDD-F"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag4 = $('div.mapCtrlItem[func="FDD-S"]').eq(0).hasClass('mapCtrlItemSelected');
                
                var flag11 = $('div.mapCtrlItem[func="TDD-D-C"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag22 = $('div.mapCtrlItem[func="TDD-E-C"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag33 = $('div.mapCtrlItem[func="TDD-F-C"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag44 = $('div.mapCtrlItem[func="FDD-S-C"]').eq(0).hasClass('mapCtrlItemSelected');
                

                if (flag1 && flag2 && flag3 && flag4 && flag11 && flag22 && flag33 && flag44 ) {
                    $(".ctrlTitle[func='室外小区']").addClass('mapCtrlItemSelected');  
                    $(".ctrlTitle[func='4G小区总数']").addClass('mapCtrlItemSelected');  
                    this.map.addLayer(this.markersLayerFDD);
                }
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
                if (this.map.hasLayer(this.shangxingLayerTDD_D)) {this.map.removeLayer(this.shangxingLayerTDD_D);}
                if (this.map.hasLayer(this.shangxingLayerTDD_E)) {this.map.removeLayer(this.shangxingLayerTDD_E);}
                if (this.map.hasLayer(this.shangxingLayerTDD_F)) {this.map.removeLayer(this.shangxingLayerTDD_F);}
                if (this.map.hasLayer(this.shangxingLayerFDD_S)) {this.map.removeLayer(this.shangxingLayerFDD_S);}
                if (this.map.hasLayer(this.shangxingLayer900M)) {this.map.removeLayer(this.shangxingLayer900M);}
                if (this.map.hasLayer(this.shangxingLayer1800M)) {this.map.removeLayer(this.shangxingLayer1800M);}
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
                if (this.map.hasLayer(this.shangxingLayerTDD_D)) {this.map.removeLayer(this.shangxingLayerTDD_D);}
                if (this.map.hasLayer(this.shangxingLayerTDD_E)) {this.map.removeLayer(this.shangxingLayerTDD_E);}
                if (this.map.hasLayer(this.shangxingLayerTDD_F)) {this.map.removeLayer(this.shangxingLayerTDD_F);}
                if (this.map.hasLayer(this.shangxingLayerFDD_S)) {this.map.removeLayer(this.shangxingLayerFDD_S);}

                if (this.map.hasLayer(this.shangxingLayerTDD_D_C)) {this.map.removeLayer(this.shangxingLayerTDD_D_C);}
                if (this.map.hasLayer(this.shangxingLayerTDD_E_C)) {this.map.removeLayer(this.shangxingLayerTDD_E_C);}
                if (this.map.hasLayer(this.shangxingLayerTDD_F_C)) {this.map.removeLayer(this.shangxingLayerTDD_F_C);}
                if (this.map.hasLayer(this.shangxingLayerFDD_S_C)) {this.map.removeLayer(this.shangxingLayerFDD_S_C);}

                if (this.map.hasLayer(this.shangxingLayer900M)) {this.map.removeLayer(this.shangxingLayer900M);}
                if (this.map.hasLayer(this.shangxingLayer1800M)) {this.map.removeLayer(this.shangxingLayer1800M);}
                
                if (this.map.hasLayer(this.shangxingLayer900M_C)) {this.map.removeLayer(this.shangxingLayer900M_C);}
                if (this.map.hasLayer(this.shangxingLayer1800M_C)) {this.map.removeLayer(this.shangxingLayer1800M_C);}
                
                /*$("div.yjutreds").each(function(index, el) {
                    if ($(el).hasClass('mapCtrlItemSelected')){
                        var func = $(el).attr('func');
                        if (func == 'TDD-D') {this.map.addLayer(this.shangxingLayerTDD_D);}
                        if (func == 'TDD-E') {this.map.addLayer(this.shangxingLayerTDD_E);}
                        if (func == 'TDD-F') {this.map.addLayer(this.shangxingLayerTDD_F);}
                        if (func == 'FDD-S') {this.map.addLayer(this.shangxingLayerFDD_S);}

                        if (func == 'TDD-D-C') {this.map.addLayer(this.shangxingLayerTDD_D_C);}
                        if (func == 'TDD-E-C') {this.map.addLayer(this.shangxingLayerTDD_E_C);}
                        if (func == 'TDD-F-C') {this.map.addLayer(this.shangxingLayerTDD_F_C);}
                        if (func == 'FDD-S-C') {this.map.addLayer(this.shangxingLayerFDD_S_C);}

                        if (func == '900M') {this.map.addLayer(this.shangxingLayer900M);}
                        if (func == '1800M') {this.map.addLayer(this.shangxingLayer1800M);}

                        if (func == '900M-C') {this.map.addLayer(this.shangxingLayer900M_C);}
                        if (func == '1800M-C') {this.map.addLayer(this.shangxingLayer1800M_C);}
                        
                    }
                }.bind(this));  */ 

                var TDD_D_DOM = $("div.yjutreds").eq(4);
                if (TDD_D_DOM.hasClass('mapCtrlItemSelected')) {
                    var func1 = TDD_D_DOM.attr('func');
                    if (func1 == 'TDD-D') {
                        this.map.addLayer(this.shangxingLayerTDD_D);
                    };
                };
                var TDD_E_DOM = $("div.yjutreds").eq(5);
                if (TDD_E_DOM.hasClass('mapCtrlItemSelected')) {
                    var func2 = TDD_E_DOM.attr('func');
                    if (func2 == 'TDD-E') {
                        this.map.addLayer(this.shangxingLayerTDD_E);
                    }
                }
                var TDD_F_DOM = $("div.yjutreds").eq(6);
                if (TDD_F_DOM.hasClass('mapCtrlItemSelected')) {
                    var func3 = TDD_F_DOM.attr('func');
                    if (func3 == 'TDD-F') {
                        this.map.addLayer(this.shangxingLayerTDD_F);
                    }
                }
                var FDD_S_DOM = $("div.yjutreds").eq(7);
                if (FDD_S_DOM.hasClass('mapCtrlItemSelected')) {
                    var func4 = FDD_S_DOM.attr('func');
                    if (func4 == 'FDD-S') {
                        this.map.addLayer(this.shangxingLayerFDD_S);
                    }
                }

                var TDD_D_C_DOM = $("div.yjutreds").eq(8);
                if (TDD_D_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func11 = TDD_D_C_DOM.attr('func');
                    if (func11 == 'TDD-D-C') {
                        this.map.addLayer(this.shangxingLayerTDD_D_C);
                    }
                }
                var TDD_E_C_DOM = $("div.yjutreds").eq(9);
                if (TDD_E_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func22 = TDD_E_C_DOM.attr('func');
                    if (func22 == 'TDD-E-C') {
                        this.map.addLayer(this.shangxingLayerTDD_E_C);
                    }
                }
                var TDD_F_C_DOM = $("div.yjutreds").eq(10);
                if (TDD_F_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func33 = TDD_F_C_DOM.attr('func');
                    if (func33 == 'TDD-F-C') {
                        this.map.addLayer(this.shangxingLayerTDD_F_C);
                    }
                }
                var FDD_S_C_DOM = $("div.yjutreds").eq(11);
                if (FDD_S_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func44 = FDD_S_C_DOM.attr('func');
                    if (func44 == 'FDD_S-C') {
                        this.map.addLayer(this.shangxingLayerFDD_S_C);
                    }
                }

                var _900M_DOM = $("div.yjutreds").eq(0);
                if (_900M_DOM.hasClass('mapCtrlItemSelected')) {
                    var func111 = _900M_DOM.attr('func');
                    if (func111 == '900M') {
                        this.map.addLayer(this.shangxingLayer900M);
                    }
                }
                var _1800M_DOM = $("div.yjutreds").eq(1);
                if (_1800M_DOM.hasClass('mapCtrlItemSelected')) {
                    var func222 = _1800M_DOM.attr('func');
                    if (func222 == '1800M') {
                        this.map.addLayer(this.shangxingLayer1800M);
                    }
                }

                var _900M_C_DOM = $("div.yjutreds").eq(2);
                if (_900M_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func1111 = _900M_C_DOM.attr('func');
                    if (func1111 == '900M-C') {
                        this.map.addLayer(this.shangxingLayer900M_C);
                    }
                }
                var _1800M_C_DOM = $("div.yjutreds").eq(3);
                if (_1800M_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func2222 = _1800M_C_DOM.attr('func');
                    if (func2222 == '1800M-C') {
                        this.map.addLayer(this.shangxingLayer1800M_C);
                    }
                }
                //this.map.addLayer(this.shangxingLayer900M);
                
                var flag1 = $('div.mapCtrlItem[func="900M"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag2 = $('div.mapCtrlItem[func="1800M"]').eq(0).hasClass('mapCtrlItemSelected');

                var flag11 = $('div.mapCtrlItem[func="900M-C"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag22 = $('div.mapCtrlItem[func="1800M-C"]').eq(0).hasClass('mapCtrlItemSelected');

                if (flag1 && flag2 && flag11 && flag22) {
                    $(".ctrlTitle[func='室外小区']").addClass('mapCtrlItemSelected');  
                    $(".ctrlTitle[func='2G小区总数']").addClass('mapCtrlItemSelected');  
                    this.map.addLayer(this.markersLayer2G);
                }
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
                if (this.map.hasLayer(this.shangxingLayerTDD_D)) {this.map.removeLayer(this.shangxingLayerTDD_D);}
                if (this.map.hasLayer(this.shangxingLayerTDD_E)) {this.map.removeLayer(this.shangxingLayerTDD_E);}
                if (this.map.hasLayer(this.shangxingLayerTDD_F)) {this.map.removeLayer(this.shangxingLayerTDD_F);}
                if (this.map.hasLayer(this.shangxingLayerFDD_S)) {this.map.removeLayer(this.shangxingLayerFDD_S);}

                if (this.map.hasLayer(this.shangxingLayerTDD_D_C)) {this.map.removeLayer(this.shangxingLayerTDD_D_C);}
                if (this.map.hasLayer(this.shangxingLayerTDD_E_C)) {this.map.removeLayer(this.shangxingLayerTDD_E_C);}
                if (this.map.hasLayer(this.shangxingLayerTDD_F_C)) {this.map.removeLayer(this.shangxingLayerTDD_F_C);}
                if (this.map.hasLayer(this.shangxingLayerFDD_S_C)) {this.map.removeLayer(this.shangxingLayerFDD_S_C);}

                if (this.map.hasLayer(this.shangxingLayer900M)) {this.map.removeLayer(this.shangxingLayer900M);}
                if (this.map.hasLayer(this.shangxingLayer1800M)) {this.map.removeLayer(this.shangxingLayer1800M);}
                
                if (this.map.hasLayer(this.shangxingLayer900M_C)) {this.map.removeLayer(this.shangxingLayer900M_C);}
                if (this.map.hasLayer(this.shangxingLayer1800M_C)) {this.map.removeLayer(this.shangxingLayer1800M_C);}
                
                /*$("div.yjutreds").each(function(index, el) {
                    if ($(el).hasClass('mapCtrlItemSelected')){
                        var func = $(el).attr('func');
                        if (func == 'TDD-D') {this.map.addLayer(this.shangxingLayerTDD_D);}
                        if (func == 'TDD-E') {this.map.addLayer(this.shangxingLayerTDD_E);}
                        if (func == 'TDD-F') {this.map.addLayer(this.shangxingLayerTDD_F);}
                        if (func == 'FDD-S') {this.map.addLayer(this.shangxingLayerFDD_S);}

                        if (func == 'TDD-D-C') {this.map.addLayer(this.shangxingLayerTDD_D_C);}
                        if (func == 'TDD-E-C') {this.map.addLayer(this.shangxingLayerTDD_E_C);}
                        if (func == 'TDD-F-C') {this.map.addLayer(this.shangxingLayerTDD_F_C);}
                        if (func == 'FDD-S-C') {this.map.addLayer(this.shangxingLayerFDD_S_C);}

                        if (func == '900M') {this.map.addLayer(this.shangxingLayer900M);}
                        if (func == '1800M') {this.map.addLayer(this.shangxingLayer1800M);}

                        if (func == '900M-C') {this.map.addLayer(this.shangxingLayer900M_C);}
                        if (func == '1800M-C') {this.map.addLayer(this.shangxingLayer1800M_C);}
                        
                    }
                }.bind(this));  */ 

                var TDD_D_DOM = $("div.yjutreds").eq(4);
                if (TDD_D_DOM.hasClass('mapCtrlItemSelected')) {
                    var func1 = TDD_D_DOM.attr('func');
                    if (func1 == 'TDD-D') {
                        this.map.addLayer(this.shangxingLayerTDD_D);
                    };
                };
                var TDD_E_DOM = $("div.yjutreds").eq(5);
                if (TDD_E_DOM.hasClass('mapCtrlItemSelected')) {
                    var func2 = TDD_E_DOM.attr('func');
                    if (func2 == 'TDD-E') {
                        this.map.addLayer(this.shangxingLayerTDD_E);
                    }
                }
                var TDD_F_DOM = $("div.yjutreds").eq(6);
                if (TDD_F_DOM.hasClass('mapCtrlItemSelected')) {
                    var func3 = TDD_F_DOM.attr('func');
                    if (func3 == 'TDD-F') {
                        this.map.addLayer(this.shangxingLayerTDD_F);
                    }
                }
                var FDD_S_DOM = $("div.yjutreds").eq(7);
                if (FDD_S_DOM.hasClass('mapCtrlItemSelected')) {
                    var func4 = FDD_S_DOM.attr('func');
                    if (func4 == 'FDD-S') {
                        this.map.addLayer(this.shangxingLayerFDD_S);
                    }
                }

                var TDD_D_C_DOM = $("div.yjutreds").eq(8);
                if (TDD_D_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func11 = TDD_D_C_DOM.attr('func');
                    if (func11 == 'TDD-D-C') {
                        this.map.addLayer(this.shangxingLayerTDD_D_C);
                    }
                }
                var TDD_E_C_DOM = $("div.yjutreds").eq(9);
                if (TDD_E_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func22 = TDD_E_C_DOM.attr('func');
                    if (func22 == 'TDD-E-C') {
                        this.map.addLayer(this.shangxingLayerTDD_E_C);
                    }
                }
                var TDD_F_C_DOM = $("div.yjutreds").eq(10);
                if (TDD_F_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func33 = TDD_F_C_DOM.attr('func');
                    if (func33 == 'TDD-F-C') {
                        this.map.addLayer(this.shangxingLayerTDD_F_C);
                    }
                }
                var FDD_S_C_DOM = $("div.yjutreds").eq(11);
                if (FDD_S_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func44 = FDD_S_C_DOM.attr('func');
                    if (func44 == 'FDD_S-C') {
                        this.map.addLayer(this.shangxingLayerFDD_S_C);
                    }
                }

                var _900M_DOM = $("div.yjutreds").eq(0);
                if (_900M_DOM.hasClass('mapCtrlItemSelected')) {
                    var func111 = _900M_DOM.attr('func');
                    if (func111 == '900M') {
                        this.map.addLayer(this.shangxingLayer900M);
                    }
                }
                var _1800M_DOM = $("div.yjutreds").eq(1);
                if (_1800M_DOM.hasClass('mapCtrlItemSelected')) {
                    var func222 = _1800M_DOM.attr('func');
                    if (func222 == '1800M') {
                        this.map.addLayer(this.shangxingLayer1800M);
                    }
                }

                var _900M_C_DOM = $("div.yjutreds").eq(2);
                if (_900M_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func1111 = _900M_C_DOM.attr('func');
                    if (func1111 == '900M-C') {
                        this.map.addLayer(this.shangxingLayer900M_C);
                    }
                }
                var _1800M_C_DOM = $("div.yjutreds").eq(3);
                if (_1800M_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func2222 = _1800M_C_DOM.attr('func');
                    if (func2222 == '1800M-C') {
                        this.map.addLayer(this.shangxingLayer1800M_C);
                    }
                }
                //this.map.addLayer(this.shangxingLayer900M);
                
                var flag1 = $('div.mapCtrlItem[func="900M"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag2 = $('div.mapCtrlItem[func="1800M"]').eq(0).hasClass('mapCtrlItemSelected');

                var flag11 = $('div.mapCtrlItem[func="900M-C"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag22 = $('div.mapCtrlItem[func="1800M-C"]').eq(0).hasClass('mapCtrlItemSelected');

                if (flag1 && flag2 && flag11 && flag22) {
                    $(".ctrlTitle[func='室外小区']").addClass('mapCtrlItemSelected');  
                    $(".ctrlTitle[func='2G小区总数']").addClass('mapCtrlItemSelected');  
                    this.map.addLayer(this.markersLayer2G);
                }
                break; 
            case '900M-C':
                // if (this.map.hasLayer(this.heatMapLayer)) {
                //     this.map.removeLayer(this.heatMapLayer);
                //     $("#ctrlFunction").find('div.hotMap').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }
                // if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                //     this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                //     $("#ctrlFunction").find('div.hotMapOfAll4Class').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }

                if (this.map.hasLayer(this.shangxingLayerTDD_D)) {this.map.removeLayer(this.shangxingLayerTDD_D);}
                if (this.map.hasLayer(this.shangxingLayerTDD_E)) {this.map.removeLayer(this.shangxingLayerTDD_E);}
                if (this.map.hasLayer(this.shangxingLayerTDD_F)) {this.map.removeLayer(this.shangxingLayerTDD_F);}
                if (this.map.hasLayer(this.shangxingLayerFDD_S)) {this.map.removeLayer(this.shangxingLayerFDD_S);}

                if (this.map.hasLayer(this.shangxingLayerTDD_D_C)) {this.map.removeLayer(this.shangxingLayerTDD_D_C);}
                if (this.map.hasLayer(this.shangxingLayerTDD_E_C)) {this.map.removeLayer(this.shangxingLayerTDD_E_C);}
                if (this.map.hasLayer(this.shangxingLayerTDD_F_C)) {this.map.removeLayer(this.shangxingLayerTDD_F_C);}
                if (this.map.hasLayer(this.shangxingLayerFDD_S_C)) {this.map.removeLayer(this.shangxingLayerFDD_S_C);}

                if (this.map.hasLayer(this.shangxingLayer900M)) {this.map.removeLayer(this.shangxingLayer900M);}
                if (this.map.hasLayer(this.shangxingLayer1800M)) {this.map.removeLayer(this.shangxingLayer1800M);}
                
                if (this.map.hasLayer(this.shangxingLayer900M_C)) {this.map.removeLayer(this.shangxingLayer900M_C);}
                if (this.map.hasLayer(this.shangxingLayer1800M_C)) {this.map.removeLayer(this.shangxingLayer1800M_C);}
                
                /*$("div.yjutreds").each(function(index, el) {
                    if ($(el).hasClass('mapCtrlItemSelected')){
                        var func = $(el).attr('func');
                        if (func == 'TDD-D') {this.map.addLayer(this.shangxingLayerTDD_D);}
                        if (func == 'TDD-E') {this.map.addLayer(this.shangxingLayerTDD_E);}
                        if (func == 'TDD-F') {this.map.addLayer(this.shangxingLayerTDD_F);}
                        if (func == 'FDD-S') {this.map.addLayer(this.shangxingLayerFDD_S);}

                        if (func == 'TDD-D-C') {this.map.addLayer(this.shangxingLayerTDD_D_C);}
                        if (func == 'TDD-E-C') {this.map.addLayer(this.shangxingLayerTDD_E_C);}
                        if (func == 'TDD-F-C') {this.map.addLayer(this.shangxingLayerTDD_F_C);}
                        if (func == 'FDD-S-C') {this.map.addLayer(this.shangxingLayerFDD_S_C);}

                        if (func == '900M') {this.map.addLayer(this.shangxingLayer900M);}
                        if (func == '1800M') {this.map.addLayer(this.shangxingLayer1800M);}

                        if (func == '900M-C') {this.map.addLayer(this.shangxingLayer900M_C);}
                        if (func == '1800M-C') {this.map.addLayer(this.shangxingLayer1800M_C);}
                        
                    }
                }.bind(this));  */ 

                var TDD_D_DOM = $("div.yjutreds").eq(4);
                if (TDD_D_DOM.hasClass('mapCtrlItemSelected')) {
                    var func1 = TDD_D_DOM.attr('func');
                    if (func1 == 'TDD-D') {
                        this.map.addLayer(this.shangxingLayerTDD_D);
                    };
                };
                var TDD_E_DOM = $("div.yjutreds").eq(5);
                if (TDD_E_DOM.hasClass('mapCtrlItemSelected')) {
                    var func2 = TDD_E_DOM.attr('func');
                    if (func2 == 'TDD-E') {
                        this.map.addLayer(this.shangxingLayerTDD_E);
                    }
                }
                var TDD_F_DOM = $("div.yjutreds").eq(6);
                if (TDD_F_DOM.hasClass('mapCtrlItemSelected')) {
                    var func3 = TDD_F_DOM.attr('func');
                    if (func3 == 'TDD-F') {
                        this.map.addLayer(this.shangxingLayerTDD_F);
                    }
                }
                var FDD_S_DOM = $("div.yjutreds").eq(7);
                if (FDD_S_DOM.hasClass('mapCtrlItemSelected')) {
                    var func4 = FDD_S_DOM.attr('func');
                    if (func4 == 'FDD-S') {
                        this.map.addLayer(this.shangxingLayerFDD_S);
                    }
                }

                var TDD_D_C_DOM = $("div.yjutreds").eq(8);
                if (TDD_D_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func11 = TDD_D_C_DOM.attr('func');
                    if (func11 == 'TDD-D-C') {
                        this.map.addLayer(this.shangxingLayerTDD_D_C);
                    }
                }
                var TDD_E_C_DOM = $("div.yjutreds").eq(9);
                if (TDD_E_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func22 = TDD_E_C_DOM.attr('func');
                    if (func22 == 'TDD-E-C') {
                        this.map.addLayer(this.shangxingLayerTDD_E_C);
                    }
                }
                var TDD_F_C_DOM = $("div.yjutreds").eq(10);
                if (TDD_F_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func33 = TDD_F_C_DOM.attr('func');
                    if (func33 == 'TDD-F-C') {
                        this.map.addLayer(this.shangxingLayerTDD_F_C);
                    }
                }
                var FDD_S_C_DOM = $("div.yjutreds").eq(11);
                if (FDD_S_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func44 = FDD_S_C_DOM.attr('func');
                    if (func44 == 'FDD_S-C') {
                        this.map.addLayer(this.shangxingLayerFDD_S_C);
                    }
                }

                var _900M_DOM = $("div.yjutreds").eq(0);
                if (_900M_DOM.hasClass('mapCtrlItemSelected')) {
                    var func111 = _900M_DOM.attr('func');
                    if (func111 == '900M') {
                        this.map.addLayer(this.shangxingLayer900M);
                    }
                }
                var _1800M_DOM = $("div.yjutreds").eq(1);
                if (_1800M_DOM.hasClass('mapCtrlItemSelected')) {
                    var func222 = _1800M_DOM.attr('func');
                    if (func222 == '1800M') {
                        this.map.addLayer(this.shangxingLayer1800M);
                    }
                }

                var _900M_C_DOM = $("div.yjutreds").eq(2);
                if (_900M_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func1111 = _900M_C_DOM.attr('func');
                    if (func1111 == '900M-C') {
                        this.map.addLayer(this.shangxingLayer900M_C);
                    }
                }
                var _1800M_C_DOM = $("div.yjutreds").eq(3);
                if (_1800M_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func2222 = _1800M_C_DOM.attr('func');
                    if (func2222 == '1800M-C') {
                        this.map.addLayer(this.shangxingLayer1800M_C);
                    }
                }
                //this.map.addLayer(this.shangxingLayer900M);
                
                var flag1 = $('div.mapCtrlItem[func="900M"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag2 = $('div.mapCtrlItem[func="1800M"]').eq(0).hasClass('mapCtrlItemSelected');

                var flag11 = $('div.mapCtrlItem[func="900M-C"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag22 = $('div.mapCtrlItem[func="1800M-C"]').eq(0).hasClass('mapCtrlItemSelected');

                if (flag1 && flag2 && flag11 && flag22) {
                    $(".ctrlTitle[func='室外小区']").addClass('mapCtrlItemSelected');  
                    $(".ctrlTitle[func='2G小区总数']").addClass('mapCtrlItemSelected');  
                    this.map.addLayer(this.markersLayer2G);
                }
                break;    
            case '1800M-C':
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
                if (this.map.hasLayer(this.shangxingLayerTDD_D)) {this.map.removeLayer(this.shangxingLayerTDD_D);}
                if (this.map.hasLayer(this.shangxingLayerTDD_E)) {this.map.removeLayer(this.shangxingLayerTDD_E);}
                if (this.map.hasLayer(this.shangxingLayerTDD_F)) {this.map.removeLayer(this.shangxingLayerTDD_F);}
                if (this.map.hasLayer(this.shangxingLayerFDD_S)) {this.map.removeLayer(this.shangxingLayerFDD_S);}

                if (this.map.hasLayer(this.shangxingLayerTDD_D_C)) {this.map.removeLayer(this.shangxingLayerTDD_D_C);}
                if (this.map.hasLayer(this.shangxingLayerTDD_E_C)) {this.map.removeLayer(this.shangxingLayerTDD_E_C);}
                if (this.map.hasLayer(this.shangxingLayerTDD_F_C)) {this.map.removeLayer(this.shangxingLayerTDD_F_C);}
                if (this.map.hasLayer(this.shangxingLayerFDD_S_C)) {this.map.removeLayer(this.shangxingLayerFDD_S_C);}

                if (this.map.hasLayer(this.shangxingLayer900M)) {this.map.removeLayer(this.shangxingLayer900M);}
                if (this.map.hasLayer(this.shangxingLayer1800M)) {this.map.removeLayer(this.shangxingLayer1800M);}
                
                if (this.map.hasLayer(this.shangxingLayer900M_C)) {this.map.removeLayer(this.shangxingLayer900M_C);}
                if (this.map.hasLayer(this.shangxingLayer1800M_C)) {this.map.removeLayer(this.shangxingLayer1800M_C);}
                
                /*$("div.yjutreds").each(function(index, el) {
                    if ($(el).hasClass('mapCtrlItemSelected')){
                        var func = $(el).attr('func');
                        if (func == 'TDD-D') {this.map.addLayer(this.shangxingLayerTDD_D);}
                        if (func == 'TDD-E') {this.map.addLayer(this.shangxingLayerTDD_E);}
                        if (func == 'TDD-F') {this.map.addLayer(this.shangxingLayerTDD_F);}
                        if (func == 'FDD-S') {this.map.addLayer(this.shangxingLayerFDD_S);}

                        if (func == 'TDD-D-C') {this.map.addLayer(this.shangxingLayerTDD_D_C);}
                        if (func == 'TDD-E-C') {this.map.addLayer(this.shangxingLayerTDD_E_C);}
                        if (func == 'TDD-F-C') {this.map.addLayer(this.shangxingLayerTDD_F_C);}
                        if (func == 'FDD-S-C') {this.map.addLayer(this.shangxingLayerFDD_S_C);}

                        if (func == '900M') {this.map.addLayer(this.shangxingLayer900M);}
                        if (func == '1800M') {this.map.addLayer(this.shangxingLayer1800M);}

                        if (func == '900M-C') {this.map.addLayer(this.shangxingLayer900M_C);}
                        if (func == '1800M-C') {this.map.addLayer(this.shangxingLayer1800M_C);}
                        
                    }
                }.bind(this));  */ 

                var TDD_D_DOM = $("div.yjutreds").eq(4);
                if (TDD_D_DOM.hasClass('mapCtrlItemSelected')) {
                    var func1 = TDD_D_DOM.attr('func');
                    if (func1 == 'TDD-D') {
                        this.map.addLayer(this.shangxingLayerTDD_D);
                    };
                };
                var TDD_E_DOM = $("div.yjutreds").eq(5);
                if (TDD_E_DOM.hasClass('mapCtrlItemSelected')) {
                    var func2 = TDD_E_DOM.attr('func');
                    if (func2 == 'TDD-E') {
                        this.map.addLayer(this.shangxingLayerTDD_E);
                    }
                }
                var TDD_F_DOM = $("div.yjutreds").eq(6);
                if (TDD_F_DOM.hasClass('mapCtrlItemSelected')) {
                    var func3 = TDD_F_DOM.attr('func');
                    if (func3 == 'TDD-F') {
                        this.map.addLayer(this.shangxingLayerTDD_F);
                    }
                }
                var FDD_S_DOM = $("div.yjutreds").eq(7);
                if (FDD_S_DOM.hasClass('mapCtrlItemSelected')) {
                    var func4 = FDD_S_DOM.attr('func');
                    if (func4 == 'FDD-S') {
                        this.map.addLayer(this.shangxingLayerFDD_S);
                    }
                }

                var TDD_D_C_DOM = $("div.yjutreds").eq(8);
                if (TDD_D_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func11 = TDD_D_C_DOM.attr('func');
                    if (func11 == 'TDD-D-C') {
                        this.map.addLayer(this.shangxingLayerTDD_D_C);
                    }
                }
                var TDD_E_C_DOM = $("div.yjutreds").eq(9);
                if (TDD_E_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func22 = TDD_E_C_DOM.attr('func');
                    if (func22 == 'TDD-E-C') {
                        this.map.addLayer(this.shangxingLayerTDD_E_C);
                    }
                }
                var TDD_F_C_DOM = $("div.yjutreds").eq(10);
                if (TDD_F_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func33 = TDD_F_C_DOM.attr('func');
                    if (func33 == 'TDD-F-C') {
                        this.map.addLayer(this.shangxingLayerTDD_F_C);
                    }
                }
                var FDD_S_C_DOM = $("div.yjutreds").eq(11);
                if (FDD_S_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func44 = FDD_S_C_DOM.attr('func');
                    if (func44 == 'FDD_S-C') {
                        this.map.addLayer(this.shangxingLayerFDD_S_C);
                    }
                }

                var _900M_DOM = $("div.yjutreds").eq(0);
                if (_900M_DOM.hasClass('mapCtrlItemSelected')) {
                    var func111 = _900M_DOM.attr('func');
                    if (func111 == '900M') {
                        this.map.addLayer(this.shangxingLayer900M);
                    }
                }
                var _1800M_DOM = $("div.yjutreds").eq(1);
                if (_1800M_DOM.hasClass('mapCtrlItemSelected')) {
                    var func222 = _1800M_DOM.attr('func');
                    if (func222 == '1800M') {
                        this.map.addLayer(this.shangxingLayer1800M);
                    }
                }

                var _900M_C_DOM = $("div.yjutreds").eq(2);
                if (_900M_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func1111 = _900M_C_DOM.attr('func');
                    if (func1111 == '900M-C') {
                        this.map.addLayer(this.shangxingLayer900M_C);
                    }
                }
                var _1800M_C_DOM = $("div.yjutreds").eq(3);
                if (_1800M_C_DOM.hasClass('mapCtrlItemSelected')) {
                    var func2222 = _1800M_C_DOM.attr('func');
                    if (func2222 == '1800M-C') {
                        this.map.addLayer(this.shangxingLayer1800M_C);
                    }
                }
                //this.map.addLayer(this.shangxingLayer900M);
                
                var flag1 = $('div.mapCtrlItem[func="900M"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag2 = $('div.mapCtrlItem[func="1800M"]').eq(0).hasClass('mapCtrlItemSelected');

                var flag11 = $('div.mapCtrlItem[func="900M-C"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag22 = $('div.mapCtrlItem[func="1800M-C"]').eq(0).hasClass('mapCtrlItemSelected');

                if (flag1 && flag2 && flag11 && flag22) {
                    $(".ctrlTitle[func='室外小区']").addClass('mapCtrlItemSelected');  
                    $(".ctrlTitle[func='2G小区总数']").addClass('mapCtrlItemSelected');  
                    this.map.addLayer(this.markersLayer2G);
                }
                break;     
            case '交通枢纽':
                // $('div.mapCtrlItem[func="浦东机场"]').addClass('mapCtrlItemSelected');
                // $('div.mapCtrlItem[func="虹桥机场"]').addClass('mapCtrlItemSelected');
                // $('div.mapCtrlItem[func="虹桥站"]').addClass('mapCtrlItemSelected');
                // $('div.mapCtrlItem[func="上海站"]').addClass('mapCtrlItemSelected');
                // $('div.mapCtrlItem[func="上海南站"]').addClass('mapCtrlItemSelected');
                // this.ctrlSpecialLayer('浦东机场');
                // this.ctrlSpecialLayer('虹桥机场');
                // this.ctrlSpecialLayer('虹桥站');
                // this.ctrlSpecialLayer('上海站');
                // this.ctrlSpecialLayer('上海南站');
                if (this.pdtitle == null) {} else{
                    this.pdtitle.setOpacity(0);
                    this.hqtitle.setOpacity(0);
                    this.hqttitle.setOpacity(0);
                }
                // if (this.map.hasLayer(this.heatMapLayer)) {
                //     this.map.removeLayer(this.heatMapLayer);
                //     $("#ctrlFunction").find('div.hotMap').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }
                // if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                //     this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                //     $("#ctrlFunction").find('div.hotMapOfAll4Class').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }

                $('div.mapCtrlItem[func="浦东机场"]').eq(0).trigger('click');
                $('div.mapCtrlItem[func="虹桥机场"]').eq(0).trigger('click');
                $('div.mapCtrlItem[func="虹桥站"]').eq(0).trigger('click');
                $('div.mapCtrlItem[func="上海站"]').eq(0).trigger('click');
                $('div.mapCtrlItem[func="上海南站"]').eq(0).trigger('click');
                $('div.mapCtrlItem[func="局房图层"]').eq(0).trigger('click');

                var flag1 = $('div.mapCtrlItem[func="浦东机场"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag1 == isToOff) {
                    $('div.mapCtrlItem[func="浦东机场"]').eq(0).trigger('click');
                };
                var flag2 = $('div.mapCtrlItem[func="虹桥机场"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag2 == isToOff) {
                    $('div.mapCtrlItem[func="虹桥机场"]').eq(0).trigger('click');
                }
                var flag3 = $('div.mapCtrlItem[func="虹桥站"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag3 == isToOff) {
                    $('div.mapCtrlItem[func="虹桥站"]').eq(0).trigger('click');
                }
                var flag4 = $('div.mapCtrlItem[func="上海站"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag4 == isToOff) {
                    $('div.mapCtrlItem[func="上海站"]').eq(0).trigger('click');
                }
                var flag5 = $('div.mapCtrlItem[func="上海南站"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag5 == isToOff) {
                    $('div.mapCtrlItem[func="上海南站"]').eq(0).trigger('click');
                }
                var flag6 = $('div.mapCtrlItem[func="局房图层"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag6 == isToOff) {
                    $('div.mapCtrlItem[func="局房图层"]').eq(0).trigger('click');
                }


                break;
            case '酒店':
                // if (this.map.hasLayer(this.heatMapLayer)) {
                //     this.map.removeLayer(this.heatMapLayer);
                //     $("#ctrlFunction").find('div.hotMap').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }
                // if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                //     this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                //     $("#ctrlFunction").find('div.hotMapOfAll4Class').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }

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
                // if (this.map.hasLayer(this.heatMapLayer)) {
                //     this.map.removeLayer(this.heatMapLayer);
                //     $("#ctrlFunction").find('div.hotMap').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }
                // if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                //     this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                //     $("#ctrlFunction").find('div.hotMapOfAll4Class').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }
                this.ctrlSpecialLayer(func,true); 
                $('div.mapCtrlItem[func="浦东机场线路"]').eq(0).trigger('click'); 
                $('div.mapCtrlItem[func="虹桥机场线路"]').eq(0).trigger('click');
                $('div.mapCtrlItem[func="沪杭高铁线路"]').eq(0).trigger('click');
                $('div.mapCtrlItem[func="京沪/沪宁高铁线路"]').eq(0).trigger('click');
                $('div.mapCtrlItem[func="虹桥站线路"]').eq(0).trigger('click');
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
                var flag5 = $('div.mapCtrlItem[func="虹桥站线路"]').eq(0).hasClass('mapCtrlItemSelected');
                if (flag5 == isToOff) {
                    $('div.mapCtrlItem[func="虹桥站线路"]').eq(0).trigger('click');
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
            case '机房视频':
                $('#roomVideo').css('display','block');
                $("#roomVideoTitleSpan").text('机房视频');
                $("#roomVideoIframe").show();
                $("#roomVideoIframeOfset").hide();
                $("#roomVideoIframe").attr('src', BASEPATH + '/pages/local-lsm/videoOfMachineRoom/videoOfMachineRoom5.jsp?isScreenMode=true&singleDivHeight=410');
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
            case '无线覆盖':
                $('#wirelessCoverage').css('display','block');
                break;
            case '5G应用':
                //$('#_5GApplication').css('display','block');
                //window.open("https://officeddns.f3322.net:8090/gisnokia/map_V1/index.html"); 
                window.open("https://officeddns.f3322.net:8090/gisnokia/map_V1/index.html","","top=-100,left=2200,width=2000,height=900"); 
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
                // if (this.map.hasLayer(this.heatMapLayer)) {
                //     this.map.removeLayer(this.heatMapLayer);
                //     $("#ctrlFunction").find('div.hotMap').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }
                // if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                //     this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                //     $("#ctrlFunction").find('div.hotMapOfAll4Class').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }
                this.ctrlSpecialLayer(func);

                var flag1 = $('div.mapCtrlItem[func="浦东机场"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag2 = $('div.mapCtrlItem[func="虹桥机场"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag3 = $('div.mapCtrlItem[func="虹桥站"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag4 = $('div.mapCtrlItem[func="上海站"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag5 = $('div.mapCtrlItem[func="上海南站"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag6 = $('div.mapCtrlItem[func="局房图层"]').eq(0).hasClass('mapCtrlItemSelected');

                if (flag1 && flag2 && flag3 && flag4 && flag5 && flag6 ) {
                    $(".ctrlTitle[func='交通枢纽']").addClass('mapCtrlItemSelected');  
                }

                
                
                break;
            case '虹桥机场':
                if (this.pdtitle == null) {} else{
                    this.pdtitle.setOpacity(0);
                    this.hqtitle.setOpacity(0);
                    this.hqttitle.setOpacity(0);
                }
                // if (this.map.hasLayer(this.heatMapLayer)) {
                //     this.map.removeLayer(this.heatMapLayer);
                //     $("#ctrlFunction").find('div.hotMap').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }
                // if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                //     this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                //     $("#ctrlFunction").find('div.hotMapOfAll4Class').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }
                this.ctrlSpecialLayer(func);


                var flag1 = $('div.mapCtrlItem[func="浦东机场"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag2 = $('div.mapCtrlItem[func="虹桥机场"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag3 = $('div.mapCtrlItem[func="虹桥站"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag4 = $('div.mapCtrlItem[func="上海站"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag5 = $('div.mapCtrlItem[func="上海南站"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag6 = $('div.mapCtrlItem[func="局房图层"]').eq(0).hasClass('mapCtrlItemSelected');

                if (flag1 && flag2 && flag3 && flag4 && flag5 && flag6 ) {
                    $(".ctrlTitle[func='交通枢纽']").addClass('mapCtrlItemSelected');  
                }

                





                break; 
            case '虹桥站':
                if (this.pdtitle == null) {} else{
                    this.pdtitle.setOpacity(0);
                    this.hqtitle.setOpacity(0);
                    this.hqttitle.setOpacity(0);
                }
                // if (this.map.hasLayer(this.heatMapLayer)) {
                //     this.map.removeLayer(this.heatMapLayer);
                //     $("#ctrlFunction").find('div.hotMap').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }
                // if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                //     this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                //     $("#ctrlFunction").find('div.hotMapOfAll4Class').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }
                this.ctrlSpecialLayer(func);

                var flag1 = $('div.mapCtrlItem[func="浦东机场"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag2 = $('div.mapCtrlItem[func="虹桥机场"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag3 = $('div.mapCtrlItem[func="虹桥站"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag4 = $('div.mapCtrlItem[func="上海站"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag5 = $('div.mapCtrlItem[func="上海南站"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag6 = $('div.mapCtrlItem[func="局房图层"]').eq(0).hasClass('mapCtrlItemSelected');

                if (flag1 && flag2 && flag3 && flag4 && flag5 && flag6 ) {
                    $(".ctrlTitle[func='交通枢纽']").addClass('mapCtrlItemSelected');  
                }

                




                break; 
            case '上海站':
                if (this.pdtitle == null) {} else{
                    this.pdtitle.setOpacity(0);
                    this.hqtitle.setOpacity(0);
                    this.hqttitle.setOpacity(0);
                }
                // if (this.map.hasLayer(this.heatMapLayer)) {
                //     this.map.removeLayer(this.heatMapLayer);
                //     $("#ctrlFunction").find('div.hotMap').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }
                // if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                //     this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                //     $("#ctrlFunction").find('div.hotMapOfAll4Class').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }
                this.ctrlSpecialLayer(func);


                var flag1 = $('div.mapCtrlItem[func="浦东机场"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag2 = $('div.mapCtrlItem[func="虹桥机场"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag3 = $('div.mapCtrlItem[func="虹桥站"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag4 = $('div.mapCtrlItem[func="上海站"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag5 = $('div.mapCtrlItem[func="上海南站"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag6 = $('div.mapCtrlItem[func="局房图层"]').eq(0).hasClass('mapCtrlItemSelected');

                if (flag1 && flag2 && flag3 && flag4 && flag5 && flag6 ) {
                    $(".ctrlTitle[func='交通枢纽']").addClass('mapCtrlItemSelected');  
                }

                



                break; 
            case '上海南站':
                if (this.pdtitle == null) {} else{
                    this.pdtitle.setOpacity(0);
                    this.hqtitle.setOpacity(0);
                    this.hqttitle.setOpacity(0);
                }
                // if (this.map.hasLayer(this.heatMapLayer)) {
                //     this.map.removeLayer(this.heatMapLayer);
                //     $("#ctrlFunction").find('div.hotMap').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }
                // if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                //     this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                //     $("#ctrlFunction").find('div.hotMapOfAll4Class').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }
                this.ctrlSpecialLayer(func);
                var flag1 = $('div.mapCtrlItem[func="浦东机场"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag2 = $('div.mapCtrlItem[func="虹桥机场"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag3 = $('div.mapCtrlItem[func="虹桥站"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag4 = $('div.mapCtrlItem[func="上海站"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag5 = $('div.mapCtrlItem[func="上海南站"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag6 = $('div.mapCtrlItem[func="局房图层"]').eq(0).hasClass('mapCtrlItemSelected');

                if (flag1 && flag2 && flag3 && flag4 && flag5 && flag6 ) {
                    $(".ctrlTitle[func='交通枢纽']").addClass('mapCtrlItemSelected');  
                }

                
                break; 
            case '局房图层':
                if (this.pdtitle == null) {} else{
                    this.pdtitle.setOpacity(0);
                    this.hqtitle.setOpacity(0);
                    this.hqttitle.setOpacity(0);
                }
                // if (this.map.hasLayer(this.heatMapLayer)) {
                //     this.map.removeLayer(this.heatMapLayer);
                //     $("#ctrlFunction").find('div.hotMap').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }
                // if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                //     this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                //     $("#ctrlFunction").find('div.hotMapOfAll4Class').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }
                this.ctrlSpecialLayer(func);
                var flag1 = $('div.mapCtrlItem[func="浦东机场"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag2 = $('div.mapCtrlItem[func="虹桥机场"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag3 = $('div.mapCtrlItem[func="虹桥站"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag4 = $('div.mapCtrlItem[func="上海站"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag5 = $('div.mapCtrlItem[func="上海南站"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag6 = $('div.mapCtrlItem[func="局房图层"]').eq(0).hasClass('mapCtrlItemSelected');

                if (flag1 && flag2 && flag3 && flag4 && flag5 && flag6 ) {
                    $(".ctrlTitle[func='交通枢纽']").addClass('mapCtrlItemSelected');  
                }
                break; 
            case '五星酒店':
                // if (this.map.hasLayer(this.heatMapLayer)) {
                //     this.map.removeLayer(this.heatMapLayer);
                //     $("#ctrlFunction").find('div.hotMap').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }
                // if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                //     this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                //     $("#ctrlFunction").find('div.hotMapOfAll4Class').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }
                this.ctrlSpecialLayer(func);


                


                break;
            case '淳大万丽':
                // if (this.map.hasLayer(this.heatMapLayer)) {
                //     this.map.removeLayer(this.heatMapLayer);
                //     $("#ctrlFunction").find('div.hotMap').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }
                // if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                //     this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                //     $("#ctrlFunction").find('div.hotMapOfAll4Class').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }
                this.ctrlSpecialLayer(func);
                break;
            case '国际会议中心':
                // if (this.map.hasLayer(this.heatMapLayer)) {
                //     this.map.removeLayer(this.heatMapLayer);
                //     $("#ctrlFunction").find('div.hotMap').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }
                // if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                //     this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                //     $("#ctrlFunction").find('div.hotMapOfAll4Class').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }
                this.ctrlSpecialLayer(func);
                break; 
            case '浦东香格里拉':
                // if (this.map.hasLayer(this.heatMapLayer)) {
                //     this.map.removeLayer(this.heatMapLayer);
                //     $("#ctrlFunction").find('div.hotMap').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }
                // if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                //     this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                //     $("#ctrlFunction").find('div.hotMapOfAll4Class').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }
                this.ctrlSpecialLayer(func);
                break; 
            case '和平饭店':
                // if (this.map.hasLayer(this.heatMapLayer)) {
                //     this.map.removeLayer(this.heatMapLayer);
                //     $("#ctrlFunction").find('div.hotMap').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }
                // if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                //     this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                //     $("#ctrlFunction").find('div.hotMapOfAll4Class').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }
                this.ctrlSpecialLayer(func);
                break; 
            case '东湖宾馆':
                // if (this.map.hasLayer(this.heatMapLayer)) {
                //     this.map.removeLayer(this.heatMapLayer);
                //     $("#ctrlFunction").find('div.hotMap').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }
                // if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                //     this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                //     $("#ctrlFunction").find('div.hotMapOfAll4Class').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }
                this.ctrlSpecialLayer(func);
                break;         
            case '浦东机场线路':
                // if (this.map.hasLayer(this.heatMapLayer)) {
                //     this.map.removeLayer(this.heatMapLayer);
                //     $("#ctrlFunction").find('div.hotMap').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }
                // if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                //     this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                //     $("#ctrlFunction").find('div.hotMapOfAll4Class').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }
                this.ctrlSpecialLayer(func);
                var flag1 = $('div.mapCtrlItem[func="浦东机场线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag2 = $('div.mapCtrlItem[func="虹桥机场线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag3 = $('div.mapCtrlItem[func="沪杭高铁线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag4 = $('div.mapCtrlItem[func="京沪/沪宁高铁线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag5 = $('div.mapCtrlItem[func="虹桥站线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag6 = $('div.mapCtrlItem[func="上海站线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag7 = $('div.mapCtrlItem[func="上海南站线路"]').eq(0).hasClass('mapCtrlItemSelected');

                if (flag1 && flag2 && flag3 && flag4 && flag5 && flag6 && flag7 ) {
                    $(".ctrlTitle[func='保障线路']").addClass('mapCtrlItemSelected');  
                }
                break; 
            case '虹桥机场线路':
                // if (this.map.hasLayer(this.heatMapLayer)) {
                //     this.map.removeLayer(this.heatMapLayer);
                //     $("#ctrlFunction").find('div.hotMap').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }
                // if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                //     this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                //     $("#ctrlFunction").find('div.hotMapOfAll4Class').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }
                this.ctrlSpecialLayer(func);
                var flag1 = $('div.mapCtrlItem[func="浦东机场线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag2 = $('div.mapCtrlItem[func="虹桥机场线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag3 = $('div.mapCtrlItem[func="沪杭高铁线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag4 = $('div.mapCtrlItem[func="京沪/沪宁高铁线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag5 = $('div.mapCtrlItem[func="虹桥站线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag6 = $('div.mapCtrlItem[func="上海站线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag7 = $('div.mapCtrlItem[func="上海南站线路"]').eq(0).hasClass('mapCtrlItemSelected');

                if (flag1 && flag2 && flag3 && flag4 && flag5 && flag6 && flag7 ) {
                    $(".ctrlTitle[func='保障线路']").addClass('mapCtrlItemSelected');  
                }
                break;
            case '沪杭高铁线路':
                // if (this.map.hasLayer(this.heatMapLayer)) {
                //     this.map.removeLayer(this.heatMapLayer);
                //     $("#ctrlFunction").find('div.hotMap').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }
                // if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                //     this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                //     $("#ctrlFunction").find('div.hotMapOfAll4Class').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }
                this.ctrlSpecialLayer(func);
                var flag1 = $('div.mapCtrlItem[func="浦东机场线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag2 = $('div.mapCtrlItem[func="虹桥机场线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag3 = $('div.mapCtrlItem[func="沪杭高铁线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag4 = $('div.mapCtrlItem[func="京沪/沪宁高铁线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag5 = $('div.mapCtrlItem[func="虹桥站线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag6 = $('div.mapCtrlItem[func="上海站线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag7 = $('div.mapCtrlItem[func="上海南站线路"]').eq(0).hasClass('mapCtrlItemSelected');

                if (flag1 && flag2 && flag3 && flag4 && flag5 && flag6 && flag7 ) {
                    $(".ctrlTitle[func='保障线路']").addClass('mapCtrlItemSelected');  
                }
                break;
            case '京沪/沪宁高铁线路':
                // if (this.map.hasLayer(this.heatMapLayer)) {
                //     this.map.removeLayer(this.heatMapLayer);
                //     $("#ctrlFunction").find('div.hotMap').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }
                // if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                //     this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                //     $("#ctrlFunction").find('div.hotMapOfAll4Class').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }
                this.ctrlSpecialLayer(func);
                var flag1 = $('div.mapCtrlItem[func="浦东机场线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag2 = $('div.mapCtrlItem[func="虹桥机场线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag3 = $('div.mapCtrlItem[func="沪杭高铁线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag4 = $('div.mapCtrlItem[func="京沪/沪宁高铁线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag5 = $('div.mapCtrlItem[func="虹桥站线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag6 = $('div.mapCtrlItem[func="上海站线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag7 = $('div.mapCtrlItem[func="上海南站线路"]').eq(0).hasClass('mapCtrlItemSelected');

                if (flag1 && flag2 && flag3 && flag4 && flag5 && flag6 && flag7 ) {
                    $(".ctrlTitle[func='保障线路']").addClass('mapCtrlItemSelected');  
                }
                break;
            case '虹桥站线路':
                // if (this.map.hasLayer(this.heatMapLayer)) {
                //     this.map.removeLayer(this.heatMapLayer);
                //     $("#ctrlFunction").find('div.hotMap').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }
                // if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                //     this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                //     $("#ctrlFunction").find('div.hotMapOfAll4Class').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }
                this.ctrlSpecialLayer(func);
                var flag1 = $('div.mapCtrlItem[func="浦东机场线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag2 = $('div.mapCtrlItem[func="虹桥机场线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag3 = $('div.mapCtrlItem[func="沪杭高铁线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag4 = $('div.mapCtrlItem[func="京沪/沪宁高铁线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag5 = $('div.mapCtrlItem[func="虹桥站线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag6 = $('div.mapCtrlItem[func="上海站线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag7 = $('div.mapCtrlItem[func="上海南站线路"]').eq(0).hasClass('mapCtrlItemSelected');

                if (flag1 && flag2 && flag3 && flag4 && flag5 && flag6 && flag7 ) {
                    $(".ctrlTitle[func='保障线路']").addClass('mapCtrlItemSelected');  
                }
                break;
            case '上海站线路':
                // if (this.map.hasLayer(this.heatMapLayer)) {
                //     this.map.removeLayer(this.heatMapLayer);
                //     $("#ctrlFunction").find('div.hotMap').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }
                // if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                //     this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                //     $("#ctrlFunction").find('div.hotMapOfAll4Class').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }
                this.ctrlSpecialLayer(func);
                var flag1 = $('div.mapCtrlItem[func="浦东机场线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag2 = $('div.mapCtrlItem[func="虹桥机场线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag3 = $('div.mapCtrlItem[func="沪杭高铁线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag4 = $('div.mapCtrlItem[func="京沪/沪宁高铁线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag5 = $('div.mapCtrlItem[func="虹桥站线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag6 = $('div.mapCtrlItem[func="上海站线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag7 = $('div.mapCtrlItem[func="上海南站线路"]').eq(0).hasClass('mapCtrlItemSelected');

                if (flag1 && flag2 && flag3 && flag4 && flag5 && flag6 && flag7 ) {
                    $(".ctrlTitle[func='保障线路']").addClass('mapCtrlItemSelected');  
                }
                break;
            case '上海南站线路':
                // if (this.map.hasLayer(this.heatMapLayer)) {
                //     this.map.removeLayer(this.heatMapLayer);
                //     $("#ctrlFunction").find('div.hotMap').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }
                // if (this.map.hasLayer(this.heatMapLayerOfAll4BigClass)) {
                //     this.map.removeLayer(this.heatMapLayerOfAll4BigClass);
                //     $("#ctrlFunction").find('div.hotMapOfAll4Class').eq(0).parent('div').eq(0).removeClass('mapCtrlItemSelected');
                // }
                this.ctrlSpecialLayer(func);
                var flag1 = $('div.mapCtrlItem[func="浦东机场线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag2 = $('div.mapCtrlItem[func="虹桥机场线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag3 = $('div.mapCtrlItem[func="沪杭高铁线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag4 = $('div.mapCtrlItem[func="京沪/沪宁高铁线路"]').eq(0).hasClass('mapCtrlItemSelected');
                var flag5 = $('div.mapCtrlItem[func="虹桥站线路"]').eq(0).hasClass('mapCtrlItemSelected');
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
                                iconUrl: this.ctx+'/static/styles/local-lsm/map/hotel_green.png',
                                //iconSize: [100,100]
                                iconSize: iconSize
                        });
                        var markerthdrgsef = L.marker([lat,lng],{titleName: title, icon: iconhotel, keepInView:false}).on('mouseover', function(event) {
                                                    console.log(event);
                                                    if(event.originalEvent){
                                                        var x = event.originalEvent.x;
                                                        var y = event.originalEvent.y + 37;
                                                        $("#circleTitle").text(event.target.options.titleName);
                                                        $("#circleTitle").css({top: y,left: x});
                                                        $("#circleTitle").show();
                                                    }
                                                }).on('mouseout', function(event) {
                                                    if(event.originalEvent) {
                                                        $("#circleTitle").hide();
                                                    }
                                                }).addTo(currLayerHote);
                        this.markerHotelArr.push(markerthdrgsef);
                        var map=this.map;
                        var curZoom = map.getZoom();
                        var noNum = 0;
                        var yesNum = 0;
                        $("#ctrlFactor").find('.ctrlTitle ').each(function(index, el) {noNum++;});
                        $("#ctrlFactor").find('.mapCtrlItem  ').each(function(index, el) {yesNum++;});
                        var usenum = yesNum - noNum;
                        if (this.loadHotalFirst> usenum!= 0){
                            if (this.isLocationOfAllFctor) {
                                this.map.setView([lat,lng],curZoom);
                            }
                        };
                        //console.error(title);
                        if (i == hotalData.length -1) {this.isLocationOfAllFctor = true };
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
//                                 iconUrl: this.ctx+'/static/styles/local-lsm/map/hotel_green.png',
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
                                if (this.isLocationOfAllFctor) {
                                    this.map.setView(_latlng,curZoom);
                                } 
                                //console.error(_1111.options.title);
                                if (i == hotalData.length -1) {this.isLocationOfAllFctor = true };
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
                                            //特殊处理机场大小
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
                                            var iconAirPlane = L.icon({
                                                    iconUrl: this.ctx+'/static/styles/local-lsm/map/airplane_green.png',
                                                    //iconSize: [100,100]
                                                    iconSize: iconSize
                                            });

                                            var markerthdrgsef = L.marker([lat,lng],{titleName: title, icon: iconAirPlane, keepInView:false}).on('mouseover', function(event) {
                                                                    console.log(event);
                                                                    if(event.originalEvent){
                                                                        var x = event.originalEvent.x;
                                                                        var y = event.originalEvent.y + 37;
                                                                        $("#circleTitle").text(event.target.options.titleName);
                                                                        $("#circleTitle").css({top: y,left: x});
                                                                        $("#circleTitle").show();
                                                                    }
                                                                }).on('mouseout', function(event) {
                                                                    if(event.originalEvent) {
                                                                        $("#circleTitle").hide();
                                                                    }
                                                                }).addTo(this.specialLayerTraffic);
                                            this.markerAirplaneArr.push(markerthdrgsef);
                                            var map=this.map;
                                            var curZoom = map.getZoom();
                                            var noNum = 0;
                                            var yesNum = 0;
                                            $("#ctrlFactor").find('.ctrlTitle ').each(function(index, el) {noNum++;});
                                            $("#ctrlFactor").find('.mapCtrlItem  ').each(function(index, el) {yesNum++;});
                                            var usenum = yesNum - noNum;
                                            if (this.loadHotalFirstNum > usenum){
                                                if (this.isLocationOfAllFctor) {
                                                    this.map.setView([lat,lng],curZoom);
                                                }
                                            };
                                            this.loadHotalFirstNum++;

                                        }else if(name.indexOf('火车站')!=-1){
                                            var title = name.replace('J-','');
                                            //特殊处理火车站大小
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
                                            var iconTrain = L.icon({
                                                    iconUrl: this.ctx+'/static/styles/local-lsm/map/train_green.png',
                                                    //iconSize: [100,100]
                                                    iconSize: iconSize
                                            });
                                            var markerthdrgsef = L.marker([lat,lng],{titleName: title, icon: iconTrain, keepInView:false}).on('mouseover', function(event) {
                                                                    console.log(event);
                                                                    if(event.originalEvent){
                                                                        var x = event.originalEvent.x;
                                                                        var y = event.originalEvent.y + 37;
                                                                        $("#circleTitle").text(event.target.options.titleName);
                                                                        $("#circleTitle").css({top: y,left: x});
                                                                        $("#circleTitle").show();
                                                                    }
                                                                }).on('mouseout', function(event) {
                                                                    if(event.originalEvent) {
                                                                        $("#circleTitle").hide();
                                                                    }
                                                                }).addTo(this.specialLayerTraffic);
                                            this.markerTrainArr.push(markerthdrgsef);
                                            var map=this.map;
                                            var curZoom = map.getZoom();
                                            var noNum = 0;
                                            var yesNum = 0;
                                            $("#ctrlFactor").find('.ctrlTitle ').each(function(index, el) {noNum++;});
                                            $("#ctrlFactor").find('.mapCtrlItem  ').each(function(index, el) {yesNum++;});
                                            var usenum = yesNum - noNum;
                                            if (this.loadHotalFirstNum > usenum){
                                                if (this.isLocationOfAllFctor) {
                                                    this.map.setView([lat,lng],curZoom);
                                                }
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
        case '局房图层':
            if(this.map.hasLayer(this.specialLayer_jufang_traffic)){
                this.map.removeLayer(this.specialLayer_jufang_traffic);
            }else{
                if(this.specialLayer_jufang_traffic==null){
                    this.specialLayer_jufang_traffic=new L.featureGroup();
                    this.map.addLayer(this.specialLayer_jufang_traffic);
                    var url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-rm-room';
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


                        var data = result.data;
                        for (var i = 0; i < data.length; i++) {
                            var currPoint = data[i];
                            if(currPoint.longitude!=null && currPoint.latitude != null){
                                var title = currPoint.address;
                                var lat = currPoint.latitude;
                                var lng = currPoint.longitude;
                                var iconTrain = L.icon({
                                        iconUrl: this.ctx+'/static/styles/local-lsm/map/BaseRoom_green.png',
                                        //iconSize: [100,100]
                                        iconSize: iconSize
                                });
                                var markerewthwerherth = L.marker([lat,lng],{titleName: title, icon: iconTrain, keepInView:false}).on('mouseover', function(event) {
                                                            console.log(event);
                                                            if(event.originalEvent){
                                                                var x = event.originalEvent.x;
                                                                var y = event.originalEvent.y + 37;
                                                                $("#circleTitle").text(event.target.options.titleName);
                                                                $("#circleTitle").css({top: y,left: x});
                                                                $("#circleTitle").show();
                                                            }
                                                        }).on('mouseout', function(event) {
                                                            if(event.originalEvent) {
                                                                $("#circleTitle").hide();
                                                            }
                                                        }).addTo(this.specialLayer_jufang_traffic);
                                this.markerJufangArr.push(markerewthwerherth);
                            }
                        }







                    }.bind(this));
                }else{
                    this.map.addLayer(this.specialLayer_jufang_traffic);
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
                            var markerthdrgsef = L.marker([lat,lng],{titleName: title, icon: this.markerHOTEL, keepInView:false}).on('mouseover', function(event) {
                                                    console.log(event);
                                                    if(event.originalEvent){
                                                        var x = event.originalEvent.x;
                                                        var y = event.originalEvent.y + 37;
                                                        $("#circleTitle").text(event.target.options.titleName);
                                                        $("#circleTitle").css({top: y,left: x});
                                                        $("#circleTitle").show();
                                                    }
                                                }).on('mouseout', function(event) {
                                                    if(event.originalEvent) {
                                                        $("#circleTitle").hide();
                                                    }
                                                }).addTo(this.specialLayerHotel);
                            this.markerHotelArr.push(markerthdrgsef);
                            var map=this.map;
                            var curZoom = map.getZoom();
                            var noNum = 0;
                            var yesNum = 0;
                            $("#ctrlFactor").find('.ctrlTitle ').each(function(index, el) {noNum++;});
                            $("#ctrlFactor").find('.mapCtrlItem  ').each(function(index, el) {yesNum++;});
                            var usenum = yesNum - noNum;
                            if (this.loadHotalFirstNum > usenum){
                                if (this.isLocationOfAllFctor) {
                                    this.map.setView([lat,lng],curZoom);
                                }
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
                    //                         if (this.isLocationOfAllFctor) {
                    //                             this.map.setView([lat,lng],curZoom);
                    //                         }
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
                                            var markerthdrgsef = L.marker([lat,lng],{titleName: title, icon: this.markerHOTEL, keepInView:false}).on('mouseover', function(event) {
                                                                    console.log(event);
                                                                    if(event.originalEvent){
                                                                        var x = event.originalEvent.x;
                                                                        var y = event.originalEvent.y + 37;
                                                                        $("#circleTitle").text(event.target.options.titleName);
                                                                        $("#circleTitle").css({top: y,left: x});
                                                                        $("#circleTitle").show();
                                                                    }
                                                                }).on('mouseout', function(event) {
                                                                    if(event.originalEvent) {
                                                                        $("#circleTitle").hide();
                                                                    }
                                                                }).addTo(this.specialLayerHotelOf5_1);
                                            this.markerHotelArr.push(markerthdrgsef);
                                            var map=this.map;
                                            var curZoom = map.getZoom();
                                            var noNum = 0;
                                            var yesNum = 0;
                                            $("#ctrlFactor").find('.ctrlTitle ').each(function(index, el) {noNum++;});
                                            $("#ctrlFactor").find('.mapCtrlItem  ').each(function(index, el) {yesNum++;});
                                            var usenum = yesNum - noNum;
                                            if (this.loadHotalFirstNum > usenum){
                                                if (this.isLocationOfAllFctor) {
                                                    this.map.setView([lat,lng],curZoom);
                                                }
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
                                            var markerthdrgsef = L.marker([lat,lng],{titleName: title, icon: this.markerHOTEL, keepInView:false}).on('mouseover', function(event) {
                                                                    console.log(event);
                                                                    if(event.originalEvent){
                                                                        var x = event.originalEvent.x;
                                                                        var y = event.originalEvent.y + 37;
                                                                        $("#circleTitle").text(event.target.options.titleName);
                                                                        $("#circleTitle").css({top: y,left: x});
                                                                        $("#circleTitle").show();
                                                                    }
                                                                }).on('mouseout', function(event) {
                                                                    if(event.originalEvent) {
                                                                        $("#circleTitle").hide();
                                                                    }
                                                                }).addTo(this.specialLayerHotelOf5_2);
                                            this.markerHotelArr.push(markerthdrgsef);
                                            var map=this.map;
                                            var curZoom = map.getZoom();
                                            var noNum = 0;
                                            var yesNum = 0;
                                            $("#ctrlFactor").find('.ctrlTitle ').each(function(index, el) {noNum++;});
                                            $("#ctrlFactor").find('.mapCtrlItem  ').each(function(index, el) {yesNum++;});
                                            var usenum = yesNum - noNum;
                                            if (this.loadHotalFirstNum > usenum){
                                                if (this.isLocationOfAllFctor) {
                                                    this.map.setView([lat,lng],curZoom);
                                                }
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
                                            var markerthdrgsef = L.marker([lat,lng],{titleName: title, icon: this.markerHOTEL, keepInView:false}).on('mouseover', function(event) {
                                                                    console.log(event);
                                                                    if(event.originalEvent){
                                                                        var x = event.originalEvent.x;
                                                                        var y = event.originalEvent.y + 37;
                                                                        $("#circleTitle").text(event.target.options.titleName);
                                                                        $("#circleTitle").css({top: y,left: x});
                                                                        $("#circleTitle").show();
                                                                    }
                                                                }).on('mouseout', function(event) {
                                                                    if(event.originalEvent) {
                                                                        $("#circleTitle").hide();
                                                                    }
                                                                }).addTo(this.specialLayerHotelOf5_3);
                                            this.markerHotelArr.push(markerthdrgsef);
                                            var map=this.map;
                                            var curZoom = map.getZoom();
                                            var noNum = 0;
                                            var yesNum = 0;
                                            $("#ctrlFactor").find('.ctrlTitle ').each(function(index, el) {noNum++;});
                                            $("#ctrlFactor").find('.mapCtrlItem  ').each(function(index, el) {yesNum++;});
                                            var usenum = yesNum - noNum;
                                            if (this.loadHotalFirstNum > usenum){
                                                if (this.isLocationOfAllFctor) {
                                                    this.map.setView([lat,lng],curZoom);
                                                }
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
                                            var markerthdrgsef = L.marker([lat,lng],{titleName: title, icon: this.markerHOTEL, keepInView:false}).on('mouseover', function(event) {
                                                                    console.log(event);
                                                                    if(event.originalEvent){
                                                                        var x = event.originalEvent.x;
                                                                        var y = event.originalEvent.y + 37;
                                                                        $("#circleTitle").text(event.target.options.titleName);
                                                                        $("#circleTitle").css({top: y,left: x});
                                                                        $("#circleTitle").show();
                                                                    }
                                                                }).on('mouseout', function(event) {
                                                                    if(event.originalEvent) {
                                                                        $("#circleTitle").hide();
                                                                    }
                                                                }).addTo(this.specialLayerHotelOf5_4);
                                            this.markerHotelArr.push(markerthdrgsef);
                                            var map=this.map;
                                            var curZoom = map.getZoom();
                                            var noNum = 0;
                                            var yesNum = 0;
                                            $("#ctrlFactor").find('.ctrlTitle ').each(function(index, el) {noNum++;});
                                            $("#ctrlFactor").find('.mapCtrlItem  ').each(function(index, el) {yesNum++;});
                                            var usenum = yesNum - noNum;
                                            if (this.loadHotalFirstNum > usenum){
                                                if (this.isLocationOfAllFctor) {
                                                    this.map.setView([lat,lng],curZoom);
                                                }
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
                                            var markerthdrgsef = L.marker([lat,lng],{titleName: title, icon: this.markerHOTEL, keepInView:false}).on('mouseover', function(event) {
                                                                    console.log(event);
                                                                    if(event.originalEvent){
                                                                        var x = event.originalEvent.x;
                                                                        var y = event.originalEvent.y + 37;
                                                                        $("#circleTitle").text(event.target.options.titleName);
                                                                        $("#circleTitle").css({top: y,left: x});
                                                                        $("#circleTitle").show();
                                                                    }
                                                                }).on('mouseout', function(event) {
                                                                    if(event.originalEvent) {
                                                                        $("#circleTitle").hide();
                                                                    }
                                                                }).addTo(this.specialLayerHotelOf5_5);
                                            this.markerHotelArr.push(markerthdrgsef);
                                            var map=this.map;
                                            var curZoom = map.getZoom();
                                            var noNum = 0;
                                            var yesNum = 0;
                                            $("#ctrlFactor").find('.ctrlTitle ').each(function(index, el) {noNum++;});
                                            $("#ctrlFactor").find('.mapCtrlItem  ').each(function(index, el) {yesNum++;});
                                            var usenum = yesNum - noNum;
                                            if (this.loadHotalFirstNum > usenum){
                                                if (this.isLocationOfAllFctor) {
                                                    this.map.setView([lat,lng],curZoom);
                                                }
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
        //  if(this.map.hasLayer(this.specialLayerLine)){
        //      this.map.removeLayer(this.specialLayerLine);
        //  }else{
        //      if(this.specialLayerLine==null){
        //          this.specialLayerLine=new L.featureGroup();
        //          this.map.addLayer(this.specialLayerLine);
        //          var colors=[
        //                      "#cc0066",
        //                      "#660099",
        //                      "#0033ff",
        //                      "#00cc00"
        //                     ];
        //          var lines=[
        //                  [//虹桥站-国家会展中心
        //                   [[31.20034, 121.3249],[31.19327, 121.32515],[31.19192, 121.31069]]
        //                  ],
        //                  [//虹桥机场-国家会展中心
        //                   [[31.20057, 121.33364],[31.19372, 121.33182],[31.19168, 121.31043]]
        //                  ],
        //                  [//沪杭高铁
        //                   [[31.20029, 121.32575],[31.19726, 121.32593],[31.18519, 121.32827],[31.17901, 121.32726],[31.17722, 121.32744],[31.11874, 121.36675],[31.11605, 121.36823],[31.10551, 121.37282],[31.09987, 121.37405],[31.09609, 121.37218],[31.07949, 121.35518],[31.07528, 121.34846],[31.05957, 121.31954],[31.05084, 121.3079],[31.04206, 121.29942],[31.02442, 121.28008],[31.00418, 121.26219],[30.99594, 121.25141],[30.98146, 121.22281],[30.97403, 121.21131],[30.94615, 121.18587],[30.94163, 121.18055],[30.93339, 121.1674],[30.91276, 121.11724],[30.88456, 121.06686],[30.86355, 121.02231]]
        //                  ],
        //                  [//京沪/沪宁高铁
        //                   [[31.2025,121.32775],[31.2248, 121.32557],[31.22986, 121.32169],[31.24876, 121.30035],[31.27586, 121.28907],[31.28592, 121.28138],[31.2924, 121.27354],[31.29586, 121.26758],[31.30153, 121.24832]]
        //                  ],
        //                  [//浦东机场-国家会展中心
        //                   //[[31.15582, 121.81216],[31.16493, 121.80937],[31.18817, 121.79284],[31.19212, 121.78824],[31.19496, 121.77185],[31.19076, 121.75072],[31.16246, 121.66722],[31.15702, 121.61519],[31.15356, 121.60081],[31.15035, 121.56618],[31.13761, 121.49977],[31.13576, 121.48281],[31.13094, 121.46628],[31.12488, 121.41986],[31.12377, 121.37918],[31.11944, 121.36381],[31.12216, 121.3633],[31.14559, 121.34613],[31.16951, 121.33132],[31.11925, 121.36402],[31.12247, 121.36309],[31.14596, 121.34584],[31.16963, 121.33053],[31.17983, 121.32457],[31.18434, 121.32349],[31.19253, 121.31838],[31.192, 121.31111]]
  //                            [[31.15582, 121.81216],[31.16493, 121.80937],[31.18817, 121.79284],[31.19212, 121.78824],[31.19496, 121.77185],[31.19076, 121.75072],[31.16246, 121.66722],[31.15702, 121.61519],[31.15356, 121.60081],[31.15035, 121.56618],[31.13761, 121.49977],[31.13576, 121.48281],[31.13094, 121.46628],[31.12488, 121.41986],[31.12377, 121.37918],[31.11944, 121.36381],[31.12216, 121.3633],[31.14559, 121.34613],[31.16951, 121.33132],[31.11925, 121.36402],[31.12247, 121.36309],[31.14596, 121.34584],[31.16963, 121.33053],[31.17983, 121.32457],[31.18434, 121.32349],[31.19253, 121.31838],[31.192, 121.31111]]

        //                  ],
        //                  [//上海站-国家会展中心
        //                   [[31.25363, 121.45904],[31.25667, 121.45763],[31.26163, 121.45846],[31.26453, 121.45625],[31.2637, 121.45162],[31.26023, 121.44287],[31.2532, 121.43574],[31.24746, 121.42503],[31.2403, 121.41857],[31.2403, 121.41857],[31.23141, 121.41756],[31.2248, 121.41713],[31.21794, 121.41929],[31.21424, 121.41835],[31.2122, 121.41842],[31.20824, 121.4131],[31.20534, 121.40369],[31.19799, 121.39111],[31.18916, 121.36481],[31.17884, 121.35382],[31.17606, 121.34871],[31.16963, 121.33053],[31.17983, 121.32457],[31.18434, 121.32349],[31.19253, 121.31838],[31.192, 121.31111]]
        //                  ],
        //                  [//上海南站-国家会展中心
        //                   [[31.15929, 121.43089],[31.12451, 121.39507],[31.12377, 121.38026],[31.11925, 121.36402],[31.12247, 121.36309],[31.14596, 121.34584],[31.16963, 121.33053],[31.17983, 121.32457],[31.18434, 121.32349],[31.19253, 121.31838],[31.192, 121.31111]]
        //                  ]
        //                 ];
        //          for(var i=0;i<lines.length;i++){
        //              var list=lines[i];
        //              for(var j=0;j<list.length;j++){
        //                  var latlngs=list[j];
        //                  var color=colors[i%colors.length];
        //                  var polyline = L.polyline(latlngs, {color: color,weight:10}).addTo(this.specialLayerLine);
        //              }
        //          }
        //      }else{
        //          this.map.addLayer(this.specialLayerLine);
        //      }
        //  }
        //  break;
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
                                            //特殊处理机场大小
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
                                            var iconAirPlane = L.icon({
                                                    iconUrl: this.ctx+'/static/styles/local-lsm/map/airplane_green.png',
                                                    //iconSize: [100,100]
                                                    iconSize: iconSize
                                            });

                                            var markerthdrgsef = L.marker([lat,lng],{titleName: title, icon: iconAirPlane, keepInView:false}).on('mouseover', function(event) {
                                                                    console.log(event);
                                                                    if(event.originalEvent){
                                                                        var x = event.originalEvent.x;
                                                                        var y = event.originalEvent.y + 37;
                                                                        $("#circleTitle").text(event.target.options.titleName);
                                                                        $("#circleTitle").css({top: y,left: x});
                                                                        $("#circleTitle").show();
                                                                    }
                                                                }).on('mouseout', function(event) {
                                                                    if(event.originalEvent) {
                                                                        $("#circleTitle").hide();
                                                                    }
                                                                }).addTo(this.specialLayer_pudongjichang_traffic);
                                            this.markerAirplaneArr.push(markerthdrgsef);
                                            var map=this.map;
                                            var curZoom = map.getZoom();
                                            var noNum = 0;
                                            var yesNum = 0;
                                            $("#ctrlFactor").find('.ctrlTitle ').each(function(index, el) {noNum++;});
                                            $("#ctrlFactor").find('.mapCtrlItem  ').each(function(index, el) {yesNum++;});
                                            var usenum = yesNum - noNum;
                                            if (this.loadHotalFirstNum > usenum){
                                                if (this.isLocationOfAllFctor) {
                                                    this.map.setView([lat,lng],curZoom);
                                                }
                                                //console.error(title);
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
                            if (this.isLocationOfAllFctor) {
                                this.map.setView(_latlng,curZoom);
                            }
                            //console.error(_1111.options.title);
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
                                            //特殊处理机场大小
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
                                            var iconAirPlane = L.icon({
                                                    iconUrl: this.ctx+'/static/styles/local-lsm/map/airplane_green.png',
                                                    //iconSize: [100,100]
                                                    iconSize: iconSize
                                            });

                                            var markerthdrgsef = L.marker([lat,lng],{titleName: title, icon: iconAirPlane, keepInView:false}).on('mouseover', function(event) {
                                                                    console.log(event);
                                                                    if(event.originalEvent){
                                                                        var x = event.originalEvent.x;
                                                                        var y = event.originalEvent.y + 37;
                                                                        $("#circleTitle").text(event.target.options.titleName);
                                                                        $("#circleTitle").css({top: y,left: x});
                                                                        $("#circleTitle").show();
                                                                    }
                                                                }).on('mouseout', function(event) {
                                                                    if(event.originalEvent) {
                                                                        $("#circleTitle").hide();
                                                                    }
                                                                }).addTo(this.specialLayer_hongqiaojichang_traffic);
                                            this.markerAirplaneArr.push(markerthdrgsef);
                                            var map=this.map;
                                            var curZoom = map.getZoom();
                                            var noNum = 0;
                                            var yesNum = 0;
                                            $("#ctrlFactor").find('.ctrlTitle ').each(function(index, el) {noNum++;});
                                            $("#ctrlFactor").find('.mapCtrlItem  ').each(function(index, el) {yesNum++;});
                                            var usenum = yesNum - noNum;
                                            if (this.loadHotalFirstNum > usenum){
                                                if (this.isLocationOfAllFctor) {
                                                    this.map.setView([lat,lng],curZoom);
                                                }
                                                //console.error(title);
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
                            if (this.isLocationOfAllFctor) {
                                this.map.setView(_latlng,curZoom);
                            }
                            //console.error(_1111.options.title);
                        }
                        kk++;
                    }
                }
                
            }
            break;    
        case '虹桥站':
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
                                        if(name.indexOf('虹桥站')!=-1){
                                            var title = name.replace('J-','');
                                            //特殊处理火车站大小
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
                                            var iconTrain = L.icon({
                                                    iconUrl: this.ctx+'/static/styles/local-lsm/map/train_green.png',
                                                    //iconSize: [100,100]
                                                    iconSize: iconSize
                                            });
                                            var markerthdrgsef = L.marker([lat,lng],{titleName: title, icon: iconTrain, keepInView:false}).on('mouseover', function(event) {
                                                                    console.log(event);
                                                                    if(event.originalEvent){
                                                                        var x = event.originalEvent.x;
                                                                        var y = event.originalEvent.y + 37;
                                                                        $("#circleTitle").text(event.target.options.titleName);
                                                                        $("#circleTitle").css({top: y,left: x});
                                                                        $("#circleTitle").show();
                                                                    }
                                                                }).on('mouseout', function(event) {
                                                                    if(event.originalEvent) {
                                                                        $("#circleTitle").hide();
                                                                    }
                                                                }).addTo(this.specialLayer_hongqiaohuochezhan_traffic);
                                            this.markerTrainArr.push(markerthdrgsef);
                                            var map=this.map;
                                            var curZoom = map.getZoom();
                                            var noNum = 0;
                                            var yesNum = 0;
                                            $("#ctrlFactor").find('.ctrlTitle ').each(function(index, el) {noNum++;});
                                            $("#ctrlFactor").find('.mapCtrlItem  ').each(function(index, el) {yesNum++;});
                                            var usenum = yesNum - noNum;
                                            if (this.loadHotalFirstNum > usenum){
                                                if (this.isLocationOfAllFctor) {
                                                    this.map.setView([lat,lng],curZoom);
                                                }
                                                //console.error(title);
                                            };
                                            this.loadHotalFirstNum++;

                                        }
                                    }
                                    
                                }
                                break;
                            }
                        }
                    }.bind(this));
                    var url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/area-re_cellByHotname?hotspot='+ encodeURIComponent('虹桥站');
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
                            if (this.isLocationOfAllFctor) {
                                this.map.setView(_latlng,curZoom);
                            }
                            //console.error(_1111.options.title);
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
                                            //特殊处理火车站大小
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
                                            var iconTrain = L.icon({
                                                    iconUrl: this.ctx+'/static/styles/local-lsm/map/train_green.png',
                                                    //iconSize: [100,100]
                                                    iconSize: iconSize
                                            });
                                            var markerthdrgsef = L.marker([lat,lng],{titleName: title, icon: iconTrain, keepInView:false}).on('mouseover', function(event) {
                                                                    console.log(event);
                                                                    if(event.originalEvent){
                                                                        var x = event.originalEvent.x;
                                                                        var y = event.originalEvent.y + 37;
                                                                        $("#circleTitle").text(event.target.options.titleName);
                                                                        $("#circleTitle").css({top: y,left: x});
                                                                        $("#circleTitle").show();
                                                                    }
                                                                }).on('mouseout', function(event) {
                                                                    if(event.originalEvent) {
                                                                        $("#circleTitle").hide();
                                                                    }
                                                                }).addTo(this.specialLayer_shanghaizhan_traffic);
                                            this.markerTrainArr.push(markerthdrgsef);
                                            var map=this.map;
                                            var curZoom = map.getZoom();
                                            var noNum = 0;
                                            var yesNum = 0;
                                            $("#ctrlFactor").find('.ctrlTitle ').each(function(index, el) {noNum++;});
                                            $("#ctrlFactor").find('.mapCtrlItem  ').each(function(index, el) {yesNum++;});
                                            var usenum = yesNum - noNum;
                                            if (this.loadHotalFirstNum > usenum){
                                                if (this.isLocationOfAllFctor) {
                                                    this.map.setView([lat,lng],curZoom);
                                                }
                                                //console.error(title);
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
                            if (this.isLocationOfAllFctor) {
                                this.map.setView(_latlng,curZoom);
                            }
                            //console.error(_1111.options.title);
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
                                            //特殊处理火车站大小
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
                                            var iconTrain = L.icon({
                                                    iconUrl: this.ctx+'/static/styles/local-lsm/map/train_green.png',
                                                    //iconSize: [100,100]
                                                    iconSize: iconSize
                                            });
                                            var markerthdrgsef = L.marker([lat,lng],{titleName: title, icon: iconTrain, keepInView:false}).on('mouseover', function(event) {
                                                                    console.log(event);
                                                                    if(event.originalEvent){
                                                                        var x = event.originalEvent.x;
                                                                        var y = event.originalEvent.y + 37;
                                                                        $("#circleTitle").text(event.target.options.titleName);
                                                                        $("#circleTitle").css({top: y,left: x});
                                                                        $("#circleTitle").show();
                                                                    }
                                                                }).on('mouseout', function(event) {
                                                                    if(event.originalEvent) {
                                                                        $("#circleTitle").hide();
                                                                    }
                                                                }).addTo(this.specialLayer_shanghainanzhan_traffic);
                                            this.markerTrainArr.push(markerthdrgsef);
                                            var map=this.map;
                                            var curZoom = map.getZoom();
                                            var noNum = 0;
                                            var yesNum = 0;
                                            $("#ctrlFactor").find('.ctrlTitle ').each(function(index, el) {noNum++;});
                                            $("#ctrlFactor").find('.mapCtrlItem  ').each(function(index, el) {yesNum++;});
                                            var usenum = yesNum - noNum;
                                            if (this.loadHotalFirstNum > usenum){
                                                if (this.isLocationOfAllFctor) {
                                                    this.map.setView([lat,lng],curZoom);
                                                }
                                                //console.error(title);
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
                            if (this.isLocationOfAllFctor) {
                                this.map.setView(_latlng,curZoom);
                            }
                            //console.error(_1111.options.title);
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
                    var colors=["#009ad6","#009ad6","#009ad6","#009ad6"];           
                    
                    var lines = [
                    
                             
                            // [[[31.147726,121.816531],[31.116254,121.82773],[31.109828,121.82437],[31.106617,121.804211],[31.103404,121.784425],[31.100834,121.765387],[31.10212,121.741119],[31.098907,121.712374],[31.097621,121.670563],[31.09248,121.64443],[31.092161,121.621658],[31.090875,121.600004],[31.08702,121.583204],[31.069987,121.557445],[31.060346,121.533181],[31.056812,121.495102],[31.056812,121.481289],[31.053597,121.455156],[31.048132,121.42865],[31.040739,121.400278],[31.045239,121.397291],[31.106617,121.369293],[31.12075,121.362946],[31.171164,121.329348],[31.184323,121.322627],[31.2039,121.310306],[31.201654,121.324119]]],
                            // [[[31.205232,121.310197],[31.225126,121.308702],[31.227372,121.323636],[31.229617,121.337822],[31.229938,121.356116],[31.237317,121.354621],[31.245337,121.354247],[31.260091,121.359847],[31.272595,121.366568],[31.295682,121.365447],[31.293438,121.390835],[31.2944,121.416965],[31.29953,121.457284],[31.301453,121.467738],[31.296323,121.48379],[31.313633,121.542403],[31.314275,121.552481],[31.304657,121.552107],[31.290231,121.56368],[31.276124,121.570401],[31.26458,121.586826],[31.244374,121.609599],[31.236032,121.632],[31.226087,121.631253]]],
                            // [[[31.159647,121.813286],[31.185008,121.796857],[31.1956,121.780806],[31.193994,121.762886],[31.189501,121.749073],[31.218063,121.736753],[31.24918,121.722567],[31.242123,121.696434],[31.233782,121.66097],[31.226724,121.630356],[31.224158,121.604597],[31.216136,121.587051],[31.210683,121.570625],[31.209398,121.560547],[31.203942,121.545987],[31.21389,121.50716],[31.203942,121.483267],[31.193675,121.461616],[31.188861,121.452656],[31.188218,121.433991],[31.206831,121.419057],[31.21325,121.41831]]],
                            // [[[31.204755,121.313264],[31.207965,121.332306],[31.228819,121.333798],[31.230744,121.357691],[31.245821,121.354704],[31.257369,121.358436],[31.252558,121.395023],[31.250632,121.418169],[31.253198,121.435342],[31.256727,121.443555],[31.248387,121.452888],[31.251916,121.470435],[31.264746,121.470435],[31.26699,121.467819],[31.264103,121.453259],[31.259614,121.441315],[31.254482,121.433473],[31.251916,121.404354],[31.258651,121.361051],[31.24486,121.35657],[31.22914,121.357317]]],
                            // [[[31.267798,121.469475],[31.270363,121.476193],[31.276455,121.481419],[31.28415,121.484405],[31.287678,121.490008],[31.292166,121.489634],[31.292166,121.49822],[31.291524,121.50382],[31.294731,121.508299],[31.291524,121.516138],[31.291524,121.521737],[31.291524,121.527711],[31.281585,121.53294],[31.272287,121.542271],[31.261703,121.549739],[31.2508,121.568403],[31.23829,121.57475],[31.222248,121.579603],[31.214868,121.581845]]],
                            // [[[31.157895,121.81359],[31.191278,121.791192],[31.196413,121.778871],[31.193524,121.761698],[31.214705,121.754607],[31.214384,121.732953],[31.20604,121.710554],[31.203794,121.685169],[31.192242,121.638876],[31.189031,121.63029],[31.181328,121.61237],[31.174909,121.589971],[31.169773,121.57429],[31.169451,121.560104],[31.155326,121.520907],[31.152436,121.484322],[31.149546,121.458563],[31.13927,121.425336],[31.159499,121.412641],[31.180366,121.402563],[31.200584,121.395098],[31.204863,121.392906],[31.213687,121.386746],[31.21481,121.374053],[31.216576,121.355574],[31.218018,121.332987]]],
                            // [[[31.157531,121.813513],[31.180967,121.795593],[31.191878,121.785888],[31.194127,121.767594],[31.187707,121.742209],[31.17262,121.698156],[31.161707,121.665305],[31.161707,121.653732],[31.197014,121.652985],[31.231668,121.650372]]],
                            // [[[31.099449,121.670905],[31.141416,121.657961],[31.157684,121.653482],[31.16004,121.649748],[31.15897,121.635065],[31.153833,121.601964],[31.151479,121.577823],[31.147625,121.55368],[31.141416,121.52481],[31.136708,121.493452],[31.13585,121.483497],[31.130927,121.465327],[31.127714,121.437702],[31.124504,121.414059],[31.124074,121.385934],[31.122363,121.374487],[31.119365,121.363785]]],
                            // [[[31.193754,121.331426],[31.182198,121.339886],[31.175136,121.344615],[31.181128,121.356811],[31.190116,121.365024],[31.164008,121.372489],[31.140462,121.385431],[31.127403,121.394391],[31.128473,121.400117],[31.137037,121.408577],[31.149667,121.419776],[31.160369,121.435207]]],
                            // [[[31.202645,121.309861],[31.198153,121.299906],[31.178466,121.315834],[31.176113,121.33201],[31.17547,121.340472],[31.184029,121.352669],[31.190663,121.363618],[31.194515,121.38303],[31.206495,121.406427],[31.214411,121.422355],[31.217618,121.435793],[31.226816,121.448735],[31.230667,121.462423],[31.23088,121.476112],[31.224464,121.479099],[31.217406,121.476362],[31.183602,121.491543],[31.178893,121.483827],[31.15471,121.49478]]],
                            // [[[31.203028,121.388252],[31.197466,121.391239],[31.197893,121.402687],[31.196897,121.424988],[31.20567,121.447887],[31.210589,121.464809],[31.215296,121.478001]]]
                             
                             //2018-10-10 16:43:47
                            // [[[31.200654,121.323337],[31.199094,121.323399],[31.198638,121.323337],[31.19758,121.323471],[31.196445,121.323525],[31.196291,121.323615],[31.196198,121.32384],[31.196167,121.324046],[31.196159,121.324549],[31.196144,121.324666],[31.196105,121.324792],[31.196013,121.324909],[31.195843,121.325016],[31.194283,121.325052],[31.194067,121.325016],[31.19382,121.324936],[31.193619,121.324783],[31.19348,121.324621],[31.193364,121.324424],[31.19324,121.324136],[31.193186,121.323876],[31.192931,121.319591],[31.192986,121.319276],[31.193047,121.318953],[31.193094,121.318638],[31.193125,121.318495],[31.193101,121.318279],[31.19307,121.318072],[31.192962,121.317758],[31.192708,121.317273],[31.192429,121.316429],[31.19192,121.311075]]],
                            // [[[31.199766,121.333074],[31.199758,121.332823],[31.199696,121.331637],[31.199619,121.329948],[31.199403,121.329661],[31.199187,121.329598],[31.194376,121.329885],[31.194159,121.329894],[31.193982,121.329876],[31.193835,121.329867],[31.193634,121.329759],[31.19348,121.32967],[31.193379,121.329544],[31.193271,121.329364],[31.193186,121.329113],[31.193101,121.328098],[31.193132,121.327109],[31.193209,121.326544],[31.193256,121.326274],[31.193302,121.32578],[31.193302,121.325484],[31.193202,121.324244],[31.193186,121.323876],[31.192931,121.319591],[31.192986,121.319276],[31.193047,121.318953],[31.193094,121.318638],[31.193125,121.318495],[31.193101,121.318279],[31.19307,121.318072],[31.192962,121.317758],[31.192708,121.317273],[31.192429,121.316429],[31.19192,121.311075]]],
                            // [[[31.160908,121.432526],[31.160437,121.432076],[31.160166,121.431942],[31.15397,121.425546],[31.148902,121.420309],[31.148801,121.420075],[31.148593,121.419734],[31.148516,121.419491],[31.148492,121.419078],[31.148554,121.418755],[31.148693,121.418377],[31.148871,121.418117],[31.149095,121.417892],[31.150099,121.417147],[31.150239,121.417012],[31.152093,121.416149],[31.152294,121.415916],[31.16073,121.41235],[31.163936,121.410993],[31.164716,121.410796],[31.168023,121.409412],[31.174851,121.405325],[31.175569,121.404948],[31.176635,121.404552],[31.17679,121.404481],[31.177554,121.404229],[31.186367,121.401795],[31.186568,121.401741],[31.192514,121.399603],[31.193109,121.39936],[31.194051,121.398956],[31.19575,121.398031],[31.197712,121.396764],[31.199272,121.395695],[31.20036,121.395066],[31.199681,121.39388],[31.19958,121.393539],[31.197835,121.390593],[31.197573,121.390197],[31.196468,121.387664],[31.19497,121.383065],[31.192074,121.373678],[31.190877,121.369527],[31.190167,121.367416],[31.189387,121.365781],[31.188529,121.364371],[31.187888,121.363509],[31.187031,121.362503],[31.184459,121.359969],[31.181463,121.357185],[31.180706,121.356376],[31.179261,121.354517],[31.177686,121.351903],[31.176774,121.350214],[31.176056,121.348498],[31.175129,121.345884],[31.174055,121.342479],[31.173669,121.341285],[31.172147,121.337359],[31.172178,121.337036],[31.171576,121.335149],[31.170572,121.332634],[31.170324,121.33152],[31.170294,121.331143],[31.17034,121.330792],[31.170433,121.330559],[31.171815,121.329661],[31.172557,121.329014],[31.179709,121.324756],[31.180428,121.324441],[31.18103,121.324307],[31.184042,121.323624],[31.184274,121.323579],[31.184745,121.323588],[31.185494,121.323274],[31.189055,121.321055],[31.189441,121.320767],[31.189626,121.320426],[31.193472,121.318001],[31.193943,121.318037],[31.194553,121.317614],[31.1948,121.317578],[31.195017,121.317641],[31.195148,121.317839],[31.195194,121.318117],[31.195063,121.318414],[31.194661,121.318692],[31.194244,121.318917],[31.193835,121.318944],[31.193426,121.318728],[31.193233,121.318423],[31.192993,121.317848],[31.192715,121.317282],[31.192437,121.316465],[31.191904,121.311039]]],
                            // [[[31.253828,121.460867],[31.254307,121.459807],[31.254091,121.45961],[31.253813,121.45908],[31.255063,121.458271],[31.255457,121.458091],[31.256043,121.457867],[31.256336,121.457777],[31.256792,121.457768],[31.257046,121.457768],[31.261692,121.458478],[31.261924,121.458298],[31.262495,121.457624],[31.262819,121.457346],[31.263945,121.456591],[31.264555,121.456241],[31.264347,121.455181],[31.264069,121.453878],[31.263652,121.451722],[31.263297,121.45042],[31.262981,121.449486],[31.260604,121.44344],[31.260303,121.44291],[31.260048,121.442569],[31.259693,121.442146],[31.258976,121.441518],[31.257278,121.440008],[31.256167,121.438832],[31.25504,121.437556],[31.253535,121.436002],[31.253002,121.435283],[31.252478,121.434376],[31.251567,121.432238],[31.249962,121.429417],[31.24895,121.427432],[31.248148,121.425986],[31.24797,121.42577],[31.250023,121.423093],[31.250556,121.422159],[31.251104,121.420911],[31.251497,121.419536],[31.251752,121.418269],[31.251783,121.417695],[31.251783,121.415386],[31.251335,121.413571],[31.250949,121.411622],[31.250772,121.410409],[31.250648,121.4089],[31.250679,121.405271],[31.250756,121.403232],[31.251158,121.401238],[31.251227,121.400735],[31.254021,121.390009],[31.25443,121.388419],[31.254885,121.386514],[31.255287,121.383918],[31.255704,121.380801],[31.256514,121.372438],[31.25744,121.363149],[31.257579,121.362781],[31.258127,121.359134],[31.258212,121.358496],[31.258181,121.358173],[31.258073,121.357876],[31.257965,121.357661],[31.257749,121.357553],[31.257548,121.357481],[31.257201,121.357499],[31.256738,121.357625],[31.256321,121.357831],[31.255842,121.35793],[31.254855,121.357903],[31.253357,121.357113],[31.251783,121.356412],[31.248734,121.355137],[31.248426,121.355047],[31.243061,121.353897],[31.241657,121.353744],[31.239426,121.353789],[31.236616,121.354023],[31.236184,121.35387],[31.232872,121.354095],[31.232278,121.35413],[31.231792,121.354041],[31.231251,121.35387],[31.230719,121.353538],[31.230387,121.353115],[31.230109,121.352487],[31.229993,121.351966],[31.229908,121.351373],[31.230016,121.349881],[31.230078,121.348633],[31.230186,121.347402],[31.230232,121.346441],[31.23024,121.344923],[31.230147,121.342264],[31.230101,121.341401],[31.229962,121.339937],[31.230039,121.339704],[31.229885,121.338787],[31.229337,121.335787],[31.229283,121.334565],[31.229198,121.334233],[31.229105,121.33399],[31.228889,121.333766],[31.228657,121.333694],[31.228426,121.33364],[31.227862,121.333775],[31.227191,121.333874],[31.224095,121.333631],[31.223145,121.333667],[31.221269,121.333766],[31.219702,121.333712],[31.217355,121.33382],[31.214483,121.333595],[31.208808,121.333047],[31.208298,121.332895],[31.20809,121.332859],[31.207789,121.332562],[31.207488,121.332005],[31.207279,121.329194],[31.207279,121.328565],[31.207125,121.326561],[31.207032,121.325609],[31.206932,121.325295],[31.206824,121.32507],[31.206646,121.324837],[31.206492,121.324747],[31.206237,121.324612],[31.20599,121.32454],[31.204283,121.324567],[31.204136,121.32454],[31.203997,121.324477],[31.203851,121.324235],[31.203812,121.323983],[31.203804,121.323579],[31.203735,121.323399],[31.203619,121.323256],[31.203449,121.323202],[31.202723,121.323175],[31.202021,121.323031],[31.200677,121.323094],[31.200654,121.323337],[31.199094,121.323399],[31.198638,121.323337],[31.19758,121.323471],[31.196445,121.323525],[31.196291,121.323615],[31.196198,121.32384],[31.196167,121.324046],[31.196159,121.324549],[31.196144,121.324666],[31.196105,121.324792],[31.196013,121.324909],[31.195843,121.325016],[31.194283,121.325052],[31.194067,121.325016],[31.19382,121.324936],[31.193619,121.324783],[31.19348,121.324621],[31.193364,121.324424],[31.19324,121.324136],[31.193186,121.323876],[31.192931,121.319591],[31.192986,121.319276],[31.193047,121.318953],[31.193094,121.318638],[31.193125,121.318495],[31.193101,121.318279],[31.19307,121.318072],[31.192962,121.317758],[31.192708,121.317273],[31.192429,121.316429],[31.19192,121.311075]]],
                            // [[[31.200275,121.325762],[31.197264,121.325942],[31.190537,121.327262],[31.18527,121.328223],[31.180698,121.327451],[31.178813,121.327289],[31.177408,121.327424],[31.174959,121.328547],[31.167721,121.333074],[31.160668,121.33762],[31.153445,121.3423],[31.14646,121.346621],[31.144088,121.348184],[31.137768,121.352918],[31.134816,121.355181],[31.131763,121.357382],[31.128178,121.35996],[31.124916,121.362323],[31.121431,121.364802],[31.119043,121.366599],[31.116036,121.368261],[31.110773,121.370623],[31.107804,121.371872],[31.105292,121.372896],[31.102092,121.373588],[31.099842,121.374082],[31.096457,121.373013],[31.093271,121.370039],[31.086623,121.363518],[31.083329,121.360203],[31.080631,121.35731],[31.078149,121.354643],[31.075419,121.349612],[31.072195,121.343746],[31.069365,121.338796],[31.066411,121.333703],[31.064655,121.330685],[31.06276,121.326786],[31.061299,121.323867],[31.060193,121.321603],[31.059265,121.319761],[31.055916,121.315198],[31.052745,121.310904],[31.050711,121.308092],[31.046179,121.303771],[31.043309,121.301023],[31.040091,121.297744],[31.037291,121.294779],[31.035798,121.293207],[31.031984,121.289111],[31.031071,121.288159],[31.028828,121.285536],[31.025362,121.281502],[31.02349,121.279706],[31.020852,121.277289],[31.017563,121.274433],[31.015428,121.272663],[31.012859,121.270381],[31.01012,121.267884],[31.006445,121.264507],[31.005106,121.263213],[31.003984,121.262099],[31.002537,121.260356],[31.00119,121.258802],[31.000099,121.257356],[30.99849,121.255326],[30.995812,121.251364],[30.993823,121.247493],[30.992012,121.243971],[30.990588,121.241258],[30.988514,121.237054],[30.987632,121.235312],[30.985937,121.231826],[30.984396,121.228682],[30.983088,121.225951],[30.980542,121.221379],[30.979876,121.220229],[30.977144,121.215863],[30.973885,121.211354],[30.970626,121.207788],[30.965896,121.203386],[30.962467,121.200385],[30.959595,121.197906],[30.957001,121.195723],[30.953045,121.192364],[30.951001,121.190558],[30.949112,121.188878],[30.947478,121.187216],[30.946363,121.186138],[30.943986,121.183479],[30.942228,121.181521],[30.940858,121.179689],[30.939317,121.17764],[30.9379,121.175511],[30.936204,121.172754],[30.934516,121.169924],[30.933098,121.166915],[30.927794,121.154419],[30.92602,121.149973],[30.924293,121.145697],[30.922303,121.140765],[30.92049,121.136157],[30.918996,121.132465],[30.917114,121.127937],[30.915611,121.124317],[30.913295,121.11881],[30.91266,121.117283],[30.909732,121.11201],[30.90716,121.107384],[30.90534,121.103952],[30.903256,121.100117],[30.901598,121.097035],[30.900436,121.094924],[30.897322,121.089418],[30.895471,121.086157],[30.892937,121.081701],[30.890419,121.077273],[30.887808,121.072754],[30.885151,121.068137],[30.884167,121.066385],[30.881935,121.061777],[30.880192,121.058184],[30.878224,121.054105],[30.875729,121.048805],[30.873815,121.044736],[30.87077,121.038134],[30.868646,121.033516],[30.866306,121.028459],[30.864097,121.023644],[30.862896,121.021102],[30.860688,121.017302],[30.858394,121.013313],[30.856192,121.010223]]],
                            // [[[31.201635,121.328044],[31.20602,121.327612],[31.211294,121.327361],[31.216506,121.327226],[31.219895,121.327065],[31.221486,121.326238],[31.224713,121.325807],[31.226998,121.324217],[31.229653,121.322241],[31.234671,121.316393],[31.236655,121.314012],[31.238801,121.310976],[31.240414,121.308919],[31.243015,121.306107],[31.245616,121.303754],[31.248318,121.301607],[31.251073,121.29981],[31.254963,121.297852],[31.262965,121.294743],[31.269941,121.292156],[31.273089,121.290755],[31.276114,121.289102],[31.279146,121.287225],[31.28143,121.285446],[31.285249,121.28214],[31.287579,121.27976],[31.289716,121.277227],[31.290588,121.276193],[31.292524,121.273499],[31.292995,121.272834],[31.295132,121.269286],[31.299104,121.261228],[31.299282,121.260895],[31.300454,121.257464],[31.301604,121.253871],[31.302768,121.248544],[31.303756,121.2431],[31.304944,121.236165],[31.30516,121.234171],[31.306378,121.228134],[31.307389,121.223167],[31.308515,121.217516],[31.310034,121.209836],[31.311214,121.203799],[31.312425,121.197601],[31.313243,121.193262],[31.315302,121.185492],[31.316089,121.182491],[31.317485,121.177236],[31.318657,121.172475],[31.319906,121.167319],[31.321002,121.162782],[31.322143,121.15874],[31.323246,121.154832],[31.324642,121.149847],[31.325582,121.14699],[31.326963,121.143415],[31.328744,121.138834],[31.330394,121.134567],[31.331937,121.130686],[31.334319,121.124685],[31.33671,121.118703],[31.338776,121.113483],[31.341197,121.107007],[31.3422,121.104375],[31.343834,121.098221],[31.344613,121.094754],[31.345631,121.087406],[31.346024,121.081055],[31.345839,121.075135],[31.345523,121.071407],[31.345153,121.068406],[31.343842,121.061454],[31.342346,121.055606],[31.340789,121.049542],[31.339694,121.045248],[31.338815,121.041305],[31.338383,121.039203],[31.338105,121.035942],[31.337643,121.030228],[31.337535,121.025485],[31.337805,121.020078],[31.338152,121.016233],[31.339062,121.010825],[31.340018,121.005318],[31.342701,120.9985],[31.344891,120.992877],[31.34745,120.986247],[31.349409,120.981459],[31.35166,120.975971],[31.354397,120.969251],[31.356509,120.963556],[31.356617,120.963233],[31.359454,120.956675]]],
                            // [[[31.156836,121.810173],[31.150532,121.812437],[31.149922,121.812671],[31.149705,121.812823],[31.149358,121.813254],[31.149203,121.813587],[31.149018,121.814198],[31.148894,121.814575],[31.148492,121.814898],[31.148299,121.815141],[31.140835,121.817935],[31.135024,121.820306],[31.130635,121.822103],[31.126385,121.823765],[31.122289,121.825373],[31.11827,121.826765],[31.117582,121.827061],[31.116585,121.82734],[31.115936,121.827439],[31.115132,121.827457],[31.114537,121.827385],[31.113648,121.827124],[31.113006,121.826837],[31.112496,121.82654],[31.111484,121.825786],[31.110061,121.823908],[31.109567,121.822471],[31.108268,121.814826],[31.10673,121.805394],[31.106011,121.801325],[31.105686,121.800112],[31.104233,121.791785],[31.102602,121.782658],[31.101025,121.774591],[31.100616,121.771546],[31.100329,121.768573],[31.100183,121.766417],[31.100121,121.762788],[31.100291,121.757209],[31.10036,121.75649],[31.100731,121.747382],[31.100762,121.744678],[31.100554,121.740348],[31.099618,121.730413],[31.098667,121.720019],[31.098026,121.712069],[31.097956,121.708593],[31.098026,121.70279],[31.098134,121.693447],[31.09815,121.685848],[31.098103,121.683431],[31.097871,121.68088],[31.097655,121.678958],[31.097237,121.675814],[31.09631,121.66922],[31.095606,121.664082],[31.094485,121.656653],[31.093372,121.64917],[31.092351,121.641966],[31.092089,121.640322],[31.091787,121.636369],[31.09171,121.62841],[31.091687,121.619319],[31.091725,121.611764],[31.091625,121.607695],[31.091215,121.603392],[31.090558,121.598739],[31.089421,121.593313],[31.089282,121.592792],[31.087875,121.588229],[31.086143,121.583585],[31.081968,121.574763],[31.079239,121.570065],[31.077368,121.567487],[31.076618,121.566409],[31.073679,121.563013],[31.07262,121.561738],[31.069759,121.557929],[31.068166,121.555108],[31.066789,121.552279],[31.064632,121.546449],[31.061245,121.53734],[31.060727,121.535974],[31.059559,121.531681],[31.058677,121.526848],[31.058058,121.521646],[31.057579,121.512421],[31.057308,121.506124],[31.056922,121.495587],[31.056705,121.48672],[31.056589,121.481789],[31.056527,121.480351],[31.05628,121.476794],[31.055854,121.473596],[31.054918,121.466392],[31.053898,121.458819],[31.053093,121.452971],[31.052065,121.445731],[31.05157,121.442398],[31.05027,121.436379],[31.048669,121.431241],[31.047424,121.427809],[31.045892,121.423462],[31.0444,121.419294],[31.042628,121.414371],[31.041777,121.411272],[31.04088,121.406466],[31.040927,121.40572],[31.040811,121.404283],[31.040803,121.403798],[31.040896,121.403079],[31.041213,121.402055],[31.041615,121.401471],[31.042334,121.400717],[31.044871,121.398453],[31.045405,121.398192],[31.04573,121.39804],[31.048236,121.397231],[31.049056,121.396926],[31.049628,121.396647],[31.050479,121.396018],[31.051802,121.394976],[31.052668,121.394402],[31.054632,121.393386],[31.057672,121.392138],[31.060819,121.390692],[31.061995,121.390135],[31.064725,121.38867],[31.067609,121.387161],[31.070927,121.385445],[31.073733,121.383981],[31.076084,121.38275],[31.077259,121.38214],[31.080878,121.380604],[31.083716,121.379445],[31.086847,121.378133],[31.089058,121.377163],[31.091648,121.37595],[31.092962,121.375196],[31.097593,121.373148],[31.100415,121.37198],[31.102618,121.371055],[31.103715,121.370677],[31.106792,121.369797],[31.111182,121.367587],[31.113679,121.366401],[31.115541,121.365458],[31.11718,121.364802],[31.119901,121.363994],[31.121624,121.3635],[31.122613,121.363078],[31.123487,121.362566],[31.125558,121.36111],[31.129298,121.358379],[31.133239,121.355487],[31.137064,121.352639],[31.140766,121.349908],[31.144521,121.347016],[31.146066,121.345866],[31.150609,121.343117],[31.153321,121.341491],[31.156952,121.339228],[31.159996,121.33735],[31.163426,121.335185],[31.166895,121.332957],[31.167945,121.332167],[31.168818,121.331421],[31.170062,121.330514],[31.172557,121.329014],[31.179709,121.324756],[31.180428,121.324441],[31.18103,121.324307],[31.184042,121.323624],[31.184274,121.323579],[31.184745,121.323588],[31.185494,121.323274],[31.189055,121.321055],[31.189441,121.320767],[31.189626,121.320426],[31.193472,121.318001],[31.193943,121.318037],[31.194553,121.317614],[31.1948,121.317578],[31.195017,121.317641],[31.195148,121.317839],[31.195194,121.318117],[31.195063,121.318414],[31.194661,121.318692],[31.194244,121.318917],[31.193835,121.318944],[31.193426,121.318728],[31.193233,121.318423],[31.192993,121.317848],[31.192715,121.317282],[31.192437,121.316465],[31.191904,121.311039]]],



                    ];       
                    for(var i=0;i<lines.length;i++){
                        var list=lines[i];
                        for(var j=0;j<list.length;j++){
                            var latlngs=list[j];
                            //var color=colors[i%colors.length];
                            //var color='#0091ff';
                            var color='#009ad6';
                            var polyline = L.polyline(latlngs, {color: color,weight:5,opacity:1}).addTo(this.specialLayer_all_line);
                        }
                    }

                    //测试给
                    var linesTest = [
                                        [[[31.147726,121.816531],[31.116254,121.82773]]],[[[31.147726,121.816531],[31.116254,121.82773]]],[[[31.116254,121.82773],[31.109828,121.82437]]],[[[31.109828,121.82437],[31.106617,121.804211]]],[[[31.106617,121.804211],[31.103404,121.784425]]],[[[31.103404,121.784425],[31.100834,121.765387]]],[[[31.100834,121.765387],[31.10212,121.741119]]],[[[31.10212,121.741119],[31.098907,121.712374]]],[[[31.098907,121.712374],[31.097621,121.670563]]],[[[31.097621,121.670563],[31.09248,121.64443]]],[[[31.09248,121.64443],[31.092161,121.621658]]],[[[31.092161,121.621658],[31.090875,121.600004]]],[[[31.090875,121.600004],[31.08702,121.583204]]],[[[31.08702,121.583204],[31.069987,121.557445]]],[[[31.069987,121.557445],[31.060346,121.533181]]],[[[31.060346,121.533181],[31.056812,121.495102]]],[[[31.056812,121.495102],[31.056812,121.481289]]],[[[31.056812,121.481289],[31.053597,121.455156]]],[[[31.053597,121.455156],[31.048132,121.42865]]],[[[31.048132,121.42865],[31.040739,121.400278]]],[[[31.040739,121.400278],[31.045239,121.397291]]],[[[31.045239,121.397291],[31.106617,121.369293]]],[[[31.106617,121.369293],[31.12075,121.362946]]],[[[31.12075,121.362946],[31.171164,121.329348]]],[[[31.171164,121.329348],[31.184323,121.322627]]],[[[31.184323,121.322627],[31.2039,121.310306]]],[[[31.2039,121.310306],[31.201654,121.324119]]],

                    ];

                    //要屏蔽
                    // var getRandomColor = function(){    
                    //   return (function(m,s,c){    
                    //     return (c ? arguments.callee(m,s,c-1) : '#') +    
                    //       s[m.floor(m.random() * 16)]    
                    //   })(Math,'0123456789abcdef',5)    
                    // } 

                    // for(var i=0;i<linesTest.length;i++){
                    //     var list=linesTest[i];
                    //     for(var j=0;j<list.length;j++){
                    //         var latlngs=list[j];
                    //         //var color=colors[i%colors.length];
                    //         //var color='#0091ff';
                    //         var color=getRandomColor();
                    //         var polyline = L.polyline(latlngs, {color: color,weight:5,opacity:1}).addTo(this.specialLayer_all_line);
                    //     }
                    // }





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
                    var colors=["#009ad6","#009ad6","#009ad6","#009ad6"];           
                    var lines=[
                            [[[31.200654,121.323337],[31.199094,121.323399],[31.198638,121.323337],[31.19758,121.323471],[31.196445,121.323525],[31.196291,121.323615],[31.196198,121.32384],[31.196167,121.324046],[31.196159,121.324549],[31.196144,121.324666],[31.196105,121.324792],[31.196013,121.324909],[31.195843,121.325016],[31.194283,121.325052],[31.194067,121.325016],[31.19382,121.324936],[31.193619,121.324783],[31.19348,121.324621],[31.193364,121.324424],[31.19324,121.324136],[31.193186,121.323876],[31.192931,121.319591],[31.192986,121.319276],[31.193047,121.318953],[31.193094,121.318638],[31.193125,121.318495],[31.193101,121.318279],[31.19307,121.318072],[31.192962,121.317758],[31.192708,121.317273],[31.192429,121.316429],[31.19192,121.311075]]],
                            [[[31.199766,121.333074],[31.199758,121.332823],[31.199696,121.331637],[31.199619,121.329948],[31.199403,121.329661],[31.199187,121.329598],[31.194376,121.329885],[31.194159,121.329894],[31.193982,121.329876],[31.193835,121.329867],[31.193634,121.329759],[31.19348,121.32967],[31.193379,121.329544],[31.193271,121.329364],[31.193186,121.329113],[31.193101,121.328098],[31.193132,121.327109],[31.193209,121.326544],[31.193256,121.326274],[31.193302,121.32578],[31.193302,121.325484],[31.193202,121.324244],[31.193186,121.323876],[31.192931,121.319591],[31.192986,121.319276],[31.193047,121.318953],[31.193094,121.318638],[31.193125,121.318495],[31.193101,121.318279],[31.19307,121.318072],[31.192962,121.317758],[31.192708,121.317273],[31.192429,121.316429],[31.19192,121.311075]]],
                            [[[31.200275,121.325762],[31.197264,121.325942],[31.190537,121.327262],[31.18527,121.328223],[31.180698,121.327451],[31.178813,121.327289],[31.177408,121.327424],[31.174959,121.328547],[31.167721,121.333074],[31.160668,121.33762],[31.153445,121.3423],[31.14646,121.346621],[31.144088,121.348184],[31.137768,121.352918],[31.134816,121.355181],[31.131763,121.357382],[31.128178,121.35996],[31.124916,121.362323],[31.121431,121.364802],[31.119043,121.366599],[31.116036,121.368261],[31.110773,121.370623],[31.107804,121.371872],[31.105292,121.372896],[31.102092,121.373588],[31.099842,121.374082],[31.096457,121.373013],[31.093271,121.370039],[31.086623,121.363518],[31.083329,121.360203],[31.080631,121.35731],[31.078149,121.354643],[31.075419,121.349612],[31.072195,121.343746],[31.069365,121.338796],[31.066411,121.333703],[31.064655,121.330685],[31.06276,121.326786],[31.061299,121.323867],[31.060193,121.321603],[31.059265,121.319761],[31.055916,121.315198],[31.052745,121.310904],[31.050711,121.308092],[31.046179,121.303771],[31.043309,121.301023],[31.040091,121.297744],[31.037291,121.294779],[31.035798,121.293207],[31.031984,121.289111],[31.031071,121.288159],[31.028828,121.285536],[31.025362,121.281502],[31.02349,121.279706],[31.020852,121.277289],[31.017563,121.274433],[31.015428,121.272663],[31.012859,121.270381],[31.01012,121.267884],[31.006445,121.264507],[31.005106,121.263213],[31.003984,121.262099],[31.002537,121.260356],[31.00119,121.258802],[31.000099,121.257356],[30.99849,121.255326],[30.995812,121.251364],[30.993823,121.247493],[30.992012,121.243971],[30.990588,121.241258],[30.988514,121.237054],[30.987632,121.235312],[30.985937,121.231826],[30.984396,121.228682],[30.983088,121.225951],[30.980542,121.221379],[30.979876,121.220229],[30.977144,121.215863],[30.973885,121.211354],[30.970626,121.207788],[30.965896,121.203386],[30.962467,121.200385],[30.959595,121.197906],[30.957001,121.195723],[30.953045,121.192364],[30.951001,121.190558],[30.949112,121.188878],[30.947478,121.187216],[30.946363,121.186138],[30.943986,121.183479],[30.942228,121.181521],[30.940858,121.179689],[30.939317,121.17764],[30.9379,121.175511],[30.936204,121.172754],[30.934516,121.169924],[30.933098,121.166915],[30.927794,121.154419],[30.92602,121.149973],[30.924293,121.145697],[30.922303,121.140765],[30.92049,121.136157],[30.918996,121.132465],[30.917114,121.127937],[30.915611,121.124317],[30.913295,121.11881],[30.91266,121.117283],[30.909732,121.11201],[30.90716,121.107384],[30.90534,121.103952],[30.903256,121.100117],[30.901598,121.097035],[30.900436,121.094924],[30.897322,121.089418],[30.895471,121.086157],[30.892937,121.081701],[30.890419,121.077273],[30.887808,121.072754],[30.885151,121.068137],[30.884167,121.066385],[30.881935,121.061777],[30.880192,121.058184],[30.878224,121.054105],[30.875729,121.048805],[30.873815,121.044736],[30.87077,121.038134],[30.868646,121.033516],[30.866306,121.028459],[30.864097,121.023644],[30.862896,121.021102],[30.860688,121.017302],[30.858394,121.013313],[30.856192,121.010223]]],
                            [[[31.201635,121.328044],[31.20602,121.327612],[31.211294,121.327361],[31.216506,121.327226],[31.219895,121.327065],[31.221486,121.326238],[31.224713,121.325807],[31.226998,121.324217],[31.229653,121.322241],[31.234671,121.316393],[31.236655,121.314012],[31.238801,121.310976],[31.240414,121.308919],[31.243015,121.306107],[31.245616,121.303754],[31.248318,121.301607],[31.251073,121.29981],[31.254963,121.297852],[31.262965,121.294743],[31.269941,121.292156],[31.273089,121.290755],[31.276114,121.289102],[31.279146,121.287225],[31.28143,121.285446],[31.285249,121.28214],[31.287579,121.27976],[31.289716,121.277227],[31.290588,121.276193],[31.292524,121.273499],[31.292995,121.272834],[31.295132,121.269286],[31.299104,121.261228],[31.299282,121.260895],[31.300454,121.257464],[31.301604,121.253871],[31.302768,121.248544],[31.303756,121.2431],[31.304944,121.236165],[31.30516,121.234171],[31.306378,121.228134],[31.307389,121.223167],[31.308515,121.217516],[31.310034,121.209836],[31.311214,121.203799],[31.312425,121.197601],[31.313243,121.193262],[31.315302,121.185492],[31.316089,121.182491],[31.317485,121.177236],[31.318657,121.172475],[31.319906,121.167319],[31.321002,121.162782],[31.322143,121.15874],[31.323246,121.154832],[31.324642,121.149847],[31.325582,121.14699],[31.326963,121.143415],[31.328744,121.138834],[31.330394,121.134567],[31.331937,121.130686],[31.334319,121.124685],[31.33671,121.118703],[31.338776,121.113483],[31.341197,121.107007],[31.3422,121.104375],[31.343834,121.098221],[31.344613,121.094754],[31.345631,121.087406],[31.346024,121.081055],[31.345839,121.075135],[31.345523,121.071407],[31.345153,121.068406],[31.343842,121.061454],[31.342346,121.055606],[31.340789,121.049542],[31.339694,121.045248],[31.338815,121.041305],[31.338383,121.039203],[31.338105,121.035942],[31.337643,121.030228],[31.337535,121.025485],[31.337805,121.020078],[31.338152,121.016233],[31.339062,121.010825],[31.340018,121.005318],[31.342701,120.9985],[31.344891,120.992877],[31.34745,120.986247],[31.349409,120.981459],[31.35166,120.975971],[31.354397,120.969251],[31.356509,120.963556],[31.356617,120.963233],[31.359454,120.956675]]],
                            [[[31.156836,121.810173],[31.150532,121.812437],[31.149922,121.812671],[31.149705,121.812823],[31.149358,121.813254],[31.149203,121.813587],[31.149018,121.814198],[31.148894,121.814575],[31.148492,121.814898],[31.148299,121.815141],[31.140835,121.817935],[31.135024,121.820306],[31.130635,121.822103],[31.126385,121.823765],[31.122289,121.825373],[31.11827,121.826765],[31.117582,121.827061],[31.116585,121.82734],[31.115936,121.827439],[31.115132,121.827457],[31.114537,121.827385],[31.113648,121.827124],[31.113006,121.826837],[31.112496,121.82654],[31.111484,121.825786],[31.110061,121.823908],[31.109567,121.822471],[31.108268,121.814826],[31.10673,121.805394],[31.106011,121.801325],[31.105686,121.800112],[31.104233,121.791785],[31.102602,121.782658],[31.101025,121.774591],[31.100616,121.771546],[31.100329,121.768573],[31.100183,121.766417],[31.100121,121.762788],[31.100291,121.757209],[31.10036,121.75649],[31.100731,121.747382],[31.100762,121.744678],[31.100554,121.740348],[31.099618,121.730413],[31.098667,121.720019],[31.098026,121.712069],[31.097956,121.708593],[31.098026,121.70279],[31.098134,121.693447],[31.09815,121.685848],[31.098103,121.683431],[31.097871,121.68088],[31.097655,121.678958],[31.097237,121.675814],[31.09631,121.66922],[31.095606,121.664082],[31.094485,121.656653],[31.093372,121.64917],[31.092351,121.641966],[31.092089,121.640322],[31.091787,121.636369],[31.09171,121.62841],[31.091687,121.619319],[31.091725,121.611764],[31.091625,121.607695],[31.091215,121.603392],[31.090558,121.598739],[31.089421,121.593313],[31.089282,121.592792],[31.087875,121.588229],[31.086143,121.583585],[31.081968,121.574763],[31.079239,121.570065],[31.077368,121.567487],[31.076618,121.566409],[31.073679,121.563013],[31.07262,121.561738],[31.069759,121.557929],[31.068166,121.555108],[31.066789,121.552279],[31.064632,121.546449],[31.061245,121.53734],[31.060727,121.535974],[31.059559,121.531681],[31.058677,121.526848],[31.058058,121.521646],[31.057579,121.512421],[31.057308,121.506124],[31.056922,121.495587],[31.056705,121.48672],[31.056589,121.481789],[31.056527,121.480351],[31.05628,121.476794],[31.055854,121.473596],[31.054918,121.466392],[31.053898,121.458819],[31.053093,121.452971],[31.052065,121.445731],[31.05157,121.442398],[31.05027,121.436379],[31.048669,121.431241],[31.047424,121.427809],[31.045892,121.423462],[31.0444,121.419294],[31.042628,121.414371],[31.041777,121.411272],[31.04088,121.406466],[31.040927,121.40572],[31.040811,121.404283],[31.040803,121.403798],[31.040896,121.403079],[31.041213,121.402055],[31.041615,121.401471],[31.042334,121.400717],[31.044871,121.398453],[31.045405,121.398192],[31.04573,121.39804],[31.048236,121.397231],[31.049056,121.396926],[31.049628,121.396647],[31.050479,121.396018],[31.051802,121.394976],[31.052668,121.394402],[31.054632,121.393386],[31.057672,121.392138],[31.060819,121.390692],[31.061995,121.390135],[31.064725,121.38867],[31.067609,121.387161],[31.070927,121.385445],[31.073733,121.383981],[31.076084,121.38275],[31.077259,121.38214],[31.080878,121.380604],[31.083716,121.379445],[31.086847,121.378133],[31.089058,121.377163],[31.091648,121.37595],[31.092962,121.375196],[31.097593,121.373148],[31.100415,121.37198],[31.102618,121.371055],[31.103715,121.370677],[31.106792,121.369797],[31.111182,121.367587],[31.113679,121.366401],[31.115541,121.365458],[31.11718,121.364802],[31.119901,121.363994],[31.121624,121.3635],[31.122613,121.363078],[31.123487,121.362566],[31.125558,121.36111],[31.129298,121.358379],[31.133239,121.355487],[31.137064,121.352639],[31.140766,121.349908],[31.144521,121.347016],[31.146066,121.345866],[31.150609,121.343117],[31.153321,121.341491],[31.156952,121.339228],[31.159996,121.33735],[31.163426,121.335185],[31.166895,121.332957],[31.167945,121.332167],[31.168818,121.331421],[31.170062,121.330514],[31.172557,121.329014],[31.179709,121.324756],[31.180428,121.324441],[31.18103,121.324307],[31.184042,121.323624],[31.184274,121.323579],[31.184745,121.323588],[31.185494,121.323274],[31.189055,121.321055],[31.189441,121.320767],[31.189626,121.320426],[31.193472,121.318001],[31.193943,121.318037],[31.194553,121.317614],[31.1948,121.317578],[31.195017,121.317641],[31.195148,121.317839],[31.195194,121.318117],[31.195063,121.318414],[31.194661,121.318692],[31.194244,121.318917],[31.193835,121.318944],[31.193426,121.318728],[31.193233,121.318423],[31.192993,121.317848],[31.192715,121.317282],[31.192437,121.316465],[31.191904,121.311039]]],
                            [[[31.253828,121.460867],[31.254307,121.459807],[31.254091,121.45961],[31.253813,121.45908],[31.255063,121.458271],[31.255457,121.458091],[31.256043,121.457867],[31.256336,121.457777],[31.256792,121.457768],[31.257046,121.457768],[31.261692,121.458478],[31.261924,121.458298],[31.262495,121.457624],[31.262819,121.457346],[31.263945,121.456591],[31.264555,121.456241],[31.264347,121.455181],[31.264069,121.453878],[31.263652,121.451722],[31.263297,121.45042],[31.262981,121.449486],[31.260604,121.44344],[31.260303,121.44291],[31.260048,121.442569],[31.259693,121.442146],[31.258976,121.441518],[31.257278,121.440008],[31.256167,121.438832],[31.25504,121.437556],[31.253535,121.436002],[31.253002,121.435283],[31.252478,121.434376],[31.251567,121.432238],[31.249962,121.429417],[31.24895,121.427432],[31.248148,121.425986],[31.24797,121.42577],[31.250023,121.423093],[31.250556,121.422159],[31.251104,121.420911],[31.251497,121.419536],[31.251752,121.418269],[31.251783,121.417695],[31.251783,121.415386],[31.251335,121.413571],[31.250949,121.411622],[31.250772,121.410409],[31.250648,121.4089],[31.250679,121.405271],[31.250756,121.403232],[31.251158,121.401238],[31.251227,121.400735],[31.254021,121.390009],[31.25443,121.388419],[31.254885,121.386514],[31.255287,121.383918],[31.255704,121.380801],[31.256514,121.372438],[31.25744,121.363149],[31.257579,121.362781],[31.258127,121.359134],[31.258212,121.358496],[31.258181,121.358173],[31.258073,121.357876],[31.257965,121.357661],[31.257749,121.357553],[31.257548,121.357481],[31.257201,121.357499],[31.256738,121.357625],[31.256321,121.357831],[31.255842,121.35793],[31.254855,121.357903],[31.253357,121.357113],[31.251783,121.356412],[31.248734,121.355137],[31.248426,121.355047],[31.243061,121.353897],[31.241657,121.353744],[31.239426,121.353789],[31.236616,121.354023],[31.236184,121.35387],[31.232872,121.354095],[31.232278,121.35413],[31.231792,121.354041],[31.231251,121.35387],[31.230719,121.353538],[31.230387,121.353115],[31.230109,121.352487],[31.229993,121.351966],[31.229908,121.351373],[31.230016,121.349881],[31.230078,121.348633],[31.230186,121.347402],[31.230232,121.346441],[31.23024,121.344923],[31.230147,121.342264],[31.230101,121.341401],[31.229962,121.339937],[31.230039,121.339704],[31.229885,121.338787],[31.229337,121.335787],[31.229283,121.334565],[31.229198,121.334233],[31.229105,121.33399],[31.228889,121.333766],[31.228657,121.333694],[31.228426,121.33364],[31.227862,121.333775],[31.227191,121.333874],[31.224095,121.333631],[31.223145,121.333667],[31.221269,121.333766],[31.219702,121.333712],[31.217355,121.33382],[31.214483,121.333595],[31.208808,121.333047],[31.208298,121.332895],[31.20809,121.332859],[31.207789,121.332562],[31.207488,121.332005],[31.207279,121.329194],[31.207279,121.328565],[31.207125,121.326561],[31.207032,121.325609],[31.206932,121.325295],[31.206824,121.32507],[31.206646,121.324837],[31.206492,121.324747],[31.206237,121.324612],[31.20599,121.32454],[31.204283,121.324567],[31.204136,121.32454],[31.203997,121.324477],[31.203851,121.324235],[31.203812,121.323983],[31.203804,121.323579],[31.203735,121.323399],[31.203619,121.323256],[31.203449,121.323202],[31.202723,121.323175],[31.202021,121.323031],[31.200677,121.323094],[31.200654,121.323337],[31.199094,121.323399],[31.198638,121.323337],[31.19758,121.323471],[31.196445,121.323525],[31.196291,121.323615],[31.196198,121.32384],[31.196167,121.324046],[31.196159,121.324549],[31.196144,121.324666],[31.196105,121.324792],[31.196013,121.324909],[31.195843,121.325016],[31.194283,121.325052],[31.194067,121.325016],[31.19382,121.324936],[31.193619,121.324783],[31.19348,121.324621],[31.193364,121.324424],[31.19324,121.324136],[31.193186,121.323876],[31.192931,121.319591],[31.192986,121.319276],[31.193047,121.318953],[31.193094,121.318638],[31.193125,121.318495],[31.193101,121.318279],[31.19307,121.318072],[31.192962,121.317758],[31.192708,121.317273],[31.192429,121.316429],[31.19192,121.311075]]],
                            [[[31.160908,121.432526],[31.160437,121.432076],[31.160166,121.431942],[31.15397,121.425546],[31.148902,121.420309],[31.148801,121.420075],[31.148593,121.419734],[31.148516,121.419491],[31.148492,121.419078],[31.148554,121.418755],[31.148693,121.418377],[31.148871,121.418117],[31.149095,121.417892],[31.150099,121.417147],[31.150239,121.417012],[31.152093,121.416149],[31.152294,121.415916],[31.16073,121.41235],[31.163936,121.410993],[31.164716,121.410796],[31.168023,121.409412],[31.174851,121.405325],[31.175569,121.404948],[31.176635,121.404552],[31.17679,121.404481],[31.177554,121.404229],[31.186367,121.401795],[31.186568,121.401741],[31.192514,121.399603],[31.193109,121.39936],[31.194051,121.398956],[31.19575,121.398031],[31.197712,121.396764],[31.199272,121.395695],[31.20036,121.395066],[31.199681,121.39388],[31.19958,121.393539],[31.197835,121.390593],[31.197573,121.390197],[31.196468,121.387664],[31.19497,121.383065],[31.192074,121.373678],[31.190877,121.369527],[31.190167,121.367416],[31.189387,121.365781],[31.188529,121.364371],[31.187888,121.363509],[31.187031,121.362503],[31.184459,121.359969],[31.181463,121.357185],[31.180706,121.356376],[31.179261,121.354517],[31.177686,121.351903],[31.176774,121.350214],[31.176056,121.348498],[31.175129,121.345884],[31.174055,121.342479],[31.173669,121.341285],[31.172147,121.337359],[31.172178,121.337036],[31.171576,121.335149],[31.170572,121.332634],[31.170324,121.33152],[31.170294,121.331143],[31.17034,121.330792],[31.170433,121.330559],[31.171815,121.329661],[31.172557,121.329014],[31.179709,121.324756],[31.180428,121.324441],[31.18103,121.324307],[31.184042,121.323624],[31.184274,121.323579],[31.184745,121.323588],[31.185494,121.323274],[31.189055,121.321055],[31.189441,121.320767],[31.189626,121.320426],[31.193472,121.318001],[31.193943,121.318037],[31.194553,121.317614],[31.1948,121.317578],[31.195017,121.317641],[31.195148,121.317839],[31.195194,121.318117],[31.195063,121.318414],[31.194661,121.318692],[31.194244,121.318917],[31.193835,121.318944],[31.193426,121.318728],[31.193233,121.318423],[31.192993,121.317848],[31.192715,121.317282],[31.192437,121.316465],[31.191904,121.311039]]],
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
                    var flag5 = $('div.mapCtrlItem[func="虹桥站线路"]').eq(0).hasClass('mapCtrlItemSelected');
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
                    var colors=["#009ad6","#009ad6","#009ad6","#009ad6"];           
                    var lines=[
                            [[[31.200654,121.323337],[31.199094,121.323399],[31.198638,121.323337],[31.19758,121.323471],[31.196445,121.323525],[31.196291,121.323615],[31.196198,121.32384],[31.196167,121.324046],[31.196159,121.324549],[31.196144,121.324666],[31.196105,121.324792],[31.196013,121.324909],[31.195843,121.325016],[31.194283,121.325052],[31.194067,121.325016],[31.19382,121.324936],[31.193619,121.324783],[31.19348,121.324621],[31.193364,121.324424],[31.19324,121.324136],[31.193186,121.323876],[31.192931,121.319591],[31.192986,121.319276],[31.193047,121.318953],[31.193094,121.318638],[31.193125,121.318495],[31.193101,121.318279],[31.19307,121.318072],[31.192962,121.317758],[31.192708,121.317273],[31.192429,121.316429],[31.19192,121.311075]]],
                            [[[31.199766,121.333074],[31.199758,121.332823],[31.199696,121.331637],[31.199619,121.329948],[31.199403,121.329661],[31.199187,121.329598],[31.194376,121.329885],[31.194159,121.329894],[31.193982,121.329876],[31.193835,121.329867],[31.193634,121.329759],[31.19348,121.32967],[31.193379,121.329544],[31.193271,121.329364],[31.193186,121.329113],[31.193101,121.328098],[31.193132,121.327109],[31.193209,121.326544],[31.193256,121.326274],[31.193302,121.32578],[31.193302,121.325484],[31.193202,121.324244],[31.193186,121.323876],[31.192931,121.319591],[31.192986,121.319276],[31.193047,121.318953],[31.193094,121.318638],[31.193125,121.318495],[31.193101,121.318279],[31.19307,121.318072],[31.192962,121.317758],[31.192708,121.317273],[31.192429,121.316429],[31.19192,121.311075]]],
                            [[[31.200275,121.325762],[31.197264,121.325942],[31.190537,121.327262],[31.18527,121.328223],[31.180698,121.327451],[31.178813,121.327289],[31.177408,121.327424],[31.174959,121.328547],[31.167721,121.333074],[31.160668,121.33762],[31.153445,121.3423],[31.14646,121.346621],[31.144088,121.348184],[31.137768,121.352918],[31.134816,121.355181],[31.131763,121.357382],[31.128178,121.35996],[31.124916,121.362323],[31.121431,121.364802],[31.119043,121.366599],[31.116036,121.368261],[31.110773,121.370623],[31.107804,121.371872],[31.105292,121.372896],[31.102092,121.373588],[31.099842,121.374082],[31.096457,121.373013],[31.093271,121.370039],[31.086623,121.363518],[31.083329,121.360203],[31.080631,121.35731],[31.078149,121.354643],[31.075419,121.349612],[31.072195,121.343746],[31.069365,121.338796],[31.066411,121.333703],[31.064655,121.330685],[31.06276,121.326786],[31.061299,121.323867],[31.060193,121.321603],[31.059265,121.319761],[31.055916,121.315198],[31.052745,121.310904],[31.050711,121.308092],[31.046179,121.303771],[31.043309,121.301023],[31.040091,121.297744],[31.037291,121.294779],[31.035798,121.293207],[31.031984,121.289111],[31.031071,121.288159],[31.028828,121.285536],[31.025362,121.281502],[31.02349,121.279706],[31.020852,121.277289],[31.017563,121.274433],[31.015428,121.272663],[31.012859,121.270381],[31.01012,121.267884],[31.006445,121.264507],[31.005106,121.263213],[31.003984,121.262099],[31.002537,121.260356],[31.00119,121.258802],[31.000099,121.257356],[30.99849,121.255326],[30.995812,121.251364],[30.993823,121.247493],[30.992012,121.243971],[30.990588,121.241258],[30.988514,121.237054],[30.987632,121.235312],[30.985937,121.231826],[30.984396,121.228682],[30.983088,121.225951],[30.980542,121.221379],[30.979876,121.220229],[30.977144,121.215863],[30.973885,121.211354],[30.970626,121.207788],[30.965896,121.203386],[30.962467,121.200385],[30.959595,121.197906],[30.957001,121.195723],[30.953045,121.192364],[30.951001,121.190558],[30.949112,121.188878],[30.947478,121.187216],[30.946363,121.186138],[30.943986,121.183479],[30.942228,121.181521],[30.940858,121.179689],[30.939317,121.17764],[30.9379,121.175511],[30.936204,121.172754],[30.934516,121.169924],[30.933098,121.166915],[30.927794,121.154419],[30.92602,121.149973],[30.924293,121.145697],[30.922303,121.140765],[30.92049,121.136157],[30.918996,121.132465],[30.917114,121.127937],[30.915611,121.124317],[30.913295,121.11881],[30.91266,121.117283],[30.909732,121.11201],[30.90716,121.107384],[30.90534,121.103952],[30.903256,121.100117],[30.901598,121.097035],[30.900436,121.094924],[30.897322,121.089418],[30.895471,121.086157],[30.892937,121.081701],[30.890419,121.077273],[30.887808,121.072754],[30.885151,121.068137],[30.884167,121.066385],[30.881935,121.061777],[30.880192,121.058184],[30.878224,121.054105],[30.875729,121.048805],[30.873815,121.044736],[30.87077,121.038134],[30.868646,121.033516],[30.866306,121.028459],[30.864097,121.023644],[30.862896,121.021102],[30.860688,121.017302],[30.858394,121.013313],[30.856192,121.010223]]],
                            [[[31.201635,121.328044],[31.20602,121.327612],[31.211294,121.327361],[31.216506,121.327226],[31.219895,121.327065],[31.221486,121.326238],[31.224713,121.325807],[31.226998,121.324217],[31.229653,121.322241],[31.234671,121.316393],[31.236655,121.314012],[31.238801,121.310976],[31.240414,121.308919],[31.243015,121.306107],[31.245616,121.303754],[31.248318,121.301607],[31.251073,121.29981],[31.254963,121.297852],[31.262965,121.294743],[31.269941,121.292156],[31.273089,121.290755],[31.276114,121.289102],[31.279146,121.287225],[31.28143,121.285446],[31.285249,121.28214],[31.287579,121.27976],[31.289716,121.277227],[31.290588,121.276193],[31.292524,121.273499],[31.292995,121.272834],[31.295132,121.269286],[31.299104,121.261228],[31.299282,121.260895],[31.300454,121.257464],[31.301604,121.253871],[31.302768,121.248544],[31.303756,121.2431],[31.304944,121.236165],[31.30516,121.234171],[31.306378,121.228134],[31.307389,121.223167],[31.308515,121.217516],[31.310034,121.209836],[31.311214,121.203799],[31.312425,121.197601],[31.313243,121.193262],[31.315302,121.185492],[31.316089,121.182491],[31.317485,121.177236],[31.318657,121.172475],[31.319906,121.167319],[31.321002,121.162782],[31.322143,121.15874],[31.323246,121.154832],[31.324642,121.149847],[31.325582,121.14699],[31.326963,121.143415],[31.328744,121.138834],[31.330394,121.134567],[31.331937,121.130686],[31.334319,121.124685],[31.33671,121.118703],[31.338776,121.113483],[31.341197,121.107007],[31.3422,121.104375],[31.343834,121.098221],[31.344613,121.094754],[31.345631,121.087406],[31.346024,121.081055],[31.345839,121.075135],[31.345523,121.071407],[31.345153,121.068406],[31.343842,121.061454],[31.342346,121.055606],[31.340789,121.049542],[31.339694,121.045248],[31.338815,121.041305],[31.338383,121.039203],[31.338105,121.035942],[31.337643,121.030228],[31.337535,121.025485],[31.337805,121.020078],[31.338152,121.016233],[31.339062,121.010825],[31.340018,121.005318],[31.342701,120.9985],[31.344891,120.992877],[31.34745,120.986247],[31.349409,120.981459],[31.35166,120.975971],[31.354397,120.969251],[31.356509,120.963556],[31.356617,120.963233],[31.359454,120.956675]]],
                            [[[31.156836,121.810173],[31.150532,121.812437],[31.149922,121.812671],[31.149705,121.812823],[31.149358,121.813254],[31.149203,121.813587],[31.149018,121.814198],[31.148894,121.814575],[31.148492,121.814898],[31.148299,121.815141],[31.140835,121.817935],[31.135024,121.820306],[31.130635,121.822103],[31.126385,121.823765],[31.122289,121.825373],[31.11827,121.826765],[31.117582,121.827061],[31.116585,121.82734],[31.115936,121.827439],[31.115132,121.827457],[31.114537,121.827385],[31.113648,121.827124],[31.113006,121.826837],[31.112496,121.82654],[31.111484,121.825786],[31.110061,121.823908],[31.109567,121.822471],[31.108268,121.814826],[31.10673,121.805394],[31.106011,121.801325],[31.105686,121.800112],[31.104233,121.791785],[31.102602,121.782658],[31.101025,121.774591],[31.100616,121.771546],[31.100329,121.768573],[31.100183,121.766417],[31.100121,121.762788],[31.100291,121.757209],[31.10036,121.75649],[31.100731,121.747382],[31.100762,121.744678],[31.100554,121.740348],[31.099618,121.730413],[31.098667,121.720019],[31.098026,121.712069],[31.097956,121.708593],[31.098026,121.70279],[31.098134,121.693447],[31.09815,121.685848],[31.098103,121.683431],[31.097871,121.68088],[31.097655,121.678958],[31.097237,121.675814],[31.09631,121.66922],[31.095606,121.664082],[31.094485,121.656653],[31.093372,121.64917],[31.092351,121.641966],[31.092089,121.640322],[31.091787,121.636369],[31.09171,121.62841],[31.091687,121.619319],[31.091725,121.611764],[31.091625,121.607695],[31.091215,121.603392],[31.090558,121.598739],[31.089421,121.593313],[31.089282,121.592792],[31.087875,121.588229],[31.086143,121.583585],[31.081968,121.574763],[31.079239,121.570065],[31.077368,121.567487],[31.076618,121.566409],[31.073679,121.563013],[31.07262,121.561738],[31.069759,121.557929],[31.068166,121.555108],[31.066789,121.552279],[31.064632,121.546449],[31.061245,121.53734],[31.060727,121.535974],[31.059559,121.531681],[31.058677,121.526848],[31.058058,121.521646],[31.057579,121.512421],[31.057308,121.506124],[31.056922,121.495587],[31.056705,121.48672],[31.056589,121.481789],[31.056527,121.480351],[31.05628,121.476794],[31.055854,121.473596],[31.054918,121.466392],[31.053898,121.458819],[31.053093,121.452971],[31.052065,121.445731],[31.05157,121.442398],[31.05027,121.436379],[31.048669,121.431241],[31.047424,121.427809],[31.045892,121.423462],[31.0444,121.419294],[31.042628,121.414371],[31.041777,121.411272],[31.04088,121.406466],[31.040927,121.40572],[31.040811,121.404283],[31.040803,121.403798],[31.040896,121.403079],[31.041213,121.402055],[31.041615,121.401471],[31.042334,121.400717],[31.044871,121.398453],[31.045405,121.398192],[31.04573,121.39804],[31.048236,121.397231],[31.049056,121.396926],[31.049628,121.396647],[31.050479,121.396018],[31.051802,121.394976],[31.052668,121.394402],[31.054632,121.393386],[31.057672,121.392138],[31.060819,121.390692],[31.061995,121.390135],[31.064725,121.38867],[31.067609,121.387161],[31.070927,121.385445],[31.073733,121.383981],[31.076084,121.38275],[31.077259,121.38214],[31.080878,121.380604],[31.083716,121.379445],[31.086847,121.378133],[31.089058,121.377163],[31.091648,121.37595],[31.092962,121.375196],[31.097593,121.373148],[31.100415,121.37198],[31.102618,121.371055],[31.103715,121.370677],[31.106792,121.369797],[31.111182,121.367587],[31.113679,121.366401],[31.115541,121.365458],[31.11718,121.364802],[31.119901,121.363994],[31.121624,121.3635],[31.122613,121.363078],[31.123487,121.362566],[31.125558,121.36111],[31.129298,121.358379],[31.133239,121.355487],[31.137064,121.352639],[31.140766,121.349908],[31.144521,121.347016],[31.146066,121.345866],[31.150609,121.343117],[31.153321,121.341491],[31.156952,121.339228],[31.159996,121.33735],[31.163426,121.335185],[31.166895,121.332957],[31.167945,121.332167],[31.168818,121.331421],[31.170062,121.330514],[31.172557,121.329014],[31.179709,121.324756],[31.180428,121.324441],[31.18103,121.324307],[31.184042,121.323624],[31.184274,121.323579],[31.184745,121.323588],[31.185494,121.323274],[31.189055,121.321055],[31.189441,121.320767],[31.189626,121.320426],[31.193472,121.318001],[31.193943,121.318037],[31.194553,121.317614],[31.1948,121.317578],[31.195017,121.317641],[31.195148,121.317839],[31.195194,121.318117],[31.195063,121.318414],[31.194661,121.318692],[31.194244,121.318917],[31.193835,121.318944],[31.193426,121.318728],[31.193233,121.318423],[31.192993,121.317848],[31.192715,121.317282],[31.192437,121.316465],[31.191904,121.311039]]],
                            [[[31.253828,121.460867],[31.254307,121.459807],[31.254091,121.45961],[31.253813,121.45908],[31.255063,121.458271],[31.255457,121.458091],[31.256043,121.457867],[31.256336,121.457777],[31.256792,121.457768],[31.257046,121.457768],[31.261692,121.458478],[31.261924,121.458298],[31.262495,121.457624],[31.262819,121.457346],[31.263945,121.456591],[31.264555,121.456241],[31.264347,121.455181],[31.264069,121.453878],[31.263652,121.451722],[31.263297,121.45042],[31.262981,121.449486],[31.260604,121.44344],[31.260303,121.44291],[31.260048,121.442569],[31.259693,121.442146],[31.258976,121.441518],[31.257278,121.440008],[31.256167,121.438832],[31.25504,121.437556],[31.253535,121.436002],[31.253002,121.435283],[31.252478,121.434376],[31.251567,121.432238],[31.249962,121.429417],[31.24895,121.427432],[31.248148,121.425986],[31.24797,121.42577],[31.250023,121.423093],[31.250556,121.422159],[31.251104,121.420911],[31.251497,121.419536],[31.251752,121.418269],[31.251783,121.417695],[31.251783,121.415386],[31.251335,121.413571],[31.250949,121.411622],[31.250772,121.410409],[31.250648,121.4089],[31.250679,121.405271],[31.250756,121.403232],[31.251158,121.401238],[31.251227,121.400735],[31.254021,121.390009],[31.25443,121.388419],[31.254885,121.386514],[31.255287,121.383918],[31.255704,121.380801],[31.256514,121.372438],[31.25744,121.363149],[31.257579,121.362781],[31.258127,121.359134],[31.258212,121.358496],[31.258181,121.358173],[31.258073,121.357876],[31.257965,121.357661],[31.257749,121.357553],[31.257548,121.357481],[31.257201,121.357499],[31.256738,121.357625],[31.256321,121.357831],[31.255842,121.35793],[31.254855,121.357903],[31.253357,121.357113],[31.251783,121.356412],[31.248734,121.355137],[31.248426,121.355047],[31.243061,121.353897],[31.241657,121.353744],[31.239426,121.353789],[31.236616,121.354023],[31.236184,121.35387],[31.232872,121.354095],[31.232278,121.35413],[31.231792,121.354041],[31.231251,121.35387],[31.230719,121.353538],[31.230387,121.353115],[31.230109,121.352487],[31.229993,121.351966],[31.229908,121.351373],[31.230016,121.349881],[31.230078,121.348633],[31.230186,121.347402],[31.230232,121.346441],[31.23024,121.344923],[31.230147,121.342264],[31.230101,121.341401],[31.229962,121.339937],[31.230039,121.339704],[31.229885,121.338787],[31.229337,121.335787],[31.229283,121.334565],[31.229198,121.334233],[31.229105,121.33399],[31.228889,121.333766],[31.228657,121.333694],[31.228426,121.33364],[31.227862,121.333775],[31.227191,121.333874],[31.224095,121.333631],[31.223145,121.333667],[31.221269,121.333766],[31.219702,121.333712],[31.217355,121.33382],[31.214483,121.333595],[31.208808,121.333047],[31.208298,121.332895],[31.20809,121.332859],[31.207789,121.332562],[31.207488,121.332005],[31.207279,121.329194],[31.207279,121.328565],[31.207125,121.326561],[31.207032,121.325609],[31.206932,121.325295],[31.206824,121.32507],[31.206646,121.324837],[31.206492,121.324747],[31.206237,121.324612],[31.20599,121.32454],[31.204283,121.324567],[31.204136,121.32454],[31.203997,121.324477],[31.203851,121.324235],[31.203812,121.323983],[31.203804,121.323579],[31.203735,121.323399],[31.203619,121.323256],[31.203449,121.323202],[31.202723,121.323175],[31.202021,121.323031],[31.200677,121.323094],[31.200654,121.323337],[31.199094,121.323399],[31.198638,121.323337],[31.19758,121.323471],[31.196445,121.323525],[31.196291,121.323615],[31.196198,121.32384],[31.196167,121.324046],[31.196159,121.324549],[31.196144,121.324666],[31.196105,121.324792],[31.196013,121.324909],[31.195843,121.325016],[31.194283,121.325052],[31.194067,121.325016],[31.19382,121.324936],[31.193619,121.324783],[31.19348,121.324621],[31.193364,121.324424],[31.19324,121.324136],[31.193186,121.323876],[31.192931,121.319591],[31.192986,121.319276],[31.193047,121.318953],[31.193094,121.318638],[31.193125,121.318495],[31.193101,121.318279],[31.19307,121.318072],[31.192962,121.317758],[31.192708,121.317273],[31.192429,121.316429],[31.19192,121.311075]]],
                            [[[31.160908,121.432526],[31.160437,121.432076],[31.160166,121.431942],[31.15397,121.425546],[31.148902,121.420309],[31.148801,121.420075],[31.148593,121.419734],[31.148516,121.419491],[31.148492,121.419078],[31.148554,121.418755],[31.148693,121.418377],[31.148871,121.418117],[31.149095,121.417892],[31.150099,121.417147],[31.150239,121.417012],[31.152093,121.416149],[31.152294,121.415916],[31.16073,121.41235],[31.163936,121.410993],[31.164716,121.410796],[31.168023,121.409412],[31.174851,121.405325],[31.175569,121.404948],[31.176635,121.404552],[31.17679,121.404481],[31.177554,121.404229],[31.186367,121.401795],[31.186568,121.401741],[31.192514,121.399603],[31.193109,121.39936],[31.194051,121.398956],[31.19575,121.398031],[31.197712,121.396764],[31.199272,121.395695],[31.20036,121.395066],[31.199681,121.39388],[31.19958,121.393539],[31.197835,121.390593],[31.197573,121.390197],[31.196468,121.387664],[31.19497,121.383065],[31.192074,121.373678],[31.190877,121.369527],[31.190167,121.367416],[31.189387,121.365781],[31.188529,121.364371],[31.187888,121.363509],[31.187031,121.362503],[31.184459,121.359969],[31.181463,121.357185],[31.180706,121.356376],[31.179261,121.354517],[31.177686,121.351903],[31.176774,121.350214],[31.176056,121.348498],[31.175129,121.345884],[31.174055,121.342479],[31.173669,121.341285],[31.172147,121.337359],[31.172178,121.337036],[31.171576,121.335149],[31.170572,121.332634],[31.170324,121.33152],[31.170294,121.331143],[31.17034,121.330792],[31.170433,121.330559],[31.171815,121.329661],[31.172557,121.329014],[31.179709,121.324756],[31.180428,121.324441],[31.18103,121.324307],[31.184042,121.323624],[31.184274,121.323579],[31.184745,121.323588],[31.185494,121.323274],[31.189055,121.321055],[31.189441,121.320767],[31.189626,121.320426],[31.193472,121.318001],[31.193943,121.318037],[31.194553,121.317614],[31.1948,121.317578],[31.195017,121.317641],[31.195148,121.317839],[31.195194,121.318117],[31.195063,121.318414],[31.194661,121.318692],[31.194244,121.318917],[31.193835,121.318944],[31.193426,121.318728],[31.193233,121.318423],[31.192993,121.317848],[31.192715,121.317282],[31.192437,121.316465],[31.191904,121.311039]]],
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
                    var flag5 = $('div.mapCtrlItem[func="虹桥站线路"]').eq(0).hasClass('mapCtrlItemSelected');
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
                    var colors=["#009ad6","#009ad6","#009ad6","#009ad6"];           
                    var lines=[
                            [[[31.200654,121.323337],[31.199094,121.323399],[31.198638,121.323337],[31.19758,121.323471],[31.196445,121.323525],[31.196291,121.323615],[31.196198,121.32384],[31.196167,121.324046],[31.196159,121.324549],[31.196144,121.324666],[31.196105,121.324792],[31.196013,121.324909],[31.195843,121.325016],[31.194283,121.325052],[31.194067,121.325016],[31.19382,121.324936],[31.193619,121.324783],[31.19348,121.324621],[31.193364,121.324424],[31.19324,121.324136],[31.193186,121.323876],[31.192931,121.319591],[31.192986,121.319276],[31.193047,121.318953],[31.193094,121.318638],[31.193125,121.318495],[31.193101,121.318279],[31.19307,121.318072],[31.192962,121.317758],[31.192708,121.317273],[31.192429,121.316429],[31.19192,121.311075]]],
                            [[[31.199766,121.333074],[31.199758,121.332823],[31.199696,121.331637],[31.199619,121.329948],[31.199403,121.329661],[31.199187,121.329598],[31.194376,121.329885],[31.194159,121.329894],[31.193982,121.329876],[31.193835,121.329867],[31.193634,121.329759],[31.19348,121.32967],[31.193379,121.329544],[31.193271,121.329364],[31.193186,121.329113],[31.193101,121.328098],[31.193132,121.327109],[31.193209,121.326544],[31.193256,121.326274],[31.193302,121.32578],[31.193302,121.325484],[31.193202,121.324244],[31.193186,121.323876],[31.192931,121.319591],[31.192986,121.319276],[31.193047,121.318953],[31.193094,121.318638],[31.193125,121.318495],[31.193101,121.318279],[31.19307,121.318072],[31.192962,121.317758],[31.192708,121.317273],[31.192429,121.316429],[31.19192,121.311075]]],
                            [[[31.200275,121.325762],[31.197264,121.325942],[31.190537,121.327262],[31.18527,121.328223],[31.180698,121.327451],[31.178813,121.327289],[31.177408,121.327424],[31.174959,121.328547],[31.167721,121.333074],[31.160668,121.33762],[31.153445,121.3423],[31.14646,121.346621],[31.144088,121.348184],[31.137768,121.352918],[31.134816,121.355181],[31.131763,121.357382],[31.128178,121.35996],[31.124916,121.362323],[31.121431,121.364802],[31.119043,121.366599],[31.116036,121.368261],[31.110773,121.370623],[31.107804,121.371872],[31.105292,121.372896],[31.102092,121.373588],[31.099842,121.374082],[31.096457,121.373013],[31.093271,121.370039],[31.086623,121.363518],[31.083329,121.360203],[31.080631,121.35731],[31.078149,121.354643],[31.075419,121.349612],[31.072195,121.343746],[31.069365,121.338796],[31.066411,121.333703],[31.064655,121.330685],[31.06276,121.326786],[31.061299,121.323867],[31.060193,121.321603],[31.059265,121.319761],[31.055916,121.315198],[31.052745,121.310904],[31.050711,121.308092],[31.046179,121.303771],[31.043309,121.301023],[31.040091,121.297744],[31.037291,121.294779],[31.035798,121.293207],[31.031984,121.289111],[31.031071,121.288159],[31.028828,121.285536],[31.025362,121.281502],[31.02349,121.279706],[31.020852,121.277289],[31.017563,121.274433],[31.015428,121.272663],[31.012859,121.270381],[31.01012,121.267884],[31.006445,121.264507],[31.005106,121.263213],[31.003984,121.262099],[31.002537,121.260356],[31.00119,121.258802],[31.000099,121.257356],[30.99849,121.255326],[30.995812,121.251364],[30.993823,121.247493],[30.992012,121.243971],[30.990588,121.241258],[30.988514,121.237054],[30.987632,121.235312],[30.985937,121.231826],[30.984396,121.228682],[30.983088,121.225951],[30.980542,121.221379],[30.979876,121.220229],[30.977144,121.215863],[30.973885,121.211354],[30.970626,121.207788],[30.965896,121.203386],[30.962467,121.200385],[30.959595,121.197906],[30.957001,121.195723],[30.953045,121.192364],[30.951001,121.190558],[30.949112,121.188878],[30.947478,121.187216],[30.946363,121.186138],[30.943986,121.183479],[30.942228,121.181521],[30.940858,121.179689],[30.939317,121.17764],[30.9379,121.175511],[30.936204,121.172754],[30.934516,121.169924],[30.933098,121.166915],[30.927794,121.154419],[30.92602,121.149973],[30.924293,121.145697],[30.922303,121.140765],[30.92049,121.136157],[30.918996,121.132465],[30.917114,121.127937],[30.915611,121.124317],[30.913295,121.11881],[30.91266,121.117283],[30.909732,121.11201],[30.90716,121.107384],[30.90534,121.103952],[30.903256,121.100117],[30.901598,121.097035],[30.900436,121.094924],[30.897322,121.089418],[30.895471,121.086157],[30.892937,121.081701],[30.890419,121.077273],[30.887808,121.072754],[30.885151,121.068137],[30.884167,121.066385],[30.881935,121.061777],[30.880192,121.058184],[30.878224,121.054105],[30.875729,121.048805],[30.873815,121.044736],[30.87077,121.038134],[30.868646,121.033516],[30.866306,121.028459],[30.864097,121.023644],[30.862896,121.021102],[30.860688,121.017302],[30.858394,121.013313],[30.856192,121.010223]]],
                            [[[31.201635,121.328044],[31.20602,121.327612],[31.211294,121.327361],[31.216506,121.327226],[31.219895,121.327065],[31.221486,121.326238],[31.224713,121.325807],[31.226998,121.324217],[31.229653,121.322241],[31.234671,121.316393],[31.236655,121.314012],[31.238801,121.310976],[31.240414,121.308919],[31.243015,121.306107],[31.245616,121.303754],[31.248318,121.301607],[31.251073,121.29981],[31.254963,121.297852],[31.262965,121.294743],[31.269941,121.292156],[31.273089,121.290755],[31.276114,121.289102],[31.279146,121.287225],[31.28143,121.285446],[31.285249,121.28214],[31.287579,121.27976],[31.289716,121.277227],[31.290588,121.276193],[31.292524,121.273499],[31.292995,121.272834],[31.295132,121.269286],[31.299104,121.261228],[31.299282,121.260895],[31.300454,121.257464],[31.301604,121.253871],[31.302768,121.248544],[31.303756,121.2431],[31.304944,121.236165],[31.30516,121.234171],[31.306378,121.228134],[31.307389,121.223167],[31.308515,121.217516],[31.310034,121.209836],[31.311214,121.203799],[31.312425,121.197601],[31.313243,121.193262],[31.315302,121.185492],[31.316089,121.182491],[31.317485,121.177236],[31.318657,121.172475],[31.319906,121.167319],[31.321002,121.162782],[31.322143,121.15874],[31.323246,121.154832],[31.324642,121.149847],[31.325582,121.14699],[31.326963,121.143415],[31.328744,121.138834],[31.330394,121.134567],[31.331937,121.130686],[31.334319,121.124685],[31.33671,121.118703],[31.338776,121.113483],[31.341197,121.107007],[31.3422,121.104375],[31.343834,121.098221],[31.344613,121.094754],[31.345631,121.087406],[31.346024,121.081055],[31.345839,121.075135],[31.345523,121.071407],[31.345153,121.068406],[31.343842,121.061454],[31.342346,121.055606],[31.340789,121.049542],[31.339694,121.045248],[31.338815,121.041305],[31.338383,121.039203],[31.338105,121.035942],[31.337643,121.030228],[31.337535,121.025485],[31.337805,121.020078],[31.338152,121.016233],[31.339062,121.010825],[31.340018,121.005318],[31.342701,120.9985],[31.344891,120.992877],[31.34745,120.986247],[31.349409,120.981459],[31.35166,120.975971],[31.354397,120.969251],[31.356509,120.963556],[31.356617,120.963233],[31.359454,120.956675]]],
                            [[[31.156836,121.810173],[31.150532,121.812437],[31.149922,121.812671],[31.149705,121.812823],[31.149358,121.813254],[31.149203,121.813587],[31.149018,121.814198],[31.148894,121.814575],[31.148492,121.814898],[31.148299,121.815141],[31.140835,121.817935],[31.135024,121.820306],[31.130635,121.822103],[31.126385,121.823765],[31.122289,121.825373],[31.11827,121.826765],[31.117582,121.827061],[31.116585,121.82734],[31.115936,121.827439],[31.115132,121.827457],[31.114537,121.827385],[31.113648,121.827124],[31.113006,121.826837],[31.112496,121.82654],[31.111484,121.825786],[31.110061,121.823908],[31.109567,121.822471],[31.108268,121.814826],[31.10673,121.805394],[31.106011,121.801325],[31.105686,121.800112],[31.104233,121.791785],[31.102602,121.782658],[31.101025,121.774591],[31.100616,121.771546],[31.100329,121.768573],[31.100183,121.766417],[31.100121,121.762788],[31.100291,121.757209],[31.10036,121.75649],[31.100731,121.747382],[31.100762,121.744678],[31.100554,121.740348],[31.099618,121.730413],[31.098667,121.720019],[31.098026,121.712069],[31.097956,121.708593],[31.098026,121.70279],[31.098134,121.693447],[31.09815,121.685848],[31.098103,121.683431],[31.097871,121.68088],[31.097655,121.678958],[31.097237,121.675814],[31.09631,121.66922],[31.095606,121.664082],[31.094485,121.656653],[31.093372,121.64917],[31.092351,121.641966],[31.092089,121.640322],[31.091787,121.636369],[31.09171,121.62841],[31.091687,121.619319],[31.091725,121.611764],[31.091625,121.607695],[31.091215,121.603392],[31.090558,121.598739],[31.089421,121.593313],[31.089282,121.592792],[31.087875,121.588229],[31.086143,121.583585],[31.081968,121.574763],[31.079239,121.570065],[31.077368,121.567487],[31.076618,121.566409],[31.073679,121.563013],[31.07262,121.561738],[31.069759,121.557929],[31.068166,121.555108],[31.066789,121.552279],[31.064632,121.546449],[31.061245,121.53734],[31.060727,121.535974],[31.059559,121.531681],[31.058677,121.526848],[31.058058,121.521646],[31.057579,121.512421],[31.057308,121.506124],[31.056922,121.495587],[31.056705,121.48672],[31.056589,121.481789],[31.056527,121.480351],[31.05628,121.476794],[31.055854,121.473596],[31.054918,121.466392],[31.053898,121.458819],[31.053093,121.452971],[31.052065,121.445731],[31.05157,121.442398],[31.05027,121.436379],[31.048669,121.431241],[31.047424,121.427809],[31.045892,121.423462],[31.0444,121.419294],[31.042628,121.414371],[31.041777,121.411272],[31.04088,121.406466],[31.040927,121.40572],[31.040811,121.404283],[31.040803,121.403798],[31.040896,121.403079],[31.041213,121.402055],[31.041615,121.401471],[31.042334,121.400717],[31.044871,121.398453],[31.045405,121.398192],[31.04573,121.39804],[31.048236,121.397231],[31.049056,121.396926],[31.049628,121.396647],[31.050479,121.396018],[31.051802,121.394976],[31.052668,121.394402],[31.054632,121.393386],[31.057672,121.392138],[31.060819,121.390692],[31.061995,121.390135],[31.064725,121.38867],[31.067609,121.387161],[31.070927,121.385445],[31.073733,121.383981],[31.076084,121.38275],[31.077259,121.38214],[31.080878,121.380604],[31.083716,121.379445],[31.086847,121.378133],[31.089058,121.377163],[31.091648,121.37595],[31.092962,121.375196],[31.097593,121.373148],[31.100415,121.37198],[31.102618,121.371055],[31.103715,121.370677],[31.106792,121.369797],[31.111182,121.367587],[31.113679,121.366401],[31.115541,121.365458],[31.11718,121.364802],[31.119901,121.363994],[31.121624,121.3635],[31.122613,121.363078],[31.123487,121.362566],[31.125558,121.36111],[31.129298,121.358379],[31.133239,121.355487],[31.137064,121.352639],[31.140766,121.349908],[31.144521,121.347016],[31.146066,121.345866],[31.150609,121.343117],[31.153321,121.341491],[31.156952,121.339228],[31.159996,121.33735],[31.163426,121.335185],[31.166895,121.332957],[31.167945,121.332167],[31.168818,121.331421],[31.170062,121.330514],[31.172557,121.329014],[31.179709,121.324756],[31.180428,121.324441],[31.18103,121.324307],[31.184042,121.323624],[31.184274,121.323579],[31.184745,121.323588],[31.185494,121.323274],[31.189055,121.321055],[31.189441,121.320767],[31.189626,121.320426],[31.193472,121.318001],[31.193943,121.318037],[31.194553,121.317614],[31.1948,121.317578],[31.195017,121.317641],[31.195148,121.317839],[31.195194,121.318117],[31.195063,121.318414],[31.194661,121.318692],[31.194244,121.318917],[31.193835,121.318944],[31.193426,121.318728],[31.193233,121.318423],[31.192993,121.317848],[31.192715,121.317282],[31.192437,121.316465],[31.191904,121.311039]]],
                            [[[31.253828,121.460867],[31.254307,121.459807],[31.254091,121.45961],[31.253813,121.45908],[31.255063,121.458271],[31.255457,121.458091],[31.256043,121.457867],[31.256336,121.457777],[31.256792,121.457768],[31.257046,121.457768],[31.261692,121.458478],[31.261924,121.458298],[31.262495,121.457624],[31.262819,121.457346],[31.263945,121.456591],[31.264555,121.456241],[31.264347,121.455181],[31.264069,121.453878],[31.263652,121.451722],[31.263297,121.45042],[31.262981,121.449486],[31.260604,121.44344],[31.260303,121.44291],[31.260048,121.442569],[31.259693,121.442146],[31.258976,121.441518],[31.257278,121.440008],[31.256167,121.438832],[31.25504,121.437556],[31.253535,121.436002],[31.253002,121.435283],[31.252478,121.434376],[31.251567,121.432238],[31.249962,121.429417],[31.24895,121.427432],[31.248148,121.425986],[31.24797,121.42577],[31.250023,121.423093],[31.250556,121.422159],[31.251104,121.420911],[31.251497,121.419536],[31.251752,121.418269],[31.251783,121.417695],[31.251783,121.415386],[31.251335,121.413571],[31.250949,121.411622],[31.250772,121.410409],[31.250648,121.4089],[31.250679,121.405271],[31.250756,121.403232],[31.251158,121.401238],[31.251227,121.400735],[31.254021,121.390009],[31.25443,121.388419],[31.254885,121.386514],[31.255287,121.383918],[31.255704,121.380801],[31.256514,121.372438],[31.25744,121.363149],[31.257579,121.362781],[31.258127,121.359134],[31.258212,121.358496],[31.258181,121.358173],[31.258073,121.357876],[31.257965,121.357661],[31.257749,121.357553],[31.257548,121.357481],[31.257201,121.357499],[31.256738,121.357625],[31.256321,121.357831],[31.255842,121.35793],[31.254855,121.357903],[31.253357,121.357113],[31.251783,121.356412],[31.248734,121.355137],[31.248426,121.355047],[31.243061,121.353897],[31.241657,121.353744],[31.239426,121.353789],[31.236616,121.354023],[31.236184,121.35387],[31.232872,121.354095],[31.232278,121.35413],[31.231792,121.354041],[31.231251,121.35387],[31.230719,121.353538],[31.230387,121.353115],[31.230109,121.352487],[31.229993,121.351966],[31.229908,121.351373],[31.230016,121.349881],[31.230078,121.348633],[31.230186,121.347402],[31.230232,121.346441],[31.23024,121.344923],[31.230147,121.342264],[31.230101,121.341401],[31.229962,121.339937],[31.230039,121.339704],[31.229885,121.338787],[31.229337,121.335787],[31.229283,121.334565],[31.229198,121.334233],[31.229105,121.33399],[31.228889,121.333766],[31.228657,121.333694],[31.228426,121.33364],[31.227862,121.333775],[31.227191,121.333874],[31.224095,121.333631],[31.223145,121.333667],[31.221269,121.333766],[31.219702,121.333712],[31.217355,121.33382],[31.214483,121.333595],[31.208808,121.333047],[31.208298,121.332895],[31.20809,121.332859],[31.207789,121.332562],[31.207488,121.332005],[31.207279,121.329194],[31.207279,121.328565],[31.207125,121.326561],[31.207032,121.325609],[31.206932,121.325295],[31.206824,121.32507],[31.206646,121.324837],[31.206492,121.324747],[31.206237,121.324612],[31.20599,121.32454],[31.204283,121.324567],[31.204136,121.32454],[31.203997,121.324477],[31.203851,121.324235],[31.203812,121.323983],[31.203804,121.323579],[31.203735,121.323399],[31.203619,121.323256],[31.203449,121.323202],[31.202723,121.323175],[31.202021,121.323031],[31.200677,121.323094],[31.200654,121.323337],[31.199094,121.323399],[31.198638,121.323337],[31.19758,121.323471],[31.196445,121.323525],[31.196291,121.323615],[31.196198,121.32384],[31.196167,121.324046],[31.196159,121.324549],[31.196144,121.324666],[31.196105,121.324792],[31.196013,121.324909],[31.195843,121.325016],[31.194283,121.325052],[31.194067,121.325016],[31.19382,121.324936],[31.193619,121.324783],[31.19348,121.324621],[31.193364,121.324424],[31.19324,121.324136],[31.193186,121.323876],[31.192931,121.319591],[31.192986,121.319276],[31.193047,121.318953],[31.193094,121.318638],[31.193125,121.318495],[31.193101,121.318279],[31.19307,121.318072],[31.192962,121.317758],[31.192708,121.317273],[31.192429,121.316429],[31.19192,121.311075]]],
                            [[[31.160908,121.432526],[31.160437,121.432076],[31.160166,121.431942],[31.15397,121.425546],[31.148902,121.420309],[31.148801,121.420075],[31.148593,121.419734],[31.148516,121.419491],[31.148492,121.419078],[31.148554,121.418755],[31.148693,121.418377],[31.148871,121.418117],[31.149095,121.417892],[31.150099,121.417147],[31.150239,121.417012],[31.152093,121.416149],[31.152294,121.415916],[31.16073,121.41235],[31.163936,121.410993],[31.164716,121.410796],[31.168023,121.409412],[31.174851,121.405325],[31.175569,121.404948],[31.176635,121.404552],[31.17679,121.404481],[31.177554,121.404229],[31.186367,121.401795],[31.186568,121.401741],[31.192514,121.399603],[31.193109,121.39936],[31.194051,121.398956],[31.19575,121.398031],[31.197712,121.396764],[31.199272,121.395695],[31.20036,121.395066],[31.199681,121.39388],[31.19958,121.393539],[31.197835,121.390593],[31.197573,121.390197],[31.196468,121.387664],[31.19497,121.383065],[31.192074,121.373678],[31.190877,121.369527],[31.190167,121.367416],[31.189387,121.365781],[31.188529,121.364371],[31.187888,121.363509],[31.187031,121.362503],[31.184459,121.359969],[31.181463,121.357185],[31.180706,121.356376],[31.179261,121.354517],[31.177686,121.351903],[31.176774,121.350214],[31.176056,121.348498],[31.175129,121.345884],[31.174055,121.342479],[31.173669,121.341285],[31.172147,121.337359],[31.172178,121.337036],[31.171576,121.335149],[31.170572,121.332634],[31.170324,121.33152],[31.170294,121.331143],[31.17034,121.330792],[31.170433,121.330559],[31.171815,121.329661],[31.172557,121.329014],[31.179709,121.324756],[31.180428,121.324441],[31.18103,121.324307],[31.184042,121.323624],[31.184274,121.323579],[31.184745,121.323588],[31.185494,121.323274],[31.189055,121.321055],[31.189441,121.320767],[31.189626,121.320426],[31.193472,121.318001],[31.193943,121.318037],[31.194553,121.317614],[31.1948,121.317578],[31.195017,121.317641],[31.195148,121.317839],[31.195194,121.318117],[31.195063,121.318414],[31.194661,121.318692],[31.194244,121.318917],[31.193835,121.318944],[31.193426,121.318728],[31.193233,121.318423],[31.192993,121.317848],[31.192715,121.317282],[31.192437,121.316465],[31.191904,121.311039]]],
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
                    var flag5 = $('div.mapCtrlItem[func="虹桥站线路"]').eq(0).hasClass('mapCtrlItemSelected');
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
                    var colors=["#009ad6","#009ad6","#009ad6","#009ad6"];           
                    var lines=[
                            [[[31.200654,121.323337],[31.199094,121.323399],[31.198638,121.323337],[31.19758,121.323471],[31.196445,121.323525],[31.196291,121.323615],[31.196198,121.32384],[31.196167,121.324046],[31.196159,121.324549],[31.196144,121.324666],[31.196105,121.324792],[31.196013,121.324909],[31.195843,121.325016],[31.194283,121.325052],[31.194067,121.325016],[31.19382,121.324936],[31.193619,121.324783],[31.19348,121.324621],[31.193364,121.324424],[31.19324,121.324136],[31.193186,121.323876],[31.192931,121.319591],[31.192986,121.319276],[31.193047,121.318953],[31.193094,121.318638],[31.193125,121.318495],[31.193101,121.318279],[31.19307,121.318072],[31.192962,121.317758],[31.192708,121.317273],[31.192429,121.316429],[31.19192,121.311075]]],
                            [[[31.199766,121.333074],[31.199758,121.332823],[31.199696,121.331637],[31.199619,121.329948],[31.199403,121.329661],[31.199187,121.329598],[31.194376,121.329885],[31.194159,121.329894],[31.193982,121.329876],[31.193835,121.329867],[31.193634,121.329759],[31.19348,121.32967],[31.193379,121.329544],[31.193271,121.329364],[31.193186,121.329113],[31.193101,121.328098],[31.193132,121.327109],[31.193209,121.326544],[31.193256,121.326274],[31.193302,121.32578],[31.193302,121.325484],[31.193202,121.324244],[31.193186,121.323876],[31.192931,121.319591],[31.192986,121.319276],[31.193047,121.318953],[31.193094,121.318638],[31.193125,121.318495],[31.193101,121.318279],[31.19307,121.318072],[31.192962,121.317758],[31.192708,121.317273],[31.192429,121.316429],[31.19192,121.311075]]],
                            [[[31.200275,121.325762],[31.197264,121.325942],[31.190537,121.327262],[31.18527,121.328223],[31.180698,121.327451],[31.178813,121.327289],[31.177408,121.327424],[31.174959,121.328547],[31.167721,121.333074],[31.160668,121.33762],[31.153445,121.3423],[31.14646,121.346621],[31.144088,121.348184],[31.137768,121.352918],[31.134816,121.355181],[31.131763,121.357382],[31.128178,121.35996],[31.124916,121.362323],[31.121431,121.364802],[31.119043,121.366599],[31.116036,121.368261],[31.110773,121.370623],[31.107804,121.371872],[31.105292,121.372896],[31.102092,121.373588],[31.099842,121.374082],[31.096457,121.373013],[31.093271,121.370039],[31.086623,121.363518],[31.083329,121.360203],[31.080631,121.35731],[31.078149,121.354643],[31.075419,121.349612],[31.072195,121.343746],[31.069365,121.338796],[31.066411,121.333703],[31.064655,121.330685],[31.06276,121.326786],[31.061299,121.323867],[31.060193,121.321603],[31.059265,121.319761],[31.055916,121.315198],[31.052745,121.310904],[31.050711,121.308092],[31.046179,121.303771],[31.043309,121.301023],[31.040091,121.297744],[31.037291,121.294779],[31.035798,121.293207],[31.031984,121.289111],[31.031071,121.288159],[31.028828,121.285536],[31.025362,121.281502],[31.02349,121.279706],[31.020852,121.277289],[31.017563,121.274433],[31.015428,121.272663],[31.012859,121.270381],[31.01012,121.267884],[31.006445,121.264507],[31.005106,121.263213],[31.003984,121.262099],[31.002537,121.260356],[31.00119,121.258802],[31.000099,121.257356],[30.99849,121.255326],[30.995812,121.251364],[30.993823,121.247493],[30.992012,121.243971],[30.990588,121.241258],[30.988514,121.237054],[30.987632,121.235312],[30.985937,121.231826],[30.984396,121.228682],[30.983088,121.225951],[30.980542,121.221379],[30.979876,121.220229],[30.977144,121.215863],[30.973885,121.211354],[30.970626,121.207788],[30.965896,121.203386],[30.962467,121.200385],[30.959595,121.197906],[30.957001,121.195723],[30.953045,121.192364],[30.951001,121.190558],[30.949112,121.188878],[30.947478,121.187216],[30.946363,121.186138],[30.943986,121.183479],[30.942228,121.181521],[30.940858,121.179689],[30.939317,121.17764],[30.9379,121.175511],[30.936204,121.172754],[30.934516,121.169924],[30.933098,121.166915],[30.927794,121.154419],[30.92602,121.149973],[30.924293,121.145697],[30.922303,121.140765],[30.92049,121.136157],[30.918996,121.132465],[30.917114,121.127937],[30.915611,121.124317],[30.913295,121.11881],[30.91266,121.117283],[30.909732,121.11201],[30.90716,121.107384],[30.90534,121.103952],[30.903256,121.100117],[30.901598,121.097035],[30.900436,121.094924],[30.897322,121.089418],[30.895471,121.086157],[30.892937,121.081701],[30.890419,121.077273],[30.887808,121.072754],[30.885151,121.068137],[30.884167,121.066385],[30.881935,121.061777],[30.880192,121.058184],[30.878224,121.054105],[30.875729,121.048805],[30.873815,121.044736],[30.87077,121.038134],[30.868646,121.033516],[30.866306,121.028459],[30.864097,121.023644],[30.862896,121.021102],[30.860688,121.017302],[30.858394,121.013313],[30.856192,121.010223]]],
                            [[[31.201635,121.328044],[31.20602,121.327612],[31.211294,121.327361],[31.216506,121.327226],[31.219895,121.327065],[31.221486,121.326238],[31.224713,121.325807],[31.226998,121.324217],[31.229653,121.322241],[31.234671,121.316393],[31.236655,121.314012],[31.238801,121.310976],[31.240414,121.308919],[31.243015,121.306107],[31.245616,121.303754],[31.248318,121.301607],[31.251073,121.29981],[31.254963,121.297852],[31.262965,121.294743],[31.269941,121.292156],[31.273089,121.290755],[31.276114,121.289102],[31.279146,121.287225],[31.28143,121.285446],[31.285249,121.28214],[31.287579,121.27976],[31.289716,121.277227],[31.290588,121.276193],[31.292524,121.273499],[31.292995,121.272834],[31.295132,121.269286],[31.299104,121.261228],[31.299282,121.260895],[31.300454,121.257464],[31.301604,121.253871],[31.302768,121.248544],[31.303756,121.2431],[31.304944,121.236165],[31.30516,121.234171],[31.306378,121.228134],[31.307389,121.223167],[31.308515,121.217516],[31.310034,121.209836],[31.311214,121.203799],[31.312425,121.197601],[31.313243,121.193262],[31.315302,121.185492],[31.316089,121.182491],[31.317485,121.177236],[31.318657,121.172475],[31.319906,121.167319],[31.321002,121.162782],[31.322143,121.15874],[31.323246,121.154832],[31.324642,121.149847],[31.325582,121.14699],[31.326963,121.143415],[31.328744,121.138834],[31.330394,121.134567],[31.331937,121.130686],[31.334319,121.124685],[31.33671,121.118703],[31.338776,121.113483],[31.341197,121.107007],[31.3422,121.104375],[31.343834,121.098221],[31.344613,121.094754],[31.345631,121.087406],[31.346024,121.081055],[31.345839,121.075135],[31.345523,121.071407],[31.345153,121.068406],[31.343842,121.061454],[31.342346,121.055606],[31.340789,121.049542],[31.339694,121.045248],[31.338815,121.041305],[31.338383,121.039203],[31.338105,121.035942],[31.337643,121.030228],[31.337535,121.025485],[31.337805,121.020078],[31.338152,121.016233],[31.339062,121.010825],[31.340018,121.005318],[31.342701,120.9985],[31.344891,120.992877],[31.34745,120.986247],[31.349409,120.981459],[31.35166,120.975971],[31.354397,120.969251],[31.356509,120.963556],[31.356617,120.963233],[31.359454,120.956675]]],
                            [[[31.156836,121.810173],[31.150532,121.812437],[31.149922,121.812671],[31.149705,121.812823],[31.149358,121.813254],[31.149203,121.813587],[31.149018,121.814198],[31.148894,121.814575],[31.148492,121.814898],[31.148299,121.815141],[31.140835,121.817935],[31.135024,121.820306],[31.130635,121.822103],[31.126385,121.823765],[31.122289,121.825373],[31.11827,121.826765],[31.117582,121.827061],[31.116585,121.82734],[31.115936,121.827439],[31.115132,121.827457],[31.114537,121.827385],[31.113648,121.827124],[31.113006,121.826837],[31.112496,121.82654],[31.111484,121.825786],[31.110061,121.823908],[31.109567,121.822471],[31.108268,121.814826],[31.10673,121.805394],[31.106011,121.801325],[31.105686,121.800112],[31.104233,121.791785],[31.102602,121.782658],[31.101025,121.774591],[31.100616,121.771546],[31.100329,121.768573],[31.100183,121.766417],[31.100121,121.762788],[31.100291,121.757209],[31.10036,121.75649],[31.100731,121.747382],[31.100762,121.744678],[31.100554,121.740348],[31.099618,121.730413],[31.098667,121.720019],[31.098026,121.712069],[31.097956,121.708593],[31.098026,121.70279],[31.098134,121.693447],[31.09815,121.685848],[31.098103,121.683431],[31.097871,121.68088],[31.097655,121.678958],[31.097237,121.675814],[31.09631,121.66922],[31.095606,121.664082],[31.094485,121.656653],[31.093372,121.64917],[31.092351,121.641966],[31.092089,121.640322],[31.091787,121.636369],[31.09171,121.62841],[31.091687,121.619319],[31.091725,121.611764],[31.091625,121.607695],[31.091215,121.603392],[31.090558,121.598739],[31.089421,121.593313],[31.089282,121.592792],[31.087875,121.588229],[31.086143,121.583585],[31.081968,121.574763],[31.079239,121.570065],[31.077368,121.567487],[31.076618,121.566409],[31.073679,121.563013],[31.07262,121.561738],[31.069759,121.557929],[31.068166,121.555108],[31.066789,121.552279],[31.064632,121.546449],[31.061245,121.53734],[31.060727,121.535974],[31.059559,121.531681],[31.058677,121.526848],[31.058058,121.521646],[31.057579,121.512421],[31.057308,121.506124],[31.056922,121.495587],[31.056705,121.48672],[31.056589,121.481789],[31.056527,121.480351],[31.05628,121.476794],[31.055854,121.473596],[31.054918,121.466392],[31.053898,121.458819],[31.053093,121.452971],[31.052065,121.445731],[31.05157,121.442398],[31.05027,121.436379],[31.048669,121.431241],[31.047424,121.427809],[31.045892,121.423462],[31.0444,121.419294],[31.042628,121.414371],[31.041777,121.411272],[31.04088,121.406466],[31.040927,121.40572],[31.040811,121.404283],[31.040803,121.403798],[31.040896,121.403079],[31.041213,121.402055],[31.041615,121.401471],[31.042334,121.400717],[31.044871,121.398453],[31.045405,121.398192],[31.04573,121.39804],[31.048236,121.397231],[31.049056,121.396926],[31.049628,121.396647],[31.050479,121.396018],[31.051802,121.394976],[31.052668,121.394402],[31.054632,121.393386],[31.057672,121.392138],[31.060819,121.390692],[31.061995,121.390135],[31.064725,121.38867],[31.067609,121.387161],[31.070927,121.385445],[31.073733,121.383981],[31.076084,121.38275],[31.077259,121.38214],[31.080878,121.380604],[31.083716,121.379445],[31.086847,121.378133],[31.089058,121.377163],[31.091648,121.37595],[31.092962,121.375196],[31.097593,121.373148],[31.100415,121.37198],[31.102618,121.371055],[31.103715,121.370677],[31.106792,121.369797],[31.111182,121.367587],[31.113679,121.366401],[31.115541,121.365458],[31.11718,121.364802],[31.119901,121.363994],[31.121624,121.3635],[31.122613,121.363078],[31.123487,121.362566],[31.125558,121.36111],[31.129298,121.358379],[31.133239,121.355487],[31.137064,121.352639],[31.140766,121.349908],[31.144521,121.347016],[31.146066,121.345866],[31.150609,121.343117],[31.153321,121.341491],[31.156952,121.339228],[31.159996,121.33735],[31.163426,121.335185],[31.166895,121.332957],[31.167945,121.332167],[31.168818,121.331421],[31.170062,121.330514],[31.172557,121.329014],[31.179709,121.324756],[31.180428,121.324441],[31.18103,121.324307],[31.184042,121.323624],[31.184274,121.323579],[31.184745,121.323588],[31.185494,121.323274],[31.189055,121.321055],[31.189441,121.320767],[31.189626,121.320426],[31.193472,121.318001],[31.193943,121.318037],[31.194553,121.317614],[31.1948,121.317578],[31.195017,121.317641],[31.195148,121.317839],[31.195194,121.318117],[31.195063,121.318414],[31.194661,121.318692],[31.194244,121.318917],[31.193835,121.318944],[31.193426,121.318728],[31.193233,121.318423],[31.192993,121.317848],[31.192715,121.317282],[31.192437,121.316465],[31.191904,121.311039]]],
                            [[[31.253828,121.460867],[31.254307,121.459807],[31.254091,121.45961],[31.253813,121.45908],[31.255063,121.458271],[31.255457,121.458091],[31.256043,121.457867],[31.256336,121.457777],[31.256792,121.457768],[31.257046,121.457768],[31.261692,121.458478],[31.261924,121.458298],[31.262495,121.457624],[31.262819,121.457346],[31.263945,121.456591],[31.264555,121.456241],[31.264347,121.455181],[31.264069,121.453878],[31.263652,121.451722],[31.263297,121.45042],[31.262981,121.449486],[31.260604,121.44344],[31.260303,121.44291],[31.260048,121.442569],[31.259693,121.442146],[31.258976,121.441518],[31.257278,121.440008],[31.256167,121.438832],[31.25504,121.437556],[31.253535,121.436002],[31.253002,121.435283],[31.252478,121.434376],[31.251567,121.432238],[31.249962,121.429417],[31.24895,121.427432],[31.248148,121.425986],[31.24797,121.42577],[31.250023,121.423093],[31.250556,121.422159],[31.251104,121.420911],[31.251497,121.419536],[31.251752,121.418269],[31.251783,121.417695],[31.251783,121.415386],[31.251335,121.413571],[31.250949,121.411622],[31.250772,121.410409],[31.250648,121.4089],[31.250679,121.405271],[31.250756,121.403232],[31.251158,121.401238],[31.251227,121.400735],[31.254021,121.390009],[31.25443,121.388419],[31.254885,121.386514],[31.255287,121.383918],[31.255704,121.380801],[31.256514,121.372438],[31.25744,121.363149],[31.257579,121.362781],[31.258127,121.359134],[31.258212,121.358496],[31.258181,121.358173],[31.258073,121.357876],[31.257965,121.357661],[31.257749,121.357553],[31.257548,121.357481],[31.257201,121.357499],[31.256738,121.357625],[31.256321,121.357831],[31.255842,121.35793],[31.254855,121.357903],[31.253357,121.357113],[31.251783,121.356412],[31.248734,121.355137],[31.248426,121.355047],[31.243061,121.353897],[31.241657,121.353744],[31.239426,121.353789],[31.236616,121.354023],[31.236184,121.35387],[31.232872,121.354095],[31.232278,121.35413],[31.231792,121.354041],[31.231251,121.35387],[31.230719,121.353538],[31.230387,121.353115],[31.230109,121.352487],[31.229993,121.351966],[31.229908,121.351373],[31.230016,121.349881],[31.230078,121.348633],[31.230186,121.347402],[31.230232,121.346441],[31.23024,121.344923],[31.230147,121.342264],[31.230101,121.341401],[31.229962,121.339937],[31.230039,121.339704],[31.229885,121.338787],[31.229337,121.335787],[31.229283,121.334565],[31.229198,121.334233],[31.229105,121.33399],[31.228889,121.333766],[31.228657,121.333694],[31.228426,121.33364],[31.227862,121.333775],[31.227191,121.333874],[31.224095,121.333631],[31.223145,121.333667],[31.221269,121.333766],[31.219702,121.333712],[31.217355,121.33382],[31.214483,121.333595],[31.208808,121.333047],[31.208298,121.332895],[31.20809,121.332859],[31.207789,121.332562],[31.207488,121.332005],[31.207279,121.329194],[31.207279,121.328565],[31.207125,121.326561],[31.207032,121.325609],[31.206932,121.325295],[31.206824,121.32507],[31.206646,121.324837],[31.206492,121.324747],[31.206237,121.324612],[31.20599,121.32454],[31.204283,121.324567],[31.204136,121.32454],[31.203997,121.324477],[31.203851,121.324235],[31.203812,121.323983],[31.203804,121.323579],[31.203735,121.323399],[31.203619,121.323256],[31.203449,121.323202],[31.202723,121.323175],[31.202021,121.323031],[31.200677,121.323094],[31.200654,121.323337],[31.199094,121.323399],[31.198638,121.323337],[31.19758,121.323471],[31.196445,121.323525],[31.196291,121.323615],[31.196198,121.32384],[31.196167,121.324046],[31.196159,121.324549],[31.196144,121.324666],[31.196105,121.324792],[31.196013,121.324909],[31.195843,121.325016],[31.194283,121.325052],[31.194067,121.325016],[31.19382,121.324936],[31.193619,121.324783],[31.19348,121.324621],[31.193364,121.324424],[31.19324,121.324136],[31.193186,121.323876],[31.192931,121.319591],[31.192986,121.319276],[31.193047,121.318953],[31.193094,121.318638],[31.193125,121.318495],[31.193101,121.318279],[31.19307,121.318072],[31.192962,121.317758],[31.192708,121.317273],[31.192429,121.316429],[31.19192,121.311075]]],
                            [[[31.160908,121.432526],[31.160437,121.432076],[31.160166,121.431942],[31.15397,121.425546],[31.148902,121.420309],[31.148801,121.420075],[31.148593,121.419734],[31.148516,121.419491],[31.148492,121.419078],[31.148554,121.418755],[31.148693,121.418377],[31.148871,121.418117],[31.149095,121.417892],[31.150099,121.417147],[31.150239,121.417012],[31.152093,121.416149],[31.152294,121.415916],[31.16073,121.41235],[31.163936,121.410993],[31.164716,121.410796],[31.168023,121.409412],[31.174851,121.405325],[31.175569,121.404948],[31.176635,121.404552],[31.17679,121.404481],[31.177554,121.404229],[31.186367,121.401795],[31.186568,121.401741],[31.192514,121.399603],[31.193109,121.39936],[31.194051,121.398956],[31.19575,121.398031],[31.197712,121.396764],[31.199272,121.395695],[31.20036,121.395066],[31.199681,121.39388],[31.19958,121.393539],[31.197835,121.390593],[31.197573,121.390197],[31.196468,121.387664],[31.19497,121.383065],[31.192074,121.373678],[31.190877,121.369527],[31.190167,121.367416],[31.189387,121.365781],[31.188529,121.364371],[31.187888,121.363509],[31.187031,121.362503],[31.184459,121.359969],[31.181463,121.357185],[31.180706,121.356376],[31.179261,121.354517],[31.177686,121.351903],[31.176774,121.350214],[31.176056,121.348498],[31.175129,121.345884],[31.174055,121.342479],[31.173669,121.341285],[31.172147,121.337359],[31.172178,121.337036],[31.171576,121.335149],[31.170572,121.332634],[31.170324,121.33152],[31.170294,121.331143],[31.17034,121.330792],[31.170433,121.330559],[31.171815,121.329661],[31.172557,121.329014],[31.179709,121.324756],[31.180428,121.324441],[31.18103,121.324307],[31.184042,121.323624],[31.184274,121.323579],[31.184745,121.323588],[31.185494,121.323274],[31.189055,121.321055],[31.189441,121.320767],[31.189626,121.320426],[31.193472,121.318001],[31.193943,121.318037],[31.194553,121.317614],[31.1948,121.317578],[31.195017,121.317641],[31.195148,121.317839],[31.195194,121.318117],[31.195063,121.318414],[31.194661,121.318692],[31.194244,121.318917],[31.193835,121.318944],[31.193426,121.318728],[31.193233,121.318423],[31.192993,121.317848],[31.192715,121.317282],[31.192437,121.316465],[31.191904,121.311039]]],
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
                    var flag5 = $('div.mapCtrlItem[func="虹桥站线路"]').eq(0).hasClass('mapCtrlItemSelected');
                    var flag6 = $('div.mapCtrlItem[func="上海站线路"]').eq(0).hasClass('mapCtrlItemSelected');
                    var flag7 = $('div.mapCtrlItem[func="上海南站线路"]').eq(0).hasClass('mapCtrlItemSelected');

                    if (flag1 && flag2 && flag3 && flag4 && flag5 && flag6 && flag7 ) {
                        $(".ctrlTitle[func='保障线路']").addClass('mapCtrlItemSelected');  
                    }
                }
            }
            break; 
        case '虹桥站线路':
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
                    var colors=["#009ad6","#009ad6","#009ad6","#009ad6"];           
                    var lines=[
                            [[[31.200654,121.323337],[31.199094,121.323399],[31.198638,121.323337],[31.19758,121.323471],[31.196445,121.323525],[31.196291,121.323615],[31.196198,121.32384],[31.196167,121.324046],[31.196159,121.324549],[31.196144,121.324666],[31.196105,121.324792],[31.196013,121.324909],[31.195843,121.325016],[31.194283,121.325052],[31.194067,121.325016],[31.19382,121.324936],[31.193619,121.324783],[31.19348,121.324621],[31.193364,121.324424],[31.19324,121.324136],[31.193186,121.323876],[31.192931,121.319591],[31.192986,121.319276],[31.193047,121.318953],[31.193094,121.318638],[31.193125,121.318495],[31.193101,121.318279],[31.19307,121.318072],[31.192962,121.317758],[31.192708,121.317273],[31.192429,121.316429],[31.19192,121.311075]]],
                            [[[31.199766,121.333074],[31.199758,121.332823],[31.199696,121.331637],[31.199619,121.329948],[31.199403,121.329661],[31.199187,121.329598],[31.194376,121.329885],[31.194159,121.329894],[31.193982,121.329876],[31.193835,121.329867],[31.193634,121.329759],[31.19348,121.32967],[31.193379,121.329544],[31.193271,121.329364],[31.193186,121.329113],[31.193101,121.328098],[31.193132,121.327109],[31.193209,121.326544],[31.193256,121.326274],[31.193302,121.32578],[31.193302,121.325484],[31.193202,121.324244],[31.193186,121.323876],[31.192931,121.319591],[31.192986,121.319276],[31.193047,121.318953],[31.193094,121.318638],[31.193125,121.318495],[31.193101,121.318279],[31.19307,121.318072],[31.192962,121.317758],[31.192708,121.317273],[31.192429,121.316429],[31.19192,121.311075]]],
                            [[[31.200275,121.325762],[31.197264,121.325942],[31.190537,121.327262],[31.18527,121.328223],[31.180698,121.327451],[31.178813,121.327289],[31.177408,121.327424],[31.174959,121.328547],[31.167721,121.333074],[31.160668,121.33762],[31.153445,121.3423],[31.14646,121.346621],[31.144088,121.348184],[31.137768,121.352918],[31.134816,121.355181],[31.131763,121.357382],[31.128178,121.35996],[31.124916,121.362323],[31.121431,121.364802],[31.119043,121.366599],[31.116036,121.368261],[31.110773,121.370623],[31.107804,121.371872],[31.105292,121.372896],[31.102092,121.373588],[31.099842,121.374082],[31.096457,121.373013],[31.093271,121.370039],[31.086623,121.363518],[31.083329,121.360203],[31.080631,121.35731],[31.078149,121.354643],[31.075419,121.349612],[31.072195,121.343746],[31.069365,121.338796],[31.066411,121.333703],[31.064655,121.330685],[31.06276,121.326786],[31.061299,121.323867],[31.060193,121.321603],[31.059265,121.319761],[31.055916,121.315198],[31.052745,121.310904],[31.050711,121.308092],[31.046179,121.303771],[31.043309,121.301023],[31.040091,121.297744],[31.037291,121.294779],[31.035798,121.293207],[31.031984,121.289111],[31.031071,121.288159],[31.028828,121.285536],[31.025362,121.281502],[31.02349,121.279706],[31.020852,121.277289],[31.017563,121.274433],[31.015428,121.272663],[31.012859,121.270381],[31.01012,121.267884],[31.006445,121.264507],[31.005106,121.263213],[31.003984,121.262099],[31.002537,121.260356],[31.00119,121.258802],[31.000099,121.257356],[30.99849,121.255326],[30.995812,121.251364],[30.993823,121.247493],[30.992012,121.243971],[30.990588,121.241258],[30.988514,121.237054],[30.987632,121.235312],[30.985937,121.231826],[30.984396,121.228682],[30.983088,121.225951],[30.980542,121.221379],[30.979876,121.220229],[30.977144,121.215863],[30.973885,121.211354],[30.970626,121.207788],[30.965896,121.203386],[30.962467,121.200385],[30.959595,121.197906],[30.957001,121.195723],[30.953045,121.192364],[30.951001,121.190558],[30.949112,121.188878],[30.947478,121.187216],[30.946363,121.186138],[30.943986,121.183479],[30.942228,121.181521],[30.940858,121.179689],[30.939317,121.17764],[30.9379,121.175511],[30.936204,121.172754],[30.934516,121.169924],[30.933098,121.166915],[30.927794,121.154419],[30.92602,121.149973],[30.924293,121.145697],[30.922303,121.140765],[30.92049,121.136157],[30.918996,121.132465],[30.917114,121.127937],[30.915611,121.124317],[30.913295,121.11881],[30.91266,121.117283],[30.909732,121.11201],[30.90716,121.107384],[30.90534,121.103952],[30.903256,121.100117],[30.901598,121.097035],[30.900436,121.094924],[30.897322,121.089418],[30.895471,121.086157],[30.892937,121.081701],[30.890419,121.077273],[30.887808,121.072754],[30.885151,121.068137],[30.884167,121.066385],[30.881935,121.061777],[30.880192,121.058184],[30.878224,121.054105],[30.875729,121.048805],[30.873815,121.044736],[30.87077,121.038134],[30.868646,121.033516],[30.866306,121.028459],[30.864097,121.023644],[30.862896,121.021102],[30.860688,121.017302],[30.858394,121.013313],[30.856192,121.010223]]],
                            [[[31.201635,121.328044],[31.20602,121.327612],[31.211294,121.327361],[31.216506,121.327226],[31.219895,121.327065],[31.221486,121.326238],[31.224713,121.325807],[31.226998,121.324217],[31.229653,121.322241],[31.234671,121.316393],[31.236655,121.314012],[31.238801,121.310976],[31.240414,121.308919],[31.243015,121.306107],[31.245616,121.303754],[31.248318,121.301607],[31.251073,121.29981],[31.254963,121.297852],[31.262965,121.294743],[31.269941,121.292156],[31.273089,121.290755],[31.276114,121.289102],[31.279146,121.287225],[31.28143,121.285446],[31.285249,121.28214],[31.287579,121.27976],[31.289716,121.277227],[31.290588,121.276193],[31.292524,121.273499],[31.292995,121.272834],[31.295132,121.269286],[31.299104,121.261228],[31.299282,121.260895],[31.300454,121.257464],[31.301604,121.253871],[31.302768,121.248544],[31.303756,121.2431],[31.304944,121.236165],[31.30516,121.234171],[31.306378,121.228134],[31.307389,121.223167],[31.308515,121.217516],[31.310034,121.209836],[31.311214,121.203799],[31.312425,121.197601],[31.313243,121.193262],[31.315302,121.185492],[31.316089,121.182491],[31.317485,121.177236],[31.318657,121.172475],[31.319906,121.167319],[31.321002,121.162782],[31.322143,121.15874],[31.323246,121.154832],[31.324642,121.149847],[31.325582,121.14699],[31.326963,121.143415],[31.328744,121.138834],[31.330394,121.134567],[31.331937,121.130686],[31.334319,121.124685],[31.33671,121.118703],[31.338776,121.113483],[31.341197,121.107007],[31.3422,121.104375],[31.343834,121.098221],[31.344613,121.094754],[31.345631,121.087406],[31.346024,121.081055],[31.345839,121.075135],[31.345523,121.071407],[31.345153,121.068406],[31.343842,121.061454],[31.342346,121.055606],[31.340789,121.049542],[31.339694,121.045248],[31.338815,121.041305],[31.338383,121.039203],[31.338105,121.035942],[31.337643,121.030228],[31.337535,121.025485],[31.337805,121.020078],[31.338152,121.016233],[31.339062,121.010825],[31.340018,121.005318],[31.342701,120.9985],[31.344891,120.992877],[31.34745,120.986247],[31.349409,120.981459],[31.35166,120.975971],[31.354397,120.969251],[31.356509,120.963556],[31.356617,120.963233],[31.359454,120.956675]]],
                            [[[31.156836,121.810173],[31.150532,121.812437],[31.149922,121.812671],[31.149705,121.812823],[31.149358,121.813254],[31.149203,121.813587],[31.149018,121.814198],[31.148894,121.814575],[31.148492,121.814898],[31.148299,121.815141],[31.140835,121.817935],[31.135024,121.820306],[31.130635,121.822103],[31.126385,121.823765],[31.122289,121.825373],[31.11827,121.826765],[31.117582,121.827061],[31.116585,121.82734],[31.115936,121.827439],[31.115132,121.827457],[31.114537,121.827385],[31.113648,121.827124],[31.113006,121.826837],[31.112496,121.82654],[31.111484,121.825786],[31.110061,121.823908],[31.109567,121.822471],[31.108268,121.814826],[31.10673,121.805394],[31.106011,121.801325],[31.105686,121.800112],[31.104233,121.791785],[31.102602,121.782658],[31.101025,121.774591],[31.100616,121.771546],[31.100329,121.768573],[31.100183,121.766417],[31.100121,121.762788],[31.100291,121.757209],[31.10036,121.75649],[31.100731,121.747382],[31.100762,121.744678],[31.100554,121.740348],[31.099618,121.730413],[31.098667,121.720019],[31.098026,121.712069],[31.097956,121.708593],[31.098026,121.70279],[31.098134,121.693447],[31.09815,121.685848],[31.098103,121.683431],[31.097871,121.68088],[31.097655,121.678958],[31.097237,121.675814],[31.09631,121.66922],[31.095606,121.664082],[31.094485,121.656653],[31.093372,121.64917],[31.092351,121.641966],[31.092089,121.640322],[31.091787,121.636369],[31.09171,121.62841],[31.091687,121.619319],[31.091725,121.611764],[31.091625,121.607695],[31.091215,121.603392],[31.090558,121.598739],[31.089421,121.593313],[31.089282,121.592792],[31.087875,121.588229],[31.086143,121.583585],[31.081968,121.574763],[31.079239,121.570065],[31.077368,121.567487],[31.076618,121.566409],[31.073679,121.563013],[31.07262,121.561738],[31.069759,121.557929],[31.068166,121.555108],[31.066789,121.552279],[31.064632,121.546449],[31.061245,121.53734],[31.060727,121.535974],[31.059559,121.531681],[31.058677,121.526848],[31.058058,121.521646],[31.057579,121.512421],[31.057308,121.506124],[31.056922,121.495587],[31.056705,121.48672],[31.056589,121.481789],[31.056527,121.480351],[31.05628,121.476794],[31.055854,121.473596],[31.054918,121.466392],[31.053898,121.458819],[31.053093,121.452971],[31.052065,121.445731],[31.05157,121.442398],[31.05027,121.436379],[31.048669,121.431241],[31.047424,121.427809],[31.045892,121.423462],[31.0444,121.419294],[31.042628,121.414371],[31.041777,121.411272],[31.04088,121.406466],[31.040927,121.40572],[31.040811,121.404283],[31.040803,121.403798],[31.040896,121.403079],[31.041213,121.402055],[31.041615,121.401471],[31.042334,121.400717],[31.044871,121.398453],[31.045405,121.398192],[31.04573,121.39804],[31.048236,121.397231],[31.049056,121.396926],[31.049628,121.396647],[31.050479,121.396018],[31.051802,121.394976],[31.052668,121.394402],[31.054632,121.393386],[31.057672,121.392138],[31.060819,121.390692],[31.061995,121.390135],[31.064725,121.38867],[31.067609,121.387161],[31.070927,121.385445],[31.073733,121.383981],[31.076084,121.38275],[31.077259,121.38214],[31.080878,121.380604],[31.083716,121.379445],[31.086847,121.378133],[31.089058,121.377163],[31.091648,121.37595],[31.092962,121.375196],[31.097593,121.373148],[31.100415,121.37198],[31.102618,121.371055],[31.103715,121.370677],[31.106792,121.369797],[31.111182,121.367587],[31.113679,121.366401],[31.115541,121.365458],[31.11718,121.364802],[31.119901,121.363994],[31.121624,121.3635],[31.122613,121.363078],[31.123487,121.362566],[31.125558,121.36111],[31.129298,121.358379],[31.133239,121.355487],[31.137064,121.352639],[31.140766,121.349908],[31.144521,121.347016],[31.146066,121.345866],[31.150609,121.343117],[31.153321,121.341491],[31.156952,121.339228],[31.159996,121.33735],[31.163426,121.335185],[31.166895,121.332957],[31.167945,121.332167],[31.168818,121.331421],[31.170062,121.330514],[31.172557,121.329014],[31.179709,121.324756],[31.180428,121.324441],[31.18103,121.324307],[31.184042,121.323624],[31.184274,121.323579],[31.184745,121.323588],[31.185494,121.323274],[31.189055,121.321055],[31.189441,121.320767],[31.189626,121.320426],[31.193472,121.318001],[31.193943,121.318037],[31.194553,121.317614],[31.1948,121.317578],[31.195017,121.317641],[31.195148,121.317839],[31.195194,121.318117],[31.195063,121.318414],[31.194661,121.318692],[31.194244,121.318917],[31.193835,121.318944],[31.193426,121.318728],[31.193233,121.318423],[31.192993,121.317848],[31.192715,121.317282],[31.192437,121.316465],[31.191904,121.311039]]],
                            [[[31.253828,121.460867],[31.254307,121.459807],[31.254091,121.45961],[31.253813,121.45908],[31.255063,121.458271],[31.255457,121.458091],[31.256043,121.457867],[31.256336,121.457777],[31.256792,121.457768],[31.257046,121.457768],[31.261692,121.458478],[31.261924,121.458298],[31.262495,121.457624],[31.262819,121.457346],[31.263945,121.456591],[31.264555,121.456241],[31.264347,121.455181],[31.264069,121.453878],[31.263652,121.451722],[31.263297,121.45042],[31.262981,121.449486],[31.260604,121.44344],[31.260303,121.44291],[31.260048,121.442569],[31.259693,121.442146],[31.258976,121.441518],[31.257278,121.440008],[31.256167,121.438832],[31.25504,121.437556],[31.253535,121.436002],[31.253002,121.435283],[31.252478,121.434376],[31.251567,121.432238],[31.249962,121.429417],[31.24895,121.427432],[31.248148,121.425986],[31.24797,121.42577],[31.250023,121.423093],[31.250556,121.422159],[31.251104,121.420911],[31.251497,121.419536],[31.251752,121.418269],[31.251783,121.417695],[31.251783,121.415386],[31.251335,121.413571],[31.250949,121.411622],[31.250772,121.410409],[31.250648,121.4089],[31.250679,121.405271],[31.250756,121.403232],[31.251158,121.401238],[31.251227,121.400735],[31.254021,121.390009],[31.25443,121.388419],[31.254885,121.386514],[31.255287,121.383918],[31.255704,121.380801],[31.256514,121.372438],[31.25744,121.363149],[31.257579,121.362781],[31.258127,121.359134],[31.258212,121.358496],[31.258181,121.358173],[31.258073,121.357876],[31.257965,121.357661],[31.257749,121.357553],[31.257548,121.357481],[31.257201,121.357499],[31.256738,121.357625],[31.256321,121.357831],[31.255842,121.35793],[31.254855,121.357903],[31.253357,121.357113],[31.251783,121.356412],[31.248734,121.355137],[31.248426,121.355047],[31.243061,121.353897],[31.241657,121.353744],[31.239426,121.353789],[31.236616,121.354023],[31.236184,121.35387],[31.232872,121.354095],[31.232278,121.35413],[31.231792,121.354041],[31.231251,121.35387],[31.230719,121.353538],[31.230387,121.353115],[31.230109,121.352487],[31.229993,121.351966],[31.229908,121.351373],[31.230016,121.349881],[31.230078,121.348633],[31.230186,121.347402],[31.230232,121.346441],[31.23024,121.344923],[31.230147,121.342264],[31.230101,121.341401],[31.229962,121.339937],[31.230039,121.339704],[31.229885,121.338787],[31.229337,121.335787],[31.229283,121.334565],[31.229198,121.334233],[31.229105,121.33399],[31.228889,121.333766],[31.228657,121.333694],[31.228426,121.33364],[31.227862,121.333775],[31.227191,121.333874],[31.224095,121.333631],[31.223145,121.333667],[31.221269,121.333766],[31.219702,121.333712],[31.217355,121.33382],[31.214483,121.333595],[31.208808,121.333047],[31.208298,121.332895],[31.20809,121.332859],[31.207789,121.332562],[31.207488,121.332005],[31.207279,121.329194],[31.207279,121.328565],[31.207125,121.326561],[31.207032,121.325609],[31.206932,121.325295],[31.206824,121.32507],[31.206646,121.324837],[31.206492,121.324747],[31.206237,121.324612],[31.20599,121.32454],[31.204283,121.324567],[31.204136,121.32454],[31.203997,121.324477],[31.203851,121.324235],[31.203812,121.323983],[31.203804,121.323579],[31.203735,121.323399],[31.203619,121.323256],[31.203449,121.323202],[31.202723,121.323175],[31.202021,121.323031],[31.200677,121.323094],[31.200654,121.323337],[31.199094,121.323399],[31.198638,121.323337],[31.19758,121.323471],[31.196445,121.323525],[31.196291,121.323615],[31.196198,121.32384],[31.196167,121.324046],[31.196159,121.324549],[31.196144,121.324666],[31.196105,121.324792],[31.196013,121.324909],[31.195843,121.325016],[31.194283,121.325052],[31.194067,121.325016],[31.19382,121.324936],[31.193619,121.324783],[31.19348,121.324621],[31.193364,121.324424],[31.19324,121.324136],[31.193186,121.323876],[31.192931,121.319591],[31.192986,121.319276],[31.193047,121.318953],[31.193094,121.318638],[31.193125,121.318495],[31.193101,121.318279],[31.19307,121.318072],[31.192962,121.317758],[31.192708,121.317273],[31.192429,121.316429],[31.19192,121.311075]]],
                            [[[31.160908,121.432526],[31.160437,121.432076],[31.160166,121.431942],[31.15397,121.425546],[31.148902,121.420309],[31.148801,121.420075],[31.148593,121.419734],[31.148516,121.419491],[31.148492,121.419078],[31.148554,121.418755],[31.148693,121.418377],[31.148871,121.418117],[31.149095,121.417892],[31.150099,121.417147],[31.150239,121.417012],[31.152093,121.416149],[31.152294,121.415916],[31.16073,121.41235],[31.163936,121.410993],[31.164716,121.410796],[31.168023,121.409412],[31.174851,121.405325],[31.175569,121.404948],[31.176635,121.404552],[31.17679,121.404481],[31.177554,121.404229],[31.186367,121.401795],[31.186568,121.401741],[31.192514,121.399603],[31.193109,121.39936],[31.194051,121.398956],[31.19575,121.398031],[31.197712,121.396764],[31.199272,121.395695],[31.20036,121.395066],[31.199681,121.39388],[31.19958,121.393539],[31.197835,121.390593],[31.197573,121.390197],[31.196468,121.387664],[31.19497,121.383065],[31.192074,121.373678],[31.190877,121.369527],[31.190167,121.367416],[31.189387,121.365781],[31.188529,121.364371],[31.187888,121.363509],[31.187031,121.362503],[31.184459,121.359969],[31.181463,121.357185],[31.180706,121.356376],[31.179261,121.354517],[31.177686,121.351903],[31.176774,121.350214],[31.176056,121.348498],[31.175129,121.345884],[31.174055,121.342479],[31.173669,121.341285],[31.172147,121.337359],[31.172178,121.337036],[31.171576,121.335149],[31.170572,121.332634],[31.170324,121.33152],[31.170294,121.331143],[31.17034,121.330792],[31.170433,121.330559],[31.171815,121.329661],[31.172557,121.329014],[31.179709,121.324756],[31.180428,121.324441],[31.18103,121.324307],[31.184042,121.323624],[31.184274,121.323579],[31.184745,121.323588],[31.185494,121.323274],[31.189055,121.321055],[31.189441,121.320767],[31.189626,121.320426],[31.193472,121.318001],[31.193943,121.318037],[31.194553,121.317614],[31.1948,121.317578],[31.195017,121.317641],[31.195148,121.317839],[31.195194,121.318117],[31.195063,121.318414],[31.194661,121.318692],[31.194244,121.318917],[31.193835,121.318944],[31.193426,121.318728],[31.193233,121.318423],[31.192993,121.317848],[31.192715,121.317282],[31.192437,121.316465],[31.191904,121.311039]]],
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
                    var flag5 = $('div.mapCtrlItem[func="虹桥站线路"]').eq(0).hasClass('mapCtrlItemSelected');
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
                    var colors=["#009ad6","#009ad6","#009ad6","#009ad6"];           
                    var lines=[
                            [[[31.200654,121.323337],[31.199094,121.323399],[31.198638,121.323337],[31.19758,121.323471],[31.196445,121.323525],[31.196291,121.323615],[31.196198,121.32384],[31.196167,121.324046],[31.196159,121.324549],[31.196144,121.324666],[31.196105,121.324792],[31.196013,121.324909],[31.195843,121.325016],[31.194283,121.325052],[31.194067,121.325016],[31.19382,121.324936],[31.193619,121.324783],[31.19348,121.324621],[31.193364,121.324424],[31.19324,121.324136],[31.193186,121.323876],[31.192931,121.319591],[31.192986,121.319276],[31.193047,121.318953],[31.193094,121.318638],[31.193125,121.318495],[31.193101,121.318279],[31.19307,121.318072],[31.192962,121.317758],[31.192708,121.317273],[31.192429,121.316429],[31.19192,121.311075]]],
                            [[[31.199766,121.333074],[31.199758,121.332823],[31.199696,121.331637],[31.199619,121.329948],[31.199403,121.329661],[31.199187,121.329598],[31.194376,121.329885],[31.194159,121.329894],[31.193982,121.329876],[31.193835,121.329867],[31.193634,121.329759],[31.19348,121.32967],[31.193379,121.329544],[31.193271,121.329364],[31.193186,121.329113],[31.193101,121.328098],[31.193132,121.327109],[31.193209,121.326544],[31.193256,121.326274],[31.193302,121.32578],[31.193302,121.325484],[31.193202,121.324244],[31.193186,121.323876],[31.192931,121.319591],[31.192986,121.319276],[31.193047,121.318953],[31.193094,121.318638],[31.193125,121.318495],[31.193101,121.318279],[31.19307,121.318072],[31.192962,121.317758],[31.192708,121.317273],[31.192429,121.316429],[31.19192,121.311075]]],
                            [[[31.200275,121.325762],[31.197264,121.325942],[31.190537,121.327262],[31.18527,121.328223],[31.180698,121.327451],[31.178813,121.327289],[31.177408,121.327424],[31.174959,121.328547],[31.167721,121.333074],[31.160668,121.33762],[31.153445,121.3423],[31.14646,121.346621],[31.144088,121.348184],[31.137768,121.352918],[31.134816,121.355181],[31.131763,121.357382],[31.128178,121.35996],[31.124916,121.362323],[31.121431,121.364802],[31.119043,121.366599],[31.116036,121.368261],[31.110773,121.370623],[31.107804,121.371872],[31.105292,121.372896],[31.102092,121.373588],[31.099842,121.374082],[31.096457,121.373013],[31.093271,121.370039],[31.086623,121.363518],[31.083329,121.360203],[31.080631,121.35731],[31.078149,121.354643],[31.075419,121.349612],[31.072195,121.343746],[31.069365,121.338796],[31.066411,121.333703],[31.064655,121.330685],[31.06276,121.326786],[31.061299,121.323867],[31.060193,121.321603],[31.059265,121.319761],[31.055916,121.315198],[31.052745,121.310904],[31.050711,121.308092],[31.046179,121.303771],[31.043309,121.301023],[31.040091,121.297744],[31.037291,121.294779],[31.035798,121.293207],[31.031984,121.289111],[31.031071,121.288159],[31.028828,121.285536],[31.025362,121.281502],[31.02349,121.279706],[31.020852,121.277289],[31.017563,121.274433],[31.015428,121.272663],[31.012859,121.270381],[31.01012,121.267884],[31.006445,121.264507],[31.005106,121.263213],[31.003984,121.262099],[31.002537,121.260356],[31.00119,121.258802],[31.000099,121.257356],[30.99849,121.255326],[30.995812,121.251364],[30.993823,121.247493],[30.992012,121.243971],[30.990588,121.241258],[30.988514,121.237054],[30.987632,121.235312],[30.985937,121.231826],[30.984396,121.228682],[30.983088,121.225951],[30.980542,121.221379],[30.979876,121.220229],[30.977144,121.215863],[30.973885,121.211354],[30.970626,121.207788],[30.965896,121.203386],[30.962467,121.200385],[30.959595,121.197906],[30.957001,121.195723],[30.953045,121.192364],[30.951001,121.190558],[30.949112,121.188878],[30.947478,121.187216],[30.946363,121.186138],[30.943986,121.183479],[30.942228,121.181521],[30.940858,121.179689],[30.939317,121.17764],[30.9379,121.175511],[30.936204,121.172754],[30.934516,121.169924],[30.933098,121.166915],[30.927794,121.154419],[30.92602,121.149973],[30.924293,121.145697],[30.922303,121.140765],[30.92049,121.136157],[30.918996,121.132465],[30.917114,121.127937],[30.915611,121.124317],[30.913295,121.11881],[30.91266,121.117283],[30.909732,121.11201],[30.90716,121.107384],[30.90534,121.103952],[30.903256,121.100117],[30.901598,121.097035],[30.900436,121.094924],[30.897322,121.089418],[30.895471,121.086157],[30.892937,121.081701],[30.890419,121.077273],[30.887808,121.072754],[30.885151,121.068137],[30.884167,121.066385],[30.881935,121.061777],[30.880192,121.058184],[30.878224,121.054105],[30.875729,121.048805],[30.873815,121.044736],[30.87077,121.038134],[30.868646,121.033516],[30.866306,121.028459],[30.864097,121.023644],[30.862896,121.021102],[30.860688,121.017302],[30.858394,121.013313],[30.856192,121.010223]]],
                            [[[31.201635,121.328044],[31.20602,121.327612],[31.211294,121.327361],[31.216506,121.327226],[31.219895,121.327065],[31.221486,121.326238],[31.224713,121.325807],[31.226998,121.324217],[31.229653,121.322241],[31.234671,121.316393],[31.236655,121.314012],[31.238801,121.310976],[31.240414,121.308919],[31.243015,121.306107],[31.245616,121.303754],[31.248318,121.301607],[31.251073,121.29981],[31.254963,121.297852],[31.262965,121.294743],[31.269941,121.292156],[31.273089,121.290755],[31.276114,121.289102],[31.279146,121.287225],[31.28143,121.285446],[31.285249,121.28214],[31.287579,121.27976],[31.289716,121.277227],[31.290588,121.276193],[31.292524,121.273499],[31.292995,121.272834],[31.295132,121.269286],[31.299104,121.261228],[31.299282,121.260895],[31.300454,121.257464],[31.301604,121.253871],[31.302768,121.248544],[31.303756,121.2431],[31.304944,121.236165],[31.30516,121.234171],[31.306378,121.228134],[31.307389,121.223167],[31.308515,121.217516],[31.310034,121.209836],[31.311214,121.203799],[31.312425,121.197601],[31.313243,121.193262],[31.315302,121.185492],[31.316089,121.182491],[31.317485,121.177236],[31.318657,121.172475],[31.319906,121.167319],[31.321002,121.162782],[31.322143,121.15874],[31.323246,121.154832],[31.324642,121.149847],[31.325582,121.14699],[31.326963,121.143415],[31.328744,121.138834],[31.330394,121.134567],[31.331937,121.130686],[31.334319,121.124685],[31.33671,121.118703],[31.338776,121.113483],[31.341197,121.107007],[31.3422,121.104375],[31.343834,121.098221],[31.344613,121.094754],[31.345631,121.087406],[31.346024,121.081055],[31.345839,121.075135],[31.345523,121.071407],[31.345153,121.068406],[31.343842,121.061454],[31.342346,121.055606],[31.340789,121.049542],[31.339694,121.045248],[31.338815,121.041305],[31.338383,121.039203],[31.338105,121.035942],[31.337643,121.030228],[31.337535,121.025485],[31.337805,121.020078],[31.338152,121.016233],[31.339062,121.010825],[31.340018,121.005318],[31.342701,120.9985],[31.344891,120.992877],[31.34745,120.986247],[31.349409,120.981459],[31.35166,120.975971],[31.354397,120.969251],[31.356509,120.963556],[31.356617,120.963233],[31.359454,120.956675]]],
                            [[[31.156836,121.810173],[31.150532,121.812437],[31.149922,121.812671],[31.149705,121.812823],[31.149358,121.813254],[31.149203,121.813587],[31.149018,121.814198],[31.148894,121.814575],[31.148492,121.814898],[31.148299,121.815141],[31.140835,121.817935],[31.135024,121.820306],[31.130635,121.822103],[31.126385,121.823765],[31.122289,121.825373],[31.11827,121.826765],[31.117582,121.827061],[31.116585,121.82734],[31.115936,121.827439],[31.115132,121.827457],[31.114537,121.827385],[31.113648,121.827124],[31.113006,121.826837],[31.112496,121.82654],[31.111484,121.825786],[31.110061,121.823908],[31.109567,121.822471],[31.108268,121.814826],[31.10673,121.805394],[31.106011,121.801325],[31.105686,121.800112],[31.104233,121.791785],[31.102602,121.782658],[31.101025,121.774591],[31.100616,121.771546],[31.100329,121.768573],[31.100183,121.766417],[31.100121,121.762788],[31.100291,121.757209],[31.10036,121.75649],[31.100731,121.747382],[31.100762,121.744678],[31.100554,121.740348],[31.099618,121.730413],[31.098667,121.720019],[31.098026,121.712069],[31.097956,121.708593],[31.098026,121.70279],[31.098134,121.693447],[31.09815,121.685848],[31.098103,121.683431],[31.097871,121.68088],[31.097655,121.678958],[31.097237,121.675814],[31.09631,121.66922],[31.095606,121.664082],[31.094485,121.656653],[31.093372,121.64917],[31.092351,121.641966],[31.092089,121.640322],[31.091787,121.636369],[31.09171,121.62841],[31.091687,121.619319],[31.091725,121.611764],[31.091625,121.607695],[31.091215,121.603392],[31.090558,121.598739],[31.089421,121.593313],[31.089282,121.592792],[31.087875,121.588229],[31.086143,121.583585],[31.081968,121.574763],[31.079239,121.570065],[31.077368,121.567487],[31.076618,121.566409],[31.073679,121.563013],[31.07262,121.561738],[31.069759,121.557929],[31.068166,121.555108],[31.066789,121.552279],[31.064632,121.546449],[31.061245,121.53734],[31.060727,121.535974],[31.059559,121.531681],[31.058677,121.526848],[31.058058,121.521646],[31.057579,121.512421],[31.057308,121.506124],[31.056922,121.495587],[31.056705,121.48672],[31.056589,121.481789],[31.056527,121.480351],[31.05628,121.476794],[31.055854,121.473596],[31.054918,121.466392],[31.053898,121.458819],[31.053093,121.452971],[31.052065,121.445731],[31.05157,121.442398],[31.05027,121.436379],[31.048669,121.431241],[31.047424,121.427809],[31.045892,121.423462],[31.0444,121.419294],[31.042628,121.414371],[31.041777,121.411272],[31.04088,121.406466],[31.040927,121.40572],[31.040811,121.404283],[31.040803,121.403798],[31.040896,121.403079],[31.041213,121.402055],[31.041615,121.401471],[31.042334,121.400717],[31.044871,121.398453],[31.045405,121.398192],[31.04573,121.39804],[31.048236,121.397231],[31.049056,121.396926],[31.049628,121.396647],[31.050479,121.396018],[31.051802,121.394976],[31.052668,121.394402],[31.054632,121.393386],[31.057672,121.392138],[31.060819,121.390692],[31.061995,121.390135],[31.064725,121.38867],[31.067609,121.387161],[31.070927,121.385445],[31.073733,121.383981],[31.076084,121.38275],[31.077259,121.38214],[31.080878,121.380604],[31.083716,121.379445],[31.086847,121.378133],[31.089058,121.377163],[31.091648,121.37595],[31.092962,121.375196],[31.097593,121.373148],[31.100415,121.37198],[31.102618,121.371055],[31.103715,121.370677],[31.106792,121.369797],[31.111182,121.367587],[31.113679,121.366401],[31.115541,121.365458],[31.11718,121.364802],[31.119901,121.363994],[31.121624,121.3635],[31.122613,121.363078],[31.123487,121.362566],[31.125558,121.36111],[31.129298,121.358379],[31.133239,121.355487],[31.137064,121.352639],[31.140766,121.349908],[31.144521,121.347016],[31.146066,121.345866],[31.150609,121.343117],[31.153321,121.341491],[31.156952,121.339228],[31.159996,121.33735],[31.163426,121.335185],[31.166895,121.332957],[31.167945,121.332167],[31.168818,121.331421],[31.170062,121.330514],[31.172557,121.329014],[31.179709,121.324756],[31.180428,121.324441],[31.18103,121.324307],[31.184042,121.323624],[31.184274,121.323579],[31.184745,121.323588],[31.185494,121.323274],[31.189055,121.321055],[31.189441,121.320767],[31.189626,121.320426],[31.193472,121.318001],[31.193943,121.318037],[31.194553,121.317614],[31.1948,121.317578],[31.195017,121.317641],[31.195148,121.317839],[31.195194,121.318117],[31.195063,121.318414],[31.194661,121.318692],[31.194244,121.318917],[31.193835,121.318944],[31.193426,121.318728],[31.193233,121.318423],[31.192993,121.317848],[31.192715,121.317282],[31.192437,121.316465],[31.191904,121.311039]]],
                            [[[31.253828,121.460867],[31.254307,121.459807],[31.254091,121.45961],[31.253813,121.45908],[31.255063,121.458271],[31.255457,121.458091],[31.256043,121.457867],[31.256336,121.457777],[31.256792,121.457768],[31.257046,121.457768],[31.261692,121.458478],[31.261924,121.458298],[31.262495,121.457624],[31.262819,121.457346],[31.263945,121.456591],[31.264555,121.456241],[31.264347,121.455181],[31.264069,121.453878],[31.263652,121.451722],[31.263297,121.45042],[31.262981,121.449486],[31.260604,121.44344],[31.260303,121.44291],[31.260048,121.442569],[31.259693,121.442146],[31.258976,121.441518],[31.257278,121.440008],[31.256167,121.438832],[31.25504,121.437556],[31.253535,121.436002],[31.253002,121.435283],[31.252478,121.434376],[31.251567,121.432238],[31.249962,121.429417],[31.24895,121.427432],[31.248148,121.425986],[31.24797,121.42577],[31.250023,121.423093],[31.250556,121.422159],[31.251104,121.420911],[31.251497,121.419536],[31.251752,121.418269],[31.251783,121.417695],[31.251783,121.415386],[31.251335,121.413571],[31.250949,121.411622],[31.250772,121.410409],[31.250648,121.4089],[31.250679,121.405271],[31.250756,121.403232],[31.251158,121.401238],[31.251227,121.400735],[31.254021,121.390009],[31.25443,121.388419],[31.254885,121.386514],[31.255287,121.383918],[31.255704,121.380801],[31.256514,121.372438],[31.25744,121.363149],[31.257579,121.362781],[31.258127,121.359134],[31.258212,121.358496],[31.258181,121.358173],[31.258073,121.357876],[31.257965,121.357661],[31.257749,121.357553],[31.257548,121.357481],[31.257201,121.357499],[31.256738,121.357625],[31.256321,121.357831],[31.255842,121.35793],[31.254855,121.357903],[31.253357,121.357113],[31.251783,121.356412],[31.248734,121.355137],[31.248426,121.355047],[31.243061,121.353897],[31.241657,121.353744],[31.239426,121.353789],[31.236616,121.354023],[31.236184,121.35387],[31.232872,121.354095],[31.232278,121.35413],[31.231792,121.354041],[31.231251,121.35387],[31.230719,121.353538],[31.230387,121.353115],[31.230109,121.352487],[31.229993,121.351966],[31.229908,121.351373],[31.230016,121.349881],[31.230078,121.348633],[31.230186,121.347402],[31.230232,121.346441],[31.23024,121.344923],[31.230147,121.342264],[31.230101,121.341401],[31.229962,121.339937],[31.230039,121.339704],[31.229885,121.338787],[31.229337,121.335787],[31.229283,121.334565],[31.229198,121.334233],[31.229105,121.33399],[31.228889,121.333766],[31.228657,121.333694],[31.228426,121.33364],[31.227862,121.333775],[31.227191,121.333874],[31.224095,121.333631],[31.223145,121.333667],[31.221269,121.333766],[31.219702,121.333712],[31.217355,121.33382],[31.214483,121.333595],[31.208808,121.333047],[31.208298,121.332895],[31.20809,121.332859],[31.207789,121.332562],[31.207488,121.332005],[31.207279,121.329194],[31.207279,121.328565],[31.207125,121.326561],[31.207032,121.325609],[31.206932,121.325295],[31.206824,121.32507],[31.206646,121.324837],[31.206492,121.324747],[31.206237,121.324612],[31.20599,121.32454],[31.204283,121.324567],[31.204136,121.32454],[31.203997,121.324477],[31.203851,121.324235],[31.203812,121.323983],[31.203804,121.323579],[31.203735,121.323399],[31.203619,121.323256],[31.203449,121.323202],[31.202723,121.323175],[31.202021,121.323031],[31.200677,121.323094],[31.200654,121.323337],[31.199094,121.323399],[31.198638,121.323337],[31.19758,121.323471],[31.196445,121.323525],[31.196291,121.323615],[31.196198,121.32384],[31.196167,121.324046],[31.196159,121.324549],[31.196144,121.324666],[31.196105,121.324792],[31.196013,121.324909],[31.195843,121.325016],[31.194283,121.325052],[31.194067,121.325016],[31.19382,121.324936],[31.193619,121.324783],[31.19348,121.324621],[31.193364,121.324424],[31.19324,121.324136],[31.193186,121.323876],[31.192931,121.319591],[31.192986,121.319276],[31.193047,121.318953],[31.193094,121.318638],[31.193125,121.318495],[31.193101,121.318279],[31.19307,121.318072],[31.192962,121.317758],[31.192708,121.317273],[31.192429,121.316429],[31.19192,121.311075]]],
                            [[[31.160908,121.432526],[31.160437,121.432076],[31.160166,121.431942],[31.15397,121.425546],[31.148902,121.420309],[31.148801,121.420075],[31.148593,121.419734],[31.148516,121.419491],[31.148492,121.419078],[31.148554,121.418755],[31.148693,121.418377],[31.148871,121.418117],[31.149095,121.417892],[31.150099,121.417147],[31.150239,121.417012],[31.152093,121.416149],[31.152294,121.415916],[31.16073,121.41235],[31.163936,121.410993],[31.164716,121.410796],[31.168023,121.409412],[31.174851,121.405325],[31.175569,121.404948],[31.176635,121.404552],[31.17679,121.404481],[31.177554,121.404229],[31.186367,121.401795],[31.186568,121.401741],[31.192514,121.399603],[31.193109,121.39936],[31.194051,121.398956],[31.19575,121.398031],[31.197712,121.396764],[31.199272,121.395695],[31.20036,121.395066],[31.199681,121.39388],[31.19958,121.393539],[31.197835,121.390593],[31.197573,121.390197],[31.196468,121.387664],[31.19497,121.383065],[31.192074,121.373678],[31.190877,121.369527],[31.190167,121.367416],[31.189387,121.365781],[31.188529,121.364371],[31.187888,121.363509],[31.187031,121.362503],[31.184459,121.359969],[31.181463,121.357185],[31.180706,121.356376],[31.179261,121.354517],[31.177686,121.351903],[31.176774,121.350214],[31.176056,121.348498],[31.175129,121.345884],[31.174055,121.342479],[31.173669,121.341285],[31.172147,121.337359],[31.172178,121.337036],[31.171576,121.335149],[31.170572,121.332634],[31.170324,121.33152],[31.170294,121.331143],[31.17034,121.330792],[31.170433,121.330559],[31.171815,121.329661],[31.172557,121.329014],[31.179709,121.324756],[31.180428,121.324441],[31.18103,121.324307],[31.184042,121.323624],[31.184274,121.323579],[31.184745,121.323588],[31.185494,121.323274],[31.189055,121.321055],[31.189441,121.320767],[31.189626,121.320426],[31.193472,121.318001],[31.193943,121.318037],[31.194553,121.317614],[31.1948,121.317578],[31.195017,121.317641],[31.195148,121.317839],[31.195194,121.318117],[31.195063,121.318414],[31.194661,121.318692],[31.194244,121.318917],[31.193835,121.318944],[31.193426,121.318728],[31.193233,121.318423],[31.192993,121.317848],[31.192715,121.317282],[31.192437,121.316465],[31.191904,121.311039]]],
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
                    var flag5 = $('div.mapCtrlItem[func="虹桥站线路"]').eq(0).hasClass('mapCtrlItemSelected');
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
                    var colors=["#009ad6","#009ad6","#009ad6","#009ad6"];           
                    var lines=[
                            [[[31.200654,121.323337],[31.199094,121.323399],[31.198638,121.323337],[31.19758,121.323471],[31.196445,121.323525],[31.196291,121.323615],[31.196198,121.32384],[31.196167,121.324046],[31.196159,121.324549],[31.196144,121.324666],[31.196105,121.324792],[31.196013,121.324909],[31.195843,121.325016],[31.194283,121.325052],[31.194067,121.325016],[31.19382,121.324936],[31.193619,121.324783],[31.19348,121.324621],[31.193364,121.324424],[31.19324,121.324136],[31.193186,121.323876],[31.192931,121.319591],[31.192986,121.319276],[31.193047,121.318953],[31.193094,121.318638],[31.193125,121.318495],[31.193101,121.318279],[31.19307,121.318072],[31.192962,121.317758],[31.192708,121.317273],[31.192429,121.316429],[31.19192,121.311075]]],
                            [[[31.199766,121.333074],[31.199758,121.332823],[31.199696,121.331637],[31.199619,121.329948],[31.199403,121.329661],[31.199187,121.329598],[31.194376,121.329885],[31.194159,121.329894],[31.193982,121.329876],[31.193835,121.329867],[31.193634,121.329759],[31.19348,121.32967],[31.193379,121.329544],[31.193271,121.329364],[31.193186,121.329113],[31.193101,121.328098],[31.193132,121.327109],[31.193209,121.326544],[31.193256,121.326274],[31.193302,121.32578],[31.193302,121.325484],[31.193202,121.324244],[31.193186,121.323876],[31.192931,121.319591],[31.192986,121.319276],[31.193047,121.318953],[31.193094,121.318638],[31.193125,121.318495],[31.193101,121.318279],[31.19307,121.318072],[31.192962,121.317758],[31.192708,121.317273],[31.192429,121.316429],[31.19192,121.311075]]],
                            [[[31.200275,121.325762],[31.197264,121.325942],[31.190537,121.327262],[31.18527,121.328223],[31.180698,121.327451],[31.178813,121.327289],[31.177408,121.327424],[31.174959,121.328547],[31.167721,121.333074],[31.160668,121.33762],[31.153445,121.3423],[31.14646,121.346621],[31.144088,121.348184],[31.137768,121.352918],[31.134816,121.355181],[31.131763,121.357382],[31.128178,121.35996],[31.124916,121.362323],[31.121431,121.364802],[31.119043,121.366599],[31.116036,121.368261],[31.110773,121.370623],[31.107804,121.371872],[31.105292,121.372896],[31.102092,121.373588],[31.099842,121.374082],[31.096457,121.373013],[31.093271,121.370039],[31.086623,121.363518],[31.083329,121.360203],[31.080631,121.35731],[31.078149,121.354643],[31.075419,121.349612],[31.072195,121.343746],[31.069365,121.338796],[31.066411,121.333703],[31.064655,121.330685],[31.06276,121.326786],[31.061299,121.323867],[31.060193,121.321603],[31.059265,121.319761],[31.055916,121.315198],[31.052745,121.310904],[31.050711,121.308092],[31.046179,121.303771],[31.043309,121.301023],[31.040091,121.297744],[31.037291,121.294779],[31.035798,121.293207],[31.031984,121.289111],[31.031071,121.288159],[31.028828,121.285536],[31.025362,121.281502],[31.02349,121.279706],[31.020852,121.277289],[31.017563,121.274433],[31.015428,121.272663],[31.012859,121.270381],[31.01012,121.267884],[31.006445,121.264507],[31.005106,121.263213],[31.003984,121.262099],[31.002537,121.260356],[31.00119,121.258802],[31.000099,121.257356],[30.99849,121.255326],[30.995812,121.251364],[30.993823,121.247493],[30.992012,121.243971],[30.990588,121.241258],[30.988514,121.237054],[30.987632,121.235312],[30.985937,121.231826],[30.984396,121.228682],[30.983088,121.225951],[30.980542,121.221379],[30.979876,121.220229],[30.977144,121.215863],[30.973885,121.211354],[30.970626,121.207788],[30.965896,121.203386],[30.962467,121.200385],[30.959595,121.197906],[30.957001,121.195723],[30.953045,121.192364],[30.951001,121.190558],[30.949112,121.188878],[30.947478,121.187216],[30.946363,121.186138],[30.943986,121.183479],[30.942228,121.181521],[30.940858,121.179689],[30.939317,121.17764],[30.9379,121.175511],[30.936204,121.172754],[30.934516,121.169924],[30.933098,121.166915],[30.927794,121.154419],[30.92602,121.149973],[30.924293,121.145697],[30.922303,121.140765],[30.92049,121.136157],[30.918996,121.132465],[30.917114,121.127937],[30.915611,121.124317],[30.913295,121.11881],[30.91266,121.117283],[30.909732,121.11201],[30.90716,121.107384],[30.90534,121.103952],[30.903256,121.100117],[30.901598,121.097035],[30.900436,121.094924],[30.897322,121.089418],[30.895471,121.086157],[30.892937,121.081701],[30.890419,121.077273],[30.887808,121.072754],[30.885151,121.068137],[30.884167,121.066385],[30.881935,121.061777],[30.880192,121.058184],[30.878224,121.054105],[30.875729,121.048805],[30.873815,121.044736],[30.87077,121.038134],[30.868646,121.033516],[30.866306,121.028459],[30.864097,121.023644],[30.862896,121.021102],[30.860688,121.017302],[30.858394,121.013313],[30.856192,121.010223]]],
                            [[[31.201635,121.328044],[31.20602,121.327612],[31.211294,121.327361],[31.216506,121.327226],[31.219895,121.327065],[31.221486,121.326238],[31.224713,121.325807],[31.226998,121.324217],[31.229653,121.322241],[31.234671,121.316393],[31.236655,121.314012],[31.238801,121.310976],[31.240414,121.308919],[31.243015,121.306107],[31.245616,121.303754],[31.248318,121.301607],[31.251073,121.29981],[31.254963,121.297852],[31.262965,121.294743],[31.269941,121.292156],[31.273089,121.290755],[31.276114,121.289102],[31.279146,121.287225],[31.28143,121.285446],[31.285249,121.28214],[31.287579,121.27976],[31.289716,121.277227],[31.290588,121.276193],[31.292524,121.273499],[31.292995,121.272834],[31.295132,121.269286],[31.299104,121.261228],[31.299282,121.260895],[31.300454,121.257464],[31.301604,121.253871],[31.302768,121.248544],[31.303756,121.2431],[31.304944,121.236165],[31.30516,121.234171],[31.306378,121.228134],[31.307389,121.223167],[31.308515,121.217516],[31.310034,121.209836],[31.311214,121.203799],[31.312425,121.197601],[31.313243,121.193262],[31.315302,121.185492],[31.316089,121.182491],[31.317485,121.177236],[31.318657,121.172475],[31.319906,121.167319],[31.321002,121.162782],[31.322143,121.15874],[31.323246,121.154832],[31.324642,121.149847],[31.325582,121.14699],[31.326963,121.143415],[31.328744,121.138834],[31.330394,121.134567],[31.331937,121.130686],[31.334319,121.124685],[31.33671,121.118703],[31.338776,121.113483],[31.341197,121.107007],[31.3422,121.104375],[31.343834,121.098221],[31.344613,121.094754],[31.345631,121.087406],[31.346024,121.081055],[31.345839,121.075135],[31.345523,121.071407],[31.345153,121.068406],[31.343842,121.061454],[31.342346,121.055606],[31.340789,121.049542],[31.339694,121.045248],[31.338815,121.041305],[31.338383,121.039203],[31.338105,121.035942],[31.337643,121.030228],[31.337535,121.025485],[31.337805,121.020078],[31.338152,121.016233],[31.339062,121.010825],[31.340018,121.005318],[31.342701,120.9985],[31.344891,120.992877],[31.34745,120.986247],[31.349409,120.981459],[31.35166,120.975971],[31.354397,120.969251],[31.356509,120.963556],[31.356617,120.963233],[31.359454,120.956675]]],
                            [[[31.156836,121.810173],[31.150532,121.812437],[31.149922,121.812671],[31.149705,121.812823],[31.149358,121.813254],[31.149203,121.813587],[31.149018,121.814198],[31.148894,121.814575],[31.148492,121.814898],[31.148299,121.815141],[31.140835,121.817935],[31.135024,121.820306],[31.130635,121.822103],[31.126385,121.823765],[31.122289,121.825373],[31.11827,121.826765],[31.117582,121.827061],[31.116585,121.82734],[31.115936,121.827439],[31.115132,121.827457],[31.114537,121.827385],[31.113648,121.827124],[31.113006,121.826837],[31.112496,121.82654],[31.111484,121.825786],[31.110061,121.823908],[31.109567,121.822471],[31.108268,121.814826],[31.10673,121.805394],[31.106011,121.801325],[31.105686,121.800112],[31.104233,121.791785],[31.102602,121.782658],[31.101025,121.774591],[31.100616,121.771546],[31.100329,121.768573],[31.100183,121.766417],[31.100121,121.762788],[31.100291,121.757209],[31.10036,121.75649],[31.100731,121.747382],[31.100762,121.744678],[31.100554,121.740348],[31.099618,121.730413],[31.098667,121.720019],[31.098026,121.712069],[31.097956,121.708593],[31.098026,121.70279],[31.098134,121.693447],[31.09815,121.685848],[31.098103,121.683431],[31.097871,121.68088],[31.097655,121.678958],[31.097237,121.675814],[31.09631,121.66922],[31.095606,121.664082],[31.094485,121.656653],[31.093372,121.64917],[31.092351,121.641966],[31.092089,121.640322],[31.091787,121.636369],[31.09171,121.62841],[31.091687,121.619319],[31.091725,121.611764],[31.091625,121.607695],[31.091215,121.603392],[31.090558,121.598739],[31.089421,121.593313],[31.089282,121.592792],[31.087875,121.588229],[31.086143,121.583585],[31.081968,121.574763],[31.079239,121.570065],[31.077368,121.567487],[31.076618,121.566409],[31.073679,121.563013],[31.07262,121.561738],[31.069759,121.557929],[31.068166,121.555108],[31.066789,121.552279],[31.064632,121.546449],[31.061245,121.53734],[31.060727,121.535974],[31.059559,121.531681],[31.058677,121.526848],[31.058058,121.521646],[31.057579,121.512421],[31.057308,121.506124],[31.056922,121.495587],[31.056705,121.48672],[31.056589,121.481789],[31.056527,121.480351],[31.05628,121.476794],[31.055854,121.473596],[31.054918,121.466392],[31.053898,121.458819],[31.053093,121.452971],[31.052065,121.445731],[31.05157,121.442398],[31.05027,121.436379],[31.048669,121.431241],[31.047424,121.427809],[31.045892,121.423462],[31.0444,121.419294],[31.042628,121.414371],[31.041777,121.411272],[31.04088,121.406466],[31.040927,121.40572],[31.040811,121.404283],[31.040803,121.403798],[31.040896,121.403079],[31.041213,121.402055],[31.041615,121.401471],[31.042334,121.400717],[31.044871,121.398453],[31.045405,121.398192],[31.04573,121.39804],[31.048236,121.397231],[31.049056,121.396926],[31.049628,121.396647],[31.050479,121.396018],[31.051802,121.394976],[31.052668,121.394402],[31.054632,121.393386],[31.057672,121.392138],[31.060819,121.390692],[31.061995,121.390135],[31.064725,121.38867],[31.067609,121.387161],[31.070927,121.385445],[31.073733,121.383981],[31.076084,121.38275],[31.077259,121.38214],[31.080878,121.380604],[31.083716,121.379445],[31.086847,121.378133],[31.089058,121.377163],[31.091648,121.37595],[31.092962,121.375196],[31.097593,121.373148],[31.100415,121.37198],[31.102618,121.371055],[31.103715,121.370677],[31.106792,121.369797],[31.111182,121.367587],[31.113679,121.366401],[31.115541,121.365458],[31.11718,121.364802],[31.119901,121.363994],[31.121624,121.3635],[31.122613,121.363078],[31.123487,121.362566],[31.125558,121.36111],[31.129298,121.358379],[31.133239,121.355487],[31.137064,121.352639],[31.140766,121.349908],[31.144521,121.347016],[31.146066,121.345866],[31.150609,121.343117],[31.153321,121.341491],[31.156952,121.339228],[31.159996,121.33735],[31.163426,121.335185],[31.166895,121.332957],[31.167945,121.332167],[31.168818,121.331421],[31.170062,121.330514],[31.172557,121.329014],[31.179709,121.324756],[31.180428,121.324441],[31.18103,121.324307],[31.184042,121.323624],[31.184274,121.323579],[31.184745,121.323588],[31.185494,121.323274],[31.189055,121.321055],[31.189441,121.320767],[31.189626,121.320426],[31.193472,121.318001],[31.193943,121.318037],[31.194553,121.317614],[31.1948,121.317578],[31.195017,121.317641],[31.195148,121.317839],[31.195194,121.318117],[31.195063,121.318414],[31.194661,121.318692],[31.194244,121.318917],[31.193835,121.318944],[31.193426,121.318728],[31.193233,121.318423],[31.192993,121.317848],[31.192715,121.317282],[31.192437,121.316465],[31.191904,121.311039]]],
                            [[[31.253828,121.460867],[31.254307,121.459807],[31.254091,121.45961],[31.253813,121.45908],[31.255063,121.458271],[31.255457,121.458091],[31.256043,121.457867],[31.256336,121.457777],[31.256792,121.457768],[31.257046,121.457768],[31.261692,121.458478],[31.261924,121.458298],[31.262495,121.457624],[31.262819,121.457346],[31.263945,121.456591],[31.264555,121.456241],[31.264347,121.455181],[31.264069,121.453878],[31.263652,121.451722],[31.263297,121.45042],[31.262981,121.449486],[31.260604,121.44344],[31.260303,121.44291],[31.260048,121.442569],[31.259693,121.442146],[31.258976,121.441518],[31.257278,121.440008],[31.256167,121.438832],[31.25504,121.437556],[31.253535,121.436002],[31.253002,121.435283],[31.252478,121.434376],[31.251567,121.432238],[31.249962,121.429417],[31.24895,121.427432],[31.248148,121.425986],[31.24797,121.42577],[31.250023,121.423093],[31.250556,121.422159],[31.251104,121.420911],[31.251497,121.419536],[31.251752,121.418269],[31.251783,121.417695],[31.251783,121.415386],[31.251335,121.413571],[31.250949,121.411622],[31.250772,121.410409],[31.250648,121.4089],[31.250679,121.405271],[31.250756,121.403232],[31.251158,121.401238],[31.251227,121.400735],[31.254021,121.390009],[31.25443,121.388419],[31.254885,121.386514],[31.255287,121.383918],[31.255704,121.380801],[31.256514,121.372438],[31.25744,121.363149],[31.257579,121.362781],[31.258127,121.359134],[31.258212,121.358496],[31.258181,121.358173],[31.258073,121.357876],[31.257965,121.357661],[31.257749,121.357553],[31.257548,121.357481],[31.257201,121.357499],[31.256738,121.357625],[31.256321,121.357831],[31.255842,121.35793],[31.254855,121.357903],[31.253357,121.357113],[31.251783,121.356412],[31.248734,121.355137],[31.248426,121.355047],[31.243061,121.353897],[31.241657,121.353744],[31.239426,121.353789],[31.236616,121.354023],[31.236184,121.35387],[31.232872,121.354095],[31.232278,121.35413],[31.231792,121.354041],[31.231251,121.35387],[31.230719,121.353538],[31.230387,121.353115],[31.230109,121.352487],[31.229993,121.351966],[31.229908,121.351373],[31.230016,121.349881],[31.230078,121.348633],[31.230186,121.347402],[31.230232,121.346441],[31.23024,121.344923],[31.230147,121.342264],[31.230101,121.341401],[31.229962,121.339937],[31.230039,121.339704],[31.229885,121.338787],[31.229337,121.335787],[31.229283,121.334565],[31.229198,121.334233],[31.229105,121.33399],[31.228889,121.333766],[31.228657,121.333694],[31.228426,121.33364],[31.227862,121.333775],[31.227191,121.333874],[31.224095,121.333631],[31.223145,121.333667],[31.221269,121.333766],[31.219702,121.333712],[31.217355,121.33382],[31.214483,121.333595],[31.208808,121.333047],[31.208298,121.332895],[31.20809,121.332859],[31.207789,121.332562],[31.207488,121.332005],[31.207279,121.329194],[31.207279,121.328565],[31.207125,121.326561],[31.207032,121.325609],[31.206932,121.325295],[31.206824,121.32507],[31.206646,121.324837],[31.206492,121.324747],[31.206237,121.324612],[31.20599,121.32454],[31.204283,121.324567],[31.204136,121.32454],[31.203997,121.324477],[31.203851,121.324235],[31.203812,121.323983],[31.203804,121.323579],[31.203735,121.323399],[31.203619,121.323256],[31.203449,121.323202],[31.202723,121.323175],[31.202021,121.323031],[31.200677,121.323094],[31.200654,121.323337],[31.199094,121.323399],[31.198638,121.323337],[31.19758,121.323471],[31.196445,121.323525],[31.196291,121.323615],[31.196198,121.32384],[31.196167,121.324046],[31.196159,121.324549],[31.196144,121.324666],[31.196105,121.324792],[31.196013,121.324909],[31.195843,121.325016],[31.194283,121.325052],[31.194067,121.325016],[31.19382,121.324936],[31.193619,121.324783],[31.19348,121.324621],[31.193364,121.324424],[31.19324,121.324136],[31.193186,121.323876],[31.192931,121.319591],[31.192986,121.319276],[31.193047,121.318953],[31.193094,121.318638],[31.193125,121.318495],[31.193101,121.318279],[31.19307,121.318072],[31.192962,121.317758],[31.192708,121.317273],[31.192429,121.316429],[31.19192,121.311075]]],
                            [[[31.160908,121.432526],[31.160437,121.432076],[31.160166,121.431942],[31.15397,121.425546],[31.148902,121.420309],[31.148801,121.420075],[31.148593,121.419734],[31.148516,121.419491],[31.148492,121.419078],[31.148554,121.418755],[31.148693,121.418377],[31.148871,121.418117],[31.149095,121.417892],[31.150099,121.417147],[31.150239,121.417012],[31.152093,121.416149],[31.152294,121.415916],[31.16073,121.41235],[31.163936,121.410993],[31.164716,121.410796],[31.168023,121.409412],[31.174851,121.405325],[31.175569,121.404948],[31.176635,121.404552],[31.17679,121.404481],[31.177554,121.404229],[31.186367,121.401795],[31.186568,121.401741],[31.192514,121.399603],[31.193109,121.39936],[31.194051,121.398956],[31.19575,121.398031],[31.197712,121.396764],[31.199272,121.395695],[31.20036,121.395066],[31.199681,121.39388],[31.19958,121.393539],[31.197835,121.390593],[31.197573,121.390197],[31.196468,121.387664],[31.19497,121.383065],[31.192074,121.373678],[31.190877,121.369527],[31.190167,121.367416],[31.189387,121.365781],[31.188529,121.364371],[31.187888,121.363509],[31.187031,121.362503],[31.184459,121.359969],[31.181463,121.357185],[31.180706,121.356376],[31.179261,121.354517],[31.177686,121.351903],[31.176774,121.350214],[31.176056,121.348498],[31.175129,121.345884],[31.174055,121.342479],[31.173669,121.341285],[31.172147,121.337359],[31.172178,121.337036],[31.171576,121.335149],[31.170572,121.332634],[31.170324,121.33152],[31.170294,121.331143],[31.17034,121.330792],[31.170433,121.330559],[31.171815,121.329661],[31.172557,121.329014],[31.179709,121.324756],[31.180428,121.324441],[31.18103,121.324307],[31.184042,121.323624],[31.184274,121.323579],[31.184745,121.323588],[31.185494,121.323274],[31.189055,121.321055],[31.189441,121.320767],[31.189626,121.320426],[31.193472,121.318001],[31.193943,121.318037],[31.194553,121.317614],[31.1948,121.317578],[31.195017,121.317641],[31.195148,121.317839],[31.195194,121.318117],[31.195063,121.318414],[31.194661,121.318692],[31.194244,121.318917],[31.193835,121.318944],[31.193426,121.318728],[31.193233,121.318423],[31.192993,121.317848],[31.192715,121.317282],[31.192437,121.316465],[31.191904,121.311039]]],
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
                    var flag5 = $('div.mapCtrlItem[func="虹桥站线路"]').eq(0).hasClass('mapCtrlItemSelected');
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
             //     marker=L.marker([lat,lng],{title: name, icon: this.marker5G, keepInView:false}).bindPopup(heatPopup4G).addTo(layer);
             // }else if(type === '4G'){
             //     if (lte_type === "FDD") {
             //         marker=L.marker([lat,lng],{title: name, icon: this.marker4G, keepInView:false}).bindPopup(heatPopup4G).addTo(layer);
             //     }else if (lte_type === "TDD") {
             //         marker=L.marker([lat,lng],{title: name, icon: this.marker4G, keepInView:false}).bindPopup(heatPopup4G).addTo(layer);
             //     }
             // }else if(type === '2G'){
             //     marker=L.marker([lat,lng],{title: name, icon: this.marker2G, keepInView:false}).bindPopup(heatPopup4G).addTo(layer);
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
                        +'<div class="ciiekpistyle rtshbeathearhewar" >3</div>'
                        +'<div class="fontUnitTime">人</div>'
                        +'<div class="fontUnitTime">&nbsp;&nbsp;|&nbsp;&nbsp;</div>'
                        +'<div class="fontUnitTime">实到&nbsp;:&nbsp;&nbsp;</div>'
                        +'<div class="ciiekpistyle rtshbeathearhewaregerwgew" >3</div>'
                        +'<div class="fontUnitTime">人</div>'
                        +'<div style="clear:both;"></div>'
                    +'</div>'
                    +'<div style="clear:both;"></div>'
                    +'<div id="infobroadcastcontentdiv" class="fontSubInfo" style="width:100%;height:476px;overflow:auto;">'
                        // +'<div class="infobroadcastmessage">'
                        //  +'消息公告(1小时前)：<br>保障现场应急车、指挥车、发电车、无人机已全部预开启，业务测试正常'
                        // +'</div>'
                        // +'<div class="infobroadcastmessage">'
                        //  +'巡检消息(1小时前)：<br>当前保障区域设备告警0个，性能越限0个，高话务小区1个'
                        // +'</div>'
                        // +'<div class="infobroadcastmessage">'
                        //  +'巡检消息(2小时前)：<br>当前保障区域设备告警0个，性能越限0个，高话务小区0个'
                        // +'</div>'
                        // +'<div class="infobroadcastmessage">'
                        //  +'巡检消息(3小时前)：<br>当前保障区域设备告警0个，性能越限1个，高话务小区1个，已派发性能越限工单'
                        // +'</div>'
                        // +'<div class="infobroadcastmessage">'
                        //  +'故障恢复消息（7月24日）：<br>中国博览会会展中心A0馆NL9W_140 于22:57:08故障恢复。'
                        // +'</div>'
                        // +'<div class="infobroadcastmessage">'
                        //  +'故障消息（7月24日）：<br>中国博览会会展中心A0馆NL9W_140 于22:23:47发生（告警标题），目前已派单SH-051-20180724-08712。'
                        // +'</div>'
                        // +'<div class="infobroadcastmessage">'
                        //  +'故障恢复消息（7月19日）：<br>中国博览会会展中心-街道站6NL1H_54 于01:00:12故障恢复。'
                        // +'</div>'
                        // +'<div class="infobroadcastmessage">'
                        //  +'故障消息（7月18日）：<br>中国博览会会展中心-街道站6NL1H_54 于23:00:05发生（告警标题），目前已派单SH-051-20180718-07690。'
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
    
    var search='<div id="cellCountSearch" style="position:absolute;width:458px;height:70px;top:368px;right:107px;display:none"><div class="map-info-win-bg0"></div>'
        +'<div class="map-info-win-content" style="font-size:1.6em;height:100%;text-align:left;padding:5px 5px 5px 15px;">'
            +'<input id="mapSearch" style="color:#000000;font-size:18px;width:95%;border-radius:10px;height:45px;padding: 5px 0 0 10px;" placeholder="基站名称、小区名称、LAC:CI、应急资源名称"/>'
        +'</div>'
        +'</div>';
    search += '<div id="searchMagnifyingGlass" title="搜索" style="position:absolute;width:70px;height:70px;top:368px;right:30px;cursor:pointer"><div class="iconMagnifyingGlass"></div></div>';    
    search += '<div id="legendControlBtn" title="图例" style="display:none;position:absolute;width:70px;height:70px;top:304px;right:37px;cursor:pointer"><div class="iconLegendControlBtn"></div><div>';    
    $('#'+this.divId).append(search);
    
    $('#mapSearch').on('keypress',this.startSearch.bind(this));
     
    $('#cellCount').on('click',this.resetCenter.bind(this));

    $('#searchMagnifyingGlass').on('click',this.showCellCountSearch.bind(this));
    $('#legendControlBtn').on('click',this.showLegendPopup.bind(this));
    
    var infoWinList='<div id="infoWinList" style="width:42em;position:absolute;top:155px;left:10px;"></div>';
    
    $('#'+this.divId).append(infoWinList);
    
    var parentDom=$('#infoWinList')[0];
    
    this.infoWin00=new CIIE.MapInfoWin('咪咕视频',parentDom,this.infoWinClosed.bind(this));
    this.infoWin0=new CIIE.MapInfoWin('应用小类业务量TOP5',parentDom,this.infoWinClosed.bind(this));
    this.infoWin1=new CIIE.MapInfoWin('高流量小区TOP5',parentDom,this.infoWinClosed.bind(this));
    this.infoWin2=new CIIE.MapInfoWin('低LTE无线接通率TOP5',parentDom,this.infoWinClosed.bind(this));
    this.infoWin3=new CIIE.MapInfoWin('低GSM无线接通率TOP5',parentDom,this.infoWinClosed.bind(this));
    this.infoWin4=new CIIE.MapInfoWin('WIFI流量',parentDom,this.infoWinClosed.bind(this));
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


CIIE.Map.prototype.showLegendPopup=function(){

    var hotMapMenue1_flag = $("#hotMapMenue1").css('display');
    var hotMapMenue2_flag = $("#hotMapMenue2").css('display');
    var hotMapMenue3_flag = $("#hotMapMenue3").css('display');
    var hotMapMenue4_flag = $("#hotMapMenue4").css('display');

    if(hotMapMenue1_flag == "block" || hotMapMenue2_flag == "block" || hotMapMenue3_flag == "block" || hotMapMenue4_flag == "block"){
        $("#hotMapMenue1").hide();
        $("#hotMapMenue2").hide();
        $("#hotMapMenue3").hide();
        $("#hotMapMenue4").hide();
    }else{
        $("#hotMapMenue1").hide();
        $("#hotMapMenue2").hide();
        $("#hotMapMenue3").hide();
        $("#hotMapMenue4").hide();
        var willShowLegendId = '';
        $('.protectiveheatlayer').each(function(index, el) {
            if($(el).hasClass('mapCtrlItemSelected')){
                var func = $(el).attr('func');
                switch (func){
                    case "全网热力图" :
                        willShowLegendId = 'hotMapMenue3';
                        break;
                    case "全景热力图" :
                        willShowLegendId = 'hotMapMenue1';
                        break;
                    case "场景热力图" :
                        willShowLegendId = 'hotMapMenue2';
                        break;
                    case "路段热力图" :
                        willShowLegendId = 'hotMapMenue4';
                        break;
                    default :
                      console.error("尚未获取到图例id");
                }


            };
        });


        $("#"+willShowLegendId).show();

    }





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
        this.map.removeLayer(this.markersLayerSearchPre);
        this.markersLayerSearchPre = new L.featureGroup();
        this.map.addLayer(this.markersLayerSearchPre);

        this.map.removeLayer(this.markersLayerPin);
        this.markersLayerPin = new L.featureGroup();
        this.map.addLayer(this.markersLayerPin);

        var list=this.cellMarkerCache;
        var target=$('#mapSearch').val();
        for(var i=0;i<list.length;i++){
            var marker=list[i];
            var info=marker.info;
            //if(info.name==target||info.lacci==target){
            if(info.name.indexOf(target) > -1||info.lacci==target){
//              $('.leaflet-marker-icon').removeClass('mapMarkerHighlight');
//              $('.leaflet-marker-icon[title='+info.name+']').addClass('mapMarkerHighlight');
//              this.setView(info.lat,info.lng);
                this.locateCellFirstAddCell(info.lacci,info.name,info.lat,info.lng,false);  //定位前先加小区点,防止右屏联动,地图上没有

                console.log(info.lacci,info.name,info.lat,info.lng);
                //this.locateCell(info.lacci,info.name,info.lat,info.lng);
                //break;
            }else{
//              try{
//                  marker._icon.className=marker._icon.className.replace(' mapMarkerHighlight','');
//              }catch(e){}
                
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
    case 'WIFI流量':
        $('#acApWin').hide();
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
//      流量、人数、视频响应成功率、视频响应时延
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
    //var location={lat:31.195766,lon:121.308613};
    var location={lat:31.236593,lon:121.431933};
    if(this.locationMap[_hotspot]!=null){
        location=this.locationMap[_hotspot];
    }
    return location;
};

CIIE.Map.prototype.updatePercent=function(_hotspot){
      

   
    var totalPersonNum = $("#quickLocateItems").find('div[name="'+_hotspot+'"]').find('div.horizontalRow').eq(0).find('div.QLCKPI').eq(0).find('div').eq(2).find('span').eq(0).text();
    var _2gPersonNum = $("#quickLocateItems").find('div[name="'+_hotspot+'"]').find('div.horizontalRow').eq(1).find('div.QLCKPI').eq(0).find('div').eq(2).find('span').eq(0).text();
    var _4gPersonNum = $("#quickLocateItems").find('div[name="'+_hotspot+'"]').find('div.horizontalRow').eq(1).find('div.QLCKPI').eq(1).find('div').eq(2).find('span').eq(0).text();
    
    //随机测试数据

    var leftPercent1  = parseFloat((parseInt(totalPersonNum) / (parseInt(_2gPersonNum) + parseInt(_4gPersonNum))).toFixed(2) || 0 );
    
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
    var leftPercent2  = 95;
    
    if(false){
    //if(_hotspot=='J-外滩'){
    	 var ql=$('.QLCONTENT[name='+this.hotspot+']');
    	 
		var qlcTypeClass1 = "QLCNice";   //优
		var realPercent = 95;
		var  qlcTypeClass2 = "QLCNice";
		var  leftPercent2 = 95;

       ql.find('div.QLCProgress:eq(0)').find('div').css('left', realPercent+"%");
       ql.find('div.QLCProgress:eq(0)').parent().next().removeClass().addClass(qlcTypeClass1);


       ql.find('div.QLCProgress:eq(1)').find('div').css('left', leftPercent2+"%");
       ql.find('div.QLCProgress:eq(1)').parent().next().removeClass().addClass(qlcTypeClass2);

    }else{
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
                //if(_hotspot.indexOf(currObj.scene_name) !=-1 || _hotspot.indexOf('虹桥站') > -1){
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
                       excellentsmall_person = parseFloat(cfg_content.person.excellent[0]==""?0:cfg_content.person.excellent[0]);
                       excellentbig_person = parseFloat(cfg_content.person.excellent[1]);
                       goodsmall_person = parseFloat(cfg_content.person.good[0]);
                       goodbig_person = parseFloat(cfg_content.person.good[1]);
                       mediumsmall_person = parseFloat(cfg_content.person.medium[0]);
                       mediumbig_person = parseFloat(cfg_content.person.medium[1]);
                       poorsmall_person = parseFloat(cfg_content.person.poor[0]);
                       poorbig_person = parseFloat(cfg_content.person.poor[1]==""?200:cfg_content.person.poor[1]);
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

                   // if (_hotspot.indexOf('虹桥站') > -1||_hotspot.indexOf('外滩') > -1) {
                   //      qlcTypeClass1 = "QLCNice";   //优
                   //      realPercent = 95;
                   //      qlcTypeClass2 = "QLCNice";
                   //      leftPercent2 = 95;

                   // }

                   ql.find('div.QLCProgress:eq(0)').find('div').css('left', realPercent+"%");
                   ql.find('div.QLCProgress:eq(0)').parent().next().removeClass().addClass(qlcTypeClass1);


                   ql.find('div.QLCProgress:eq(1)').find('div').css('left', leftPercent2+"%");
                   ql.find('div.QLCProgress:eq(1)').parent().next().removeClass().addClass(qlcTypeClass2);



                }
            }



        }.bind(this));
    }


}


CIIE.Map.prototype.updateBaseStationTrouble=function(_hotspot){
    //var url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/area-re_cellByHotname?hotspot='+ encodeURIComponent(this.hotspot);
    var url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-alarm-hot?hotspot='+ encodeURIComponent(_hotspot);
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
        var total = result.total;
        //var total = 8;

        $('#quickLocateItems').find("div[name='"+_hotspot+"']").eq(1).find(".fontContentTitle.fontColorRed").eq(0).text(total);




    });

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
            //this.setView(location.lat,location.lon,14);
            this.setView(location.lat,location.lon,17);
        }else{
            this.setView(location.lat,location.lon,17);
        }
    }
    
    this.getCells(ignoreLocate);
    this.updateInfoWin();
    
    
};

CIIE.Map.prototype.resetCenter=function(){
    
//  var lon=this.hotspotInfo.lon*1- 0.0045;
//  var lat=this.hotspotInfo.lat*1+0.0025;
//  var bdPoint = this.wgs84tobd09(lon,lat);
//  var point = bdPoint.reverse();
//  this.setView(point[0],point[1]);
    
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
CIIE.Map.prototype.locateCell=function(lacci,cellName,lat,lon,donotReset,Belonged){   // Belonged 右屏钻取时间粒度判断  15  /  1
    this.setView(lat,lon,18);
    
    if(this.map.hasLayer(this.markersLayerPin)){
        if(donotReset==true){
            this.map.removeLayer(this.markersLayerPin);
            this.markersLayerPin = new L.featureGroup();
            this.map.addLayer(this.markersLayerPin);
        }
    }else{
        this.map.addLayer(this.markersLayerPin);
    }


    
     
    if(lacci!=null){
        //var urlNew='../maptip/deviceDetail.jsp'
        var urlNew='../maptip/deviceDetailNew.jsp'
            +'?cellname='+encodeURIComponent(name)
            +'&lacci='+encodeURIComponent(lacci)
            +'&Belonged='+encodeURIComponent(Belonged)
        
        var heatPopup4G = L.popup({maxWidth:1100,maxHeight:849,offset:L.point(0, 5),autoPanPaddingTopLeft:L.point(-30, 240),closeButton:true, closeOnClick:false})
         .setLatLng([lat,lon]);
        heatPopup4G.setContent('<iframe allowtransparency="true" width="1001px" ondblclick="alert();" frameborder="no" height="840px" src="'+urlNew+'"></iframe>');




        //添加 dom
        var selfPopupStr = '';
            selfPopupStr += '<div id="cellcell_" class="cellcell_" style="position:absolute;top:50%;left:50%;margin-top:-372px;margin-left:-472px;width:1008px;height:833px;overflow:hidden;display:none;">'
            
            selfPopupStr += '<div class="maptipbg" style="width:100%;height:100%;padding:0px;overflow:hidden;">'
            //selfPopupStr += '<div class="map-info-win-title2">'
            //selfPopupStr += '<div class="wifiWinIcon" style="float:left;display:none"></div>'
            //selfPopupStr += '<div id="popuptitle" style="float:left;margin-left: 10px;">'+name+'</div>'
            //selfPopupStr += '</div>'
            selfPopupStr += '<div style="clear:both;"></div>'
            selfPopupStr += '<iframe id="cellListIframe" src="" frameborder="0" allowtransparency="true" style="border-radius:10px;width:1100px;height:849px;"></iframe>';
            selfPopupStr += '</div>'



            selfPopupStr += '<div class="cellcellClose_ map-icon-close" style="position:absolute;right:9px;top:6px;"></div>';
            selfPopupStr += '</div>';


            if($('#cellcell_').length==0){
                $('#map').parent().append(selfPopupStr);
                $('.cellcellClose_').off().on('click',function(){
                    $('.cellcell_').hide();
                });
            }







        //L.marker([lat,lon],{title: cellName, icon: this.marker_pin, keepInView:false}).bindPopup(heatPopup4G).addTo(this.markersLayerPin);
        L.marker([lat,lon],{titleName: cellName, icon: this.marker_pin, keepInView:false}).on('mouseover', function(event) {
                                    console.log(event);
                                    if(event.originalEvent){
                                        var x = event.originalEvent.x;
                                        var y = event.originalEvent.y + 37;
                                        $("#circleTitle").text(event.target.options.titleName);
                                        $("#circleTitle").css({top: y,left: x});
                                        $("#circleTitle").show();
                                    }
                                }).on('mouseout', function(event) {
                                    if(event.originalEvent) {
                                        $("#circleTitle").hide();
                                    }
                                }).on('click',function(){clickEvent(this);}).addTo(this.markersLayerPin);
        function clickEvent(ee){
            //var i = ee.options.num; 
            $('#cellcell_').off().show();
            $("#cellListIframe").attr('src', urlNew);
            CIIE.Map.prototype.hideAllMenue();
        };




    }else{
        L.marker([lat,lon],{title: cellName, icon: this.marker_pin, keepInView:false}).addTo(this.markersLayerPin);
    }
    
    var list=this.cellMarkerCache;
//  //收起所有
//  for(i=0;i<list.length;i++){
//      var marker=list[i];
//      try{
//          if(marker.options.title==cellName){
//              marker._icon.className=marker._icon.className.replace(' mapMarkerHighlight','')+' mapMarkerHighlight';
////                var content=marker._popup.getContent();
////                var popup = L.popup({maxWidth:800,maxHeight:800,offset:L.point(0, 5),closeButton:true, closeOnClick:false})
////                .setLatLng([lat,lng]);
////                popup.setContent(content);
//                 break;
//          }else{
//              marker._icon.className=marker._icon.className.replace(' mapMarkerHighlight','');
//          }
//      }catch(e){
//          //console.log(marker.options.title+' mapMarkerHighlight error');
//      }
//  }
};
CIIE.Map.prototype.locateCellFirstAddCell=function(lacci,name_,lat_,lng_,donotReset,Belonged){    // Belonged 右屏钻取时间粒度判断  15  /  1
    $("#cellcell_").hide();
    if(this.map.hasLayer(this.markersLayerSearchPre)){
        if(donotReset==true){
            this.map.removeLayer(this.markersLayerSearchPre);

            this.markersLayerSearchPre = new L.featureGroup();
            this.map.addLayer(this.markersLayerSearchPre);
        }
    }else{
        this.map.addLayer(this.markersLayerSearchPre);
    }

    //添加 dom
    var selfPopupStr = '';
        selfPopupStr += '<div id="cellcell_" class="cellcell_" style="position:absolute;top:50%;left:50%;margin-top:-372px;margin-left:-598px;width:1008px;height:833px;overflow:hidden;display:none;">'
        
        selfPopupStr += '<div class="maptipbg" style="width:100%;height:100%;padding:0px;overflow:hidden;">'
        //selfPopupStr += '<div class="map-info-win-title2">'
        //selfPopupStr += '<div class="wifiWinIcon" style="float:left;display:none"></div>'
        //selfPopupStr += '<div id="popuptitle" style="float:left;margin-left: 10px;">'+name+'</div>'
        //selfPopupStr += '</div>'
        selfPopupStr += '<div style="clear:both;"></div>'
        selfPopupStr += '<iframe id="cellListIframe" src="" frameborder="0" allowtransparency="true" style="border-radius:10px;width:1100px;height:849px;"></iframe>';
        selfPopupStr += '</div>'



        selfPopupStr += '<div class="cellcellClose_ map-icon-close" style="position:absolute;right:9px;top:6px;"></div>';
        selfPopupStr += '</div>';


        if($('#cellcell_').length==0){
            $('#map').parent().append(selfPopupStr);
            $('.cellcellClose_').off().on('click',function(){
                $('.cellcell_').hide();
            });
        }


    //获取数据
    //this.cdm=LSMScreen.CacheDataManager.getInstance();
    if ( lacci== undefined || lacci=="undefined") {return;};
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
           
            //if(iswgs84tobd09){
            if(true){
                var bdPoint = this.wgs84tobd09(lon,lat); 
                var point = bdPoint.reverse();
                lat = point[0];
                lon = point[1];
            }
            var type = '4G';
            if (cell_nt =="gsm") {type = '2G';};
            var station_type = record.station_type;  //小区基站类型 



            var lg_subtype = ""; 
            if(record.lg_subtype === null || record.lg_subtype === '-') {
                lg_subtype = "TDD-D";
            }else{
                lg_subtype = record.lg_subtype;
            };
            
            var hori_direc_angle = 0;
            if(record.hori_direc_angle === null || record.hori_direc_angle === '-') {
                hori_direc_angle = 0;
            }else{
                hori_direc_angle = parseFloat(record.hori_direc_angle);
            };
            // if(true) {
            //     hori_direc_angle = Math.random()*360;
            // };

            var startAngle = parseFloat(hori_direc_angle) - parseFloat(20);
            var stopAngle = parseFloat(hori_direc_angle) + parseFloat(20);




            var hotspot=this.hotspot;
            //var urlNew='../maptip/deviceDetail.jsp?hotspot='+encodeURIComponent(hotspot)
            var urlNew='../maptip/deviceDetailNew.jsp?hotspot='+encodeURIComponent(hotspot)
                        +'&cellname='+encodeURIComponent(cell_name)
                        +'&nettype='+encodeURIComponent(cell_nt)
                        +'&lacci='+encodeURIComponent(lacci)
                        +'&Belonged='+encodeURIComponent(Belonged)
            var heatPopup4G = L.popup({maxWidth:1100,maxHeight:849,offset:L.point(0, 5),autoPanPaddingTopLeft:L.point(-30, 240),closeButton:true, closeOnClick:false})
                .setLatLng([lat,lon]);
            heatPopup4G.setContent('<iframe allowtransparency="true" width="1001px" ondblclick="alert();" frameborder="no" height="840px" src="'+urlNew+'"></iframe>');
            

            //处理非扇形数据
            var circle = null;
            console.log(station_type);
            if (station_type == null) {
                if(type === '4G'){
                    marker=L.marker([lat,lon],{titleName: cell_name, _hotspot:hotspot,_name:cell_name,_type:cell_nt,_lacci:lacci, icon: this.marker4G_l, keepInView:false}).on('mouseover', function(event) {
                                    console.log(event);
                                    if(event.originalEvent){
                                        var x = event.originalEvent.x;
                                        var y = event.originalEvent.y + 37;
                                        $("#circleTitle").text(event.target.options.titleName);
                                        $("#circleTitle").css({top: y,left: x});
                                        $("#circleTitle").show();
                                    }
                                }).on('mouseout', function(event) {
                                    if(event.originalEvent) {
                                        $("#circleTitle").hide();
                                    }
                                }).on('click',function(){clickEvent(this);}).addTo(this.markersLayerSearchPre);
                }else if(type === '2G'){
                    marker=L.marker([lat,lon],{titleName: cell_name, _hotspot:hotspot,_name:cell_name,_type:cell_nt,_lacci:lacci, icon: this.marker2G_l, keepInView:false}).on('mouseover', function(event) {
                                    console.log(event);
                                    if(event.originalEvent){
                                        var x = event.originalEvent.x;
                                        var y = event.originalEvent.y + 37;
                                        $("#circleTitle").text(event.target.options.titleName);
                                        $("#circleTitle").css({top: y,left: x});
                                        $("#circleTitle").show();
                                    }
                                }).on('mouseout', function(event) {
                                    if(event.originalEvent) {
                                        $("#circleTitle").hide();
                                    }
                                }).on('click',function(){clickEvent(this);}).addTo(this.markersLayerSearchPre);
                };
            }
            if (station_type && station_type.indexOf('宏站') == -1 && station_type.indexOf('街道站') == -1 && station_type.indexOf('室内') == -1 ) {
                if(type === '4G'){
                    marker=L.marker([lat,lon],{titleName: cell_name, _hotspot:hotspot,_name:cell_name,_type:cell_nt,_lacci:lacci, icon: this.marker4G_l, keepInView:false}).on('mouseover', function(event) {
                                    console.log(event);
                                    if(event.originalEvent){
                                        var x = event.originalEvent.x;
                                        var y = event.originalEvent.y + 37;
                                        $("#circleTitle").text(event.target.options.titleName);
                                        $("#circleTitle").css({top: y,left: x});
                                        $("#circleTitle").show();
                                    }
                                }).on('mouseout', function(event) {
                                    if(event.originalEvent) {
                                        $("#circleTitle").hide();
                                    }
                                }).on('click',function(){clickEvent(this);}).addTo(this.markersLayerSearchPre);
                }else if(type === '2G'){
                    marker=L.marker([lat,lon],{titleName: cell_name, _hotspot:hotspot,_name:cell_name,_type:cell_nt,_lacci:lacci, icon: this.marker2G_l, keepInView:false}).on('mouseover', function(event) {
                                    console.log(event);
                                    if(event.originalEvent){
                                        var x = event.originalEvent.x;
                                        var y = event.originalEvent.y + 37;
                                        $("#circleTitle").text(event.target.options.titleName);
                                        $("#circleTitle").css({top: y,left: x});
                                        $("#circleTitle").show();
                                    }
                                }).on('mouseout', function(event) {
                                    if(event.originalEvent) {
                                        $("#circleTitle").hide();
                                    }
                                }).on('click',function(){clickEvent(this);}).addTo(this.markersLayerSearchPre);
                };
            }
            

            //添加扇形(室外小区)
            var circle = null;
            if (station_type && ( station_type.indexOf('杆站') >-1 || station_type.indexOf('宏站') >-1 || station_type.indexOf('街道站') >-1 || station_type.indexOf('室外覆盖') >-1 )) {
                if (lg_subtype == "TDD-D") {
                    var radius = 125;var color = '#408b22';
                    //marker=L.marker([lat,lon],{title: cell_name, icon: this.markertestPng, keepInView:false}).addTo(this.shangxingLayerTDD_D);
                    circle = L.circle([lat,lon], radius, {fill: true,_hotspot:hotspot,_name:cell_name,_type:cell_nt,_lacci:lacci,weight:1,className:name,fillColor: color,fillOpacity: 0.9,color: color,opacity: 0.9,startAngle: startAngle,stopAngle: stopAngle,pointerEvents:"auto"}).on('mouseover', function(event) {
                                console.log(event);
                                if(event.containerPoint) {
                                    var x = event.containerPoint.x;
                                    var y = event.containerPoint.y + 37;
                                    $("#circleTitle").text(event.target.options._name);
                                    $("#circleTitle").css({top: y,left: x});
                                    $("#circleTitle").show();
                                }
                            }).on('mouseout', function(event) {
                                if(event.containerPoint) {
                                    $("#circleTitle").hide();
                                }
                            }).on('click',function(){clickEvent(this);}).addTo(this.markersLayerSearchPre);
                }else if (lg_subtype == "TDD-E") {
                    var radius = 110;var color = '#5ba931';
                    //marker=L.marker([lat,lon],{title: cell_name, icon: this.markertestPng, keepInView:false}).addTo(this.shangxingLayerTDD_E);
                    circle = L.circle([lat,lon], radius, {fill: true,_hotspot:hotspot,_name:cell_name,_type:cell_nt,_lacci:lacci,weight:1,className:name,fillColor: color,fillOpacity: 0.9,color: color,opacity: 0.9,startAngle: startAngle,stopAngle: stopAngle,pointerEvents:"auto"}).on('mouseover', function(event) {
                                console.log(event);
                                if(event.containerPoint) {
                                    var x = event.containerPoint.x;
                                    var y = event.containerPoint.y + 37;
                                    $("#circleTitle").text(event.target.options._name);
                                    $("#circleTitle").css({top: y,left: x});
                                    $("#circleTitle").show();
                                }
                            }).on('mouseout', function(event) {
                                if(event.containerPoint) {
                                    $("#circleTitle").hide();
                                }
                            }).on('click',function(){clickEvent(this);}).addTo(this.markersLayerSearchPre);
                }else if (lg_subtype == "TDD-F") {
                    var radius = 95;var color = '#a8cf42';
                    //marker=L.marker([lat,lon],{title: cell_name, icon: this.markertestPng, keepInView:false}).addTo(this.shangxingLayerTDD_F);
                    circle = L.circle([lat,lon], radius, {fill: true,_hotspot:hotspot,_name:cell_name,_type:cell_nt,_lacci:lacci,weight:1,className:name,fillColor: color,fillOpacity: 0.9,color: color,opacity: 0.9,startAngle: startAngle,stopAngle: stopAngle,pointerEvents:"auto"}).on('mouseover', function(event) {
                                console.log(event);
                                if(event.containerPoint) {
                                    var x = event.containerPoint.x;
                                    var y = event.containerPoint.y + 37;
                                    $("#circleTitle").text(event.target.options._name);
                                    $("#circleTitle").css({top: y,left: x});
                                    $("#circleTitle").show();
                                }
                            }).on('mouseout', function(event) {
                                if(event.containerPoint) {
                                    $("#circleTitle").hide();
                                }
                            }).on('click',function(){clickEvent(this);}).addTo(this.markersLayerSearchPre);
                }else if (lg_subtype == "FDD") {
                    var radius = 80;var color = '#d7e6af';
                    //marker=L.marker([lat,lon],{title: cell_name, icon: this.markertestPng, keepInView:false}).addTo(this.shangxingLayerFDD_S);
                    circle = L.circle([lat,lon], radius, {fill: true,_hotspot:hotspot,_name:cell_name,_type:cell_nt,_lacci:lacci,weight:1,className:name,fillColor: color,fillOpacity: 0.9,color: color,opacity: 0.9,startAngle: startAngle,stopAngle: stopAngle,pointerEvents:"auto"}).on('mouseover', function(event) {
                                console.log(event);
                                if(event.containerPoint) {
                                    var x = event.containerPoint.x;
                                    var y = event.containerPoint.y + 37;
                                    $("#circleTitle").text(event.target.options._name);
                                    $("#circleTitle").css({top: y,left: x});
                                    $("#circleTitle").show();
                                }
                            }).on('mouseout', function(event) {
                                if(event.containerPoint) {
                                    $("#circleTitle").hide();
                                }
                            }).on('click',function(){clickEvent(this);}).addTo(this.markersLayerSearchPre);
                }else if (lg_subtype == "900M") {
                    var radius = 65;var color = '#3333cc';
                    circle = L.circle([lat,lon], radius, {fill: true,_hotspot:hotspot,_name:cell_name,_type:cell_nt,_lacci:lacci,weight:1,className:name,fillColor: color,fillOpacity: 0.9,color: color,opacity: 0.9,startAngle: startAngle,stopAngle: stopAngle,pointerEvents:"auto"}).on('mouseover', function(event) {
                                console.log(event);
                                if(event.containerPoint) {
                                    var x = event.containerPoint.x;
                                    var y = event.containerPoint.y + 37;
                                    $("#circleTitle").text(event.target.options._name);
                                    $("#circleTitle").css({top: y,left: x});
                                    $("#circleTitle").show();
                                }
                            }).on('mouseout', function(event) {
                                if(event.containerPoint) {
                                    $("#circleTitle").hide();
                                }
                            }).on('click',function(){clickEvent(this);}).addTo(this.markersLayerSearchPre);
                    //marker=L.marker([lat,lon],{title: cell_name, icon: this.markertestPng, keepInView:false}).addTo(this.shangxingLayer900M);
                }else if (lg_subtype == "1800M") {
                    var radius = 50;var color = '#3399cc';
                    //marker=L.marker([lat,lon],{title: cell_name, icon: this.markertestPng, keepInView:false}).addTo(this.shangxingLayer1800M);
                    circle = L.circle([lat,lon], radius, {fill: true,_hotspot:hotspot,_name:cell_name,_type:cell_nt,_lacci:lacci,weight:1,className:name,fillColor: color,fillOpacity: 0.9,color: color,opacity: 0.9,startAngle: startAngle,stopAngle: stopAngle,pointerEvents:"auto"}).on('mouseover', function(event) {
                                console.log(event);
                                if(event.containerPoint) {
                                    var x = event.containerPoint.x;
                                    var y = event.containerPoint.y + 37;
                                    $("#circleTitle").text(event.target.options._name);
                                    $("#circleTitle").css({top: y,left: x});
                                    $("#circleTitle").show();
                                }
                            }).on('mouseout', function(event) {
                                if(event.containerPoint) {
                                    $("#circleTitle").hide();
                                }
                            }).on('click',function(){clickEvent(this);}).addTo(this.markersLayerSearchPre);
                }; 
            }

            //添加圆形 (室内小区)
            var circleC = null;
            var startAngleC = 0;
            var stopAngleC = 360;
            if (station_type && (station_type.indexOf('室分') >-1 || station_type.indexOf('微站') >-1 || station_type.indexOf('室内覆盖') >-1 )) {
                if (lg_subtype == "TDD-D") {
                    var radius = 125;var color = '#408b22';
                    //marker=L.marker([lat,lon],{title: cell_name, icon: this.markertestPng, keepInView:false}).addTo(this.shangxingLayerTDD_D);
                    circleC = L.circle([lat,lon], radius/3, {fill: true,_hotspot:hotspot,_name:cell_name,_type:cell_nt,_lacci:lacci,weight:1,className:name,fillColor: color,fillOpacity: 0.9,color: color,opacity: 0.9,startAngle: startAngleC,stopAngle: stopAngleC,pointerEvents:"auto"}).on('mouseover', function(event) {
                                console.log(event);
                                if(event.containerPoint) {
                                    var x = event.containerPoint.x;
                                    var y = event.containerPoint.y + 37;
                                    $("#circleTitle").text(event.target.options._name);
                                    $("#circleTitle").css({top: y,left: x});
                                    $("#circleTitle").show();
                                }
                            }).on('mouseout', function(event) {
                                if(event.containerPoint) {
                                    $("#circleTitle").hide();
                                }
                            }).on('click',function(){clickEvent(this);}).addTo(this.markersLayerSearchPre);
                }else if (lg_subtype == "TDD-E") {
                    var radius = 110;var color = '#5ba931';
                    //marker=L.marker([lat,lon],{title: cell_name, icon: this.markertestPng, keepInView:false}).addTo(this.shangxingLayerTDD_E);
                    circleC = L.circle([lat,lon], radius/3, {fill: true,_hotspot:hotspot,_name:cell_name,_type:cell_nt,_lacci:lacci,weight:1,className:name,fillColor: color,fillOpacity: 0.9,color: color,opacity: 0.9,startAngle: startAngleC,stopAngle: stopAngleC,pointerEvents:"auto"}).on('mouseover', function(event) {
                                console.log(event);
                                if(event.containerPoint) {
                                    var x = event.containerPoint.x;
                                    var y = event.containerPoint.y + 37;
                                    $("#circleTitle").text(event.target.options._name);
                                    $("#circleTitle").css({top: y,left: x});
                                    $("#circleTitle").show();
                                }
                            }).on('mouseout', function(event) {
                                if(event.containerPoint) {
                                    $("#circleTitle").hide();
                                }
                            }).on('click',function(){clickEvent(this);}).addTo(this.markersLayerSearchPre);
                }else if (lg_subtype == "TDD-F") {
                    var radius = 95;var color = '#a8cf42';
                    //marker=L.marker([lat,lon],{title: cell_name, icon: this.markertestPng, keepInView:false}).addTo(this.shangxingLayerTDD_F);
                    circleC = L.circle([lat,lon], radius/3, {fill: true,_hotspot:hotspot,_name:cell_name,_type:cell_nt,_lacci:lacci,weight:1,className:name,fillColor: color,fillOpacity: 0.9,color: color,opacity: 0.9,startAngle: startAngleC,stopAngle: stopAngleC,pointerEvents:"auto"}).on('mouseover', function(event) {
                                console.log(event);
                                if(event.containerPoint) {
                                    var x = event.containerPoint.x;
                                    var y = event.containerPoint.y + 37;
                                    $("#circleTitle").text(event.target.options._name);
                                    $("#circleTitle").css({top: y,left: x});
                                    $("#circleTitle").show();
                                }
                            }).on('mouseout', function(event) {
                                if(event.containerPoint) {
                                    $("#circleTitle").hide();
                                }
                            }).on('click',function(){clickEvent(this);}).addTo(this.markersLayerSearchPre);
                }else if (lg_subtype == "FDD") {
                    var radius = 80;var color = '#d7e6af';
                    //marker=L.marker([lat,lon],{title: cell_name, icon: this.markertestPng, keepInView:false}).addTo(this.shangxingLayerFDD_S);
                    circleC = L.circle([lat,lon], radius/3, {fill: true,_hotspot:hotspot,_name:cell_name,_type:cell_nt,_lacci:lacci,weight:1,className:name,fillColor: color,fillOpacity: 0.9,color: color,opacity: 0.9,startAngle: startAngleC,stopAngle: stopAngleC,pointerEvents:"auto"}).on('mouseover', function(event) {
                                console.log(event);
                                if(event.containerPoint) {
                                    var x = event.containerPoint.x;
                                    var y = event.containerPoint.y + 37;
                                    $("#circleTitle").text(event.target.options._name);
                                    $("#circleTitle").css({top: y,left: x});
                                    $("#circleTitle").show();
                                }
                            }).on('mouseout', function(event) {
                                if(event.containerPoint) {
                                    $("#circleTitle").hide();
                                }
                            }).on('click',function(){clickEvent(this);}).addTo(this.markersLayerSearchPre);
                }else if (lg_subtype == "900M") {
                    var radius = 65;var color = '#0559F9';
                    circleC = L.circle([lat,lon], radius/3, {fill: true,_hotspot:hotspot,_name:cell_name,_type:cell_nt,_lacci:lacci,weight:1,className:name,fillColor: color,fillOpacity: 0.9,color: color,opacity: 0.9,startAngle: startAngleC,stopAngle: stopAngleC,pointerEvents:"auto"}).on('mouseover', function(event) {
                                console.log(event);
                                if(event.containerPoint) {
                                    var x = event.containerPoint.x;
                                    var y = event.containerPoint.y + 37;
                                    $("#circleTitle").text(event.target.options._name);
                                    $("#circleTitle").css({top: y,left: x});
                                    $("#circleTitle").show();
                                }
                            }).on('mouseout', function(event) {
                                if(event.containerPoint) {
                                    $("#circleTitle").hide();
                                }
                            }).on('click',function(){clickEvent(this);}).addTo(this.markersLayerSearchPre);
                    //marker=L.marker([lat,lon],{title: cell_name, icon: this.markertestPng, keepInView:false}).addTo(this.shangxingLayer900M);
                }else if (lg_subtype == "1800M") {
                    var radius = 50;var color = '#608EE6';
                    //marker=L.marker([lat,lon],{title: cell_name, icon: this.markertestPng, keepInView:false}).addTo(this.shangxingLayer1800M);
                    circleC = L.circle([lat,lon], radius/3, {fill: true,_hotspot:hotspot,_name:cell_name,_type:cell_nt,_lacci:lacci,weight:1,className:name,fillColor: color,fillOpacity: 0.9,color: color,opacity: 0.9,startAngle: startAngleC,stopAngle: stopAngleC,pointerEvents:"auto"}).on('mouseover', function(event) {
                                console.log(event);
                                if(event.containerPoint) {
                                    var x = event.containerPoint.x;
                                    var y = event.containerPoint.y + 37;
                                    $("#circleTitle").text(event.target.options._name);
                                    $("#circleTitle").css({top: y,left: x});
                                    $("#circleTitle").show();
                                }
                            }).on('mouseout', function(event) {
                                if(event.containerPoint) {
                                    $("#circleTitle").hide();
                                }
                            }).on('click',function(){clickEvent(this);}).addTo(this.markersLayerSearchPre);
                }; 










            }


            function clickEvent(ee){
                //var i = ee.options.num; 
                var hotspot = ee.options._hotspot; 
                var name = ee.options._name; 
                var type = ee.options._type; 
                var lacci = ee.options._lacci; 
                console.log("cellclee" + i);
                console.log("Belonged" + Belonged);

                var urlNew='../maptip/deviceDetailNew.jsp?hotspot='+encodeURIComponent(hotspot)
                        +'&cellname='+encodeURIComponent(name)
                        +'&nettype='+encodeURIComponent(type)
                        +'&lacci='+encodeURIComponent(lacci)
                        +'&Belonged='+encodeURIComponent(Belonged)
                $('#cellcell_').off().show();
                $("#cellListIframe").attr('src', urlNew);
                CIIE.Map.prototype.hideAllMenue();
            };


            // if(type === '4G'){
            //     marker=L.marker([lat,lon],{title: cell_name, icon: this.marker4G_l, keepInView:false}).bindPopup(heatPopup4G).addTo(this.markersLayerSearchPre);
            // }else if(type === '2G'){
            //     marker=L.marker([lat,lon],{title: cell_name, icon: this.marker2G_l, keepInView:false}).bindPopup(heatPopup4G).addTo(this.markersLayerSearchPre);
            // };

            


            
        };
        //this.map.addLayer(this.markersLayerSearchPre);
        //this.locateCell(lacci,name_,lat_,lng_);

        //console.log(lat,lon);
        this.locateCell(lacci,name_,lat,lon,donotReset,Belonged);
        
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

    // //虹桥站
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

    var map=this.map;
    var curZoom = map.getZoom();
    var iconSizeFont = [294*12/15,81*12/15];
    switch (curZoom){
        case 10:
            iconSizeFont = [294*4/15,81*4/15];;
            break;
        case 11:
            iconSizeFont = [294*5/15,81*5/15];
            break;
        case 12:
            iconSizeFont = [294*6/15,81*6/15];
            break;
        case 13:
            iconSizeFont = [294*7/17,81*5/15];
            break;
        case 14:
            iconSizeFont = [294*7/15,81*7/15];
            break;
        case 15:
            iconSizeFont = [294*9/15,81*9/15];
            break;
        case 16:
            iconSizeFont = [294*10/15,81*10/15];
            break;
        case 17:
            iconSizeFont = [294*11/15,81*11/15];
            break;
        default:
            iconSizeFont = [294*12/15,81*12/15];
            break;
    }

    
    
    var iconPd=L.icon({
        iconUrl: this.ctx+'/static/styles/local-lsm/map/pdtitle.png',
        //iconSize: [294*2/3, 81*2/3]
        //iconSize: [294*12/15,81*12/15]
        iconSize: iconSizeFont
    });
    var iconHq=L.icon({
        iconUrl: this.ctx+'/static/styles/local-lsm/map/hqtitle.png',
        //iconSize: [294*12/15,81*12/15]
        iconSize: iconSizeFont
    });
    var iconHqT=L.icon({
        iconUrl: this.ctx+'/static/styles/local-lsm/map/hqttitle.png',
        //iconSize: [294*12/15,81*12/15]
        iconSize: iconSizeFont
    });
    this.pdtitle = L.marker([31.1573, 121.81179],{title: '浦东机场', icon: iconPd, keepInView:false}).addTo(this.map);
    this.hqtitle = L.marker([31.201449, 121.345336],{title: '虹桥机场', icon: iconHq, keepInView:false}).addTo(this.map);
    this.hqttitle =L.marker([31.200322, 121.327424],{title: '虹桥站', icon: iconHqT, keepInView:false}).addTo(this.map);





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
//      'click': function (e) { 
//          this.showModel();
//      }.bind(this)
//    });
    
};
CIIE.Map.prototype.showModel=function(){
    var src=$('#modelFrame').attr('src');
    $('#modelFrame').css('z-index',2);
    $('#modelframereturn').css('z-index',3);
    var display=$('#modelFrame').css('visibility');
    if(display=='hidden'){
        $('#modelFrame').css('visibility','visible');
        $('#modelFrame').attr('src','unity/unityplayer/unityplayer.html?smooth='+$.cookie('dataSmooth'));
    }else{
        $('#modelFrame').css('visibility','hidden');
        $('#modelframereturn').attr('visibility','hidden');
        $('#modelFrame').attr('src',''); 
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
                // case '应急通信车'://应急车
                //     name='应急车';
                //     marker=L.marker([lat,lon],{title:'应急车', icon: this.markerYJC, keepInView:false}).addTo(this.markersLayerCAR);
                //     carCount++;
                //     break;
                case '应急油机车'://指挥车
                    name='指挥车';

                    var url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-rm-emer-car';
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

                        var data = result.data;
                        //var zhcConfig = this.commandVehicleConfig;
                        var zhcConfig = {};
                        for(var i= 0, len = data.length; i<len;++i){
                            if(data[i].lat && data[i].lon && data[i].lat != null && data[i].lon != null ){
                                if(data[i].number_id == "指挥车"){
                                    zhcConfig = data[i];

                                }
                            }
                        }    

                    //---------------------------------------------------------------------------------------------------------------------------
                        var latHeatMap = parseFloat(zhcConfig.lat),        
                        lngHeatMap = parseFloat(zhcConfig.lon);


                        var bdPoint = this.wgs84tobd09(lngHeatMap,latHeatMap);
                        var point = bdPoint.reverse();
                        //if(point.length !== 2) continue;


                        var lat=latHeatMap;
                        var lng=lngHeatMap;


                        
                        var number_id = zhcConfig.number_id == "无"?"应急车":zhcConfig.number_id;

                        var car_license_tag = zhcConfig.car_license_tag == null?"":zhcConfig.car_license_tag;    
                        var car_model = zhcConfig.car_model == null?"":zhcConfig.car_model;    
                        var car_manufacturer = zhcConfig.car_manufacturer == null?"":zhcConfig.car_manufacturer;    
                        var contacts = zhcConfig.contacts == null?"":zhcConfig.contacts;    
                        var contact_tel = zhcConfig.contact_tel == null?"":zhcConfig.contact_tel;    
                        var transmission_mode = zhcConfig.transmission_mode == null?"":zhcConfig.transmission_mode;    
                        var network_mode = zhcConfig.network_mode == null?"":zhcConfig.network_mode;    
                        var gsm_station_name = zhcConfig.gsm_station_name == null?"":zhcConfig.gsm_station_name;    
                        var gsm_station_siteid = zhcConfig.gsm_station_siteid == null?"":zhcConfig.gsm_station_siteid;    
                        var lte_station_name = zhcConfig.lte_station_name == null?"":zhcConfig.lte_station_name;    
                        var lte_station_siteid = zhcConfig.lte_station_siteid == null?"":zhcConfig.lte_station_siteid;    
                        var gsm_equipment_manufacturer = zhcConfig.gsm_equipment_manufacturer == null?"":zhcConfig.gsm_equipment_manufacturer;    
                        var gsm_equipment_capacity = zhcConfig.gsm_equipment_capacity == null?"":zhcConfig.gsm_equipment_capacity;    
                        var gsm_equipment_frequency_band = zhcConfig.gsm_equipment_frequency_band == null?"":zhcConfig.gsm_equipment_frequency_band;    
                        var lte_equipment_manufacturer = zhcConfig.lte_equipment_manufacturer == null?"":zhcConfig.lte_equipment_manufacturer;    
                        var lte_equipment_capacity = zhcConfig.lte_equipment_capacity == null?"":zhcConfig.lte_equipment_capacity;    
                        var lte_equipment_frequency_band = zhcConfig.lte_equipment_frequency_band == null?"":zhcConfig.lte_equipment_frequency_band;    
                        var sd_company = zhcConfig.sd_company == null?"":zhcConfig.sd_company;    
                        var point_position = zhcConfig.point_position == null?"":zhcConfig.point_position;    
                        var working_condition = zhcConfig.working_condition == null?"":zhcConfig.working_condition;    
                        var bsc_model = zhcConfig.bsc_model == null?"":zhcConfig.bsc_model;  




                        var htmlStr = '';
                        htmlStr += '<div class="popup-content-wx" style="font-size: 30px;padding: 30px;">';
                        htmlStr += '<table style="width:100%;height:100%">'
                        htmlStr += '<tr>'
                        htmlStr += '<td class="htgrfse">车辆牌照：</td><td class="valueColor mapTipValueTdMinWidth">' + car_license_tag + '</td>'
                        htmlStr += '<td class="htgrfse">车辆型号：</td><td class="valueColor mapTipValueTdMinWidth">' + car_model + '</td>'
                        htmlStr += '</tr>'
                        // htmlStr += '<tr>'
                        // htmlStr += '</tr>'
                        htmlStr += '<tr>'
                        htmlStr += '<td class="htgrfse">车辆厂家：</td><td class="valueColor mapTipValueTdMinWidth">' + car_manufacturer + '</td>'
                        htmlStr += '<td class="htgrfse">联系人：</td><td class="valueColor mapTipValueTdMinWidth">' + contacts + '</td>'
                        htmlStr += '</tr>'
                        // htmlStr += '<tr>'
                        // htmlStr += '</tr>'
                        htmlStr += '<tr>'
                        htmlStr += '<td class="htgrfse">联系电话：</td><td class="valueColor mapTipValueTdMinWidth">' + contact_tel + '</td>'
                        htmlStr += '<td class="htgrfse">传输方式：</td><td class="valueColor mapTipValueTdMinWidth">' + transmission_mode + '</td>'
                        htmlStr += '</tr>'
                        // htmlStr += '<tr>'
                        // htmlStr += '</tr>'
                        htmlStr += '<tr>'
                        htmlStr += '<td class="htgrfse">网络制式：</td><td class="valueColor mapTipValueTdMinWidth">' + network_mode + '</td>'
                        //htmlStr += '<td class="htgrfse">2G车载站名：</td><td class="valueColor mapTipValueTdMinWidth">' + gsm_station_name + '</td>'
                        htmlStr += '<td class="htgrfse">2G设备容量：</td><td class="valueColor mapTipValueTdMinWidth">' + gsm_equipment_capacity + '</td>'
                        htmlStr += '</tr>'
                        // htmlStr += '<tr>'
                        // htmlStr += '</tr>'
                        htmlStr += '<tr>'
                        //htmlStr += '<td class="htgrfse">2G-SITEID：</td><td class="valueColor mapTipValueTdMinWidth">' + gsm_station_siteid + '</td>'
                        //htmlStr += '<td class="htgrfse">4G车载站名：</td><td class="valueColor mapTipValueTdMinWidth">' + lte_station_name + '</td>'
                        htmlStr += '</tr>'
                        // htmlStr += '<tr>'
                        // htmlStr += '</tr>'
                        htmlStr += '<tr>'
                        //htmlStr += '<td class="htgrfse">4G-SITEID：</td><td class="valueColor mapTipValueTdMinWidth">' + lte_station_siteid + '</td>'
                        //htmlStr += '<td class="htgrfse">2G设备厂家：</td><td class="valueColor mapTipValueTdMinWidth">' + gsm_equipment_manufacturer + '</td>'
                        htmlStr += '</tr>'
                        // htmlStr += '<tr>'
                        // htmlStr += '</tr>'
                        htmlStr += '<tr>'
                        htmlStr += '<td class="htgrfse">4G设备容量：</td><td class="valueColor mapTipValueTdMinWidth">' + lte_equipment_capacity + '</td>'
                        htmlStr += '<td class="htgrfse">4G设备频段：</td><td class="valueColor mapTipValueTdMinWidth">' + lte_equipment_frequency_band + '</td>'
                        //htmlStr += '<td class="htgrfse">2G设备频段：</td><td class="valueColor mapTipValueTdMinWidth">' + gsm_equipment_frequency_band + '</td>'
                        htmlStr += '</tr>'
                        // htmlStr += '<tr>'
                        // htmlStr += '</tr>'
                        htmlStr += '<tr>'
                        //htmlStr += '<td class="htgrfse">4G设备厂家：</td><td class="valueColor mapTipValueTdMinWidth">' + lte_equipment_manufacturer + '</td>'
                        htmlStr += '</tr>'
                        // htmlStr += '<tr>'
                        // htmlStr += '</tr>'
                        htmlStr += '<tr>'
                        htmlStr += '<td class="htgrfse">储备地点：</td><td class="valueColor mapTipValueTdMinWidth">' + sd_company + '</td>'
                        htmlStr += '<td class="htgrfse">工作状态：</td><td class="valueColor mapTipValueTdMinWidth">' + working_condition + '</td>'
                        htmlStr += '</tr>'
                        // htmlStr += '<tr>'
                        // htmlStr += '</tr>'
                        htmlStr += '<tr>'
                        //htmlStr += '<td class="htgrfse">驻点位置：</td><td class="valueColor mapTipValueTdMinWidth">' + point_position + '</td>'
                        htmlStr += '<td class="htgrfse">BSC型号：</td><td class="valueColor mapTipValueTdMinWidth">' + bsc_model + '</td>'
                        htmlStr += '</tr>'
                        // htmlStr += '<tr>'
                        // htmlStr += '</tr>'
                        htmlStr += '<tr>'
                        //htmlStr += '<td class="htgrfse">维护班组：</td><td class="valueColor mapTipValueTdMinWidth">' + '---' + '</td>'
                        htmlStr += '</tr>'
                        // htmlStr += '<tr>'
                        // htmlStr += '</tr>'
                        
                        htmlStr += '</table>'

                        htmlStr += '</div>';



                        //添加 dom
                        var selfPopupStr = '';
                            selfPopupStr += '<div id="yjc_single" class="yjc_" style="position:absolute;top:50%;left:50%;margin-top:-78px;margin-left:-436px;width:1150px;height:402px;overflow:hidden;display:none;">'
                            
                            selfPopupStr += '<div class="maptipbg" style="width:100%;height:100%;padding:0px;overflow:hidden;">'
                            selfPopupStr += '<div class="map-info-win-title2">'
                            selfPopupStr += '<div class="wifiWinIcon" style="float:left;display:none"></div>'
                            selfPopupStr += '<div id="popuptitle" style="float:left;margin-left: 10px;">'+number_id+'</div>'
                            selfPopupStr += '</div>'
                            selfPopupStr += '<div style="clear:both;"></div>'
                            //selfPopupStr += '<div id="yjc_content name="content" style="width:100%;">'
                            selfPopupStr += htmlStr;
                            //selfPopupStr += '</div>'
                            selfPopupStr += '</div>'



                            selfPopupStr += '<div class="yjcClose_ map-icon-close" style="position:absolute;right:5px;top:5px;"></div>';
                            selfPopupStr += '</div>';

                            $('#map').parent().append(selfPopupStr);
                            $('.yjcClose_').off().on('click',function(){
                                $('.yjc_').hide();
                            });

                        //---------------------------------------------------------------------------------------------------------------------------

                        //marker=L.marker([lat,lon],{title:'指挥车', icon: this.markerZHC, keepInView:false}).on('contextmenu',function(e){console.log('右键了....');CIIE.Map.prototype.showYJCRightKey(e,this);}).on('click',function(){clickEvent(this);}).on('mouseover', function(event) {
                        marker=L.marker([lat,lng],{ titleName:'指挥车', icon: this.markerZHC, keepInView:false}).on('contextmenu',function(e){console.log('右键了....');CIIE.Map.prototype.showYJCRightKey(e,this);}).on('mouseover', function(event) {
                                console.log(event);
                                if(event.originalEvent){
                                    var x = event.originalEvent.x;
                                    var y = event.originalEvent.y + 37;
                                    $("#circleTitle").text(event.target.options.titleName);
                                    $("#circleTitle").css({top: y,left: x});
                                    $("#circleTitle").show();
                                }
                            }).on('mouseout', function(event) {
                                if(event.originalEvent) {
                                    $("#circleTitle").hide();
                                }
                            }).on('click',function(){clickEvent(this);}).addTo(this.markersLayerCAR2);
                        function clickEvent(ee){
                            //var i = ee.options.num; 
                            $('.yjc_').hide();
                            $('#yjc_single').off().show();
                            CIIE.Map.prototype.hideAllMenue();
                        };
                    }.bind(this));
                    carCount2++;
                    break;
                // case '应急抢修车'://发电车
                //     name='发电车';
                //     marker=L.marker([lat,lon],{title:'发电车', icon: this.markerFDC, keepInView:false}).addTo(this.markersLayerCAR3);
                //     carCount3++;
                //     break;
                case '油机'://无人机
                    name='无人机';
                    marker=L.marker([lat,lon],{titleName:'无人机', icon: this.markerWRJ, keepInView:false}).on('mouseover', function(event) {
                                console.log(event);
                                if(event.originalEvent){
                                    var x = event.originalEvent.x;
                                    var y = event.originalEvent.y + 37;
                                    $("#circleTitle").text(event.target.options.titleName);
                                    $("#circleTitle").css({top: y,left: x});
                                    $("#circleTitle").show();
                                }
                            }).on('mouseout', function(event) {
                                if(event.originalEvent) {
                                    $("#circleTitle").hide();
                                }
                            }).addTo(this.markersLayerCAR4);
                    carCount4++;
                    break;
            }
            if(marker!=null){
                marker.info={name:name,lat:lat,lng:lon};
                this.cellMarkerCache.push(marker);
            }
            
        }
        //$('#legendCountEC').text(carCount);
        $('#legendCountCC').text(carCount2);
        //$('#legendCountELECTRIC').text(carCount3);
        $('#legendCountAIR').text(carCount4);
    }.bind(this));
    
    
    // this.cdm.getMaintainMan({},function(result){
    //     var list=result.data;
    //     for(var i=0;i<list.length;i++){
    //         var record=list[i];
    //         var lon=record.selong*1;
    //         var lat=record.selat*1;
    //         var marker=L.marker([lat,lon],{title:record.seperson, icon: this.markerMTM, keepInView:false}).addTo(this.markersLayerMan);
    //         marker.info={name:record.seperson,lat:lat,lng:lon};
    //         this.cellMarkerCache.push(marker);
    //     }
    //     $('#legendCountMM').text(list.length);
        
    // }.bind(this));
    
    
};
CIIE.Map.prototype.getCells=function(ignoreLocate){
    
    
//  var list=[
//    [31.19624, 121.30524],
//    [31.19882, 121.30858],
//    [31.19512, 121.31201],
//    [31.19402, 121.30779]
//  ];
//  for(var i=0;i<list.length;i++){
//      var marker=L.marker(list[i],{title: '5G站点数', icon: this.marker5G, keepInView:false}).addTo(this.markersLayer5G);
//      marker.addTo(this.markerClusters);
//  }
    
    
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
                num2g_new = 0,
                num3g = 0,
                num4g = 0;
                num4g_new = 0,
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

           var count_6=0;

           var count_test=0;





           //添加 dom
           var selfPopupStr = '';
               selfPopupStr += '<div id="cellcell_" class="cellcell_" style="position:absolute;top:50%;left:50%;margin-top:-372px;margin-left:-598px;width:1008px;height:833px;overflow:hidden;display:none;">'
               
               selfPopupStr += '<div class="maptipbg" style="width:100%;height:100%;padding:0px;overflow:hidden;">'
               //selfPopupStr += '<div class="map-info-win-title2">'
               //selfPopupStr += '<div class="wifiWinIcon" style="float:left;display:none"></div>'
               //selfPopupStr += '<div id="popuptitle" style="float:left;margin-left: 10px;">'+name+'</div>'
               //selfPopupStr += '</div>'
               selfPopupStr += '<div style="clear:both;"></div>'
               selfPopupStr += '<iframe id="cellListIframe" src="" frameborder="0" allowtransparency="true" style="border-radius:10px;width:1100px;height:849px;"></iframe>';
               selfPopupStr += '</div>'



               selfPopupStr += '<div class="cellcellClose_ map-icon-close" style="position:absolute;right:9px;top:6px;"></div>';
               selfPopupStr += '</div>';

               $('#map').parent().append(selfPopupStr);
               $('.cellcellClose_').off().on('click',function(){
                   $('.cellcell_').hide();
               });













           
            for(var i= 0, len = data.length; i<len;++i){
                //提前统计 2G  4G  小区
                var type = data[i].cell_nt;
                if ( type == "2G") {
                    num2g_new++;
                }else if( type == "4G"){
                    num4g_new++;
                }
                if(data[i].lat && data[i].lon){
//                    var latHeatMap = parseFloat(data[i].lat + 0.0025 + this.hotspotInfo.lat),        //偏移
//                        lngHeatMap = parseFloat(data[i].lon - 0.0045 + this.hotspotInfo.lon);
                         var latHeatMap = data[i].lat,        
                         lngHeatMap = data[i].lon;
                    
                        var bdPoint = this.wgs84tobd09(lngHeatMap,latHeatMap);
                        var point = bdPoint.reverse();
                        var type = data[i].cell_nt;



                        
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
                                    //+'&Belonged='+encodeURIComponent(15)
                        var heatPopup4G = L.popup({maxWidth:1100,maxHeight:849,offset:L.point(0, 5),autoPanPaddingTopLeft:L.point(-30, 240),closeButton:true, closeOnClick:false})
                            .setLatLng([lat,lng]);
                        heatPopup4G.setContent('<iframe allowtransparency="true" width="1001px" ondblclick="alert();" frameborder="no" height="840px" src="'+urlNew+'"></iframe>');
                        


                        var marker=null;
                        
//                      if(name.indexOf('应急车') !== -1){
//                          carCount++;
//                          marker=L.marker([lat,lng],{title: name, icon: this.markerYJC, keepInView:false}).bindPopup(heatPopup2G).addTo(this.markersLayerCAR);
//                          continue;
//                      }
//                      if(name.indexOf('嘉里中心')==-1) continue;
                        if(type === '5G'){
                            num5g++;
                            //marker=L.marker([lat,lng],{title: name, icon: this.marker5G, keepInView:false}).bindPopup(heatPopup4G).addTo(this.markersLayer5G);
                            marker=L.marker([lat,lng],{titleName: name,num:i,_hotspot:hotspot,_name:name,_type:type,_lacci:lacci, icon: this.marker5G, keepInView:false}).on('mouseover', function(event) {
                                    console.log(event);
                                    if(event.originalEvent){
                                        var x = event.originalEvent.x;
                                        var y = event.originalEvent.y + 37;
                                        $("#circleTitle").text(event.target.options.titleName);
                                        $("#circleTitle").css({top: y,left: x});
                                        $("#circleTitle").show();
                                    }
                                }).on('mouseout', function(event) {
                                    if(event.originalEvent) {
                                        $("#circleTitle").hide();
                                    }
                                }).on('click',function(){clickEvent(this);}).addTo(this.markersLayer5G);
                            marker.addTo(this.markerClusters);
                        }else if(type === '4G'){
                            num4g++;
                            
                            if (lte_type === "FDD") {
                                //num4g++;
                                countFDD++;
                                marker=L.marker([lat,lng],{titleName: name,num:i,_hotspot:hotspot,_name:name,_type:type,_lacci:lacci, icon: this.marker4G, keepInView:false}).on('mouseover', function(event) {
                                    console.log(event);
                                    if(event.originalEvent){
                                        var x = event.originalEvent.x;
                                        var y = event.originalEvent.y + 37;
                                        $("#circleTitle").text(event.target.options.titleName);
                                        $("#circleTitle").css({top: y,left: x});
                                        $("#circleTitle").show();
                                    }
                                }).on('mouseout', function(event) {
                                    if(event.originalEvent) {
                                        $("#circleTitle").hide();
                                    }
                                //}).on('click',function(){clickEvent(this);}).addTo(this.markersLayerFDD);
                                }).on('click',function(){clickEvent(this);});
                                marker.addTo(this.markerClusters);
                            }else if (lte_type === "TDD") {
                                //num4g++;
                                countTDD++;
                                marker=L.marker([lat,lng],{titleName: name,num:i,_hotspot:hotspot,_name:name,_type:type,_lacci:lacci, icon: this.marker4G, keepInView:false}).on('mouseover', function(event) {
                                    console.log(event);
                                    if(event.originalEvent){
                                        var x = event.originalEvent.x;
                                        var y = event.originalEvent.y + 37;
                                        $("#circleTitle").text(event.target.options.titleName);
                                        $("#circleTitle").css({top: y,left: x});
                                        $("#circleTitle").show();
                                    }
                                }).on('mouseout', function(event) {
                                    if(event.originalEvent) {
                                        $("#circleTitle").hide();
                                    }
                                //}).on('click',function(){clickEvent(this);}).addTo(this.markersLayerTDD);
                                }).on('click',function(){clickEvent(this);});
                                marker.addTo(this.markerClusters);
                            }
                        }else if(type === '2G'){
                            count2G++;
                            num2g++;
                            marker=L.marker([lat,lng],{titleName: name,num:i,_hotspot:hotspot,_name:name,_type:type,_lacci:lacci, icon: this.marker2G, keepInView:false}).on('mouseover', function(event) {
                                    console.log(event);
                                    if(event.originalEvent){
                                        var x = event.originalEvent.x;
                                        var y = event.originalEvent.y + 37;
                                        $("#circleTitle").text(event.target.options.titleName);
                                        $("#circleTitle").css({top: y,left: x});
                                        $("#circleTitle").show();
                                    }
                                }).on('mouseout', function(event) {
                                    if(event.originalEvent) {
                                        $("#circleTitle").hide();
                                    }
                                //}).on('click',function(){clickEvent(this);}).addTo(this.markersLayer2G);
                                }).on('click',function(){clickEvent(this);});
                            marker.addTo(this.markerClusters);
                        }


                        
                        // if(station_type === '宏站'){
                        //     countMotorCell++;
                        //     marker=L.marker([lat,lng],{titleName: name,num:i,_hotspot:hotspot,_name:name,_type:type,_lacci:lacci, icon: this.markerMotorCell, keepInView:false}).on('mouseover', function(event) {
                        //             console.log(event);
                        //             if(event.originalEvent){
                        //                 var x = event.originalEvent.x;
                        //                 var y = event.originalEvent.y + 37;
                        //                 $("#circleTitle").text(event.target.options.titleName);
                        //                 $("#circleTitle").css({top: y,left: x});
                        //                 $("#circleTitle").show();
                        //             }
                        //         }).on('mouseout', function(event) {
                        //             if(event.originalEvent) {
                        //                 $("#circleTitle").hide();
                        //             }
                        //         }).on('click',function(){clickEvent(this);}).addTo(this.markersLayerMotorCell);
                        // }else if(station_type === '室内'){
                        //     countRoomIn++;
                        //     marker=L.marker([lat,lng],{titleName: name,num:i,_hotspot:hotspot,_name:name,_type:type,_lacci:lacci, icon: this.markerRoomIn, keepInView:false}).on('mouseover', function(event) {
                        //             console.log(event);
                        //             if(event.originalEvent){
                        //                 var x = event.originalEvent.x;
                        //                 var y = event.originalEvent.y + 37;
                        //                 $("#circleTitle").text(event.target.options.titleName);
                        //                 $("#circleTitle").css({top: y,left: x});
                        //                 $("#circleTitle").show();
                        //             }
                        //         }).on('mouseout', function(event) {
                        //             if(event.originalEvent) {
                        //                 $("#circleTitle").hide();
                        //             }
                        //         }).on('click',function(){clickEvent(this);}).addTo(this.markersLayerRoomIn);
                        // }else if(station_type === '室分'){
                        //     countRoomSplit++;
                        //     marker=L.marker([lat,lng],{titleName: name,num:i,_hotspot:hotspot,_name:name,_type:type,_lacci:lacci, icon: this.markerRoomSplit, keepInView:false}).on('mouseover', function(event) {
                        //             console.log(event);
                        //             if(event.originalEvent){
                        //                 var x = event.originalEvent.x;
                        //                 var y = event.originalEvent.y + 37;
                        //                 $("#circleTitle").text(event.target.options.titleName);
                        //                 $("#circleTitle").css({top: y,left: x});
                        //                 $("#circleTitle").show();
                        //             }
                        //         }).on('mouseout', function(event) {
                        //             if(event.originalEvent) {
                        //                 $("#circleTitle").hide();
                        //             }
                        //         }).on('click',function(){clickEvent(this);}).addTo(this.markersLayerRoomSplit);
                        // }else if(station_type === '室外'){
                        //     countRoomOut++;
                        //     marker=L.marker([lat,lng],{titleName: name,num:i,_hotspot:hotspot,_name:name,_type:type,_lacci:lacci, icon: this.markerRoomOut, keepInView:false}).on('mouseover', function(event) {
                        //             console.log(event);
                        //             if(event.originalEvent){
                        //                 var x = event.originalEvent.x;
                        //                 var y = event.originalEvent.y + 37;
                        //                 $("#circleTitle").text(event.target.options.titleName);
                        //                 $("#circleTitle").css({top: y,left: x});
                        //                 $("#circleTitle").show();
                        //             }
                        //         }).on('mouseout', function(event) {
                        //             if(event.originalEvent) {
                        //                 $("#circleTitle").hide();
                        //             }
                        //         }).on('click',function(){clickEvent(this);}).addTo(this.markersLayerRoomOut);
                        // }else if(station_type === '街道站'){
                        //     countStreet++;
                        //     marker=L.marker([lat,lng],{titleName: name,num:i,_hotspot:hotspot,_name:name,_type:type,_lacci:lacci, icon: this.markerStreet, keepInView:false}).on('mouseover', function(event) {
                        //             console.log(event);
                        //             if(event.originalEvent){
                        //                 var x = event.originalEvent.x;
                        //                 var y = event.originalEvent.y + 37;
                        //                 $("#circleTitle").text(event.target.options.titleName);
                        //                 $("#circleTitle").css({top: y,left: x});
                        //                 $("#circleTitle").show();
                        //             }
                        //         }).on('mouseout', function(event) {
                        //             if(event.originalEvent) {
                        //                 $("#circleTitle").hide();
                        //             }
                        //         }).on('click',function(){clickEvent(this);}).addTo(this.markersLayerStreet);
                        // }


                        

                        

                        //添加扇形(室外小区)
                        var circle = null;
                        if (station_type && ( station_type.indexOf('杆站') >-1 || station_type.indexOf('宏站') >-1 || station_type.indexOf('街道站') >-1 || station_type.indexOf('室外覆盖') >-1)) {
                            if (lg_subtype == "TDD-D") {
                                var radius = 125;var color = '#408b22';
                                //marker=L.marker([lat,lng],{title: name, icon: this.markertestPng, keepInView:false}).addTo(this.shangxingLayerTDD_D);
                                circle = L.circle([lat,lng], radius, {fill: true,num:i,_hotspot:hotspot,_name:name,_type:type,_lacci:lacci,weight:1,className:name,fillColor: color,fillOpacity: 0.9,color: color,opacity: 0.9,startAngle: startAngle,stopAngle: stopAngle,pointerEvents:"auto"}).on('mouseover', function(event) {
                                console.log(event);
                                if(event.containerPoint) {
                                    var x = event.containerPoint.x;
                                    var y = event.containerPoint.y + 37;
                                    $("#circleTitle").text(event.target.options.className);
                                    $("#circleTitle").css({top: y,left: x});
                                    $("#circleTitle").show();
                                }
                            }).on('mouseout', function(event) {
                                if(event.containerPoint) {
                                    $("#circleTitle").hide();
                                }
                            }).on('click',function(){clickEvent(this);}).addTo(this.shangxingLayerTDD_D);
                            }else if (lg_subtype == "TDD-E") {
                                var radius = 110;var color = '#5ba931';
                                //marker=L.marker([lat,lng],{title: name, icon: this.markertestPng, keepInView:false}).addTo(this.shangxingLayerTDD_E);
                                circle = L.circle([lat,lng], radius, {fill: true,num:i,_hotspot:hotspot,_name:name,_type:type,_lacci:lacci,weight:1,className:name,fillColor: color,fillOpacity: 0.9,color: color,opacity: 0.9,startAngle: startAngle,stopAngle: stopAngle,pointerEvents:"auto"}).on('mouseover', function(event) {
                                console.log(event);
                                if(event.containerPoint) {
                                    var x = event.containerPoint.x;
                                    var y = event.containerPoint.y + 37;
                                    $("#circleTitle").text(event.target.options.className);
                                    $("#circleTitle").css({top: y,left: x});
                                    $("#circleTitle").show();
                                }
                            }).on('mouseout', function(event) {
                                if(event.containerPoint) {
                                    $("#circleTitle").hide();
                                }
                            }).on('click',function(){clickEvent(this);}).addTo(this.shangxingLayerTDD_E);
                            }else if (lg_subtype == "TDD-F") {
                                var radius = 95;var color = '#a8cf42';
                                //marker=L.marker([lat,lng],{title: name, icon: this.markertestPng, keepInView:false}).addTo(this.shangxingLayerTDD_F);
                                circle = L.circle([lat,lng], radius, {fill: true,num:i,_hotspot:hotspot,_name:name,_type:type,_lacci:lacci,weight:1,className:name,fillColor: color,fillOpacity: 0.9,color: color,opacity: 0.9,startAngle: startAngle,stopAngle: stopAngle,pointerEvents:"auto"}).on('mouseover', function(event) {
                                console.log(event);
                                if(event.containerPoint) {
                                    var x = event.containerPoint.x;
                                    var y = event.containerPoint.y + 37;
                                    $("#circleTitle").text(event.target.options.className);
                                    $("#circleTitle").css({top: y,left: x});
                                    $("#circleTitle").show();
                                }
                            }).on('mouseout', function(event) {
                                if(event.containerPoint) {
                                    $("#circleTitle").hide();
                                }
                            }).on('click',function(){clickEvent(this);}).addTo(this.shangxingLayerTDD_F);
                            }else if (lg_subtype == "FDD") {
                                var radius = 80;var color = '#d7e6af';
                                //marker=L.marker([lat,lng],{title: name, icon: this.markertestPng, keepInView:false}).addTo(this.shangxingLayerFDD_S);
                                circle = L.circle([lat,lng], radius, {fill: true,num:i,_hotspot:hotspot,_name:name,_type:type,_lacci:lacci,weight:1,className:name,fillColor: color,fillOpacity: 0.9,color: color,opacity: 0.9,startAngle: startAngle,stopAngle: stopAngle,pointerEvents:"auto"}).on('mouseover', function(event) {
                                console.log(event);
                                if(event.containerPoint) {
                                    var x = event.containerPoint.x;
                                    var y = event.containerPoint.y + 37;
                                    $("#circleTitle").text(event.target.options.className);
                                    $("#circleTitle").css({top: y,left: x});
                                    $("#circleTitle").show();
                                }
                            }).on('mouseout', function(event) {
                                if(event.containerPoint) {
                                    $("#circleTitle").hide();
                                }
                            }).on('click',function(){clickEvent(this);}).addTo(this.shangxingLayerFDD_S);
                            }else if (lg_subtype == "900M") {
                                var radius = 65;var color = '#3333cc';
                                circle = L.circle([lat,lng], radius, {fill: true,num:i,_hotspot:hotspot,_name:name,_type:type,_lacci:lacci,weight:1,className:name,fillColor: color,fillOpacity: 0.9,color: color,opacity: 0.9,startAngle: startAngle,stopAngle: stopAngle,pointerEvents:"auto"}).on('mouseover', function(event) {
                                console.log(event);
                                if(event.containerPoint) {
                                    var x = event.containerPoint.x;
                                    var y = event.containerPoint.y + 37;
                                    $("#circleTitle").text(event.target.options.className);
                                    $("#circleTitle").css({top: y,left: x});
                                    $("#circleTitle").show();
                                }
                            }).on('mouseout', function(event) {
                                if(event.containerPoint) {
                                    $("#circleTitle").hide();
                                }
                            }).on('click',function(){clickEvent(this);}).addTo(this.shangxingLayer900M);
                                //marker=L.marker([lat,lng],{title: name, icon: this.markertestPng, keepInView:false}).addTo(this.shangxingLayer900M);
                            }else if (lg_subtype == "1800M") {
                                var radius = 50;var color = '#3399cc';
                                //marker=L.marker([lat,lng],{title: name, icon: this.markertestPng, keepInView:false}).addTo(this.shangxingLayer1800M);
                                circle = L.circle([lat,lng], radius, {fill: true,num:i,_hotspot:hotspot,_name:name,_type:type,_lacci:lacci,weight:1,className:name,fillColor: color,fillOpacity: 0.9,color: color,opacity: 0.9,startAngle: startAngle,stopAngle: stopAngle,pointerEvents:"auto"}).on('mouseover', function(event) {
                                console.log(event);
                                if(event.containerPoint) {
                                    var x = event.containerPoint.x;
                                    var y = event.containerPoint.y + 37;
                                    $("#circleTitle").text(event.target.options.className);
                                    $("#circleTitle").css({top: y,left: x});
                                    $("#circleTitle").show();
                                }
                            }).on('mouseout', function(event) {
                                if(event.containerPoint) {
                                    $("#circleTitle").hide();
                                }
                            }).on('click',function(){clickEvent(this);}).addTo(this.shangxingLayer1800M);
                            }else if(lg_subtype == "D"){
                                count_6++;
                                count_test++; 
                                console.log('未能打点小区12589(' + count_test + ")");
                                // if(type === '4G'){
                                //     marker=L.marker([lat,lng],{titleName: name,num:i,_hotspot:hotspot,_name:name,_type:type,_lacci:lacci, icon: this.marker4G, keepInView:false}).on('mouseover', function(event) {
                                //         console.log(event);
                                //         if(event.originalEvent){
                                //             var x = event.originalEvent.x;
                                //             var y = event.originalEvent.y + 37;
                                //             $("#circleTitle").text(event.target.options.titleName);
                                //             $("#circleTitle").css({top: y,left: x});
                                //             $("#circleTitle").show();
                                //         }
                                //     }).on('mouseout', function(event) {
                                //         if(event.originalEvent) {
                                //             $("#circleTitle").hide();
                                //         }
                                //     }).on('click',function(){clickEvent(this);}).addTo(this.markersLayerFDD);
                                
                                // }else if(type === '2G'){
                                //     marker=L.marker([lat,lng],{titleName: name,num:i,_hotspot:hotspot,_name:name,_type:type,_lacci:lacci, icon: this.marker2G, keepInView:false}).on('mouseover', function(event) {
                                //             console.log(event);
                                //             if(event.originalEvent){
                                //                 var x = event.originalEvent.x;
                                //                 var y = event.originalEvent.y + 37;
                                //                 $("#circleTitle").text(event.target.options.titleName);
                                //                 $("#circleTitle").css({top: y,left: x});
                                //                 $("#circleTitle").show();
                                //             }
                                //         }).on('mouseout', function(event) {
                                //             if(event.originalEvent) {
                                //                 $("#circleTitle").hide();
                                //             }
                                //         }).on('click',function(){clickEvent(this);}).addTo(this.markersLayer2G);
                                // }

                            }; 
                        }

                        //添加圆形 (室内小区)
                        var circleC = null;
                        var startAngleC = 0;
                        var stopAngleC = 360;
                        if (station_type && (station_type.indexOf('应急车') >-1 || station_type.indexOf('室分') >-1 || station_type.indexOf('微站') >-1 || station_type.indexOf('室内覆盖') >-1 )){
                            if (lg_subtype == "TDD-D"){
                                var radius = 125;var color = '#408b22';
                                //marker=L.marker([lat,lng],{title: name, icon: this.markertestPng, keepInView:false}).addTo(this.shangxingLayerTDD_D);
                                circleC = L.circle([lat,lng], radius/3, {fill: true,num:i,_hotspot:hotspot,_name:name,_type:type,_lacci:lacci,weight:1,className:name,fillColor: color,fillOpacity: 0.9,color: color,opacity: 0.9,startAngle: startAngleC,stopAngle: stopAngleC,pointerEvents:"auto"}).on('mouseover', function(event) {
                                console.log(event);
                                if(event.containerPoint) {
                                    var x = event.containerPoint.x;
                                    var y = event.containerPoint.y + 37;
                                    $("#circleTitle").text(event.target.options.className);
                                    $("#circleTitle").css({top: y,left: x});
                                    $("#circleTitle").show();
                                }
                            }).on('mouseout', function(event) {
                                if(event.containerPoint) {
                                    $("#circleTitle").hide();
                                }
                            }).on('click',function(){clickEvent(this);}).addTo(this.shangxingLayerTDD_D_C);
                            }else if (lg_subtype == "TDD-E") {
                                var radius = 110;var color = '#5ba931';
                                //marker=L.marker([lat,lng],{title: name, icon: this.markertestPng, keepInView:false}).addTo(this.shangxingLayerTDD_E);
                                circleC = L.circle([lat,lng], radius/3, {fill: true,num:i,_hotspot:hotspot,_name:name,_type:type,_lacci:lacci,weight:1,className:name,fillColor: color,fillOpacity: 0.9,color: color,opacity: 0.9,startAngle: startAngleC,stopAngle: stopAngleC,pointerEvents:"auto"}).on('mouseover', function(event) {
                                //event.target._container.title = name;
                                console.log(event);
                                if(event.containerPoint){
                                    var x = event.containerPoint.x;
                                    var y = event.containerPoint.y + 37;
                                    $("#circleTitle").text(event.target.options.className);
                                    $("#circleTitle").css({top: y,left: x});
                                    $("#circleTitle").show();
                                }
                            }).on('mouseout', function(event) {
                                if(event.containerPoint) {
                                    $("#circleTitle").hide();
                                }
                            }).on('click',function(){clickEvent(this);}).addTo(this.shangxingLayerTDD_E_C);
                            }else if (lg_subtype == "TDD-F") {
                                var radius = 95;var color = '#a8cf42';
                                //marker=L.marker([lat,lng],{title: name, icon: this.markertestPng, keepInView:false}).addTo(this.shangxingLayerTDD_F);
                                circleC = L.circle([lat,lng], radius/3, {fill: true,num:i,_hotspot:hotspot,_name:name,_type:type,_lacci:lacci,weight:1,className:name,fillColor: color,fillOpacity: 0.9,color: color,opacity: 0.9,startAngle: startAngleC,stopAngle: stopAngleC,pointerEvents:"auto"}).on('mouseover', function(event) {
                                //event.target._container.title = name;
                                console.log(event);
                                if(event.containerPoint){
                                    var x = event.containerPoint.x;
                                    var y = event.containerPoint.y + 37;
                                    $("#circleTitle").text(event.target.options.className);
                                    $("#circleTitle").css({top: y,left: x});
                                    $("#circleTitle").show();
                                }
                            }).on('mouseout', function(event) {
                                if(event.containerPoint) {
                                    $("#circleTitle").hide();
                                }
                            }).on('click',function(){clickEvent(this);}).addTo(this.shangxingLayerTDD_F_C);
                            }else if (lg_subtype == "FDD") {
                                var radius = 80;var color = '#d7e6af';
                                //marker=L.marker([lat,lng],{title: name, icon: this.markertestPng, keepInView:false}).addTo(this.shangxingLayerFDD_S);
                                circleC = L.circle([lat,lng], radius/3, {fill: true,num:i,_hotspot:hotspot,_name:name,_type:type,_lacci:lacci,weight:1,className:name,fillColor: color,fillOpacity: 0.9,color: color,opacity: 0.9,startAngle: startAngleC,stopAngle: stopAngleC,pointerEvents:"auto"}).on('mouseover', function(event) {
                                //event.target._container.title = name;
                                console.log(event);
                                if(event.containerPoint){
                                    var x = event.containerPoint.x;
                                    var y = event.containerPoint.y + 37;
                                    $("#circleTitle").text(event.target.options.className);
                                    $("#circleTitle").css({top: y,left: x});
                                    $("#circleTitle").show();
                                }
                            }).on('mouseout', function(event) {
                                if(event.containerPoint) {
                                    $("#circleTitle").hide();
                                }
                            }).on('click',function(){clickEvent(this);}).addTo(this.shangxingLayerFDD_S_C);
                            }else if (lg_subtype == "900M") {
                                var radius = 65;var color = '#0559F9';
                                circleC = L.circle([lat,lng], radius/3, {fill: true,num:i,_hotspot:hotspot,_name:name,_type:type,_lacci:lacci,weight:1,className:name,fillColor: color,fillOpacity: 0.9,color: color,opacity: 0.9,startAngle: startAngleC,stopAngle: stopAngleC,pointerEvents:"auto"}).on('mouseover', function(event) {
                                //event.target._container.title = name;
                                console.log(event);
                                if(event.containerPoint){
                                    var x = event.containerPoint.x;
                                    var y = event.containerPoint.y + 37;
                                    $("#circleTitle").text(event.target.options.className);
                                    $("#circleTitle").css({top: y,left: x});
                                    $("#circleTitle").show();
                                }
                            }).on('mouseout', function(event) {
                                if(event.containerPoint) {
                                    $("#circleTitle").hide();
                                }
                            }).on('click',function(){clickEvent(this);}).addTo(this.shangxingLayer900M_C);
                            }else if (lg_subtype == "1800M") {
                                var radius = 50;var color = '#608EE6';
                                //marker=L.marker([lat,lng],{title: name, icon: this.markertestPng, keepInView:false}).addTo(this.shangxingLayer1800M);
                                circleC = L.circle([lat,lng], radius/3, {fill: true,num:i,_hotspot:hotspot,_name:name,_type:type,_lacci:lacci,weight:1,className:name,fillColor: color,fillOpacity: 0.9,color: color,opacity: 0.9,startAngle: startAngleC,stopAngle: stopAngleC,pointerEvents:"auto"}).on('mouseover', function(event) {
                                //event.target._container.title = name;
                                console.log(event);
                                if(event.containerPoint){
                                    var x = event.containerPoint.x;
                                    var y = event.containerPoint.y + 37;
                                    $("#circleTitle").text(event.target.options.className);
                                    $("#circleTitle").css({top: y,left: x});
                                    $("#circleTitle").show();
                                }
                            }).on('mouseout', function(event) {
                                if(event.containerPoint) {
                                    $("#circleTitle").hide();
                                }
                            }).on('click',function(){clickEvent(this);}).addTo(this.shangxingLayer1800M_C);
                            }else if (lg_subtype == "D") {
                                count_6++;
                                count_test++; 
                                console.log('未能打点小区12740(' + count_test + ")");
                                // if(type === '4G'){
                                //     marker=L.marker([lat,lng],{titleName: name,num:i,_hotspot:hotspot,_name:name,_type:type,_lacci:lacci, icon: this.marker4G, keepInView:false}).on('mouseover', function(event) {
                                //         console.log(event);
                                //         if(event.originalEvent){
                                //             var x = event.originalEvent.x;
                                //             var y = event.originalEvent.y + 37;
                                //             $("#circleTitle").text(event.target.options.titleName);
                                //             $("#circleTitle").css({top: y,left: x});
                                //             $("#circleTitle").show();
                                //         }
                                //     }).on('mouseout', function(event) {
                                //         if(event.originalEvent) {
                                //             $("#circleTitle").hide();
                                //         }
                                //     }).on('click',function(){clickEvent(this);}).addTo(this.markersLayerFDD);
                                
                                // }else if(type === '2G'){
                                //     marker=L.marker([lat,lng],{titleName: name,num:i,_hotspot:hotspot,_name:name,_type:type,_lacci:lacci, icon: this.marker2G, keepInView:false}).on('mouseover', function(event) {
                                //             console.log(event);
                                //             if(event.originalEvent){
                                //                 var x = event.originalEvent.x;
                                //                 var y = event.originalEvent.y + 37;
                                //                 $("#circleTitle").text(event.target.options.titleName);
                                //                 $("#circleTitle").css({top: y,left: x});
                                //                 $("#circleTitle").show();
                                //             }
                                //         }).on('mouseout', function(event) {
                                //             if(event.originalEvent) {
                                //                 $("#circleTitle").hide();
                                //             }
                                //         }).on('click',function(){clickEvent(this);}).addTo(this.markersLayer2G);
                                // }
                            }; 
                        }



                        var marker = null;
                        if ( station_type ==null  || (station_type.indexOf('应急车') <0 && station_type.indexOf('杆站') <0 && station_type.indexOf('宏站') <0 && station_type.indexOf('街道站') <0 && station_type.indexOf('室分') <0 && station_type.indexOf('室内覆盖') <0 && station_type.indexOf('室外覆盖') <0 && station_type.indexOf('微站') <0 )) {
                        //if (false) {
                            count_6++;
                            count_test++; 
                            console.log('未能打点小区12783(' + count_test + ")");
                            console.log(station_type);
                            //console.log("6变形小区类型:======"+type+"=====" +station_type  + '========数量:'+ count_6)
                            if(type === '4G'){
                                marker=L.marker([lat,lng],{titleName: name,num:i,_hotspot:hotspot,_name:name,_type:type,_lacci:lacci, icon: this.marker4G, keepInView:false}).on('mouseover', function(event) {
                                    console.log(event);
                                    if(event.originalEvent){
                                        var x = event.originalEvent.x;
                                        var y = event.originalEvent.y + 37;
                                        $("#circleTitle").text(event.target.options.titleName);
                                        $("#circleTitle").css({top: y,left: x});
                                        $("#circleTitle").show();
                                    }
                                }).on('mouseout', function(event) {
                                    if(event.originalEvent) {
                                        $("#circleTitle").hide();
                                    }
                                }).on('click',function(){clickEvent(this);}).addTo(this.markersLayerFDD);
                        
                            }else if(type === '2G'){
                                marker=L.marker([lat,lng],{titleName: name,num:i,_hotspot:hotspot,_name:name,_type:type,_lacci:lacci, icon: this.marker2G, keepInView:false}).on('mouseover', function(event) {
                                        console.log(event);
                                        if(event.originalEvent){
                                            var x = event.originalEvent.x;
                                            var y = event.originalEvent.y + 37;
                                            $("#circleTitle").text(event.target.options.titleName);
                                            $("#circleTitle").css({top: y,left: x});
                                            $("#circleTitle").show();
                                        }
                                    }).on('mouseout', function(event) {
                                        if(event.originalEvent) {
                                            $("#circleTitle").hide();
                                        }
                                    }).on('click',function(){clickEvent(this);}).addTo(this.markersLayer2G);
                            }

                        }

                        









                        function clickEvent(ee){
                            var i = ee.options.num; 
                            var hotspot = ee.options._hotspot; 
                            var name = ee.options._name; 
                            var type = ee.options._type; 
                            var lacci = ee.options._lacci; 
                            console.log("cellclee" + i);

                            var urlNew='../maptip/deviceDetailNew.jsp?hotspot='+encodeURIComponent(hotspot)
                                    +'&cellname='+encodeURIComponent(name)
                                    +'&nettype='+encodeURIComponent(type)
                                    +'&lacci='+encodeURIComponent(lacci)
                                    //+'&Belonged='+encodeURIComponent(15)
                            $('#cellcell_').off().show();
                            $("#cellListIframe").attr('src', urlNew);
                            CIIE.Map.prototype.hideAllMenue();
                        };
                        
                        
                        if(marker!=null){
                            marker.info=temObj;
                            this.cellMarkerCache.push(marker);
                            //marker.on('click',this.showMarkerDetail.bind(this));
                        }
                       
                }else{
                    continue;
                }
            }
            $('#legendCount2GCell').text(num2g_new);
            // $('#legendCountTDD').text(countTDD);
            // $('#legendCountFDD').text(countFDD);
            $//('#legendCountFDDAndTDD').text(countTDD + countFDD);
            $('#legendCountFDDAndTDD').text(num4g_new);
            $('#legendCount5G').text(num5g);
            
            $('#legendCountMotorCell').text(countMotorCell);
            $('#legendCountRoomIn').text(countRoomIn);
            $('#legendCountRoomSplit').text(countRoomSplit);
            $('#legendCountRoomOut').text(countRoomOut);
            $('#legendCountStreet').text(countStreet);
            
            var qlHotMap=this.qlHotMap;
            if(qlHotMap[this.hotspot]==true){
                var ql=$('.QLCONTENT[name='+this.hotspot+']');
                ql.find('.QLCKPI:eq(3)').find('div:eq(2)').find('span:eq(0)').text(num2g_new);
                ql.find('.QLCKPI:eq(4)').find('div:eq(2)').find('span:eq(0)').text(num4g_new);
                ql.find('.QLCKPI:eq(5)').find('div:eq(2)').find('span:eq(0)').text(num5g);
            }
            this.updatePercent(this.hotspot);
            this.updateBaseStationTrouble(this.hotspot);  //加载基站故障



            console.timeEnd('getLatlng');
            //初始话扇形图层
            //this.addShanXing();

            //if (FROMMODEL == null || FROMMODEL == "null"){}else{
                this.getBaseStations();   //基站
                this.getSparePartsNum();     //备件备品数量
                
                this.getDialTests(31.195905,121.30838,'重保区域');      //拨测
                this.getDialTests(31.1553,121.81179,'浦东机场');      //拨测
                this.getDialTests(31.199449,121.345336,'虹桥机场');      //拨测
                this.getDialTests(31.198322,121.327424,'虹桥火车站');      //拨测    31.200322
                this.getDialTests(31.254074,121.462188,'上海火车站');      //拨测
                //this.getDialTests(31.159293,121.435742,'上海南站');      //拨测
                this.getDialTests(31.157293,121.435742,'上海南站');      //拨测




                
                this.getBaseRooms();

                this.getJKSpecialLine();   //集客专线
                this.getFadianche();   //发电车
                this.getYingjiche();   //应急车
                this.getMaintainMan();   //保障人员
            //}

            //if(this.hotspot != "J-国家会展中心" ){  //防止切换其他热点,不加载热力图
            if(this.loadHotMapFirstNum != 0 ){  //防止切换其他热点,不加载热力图
                //初始化热力图
                this.updateHeatTimeLine(this.updateHeat);

                if (this.map.hasLayer(this.shangxingLayerTDD_D)) {this.map.removeLayer(this.shangxingLayerTDD_D);}
                if (this.map.hasLayer(this.shangxingLayerTDD_E)) {this.map.removeLayer(this.shangxingLayerTDD_E);}
                if (this.map.hasLayer(this.shangxingLayerTDD_F)) {this.map.removeLayer(this.shangxingLayerTDD_F);}
                if (this.map.hasLayer(this.shangxingLayerFDD_S)) {this.map.removeLayer(this.shangxingLayerFDD_S);}
                if (this.map.hasLayer(this.shangxingLayer900M)) {this.map.removeLayer(this.shangxingLayer900M);}
                if (this.map.hasLayer(this.shangxingLayer1800M)) {this.map.removeLayer(this.shangxingLayer1800M);}
                // $("div.yjutreds").each(function(index, el) {
                //     if ($(el).hasClass('mapCtrlItemSelected')){
                //         var func = $(el).attr('func');
                //         if (func == 'TDD-D') {this.map.addLayer(this.shangxingLayerTDD_D);}
                //         if (func == 'TDD-E') {this.map.addLayer(this.shangxingLayerTDD_E);}
                //         if (func == 'TDD-F') {this.map.addLayer(this.shangxingLayerTDD_F);}
                //         if (func == 'FDD-S') {this.map.addLayer(this.shangxingLayerFDD_S);}
                //         if (func == '900M') {this.map.addLayer(this.shangxingLayer900M);}
                //         if (func == '1800M') {this.map.addLayer(this.shangxingLayer1800M);}
                //     }
                // }.bind(this)); 

                if (this.map.hasLayer(this.shangxingLayerTDD_D_C)) {this.map.removeLayer(this.shangxingLayerTDD_D_C);}
                if (this.map.hasLayer(this.shangxingLayerTDD_E_C)) {this.map.removeLayer(this.shangxingLayerTDD_E_C);}
                if (this.map.hasLayer(this.shangxingLayerTDD_F_C)) {this.map.removeLayer(this.shangxingLayerTDD_F_C);}
                if (this.map.hasLayer(this.shangxingLayerFDD_S_C)) {this.map.removeLayer(this.shangxingLayerFDD_S_C);}
                if (this.map.hasLayer(this.shangxingLayer900M_C)) {this.map.removeLayer(this.shangxingLayer900M_C);}
                if (this.map.hasLayer(this.shangxingLayer1800M_C)) {this.map.removeLayer(this.shangxingLayer1800M_C);}



                if (this.map.hasLayer(this.markersLayerFDD)) {this.map.removeLayer(this.markersLayerFDD);} 
                if (this.map.hasLayer(this.markersLayer2G)) {this.map.removeLayer(this.markersLayer2G);}




                // $("div.yjutreds").each(function(index, el) {
                //     if ($(el).hasClass('mapCtrlItemSelected')){
                //         var func = $(el).attr('func');
                //         if (func == 'TDD-D-C') {this.map.addLayer(this.shangxingLayerTDD_D_C);}
                //         if (func == 'TDD-E-C') {this.map.addLayer(this.shangxingLayerTDD_E_C);}
                //         if (func == 'TDD-F-C') {this.map.addLayer(this.shangxingLayerTDD_F_C);}
                //         if (func == 'FDD-S-C') {this.map.addLayer(this.shangxingLayerFDD_S_C);}
                //         if (func == '900M-C') {this.map.addLayer(this.shangxingLayer900M_C);}
                //         if (func == '1800M-C') {this.map.addLayer(this.shangxingLayer1800M_C);}
                //     }
                // }.bind(this));


                $("#ctrlResource").find('.mapCtrlItem').each(function(index, el) {
                    var func = $(el).attr('func');
                    if ($(el).hasClass('mapCtrlItemSelected')) {

                        if(func=="2G小区"){this.map.addLayer(this.markersLayer2G);}
                        if(func=="FDD小区"){this.map.addLayer(this.markersLayerTDD);}
                        if(func=="TDD小区"){this.map.addLayer(this.markersLayerFDD);}
                        if(func=="5G站点数"){this.map.addLayer(this.markersLayer5G);}
                        if(func=="机房"){this.map.addLayer(this.markersLayerBaseRoom);}
                        if(func=="集客专线"){this.map.addLayer(this.markersLayerJKSpecialLine);}

                        if(func=="聚合小区"){this.map.addLayer(this.markerClusters);}

                        if(func=="基站"){this.map.addLayer(this.markersLayerBaseStation);}     

                        
                        if(func=="4G小区总数"){this.map.addLayer(this.markersLayerFDD);}
                        if(func=="2G小区总数"){this.map.addLayer(this.markersLayer2G);}

                        var TDD_D_DOM = $("div.yjutreds").eq(4);
                        if (TDD_D_DOM.hasClass('mapCtrlItemSelected')) {
                            var func1 = TDD_D_DOM.attr('func');
                            if (func1 == 'TDD-D') {
                                this.map.addLayer(this.shangxingLayerTDD_D);
                            };
                        };
                        var TDD_E_DOM = $("div.yjutreds").eq(5);
                        if (TDD_E_DOM.hasClass('mapCtrlItemSelected')) {
                            var func2 = TDD_E_DOM.attr('func');
                            if (func2 == 'TDD-E') {
                                this.map.addLayer(this.shangxingLayerTDD_E);
                            }
                        }
                        var TDD_F_DOM = $("div.yjutreds").eq(6);
                        if (TDD_F_DOM.hasClass('mapCtrlItemSelected')) {
                            var func3 = TDD_F_DOM.attr('func');
                            if (func3 == 'TDD-F') {
                                this.map.addLayer(this.shangxingLayerTDD_F);
                            }
                        }
                        var FDD_S_DOM = $("div.yjutreds").eq(7);
                        if (FDD_S_DOM.hasClass('mapCtrlItemSelected')) {
                            var func4 = FDD_S_DOM.attr('func');
                            if (func4 == 'FDD-S') {
                                this.map.addLayer(this.shangxingLayerFDD_S);
                            }
                        }

                        var TDD_D_C_DOM = $("div.yjutreds").eq(8);
                        if (TDD_D_C_DOM.hasClass('mapCtrlItemSelected')) {
                            var func11 = TDD_D_C_DOM.attr('func');
                            if (func11 == 'TDD-D-C') {
                                this.map.addLayer(this.shangxingLayerTDD_D_C);
                            }
                        }
                        var TDD_E_C_DOM = $("div.yjutreds").eq(9);
                        if (TDD_E_C_DOM.hasClass('mapCtrlItemSelected')) {
                            var func22 = TDD_E_C_DOM.attr('func');
                            if (func22 == 'TDD-E-C') {
                                this.map.addLayer(this.shangxingLayerTDD_E_C);
                            }
                        }
                        var TDD_F_C_DOM = $("div.yjutreds").eq(10);
                        if (TDD_F_C_DOM.hasClass('mapCtrlItemSelected')) {
                            var func33 = TDD_F_C_DOM.attr('func');
                            if (func33 == 'TDD-F-C') {
                                this.map.addLayer(this.shangxingLayerTDD_F_C);
                            }
                        }
                        var FDD_S_C_DOM = $("div.yjutreds").eq(11);
                        if (FDD_S_C_DOM.hasClass('mapCtrlItemSelected')) {
                            var func44 = FDD_S_C_DOM.attr('func');
                            if (func44 == 'FDD_S-C') {
                                this.map.addLayer(this.shangxingLayerFDD_S_C);
                            }
                        }

                        var _900M_DOM = $("div.yjutreds").eq(0);
                        if (_900M_DOM.hasClass('mapCtrlItemSelected')) {
                            var func111 = _900M_DOM.attr('func');
                            if (func111 == '900M') {
                                this.map.addLayer(this.shangxingLayer900M);
                            }
                        }
                        var _1800M_DOM = $("div.yjutreds").eq(1);
                        if (_1800M_DOM.hasClass('mapCtrlItemSelected')) {
                            var func222 = _1800M_DOM.attr('func');
                            if (func222 == '1800M') {
                                this.map.addLayer(this.shangxingLayer1800M);
                            }
                        }

                        var _900M_C_DOM = $("div.yjutreds").eq(2);
                        if (_900M_C_DOM.hasClass('mapCtrlItemSelected')) {
                            var func1111 = _900M_C_DOM.attr('func');
                            if (func1111 == '900M-C') {
                                this.map.addLayer(this.shangxingLayer900M_C);
                            }
                        }
                        var _1800M_C_DOM = $("div.yjutreds").eq(3);
                        if (_1800M_C_DOM.hasClass('mapCtrlItemSelected')) {
                            var func2222 = _1800M_C_DOM.attr('func');
                            if (func2222 == '1800M-C') {
                                this.map.addLayer(this.shangxingLayer1800M_C);
                            }
                        }




                        if(func=="应急车"){this.map.addLayer(this.markersLayerCAR);}
                        if(func=="指挥车"){this.map.addLayer(this.markersLayerCAR2);}
                        if(func=="发电车"){this.map.addLayer(this.markersLayerCAR3);}
                        if(func=="无人机"){this.map.addLayer(this.markersLayerCAR4);}
                        if(func=="保障人员"){this.map.addLayer(this.markersLayerMan);}


                        if(func=="拨测"){this.map.addLayer(this.markersLayerDialTest);}  


                    }
                }.bind(this));



            }



            if (FROMMODEL == null || FROMMODEL == "null"){    //概览大屏
                 if(this.loadHotMapFirstNum == 0 ){
                    $(".mapCtrlItem[func='全网热力图']").addClass('mapCtrlItemSelected')
                 }else{

                 }
                    this.updateHeatTimeLine(this.updateHeatOfAllNet);

                if (!ignoreLocate) {
                }else{
                    $("#ctrlFactor").find('.ctrlTitle[func="交通枢纽"]').trigger('click');
                    $("#ctrlFactor").find('.ctrlTitle[func="酒店"]').trigger('click');
                    $("#ctrlFactor").find('.ctrlTitle[func="保障线路"]').trigger('click');
                }



            }else{    //场景大屏

                //初始化热力图
                $(".mapCtrlItem[func='场景热力图']").addClass('mapCtrlItemSelected')
                this.updateHeatTimeLine(this.updateHeat);
                
            
            
                // this.map.addLayer(this.markersLayer2G);
                // this.map.addLayer(this.markersLayerTDD);
                // this.map.addLayer(this.markersLayerFDD);
                // this.map.addLayer(this.markersLayer5G);


                $("#ctrlResource").find('.mapCtrlItem').each(function(index, el) {
                    var func = $(el).attr('func');
                    if ($(el).hasClass('mapCtrlItemSelected')) {

                        // if(func=="TDD-D"){this.map.addLayer(this.shangxingLayerTDD_D);}
                        // if(func=="TDD-E"){this.map.addLayer(this.shangxingLayerTDD_E);}
                        // if(func=="TDD-F"){this.map.addLayer(this.shangxingLayerTDD_F);}
                        // if(func=="FDD-S"){this.map.addLayer(this.shangxingLayerFDD_S);}
                        // if(func=="900M"){this.map.addLayer(this.shangxingLayer900M);}
                        // if(func=="1800M"){this.map.addLayer(this.shangxingLayer1800M);}

                        // if(func=="TDD-D-C"){this.map.addLayer(this.shangxingLayerTDD_D_C);}
                        // if(func=="TDD-E-C"){this.map.addLayer(this.shangxingLayerTDD_E_C);}
                        // if(func=="TDD-F-C"){this.map.addLayer(this.shangxingLayerTDD_F_C);}
                        // if(func=="FDD-S-C"){this.map.addLayer(this.shangxingLayerFDD_S_C);}
                        // if(func=="900M-C"){this.map.addLayer(this.shangxingLayer900M_C);}
                        // if(func=="1800M-C"){this.map.addLayer(this.shangxingLayer1800M_C);}



                        if(func=="4G小区总数"){this.map.addLayer(this.markersLayerFDD);}
                        if(func=="2G小区总数"){this.map.addLayer(this.markersLayer2G);}


                        var TDD_D_DOM = $("div.yjutreds").eq(4);
                        if (TDD_D_DOM.hasClass('mapCtrlItemSelected')) {
                            var func1 = TDD_D_DOM.attr('func');
                            if (func1 == 'TDD-D') {
                                this.map.addLayer(this.shangxingLayerTDD_D);
                            };
                        };
                        var TDD_E_DOM = $("div.yjutreds").eq(5);
                        if (TDD_E_DOM.hasClass('mapCtrlItemSelected')) {
                            var func2 = TDD_E_DOM.attr('func');
                            if (func2 == 'TDD-E') {
                                this.map.addLayer(this.shangxingLayerTDD_E);
                            }
                        }
                        var TDD_F_DOM = $("div.yjutreds").eq(6);
                        if (TDD_F_DOM.hasClass('mapCtrlItemSelected')) {
                            var func3 = TDD_F_DOM.attr('func');
                            if (func3 == 'TDD-F') {
                                this.map.addLayer(this.shangxingLayerTDD_F);
                            }
                        }
                        var FDD_S_DOM = $("div.yjutreds").eq(7);
                        if (FDD_S_DOM.hasClass('mapCtrlItemSelected')) {
                            var func4 = FDD_S_DOM.attr('func');
                            if (func4 == 'FDD-S') {
                                this.map.addLayer(this.shangxingLayerFDD_S);
                            }
                        }

                        var TDD_D_C_DOM = $("div.yjutreds").eq(8);
                        if (TDD_D_C_DOM.hasClass('mapCtrlItemSelected')) {
                            var func11 = TDD_D_C_DOM.attr('func');
                            if (func11 == 'TDD-D-C') {
                                this.map.addLayer(this.shangxingLayerTDD_D_C);
                            }
                        }
                        var TDD_E_C_DOM = $("div.yjutreds").eq(9);
                        if (TDD_E_C_DOM.hasClass('mapCtrlItemSelected')) {
                            var func22 = TDD_E_C_DOM.attr('func');
                            if (func22 == 'TDD-E-C') {
                                this.map.addLayer(this.shangxingLayerTDD_E_C);
                            }
                        }
                        var TDD_F_C_DOM = $("div.yjutreds").eq(10);
                        if (TDD_F_C_DOM.hasClass('mapCtrlItemSelected')) {
                            var func33 = TDD_F_C_DOM.attr('func');
                            if (func33 == 'TDD-F-C') {
                                this.map.addLayer(this.shangxingLayerTDD_F_C);
                            }
                        }
                        var FDD_S_C_DOM = $("div.yjutreds").eq(11);
                        if (FDD_S_C_DOM.hasClass('mapCtrlItemSelected')) {
                            var func44 = FDD_S_C_DOM.attr('func');
                            if (func44 == 'FDD_S-C') {
                                this.map.addLayer(this.shangxingLayerFDD_S_C);
                            }
                        }

                        var _900M_DOM = $("div.yjutreds").eq(0);
                        if (_900M_DOM.hasClass('mapCtrlItemSelected')) {
                            var func111 = _900M_DOM.attr('func');
                            if (func111 == '900M') {
                                this.map.addLayer(this.shangxingLayer900M);
                            }
                        }
                        var _1800M_DOM = $("div.yjutreds").eq(1);
                        if (_1800M_DOM.hasClass('mapCtrlItemSelected')) {
                            var func222 = _1800M_DOM.attr('func');
                            if (func222 == '1800M') {
                                this.map.addLayer(this.shangxingLayer1800M);
                            }
                        }

                        var _900M_C_DOM = $("div.yjutreds").eq(2);
                        if (_900M_C_DOM.hasClass('mapCtrlItemSelected')) {
                            var func1111 = _900M_C_DOM.attr('func');
                            if (func1111 == '900M-C') {
                                this.map.addLayer(this.shangxingLayer900M_C);
                            }
                        }
                        var _1800M_C_DOM = $("div.yjutreds").eq(3);
                        if (_1800M_C_DOM.hasClass('mapCtrlItemSelected')) {
                            var func2222 = _1800M_C_DOM.attr('func');
                            if (func2222 == '1800M-C') {
                                this.map.addLayer(this.shangxingLayer1800M_C);
                            }
                        }


                        //this.map.addLayer(this.markersLayerCAR);
                        //this.map.addLayer(this.markersLayerCAR2);   //指挥车
                        //this.map.addLayer(this.markersLayerCAR3);
                        //this.map.addLayer(this.markersLayerCAR4);    //无人机
                        //this.map.addLayer(this.markersLayerMan);





                        if(func=="应急车"){this.map.addLayer(this.markersLayerCAR);}
                        if(func=="指挥车"){this.map.addLayer(this.markersLayerCAR2);}
                        if(func=="发电车"){this.map.addLayer(this.markersLayerCAR3);}
                        if(func=="无人机"){this.map.addLayer(this.markersLayerCAR4);}
                        if(func=="保障人员"){this.map.addLayer(this.markersLayerMan);}


                        if(func=="拨测"){this.map.addLayer(this.markersLayerDialTest);}  

                    }

                }.bind(this));
            }

            
            //this.updateHeatTimeLine(this.updateHeatOfAll4BigClass);

            
            
            $('.leaflet-marker-icon').on('dblclick',this.iconClick.bind(this));
           // $('#map-icon-emercar').text(carCount);
            

            
            
            
            $('#cellCount_4g').text(num4g_new);
            $('#cellCount_3g').text(num3g);
            $('#cellCount_2g').text(num2g_new);

            
            this.loadHotMapFirstNum++;

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
                
                var name = data[i].station;
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
                        titleName: name,
                        icon: this.markerBaseStation,
                        keepInView: false
                    }).on('mouseover', function(event) {
                            console.log(event);
                            if(event.originalEvent){
                                var x = event.originalEvent.x;
                                var y = event.originalEvent.y + 37;
                                $("#circleTitle").text(event.target.options.titleName);
                                $("#circleTitle").css({top: y,left: x});
                                $("#circleTitle").show();
                            }
                        }).on('mouseout', function(event) {
                            if(event.originalEvent) {
                                $("#circleTitle").hide();
                            }
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
CIIE.Map.prototype.getSparePartsNum = function(){
    var url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-rm-spareparts';
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
        $("#legendCountsparepart").text(result.total);
    });


};




//markersLayerDialTest
CIIE.Map.prototype.getDialTests = function(lat,lng,name) {

    var urlNew='../maptip/dialTest.jsp?hotspot='+encodeURIComponent(hotspot)
                +'&cellname='+encodeURIComponent(name)
                //+'&nettype='+encodeURIComponent(type)
                //+'&lacci='+encodeURIComponent(lacci)
    // var heatPopup4G = L.popup({maxWidth:550,maxHeight:589,offset:L.point(0, 5),autoPanPaddingTopLeft:L.point(-30, 240),closeButton:false, closeOnClick:true})
    var heatPopup4G = L.popup({maxWidth:550,maxHeight:589,offset:L.point(0, 0),autoPanPaddingTopLeft:L.point(-530, 0),closeButton:false, closeOnClick:true,className:'changePositon'})
        .setLatLng([lat,lng]);
     
    heatPopup4G.setContent('<iframe allowtransparency="true" width="501px" ondblclick="alert();" frameborder="no" height="580px" src="'+urlNew+'"></iframe>');
    heatPopup4G.openOn(this.markersLayerDialTest);

    // var marker = null;
    // marker = L.marker([lat, lng], {
    //     title: name,
    //     icon: this.markerDialTestRed,
    //     keepInView: false
    // }).bindPopup(heatPopup4G).addTo(this.markersLayerDialTest);


    var i = (Math.random()*100000).toFixed(0);
    //添加 dom
    var selfPopupStr = '';
        selfPopupStr += '<div id="wxbc_'+i+'" class="wxbc_" style="position:absolute;top:50%;left:50%;margin-top:-212px;margin-left:-256px;width:505px;height:638px;overflow:hidden;display:none;">'
        
        selfPopupStr += '<div class="maptipbg" style="width:100%;height:100%;padding:0px;overflow:hidden;">'
        selfPopupStr += '<div class="map-info-win-title2">'
        selfPopupStr += '<div class="wifiWinIcon" style="float:left;display:none"></div>'
        selfPopupStr += '<div id="popuptitle" style="float:left;margin-left: 10px;">无线拨测【'+name+'】</div>'  
        selfPopupStr += '</div>'
        selfPopupStr += '<div style="clear:both;"></div>'
        selfPopupStr += '<iframe id="cellListIframe" src="'+urlNew+'" frameborder="0" allowtransparency="true" style="border-radius:10px;width:505px;height:638px;"></iframe>';
        selfPopupStr += '</div>'

        selfPopupStr += '<div class="wxbcClose_ map-icon-close" style="position:absolute;right:5px;top:5px;"></div>';
        selfPopupStr += '</div>';

        $('#map').parent().append(selfPopupStr);
        $('.wxbcClose_').off().on('click',function(){
            $('.wxbc_').hide();
        });



        if(true){
            //marker=L.marker([lat,lng],{title:name,num:i,icon: this.markerMTM, keepInView:false}).on('click',function(){clickEvent(this);}).addTo(this.markersLayerMan);
            var marker = null;
            marker = L.marker([lat, lng], {
                titleName: name,
                num:i,
                icon: this.markerDialTestRed,
                keepInView: false
            }).on('mouseover', function(event) {
                console.log(event);
                if(event.originalEvent){
                    var x = event.originalEvent.x;
                    var y = event.originalEvent.y + 37;
                    $("#circleTitle").text(event.target.options.titleName);
                    $("#circleTitle").css({top: y,left: x});
                    $("#circleTitle").show();
                }
            }).on('mouseout', function(event) {
                if(event.originalEvent) {
                    $("#circleTitle").hide();
                }
            }).on('click',function(){clickEvent(this);}).addTo(this.markersLayerDialTest);
        }; 
        function clickEvent(ee){
            var i = ee.options.num; 
            $('.wxbc_').hide();
            $('#wxbc_'+i+'').off().show();
            CIIE.Map.prototype.hideAllMenue();
        };

























};
//getBaseRooms
CIIE.Map.prototype.getBaseRooms = function() {
    var url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-rel-roomByArea?hotspot='+ encodeURIComponent(this.hotspot);
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
        var data = result.data;
        var numBaseRoom = 0;
        for(var i= 0, len = data.length; i<len;++i){
            if(data[i].latitude && data[i].longitude){
                //var latHeatMap = parseFloat(data[i].lat + 0.0025 + this.hotspotInfo.lat),        //偏移
                //lngHeatMap = parseFloat(data[i].lon - 0.0045 + this.hotspotInfo.lon);
                var latHeatMap = data[i].latitude,        
                lngHeatMap = data[i].longitude;
                var type = data[i].cell_nt;

                var bdPoint = this.wgs84tobd09(lngHeatMap,latHeatMap);
                var point = bdPoint.reverse();
                if(point.length !== 2) continue;

                /*
                "room_id": "3101180202057134407",
                "room_name": "中国上海国家会展中心A0机房综合",
                "address": "崧泽大道333号",
                "longitude": 121.2947943,
                "latitude": 31.19250668,
                "is_mecenter_room": "是",
                "mecenter_building": "国家会展中心A0办公楼B1F",
                "floor": "地下一层",
                "maintenance_unit": "维护优化西部",
                "maintenance_team": "维护优化西部",
                "interface_person": null,
                "fixed_telephone": null,
                "contact_mobile_phone": "13801650192"
                */
                var lat=point[0];
                var lng=point[1];

                var room_name = data[i].room_name == null?"":data[i].room_name;     //机房名称
                var address = data[i].address== null?"":data[i].address         //机房地址
                var mecenter_building = data[i].mecenter_building== null?"":data[i].mecenter_building //机房所在会展中心大楼
                var floor = data[i].floor== null?"":data[i].floor       //楼层
                var maintenance_unit = data[i].maintenance_unit== null?"":data[i].maintenance_unit   //维护单位
                var maintenance_team = data[i].maintenance_team== null?"":data[i].maintenance_team   //维护班组  
                var interface_person = data[i].interface_person== null?"":data[i].interface_person   //接口人  
                var fixed_telephone = data[i].fixed_telephone== null?"":data[i].fixed_telephone   //固定电话  
                var contact_mobile_phone = data[i].contact_mobile_phone== null?"":data[i].contact_mobile_phone  //联系电话




                var htmlStr = '';
                htmlStr += '<div class="popup-content-wx" style="font-size: 30px;padding: 30px">';
                htmlStr += '<table style="width:100%;height:100%">'
                // htmlStr += '<tr>'
                // htmlStr += '<td class="htgrfse">机房名称</td><td class="valueColor">：' + room_name + '</td>'
                // htmlStr += '</tr>'
                htmlStr += '<tr>'
                htmlStr += '<td class="htgrfse">机房地址：</td><td class="valueColor">' + address + '</td>'
                htmlStr += '</tr>'
                htmlStr += '<tr>'
                htmlStr += '<td class="htgrfse">所在大楼：</td><td class="valueColor">' + mecenter_building + '</td>'
                htmlStr += '</tr>'
                htmlStr += '<tr>'
                htmlStr += '<td class="htgrfse">楼层：</td><td class="valueColor">' + floor + '</td>'
                htmlStr += '</tr>'
                htmlStr += '<tr>'
                htmlStr += '<td class="htgrfse">维护单位：</td><td class="valueColor">' + maintenance_unit + '</td>'
                htmlStr += '</tr>'
                htmlStr += '<tr>'
                htmlStr += '<td class="htgrfse">维护班组：</td><td class="valueColor">' + maintenance_team + '</td>'
                htmlStr += '</tr>'
                htmlStr += '<tr>'
                htmlStr += '<td class="htgrfse">接口人：</td><td class="valueColor">' + interface_person + '</td>'
                htmlStr += '</tr>'
                htmlStr += '<tr>'
                htmlStr += '<td class="htgrfse">固定电话：</td><td class="valueColor">' + fixed_telephone + '</td>'
                htmlStr += '</tr>'
                htmlStr += '<tr>'
                htmlStr += '<td class="htgrfse">联系电话：</td><td class="valueColor">' + contact_mobile_phone + '</td>'
                htmlStr += '</tr>'
               
                htmlStr += '</table>'


                //查看视频 
                htmlStr += '<div class="seekRoomVideoDiv" style="position:absolute;bottom:18px;right:20px;color: #fff;cursor: pointer;">'
                //htmlStr += '<span style="text-decoration:underline;" onclick="CIIE.Map.prototype.seekRoomVideoDiv(\''+room_name+'\')">查看视频<span>'
                if (room_name.indexOf('D0') > -1) {
                    htmlStr += '<div id="roomMKDiv" title="门口视频" class="jiankongIcon" onclick="CIIE.Map.prototype.seekRoomVideoDiv(\''+room_name+'\',\'MK\')"></div>'
                }else{
                    htmlStr += '<div id="roomMKDiv" title="门口视频" class="jiankongIcon" style="margin-right: 25px;" onclick="CIIE.Map.prototype.seekRoomVideoDiv(\''+room_name+'\',\'MK\')"></div>'
                    htmlStr += '<div id="roomNCDiv" title="内侧视频" class="jiankongIcon" onclick="CIIE.Map.prototype.seekRoomVideoDiv(\''+room_name+'\',\'NC\')"></div>'
                }
                htmlStr += '</div>'


                htmlStr += '</div>';



                // var opts = {
                //     maxWidth: 1200,
                //     maxHeight: 600,
                //     closeOnClick: false,
                //     className:'baseRoomStyle'
                // };
                // var popup = new L.popup(opts).setContent(htmlStr);


                //添加 dom
                var selfPopupStr = '';
                    selfPopupStr += '<div id="basestation_'+i+'" class="basestation_" style="position:absolute;top:50%;left:50%;margin-top:-159px;margin-left:-187px;width:648px;height:453px;overflow:hidden;display:none;">'
                    
                    selfPopupStr += '<div class="maptipbg" style="width:100%;height:100%;padding:0px;overflow:hidden;">'
                    selfPopupStr += '<div class="map-info-win-title2">'
                    selfPopupStr += '<div class="wifiWinIcon" style="float:left;display:none"></div>'
                    selfPopupStr += '<div id="popuptitle" style="float:left;margin-left: 10px;">'+room_name+'</div>'
                    selfPopupStr += '</div>'
                    selfPopupStr += '<div style="clear:both;"></div>'
                    //selfPopupStr += '<div id="basestation_content name="content" style="width:100%;">'
                    selfPopupStr += htmlStr;
                    //selfPopupStr += '</div>'
                    selfPopupStr += '</div>'



                    selfPopupStr += '<div class="basestationClose_ map-icon-close" style="position:absolute;right:5px;top:5px;"></div>';
                    selfPopupStr += '</div>';

                    $('#map').parent().append(selfPopupStr);
                    $('.basestationClose_').off().on('click',function(){
                        $('.basestation_').hide();
                    });




                if(true){
                    numBaseRoom++;
                    marker=L.marker([lat,lng],{titleName: room_name,num:i, icon: this.markerBaseRoom_green, keepInView:false}).on('mouseover', function(event) {
                            console.log(event);
                            if(event.originalEvent){
                                var x = event.originalEvent.x;
                                var y = event.originalEvent.y + 37;
                                $("#circleTitle").text(event.target.options.titleName);
                                $("#circleTitle").css({top: y,left: x});
                                $("#circleTitle").show();
                            }
                        }).on('mouseout', function(event) {
                            if(event.originalEvent) {
                                $("#circleTitle").hide();
                            }
                        }).on('click',function(){clickEvent(this);}).addTo(this.markersLayerBaseRoom);
                }; 

                function clickEvent(ee){
                    var i = ee.options.num; 
                    $('.basestation_').hide();
                    $('#basestation_'+i+'').off().show();
                    CIIE.Map.prototype.hideAllMenue();
                };






            }
        }


        //numBaseRoom
        $("#legendCountBaseRoom").text(numBaseRoom);


    }.bind(this));
};
//getJKSpecialLine
CIIE.Map.prototype.getJKSpecialLine = function() {
    //var url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-rel-roomByArea?hotspot='+ encodeURIComponent(this.hotspot);
    var url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-gl-jk?smooth='+LSMScreen.CacheDataManager.doSmooth+'&type=%E8%BF%9B%E5%8D%9A%E4%BC%9A';
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
        var data = result.data;
        $("#legendCountJKSpecialLine").text(data.line_nums);
    }.bind(this));




    //打点
    //var url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-rel-roomByArea?hotspot='+ encodeURIComponent(this.hotspot);
    var url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-jk-lineRmPoint';
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
        var data = result.data;
        //var numBaseRoom = 0;
        for(var i= 0, len = data.length; i<len;++i){
            if(data[i].z_access_ne_latitude && data[i].z_access_ne_longitude && data[i].z_access_ne_latitude != null && data[i].z_access_ne_longitude != null ){
                //var latHeatMap = parseFloat(data[i].lat + 0.0025 + this.hotspotInfo.lat),        //偏移
                //lngHeatMap = parseFloat(data[i].lon - 0.0045 + this.hotspotInfo.lon);
                var latHeatMap = parseFloat(data[i].z_access_ne_latitude),        
                lngHeatMap = parseFloat(data[i].z_access_ne_longitude);

                var bdPoint = this.wgs84tobd09(lngHeatMap,latHeatMap);
                var point = bdPoint.reverse();
                if(point.length !== 2) continue;

                /*
                "stat_time": 1539360000000,
                "customers_num": "2101014049",
                "customers_name": "上海铭广信息科技有限公司金山分公司",
                "customers_server": "标准",
                "customers_dependency": "金山",
                "business_type": "互联网专线",
                "line_id": "CMNET-JS-B-NULL-229697",
                "bsns_security_level": "普通",
                "maintenancedependency": "西区",
                "access_type": "PTN",
                "crm_bandwidth": "50M",
                "iot_customer_nums": 2285,
                "iot_card_nums": 12570608,
                "is_media": "否",
                "is_guozhan_line": "否",
                "venue_room": null,
                "a_access_ne_longitude": "121.36900626952752",
                "a_access_ne_latitude": "31.21900190436745",
                "z_access_ne_longitude": "121.43680348330781",
                "z_access_ne_latitude": "31.245571175657034",
                "a_point_address": null,
                "z_point_address": "上海市虹桥路1591号虹桥迎宾馆9号楼1楼"
                */
                // var lat=point[0];
                // var lng=point[1];

                var lat=latHeatMap;
                var lng=lngHeatMap;

                var line_id = data[i].line_id == null?"":data[i].line_id;     //机房名称
                var customers_num = data[i].customers_num == null?"":data[i].customers_num;     //客户编号
                var customers_name = data[i].customers_name== null?"":data[i].customers_name         //客户名称
                var customers_server = data[i].customers_server== null?"":data[i].customers_server //客户服务等级
                var maintenancedependency = data[i].maintenancedependency== null?"":data[i].maintenancedependency       //维护属地
                var access_type = data[i].access_type== null?"":data[i].access_type   //传输接入方式
                var crm_bandwidth = data[i].crm_bandwidth== null?"":data[i].crm_bandwidth   //带宽  
                var z_point_address = data[i].z_point_address== null?"":data[i].z_point_address   //接入地址  
                




                var htmlStr = '';
                htmlStr += '<div class="popup-content-wx" style="font-size: 30px;padding: 30px;">';
                htmlStr += '<table style="width:100%;height:100%">'
                htmlStr += '<tr>'
                htmlStr += '<td class="htgrfse">客户编号：</td><td class="valueColor">' + customers_num + '</td>'
                htmlStr += '</tr>'
                htmlStr += '<tr>'//
                htmlStr += '<td class="htgrfse">客户名称：</td><td class="valueColor" title="'+customers_name+'"><div style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:400px;">'+customers_name+'</div></td>'
                htmlStr += '</tr>'
                htmlStr += '<tr>'
                htmlStr += '<td class="htgrfse">客户服务等级：</td><td class="valueColor">' + customers_server + '</td>'
                htmlStr += '</tr>'
                htmlStr += '<tr>'
                htmlStr += '<td class="htgrfse">维护属地：</td><td class="valueColor">' + maintenancedependency + '</td>'
                htmlStr += '</tr>'
                htmlStr += '<tr>'
                htmlStr += '<td class="htgrfse">传输接入方式：</td><td class="valueColor">' + access_type + '</td>'
                htmlStr += '</tr>'
                htmlStr += '<tr>'
                htmlStr += '<td class="htgrfse">带宽：</td><td class="valueColor">' + crm_bandwidth + '</td>'
                htmlStr += '</tr>'
                htmlStr += '<tr>'
                htmlStr += '<td class="htgrfse">接入地址：</td><td class="valueColor" title="'+z_point_address+'"><div style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:400px;">'+z_point_address+'</div></td>'
                htmlStr += '</tr>'
               
                htmlStr += '</table>'

                htmlStr += '</div>';



                // var opts = {
                //     maxWidth: 1200,
                //     maxHeight: 600,
                //     closeOnClick: false,
                //     className:'baseRoomStyle'
                // };
                // var popup = new L.popup(opts).setContent(htmlStr);


                //添加 dom
                var selfPopupStr = '';
                    selfPopupStr += '<div id="jkzx_'+i+'" class="jkzx_" style="position:absolute;top:50%;left:50%;margin-top:-159px;margin-left:-282px;width:665px;height:404px;overflow:hidden;display:none;">'
                    
                    selfPopupStr += '<div class="maptipbg" style="width:100%;height:100%;padding:0px;overflow:hidden;">'
                    selfPopupStr += '<div class="map-info-win-title2">'
                    selfPopupStr += '<div class="wifiWinIcon" style="float:left;display:none"></div>'
                    selfPopupStr += '<div id="popuptitle" style="float:left;margin-left: 10px;">'+line_id+'</div>'
                    selfPopupStr += '</div>'
                    selfPopupStr += '<div style="clear:both;"></div>'
                    //selfPopupStr += '<div id="jkzx_content name="content" style="width:100%;">'
                    selfPopupStr += htmlStr;
                    //selfPopupStr += '</div>'
                    selfPopupStr += '</div>'



                    selfPopupStr += '<div class="jkzxClose_ map-icon-close" style="position:absolute;right:5px;top:5px;"></div>';
                    selfPopupStr += '</div>';

                    $('#map').parent().append(selfPopupStr);
                    $('.jkzxClose_').off().on('click',function(){
                        $('.jkzx_').hide();
                    });




                if(true){
                    //numBaseRoom++;
                    //marker=L.marker([lat,lng],{title: line_id,num:i, icon: this.markersJKSpecialLine, keepInView:false}).on('click',function(){clickEvent(this);}).addTo(this.markersLayerJKSpecialLine);
                    marker=L.marker([lat,lng],{titleName: line_id,num:i, icon: this.markersJKSpecialLine, keepInView:false}).on('mouseover', function(event) {
                            console.log(event);
                            if(event.originalEvent){
                                var x = event.originalEvent.x;
                                var y = event.originalEvent.y + 37;
                                $("#circleTitle").text(event.target.options.titleName);
                                $("#circleTitle").css({top: y,left: x});
                                $("#circleTitle").show();
                            }
                        }).on('mouseout', function(event) {
                            if(event.originalEvent) {
                                $("#circleTitle").hide();
                            }
                        }).on('click',function(){clickEvent(this);}).addTo(this.markersLayerJKSpecialLine);
                }; 

                function clickEvent(ee){
                    var i = ee.options.num; 
                    $('.jkzx_').hide();
                    $('#jkzx_'+i+'').off().show();
                    CIIE.Map.prototype.hideAllMenue();
                };

            }
        }


        //numBaseRoom
        //$("#legendCountBaseRoom").text(numBaseRoom);


    }.bind(this));















};
  

CIIE.Map.prototype.getFadianche = function() {
    //打点
    //var url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-rel-roomByArea?hotspot='+ encodeURIComponent(this.hotspot);
    var url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-rm-oil-mach';
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
        var data = result.data;
        var carCount3 = 0;
        for(var i= 0, len = data.length; i<len;++i){
            if(data[i].lat && data[i].lon && data[i].lat != null && data[i].lon != null ){
                //var latHeatMap = parseFloat(data[i].lat + 0.0025 + this.hotspotInfo.lat),        //偏移
                //lngHeatMap = parseFloat(data[i].lon - 0.0045 + this.hotspotInfo.lon);
                var latHeatMap = parseFloat(data[i].lat),        
                lngHeatMap = parseFloat(data[i].lon);




                var bdPoint = this.wgs84tobd09(lngHeatMap,latHeatMap);
                var point = bdPoint.reverse();
                if(point.length !== 2) continue;


                var lat=latHeatMap;
                var lng=lngHeatMap;

                //var line_id = data[i].line_id == null?"":data[i].line_id;     //机房名称
                var oil_machine_name = data[i].oil_machine_name == null?"":data[i].oil_machine_name;     
                var manufactor = data[i].manufactor == null?"":data[i].manufactor;     
                var oil_machine_model = data[i].oil_machine_model == null?"":data[i].oil_machine_model;     
                var area_name = data[i].area_name == null?"":data[i].area_name;     
                var ownership = data[i].ownership == null?"":data[i].ownership;     
                var diesel_gasoline = data[i].diesel_gasoline == null?"":data[i].diesel_gasoline;     
                var manual_electric = data[i].manual_electric == null?"":data[i].manual_electric;     
                var single_phase_three_phase = data[i].single_phase_three_phase == null?"":data[i].single_phase_three_phase;     
                var oil_machine_rated_power = data[i].oil_machine_rated_power == null?"":data[i].oil_machine_rated_power;     
                var reserve_place = data[i].reserve_place == null?"":data[i].reserve_place;     
                var point_position = data[i].point_position == null?"":data[i].point_position;     
                var working_condition = data[i].working_condition == null?"":data[i].working_condition;     
                var belonger = data[i].belonger == null?"":data[i].belonger;     
                var contact_information = data[i].contact_information == null?"":data[i].contact_information;     
                
                




                var htmlStr = '';
                htmlStr += '<div class="popup-content-wx" style="font-size: 30px;padding: 30px;">';
                htmlStr += '<table style="width:100%;height:100%">'
                // htmlStr += '<tr>'
                // htmlStr += '<td class="htgrfse">油机名称：</td><td class="valueColor mapTipValueTdMinWidth">' + oil_machine_name + '</td>'
                // htmlStr += '</tr>'
                htmlStr += '<tr>'
                htmlStr += '<td class="htgrfse">厂家：</td><td class="valueColor mapTipValueTdMinWidth">' + manufactor + '</td>'
                htmlStr += '<td class="htgrfse">油机型号：</td><td class="valueColor mapTipValueTdMinWidth">' + oil_machine_model + '</td>'
                htmlStr += '</tr>'
                // htmlStr += '<tr>'
                // htmlStr += '</tr>'
                htmlStr += '<tr>'
                htmlStr += '<td class="htgrfse">属地：</td><td class="valueColor mapTipValueTdMinWidth">' + area_name + '</td>'
                htmlStr += '<td class="htgrfse">产权归属：</td><td class="valueColor mapTipValueTdMinWidth">' + ownership + '</td>'
                htmlStr += '</tr>'
                // htmlStr += '<tr>'
                // htmlStr += '</tr>'
                htmlStr += '<tr>'
                htmlStr += '<td class="htgrfse">柴油汽油：</td><td class="valueColor mapTipValueTdMinWidth">' + diesel_gasoline + '</td>'
                htmlStr += '<td class="htgrfse">手动电动：</td><td class="valueColor mapTipValueTdMinWidth">' + manual_electric + '</td>'
                htmlStr += '</tr>'
                // htmlStr += '<tr>'
                // htmlStr += '</tr>'
                htmlStr += '<tr>'
                htmlStr += '<td class="htgrfse">单相三相：</td><td class="valueColor mapTipValueTdMinWidth">' + single_phase_three_phase + '</td>'
                htmlStr += '<td class="htgrfse">额定功率：</td><td class="valueColor mapTipValueTdMinWidth">' + oil_machine_rated_power + '</td>'
                htmlStr += '</tr>'
                // htmlStr += '<tr>'
                // htmlStr += '</tr>'
                htmlStr += '<tr>'
                htmlStr += '<td class="htgrfse">储备地点：</td><td class="valueColor mapTipValueTdMinWidth">' + reserve_place + '</td>'
                htmlStr += '<td class="htgrfse">驻点位置：</td><td class="valueColor mapTipValueTdMinWidth">' + point_position + '</td>'
                htmlStr += '</tr>'
                // htmlStr += '<tr>'
                // htmlStr += '</tr>'
                htmlStr += '<tr>'
                htmlStr += '<td class="htgrfse">工作状态：</td><td class="valueColor mapTipValueTdMinWidth">' + working_condition + '</td>'
                htmlStr += '<td class="htgrfse">归属人员：</td><td class="valueColor mapTipValueTdMinWidth">' + belonger + '</td>'
                htmlStr += '</tr>'
                // htmlStr += '<tr>'
                // htmlStr += '</tr>'
                htmlStr += '<tr>'
                htmlStr += '<td class="htgrfse">联系方式：</td><td class="valueColor mapTipValueTdMinWidth">' + contact_information + '</td>'
                htmlStr += '<td class="htgrfse">维护班组：</td><td class="valueColor mapTipValueTdMinWidth">' + '---' + '</td>'
                htmlStr += '</tr>'
                // htmlStr += '<tr>'
                // htmlStr += '</tr>'
                
                
                htmlStr += '</table>'

                htmlStr += '</div>';



                // var opts = {
                //     maxWidth: 1200,
                //     maxHeight: 800,
                //     closeOnClick: false,
                //     className:'baseRoomStyle'
                // };
                // var popup = new L.popup(opts).setContent(htmlStr);


                //添加 dom
                var selfPopupStr = '';
                    selfPopupStr += '<div id="fdc_'+i+'" class="fdc_" style="position:absolute;top:50%;left:50%;margin-top:-159px;margin-left:-436px;width:1150px;height:421px;overflow:hidden;display:none;">'
                    
                    selfPopupStr += '<div class="maptipbg" style="width:100%;height:100%;padding:0px;overflow:hidden;">'
                    selfPopupStr += '<div class="map-info-win-title2">'
                    selfPopupStr += '<div class="wifiWinIcon" style="float:left;display:none"></div>'
                    selfPopupStr += '<div id="popuptitle" style="float:left;margin-left: 10px;">'+oil_machine_name+'</div>'
                    selfPopupStr += '</div>'
                    selfPopupStr += '<div style="clear:both;"></div>'
                    //selfPopupStr += '<div id="fdc_content name="content" style="width:100%;">'
                    selfPopupStr += htmlStr;
                    //selfPopupStr += '</div>'
                    selfPopupStr += '</div>'



                    selfPopupStr += '<div class="fdcClose_ map-icon-close" style="position:absolute;right:5px;top:5px;"></div>';
                    selfPopupStr += '</div>';

                    $('#map').parent().append(selfPopupStr);
                    $('.fdcClose_').off().on('click',function(){
                        $('.fdc_').hide();
                    });

                if(true){
                    carCount3++;
                    //marker=L.marker([lat,lng],{title: line_id, icon: this.markersJKSpecialLine, keepInView:false}).bindPopup(popup).on('click', function(){ $(".leaflet-popup-close-button").html('');$(".leaflet-popup-close-button").addClass('map-icon-close-important'); }).addTo(this.markersLayerJKSpecialLine);
                    //marker=L.marker([lat,lng],{title:'发电车', icon: this.markerFDC, keepInView:false}).bindPopup(popup).on('click', function(){ $(".leaflet-popup-close-button").html('');$(".leaflet-popup-close-button").addClass('map-icon-close-important');$('.leaflet-popup-scrolled').css({borderBottom: 'none',borderTop: 'none',borderTop: 'none',overflowX: 'hidden'}); }).addTo(this.markersLayerCAR3);
                    marker=L.marker([lat,lng],{titleName:oil_machine_name,num:i, icon: this.markerFDC, keepInView:false}).on('mouseover', function(event) {
                            console.log(event);
                            if(event.originalEvent){
                                var x = event.originalEvent.x;
                                var y = event.originalEvent.y + 37;
                                $("#circleTitle").text(event.target.options.titleName);
                                $("#circleTitle").css({top: y,left: x});
                                $("#circleTitle").show();
                            }
                        }).on('mouseout', function(event) {
                            if(event.originalEvent) {
                                $("#circleTitle").hide();
                            }
                        }).on('click',function(){clickEvent(this);}).addTo(this.markersLayerCAR3);
                };

                function clickEvent(ee){
                    var i = ee.options.num; 
                    $('.fdc_').hide();
                    $('#fdc_'+i+'').off().show();
                    CIIE.Map.prototype.hideAllMenue();
                }; 

            }
        }


        
        $('#legendCountELECTRIC').text(carCount3);


    }.bind(this));
};//
CIIE.Map.prototype.getYingjiche = function() {
    //打点
    //var url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-rel-roomByArea?hotspot='+ encodeURIComponent(this.hotspot);
    var url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-rm-emer-car';
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
        var data = result.data;
        var carCount = 0;
        for(var i= 0, len = data.length; i<len;++i){
            if(data[i].lat && data[i].lon && data[i].lat != null && data[i].lon != null ){
                //var latHeatMap = parseFloat(data[i].lat + 0.0025 + this.hotspotInfo.lat),        //偏移
                //lngHeatMap = parseFloat(data[i].lon - 0.0045 + this.hotspotInfo.lon);
                var latHeatMap = parseFloat(data[i].lat),        
                lngHeatMap = parseFloat(data[i].lon);


                var bdPoint = this.wgs84tobd09(lngHeatMap,latHeatMap);
                var point = bdPoint.reverse();
                if(point.length !== 2) continue;


                var lat=latHeatMap;
                var lng=lngHeatMap;

                var number_id = data[i].number_id == "无"?"应急车":data[i].number_id;

                var car_license_tag = data[i].car_license_tag == null?"":data[i].car_license_tag;    
                var car_model = data[i].car_model == null?"":data[i].car_model;    
                var car_manufacturer = data[i].car_manufacturer == null?"":data[i].car_manufacturer;    
                var contacts = data[i].contacts == null?"":data[i].contacts;    
                var contact_tel = data[i].contact_tel == null?"":data[i].contact_tel;    
                var transmission_mode = data[i].transmission_mode == null?"":data[i].transmission_mode;    
                var network_mode = data[i].network_mode == null?"":data[i].network_mode;    
                var gsm_station_name = data[i].gsm_station_name == null?"":data[i].gsm_station_name;    
                var gsm_station_siteid = data[i].gsm_station_siteid == null?"":data[i].gsm_station_siteid;    
                var lte_station_name = data[i].lte_station_name == null?"":data[i].lte_station_name;    
                var lte_station_siteid = data[i].lte_station_siteid == null?"":data[i].lte_station_siteid;    
                var gsm_equipment_manufacturer = data[i].gsm_equipment_manufacturer == null?"":data[i].gsm_equipment_manufacturer;    
                var gsm_equipment_capacity = data[i].gsm_equipment_capacity == null?"":data[i].gsm_equipment_capacity;    
                var gsm_equipment_frequency_band = data[i].gsm_equipment_frequency_band == null?"":data[i].gsm_equipment_frequency_band;    
                var lte_equipment_manufacturer = data[i].lte_equipment_manufacturer == null?"":data[i].lte_equipment_manufacturer;    
                var lte_equipment_capacity = data[i].lte_equipment_capacity == null?"":data[i].lte_equipment_capacity;    
                var lte_equipment_frequency_band = data[i].lte_equipment_frequency_band == null?"":data[i].lte_equipment_frequency_band;    
                var sd_company = data[i].sd_company == null?"":data[i].sd_company;    
                var point_position = data[i].point_position == null?"":data[i].point_position;    
                var working_condition = data[i].working_condition == null?"":data[i].working_condition;    
                var bsc_model = data[i].bsc_model == null?"":data[i].bsc_model;  



                if (number_id == "指挥车") {  //保存指挥车属性,
                    continue;
                }  
                 
                
                




                var htmlStr = '';
                htmlStr += '<div class="popup-content-wx" style="font-size: 30px;padding: 30px;">';
                htmlStr += '<table style="width:100%;height:100%">'
                htmlStr += '<tr>'
                htmlStr += '<td class="htgrfse">车辆牌照：</td><td class="valueColor mapTipValueTdMinWidth">' + car_license_tag + '</td>'
                htmlStr += '<td class="htgrfse">车辆型号：</td><td class="valueColor mapTipValueTdMinWidth">' + car_model + '</td>'
                htmlStr += '</tr>'
                // htmlStr += '<tr>'
                // htmlStr += '</tr>'
                htmlStr += '<tr>'
                htmlStr += '<td class="htgrfse">车辆厂家：</td><td class="valueColor mapTipValueTdMinWidth">' + car_manufacturer + '</td>'
                htmlStr += '<td class="htgrfse">联系人：</td><td class="valueColor mapTipValueTdMinWidth">' + contacts + '</td>'
                htmlStr += '</tr>'
                // htmlStr += '<tr>'
                // htmlStr += '</tr>'
                htmlStr += '<tr>'
                htmlStr += '<td class="htgrfse">联系电话：</td><td class="valueColor mapTipValueTdMinWidth">' + contact_tel + '</td>'
                htmlStr += '<td class="htgrfse">传输方式：</td><td class="valueColor mapTipValueTdMinWidth">' + transmission_mode + '</td>'
                htmlStr += '</tr>'
                // htmlStr += '<tr>'
                // htmlStr += '</tr>'
                htmlStr += '<tr>'
                htmlStr += '<td class="htgrfse">网络制式：</td><td class="valueColor mapTipValueTdMinWidth">' + network_mode + '</td>'
                htmlStr += '<td class="htgrfse">2G设备容量：</td><td class="valueColor mapTipValueTdMinWidth">' + gsm_equipment_capacity + '</td>'
                //htmlStr += '<td class="htgrfse">2G车载站名：</td><td class="valueColor mapTipValueTdMinWidth">' + gsm_station_name + '</td>'
                htmlStr += '</tr>'
                // htmlStr += '<tr>'
                // htmlStr += '</tr>'
                htmlStr += '<tr>'
                //htmlStr += '<td class="htgrfse">2G-SITEID：</td><td class="valueColor mapTipValueTdMinWidth">' + gsm_station_siteid + '</td>'
                //htmlStr += '<td class="htgrfse">4G车载站名：</td><td class="valueColor mapTipValueTdMinWidth">' + lte_station_name + '</td>'
                htmlStr += '</tr>'
                // htmlStr += '<tr>'
                // htmlStr += '</tr>'
                htmlStr += '<tr>'
                //htmlStr += '<td class="htgrfse">4G-SITEID：</td><td class="valueColor mapTipValueTdMinWidth">' + lte_station_siteid + '</td>'
                //htmlStr += '<td class="htgrfse">2G设备厂家：</td><td class="valueColor mapTipValueTdMinWidth">' + gsm_equipment_manufacturer + '</td>'
                htmlStr += '</tr>'
                // htmlStr += '<tr>'
                // htmlStr += '</tr>'
                htmlStr += '<tr>'
                //htmlStr += '<td class="htgrfse">2G设备频段：</td><td class="valueColor mapTipValueTdMinWidth">' + gsm_equipment_frequency_band + '</td>'
                htmlStr += '</tr>'
                // htmlStr += '<tr>'
                // htmlStr += '</tr>'
                htmlStr += '<tr>'
                //htmlStr += '<td class="htgrfse">4G设备厂家：</td><td class="valueColor mapTipValueTdMinWidth">' + lte_equipment_manufacturer + '</td>'
                htmlStr += '<td class="htgrfse">4G设备容量：</td><td class="valueColor mapTipValueTdMinWidth">' + lte_equipment_capacity + '</td>'
                htmlStr += '<td class="htgrfse">4G设备频段：</td><td class="valueColor mapTipValueTdMinWidth">' + lte_equipment_frequency_band + '</td>'
                htmlStr += '</tr>'
                // htmlStr += '<tr>'
                // htmlStr += '</tr>'
                htmlStr += '<tr>'
                htmlStr += '<td class="htgrfse">储备地点：</td><td class="valueColor mapTipValueTdMinWidth">' + sd_company + '</td>'
                htmlStr += '<td class="htgrfse">工作状态：</td><td class="valueColor mapTipValueTdMinWidth">' + working_condition + '</td>'
                htmlStr += '</tr>'
                // htmlStr += '<tr>'
                // htmlStr += '</tr>'
                htmlStr += '<tr>'
                //htmlStr += '<td class="htgrfse">驻点位置：</td><td class="valueColor mapTipValueTdMinWidth">' + point_position + '</td>'
                htmlStr += '</tr>'
                // htmlStr += '<tr>'
                // htmlStr += '</tr>'
                htmlStr += '<tr>'
                //htmlStr += '<td class="htgrfse">维护班组：</td><td class="valueColor mapTipValueTdMinWidth">' + '---' + '</td>'
                htmlStr += '<td class="htgrfse">BSC型号：</td><td class="valueColor mapTipValueTdMinWidth">' + bsc_model + '</td>'
                htmlStr += '</tr>'
                // htmlStr += '<tr>'
                // htmlStr += '</tr>'
                
                htmlStr += '</table>'

                htmlStr += '</div>';



                // var opts = {
                //     maxWidth: 1200,
                //     maxHeight: 1200,
                //     closeOnClick: false,
                //     className:'baseRoomStyle'
                // };
                // var popup = new L.popup(opts).setContent(htmlStr);



                //添加 dom
                var selfPopupStr = '';
                    selfPopupStr += '<div id="yjc_'+i+'" class="yjc_" style="position:absolute;top:50%;left:50%;margin-top:-78px;margin-left:-436px;width:1150px;height:402px;overflow:hidden;display:none;">'
                    
                    selfPopupStr += '<div class="maptipbg" style="width:100%;height:100%;padding:0px;overflow:hidden;">'
                    selfPopupStr += '<div class="map-info-win-title2">'
                    selfPopupStr += '<div class="wifiWinIcon" style="float:left;display:none"></div>'
                    selfPopupStr += '<div id="popuptitle" style="float:left;margin-left: 10px;">'+number_id+'</div>'
                    selfPopupStr += '</div>'
                    selfPopupStr += '<div style="clear:both;"></div>'
                    //selfPopupStr += '<div id="yjc_content name="content" style="width:100%;">'
                    selfPopupStr += htmlStr;
                    //selfPopupStr += '</div>'
                    selfPopupStr += '</div>'



                    selfPopupStr += '<div class="yjcClose_ map-icon-close" style="position:absolute;right:5px;top:5px;"></div>';
                    selfPopupStr += '</div>';

                    $('#map').parent().append(selfPopupStr);
                    $('.yjcClose_').off().on('click',function(){
                        $('.yjc_').hide();
                    });

                if(true){
                    carCount++;
                    //marker=L.marker([lat,lng],{title: line_id, icon: this.markersJKSpecialLine, keepInView:false}).bindPopup(popup).on('click', function(){ $(".leaflet-popup-close-button").html('');$(".leaflet-popup-close-button").addClass('map-icon-close-important'); }).addTo(this.markersLayerJKSpecialLine);
                    //marker=L.marker([lat,lng],{title:number_id, icon: this.markerYJC, keepInView:false}).bindPopup(popup).on('click', function(){ $(".leaflet-popup-close-button").html('');$(".leaflet-popup-close-button").addClass('map-icon-close-important'); $('.leaflet-popup-scrolled').css({borderBottom: 'none',borderTop: 'none',overflowX: 'hidden'});}).addTo(this.markersLayerCAR);
                    //marker=L.marker([lat,lng],{title:number_id, icon: this.markerYJC, keepInView:false}).bindPopup(popup).on('contextmenu',function(e){console.log('右键了....');CIIE.Map.prototype.showYJCRightKey(e,this);}).on('click', function(){ $(".leaflet-popup-close-button").html('');$(".leaflet-popup-close-button").addClass('map-icon-close-important'); $('.leaflet-popup-scrolled').css({borderBottom: 'none',borderTop: 'none',overflowX: 'hidden'});}).addTo(this.markersLayerCAR);
                    marker=L.marker([lat,lng],{titleName:number_id,num:i, icon: this.markerYJC, keepInView:false}).on('contextmenu',function(e){console.log('右键了....');CIIE.Map.prototype.showYJCRightKey(e,this);}).on('mouseover', function(event) {
                            console.log(event);
                            if(event.originalEvent){
                                var x = event.originalEvent.x;
                                var y = event.originalEvent.y + 37;
                                $("#circleTitle").text(event.target.options.titleName);
                                $("#circleTitle").css({top: y,left: x});
                                $("#circleTitle").show();
                            }
                        }).on('mouseout', function(event) {
                            if(event.originalEvent) {
                                $("#circleTitle").hide();
                            }
                        }).on('click',function(){clickEvent(this);}).addTo(this.markersLayerCAR);
                }; 
                function clickEvent(ee){
                    var i = ee.options.num; 
                    $('.yjc_').hide();
                    $('#yjc_'+i+'').off().show();
                    CIIE.Map.prototype.hideAllMenue();
                };

            }
        }


        
          $('#legendCountEC').text(carCount);


    }.bind(this));
};
CIIE.Map.prototype.showYJCRightKey = function(ee,_this) {
        var e = event||e;
        e.preventDefault();
        e.stopPropagation();

        console.log(e);
        console.log(ee);


        var number_id = ee.target.options.title; 



        console.log(number_id);

        //弹出popup 
        var htmlStr = '';
        htmlStr += '<div class="popup-content-wx" style="position:relative">';
        htmlStr += '<div onclick="CIIE.Map.prototype.chooseCurrMenue(this,\'glxqlb\',\''+number_id+'\')" onmouseenter="enterSingleMenue(this)" onmouseleave="leaveSingleMenue(this)" class="singleMenueOfyjcR">关联小区列表</div>';
        htmlStr += '</div>';



        var opts = {
            maxWidth: 1200,
            maxHeight: 1200,
            closeButton:false,
            closeOnClick: false,
            className:'rightKeyStyle'
        };
        var popup = new L.popup(opts).setLatLng(ee.latlng).setContent(htmlStr).openOn(_this._map);

};
CIIE.Map.prototype.chooseCurrMenue = function(dom,menueName,number_id){
    //隐藏应急车右键
    $(".rightKeyStyle").parent('div.leaflet-popup-pane').empty();
    if (menueName == "glxqlb"){ //打开  关联小区列表  表格

        this.showCellList(number_id);



    }

};
function enterSingleMenue(dom){
    $(dom).css('color', '#6EFBFF');
};
function leaveSingleMenue(dom){
    $(dom).css('color', '#fff');
};


CIIE.Map.prototype.showCellList=function(number_id){
    var url='../maptip/relateCellList.jsp?hotspot='+encodeURIComponent(hotspot)
                +'&number_id='+encodeURIComponent(number_id)
                //+'&nettype='+encodeURIComponent(cell_nt)
    var html='<div id="cellListWin" style="position:absolute;top:50%;left:50%;margin-top:-378px;margin-left:-575px;width:1150px;height:796px;overflow:hidden;display:block;">'
                //+'<iframe src="../maptip/relateCellList.jsp" frameborder="0" allowtransparency="true" style="border-radius:10px;width:1150px;height:960px;"></iframe>'
                +'<iframe id="cellListIframe" src="'+url+'" frameborder="0" allowtransparency="true" style="border-radius:10px;width:1150px;height:796px;"></iframe>'
                +'<div id="cellListClose" class="map-icon-close" style="position:absolute;right:5px;top:5px;"></div>'
            +'</div>';
    if($('#cellListWin').length==0){
        $('#map').parent().append(html);
        $('#cellListClose').on('click',function(){
            $('#cellListWin').hide();
            //$('#apListWin').hide();
            //$('div.mapCtrlItem[func="WIFI流量"]').removeClass('mapCtrlItemSelected');
        });
    }else{
        $('#cellListWin').show();
        $('#cellListIframe').attr('src', url);
    }
};







CIIE.Map.prototype.getMaintainMan = function() {
    var _this = this;
    //打点
    //var url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-rel-roomByArea?hotspot='+ encodeURIComponent(this.hotspot);
    var url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-duty-user';
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
        var data = result.data;
        var carCount = 0;
        var carCountD = 0;

      


        var i = -1;
        for(var item in data){
            i++;
            var currGroup = data[item];
            if(currGroup.lat && currGroup.lon && currGroup.lat != null && currGroup.lon != null ){
                //var latHeatMap = parseFloat(currGroup.lat + 0.0025 + this.hotspotInfo.lat),        //偏移
                //lngHeatMap = parseFloat(currGroup.lon - 0.0045 + this.hotspotInfo.lon);
                var latHeatMap = parseFloat(currGroup.lat),        
                lngHeatMap = parseFloat(currGroup.lon);


                var bdPoint = this.wgs84tobd09(lngHeatMap,latHeatMap);
                var point = bdPoint.reverse();
                //if(point.length !== 2) continue;


                var lat=latHeatMap;
                var lng=lngHeatMap;


                var name_ = currGroup.name_ == null?"-":currGroup.name_;   //姓名
                var unit_ = currGroup.unit_ == null?"-":currGroup.unit_;   //单位
                var tel_ = currGroup.tel_ == null?"-":currGroup.tel_;       //手机
                var duty_ = currGroup.duty_ == null?"-":currGroup.duty_;    //职务
                var spec_ = currGroup.spec_ == null?"-":currGroup.spec_;     //专业属性
                var group_ = currGroup.group_ == null?"-":currGroup.group_;   //分组
                var time_ = currGroup.time_ == null?"-":currGroup.time_;    //时段

                var total = currGroup.total == null?"-":currGroup.total;    //组 人员数量

                carCount += total;





                var htmlStr = '';
                htmlStr += '<div class="popup-content-wx" style="font-size: 30px;padding: 30px;">';
                htmlStr += '<table style="width:100%;height:100%">'
                // htmlStr += '<tr>'
                // htmlStr += '<td class="htgrfse">姓名</td><td class="valueColor mapTipValueTdMinWidth">：' + name + '</td>'
                // htmlStr += '</tr>'
                htmlStr += '<tr>'
                htmlStr += '<td class="htgrfse">单位</td><td class="valueColor mapTipValueTdMinWidth">：' + unit_ + '</td>'
                htmlStr += '<td class="htgrfse">手机</td><td class="valueColor mapTipValueTdMinWidth">：' + tel_ + '</td>'
                htmlStr += '</tr>'
                // htmlStr += '<tr>'
                // htmlStr += '</tr>'
                htmlStr += '<tr>'
                htmlStr += '<td class="htgrfse">职务</td><td class="valueColor mapTipValueTdMinWidth">：' + duty_ + '</td>'
                htmlStr += '<td class="htgrfse">专业属性</td><td class="valueColor mapTipValueTdMinWidth">：' + spec_ + '</td>'
                htmlStr += '</tr>'
                // htmlStr += '<tr>'
                // htmlStr += '</tr>'
                htmlStr += '<tr>'
                htmlStr += '<td class="htgrfse">分组</td><td class="valueColor mapTipValueTdMinWidth">：' + group_ + '</td>'
                htmlStr += '<td class="htgrfse">时段</td><td class="valueColor mapTipValueTdMinWidth">：' + time_ + '</td>'
                htmlStr += '</tr>'
                
                
                
                htmlStr += '</table>'

                htmlStr += '</div>';



                // var opts = {
                //     maxWidth: 1200,
                //     maxHeight: 800,
                //     closeOnClick: false,
                //     className:'baseRoomStyle'
                // };
                // var popup = new L.popup(opts).setContent(htmlStr);





                //添加 dom
                var selfPopupStr = '';
                    selfPopupStr += '<div id="bzry_'+i+'" class="bzry_" style="position:absolute;top:50%;left:50%;margin-top:-39px;margin-left:-436px;width:870px;height:237px;overflow:hidden;display:none;">'
                    
                    selfPopupStr += '<div class="maptipbg" style="width:100%;height:100%;padding:0px;overflow:hidden;">'
                    selfPopupStr += '<div class="map-info-win-title2">'
                    selfPopupStr += '<div class="wifiWinIcon" style="float:left;display:none"></div>'
                    selfPopupStr += '<div id="popuptitle" style="float:left;margin-left: 10px;">'+name_+'</div>'
                    selfPopupStr += '</div>'
                    selfPopupStr += '<div style="clear:both;"></div>'
                    //selfPopupStr += '<div id="bzry_content name="content" style="width:100%;">'
                    selfPopupStr += htmlStr;
                    //selfPopupStr += '</div>'
                    selfPopupStr += '</div>'



                    selfPopupStr += '<div class="bzryClose_ map-icon-close" style="position:absolute;right:5px;top:5px;"></div>';
                    selfPopupStr += '</div>';

                    $('#map').parent().append(selfPopupStr);
                    $('.bzryClose_').off().on('click',function(){
                        $('.bzry_').hide();
                    });


                    if(true){
                        //marker=L.marker([lat,lng],{title:name, icon: this.markerMTM, keepInView:false}).bindPopup(popup).on('click', function(){ $(".leaflet-popup-close-button").html('');$(".leaflet-popup-close-button").addClass('map-icon-close-important'); $('.leaflet-popup-scrolled').css({borderBottom: 'none',borderTop: 'none',borderTop: 'none',overflowX: 'hidden'});}).addTo(this.markersLayerMan);
                        //marker=L.marker([lat,lng],{title:name, icon: this.markerMTM, keepInView:false}).on('click', function(){$('#bzry_'+i).show();}).addTo(this.markersLayerMan);
                        var iconIcon = this['markerMM_' + total] || this.markerMTM ;
 
                        //marker=L.marker([lat,lng],{titleName:name,num:i, icon: this.markerMTM, keepInView:false}).on('mouseover', function(event) {
                        marker=L.marker([lat,lng],{titleName:name_,num:i, icon: iconIcon, keepInView:false}).on('mouseover', function(event) {
                                console.log(event);
                                if(event.originalEvent){
                                    var x = event.originalEvent.x;
                                    var y = event.originalEvent.y + 37;
                                    $("#circleTitle").text(event.target.options.titleName);
                                    $("#circleTitle").css({top: y,left: x});
                                    $("#circleTitle").show();
                                }
                            }).on('mouseout', function(event) {
                                if(event.originalEvent) {
                                    $("#circleTitle").hide();
                                }
                            }).on('click',function(){clickEvent(this);}).addTo(this.markersLayerMan);
                    }; 
                    function clickEvent(ee){
                        var i = ee.options.num; 
                        $('.bzry_').hide();
                        $('#bzry_'+i+'').off().show();
                        CIIE.Map.prototype.hideAllMenue();
                    };






            }


        };


        
      $('#legendCountMM').text(carCount);
      $('.rtshbeathearhewar').text(carCount);
      //$('.rtshbeathearhewaregerwgew').text(carCountD);
      $('.rtshbeathearhewaregerwgew').text(carCount);


    }.bind(this));
};




CIIE.Map.prototype.getMaintainManBak = function() {
    var _this = this;
    //打点
    //var url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-rel-roomByArea?hotspot='+ encodeURIComponent(this.hotspot);
    var url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-cfg-emer-person2';
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
        var data = result.data;
        var carCount = 0;
        var carCountD = 0;

        for(var i= 0, len = data.length; i<len;++i){
            if(data[i].lat && data[i].lon && data[i].lat != null && data[i].lon != null ){
                //var latHeatMap = parseFloat(data[i].lat + 0.0025 + this.hotspotInfo.lat),        //偏移
                //lngHeatMap = parseFloat(data[i].lon - 0.0045 + this.hotspotInfo.lon);
                var latHeatMap = parseFloat(data[i].lat),        
                lngHeatMap = parseFloat(data[i].lon);


                var bdPoint = this.wgs84tobd09(lngHeatMap,latHeatMap);
                var point = bdPoint.reverse();
                if(point.length !== 2) continue;


                var lat=latHeatMap;
                var lng=lngHeatMap;

                var id = data[i].id == null?"-":data[i].id;
                var name = data[i].name == null?"保障人员":data[i].name;
                var prop = data[i].prop == null?"-":data[i].prop;
                var type = data[i].type == null?"-":data[i].type;
                var o_c = data[i].o_c == null?"-":data[i].o_c;
                var t_c = data[i].t_c == null?"-":data[i].t_c;
                var spec = data[i].spec == null?"-":data[i].spec;
                var content_ = data[i].content_ == null?"-":data[i].content_;
                var area = data[i].area == null?"-":data[i].area;
                var address = data[i].address == null?"-":data[i].address;
                var city = data[i].city == null?"-":data[i].city;
                var part = data[i].part == null?"-":data[i].part;
                var mc = data[i].mc == null?"-":data[i].mc;
                var grid = data[i].grid == null?"-":data[i].grid;
                var gl = data[i].gl == null?"-":data[i].gl;
                var gl_c = data[i].gl_c == null?"-":data[i].gl_c;
                var m_gl = data[i].m_gl == null?"-":data[i].m_gl;
                var status = data[i].status == null?"-":data[i].status;

                if (status == "已调度") {
                    carCountD ++;
                }
                

                
                




                var htmlStr = '';
                htmlStr += '<div class="popup-content-wx" style="font-size: 30px;padding: 30px;">';
                htmlStr += '<table style="width:100%;height:100%">'
                // htmlStr += '<tr>'
                // htmlStr += '<td class="htgrfse">姓名</td><td class="valueColor mapTipValueTdMinWidth">：' + name + '</td>'
                // htmlStr += '</tr>'
                htmlStr += '<tr>'
                htmlStr += '<td class="htgrfse">属性</td><td class="valueColor mapTipValueTdMinWidth">：' + prop + '</td>'
                htmlStr += '<td class="htgrfse">类别</td><td class="valueColor mapTipValueTdMinWidth">：' + type + '</td>'
                htmlStr += '</tr>'
                // htmlStr += '<tr>'
                // htmlStr += '</tr>'
                htmlStr += '<tr>'
                htmlStr += '<td class="htgrfse">通信手段1</td><td class="valueColor mapTipValueTdMinWidth">：' + o_c + '</td>'
                htmlStr += '<td class="htgrfse">通信手段2</td><td class="valueColor mapTipValueTdMinWidth">：' + t_c + '</td>'
                htmlStr += '</tr>'
                // htmlStr += '<tr>'
                // htmlStr += '</tr>'
                htmlStr += '<tr>'
                htmlStr += '<td class="htgrfse">专业</td><td class="valueColor mapTipValueTdMinWidth">：' + spec + '</td>'
                htmlStr += '<td class="htgrfse">保障内容</td><td class="valueColor mapTipValueTdMinWidth">：' + content_ + '</td>'
                htmlStr += '</tr>'
                // htmlStr += '<tr>'
                // htmlStr += '</tr>'
                htmlStr += '<tr>'
                htmlStr += '<td class="htgrfse">保障区域</td><td class="valueColor mapTipValueTdMinWidth">：' + area + '</td>'
                htmlStr += '<td class="htgrfse">驻点位置</td><td class="valueColor mapTipValueTdMinWidth">：' + address + '</td>'
                htmlStr += '</tr>'
                // htmlStr += '<tr>'
                // htmlStr += '</tr>'
                htmlStr += '<tr>'
                htmlStr += '<td class="htgrfse">属地</td><td class="valueColor mapTipValueTdMinWidth">：' + city + '</td>'
                htmlStr += '<td class="htgrfse">部门</td><td class="valueColor mapTipValueTdMinWidth">：' + part + '</td>'
                htmlStr += '</tr>'
                // htmlStr += '<tr>'
                // htmlStr += '</tr>'
                htmlStr += '<tr>'
                htmlStr += '<td class="htgrfse">代维公司</td><td class="valueColor mapTipValueTdMinWidth">：' + mc + '</td>'
                htmlStr += '<td class="htgrfse">网格</td><td class="valueColor mapTipValueTdMinWidth">：' + grid + '</td>'
                htmlStr += '</tr>'
                // htmlStr += '<tr>'
                // htmlStr += '</tr>'
                htmlStr += '<tr>'
                htmlStr += '<td class="htgrfse">班组长</td><td class="valueColor mapTipValueTdMinWidth">：' + gl + '</td>'
                htmlStr += '<td class="htgrfse">联系方式</td><td class="valueColor mapTipValueTdMinWidth">：' + gl_c + '</td>'
                htmlStr += '</tr>'
                // htmlStr += '<tr>'
                // htmlStr += '</tr>'
                htmlStr += '<tr>'
                htmlStr += '<td class="htgrfse">维护班组</td><td class="valueColor mapTipValueTdMinWidth">：' + m_gl + '</td>'
                htmlStr += '<td class="htgrfse">调度状态</td><td class="valueColor mapTipValueTdMinWidth">：' + status + '</td>'
                htmlStr += '</tr>'
                // htmlStr += '<tr>'
                // htmlStr += '</tr>'
                
                
                htmlStr += '</table>'

                htmlStr += '</div>';



                // var opts = {
                //     maxWidth: 1200,
                //     maxHeight: 800,
                //     closeOnClick: false,
                //     className:'baseRoomStyle'
                // };
                // var popup = new L.popup(opts).setContent(htmlStr);





                //添加 dom
                var selfPopupStr = '';
                    selfPopupStr += '<div id="bzry_'+i+'" class="bzry_" style="position:absolute;top:50%;left:50%;margin-top:-159px;margin-left:-436px;width:1150px;height:454px;overflow:hidden;display:none;">'
                    
                    selfPopupStr += '<div class="maptipbg" style="width:100%;height:100%;padding:0px;overflow:hidden;">'
                    selfPopupStr += '<div class="map-info-win-title2">'
                    selfPopupStr += '<div class="wifiWinIcon" style="float:left;display:none"></div>'
                    selfPopupStr += '<div id="popuptitle" style="float:left;margin-left: 10px;">'+name+'</div>'
                    selfPopupStr += '</div>'
                    selfPopupStr += '<div style="clear:both;"></div>'
                    //selfPopupStr += '<div id="bzry_content name="content" style="width:100%;">'
                    selfPopupStr += htmlStr;
                    //selfPopupStr += '</div>'
                    selfPopupStr += '</div>'



                    selfPopupStr += '<div class="bzryClose_ map-icon-close" style="position:absolute;right:5px;top:5px;"></div>';
                    selfPopupStr += '</div>';

                    $('#map').parent().append(selfPopupStr);
                    $('.bzryClose_').off().on('click',function(){
                        $('.bzry_').hide();
                    });




                if(true){
                    carCount++;
                    //marker=L.marker([lat,lng],{title:name, icon: this.markerMTM, keepInView:false}).bindPopup(popup).on('click', function(){ $(".leaflet-popup-close-button").html('');$(".leaflet-popup-close-button").addClass('map-icon-close-important'); $('.leaflet-popup-scrolled').css({borderBottom: 'none',borderTop: 'none',borderTop: 'none',overflowX: 'hidden'});}).addTo(this.markersLayerMan);
                    //marker=L.marker([lat,lng],{title:name, icon: this.markerMTM, keepInView:false}).on('click', function(){$('#bzry_'+i).show();}).addTo(this.markersLayerMan);
                    marker=L.marker([lat,lng],{titleName:name,num:i, icon: this.markerMTM, keepInView:false}).on('mouseover', function(event) {
                            console.log(event);
                            if(event.originalEvent){
                                var x = event.originalEvent.x;
                                var y = event.originalEvent.y + 37;
                                $("#circleTitle").text(event.target.options.titleName);
                                $("#circleTitle").css({top: y,left: x});
                                $("#circleTitle").show();
                            }
                        }).on('mouseout', function(event) {
                            if(event.originalEvent) {
                                $("#circleTitle").hide();
                            }
                        }).on('click',function(){clickEvent(this);}).addTo(this.markersLayerMan);
                }; 
                function clickEvent(ee){
                    var i = ee.options.num; 
                    $('.bzry_').hide();
                    $('#bzry_'+i+'').off().show();
                    CIIE.Map.prototype.hideAllMenue();
                };


                

            }
        }


        
      $('#legendCountMM').text(carCount);
      $('.rtshbeathearhewar').text(carCount);
      $('.rtshbeathearhewaregerwgew').text(carCountD);


    }.bind(this));
};

CIIE.Map.prototype.seekRoomVideoDiv=function(roomName,MKorNC){

    $("#roomVideo_set").show();


    $("#roomVideo").show();
    $("#roomVideoTitleSpan").text(roomName);

    //处理iframe
    $("#roomVideoIframe").show();
    $("#roomVideoIframeOfset").hide();
    $("#roomVideo_set").attr('values', '0');
    $("#roomVideo_set").removeClass().addClass('setIcon001');
    $("#roomVideoIframeOfset").attr('src', '');



    if (roomName.indexOf('A0') > -1) {
        $("#roomVideoIframe").attr('src', BASEPATH +  '/pages/local-lsm/videoOfMachineRoom/videoOfMachineRoom.jsp?isScreenMode=true&roomName=A0'+MKorNC+'&videoWidth=1888&videoHeight=821');
    }
    if (roomName.indexOf('B0') > -1) {
        $("#roomVideoIframe").attr('src', BASEPATH +  '/pages/local-lsm/videoOfMachineRoom/videoOfMachineRoom.jsp?isScreenMode=true&roomName=B0'+MKorNC+'&videoWidth=1888&videoHeight=821');
    }
    if (roomName.indexOf('C0') > -1) {
        $("#roomVideoIframe").attr('src', BASEPATH +  '/pages/local-lsm/videoOfMachineRoom/videoOfMachineRoom.jsp?isScreenMode=true&roomName=C0'+MKorNC+'&videoWidth=1888&videoHeight=821');
    }
    if (roomName.indexOf('D0') > -1) {
        $("#roomVideoIframe").attr('src', BASEPATH +  '/pages/local-lsm/videoOfMachineRoom/videoOfMachineRoom.jsp?isScreenMode=true&roomName=D0'+MKorNC+'&videoWidth=1888&videoHeight=821');
    }
    if (roomName.indexOf('E1') > -1) {
        $("#roomVideoIframe").attr('src', BASEPATH +  '/pages/local-lsm/videoOfMachineRoom/videoOfMachineRoom.jsp?isScreenMode=true&roomName=E1'+MKorNC+'&videoWidth=1888&videoHeight=821');
    }

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
//          markerE.addTo(this.markersLayerExpand);
            baseR+=iconSize/6;
        }
    }
};

CIIE.Map.prototype.updateHeat=function(selectTime,callBack){
//  this.cdm.
    
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


    var gradient1 =  this.hotMapColorCircle[0] / 100;
    var gradient2 =  this.hotMapColorCircle[1] / 100;
    var gradient3 =  this.hotMapColorCircle[2] / 100;
    var gradient4 =  this.hotMapColorCircle[3] / 100;

    var gradient = {};
    gradient[gradient1] = "#f75d5d";
    gradient[gradient2] = "yellow";
    gradient[gradient3] = "green";
    gradient[gradient4] = "blue";

    var cfg = {
        // radius should be small ONLY if scaleRadius is true (or small radius is intended)
        "radius": radius,
        "maxOpacity": 0.8,
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
        valueField: 'value',
        //红橙黄蓝 old
        // gradient:{
        //             "1"   : "#FE1103",
        //             "0.75": "#F3FC40",
        //             "0.5" : "#7EF35F",
        //             "0.25": "#B2B7EB"
        //         }
        //红橙绿蓝 
        // gradient:{
        //             //"1"   : "#ff0000",
        //             "1"   : "#f75d5d",  //FF7F50
        //             "0.9": "yellow",
        //             "0.5" : "green",
        //             "0.25": "blue"
        //         }   
        gradient:gradient
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
         // if(temVal > 10000){
         //     heatMap[i].value = (heatMap[i].value)/10;
         // }
         // if(temVal > 5000 && temVal < 10000 ){
         //     heatMap[i].value = (heatMap[i].value)/2;
         // }
         sum = sum + heatMap[i].value;
         if (maxHeatValue < temVal){
             maxHeatValue = temVal;
             //console.log(heatMap[i].lacci+'======='+temVal);
         }
         if (minHeatValue > temVal){
             minHeatValue = temVal;
         }
     }

     var rateValue = 1;  
     var _toFixed = 0;
     var indexName = $("#hotMapMenue2").find('.indexNameSelect').text(); 
     if (FROMMODEL == null || FROMMODEL == "null") {
         if (indexName.indexOf("流量") > -1) {
             rateValue = 1/1024/1024;
             _toFixed = 1;
         }
         if (indexName.indexOf("话务量") > -1) {
             _toFixed = 1;
         }
     }else if (FROMMODEL == 'ciie'){
        if (indexName.indexOf("流量") > -1) {
            rateValue = 1/1024/1024;
             _toFixed = 1;
        }
        if (indexName.indexOf("话务量") > -1) {
             _toFixed = 1;
        }
     }

     var _1_value = "[" + parseInt(maxHeatValue * this.hotMapColorCircle[1] /100 * rateValue) +","+ parseInt(maxHeatValue * rateValue) + ")";
     $("#hotMapMenue2").find('.selfValue1').html( parseFloat(maxHeatValue * this.hotMapColorCircle[1] /100 * rateValue).toFixed(_toFixed) );

     var _2_value = "[" + parseInt(maxHeatValue * this.hotMapColorCircle[2] /100 * rateValue) +","+ parseInt(maxHeatValue * this.hotMapColorCircle[1] /100 * rateValue) + ")";
     $("#hotMapMenue2").find('.selfValue2').html( parseFloat(maxHeatValue * this.hotMapColorCircle[2] /100 * rateValue).toFixed(_toFixed) );

     var _3_value = "[" + parseInt(maxHeatValue * this.hotMapColorCircle[3] /100 * rateValue) +","+ parseInt(maxHeatValue * this.hotMapColorCircle[2] /100 * rateValue) + ")";
     $("#hotMapMenue2").find('.selfValue3').html( parseFloat(maxHeatValue * this.hotMapColorCircle[3] /100 * rateValue).toFixed(_toFixed) );

     var _4_value = "[" + 0 +","+ parseInt(maxHeatValue * this.hotMapColorCircle[3] /100 * rateValue) + ")";
     //$("#hotMapMenue2").find('.selfValue4').html(_4_value);


    
    var map=this.map; 
    var curZoom = map.getZoom();  
    var aveHeatValue = Math.ceil(sum/heatMap.length);
    
    // maxHeatValue=2000;//aveHeatValue;

    // if (this.heatKpi == "用户数") {
    //     switch (curZoom){
    //         case 10:
    //             maxHeatValue = 25000*cjRate_yhs;
    //             break;
    //         case 11:
    //             maxHeatValue = 22000*cjRate_yhs;
    //             break;
    //         case 12:
    //             maxHeatValue = 8000*cjRate_yhs;
    //             break;
    //         case 13:
    //             maxHeatValue = 7000*cjRate_yhs;
    //             break;
    //         case 14:
    //             maxHeatValue = 6000*cjRate_yhs;
    //             break;
    //         case 15:
    //             maxHeatValue = 5000*cjRate_yhs;
    //             break;
    //         case 16:
    //             maxHeatValue = 4000*cjRate_yhs;
    //             break;
    //         case 17:
    //             maxHeatValue = 3000*cjRate_yhs;
    //             break;
    //         default:
    //             maxHeatValue = 2000*cjRate_yhs;
    //             break;
    //     }

    // }else if (this.heatKpi == "流量") {
    //     switch (curZoom){
    //         case 10:
    //             maxHeatValue = 85000000*cjRate_ll;
    //             break;
    //         case 11:
    //             maxHeatValue = 72000000*cjRate_ll;
    //             break;
    //         case 12:
    //             maxHeatValue = 32000000*cjRate_ll;
    //             break;
    //         case 13:
    //             maxHeatValue = 10000000*cjRate_ll;
    //             break;
    //         case 14:
    //             maxHeatValue = 7000000*cjRate_ll;
    //             break;
    //         case 15:
    //             maxHeatValue = 5000000*cjRate_ll;
    //             break;
    //         case 16:
    //             maxHeatValue = 4000000*cjRate_ll;
    //             break;
    //         case 17:
    //             maxHeatValue = 3000000*cjRate_ll;
    //             break;
    //         default:
    //             maxHeatValue = 2000000*cjRate_ll;
    //             break;
    //     }

    // }else if (this.heatKpi == "话务量") {
    //     switch (curZoom){
    //         case 10:
    //             maxHeatValue = 250*cjRate_hwl;
    //             break;
    //         case 11:
    //             maxHeatValue = 220*cjRate_hwl;
    //             break;
    //         case 12:
    //             maxHeatValue = 80*cjRate_hwl;
    //             break;
    //         case 13:
    //             maxHeatValue = 70*cjRate_hwl;
    //             break;
    //         case 14:
    //             maxHeatValue = 60*cjRate_hwl;
    //             break;
    //         case 15:
    //             maxHeatValue = 50*cjRate_hwl;
    //             break;
    //         case 16:
    //             maxHeatValue = 40*cjRate_hwl;
    //             break;
    //         case 17:
    //             maxHeatValue = 30*cjRate_hwl;
    //             break;
    //         default:
    //             maxHeatValue = 20*cjRate_hwl;
    //             break;
    //     }

    // }




    testData={max: maxHeatValue, min: minHeatValue, data: heatMap};
    //testData = {data: heatMap};
    cfg.max=maxHeatValue;
    cfg.min=minHeatValue;
    
//  testData = {data: heatMap};
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


    var gradient1 =  this.hotMapColorCircle[0] / 100;
    var gradient2 =  this.hotMapColorCircle[1] / 100;
    var gradient3 =  this.hotMapColorCircle[2] / 100;
    var gradient4 =  this.hotMapColorCircle[3] / 100;

    var gradient = {};
    gradient[gradient1] = "#f75d5d";
    gradient[gradient2] = "yellow";
    gradient[gradient3] = "green";
    gradient[gradient4] = "blue";


    var cfg = {
        // radius should be small ONLY if scaleRadius is true (or small radius is intended)
        "radius": radius,
        "maxOpacity": 0.8,
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
        valueField: 'value',
        //红橙黄蓝 old
        // gradient:{
        //             "1"   : "#FE1103",
        //             "0.75": "#F3FC40",
        //             "0.5" : "#7EF35F",
        //             "0.25": "#B2B7EB"
        //         }
        //红橙绿蓝 
        // gradient:{
        //             "1"   : "#ff0000",
        //             "0.9": "yellow",
        //             "0.5" : "green",
        //             "0.25": "blue"
        //         }   
        gradient:gradient
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


     var rateValue = 1;  
     var _toFixed = 0;
     var indexName = $("#hotMapMenue1").find('.indexNameSelect').text(); 
     if (FROMMODEL == null || FROMMODEL == "null") {
         if (indexName.indexOf("流量") > -1) {
             rateValue = 1/1024/1024;
             _toFixed = 1;
         }
         if (indexName.indexOf("话务量") > -1) {
             _toFixed = 1;
        }
     }else if (FROMMODEL == 'ciie'){
        if (indexName.indexOf("流量") > -1) {
            rateValue = 1/1024/1024;
             _toFixed = 1;
        }
        if (indexName.indexOf("话务量") > -1) {
             _toFixed = 1;
        }

     }

     var _1_value = "[" + parseInt(maxHeatValue * this.hotMapColorCircle[1] /100 * rateValue) +","+ parseInt(maxHeatValue * rateValue) + ")";
     $("#hotMapMenue1").find('.selfValue1').html( parseFloat(maxHeatValue * this.hotMapColorCircle[1] /100 * rateValue).toFixed(_toFixed) );

     var _2_value = "[" + parseInt(maxHeatValue * this.hotMapColorCircle[2] /100 * rateValue) +","+ parseInt(maxHeatValue * this.hotMapColorCircle[1] /100 * rateValue) + ")";
     $("#hotMapMenue1").find('.selfValue2').html( parseFloat(maxHeatValue * this.hotMapColorCircle[2] /100 * rateValue).toFixed(_toFixed) );

     var _3_value = "[" + parseInt(maxHeatValue * this.hotMapColorCircle[3] /100 * rateValue) +","+ parseInt(maxHeatValue * this.hotMapColorCircle[2] /100 * rateValue) + ")";
     $("#hotMapMenue1").find('.selfValue3').html( parseFloat(maxHeatValue * this.hotMapColorCircle[3] /100 * rateValue).toFixed(_toFixed) );

     var _4_value = "[" + 0 +","+ parseInt(maxHeatValue * this.hotMapColorCircle[3] /100 * rateValue) + ")";
     //$("#hotMapMenue1").find('.selfValue4').html(_4_value);



    var map=this.map; 
    var curZoom = map.getZoom(); 
    var aveHeatValue = Math.ceil(sum/heatMap.length);
    
//     maxHeatValue=2000;//aveHeatValue;
// //maxmin
//     if (this.heatKpiOfAll == "用户数") {
//         switch (curZoom){
//             case 10:
//                 maxHeatValue = 25000*allRate_yhs;
//                 break;
//             case 11:
//                 maxHeatValue = 22000*allRate_yhs;
//                 break;
//             case 12:
//                 maxHeatValue = 8000*allRate_yhs;
//                 break;
//             case 13:
//                 maxHeatValue = 7000*allRate_yhs;
//                 break;
//             case 14:
//                 maxHeatValue = 6000*allRate_yhs;
//                 break;
//             case 15:
//                 maxHeatValue = 5000*allRate_yhs;
//                 break;
//             case 16:
//                 maxHeatValue = 4000*allRate_yhs;
//                 break;
//             case 17:
//                 maxHeatValue = 3000*allRate_yhs;
//                 break;
//             default:
//                 maxHeatValue = 2000*allRate_yhs;
//                 break;
//         }

//     }else if (this.heatKpiOfAll == "流量") {
//         switch (curZoom){
//             case 10:
//                 maxHeatValue = 85000000*allRate_ll;
//                 break;
//             case 11:
//                 maxHeatValue = 72000000*allRate_ll;
//                 break;
//             case 12:
//                 maxHeatValue = 32000000*allRate_ll;
//                 break;
//             case 13:
//                 maxHeatValue = 10000000*allRate_ll;
//                 break;
//             case 14:
//                 maxHeatValue = 7000000*allRate_ll;
//                 break;
//             case 15:
//                 maxHeatValue = 5000000*allRate_ll;
//                 break;
//             case 16:
//                 maxHeatValue = 4000000*allRate_ll;
//                 break;
//             case 17:
//                 maxHeatValue = 3000000*allRate_ll;
//                 break;
//             default:
//                 maxHeatValue = 2000000*allRate_ll;
//                 break;
//         }

//     }else if (this.heatKpiOfAll == "话务量") {
//         switch (curZoom){
//             case 10:
//                 maxHeatValue = 250*allRate_hwl;
//                 break;
//             case 11:
//                 maxHeatValue = 220*allRate_hwl;
//                 break;
//             case 12:
//                 maxHeatValue = 80*allRate_hwl;
//                 break;
//             case 13:
//                 maxHeatValue = 70*allRate_hwl;
//                 break;
//             case 14:
//                 maxHeatValue = 60*allRate_hwl;
//                 break;
//             case 15:
//                 maxHeatValue = 50*allRate_hwl;
//                 break;
//             case 16:
//                 maxHeatValue = 40*allRate_hwl;
//                 break;
//             case 17:
//                 maxHeatValue = 30*allRate_hwl;
//                 break;
//             default:
//                 maxHeatValue = 20*allRate_hwl;
//                 break;
//         }

//     }

    


    testData={max: maxHeatValue, min: minHeatValue, data: heatMap};
    //testData = {data: heatMap};
    cfg.max=maxHeatValue;
    cfg.min=minHeatValue;
    
//  testData = {data: heatMap};
    this.heatMapLayerOfAll4BigClass = new HeatmapOverlay(cfg);
    this.map.addLayer(this.heatMapLayerOfAll4BigClass);
    this.heatMapLayerOfAll4BigClass.setData(testData);
}


//添加全网热力图
CIIE.Map.prototype.updateHeatOfAllNet=function(selectTime,callBack){
    
    if(this.heatKpiOfAllNet=='用户数'){
        this.cdm.getHeatDataOfAllNet({
        },function(result){
            //this.heatDataHandlerOfAllNet.apply(this,[result,'s_091']);
            this.heatDataHandlerOfAllNet.apply(this,[result.data,'yhs']);
            if(callBack!=null){
                callBack.apply(this,[this.reformatDateStr(time)]);
            }
        }.bind(this));
        
    }else if(this.heatKpiOfAllNet=='4G流量' || this.heatKpiOfAllNet=='流量'){//s_213
        this.cdm.getHeatDataOfAllNet({
        },function(result){
            //this.heatDataHandlerOfAllNet.apply(this,[result,'s_213']);
            this.heatDataHandlerOfAllNet.apply(this,[result.data,'ll']);
            if(callBack!=null){
                callBack.apply(this,[this.reformatDateStr(time)]);
            }
        }.bind(this));
    }else if(this.heatKpiOfAllNet=='VOLTE话务量' || this.heatKpiOfAllNet=='话务量'){ //volte_voice_teletraffic
        this.cdm.getHeatDataOfAllNet({
        },function(result){
            //this.heatDataHandlerOfAllNet.apply(this,[result,'volte_voice_teletraffic']);
            //this.heatDataHandlerOfAllNet.apply(this,[result,'ltehwl']);
            this.heatDataHandlerOfAllNet.apply(this,[result.data,'hwl']);
            if(callBack!=null){
                callBack.apply(this,[this.reformatDateStr(time)]);
            }
        }.bind(this));
    }else if(this.heatKpiOfAllNet=='GSM话务量'){//gsmhwl
        this.cdm.getHeatDataOfAllNet({
        },function(result){
            this.heatDataHandlerOfAllNet.apply(this,[result.data,'gsmhwl']);
            if(callBack!=null){
                callBack.apply(this,[this.reformatDateStr(time)]);
            }
        }.bind(this));
    }
    
};
CIIE.Map.prototype.heatDataHandlerOfAllNet=function(result,key){
    //heatMapOfAllNet
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

    this.heatMapOfAllNet = data;
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
    this.heatMapRenderOfAllNet(this.heatMapOfAllNet,this.radiusHeatMap);
//    this.rerenderHeatMap();
    console.timeEnd('heatMapRender');
};

CIIE.Map.prototype.rerenderHeatMapOfAllNet=function(){
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
    if(this.heatMapOfAllNet==null||this.heatMapOfAllNet.length <= 0) return;//无缓存数据不渲染
    this.heatMapRenderOfAllNet(this.heatMapOfAllNet,this.radiusHeatMap);
}

CIIE.Map.prototype.heatMapRenderOfAllNet=function(temArr,radius) {

    var flagFlag = $("#ctrlFunction").find('div.hotMapOfAllNet').eq(0).parent('div').eq(0).hasClass('mapCtrlItemSelected');
    if (!flagFlag) {return;};


    var heatMap = this.mergeSame(temArr.sort(this.keySort('lat')),'lat','lng');
    if(this.heatMapLayerOfAllNet !== undefined && this.heatMapLayerOfAllNet != null){
        if (this.heatMapLayerOfAllNet._data){
            this.map.removeLayer(this.heatMapLayerOfAllNet);
        }
    }

    var testData = new Object();

    var gradient1 =  this.hotMapColorCircle[0] / 100;
    var gradient2 =  this.hotMapColorCircle[1] / 100;
    var gradient3 =  this.hotMapColorCircle[2] / 100;
    var gradient4 =  this.hotMapColorCircle[3] / 100;

    var gradient = {};
    gradient[gradient1] = "#f75d5d";
    gradient[gradient2] = "yellow";
    gradient[gradient3] = "green";
    gradient[gradient4] = "blue";


    var cfg = {
        // radius should be small ONLY if scaleRadius is true (or small radius is intended)
        "radius": radius,
        "maxOpacity": 0.8,
        //"opacity":0.2,
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
        valueField: 'value',
        //红橙黄蓝 old
        // gradient:{
        //             "1"   : "#FE1103",
        //             "0.75": "#F3FC40",
        //             "0.5" : "#7EF35F",
        //             "0.25": "#B2B7EB"
        //         }
        //红橙绿蓝 
        // gradient:{
        //             "1"   : "#ff0000",
        //             "0.9": "yellow",
        //             "0.5" : "green",
        //             "0.25": "blue"
        //         }        
        gradient:gradient
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




    var rateValue = 1;  
     var _toFixed = 0;
     var indexName = $("#hotMapMenue3").find('.indexNameSelect').text(); 
     if (FROMMODEL == null || FROMMODEL == "null") {
         if (indexName.indexOf("流量") > -1) {
             rateValue = 1/1024;
             _toFixed = 1;
         }
         if (indexName.indexOf("话务量") > -1) {
             _toFixed = 1;
        }
     }else if (FROMMODEL == 'ciie'){
        if (indexName.indexOf("流量") > -1) {
            rateValue = 1/1024;
             _toFixed = 1;
        }
        if (indexName.indexOf("话务量") > -1) {
             _toFixed = 1;
        }

     }

    var _1_value = "[" + parseInt(maxHeatValue * this.hotMapColorCircle[1] /100 * rateValue) +","+ parseInt(maxHeatValue * rateValue) + ")";
    $("#hotMapMenue3").find('.selfValue1').html( parseFloat(maxHeatValue * this.hotMapColorCircle[1] /100 * rateValue).toFixed(_toFixed) );

    var _2_value = "[" + parseInt(maxHeatValue * this.hotMapColorCircle[2] /100 * rateValue) +","+ parseInt(maxHeatValue * this.hotMapColorCircle[1] /100 * rateValue) + ")";
    $("#hotMapMenue3").find('.selfValue2').html( parseFloat(maxHeatValue * this.hotMapColorCircle[2] /100 * rateValue).toFixed(_toFixed) );

    var _3_value = "[" + parseInt(maxHeatValue * this.hotMapColorCircle[3] /100 * rateValue) +","+ parseInt(maxHeatValue * this.hotMapColorCircle[2] /100 * rateValue) + ")";
    $("#hotMapMenue3").find('.selfValue3').html( parseFloat(maxHeatValue * this.hotMapColorCircle[3] /100 * rateValue).toFixed(_toFixed) );

    var _4_value = "[" + 0 +","+ parseInt(maxHeatValue * this.hotMapColorCircle[3] /100 * rateValue) + ")";
    //$("#hotMapMenue3").find('.selfValue4').html(_4_value);







    var map=this.map; 
    var curZoom = map.getZoom(); 
    var aveHeatValue = Math.ceil(sum/heatMap.length);
    
//     maxHeatValue=2000;//aveHeatValue;
// //maxmin   全网
//     if (this.heatKpiOfAllNet == "用户数") {
//         switch (curZoom){
//             case 10:
//                 maxHeatValue = 2500*allNetRate_yhs;
//                 break;
//             case 11:
//                 maxHeatValue = 2200*allNetRate_yhs;
//                 break;
//             case 12:
//                 maxHeatValue = 800*allNetRate_yhs;
//                 break;
//             case 13:
//                 maxHeatValue = 700*allNetRate_yhs;
//                 break;
//             case 14:
//                 maxHeatValue = 600*allNetRate_yhs;
//                 break;
//             case 15:
//                 maxHeatValue = 500*allNetRate_yhs;
//                 break;
//             case 16:
//                 maxHeatValue = 400*allNetRate_yhs;
//                 break;
//             case 17:
//                 maxHeatValue = 300*allNetRate_yhs;
//                 break;
//             default:
//                 maxHeatValue = 200*allNetRate_yhs;
//                 break;
//         }

//     }else if (this.heatKpiOfAllNet == "流量") {
//         switch (curZoom){
//             case 10:
//                 maxHeatValue = 8500000*allNetRate_ll;
//                 break;
//             case 11:
//                 maxHeatValue = 7200000*allNetRate_ll;
//                 break;
//             case 12:
//                 maxHeatValue = 3200000*allNetRate_ll;
//                 break;
//             case 13:
//                 maxHeatValue = 1000000*allNetRate_ll;
//                 break;
//             case 14:
//                 maxHeatValue = 700000*allNetRate_ll;
//                 break;
//             case 15:
//                 maxHeatValue = 500000*allNetRate_ll;
//                 break;
//             case 16:
//                 maxHeatValue = 400000*allNetRate_ll;
//                 break;
//             case 17:
//                 maxHeatValue = 300000*allNetRate_ll;
//                 break;
//             default:
//                 maxHeatValue = 200000*allNetRate_ll;
//                 break;
//         }

//     }else if (this.heatKpiOfAllNet == "话务量") {
//         switch (curZoom){
//             case 10:
//                 maxHeatValue = 250*allNetRate_hwl;
//                 break;
//             case 11:
//                 maxHeatValue = 220*allNetRate_hwl;
//                 break;
//             case 12:
//                 maxHeatValue = 80*allNetRate_hwl;
//                 break;
//             case 13:
//                 maxHeatValue = 70*allNetRate_hwl;
//                 break;
//             case 14:
//                 maxHeatValue = 60*allNetRate_hwl;
//                 break;
//             case 15:
//                 maxHeatValue = 50*allNetRate_hwl;
//                 break;
//             case 16:
//                 maxHeatValue = 40*allNetRate_hwl;
//                 break;
//             case 17:
//                 maxHeatValue = 30*allNetRate_hwl;
//                 break;
//             default:
//                 maxHeatValue = 20*allNetRate_hwl;
//                 break;
//         }

//     }

    


    testData={max: maxHeatValue, min: minHeatValue, data: heatMap};
    //testData = {data: heatMap};
    cfg.max=maxHeatValue;
    cfg.min=minHeatValue;
    
//  testData = {data: heatMap};
    this.heatMapLayerOfAllNet = new HeatmapOverlay(cfg);
    this.map.addLayer(this.heatMapLayerOfAllNet);
    this.heatMapLayerOfAllNet.setData(testData);
}

//添加路段热力图 图层
CIIE.Map.prototype.addLayerOfRoad = function(){
        var allHotspot = 'J-交通枢纽';
        var allHotspot = 'J-国家会展中心,J-交通枢纽,J-保障线路,J-酒店';
        var _format="yyyy-MM-dd hh:mm:ss";
        //var time = SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN, _format);
        
        var url = '';
        if(this.heatKpiOfRoad=='用户数'){
            this.cdm.getRoadData({
                //hotspot:this.hotspot,
                // hotspot:allHotspot,
                // time:time
            },function(result){
                this.addLayerOfRoadData.apply(this,[result,'yhs']);
            }.bind(this));
            
        }else if(this.heatKpiOfRoad=='4G流量' || this.heatKpiOfRoad=='流量'){//s_213
            this.cdm.getRoadData({
                //hotspot:this.hotspot,
                // hotspot:allHotspot,
                // time:time
            },function(result){
                this.addLayerOfRoadData.apply(this,[result,'ll']);
            }.bind(this));
        }else if(this.heatKpiOfRoad=='VOLTE话务量' || this.heatKpiOfRoad=='话务量'){ //volte_voice_teletraffic
            this.cdm.getRoadData({
                //hotspot:this.hotspot,
                // hotspot:allHotspot,
                // time:time
            },function(result){
                //this.addLayerOfRoadData.apply(this,[result,'volte_voice_teletraffic']);
                this.addLayerOfRoadData.apply(this,[result,'hwl']);
            }.bind(this));
        }


};
CIIE.Map.prototype.addLayerOfRoadData=function(result,key){
    this.heatMapLayerOfRoad = new L.featureGroup();
    this.map.addLayer(this.heatMapLayerOfRoad);
    var dataObj = result.data;

    var indexArr = [];
    for(var index in dataObj){
        indexArr.push(index);
    }

    

    //获取最大值
    var maxRoadValue = 0;
    for (var tt = 0; tt < indexArr.length; tt++) {
        var currArr = dataObj[indexArr[tt]];
        currArr.sort(function(a,b){return a["seq"]-b["seq"];});
        for (var rr = 0; rr < currArr.length; rr++) {
            var currObj = currArr[rr];
            var temVal = parseFloat(currObj[key]=="-"?0:currObj[key]);
            if(isNaN(temVal)){
                heatMap[i].value = 0;
            }
            if (maxRoadValue < temVal){
                maxRoadValue = temVal;
            }
        }
    }

    console.error("maxRoadValue====="+maxRoadValue);




    var rate_1 =  this.hotMapColorCircle[0] / 100;   //  1
    var rate_2 =  this.hotMapColorCircle[1] / 100;
    var rate_3 =  this.hotMapColorCircle[2] / 100;
    var rate_4 =  this.hotMapColorCircle[3] / 100;



    //阈值控制列表
    var threshold1 = 30;
    var threshold2 = 60;
    var threshold3 = 90;
    if (key == 'yhs') {
        // threshold1 = 5000;
        // threshold2 = 8000;
        // threshold3 = 20000;

        threshold1 = parseInt(maxRoadValue * rate_4);
        threshold2 = parseInt(maxRoadValue * rate_3);
        threshold3 = parseInt(maxRoadValue * rate_2);

        $("#hotMapMenue4").find('.selfValue1').html(threshold3);
        $("#hotMapMenue4").find('.selfValue2').html(threshold2);
        $("#hotMapMenue4").find('.selfValue3').html(threshold1);




    }else if (key == 'll') {
        // threshold1 = 100000;
        // threshold2 = 300000;
        // threshold3 = 800000;
        threshold1 = parseFloat(maxRoadValue * rate_4);
        threshold2 = parseFloat(maxRoadValue * rate_3);
        threshold3 = parseFloat(maxRoadValue * rate_2);

        $("#hotMapMenue4").find('.selfValue1').html(parseFloat(threshold3 /1024/1024).toFixed(1));
        $("#hotMapMenue4").find('.selfValue2').html(parseFloat(threshold2 /1024/1024).toFixed(1));
        $("#hotMapMenue4").find('.selfValue3').html(parseFloat(threshold1 /1024/1024).toFixed(1));
    }else if (key == 'hwl') {
        // threshold1 = 100;
        // threshold2 = 200;
        // threshold3 = 500;

        threshold1 = parseFloat(maxRoadValue * rate_4);
        threshold2 = parseFloat(maxRoadValue * rate_3);
        threshold3 = parseFloat(maxRoadValue * rate_2);

        $("#hotMapMenue4").find('.selfValue1').html(parseFloat(threshold3).toFixed(1));
        $("#hotMapMenue4").find('.selfValue2').html(parseFloat(threshold2).toFixed(1));
        $("#hotMapMenue4").find('.selfValue3').html(parseFloat(threshold1).toFixed(1));
    }



    
    for (var j = 0; j < indexArr.length; j++) {
        var currArr = dataObj[indexArr[j]];
        currArr.sort(function(a,b){return a["seq"]-b["seq"];});
        for (var i = 0; i < currArr.length; i++) {
            if((i+1) >= currArr.length){continue;};
            var currObj = currArr[i];
            var currObj_ = currArr[i+1]; //下一个元素

            
            var color="#B2B7EB";   
            var value = currObj_[key]=="-"?0:currObj_[key];
            if (value < threshold1) {
                color="blue";   
                // color="#B2B7EB";   
                //color="#90d7ec";   
            }else if(threshold1 < value && value < threshold2){
                color="green";   
                // color="#7EF35F";   
                //color="#76becc";   
            }else if(threshold2 < value && value < threshold3){
                color="yellow";   
                // color="#F3FC40";   
                //color="#009ad6";   
            }else if(threshold3 < value ){
                color="red";   
                // color="#FE1103";   
                //color="#145b7d";   
            };
            

            var latlngs = [];
            if(currObj.id == "" || currObj.id == null || currObj.id == undefined || currObj.id == "-"){continue;};
            if(currObj_.id == "" || currObj_.id == null || currObj_.id == undefined || currObj_.id == "-"){continue;};
            
            var sid = currObj.id.toString();
            var stemp = sid.substring(1, sid.length-1);
            var _latlng = stemp.split(",");
            var latlng = eval('[' + String(_latlng) + ']') // [1,2,3]
            
            var sid_ = currObj_.id.toString();
            var stemp_ = sid_.substring(1, sid_.length-1);
            var _latlng_ = stemp_.split(",");
            var latlng_ = eval('[' + String(_latlng_) + ']') // [1,2,3]



            latlngs.push(latlng);
            latlngs.push(latlng_);
            //console.log(i);
            
            //var polyline = L.polyline(latlngs, {color: color,weight:25,lineCap:'butt'}).addTo(this.heatMapLayerOfRoad);
            var polyline = L.polyline(latlngs, {color: color,weight:20,}).addTo(this.heatMapLayerOfRoad);
        };
    }; 




};

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
        if(e.target.className=='map-icon-close'||e.target.className.indexOf('quickLocate ')!=-1 ||e.target.className.indexOf('fontContentTitle ')!=-1){
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
                            //"type":"insert",          //第一次插入时请使用insert
                            "type":"adu",          //第一次插入时请使用insert
                            //"conditions":["id"],
                            "conditions":["id","type"],

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
                    //+    currObj.msg_importance+'消息('+currObj.time+')'+'：<br>'+currObj.msg_content
            		+    currObj.msg_content
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
                    //+    currObj.msg_importance+'消息('+currObj.time+')'+'：<br>'+currObj.msg_content
            		+    currObj.msg_content
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
    //$('#optical').css('display','block');
    
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
//  var colors=[
//              '#EF0238','#86D102','#F8D00C','#6C2E9B','#D40270',
//              '#FD7102','#039ED7','#9C52B3','#782132','#7EC7E7',
//              '#CC99CC','#1D5E3C','#6474C1','#F591C5','#05AF4F',
//              '#B25C43','#668238','#BB118E','#019AA2','#9EA44E',
//              '#00E487','#76664D','#A3E2C7','#783849','#ED5736',
//              '#2CB69B','#C2262A','#DAC280','#A77F73','#FF4401'
//             ];
    var colors=[
                '#6035ff'
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
        polyline.addTo(this.opticalLayer);
        this.OPTICAL_EXIST_MAP[i]=true;
        this.OPTICAL_CACHE.push(polyline);
        if(showName.length>14){
            showName=showName.substring(0,14)+'..';
        }
        var lineChecked=firstRegion==cityName?'checked="true"':'';
//        html+='<div style="line-height:30px;font-size:28px;width:500px;height:35px;overflow:hidden;">'
//            +'<div style="margin-top:10px;float:left;background:'+color+';width:20px;height:20px;"></div>'
//            +'<div style="float:left;"><input class="opticalCk" index="'+i+'" type="checkbox" style="width:20px;height:20px;margin-left:10px;" '+lineChecked+' /></div>'
//            +'<div style="float:left;margin-left:10px;width:400px;" title="'+name+'">'+showName+'</div>'
//            +'<div style="clear:both;"></div>'
//            +'</div>';
        
        if(regionMap[cityName]==null){
            regionMap[cityName]=true;
            var regionChecked=firstRegion==cityName?'checked="true"':'';
//            regionHtml+='<div style="line-height:30px;font-size:28px;width:200px;height:35px;overflow:hidden;">'
//                +'<div style="float:left;"><input class="opticalCkRegion" region="'+cityName+'" type="checkbox" style="width:20px;height:20px;margin-left:10px;" '+regionChecked+' /></div>'
//                +'<div style="float:left;margin-left:10px;width:150px;" title="'+cityName+'">'+cityName+'</div>'
//                +'<div style="clear:both;"></div>'
//                +'</div>';
        }else{
//          regionHtml+='<div style="line-height:30px;font-size:28px;width:100px;height:35px;overflow:hidden;">'
//              +'</div>';
        }
    }
    if(list.length>0){
        //$('#optical').css('display','block');
    }
    
    //$('#opticalRegioDiv').html(regionHtml);
    //$('#opticalDiv').html(html);
    //$('.opticalCk').on('change',this.opticalCheckBoxHandler.bind(this));
    //$('.opticalCkRegion').on('change',this.opticalRegionCheckBoxHandler.bind(this));
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