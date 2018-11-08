function setDivMovable(dom){
	$(dom).on('mousedown',function(e){
		$(dom).parent().on('mousemove',function(e){
			var left=e.offsetX;
			var top=e.offsetY;
			$(dom).css('left',left);
			$(dom).css('top',top);
		});
		$(dom).parent().on('mouseup',function(e){
			$(dom).parent().off('mousemove');
			$(dom).parent().off('mouseup');
		});
		//$(document).off('')
	});
	
}