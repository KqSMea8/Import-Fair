var valueList = {
    "unit":"Mbps",
    "重保区域": {
                    ydU:8.66,    //移动上行
                    ltU:11.70,   //联通上行
                    dxU:19.19,   //电信上行
                    ydD:54.65,    //移动下行
                    ltD:33.57,    //联通下行
                    dxD:34.26,    //电信下行
                },
    "浦东机场": {
                    ydU:11.78,    
                    ltU:9.5,
                    dxU:6.77,
                    ydD:56.42,    
                    ltD:15.18,
                    dxD:12.74,
                },
    "虹桥机场": {
                    ydU:7.28,    
                    ltU:10.61,
                    dxU:8.51,
                    ydD:36.65,    
                    ltD:34.62,
                    dxD:29.94,
                },
    "虹桥火车站": {
                    ydU:6.57,    
                    ltU:11.23,
                    dxU:8.32,
                    ydD:36.14,    
                    ltD:30.82,
                    dxD:27.81,
                },
    "上海火车站": {
                    ydU:2.9,    
                    ltU:12.8,
                    dxU:11.3,
                    ydD:28.7,    
                    ltD:17.6,
                    dxD:12.5,
                },
    "上海南站": {
                    ydU:6.99,    
                    ltU:20.12,
                    dxU:18.43,
                    ydD:44.26,    
                    ltD:30.16,
                    dxD:24.39,
                },
}





var dialTest = {
    init: function() {
        dialTest.initEcharts();
    },
    initEcharts: function() {
        $(".unit-gsdasas-common").text(valueList.unit);
        var chartIdArr = ['yidongUp','yidongDown','liantongUp','liantongDown','dianxinUp','dianxinDown'];
        for (var i = 0; i < chartIdArr.length; i++) {
        	if(i==0){
        		var mathNum = parseFloat((1000+Math.random()*1000).toFixed(2));
                var yu = 2000 - parseFloat(mathNum);
                var data = [{
                    //value: 8.66,
                    value: valueList[CELLNAME].ydU,
                    name: '值'
                }, {
                    //value: 54.65,
                    value: valueList[CELLNAME].ydD,
                    name: '空值'
                }]


                var chartId = chartIdArr[i];
                dialTest.loadEcharts(chartId,data);
        	}else if(i==1){
        		var mathNum = parseFloat((2000+Math.random()*1000).toFixed(2));
                var yu = 3000 - parseFloat(mathNum);
                var data = [{
                    //value: 54.65,
                    value: valueList[CELLNAME].ydD,
                    name: '值'
                }, {
                    //value: 8.66,
                    value: valueList[CELLNAME].ydU,
                    name: '空值'
                }]


                var chartId = chartIdArr[i];
                dialTest.loadEcharts(chartId,data);
        	}else if(i==2){
                var mathNum = parseFloat((2000+Math.random()*1000).toFixed(2));
                var yu = 3000 - parseFloat(mathNum);
                var data = [{
                    //value: 11.7,
                    value: valueList[CELLNAME].ltU,
                    name: '值'
                }, {
                    //value: 33.57,
                    value: valueList[CELLNAME].ltD,
                    name: '空值'
                }]


                var chartId = chartIdArr[i];
                dialTest.loadEcharts(chartId,data);
            }else if(i==3){
                var mathNum = parseFloat((2000+Math.random()*1000).toFixed(2));
                var yu = 3000 - parseFloat(mathNum);
                var data = [{
                    //value: 33.57,
                    value: valueList[CELLNAME].ltD,
                    name: '值'
                }, {
                    //value: 11.7,
                    value: valueList[CELLNAME].ltU,
                    name: '空值'
                }]


                var chartId = chartIdArr[i];
                dialTest.loadEcharts(chartId,data);
            }else if(i==4){
                var mathNum = parseFloat((2000+Math.random()*1000).toFixed(2));
                var yu = 3000 - parseFloat(mathNum);
                var data = [{
                    //value: 19.19,
                    value: valueList[CELLNAME].dxU,
                    name: '值'
                }, {
                    //value: 34.26,
                    value: valueList[CELLNAME].dxD,
                    name: '空值'
                }]


                var chartId = chartIdArr[i];
                dialTest.loadEcharts(chartId,data);
            }else if(i==5){
                var mathNum = parseFloat((2000+Math.random()*1000).toFixed(2));
                var yu = 3000 - parseFloat(mathNum);
                var data = [{
                    //value: 34.26,
                    value: valueList[CELLNAME].dxD,
                    name: '值'
                }, {
                    //value: 19.19,
                    value: valueList[CELLNAME].dxU,
                    name: '空值'
                }]


                var chartId = chartIdArr[i];
                dialTest.loadEcharts(chartId,data);
            }else{
        		var mathNum = parseFloat((Math.random()*1000).toFixed(2));
                var yu = 1000 - parseFloat(mathNum);
                var data = [{
                    value: mathNum,
                    name: '值'
                }, {
                    value: yu,
                    name: '空值'
                }]


                var chartId = chartIdArr[i];
                dialTest.loadEcharts(chartId,data);
        	}
            
        }


        // dialTest.loadEcharts('yidongUp',data);
        // dialTest.loadEcharts('yidongDown',data);

        // dialTest.loadEcharts('liantongUp',data);
        // dialTest.loadEcharts('liantongDown',data);

        // dialTest.loadEcharts('dianxinUp',data);
        // dialTest.loadEcharts('dianxinDown',data);

    },
    loadEcharts: function(chartId, data) {

        /*var data = [{
            value: 335,
            name: '值'
        }, {
            value: 310,
            name: '空值'
        }, ]*/
        //这里才是关键整去掉下半部分的关键，
        //计算data中value的总和
        var a = 0;
        for (var i = 0; i < data.length; i++) {
            a += data[i].value;
        }
        //添加新的元素到data中，并设置其颜色样式为白色
        data.push({
            value: a,
            name: '__other',
            itemStyle: {
                normal: {
                    color: 'rgba(0,0,0,0)'
                }
            }
        });
        //console.log(data);
        //开始绘制饼图
        require(
            [
                'echarts',
                'echarts/chart/pie' // 使用柱状图就加载bar模块，按需加载
            ],
            function(ec) {
                // 基于准备好的dom，初始化echarts图表
                var myChart = ec.init(document.getElementById(chartId));
                var color = ['#fdf36d', '#6988b0'];
                if (chartId.indexOf('Down') > -1) {
                    color = ['#78fad3', '#6988b0'];
                }
                option = {
                    color: color,
                    title: {
                        text: data[0].value,
                        x: 'center',
                        y: 'bottom',
                        itemGap: 20,
                        textStyle: {
                            color: color[0],
                            fontFamily: '微软雅黑',
                            fontSize: 25
                            /*fontWeight: 'bolder'*/
                        }
                    },
                    tooltip: {
                        show: false,
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    series: [{
                        name: '',
                        type: 'pie',
                        startAngle: 180,
                        radius: ['129%', '170%'],
                        center: ['50%', '100%'],
                        data: data,
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false
                                },
                                labelLine: {
                                    show: false
                                }
                            },
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }]
                };
                myChart.setOption(option, true);
            }
        );

    }

};