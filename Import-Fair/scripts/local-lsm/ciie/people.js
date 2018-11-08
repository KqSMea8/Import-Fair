var CIIE=CIIE||{};

CIIE.People=function ()
{
	this.initialize.apply(this,arguments);
};
CIIE.People.prototype.constructor=CIIE.People;
CIIE.People.prototype.fakeRecords=[
{'场馆':'总场馆','用户数':3380,'总流量':644.78},
{'场馆':'NH广场','用户数':2052,'总流量':828.56},
{'场馆':'WH广场','用户数':1477,'总流量':394.37},
{'场馆':'入口广场','用户数':1153,'总流量':228.45},
{'场馆':'EH广场','用户数':640,'总流量':244.49},
{'场馆':'4.1H','用户数':628,'总流量':374.83},
{'场馆':'5.2H','用户数':561,'总流量':172.07},
{'场馆':'5.1H','用户数':531,'总流量':224.61},
{'场馆':'8.1H','用户数':459,'总流量':70.50},
{'场馆':'3H','用户数':447,'总流量':197.39},
{'场馆':'1H','用户数':429,'总流量':170.44}
];
CIIE.People.prototype.hotspot=null;
CIIE.People.prototype.ec=null;
CIIE.People.prototype.chart=null;
CIIE.People.prototype.map=null;
CIIE.People.prototype.dm=null;
CIIE.People.prototype.hotspotList=[];
CIIE.People.prototype.selectedHotspot=null;
CIIE.People.prototype.gridDataCache=[];

CIIE.People.prototype.initialize=function(_hotspot){
	//var fontCalculate=
	//$('body').css('font-size',8);
	this.hotspot=_hotspot;
	this.selectedHotspot=_hotspot;
	this.dm=LSMScreen.DataManager.getInstance();
	
	this.map=new CIIE.Map('map',this.hotspot,'topleft',BASEPATH,false);
	this.initTable();
	this.chart=echarts.init($("#chart")[0],'marcarons');
	this.update();
	var list=$('#mapgrid>.ciie_ctrlbtn');
	$('.grid_ctrlbtn').on('click',this.mapGridCtrl.bind(this));
	
	$('.chart_ctrlbtn').on('click',this.mapChartCtrl.bind(this));
	
	$('.maxFrame_ctrlbtn').on('click',this.normalCtrl.bind(this));
	
	
};
CIIE.People.prototype.update=function(e){
	this.updateChart();
	if(this.hotspotList.length==0){
		this.dm.getSubHotspots({hotspot:this.hotspot},this.subHotspotDataHandler.bind(this));
	}else{
		this.updateGrid();
	}
};
CIIE.People.prototype.subHotspotDataHandler=function(result){
	var hotspots=[];
	for(var i=0;i<result.length;i++){
		hotspots.push(result[i].hot_name);
	}
	this.hotspotList=hotspots;
	this.updateGrid();
};
CIIE.People.prototype.updateGrid=function(){
//	this.dm.getHotSpotsKpis(this.hotspotList,null,null,this.gridDataHandler.bind(this));
	this.dm.getHotSpotsKpisTimeCompared(this.hotspotList,null,null,this.gridDataHandler.bind(this),null,null,false,'总用户数,总用户数历史比,总流量,总流量历史比,time');
	
};
CIIE.People.prototype.updateChart=function(){
	this.dm.getHotSpotsKpisCompared(this.selectedHotspot, null, null, null, null,null,
			this.drawChart.bind(this),null,false,'总用户数,总流量,time');
};
CIIE.People.prototype.gridDataHandler=function(result){
	var list=[];
	var kpiRecord={};
	for(var key in result){
		var record=result[key];
		record.hot_name=key;
		record["总流量"]=(record["总流量"]/1024/1024).toFixed(2);
		if(this.selectedHotspot==key){
			kpiRecord["总流量"]=record["总流量"];
			kpiRecord["总用户数"]=record["总用户数"];
			kpiRecord["总流量历史比"]=record["总流量历史比"];
			kpiRecord["总用户数历史比"]=record["总用户数历史比"];
		}
		list.push(record);
	}
	this.updateSelected(kpiRecord);
	//list.sort(function(a,b){return b["总用户数"]-a["总用户数"];});
	list.sort(function(a,b){return b["总流量"]-a["总流量"];});
	$('#table')[0].addJSONData(list);
	this.gridDataCache=list;
	
	//new scrollbot(".ui-jqgrid-bdiv");
	
};
CIIE.People.prototype.normalCtrl=function(e){
	var originTarget=$(e.currentTarget).attr('originTarget');
	if(originTarget=='mapgrid'){
		$('#maxFrame').css('display','none');
		$('#mapgrid').prepend($('#mapgridcontent'));
		$('#table').jqGrid('setGridWidth',$('#mapgrid').width(),true);
		$('#table').jqGrid('setGridHeight',this.getNormalTableHeight());
		var el=$('#gbox_table').find('.ui-jqgrid-bdiv');
		$('#gbox_table').find('.ui-jqgrid-bdiv').css('overflow-x','hidden');
		//this.initTable();
	}else if(originTarget=='mapchart'){
		$('#maxFrame').css('display','none');
		$('#mapchart').prepend($('#mapchartcontent'));
		this.chart.resize();
	}
};
CIIE.People.prototype.mapGridCtrl=function(e){
	var btn=$(e.currentTarget).attr('class');
	if(btn.indexOf('ciie_max_btn')!=-1){
		$('#maxFrame').css('display','block');
		$('#maxcontent').append($('#mapgridcontent'));
		$('.maxFrame_ctrlbtn').attr('originTarget','mapgrid');
		$('#table').jqGrid('setGridWidth',$('#maxcontent').width(),true);
		$('#table').jqGrid('setGridHeight',$('#maxcontent').height());
		//this.initTable();
	}else if(btn.indexOf('ciie_collapse_btn')!=-1){
		$('#mapgridcontent').css('display','none');
		$('#mapgrid>.ciie_max_btn').css('display','none');
		$('#mapgrid>.ciie_collapse_btn').css('display','none');
		$('#mapgrid>.ciie_expand_btn').css('display','block');
		$('#mapgrid').animate({width:'0.9em',right:0},1000);
	}else if(btn.indexOf('ciie_expand_btn')!=-1){
		$('#mapgrid').animate({width:'40%',right:'2%'},1000);
		$('#mapgridcontent').css('display','block');
		$('#mapgrid>.ciie_max_btn').css('display','block');
		$('#mapgrid>.ciie_collapse_btn').css('display','block');
		$('#mapgrid>.ciie_expand_btn').css('display','none');
	}
	
};
CIIE.People.prototype.mapChartCtrl=function(e){
	var btn=$(e.currentTarget).attr('class');
	if(btn.indexOf('ciie_max_btn')!=-1){
		$('#maxFrame').css('display','block');
		$('#maxcontent').append($('#mapchartcontent'));
		$('.maxFrame_ctrlbtn').attr('originTarget','mapchart');
		this.chart.resize();
	}else if(btn.indexOf('ciie_collapse_btn')!=-1){
		$('#mapchartcontent').css('display','none');
		$('#mapchart>.ciie_max_btn').css('display','none');
		$('#mapchart>.ciie_collapse_btn').css('display','none');
		$('#mapchart>.ciie_expand_btn').css('display','block');
		$('#mapchart').animate({width:'0.9em',right:0},1000);
		
		$('.kpiFrame:eq(0)').animate({right:'20%'},1000);
		$('.kpiFrame:eq(1)').animate({right:0},1000);
	}else if(btn.indexOf('ciie_expand_btn')!=-1){
		$('#mapchart').animate({width:'40%',right:'2%'},1000);
		$('#mapchartcontent').css('display','block');
		$('#mapchart>.ciie_max_btn').css('display','block');
		$('#mapchart>.ciie_collapse_btn').css('display','block');
		$('#mapchart>.ciie_expand_btn').css('display','none');
		
		$('.kpiFrame:eq(0)').animate({right:'60%'},1000);
		$('.kpiFrame:eq(1)').animate({right:'40%'},1000);
	}
};
CIIE.People.prototype.initTable=function(){
	try{
		$('#table').jqGrid('GridDestroy');
	}catch(e){}
	var colNames=['场馆','用户数(人)','总流量(GB)'];
	var colModel=[
	    {colName:'hot_name',name : 'hot_name',index : 'hot_name'},
	    {colName:'总用户数',name : '总用户数',index : '总用户数'},
	    {colName:'总流量',name : '总流量',index : '总流量'}
	];
	
	
	var opt1={
	        datatype : function(){},
	        colNames:colNames,
	        colModel : colModel,
	        loadui:'disable',
	        width:'100%',
	        height:this.getNormalTableHeight(),
	        autowidth: true,
	        shrinkToFit: true,
	        rowNum:1000,
	        onSelectRow:this.gridSelected.bind(this)
		};
	
	$('#tableParent').html('<table id="table" style="width:100%;height:100%;"></table>');
	$('#table').jqGrid(opt1);
	//new scrollbot(".ui-jqgrid-bdiv");
	//$('#table')[0].addJSONData(this.fakeRecords);
};
CIIE.People.prototype.getNormalTableHeight=function(){
	var em=$('body').css('font-size').replace("px","");//em换算
	var titleHeight=2.2*em;
	var headerHeight=2.4*em;
	var tableHeight=$('#tableContent').height()-titleHeight-headerHeight;
	return tableHeight;
};
CIIE.People.prototype.gridSelected=function(rowid,status){
	var record=this.gridDataCache[rowid-1];
	this.selectedHotspot=record.hot_name;
	this.updateSelected(record);
	this.updateChart();
};
CIIE.People.prototype.updateSelected=function(record){
	$('#kpiuser_value').text(record["总用户数"]);
	$('#kpiflow_value').text(record["总流量"]);
	
	if(record["总用户数历史比"]>1){
		$('#kpiuser_arrow').css('color','red');
		$('#kpiuser_arrow').text('▲');
		$('#kpiuser_ratio').text('+'+(record["总用户数历史比"]*100).toFixed(2));
	}else if(record["总用户数历史比"]==1){
		$('#kpiflow_arrow').text('');
		$('#kpiuser_ratio').text('0');
	}else{
		$('#kpiuser_arrow').css('color','green');
		$('#kpiuser_arrow').text('▼');
		$('#kpiuser_ratio').text((record["总用户数历史比"]*100-100).toFixed(2));
	}
	
	if(record["总流量历史比"]>1){
		$('#kpiflow_arrow').css('color','red');
		$('#kpiflow_arrow').text('▲');
		$('#kpiflow_ratio').text('+'+(record["总流量历史比"]*100-100).toFixed(2));
	}else if(record["总流量历史比"]==1){
		$('#kpiflow_arrow').text('');
		$('#kpiflow_ratio').text('0');
	}else{
		$('#kpiflow_arrow').css('color','green');
		$('#kpiflow_arrow').text('▼');
		$('#kpiflow_ratio').text((record["总流量历史比"]*100-100).toFixed(2));
	}
	
};
CIIE.People.prototype.drawChart=function(result){
	var xArr=[];
	var userArr=[];
	var flowArr=[];
	if(result==null||isNaN(result.length)){
		result=[];
	}
	result=result.reverse();
	var user=0;
	var flow=0;
	for(var i=0;i<result.length;i++){
		var record=result[i];
		var time=record.time;
		var hour=time.substring(11,16);
		user=(record["总用户数"]);
		flow=(record["总流量"]/1024/1024).toFixed(2);
		xArr.push(hour);
		userArr.push(user);
		flowArr.push(flow);
	}
	
	var option = {
			color:['#41c450','#f9a03c'],
		    title : {
		        show:false
		    },
		    tooltip : {
		        trigger: 'axis'
		    },
		    legend: {
		        data:['用户数','流量'],
		        textStyle:{color:'#ffffff'}
		    },
		    toolbox: {
		        show : false
		    },
		    calculable : false,
		    grid:{
		    	borderWidth:0,
		    	x:50,
		    	y:30,
		    	x2:50,
		    	y2:50
		    },
		    xAxis : [
		        {
		            type : 'category',
		            data : xArr,
		            axisLine:{show:true,lineStyle:{color:'#ffffff'}},
		            axisLabel:{textStyle:{color:'#ffffff'}},
		            splitLine:{show:false}
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            axisLine:{show:false},
		            splitLine:{show:false},
		            axisLabel:{textStyle:{color:'#ffffff'}},
		            axisTick:{show:true,lineStyle:{color:'#ffffff'}}
		        },{
		            type : 'value',
		            axisLine:{show:false},
		            splitLine:{show:false},
		            axisLabel:{textStyle:{color:'#ffffff'}},
		            axisTick:{show:true,lineStyle:{color:'#ffffff'}}
		        }
		    ],
		    series : [
		        {
		            name:'用户数',
		            type:'bar',
		            data:userArr,
		            itemStyle:{
		            	normal:{
		            		barBorderRadius:8
		            	}
		            }
		        },
		        {
		            name:'流量',
		            type:'line',
		            data:flowArr,
		            yAxisIndex:1,
		            smooth:true,
		            itemStyle:{
		            	normal:{
		            		areaStyle:{
		            			color:'rgba(249,160,60,0.2)'
		            		}
		            	}
		            }
		        }
		    ]
		};
	
	this.chart.setOption(option,true);
};
