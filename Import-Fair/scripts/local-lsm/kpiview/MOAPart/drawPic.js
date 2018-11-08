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
