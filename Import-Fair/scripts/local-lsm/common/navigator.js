var CIIENEW=CIIENEW||{};
CIIENEW.Navigator=function ()
{
	this.initialize.apply(this,arguments);
};
CIIENEW.Navigator.prototype.constructor=CIIENEW.Navigator;
CIIENEW.Navigator.prototype.currentPage='';
CIIENEW.Navigator.prototype.bubble='';
CIIENEW.Navigator.prototype.basePath='';
CIIENEW.Navigator.prototype.ciieMenuAuthMap={};
CIIENEW.Navigator.prototype.ciieMenuLv1List=[];
CIIENEW.Navigator.prototype.ciieMenuLv1PCList=[];
CIIENEW.Navigator.prototype.ciieMenuLv2SubListMap={};
CIIENEW.Navigator.prototype.ciieMenuLv2ScreenSubListMap={};
CIIENEW.Navigator.prototype.noClickMap={};
//集团返迁-
CIIENEW.Navigator.prototype.iconMap={
	'保障概览':'overview',
	'场景保障':'building',
	'漫游保障':'roam',
	'专线保障':'spline',
	'安全态势':'safe',
	'网络安全':'safe',
	'指挥调度':'command',
	'集团返迁':'ovlyd',
	'集团返迁=保障概览':'overview',
	'集团返迁=场景保障':'building',
	'集团返迁=漫游保障':'roam',
	'集团返迁=专线保障':'spline',
	'集团返迁=信息安全':'safe',
	'集团返迁=网络安全':'safe',
	'返回登录':'logout',
	
	'保障概览-场景概览':'ovlyd',
	'保障概览-全网概览':'ovl',
	'保障概览-GIS概览':'ciiec',
	'保障概览-指标概览':'ovr',
	
	'场景保障-场景导航':'ciiel',
	'场景保障-场景GIS':'ciiec',
	'场景保障-场景概览':'ciier',
	
	'漫游保障-漫游概览':'roaml',
	'漫游保障-漫游GIS':'roamc',
	'漫游保障-漫游分析':'roamr',
	
	'专线保障-政企客户':'ovr',
	'专线保障-GIS拓扑':'ciiec',
	'专线保障-专线清单':'ciiel'
};


CIIENEW.Navigator.prototype.urlMap={
	'集团返迁=保障概览':'/pages/local-lsm/overview_g/overview_g.jsp',
	'集团返迁=场景保障':'/pages/local-lsm/ciienew_g/ciienew_g.jsp',
	'集团返迁=漫游保障':'/pages/local-lsm/roam_g/roam_g.jsp',
	'集团返迁=专线保障':'/pages/local-lsm/spline_g/spline_g.jsp',
	'集团返迁=信息安全':'http://10.222.42.17:8101/#/scene/3/1?deviceType=lsd&version=0',
	'集团返迁=网络安全':'http://10.222.42.17:8101/#/scene/1/1?deviceType=lsd&version=0',
	'保障概览':'/pages/local-lsm/overview/overview.jsp',
	'场景保障':'/pages/local-lsm/ciienew/ciie.jsp',
	'漫游保障':'/pages/local-lsm/roam/roam.jsp',
	'专线保障':'/pages/local-lsm/spline/spline.jsp',
	'安全态势':'http://10.222.42.17:8101/#/scene/2/1?deviceType=lsd&version=0',
	'指挥调度':'http://10.222.42.17:9003/#/sh/mix/1',
	
	
	'保障概览-场景概览':'/pages/local-lsm/overview/overviewleftyd.jsp',
	'保障概览-全网概览':'/pages/local-lsm/overview/overviewleft.jsp',
	'保障概览-GIS概览':'/pages/local-lsm/ciienew/ciiecenter.jsp',
	'保障概览-指标概览':'/pages/local-lsm/overview/overviewright.jsp',
	
	'场景保障-场景导航':'/pages/local-lsm/ciienew/ciieleft.jsp',
	'场景保障-场景GIS':'/pages/local-lsm/ciienew/ciiecenter.jsp?fromModel=ciie',
	'场景保障-场景概览':'/pages/local-lsm/ciienew/ciieright.jsp',
	
	'漫游保障-漫游概览':'/pages/local-lsm/roam/roamleft.jsp',
	'漫游保障-漫游GIS':'/pages/local-lsm/roam/roamcentersvg.jsp',
	'漫游保障-漫游分析':'/pages/local-lsm/roam/roamright.jsp',
	
	'专线保障-政企客户':'/pages/local-lsm/spline/splineleft.jsp',
	'专线保障-GIS拓扑':'/pages/local-lsm/spline/mapTopo.jsp',
	'专线保障-专线清单':'/pages/local-lsm/spline/splineright.jsp'
};
CIIENEW.Navigator.prototype.initialize=function(_currentPage,_basePath){
	this.currentPage=_currentPage;
	this.basePath=_basePath;
	
	this.bubble=document.createElement("div");
	this.menu=document.createElement("div");
	this.bgDiv=document.createElement("div");
	
	$(this.bubble).css('display','none');
	$(this.bubble).css('z-index','30');
	$(this.bubble).attr('class','ciienavibubble');
	$(this.bubble).on('click',this.bubbleClick.bind(this));
	
	$(this.menu).css('display','none');
	$(this.menu).css('z-index','20');
	$(this.menu).attr('class','ciienavibg');
	
	$(this.bgDiv).css('display','none');
	$(this.bgDiv).css('position','absolute');
	$(this.bgDiv).css('top','0');
	$(this.bgDiv).css('left','0');
	$(this.bgDiv).css('width','100%');
	$(this.bgDiv).css('height','100%');
	$(this.bgDiv).css('z-index','10');
	$(this.bgDiv).on('click',this.hidePage.bind(this));
	
	
	
	var ciieListStr=$.cookie('ciieList');
	//var ciieListStr="集团返迁=保障概览,集团返迁=场景保障,集团返迁=漫游保障,保障概览,保障概览-指标概览,保障概览-GIS概览,保障概览-全网概览,保障概览-场景概览,场景保障,场景保障-场馆概览,场景保障-场景GIS,场景保障-区域导航,漫游保障,漫游保障-漫游分析,漫游保障-漫游GIS,漫游保障-漫游概览,专线保障,专线保障-专线清单,专线保障-GIS拓扑,专线保障-政企客户";
	if(ciieListStr=="all"){
		ciieListStr=""
			+"保障概览,保障概览-全网概览,保障概览-GIS概览,保障概览-指标概览,"
			+"场景保障,场景保障-区域导航,场景保障-场景GIS,场景保障-场馆概览,"
			+"漫游保障,漫游保障-漫游概览,漫游保障-漫游GIS,漫游保障-漫游分析,"
			+"专线保障,专线保障-政企客户,专线保障-GIS拓扑,专线保障-专线清单,"
			+"安全态势,"
			+"集团返迁=保障概览,集团返迁=场景保障,集团返迁=漫游保障,集团返迁=专线保障,集团返迁=信息安全,集团返迁=网络安全,"
			+"网络安全,"
			+"指挥调度";
	}else if(ciieListStr!=null){
		ciieListStr=ciieListStr.replace('集团返迁','集团返迁=保障概览,集团返迁=场景保障,集团返迁=漫游保障,集团返迁=专线保障,集团返迁=信息安全,集团返迁=网络安全');
	}
	var ciieList=ciieListStr==null?[]:ciieListStr.split(',');
	
	this.ciieMenuAuthMap={};
	this.ciieMenuLv1List=[];
	this.ciieMenuLv1PCList=[];
	this.ciieMenuLv2SubListMap={};
	this.ciieMenuLv2ScreenSubListMap={};
	
	for(var i=0;i<ciieList.length;i++){
		var menuId=ciieList[i];
		var tmp=menuId.split('-');
		this.ciieMenuAuthMap[menuId]=true;
		if(tmp.length>1){
			if(this.ciieMenuLv2SubListMap[tmp[0]]==null){
				this.ciieMenuLv2SubListMap[tmp[0]]=[];
				this.ciieMenuLv1PCList.push(tmp[0]);
			}
			this.ciieMenuLv2SubListMap[tmp[0]].push(menuId);
		}else{
			var tmp2=menuId.split('=');
			if(tmp2.length>1){
				if(this.ciieMenuLv2ScreenSubListMap[tmp2[0]]==null){
					this.ciieMenuLv2ScreenSubListMap[tmp2[0]]=[];
					this.ciieMenuLv1List.push(tmp2[0]);
				}
				this.ciieMenuLv2ScreenSubListMap[tmp2[0]].push(menuId);
			}else{
				this.ciieMenuLv1List.push(menuId);
			}
			
		}
	}
	
	this.initItems();
	this.addNav();
	this.additionalFunc();
	this.addCenterNav(_currentPage);
	
	this.initWs();
	//$('#SCREENFRAME').on('click',this.hidePage.bind(this));
	
};
CIIENEW.Navigator.prototype.addCenterNav=function(_currentPage){
	var html='<div id="SCREENNAV" style="position:absolute;top:110px;right:50px;">'
				+'<div class="centerNavLeft" style="float:left;"></div>'
				+'<div class="centerNavRight" style="float:left;"></div>'
			  +'</div>';
	
	
	switch(_currentPage){
		case '保障概览-GIS概览':
			$('body').append(html);
			$('.centerNavLeft').on('click',function(){
				window.location.href='../overview/overviewleft.jsp';
			});
			$('.centerNavRight').on('click',function(){
				window.location.href='../overview/overviewright.jsp';
			});
			break;
		case '场景保障-场景GIS':
			$('body').append(html);
			$('.centerNavLeft').on('click',function(){
				window.location.href='ciieleft.jsp';
			});
			$('.centerNavRight').on('click',function(){
				window.location.href='ciieright.jsp';
			});
			break;
		case '专线保障-GIS拓扑':
			$('body').append(html);
			$('.centerNavLeft').on('click',function(){
				window.location.href='splineleft.jsp';
			});
			$('.centerNavRight').on('click',function(){
				window.location.href='splineright.jsp';
			});
			break;
	}
};

CIIENEW.Navigator.prototype.additionalFunc=function(){
	$('.ciienaviitem').on('click',this.itemClickLv1.bind(this));
	$('.ciienaviitem:last').on('click',this.itemClick.bind(this));
	$('.ciienaviitem').on('mouseover',this.lv1mouseover.bind(this));
};
CIIENEW.Navigator.prototype.lv1mouseover=function(e){
	var menuItem=$(e.currentTarget);
	var menuId=menuItem.attr('target');
	var list=this.ciieMenuLv2ScreenSubListMap[menuId];
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

CIIENEW.Navigator.prototype.initItems=function(){
	for(var i=0;i<this.ciieMenuLv1List.length;i++){
		this.appendItem(this.ciieMenuLv1List[i]);
	}
	this.noClickMap=this.ciieMenuLv2ScreenSubListMap;
	this.appendItem('返回登录');
	
	this.submenu=document.createElement("div");
	$(this.submenu).css('display','none');
	$(this.submenu).attr('class','ciienavibg');
	$('body').append(this.submenu);
	var subLeft=360;
	$(this.submenu).css('left',subLeft);
};
CIIENEW.Navigator.prototype.addNav=function(){
	$('body').append(this.bubble);
	$('body').append(this.menu);
	$('body').append(this.bgDiv);
};
CIIENEW.Navigator.prototype.appendItem=function(name,parentDom){
	var selected='';
	var item='';
	var tmp=name.split('-');
	var tmp2=name.split('=');
	var showName=tmp[tmp.length-1];
	if(tmp2.length>1){
		showName=tmp2[tmp2.length-1];
	}
	
	if(name==this.currentPage){
		item='<div id="'+name+'" target="'+name+'" class="ciienaviitem ciienaviitemselected">'
				+'<img src="'+CTX+'/static/styles/local-lsm/ciienew/images/navi/icon/'+this.iconMap[name]+'.png"/>'
				+'<span style="margin-left:20px;margin-top:4px;">'+showName+'</span>'
//				+'<img src="'+CTX+'/static/styles/local-lsm/ciienew/images/navi/icon_selected/'+this.iconMap[name]+'.png"/>'
//				+'<span style="margin-left:20px;margin-top:4px;color:#ffffff;">'+showName+'</span>'
			+'</div>';
	}else{
		item='<div id="'+name+'" target="'+name+'" class="ciienaviitem">'
				+'<img src="'+CTX+'/static/styles/local-lsm/ciienew/images/navi/icon/'+this.iconMap[name]+'.png"/>'
				+'<span style="margin-left:20px;margin-top:4px;">'+showName+'</span>'
			+'</div>';
	}
	if(parentDom==null){
		$(this.menu).append(item);
	}else{
		$(parentDom).append(item);
	}
	
};
CIIENEW.Navigator.prototype.bubbleClick=function(e){
	if($(this.menu).css('display')=='none'){
		$(this.menu).css('display','block');
		$(this.bgDiv).css('display','block');
	}else{
		$(this.menu).css('display','none');
		$(this.submenu).css('display','none');
		$(this.bgDiv).css('display','none');
		//$('body').off('click');
	}
};
CIIENEW.Navigator.prototype.itemClick=function(e){
	var id=$(e.currentTarget).attr('id');
	var target=$(e.currentTarget).attr('target');
	if(id=='返回登录'){
		this.logout();
	}else if(id!=this.currentPage&&this.urlMap[target]!=null){
		this.showItem(target);
	}
};
CIIENEW.Navigator.prototype.itemClickLv1=function(e){
	var id=$(e.currentTarget).attr('id');
	var target=$(e.currentTarget).attr('target');
	if(this.ciieMenuLv2ScreenSubListMap[id]==null){
		if(id=='返回登录'){
			this.logout();
		}else if(id!=this.currentPage&&this.urlMap[target]!=null){
			this.showItem(target);
		}
	}
	
};
CIIENEW.Navigator.prototype.showItem=function(item){
	if(item=='集团返迁'){
		item='集团返迁=保障概览';
	}
	var url=this.urlMap[item];
	if(this.urlMap[item]!=''&&this.urlMap[item]!=null
			&&this.noClickMap[item]==null){
		this.showPage(this.urlMap[item]);
		$('.ciienaviitemselected').removeClass('ciienaviitemselected');
		var parent0=item.split('-')[0];
		var parent1=item.split('=')[0];
		var list=$('.ciienaviitem');
		for(var i=0;i<list.length;i++){
			var div=list[i];
			var target=$(div).attr('target');
			if(target==item){
				this.currentPage=target;
				$(div).addClass('ciienaviitemselected');
				this.hidePage();
			}else if(target==parent0||target==parent1){
				$(div).addClass('ciienaviitemselected');
			}
		}
		
	}
	
};
CIIENEW.Navigator.prototype.showPage=function(url){
	if(url.indexOf('http:')!=-1||url.indexOf('https:')!=-1){
		$('#SCREENFRAME').attr('src','externalFrame.jsp?exturl='+encodeURIComponent(url));
	}else{
		$('#SCREENFRAME').attr('src',CTX+url);
	}
	
};
CIIENEW.Navigator.prototype.hidePage=function(e){
	$(this.menu).css('display','none');
	$(this.submenu).css('display','none');
	$(this.bgDiv).css('display','none');
	//$('body').off('click');
};
CIIENEW.Navigator.prototype.showExternalPage=function(url){
	window.open(url);
};
CIIENEW.Navigator.prototype.hasAuth=function(id){
	if(this.ciieMenuAuthMap[id]==true){
		return true;
	}else{
		return false;
	}
};
CIIENEW.Navigator.prototype.logout=function(){
	var AUTH_BASE=CTX+"/auth";
	var url = AUTH_BASE+'/logout';
	$.cookie('dataSmooth','',{ path: '/' });
	$.cookie('ciieList','',{ path: '/' });
	$.cookie('phoneNum','',{ path: '/' });
	$.cookie('targetType','',{ path: '/' });
	$.ajax({
		url : url,
		type : "get",
		processData:false,
		dataType:'text'
	}).done(function(code) {
		window.location.href=CTX+"/pages/local-lsm/ctrl/login.jsp";
	});
};

CIIENEW.Navigator.prototype.initWs=function(){
//	if ('WebSocket' in window) {
//        this.websocket = new WebSocket(CTX.replace('LsmScreen','PadControl').replace('http','ws')+"/clt");
//    }
//    else {
//        alert('当前浏览器不支持 websocket！')
//    }
//    //连接发生错误的回调方法
//    this.websocket.onerror = function () {
//        console.log("WebSocket连接发生错误");
//    };
//
//    //连接成功建立的回调方法
//    this.websocket.onopen = function () {
//        console.log("WebSocket连接成功");
//    }
//    //接收到消息的回调方法
//    this.websocket.onmessage = this.onWsMessage.bind(this);
//    //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
//    window.onbeforeunload = function () {
//    	this.websocket.close();
//    }.bind(this);
    
    var url = CTX.replace('LsmScreen','PadControl').replace('http','ws')+"/clt";
    this.websocket =  $sesWebSocket(url);
    var opt ={
        onopen:function(event){
        	console.log("链接成功！")
        	//this.websocket.heartStart(1000,'heart send message');
        }.bind(this),
        onmessage:this.onWsMessage.bind(this)
    }
    this.websocket.create(opt);

};

CIIENEW.Navigator.prototype.onWsMessage=function(event){
	console.log(event.data);
	var message=event.data;
	var tmp=message.split('&');
	var phoneNum=tmp[0];
	var targetType=tmp[1];
	var target=tmp[2];
	var cookiePhoneNum=$.cookie('phoneNum');
	var cookieTargetType=$.cookie('targetType');
	
	if(phoneNum==cookiePhoneNum&&targetType==cookieTargetType){
		window.location.href=CTX+this.urlMap[target];
	}
};



function sesWebSocket(wsurl) {
    this.connectURL = wsurl || "";
    this.time = 1000;//心跳时间
    this.heartMsg = ""; //心跳发送内容
    this.timeoutObj =null;
    this.serverTimeoutObj =null;
    this.reconnectTime =null;
    this.isDestroy = false;
    this.onopen= function(event) {
        // 自定义WSC连接事件：服务端与前端连接成功后触发
        console.log(event)
    };
    this.onmessage= function(event) {
        // 自定义WSC消息接收事件：服务端向前端发送消息时触发
        console.log(event)
    };
    this.onerror= function(event) {
        // 自定义WSC异常事件：WSC报错后触发
        //console.log(event)
    };
    this.onclose= function(event) {
        // 自定义WSC关闭事件：WSC关闭后触发
        //console.log(event)
    };
    this.webSocketObj = new WebSocket(wsurl);
}
sesWebSocket.fn = sesWebSocket.prototype = {
    create : function(obj) {
        if(obj){
            $.extend(true, this, obj);
        }
        var websocket = this.webSocketObj;
        var currentThis = this;
        websocket.onopen = function(evnt) {

            currentThis.onopen(evnt);
        };
        websocket.onmessage = function(evnt) {

            currentThis.onmessage(evnt);
        };
        websocket.onerror = function(evnt) {

            //currentThis.onerror(evnt);
        };
        websocket.onclose = function(evnt) {

            currentThis.onclose(evnt);
            //currentThis.aaa();//重连
        };
        this.reconnectTime = currentThis.reconnectTime;
    },
    aaa:function(){
        if(!this.isDestroy){
            this.isDestroy = true;
            this.webSocketObj.close();
            var c  =  this;
            this.reconnectTime=setTimeout(function(){
                c.reconnect();
            },c.time)
        }
    },
    destroy : function() {
        clearTimeout(this.timeoutObj);
        clearTimeout(this.serverTimeoutObj);
        clearTimeout(this.reconnectTime);
        this.isDestroy = true;
        this.webSocketObj.close();
    },
    heartStart : function(time, msg) {
        if (this.webSocketObj.readyState != 1) {
            return false;
        }
        if(time){
            this.time = time;
        }
        if(msg){
            this.heartMsg = msg;
        }
        var self = this;
        this.timeoutObj = setInterval(function() {
            try{
//          	self.webSocketObj.send(msg);
            	console.log("心跳测试是否断开连接（否）！");
            }catch(e){
            	//TODO handle the exception
            	console.err("心跳测试是否断开连接（是）！");
            	self.serverTimeoutObj = setTimeout(function() {
	                self.reconnect();
	            }, self.time)
            }
        }, this.time);
        this.serverTimeoutObj = self.serverTimeoutObj;
    },
    heartReset: function(){
        clearTimeout(this.timeoutObj);   
        clearTimeout(this.serverTimeoutObj);
        var time = this.time;
        var msg = this.heartMsg;
　　　　     this.heartStart(time,msg);
    },
    reconnect : function() {
        if(this.timeoutObj){
            clearTimeout(this.timeoutObj);
            clearTimeout(this.serverTimeoutObj);
        }
        var wsurl= this.connectURL;
        this.webSocketObj = new WebSocket(wsurl);
        this.isDestroy = false;
        this.create();
    },
}
var $sesWebSocket = function(wsurl) {
    return new sesWebSocket(wsurl);
}

sesWebSocket.export = function(fn) {
    jQuery.extend(sesWebSocket.prototype, fn);
}

