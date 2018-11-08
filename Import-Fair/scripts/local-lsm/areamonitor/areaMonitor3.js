var CommonScreen = CommonScreen || {};

/**
 * 迪士尼大屏右侧分布图表大屏
 * @class CommonScreen.RightScreen
 * @extends LSMScreen.ScreenBase
 * @classdesc 继承ScreenBase 绘制大屏组件,控制定时刷新各个组件
 */
CommonScreen.RightScreen=function(_hotspot)
{
	this.hotspot=_hotspot;
	this.initialize.apply(this, arguments);
};
/** 从ScreenBase继承*/
CommonScreen.RightScreen.prototype=Object.create(SceneBase.RightScreen.prototype);
CommonScreen.RightScreen.prototype.constructor=CommonScreen.RightScreen;
///////////////////////////////////////新版内容

/**
 * 迪士尼大屏右侧分布图表大屏
 * @class CommonScreen.RightScreen
 * @extends LSMScreen.ScreenBase
 * @classdesc 继承ScreenBase 绘制大屏组件,控制定时刷新各个组件
 */
CommonScreen.NewVersionRight=function(_hotspot)
{
	this.hotspot=_hotspot;
	this.initialize.apply(this, arguments);
};
/** 从ScreenBase继承*/
CommonScreen.NewVersionRight.prototype=Object.create(SceneBase.NewVersionRight.prototype);
CommonScreen.NewVersionRight.prototype.constructor=CommonScreen.NewVersionRight;
//////////////////////////

/**
 * 终端排名玫瑰图(黄文接口)
 * @class CommonScreen.TerminalRoseChart
 * @extends LSMScreen.DataChartPie
 * @classdesc 
 */
CommonScreen.TerminalRoseChart=function (){
	this.initialize.apply(this, arguments);
};
/** 从DataChartBase继承*/
CommonScreen.TerminalRoseChart.prototype=Object.create(SceneBase.TerminalRoseChart.prototype);
CommonScreen.TerminalRoseChart.prototype.constructor=CommonScreen.TerminalRoseChart;
