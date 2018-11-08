var GROUPCUSTOMER=GROUPCUSTOMER||{};
var cdm = LSMScreen.CacheDataManager.getInstance();
GROUPCUSTOMER.Screen=function ()
{
	this.initialize.apply(this,arguments);
};
GROUPCUSTOMER.Screen.prototype.constructor=GROUPCUSTOMER.Screen;
GROUPCUSTOMER.Screen.prototype.lineWidth=3;
GROUPCUSTOMER.Screen.prototype.chartLabelSize=24;
var _name=null;
GROUPCUSTOMER.Screen.prototype.initialize=function(){
	this.cdm=LSMScreen.CacheDataManager.getInstance();
	GROUPCUSTOMER.Screen.prototype.model();
	require(['echarts','echarts/chart/line', 'echarts/chart/pie'],this.initEcharts.bind(this));
	setInterval(this.refreshTime,1000);
	$("#APN_cust_cnt").on('click',function(){
		 parent.Model();
	});
};
GROUPCUSTOMER.Screen.prototype.initEcharts=function(ec){
	this.ec=ec;
	this.chart00=ec.init($("#chart0_0")[0],'marcarons');
	this.update();
};
GROUPCUSTOMER.Screen.prototype.update=function(){
	this.updateStatistic();
	this.updateCustomers();
	this.updateAllTrend();
};

GROUPCUSTOMER.Screen.prototype.updateAllTrend=function(){
	this.cdm.getSplineTrend({},this.allTrendDataHandler.bind(this));
};
GROUPCUSTOMER.Screen.prototype.allTrendDataHandler=function(result){
	var list=result.data;
	if(list==null){
		list=[];
	}
	var dataIn=[];
	var dataOut=[];
	var xArr=[];
	for(var i=0;i<list.length;i++){
//		{"TIME":"2018-06-23 15:50:00","IF_IN_TOTAL":225.29,"IF_OUT_TOTAL":52.19}
		var record=list[i];
		var time=record.time;
		xArr.push(time.substring(11,16));
		dataOut.push(pmars.conversion("(GB)",record.if_out_kb));
		dataIn.push(pmars.conversion("(GB)",record.if_in_kb));
	}
	this.chart00=this.ec.init($("#chart0_0")[0],'marcarons');
	this.chart00.setOption(this.getEchartsOption(xArr,dataIn,dataOut),true);
};
GROUPCUSTOMER.Screen.prototype.updateStatistic=function(){
	this.cdm.getSplineStatistic({},this.statisticDataHandler.bind(this));
};

GROUPCUSTOMER.Screen.prototype.statisticDataHandler=function(result){
	if(result.data!=null){
		record=result.data;
		$('#allCustomer').text(record.cust_nums);
		$('#allSpline').text(record.line_nums);
		if(record.ts_line_nums==0){
			$('#faultSpline').css("color","#66e6ff");
		}else{
			$('#complainSpline').css("color","#ff5252");
		}
		$('#faultSpline').text(record.fault_line_nums);
		if(record.ts_line_nums==0){
			$('#complainSpline').css("color","#66e6ff");
		}else{
			$('#complainSpline').css("color","#ff933c");
		}
		$('#complainSpline').text(record.ts_line_nums);
		
		$('#spline_hall').text(record.guozhan_line_cnt);
		
		
		$('#media_cust_cnt').text(record.media_cust_cnt);
		$('#media_line_cnt').text(record.media_line_cnt);
		
		//$('#spline_transmit').text("7");
		//$('#spline_internet').text("2");
	}
};
GROUPCUSTOMER.Screen.prototype.updateCustomers=function(){
	this.cdm=LSMScreen.CacheDataManager.getInstance();
	this.cdm.getSplineCustomers({isLocal:"是",customers_name:_name},this.localCustomersHandler.bind(this));
	this.cdm.getSplineCustomers({isLocal:"否",customers_name:_name},this.groupCustomersHandler.bind(this));
	$("#zbkh_Modal").modal("hide");
	$("#customers_name").val("");
};
GROUPCUSTOMER.Screen.prototype.click=function(obgect){
	if(isScreenMode=="true"){
		parent.updateRightList(obgect.id);
	}else{
		window.location.href='splineright.jsp?paramId='+encodeURIComponent(obgect.id);
	}
	
};
GROUPCUSTOMER.Screen.prototype.localCustomersHandler=function(result){
	var list=result.data;
	var divs=this.getCustomerDivs(list);
	$('#localCustomers').html(divs);
	$('#localCustomers').find('.CUSTOMERDIV').on('click',this.updateRightList.bind(this));
};
GROUPCUSTOMER.Screen.prototype.groupCustomersHandler=function(result){
	var list=result.data;
	var divs=this.getCustomerDivs(list);
	$('#groupCustomers').html(divs);
	$('#groupCustomers').find('.CUSTOMERDIV').on('click',this.updateRightList.bind(this));
};
GROUPCUSTOMER.Screen.prototype.updateRightList=function(e){
	var customers_num=$(e.currentTarget).attr("customers_num");
	if(isScreenMode=="true"){
		parent.updateRightList(customers_num);
	}else{
		window.location.href='splineright.jsp?paramId='+encodeURIComponent(customers_num);
	}
};
GROUPCUSTOMER.Screen.prototype.getCustomerDivs=function(list){
	var html='';
	if(list!=null){
		for(var i=0;i<list.length;i++){
			var record=list[i];
			var img=matching.log(record.customers_name);
//			{"time":"2018-08-01","customers_num":"2101136406","customers_name":"华示（上海）实业有限公司","customers_server":"标准","dependency":"北区","isfromjt":"否"}
			var custDiv='<div class="CUSTOMERDIV" customers_num="'+record.customers_num+'" style="cursor:pointer;float:left;position:relative;width:166px;height:290px;margin-right:17px;">'
							+'<div class="basewinbg10 fontSubInfo2" style="padding:70px 10px 10px 10px;margin-top:80px;width:100%;height:160px;text-align:center;border-top-left-radius:5px;border-top-right-radius:5px;">'
								+record.customers_name
							+'</div>'
							+'<div class="basewinbg25 fontSubInfo2" style="padding:10px 10px 10px 10px;width:100%;height:60px;text-align:center;border-bottom-left-radius:5px;border-bottom-right-radius:5px;">'
								+'专线:&nbsp;&nbsp;&nbsp;&nbsp;<span class="ciiekpistyle" style="text-decoration:underline;">'+record.line_cnt+'</span>'
							+'</div>'
							+'<img style="position:absolute;top:30px;left:31px;" src="'+img+'"/>'
						+'</div>';
			html+=custDiv;
		}
	}
	return html;
};
GROUPCUSTOMER.Screen.prototype.model=function(){
	$("#ss_model").live('click',function(){
		$("#zbkh_Modal").modal("show");
	});
	$('#customers_name').keydown(function(e){
		if(e.keyCode==13){
			_name=$("#customers_name").val();
			GROUPCUSTOMER.Screen.prototype.updateCustomers();
		}
	});
	$("#confirm").live('click',function(){
		_name=$("#customers_name").val();
		GROUPCUSTOMER.Screen.prototype.updateCustomers();
	});
	$("#close").live('click',function(){
		$("#zbkh_Modal").modal("hide");
	});
}
GROUPCUSTOMER.Screen.prototype.faultAndComplainDataHandler=function(result){
	if(result.data!=null){
		var list=result.data;
		for(var i=0;i<list.length;i++){
			var record=list[i];
			if(record.TYPE=='TS'){
				$('#complainCustomer').text(record.CUST_CNT);
				$('#complainSpline').text(record.LINE_CNT);
			}else if(record.TYPE=='GZ'){
				$('#faultCustomer').text(record.CUST_CNT);
				$('#faultSpline').text(record.LINE_CNT);
			}
		}
	}
};

GROUPCUSTOMER.Screen.prototype.getEchartsOption=function(xArr,dataIn,dataOut){
	var option = {
			color:['#ffa526','#1991e9','#1991e9'],
		    title : {
		        show:false
		    },
		    tooltip : {
		    	 trigger: 'axis'
		    },
		    legend: {
		        data:['上行流量(GB)','下行流量(GB)'],
		        textStyle:{color:'#ffffff',fontSize:this.chartLabelSize}
		    },
		    toolbox: {
		        show : false
		    },
		    calculable : false,
		    animation:false,
	   		addDataAnimation: false,
		    grid:{
		    	left: '10px',
		        right: '0',
		        bottom: '1%',
		        containLabel: true,
		        borderWidth:0,
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
		        }
		    ],
		    series : [{
	        	name:'上行流量(GB)',
	            type:'line',
	            symbol:'emptyCircle',
	            data:dataOut,
	            barWidth:5,
	            symbolSize:[5,5],
	            smooth:true,
	            itemStyle:{normal:{lineStyle:{width:this.lineWidth},label:{show:false,textStyle:{fontSize:this.chartLabelSize}}}}
	        },{
		            name:'下行流量(GB)',
		            type:'line',
		            symbol:'emptyCircle',
		            //showAllSymbol:true,
		            symbolSize:[5,5],
		            data:dataIn,
		            smooth:true,
		            itemStyle:{normal:{lineStyle:{width:this.lineWidth},label:{show:false,textStyle:{fontSize:this.chartLabelSize}}}}
		    }]
		};
	return option;
};

GROUPCUSTOMER.Screen.prototype.refreshTime=function(){
	var date=new Date();
	var space='        ';
	var showTime=date.Format('yyyy-MM-dd'+space+'hh:mm:ss');
	var weekday=new Array(7);
	weekday[0]="星期日";
	weekday[1]="星期一";
	weekday[2]="星期二";
	weekday[3]="星期三";
	weekday[4]="星期四";
	weekday[5]="星期五";
	weekday[6]="星期六";
	showTime+=space+weekday[date.getDay()];
	$('#screenTitleTime').text(showTime);
};

function  spline_chart0_img(obgect){
	$("#Modal").modal("show");
	cdm.getSplineTrend({}, function(result) {
		var list=result.data;
		var dataIn=[];
		var dataOut=[];
		var xArr=[];
		for(var i=0;i<list.length;i++){
			var record=list[i];
			var time=record.time;
			xArr.push(time.substring(11,16));
			dataOut.push(pmars.conversion("(GB)",record.if_out_kb));
			dataIn.push(pmars.conversion("(GB)",record.if_in_kb));
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
			        data:[{ name:'上行流量(GB)'},{ name:'下行流量(GB)'}],
			        textStyle:{color:'#ffffff',fontSize:30},
			    	y: '20px'
			    },
			    toolbox: {
			        show : false
			    },
			    calculable : false,
			    animation:false,
		   		addDataAnimation: false,
			    grid:{
			    	left: '40px',
			        right: '0',
			        bottom: '2%',
			        containLabel: true,
			        borderWidth:'0'
			    },
			    xAxis : [
			        {
			            type : 'category',
			            data : xArr,
			            axisLine:{show:true,lineStyle:{color:'#adc7dd'}},
			            axisLabel:{textStyle:{color:'#adc7dd',fontSize:30}},
			            splitLine:{show:false},
			            axisTick:{show:true,lineStyle:{color:'#adc7dd'}}
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value',
			            axisLine:{show:false},
			            splitLine:{show:false},
			            axisLabel:{textStyle:{color:'#adc7dd',fontSize:30}},
			            axisTick:{show:true,lineStyle:{color:'#adc7dd'}},
			            scale:true,
			        }
			    ],
			    series : [{
		        	name:'上行流量(GB)',
		            type:'line',
		            symbol:'emptyCircle',
		            data:dataOut,
		            barWidth:5,
		            symbolSize:[5,5],
		            smooth:true,
		            itemStyle:{normal:{lineStyle:{width:3},label:{show:false,textStyle:{fontSize:this.chartLabelSize}}}}
		        },{
			            name:'下行流量(GB)',
			            type:'line',
			            symbol:'emptyCircle',
			            barWidth:5,
			            symbolSize:[5,5],
			            data:dataIn,
			            smooth:true,
			            itemStyle:{normal:{lineStyle:{width:3},label:{show:false,textStyle:{fontSize:this.chartLabelSize}}}}
			    }]
			};
		$('#spline_chart0_model_value').html("当前上行流量值:"+dataOut[dataOut.length-1]+"(GB)");
		$('#spline_chart0_model_value2').html("当前下行流量值:"+dataIn[dataIn.length-1]+"(GB)");
		eastcom_echarts.init("spline_chart0_model",option);
	});
}

require.config({  
	paths: {  
	    echartsMin: eastcom.baseURL+'/static/jslib/echarts/echarts'
    }  
});  
var eastcom_echarts = {
		init: function (chartId, option) {//初始化方法
			require(['echarts','echarts/chart/line', 'echarts/chart/pie' ],initEcharts);function initEcharts(ec){
			var chart0=ec.init(document.getElementById(chartId),'marcarons');
			chart0.setOption(option);
			if(chartId == "top"){
				chart0.on('click', function(params) {
					overviewleftyd.jqgrid(params.name);
				});
			}
		};	
	}
};

function _click(obgect){
	GROUPCUSTOMER.Screen.prototype.click(obgect);
}
