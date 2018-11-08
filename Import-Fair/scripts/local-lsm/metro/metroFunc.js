var rankChart;
function updateRankChart(currentKpi,currentKpiKey,result,allResult){
	if(rankChart==null){
		var originDisplay=$("#rankChartWin").css("display");
		$("#rankChartWin").css("display","block");
		rankChart=new LSMScreen.SimpleChart($("#rankChart")[0],{},function(){
			if(rankChart!=null&&rankChart.echart!=null){
				$("#rankChartWin").css("display",originDisplay);
				updateRankChart(currentKpi,currentKpiKey,result,allResult);
			}
		});
		if(rankChart.echart!=null){
			$("#rankChartWin").css("display",originDisplay);
			updateRankChart(currentKpi,currentKpiKey,result,allResult);
		}
	}else{
		rankChart.reinitEChart();
		var ecConfig = require('echarts/config');
		rankChart.echart.on(ecConfig.EVENT.CLICK,rankChartClick);
		
		var colors=[];
		var dataArr=[];
		var xArr=[];
		var timeFuncCalled=false;
		var count=0;
		var allArr=[];
		for(var i=0;i<result.length;i++){
			if(count==10){
				break;
			}
			var record=SUtils.convertRecordMetro(result[i]);
			var value=record[currentKpiKey];
			if(isNaN(value)||value==0){
				continue;
			}
			var color=LSMConsts.metroLineColorMap[record.line];
			colors.push(color);
			dataArr.push(value);
			xArr.push(record.station+"("+record.line+"号线)");
			allArr.push(allResult[currentKpiKey]);
			if(timeLinePlayCallBack&&!timeFuncCalled){
				timeLinePlayCallBack(record.time);
				timeFuncCalled=true;
			}
			count++;
		}
		
		colors.reverse();
		dataArr.reverse();
		xArr.reverse();
		var kpiShow="";
		switch(currentKpi){
			case "高客流":
				kpiShow="用户数(人)";
				break;
			case "低流量":
				kpiShow="流量(MB)";
				break;
			case "低速率":
				kpiShow="下行速率(Kbps)";
				break;
			case "低感知":
				kpiShow="TCP掉线率(%)";
				break;
			case "低活跃":
				kpiShow="4G用户比(%)";
				break;
			default:
				kpiShow=currentKpiKey;
				break;
		}
		var series=[{						        
	        name:currentKpi+"--"+kpiShow,
	        type:'bar',
	        data:dataArr,
	        itemStyle:{
	        	normal:{
	        		lineStyle:{width:2},
	        		label : {show: true, position: 'right',textStyle:{fontSize:20}},
	        		 color: function(params) {
	                        // build a color map as your need.
	                        var colorList =colors;
	                        return colorList[params.dataIndex];
	                    }
	        	}
			}
	    }
//		,{						        
//	        name:"全网",
//	        type:'line',
//	        data:allArr
//	    }
	    ];
		rankChart.updateData(getRankChartOption(series,xArr,[currentKpi+"--"+kpiShow]), true);
		
	}
}

function getRankChartOption(series,xArr,legends,tipFormatter){
	if(tipFormatter==null){
		tipFormatter='{b0}:{c0}';
	}
	var colors=['#fced00'];
	var option = {
			color:colors,
		    legend: {
		        data:legends,
		        textStyle :
        		{
		        	color:LSMScreen.CHARTCONFIG.xAxisLabelColor,
            		fontSize:LSMScreen.CHARTCONFIG.axisLabelSize*0.7
        		},
		    },
			grid:{
		    	borderWidth:0,
		    	x:100,
		    	y:50,
		    	x2:70,
		    	y2:10
		    },
		    tooltip : {
		        trigger: 'axis',
		        formatter:tipFormatter
		    },
		    calculable : false,
		    xAxis : [
		        {
		            type : 'value',
		            axisLabel : {
		            	show:false,
		            	textStyle :
		            		{
			            		color:LSMScreen.CHARTCONFIG.xAxisLabelColor,
			            		fontSize:LSMScreen.CHARTCONFIG.axisLabelSize*0.8
		            		}
		            },
		            axisLine:{
		            	lineStyle:{
		            		color: LSMScreen.CHARTCONFIG.xAxisColor,
			                width: 2,
			                type: 'solid'
		            	}
		            },
		            splitLine:{
		            	lineStyle:{
		            		color: LSMScreen.CHARTCONFIG.xAxisColor,
		            		width: 1,
			                type: 'solid'
		            	}
		            },
		            formatter: '{value}'
		        }
		    ],
		    yAxis : [
		        {
		            type : 'category',
		            axisLabel : {
		            	textStyle :
		            		{
		            		color:LSMScreen.CHARTCONFIG.xAxisLabelColor,
		            		fontSize:LSMScreen.CHARTCONFIG.axisLabelSize*0.8
		            		},
		            		formatter:function(lb){
		            			return lb.split("(")[0];
		            		}
		            },
		            axisLine:{
		            	lineStyle:{
		            		color: LSMScreen.CHARTCONFIG.yAxisColor,
			                width: 2,
			                type: 'solid'
		            	}
		            },
		            splitLine:{
		            	lineStyle:{
		            		color:LSMScreen.CHARTCONFIG.yAxisColor,
		            		width: 1,
			                type: 'solid'
		            	}
		            },
		            formatter: '{value}',
		            min:0,
		            data : xArr
		        }
		    ],
		    series : series,
		};
	return option;
};
function rankChartClick(param){
	if (param.type == 'click') {
		var name=param.name;
		var station=name.split("(")[0];
		var line=name.split("(")[1];
		var lineIndex=line.replace("号线)","");
		var lineName="地铁"+line.replace(")","");
		
		var detail=new KpiComponent.DetailQuery();
		detail.STATION=station;
		detail.LINE_INDEX=lineIndex;
		detail.showStationKpi();
		
		if(MetroScreenNewCtrl!=null){
			MetroScreenNewCtrl.mapSelectedHotspot=lineName;//地图点选
			MetroScreenNewCtrl.selectedStation=station;//表格点选 站点级时查质差小区
			MetroScreenNewCtrl.selectedHotspot=station;//表格点选
			MetroScreenNewCtrl.update();
		}
		
	}
}