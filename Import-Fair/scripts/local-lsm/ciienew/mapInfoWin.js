var CIIE=CIIE||{};

CIIE.MapInfoWin=function ()
{
	this.initialize.apply(this,arguments);
};
CIIE.MapInfoWin.prototype.constructor=CIIE.MapInfoWin;

CIIE.MapInfoWin.prototype.winId='';
CIIE.MapInfoWin.prototype.title='';
CIIE.MapInfoWin.prototype.closeFunc=null;
CIIE.MapInfoWin.prototype.parentDom=null;

CIIE.MapInfoWin.prototype.initialize=function(_title,parentDom,_closeFunc){
	this.winId=Math.uuid();
	this.title=_title;
	this.closeFunc=_closeFunc;
	this.parentDom=parentDom;
	var win='<div id="'+this.winId+'" class="map-info-win" style="display:none;margin-top:15px;top:0px;left:0px;position:relative;">'
		+'<div class="map-info-win-bg"></div>'
		+'<div class="map-info-win-title">'
			+'<div>'+_title+'</div>'
			+'<div id="'+this.winId+'_close" class="map-icon-close" style="position:absolute;right:5px;top:5px;"></div>'
			//+'<div id="'+this.winId+'_ctrl" class="map-icon-min" style="position:absolute;right:55px;top:5px;"></div>'
		+'</div>'
		+'<div id="'+this.winId+'_content" class="map-info-win-content" style="pointer-events:none;"></div>'
	+'</div>';
	
	$(parentDom).append(win);
	$('#'+this.winId+'_close').on('click',this.close.bind(this));
	$('#'+this.winId+'_ctrl').on('click',this.ctrl.bind(this));
	$('#'+this.winId).on('dblclick',this.zoomInfoWin.bind(this));
};
CIIE.MapInfoWin.prototype.zoomInfoWin=function(e){
	if($('#'+this.winId).attr('isMax')=='true'){
		$($('#'+this.winId)).prependTo(this.parentDom);
		$('#'+this.winId).width($('#'+this.winId).attr('originWidth'));
		$('#'+this.winId).height($('#'+this.winId).attr('originHeight'));
		$('#'+this.winId).attr('isMax','false');
		$('#'+this.winId).css('position','relative');
		$('#'+this.winId).css('top','0');
		$('#'+this.winId).css('left','0');
		$('#'+this.winId).find('td').css('font-size','20px');
		$('#'+this.winId+'_content').find('img').attr('width','25');
		$('#'+this.winId+'_content').find('img').attr('height','25');
	}else{
		var width=$('#'+this.winId).parent().parent().width()*0.5;
		var height=$('#'+this.winId).parent().parent().height()*0.5;
		$('#'+this.winId).attr('originWidth',$('#'+this.winId).width());
		$('#'+this.winId).attr('originHeight',$('#'+this.winId).height());
		$('#'+this.winId).width(width);
		$('#'+this.winId).height(height);
		$('#'+this.winId).attr('isMax','true');
		$('#'+this.winId).css('position','absolute');
		$('#'+this.winId).css('top','150px');
		$('#'+this.winId).css('left','150px');
		$('#'+this.winId).find('td').css('font-size','48px');
		$('#'+this.winId+'_content').find('img').attr('width','50');
		$('#'+this.winId+'_content').find('img').attr('height','50');
		$('#'+this.winId).parent().parent().append($('#'+this.winId));
	}
	
};
CIIE.MapInfoWin.prototype.setContentHtml=function(html){
	$('#'+this.winId+'_content').html(html);
};

CIIE.MapInfoWin.prototype.show=function(){
	$('#'+this.winId).css('display','block');
};
CIIE.MapInfoWin.prototype.hide=function(){
	$('#'+this.winId).css('display','none');
};
CIIE.MapInfoWin.prototype.close=function(){
	this.hide();
	if(this.closeFunc!=null){
		this.closeFunc.apply(this,[this.title]);
	}
};
CIIE.MapInfoWin.prototype.ctrl=function(e){
	var cls=$(e.currentTarget).attr('class');
	if(cls=='map-icon-min'){
		$(e.currentTarget).attr('class','map-icon-normal');
	}else if(cls=='map-icon-normal'){
		$(e.currentTarget).attr('class','map-icon-min');
	}
};