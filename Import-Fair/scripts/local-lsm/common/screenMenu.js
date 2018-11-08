var CommonScreen=CommonScreen||{};
CommonScreen.ScreenMenu=function ()
{
	this.initialize.apply(this, arguments);
};
CommonScreen.ScreenMenu.prototype.constructor=CommonScreen.ScreenMenu;
CommonScreen.ScreenMenu.prototype.ohterHandler=null;
CommonScreen.ScreenMenu.prototype.jsp1="areaMonitor1.jsp";
CommonScreen.ScreenMenu.prototype.jsp2="areaMonitor2.jsp";
CommonScreen.ScreenMenu.prototype.jsp3="areaMonitor3.jsp";

CommonScreen.ScreenMenu.prototype.initialize = function(_ohterHandler,_jsp1,_jsp2,_jsp3){
	this.ohterHandler=_ohterHandler;
	if(_jsp1!=null) this.jsp1=_jsp1;
	if(_jsp2!=null) this.jsp2=_jsp2;
	if(_jsp3!=null) this.jsp3=_jsp3;
	
	$("#lbMenu").on('click',this.lbMenuHandler.bind(this));
	$("#lbMenu_expand div").on('mouseover',this.expandMenuHandler.bind(this));
	$("#lbMenu_expand div").on('mouseout',this.expandMenuHandler.bind(this));
	$("#lbMenu_expand div").on('click',this.expandMenuHandler.bind(this));
};
CommonScreen.ScreenMenu.prototype.lbMenuHandler = function(evt){
	var menuJQ=$("#lbMenu_expand");
	if(menuJQ.css("display")=="none"){
		menuJQ.css("display","block");
	}else{
		menuJQ.css("display","none");
	}
};
CommonScreen.ScreenMenu.prototype.expandMenuHandler = function(evt){var type=evt.type;
	var targetId=$(evt.currentTarget).attr("id");
	var menuBgJQ=$("#lbMenu_expand_bg");
	var basicSrc=menuBgJQ.attr("src");
	var appendParam="?hotspotId="+LSMConsts.areaId+"&target=newWindow&log=true";//"?area="+LSMConsts.area+"&hotspot="+LSMConsts.hotspots[0]+"&lng="+LSMConsts.lng+"&lat="+LSMConsts.lat;
	basicSrc=basicSrc.substring(0,basicSrc.lastIndexOf("/")+1);
	switch(type){
		case "click":
			switch(targetId){
				case "menu4":
					if(this.ohterHandler!=null){
						this.ohterHandler();
					}
					break;
				case "menu1":
					window.location.href=encodeURI(this.jsp1+"?target=newWindow&log=true");
					break;
				case "menu2":
					window.location.href=encodeURI(this.jsp2+appendParam);
					break;
				case "menu3":
					window.location.href=encodeURI(this.jsp3+appendParam);
					break;
			}
			break;
		case "mouseover":
			menuBgJQ.attr("src",basicSrc+targetId+".png");
			break;
		case "mouseout":
			menuBgJQ.attr("src",basicSrc+"menu.png");
			break;
	}
};