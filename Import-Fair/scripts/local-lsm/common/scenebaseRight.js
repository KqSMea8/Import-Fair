function closeDrillApp(){
	disneyRightNew.closeDrillApp();
}

var SceneBase = SceneBase || {};

/**
 * 迪士尼大屏右侧分布图表大屏
 * @class SceneBase.RightScreen
 * @extends LSMScreen.ScreenBase
 * @classdesc 继承ScreenBase 绘制大屏组件,控制定时刷新各个组件
 */
SceneBase.RightScreen=function(_hotspot)
{
	this.hotspot=_hotspot;
	this.initialize.apply(this, arguments);
};
/** 从ScreenBase继承*/
SceneBase.RightScreen.prototype=Object.create(LSMScreen.ScreenBase.prototype);
SceneBase.RightScreen.prototype.constructor=SceneBase.ScreenController;

/**
 * 基础热点名称 用作接口请求参数
 * @public
 * @type {String} 
 */
SceneBase.RightScreen.prototype.hotspot;

/**
 * 当前表格类型 用户 业务 客流 园区
 * @public
 * @type {Object} 
 */
SceneBase.RightScreen.prototype.currentGridType="用户";
/////////////基础控制id及class设置  START////////////////////
/**
 * 页面上放置chart的div的id
 * @public
 * @type {String} 
 */
SceneBase.RightScreen.prototype.chartId="normalChart";
/**
 * 页面上放置chart扩展用的div的id
 * @public
 * @type {String} 
 */
SceneBase.RightScreen.prototype.extensionChartId="extensionChart";

/**
 * 页面上放置滑动切换的div的id
 * @public
 * @type {String} 
 */
SceneBase.RightScreen.prototype.slideId="slide";

/**
 * 数据信息 列明
 * @public
 * @type {String} 
 */
SceneBase.RightScreen.prototype.kpiColumn="kpiColumn";

/**
 * 数据信息 名称class
 * @public
 * @type {String} 
 */
SceneBase.RightScreen.prototype.nameLiClass="tr_txt";

/**
 * 数据信息 数据class
 * @public
 * @type {String} 
 */
SceneBase.RightScreen.prototype.valueLiClass="tr_txt3";

/**
 * 左箭头
 * @public
 * @type {String} 
 */
SceneBase.RightScreen.prototype.leftArrowClass="DR3_left";

/**
 * 右箭头
 * @public
 * @type {String} 
 */
SceneBase.RightScreen.prototype.leftArrowClass="DR3_left";


/**
 * 选择图片class
 * @public
 * @type {String} 
 */
SceneBase.RightScreen.prototype.slideImgClass="banner";

/**
 * 选择图片名称class
 * @public
 * @type {String} 
 */
SceneBase.RightScreen.prototype.slideImgNameClass="Chooseregion_txt";
/////////////基础控制id及class设置  END////////////////////

/////////////缓存数据  START////////////////////
/**
 * 国内外游客占比
 * @public
 * @type {Array} 
 */
SceneBase.RightScreen.prototype.chartDataLine0=null;//[];
/**
 * 国内外游客比例
 * @public
 * @type {Array} 
 */
SceneBase.RightScreen.prototype.chartDataLine1=null;//[];


/**
 * 国内游客分布
 * @public
 * @type {Object} 
 */
SceneBase.RightScreen.prototype.chartDataChina=null;//{};

/**
 * 国际游客分布
 * @public
 * @type {Object} 
 */
SceneBase.RightScreen.prototype.chartDataWorld=null;//{};


/////////////缓存数据  END////////////////////

/**
 * 下方滑动条组件
 * @private
 * @type {Object} 
 */
SceneBase.RightScreen.prototype.sliderCom;
/**
 * 图表组件
 * @private
 * @type {Object} 
 */
SceneBase.RightScreen.prototype.echartCom;
/**
 * echarts实例
 * @private
 * @type {Object} 
 */
SceneBase.RightScreen.prototype.ec;

/**
 * 地图扩展实例
 * @private
 * @type {Object} 
 */
SceneBase.RightScreen.prototype.myChart;

/**
 * 地图扩展 BMapExt
 * @private
 * @type {Object} 
 */
SceneBase.RightScreen.prototype.BMapExt;

/**
 * loadMask
 * @private
 * @type {Object} 
 */
SceneBase.RightScreen.prototype.loadMask;

/**
 * 表格用的loadMask
 * @private
 * @type {Object} 
 */
SceneBase.RightScreen.prototype.gridLoadMask;

/**
 * 右侧用户数表格的jquery对象
 * @private
 * @type {Object} 
 */
SceneBase.RightScreen.prototype.userGrid;


/** 
 * 初始化DataManager
 * @protected
 * @function 
 */
SceneBase.RightScreen.prototype.initConfigs=function(){
	this.dataManager=LSMScreen.DataManager.getInstance();
	this.initComponents();
};
/** 
 * 初始化未绘制的组件
 * @protected
 * @function 
 */
SceneBase.RightScreen.prototype.initComponents=function(){
	this.loadMask=new LSMScreen.LoadMask($(".Disney_R")[0]);
	this.gridLoadMask=new LSMScreen.LoadMask($(".DR2_right")[0]);
	
	//初始化echarts
	require(['BMap'],this.initMapExtension.bind(this));
	
	
	//监听切换事件
	$(".banner").on('click',this.chartClick.bind(this));
	
	$(".DR3_left").on('click',this.prevChart.bind(this));
	
	$(".DR3_right").on('click',this.nextChart.bind(this));
	
	this.updateGridCol("china");
	
	if(this.initNewVersionRight!=null){
		this.initNewVersionRight();
	}
};
SceneBase.RightScreen.prototype.updateGridCol=function(type){
	$(".DR2_right_content").html('<span class="DR2_TIME"></span><table id="cityUserTable" width="100%" border="0"></table>');
	var cols=[];
	if(type=="china"){
		cols=[
	          {colName:'地市',name : 'key',index : 'key',width : 185},
	          {colName:'用户',name : 'value',index : 'value',width : 185}
	    ];
	}else if(type=="world"){
		cols=[
	          {colName:'国家',name : 'key',index : 'key',width : 185},
	          {colName:'用户',name : 'value',index : 'value',width : 185}
	    ];
	}else if(type=="line"){
		cols=[
	          {colName:'时间',name : 'time',index : 'time',width : 124},
	          {colName:'昨天',name : 'last',index : 'last',width : 123},
	          {colName:'今天',name : 'now',index : 'now',width : 123}
	    ];
	}
	
	var colNames=[];
	for(var i=0;i<cols.length;i++){
		colNames.push(cols[i].colName);
	}
	
	
	this.userGrid=$("#cityUserTable").jqGrid({
        datatype : function(){},
        colNames:colNames,
        colModel : cols,
        loadui:'disable',
        height:640
	});
};

/** 
 * 初始化echarts地图扩展
 * @protected
 * @function 
 */
SceneBase.RightScreen.prototype.initMapExtension=function(mapEx){
	//由于使用了百度地图扩展 这里需要用到全局变量 
	BMapExtension = mapEx;
    if (false) {//isBtnRefresh
        needRefresh = true;
        focusGraphic();
        return;
    }
    needRefresh = false;
    
	require(['echarts',  
	            'echarts/chart/line',  
	            'echarts/chart/map'
	            ],this.initEChart.bind(this));
};

/** 
 * 初始化echarts组件
 * @protected
 * @function 
 */
SceneBase.RightScreen.prototype.initEChart=function(ec){
	this.ec=ec;
	this.echartCom=ec.init($("#"+this.chartId)[0]);
	
	this.update(true);
};

/** 
 * 周期更新数据方法
 * @protected
 * @function 
 */
SceneBase.RightScreen.prototype.update=function(showLoadMask){
	//this.showChart(this.getSelectedChartIndex(),showLoadMask);
	this.updateLine(showLoadMask);
	this.updateChina(showLoadMask);
	this.updateWorld(showLoadMask);
//	this.updateGrid(showLoadMask);
};

SceneBase.RightScreen.prototype.updateGrid=function(showLoadMask){
	if(showLoadMask){
//		this.gridLoadMask.show();
		console.log("show updateGrid");
	}
	this.dataManager.getHotSpotCustomerCountAndFlow(LSMConsts.hotspots,null,null,this.gridDataHandler.bind(this),this.failHandler.bind(this));
//	this.dataManager.getHotspotNameMatch({match:".*"+this.hotspot+".*"},this.subhotspotHandler.bind(this),this.failHandler.bind(this));
};

SceneBase.RightScreen.prototype.updateChina=function(showLoadMask){
	if(showLoadMask){
//		this.loadMask.show();
		console.log("show updateChina");
	}
	this.dataManager.getProvinceDistribute({hotspot:this.hotspot},this.chinaDataHandler.bind(this),this.failHandler.bind(this));
};

SceneBase.RightScreen.prototype.updateWorld=function(showLoadMask){
	if(showLoadMask){
//		this.loadMask.show();
		console.log("show updateWorld");
	}
	this.dataManager.getWorldDistribute({hotspot:this.hotspot},this.worldDataHandler.bind(this),this.failHandler.bind(this));
};
SceneBase.RightScreen.prototype.updateLine=function(showLoadMask){
	if(showLoadMask){
//		this.loadMask.show();
		console.log("show updateLine");
	}
	var config={
			timeBegin:SUtils.getDiffDateTimeFromNow(-1,SUtils.TIME_TYPE.DATE,'yyyy-MM-dd 00:00:00'),
			timeEnd:SUtils.getNowDateTime('yyyy-MM-dd hh:mm:ss'),
			hotspot:this.hotspot
		};
	this.dataManager.getWorldDistributeTrend(config,this.lineDataHandler.bind(this),this.failHandler.bind(this));
};

SceneBase.RightScreen.prototype.chinaDataHandler=function(chartData){
	this.chartDataChina=chartData;
	var chartIndex=this.getSelectedChartIndex();
	if(chartIndex==2){
		this.showChina();
	}
	this.loadMask.hide();
	console.log("hide chinaDataHandler");
};

SceneBase.RightScreen.prototype.worldDataHandler=function(chartData){
	this.chartDataWorld=chartData;
	var chartIndex=this.getSelectedChartIndex();
	if(chartIndex==3){
		this.showWorld();
	}
	this.loadMask.hide();
};
SceneBase.RightScreen.prototype.lineDataHandler=function(chartData){
	this.chartDataLine0=this.chartDataLine1=chartData;
	var chartIndex=this.getSelectedChartIndex();
	if(chartIndex==0||chartIndex==1){
		this.showLine();
	}
	this.loadMask.hide();
};

SceneBase.RightScreen.prototype.subhotspotHandler=function(arr){
	this.dataManager.getHotSpotCustomerCountAndFlow(arr,null,this.gridDataHandler.bind(this),this.failHandler.bind(this));
};
SceneBase.RightScreen.prototype.gridDataHandler=function(data){
	var list=[];
	var valueKey="";
	var divider=1;
	var percise=0;
	$("#"+this.kpiColumn).html(this.currentGridType);
	switch(this.currentGridType){
		case "用户":
			valueKey="总用户数";
			break;
		case "业务":
			valueKey="4G流量";
			divider=LSMConsts.byteDivider;
			percise=2;
			break;
		case "客流":
			valueKey="总用户数";
			break;
		case "园区":
			valueKey="总用户数";
			break;
	}
	var time="";
	for(var key in data){
		var record=data[key];
		if(record.time!=null){
			time=record.time;
		}
		record=$.extend(record,{name:key});
		list.push(record);
	}
	
	list.sort(function(a,b){return b[valueKey]-a[valueKey];});//按value 降序
	$(".DR2_TIME").text(time.substring(5, 16));
	var nameList=$("."+this.nameLiClass);
	var valueList=$("."+this.valueLiClass);
	var ilength=Math.min(list.length,nameList.length);
	var i=0;
	for(i=0;i<nameList.length;i++){
		$(nameList[i]).text("");
		$(valueList[i]).text("");
	}
	for(i=0;i<ilength;i++){
		$(nameList[i]).text(list[i].name);
		$(valueList[i]).text((list[i][valueKey]/divider).toFixed(percise));
	}
	this.gridLoadMask.hide();
};
SceneBase.RightScreen.prototype.navClick=function(tab){
	this.currentGridType=tab;
	switch(this.currentGridType){
		case "用户":
			$("#swfIframe").css("display","none");
			$(".disney_right").removeClass("disney_right2");
			$(".DR1").css("display","block");
			$(".DR2").css("display","block");
			$(".DR3").css("display","block");
			break;
		case "业务":
			$(".disney_right").addClass("disney_right2");
			$(".DR1").css("display","none");
			$(".DR2").css("display","none");
			$(".DR3").css("display","none");
			
			$("#swfIframe").css("display","block");
			break;
		case "客流":
			break;
		case "园区":
			break;
	}
//	this.updateGrid(true);
};

SceneBase.RightScreen.prototype.prevChart=function(){
	var cur=this.getSelectedChartIndex();
	var next=(cur-1)%$("."+this.slideImgClass+" .SelectBG").length;
	$("."+this.slideImgClass+" .SelectBG").css("display","none");
	$($("."+this.slideImgClass+" .SelectBG")[next]).css("display","block");
	this.showChart(next,true);
};

SceneBase.RightScreen.prototype.nextChart=function(){
	var cur=this.getSelectedChartIndex();
	var next=(cur+1)%$("."+this.slideImgClass+" .SelectBG").length;
	$("."+this.slideImgClass+" .SelectBG").css("display","none");
	$($("."+this.slideImgClass+" .SelectBG")[next]).css("display","block");
	this.showChart(next,true);
};

SceneBase.RightScreen.prototype.chartClick=function(evt){
	$("."+this.slideImgClass+" .SelectBG").css("display","none");
	var N=parseInt($(evt.currentTarget).attr("name"));
	$($("."+this.slideImgClass+" .SelectBG")[N]).css("display","block");
	this.showChart(N,true);
//	this.update(true);
};
SceneBase.RightScreen.prototype.showChart=function(N,showLoadMask){
	switch(N){
		case 0:
			$("#"+this.chartId).css("display","block");
			$("#"+this.extensionChartId).css("display","none");
			if(this.chartDataLine0==null){
				this.updateLine(showLoadMask);
			}else{
				this.showLine();
			}
			break;
		case 1:
			$("#"+this.chartId).css("display","block");
			$("#"+this.extensionChartId).css("display","none");
			if(this.chartDataLine1==null){
				this.updateLine(showLoadMask);
			}else{
				this.showLine();
			}
			break;
		case 2:
			$("#"+this.chartId).css("display","none");
			$("#"+this.extensionChartId).css("display","block");
			if(this.chartDataChina==null){
				this.updateChina(showLoadMask);
			}else{
				setTimeout(this.showChina.bind(this), 500);
			}
			break;
		case 3:
			$("#"+this.chartId).css("display","block");
			$("#"+this.extensionChartId).css("display","none");
			if(this.chartDataWorld==null){
				this.updateWorld(showLoadMask);
			}else{
				this.showWorld();
			}
			break;
	}
};
SceneBase.RightScreen.prototype.getSelectedChartIndex=function(){
	var index=0;
	var list=$("."+this.slideImgClass+" .SelectBG");
	for(var i=0;i<list.length;i++){
		var comp=list[i];
		if($(comp).css("display")!="none"){
			index=i;
			break;
		}
	}
	return index;
};
SceneBase.RightScreen.prototype.setSelectedChartIndex=function(index){
	var list=$("."+this.slideImgClass+" .SelectBG");
	for(var i=0;i<list.length;i++){
		var comp=list[i];
		if(i==index){
			$(comp).css("display","block");
		}else{
			$(comp).css("display","none");
		}
	}
};

SceneBase.RightScreen.prototype.showLine=function(){
	var lineIndex=this.getSelectedChartIndex();
	var data=this.chartDataLine0;
	if(data==null||data.length==0){
		return;
	}
	var valueKey="";
	switch(lineIndex){
		case 0:
			valueKey="中国";
			break;
		case 1:
			valueKey="国外";
			break;
	}
	var xAxis=[];
	var now=[];
	var last=[];
	var timeMap={};
	var lastTime="";
	
	for(var i=data.length-1;i>=0;i--){
		var record=data[i][valueKey];
		var value=0;
		var time="";
		var fullTime="";
		if(record==null){
			for(var country in data[i]){
				if(data[i][country]["time"]!=null){
					time=data[i][country]["time"];
					break;
				}
			}
		}else{
			value=record["total"];
			time=record["time"];
		}
		
		fullTime=time;
		time=time.substring(11,16);
		if(timeMap[time]==null){
			xAxis.push(time);
			last.push(value);
		}else{
			now.push(value);
			lastTime=fullTime;
		}
		timeMap[time]=true;
		
	}
	
	SUtils.clearGrid(this.userGrid);
	this.updateGridCol("line");
	for(var j=0;j<last.length;j++){
		this.userGrid.jqGrid('addRowData',j + 1, {
			time:xAxis[j],
			last:last[j],
			now:j<now.length?now[j]:""
		});
	}
	this.userGrid.find("tr").removeClass("oddGrayTableRow");
	this.userGrid.find("tr:odd").addClass("oddGrayTableRow");
	
	if(lastTime!=""&&lastTime!=null){
		$(".DR2_TIME").text(lastTime.substring(5, 16));
	}
	var option = {
			color:['#fced00','#00ff5a'],
		    title : {
		        show:false
		    },
		    tooltip : {
		        trigger: 'axis'
		    },
		    legend: {
		        data:['昨日','今日'],
		        textStyle :
        		{
		        	color:LSMScreen.CHARTCONFIG.xAxisLabelColor,
            		fontSize:LSMScreen.CHARTCONFIG.axisLabelSize
        		},
		    },
		    toolbox: {
		        show : false
		    },
		    calculable : false,
		    xAxis : [
		        {
		            type : 'category',
		            boundaryGap : false,
		            data : xAxis,
		            axisLabel:{
		            	textStyle:{
		            		color:LSMScreen.CHARTCONFIG.xAxisLabelColor,
		            		fontSize:LSMScreen.CHARTCONFIG.axisLabelSize
		            	}
		            },
		            axisLine:{
		            	lineStyle:{
			            	color:LSMScreen.CHARTCONFIG.yAxisColor
			            }
		            },
		            splitLine:{
		            	lineStyle:{
			            	color:LSMScreen.CHARTCONFIG.yAxisColor
			            }
		            }
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            axisLabel:{
		            	textStyle:{
		            		color:LSMScreen.CHARTCONFIG.xAxisLabelColor,
		            		fontSize:LSMScreen.CHARTCONFIG.axisLabelSize
		            	}
		            },
		            axisLine:{
		            	lineStyle:{
			            	color:LSMScreen.CHARTCONFIG.yAxisColor
			            }
		            },
		            splitLine:{
		            	lineStyle:{
			            	color:LSMScreen.CHARTCONFIG.yAxisColor
			            }
		            }
		        }
		    ],
		    series : [
		        {
		            name:'昨日',
		            type:'line',
		            data:last
		        },
		        {
		            name:'今日',
		            type:'line',
		            data:now
		        }
		    ]
		};
	if(this.echartCom!=null){
		this.echartCom.setOption(option,true);
	}


};

SceneBase.RightScreen.prototype.showChina=function(){
	if(this.BMapExt==null){
		var domMain=$("#"+this.extensionChartId)[0];
		var BMapExt=this.BMapExt = new BMapExtension(domMain, BMap, this.ec, require('zrender'));
		var map = this.BMapExt.getMap();
		var container = BMapExt.getEchartsContainer();
		var point = new BMap.Point(109.850232,33.295157);
		map.centerAndZoom(point, 6);
		map.disableScrollWheelZoom();
		map.disableDoubleClickZoom();
		this.myChart = BMapExt.initECharts(container, curTheme);
		map.addEventListener("zoomend", function(type){
			map.centerAndZoom(point, 6);
		});
	}
	
	var lineData=[];
	var pointData=[];
	
	var data=this.chartDataChina;
	var list=[];
	var max=1;
	var time="";
	for(var key in data){
		if(key=="上海") continue;
		list.push({key:key,value:data[key].total});
		time=data[key].time;
		max=Math.max(data[key].total,max);
	}
	list.sort(function(a,b){return b.value-a.value;});//按value 降序
	SUtils.clearGrid(this.userGrid);
	this.updateGridCol("china");
	for(var i=0;i<list.length;i++){
		var record=list[i];
		var num=record.value;
		this.userGrid.jqGrid('addRowData', i + 1, record);
//		if(i<10){
			lineData.push([{name:record.key,value:num},{name:'上海'}]);
//		}
		pointData.push({name:record.key,value:num});
	}
	
	this.userGrid.find("tr").removeClass("oddGrayTableRow");
	this.userGrid.find("tr:odd").addClass("oddGrayTableRow");
	
	if(time!=""&&time!=null){
		$(".DR2_TIME").text(time.substring(5, 16));
	}
	
	var option = {
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
        		fontSize:LSMScreen.CHARTCONFIG.axisLabelSize
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
        		fontSize:LSMScreen.CHARTCONFIG.axisLabelSize
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
					            		fontSize:LSMScreen.CHARTCONFIG.axisLabelSize
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

SceneBase.RightScreen.prototype.showWorld=function(){
	var data=this.chartDataWorld;
	var mapData=[];
	var max=0;
	var time="";
	for(var key in data){
		var record=data[key];
		if(record.time!=null&&record.time!=""){
			time=record.time;
		}
		mapData.push({key:key,name:key,value:record.total});
		max=Math.max(max,record.total);
	}
	mapData.sort(function(a,b){return b.value-a.value;});//按value 降序
	
	SUtils.clearGrid(this.userGrid);
	this.updateGridCol("world");
	for(var i=0;i<mapData.length;i++){
		var record=mapData[i];
		this.userGrid.jqGrid('addRowData', i + 1, record);
	}
	this.userGrid.find("tr").removeClass("oddGrayTableRow");
	this.userGrid.find("tr:odd").addClass("oddGrayTableRow");
	if(time!=""&&time!=null){
		$(".DR2_TIME").text(time.substring(5, 16));
	}
	var option = {
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
		        text:['High','Low'],
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
		            nameMap : {
		                'Afghanistan':'阿富汗',
		                'Angola':'安哥拉',
		                'Albania':'阿尔巴尼亚',
		                'United Arab Emirates':'阿联酋',
		                'Argentina':'阿根廷',
		                'Armenia':'亚美尼亚',
		                'French Southern and Antarctic Lands':'法属南半球和南极领地',
		                'Australia':'澳大利亚',
		                'Austria':'奥地利',
		                'Azerbaijan':'阿塞拜疆',
		                'Burundi':'布隆迪',
		                'Belgium':'比利时',
		                'Benin':'贝宁',
		                'Burkina Faso':'布基纳法索',
		                'Bangladesh':'孟加拉国',
		                'Bulgaria':'保加利亚',
		                'The Bahamas':'巴哈马',
		                'Bosnia and Herzegovina':'波斯尼亚和黑塞哥维那',
		                'Belarus':'白俄罗斯',
		                'Belize':'伯利兹',
		                'Bermuda':'百慕大',
		                'Bolivia':'玻利维亚',
		                'Brazil':'巴西',
		                'Brunei':'文莱',
		                'Bhutan':'不丹',
		                'Botswana':'博茨瓦纳',
		                'Central African Republic':'中非共和国',
		                'Canada':'加拿大',
		                'Switzerland':'瑞士',
		                'Chile':'智利',
		                'China':'中国',
		                'Ivory Coast':'象牙海岸',
		                'Cameroon':'喀麦隆',
		                'Democratic Republic of the Congo':'刚果民主共和国',
		                'Republic of the Congo':'刚果共和国',
		                'Colombia':'哥伦比亚',
		                'Costa Rica':'哥斯达黎加',
		                'Cuba':'古巴',
		                'Northern Cyprus':'北塞浦路斯',
		                'Cyprus':'塞浦路斯',
		                'Czech Republic':'捷克共和国',
		                'Germany':'德国',
		                'Djibouti':'吉布提',
		                'Denmark':'丹麦',
		                'Dominican Republic':'多明尼加共和国',
		                'Algeria':'阿尔及利亚',
		                'Ecuador':'厄瓜多尔',
		                'Egypt':'埃及',
		                'Eritrea':'厄立特里亚',
		                'Spain':'西班牙',
		                'Estonia':'爱沙尼亚',
		                'Ethiopia':'埃塞俄比亚',
		                'Finland':'芬兰',
		                'Fiji':'斐',
		                'Falkland Islands':'福克兰群岛',
		                'France':'法国',
		                'Gabon':'加蓬',
		                'United Kingdom':'英国',
		                'Georgia':'格鲁吉亚',
		                'Ghana':'加纳',
		                'Guinea':'几内亚',
		                'Gambia':'冈比亚',
		                'Guinea Bissau':'几内亚比绍',
		                'Equatorial Guinea':'赤道几内亚',
		                'Greece':'希腊',
		                'Greenland':'格陵兰',
		                'Guatemala':'危地马拉',
		                'French Guiana':'法属圭亚那',
		                'Guyana':'圭亚那',
		                'Honduras':'洪都拉斯',
		                'Croatia':'克罗地亚',
		                'Haiti':'海地',
		                'Hungary':'匈牙利',
		                'Indonesia':'印尼',
		                'India':'印度',
		                'Ireland':'爱尔兰',
		                'Iran':'伊朗',
		                'Iraq':'伊拉克',
		                'Iceland':'冰岛',
		                'Israel':'以色列',
		                'Italy':'意大利',
		                'Jamaica':'牙买加',
		                'Jordan':'约旦',
		                'Japan':'日本',
		                'Kazakhstan':'哈萨克斯坦',
		                'Kenya':'肯尼亚',
		                'Kyrgyzstan':'吉尔吉斯斯坦',
		                'Cambodia':'柬埔寨',
		                'South Korea':'韩国',
		                'Kosovo':'科索沃',
		                'Kuwait':'科威特',
		                'Laos':'老挝',
		                'Lebanon':'黎巴嫩',
		                'Liberia':'利比里亚',
		                'Libya':'利比亚',
		                'Sri Lanka':'斯里兰卡',
		                'Lesotho':'莱索托',
		                'Lithuania':'立陶宛',
		                'Luxembourg':'卢森堡',
		                'Latvia':'拉脱维亚',
		                'Morocco':'摩洛哥',
		                'Moldova':'摩尔多瓦',
		                'Madagascar':'马达加斯加',
		                'Mexico':'墨西哥',
		                'Macedonia':'马其顿',
		                'Mali':'马里',
		                'Myanmar':'缅甸',
		                'Montenegro':'黑山',
		                'Mongolia':'蒙古',
		                'Mozambique':'莫桑比克',
		                'Mauritania':'毛里塔尼亚',
		                'Malawi':'马拉维',
		                'Malaysia':'马来西亚',
		                'Namibia':'纳米比亚',
		                'New Caledonia':'新喀里多尼亚',
		                'Niger':'尼日尔',
		                'Nigeria':'尼日利亚',
		                'Nicaragua':'尼加拉瓜',
		                'Netherlands':'荷兰',
		                'Norway':'挪威',
		                'Nepal':'尼泊尔',
		                'New Zealand':'新西兰',
		                'Oman':'阿曼',
		                'Pakistan':'巴基斯坦',
		                'Panama':'巴拿马',
		                'Peru':'秘鲁',
		                'Philippines':'菲律宾',
		                'Papua New Guinea':'巴布亚新几内亚',
		                'Poland':'波兰',
		                'Puerto Rico':'波多黎各',
		                'North Korea':'北朝鲜',
		                'Portugal':'葡萄牙',
		                'Paraguay':'巴拉圭',
		                'Qatar':'卡塔尔',
		                'Romania':'罗马尼亚',
		                'Russia':'俄罗斯',
		                'Rwanda':'卢旺达',
		                'Western Sahara':'西撒哈拉',
		                'Saudi Arabia':'沙特阿拉伯',
		                'Sudan':'苏丹',
		                'South Sudan':'南苏丹',
		                'Senegal':'塞内加尔',
		                'Solomon Islands':'所罗门群岛',
		                'Sierra Leone':'塞拉利昂',
		                'El Salvador':'萨尔瓦多',
		                'Somaliland':'索马里兰',
		                'Somalia':'索马里',
		                'Republic of Serbia':'塞尔维亚共和国',
		                'Suriname':'苏里南',
		                'Slovakia':'斯洛伐克',
		                'Slovenia':'斯洛文尼亚',
		                'Sweden':'瑞典',
		                'Swaziland':'斯威士兰',
		                'Syria':'叙利亚',
		                'Chad':'乍得',
		                'Togo':'多哥',
		                'Thailand':'泰国',
		                'Tajikistan':'塔吉克斯坦',
		                'Turkmenistan':'土库曼斯坦',
		                'East Timor':'东帝汶',
		                'Trinidad and Tobago':'特里尼达和多巴哥',
		                'Tunisia':'突尼斯',
		                'Turkey':'土耳其',
		                'United Republic of Tanzania':'坦桑尼亚联合共和国',
		                'Uganda':'乌干达',
		                'Ukraine':'乌克兰',
		                'Uruguay':'乌拉圭',
		                'United States of America':'美国',
		                'Uzbekistan':'乌兹别克斯坦',
		                'Venezuela':'委内瑞拉',
		                'Vietnam':'越南',
		                'Vanuatu':'瓦努阿图',
		                'West Bank':'西岸',
		                'Yemen':'也门',
		                'South Africa':'南非',
		                'Zambia':'赞比亚',
		                'Zimbabwe':'津巴布韦'
		            }
		        }
		    ]
		};
	if(this.echartCom!=null){
		this.echartCom.setOption(option,true);
	}
};

SceneBase.RightScreen.prototype.failHandler=function(evt){
	
};
///////////////////////////////////////新版内容

/**
 * 迪士尼大屏右侧分布图表大屏
 * @class SceneBase.RightScreen
 * @extends LSMScreen.ScreenBase
 * @classdesc 继承ScreenBase 绘制大屏组件,控制定时刷新各个组件
 */
SceneBase.NewVersionRight=function(_hotspot)
{
	this.hotspot=_hotspot;
	this.initialize.apply(this, arguments);
};
/** 从ScreenBase继承*/
SceneBase.NewVersionRight.prototype=Object.create(LSMScreen.ScreenBase.prototype);
SceneBase.NewVersionRight.prototype.constructor=SceneBase.NewVersionRight;
SceneBase.NewVersionRight.prototype.baseHeight=370;
SceneBase.NewVersionRight.prototype.hotspot="";
SceneBase.NewVersionRight.prototype.allFlow=0;
SceneBase.NewVersionRight.prototype.disneyFlow=0;

SceneBase.NewVersionRight.prototype.allAppData=[];
SceneBase.NewVersionRight.prototype.disneyAppData=[];

SceneBase.NewVersionRight.prototype.majorDataMap={};


SceneBase.NewVersionRight.prototype.initialize=function(){
	$(".majorRadio").on('click',this.majorChange.bind(this));
	
	var table=document.createElement("table");
	var table2=document.createElement("table");
	var table3=document.createElement("table");
	$(table).attr("id",Math.uuid());
	$(table2).attr("id",Math.uuid());
	$(table3).attr("id",Math.uuid());
	$("#topContent1Grid").append(table);
	$("#topContent3Grid").append(table2);
	$("#frameBottomLeftContent").append(table3);
	/**
	 * jqgird对象
	 * @private
	 * @type {Object} 
	 */
	this.grid=$(table).jqGrid({
        datatype : "json",
		colNames : [ '业务','业务', '流量占比(%)', '全网对比(%)'],
        colModel : [ 
                      {name : 'element',index : 'element',width : 50}, 
                     {name : 'element',index : 'element',width : 150}, 
                     {name : 'disneyPercent',index : 'disneyPercent',width : 156}, 
                     {name : 'allPercent',index : 'allPercent',width : 156}
                   ],
        loadui:'disable',
        afterInsertRow:this.rowHandler.bind(this),
        height:this.baseHeight
	});
	this.grid.closest('.ui-jqgrid-view').find('div.ui-jqgrid-hdiv').hide(); //隐藏表头方法
	
	this.grid2=$(table2).jqGrid({
        datatype : "json",
		colNames : [ '业务','业务', '流量占比(%)', '全网对比(%)'],
        colModel : [ 
                     {name : 'element',index : 'element',width : 50}, 
                     {name : 'element',index : 'element',width : 150}, 
                     {name : 'disneyPercent',index : 'disneyPercent',width : 156}, 
                     {name : 'allPercent',index : 'allPercent',width : 156}
                   ],
        loadui:'disable',
        afterInsertRow:this.rowHandler2.bind(this),
        height:this.baseHeight
	});
	this.grid2.closest('.ui-jqgrid-view').find('div.ui-jqgrid-hdiv').hide(); //隐藏表头方法
	
	this.grid3=$(table3).jqGrid({
        datatype : "json",
		colNames : [ '', '用户数(人)','流量(MB)','下载速率(Kbps)', 'TCP成功率(%)', '业务时延(ms)', '上行流量占比(%)','大类','小类'],
        colModel : [ 
                     {name : 'element',index : 'element',width : 50},
                     {name : '4G用户数',index : '4G用户数',width : 176},
                     {name : '4G流量',index : '4G流量',width : 176},
                     {name : '4G下行速率500k',index : '4G下行速率500k',width : 176}, 
                     {name : '4GTCP成功率',index : '4GTCP成功率',width : 176}, 
                     {name : '4GTCP时延',index : '4GTCP时延',width : 176}, 
                     {name : '4G上行流量比',index : '4G上行流量比',width : 176}, 
                     {name : 'major',index : 'major',width : 176,hidden:true}, 
                     {name : 'minor',index : 'minor',width : 176,hidden:true}
                   ],
        afterInsertRow:this.rowHandler3.bind(this),
        loadui:'disable',
        height:375
	});
	
	require(['echarts','echarts/chart/pie'],this.initEChart.bind(this));
	
	/**
	 * 终端排名(玫瑰图)
	 * @private
	 * @type {P2PScreen.TerminalRoseChart} 
	 */
	this.chartTerminalRank=new SceneBase.TerminalBarChartAndGrid(
			$("#frameBottomRightContent")[0],
			{title:"终端",contentHeight:this.baseChartHeight0},
			function(isReady){
				var ecConfig = require('echarts/config');
				this.chartTerminalRank.echart.on(ecConfig.EVENT.CLICK,this.terminalRankChartClickHandler.bind(this));
				$("#terminalReturn").on('click',this.resetTerminalQuality.bind(this));
				this.update();
			}.bind(this)
	);
	this.chartTerminalRank.showLegend=false;
	this.chartTerminalRank.gobackPasser=this.resetTerminalQuality.bind(this);
	this.chartTerminalRank.hotspot=this.hotspot;
	this.initMembers();
	this.startInterval();
};
SceneBase.NewVersionRight.prototype.rowHandler=function(rowid,rowdata){
	var grid=this.grid;
	var tr=grid.find("tbody").find("tr")[rowid];
	var tds=$(tr).find("td");
	var iconPath=BASEPATH+"/static/styles/local-lsm/app/"+SUtils.getAppIconPath(rowdata.element);
	var plus="";
	if(rowdata["allPercent"]>0){
		plus="+";
	}
	$(tds[0]).html('<img src="'+iconPath+'"></img>');
	
	$(tds[2]).text(rowdata["disneyPercent"]+"%");
	$(tds[3]).text(plus+rowdata["allPercent"]+"PP");
};
SceneBase.NewVersionRight.prototype.rowHandler2=function(rowid,rowdata){
	var grid=this.grid2;
	var tr=grid.find("tbody").find("tr")[rowid];
	var tds=$(tr).find("td");
	var icon=SUtils.getAppIconPath(rowdata.element);
	var iconPath=BASEPATH+"/static/styles/local-lsm/app/"+icon;
	var plus="";
	if(rowdata["allPercent"]>0){
		plus="+";
	}
	$(tds[0]).html('<img src="'+iconPath+'"></img>');
	
	$(tds[2]).text(rowdata["disneyPercent"]+"%");
	$(tds[3]).text(plus+rowdata["allPercent"]+"PP");
	
};
SceneBase.NewVersionRight.prototype.rowHandler3=function(rowid,rowdata){
	var grid=this.grid3;
	var tr=grid.find("tbody").find("tr")[rowid];
	var tds=$(tr).find("td");
	var iconPath=BASEPATH+"/static/styles/local-lsm/app/"+SUtils.getAppIconPath(rowdata.element);
	if(rowdata.major=="视频"){
		$(tds[0]).html('<img style="cursor:pointer;" src="'+iconPath+'"></img>');
		$(tds[0]).attr("app",rowdata.element);
		$(tds[0]).on('click',this.openItpIframe.bind(this));
	}else{
		$(tds[0]).html('<img src="'+iconPath+'"></img>');
	}
	
	
	$(tds[1]).text((rowdata["4G用户数"]));
	$(tds[1]).attr("title",(rowdata["4G用户数"]));
	$(tds[2]).text((rowdata["4G流量"]/LSMConsts.byteDivider).toFixed(2));
	$(tds[2]).attr("title",(rowdata["4G流量"]/LSMConsts.byteDivider).toFixed(2));
	
	$(tds[3]).text((rowdata["4G下行速率500k"]).toFixed(2));
	$(tds[3]).attr("title",(rowdata["4G下行速率500k"]).toFixed(2));
	$(tds[4]).text((rowdata["4GTCP成功率"]*100).toFixed(2));
	$(tds[4]).attr("title",(rowdata["4GTCP成功率"]).toFixed(2));
	$(tds[5]).text((rowdata["4GTCP时延"]).toFixed(0));
	$(tds[5]).attr("title",(rowdata["4GTCP时延"]).toFixed(0));
	$(tds[6]).text((rowdata["4G上行流量比"]*100).toFixed(2));
	$(tds[6]).attr("title",(rowdata["4G上行流量比"]).toFixed(2));
	
	
};
SceneBase.NewVersionRight.prototype.openItpIframe=function (evt){
	var app=$(evt.currentTarget).attr("app");
	var url=BASEPATH+"/pages/local-lsm/shvideoe2e/itp.jsp?minor="+encodeURIComponent(app);
	window.open(url,"_blank");
//	if(this.drillAppFrame==null){
//		var app=$(evt.currentTarget).attr("app");
//		var iframe=document.createElement("iframe");
//		var frameWidth=$(".Disney_R").width();
//		var frameHeight=$(".Disney_R").height();
//		$(iframe).width(frameWidth);
//		$(iframe).height(frameHeight);
//		$(iframe).attr("frameborder","0");
//		$(iframe).attr("src",BASEPATH+"/pages/local-lsm/shvideoe2e/itp.jsp?minor="+encodeURIComponent(app));
//		$(iframe).css("position","absolute");
//		$("body").append(iframe);
//		this.drillAppFrame=iframe;
//	}
};
SceneBase.NewVersionRight.prototype.closeDrillApp=function()
{
	if(this.drillAppFrame!=null){
		$(this.drillAppFrame).remove();
		this.drillAppFrame=null;
	}
};
SceneBase.NewVersionRight.prototype.initEChart=function (ec){
	this.ec=ec;
	/** 初始化echart对象 */
	this.echart= ec.init($("#topContent2Chart")[0]);
};
SceneBase.NewVersionRight.prototype.update=function (){
	this.updateTerminalRankChart(true);
	
	var dm=LSMScreen.DataManager.getInstance();
	//迪士尼流量
	dm.getBytesDataByHotspot({
		hotspot:this.hotspot
	},this.bytesDataHandler.bind(this),this.failHandler.bind(this));
};

SceneBase.NewVersionRight.prototype.updateHotAppQuality=function(major){
	var major=this.getMajor();
	var dm=LSMScreen.DataManager.getInstance();
	dm.getAppRank({
		num:-1,
		majors:major=="全部"?"":"&major="+major
	},this.hotAppQualityHandler.bind(this),this.failHandler.bind(this));
};
SceneBase.NewVersionRight.prototype.bytesDataHandler=function(result){
	this.disneyFlow=result[this.hotspot]["4G流量"];
	
	var dm=LSMScreen.DataManager.getInstance();
	//全网流量
	dm.getBytesRecord({},this.allBytesDataHandler.bind(this),this.failHandler.bind(this));
	
	//大类流量比环形图
	dm.getMajorRankByHotspot({
		hotspot:this.hotspot,num:100,order:"desc"
	},this.majorRankHandler.bind(this),this.failHandler.bind(this));
};
SceneBase.NewVersionRight.prototype.allBytesDataHandler=function(result){
	this.allFlow=result["4G流量"];
	
	var dm=LSMScreen.DataManager.getInstance();
	dm.getAppRank({
		hotspot:this.hotspot,num:-1
	},this.disneyAppRankHandler.bind(this),this.failHandler.bind(this));
};

SceneBase.NewVersionRight.prototype.disneyAppRankHandler=function(result){
	this.disneyAppData=result;
	var dm=LSMScreen.DataManager.getInstance();
	dm.getAppRank({
		num:-1
	},this.allAppRankHandler.bind(this),this.failHandler.bind(this));
	
	//热点业务质量
	this.updateHotAppQuality();
	
};
SceneBase.NewVersionRight.prototype.hotAppQualityHandler=function(result){
	$(".majorCtrl").css("display","block");
	this.grid3.clearGridData();
	
	var kpiKey="4G流量";
	var disneyMap={};
	var allMap={};
	var list=[];
	var i=0;
	var key="";
	var topList=[];
	var maxRow=999;
	var allData=result;
	var major=this.getMajor();
	var sortKey="allPercent";
	if(major!="全部"){
		sortKey="4G流量";
	}
	
	for(i=0;i<allData.length;i++){
		allMap[allData[i].element]=allData[i];
	}
	for(i=0;i<this.disneyAppData.length;i++){
		disneyMap[this.disneyAppData[i].element]=this.disneyAppData[i];
	}
	for(key in allMap){
		var disneyRecord=disneyMap[key];
		var allRecord=allMap[key];
		disneyRecord.disneyPercent=(disneyRecord[kpiKey]/this.disneyFlow*100).toFixed(2);
		disneyRecord.allPercent=(disneyRecord[kpiKey]/this.disneyFlow*100-allRecord[kpiKey]/this.allFlow*100).toFixed(2);
		disneyRecord.senseValue=((disneyRecord["4GHTTP成功率"]*100)*(disneyRecord["4GHTTP成功率"]*100)/100-disneyRecord["4GHTTP时延"]/100-disneyRecord["4GTCP时延"]/100).toFixed(2);
		list.push(disneyRecord);
	}
	
	list.sort(function(a,b){return b[sortKey]-a[sortKey];});//按allPercent 降序
	
	for(i=0;i<maxRow&&i<list.length;i++){
		topList.push(list[i]);
	}
	
	this.grid3[0].addJSONData(topList);
	this.updateRowClass(this.grid3);
};
SceneBase.NewVersionRight.prototype.allAppRankHandler=function(result){
	this.allAppData=result;
	
	this.grid.clearGridData();
	this.grid2.clearGridData();
	
	
	var kpiKey="4G流量";
	var disneyMap={};
	var allMap={};
	var list=[];
	var i=0;
	var key="";
	var topList=[];
	var bottomList=[];
	var maxRow=6;
	var lastTime="";
	for(i=0;i<this.allAppData.length;i++){
		allMap[this.allAppData[i].element]=this.allAppData[i];
	}
	for(i=0;i<this.disneyAppData.length;i++){
		disneyMap[this.disneyAppData[i].element]=this.disneyAppData[i];
	}
	for(key in disneyMap){
		var disneyRecord=disneyMap[key];
		var allRecord=allMap[key];
		lastTime=disneyRecord.time;
		disneyRecord.disneyPercent=(disneyRecord[kpiKey]/this.disneyFlow*100).toFixed(2);
		disneyRecord.allPercent=parseFloat((disneyRecord[kpiKey]/this.disneyFlow*100-allRecord[kpiKey]/this.allFlow*100).toFixed(2));
		disneyRecord.senseValue=((disneyRecord["4GHTTP成功率"]*100)*(disneyRecord["4GHTTP成功率"]*100)/100-disneyRecord["4GHTTP时延"]/100-disneyRecord["4GTCP时延"]/100).toFixed(2);
		list.push(disneyRecord);
	}
	if(lastTime!=null&&lastTime!=""){
//		$("#rightTime").text(lastTime.substring(11, 16));
		$("#rightTime").text(SUtils.getHourAndMinuteFive(lastTime,true));//强制向后推五分钟
	}
	list.sort(function(a,b){return b["总流量"]-a["总流量"];});
	list=list.slice(0, list.length/2);
	list.sort(function(a,b){return b.allPercent-a.allPercent;});//按allPercent 降序
	
	for(i=0;i<maxRow&&i<list.length;i++){
		topList.push(list[i]);
	}
	for(i=list.length-1;i>=list.length-maxRow&&i>=0;i--){
		bottomList.push(list[i]);
	}
	
	
	this.grid[0].addJSONData(topList);
	this.grid2[0].addJSONData(bottomList);
	
	
	this.updateRowClass(this.grid);
	this.updateRowClass(this.grid2);
	
};
SceneBase.NewVersionRight.prototype.majorRankHandler=function(chartDataArr){
	
	var defaultMajors={
		"即时通信":true,
		"浏览下载":true,
		"视频":true,
		"应用商店":true
	};
	//有色圆环样式
	var dataStyle = {
	    normal: {
	        label: {
	        	show:true,
	        	position:"outter",
	        	textStyle:{fontSize:LSMScreen.CHARTCONFIG.labelSize},
	        	formatter:"{b}:\n{c}%"
	        },
	        labelLine: {show:true,length:50}
	    }
	};
	var seriesName="4G流量占比";
	var dataArr=[];
	var legends=[];
	var otherValue=0;
	var otherName="其他";
	chartDataArr.sort(function(a,b){return b["4G流量"]-a["4G流量"];});//按value 降序
	var count=0;
	for(var i=0;i<chartDataArr.length;i++){
		var record=chartDataArr[i];
		var cnts=(record["4G流量"]/this.disneyFlow*100).toFixed(1);
		var pointName=record.element;
		this.majorDataMap[pointName]=cnts;
		if(i<6){
			legends.push(pointName);
			dataArr.push({
	            value:cnts,
	            name:pointName=="其他业务"?"各类APP":pointName
	        });
		}else{
			otherValue+=parseFloat(cnts);
		}
		count++;
	}
	legends.push(otherName);
	dataArr.push({
        value:otherValue.toFixed(1),
        name:otherName
    });
	dataArr.sort(function(a,b){return b["value"]-a["value"];});//按value 降序
	var series=[{
            name:seriesName,
            type:'pie',
            clockWise:false,
            radius : ['15%', '45%'],
            itemStyle : dataStyle,
            data:dataArr
        }];
	var option=LSMScreen.DataChartPie.prototype.getOptionByData(legends, series,{show:false});
	this.echart.setOption(option,true);
	this.echart.refresh();
};

SceneBase.NewVersionRight.prototype.updateRowClass=function(gridJQ){
	var trs=gridJQ.find("tr");
	var trsOdd=gridJQ.find("tr:odd");
	
	trs.removeClass("oddGrayTableRow");
	trsOdd.addClass("oddGrayTableRow");
	trs.find("td:eq(0)").addClass("plainText");
	trs.find("td:gt(0)").addClass("colorText");
	
};


SceneBase.NewVersionRight.prototype.terminalRankChartClickHandler=function(param){
	if (param.type == 'click'&&param.seriesName.indexOf("  ")!=-1) {
		var brand=param.name;
		this.updateTerminalRankChart(true, {type:"model",terminal_brand:brand});
		$("#terminalReturn").css("display","inline-block");
	}
};
SceneBase.NewVersionRight.prototype.resetTerminalQuality=function(){
	this.updateTerminalRankChart(true);
	$("#terminalReturn").css("display","none");
};
SceneBase.NewVersionRight.prototype.updateTerminalRankChart=function(showLoadMask,config){
	if(this.chartTerminalRank){
		var queryConfig={
			topN:6,
			type:"brand",
			app_type_name:this.specificMajor
		};
		if(config!=null){
			for(var key in config){
				queryConfig[key]=config[key];
			}
		}
		this.chartTerminalRank.update(false,queryConfig);
	}else{
		SUtils.log("终端排名(玫瑰图) 未初始化");
	}
};

SceneBase.NewVersionRight.prototype.getMajor=function(){
	var major=$(".majorCtrl .customRadioSelected").attr("name");
	return major;
};
SceneBase.NewVersionRight.prototype.majorChange=function(evt){
	var type=$(evt.currentTarget).attr("name");
	$(".majorRadio").removeClass("customRadioSelected");
	if(type=="全部"){
		$(".majorRadio:eq(0)").addClass("customRadioSelected");
	}else if(type=="即时通信"){
		$(".majorRadio:eq(1)").addClass("customRadioSelected");
	}else if(type=="浏览下载"){
		$(".majorRadio:eq(2)").addClass("customRadioSelected");
	}else if(type=="视频"){
		$(".majorRadio:eq(3)").addClass("customRadioSelected");
	}else if(type=="应用商店"){
		$(".majorRadio:eq(4)").addClass("customRadioSelected");
	}
	this.updateHotAppQuality();
};


SceneBase.NewVersionRight.prototype.failHandler=function(){
};
//////////////////////////

/**
 * 终端排名新增两个表格，继承自P2PScreen.TerminalBarChart
 * @class SceneBase.TerminalBarChartAndGrid
 * @extends P2PScreen.TerminalBarChart
 * @classdesc 
 */
SceneBase.TerminalBarChartAndGrid=function (){
	this.initialize.apply(this, arguments);
};
/** 从DataChartBase继承*/
SceneBase.TerminalBarChartAndGrid.prototype=Object.create(P2PScreen.TerminalBarChart.prototype);
SceneBase.TerminalBarChartAndGrid.prototype.constructor=SceneBase.TerminalBarChartAndGrid;

SceneBase.TerminalBarChartAndGrid.prototype.randomId=null;
SceneBase.TerminalBarChartAndGrid.prototype.interprovinceGrid=null;
SceneBase.TerminalBarChartAndGrid.prototype.internationalGrid=null;

SceneBase.TerminalBarChartAndGrid.prototype.hotspot="";
SceneBase.TerminalBarChartAndGrid.prototype.countryTotal=0;
SceneBase.TerminalBarChartAndGrid.prototype.provinceTotal=0;

SceneBase.TerminalBarChartAndGrid.prototype.initialize=function (){
	Object.create(SceneBase.TerminalBarChartAndGrid.prototype.__proto__).initialize.apply(this, arguments);
	this.randomId=Math.uuid();
	
	var baseCss="position:absolute;padding:20px 15px 0px 15px;display:none;width:100%;height:100%;";
	var titleCss="font-size:28px;color:#ffffff;font-weight:bold;";
	
	var div0=document.createElement("div");
	var div1=document.createElement("div");
	
	$(div0).attr("id",this.randomId+"_div0");
	$(div1).attr("id",this.randomId+"_div1");
	$(div0).attr("style",baseCss);
	$(div1).attr("style",baseCss);
	
	var title0=document.createElement("div");
	var title1=document.createElement("div");
	
	$(title0).attr("id",this.randomId+"_title0");
	$(title1).attr("id",this.randomId+"_title1");
	$(title0).attr("style",titleCss);
	$(title1).attr("style",titleCss);
	
	var dom0=document.createElement("table");
	var dom1=document.createElement("table");
	
	
	$(dom0).attr("id",this.randomId+"_table0");
	$(dom1).attr("id",this.randomId+"_table1");
	
	$(div0).append(title0);
	$(div1).append(title1);
	$(div0).append(dom0);
	$(div1).append(dom1);
	
	$(this.parentDom).append(div0);
	$(this.parentDom).append(div1);
	
	var btnCss="color:white;cursor:pointer;font-size:16px;font-weight:bold;margin-left:10px;";
	
	var controlBar=document.createElement("div");
	$(controlBar).attr("style","position:absolute;top:0px;left:5px;");
	
	var btnTerminal=document.createElement("span");
	$(btnTerminal).text("终端");
	$(btnTerminal).attr("class",this.randomId);
	$(btnTerminal).attr("style",btnCss);
	
	
	var btnPro=document.createElement("span");
	$(btnPro).text("省际");
	$(btnPro).attr("class",this.randomId);
	$(btnPro).attr("style",btnCss);
	$(btnPro).css("text-decoration","underline");
	
	var btnInter=document.createElement("span");
	$(btnInter).text("国际");
	$(btnInter).attr("class",this.randomId);
	$(btnInter).attr("style",btnCss);
	
	
	$(controlBar).append(btnPro);
	$(controlBar).append(btnInter);
	$(controlBar).append(btnTerminal);
	
	
	$(this.parentDom).append(controlBar);
	
	$("."+this.randomId).on('click',this.ctrlClicked.bind(this));
	
	var gridHeight=$(this.parentDom).height()-150;
	var gridWidth=$(this.parentDom).width()-30;
	this.interprovinceGrid=$(dom0).jqGrid({
		datatype : function(){},
		colNames : [ 'TOP','省份', '省漫', '占比'],
        colModel : [ 
                    {name : 'row_',index : 'row_',width:110}, 
                    {name : 'pro_name',index : 'pro_name'}, 
                    {name : 'user_cnt',index : 'user_cnt'}, 
                    {name : 'user_cnt_rate',index : 'user_cnt_rate',formatter:function(cellvalue,config,rowData){
                     cellvalue=rowData.user_cnt/rowData.user_cnt_all*100;
                   	 if(cellvalue==100||cellvalue==0){
                   		 return (cellvalue*1).toFixed(0);
                   	 }else{
                   		 return (cellvalue*1).toFixed(1);
                   	 }
                    }}
                  ],
        loadui:'disable',
        width:gridWidth,
        height:gridHeight,
        forceFit : true,
		shrinkToFit: true
	});
	
	this.internationalGrid=$(dom1).jqGrid({
		datatype : function(){},
		colNames : [ 'TOP','国家', '国漫', '占比'],
        colModel : [ 
                     {name : 'row_',index : 'row_',width:110}, 
                     {name : 'intl_name',index : 'intl_name'}, 
                     {name : 'user_cnt',index : 'user_cnt'}, 
                     {name : 'user_cnt_rate',index : 'user_cnt_rate',formatter:function(cellvalue,config,rowData){
                    	 cellvalue=rowData.user_cnt/rowData.user_cnt_all*100;
                    	 if(cellvalue==100||cellvalue==0){
                    		 return (cellvalue*1).toFixed(0);
                    	 }else{
                    		 return (cellvalue*1).toFixed(1);
                    	 }
                     }}
                   ],
        loadui:'disable',
        width:gridWidth,
        height:gridHeight,
        forceFit : true,
		shrinkToFit: true
	});
	
	$(this.contentDom).css("display","none");
	$("#"+this.randomId+"_div1").css("display","none");
	$("#"+this.randomId+"_div0").css("display","block");
	
//	$("#gbox_"+this.randomId+"_table0").find("th").css("font-size",16);
//	$("#gbox_"+this.randomId+"_table1").find("th").css("font-size",16);
};

SceneBase.TerminalBarChartAndGrid.prototype.ctrlClicked=function (e){
	var txt=$(e.currentTarget).text();
	$("."+this.randomId).css("text-decoration","none");
	$(e.currentTarget).css("text-decoration","underline");
	if(txt=="终端"){
		$("#"+this.randomId+"_div0").css("display","none");
		$("#"+this.randomId+"_div1").css("display","none");
		$(this.contentDom).css("display","block");
		if(this.echart!=null){
			this.echart.resize();
		}
	}else if(txt=="省际"){
		$(this.contentDom).css("display","none");
		$("#"+this.randomId+"_div1").css("display","none");
		$("#"+this.randomId+"_div0").css("display","block");
	}else if(txt=="国际"){
		$(this.contentDom).css("display","none");
		$("#"+this.randomId+"_div0").css("display","none");
		$("#"+this.randomId+"_div1").css("display","block");
	}
};

SceneBase.TerminalBarChartAndGrid.prototype.query=function(queryConfig){
	Object.create(SceneBase.TerminalBarChartAndGrid.prototype.__proto__).query.apply(this, arguments);
	
	var dm=LSMScreen.DataManager.getInstance();
	dm.getRightScreenRoamDataIntl({hot_name:this.hotspot},this.contryRoamDataHandler.bind(this));
	dm.getRightScreenRoamDataPro({hot_name:this.hotspot},this.provinceRoamDataHandler.bind(this));
};
SceneBase.TerminalBarChartAndGrid.prototype.totalRoamDataHandler=function(result){
	if(result.success){
		var arr=result.data;
		for(var i=0;i<arr.length;i++){
			var record=arr[i];
			if(record.FLAG=="intl"){
				this.countryTotal=record.USER_CNT;
				$("#"+this.randomId+"_title1").text("国际漫游总数："+this.countryTotal);
			}else if(record.FLAG=="pro"){
				this.provinceTotal=record.USER_CNT;
				$("#"+this.randomId+"_title0").text("省际漫游总数："+this.provinceTotal);
			}
		}
		
		
	}
	
};
SceneBase.TerminalBarChartAndGrid.prototype.contryRoamDataHandler=function(result){
	var arr=result.data.datas;
	this.internationalGrid[0].addJSONData(arr);
	var total=0;
	for(var i=0;i<arr.length;i++){
		total+=arr[i].user_cnt*1;
	}
	this.countryTotal=total;
	$("#"+this.randomId+"_title1").text("国际漫游总数："+this.countryTotal);
};
SceneBase.TerminalBarChartAndGrid.prototype.provinceRoamDataHandler=function(result){
	var arr=result.data.datas;
	this.interprovinceGrid[0].addJSONData(arr);
	var total=0;
	for(var i=0;i<arr.length;i++){
		total+=arr[i].user_cnt*1;
	}
	this.provinceTotal=total;
	$("#"+this.randomId+"_title0").text("省际漫游总数："+this.provinceTotal);
};

/**
 * 终端排名玫瑰图(黄文接口)
 * @class SceneBase.TerminalRoseChart
 * @extends LSMScreen.DataChartPie
 * @classdesc 
 */
SceneBase.TerminalRoseChart=function (){
	this.initialize.apply(this, arguments);
};
/** 从DataChartBase继承*/
SceneBase.TerminalRoseChart.prototype=Object.create(LSMScreen.DataChartPie.prototype);
SceneBase.TerminalRoseChart.prototype.constructor=SceneBase.TerminalRoseChart;

/** 
 * 请求数据接口 由update调用
 * @public
 * @function 
 * @param {Object} queryConfig 查询参数
 * @example
 * {
 * 	topN:"8",//数量
 *  type:"brand",//brand|model 按品牌或型号分
 *  app_type_name:"视频",//业务大类
 *  app_subtype_name:""//业务小类
 *  terminal_brand:""//终端品牌 当type=model时
 * }
 */
SceneBase.TerminalRoseChart.prototype.query=function(queryConfig){
	var dm=LSMScreen.DataManager.getInstance();
	dm.getTerminalRank(queryConfig,this.dataHandler.bind(this),this.failHandler.bind(this));
};

SceneBase.TerminalRoseChart.prototype.gobackPasser;

SceneBase.TerminalRoseChart.prototype.goback=function(){
	this.update(true,{
		topN:6,
		type:"brand",
		app_type_name:"",
		app_subtype_name:"",
		terminal_brand:""
	});
	if(this.gobackPasser!=null){
		this.gobackPasser();
	}
};

/** 
 * 处理数据
 * 降序取前6个错误码，剩下的归并到"其他"
 * @protected
 * @function 
 * @param {Array} chartDataArr
 * @example
 * [
 * 	{
 * 		"time":"2016-04-09 12:00:00",
 * 		"terminal_brand":"苹果",//品牌
 * 		"terminal_model":"苹果",//型号
 * 		"terimalCnt":33086152,//用户数
 * 		"terimalTotal":78383240//全局总用户数
 *  },
 * 	....
 * ]
 */
SceneBase.TerminalRoseChart.prototype.dataHandler=function(chartDataArr){
	//有色圆环样式
	var dataStyle = {
	    normal: {
	        label: {
	        	show:true,
	        	position:"outter",
	        	textStyle:{fontSize:LSMScreen.CHARTCONFIG.labelSize*1.2},
	        	formatter : function (params) {
		            return (params.dataIndex+1)+params.name+"\n"+params.value+"%";
		        }
	        },
	        labelLine: {show:true,length:0}
	    }
	};
	var seriesName="";

	if(this.queryConfig.type=="model"){
		seriesName="终端型号排名";
		this.setTitle("品牌("+this.queryConfig.terminal_brand+")");
		$(this.backBtnDom).css("display","block");
	}else{
		seriesName="终端品牌排名";
		this.setTitle(this.baseConfig.title);
		$(this.backBtnDom).css("display","none");
	}
	
	
	var lastTime="";
	var dataArr=[];
	var legends=[];
	for(var i=0;i<chartDataArr.length;i++){
		var record=chartDataArr[i];
		var cnts=record.terimalCnt/record.terimalTotal*100;//record.terimalCnt;
		var time=record.time;
		var pointName=record.terminal_model;
		lastTime=time.substring(11,16);
		legends.push(pointName);
		dataArr.push({
            value:cnts.toFixed(1),
            name:pointName
        });
	}
	var series=[{
            name:seriesName,
            type:'pie',
            roseType:'area',
            clockWise:false,
//            sort : 'ascending',
            radius : ['15%', '60%'],
            itemStyle : dataStyle,
            data:dataArr
        }];
	this.setTime(lastTime);
	var option=this.getOptionByData(legends, series,{show:false});
	this.updateData(option,true);
	this.hideLoading();
	
};


