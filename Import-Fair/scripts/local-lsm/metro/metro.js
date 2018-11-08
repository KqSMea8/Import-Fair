var MetroScreen = MetroScreen || {};
MetroScreen.ScreenController=function (stationTypeMap){
	this.stationTypeMap=stationTypeMap;
	this.initialize.apply(this, arguments);
};
MetroScreen.ScreenController.prototype=Object.create(LSMScreen.ScreenBase.prototype);
MetroScreen.ScreenController.prototype.constructor=MetroScreen.ScreenController;

MetroScreen.ScreenController.prototype.stationTypeMap={};
MetroScreen.ScreenController.prototype.initConfigs=function(){
	//this.dataManager=new LSMScreen.DataManager();
	this.initComponents();
};
MetroScreen.ScreenController.prototype.initComponents=function(){
	this.linekpigrid=new MetroScreen.LineKpiGrid($("#topGrid")[0],{},this.stationTypeMap);
	this.arpuchart=new MetroScreen.ARPUChart(
			$("#arpuChart")[0],
			{title:"ARPU",contentHeight:210},
			function(){
				this.arpuchart.update();
			}.bind(this)
	);
	this.update();
};

MetroScreen.ScreenController.prototype.update=function(){
	this.linekpigrid.update();
	this.updateTextInfo();
};

MetroScreen.ScreenController.prototype.updateTextInfo=function(){
	var dm=LSMScreen.DataManager.getInstance();
	//,threshold:100
	dm.getMetroStationKpiRank({exclude0:true,sortKey:"4GTCP掉线率",num:100,order:"desc",threshold:LSMThresholds.metroThreshold["4GTCP掉线率"]},this.textInfo1Handler.bind(this),this.failHanlder.bind(this));
	dm.getMetroStationKpiRank({exclude0:true,sortKey:"4G流量",num:100,order:"asc",threshold:LSMThresholds.metroThreshold["4G流量"]},this.textInfo2Handler.bind(this),this.failHanlder.bind(this));
	dm.getMetroStationKpiRank({exclude0:true,sortKey:"4G用户数比例",num:100,order:"asc",threshold:LSMThresholds.metroThreshold["4G用户数比例"]},this.textInfo3Handler.bind(this),this.failHanlder.bind(this));
	dm.getMetroStationKpiRank({exclude0:true,sortKey:"4G下行速率500k",num:100,order:"asc",threshold:LSMThresholds.metroThreshold["4G下行速率500k"]},this.textInfo4Handler.bind(this),this.failHanlder.bind(this));
};

MetroScreen.ScreenController.prototype.textInfo1Handler=function(result){
//	this.setTextInfo(result,0,"4GTCP掉线率","高掉话",100,2);
	this.updateTextInfoList(result,"4GTCP掉线率","高掉话",100,2,"掉线率","%","textInfo2_item_drop");
};
MetroScreen.ScreenController.prototype.textInfo2Handler=function(result){
//	this.setTextInfo(result,1,"4G流量","低流量",1/LSMConsts.byteDivider,2);
	this.updateTextInfoList(result,"4G流量","低流量",1/LSMConsts.byteDivider,2,"流量","MB","textInfo2_item_flow");
};
MetroScreen.ScreenController.prototype.textInfo3Handler=function(result){
//	this.setTextInfo(result,2,"4G用户数比例","低活跃",100,2);
	this.updateTextInfoList(result,"4G用户数比例","低活跃",100,2,"4G用户比","%","textInfo2_item_user");
};
MetroScreen.ScreenController.prototype.textInfo4Handler=function(result){
//	this.setTextInfo(result,3,"4G下行速率500k","低感知",1,2);
	this.updateTextInfoList(result,"4G下行速率500k","低感知",1,2,"下载速率","Kbps","textInfo2_item_speed");
	
	
};

MetroScreen.ScreenController.prototype.updateTextInfoList=function(result,kpiKey,alertText,ratio,fixed,kpiName,kpiUnit,typeClass){
	$("#textInfo2").find(typeClass).remove();
	for(var i=0;i<result.length;i++){
		var record=result[i];
		var lineColor=LSMConsts.metroLineColorMap[record.line];
		var time=record.time.substring(11,16);
		var value=record[kpiKey];
		var valueTxt=(value*ratio).toFixed(fixed);
		
		var inner='<span class="textInfo2_item_title" style="background:'+lineColor+';">'+record.line+"号线"+'</span>'
		+'<span class="textInfo2_item_title" style="background:#2898b0;cursor:pointer;" onclick="showStationDetail(\''+record.line+'\',\''+record.station+'\')">'+record.station+'</span>'
		+'<span class="textInfo2_item_title" style="background:#a80300;">'+alertText+'</span>'
		+'<div class="textInfo2_item_kpi">'
		+'&nbsp&nbsp'
		+'<span class="textInfo2_item_kpi_time">'+time+'</span>'
		+'&nbsp&nbsp&nbsp&nbsp'
		+'<span>'+kpiName+'：</span>'
		+'<span class="textInfo2_item_kpi_value">'+valueTxt+'</span>'
		+'<span>'+kpiUnit+'</span>'
		+'</div>';
		
		var div=document.createElement("div");
		$(div).addClass("textInfo2_item");
		$(div).addClass(typeClass);
		$(div).html(inner);
		
		$("#textInfo2").append(div);
	}
};

MetroScreen.ScreenController.prototype.setTextInfo=function(result,listIndex,kpiKey,alertText,ratio,fixed){
	var titlesJQ=$($("#textInfo2").find(".textInfo2_item")[listIndex]).find(".textInfo2_item_title");
	var valueJQ=$($("#textInfo2").find(".textInfo2_item")[listIndex]).find(".textInfo2_item_kpi_value");
	var timeJQ=$($("#textInfo2").find(".textInfo2_item")[listIndex]).find(".textInfo2_item_kpi_time");
	if(result.length>0){
		var record=result[0];
		var time=record.time.substring(11,16);
		var value=record[kpiKey];
//		if(isNaN(value)){
//			value=0;
//		}
		
		timeJQ.text(time);
		
		$(titlesJQ[0]).text(record.line+"号线");
		$(titlesJQ[1]).text(record.station);
		$(titlesJQ[2]).text(alertText);
		
		
		$($("#textInfo2").find(".textInfo2_item")[listIndex]).css("border-color",LSMConsts.metroLineColorMap[record.line]);
		$(titlesJQ[0]).css("background",LSMConsts.metroLineColorMap[record.line]);
		$(titlesJQ[1]).css("background","#2898b0");
		$(titlesJQ[2]).css("background","#a80300");
		
		valueJQ.text((value*ratio).toFixed(fixed));
	}else{
		timeJQ.text("--");
		titlesJQ.text("--");
		titlesJQ.css("background","#98bde2");
		$($("#textInfo2").find(".textInfo2_item")[listIndex]).css("border-color","#98bde2");
		valueJQ.text("--");
	}
};

MetroScreen.ScreenController.prototype.failHanlder=function(){
	
};


/**
 * 头部表格
 * @class MetroScreen.LineKpiGrid
 * @extends LSMScreen.ComponentBase
 * @classdesc 线路指标列表
 */
MetroScreen.LineKpiGrid=function(dom,config,stationTypeMap){
	this.stationTypeMap=stationTypeMap;
	this.initialize.apply(this, arguments);
	this.createComponent();
};
/** 从ComponentBase继承*/
MetroScreen.LineKpiGrid.prototype=Object.create(LSMScreen.ComponentBase.prototype);
MetroScreen.LineKpiGrid.prototype.constructor=MetroScreen.LineKpiGrid;
MetroScreen.LineKpiGrid.prototype.constructor.stationTypeMap={};

MetroScreen.LineKpiGrid.prototype.allLineNames=[];
MetroScreen.LineKpiGrid.prototype.allLineShortNameMap={};
MetroScreen.LineKpiGrid.prototype.allLineOpenStationNum={
		"地铁1号线":0,
		"地铁2号线":0,
		"地铁3号线":0,
		"地铁4号线":0,
		"地铁5号线":0,
		"地铁6号线":0,
		"地铁7号线":0,
		"地铁8号线":0,
		"地铁9号线":0,
		"地铁10号线":0,
		"地铁11号线":0,
		"地铁12号线":0,
		"地铁13号线":0,
		"地铁14号线":0,
		"地铁15号线":0,
		"地铁16号线":0
};

MetroScreen.LineKpiGrid.prototype.createComponent=function (){
	var dom=this.contentDom;
	var table=document.createElement("table");
	$(table).attr("id",Math.uuid());
	dom.appendChild(table);
	var lines=LSMConsts.metroLines;
	var titleColWidth=230;
	var colNames=[""];
	var colModel=[{name : 'title',index : 'title',width : titleColWidth}];
	var valueColWidth=($(".topGrid").width()-titleColWidth)/lines.length;
	for(var i=0;i<lines.length;i++){
		var colId="地铁"+lines[i]+"号线";
		var shortName="M"+lines[i];
		this.allLineShortNameMap[colId]=shortName;
		this.allLineNames.push(colId);
		colNames.push(colId);
		colModel.push({name : colId,index : colId,width : valueColWidth});
	}
	
	
	this.grid=$(table).jqGrid({
        datatype : "json",
		colNames : colNames,
        colModel : colModel,
        loadui:'disable',
        afterInsertRow:this.afterInsertRow.bind(this),
        height:317
	});
	this.grid.closest('.ui-jqgrid-view').find('div.ui-jqgrid-hdiv').hide(); 
};
MetroScreen.LineKpiGrid.prototype.afterInsertRow=function (rowid,rowdata){
	var grid=this.grid;
	var tr=grid.find("tbody").find("tr")[rowid];
	var tds=$(tr).find("td:gt(0)");
	var i=0;
	var tdJQ;
	if(rowid==1){
		for(i=0;i<tds.length;i++){
			tdJQ=$(tds[i]);
			tdJQ.on("click",this.drillLineDetail.bind(this));
			tdJQ.css("font-weight","bold");
			tdJQ.css("cursor","pointer");
			tdJQ.css("background",LSMConsts.metroLineColorMap[i+1]);
		}
	}else{
		tds.addClass("topGrid_value");
		tds.css("font-size",36);
		for(i=0;i<tds.length;i++){
			tdJQ=$(tds[i]);
			var value=parseFloat(tdJQ.text());
			if(rowdata.title=="流量(MB)"){
				if(value<=LSMThresholds.metroThreshold["4G流量"]/1024){
					tdJQ.addClass("alarmBg");
				}
			}else if(rowdata.title=="用户数(人)"){
				var tmp=tdJQ.text().split(",");
				if(tmp.length>1){
					value=parseFloat(tmp[1]);
					if(value<=LSMThresholds.metroThreshold["4G用户数比例"]){
						tdJQ.addClass("alarmBg");
					}
				}
				tdJQ.text(tmp[0]);
			}else if(rowdata.title=="下载速率(Kbps)"){
				if(value<=LSMThresholds.metroThreshold["4G下行速率500k"]){
					tdJQ.addClass("alarmBg");
				}
			}else if(rowdata.title=="掉线率(%)"){
				if(value>=LSMThresholds.metroThreshold["4GTCP掉线率"]*100){
					tdJQ.addClass("alarmBg");
				}
			}
		}
		
	}
};
MetroScreen.LineKpiGrid.prototype.drillLineDetail=function (e){
	if($("#drillLineDetailTime").length>0){
		return;
	}
	
	this.drillLineDetailType="4G";
	var targetName=$(e.currentTarget).text();
	var lineIndex=targetName.replace("M","");
	var docWidth=$(document).width();
	var docHeight=$(document).height();
	var winWidth=1416;
	var winHeight=988;
	var gridWidth=685;
	var gridHeight=winHeight-190;
	var colWidth=gridWidth/5;
	
	var titleHtml='<span class="commonText" style="padding:5px 15px 5px 15px;background:'+LSMConsts.metroLineColorMap[lineIndex]+'">'+lineIndex+"号线"+'</span>&nbsp&nbsp&nbsp&nbsp'
					+'<span id="drillLineDetailTime" style="display:inline-block;width:200px;"></span>'
					+'<span id="drillLineDetail2g" style="display:inline-block;width:60px;text-align:center;cursor:pointer;">2G</span>'
					+'<span id="drillLineDetail3g" style="display:inline-block;width:60px;text-align:center;cursor:pointer;">3G</span>'
					+'<span id="drillLineDetail4g" style="display:inline-block;width:60px;text-align:center;background:#2898b0;cursor:pointer;">4G</span>';
	var win=new LSMScreen.Window({
		title:titleHtml,
		width:winWidth,
		height:winHeight,
		x:(docWidth-winWidth)/2,
		y:(docHeight-winHeight)/2
	});
	var idLeft=Math.uuid();
	var idRight=Math.uuid();
	var html="";
	
	html+='<div style="width:100%;padding:5px 10px 5px 10px;">';
	html+='<div id="drillLineDetailTopFLow" class="commonText">流量最高TOP3站点——</div>';
	html+='<div id="drillLineDetailTopUser" class="commonText">用户最多TOP3站点——</div>';
	html+='<div style="width:'+gridWidth+'px;height:'+gridHeight+'px;position:absolute;top:80px;left:10px;"><table id="'+idLeft+'" ></table></div>';
	html+='<div style="width:'+gridWidth+'px;height:'+gridHeight+'px;position:absolute;top:80px;left:'+(gridWidth+10)+'px;"><table id="'+idRight+'" ></table></div>';
	html+='</div>';
	
	$(win.content).html(html);
	var colNames=["站名","流量(MB)","用户数(人)","下载速率(Kbps)","掉线率(%)"];
	var colModel=[
	       {name : "station",index : "station",width : colWidth},
	       {name : "流量",index : "流量",width : colWidth},
	       {name : "用户数",index : "用户数",width : colWidth},
	       {name : "下行速率500k",index : "下行速率500k",width : colWidth},
	       {name : "TCP掉线率",index : "TCP掉线率",width : colWidth}
	   ];
	var stationTypeMap=this.stationTypeMap;
	var leftGrid=$("#"+idLeft).jqGrid({
        datatype : "json",
		colNames : colNames,
        colModel : colModel,
        afterInsertRow:function(rowid,rowdata){
        	var grid=leftGrid;
        	var tr=grid.find("tbody").find("tr")[rowid];
        	var tds=$(tr).find("td:gt(0)");
        	
        	var i=0;
        	var tdJQ;
        	
        	var stationTd=$(tr).find("td:eq(0)");
        	var stationName=rowdata.station;
        	var stationHtml='<div class="station'+stationTypeMap[stationName]+'"></div>'+stationName;
        	stationTd.css("text-align","left");
        	stationTd.html(stationHtml);
        	
        	for(i=0;i<tds.length;i++){
    			tdJQ=$(tds[i]);
    			var value=parseFloat(tdJQ.text());
    			if(i==0){
    				if(value<=LSMThresholds.metroThreshold[this.drillLineDetailType+"流量"]/1024){
    					tdJQ.addClass("alarmBg");
    				}
    			}else if(i==1){
    				var tmp=tdJQ.text().split(",");
    				if(tmp.length>1){
    					value=parseFloat(tmp[1]);
    					if(value<=LSMThresholds.metroThreshold[this.drillLineDetailType+"用户数比例"]){
    						tdJQ.addClass("alarmBg");
    					}
    				}
    				tdJQ.text(tmp[0]);
    			}else if(i==2){
    				if(value<=LSMThresholds.metroThreshold[this.drillLineDetailType+"下行速率500k"]){
    					tdJQ.addClass("alarmBg");
    				}
    			}else if(i==3){
    				if(value>=LSMThresholds.metroThreshold[this.drillLineDetailType+"TCP掉线率"]*100){
    					tdJQ.addClass("alarmBg");
    				}
    			}
    		}
        }.bind(this),
        loadui:'disable',
        height:gridHeight
	});
	
	var rightGrid=$("#"+idRight).jqGrid({
        datatype : "json",
		colNames : colNames,
        colModel : colModel,
        afterInsertRow:function(rowid,rowdata){
        	var grid=rightGrid;
        	var tr=grid.find("tbody").find("tr")[rowid];
        	var tds=$(tr).find("td:gt(0)");
        	var i=0;
        	var tdJQ;
        	
        	var stationTd=$(tr).find("td:eq(0)");
        	var stationName=rowdata.station;
        	var stationHtml='<div class="station'+stationTypeMap[stationName]+'"></div>'+stationName;
        	stationTd.css("text-align","left");
        	stationTd.html(stationHtml);
        	
        	for(i=0;i<tds.length;i++){
    			tdJQ=$(tds[i]);
    			var value=parseFloat(tdJQ.text());
    			if(i==0){
    				if(value<=LSMThresholds.metroThreshold[this.drillLineDetailType+"流量"]/1024){
    					tdJQ.addClass("alarmBg");
    				}
    			}else if(i==1){
    				var tmp=tdJQ.text().split(",");
    				if(tmp.length>1){
    					value=parseFloat(tmp[1]);
    					if(value<=LSMThresholds.metroThreshold[this.drillLineDetailType+"用户数比例"]){
    						tdJQ.addClass("alarmBg");
    					}
    				}
    				tdJQ.text(tmp[0]);
    			}else if(i==2){
    				if(value<=LSMThresholds.metroThreshold[this.drillLineDetailType+"下行速率500k"]){
    					tdJQ.addClass("alarmBg");
    				}
    			}else if(i==3){
    				if(value>=LSMThresholds.metroThreshold[this.drillLineDetailType+"TCP掉线率"]*100){
    					tdJQ.addClass("alarmBg");
    				}
    			}
    		}
        }.bind(this),
        loadui:'disable',
        height:gridHeight
	});
	
	$("#drillLineDetail2g").on("click",netTypeClick.bind(this));
	$("#drillLineDetail3g").on("click",netTypeClick.bind(this));
	$("#drillLineDetail4g").on("click",netTypeClick.bind(this));
	
	loadData.apply(this, [this.drillLineDetailType]);
	
	function loadData(type){
		var dm=LSMScreen.DataManager.getInstance();
		dm.getMetroStationKpiRank({sortKey:type+"流量",num:1000,order:"desc",line:lineIndex},function(result){
			var leftList=[];
			var rightList=[];
			
			var topFlowTxt="流量最高TOP3站点——";
			var topUserTxt="用户最多TOP3站点——";
			var i=0;
			var j=0;
			var record={};
			var time="";
			for(i=0;i<result.length;i++){
				record=result[i];
				for(j=1;j<colModel.length;j++){
					var kpiKey=type+colModel[j].name;
					if(kpiKey==type+"用户数"){
						record[kpiKey]=this.processValueByKpiKey(kpiKey,record[kpiKey])+","+this.processValueByKpiKey("4G用户数比例",record["4G用户数比例"]);
					}else{
						record[kpiKey]=this.processValueByKpiKey(kpiKey,record[kpiKey]);
					}
					record[colModel[j].name]=record[kpiKey];
					time=record.time.substring(11,16);
				}
				if(i<3){
					topFlowTxt+=record.station+":"+record[type+"流量"]+"，";
				}
				if(i<15){
					leftList.push(record);
				}else{
					rightList.push(record);
				}
			}
			leftGrid[0].addJSONData(leftList);
			rightGrid[0].addJSONData(rightList);
			
			result.sort(function(a,b){return b[type+"用户数"]-a[type+"用户数"];});
			for(i=0;i<result.length&&i<3;i++){
				record=result[i];
				topUserTxt+=record.station+":"+record[type+"用户数"].split(",")[0]+"，";
			}
			topFlowTxt=topFlowTxt.substring(0,topFlowTxt.length-1);
			topUserTxt=topUserTxt.substring(0,topUserTxt.length-1);
			$("#drillLineDetailTopFLow").text(topFlowTxt);
			$("#drillLineDetailTopUser").text(topUserTxt);
			$("#drillLineDetailTime").text(time);
		}.bind(this));
	}
	
	function netTypeClick(evt){
		var btn=evt.currentTarget;
		$("#drillLineDetail2g").css("background","transparent");
		$("#drillLineDetail3g").css("background","transparent");
		$("#drillLineDetail4g").css("background","transparent");
		$(btn).css("background","#2898b0");
		this.drillLineDetailType=$(btn).text();
		loadData.apply(this, [this.drillLineDetailType]);
	}
	
	
	
	
};
MetroScreen.LineKpiGrid.prototype.update=function (){
	var dm=LSMScreen.DataManager.getInstance();
	dm.getMetroLineStationCount({},this.stationCountDataHandler.bind(this),this.failHanlder.bind(this));
};
MetroScreen.LineKpiGrid.prototype.stationCountDataHandler=function (result){
	var lines=LSMConsts.metroLines;
	for(var i=0;i<lines.length;i++){
		this.allLineOpenStationNum["地铁"+lines[i]+"号线"]=result[lines[i]];
	}
	var dm=LSMScreen.DataManager.getInstance();
	dm.getHotSpotsKpis(this.allLineNames,null,null,this.dataHandler.bind(this),this.failHanlder.bind(this));
};
MetroScreen.LineKpiGrid.prototype.dataHandler=function (result){
	this.grid.clearGridData();
	
	var requireKpi=["线路","开通站数","流量(MB)","用户数(人)","下载速率(Kbps)","掉线率(%)"];
	var requireKpiKey=["线路","开通站数","4G流量","4G用户数","4G下行速率500k","4GTCP掉线率"];
	var gridData=[];
	var time="";
	
	for(var i=0;i<requireKpiKey.length;i++){
		var record={title:requireKpi[i]};
		var j=0;
		if(i==0){
			for(j=0;j<this.allLineNames.length;j++){
				var lineName=this.allLineNames[j];
				record[lineName]=this.allLineShortNameMap[lineName];
			}
		}else if(i==1){
			for(j=0;j<this.allLineNames.length;j++){
				var lineName=this.allLineNames[j];
				record[lineName]=this.allLineOpenStationNum[lineName];
			}
		}else if(i>=2){
			var kpiKey=requireKpiKey[i];
			for(var line in result){
				var kpiRecord=result[line];
				time=kpiRecord.time;
				if(kpiKey=="4G用户数"){
					record[line]=this.processValueByKpiKey(kpiKey,kpiRecord[kpiKey])+","+this.processValueByKpiKey("4G用户数比例",kpiRecord["4G用户数比例"]);
				}else{
					record[line]=this.processValueByKpiKey(kpiKey,kpiRecord[kpiKey]);
				}
			}
		}
		gridData.push(record);
	}
	
	this.grid[0].addJSONData(gridData);
	if(time!=""){
		this.grid.find("tr:eq(1)").find("td:eq(0)").text("线路("+time.substring(11,16)+")");
	}
};

//对数据进行处理 换算 格式化等
MetroScreen.LineKpiGrid.prototype.processValueByKpiKey=function(kpiKey,rawValue){
	var newValue=rawValue;
	if(kpiKey.indexOf("流量")!=-1){
		if(isNaN(rawValue)){
			newValue="--";
		}else{
			newValue=(rawValue/LSMConsts.byteDivider).toFixed(2);
		}
		
	}else if(kpiKey.indexOf("速率")!=-1){
		if(isNaN(rawValue)){
			newValue="--";
		}else{
			newValue=(rawValue).toFixed(2);
		}
		
	}else if(kpiKey.indexOf("率")!=-1){
		if(isNaN(rawValue)){
			newValue="--";
		}else{
			newValue=(rawValue*100).toFixed(2);
		}
		
	}
	return newValue;
};

MetroScreen.LineKpiGrid.prototype.failHanlder=function (){
	console.log("MetroScreen.LineKpiGrid update failed");
};




/**
 * ARPU
 * @class MetroScreen.ARPUChart
 * @extends LSMScreen.DataChartPie
 * @classdesc ARPU环形图
 */
MetroScreen.ARPUChart=function (){
	this.initialize.apply(this, arguments);
};
/** 从DataChartBase继承*/
MetroScreen.ARPUChart.prototype=Object.create(LSMScreen.DataChartPie.prototype);
MetroScreen.ARPUChart.prototype.constructor=MetroScreen.ARPUChart;

MetroScreen.ARPUChart.prototype.staticData={
	"0-50":"381442",
	"50-100":"558447",
	"100-150":"194782",
	"150-200":"86040",
	"200-250":"25877",
	"250-300":"14971",
	"300-350":"5866",
	"350-400":"5654",
	"400-450":"2178",
	"其他":"4052"
};

/** 
 * 请求数据接口 由update调用
 * @public
 * @function 
 * @param {Object} queryConfig 查询参数
 * @example
 * {
 * 	filterKey:"",//选中地市，具体设备等，对返回数据进行过滤
 *  isX2:false,//boolean 是否是 x2 switch错误码 查mmes-x2-time接口
 *  type:"city",//city:分地市 查sds接口, mme:分mme 查mmes-time接口
 *  time:"yyyy-MM-dd hh:mm:ss"//时间点 默认最近10分钟
 * }
 */
MetroScreen.ARPUChart.prototype.query=function(queryConfig){
	this.dataHandler(this.staticData);
};

MetroScreen.ARPUChart.prototype.dataHandler=function(chartData){
	//有色圆环样式
	var dataStyle = {
	    normal: {
	        label: {
	        	show:false,
	        	position:"outter",
	        	textStyle:{fontSize:LSMScreen.CHARTCONFIG.labelSize}
	        }, 
	        labelLine: {show:false,length:5}
	    }
	};
	
	var i=0;
	var codeList=[];
	var total=0;
	var legends=[];
	for(var key in chartData){
		var codeAndCount={
			code:key,
			count:chartData[key]
		};
		legends.push(key);
		codeList.push(codeAndCount);
		total+=parseInt(chartData[key]);
	}
	codeList.sort(function(a,b){return b.count-a.count;});//按count 降序
	
	var dataArr=[];
	ilength=codeList.length;
	for(i=0;i<ilength;i++){
		var record=codeList[i];
		var codeNum=record.code;
		var count=record.count;
		var realPercent=(count/total*100).toFixed(2);//实际百分比 在tip中呈现
		var tipName=""+codeNum+":<br/>"+count+"("+realPercent+"%)";
		dataArr.push({
						tip:tipName,
	                    value:count,
	                    name:codeNum
	                });
	}
	series=[{
            name:"ARPU",
            type:'pie',
			startAngle:-15,
			radius : ['50%', '70%'],
            clockWise:false,
            itemStyle : dataStyle,
            data:dataArr
        }];
	var option=this.getOptionByData(legends, series,{},function(param){
		return param.data.tip;
	});
	option.legend.show=true;
	option.color=[
	              "#00d2ff","#0078ff","#ab01a7","#500878","#0fd2a7",
	              "#06dd41","#ffec00","#ff6c00","#ff008a","#ff0000"
	              ];
	this.updateData(option,true);
};



