var SceneBase = SceneBase || {};

SceneBase.ExtraMenuHandler=function (_menuId)
{
	this.menuId=_menuId;
	this.initialize.apply(this, arguments);
};
/** 从ScreenBase继承*/
SceneBase.ExtraMenuHandler.prototype.constructor=SceneBase.ExtraMenuHandler;

SceneBase.ExtraMenuHandler.prototype.normalMinutes=1440;
//菜单标识
SceneBase.ExtraMenuHandler.prototype.menuId='';

SceneBase.ExtraMenuHandler.prototype.allArea=[];
SceneBase.ExtraMenuHandler.prototype.cellSelectedType='LTE信令';
SceneBase.ExtraMenuHandler.prototype.selectedHotspot='';
SceneBase.ExtraMenuHandler.prototype.selectedHotspotList=[];

SceneBase.ExtraMenuHandler.prototype.cacheGridDataAllList=[];//全量数据 用于切换
SceneBase.ExtraMenuHandler.prototype.cacheGridDataList=[];//缓存最终表格数据 用于排序

SceneBase.ExtraMenuHandler.prototype.cacheDArea_stream=null;
SceneBase.ExtraMenuHandler.prototype.cacheDArea_stream_last=null;
SceneBase.ExtraMenuHandler.prototype.cacheDArea_stream_normal=null;
SceneBase.ExtraMenuHandler.prototype.cacheDArea_ws=null;
SceneBase.ExtraMenuHandler.prototype.cacheDArea_cellCnt=null;

SceneBase.ExtraMenuHandler.prototype.currentColumns=[];

SceneBase.ExtraMenuHandler.prototype.ALLDATA={};//全网数据

SceneBase.ExtraMenuHandler.prototype.areaIdMap={};
                                                        
SceneBase.ExtraMenuHandler.prototype.DEGRADATION=[
  {type:'LTE网管',exp:'lte_23<99.9',value0:99.9},
  {type:'LTE网管',exp:'lte_15>5',value0:5},
  {type:'LTE网管',exp:'lte_1011>50',value0:50},
  {type:'LTE网管',exp:'lte_1213>50',value0:50},
  
  {type:'LTE信令',exp:'TCP第二、三次握手成功率<80&&TCP二、三次握手请求次数>100',value0:80,value1:100},
  {type:'LTE信令',exp:'TCP第二、三次握手时延>1000&&TCP二、三次握手请求次数>100',value0:1000,value1:100},
  
  {type:'GSM网管',exp:'gsm_34<90',value0:90}
];
SceneBase.ExtraMenuHandler.prototype.DEGRADATION_APP=[
{streamKey:"4G下行速率500k",kpiName:"大于500KB下载速率",exp:"x<2000",unit:"Kbps"},
{streamKey:"4GHTTP成功率",kpiName:"HTTP请求成功率",exp:"x<85",unit:"%"},
{streamKey:"4GHTTP时延",kpiName:"HTTP响应时延",exp:"x>200",unit:"ms"},
{streamKey:"4GTCP成功率",kpiName:"TCP建链成功率",exp:"x<85",unit:"%"},
{streamKey:"4GTCP时延",kpiName:"TCP建链时延",exp:"x>200",unit:"ms"},
{streamKey:"4GTCP第一、二次握手成功率",kpiName:"TCP一二次握手成功率",exp:"x<85",unit:"%"},
{streamKey:"4GTCP第一、二次握手时延",kpiName:"TCP一二次握手时延",exp:"x>200",unit:"ms"},
{streamKey:"4GTCP第二、三次握手成功率",kpiName:"TCPP二三次握手成功率",exp:"x<85",unit:"%"},
{streamKey:"4GTCP第二、三次握手时延",kpiName:"TCP二三次握手时延",exp:"x>200",unit:"ms"},
{streamKey:"4GTCP上行重传率",kpiName:"TCP上行重传率",exp:"x>5",unit:"%"},
{streamKey:"4GTCP下行重传率",kpiName:"TCP下行重传率",exp:"x>5",unit:"%"},
{streamKey:"4GTCP上行乱序率",kpiName:"TCP上行乱序率",exp:"x>5",unit:"%"},
{streamKey:"4GTCP下行乱序率",kpiName:"TCP下行乱序率",exp:"x>5",unit:"%"}
];
SceneBase.ExtraMenuHandler.prototype.DAREA_COLS=[//useNormal:true 趋势图对比时使用平时数据 否则使用全网
	{kpiType:LSMConsts.kpiTypeSig,neType:"all",kpiFullName:"总用户数", kpiName:"用户数",unit:"人", rate:1, fixed:0,useNormal:true,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_STREAM},
	{kpiType:LSMConsts.kpiTypeNet,neType:"all",kpiFullName:"cell_cnt", kpiName:"小区数",unit:"个", rate:1, fixed:0},
	{kpiType:LSMConsts.kpiTypeSig,neType:"all",kpiFullName:"VOLTE用户数", kpiName:"VOLTE用户数",unit:"人", rate:1, fixed:0,useNormal:true,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_STREAM},
	{kpiType:LSMConsts.kpiTypeSig,neType:"all",kpiFullName:"2G用户数", kpiName:"2G用户数",unit:"人", rate:1, fixed:0,useNormal:true,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_STREAM},
	{kpiType:LSMConsts.kpiTypeSig,neType:"all",kpiFullName:"4G用户数", kpiName:"4G用户数",unit:"人", rate:1, fixed:0,useNormal:true,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_STREAM},
//	{kpiType:LSMConsts.kpiTypeSig,neType:"all",kpiFullName:"VOLTE语音话务量ERL", kpiName:"VOLTE话务量",unit:"Erl", rate:1, fixed:2,useNormal:true,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_STREAM},
	{kpiType:LSMConsts.kpiTypeNet,neType:"2g",kpiFullName:"gsm_teletraffic", kpiName:"GSM话务量",unit:"Erl", rate:1, fixed:1,useNormal:true,type:KpiView.TYPE_GSM,source:KpiView.SOURCE_WS},//黄文接口
	{kpiType:LSMConsts.kpiTypeNet,neType:"4g",kpiFullName:"volte_voice_teletraffic", kpiName:"VOLTE无线语音话务量",unit:"Erl", rate:1, fixed:1,useNormal:true,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_WS},//黄文接口
	{kpiType:LSMConsts.kpiTypeNet,neType:"4g",kpiFullName:"volte_video_teletraffic", kpiName:"VOLTE视频话务量",unit:"Erl", rate:1, fixed:1,useNormal:true,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_WS},//黄文接口
	{kpiType:LSMConsts.kpiTypeNet,neType:"2g",kpiFullName:"gsm_flow_all", kpiName:"GSM流量",unit:"MB", rate:1, fixed:2,useNormal:true,type:KpiView.TYPE_GSM,source:KpiView.SOURCE_WS},//黄文接口
	{kpiType:LSMConsts.kpiTypeNet,neType:"2g",kpiFullName:"tchhalftraf", kpiName:"GSM半速率话务量",unit:"Erl",useNormal:true, rate:1, fixed:1,type:KpiView.TYPE_GSM,source:KpiView.SOURCE_WS},
	{kpiType:LSMConsts.kpiTypeNet,neType:"2g",kpiFullName:"gsm_conn_ratio", kpiName:"GSM接通率",unit:"%", rate:1, fixed:2,type:KpiView.TYPE_GSM,source:KpiView.SOURCE_WS},
	{kpiType:LSMConsts.kpiTypeNet,neType:"2g",kpiFullName:"gsm_wireless_conn_ratio", kpiName:"GSM无线接通率",unit:"%", rate:1, fixed:2,type:KpiView.TYPE_GSM,source:KpiView.SOURCE_WS},
	{kpiType:LSMConsts.kpiTypeNet,neType:"2g",kpiFullName:"attnbrtchnho", kpiName:"GSM-TCH尝试次数",unit:"次", rate:1, fixed:0,type:KpiView.TYPE_GSM,source:KpiView.SOURCE_WS},
	{kpiType:LSMConsts.kpiTypeNet,neType:"2g",kpiFullName:"gsm_ul_tbf_succ_ratio", kpiName:"GSM上行TBF建立成功率",unit:"%", rate:1, fixed:2,type:KpiView.TYPE_GSM,source:KpiView.SOURCE_WS},
	{kpiType:LSMConsts.kpiTypeNet,neType:"2g",kpiFullName:"gsm_wireless_use_ratio", kpiName:"GSM无线利用率",unit:"%", rate:1, fixed:2,type:KpiView.TYPE_GSM,source:KpiView.SOURCE_WS},
	{kpiType:LSMConsts.kpiTypeNet,neType:"4g",kpiFullName:"lte_flow_all", kpiName:"LTE流量",unit:"MB", rate:1, fixed:2,useNormal:true,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_WS},
	{kpiType:LSMConsts.kpiTypeNet,neType:"4g",kpiFullName:"lte_wireless_conn_ratio", kpiName:"LTE无线接通率",unit:"%", rate:1, fixed:2,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_WS},
	{kpiType:LSMConsts.kpiTypeNet,neType:"4g",kpiFullName:"nbrattestab", kpiName:"E-RAB建立请求次数",unit:"次", rate:1, fixed:0,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_WS},
	{kpiType:LSMConsts.kpiTypeNet,neType:"4g",kpiFullName:"lte_wireless_drop_ratio", kpiName:"LTE无线掉线率",unit:"%", rate:1, fixed:2,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_WS},
	{kpiType:LSMConsts.kpiTypeNet,neType:"4g",kpiFullName:"nbrsuccestab", kpiName:"E-RAB建立成功次数",unit:"次", rate:1, fixed:0,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_WS},
	{kpiType:LSMConsts.kpiTypeNet,neType:"4g",kpiFullName:"lte_sw_succ_ratio", kpiName:"LTE切换成功率",unit:"%", rate:1, fixed:2,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_WS},
	{kpiType:LSMConsts.kpiTypeNet,neType:"4g",kpiFullName:"volte_voice_conn_ratio", kpiName:"VOLTE语音无线接通率",unit:"%", rate:1, fixed:2,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_WS},
	{kpiType:LSMConsts.kpiTypeNet,neType:"4g",kpiFullName:"volte_video_conn_ratio", kpiName:"VOLTE视频无线接通率",unit:"%", rate:1, fixed:2,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_WS},
	{kpiType:LSMConsts.kpiTypeNet,neType:"4g",kpiFullName:"volte_voice_erab_drop_ratio", kpiName:"VOLTE E-RAB掉线率(语音)",unit:"%", rate:1, fixed:2,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_WS},
	{kpiType:LSMConsts.kpiTypeNet,neType:"4g",kpiFullName:"volte_video_erab_drop_ratio", kpiName:"VOLTE E-RAB掉线率(视频)",unit:"%", rate:1, fixed:2,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_WS},
	{kpiType:LSMConsts.kpiTypeNet,neType:"4g",kpiFullName:"volte_sw_succ_ratio", kpiName:"VOLTE用户切换成功率",unit:"%", rate:1, fixed:2,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_WS},
	{kpiType:LSMConsts.kpiTypeNet,neType:"4g",kpiFullName:"lte_avg_cqi", kpiName:"LTE平均CQI",unit:"%", rate:1, fixed:2,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_WS},
	{kpiType:LSMConsts.kpiTypeNet,neType:"4g",kpiFullName:"lte_ul_prb_use_ratio", kpiName:"LTE上行PRB利用率",unit:"%", rate:1, fixed:2,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_WS},
	{kpiType:LSMConsts.kpiTypeNet,neType:"4g",kpiFullName:"lte_ul_user_avg_rate", kpiName:"上行用户平均速率",unit:"Mbps", rate:1, fixed:2,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_WS},
	{kpiType:LSMConsts.kpiTypeNet,neType:"4g",kpiFullName:"lte_dl_prb_use_ratio", kpiName:"LTE下行PRB利用率",unit:"%", rate:1, fixed:2,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_WS},
	{kpiType:LSMConsts.kpiTypeNet,neType:"4g",kpiFullName:"lte_dl_user_avg_rate", kpiName:"下行用户平均速率",unit:"Mbps", rate:1, fixed:2,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_WS},
	{kpiType:LSMConsts.kpiTypeNet,neType:"2g",kpiFullName:"gsm_disturb_45_ratio", kpiName:"GSM频带45占比",unit:"%", rate:1, fixed:2,type:KpiView.TYPE_GSM,source:KpiView.SOURCE_WS},
	{kpiType:LSMConsts.kpiTypeNet,neType:"4g",kpiFullName:"lte_disturb_highpower_ratio", kpiName:"LTE干扰高功率占比",unit:"%", rate:1, fixed:2,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_WS},
	{kpiType:LSMConsts.kpiTypeSig,neType:"4g",kpiFullName:"4GTCP第二、三次握手成功率", kpiName:"TCP握手成功率",unit:"%", rate:100, fixed:2,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_STREAM},
	{kpiType:LSMConsts.kpiTypeSig,neType:"4g",kpiFullName:"4GTCP第二、三次握手时延", kpiName:"TCP握手时延",unit:"ms", rate:1, fixed:0,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_STREAM},
	{kpiType:LSMConsts.kpiTypeSig,neType:"4g",kpiFullName:"4G下行速率500k", kpiName:"下载速率",unit:"Kbps", rate:1, fixed:2,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_STREAM},
	{kpiType:LSMConsts.kpiTypeSig,neType:"4g",kpiFullName:"视频业务大包下载速率", kpiName:"视频业务大包下载速率",unit:"Kbps", rate:1, fixed:2,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_STREAM},
	
	{kpiType:LSMConsts.kpiTypeSig,neType:"4g",kpiFullName:"VOLTE语音接通率", kpiName:"VOLTE语音接通率",unit:"%", rate:100, fixed:2,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_STREAM},
	{kpiType:LSMConsts.kpiTypeSig,neType:"4g",kpiFullName:"VOLTE语音掉话率", kpiName:"VOLTE语音掉话率",unit:"%", rate:100, fixed:2,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_STREAM},
	{kpiType:LSMConsts.kpiTypeSig,neType:"4g",kpiFullName:"VOLTEIMS初始注册成功率(含用户原因)", kpiName:"IMS初始注册成功率(含用户原因)",unit:"%", rate:100, fixed:2,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_STREAM},
	{kpiType:LSMConsts.kpiTypeSig,neType:"4g",kpiFullName:"VOLTE平均接续时长", kpiName:"V-V接续时长",unit:"ms", rate:1, fixed:0,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_STREAM},
	{kpiType:LSMConsts.kpiTypeSig,neType:"4g",kpiFullName:"VOLTEeSRVCC成功率", kpiName:"ESRVCC切换成功率",unit:"%", rate:100, fixed:2,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_STREAM},
	{kpiType:LSMConsts.kpiTypeSig,neType:"4g",kpiFullName:"VOLTEMOS值", kpiName:"VOLTE语音MOS值",unit:"", rate:1, fixed:2,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_STREAM},
	{kpiType:LSMConsts.kpiTypeSig,neType:"4g",kpiFullName:"VOLTERTP上行丢包率", kpiName:"RTP上行丢包率",unit:"%", rate:100, fixed:2,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_STREAM}
	
	
];
SceneBase.ExtraMenuHandler.prototype.DCELL_COLS_0=[
//LTE信令
{kpiType:LSMConsts.kpiTypeSig,neType:"4g",kpiFullName:"4G流量", kpiName:"4G流量",unit:"MB", rate:1/LSMConsts.byteDivider, fixed:2,useNormal:true,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_STREAM},
{kpiType:LSMConsts.kpiTypeSig,neType:"all",kpiFullName:"VOLTE语音话务量ERL", kpiName:"VOLTE话务量",unit:"Erl", rate:1, fixed:1,useNormal:true,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_STREAM},
{kpiType:LSMConsts.kpiTypeSig,neType:"4g",kpiFullName:"4GHTTP成功率", kpiName:"HTTP成功率",unit:"%", rate:100, fixed:2,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_STREAM},
{kpiType:LSMConsts.kpiTypeSig,neType:"4g",kpiFullName:"4GTCP第二、三次握手成功率", kpiName:"TCP握手成功率",unit:"%", rate:100, fixed:2,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_STREAM},
{kpiType:LSMConsts.kpiTypeSig,neType:"4g",kpiFullName:"4GTCP第二、三次握手时延", kpiName:"TCP握手时延",unit:"ms", rate:1, fixed:0,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_STREAM},
{kpiType:LSMConsts.kpiTypeSig,neType:"4g",kpiFullName:"4G下行速率500k", kpiName:"下载速率",unit:"Kbps", rate:1, fixed:2,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_STREAM},
{kpiType:LSMConsts.kpiTypeSig,neType:"4g",kpiFullName:"视频业务大包下载速率", kpiName:"视频业务大包下载速率",unit:"Kbps", rate:1, fixed:2,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_STREAM},
{kpiType:LSMConsts.kpiTypeSig,neType:"4g",kpiFullName:"VOLTE语音接通率", kpiName:"VOLTE语音接通率",unit:"%", rate:100, fixed:2,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_STREAM},
{kpiType:LSMConsts.kpiTypeSig,neType:"4g",kpiFullName:"VOLTE语音掉话率", kpiName:"VOLTE语音掉话率",unit:"%", rate:100, fixed:2,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_STREAM},
{kpiType:LSMConsts.kpiTypeSig,neType:"4g",kpiFullName:"VOLTEIMS初始注册成功率(含用户原因)", kpiName:"IMS初始注册成功率(含用户原因)",unit:"%", rate:100, fixed:2,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_STREAM},
{kpiType:LSMConsts.kpiTypeSig,neType:"4g",kpiFullName:"VOLTE平均接续时长", kpiName:"V-V接续时长",unit:"ms", rate:1, fixed:0,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_STREAM},
{kpiType:LSMConsts.kpiTypeSig,neType:"4g",kpiFullName:"VOLTEeSRVCC成功率", kpiName:"ESRVCC切换成功率",unit:"%", rate:100, fixed:2,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_STREAM},
{kpiType:LSMConsts.kpiTypeSig,neType:"4g",kpiFullName:"VOLTEMOS值", kpiName:"VOLTE语音MOS值",unit:"", rate:1, fixed:2,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_STREAM},
{kpiType:LSMConsts.kpiTypeSig,neType:"4g",kpiFullName:"VOLTERTP上行丢包率", kpiName:"RTP上行丢包率",unit:"%", rate:100, fixed:2,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_STREAM}
//{kpiType:LSMConsts.kpiTypeSig,neType:"4g",kpiFullName:"VOLTEeSRVCC成功率", kpiName:"eSRVCC成功率",unit:"%", rate:100, fixed:2},

];
SceneBase.ExtraMenuHandler.prototype.DCELL_COLS_1=[
//LTE网管
{kpiType:LSMConsts.kpiTypeNet,neType:"4g",kpiFullName:"lte_flow_all", kpiName:"LTE流量",unit:"MB", rate:1, fixed:2,useNormal:true,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_WS},
{kpiType:LSMConsts.kpiTypeNet,neType:"4g",kpiFullName:"volte_voice_teletraffic", kpiName:"VOLTE无线语音话务量",unit:"Erl", rate:1, fixed:1,useNormal:true,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_WS},//黄文接口
{kpiType:LSMConsts.kpiTypeNet,neType:"4g",kpiFullName:"volte_video_teletraffic", kpiName:"VOLTE视频话务量",unit:"Erl", rate:1, fixed:1,useNormal:true,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_WS},//黄文接口
{kpiType:LSMConsts.kpiTypeNet,neType:"4g",kpiFullName:"lte_wireless_conn_ratio", kpiName:"LTE无线接通率",unit:"%", rate:1, fixed:2,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_WS},
{kpiType:LSMConsts.kpiTypeNet,neType:"4g",kpiFullName:"nbrattestab", kpiName:"E-RAB建立请求次数",unit:"次", rate:1, fixed:0,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_WS},
{kpiType:LSMConsts.kpiTypeNet,neType:"4g",kpiFullName:"lte_wireless_drop_ratio", kpiName:"LTE无线掉线率",unit:"%", rate:1, fixed:2,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_WS},
{kpiType:LSMConsts.kpiTypeNet,neType:"4g",kpiFullName:"nbrsuccestab", kpiName:"E-RAB建立成功次数",unit:"次", rate:1, fixed:0,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_WS},
{kpiType:LSMConsts.kpiTypeNet,neType:"4g",kpiFullName:"lte_sw_succ_ratio", kpiName:"LTE切换成功率",unit:"%", rate:1, fixed:2,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_WS},
{kpiType:LSMConsts.kpiTypeNet,neType:"4g",kpiFullName:"volte_voice_conn_ratio", kpiName:"VOLTE语音无线接通率",unit:"%", rate:1, fixed:2,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_WS},
{kpiType:LSMConsts.kpiTypeNet,neType:"4g",kpiFullName:"volte_video_conn_ratio", kpiName:"VOLTE视频无线接通率",unit:"%", rate:1, fixed:2,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_WS},
{kpiType:LSMConsts.kpiTypeNet,neType:"4g",kpiFullName:"volte_voice_erab_drop_ratio", kpiName:"VOLTE E-RAB掉线率(语音)",unit:"%", rate:1, fixed:2,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_WS},
{kpiType:LSMConsts.kpiTypeNet,neType:"4g",kpiFullName:"volte_video_erab_drop_ratio", kpiName:"VOLTE E-RAB掉线率(视频)",unit:"%", rate:1, fixed:2,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_WS},
{kpiType:LSMConsts.kpiTypeNet,neType:"4g",kpiFullName:"volte_sw_succ_ratio", kpiName:"VOLTE用户切换成功率",unit:"%", rate:1, fixed:2,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_WS},
{kpiType:LSMConsts.kpiTypeNet,neType:"4g",kpiFullName:"lte_avg_cqi", kpiName:"LTE平均CQI",unit:"%", rate:1, fixed:2,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_WS},
{kpiType:LSMConsts.kpiTypeNet,neType:"4g",kpiFullName:"lte_ul_prb_use_ratio", kpiName:"LTE上行PRB利用率",unit:"%", rate:1, fixed:2,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_WS},
{kpiType:LSMConsts.kpiTypeNet,neType:"4g",kpiFullName:"lte_ul_user_avg_rate", kpiName:"上行用户平均速率",unit:"Mbps", rate:1, fixed:2,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_WS},
{kpiType:LSMConsts.kpiTypeNet,neType:"4g",kpiFullName:"lte_dl_prb_use_ratio", kpiName:"LTE下行PRB利用率",unit:"%", rate:1, fixed:2,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_WS},
{kpiType:LSMConsts.kpiTypeNet,neType:"4g",kpiFullName:"lte_dl_user_avg_rate", kpiName:"下行用户平均速率",unit:"Mbps", rate:1, fixed:2,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_WS},
{kpiType:LSMConsts.kpiTypeNet,neType:"4g",kpiFullName:"lte_disturb_highpower_ratio", kpiName:"LTE干扰高功率占比",unit:"%", rate:1, fixed:2,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_WS}

];
SceneBase.ExtraMenuHandler.prototype.DCELL_COLS_2=[
//GSM网管	
	{kpiType:LSMConsts.kpiTypeNet,neType:"2g",kpiFullName:"gsm_flow_all", kpiName:"GSM流量",unit:"MB", rate:1, fixed:2,useNormal:true,type:KpiView.TYPE_GSM,source:KpiView.SOURCE_WS},//黄文接口
	{kpiType:LSMConsts.kpiTypeNet,neType:"2g",kpiFullName:"tchhalftraf", kpiName:"GSM半速率话务量",unit:"Erl", rate:1, fixed:1,useNormal:true,type:KpiView.TYPE_GSM,source:KpiView.SOURCE_WS},
	{kpiType:LSMConsts.kpiTypeNet,neType:"2g",kpiFullName:"gsm_teletraffic", kpiName:"GSM话务量",unit:"Erl", rate:1, fixed:1,useNormal:true,type:KpiView.TYPE_GSM,source:KpiView.SOURCE_WS},//黄文接口
//	{kpiType:LSMConsts.kpiTypeNet,neType:"2g",kpiFullName:"volte_voice_teletraffic", kpiName:"VOLTE无线语音话务量",unit:"Erl", rate:1, fixed:1,useNormal:true,type:KpiView.TYPE_GSM,source:KpiView.SOURCE_WS},//黄文接口
//	{kpiType:LSMConsts.kpiTypeNet,neType:"2g",kpiFullName:"volte_video_teletraffic", kpiName:"VOLTE视频话务量",unit:"Erl", rate:1, fixed:1,useNormal:true,type:KpiView.TYPE_GSM,source:KpiView.SOURCE_WS},//黄文接口
	{kpiType:LSMConsts.kpiTypeNet,neType:"2g",kpiFullName:"gsm_conn_ratio", kpiName:"GSM接通率",unit:"%", rate:1, fixed:2,type:KpiView.TYPE_GSM,source:KpiView.SOURCE_WS},
	{kpiType:LSMConsts.kpiTypeNet,neType:"2g",kpiFullName:"gsm_wireless_conn_ratio", kpiName:"GSM无线接通率",unit:"%", rate:1, fixed:2,type:KpiView.TYPE_GSM,source:KpiView.SOURCE_WS},
	{kpiType:LSMConsts.kpiTypeNet,neType:"2g",kpiFullName:"attnbrtchnho", kpiName:"GSM-TCH尝试次数",unit:"次", rate:1, fixed:0,type:KpiView.TYPE_GSM,source:KpiView.SOURCE_WS},
	{kpiType:LSMConsts.kpiTypeNet,neType:"2g",kpiFullName:"gsm_ul_tbf_succ_ratio", kpiName:"GSM上行TBF建立成功率",unit:"%", rate:1, fixed:2,type:KpiView.TYPE_GSM,source:KpiView.SOURCE_WS},
	{kpiType:LSMConsts.kpiTypeNet,neType:"2g",kpiFullName:"gsm_wireless_use_ratio", kpiName:"GSM无线利用率",unit:"%", rate:1, fixed:2,type:KpiView.TYPE_GSM,source:KpiView.SOURCE_WS},
	{kpiType:LSMConsts.kpiTypeNet,neType:"2g",kpiFullName:"gsm_disturb_45_ratio", kpiName:"GSM频带45占比",unit:"%", rate:1, fixed:2,type:KpiView.TYPE_GSM,source:KpiView.SOURCE_WS}
];

SceneBase.ExtraMenuHandler.prototype.APP_COLS=[{kpiName:"用户数",kpiFullName:"4G用户数",unit:"人",rate:1,fixed:1,ymin:0,ymax:null,useNormal:true,type:KpiView.TYPE_GSM,source:KpiView.SOURCE_STREAM},
                                               {kpiName:"流量",kpiFullName:"4G流量",unit:"MB",rate:1/1024,fixed:1,ymin:0,ymax:null,useNormal:true,type:KpiView.TYPE_GSM,source:KpiView.SOURCE_STREAM},

                                               {kpiName:"下载速率",kpiFullName:"4G下行速率500k",unit:"Kbps",rate:1,fixed:0,ymin:0,ymax:null,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_STREAM},
//                                               {kpiName:"本省率",kpiFullName:"4G本省率",unit:"%",rate:100,fixed:1,ymin:0,ymax:100,useNormal:true,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_STREAM},
//                                               {kpiName:"本网率",kpiFullName:"4G本网率",unit:"%",rate:100,fixed:1,ymin:0,ymax:100,useNormal:true,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_STREAM},
                                               {kpiName:"TCP建链成功率 ",kpiFullName:"TCP建立成功率",unit:"%",rate:100,fixed:2,ymin:0,ymax:100,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_STREAM},
                                               {kpiName:"TCP建链时延 ",kpiFullName:"TCP时延",unit:"ms",rate:1,fixed:0,ymin:0,ymax:null,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_STREAM},
                                               {kpiName:"TCP建链请求次数 ",kpiFullName:"TCP建立请求次数",unit:"次",rate:1,fixed:0,ymin:0,ymax:null,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_STREAM},
                                               {kpiName:"HTTP响应成功率",kpiFullName:"HTTP响应成功率",unit:"%",rate:100,fixed:2,ymin:0,ymax:100,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_STREAM},
                                               {kpiName:"HTTP响应时延",kpiFullName:"HTTP响应时延",unit:"ms",rate:1,fixed:0,ymin:0,ymax:null,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_STREAM},
                                               {kpiName:"HTTP请求次数 ",kpiFullName:"HTTP请求次数",unit:"次",rate:1,fixed:0,ymin:0,ymax:null,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_STREAM},
                                               
                                               {kpiName:"TCP一二次握手成功率 ",kpiFullName:"TCP第一、二次握手成功率",unit:"%",rate:100,fixed:2,ymin:0,ymax:100,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_STREAM},
                                               {kpiName:"TCP一二次握手时延 ",kpiFullName:"TCP第一、二次握手时延",unit:"ms",rate:1,fixed:0,ymin:0,ymax:null,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_STREAM},
                                               {kpiName:"TCP二三次握手成功率",kpiFullName:"TCP第二、三次握手成功率",unit:"%",rate:100,fixed:2,ymin:0,ymax:100,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_STREAM},
                                               {kpiName:"TCP二三次握手时延",kpiFullName:"TCP第二、三次握手时延",unit:"ms",rate:1,fixed:0,ymin:0,ymax:null,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_STREAM},
                                               {kpiName:"TCP上行重传率",kpiFullName:"TCP上行重传率",unit:"%",rate:100,fixed:2,ymin:0,ymax:100,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_STREAM},

                                               {kpiName:"TCP下行重传率",kpiFullName:"TCP下行重传率",unit:"%",rate:100,fixed:2,ymin:0,ymax:100,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_STREAM},
                                               {kpiName:"TCP上行乱序率",kpiFullName:"TCP上行乱序率",unit:"%",rate:100,fixed:2,ymin:0,ymax:100,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_STREAM},
                                               {kpiName:"TCP下行乱序率",kpiFullName:"TCP下行乱序率",unit:"%",rate:100,fixed:2,ymin:0,ymax:100,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_STREAM},
                                               {kpiName:"用户渗透率",kpiFullName:"4G用户渗透率",unit:"%",rate:100,fixed:2,ymin:0,ymax:100,useNormal:true,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_STREAM},
                                               {kpiName:"全网业务占比",kpiFullName:"4G全网业务占比",unit:"%",rate:100,fixed:2,ymin:0,ymax:100,useNormal:true,type:KpiView.TYPE_LTE,source:KpiView.SOURCE_STREAM}];

SceneBase.ExtraMenuHandler.prototype.initialize=function(){
	var dm=LSMScreen.DataManager.getInstance();
	dm.getRangedAreas(null,function(rangedResult){
		dm.getBaseHotspotsListEx(null,function(areaList){
	  		var i=0;
	  		var opts='';
	  		var optsMulti='';
	  		var rangedList=rangedResult.data;
	  		this.allArea=areaList;
	  		
	  		for(i=0;i<rangedList.length;i++){
	  			var area=rangedList[i];
	  			this.selectedHotspotList.push(area.NAME);
	  			this.areaIdMap[area.NAME]=area.HOT_ID;
	  			if(i==0){
	  				opts+='<option value="'+area.NAME+'" selected="true">'+area.NAME+'</option>';
	  				this.selectedHotspot=area.NAME;
	  			}else{
	  				opts+='<option value="'+area.NAME+'">'+area.NAME+'</option>';
	  			}
	  			optsMulti+='<option value="'+area.NAME+'" selected="true">'+area.NAME+'</option>';
	  		}
	  		for(i=0;i<areaList.length;i++){
	  			var area=areaList[i];
	  			if(this.areaIdMap[area.name]==null){
		  			this.selectedHotspotList.push(area.name);
		  			this.areaIdMap[area.name]=area.id;
		  			opts+='<option value="'+area.name+'">'+area.name+'</option>';
		  			optsMulti+='<option value="'+area.name+'" selected="true">'+area.name+'</option>';
	  			}
	  		}
	  		
	  		switch(this.menuId){
	  		case 'MENU_DAREAS':
	  			$("#degradationRadio2").prop("checked",true);
	  			$('#multiSelectParent').css('display','inline-block');
	  			$('#isQuerySubParent').css('display','inline-block');
	  			$('#multiSelect').html(optsMulti);
	  			$('#selectedHotspots').text($('#multiSelect').val());
	  			$('#multiSelect').multiSelect({
	  				'afterSelect':function(values){
	  					var selecteds=$('#multiSelect').val();
	  					if(selecteds==null) selecteds=[];
	  					$('#selectedHotspots').text(selecteds.join(','));
	  					this.selectedHotspotList=selecteds;
	  				}.bind(this),
	  				'afterDeselect':function(values){
	  					var selecteds=$('#multiSelect').val();
	  					if(selecteds==null) selecteds=[];
	  					$('#selectedHotspots').text(selecteds.join(','));
	  					this.selectedHotspotList=selecteds;
	  				}.bind(this)
	  			});
	  			//阻止点击后下拉菜单消失
	  			$("ul.dropdown-menu").on("click", "[data-stopPropagation]", function(e) {  
	  		        e.stopPropagation();  
	  		    });  
	  			$("#thresholdCfgBtn").on('click',this.showThresholdConfig.bind(this));
	  			this.queryConfig();
	  			break;
	  		case 'MENU_DCELLS':
	  			$("#degradationRadio2").prop("checked",true);
	  			$("#cellColBtnGroup").css('display','inline-block');
	  			$('#singleSelect').css('display','inline-block');
	  			$('#singleSelect2').css('display','inline-block');
	  			$('#singleSelect').html(opts);
	  			$('#singleSelect').on('change',this.changeSelectedHotspot.bind(this));
	  			$('#singleSelect2').on('change',this.changeSelectedHotspot0.bind(this));
	  			$(".cellColTypeBtn").on('click',function(e){
	  				$(".cellColTypeBtn").removeClass('active');
	  				$(e.currentTarget).addClass('active');
	  				this.cellSelectedType=$(e.currentTarget).text();
	  				this.update();
	  			}.bind(this));
	  			$("#thresholdCfgBtn").on('click',this.showThresholdConfig.bind(this));
	  			
	  			var dm=LSMScreen.DataManager.getInstance();
	  			dm.getSubHotspots({hotspot:this.selectedHotspot},function(areaList){
	  				var opts='';
	  		  		for(i=0;i<areaList.length;i++){
	  		  			var area=areaList[i];
	  		  			var hot_name=area.hot_name;
	  		  			if(i==areaList.length-1){
	  		  				opts+='<option value="'+hot_name+'" selected="true">'+hot_name+'</option>';
	  		  				this.selectedHotspot=hot_name;
	  		  			}else{
	  		  				opts+='<option value="'+hot_name+'">'+hot_name+'</option>';
	  		  			}
	  		  		}
	  		  		$('#singleSelect2').html(opts);
	  		  		this.queryConfig();
	  			}.bind(this));
	  			break;
	  		case 'MENU_DAPPS':
	  			$("#degradationRadio").prop("checked",true);
	  			$('#singleSelect').css('display','inline-block');
	  			$('#singleSelect').html(opts);
	  			$('#singleSelect').on('change',this.changeSelectedHotspot0.bind(this));
	  			$("#thresholdCfgBtn").on('click',this.showThresholdConfigApp.bind(this));
	  			this.queryConfig();
	  			break;
	  		}
	  		
	  		$("#exportBtn").on('click',this.exportGridData.bind(this));
	  		$("#queryBtn").on('click',this.update.bind(this));
	  		$("#colCfgBtn").on('click',this.showColConfig.bind(this));
	  		$('.degradationRadios').on('click',this.reloadCache.bind(this));
	  		
	  		
	  	}.bind(this));
	}.bind(this));
  	
	
};
SceneBase.ExtraMenuHandler.prototype.queryConfig=function(){
	var dm=LSMScreen.DataManager.getInstance();
	dm.getConfigData({type:"EXTRAPAGE"},function(result){
		this.DAREA_COLS=JSON.parse(result["EXTRAPAGE_MENU_DAREAS"].content);
		this.APP_COLS=JSON.parse(result["EXTRAPAGE_MENU_DAPPS"].content);
		this.DCELL_COLS_0=JSON.parse(result["EXTRAPAGE_MENU_DCELLS_LTE信令"].content);
		this.DCELL_COLS_1=JSON.parse(result["EXTRAPAGE_MENU_DCELLS_LTE网管"].content);
		this.DCELL_COLS_2=JSON.parse(result["EXTRAPAGE_MENU_DCELLS_GSM网管"].content);
		
//		this.DEGRADATION=JSON.parse(result["EXTRAPAGE_DEGRADATION"].content);
//		this.DEGRADATION_APP=JSON.parse(result["EXTRAPAGE_DEGRADATION_APP"].content);
		this.reload();
	}.bind(this));
};

SceneBase.ExtraMenuHandler.prototype.changeSelectedHotspot0=function(e){
	this.selectedHotspot=$(e.currentTarget).val();
};

SceneBase.ExtraMenuHandler.prototype.changeSelectedHotspot=function(){
	var parentHot=$('#singleSelect').val();
	var dm=LSMScreen.DataManager.getInstance();
	dm.getSubHotspots({hotspot:parentHot},function(areaList){
		var opts='';
  		for(i=0;i<areaList.length;i++){
  			var area=areaList[i];
  			var hot_name=area.hot_name;
  			if(i==areaList.length-1){
  				opts+='<option value="'+hot_name+'" selected="true">'+hot_name+'</option>';
  				this.selectedHotspot=hot_name;
  			}else{
  				opts+='<option value="'+hot_name+'">'+hot_name+'</option>';
  			}
  		}
  		$('#singleSelect2').html(opts);
	}.bind(this));
};
SceneBase.ExtraMenuHandler.prototype.exportGridData=function(){
	var title='';
	switch(this.menuId){
	case 'MENU_DAREAS':
		title='劣化区域';
		break;
	case 'MENU_DCELLS':
		var type=$("#cellColBtnGroup").find(".active").text();
		title='质差小区('+type+')';
		break;
	case 'MENU_DAPPS':
		title='质差业务';
		break;
	}
	SUtils.exportJQGrid($("#grid"),title)
};

SceneBase.ExtraMenuHandler.prototype.update=function(){
	$("body").mask(' ');
	switch(this.menuId){
		case 'MENU_DAREAS':
			this.updateDAreas();
			break;
		case 'MENU_DCELLS':
			this.updateDCells();
			break;
		case 'MENU_DAPPS':
			this.updateDApps();
			break;
	}
//	var ALLWS2GCACHE=null;
//	var ALLWS4GCACHE=null;
//	var ALLSTREAMCACHE=null;
//	var dm=LSMScreen.DataManager.getInstance();
//	dm.getAllKpiRecordWs({qry:'gsm',time:this.getTime(true)},function(result){
//		ALLWS2GCACHE=result.data;
//		mergeAllData.apply(this);
//	}.bind(this));
//	
//	dm.getAllKpiRecordWs({qry:'lte',time:this.getTime(true)},function(result){
//		ALLWS4GCACHE=result.data;
//		mergeAllData.apply(this);
//	}.bind(this));
//	
//	dm.getAllUnionQualityRecord({qry:'gsm',time:this.getTime()},function(result){
//		ALLSTREAMCACHE=result;
//		mergeAllData.apply(this);
//	}.bind(this));
//	
//	function mergeAllData(){
//		if(ALLWS2GCACHE!=null&&ALLWS4GCACHE!=null&&ALLSTREAMCACHE!=null){
//			this.ALLDATA=$.extend(ALLWS2GCACHE,ALLWS4GCACHE,ALLSTREAMCACHE);
//			switch(this.menuId){
//				case 'MENU_DAREAS':
//					this.updateDAreas();
//					break;
//				case 'MENU_DCELLS':
//					this.updateDCells();
//					break;
//				case 'MENU_DAPPS':
//					this.updateDApps();
//					break;
//			}
//		}
//	};
	
};
SceneBase.ExtraMenuHandler.prototype.reload=function(){
	switch(this.menuId){
	case 'MENU_DAREAS':
		this.initDAreas();
		break;
	case 'MENU_DCELLS':
		$("#grid").attr("type","reload");
		this.initDCells();
		break;
	case 'MENU_DAPPS':
		this.initDApps();
		break;
	}
};
/////DAREAS START//////////////////
SceneBase.ExtraMenuHandler.prototype.initDAreas=function(){
	this.currentColumns=this.DAREA_COLS;
	var colNames=['区域名称','网管2G时间','网管4G时间'];
	var colModel=[
	  	    {frozen:true,colName:'区域名称',name : 'hot_name',index : 'hot_name',width : 150,sortable:false},
	  	    {colName:'网管2G时间',name : KpiView.TYPE_GSM+'_time',index : KpiView.TYPE_GSM+'_time',width : 150,hidden:true,sortable:false},
	  	    {colName:'网管4G时间',name : KpiView.TYPE_LTE+'_time',index : KpiView.TYPE_LTE+'_time',width : 150,hidden:true,sortable:false}
	  	];
	
	var cols=this.currentColumns;
	var i=0;
	for(i=0;i<cols.length;i++){
		var col=cols[i];
		if(col.selected==true||col.selected==null){
			var title=(col.kpiName+'('+col.unit+')').replace('()','');
			if(col.source==KpiView.SOURCE_STREAM){
				colNames.push('<span style="color:#b4e0ff">'+title+'</span>');
			}else{
				colNames.push('<span style="">'+title+'</span>');
			}
			colModel.push({
				colName:col.kpiName,
				name : col.kpiFullName,
				index : col.kpiFullName,
				width:165,
				formatter:this.degradationFormatter.bind(this),
				useNormal:col.useNormal,
				type:col.type,
				source:col.source,
				unit:col.unit
				});
		}
	}
	
  	var opt1={
  	        datatype : function(){},
  	        colNames:colNames,
  	        colModel:colModel,
  	        loadui:'disable',
  	        width:this.getGridWidth()+"px",
  	        height:this.getGridHeight()+"px",
  	        viewrecords: false,//是否在浏览导航栏显示记录总数
  	        autowidth: true, 
  	        shrinkToFit: false,
  	        scrollOffset: 0,
  	        rowNum:99999,
  	        ondblClickRow:this.showCellTrend.bind(this),
  	        onSortCol:this.sortCache.bind(this)
  		};
  	try{
  		$("#grid").jqGrid("GridDestroy");
  		$("#gridParent").html('<table id="grid"></table>');
  	}catch(e){
  		console.log("grid destroy failed");
  	}
  	$("#grid").jqGrid(opt1);
  	$("#grid").jqGrid('setFrozenColumns');
  	this.update();
  	
};
SceneBase.ExtraMenuHandler.prototype.updateDAreas=function(){
	
	
	var isQuerySub=$("#isQuerySub").prop("checked");
	if(isQuerySub){
		if(this.selectedHotspotList.length>3){
			alert('最多选择3个一级热点');
			$("body").unmask();
			return;
		}
		var dm=LSMScreen.DataManager.getInstance();
		dm.getSubHotspots({hotspot:this.selectedHotspotList.join(",")},function(result){
			var subList=[];
			for(var i=0;i<result.length;i++){
				var record=result[i];
				subList.push(record.hot_name);
				this.areaIdMap[record.hot_name]=record.hot_id;
			}
			this.updateDAreasByHotspotList(subList);
		}.bind(this));
	}else{
		this.updateDAreasByHotspotList(this.selectedHotspotList);
	}
	
	
};

SceneBase.ExtraMenuHandler.prototype.updateDAreasByHotspotList=function(areaList){
	var dm=LSMScreen.DataManager.getInstance();
	var count=0;
	this.cacheDArea_stream=null;
	this.cacheDArea_stream_day=null;
	this.cacheDArea_stream_last=null;
	this.cacheDArea_stream_normal=null;
	this.cacheDArea_ws_2g=null;
	this.cacheDArea_ws_4g=null;
	this.cacheDArea_cellCnt=null;
	
	
	
	dm.getCellCntsByHotspotsPost({hotspots:areaList.join(',')},function(resultCellCnt){
		this.cacheDArea_cellCnt=resultCellCnt.data;
		this.mergeDAreasData();
	}.bind(this));
	dm.getHotSpotsKpis(areaList,this.getTime(),this.getTimeType(),function(resultStream){
		this.cacheDArea_stream=resultStream;
		this.mergeDAreasData();
	}.bind(this));
	dm.getHotSpotsKpis(areaList,this.getLastTime(),this.getTimeType(),function(resultStreamLast){
		this.cacheDArea_stream_last=resultStreamLast;
		this.mergeDAreasData();
	}.bind(this));
	dm.getHotSpotsKpis(areaList,this.getNormalTime(),this.getTimeType(),function(resultStreamNormal){
		this.cacheDArea_stream_normal=resultStreamNormal;
		this.mergeDAreasData();
	}.bind(this));
	dm.getHotSpotCustomerCountAndFlowCompare(areaList,this.getTime(),null,null,function(resultDay){
		this.cacheDArea_stream_day=resultDay;
		this.mergeDAreasData();
	}.bind(this));
	var param2g={
		    "hotspot": areaList.join(','),    
		    "group": "hot",            
		    "max_threads": "15",
		    "hot_fields":"hot_name",
		    "hot_type":"1,0",    
		    "hb_domains": "2g",
		    "tb_domains": "2g",
		    "time":this.getTime(true),
		    "hb_time_minutes":60,
			"tb_time_minutes":this.normalMinutes,
		    "domains": "2g",
		    "multi":"true"
		};
	dm.getXpmData(param2g,function(resultWs2g){
		this.cacheDArea_ws_2g=resultWs2g;
		this.mergeDAreasData();
	}.bind(this));
	
	var param4g={
		    "hotspot": areaList.join(','),    
		    "group": "hot",            
		    "max_threads": "15",
		    "hot_fields":"hot_name",
		    "hot_type":"1,0",    
		    "hb_domains": "4g",
		    "tb_domains": "4g",
		    "time":this.getTime(true),
			"hb_time_minutes":15,
			"tb_time_minutes":this.normalMinutes,
		    "domains": "4g",
		    "multi":"true"
		};
	dm.getXpmData(param4g,function(resultWs4g){
		this.cacheDArea_ws_4g=resultWs4g;
		this.mergeDAreasData();
	}.bind(this));
	
};

SceneBase.ExtraMenuHandler.prototype.mergeDAreasData=function(){
	if(this.cacheDArea_stream!=null
		&&this.cacheDArea_stream_last!=null
		&&this.cacheDArea_stream_normal!=null
	    &&this.cacheDArea_ws_2g!=null
	    &&this.cacheDArea_ws_4g!=null
	    &&this.cacheDArea_cellCnt!=null
	    &&this.cacheDArea_stream_day!=null
	  ){
		var cellCntList=this.cacheDArea_cellCnt;
		var wsList2g=this.cacheDArea_ws_2g;
		var wsList4g=this.cacheDArea_ws_4g;
		var streamMap=this.cacheDArea_stream;
		var streamMapDay=this.cacheDArea_stream_day;
		var streamMapLast=this.cacheDArea_stream_last;
		var streamMapNormal=this.cacheDArea_stream_normal;
		var list=[];
		var allList=[];
		var cellCntMap={};
		var isShowDegradationOnly=this.isShowDegradationOnly();
		var degradationCount=0;
		var totalCount=0;
		var i=0;
		
		var wsMap2g={};
		var wsMap4g={};
		
		for(i=0;i<cellCntList.length;i++){
			var cellCntRecord=cellCntList[i];
			cellCntMap[cellCntRecord.hot_name]=cellCntRecord.cnt;
		}
		for(i=0;i<wsList2g.length;i++){
			wsMap2g[wsList2g[i].hot_name]=wsList2g[i];
		}
		
		for(i=0;i<wsList4g.length;i++){
			wsMap4g[wsList4g[i].hot_name]=wsList4g[i];
		}
		for(var hot_name in streamMap){
			var wsRecord2g=wsMap2g[hot_name];
			var wsRecord4g=wsMap4g[hot_name];
			if(wsRecord2g){
				wsRecord2g[KpiView.TYPE_GSM+"_time"]=wsRecord2g.time;
			}
			if(wsRecord4g){
				wsRecord4g[KpiView.TYPE_LTE+"_time"]=wsRecord4g.time;
			}
			
			var streamRecord=streamMap[hot_name];
			var streamLastRecord=streamMapLast[hot_name];
			var streamNormalRecord=streamMapNormal[hot_name];
			var streamDayRecord=streamMapDay[hot_name];
			var record=$.extend(wsRecord2g,wsRecord4g,streamRecord);
			record.cell_cnt=cellCntMap[hot_name];
			
			streamLastRecord=this.processRecordData(streamLastRecord);
			streamNormalRecord=this.processRecordData(streamNormalRecord);
			
			for(var key in streamRecord){
				if(streamLastRecord[key]!=null){
					record[key+'Hb']=streamLastRecord[key];//较上一周期
				}
				if(streamNormalRecord[key]!=null){
					record[key+'Tb']=streamNormalRecord[key];//较平时
				}
				if(streamDayRecord[key]!=null){
					record[key+'Day']=streamDayRecord[key];//日累计
				}
			}
			
			record=this.processRecordData(record);
			record=this.isDegradationArea(record,this.DEGRADATION);
			if(record.isDegradation==true){
				degradationCount++;
			}
			totalCount++;
			if(isShowDegradationOnly){
				if(record.isDegradation==true){
					list.push(record);
				}
			}else{
				list.push(record);
			}
			allList.push(record);
		}
		$('#cellCount').text(totalCount);
		$('#degradationCount').text(degradationCount);
		this.cacheGridDataList=list;
		this.cacheGridDataAllList=allList;
		$("#grid")[0].addJSONData(list);
		$("body").unmask();
	}
	
};
/////DAREAS END//////////////////
/////DCELLS START//////////////////
SceneBase.ExtraMenuHandler.prototype.initDCells=function(){
	this.update();
};

SceneBase.ExtraMenuHandler.prototype.reloadDCellsGrid=function(){
	var type=$("#cellColBtnGroup").find(".active").text();
	var colNames=['小区名称','工程','ECGI'];
	var colModel=[
	  	    {frozen:true,colName:'小区名称',name : 'cell_name',index : 'cell_name',width : 300,sortable:false},
	  	    {colName:'工程',name : 'pro_status',index : 'pro_status',width : 70,sortable:false},
	  	    {colName:'lacci',name : 'lacci',index : 'lacci',width : 125,hidden:false,sortable:false,formatter:function(cellvalue){
	  	    	if(cellvalue!=null){
	  	    		return cellvalue.replace(':','-');
	  	    	}else{
	  	    		return '';
	  	    	}
	  	    }}
	  	];
	var cols=[];
	var i=0;
	var kpiType='';
	var neType='';
	switch(type){
	case "LTE信令":
		cols=this.DCELL_COLS_0;
		break;
	case "LTE网管":
		cols=this.DCELL_COLS_1;
		break;
	case "GSM网管":
		colNames=['小区名称','工程','LACCI'];
		cols=this.DCELL_COLS_2;
		break;
	}
	this.currentColumns=cols;
	for(i=0;i<cols.length;i++){
		var col=cols[i];
		if(col.selected==true||col.selected==null){
			colNames.push((col.kpiName+'('+col.unit+')').replace('()',''));
			colModel.push({
				colName:col.kpiName,
				name : col.kpiFullName,
				index : col.kpiFullName,
				width:165,
				formatter:this.degradationFormatter.bind(this),
				useNormal:col.useNormal,
				type:col.type,
				source:col.source,
				unit:col.unit
			});
		}
	}
  	var opt1={
  	        datatype : function(){},
  	        colNames:colNames,
  	        colModel:colModel,
  	        loadui:'disable',
  	        width:this.getGridWidth()+"px",
  	        height:this.getGridHeight()+"px",
  	        viewrecords: false,//是否在浏览导航栏显示记录总数
  	        autowidth: true, 
  	        shrinkToFit: false,
  	        scrollOffset: 0,
  	        rowNum:99999,
  	        ondblClickRow:this.showCellTrend.bind(this),
  	        onSortCol:this.sortCache.bind(this)
  	};
  	try{
  		$("#grid").jqGrid("GridDestroy");
  		$("#gridParent").html('<table id="grid"></table>');
  	}catch(e){
  		console.log("grid destroy failed");
  	}
  	$("#grid").jqGrid(opt1);
  	$("#grid").attr("type",type);
  	$("#grid").jqGrid('setFrozenColumns');
};
SceneBase.ExtraMenuHandler.prototype.updateDCells=function(){
	if(this.cellSelectedType!=$("#grid").attr("type")){
		this.reloadDCellsGrid();
	}
	var type=$("#grid").attr("type");
	var cellType=$("#grid").attr("type")=='GSM网管'?'2g':'4g';
	var dm=LSMScreen.DataManager.getInstance();
	var hotspot=this.selectedHotspot;
	var maxCell=1000;
	var sCellData=[];
	var wCellData=[];
	if(type=='LTE信令'){
		dm.getCellsByHotspot({hotspot:hotspot},function(cells){
			var laccis=[];
			var cellMap={};
			var count=0;
			
			for(var i=0;i<cells.length&&count<maxCell;i++){
				var cell=cells[i];
				var cellNt=cell.cell_nt;
				if(cellNt!=null&&cellNt.toUpperCase()==cellType.toUpperCase()){
					var lac=cell.lac;
					var ci=cell.ci;
					cellMap[lac+":"+ci]=cell;
					laccis.push(lac+":"+ci);
					count++;
				}
			}
			$("#cellCount").text(count);
			var now=this.getTime();
			var s = now.replace(/-/g,"/");
			var date = new Date(Date.parse(s));
			date.setMinutes(date.getMinutes()-5);
			var last=date.Format('yyyy-MM-dd hh:mm:00');
			date = new Date(Date.parse(s));
			date.setMinutes(date.getMinutes()-this.normalMinutes);
			var normal=date.Format('yyyy-MM-dd hh:mm:00');
			
			var _CELL_NOW=null;
			var _CELL_LAST=null;
			var _CELL_NORMAL=null;
			
			dm.getCellsStreamKpiByCells({laccis:laccis,time:now},function(resultStreamNow){
				_CELL_NOW=resultStreamNow;
				streamDataMerge.apply(this);
			}.bind(this));
			dm.getCellsStreamKpiByCells({laccis:laccis,time:last},function(resultStreamLast){
				_CELL_LAST=resultStreamLast;
				streamDataMerge.apply(this);
			}.bind(this));
			dm.getCellsStreamKpiByCells({laccis:laccis,time:normal},function(resultStreamNormal){
				_CELL_NORMAL=resultStreamNormal;
				streamDataMerge.apply(this);
			}.bind(this));
			
			function streamDataMerge(){
				if(_CELL_NOW!=null&&_CELL_LAST!=null&&_CELL_NORMAL!=null){
					_CELL_NOW=this.mergeStreamData(_CELL_NOW,_CELL_LAST,_CELL_NORMAL);
					this.processCellData(laccis,cellMap,_CELL_NOW,[]);
				}
				
			}
		}.bind(this));
	}else{
		dm.getCellsByHotspot({hotspot:hotspot},function(cells){
			var laccis=[];
			var cellMap={};
			var count=0;
			
			for(var i=0;i<cells.length&&count<maxCell;i++){
				var cell=cells[i];
				var cellNt=cell.cell_nt;
				if(cellNt!=null&&cellNt.toUpperCase()==cellType.toUpperCase()){
					var lac=cell.lac;
					var ci=cell.ci;
					cellMap[lac+":"+ci]=cell;
					laccis.push(lac+":"+ci);
					count++;
				}
			}
			$("#cellCount").text(count);
			var domains=cellType;
			var param={
				    "hotspot": hotspot,    
				    "group": "cell",           
				    "max_threads": "10",
				    "cell_fields": "cell_name",
				    "domains": domains,
				    "hb_domains": domains,
				    "tb_domains": domains,
				    "hb_time_minutes":60,
					"tb_time_minutes":this.normalMinutes,
				    "all_fields":null,
					hot_fields:null,
					time:this.getTime(true),
					timeType:this.getTimeType(),
				};
			dm.getXpmData(param,function(resultWs){
				this.processCellData(laccis,cellMap,[],resultWs);
			}.bind(this));
		}.bind(this));
		
	}
	
	
	
};

SceneBase.ExtraMenuHandler.prototype.processCellData=function(laccis,cellMap,resultStream,resultWs){
	var sCellData=resultStream;
	var wCellData=resultWs;
	
	var i=0;
	var key="";
	var list=[];
	var allList=[];
	var wsMap={};
	var isShowDegradationOnly=this.isShowDegradationOnly();
	var degradationCount=0;
	for(var i=0;i<wCellData.length;i++){
		var wRecord=wCellData[i];
		wsMap[wRecord.lac+":"+wRecord.ci]=wRecord;
	}
	for(i=0;i<laccis.length;i++){
		var lacci=laccis[i];
		var showLacci=lacci==null?'':lacci.replace(':','-');
		var record={lacci:lacci,pro_status:cellMap[lacci].pro_status};
		record=$.extend(record,sCellData[lacci],wsMap[lacci]);
		record=this.processRecordData(record);
		record=$.extend(record,cellMap[lacci]);
		record=this.isDegradationCell(record,this.DEGRADATION);
		if(record.isDegradation==true){
			degradationCount++;
		}
		if(isShowDegradationOnly){
			if(record.isDegradation==true){
				list.push(record);
			}
		}else{
			list.push(record);
		}
		allList.push(record);
	}
	if(degradationCount>0){
		$("#degradationCount").css("color","red");
	}else{
		$("#degradationCount").css("color","white");
	}
	$("#degradationCount").text(degradationCount);
	list.sort(function(a,b){return b["总用户数"]-a["总用户数"];});//按value 降序
	allList.sort(function(a,b){return b["总用户数"]-a["总用户数"];});//按value 降序
	this.cacheGridDataList=list;
	this.cacheGridDataAllList=allList;
	$("#grid")[0].addJSONData(list);
	
	$("body").unmask();
};

/////DCELLS END//////////////////

/////DAPPS START//////////////////
SceneBase.ExtraMenuHandler.prototype.initDApps=function(){
	this.currentColumns=this.APP_COLS;
	var colNames=['应用','热点','大类'];
	var colModel=[
	        {frozen:true,colName:'应用',name : 'element',index : 'element',width : 100,sortable:false},
	        {colName:'热点',name : 'hotspot',index : 'hotspot',width : 100,sortable:false,hidden:true},
	        {colName:'大类',name : 'major',index : 'major',width : 100,sortable:false,hidden:true}
	  	    
	  	];
	
	var cols=this.currentColumns;
	for(var i=0;i<cols.length;i++){
		var col=cols[i];
		colNames.push((col.kpiName+'('+col.unit+')').replace('()',''));
		colModel.push({
			colName:col.kpiName,
			name:col.kpiFullName,
			index:col.kpiFullName,
			width:165,
			formatter:this.degradationFormatter.bind(this),
			useNormal:col.useNormal,
			type:col.type,
			source:col.source,
			unit:col.unit
		});
	}
  	var opt1={
        datatype : function(){},
        colNames:colNames,
        colModel:colModel,
        loadui:'disable',
        width:this.getGridWidth()+"px",
        height:this.getGridHeight()+"px",
        viewrecords: false,//是否在浏览导航栏显示记录总数
        autowidth: true, 
        shrinkToFit: false,
        sortable:false,
        scrollOffset: 0,
        rowNum:99999,
        ondblClickRow:this.showCellTrend.bind(this),
        onSortCol:this.sortCache.bind(this)
  	};
  	
  	var grid=$("#grid").jqGrid(opt1);
  	$("#grid").jqGrid('setFrozenColumns');
  	this.update();
};

SceneBase.ExtraMenuHandler.prototype.updateDApps=function(){
	var now=this.getTime();
	var s = now.replace(/-/g,"/");
	var date = new Date(Date.parse(s));
	date.setMinutes(date.getMinutes()-5);
	var last=date.Format('yyyy-MM-dd hh:mm:00');
	date = new Date(Date.parse(s));
	date.setMinutes(date.getMinutes()-this.normalMinutes);
	var normal=date.Format('yyyy-MM-dd hh:mm:00');
	
	var _APP_NOW=null;
	var _APP_LAST=null;
	var _APP_NORMAL=null;
	
	var dm=LSMScreen.DataManager.getInstance();
	var hotspot=this.selectedHotspot;
	dm.getMinorKpisByHotspotRank({
		hotspot:hotspot,time:now
	},function(resultNow){
		_APP_NOW=resultNow;
		processAppData.apply(this);
	}.bind(this));
	
	dm.getMinorKpisByHotspotRank({
		hotspot:hotspot,time:last
	},function(resultLast){
		_APP_LAST=resultLast;
		processAppData.apply(this);
	}.bind(this));
	
	dm.getMinorKpisByHotspotRank({
		hotspot:hotspot,time:normal
	},function(resultNormal){
		_APP_NORMAL=resultNormal;
		processAppData.apply(this);
	}.bind(this));
	
	function processAppData(){
		if(_APP_NOW!=null&&_APP_LAST!=null&&_APP_NORMAL!=null){
			var result=this.mergeStreamData(_APP_NOW,_APP_LAST,_APP_NORMAL);
			var isShowDegradationOnly=this.isShowDegradationOnly();
			var list=[];
			var allList=[];
			var degradationCount=0;
			var totalCount=0;
			for(var key in result){
				var record=result[key];
				record.element=key;
				record.hotspot=hotspot;
				record=this.processRecordData(record);
				record=this.isDegradationApp(record,this.DEGRADATION_APP);
				totalCount++;
				if(record.isDegradation==true){
					degradationCount++;
				}
				if(isShowDegradationOnly){
					if(record.isDegradation==true){
						list.push(record);
					}
				}else{
					list.push(record);
				}
				allList.push(record);
			}
			if(degradationCount>0){
				$("#degradationCount").css("color","red");
			}else{
				$("#degradationCount").css("color","white");
			}
			$("#degradationCount").text(degradationCount);
			$("#cellCount").text(totalCount);
			list=list.sort(function(a,b){return b['总用户数']-a['总用户数'];});
			allList=allList.sort(function(a,b){return b['总用户数']-a['总用户数'];});
			this.cacheGridDataList=list;
			this.cacheGridDataAllList=allList;
			$("#grid")[0].addJSONData(list);
			$("body").unmask();
		}
	}
};

SceneBase.ExtraMenuHandler.prototype.mergeStreamData=function(nowData,lastData,normalData){
	for(var lacci in nowData){
		var cellDataLast=lastData[lacci];
		var cellDataNormal=normalData[lacci];
		if(cellDataLast!=null){
			cellDataLast=this.processRecordData(cellDataLast);
			for(var kpi in cellDataLast){
				nowData[lacci][kpi+"Hb"]=cellDataLast[kpi];
			}
		}
		if(cellDataNormal!=null){
			cellDataNormal=this.processRecordData(cellDataNormal);
			for(var kpi in cellDataNormal){
				nowData[lacci][kpi+"Tb"]=cellDataNormal[kpi];
			}
		}
	}
	return nowData;
		
};
/////DAPPS END//////////////////
SceneBase.ExtraMenuHandler.prototype.degradationFormatter=function(cellvalue,config,rowData){
	var unit=config.colModel.unit;
	var key=config.colModel.index;
	var type=config.colModel.type;
	var source=config.colModel.source;
	var result='';
	var fontColor='';
	if(source==KpiView.SOURCE_STREAM){
		fontColor='color:#b4e0ff;';
	}
	if(rowData[key+"_isDegradation"]==true){
		fontColor='color:red;';
	}
	
	
	var day=rowData[key+"Day"];
	var hbObj=this.getCompareHtml(rowData,key,"Hb","较上一时段");
	var tbObj=this.getCompareHtml(rowData,key,"Tb","较平时");
	var time=rowData.time;
	if(source==KpiView.SOURCE_WS&&rowData[type+"_time"]!=null){
		time=rowData[type+"_time"];
	}
	var tip='时间:'+time;
	
	if(unit=='%'
		&&cellvalue!=null&&cellvalue!=''
	){//率值
		var thresholdMap=WXCONSTS.thresholds;
		var threshold=thresholdMap[key];
		if(threshold==null){
			result='<span exportByAttrText="true" text="'+cellvalue+'" style="'+fontColor+'">'+cellvalue+'</span>';
		}else{
			var showThreshold=threshold.showThreshold;
			var exp=threshold.showThreshold;
			exp=cellvalue+exp.replace('%','');
			try{
				if(eval(exp)==true){
					fontColor='color:red;';
				}
			}catch(e){}
			tip+='\n参考阈值:'+showThreshold;
			result='<span style="'+fontColor+'">'+cellvalue+'</span>';
			result='<div exportByAttrText="true" text="'+cellvalue+'" style="width:100%;height:100%;position:relative;" title="'+tip+'">'+result+'</div>';
		}
	}else{
		tip+='\n'+hbObj.tip;
		tip+='\n'+tbObj.tip;
		if(day!=null){
			tip+='\n日累计:'+day;
		}
		var k=hbObj.cmpAbs;
		if(k>=50){
			fontColor='color:#ffc000;';
		}else if(k>=20){
			fontColor='color:#ffff00;';
		}
		
		result='<span  style="'+fontColor+'">'+cellvalue+'</span>';
		result+=hbObj.html;
		result+=tbObj.html;
		result='<div exportByAttrText="true" text="'+cellvalue+'" style="width:100%;height:100%;position:relative;" title="'+tip+'">'+result+'</div>';
	}
	
	
	return result;
};
SceneBase.ExtraMenuHandler.prototype.getDegradationRatio=function(){

};
SceneBase.ExtraMenuHandler.prototype.getCompareHtml=function(rowData,key,addKey,rawTip){
	var result='';
	var outterTip='';
	var abs=0;
	if(rowData[key+addKey]!=null&&rowData[key+addKey]!=undefined){
		var now=rowData[key];
		var cmpValue=rowData[key+addKey];
		
		tip=rawTip+'('+cmpValue+')';
		result+='&nbsp;&nbsp;';
		
		var spanClass="";
		if(addKey=='Hb'){
			spanClass="compareLast";
		}else if(addKey=='Tb'){
			spanClass="compareNormal";
		}
		
		if(cmpValue*1==0){
			result+='<span class="'+spanClass+'" exportByText="true" >--</span>';
			outterTip='--';
		}else{
			var cmp=((now-cmpValue)/cmpValue*100).toFixed(1);
			abs=Math.abs(cmp);
			if(cmp>0){
				result+='<span class="'+spanClass+'" exportByText="true"  style="color:#ff7b7b;">↑'+abs+'%</span>';
				outterTip='增'+abs+'%';
			}else if(cmp<0){
				result+='<span class="'+spanClass+'" exportByText="true"  style="color:#90ff76;">↓'+abs+'%</span>';
				outterTip='降'+abs+'%';
			}else{
				result+='<span class="'+spanClass+'" exportByText="true" >--</span>';
				outterTip='--';
			}
		}
		outterTip=rawTip+':'+outterTip+'('+cmpValue+')';
		
	}
	return {
		html:result,
		tip:outterTip,
		cmpAbs:abs
	};
};
SceneBase.ExtraMenuHandler.prototype.isShowDegradationOnly=function(){
	var showDegradationOnly=$("#degradationRadio").is(':checked');
	return showDegradationOnly;
};
SceneBase.ExtraMenuHandler.prototype.isDegradationArea=function(record,threshods){
	var list=SUtils.getDegradationKpisList(record,WXCONSTS.degradationHotspotThresholds,true);
	for(var i=0;i<list.length;i++){
		var kpi=list[i];
		record[kpi.key+"_isDegradation"]=true;
		record.isDegradation=true;
	}
	return record;
};
SceneBase.ExtraMenuHandler.prototype.isDegradationCell=function(record,threshods){
	var list=SUtils.getDegradationKpisList(record,WXCONSTS.degradationCellThresholds,true);
	for(var i=0;i<list.length;i++){
		var kpi=list[i];
		record[kpi.key+"_isDegradation"]=true;
		record.isDegradation=true;
	}
	return record;
};
SceneBase.ExtraMenuHandler.prototype.isDegradationApp=function(record,threshods){
	var list=SUtils.getDegradationKpisList(record,WXCONSTS.degradationMinorThresholds,true);
	for(var i=0;i<list.length;i++){
		var kpi=list[i];
		record[kpi.key+"_isDegradation"]=true;
		record.isDegradation=true;
	}
	return record;
};

SceneBase.ExtraMenuHandler.prototype.processRecordData=function(record,noConvert){
	var allCol=this.currentColumns;
	for(var j=0;j<allCol.length;j++){
		var col=allCol[j];
		var colKey=col.key==null?col.kpiFullName:col.key;//指标ID
		var config=col;
		var sum=record[colKey];
		if(config!=null){
			sum=0;
			var hasValue=false;
			var tmp=colKey.split(",");
			for(var i=0;i<tmp.length;i++){
				if(!isNaN(record[tmp[i]])){
					sum+=parseFloat(record[tmp[i]]);
					hasValue=true;
				}
			}
			if(!hasValue||isNaN(sum)){
				sum="";
			}else{
				if(!noConvert){
					sum=sum*config.rate;
					if(Math.floor(sum)==sum){
						sum=sum.toFixed(0);
					}else{
						sum=sum.toFixed(config.fixed);
					}
					
				}
			}
			record[colKey]=sum;
		}
	}
	return record;
};
SceneBase.ExtraMenuHandler.prototype.getWinWidth=function(){
	var width=$(document).width()*0.9;
	return width;
};
SceneBase.ExtraMenuHandler.prototype.getWinHeight=function(){
	var height=$(document).height()*0.7;
	return height;
};
SceneBase.ExtraMenuHandler.prototype.getGridHeight=function(){
//	var gridHeight=$(document).height()-170;
	var gridHeight=$(document).height()-$("#conditionBar").height()*2-50;//选项高度本身+表格高度100%中的选项高度+表头
	return gridHeight;
};
SceneBase.ExtraMenuHandler.prototype.getGridWidth=function(){
	var gridWidth=$(document).width();
	return gridWidth;
};
SceneBase.ExtraMenuHandler.prototype.getPeriodMinute = function(){
	return 5;
};
SceneBase.ExtraMenuHandler.prototype.getTimeType = function(){
	return null;
};

SceneBase.ExtraMenuHandler.prototype.getTime = function(isWs){
	var time=$('#timeInput').val();
	if(isWs==true){//网管数据用 未选择时间时返回null
		if(time==''){
			time=null;
		}else{
			var s = time.replace(/-/g,"/");
			var date = new Date(Date.parse(s));
			var minutes=date.getMinutes();
			minutes=Math.ceil(minutes/15)*15;
			date.setMinutes(minutes);
			time=date.Format('yyyy-MM-dd hh:mm:00');
		}
	}else{//信令数据 默认返回最近20分钟
		if(time==''){
			time=SUtils.getDiffDateTimeFromNow(-10,SUtils.TIME_TYPE.MIN,'yyyy-MM-dd hh:mm:00');
		}
	}
	return time;
};
SceneBase.ExtraMenuHandler.prototype.getLastTime = function(){
	var current=this.getTime();
	if(current==''){
		return null;
	}else{
		var lastDate=new Date(Date.parse(current.replace(/-/g,"/")));
		lastDate.setMinutes(lastDate.getMinutes()-this.getPeriodMinute());
		return lastDate.Format('yyyy-MM-dd hh:mm:ss');
	}
	
};
SceneBase.ExtraMenuHandler.prototype.getNormalTime = function(){
	var current=this.getTime();
	if(current==''){
		return null;
	}else{
		var normalDate=new Date(Date.parse(current.replace(/-/g,"/")));
		normalDate.setDate(normalDate.getDate()-7);
		return normalDate.Format('yyyy-MM-dd hh:mm:ss');
	}
};
SceneBase.ExtraMenuHandler.prototype.reloadCache = function(){
	var cacheList=this.cacheGridDataAllList;
	var isShowDegradationOnly=this.isShowDegradationOnly();
	if(isShowDegradationOnly){
		var list=[];
		for(var i=0;i<cacheList.length;i++){
			var record=cacheList[i];
			if(record.isDegradation==true){
				list.push(record);
			}
		}
		$("#grid")[0].addJSONData(list);
	}else{
		$("#grid")[0].addJSONData(cacheList);
	}
};
SceneBase.ExtraMenuHandler.prototype.sortCache = function(index,iCol,sortorder){
	var list=this.cacheGridDataList;
	var allList=this.cacheGridDataAllList;
	var colModel=$("#grid").jqGrid('getGridParam','colModel');
	var col=colModel[iCol];
	if(sortorder=='asc'){
		list=list.sort(function(a,b){return a[col.index]-b[col.index];});
		allList=allList.sort(function(a,b){return a[col.index]-b[col.index];});
	}else{
		list=list.sort(function(a,b){return b[col.index]-a[col.index];});
		allList=allList.sort(function(a,b){return b[col.index]-a[col.index];});
	}
	$("#grid")[0].addJSONData(list);
	
};
SceneBase.ExtraMenuHandler.prototype.showCellTrend = function(rowid,iRow,iCol,e){
	var excludeMap={
			cell_cnt:true,
			cell_name:true,
			hot_name:true,
			hotspot:true
	};
	
	var _NOW_CACHE=null;
	var _COMPARE_CACHE=null;
	
	var colModel=$("#grid").jqGrid('getGridParam','colModel');
	var col=colModel[iCol];
	var key=col.index;
	var i=0;
	var reg= /^[A-Za-z0-9_]+$/;
	var isWs=col.source==KpiView.SOURCE_WS;//reg.test(key);//网管字段全英文 信令字段中文
	var rowData=$("#grid").jqGrid('getRowData',iRow);
	var colNames=$("#grid").jqGrid('getGridParam','colNames');
	var kpiName=$(colNames[iCol]).text();
	if(kpiName==''){
		kpiName=colNames[iCol];
	}

	
	var nowParams=KpiView.GETNOWPARAM();
	
	var wsStart=nowParams.wsStart;
	var wsEnd=nowParams.wsEnd;
	
	var streamTimeBegin=nowParams.streamTimeBegin;
	var streamTimeEnd=nowParams.streamTimeEnd;
	
	var streamTimeBeginDate = new Date(Date.parse(streamTimeBegin.replace(/-/g,   "/")));
	var streamTimeEndDate = new Date(Date.parse(streamTimeEnd.replace(/-/g,   "/")));
	
	streamTimeBeginDate.setMinutes(streamTimeBeginDate.getMinutes()-this.normalMinutes);
	streamTimeEndDate.setMinutes(streamTimeEndDate.getMinutes()-this.normalMinutes);
	
	var streamTimeBeginCompare=streamTimeBeginDate.Format('yyyy-MM-dd hh:mm:00');
	var streamTimeEndCompare=streamTimeEndDate.Format('yyyy-MM-dd hh:mm:00');
	
	var wsStartCompare=streamTimeBeginCompare.substring(0,16).replace(/:/g,'').replace(/-/g,'').replace(' ','');
	var wsEndCompare=streamTimeEndCompare.substring(0,16).replace(/:/g,'').replace(/-/g,'').replace(' ','');
	
	var compareLegend='平时';
	
	var indicatorNameList='time,'+col.index;
	var domains='';
	if(col.useNormal){
		compareLegend='平时';
	}else{
		compareLegend='全网';
	}
	
	if(col.type==KpiView.TYPE_LTE){
		domains='4g';
	}else{
		domains='2g';
	}
	if(key=="hotspot"||key=="hot_name"){
		var hot=rowData[key];
		var hotId=this.areaIdMap[hot];
		window.open('areaMonitor1.jsp?hotspotId='+hotId+'&hotspotName='+encodeURIComponent(hot),"_blank");      
		
	}else if(excludeMap[key]==true){
		return;
	}else{
		var dm=LSMScreen.DataManager.getInstance();
		var winWidth=this.getWinWidth();
		var winHeight=this.getWinHeight();
		
		var i=0;
		var win=new LSMScreen.SimpleWindow({
			title:kpiName+"-趋势图",
			width:winWidth,
			height:winHeight,
			x:($(document).width()-winWidth)/2,
			y:($(document).height()-winHeight)/2
		});
		$(".tempWinTitle").height(25);
		var chartDom=document.createElement("div");
		$(chartDom).css('width','100%');
		$(chartDom).css('height','100%');
		$(win.content).append(chartDom);
		$(win.content).mask(' ');
		var chart=null;
		switch(this.menuId){
			case 'MENU_DAREAS':
				var hotspot=rowData.hot_name;
				$(win.title).text(hotspot+'-'+kpiName+"-趋势图");
				chart=new LSMScreen.SimpleChart(chartDom,{},function(){
					if(isWs){
						var _params = 
						{
							hotspot:hotspot,
						    timeRange:"true",
						    group:"all",            
						    max_threads:"10",
						    domains: domains,
						    startTime:wsStart,
							endTime:wsEnd,
							timeType:this.getTimeType(),
							all_fields:null,
							hot_fields:null
						};
						var _params_compare  = $.extend({},_params);
						if(col.useNormal){
							_params_compare.startTime=wsStartCompare;
							_params_compare.endTime=wsEndCompare;
							dm.getXpmData(_params_compare, 
									compareDataHandler.bind(this));
							
						}else{
							_params_compare={
									qry:col.type,
									startTime:wsStartCompare,
									endTime:wsEndCompare
								};
								dm.getAllKpiTrendWs(_params_compare, 
										compareDataHandler.bind(this));
						}
						dm.getXpmData(_params, 
								nowDataHandler.bind(this));
						
						
					}else{
						dm.getHotSpotsKpisCompared(hotspot, streamTimeBegin, streamTimeEnd, null, null,this.getTimeType(),function(result){nowDataHandler.apply(this,[result.reverse()])}.bind(this),null,null,indicatorNameList);
						if(col.useNormal){
							dm.getHotSpotsKpisCompared(hotspot, streamTimeBeginCompare, streamTimeEndCompare, null, null,this.getTimeType(),compareDataHandler.bind(this),null,null,indicatorNameList);
						}else{
							var streamParams={
								timeBegin:streamTimeBeginCompare,
								timeEnd:streamTimeEndCompare,
								indicatorNameList:indicatorNameList
							}
							dm.getAllStreamTrendUnion(streamParams,compareDataHandler.bind(this));
						}
						
					}
				}.bind(this));
				break;
			case 'MENU_DCELLS':
				var cell_name=rowData.cell_name;
				var lacci=rowData.lacci;
				$(win.title).text(cell_name+'-'+kpiName+"-趋势图");
				chart=new LSMScreen.SimpleChart(chartDom,{},function(){
					if(isWs){
						var _params = 
						{
							lac_ci:lacci.replace(":","-"),
							timeRange:"true",
							"group":"cell",
							"max_threads":"10",
							"cell_fields":"cell_name",
							"domains":domains,
							"all_fields":null,
							"hot_fields":null,
							startTime:wsStart,
							endTime:wsEnd
						};
						dm.getXpmData(_params,nowDataHandler.bind(this));
						var _params_compare  = $.extend({},_params);
						if(col.useNormal){
							_params_compare.startTime=wsStartCompare;
							_params_compare.endTime=wsEndCompare;
							dm.getXpmData(_params_compare, 
									compareDataHandler.bind(this));
							
						}else{
							_params_compare={
									qry:col.type,
									startTime:wsStartCompare,
									endTime:wsEndCompare
								};
								dm.getAllKpiTrendWs(_params_compare, 
										compareDataHandler.bind(this));
						}
						
					}else{
						dm.getCellKpisCompared({
							site:lacci.replace("-",":"),
							timeType:this.getTimeType(),
							timeBegin:streamTimeBegin, 
							timeEnd:streamTimeEnd,
							indicatorNameList:indicatorNameList
						},nowDataHandler.bind(this));
						if(col.useNormal){
							dm.getCellKpisCompared({
								site:lacci.replace("-",":"),
								timeType:this.getTimeType(),
								timeBegin:streamTimeBeginCompare, 
								timeEnd:streamTimeEndCompare,
								indicatorNameList:indicatorNameList
							},compareDataHandler.bind(this));
						}else{
							var streamParams={
									timeBegin:streamTimeBeginCompare,
									timeEnd:streamTimeEndCompare,
									indicatorNameList:indicatorNameList
								}
								dm.getAllStreamTrendUnion(streamParams,compareDataHandler.bind(this));
						}
					}
				}.bind(this));
				break;
			case 'MENU_DAPPS':
				var hotspot=rowData.hotspot;
				var minor=rowData.element;
				var major=rowData.major;
				$(win.title).text(hotspot+'-'+minor+'-'+kpiName+"-趋势图");
				chart=new LSMScreen.SimpleChart(chartDom,{},function(){
					dm.getHotspotAppKpisCompared(
							{
								hotspot:hotspot,
								minor:major+':'+minor,
								timeType:this.getTimeType(),
								timeBegin:streamTimeBegin, 
								timeEnd:streamTimeEnd,
								indicatorNameList:indicatorNameList
							},
							function(result){
								nowDataHandler.apply(this,[result[minor].reverse()]);
							}.bind(this)
					);
					if(col.useNormal){
						dm.getHotspotAppKpisCompared(
								{
									hotspot:hotspot,
									minor:major+':'+minor,
									timeType:this.getTimeType(),
									timeBegin:streamTimeBeginCompare, 
									timeEnd:streamTimeEndCompare,
									indicatorNameList:indicatorNameList
								},
								function(result){
									compareDataHandler.apply(this,[result[minor]]);
								}.bind(this)
						);
					}else{
						var streamParams={
								timeBegin:streamTimeBeginCompare,
								timeEnd:streamTimeEndCompare,
								indicatorNameList:indicatorNameList
							}
							dm.getAllStreamTrendUnion(streamParams,compareDataHandler.bind(this));
					}
					
				}.bind(this));
				break;
		}
	}
	
	function nowDataHandler(result){
		_NOW_CACHE=result;
		drawChart.apply(this);
	}
	
	function compareDataHandler(result){
		_COMPARE_CACHE=result.data==null?result:result.data;
		drawChart.apply(this);
	}
	
	function getTimeStr(record){
		var time='';
		var keys=['time','time_id','时间'];
		for(var i=0;i<keys.length;i++){
			var key=keys[i];
			if(record[key]!=null){
				time=record[key];
				break;
			}
		}
		return time;
	}
	
	function drawChart(arr){
		if(_NOW_CACHE!=null&&_COMPARE_CACHE!=null){
			var arr=_NOW_CACHE;
			var cmpArr=_COMPARE_CACHE;
			var valueArr=[];
			var compareValueArr=[];
			var xArr=[];
			var cmpTimeMap={};
			var i=0;
			for(i=0;i<cmpArr.length;i++){
				var record=cmpArr[i];
				var timeTxt=getTimeStr(record).substring(11,16);
				record=this.processRecordData(record);
				var value=record[key];
				cmpTimeMap[timeTxt]=value;
			}
			for(i=0;i<arr.length;i++){
				var record=arr[i];
				var timeTxt=getTimeStr(record).substring(11,16);
				if(record[key]==null) continue;
				record=this.processRecordData(record);
				xArr.push(timeTxt);
				valueArr.push(record[key]);
				var cmpValue=cmpTimeMap[timeTxt];
				if(cmpValue==null){
					cmpValue=NaN;
				}
				compareValueArr.push(cmpValue);
			}
			
			var tipFormatter='{b}<br/>'
			+'{a0}:{c0} <br/>'
			+'{a1}:{c1} <br/>';
			
			var legends=['当前',compareLegend];
			
			var series=[{
		        name: '当前',
		        type: 'line',
		        data: valueArr
		    },{
		        name: compareLegend,
		        type: 'line',
		        data: compareValueArr
		    }];
			
			var option = {
					color:['#fced00','#00ff5a','#7B68EE'],
				legend: {
				 textStyle :
	        		{
			        	color:LSMScreen.CHARTCONFIG.xAxisLabelColor,
	            		fontSize:LSMScreen.CHARTCONFIG.axisLabelSize*0.7
	        		},
	        	selectedMode:false,
		        data: legends
		    },
			grid:{
		    	borderWidth:0
		    },
		    tooltip : {
		        trigger: 'axis',
		        formatter:tipFormatter
		    },
		    calculable : false,
		    xAxis :{
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
		    },
		    yAxis : [
		        {
		            type : 'value',
		            axisLabel : {
		            	textStyle :
		            		{
		            		color:LSMScreen.CHARTCONFIG.xAxisLabelColor,
		            		fontSize:LSMScreen.CHARTCONFIG.axisLabelSize
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
		            min:0
		        }
		    ],
		    series : series
		    };
			chart.updateData(option, true);
			$(win.content).unmask();
		}
		
	}
};

////////////配置
SceneBase.ExtraMenuHandler.prototype.showThresholdConfig = function(){
	var allCols=[];
	var selectedCols=[];
	var winWidth=this.getWinWidth();
	var winHeight=this.getWinHeight();
	var i=0;
	var win=new LSMScreen.SimpleWindow({
		title:"阈值配置",
		width:winWidth,
		height:winHeight,
		x:($(document).width()-winWidth)/2,
		y:($(document).height()-winHeight)/2
	});
	$(".tempWinTitle").height(25);
	var thresholds=this.DEGRADATION;
	var html='<div class="thresholdSplit">LTE信令</div>'
					+'<div class="thresholdRecord">'
						+'<span>无线接通率</span><span>&lt;</span><input id="kpi0" value="'+thresholds[0].value0+'"/><span>%</span>'
					+'</div>'
					+'<div class="thresholdRecord">'
						+'<span>无线掉线率</span><span>&gt;</span><input id="kpi1" value="'+thresholds[1].value0+'"/><span>%</span>'
					+'</div>'
					+'<div class="thresholdRecord">'
						+'<span>上行PRB利用率</span><span>&gt;</span><input id="kpi2" value="'+thresholds[2].value0+'"/><span>%</span>'
					+'</div>'
					+'<div class="thresholdRecord">'
						+'<span>下行PRB利用率</span><span>&gt;</span><input id="kpi3" value="'+thresholds[3].value0+'"/><span>%</span>'
					+'</div>'
					+'<div class="thresholdSplit">LTE网管</div>'
					+'<div class="thresholdRecord">'
						+'<span>TCP二三次握手成功率</span><span>&lt;</span><input  id="kpi4_0" value="'+thresholds[4].value0+'"/><span>%</span>'
						+'<span>,且</span>'
						+'<span>TCP二三次握手请求次数</span><span>&gt;</span><input  id="kpi4_1" value="'+thresholds[4].value1+'"/><span>次</span>'
					+'</div>'
					+'<div class="thresholdRecord">'
						+'<span>TCP二三次握手时延</span><span>&gt;</span><input  id="kpi5_0" value="'+thresholds[5].value0+'"/><span>ms</span>'
						+'<span>,且</span>'
						+'<span>TCP二三次握手请求次数</span><span>&gt;</span><input  id="kpi5_1" value="'+thresholds[5].value1+'"/><span>次</span>'
					+'</div>'
					+'<div class="thresholdSplit">GSM网管</div>'
					+'<div class="thresholdRecord">'
						+'<span>2G无线接通率</span><span>&lt;</span><input   id="kpi6" value="'+thresholds[6].value0+'"/><span>%</span>'
					+'</div>';
	
	
	html+='<div class="kpiChooserWinFoot" style="position:absolute;top:0px;">';
	html+="<div>";
	html+='<input type="button" class="btn btn-primary btn-xs" value="确定"></input>';
	html+="&nbsp;&nbsp;&nbsp;&nbsp;";
	html+='<input type="button" class="btn btn-primary btn-xs" value="取消"></input>';
	html+="</div>";
	html='<div style="width:100%;padding:10px;">'+html+'</div>'
	
	
	$(win.content).css("overflow","hidden");
	$(win.content).html(html);
	$(win.content).find(":button").on('click',function(evt){
		if($(evt.currentTarget).val()=="确定"){
			var saveId='EXTRAPAGE_DEGRADATION';
			var content=[
             {type:'LTE网管',exp:'lte_23<'+$('#kpi0').val(),value0:$('#kpi0').val(),kpiNames:['无线接通率'],kpiKeys:['lte_23']},
             {type:'LTE网管',exp:'lte_15>'+$('#kpi1').val(),value0:$('#kpi1').val(),kpiNames:['无线掉线率'],kpiKeys:['lte_15']},
             {type:'LTE网管',exp:'lte_1011>'+$('#kpi2').val(),value0:$('#kpi2').val(),kpiNames:['上行PRB利用率'],kpiKeys:['lte_1011']},
             {type:'LTE网管',exp:'lte_1213>'+$('#kpi3').val(),value0:$('#kpi3').val(),kpiNames:['下行PRB利用率'],kpiKeys:['lte_1213']},
             
             {type:'LTE信令',exp:'TCP第二、三次握手成功率<'+$('#kpi4_0').val()+'&&TCP二、三次握手请求次数>'+$('#kpi4_1').val(),value0:$('#kpi4_0').val(),value1:$('#kpi4_1').val(),
            	 kpiNames:['TCP二三次握手成功率','TCP二三次握手请求次'],kpiKeys:['TCP第二、三次握手成功率','TCP二、三次握手请求次数']},
             {type:'LTE信令',exp:'TCP第二、三次握手时延>'+$('#kpi5_0').val()+'&&TCP二、三次握手请求次数>'+$('#kpi5_1').val(),value0:$('#kpi5_0').val(),value1:$('#kpi5_1').val(),
            		 kpiNames:['TCP二三次时延','TCP二三次握手请求次'],kpiKeys:['TCP第二、三次握手时延','TCP二、三次握手请求次数']},
             
             {type:'GSM网管',exp:'gsm_34<'+$('#kpi6').val(),value0:$('#kpi6').val(),kpiNames:['GSM接通率'],kpiKeys:['gsm_34']}
           ];
			
			var dm=LSMScreen.DataManager.getInstance();
			dm.configOperate(
					{
						"data":{
							"id":saveId,
							"content":JSON.stringify(content)
						}
					},
					function(){
						console.log(saveId+"保存成功");
						this.queryConfig();
					}.bind(this),
					function(){console.log(saveId+"保存失败");}
			);
		}
		win.closeWin();
	}.bind(this));
};
//质差业务阈值
SceneBase.ExtraMenuHandler.prototype.showThresholdConfigApp = function(){
	var allCols=[];
	var selectedCols=[];
	var winWidth=this.getWinWidth();
	var winHeight=this.getWinHeight();
	var i=0;
	var win=new LSMScreen.SimpleWindow({
		title:"阈值配置",
		width:winWidth,
		height:winHeight,
		x:($(document).width()-winWidth)/2,
		y:($(document).height()-winHeight)/2
	});
	$(".tempWinTitle").height(25);
	var html='';
	var thresholds=this.DEGRADATION_APP;
	for(var i=0;i<thresholds.length;i++){
		var tRecord=thresholds[i];
		var streamKey=tRecord.streamKey;
		var kpiName=tRecord.kpiName;
		var unit=tRecord.unit;
		var exp=tRecord.exp;
		var opt='';
		var value='';
		if(exp.indexOf('>=')!=-1){
			opt='>=';
		}else if(exp.indexOf('<=')!=-1){
			opt='<=';
		}else if(exp.indexOf('>')!=-1){
			opt='>';
		}else if(exp.indexOf('<')!=-1){
			opt='<';
		}else{
			continue;
		}
		value=exp.split(opt)[1];
		
		html+='<div class="thresholdRecord">'
			+'<span class="DEGRADATION_APP_NAME">'+kpiName+'</span><span class="DEGRADATION_APP_OPT" txt="'+opt+'">'+opt.replace('>','&gt;').replace('>','&lt;')+'</span><input class="DEGRADATION_APP_VAL" id="'+streamKey+'" value="'+value+'"/><span class="DEGRADATION_APP_UNIT">'+unit+'</span>'
			+'</div>'
	}
	
	html+='<div class="kpiChooserWinFoot" style="position:absolute;top:0px;">';
	html+="<div>";
	html+='<input type="button" class="btn btn-primary btn-xs" value="确定"></input>';
	html+="&nbsp;&nbsp;&nbsp;&nbsp;";
	html+='<input type="button" class="btn btn-primary btn-xs" value="取消"></input>';
	html+="</div>";
	html='<div style="width:100%;padding:10px;">'+html+'</div>'
	
	
	$(win.content).css("overflow","hidden");
	$(win.content).html(html);
	$(win.content).find(":button").on('click',function(evt){
		if($(evt.currentTarget).val()=="确定"){
			var saveId='EXTRAPAGE_DEGRADATION_APP';
			var names=$('.DEGRADATION_APP_NAME');
			var opts=$('.DEGRADATION_APP_OPT');
			var vals=$('.DEGRADATION_APP_VAL');
			var units=$('.DEGRADATION_APP_UNIT');
			var content=[];
			
			for(var i=0;i<names.length;i++){
				var name=$(names[i]);
				var opt=$(opts[i]);
				var val=$(vals[i]);
				var unit=$(units[i]);
				content.push({
					streamKey:val.attr("id"),
					kpiName:name.text(),
					exp:"x"+opt.attr("txt")+val.val(),
					unit:unit.text()
				});
			}
			
			var dm=LSMScreen.DataManager.getInstance();
			dm.configOperate(
					{
						"data":{
							"id":saveId,
							"content":JSON.stringify(content)
						}
					},
					function(){
						console.log(saveId+"保存成功");
						this.queryConfig();
					}.bind(this),
					function(){console.log(saveId+"保存失败");}
			);
		}
		win.closeWin();
	}.bind(this));
};

SceneBase.ExtraMenuHandler.prototype.showColConfig = function(){
	var allCols=[];
	var selectedCols=[];
	var winWidth=this.getWinWidth();
	var winHeight=this.getWinHeight();
	var i=0;
	
	var win=new LSMScreen.SimpleWindow({
		title:"列配置",
		width:winWidth,
		height:winHeight,
		x:($(document).width()-winWidth)/2,
		y:($(document).height()-winHeight)/2
	});
	$(".tempWinTitle").height(25);
	allCols=this.currentColumns;
	for(i=0;i<allCols.length;i++){
		var col=allCols[i];
		if(col.selected==true||col.selected==null){
			selectedCols.push(col);
		}
	}
	var selectedMap={};
	var html='<ul class="colchooser">';
	
	for(i=0;i<selectedCols.length;i++){
		selectedMap[selectedCols[i].kpiFullName]=(i+1);
	}
	//先插入选中的排序好的列
	for(i=0;i<selectedCols.length;i++){
		var kpiConfig=selectedCols[i];
		var kpiId=kpiConfig.kpiFullName;
		var kpiName=kpiConfig.kpiName;
		var checked="";
		checked='checked="checked"';
		html+='<li ><span><input type="checkbox" index="'+i+'" value="'+kpiId+'" '+checked+'>'+kpiName+'</input></span></li>';
	}
	//将未选中的列排在最后
	for(i=0;i<allCols.length;i++){
		var kpiConfig=allCols[i];
		var kpiId=kpiConfig.kpiFullName;
		var kpiName=kpiConfig.kpiName;
		var checked="";
		if(selectedMap[kpiId]){
		}else{
			html+='<li ><span><input type="checkbox" index="'+i+'" value="'+kpiId+'" '+checked+'>'+kpiName+'</input></span></li>';
		}
		
	}
	
	
	html+="</ul>";
	html+='<div class="kpiChooserWinFoot" style="position:absolute;top:0px;">';
	html+="<div>";
	html+='<input type="button" class="btn btn-primary btn-xs" value="确定"></input>';
	html+="&nbsp;&nbsp;&nbsp;&nbsp;";
	html+='<input type="button" class="btn btn-primary btn-xs" value="取消"></input>';
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

			allCols=this.currentColumns;
			
			for(i=0;i<allCols.length;i++){
				var kpiId=allCols[i].kpiFullName;
				allColsMap[kpiId]=allCols[i];
			}
			for(i=0;i<ilength;i++){
				var show=$(aLi[i]).find("input[type='checkbox']").is(':checked');
				var selectedId=$(aLi[i]).find("input").val();
				var left=$(aLi[i]).css("left").replace("px","");
				var top=$(aLi[i]).css("top").replace("px","");
				var sortValue=left*1+top*10000;
				var record=allColsMap[selectedId];
				record.selected=show;
				finalSelected.push(record);
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
			var saveId=this.getColConfigId();
			var dm=LSMScreen.DataManager.getInstance();
			dm.configOperate(
					{
						"data":{
							"id":saveId,
							"content":JSON.stringify(sortCols)
						}
					},
					function(){
						console.log(saveId+"保存成功");
						this.currentColumns=sortCols;
						this.queryConfig();
					}.bind(this),
					function(){console.log(saveId+"保存失败");}
			);
		}
		win.closeWin();
	}.bind(this));
};

SceneBase.ExtraMenuHandler.prototype.getColConfigId = function(){
	var saveId="EXTRAPAGE";
	switch(this.menuId){
		case 'MENU_DCELLS':
			var cellKpiType=$("#cellColBtnGroup").find(".active").text();
			saveId+="_"+this.menuId+"_"+cellKpiType;
			break;
		default:
			saveId+="_"+this.menuId;
			break;
		}
	return saveId;
};
