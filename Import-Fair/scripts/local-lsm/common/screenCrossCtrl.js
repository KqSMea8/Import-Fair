var areaCache=[];
	/** 立即执行方法*/
	(function () { 
		//http://10.221.247.7:8080/sh/shUltimate/originCoordDSN.html
		new ScreenController.WsConnection(ScreenController.ROLE_RECIEVER);
	}());
	
	//由子页面直接调用 不通过websocket
	function screen3_changeType(type){
		var iframe=$("#frame3")[0];
		var iframeWindow=iframe.window?iframe.window:iframe.contentWindow;
		iframeWindow.navClick(type);
	};
	//定位热点
	function screen2_changeLocate(loc){
		var iframe=$("#frame2")[0];
		var iframeWindow=iframe.window?iframe.window:iframe.contentWindow;
		iframeWindow.locate2Target(loc);
	};
	//定位小区
	function screen2_locateCell(lat,lng,lacci,cellName,hotspot,ntType,isRo){
		var iframe=$("#frame2")[0];
		var iframeWindow=iframe.window?iframe.window:iframe.contentWindow;
		iframeWindow.getParasToOpenPopup(lat,lng,lacci,cellName,hotspot,ntType,isRo);
	};
	
	//清楚片区渲染
	function screen2_clearAreaRender(){
		areaCache=[];
		var iframe=$("#frame2")[0];
		var iframeWindow=iframe.window?iframe.window:iframe.contentWindow;
		iframeWindow.screen2_clearAreaRender();
	}
	
	//清楚小区渲染
	function screen2_clearCellRender(){
		var iframe=$("#frame2")[0];
		var iframeWindow=iframe.window?iframe.window:iframe.contentWindow;
		iframeWindow.screen2_clearCellRender();
	}
	
	//渲染小区
	function getParasToSetStyle(color,cellNames){
		var iframe=$("#frame2")[0];
		var iframeWindow=iframe.window?iframe.window:iframe.contentWindow;
		iframeWindow.getParasToSetStyle(color,cellNames);
	};
	
	//渲染片区
	function renderAreaCache(){
		var iframe=$("#frame2")[0];
		var iframeWindow=iframe.window?iframe.window:iframe.contentWindow;
		for(var i=0;i<areaCache.length;i++){
			iframeWindow.screen2_renderAreaAndTip(
					areaCache[i].color,
					areaCache[i].name,
					areaCache[i].time,
					areaCache[i].level,
					areaCache[i].downLimit,
					areaCache[i].upLimit,
					areaCache[i].content
			);
		} 
	}
	
	//渲染片区和tip
	function screen2_renderAreaAndTip(color,name,time,level,downLimit,upLimit,content){
		addToCache(color,name,time,level,downLimit,upLimit,content);
		var iframe=$("#frame2")[0];
		var iframeWindow=iframe.window?iframe.window:iframe.contentWindow;
		iframeWindow.screen2_renderAreaAndTip(color,name,time,level,downLimit,upLimit,content);
	}
	
	function addToCache(color,name,time,level,downLimit,upLimit,content){
		for(var i=0;i<areaCache.length;i++){
			if(areaCache[i].name==name){
				return;
			}
		}
		areaCache.push({
			color:color,
			name:name,
			time:time,
			level:level,
			downLimit:downLimit,
			upLimit:upLimit,
			content:content
		});
	}
	
	function changeRegionAndArea(area,hotspots,lng,lat){
		var iframe=$("#frame2")[0];
		var iframeWindow=iframe.window?iframe.window:iframe.contentWindow;
		iframeWindow.switchSceneGuard(hotspots[0],lat,lng,area);
		
		var iframe3=$("#frame3")[0];
		var iframeWindow3=iframe3.window?iframe3.window:iframe3.contentWindow;
		iframeWindow3.changeRegion(area,hotspots,lng,lat);
	}
	
	//定位小区
	function screen2_isReady(){
		
	};