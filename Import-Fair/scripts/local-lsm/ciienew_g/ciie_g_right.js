var CIIENEW=CIIENEW||{};
CIIENEW.Screen=function ()
{
	this.initialize.apply(this,arguments);
};
CIIENEW.Screen.prototype.constructor=CIIENEW.Screen;
CIIENEW.Screen.prototype.hotspot='J-国家会展中心';
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
var Situation={};//全局变量
Situation.TrendBool=[];
Situation.hotspot="J-国家会展中心"
CIIENEW.Screen.prototype.initialize=function(_hotspot){
	require(['echarts','echarts/chart/bar','echarts/chart/pie'],this.initEcharts.bind(this));
	this.dm=LSMScreen.DataManager.getInstance();
	this.cdm=LSMScreen.CacheDataManager.getInstance();
	setInterval(this.update.bind(this),300*1000);
	Situation.room_gsm={};
	Situation.room_gsm.Trend={};
	Situation.hlwyw={};
	Situation.dist=["",""];
	Situation.hlwyw_id={};
	Situation.TrendhlwywBool=["",""];
	Situation.hlwyw.original={};
	Situation.hlwyw.dist={};
	Situation.updateHotlte={};
	Situation.updategsm={};
	var parameter = eval("(" + pmars.hlwyw() + ")");
    var parameter_name = utils.getJsonName(parameter);
    var name1=[];var name2=[];
    var c=0;var g=0;
    for(var q=0;q<parameter_name.length;q++){
    	if(parameter[parameter_name[q]].ascription=="3"){
    		name2[c]=parameter_name[q];
    		c++;
    	}else if(parameter[parameter_name[q]].ascription=="1"){
    		name1[g]=parameter_name[q];
    		g++;
    	}
    }
    Situation.hlwyw_id._1=name1;
    Situation.hlwyw_id._2=name2;
};
CIIENEW.Screen.prototype.initEcharts=function(ec){
	this.ec=ec;
	this.update();
};
CIIENEW.Screen.prototype.update=function(_hotspot){
	if(!utils.isStringEmpty(this.hotspot)){
		Situation.hotspot=this.hotspot;
	}
	this.updates();
};
CIIENEW.Screen.prototype.updates=function(){
	this.cdm.getIsmHotltewg({ids:Situation.hotspot},this.updatHotltewg.bind(this));
	this.cdm.getIsmHotgsm({ids:Situation.hotspot},this.updateHotgsm.bind(this));
	this.cdm.getThresCfg({},this.Cfg.bind(this));	
	this.DataHandler(this);
	this.hlwyw(this);
	this.Dist(this);
}
CIIENEW.Screen.prototype.Cfg=function(result){
	if(!jQuery.isEmptyObject(result)){
		if (result.success) {
			Situation.ThresCfg={};
			Situation.ThresCfg=result.data;
			Situation.TrendhlwywBool[2]=true;
		}	
	}
}
CIIENEW.Screen.prototype.updatHotltewg=function(result){
	if(!jQuery.isEmptyObject(result.data)){
		var name=Situation.hlwyw_id._1;
		var record=result.data;
		if(Situation.hotspot!=null){
			record=record[Situation.hotspot];
		}
		var arr="";
		var arr1="";
		for(var d=0;d<name.length;d++){
			arr={"id":name[d],"value":record[name[d]],"time":record.time,"tb":record[name[d]+"tb"],"hb":record[name[d]+"hb"],ds:record[name[d]+"_ds"]};
			if(utils.isStringEmpty(arr)){arr="---";}
			Situation.hlwyw.original[name[d]]=arr;
		}
		var id=["lte_flow_all","succconnestab","volte_voice_teletraffic"];
		for(var d=0;d<id.length;d++){
			arr1={"id":id[d],"value":record[id[d]],ds:record[id[d]+"dist"]};
			if(utils.isStringEmpty(arr1)){arr="---";}
			Situation.hlwyw.dist[id[d]]=arr1;
		}
		Situation.TrendhlwywBool[0]=true;
		Situation.dist[0]=true;
	}
}
CIIENEW.Screen.prototype.updateHotgsm=function(result){
	if(!jQuery.isEmptyObject(result.data)){
		var name=Situation.hlwyw_id._2;
		var record=result.data;
		if(Situation.hotspot!=null){
			record=record[Situation.hotspot];
		}
		var arr="";
		var arr1="";
		for(var d=0;d<name.length;d++){
			arr={"id":name[d],"value":record[name[d]],"time":record.time,"tb":record[name[d]+"tb"],"hb":record[name[d]+"hb"],ds:record[name[d]+"_ds"]};
			if(utils.isStringEmpty(arr)){arr="---";}
			Situation.hlwyw.original[name[d]]=arr;
		}
		var id=["gsm_teletraffic","gsm_flow_all"];
		for(var d=0;d<id.length;d++){
			arr1={"id":id[d],"value":record[id[d]],ds:record[id[d]+"dist"]};
			if(utils.isStringEmpty(arr1)){arr="---";}
			Situation.hlwyw.dist[id[d]]=arr1;
		}
		Situation.dist[1]=true;
		Situation.TrendhlwywBool[1]=true;	
	}
}
CIIENEW.Screen.prototype.updategsm=function(result){
	if(!jQuery.isEmptyObject(result.data)){
		var parameter=Situation.updategsm;
		var parameter_name=utils.getJsonName(parameter);
		var record=result.data;
		if(Situation.hotspot!=null){
			record=record[Situation.hotspot];
		}
		for(var d=0;d<parameter_name.length;d++){
			var arr=[];
			var g=1;
			if(parameter_name[d]=="gsm_flow_all"){g=1024;}
			for(var q=0;q<record.length;q++){
				if(!utils.isStringEmpty(record[q][parameter_name[d]])){record[q][parameter_name[d]]=record[q][parameter_name[d]]*g}
				else{record[q][parameter_name[d]]=record[q][parameter_name[d]]}
				if(!utils.isStringEmpty(record[q][parameter_name[d]+"tb"])){record[q][parameter_name[d]+"tb"]=record[q][parameter_name[d]+"tb"]*g}
				else{record[q][parameter_name[d]+"tb"]=record[q][parameter_name[d]+"tb"]}
				if(!utils.isStringEmpty(record[q][parameter_name[d]+"hb"])){record[q][parameter_name[d]+"hb"]=record[q][parameter_name[d]+"hb"]*g}
				else{record[q][parameter_name[d]+"hb"]=record[q][parameter_name[d]+"hb"]}
				arr[q]={"value":pmars.conversion(parameter[parameter_name[d]].company,record[q][parameter_name[d]]),"tb":pmars.conversion(parameter[parameter_name[d]].company,record[q][parameter_name[d]+"tb"]),"hb":pmars.conversion(parameter[parameter_name[d]].company,record[q][parameter_name[d]+"hb"]),"time":record[q].time};
			}
			Situation.room_gsm.Trend[parameter_name[d]]=arr;
		}
		Situation.TrendBool[0]=true;
	}
}
CIIENEW.Screen.prototype.updateHotlte=function(result){
	if(!jQuery.isEmptyObject(result.data)){
	var parameter=Situation.updateHotlte;
	var parameter_name=utils.getJsonName(parameter);
	var record=result.data;
	if(Situation.hotspot!=null){
		record=record[Situation.hotspot];
	}
	for(var d=0;d<parameter_name.length;d++){
		var arr=[];
		var g=1;
		if(parameter_name[d]=="lte_flow_all"){g=1024;}
		for(var q=0;q<record.length;q++){
			if(!utils.isStringEmpty(record[q][parameter_name[d]])){record[q][parameter_name[d]]=record[q][parameter_name[d]]*g}
			else{record[q][parameter_name[d]]=record[q][parameter_name[d]]}
			if(!utils.isStringEmpty(record[q][parameter_name[d]+"tb"])){record[q][parameter_name[d]+"tb"]=record[q][parameter_name[d]+"tb"]*g}
			else{record[q][parameter_name[d]+"tb"]=record[q][parameter_name[d]+"tb"]}
			if(!utils.isStringEmpty(record[q][parameter_name[d]+"hb"])){record[q][parameter_name[d]+"hb"]=record[q][parameter_name[d]+"hb"]*g}
			else{record[q][parameter_name[d]+"hb"]=record[q][parameter_name[d]+"hb"]}
			arr[q]={"value":pmars.conversion(parameter[parameter_name[d]].company,record[q][parameter_name[d]]),"tb":pmars.conversion(parameter[parameter_name[d]].company,record[q][parameter_name[d]+"tb"]),"hb":pmars.conversion(parameter[parameter_name[d]].company,record[q][parameter_name[d]+"hb"]),"time":record[q].time};
		}
		Situation.room_gsm.Trend[parameter_name[d]]=arr;
	}
	Situation.TrendBool[1]=true;
	}
}
CIIENEW.Screen.prototype.DataHandler=function(result){
	var Ecarts_1=setInterval(function() {
		var t=0
		for(var q=0;q<Situation.TrendBool.length;q++){
			if(Situation.TrendBool[q]==true){
				t++;
			}
		}
		if(t>=2){
			Situation.TrendBool=[];
			window.clearInterval(Ecarts_1);
			var s=$("#room_gsm_ul li").length;
			for(var f=0;f<s;f++){
				var Trendid=$("#"+$($($("#room_gsm_ul li")[f]).context.childNodes[1]).context.id).data("id");
				result.drawIntlTrend($($($("#room_gsm_ul li")[f]).context.childNodes[1]).context.id,Situation.room_gsm.Trend[Trendid]);
			}
		}
	}, 100);
};
CIIENEW.Screen.prototype.Dist=function(result){
	var Ecarts_3=setInterval(function() {
		var t=0
		for(var q=0;q<Situation.dist.length;q++){
			if(Situation.dist[q]==true){t++;}
		}
		if(t>=2){
			Situation.dist=[];
			window.clearInterval(Ecarts_3);	
			Situation.room_gsm.data={};
			Situation.room_gsm.slidePosition=1;
			Situation.room_gsm.Roll_bool=false;
			Situation.room_gsm.data.length=5;
			Situation.room_gsm.time=20000;
			Situation.room_gsm.display=false;
			Situation.room_gsm.display=true;
			Situation.room_gsm.name=["","","",""];
			Situation.room_gsm.span=["","","","","",""];
			Situation.DataHandler_boo=false
			var id=["lte_flow_all","gsm_flow_all","gsm_teletraffic","volte_voice_teletraffic","succconnestab"];
			var Localclass='room_gsm';
			var htmlStr='<div><img id="Website_left" onclick="situation_left_click('+Localclass+')" src="'+eastcom.baseURL+'/static/images/overview/L2.png" style="cursor:pointer;z-index: 10; position: absolute;left: 800px; top:-35px;width: 40px;height:40px"><img id="Website_right" onclick="situation_right_click('+Localclass+')" src="'+eastcom.baseURL+'/static/images/overview/R2.png" style="cursor:pointer;z-index: 10; position: absolute;left: 884px;top:-35px; width: 40px;height:40px"></div>\
			<div style="width:32px;height:32px;float: right; z-index: 10; position: absolute;left: 845px; top: -32px;background-color:#294FC7;border-radius: 15px;"><div style="font-size: 20px;z-index: 10; position: absolute;left: 8px;top:2px;"><span  id="room_gsm_current_page_span" style="margin-left:2px;">'+Situation.room_gsm.slidePosition+'</span></div></div>';
			$("#room_gsm_switch").empty();
			document.getElementById("room_gsm_switch").innerHTML = htmlStr;
			var u="";
			for(var q=0;q<id.length;q++){
				var html="";
				html+='<div style="position: relative;font-size: 20px;right: 30px;margin-top: 10px;z-index:10;float: right;cursor:pointer;"><span id="'+id[q]+'_ecarts_val"style="margin-right: 20px;">当前值:---</span><span>|</span><span id="'+id[q]+'_ecarts_val2" style="margin-left: 20px;">今日累计值:---</span></div>';
				html+='<div id="'+id[q]+'" data-id="'+id[q]+'" style="width:960px;height:300px;position: absolute;"></div>';
				u+='<li class="carousel-item">'+html+'</li>'
			}
			var htmlStr='<ul class="carousel-inner" id="room_gsm_ul" data-ecarts="false" style="height:300px;position: absolute;">'+u+'</ul>'
			$("#room_gsm").empty();
			document.getElementById("room_gsm").innerHTML = htmlStr;
			$("#carousel_1").FtCarousel({index: 0,auto: false});
			var s=$("#room_gsm_ul li").length;
			$($($("#room_gsm_ul li")[s-1]).context.childNodes[1]).attr("id",$($($("#room_gsm_ul li")[s-1]).context.childNodes[1]).context.id+"_auxiliary");
			$($($("#room_gsm_ul li")[0]).context.childNodes[1]).attr("id",$($($("#room_gsm_ul li")[0]).context.childNodes[1]).context.id+"_auxiliary");
			$($($($("#room_gsm_ul li")[s-1]).context.childNodes[0]).context.childNodes[0]).attr("id",$($($($("#room_gsm_ul li")[s-1]).context.childNodes[0]).context.childNodes[0]).context.id+"_auxiliary");
			$($($($("#room_gsm_ul li")[s-1]).context.childNodes[0]).context.childNodes[2]).attr("id",$($($($("#room_gsm_ul li")[s-1]).context.childNodes[0]).context.childNodes[2]).context.id+"_auxiliary");
			$($($($("#room_gsm_ul li")[0]).context.childNodes[0]).context.childNodes[0]).attr("id",$($($($("#room_gsm_ul li")[0]).context.childNodes[0]).context.childNodes[0]).context.id+"_auxiliary");
			$($($($("#room_gsm_ul li")[0]).context.childNodes[0]).context.childNodes[2]).attr("id",$($($($("#room_gsm_ul li")[0]).context.childNodes[0]).context.childNodes[2]).context.id+"_auxiliary");
			for(var q=0;q<id.length;q++){
				var value0="";var value1="";var company0="";var company1="";
				if(id[q]=="gsm_teletraffic"||id[q]=="volte_voice_teletraffic"){
					var json0=pmars.ErlConversion(Situation.hlwyw.dist[id[q]].value);
					var json1=pmars.ErlConversion(Situation.hlwyw.dist[id[q]].ds);
				}else if(id[q]=="succconnestab"){
					var json0=pmars.NumberConversion(Situation.hlwyw.dist[id[q]].value);
					var json1=pmars.NumberConversion(Situation.hlwyw.dist[id[q]].ds);
				}else if(id[q]=="lte_flow_all"){
					var json0=pmars.FlowConversion(Situation.hlwyw.dist[id[q]].value*1024);
					var json1=pmars.FlowConversion(Situation.hlwyw.dist[id[q]].ds*1024);
				}else if(id[q]=="gsm_flow_all"){
					var json0=pmars.FlowConversion(Situation.hlwyw.dist[id[q]].value*1024);
					var json1=pmars.FlowConversion(Situation.hlwyw.dist[id[q]].ds*1024);
				}
				if(id[q]=="lte_flow_all"){Situation.room_gsm.span[1]="4G流量("+json0.company+")";$("#room_gsm_div_span").text("4G流量("+json0.company+")");Situation.updateHotlte.lte_flow_all={id:"lte_flow_all",company:"("+json0.company+")"}}
				else if(id[q]=="gsm_flow_all"){Situation.room_gsm.span[2]="2G流量("+json0.company+")";Situation.updategsm.gsm_flow_all={id:"gsm_flow_all",company:"("+json0.company+")"}}
				else if(id[q]=="gsm_teletraffic"){Situation.room_gsm.span[3]="2G话务量("+json0.company+")";Situation.updategsm.gsm_teletraffic={id:"gsm_teletraffic",company:"("+json0.company+")"}}
				else if(id[q]=="volte_voice_teletraffic"){Situation.room_gsm.span[4]="VoLTE话务量("+json0.company+")";Situation.updateHotlte.volte_voice_teletraffic={id:"volte_voice_teletraffic",company:"("+json0.company+")"}}
				else if(id[q]=="succconnestab"){Situation.room_gsm.span[5]="RRC有效连接数("+json0.company+")";Situation.updateHotlte.succconnestab={id:"succconnestab",company:"("+json0.company+")"}}
				$("#"+id[q]+"_ecarts_val_auxiliary").text("当前值:"+json0.value+json0.company);
				$("#"+id[q]+"_ecarts_val2_auxiliary").text("今日累计值:"+json1.value+json1.company);
				$("#"+id[q]+"_ecarts_val").text("当前值:"+json0.value+json0.company);
				$("#"+id[q]+"_ecarts_val2").text("今日累计值:"+json1.value+json1.company);
			}
			result.DataHandler(result);
			result.cdm.getIsmHotgsmTrend({ids:result.hotspot},result.updategsm.bind(this));
			result.cdm.getIsmHotlteTrend({ids:result.hotspot},result.updateHotlte.bind(this));
		}
	}, 100);
}

CIIENEW.Screen.prototype.hlwyw=function(result){
	var html="";
	var parameter = eval("(" + pmars.hlwyw() + ")");
    var parameter_name = utils.getJsonName(parameter);
	var Ecarts_2=setInterval(function() {
		var t=0
		for(var q=0;q<Situation.TrendhlwywBool.length;q++){
			if(Situation.TrendhlwywBool[q]==true){
				t++;
			}
		}
		if(t>=3){
			window.clearInterval(Ecarts_2);
			Situation.TrendhlwywBool=[];
			 for(var q=0;q<parameter_name.length;q++){
		    	html+='<div><div style="width: 215px;height:270px;margin-right:20px;background-color: rgba(0, 102, 255, 0.15);float:left" onmouseout="_mouseout(this)">';
		    	html+='<div style="width: 215px;height:215px;" onmouseout="_mouseout(this)" id="'+parameter_name[q]+'_ecarts"></div>';
		    	html+='<div style="width: 207px;height:30px;text-align: center;line-height: 30px;font-size: 24px;">'+parameter[parameter_name[q]].auxiliary+'</div>';
		    	html+='<div style="width: 207px;height:30px;text-align: center;line-height: 30px;font-size: 34px;color: #66E6FF;top: -120px;position: relative;cursor: pointer;" onmouseover="_onmouseover(this);" data-length="'+(q+1)+'"  data-id="'+parameter_name[q]+'">'+Situation.hlwyw.original[parameter_name[q]].value+parameter[parameter_name[q]].company_auxiliary+'</div>';
		    	html+='</div></div>';
			  }
	     	  $("#hlwzl").empty();
	     	  document.getElementById("hlwzl").innerHTML = html;
		      for(var q=0;q<parameter_name.length;q++){
		     	var color="";
		     	var classification = eval("(" + pmars.classification_guarantee() + ")")[parameter_name[q]];
                if (parameter[parameter_name[q]].Tparticle > 59) {
                    ThresCfgName_time = "小时";
                } else {
                    ThresCfgName_time = parameter[parameter_name[q]].Tparticle + "分钟";
                }
                var ThresCfgName = "[" + classification.classification + "]-[" + classification.name + "]-[" + ThresCfgName_time + "]-[" + classification.Belonged + "]";
                var level = Situation.ThresCfg[ThresCfgName];
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
                if(!utils.isStringEmpty(level)){
                    if (min2 <= Situation.hlwyw.original[parameter_name[q]].value && Situation.hlwyw.original[parameter_name[q]].value < max2) {
                        color = "#FF8C00";
                    } else if (min1 <= Situation.hlwyw.original[parameter_name[q]].value && Situation.hlwyw.original[parameter_name[q]].value < max1) {
                        color = "#da6d6d";
                    } else {
                        color = "#00FF00";
                    }
                 }else{
                      color = "#00FF00";
                }
                CIIENEW.Screen.prototype.drahlwyw(parameter_name[q],Situation.hlwyw.original[parameter_name[q]].value,color);
			}
		}
	}, 100);
}
CIIENEW.Screen.prototype.drawIntlTrend=function(id,result){
	var list=result;
	if(list==null){
		list=[];
	}
	var xArr=[];
	var userArr=[];
	var userArrLast=[];
	for(var i=0;i<list.length;i++){
		var record=list[i];
		xArr.push(record.time.substring(11,16));
		userArr.push(record.value==null?"":record.value);
		userArrLast.push(record.tb==null?"":record.tb);
	}
	var option = {
			color:['#ffa526','#1991e9','#1991e9'],
		    title : {
		        show:false
		    },
		    tooltip : {
		        trigger: 'axis'
		    },
		    legend: {
		    	x:'110',
		        data:['今日','6日'],
		        textStyle:{color:'#ffffff',fontSize:20}
		    },
		    toolbox: {
		        show : false
		    },
		    calculable : false,
		    animation:false,
	   		addDataAnimation: false,
		    grid:{borderWidth:0,x:100,y:55,x2:30,y2:30},
		    xAxis : [
		        {
		            type : 'category',
		            data : xArr,
		            axisLine:{show:true,lineStyle:{color:'#adc7dd'}},
		            axisLabel:{textStyle:{color:'#adc7dd',fontSize:20}},
		            splitLine:{show:false},
		            axisTick:{show:true,lineStyle:{color:'#adc7dd'}}
		        }
		    ],
		    yAxis : [
		        {
		        	type : 'value',
		            axisLine:{show:false},
		            splitLine:{show:false},
		            axisLabel:{textStyle:{color:'#adc7dd',fontSize:20}},
		            axisTick:{show:true,lineStyle:{color:'#adc7dd'}},
		            scale:true,
		            splitNumber:2,
		            min: function(value) {
		            	var min=0;
		            	return min;
		            },
		            max:function(value) {
		            	var max=Math.ceil(value.max);
		            	return max;
		        }
		      }
		    ],
		    series : [{
	        	name:'今日',
	        	fontSize : 20,// 文字的字体大小
	            type:'line',
	            symbol:'emptyCircle',
	            data:userArr,
	            symbolSize:[5,5],
	            smooth:true,
	            itemStyle:{normal:{lineStyle:{width:2}}}
	        },{
		            name:'6日',
		        	fontSize : 20,// 文字的字体大小
		            type:'line',
		            symbol:'emptyCircle',
		            //showAllSymbol:true,
		            symbolSize:[5,5],
		            data:userArrLast,
		            smooth:true,
		            itemStyle:{normal:{lineStyle:{width:2},areaStyle:{color : 'rgba(25,145,233,0.3)'}}}
		    }]
		};
	echarts.init(id,option);
};
CIIENEW.Screen.prototype.drahlwyw=function(id,value,clolor){
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
		                color: [[value, clolor], [1, "#dce3ec"]] //0.298是百分比的比例值（小数），还有对应两个颜色值
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
	echarts.init(id+"_ecarts",option);
};
require.config({  
	paths: {  
	    echartsMin: eastcom.baseURL+'/scripts/local-lsm/overview/echarts.min'
    }  
});  
var echarts = {
		init: function (chartId, option) {//初始化方法
			require(['echartsMin','echarts/chart/line', 'echarts/chart/pie' ],initEcharts);function initEcharts(ec){
			var chart0=ec.init(document.getElementById(chartId),'marcarons');
			chart0.setOption(option);
		};	
	}
}
function _onmouseover(obgect){
	var length=$(obgect).data("length");
	var Location=eval("(" + Popoverposition.hlwzl() + ")");
	var parameter = eval("(" + pmars.hlwyw() + ")");
	var classification=eval("(" + pmars.classification_guarantee() + ")");
	Popover2.popover(Situation.hlwyw.original[$(obgect).data("id")],Location[length],parameter);
}
function  _mouseout(obgect){
	$("#popover").empty();
}
