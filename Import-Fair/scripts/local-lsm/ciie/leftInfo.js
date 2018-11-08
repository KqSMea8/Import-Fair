var CIIE=CIIE||{};

CIIE.LeftInfo=function ()
{
	this.initialize.apply(this,arguments);
};
CIIE.LeftInfo.prototype.constructor=CIIE.LeftInfo;
CIIE.LeftInfo.prototype.hotspot=null
CIIE.LeftInfo.prototype.dm=null
CIIE.LeftInfo.prototype.initialize=function(_hotspot){
	this.hotspot=_hotspot;
	this.dm=LSMScreen.DataManager.getInstance();
	this.update();
};


CIIE.LeftInfo.prototype.update=function(){
	this.dm.getHotSpotsKpis([this.hotspot],null,null,this.streamInfoHandler.bind(this));
	this.dm.getCellsByHotspot({hotspot:this.hotspot},this.cellInfoHandler.bind(this));
	this.dm.getEmerCarByHotspotsPost({hot_name:this.hotspot},this.carInfoHandler.bind(this));
	
};

CIIE.LeftInfo.prototype.streamInfoHandler=function(result){
	var record=result[this.hotspot];
	var user=record['总用户数'];
	var flow=(record['总流量']/1024/1024).toFixed(2);
	var ratioU4G=(record['4G用户数']/record['总用户数']*100).toFixed(2);
	var ratioF4G=(record['4G流量']/record['总流量']*100).toFixed(2);
	$('#left_user_value').text(user);
	$('#left_flow_value').text(flow);
	
	$('#left_user_bar').width(ratioU4G+'%');
	$('#left_flow_bar').width(ratioF4G+'%');
	
};
CIIE.LeftInfo.prototype.cellInfoHandler=function(result){
	var count2g=0;
	var count4g=0;
	for(var i=0;i<result.length;i++){
		var record=result[i];
		if(record.cell_nt=='2G'){
			count2g++;
		}else if(record.cell_nt=='4G'){
			count4g++;
		}
	}
	
	$('#left_2g_count').text(count2g);
	$('#left_4g_count').text(count4g);
	
};

CIIE.LeftInfo.prototype.carInfoHandler=function(result){
	var list=result.data;
	var count=list.length;
	$('#left_emer_car_count').text(count);
};
