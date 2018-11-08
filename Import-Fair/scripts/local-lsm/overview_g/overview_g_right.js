var CIIENEW=CIIENEW||{};
CIIENEW.GroupScreenOv=function ()
{
	this.initialize.apply(this,arguments);
};
CIIENEW.GroupScreenOv.prototype.constructor=CIIENEW.GroupScreenOv;
CIIENEW.GroupScreenOv.prototype.chartLabelSize=16;
CIIENEW.GroupScreenOv.prototype.ringDataCache={};
CIIENEW.GroupScreenOv.prototype.ringConfig=[
  {id:'play_succ_rate',name:'互联网电视播放成功率',Tparticle:1440,source : "网管"},
  {id:'play_res_delay',name:'电视播放响应时长',Tparticle:60,source : "网管"},
  {id:'screen_jammed_users_ratio',name:'无卡顿次数占比',Tparticle:60,source : "网管"},
  {id:'sjdr',name:'无卡顿时长占比',Tparticle:60,source : "网管"}
];
var Situation={};
CIIENEW.GroupScreenOv.prototype.initialize=function(){
	Situation.jkzl_g={};
	Situation.jkzl_g.data={};
	Situation.jkzl_g.slidePosition=1;
	Situation.jkzl_g.Roll_bool=false;
	Situation.jkzl_g.data.length=2;
	Situation.jkzl_g.time=20000;
	Situation.jkzl_g.name=["","","",""];
/*	var Localclass='jkzl_g';
	var htmlStr='<div><img id="Website_left" onclick="situation_left_click(' + Localclass + ')" src="'+eastcom.baseURL+'/static/images/overview/L2.png" style="cursor:pointer;z-index: 10; position: absolute;left: 800px; top:-35px;width: 40px;height:40px"><img id="Website_right" onclick="situation_right_click('+Localclass+')" src="'+eastcom.baseURL+'/static/images/overview/R2.png" style="cursor:pointer;z-index: 10; position: absolute;left: 884px;top:-35px; width: 40px;height:40px"></div>\
	<div style="width:32px;height:32px;float: right; z-index: 10; position: absolute;left: 845px; top: -32px;background-color:#294FC7;border-radius: 15px;"><div style="font-size: 20px;z-index: 10; position: absolute;left: 8px;top:2px;"><span  id="jkzl_g_current_page_span" style="margin-left:2px;" data-span="true">'+Situation.jkzl_g.slidePosition+'</span></div></div>';
	$("#jkzl_g_switch").empty();*/
	/*document.getElementById("jkzl_g_switch").innerHTML = htmlStr;*/
	this.cdm=LSMScreen.CacheDataManager.getInstance();
	this.initRings();
	setInterval(function() {this.initRings();}, 200000);
	require(['echarts','echarts/chart/bar','echarts/chart/pie'],this.initEcharts.bind(this));
	
};
CIIENEW.GroupScreenOv.prototype.initRings=function(){
	var list=this.ringConfig;
	var html='';
	var id=CIIENEW.GroupScreenOv.prototype.ringConfig;
	var k=parseInt(parseInt(id.length)/4);
	(parseInt(id.length)%4==0)? k:k++;
	var q=[];
	var x=0;
	var j=0;
	var arr=0;
	var u="";
	for (var h=0;h<k;h++){
		h<parseInt(parseInt(id.length)/4)?q[h]=4:q[h]=parseInt(id.length)%4;
		arr=q[h];
		for(var n=0;n<arr;n++){
			if(!utils.isStringEmpty(pmars.shield()[id[x]])){q[h]=q[h]-1;}x++;
		}
	}
	for(var g=0;g<k;g++){
		var html = '';
		for (var c=0;c<q[g];c++){
			var record=list[j];
			var item='<div class="bg-frame-round" style="width:228px;margin-right:12px;float: left;" onmouseout="mouseout(this)">'
				+'<div style="position:relative;width:100%;height:200px;">'
					+'<div class="bg-circle"></div>'
					+'<div id="chartc_'+record.id+'" style="width:225px;height:200px;"></div>'
					+'<div class="bg-circle" style="padding-top:35px;background:none;text-align:center;cursor: pointer;">'
						+'<div onmouseover="_onmouseover(this);" data-id="'+record.id+'" data-length="'+(c+1)+'" ><span id="valuec_'+record.id+'" class="ciiekpistyle fontImportantInfo">--</span></div>'
						+'<div class="fontUnitTime" id="ratioc_'+record.id+'">--</div>'
					+'</div>'
				+'</div>'
				+'<div id="titlec'+j+'" class="fontSubInfo2" style="width:100%;text-align:center;padding:0 40px 0 40px;">'
				+record.name
				+'</div>'
				+'</div>';
			html+=item;
			j++;
		}
		u+='<li class="carousel-item" style="margin-top: 20px;">'+html+'</li>'
	}
	var htmlStr='<ul class="carousel-inner" data-ecarts="false" id="jkzl_g_ul" >'+u+'</ul>'
	
	$('#jkzl_g').html(htmlStr);
	$("#carousel_2").FtCarousel({index: 0,auto: false});
	var Localclass='jkzl_g';
	$("#jkzl_div").html("家宽质量");
	var s=$("#jkzl_g_ul li").length;
	for(var q=0;q<$($("#jkzl_g_ul li")[0]).context.childNodes.length;q++){
		$($($($($("#jkzl_g_ul li")[0]).context.childNodes[q]).context.childNodes[0]).context.childNodes[1]).attr("id",$($($($("#jkzl_g_ul li")[0]).context.childNodes[q]).context.childNodes[0]).context.childNodes[1].id+"_auxiliary");
		$($($($($($($("#jkzl_g_ul li")[0]).context.childNodes[q]).context.childNodes[0]).context.childNodes[2]).context.childNodes[0]).context.childNodes[0]).attr("id",$($($($($($("#jkzl_g_ul li")[0]).context.childNodes[q]).context.childNodes[0]).context.childNodes[2]).context.childNodes[0]).context.childNodes[0].id+"_auxiliary");
		$($($($($($("#jkzl_g_ul li")[0]).context.childNodes[q]).context.childNodes[0]).context.childNodes[2]).context.childNodes[1]).attr("id",$($($($($("#jkzl_g_ul li")[0]).context.childNodes[q]).context.childNodes[0]).context.childNodes[2]).context.childNodes[1].id+"_auxiliary");
	}
	for(var q=0;q<$($("#jkzl_g_ul li")[s-1]).context.childNodes.length;q++){
		$($($($($("#jkzl_g_ul li")[s-1]).context.childNodes[q]).context.childNodes[0]).context.childNodes[1]).attr("id",$($($($("#jkzl_g_ul li")[s-1]).context.childNodes[q]).context.childNodes[0]).context.childNodes[1].id+"_auxiliary");
		$($($($($($($("#jkzl_g_ul li")[s-1]).context.childNodes[q]).context.childNodes[0]).context.childNodes[2]).context.childNodes[0]).context.childNodes[0]).attr("id",$($($($($($("#jkzl_g_ul li")[s-1]).context.childNodes[q]).context.childNodes[0]).context.childNodes[2]).context.childNodes[0]).context.childNodes[0].id+"_auxiliary");
		$($($($($($("#jkzl_g_ul li")[s-1]).context.childNodes[q]).context.childNodes[0]).context.childNodes[2]).context.childNodes[1]).attr("id",$($($($($("#jkzl_g_ul li")[s-1]).context.childNodes[q]).context.childNodes[0]).context.childNodes[2]).context.childNodes[1].id+"_auxiliary");
	}
	this.cdm.getFbbWg({},this.ringDataHandler.bind(this));
};
CIIENEW.GroupScreenOv.prototype.initEcharts=function(ec){
	this.ec=ec;
	this.update();
};
CIIENEW.GroupScreenOv.prototype.update=function(){
	this.cdm.getSplineStatistic({type:'全网'},this.statisticDataHandler.bind(this));
	this.cdm.getFbbWg({},this.fbbDataHandler.bind(this));

};
CIIENEW.GroupScreenOv.prototype.ringDataHandler=function(result){
	this.updateRing(result.data);
};
CIIENEW.GroupScreenOv.prototype.updateRing=function(data){
	this.FbbWg=data;
	this.cdm.getFbbWgH({},this.updateRings.bind(this));
};
CIIENEW.GroupScreenOv.prototype.updateRings=function(data){
	var arr={};
	Situation.jkzl_g.classification={}; 
	Situation.jkzl_g.arr={};
	var parameter={
			play_succ_rate:{id:'play_succ_rate',name:'互联网电视播放成功率',Tparticle:1440,source : "网管",ascription:"1",company_auxiliary:"%",company_auxiliary_original:"(%)"},
			play_res_delay:{id:'play_res_delay',name:'电视播放响应时长',Tparticle:60,source : "网管",ascription:"2",company_auxiliary:"ms",company_auxiliary_original:"(us)"},
			screen_jammed_users_ratio:{id:'screen_jammed_users_ratio',name:'无卡顿次数占比',Tparticle:60,source : "网管",ascription:"2",company_auxiliary:"%",company_auxiliary_original:"(%)"},
			sjdr:{id:'sjdr',name:'无卡顿时长占比',Tparticle:60,source : "网管",ascription:"2",company_auxiliary:"%",company_auxiliary_original:"(%)"}
	};
	Situation.Rings=parameter;
	var parameter_name=utils.getJsonName(parameter);
	var Wg_id=[];var WgH_id=[];var id=[];var a=0;var b=0;
	var toshieldnumber=0;
	for(var pm=0;pm<parameter_name.length;pm++){
		if(parameter[parameter_name[pm]].ascription=="1"){
			Wg_id[a]=parameter_name[pm];a++;
			Situation.jkzl_g.classification.Wg_id=Wg_id;
		}else if(parameter[parameter_name[pm]].ascription=="2"){
			WgH_id[b]=parameter_name[pm];b++;
			Situation.jkzl_g.classification.WgH_id=WgH_id;
		}
		if(utils.isStringEmpty(pmars.Family_shield()[parameter_name[pm]])){id[toshieldnumber]=parameter_name[pm];toshieldnumber++;}
	}
	for(var q=0;q<Situation.jkzl_g.classification.Wg_id.length;q++){
		arr[Situation.jkzl_g.classification.Wg_id[q]]={value:this.FbbWg[Situation.jkzl_g.classification.Wg_id[q]],hb:this.FbbWg[Situation.jkzl_g.classification.Wg_id[q]+"hb"],tb:this.FbbWg[Situation.jkzl_g.classification.Wg_id[q]+"tb"],id:Situation.jkzl_g.classification.Wg_id[q],time:this.FbbWg.time};
	}
	for(var q=0;q<Situation.jkzl_g.classification.WgH_id.length;q++){
		arr[Situation.jkzl_g.classification.WgH_id[q]]={value:data.data[Situation.jkzl_g.classification.WgH_id[q]],hb:data.data[Situation.jkzl_g.classification.WgH_id[q]+"hb"],tb:data.data[Situation.jkzl_g.classification.WgH_id[q]+"tb"],id:Situation.jkzl_g.classification.WgH_id[q],time:data.data.time};
	}
	Situation.jkzl_g.arr=arr;
	var list=this.ringConfig;
	for(var i=0;i<list.length;i++){
		var record=list[i];
		var kpiKey=record.id;
		if(!utils.isStringEmpty(arr[kpiKey])){
			var value=arr[kpiKey].value;
			var hb=arr[kpiKey].hb;
			if(kpiKey=="onu_op_qualification_ratio"){
				value=98.44;hb=98.18;
			}
			var chartId='chartc_'+kpiKey;
			var proportion=pmars.proportion(parameter[kpiKey].company_auxiliary_original,value,hb);//获取当前的环比
			var value_auxiliary=pmars.conversion(parameter[kpiKey].company_auxiliary_original,value);//格式当信息
			var showRatio=0;
			if(proportion.bool==0){
				showRatio="+"+proportion.value;
			}else if(proportion.bool==1){
				showRatio="-"+proportion.value;
			}
			if(kpiKey=="screen_jammed_users_ratio"||kpiKey=="sjdr"){
				value=100-value;
				value_auxiliary=pmars.conversion(parameter[kpiKey].company_auxiliary_original,value);//格式当信息
				if(proportion.bool==0){
					showRatio="-"+proportion.value;
				}else if(proportion.bool==1){
					showRatio="+"+proportion.value;
				}
			}
			$('#valuec_'+kpiKey).text(value_auxiliary+parameter[kpiKey].company_auxiliary);
			$('#ratioc_'+kpiKey).text(showRatio);
			
			$('#valuec_'+kpiKey+"_auxiliary").text(value_auxiliary+parameter[kpiKey].company_auxiliary);
			$('#ratioc_'+kpiKey+"_auxiliary").text(showRatio);
			
			this[chartId]=this.ec.init($('#'+chartId)[0],'marcarons');
			this[chartId+"_auxiliary"]=this.ec.init($('#'+chartId+"_auxiliary")[0],'marcarons');
			if(value>100){value=50;}
			this[chartId].setOption(this.getRingOption(value),true);
			this[chartId+"_auxiliary"].setOption(this.getRingOption(value),true);
		}
	}
};
CIIENEW.GroupScreenOv.prototype.statisticDataHandler=function(result){
	if(result.data!=null){
		record=result.data;
		$('#allCustomer').text((record.cust_nums/10000).toFixed(2));
		$('#allSpline').text((record.line_nums/10000).toFixed(2));
		
		if(record.fault_line_nums>0){$('#faultSpline').css("color","#da6d6d");$('#faultSpline_span').css("color","#da6d6d")}else{$('#faultSpline').css("color","#66E6FF");$('#faultSpline_span').css("color","#66E6FF");};
		if(record.fault_cust_nums>0){$('#faultCustomer').css("color","#da6d6d");$('#faultCustomer_span').css("color","#da6d6d")}else{$('#faultCustomer').css("color","#66E6FF");$('#faultCustomer_span').css("color","#66E6FF")};
		
		if(record.cust_nums>0){$('#allCustomer').css("color","#00FF00");$('#allCustomer_span').css("color","#00FF00")}else{$('#allCustomer').css("color","#66E6FF");$('#allCustomer_span').css("color","#66E6FF");};
		if(record.line_nums>0){$('#allSpline').css("color","#00FF00");$('#allSpline_span').css("color","#00FF00")}else{$('#allSpline').css("color","#66E6FF");$('#allSpline_span').css("color","#66E6FF")};
		
		$('#faultSpline').text(record.fault_line_nums);
		$('#faultCustomer').text(record.fault_cust_nums);
		
	}
};

CIIENEW.GroupScreenOv.prototype.fbbDataHandler=function(result){
	var parameter=eval("("+pmars.jtyw_g()+")");
	var parameter_name=utils.getJsonName(parameter);
	var Localclass='jtyw_g';
	Situation.jtyw_g={};
	Situation.jtyw_g.data={};
	Situation.jtyw_g.slidePosition=1;
	Situation.jtyw_g.Roll_bool=false;
	Situation.jtyw_g.data.length=2;
	Situation.jtyw_g.time=20000;
	Situation.jtyw_g.name=["","","",""];
	var htmlStr='<div><img id="Website_left" onclick="situation_left_click('+Localclass+')" src="'+eastcom.baseURL+'/static/images/overview/L2.png" style="cursor:pointer;z-index: 10; position: absolute;left: 800px; top:-35px;width: 40px;height:40px"><img id="Website_right" onclick="situation_right_click('+Localclass+')" src="'+eastcom.baseURL+'/static/images/overview/R2.png" style="cursor:pointer;z-index: 10; position: absolute;left: 884px;top:-35px; width: 40px;height:40px"></div>\
	<div style="width:32px;height:32px;float: right; z-index: 10; position: absolute;left: 845px; top: -30px;background-color:#294FC7;border-radius: 15px;"><div style="font-size: 20px;z-index: 10; position: absolute;left: 8px;top:2px;"><span  id="jtyw_g_current_page_span" style="margin-left:2px;">'+Situation.jtyw_g.slidePosition+'</span></div></div>';
	$("#jtyw_g_switch").empty();
	document.getElementById("jtyw_g_switch").innerHTML = htmlStr;
	var u="";
	var record=result.data;
	if(!utils.isStringEmpty(record)){
		for(var q=0;q<parameter_name.length;q++){
			var html="";
			for(var g=0;g<2;g++){
				var display="";var _class="";var color="#da6d6d";var ydyw_img="";
				var value_auxiliary=pmars.conversion(parameter[parameter_name[q+g]].company,record[parameter_name[q+g]]);//格式当信息
				var proportion=pmars.proportion(parameter[parameter_name[q+g]].company,record[parameter_name[q+g]],record[parameter_name[q+g]+"hb"]);//获取当前的环比
				if(proportion.bool==0){
					if(proportion.value_auxiliary>=50){ydyw_img=eastcom.baseURL+"/static/styles/local-lsm/ciienew/images/red.png";color="#da6d6d";_class="rotate";_class_span="rotate_span";}
					else{ydyw_img=eastcom.baseURL+"/static/styles/local-lsm/ciienew/images/green.png";color="#00FF00";_class="";_class_span="";}}
				else if(proportion.bool==1){
					if(proportion.value_auxiliary>=50){color="#da6d6d";ydyw_img=eastcom.baseURL+"/static/styles/local-lsm/ciienew/images/red.png";_class="";_class_span="";}
					else{ydyw_img=eastcom.baseURL+"/static/styles/local-lsm/ciienew/images/green.png";color="#00FF00";_class="rotate";_class_span="rotate_span";}}
				else{color="#00FF00";display="none"};
				html+='<div class="horizontalRow" style="margin-top:15px;">';
				html+='<div class="bg-fckpiblock">';
				html+='<div style="text-align:center;width:100%;height:105px;padding-top:5px;">';
				html+='<div class="horizontalRow" style="display: flex;align-items: center; justify-content: center;">';
				html+='<div id="'+parameter_name[q+g]+'_value" class="ciiekpistyle fontImportantInfo">'+value_auxiliary+'</div>';
				html+='<div class="ciiekpistyle fontUnitTime" style="margin-top:10px;margin-left:5px;">万人</div></div>';
				html+='<div class="horizontalRow" style="display: flex;align-items: center; justify-content: center;">';
				html+='<img id="'+parameter_name[q+g]+'_img" src="'+ydyw_img+'" style="width:20px;height:20px;display:'+display+'" class="'+_class+'"><span style="font-size: 32px;color:'+color+'" id="'+parameter_name[q+g]+'_value_tb" >'+proportion.value+'</span></div></div>';
				html+='<div class="fontSubInfo2" style="text-align:center;width:100%;font-size: 20px;margin-top: 7px;">'+parameter[parameter_name[q+g]].auxiliary+'</div></div>';
				html+='<div class="bg-frame" style="margin-left:245px;margin-top: -150px;">';
				html+='<div class="horizontalRow">';
				html+='<div id="chart0_title" class="fontSubInfo2" style="width:69%;text-indent:15px;">'+parameter[parameter_name[q+g]].auxiliary+parameter[parameter_name[q+g]].company+'</div>';
				html+='<div id="'+parameter_name[q+g]+'_new" class="fontSubInfo2" style="width:30%;text-align:right;">当前值:'+value_auxiliary+'</div></div>';
				html+='<div id="'+parameter_name[q+g]+'_ecarts" style="width:100%;height:120px;"></div></div></div>';
			}
			q++;
			u+='<li class="carousel-item">'+html+'</li>'
	
		}
	}
	var htmlStr='<ul class="carousel-inner" id="jtyw_g_ul" data-ecarts="false">'+u+'</ul>'
	$("#jtyw_g").empty();
	document.getElementById("jtyw_g").innerHTML = htmlStr;
	$("#carousel_1").FtCarousel({index: 0,auto: false});
	var s=$("#jtyw_g_ul li").length;
	if(parameter_name.length>2){
		$($($($($("#jtyw_g_ul li")[s-1]).context.childNodes[0]).context.childNodes[1]).context.childNodes[1]).attr("id",$($($($("#jtyw_g_ul li")[s-1]).context.childNodes[0]).context.childNodes[1]).context.childNodes[1].id+"_auxiliary");
		$($($($($("#jtyw_g_ul li")[s-1]).context.childNodes[1]).context.childNodes[1]).context.childNodes[1]).attr("id",$($($($("#jtyw_g_ul li")[s-1]).context.childNodes[1]).context.childNodes[1]).context.childNodes[1].id+"_auxiliary");
	}
	$($($($($("#jtyw_g_ul li")[0]).context.childNodes[0]).context.childNodes[1]).context.childNodes[1]).attr("id",$($($($("#jtyw_g_ul li")[0]).context.childNodes[0]).context.childNodes[1]).context.childNodes[1].id+"_auxiliary");
	$($($($($("#jtyw_g_ul li")[0]).context.childNodes[1]).context.childNodes[1]).context.childNodes[1]).attr("id",$($($($("#jtyw_g_ul li")[0]).context.childNodes[1]).context.childNodes[1]).context.childNodes[1].id+"_auxiliary");
	this.cdm.getFbbWgTrend({},this.fbbTrendDataHandler.bind(this));
	this.updateRing(record);
};

CIIENEW.GroupScreenOv.prototype.fbbTrendDataHandler=function(result){
	var list=result.data;
	if(list==null) list=[];
	var parameter=eval("("+pmars.jtyw_g()+")");
	var parameter_name=utils.getJsonName(parameter);
	for(var q=0;q<parameter_name.length;q++){
		this.chart0=this.ec.init($("#"+parameter_name[q]+"_ecarts")[0],'marcarons');
		this.chart1=this.ec.init($("#"+parameter_name[q+1]+"_ecarts")[0],'marcarons');
		var xArr=[];
		var data0=[];
		var data1=[];
		for(var i=0;i<list.length;i++){
			var record=list[i];
			var time=record.time;
			var showTime=time.substring(5, 10);
			xArr.push(showTime);
			data0.push(pmars.conversion(parameter[parameter_name[q]].company,record[parameter_name[q]]));
			data1.push(pmars.conversion(parameter[parameter_name[q+1]].company,record[parameter_name[q+1]]));
		}
		if(q==0||q==parameter_name.length-2){
			this.chart2=this.ec.init($("#"+parameter_name[q]+"_ecarts_auxiliary")[0],'marcarons');
			this.chart3=this.ec.init($("#"+parameter_name[q+1]+"_ecarts_auxiliary")[0],'marcarons');
			var option2=this.getEchartsOption(xArr,data0,'#00d8ff');
			var option3=this.getEchartsOption(xArr,data1,'#72d427');
			this.chart2.setOption(option2,true);
			this.chart3.setOption(option3,true);
		}
		var option0=this.getEchartsOption(xArr,data0,'#00d8ff');
		var option1=this.getEchartsOption(xArr,data1,'#72d427');
		this.chart0.setOption(option0,true);
		this.chart1.setOption(option1,true);
		q++;
	}
};
CIIENEW.GroupScreenOv.prototype.getRingOption=function(value){
	var option = {
			color:['#009bfd','#0a2750'],
		    title : {
		        show:false
		    },
		    tooltip : {
		    	show:false
		    },
		    legend: {
		        data:['指标值'],
		        textStyle:{color:'#ffffff',fontSize:this.chartLabelSize},
		        show:false
		        
		    },
		    toolbox: {
		        show : false
		    },
		    calculable : false,
		    series : [{
	            name:'指标值',
	            type:'pie',
	            radius : [80, 90],
	            center:['51%','51%'],
	            startAngle:45,
	            // for funnel
	            x: '60%',
	            width: '45%',
	            funnelAlign: 'left',
	            data:[{value:value,name:'指标值'},{value:100-value,name:''}],
	            itemStyle:{
	            	normal:{
	            		label:{
	            			show:false,
	            			formatter:'{d}%\n{b}',
	            			textStyle:{color:'#ffffff',fontSize:this.chartLabelSize}
	            		},labelLine:{
	            			show:false
	            		}
	            		
	            	}
	            }
	        }]
		};
	return option;
};

CIIENEW.GroupScreenOv.prototype.getEchartsOption=function(xArr,data,color){
	var option = {
			color:[color],
		    title : {
		        show:false
		    },
		    tooltip : {
		        trigger: 'axis',
		    },
		    legend: { data:['用户数(万人)'],textStyle:{color:'#ffffff',fontSize:this.chartLabelSize}},
		    toolbox: {show : false},
		    calculable : false,
		    animation:false,
	   		addDataAnimation: false,
		    grid:{borderWidth:0,x:100,y:30,x2:30,y2:30},
		    xAxis : [{type : 'category',
		            data : xArr,
		            axisLine:{show:true,lineStyle:{color:'#adc7dd'}},
		            axisLabel:{textStyle:{color:'#adc7dd',fontSize:this.chartLabelSize}},
		            splitLine:{show:false},
		            axisTick:{show:true,lineStyle:{color:'#adc7dd'}}
		        }],
		    yAxis : [{
		            type : 'value',
		            axisLine:{show:false},
		            splitLine:{show:false},
		            axisLabel:{textStyle:{color:'#adc7dd',fontSize:this.chartLabelSize}},
		            axisTick:{show:true,lineStyle:{color:'#adc7dd'}},
		            scale:true,
		            splitNumber:2,
		            min:0}],
            series : [{
	        	name:'用户数(万人)',
	            type:'bar',
	            data:data,
	            smooth:true,
	            barWidth:15,
	            itemStyle:{normal:{barBorderRadius:5,lineStyle:{width:this.lineWidth},smooth:true,label:{show:false,textStyle:{fontSize:this.chartLabelSize}}}}
	        }]
		};
	return option;
};
function  _onmouseover(obgect){
	var length=$(obgect).data("length");
	var Location=eval("(" + Popoverposition.Core3() + ")");
	var parameter=Situation.Rings;
	Popover2.popover(Situation.jkzl_g.arr[$(obgect).data("id")],Location[length],parameter,);
}
function mouseout(){
	$("#popover").empty();
}