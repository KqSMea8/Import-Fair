var UrbanRoad = UrbanRoad || {};

UrbanRoad.ChinaChart=function ()
{
	this.initialize.apply(this, arguments);
};


UrbanRoad.ChinaChart.prototype.rankDom;
UrbanRoad.ChinaChart.prototype.chartDom;
UrbanRoad.ChinaChart.prototype.ec;
UrbanRoad.ChinaChart.prototype.echartCom;
UrbanRoad.ChinaChart.prototype.BMapExt;
UrbanRoad.ChinaChart.prototype.period=5*60*1000;
UrbanRoad.ChinaChart.prototype.rankMax=8;
UrbanRoad.ChinaChart.prototype.mapShowMax=10;
UrbanRoad.ChinaChart.prototype.showValueKey="total";



UrbanRoad.ChinaChart.prototype.initialize=function(dom,rankdom){
	
	this.chartDom=dom;
	this.rankDom=rankdom;
    //初始化地图扩展
	require(['BMap'],this.initMapExtension.bind(this));
	
};

UrbanRoad.ChinaChart.prototype.initMapExtension=function(mapEx){
	//BMapExtension 百度api里面的全局变量
	BMapExtension = mapEx;
	require(['echarts',  
	            'echarts/chart/line',  
	            'echarts/chart/map'
	            ],this.initEChart.bind(this));
};
UrbanRoad.ChinaChart.prototype.initEChart=function(ec){
	this.ec=ec;
	this.update(true);
	setInterval(this.update.bind(this), this.period);
};

UrbanRoad.ChinaChart.prototype.update=function(showLoadMask){
	var dm=LSMScreen.DataManager.getInstance();
	dm.getProvinceDistributeAll({},this.refreshChinaChart.bind(this),this.failHandler.bind(this));
};

UrbanRoad.ChinaChart.prototype.refreshChinaChart=function(result){

	if(this.BMapExt==null){
		var domMain=this.chartDom;
		var BMapExt=this.BMapExt = new BMapExtension(domMain, BMap, this.ec, require('zrender'));
		var map = this.BMapExt.getMap();
		var container = BMapExt.getEchartsContainer();
		var point = new BMap.Point(104.379336,30.531176);
		map.centerAndZoom(point, 5);
		map.disableScrollWheelZoom();
		map.disableDoubleClickZoom();
		this.echartCom = BMapExt.initECharts(container);
		map.addEventListener("zoomend", function(type){
			map.centerAndZoom(point, 5);
		});
	}
	
	var lineData=[];
	var pointData=[];
	
	var data=result;
	var list=[];
	var max=1;
	var total=0;
	var time="";
	var dataKey=this.showValueKey;
	for(var key in data){
		if(key=="上海") continue;
		data[key][dataKey]/=10000;
		list.push({key:key,value:data[key][dataKey]});
		time=data[key].time;
		max=Math.max(data[key][dataKey],max);
		total+=data[key][dataKey];
	}
	list.sort(function(a,b){return b.value-a.value;});//按value 降序
	
	$(this.rankDom).find(".content_title").html(
			'<h>省际漫入</h>'
		    +'<h3>'+total.toFixed(2)+'<span>&nbsp;万</span></h3>'
//		    +'<h3>15<span>&nbsp;%</span></h3>'
	);
	
	var rankTable=$(this.rankDom).find("table");
	for(var i=0;i<list.length;i++){
		var record=list[i];
		var num=record.value;
		var percent=(num/total)*100;
		if(i<this.rankMax){
			var rankHTML='<td class="t1">'+record.key+'</td>'
							     +'<td class="t2">'
							     +'<div class="t2_content">'
							     +'<div class="t'+(i+2)+'_box1"></div>'
							     +'<div class="t2_txt">'+num.toFixed(2)+'<span>&nbsp;万</span></div>'
							     +'</div>'
							     +'</td>'
							     +'<td class="t3"><div class="t2_txt">'+percent.toFixed(2)+'<span>&nbsp;%</span></div></td>';
			rankTable.find("tr:eq("+i+")").html(rankHTML);
		}
		if(i<this.mapShowMax){
			lineData.push([{name:record.key,value:parseFloat(num.toFixed(2))},{name:'上海'}]);
			pointData.push({name:record.key,value:parseFloat(num.toFixed(2))});
		}
	}
	
	if(time!=""&&time!=null){
//		$(".DR2_TIME").text(time.substring(5, 16));
	}
	
	var option = {
		backgroundColor:'rgba(0,0,0,0)',
	    color: ['gold','aqua','lime'],
	    title : {
	    	show:false
	    },
	    tooltip : {
	        trigger: 'item',
	        formatter: function (v) {
	            return v[1].replace(':', ' > ')+":"+v.value;
	        },
        	textStyle :
    		{
        		fontSize:LSMConsts.CHARTCONFIG.axisLabelSize
    		}
	    },
	    legend: {
	        orient: 'vertical',
	        x:'left',
	        data:['上海'],
	        selectedMode: 'single',
	        show : false,
	        selected:{
	            '上海' : true
	        }
	    },
	    toolbox: {
	        show : false
	    },
	    dataRange: {
	        min : 0,
	        max : max,
	        y: 'bottom',
	        dataRange:0,
	        calculable : true,
	        formatter:function(v){
	        	return parseInt(v);
	        },
	        color: ['#ff3333', 'orange', 'yellow','lime','aqua'],
        	textStyle :
    		{
        		color:LSMConsts.baseFontColor,
        		fontSize:LSMConsts.CHARTCONFIG.axisLabelSize
    		}
	    },
	    series : [
   		        {
   		        	clickable:false,
   		        	scaleLimit:{max:6,min:6},
		            name:'上海',
		            type:'map',
		            mapType: 'none',
		            data:[],
		            geoCoord: {
		            	'北京':[116.39737,39.939502],
		            	'天津':[117.133262,39.256321],
		            	'上海':[121.36464,31.303465],
		            	'重庆':[106.32485,29.895013],
		            	'河北':[114.336873,38.21885],
		            	'山西':[112.349964,38.044464],
		            	'辽宁':[123.241164,41.948112],
		            	'吉林':[125.228072,43.894927],
		            	'黑龙江':[126.479088,45.985284],
		            	'江苏':[118.715429,32.246466],
		            	'浙江':[120.040035,30.350837],
		            	'安徽':[117.170056,31.99595],
		            	'福建':[119.156964,26.182279],
		            	'江西':[115.808656,28.774611],
		            	'山东':[116.912494,36.812038],
		            	'河南':[113.453802,34.895028],
		            	'湖北':[114.116105,30.764814],
		            	'湖南':[112.800698,28.474291],
		            	'广东':[113.233035,23.224606],
		            	'海南':[110.179083,19.921006],
		            	'四川':[103.924003,30.796585],
		            	'贵州':[106.499624,26.844365],
		            	'云南':[102.599397,25.248948],
		            	'陕西':[108.780889,34.408508],
		            	'甘肃':[103.66644,36.218003],
		            	'青海':[101.605943,36.752842],
		            	'西藏':[90.972306,29.838888],
		            	'广西':[108.265765,23.020403],
		            	'内蒙古':[111.614073,40.951504],
		            	'宁夏':[106.094884,38.624116],
		            	'新疆':[87.476819,43.894927],
		            	'香港':[114.1529,22.542716],
		            	'澳门':[113.417008,22.337477],
		            	'台湾':[121.36464,25.248948]
   		        },

		            markLine : {
		            	clickable:false,
		                smooth:true,
		                effect : {
		                    show: false,
		                    scaleSize: 1,
		                    period: 30,
		                    color: '#fff',
		                    shadowBlur: 10
		                },
		                itemStyle : {
		                    normal: {
		                        borderWidth:1,
		                        lineStyle: {
		                            type: 'solid',
		                            shadowBlur: 10
		                        },
		                        label:{
		                        	show:true,
		                        	position:"start",
		                        	textStyle :
				            		{
					            		fontSize:LSMConsts.CHARTCONFIG.axisLabelSize
				            		}
		                        }
		                    }
		                },
		                data : lineData
		            },
		            markPoint : {
		            	clickable:false,
		                symbol:'emptyCircle',
		                symbolSize : function (v){
		                    return 10 + v/max;
		                },
		                effect : {
		                    show: false,
		                    shadowBlur : 0
		                },
		                itemStyle:{
		                    normal:{
		                        label:{show:false}
		                    }
		                },
		                data : pointData
		            }
		            
		        }
		    ]
	};
	this.BMapExt.setOption(option, true);
	this.BMapExt.refresh();

};
UrbanRoad.ChinaChart.prototype.failHandler=function(result){
	console.log("省际漫入请求失败");
};




UrbanRoad.WorldChart=function ()
{
	this.initialize.apply(this, arguments);
};


UrbanRoad.WorldChart.prototype.rankDom;
UrbanRoad.WorldChart.prototype.chartDom;
UrbanRoad.WorldChart.prototype.ec;
UrbanRoad.WorldChart.prototype.echartCom;
UrbanRoad.WorldChart.prototype.period=5*60*1000;
UrbanRoad.WorldChart.prototype.rankMax=8;
UrbanRoad.WorldChart.prototype.showValueKey="total";

UrbanRoad.WorldChart.prototype.initialize=function(dom,rankdom){
	
	this.chartDom=dom;
	this.rankDom=rankdom;

	require(['echarts',  
	            'echarts/chart/line',  
	            'echarts/chart/map'
	            ],this.initEChart.bind(this));
	
};

UrbanRoad.WorldChart.prototype.initEChart=function(ec){
	this.ec=ec;
	this.echartCom=ec.init(this.chartDom);
	this.update(true);
	setInterval(this.update.bind(this), this.period);
};

UrbanRoad.WorldChart.prototype.update=function(showLoadMask){
	var dm=LSMScreen.DataManager.getInstance();
	dm.getWorldDistributeAll({},this.refreshWorldChart.bind(this),this.failHandler.bind(this));
//	dm.getProvinceDistributeAll({},this.refreshWorldChart.bind(this),this.failHandler.bind(this));
};

UrbanRoad.WorldChart.prototype.refreshWorldChart=function(result){
	var data=result;
	var mapData=[];
	var max=0;
	var time="";
	var total=0;
	var nationNameMap=LSMConsts.NATION_NAME_MAP;
	var dataKey=this.showValueKey;
	
	for(var key in data){
		if(key=="中国"||key=="国外") continue;
		var record=data[key];
		record[dataKey]/=10000;
		if(record.time!=null&&record.time!=""){
			time=record.time;
		}
		total+=record[dataKey];
		mapData.push({key:key.substring(0,2),name:key.substring(0,2),value:record[dataKey]});
		max=Math.max(max,record[dataKey]);
	}
	mapData.sort(function(a,b){return b.value-a.value;});//按value 降序
	
	var rankTable=$(this.rankDom).find("table");
	for(var i=0;i<mapData.length;i++){
		var record=mapData[i];
		var num=record.value;
		var percent=(num/total)*100;
		if(i<this.rankMax){
			var rankHTML='<td class="t1">'+record.key+'</td>'
							     +'<td class="t2">'
							     +'<div class="t2_content">'
							     +'<div class="t'+(i+2)+'_box1"></div>'
							     +'<div class="t2_txt">'+num.toFixed(2)+'<span>&nbsp;万</span></div>'
							     +'</div>'
							     +'</td>'
							     +'<td class="t3"><div class="t2_txt">'+percent.toFixed(2)+'<span>&nbsp;%</span></div></td>';
			rankTable.find("tr:eq("+i+")").html(rankHTML);
		}
	}
	
	$(this.rankDom).find(".content_title").html(
			'<h>国际漫入</h>'
		    +'<h3>'+total.toFixed(2)+'<span>&nbsp;万</span></h3>'
//		    +'<h3>15<span>&nbsp;%</span></h3>'
	);
	if(time!=""&&time!=null){
//		$(".DR2_TIME").text(time.substring(5, 16));
	}
	var option = {
			backgroundColor:'rgba(0,0,0,0)',
		    title : {
		    	show:false
		    },
		    tooltip : {
		        trigger: 'item',
		        formatter : function (params) {
		            var value = (params.value + '').split('.');
		            value = value[0];
		            return params.name + ' : ' + value;
		        }
		    },
		    toolbox: {
		        show : false
		    },
		    dataRange: {
		        min: 0,
		        max: max,
		        text:['',''],
		        realtime: false,
		        calculable : true,
		        color: ['orangered','yellow','lightskyblue']
		    },
		    series : [
		        {
		            name: '国际用户分布',
		            type: 'map',
		            mapType: 'world',
		            roam: true,
		            mapLocation: {
		                y : 60
		            },
		            itemStyle:{
		                emphasis:{label:{show:true}}
		            },
		            data:mapData,
		            nameMap : nationNameMap
		        }
		    ]
		};
	if(this.echartCom!=null){
		this.echartCom.setOption(option,true);
	}
};

UrbanRoad.WorldChart.prototype.failHandler=function(result){
	console.log("国际漫入请求失败");
};
