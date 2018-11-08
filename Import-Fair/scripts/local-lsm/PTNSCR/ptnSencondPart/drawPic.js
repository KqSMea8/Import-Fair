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
            myChart.setOption(option,true);
            window.onresize = myChart.resize;
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
    loadDataToChart: function(chartId, xx, yy,text) { //加载chart
        var me = this;
        var option = me.initOption(chartId, xx, yy,text);
        eastcom_echarts_drawChart.init(chartId, option);
    },
    initOption: function(chartId, xx, yy,text) { //获取option对象
    	var legend=['昨日','今日'];
        var option = {
        	color:['rgb(0,217,255)','rgb(255,146,0)'],
            title: {
                text: text,
                x:'center',
                textStyle:{
                	color:"white"
                },
            },
            legend: {
                data: legend,
                y:'top',
                x:'right',
                textStyle:{
                	color:"white"
                },
            },
            tooltip: {
                trigger: 'axis', 
            },
            grid: {
                x: 45,
                y: 65,
                x2: 35,
                y2: 35,
                borderWidth:0
            },
            calculable: false,
            xAxis: {
                data: xx,
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
                    	color:"rgb(54,107,182)",
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
            	name:"流速峰值(Mbps)",
                type: 'value',
                axisLine:{       //y轴
                    show:true,
                    lineStyle:{
                    	width:0,
                    }

                  },
                type: 'value',
                axisLabel: {
                    textStyle: {
                        color: "white",
                        fontSize: 12
                    }
                },
                nameTextStyle:{
               	 color: "white",
               },
                splitLine: {
                    lineStyle: {
                    	color:"rgb(54,107,182)",
                        width: 1,
                        type: 'solid'
                    }
                },
                
                  axisTick:{       //y轴刻度线
                    show:false
                  },
                splitArea:{show:false},
                formatter: '{value}',
            }],
            series: [{
            	symbol: "none",
                name: legend[0],
                type: 'line',
                data: yy.data1
            }, {
            	symbol: "none",
                name: legend[1],
                type: 'line',
               
                data: yy.data2
            }]
        };       
        return option;
    }
}


//双折线
var eastcom_echarts_line_2 = {
    loadDataToChart: function(chartId, xx, yy,text) { //加载chart
        var me = this;
        var option = me.initOption(chartId, xx, yy,text);
        eastcom_echarts_drawChart.init(chartId, option);
    },
    initOption: function(chartId, xx, yy,text) { //获取option对象
    	var legend=['流量','LTE用户附着数']; //流量
        var option = {
        		
            color:['rgb(0,217,255)','rgb(255,146,0)'],
            title: {
                text: text,
                x:'center',
                textStyle:{
                	color:"white"
                },
            },
            legend: {
                data: legend,
                y:'top',
                x:'right',
                textStyle:{
                	color:"white"
                },
            },
            tooltip: {
                trigger: 'axis', 
            },
            grid: {
                x: 35,
                y: 65,
                x2: 35,
                y2: 35,
                borderWidth:0
            },
            calculable: false,
            xAxis: {
                data: xx,
                boundaryGap: false,
                axisLabel: {
                	rotate:30,
                    textStyle: {
                        color: "white",
                        fontSize: 12
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: "rgb(54,107,182)",
                        width: 2,
                        type: 'solid'
                    }
                },
                splitLine: {
                    show:false,
                    lineStyle: {
                        color:"rgb(54,107,182)",
                        width: 1,
                        type: 'solid'
                    }
                },
                axisTick:{show:true,lineStyle:{color:'#fff'}}
            },
            yAxis: [{
            	show:true,
            	name:"流量(GB)",
                type: 'value',
                axisLine:{       //y轴
                    show:true,
                    lineStyle:{
                    	width:0,
                    }

                  },
                type: 'value',
                axisLabel: {
                    textStyle: {
                    	margin:"18",
                        color: "white",
                        fontSize: 12
                    }
                },
                nameTextStyle:{
                	 color: "white",
                },
                splitLine: {
                    lineStyle: {
                        color: "rgb(54,107,182)",
                        width: 1,
                        type: 'solid'
                    }
                },
                
                  axisTick:{       //y轴刻度线
                    show:false
                  },
                splitArea:{show:false},
                formatter: '{value}',
            },{
            	name:"(人)",
            	nameTextStyle:{
            		color:"white",
            	},
            	show:true,
                type: 'value',
                axisLine:{       //y轴
                    show:true,
                    lineStyle:{
                    	width:0,
                    }

                  },
                type: 'value',
                axisLabel: {
                    textStyle: {
                        color: LSMScreen.CHARTCONFIG.xAxisLabelColor,
                        fontSize: 12
                    }
                },
                
                splitLine: {
                    show:false,
                    lineStyle: {
                        color:"rgb(54,107,182)",
                        width: 1,
                        type: 'solid'
                    }
                },
                  axisTick:{       //y轴刻度线
                    show:false
                  },
                splitArea:{show:false},
                formatter: '{value}',
            }],
            series: [{
            	symbol: "none",
                name: legend[0],
                type: 'line',
                itemStyle: {normal: {areaStyle: {type: 'default',color:"rgba(0,217,255,0.4)",},lineStyle:{width:0}}},
                data: yy.data1
            },{
            	symbol: "none",
                name: legend[1],
                yAxisIndex: 1,
                type: 'line',
                smooth:true,
                z:3,
                data: yy.data2
            }]
        };       
        return option;
    }
}
//单折线(率)
var eastcom_echarts_line_rate = {
    loadDataToChart: function(chartId, xx, yy) { //加载chart
        var me = this;
        var option = me.initOption(chartId, xx, yy);
        eastcom_echarts_drawChart.init(chartId, option);
    },
    initOption: function(chartId, xx, yy) { //获取option对象
        var option = {
            color: ['#00ff5a', '#7B68EE', '#fced00'],
            title: {
                text: ''
            },
            legend: {
                data: ['当前'],
                y:'bottom',
                x:'center',
                textStyle: {
                    color: LSMScreen.CHARTCONFIG.xAxisLabelColor,
                    fontSize: LSMScreen.CHARTCONFIG.axisLabelSize * 0.5
                },
            },
            tooltip: {
                trigger: 'axis', 
                formatter: "时间: {b}<br/>值 : {c}",
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
                y: 10,
                x2: 25,
                y2: 55,
                borderWidth:0
            },
            calculable: false,
            xAxis: {
                data: xx, //list
                //name: '用户名',
                boundaryGap: false,
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
                type: 'value',
                axisLabel: {
                    textStyle: {
                        color: LSMScreen.CHARTCONFIG.xAxisLabelColor,
                        fontSize: 12
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: LSMScreen.CHARTCONFIG.yAxisColor,
                        width: 2,
                        type: 'solid'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: LSMScreen.CHARTCONFIG.yAxisColor,
                        width: 1,
                        type: 'solid'
                    }
                },
                splitArea:{show:false},
                formatter: '{value}',
            }],
            series: [{
                name: '当前',
                type: 'line',
                data: yy[0],
            }]
        };
        return option;
    }
}
