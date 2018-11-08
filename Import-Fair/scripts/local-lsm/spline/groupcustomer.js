var GROUPCUSTOMER=GROUPCUSTOMER||{};
GROUPCUSTOMER.Screen=function ()
{
	this.initialize.apply(this,arguments);
};
GROUPCUSTOMER.Screen.prototype.constructor=GROUPCUSTOMER.Screen;
GROUPCUSTOMER.Screen.prototype.lineWidth=3;
GROUPCUSTOMER.Screen.prototype.chartLabelSize=24;
GROUPCUSTOMER.Screen.prototype.initialize=function(){
	this.dm=LSMScreen.DataManager.getInstance();
	require(['echarts',  
	            'echarts/chart/line', 
	            'echarts/chart/bar',
	            'echarts/chart/funnel',
	            'echarts/chart/map',
	            'echarts/chart/pie'
	            ],this.initEcharts.bind(this));
	this.initTable();
	this.initTwaver();
	setInterval(this.refreshTime,1000);
};
GROUPCUSTOMER.Screen.prototype.initTwaver=function(){
	 this.network = new twaver.network.Network();
	 this.box = this.network.getElementBox();
	 this.nameFinder = new twaver.QuickFinder(this.box, "name");
     
     this.networkDom = this.network.getView();
     this.networkDom.style.width = "100%";
     this.networkDom.style.height = "100%";
     $('#topoDiv').append(this.networkDom);
     
     this.registerImage();
//     twaver.Util.RegisterImageByImageSource('SDH', BASEPATH+'/static/styles/local-lsm/ciie/images/topo/SDH.png', 128, 128);
//     twaver.Util.registerImage('CSSB', BASEPATH+'/static/styles/local-lsm/ciie/images/topo/CSSB.png', 128, 128);
//     twaver.Util.registerImage('MSAP', BASEPATH+'/static/styles/local-lsm/ciie/images/topo/MSAP.png', 128, 128);
//     twaver.Util.registerImage('ROUTER', BASEPATH+'/static/styles/local-lsm/ciie/images/topo/ROUTER.png', 128, 128);
//     twaver.Util.registerImage('shu_tong_device', BASEPATH+'/static/styles/local-lsm/ciie/images/topo/shu_tong_device.png', 128, 128);
//     twaver.Util.registerImage('CLIENT', BASEPATH+'/static/styles/local-lsm/ciie/images/topo/CLIENT.png', 128, 128);
     
};
GROUPCUSTOMER.Screen.prototype.registerImage=function(){
	this.registerNormalImage(BASEPATH+'/static/styles/local-lsm/ciie/images/topo/S9306.png','4506');
	this.registerNormalImage(BASEPATH+'/static/styles/local-lsm/ciie/images/topo/CSSB.png','SDH');
	this.registerNormalImage(BASEPATH+'/static/styles/local-lsm/ciie/images/topo/coRotate.png','MSAP');
	this.registerNormalImage(BASEPATH+'/static/styles/local-lsm/ciie/images/topo/router.png','ROUTER');
	this.registerNormalImage(BASEPATH+'/static/styles/local-lsm/ciie/images/topo/client.png','CLIENT_DEVICE');
	
	this.registerNormalImage(BASEPATH+'/static/styles/local-lsm/ciie/images/topo/SR.png','SR');
	this.registerNormalImage(BASEPATH+'/static/styles/local-lsm/ciie/images/topo/T1600.png','TXP');
	this.registerNormalImage(BASEPATH+'/static/styles/local-lsm/ciie/images/topo/shu_tong_device.png','XIEZHUAN');
	
}
GROUPCUSTOMER.Screen.prototype.registerNormalImage=function(url, name) {
	var image = new Image();
	image.src = url;
	image.onload = function() {
		twaver.Util.registerImage(name, image, image.width, image.height);
		image.onload = null;
		try{
			this.network.invalidateElementUIs();
		}catch(e){}
		
	};
}
GROUPCUSTOMER.Screen.prototype.initEcharts=function(ec){
	this.ec=ec;
	this.chart00=ec.init($("#chart0_0")[0],'marcarons');
	this.chart01=ec.init($("#chart0_1")[0],'marcarons');
	
	this.update();
};
GROUPCUSTOMER.Screen.prototype.initTable=function(){
	var colNames=['客户名称','专线类型','专线编号','专线等级','故障数量','投诉数量'];
	var colModel=[
	    {colName:'CUSTOMERS_NAME',name : 'CUSTOMERS_NAME',index : 'CUSTOMERS_NAME',width:440},//,width:
	    {colName:'BUSINESS_TYPE',name : 'BUSINESS_TYPE',index : 'BUSINESS_TYPE'},
	    {colName:'LINE_ID',name : 'LINE_ID',index : 'LINE_ID',width:440},
	    {colName:'BSNS_SECURITY_LEVEL',name : 'BSNS_SECURITY_LEVEL',index : 'BSNS_SECURITY_LEVEL'},
	    {colName:'GZ_CN',name : 'GZ_CN',index : 'GZ_CN',formatter:function(cellvalue){
	    	if(cellvalue*1>0){
	    		return '<span style="color:#ff5252;">'+cellvalue+'</span>';
	    	}else{
	    		return cellvalue;
	    	}
	    }},
	    {colName:'TS_CN',name : 'TS_CN',index : 'TS_CN',formatter:function(cellvalue){
	    	if(cellvalue*1>0){
	    		return '<span style="color:#ff5252;">'+cellvalue+'</span>';
	    	}else{
	    		return cellvalue;
	    	}
	    }}
	];
	var opt1={
	        datatype : function(){},
	        colNames:colNames,
	        colModel : colModel,
	        loadui:'disable',
	        width:'100%',
	        height:1020,//560
	        rowNum:3000,
	        autowidth: true,
	        shrinkToFit: true,
	        onSelectRow:this.tableClick.bind(this)
		};
	
	$('#table').jqGrid(opt1);
};

GROUPCUSTOMER.Screen.prototype.update=function(){
	this.updateStatistic();
	this.updateFaultAndComplain();
	this.updateAllTrend();
	this.updateLineTable();
};

GROUPCUSTOMER.Screen.prototype.tableClick=function(rowid){
	var record=this.tableDataCache[rowid-1];
	this.updateRelatedInfo(record);
};
GROUPCUSTOMER.Screen.prototype.updateRelatedInfo=function(record){
	this.box.clear();
	var iframe=$("#mapIFrame")[0];
	var iframeWindow=iframe.window?iframe.window:iframe.contentWindow;
	iframeWindow.clear();
	$('#table').setGridHeight(1020);
	$('#singleLineParent').css('display','none');
	if(record.BUSINESS_TYPE=='互联网专线'){
		this.updateSingleTrend(record.LINE_ID);
	}
	this.updateLineTopo(record.BUSINESS_TYPE,record.PRODUCT_EXAMPLES_LOGO);
};
GROUPCUSTOMER.Screen.prototype.updateLineTopo=function(BUSINESS_TYPE,PRODUCT_EXAMPLES_LOGO){
	this.dm.getJKSplineTopo({BUSINESS_TYPE:BUSINESS_TYPE,PRODUCT_EXAMPLES_LOGO:PRODUCT_EXAMPLES_LOGO},this.topoDataHandler.bind(this));
};
GROUPCUSTOMER.Screen.prototype.topoDataHandler=function(result){
	var iframe=$("#mapIFrame")[0];
	var iframeWindow=iframe.window?iframe.window:iframe.contentWindow;
	var xmldoc=SUtils.loadXML(result);
	var groups = xmldoc.getElementsByTagName("Group");
	var nodes = xmldoc.getElementsByTagName("Node");
	var links = xmldoc.getElementsByTagName("Link");
	//console.log('groups:'+groups.length+',nodes:'+nodes.length+',links:'+links.length);
	
	var i=0;
	var j=0;
	var nodeMap={};
	var toMap={};
	var fromMap={};
	var hasLatLngMap={};
	var viewSet=false;
	var linkLength=1;
	var maxX=0;
	var maxY=0;
	var minX=10000;
	var minY=10000;
	if(nodes.length>1){
		linkLength=$('#topoDiv').width()/(nodes.length-2);
	}
	for(i=0;i<nodes.length;i++){
		var node=nodes[i];
		var resourceType=node.getAttribute('resourceType');
		if(resourceType=='RETURN') continue;
		var nodeId=node.getAttribute('id');
		var nodeName=node.getAttribute('name');
		var lat=node.getAttribute('latitude');
		var lng=node.getAttribute('longitude');
		var img=node.getAttribute('image');
		var x=node.getAttribute('x')*1;
		var y=node.getAttribute('y')*1;
		maxX=Math.max(maxX,x);
		minX=Math.min(minX,x);
		maxY=Math.max(maxY,y);
		minY=Math.min(minY,y);
		var deviceNode = new twaver.Node(nodeId);
		deviceNode.setImage(resourceType);
		deviceNode.setSize(128, 128);
		deviceNode.setName(nodeName);
		deviceNode.setStyle('label.color', '#ffffff');
		deviceNode.setStyle('label.font', '26px "Microsoft Yahei"');
		
		nodeMap[nodeId]=deviceNode;
		this.box.add(deviceNode);
		if(lat!=''&&lng!=''&&lat!=null&&lng!=null){
			hasLatLngMap[nodeId]=[lat,lng];
			iframeWindow.addMarker(nodeName,img,lat,lng);
			if(!viewSet){
				viewSet=true;
				iframeWindow.setView(lat,lng);
			}
		}
	}
	for(i=0;i<links.length;i++){
		var linkInfo=links[i];
		var linkName=linkInfo.getAttribute('name');
		var fromId=linkInfo.getAttribute('fromId');
		var toId=linkInfo.getAttribute('toId');
		var fromNode=nodeMap[fromId];
		var toNode=nodeMap[toId];
		
		fromMap[fromId]=toId;
		toMap[toId]=fromId;
		
		var link = new twaver.Link(fromNode,toNode);
        link.setName(linkName);
        link.setStyle("link.width", 5);
        link.setStyle('label.color', '#ffffff');
        link.setStyle('label.font', '26px "Microsoft Yahei"');
        this.box.add(link);
        if(hasLatLngMap[fromId]!=null&&hasLatLngMap[toId]!=null){
        	var latlngs = [
               hasLatLngMap[fromId],
               hasLatLngMap[toId]
           ];
        	iframeWindow.addLine(latlngs);
        }
        
	}
	var containerW=$('#topoDiv').width()*0.9;
	var containerH=$('#topoDiv').height()*0.9;
	
	var deltaX=minX;
	var deltaY=minY;
	var scaleX=containerW/(maxX-minX);
	var scaleY=containerH/(maxY-minY);
	for(i=0;i<nodes.length;i++){
		var node=nodes[i];
		var resourceType=node.getAttribute('resourceType');
		if(resourceType=='RETURN') continue;
		var nodeId=node.getAttribute('id');
		var x=node.getAttribute('x')*1;
		var y=node.getAttribute('y')*1;
		x=(x-deltaX)*scaleX;
		y=(y-deltaY)*scaleY;
		nodeMap[nodeId].setLocation(x,y);
	}
	
//	var nextNode=null;
//	for(var key in nodeMap){
//		if(toMap[key]==null){
//			nextNode=key;//第一个节点
//			break;
//		}
//	}
//	var leftGap=60;
//	if(nextNode!=null){
//		var count=1;
//		while(fromMap[nextNode]!=null){
//			nextNode=fromMap[nextNode];
//			nodeMap[nextNode].setLocation(leftGap+linkLength*count,0);
//			count++;
//		}
//	}
	
	
};
GROUPCUSTOMER.Screen.prototype.updateLineTable=function(){
	this.dm.getJKSplines({},this.splineTableDataHandler.bind(this));
};
GROUPCUSTOMER.Screen.prototype.splineTableDataHandler=function(result){
	result=result.sort(function(a,b){return (b.GZ_CN*1+b.TS_CN*1)-(a.GZ_CN*1+a.TS_CN*1);})
	this.tableDataCache=result;
	$('#table')[0].addJSONData(result);
	if(result!=null&&result.length>0){
		this.updateRelatedInfo(result[0]);
	}
};
GROUPCUSTOMER.Screen.prototype.updateSingleTrend=function(lineId){
	$('#singleLineId').text('-'+lineId);
	this.dm.getJKSingleTrend({lineId:lineId},this.singleTrendDataHandler.bind(this));
};
GROUPCUSTOMER.Screen.prototype.singleTrendDataHandler=function(result){
	var list=result.data;
	if(list==null){
		list=[];
	}
	if(list.length>0){
		$('#table').setGridHeight(560);
		$('#singleLineParent').css('display','block');
	}
	var dataIn=[];
	var dataOut=[];
	var xArr=[];
	list=list.reverse();
	for(var i=0;i<list.length;i++){
//		{"TIME":"2018-06-23 15:50:00","IF_IN_TOTAL":225.29,"IF_OUT_TOTAL":52.19}
		var record=list[i];
		var time=record.TIME;
		xArr.push(time.substring(11,16));
		dataOut.push(record.IF_OUT);
		dataIn.push(record.IF_IN);
	}
	this.chart01=this.ec.init($("#chart0_1")[0],'marcarons');
	this.chart01.setOption(this.getEchartsOption(xArr,dataIn,dataOut),true);
};
GROUPCUSTOMER.Screen.prototype.updateAllTrend=function(){
	this.dm.getJKInternetFlowTrend({},this.allTrendDataHandler.bind(this));
};
GROUPCUSTOMER.Screen.prototype.allTrendDataHandler=function(result){
	var list=result.data;
	if(list==null){
		list=[];
	}
	var dataIn=[];
	var dataOut=[];
	var xArr=[];
	list=list.reverse();
	for(var i=0;i<list.length;i++){
//		{"TIME":"2018-06-23 15:50:00","IF_IN_TOTAL":225.29,"IF_OUT_TOTAL":52.19}
		var record=list[i];
		var time=record.TIME;
		xArr.push(time.substring(11,16));
		dataOut.push(record.IF_OUT_TOTAL);
		dataIn.push(record.IF_IN_TOTAL);
	}
	this.chart00=this.ec.init($("#chart0_0")[0],'marcarons');
	this.chart00.setOption(this.getEchartsOption(xArr,dataIn,dataOut),true);
};
GROUPCUSTOMER.Screen.prototype.updateStatistic=function(){
	this.dm.getJKStatistic({},this.statisticDataHandler.bind(this));
};

GROUPCUSTOMER.Screen.prototype.statisticDataHandler=function(result){
	if(result.data!=null&&result.data.length>0){
		record=result.data[0];
		$('#allCustomer').text(record.CUST_CNT);
		$('#allSpline').text(record.LINE_CNT);
		$('#spline_transmit').text(record.CL_CNT);
		$('#spline_internet').text(record.HLW_CNT);
	}
};
GROUPCUSTOMER.Screen.prototype.updateFaultAndComplain=function(){
	this.dm.getJKFaultAndComplainStatistic({},this.faultAndComplainDataHandler.bind(this));
};
GROUPCUSTOMER.Screen.prototype.faultAndComplainDataHandler=function(result){
	if(result.data!=null){
		var list=result.data;
		for(var i=0;i<list.length;i++){
			var record=list[i];
			if(record.TYPE=='TS'){
				$('#complainCustomer').text(record.CUST_CNT);
				$('#complainSpline').text(record.LINE_CNT);
			}else if(record.TYPE=='GZ'){
				$('#faultCustomer').text(record.CUST_CNT);
				$('#faultSpline').text(record.LINE_CNT);
			}
		}
	}
};

GROUPCUSTOMER.Screen.prototype.getEchartsOption=function(xArr,dataIn,dataOut){
	var option = {
			color:['#1991e9','#ffa526','#1991e9'],
		    title : {
		        show:false
		    },
		    tooltip : {
		        trigger: 'axis'
		    },
		    legend: {
		        data:['上行流量(Mb)','下行流量(Mb)'],
		        textStyle:{color:'#ffffff',fontSize:this.chartLabelSize}
		    },
		    toolbox: {
		        show : false
		    },
		    calculable : false,
		    grid:{
		    	borderWidth:0,
		    	x:100,
		    	y:60,
		    	x2:0,
		    	y2:30
		    },
		    xAxis : [
		        {
		            type : 'category',
		            data : xArr,
		            axisLine:{show:true,lineStyle:{color:'#adc7dd'}},
		            axisLabel:{textStyle:{color:'#adc7dd',fontSize:this.chartLabelSize}},
		            splitLine:{show:false},
		            axisTick:{show:true,lineStyle:{color:'#adc7dd'}}
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            axisLine:{show:false},
		            splitLine:{show:false},
		            axisLabel:{textStyle:{color:'#adc7dd',fontSize:this.chartLabelSize}},
		            axisTick:{show:true,lineStyle:{color:'#adc7dd'}}
		        },{
		            type : 'value',
		            axisLine:{show:false},
		            splitLine:{show:false},
		            axisLabel:{textStyle:{color:'#adc7dd',fontSize:this.chartLabelSize}},
		            axisTick:{show:true,lineStyle:{color:'#adc7dd'}}
		        }
		    ],
		    series : [{
	        	name:'上行流量(Mb)',
	            type:'line',
	            symbol:'emptyCircle',
	            data:dataOut,
	            barWidth:5,
	            symbolSize:[5,5],
	            smooth:true,
	            itemStyle:{normal:{lineStyle:{width:this.lineWidth},label:{show:true,textStyle:{fontSize:this.chartLabelSize}}}}
	        },{
		            name:'下行流量(Mb)',
		            type:'line',
		            symbol:'emptyCircle',
		            //showAllSymbol:true,
		            symbolSize:[5,5],
		            data:dataIn,
		            smooth:true,
		            itemStyle:{normal:{lineStyle:{width:this.lineWidth},label:{show:true,textStyle:{fontSize:this.chartLabelSize}}}}
		    }]
		};
	return option;
};

GROUPCUSTOMER.Screen.prototype.refreshTime=function(){
	var date=new Date();
	var space='        ';
	var showTime=date.Format('yyyy-MM-dd'+space+'hh:mm:ss');
	var weekday=new Array(7);
	weekday[0]="星期日";
	weekday[1]="星期一";
	weekday[2]="星期二";
	weekday[3]="星期三";
	weekday[4]="星期四";
	weekday[5]="星期五";
	weekday[6]="星期六";
	showTime+=space+weekday[date.getDay()];
	$('#screenTitleTime').text(showTime);
};
