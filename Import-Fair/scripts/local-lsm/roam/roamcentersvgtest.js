var CIIENEW=CIIENEW||{};
CIIENEW.Roam=function ()
{
	this.initialize.apply(this,arguments);
};
CIIENEW.Roam.prototype.constructor=CIIENEW.Roam;
CIIENEW.Roam.prototype.hotspot='进出口博览会';
CIIENEW.Roam.prototype.dm=null;
CIIENEW.Roam.prototype.cdm=null;
CIIENEW.Roam.prototype.hotspotList=[];
CIIENEW.Roam.prototype.startIndex=0;
CIIENEW.Roam.prototype.selectedHot=null;
CIIENEW.Roam.prototype.lineWidth=3;
CIIENEW.Roam.prototype.chartLabelSize=24;
CIIENEW.Roam.prototype.polygonMap={
	'美国':'polygon1236,polygon133',
	'新加坡':'polygon526',
	'台湾':'polygon290',
	'日本':'polygon322',
	'德国':'polygon698',
	'澳洲':'polygon895',
	'英国':'polygon728,711',
	'中国':'polygon291'
};

CIIENEW.Roam.prototype.initialize=function(_hotspot){
	if(_hotspot!=null){
		this.hotspot=_hotspot;
	}
	this.dm=LSMScreen.DataManager.getInstance();
	this.cdm=LSMScreen.CacheDataManager.getInstance();
	
	
	//$('text').text('');
	//$('polygon').css('fill','#224ba3');
	//$('path').css('fill','#224ba3');
	//$('.cls-5').css('fill','#ff0000');
	
	var list0=$('polygon');
	var list1=$('path');
	
	for(var i=0;i<list0.length;i++){
		$(list0[i]).attr('id','polygon'+i);
	}
	for(var i=0;i<list1.length;i++){
		$(list1[i]).attr('id','path'+i);
	}
	
	//$('text').text('');
	
	$('polygon').on('click',function(e){alert($(e.currentTarget).attr('id'))});
	$('path').on('click',function(e){alert($(e.currentTarget).attr('id'))});
	 
//	$('polygon').css('fill','#224ba3');
//	$('path').css('fill','#224ba3');
	
//	$('polygon').css('fill','rgba(61,117,227,0.55)');
//	$('path').css('fill','rgba(61,117,227,0.55)');
//	
//	$('#polygon728').css('fill','rgba(151,229,255,0.45)');
//	$('#polygon728').css('border','solid 1px #142f6f');
	
	
	//this.update();
	//setInterval(this.update.bind(this),60*1000);
	
};
	

CIIENEW.Roam.prototype.update=function(){
	this.cdm.getIntlRoamTopN({},this.drawWorldChart.bind(this));
};

CIIENEW.Roam.prototype.drawWorldChart=function(result){
	var list=result.data;
	var map=this.polygonMap;
	var colorList=[];
	for(var i=0;i<list.length;i++){
		var record=list[i];
		var name=record.intl_name.split('(')[0];
		var value=record.user_cnt;
		if(map[name]!=null){
			var polygonIds=map[name];
			var tmp=polygonIds.split(',');
			for(var j=0;j<tmp.length;j++){
				$('#'+tmp[j]).css('fill','#ff0000');
			}
		}
	}
};