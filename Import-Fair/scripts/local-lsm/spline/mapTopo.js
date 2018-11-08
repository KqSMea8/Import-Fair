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

CIIE.MapTopo.prototype.lineId='';
CIIE.MapTopo.prototype.lineType='';
CIIE.MapTopo.prototype.OPTICAL_CACHE=[];
CIIE.MapTopo.prototype.SweetIcon=null;

CIIE.MapTopo.prototype.initialize=function(mapDivId,_hotspot,_ctx){
	if(_ctx!=null){
		this.ctx=_ctx;
	}
	this.hotspot=_hotspot;
	this.divId=mapDivId;
	this.cdm=LSMScreen.CacheDataManager.getInstance();
	this.initMap();
	this.initMarker();
	this.initTwaver();
	this.cdm.getTransCables({},this.drawOptical.bind(this));
	$(document).keyup(this.drawPolyLine.bind(this));
	//$('#drawPolyLineBtn').on('click',this.drawPolyLine.bind(this));
	$('#topoclose').on('click',this.closeLineTopo.bind(this));
	$('#opticalclose').on('click',this.closeOpticalList.bind(this));
	//this.drawTestCircuit();
	
	//this.updateHotspot(_hotspot);
};
CIIE.MapTopo.prototype.drawOptical=function(result){
    if(this.map.hasLayer(this.opticalLayer0)){
        try{
            this.map.removeLayer(this.opticalLayer0);
        }catch(e){
            
        }
    }
    this.opticalLayer0=new L.featureGroup();
    this.map.addLayer(this.opticalLayer0);
    
    

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
                htmlStr += '<td class="htgrfse">客户编号</td><td class="valueColor">：' + customers_num + '</td>'
                htmlStr += '</tr>'
                htmlStr += '<tr>'
                htmlStr += '<td class="htgrfse">客户名称</td><td class="valueColor">：' + customers_name + '</td>'
                htmlStr += '</tr>'
                htmlStr += '<tr>'
                htmlStr += '<td class="htgrfse">客户服务等级</td><td class="valueColor">：' + customers_server + '</td>'
                htmlStr += '</tr>'
                htmlStr += '<tr>'
                htmlStr += '<td class="htgrfse">维护属地</td><td class="valueColor">：' + maintenancedependency + '</td>'
                htmlStr += '</tr>'
                htmlStr += '<tr>'
                htmlStr += '<td class="htgrfse">传输接入方式</td><td class="valueColor">：' + access_type + '</td>'
                htmlStr += '</tr>'
                htmlStr += '<tr>'
                htmlStr += '<td class="htgrfse">带宽</td><td class="valueColor">：' + crm_bandwidth + '</td>'
                htmlStr += '</tr>'
                htmlStr += '<tr>'
                htmlStr += '<td class="htgrfse">接入地址</td><td class="valueColor">：' + z_point_address + '</td>'
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
                    selfPopupStr += '<div id="jkzx_'+i+'" class="jkzx_" style="position:absolute;top:50%;left:50%;margin-top:-159px;margin-left:-436px;width:1150px;height:404px;overflow:hidden;display:none;">'
                    
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
                    marker=L.marker([lat,lng],{title: line_id,num:i, icon: this.markersJKSpecialLine, keepInView:false}).on('click',function(){clickEvent(this);}).addTo(this.opticalLayer0);
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
CIIE.MapTopo.prototype.drawVertex=function(e){
	var lineVertexs=e.layer._latlngs;
	var latlngs=[];
	var label='';
	var point=[];
	for(var i=0;i<lineVertexs.length;i++){
		latlngs.push([lineVertexs[i].lat,lineVertexs[i].lng]);
		point=[lineVertexs[i].lat,lineVertexs[i].lng];
		label=lineVertexs[i].lat+','+lineVertexs[i].lng;
		var icon=new this.SweetIcon({
			labelText: label
		});
		var marker=new L.Marker(point, {
			title: label,
			name: label,
			icon: icon
		});
		marker.addTo(this.drawnItems);
	}
	$('#lineVertexSaveAreaCreated').text(JSON.stringify(latlngs));
//	console.log(JSON.stringify(latlngs));
	var polyline = L.polyline(latlngs, {color: '#cc0066',weight:10}).addTo(this.drawnItems);
	
};

CIIE.MapTopo.prototype.drawPolyLine=function(e){
	if(e.char=='l'||e.char=='L'){
		this.lineDrawer.enable();
		if(this.lineVertexSaveAreaCreated==null){
			this.lineVertexSaveAreaCreated=true;
			$('body').append('<textarea style="display:none;position:absolute;top:0;left:0;width:90%;height:150px;" id="lineVertexSaveAreaCreated" ></textarea>')
		}
	}else if(e.char=='a'||e.char=='A'){
		if(this.lineVertexSaveAreaCreated){
			$('#lineVertexSaveAreaCreated').toggle();
		}
	}
};
CIIE.MapTopo.prototype.closeLineTopo=function(){
	$('#topo').css('display','none');
};
CIIE.MapTopo.prototype.closeOpticalList=function(){
	$('#optical').css('display','none');
};
CIIE.MapTopo.prototype.initTwaver=function(){
	this.network = new twaver.network.Network();
	this.box = this.network.getElementBox();
	this.nameFinder = new twaver.QuickFinder(this.box, "name");
	
    this.networkDom = this.network.getView();
    this.networkDom.style.width = "100%";
    this.networkDom.style.height = "100%";
    this.networkDom.style.overflow = "hidden";
/////////////////////////////////   
    this.network2 = new twaver.network.Network();
	this.box2 = this.network2.getElementBox();
	
    this.networkDom2 = this.network2.getView();
    this.networkDom2.style.width = "100%";
    this.networkDom2.style.height = "100%";
    
   
    $('#topoDiv').append(this.networkDom);
    $('#modalWinBody').append(this.networkDom2);
    $(this.networkDom).on('click',this.networkClick.bind(this));
    
    this.registerImage();
    
};
CIIE.MapTopo.prototype.networkClick=function(e){
	var element = this.network.getElementAt(e);
    if(element && element instanceof twaver.Link ) {
    	if(element._name!=null&&element._name!=''){
    		this.updateCircleTopo(element._name,this.lineType);
    		//this.updateCircleTopo('CL-BQ-B-NULL-261318','transln');
    	}
    } else {
    }
};
CIIE.MapTopo.prototype.registerImage=function(){
	this.registerNormalImage(BASEPATH+'/static/styles/local-lsm/ciie/images/topo/S9306.png','4506');
	this.registerNormalImage(BASEPATH+'/static/styles/local-lsm/ciie/images/topo/CSSB.png','SDH');
	this.registerNormalImage(BASEPATH+'/static/styles/local-lsm/ciie/images/topo/coRotate.png','MSAP');
	this.registerNormalImage(BASEPATH+'/static/styles/local-lsm/ciie/images/topo/router.png','ROUTER');
	this.registerNormalImage(BASEPATH+'/static/styles/local-lsm/ciie/images/topo/client.png','CLIENT_DEVICE');
	
	this.registerNormalImage(BASEPATH+'/static/styles/local-lsm/ciie/images/topo/SR.png','SR');
	this.registerNormalImage(BASEPATH+'/static/styles/local-lsm/ciie/images/topo/T1600.png','TXP');
	this.registerNormalImage(BASEPATH+'/static/styles/local-lsm/ciie/images/topo/shu_tong_device.png','XIEZHUAN');
	
}
CIIE.MapTopo.prototype.registerNormalImage=function(url, name) {
	var image = new Image();
	image.src = url;
	image.onload = function() {
		twaver.Util.registerImage(name, image, image.width, image.height);
		image.onload = null;
		try{
			this.network.invalidateElementUIs();
		}catch(e){}
	};
};
CIIE.MapTopo.prototype.updateCircleTopo=function(lineId,lineType){
	this.box2.clear();
	$('#modalWin').modal();
	$('#modalWinTitle').text(lineId);
	this.cdm.getSplineCircleTopo({line_id:lineId,type:lineType},this.drawCircleTopo2.bind(this));
	//this.cdm.getSplineCircleTopo({line_id:'CL-JK-B-NULL-223531',type:'transln'},this.drawCircleTopo2.bind(this));
	
	
};
CIIE.MapTopo.prototype.updateLightCircuit=function(lineId){
	this.cdm.getSplineLightCircuit({line_id:lineId},this.drawLightCircuit.bind(this));
};
CIIE.MapTopo.prototype.drawLightCircuit=function(result){
	if(this.map.hasLayer(this.opticalLayer)){
		try{
			this.map.removeLayer(this.opticalLayer);
		}catch(e){
			
		}
	}
	this.opticalLayer=new L.featureGroup();
	this.map.addLayer(this.opticalLayer);
	var list=result==null?[]:result.data;
	
	var colors=[
	            '#6035ff','#02b541'
	           ];
	$('#opticalDiv').html('');
	var html='';
	var bounds=[];
	this.OPTICAL_CACHE=[];
	html+='<div style="line-height:30px;font-size:28px;width:260px;height:35px;overflow:hidden;float:left;">'
		+'<div style="margin-top:10px;float:left;background:'+colors[0]+';width:20px;height:20px;"></div>'
		+'<div style="float:left;"><input class="opticalCkGroup" index="主用" type="checkbox" style="width:20px;height:20px;margin-left:10px;" checked="true" /></div>'
		+'<div style="float:left;margin-left:10px;width:200px;" title="主用">主用</div>'
		+'<div style="clear:both;"></div>'
		+'</div>';
	html+='<div style="line-height:30px;font-size:28px;width:260px;height:35px;overflow:hidden;float:left;">'
		+'<div style="margin-top:10px;float:left;background:'+colors[1]+';width:20px;height:20px;"></div>'
		+'<div style="float:left;"><input class="opticalCkGroup" index="备用" type="checkbox" style="width:20px;height:20px;margin-left:10px;" checked="true" /></div>'
		+'<div style="float:left;margin-left:10px;width:200px;" title="备用">备用</div>'
		+'<div style="clear:both;"></div>'
		+'</div>';
	html+='<div style="clear:both;"></div>';
	for(var i=0;i<list.length;i++){
		var record=list[i];
		if(isNaN(record.a_latitude)||isNaN(record.a_longitude)
				||isNaN(record.z_latitude)||isNaN(record.z_longitude)
				||record.a_latitude==null||record.a_longitude==null
				||record.z_latitude==null||record.z_longitude==null){
			console.log("异常数据:"+i);
			continue;
		}
		var name=record.optical_name;
		var showName=name==null?"":name;
		var point0=[record.a_latitude,record.a_longitude];
		var point1=[record.z_latitude,record.z_longitude];
		var latlngs=[point0,point1];
		var color=record.is_backup=="备用"?colors[1]:colors[0];
		var polyline = L.polyline(latlngs, {color:color,weight:10,opacity:0.8}).addTo(this.opticalLayer);
		this.OPTICAL_CACHE.push(polyline);
		
		
		bounds.push(point0);
		bounds.push(point1);
		
//		minLat=Math.min(minLat,record.a_latitude,record.z_latitude);
//		minLng=Math.min(minLng,record.a_longitude,record.z_longitude);
//		maxLat=Math.max(maxLat,record.a_latitude,record.z_latitude);
//		maxLng=Math.max(maxLng,record.a_longitude,record.z_longitude);
		
		if(showName.length>20){
			showName=showName.substring(0,20)+'..';
		}
		html+='<div style="line-height:30px;font-size:28px;width:580px;height:35px;overflow:hidden;">'
			+'<div style="margin-top:10px;float:left;background:'+color+';width:20px;height:20px;"></div>'
			+'<div style="float:left;"><input class="opticalCk" is_backup="'+record.is_backup+'" index="'+i+'" type="checkbox" style="width:20px;height:20px;margin-left:10px;" checked="true" /></div>'
			+'<div style="float:left;margin-left:10px;width:520px;" title="'+name+'">'+showName+'</div>'
			+'<div style="clear:both;"></div>'
			+'</div>';
	}
	if(list.length>0){
		$('#optical').css('display','block');
		//var pointCenter=[(minLat+maxLat)/2,(minLng+maxLng)/2];
		this.map.fitBounds(bounds);
	}
	console.log("光路段数:"+this.OPTICAL_CACHE.length);
	$('#opticalDiv').html(html);
	$('.opticalCk').on('change',this.opticalCheckBoxHandler.bind(this));
	$('.opticalCkGroup').on('change',this.opticalGroupCheckBoxHandler.bind(this));
};
CIIE.MapTopo.prototype.opticalGroupCheckBoxHandler=function(e){
	var is_backup=$(e.currentTarget).attr('index');
	var isChecked = $(e.currentTarget).is(":checked"); 
	var list=$('.opticalCk[is_backup='+is_backup+']');
	list.prop("checked",isChecked);
	var opacity=0.8;
	if(isChecked){
		opacity=0.8;
	}else{
		opacity=0;
	}
	for(var i=0;i<list.length;i++){
		var index=$(list[i]).attr('index');
		var polyline = this.OPTICAL_CACHE[index];
		polyline.setStyle({opacity:opacity});
	}
};
CIIE.MapTopo.prototype.opticalCheckBoxHandler=function(e){
	var index=$(e.currentTarget).attr('index');
	var polyline = this.OPTICAL_CACHE[index];
	var isChecked = $(e.currentTarget).is(":checked"); 
	if(isChecked){
		polyline.setStyle({opacity:0.8});
	}else{
		polyline.setStyle({opacity:0});
	}
};
CIIE.MapTopo.prototype.drawCircleTopo2=function(result){
	this.box2.clear();
	var list=result;
	var lastNode=null;
	var firstNode=null;
	var nodeList=[];
	var startReverse=false;
	
	var centerX=$('#modalWin').width();
	var centerY=$('#modalWin').height()*1.2;
	
	var r=$('#modalWin').width()*0.5;
	
	var majorDeltaRad=Math.PI;
	var backupDeltRad=Math.PI;
	
	var i=0;
	
	var majorList=[];
	var backupList=[];
	
	for(i=0;i<list.length;i++){
		if(list[i].is_backup=='备用'){
			backupList.push(list[i]);
		}else{
			majorList.push(list[i]);
		}
	}
	if(majorList.length>1){
		majorDeltaRad=Math.PI/(majorList.length-1);
	}
	
	backupDeltRad=Math.PI/(backupList.length+1);
	
	var majorStartRad=Math.PI;
	var bakStartRad=Math.PI*2-backupDeltRad;
	
	for(i=0;i<majorList.length;i++){
		var major=majorList[i];
		var majorName=major['a_device_name'];
		var majorNode = this.getNewNode('SDH',Math.uuid(),major['a_device_name']);
		majorNode.setStyle('label.font', '52px "Microsoft Yahei"');
		this.box2.add(majorNode);
		if(lastNode!=null){
			var majorLink = this.getNewLink(lastNode,majorNode);
			majorLink.setStyle('link.width', 10);
			this.box2.add(majorLink);
		}
		majorNode.setLocation(Math.cos(majorStartRad)*r+centerX,Math.sin(majorStartRad)*r+centerY);
		majorStartRad+=majorDeltaRad;
		lastNode=majorNode;
		if(firstNode==null){
			firstNode=majorNode;
		}
	}
	
	for(i=0;i<backupList.length;i++){
		var bak=backupList[i];
		var bakName=bak['a_device_name'];
		var bakNode = this.getNewNode('SDH',Math.uuid(),bak['a_device_name']);
		bakNode.setStyle('label.font', '52px "Microsoft Yahei"');
		this.box2.add(bakNode);
		bakNode.setLocation(Math.cos(bakStartRad)*r+centerX,-Math.sin(bakStartRad)*r+centerY);
		bakStartRad-=backupDeltRad;
		if(lastNode!=null){
			var bakLink = this.getNewLink(lastNode,bakNode);
			bakLink.setStyle('link.color', '#555555');
			this.box2.add(bakLink);
		}
		
		lastNode=bakNode;
		
		if(i==backupList.length-1&&firstNode!=null){
			var bakLinkLast = this.getNewLink(lastNode,firstNode);
			bakLinkLast.setStyle('link.color', '#555555');
			this.box2.add(bakLinkLast);
		}
	}
	this.network2.setZoom(0.3);
};
CIIE.MapTopo.prototype.drawCircleTopo=function(result){
	this.box2.clear();
	var list=result;
	var lastIndex=-1;
	var nodeList=[];
	var startReverse=false;
	
	var baseX=100;
	var deltaX=$('#modalWin').width()/4;
	var baseY=$('#modalWin').height()/2;
	var deltaY=$('#modalWin').height()/4;
	
	var x=baseX;
	var y=baseY;//+Math.pow(-1,i)*15;
	for(var i=0;i<list.length;i++){
		var record=list[i];
		var nodeName=record['a_device_name'];
		var node = this.getNewNode('SDH',Math.uuid(),record['a_device_name']);
		nodeList.push(node);
		this.box2.add(node);
		
		if(list.length>1&&i==list.length-1){
			lastIndex=0;
		}
		if(lastIndex!=-1){
			var link = this.getNewLink(nodeList[lastIndex],nodeList[i]);
			if(list[i].is_backup=='备用'||list[lastIndex].is_backup=='备用'){
				startReverse=true;
				link.setStyle('link.color', '#ececec');
			}
			this.box2.add(link);
		}
		
		if(i==0){
			x=baseX;
			y=baseY;
		}else if(startReverse==false){
			x+=deltaX;
			y=baseY-deltaY;
		}else{
			x-=deltaX;
			y=baseY+deltaY;
		}
		if(i!=list.length-1&&list[i].is_backup!=list[i+1].is_backup){
			y=baseY;
		}
		node.setLocation(x,y);
		lastIndex=i;
	}
};
CIIE.MapTopo.prototype.updateLineTopo=function(lineId,type){
	if(this.map.hasLayer(this.opticalLayer0)){
        try{
            this.map.removeLayer(this.opticalLayer0);
        }catch(e){
            
        }
    }
	this.box.clear();
	//$('#topo').css('display','block');
	this.lineId=lineId;
	$('#lineTopoName').text(type+'拓扑 -- '+lineId)
	if(type=='传输专线'){
		this.lineType='transln';
		//this.cdm.getSplineTopo({line_id:lineId},this.drawIplLineTopo.bind(this));
	}else if(type=='互联网专线'){
		this.lineType='netln';
		//this.cdm.getSplineTopo({line_id:lineId},this.drawInternetLineTopo.bind(this));
	}
	this.map.removeLayer(this.blankLayer0);
	this.map.removeLayer(this.deviceLayerRes);
	this.map.removeLayer(this.deviceLayerRouter);
	this.map.removeLayer(this.deviceLayerAZ);
	
	this.blankLayer0= new L.featureGroup();
	this.deviceLayerRes= new L.featureGroup();
	this.deviceLayerAZ= new L.featureGroup();
	this.deviceLayerRouter= new L.featureGroup();
	
	this.map.addLayer(this.blankLayer0);
	this.map.addLayer(this.deviceLayerRes);
	this.map.addLayer(this.deviceLayerRouter);
	this.map.addLayer(this.deviceLayerAZ);
	
	this.updateLightCircuit(lineId);
	//this.cdm.getSplineResources({line_id:'CMNET-JK-B-NULL-329845'},this.drawSplineDevice.bind(this));
	
	this.cdm.getSplineResources({line_id:lineId},this.drawSplineDevice.bind(this));
	this.cdm.getRouterList({line_id:lineId,type:this.lineType},this.drawCircleDevice.bind(this));
};
CIIE.MapTopo.prototype.drawSplineDevice=function(result){
	
	this.map.removeLayer(this.deviceLayerRes);
	
	this.deviceLayerRes= new L.featureGroup();
	
	this.map.addLayer(this.deviceLayerRes);
	
	
	var list=result.data;
	if(list!=null){
		for(i=0;i<list.length;i++){
			var record=list[i];
			var lat=record['latitude'];
			var lng=record['longitude'];
			var label=record['access_name'];
			var point=[lat,lng];
//			var icon=new this.SweetIcon({
//				labelText: label
//			});
//			var marker=new L.Marker(point, {
//				title: label,
//				name: label,
//				icon: icon
//			});
			var marker=L.marker([lat,lng],{title: label, icon: this.markerRes, keepInView:false});
			marker.addTo(this.deviceLayerRes);
		}
	}
};
CIIE.MapTopo.prototype.drawCircleDevice=function(result){
	var list=result.data==null?[]:result.data;
	var i=0;
	
	var lonLatMap={};
	
	this.map.removeLayer(this.deviceLayerRouter);
	this.map.removeLayer(this.deviceLayerAZ);
	
	this.deviceLayerAZ= new L.featureGroup();
	this.deviceLayerRouter= new L.featureGroup();
	
	this.map.addLayer(this.deviceLayerRouter);
	this.map.addLayer(this.deviceLayerAZ);
	
	for(i=0;i<list.length;i++){
		var major=list[i];
		var label=major['device_name'];
		var lat=major['lat'];
		var lng=major['lon'];
		var type=major.type;
		var posKey=lat+','+lng;
		if(lonLatMap[posKey]==null){
			lonLatMap[posKey]=0;
		}else{
			lonLatMap[posKey]++;
		}
		lat+=lonLatMap[posKey]*0.0001;
		lng+=lonLatMap[posKey]*0.0001;
		var point=[lat,lng];
		
		var icon=null;
		if(type==0){//A/Z
			icon=new this.SweetIcon2({
				labelText: label
			});
			var marker=new L.Marker(point, {
				title: label,
				name: label,
				icon: icon
			});
			marker.addTo(this.deviceLayerAZ);
		}else if(type==1){//协转/光收
			icon=new this.SweetIcon3({
				labelText: label
			});
			var marker=new L.Marker(point, {
				title: label,
				name: label,
				icon: icon
			});
			marker.addTo(this.deviceLayerRouter);
		}else if(type==2){//中间
			icon=new this.SweetIcon4({
				labelText: label
			});
			var marker=new L.Marker(point, {
				title: label,
				name: label,
				icon: icon
			});
			marker.addTo(this.deviceLayerRouter);
		}
		
	}
	
	
	
	

};

CIIE.MapTopo.prototype.drawIplLineTopo=function(result){
	this.box.clear();
	var record=result.data;
	
//	var node0 = this.getNewNode('TXP','a_business_equip_name',record['a_business_equip_name']);
//	var node1 = this.getNewNode('SDH','a_acs_room_eq_name',record['a_acs_room_eq_name']);
//	var node2 = this.getNewNode('SDH','z_acs_room_eq_name',record['z_acs_room_eq_name']);
//	var node3 = this.getNewNode('TXP','z_business_equip_name',record['z_business_equip_name']);
//	
//	
//	var link0 = this.getNewLink(node0,node1);
//	var link1 = this.getNewLink(node1,node2,record['line_id']);
//	var link2 = this.getNewLink(node2,node3);
//	
//	this.box.add(node0);
//	this.box.add(node1);
//	this.box.add(node2);
//	this.box.add(node3);
//	
//	this.box.add(link0);
//	this.box.add(link1);
//	this.box.add(link2);
//	
//	var nodeList=[node0,node1,node2,node3];
//	var baseX=150;
//	var baseY=60;
//	var nodeWidth=128;
//	var delta=($('#topoDiv').width()-baseX*2-nodeWidth)/3;
//	for(var i=0;i<nodeList.length;i++){
//		var node=nodeList[i];
//		var x=baseX+i*delta;
//		var y=0+baseY/2+Math.pow(-1,i+1)*baseY/2;
//		node.setLocation(x,y);
//	}
};
CIIE.MapTopo.prototype.drawInternetLineTopo=function(result){
	this.box.clear();
	var record=result.data;
	
//	var node0 = this.getNewNode('TXP','customers_equip',record['customers_equip']);
//	var node1 = this.getNewNode('SDH','mobile_access_dev',record['mobile_access_dev']);
//	var node2 = this.getNewNode('SDH','tran_bureau_equip_name',record['tran_bureau_equip_name']);
//	var node3 = this.getNewNode('XIEZHUAN','bureau_equip',record['bureau_equip']);
//	
//	var link0 = this.getNewLink(node0,node1);
//	var link1 = this.getNewLink(node1,node2,record['line_id']);
//	var link2 = this.getNewLink(node2,node3);
//	
//	this.box.add(node0);
//	this.box.add(node1);
//	this.box.add(node2);
//	this.box.add(node3);
//	
//	this.box.add(link0);
//	this.box.add(link1);
//	this.box.add(link2);
//	
//	var nodeList=[node0,node1,node2,node3];
//	var baseX=150;
//	var baseY=60;
//	var nodeWidth=128;
//	var delta=($('#topoDiv').width()-baseX*2-nodeWidth)/3;
//	for(var i=0;i<nodeList.length;i++){
//		var node=nodeList[i];
//		var x=baseX+i*delta;
//		var y=0+baseY/2+Math.pow(-1,i+1)*baseY/2;
//		node.setLocation(x,y);
//	}
};
CIIE.MapTopo.prototype.getNewNode=function(resourceType,nodeId,nodeName){
	//nodeName=nodeName+'\ntest';
	var showName=nodeName;
	if(showName!=null&&showName.length>20){
		showName=showName.substring(0,20)+'..';
	}
	var node = new twaver.Node(nodeId);
	node.setImage(resourceType);
	node.setSize(128, 128);
	node.setName(showName);
	node.setToolTip(nodeName);
	node.setStyle('label.color', '#ffffff');
	node.setStyle('label.font', '26px "Microsoft Yahei"');
	
	//node.setStyle('label.maxlength', 50);
	return node;
};
CIIE.MapTopo.prototype.getNewLink=function(fromNode,toNode,linkName){
	var link = new twaver.Link(fromNode,toNode);
    if(linkName!=null) link.setName(linkName);
    link.setStyle("link.width", 5);
    link.setStyle('label.color', '#ffffff');
    link.setStyle('label.font', '26px "Microsoft Yahei"');
    link.setStyle('link.color', '#ffffff');
    return link;
};
CIIE.MapTopo.prototype.initMarker=function(){
	this.SDH=L.icon({
        iconUrl: this.ctx+'/static/styles/local-lsm/ciie/images/topo/SDH.png',
        iconSize: [128,128]
    });
	this.markerRes = L.icon({
        iconUrl: this.ctx+'/static/styles/local-lsm/ciie/images/topo/res.png',
        iconSize: [24,18]
    });
	this.markersJKSpecialLine = L.icon({
        iconUrl: this.ctx+'/static/styles/local-lsm/map/JKSpecialLine.png',
        iconSize: [48, 48]
    });
};
CIIE.MapTopo.prototype.initMap=function(){
	 
	
	
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
	 
	var baseLayer=L.tileLayer.baiduLayer('customLayerNormalSH.Map').addTo(this.map);
	 
	var baseLayers = {
		'地图':baseLayer
    };
	this.blankLayer0= new L.featureGroup();
	this.deviceLayerRes= new L.featureGroup();
	this.deviceLayerRouter= new L.featureGroup();
	this.deviceLayerAZ= new L.featureGroup();
	
	this.map.addLayer(this.blankLayer0);
	this.map.addLayer(this.deviceLayerRes);
	this.map.addLayer(this.deviceLayerRouter);
	this.map.addLayer(this.deviceLayerAZ);
	
    this.opticalLayer = new L.featureGroup();
    
    this.drawnItems = new L.FeatureGroup();
    this.map.addLayer(this.drawnItems);
    this.drawControl = new L.Control.Draw({
        edit: {
            featureGroup: this.drawnItems
        }
    });
    this.map.addControl(this.drawControl);
    this.lineDrawer=new L.Draw.Polyline(this.map, this.drawControl.options.polyline);
    this.map.on('draw:created',this.drawVertex.bind(this));
    var location={lat:31.195766,lon:121.308613};
	this.setView(location.lat,location.lon);
	
	
	this.SweetIcon = L.Icon.Label.extend({
		options: {
			iconUrl: BASEPATH+'/static/styles/local-lsm/ciie/images/topo/res.png',
			shadowUrl: null,
			iconSize: new L.Point(24, 18),
			iconAnchor: new L.Point(0, 1),
			labelAnchor: new L.Point(34, 0),
			wrapperAnchor: new L.Point(12, 13),
			labelClassName: 'mapLabel'
		}
	});
	
	this.SweetIcon2=L.Icon.Label.extend({//A/Z
		options: {
			iconUrl: BASEPATH+'/static/styles/local-lsm/ciie/images/topo/CSSB.png',
			shadowUrl: null,
			iconSize: new L.Point(48, 48),
			iconAnchor: new L.Point(0, 1),
			labelAnchor: new L.Point(42, 0),
			wrapperAnchor: new L.Point(12, 13),
			labelClassName: 'mapLabelSE'
		}
	});
	
	this.SweetIcon3=L.Icon.Label.extend({//协转/光收
		options: {
			iconUrl: BASEPATH+'/static/styles/local-lsm/ciie/images/topo/shu_tong_device.png',
			shadowUrl: null,
			iconSize: new L.Point(48, 48),
			iconAnchor: new L.Point(0, 1),
			labelAnchor: new L.Point(42, 0),
			wrapperAnchor: new L.Point(12, 13),
			labelClassName: 'mapLabel'
		}
	});
	
	this.SweetIcon4=L.Icon.Label.extend({//中间
		options: {
			iconUrl: BASEPATH+'/static/styles/local-lsm/ciie/images/topo/CSSB.png',
			shadowUrl: null,
			iconSize: new L.Point(32, 32),
			iconAnchor: new L.Point(0, 1),
			labelAnchor: new L.Point(42, 0),
			wrapperAnchor: new L.Point(12, 13),
			labelClassName: 'mapLabel'
		}
	});
    
//    new L.EditToolbar.Edit(this.map, {
//        featureGroup: drawnItems
//    })
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

CIIE.MapTopo.prototype.resetCenter=function(){
	
//	var lon=this.hotspotInfo.lon*1- 0.0045;
//	var lat=this.hotspotInfo.lat*1+0.0025;
//	var bdPoint = this.wgs84tobd09(lon,lat);
//	var point = bdPoint.reverse();
//	this.setView(point[0],point[1]);
	
	this.setView(this.hotspotInfo.lat,this.hotspotInfo.lon);
};
CIIE.MapTopo.prototype.setView=function(lat,lon){
	this.map.setView([lat,lon], 13);
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
