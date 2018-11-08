var MAPTIP=MAPTIP||{};

function showApList(hh,state){
	if(state==null){
		state='';
	}
	//$('#acListFrame').attr('src','');
	//$('#acListWin').show();
	//$('#acListFrame').attr('src','aplist.jsp?hall='+encodeURIComponent(hh)+'&state='+encodeURIComponent(state));
	
	parent.showAPList(hh,state);
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
	this.initApTable();
};
MAPTIP.ACAP.prototype.initWifiTable=function(){
	var colNames=['场馆','在线AP数(个)','用户数(人)','上行流量(GB)','下行流量(GB)'];
	var colModel=[
	    {colName:'hh',name : 'hh',index : 'hh',width:180,sortable:true},//,width:
	    {colName:'ol_ap_cnt',name : 'ol_ap_cnt',index : 'ol_ap_cnt',width:200,sortable:true,formatter:function(cellValue,model,data){
	    	return '<span style="cursor:pointer;text-decoration:underline;" onclick="showApList(\''+data.hh+'\')">'+cellValue+'</span>';
	    }},
	    {colName:'ol_user_cnt',name : 'ol_user_cnt',index : 'ol_user_cnt',width:200,sortable:true},
	    {colName:'input',name : 'input',index : 'input',width:200,sortable:true},
	    {colName:'output',name : 'output',index : 'output',sortable:true}
	];
	var opt1={
	        datatype : function(){},
	        colNames:colNames,
	        colModel : colModel,
	        loadui:'disable',
	        width:'100%',
	        height:780,//560
	        rowNum:3000,
	        autowidth: true,
	        shrinkToFit: true
		};
	
	$('#table0').jqGrid(opt1);
};
MAPTIP.ACAP.prototype.initApTable=function(){
	var colNames=['场馆','正常AP','轻负荷AP','高负荷AP','故障AP'];
	var colModel=[
	    {colName:'hh',name : 'hh',index : 'hh',width:180,sortable:true},//,width:
	    {colName:'zc_cnt',name : 'zc_cnt',index : 'zc_cnt',width:200,sortable:true,formatter:function(cellValue,model,data){
	    	return '<span style="cursor:pointer;text-decoration:underline;" onclick="showApList(\''+data.hh+'\',\'正常\')">'+cellValue+'</span>';
	    }},
	    {colName:'qfh_cnt',name : 'qfh_cnt',index : 'qfh_cnt',width:200,sortable:true,formatter:function(cellValue,model,data){
	    	return '<span style="cursor:pointer;text-decoration:underline;" onclick="showApList(\''+data.hh+'\',\'轻负荷\')">'+cellValue+'</span>';
	    }},
	    {colName:'gfh_cnt',name : 'gfh_cnt',index : 'gfh_cnt',width:200,sortable:true,formatter:function(cellValue,model,data){
	    	return '<span style="cursor:pointer;text-decoration:underline;" onclick="showApList(\''+data.hh+'\',\'高负荷\')">'+cellValue+'</span>';
	    }},
	    {colName:'lx_cnt',name : 'lx_cnt',index : 'lx_cnt',sortable:true,formatter:function(cellValue,model,data){
	    	return '<span style="cursor:pointer;text-decoration:underline;" onclick="showApList(\''+data.hh+'\',\'离线\')">'+cellValue+'</span>';
	    }}
	];
	var opt1={
	        datatype : function(){},
	        colNames:colNames,
	        colModel : colModel,
	        loadui:'disable',
	        width:'100%',
	        height:780,//560
	        rowNum:3000,
	        autowidth: true,
	        shrinkToFit: true
		};
	
	$('#table1').jqGrid(opt1);
};

MAPTIP.ACAP.prototype.update=function(){
	this.updateWifiTable();
	this.updateApTable();
};

MAPTIP.ACAP.prototype.updateWifiTable=function(){
	this.cdm.getWifiQuality({},this.wifiDataHandler.bind(this));
};
MAPTIP.ACAP.prototype.wifiDataHandler=function(result){
	var list=result.data;
	$('#table0')[0].addJSONData(list);
};
MAPTIP.ACAP.prototype.updateApTable=function(){
	this.cdm.getApQuality({},this.apDataHandler.bind(this));
};
MAPTIP.ACAP.prototype.apDataHandler=function(result){
	var list=result.data;
	$('#table1')[0].addJSONData(list);
};

