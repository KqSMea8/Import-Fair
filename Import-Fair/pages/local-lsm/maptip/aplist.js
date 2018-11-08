var MAPTIP=MAPTIP||{};
MAPTIP.APLIST=function ()
{
	this.initialize.apply(this,arguments);
};
MAPTIP.APLIST.prototype.constructor=MAPTIP.APLIST;
MAPTIP.APLIST.prototype.hall=null;
MAPTIP.APLIST.prototype.state=null;
MAPTIP.APLIST.prototype.initialize=function(_hall,_state){
	this.hall=_hall;
	this.state=_state;
	this.cdm=LSMScreen.CacheDataManager.getInstance();
	this.initTable();
	this.update();
};
MAPTIP.APLIST.prototype.initTable=function(){
	var colNames=['所属场馆','AP','用户数','状态'];
	var colModel=[
	    {colName:'hh',name : 'hh',index : 'hh',width:200,sortable:true},
	    {colName:'ap_name',name : 'ap_name',index : 'ap_name',width:180,sortable:true},//,width:
	    {colName:'ol_cnt',name : 'ol_cnt',index : 'ol_cnt',width:200,sortable:true},
	    {colName:'state',name : 'state',index : 'state',width:200,sortable:true,formatter:function(cellValue){
	    	var result='';
	    	switch(cellValue){
		    	case '离线':
		    		result='<span style="color:white;">'+cellValue+'</span>';
		    		break;
		    	case '高负荷':
		    		result='<span style="color:#ff933c;">'+cellValue+'</span>';
		    		break;
		    	case '轻负荷':
		    		result='<span style="color:#fff066;">'+cellValue+'</span>';
		    		break;
		    	default:
		    		result=cellValue;
		    		break;
	    	}
	    	return result;
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
	
	$('#table2').jqGrid(opt1);
};

MAPTIP.APLIST.prototype.update=function(){
	this.cdm.getApList({hh:this.hall,state:this.state},this.apListDataHandler.bind(this));
};

MAPTIP.APLIST.prototype.apListDataHandler=function(result){
	var list=result.data;
	$('#table2')[0].addJSONData(list);
};

