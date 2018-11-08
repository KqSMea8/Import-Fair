/**
 * 常量
 * @namespace
 */
var LSMConsts = LSMConsts || {};

LSMConsts.totalMetroStations=374;
/** url配置 */
//LSMConsts.DEFAULTIPPORT="http://10.221.247.7:8080";//"http://10.221.247.7:8080"
//LSMConsts.IPPORT2="http://10.221.247.7:19080";

LSMConsts.DEFAULTIPPORT="http://10.221.247.7:58080";//"http://10.221.247.7:8080"
//LSMConsts.DEFAULTIPPORT="http://10.221.247.7:8299";//"http://10.221.247.7:8080"
LSMConsts.IPPORT2="http://10.221.235.17:19080";



//LSMConsts.wsUrl="ws://192.168.1.128:8787/LsmController/wssocket";
//LSMConsts.serviceUrl="http://192.168.1.128:8787/LsmController";

//OA网需要相对ip
LSMConsts.IPPORT=eastcom.baseURL.indexOf("localhost")==-1?
		eastcom.baseURL.substring(0,eastcom.baseURL.lastIndexOf("/"))+""
		:LSMConsts.DEFAULTIPPORT;
LSMConsts.IPPORTARR=LSMConsts.IPPORT.replace("http://","").split(":");

LSMConsts.mapUrl="http://"+LSMConsts.IPPORTARR[0]+":"+LSMConsts.IPPORTARR[1]+""+"/sh/shUltimate/transCoordDSN.html";
LSMConsts.wsUrl="ws://"+LSMConsts.IPPORTARR[0]+":17080/LsmController/wssocket";
LSMConsts.serviceUrl="http://"+LSMConsts.IPPORTARR[0]+":"+LSMConsts.IPPORTARR[1]+"/LsmController";

LSMConsts.G_URLCONFIG={
	baseUrl:LSMConsts.IPPORT,
	urlZhjkfault:LSMConsts.IPPORT+"/zhjkfault",
	urlStream:LSMConsts.IPPORT+"/stream",
	urlWs:LSMConsts.IPPORT+"/services/ws",
	urlGsma:LSMConsts.IPPORT+"/subject_rest_service/rest/gsma",
//	urlInasSml:LSMConsts.IPPORT+"/services/sml",
	urlInasSml:LSMConsts.IPPORT+"/LsmScreen/sml",
	urlWs2:LSMConsts.IPPORT2+"/services/ws",
//	urlJK:LSMConsts.IPPORT
	urlJK:'http://10.221.213.85:8080'
};

LSMConsts.customMessage="";
LSMConsts.metroLines=[1,2,3,4,5,6,7,8,9,10,11,12,13,16,17];


/**字节进位运算*/
LSMConsts.byteDivider=1024;

/**热点中英文翻译*/
LSMConsts.hotspotMap={
	'disney':'迪士尼'
};
/**时延接口静态参数*/
LSMConsts.disneyDelayCode="迪士尼网络监控";
LSMConsts.lteDelayCode="LTE端到端网络监控";
LSMConsts.sceneDelayCode="场景保障网络监控";

/**所有保障区域 仅有id和name*/
LSMConsts.allAreas=[];
/**保障区域名称 初始化时从接口获得*/
LSMConsts.area="迪士尼保障";
/**保障区域经纬度 初始化时从接口获得*/
LSMConsts.lng=0;
LSMConsts.lat=0;
LSMConsts.areaId="";

/**保障区域经纬度范围 写死 迪士尼 左上lng 左上lat 右下lng 右下lat*/
LSMConsts.areaScope=[121.65863,31.155025,121.682992,31.140993];
/**热点列表 0-总体 1-场内 2-场外 初始化时从接口获得*/
LSMConsts.hotspots=['迪士尼','迪士尼-场内','迪士尼-场外'];
//LSMConsts.hotspots=['地铁','地铁','地铁'];
LSMConsts.updateBaseHotspots=function(hotspot,callback){
	if(hotspot=="迪士尼"){
		LSMConsts.hotspots=[hotspot,hotspot+'-场内',hotspot+'-场外'];
		LSMConsts.area=hotspot+"保障";
	}else{
		LSMConsts.hotspots=[hotspot,hotspot,hotspot];
		LSMConsts.area=hotspot+"保障";
	}
	
};
//阈值列表 初始化时从接口获取
LSMConsts.thresholsMap={};
LSMConsts.cellThresholdsMap={};

//区分指标是网管指标还是信令指标  网管指标都是娄瑶佳接口 信令指标都是黄文接口
LSMConsts.kpiTypeNet="网管";
LSMConsts.kpiTypeSig="信令";

//区分指标来源接口 返回格式不同 不同来源需做不同解析
LSMConsts.kpiSourceStream="stream";//娄瑶佳接口
LSMConsts.kpiSourceStreamDay="stream_day";//娄瑶佳接口 日累计
LSMConsts.kpiSourceWs="ws";//黄文接口
LSMConsts.kpiSourceMas="mas";//黄文MAS接口

LSMConsts.kpiGroup1="用户数流量数据流量";
LSMConsts.kpiGroup2="2G";
LSMConsts.kpiGroup3="3G";
LSMConsts.kpiGroup4="4G";
LSMConsts.kpiGroup5="信令统计";
LSMConsts.kpiGroup6="VOLTE信令";
LSMConsts.kpiGroup7="网优干扰";
LSMConsts.kpiGroup8="MASDDH";
LSMConsts.kpiGroup9="FDD";
LSMConsts.kpiGroup10="TDD";
/**指标配置面板中的所有指标*/
LSMConsts.kpiChooserSource=[
                            {"kpiGroup":"用户数流量数据流量","kpiType":"信令","neType":"all","kpiFullName":"总用户数","kpiName":"用户数","unit":"人","rate":1,"fixed":0,"source":"stream","generateId":0,"selected":true},
                            {"kpiGroup":"4G","kpiType":"信令","neType":"4g","kpiFullName":"4G附着成功率","kpiName":"附着成功率","unit":"%","rate":100,"fixed":2,"source":"stream","generateId":52,"selected":true},
                            {"selected":true,"kpiGroup":"4G","kpiType":"信令","neType":"4g","kpiFullName":"4GHTTP成功率","kpiName":"HTTP成功率","unit":"%","rate":100,"fixed":2,"source":"stream","generateId":50},
                            {"kpiGroup":"4G","kpiType":"信令","neType":"4g","kpiFullName":"4GHTTP时延","kpiName":"HTTP时延","unit":"ms","rate":1,"fixed":0,"source":"stream","ymax":1000,"generateId":57,"selected":true},
                            {"selected":true,"kpiGroup":"4G","kpiType":"信令","neType":"4g","kpiFullName":"4G下行速率500k","kpiName":"下载速率","unit":"Mbps","rate":0.0009765625,"fixed":2,"source":"stream","generateId":56},
                            {"kpiGroup":"信令统计","kpiType":"信令","neType":"4g","kpiFullName":"4GTCP下行重传率","kpiName":"TCP下行重传率","unit":"%","rate":100,"fixed":2,"source":"stream","generateId":65,"selected":true},
                            {"selected":true,"kpiGroup":"VOLTE信令","kpiType":"信令","neType":"all","kpiFullName":"VOLTE语音接通率","kpiName":"VOLTE语音接通率","unit":"%","rate":100,"fixed":2,"source":"stream","generateId":70},
                            {"selected":true,"kpiGroup":"VOLTE信令","kpiType":"信令","neType":"all","kpiFullName":"VOLTE注册成功率","kpiName":"VOLTE注册成功率","unit":"%","rate":100,"fixed":2,"source":"stream","generateId":67},
                            {"kpiGroup":"信令统计","kpiType":"信令","neType":"4g","kpiFullName":"4GTCP第二、三次握手成功率","kpiName":"TCP第二、三次握手成功率","unit":"%","rate":100,"fixed":2,"source":"stream","generateId":59,"selected":true},
                            {"selected":true,"kpiGroup":"用户数流量数据流量","kpiType":"信令","neType":"all","targetIndex":1,"kpiFullName":"总用户数","kpiName":"核心区域用户数","unit":"人","rate":1,"fixed":0,"source":"stream","generateId":13},
                            {"kpiGroup":"用户数流量数据流量","kpiType":"信令","neType":"all","kpiFullName":"总流量","kpiName":"总流量","unit":"GB","rate":9.5367431640625e-7,"fixed":2,"source":"stream","generateId":1,"selected":true},
                            {"selected":true,"kpiGroup":"TDD","kpiType":"信令","neType":"4g","kpiFullName":"VOLTEMOS值","kpiName":"TDD MOS值","unit":"","rate":1,"fixed":2,"source":"stream","generateId":113},
                            {"kpiGroup":"用户数流量数据流量","kpiType":"信令","neType":"4g","kpiFullName":"4G流量比","kpiName":"4G流量占比","unit":"%","rate":100,"fixed":2,"source":"stream","generateId":33,"selected":true},
                            {"selected":true,"kpiGroup":"用户数流量数据流量","kpiType":"信令","neType":"4g","kpiFullName":"4G流量","kpiName":"4G流量","unit":"GB","rate":9.5367431640625e-7,"fixed":2,"source":"stream","generateId":2},
                            
                            
                            {"selected":true,"kpiGroup":"用户数流量数据流量","kpiType":"网管","neType":"2g,4g","kpiFullName":"gsm_teletraffic,volte_voice_teletraffic,volte_video_teletraffic","kpiName":"话务量","unit":"Erl","rate":1,"fixed":2,"source":"ws","generateId":15},
                            {"kpiGroup":"用户数流量数据流量","kpiType":"网管","neType":"2g,4g","kpiFullName":"gsm_flow_all,lte_flow_all","kpiName":"总流量","unit":"GB","rate":0.0009765625,"fixed":2,"source":"ws","generateId":21,"selected":true},
                            {"selected":true,"kpiGroup":"用户数流量数据流量","kpiType":"网管","neType":"4g","kpiFullName":"lte_flow_all","kpiName":"4G流量","unit":"GB","rate":0.0009765625,"fixed":2,"source":"ws","generateId":22},
                            {"kpiGroup":"4G","kpiType":"网管","neType":"4g","kpiFullName":"lte_wireless_conn_ratio","kpiName":"4G无线接通率","unit":"%","rate":1,"fixed":2,"source":"ws","generateId":16,"selected":true},
                            {"kpiGroup":"4G","kpiType":"网管","neType":"4g","kpiFullName":"rrc_rate","kpiName":"RRC连接成功率","unit":"%","rate":1,"fixed":2,"source":"ws","generateId":45,"selected":true},
                            {"selected":true,"kpiGroup":"4G","kpiType":"网管","neType":"4g","kpiFullName":"lte_ul_prb_use_ratio","kpiName":"上行PRB利用率","unit":"%","rate":1,"fixed":2,"source":"ws","generateId":18},
                            {"kpiGroup":"4G","kpiType":"网管","neType":"4g","kpiFullName":"lte_dl_prb_use_ratio","kpiName":"下行PRB利用率","unit":"%","rate":1,"fixed":2,"source":"ws","generateId":17,"selected":true},
                            {"selected":true,"kpiGroup":"4G","kpiType":"网管","neType":"4g","kpiFullName":"lte_sw_succ_ratio","kpiName":"LTE切换成功率","unit":"%","rate":1,"fixed":2,"source":"ws","generateId":47},
                            {"selected":true,"kpiGroup":"4G","kpiType":"网管","neType":"4g","kpiFullName":"lte_wireless_conn_ratio","kpiName":"LTE接通率","unit":"%","rate":1,"fixed":2,"source":"ws","generateId":55},
                            {"kpiGroup":"信令统计","kpiType":"网管","neType":"4g","kpiFullName":"erab_rate","kpiName":"ERAB连接成功率","unit":"%","rate":1,"fixed":2,"source":"ws","generateId":60,"selected":true},
                            {"selected":true,"kpiGroup":"用户数流量数据流量","kpiType":"网管","neType":"2g","kpiFullName":"gsm_teletraffic","kpiName":"2G话务量","unit":"Erl","rate":1,"fixed":2,"source":"ws","generateId":25},
                            {"selected":true,"kpiGroup":"用户数流量数据流量","kpiType":"网管","neType":"2g","kpiFullName":"gsm_flow_all","kpiName":"2G流量","unit":"GB","rate":0.0009765625,"fixed":2,"source":"ws","generateId":24},
                            {"selected":true,"kpiGroup":"2G","kpiType":"网管","neType":"2g","kpiFullName":"gsm_wireless_conn_ratio","kpiName":"2G无线接通率","unit":"%","rate":1,"fixed":2,"source":"ws","generateId":19},
                            {"kpiGroup":"2G","kpiType":"网管","neType":"2g","kpiFullName":"gsm_ul_tbf_succ_ratio","kpiName":"2G 上行TBF建立成功率","unit":"%","rate":1,"fixed":2,"source":"ws","generateId":27,"selected":true},
                            {"kpiGroup":"2G","kpiType":"网管","neType":"2g","kpiFullName":"gsm_wireless_use_ratio","kpiName":"GSM无线利用率","unit":"%","rate":1,"fixed":2,"source":"ws","generateId":36,"selected":true},
                            
                            
//                            {"kpiGroup":"4G","kpiType":"网管","neType":"4g","kpiFullName":"lte_14","kpiName":"小区并发最大用户数","unit":"个","rate":1,"fixed":0,"source":"ws","generateId":58,"selected":false},
                            {"selected":false,"kpiGroup":"用户数流量数据流量","kpiType":"信令","targetIndex":1,"kpiFullName":"总用户数","kpiName":"核心区域累计用户数","unit":"人","rate":1,"fixed":0,"source":"stream_day","generateId":10},
                            {"selected":false,"kpiGroup":"VOLTE信令","kpiType":"信令","neType":"all","kpiFullName":"VOLTE用户数","kpiName":"VOLTE用户数","unit":"人","rate":1,"fixed":0,"source":"stream","generateId":12},
                            {"generateId":93,"kpiGroup":"FDD","kpiType":"信令","neType":"4g","kpiFullName":"4G用户数","kpiName":"FDD用户数","unit":"人","rate":1,"fixed":0,"source":"stream","selected":false},
                            {"selected":false,"kpiGroup":"VOLTE信令","kpiType":"信令","neType":"all","kpiFullName":"VOLTE语音话务量ERL","kpiName":"VOLTE语音话务量","unit":"Erl","rate":1,"fixed":2,"source":"stream","generateId":69},
                            {"selected":false,"kpiGroup":"TDD","kpiType":"信令","neType":"4g","kpiFullName":"4G下行速率500k","kpiName":"TDD下载速率","unit":"Mbps","rate":0.0009765625,"fixed":2,"source":"stream","generateId":8},
                            {"selected":false,"kpiGroup":"FDD","kpiType":"信令","neType":"4g","kpiFullName":"4G下行速率500k","kpiName":"FDD下载速率","unit":"Mbps","rate":0.0009765625,"fixed":2,"source":"stream","generateId":9},
                            {"selected":false,"kpiGroup":"VOLTE信令","kpiType":"信令","neType":"all","kpiFullName":"VOLTE平均接续时长","kpiName":"VOLTE-VOLTE接续时长","unit":"秒","rate":1/1000,"fixed":2,"source":"stream","generateId":7},
                            {"selected":false,"kpiGroup":"VOLTE信令","kpiType":"信令","neType":"all","kpiFullName":"VOLTEMOS值","kpiName":"MOS值","unit":"","rate":1,"fixed":2,"source":"stream","generateId":6},
                            {"selected":false,"kpiGroup":"4G","kpiType":"信令","neType":"4g","kpiFullName":"4GTCP成功率","kpiName":"TCP成功率","unit":"%","rate":100,"fixed":2,"source":"stream","generateId":53},
                            {"selected":false,"kpiGroup":"4G","kpiType":"信令","neType":"4g","kpiFullName":"4GTCP时延","kpiName":"TCP时延","unit":"ms","rate":1,"fixed":0,"source":"stream","ymax":1000,"generateId":54},
                            
                            {"selected":false,"kpiGroup":"VOLTE信令","kpiType":"信令","neType":"all","kpiFullName":"VOLTE呼叫建立时延","kpiName":"VOLTE呼叫建立时延","unit":"ms","rate":1,"fixed":0,"source":"stream","generateId":7},
                            {"selected":false,"kpiGroup":"FDD","kpiType":"信令","neType":"4g","kpiFullName":"VOLTE呼叫建立时延","kpiName":"FDD VOLTE呼叫建立时延","unit":"ms","rate":1,"fixed":0,"source":"stream","generateId":87},
                            {"kpiGroup":"用户数流量数据流量","kpiType":"信令","neType":"4g","kpiFullName":"4G用户数","kpiName":"4G用户数","unit":"人","rate":1,"fixed":0,"source":"stream","generateId":5,"selected":false},
                            {"generateId":4,"kpiGroup":"FDD","kpiType":"信令","neType":"4g","kpiFullName":"4G流量","kpiName":"FDD流量","unit":"GB","rate":9.5367431640625e-7,"fixed":2,"source":"stream","selected":false},
                            {"generateId":3,"kpiGroup":"TDD","kpiType":"信令","neType":"4g","kpiFullName":"4G流量","kpiName":"TDD流量","unit":"GB","rate":9.5367431640625e-7,"fixed":2,"source":"stream","selected":false},
                            {"kpiGroup":"用户数流量数据流量","kpiType":"信令","neType":"all","targetIndex":2,"kpiFullName":"总用户数","kpiName":"周边用户数","unit":"人","rate":1,"fixed":0,"source":"stream","generateId":11,"selected":false},
                            {"selected":false,"kpiGroup":"TDD","kpiType":"信令","neType":"4g","targetIndex":1,"kpiFullName":"总用户数","kpiName":"TDD核心区域用户数","unit":"人","rate":1,"fixed":0,"source":"stream","generateId":14},
                            {"kpiGroup":"用户数流量数据流量","kpiType":"信令","kpiFullName":"总用户数","kpiName":"累计用户数","unit":"人","rate":1,"fixed":0,"source":"stream_day","generateId":30,"selected":false},
                            {"kpiGroup":"用户数流量数据流量","kpiType":"信令","kpiFullName":"总流量","kpiName":"累计流量","unit":"GB","rate":9.5367431640625e-7,"fixed":2,"source":"stream_day","generateId":31,"selected":false},
                            {"selected":false,"kpiGroup":"用户数流量数据流量","kpiType":"信令","neType":"4g","kpiFullName":"4G用户数比例","kpiName":"4G用户数占比","unit":"%","rate":100,"fixed":2,"source":"stream","generateId":32},
                            {"kpiGroup":"用户数流量数据流量","kpiType":"信令","neType":"2g","kpiFullName":"2G流量","kpiName":"2G流量","unit":"GB","rate":9.5367431640625e-7,"fixed":2,"source":"stream","generateId":34,"selected":false},
                            {"kpiGroup":"用户数流量数据流量","kpiType":"信令","neType":"3g","kpiFullName":"3G流量","kpiName":"3G流量","unit":"GB","rate":9.5367431640625e-7,"fixed":2,"source":"stream","generateId":35,"selected":false},
                            {"kpiGroup":"4G","kpiType":"信令","neType":"4g","kpiFullName":"4GDNS成功率","kpiName":"DNS成功率","unit":"%","rate":100,"fixed":2,"source":"stream","generateId":44,"selected":false},
                            {"kpiGroup":"4G","kpiType":"信令","neType":"4g","kpiFullName":"4G上行速率500k","kpiName":"上行速率","unit":"Mbps","rate":0.0009765625,"fixed":2,"source":"stream","generateId":46,"selected":false},
                            {"selected":false,"kpiGroup":"4G","kpiType":"信令","neType":"4g","kpiFullName":"4GHTTP响应时延","kpiName":"HTTP响应时延","unit":"ms","rate":1,"fixed":0,"source":"stream","generateId":49},
                            {"kpiGroup":"4G","kpiType":"信令","neType":"4g","kpiFullName":"4GHTTP响应成功率","kpiName":"HTTP响应成功率","unit":"%","rate":100,"fixed":2,"source":"stream","generateId":51,"selected":false},
                            {"kpiGroup":"信令统计","kpiType":"信令","neType":"4g","kpiFullName":"4GTCP下行乱序率","kpiName":"TCP下行乱序率","unit":"%","rate":100,"fixed":2,"source":"stream","generateId":61,"selected":false},
                            {"kpiGroup":"信令统计","kpiType":"信令","neType":"4g","kpiFullName":"4GTCP掉线率","kpiName":"TCP掉线率","unit":"%","rate":100,"fixed":2,"source":"stream","generateId":62,"selected":false},
                            {"kpiGroup":"信令统计","kpiType":"信令","neType":"4g","kpiFullName":"4GTCP上行重传率","kpiName":"TCP上行重传率","unit":"%","rate":100,"fixed":2,"source":"stream","generateId":63,"selected":false},
                            {"kpiGroup":"信令统计","kpiType":"信令","neType":"4g","kpiFullName":"4GTCP上行乱序率","kpiName":"TCP上行乱序率","unit":"%","rate":100,"fixed":2,"source":"stream","generateId":64,"selected":false},
                            {"kpiGroup":"VOLTE信令","kpiType":"信令","neType":"all","kpiFullName":"VOLTE视频接通率","kpiName":"VOLTE视频接通率","unit":"%","rate":100,"fixed":2,"source":"stream","generateId":66,"selected":false},
                            {"kpiGroup":"VOLTE信令","kpiType":"信令","neType":"all","kpiFullName":"VOLTE视频流量","kpiName":"VOLTE视频流量","unit":"MB","rate":0.0009765625,"fixed":2,"source":"stream","generateId":68,"selected":false},
                            {"kpiGroup":"VOLTE信令","kpiType":"信令","neType":"all","kpiFullName":"VOLTE语音流量","kpiName":"VOLTE语音流量","unit":"MB","rate":0.0009765625,"fixed":2,"source":"stream","generateId":71,"selected":false},
                            {"selected":false,"kpiGroup":"VOLTE信令","kpiType":"信令","neType":"all","kpiFullName":"VOLTEeSRVCC成功率","kpiName":"eSRVCC成功率","unit":"%","rate":100,"fixed":2,"source":"stream","generateId":72},
                            {"kpiGroup":"网优干扰","kpiType":"网管","neType":"2g","kpiFullName":"gsm_disturb_45_ratio","kpiName":"频带45占比","unit":"%","rate":1,"fixed":2,"source":"ws","generateId":73,"selected":false},
                            {"kpiGroup":"网优干扰","kpiType":"网管","neType":"4g","kpiFullName":"lte_disturb_highpower_ratio","kpiName":"LTE干扰高功率占比","unit":"%","rate":1,"fixed":2,"source":"ws","generateId":74,"selected":false},
                            {"generateId":75,"kpiGroup":"MASDDH","kpiType":"网管","neType":"2g","kpiFullName":"message_conn_ratio","kpiName":"短信发送成功率","unit":"%","rate":1,"fixed":2,"source":"ws","selected":false},
                            {"generateId":76,"kpiGroup":"MASDDH","kpiType":"网管","neType":"2g","kpiFullName":"message_flow","kpiName":"短信发送量","unit":"万条","rate":0.0001,"fixed":2,"source":"ws","selected":false},
                            {"selected":false,"kpiGroup":"FDD","kpiType":"信令","neType":"4g","targetIndex":1,"kpiFullName":"总用户数","kpiName":"FDD核心区域用户数","unit":"人","rate":1,"fixed":0,"source":"stream","generateId":77},
                            {"selected":false,"kpiGroup":"FDD","kpiType":"信令","neType":"4g","targetIndex":1,"kpiFullName":"总用户数","kpiName":"FDD核心区域累计用户数","unit":"人","rate":1,"fixed":0,"source":"stream_day","generateId":78},
                            {"generateId":79,"kpiGroup":"FDD","kpiType":"信令","neType":"4g","kpiFullName":"4G流量","kpiName":"FDD日累计流量","unit":"GB","rate":9.5367431640625e-7,"fixed":2,"source":"stream_day","selected":false},
                            {"selected":false,"kpiGroup":"FDD","kpiType":"信令","neType":"4g","kpiFullName":"4GHTTP成功率","kpiName":"FDD HTTP成功率","unit":"%","rate":100,"fixed":2,"source":"stream","generateId":80},
                            {"selected":false,"kpiGroup":"FDD","kpiType":"信令","neType":"4g","kpiFullName":"4GHTTP响应时延","kpiName":"FDD HTTP响应时延","unit":"ms","rate":1,"fixed":0,"source":"stream","generateId":81},
                            {"selected":false,"kpiGroup":"FDD","kpiType":"信令","neType":"4g","kpiFullName":"4G附着成功率","kpiName":"FDD 附着成功率","unit":"%","rate":100,"fixed":2,"source":"stream","generateId":82},
                            {"selected":false,"kpiGroup":"FDD","kpiType":"信令","neType":"4g","kpiFullName":"4GTCP成功率","kpiName":"FDD TCP成功率","unit":"%","rate":100,"fixed":2,"source":"stream","generateId":83},
                            {"selected":false,"kpiGroup":"FDD","kpiType":"信令","neType":"4g","kpiFullName":"4GTCP时延","kpiName":"FDD TCP时延","unit":"ms","rate":1,"fixed":0,"source":"stream","generateId":84},
                            {"selected":false,"kpiGroup":"FDD","kpiType":"信令","neType":"4g","kpiFullName":"4GTCP下行乱序率","kpiName":"FDD乱序率","unit":"%","rate":100,"fixed":2,"source":"stream","generateId":85},
                            {"selected":false,"kpiGroup":"FDD","kpiType":"信令","neType":"4g","kpiFullName":"4GTCP下行重传率","kpiName":"FDD重传率","unit":"%","rate":100,"fixed":2,"source":"stream","generateId":86},
                            {"selected":false,"kpiGroup":"FDD","kpiType":"信令","neType":"4g","kpiFullName":"VOLTEeSRVCC成功率","kpiName":"FDD eSRVCC成功率","unit":"%","rate":100,"fixed":2,"source":"stream","generateId":88},
                            {"selected":false,"kpiGroup":"FDD","kpiType":"信令","neType":"4g","kpiFullName":"VOLTEMOS值","kpiName":"FDD MOS值","unit":"","rate":1,"fixed":2,"source":"stream","generateId":89},
                            {"selected":false,"kpiGroup":"FDD","kpiType":"信令","neType":"4g","kpiFullName":"VOLTE语音接通率","kpiName":"FDD VOLTE语音接通率","unit":"%","rate":100,"fixed":2,"source":"stream","generateId":90},
                            {"selected":false,"kpiGroup":"FDD","kpiType":"信令","neType":"4g","kpiFullName":"VOLTE视频接通率","kpiName":"FDD VOLTE视频接通率","unit":"%","rate":100,"fixed":2,"source":"stream","generateId":91},
                            {"selected":false,"kpiGroup":"FDD","kpiType":"信令","neType":"4g","kpiFullName":"VOLTE注册成功率","kpiName":"FDD VOLTE注册成功率","unit":"%","rate":100,"fixed":2,"source":"stream","generateId":92},
                            {"selected":false,"kpiGroup":"TDD","kpiType":"信令","neType":"4g","targetIndex":1,"kpiFullName":"总用户数","kpiName":"TDD核心区域累计用户数","unit":"人","rate":1,"fixed":0,"source":"stream_day","generateId":98},
                            {"generateId":99,"kpiGroup":"TDD","kpiType":"信令","neType":"4g","kpiFullName":"4G流量","kpiName":"TDD日累计流量","unit":"GB","rate":9.5367431640625e-7,"fixed":2,"source":"stream_day","selected":false},
                            {"selected":false,"kpiGroup":"TDD","kpiType":"信令","neType":"4g","kpiFullName":"4GHTTP成功率","kpiName":"TDD HTTP成功率","unit":"%","rate":100,"fixed":2,"source":"stream","generateId":104},
                            {"selected":false,"kpiGroup":"TDD","kpiType":"信令","neType":"4g","kpiFullName":"4GHTTP响应时延","kpiName":"TDD HTTP响应时延","unit":"ms","rate":1,"fixed":0,"source":"stream","generateId":105},
                            {"selected":false,"kpiGroup":"TDD","kpiType":"信令","neType":"4g","kpiFullName":"4G附着成功率","kpiName":"TDD 附着成功率","unit":"%","rate":100,"fixed":2,"source":"stream","generateId":106},
                            {"selected":false,"kpiGroup":"TDD","kpiType":"信令","neType":"4g","kpiFullName":"4GTCP成功率","kpiName":"TDD TCP成功率","unit":"%","rate":100,"fixed":2,"source":"stream","generateId":107},
                            {"selected":false,"kpiGroup":"TDD","kpiType":"信令","neType":"4g","kpiFullName":"4GTCP时延","kpiName":"TDD TCP时延","unit":"ms","rate":1,"fixed":0,"source":"stream","generateId":108},
                            {"selected":false,"kpiGroup":"TDD","kpiType":"信令","neType":"4g","kpiFullName":"4GTCP下行乱序率","kpiName":"TDD乱序率","unit":"%","rate":100,"fixed":2,"source":"stream","generateId":109},
                            {"selected":false,"kpiGroup":"TDD","kpiType":"信令","neType":"4g","kpiFullName":"4GTCP下行重传率","kpiName":"TDD重传率","unit":"%","rate":100,"fixed":2,"source":"stream","generateId":110},
                            {"selected":false,"kpiGroup":"TDD","kpiType":"信令","neType":"4g","kpiFullName":"VOLTE呼叫建立时延","kpiName":"TDD VOLTE呼叫建立时延","unit":"ms","rate":1,"fixed":0,"source":"stream","generateId":111},
                            {"selected":false,"kpiGroup":"TDD","kpiType":"信令","neType":"4g","kpiFullName":"VOLTEeSRVCC成功率","kpiName":"TDD eSRVCC成功率","unit":"%","rate":100,"fixed":2,"source":"stream","generateId":112},
                            {"selected":false,"kpiGroup":"TDD","kpiType":"信令","neType":"4g","kpiFullName":"VOLTE语音接通率","kpiName":"TDD VOLTE语音接通率","unit":"%","rate":100,"fixed":2,"source":"stream","generateId":114},
                            {"selected":false,"kpiGroup":"TDD","kpiType":"信令","neType":"4g","kpiFullName":"VOLTE视频接通率","kpiName":"TDD VOLTE视频接通率","unit":"%","rate":100,"fixed":2,"source":"stream","generateId":115},
                            {"selected":false,"kpiGroup":"TDD","kpiType":"信令","neType":"4g","kpiFullName":"VOLTE注册成功率","kpiName":"TDD VOLTE注册成功率","unit":"%","rate":100,"fixed":2,"source":"stream","generateId":116},
                            {"generateId":117,"kpiGroup":"TDD","kpiType":"信令","neType":"4g","kpiFullName":"4G用户数","kpiName":"TDD用户数","unit":"人","rate":1,"fixed":0,"source":"stream","selected":false}
                            ];

//网管数据新数据源指标
LSMConsts.wsNew={
		  "gsm_teletraffic": true,
		  "gsm_flow_all": true,
		  "tchhalftraf": true,
		  "gsm_conn_ratio": true,
		  "seizednbrsdcch": true,
		  "attnbrsdcch": true,
		  "seizenbrtchnho": true,
		  "attnbrtchnho": true,
		  "gsm_wireless_conn_ratio": true,
		  "ovflnbrtchnho": true,
		  "ovlfnbrsdcch": true,
		  "gsm_ul_tbf_succ_ratio": true,
		  "succnbrultbf": true,
		  "attnbrultbf": true,
		  "gsm_disturb_45_ratio": true,
		  "gsm_disturb_45_ratio_fz": true,
		  "gsm_disturb_45_ratio_fm": true,
		  "gsm_wireless_use_ratio": true,
		  "volte_voice_teletraffic": true,
		  "volte_video_teletraffic": true,
		  "lte_flow_all": true,
		  "lte_flow_ul": true,
		  "lte_flow_dl": true,
		  "lte_wireless_conn_ratio": true,
		  "succconnestab": true,
		  "attconnestab": true,
		  "nbrsuccestab": true,
		  "nbrattestab": true,
		  "rrc_rate": true,
		  "erab_rate": true,
		  "lte_wireless_drop_ratio": true,
		  "attrelenb": true,
		  "attrelenbnormal": true,
		  "succinitalsetup": true,
		  "nbrleft_context": true,
		  "lte_sw_succ_ratio": true,
		  "succoutinterenbs1": true,
		  "succoutinterenbx2": true,
		  "succoutintraenb": true,
		  "attoutinterenbs1": true,
		  "attoutinterenbx2": true,
		  "attoutintraenb": true,
		  "volte_voice_conn_ratio": true,
		  "nbrsuccestab_1": true,
		  "nbrattestab_1": true,
		  "volte_video_conn_ratio": true,
		  "nbrsuccestab_2": true,
		  "nbrattestab_2": true,
		  "volte_voice_erab_drop_ratio": true,
		  "nbrreqrelenb_1": true,
		  "nbrreqrelenb_normal_1": true,
		  "hofail_1": true,
		  "volte_video_erab_drop_ratio": true,
		  "nbrreqrelenb_2": true,
		  "nbrreqrelenb_normal_2": true,
		  "hofail_2": true,
		  "volte_sw_succ_ratio": true,
		  "succoutinterenbs1_1": true,
		  "succoutinterenbx2_1": true,
		  "succoutintraenb_1": true,
		  "attoutinterenbs1_1": true,
		  "attoutinterenbx2_1": true,
		  "attoutintraenb_1": true,
		  "lte_avg_cqi": true,
		  "lte_avg_cqi_fz": true,
		  "lte_avg_cqi_fm": true,
		  "lte_ul_prb_use_ratio": true,
		  "rru_puschprbassn": true,
		  "rru_puschprbtot": true,
		  "lte_dl_prb_use_ratio": true,
		  "rru_pdschprbassn": true,
		  "rru_pdschprbtot": true,
		  "lte_ul_prb_avg_use_ratio": true,
		  "prbtotul": true,
		  "puschprbmeantot": true,
		  "lte_dl_prb_avg_use_ratio": true,
		  "prbtotdl": true,
		  "pdschprbmeantot": true,
		  "lte_disturb_highpower_ratio": true,
		  "lte_disturb_highpower_ratio_fz": true,
		  "lte_disturb_highpower_ratio_fm": true,
		  "lte_ul_user_avg_rate": true,
		  "thrptimeul": true,
		  "lte_dl_user_avg_rate": true,
		  "thrptimedl": true,
		  "nbrleft_1": true,
		  "nbrleft_2": true,
		  "nbrhoinc_1": true,
		  "nbrhoinc_2": true,
		  "volte_wireless_drop_ratio_cell": true,
		  "message_conn_ratio": true,
		  "message_flow": true
		};
/** 区域详情表格列配置 areaGridColConfig_hotspot_signal 全部 areaGridColConfig_hotspot_signal_show 呈现部分*/
LSMConsts.hotspotSigId="areaGridColConfig_hotspot_signal";
LSMConsts.hotspotNetId="areaGridColConfig_hotspot_net";

LSMConsts.cell2gSigId="areaGridColConfig_cell2g_signal";
LSMConsts.cell2gNetId="areaGridColConfig_cell2g_net";

LSMConsts.cell3gSigId="areaGridColConfig_cell3g_signal";
LSMConsts.cell3gNetId="areaGridColConfig_cell3g_net";

LSMConsts.cell4gSigId="areaGridColConfig_cell4g_signal";
LSMConsts.cell4gNetId="areaGridColConfig_cell4g_net";

//地铁
LSMConsts.metroHotspotSigId="metroGridColConfig_hotspot_signal";
LSMConsts.metroHotspotNetId="metroGridColConfig_hotspot_net";

LSMConsts.metroCell2gSigId="metroGridColConfig_cell2g_signal";
LSMConsts.metroCell2gNetId="metroGridColConfig_cell2g_net";

LSMConsts.metroCell3gSigId="metroGridColConfig_cell3g_signal";
LSMConsts.metroCell3gNetId="metroGridColConfig_cell3g_net";

LSMConsts.metroCell4gSigId="metroGridColConfig_cell4g_signal";
LSMConsts.metroCell4gNetId="metroGridColConfig_cell4g_net";

/**区域详情表格指标*/
LSMConsts.kpis=
[
 //信令 默认前10  用户数、4G用户数、总流量、4G流量、下载速率、TCP成功率、TCP时延、HTTP成功率、HTTP时延、附着成功率
	{kpiType:LSMConsts.kpiTypeSig,neType:"all",kpiFullName:"总用户数", kpiName:"用户数",unit:"人", rate:1, fixed:0,source:LSMConsts.kpiSourceStream},
	{kpiType:LSMConsts.kpiTypeSig,neType:"all",kpiFullName:"总流量", kpiName:"总流量",unit:"MB", rate:1/LSMConsts.byteDivider, fixed:2,source:LSMConsts.kpiSourceStream},
	{kpiType:LSMConsts.kpiTypeSig,neType:"4g",kpiFullName:"4G流量", kpiName:"4G流量",unit:"MB", rate:1/LSMConsts.byteDivider, fixed:2,source:LSMConsts.kpiSourceStream},
	{kpiType:LSMConsts.kpiTypeSig,neType:"4g",kpiFullName:"4G下行速率500k", kpiName:"下载速率",unit:"Kbps", rate:1, fixed:2,source:LSMConsts.kpiSourceStream},
	{kpiType:LSMConsts.kpiTypeSig,neType:"4g",kpiFullName:"4GTCP成功率", kpiName:"TCP成功率",unit:"%", rate:100, fixed:2,source:LSMConsts.kpiSourceStream},
	{kpiType:LSMConsts.kpiTypeSig,neType:"4g",kpiFullName:"4GTCP时延", kpiName:"TCP时延",unit:"ms", rate:1, fixed:0,source:LSMConsts.kpiSourceStream,ymax:1000},
	{kpiType:LSMConsts.kpiTypeSig,neType:"4g",kpiFullName:"4GHTTP成功率", kpiName:"HTTP成功率",unit:"%", rate:100, fixed:2,source:LSMConsts.kpiSourceStream},
	{kpiType:LSMConsts.kpiTypeSig,neType:"4g",kpiFullName:"4GHTTP时延", kpiName:"HTTP时延",unit:"ms", rate:1, fixed:0,source:LSMConsts.kpiSourceStream,ymax:1000},
	{kpiType:LSMConsts.kpiTypeSig,neType:"4g",kpiFullName:"4G附着成功率", kpiName:"附着成功率",unit:"%", rate:100, fixed:2,source:LSMConsts.kpiSourceStream},
//其他	 
	{kpiType:LSMConsts.kpiTypeSig,neType:"4g",kpiFullName:"4GHTTP响应成功率", kpiName:"HTTP响应成功率",unit:"%", rate:100, fixed:2,source:LSMConsts.kpiSourceStream},
	{kpiType:LSMConsts.kpiTypeSig,neType:"4g",kpiFullName:"4GHTTP响应时延", kpiName:"HTTP响应时延",unit:"ms", rate:1, fixed:0,source:LSMConsts.kpiSourceStream},
	{kpiType:LSMConsts.kpiTypeSig,neType:"4g",kpiFullName:"4G上行速率500k", kpiName:"上行速率",unit:"Kbps", rate:1, fixed:2,source:LSMConsts.kpiSourceStream},
	{kpiType:LSMConsts.kpiTypeSig,neType:"4g",kpiFullName:"4GTCP第二、三次握手成功率", kpiName:"TCP第二、三次握手成功率",unit:"%", rate:100, fixed:2,source:LSMConsts.kpiSourceStream},
	{kpiType:LSMConsts.kpiTypeSig,neType:"4g",kpiFullName:"4GTCP掉线率", kpiName:"TCP掉线率",unit:"%", rate:100, fixed:2,source:LSMConsts.kpiSourceStream},
	{kpiType:LSMConsts.kpiTypeSig,neType:"4g",kpiFullName:"4GTCP上行乱序率", kpiName:"TCP上行乱序率",unit:"%", rate:100, fixed:2,source:LSMConsts.kpiSourceStream},
	{kpiType:LSMConsts.kpiTypeSig,neType:"4g",kpiFullName:"4GTCP上行重传率", kpiName:"TCP上行重传率",unit:"%", rate:100, fixed:2,source:LSMConsts.kpiSourceStream},
	{kpiType:LSMConsts.kpiTypeSig,neType:"4g",kpiFullName:"4GTCP下行乱序率", kpiName:"TCP下行乱序率",unit:"%", rate:100, fixed:2,source:LSMConsts.kpiSourceStream},
	{kpiType:LSMConsts.kpiTypeSig,neType:"4g",kpiFullName:"4GTCP下行重传率", kpiName:"TCP下行重传率",unit:"%", rate:100, fixed:2,source:LSMConsts.kpiSourceStream},

//其他不呈现于配置界面的指标
	{ignoreInConfig:true,kpiType:LSMConsts.kpiTypeSig,neType:"3g",kpiFullName:"3G流量", kpiName:"3G流量",unit:"MB", rate:1/LSMConsts.byteDivider, fixed:2,source:LSMConsts.kpiSourceStream},
	{ignoreInConfig:true,kpiType:LSMConsts.kpiTypeSig,neType:"3g",kpiFullName:"3G下行速率500k", kpiName:"下载速率",unit:"Kbps", rate:1, fixed:2,source:LSMConsts.kpiSourceStream},
	{ignoreInConfig:true,kpiType:LSMConsts.kpiTypeSig,neType:"3g",kpiFullName:"3GTCP成功率", kpiName:"TCP成功率",unit:"%", rate:100, fixed:2,source:LSMConsts.kpiSourceStream},
	{ignoreInConfig:true,kpiType:LSMConsts.kpiTypeSig,neType:"3g",kpiFullName:"3GTCP时延", kpiName:"TCP时延",unit:"ms", rate:1, fixed:0,source:LSMConsts.kpiSourceStream,ymax:1000},
	{ignoreInConfig:true,kpiType:LSMConsts.kpiTypeSig,neType:"3g",kpiFullName:"3GHTTP成功率", kpiName:"HTTP成功率",unit:"%", rate:100, fixed:2,source:LSMConsts.kpiSourceStream},
	{ignoreInConfig:true,kpiType:LSMConsts.kpiTypeSig,neType:"3g",kpiFullName:"3GHTTP时延", kpiName:"HTTP时延",unit:"ms", rate:1, fixed:0,source:LSMConsts.kpiSourceStream,ymax:1000},
	{ignoreInConfig:true,kpiType:LSMConsts.kpiTypeSig,neType:"3g",kpiFullName:"3G附着成功率", kpiName:"附着成功率",unit:"%", rate:100, fixed:2,source:LSMConsts.kpiSourceStream},
	{ignoreInConfig:true,kpiType:LSMConsts.kpiTypeSig,neType:"3g",kpiFullName:"3GHTTP响应成功率", kpiName:"HTTP响应成功率",unit:"%", rate:100, fixed:2,source:LSMConsts.kpiSourceStream},
	{ignoreInConfig:true,kpiType:LSMConsts.kpiTypeSig,neType:"3g",kpiFullName:"3GHTTP响应时延", kpiName:"HTTP响应时延",unit:"ms", rate:1, fixed:0,source:LSMConsts.kpiSourceStream},
	{ignoreInConfig:true,kpiType:LSMConsts.kpiTypeSig,neType:"3g",kpiFullName:"3G上行速率500k", kpiName:"上行速率",unit:"Kbps", rate:1, fixed:2,source:LSMConsts.kpiSourceStream},
	{ignoreInConfig:true,kpiType:LSMConsts.kpiTypeSig,neType:"3g",kpiFullName:"3GTCP第二、三次握手成功率", kpiName:"TCP第二、三次握手成功率",unit:"%", rate:100, fixed:2,source:LSMConsts.kpiSourceStream},
	{ignoreInConfig:true,kpiType:LSMConsts.kpiTypeSig,neType:"3g",kpiFullName:"3GTCP掉线率", kpiName:"TCP掉线率",unit:"%", rate:100, fixed:2,source:LSMConsts.kpiSourceStream},
	{ignoreInConfig:true,kpiType:LSMConsts.kpiTypeSig,neType:"3g",kpiFullName:"3GTCP上行乱序率", kpiName:"TCP上行乱序率",unit:"%", rate:100, fixed:2,source:LSMConsts.kpiSourceStream},
	{ignoreInConfig:true,kpiType:LSMConsts.kpiTypeSig,neType:"3g",kpiFullName:"3GTCP上行重传率", kpiName:"TCP上行重传率",unit:"%", rate:100, fixed:2,source:LSMConsts.kpiSourceStream},
	{ignoreInConfig:true,kpiType:LSMConsts.kpiTypeSig,neType:"3g",kpiFullName:"3GTCP下行乱序率", kpiName:"TCP下行乱序率",unit:"%", rate:100, fixed:2,source:LSMConsts.kpiSourceStream},
	{ignoreInConfig:true,kpiType:LSMConsts.kpiTypeSig,neType:"3g",kpiFullName:"3GTCP下行重传率", kpiName:"TCP下行重传率",unit:"%", rate:100, fixed:2,source:LSMConsts.kpiSourceStream},

	{ignoreInConfig:true,kpiType:LSMConsts.kpiTypeSig,neType:"2g",kpiFullName:"2G流量", kpiName:"2G流量",unit:"MB", rate:1/LSMConsts.byteDivider, fixed:2,source:LSMConsts.kpiSourceStream},
	{ignoreInConfig:true,kpiType:LSMConsts.kpiTypeSig,neType:"2g",kpiFullName:"2G下行速率500k", kpiName:"下载速率",unit:"Kbps", rate:1, fixed:2,source:LSMConsts.kpiSourceStream},
	{ignoreInConfig:true,kpiType:LSMConsts.kpiTypeSig,neType:"2g",kpiFullName:"2GTCP成功率", kpiName:"TCP成功率",unit:"%", rate:100, fixed:2,source:LSMConsts.kpiSourceStream},
	{ignoreInConfig:true,kpiType:LSMConsts.kpiTypeSig,neType:"2g",kpiFullName:"2GTCP时延", kpiName:"TCP时延",unit:"ms", rate:1, fixed:0,source:LSMConsts.kpiSourceStream,ymax:1000},
	{ignoreInConfig:true,kpiType:LSMConsts.kpiTypeSig,neType:"2g",kpiFullName:"2GHTTP成功率", kpiName:"HTTP成功率",unit:"%", rate:100, fixed:2,source:LSMConsts.kpiSourceStream},
	{ignoreInConfig:true,kpiType:LSMConsts.kpiTypeSig,neType:"2g",kpiFullName:"2GHTTP时延", kpiName:"HTTP时延",unit:"ms", rate:1, fixed:0,source:LSMConsts.kpiSourceStream,ymax:1000},
	{ignoreInConfig:true,kpiType:LSMConsts.kpiTypeSig,neType:"2g",kpiFullName:"2G附着成功率", kpiName:"附着成功率",unit:"%", rate:100, fixed:2,source:LSMConsts.kpiSourceStream},
	{ignoreInConfig:true,kpiType:LSMConsts.kpiTypeSig,neType:"2g",kpiFullName:"2GHTTP响应成功率", kpiName:"HTTP响应成功率",unit:"%", rate:100, fixed:2,source:LSMConsts.kpiSourceStream},
	{ignoreInConfig:true,kpiType:LSMConsts.kpiTypeSig,neType:"2g",kpiFullName:"2GHTTP响应时延", kpiName:"HTTP响应时延",unit:"ms", rate:1, fixed:0,source:LSMConsts.kpiSourceStream},
	{ignoreInConfig:true,kpiType:LSMConsts.kpiTypeSig,neType:"2g",kpiFullName:"2G上行速率500k", kpiName:"上行速率",unit:"Kbps", rate:1, fixed:2,source:LSMConsts.kpiSourceStream},
	{ignoreInConfig:true,kpiType:LSMConsts.kpiTypeSig,neType:"2g",kpiFullName:"2GTCP第二、三次握手成功率", kpiName:"TCP第二、三次握手成功率",unit:"%", rate:100, fixed:2,source:LSMConsts.kpiSourceStream},
	{ignoreInConfig:true,kpiType:LSMConsts.kpiTypeSig,neType:"2g",kpiFullName:"2GTCP掉线率", kpiName:"TCP掉线率",unit:"%", rate:100, fixed:2,source:LSMConsts.kpiSourceStream},
	{ignoreInConfig:true,kpiType:LSMConsts.kpiTypeSig,neType:"2g",kpiFullName:"2GTCP上行乱序率", kpiName:"TCP上行乱序率",unit:"%", rate:100, fixed:2,source:LSMConsts.kpiSourceStream},
	{ignoreInConfig:true,kpiType:LSMConsts.kpiTypeSig,neType:"2g",kpiFullName:"2GTCP上行重传率", kpiName:"TCP上行重传率",unit:"%", rate:100, fixed:2,source:LSMConsts.kpiSourceStream},
	{ignoreInConfig:true,kpiType:LSMConsts.kpiTypeSig,neType:"2g",kpiFullName:"2GTCP下行乱序率", kpiName:"TCP下行乱序率",unit:"%", rate:100, fixed:2,source:LSMConsts.kpiSourceStream},
	{ignoreInConfig:true,kpiType:LSMConsts.kpiTypeSig,neType:"2g",kpiFullName:"2GTCP下行重传率", kpiName:"TCP下行重传率",unit:"%", rate:100, fixed:2,source:LSMConsts.kpiSourceStream},

//网管 默认前10 话务量、总流量、LTE流量、LTE接通率、TD语音接通率、2G无线接通率、TD数据接通率、2G TBF建立成功率 
	{kpiType:LSMConsts.kpiTypeNet,neType:"all",kpiFullName:"gsm_teletraffic,volte_voice_teletraffic,volte_video_teletraffic", kpiName:"话务量",unit:"Erl", rate:1, fixed:2,source:LSMConsts.kpiSourceWs},//黄文接口 话务量特殊处理 求和
	{kpiType:LSMConsts.kpiTypeNet,neType:"all",kpiFullName:"gsm_flow_all,lte_flow_all", kpiName:"总流量",unit:"MB", rate:1, fixed:2,source:LSMConsts.kpiSourceWs},
	{kpiType:LSMConsts.kpiTypeNet,neType:"4g",kpiFullName:"lte_flow_all", kpiName:"LTE流量",unit:"MB", rate:1, fixed:2,source:LSMConsts.kpiSourceWs},
	{kpiType:LSMConsts.kpiTypeNet,neType:"4g",kpiFullName:"lte_wireless_conn_ratio", kpiName:"LTE接通率",unit:"%", rate:1, fixed:2,source:LSMConsts.kpiSourceWs},
	{kpiType:LSMConsts.kpiTypeNet,neType:"4g",kpiFullName:"erab_rate", kpiName:"ERAB连接成功率",unit:"%", rate:1, fixed:2,source:LSMConsts.kpiSourceWs},
	{kpiType:LSMConsts.kpiTypeNet,neType:"4g",kpiFullName:"lte_sw_succ_ratio", kpiName:"LTE切换成功率",unit:"%", rate:1, fixed:2,source:LSMConsts.kpiSourceWs},
	
	{kpiType:LSMConsts.kpiTypeNet,neType:"2g",kpiFullName:"gsm_teletraffic", kpiName:"2G话务量",unit:"Erl", rate:1, fixed:2,source:LSMConsts.kpiSourceWs},//黄文接口
	 
	{kpiType:LSMConsts.kpiTypeNet,neType:"2g",kpiFullName:"gsm_wireless_conn_ratio", kpiName:"GSM无线接通率",unit:"%", rate:1, fixed:2,source:LSMConsts.kpiSourceWs},
	{kpiType:LSMConsts.kpiTypeNet,neType:"2g",kpiFullName:"gsm_flow_all", kpiName:"GSM流量",unit:"MB", rate:1, fixed:2,source:LSMConsts.kpiSourceWs},//黄文接口
	{kpiType:LSMConsts.kpiTypeNet,neType:"2g",kpiFullName:"gsm_wireless_use_ratio", kpiName:"GSM无线利用率",unit:"%", rate:1, fixed:2,source:LSMConsts.kpiSourceWs},
	{kpiType:LSMConsts.kpiTypeNet,neType:"2g",kpiFullName:"gsm_ul_tbf_succ_ratio", kpiName:"2G 上行TBF建立成功率",unit:"%", rate:1, fixed:2,source:LSMConsts.kpiSourceWs},
	
	
	{kpiType:LSMConsts.kpiTypeNet,neType:"4g",kpiFullName:"rrc_rate", kpiName:"RRC连接成功率",unit:"%", rate:1, fixed:2,source:LSMConsts.kpiSourceWs},
	{kpiType:LSMConsts.kpiTypeNet,neType:"4g",kpiFullName:"lte_ul_prb_use_ratio", kpiName:"上行PRB利用率",unit:"%", rate:1, fixed:2,source:LSMConsts.kpiSourceWs},
	{kpiType:LSMConsts.kpiTypeNet,neType:"4g",kpiFullName:"lte_dl_prb_use_ratio", kpiName:"下行PRB利用率",unit:"%", rate:1, fixed:2,source:LSMConsts.kpiSourceWs},
	 
	//干扰
	{kpiGroup:LSMConsts.kpiGroup7,kpiType:LSMConsts.kpiTypeNet,neType:"all",kpiFullName:"gsm_disturb_45_ratio", kpiName:"频带45占比",unit:"%", rate:1, fixed:2,source:LSMConsts.kpiSourceWs},
	{kpiGroup:LSMConsts.kpiGroup7,kpiType:LSMConsts.kpiTypeNet,neType:"all",kpiFullName:"lte_disturb_highpower_ratio", kpiName:"LTE干扰高功率占比",unit:"%", rate:1, fixed:2,source:LSMConsts.kpiSourceWs},
//累计指标
	{ignoreInConfig:true,kpiType:LSMConsts.kpiTypeSig,kpiFullName:"总用户数", kpiName:"累计用户数",unit:"人", rate:1, fixed:0,source:LSMConsts.kpiSourceStreamDay},//娄瑶佳接口 日累计
	{ignoreInConfig:true,kpiType:LSMConsts.kpiTypeSig,kpiFullName:"总流量", kpiName:"累计流量",unit:"MB", rate:1/LSMConsts.byteDivider, fixed:2,source:LSMConsts.kpiSourceStreamDay},//娄瑶佳接口 日累计
	
	{kpiGroup:LSMConsts.kpiGroup6,kpiType:LSMConsts.kpiTypeSig,neType:"all",kpiFullName:"VOLTE视频流量", kpiName:"VOLTE视频流量",unit:"MB", rate:1/LSMConsts.byteDivider, fixed:2,source:LSMConsts.kpiSourceStream},
	{kpiGroup:LSMConsts.kpiGroup6,kpiType:LSMConsts.kpiTypeSig,neType:"all",kpiFullName:"VOLTE语音流量", kpiName:"VOLTE语音流量",unit:"MB", rate:1/LSMConsts.byteDivider, fixed:2,source:LSMConsts.kpiSourceStream},
	{kpiGroup:LSMConsts.kpiGroup6,kpiType:LSMConsts.kpiTypeSig,neType:"all",kpiFullName:"VOLTE注册成功率", kpiName:"VOLTE注册成功率",unit:"%", rate:100, fixed:2,source:LSMConsts.kpiSourceStream},
	{kpiGroup:LSMConsts.kpiGroup6,kpiType:LSMConsts.kpiTypeSig,neType:"all",kpiFullName:"VOLTE用户数", kpiName:"VOLTE用户数",unit:"人", rate:1, fixed:0,source:LSMConsts.kpiSourceStream},
	{kpiGroup:LSMConsts.kpiGroup6,kpiType:LSMConsts.kpiTypeSig,neType:"all",kpiFullName:"VOLTEeSRVCC成功率", kpiName:"eSRVCC成功率",unit:"%", rate:100, fixed:2,source:LSMConsts.kpiSourceStream},
	{kpiGroup:LSMConsts.kpiGroup6,kpiType:LSMConsts.kpiTypeSig,neType:"all",kpiFullName:"VOLTE呼叫建立时延", kpiName:"VOLTE呼叫建立时延",unit:"ms", rate:1, fixed:0,source:LSMConsts.kpiSourceStream},
	{kpiGroup:LSMConsts.kpiGroup6,kpiType:LSMConsts.kpiTypeSig,neType:"all",kpiFullName:"VOLTE语音接通率", kpiName:"VOLTE语音接通率",unit:"%", rate:100, fixed:2,source:LSMConsts.kpiSourceStream},
	{kpiGroup:LSMConsts.kpiGroup6,kpiType:LSMConsts.kpiTypeSig,neType:"all",kpiFullName:"VOLTE视频接通率", kpiName:"VOLTE视频接通率",unit:"%", rate:100, fixed:2,source:LSMConsts.kpiSourceStream},
	{kpiGroup:LSMConsts.kpiGroup6,kpiType:LSMConsts.kpiTypeSig,neType:"all",kpiFullName:"VOLTEMOS值", kpiName:"MOS值",unit:"", rate:1, fixed:2,source:LSMConsts.kpiSourceStream}
];

LSMConsts.videoKpis=[
 {icon:"user",name:"用户数",key:"4G用户数",unit:"万人",rate:1/10000,fixed:1,ymin:0,ymax:null,source:"用户数"},
 {icon:"flow",name:"流量",key:"4G流量",unit:"GB",rate:1/1024/1024,fixed:1,ymin:0,ymax:null,source:"网络质量"},
 {icon:"dlspeed",name:"下载速率",key:"4G下行速率500k",unit:"Kbps",rate:1,fixed:0,ymin:0,ymax:null,source:"网络质量"},
 {icon:"selfprovince",name:"本省率",key:"4G本省率",unit:"%",rate:100,fixed:1,ymin:0,ymax:100,source:"网络质量"},
 {icon:"selfnet",name:"本网率",key:"4G本网率",unit:"%",rate:100,fixed:1,ymin:0,ymax:100,source:"网络质量"},
 
 {icon:"play_succ",name:"播放成功率",key:"4G视频播放成功率",unit:"%",rate:100,fixed:2,ymin:0,ymax:100,source:"网络质量",videoOnly:true},
 {icon:"play_delay",name:"播放时延 ",key:"4G视频播放时延",unit:"ms",rate:1,fixed:0,ymin:0,ymax:null,source:"网络质量",videoOnly:true},
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

LSMConsts.videoKpis2=[//排除本网率 本省率
                     {icon:"user",id:"user_count",name:"用户数",key:"4G用户数",unit:"万人",rate:1/10000,fixed:1,ymin:0,ymax:null,source:"用户数"},
                     {icon:"flow",id:"all_bytes",name:"流量",key:"4G流量",unit:"GB",rate:1/1024/1024,fixed:1,ymin:0,ymax:null,source:"网络质量"},
                     {icon:"dlspeed",id:"dl_rate",name:"下载速率",key:"4G下行速率500k",unit:"Kbps",rate:1,fixed:0,ymin:0,ymax:null,source:"网络质量"},
                     
                     {icon:"play_succ",id:"kqi_rstp_req_succrate",name:"播放成功率",key:"4G视频播放成功率",unit:"%",rate:100,fixed:2,ymin:0,ymax:100,source:"网络质量",videoOnly:true},
                     {icon:"play_delay",id:"kqi_rstp_req_wait_dur",name:"播放时延 ",key:"4G视频播放时延",unit:"ms",rate:1,fixed:0,ymin:0,ymax:null,source:"网络质量",videoOnly:true},
                     {icon:"tcp_succ",id:"tcpESTABSuccRate",name:"TCP成功率 ",key:"4GTCP成功率",unit:"%",rate:100,fixed:2,ymin:0,ymax:100,source:"网络质量"},
                     {icon:"tcp_delay",id:"tcpESTABDur",name:"TCP时延 ",key:"4GTCP时延",unit:"ms",rate:1,fixed:0,ymin:0,ymax:null,source:"网络质量"},
                     {icon:"http_succ",name:"HTTP请求成功率",key:"4GHTTP成功率",unit:"%",rate:100,fixed:2,ymin:0,ymax:100,source:"网络质量"},
                     
                     {icon:"tcp_shake_succ",id:"tcp12HandSuccRate",name:"TCP一二次握手成功率 ",key:"4GTCP第一、二次握手成功率",unit:"%",rate:100,fixed:2,ymin:0,ymax:100,source:"网络质量"},
                     {icon:"tcp_shake_delay",id:"tcp12HandDur",name:"TCP一二次握手时延 ",key:"4GTCP第一、二次握手时延",unit:"ms",rate:1,fixed:0,ymin:0,ymax:null,source:"网络质量"},
                     {icon:"tcp_shake_succ",id:"tcp23HandSuccRate",name:"TCP二三次握手成功率",key:"4GTCP第二、三次握手成功率",unit:"%",rate:100,fixed:2,ymin:0,ymax:100,source:"网络质量"},
                     {icon:"tcp_shake_delay",id:"tcp23_hand_delay",name:"TCP二三次握手时延",key:"4GTCP第二、三次握手时延",unit:"ms",rate:1,fixed:0,ymin:0,ymax:null,source:"网络质量"},
                     {icon:"tcp_up_re",id:"tcp_retran_ul_rate",name:"TCP上行重传率",key:"4GTCP上行重传率",unit:"%",rate:100,fixed:2,ymin:0,ymax:100,source:"网络质量"},
                     
                     {icon:"tcp_down_re",id:"tcp_retran_dl_rate",name:"TCP下行重传率",key:"4GTCP下行重传率",unit:"%",rate:100,fixed:2,ymin:0,ymax:100,source:"网络质量"},
                     {icon:"tcp_up_disorder",id:"tcp_outoforder_ul_rate",name:"TCP上行乱序率",key:"4GTCP上行乱序率",unit:"%",rate:100,fixed:2,ymin:0,ymax:100,source:"网络质量"},
                     {icon:"tcp_down_disorder",id:"tcp_outoforder_dl_rate",name:"TCP下行乱序率",key:"4GTCP下行乱序率",unit:"%",rate:100,fixed:2,ymin:0,ymax:100,source:"网络质量"},
//                     {icon:"user_permeate",name:"用户渗透率",key:"4G用户渗透率",unit:"%",rate:100,fixed:2,ymin:0,ymax:100,source:"网络质量"},
                     {icon:"allbus_percent",id:"flow_rate",name:"全网业务占比",key:"4G全网业务占比",unit:"%",rate:100,fixed:2,ymin:0,ymax:100,source:"网络质量"}
                     ];
LSMConsts.videoKpis2_2=[//排除本网率 本省率 陈晨接口 没有用户渗透率
                      {icon:"user",id:"user_count",name:"用户数",key:"4G用户数",unit:"万人",rate:1,fixed:1,ymin:0,ymax:null,source:"用户数"},
                      {icon:"flow",id:"all_bytes",name:"流量",key:"4G流量",unit:"GB",rate:1,fixed:1,ymin:0,ymax:null,source:"网络质量"},
                      {icon:"dlspeed",id:"dl_rate",name:"下载速率",key:"4G下行速率500k",unit:"Kbps",rate:1,fixed:0,ymin:0,ymax:null,source:"网络质量"},
                      
                      {icon:"play_succ",id:"kqi_rstp_req_succrate",name:"播放成功率",key:"4G视频播放成功率",unit:"%",rate:1,fixed:2,ymin:0,ymax:100,source:"网络质量",videoOnly:true},
                      {icon:"play_delay",id:"kqi_rstp_req_wait_dur",name:"播放时延 ",key:"4G视频播放时延",unit:"ms",rate:1,fixed:0,ymin:0,ymax:null,source:"网络质量",videoOnly:true},
                      {icon:"tcp_succ",id:"tcpESTABSuccRate",name:"TCP成功率 ",key:"4GTCP成功率",unit:"%",rate:1,fixed:2,ymin:0,ymax:100,source:"网络质量"},
                      {icon:"tcp_delay",id:"tcpESTABDur",name:"TCP时延 ",key:"4GTCP时延",unit:"ms",rate:1,fixed:0,ymin:0,ymax:null,source:"网络质量"},
                      {icon:"http_succ",name:"HTTP请求成功率",key:"4GHTTP成功率",unit:"%",rate:1,fixed:2,ymin:0,ymax:100,source:"网络质量"},
                      
                      {icon:"tcp_shake_succ",id:"tcp12HandSuccRate",name:"TCP一二次握手成功率 ",key:"4GTCP第一、二次握手成功率",unit:"%",rate:1,fixed:2,ymin:0,ymax:100,source:"网络质量"},
                      {icon:"tcp_shake_delay",id:"tcp12HandDur",name:"TCP一二次握手时延 ",key:"4GTCP第一、二次握手时延",unit:"ms",rate:1,fixed:0,ymin:0,ymax:null,source:"网络质量"},
                      {icon:"tcp_shake_succ",id:"tcp23HandSuccRate",name:"TCP二三次握手成功率",key:"4GTCP第二、三次握手成功率",unit:"%",rate:1,fixed:2,ymin:0,ymax:100,source:"网络质量"},
                      {icon:"tcp_shake_delay",id:"tcp23_hand_delay",name:"TCP二三次握手时延",key:"4GTCP第二、三次握手时延",unit:"ms",rate:1,fixed:0,ymin:0,ymax:null,source:"网络质量"},
                      {icon:"tcp_up_re",id:"tcp_retran_ul_rate",name:"TCP上行重传率",key:"4GTCP上行重传率",unit:"%",rate:1,fixed:2,ymin:0,ymax:100,source:"网络质量"},
                      
                      {icon:"tcp_down_re",id:"tcp_retran_dl_rate",name:"TCP下行重传率",key:"4GTCP下行重传率",unit:"%",rate:1,fixed:2,ymin:0,ymax:100,source:"网络质量"},
                      {icon:"tcp_up_disorder",id:"tcp_outoforder_ul_rate",name:"TCP上行乱序率",key:"4GTCP上行乱序率",unit:"%",rate:1,fixed:2,ymin:0,ymax:100,source:"网络质量"},
                      {icon:"tcp_down_disorder",id:"tcp_outoforder_dl_rate",name:"TCP下行乱序率",key:"4GTCP下行乱序率",unit:"%",rate:1,fixed:2,ymin:0,ymax:100,source:"网络质量"},
                      {icon:"allbus_percent",id:"flow_rate",name:"全网业务占比",key:"4G全网业务占比",unit:"%",rate:1,fixed:2,ymin:0,ymax:100,source:"网络质量"}
                      ];
LSMConsts.videoKpis3=[//SGW....小区 5tab指标 排除本网率 本省率 用户渗透率 全网业务占比 用户数单位为人 流量单位为MB
                      {icon:"dlspeed",name:"下载速率",key:"4G下行速率500k",unit:"Kbps",rate:1,fixed:0,ymin:0,ymax:null,source:"网络质量"},
                      {icon:"user",name:"用户数",key:"4G用户数",unit:"人",rate:1,fixed:0,ymin:0,ymax:null,source:"用户数"},
                      {icon:"flow",name:"流量",key:"4G流量",unit:"MB",rate:1/1024,fixed:1,ymin:0,ymax:null,source:"网络质量"},
                      
                      {icon:"play_succ",name:"播放成功率",key:"4G视频播放成功率",unit:"%",rate:100,fixed:2,ymin:0,ymax:100,source:"网络质量",videoOnly:true},
                      {icon:"play_delay",name:"播放时延 ",key:"4G视频播放时延",unit:"ms",rate:1,fixed:0,ymin:0,ymax:null,source:"网络质量",videoOnly:true},
                      {icon:"tcp_succ",name:"TCP建链成功率 ",key:"4GTCP成功率",unit:"%",rate:100,fixed:2,ymin:0,ymax:100,source:"网络质量"},
                      {icon:"tcp_delay",name:"TCP建链时延 ",key:"4GTCP时延",unit:"ms",rate:1,fixed:0,ymin:0,ymax:null,source:"网络质量"},
                      {icon:"http_succ",name:"HTTP请求成功率",key:"4GHTTP成功率",unit:"%",rate:100,fixed:2,ymin:0,ymax:100,source:"网络质量"},
                      
                      {icon:"tcp_shake_succ",name:"TCP一二次握手成功率 ",key:"4GTCP第一、二次握手成功率",unit:"%",rate:100,fixed:2,ymin:0,ymax:100,source:"网络质量"},
                      {icon:"tcp_shake_delay",name:"TCP一二次握手时延 ",key:"4GTCP第一、二次握手时延",unit:"ms",rate:1,fixed:0,ymin:0,ymax:null,source:"网络质量"},
                      {icon:"tcp_shake_succ",name:"TCP二三次握手成功率",key:"4GTCP第二、三次握手成功率",unit:"%",rate:100,fixed:2,ymin:0,ymax:100,source:"网络质量"},
                      {icon:"tcp_shake_delay",name:"TCP二三次握手时延",key:"4GTCP第二、三次握手时延",unit:"ms",rate:1,fixed:0,ymin:0,ymax:null,source:"网络质量"},
                      {icon:"tcp_up_re",name:"TCP上行重传率",key:"4GTCP上行重传率",unit:"%",rate:100,fixed:2,ymin:0,ymax:100,source:"网络质量"},
                      
                      {icon:"tcp_down_re",name:"TCP下行重传率",key:"4GTCP下行重传率",unit:"%",rate:100,fixed:2,ymin:0,ymax:100,source:"网络质量"},
                      {icon:"tcp_up_disorder",name:"TCP上行乱序率",key:"4GTCP上行乱序率",unit:"%",rate:100,fixed:2,ymin:0,ymax:100,source:"网络质量"},
                      {icon:"tcp_down_disorder",name:"TCP下行乱序率",key:"4GTCP下行乱序率",unit:"%",rate:100,fixed:2,ymin:0,ymax:100,source:"网络质量"}
                      ];

LSMConsts.appWhite=["视频:优酷网",
              "视频:土豆网",
              "视频:酷6网",
              "视频:新浪视频",
              "视频:腾讯视频",
              "视频:搜狐视频",
              "视频:网易视频",
              "视频:激动网",
              "视频:乐视网",
              "视频:56视频",
              "视频:芒果TV",
              "视频:爱奇艺",
              "视频:CNTV",
              "视频:闪动",
              "视频:优米网",
              "视频:东方宽频",
              "视频:乐视网络电视",
              "视频:凤凰视频",
              "视频:电影网",
              "视频:六间房",
              "视频:百度视频",
              "视频:TED",
              "视频:360影视大全",
              "视频:开迅视频",
              "视频:搜狗影视",
              "视频:秒拍",
              "视频:央视影音",
              "视频:网易云课堂",
              "视频:网易学院",
              "视频:新浪公开课",
              "视频:斗鱼",
              "视频:熊猫TV",
              "视频:AcFun",
              "视频:咪咕视频",
              "视频:咪咕影院",
              "视频:哔哩哔哩"];

LSMConsts.alarmColor1="#ff0000";
LSMConsts.alarmColor2="#ff6c00";
LSMConsts.alarmColor3="#FFFF00";
LSMConsts.alarmColor4="#00E8FD";

LSMConsts.alarmTxt1="一级告警";
LSMConsts.alarmTxt2="二级告警";
LSMConsts.alarmTxt3="三级告警";
LSMConsts.alarmTxt4="四级告警";

LSMConsts.baseFontColor="#ffffff";
LSMConsts.baseLineColor="#F5CB44";
LSMConsts.baseBarColor="#3B8BC8";

LSMConsts.metroLineColorMap={
	1:"#e91b39",
	2:"#8ac53f",
	3:"#fad315",
	4:"#502e8d",
	5:"#9056a3",
	6:"#d61870",
	7:"#f37121",
	8:"#009eda",
	9:"#79c8ed",
	10:"#bca8d1",
	11:"#852e3d",
	12:"#007c65",
	13:"#e895c0",
	14:"#cccccc",
	15:"#cccccc",
	16:"#8dd1bf",
	17:"#c07774"
};

/**echarts默认颜色列表*/
LSMConsts.echartsColor=[
 "#3B8BC8",//ff7f50 
 "#F5CB44",//87cefa 
 "#da70d6",
 "#32cd32",
 "#6495ed",
 "#ff69b4",
 "#ba55d3",
 "#cd5c5c",
 "#ffa500",
 "#40e0d0",
 "#1e90ff",
 "#ff6347",
 "#7b68ee",
 "#00fa9a",
 "#ffd700",
 "#6699FF",
 "#ff6666",
 "#3cb371",
 "#b8860b",
 "#30e0e0"
];
LSMConsts.CHARTCONFIG={
		xAxisLabelColor:'#ffffff',
		yAxisLabelColor:'#ffffff',
		xAxisColor:'#013351',
		yAxisColor:'#013351',
		axisLabelSize:24,
		legendSize:18,
		labelSize:18
	};


/**常用手机品牌*/
LSMConsts.commonMobiles="";
/**全省名称*/
LSMConsts.provinceName="上海市";
/**未知名称*/
LSMConsts.unknown="unknown";
/**错误码对应说明*/
LSMConsts.ERRCODEMAP={
	"-1":"超时无响应",
	"2":"IMSI unknown in HLR",
	"3":"Illegal MS",
	"5":"IMEI not accepted",
	"6":"Illegal ME",
	"7":"GPRS services not allowed",
	"8":"GPRS services and non-GPRS services not allowed",
	"9":"MS identity cannot be derived by the network",
	"10":"Implicitly detached",
	"11":"PLMN not allowed",
	"12":"Location Area not allowed",
	"13":"Roaming not allowed in this location area",
	"14":"GPRS services not allowed in this PLMN",
	"15":"No Suitable Cells In Location Area",
	"16":"MSC temporarily not reachable",
	"17":"Network failure",
	"18":"CS domain not available",
	"19":"ESM failure",
	"20":"MAC failure",
	"21":"Synch failure",
	"22":"Congestion",
	"23":"UE security capabilities mismatch",
	"24":"Security mode rejected, unspecified",
	"25":"Not authorized for this CSG",
	"26":"Non-EPS authentication unacceptable",
	"28":"SMS provided via GPRS in this routing area",
	"35":"Requested service option not authorized in this PLMN",
	"39":"CS service temporarily not available",
	"40":"No EPS bearer context activated",
	"42":"Severe network failure",
	"0":"无原因",
	"95":"Semantically incorrect message",
	"96":"Invalid mandatory information",
	"97":"Message type non-existent or not implemented",
	"98":"Message type not compatible with the protocol state",
	"99":"Information element non-existent or not implemented",
	"100":"Conditional IE error",
	"101":"Message not compatible with the protocol state",
	"111":"Protocol error, unspecified",
	"128":"Unknown",
	"136":"Operator Determined Barring",
	"154":"Insufficient resources",
	"155":"Missing or unknown APN",
	"156":"Unknown PDN type",
	"157":"User authentication failed",
	"158":"Request rejected by Serving GW or PDN GW",
	"159":"Request rejected, unspecified",
	"160":"Service option not supported",
	"161":"Requested service option not subscribed",
	"162":"Service option temporarily out of order",
	"163":"PTI already in use",
	"164":"Regular deactivation",
	"165":"EPS QoS not accepted",
	"166":"Network failure",
	"167":"Reactivation requested",
	"169":"Semantic error in the TFT operation",
	"170":"Syntactical error in the TFT operation",
	"171":"Invalid EPS bearer identity",
	"172":"Semantic errors in packet filter(s)",
	"173":"Syntactical errors in packet filter(s)",
	"174":"Unused (see NOTE 2)",
	"175":"PTI mismatch",
	"177":"Last PDN disconnection not allowed",
	"178":"PDN type IPv4 only allowed",
	"179":"PDN type IPv6 only allowed",
	"180":"Single address bearers only allowed",
	"181":"ESM information not received",
	"182":"PDN connection does not exist",
	"183":"Multiple PDN connections for a given APN not allowed",
	"184":"Collision with network initiated request",
	"187":"Unsupported QCI value",
	"188":"Bearer handling not supported",
	"193":"Maximum number of EPS bearers reached",
	"194":"Requested APN not supported in current RAT and PLMN combination",
	"209":"Invalid PTI value",
	"223":"Semantically incorrect message",
	"224":"Invalid mandatory information",
	"225":"Message type non-existent or not implemented",
	"226":"Message type not compatible with the protocol state",
	"227":"Information element non-existent or not implemented",
	"228":"Conditional IE error",
	"229":"Message not compatible with the protocol state",
	"239":"Protocol error, unspecified",
	"240":"APN restriction value incompatible with active EPS bearer context",
	"256":"unspecified,",
	"257":"tx2relocoverall-expiry,",
	"258":"successful-handover,",
	"259":"release-due-to-eutran-generated-reason,",
	"260":"handover-cancelled,",
	"261":"partial-handover,",
	"262":"ho-failure-in-target-EPC-eNB-or-target-system,",
	"263":"ho-target-not-allowed,",
	"264":"tS1relocoverall-expiry,",
	"265":"tS1relocprep-expiry,",
	"266":"cell-not-available,",
	"267":"unknown-targetID,",
	"268":"no-radio-resources-available-in-target-cell,",
	"269":"unknown-mme-ue-s1ap-id,",
	"270":"unknown-enb-ue-s1ap-id,",
	"271":"unknown-pair-ue-s1ap-id,",
	"272":"handover-desirable-for-radio-reason,",
	"273":"time-critical-handover,",
	"274":"resource-optimisation-handover,",
	"275":"reduce-load-in-serving-cell,",
	"276":"user-inactivity,",
	"277":"radio-connection-with-ue-lost,",
	"278":"load-balancing-tau-required,",
	"279":"cs-fallback-triggered,",
	"280":"ue-not-available-for-ps-service,",
	"281":"radio-resources-not-available,",
	"282":"failure-in-radio-interface-procedure,",
	"283":"invalid-qos-combination,",
	"284":"interrat-redirection,",
	"285":"interaction-with-other-procedure,",
	"286":"unknown-E-RAB-ID,",
	"287":"multiple-E-RAB-ID-instances,",
	"288":"encryption-and-or-integrity-protection-algorithms-not-supported,",
	"289":"s1-intra-system-handover-triggered,",
	"290":"s1-inter-system-handover-triggered,",
	"291":"x2-handover-triggered,",
	"292":"redirection-towards-1xRTT,",
	"293":"not-supported-QCI-value,",
	"294":"invalid-CSG-Id",
	"512":"transport-resource-unavailable,",
	"513":"unspecified,",
	"768":"normal-release,",
	"769":"authentication-failure,",
	"770":"detach,",
	"771":"unspecified,",
	"772":"csg-subscription-expiry",
	"1024":"transfer-syntax-error,",
	"1025":"abstract-syntax-error-reject,",
	"1026":"abstract-syntax-error-ignore-and-notify,",
	"1027":"message-not-compatible-with-receiver-state,",
	"1028":"semantic-error,",
	"1029":"abstract-syntax-error-falsely-constructed-message,",
	"1030":"unspecified,",
	"1280":"control-processing-overload,",
	"1281":"not-enough-user-plane-processing-resources,",
	"1282":"hardware-failure,",
	"1283":"om-intervention,",
	"1284":"unspecified,",
	"1285":"unknown-PLMN,"
};

LSMConsts.NATION_NAME_MAP={
        'Afghanistan':'阿富汗',
        'Angola':'安哥拉',
        'Albania':'阿尔巴尼亚',
        'United Arab Emirates':'阿联酋',
        'Argentina':'阿根廷',
        'Armenia':'亚美尼亚',
        'French Southern and Antarctic Lands':'法属南半球和南极领地',
        'Australia':'澳大利亚',
        'Austria':'奥地利',
        'Azerbaijan':'阿塞拜疆',
        'Burundi':'布隆迪',
        'Belgium':'比利时',
        'Benin':'贝宁',
        'Burkina Faso':'布基纳法索',
        'Bangladesh':'孟加拉国',
        'Bulgaria':'保加利亚',
        'The Bahamas':'巴哈马',
        'Bosnia and Herzegovina':'波斯尼亚和黑塞哥维那',
        'Belarus':'白俄罗斯',
        'Belize':'伯利兹',
        'Bermuda':'百慕大',
        'Bolivia':'玻利维亚',
        'Brazil':'巴西',
        'Brunei':'文莱',
        'Bhutan':'不丹',
        'Botswana':'博茨瓦纳',
        'Central African Republic':'中非共和国',
        'Canada':'加拿大',
        'Switzerland':'瑞士',
        'Chile':'智利',
        'China':'中国',
        'Ivory Coast':'象牙海岸',
        'Cameroon':'喀麦隆',
        'Democratic Republic of the Congo':'刚果民主共和国',
        'Republic of the Congo':'刚果共和国',
        'Colombia':'哥伦比亚',
        'Costa Rica':'哥斯达黎加',
        'Cuba':'古巴',
        'Northern Cyprus':'北塞浦路斯',
        'Cyprus':'塞浦路斯',
        'Czech Republic':'捷克共和国',
        'Germany':'德国',
        'Djibouti':'吉布提',
        'Denmark':'丹麦',
        'Dominican Republic':'多明尼加共和国',
        'Algeria':'阿尔及利亚',
        'Ecuador':'厄瓜多尔',
        'Egypt':'埃及',
        'Eritrea':'厄立特里亚',
        'Spain':'西班牙',
        'Estonia':'爱沙尼亚',
        'Ethiopia':'埃塞俄比亚',
        'Finland':'芬兰',
        'Fiji':'斐',
        'Falkland Islands':'福克兰群岛',
        'France':'法国',
        'Gabon':'加蓬',
        'United Kingdom':'英国',
        'Georgia':'格鲁吉亚',
        'Ghana':'加纳',
        'Guinea':'几内亚',
        'Gambia':'冈比亚',
        'Guinea Bissau':'几内亚比绍',
        'Equatorial Guinea':'赤道几内亚',
        'Greece':'希腊',
        'Greenland':'格陵兰',
        'Guatemala':'危地马拉',
        'French Guiana':'法属圭亚那',
        'Guyana':'圭亚那',
        'Honduras':'洪都拉斯',
        'Croatia':'克罗地亚',
        'Haiti':'海地',
        'Hungary':'匈牙利',
        'Indonesia':'印尼',
        'India':'印度',
        'Ireland':'爱尔兰',
        'Iran':'伊朗',
        'Iraq':'伊拉克',
        'Iceland':'冰岛',
        'Israel':'以色列',
        'Italy':'意大利',
        'Jamaica':'牙买加',
        'Jordan':'约旦',
        'Japan':'日本',
        'Kazakhstan':'哈萨克斯坦',
        'Kenya':'肯尼亚',
        'Kyrgyzstan':'吉尔吉斯斯坦',
        'Cambodia':'柬埔寨',
        'South Korea':'韩国',
        'Kosovo':'科索沃',
        'Kuwait':'科威特',
        'Laos':'老挝',
        'Lebanon':'黎巴嫩',
        'Liberia':'利比里亚',
        'Libya':'利比亚',
        'Sri Lanka':'斯里兰卡',
        'Lesotho':'莱索托',
        'Lithuania':'立陶宛',
        'Luxembourg':'卢森堡',
        'Latvia':'拉脱维亚',
        'Morocco':'摩洛哥',
        'Moldova':'摩尔多瓦',
        'Madagascar':'马达加斯加',
        'Mexico':'墨西哥',
        'Macedonia':'马其顿',
        'Mali':'马里',
        'Myanmar':'缅甸',
        'Montenegro':'黑山',
        'Mongolia':'蒙古',
        'Mozambique':'莫桑比克',
        'Mauritania':'毛里塔尼亚',
        'Malawi':'马拉维',
        'Malaysia':'马来西亚',
        'Namibia':'纳米比亚',
        'New Caledonia':'新喀里多尼亚',
        'Niger':'尼日尔',
        'Nigeria':'尼日利亚',
        'Nicaragua':'尼加拉瓜',
        'Netherlands':'荷兰',
        'Norway':'挪威',
        'Nepal':'尼泊尔',
        'New Zealand':'新西兰',
        'Oman':'阿曼',
        'Pakistan':'巴基斯坦',
        'Panama':'巴拿马',
        'Peru':'秘鲁',
        'Philippines':'菲律宾',
        'Papua New Guinea':'巴布亚新几内亚',
        'Poland':'波兰',
        'Puerto Rico':'波多黎各',
        'North Korea':'北朝鲜',
        'Portugal':'葡萄牙',
        'Paraguay':'巴拉圭',
        'Qatar':'卡塔尔',
        'Romania':'罗马尼亚',
        'Russia':'俄罗斯',
        'Rwanda':'卢旺达',
        'Western Sahara':'西撒哈拉',
        'Saudi Arabia':'沙特阿拉伯',
        'Sudan':'苏丹',
        'South Sudan':'南苏丹',
        'Senegal':'塞内加尔',
        'Solomon Islands':'所罗门群岛',
        'Sierra Leone':'塞拉利昂',
        'El Salvador':'萨尔瓦多',
        'Somaliland':'索马里兰',
        'Somalia':'索马里',
        'Republic of Serbia':'塞尔维亚共和国',
        'Suriname':'苏里南',
        'Slovakia':'斯洛伐克',
        'Slovenia':'斯洛文尼亚',
        'Sweden':'瑞典',
        'Swaziland':'斯威士兰',
        'Syria':'叙利亚',
        'Chad':'乍得',
        'Togo':'多哥',
        'Thailand':'泰国',
        'Tajikistan':'塔吉克斯坦',
        'Turkmenistan':'土库曼斯坦',
        'East Timor':'东帝汶',
        'Trinidad and Tobago':'特里尼达和多巴哥',
        'Tunisia':'突尼斯',
        'Turkey':'土耳其',
        'United Republic of Tanzania':'坦桑尼亚联合共和国',
        'Uganda':'乌干达',
        'Ukraine':'乌克兰',
        'Uruguay':'乌拉圭',
        'United States of America':'美国',
        'Uzbekistan':'乌兹别克斯坦',
        'Venezuela':'委内瑞拉',
        'Vietnam':'越南',
        'Vanuatu':'瓦努阿图',
        'West Bank':'西岸',
        'Yemen':'也门',
        'South Africa':'南非',
        'Zambia':'赞比亚',
        'Zimbabwe':'津巴布韦'
    };

/**实际保障区域主热点*/
LSMConsts.FAKE_REGION=[
	{region:"迪士尼"},
	{region:"地铁"},
	{region:"高架"},
	{region:"景点"},
	{region:"商业区"}
];

LSMConsts.FAKE_KPI=["累计客流","语音话务量","数据流量","无线接通率","附着成功率","无线掉话率","下载速率","流量"];