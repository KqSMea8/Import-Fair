var COMMONCOMP=COMMONCOMP||{};


COMMONCOMP.TerminalChart=function ()
{
	this.initialize.apply(this,arguments);
};
COMMONCOMP.TerminalChart.prototype.constructor=COMMONCOMP.TerminalChart;
COMMONCOMP.TerminalChart.prototype.cdm=null;
COMMONCOMP.TerminalChart.prototype.hotspot='';
COMMONCOMP.TerminalChart.prototype.roamType='';
COMMONCOMP.TerminalChart.prototype.parentId='';
COMMONCOMP.TerminalChart.prototype.initialize=function(_parentId,_hotspot,_roamType){
	this.parentId=_parentId;
	this.cdm=LSMScreen.CacheDataManager.getInstance();
	this.updateBaseParam(_hotspot,_roamType);
};
COMMONCOMP.TerminalChart.prototype.updateBaseParam=function(_hotspot,_roamType){
	this.hotspot=_hotspot;
	this.roamType=_roamType;
	this.update();
}
COMMONCOMP.TerminalChart.prototype.update=function(){
	this.cdm.getIsmTerminalRank({hotspot:this.hotspot,roamType:this.roamType},this.drawTerminalRankChartBar.bind(this));
	
};

COMMONCOMP.TerminalChart.prototype.drawTerminalRankChartBar=function(result){
	var max=0;
	var html='';
	
	var total=0;
	var lastPercent=0;
	var maxBarWidth=$('#'+this.parentId).width()-300;
	var maxHeight=$('#'+this.parentId).height();
	var currentHeight=0;
	
	for(var i=0;i<result.length;i++){
		var record=result[i];
		var terminalCnt=record.device_count;
		var brand=record.terminal_brand;
		var model=record.terminal_model;
		var showName=record.terminal_brand;
		var showCnt=terminalCnt;//(terminalCnt/10000).toFixed(0);
		var rank=i+1;
		
		if(i==0){
			max=terminalCnt;
		}
		var barPercent=terminalCnt/max;
		if(lastPercent!=0&&lastPercent-barPercent>=0.5){
			barPercent+=0.5;
		}
		
		var barWidth=barPercent*maxBarWidth;
		var ratio=(terminalCnt/record.device_total_count*100).toFixed(2);
		var text_ratio=parseInt(ratio)+5;
		var rankColor='';
		var Color='';
		var rank_color='';
		if(rank==1){
			Color="icon-progress-one";
			rank_color="opacity: 0;"
		}else if(rank==2){
			Color="icon-progress-two";
			rank_color="opacity: 0;"
		}else if(rank==3){
			Color="icon-progress-three";
			rank_color="opacity: 0;"
		}else{
			rankColor="border: 1px solid #2287B3;background:#094372;";
		}
		if(model!=null){
			brand='';
			showName=model;
		}
		lastPercent=barPercent;
		var div='<div class="terminalRow" style="width:100%;height:35px;margin-top:20px;font-size:24px;cursor:pointer;" brand="'+brand+'">'
				+'<div class="'+Color+'" style="width:40px;height:40px;margin-left:10px;float:left;text-align:center;'+rankColor+'"><div style="text-align: center;    margin-top: -15px;'+rank_color+'">'+rank+'</div>\
				<div style="width:80px;height:35px;margin-left:40px;margin-top: -65px;">'+showName+'</div>\
				<div class="fl" style="width: 300px; height: 18px;margin-left: 120px; margin-top: -10px;">\
				<div class="index-progress">\
				<div class="progress'+(i+1)+'" style="width:'+ratio+'%"></div>\
				<div style="margin-top: -40px;text-align: left;margin-left:'+text_ratio+'%;"><span>'+terminalCnt+'</span></div></div></div></div>';
		div+='<div style="clear:both;"></div>';
		html+=div;
		currentHeight+=55;
		if(currentHeight+55>maxHeight){
			break;
		}
	}
	$('#'+this.parentId).html(html);

};














COMMONCOMP.AppGrid=function ()
{
	this.initialize.apply(this,arguments);
};
COMMONCOMP.AppGrid.prototype.constructor=COMMONCOMP.AppGrid;
COMMONCOMP.AppGrid.prototype.cdm=null;
COMMONCOMP.AppGrid.prototype.hotspot='';
COMMONCOMP.AppGrid.prototype.roamType='';
COMMONCOMP.AppGrid.prototype.parentId='';
COMMONCOMP.AppGrid.prototype.initialize=function(_parentId,_hotspot,_roamType){
	this.parentId=_parentId;
	this.cdm=LSMScreen.CacheDataManager.getInstance();
	this.updateBaseParam(_hotspot,_roamType);
	$('#'+this.parentId).addClass('appGridBody');
};
COMMONCOMP.AppGrid.prototype.updateBaseParam=function(_hotspot,_roamType){
	this.hotspot=_hotspot;
	this.roamType=_roamType;
	this.update();
}
COMMONCOMP.AppGrid.prototype.update=function(){
	this.cdm.getAppRank({hot_name:this.hotspot,roamType:this.roamType},this.drawAppRankTable.bind(this));
};
COMMONCOMP.AppGrid.prototype.drawAppRankTable=function(result){
	var list=result.data;
	var html='';
	for(var i=0;i<list.length&&i<5;i++){
		var record=list[i];
		var cls1='appGridDarkTd';
		var cls2='appGridLightTd';
		
		if(i%2==0){
			cls1='appGridDarkTd';
			cls2='appGridLightTd';
		}else{
			cls2='appGridDarkTd';
			cls1='appGridLightTd';
		}
		if(record.user_cnt==null){
			record.user_cnt='--';
		}
		if(record.bytes==null){
			record.bytes='--';
		}
		if(record.http_dlpage_gt500k_bytes==null){
			record.http_dlpage_gt500k_bytes='--';
		}
		var icon=SUtils.getAppIconPath(record.app_subtype_name);
		var url=BASEPATH+'/static/styles/local-lsm/app/'+icon;
		html+='<div class="fontSubInfo '+cls1+'" style="text-align:left;padding-left:20px;"><img src="'+url+'" style="margin-right:20px;"/>'+record.app_subtype_name+'</div>';
		html+='<div class="fontImportantInfo ciiekpistyle '+cls2+'">'+record.user_cnt+'</div>';
		html+='<div class="fontImportantInfo ciiekpistyle '+cls1+'">'+record.bytes+'</div>';
		html+='<div class="fontImportantInfo ciiekpistyle '+cls2+'">'+record.http_dlpage_gt500k_bytes+'</div>';
	}
	$('#'+this.parentId).html(html);
};




















COMMONCOMP.APPTOP=function ()
{
	this.initialize.apply(this,arguments);
};
COMMONCOMP.APPTOP.prototype.constructor=COMMONCOMP.APPTOP;
COMMONCOMP.APPTOP.prototype.cdm=null;
COMMONCOMP.APPTOP.prototype.hotspot='';
COMMONCOMP.APPTOP.prototype.roamType='';
COMMONCOMP.APPTOP.prototype.parentId='';
COMMONCOMP.APPTOP.prototype.initialize=function(_parentId,_hotspot,_roamType){
	this.parentId=_parentId;
	this.cdm=LSMScreen.CacheDataManager.getInstance();
	this.updateBaseParam(_hotspot,_roamType);
};
COMMONCOMP.APPTOP.prototype.updateBaseParam=function(_hotspot,_roamType){
	this.hotspot=_hotspot;
	this.roamType=_roamType;
	this.drawTerminalRankAPPTOP();
}
/*COMMONCOMP.APPTOP.prototype.update=function(){
	this.cdm.getHotspotrank({ids:this.hotspot,roamType:this.roamType},this.drawTerminalRankAPPTOP.bind(this));
};*/

COMMONCOMP.APPTOP.prototype.drawTerminalRankAPPTOP=function(result){
	var result=Situation.top_result;
	if(result.length>0){
		result=result;
	}else{
		result=overviewright2.top();
	}
	var max=0;
	var html='';
	result=result;
	
	var total=0;
	var lastPercent=0;
	var maxBarWidth=$('#'+this.parentId).width()-300;
	var maxHeight=$('#'+this.parentId).height();
	var currentHeight=0;
	var Total=0;
	for(var g=0;g<result.length;g++){
		var record=result[g];
		Total +=record.总用户数
	}
	for(var i=0;i<result.length;i++){
		var record=result[i];
		var terminalCnt=record.总用户数;
		var brand=record.terminal_brand;
		var model=record.element;
		var showName=record.terminal_brand;
		var showCnt=terminalCnt;//(terminalCnt/10000).toFixed(0);
		var rank=i+1;
		
		if(i==0){
			max=terminalCnt;
		}
		var barPercent=terminalCnt/max;
		if(lastPercent!=0&&lastPercent-barPercent>=0.5){
			barPercent+=0.5;
		}
		var barWidth=barPercent*maxBarWidth;
		var ratio=0;
		if(terminalCnt>0){
			ratio=(terminalCnt/Total*100).toFixed(2);
		}else{
			ratio=0;
		}
		var text_ratio=parseInt(ratio)+5;
		var rankColor='';
		var Color='';
		var margin_top=30;
		var rank_color='';
		if(rank==1){
			margin_top=10;
			Color="icon-progress-one";
			rank_color="opacity: 0;"
		}else if(rank==2){
			Color="icon-progress-two";
			rank_color="opacity: 0;"
		}else if(rank==3){
			Color="icon-progress-three";
			rank_color="opacity: 0;"
		}else{
			rankColor="border: 1px solid #2287B3;background:#094372;";
		}
		if(model!=null){
			brand='';
			showName=model;
		}
		lastPercent=barPercent;
		var div='<div class="terminalRow" style="width:100%;margin-top:'+margin_top+'px;font-size:24px;cursor:pointer;" brand="'+brand+'">'
				+'<div class="'+Color+'" style="width:40px;margin-left:20px;height:40px;float:left;text-align:center;'+rankColor+'"><div style="text-align: center;'+rank_color+'">'+rank+'</div>\
				<div style="width:120px;height:40px;margin-left:30px;margin-top: -30px;">'+showName+'</div>\
				<div class="fl" style="width: 500px; height: 13px;margin-left: 140px; margin-top: -30px;" id="'+showName+'" onclick="top_click(this)">\
				<div class="index-progress">\
				<div class="progress'+(i+1)+'" style="width:'+ratio+'%"></div>\
				<div style="margin-top: -20px;text-align: left;margin-left:'+text_ratio+'%;"><span>'+ratio+'%</span></div></div></div></div>';
		div+='<div style="clear:both;"></div></div>';
		html+=div;
		currentHeight+=55;
		if(currentHeight+55>maxHeight){
			break;
		}
	}
	$('#'+this.parentId).html(html);
};