var MetroScreenNew = MetroScreenNew || {};
MetroScreenNew.ScreenControllerNew=function (stationTypeMap){
	this.lineStationGridHeight=875;
	this.cellGridHeight=390;
	this.cellTopN=6;
	this.stationTypeMap=stationTypeMap;
	this.initialize.apply(this, arguments);
};
MetroScreenNew.ScreenControllerNew.prototype=Object.create(MetroScreenNew.ScreenController.prototype);
MetroScreenNew.ScreenControllerNew.prototype.constructor=MetroScreenNew.ScreenControllerNew;


MetroScreenNew.ScreenControllerNew.prototype.initComponents=function(){
	this.businessFirstColWidth=115;
	$("#subtitleSpan").on('click',this.lineKpiWinHandler.bind(this));
	$("#mainReturnBtn").on("click",this.returnMainHotspot.bind(this));
	$("#terminalReturnBtn").on("click",this.terminalReturnBrand.bind(this));
	$("#expandBtn").on('click',this.changeDetailShow.bind(this));
	$(".Lnorm1").on('click',this.showMainSpotCompareChart.bind(this));
	$(".kpiType").on('click',this.kpiTypeChange.bind(this));
	$(".cellType").on('click',this.cellTypeChange.bind(this));
	$("#businessGridColConfig").on('click',this.updateHotspotColConfig.bind(this));
	$("#worstCellGridColConfig").on('click',this.updateCellColConfig.bind(this));
	
	
	this.businessChart=new LSMScreen.SimpleChart($("#businessChart")[0],{},function(){
		this.customerCompareChart=new LSMScreen.SimpleChart($("#customerCompareChart")[0],{},function(){
			this.trafficFlowCompareChart=new LSMScreen.SimpleChart($("#trafficFlowCompareChart")[0],{},function(){
				this.flowCompareChart=new LSMScreen.SimpleChart($("#flowCompareChart")[0],{},function(){
					
					this.update();
					
				}.bind(this));
			}.bind(this));
		}.bind(this));
		this.businessChart.gobackPasser=this.terminalReturnBrand.bind(this);
	}.bind(this));
};



MetroScreenNew.ScreenControllerNew.prototype.updateTerminalChart=function(brand,hotspot){
};
MetroScreenNew.ScreenControllerNew.prototype.updateAppGrid=function(){
};