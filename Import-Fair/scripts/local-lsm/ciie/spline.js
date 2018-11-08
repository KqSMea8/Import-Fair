var CIIE=CIIE||{};

CIIE.Spline=function ()
{
	this.initialize.apply(this,arguments)
};
CIIE.Spline.prototype.constructor=CIIE.Spline;

CIIE.Spline.prototype.hotspot=null;
CIIE.Spline.prototype.dm=null;

CIIE.Spline.prototype.fakeRecords=[
{'故障告警':1,'业务编号':'90021312','电路名称':'上海青浦-上海嘉定<br>FE0063KA/NP','电路类型':'省内电路','A端':'上海','Z端':'上海'},
{'故障告警':1,'业务编号':'90021312','电路名称':'上海青浦-上海嘉定<br>FE0063KA/NP','电路类型':'省内电路','A端':'上海','Z端':'上海'},
{'故障告警':1,'业务编号':'90021312','电路名称':'上海青浦-上海嘉定<br>FE0063KA/NP','电路类型':'省内电路','A端':'上海','Z端':'上海'},
{'故障告警':1,'业务编号':'90021312','电路名称':'上海青浦-上海嘉定<br>FE0063KA/NP','电路类型':'省内电路','A端':'上海','Z端':'上海'},
{'故障告警':1,'业务编号':'90021312','电路名称':'上海青浦-上海嘉定<br>FE0063KA/NP','电路类型':'省内电路','A端':'上海','Z端':'上海'},
{'故障告警':1,'业务编号':'90021312','电路名称':'上海青浦-上海嘉定<br>FE0063KA/NP','电路类型':'省内电路','A端':'上海','Z端':'上海'}		
];
CIIE.Spline.prototype.fakeLine=[
{type:'SDH',name:'上海青浦传输层'},
{type:'SDH',name:''},
{type:'LINE',name:'上海青浦-上海嘉定FE0063KA/NP',id:'90021312'},
{type:'SDH',name:''},
{type:'SDH',name:'上海青浦传输层'}
];
CIIE.Spline.prototype.initialize=function(_hotspot){
	//var fontCalculate=
	//$('body').css('font-size',8);
	this.hotspot=_hotspot;
	this.dm=LSMScreen.DataManager.getInstance();
	
	this.initTable();
	this.drawTopo();
	
	this.update();
};
CIIE.Spline.prototype.update=function(){
	this.dm.getLineInfoList({hotspot:this.hotspot},this.lineDataHandler.bind(this));
};
CIIE.Spline.prototype.lineDataHandler=function(result){
	$('#splineList')[0].addJSONData(result);
};
CIIE.Spline.prototype.initTable=function(){
	var colNames=['','故障告警','业务编号','电路名称','电路类型','A端','Z端'];
	var colModel=[
	    {colName:'time',name : 'time',index : 'time',hidden:true},
	    {colName:'time0',name : 'time0',index : 'time0',align:'center',formatter:function(cellvalue,config,rowData){
	    	var size=3.5;
	    	if(rowData.time!=null&&rowData.time!='null'){
	    		return '<div style="margin-left:0.5em;width:'+size+'em;height:'+size+'em;border-radius:'+size+'em;background:#ff1515;border:solid 0.5em #ff0000;"></div>';
	    	}else{
	    		return '<div style="margin-left:0.5em;width:'+size+'em;height:'+size+'em;border-radius:'+size+'em;background:#3aff20;border:solid 0.5em #00ff00;"></div>';
	    	}
	    }},
	    {colName:'line_id',name : 'line_id',index : 'line_id'},
	    {colName:'alarm_object',name : 'alarm_object',index : 'alarm_object'},
	    {colName:'line_type',name : 'line_type',index : 'line_type'},
	    {colName:'line_addr',name : 'line_addr',index : 'line_addr'},
	    {colName:'Z端',name : 'Z端',index : 'Z端'}
	];
	var opt1={
	        datatype : function(){},
	        colNames:colNames,
	        colModel : colModel,
	        loadui:'disable',
	        width:'100%',
	        height:'100%',
	        autowidth: true,
	        shrinkToFit: true,
	        onSelectRow:function(id,col,evt){
	        	var rowData=$("#splineList").getRowData(id);
	        	if(rowData.time!=null&&rowData.time!='null'){
	        		$('#modalWin').modal();
	        		$('#modalWinBody').html(
	        			 '<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;告警对象:'+rowData.alarm_caption+'</div>'
	        			+'<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;告警标题:'+rowData.alarm_object+'</div>'
	        			+'<div>告警发生时间:'+rowData.time+'</div>'
	        		);
		    	}
	        }
		};
	
	$('#splineList').jqGrid(opt1);
	//$('#splineList')[0].addJSONData(this.fakeRecords);
};



CIIE.Spline.prototype.drawTopo=function(){
	var lineComps=this.fakeLine;
	var comps=lineComps.length;
	var html='';
	var nodeWidthPer=7;
	var baseLeftPer=5;
	var lineWidthPer=22;
	var linkWidthPer=10;
	var left=baseLeftPer;
	$('#topoParent').html('');
	for(var i=0;i<comps;i++){
		var record=lineComps[i];
		var type=record.type;
		var name=record.name;
		var node='';
		
		if(type=='LINE'){
			var id=record.id;
			node='<div class="topoNode" style="width:'+lineWidthPer+'%;height:40%;top:20%;left:'+left+'%;">'
	    		+'<div class="topoComp">'
		    		+'<div class="device">'
			    		+'<div class="topoLabel">'+name+'</div>'
		    		+'</div>'
	    		+'</div>'
	    		+'<div class="topoLabel">'+id+'</div>'
    		+'</div>';
			left+=lineWidthPer+linkWidthPer;
		}else{
			node='<div class="topoNode" style="left:'+left+'%;">'
		    		+'<div class="topoComp">'
			    		+'<div class="device">'
				    		+'<div class="'+type+'"></div>'
				    		+'<div class="topoLabel">'+type+'</div>'
			    		+'</div>'
		    		+'</div>'
		    		+'<div class="topoLabel">'+name+'</div>'
	    		+'</div>';
			left+=nodeWidthPer+linkWidthPer;
		}
		html+=node;
		if(i<comps-1){
			var link='<div style="position:absolute;left:'+(left-linkWidthPer)+'%;top:40%;width:'+linkWidthPer+'%;height:1px;border:solid 2px #525cc5;"></div>';
			html+=link;
		}
	}
	$('#topoParent').html(html);
};
