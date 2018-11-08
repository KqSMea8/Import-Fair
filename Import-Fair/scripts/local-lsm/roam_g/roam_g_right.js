var CIIENEW=CIIENEW||{};
CIIENEW.Roam=function ()
{
	this.initialize.apply(this,arguments);
};
CIIENEW.Roam.prototype.constructor=CIIENEW.Roam;
CIIENEW.Roam.prototype.hotspot='';
CIIENEW.Roam.prototype.roamType='intl';
CIIENEW.Roam.prototype.dm=null;
CIIENEW.Roam.prototype.cdm=null;
CIIENEW.Roam.prototype.hotspotList=[];
CIIENEW.Roam.prototype.startIndex=0;
CIIENEW.Roam.prototype.selectedHot=null;
CIIENEW.Roam.prototype.lineWidth=3;
CIIENEW.Roam.prototype.chartLabelSize=24;
CIIENEW.Roam.prototype.terminalChart=24;
var Situation={};//全局变量
Situation.ywzl={};
Situation.ywzl.original={};
CIIENEW.Roam.prototype.initialize=function(_hotspot){
	if(_hotspot!=null){
		this.hotspot=_hotspot;
	}
	this.dm=LSMScreen.DataManager.getInstance();
	this.cdm=LSMScreen.CacheDataManager.getInstance();
	
	require(['echarts',  
	            'echarts/chart/line',
	            'echarts/chart/pie'
	            ],this.initEcharts.bind(this));
};
CIIENEW.Roam.prototype.initEcharts=function(ec){
	this.ec=echarts=ec;
	this.ec=echarts;
	this.drawWxzlEcarts();
	this.update();
	setInterval(this.update.bind(this),60*1000);
};	
	

CIIENEW.Roam.prototype.update=function(){
	var hotspot=this.hotspot;
	if(hotspot=="上海"){hotspot="";}
	if(this.roamType=='intl'){
		this.cdm.getIntlRoamIn({
			intl_name:null,
			hot_name:hotspot
		},this.updateGauge.bind(this));
	}else if(this.roamType=='pro'){
		this.cdm.getProvRoamIn({
			intl_name:null,
			hot_name:hotspot
		},this.updateGauge.bind(this));
	}
	this.cdm.getAppRank({hot_name:hotspot,roamType:this.roamType},this.drawAppRankTable.bind(this));

	this.updateTitle();
};
CIIENEW.Roam.prototype.updateTitle=function(){
	var list=$('.titles');
	var i=0;
	var ilength=list.length;
	
	for(i=0;i<list.length;i++){
		var title=$(list[i]).text();
		if(this.roamType=='intl'){
			$(list[i]).text(title.replace('省际','国际'));
		}else if(this.roamType=='pro'){
			$(list[i]).text(title.replace('国际','省际'));
		}
	}
};

CIIENEW.Roam.prototype.drawAppRankTable=function(result){
	var list=result.data;
	var html='';
	var j=0;
	var AppRankTable={};
	for(var i=0;i<list.length&&i<5;i++){
		var record=list[i];
		var cls1='appGridDarkTd';
		var cls2='appGridLightTd';
		AppRankTable["id"+i]={id:"id"+i,time:list[i].time};
		if(i%2==0){
			cls1='appGridDarkTd';
			cls2='appGridLightTd';
		}else{
			cls2='appGridDarkTd';
			cls1='appGridLightTd';
		}
		if(record.user_cnt==null){
			record.user_cnt='--';
		}
		if(record.bytes==null){
			record.bytes='--';
		}
		if(record.http_dlpage_gt500k_bytes==null){
			record.http_dlpage_gt500k_bytes='--';
		}
		var icon=SUtils.getAppIconPath(record.app_subtype_name);
		var url=BASEPATH+'/static/styles/local-lsm/app/'+icon;
		var value0=pmars.conversion("(MB)",record.bytes);
		if(record.bytes<102.4&&record.bytes>0){value0=0.1};
		var value1=pmars.conversion("(Mbps)",record.http_dlpage_gt500k_bytes);
		if(record.http_dlpage_gt500k_bytes<124&&record.http_dlpage_gt500k_bytes>0){value1=0.1};
		
		html+='<div class="fontSubInfo '+cls1+'" style="text-align:left;padding-left:20px;height:65px;line-height: 60px;font-size: 24px;"><img src="'+url+'" style="margin-right:20px;"/>'+record.app_subtype_name+'</div>';
		html+='<div class="fontImportantInfo ciiekpistyle '+cls2+'" style="font-size: 28px;height:65px;line-height: 62px;cursor: pointer;" onmouseout="_mouseout(this)"><span id="id'+i+'" data-length="'+(j+1)+'" onmouseover="App_onmouseover(this);">'+record.user_cnt+'</span></div>';
		html+='<div class="fontImportantInfo ciiekpistyle '+cls1+'" style="font-size: 28px;height:65px;line-height: 62px;cursor: pointer;" onmouseout="_mouseout(this)"><span id="id'+i+'" data-length="'+(j+2)+'" onmouseover="App_onmouseover(this);" >'+value0+'</span></div>';
		html+='<div class="fontImportantInfo ciiekpistyle '+cls2+'" style="font-size: 28px;height:65px;line-height: 62px;cursor: pointer;" onmouseout="_mouseout(this)"><span id="id'+i+'" data-length="'+(j+3)+'" onmouseover="App_onmouseover(this);">'+value1+'</span></div>';
		j=j+3;
	}
	$('#appGridBody').html(html);
	Situation.AppRankTable=AppRankTable;
};
CIIENEW.Roam.prototype.drawWxzlEcarts=function(result){
	var parameter={
			tcp_ack_rate:{id:"tcp_ack_rate",auxiliary:"TCP成功率",company:"(%)",company_auxiliary:"%",source : "信令",Tparticle : -60},
			tcp_ack_duration:{id:"tcp_ack_duration",auxiliary:"TCP响应时延",company:"(ms)",company_auxiliary:"ms",source : "信令",Tparticle : -60},
			http_req_succ_rate:{id:"http_req_succ_rate",auxiliary:"HTTP访问成功率",company:"(%)",company_auxiliary:"%",source : "信令",Tparticle :-60},
			dns_res_duration:{id:"dns_res_duration",auxiliary:"HTTP访问时延",company:"(ms)",company_auxiliary:"ms",source : "信令",Tparticle : -60},
			rstp_req_succ_rate:{id:"rstp_req_succ_rate",auxiliary:"视频播放成功率",company:"(%)",company_auxiliary:"%",source : "信令",Tparticle : -60},
			rstp_req_wait_duration:{id:"rstp_req_wait_duration",auxiliary:"视频播放时延",company:"(ms)",company_auxiliary:"ms",source : "信令",Tparticle : -60},
			im_login_succ_rate:{id:"im_login_succ_rate",auxiliary:"即时通信登录成功率",company:"(%)",company_auxiliary:"%",source : "信令",Tparticle : -60},
			im_login_duration:{id:"im_login_duration",auxiliary:"即时通信登录时延",company:"(ms)",company_auxiliary:"ms",source : "信令",Tparticle : -60}}
	Situation.parameter=parameter;
	var arr=utils.getJsonName(parameter);
	var html="";
	for(var c=0;c<arr.length;c++){
		var margin_right=10;
		if(c==3||c==8){margin_right=0}
		html+='<div style="width: 230px;margin-right:'+margin_right+'px"><div style="width: 230px;height:210px;margin-right:20px;background-color: rgba(0, 102, 255, 0.15);float:left" onmouseout="_mouseout(this)">';
    	html+='<div style="width: 230px;height:155px;" id="'+arr[c]+'_ecarts" onmouseout="_mouseout(this)"></div>';
    	html+='<div style="width: 230px;height:30px;text-align: center;line-height: 30px;font-size: 24px;">'+parameter[arr[c]].auxiliary+'</div>';
    	html+='<div style="width: 230px;height:30px;text-align: center;line-height: 30px;font-size: 34px;cursor: pointer;color: #66E6FF;top: -100px;position: relative;"><span id='+arr[c]+' onmouseover="_onmouseover(this);" data-length="'+(c+1)+'" data-id="'+arr[c]+'">---<span></div>';
    	html+='</div></div>';
     	$("#hlwzl").empty();
     	document.getElementById("hlwzl").innerHTML = html;
	}
}
CIIENEW.Roam.prototype.updateGauge=function(result){
	var record=result.data;
	if(!utils.isStringEmpty(this.hotspot)&&this.hotspot!="上海"){
		record=result.data[this.hotspot];
	}
	for(var key in record){
		if(!utils.isStringEmpty(Situation.parameter[key])){
			$('#'+key).text(pmars.conversion(Situation.parameter[key].company,record[key])+Situation.parameter[key].company_auxiliary);
			if(Situation.parameter[key].company=="(%)"){
				value=pmars.conversion(Situation.parameter[key].company,record[key]);
			}else{
				value=50;
			}
			Situation.ywzl.original[key]={"id":key,"value":record[key],"tb":record[key+"tb"],"hb":record[key+"hb"],"time":record.time}
			CIIENEW.Roam.prototype.GenerateEcarts(key,value);
		}
	}
};
CIIENEW.Roam.prototype.updateAllKpi=function(result){
	var record=result.data;
	for(var key in record){
			var value="";
			if(!utils.isStringEmpty(Situation.parameter[key])&&this.hotspot!="上海"){
				$('#'+key).text(pmars.conversion(Situation.parameter[key].company,record[key])+Situation.parameter[key].company_auxiliary);
				if(Situation.parameter[key].company=="(%)"){
					value=pmars.conversion(Situation.parameter[key].company,record[key]);
				}else{
					value=50;
				}
				Situation.ywzl.original[key]={"id":key,"value":record[key],"tb":record[key+"tb"],"hb":record[key+"hb"],"time":record.time}
				CIIENEW.Roam.prototype.GenerateEcarts(key,value);
			}
	}
};
CIIENEW.Roam.prototype.GenerateEcarts=function(id,value){
	value=value/100;
	option = {
		    toolbox: {
		        show: false,
		        feature: {
		            mark: {
		                show: true
		            },
		            restore: {
		                show: true
		            },
		            saveAsImage: {
		                show: true
		            }
		        }
		    },
		    series: [{
		        name: "指标",
		        type: "gauge",
		        startAngle: 180, //总的360，设置180就是半圆
		        endAngle: 0,
		        center: ["50%", "77%"], //整体的位置设置
		        radius: 100,
		        axisLine: {
		            lineStyle: {
		                width: 10, //柱子的宽度
		                color: [[value, "#00FF00"], [1, "#dce3ec"]] //0.298是百分比的比例值（小数），还有对应两个颜色值
		            }
		        },
		        axisTick: {
		            show: false
		        },
		        axisLabel: {
		            show: false
		        },
		        splitLine: {
		            show: false
		        },
		        pointer: {
		            width: 0, //指针的宽度
		            length: "0", //指针长度，按照半圆半径的百分比
		            color: "#2d99e2"
		        },
		        detail: {
		            show: false
		        },
		        data: [{ //显示数据
		            value: value
		        }]
		    }]
		};
	echart.init(id+"_ecarts",option);
};
require.config({  
	paths: {  
	    echartsMin: eastcom.baseURL+'/scripts/local-lsm/overview/echarts.min'
    }  
});  
var echart = {
		init: function (chartId, option) {//初始化方法
			require(['echartsMin','echarts/chart/line', 'echarts/chart/pie' ],initEcharts);function initEcharts(ec){
			var chart0=ec.init(document.getElementById(chartId),'marcarons');
			chart0.setOption(option);
		};	
	}
}
function _onmouseover(obgect){
	var length=$(obgect).data("length");
	var Location=eval("(" + Popoverposition.ywzl() + ")");
	var parameter = Situation.parameter;
	var classification=eval("(" + pmars.classification_guarantee() + ")");
	Popover2.popover(Situation.ywzl.original[$(obgect).data("id")],Location[length],parameter);
}
function  App_onmouseover(obgect){
	var length=$(obgect).data("length");
	var Location=eval("(" + Popoverposition.roam_g_right_yhs() + ")");
	var parameter = {
			id0:{id:"id0",source : "信令",Tparticle : 5},
			id1:{id:"id1",source : "信令",Tparticle : 5},
			id2:{id:"id2",source : "信令",Tparticle : 5},
			id3:{id:"id3",source : "信令",Tparticle : 5},
			id4:{id:"id4",source : "信令",Tparticle : 5}};
	Popover2.popover(Situation.AppRankTable[obgect.id],Location[length],parameter);
}
function  _mouseout(obgect){
	$("#popover").empty();
}