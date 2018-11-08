var CIIENEW=CIIENEW||{};
CIIENEW.NavigatorSingle=function ()
{
	this.initialize.apply(this,arguments);
};
CIIENEW.NavigatorSingle.prototype=Object.create(CIIENEW.Navigator.prototype);
CIIENEW.NavigatorSingle.prototype.constructor=CIIENEW.NavigatorSingle;
CIIENEW.NavigatorSingle.prototype.initItems=function(){
	for(var i=0;i<this.ciieMenuLv1PCList.length;i++){
		this.appendItem(this.ciieMenuLv1PCList[i]);
	}
	this.noClickMap=this.ciieMenuLv2SubListMap;
	this.appendItem('返回登录');
	this.submenu=document.createElement("div");
	$(this.submenu).css('display','none');
	$(this.submenu).attr('class','ciienavibg');
	$('body').append(this.submenu);
	var subLeft=360;
	$(this.submenu).css('left',subLeft);
	
//	this.appendItem('ciiel','区域导航',this.basePath+'/pages/local-lsm/ciienew/ciieleft.jsp');
//	this.appendItem('ciiec','场馆GIS',this.basePath+'/pages/local-lsm/ciienew/ciiecenter.jsp');
//	this.appendItem('ciier','场馆概览',this.basePath+'/pages/local-lsm/ciienew/ciieright.jsp');
//	this.appendItem('roaml','漫游概览',this.basePath+'/pages/local-lsm/roam/roamleft.jsp');
//	//this.appendItem('roamc','漫游GIS',this.basePath+'/pages/local-lsm/roam/roamcentersvg.jsp');
//	this.appendItem('roamr','漫游分析',this.basePath+'/pages/local-lsm/roam/roamright.jsp');
	
	
};
CIIENEW.NavigatorSingle.prototype.lv1mouseover=function(e){
	var menuItem=$(e.currentTarget);
	var menuId=menuItem.attr('target');
	var list=this.ciieMenuLv2SubListMap[menuId];
	$(this.submenu).html('');
	if(list!=null&&list.length>0){
		for(var i=0;i<list.length;i++){
			var subMenu=list[i];
			this.appendItem(subMenu,this.submenu);
		}
		$(this.submenu).find('.ciienaviitem').on('click',this.itemClick.bind(this));
		$(this.submenu).css('display','block');
		$(this.submenu).css('z-index','20');
		var height=$(this.submenu).height();
		var mainHeight=$(this.menu).height();
		var lv1MenuTop=menuItem[0].offsetTop;
		var bottom=mainHeight-height-lv1MenuTop;
		if(bottom<0){
			bottom=0;
		}
		$(this.submenu).css('bottom',bottom);
	}else{
		$(this.submenu).css('display','none');
	}
};
CIIENEW.NavigatorSingle.prototype.lv1mouseout=function(e){
	//$(this.submenu).css('display','none');
};