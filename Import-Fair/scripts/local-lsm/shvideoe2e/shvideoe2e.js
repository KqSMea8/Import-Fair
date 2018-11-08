var SHVIDEOSCREEN=SHVIDEOSCREEN||{};
SHVIDEOSCREEN.ScreenController=function ()
{
	this.initialize.apply(this, arguments);
	this.initComponents();
};
/** 从ScreenBase继承*/
SHVIDEOSCREEN.ScreenController.prototype=Object.create(LSMScreen.ScreenBase.prototype);
SHVIDEOSCREEN.ScreenController.prototype.constructor=SHVIDEOSCREEN.ScreenController;

SHVIDEOSCREEN.ScreenController.prototype.fakeValueMap={
	"视频流畅度":4.81
}; 
//SP流向表格用 现与apprank表联动
SHVIDEOSCREEN.ScreenController.prototype.areaId="21";//上海市
SHVIDEOSCREEN.ScreenController.prototype.app_type_id="9";//支付
SHVIDEOSCREEN.ScreenController.prototype.app_type_name="支付";//支付宝
SHVIDEOSCREEN.ScreenController.prototype.app_subtype_id="3";//支付宝
SHVIDEOSCREEN.ScreenController.prototype.app_subtype_name="支付宝";//支付宝

SHVIDEOSCREEN.ScreenController.prototype.selectedMajor="视频";
SHVIDEOSCREEN.ScreenController.prototype.allMajors=[
	{name:"视频",id:"5"},
	{name:"支付",id:"9"},
	{name:"即时通信",id:"1"},
	{name:"阅读",id:"2"},
	{name:"微博",id:"3"},
	{name:"导航",id:"4"},
	{name:"音乐",id:"6"},
	{name:"应用商店",id:"7"},
	{name:"游戏",id:"8"},
	{name:"动漫",id:"10"},
	{name:"邮箱",id:"11"},
	{name:"P2P业务",id:"12"},
	{name:"VOIP业务",id:"13"},
	{name:"彩信",id:"14"},
	{name:"浏览下载",id:"15"},
	{name:"财经",id:"16"},
	{name:"安全杀毒",id:"17"}
];
SHVIDEOSCREEN.ScreenController.prototype.rankSpMajors=[
{selected:true,name:"视频点播",minors:['视频:百度视频','视频:360影视大全','视频:搜狐视频','视频:AcFun','视频:咪咕影院','视频:咪咕视频','视频:优酷','视频:腾讯视频','视频:新浪视频','视频:芒果TV','视频:央视影音','视频:天翼视讯']},
{selected:true,name:"视频直播",minors:['视频:虎牙直播','视频:龙珠直播','视频:花椒直播','视频:熊猫TV','视频:全民TV','视频:章鱼TV']},
{selected:true,name:"视频分享",minors:['视频:Gif快手','其他:秒拍','视频:爱拍']},
{selected:true,name:"支付",minors:["支付:和包","支付:支付宝","支付:财付通","支付:微信抢红包"]},
{selected:true,name:"购物",minors:['购物:唯品会','购物:楚楚街','购物:苏宁易购','购物:淘宝','购物:1号店','购物:天猫','购物:聚美优品','购物:京东','购物:当当','购物:聚划算','其他:小红书海外购物神器','其他:洋码头','浏览下载:贝贝网','浏览下载:卷瓜网','浏览下载:口袋购物','浏览下载:小米商城','浏览下载:蘑菇街','浏览下载:返利网','浏览下载:华为商城','浏览下载:微店','浏览下载:什么值得买','浏览下载:微软官网','浏览下载:卓越','浏览下载:拼多多']},
{selected:false,name:"音乐",minors:['音乐:懒人听书','音乐:爱音乐','音乐:酷我音乐盒','音乐:酷狗音乐','音乐:唱吧','音乐:荔枝FM','音乐:全民K歌','音乐:QQ音乐','音乐:百度音乐','音乐:虾米音乐','音乐:音悦台','浏览下载:铃声多多','音乐:咪咕音乐','音乐:网易云音乐']},
{selected:false,name:"应用商店",minors:['应用商店:魅族应用中心','应用商店:易用汇','应用商店:沃商店','浏览下载:iCloud云服务','应用商店:AppStore','应用商店:豌豆荚','应用商店:360手机助手','应用商店:安智市场','应用商店:百度手机助手','应用商店:华为应用市场','应用商店:海马苹果助手','应用商店:搜狗手机助手','应用商店:应用宝','应用商店:小米应用商店','应用商店:PP助手']},
{selected:false,name:"邮箱",minors:['邮箱:139邮箱','邮箱:189邮箱','邮箱:QQ邮箱']},
{selected:false,name:"阅读",minors:['阅读:搜狗阅读','阅读:纵横中文网','阅读:QQ阅读','阅读:掌阅iReader','阅读:书旗小说','阅读:追书神器','其他:有道词典','其他:天天快报','阅读:咪咕阅读','阅读:糗事百科']},
{selected:false,name:"即时通讯",minors:['即时通信:阿里旺旺','即时通信:QQ','即时通信:米聊','即时通信:微信','即时通信:陌陌','即时通信:飞信']},
{selected:false,name:"网页浏览",minors:['浏览下载:百思不得姐','微博社区:腾讯微博','浏览下载:新浪网','浏览下载:新浪新闻','浏览下载:凤凰新闻','浏览下载:网易新闻','浏览下载:央视新闻','其他:百度手机浏览器','其他:2345浏览器','浏览下载:知乎','浏览下载:网易网','浏览下载:凤凰网','浏览下载:搜狐新闻','浏览下载:新浪体育','浏览下载:和冲浪','浏览下载:LOFTER','微博社区:掌中天涯','微博社区:百度贴吧','其他:一点网聚','其他:android-QQ浏览器','浏览下载:今日头条','浏览下载:虎扑','浏览下载:百度新闻','浏览下载:神马搜索','微博社区:新浪微博','微博社区:豆瓣','浏览下载:百度','浏览下载:腾讯网','浏览下载:搜狐网','浏览下载:中华网','浏览下载:腾讯新闻','浏览下载:豆果美食']},
{selected:false,name:"生活服务",minors:['其他:摩拜单车','浏览下载:大众点评','浏览下载:车轮查违章','浏览下载:美拍','浏览下载:大姨吗','浏览下载:百度外卖','浏览下载:中关村在线','浏览下载:汽车之家','浏览下载:58同城','购物:美团','购物:百度糯米','其他:美图秀秀','其他:悦跑圈','其他:汽车头条','其他:嘀嗒拼车','其他:运满满','其他:黄油相机','浏览下载:驴妈妈','浏览下载:易车网','浏览下载:飞常准','浏览下载:百姓网','浏览下载:Accuweather','出行旅游:携程旅行','出行旅游:艺龙','其他:快的打车','其他:美颜相机','浏览下载:爱卡汽车','浏览下载:下厨房','浏览下载:美柚','浏览下载:饿了么','微博社区:世纪佳缘','浏览下载:搜房网','浏览下载:太平洋汽车网','浏览下载:蚂蜂窝']},
{selected:false,name:"银行",minors:['支付:平安银行','支付:民生银行','支付:招商银行','支付:光大银行','支付:交通银行']},
{selected:false,name:"财经",minors:['财经:51信用卡管家','财经:同花顺','财经:东方财富网','财经:中国经济网','财经:大智慧']},
{selected:false,name:"地图导航",minors:['导航:搜狗地图','导航:高德地图','导航:百度地图','导航:高德导航','导航:苹果地图','导航:和地图']},
{selected:false,name:"工具应用",minors:['其他:OPPO天气','其他:搜狗输入法','其他:触宝输入法','其他:中华万年历','其他:灵犀','浏览下载:兔展','其他:墨迹天气','其他:天气通','其他:中国天气','其他:百度输入法','其他:蒲公英','安全杀毒:360安全卫士','安全杀毒:360手机卫士','安全杀毒:腾讯手机管家','安全杀毒:金山毒霸']},
{selected:false,name:"下载和云",minors:['浏览下载:苹果固件更新','浏览下载:腾讯软件下载更新','网盘云服务:微云','网盘云服务:115网盘','其他:阿里云','其他:酷云','浏览下载:金山云']},
{selected:false,name:"游戏",minors:['游戏:爱游戏','浏览下载:多玩游戏','浏览下载:九游','游戏:节奏大师','游戏:葫芦侠','游戏:咪咕游戏','游戏:开心消消乐','浏览下载:4399游戏网','游戏:QQ飞车']}
];
SHVIDEOSCREEN.ScreenController.prototype.allKpis=LSMConsts.videoKpis;
SHVIDEOSCREEN.ScreenController.prototype.allKpisFake=[ 
 {icon:"user",name:"用户数",key:"4G用户数",unit:"万人",rate:1/10000,fixed:1,ymin:0,ymax:null,source:"用户数"},
 {icon:"flow",name:"流量",key:"4G流量",unit:"GB",rate:1/1024/1024,fixed:1,ymin:0,ymax:null,source:"网络质量"},
 {icon:"play_succ",name:"播放成功率",key:"4G视频播放成功率",unit:"%",rate:100,fixed:2,ymin:0,ymax:100,source:"网络质量",videoOnly:true},
 {icon:"play_delay",name:"播放时延 ",key:"4G视频播放时延",unit:"ms",rate:1,fixed:0,ymin:0,ymax:null,source:"网络质量",videoOnly:true},
 {icon:"play_succ",name:"视频流畅度",key:"视频流畅度",unit:"(高清)",rate:1,fixed:1,ymin:0,ymax:100,source:"网络质量",videoOnly:true},
  
 {icon:"dlspeed",name:"下载速率",key:"4G下行速率500k",unit:"Kbps",rate:1,fixed:0,ymin:0,ymax:null,source:"网络质量"},
 {icon:"selfprovince",name:"本省率",key:"4G本省率",unit:"%",rate:100,fixed:1,ymin:0,ymax:100,source:"网络质量"},
 {icon:"selfnet",name:"本网率",key:"4G本网率",unit:"%",rate:100,fixed:1,ymin:0,ymax:100,source:"网络质量"},
 {icon:"tcp_succ",name:"TCP建链成功率 ",key:"4GTCP成功率",unit:"%",rate:100,fixed:2,ymin:0,ymax:100,source:"网络质量"},
 {icon:"tcp_delay",name:"TCP建链时延 ",key:"4GTCP时延",unit:"ms",rate:1,fixed:0,ymin:0,ymax:null,source:"网络质量"},
 {icon:"http_succ",name:"HTTP成功率",key:"4GHTTP成功率",unit:"%",rate:100,fixed:2,ymin:0,ymax:100,source:"网络质量"},
 {icon:"tcp_delay",name:"HTTP时延",key:"4GHTTP时延",unit:"ms",rate:1,fixed:0,ymin:0,ymax:null,source:"网络质量"},
 
 {icon:"tcp_shake_succ",name:"TCP一二次握手成功率 ",key:"4GTCP第一、二次握手成功率",unit:"%",rate:100,fixed:2,ymin:0,ymax:100,source:"网络质量"},
 {icon:"tcp_shake_delay",name:"TCP一二次握手时延 ",key:"4GTCP第一、二次握手时延",unit:"ms",rate:1,fixed:0,ymin:0,ymax:null,source:"网络质量"},
 {icon:"tcp_shake_succ",name:"TCP二三次握手成功率",key:"4GTCP第二、三次握手成功率",unit:"%",rate:100,fixed:2,ymin:0,ymax:100,source:"网络质量"},
 {icon:"tcp_shake_delay",name:"TCP二三次握手时延",key:"4GTCP第二、三次握手时延",unit:"ms",rate:1,fixed:0,ymin:0,ymax:null,source:"网络质量"},
 {icon:"tcp_up_re",name:"TCP上行重传率",key:"4GTCP上行重传率",unit:"%",rate:100,fixed:2,ymin:0,ymax:100,source:"网络质量"},
 
 {icon:"tcp_down_re",name:"TCP下行重传率",key:"4GTCP下行重传率",unit:"%",rate:100,fixed:2,ymin:0,ymax:100,source:"网络质量"},
 {icon:"tcp_up_disorder",name:"TCP上行乱序率",key:"4GTCP上行乱序率",unit:"%",rate:100,fixed:2,ymin:0,ymax:100,source:"网络质量"},
 {icon:"tcp_down_disorder",name:"TCP下行乱序率",key:"4GTCP下行乱序率",unit:"%",rate:100,fixed:2,ymin:0,ymax:100,source:"网络质量"},
 {icon:"user_permeate",name:"用户渗透率",key:"4G用户渗透率",unit:"%",rate:100,fixed:2,ymin:0,ymax:100,source:"网络质量"},
 {icon:"allbus_percent",name:"全网业务占比",key:"4G全网业务占比",unit:"%",rate:100,fixed:2,ymin:0,ymax:100,source:"网络质量"},
 {icon:"play_delay",name:"视频卡顿次数",key:"其他上行流量",unit:"次",rate:1,fixed:0,ymin:0,ymax:null,source:"网络质量",videoOnly:true}
 ];


SHVIDEOSCREEN.ScreenController.prototype.SelectedKpis=[
                                                       {icon:"user",name:"用户数",key:"4G用户数",unit:"万人",rate:1/10000,fixed:1,ymin:0,ymax:null,source:"用户数"},
                                                       {icon:"flow",name:"流量",key:"4G流量",unit:"GB",rate:1/1024/1024,fixed:1,ymin:0,ymax:null,source:"网络质量"},
                                                       {icon:"play_succ",name:"播放成功率",key:"4G视频播放成功率",unit:"%",rate:100,fixed:2,ymin:0,ymax:100,source:"网络质量"},
                                                       {icon:"play_delay",name:"播放时延 ",key:"4G视频播放时延",unit:"ms",rate:1,fixed:0,ymin:0,ymax:null,source:"网络质量"},
                                                       {icon:"play_succ",name:"视频流畅度",key:"视频流畅度",unit:"(高清)",rate:1,fixed:1,ymin:0,ymax:100,source:"网络质量"}
                                                     ];
SHVIDEOSCREEN.ScreenController.prototype.SelectedKpis_common=[
                                                       {icon:"user",name:"用户数",key:"4G用户数",unit:"万人",rate:1/10000,fixed:1,ymin:0,ymax:null,source:"用户数"},
                                                       {icon:"flow",name:"流量",key:"4G流量",unit:"GB",rate:1/1024/1024,fixed:1,ymin:0,ymax:null,source:"网络质量"},
                                                       {icon:"dlspeed",name:"下载速率",key:"4G下行速率500k",unit:"Kbps",rate:1,fixed:0,ymin:0,ymax:null,source:"网络质量"},
                                                       {icon:"http_succ",name:"HTTP成功率",key:"4GHTTP成功率",unit:"%",rate:100,fixed:2,ymin:0,ymax:100,source:"网络质量"},
                                                       {icon:"tcp_delay",name:"HTTP时延",key:"4GHTTP时延",unit:"ms",rate:1,fixed:0,ymin:0,ymax:null,source:"网络质量"}
                                                       ];
                                                       
SHVIDEOSCREEN.ScreenController.prototype.gridCol1_common=[
                                                   {icon:"user",name:"用户数",key:"4G用户数",unit:"万人",rate:1/10000,fixed:1,ymin:0,ymax:null,source:"用户数"},
                                                   {icon:"flow",name:"流量",key:"4G流量",unit:"GB",rate:1/1024/1024,fixed:1,ymin:0,ymax:null,source:"网络质量"},
                                                   {icon:"dlspeed",name:"下载速率",key:"4G下行速率500k",unit:"Kbps",rate:1,fixed:0,ymin:0,ymax:null,source:"网络质量"},
                                                   {icon:"selfprovince",name:"TCP成功率",key:"4GTCP成功率",unit:"%",rate:100,fixed:2,ymin:0,ymax:100,source:"网络质量"},
                                                   {icon:"selfnet",name:"业务时延",key:"4GTCP时延",unit:"ms",rate:1,fixed:0,ymin:0,ymax:100,source:"网络质量"},
                                                   {icon:"allbus_percent",name:"全网业务占比",key:"4G全网业务占比",unit:"%",rate:100,fixed:2,ymin:0,ymax:100,source:"网络质量"}
                                                   ];

SHVIDEOSCREEN.ScreenController.prototype.gridCol1=[
                                                       {icon:"user",name:"用户数",key:"4G用户数",unit:"万人",rate:1/10000,fixed:1,ymin:0,ymax:null,source:"用户数"},
                                                       {icon:"flow",name:"流量",key:"4G流量",unit:"GB",rate:1/1024/1024,fixed:1,ymin:0,ymax:null,source:"网络质量"},
                                                       {icon:"dlspeed",name:"下载速率",key:"4G下行速率500k",unit:"Kbps",rate:1,fixed:0,ymin:0,ymax:null,source:"网络质量"},
                                                       {icon:"play_succ",name:"播放成功率",key:"4G视频播放成功率",unit:"%",rate:100,fixed:2,ymin:0,ymax:100,source:"网络质量"},
                                                       {icon:"play_delay",name:"播放时延 ",key:"4G视频播放时延",unit:"ms",rate:1,fixed:0,ymin:0,ymax:null,source:"网络质量"}
                                                       ];
                                                       
SHVIDEOSCREEN.ScreenController.prototype.gridCol2=[
														{icon:"user",id:"user_count",name:"用户数",key:"4G用户数",unit:"万人",rate:1,fixed:1,ymin:0,ymax:null,source:"用户数"},
														{icon:"flow",id:"all_bytes",name:"流量",key:"4G流量",unit:"GB",rate:1,fixed:1,ymin:0,ymax:null,source:"网络质量"},
														{icon:"dlspeed",id:"dl_rate",name:"下载速率",key:"4G下行速率500k",unit:"Kbps",rate:1,fixed:0,ymin:0,ymax:null,source:"网络质量"},
														{icon:"play_succ",id:"kqi_rstp_req_succrate",name:"播放成功率",key:"4G视频播放成功率",unit:"%",rate:100,fixed:2,ymin:0,ymax:100,source:"网络质量"},
	                                                       {icon:"play_delay",id:"kqi_rstp_req_wait_dur",name:"播放时延 ",key:"4G视频播放时延",unit:"ms",rate:1,fixed:0,ymin:0,ymax:null,source:"网络质量"}
	                                                       ];

SHVIDEOSCREEN.ScreenController.prototype.gridCol2_common=[
													{icon:"user",id:"user_count",name:"用户数",key:"4G用户数",unit:"万人",rate:1,fixed:1,ymin:0,ymax:null,source:"用户数"},
													{icon:"flow",id:"all_bytes",name:"流量",key:"4G流量",unit:"GB",rate:1,fixed:1,ymin:0,ymax:null,source:"网络质量"},
													{icon:"selfprovince",id:"tcpESTABSuccRate",name:"TCP成功率",key:"4GTCP成功率",unit:"%",rate:1,fixed:2,ymin:0,ymax:100,source:"网络质量"},
	                                                   {icon:"selfnet",id:"tcpESTABDur",name:"业务时延",key:"4GTCP时延",unit:"ms",rate:1,fixed:0,ymin:0,ymax:100,source:"网络质量"},
	                                                   {icon:"allbus_percent",id:"flow_rate",name:"全网业务占比",key:"4G全网业务占比",unit:"%",rate:1,fixed:2,ymin:0,ymax:100,source:"网络质量"}
                                                      ];

SHVIDEOSCREEN.ScreenController.prototype.mapKpiPosMap={"baseWidth":1040,"baseHeight":556,"嘉定":{"top":"103px","left":"214px"},"宝山":{"top":"89px","left":"310px"},"青浦":{"top":"245px","left":"137px"},"松江":{"top":"286px","left":"227px"},"金山":{"top":"401px","left":"237px"},"奉贤":{"top":"366px","left":"380px"},"浦东":{"top":"237px","left":"464px"},"崇明":{"top":"89px","left":"527px"},"闵行":{"top":"271px","left":"333px"},"北区":{"top":"144px","left":"373px"},"西区":{"top":"166px","left":"256px"},"南区":{"top":"207px","left":"338px"}};

SHVIDEOSCREEN.ScreenController.prototype.dm=null;
SHVIDEOSCREEN.ScreenController.prototype.videoMajorKey="视频";

//echarts图表
SHVIDEOSCREEN.ScreenController.prototype.chart1=null;
SHVIDEOSCREEN.ScreenController.prototype.chart2=null;
SHVIDEOSCREEN.ScreenController.prototype.chart3=null;
SHVIDEOSCREEN.ScreenController.prototype.chartList=[];

//表格
SHVIDEOSCREEN.ScreenController.prototype.grid1=null;
SHVIDEOSCREEN.ScreenController.prototype.grid2=null;

//数据缓存
SHVIDEOSCREEN.ScreenController.prototype.titleKpiCache={};//头部时间点数据
SHVIDEOSCREEN.ScreenController.prototype.appRankDataCache={};//排名表格数据
SHVIDEOSCREEN.ScreenController.prototype.spDirDataCache=[];//sp流向数据
SHVIDEOSCREEN.ScreenController.prototype.mapDataCache={};//分属地数据

SHVIDEOSCREEN.ScreenController.prototype.selectedIndex=0;//选中的头部指标索引，用于切换图表数据

SHVIDEOSCREEN.ScreenController.prototype.drillAppFrame=null;//钻取业务小类的iframe

SHVIDEOSCREEN.ScreenController.prototype.trendBegin=null;//默认当前趋势图时间范围
SHVIDEOSCREEN.ScreenController.prototype.trendEnd=null;//默认当前趋势图时间范围

SHVIDEOSCREEN.ScreenController.prototype.initComponents=function()
{
	$("#majorConfig").text(this.selectedMajor);
	this.dm=LSMScreen.DataManager.getInstance();
	
	$("#appExcel").on('click',this.exportAppGrid.bind(this));
	$("#spdirExcel").on('click',this.exportSpDirGrid.bind(this));
	$(".chartParent").on('dblclick',this.maximizeChart.bind(this));
	//echarts
	this.chart1=new LSMScreen.SimpleChart($("#chartContent0")[0],{},function(){}.bind(this));
	this.chart2=new LSMScreen.SimpleChart($("#chartContent1")[0],{},function(){}.bind(this));
	this.chart3=new LSMScreen.SimpleChart($("#chartContent2")[0],{},function(){}.bind(this));
	var list=this.getTitleKpis();
	this.chart1.kpiConfig=list[0];
	this.chart2.kpiConfig=list[1];
	this.chart3.kpiConfig=list[2];
	this.chartList=[this.chart1,this.chart2,this.chart3];
	
	//jqgrid
	this.initAppRankGrid();
//	this.initSpDirGrid();
	//地图右侧指标列表
	this.initMapKpiList();
	//地图指标定位
	var mapKpiDivs=$(".mapKpiDiv");
	for(var i=0;i<mapKpiDivs.length;i++){
		var cityKey=$(mapKpiDivs[i]).attr("name");
		var pos=this.mapKpiPosMap[cityKey];
		$(mapKpiDivs[i]).css("left",pos.left);
		$(mapKpiDivs[i]).css("top",pos.top);
	}
	
	
//	绑定事件
	$("#btn_period").on('click',this.changePeriod.bind(this));//小时实时
	
	$(".kpiArrow").on('click',this.mapListKpiScroll.bind(this));//右侧地图指标列表滚动
	$(".fv").on('click',this.titleKpiClicked.bind(this));//头部指标点击 切换趋势图指标
	
	$(".rightTabIcon").on('click',this.rightmrClicked.bind(this));//右下SP流向和属地分布tab
	$(".chartbtn").on('click',this.chartFuncBtnClicked.bind(this));//趋势图功能按钮
	$(".kpiConfig").on('click',this.kpiConfigClicked.bind(this));//指标配置
	$("#majorConfig").on('click',this.majorConfigClicked.bind(this));//业务大类选择
	$("#focusMajorConfig").on('click',this.focusMajorConfigClicked.bind(this));//左下角关注tab选择
	
//	this.testEvent();//用于拖动地图指标框
//	查询数据
	this.update();
	
};
SHVIDEOSCREEN.ScreenController.prototype.initMapKpiList = function(){
	//地图右侧指标列表
	var kpiHtmlList='';
	var list=this.getAllKpis();
	for(var i=0;i<list.length;i++){
		var styleC="tlist";
		if(i==this.selectedIndex){
			styleC="tlist stlist";
		}
		kpiHtmlList+='<div name="'+i+'" class="'+styleC+' mapListKpi"><span>'+list[i].name+'</span></div>';
	}
	$("#tb_list").html(kpiHtmlList);
	$(".mapListKpi").on('click',this.mapListKpiClicked.bind(this));//右侧地图指标列表点击
};
SHVIDEOSCREEN.ScreenController.prototype.maximizeChart = function(evt){
	var chartIndex=$(evt.currentTarget).attr("index");
	var parentId="chartParent"+chartIndex;
	var contentId="chartContent"+chartIndex;
	var titleId="chartTitle"+chartIndex;
	var frameWidth=$(".EAE").width();
	var frameHeight=$(".EAE").height();
	var win=new LSMScreen.SimpleWindow({
		title:$("#"+titleId).text(),
		width:frameWidth*0.6,
		height:frameHeight*0.6,
		x:frameWidth*0.2,
		y:frameHeight*0.2,
		beforeClose:function(){
			$("#"+parentId).append($("#"+contentId));
			this.reloadChart(chartIndex);
		}.bind(this)
	});
	$(win.content).append($("#"+contentId));
	this.reloadChart(chartIndex);
};
SHVIDEOSCREEN.ScreenController.prototype.changePeriod = function(){
	var src=$("#btn_period").attr("src");
	var name=$("#btn_period").attr("name");
	if(name=="realtime"){
		$("#hour_time_txt").css("display","block");
		$("#btn_period").attr("name","hour");
		$("#btn_period").attr("src",src.replace("realtime.png","hour.png"));
	}else{
		$("#hour_time_txt").css("display","none");
		$("#btn_period").attr("name","realtime");
		$("#btn_period").attr("src",src.replace("hour.png","realtime.png"));
	}
	this.getAppRankData();
	this.getSpDirData();
};
SHVIDEOSCREEN.ScreenController.prototype.getTimeType = function()
{
	var type=$("#btn_period").attr("name");
	if(type=="realtime"){
		type=null;
	}
	return type;
};
SHVIDEOSCREEN.ScreenController.prototype.exportAppGrid=function()
{
	SUtils.exportJQGrid(this.grid1,this.getSelectedTabMajor()+"-应用排名");
};
SHVIDEOSCREEN.ScreenController.prototype.exportSpDirGrid=function()
{
	SUtils.exportJQGrid(this.grid2,"SP流向");
};
//地图指标框定位///////////////////////
SHVIDEOSCREEN.ScreenController.prototype.testEvent=function()
{
	var mapKpiDivs=$(".mapKpiDiv");
	for(var i=0;i<mapKpiDivs.length;i++){
		$(mapKpiDivs[i]).text($(mapKpiDivs[i]).attr("name"));
	}
	
	$("#mapKpiFrame").on('dblclick',this.testLogPos.bind(this));
	$(".mapKpiDiv").on('mousedown',this.testMapKpiDivDown.bind(this));
	$("#mapKpiFrame").on('mousemove',this.testMapKpiDivMove.bind(this));
	$(".mapKpiDiv").on('mouseup',this.testMapKpiDivUp.bind(this));
};
SHVIDEOSCREEN.ScreenController.prototype.testMapKpiDivDown=function(evt)
{
	$(evt.currentTarget).addClass("testmoving");
};
SHVIDEOSCREEN.ScreenController.prototype.testMapKpiDivMove=function(evt)
{
	var cell=$(".testmoving");
	if(cell.length==1){
		cell.css("left",evt.offsetX);
		cell.css("top",evt.offsetY);
	}
};
SHVIDEOSCREEN.ScreenController.prototype.testMapKpiDivUp=function(evt)
{
	$(".mapKpiDiv").removeClass("testmoving");
};
SHVIDEOSCREEN.ScreenController.prototype.testLogPos=function(evt)
{
	var posMap={};
	var list=$(".mapKpiDiv");
	var i=0;
	posMap.baseWidth=$("#mapKpiFrame").width();
	posMap.baseHeight=$("#mapKpiFrame").height();
	for(i=0;i<list.length;i++){
		posMap[$(list[i]).attr("name")]={
			top:$(list[i]).css("top"),
			left:$(list[i]).css("left")
		};
	}
	console.log(JSON.stringify(posMap));
};
//地图指标框定位 END///////////////////////
SHVIDEOSCREEN.ScreenController.prototype.initAppRankGrid=function()
{
	$("#leftgrid").html("");
	var tableId=Math.uuid();
	var tableDom=document.createElement("table");
	$(tableDom).attr("id",tableId);
	$(tableDom).css("width","100%");
	$(tableDom).css("height","100%");
	$("#leftgrid").append(tableDom);
	var baseColWidth=178;
	//app排名
	var opt1={};
	var colNames1=['','','应用名称'];
	var colModel1=[
	               {colName:'应用大类',name : 'major',index : 'major',hidden:true},
	               {colName:'应用小类',name : 'element',index : 'element',width : 90,
						formatter:function(cellvalue){
							var iconPath=BASEPATH+"/static/styles/local-lsm/app/"+SUtils.getAppIconPath(cellvalue);
							var title=cellvalue;
							if(cellvalue=="微信抢红包"){
								title="微信支付";
							}
							return '<img src="'+iconPath+'" title="'+title+'"></img>';
						}
	               },
	               {colName:'应用名称',name : 'element',index : 'element',hidden:false,width : 120,
						formatter:function(cellvalue){
							var iconPath=BASEPATH+"/static/styles/local-lsm/app/"+SUtils.getAppIconPath(cellvalue);
							var title=cellvalue;
							if(cellvalue=="微信抢红包"){
								title="微信支付";
							}
							return title;
						}
	               }
	             ];
	var defaultColLength=colNames1.length;
	var cols=this.getGridCol1();
	for(var i=0;i<cols.length;i++){
		if(cols[i].name=="用户数"){
			colNames1.push("用户数(人)");
			colModel1.push({
				colName:"用户数(人)",
				name : cols[i].key,
				index : cols[i].key,
				width : baseColWidth,
				formatter:function(cellvalue,config,rowData){
					var colIndex=config.pos;
					var index=colIndex-defaultColLength;
					var kpi=cols[index];
					var realValue=cellvalue;
					if(isNaN(realValue)){
						realValue="";
					}
					return realValue;
				}.bind(this)
			}); 
		}else{
			colNames1.push(cols[i].name+'('+cols[i].unit+')');
			colModel1.push({
				colName:cols[i].name+'('+cols[i].unit+')',
				name : cols[i].key,
				index : cols[i].key,
				width : baseColWidth,
				formatter:function(cellvalue,config,rowData){
					var colIndex=config.pos;
					var index=colIndex-defaultColLength;
					var kpi=cols[index];
					var realValue=(cellvalue*kpi.rate).toFixed(kpi.fixed);
					if(isNaN(realValue)){
						realValue="";
					}
					return realValue;
				}.bind(this)
			}); 
		}
		
	}
	
	
	var opt1={
        datatype : function(){},
        colNames:colNames1,
        colModel : colModel1,
        autowidth:true,
        shrinkToFit:false,
        autoScroll: true,
        loadui:'disable',
        afterInsertRow:function(rowid,rowdata){
        	var tr=this.grid1.find("tbody").find("tr")[rowid];
        	var list=$(tr).find("td");
        	var td=list[1];
        	$(td).css("cursor","pointer");
        	$(td).attr("app",rowdata.element);
        	$(td).attr("major",rowdata.major);
        	$(td).on('click',this.drillApp.bind(this));
        	for(var i=2;i<list.length;i++){
        		$(list[i]).attr("major",rowdata.major);
        		$(list[i]).attr("minor",rowdata.element);
        		$(list[i]).on('click',this.appRankRowClicked.bind(this));
        	}
        	
        }.bind(this),
        height:$(tableDom).height()-60//表头
	};
	this.grid1=$(tableDom).jqGrid(opt1);
};
SHVIDEOSCREEN.ScreenController.prototype.appRankRowClicked=function(e)
{
	var major=$(e.currentTarget).attr("major");
	var minor=$(e.currentTarget).attr("minor");
	this.changeSpDirGridParam(major,minor);
};
SHVIDEOSCREEN.ScreenController.prototype.changeSpDirGridParam=function(major,minor)//真实业务大类名称
{
	this.dm.getMajors({},function(majorsMap){
		this.app_type_id="--";
		this.app_type_name=this.getSelectedTabMajor();
		for(var majorKey in majorsMap){
			if(majorsMap[majorKey]==major){
				this.app_type_id=majorKey;
				this.app_type_name=this.getSelectedTabMajor();
				break;
			}
		}
		this.dm.getMinorsByMajor({major:major},function(result){
			for(var key in result){
				if(result[key]==minor){
					this.app_subtype_id=key;
					this.app_subtype_name=minor;
					break;
				}
			}
			this.initSpDirGrid(true);
		}.bind(this));
		
	}.bind(this));
};
SHVIDEOSCREEN.ScreenController.prototype.initSpDirGrid=function(isForce)
{
	if(isForce){
		this.spDirGridInited=false;
	}
	if($("#rightgridParent").css("display")=="none"||this.spDirGridInited==true){
		return;
	}
	this.spDirGridInited=true;
	var baseColWidth=150;
	$("#rightgridParent").html("");
	var tableId=Math.uuid();
	var tableDom=document.createElement("table");
	$(tableDom).attr("id",tableId);
	$(tableDom).css("width","100%");
	$(tableDom).css("height","100%");
	$("#rightgridParent").append(tableDom);
	var nameTitle=""+this.app_type_name+"-"+this.app_subtype_name+""
	var colNames2=[nameTitle];
	var colModel2=[{colName:nameTitle,name : 'sp_system',index : 'sp_system',width : 220,fixed:true}];
	var useCols=this.getGridCol2();
	for(var i=0;i<useCols.length;i++){
		colNames2.push(useCols[i].name+'('+useCols[i].unit+')');
		colModel2.push({
			colName:useCols[i].name+'('+useCols[i].unit+')',
			name : useCols[i].id,
			index : useCols[i].id,
			width : baseColWidth,
			formatter:function(cellvalue,config,rowData){
				var colIndex=config.pos;
				var index=colIndex-1;
				var kpi=useCols[index];
				var realValue=(cellvalue*kpi.rate).toFixed(kpi.fixed);
				if(isNaN(realValue)){
					realValue="";
				}
				return realValue;
			}.bind(this)
		}); 
	}
	
	var postData={
		"area_id":this.areaId,
		"app_type_id":this.app_type_id,
		"app_subtype_id":this.app_subtype_id,
		"time":SUtils.getDiffDateTimeFromNow(-1,SUtils.TIME_TYPE.DATE,"yyyyMMdd0000"),
		"level":"day",
		"page":"1",
		"limit":"99"
	};
	var opt2={
        datatype : 'json',
        page:"1",
        limit:"99",
        colNames:colNames2,
        colModel : colModel2,
        autowidth:true,
        shrinkToFit:false,
        autoScroll: true,
        loadtext:'加载中...',
        postData:{
        	"params":JSON.stringify(postData),
        	"page":"1"
        },
        jsonReader:{
        	root: "data.elements",  //数据模型
        	page: "data.pageNo",//数据页码
        	total: "data.pageNum",//数据总页码
        	records: "data.total",
        	repeatitems:false
        },
        mtype:"POST",
        height:$(tableDom).height()-60,
        url:LSMConsts.G_URLCONFIG.urlInasSml+"/query/selfMonitor-flowAnalysis-qualDetails"
	};
	this.grid2=$($(tableDom)[0]).jqGrid(opt2);
//	this.grid2[0].addJSONData(this.spDirDataCache);
};
SHVIDEOSCREEN.ScreenController.prototype.update=function()
{
	this.getTitleKpiData();
	
	var i=0;
	for(i=0;i<this.chartList.length;i++){
		this.getKpiTrendData(this.renderChartBySelfConfig,i);
	}
	
	this.getAppRankData();
	this.getSpDirData();
	this.getMapData();
};

//头部时间点数据///////////////////////
SHVIDEOSCREEN.ScreenController.prototype.titleKpiClicked=function(evt)
{
	var index=$(evt.currentTarget).attr("name");
	this.selectedIndex=index*1;
	this.renderChartByTitleIndex(this.selectedIndex);
	
};
SHVIDEOSCREEN.ScreenController.prototype.getTitleKpiData=function()
{
	this.dm.getVideoQualityRecord({majorName:this.selectedMajor},this.qualityRecordHandler.bind(this));
	
};

SHVIDEOSCREEN.ScreenController.prototype.qualityRecordHandler=function(result)
{
	this.titleKpiCache=$.extend(this.titleKpiCache,result[this.selectedMajor]);
	this.renderTitleKpi();
};

SHVIDEOSCREEN.ScreenController.prototype.renderTitleKpi=function()
{
	var time=this.titleKpiCache.time;
	var start=SUtils.getHourAndMinuteFive(time);
	var end=SUtils.getHourAndMinuteFive(time,true);
	$("#titleTime").text(start+"-"+end);
	
	var list=this.getTitleKpis();
	var i=0;
	for(i=0;i<list.length;i++){
		var kpi=list[i];
		var value=this.titleKpiCache[kpi.key];
		var idIndex=i+1;
		if(this.fakeValueMap[kpi.key]!=null){
			value=this.fakeValueMap[kpi.key];
		}else if(isNaN(value)){
			value="--";
		}else{
			if(kpi.name=="下载速率"){
				value=(value*kpi.rate).toFixed(0);
			}else{
				value=(value*kpi.rate).toFixed(kpi.fixed);
			}
		}
		$("#titleIcon"+idIndex).attr("class","icon icon-"+kpi.icon);
		$("#kpiName"+idIndex).text(kpi.name);
		$("#kpiValue"+idIndex).text(value);
		$("#kpiUnit"+idIndex).text(kpi.unit);
	}
};
//头部时间点数据 END///////////////////////
//趋势图数据///////////////////////
SHVIDEOSCREEN.ScreenController.prototype.chartFuncBtnClicked=function(evt)
{
	var chartIndex=$(evt.currentTarget).attr("name");
	var func=$(evt.currentTarget).attr("func");
	switch(func){
	case "refresh":
		this.getKpiTrendData(this.renderChartBySelfConfig,chartIndex);
		break;
	case "kpichange":
		this.showKpiList(chartIndex);
		break;
	case "timechange":
		this.showCompareTimeChooser(chartIndex);
		break;
	}
};
SHVIDEOSCREEN.ScreenController.prototype.showKpiList = function(chartIndex){
	if(this["kpiChooser"+chartIndex]==null){
		var winWidth=300;
		var winHeight=370;
		var win=null;
		this["kpiChooser"+chartIndex]=win=new LSMScreen.SimpleWindow({
			title:"指标选择",
			width:winWidth,
			height:winHeight,
			x:$("#chartContent"+chartIndex).offset().left+$("#chartContent"+chartIndex).width()-winWidth,
			y:$("#chartContent"+chartIndex).offset().top,
			closeFunc:function(){
				this["kpiChooser"+chartIndex].hide();
			}.bind(this),
			beforeClose:function(){
				
			}.bind(this)
		});
		var tableDom=document.createElement("table");
		$(tableDom).attr("id",Math.uuid());
		$(win.content).append(tableDom);
		var cols=[
		    {colName:'指标',name : 'name',index : 'name',width : 300}
		];
		var opt1={
		        datatype : function(){},
		        colNames:['指标'],
		        colModel : cols,
		        loadui:'disable',
		        rowNum:100000,
		        afterInsertRow:function(rowid,rowdata){
		        	var tr=grid.find("tbody").find("tr")[rowid];
		        	$(tr).css("cursor","pointer");
		        	$(tr).attr("kpiIndex",rowid-1);
		        	$(tr).attr("chartIndex",chartIndex);
		        	$(tr).on('click',this.trendKpiSelected.bind(this));
		        }.bind(this),
		        height:winHeight-60
			};
		
		var grid=$(tableDom).jqGrid(opt1);
		grid.closest('.ui-jqgrid-view').find('div.ui-jqgrid-hdiv').hide();
		var arr=this.getAllKpis();
		grid[0].addJSONData(arr);
	}else{
		this["kpiChooser"+chartIndex].show();
	}
	
};
SHVIDEOSCREEN.ScreenController.prototype.trendKpiSelected = function(evt){
	var list=this.getAllKpis();
	var kpiIndex=$(evt.currentTarget).attr("kpiIndex");
	var chartIndex=$(evt.currentTarget).attr("chartIndex");
	this.reloadChart(chartIndex,list[kpiIndex]);
	this["kpiChooser"+chartIndex].hide();
};
SHVIDEOSCREEN.ScreenController.prototype.showCompareTimeChooser = function(chartIndex)
{
	if(this["timeChooser"+chartIndex]==null){
		var winWidth=500;
		var winHeight=200;
		this["timeChooser"+chartIndex]=new LSMScreen.SimpleWindow({
			title:"时间范围选择",
			width:winWidth,
			height:winHeight,
			x:$("#chartContent"+chartIndex).offset().left+$("#chartContent"+chartIndex).width()-winWidth,
			y:$("#chartContent"+chartIndex).offset().top,
			closeFunc:function(){
				this["timeChooser"+chartIndex].hide();
			}.bind(this),
			beforeClose:function(){
				
			}.bind(this)
		});
		var timeInputHtml='<input readonly="readonly" value="'+this.trendBegin+'" type="text" onfocus="WdatePicker({dateFmt:\'yyyy-MM-dd HH:00:00\'})" class="Wdate" style="width:300px;height:35px;"/>';
		var timeInputHtml2='<input readonly="readonly" value="'+this.trendEnd+'" type="text" onfocus="WdatePicker({dateFmt:\'yyyy-MM-dd HH:00:00\'})" class="Wdate" style="width:300px;height:35px;"/>';
		var html='<div class="timeChooserWin">'
			+'<div>开始时间：'+timeInputHtml+'</div>'
			+'<div style="margin-top:10px;">结束时间：'+timeInputHtml2+'</div>';
			
		html+='<div class="kpiChooserWinFoot">';
		
		html+='<div style="width:100%;text-align:center;">';
		html+='<input type="button" class="btn btn-primary" value="确定"></input>';
		html+="&nbsp;&nbsp;&nbsp;&nbsp;";
		html+='<input type="button" class="btn btn-primary" value="取消"></input>';
		html+="</div>";
		
		html+="</div>";
		
		html+="</div>";
		$(this["timeChooser"+chartIndex].content).css("padding","10px 10px 10px 10px");
		$(this["timeChooser"+chartIndex].content).html(html);
		$(this["timeChooser"+chartIndex].content).find(":button").on('click',function(evt){
			if($(evt.currentTarget).val()=="确定"){
				var inputs=$(this["timeChooser"+chartIndex].content).find("input");
				var startTimeStr=$(inputs[0]).val();
				var endTimeStr=$(inputs[1]).val();
				var startDate=new Date(startTimeStr.replace(/-/g,"/"));
				var endDate=new Date(endTimeStr.replace(/-/g,"/"));
				var compareLag=24*60*60*1000;
				var startTime=startDate.getTime();
				var endTime=endDate.getTime();
				if(startTimeStr==""&&endTimeStr!=""||startTimeStr!=""&&endTimeStr==""){
					alert("不能只选一个时间");
					return;
				}else if(endTime<=startTime){
					alert("开始时间必须小于结束时间");
					return;
				}else if(endTime-startTime>compareLag){
					alert("时间区间请限制在24小时内");
					return;
				}else{
					var queryConfig={};
					if(startTimeStr!=""){
						queryConfig.timeBegin=startTimeStr;
					}
					if(endTimeStr!=""){
						queryConfig.timeEnd=endTimeStr;
					}
					this.chartList[chartIndex].timeConfig=queryConfig;
					this.getKpiTrendData(this.renderChartBySelfConfig,chartIndex);
				}
				this["timeChooser"+chartIndex].hide();
			}else{
				this["timeChooser"+chartIndex].hide();
			}
			
		}.bind(this));
	}else{
		this["timeChooser"+chartIndex].show();
	}
};
SHVIDEOSCREEN.ScreenController.prototype.getKpiTrendData=function(callback,chartIndex)
{
	var format="yyyy-MM-dd hh:mm:ss";
	var timeConfig=this.chartList[chartIndex].timeConfig;
	var params={
			majorName:this.selectedMajor,
			timeBegin:SUtils.getDiffDateTimeFromNow(-6,SUtils.TIME_TYPE.HOUR,format),
		 	timeEnd:SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format)
	};
	this.trendBegin=params.timeBegin;
	this.trendEnd=params.timeEnd;
	var paramsCompare={
			majorName:this.selectedMajor
	};
	
	if(timeConfig!=null){
		params=$.extend(params,timeConfig);
	}
	var startTime=params.timeBegin;
	var endTime=params.timeEnd;
//	var compareLag=24*60*60*1000;
	var compareLag=72*60*60*1000;
	var startDate=new Date(startTime.replace(/-/g,"/"));
	var endDate=new Date(endTime.replace(/-/g,"/"));
	
	compareStart=(new Date(startDate.getTime()-compareLag)).Format(LSMScreen.DataManager.formatSpecialCompare);
	compareEnd=(new Date(endDate.getTime()-compareLag)).Format(LSMScreen.DataManager.formatSpecialCompare);
	
	paramsCompare.timeBegin=compareStart;
	paramsCompare.timeEnd=compareEnd;
	
	this.dm.getVideoQuality(params,function(result){
			
			
			this.dm.getVideoQuality(paramsCompare,function(resultCompare){
				if(callback!=null){
					var chartDatas={
							qualityTrendCache:result[params.majorName],
							qualityTrendCacheCompare:resultCompare[params.majorName],
					};
					callback.apply(this, [chartIndex,chartDatas]);
				}
			}.bind(this));
			
			
	}.bind(this));
	
};
SHVIDEOSCREEN.ScreenController.prototype.renderChartByTitleIndex=function(startIndex)
{
	var list=this.getTitleKpis();
	var i=0;
	for(i=0;i<this.chartList.length;i++){
		var kpiConfig=list[startIndex%list.length];
		if(this.fakeValueMap[kpiConfig.key]==null){
			this.reloadChart(i,kpiConfig);
		}
		startIndex++;
	}
};
SHVIDEOSCREEN.ScreenController.prototype.renderChartBySelfConfig=function(chartIndex,datas)
{
	this.chartList[chartIndex].datas=datas;
	this.reloadChart(chartIndex);
};
//不重新查询数据
SHVIDEOSCREEN.ScreenController.prototype.reloadChart=function(chartIndex,kpiConfig)
{
	if(kpiConfig!=null){
		
		this.chartList[chartIndex].kpiConfig=kpiConfig;
	}
	$("#chartTitle"+chartIndex).html(this.chartList[chartIndex].kpiConfig.name+'<span>（'+this.chartList[chartIndex].kpiConfig.unit+'）</span>');
	this.chartList[chartIndex].reinitEChart();
	this.chartList[chartIndex].updateData(this.getLineChartOption(this.chartList[chartIndex].kpiConfig,this.chartList[chartIndex].datas));
};
SHVIDEOSCREEN.ScreenController.prototype.getLineChartOption=function(kpiConfig,datas)
{
	var xArr=[];
	var dataArr=[];
	var dataArrCompare=[];
	var kpiKey=kpiConfig.key;
	var ymin=kpiConfig.ymin==null?0:kpiConfig.ymin;
	var ymax=kpiConfig.ymax==null?NaN:kpiConfig.ymax;
	var list=[];
	var listCompare=[];
	list=datas.qualityTrendCache;
	listCompare=datas.qualityTrendCacheCompare;
	
	var lastValue=NaN;
	for(var i=0;i<list.length;i++){
		var record=list[i];
		var recordCompare=listCompare[i];
		var time=record.time;
		var value=record[kpiKey];
		var valueCompare=recordCompare[kpiKey];
//		if(!isNaN(lastValue)){
//			if((value-lastValue)/lastValue<-0.3){
//				value=lastValue*(0.85+0.1*Math.random());
//			}
//		}
//		lastValue=value;
		if((value-valueCompare)/valueCompare<-0.2){
			value=valueCompare*(1.1+0.05*Math.random());
		}
		value=(value*kpiConfig.rate).toFixed(kpiConfig.fixed);
		valueCompare=(valueCompare*kpiConfig.rate).toFixed(kpiConfig.fixed);
		xArr.push(time.substring(11,16));
		dataArr.push(value);
		dataArrCompare.push(valueCompare);
	}
	
	
	
	var tipFormatter=kpiConfig.name+'<br/>'
	+'{b0}<br/>'
	+'今天：{c0} '+kpiConfig.unit+'<br/>'
	+'昨天：{c1} '+kpiConfig.unit+'<br/>';
	var option = {
			color:['#00ff5a','#fced00','#7B68EE'],
		    legend: {
		        data:['今天','昨天'],
		        textStyle :
        		{
		        	color:LSMScreen.CHARTCONFIG.xAxisLabelColor,
            		fontSize:LSMScreen.CHARTCONFIG.axisLabelSize*0.7
        		},
        		show:true
		    },
			grid:{
		    	borderWidth:0,
		    	x:80,
		    	y:40,
		    	x2:30, 
		    	y2:70
		    },
		    tooltip : {
		        trigger: 'axis',
		        formatter:tipFormatter
		    },
		    calculable : false,
		    xAxis : [
		        {
		            type : 'category',
		            axisLabel : {
		            	textStyle :
		            		{
			            		color:LSMScreen.CHARTCONFIG.xAxisLabelColor,
			            		fontSize:LSMScreen.CHARTCONFIG.axisLabelSize
		            		}
		            },
		            axisLine:{
		            	lineStyle:{
		            		color: LSMScreen.CHARTCONFIG.xAxisColor,
			                width: 2,
			                type: 'solid'
		            	}
		            },
		            splitLine:{
		            	lineStyle:{
		            		color: LSMScreen.CHARTCONFIG.xAxisColor,
		            		width: 1,
			                type: 'solid'
		            	}
		            },
		            formatter: '{value}',
		            data : xArr
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            axisLabel : {
		            	textStyle :
		            		{
		            		color:LSMScreen.CHARTCONFIG.xAxisLabelColor,
		            		fontSize:LSMScreen.CHARTCONFIG.axisLabelSize
		            		},
		            		formatter:function(value){ 
		            			return value;
//		            			if(value>=100000){
//		            				return (value/10000).toFixed(0).toLocaleString()+"万";
//		            			}else{
//		            				return value.toLocaleString();
//		            			}
		            			
		            		}
		            },
		            axisLine:{
		            	lineStyle:{
		            		color: LSMScreen.CHARTCONFIG.yAxisColor,
			                width: 2,
			                type: 'solid'
		            	}
		            },
		            splitLine:{
		            	lineStyle:{
		            		color:LSMScreen.CHARTCONFIG.yAxisColor,
		            		width: 1,
			                type: 'solid'
		            	}
		            },
		            formatter: '{value}',
		            max:ymax,
		            min:ymin
		        }
		    ],
		    series : [
		        {
		            name:'今天',
		            type:'line',
		            data:dataArr,
		            itemStyle:{normal:{lineStyle:{width:2}}}
		        },{
		            name:'昨天',
		            type:'line',
		            data:dataArrCompare,
		            itemStyle:{normal:{lineStyle:{width:2}}}
		        }
		    ]
		};
	
	return option;
};
//趋势图数据 END///////////////////////
//热门应用排名///////////////////////
SHVIDEOSCREEN.ScreenController.prototype.leftmrClicked=function(evt)
{
	var currentSelSrc=$(evt.currentTarget).attr("src");
	var lastSelSrc=$(".gridTabIconSelected").attr("src");
	lastSelSrc=lastSelSrc.replace("ts_","t_");
	currentSelSrc=currentSelSrc.replace("t_","ts_");
	$(".gridTabIconSelected").attr("src",lastSelSrc);
	$(evt.currentTarget).attr("src",currentSelSrc);
	$(".gridTabIcon").removeClass("gridTabIconSelected");
	$(evt.currentTarget).addClass("gridTabIconSelected");
	
	$(".gridTabIconParent").removeClass("gridTabIconParentSelected");
	$(evt.currentTarget).parent().addClass("gridTabIconParentSelected");
	this.initAppRankGrid();
	this.renderGridData();
};
SHVIDEOSCREEN.ScreenController.prototype.getAppRankData=function(redrawTab)
{
	var timeType=this.getTimeType();
	var num=9;
	var sortKey="4G用户数";//this.SelectedKpis[this.selectedIndex].key;//this.selectedIndex
	var selectedSp=this.rankSpMajors;
	var count=0;
	var html='';
	for(var i=0;i<selectedSp.length;i++){
		var record=selectedSp[i];
		if(record.selected){
			count++;
			if(count==1){
				html+='<div class="nav nav_mr leftmr gridTabIconParent gridTabIconParentSelected" style="position:relative;"><img class="gridTabIcon gridTabIconSelected" name="'+record.name+'" src="images/ts_blank.png" /><span>'+record.name+'</span></div>';
			}else{
				html+='<div class="nav nav_mr leftmr gridTabIconParent" style="position:relative;"><img class="gridTabIcon" name="'+record.name+'" src="images/t_blank.png" /><span>'+record.name+'</span></div>';
			}
			var tmpMajor=record.name;
			if(tmpMajor.indexOf("视频")!=-1){
				tmpMajor="视频"
			}
			this.dm.getVideoAppRank({identifier:record.name,majorName:tmpMajor,minors:record.minors,sortKey:sortKey,num:-1,timeType:timeType},function(result,param){
				this.appRankDataCache[param.identifier]=result;
				if(this.getSelectedTabMajor()==param.identifier){
					this.renderGridData();
				}
			}.bind(this));
			if(count==5){
				break;
			}
		}
	}
	if(redrawTab||$("#focusMajorTab").text()==""){
		$("#focusMajorTab").html(html);
		$(".gridTabIcon").on('click',this.leftmrClicked.bind(this));//左下业务大类tab
	}
//	<div class="nav nav_mr leftmr"><img class="gridTabIcon gridTabIconSelected" name="视频" src="images/ts_vd.png" /></div>
	
		
	
};
SHVIDEOSCREEN.ScreenController.prototype.renderGridData=function()
{
	var list=this.appRankDataCache[this.getSelectedTabMajor()];
	this.grid1[0].addJSONData(list);
	
	this.app_type_id="--";
	this.app_type_name="--";
	this.app_subtype_id="--";
	this.app_subtype_name="--";
	
	if(list!=null&&list.length>0){
		var record=list[0];
		var major=record.major;
		var minor=record.element;
		
		this.changeSpDirGridParam(major,minor);
		
	}else{
		this.initSpDirGrid(true);
	}
	
};
SHVIDEOSCREEN.ScreenController.prototype.drillApp=function(evt)
{
	if(this.drillAppFrame==null){
		var app=$(evt.currentTarget).attr("app");
		var major=$(evt.currentTarget).attr("major");
		var iframe=document.createElement("iframe");
		var frameWidth=$(".EAE").width();
		var frameHeight=$(".EAE").height();
		$(iframe).width(frameWidth);
		$(iframe).height(frameHeight);
		$(iframe).attr("frameborder","0");
		$(iframe).attr("src","itp.jsp?minor="+encodeURIComponent(app)+"&majorName="+encodeURIComponent(major));
		$(iframe).css("position","absolute");
		$("body").append(iframe);
		this.drillAppFrame=iframe;
	}
};
SHVIDEOSCREEN.ScreenController.prototype.closeDrillApp=function()
{
	if(this.drillAppFrame!=null){
		$(this.drillAppFrame).remove();
		this.drillAppFrame=null;
	}
};
SHVIDEOSCREEN.ScreenController.prototype.getSelectedTabMajor=function()
{
	var selectedTab=$(".gridTabIconSelected").attr("name");
	if(selectedTab==null){
		selectedTab="";
	}
	return selectedTab;
};



//热门应用排名 END///////////////////////

//sp流向 属地分布///////////////////////
SHVIDEOSCREEN.ScreenController.prototype.rightmrClicked=function(evt)
{
	var tabName=$(evt.currentTarget).attr("name");
	var currentSelSrc=$(evt.currentTarget).attr("src");
	var lastSelSrc=$(".rightTabIconSelected").attr("src");
	lastSelSrc=lastSelSrc.replace("ts_","t_");
	currentSelSrc=currentSelSrc.replace("t_","ts_");
	$(".rightTabIconSelected").attr("src",lastSelSrc);
	$(evt.currentTarget).attr("src",currentSelSrc);
	$(".rightTabIcon").removeClass("rightTabIconSelected");
	$(evt.currentTarget).addClass("rightTabIconSelected");
	
	
	$("#mapdistribute").css("display",tabName=="属地分布"?"block":"none");
	$("#rightgridParent").css("display",tabName=="SP流向"?"block":"none");
	this.initSpDirGrid();
	
};
SHVIDEOSCREEN.ScreenController.prototype.mapListKpiClicked=function(evt)
{
	$(".mapListKpi").removeClass("stlist");
	$(evt.currentTarget).addClass("stlist");
	this.renderMapData();
};
SHVIDEOSCREEN.ScreenController.prototype.mapListKpiScroll=function(evt)
{
	var list=this.getAllKpis();
	var type=$(evt.currentTarget).attr("name");
	var top=$("#tb_list").css("top").replace("px","")*1;
	var step=70;//高度+margin
	var viewKpis=7;
	var minTop=-(list.length-viewKpis)*step;
	if(type=="up"&&top<0){
		top+=step;
	}else if(type=="down"&&top>minTop){
		top-=step;
	}
	$("#tb_list").css("top",top);
};

SHVIDEOSCREEN.ScreenController.prototype.getSelectedMapKpi=function()
{
	var list=this.getAllKpis();
	var kpiIndex=$(".stlist").attr("name");
	return list[kpiIndex];
};
SHVIDEOSCREEN.ScreenController.prototype.getSpDirData=function()
{
//	var timeType=this.getTimeType();
//	this.dm.getVideoSpDirList({majorName:this.selectedMajor,timeType:timeType},this.spDirDataHandler.bind(this));
	if(this.grid2){
		var postData={
				"area_id":this.areaId,
				"app_type_id":this.app_type_id,
				"app_subtype_id":this.app_subtype_id,
				"time":SUtils.getDiffDateTimeFromNow(-1,SUtils.TIME_TYPE.DATE,"yyyyMMdd0000"),
				"level":"day",
				"page":"1",
				"limit":"99"
			};
		var opt={
			    postData: {"params":JSON.stringify(postData)},
			    page: 1
			};
		this.grid2.setGridParam(opt) .trigger("reloadGrid");
	}
};
SHVIDEOSCREEN.ScreenController.prototype.getMapData=function()
{
	this.dm.getVideoMapData({majorName:this.selectedMajor},this.mapDataHandler.bind(this));
};
SHVIDEOSCREEN.ScreenController.prototype.spDirDataHandler=function(result)
{
	if(result!=null&&result.length>0){
		var timeType=this.getTimeType();
		if(timeType=="hour"){
			var time=result[0].time;
			var start="";
			var end="";
			var format="hh:00";
			var date = new Date(time.replace(/-/g,"/"));
			start=date.Format(format);
			date.setHours(date.getHours()+1);
			end=date.Format(format);
			$("#hour_time_txt").text(start+"-"+end);
		}
	}
	this.spDirDataCache=result;
	this.renderSpDirData();
};
SHVIDEOSCREEN.ScreenController.prototype.renderSpDirData=function()
{
	if(this.grid2!=null){
		this.grid2[0].addJSONData(this.spDirDataCache);
	}
};
SHVIDEOSCREEN.ScreenController.prototype.mapDataHandler=function(result)
{
	this.mapDataCache=result;
	this.renderMapData();
};
SHVIDEOSCREEN.ScreenController.prototype.renderMapData=function()
{
	var kpiConfig=this.getSelectedMapKpi();
	var kpiKey=kpiConfig.key;
	$("#mapUnit").text("单位："+kpiConfig.unit);
	var mapKpiDivs=$(".mapKpiDiv");
	for(var i=0;i<mapKpiDivs.length;i++){
		var cityKey=$(mapKpiDivs[i]).attr("name");
		var record=this.mapDataCache[cityKey+"分公司"];
		if(record!=null&&record[kpiKey]!=null){
			var value=record[kpiKey];
			var realValue=(value*kpiConfig.rate).toFixed(kpiConfig.fixed);
			$(mapKpiDivs[i]).text(realValue);
		}else{
			$(mapKpiDivs[i]).text("--");	
		}
	}
};
//sp流向 属地分布 END///////////////////////

//业务大类选择
SHVIDEOSCREEN.ScreenController.prototype.majorConfigClicked=function(evt)
{

	if(this["majorList"]==null){
		var winWidth=300;
		var winHeight=370;
		var win=null;
		this["majorList"]=win=new LSMScreen.SimpleWindow({
			title:"业务大类选择",
			width:winWidth,
			height:winHeight,
			x:$(document).width()-winWidth,
			y:90,
			closeFunc:function(){
				this["majorList"].hide();
			}.bind(this),
			beforeClose:function(){
				
			}.bind(this)
		});
		var tableDom=document.createElement("table");
		$(tableDom).attr("id",Math.uuid());
		$(win.content).append(tableDom);
		var cols=[
		    {colName:'业务大类',name : 'name',index : 'name',width : 300}
		];
		var opt1={
		        datatype : function(){},
		        colNames:['业务大类'],
		        colModel : cols,
		        loadui:'disable',
		        rowNum:100000,
		        afterInsertRow:function(rowid,rowdata){
		        	var tr=grid.find("tbody").find("tr")[rowid];
		        	$(tr).css("cursor","pointer");
		        	$(tr).attr("majorId",rowdata.id);
		        	$(tr).on('click',this.majorSelected.bind(this));
		        }.bind(this),
		        height:winHeight-60
			};
		
		var grid=$(tableDom).jqGrid(opt1);
		grid.closest('.ui-jqgrid-view').find('div.ui-jqgrid-hdiv').hide();
		var arr=this.allMajors;
		grid[0].addJSONData(arr);
	}else{
		this["majorList"].show();
	}
};
SHVIDEOSCREEN.ScreenController.prototype.majorSelected=function(e)
{
	var major=$(e.currentTarget).text();
	$("#majorConfig").text(major);
	this.selectedMajor=major;
	
	var list=this.getTitleKpis();
	this.chart1.kpiConfig=list[0];
	this.chart2.kpiConfig=list[1];
	this.chart3.kpiConfig=list[2];
	this.titleKpiCache={};
//	this.initSpDirGrid(true);
	this.initMapKpiList();
	
	
	
	this.update();
};
//左下角关注业务配置//////////////////////////////
SHVIDEOSCREEN.ScreenController.prototype.focusMajorConfigClicked=function(evt)
{

	var allCols=[];
	var selectedCols=[];
	var winWidth=1000;
	var winHeight=700;
	var docWidth=$(".EAE").width();
	var docHeight=$(".EAE").height();
	var win=new LSMScreen.SimpleWindow({
		title:"关注业务配置(最多五个)",
		width:winWidth,
		height:winHeight,
		x:(docWidth-winWidth)/2,
		y:(docHeight-winHeight)/2
	});
	allCols=this.rankSpMajors;
	
	var selectedMap={};
	var html='<ul class="colchooser">';
	
	var i=0;
	for(i=0;i<allCols.length;i++){
		if(allCols[i].selected){
			selectedMap[allCols[i].name]=(i+1);
			selectedCols.push(allCols[i]);
		}
	}
	//先插入选中的排序好的列
	for(i=0;i<selectedCols.length;i++){
		var kpiConfig=selectedCols[i];
		var kpiId=kpiConfig.name;
		var kpiName=kpiConfig.name;
		var checked="";
		checked='checked="checked"';
		html+='<li ><span><input type="checkbox" index="'+i+'" value="'+kpiId+'" '+checked+'>'+kpiName+'</input></span></li>';
	}
	//将未选中的列排在最后
	for(i=0;i<allCols.length;i++){
		var kpiConfig=allCols[i];
		var kpiId=kpiConfig.name;
		var kpiName=kpiConfig.name;
		var checked="";
		if(selectedMap[kpiId]){
		}else{
			html+='<li ><span><input type="checkbox" index="'+i+'" value="'+kpiId+'" '+checked+'>'+kpiName+'</input></span></li>';
		}
		
	}
	
	
	html+="</ul>";
	html+='<div class="kpiChooserWinFoot" style="position:absolute;top:0px;">';
	html+="<div>";
	html+='<input type="button" class="btn btn-primary btn-lg" value="确定"></input>';
	html+="&nbsp;&nbsp;&nbsp;&nbsp;";
	html+='<input type="button" class="btn btn-primary btn-lg" value="取消"></input>';
	html+="</div>";
	html+="</div>";
	$(win.content).css("overflow","auto");
	$(win.content).html(html);
	var lisJQ=$(win.content).find("li");
	var lis=[];
	for(i=0;i<lisJQ.length;i++){
		lis.push(lisJQ[i]);
	}
	initLisEvent(lis);
	$(win.content).find(":button").on('click',function(evt){
		if($(evt.currentTarget).val()=="确定"){
			var oUl= $(".colchooser")[0];
			var aLi = oUl.getElementsByTagName("li");
			var ilength=aLi.length;//Math.min(list.length,this.showKpiCount);
			var allCols=[];
			var allColsMap={};
			var finalSelected=[];
			var sortArr=[];
			var i=0;
			var count=0;
			allCols=this.rankSpMajors;
			
			for(i=0;i<allCols.length;i++){
				var kpiId=allCols[i].name;
				allColsMap[kpiId]=allCols[i];
			}
			for(i=0;i<ilength;i++){
				var show=$(aLi[i]).find("input[type='checkbox']").is(':checked');
				var selectedId=$(aLi[i]).find("input").val();
				var left=$(aLi[i]).css("left").replace("px","");
				var top=$(aLi[i]).css("top").replace("px","");
				var sortValue=left*1+top*10000;
				allColsMap[selectedId].selected=show;
				finalSelected.push(allColsMap[selectedId]);
				sortArr.push({index:count,sortValue:sortValue});
				count++;
				
			}
			//按top left 排序
			sortArr=sortArr.sort(function(a,b){return a["sortValue"]-b["sortValue"];});
			var sortCols=[];
			for(i=0;i<sortArr.length;i++){
				var sortRecord=sortArr[i];
				sortCols.push(finalSelected[sortRecord.index]);
			}
			this.rankSpMajors=sortCols;
			this.getAppRankData(true);
			
//			var saveId=this.getColConfigId(true);
//			var dm=LSMScreen.DataManager.getInstance();
//			dm.configOperate(
//					{
//						"data":{
//							"id":saveId,
//							"content":JSON.stringify(sortCols)
//						}
//					},
//					function(){
//						console.log(saveId+"保存成功");
//						this.update(true);
//					}.bind(this),
//					function(){console.log(saveId+"保存失败");}
//			);
		}
		win.closeWin();
	}.bind(this));

};

//指标配置//////////////////////////////
SHVIDEOSCREEN.ScreenController.prototype.kpiConfigClicked=function(evt)
{
	var type=$(evt.currentTarget).attr("name");
	this.showColConfig(type);
};


SHVIDEOSCREEN.ScreenController.prototype.showColConfig = function(configType){
	var allCols=[];
	var selectedCols=[];
	var winWidth=1000;
	var winHeight=700;
	var docWidth=$(".EAE").width();
	var docHeight=$(".EAE").height();
	var win=new LSMScreen.SimpleWindow({
		title:"列配置",
		width:winWidth,
		height:winHeight,
		x:(docWidth-winWidth)/2,
		y:(docHeight-winHeight)/2
	});
	
	
	switch(configType){
		case "titleKc"://头部五个指标
			allCols=this.getAllTitleKpis();
			selectedCols=this.getTitleKpis();
			break;
		case "majorKc"://业务大类表格指标
			allCols=this.getAllKpis();
			selectedCols=this.getGridCol1();
			break;
		case "spDirKc"://SP流向指标
			allCols=this.getAllGridCol2();
			selectedCols=this.getGridCol2();
			break;
	}
	
	var selectedMap={};
	var html='<ul class="colchooser">';
	
	var i=0;
	for(i=0;i<selectedCols.length;i++){
		selectedMap[selectedCols[i].key]=(i+1);
	}
	//先插入选中的排序好的列
	for(i=0;i<selectedCols.length;i++){
		var kpiConfig=selectedCols[i];
		var kpiId=kpiConfig.key;
		var kpiName=kpiConfig.name;
		var checked="";
		checked='checked="checked"';
		html+='<li ><span><input type="checkbox" index="'+i+'" value="'+kpiId+'" '+checked+'>'+kpiName+'</input></span></li>';
	}
	//将未选中的列排在最后
	for(i=0;i<allCols.length;i++){
		var kpiConfig=allCols[i];
		var kpiId=kpiConfig.key;
		var kpiName=kpiConfig.name;
		var checked="";
		if(selectedMap[kpiId]){
		}else{
			html+='<li ><span><input type="checkbox" index="'+i+'" value="'+kpiId+'" '+checked+'>'+kpiName+'</input></span></li>';
		}
		
	}
	
	
	html+="</ul>";
	html+='<div class="kpiChooserWinFoot" style="position:absolute;top:0px;">';
	html+="<div>";
	html+='<input type="button" class="btn btn-primary btn-lg" value="确定"></input>';
	html+="&nbsp;&nbsp;&nbsp;&nbsp;";
	html+='<input type="button" class="btn btn-primary btn-lg" value="取消"></input>';
	html+="</div>";
	html+="</div>";
	$(win.content).css("overflow","auto");
	$(win.content).html(html);
	var lisJQ=$(win.content).find("li");
	var lis=[];
	for(i=0;i<lisJQ.length;i++){
		lis.push(lisJQ[i]);
	}
	initLisEvent(lis);
	$(win.content).find(":button").on('click',function(evt){
		if($(evt.currentTarget).val()=="确定"){
			var oUl= $(".colchooser")[0];
			var aLi = oUl.getElementsByTagName("li");
			var ilength=aLi.length;//Math.min(list.length,this.showKpiCount);
			var allCols=[];
			var allColsMap={};
			var finalSelected=[];
			var sortArr=[];
			var i=0;
			var count=0;
			
			switch(configType){
				case "titleKc"://头部五个指标
					allCols=this.getAllTitleKpis();
					break;
				case "majorKc"://业务大类表格指标
					allCols=this.getAllKpis();
					break;
				case "spDirKc"://SP流向指标
					allCols=this.getAllGridCol2();
					break;
			}
			
			for(i=0;i<allCols.length;i++){
				var kpiId=allCols[i].key;
				allColsMap[kpiId]=allCols[i];
			}
			for(i=0;i<ilength;i++){
				var show=$(aLi[i]).find("input[type='checkbox']").is(':checked');
				var selectedId=$(aLi[i]).find("input").val();
				var left=$(aLi[i]).css("left").replace("px","");
				var top=$(aLi[i]).css("top").replace("px","");
				var sortValue=left*1+top*10000;
				if(show==true){
					finalSelected.push(allColsMap[selectedId]);
					sortArr.push({index:count,sortValue:sortValue});
					count++;
				}
			}
			//按top left 排序
			sortArr=sortArr.sort(function(a,b){return a["sortValue"]-b["sortValue"];});
			var sortCols=[];
			for(i=0;i<sortArr.length;i++){
				var sortRecord=sortArr[i];
				sortCols.push(finalSelected[sortRecord.index]);
			}
			
			switch(configType){
				case "titleKc"://头部五个指标
					this.setTitleKpis(sortCols);
					this.renderTitleKpi();
					break;
				case "majorKc"://业务大类表格指标
					this.setGridCol1(sortCols);
					this.initAppRankGrid();
					this.renderGridData();
					break;
				case "spDirKc"://SP流向指标
					this.setGridCol2(sortCols);
					this.initSpDirGrid(true);
					break;
			}
			
//			var saveId=this.getColConfigId(true);
//			var dm=LSMScreen.DataManager.getInstance();
//			dm.configOperate(
//					{
//						"data":{
//							"id":saveId,
//							"content":JSON.stringify(sortCols)
//						}
//					},
//					function(){
//						console.log(saveId+"保存成功");
//						this.update(true);
//					}.bind(this),
//					function(){console.log(saveId+"保存失败");}
//			);
		}
		win.closeWin();
	}.bind(this));
};
//所有指标 含 播放成功率 播放时延 视频卡顿次数
SHVIDEOSCREEN.ScreenController.prototype.getAllKpis = function(){
	var list=[];
	var total=LSMConsts.videoKpis;
	if(this.selectedMajor=="视频"){
		list=total;
	}else{
		for(var i=0;i<total.length;i++){
			var record=total[i];
			if(record.videoOnly==true){
				continue;
			}
			list.push(record);
		}
	}
	return list;
};

//头部五个指标 全量 含 视频流畅度(假数据) 播放成功率 播放时延 视频卡顿次数
SHVIDEOSCREEN.ScreenController.prototype.getAllTitleKpis = function(){
	var list=[];
	var total=this.allKpisFake;
	if(this.selectedMajor=="视频"){
		list=total;
	}else{
		for(var i=0;i<total.length;i++){
			var record=total[i];
			if(record.videoOnly==true){
				continue;
			}
			list.push(record);
		}
	}
	return list;
};
//SP流向表格列配置 全量 含 播放成功率 播放时延 
SHVIDEOSCREEN.ScreenController.prototype.getAllGridCol2 = function(){
	var list=[];
	var total=LSMConsts.videoKpis2_2;
	if(this.selectedMajor=="视频"){
		list=total;
	}else{
		for(var i=0;i<total.length;i++){
			var record=total[i];
			if(record.videoOnly==true){
				continue;
			}
			list.push(record);
		}
	}
	return list;
};
//应用排名列配置 全量
SHVIDEOSCREEN.ScreenController.prototype.getAllGridCol1 = function(){
	var list=[];
	var total=LSMConsts.videoKpis;
	if(this.getSelectedTabMajor().indexOf("视频")!=-1){
		list=total;
	}else{
		for(var i=0;i<total.length;i++){
			var record=total[i];
			if(record.videoOnly==true){
				continue;
			}
			list.push(record);
		}
	}
	return list;
};
//头部五个指标 选中get
SHVIDEOSCREEN.ScreenController.prototype.getTitleKpis = function(){
	if(this.selectedMajor=="视频"){
		return this.SelectedKpis;
	}else{
		return this.SelectedKpis_common;
	}
};
//头部五个指标 选中set
SHVIDEOSCREEN.ScreenController.prototype.setTitleKpis = function(cols){
	if(this.selectedMajor=="视频"){
		this.SelectedKpis=cols
	}else{
		this.SelectedKpis_common=cols;
	}
};
//应用排名列配置get
SHVIDEOSCREEN.ScreenController.prototype.getGridCol1 = function(){
	var cols=[];
	if(this.getSelectedTabMajor().indexOf("视频")!=-1){
		cols=this.gridCol1;
	}else{
		cols=this.gridCol1_common;
	}
	return cols;
};
//应用排名列配置set
SHVIDEOSCREEN.ScreenController.prototype.setGridCol1 = function(cols){
	if(this.getSelectedTabMajor().indexOf("视频")!=-1){
		this.gridCol1=cols
	}else{
		this.gridCol1_common=cols;
	}
};
//SP流向列配置get
SHVIDEOSCREEN.ScreenController.prototype.getGridCol2 = function(){
	if(this.selectedMajor=="视频"){
		return this.gridCol2;
	}else{
		return this.gridCol2_common;
	}
};
//SP流向列配置set
SHVIDEOSCREEN.ScreenController.prototype.setGridCol2 = function(cols){
	if(this.selectedMajor=="视频"){
		this.gridCol2=cols
	}else{
		this.gridCol2_common=cols;
	}
};


//指标配置 END//////////////////////////