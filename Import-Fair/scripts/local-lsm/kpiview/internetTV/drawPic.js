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
    loadDataToChart: function(chartId, xx, yy,threshold,toBigFlag) { //加载chart
        var me = this;
        var option = me.initOption(chartId, xx, yy,threshold,toBigFlag);
        eastcom_echarts_drawChart.init(chartId, option);
    },
    initOption: function(chartId, xx, yy,threshold,toBigFlag) { //获取option对象
        var option = {
            color:['#00ff5a','#C8C8C8','#7B68EE'],
            title: {
                text: ''
            },
            legend: {
                data: ['当前', '平时'],
                y:'bottom',
                x:'center',
                textStyle: {
                    color: LSMScreen.CHARTCONFIG.xAxisLabelColor,
                    fontSize: LSMScreen.CHARTCONFIG.axisLabelSize * 0.5
                },
            },
            tooltip: {
                trigger: 'axis', 
                formatter: "时间: {b}<br/>当前 : {c0}<br/>平时 : {c1}",
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
                x2: '10%',
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
                data: yy[0]
            }, {
                name: '平时',
                type: 'line',
                data: yy[1]
            }]
        };
        /*if (threshold && threshold != 0) {
            var markLine = {
                            data: [
                                    [ //阀值起点坐标    
                                        {
                                            name: "阀值",
                                            xAxis: -1,
                                            yAxis: threshold
                                        }, //阀值终点坐标
                                        {
                                            value: threshold,
                                            xAxis: 100,
                                            yAxis: threshold
                                        }
                                    ]
                                ],
                                itemStyle: {normal: {color: 'red'}}
                            };
            option.series[0].markLine = markLine ;              
        };*/
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
        if (chartId == "echarts06" || toBigFlag == "echarts06") {  //电视播放响应时长
            var max = 5;
            var flag = true;
            for (var i = 0; i < yy[0].length; i++) {
                  var curr1 = yy[0][i];
                  var curr2 = yy[1][i];
                  if (curr1 > max || curr2 >max) {            
                    flag = false;
                  }
            }
            if (flag) {
                option.yAxis[0].min = 0;
                option.yAxis[0].max = max;                 
            }
        }
        if (chartId == "echarts09" || toBigFlag == "echarts09") {  //卡顿用户占比
            var max = 5;
            var flag = true;
            for (var i = 0; i < yy[0].length; i++) {
                  var curr1 = yy[0][i];
                  var curr2 = yy[1][i];
                  if (curr1 > max || curr2 >max) {            
                    flag = false;
                  }
            }
            if (flag) {
                option.yAxis[0].min = 0;
                option.yAxis[0].max = max;                 
            }
        }
        if (chartId == "echarts08" || toBigFlag == "echarts08"
        	||chartId == "echartsadd_01" || toBigFlag == "echartsadd_01") {  //卡顿时长占比 次数占比
            var max = 5;
            var flag = true;
            for (var i = 0; i < yy[0].length; i++) {
                  var curr1 = yy[0][i];
                  var curr2 = yy[1][i];
                  if (curr1 > max || curr2 >max) {            
                    flag = false;
                  }
            }
            if (flag) {
                option.yAxis[0].min = 0;
                option.yAxis[0].max = max;                 
            }
        }
        
        if (chartId == "echarts05" || toBigFlag == "echarts05"
        	||chartId == "echartsadd_02" || toBigFlag == "echartsadd_02"
        	||chartId == "echartsadd_03" || toBigFlag == "echartsadd_03") {  //成功率 达标率
            var min = 50;
            var flag = true;
            for (var i = 0; i < yy[0].length; i++) {
                  var curr1 = yy[0][i];
                  var curr2 = yy[1][i];
                  if (curr1 < min || curr2 <min) {            
                    flag = false;
                  }
            }
            if (flag) {
                option.yAxis[0].min = min;
                option.yAxis[0].max = 100;                 
            }
        }
        
        
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
                /*markLine: {
                    data: [
                        [ //阀值起点坐标    
                            {
                                name: "阀值",
                                xAxis: -1,
                                yAxis: 380
                            }, //阀值终点坐标
                            {
                                value: 380,
                                xAxis: 100,
                                yAxis: 380
                            }
                        ]
                    ],
                    itemStyle: {
                        normal: {
                            color: 'red'
                        }
                    }
                },*/
            }]
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
            color: ['#7B68EE', '#00ff5a', '#fced00'],
            title: {
                text: ''
            },
            legend: {
                data: legend,
                y:'bottom',
                x:'center',
                textStyle: {
                    color: LSMScreen.CHARTCONFIG.xAxisLabelColor,
                    fontSize: LSMScreen.CHARTCONFIG.axisLabelSize * 0.5
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
                splitLine:{show:true,lineStyle:{color:'#0d2a52'}},
                splitArea:{show:false},
                axisLabel:{
                    textStyle:{
                                color:LSMScreen.CHARTCONFIG.yAxisLabelColor
                    }
                },
                splitArea:{show:false},
                formatter: '{value}',
            },{
                name:legend[1].substring(0,legend[1].indexOf('(')), 
                type: 'value',
                axisLine:{show:true,lineStyle:{color:'#078ceb',width:1}},
                splitLine:{show:false,lineStyle:{color:'#0d2a52'}},
                splitArea:{show:false},
                axisLabel:{
                    textStyle:{
                                color:LSMScreen.CHARTCONFIG.yAxisLabelColor
                    }
                },
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
//柱图折线图 上海内容中心，特殊
var eastcom_echarts_line_bar_content = {
    loadDataToChart: function(chartId, xx, yy,kpis) { //加载chart
        var me = this;
        var option = me.initOption(chartId, xx, yy,kpis);
        eastcom_echarts_drawChart.init(chartId, option);
    },
    initOption: function(chartId, xx, yy,kpis) { //获取option对象
        var legend = kpis;
        var series=[];
        var colorList=[
                       "#3B8BC8",//ff7f50 
                       "#F5CB44",//87cefa 
                       "#da70d6",
                       "#32cd32",
                       "#6495ed",
                       "#ff69b4",
                       "#ba55d3",
                       "#cd5c5c",
                       "#ffa500",
                       "#40e0d0",
                       "#1e90ff",
                       "#ff6347",
                       "#7b68ee",
                       "#00fa9a",
                       "#ffd700",
                       "#6699FF",
                       "#ff6666",
                       "#3cb371",
                       "#b8860b",
                       "#30e0e0"
];
        for(var i=0;i<yy.length;i++){
        	series.push({
                name: legend[i],
                type: i%2==0?'bar':'line',
                data: yy[i],
                yAxisIndex:i%2,
                itemStyle:{
                	normal:{color:colorList[Math.floor(i/2)]}
                }
            });
        }
        var option = {
            title: {
                text: ''
            },
            legend: {
                data: legend,
                type: 'scroll',
                orient: 'horizontal',
                y:'bottom',
                x:'center',
                textStyle: {
                    color: LSMScreen.CHARTCONFIG.xAxisLabelColor,
                    fontSize: LSMScreen.CHARTCONFIG.axisLabelSize * 0.5
                },
            },
            tooltip: {
                trigger: 'item',
                formatter: "时间: {b}<br/>{a} : {c}",
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
            grid: {
                x: 55,
                y: 30,
                x2: 25,
                y2: 85,
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
                name:'峰值(Gbps)',
                type: 'value',
                axisLine:{show:true,lineStyle:{color:'#078ceb',width:1}},
                splitLine:{show:true,lineStyle:{color:'#0d2a52'}},
                splitArea:{show:false},
                axisLabel:{
                    textStyle:{
                                color:LSMScreen.CHARTCONFIG.yAxisLabelColor
                    }
                },
                splitArea:{show:false},
                formatter: '{value}',
            },{
                name:'容量利用率(%)', 
                type: 'value',
                axisLine:{show:true,lineStyle:{color:'#078ceb',width:1}},
                splitLine:{show:false,lineStyle:{color:'#0d2a52'}},
                splitArea:{show:false},
                axisLabel:{
                    textStyle:{
                                color:LSMScreen.CHARTCONFIG.yAxisLabelColor
                    }
                },
                splitArea:{show:false},
                formatter: '{value}',
            }],
            series: series
        };
        
        if (chartId == "echartsCommon") {
            var grid = {
                        x: '8%',
                        y: '0%',
                        x2: '8%',
                        y2: '30%',
                        borderWidth:0
            };
            option.grid = grid;
        }
        return option;
    }
}
//叠加图
var eastcom_echarts_bar_bar = {
    loadDataToChart: function(chartId, xx, yy,yyy) { //加载chart
        var me = this;
        var option = me.initOption(chartId, xx, yy,yyy);
        eastcom_echarts_drawChart.init(chartId, option);
    },
    initOption: function(chartId, xx, yy,yyy) { //获取option对象
        var option = {
            color: ['#7B68EE', '#00ff5a', '#fced00','red',],
            title: {
                text: ''
            },
            legend: {
                data: ['终端问题', '网络侧问题','内容侧问题','用户家庭网络问题'],
                y:'bottom',
                x:'center',
                textStyle: {
                    color: LSMScreen.CHARTCONFIG.xAxisLabelColor,
                    fontSize: LSMScreen.CHARTCONFIG.axisLabelSize * 0.5
                },
                selected: {
                           /* '终端问题' : false,
                            '网络侧问题' : false,
                            '内容侧问题' : false,
                            '用户家庭网络问题' : false*/
                        },
            },
            tooltip: {
                //formatter: "时间: {b}<br/>值 : {c}",
                trigger: 'axis',
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
                },
                formatter: function(values,index){
                             var value = values.reverse();
                            //var a=value[0];
                            var returnStr = "";
                            var zon = 0;
                            var time = value[0].name;
                            for (var i = 0; i < value.length; i++) {
                                var curr = value[i];
                                zon += curr.data;
                            }
                            for (var i = 0; i < value.length; i++) {
                                var a = value[i];
                                //var zon = eval(this._option.series[0].data.join("+"));
                                var zb = (a.data/zon*100).toFixed(2);
                                returnStr += a[0].replace("1","")+"："+a.data+"("+zb+"%)</br>"
                            }
                            return  "时间:"+time +"点</br>" + returnStr;

                }
            },
            /*grid: {
                x: 55,
                y: '12%',
                x2: '8%',
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
                show:true , 
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
                name: '终端问题',
                type: 'bar',
                stack: '同一类',
                data: yy[0]
            },{
                name: '网络侧问题',
                type: 'bar',
                stack: '同一类',
                data: yy[1]
            },{
                name: '内容侧问题',
                type: 'bar',
                stack: '同一类',
                data: yy[2]
            },{
                name: '用户家庭网络问题',
                type: 'bar',
                stack: '同一类',
                data: yy[3]
            }
            ]
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
var eastcom_echarts_bar_bars = {
    loadDataToChart: function(chartId, xx, yy,yyy) { //加载chart
        var me = this;
        var option = me.initOption(chartId, xx, yy,yyy);
        eastcom_echarts_drawChart.init(chartId, option);
    },
    initOption: function(chartId, xx, yy,yyy) { //获取option对象
        var option = {
            color: ['#7B68EE', '#00ff5a', '#fced00','red','rgba(255,255,255, 0)','rgba(255,255,255, 0)','rgba(255,255,255, 0)','rgba(255,255,255, 0)'],
            title: {
                text: ''
            },
            legend: {
                data: ['终端问题', '网络侧问题','内容侧问题','用户家庭网络问题'],
                y:'bottom',
                x:'center',
                textStyle: {
                    color: LSMScreen.CHARTCONFIG.xAxisLabelColor,
                    fontSize: LSMScreen.CHARTCONFIG.axisLabelSize * 0.5
                },
                selected: {
                           /* '终端问题' : false,
                            '网络侧问题' : false,
                            '内容侧问题' : false,
                            '用户家庭网络问题' : false*/
                        },
            },
            tooltip: {
                //formatter: "时间: {b}<br/>值 : {c}",
                trigger: 'axis',
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
                },
                formatter: function(values,index){
                             var value = values.reverse();
                            //var a=value[0];
                            var returnStr = "";
                            var zon = 0;
                            var time = value[0].name;
                            for (var i = 4; i < value.length; i++) {
                                var curr = value[i];
                                zon += curr.data;
                            }
                            for (var i = 4; i < value.length; i++) {
                                var a = value[i];
                                //var zon = eval(this._option.series[0].data.join("+"));
                                var zb = (a.data/zon*100).toFixed(2);
                                returnStr += a[0].replace("1","")+"："+a.data+"("+zb+"%)</br>"
                            }
                            return  "时间:"+time +"</br>" + returnStr;

                }
            },
            grid: {
                x: '12%',
                y: '12%',
                x2: '8%',
                y2: '25%',
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
                show:true , 
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
            },{
                 show:false, 
                //type: 'log',
                //min : 10,
                //logPositive:true,
                min:0,
                max:20,
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
                name: '终端问题',
                type: 'bar',
                stack: '同一类',
                yAxisIndex: 1,
                data: yy[0]
            },{
                name: '网络侧问题',
                type: 'bar',
                stack: '同一类',
                yAxisIndex: 1,
                data: yy[1]
            },{
                name: '内容侧问题',
                type: 'bar',
                stack: '同一类',
                yAxisIndex: 1,
                data: yy[2]
            },{
                name: '用户家庭网络问题',
                type: 'bar',
                stack: '同一类',
                yAxisIndex: 1,
                data: yy[3]
            },{
                name: '终端问题1',
                type: 'bar',
                stack: '同一类1',
                yAxisIndex: 0,
                itemStyle: {
                    normal: {
                        color: 'rgba(255,255,255, 0)'
                    }
                }, 
             barWidth: 0,   
                data: yyy[0]
            },{
                name: '网络侧问题1',
                type: 'bar',
                stack: '同一类1',
                yAxisIndex: 0,
                 iteStyle: {
                    normal: {
                            color: 'rgba(255,255,255, 0)'
                        }
                    }, 
                 barWidth: 0,   
                data: yyy[1]
            },{
                name: '内容侧问题1',
                type: 'bar',
                stack: '同一类1',
                yAxisIndex: 0,
                 iteStyle: {
                    normal: {
                            color: 'rgba(255,255,255, 0)'
                        }
                    }, 
                 barWidth: 0,   
                data: yyy[2]
            },{
                name: '用户家庭网络问题1',
                type: 'bar',
                stack: '同一类1',
                yAxisIndex: 0,
                 iteStyle: {
                    normal: {
                            color: 'rgba(255,255,255, 0)'
                        }
                    }, 
                 barWidth: 0,   
                data: yyy[3]
            }  

            ]
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
//饼图
var eastcom_echarts_pie = {
    loadDataToChart: function(chartId, xx, yy) { //加载chart
        var me = this;
        var option = me.initOption(chartId, xx, yy);
        eastcom_echarts_drawChart.init(chartId, option);
    },
    initOption: function(chartId, xx, yy) { //获取option对象
        var option = {
            //color: ['#7B68EE', '#00ff5a', '#fced00'],
            title: {
                text: ''
            },
            legend: {
                data: ['终端问题', '网络侧问题','内容侧问题','用户家庭网络问题'],
                y:'bottom',
                x:'center',
                textStyle: {
                    color: LSMScreen.CHARTCONFIG.xAxisLabelColor,
                    fontSize: LSMScreen.CHARTCONFIG.axisLabelSize * 0.5
                },
            },
            tooltip: {
                formatter: "{b} : {c} ({d}%)",
                //trigger: 'axis',
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
                },
                
            },
            /*grid: {
                x: '12%',
                y: '12%',
                x2: '8%',
                y2: '25%',
                borderWidth:0
            },*/
            calculable: false,
            series: [{
                //name:'测试',
                type:'pie',
                radius : '70%',
                center: ['50%', '45%'],
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            //position: 'inner',
                            formatter: '{b}:{c} ({d}%)'
                        }
                    }
                },
                data:xx
            }]
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

//周涛
var eastcom_echarts_ott = {
	    loadDataToChart: function(chartId, data) { //加载chart
	    	var chartdata=[];
	    	chartdata=data;
	        var me = this;
	        var option = me.initOption(chartId,chartdata);
	        _CacheFun._bindCache(chartId,option);
	        eastcom_echarts_drawChart.init(chartId, option);
	    },
	    initOption: function(chartId,data) { //获取option对象
	    	var leg=[];
	    	var xdata=[];
    		var sersall=[];
	    	if("echartsadd_07_re"==chartId|| "echartsadd_08_re"==chartId){
	    		
	    		for(var i=0;i<data.length;i++){
		    		var ydata=[];
		    		var y1data=[];
		    		var singledata=data[i];
		    		var keys=Object.keys(singledata);
		    		var singledata=singledata[keys[0]];
	    			for(var j=0;j<singledata.length;j++){
	    				if(i==0){
	    					var dateStr=singledata[j].time_id.toString();
	    					 //dateStr = dateStr.substring(0, 4) + "-" + dateStr.substring(4, 6) + "-" + dateStr.substring(6, 8) + ' ' + dateStr.substring(8, 10)+ ':' + dateStr.substring(10, 12);
	    					 dateStr = dateStr.substring(8, 10)+ ':' + dateStr.substring(10, 12);
	    					 xdata.push(dateStr);
	    				}
	    				if(singledata[j].flowout==null){
	    					ydata.push("");
	    				}else{
		    				ydata.push(singledata[j].flowout);
	    				}
	    				if(singledata[j].if_out_utility==null){
	    					y1data.push("");
	    				}else{
		    				y1data.push(singledata[j].if_out_utility);
	    				}
	    			}
	    			var  sers= {
			                name: keys[0]+"流速(Mbps)",
			                type: 'bar',
			                data:ydata,
			            }
	    			
	    			var  sers1= {
			                name: keys[0]+"容量利用率(%)",
			                yAxisIndex: 1,
			                type: 'line',
			                data:y1data,
			            }
	    			sersall.push(sers);
	    			sersall.push(sers1);
	    			leg.push( keys[0]+"流速(Mbps)");
	    			leg.push( keys[0]+"容量利用率(%)");
	    			
	    		}
	    		
	    		
	    	}else{
		    	var ydata=[];
		    	var y1data=[];
		    	leg.push("流速(Mbps)");
		    	leg.push("容量利用率(%)");
		    	linedata=data.data;
		    	if(linedata=="undefined" || linedata==null ||linedata==""){
		    	}else{
		    		for(var j=0;j<linedata.length;j++){
    					var dateStr=linedata[j].time_id.toString();
    					// dateStr = dateStr.substring(0, 4) + "-" + dateStr.substring(4, 6) + "-" + dateStr.substring(6, 8) + ' ' + dateStr.substring(8, 10)+ ':' + dateStr.substring(10, 12);
    					 dateStr = dateStr.substring(8, 10)+ ':' + dateStr.substring(10, 12);
    					xdata.push(dateStr);
    					if(linedata[j].flowout==null){
	    					ydata.push("");
	    				}else{
		    				ydata.push(linedata[j].flowout);
	    				}
    					
    					if(linedata[j].if_out_utility==null){
	    					y1data.push("");
	    				}else{
		    				y1data.push(linedata[j].if_out_utility);
	    				}
		    		}
		    	}
	    		
    			var  sers= {
		                name: "流速(Mbps)",
		                type: 'bar',
/*		                barWidth:30,
*/		                data:ydata,
		            }
    			var  sers1= {
		                name: "容量利用率(%)",
		                yAxisIndex: 1,
		                type: 'line',
		                data:y1data,
		            }
    			sersall.push(sers);
    			sersall.push(sers1);
	    	}
	        var option = {
	            color: ['#7B68EE', '#00ff5a', '#fced00'],
	            title: {
	                text: ''
	            },
	            legend: {
	                data: leg,
	                y:'bottom',
	                x:'center',
	                padding: 2,
	                textStyle: {
	                    color: LSMScreen.CHARTCONFIG.xAxisLabelColor,
	                    fontSize: LSMScreen.CHARTCONFIG.axisLabelSize * 0.5
	                },
	            },
	            tooltip: {
	                trigger: 'axis', 
/*	                formatter: "时间: {b}<br/>值 : {c}",
			        formatter : function(obj){
			        	var len = obj.length;
			        	if(len == 2){
			        		var a1 = obj[0],
								a2 = obj[1];
							if(a1.value == "-"){
								return a2.name+"<br>"+a2.seriesName+":"+a2.value;
							}else if(a2.value == "-"){
								return a1.name+"<br>"+a1.seriesName+":"+a1.value;
							}else if(a1.value == a2.value){
								return a1.name+"<br>"+a1.seriesName+":"+a1.value;
							}
			        	}else if(len == 1){
			        		var a1 = obj[0];
			        		if(a1.value != "-"){
			        			return a1.name+"<br>"+a1.seriesName+":"+a1.value;
			        		}else{
			        			return a1.name;
			        		}
			        	}else{
			        		return "";
			        	}
			        }
			    },*/
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
	                data: xdata, //list
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
	            	name: '流速',
	                type: 'value',
	               /* nameTextStyle:{
	                	color: LSMScreen.CHARTCONFIG.yAxisLabelColor,
                        fontSize: 12
	                },*/
	                axisLabel: {
	                    textStyle: {
	                        color: LSMScreen.CHARTCONFIG.xAxisLabelColor,
	                        fontSize: 12
	                    }
	                },
	                axisLine: {
	                    lineStyle: {
	                        color: "#078ceb",
	                        width: 2,
	                        type: 'solid'
	                    }
	                },
	                splitLine: {
	                	show: false,
	                    lineStyle: {
	                        color: LSMScreen.CHARTCONFIG.yAxisColor,
	                        width: 1,
	                        type: 'solid'
	                    }
	                },
	                splitArea:{show:false},
	                formatter: '{value}',
	            },
                {
	            name: '容量利用率',
	            type: 'value',
	            /*nameTextStyle:{
                	color: LSMScreen.CHARTCONFIG.yAxisLabelColor,
                    fontSize: 12
                },*/
                axisLabel: {
                    textStyle: {
                        color: LSMScreen.CHARTCONFIG.xAxisLabelColor,
                        fontSize: 12
                    }
                },
                axisLine: {
                    lineStyle: {
                    	color: "#078ceb",
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
	            series:sersall /*[{
	                name: '当前',
	                type: 'line',
	                data: yy[0],
	                markLine: {
	                    data: [
	                        [ //阀值起点坐标    
	                            {
	                                name: "阀值",
	                                xAxis: -1,
	                                yAxis: 380
	                            }, //阀值终点坐标
	                            {
	                                value: 380,
	                                xAxis: 100,
	                                yAxis: 380
	                            }
	                        ]
	                    ],
	                    itemStyle: {
	                        normal: {
	                            color: 'red'
	                        }
	                    }
	                },
	            }]*/
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