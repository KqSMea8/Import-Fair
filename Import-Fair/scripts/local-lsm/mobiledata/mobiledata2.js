var MobileDataScreen = MobileDataScreen || {};
MobileDataScreen.ScreenController2=function (){
	this.initialize.apply(this, arguments);
};
MobileDataScreen.ScreenController2.prototype=Object.create(LSMScreen.ScreenBase.prototype);
MobileDataScreen.ScreenController2.prototype.constructor=MobileDataScreen.ScreenController2;

MobileDataScreen.ScreenController2.prototype.dataMap={};
MobileDataScreen.ScreenController2.prototype.allTrendData=[];

MobileDataScreen.ScreenController2.prototype.hbaseKeyMap={
	"sheet_GN":"kpi_013",
	"record_GN":"kpi_014",
	"store_GN":"kpi_015",
	
	"sheet_LTE":"kpi_016",
	"record_LTE":"kpi_017",
	"store_LTE":"kpi_018",
	
	"sheet_VOLTE":"kpi_019",
	"record_VOLTE":"kpi_020",
	"store_VOLTE":"kpi_021"
};

MobileDataScreen.ScreenController2.prototype.initConfigs=function(){
	this.initComponents();
};
MobileDataScreen.ScreenController2.prototype.initComponents=function(){
	
	this.realTimeShareChart=new MobileDataScreen.KpiTrendSingleLine(
			$("#realTimeShareChart")[0],
			{title:"实时数据共享服务",contentHeight:145},
			function(){
				this.realTimeShareChart.kpiId="kpi_034";
				this.realTimeShareChart.kpiName="storm-服务访问次数";
				
				
				this.sheetShareChart=new MobileDataScreen.KpiTrendSingleLine(
						$("#sheetShareChart")[0],
						{title:"清单查询共享服务",contentHeight:145});
				
				this.sheetShareChart.kpiId="kpi_037";
				this.sheetShareChart.kpiName="hbase-服务访问次数";
				
				this.batchShareChart=new MobileDataScreen.KpiTrendSingleLine(
						$("#batchShareChart")[0],
						{title:"批量处理共享服务",contentHeight:145});
				
				this.batchShareChart.kpiId="kpi_041";
				this.batchShareChart.kpiName="impala-服务访问次数";
				
				
				
				
				this.recordBarChart=new MobileDataScreen.RecordBarChart(
						$("#recordBarChart")[0],
						{title:"记录数趋势图",contentHeight:200});
				
				this.interfaceRingChart=new MobileDataScreen.InterfaceRingChart(
						$("#interfaceRingChart")[0],
						{title:"接口数占比",contentHeight:340},
						function(){
							
							this.update();
							
						}.bind(this)
				);
				

				
			}.bind(this)
	);
	
	
	
	
};

MobileDataScreen.ScreenController2.prototype.update=function(){
	var dm=LSMScreen.DataManager.getInstance();
	dm.getMobileDataKpiCalculater({},this.latestDataHandler.bind(this));
	dm.getMobileDataKpiTrend({
		kpi_name:"kpi_001,kpi_002," //ESB接口数,DPI接口数
				+"kpi_034,kpi_037,kpi_041" //storm-服务访问次数,hbase-服务访问次数,impala-服务访问次数
		},this.trendDataHandler.bind(this));
};

MobileDataScreen.ScreenController2.prototype.latestDataHandler=function(result){
	var dataMap={};
	var list=result.data;
	if(list==null) list=[];
	for(var i=0;i<list.length;i++){
		var record=list[i];
		dataMap[record.KPI_NAME]=record.VALUE;
	}
	this.dataMap=dataMap;
	
	this.interfaceRingChart.updateChart(dataMap);
	
	$("#if_all").text(parseInt(dataMap["kpi_001"])+parseInt(dataMap["kpi_002"])+parseInt(dataMap["kpi_003"])+parseInt(dataMap["kpi_004"]));
	$("#record_all").text(parseInt(dataMap["kpi_005"])+parseInt(dataMap["kpi_006"]));
	
	var task_percent=parseInt(dataMap["kpi_007"]/dataMap["kpi_008"]*100);
	$("#task_all").text(parseInt(dataMap["kpi_008"]));
	$("#task_done").text(parseInt(dataMap["kpi_007"]));
	$("#task_percent").text(task_percent);
	$("#task_percent_bar").css('width',task_percent+'%');
	
	
	//storm
	$("#if_storm").text(parseInt(dataMap["kpi_009"]));
	$("#record_storm").text(parseInt(dataMap["kpi_010"]));
	
	var task_storm_percent=parseInt(dataMap["kpi_012"]/dataMap["kpi_011"]*100);
	$("#task_storm_all").text(parseInt(dataMap["kpi_011"]));
	$("#task_storm_done").text(parseInt(dataMap["kpi_012"]));
	$("#task_storm_percent").text(task_storm_percent);
	$("#task_storm_percent_bar").css('width',task_storm_percent+'%');
	
	//hbase
	var hbaseType=$("#hbase_btns").find(".btnSelected").text();
	$("#sheet_hbase").text(parseInt(dataMap[this.hbaseKeyMap["sheet_"+hbaseType]]));
	$("#record_hbase").text(parseInt(dataMap[this.hbaseKeyMap["record_"+hbaseType]]));
	$("#store_hbase").text(parseInt(dataMap[this.hbaseKeyMap["store_"+hbaseType]]));
	
	
	var task_hbase_percent=parseInt(dataMap["kpi_023"]/dataMap["kpi_022"]*100);
	$("#task_hbase_all").text(parseInt(dataMap["kpi_022"]));
	$("#task_hbase_done").text(parseInt(dataMap["kpi_023"]));
	$("#task_hbase_percent").text(task_hbase_percent);
	$("#task_hbase_percent_bar").css('width',task_hbase_percent+'%');
	
	//impala
	
	$("#impala_dw_model").text(parseInt(dataMap["kpi_024"]));
	$("#impala_dw_rule").text(parseInt(dataMap["kpi_025"]));
	$("#impala_dw_store").text(parseInt(dataMap["kpi_026"]));
	
	$("#impala_base_model").text(parseInt(dataMap["kpi_027"]));
	$("#impala_base_rule").text(parseInt(dataMap["kpi_028"]));
	$("#impala_base_store").text(parseInt(dataMap["kpi_029"]));
	
	
	var task_impala_percent=parseInt(dataMap["kpi_031"]/dataMap["kpi_030"]*100);
	$("#task_impala_all").text(parseInt(dataMap["kpi_030"]));
	$("#task_impala_done").text(parseInt(dataMap["kpi_031"]));
	$("#task_impala_percent").text(task_impala_percent);
	$("#task_impala_percent_bar").css('width',task_impala_percent+'%');
	
	
	//右侧数值
	$("#service_storm").text(parseInt(dataMap["kpi_032"]));
	$("#upapp_storm").text(parseInt(dataMap["kpi_033"]));
	
	$("#service_hbase").text(parseInt(dataMap["kpi_035"]));
	$("#upapp_hbase").text(parseInt(dataMap["kpi_036"]));
	
	$("#service_impala").text(parseInt(dataMap["kpi_038"]));
	$("#upapp_impala").text(parseInt(dataMap["kpi_039"]));
	
	
};

MobileDataScreen.ScreenController2.prototype.trendDataHandler=function(result){
	this.allTrendData=result.data;
	this.recordBarChart.updateChart(this.allTrendData);
	
	this.realTimeShareChart.updateChart(this.allTrendData);
	this.sheetShareChart.updateChart(this.allTrendData);
	this.batchShareChart.updateChart(this.allTrendData);
	
};

//===============================================================================

/**
 * KpiTrendSingleLine
 * @class MobileDataScreen.KpiTrendSingleLine
 * @extends LSMScreen.DataChartBase
 * @classdesc 线和堆栈
 */
MobileDataScreen.KpiTrendSingleLine=function (){
	this.initialize.apply(this, arguments);
};
/** 从DataChartBase继承*/
MobileDataScreen.KpiTrendSingleLine.prototype=Object.create(LSMScreen.DataChartBase.prototype);
MobileDataScreen.KpiTrendSingleLine.prototype.constructor=MobileDataScreen.KpiTrendSingleLine;


MobileDataScreen.KpiTrendSingleLine.prototype.kpiId="";
MobileDataScreen.KpiTrendSingleLine.prototype.kpiName="";

/** 
 * 请求数据接口 由update调用
 * @public
 * @function 
 * @param {Object} queryConfig 查询参数
 * @example
 * {
 * }
 */
MobileDataScreen.KpiTrendSingleLine.prototype.updateChart=function(result){
	
	var list=result;
	if(list==null){
		list=[];
	}
	var xDatas=[];
	var datas=[];
	var lastTime="";
	for(var i=0;i<list.length;i++){
		var record=list[i];
		
		if(this.kpiId.indexOf(record.KPI_NAME)!=-1){
			var time=record.STAT_TIME;
			var value=record.VALUE;
			var month=time.substring(4,6);
			var day=time.substring(6,8);
			if(value==null) value=0;
			if(time!=lastTime){
				lastTime=time;
				xDatas.push(month+"-"+day);
				datas.push(value);
			}else{
				datas[datas.length-1]+=value;
			}
		}
	}
	
	var option = {
			color:["#fffc01"],
		    tooltip : {
		        trigger: 'axis',
		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
		            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        }
		    },
		    legend: {
		    	show:false,
		    	data:[this.kpiName]
		    },
		    toolbox: {
		        show : false
		    },
		    calculable : true,
		    xAxis : [
		        {
		        	axisLabel:{
		        		textStyle:{
				        	color:'#ffffff',
		    				fontWeight:'bold'
				        },
		        	},
		        	axisLine:{
		        		lineStyle:{
		        			color:'#1b97bb'
		        		}
		        	},
		        	splitLine:{
		        		lineStyle:{
		        			color:'#092f3a'
		        		}
		        	},
		            type : 'category',
		            data : xDatas
		        }
		    ],
		    yAxis : [
		        {
		        	axisLabel:{
		        		textStyle:{
				        	color:'#ffffff',
		    				fontWeight:'bold'
				        },
		        	},
		        	axisLine:{
		        		lineStyle:{
		        			color:'#1b97bb'
		        		}
		        	},
		        	splitLine:{
		        		lineStyle:{
		        			color:'#092f3a'
		        		}
		        	},
		            type : 'value'
		        },{
		        	show:false,
		        	axisLabel:{
		        		textStyle:{
				        	color:'#ffffff',
		    				fontWeight:'bold'
				        },
		        	},
		        	axisLine:{
		        		lineStyle:{
		        			color:'#1b97bb'
		        		}
		        	},
		        	splitLine:{
		        		lineStyle:{
		        			color:'#092f3a'
		        		}
		        	},
		            type : 'value',
		            max:100,
		            min:0
		        }
		    ],
		    grid:{
		    	borderWidth:1,
		    	borderColor:'#092f3a',
		    	x:80,
		    	y:15,
		    	x2:10,
		    	y2:30
		    },
		    series : [
		        {
		            name:this.kpiName,
		            type:'line',
		            symbol:'circle',
                    itemStyle:{
                    	normal:{
                    		lineStyle:{
                    			type:"solid",
                    			width:2
                    		},
                    		itemStyle:{
                    			color:"#000000"
                    		}
                    	}
                    },
		            data:datas
		        }
		    ]
		};
	this.updateData(option,true);
};


//===============================================================================

/**
 * RecordBarChart
 * @class MobileDataScreen.RecordBarChart
 * @extends LSMScreen.DataChartBase
 * @classdesc 接口数柱状图
 */
MobileDataScreen.RecordBarChart=function (){
	this.initialize.apply(this, arguments);
};
/** 从DataChartBase继承*/
MobileDataScreen.RecordBarChart.prototype=Object.create(LSMScreen.DataChartBase.prototype);
MobileDataScreen.RecordBarChart.prototype.constructor=MobileDataScreen.RecordBarChart;

/** 
 * 请求数据接口 由update调用
 * @public
 * @function 
 * @param {Object} queryConfig 查询参数
 * @example
 * {
 * }
 */
MobileDataScreen.RecordBarChart.prototype.updateChart=function(result){
	
	var list=result;
	if(list==null){
		list=[];
	}
	var xDatas=[];
	var esbs=[];
	var dpis=[];
	for(var i=0;i<list.length;i++){
		var record=list[i];
		var time=record.STAT_TIME;
		var value=record.VALUE;
		if(record.KPI_NAME=="kpi_001"){
			var month=time.substring(4,6);
			var day=time.substring(6,8);
			xDatas.push(month+"-"+day);
			esbs.push(value);
		}else if(record.KPI_NAME=="kpi_002"){
			dpis.push(value);
		}
	}
	
	var option = {
			color:["#fffc01","#22f2ff"],
		    tooltip : {
		        trigger: 'axis',
		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
		            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        }
		    },
		    legend: {
		    	show:true,
		    	x:'center',
		    	y:'bottom',
		    	textStyle:{
		        	color:'#ffffff',
		        	fontSize:16,
    				fontWeight:'bold'
		        },
		    	data:['ESB接口数/个','DPI接口数/个']
		    },
		    toolbox: {
		        show : false
		    },
		    calculable : false,
		    xAxis : [
		        {
		        	axisLabel:{
		        		textStyle:{
				        	color:'#ffffff',
		    				fontWeight:'bold'
				        },
		        	},
		        	axisLine:{
		        		lineStyle:{
		        			color:'#1b97bb'
		        		}
		        	},
		        	splitLine:{
		        		lineStyle:{
		        			color:'#092f3a'
		        		}
		        	},
		            type : 'category',
		            data : xDatas
		        }
		    ],
		    yAxis : [
		        {
		        	axisLabel:{
		        		textStyle:{
				        	color:'#ffffff',
		    				fontWeight:'bold'
				        },
		        	},
		        	axisLine:{
		        		lineStyle:{
		        			color:'#1b97bb'
		        		}
		        	},
		        	splitLine:{
		        		lineStyle:{
		        			color:'#092f3a'
		        		}
		        	},
		            type : 'value'
		        },{
		        	show:false,
		        	axisLabel:{
		        		textStyle:{
				        	color:'#ffffff',
		    				fontWeight:'bold'
				        },
		        	},
		        	axisLine:{
		        		lineStyle:{
		        			color:'#1b97bb'
		        		}
		        	},
		        	splitLine:{
		        		lineStyle:{
		        			color:'#092f3a'
		        		}
		        	},
		            type : 'value',
		            max:100,
		            min:0
		        }
		    ],
		    grid:{
		    	borderWidth:1,
		    	borderColor:'#092f3a',
		    	x:80,
		    	y:15,
		    	x2:10,
		    	y2:80
		    },
		    series : [//['ESB接口数/个','DPI接口数/个']
		        {
		            name:'ESB接口数/个',
		            type:'bar',
                    itemStyle:{
                    	normal:{
                    	}
                    },
		            data:esbs
		        },{
		            name:'DPI接口数/个',
		            type:'bar',
                    itemStyle:{
                    	normal:{
                    	}
                    },
		            data:dpis
		        }
		    ]
		};
	this.updateData(option,true);
};

//======================================================
/**
 * InterfaceRingChart
 * @class MobileDataScreen.InterfaceRingChart
 * @extends LSMScreen.DataChartPie
 * @classdesc 饼图和环形图
 */
MobileDataScreen.InterfaceRingChart=function (){
	this.initialize.apply(this, arguments);
};
/** 从DataChartBase继承*/
MobileDataScreen.InterfaceRingChart.prototype=Object.create(LSMScreen.DataChartPie.prototype);
MobileDataScreen.InterfaceRingChart.prototype.constructor=MobileDataScreen.InterfaceRingChart;


/** 
 * 请求数据接口 由update调用
 * @public
 * @function 
 * @param {Object} queryConfig 查询参数
 * @example
 * {
 * }
 */
MobileDataScreen.InterfaceRingChart.prototype.updateChart=function(result){
	var option = {
			color:['#fefe00','#ffe401','#ffc700','#ffac01','#8bfffe','#00bbff','#0166fe','#0224ff'],
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    legend: {
		        orient : 'horizontal',
		        x : 'center',
		        y : 'bottom',
		        textStyle:{
		        	color:'#ffffff',
		        	fontSize:16,
    				fontWeight:'bold'
		        },
		        data:['ESB接口数/个','DPI接口数/个']
		    },
		    toolbox: {
		        show : false
		    },
		    calculable : true,
		    series : [
		        {
		            name:'接口占比',
		            type:'pie',
		            selectedMode: 'single',
		            radius : [40, 100],
		            center:['50%','50%'],
		            funnelAlign: 'right',
		            itemStyle : {
		                normal : {
		                	color:function(param){
			            		var colors=['#ffac01','#8bfffe'];
			            		return colors[param.dataIndex];
			            	},
		                    label : {
		                        formatter:'{c}',
		                        textStyle:{
		                        	fontSize:30,
		            				fontWeight:'bold'
		                        }
		                    },
		                    labelLine : {
		                        show : true,
		                        length:40
		                    }
		                }
		            },
		            data:[
		                {value:result["kpi_001"], name:'ESB接口数/个'},
		                {value:result["kpi_002"], name:'DPI接口数/个'}
		            ]
		        },{
		            name:'接口占比 ',
		            type:'pie',
		            selectedMode: 'single',
		            radius : [40, 100],
		            center:['50%','50%'],
		            funnelAlign: 'right',
		            itemStyle : {
		                normal : {
		                	color:function(param){
			            		var colors=['#ffac01','#8bfffe'];
			            		return colors[param.dataIndex];
			            	},
		                    label : {
		                    	position:'inner',
		                        formatter:'{d}%',
		                        textStyle:{
		                        	color:"#000000",
		                        	fontSize:16
		                        }
		                    },
		                    labelLine : {
		                        show : false,
		                        length:40
		                    }
		                }
		            },
		            data:[
		                {value:result["kpi_001"], name:'ESB接口数/个'},
		                {value:result["kpi_002"], name:'DPI接口数/个'}
		            ]
		        }
		    ]
		};
	this.updateData(option,true);
};

MobileDataScreen.InterfaceRingChart.prototype.dataHandler=function(chartData){
//	this.updateData(option,true);
};

