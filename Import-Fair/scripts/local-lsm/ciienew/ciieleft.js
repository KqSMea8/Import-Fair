var CIIENEW=CIIENEW||{};
CIIENEW.Screen=function ()
{
	this.initialize.apply(this,arguments);
};
CIIENEW.Screen.prototype.constructor=CIIENEW.Screen;
CIIENEW.Screen.prototype.hotspot='进口博览会';
CIIENEW.Screen.prototype.dm=null;
CIIENEW.Screen.prototype.cdm=null;
CIIENEW.Screen.prototype.hotspotList=[];
CIIENEW.Screen.prototype.startIndex=0;
CIIENEW.Screen.prototype.selectedHot=null;
CIIENEW.Screen.prototype.kpiCache={};
CIIENEW.Screen.prototype.result={};
CIIENEW.Screen.prototype.mainHotMap={};
CIIENEW.Screen.prototype.scrollLock=false;
CIIENEW.Screen.prototype.intervalKey0=0;
CIIENEW.Screen.prototype.intervalKey1=0;
CIIENEW.Screen.prototype.imgMap={
//		国家会展中心
	"J-WH馆":"J-WH2.png",
	"J-1号馆":"J-1H.png",
	"J-2号馆":"J-2H.png",
	"J-3号馆":"J-3H.png",
	"J-4.1号馆":"J-4H.png",
	"J-4.2号馆":"J-4H.png",
	"J-5.1号馆":"J-5H.png",
	"J-5.2号馆":"J-5H.png",
	"J-6.1号馆":"J-6H.png",
	"J-6.2号馆":"J-6H.png",
	"J-7.1号馆":"J-7H.png",
	"J-7.2号馆":"J-7H.png",
	"J-8.1号馆":"J-8H.png",
	"J-8.2号馆":"J-8H.png",
	"J-A0办公楼":"J-A0B.png",
	"J-B0办公楼":"J-B0B.png",
	"J-C0办公楼":"J-C0B.png",
	"J-D0洲际酒店":"J-D0H.png",
	"J-新闻中心":"J-NEWSCENTER.png",
	"J-东厅":"J-EH.png",
	"J-北厅":"J-NH.png",
	"J-西厅":"J-WH.png",
	"J-会展大道北":"J-NR.png",
	"J-会展大道东":"J-ER.png",
	"J-会展大道南":"J-SR.png",
	"J-会展大道西":"J-WR.png",
	"J-入口广场":"J-ENTER.png",
	"J-商业区":"J-BUS.png",
	"J-周边外围":"J-SUR.png",
	"J-重要场所":"J-TheBund.png",
	
//	酒店
	"J-半岛酒店":"J-HOTELBANDAO.png",
	"J-淳大万丽（世纪公园）":"J-HOTELCHUNDA.png",
	"J-东湖宾馆":"J-HOTELDONGHU.png",
	"J-东郊宾馆":"J-HOTELDONGJIAO.png",
	"J-富豪环球东亚酒店":"J-HOTELFUHAOHUANQIU.png",
	"J-国际会议中心东方滨江":"J-HOTELGUOJIHUIYI.png",
	"J-和平饭店":"J-HOTELHP.png",
	"J-衡山宾馆":"J-HOTELHENGSHAN.png",
	"J-虹桥喜来登上海太平洋大饭店":"J-HOTELHQXILAIDENG.png",
	"J-虹桥迎宾馆":"J-HOTELYINBINGGUAN.png",
	"J-花园饭店（上海）":"J-HOTELHUAYUAN.png",
	"J-华亭宾馆":"J-HOTELHUATING.png",
	"J-华亭宾馆副楼":"J-HOTELHUATINGFL.png",
	"J-嘉定喜来登大酒店":"J-HOTELJIADINGXLD.png",
	"J-锦江饭店":"J-HOTELJINJIANG.png",
	"J-凯宾斯基大酒店":"J-HOTELKAIBINSIJI.png",
	"J-南新雅大酒店":"J-HOTELNANXINYA.png",
	"J-浦东香格里拉":"J-HOTELPDXIANGGELILA.png",
	"J-千禧海鸥":"J-HOTELQIANXIHAIOU.png",
	"J-上海JW万豪酒店":"J-HOTELJWWANHAO.png",
	"J-上海安曼纳卓悦酒店":"J-HOTELANMANNA.png",
	"J-上海波特曼丽嘉酒店（白金五星）":"J-HOTELBOTEMANLI.png",
	"J-上海大酒店":"J-HOTELSH.png",
	"J-上海大厦":"J-HOTELSHB.png",
	"J-上海富建酒店":"J-HOTELFJ.png",
	"J-上海古象大酒店":"J-HOTELGUXIANG.png",
	"J-上海虹口三至喜来登酒店":"J-HOTELHONGKOUXILAIDENG.png",
	"J-上海虹桥康得思酒店	":"J-HOTELHQKANGDESI.png",
	"J-上海虹桥新华联索菲特大酒店":"J-HOTELHQXINHUALIANSUO.png",
	"J-上海静安希尔顿饭店":"J-HOTELJINGANXIERDUN.png",
	"J-上海静安香格里拉大酒店":"J-HOTELJINGANXGLL.png",
	"J-上海龙之梦万丽酒店":"J-HOTELLONGZHIMENG.png",
	"J-上海浦东四季酒店":"J-HOTELPDXIJI.png",
	"J-上海浦西洲际酒店":"J-HOTELPXSIZHOU.png",
	"J-上海日航饭店":"J-HOTELRIHANG.png",
	"J-上海瑞金洲际酒店（上海瑞金宾馆）":"J-HOTELRUIJINZHOUJI.png",
	"J-上海佘山茂御臻品之选酒店":"J-HOTELSHESHANMAOYU.png",
	"J-上海世茂皇家艾美酒店":"J-HOTELSHIMAOHUANGJIA.png",
	"J-上海斯格威大酒店":"J-HOTELSIGEWEI.png",
	"J-上海四季酒店":"J-HOTELSIJI.png",
	"J-上海松江开元名都大酒店":"J-HOTELSONGJIANGKAIYUAN.png",
	
	"J-上海外滩茂悦大酒店":"J-HOTELWAITAIMAOYUE.png",
	"J-上海万豪虹桥大酒店":"J-HOTELWANHAOHQ.png",
	"J-上海威斯汀大饭店":"J-HOTELWEISITING.png",
	"J-上海新发展亚太万豪酒店":"J-HOTELXINYATAIWANHAO.png",
	"J-上海新桥绿地铂骊酒店":"J-HOTELLVDIBOLI.png",
	"J-上海新世界丽笙大酒店":"J-HOTELXINSHIJIELISHENG.png",
	"J-上海兴国宾馆":"J-HOTELXINGGUO.png",
	"J-上海扬子江万丽大酒店":"J-HOTELYANGZIJIANG.png",
	"J-上海银星皇冠假日酒店":"J-HOTELYINXING.png",
	"J-上海豫园万丽酒店":"J-HOTELYUYUANWANLI.png",
	"J-世博洲际酒店":"J-HOTELSHIBOZHOUJI.png",
	"J-市委办公厅":"J-HOTELSHIWEI.png",
	"J-唐朝大酒店":"J-HOTELTANGCHAO.png",
	"J-文华东方":"J-HOTELWENHUADONGFANG.png",
	"J-西郊宾馆":"J-HOTELXIJIAO.png",
	"J-新锦江大酒店":"J-HOTELXINJINJIANG.png",
	
//	进口博览会
	"J-道路":"J-ROAD.png",
	"J-国家会展中心":"J-CIIE.png",
	"J-交通枢纽":"J-TRAFFIC.png",
	"J-酒店":"J-HOTEL.png",
	"J-外滩":"J-TheBund.png",
	
//	道路
	"J-虹桥火车站-国家会展中心":"J-HQ-CIIE.png",
	"J-虹桥机场-国家会展中心":"J-AHQ-CIIE.png",
	"J-沪杭高铁":"J-HH.png",
	"J-京沪_沪宁高铁":"J-JHHN.png",
	"J-浦东机场-国家会展中心":"J-APD-CIIE.png",
	"J-上海火车站-国家会展中心":"J-SH-CIIE.png",
	"J-上海南站-国家会展中心":"J-NSH-CIIE.png",
	"J-京沪/沪宁高铁":"J-HH.png",
	
//	交通枢纽
	"J-虹桥站":"J-THQ.png",
	"J-虹桥机场":"J-TAHQ.png",
	"J-浦东机场":"J-TAPD.png",
	"J-上海南站":"J-TNSH.png",
	"J-上海站":"J-TSH.png"
	
};
var arr=[];
var Situation = {};
var cdm = LSMScreen.CacheDataManager.getInstance();
CIIENEW.Screen.prototype.initialize=function(_hotspot){
	if(_hotspot!=null){
		this.hotspot=_hotspot;
	}
	this.dm=LSMScreen.DataManager.getInstance();
	this.cdm=LSMScreen.CacheDataManager.getInstance();
	//this.cdm.getSubHotspots({hotspot:this.hotspot,hot_type:'0'},this.subHotspotDataHandler.bind(this));
	this.cdm.getHotspotTree({},this.subHotTreeHandler.bind(this));
	$('.ciiebubble').on('click',this.updateMainHot.bind(this));
	$('#k_img').on('click',this.Img.bind(this));
	$('#hotList').bind('mousewheel',this.hotListScroll.bind(this));
};
CIIENEW.Screen.prototype.situationLeft=function(){
	var bool = false;
	$('#Website_left').attr('src',eastcom.baseURL+'/static/images/overview/L1.png');
	$('#Website_right').attr('src',eastcom.baseURL+'/static/images/overview/R2.png');
	var list=Situation.list;
	var t=0;
	Situation.slidePosition--;
	for(var q=0;q<list.length;q++){
		if (Situation.slidePosition== 0&&t==0) {Situation.slidePosition = Situation.data.length};
		$("#carousel_div_"+q).css("left",(Situation.slidePosition + 1)* (parseInt($("#carousel_div_"+q+" li")[0].style.width) * -1)+ "px");
		var left_value = parseInt($("#carousel_div_"+q)[0].style.left)+ (parseInt($("#carousel_div_"+q+" li")[0].style.width));
		if (left_value < 0) {
			if ((left_value * -1) % parseInt($("#carousel_div_"+q+" li")[0].style.width) == 0) {
				$("#carousel_div_"+q).animate({"left" : left_value + "px"}, 700);
			}
		}
	}
}
CIIENEW.Screen.prototype.situationRight=function(){
	$('#Website_left').attr('src',eastcom.baseURL+'/static/images/overview/L2.png');
	$('#Website_right').attr('src',eastcom.baseURL+'/static/images/overview/R1.png');
	var list=Situation.list;
	var t=0;
	var slidePosition=Situation.slidePosition;
	for(var q=0;q<list.length;q++){
		if(slidePosition==(Situation.data.length)&&t==0){Situation.slidePosition=0;$("#carousel_div_"+q).css("left","0px");}
	    var left_value=parseInt($("#carousel_div_"+q)[0].style.left)+(parseInt($("#carousel_div_"+q+" li")[0].style.width)*-1);
	    if(left_value<0){
		  	if((left_value*-1)%parseInt($("#carousel_div_"+q+" li")[0].style.width)==0){
		  		$("#carousel_div_"+q).animate({"left":left_value+"px"},700);
		  	}
	    }
	}
	Situation.slidePosition++;
}
CIIENEW.Screen.prototype.hotListScroll=function(e){
	if(!this.scrollLock){
		this.scrollLock=true;
		var delta=e.originalEvent.wheelDelta;
		if(delta<0){
			this.startIndex+=4;
			$('#hotList').animate({scrollTop: '+=1145px'}, 1000,null,this.unlockScroll.bind(this));
		}else if(delta>0){
			this.startIndex-=4;
			$('#hotList').animate({scrollTop: '-=1145px'}, 1000,null,this.unlockScroll.bind(this));
		}
		if(this.startIndex>=this.hotspotList.length){
			this.startIndex=this.hotspotList.length-4;
		}
		if(this.startIndex+4>=this.hotspotList.length){
			this.startIndex=this.hotspotList.length-4;
		}
		if(this.startIndex<0){
			this.startIndex=0;
		}
		
	}
	
};
CIIENEW.Screen.prototype.unlockScroll=function(e){
	this.scrollLock=false;
	this.checkDot();
};
CIIENEW.Screen.prototype.Img=function(e){
	 window.location.href = eastcom.baseURL + "/pages/local-lsm/ciienew/overviewleftyd.jsp?isScreenMode=" + isScreenMode
	 parent.overview_left();
};
CIIENEW.Screen.prototype.getSelectedMainHot=function(e){
	var hot=$('.ciiedot-select').attr('name');
	return hot;
};
CIIENEW.Screen.prototype.updateMainHot=function(e){
	var hot=$(e.currentTarget).attr('name');
	if($(e.currentTarget).hasClass('ciiebubble-selected')){
		$(e.currentTarget).removeClass('ciiebubble-selected');
		hot='进口博览会';
	}else{
		$('.ciiebubble').removeClass('ciiebubble-selected');
		$(e.currentTarget).addClass('ciiebubble-selected');
	}
	this.setMainHot(hot);
	parent.updateHotspot(hot);
};
CIIENEW.Screen.prototype.subHotTreeHandler=function(result){
	var baseList=result.children;
	var i=0;
	var hotspots=[];
	for(i=0;i<baseList.length;i++){
		var record=baseList[i];
		this.mainHotMap[record.id]=record.children;
	}
	this.mainHotMap[result.id]=result.children;
	this.setMainHot(this.hotspot);
	
};
CIIENEW.Screen.prototype.setMainHot=function(hot){
	var list=this.mainHotMap[hot];
	var i=0;
	var hotspots=[];
	for(i=0;i<list.length;i++){
		var record=list[i];
		//if(record.type==0){
			hotspots.push(record.id);
		//}
	}
	this.startIndex=0;
	this.hotspotList=hotspots;
	this.drawHotspotList();
	this.Cfg();
	clearInterval(this.intervalKey1);
	this.intervalKey1=setInterval(this.update.bind(this),300*1000);
};
CIIENEW.Screen.prototype.Cfg=function(e){
	this.cdm.getThresCfg({}, this.ThresCfg.bind(this));
}
CIIENEW.Screen.prototype.ThresCfg=function(Cfg){
	  Situation.ThresCfg={};
	  Situation.ThresCfg = Cfg.data;
	  this.update();
}
CIIENEW.Screen.prototype.hotClickHandler=function(e){
	var hot=$(e.currentTarget).parents().parents().attr('hot');
//	if(hot=='J-WH馆'){
//		$('body').off('click');
//		$('#whpic').css('display','block');
//		$('#whpic').attr('show','true');
//		$('body').on('click',function(){
//			if($('#whpic').attr('show')=='true'){
//				$('#whpic').attr('show','false');
//			}else{
//				$('#whpic').css('display','none');
//			}
//		});
//	}else 
	if(isScreenMode=="true"){
		this.selectedHot=hot;
		this.checkDot();
		parent.updateHotspot(hot);
	}else{
		window.location.href='ciiecenter.jsp?hotspot='+encodeURIComponent(hot)+"&fromModel=ciie";
	}
	
};
CIIENEW.Screen.prototype.update=function(){
	$("#Modal").modal("hide");
	this.cdm.getHotspotKpi({}, this.updateKpis.bind(this));
	this.cdm.getIsmHotltewg({}, this.updateLtewg.bind(this));
	this.cdm.getIsmHotgsm({}, this.updateAllgsmwg.bind(this));
};

CIIENEW.Screen.prototype.updateKpis=function(result){
	this.kpiCache=result;
	Situation.kpiCache=result;
	CIIENEW.Screen.prototype.result=result;
	this.refreshKpiValues();
};
CIIENEW.Screen.prototype.updateLtewg=function(result){
	this.LtewgCache=result;
	Situation.LtewgCache=result;
	CIIENEW.Screen.prototype.result=result;
	this.refreshLtewgValues();
};
CIIENEW.Screen.prototype.updateAllgsmwg=function(result){
	this.Allgsmwg=result;
	Situation.Allgsmwg=result;
	CIIENEW.Screen.prototype.result=result;
	this.refreshAllgsmwgValues();
};
/*CIIENEW.Screen.prototype.updateIntl=function(result){
	this.IntlCache=result;
	Situation.IntlCache=result;
	CIIENEW.Screen.prototype.result=result;
	this.refreshIntlValues();
};*/
CIIENEW.Screen.prototype.drawHotspotList=function(){
	var list=this.hotspotList;
	var html='';
	Situation.list=list;
	Situation.data={};
	Situation.data.length=5;
	var parameter=eval("("+pmars.Location()+")");
	var parameter_name=utils.getJsonName(parameter);
	var length=1;
	Situation.slidePosition=1;
	for(var i=0;i<list.length;i++){
		var hot=list[i];
		var imgSrc='';
		var showName=hot;
		showName=showName.replace('J-','');
		if(this.imgMap[hot]==null){
			imgSrc=BASEPATH+"/static/styles/local-lsm/ciienew/images/hotimg/J-SUR.png";
		}else{
			imgSrc=BASEPATH+"/static/styles/local-lsm/ciienew/images/hotimg/"+this.imgMap[hot];
		}
		var html_li="";
		var leng=0;
		for(var q=0;q<Situation.data.length;q++){
			var html_div='<div class="ciiehotkpi" style="position:relative;float:left">'
				+'<div  id="popover'+(length)+'" data-lengt='+(length)+' style="position:absolute;"></div>'
				+'<div class="ciiehotkpititle horizontalRow" style="width:100%;">'
				+'<div class="ciiekpiicon1"></div>'
				+'<div class="fontSubInfo">'+parameter[parameter_name[leng]].auxiliary+'</div>'
				+'<div class="fontUnitTime">'+parameter[parameter_name[leng]].company+'</div>'
			+'</div>'
				+'<div class="ciiekpivalue" onmouseout ="_mouseout(this)">---</div>'
			+'<div class="ciiekpiratio horizontalRow">'
			+'<div class="threeround">同</div>'
			+'<div class="icon-up" style="margin:15px 0px 0px 0px;"></div>'
			+'<div class="fontSubInfo" style="font-size:24px;line-height:42px;color:rgb(0, 255, 0);">---</div>'
			+'<div class="threeround" style="margin-left:5px;">环</div>'
			+'<div class="icon-up" style="margin:15px 0px 0px 0px;"></div>'
			+'<div class="fontSubInfo" style="font-size:24px;line-height:42px;color:rgb(0, 255, 0);">---</div>'
			+'</div>'
			+'</div>'
			+'<div class="ciiehotkpi" style="width:350px;margin-left:10px;float:left">'
			+'<div id="popover'+(length+1)+'" data-lengt='+(length+1)+'  style="position:relative;"></div>'
				+'<div class="ciiehotkpititle horizontalRow" style="width:100%;">'
					+'<div class="ciiekpiicon2"></div>'
					+'<div class="fontSubInfo">'+parameter[parameter_name[leng+1]].auxiliary+'</div>'
					+'<div class="fontUnitTime">'+parameter[parameter_name[leng+1]].company+'</div>'
				+'</div>'
				+'<div class="ciiekpivalue" onmouseout ="_mouseout(this)">---</div>'
				+'<div class="ciiekpiratio horizontalRow">'
					+'<div class="threeround">同</div>'
					+'<div class="icon-up" style="margin:15px 0px 0px 0px;"></div>'
					+'<div class="fontSubInfo" style="font-size:24px;line-height:42px;color:rgb(0, 255, 0);">---</div>'
					+'<div class="threeround" style="margin-left:5px;">环</div>'
					+'<div class="icon-up" style="margin:15px 0px 0px 0px;"></div>'
					+'<div class="fontSubInfo" style="font-size:24px;line-height:42px;color:rgb(0, 255, 0);">---</div>'
				+'</div>'
			+'</div>'
			+'<div class="ciiehotkpi" style="width:350px;margin-left:10px;float:left">'
			+'<div  id="popover'+(length+2)+'" data-lengt='+(length+2)+'  style="position:relative;"></div>'
				+'<div class="ciiehotkpititle horizontalRow" style="width:100%;">'
					+'<div class="ciiekpiicon3" ></div>'
					+'<div class="fontSubInfo">'+parameter[parameter_name[leng+2]].auxiliary+'</div>'
					+'<div class="fontUnitTime">'+parameter[parameter_name[leng+2]].company+'</div>'
				+'</div>'
				+'<div class="ciiekpivalue" onmouseout ="_mouseout(this)">---</div>'
				+'<div class="ciiekpiratio horizontalRow">'
					+'<div class="threeround">同</div>'
					+'<div class="icon-up" style="margin:15px 0px 0px 0px;"></div>'
					+'<div class="fontSubInfo" style="font-size:24px;line-height:42px;color:rgb(0, 255, 0);">---</div>'
					+'<div class="threeround" style="margin-left:5px;">环</div>'
					+'<div class="icon-up" style="margin:15px 0px 0px 0px;"></div>'
					+'<div class="fontSubInfo" style="font-size:24px;line-height:42px;color:rgb(0, 255, 0);">---</div>'
				+'</div>'
			+'</div>'
			html_li+='<li class="carousel-item">'+html_div+'</li>'
			leng=leng+3;
			length=length+3;
		}
		var htmlStr='<ul class="carousel-inner" id="carousel_div_'+i+'">'+ html_li +'</ul>'
		
		html+='<div class="ciiehotinfoparent"  hot="'+hot+'" style="width:100%;">';
		html+='<div class="fontImportantInfo ciiehotinfo-hot" style="margin-left:35px;">'+showName+'</div>';
		html+='<div class="ciiehotinfo" style="width:100%;">';
		html+='<div class="ciiehotimg"><img class="ciiehotimgsrc" src="'+imgSrc+'"></div>';
		html+='<div class="horizontalRow ft-carousel" id="carousel_'+i+'" style="width:1080px;height:208px;top: auto;left: 10px;">';
		html+=htmlStr+'</div></div></div>';
	}
	$('#hotList').html(html);
	$('.ciiehotimg').on('click',this.hotClickHandler.bind(this));
	for(var i=0;i<list.length;i++){
		$("#carousel_"+i).FtCarousel({index: 0,auto: false});
	}
	for(var s=0;s<list.length;s++){
		var c=$("#carousel_div_"+s+"  li").length;
		for(var f=0;f<c;f++){
			if(f==0||f==c-1){
				$($($($($("#carousel_div_"+s+"  li")[f]).context.childNodes[0]).context.childNodes[0])).attr("id",$($($($("#carousel_div_"+s+"  li")[f]).context.childNodes[0]).context.childNodes[0]).context.id+"_auxiliary");
				$($($($($("#carousel_div_"+s+"  li")[f]).context.childNodes[1]).context.childNodes[0])).attr("id",$($($($("#carousel_div_"+s+"  li")[f]).context.childNodes[1]).context.childNodes[0]).context.id+"_auxiliary");	
				$($($($($("#carousel_div_"+s+"  li")[f]).context.childNodes[2]).context.childNodes[0])).attr("id",$($($($("#carousel_div_"+s+"  li")[f]).context.childNodes[2]).context.childNodes[0]).context.id+"_auxiliary");	
			}
		}
	}
	var ciieleft='<div><img id="Website_left"  src="'+eastcom.baseURL+'/static/images/overview/L2.png" style="cursor:pointer;top: -2px;width: 40px;height:40px"><img id="Website_right"  src="'+eastcom.baseURL+'/static/images/overview/R2.png" style="cursor:pointer;top:-2px; width: 40px;height:40px"></div>';
	$('#ciieleft').html(ciieleft);
	$('#Website_left').on('click',this.situationLeft.bind(this));
	$('#Website_right').on('click',this.situationRight.bind(this));
	this.checkDot();	
/*	this.cdm.getIntlRoamIn({hot_name:Situation.list}, this.updateIntl.bind(this));*/
};
CIIENEW.Screen.prototype.drawNext=function(){
	var showLen=4;
	this.startIndex=this.startIndex%this.hotspotList.length;
	var imgs=['ciie.png','himalayan.png','hongqiaotrain.png','pudongair.png'];
	for(var i=0;i<showLen;i++){
		var next=(this.startIndex+i)%this.hotspotList.length;
		var hot=this.hotspotList[next];
		//$('.ciiehotinfoparent:eq('+i+')').css('transform',"rotateX(180deg)");
		//$('.ciiehotinfoparent:eq('+i+')').toggleClass('rotateDivX');
		if($('.ciiehotinfoparent:eq('+i+')').hasClass('rotateDivX')){
			$('.ciiehotinfoparent:eq('+i+')').removeClass('rotateDivX');
			$('.ciiehotinfoparent:eq('+i+')').addClass('rotateDivX2');
		}else{
			$('.ciiehotinfoparent:eq('+i+')').removeClass('rotateDivX2');
			$('.ciiehotinfoparent:eq('+i+')').addClass('rotateDivX');
		}
		
		$('.ciiedot:eq('+i+')').attr('hot',hot);
		$('.ciiehotinfoparent:eq('+i+')').attr('hot',hot);
		$('.ciiehotinfo-hot:eq('+i+')').text(hot.replace('J-',''));
		var imgSrc
		if(this.imgMap[hot]==null){
			imgSrc=BASEPATH+"/static/styles/local-lsm/ciienew/images/hotimg/J-SUR.png";
		}else{
			imgSrc=BASEPATH+"/static/styles/local-lsm/ciienew/images/hotimg/"+this.imgMap[hot];
		}
		$('.ciiehotimgsrc:eq('+i+')').attr('src',imgSrc);
	}
	this.checkDot();
	this.refreshKpiValues();
	this.startIndex+=showLen;
};

CIIENEW.Screen.prototype.onmouseover=function(obgect){
	var json={};
	var id=$(obgect.parentElement).prevAll()[1].id;
	$('#'+id).css('display','block');
	var dataMap="";
	var parameter=eval("("+pmars.Location()+")");
	if(parameter[obgect.id].ascription=="1"){
		dataMap=Situation.LtewgCache.data;
	}else if(parameter[obgect.id].ascription=="2"){
		dataMap=Situation.kpiCache;
	}else  if(parameter[obgect.id].ascription=="3"){
		dataMap=Situation.Allgsmwg.data;
	}
	var list=obgect.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
	var hot=$(list).attr('hot');
	var record=dataMap[hot]; 
	var length=$('#'+id).data("lengt");
	var parameter = eval("(" + pmars.Location() + ")");
	var ThresCfgName_time="";
	var min1 = 100; var max1 = 150;
    var min2 = 50;var max2 = 100;
	var min3 = "";var max3 = "";
	var min4 = "";var max4 = -1;
	var classification = eval("(" + pmars.classification_guarantee() + ")")[obgect.id];
	if(!utils.isStringEmpty(parameter[obgect.id])){
		if (parameter[obgect.id].Tparticle > 59) {
			ThresCfgName_time = "小时";
		} else {
			ThresCfgName_time = parameter[obgect.id].Tparticle + "分钟";
		}
	}
	if(!utils.isStringEmpty(classification)){
		var ThresCfgName = "[" + classification.classification + "]-["
		+ classification.name + "]-[" + ThresCfgName_time + "]-["
		+ classification.Belonged + "]";
		var level = Situation.ThresCfg[ThresCfgName];
	}
	if (!utils.isStringEmpty(level)) {
		 if (!utils.isStringEmpty(level.level_1)) {
			 json.threshold1=level.level_1;
             var Section1 = level.level_1.split(",");
             if (Section1.length > 1) {
                 min1 = parseInt(Section1[0].replace(/[^0-9]/ig, ""));
                 max1 = parseInt(Section1[1].replace(/[^0-9]/ig, ""));
                 if (utils.isStringEmpty(min1)) {
                     min1 = -1;
                 }
                 if (utils.isStringEmpty(max1)) {
                     max1 = 999999;
                 }
             }
         }else{
        	 json.threshold1="---";
         }
         if (!utils.isStringEmpty(level.level_2)) {
        	 json.threshold2=level.level_2;
             var Section2 = level.level_2.split(",");
             if (Section2.length > 1) {
                 min2 = parseInt(Section2[0].replace(/[^0-9]/ig, ""));
                 max2 = parseInt(Section2[1].replace(/[^0-9]/ig, ""));
                 if (utils.isStringEmpty(min2)) {
                     min2 = -1;
                 }
                 if (utils.isStringEmpty(max2)) {
                     max2 = 999999;
                 }
             }
         }else{
        	 json.threshold2="---";
         }
         if (!utils.isStringEmpty(level.level_3)) {
        	 json.threshold3=level.level_3;
             var Section3 = level.level_3.split(",");
             if (Section3.length > 1) {
                 min3 = parseInt(Section3[0].replace(/[^0-9]/ig, ""));
                 max3 = parseInt(Section3[1].replace(/[^0-9]/ig, ""));
                 if (utils.isStringEmpty(min3)) {
                     min3 = -1;
                 }
                 if (utils.isStringEmpty(max3)) {
                     max3 = 999999;
                 }
             }
         }else{
        	 json.threshold3="---";
         }
         if (!utils.isStringEmpty(level.level_4)) {
        	 json.threshold4=level.level_4;
             var Section4 = level.level_4.split(",");
             if (Section4.length > 1) {
                 min4 = parseInt(Section4[0].replace(/[^0-9]/ig, ""));
                 max4 = parseInt(Section4[1].replace(/[^0-9]/ig, ""));
                 if (utils.isStringEmpty(min4)) {
                     min4 = -1;
                 }
                 if (utils.isStringEmpty(max4)) {
                     max4 = 999999;
                 }
             }
         }else{
        	 json.threshold4="---";
         }
	}else{
		 json.threshold1="---";
		 json.threshold2="---";
		 json.threshold3="---";
		 json.threshold4="---";
	}
	var isStringEmpty={id:obgect.id,value:record[obgect.id],hb:record[obgect.id+"hb"],tb:record[obgect.id+"tb"],time:record.time,};
	  json.time1=pmars.getNowstrhourOfgetMinutes(isStringEmpty.time,(parameter[isStringEmpty.id].Tparticle)*-1,"-",":").substring(11, 16);
	  json.time2=(isStringEmpty.time).substring(11, 16);
	  json.source=parameter[isStringEmpty.id].source;
	  json.hbproportion=pmars.proportion(parameter[isStringEmpty.id].company,isStringEmpty.value,isStringEmpty.hb);
	  if(parameter[isStringEmpty.id].company=="(人)"){
		  json.hbincrement=pmars.conversion(parameter[isStringEmpty.id].company,(isStringEmpty.value-isStringEmpty.hb))+parameter[isStringEmpty.id].company_auxiliary;
	  }else{
		  json.hbincrement=utils.changeTwoDecimal(pmars.conversion(parameter[isStringEmpty.id].company,(isStringEmpty.value-isStringEmpty.hb)))+parameter[isStringEmpty.id].company_auxiliary;
	  }
	 if(utils.isStringEmpty(isStringEmpty.hb)||utils.isStringEmpty(isStringEmpty.value)){json.hbincrement="---";}
	 json.tb=isStringEmpty.tb;
	 json.tbproportion=pmars.proportion(parameter[isStringEmpty.id].company,isStringEmpty.value,isStringEmpty.tb);
	 if(parseInt(json.tbproportion.value)>50){json.tbproportion.color="#da6d6d";}else{ json.tbproportion.color="#00FF00";};
	  if(utils.isStringEmpty(isStringEmpty.tb)||utils.isStringEmpty(isStringEmpty.value)){ json.tbincrement="---";}
	  else{if(parameter[isStringEmpty.id].company=="(人)"){json.tbincrement=pmars.conversion(parameter[isStringEmpty.id].company,(isStringEmpty.value-isStringEmpty.tb))+parameter[isStringEmpty.id].company_auxiliary;}
		  else{json.tbincrement=utils.changeTwoDecimal(pmars.conversion(parameter[isStringEmpty.id].company,(isStringEmpty.value-isStringEmpty.tb)))+parameter[isStringEmpty.id].company_auxiliary;}};
	var id_bool= parseInt(length)%3==0?true:false;
	var Explain="";
    if (!utils.isStringEmpty(level)&&level.thres_type == "区间") {
    	Explain="(值区间)";
        if (json.hbproportion.bool == 0) {
            if (min2 <= isStringEmpty.value && isStringEmpty.value < max2) {
                json.hbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/orange.png";
                json.hbproportion.left = 0;
                json.hbproportion.color = "#FF8C00";
                json.hbproportion._class = "";
            } else if (min1 <= isStringEmpty.value && isStringEmpty.value < max1) {
                json.hbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/red2.png";
                json.hbproportion.left = 0;
                json.hbproportion.color = "#da6d6d";
                json.hbproportion._class = "";
            } else {
                json.hbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/green.png";
                json.hbproportion.left = 0;
                json.hbproportion.color = "#00FF00";
                json.hbproportion._class = "";
            }
        } else if (json.hbproportion.bool == 1) {
            if (min2 <= isStringEmpty.value && isStringEmpty.value < max2) {
            	  json.hbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/orange.png";
                json.hbproportion.color = "#FF8C00";
                json.hbproportion._class = "rotate";
            } else if (min1 <= isStringEmpty.value && isStringEmpty.value < max1) {
                json.hbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/red2.png";
                json.hbproportion.color = "#da6d6d";
                json.hbproportion._class = "rotate";
            } else {
                json.hbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/green.png";
                json.hbproportion.color = "#00FF00";
                json.hbproportion._class = "rotate";
            }
        }else{  
                json.hbproportion.left = 10;
                json.hbproportion.color = "#00FF00";
                json.hbproportion.display = "none";
                json.hbproportion._class = "";
        }
        if (json.tbproportion.bool == 0) {
            if (min2 <= isStringEmpty.tb && isStringEmpty.tb < max2) {
                json.tbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/orange.png";
                json.tbproportion.left = 0;
                json.tbproportion.color = "#FF8C00";
                json.tbproportion._class = "";
            } else if (min1 <= isStringEmpty.tb && isStringEmpty.tb < max1) {
                json.tbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/red2.png";
                json.tbproportion.left = 0;
                json.tbproportion.color = "#da6d6d";
                json.tbproportion._class = "";
            } else {
                json.tbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/green.png";
                json.tbproportion.left = 0;
                json.tbproportion.color = "#00FF00";
                json.tbproportion._class = "";
            }
        } else if (json.tbproportion.bool == 1) {
            if (min2 <= isStringEmpty.tb && isStringEmpty.tb < max2) {
            	json.tbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/orange.png";
                json.tbproportion.color = "#FF8C00";
                json.tbproportion._class = "rotate";
            } else if (min1 <= isStringEmpty.tb && isStringEmpty.tb < max1) {
                json.tbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/red2.png";
                json.tbproportion.color = "#da6d6d";
                json.tbproportion._class = "rotate";
            } else {
                json.tbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/green.png";
                json.tbproportion.left = 0;
                json.tbproportion.color = "#00FF00";
                json.tbproportion._class = "rotate"
            }
        } else{
                json.tbproportion.left = 10;
                json.tbproportion.color = "#00FF00";
                json.tbproportion.display = "none";
                json.tbproportion._class = "";
        }
    }else if(!utils.isStringEmpty(level)&&level.thres_type == "波动"){
    	Explain="(环比波动)";
    	if (json.hbproportion.bool == 0) {
            if (min2 <= json.hbproportion.value_auxiliary && json.hbproportion.value_auxiliary < max2) {
                json.hbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/orange.png";
                json.hbproportion.left = 0;
                json.hbproportion.color = "#FF8C00";
                json.hbproportion._class = "";
            } else if (min1 <= json.hbproportion.value_auxiliary && json.hbproportion.value_auxiliary < max1) {
                json.hbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/red2.png";
                json.hbproportion.left = 0;
                json.hbproportion.color = "#da6d6d";
                json.hbproportion._class = "";
            } else {
                json.hbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/green.png";
                json.hbproportion.left = 0;
                json.hbproportion.color = "#00FF00";
                json.hbproportion._class = "";
            }
        } else if (json.hbproportion.bool == 1) {
            if (min2 <= json.hbproportion.value_auxiliary && json.hbproportion.value_auxiliary < max2) {
            	json.hbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/orange.png";
                json.hbproportion.color = "#FF8C00";
                json.hbproportion._class = "rotate";
            } else if (min1 <= json.hbproportion.value_auxiliary && json.hbproportion.value_auxiliary < max1) {
                json.hbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/red2.png";
                json.hbproportion.color = "#da6d6d";
                json.hbproportion._class = "rotate";
            } else {
                json.hbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/green.png";
                json.hbproportion.color = "#00FF00";
                json.hbproportion._class = "rotate";
            }
        } else{
                json.hbproportion.left = 10;
                json.hbproportion.display = "none";
                json.hbproportion.color = "#00FF00";
                json.hbproportion._class = "";
        }
        if (json.tbproportion.bool == 0) {
            if (min2 <= json.tbproportion.value_auxiliary && json.tbproportion.value_auxiliary < max2) {
                json.tbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/orange.png";
                json.tbproportion.left = 0;
                json.tbproportion.color = "#FF8C00";
                json.tbproportion._class = "";
            } else if (min1 <= json.tbproportion.value_auxiliary && json.tbproportion.value_auxiliary < max1) {
                json.tbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/red2.png";
                json.tbproportion.left = 0;
                json.tbproportion.color = "#da6d6d";
                json.tbproportion._class = "";
            } else {
                json.tbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/green.png";
                json.tbproportion.left = 0;
                json.tbproportion.color = "#00FF00";
                json.tbproportion._class = ""
            }
        } else if (json.tbproportion.bool == 1) {
            if (min2 <= json.tbproportion.value_auxiliary && json.tbproportion.value_auxiliary < max2) {
                json.tbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/orange.png";
                json.tbproportion.color = "#FF8C00";
                json.tbproportion._class = "rotate";
            } else if (min1 <= json.tbproportion.value_auxiliary && json.tbproportion.value_auxiliary < max1) {
                json.tbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/red2.png";
                json.tbproportion.color = "#da6d6d";
                json.tbproportion._class = "rotate";
            } else {
                json.tbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/green.png";
                json.tbproportion.left = 0;
                json.tbproportion.color = "#00FF00";
                json.tbproportion._class = "rotate"
            }
        } else{
                json.tbproportion.left = 10;
                json.tbproportion.color = "#00FF00";
                json.tbproportion.display = "none";
                json.tbproportion._class = ""
        }
    }else{
      	Explain="(环比波动)";
    	 json.threshold2="(50,100]";
		 json.threshold1="(100,]";
      	if (json.hbproportion.bool == 0) {
            if (min2 <= json.hbproportion.value_auxiliary && json.hbproportion.value_auxiliary < max2) {
                json.hbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/orange.png";
                json.hbproportion.left = 0;
                json.hbproportion.color = "#FF8C00";
                json.hbproportion._class = "";
            } else if (min1 <= json.hbproportion.value_auxiliary && json.hbproportion.value_auxiliary < max1) {
                json.hbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/red2.png";
                json.hbproportion.left = 0;
                json.hbproportion.color = "#da6d6d";
                json.hbproportion._class = "";
            } else {
                json.hbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/green.png";
                json.hbproportion.left = 0;
                json.hbproportion.color = "#00FF00";
                json.hbproportion._class = "";
            }
        } else if (json.hbproportion.bool == 1) {
            if (min2 <= json.hbproportion.value_auxiliary && json.hbproportion.value_auxiliary < max2) {
            	json.hbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/orange.png";
                json.hbproportion.color = "#FF8C00";
                json.hbproportion._class = "rotate";
            } else if (min1 <= json.hbproportion.value_auxiliary && json.hbproportion.value_auxiliary < max1) {
                json.hbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/red2.png";
                json.hbproportion.color = "#da6d6d";
                json.hbproportion._class = "rotate";
            } else {
                json.hbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/green.png";
                json.hbproportion.color = "#00FF00";
                json.hbproportion._class = "rotate";
            }
        } else{
                json.hbproportion.left = 10;
                json.hbproportion.display = "none";
                json.hbproportion.color = "#00FF00";
                json.hbproportion._class = "";
        }
        if (json.tbproportion.bool == 0) {
            if (min2 <= json.tbproportion.value_auxiliary && json.tbproportion.value_auxiliary < max2) {
                json.tbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/orange.png";
                json.tbproportion.left = 0;
                json.tbproportion.color = "#FF8C00";
                json.tbproportion._class = "";
            } else if (min1 <= json.tbproportion.value_auxiliary && json.tbproportion.value_auxiliary < max1) {
                json.tbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/red2.png";
                json.tbproportion.left = 0;
                json.tbproportion.color = "#da6d6d";
                json.tbproportion._class = "";
            } else {
                json.tbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/green.png";
                json.tbproportion.left = 0;
                json.tbproportion.color = "#00FF00";
                json.tbproportion._class = ""
            }
        } else if (json.tbproportion.bool == 1) {
            if (min2 <= json.tbproportion.value_auxiliary && json.tbproportion.value_auxiliary < max2) {
                json.tbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/orange.png";
                json.tbproportion.color = "#FF8C00";
                json.tbproportion._class = "rotate";
            } else if (min1 <= json.tbproportion.value_auxiliary && json.tbproportion.value_auxiliary < max1) {
                json.tbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/red2.png";
                json.tbproportion.color = "#da6d6d";
                json.tbproportion._class = "rotate";
            } else {
                json.tbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/green.png";
                json.tbproportion.left = 0;
                json.tbproportion.color = "#00FF00";
                json.tbproportion._class = "rotate"
            }
        } else{
                json.tbproportion.left = 10;
                json.tbproportion.color = "#00FF00";
                json.tbproportion.display = "none";
                json.tbproportion._class = ""
        }
    }
	var src=eastcom.baseURL+'/static/images/overview/popover3.png';
	var left1=300;
	var left2=37;
	if(id_bool==true){
		src=eastcom.baseURL+'/static/images/overview/popover4.png';
		left1=-300;
		left2=22;
	}
	 var html='<div style="width:310px;height:208px;z-index:10;position: absolute;top:-20px;left:'+left1+'px;" >';
	  html+='<img src="'+src+'" style="width:100%;height:100%">';
	  html+='<div style="width:256px;position: absolute;top:0px;font-size: 16px !important;left:'+left2+'px;">';
 	  html+='<div style="padding-top: 13px !important;"><div ><span>时&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;间:</span><span style="color:#66E6FF;margin-left:10px"">'+json.time1+'~'+json.time2+'</span></div></div>';
 	  html+='<div style="padding-top: 0px;"><div ><span>数据来源:</span><span style="color:#66E6FF;margin-left: 10px;">'+json.source+'</span></div></div>';
 	  html+='<div style="padding-top: 0px;"><div ><span>环比增幅:</span><img src="'+json.hbproportion.img+'" style="width:14px;height:14px;margin-left: 10px;margin-top: -3px;display:'+json.hbproportion.display+'" class="'+json.hbproportion._class+'"><span style="color:'+json.hbproportion.color+';margin-left: '+json.hbproportion.left+'px;">'+json.hbproportion.value+'</span></div></div>';
 	  html+='<div style="padding-top: 0px;"><div ><span>环比增量:</span><span style="color:#66E6FF;margin-left:10px">'+ json.hbincrement+'</span></div></div>';
 	  html+='<div style="padding-top: 0px;"><div ><span>同比增幅:</span><img src="'+json.tbproportion.img+'" style="width:14px;height:14px;margin-left: 10px;margin-top: -3px;display:'+json.tbproportion.display+'" class="'+json.tbproportion._class+'"><span style="color:'+json.tbproportion.color+';margin-left: '+json.tbproportion.left+'px;">'+json.tbproportion.value+'</span></div></div>';
 	  html+='<div style="padding-top: 0px;"><div ><span>同比增量:</span><span style="color:#66E6FF;margin-left: 10px;">'+json.tbincrement+'</span></div></div>';
 	  html+='<div style="padding-top: 0px;"><div ><span>一级阈值:</span><span style="color:#66E6FF;margin-left: 10px;">' + json.threshold1+ '</span><span style="float:right;color:#66E6FF;font-size: 14px;">'+Explain+'</span></div></div>';
      html+='<div style="padding-top: 0px;"><div ><span>二级阈值:</span><span style="color:#66E6FF;margin-left: 10px;">' + json.threshold2+ '</span><span style="float:right;color:#66E6FF;font-size: 14px;">'+Explain+'</span></div></div>';
 	  html+='</div></div>';
 	 setTimeout(function(){ document.getElementById(id).innerHTML = html;}, 100);
};
CIIENEW.Screen.prototype.refreshKpiValues=function(){
	var dataMap=this.kpiCache;
	if(dataMap==null) return;
	var list=$('.ciiehotinfoparent');
	var leng=0;
	for(var i=0;i<list.length;i++){
		var hot=$(list[i]).attr('hot');
		var record=dataMap[hot];
		if(leng>=12){leng=0;};
		if(record!=null){
			var yhs="";var hwl2="";var ll="";var xysy="";var tcp="";var s_261="";
			if(!utils.isStringEmpty(record['s_091'])){yhs="<span  id='s_091' onmouseover='_onmouseover(this);' onclick='Click(this)'>"+record['s_091']+"</span>";}
			else{yhs="<span  id='s_091' onmouseover='_onmouseover(this);'onclick='Click(this)' >"+record['s_091']+"</span>";}
			if(!utils.isStringEmpty(record['hwl2'])){hwl2="<span  id='hwl2'   onmouseover='_onmouseover(this);'onclick='Click(this)'>"+record['hwl2']+"</span>";}
			else{hwl2="<span  id='hwl2'   onmouseover='_onmouseover(this);'onclick='Click(this)'>---</span>";}
			if(!utils.isStringEmpty(record['s_083'])){ll="<span  id='s_083' onmouseover='_onmouseover(this);'onclick='Click(this)'>"+(record['s_083']/1024/1024).toFixed(2)+"</span>";}
			else{ll="<span  id='s_083' onmouseover='_onmouseover(this);'onclick='Click(this)'>---</span>";}
			
			if(!utils.isStringEmpty(record['s_027'])){resp="<span  id='s_027' onmouseover='_onmouseover(this);'onclick='Click(this)'>"+record['s_027']+"</span>";}
			else{resp="<span  id='s_027' onmouseover='_onmouseover(this);'onclick='Click(this)'>---</span>";}
			if(!utils.isStringEmpty(record['s_139'])){xysy="<span  id='s_139' onmouseover='_onmouseover(this);'onclick='Click(this)'>"+record['s_139']+"</span>";}
			else{xysy="<span  id='s_139' onmouseover='_onmouseover(this);'onclick='Click(this)'>---</span>";}
			if(!utils.isStringEmpty(record['s_006'])){tcp="<span  id='s_006'   onmouseover='_onmouseover(this);'onclick='Click(this)'>"+record['s_006']+"</span>";}
			else{tcp="<span  id='s_006'   onmouseover='_onmouseover(this);'onclick='Click(this)'>---</span>";}
		
			
			if(!utils.isStringEmpty(record['s_261'])){s_261="<span  id='s_261' onmouseover='_onmouseover(this);'onclick='Click(this)'>"+record['s_261']+"</span>";}
			else{s_261="<span  id='s_261' onmouseover='_onmouseover(this);'onclick='Click(this)'>---</span>";}
			
		
			$(list[i]).find('li:eq(1)').find('.ciiehotkpi:eq(0)').find('.ciiekpivalue').html(yhs);//用户数
			$(list[i]).find('li:eq(1)').find('.ciiehotkpi:eq(1)').find('.ciiekpivalue').html(hwl2);//话务量
			$(list[i]).find('li:eq(1)').find('.ciiehotkpi:eq(2)').find('.ciiekpivalue').html(ll);//流量

			$(list[i]).find('li:eq(6)').find('.ciiehotkpi:eq(0)').find('.ciiekpivalue').html(yhs);//用户数
			$(list[i]).find('li:eq(6)').find('.ciiehotkpi:eq(1)').find('.ciiekpivalue').html(hwl2);//话务量
			$(list[i]).find('li:eq(6)').find('.ciiehotkpi:eq(2)').find('.ciiekpivalue').html(ll);//流量
			
			$(list[i]).find('li:eq(4)').find('.ciiehotkpi:eq(1)').find('.ciiekpivalue').html(resp);//HTTP响应成功率
			$(list[i]).find('li:eq(4)').find('.ciiehotkpi:eq(2)').find('.ciiekpivalue').html(xysy);//HTTP响应时延
			$(list[i]).find('li:eq(5)').find('.ciiehotkpi:eq(0)').find('.ciiekpivalue').html(tcp); //TCP成功率
			$(list[i]).find('li:eq(0)').find('.ciiehotkpi:eq(0)').find('.ciiekpivalue').html(tcp); //TCP成功率
			
			$(list[i]).find('li:eq(2)').find('.ciiehotkpi:eq(2)').find('.ciiekpivalue').html(s_261);//即时通信活跃数
			
			this.setRatio('s_091',record,'tb',$(list[i]).find('li:eq(1)').find('.ciiehotkpi:eq(0)').find('.fontSubInfo:eq(1)'),$(list[i]).find('li:eq(1)').find('.ciiehotkpi:eq(0)').find('.ciiekpivalue'));//用户数
			this.setRatio('s_091',record,'hb',$(list[i]).find('li:eq(1)').find('.ciiehotkpi:eq(0)').find('.fontSubInfo:eq(2)'),$(list[i]).find('li:eq(1)').find('.ciiehotkpi:eq(0)').find('.ciiekpivalue'));//用户数
			this.setRatio('hwl2',record,'tb',$(list[i]).find('li:eq(1)').find('.ciiehotkpi:eq(1)').find('.fontSubInfo:eq(1)'),$(list[i]).find('li:eq(1)').find('.ciiehotkpi:eq(1)').find('.ciiekpivalue'));//话务量
			this.setRatio('hwl2',record,'hb',$(list[i]).find('li:eq(1)').find('.ciiehotkpi:eq(1)').find('.fontSubInfo:eq(2)'),$(list[i]).find('li:eq(1)').find('.ciiehotkpi:eq(1)').find('.ciiekpivalue'));//话务量
			this.setRatio('s_083',record,'tb',$(list[i]).find('li:eq(1)').find('.ciiehotkpi:eq(2)').find('.fontSubInfo:eq(1)'),$(list[i]).find('li:eq(1)').find('.ciiehotkpi:eq(2)').find('.ciiekpivalue'));//流量
			this.setRatio('s_083',record,'hb',$(list[i]).find('li:eq(1)').find('.ciiehotkpi:eq(2)').find('.fontSubInfo:eq(2)'),$(list[i]).find('li:eq(1)').find('.ciiehotkpi:eq(2)').find('.ciiekpivalue'));//流量
		
			
			this.setRatio('s_091',record,'tb',$(list[i]).find('li:eq(6)').find('.ciiehotkpi:eq(0)').find('.fontSubInfo:eq(1)'),$(list[i]).find('li:eq(6)').find('.ciiehotkpi:eq(0)').find('.ciiekpivalue'));//用户数
			this.setRatio('s_091',record,'hb',$(list[i]).find('li:eq(6)').find('.ciiehotkpi:eq(0)').find('.fontSubInfo:eq(2)'),$(list[i]).find('li:eq(6)').find('.ciiehotkpi:eq(0)').find('.ciiekpivalue'));//用户数
			this.setRatio('hwl2',record,'tb',$(list[i]).find('li:eq(6)').find('.ciiehotkpi:eq(1)').find('.fontSubInfo:eq(1)'),$(list[i]).find('li:eq(6)').find('.ciiehotkpi:eq(1)').find('.ciiekpivalue'));//话务量
			this.setRatio('hwl2',record,'hb',$(list[i]).find('li:eq(6)').find('.ciiehotkpi:eq(1)').find('.fontSubInfo:eq(2)'),$(list[i]).find('li:eq(6)').find('.ciiehotkpi:eq(1)').find('.ciiekpivalue'));//话务量
			this.setRatio('s_083',record,'tb',$(list[i]).find('li:eq(6)').find('.ciiehotkpi:eq(2)').find('.fontSubInfo:eq(1)'),$(list[i]).find('li:eq(6)').find('.ciiehotkpi:eq(2)').find('.ciiekpivalue'));//流量
			this.setRatio('s_083',record,'hb',$(list[i]).find('li:eq(6)').find('.ciiehotkpi:eq(2)').find('.fontSubInfo:eq(2)'),$(list[i]).find('li:eq(6)').find('.ciiehotkpi:eq(2)').find('.ciiekpivalue'));//流量
			
		
		
			this.setRatio('s_027',record,'tb',$(list[i]).find('li:eq(4)').find('.ciiehotkpi:eq(1)').find('.fontSubInfo:eq(1)'),$(list[i]).find('li:eq(4)').find('.ciiehotkpi:eq(1)').find('.ciiekpivalue'));//HTTP响应时延
			this.setRatio('s_027',record,'hb',$(list[i]).find('li:eq(4)').find('.ciiehotkpi:eq(1)').find('.fontSubInfo:eq(2)'),$(list[i]).find('li:eq(4)').find('.ciiehotkpi:eq(1)').find('.ciiekpivalue'));//HTTP响应时延
			this.setRatio('s_139',record,'tb',$(list[i]).find('li:eq(4)').find('.ciiehotkpi:eq(2)').find('.fontSubInfo:eq(1)'),$(list[i]).find('li:eq(4)').find('.ciiehotkpi:eq(2)').find('.ciiekpivalue'));//TCP成功率
			this.setRatio('s_139',record,'hb',$(list[i]).find('li:eq(4)').find('.ciiehotkpi:eq(2)').find('.fontSubInfo:eq(2)'),$(list[i]).find('li:eq(4)').find('.ciiehotkpi:eq(2)').find('.ciiekpivalue'));//TCP成功率
			this.setRatio('s_006',record,'tb',$(list[i]).find('li:eq(5)').find('.ciiehotkpi:eq(0)').find('.fontSubInfo:eq(1)'),$(list[i]).find('li:eq(5)').find('.ciiehotkpi:eq(0)').find('.ciiekpivalue'));//HTTP响应成功率
			this.setRatio('s_006',record,'hb',$(list[i]).find('li:eq(5)').find('.ciiehotkpi:eq(0)').find('.fontSubInfo:eq(2)'),$(list[i]).find('li:eq(5)').find('.ciiehotkpi:eq(0)').find('.ciiekpivalue'));//HTTP响应成功率

			this.setRatio('s_006',record,'tb',$(list[i]).find('li:eq(0)').find('.ciiehotkpi:eq(0)').find('.fontSubInfo:eq(1)'),$(list[i]).find('li:eq(0)').find('.ciiehotkpi:eq(0)').find('.ciiekpivalue'));//HTTP响应成功率
			this.setRatio('s_006',record,'hb',$(list[i]).find('li:eq(0)').find('.ciiehotkpi:eq(0)').find('.fontSubInfo:eq(2)'),$(list[i]).find('li:eq(0)').find('.ciiehotkpi:eq(0)').find('.ciiekpivalue'));//HTTP响应成功率
			
		
			this.setRatio('s_261',record,'tb',$(list[i]).find('li:eq(2)').find('.ciiehotkpi:eq(2)').find('.fontSubInfo:eq(1)'),$(list[i]).find('li:eq(2)').find('.ciiehotkpi:eq(2)').find('.ciiekpivalue'));//即时通信活跃数
			this.setRatio('s_261',record,'hb',$(list[i]).find('li:eq(2)').find('.ciiehotkpi:eq(2)').find('.fontSubInfo:eq(2)'),$(list[i]).find('li:eq(2)').find('.ciiehotkpi:eq(2)').find('.ciiekpivalue'));//即时通信活跃数
			

		}
	}
};
CIIENEW.Screen.prototype.refreshLtewgValues=function(){
	var dataMap=this.LtewgCache;
	if(dataMap==null) return;
	var list=$('.ciiehotinfoparent');
	var leng=0;
	for(var i=0;i<list.length;i++){
		var hot=$(list[i]).attr('hot');
		var record=dataMap.data[hot];
		if(leng>=12){leng=0;};
		if(record!=null){
			var conn="";var drop="";var lte_ul="";var lte_dl="";var volte_wireless_conn="";var volte_wireless_drop="";

			if(!utils.isStringEmpty(record['lte_wireless_conn_ratio'])){conn="<span  id='lte_wireless_conn_ratio' onmouseover='_onmouseover(this);'onclick='Click(this)'>"+record['lte_wireless_conn_ratio']+"</span>";}
			else{conn="<span  id='lte_wireless_conn_ratio' onmouseover='_onmouseover(this);'onclick='Click(this)'>---</span>";}
			if(!utils.isStringEmpty(record['lte_wireless_drop_ratio'])){drop="<span  id='lte_wireless_drop_ratio'   onmouseover='_onmouseover(this);'onclick='Click(this)'>"+record['lte_wireless_drop_ratio']+"</span>";}
			else{drop="<span  id='lte_wireless_drop_ratio'   onmouseover='_onmouseover(this);'onclick='Click(this)'>---</span>";}
			
			if(!utils.isStringEmpty(record['volte_wireless_conn_ratio'])){volte_wireless_conn="<span  id='volte_wireless_conn_ratio' onmouseover='_onmouseover(this);'onclick='Click(this)'>"+record['volte_wireless_conn_ratio']+"</span>";}
			else{conn="<span  id='volte_wireless_conn_ratio' onmouseover='_onmouseover(this);'onclick='Click(this)'>---</span>";}
			if(!utils.isStringEmpty(record['volte_wireless_drop_ratio'])){volte_wireless_drop="<span  id='volte_wireless_drop_ratio'   onmouseover='_onmouseover(this);'onclick='Click(this)'>"+record['volte_wireless_drop_ratio']+"</span>";}
			else{drop="<span  id='volte_wireless_drop_ratio'   onmouseover='_onmouseover(this);'onclick='Click(this)'>---</span>";}
			
			if(!utils.isStringEmpty(record['lte_ul_prb_use_ratio'])){lte_ul="<span  id='lte_ul_prb_use_ratio' onmouseover='_onmouseover(this);'onclick='Click(this)'>"+record['lte_ul_prb_use_ratio']+"</span>";}
			else{lte_ul="<span  id='lte_ul_prb_use_ratio' onmouseover='_onmouseover(this);'onclick='Click(this)'>---</span>";}
			
			if(!utils.isStringEmpty(record['lte_dl_prb_use_ratio'])){lte_dl="<span  id='lte_dl_prb_use_ratio'   onmouseover='_onmouseover(this);'onclick='Click(this)'>"+record['lte_dl_prb_use_ratio']+"</span>";}
			else{lte_dl="<span  id='lte_dl_prb_use_ratio'   onmouseover='_onmouseover(this);'onclick='Click(this)'>---</span>";}
			
			
			$(list[i]).find('li:eq(2)').find('.ciiehotkpi:eq(0)').find('.ciiekpivalue').html(conn);//4G无线接通率
			$(list[i]).find('li:eq(2)').find('.ciiehotkpi:eq(1)').find('.ciiekpivalue').html(drop);//4G无线掉线率
		
			$(list[i]).find('li:eq(3)').find('.ciiehotkpi:eq(0)').find('.ciiekpivalue').html(volte_wireless_conn);//VoLTE接通率
			$(list[i]).find('li:eq(3)').find('.ciiehotkpi:eq(1)').find('.ciiekpivalue').html(volte_wireless_drop); //VoLTE掉话率
			$(list[i]).find('li:eq(3)').find('.ciiehotkpi:eq(2)').find('.ciiekpivalue').html(lte_ul);//LTE上行PRB利用率

			$(list[i]).find('li:eq(4)').find('.ciiehotkpi:eq(0)').find('.ciiekpivalue').html(lte_dl);//LTE下行PRB利用率
			
			this.setRatio('lte_wireless_conn_ratio',record,'tb',$(list[i]).find('li:eq(2)').find('.ciiehotkpi:eq(0)').find('.fontSubInfo:eq(1)'),$(list[i]).find('li:eq(2)').find('.ciiehotkpi:eq(0)').find('.ciiekpivalue'));//4G无线接通率
			this.setRatio('lte_wireless_conn_ratio',record,'hb',$(list[i]).find('li:eq(2)').find('.ciiehotkpi:eq(0)').find('.fontSubInfo:eq(2)'),$(list[i]).find('li:eq(2)').find('.ciiehotkpi:eq(0)').find('.ciiekpivalue'));//4G无线接通率
			this.setRatio('lte_wireless_drop_ratio',record,'tb',$(list[i]).find('li:eq(2)').find('.ciiehotkpi:eq(1)').find('.fontSubInfo:eq(1)'),$(list[i]).find('li:eq(2)').find('.ciiehotkpi:eq(1)').find('.ciiekpivalue'));//4G无线掉线率
			this.setRatio('lte_wireless_drop_ratio',record,'hb',$(list[i]).find('li:eq(2)').find('.ciiehotkpi:eq(1)').find('.fontSubInfo:eq(2)'),$(list[i]).find('li:eq(2)').find('.ciiehotkpi:eq(1)').find('.ciiekpivalue'));//4G无线掉线率


			this.setRatio('lte_dl_prb_use_ratio',record,'tb',$(list[i]).find('li:eq(4)').find('.ciiehotkpi:eq(0)').find('.fontSubInfo:eq(1)'),$(list[i]).find('li:eq(4)').find('.ciiehotkpi:eq(0)').find('.ciiekpivalue'));//LTE上行PRB利用率
			this.setRatio('lte_dl_prb_use_ratio',record,'hb',$(list[i]).find('li:eq(4)').find('.ciiehotkpi:eq(0)').find('.fontSubInfo:eq(2)'),$(list[i]).find('li:eq(4)').find('.ciiehotkpi:eq(0)').find('.ciiekpivalue'));//LTE上行PRB利用率

			
			this.setRatio('volte_wireless_conn_ratio',record,'tb',$(list[i]).find('li:eq(3)').find('.ciiehotkpi:eq(0)').find('.fontSubInfo:eq(1)'),$(list[i]).find('li:eq(3)').find('.ciiehotkpi:eq(0)').find('.ciiekpivalue'));//VoLTE接通率
			this.setRatio('volte_wireless_conn_ratio',record,'hb',$(list[i]).find('li:eq(3)').find('.ciiehotkpi:eq(0)').find('.fontSubInfo:eq(2)'),$(list[i]).find('li:eq(3)').find('.ciiehotkpi:eq(0)').find('.ciiekpivalue'));//VoLTE接通率
			this.setRatio('volte_wireless_drop_ratio',record,'tb',$(list[i]).find('li:eq(3)').find('.ciiehotkpi:eq(1)').find('.fontSubInfo:eq(1)'),$(list[i]).find('li:eq(3)').find('.ciiehotkpi:eq(1)').find('.ciiekpivalue'));//VoLTE掉话率
			this.setRatio('volte_wireless_drop_ratio',record,'hb',$(list[i]).find('li:eq(3)').find('.ciiehotkpi:eq(1)').find('.fontSubInfo:eq(2)'),$(list[i]).find('li:eq(3)').find('.ciiehotkpi:eq(1)').find('.ciiekpivalue'));//VoLTE掉话率
			this.setRatio('lte_ul_prb_use_ratio',record,'tb',$(list[i]).find('li:eq(3)').find('.ciiehotkpi:eq(2)').find('.fontSubInfo:eq(1)'),$(list[i]).find('li:eq(3)').find('.ciiehotkpi:eq(2)').find('.ciiekpivalue'));//LTE下行PRB利用率
			this.setRatio('lte_ul_prb_use_ratio',record,'hb',$(list[i]).find('li:eq(3)').find('.ciiehotkpi:eq(2)').find('.fontSubInfo:eq(2)'),$(list[i]).find('li:eq(3)').find('.ciiehotkpi:eq(2)').find('.ciiekpivalue'));//LTE下行PRB利用率
			

		}
	}
};
CIIENEW.Screen.prototype.refreshAllgsmwgValues=function(){
	var dataMap=this.Allgsmwg;
	if(dataMap==null) return;
	var list=$('.ciiehotinfoparent');
	var leng=0;
	for(var i=0;i<list.length;i++){
		var hot=$(list[i]).attr('hot');
		var record=dataMap.data[hot];
		if(leng>=12){leng=0;};
		if(record!=null){
			var conn="";var use_ratio="";
			if(!utils.isStringEmpty(record['gsm_wireless_conn_ratio'])){conn="<span  id='gsm_wireless_conn_ratio' onmouseover='_onmouseover(this);'onclick='Click(this)'>"+record['gsm_wireless_conn_ratio']+"</span>";}
			else{conn="<span  id='gsm_wireless_conn_ratio' onmouseover='_onmouseover(this);'onclick='Click(this)'>---</span>";}
			
			
			if(!utils.isStringEmpty(record['gsm_wireless_use_ratio'])){use_ratio="<span  id='gsm_wireless_use_ratio' onmouseover='_onmouseover(this);'onclick='Click(this)'>"+record['gsm_wireless_use_ratio']+"</span>";}
			else{use_ratio="<span  id='gsm_wireless_use_ratio' onmouseover='_onmouseover(this);'onclick='Click(this)'>---</span>";}
			

			$(list[i]).find('li:eq(5)').find('.ciiehotkpi:eq(1)').find('.ciiekpivalue').html(conn);//GSM无线接通率
			$(list[i]).find('li:eq(0)').find('.ciiehotkpi:eq(1)').find('.ciiekpivalue').html(conn);//GSM无线接通率
			
			$(list[i]).find('li:eq(5)').find('.ciiehotkpi:eq(2)').find('.ciiekpivalue').html(use_ratio);//GSM无线利用率
			$(list[i]).find('li:eq(0)').find('.ciiehotkpi:eq(2)').find('.ciiekpivalue').html(use_ratio);//GSM无线利用率

			this.setRatio('gsm_wireless_conn_ratio',record,'tb',$(list[i]).find('li:eq(5)').find('.ciiehotkpi:eq(1)').find('.fontSubInfo:eq(1)'),$(list[i]).find('li:eq(5)').find('.ciiehotkpi:eq(1)').find('.ciiekpivalue'));//GSM无线接通率
			this.setRatio('gsm_wireless_conn_ratio',record,'hb',$(list[i]).find('li:eq(5)').find('.ciiehotkpi:eq(1)').find('.fontSubInfo:eq(2)'),$(list[i]).find('li:eq(5)').find('.ciiehotkpi:eq(1)').find('.ciiekpivalue'));//GSM无线接通率
			this.setRatio('gsm_wireless_use_ratio',record,'tb',$(list[i]).find('li:eq(5)').find('.ciiehotkpi:eq(2)').find('.fontSubInfo:eq(1)'),$(list[i]).find('li:eq(5)').find('.ciiehotkpi:eq(2)').find('.ciiekpivalue'));//GSM无线利用率
			this.setRatio('gsm_wireless_use_ratio',record,'hb',$(list[i]).find('li:eq(5)').find('.ciiehotkpi:eq(2)').find('.fontSubInfo:eq(2)'),$(list[i]).find('li:eq(5)').find('.ciiehotkpi:eq(2)').find('.ciiekpivalue'));//GSM无线利用率
			
			this.setRatio('gsm_wireless_conn_ratio',record,'tb',$(list[i]).find('li:eq(0)').find('.ciiehotkpi:eq(1)').find('.fontSubInfo:eq(1)'),$(list[i]).find('li:eq(0)').find('.ciiehotkpi:eq(1)').find('.ciiekpivalue'));//GSM无线接通率
			this.setRatio('gsm_wireless_conn_ratio',record,'hb',$(list[i]).find('li:eq(0)').find('.ciiehotkpi:eq(1)').find('.fontSubInfo:eq(2)'),$(list[i]).find('li:eq(0)').find('.ciiehotkpi:eq(1)').find('.ciiekpivalue'));//GSM无线接通率
			this.setRatio('gsm_wireless_use_ratio',record,'tb',$(list[i]).find('li:eq(0)').find('.ciiehotkpi:eq(2)').find('.fontSubInfo:eq(1)'),$(list[i]).find('li:eq(0)').find('.ciiehotkpi:eq(2)').find('.ciiekpivalue'));//GSM无线利用率
			this.setRatio('gsm_wireless_use_ratio',record,'hb',$(list[i]).find('li:eq(0)').find('.ciiehotkpi:eq(2)').find('.fontSubInfo:eq(2)'),$(list[i]).find('li:eq(0)').find('.ciiehotkpi:eq(2)').find('.ciiekpivalue'));//GSM无线利用率
		}
	}
}
CIIENEW.Screen.prototype.setRatio = function(kpiKey, record, tag, targetJq,targetJqSpan) {
	var parameter = eval("(" + pmars.Location() + ")");
	var ThresCfgName_time="";
	var min1 = 100; var max1 = 150;
    var min2 = 50;var max2 = 100;
	var min3 = "";var max3 = "";
	var min4 = "";var max4 = -1;
	var classification = eval("(" + pmars.classification_guarantee() + ")")[kpiKey];
	if(!utils.isStringEmpty(parameter[kpiKey])){
		if (parameter[kpiKey].Tparticle > 59) {
			ThresCfgName_time = "小时";
		} else {
			ThresCfgName_time = parameter[kpiKey].Tparticle + "分钟";
		}
	}
	if(!utils.isStringEmpty(classification)){
		var ThresCfgName = "[" + classification.classification + "]-["
		+ classification.name + "]-[" + ThresCfgName_time + "]-["
		+ classification.Belonged + "]";
		var level = Situation.ThresCfg[ThresCfgName];
	}
	targetJq.prev().removeClass('rotate');
	targetJq.prev().attr('dispaly', 'block');
	if (!utils.isStringEmpty(level)) {
		if (!utils.isStringEmpty(level.level_1)) {
			var Section1 = level.level_1.split(",");
			if (Section1.length > 1) {
				min1 = parseInt(Section1[0].replace(/[^0-9]/ig, ""));
				max1 = parseInt(Section1[1].replace(/[^0-9]/ig, ""));
				if (utils.isStringEmpty(min1)) {
					min1 = -1;
				}
				if (utils.isStringEmpty(max1)) {
					max1 = 999999;
				}
			}
		}
		if (!utils.isStringEmpty(level.level_2)) {
			var Section2 = level.level_2.split(",");
			if (Section2.length > 1) {
				min2 = parseInt(Section2[0].replace(/[^0-9]/ig, ""));
				max2 = parseInt(Section2[1].replace(/[^0-9]/ig, ""));
				if (utils.isStringEmpty(min2)) {
					min2 = -1;
				}
				if (utils.isStringEmpty(max2)) {
					max2 = 999999;
				}
			}
		}
		if (!utils.isStringEmpty(level.level_3)) {
			var Section3 = level.level_3.split(",");
			if (Section3.length > 1) {
				min3 = parseInt(Section3[0].replace(/[^0-9]/ig, ""));
				max3 = parseInt(Section3[1].replace(/[^0-9]/ig, ""));
				if (utils.isStringEmpty(min3)) {
					min3 = -1;
				}
				if (utils.isStringEmpty(max3)) {
					max3 = 999999;
				}
			}
		}
		if (!utils.isStringEmpty(level.level_4)) {
			var Section4 = level.level_4.split(",");
			if (Section4.length > 1) {
				min4 = parseInt(Section4[0].replace(/[^0-9]/ig, ""));
				max4 = parseInt(Section4[1].replace(/[^0-9]/ig, ""));
				if (utils.isStringEmpty(min4)) {
					min4 = -1;
				}
				if (utils.isStringEmpty(max4)) {
					max4 = 999999;
				}
			}
		}
	};
	if (tag == "hb") {
		var proportion = pmars.proportion(parameter[kpiKey].company,
				record[kpiKey], record[kpiKey + "hb"]);
		// 获取当前的环比
		if (!utils.isStringEmpty(level) && level.thres_type == "区间") {
			if (proportion.bool == 0) {
				if (min2 <= record[kpiKey]&& record[kpiKey] < max2) {
					targetJq.prev().attr('class', 'icon-orange');
					targetJq.css("color","#FF8C00");
					targetJqSpan.css("color","#FF8C00");
					targetJq.prev().addClass('');
				} else if (min1 <= record[kpiKey]&& record[kpiKey] < max1) {
					targetJq.prev().attr('class', 'icon-red');
					targetJq.css("color","#da6d6d");
					targetJqSpan.css("color","#da6d6d");
					targetJq.prev().addClass('');
				} else {
					targetJq.prev().attr('class', 'icon-up');
					targetJq.css("color","#00FF00");
					targetJqSpan.css("color","#66E6FF");
					targetJq.prev().addClass('');
				}
			} else if (proportion.bool == 1) {
				if (min2 <= record[kpiKey]&& record[kpiKey] < max2) {
					targetJq.prev().attr('class', 'icon-orange');
					targetJq.css("color","#FF8C00");
					targetJqSpan.css("color","#FF8C00");
					targetJq.prev().addClass('rotate');
				} else if (min1 <= record[kpiKey]&& record[kpiKey] < max1) {
					targetJq.prev().attr('class', 'icon-red');
					targetJq.css("color","#da6d6d");
					targetJqSpan.css("color","#da6d6d");
					targetJq.prev().addClass('rotate');
				} else {
					targetJq.prev().attr('class', 'icon-up');
					targetJq.css("color","#00FF00");
					targetJq.prev().addClass('rotate');
					targetJqSpan.css("color","#66E6FF");
				}
			}else{
				targetJq.prev().attr('class', 'icon-up');
				targetJq.prev().attr('dispaly', 'none');
				targetJq.css("color","#00FF00");
				targetJqSpan.css("color","#66E6FF");
				targetJq.prev().addClass('');
			};
		}else if (!utils.isStringEmpty(level) && level.thres_type == "波动") {
			if (proportion.bool == 0) {
				if (min2 <= proportion.value_auxiliary
						&& proportion.value_auxiliary < max2) {
					targetJq.prev().attr('class', 'icon-orange');
					targetJq.css("color","#FF8C00");
					targetJqSpan.css("color","#FF8C00");
					targetJq.prev().addClass('');
				} else if (min1 <= proportion.value_auxiliary
						&& proportion.value_auxiliary < max1) {
					targetJq.prev().attr('class', 'icon-red');
					targetJq.css("color","#da6d6d");
					targetJqSpan.css("color","#da6d6d");
					targetJq.prev().addClass('');
				} else {
					targetJq.prev().attr('class', 'icon-up');
					targetJq.css("color","#00FF00");
					targetJqSpan.css("color","#66E6FF");
					targetJq.prev().addClass('');
				}
			} else if (proportion.bool == 1) {
				if (min2 <= proportion.value_auxiliary
						&& proportion.value_auxiliary < max2) {
					targetJq.prev().attr('class', 'icon-orange');
					targetJq.css("color","#FF8C00");
					targetJqSpan.css("color","#FF8C00");
					targetJq.prev().addClass('rotate');
				} else if (min1 <= proportion.value_auxiliary
						&& proportion.value_auxiliary < max1) {
					targetJq.prev().attr('class', 'icon-red');
					targetJq.css("color","#da6d6d");
					targetJqSpan.css("color","#da6d6d");
					targetJq.prev().addClass('rotate');
				} else {
					targetJq.prev().attr('class', 'icon-up');
					targetJq.css("color","#00FF00");
					targetJq.prev().addClass('rotate');
					targetJqSpan.css("color","#66E6FF");
				}
			}else{
				targetJq.prev().attr('class', 'icon-up');
				targetJq.prev().attr('dispaly', 'none');
				targetJq.css("color","#00FF00");
				targetJqSpan.css("color","#66E6FF");
				targetJq.prev().addClass('');
			};
		} else {
			if (proportion.bool == 0) {
				if (min2 <= proportion.value_auxiliary
						&& proportion.value_auxiliary < max2) {
					targetJq.prev().attr('class', 'icon-orange');
					targetJq.css("color","#FF8C00");
					targetJqSpan.css("color","#FF8C00");
					targetJq.prev().addClass('');
				} else if (min1 <= proportion.value_auxiliary
						&& proportion.value_auxiliary < max1) {
					targetJq.prev().attr('class', 'icon-red');
					targetJq.css("color","#da6d6d");
					targetJqSpan.css("color","#da6d6d");
					targetJq.prev().addClass('');
				} else {
					targetJq.prev().attr('class', 'icon-up');
					targetJq.css("color","#00FF00");
					targetJqSpan.css("color","#66E6FF");
					targetJq.prev().addClass('');
				}
			} else if (proportion.bool == 1) {
				if (min2 <= proportion.value_auxiliary
						&& proportion.value_auxiliary < max2) {
					targetJq.prev().attr('class', 'icon-orange');
					targetJq.css("color","#FF8C00");
					targetJqSpan.css("color","#FF8C00");
					targetJq.prev().addClass('rotate');
				} else if (min1 <= proportion.value_auxiliary
						&& proportion.value_auxiliary < max1) {
					targetJq.prev().attr('class', 'icon-red');
					targetJq.css("color","#da6d6d");
					targetJqSpan.css("color","#da6d6d");
					targetJq.prev().addClass('rotate');
				} else {
					targetJq.prev().attr('class', 'icon-up');
					targetJq.css("color","#00FF00");
					targetJq.prev().addClass('rotate');
					targetJqSpan.css("color","#66E6FF");
				}
			}else{
				targetJq.prev().attr('class', 'icon-up');
				targetJq.prev().attr('dispaly', 'none');
				targetJq.css("color","#00FF00");
				targetJqSpan.css("color","#66E6FF");
				targetJq.prev().addClass('');
			};
		}
		targetJq.text(proportion.value);
	} else {
		var proportiontb = pmars.proportion(parameter[kpiKey].company,record[kpiKey], record[kpiKey + "tb"]);
		// 获取当前的同比
		if (!utils.isStringEmpty(level) && level.thres_type == "区间") {
			if (proportiontb.bool == 0) {
				if (min2 <= record[kpiKey]&& record[kpiKey] < max2) {
					targetJq.prev().attr('class', 'icon-orange');
					targetJq.css("color","#FF8C00");
				} else if (min1 <= record[kpiKey]&& record[kpiKey] < max1) {
					targetJq.prev().attr('class', 'icon-red');
					targetJq.css("color","#da6d6d");
				} else {
					targetJq.prev().attr('class', 'icon-up');
					targetJq.css("color","#00FF00");
				}
			} else if (proportiontb.bool == 1) {
				if (min2 <= record[kpiKey]&& record[kpiKey] < max2) {
					targetJq.prev().attr('class', 'icon-orange');
					targetJq.css("color","#FF8C00");
					targetJq.prev().addClass('rotate');
				} else if (min1 <= record[kpiKey]&& record[kpiKey] < max1) {
					targetJq.prev().attr('class', 'icon-red');
					targetJq.css("color","#da6d6d");
					targetJq.prev().addClass('rotate');
				} else {
					targetJq.prev().attr('class', 'icon-up');
					targetJq.css("color","#00FF00");
					targetJq.prev().addClass('rotate');
				}
			} else {
				targetJq.prev().attr('class', 'icon-up');
				targetJq.prev().attr('dispaly', 'none');
				targetJq.css("color","#00FF00");
				targetJqSpan.css("color","#66E6FF");
			};
		}else if (!utils.isStringEmpty(level) && level.thres_type == "波动") {
			if (proportiontb.bool == 0) {
				if (min2 <= proportiontb.value_auxiliary && proportiontb.value_auxiliary < max2) {
					targetJq.prev().attr('class', 'icon-orange');
					targetJq.css("color","#FF8C00");
				} else if (min1 <= proportiontb.value_auxiliary
						&& proportiontb.value_auxiliary < max1) {
					targetJq.prev().attr('class', 'icon-red');
					targetJq.css("color","#da6d6d");
				} else {
					targetJq.prev().attr('class', 'icon-up');
					targetJq.css("color","#00FF00");
				}
			} else if (proportiontb.bool == 1) {
				if (min2 <= proportiontb.value_auxiliary
						&& proportiontb.value_auxiliary < max2) {
					targetJq.prev().attr('class', 'icon-orange');
					targetJq.css("color","#FF8C00");
					targetJq.prev().addClass('rotate');
				} else if (min1 <= proportiontb.value_auxiliary
						&& proportiontb.value_auxiliary < max1) {
					targetJq.prev().attr('class', 'icon-red');
					targetJq.css("color","#da6d6d");
					targetJq.prev().addClass('rotate');
				} else {
					targetJq.prev().attr('class', 'icon-up');
					targetJq.css("color","#00FF00");
					targetJq.prev().addClass('rotate');
				}
			} else {
				targetJq.prev().attr('class', 'icon-up');
				targetJq.prev().attr('dispaly', 'none');
				targetJq.css("color","#00FF00");
				targetJqSpan.css("color","#66E6FF");
			};
		} else {
			if (proportiontb.bool == 0) {
				if (min2 <= proportiontb.value_auxiliary && proportiontb.value_auxiliary < max2) {
					targetJq.prev().attr('class', 'icon-orange');
					targetJq.css("color","#FF8C00");
				} else if (min1 <= proportiontb.value_auxiliary
						&& proportiontb.value_auxiliary < max1) {
					targetJq.prev().attr('class', 'icon-red');
					targetJq.css("color","#da6d6d");
				} else {
					targetJq.prev().attr('class', 'icon-up');
					targetJq.css("color","#00FF00");
				}
			} else if (proportiontb.bool == 1) {
				if (min2 <= proportiontb.value_auxiliary
						&& proportiontb.value_auxiliary < max2) {
					targetJq.prev().attr('class', 'icon-orange');
					targetJq.css("color","#FF8C00");
					targetJq.prev().addClass('rotate');
				} else if (min1 <= proportiontb.value_auxiliary
						&& proportiontb.value_auxiliary < max1) {
					targetJq.prev().attr('class', 'icon-red');
					targetJq.css("color","#da6d6d");
					targetJq.prev().addClass('rotate');
				} else {
					targetJq.prev().attr('class', 'icon-up');
					targetJq.css("color","#00FF00");
					targetJq.prev().addClass('rotate');
				}
			} else {
				targetJq.prev().attr('class', 'icon-up');
				targetJq.prev().attr('dispaly', 'none');
				targetJq.css("color","#00FF00");
				targetJqSpan.css("color","#66E6FF");
			};
		}
		targetJq.text(proportiontb.value);
	}
};
CIIENEW.Screen.prototype.checkDot=function(){
	var count=0;
	for(var i=this.startIndex;i<this.startIndex+4;i++){
		$('.ciiedot:eq('+count+')').attr('hot',this.hotspotList[i]);
		count++;
	}
	$('.ciiedot').removeClass('ciiedot-select');
	var list=$('.ciiedot');
	for(var i=0;i<list.length;i++){
		var itemHot=$(list[i]).attr('hot');
		if(itemHot==this.selectedHot){
			$(list[i]).addClass('ciiedot-select');
			break;
		}
		
	}
};
function _onmouseover(obgect){
	CIIENEW.Screen.prototype.onmouseover(obgect);
};
function Click(obgect){
	var parameter=eval("("+pmars.Location()+")");
	var hot=$(obgect).parents().parents().parents().parents().parents().parents().parents().attr('hot');
	$("#Modal").modal("show");
	$("#bz_ecarts_Modal").empty();
	$('.modal-backdrop').removeClass("modal-backdrop");
	if(obgect.id=="hwl2"){
		cdm.getHotlteWg({ids: hot}, function(result) {
			var result=result;var arr={};var c=[];
			for(var d=0;d<result.length;d++){c[d]={value:result[d][obgect.id],tb:result[d][obgect.id+"tb"],time:result[d].time}}
			arr[obgect.id]=c;
			ecarts.bz_ecarts_model("",obgect.id,arr,parameter);
		});
	}else if(parameter[obgect.id].ascription=="1"){
		cdm.getIsmHotlteTrend({ids: hot}, function(result) {
			var result=result.data[hot];var arr={};var c=[];
			for(var d=0;d<result.length;d++){c[d]={value:result[d][obgect.id],tb:result[d][obgect.id+"tb"],time:result[d].time}}
			arr[obgect.id]=c;
			ecarts.bz_ecarts_model("",obgect.id,arr,parameter);
		});
	}else if(parameter[obgect.id].ascription=="2"){
		cdm.getHotspotKpiTrend({ids: hot}, function(kpi) {
			var kpi=kpi;var arr={};var c=[];
			for(var d=0;d<kpi.length;d++){c[d]={value:kpi[d][obgect.id],tb:kpi[d][obgect.id+"tb"],time:kpi[d].time}}
			arr[obgect.id]=c;
			ecarts.bz_ecarts_model("",obgect.id,arr,parameter);
		});
	}else  if(parameter[obgect.id].ascription=="3"){
		cdm.getIsmHotgsmTrend({ids:hot}, function(gsm) {
			var gsm=gsm.data[hot];var arr={};var c=[];
			for(var d=0;d<gsm.length;d++){c[d]={value:gsm[d][obgect.id],tb:gsm[d][obgect.id+"tb"],time:gsm[d].time}}
			arr[obgect.id]=c;
			ecarts.bz_ecarts_model("",obgect.id,arr,parameter);
		});
	}
}
function _mouseout(obgect){
	var id=$(obgect).prevAll()[1].id;
	$('#'+id).css('display','none');	
};