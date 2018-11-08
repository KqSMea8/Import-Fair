var DisneyScreen = DisneyScreen || {};

/**
 * 迪士尼大屏右侧分布图表大屏
 * @class DisneyScreen.RightScreen
 * @extends LSMScreen.ScreenBase
 * @classdesc 继承ScreenBase 绘制大屏组件,控制定时刷新各个组件
 */
DisneyScreen.RightScreen=function(_hotspot)
{
	this.hotspot=_hotspot;
	this.initialize.apply(this, arguments);
};
/** 从ScreenBase继承*/
DisneyScreen.RightScreen.prototype=Object.create(SceneBase.RightScreen.prototype);
DisneyScreen.RightScreen.prototype.constructor=DisneyScreen.RightScreen;
///////////////////////////////////////新版内容

/**
 * 迪士尼大屏右侧分布图表大屏
 * @class DisneyScreen.RightScreen
 * @extends LSMScreen.ScreenBase
 * @classdesc 继承ScreenBase 绘制大屏组件,控制定时刷新各个组件
 */
DisneyScreen.NewVersionRight=function(_hotspot)
{
	this.hotspot=_hotspot;
	this.initialize.apply(this, arguments);
};
/** 从ScreenBase继承*/
DisneyScreen.NewVersionRight.prototype=Object.create(SceneBase.NewVersionRight.prototype);
DisneyScreen.NewVersionRight.prototype.constructor=DisneyScreen.NewVersionRight;
//////////////////////////

/**
 * 终端排名玫瑰图(黄文接口)
 * @class DisneyScreen.TerminalRoseChart
 * @extends LSMScreen.DataChartPie
 * @classdesc 
 */
DisneyScreen.TerminalRoseChart=function (){
	this.initialize.apply(this, arguments);
};
/** 从DataChartBase继承*/
DisneyScreen.TerminalRoseChart.prototype=Object.create(SceneBase.TerminalRoseChart.prototype);
DisneyScreen.TerminalRoseChart.prototype.constructor=DisneyScreen.TerminalRoseChart;
