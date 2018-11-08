var MAPTIP=MAPTIP||{};

function showCellDetail(rowObj){
	var cellName = rowObj.cellName;
	var netType = rowObj.netType;
	var lacci = rowObj.lacci;

	parent.showCellDetail(cellName,netType,lacci);
}


MAPTIP.ACAP=function ()
{
	this.initialize.apply(this,arguments);
};
MAPTIP.ACAP.prototype.constructor=MAPTIP.ACAP;
MAPTIP.ACAP.prototype.lineWidth=3;
MAPTIP.ACAP.prototype.chartLabelSize=24;
MAPTIP.ACAP.prototype.customers_num=null;

MAPTIP.ACAP.prototype.initialize=function(){
	$("#popuptitle").text(number_id);


	this.cdm=LSMScreen.CacheDataManager.getInstance();
	$('.map-info-tab').on('click',this.changeTab.bind(this));
	$('#acListpClose').on('click',this.closeApList.bind(this));
	this.initTable();
	this.update();
	setInterval(this.update.bind(this),5*60*1000);
};
MAPTIP.ACAP.prototype.closeApList=function(e){
	$('#acListWin').hide();
};
MAPTIP.ACAP.prototype.changeTab=function(e){
	var target=$(e.currentTarget).attr('target');
	$('.map-info-tab').removeClass('map-info-tab-selected');
	$(e.currentTarget).addClass('map-info-tab-selected');
	if(target=='wifi'){
		$('#apDiv').hide();
		$('#wifiDiv').show();
	}else if(target=="ap"){
		$('#wifiDiv').hide();
		$('#apDiv').show();
		this.initApTable();
	}
};
MAPTIP.ACAP.prototype.initTable=function(){
	this.initWifiTable();
};
MAPTIP.ACAP.prototype.initWifiTable=function(){
	var colModel=[
	    {label:"小区名称",name : 'cellName',index : 'cellName',width:180,sortable:true},//,width:
	    {label:"网络类型",name : 'netType',index : 'netType',width:200,sortable:true},
	    {label:"LAC-CI",name : 'lacci',index : 'lacci',width:200,sortable:true}
	    // {label:"",colName:'ol_ap_cnt',name : 'ol_ap_cnt',index : 'ol_ap_cnt',width:200,sortable:true,formatter:function(cellValue,model,data){
	    // 	return '<span style="cursor:pointer;text-decoration:underline;" onclick="showCellDetail(\''+data.hh+'\')">'+cellValue+'</span>';
	    // }},
	];
	var opt1={
	        datatype : function(){},
	        //colNames:colNames,
	        colModel : colModel,
	        loadui:'disable',
	        width:'100%',
	        height:780,//560
	        rowNum:3000,
	        autowidth: true,
	        shrinkToFit: true,
	        ondblClickRow:function(rowid,iRow,iCol,e){
	            var rowObj = $('#table0').jqGrid('getRowData',rowid);
	            showCellDetail(rowObj);
	        }
		};
	
	$('#table0').jqGrid(opt1);
};







MAPTIP.ACAP.prototype.update=function(){
	this.updateWifiTable();
};

MAPTIP.ACAP.prototype.updateWifiTable=function(){
	this.cdm.getWifiQuality({},this.wifiDataHandler.bind(this));
};
MAPTIP.ACAP.prototype.wifiDataHandler=function(result){
	//var list=result.data;
	var list = [
				{cellName:'国家会展中心A0NL19W_43',netType:'4G',lacci:'101097:43'},
				{cellName:'国家会展中心D0NG5_1',netType:'2G',lacci:'6152:38114'}
	];
	$('#table0')[0].addJSONData(list);
};





