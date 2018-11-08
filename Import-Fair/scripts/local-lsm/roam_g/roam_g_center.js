var CIIENEW=CIIENEW||{};
CIIENEW.GroupScreenRoam=function ()
{
	this.initialize.apply(this,arguments);
};
CIIENEW.GroupScreenRoam.prototype.constructor=CIIENEW.GroupScreenRoam;
CIIENEW.GroupScreenRoam.prototype.hotspot='上海';
CIIENEW.GroupScreenRoam.prototype.dm=null;
CIIENEW.GroupScreenRoam.prototype.cdm=null;
CIIENEW.GroupScreenRoam.prototype.roamType='intl';
CIIENEW.GroupScreenRoam.prototype.hotspotList=[];
CIIENEW.GroupScreenRoam.prototype.startIndex=0;
CIIENEW.GroupScreenRoam.prototype.selectedHot=null;
CIIENEW.GroupScreenRoam.prototype.lineWidth=3;
CIIENEW.GroupScreenRoam.prototype.chartLabelSize=24;
CIIENEW.GroupScreenRoam.prototype.alarmColors=['#00ffaa','#fff066','#ff933c','#ff5252'];
CIIENEW.GroupScreenRoam.prototype.mapBaseWidth=2400;
CIIENEW.GroupScreenRoam.prototype.mapBaseHeight=1120;

CIIENEW.GroupScreenRoam.prototype.worldDataCache=[];
CIIENEW.GroupScreenRoam.prototype.provinceDataCache=[];

CIIENEW.GroupScreenRoam.prototype.shortNameMap={
	'马来西亚':'马来'
};

//CIIENEW.GroupScreenRoam.prototype.gradientBase=['#802fbf','#d82993','#e72923','#ff6b0e','#ff990c','#feff0c'];
//CIIENEW.GroupScreenRoam.prototype.gradientBase=['#7da3f0','#6666ff','#087aed','#66e6ff','#00ffaa','#bbe834'];
//CIIENEW.GroupScreenRoam.prototype.gradientBase=['#bbe834','#00ffaa','#66e6ff','#087aed','#6666ff','#7da3f0'];
//CIIENEW.GroupScreenRoam.prototype.gradientBase=['#FFA624','#FFB92B','#FFC830','#FFD936','#FFE43B','#FFF440'];
CIIENEW.GroupScreenRoam.prototype.gradientBase=['#1800ff','#0033ff','#0055fe','#0080ff','#0099ff','#5bc0f8'];

CIIENEW.GroupScreenRoam.prototype.gradientArr=[];

CIIENEW.GroupScreenRoam.prototype.lineColors=['#ef500c','#ff8e21','#6ad72c','#1eb6cd'];

CIIENEW.GroupScreenRoam.prototype.ec=null;

var bool=false;
var name="国际";
CIIENEW.GroupScreenRoam.prototype.initialize=function(_hotspot){
	if(_hotspot!=null){
		this.hotspot=_hotspot;
	}
	
	require(['echarts','echarts/chart/map'],this.initEcharts.bind(this));
	
	
};
CIIENEW.GroupScreenRoam.prototype.initEcharts=function(ec){
	this.ec=ec;
	this.chartWorld=ec.init($("#map")[0],'marcarons');
	
	this.dm=LSMScreen.DataManager.getInstance();
	this.cdm=LSMScreen.CacheDataManager.getInstance();
	
	$('#switchBtn').on('click',this.switchRoamType.bind(this));
	$('#airportroamclose').on('click',this.closeAirport.bind(this));
	
	this.update();
	setInterval(this.update.bind(this),60*1000);
	
	$(".airportshowtip").on("mouseover",this.showAirTip.bind(this));
	$(".airportshowtip").on("mouseout",this.hideAirTip.bind(this));
	
	$('#roamListCtrl').on('click',this.roamListCtrl.bind(this));
	
	setInterval(this.rotateAirportContent.bind(this),60*1000);
};
CIIENEW.GroupScreenRoam.prototype.roamListCtrl=function(e){
	if($('#roamList').height()==62){
		$('#roamList').css('height','auto');
		$(e.currentTarget).attr('class','GS-arrow-up');
		$('#roamListBg').show();
	}else{
		$('#roamList').css('height','62px');
		$(e.currentTarget).attr('class','GS-arrow-down');
		$('#roamListBg').hide();
	}
	
	
};
CIIENEW.GroupScreenRoam.prototype.showAirTip=function(e){
	var x = $(e.currentTarget).offset().left+$(e.currentTarget).width()+20; 
	var y = Math.min($(e.currentTarget).offset().top-20,$('body').height()-$('#airportpopup').height()); 
	$('#airportpopup').css('left',x);
	$('#airportpopup').css('top',y);
	$('#airportpopup').show();
};
CIIENEW.GroupScreenRoam.prototype.hideAirTip=function(e){
	$('#airportpopup').hide();
};
CIIENEW.GroupScreenRoam.prototype.rotateAirportContent=function(e){
	$("#airportpdcontent").removeClass("rotateDivX");
	$("#airporthqcontent").removeClass("rotateDivX");
	setTimeout(this.rotateAirportContent2.bind(this),200);
};
CIIENEW.GroupScreenRoam.prototype.rotateAirportContent2=function(e){
	$("#airportpdcontent").addClass("rotateDivX");
	$("#airporthqcontent").addClass("rotateDivX");
};
CIIENEW.GroupScreenRoam.prototype.showRoamCtrl=function(e){
	$('#roamCtrl').css('height','auto');
};
CIIENEW.GroupScreenRoam.prototype.hideRoamCtrl=function(e){
	$('#roamCtrl').css('height','57px');
};
CIIENEW.GroupScreenRoam.prototype.click=function(e){
	 var img=$(e).data("img");
	 var bool=$("#optical_img").data("bool");
	 var optical=$(e).data("optical");
	 var img=$(e).data("img");
	 var hot=$(e).data("text");
	 for(var c=1;c<9;c++){
		 $('#optical_'+c+'_img').attr('src',eastcom.baseURL+'/static/styles/local-lsm/roam/images/Roam/'+$('#optical_'+c).data("img")+'_white.png');
		 $('#optical_'+c+'_div').css('color',"#ffffff");
	 }
	 $('#optical_'+optical+'_img').attr('src',eastcom.baseURL+'/static/styles/local-lsm/roam/images/Roam/'+img+'_bluce.png');
	 $('#optical_'+optical+'_div').css('color',"#00fcff");
	 this.selectedHot=hot;
	 this.hotspot=hot;
	 if(bool==true){
		 this.roamType='pro';
		 $('#chinaDiv').css('display','block');
		 $('#worldDiv').css('display','none');
		 this.update();
		this.switchRoamType();
	 }else{
		 this.roamType='intl';
		 $('#chinaDiv').css('display','none');
		 $('#worldDiv').css('display','block');
		 this.update();
		this.switchRoamType();
	 }
	 if(isScreenMode=="true"){
		 this.IntOrPro=bool;
		 parent.showRoamLeft(hot,bool,this.roamType);
		 parent.updateHotspot(hot,this.roamType);
	 }
	 
}

CIIENEW.GroupScreenRoam.prototype.BoolClick=function(e){
	 bool=$("#optical_img").data("bool");
	 _name=$("#"+e.id).data("name");
	 if(_name!=name){
		 name=_name;
		 this.dm=LSMScreen.DataManager.getInstance();
		 this.cdm=LSMScreen.CacheDataManager.getInstance();
		 if(bool==false){
			 $("#optical1_img").css('display','none');
			 $("#optical2_img").css('display','block');
			 $('#optical_img').attr('src',eastcom.baseURL+'/static/styles/local-lsm/roam/images/Roam/sj.png');
			 $("#optical_img").data("bool",true);
			 var Html="";
			 var position_sj={1:{"top":60,"left":15,"img":"sh","name":"上海","text":"上海"},
					 2:{"top":120,"left":15,"img":"ba","name":"保障区域","text":"进口博览会"},
					 3:{"top":180,"left":15,"img":"hz","name":"国家会展中心","text":"J-国家会展中心"},
					 4:{"top":240,"left":15,"img":"fj","name":"浦东机场","text":"J-浦东机场"},
					 5:{"top":300,"left":15,"img":"fj","name":"虹桥机场","text":"J-虹桥机场"},
					 6:{"top":360,"left":15,"img":"hc","name":"虹桥站","text":"J-虹桥站"},
					 7:{"top":420,"left":15,"img":"hc","name":"上海站","text":"J-上海站"},
					 8:{"top":480,"left":15,"img":"hc","name":"上海南站","text":"J-上海南站"}};
			 for(var c=1;c<9;c++){
				 if(this.hotspot==position_sj[c].text){
					 Html+='<div id="optical_'+c+'" style="height: 50px;position: absolute;cursor:pointer;color:#00fcff; top:'+position_sj[c].top+'px;left:'+position_sj[c].left+'px" data-img="'+position_sj[c].img+'" data-text="'+position_sj[c].text+'" data-name="'+position_sj[c].img+'" data-optical="'+c+'" onclick="screen.click(this)"><img id="optical_'+c+'_img" src='+eastcom.baseURL+'/static/styles/local-lsm/roam/images/Roam/'+position_sj[c].img+'_bluce.png style="width: 30px;position: relative;top:10px"><div style="font-size:30px;padding-left:30px;top: -25px;position: relative;" id="optical_'+c+'_div">'+position_sj[c].name+'</div></div>'; 
				 }else{
					 Html+='<div id="optical_'+c+'" style="height: 50px;position: absolute;cursor:pointer;top:'+position_sj[c].top+'px;left:'+position_sj[c].left+'px" data-img="'+position_sj[c].img+'" data-text="'+position_sj[c].text+'" data-name="'+position_sj[c].img+'" data-optical="'+c+'" onclick="screen.click(this)"><img id="optical_'+c+'_img" src='+eastcom.baseURL+'/static/styles/local-lsm/roam/images/Roam/'+position_sj[c].img+'_white.png style="width: 30px;position: relative;top:10px"><div style="font-size:30px;padding-left:30px;top: -25px;position: relative;" id="optical_'+c+'_div">'+position_sj[c].name+'</div></div>';
				 }
			 }
			 $("#optical").empty();
			 document.getElementById("optical").innerHTML = Html; 
			 bool=true;
			 this.roamType='pro';
			 this.hideAirRoam(true);
			 $('#chinaDiv').css('display','block');
			 $('#worldDiv').css('display','none');
			 this.update();
			 this.switchRoamType();
		 }else if(bool==true){
			 $("#optical2_img").css('display','none');
			 $("#optical1_img").css('display','block');
			 $('#optical_img').attr('src',eastcom.baseURL+'/static/styles/local-lsm/roam/images/Roam/gj.png');
			 $("#optical_img").data("bool",false);
			 var Html=""; var t="";
			for(var c=1;c<6;c++){
				 if(this.hotspot==position_gj[c].text){
					 t=c;
					 Html+='<div id="optical_'+c+'" style="height: 50px;position: absolute;cursor:pointer; color:#00fcff; top:'+position_gj[c].top+'px;left:'+position_gj[c].left+'px" data-img="'+position_gj[c].img+'" data-name="'+position_gj[c].img+'" data-text="'+position_gj[c].text+'" data-optical="'+c+'" onclick="screen.click(this)"><img id="optical_'+c+'_img" src='+eastcom.baseURL+'/static/styles/local-lsm/roam/images/Roam/'+position_gj[c].img+'_bluce.png style="width: 30px;position: relative;top:10px"><div style="font-size:30px;padding-left:30px;top: -25px;position: relative;" id="optical_'+c+'_div">'+position_gj[c].name+'</div></div>';
				 } 
			 }
			 for(var c=1;c<6;c++){
				 if(c==1&&utils.isStringEmpty(t)){
					 this.hotspot="上海";this.roamType="intl";
					 Html+='<div id="optical_'+c+'" style="height: 50px;position: absolute;cursor:pointer; color:#00fcff; top:'+position_gj[c].top+'px;left:'+position_gj[c].left+'px" data-img="'+position_gj[c].img+'" data-name="'+position_gj[c].img+'" data-text="'+position_gj[c].text+'" data-optical="'+c+'" onclick="screen.click(this)"><img id="optical_'+c+'_img" src='+eastcom.baseURL+'/static/styles/local-lsm/roam/images/Roam/'+position_gj[c].img+'_bluce.png style="width: 30px;position: relative;top:10px"><div style="font-size:30px;padding-left:30px;top: -25px;position: relative;" id="optical_'+c+'_div">'+position_gj[c].name+'</div></div>';							 
				 }else{
					 if(c!=t){
						Html+='<div id="optical_'+c+'" style="height: 50px;position: absolute;cursor:pointer;top:'+position_gj[c].top+'px;left:'+position_gj[c].left+'px" data-img="'+position_gj[c].img+'" data-text="'+position_gj[c].text+'" data-name="'+position_gj[c].img+'" data-optical="'+c+'" onclick="screen.click(this)"><img id="optical_'+c+'_img" src='+eastcom.baseURL+'/static/styles/local-lsm/roam/images/Roam/'+position_gj[c].img+'_white.png style="width: 30px;position: relative;top:10px"><div style="font-size:30px;padding-left:30px;top: -25px;position: relative;" id="optical_'+c+'_div">'+position_gj[c].name+'</div></div>';  
					 }
				 }
			 }
			 $("#optical").empty();
			 document.getElementById("optical").innerHTML = Html; 
			 bool=false;
			 this.roamType='intl';
			 this.showAirRoam(true);
			 $('#chinaDiv').css('display','none');
			 $('#worldDiv').css('display','block');
			 this.update();
			 this.switchRoamType();
		 }
		 if(isScreenMode=="true"){
			 this.IntOrPro=bool;
			 parent.showRoamLeft(this.hotspot,bool,this.roamType);
			 parent.updateHotspot(this.hotspot,this.roamType);
		 } 
	 }
	
}
CIIENEW.GroupScreenRoam.prototype.showTip=function(e){
	var dataIndex=$(e.currentTarget).attr('dataIndex');
	if(dataIndex>=0){
		var list=[];
		var record={};
		var map={};
		
		if(this.roamType=='intl'){
			$('#tipDiv').html('');
			list=this.worldDataCache;
			record=list[dataIndex];
			map=this.pointMap;
			
			var name=record.id.split('(')[0];
			name=name.replace(/\s/g,'');
			var value=record.user_cnt;
			//var pos={x:Math.random()*2400,y:Math.random()*1200}
			var pos={x:0,y:200}
			if(map[name]!=null){
				pos=map[name];
			}else{
				console.log(name);
			}
			var showName=name;
			if(showName=="香港"||showName=="澳门"||showName=="台湾"){
				showName="中国"+showName;
			}
			var ratio=$('#world').width()/$('.bgC').width();
			var delta=$('#world').css('margin-left').replace('px','')*1;
			var originX=pos.x*ratio+delta;
			var originY=pos.y;
			
			var centerX=pos.x*ratio+delta;
			var centerY=pos.y;
			
			if(centerX<0){
				centerX=0;
			}else if(centerX+282>$('#tipDiv').width()){
				centerX=$('#tipDiv').width()-282;
			}
			
			if(centerY<0){
				centerY=0;
			}else if(centerY+112>$('#tipDiv').height()){
				centerY=$('#tipDiv').height()-32;
			}
			
			var marker='<img src="'+BASEPATH+'/static/styles/local-lsm/roam/images/dot.gif" style="position:absolute;top:'+(originY-32)+'px;left:'+(originX-32)+'px;;">'
			$('#tipDiv').append(marker);
			
			var tip='<div intl_name="'+name+'" class="roamTipNew" style="z-index:1;padding:5px 0px 0px 40px;font-size:28px;position:absolute;top:'+centerY+'px;left:'+centerX+'px;">'
			+'<span>'+showName+'</span>'
			+'<div style="border:solid 0px #ff0000;margin-left:-35px;">'
				+'<img style="float:left;" src="'+BASEPATH+'/static/styles/local-lsm/roam/images/country_map/'+this.imgMap[name]+'.png">'
				+'<div style="width:110px;float:left;text-align:right;" class="ciiekpistyle fontImportantInfo">'+value+'</div><div style="float:left;padding-top:15px;" class="ciiekpistyle fontUnitTime">人</div>'
			+'</div>'
			+'</div>';
			$('#tipDiv').append(tip);
			
		
		}else if(this.roamType=='pro'){
			$('#tipDivPro').html('');
			list=this.provinceDataCache;
			record=list[dataIndex];
			map=this.provincePointMap;
			
			var name=record.id.split('(')[0];
			name=name.replace(/\s/g,'');
			var value=record.user_cnt;
			//var pos={x:Math.random()*2400,y:Math.random()*1200}
			var pos={x:0,y:200}
			if(map[name]!=null){
				pos=map[name];
			}else{
				console.log(name);
			}
			
			var ratio=$('#china').height()/$('#chinaDiv').height();
			
			var originX=pos.x;
			var originY=pos.y*ratio;
			
			var centerX=pos.x;
			var centerY=pos.y*ratio;
			
			if(centerX<0){
				centerX=0;
			}else if(centerX+282>$('#tipDivPro').width()){
				centerX=$('#tipDivPro').width()-282;
			}
			
			if(centerY<0){
				centerY=0;
			}else if(centerY+112>$('#tipDivPro').height()){
				centerY=$('#tipDivPro').height()-32;
			}
			var marker='<img src="'+BASEPATH+'/static/styles/local-lsm/roam/images/dot.gif" style="position:absolute;top:'+(originY-32)+'px;left:'+(originX-32)+'px;;">'
			$('#tipDivPro').append(marker);
			
			var tip='<div pro_name="'+name+'" class="roamTipNew" style="z-index:1;padding:5px 0px 0px 40px;font-size:28px;position:absolute;top:'+centerY+'px;left:'+centerX+'px;">'
			+'<span>'+name+'</span>'
			+'<div style="border:solid 0px #ff0000;margin-left:-35px;">'
				+'<img style="float:left;" src="'+BASEPATH+'/static/styles/local-lsm/roam/images/pro.png">'
				+'<div style="width:110px;float:left;text-align:right;" class="ciiekpistyle fontImportantInfo">'+value+'</div><div style="float:left;padding-top:15px;" class="ciiekpistyle fontUnitTime">人</div>'
			+'</div>'
			+'</div>';
			$('#tipDivPro').append(tip);
			
		
		}
		
	}else{
		$('#tipDiv').html('');
		$('#tipDivPro').html('');
	}
};
CIIENEW.GroupScreenRoam.prototype.resetGradient=function(gradientCount){
	this.gradientArr=[];
	var eachStep=gradientCount/(this.gradientBase.length-1);
	for(var i=0;i<this.gradientBase.length-1;i++){
		var gradient = new gradientColor(this.gradientBase[i],this.gradientBase[i+1],eachStep);
		this.gradientArr=this.gradientArr.concat(gradient);
	}
};
/*CIIENEW.GroupScreenRoam.prototype.posChange=function(){
	
};*/
CIIENEW.GroupScreenRoam.prototype.logSvgPos=function(e){
//	2400*1120
//	console.log(e.clientX+','+e.clientY);
	console.log('{x:'+e.clientX+',y:'+e.clientY+'}');
};
CIIENEW.GroupScreenRoam.prototype.closeAirport=function(e){
	this.hideAirRoam(true);
};
CIIENEW.GroupScreenRoam.prototype.updateHotspot=function(hot){
	this.hotspot=hot;
	this.update();
	
};

CIIENEW.GroupScreenRoam.prototype.switchRoamType=function(){
	try{
		parent.updateRoamType(this.roamType);
	}catch(e){
		console.log(e);
	}
};

CIIENEW.GroupScreenRoam.prototype.update=function(){
	var hotspot=this.hotspot
	if(this.hotspot=="上海"){
		hotspot="all";
	}
	if(this.roamType=='intl'){
		this.cdm.getUserDist({hot_name:hotspot,roamType:"intl",topN:2000},this.drawWorldChart.bind(this));
	}else if(this.roamType=='pro'){
		this.cdm.getUserDist({hot_name:hotspot,roamType:"pro",topN:200},this.drawProChart.bind(this));
	}
	
	/*if(this.roamType=='intl'){
		this.cdm.getIntlRoamTopN({topN:200,hot_name:this.hotspot},this.drawWorldChart.bind(this));
	}else if(this.roamType=='pro'){
		this.cdm.getProRoamTopN({topN:200,hot_name:this.hotspot},this.drawProChart.bind(this));
	}*/
	
	this.cdm.getIntlRoamIn({
		intl_name:null,
		hot_name:'J-浦东机场'
	},function(result){
		var record=result.data;
		record=record['J-浦东机场'];
		var value=record.user_cnt+'';
		var currentNum=$('#airportpd>div').length-1;
		$('#airportpd>div').text('0');
		for(var i=value.length-1;i>=0;i--){
			$('#airportpd>div:eq('+currentNum+')').text(value.charAt(i));
			currentNum--;
		}
	});
	
	this.cdm.getUserDistAll({
		intl_name:null,
		hot_name:'J-浦东机场'
	},function(result){
		var record=result.data;
		record=record['intl'];
		var value=record.user_cnt_dist;
		$('#airportpddist').text(value);
	});
	
	this.cdm.getIntlRoamIn({
		intl_name:null,
		hot_name:'J-虹桥机场'
	},function(result){
		var record=result.data;
		record=record['J-虹桥机场'];
		var value=record.user_cnt+'';
		var currentNum=$('#airportpd>div').length-1;
		$('#airporthq>div').text('0');
		for(var i=value.length-1;i>=0;i--){
			$('#airporthq>div:eq('+currentNum+')').text(value.charAt(i));
			currentNum--;
		}
	});
	
	this.cdm.getUserDistAll({
		intl_name:null,
		hot_name:'J-虹桥机场'
	},function(result){
		var record=result.data;
		record=record['intl'];
		var value=record.user_cnt_dist;
		$('#airporthqdist').text(value);
	});
};


CIIENEW.GroupScreenRoam.prototype.drawProChart=function(result){
	var list=result.data;
	var count=0;
	$('#legendTips>div').text('0▶');
	var step=100;
	this.resetGradient(step);
	var max=1;
	var legends=6;
	if(list.length>0){
		max=list[0].user_cnt;
	}
	for(var i=0;i<legends-1;i++){
		$('#legendTips>div:eq('+i+')').text(Math.floor(max/legends*(legends-i))+'▶');
	}
	this.provinceDataCache=list;
	
    var map={
        name: '中国',
        type: 'map',
        roam: true,
        hoverable: false,
        mapType: 'china',
        itemStyle: {
            normal: {
                color: '#276cf6',
                borderColor: 'rgba(2,12,48,1)',
                borderWidth: 1,
                areaStyle: {
                    color: '#276cf6'
                },
                label: {
                    show: false,
                    textStyle: {
                        fontSize: 12,
                        color: 'white'
                    }
                }
            }
        },
        data: [],
        nameMap:nameMap,
        markLine: {

            smooth: true,
            symbol: ['none', 'circle'],
            symbolSize: 1,
            itemStyle: {
                normal: {
                    color: '#fff',
                    borderWidth: 1,
                    borderColor: 'rgba(30,144,255,0.5)'
                }
            },
            data: [],
        },
        geoCoord: worldGeoCoord
    };
   
    
    this.chartChina=this.ec.init($("#map2")[0],'marcarons');
    var data = list;
    var seriess=[map];
    var step=100;
    var maxLineWidth=3;
    var center='上海';
    var maxLine=10;
    var count=0;
    var legendHtml='';
    //各市州到中心的连线数据
    for (var i = 0; i < data.length; i++) {
    	var record=data[i];
    	var name=record.id.split('(')[0].replace(/\s+/g,'');
    	var value=record.user_cnt;
    	var index=step-Math.floor(value/max*step);
    	var color=this.lineColors[Math.min(count,this.lineColors.length-1)];
        var point = new Object();
        point.name = name;
        var centerPoint = new Object();
        centerPoint.name = center;
        var arr = new Array();
        arr.push(point);
		arr.push(centerPoint);
		count++;
		console.log('name:'+name);
		if(count<=maxLine){
			legendHtml+=this.getLegendItemHtml(name,value,max,count);
		}
        var series= {
                name: i,
                type: 'map',
                mapType: 'china',
                data: [],
                nameMap:nameMap,
                scaleLimit:{max:1, min:1},
                markLine: {
                    smooth: true,
                    effect: {
                        show: true,
                        scaleSize: 2,
                        period: 30,
                        color: '#fff',
                        shadowBlur: 10
                    },
                    itemStyle: {
                        normal: {
                        	symbolSize:1,
                            borderWidth: 1,
                            lineStyle: {
                                type: 'solid',
                                shadowBlur: 10,
                                width:maxLineWidth*(step-index)/100+1,
                                color:color
                            }
                        }
                    },
                    data:[arr]
                },
	            geoCoord: chinaGeoCoord,
                markPoint: {
                    symbol: 'emptyCircle',
                    symbolSize: 0,
                    effect: {
                        show: true,
                        shadowBlur: 0
                    },
                    itemStyle: {
                        normal: {
                            label: {show: false}
                        },
                        emphasis: {
                            label: {position: 'top'}
                        }
                    },
                    data:[record]
                }
            };
        seriess.push(series);
    }
    $('#roamListTitle').text('漫入省份');
    $('#roamListContent').html(legendHtml);
    var option = {
    	    //backgroundColor: '#1b1b1b',
    	    color: ['gold', 'aqua', 'lime'],
    	    title: {
    	        show: false,
    	        text: ' ',

    	        x: 'center',
    	        textStyle: {
    	            color: '#fff'
    	        }
    	    },
    	    tooltip: {
    	    	show:false,
    	        trigger: 'item',
    	        formatter: function (params, ticket, callback) {
    	            /*$.get('detail?name=' + params.name, function (content) {
    	                callback(ticket, toHTML(content));
    	            });*/
    	            var tips = '<ul style="list-style: none">';
    	            tips += '<li>' + params.name + ':'+params.value+'</li>';
    	            tips += '</ul>';
    	            return tips;
    	        }
    	    },
    	    legend: {
    	        show: false,
    	        data: []
    	    },
    	    toolbox: {
    	        show: false,
    	        orient: 'vertical',
    	        x: 'right',
    	        y: 'center',
    	        feature: {
    	            mark: {show: true},
    	            dataView: {show: true, readOnly: false},
    	            restore: {show: true},
    	            saveAsImage: {show: true}
    	        }
    	    },
    	    dataRange: {
    	        min: 0,
    	        max: 100,
    	        show:false,
    	        calculable: true,
    	        color: ['#ff3333', 'orange', 'yellow', 'lime', 'aqua'],
    	        textStyle: {
    	            color: '#fff'
    	        }
    	    },
    	    series: []
    	};
    //流向数据
    option.series=seriess;
    option.title.text = '';
    this.chartChina.setOption(option);
};

CIIENEW.GroupScreenRoam.prototype.getLegendItemHtml=function(name,value,max,count){
	var showValue=value;
	var showName=name;
	var barColorCss=count<4?'GS-roamList-rankcolor'+count:'GS-roamList-rankcolor4';
	var barWidth=value/max*100;
	if(value>=10000){
		showValue=(value/10000).toFixed(1)+'万';
	}
	if(this.shortNameMap[name]!=null){
		showName=this.shortNameMap[name];
	}else if(name.length>3){
		showName=name.substring(0,2)+'<br>'+name.substring(2,name.length);
	}
	var legendHtml='<div style="position:relative;">'
					+'<div class="fontSubInfo2" style="float:left;width:80px;text-align:right;">'+showName+'</div>'
					+'<div style="float:left;margin-left:5px;width:80px;height:10px;">'
						+'<div style="position:absolute;top:50%;margin-top:-5px;width:80px;border:solid 1px #1222bf;padding:1px;border-radius:5px;height:12px;background:#0a0e4d;">'
							+'<div class="'+barColorCss+'" style="width:'+barWidth+'%;height:8px;"></div>'
						+'</div>'
					+'</div>'
					+'<div class="fontSubInfo2 ciiekpistyle" style="margin-left:5px;float:left;width:80px;">'
						+'<div style="position:absolute;top:50%;margin-top:-18px;">'+showValue+'</div>'
					+'</div>'
					+'<div style="clear:both;"></div>'
				+'</div>'
				+'<div style="clear:both;"></div>';
	return legendHtml;
};
CIIENEW.GroupScreenRoam.prototype.drawWorldChart=function(result){
	$('#tipDiv').html('');
	var list=result.data;
	var count=0;
	$('#legendTips>div').text('0▶');
	var step=100;
	this.resetGradient(step);
	var max=1;
	var legends=6;
	if(list.length>0){
		max=list[0].user_cnt;
	}
	for(var i=0;i<legends-1;i++){
		$('#legendTips>div:eq('+i+')').text(Math.floor(max/legends*(legends-i))+'▶');
	}
	this.worldDataCache=list;
	
    var map={
        name: '世界',
        type: 'map',
        roam: true,
        hoverable: false,
        mapType: 'world',
        itemStyle: {
            normal: {
                color: '#276cf6',
                borderColor: 'rgba(2,12,48,1)',
                borderWidth: 1,
                areaStyle: {
                    color: '#276cf6'
                },
                label: {
                    show: false,
                    textStyle: {
                        fontSize: 12,
                        color: 'white'
                    }
                }
            }
        },
        data: [],
        nameMap:nameMap,
        markLine: {

            smooth: true,
            symbol: ['none', 'circle'],
            symbolSize: 1,
            itemStyle: {
                normal: {
                    color: '#fff',
                    borderWidth: 1,
                    borderColor: 'rgba(30,144,255,0.5)'
                }
            },
            data: [],
        },
        geoCoord: worldGeoCoord
    };
   
    
    this.chartWorld=this.ec.init($("#map")[0],'marcarons');
    var data = list;
    var seriess=[map];
    var step=100;
    var maxLineWidth=3;
    var center='上海';
    var maxLine=10;
    var count=0;
    var legendHtml='';
    //各市州到中心的连线数据
    for (var i = 0; i < data.length&&count<maxLine; i++) {
    	var record=data[i];
    	var name=record.id.split('(')[0].replace(/\s+/g,'');
    	var value=record.user_cnt;
    	var index=step-Math.floor(value/max*step);
    	var color=this.lineColors[Math.min(count,this.lineColors.length-1)];//this.gradientArr[index];
        var point = new Object();
        point.name = nameMapReverse[name];
        var centerPoint = new Object();
        centerPoint.name = center;
        var arr = new Array();
        arr.push(point);
		arr.push(centerPoint);
		if(nameMapReverse[name]==null||nameMapReverse[name]==''){
			continue;
		}else{
			count++;
			console.log('name:'+name);
		}
		
		legendHtml+=this.getLegendItemHtml(name,value,max,count);
        var series= {
                name: i,
                type: 'map',
                mapType: 'world',
                scaleLimit:{max:1, min:1},
                data: [],
                nameMap:nameMap,
                markLine: {
                    smooth: true,
                    effect: {
                        show: true,
                        scaleSize: 2,
                        period: 30,
                        color: '#fff',
                        shadowBlur: 10
                    },
                    itemStyle: {
                        normal: {
                        	symbolSize:1,
                            borderWidth: 1,
                            lineStyle: {
                                type: 'solid',
                                shadowBlur: 10,
                                width:maxLineWidth*(step-index)/100+1,
                                color:color
                            }
                        }
                    },
                    data:[arr]
                },
                markPoint: {
                    symbol: 'emptyCircle',
                    symbolSize: 0,
                    effect: {
                        show: true,
                        shadowBlur: 0
                    },
                    itemStyle: {
                        normal: {
                            label: {show: false}
                        },
                        emphasis: {
                            label: {position: 'top'}
                        }
                    },
                    data:[record]
                }
            };
        seriess.push(series);
    }
    $('#roamListTitle').text('漫入国家');
    $('#roamListContent').html(legendHtml);
    var option = {
    	    //backgroundColor: '#1b1b1b',
    	    color: ['gold', 'aqua', 'lime'],
    	    title: {
    	        show: false,
    	        text: ' ',
    	        x: 'center',
    	        textStyle: {
    	            color: '#fff'
    	        }
    	    },
    	    tooltip: {
    	    	show:false,
    	        trigger: 'item',
    	        formatter: function (params, ticket, callback) {
    	            /*$.get('detail?name=' + params.name, function (content) {
    	                callback(ticket, toHTML(content));
    	            });*/
    	            var tips = '<ul style="list-style: none">';
    	            tips += '<li>' + params.name + ':'+params.value+'</li>';
    	            tips += '</ul>';
    	            return tips;
    	        }
    	    },
    	    legend: {
    	        show: false,
    	        data: []
    	    },
    	    toolbox: {
    	        show: false,
    	        orient: 'vertical',
    	        x: 'right',
    	        y: 'center',
    	        feature: {
    	            mark: {show: true},
    	            dataView: {show: true, readOnly: false},
    	            restore: {show: true},
    	            saveAsImage: {show: true}
    	        }
    	    },
    	    dataRange: {
    	        min: 0,
    	        max: 100,
    	        show:false,
    	        calculable: true,
    	        color: ['#ff3333', 'orange', 'yellow', 'lime', 'aqua'],
    	        textStyle: {
    	            color: '#fff'
    	        }
    	    },
    	    series: []
    	};
    //流向数据
    option.series=seriess;
    option.title.text = '';
    this.chartWorld.setOption(option);
};


CIIENEW.GroupScreenRoam.prototype.blockOver=function(e){
	var intl_name=$(e.currentTarget).attr('intl_name');
	$('.roammaptip[intl_name='+intl_name+']').css('display','block');
	$('.roammaptip[intl_name='+intl_name+']').css('top',e.clientY-68);
	$('.roammaptip[intl_name='+intl_name+']').css('left',e.clientX);
};
CIIENEW.GroupScreenRoam.prototype.blockOut=function(e){
	var intl_name=$(e.currentTarget).attr('intl_name');
	$('.roammaptip[intl_name='+intl_name+']').css('display','none');
};

CIIENEW.GroupScreenRoam.prototype.blockOverPro=function(e){
	var pro_name=$(e.currentTarget).attr('pro_name');
	$('.roammaptip[pro_name='+pro_name+']').css('display','block');
	$('.roammaptip[pro_name='+pro_name+']').css('top',e.clientY-68);
	$('.roammaptip[pro_name='+pro_name+']').css('left',e.clientX);
};
CIIENEW.GroupScreenRoam.prototype.blockOutPro=function(e){
	var pro_name=$(e.currentTarget).attr('pro_name');
	$('.roammaptip[pro_name='+pro_name+']').css('display','none');
};

CIIENEW.GroupScreenRoam.prototype.showAirRoam=function(isPermenent){
	$('#airportroam').css('display','block');
	if(isPermenent){
		$('#airportroam').attr('isPermenent','true');
	}
};
CIIENEW.GroupScreenRoam.prototype.hideAirRoam=function(force){
	if(force){
		$('#airportroam').attr('isPermenent','false');
	}
	if($('#airportroam').attr('isPermenent')!='true'){
		$('#airportroam').css('display','none');
	}
};