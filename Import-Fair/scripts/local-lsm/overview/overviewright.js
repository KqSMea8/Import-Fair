var CIIENEW=CIIENEW||{};
CIIENEW.Roam=function ()
{
	this.initialize.apply(this,arguments);
};
var cdm = LSMScreen.CacheDataManager.getInstance();
var major="";
var bool=true;
var id=[];
var bdyh_bool=[];
var bdyh_bool_time="";
var Situation={};//全局变量
var overviewright = {
	init : function() {
		cdm.getIsmEaebmCfg({id:pmars.phone()}, function(Cfg) {
			if(Cfg.success){
				if(!utils.isStringEmpty(Cfg.data[pmars.phone()])){
					var Cfg=Cfg.data[pmars.phone()].content;
					var _Cfg=eval("("+Cfg+")");
					if(!utils.isStringEmpty(_Cfg._left_Model)){
						html.initial(_Cfg._left_Model);
					}else{
						html.initial();
					}
					Situation.top_length=0;
					Situation.top_jqgrid_length=0;
					Situation.top_bool=false;
					Situation.top_jqgrid_bool=false;
				}else{
					 html.initial();
				}
			}
		  overviewright.situation();
		  window.clearInterval(Situation.setInterval1);
		  window.clearInterval(Situation.setInterval2);
		  window.clearInterval(Situation.setInterval3);
		});
	},
	situation:function(){
		click();
		Situation.bz_top5={};
		Situation.top_length=0;
		Situation.top_bool=false;
		Situation.bz_top5.bool=false;
		Situation.top_jqgrid_length=0;
		Situation.setInterval1=setInterval(function() {overviewright.hys();}, 199999);
		Situation.setInterval2=setInterval(function() {overviewright.UserDistAll();}, 199999);
		Situation.setInterval3=setInterval(function() {overviewright.top();Situation.bz_top5.top_jqgrid=false;Situation.top_length=0;Situation.top_jqgrid_length=0;},3599999);
	},
	hys : function() {
		cdm.getHotspotKpi({ids : pmars.jkblh()}, function(result) {
			if (!utils.isStringEmpty(result)) {
				var yhs=pmars.conversion("(万人)",parseInt(result[pmars.jkblh()].s_091));
				$('#yhs_id').html(yhs);
				bdyh_bool[0]=true;
				bdyh_bool.hys=result[pmars.jkblh()].s_091;
				var bool_length=0;
				bdyh_bool_time=setInterval(function() {
					for(var s=0;s<bdyh_bool.length;s++){
						if(bdyh_bool[s]==true){
							bool_length++;
						}
					}
					if(bool_length==3){
						var bdyh=pmars.conversion("(万人)",(parseInt(bdyh_bool.hys)-parseInt(bdyh_bool.sj)-parseInt(bdyh_bool.gj)));
						$('#bdyh_id').html(bdyh);
						window.clearInterval(bdyh_bool_time);
					}
				}, 1000);
			} else {
				$('#yhs_id').html("--");
			}
		});
	},
	UserDistAll:function(){
		cdm.getUserDistAll({hot_name:pmars.jkblh()}, function(result) {
			if (result.success) {
				$('#sj_id').html("--");
				$('#gj_id').html("--");
				$('#ydyl_id').html("--");
				if(!utils.isStringEmpty(result.data.pro)){
					var sj=pmars.conversion("(万人)",parseInt(result.data.pro.user_cnt));
					$('#sj_id').html(sj);
					bdyh_bool[1]=true;
					bdyh_bool.sj=result.data.pro.user_cnt;
				}
				if(!utils.isStringEmpty(result.data.intl)){
					var gj=pmars.conversion("(人)",parseInt(result.data.intl.user_cnt));
					$('#gj_id').html(gj);
					bdyh_bool[2]=true;
					bdyh_bool.gj=result.data.intl.user_cnt;
				}
				if(!utils.isStringEmpty(result.data.intl_ys)){
					var ydyl_id=pmars.conversion("(人)",parseInt(result.data.intl_ys.user_cnt));
					$('#ydyl_id').html(ydyl_id);
				}
			}
		});
	},
	top : function() {
		cdm.getHotspotrank({ids : pmars.jkblh(),time_bool:Situation.top_bool}, function(result) {
			Situation.top_length++;
			if(Situation.top_length==1){
				if(result.length>0){
					Situation.top_result=result;
					Situation.top_bool=false;
					overviewright.top_jqgrid(Situation.top_result[0].element);
					Situation.bz_top5.major=Situation.top_result[0].element;
				}else{
					Situation.top_bool=true;
					overviewright.top();
				}
			}else if(Situation.top_length==2){
				if(result.length>0){
					Situation.top_result=result;
					Situation.top_bool=false;
					overviewright.top_jqgrid(Situation.top_result[0].element);
					Situation.bz_top5.major=Situation.top_result[0].element;
				}else{
					Situation.top_bool=false;
					if(utils.isStringEmpty(Situation.top_result[0])){
						Situation.top_result=overviewright2.top();
						overviewright.top_jqgrid(Situation.top_result[0].element);
						Situation.bz_top5.major=Situation.top_result[0].element;
					}else{
						overviewright.top_jqgrid(Situation.top_result[0].element);
						Situation.bz_top5.major=Situation.top_result[0].element;
					}
				}
			}
			var terminalChart=new COMMONCOMP.APPTOP('top',pmars.jkblh(),'intl');
		});
	},
	top_jqgrid : function(major) {
		cdm.getHotspotTimerank({hotspot:pmars.jkblh(),major:major,time_bool:Situation.top_jqgrid_bool}, function(result) {
			if(Situation.bz_top5.top_jqgrid!=true){
				Situation.top_jqgrid_length++;	
			}
			var list=result;
			if(Situation.top_jqgrid_length==1){
				if(list.length>0){
					Situation.top_jqgrid_bool=false;
					Situation.top_jqgrid_result=list;
				}else{
					Situation.top_jqgrid_bool=true;
					overviewright.top_jqgrid();
				}
			}else if(Situation.top_jqgrid_length==2){
				if(list.length>0){
					Situation.top_jqgrid_bool=false;
					Situation.top_jqgrid_result=list;
				}else{
					Situation.top_jqgrid_bool=false;
					if(utils.isStringEmpty(Situation.top_jqgrid_result)){
						Situation.top_jqgrid_result=overviewright2.top_5()[major];
					}else{
						Situation.top_jqgrid_result=list;
					}
				}
			}
			top_jqgrid_1();
		});
	},
	hovr_jqgrid : function() {
		cdm.getHotspotTimerank({hotspot:pmars.jkblh(),minor:"&minor=视频:咪咕视频&minor=音乐:咪咕音乐&minor=应用商店:MM商场&minor=阅读:咪咕阅读&minor=动漫:咪咕动漫&minor=支付:和包&minor=即时通信:飞信&minor=浏览下载:和冲浪&minor=导航:和地图&minor=游戏:咪咕游戏"}, function(result) {
			var list=result;
			if(list.length>0){
				Situation.hovr_jqgrid_result=list;
			}
			var html='';
			for(var i=0;i<Situation.hovr_jqgrid_result.length&&i<5;i++){
				var record=Situation.hovr_jqgrid_result[i];
				var cls1='appGridDarkTd';
				var cls2='appGridLightTd';
				
				if(i%2==0){
					cls1='appGridDarkTd';
					cls2='appGridLightTd';
				}else{
					cls2='appGridDarkTd';
					cls1='appGridLightTd';
				}
				if(record.总用户数==null){
					record.总用户数='--';
				}
				if(record.总流量==null){
					record.总流量='--';
				}
				if(record.HTTP下行速率500k==null){
					record.HTTP下行速率500k='--';
				}
				var icon=SUtils.getAppIconPath(record.element);
				var url=BASEPATH+'/static/styles/local-lsm/app/'+icon;
				var value0=pmars.conversion("(GB)",record.总流量)
				if(record.总流量<1024*100&&record.总流量>0){value0=0.1}
				var value1=pmars.conversion("(Mbps)",record.HTTP下行速率500k);
				if(record.HTTP下行速率500k<124&&record.HTTP下行速率500k>0){value1=0.1}
				html+='<div class="fontSubInfo '+cls1+'" style="text-align:left;padding-left:20px;" title="'+record.element+'"><img src="'+url+'" style="margin-right:20px;"/>'+utils.showOutLength(record.element,7)+'</div>';
				html+='<div class="fontImportantInfo ciiekpistyle '+cls2+'">'+record.总用户数+'</div>';
				html+='<div class="fontImportantInfo ciiekpistyle '+cls1+'">'+value0+'</div>';
				html+='<div class="fontImportantInfo ciiekpistyle '+cls2+'">'+value1+'</div>';
			}
			$("#appGridBody").empty();
			$('#appGridBody').html(html);
		});
	},
	jqgrid:function(brand){
		var columnsName = ["终端型号","终端用户数(万人)","流量(GB)"];
		var columnsConfig = [   {name: "terminal_model",index: "terminal_model",width: "233",align: "center"},
		                        {name: "device_count",index: "device_count",width: "232",align: "center"},
		                        {name: "bytes",index: "bytes",width: "234",align: "center"}];
		jqGridFrame.jqGridFrame("dtpz",columnsName,columnsConfig,brand);
	},
	Sortable:function(){
		var id=["用户数","业务量","TOP业务","小类TOP5业务量","终端占比","终端占比TOP10业务量"];
		var _id=["0","1","2","3","4","5"];
		var html='';
		var _html='';
		var _json=_id;
		var _d=0;
		cdm.getIsmEaebmCfg({id:pmars.phone()}, function(Cfg) {
			if(Cfg.success){
				if(!utils.isStringEmpty(Cfg.data[pmars.phone()])){
					var Cfg=Cfg.data[pmars.phone()].content;
					var _Cfg=eval("("+Cfg+")");
					if(!utils.isStringEmpty(_Cfg._left_Model)){
						 var order=(_Cfg._left_Model).split(",");
						 html="";
						 for(var d=0;d<order.length;d++){
							 if(order[d]=="placeholder"){
								 _d++;
							 }else{
								 html+='<li id="'+order[d]+'" data-name="right_'+order[d]+'">'+id[order[d]]+'</li>'; 
								 var index = _json.indexOf(order[d]);
								 if (index > -1) {
									 _json.splice(index, 1);
								}
							 }
						 }
						 if(_d==4){
							 for(var d=0;d<_id.length;d++){
								 html+='<li id="'+_id[d]+'" data-name="right_'+_id[d]+'">'+id[_id[d]]+'</li>'; 
							 }
						 }
						 if(_json.length<id.length){
							 for(var d=0;d<_json.length;d++){
								 _html+='<li id="'+_json[d]+'" data-name="right_'+_json[d]+'">'+id[_json[d]]+'</li>'; 
							 }
						 }
						 $('#bar').html(html);
						 $('#foo').html(_html);
					}else{
						html="";
						_html="";
						for(var s=0;s<id.length;s++){
							if(s<4){
								_html+='<li id="'+s+'" data-name="right_'+s+'">'+id[s]+'</li>'; 
							}else{
								html+='<li id="'+s+'" data-name="right_'+s+'">'+id[s]+'</li>';
							}
						}
						$('#foo').html(html);
						$('#bar').html(_html);
					}
					$("#zbpz_Modal").modal("show");	
					if(bool==true){
						bool=false;
						setTimeout(function(){
							Sortable.create(document.getElementById('foo'), {});
							Sortable.create(document.getElementById('bar'), {});
						},1000);
					}
				}else{
					html="";
					_html="";
					for(var s=0;s<id.length;s++){
						if(s<4){
							_html+='<li id="'+s+'" data-name="right_'+s+'">'+id[s]+'</li>'; 
						}else{
							html+='<li id="'+s+'" data-name="right_'+s+'">'+id[s]+'</li>';
						}
					}
					$('#foo').html(html);
					$('#bar').html(_html);
					$("#zbpz_Modal").modal("show");	
					if(bool==true){
						bool=false;
						setTimeout(function(){
							Sortable.create(document.getElementById('foo'), {});
							Sortable.create(document.getElementById('bar'), {});
						},1000);
					}
				}
			}
		});
	}
}
var jqGridFrame={
		jqGridFrame:function(id,colNames,colModel,brand,url){
			$('#' + id).jqGrid({
					height: 335,			// 高度
		            rowNum: 20,				// 行数
		            datatype: "local",		// 数据类型
		            colNames: colNames,		// 列名
		            colModel: colModel,		// 列属性
		            shrinkToFit:false,    	//
		            autoScroll: true ,
		            scrollOffset:10,
			});
			jqGridFrame.jqGridAjax(brand,id);
			$("#"+id).closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" });
		},
		jqGridAjax:function(brand,id){
			cdm.getIsmTerminalRank({hotspot:pmars.jkblh(),terminal_brand:brand}, function(Rank) {
				if(Rank.success){
					for(var c=0;c<Rank.data.length;c++){
						jQuery("#"+id).jqGrid('delRowData',c+ 1);
						utils.isStringEmpty(Rank.data[c].device_count)? Rank.data[c].device_count="0" :Rank.data[c].device_count=utils.changeTwoDecimal(parseInt(Rank.data[c].device_count)/10000);
						Rank.data[c].rate=utils.changeTwoDecimal(parseInt(Rank.data[c].bytes)/3686400)+" Kbps";
						utils.isStringEmpty(Rank.data[c].bytes)? Rank.data[c].bytes="0" :Rank.data[c].bytes=utils.changeTwoDecimal(parseInt(utils.ErlFromGb(Rank.data[c].bytes))/1024);
						jQuery("#"+id).jqGrid('addRowData',c+ 1, Rank.data[c]);
					}
					$("#"+id).trigger("reloadGrid");
				}
			});
		}
}
function click(){
	$("#top_ecarts_img").live('click',function(){overviewright.top_model();$("#top_ecarts_Modal").modal("show");});
	$("#zbpz_img").live('click',function(){overviewright.Sortable()});
	$("#confirm").live('click',function(){
		h=[];
		var length=$("#bar>li").length;
		for(var s=0;s<length;s++){
			h[s]=$("#bar >li")[s].id
		}
		if(length<4){
			for(var b=length;b<4;b++){
				h[b]="placeholder";
			}
		}
		cdm.getIsmEaebmCfg({id:pmars.phone()}, function(Cfg) {
			if(Cfg.success){
				var M="";
				 if(!utils.isStringEmpty(Cfg.data[pmars.phone()])){
					var Cfg=Cfg.data[pmars.phone()].content;
					var _Cfg=eval("("+Cfg+")");
					M ={_yd_Model:_Cfg._yd_Model,_left_Model:h.join(","),_Model:_Cfg._Model,_jtyw_Model:_Cfg._jtyw_Model};
				}else{
					M ={_yd_Model:"",_left_Model:h.join(","),_Model:"",_jtyw_Model:""};
				}
				 cdm.getIsmAdu({content:JSON.stringify(M)}, function(Update) {
						if(Update.success){
							utils.showSuccessPrompt("修改成功",false,true);
							$("#zbpz_Modal").modal('hide');
							overviewright.init();
						}else{
							utils.showErrPrompt("修改失败，请再次尝试修改",false,true);
							$("#zbpz_Modal").modal('hide');
							overviewright.init();
						}
					});
			}
		});
	});
	$("#hw_img").live('click',function(){right_ecarts._yyhw();$("#hw_ecarts_Modal").modal("show");});
	$("#liu_img").live('click',function(){right_ecarts._sgll();$("#liu_ecarts_Modal").modal("show");});
	$("#close").live('click',function(){$("#zbpz_Modal").modal('hide');});
	$("#top_img").live('click',function(){right_ecarts.zdzb_ecarts("top_ecarts_Modal_option");$("#top_ecarts_Modal").modal("show");});
}
function  top_click(obgect){
	for(var q=0;q<order.length;q++){
		if(order[q]==3){
			overviewright.top_jqgrid(obgect.id);
			Situation.bz_top5.major=obgect.id;
			Situation.bz_top5.top_jqgrid=true;
		}
	};
}
function  zbpz_img_onmouseover(){
	$('#zbpz_img').css('visibility','visible');
}
function  zbpz_img_mouseout(){
	$('#zbpz_img').css('visibility','hidden');
}
function  Roll_img_ydyw_onmouseover(){
	$('#bz_top5_Roll_img_div').css('visibility','visible');
}
function  Roll_img_mouseout(){
	$('#bz_top5_Roll_img_div').css('visibility','hidden');
}
function Roll_img_click(){
	if(Situation.bz_top5.bool==true){
		Situation.bz_top5.bool=false;
		$('#bz_top5_Roll_img').attr('src',eastcom.baseURL+'/static/images/overview/k_2.png');
		overviewright.top_jqgrid(Situation.bz_top5.major);
	}else{
		Situation.bz_top5.bool=true;
		$('#bz_top5_Roll_img').attr('src',eastcom.baseURL+'/static/images/overview/k_1.png');
		overviewright.hovr_jqgrid();
	}
}
function top_jqgrid_1(){
	var html='';
	for(var i=0;i<Situation.top_jqgrid_result.length&&i<5;i++){
		var record=Situation.top_jqgrid_result[i];
		var cls1='appGridDarkTd';
		var cls2='appGridLightTd';
		
		if(i%2==0){
			cls1='appGridDarkTd';
			cls2='appGridLightTd';
		}else{
			cls2='appGridDarkTd';
			cls1='appGridLightTd';
		}
		if(record.总用户数==null){
			record.总用户数='--';
		}
		if(record.总流量==null){
			record.总流量='--';
		}
		if(record.HTTP下行速率500k==null){
			record.HTTP下行速率500k='--';
		}
		var icon=SUtils.getAppIconPath(record.element);
		var url=BASEPATH+'/static/styles/local-lsm/app/'+icon;
		var value0=pmars.conversion("(GB)",record.总流量)
		if(record.总流量<1024*100&&record.总流量>0){value0=0.1}
		var value1=pmars.conversion("(Mbps)",record.HTTP下行速率500k);
		if(record.HTTP下行速率500k<124&&record.HTTP下行速率500k>0){value1=0.1}
		html+='<div class="fontSubInfo '+cls1+'" style="text-align:left;padding-left:20px;" title="'+record.element+'"><img src="'+url+'" style="margin-right:20px;"/>'+utils.showOutLength(record.element,7)+'</div>';
		html+='<div class="fontImportantInfo ciiekpistyle '+cls2+'">'+record.总用户数+'</div>';
		html+='<div class="fontImportantInfo ciiekpistyle '+cls1+'">'+value0+'</div>';
		html+='<div class="fontImportantInfo ciiekpistyle '+cls2+'">'+value1+'</div>';
	}
	$("#appGridBody").empty();
	$('#appGridBody').html(html);
}