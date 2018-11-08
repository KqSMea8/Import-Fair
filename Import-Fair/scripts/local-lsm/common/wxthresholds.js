var WXCONSTS={};
WXCONSTS.thresholdColor0='#000000';
WXCONSTS.thresholdColor1='#ff0000';
WXCONSTS.thresholdColor2='#ff7e00';
WXCONSTS.thresholdColor3='#ffc000';

//指标面板劣化规则
WXCONSTS.thresholds={
	//网管
	'gsm_conn_ratio':{
		name:'GSM接通率',unit:'%',showThreshold:'<90%',
		lv1Exp:'x>=0&&x<80',lv1:'[0%,80%)',
		lv2Exp:'x>=80&&x<85',lv2:'[80%,85%)',
		lv3Exp:'x>=85&&x<90',lv3:'[85%,90%)'
	},'gsm_wireless_conn_ratio':{
		name:'GSM无线接通率',unit:'%',showThreshold:'<90%',
		lv1Exp:'x>=0&&x<80',lv1:'[0%,80%)',
		lv2Exp:'x>=80&&x<85',lv2:'[80%,85%)',
		lv3Exp:'x>=85&&x<90',lv3:'[85%,90%)'
	},'gsm_ul_tbf_succ_ratio':{
		name:'GSM上行TBF建立成功率',unit:'%',showThreshold:'<90%',
		lv1Exp:'x>=0&&x<80',lv1:'[0%,80%)',
		lv2Exp:'x>=80&&x<85',lv2:'[80%,85%)',
		lv3Exp:'x>=85&&x<90',lv3:'[85%,90%)'
	},'gsm_wireless_use_ratio':{
		name:'GSM无线利用率',unit:'%',showThreshold:'>50%',
		lv1Exp:'x>100&&x<300',lv1:'(100%,300%)',
		lv2Exp:'x>80&&x<=100',lv2:'(80%,100%]',
		lv3Exp:'x>50&&x<=80',lv3:'(50%,80%]'
	},'lte_wireless_conn_ratio':{
		name:'LTE无线接通率',unit:'%',showThreshold:'<90%',
		lv1Exp:'x>=0&&x<80',lv1:'[0%,80%)',
		lv2Exp:'x>=80&&x<85',lv2:'[80%,85%)',
		lv3Exp:'x>=85&&x<90',lv3:'[85%,90%)'
	},'lte_wireless_drop_ratio':{
		name:'LTE无线掉话率',unit:'%',showThreshold:'>5%',
		lv1Exp:'x>10&&x<=100',lv1:'(10%,100%]',
		lv2Exp:'x>5&&x<=10',lv2:'(5%,10%]',
		lv3Exp:'x>3&&x<=5',lv3:'(3%,5%]'
	},'lte_sw_succ_ratio':{
		name:'LTE切换成功率',unit:'%',showThreshold:'<90%',
		lv1Exp:'x>=0&&x<80',lv1:'[0%,80%)',
		lv2Exp:'x>=80&&x<85',lv2:'[80%,85%)',
		lv3Exp:'x>=85&&x<90',lv3:'[85%,90%)'
	},'volte_voice_conn_ratio':{
		name:'Volte语音无线接通率',unit:'%',showThreshold:'<90%',
		lv1Exp:'x>=0&&x<80',lv1:'[0%,80%)',
		lv2Exp:'x>=80&&x<85',lv2:'[80%,85%)',
		lv3Exp:'x>=85&&x<90',lv3:'[85%,90%)'
	},'volte_video_conn_ratio':{
		name:'Volte视频无线接通率',unit:'%',showThreshold:'<90%',
		lv1Exp:'x>=0&&x<80',lv1:'[0%,80%)',
		lv2Exp:'x>=80&&x<85',lv2:'[80%,85%)',
		lv3Exp:'x>=85&&x<90',lv3:'[85%,90%)'
	},'volte_voice_erab_drop_ratio':{
		name:'VoLTE E-RAB掉线率(语音)',unit:'%',showThreshold:'>5%',
		lv1Exp:'x>10&&x<=100',lv1:'(10%,100%]',
		lv2Exp:'x>5&&x<=10',lv2:'(5%,10%]',
		lv3Exp:'x>3&&x<=5',lv3:'(3%,5%]'
	},'volte_video_erab_drop_ratio':{
		name:'VoLTE E-RAB掉线率(视频)',unit:'%',showThreshold:'>5%',
		lv1Exp:'x>10&&x<=100',lv1:'(10%,100%]',
		lv2Exp:'x>5&&x<=10',lv2:'(5%,10%]',
		lv3Exp:'x>3&&x<=5',lv3:'(3%,5%]'
	},'volte_sw_succ_ratio':{
		name:'VoLTE用户切换成功率',unit:'%',showThreshold:'<90%',
		lv1Exp:'x>=0&&x<80',lv1:'[0%,80%)',
		lv2Exp:'x>=80&&x<85',lv2:'[80%,85%)',
		lv3Exp:'x>=85&&x<90',lv3:'[85%,90%)'
	},'lte_ul_prb_use_ratio':{
		name:'LTE上行PRB利用率',unit:'%',showThreshold:'>50%',
		lv1Exp:'x>100&&x<300',lv1:'(100%,300%)',
		lv2Exp:'x>80&&x<=100',lv2:'(80%,100%]',
		lv3Exp:'x>50&&x<=80',lv3:'(50%,80%]'
	},'lte_dl_prb_use_ratio':{
		name:'LTE下行PRB利用率',unit:'%',showThreshold:'>50%',
		lv1Exp:'x>100&&x<300',lv1:'(100%,300%)',
		lv2Exp:'x>80&&x<=100',lv2:'(80%,100%]',
		lv3Exp:'x>50&&x<=80',lv3:'(50%,80%]'
	},'TCP第二、三次握手成功率':{
		name:'TCP第二、三次握手成功率',unit:'%',showThreshold:'<90%',
		lv1Exp:'x>=0&&x<80',lv1:'[0%,80%)',
		lv2Exp:'x>=80&&x<85',lv2:'[80%,85%)',
		lv3Exp:'x>=85&&x<90',lv3:'[85%,90%)'
	},'HTTP响应成功率':{
		name:'HTTP响应成功率',unit:'%',showThreshold:'<90%',
		lv1Exp:'x>=0&&x<80',lv1:'[0%,80%)',
		lv2Exp:'x>=80&&x<85',lv2:'[80%,85%)',
		lv3Exp:'x>=85&&x<90',lv3:'[85%,90%)'
	},'VOLTE语音网络接通率':{//新信令VOLTE
		name:'VOLTE语音网络接通率',unit:'%',showThreshold:'<90%',
		lv1Exp:'x>=0&&x<80',lv1:'[0%,80%)',
		lv2Exp:'x>=80&&x<85',lv2:'[80%,85%)',
		lv3Exp:'x>=85&&x<90',lv3:'[85%,90%)'
	},'VOLTE语音掉话率':{
		name:'VOLTE语音掉话率',unit:'%',showThreshold:'>3%',
		lv1Exp:'x>10&&x<=100',lv1:'(10%,100%]',
		lv2Exp:'x>5&&x<=10',lv2:'(5%,10%]',
		lv3Exp:'x>3&&x<=5',lv3:'(3%,5%]'
	},'IMS初始注册成功率':{
		name:'IMS初始注册成功率',unit:'%',showThreshold:'<90%',
		lv1Exp:'x>=0&&x<80',lv1:'[0%,80%)',
		lv2Exp:'x>=80&&x<85',lv2:'[80%,85%)',
		lv3Exp:'x>=85&&x<90',lv3:'[85%,90%)'
	},'ESRVCC切换成功率':{
		name:'ESRVCC切换成功率',unit:'%',showThreshold:'<90%',
		lv1Exp:'x>=0&&x<80',lv1:'[0%,80%)',
		lv2Exp:'x>=80&&x<85',lv2:'[80%,85%)',
		lv3Exp:'x>=85&&x<90',lv3:'[85%,90%)'
	},'RTP上行丢包率':{
		name:'RTP上行丢包率',unit:'%',showThreshold:'>3%',
		lv1Exp:'x>10&&x<=100',lv1:'(10%,100%]',
		lv2Exp:'x>5&&x<=10',lv2:'(5%,10%]',
		lv3Exp:'x>3&&x<=5',lv3:'(3%,5%]'
	}
};
//热点、小区、业务质差规则
WXCONSTS.degradationHotspotStreamKpiNameList='4GTCP第二、三次握手成功率,4GTCP二、三次握手请求次数';
WXCONSTS.degradationHotspotThresholds=[
   {exp:'lte_wireless_conn_ratio<90&&nbrattestab>1000',showExp:'LTE无线接通率<90%且E-RAB建立请求次数 > 1000',kpiInfos:[{name:'LTE无线接通率',key:'lte_wireless_conn_ratio',unit:'%',source:'网管',period:15}]},//E-RAB建立请求次数没有
   {exp:'lte_wireless_drop_ratio>5&&nbrsuccestab>1000',showExp:'LTE无线掉线率>5%且E-RAB建立成功次数 >1000',kpiInfos:[{name:'LTE无线掉线率',key:'lte_wireless_drop_ratio',unit:'%',source:'网管',period:15}]},
   {exp:'lte_ul_prb_use_ratio>60&&nbrattestab>1000&&lte_ul_user_avg_rate<0.1',showExp:'LTE上行PRB利用率>60%且E-RAB建立请求次数 > 1000 且 上行用户平均速率<0.1Mbps',kpiInfos:[{name:'LTE上行PRB利用率',key:'lte_ul_prb_use_ratio',unit:'%',source:'网管',period:15}]},
   {exp:'lte_dl_prb_use_ratio>60&&nbrattestab>1000&&lte_dl_user_avg_rate<1',showExp:'LTE下行PRB利用率>60%且E-RAB建立请求次数 > 1000 且 下行用户平均速率<1Mbps',kpiInfos:[{name:'LTE下行PRB利用率',key:'lte_dl_prb_use_ratio',unit:'%',source:'网管',period:15}]},
   {exp:'gsm_wireless_conn_ratio<90&&attnbrtchnho>1000',showExp:'GSM无线接通率<90%且GSM-TCH尝试次数 > 1000',kpiInfos:[{name:'GSM无线接通率',key:'gsm_wireless_conn_ratio',unit:'%',source:'网管',period:60}]},
   {exp:'4GTCP第二、三次握手成功率<70&&4GTCP二、三次握手请求次数>10000',showExp:'LTE TCP23次握手成功率<70%且TCP23次握手次数>10000',kpiInfos:[{name:'LTE TCP第二、三次握手成功率',key:'4GTCP第二、三次握手成功率',unit:'%',source:'信令',period:5}]}
];
//小区
WXCONSTS.degradationCellStreamKpiNameList='4GTCP第二、三次握手成功率,4GTCP二、三次握手请求次数';
WXCONSTS.degradationCellThresholds=[//ATTNBRTCHNHO
   {exp:'lte_wireless_conn_ratio<90&&nbrattestab>400',showExp:'LTE无线接通率<90%且E-RAB建立请求次数 > 400',kpiInfos:[{name:'LTE无线接通率',key:'lte_wireless_conn_ratio',unit:'%',source:'网管'}]},//E-RAB建立请求次数没有
   {exp:'lte_wireless_drop_ratio>5&&nbrsuccestab>400',showExp:'LTE无线掉线率>5%且E-RAB建立成功次数 > 400',kpiInfos:[{name:'LTE无线掉线率',key:'lte_wireless_drop_ratio',unit:'%',source:'网管'}]},
   {exp:'lte_ul_prb_use_ratio>60&&nbrattestab>500&&lte_ul_user_avg_rate<0.1',showExp:'LTE上行PRB利用率>60%且E-RAB建立请求次数 > 500 且 上行用户平均速率<0.1Mbps',kpiInfos:[{name:'LTE上行PRB利用率',key:'lte_ul_prb_use_ratio',unit:'%',source:'网管'}]},
   {exp:'lte_dl_prb_use_ratio>60&&nbrattestab>500&&lte_dl_user_avg_rate<1',showExp:'LTE下行PRB利用率>60%且E-RAB建立请求次数 > 500 且 下行用户平均速率<1Mbps',kpiInfos:[{name:'LTE下行PRB利用率',key:'lte_dl_prb_use_ratio',unit:'%',source:'网管'}]},
   {exp:'gsm_wireless_conn_ratio<90&&attnbrtchnho>100',showExp:'GSM无线接通率<90%且GSM-TCH尝试次数 > 100',kpiInfos:[{name:'GSM无线接通率',key:'gsm_wireless_conn_ratio',unit:'%',source:'网管'}]},
   {exp:'4GTCP第二、三次握手成功率<70&&4GTCP二、三次握手请求次数>10000',showExp:'LTE TCP23次握手成功率<70%且TCP23次握手次数>1000',kpiInfos:[{name:'LTE TCP第二、三次握手成功率',key:'4GTCP第二、三次握手成功率',unit:'%',source:'信令'}]}
];
//业务
WXCONSTS.degradationMinorStreamKpiNameList='TCP建立成功率,TCP时延,HTTP响应成功率,HTTP响应时延,TCP建立请求次数,HTTP请求次数';
WXCONSTS.degradationMinorThresholds=[
   {exp:'TCP建立成功率<80&&TCP建立请求次数>1000',showExp:'TCP建立成功率<80',kpiInfos:[{name:'TCP建链成功率',key:'TCP建立成功率',unit:'%',source:'信令'}]},//E-RAB建立请求次数没有
   {exp:'TCP时延>1000&&TCP建立请求次数>1000',showExp:'TCP时延>1000',kpiInfos:[{name:'TCP建链时延',key:'TCP时延',unit:'ms',source:'信令'}]},
   {exp:'HTTP响应成功率<80&&HTTP请求次数>1000',showExp:'HTTP响应成功率<80',kpiInfos:[{name:'HTTP响应成功率',key:'HTTP响应成功率',unit:'%',source:'信令'}]},
   {exp:'HTTP响应时延>1000&&HTTP请求次数>1000',showExp:'HTTP响应时延>1000',kpiInfos:[{name:'HTTP响应时延',key:'HTTP响应时延',unit:'ms',source:'信令'}]}
];

WXCONSTS.degradationCellIfMap={
	'lx_01':{showExp:'LTE TCP23次握手成功率<70%且TCP23次握手次数>10000',kpiInfos:[{name:'LTE TCP第二、三次握手成功率',key:'4GTCP第二、三次握手成功率',unit:'%',source:'信令'}]},
	'l_01':{showExp:'LTE无线接通率<90%且E-RAB建立请求次数 > 1000',kpiInfos:[{name:'LTE无线接通率',key:'lte_wireless_conn_ratio',unit:'%',source:'网管'}]},
	'l_02':{showExp:'LTE无线掉线率>5%且E-RAB建立成功次数 >1000',kpiInfos:[{name:'LTE无线掉线率',key:'lte_wireless_drop_ratio',unit:'%',source:'网管'}]},
	'l_03':{showExp:'LTE上行PRB利用率>60%且E-RAB建立请求次数 > 400 且 上行用户平均速率<0.1Mbps',kpiInfos:[{name:'LTE上行PRB利用率',key:'lte_ul_prb_use_ratio',unit:'%',source:'网管'}]},
	'l_04':{showExp:'LTE下行PRB利用率>60%且E-RAB建立请求次数 > 400 且 下行用户平均速率<1Mbps',kpiInfos:[{name:'LTE下行PRB利用率',key:'lte_dl_prb_use_ratio',unit:'%',source:'网管'}]},
	'g_01':{showExp:'GSM无线接通率<90%且GSM-TCH尝试次 > 1000',kpiInfos:[{name:'GSM无线接通率',key:'gsm_wireless_conn_ratio',unit:'%',source:'网管'}]}
}




