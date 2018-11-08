var CIIE=CIIE||{};

CIIE.MapTopo=function ()
{
	this.initialize.apply(this,arguments);
};
CIIE.MapTopo.prototype.constructor=CIIE.MapTopo;
CIIE.MapTopo.prototype.ctx='http://localhost:8080/LsmScreen';
CIIE.MapTopo.prototype.divId=null;
CIIE.MapTopo.prototype.map=null;
CIIE.MapTopo.prototype.hotspot=null;
CIIE.MapTopo.prototype.dm=null;

CIIE.MapTopo.prototype.initialize=function(mapDivId,_hotspot,_ctx){
	if(_ctx!=null){
		this.ctx=_ctx;
	}
	this.hotspot=_hotspot;
	this.divId=mapDivId;
	this.dm=LSMScreen.DataManager.getInstance();
	this.initMap();
	this.initMarker();
	this.updateHotspot(_hotspot);
};
CIIE.MapTopo.prototype.initMarker=function(){
	this.SDH=L.icon({
        iconUrl: this.ctx+'/static/styles/local-lsm/ciie/images/topo/SDH.png',
        iconSize: [128,128]
    });
};
CIIE.MapTopo.prototype.initMap=function(){
	 
	this.blankLayer0= new L.featureGroup();
	
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
	this.map.addLayer(this.blankLayer0);
    
};
CIIE.MapTopo.prototype.clear=function(){
	this.map.removeLayer(this.blankLayer0);
	this.blankLayer0= new L.featureGroup();
	this.map.addLayer(this.blankLayer0);
};
CIIE.MapTopo.prototype.addMarker=function(name,icon,lat,lng){
	 var popup = L.popup({maxWidth:800,maxHeight:400,offset:L.point(0, 5),closeButton:true, closeOnClick:false})
     .setLatLng([lat,lng]);
	 popup.setContent('<iframe frameborder="0" width="500px" height="300px" src="deviceDetail.jsp?EQUIP_NAME='+encodeURIComponent(name)+'"></iframe>');

	var iconUrl=this.ctx+icon.replace('assets/images/topo/res','/static/styles/local-lsm/ciie/images/topo');
	var icon=L.icon({
        iconUrl: iconUrl,
        iconSize: [128,128]
    });
	var marker=L.marker([lat,lng],{title: name, icon: icon, keepInView:false}).bindPopup(popup).addTo(this.blankLayer0);
};
CIIE.MapTopo.prototype.addLine=function(latlngs){
	var line=L.polyline(latlngs, {color: '#66e6ff',weight:10});
	line._latlngs=latlngs;
	line.addTo(this.blankLayer0);
};
CIIE.MapTopo.prototype.updateHotspot=function(_hotspot){
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
						
						this.setView(this.hotspotInfo.lat,this.hotspotInfo.lon);
					}.bind(this));
					break;
				}
			}
			
		}.bind(this));
	}else{
	}
	
};

CIIE.MapTopo.prototype.resetCenter=function(){
	
//	var lon=this.hotspotInfo.lon*1- 0.0045;
//	var lat=this.hotspotInfo.lat*1+0.0025;
//	var bdPoint = this.wgs84tobd09(lon,lat);
//	var point = bdPoint.reverse();
//	this.setView(point[0],point[1]);
	
	this.setView(this.hotspotInfo.lat,this.hotspotInfo.lon);
};
CIIE.MapTopo.prototype.setView=function(lat,lon){
	this.map.setView([lat,lon], 15);
	this.radiusHeatMap = 0.001;
};

CIIE.MapTopo.prototype.isEmpty=function (obj){
    for (var name in obj){
        return false;
    }
    return true;
};
CIIE.MapTopo.prototype.wgs84tobd09=function (lng,lat){
	var temArr = wgs84togcj02(lng,lat);
    return gcj02tobd09(temArr[0],temArr[1]);
}

CIIE.MapTopo.prototype.mergeSame=function (arr,para1,para2){
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

CIIE.MapTopo.prototype.keySort=function (name) {
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
