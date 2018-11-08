var CIIENEW=CIIENEW||{};
CIIENEW.Roam=function ()
{
	this.initialize.apply(this,arguments);
};
CIIENEW.Roam.prototype.constructor=CIIENEW.Roam;
CIIENEW.Roam.prototype.hotspot='进口博览会';
CIIENEW.Roam.prototype.dm=null;
CIIENEW.Roam.prototype.cdm=null;
CIIENEW.Roam.prototype.hotspotList=[];
CIIENEW.Roam.prototype.startIndex=0;
CIIENEW.Roam.prototype.selectedHot=null;
CIIENEW.Roam.prototype.lineWidth=3;
CIIENEW.Roam.prototype.chartLabelSize=24;
CIIENEW.Roam.prototype.initialize=function(_hotspot){
	if(_hotspot!=null){
		this.hotspot=_hotspot;
	}
	this.dm=LSMScreen.DataManager.getInstance();
	this.cdm=LSMScreen.CacheDataManager.getInstance();
	
	
	//$('text').text('');
	//$('polygon').css('fill','#224ba3');
	//$('path').css('fill','#224ba3');
	//$('.cls-5').css('fill','#ff0000');
	
	require(['BMap'],this.initMapEx.bind(this));
	
	
};
	

CIIENEW.Roam.prototype.update=function(){
	this.cdm.getIntlRoamTopN({},this.drawWorldChart.bind(this));
};
CIIENEW.Roam.prototype.initMapEx=function(mapEx){
	BMapExtension=mapEx;
	require(['echarts',  
	            'echarts/chart/map'
	            ],this.initEcharts.bind(this));
};
CIIENEW.Roam.prototype.initEcharts=function(ec){
	this.ec=echarts=ec;
	this.ec=echarts;
	this.roamWorldChart=echarts.init($("#roamWorldChart")[0],'marcarons');
	this.initMapChart();
};
CIIENEW.Roam.prototype.initMapChart=function(){
	if(this.BMapExt==null){
		var domMain2=$('#roamWorldChart')[0];
		var BMapExt2=new BMapExtension(domMain2, BMap, this.ec,require('zrender'));
		var container = BMapExt2.getEchartsContainer();
		this.echartCom = BMapExt2.initECharts(container);
		$('#roamWorldChart').css('backgroundColor','rgba(0,0,0,0)');
		
		
		this.update();
		setInterval(this.update.bind(this),60*1000);
	}
};

CIIENEW.Roam.prototype.drawWorldChart=function(result){
	
	var list=result.data;
	var mapData=[];
	var max=0;
	var time="";
	var total=0;
	var nationNameMap=LSMConsts.NATION_NAME_MAP;
	for(var i=0;i<list.length;i++){
		var record=list[i];
		var name=record.intl_name.split('(')[0];
		var value=record.user_cnt;
		max=Math.max(max,value);
		mapData.push({key:name,name:name,value:value});
		
	}

	var option = {
			backgroundColor:'rgba(0,0,0,0)',
		    title : {
		    	show:false
		    },
		    tooltip : {
		        trigger: 'item',
		        show:false,
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
		            name: '国际用户分布',
		            type: 'map',
		            mapType: 'world',
		            roam: true,
		            mapLocation: {
		                y : 60
		            },
		            itemStyle:{
		            	normal:{
		            		color:'#224ba3',
		            		backgroundColor:'rgba(0,0,0,0.7)',
			            	label:{
				            	show:true,
				            	formatter:function(name,value){
				            		if(value!='-'){
				            			return name+'-'+value+'人';
				            		}else{
				            			return '';
				            		}
				            	},textStyle:{
				            		color:'#ffffff',
				            		fontSize:20
				            	}
			            	}
			            },
		                emphasis:{}
		            },
		            data:mapData,
		            nameMap : nationNameMap
		        }
		    ]
		};
	if(this.echartCom!=null){
		this.echartCom.setOption(option,true);
	}
	$('#roamWorldChart').css('backgroundColor','rgba(0,0,0,0)');
};