//jquery选择器
var SELECTOR = {
	'radarchart1': '.list-style2',
	'radarchart2': '.list-style2',
	'radarchart3': '.list-style2',
	'pieandring1': '.list-style1',
	'pieandring2': '.list-style1',
	'pieandring3': '.list-style1',
	'lineandstack1': '.list-style1',
	'lineandstack2': '.list-style1'
};
var COLOR_TRE = {
	normal: '#00ff66',
	alarm: '#ff0066'
};

var MobileDataScreen = MobileDataScreen || {};
MobileDataScreen.ScreenController=function (){
	this.initialize.apply(this, arguments);
};
MobileDataScreen.ScreenController.prototype=Object.create(LSMScreen.ScreenBase.prototype);
MobileDataScreen.ScreenController.prototype.constructor=MobileDataScreen.ScreenController;

MobileDataScreen.ScreenController.prototype.stationTypeMap={};
MobileDataScreen.ScreenController.prototype.initConfigs=function(){
	this.initComponents();
};
MobileDataScreen.ScreenController.prototype.initComponents=function(){
	
	this.radar1=new MobileDataScreen.RadarChart(
			$("#radarchart1")[0],
			{title:"实时数据处理雷达图",contentHeight:220},
			function(){
				this.radar1.update();
			}.bind(this)
	);
	this.radar2=new MobileDataScreen.RadarChart(
			$("#radarchart2")[0],
			{title:"清单数据存储处理雷达图",contentHeight:220},
			function(){
				this.radar2.update();
			}.bind(this)
	);
	this.radar3=new MobileDataScreen.RadarChart(
			$("#radarchart3")[0],
			{title:"批量离线数据处理雷达图",contentHeight:220},
			function(){
				this.radar3.update();
			}.bind(this)
	);
	
	this.par1=new MobileDataScreen.PieAndRing(
			$("#pieandring1")[0],
			{title:"实时数据共享服务饼图",contentHeight:120},
			function(){
				this.par1.update();
			}.bind(this)
	);
	this.par2=new MobileDataScreen.PieAndRing(
			$("#pieandring2")[0],
			{title:"清单查询共享服务饼图",contentHeight:110},
			function(){
				this.par2.update();
			}.bind(this)
	);
	this.par3=new MobileDataScreen.PieAndRing(
			$("#pieandring3")[0],
			{title:"批量处理共享服务饼图",contentHeight:110},
			function(){
				this.par3.update();
			}.bind(this)
	);
	
	this.las1=new MobileDataScreen.LineAndStack(
			$("#lineandstack1")[0],
			{title:"DPI接口图表",contentHeight:290},
			function(){
				this.las1.update();
			}.bind(this)
	);
	
	this.las2=new MobileDataScreen.LineAndStack(
			$("#lineandstack2")[0],
			{title:"ESB接口图表",contentHeight:290},
			function(){
				this.las2.update();
			}.bind(this)
	);

	this.update();

	initCustomEvents();
};

MobileDataScreen.ScreenController.prototype.update=function(){
	var dm=LSMScreen.DataManager.getInstance();
	dm.getMobileDataKpiCalculater({},this.latestDataHandler.bind(this));
	dm.getMobileDataKpiTrend({},this.trendDataHandler.bind(this));
};

function initCustomEvents(){
	$('#flowWinBtn .data-button').on('click',function(){
		document.getElementById('flowWin').style.display = 'block';
	});
	$('#flowWinClose').on('click',function(){
		document.getElementById('flowWin').style.display = 'none';
	});
}

MobileDataScreen.ScreenController.prototype.latestDataHandler=function(data){
	for(var name in SELECTOR){
		selectStyle(name);
		selectTableStyle(name);
	}
};

MobileDataScreen.ScreenController.prototype.trendDataHandler=function(data){
	console.log(data);
	var option = updateRadarData();
	this.radar1.updateData(option,true);
};
function selectStyle(id){
	var $parentPreChildren = $('#'+id).parent().prev().children();
	var classStyle = SELECTOR[id];
	var $targetArr = $parentPreChildren.find(classStyle).find('span');
	$targetArr.map(function(dom){
		var val = parseInt(Math.random()*(100-50)+50);
		if(val <= 55){
			this.style.color = COLOR_TRE['alarm'];
		}else{
			this.style.color = COLOR_TRE['normal'];
		}
		$(this).find('b').text(val);
	});
}
function selectTableStyle(id){
	var $parentPreChildren = $('#'+id).parent().parent().children();
	var table = $parentPreChildren[1];
	$(table).find('span').map(function(dom){
		var val = parseInt(Math.random()*(10000-1));
		$(this).text(val);
	});
}
function updateRadarData(){
	var legendData = ['09/11','09/12','09/13','09/14','','09/15','09/16','09/17'],
		polarData = [{
		           indicator : [
		 		               { text: '及时性\n问题数', max: 10000},
		 		               { text: '准确性\n问题数', max: 10000},
		 		               { text: '完整性\n问题数', max: 10000}
		 		            ],
		 		           name:{textStyle:{
		 	              		color:"#ffffff",
		 	              		fontSize:12
		 	              	}},
		 	              	center:['40%','50%'],
		 		            splitArea:{
		 		            	show:false
		 		            }
		    }],
		seriesData = [
	                {
	                    value : [Math.random()*10000, Math.random()*10000, Math.random()*10000],
	                    name : '09/11',
	                    itemStyle:{
	                    	normal:{
	                    		lineStyle:{
	                    			type:"solid",
	                    			width:2
	                    		}
	                    	}
	                    }
	                },
	                 {
	                    value : [Math.random()*10000, Math.random()*10000, Math.random()*10000],
	                    name : '09/12',
	                    itemStyle:{
	                    	normal:{
	                    		lineStyle:{
	                    			type:"dotted",
	                    			width:2
	                    		}
	                    	}
	                    }
	                },
	                 {
	                    value : [Math.random()*10000, Math.random()*10000, Math.random()*10000],
	                    name : '09/13',
	                    itemStyle:{
	                    	normal:{
	                    		lineStyle:{
	                    			type:"dashed",
	                    			width:2
	                    		}
	                    	}
	                    }
	                },
	                 {
	                    value : [Math.random()*10000, Math.random()*10000, Math.random()*10000],
	                    name : '09/14',
	                    itemStyle:{
	                    	normal:{
	                    		lineStyle:{
	                    			type:"solid",
	                    			width:2
	                    		}
	                    	}
	                    }
	                },
	                 {
	                    value : [Math.random()*10000, Math.random()*10000, Math.random()*10000],
	                    name : '09/15',
	                    itemStyle:{
	                    	normal:{
	                    		lineStyle:{
	                    			type:"dotted",
	                    			width:2
	                    		}
	                    	}
	                    }
	                },
	                 {
	                    value : [Math.random()*10000, Math.random()*10000, Math.random()*10000],
	                    name : '09/16',
	                    itemStyle:{
	                    	normal:{
	                    		lineStyle:{
	                    			type:"dashed",
	                    			width:2
	                    		}
	                    	}
	                    }
	                },
	                 {
	                    value : [Math.random()*10000, Math.random()*10000, Math.random()*10000],
	                    name : '09/17',
	                    itemStyle:{
	                    	normal:{
	                    		lineStyle:{
	                    			type:"solid",
	                    			width:2
	                    		}
	                    	}
	                    }
	                }
	            ];
	return getRararOption(legendData,polarData,seriesData);
}
function getRararOption(legendData, polarData, seriesData){
	var option = {
			tooltip : {
		        trigger: 'item'
		    },
		    legend: {
		    	show : true,
		    	data:legendData,
		    	x:'right',
		    	orient:'vertical',
		    	textStyle:{
		    		color:LSMConsts.baseFontColor,
		    		fontSize:12}
		    },
		    title : {
		        show:false
		    },
		    toolbox: {
		        show : false
		    },
		    polar : polarData,
		    calculable : false,
		    color:["#fefe00","#fef600","#ffe905","#fce400","#fce001","#ffc600","#febf02"],
		    series : [{
	            name: '实时数据处理',
	            type: 'radar',
	            scale:true,
	            data : seriesData
	        }]
		};
	return option;
}
//=====================================================

/**
 * RadarChart
 * @class MobileDataScreen.RadarChart
 * @extends LSMScreen.DataChartPie
 * @classdesc 雷达图
 */
MobileDataScreen.RadarChart=function (){
	this.initialize.apply(this, arguments);
};
/** 从DataChartBase继承*/
MobileDataScreen.RadarChart.prototype=Object.create(LSMScreen.DataChartRadar.prototype);
MobileDataScreen.RadarChart.prototype.constructor=MobileDataScreen.RadarChart;


/** 
 * 请求数据接口 由update调用
 * @public
 * @function 
 * @param {Object} queryConfig 查询参数
 * @example
 * {
 * }
 */
MobileDataScreen.RadarChart.prototype.query=function(queryConfig){
	var option = {
			tooltip : {
		        trigger: 'item'
		    },
		    legend: {
		    	show : true,
		    	data:['08/11','08/12','08/13','08/14','','08/15','08/16','08/17'],
		    	x:'right',
		    	orient:'vertical',
		    	textStyle:{
		    		color:LSMConsts.baseFontColor,
		    		fontSize:12}
		    },
		    title : {
		        show:false
		    },
		    toolbox: {
		        show : false
		    },
		    polar : [{
		           indicator : [
		 		               { text: '及时性\n问题数', max: 10000},
		 		               { text: '准确性\n问题数', max: 10000},
		 		               { text: '完整性\n问题数', max: 10000}
		 		            ],
		 		           name:{textStyle:{
		 	              		color:"#ffffff",
		 	              		fontSize:12
		 	              	}},
		 	              	center:['40%','50%'],
		 		            splitArea:{
		 		            	show:false
		 		            }
		    }],
		    calculable : false,
		    color:["#fefe00","#fef600","#ffe905","#fce400","#fce001","#ffc600","#febf02"],
		    series : [{
	            name: '实时数据处理',
	            type: 'radar',
	            scale:true,
	            data : [
	                {
	                    value : [Math.random()*10000, Math.random()*10000, Math.random()*10000],
	                    name : '08/11',
	                    itemStyle:{
	                    	normal:{
	                    		lineStyle:{
	                    			type:"solid",
	                    			width:2
	                    		}
	                    	}
	                    }
	                },
	                 {
	                    value : [Math.random()*10000, Math.random()*10000, Math.random()*10000],
	                    name : '08/12',
	                    itemStyle:{
	                    	normal:{
	                    		lineStyle:{
	                    			type:"dotted",
	                    			width:2
	                    		}
	                    	}
	                    }
	                },
	                 {
	                    value : [Math.random()*10000, Math.random()*10000, Math.random()*10000],
	                    name : '08/13',
	                    itemStyle:{
	                    	normal:{
	                    		lineStyle:{
	                    			type:"dashed",
	                    			width:2
	                    		}
	                    	}
	                    }
	                },
	                 {
	                    value : [Math.random()*10000, Math.random()*10000, Math.random()*10000],
	                    name : '08/14',
	                    itemStyle:{
	                    	normal:{
	                    		lineStyle:{
	                    			type:"solid",
	                    			width:2
	                    		}
	                    	}
	                    }
	                },
	                 {
	                    value : [Math.random()*10000, Math.random()*10000, Math.random()*10000],
	                    name : '08/15',
	                    itemStyle:{
	                    	normal:{
	                    		lineStyle:{
	                    			type:"dotted",
	                    			width:2
	                    		}
	                    	}
	                    }
	                },
	                 {
	                    value : [Math.random()*10000, Math.random()*10000, Math.random()*10000],
	                    name : '08/16',
	                    itemStyle:{
	                    	normal:{
	                    		lineStyle:{
	                    			type:"dashed",
	                    			width:2
	                    		}
	                    	}
	                    }
	                },
	                 {
	                    value : [Math.random()*10000, Math.random()*10000, Math.random()*10000],
	                    name : '08/17',
	                    itemStyle:{
	                    	normal:{
	                    		lineStyle:{
	                    			type:"solid",
	                    			width:2
	                    		}
	                    	}
	                    }
	                }
	            ]
	        }]
		};
	this.updateData(option,true);
};

MobileDataScreen.RadarChart.prototype.dataHandler=function(chartData){
//	this.updateData(option,true);
};

//======================================================
/**
 * PieAndRing
 * @class MobileDataScreen.PieAndRing
 * @extends LSMScreen.DataChartPie
 * @classdesc 饼图和环形图
 */
MobileDataScreen.PieAndRing=function (){
	this.initialize.apply(this, arguments);
};
/** 从DataChartBase继承*/
MobileDataScreen.PieAndRing.prototype=Object.create(LSMScreen.DataChartPie.prototype);
MobileDataScreen.PieAndRing.prototype.constructor=MobileDataScreen.PieAndRing;


/** 
 * 请求数据接口 由update调用
 * @public
 * @function 
 * @param {Object} queryConfig 查询参数
 * @example
 * {
 * }
 */
MobileDataScreen.PieAndRing.prototype.query=function(queryConfig){
	var pieFontSize=14;
	var option = {
			color:['#fefe00','#ffe401','#ffc700','#ffac01','#8bfffe','#00bbff','#0166fe','#0224ff'],
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    legend: {
		        orient : 'vertical',
		        x : 'left',
		        y : 'center',
		        textStyle:{
		        	color:'#ffffff',
		        	fontSize:pieFontSize,
    				fontWeight:'bold'
		        },
		        data:['完整性问题数','及时性问题数']
		    },
		    toolbox: {
		        show : false
		    },
		    calculable : false,
		    series : [
		        {
		            name:'访问来源',
		            type:'pie',
		            selectedMode: 'single',
		            radius : [0, 25],
		            center:['70%','50%'],
		            funnelAlign: 'right',
		            max: 1548,
		            itemStyle : {
		                normal : {
		                	color:function(param){
			            		var colors=['#ffac01','#8bfffe'];
			            		return colors[param.dataIndex];
			            	},
		                    label : {
		                        position : 'inner',
		                        formatter:'{c}',
		                        textStyle:{
		                        	color:'#000000',
		                        	fontSize:pieFontSize,
		            				fontWeight:'bold'
		                        }
		                    },
		                    labelLine : {
		                        show : false
		                    }
		                }
		            },
		            data:[
		                {value:40, name:'及时性问题数'},
		                {value:60, name:'完整性问题数'}
		            ]
		        },
		        {
		            name:'访问来源',
		            type:'pie',
		            center:['70%','50%'],
		            radius : [30, 45],
		            funnelAlign: 'left',
		            max: 1048,
		            itemStyle:{
		            	normal:{
		            		label:{
		            			formatter:'{b}   {c}',
		            			textStyle:{
		            				fontSize:pieFontSize,
		            				fontWeight:'bold'
		            			}
		            		},
		            		labelLine:{
		            			length:0
		            		}
		            	}
		            },
		            data:[
		                {value:11, name:'流量类'},
		                {value:15, name:'用户数类'},
		                {value:9, name:'速率'},
		                {value:5, name:'业务质量'},
		                {value:25, name:'流量类 '},
		                {value:20, name:'用户数类 '},
		                {value:5, name:'速率 '},
		                {value:10, name:'业务质量 '}
		            ]
		        }
		    ]
		};
	this.updateData(option,true);
};

MobileDataScreen.PieAndRing.prototype.dataHandler=function(chartData){
//	this.updateData(option,true);
};

//===============================================================================

/**
 * LineAndStack
 * @class MobileDataScreen.LineAndStack
 * @extends LSMScreen.DataChartPie
 * @classdesc 线和堆栈
 */
MobileDataScreen.LineAndStack=function (){
	this.initialize.apply(this, arguments);
};
/** 从DataChartBase继承*/
MobileDataScreen.LineAndStack.prototype=Object.create(LSMScreen.DataChartBase.prototype);
MobileDataScreen.LineAndStack.prototype.constructor=MobileDataScreen.LineAndStack;


/** 
 * 请求数据接口 由update调用
 * @public
 * @function 
 * @param {Object} queryConfig 查询参数
 * @example
 * {
 * }
 */
MobileDataScreen.LineAndStack.prototype.query=function(queryConfig){
	var option = {
			color:["#0041ff","#029cff","#58d1e4"],
		    tooltip : {
		        trigger: 'axis',
		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
		            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        }
		    },
		    legend: {
		    	borderWidth:1,
		    	borderColor:'#092f3a',
		        data:['及时性问题数','完整性问题数','准确性问题数','','及时率','完整率','准确率'],
		        textStyle:{
		        	color:'#ffffff',
    				fontWeight:'bold'
		        },
		        y:'bottom'
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
		            data : ['周一','周二','周三','周四','周五','周六','周日']
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
		    series : [
		        {
		            name:'及时性问题数', 
		            type:'bar',
		            stack: '问题数',
		            barWidth : 25,
		            itemStyle:{
		            	normal:{
		            		barBorderRadius:5,
		            		label:{
		            			show:true,
		            			position:'insideTop',
		            			formatter:'{c}',
		            			textStyle:{
		            				color:'#ffffff'
		            			}
		            		}
		            	}
		            },
		            data:[120, 132, 101, 134, 90, 230, 210]
		        },
		        {
		            name:'完整性问题数',
		            type:'bar',
		            stack: '问题数',
		            barWidth : 25,
		            itemStyle:{
		            	normal:{
		            		barBorderRadius:5,
		            		label:{
		            			show:true,
		            			position:'insideTop',
		            			formatter:'{c}',
		            			textStyle:{
		            				color:'#ffffff'
		            			}
		            		}
		            	}
		            },
		            data:[220, 182, 191, 234, 290, 330, 310]
		        },
		        {
		            name:'准确性问题数',
		            type:'bar',
		            stack: '问题数',
		            barWidth : 25,
		            itemStyle:{
		            	normal:{
		            		barBorderRadius:5,
		            		label:{
		            			show:true,
		            			position:'insideTop',
		            			formatter:'{c}',
		            			textStyle:{
		            				color:'#ffffff'
		            			}
		            		}
		            	}
		            },
		            data:[150, 232, 201, 154, 190, 330, 410]
		        },
		        {
		            name:'及时率',
		            type:'line',
		            yAxisIndex:1,
                    itemStyle:{
                    	normal:{
                    		lineStyle:{
                    			type:"dotted",
                    			width:2
                    		}
                    	}
                    },
		            data:[this.getRandomPercent(), this.getRandomPercent(), this.getRandomPercent(), this.getRandomPercent(), this.getRandomPercent(), this.getRandomPercent(), this.getRandomPercent()]
		        },
		        {
		            name:'完整率',
		            type:'line',
		            yAxisIndex:1,
                    itemStyle:{
                    	normal:{
                    		lineStyle:{
                    			type:"dashed",
                    			width:2
                    		}
                    	}
                    },
		            data:[this.getRandomPercent(), this.getRandomPercent(), this.getRandomPercent(), this.getRandomPercent(), this.getRandomPercent(), this.getRandomPercent(), this.getRandomPercent()]
		        },
		        {
		            name:'准确率',
		            type:'line',
		            yAxisIndex:1,
                    itemStyle:{
                    	normal:{
                    		lineStyle:{
                    			type:"solid",
                    			width:2
                    		}
                    	}
                    },
		            data:[this.getRandomPercent(), this.getRandomPercent(), this.getRandomPercent(), this.getRandomPercent(), this.getRandomPercent(), this.getRandomPercent(), this.getRandomPercent()]
		        }
		    ]
		};
	this.updateData(option,true);
};
MobileDataScreen.LineAndStack.prototype.getRandomPercent=function(){
	var rand=80+Math.random()*20;
	return parseFloat(rand.toFixed(2));
};
MobileDataScreen.LineAndStack.prototype.dataHandler=function(chartData){
//	this.updateData(option,true);
};