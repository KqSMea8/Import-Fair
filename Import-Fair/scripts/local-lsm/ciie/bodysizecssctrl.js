var WINDOWRESIZE_EVENT_ON=false;
var ZOOM_BASE_WIDTH=2000;
var ZOOM_BASE_HEIGHT=1300;
function checkBodySize(){
	var xfont=$('body').width()/1920*16;
	console.log('xfont:'+xfont);
	$('body').css('font-size',xfont);
	$('body').height($('body').width()/16*9);
}

function zoomPage(baseWidth,baseHeight,forceFit){
	//zoomTitle();
	$('html').css('overflow','hidden');
	var width=$('html').width();
	var height=$('html').height();
	var scaleW=width/baseWidth;
	var scaleH=height/baseHeight;
//	if(forceFit!=true){
//		var scale=Math.min(scaleW,scaleH);
//		scaleW=scaleH=scale;
//	}
	
	$('html').css('transform','scale('+scaleW+','+scaleH+')');
	$('html').css('-ms-transform','scale('+scaleW+','+scaleH+')');
	$('html').css('-webkit-transform','scale('+scaleW+','+scaleH+')');
	
	
//	$('.modal').css('transform','scale('+scaleW+','+scaleH+')');
//	$('.modal').css('-ms-transform','scale('+scaleW+','+scaleH+')');
//	$('.modal').css('-webkit-transform','scale('+scaleW+','+scaleH+')');
	 
//	$('.modal').css('width','100%');
//	$('.modal').css('height','100%');
//	
//	$('.modal-dialog').css('width','100%');
//	$('.modal-dialog').css('height','100%');
	
	/*$('.modal-dialog').css('transform','scale('+scaleW+','+scaleH+')');
	$('.modal-dialog').css('-ms-transform','scale('+scaleW+','+scaleH+')');
	$('.modal-dialog').css('-webkit-transform','scale('+scaleW+','+scaleH+')');*/
	
//	$('.modal-content').css('transform','scale('+scaleW+','+scaleH+')');
//	$('.modal-content').css('-ms-transform','scale('+scaleW+','+scaleH+')');
//	$('.modal-content').css('-webkit-transform','scale('+scaleW+','+scaleH+')');
//	
//	$('.modal-header').css('transform','scale('+scaleW+','+scaleH+')');
//	$('.modal-header').css('-ms-transform','scale('+scaleW+','+scaleH+')');
//	$('.modal-header').css('-webkit-transform','scale('+scaleW+','+scaleH+')');
//	
//	$('.modal-body>div').css('transform','scale('+scaleW+','+scaleH+')');
//	$('.modal-body>div').css('-ms-transform','scale('+scaleW+','+scaleH+')');
//	$('.modal-body>div').css('-webkit-transform','scale('+scaleW+','+scaleH+')');
//	
//	$('.modal-footer').css('transform','scale('+scaleW+','+scaleH+')');
//	$('.modal-footer').css('-ms-transform','scale('+scaleW+','+scaleH+')');
//	$('.modal-footer').css('-webkit-transform','scale('+scaleW+','+scaleH+')');
	
	
	var st=(baseHeight-height)/2*scaleH;
	var sl=(baseWidth-width)/2*scaleW;
	console.log('bodysizecssctrl:scrollTop='+st);
	$('html').css('margin-top',-st);
	//$('html').scrollTop(st);
	//$('html').scrollLeft(-sl);
	$('html').css('margin-left',-sl);
	
	/*$('.modal-dialog').css('margin-top',-st);
	$('.modal-dialog').css('margin-left',-sl);*/
	
	if(WINDOWRESIZE_EVENT_ON==false){
		WINDOWRESIZE_EVENT_ON=true;
		ZOOM_BASE_WIDTH=baseWidth;
		ZOOM_BASE_HEIGHT=baseHeight;
		$(window).on('resize',windowResize);
	}
	
}

function windowResize(e){
	zoomPage(ZOOM_BASE_WIDTH,ZOOM_BASE_HEIGHT);
}

function zoomPage2(baseWidth,baseHeight){
	//zoomTitle();
	var width=$('html').width();
	var height=$('html').height();
	
	var scaleW=width/baseWidth;
	var scaleH=height/baseHeight;
	
	$('html').css('transform','scale('+scaleW+','+scaleH+')');
	$('html').css('-ms-transform','scale('+scaleW+','+scaleH+')');
	$('html').css('-webkit-transform','scale('+scaleW+','+scaleH+')');
	
	$('html').css('overflow','hidden');
	$('html').scrollTop((baseHeight-height)/2*scaleH);
	$('html').scrollLeft((baseWidth-width)/2*scaleW);
	
	
	
}