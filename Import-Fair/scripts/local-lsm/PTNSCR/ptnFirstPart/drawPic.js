require(['echarts'], function(ec) {});
var ecConfig = require('echarts/config');
var zrColor = require('zrender/tool/color');
var echObjects = {}; // echObjects 全局对象

//画图方法
var eastcom_echarts_drawChart = {
    init: function(chartId, option) { //初始化方法
        var me = this;
        require(['echarts', 'echarts/theme/macarons', 'echarts/chart/bar', 'echarts/chart/line',
            'echarts/chart/pie', 'echarts/chart/gauge'
        ], function(ec, theme, bar, line, pie, gauge) {
            var myChart = ec.init(document.getElementById(chartId), theme);
            //var myChart = ec.init(document.getElementById(chartId));
            echObjects[chartId] = myChart;
            me.loadEchart(chartId, option);
            me.resize(chartId);
            myChart.on(ecConfig.EVENT.CLICK, function(param) {
                if (typeof param.seriesIndex == 'undefined') {
                    return;
                }
                if (param.type == 'click') {
                    if (chartId == "echarts13" || option.series[0].stack == "同一类") {
                        //alert(param.name);
                        internetTV.addBigWinOfEchartsOfPie(param.name);
                    }
                }
            }); //CLICK
        });
    },
    resize: function(chartId) {
        window.onresize = function() {
            for (var chartId in echObjects) {
                echObjects[chartId].resize();
            }
        }
    },
    loadEchart: function(chartId, optionObj) { //加载chart的方法
        var me = this;
        var myChart = echObjects[chartId];

        var option = optionObj; //获得option对象
        if (option == null) { //为空这提示div里的内容，类似not data
            document.getElementById(chartId).innerHTML = me.chartHtml;
            echObjects[chartId] = null; //清空全局变量里的chart对象
        } else {
            myChart.setOption(option);
           // window.onresize = myChart.resize;
        }
    },
    getOption: function() { //获取option对象
        var option = {
            backgroundColor: "#ffffff" //背景色，设置成全白，不设置属性，则透明
        };
        return option;
    }

};
//双折线
var eastcom_echarts_line = {
    loadDataToChart: function(chartId, xx, yy,legend) { //加载chart
        var me = this;
        var option = me.initOption(chartId, xx, yy,legend);
        eastcom_echarts_drawChart.init(chartId, option);
    },
    initOption: function(chartId, xx, yy,legend) { //获取option对象
        var option = {
        		color:['rgb(0,217,255)','rgb(255,146,0)'],
            title: {
                text: ''
            },
            legend: {
                data: legend,
                y:'top',
                x:'right',
                textStyle: {
                    color: LSMScreen.CHARTCONFIG.xAxisLabelColor,
                    fontSize: LSMScreen.CHARTCONFIG.axisLabelSize * 0.5
                },
            },
            tooltip: {
                trigger: 'axis', 
            },
            /*grid: {
                x: 55,
                y: '12%',
                x2: '10%',
                y2: '25%',
                borderWidth:0
            },*/
            grid: {
                x: 55,
                y: 50,
                x2: 15,
                y2: 45,
                borderWidth:0
            },
            calculable: false,
            xAxis: {
                data: xx, //list
                //name: '用户名',
                boundaryGap: false,
                axisLabel: {
                	rotate:30,
                    textStyle: {
                        color: LSMScreen.CHARTCONFIG.xAxisLabelColor,
                        fontSize: 12
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: LSMScreen.CHARTCONFIG.xAxisColor,
                        width: 2,
                        type: 'solid'
                    }
                },
                splitLine: {
                    show:false,
                    lineStyle: {
                        color: LSMScreen.CHARTCONFIG.xAxisColor,
                        width: 1,
                        type: 'solid'
                    }
                },
                axisTick:{show:true,lineStyle:{color:'#fff'}}
            },
            yAxis: [{
            	name:"流量(GB)",
                type: 'value',
                splitNumber:3,
                axisLine:{       //y轴
                    show:true,
                    lineStyle:{
                    	width:0,
                    }

                  },
                axisLabel: {
                    textStyle: {
                        color: LSMScreen.CHARTCONFIG.xAxisLabelColor,
                        fontSize: 12
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: LSMScreen.CHARTCONFIG.yAxisColor,
                        width: 1,
                        type: 'solid'
                    }
                },
                nameTextStyle:{
                  	 color: "white",
                  },
                splitArea:{show:false},
                formatter: '{value}',
            }],
            series: [{
                name: legend[0],
               /* markPoint : {
                    data : [
                        {type : 'max', name: '最大值'},
                        {type : 'min', name: '最小值'}
                    ]
                },*/

                type: 'line',
                symbol: "none",
                data: yy[0]
            }, {
                name: legend[1],
               /* markPoint : {
                    data : [
                        {type : 'max', name: '最大值'},
                    ]
                },*/

                type: 'line',
                symbol: "none",
                data: yy[1]
            }]
        };        
        return option;
    }
}

//柱图折线图
var eastcom_echarts_line_bar = {
    loadDataToChart: function(chartId, xx, yy,threshold,kpis) { //加载chart
        var me = this;
        if(kpis==null){
        	kpis=['流速(Gbps)', '利用率(%)'];
        }
        var option = me.initOption(chartId, xx, yy,threshold,kpis);
        eastcom_echarts_drawChart.init(chartId, option);
    },
    initOption: function(chartId, xx, yy,threshold,kpis) { //获取option对象
        var legend = kpis;
        if(chartId=="echartsadd_08"){
        	legend=['流速(Gbps)', '容量利用率(%)'];
        }
        var series=[];
        for(var i=0;i<yy.length;i++){
        	series.push({
                name: legend[i],
                type: i%2==0?'bar':'line',
                data: yy[i],
                yAxisIndex:i%2
            });
        }
        var option = {
        		color:['rgb(0,217,255)','rgb(255,146,0)'],
            title: {
                text: ''
            },
            legend: {
                data: legend,
                y:'top',
                x:'right',
                textStyle: {
                    color: "white",
                },
            },
            tooltip: {
                trigger: 'axis',
                //formatter: "时间: {b}<br/>值 : {c}",
                formatter: "时间: {b}<br/>"+legend[0]+" : {c0}<br/>"+legend[1]+" : {c1}",
                position: function(point) {
                    var wid = $("#" + chartId).width() / 2;
                    var hei = $("#" + chartId).height() / 2;
                    var x = point[0];
                    var y = point[1];
                    if (x < wid) {
                        if (y > hei) {
                            return [x + 10, y - 40]
                        } else {
                            return [x + 10, y + 40]
                        }
                    } else {
                        if (y > hei) {
                            return [x - 160, y - 50]
                        } else {
                            return [x - 160, y + 40]
                        }
                    }
                }
            },
            /*grid: {
                x: 55,
                y: '12%',
                x2: '12%',
                y2: '25%',
                borderWidth:0
            },*/
            grid: {
            	 x: 55,
	                y: 25,
	                x2: 55,
	                y2: 65,
                borderWidth:0
            },
            calculable: false,
            xAxis: {
                data: xx, //list
                //name: '用户名',
                boundaryGap: true,
                axisLabel: {
                    textStyle: {
                        color: LSMScreen.CHARTCONFIG.xAxisLabelColor,
                        fontSize: 12
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: LSMScreen.CHARTCONFIG.xAxisColor,
                        width: 2,
                        type: 'solid'
                    }
                },
                splitLine: {
                    show:false,
                    lineStyle: {
                        color: LSMScreen.CHARTCONFIG.xAxisColor,
                        width: 1,
                        type: 'solid'
                    }
                },
                axisTick:{show:true,lineStyle:{color:'#fff'}}
            },
            yAxis: [{
                name:legend[0].substring(0,legend[0].indexOf('(')),
                type: 'value',
                axisLine:{show:true,lineStyle:{color:'#078ceb',width:1}},
                splitLine:{show:true,lineStyle: {
                	color:"#078ceb",
                    width: 1,
                    type: 'solid'
                }},
                axisTick:{show:true,lineStyle:{color:'black',width:12}},
                splitArea:{show:false},
                axisLabel:{
                    textStyle:{
                                color:"rgb(54,107,182)"
                    }
                },
                splitArea:{show:false},
                nameTextStyle:{
                  	 color: "white",
                  },
                formatter: '{value}',
            },{
                name:legend[1].substring(0,legend[1].indexOf('(')), 
                type: 'value',
                axisLine:{show:true,lineStyle:{color:'#078ceb',width:1}},
                splitLine:{show:false,lineStyle: {
                	color:"#078ceb",
                    width: 1,
                    type: 'solid'
                }},
                splitArea:{show:false},
                axisLabel:{
                    textStyle:{
                                color:"rgb(54,107,182)"
                    }
                },
                axisTick:{show:true,lineStyle:{color:'black',width:12}},
                splitArea:{show:false},
                formatter: '{value}',
            }],
            series: series
        };
        
        if (chartId == "echartsCommon") {
            var grid = {
                        x: '8%',
                        y: '6%',
                        x2: '8%',
                        y2: '15%',
                        borderWidth:0
            };
            option.grid = grid;
        }
        return option;
    }
}
//玫瑰图
var eastcom_echarts_rose_pie = {
    loadDataToChart: function(chartId,rosedata) { //加载chart
        var me = this;        
        var option = me.initOption(chartId,rosedata);
        eastcom_echarts_drawChart.init(chartId, option);
    },
    initOption: function(chartId,rosedata) { //获取option对象
        var legend = rosedata.legend;
        var option = {
        		//color:['rgb(139,219,89)','rgb(253,255,0)','red','rgb(0,177,241)'],
        		//color:['rgb(139,219,89)','darkorange','red','deepskyblue'],
        		//color:['green','black','white','blue'],
        		color:['rgb(139,219,89)','darkorange','red','deepskyblue'],
        		title: {
                text: ''
            },
            legend: {
                data: legend,
                show:false,
            },
            tooltip : {
		        trigger: 'item',
		        position:function(p){
		            var id = document.getElementById(chartId);
		            /*if ($(id).width() - p[0]- $(id).find("div .echarts-tooltip").width()-20 <0) {
		                p[0] = p[0] - $(id).find("div .echarts-tooltip").width() -60;
		            }*/
		            return [0, 100];
		        },
		        formatter : function(obj){
		        	var tip = obj.data.name1;
		        	return tip;
		        }
		    },
           /* grid: {
            	 	x: 35,
	                y: 35,
	                x2: 35,
	                y2: 35,
                borderWidth:0
            },*/
            calculable: false,
            series : [
                      {
                          name:'访问来源',
                          type:'pie',
                          radius : '68%',
                          center: ['50%', '50%'],
                          data:rosedata.data
                      }
                  ],
        };
        return option;
    }
}


//柱图折线图
var eastcom_echarts_chart_liuSu = {
    loadDataToChart: function(chartId, obj) { //加载chart
        var me = this;
        
        var option = me.initOption(chartId,obj);
        eastcom_echarts_drawChart.init(chartId, option);
    },
    initOption: function(chartId, obj) { //获取option对象
        //var stie=obj.site.reverse();
    	
    	if(obj.area.length>0){
    		area=obj.area.reverse();
    	}else{
    		area= obj.area;
    	}
    	if(obj.site.length>0){
    		site= obj.site.reverse();
    	}else{
    		site= obj.site;
    	}
    	
        /*for(var i=0;i<xx.length;i++){
        	series.push({
                name: legend[i],
                type: 'bar',
                data: xx[i],
            });
        }
        */
        option = {
        		color:['rgb(0,217,255)','rgb(255,146,0)'],
        	    title : {
        	        text: '',
        	    },
        	    tooltip : {
        	        trigger: 'axis',
        	        
        	    },
        	    legend: {
        	        data:obj.legend,
        	        y:'top',
                    x:'right',
                    textStyle:{
                    	color:"white"
                    },
        	    },
        	    toolbox: {
        	        show : false,
        	        feature : {
        	            mark : {show: true},
        	            dataView : {show: true, readOnly: false},
        	            magicType: {show: true, type: ['line', 'bar']},
        	            restore : {show: true},
        	            saveAsImage : {show: true}
        	        }
        	    },
        	    grid: {
        	    	x: 75,
   	                y: 28,
   	                x2: 55,
   	                y2: 25,
                   borderWidth:0,
                   containLabel: true,
               },
        	    calculable : true,
        	    xAxis : [
        	        {
        	            type : 'value',
        	            axisLine:{       //y轴
                            show:false
                          },
                          axisLabel: {
                              textStyle: {
                                  color: LSMScreen.CHARTCONFIG.xAxisLabelColor,
                                  fontSize: 12
                              }
                          },
                          splitLine: {
                              show:true,
                              lineStyle: {
                                	color:"rgb(70,110,162)",
                                    width: 1,
                                    type: 'solid'
                                },
                          },
                          splitArea : {show : false}
        	        }
        	    ],
        	    yAxis : [
        	        {
        	            type : 'category',
        	            data : obj.hot_name,
        	            axisLine:{show:true,lineStyle:{color:'#078ceb',width:1}},
        	            axisTick:{show:false,lineStyle:{color:'#078ceb',width:1}},
                        splitLine:{show:false,lineStyle: {
                        	color:"rgb(54,107,182)",
                            width: 1,
                            type: 'solid'
                        }},
                        splitArea:{show:false},
                        axisLabel:{
                            textStyle:{
                                        color:"white"

                            }
                        },
                        nameTextStyle:{
                          	 color: "white",
                          },
                        splitArea:{show:false},
        	        }
        	    ],
        	    series : [
        	        {
        	            name:'单站流速峰值(Mbps)',
        	            type:'bar',
        	            data:site
        	        },
        	        {
        	            name:'区域流速峰值(Mbps)',
        	            type:'bar',
        	            data:area
        	        }
        	    ]
        	};
       
        return option;
    }
}