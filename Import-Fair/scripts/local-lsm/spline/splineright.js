var GROUPCUSTOMER=GROUPCUSTOMER||{};
GROUPCUSTOMER.Screen=function ()
{
	this.initialize.apply(this,arguments);
};
GROUPCUSTOMER.Screen.prototype.constructor=GROUPCUSTOMER.Screen;
GROUPCUSTOMER.Screen.prototype.lineWidth=3;
GROUPCUSTOMER.Screen.prototype.chartLabelSize=24;
GROUPCUSTOMER.Screen.prototype.customers_num=null;

GROUPCUSTOMER.Screen.prototype.initialize=function(){
	this.cdm=LSMScreen.CacheDataManager.getInstance();
	require(['echarts',  
	            'echarts/chart/line'
	            ],this.initEcharts.bind(this));
	this.initTable();
	setInterval(this.refreshTime,1000);
	
	$('#returnBtn').on('click',this.showAllLine.bind(this));
};
GROUPCUSTOMER.Screen.prototype.showAllLine=function(e){
	this.customers_num=null;
	this.update();
};
GROUPCUSTOMER.Screen.prototype.initEcharts=function(ec){
	this.ec=ec;
	this.chart01=ec.init($("#chart0_1")[0],'marcarons');
	this.update();
};
GROUPCUSTOMER.Screen.prototype.initTable=function(){
	var colNames=['客户名称','专线类型','专线编号','接入类型','专线等级','故障数量','投诉数量'];
	var colModel=[
	    {colName:'customers_name',name : 'customers_name',index : 'customers_name',width:440,sortable:true},//,width:
	    {colName:'business_type',name : 'business_type',index : 'business_type',width:220,sortable:true},
	    {colName:'line_id',name : 'line_id',index : 'line_id',width:440,sortable:true},
	    {colName:'access_type',name : 'access_type',index : 'access_type',width:160,sortable:true},
	    {colName:'bsns_security_level',name : 'bsns_security_level',index : 'bsns_security_level',sortable:true},
	    {colName:'fo_cnt',name : 'fo_cnt',index : 'fo_cnt',sortable:true,formatter:function(cellvalue){
	    	if(cellvalue*1>0){
	    		return '<span style="color:#ff5252;">'+cellvalue+'</span>';
	    	}else{
	    		return 0;
	    	}
	    }},
	    {colName:'ts_cnt',name : 'ts_cnt',index : 'ts_cnt',sortable:true,formatter:function(cellvalue){
	    	if(cellvalue*1>0){
	    		return '<span style="color:#ff5252;">'+cellvalue+'</span>';
	    	}else{
	    		return 0;
	    	}
	    }}
	];
	var opt1={
	        datatype : function(){},
	        colNames:colNames,
	        colModel : colModel,
	        loadui:'disable',
	        width:'100%',
	        height:1020,//560
	        rowNum:3000,
	        autowidth: true,
	        shrinkToFit: true,
	        onSelectRow:this.tableClick.bind(this),
	        onSortCol:function(index,iCol,sortorder){
	        	var list=this.tableDataCache;
	        	if(index=='fo_cnt'||index=='ts_cnt'){
	        		if(sortorder=='desc'){
	        			list.sort(function(a,b){
	        				return b[index]-a[index];
		        	     });
	        		}else{
	        			list.sort(function(b,a){
	        				return b[index]-a[index];
		        	     });
	        		}
	        		$('#table')[0].addJSONData(list);
	        	}else if(index=='bsns_security_level'){
	        		var valueMap={
	        			'普通':0,
	        			'A':1,
	        			'AA':2,
	        			'AAA':3
	        		};
	        		if(sortorder=='desc'){
	        			list.sort(function(a,b){
	        				return valueMap[b[index]]-valueMap[a[index]];
		        	     });
	        		}else{
	        			list.sort(function(b,a){
	        				return valueMap[b[index]]-valueMap[a[index]];
		        	     });
	        		}
	        		$('#table')[0].addJSONData(list);
	        	}else{
	        		if(sortorder=='desc'){
	        			list.sort(function(a,b){
	        				if(b[index]==null) b[index]='';
	        				if(a[index]==null) a[index]='';
		        	         if(a[index].length==b[index].length){
		        	             return b[index].localeCompare(a[index]);
		        	         }else{
		        	             return b[index].length-a[index].length;
		        	         }
		        	     });
	        		}else{
	        			list.sort(function(b,a){
	        				if(b[index]==null) b[index]='';
	        				if(a[index]==null) a[index]='';
		        	         if(a[index].length==b[index].length){
		        	             return b[index].localeCompare(a[index]);
		        	         }else{
		        	             return b[index].length-a[index].length;
		        	         }
		        	     });
	        		}
	        		
	        		$('#table')[0].addJSONData(list);
	        	}
	        	
	        	
	        }.bind(this)
		};
	
	$('#table').jqGrid(opt1);
};
GROUPCUSTOMER.Screen.prototype.isMTable=function(){
	var colNames=['客户名称','客户服务等级','客户属地'];
	var colModel=[
	    {colName:'customers_name',name : 'customers_name',index : 'customers_name',width:490,sortable:true},//,width:
	    {colName:'customers_server',name : 'customers_server',index : 'business_type',width:490,sortable:true},
	    {colName:'dependency',name : 'dependency',index : 'line_id',width:490,sortable:true}
	];
	var opt1={
	        datatype : function(){},
	        colNames:colNames,
	        colModel : colModel,
	        loadui:'disable',
	        width:'100%',
	        height:1020,//560
	        rowNum:3000,
	        autowidth: true,
	        shrinkToFit: true,
	        onSelectRow:this.tableClick.bind(this),
	        onSortCol:function(index,iCol,sortorder){
	        	if(index=='fo_cnt'||index=='ts_cnt'){
	        		var list=this.isMtableDataCache;
	        		if(sortorder=='desc'){
	        			list.sort(function(a,b){
	        				return b[index]-a[index];
		        	     });
	        		}else{
	        			list.sort(function(b,a){
	        				return b[index]-a[index];
		        	     });
	        		}
	        		$('#isMtable')[0].addJSONData(list);
	        	}else{
	        		var list=this.isMtableDataCache;
	        		if(sortorder=='desc'){
	        			list.sort(function(a,b){
	        				if(b[index]==null) b[index]='';
	        				if(a[index]==null) a[index]='';
		        	         if(a[index].length==b[index].length){
		        	             return b[index].localeCompare(a[index]);
		        	         }else{
		        	             return b[index].length-a[index].length;
		        	         }
		        	     });
	        		}else{
	        			list.sort(function(b,a){
	        				if(b[index]==null) b[index]='';
	        				if(a[index]==null) a[index]='';
		        	         if(a[index].length==b[index].length){
		        	             return b[index].localeCompare(a[index]);
		        	         }else{
		        	             return b[index].length-a[index].length;
		        	         }
		        	     });
	        		}
	        		
	        		$('#isMtable')[0].addJSONData(list);
	        	}
	        	
	        	
	        }.bind(this)
		};
	
	$('#isMtable').jqGrid(opt1);
};
GROUPCUSTOMER.Screen.prototype.update=function(){
	this.updateLineTable();
};

GROUPCUSTOMER.Screen.prototype.tableClick=function(rowid){
	var record=this.tableDataCache[rowid-1];
	if(isScreenMode!="true"){
		window.location.href='mapTopo.jsp?lineId='+encodeURIComponent(record.line_id)
		+'&lineType='+encodeURIComponent(record.business_type);
	}else{
		this.updateRelatedInfo(record);
	}
	
};
GROUPCUSTOMER.Screen.prototype.updateRelatedInfo=function(record,doNotUpdateMap){
	//this.box.clear();
	$('#table').setGridHeight(1020);
	$('#singleLineParent').css('display','none');
	if(record.business_type=='互联网专线'){
		this.updateSingleTrend(record.line_id);
	}
	if(doNotUpdateMap!=true){
		parent.updateLineTopo(record.line_id,record.business_type);
	}
	
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
			this.cdm.getSplineCustomers({isM:"是"},this.isMTableDataHandler.bind(this));
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
	result=result.data;
	//result=result.sort(function(a,b){return (b.fo_cnt*1+b.ts_cnt*1)-(a.fo_cnt*1+a.ts_cnt*1);})
	$('#a').css("display","block");
	$('#b').css("display","none");
	this.tableDataCache=result;
	$('#table')[0].addJSONData(result);
	$('.ui-jqgrid-bdiv').width($('.ui-jqgrid-hdiv').width());
	$('.ui-jqgrid-btable').width($('.ui-jqgrid-hdiv').width());
	
	$('#singleLineParent').css('display','none');
	if(result!=null&&result.length>0){
		this.updateRelatedInfo(result[0],true);
	}
};
GROUPCUSTOMER.Screen.prototype.isMTableDataHandler=function(result){
	this.isMTable();
	result=result.data;
	//result=result.sort(function(a,b){return (b.fo_cnt*1+b.ts_cnt*1)-(a.fo_cnt*1+a.ts_cnt*1);})
	$('#a').css("display","none");
	$('#b').css("display","block");
	this.isMtableDataCache=result;
	$('#isMtable')[0].addJSONData(result);
	$('.ui-jqgrid-bdiv').width($('.ui-jqgrid-hdiv').width());
	$('.ui-jqgrid-btable').width($('.ui-jqgrid-hdiv').width());
	
	$('#singleLineParent').css('display','none');
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
		$('#table').setGridHeight(560);
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
