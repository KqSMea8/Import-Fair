/**
 * 模拟迁徙图功能实现
 */
var h2 = new HashMap();
option = {
	    backgroundColor: '#1b1b1b',
	    color: ['gold', 'aqua', 'lime'],
	    title: {
	        show: false,
	        text: ' ',

	        x: 'center',
	        textStyle: {
	            color: '#fff'
	        }
	    },
	    tooltip: {
	        trigger: 'item',
	        show:false,
	        formatter: function (params, ticket, callback) {
	            /*$.get('detail?name=' + params.name, function (content) {
	                callback(ticket, toHTML(content));
	            });*/
	            var tips = '<ul style="list-style: none">';
	            tips += '<li>行政区划：' + params.name + '</li>';
	            tips += '<li>历史已报件：1000个</li>';
	            tips += '<li>最近上报时间：' + new Date().toLocaleTimeString() + '</li>';
	            tips += '</ul>';
	            return tips;
	        }
	    },
	    legend: {
	        show: false,
	        orient: 'vertical',
	        x: 'left',
	        data: ['玉溪 Top10', '大理 Top10', '保山 Top10'],
	        selectedMode: 'single',
	        selected: {
	            '保山 Top10': false,
	            '大理 Top10': false
	        },
	        textStyle: {
	            color: '#fff'
	        }
	    },
	    toolbox: {
	        show: false,
	        orient: 'vertical',
	        x: 'right',
	        y: 'center',
	        feature: {
	            mark: {show: true},
	            dataView: {show: true, readOnly: false},
	            restore: {show: true},
	            saveAsImage: {show: true}
	        }
	    },
	    dataRange: {
	        min: 0,
	        max: 100,
	        calculable: true,
	        color: ['#ff3333', 'orange', 'yellow', 'lime', 'aqua'],
	        textStyle: {
	            color: '#fff'
	        }
	    },
	    series: [
	        {
	            name: '中国',
	            type: 'map',
	            roam: true,
	            hoverable: false,
	            mapType: 'china',
	            itemStyle: {
	                normal: {
	                    color: '#28363E',
	                    borderColor: 'rgba(100,149,237,1)',
	                    borderWidth: 1,
	                    areaStyle: {
	                        color: '#1b1b1b'
	                    },
	                    label: {
	                        show: true,
	                        textStyle: {
	                            fontSize: 12,
	                            color: 'white'
	                        }
	                    }
	                }
	            },
	            data: [],
	            markLine: {

	                smooth: true,
	                symbol: ['none', 'circle'],
	                symbolSize: 1,
	                itemStyle: {
	                    normal: {
	                        color: '#fff',
	                        borderWidth: 1,
	                        borderColor: 'rgba(30,144,255,0.5)'
	                    }
	                },
	                data: [],
	            },
	            geoCoord: chinaGeoCoord
	        },
	        {
	            name: '上海',
	            type: 'map',
	            mapType: 'china',
	            data: [],
	            markLine: {
	                smooth: true,
	                effect: {
	                    show: true,
	                    scaleSize: 2,
	                    period: 30,
	                    color: '#fff',
	                    shadowBlur: 10
	                },
	                itemStyle: {
	                    normal: {
	                        borderWidth: 1,
	                        lineStyle: {
	                            type: 'solid',
	                            shadowBlur: 10
	                        }
	                    }
	                }
	            },
	            markPoint: {
	                symbol: 'emptyCircle',
	                symbolSize: function (v) {
	                    return 10 + v / 10
	                },
	                effect: {
	                    show: true,
	                    shadowBlur: 0
	                },
	                itemStyle: {
	                    normal: {
	                        label: {show: false}
	                    },
	                    emphasis: {
	                        label: {position: 'top'}
	                    }
	                }
	            }

	        },
	        {
	            name: '场馆',
	            type: 'map',
	            mapType: 'china',
	            data: [],
	            markLine: {
	                smooth: true,
	                effect: {
	                    show: true,
	                    scaleSize: 2,
	                    period: 30,
	                    color: '#fff',
	                    shadowBlur: 10
	                },
	                itemStyle: {
	                    normal: {
	                        borderWidth: 1,
	                        lineStyle: {
	                            type: 'solid',
	                            shadowBlur: 10
	                        }
	                    }
	                },
	                data:[]
	            },
	            markPoint: {
	                symbol: 'image://../leaf.png',
	                symbolSize:10,
	                effect: {
	                    show: false,
	                    shadowBlur: 0
	                },
	                itemStyle: {
	                    normal: {
	                        label: {show: false}
	                    },
	                    emphasis: {
	                        label: {show: false}
	                    }
	                },
	                data:[{name:'上海',value:0}]
	            }

	        }
	    ]
	};
require.config({
    paths: {
        echarts: './js'
    }
});
var ecConfig;
require(
    [
        'echarts',
        'echarts/chart/map'
    ],
    function (ec) {
        ecConfig = require('echarts/config');
        myChart = ec.init(document.getElementById('map'));
        initData();
        loadAll(2018, '省际漫入');
    }
);

var myChart;


function changeDataSource() {
    var dataSourceId = parseInt($("#dataSourceId").val());
    loadAll(dataSourceId, '省际漫入');
}

/**
 * 加载数据源，构造需要加入迁徙图的数据和连线信息
 * @param dataSourceId 数据源  data.js中定义的对象
 * @param title 标题
 */
function loadAll(dataSourceId, title) {
    myChart.clear();
    var data = h2.get(dataSourceId);
    option.series[1].markLine.data = [];
    //各市州到中心的连线数据
    for (var i = 0; i < data.length; i++) {
        var point = new Object();
        point.name = data[i].name;
        var centerPoint = new Object();
        centerPoint.name = center;
        var arr = new Array();
        arr.push(point);
		arr.push(centerPoint);
        option.series[1].markLine.data.push(arr);
    }
    //流向数据
    option.series[1].markPoint.data = data;
    option.title.text = title;
    myChart.setOption(option);
}



function initData() {
    for (var i = 0; i < dataSource.length; i++) {
        h2.put(dataSource[i].dataSourceId, dataSource[i].data);
    }
}

window.onresize = function () {
    myChart.resize();
}

