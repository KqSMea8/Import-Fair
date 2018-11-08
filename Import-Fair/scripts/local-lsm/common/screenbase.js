/**
 * 大屏监控命名空间
 * @namespace
 */
var LSMScreen = LSMScreen || {};


/** url配置 */
LSMScreen.IPPORT=LSMConsts.IPPORT;
LSMScreen.IPPORT2=LSMConsts.IPPORT2;

LSMScreen.G_URLCONFIG=LSMConsts.G_URLCONFIG;

/** echarts颜色等配置 */
LSMScreen.CHARTCONFIG={
	xAxisLabelColor:'#ffffff',
	yAxisLabelColor:'#ffffff',
	xAxisColor:'#013351',
	yAxisColor:'#013351',
	axisLabelSize:24,
	legendSize:18,
	labelSize:18
};
/**
 * 大屏控制基类
 * @class LSMScreen.ScreenBase
 * @classdesc 更新周期等
 */
LSMScreen.ScreenBase=function(){
	/** 调用构造方法*/
	this.initialize.apply(this, arguments);
};

/** 
 * 初始化大屏，绘制组件 开始查询数据，初始化更新计时器
 * @protected
 * @function 
 */
LSMScreen.ScreenBase.prototype.initialize=function(){
	this.initMembers();
	this.initConfigs();
//	this.update(); 异步获取接口时此处未必初始化完成
	this.startInterval();
};

/** 
 * 初始化变量
 * @protected
 * @function 
 */
LSMScreen.ScreenBase.prototype.initMembers=function (){
	/**
	 * 数据请求管理对象
	 * @private
	 * @type {Object}
	 */
	this.dataManager=null;
	/**
	 * 更新周期（ms）
	 * @public
	 * @type {int}
	 */
	this.period=5*60*1000;
	/**
	 * setInterval的key值
	 * @private
	 * @type {int}
	 */
	this.intervalKey=0;
};
/** 
 * 初始化配置参数和未绘制的组件
 * @protected
 * @function 
 */
LSMScreen.ScreenBase.prototype.initConfigs=function(){
	
};
/** 
 * 周期更新时调用，整个大屏的数据刷新方法
 * @public
 * @function 
 */
LSMScreen.ScreenBase.prototype.autoUpdate=function(){
	this.update(false);
};
/** 
 * 周期更新时调用，整个大屏的数据刷新方法
 * @public
 * @function 
 */
LSMScreen.ScreenBase.prototype.update=function(showLoadMask){
	
};
/** 
 * 开始大屏的周期性刷新计时器
 * @public
 * @function 
 */
LSMScreen.ScreenBase.prototype.startInterval=function(){
	this.stopInterval();
	this.intervalKey=setInterval(this.update.bind(this), this.period);
};
/** 
 * 停止大屏的周期性刷新计时器
 * @public
 * @function 
 */
LSMScreen.ScreenBase.prototype.stopInterval=function(){
	clearInterval(this.intervalKey);
};


/**
 * 请求数据等待的遮罩
 * @class LSMScreen.LoadMask
 * @classdesc 向给出的dom节点内绘制简单图表
 */
LSMScreen.LoadMask=function(){
	this.initialize.apply(this, arguments);
};
/** 
 * 初始化变量
 * @protected
 * @function 
 */
LSMScreen.LoadMask.prototype.initMembers=function (){
	/**
	 * 遮罩要覆盖的dom节点
	 * @protected
	 * @type {Object}
	 */
	this.maskParent=null;
	
	/**
	 * spin对象(spin.min.js)
	 * @private
	 * @type {Object}
	 */
	this.spinnerEl=null;

	/**
	 * 生成的遮罩dom节点
	 * @private
	 * @type {Object}
	 */
	this.mask=null;
};

/** 
 * 构造方法
 * @protected
 * @function 
 * @param {Object} dom 遮罩要覆盖的dom节点
 */
LSMScreen.LoadMask.prototype.initialize=function (dom){
	this.initMembers();
	this.maskParent=dom;
};
/** 
 * 呈现遮罩
 * @protected
 * @function 
 */
LSMScreen.LoadMask.prototype.show=function (){
	require(["scripts/local-lsm/common/spinner/spin.min"],function(Spinner){
		if(this.maskParent!=null&&this.spinnerEl==null){
			this.spinnerEl = new Spinner({}).spin(this.maskParent).el;
		}
	}.bind(this));
	$(this.maskParent).mask(null,{opacity:0});
};
/** 
 * 隐藏遮罩
 * @protected
 * @function 
 */
LSMScreen.LoadMask.prototype.hide=function (){
	if(this.maskParent!=null&&this.spinnerEl!=null){
		this.maskParent.removeChild(this.spinnerEl);
		this.spinnerEl=null;
	}
	$(this.maskParent).unmask();
};


/**
 * 页面组件基类
 * @class LSMScreen.ComponentBase
 * @classdesc 向给出的dom节点内绘制简单图表
 */
LSMScreen.ComponentBase=function(){
	this.initialize.apply(this, arguments);
};

/** 
 * 初始化变量
 * @protected
 * @function 
 */
LSMScreen.ComponentBase.prototype.initMembers=function (){
	/**
	 * 配置项
	 * @public
	 * @type {Object}
	 * @example 
	 {
	 	contentHeight:"100%",//高度 百分比或px
	 	title:"附着成功率",//标题
		titleClass:"title",//标题所在节点的class
		timeClass:"title_time",//时间标签所在节点的class
		contentClass:"chart1_content",//图表所在节点的class
		require:[  //需要加载的echarts类型,默认只加载line和bar
	        'echarts',  
	        'echarts/chart/line'
		]
	 }
	 */
	this.baseConfig={
			contentHeight:"100%",
			title:"",
			titleClass:"title",
			timeClass:"title_time",
			contentClass:"chart1_content",
			dbclickToMaximum:false,
			maxParent:document,
			require:[  
	            'echarts',  
	            'echarts/chart/line',  
	            'echarts/chart/bar'
			]
	};
	/**
	 * 遮罩对象
	 * @private
	 * @type {LSMScreen.LoadMask}
	 */
	this.loadMask=null;

	/**
	 * 父节点 需要遮罩的对象
	 * @private
	 * @type {Object}
	 */
	this.parentDom=null;

	/**
	 * 标题dom节点
	 * @private
	 * @type {Object} 
	 */
	this.titleDom=null;
	/**
	 * 时间dom节点
	 * @private
	 * @type {Object} 
	 */
	this.timeDom=null;
	/**
	 * 内容dom节点 必定存在 如不存在，构造方法会创建
	 * @private
	 * @type {Object} 
	 */
	this.contentDom=null;
	/**
	 * 双击放大至全屏
	 * @private
	 * @type {Boolean} 
	 */
	this.dbclickToMaximum=false;
	
	this.maxParent=document;
	/**
	 * 是否为放大状态
	 * @private
	 * @type {Boolean} 
	 */
	this.isMaximized=false;
	
	this.backBtnDom;
};

/** 
 * 返回按钮 需在updateConfig之后调用
 * @protected
 * @function 
 */
LSMScreen.ComponentBase.prototype.addBack=function (config){
	var list=$(this.parentDom).find(".backBtn");
	if(list!=null&&list.length>0){
		$(list).on('click',this.goback.bind(this));
		this.backBtnDom=list[0];
	}
};

/** 
 * 返回按钮处理
 * @protected
 * @function 
 */
LSMScreen.ComponentBase.prototype.goback=function (){
};


/** 
 * 构造方法
 * @protected
 * @function 
 * @param {Object} dom 要绘制组件的dom节点
 */
LSMScreen.ComponentBase.prototype.initialize=function (dom,base_config){
	this.initMembers();
	this.parentDom=dom;
	this.updateBaseConfig(base_config);
	this.loadMask=new LSMScreen.LoadMask(this.parentDom);
	this.addBack();
};

/** 
 * 更新配置 改变标题等
 * @protected
 * @function 
 * @param {LSMScreen.ComponentBase.baseConfig} base_config
 */
LSMScreen.ComponentBase.prototype.updateBaseConfig=function (base_config){
	/** 覆盖baseConfig基本配置相应属性 除require以外 */
	if(base_config!=null){
		for(var key in base_config){
			this.baseConfig[key]=base_config[key];
		}
	}
	var dom=this.parentDom;
	this.timeDom=$(dom).find("."+this.baseConfig.timeClass)[0];
	this.titleDom=$(dom).find("."+this.baseConfig.titleClass)[0];
	this.dbclickToMaximum=this.baseConfig.dbclickToMaximum;
	this.maxParent=this.baseConfig.maxParent;
	//内容节点必须存在，如不存在则创建
	var list=$(dom).find("."+this.baseConfig.contentClass);
	if(list!=null&&list.length>0){
		this.contentDom=$(dom).find("."+this.baseConfig.contentClass)[0];
	}else{
//		this.contentDom=dom;
		var contentDiv=document.createElement("div");
		$(contentDiv).addClass(this.baseConfig.contentClass);
		$(contentDiv).css("height","100%");
		$(contentDiv).css("width","100%");
		this.contentDom=contentDiv;
		dom.appendChild(contentDiv);
	}
	if(this.dbclickToMaximum){
		$(dom).on('dblclick',this.maximize.bind(this));
	}
	
//	if(this.titleDom!=null){//测试用事件
//		$(this.titleDom).on('click',function(){
//			this.update(true);
//		}.bind(this));
//	}
	
	this.setTitle(this.baseConfig.title);
};
/** 
 * 放大至全屏
 * @protected
 * @function 
 * @param {Object} e 双击事件
 */
LSMScreen.ComponentBase.prototype.maximize=function (e){
	if(this.isMaximized){
		$(this.maxDom).children().each(function(index,ele){
			$(this.parentDom).append(ele);
		}.bind(this));
		console.log(this.originContentWidth+","+this.originContentHeight);
		$(this.contentDom).width(this.originContentWidth);
		$(this.contentDom).height(this.originContentHeight);
		$(this.maxDom).unbind();
		$(this.maxDom).remove();
		this.isMaximized=false;
	}else{
		var maxDom=document.createElement("div");
		var maxParent=this.maxParent;
		this.maxDom=maxDom;
		this.originContentWidth=$(this.contentDom).width();
		this.originContentHeight=$(this.contentDom).height();
		$(this.maxDom).on('dblclick',this.maximize.bind(this));
		$(maxDom).width($(maxParent).width());
		$(maxDom).height($(maxParent).height());
		$(maxDom).attr("class",$(this.parentDom).attr("class"));
		$(maxDom).css("position","absolute");
		$(maxDom).css("top","0");
		$(maxDom).css("left","0"); 
		$(maxDom).css("z-index","9999"); 
		
		var childList=$(this.parentDom).children();
		for(var i=0;i<childList.length;i++){
			$(this.maxDom).append(childList[i]);
		}
		
		
		$(this.contentDom).width($(maxParent).width());
		$(this.contentDom).height($(maxParent).height()-$(this.titleDom).height()-50);
		
		$(maxParent).append(this.maxDom);
		this.isMaximized=true;
	}
	this.doResize();
};
/** 
 * 大小变更时要做的操作，由子类实现
 * @protected
 * @function 
 */
LSMScreen.ComponentBase.prototype.doResize=function (){
	
};
/** 
 * 更新时间显示
 * @protected
 * @function 
 * @param {String} timeStr 要显示的时间字符串
 */
LSMScreen.ComponentBase.prototype.setTime=function (timeStr){
	if(this.timeDom!=null){
		this.timeDom.innerHTML="("+timeStr+")";
	}
};
/** 
 * 更新标题显示
 * @protected
 * @function 
 * @param {String} titleStr 要显示的标题字符串
 */
LSMScreen.ComponentBase.prototype.setTitle=function (titleStr){
	if(this.titleDom!=null){
		this.titleDom.innerHTML=titleStr;
	}
};

/** 
 * 更新请求数据
 * @public
 * @function 
 * @param {Boolean} showLoadMask 这次数据更新是否要呈现loadMask
 */
LSMScreen.ComponentBase.prototype.update=function (showLoadMask){
	
};
/** 
 * 成功获取数据
 * @public
 * @function 
 * @param {Object} compData 组件需要的数据
 */
LSMScreen.ComponentBase.prototype.dataHandler=function (compData){
	this.hideLoading();
};
/** 
 * 获取数据失败
 * @public
 * @function 
 * @param {Object} errInfo 错误信息
 */
LSMScreen.ComponentBase.prototype.failHandler=function (errInfo){
	console.log(errInfo.responseText);
	this.hideLoading();
};
/** 
 * 呈现loadMask
 * @protected
 * @function 
 */
LSMScreen.ComponentBase.prototype.showLoading=function (){
	if(this.loadMask!=null){
		this.loadMask.show();
	}
};
/** 
 * 隐藏loadMask
 * @protected
 * @function 
 */
LSMScreen.ComponentBase.prototype.hideLoading=function (){
	if(this.loadMask!=null){
		this.loadMask.hide();
	}
};



/**
 * 简单图表组件
 * @class LSMScreen.SimpleChart
 * @extends LSMScreen.ComponentBase
 * @classdesc 向给出的dom节点内绘制简单图表
 */
LSMScreen.SimpleChart=function(){
	this.initialize.apply(this, arguments);
};
/** 从ComponentBase继承*/
LSMScreen.SimpleChart.prototype=Object.create(LSMScreen.ComponentBase.prototype);
LSMScreen.SimpleChart.prototype.constructor=LSMScreen.SimpleChart;

/** 
 * 初始化变量
 * @protected
 * @function 
 */
LSMScreen.SimpleChart.prototype.initMembers=function (){
	Object.create(LSMScreen.SimpleChart.prototype.__proto__).initMembers.apply(this, arguments);
	/**
	 * require完成后的回调方法
	 * @private
	 * @type {Function} 
	 */
	this.callBack=null;
	/**
	 * echarts对象
	 * @private
	 * @type {Object} 
	 */
	this.echart=null;
	/**
	 * echarts 实例 用于init
	 * @private
	 * @type {Object} 
	 */
	this.ec=null;
};

/** 
 * 构造方法 
 * require部分的配置只在这里执行
 * @protected
 * @function 
 * @param {Object} dom 包含需要绘制图表的节点的外层div节点
 * @param {LSMScreen.SimpleChart.baseConfig} [base_config] 配置项(可选) 从dom开始搜索title，chart，timeLabel等绘制项的class的配置
 * @param {Function} readyCallback 
 * @param {Boolean} readyCallback.info 是否初始化成功
 */
LSMScreen.SimpleChart.prototype.initialize=function (dom,base_config,readyCallback){
	/** 调用父类构造方法用来构造loadMask */
//	LSMScreen.SimpleChart.prototype.__proto__.initialize.apply(this, arguments);
	Object.create(LSMScreen.SimpleChart.prototype.__proto__).initialize.apply(this, arguments);
	
	/** 更新baseConfig并执行require */
	this.parentDom=dom;
	this.callBack=readyCallback;
	require(this.baseConfig.require,this.initEChart.bind(this));
	
	/**高度调整*/
	$(this.contentDom).height(this.baseConfig.contentHeight);
};
/** 
 * 构造方法 
 * require部分的配置只在这里执行
 * @protected
 * @function 
 * @param {Object} dom 包含需要绘制图表的节点的外层div节点
 * @param {LSMScreen.SimpleChart.baseConfig} [base_config] 配置项(可选) 从dom开始搜索title，chart，timeLabel等绘制项的class的配置
 * @param {Function} readyCallback 
 * @param {Boolean} readyCallback.info 是否初始化成功
 */
LSMScreen.SimpleChart.prototype.mergeConfig=function (config1,config2){
	
};

LSMScreen.SimpleChart.prototype.doResize=function (){
	if(this.echart){
		this.echart.resize();
	}
};
/** 
 * require的回调
 * @private
 * @function 
 * @param {Object} ec echarts对象
 */
LSMScreen.SimpleChart.prototype.initEChart=function (ec){
	this.ec=ec;
	/** 初始化echart对象 */
	if(this.contentDom!=null){
		this.echart= ec.init(this.contentDom);
	}
	if(this.callBack!=null){
		this.callBack(this.echart!=null,this.echart);
	}
	
};

/** 
 * 重新init echarts
 * @private
 * @function 
 */
LSMScreen.SimpleChart.prototype.reinitEChart=function (){
	/** 初始化echart对象 */
	if(this.contentDom!=null&&this.ec!=null){
		this.echart= this.ec.init(this.contentDom);
	}
};

/** 
 * 统一获得图表配置option 柱图和线
 * @protected
 * @function 
 * @param {Array} legends seriesname列表
 * @param {Array} xAxisArr x轴的值
 * @param {Array} series echarts的series
 * @returns {Object} 填入数据的echarts的option配置项
 */
LSMScreen.SimpleChart.prototype.getOptionByData=function(legends,xAxisArr,series,tipFunc){
	var option = {
			color:LSMConsts.echartsColor,
		    tooltip : {
		        trigger: 'item',
		        formatter:tipFunc
		    },
		    legend: {
		    	show : false,
		    	data:legends
		    },
		    toolbox: {
		        show : false
		    },
		    calculable : true,
		    xAxis : [
		        {
		            type : 'category',
		            boundaryGap : false,
		            data : xAxisArr,
		            axisLabel:{
		            	textStyle:{
		            		color:LSMScreen.CHARTCONFIG.xAxisLabelColor,
		            		fontSize:LSMScreen.CHARTCONFIG.axisLabelSize
		            	}
		            }
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            min:0,
		            axisLabel:{
		            	textStyle:{color:LSMScreen.CHARTCONFIG.yAxisLabelColor,
		            		fontSize:LSMScreen.CHARTCONFIG.axisLabelSize}
		            }
		        },{
		            type : 'value',
		            min:0,
		            axisLabel:{
		            	textStyle:{color:LSMScreen.CHARTCONFIG.yAxisLabelColor,
		            		fontSize:LSMScreen.CHARTCONFIG.axisLabelSize}
		            }
		        }
		    ],
		    series : series
		};
	return option;
};

/** 
 * 刷新图表数据
 * @public
 * @function 
 * @param {Object} option echarts的配置项
 * @param {Boolean} notMerger 可以通过notMerger参数为true阻止与上次option的合并。
 */
LSMScreen.SimpleChart.prototype.updateData=function (option,notMerger){
	if(this.echart!=null){
		if(notMerger==null){
			notMerger=true;
		}
		this.echart.setOption(option,notMerger);
		setTimeout(function(){this.echart.refresh();}.bind(this), 1000);
	}
};


/**
 * 接口数据图表基类 统一样式(line,bar)
 * @class LSMScreen.DataChartBase
 * @extends LSMScreen.SimpleChart
 * @classdesc 继承query方法 查询不同接口，继承dataHandler处理数据
 */
LSMScreen.DataChartBase=function (){
	this.initialize.apply(this, arguments);
};
/** 从SimpleChart继承*/
LSMScreen.DataChartBase.prototype=Object.create(LSMScreen.SimpleChart.prototype);
LSMScreen.DataChartBase.prototype.constructor=LSMScreen.DataChartBase;
/**
 * 查询参数配置项 内容因接口而异
 * @public
 * @type {Object}
 */
LSMScreen.DataChartBase.prototype.queryConfig={};

/** 
 * 统一获得图表配置option 柱图和线
 * @protected
 * @function 
 * @param {Array} legends seriesname列表
 * @param {Array} xAxisArr x轴的值
 * @param {Array} series echarts的series
 * @returns {Object} 填入数据的echarts的option配置项
 */
LSMScreen.DataChartBase.prototype.getOptionByData=function(legends,xAxisArr,series,tipFunc){
	var option = {
			color:LSMConsts.echartsColor,
		    tooltip : {
		        trigger: 'item',
		        formatter:tipFunc
		    },
		    legend: {
		    	show : false,
		    	data:legends
		    },
		    toolbox: {
		        show : false
		    },
		    calculable : true,
		    xAxis : [
		        {
		            type : 'category',
		            boundaryGap : false,
		            data : xAxisArr,
		            axisLabel:{
		            	textStyle:{
		            		color:LSMScreen.CHARTCONFIG.xAxisLabelColor,
		            		fontSize:LSMScreen.CHARTCONFIG.axisLabelSize
		            	}
		            }
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            min:0,
		            axisLabel:{
		            	textStyle:{color:LSMScreen.CHARTCONFIG.yAxisLabelColor,
		            		fontSize:LSMScreen.CHARTCONFIG.axisLabelSize}
		            }
		        },{
		            type : 'value',
		            min:0,
		            axisLabel:{
		            	textStyle:{color:LSMScreen.CHARTCONFIG.yAxisLabelColor,
		            		fontSize:LSMScreen.CHARTCONFIG.axisLabelSize}
		            }
		        }
		    ],
		    series : series
		};
	return option;
};

LSMScreen.DataChartBase.prototype.getOptionByDataReverse=function(legends,xAxisArr,series,tipFunc,grid){
	if(grid==null){
		grid={
		    	borderWidth:0,
		    	x:120,
		    	y2:10
		    };
	}
	var option = {
			color:["#0f84f6","#ececec"],
		    tooltip : {
		        trigger: 'item',
		        formatter:tipFunc
		    },
		    legend: {
		    	show : true,
		    	data:legends,
		    	selectedMode:false,
		    	textStyle:{
		    		fontSize:20,
		    		color:"#ffffff"
		    	}
		    },
		    toolbox: {
		        show : false
		    },
		    calculable : false,
		    xAxis : [
		        {
		            type : 'value',
		            min:0,
		            position:'top',
		            scale:true,
		            splitNumber:2,
		            axisLabel:{
		            	formatter:function(num){
		            		if(num>=1000000){
		            			return Math.ceil(num/1000000)+"百万";
		            		}else{
		            			return num;
		            		}
		            	},
		            	textStyle:{
		            		color:LSMScreen.CHARTCONFIG.xAxisLabelColor,
		            		fontSize:LSMScreen.CHARTCONFIG.axisLabelSize*0.8
		            	}
		            },
		            splitLine:{show:false},
		            axisLine:{show:false}
		        }
		    ],
		    yAxis : [
		        {
		            type : 'category',
		            boundaryGap : true,
		            data : xAxisArr,
		            axisLabel:{
		            	textStyle:{color:LSMScreen.CHARTCONFIG.yAxisLabelColor,
		            		fontSize:LSMScreen.CHARTCONFIG.axisLabelSize*0.8}
		            },
		            splitLine:{show:false},
		            axisLine:{show:false}
		        }
		    ],
		    grid:grid,
		    series : series
		};
	return option;
};




/** 
 * 更新数据
 * @public
 * @function 
 */
LSMScreen.DataChartBase.prototype.update=function(showLoadMask,queryConfig){
	if(queryConfig!=null){
		this.queryConfig=queryConfig;
	}
	if(showLoadMask){
		this.showLoading();
	}
	this.query.apply(this, [this.queryConfig]);
};

/** 
 * 调用相应的接口请求数据 由update调用
 * @public
 * @function 
 * @param {Object} queryConfig 接口查询参数对象(各异)
 */
LSMScreen.DataChartBase.prototype.query=function(queryConfig){
	
};


/**
 * 接口饼图图表基类 统一样式(pie)
 * @class LSMScreen.DataChartPie
 * @extends LSMScreen.DataChartBase
 * @classdesc 由于pie类图表和line,bar配置不同，统一使用会报错,仅重写getOptionByData部分
 */
LSMScreen.DataChartPie=function (){
	this.initialize.apply(this, arguments);
};
/** 从DataChartBase继承*/
LSMScreen.DataChartPie.prototype=Object.create(LSMScreen.DataChartBase.prototype);
LSMScreen.DataChartPie.prototype.constructor=LSMScreen.DataChartPie;

/** 
 * 构造方法 为父类初始化添加pie类型图表
 * require部分的配置只在这里执行
 * @protected
 * @function 
 * @param {Object} dom 包含需要绘制图表的节点的外层div节点
 * @param {LSMScreen.SimpleChart.baseConfig} [base_config] 配置项(可选) 从dom开始搜索title，chart，timeLabel等绘制项的class的配置
 * @param {Function} readyCallback 
 * @param {Boolean} readyCallback.info 是否初始化成功
 */
LSMScreen.DataChartPie.prototype.initialize=function (dom,base_config,readyCallback){
	if(base_config==null){
		base_config={};
	}
	if(base_config.require==null){
		base_config.require=['echarts','echarts/chart/pie'];
	}
	/** 调用父类构造方法用来初始化图表 */
	Object.create(LSMScreen.DataChartPie.prototype.__proto__).initialize.apply(this, arguments);
};
/** 
 * 统一获得图表配置option
 * @protected
 * @function 
 * @param {Array} legends seriesname列表
 * @param {Array} series echarts的series
 * @returns {Object} 填入数据的echarts的option配置项
 */
LSMScreen.DataChartPie.prototype.getOptionByData=function(legends,series,legendOption,tipFunc){
	var option = {
		    tooltip : {
		        trigger: 'item',
		        formatter:tipFunc
		    },
		    legend: {
		    	show : false,
		    	data:legends,
		    	x:'left',
		    	orient:'vertical',
		    	textStyle:{
		    		color:LSMConsts.baseFontColor,
		    		fontSize:LSMScreen.CHARTCONFIG.legendSize}
		    },
		    toolbox: {
		        show : false
		    },
//		    grid:{
//		    	borderWidth:0
//		    },
		    calculable : false,
		    series : series
		};
	if(legendOption!=null){
		for(var key in legendOption){
			option.legend[key]=legendOption[key];
		}
	}
	return option;
};


/**
 * 接口雷达图图表基类 统一样式(radar)
 * @class LSMScreen.DataChartRadar
 * @extends LSMScreen.DataChartBase
 */
LSMScreen.DataChartRadar=function (){
	this.initialize.apply(this, arguments);
};
/** 从DataChartBase继承*/
LSMScreen.DataChartRadar.prototype=Object.create(LSMScreen.DataChartBase.prototype);
LSMScreen.DataChartRadar.prototype.constructor=LSMScreen.DataChartRadar;

/** 
 * 构造方法 为父类初始化添加pie类型图表
 * require部分的配置只在这里执行
 * @protected
 * @function 
 * @param {Object} dom 包含需要绘制图表的节点的外层div节点
 * @param {LSMScreen.SimpleChart.baseConfig} [base_config] 配置项(可选) 从dom开始搜索title，chart，timeLabel等绘制项的class的配置
 * @param {Function} readyCallback 
 * @param {Boolean} readyCallback.info 是否初始化成功
 */
LSMScreen.DataChartRadar.prototype.initialize=function (dom,base_config,readyCallback){
	if(base_config==null){
		base_config={};
	}
	if(base_config.require==null){
		base_config.require=['echarts','echarts/chart/radar'];
	}
	/** 调用父类构造方法用来初始化图表 */
	Object.create(LSMScreen.DataChartRadar.prototype.__proto__).initialize.apply(this, arguments);
};
/** 
 * 统一获得图表配置option
 * @protected
 * @function 
 * @param {Array} legends seriesname列表
 * @param {Array} series echarts的series
 * @returns {Object} 填入数据的echarts的option配置项
 */
LSMScreen.DataChartRadar.prototype.getOptionByData=function(legends,series,polar,legendOption,tipFunc){
	
	var option = {
			tooltip : {
		        trigger: 'axis',
		        formatter:tipFunc
		    },
		    legend: {
		    	show : false,
		    	data:legends,
		    	x:'left',
		    	orient:'vertical',
		    	textStyle:{
		    		color:LSMConsts.baseFontColor,
		    		fontSize:LSMScreen.CHARTCONFIG.legendSize}
		    },
		    title : {
		        show:false
		    },
		    toolbox: {
		        show : false
		    },
		    polar : polar,
		    calculable : false,
		    series : series
		};
	if(legendOption!=null){
		for(var key in legendOption){
			option.legend[key]=legendOption[key];
		}
	}
	
	
	return option;
};


/**
 * 散点图图表基类 统一样式
 * @class LSMScreen.DataChartBubble
 * @extends LSMScreen.DataChartBase
 * @classdesc 由于pie类图表和line,bar配置不同，统一使用会报错,仅重写getOptionByData部分
 */
LSMScreen.DataChartBubble=function (){
	this.initialize.apply(this, arguments);
};
/** 从DataChartBase继承*/
LSMScreen.DataChartBubble.prototype=Object.create(LSMScreen.DataChartBase.prototype);
LSMScreen.DataChartBubble.prototype.constructor=LSMScreen.DataChartBubble;

/** 
 * 构造方法 为父类初始化添加scatter类型图表
 * require部分的配置只在这里执行
 * @protected
 * @function 
 * @param {Object} dom 包含需要绘制图表的节点的外层div节点
 * @param {LSMScreen.SimpleChart.baseConfig} [base_config] 配置项(可选) 从dom开始搜索title，chart，timeLabel等绘制项的class的配置
 * @param {Function} readyCallback 
 * @param {Boolean} readyCallback.info 是否初始化成功
 */
LSMScreen.DataChartBubble.prototype.initialize=function (dom,base_config,readyCallback){
	if(base_config==null){
		base_config={};
	}
	if(base_config.require==null){
		base_config.require=['echarts','echarts/chart/scatter'];//加载散点图类型图表 scatter
	}
	/** 调用父类构造方法用来初始化图表 */
	Object.create(LSMScreen.DataChartBubble.prototype.__proto__).initialize.apply(this, arguments);
};

/** 
 * 统一获得图表配置option x,y轴均为value类型的散点图
 * @protected
 * @function 
 * @param {Array} legends seriesname列表
 * @param {Array} xAxisArr x轴的值
 * @param {Array} series echarts的series
 * @returns {Object} 填入数据的echarts的option配置项
 */
LSMScreen.DataChartBubble.prototype.getOptionByData=function(legends,series,tipFunc,xmax,ymax){
	var option = {
		    tooltip : {
		        trigger: 'item',
		        formatter:tipFunc
		        
		    },
		    legend: {
		    	show : false,
		    	data:legends
		    },
		    toolbox: {
		        show : false
		    },
		    calculable : false,
		    xAxis : [
	             {
	                 type : 'log',
	                 splitNumber: 4,
	                 scale: false,
	                 max:xmax,
		            axisLabel:{
		            	textStyle:{color:LSMScreen.CHARTCONFIG.xAxisLabelColor,
		            		fontSize:LSMScreen.CHARTCONFIG.axisLabelSize}
		            }
	             }
	         ],
	         yAxis : [
	             {
	                 type : 'value',
	                 splitNumber: 4,
	                 scale: false,
	                 max:ymax,
		            axisLabel:{
		            	textStyle:{color:LSMScreen.CHARTCONFIG.xAxisLabelColor,
		            		fontSize:LSMScreen.CHARTCONFIG.axisLabelSize}
		            }
	             }
	         ],
		    series : series
		};
	return option;
};


/**
 * 导航条
 * @class LSMScreen.NavBar
 * @classdesc 生成导航条
 */
LSMScreen.NavBar=function(){
	this.initialize.apply(this, arguments);
};
LSMScreen.NavBar.prototype.barNames=[];
/** 
 * 创建导航条ul
 * @protected
 * @function 
 * @param {Array} barNames 导航条名称['a','b','c']
 * @param {int} selectedIndex 默认选中项
 * @param {Number} width 宽度
 * @param {Function} clickHandler 导航条点击事件处理
 * @param {String} clickHandler.label 选中的导航条名称
 * @returns {Object} 导航条ul对象
 */
LSMScreen.NavBar.prototype.initialize=function(barNames,selectedIndex,width,clickHandler){
	
	this.initMembers();
	this.barNames=barNames;
	//创建导航栏
	var i=0;
	var nav_ul=document.createElement("ul");
	var liWidth=width/barNames.length;
	$(nav_ul).attr("class","nav navbar-nav");
	$(nav_ul).addClass("deviceNav");
	$(nav_ul).height(this.navHeight);
	for(i=0;i<barNames.length;i++){
		var li=document.createElement("li");
		var a=document.createElement("a");
		var activeBar=document.createElement("div");
		$(activeBar).addClass("deviceNavBottom");
		if(i==selectedIndex){
			this.selectedLabel=barNames[i];
			$(activeBar).addClass("deviceNavBottomSelected");//选中第一项
		}
		$(li).width(liWidth);
		a.innerHTML=barNames[i];
		li.appendChild(activeBar);
		li.appendChild(a);
		nav_ul.appendChild(li);
	}
	$(nav_ul).find("li").click(this.navClick.bind(this));
	
	this.navDom=nav_ul;
	this.navHandler=clickHandler;
};
/** 
 * 重置宽度
 * @protected
 * @function 
 */
LSMScreen.NavBar.prototype.setWidth=function (width){
	var liWidth=width/this.barNames.length;
	$(this.navDom).width(width);
	$(this.navDom).find("li").width(liWidth);
};
/** 
 * 初始化变量
 * @protected
 * @function 
 */
LSMScreen.NavBar.prototype.initMembers=function (){
	/**
	 * 导航条默认高度
	 * @public 
	 * @type {Number}
	 */
	this.navHeight=50;
	/**
	 * 导航条ul对象
	 * @public 
	 * @type {Object}
	 */
	this.navDom;

	/**
	 * 导航条点击外部处理方法
	 * @public 
	 * @type {Function}
	 */
	this.navHandler;
	/**
	 * 选中的标签
	 * @public 
	 * @type {String}
	 */
	this.selectedLabel;
};
/** 
 * 导航条点击事件
 * @public
 * @function 
 * @param {Object} html点击事件
 */
LSMScreen.NavBar.prototype.navClick=function (param){
	//控制选中与否
	$(this.navDom).find("li").find(".deviceNavBottom").removeClass("deviceNavBottomSelected");
	$(param.currentTarget).find(".deviceNavBottom").addClass("deviceNavBottomSelected");
	var label=param.srcElement.innerText;
	this.selectedLabel=label;
	if(this.navHandler!=null){
		this.navHandler.apply(this, [label]);
	}
};

/** 
 * 导航条索引
 * @public
 * @function 
 * @param {int} 序列
 */
LSMScreen.NavBar.prototype.setSelectedIndex = function (index)
{
	$(this.navDom).find("li").find(".deviceNavBottom").removeClass("deviceNavBottomSelected");
	$($(this.navDom).find("li").find(".deviceNavBottom")[index]).addClass("deviceNavBottomSelected");
};


/**
 * 没窗口 随便弄个
 * @class LSMScreen.SimpleWindow
 * @classdesc 更新周期等
 */
LSMScreen.SimpleWindow=function(){
	/** 调用构造方法*/
	this.initialize.apply(this, arguments);
};

/** 
 * 初始化大屏，绘制组件 开始查询数据，初始化更新计时器
 * @protected
 * @function 
 */
LSMScreen.SimpleWindow.prototype.initialize=function(config){
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
		tools:[],
		dbclickToMaximum:false,
		doResize:null,
		maxParent:document,
		modal:false,
		parentDom:null
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
	 * 是否可移动
	 * @type{Boolean}
	 */
	this.movable=false;
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
	/**
	 * 是否为放大状态
	 * @private
	 * @type {Boolean} 
	 */
	this.isMaximized=false;
	/**
	 * 是否允许放大
	 * @private
	 * @type {Boolean} 
	 */
	this.dbclickToMaximum=false;
	
	/**
	 * 是否模态窗口
	 * @private
	 * @type {Boolean} 
	 */
	this.modal=false;
	/**
	 * 父级DOM
	 * @private
	 */
	this.parentDom=null;
	/**
	 * 点击关闭按钮时仅隐藏
	 * @private
	 */
	this.hideOnClose=false;
	
	
	
	this.config=$.extend(this.config,config);
	this.parentDom=this.config.parentDom;
	this.hideOnClose=this.config.hideOnClose;
	this.modal=this.config.modal;
	this.movable=this.config.movable;
	this.dbclickToMaximum=this.config.dbclickToMaximum;
	this.beforeClose=this.config.beforeClose;
	this.win=document.createElement("div");
	this.modalBack=document.createElement("div");
	this.randomId=Math.uuid();
	if(this.modal){
		$(this.modalBack).width('100%');
		$(this.modalBack).height('100%');
		$(this.modalBack).css('background','#ececec');
		$(this.modalBack).css('opacity','0.3');
		$(this.modalBack).css('filter','alpha(opacity=30)');
		$(this.modalBack).css("position","absolute");
		$(this.modalBack).css("top",0);
		$(this.modalBack).css("left",0);
	}
	
	
	$(this.win).width(this.config.width);
	$(this.win).height(this.config.height);
	$(this.win).attr("randomId",this.randomId);
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
	$(titleSpan).text(this.config.title);
	$(titleSpan).addClass("tempWinTitleTxtSpan");
	$(this.title).append(titleSpan);
	if(this.dbclickToMaximum){
		$(this.title).on('dblclick',this.maximizeWin.bind(this));
	}
	if(this.movable){
		$(this.win).on('mousedown',this.mouseDown.bind(this));
		$(this.win).on('mouseup',this.mouseUp.bind(this));
		$(this.win).on('mousemove',this.mouseMove.bind(this));
		$(document).on('mouseup',this.mouseUp.bind(this));
		$(document).on('mousemove',this.mouseMove.bind(this));
	}
	
	if(config.closeFunc!=null){
		$(this.close).on('click',config.closeFunc);
	}else{
		$(this.close).on('click',this.closeWin.bind(this));
	}
	
	
	$(this.content).width(this.config.width);
	$(this.content).height(this.config.height-this.config.titleHeight);
	$(this.content).css("position","relative");
	
	$(this.win).addClass("tempWin");
	$(this.title).addClass("tempWinTitle");
	$(this.content).addClass("tempWinContent");
	$(this.close).addClass("tempWinClose");
	
	
	this.win.appendChild(this.title);
	this.win.appendChild(this.content);
	this.win.appendChild(this.close);
	
	var tools=this.config.tools;
	for(var i=0;i<tools.length;i++){
		var toolConfig=tools[i];
		var toolDiv=document.createElement("div");
		$(toolDiv).addClass(toolConfig["class"]);
		$(toolDiv).on('click',toolConfig["callBack"]);
		this.title.appendChild(toolDiv);
	}
	if(this.parentDom!=null){
		$(this.parentDom).append(this.modalBack);
		$(this.parentDom).append(this.win);
	}else{
		$('body').append(this.modalBack);
		$('body').append(this.win);
	}
	if(this.config.callback){
		this.config.callback(this.win);
	}

};
LSMScreen.SimpleWindow.prototype.setMovable=function(mv){
	this.moving=false;
	this.movable=mv;
};
LSMScreen.SimpleWindow.prototype.mouseDown=function(param){
	var winLeft=$(this.win).css("left").replace("px","")*1;
	var winTop=$(this.win).css("top").replace("px","")*1;
	if(this.movable){
		this.moving=true;
		this.adjustX=param.pageX-winLeft;
		this.adjustY=param.pageY-winTop;
	}
};
LSMScreen.SimpleWindow.prototype.mouseUp=function(param){
	this.moving=false;
};
LSMScreen.SimpleWindow.prototype.mouseMove=function(param){
	if(this.movable){
		if(this.moving){
			$(this.win).css("left",param.pageX-this.adjustX);
			$(this.win).css("top",param.pageY-this.adjustY);
		}
	}
};
LSMScreen.SimpleWindow.prototype.closeWin=function(){
	if(this.beforeClose!=null){
		this.beforeClose();
	}
	if(this.hideOnClose){
		this.hide();
	}else{
		try{
			$(this.modalBack).remove();
			$(this.win).remove();
		}catch(e){
			console.log("win close error");
		}
	}
};

LSMScreen.SimpleWindow.prototype.hide=function(){
	$(this.win).css("display","none");
	$(this.modalBack).css("display","none");
};
LSMScreen.SimpleWindow.prototype.show=function(){
	$(this.win).css("display","block");
	$(this.modalBack).css("display","block");
};

LSMScreen.SimpleWindow.prototype.doResize=function(width,height){
	if(this.config.doResize){
		this.config.doResize(width,height);
	}
	
};

LSMScreen.SimpleWindow.prototype.maximizeWin=function(){
	if(this.isMaximized){
		$(this.win).width(this.config.width);
		$(this.win).height(this.config.height);
		
		$(this.title).width(this.config.width);
		$(this.title).height(this.config.titleHeight);
		
		$(this.content).width(this.config.width);
		$(this.content).height(this.config.height-this.config.titleHeight);
		this.isMaximized=false;
		this.doResize(this.config.width,this.config.height-this.config.titleHeight);
	}else{
		var maxParent=this.config.maxParent;
		
		$(this.win).width($(maxParent).width());
		$(this.win).height($(maxParent).height());
		
		$(this.title).width($(maxParent).width());
		$(this.title).height(this.config.titleHeight);
		
		$(this.content).width($(maxParent).width());
		$(this.content).height($(maxParent).height()-this.config.titleHeight);
		this.isMaximized=true;
		this.doResize($(maxParent).width(),$(maxParent).height()-this.config.titleHeight);
		
	}
	
};






