<!DOCTYPE html>
<html lang="zh-CN">
<head>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%
String isScreenMode = request.getParameter("isScreenMode");
%>
<meta charset="UTF-8" http-equiv="X-UA-Compatible" content="IE=Edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<%@ include file="/common/lib.jsp"%>
<c:set var="hotspot" value="disney" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/${hotspot}/style.css" />
<%@ include file="/common/bootstrap.jsp"%> 
<%@ include file="/common/echarts.jsp"%>
<title>迪士尼大屏</title>
</head>
<body style="background:#00020e;"> 
</body>
<%@ include file="/pages/local-lsm/common/screenbaseinclude.jsp"%>
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/${hotspot}/custom.css" />
<script>
var chart;
var grid;
(function(){
	SUtils.initScene(function(){
		HOTSPOT=LSMConsts.hotspots[0];
		showUserNumCompare();
	});
}());
function showUserNumCompare(){
	var docWidth=$(document).width();
	var docHeight=$(document).height();
	var winWidth=docWidth;
	var winHeight=docHeight;
	var chartHeight=docHeight*0.4;
	var chartDom=document.createElement("div");
	var tableDom=document.createElement("table");
	$(chartDom).width(winWidth);
	$(chartDom).height(chartHeight);
	$("body").append(chartDom);
	$("body").append(tableDom);
	var cols=[
	    {colName:'热点名称',name : 'name',index : 'name',width : docWidth*0.4},
	    {colName:'大客流用户数',name : 'pf_stock',index : 'pf_stock',width : docWidth*0.3},
	    {colName:'信令用户数',name : '总用户数',index : '总用户数',width : docWidth*0.3}
	];
	var opt1={
	        datatype : function(){},
	        colNames:['热点名称','大客流用户数','信令用户数'],
	        colModel : cols,
	        loadui:'disable',
	        afterInsertRow:function(rowid,rowdata){
	        	var tr=grid.find("tbody").find("tr")[rowid];
	        	$(tr).attr("name",rowdata.name);
	        	$(tr).on('click',updateChartEvent);
	        }.bind(this),
	        height:winHeight-chartHeight-80
		};
	
	grid=$(tableDom).jqGrid(opt1);
	chart=new LSMScreen.SimpleChart(chartDom,{},updateGrid);
	setInterval(updateGrid, 5*60*1000);
};
function updateGrid(){
	var dm=LSMScreen.DataManager.getInstance();
	dm.getGridHotPftTrend(
		{},
		function(pftMap){
			dm.getSubHotspots({hotspot:LSMConsts.hotspots[0]},function(data){
				var hotspots=[LSMConsts.hotspots[0]];
				for(var i=0;i<data.length;i++){
					hotspots.push(data[i].hot_name);
				}
				dm.getHotSpotsKpis(hotspots,null,"hour",function(sigData){
					SUtils.clearGrid(grid);
					var arr=[];
					for(var key in sigData){
						var lastRecord=null;
						if(pftMap[key]&&pftMap[key].length>0){
							lastRecord=pftMap[key][pftMap[key].length-1]
						}
						sigData[key]=$.extend(sigData[key],lastRecord); 
						sigData[key]["name"]=key;
						arr.push(sigData[key]);
					}
					arr=arr.sort(function(a,b){return b["总用户数"]-a["总用户数"];});
					for(var i=0;i<arr.length;i++){
						var record=arr[i];
						grid.jqGrid('addRowData', i+1, record);
					}
					grid.find("tr").removeClass("oddGrayTableRow");
					grid.find("tr:odd").addClass("oddGrayTableRow");
					if(arr.length>0){
						updateChart(arr[0]["name"]);
					}
				},function(){console.log("信令用户数请求失败");});
			},function(){console.log("子热点列表请求失败");});
		},
		function(){console.log("小区用户数详情信息请求失败");}
	);
}
function updateChartEvent(evt){
	var hotspot=$(evt.currentTarget).attr("name");
	updateChart(hotspot);
}
function updateChart(hotspot){
	var dm=LSMScreen.DataManager.getInstance();
	dm.getGridHotPftTrend(
		{},
		function(pftMap){
			LSMScreen.DataManager.prototype.getHotSpotsKpisCompared(hotspot, null, null, null, null,"hour",
					function(arr){
				
				var pftChartArr=[];
				var sigChartArr=[];
				var xArr=[];
				var pftList=pftMap[hotspot];
				var pftTimeMap={};
				var i=0;
				if(pftList!=null){
					for(i=0;i<pftList.length;i++){
						pftTimeMap[pftList[i].time.substring(11,16)]=pftList[i].pf_stock;
					}
				}
				for(i=0;i<arr.length;i++){
					var record=arr[i];
					var timeTxt=record.time.substring(11,16);
					xArr.push(timeTxt);
					sigChartArr.push(record["总用户数"]);
					pftChartArr.push(pftTimeMap[timeTxt]);
				}
				
				var tipFormatter=hotspot+'<br/>'
				+'{b}<br/>'
				+'{a0}:{c0}<br/>'
				+'{a1}:{c1}<br/>';
				
				var option = {
						color:['#fced00','#00ff5a','#7B68EE'],
					    legend: {
					        data:["大客流用户数","信令用户数"],
					        textStyle :
			        		{
					        	color:LSMScreen.CHARTCONFIG.xAxisLabelColor,
			            		fontSize:LSMScreen.CHARTCONFIG.axisLabelSize*0.7
			        		},
					    },
						grid:{
					    	borderWidth:0,
					    	x:100,
					    	y:30,
					    	x2:30,
					    	y2:70
					    },
					    tooltip : {
					        trigger: 'axis',
					        formatter:tipFormatter
					    },
					    calculable : false,
					    xAxis : [
					        {
					            type : 'category',
					            axisLabel : {
					            	textStyle :
					            		{
						            		color:LSMScreen.CHARTCONFIG.xAxisLabelColor,
						            		fontSize:LSMScreen.CHARTCONFIG.axisLabelSize
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
					            formatter: '{value}',
					            data : xArr
					        }
					    ],
					    yAxis : [
					        {
					            type : 'value',
					            axisLabel : {
					            	textStyle :
					            		{
					            		color:LSMScreen.CHARTCONFIG.xAxisLabelColor,
					            		fontSize:LSMScreen.CHARTCONFIG.axisLabelSize
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
					            min:0
					        }
					    ],
					    series : [
					        {
					            name:'大客流用户数',
					            type:'line',
					            data:pftChartArr,
					            itemStyle:{normal:{lineStyle:{width:2}}}
					        },
					        {
					            name:'信令用户数',
					            type:'line',
					            data:sigChartArr,
					            itemStyle:{normal:{lineStyle:{width:2}}}
					        }
					    ],
					};
				chart.updateData(option, true);
			},function(){console.log("信令用户数趋势图请求失败");});
		},
		function(){console.log("小区用户数详情信息请求失败");}
	);
	
}
	
</script>
</html>