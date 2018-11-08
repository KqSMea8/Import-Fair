var CIIENEW=CIIENEW||{};
CIIENEW.Roam=function ()
{
	this.initialize.apply(this,arguments);
};
CIIENEW.Roam.prototype.constructor=CIIENEW.Roam;
CIIENEW.Roam.prototype.hotspot='J-国家会展中心';
CIIENEW.Roam.prototype.roamType='intl';
CIIENEW.Roam.prototype.dm=null;
CIIENEW.Roam.prototype.cdm=null;
CIIENEW.Roam.prototype.hotspotList=[];
CIIENEW.Roam.prototype.startIndex=0;
CIIENEW.Roam.prototype.selectedHot=null;
CIIENEW.Roam.prototype.lineWidth=3;
CIIENEW.Roam.prototype.chartLabelSize=24;
CIIENEW.Roam.prototype.terminalChart=24;
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
	//new COMMONCOMP.TerminalChart('terminalchart',this.hotspot,this.roamType);
	//new COMMONCOMP.AppGrid('appGridBody',this.hotspot,this.roamType);
	
};
CIIENEW.Roam.prototype.initEcharts=function(ec){
	this.ec=echarts=ec;
	this.ec=echarts;
	//this.ecConfig = require('echarts/config');
	this.chart0=echarts.init($("#flowchart")[0],'marcarons');
	//this.chart1=echarts.init($("#terminalchart")[0],'marcarons');
	
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
		
		this.cdm.getIntlRoamInTrend({
			intl_name:null,
			hot_name:hotspot
		},this.drawIntlTrend.bind(this));
	}else if(this.roamType=='pro'){
		this.cdm.getProvRoamIn({
			intl_name:null,
			hot_name:hotspot
		},this.updateGauge.bind(this));
		
		this.cdm.getProvRoamInTrend({
			intl_name:null,
			hot_name:hotspot
		},this.drawIntlTrend.bind(this));
	}
	this.cdm.getTerminalTopN({hot_name:hotspot,roamType:this.roamType},this.drawTerminalRankChartBar.bind(this));
	
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
	for(var i=0;i<list.length&&i<5;i++){
		var record=list[i];
		var cls1='appGridDarkTd';
		var cls2='appGridLightTd';
		
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
		var value0=pmars.conversion("(MB)",record.bytes)
		if(record.bytes<100&&record.bytes>0){value0=0.1}
		var value1=pmars.conversion("(Mbps)",record.http_dlpage_gt500k_bytes);
		if(record.http_dlpage_gt500k_bytes<124&&record.http_dlpage_gt500k_bytes>0){value1=0.1}
		html+='<div class="fontSubInfo '+cls1+'" style="text-align:left;padding-left:20px; font-size: 24px;" title='+record.app_subtype_name+'><img src="'+url+'" style="margin-right:20px;"/>'+utils.showOutLength(record.app_subtype_name,7)+'</div>';
		html+='<div class="fontImportantInfo ciiekpistyle '+cls2+'" style="font-size: 28px;">'+record.user_cnt+'</div>';
		html+='<div class="fontImportantInfo ciiekpistyle '+cls1+'" style="font-size: 28px;">'+value0+'</div>';
		html+='<div class="fontImportantInfo ciiekpistyle '+cls2+'" style="font-size: 28px;">'+value1+'</div>';
	}
	$('#appGridBody').html(html);
};
CIIENEW.Roam.prototype.updateGauge=function(result){
	var record=result.data;
	if(!utils.isStringEmpty(this.hotspot)){
		record=result.data[this.hotspot];
	}
	for(var key in record){
		$('#'+key).text(record[key]);
	}
};

CIIENEW.Roam.prototype.drawTermianlChart=function(result){
	this.chart1=echarts.init($("#terminalchart")[0],'marcarons');
	var list=result.data;
	var data=[];
	var legend=[];
	for(var i=0;i<list.length&&i<7;i++){
		var record=list[i];
		legend.push(record.terminal_brand);
		data.push({value:record.user_cnt, name:record.terminal_brand});
	}
	var option = {
			color:['#aee9b9','#ffcc33','#ff6666','#cc66ff','#6666ff','#6699ff','#54cbed'],
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    legend: {
		        orient : 'vertical',
		        x : 100,
		        y : 'center',
		        data:legend,
		        textStyle:{color:'#ffffff',fontSize:this.chartLabelSize*0.7}
		    },
		    toolbox: {
		        show : false
		    },
		    calculable : false,
		    series : [
		        {
		            name:'访问来源',
		            type:'pie',
		            radius : [100, 140],
		            center:['60%','56%'],
		            startAngle:180,
		            // for funnel
		            x: '60%',
		            width: '45%',
		            funnelAlign: 'left',
		            data:data,
		            itemStyle:{
		            	normal:{
		            		label:{
		            			formatter:'{d}%\n{b}',
		            			textStyle:{color:'#ffffff',fontSize:this.chartLabelSize}
		            		}
		            		
		            	}
		            }
		        }
		    ]
		};
	this.chart1.setOption(option,true);
		                    
};
CIIENEW.Roam.prototype.drawTerminalRankChartBar=function(result){
	var max=0;
	var html='';
	result=result.data;
	
	var total=0;
	var lastPercent=0;
	for(var i=0;i<result.length;i++){
		var record=result[i];
		var terminalCnt=record.user_cnt;
		total+=terminalCnt*1;
	}
	for(var i=0;i<result.length;i++){
		var record=result[i];
		var terminalCnt=record.user_cnt;
		var brand=record.terminal_brand;
		var model=record.terminal_model;
		var showName=brand;
		var showCnt=terminalCnt;//(terminalCnt/10000).toFixed(0);
		var rank=i+1;
		
		if(i==0){
			max=terminalCnt;
		}
		var maxBarWidth=420;
		var barPercent=terminalCnt/max;
		switch(rank){
		case 1:
			barPercent=1;
			break;
		case 2:
			barPercent=0.2;
			break;
		case 3:
			barPercent=0.1;
			break;
		default:
			barPercent=0.03;
			break;
		}
//		if(lastPercent!=0&&lastPercent-barPercent>=0.5){
//			barPercent+=0.5;
//		}
		
		var barWidth=barPercent*maxBarWidth;
		var ratio=(terminalCnt/total*100).toFixed(2);
		var rankColor='';
		var rankDiv='';
		if(rank==1){
			rankColor="background:#ffb094;";
			rankDiv='<img style="float:left;" src="'+BASEPATH+'/static/styles/local-lsm/roam/images/rank1.png">';
		}else if(rank==2){
			rankColor="background:#ffef66;";
			rankDiv='<img style="float:left;" src="'+BASEPATH+'/static/styles/local-lsm/roam/images/rank2.png">';
		}else if(rank==3){
			rankColor="background:#00ffa9;";
			rankDiv='<img style="float:left;" src="'+BASEPATH+'/static/styles/local-lsm/roam/images/rank3.png">';
		}else{
			rankColor="background:#67e6ff;";
			rankDiv='<div style="width:35px;height:35px;border:solid 1px #1f73a6;border-radius:5px;float:left;text-align:center;background:#124680;">'+rank+'</div>';
		}
		if(model!=null){
			brand='';
			showName=model;
		}
		lastPercent=barPercent;
		var div='<div class="terminalRow" style="width:100%;height:30px;margin-top:23px;font-size:24px;cursor:pointer;" brand="'+brand+'">'
				+rankDiv
				+'<div style="width:115px;height:35px;float:left;text-align:right;">'+showName+'</div>'
				+'<div style="padding:0px;float:left;width:'+maxBarWidth+'px;background:#081959;border:solid 1px #091d7c;border-radius:30px;">'	
					+'<div class="gradientBar" style="'+rankColor+'margin-top:5px;margin-left:5px;width:'+barWidth+'px;height:25px;float:left;"></div>'
				+'</div>'
				+'<div style="color:#49deee;margin-left:5px;float:left;font-weight:bold;">'+ratio+'%</div>'
				+'</div>';
		div+='<div style="clear:both;"></div>';
		html+=div;
	}
	$('#terminalchart').html(html);
	
	//$('.terminalRow').on('click',this.terminalBrandClick.bind(this));
};


CIIENEW.Roam.prototype.drawIntlTrend=function(result){
	this.chart0=echarts.init($("#flowchart")[0],'marcarons');
	var list=result.data;
	if(list==null){
		list=[];
	}
	var xArr=[];
	var userArr=[];
	var userArrLast=[];
	for(var i=0;i<list.length;i++){
		var record=list[i];
		xArr.push(record.time.substring(11,16));
		userArr.push(record.bytes==null?undefined:record.bytes);
		userArrLast.push(record.bytestb==null?undefined:record.bytestb);
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
		        data:['今日','6日'],
		        textStyle:{color:'#ffffff',fontSize:this.chartLabelSize}
		    },
		    toolbox: {
		        show : false
		    },
		    calculable : false,
		    animation:false,
	   		addDataAnimation: false,
		    grid:{
		    	borderWidth:0,
		    	x:100,
		    	y:30,
		    	x2:0,
		    	y2:30
		    },
		    xAxis : [
		        {
		            type : 'category',
		            data : xArr,
		            axisLine:{show:true,lineStyle:{color:'#adc7dd'}},
		            axisLabel:{textStyle:{color:'#adc7dd',fontSize:this.chartLabelSize}},
		            splitLine:{show:false},
		            axisTick:{show:true,lineStyle:{color:'#adc7dd'}}
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            axisLine:{show:false},
		            splitLine:{show:false},
		            axisLabel:{textStyle:{color:'#adc7dd',fontSize:this.chartLabelSize}},
		            axisTick:{show:true,lineStyle:{color:'#adc7dd'}},
		            scale:true,
		            min:0
		        }
		    ],
		    series : [{
	        	name:'今日',
	            type:'line',
	            symbol:'emptyCircle',
	            data:userArr,
	            symbolSize:[5,5],
	            smooth:true,
	            itemStyle:{normal:{lineStyle:{width:this.lineWidth}}}
	        },{
	        	name:'6日',
	            type:'line',
	            symbol:'emptyCircle',
	            data:userArrLast,
	            symbolSize:[5,5],
	            smooth:true,
	            itemStyle:{normal:{lineStyle:{width:this.lineWidth},areaStyle:{color : 'rgba(25,145,233,0.3)'}}}
	        }]
		};
	this.chart0.setOption(option,true);
};