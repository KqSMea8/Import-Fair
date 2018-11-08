var LSMScreen = LSMScreen || {};
/**
 * 没窗口 随便弄个
 * @class LSMScreen.Window
 * @classdesc 更新周期等
 */
LSMScreen.Window=function(){
	/** 调用构造方法*/
	this.initialize.apply(this, arguments);
};

/** 
 * 初始化大屏，绘制组件 开始查询数据，初始化更新计时器
 * @protected
 * @function 
 */
LSMScreen.Window.prototype.initialize=function(config){
	/**
	 * @type{Object}
	 * @example
	 * x
	 * y
	 * titleHeight
	 * width
	 * height
	 * title
	 * closeFunc callback
	 * tools:[
	 *  {class:"cssClass",callback}
	 * ]
	 */
	this.config={
			x:0,
			y:0,
		titleHeight:50,
		width:600,
		height:400,
		closeFunc:null,
		tools:[]
	};
	
	/**
	 * 窗体本身DOM
	 * @type{Object}
	 */
	this.win;
	/**
	 * 标题DOM
	 * @type{Object}
	 */
	this.title;
	/**
	 * 内容DOM
	 * @type{Object}
	 */
	this.content;
	/**
	 * 关闭按钮DOM
	 * @type{Object}
	 */
	this.close;
	/**
	 * 移动中
	 * @type{Boolean}
	 */
	this.moving=false;
	/**
	 * 移动时对左上角坐标和鼠标所在位置的偏移计算
	 * @type{Boolean}
	 */
	this.adjustX=0;
	/**
	 * 移动时对左上角坐标和鼠标所在位置的偏移计算
	 * @type{Boolean}
	 */
	this.adjustY=0;
	/**
	 * 关闭窗口前的回调
	 * @type{Function}
	 */
	this.beforeClose=null;
	
	this.config=$.extend(this.config,config);
	this.beforeClose=this.config.beforeClose;
	this.win=document.createElement("div");
	$(this.win).width(this.config.width);
	$(this.win).height(this.config.height);
	$(this.win).css("position","absolute");
	$(this.win).css("top",this.config.y);
	$(this.win).css("left",this.config.x);
	$(this.win).css("overflow","hidden");
	$(this.win).css("z-index",9998);
	this.close=document.createElement("div");
	this.title=document.createElement("div");
	this.content=document.createElement("div");
	$(this.title).width(this.config.width);
	$(this.title).height(this.config.titleHeight);
	var titleSpan=document.createElement("span");
	$(titleSpan).html(this.config.title);
	$(titleSpan).addClass("customWinTitleTxtSpan");
	$(this.title).append(titleSpan);
//	$(this.title).on('mousedown',this.mouseDown.bind(this));
//	$(this.title).on('mouseup',this.mouseUp.bind(this));
//	$(this.title).on('mousemove',this.mouseMove.bind(this));
	if(config.closeFunc!=null){
		$(this.close).on('click',config.closeFunc);
	}else{
		$(this.close).on('click',this.closeWin.bind(this));
	}
	
	
	$(this.content).width(this.config.width);
	$(this.content).height(this.config.height-this.config.titleHeight);
	$(this.content).css("position","relative");
	
	$(this.win).addClass("customWin");
	$(this.title).addClass("customWinTitle");
	$(this.content).addClass("customWinContent");
	$(this.close).addClass("customWinClose");
	
	this.title.appendChild(this.close);
	this.win.appendChild(this.title);
	this.win.appendChild(this.content);
	
	var tools=this.config.tools;
	for(var i=0;i<tools.length;i++){
		var toolConfig=tools[i];
		var toolDiv=document.createElement("div");
		$(toolDiv).addClass(toolConfig["class"]);
		$(toolDiv).on('click',toolConfig["callBack"]);
		this.title.appendChild(toolDiv);
	}
	
	document.body.appendChild(this.win);
	
	if(this.config.callback){
		this.config.callback(this.win);
	}

};
LSMScreen.Window.prototype.mouseDown=function(param){
	this.moving=true;
	this.adjustX=param.offsetX;
	this.adjustY=param.offsetY;
};
LSMScreen.Window.prototype.mouseUp=function(param){
	this.moving=false;
};
LSMScreen.Window.prototype.mouseMove=function(param){
	if(this.moving){
		$(this.win).css("left",param.pageX-this.adjustX);
		$(this.win).css("top",param.pageY-this.adjustY);
	}
};
LSMScreen.Window.prototype.closeWin=function(){
	if(this.beforeClose!=null){
		this.beforeClose();
	}
	try{
		document.body.removeChild(this.win);
	}catch(e){
		console.log("win close error");
	}
};

LSMScreen.Window.prototype.hide=function(){
	$(this.win).css("display","none");
};
LSMScreen.Window.prototype.show=function(){
	$(this.win).css("display","block");
};