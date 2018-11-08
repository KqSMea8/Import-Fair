var CIIENEW=CIIENEW||{};
CIIENEW.Screen=function ()
{
	this.initialize.apply(this,arguments);
};
CIIENEW.Screen.prototype.constructor=CIIENEW.Screen;
CIIENEW.Screen.prototype.hotspot='J-国家会展中心';
CIIENEW.Screen.prototype.dm=LSMScreen.DataManager.getInstance();
CIIENEW.Screen.prototype.cdm=LSMScreen.CacheDataManager.getInstance();
CIIENEW.Screen.prototype.sortKey='总流量';
var Situation={};
Situation.sortKey="s_083";
Situation.hotspot="J-国家会展中心";
Situation.Coefficient=1;
Situation.HotspotTree={};
CIIENEW.Screen.prototype.initialize=function(_hotspot){
	this.update();
	this.getHotspotTree();
	setInterval(this.update.bind(this),300*1000);
	setInterval(this.getHotspotTree.bind(this),300*1000);

};
CIIENEW.Screen.prototype.MinClick=function(obgect){
	this.updateMinTimeTops();
	var major=$("#"+$($($(obgect)[0]).context.childNodes[0]).context.childNodes[1].id).attr("title");
	Situation.Internet.click_value=$("#"+$($($(obgect)[0]).context.childNodes[0]).context.childNodes[0].id).text();
	$('#s_083_flow').text(Situation.Internet.click_value);
	$('#s_083_flow2').text($("#"+$($($(obgect)[0]).context.childNodes[0]).context.childNodes[0].id).data("name"));
	this.cdm.getHotspotTimerank({hotspot:Situation.hotspot,time_bool:null,num:18,major:major,sortKey:this.sortKey},this.updateMinTimeTop.bind(this));
}
CIIENEW.Screen.prototype.Click=function(obgect){
	if($(obgect).data("name")=="流量"){
		this.sortKey='总流量';
	}else{
		this.sortKey=$(obgect).data("name");
	}
	for(var t=0;t<$("#InternetPerception_ul li>div").length;t++){
		$($("#InternetPerception_ul li>div")[t]).css("border","0px solid #2344e8");
	}
	$(obgect).css("border","2.5px solid #2344e8");
	Situation.sortKey=$($($(obgect)[0]).context.childNodes[1]).context.childNodes[0].id.replace("_id","");
	this.Get();
}
CIIENEW.Screen.prototype.update=function(){
	if(!utils.isStringEmpty(this.hotspot)){
		Situation.hotspot=this.hotspot;
	}
	this.cdm.getHotspotKpi({ids:Situation.hotspot},this.updateCompany.bind(this));
};
CIIENEW.Screen.prototype.getHotspotTree=function(){
	this.cdm.getHotspotTree({},this.HotspotTree.bind(this));
}
CIIENEW.Screen.prototype.HotspotTree=function(result){
	var baseList=result.children;
	var hotspots=['J-国家会展中心','J-重要场所','J-交通枢纽','J-酒店'];
	var hotMap={};
	for(i=0;i<baseList.length;i++){
		var record=baseList[i];
		hotMap[record.id]=record.children;
	}
	for(i=0;i<hotspots.length;i++){
		var mainhotid=hotspots[i];
		var mainhotname=mainhotid.replace('J-','');
		var list=hotMap[mainhotid];
		for(var t=0;t<list.length;t++){
			Situation.HotspotTree[list[t].id]={name:list[t].id};
		}
	}
	Situation.HotspotTree_Boll=true;
};
CIIENEW.Screen.prototype.updateCompany=function(result){
	Situation.original={};
	Situation.original.bool=[];
	Situation.InternetPerception={};
	Situation.InternetPerception.data={};
	Situation.original.InternetPerception={};
	Situation.InternetPerception.slidePosition=1;
	Situation.InternetPerception.Roll_bool=false;
	Situation.InternetPerception.data.length=2;
	Situation.InternetPerception.time=20000;
	Situation.InternetPerception.name=["","","",""];
	Situation.InternetPerception.Attribute={
			s_083:{id:'s_083',text:'流量',text_auxiliary:'总流量',company:"(GB)",company_auxiliary:"GB",company_auxiliary_original:"(GB)",company_auxiliary_original_auxiliary:"(MB)",company_auxiliary_original_Postpone:"MB",source : "信令",Tparticle : 5},
			s_091:{id:'s_091',text:'总用户数',text_auxiliary:'总用户数',company:"(万人)",company_auxiliary:"万人",company_auxiliary_original:"(万人)",company_auxiliary_original_auxiliary:"(人)",company_auxiliary_original_Postpone:"人",source : "信令",Tparticle : 5},
			s_227:{id:'s_227',text:'HTTP下行速率',text_auxiliary:'HTTP下行速率500k',company:"(Mbps)",company_auxiliary:"Mbps",company_auxiliary_original:"(Mbps)",company_auxiliary_original_auxiliary:"(Mbps)",company_auxiliary_original_Postpone:"Mbps",source : "信令",Tparticle : 5},
			s_244:{id:'s_244',text:'HTTP上行速率',text_auxiliary:'HTTP上行速率500k',company:"(Kbps)",company_auxiliary:"Kbps",company_auxiliary_original:"(Kbps)",company_auxiliary_original_auxiliary:"(Kbps)",company_auxiliary_original_Postpone:"Kbps",source : "信令",Tparticle : 5},
			s_139:{id:'s_139',text:'HTTP响应时延',text_auxiliary:'HTTP响应时延',company:"(ms)",company_auxiliary:"ms",company_auxiliary_original:"(ms)",company_auxiliary_original_auxiliary:"(ms)",company_auxiliary_original_Postpone:"ms",source : "信令",Tparticle : 5},
			http_resp_succ_rate:{id:'http_resp_succ_rate',text:'HTTP响应成功率',company:"(%)",text_auxiliary:'HTTP响应成功率',company_auxiliary:"%",company_auxiliary_original:"(%)",company_auxiliary_original_auxiliary:"(%)",company_auxiliary_original_Postpone:"%",source : "信令",Tparticle : 5}};
	if(!jQuery.isEmptyObject(result)){
		if(Situation.hotspot!=null){record=result[Situation.hotspot];}
		if(record.s_091>10000){Situation.InternetPerception.Attribute.s_091={id:'s_091',text:'总用户数',text_auxiliary:'总用户数',company:"(万人)",company_auxiliary:"万人",company_auxiliary_original:"(万人)",company_auxiliary_original_auxiliary:"(人)",company_auxiliary_original_Postpone:"人",source : "信令",Tparticle : 5}}
		else{Situation.InternetPerception.Attribute.s_091={id:'s_091',text:'总用户数',text_auxiliary:'总用户数',company:"(人)",company_auxiliary:"人",company_auxiliary_original:"(人)",company_auxiliary_original_auxiliary:"(人)",company_auxiliary_original_Postpone:"人",source : "信令",Tparticle : 5}}
	}
	this.Generate_div();
	this.Perception_div();
	this.updateKpis(result);
	this.cdm.getUserDistAll({hot_name:Situation.hotspot},this.UserDistAll.bind(this));
	this.cdm.getStreamRecord({ids:Situation.hotspot,kpis:"s_083,time"},this.updateTop.bind(this));
	this.cdm.getIntlRoamIn({intl_name:null,hot_name:Situation.hotspot},this.updateGauge.bind(this));
}
CIIENEW.Screen.prototype.Get=function(){
	this.cdm.getHotspotrank({ids:Situation.hotspot,time_bool:null,num:18,sortKey:this.sortKey},this.updateTops.bind(this));
	this.cdm.getHotspotTimerank({hotspot:Situation.hotspot,time_bool:null,num:18,sortKey:this.sortKey,minor:"&minor=浏览下载:腾讯网&minor=浏览下载:今日头条&minor=浏览下载:腾讯新闻&minor=浏览下载:大众点评&minor=视频:爱奇艺视频&minor=视频:腾讯视频&minor=视频:Gif快手&minor=视频:搜狐视频&minor=视频:抖音短视频&minor=购物:淘宝&minor=购物:美团&minor=即时通信:微信&minor=即时通信:QQ&minor=游戏:腾讯游戏&minor=支付:支付宝&minor=应用商店:应用宝&minor=应用商店:AppStore&minor=微博社区:新浪微博"},this.updateTimeTops.bind(this));
	var hotspot=Situation.hotspot;
	var sortKey=this.sortKey;
	var y= setInterval(function() {
		var g=0
		for(var q=0;q<Situation.original.bool.length;q++){
			if(Situation.original.bool[q]==true){
				g++;
			}
		}
		if(g==3){
			window.clearInterval(y);
			CIIENEW.Screen.prototype.cdm.getHotspotTimerank({hotspot:hotspot,num:10,time_bool:null,sortKey:sortKey,minor:"&minor=视频:咪咕视频&minor=音乐:咪咕音乐&minor=应用商店:MM商场&minor=阅读:咪咕阅读&minor=动漫:咪咕动漫&minor=支付:和包&minor=即时通信:飞信&minor=浏览下载:和冲浪&minor=导航:和地图&minor=游戏:咪咕游戏"},CIIENEW.Screen.prototype.updateHaveTops.bind(this));
		}
	 }, 500);
	var l= setInterval(function() {
		var f=0;
		 for(var t=0;t<Situation.original.bool.length;t++){if(Situation.original.bool[t]==true){f++;}}
		 if(f==3){
			window.clearInterval(l);
			$('#Internet_maxs_083_flow').html('<span>'+Situation.original.InternetPerception[Situation.sortKey].value+'</span><br/><span>'+Situation.original.InternetPerception[Situation.sortKey].company+'</span>');
			$('#Internet_maxs_083_flow_auxiliary').html('<span>'+Situation.original.InternetPerception[Situation.sortKey].value+'</span><br/><span>'+Situation.original.InternetPerception[Situation.sortKey].company+'</span>');
			//$('#Internet_mins_083_flow').html('<span>'+Situation.original.InternetPerception[Situation.sortKey].value+'</span><br/><span>'+Situation.original.InternetPerception[Situation.sortKey].company+'</span>');
		  }
	  }, 500);
}
CIIENEW.Screen.prototype.Perception_div=function(){
	var Localclass='InternetPerception';
	var htmlStr = '<div><img id="Website_left" onclick="situation_left_click(' + Localclass + ')" src="' + eastcom.baseURL + '/static/images/overview/L2.png" style="cursor:pointer;z-index: 10; position: relative;right:35px;width: 40px;height:40px"><img id="Website_right" onclick="situation_right_click(' + Localclass + ')" src="' + eastcom.baseURL + '/static/images/overview/R2.png" style="cursor:pointer;z-index: 10; position: relative; width: 40px;height:40px"></div>\
    <div style="width:32px;height:32px;right:41px;top:-36px;float: right; z-index: 10; position: relative;background-color:#294FC7;border-radius: 15px;"><div style="font-size: 20px;z-index: 10; position: relative;right: -8px; top: 2px;"><span  id="InternetPerception_current_page_span" style="margin-left:2px;">' + Situation.InternetPerception.slidePosition + '</span></div></div>';
	document.getElementById("InternetPerception_switch").innerHTML = "";
	document.getElementById("InternetPerception_switch").innerHTML = htmlStr;
	var arr=utils.getJsonName(Situation.InternetPerception.Attribute);
	var k = parseInt(parseInt(arr.length) /3);
    (parseInt(arr.length) % 3 == 0) ? k : k++;
    var q = [];
    var u="";
    var j=0;
    for (var h = 0; h < k; h++) {
        h < parseInt(parseInt(arr.length) / 3) ? q[h] = 3 : q[h] = parseInt(arr.length) % 3;
    }
	for(var c=0;c<k;c++){
	  var Html="";
	  for (var g = 0; g < q[c]; g++) {
		var right=15;
		if(g==2){right=0;}
		Html+='<div class="icon_http" style="float:left;margin-right:'+right+'px;width:310px;height:100px;cursor: pointer;" data-name='+Situation.InternetPerception.Attribute[arr[j]].text_auxiliary+' onclick="CIIENEW.Screen.prototype.Click(this)" onmouseout="mouseout(this)">';
		Html+='<div style="width: 310px;height: 40px;float: left;font-size: 24px;"><span style="position: relative;top: 10px;left: 20px;">'+Situation.InternetPerception.Attribute[arr[j]].text+'</span></div>';
		if(arr[j]=="s_091"){
			Html+='<div style="width: 310px;height: 60px;float: left;font-size: 30px;color: #66E6FF;text-align: center;" id="div_center"><span style="position: relative;top: 10px;" id="'+arr[j]+'_id" onmouseover="_onmouseover(this);" data-length="5">---</span><span style="position: relative;top: 10px;margin-left:5px">'+Situation.InternetPerception.Attribute[arr[j]].company_auxiliary+'</span></div></div>';
		}else{
			Html+='<div style="width: 310px;height: 60px;float: left;font-size: 30px;color: #66E6FF;text-align: center;" id="div_center"><span style="position: relative;top: 10px;" id="'+arr[j]+'_id" onmouseover="hlwywgz_onmouseover(this);" data-id="'+arr[j]+'" data-length='+(g+1)+'>---</span><span style="position: relative;top: 10px;margin-left:5px">'+Situation.InternetPerception.Attribute[arr[j]].company_auxiliary+'</span></div></div>';
		}
		j++;
	  }
	  u += '<li class="carousel-item">' + Html + '</li>';
	}
	var htmlStrNew = '<ul class="carousel-inner" id="InternetPerception_ul" style="height:100px">' + u + '</ul>'
	document.getElementById("InternetPerception").innerHTML = htmlStrNew;
    $("#InternetPerception").FtCarousel({index: 0,auto: false});
    var s=$("#InternetPerception_ul li").length;
    for(var q=0;q<$($("#InternetPerception_ul li")[0]).context.childNodes.length;q++){
    	$($($($($("#InternetPerception_ul li")[0]).context.childNodes[q]).context.childNodes[1]).context.childNodes[0]).attr("id",$($($($("#InternetPerception_ul li")[0]).context.childNodes[q]).context.childNodes[1]).context.childNodes[0].id+"_auxiliary");
    }
    for(var h=0;h<$($("#InternetPerception_ul li")[s-1]).context.childNodes.length;h++){
    	$($($($($("#InternetPerception_ul li")[s-1]).context.childNodes[h]).context.childNodes[1]).context.childNodes[0]).attr("id",$($($($("#InternetPerception_ul li")[s-1]).context.childNodes[h]).context.childNodes[1]).context.childNodes[0].id+"_auxiliary");
    }
    var k= setInterval(function() {
      var f=0;
	  for(var t=0;t<Situation.original.bool.length;t++){if(Situation.original.bool[t]==true){f++;}}
	  if(f==3){
		window.clearInterval(k);
		$('#Internet_maxs_083_flow').html('<span>'+Situation.original.InternetPerception[Situation.sortKey].value+'</span><br/><span>'+Situation.original.InternetPerception[Situation.sortKey].company+'</span>');
		//$('#Internet_mins_083_flow').html('<span>'+Situation.original.InternetPerception[Situation.sortKey].value+'</span><br/><span>'+Situation.original.InternetPerception[Situation.sortKey].company+'</span>');
	  }
	}, 500);
}
CIIENEW.Screen.prototype.Generate_div=function(){
	$("#Internet").css("display","block");
	$("#Internet_switch").css("display","block");
	$("#InternetNew").css("display","none");
	$("#Internet_return").css("display","none");
	Situation.Internet={};
	Situation.Internet.data={};
	Situation.Internet.slidePosition=1;
	Situation.Internet.Roll_bool=false;
	Situation.Internet.data.length=3;
	Situation.Internet.time=20000;
	Situation.Internet.name=["","","",""];
	var u="";
	Situation.Internet.id=["Internet_max","Internet_min","Internet_Have"];
	var id=Situation.Internet.id;
	for(var c=0;c<3;c++){
		var html="";
		var htmlStr="";
		var htmlStrNew="";
		var click="";
		var cursor="";
		if(c<2){
			if(c<1){click="CIIENEW.Screen.prototype.MinClick(this)";cursor="pointer"}
			for(var s=0;s<9;s++){
				htmlStr+='<div style="background-color: rgba(0, 102, 255,0);position:relative;width:240px;height:50px;top:'+(s*14.5-1)+'px;cursor:'+cursor+'"  onclick='+click+'>';
				htmlStr+='<div style="width: 240px;height: 50px;float: left;font-size: 26px;color: #66E6FF;" ><span style="position: relative;top: 5px;float: left;margin-left:10px" id="'+id[c]+s+'" data-name="">---</span><span style="position: relative;top: 8px;float: right;font-size: 22px;margin-right:10px" id="'+id[c]+s+'_name" title="'+s+'_title">---</span></div>';
				htmlStr+='</div>';
			}
			for(var s=0;s<9;s++){
				html+='<div style="background-color: rgba(0, 102, 255,0);position:relative;width:240px;height:50px;top:'+(s*14.5-1)+'px;cursor:'+cursor+'"  onclick='+click+' data-name="'+id[c]+(9+s)+'_name1">';
				html+='<div style="width: 240px;height: 50px;float: left;font-size: 26px;color: #66E6FF;" ><span style="position: relative;top: 5px;float: right;margin-right:10px" id="'+id[c]+(9+s)+'">---</span><span style="position: relative;top: 8px;float: left;font-size: 22px;margin-left:10px" id="'+id[c]+(9+s)+'_name" title="'+s+'_title">---</span></div>';
				html+='</div>';
			}
			htmlStrNew+='<div class="icon_Internet_bg"><div style="width:240px;height:566px;float:left" >'+htmlStr+'</div>';
			htmlStrNew+='<div style="width:240px;height:566px;float:right">'+html+'</div>';
			htmlStrNew+='<div style="position:absolute;width:160px;height:160px;margin-left: 400px;margin-top: 220px;">';
			htmlStrNew+='<div style="width: 160px;height: 160px;float: left;font-size: 26px;color: #66E6FF;" ><div  class="span_center" style="width:160px;font-size: 30px;" id="'+id[c]+'s_083_flow"></div></div></div></div>';
			u += '<li class="carousel-item" style="width: 100%;">' + htmlStrNew + '</li>';
		}else{
			for(var s=0;s<5;s++){
				htmlStr+='<div style="background-color: rgba(0, 102, 255,0);position:relative;width:240px;height:80px;top:'+(s*41.5)+'px">';
				htmlStr+='<div style="width: 240px;height: 80px;float: left;font-size:24px;color: #66E6FF;" ><span style="position: relative;top: 15px;float: left;margin-left:10px" id="'+id[c]+s+'">---</span><span style="position: relative;top: 18px;float: right;font-size: 22px;margin-right:10px" id="'+id[c]+s+'_name" title="'+s+'_title">---</span></div>';
				htmlStr+='</div>';
			}
			for(var s=0;s<5;s++){
				html+='<div style="background-color: rgba(0, 102, 255,0);position:relative;width:240px;height:80px;top:'+(s*41.5)+'px">';
				html+='<div style="width: 240px;height: 80px;float: left;font-size: 24px;color: #66E6FF;" ><span style="position: relative;top: 15px;float: right;margin-right:10px" id="'+id[c]+(5+s)+'">---</span><span style="position: relative;top: 18px;float: left;font-size: 22px;margin-left:10px" id="'+id[c]+(5+s)+'_name" title="'+s+'_title">---</span></div>';
				html+='</div>';
			}
			htmlStrNew+='<div class="icon_Internet_bg_1"><div style="width:240px;height:566px;float:left">'+htmlStr+'</div>';
			htmlStrNew+='<div style="width:240px;height:566px;float:right">'+html+'</div>';
			htmlStrNew+='<div style="position:absolute;width:160px;height:160px;margin-left: 400px;margin-top: 220px;">';
			htmlStrNew+='<div style="width: 160px;height: 160px;float: left;font-size: 30px;color: #66E6FF;" ><div  class="span_center" style="width:160px;font-size: 30px;" id="'+id[c]+'_s_083_flow"></div></div></div></div>';
			u += '<li class="carousel-item">' + htmlStrNew + '</li>';
		}
	}
	var Localclass='Internet';
	var htmlStr = '<div><img id="Website_left" onclick="situation_left_click(' + Localclass + ')" src="' + eastcom.baseURL + '/static/images/overview/L2.png" style="cursor:pointer;z-index: 10; position: relative;right:35px;width: 40px;height:40px"><img id="Website_right" onclick="situation_right_click(' + Localclass + ')" src="' + eastcom.baseURL + '/static/images/overview/R2.png" style="cursor:pointer;z-index: 10; position: relative; width: 40px;height:40px"></div>\
    <div style="width:32px;height:32px;right:41px;top:-36px;float: right; z-index: 10; position: relative;background-color:#294FC7;border-radius: 15px;"><div style="font-size: 20px;z-index: 10; position: relative;right: -8px; top: 2px;"><span  id="Internet_current_page_span" style="margin-left:2px;">' + Situation.Internet.slidePosition + '</span></div></div>';
	document.getElementById("Internet_switch").innerHTML = "";
	document.getElementById("Internet_switch").innerHTML = htmlStr;
	document.getElementById("Internet").innerHTML = '<ul class="carousel-inner" id="Internet_ul" style="height:566px">' + u + '</ul>';
	$("#Internet").FtCarousel({index: 0,auto: false});
	var s=$("#Internet_ul li").length;
	//左边
	 for(var q=0;q<$($($($("#Internet_ul li")[0]).context.childNodes[0]).context.childNodes[0]).context.childNodes.length;q++){
	    $($($($($($($("#Internet_ul li")[0]).context.childNodes[0]).context.childNodes[0]).context.childNodes[q]).context.childNodes[0]).context.childNodes[0]).attr("id",$($($($($($("#Internet_ul li")[0]).context.childNodes[0]).context.childNodes[0]).context.childNodes[q]).context.childNodes[0]).context.childNodes[0].id+"_auxiliary");
	    $($($($($($($("#Internet_ul li")[0]).context.childNodes[0]).context.childNodes[0]).context.childNodes[q]).context.childNodes[0]).context.childNodes[1]).attr("id",$($($($($($("#Internet_ul li")[0]).context.childNodes[0]).context.childNodes[0]).context.childNodes[q]).context.childNodes[0]).context.childNodes[1].id+"_auxiliary");
    }
	for(var h=0;h<$($($($("#Internet_ul li")[s-1]).context.childNodes[0]).context.childNodes[0]).context.childNodes.length;h++){
	    $($($($($($($("#Internet_ul li")[s-1]).context.childNodes[0]).context.childNodes[0]).context.childNodes[h]).context.childNodes[0]).context.childNodes[0]).attr("id",$($($($($($("#Internet_ul li")[s-1]).context.childNodes[0]).context.childNodes[0]).context.childNodes[h]).context.childNodes[0]).context.childNodes[0].id+"_auxiliary");
	    $($($($($($($("#Internet_ul li")[s-1]).context.childNodes[0]).context.childNodes[0]).context.childNodes[h]).context.childNodes[0]).context.childNodes[1]).attr("id",$($($($($($("#Internet_ul li")[s-1]).context.childNodes[0]).context.childNodes[0]).context.childNodes[h]).context.childNodes[0]).context.childNodes[1].id+"_auxiliary");
    }
    //右边
	 for(var q=0;q<$($($($("#Internet_ul li")[0]).context.childNodes[0]).context.childNodes[1]).context.childNodes.length;q++){
	    $($($($($($($("#Internet_ul li")[0]).context.childNodes[0]).context.childNodes[1]).context.childNodes[q]).context.childNodes[0]).context.childNodes[0]).attr("id",$($($($($($("#Internet_ul li")[0]).context.childNodes[0]).context.childNodes[1]).context.childNodes[q]).context.childNodes[0]).context.childNodes[0].id+"_auxiliary");
	    $($($($($($($("#Internet_ul li")[0]).context.childNodes[0]).context.childNodes[1]).context.childNodes[q]).context.childNodes[0]).context.childNodes[1]).attr("id",$($($($($($("#Internet_ul li")[0]).context.childNodes[0]).context.childNodes[1]).context.childNodes[q]).context.childNodes[0]).context.childNodes[1].id+"_auxiliary");
    }
    for(var h=0;h<$($($($("#Internet_ul li")[s-1]).context.childNodes[0]).context.childNodes[1]).context.childNodes.length;h++){
    	$($($($($($($("#Internet_ul li")[s-1]).context.childNodes[0]).context.childNodes[1]).context.childNodes[h]).context.childNodes[0]).context.childNodes[0]).attr("id",$($($($($($("#Internet_ul li")[s-1]).context.childNodes[0]).context.childNodes[1]).context.childNodes[h]).context.childNodes[0]).context.childNodes[0].id+"_auxiliary");
    	$($($($($($($("#Internet_ul li")[s-1]).context.childNodes[0]).context.childNodes[1]).context.childNodes[h]).context.childNodes[0]).context.childNodes[1]).attr("id",$($($($($($("#Internet_ul li")[s-1]).context.childNodes[0]).context.childNodes[1]).context.childNodes[h]).context.childNodes[0]).context.childNodes[1].id+"_auxiliary");
    }
    $($($($($($("#Internet_ul li")[0]).context.childNodes[0]).context.childNodes[2]).context.childNodes[0]).context.childNodes[0]).attr("id",$($($($($("#Internet_ul li")[0]).context.childNodes[0]).context.childNodes[2]).context.childNodes[0]).context.childNodes[0].id+"_auxiliary");
    $($($($($($("#Internet_ul li")[s-1]).context.childNodes[0]).context.childNodes[2]).context.childNodes[0]).context.childNodes[0]).attr("id",$($($($($("#Internet_ul li")[s-1]).context.childNodes[0]).context.childNodes[2]).context.childNodes[0]).context.childNodes[0].id+"_auxiliary");
    this.Get();
}
CIIENEW.Screen.prototype.updateMinTimeTops=function(){
	$("#Internet").css("display","none");
	$("#Internet_switch").css("display","none");
	$("#InternetNew").css("display","block");
	$("#Internet_return").css("display","block");
	var html="";var htmlStr="";var htmlStrNew="";
	for(var s=0;s<9;s++){
		htmlStr+='<div style="background-color: rgba(0, 102, 255,0);position:relative;width:240px;height:50px;top:'+(s*14.5-1)+'px">';
		htmlStr+='<div style="width: 240px;height: 50px;float: left;font-size: 24px;color: #66E6FF;" ><span style="position: relative;top: 5px;float: left;margin-left:10px" id="Min_'+s+'">---</span><span style="position: relative;top: 8px;float: right;font-size: 24px;margin-right: 10px;" id="Min_'+s+'_name" title="'+s+'_title">---</span></div>';
		htmlStr+='</div>';
	}
	for(var s=0;s<9;s++){
		html+='<div style="background-color: rgba(0, 102, 255,0);position:relative;width:240px;height:50px;top:'+(s*14.5-1)+'px">';
		html+='<div style="width: 240px;height: 50px;float: left;font-size: 24px;color: #66E6FF;" ><span style="position: relative;top: 8px;float: right;margin-right:10px" id="Min_'+(9+s)+'">---</span><span style="position: relative;top: 8px;float: left;font-size: 24px;margin-left: 10px;" id="Min_'+(9+s)+'_name" title="'+s+'_title">---</span></div>';
		html+='</div>';
	}
	htmlStrNew+='<div class="icon_Internet_bg"><div style="width:240px;height:566px;float:left" >'+htmlStr+'</div>';
	htmlStrNew+='<div style="width:240px;height:566px;float:right">'+html+'</div>';
	htmlStrNew+='<div style="position:absolute;width:160px;height:160px;margin-left: 400px;margin-top: 220px;">';
	htmlStrNew+='<div style="width: 160px;height: 160px;float: left;font-size: 24px;color: #66E6FF;" ><div  class="span_center" style="width:160px"><span id="s_083_flow">---</span><br/><span id="s_083_flow2">---</span></div></div></div></div>';
	document.getElementById("InternetNew").innerHTML = htmlStrNew;
	$('#Internet_return').on('click', this.Internet_return.bind(this));
}
CIIENEW.Screen.prototype.Internet_return=function(result){
	$("#Internet").css("display","block");
	$("#Internet_switch").css("display","block");
	$("#InternetNew").css("display","none");
	$("#Internet_return").css("display","none");
}
CIIENEW.Screen.prototype.updateTop=function(result){
	if(!jQuery.isEmptyObject(result)){
		var record=result;
		if(Situation.hotspot!=null){
			record=result[Situation.hotspot];
		}
		$('#s_083_id').text(pmars.conversion(Situation.InternetPerception.Attribute.s_083.company_auxiliary_original,record.s_083));
		$('#s_083_id_auxiliary').text(pmars.conversion(Situation.InternetPerception.Attribute.s_083.company_auxiliary_original,record.s_083));
		Situation.original.InternetPerception.s_083={id:"s_083",value:pmars.conversion(Situation.InternetPerception.Attribute.s_083.company_auxiliary_original,record.s_083),company:Situation.InternetPerception.Attribute.s_083.company_auxiliary,company_auxiliary:Situation.InternetPerception.Attribute.s_083.company_auxiliary_original_Postpone,time:record.time};
	}
	Situation.original.bool[0]=true;
}
CIIENEW.Screen.prototype.updateTops=function(result){
	if(!jQuery.isEmptyObject(result)){
		var record=result;
		var g=1;
		for(var q=0;q<record.length;q++){
			if(Situation.sortKey=="http_resp_succ_rate"){
				g=100;
			}
			$('#'+Situation.Internet.id[0]+q).text(pmars.conversion(Situation.InternetPerception.Attribute[Situation.sortKey].company_auxiliary_original,record[q][Situation.InternetPerception.Attribute[Situation.sortKey].text_auxiliary]*g));
			$('#'+Situation.Internet.id[0]+q+"_name").text(utils.showOutLength(record[q].element,11));
			$('#'+Situation.Internet.id[0]+q+"_name").attr("title",record[q].element);
			$('#'+Situation.Internet.id[0]+q).data("name",Situation.InternetPerception.Attribute[Situation.sortKey].company_auxiliary);
			$('#'+Situation.Internet.id[0]+q+"_auxiliary").text(pmars.conversion(Situation.InternetPerception.Attribute[Situation.sortKey].company_auxiliary_original,record[q][Situation.InternetPerception.Attribute[Situation.sortKey].text_auxiliary]*g));
			$('#'+Situation.Internet.id[0]+q+"_name_auxiliary").text(utils.showOutLength(record[q].element,11));
			$('#'+Situation.Internet.id[0]+q+"_name_auxiliary").attr("title",record[q].element);
			$('#'+Situation.Internet.id[0]+q+"_auxiliary").data("name",Situation.InternetPerception.Attribute[Situation.sortKey].company_auxiliary);
		}
	}
}
CIIENEW.Screen.prototype.updateTimeTops=function(result){
	if(!jQuery.isEmptyObject(result)){
		var record=result;
		var g=1;
		var t=0;
		for(var q=0;q<record.length;q++){
			if(Situation.sortKey=="http_resp_succ_rate"){
				g=100;
			}
			$('#'+Situation.Internet.id[1]+q).text(pmars.conversion(Situation.InternetPerception.Attribute[Situation.sortKey].company_auxiliary_original,record[q][Situation.InternetPerception.Attribute[Situation.sortKey].text_auxiliary]*g));
			$('#'+Situation.Internet.id[1]+q+"_name").text(utils.showOutLength(record[q].element,11));
			$('#'+Situation.Internet.id[1]+q+"_name").attr("title",record[q].element);

			$('#'+Situation.Internet.id[1]+q+"_auxiliary").text(pmars.conversion(Situation.InternetPerception.Attribute[Situation.sortKey].company_auxiliary_original,record[q][Situation.InternetPerception.Attribute[Situation.sortKey].text_auxiliary]*g));
			$('#'+Situation.Internet.id[1]+q+"_name_auxiliary").text(utils.showOutLength(record[q].element,11));
			$('#'+Situation.Internet.id[1]+q+"_name_auxiliary").attr("title",record[q].element);
		
			t+=record[q][Situation.InternetPerception.Attribute[Situation.sortKey].text_auxiliary]*g;
		}
		if(Situation.InternetPerception.Attribute[Situation.sortKey].company_auxiliary_original=="(GB)"||Situation.InternetPerception.Attribute[Situation.sortKey].company_auxiliary_original=="(万人)"||Situation.InternetPerception.Attribute[Situation.sortKey].company_auxiliary_original=="(人)"){
			t=t;
		}else{
			t=t/record.length;
		}
		$('#Internet_mins_083_flow').html('<span>'+pmars.conversion(Situation.InternetPerception.Attribute[Situation.sortKey].company_auxiliary_original,t)+'</span><br/><span>'+Situation.original.InternetPerception[Situation.sortKey].company+'</span>');
	}
}
CIIENEW.Screen.prototype.updateHaveTops=function(result){
	if(!jQuery.isEmptyObject(result)){
		var record=result;
		var t=0;
		var g=1;
		for(var q=0;q<record.length;q++){
			if(Situation.sortKey=="http_resp_succ_rate"){
				g=100;
			}
			$('#'+Situation.Internet.id[2]+q).text(pmars.conversion(Situation.InternetPerception.Attribute[Situation.sortKey].company_auxiliary_original_auxiliary,record[q][Situation.InternetPerception.Attribute[Situation.sortKey].text_auxiliary]*g));
			$('#'+Situation.Internet.id[2]+q+"_name").text(utils.showOutLength(record[q].element,11));
			$('#'+Situation.Internet.id[2]+q+"_name").attr("title",record[q].element);
			$('#'+Situation.Internet.id[2]+q+"_auxiliary").text(pmars.conversion(Situation.InternetPerception.Attribute[Situation.sortKey].company_auxiliary_original_auxiliary,record[q][Situation.InternetPerception.Attribute[Situation.sortKey].text_auxiliary]*g));
			$('#'+Situation.Internet.id[2]+q+"_name_auxiliary").text(utils.showOutLength(record[q].element,11));
			$('#'+Situation.Internet.id[2]+q+"_name_auxiliary").attr("title",record[q].element);
			t+=record[q][Situation.InternetPerception.Attribute[Situation.sortKey].text_auxiliary]*g;
		}
		if(Situation.original.InternetPerception[Situation.sortKey].company_auxiliary=="MB"||Situation.original.InternetPerception[Situation.sortKey].company_auxiliary=="GB"||Situation.original.InternetPerception[Situation.sortKey].company_auxiliary=="万人"||Situation.original.InternetPerception[Situation.sortKey].company_auxiliary=="人"){
			t=t;
		}else{
			t=t/record.length;
		}
		$('#Internet_Have_s_083_flow').html('<span>'+pmars.conversion(Situation.InternetPerception.Attribute[Situation.sortKey].company_auxiliary_original_auxiliary,t)+'</span><br/><span>'+Situation.original.InternetPerception[Situation.sortKey].company_auxiliary+'</span>');
		$('#Internet_Have_s_083_flow_auxiliary').html('<span>'+pmars.conversion(Situation.InternetPerception.Attribute[Situation.sortKey].company_auxiliary_original_auxiliary,t)+'</span><br/><span>'+Situation.original.InternetPerception[Situation.sortKey].company_auxiliary+'</span>');
	}
}
CIIENEW.Screen.prototype.updateKpis=function(result){
	if(!jQuery.isEmptyObject(result)){
		if(Situation.hotspot!=null){
			record=result[Situation.hotspot];
		}
		var id=["s_227","s_139","s_244","s_091"];
		var arr={};
		for(var t=0;t<id.length;t++){
			$('#'+id[t]+"_id").text(pmars.conversion(Situation.InternetPerception.Attribute[id[t]].company_auxiliary_original,record[id[t]]));
			$('#'+id[t]+"_id_auxiliary").text(pmars.conversion(Situation.InternetPerception.Attribute[id[t]].company_auxiliary_original,record[id[t]]));
			Situation.original.InternetPerception[id[t]]={id:id[t],value:pmars.conversion(Situation.InternetPerception.Attribute[id[t]].company_auxiliary_original,record[id[t]]),company:Situation.InternetPerception.Attribute[id[t]].company_auxiliary,company_auxiliary:Situation.InternetPerception.Attribute[id[t]].company_auxiliary_original_Postpone,time:record.time};
		}
		Situation.s_091=record;
		var record=record.s_091;
		Situation.s_091_bool=true;
		var json=pmars.PeopleConversion(record);
		if(json.length=true){$('#s_091_div2').css("width","50");}
		else{$('#s_091_div2').css("width","40");}
		$('#s_091').text(json.value);
		$('#s_091_company').text(json.company);
	}
	Situation.original.bool[1]=true;
}
CIIENEW.Screen.prototype.updateGauge=function(result){
	if(!jQuery.isEmptyObject(result.data)){
		var record=result.data;
		if(!utils.isStringEmpty(Situation.hotspot)&&Situation.hotspot!="上海"){
			record=result.data[Situation.hotspot];
		}
		var id=["http_resp_succ_rate"];
		var arr={};
		for(var d=0;d<id.length;d++){
			$('#'+id[d]+"_id").text(pmars.conversion(Situation.InternetPerception.Attribute[id[d]].company_auxiliary_original,record[id[d]]));
			$('#'+id[d]+"_id_auxiliary").text(pmars.conversion(Situation.InternetPerception.Attribute[id[d]].company_auxiliary_original,record[id[d]]));
			Situation.original.InternetPerception[id[d]]={id:id[d],value:pmars.conversion(Situation.InternetPerception.Attribute[id[d]].company_auxiliary_original,record[id[d]]),company:Situation.InternetPerception.Attribute[id[d]].company_auxiliary,company_auxiliary:Situation.InternetPerception.Attribute[id[d]].company_auxiliary_original_Postpone,time:record.time};
		}
	}
	Situation.original.bool[2]=true;
}
CIIENEW.Screen.prototype.updateMinTimeTop=function(result){
	if(!jQuery.isEmptyObject(result)){
		var record=result;
		for(var q=0;q<record.length;q++){
			$('#Min_'+q).text(utils.changeTwoDecimal(pmars.conversion(Situation.InternetPerception.Attribute[Situation.sortKey].company_auxiliary_original,record[q][Situation.InternetPerception.Attribute[Situation.sortKey].text_auxiliary])));
			$('#Min_'+q+"_name").text(utils.showOutLength(record[q].element,11));
			$('#Min_'+q+"_name").attr("title",record[q].element);
		}
	}
}
CIIENEW.Screen.prototype.UserDistAll=function(result){
	   var HotspotTree_Boll = setInterval(function() {
		   if(Situation.HotspotTree_Boll==true&&Situation.s_091_bool==true){
			   Situation.s_091_bool=false;
			   window.clearInterval(HotspotTree_Boll);
				if(!jQuery.isEmptyObject(result.data)){
					if(!utils.isStringEmpty(Situation.HotspotTree[Situation.hotspot])){
						if((result.data.pro.user_cnt+result.data.intl.user_cnt)>Situation.s_091.s_091){Situation.Coefficient=0.5}
						else{Situation.Coefficient=1}
					}else{Situation.Coefficient=1}
					var record1=result.data.intl;
					var json1=pmars.PeopleConversion(Math.ceil(record1.user_cnt*Situation.Coefficient));
					if(json1.length=true){$('#intlroamin_div2').css("width","50");}
					else{$('#intlroamin_div2').css("width","30");}
					$('#intlroamin').text(json1.value);
					$('#intlroamin_company').text(json1.company);
					var record2=result.data.pro;
					var json2=pmars.PeopleConversion(Math.ceil(record2.user_cnt*Situation.Coefficient));
					if(json2.length=true){$('#provroamin_div2').css("width","50");}
					else{$('#provroamin_div2').css("width","30");}
					$('#provroamin').text(json2.value);
					$('#provroamin_company').text(json2.company);
					var record3=Math.ceil((result.data.pro.user_cnt+result.data.intl.user_cnt)*Situation.Coefficient);
					var json3=pmars.PeopleConversion(record3);
					if(json3.length=true){$('#mr_div2').css("width","50");}
					else{$('#mr_div2').css("width","30");}
					$('#mr').text(json3.value);
					$('#mr_company').text(json3.company);
					Situation.UserDistAll=result.data;
				}
		   }
       }, 100);
}
function  _onmouseover(obgect){
	 var attribute = eval("(" + Popoverposition.ciienew_g_left_yhs() + ")")[$(obgect).data("length")];
	 var id='pro';
	 var g2_uc="";var g4_uc="";var fdd_uc="";var time1="";var source="";
	 obgect.id=obgect.id.replace("_id","");
	 if(!utils.isStringEmpty(Situation.HotspotTree[Situation.hotspot])){
			if((Situation.UserDistAll.pro.user_cnt+Situation.UserDistAll.intl.user_cnt)>Situation.s_091.s_091){Situation.Coefficient=0.5}
			else{Situation.Coefficient=1}
		}else{Situation.Coefficient=1}
	 if(obgect.id=="s_091"){
		g2_uc=Situation.s_091.s_019;
		fdd_uc=Situation.s_091.s_263;
		g4_uc=Situation.s_091.s_091-Situation.s_091.s_019-Situation.s_091.s_263;
		source="信令";time1= pmars.getNowstrhourOfgetMinutes(Situation.s_091.time, 5* -1, "-", ":").substring(11, 16);
		time2=Situation.s_091.time.substring(11, 16);
	}else if(obgect.id=="intlroamin"){
		g2_uc=Math.ceil(Situation.UserDistAll.intl.g2_uc*Situation.Coefficient);
		fdd_uc=Math.ceil(Situation.UserDistAll.intl.fdd_uc*Situation.Coefficient);
		source="信令";time1=pmars.getNowstrhourOfgetMinutes(Situation.UserDistAll.intl.time, 60* -1, "-", ":").substring(11, 16);
		time2=Situation.UserDistAll.intl.time.substring(11, 16);
		g4_uc=Math.ceil((Situation.UserDistAll.intl.user_cnt)*Situation.Coefficient-g2_uc-fdd_uc);
	}else if(obgect.id=="provroamin"){
		g2_uc=Math.ceil(Situation.UserDistAll.pro.g2_uc*Situation.Coefficient);
		fdd_uc=Math.ceil(Situation.UserDistAll.pro.fdd_uc*Situation.Coefficient);
		source="信令";time1=pmars.getNowstrhourOfgetMinutes(Situation.UserDistAll.pro.time, 60* -1, "-", ":").substring(11, 16);
		time2=Situation.UserDistAll.pro.time.substring(11, 16);
		g4_uc=Math.ceil((Situation.UserDistAll.pro.user_cnt)*Situation.Coefficient-g2_uc-fdd_uc);
	}else if(obgect.id=="mr"){
		g2_uc=Math.ceil((Situation.UserDistAll.pro.g2_uc+Situation.UserDistAll.intl.g2_uc)*Situation.Coefficient);
		fdd_uc=Math.ceil((Situation.UserDistAll.pro.fdd_uc+Situation.UserDistAll.intl.fdd_uc)*Situation.Coefficient);
		g4_uc=Math.ceil(((Situation.UserDistAll.intl.user_cnt+Situation.UserDistAll.pro.user_cnt)-(Situation.UserDistAll.pro.g2_uc+Situation.UserDistAll.intl.g2_uc)-(Situation.UserDistAll.pro.fdd_uc+Situation.UserDistAll.intl.fdd_uc))*Situation.Coefficient);
		source="信令";time1=pmars.getNowstrhourOfgetMinutes(Situation.UserDistAll.pro.time, 60* -1, "-", ":").substring(11, 16);
		time2=Situation.UserDistAll.pro.time.substring(11, 16);
	}
	if(g2_uc>10000){g2_uc=pmars.conversion("(万人)",g2_uc)+"万人";}
	else{g2_uc=utils.Thousand(g2_uc)+"人";}
	if(g4_uc>10000){g4_uc=pmars.conversion("(万人)",g4_uc)+"万人";}
	else{g4_uc=utils.Thousand(g4_uc)+"人";}
	if(fdd_uc>10000){fdd_uc=pmars.conversion("(万人)",fdd_uc)+"万人";}
	else{fdd_uc=utils.Thousand(fdd_uc)+"人";}
	
	var html = '<div style="width:320px;height:240px !important;z-index:20;position: absolute;top:' + attribute.top1 + 'px;left:' + attribute.Left1 + 'px" class="' + attribute.rotate + '">';
    html += '<img src="' + eastcom.baseURL  + '/static/images/overview/popover5.png" style="width:100%;height:100%">';
    html += '<div style="position: absolute;top:' + attribute.top + 'px;font-size: 23px;left: ' + attribute.padding_left + 'px;    width: 260px;" class=' + attribute.rotate_span + '>';
    html += '<div style="margin-top: '+attribute.top+'px;"><div ><span>时&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;间:</span><span style="color:#66E6FF;margin-left:10px"">' + time1 + '~' + time2 + '</span></div></div>';
    html += '<div style="margin-top: '+attribute.top+'px;"><div ><span>数据来源:</span><span style="color:#66E6FF;margin-left: 10px;">' + source + '</span></div></div>';
    html += '<div style="margin-top: '+attribute.top+'px;"><div ><span>2G用户数:</span><span style="color:#66E6FF;margin-left: 10px;">' + g2_uc+ '</span></div></div>';
    html += '<div style="margin-top: '+attribute.top+'px;"><div ><span>4G用户数:</span><span style="color:#66E6FF;margin-left: 10px;">' + g4_uc+ '</span></div></div>';
    html += '<div style="margin-top: '+attribute.top+'px;"><div ><span>4G+用户数:</span><span style="color:#66E6FF;margin-left: 10px;">' + fdd_uc+ '</span></div></div>';
    html += '</div></div>';
    document.getElementById("popover").innerHTML = html;
}
function mouseout(){
	$("#popover").empty();
}
function  hlwywgz_onmouseover(obgect){
	var attribute = eval("(" + Popoverposition.hlwywgz() + ")")[$(obgect).data("length")];
	Popover2.popover(Situation.original.InternetPerception[$(obgect).data("id")],attribute,Situation.InternetPerception.Attribute);
}