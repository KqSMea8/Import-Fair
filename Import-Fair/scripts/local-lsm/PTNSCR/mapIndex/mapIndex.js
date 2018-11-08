
var GIS = {
	layers:{	//图层
	},
	draw:{
		editPolygon:{}
	},
	groupLayers:{
		"2G热力图":{
			url:"/sml/query/cus-trans-rm-monflow-hotpic",
			data:null,
			layerGroup : L.heatLayer([], {radius: 25,maxZoom:14, max:1,gradient:{0.4:"#8BDB59",0.55: '#00B1F1',0.7: '#FDFF00', 0.85: '#FFC101', 1: '#FF0000'}}),
			notCtrl:true,
			dataStr:function () {
				var type = $(".radiom").siblings(".radioActive").attr("value");
				var hot_area_name = $("#lteZhanDian").find(".zhanActive").attr("name");
				return{
				    dateType:type,
					hot_area_name:hot_area_name?hot_area_name:""
				}
			},
			fillColor:[
				{"yuzhi":"120","fillColor":"#FF0000"},
				{"yuzhi":"80","fillColor":"#FFC101"},
				{"yuzhi":"40","fillColor":"#FDFF00"},
				{"yuzhi":"20","fillColor":"#00B1F1"},
				{"yuzhi":"0","fillColor":"#8BDB59"}
			],
			sendBefore:function (dataStr) {
				var name = dataStr.hot_area_name;
				if(name){
					var postion = zhandianInfo[name].pos;
					var zoom = zhandianInfo[name].zoom;
					GIS.map.setView(postion,zoom);
				}
			},
			backFun:function (data) {
				if(data.success){
					data = data.data;
					var oneObj = GIS.groupLayers["2G热力图"];
					oneObj.data = data;
					var layer = oneObj.layerGroup;
					var beishu = 1;
					var fillColor = oneObj.fillColor;
					var latlngs = [];
					var latlngsJson = {};
					for(var i=0;i<data.length;i++){
						var lat = data[i].LATITUDE;
						var lng = data[i].LONGITUDE;
						var value = data[i]["PEAK_FLOW_RATE"];
						var qiang = 0;
						var yuzhis = [1,0.85,0.7,0.55,0.4]
						for(var j=0;j<fillColor.length;j++){
							if(value>=fillColor[j].yuzhi){
								qiang = yuzhis[j];
								break;
							}
						}
						latlngsJson[lat+"_"+lng] = [ lat , lng , qiang ];
					}
					for(var i in latlngsJson){
						latlngs.push(latlngsJson[i]);
					}
					layer.setLatLngs(latlngs);
					
				}
			},
			Event:{
				"add":function (e) {
					var map=GIS.map; 
					var maxHeatValue = 0;
		    		var curZoom = map.getZoom(); 
		    		maxHeatValue = 1-8/curZoom;
		    		var blur = 15-7*(curZoom-17);
		    		var radius =  35 + 7*(curZoom-17);
		    		maxHeatValue = maxHeatValue <0.3?0.3:maxHeatValue;
		    		if(curZoom>14){
		    			maxHeatValue = 0;
		    		}
		    		blur = blur>25?25:blur;
		    		radius = radius<20?20:radius;
		    		console.log("大小："+curZoom+"\t最小透明: "+maxHeatValue+"\t模糊度: "+blur+"\t半径: "+radius);
					var layer = GIS.groupLayers["2G热力图"];
					if(GIS.map.hasLayer(layer.layerGroup)){
						layer.layerGroup.setOptions({
							minOpacity:maxHeatValue,
							blur : blur,
							radius : radius
						});
					}
					if(!this._el){
						this._el = mapIndex.createTuli("热力图颜色区间示意图",GIS.groupLayers["2G热力图"].fillColor);
					}
			        this._map.getContainer().appendChild(this._el);
				},
				"remove":function (e) {
			        $(this._el).remove();
				}
			},
			show:true,
		},
		"基站标记":{
			url:"/sml/query/cus-trans-rm-monflow-hotpic",
//			layerGroup : L.heatLayer([], {radius: 25,minOpacity : (1-8/11),max:1,gradient:{0:"#8BDB59",0.2: '#00B1F1',0.4: '#FDFF00', 0.6: '#FFC101', 0.8: '#FF0000'}}),
			notCtrl:true,
			dataStr:function () {
				var type = $(".radiom").siblings(".radioActive").attr("value");
				var hot_area_name = $("#lteZhanDian").find(".zhanActive").attr("name");
				return{
				    dateType:type,
					hot_area_name:hot_area_name?hot_area_name:""
				}
			},
			backFun:function (data) {
				if(data.success){
					data = data.data;
					var layer = GIS.groupLayers["基站标记"].layerGroup;
					layer.clearLayers();
					var beishu = 1;
					var fillColor = GIS.groupLayers["基站标记"].fillColor;
					var latlngs = [];
					var myIcon = L.icon({
					    iconUrl: eastcom.baseURL + '/static/images/PTNSCR/mapIndex/jizhan.png',
					    iconSize: [24, 41],
					    popupAnchor: [0, -20],
					});
					for(var i=0;i<data.length;i++){
						var one = data[i];
						var lat = one.LATITUDE;
						var lng = one.LONGITUDE;
						var propText = 
						L.marker([lat, lng],{
							draggable:true,
							icon: myIcon,
						})
						.bindPopup(
							'<table style="width:100%;height:100%;table-layout:fixed;">'+
							'	<tbody>'+
							'		<tr>'+
							'			<td class="htgrfse" style="width:48px;">时间</td>'+
							'			<td class="htgrfse2" title="'+one.TIME_ID+'">：'+one.TIME_ID+'</td>'+
							'		</tr>'+
							'		<tr>'+
							'			<td class="htgrfse">区域名称</td>'+
							'			<td class="htgrfse2" title="'+one.HOT_AREA_NAME+'">：'+one.HOT_AREA_NAME+'</td>'+
							'		</tr>'+
							'		<tr>'+
							'			<td class="htgrfse">端口名称</td>'+
							'			<td class="htgrfse2" title="'+one.PORT_NAME+'">：'+one.PORT_NAME+'</td>'+
							'		</tr>'+
							'		<tr>'+
							'			<td class="htgrfse">电路名称</td>'+
							'			<td class="htgrfse2" title="'+one.SERVICE_NAME+'">：'+one.SERVICE_NAME+'</td>'+
							'		</tr>'+
							'		<tr>'+
							'			<td class="htgrfse">所属环网</td>'+
							'			<td class="htgrfse2" title="'+one.LOOP_NAME+'">：'+one.LOOP_NAME+'</td>'+
							'		</tr>'+
							'		<tr>'+
							'			<td class="htgrfse">经度</td>'+
							'			<td class="htgrfse2" title="'+one.LONGITUDE+'">：'+one.LONGITUDE+'</td>'+
							'		</tr>'+
							'		<tr>'+
							'			<td class="htgrfse">纬度</td>'+
							'			<td class="htgrfse2" title="'+one.LATITUDE+'">：'+one.LATITUDE+'</td>'+
							'		</tr>'+
							'		<tr>'+
							'			<td class="htgrfse">流速峰值</td>'+
							'			<td class="htgrfse2" title="'+one.PEAK_FLOW_RATE+'(Mbps)">：'+one.PEAK_FLOW_RATE+'(Mbps)</td>'+
							'		</tr>'+
							'	</tbody>'+
							'</table>'
						,{className:"jizhanPopup",minWidth:250})
						.addTo(layer);
					}
				}
			},
			Event:{
				"add":function (e) {
					var data = GIS.groupLayers["2G热力图"].data;
					if(!data){
						mapIndex.updateLayers("基站标记");
					}else{
						GIS.groupLayers["基站标记"].backFun({data:data,success:true})
					}
					
				},
				"remove":function (e) {
				}
			},
			show:false,
		},
	}
}

var mapIndex = {
	init:function () {
		mapIndex.initMap("mainMap");
		mapIndex.initEvent();
		mapIndex.updateLayers();
	},
	initMap:function(id){
		//初始化地图
		var southWest = L.latLng(31.959115, 122.3702),
		northEast = L.latLng(30.237952, 120.753598),
		bounds = L.latLngBounds(southWest, northEast);
		GIS.map = L.map(id,{
			minZoom: 11,
			maxZoom: 18,
			crs: L.CRS.BEPSG3857,
			contextmenu: true,
			maxBounds: bounds,
			zoomControl: false,
			attributionControl: false,
			layers:[]
		}).setView([31.098165,121.518745], 11);
		//初始化图层
		GIS.layers.normalLayer = new L.tileLayer.baiduLayer('gongwangLayerNormalSH.Map');
		//卫星初始化
		GIS.layers.satelliteWeixingLayer = new L.tileLayer.baiduLayer('gongwangLayerSatSH.Map');
		//路网
		GIS.layers.satelliteLuwangLayer = new L.tileLayer.baiduLayer('gongwangLayerSatSH.Road');
		//初始化图层控制器
		var baseLayers = {
			"地图": GIS.layers.normalLayer,
			"卫星": GIS.layers.satelliteWeixingLayer
		};
		var groupedOverlays = {
		};
		var groupLays = GIS.groupLayers;
		for(var i in groupLays){
			var lg = groupLays[i].layerGroup;
			lg = lg?lg:L.layerGroup([]);
			if(groupLays[i].Event){
				var event = groupLays[i].Event;
				for(var j in event){
					lg.on(j,event[j]);
				}
			}
			if(!groupLays[i].notCtrl){
				groupedOverlays[i] = lg;
			}
			groupLays[i].layerGroup = lg;
		}
		GIS.switchControl =L.control.layers(baseLayers, groupedOverlays, {autoZIndex: false, exclusiveGroups: [], groupCheckboxes: false});
		GIS.map.addControl(GIS.switchControl);
		//默认添加卫星图层
		GIS.map.addLayer(GIS.layers.normalLayer);
		for(var i in groupLays){
			var lg = groupLays[i].layerGroup;
			if(groupLays[i].show){
				GIS.map.addLayer(lg);
			}
		}
	},
	initEvent:function () {
		GIS.map.on("click",function (e) {
			console.log(e.latlng.lat+","+e.latlng.lng);
		});
		GIS.map.on("zoomend",function (e) {
			var map=GIS.map; 
			var maxHeatValue = 0
    		var curZoom = map.getZoom(); 
    		maxHeatValue = 1-8/curZoom;
    		var blur = 15-7*(curZoom-17);
    		var radius =  35 + 7*(curZoom-17);
    		maxHeatValue = maxHeatValue <0.3?0.3:maxHeatValue;
    		if(curZoom == map.getMaxZoom()){
    			map.addLayer(GIS.groupLayers["基站标记"].layerGroup);
    		}else{
    			map.removeLayer(GIS.groupLayers["基站标记"].layerGroup);
    		}
    		if(curZoom>12){
    			maxHeatValue = 0;
    		}
    		blur = blur>25?25:blur;
    		radius = radius<20?20:radius;
    		console.log("大小："+curZoom+"\t最小透明: "+maxHeatValue+"\t模糊度: "+blur+"\t半径: "+radius);
			var relitu = ["2G热力图"];
			for(var i=0;i<relitu.length;i++){
				var layer = GIS.groupLayers[relitu[i]];
				if(GIS.map.hasLayer(layer.layerGroup)){
					layer.layerGroup.setOptions({
						minOpacity:maxHeatValue,
						blur : blur,
						radius : radius
					});
				}
			}
		});
		GIS.map.on("baselayerchange",function (e) {
			if(e.name=="卫星"){
				GIS.map.addLayer(GIS.layers.satelliteLuwangLayer);
			}else{
				GIS.map.removeLayer(GIS.layers.satelliteLuwangLayer);
			}
			console.log(e);
		});
	},
	updateLayers:function (name,search) {
		var groups = GIS.groupLayers
		for(var i in groups){
			var layer = groups[i].layerGroup;
			if(!GIS.map.hasLayer(layer)){
				continue;
			}
			if(name&&i!=name){
				continue;
			}
			if(layer.clearLayers)layer.clearLayers();
			(function () {
				var index = i;
				var url = groups[index].url;
				if(!url)return;
				var backFun = groups[index].backFun;
				var beforeSend = groups[index].sendBefore;
				var dataStr = groups[index].dataStr?groups[index].dataStr():"";
				if(search){
					dataStr.para_name = search;
				}
				if(beforeSend){
					beforeSend(dataStr);
				}
				commonAjax(url,JSON.stringify(dataStr),"",true,function (data) {
					if(data&&data.success){
						if(backFun){
							backFun(data);
						}
					}
				});
			})()
		}
	},
	createTuli:function (title,fanwei) {
		var _el = L.DomUtil.create('div', 'reliTuLi leaflet-bottom leaflet-right');
        $(_el).append('<div class="tulititle" style="">'+ '<div class="fl chuiCenter" style="width: 6px;height: 18px;margin-right: 8px;background: #50E5FF;"></div>' +title+'</div>');
        for(var i=fanwei.length-1;i>=0;i--){
        	var fanweiOne = fanwei[i],
        	zhi = (i==0?(">="+fanweiOne.yuzhi):(fanweiOne.yuzhi+"~"+fanwei[i-1].yuzhi))+"Mbps";
        	zhi = $(getCanvasText(109,20,zhi,"white","15px"));
        	$(_el).append('<div class="tuliChild"><div class="fl chuiCenter" style="width:83px;height:20px;background:'+fanweiOne.fillColor+';"></div>'+
        							'<div class="fl chuiCenter yuzhis" style="margin-left:12px;"></div>'
        						+'</div>');
        	$(_el).find(".yuzhis:last").append(zhi)
        }
        return _el;
	}
}

function isNumber(obj){
    //var reg = new RegExp("^[0-9]$");
    if ( /^-?\d+$/.test(obj) || /^[0-9]+.?[0-9]*$/.test(obj)){
        //alert(obj+"是数字");
        return true;
    }else{
        //alert(obj+"不是数字");
        return false;
    }
}
var suofang = function (type) {
	var zoom = GIS.map.getZoom();
	var nodename = "."+type+"-tooltip";
	if(type == "shange"&&zoom<13){
		$(nodename).text("");
		return;
	}
	var beishuJ = {
		"shange":{ 16:1.6 , 17:2 , 18:2.4},
		"quyu":{ 16:1.3 , 17:1.6 , 18:2.5},
	}
	var defaultBeishu = {
		"shange":function (zoom) {
			return (zoom-5)/8;
		},
		"quyu":function (zoom) {
			return (zoom-5)/8;
		}
	}
	var beishu = defaultBeishu[type](zoom);
	if(beishuJ[type][zoom]){
		beishu = beishuJ[type][zoom];
	}
	console.log("缩放 : " + beishu);
	$(nodename).each(function(){
		var ben = $(this).css("transform").replace(/[^0-9\-,\.]/g,"");
		var x = parseFloat(ben.split(",")[4]);
		var y = parseFloat(ben.split(",")[5]);
		var beicha = beishu-1;
		var beijuX = $(this).width()*beicha/1.5;
		var beijuY = $(this).height()*beicha/1.5
		var hou = "translate3d("+ (x-beijuX)+"px,"+ (y-beijuY)+"px,0px) scale("+beishu+")";
		$(this).css("transform", hou);
  	});
	console.log(GIS.map.getZoom());
	$(nodename).css("z-index",0);
}
function getMapInfo () {
	var map = GIS.map;
	var center = map.getCenter();
	var suofang = map.getZoom();
	console.log("view: ([ "+center.lat+", "+center.lng+" ], "+suofang+")");
}