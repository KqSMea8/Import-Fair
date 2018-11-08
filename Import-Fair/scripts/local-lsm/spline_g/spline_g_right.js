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
	require(['echarts','echarts/chart/line'],this.initEcharts.bind(this));
	setInterval(this.refreshTime,1000);
	$('.navSwitch').on('click',this.switchPage.bind(this));
	$('#returnBtn').on('click',this.showAllLine.bind(this));
};
GROUPCUSTOMER.Screen.prototype.showAllLine=function(e){
	this.customers_num=null;
	this.update();
};
GROUPCUSTOMER.Screen.prototype.switchPage=function(e){
	if($('#customerPage').css('display')=='block'){
		$('#customerPage').css('display','none');
		$('#linePage').css('display','block');
	}else if($('#linePage').css('display')=='block'){
		$('#linePage').css('display','none');
		$('#customerPage').css('display','block');
	}
};
GROUPCUSTOMER.Screen.prototype.showTable=function(e){
	if(this.customers_num=="media_cust_cnt_id"){
		$('#linePage').css('display','none');
		$('#customerPage').css('display','block');
	}else{
		$('#customerPage').css('display','none');
		$('#linePage').css('display','block');
	}
};
GROUPCUSTOMER.Screen.prototype.initEcharts=function(ec){
	this.ec=ec;
	this.chart01=ec.init($("#chart0_1")[0],'marcarons');
	this.update();
};
GROUPCUSTOMER.Screen.prototype.update=function(){
	this.updateCustomers();
	this.updateLineTable();
};

GROUPCUSTOMER.Screen.prototype.updateCustomers=function(){
	this.cdm=LSMScreen.CacheDataManager.getInstance();
	if(this.customers_num=="media_cust_cnt_id"){
		this.cdm.getSplineCustomers({isLocal:"是",isM:"是",customers_name:_name},this.localCustomersHandler.bind(this));
		this.cdm.getSplineCustomers({isLocal:"否",isM:"是",customers_name:_name},this.groupCustomersHandler.bind(this));
	}else{
		this.cdm.getSplineCustomers({isLocal:"是",customers_name:_name},this.localCustomersHandler.bind(this));
		this.cdm.getSplineCustomers({isLocal:"否",customers_name:_name},this.groupCustomersHandler.bind(this));
	}
	
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
							+'<div title="'+record.customers_name+'" class="basewinbg10 fontSubInfo2" style="overflow:hidden;padding:70px 10px 10px 10px;margin-top:80px;width:100%;height:160px;text-align:center;border-top-left-radius:5px;border-top-right-radius:5px;">'
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

GROUPCUSTOMER.Screen.prototype.splineRowClick=function(e){
	var line_id=$(e.currentTarget).attr("line_id");
	var business_type=$(e.currentTarget).attr("business_type");
	this.updateRelatedInfo(line_id,business_type);
	try{
		parent.updateLineTopo(line_id,business_type);
	}catch(e){}
	
};
GROUPCUSTOMER.Screen.prototype.updateLineTable=function(){
	var name=eval("("+pmars.splineleft_name()+")");
	if(this.customers_num==null){
		$('#returnBtn').css('display','none');
	}else{
		$('#returnBtn').css('display','block');
	}
	if(!utils.isStringEmpty(name[this.customers_num])){
		if(this.customers_num=="allSpline_id"){
			this.cdm.getSplineLinesDetail({condition_eq_business_type:null},this.splineTableDataHandler.bind(this));
		}else if(this.customers_num=="faultSpline_id"){
			this.cdm.getSplineLinesDetail({isFo:true},this.splineTableDataHandler.bind(this));
		}else if(this.customers_num=="complainSpline_id"){
			this.cdm.getSplineLinesDetail({isTs:true},this.splineTableDataHandler.bind(this));
		}else if(this.customers_num=="allCustomer_id"){
			this.cdm.getSplineLinesDetail({condition_eq_business_type:null},this.splineTableDataHandler.bind(this));
		}else if(this.customers_num=="media_cust_cnt_id"){
			//this.cdm.getSplineCustomers({isM:"是"},this.isMTableDataHandler.bind(this));
		}else if(this.customers_num=="media_line_cnt_id"){
			this.cdm.getSplineLines({condition_eq_is_media:"是"},this.splineTableDataHandler.bind(this));
		}else if(this.customers_num=="spline_hall_id"){
			this.cdm.getSplineLines({condition_eq_is_guozhan_line:"是"},this.splineTableDataHandler.bind(this));
		}else{
			this.cdm.getSplineLinesDetail({condition_eq_business_type:name[this.customers_num].text},this.splineTableDataHandler.bind(this));
		}
	}else{
		this.cdm.getSplineLines({customers_num:this.customers_num},this.splineTableDataHandler.bind(this));
	}
};
GROUPCUSTOMER.Screen.prototype.splineTableDataHandler=function(result){
	var list=result.data;
	var html='';
    
	for(var i=0;i<list.length;i++){
		var record=list[i];
		var fo_color=record.fo_cnt>0?'color:#ff5252;':'';
		var ts_color=record.ts_cnt>0?'color:#ff5252;':'';
		html+='<div class="splinesDiv" style="width:100%;height:110px;cursor:pointer;" line_id="'+record.line_id+'"  business_type="'+record.business_type+'">'
				+'<div style="width:60%;float:left;"><span class="splineInfoTitle" style="float:left;display:block;">客户名称:</span><span class="ciiekpistyle" style="display:block;overflow:hidden;width:400px;height:40px;float:left;"  title="'+record.customers_name+'">'+record.customers_name+'</span></div>'
				+'<div style="width:39%;float:left;"><span class="splineInfoTitle">传输类型:</span><span class="ciiekpistyle">'+record.business_type+'</span></div>'
				+'<div style="width:60%;float:left;"><span class="splineInfoTitle">专线编号:</span><span class="ciiekpistyle">'+record.line_id+'('+record.access_type+')'+'</span></div>'
				+'<div style="width:20%;float:left;"><span class="splineInfoTitle">故障数量:</span><span class="ciiekpistyle" style="'+fo_color+'">'+record.fo_cnt+'</span></div>'
				+'<div style="width:19%;float:left;"><span class="splineInfoTitle">投诉数量:</span><span class="ciiekpistyle" style="'+ts_color+'">'+record.ts_cnt+'</span></div>'
				+'<div style="clear:both;"></div>'
			+'</div>';
		if(i==0){
			this.updateRelatedInfo(record.line_id,record.business_type);
			try{
				//parent.updateLineTopo(record.line_id,record.business_type);
			}catch(e){}
			
		}
	}
	$('#a').html(html);
	$('.splinesDiv').on('click',this.splineRowClick.bind(this));
};
GROUPCUSTOMER.Screen.prototype.updateRelatedInfo=function(line_id,business_type){
	//this.box.clear();
	$('#a').height(950);
	$('#a').parent().height(1000);
	$('#singleLineParent').css('display','none');
	if(business_type=='互联网专线'){
		this.updateSingleTrend(line_id);
	}
};
GROUPCUSTOMER.Screen.prototype.updateSingleTrend=function(lineId){
	$('#singleLineId').text('-'+lineId);
	this.cdm.getSplineTrend({line_id:lineId},this.singleTrendDataHandler.bind(this));
};
GROUPCUSTOMER.Screen.prototype.singleTrendDataHandler=function(result){
	var list=result.data;
	if(list==null){
		list=[];
	}
	if(list.length>0){
		$('#a').height(400);
		$('#a').parent().height(450);
		$('#singleLineParent').css('display','block');
	}
	var dataIn=[];
	var dataOut=[];
	var xArr=[];
	list=list.reverse();
	for(var i=0;i<list.length;i++){
//		{"TIME":"2018-06-23 15:50:00","IF_IN_TOTAL":225.29,"IF_OUT_TOTAL":52.19}
		var record=list[i];
		var time=record.time;
		xArr.push(time.substring(11,16));
		dataOut.push(utils.changeTwoDecimal(pmars.conversion("(MB)",record.if_out_kb)));
		dataIn.push(utils.changeTwoDecimal(pmars.conversion("(MB)",record.if_in_kb)));
	}
	this.chart01=this.ec.init($("#chart0_1")[0],'marcarons');
	this.chart01.setOption(this.getEchartsOption(xArr,dataIn,dataOut),true);
};
GROUPCUSTOMER.Screen.prototype.updateAllTrend=function(){
	this.dm.getJKInternetFlowTrend({},this.allTrendDataHandler.bind(this));
};
GROUPCUSTOMER.Screen.prototype.allTrendDataHandler=function(result){
	var list=result.data;
	if(list==null){
		list=[];
	}
	var dataIn=[];
	var dataOut=[];
	var xArr=[];
	list=list.reverse();
	for(var i=0;i<list.length;i++){
//		{"TIME":"2018-06-23 15:50:00","IF_IN_TOTAL":225.29,"IF_OUT_TOTAL":52.19}
		var record=list[i];
		var time=record.time;
		dataOut.push(record.IF_OUT_TOTAL);
		dataIn.push(record.IF_IN_TOTAL);
	}
	this.chart00=this.ec.init($("#chart0_0")[0],'marcarons');
	this.chart00.setOption(this.getEchartsOption(xArr,dataIn,dataOut),true);
};
GROUPCUSTOMER.Screen.prototype.updateStatistic=function(){
	this.dm.getJKStatistic({},this.statisticDataHandler.bind(this));
};


GROUPCUSTOMER.Screen.prototype.getEchartsOption=function(xArr,dataIn,dataOut){
	var option = {
			color:['#1991e9','#ffa526','#1991e9'],
		    title : {
		        show:false
		    },
		    tooltip : {
		        trigger: 'axis'
		    },
		    legend: {
		        data:['上行流量(MB)','下行流量(MB)'],
		        textStyle:{color:'#ffffff',fontSize:this.chartLabelSize}
		    },
		    toolbox: {
		        show : false
		    },
		    calculable : false,
		    grid:{
		    	borderWidth:0,
		    	x:100,
		    	y:60,
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
		            axisTick:{show:true,lineStyle:{color:'#adc7dd'}}
		        },{
		            type : 'value',
		            axisLine:{show:false},
		            splitLine:{show:false},
		            axisLabel:{textStyle:{color:'#adc7dd',fontSize:this.chartLabelSize}},
		            axisTick:{show:true,lineStyle:{color:'#adc7dd'}}
		        }
		    ],
		    series : [{
	        	name:'上行流量(MB)',
	            type:'line',
	            symbol:'emptyCircle',
	            data:dataOut,
	            barWidth:5,
	            symbolSize:[5,5],
	            smooth:true,
	           /* itemStyle:{normal:{lineStyle:{width:this.lineWidth},label:{show:true,textStyle:{fontSize:this.chartLabelSize}}}}*/
	            itemStyle:{normal:{lineStyle:{width:this.lineWidth}}}
	        },{
		            name:'下行流量(MB)',
		            type:'line',
		            symbol:'emptyCircle',
		            //showAllSymbol:true,
		            symbolSize:[5,5],
		            data:dataIn,
		            smooth:true,
		            itemStyle:{normal:{lineStyle:{width:this.lineWidth}}}
		    }]
		};
	return option;
};

function _click(obgect){
	GROUPCUSTOMER.Screen.prototype.click(obgect);
}
