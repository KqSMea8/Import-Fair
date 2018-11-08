var pmars = {
	jkblh : function() {
		return '进口博览会';
	},
	gjhz:function(){
		return 'J-国家会展中心';
	},
	jkh:function(){
		return '进博会';
	},
	/*
	 * 手机号
	 */
	phone:function(){
		 phone=$.cookie('phoneNum');
			/*phone="13673604080";*/
			return phone;
	},
	/* 
	 * id:id
	 * text:text
	 * company:单位
	 * auxiliary:text辅助
	 * source:数据来源
	 * Tparticle:时间颗粒 （分钟）
	 * ascription:指标分别
	 * company_auxiliary:单位辅助
	 * ecarts_legend_data:趋势图区分
	 * ascription:所属
	 */
	Left_name : function() {
		/*
		 * ecarts_result_id：1 
		 * ecarts_kpi_id：2 
		 * ecarts_gsm_id：3 
		 * ecarts_In_id：4
		 * ecarts_Pro_id：5 
		 * ecarts_Intl_id：6
		 */
		var _name = {
			lte_wireless_conn_ratio : {
				id : "lte_wireless_conn_ratio",
				text : "4G无线<br/>接通率(%)",
				unitHandler : function() {},
				company : "(%)",
				company_auxiliary : "%",
				auxiliary : "4G无线接通率",
				source : "网管",
				Tparticle : 15,
				ecarts_legend_data : "小时",
				ascription : "1",
				threshold:"1"
			},
			lte_wireless_drop_ratio : {
				id : "lte_wireless_drop_ratio",
				text : "4G无线<br/>掉话率(%)",
				unitHandler : function() {},
				company : "(%)",
				company_auxiliary : "%",
				auxiliary : "4G无线掉话率",
				source : "网管",
				Tparticle : 15,
				ecarts_legend_data : "小时",
				ascription : "1",
				threshold:"1"
			},
			volte_voice_conn_ratio : {
				id : "volte_voice_conn_ratio",
				text : "VoLTE<br/>接通率(%)",
				unitHandler : function() {},
				company : "(%)",
				auxiliary : "VoLTE接通率",
				company_auxiliary : "%",
				source : "网管",
				Tparticle : 15,
				ecarts_legend_data : "小时",
				ascription : "1",
				threshold:"1"
			},
			lte_ul_prb_use_ratio : {
				id : "lte_ul_prb_use_ratio",
				text : "LTE上行PRB<br/>利用率(%)",
				unitHandler : function() {},
				company : "(%)",
				company_auxiliary : "%",
				auxiliary : "LTE上行PRB利用率",
				source : "网管",
				Tparticle : 15,
				ecarts_legend_data : "小时",
				ascription : "1",
				threshold:"1"
			},
			lte_dl_prb_use_ratio : {
				id : "lte_dl_prb_use_ratio",
				text : "LTE下行PRB<br/>利用率(%)",
				unitHandler : function() {},
				company : "(%)",
				company_auxiliary : "%",
				auxiliary : "LTE下行PRB利用率",
				source : "网管",
				Tparticle : 15,
				ecarts_legend_data : "小时",
				ascription : "1",
				threshold:"1"
			},
			s_178 : {
				id : "s_178",
				text : "TCP二三次握手<br/>成功率(%)",
				unitHandler : function() {},
				company : "(%)",
				auxiliary : "TCP二三次握手成功率",
				company_auxiliary : "%",
				source : "信令",
				Tparticle : 5,
				ecarts_legend_data : "小时",
				ascription : "2",
				threshold:"1"
			},
			vsruc : {
				id : "vsruc",
				text : "VoLTE注册<br/>用户数(万人)",
				unitHandler : function() {},
				company : "(万人)",
				auxiliary : "VoLTE注册用户数",
				company_auxiliary : "万人",
				source : "网管",
				Tparticle : 60,
				ecarts_legend_data : "小时",
				ascription : "3",
				threshold:"2"
			},
			s_091 : {
				id : "s_091",
				text : "用户总数<br/>(万人)",
				unitHandler : function() {},
				company : "(万人)",
				auxiliary : "用户总数",
				source : "信令",
				company_auxiliary : "万人",
				Tparticle : 5,
				ecarts_legend_data : "小时",
				ascription : "2",
				threshold:"2"
			},
			s_261 : {
				id : "s_261",
				text : "即时通信<br/>活跃数(万人)",
				unitHandler : function() {},
				company : "(万人)",
				auxiliary : "即时通信活跃数",
				company_auxiliary : "万人",
				source : "信令",
				Tparticle : 5,
				ecarts_legend_data : "小时",
				ascription : "2",
				threshold:"2"
			},
			mme_sub_nbrsub : {
				id : "mme_sub_nbrsub",
				text : "LTE附着<br/>用户数(万人)",
				unitHandler : function() {},
				company : "(万人)",
				auxiliary : "LTE附着用户数",
				company_auxiliary : "万人",
				source : "网管",
				Tparticle : 60,
				ecarts_legend_data : "小时",
				ascription : "3",
				threshold:"2"
			},
			msc_subscrib_in_vlr : {
				id : "msc_subscrib_in_vlr",
				text : "VLR用户数<br/>(万人)",
				unitHandler : function() {},
				company : "(万人)",
				auxiliary : "VLR用户数",
				company_auxiliary : "万人",
				source : "网管",
				Tparticle : 60,
				ecarts_legend_data : "小时",
				ascription : "3",
				threshold:"2"
			},
			s_083 : {
				id : "s_083",
				text : "数据流量<br/>(TB)",
				unitHandler : function() {},
				company : "(TB)",
				auxiliary : "数据流量",
				company_auxiliary : "TB",
				source : "信令",
				Tparticle : 5,
				ecarts_legend_data : "小时",
				ascription : "2",
				threshold:"2"
			},
			volte_teletraffic : {
				id : "volte_teletraffic",
				text : "VoLTE语音<br/>话务量(万Erl)",
				unitHandler : function() {},
				company : "(万Erl)",
				auxiliary : "VoLTE语音话务量",
				company_auxiliary : "万Erl",
				source : "网管",
				Tparticle : 15,
				ecarts_legend_data : "小时",
				ascription : "1",
				threshold:"2"
			},
			gsm_teletraffic : {
				id : "gsm_teletraffic",
				text : "2G<br/>话务量(万Erl)",
				unitHandler : function() {},
				company : "(万Erl)",
				auxiliary : "2G话务量",
				company_auxiliary : "万Erl",
				source : "网管",
				Tparticle : 60,
				ecarts_legend_data : "小时",
				ascription : "3",
				threshold:"2"
			},
			gsm_wireless_use_ratio : {
				id : "gsm_wireless_use_ratio",
				text : "GSM无线<br/>利用率(%)",
				unitHandler : function() {},
				company : "(%)",
				auxiliary : "GSM无线利用率",
				company_auxiliary : "%",
				source : "网管",
				Tparticle : 60,
				ecarts_legend_data : "小时",
				ascription : "3",
				threshold:"1"
			},
			gsm_wireless_conn_ratio : {
				id : "gsm_wireless_conn_ratio",
				text : "GSM无线<br/>接通率(%)",
				unitHandler : function() {},
				company : "(%)",
				auxiliary : "GSM无线接通率",
				company_auxiliary : "%",
				source : "网管",
				Tparticle : 60,
				ecarts_legend_data : "小时",
				ascription : "3",
				threshold:"1"
			},
			gsm_wireless_drop_ratio : {
				id : "gsm_wireless_drop_ratio",
				text : "GSM无线<br/>掉话率(%)",
				unitHandler : function() {},
				company : "(%)",
				auxiliary : "GSM无线掉话率",
				company_auxiliary : "%",
				source : "网管",
				Tparticle : 60,
				ecarts_legend_data : "小时",
				ascription : "3",
				threshold:"1"
			},
			lte_prb_use_ratio : {
				id : "lte_prb_use_ratio",
				text : "4G无线<br/>利用率(%)",
				unitHandler : function() {},
				company : "(%)",
				auxiliary : "4G无线利用率",
				company_auxiliary : "%",
				source : "网管",
				Tparticle : 15,
				ecarts_legend_data : "小时",
				ascription : "1",
				threshold:"1"
			},
			lte_sw_succ_ratio : {
				id : "lte_sw_succ_ratio",
				text : "4G切换<br/>成功率(%)",
				unitHandler : function() {},
				company : "(%)",
				auxiliary : "4G切换成功率",
				company_auxiliary : "%",
				source : "网管",
				Tparticle : 15,
				ecarts_legend_data : "小时",
				ascription : "1",
				threshold:"1"
			},
			lte_attach_suc_ratio : {
				id : "lte_attach_suc_ratio",
				text : "4G附着<br/>成功率(%)",
				unitHandler : function() {},
				company : "(%)",
				auxiliary : "4G附着成功率",
				company_auxiliary : "%",
				source : "网管",
				Tparticle : 15,
				ecarts_legend_data : "小时",
				ascription : "1",
				threshold:"1"
			},
			mr_coverage_ratio : {
				id : "mr_coverage_ratio",
				text : "MR覆盖率<br/>(%)",
				unitHandler : function() {},
				company : "(%)",
				auxiliary : "MR覆盖率",
				source : "网管",
				company_auxiliary : "%",
				Tparticle : 15,
				ecarts_legend_data : "小时",
				ascription : "1",
				threshold:"1"
			},
			volte_esrvcc_sw_succ_ratio : {
				id : "volte_esrvcc_sw_succ_ratio",
				text : "eSRVCC切换<br/>成功率(%)",
				unitHandler : function() {},
				company : "(%)",
				auxiliary : "eSRVCC切换成功率",
				company_auxiliary : "%",
				source : "网管",
				Tparticle : 15,
				ecarts_legend_data : "小时",
				ascription : "1",
				threshold:"1"
			},
			volte_voice_sw_succ_ratio : {
				id : "volte_voice_sw_succ_ratio",
				text : "VoLTE切换<br/>成功率(%)",
				unitHandler : function() {},
				company : "(%)",
				auxiliary : "VoLTE切换成功率",
				company_auxiliary : "%",
				source : "网管",
				Tparticle : 15,
				ecarts_legend_data : "小时",
				ascription : "1",
				threshold:"1"
			},
			volte_voice_drop_ratio : {
				id : "volte_voice_drop_ratio",
				text : "VoLTE<br/>掉话率(%)",
				unitHandler : function() {},
				company : "(%)",
				auxiliary : "VoLTE掉话率",
				company_auxiliary : "%",
				source : "网管",
				Tparticle : 15,
				ecarts_legend_data : "小时",
				ascription : "1",
				threshold:"1"
			},
			s_006 : {
				id : "s_006",
				text : "TCP成功率<br/>(%)",
				unitHandler : function() {},
				company : "(%)",
				auxiliary : "TCP成功率",
				company_auxiliary : "%",
				source : "信令",
				Tparticle : 5,
				ecarts_legend_data : "小时",
				ascription : "2",
				threshold:"1"
			},
			s_027 : {
				id : "s_027",
				text : "页面HTTP请求<br/>成功率(%)",
				unitHandler : function() {},
				company : "(%)",
				auxiliary : "页面HTTP请求成功率",
				company_auxiliary : "%",
				source : "信令",
				Tparticle : 5,
				ecarts_legend_data : "小时",
				ascription : "2",
				threshold:"1"
			},
			s_139 : {
				id : "s_139",
				text : "页面HTTP<br/>响应时延(ms)",
				unitHandler : function() {},
				company : "(ms)",
				auxiliary : "页面HTTP响应时延",
				company_auxiliary : "ms",
				source : "信令",
				Tparticle : 5,
				ecarts_legend_data : "小时",
				ascription : "2",
				threshold:"3"
			},
			inter_roam_in_user_num : {
				id : "inter_roam_in_user_num",
				text : "国际漫入<br/>用户数(万人)",
				unitHandler : function() {},
				company : "(万人)",
				auxiliary : "国际漫入用户数",
				company_auxiliary : "万人",
				source : "网管",
				Tparticle : 15,
				ecarts_legend_data : "小时",
				ascription : "1",
				threshold:"2"
			},
			tau_update_succ_ratio : {
				id : "tau_update_succ_ratio",
				text : "TAU更新<br/>成功率(%)",
				unitHandler : function() {},
				company : "(%)",
				auxiliary : "TAU更新成功率",
				company_auxiliary : "%",
				source : "网管",
				Tparticle : 15,
				ecarts_legend_data : "小时",
				ascription : "1",
				threshold:"1"
			},
			pdn_conn_succ_ratio : {
				id : "pdn_conn_succ_ratio",
				text : "PDN连接建立<br/>成功率(%)",
				unitHandler : function() {},
				company : "(%)",
				auxiliary : "PDN连接建立成功率",
				company_auxiliary : "%",
				source : "网管",
				Tparticle : 15,
				ecarts_legend_data : "小时",
				ascription : "1",
				threshold:"1"
			},
			csmt_fall_back_succ_ratio : {
				id : "csmt_fall_back_succ_ratio",
				text : "CSMT回落<br/>成功率(%)",
				unitHandler : function() {},
				company : "(%)",
				auxiliary : "CSMT回落成功率",
				company_auxiliary : "%",
				source : "网管",
				Tparticle : 15,
				ecarts_legend_data : "小时",
				ascription : "1",
				threshold:"1"
			},
			pgw_charging_succ_ratio : {
				id : "pgw_charging_succ_ratio",
				text : "PGW计费请求<br/>成功率(%)",
				unitHandler : function() {},
				company : "(%)",
				auxiliary : "PGW计费请求成功率",
				company_auxiliary : "%",
				source : "网管",
				Tparticle : 15,
				ecarts_legend_data : "小时",
				ascription : "1",
				threshold:"1"
			},
			mme_sw_succ_ratio : {
				id : "mme_sw_succ_ratio",
				text : "MME切换<br/>成功率(%)",
				unitHandler : function() {},
				company : "(%)",
				auxiliary : "MME切换成功率",
				company_auxiliary : "%",
				source : "网管",
				Tparticle : 15,
				ecarts_legend_data : "小时",
				ascription : "1",
				threshold:"1"
			},
			prov_roam_in_user_num : {
				id : "prov_roam_in_user_num",
				text : "省际漫入<br/>用户数(万人)",
				unitHandler : function() {},
				company : "(万人)",
				auxiliary : "省际漫入用户数",
				company_auxiliary : "万人",
				source : "网管",
				Tparticle : 15,
				ecarts_legend_data : "小时",
				ascription : "1",
				threshold:"2"
			},
			ydylgj : {
				id : "ydylgj",
				text : "元首参会国<br/>(人)",
				unitHandler : function() {},
				company : "(人)",
				auxiliary : "元首参会国",
				company_auxiliary : "人",
				source : "信令",
				Tparticle : 60,
				ecarts_legend_data : "小时",
				ascription : "6",
				threshold:"2"
			},
			vl_ims_reg_succrate : {
				id : "vl_ims_reg_succrate",
				text : "VoLTE初始<br/>注册成功率(%)",
				unitHandler : function() {},
				company : "(%)",
				auxiliary : "VoLTE初始注册成功率",
				company_auxiliary : "%",
				source : "网管",
				Tparticle : 15,
				ecarts_legend_data : "小时",
				ascription : "1",
				threshold:"1"
			},
			gsm_flow_all : {
				id : "gsm_flow_all",
				text : "2G流量<br/>(GB)",
				unitHandler : function() {},
				company : "(MB)",
				auxiliary : "2G流量",
				company_auxiliary : "GB",
				source : "网管",
				Tparticle : 60,
				ecarts_legend_data : "小时",
				ascription : "3",
				threshold:"2"
			},
			lte_flow_all : {
				id : "lte_flow_all",
				text : "4G流量<br/>(TB)",
				unitHandler : function() {},
				company : "(GB)",
				auxiliary : "4G流量",
				company_auxiliary : "TB",
				source : "网管",
				Tparticle : 15,
				ecarts_legend_data : "小时",
				ascription : "1",
				threshold:"2"
			},
			s_114 : {
				id : "s_114",
				text : "即时通信HTTP<br/>HTTP成功率(%)",
				unitHandler : function() {},
				company : "(%)",
				auxiliary : "即时通信HTTP成功率",
				company_auxiliary : "%",
				source : "信令",
				Tparticle : 5,
				ecarts_legend_data : "小时",
				ascription : "2",
				threshold:"1"
			},
			s_135 : {
				id : "s_135",
				text : "即时通信HTTP<br/>HTTP时延(ms)",
				unitHandler : function() {},
				company : "(ms)",
				auxiliary : "即时通信HTTP时延",
				company_auxiliary : "ms",
				source : "信令",
				Tparticle : 5,
				ecarts_legend_data : "小时",
				ascription : "2",
				threshold:"3"
			}
		};
		var name = JSON.stringify(_name);
		return name;
	},
	
	LeftTwo_name:function(){
		/*
		 * ecarts_result_id：1 
		 * ecarts_kpi_id：2 
		 * ecarts_gsm_id：3 
		 * ecarts_In_id：4
		 * ecarts_Pro_id：5 
		 * ecarts_Intl_id：6
		 */
		var _name = {
			lte_wireless_conn_ratio : {
				id : "lte_wireless_conn_ratio",
				text : "4G无线<br/>接通率(%)",
				unitHandler : function() {},
				company : "(%)",
				company_auxiliary : "%",
				auxiliary : "4G无线接通率",
				source : "网管",
				Tparticle : 15,
				ecarts_legend_data : "小时",
				ascription : "1",
				threshold:"1"
			},
			lte_wireless_drop_ratio : {
				id : "lte_wireless_drop_ratio",
				text : "4G无线<br/>掉线率(%)",
				unitHandler : function() {},
				company : "(%)",
				auxiliary : "4G无线掉线率",
				company_auxiliary : "%",
				source : "网管",
				Tparticle : 15,
				ecarts_legend_data : "小时",
				ascription : "1",
				threshold:"1"
			},
			lte_ul_prb_use_ratio : {
				id : "lte_ul_prb_use_ratio",
				text : "LTE上行PRB<br/>利用率(%)",
				unitHandler : function() {},
				company : "(%)",
				auxiliary : "LTE上行PRB利用率",
				company_auxiliary : "%",
				source : "网管",
				Tparticle : 15,
				ecarts_legend_data : "小时",
				ascription : "1",
				threshold:"1"
			},
			lte_dl_prb_use_ratio : {
				id : "lte_dl_prb_use_ratio",
				text : "LTE下行PRB<br/>利用率(%)",
				unitHandler : function() {},
				company : "(%)",
				auxiliary : "LTE下行PRB利用率",
				company_auxiliary : "%",
				source : "网管",
				Tparticle : 15,
				ecarts_legend_data : "小时",
				ascription : "1",
				threshold:"1"
			},
			s_178 : {
				id : "s_178",
				text : "TCP二三次<br/>握手成功率(%)",
				unitHandler : function() {},
				company : "(%)",
				auxiliary : "TCP二三次握手成功率",
				company_auxiliary : "%",
				source : "信令",
				Tparticle : 5,
				ecarts_legend_data : "小时",
				ascription : "2",
				threshold:"1"
			},
			s_091 : {
				id : "s_091",
				text : "用户总数<br/>(万人)",
				unitHandler : function() {},
				company : "(万人)",
				auxiliary : "用户总数",
				company_auxiliary : "万人",
				source : "信令",
				Tparticle : 5,
				ecarts_legend_data : "小时",
				ascription : "2",
				threshold:"2"
			},
			s_261 : {
				id : "s_261",
				text : "即时通信<br/>活跃数(万人)",
				unitHandler : function() {},
				company : "(万人)",
				auxiliary : "即时通信活跃数",
				company_auxiliary : "万人",
				source : "信令",
				Tparticle : 5,
				ecarts_legend_data : "小时",
				ascription : "2",
				threshold:"2"
			},
			s_083 : {
				id : "s_083",
				text : "数据流量<br/>(GB)",
				unitHandler : function() {},
				company : "(GB)",
				auxiliary : "数据流量",
				company_auxiliary : "GB",
				source : "信令",
				Tparticle : 5,
				ecarts_legend_data : "小时",
				ascription : "2",
				threshold:"2"
			},
			volte_voice_teletraffic : {
				id : "volte_voice_teletraffic",
				text : "VoLTE语音<br/>话务量(Erl)",
				unitHandler : function() {},
				company : "(Erl)",
				auxiliary : "VoLTE语音话务量",
				company_auxiliary : "Erl",
				source : "网管",
				Tparticle : 15,
				ecarts_legend_data : "小时",
				ascription : "1",
				threshold:"2"
			},
			gsm_teletraffic : {
				id : "gsm_teletraffic",
				text : "2G<br/>话务量(Erl)",
				unitHandler : function() {},
				company : "(Erl)",
				auxiliary : "2G话务量",
				company_auxiliary : "Erl",
				source : "网管",
				Tparticle : 60,
				ecarts_legend_data : "小时",
				ascription : "3",
				threshold:"2"
			},
			gsm_wireless_use_ratio : {
				id : "gsm_wireless_use_ratio",
				text : "GSM无线<br/>利用率(%)",
				unitHandler : function() {},
				company : "(%)",
				auxiliary : "GSM无线利用率",
				company_auxiliary : "%",
				source : "网管",
				Tparticle : 60,
				ecarts_legend_data : "小时",
				ascription : "3",
				threshold:"1"
			},
			gsm_wireless_conn_ratio : {
				id : "gsm_wireless_conn_ratio",
				text : "GSM无线<br/>接通率(%)",
				unitHandler : function() {},
				company : "(%)",
				auxiliary : "GSM无线接通率",
				company_auxiliary : "%",
				source : "网管",
				Tparticle : 60,
				ecarts_legend_data : "小时",
				ascription : "3",
				threshold:"1"
			},
			gsm_wireless_drop_ratio : {
				id : "gsm_wireless_drop_ratio",
				text : "GSM无线<br/>掉话率(%)",
				unitHandler : function() {},
				company : "(%)",
				auxiliary : "GSM无线掉话率",
				company_auxiliary : "%",
				source : "网管",
				Tparticle : 60,
				ecarts_legend_data : "小时",
				ascription : "3",
				threshold:"1"
			},
			lte_sw_succ_ratio : {
				id : "lte_sw_succ_ratio",
				text : "4G切换<br/>成功率(%)",
				unitHandler : function() {},
				company : "(%)",
				auxiliary : "4G切换成功率",
				company_auxiliary : "%",
				source : "网管",
				Tparticle : 15,
				ecarts_legend_data : "小时",
				ascription : "1",
				threshold:"1"
			},
			mr_coverage_ratio : {
				id : "mr_coverage_ratio",
				text : "MR覆盖率<br/>(%)",
				unitHandler : function() {},
				company : "(%)",
				auxiliary : "MR覆盖率",
				company_auxiliary : "%",
				source : "网管",
				Tparticle : 15,
				ecarts_legend_data : "小时",
				ascription : "1",
				threshold:"1"
			},
			s_123 : {
				id : "s_123",
				text : "eSRVCC切换<br/>成功率(%)",
				unitHandler : function() {},
				company : "(%)",
				auxiliary : "eSRVCC切换成功率",
				company_auxiliary : "%",
				source : "信令",
				Tparticle : 15,
				ecarts_legend_data : "小时",
				ascription : "2",
				threshold:"1"
			},
			volte_sw_succ_ratio : {
				id : "volte_sw_succ_ratio",
				text : "VoLTE切换<br/>成功率(%)",
				unitHandler : function() {},
				company : "(%)",
				auxiliary : "VoLTE切换成功率",
				company_auxiliary : "%",
				source : "网管",
				Tparticle : 15,
				ecarts_legend_data : "小时",
				ascription : "1",
				threshold:"1"
			},
			vwdrc : {
				id : "vwdrc",
				text : "VoLTE<br/>掉话率(%)",
				unitHandler : function() {},
				company : "(%)",
				auxiliary : "VoLTE掉话率",
				company_auxiliary : "%",
				source : "网管",
				Tparticle : 15,
				ecarts_legend_data : "小时",
				ascription : "1",
				threshold:"1"
			},
			s_006 : {
				id : "s_006",
				text : "TCP<br/>成功率(%)",
				unitHandler : function() {},
				company : "(%)",
				auxiliary : "TCP成功率",
				company_auxiliary : "%",
				source : "信令",
				Tparticle : 5,
				ecarts_legend_data : "小时",
				ascription : "2",
				threshold:"1"
			},
			s_027 : {
				id : "s_027",
				text : "页面HTTP请求<br/>成功率(%)",
				unitHandler : function() {},
				company : "(%)",
				auxiliary : "页面HTTP请求成功率",
				company_auxiliary : "%",
				source : "信令",
				Tparticle : 5,
				ecarts_legend_data : "小时",
				ascription : "2",
				threshold:"1"
			},
			s_139 : {
				id : "s_139",
				text : "页面HTTP<br/>响应时延(ms)",
				unitHandler : function() {},
				company : "(ms)",
				auxiliary : "页面HTTP响应时延",
				company_auxiliary : "ms",
				source : "信令",
				Tparticle : 5,
				ecarts_legend_data : "小时",
				ascription : "2",
				threshold:"3"
			},
			user_cnt : {
				id : "user_cnt",
				text : "国际漫入<br/>用户数(人)",
				unitHandler : function() {},
				company : "(人)",
				auxiliary : "国际漫入用户数",
				company_auxiliary : "人",
				source : "信令",
				Tparticle : 60,
				ecarts_legend_data : "小时",
				ascription : "4",
				threshold:"2"
			},
			sjmy : {
				id : "sjmy",
				text : "省际漫入<br/>用户数(万人)",
				unitHandler : function() {},
				company : "(万人)",
				auxiliary : "省际漫入用户数",
				company_auxiliary : "万人",
				source : "信令",
				Tparticle : 60,
				ecarts_legend_data : "小时",
				ascription : "6",
				threshold:"2"
			},
			ydylgj : {
				id : "ydylgj",
				text : "元首参会国<br/>(人)",
				unitHandler : function() {},
				company : "(人)",
				auxiliary : "元首参会国",
				company_auxiliary : "人",
				source : "信令",
				Tparticle : 60,
				ecarts_legend_data : "小时",
				ascription : "5",
				threshold:"2"
			},
			gsm_flow_all : {
				id : "gsm_flow_all",
				text : "2G流量<br/>(GB)",
				unitHandler : function() {},
				company : "(MB)",
				auxiliary : "2G流量",
				company_auxiliary : "GB",
				source : "网管",
				Tparticle : 60,
				ecarts_legend_data : "小时",
				ascription : "3",
				threshold:"2"
			},
			lte_flow_all : {
				id : "lte_flow_all",
				text : "4G流量<br/>(GB)",
				unitHandler : function() {},
				company : "(MB)",
				auxiliary : "4G流量",
				company_auxiliary : "GB",
				source : "网管",
				Tparticle : 15,
				ecarts_legend_data : "小时",
				ascription : "1",
				threshold:"2"
			},
			s_114 : {
				id : "s_114",
				text : "即时通信HTTP<br/>请求成功率(%)",
				unitHandler : function() {},
				company : "(%)",
				auxiliary : "即时通信HTTP请求成功率",
				company_auxiliary : "%",
				source : "信令",
				Tparticle : 5,
				ecarts_legend_data : "小时",
				ascription : "2",
				threshold:"1"
			},
			s_135 : {
				id : "s_135",
				text : "即时通信HTTP<br/>响应时延(ms)",
				unitHandler : function() {},
				company : "(ms)",
				auxiliary : "即时通信HTTP响应时延",
				company_auxiliary : "ms",
				source : "信令",
				Tparticle : 5,
				ecarts_legend_data : "小时",
				ascription : "2",
				threshold:"3"
			},
			volte_wireless_conn_ratio : {
				id : "volte_wireless_conn_ratio",
				text : "VoLTE<br/>接通率(%)",
				unitHandler : function() {},
				company : "(%)",
				auxiliary : "VoLTE接通率",
				company_auxiliary : "%",
				source : "网管",
				Tparticle : 15,
				ecarts_legend_data : "小时",
				ascription : "1",
				threshold:"1"
			},
			volte_wireless_drop_ratio:{
				id : "volte_wireless_drop_ratio",
				text : "VoLTE<br/>掉话率(%)",
				unitHandler : function() {},
				company : "(%)",
				auxiliary : "VoLTE掉话率",
				company_auxiliary : "%",
				source : "网管",
				Tparticle : 15,
				ecarts_legend_data : "小时",
				ascription : "1",
				threshold:"1"
			},
		};
		var name=JSON.stringify(_name);
		return name;
	},
	//家庭业务
	Family:function(){
		var Family={
				fbb_user_nums:{id:"fbb_user_nums",text:"家庭宽带",unitHandler:function(){},company:"(万人)",auxiliary:"家庭宽带",company_auxiliary:"万人",source:"---",Tparticle:1440,ecarts_legend_data:"天",ascription:"1",company_auxiliary_original:"(万人)",threshold:"2",source : "网管"},
				tv_user_num:{id:"tv_user_num",text:"互联网电视",unitHandler:function(){},company:"(万人)",auxiliary:"互联网电视",company_auxiliary:"万人",source:"---",Tparticle:1440,ecarts_legend_data:"天",ascription:"1",company_auxiliary_original:"(万人)",threshold:"2",source : "网管"},
				online_user_cnt:{id:"online_user_cnt",text:"家宽在线",unitHandler:function(){},company:"(万人)",auxiliary:"家宽在线",company_auxiliary:"万人",source:"---",Tparticle:1440,ecarts_legend_data:"天",ascription:"1",company_auxiliary_original:"(万人)",threshold:"2",source : "网管"},
				peak_tv_online_user_num:{id:"peak_tv_online_user_num",text:"互联网电视峰值用户",unitHandler:function(){},company:"(万人)",auxiliary:"互联网电视峰值用户",company_auxiliary:"万人",source:"---",Tparticle:1440,ecarts_legend_data:"天",ascription:"1",company_auxiliary_original:"(万人)",threshold:"2",source : "网管"},
				opened_user_cnt:{id:"opened_user_cnt",text:"家宽开通",unitHandler:function(){},company:"(万人)",auxiliary:"家宽开通",company_auxiliary:"万人",source:"---",Tparticle:1440,ecarts_legend_data:"天",ascription:"1",company_auxiliary_original:"(万人)",threshold:"2",source : "网管"},	
				play_succ_rate:{id:"play_succ_rate",text:"播放成功率",unitHandler:function(){},company:"(%)",auxiliary:"播放成功率",company_auxiliary:"%",source:"---",Tparticle:1440,ecarts_legend_data:"天",ascription:"1",company_auxiliary_original:"(%)",threshold:"1",source : "网管"},
				tv_jammed_user_ratio:{id:"tv_jammed_user_ratio",text:"互联网电视卡顿用户占比",unitHandler:function(){},company:"(%)",auxiliary:"互联网电视卡顿用户占比",company_auxiliary:"%",source:"---",Tparticle:1440,ecarts_legend_data:"天",ascription:"1",company_auxiliary_original:"(%)",threshold:"1",source : "网管"},
				onu_op_qualification_ratio:{id:"onu_op_qualification_ratio",text:"ONU光功率合格占比",unitHandler:function(){},company:"(%)",auxiliary:"ONU光功率合格占比",company_auxiliary:"%",source:"---",Tparticle:1440,ecarts_legend_data:"天",ascription:"1",company_auxiliary_original:"(%)",threshold:"1",source : "网管"},
				fbb_cover_user_num:{id:"fbb_cover_user_num",text:"家宽覆盖",unitHandler:function(){},company:"(万人)",auxiliary:"家宽覆盖",company_auxiliary:"万人",source:"---",Tparticle:1440,ecarts_legend_data:"天",ascription:"1",company_auxiliary_original:"(万人)",threshold:"2",source : "网管"},
				olt_order_cnt:{id:"olt_order_cnt",text:"OLT工单数量",unitHandler:function(){},company:"(%)",auxiliary:"OLT工单数量",company_auxiliary:"%",source:"---",Tparticle:1440,ecarts_legend_data:"天",ascription:"1",company_auxiliary_original:"(%)",threshold:"1",source : "网管"},
				ouotc:{id:"ouotc",text:"OLT上联超门限数",unitHandler:function(){},company:"(%)",auxiliary:"OLT上联超门限数",company_auxiliary:"%",source:"---",Tparticle:1440,ecarts_legend_data:"天",ascription:"1",company_auxiliary_original:"(%)",threshold:"1",source : "网管"},
				play_res_delay:{id:"play_res_delay",text:"电视播放响应时长",unitHandler:function(){},company:"(ms)",auxiliary:"电视播放响应时长",company_auxiliary:"ms",source:"---",Tparticle:60,ecarts_legend_data:"小时",ascription:"2",company_auxiliary_original:"(us)",threshold:"3",source : "网管"},
				epg_resp_delay:{id:"epg_resp_delay",text:"电视EPG加载时延",unitHandler:function(){},company:"(ms)",auxiliary:"电视EPG加载时延",company_auxiliary:"ms",source:"---",Tparticle:60,ecarts_legend_data:"小时",ascription:"2",company_auxiliary_original:"(us)",threshold:"3",source : "网管"},
				screen_jammed_num_ratio:{id:"screen_jammed_num_ratio",text:"卡顿次数占比",unitHandler:function(){},company:"(%)",auxiliary:"卡顿次数占比",company_auxiliary:"%",source:"---",Tparticle:60,ecarts_legend_data:"小时",ascription:"2",company_auxiliary_original:"(%)",threshold:"1",source : "网管"},
				screen_jammed_users_ratio:{id:"screen_jammed_users_ratio",text:"卡顿用户占比",unitHandler:function(){},company:"(%)",auxiliary:"卡顿用户占比",company_auxiliary:"%",source:"---",Tparticle:60,ecarts_legend_data:"小时",ascription:"2",company_auxiliary_original:"(%)",threshold:"1",source : "网管"},
				sjdr:{id:"sjdr",text:"卡顿时长占比",unitHandler:function(){},company:"(%)",auxiliary:"卡顿时长占比",company_auxiliary:"%",source:"---",Tparticle:1440,ecarts_legend_data:"小时",ascription:"2",company_auxiliary_original:"(%)",threshold:"1",source : "网管"}
				
		}
		var Family=JSON.stringify(Family);
		return Family;
	},
	//移动业务 (_g )
	Left_name_g:function(){
		var Family={
			s_091 : {
				id : "s_091",
				text : "活跃用户<br/>数(万人)",
				unitHandler : function() {},
				company : "(万人)",
				auxiliary : "活跃用户数",
				source : "信令",
				company_auxiliary : "万人",
				Tparticle : 5,
				ecarts_legend_data : "小时",
				ascription : "2",
				threshold:"2"
			},
			msc_subscrib_in_vlr : {
				id : "msc_subscrib_in_vlr",
				text : "VLR用户数<br/>(万人)",
				unitHandler : function() {},
				company : "(万人)",
				auxiliary : "VLR用户数",
				company_auxiliary : "万人",
				source : "网管",
				Tparticle : 60,
				ecarts_legend_data : "小时",
				ascription : "3",
				threshold:"2"
			},
			mme_sub_nbrsub : {
				id : "mme_sub_nbrsub",
				text : "LTE附着<br/>用户数(万人)",
				unitHandler : function() {},
				company : "(万人)",
				auxiliary : "LTE附着用户数",
				company_auxiliary : "万人",
				source : "网管",
				Tparticle : 60,
				ecarts_legend_data : "小时",
				ascription : "3",
				threshold:"2"
			},
			vsruc : {
				id : "vsruc",
				text : "VoLTE注册<br/>用户数(万人)",
				unitHandler : function() {},
				company : "(万人)",
				auxiliary : "VoLTE注册用户数",
				company_auxiliary : "万人",
				source : "网管",
				Tparticle : 60,
				ecarts_legend_data : "小时",
				ascription : "3",
				threshold:"2"
			},
			prov_roam_in_user_num : {
				id : "prov_roam_in_user_num",
				text : "省际漫入<br/>用户数(万人)",
				unitHandler : function() {},
				company : "(万人)",
				auxiliary : "省际漫入用户数",
				company_auxiliary : "万人",
				source : "网管",
				Tparticle : 15,
				ecarts_legend_data : "小时",
				ascription : "1",
				threshold:"2"
			},
			inter_roam_in_user_num : {
				id : "inter_roam_in_user_num",
				text : "国际漫入<br/>用户数(万人)",
				unitHandler : function() {},
				company : "(万人)",
				auxiliary : "国际漫入用户数",
				company_auxiliary : "万人",
				source : "网管",
				Tparticle : 15,
				ecarts_legend_data : "小时",
				ascription : "1",
				threshold:"2"
			},
			s_019 : {
				id : "s_019",
				text : "2G用户<br/>数(万人)",
				unitHandler : function() {},
				company : "(万人)",
				auxiliary : "2G用户数",
				source : "信令",
				company_auxiliary : "万人",
				Tparticle : 5,
				ecarts_legend_data : "小时",
				ascription : "2",
				threshold:"2"
			},
			s_262 : {
				id : "s_262",
				text : "4G+用户数<br/>(万人)",
				unitHandler : function() {},
				company : "(万人)",
				auxiliary : "4G+用户数",
				source : "信令",
				company_auxiliary : "万人",
				Tparticle : 5,
				ecarts_legend_data : "小时",
				ascription : "2",
				threshold:"2"
			},
			s_263 : {
				id : "s_263",
				text : "4G用户数<br/>(万人)",
				unitHandler : function() {},
				company : "(万人)",
				auxiliary : "4G用户数",
				source : "信令",
				company_auxiliary : "万人",
				Tparticle : 5,
				ecarts_legend_data : "小时",
				ascription : "2",
				threshold:"2"
			}
		}
		var Family=JSON.stringify(Family);
		return Family;
	},
	//家庭业务(_g)
	jtyw_g :function(){
		var Family={
			fbb_user_nums:{id:"fbb_user_nums",text:"家庭宽带用户数",unitHandler:function(){},company:"(万人)",auxiliary:"家庭宽带用户数",company_auxiliary:"万人",source:"---",Tparticle:1440,ecarts_legend_data:"天",ascription:"1",company_auxiliary_original:"(万人)",threshold:"2"},
			tv_user_num:{id:"tv_user_num",text:"互联网电视用户数",unitHandler:function(){},company:"(万人)",auxiliary:"互联网电视用户数",company_auxiliary:"万人",source:"---",Tparticle:1440,ecarts_legend_data:"天",ascription:"1",company_auxiliary_original:"(万人)",threshold:"2"},
			online_user_cnt:{id:"online_user_cnt",text:"家宽在线用户数",unitHandler:function(){},company:"(万人)",auxiliary:"家宽在线用户数",company_auxiliary:"万人",source:"---",Tparticle:1440,ecarts_legend_data:"天",ascription:"1",company_auxiliary_original:"(万人)",threshold:"2"},
			peak_tv_online_user_num:{id:"peak_tv_online_user_num",text:"互联网电视峰值在线数",unitHandler:function(){},company:"(万人)",auxiliary:"互联网电视峰值在线数",company_auxiliary:"万人",source:"---",Tparticle:1440,ecarts_legend_data:"天",ascription:"1",company_auxiliary_original:"(万人)",threshold:"2"}
		}
		var Family=JSON.stringify(Family);
		return Family;
	},
	//漫游(_g)
	room_g :function(){
		var Family={
				bytes : {id : "bytes",text : "国际漫入用户流量",unitHandler : function() {},company : "(GB)",auxiliary : "国际漫入用户流量",company_auxiliary : "GB",source : "网管",Tparticle : 15,ecarts_legend_data : "小时",ascription : "2",company_auxiliary_original:"TB",threshold:"2"},
		}
		var Family=JSON.stringify(Family);
		return Family;
	},
	// 重要网站
	Website : function() {
		var Website = {
			page_load_time : {
				id : "page_load_time",
				text : "页面加载时间",
				unitHandler : function() {},
				company : "(s)",
				auxiliary : "页面加载时间",
				company_auxiliary : "s",
				source : "---",
				Tparticle : 0,
				threshold:"3"
			},
			succ_ratio : {
				id : "succ_ratio",
				text : "成功率",
				unitHandler : function() {},
				company : "(%)",
				auxiliary : "成功率",
				company_auxiliary : "%",
				source : "---",
				Tparticle : 0,
				threshold:"1"
			},
			packet_loss_rate : {
				id : "packet_loss_rate",
				text : "丢包率",
				unitHandler : function() {},
				company : "(%)",
				auxiliary : "丢包率",
				company_auxiliary : "%",
				source : "---",
				Tparticle : 0,
				threshold:"1"
			},
			delay : {
				id : "delay",
				text : "ping时延",
				unitHandler : function() {},
				company : "(ms)",
				auxiliary : "ping时延",
				company_auxiliary : "ms",
				source : "---",
				Tparticle : 0,
				threshold:"3"
			},
			jitter_time : {
				id : "jitter_time",
				text : "抖动",
				unitHandler : function() {},
				company : "(ms)",
				auxiliary : "抖动",
				company_auxiliary : "ms",
				source : "---",
				Tparticle : 0,
				threshold:"3"
			}
		}
		var Location = JSON.stringify(Website);
		return Location;
	},
	// 无线业务量
	Guarantee : function() {
		var Guarantee = {
				volte_teletraffic : {
					id : "volte_teletraffic",
					text : "VoLTE语音<br/>话务量(万Erl)",
					unitHandler : function() {},
					company : "(万Erl)",
					auxiliary : "VoLTE语音话务量",
					company_auxiliary : "万Erl",
					source : "网管",
					Tparticle : 15,
					ecarts_legend_data : "小时",
					ascription : "1",
					threshold:"2"
				},
				gsm_flow_all : {
					id : "gsm_flow_all",
					text : "2G流量<br/>(GB)",
					unitHandler : function() {},
					company : "(MB)",
					auxiliary : "2G流量",
					company_auxiliary : "GB",
					source : "网管",
					Tparticle : 60,
					ecarts_legend_data : "小时",
					ascription : "2",
					threshold:"2"
				},
				lte_flow_all : {
					id : "lte_flow_all",
					text : "4G流量<br/>(TB)",
					unitHandler : function() {},
					company : "(GB)",
					auxiliary : "4G流量",
					company_auxiliary : "TB",
					source : "网管",
					Tparticle : 15,
					ecarts_legend_data : "小时",
					ascription : "2",
					threshold:"2"
				}
		}
		var Location = JSON.stringify(Guarantee);
		return Location;
	},
	//场景保障
	Location:function(){
		var Location={
			s_091:{id:"s_091",text:"用户数",unitHandler:function(){},company:"(人)",auxiliary:"用户数",company_auxiliary:"人",source:"信令",Tparticle:5,ecarts_legend_data:"小时",ascription : "2",threshold:"2"},
			hwl2:{id:"hwl2",text:"话务量",unitHandler:function(){},company:"(Erl)",auxiliary:"话务量",company_auxiliary:"Erl",source:"网管",Tparticle:15,ecarts_legend_data:"小时",ascription : "2",threshold:"2"},
			s_083:{id:"s_083",text:"流量",unitHandler:function(){},company:"(GB)",auxiliary:"流量",company_auxiliary:"GB",source:"信令",Tparticle:5,ecarts_legend_data:"小时",ascription : "2",threshold:"2"},
			lte_wireless_conn_ratio : {id : "lte_wireless_conn_ratio",text : "4G无线<br/>接通率(%)",unitHandler : function() {},company : "(%)",company_auxiliary : "%",auxiliary : "4G无线接通率",source : "网管",Tparticle : 15,ecarts_legend_data : "小时",ascription : "1",threshold:"1"},
			lte_wireless_drop_ratio : {id : "lte_wireless_drop_ratio",text : "4G无线<br/>掉线率(%)",unitHandler : function() {},company : "(%)",company_auxiliary : "%",auxiliary : "4G无线掉线率",source : "网管",Tparticle : 15,ecarts_legend_data : "小时",ascription : "1",threshold:"1"},
			s_261 : {id : "s_261",text : "即时通信<br/>活跃数(万人)",unitHandler : function() {},company : "(人)",auxiliary : "即时通信活跃数",company_auxiliary : "人",source : "信令",Tparticle : 5,ecarts_legend_data : "小时",ascription : "2",threshold:"2"},
			volte_wireless_conn_ratio : {id : "volte_wireless_conn_ratio",text : "VoLTE<br/>接通率(%)",unitHandler : function() {},company : "(%)",auxiliary : "VoLTE接通率",company_auxiliary : "%",source : "网管",Tparticle : 15,ecarts_legend_data : "小时",ascription : "1",threshold:"1"},
			volte_wireless_drop_ratio:{id : "volte_wireless_drop_ratio",text : "VoLTE<br/>掉话率(%)",unitHandler : function() {},company : "(%)",auxiliary : "VoLTE掉话率",company_auxiliary : "%",source : "网管",Tparticle : 15,ecarts_legend_data : "小时",ascription : "1",threshold:"1"},
			lte_ul_prb_use_ratio : {id : "lte_ul_prb_use_ratio",text : "LTE上行PRB<br/>利用率(%)",unitHandler : function() {},company : "(%)",company_auxiliary : "%",auxiliary : "LTE上行PRB利用率",source : "网管",Tparticle : 15,ecarts_legend_data : "小时",ascription : "1",threshold:"1"},
			lte_dl_prb_use_ratio : {id : "lte_dl_prb_use_ratio",text : "LTE下行PRB<br/>利用率(%)",unitHandler : function() {},company : "(%)",company_auxiliary : "%",auxiliary : "LTE下行PRB利用率",source : "网管",Tparticle : 15,ecarts_legend_data : "小时",ascription : "1",threshold:"1"},
			s_027: {id : "s_027",text : "HTTP<br/>请求成功率(%)",unitHandler : function() {},company : "(%)",auxiliary : "HTTP请求成功率",company_auxiliary : "%",source : "信令",Tparticle : 5,ecarts_legend_data : "小时",ascription : "2",threshold:"1"},
			s_139 : {id : "s_139",text : "HTTP<br/>响应时延(ms)",unitHandler : function() {},company : "(ms)",auxiliary : "HTTP响应时延",company_auxiliary : "ms",source : "信令",Tparticle : 5,ecarts_legend_data : "小时",ascription : "2",threshold:"3"},
			s_006: {id : "s_006",text : "TCP<br/>成功率(%)",unitHandler : function() {},company : "(%)",auxiliary : "TCP成功率",company_auxiliary : "%",source : "信令",Tparticle : 5,ecarts_legend_data : "小时",ascription : "2",threshold:"1"},
			gsm_wireless_conn_ratio : {id : "gsm_wireless_conn_ratio",text : "GSM无线<br/>接通率(%)",unitHandler : function() {},company : "(%)",auxiliary : "GSM无线接通率",company_auxiliary : "%",source : "网管",Tparticle : 60,ecarts_legend_data : "小时",ascription : "3",threshold:"1"},
			gsm_wireless_use_ratio : {id : "gsm_wireless_use_ratio",text : "GSM无线<br/>利用率(%)",unitHandler : function() {},company : "(%)",auxiliary : "GSM无线利用率",company_auxiliary : "%",source : "网管",Tparticle : 60,ecarts_legend_data : "小时",ascription : "3",threshold:"1"}
		}
		var Location=JSON.stringify(Location);
		return Location;
	},
	hlwyw:function(){
		var Location={
				gsm_wireless_conn_ratio : {
					id : "gsm_wireless_conn_ratio",
					text : "GSM无线<br/>接通率(%)",
					unitHandler : function() {},
					company : "(%)",
					auxiliary : "GSM无线接通率",
					company_auxiliary : "%",
					source : "网管",
					Tparticle : 60,
					ecarts_legend_data : "小时",
					ascription : "3",
					threshold:"1"
				},
				gsm_wireless_drop_ratio : {
					id : "gsm_wireless_drop_ratio",
					text : "GSM无线<br/>掉话率(%)",
					unitHandler : function() {},
					company : "(%)",
					auxiliary : "GSM无线掉话率",
					company_auxiliary : "%",
					source : "网管",
					Tparticle : 60,
					ecarts_legend_data : "小时",
					ascription : "3",
					threshold:"1"
				},
				volte_voice_conn_ratio : {
					id : "volte_voice_conn_ratio",
					text : "VoLTE<br/>接通率(%)",
					unitHandler : function() {},
					company : "(%)",
					auxiliary : "VoLTE无线接通率",
					company_auxiliary : "%",
					source : "网管",
					Tparticle : 15,
					ecarts_legend_data : "小时",
					ascription : "1",
					threshold:"1"
				},
				vwdrc : {
					id : "vwdrc",
					text : "VoLTE<br/>掉线率(%)",
					unitHandler : function() {},
					company : "(%)",
					auxiliary : "VoLTE无线掉话率",
					company_auxiliary : "%",
					source : "网管",
					Tparticle : 15,
					ecarts_legend_data : "小时",
					ascription : "1",
					threshold:"1"
				},
				lte_wireless_conn_ratio : {
					id : "lte_wireless_conn_ratio",
					text : "4G无线<br/>接通率(%)",
					unitHandler : function() {},
					company : "(%)",
					company_auxiliary : "%",
					auxiliary : "LTE无线接通率",
					source : "网管",
					Tparticle : 15,
					ecarts_legend_data : "小时",
					ascription : "1",
					threshold:"1"
				},
				lte_wireless_drop_ratio : {
					id : "lte_wireless_drop_ratio",
					text : "4G无线<br/>掉线率(%)",
					unitHandler : function() {},
					company : "(%)",
					auxiliary : "LTE无线掉话率",
					company_auxiliary : "%",
					source : "网管",
					Tparticle : 15,
					ecarts_legend_data : "小时",
					ascription : "1",
					threshold:"1"
				},
				lte_ul_prb_use_ratio : {
					id : "lte_ul_prb_use_ratio",
					text : "上行PRB<br/>利用率(%)",
					unitHandler : function() {},
					company : "(%)",
					auxiliary : "上行PRB利用率",
					company_auxiliary : "%",
					source : "网管",
					Tparticle : 15,
					ecarts_legend_data : "小时",
					ascription : "1",
					threshold:"1"
				},
				lte_dl_prb_use_ratio : {
					id : "lte_dl_prb_use_ratio",
					text : "LTE下行PRB<br/>利用率(%)",
					unitHandler : function() {},
					company : "(%)",
					auxiliary : "下行PRB利用率",
					company_auxiliary : "%",
					source : "网管",
					Tparticle : 15,
					ecarts_legend_data : "小时",
					ascription : "1",
					threshold:"1"
				}
			}
		var Location=JSON.stringify(Location);
		return Location;
	},
	//场景右屏
	ciierigId:function(){
		var ciierigId={
				"上行PRB利用率":"lte_ul_prb_use_ratio",
				"平均干扰电平":"ulmeannl_prb",
				"RRC连接数":"succconnestab",
				"2G掉话率":"gsm_wireless_drop_ratio",
				"2G接通率":"gsm_conn_ratio"
		}
		var Family=JSON.stringify(ciierigId);
		return Family;
	},
	//场景右屏
	ciierigKpis:function(){
		var ciierigId={
				"lte_ul_prb_use_ratio":"time,id,succconnestab,s_213,lte_ul_prb_use_ratio,ulmeannl_prb,attconnestab,lacci,lat,lon,cell_name,bs,lte_flow_,lte_rrc_conn_cnt_",
				"ulmeannl_prb":"time,id,succconnestab,s_213,lte_ul_prb_use_ratio,ulmeannl_prb,attconnestab,lacci,lat,lon,cell_name,bs,lte_flow_,lte_rrc_conn_cnt_",
				"succconnestab":"time,id,succconnestab,s_213,lte_ul_prb_use_ratio,ulmeannl_prb,attconnestab,lacci,lat,lon,cell_name,bs,lte_flow_,lte_rrc_conn_cnt_",
				"gsm_wireless_drop_ratio":"cell_name,vendor,s_091,s_083,s_252,s_137,lacci,lat,lon,gsmhwl,gsm_conn_ratio,gsm_wireless_use_ratio,bs",
				"gsm_conn_ratio":"cell_name,vendor,s_091,s_083,s_252,s_137,lacci,lat,lon,gsmhwl,gsm_conn_ratio,gsm_wireless_use_ratio,bs"
		}
		var Family=JSON.stringify(ciierigId);
		return Family;
	},
	//场景右屏
	ciieright:function(){
		var _name={
				lte_ul_prb_use_ratio:{id:"lte_ul_prb_use_ratio",text:"上行PRB利用率",unitHandler:function(){},company:"---",auxiliary:"上行PRB利用率",source:"---",Tparticle:0,text_auxiliary:"上行PRB利用率"},
				ulmeannl_prb:{id:"ulmeannl_prb",text:"平均干扰电平",unitHandler:function(){},company:"---",auxiliary:"平均干扰电平",source:"---",Tparticle:0,text_auxiliary:"平均干扰电平"},
				succconnestab:{id:"succconnestab",text:"RRC连接数",unitHandler:function(){},company:"---",auxiliary:"RRC连接数",source:"---",Tparticle:0,text_auxiliary:"RRC连接数"},
				gsm_wireless_drop_ratio:{id:"gsm_wireless_drop_ratio",text:"2G掉话率",unitHandler:function(){},company:"---",auxiliary:"2G掉话率",source:"---",Tparticle:0,text_auxiliary:"2G掉话率"},
				gsm_conn_ratio:{id:"gsm_conn_ratio",text:"2G接通率",unitHandler:function(){},company:"---",auxiliary:"2G接通率",source:"---",Tparticle:0,text_auxiliary:"2G接通率"}
		};
		var name=JSON.stringify(_name);
		return name;
	},
	//CMNET
	CMNET:function(){
		var CMNET={
				liuruzij_3rd_ul:{id:"liuruzij_3rd_ul",text:"第三方出口流量（上行）",unitHandler:function(){},company:"(GB)",auxiliary:"第三方出口流量（上行）",company_auxiliary:"GB",source:"---",Tparticle:0,ecarts_legend_data:"小时",ascription:"1",threshold:"2"},
				liucuzij_3rd_dl:{id:"liucuzij_3rd_dl",text:"第三方出口流量（下行）",unitHandler:function(){},company:"(GB)",auxiliary:"第三方出口流量（下行）",company_auxiliary:"GB",source:"---",Tparticle:0,ecarts_legend_data:"小时",ascription:"1",threshold:"2"},
				if_in_utility_3rd_ul:{id:"if_in_utility_3rd_ul",text:"第三方出口平均带宽利用率（上行）",unitHandler:function(){},company:"(%)",auxiliary:"第三方出口平均带宽利用率（上行）",company_auxiliary:"%",source:"---",Tparticle:0,ecarts_legend_data:"小时",ascription:"1",threshold:"1"},
				if_in_utility_3rd_dl:{id:"if_in_utility_3rd_dl",text:"第三方出口平均带宽利用率（下行）",unitHandler:function(){},company:"(%)",auxiliary:"第三方出口平均带宽利用率（下行）",company_auxiliary:"%",source:"---",Tparticle:0,ecarts_legend_data:"小时",ascription:"1",threshold:"1"},
				liuruzij_bnet_ul:{id:"liuruzij_bnet_ul",text:"互联网骨干出口流量（上行）",unitHandler:function(){},company:"(GB)",auxiliary:"集团、骨干网方出口流量（上行）",company_auxiliary:"GB",source:"---",Tparticle:0,ecarts_legend_data:"小时",ascription:"1",threshold:"2"},
				liucuzij_bnet_dl:{id:"liucuzij_bnet_dl",text:"互联网骨干流量（下行）",unitHandler:function(){},company:"(GB)",auxiliary:"集团、骨干网方出口流量（下行）",company_auxiliary:"GB",source:"---",Tparticle:0,ecarts_legend_data:"小时",ascription:"1",threshold:"2"},
				if_in_utility_bnet_ul:{id:"if_in_utility_bnet_ul",text:"互联网骨干平均带宽利用率（上行）",unitHandler:function(){},company:"(%)",auxiliary:"集团、骨干网出口平均带宽利用率（上行）",company_auxiliary:"%",source:"---",Tparticle:0,ecarts_legend_data:"小时",ascription:"1",threshold:"1"},
				if_in_utility_bnet_dl:{id:"if_in_utility_bnet_dl",text:"互联网骨干平均带宽利用率（下行）",unitHandler:function(){},company:"(%)",auxiliary:"集团、骨干网出口平均带宽利用率（下行）",company_auxiliary:"%",source:"---",Tparticle:0,ecarts_legend_data:"小时",ascription:"1",threshold:"1"},
				flow_ul:{id:"flow",text:"传输骨干平均带宽利用率",unitHandler:function(){},company:"(%)",auxiliary:"传输骨干平均带宽利用率",company_auxiliary:"%",source:"---",Tparticle:0,ecarts_legend_data:"小时",ascription:"1",threshold:"1"},
				flow:{id:"flow_ul",text:"传输骨干流量",unitHandler:function(){},company:"(GB)",auxiliary:"传输骨干流量",company_auxiliary:"GB",source:"---",Tparticle:0,ecarts_legend_data:"小时",ascription:"1",threshold:"2"}
		}
		var Family=JSON.stringify(CMNET);
		return Family;
	},
	//无线质量
	Wireless:function(){
		var name={
			lte_wireless_conn_ratio : {
				id : "lte_wireless_conn_ratio",
				text : "4G无线<br/>接通率(%)",
				unitHandler : function() {},
				company : "(%)",
				company_auxiliary : "%",
				auxiliary : "4G无线接通率",
				source : "网管",
				Tparticle : 15,
				ecarts_legend_data : "小时",
				ascription : "1",
				threshold:"1"
			},
			lte_wireless_drop_ratio : {
				id : "lte_wireless_drop_ratio",
				text : "4G无线<br/>掉线率(%)",
				unitHandler : function() {},
				company : "(%)",
				auxiliary : "4G无线掉线率",
				company_auxiliary : "%",
				source : "网管",
				Tparticle : 15,
				ecarts_legend_data : "小时",
				ascription : "1",
				threshold:"1"
			},
			gsm_wireless_conn_ratio : {
				id : "gsm_wireless_conn_ratio",
				text : "GSM无线<br/>接通率(%)",
				unitHandler : function() {},
				company : "(%)",
				auxiliary : "GSM无线接通率",
				company_auxiliary : "%",
				source : "网管",
				Tparticle : 60,
				ecarts_legend_data : "小时",
				ascription : "3",
				threshold:"1"
			},
			gsm_wireless_drop_ratio : {
				id : "gsm_wireless_drop_ratio",
				text : "GSM无线<br/>掉话率(%)",
				unitHandler : function() {},
				company : "(%)",
				auxiliary : "GSM无线掉话率",
				company_auxiliary : "%",
				source : "网管",
				Tparticle : 60,
				ecarts_legend_data : "小时",
				ascription : "3",
				threshold:"1"
			},
			volte_voice_conn_ratio : {
				id : "volte_voice_conn_ratio",
				text : "VoLTE<br/>接通率(%)",
				unitHandler : function() {},
				company : "(%)",
				auxiliary : "VoLTE接通率",
				company_auxiliary : "%",
				source : "网管",
				Tparticle : 15,
				ecarts_legend_data : "小时",
				ascription : "1",
				threshold:"1"
			},
			volte_voice_drop_ratio : {
				id : "volte_voice_drop_ratio",
				text : "VoLTE<br/>掉线率(%)",
				unitHandler : function() {},
				company : "(%)",
				auxiliary : "VoLTE掉线率",
				company_auxiliary : "%",
				source : "网管",
				Tparticle : 15,
				ecarts_legend_data : "小时",
				ascription : "1",
				threshold:"1"
			}
		}
		var Family=JSON.stringify(name);
		return Family;
	},
	splineleft_name:function(){
		var _name={
				allCustomer_id:{id:"allCustomer_id",text:"保障客户"},
				allSpline_id:{id:"allSpline_id",text:"保障专线"},
				customers_id:{id:"customers_id",text:"媒体客户"},
				spline_hall_id:{id:"spline_hall_id",text:"展馆专线"},
				spline_transmit_id:{id:"spline_transmit_id",text:"传输专线"},
				spline_internet_id:{id:"spline_internet_id",text:"互联网专线"},
				Medialine_id:{id:"Medialine_id",text:"媒体专线"},
				faultSpline_id:{id:"faultSpline_id",text:"故障专线"},
				complainSpline_id:{id:"complainSpline_id",text:"投诉专线"},
				media_cust_cnt_id:{id:"media_cust_cnt_id",text:"媒体客户"},
				media_line_cnt_id:{id:"media_line_cnt_id",text:"媒体专线"},
		}
		var _name=JSON.stringify(_name);
		return _name;
	},
	//CMNETID
	CMNETID:function(){
		var CMNETID=["liuruzij_3rd_ul","liucuzij_3rd_dl","if_in_utility_3rd_ul","if_in_utility_3rd_dl","if_in_utility_bnet_ul","if_in_utility_bnet_dl",
			           "liuruzij_bnet_ul","liucuzij_bnet_dl","flow","flow_ul"];
		return CMNETID;
	},
	/*
	 * CMNET坐标
	 */
	CMNETCoordinate:function(){
		var Coordinate={
				liuruzij_3rd_ul:{"top":12,"left":35,color:"#72d427"},
				liucuzij_3rd_dl:{"top":27,"left":32.7,color:"#3399ff"},
				if_in_utility_3rd_ul:{"top":27.5,"left":13.5,color:"#72d427"},
				if_in_utility_3rd_dl:{"top":39.5,"left":15,color:"#3399ff"},
				if_in_utility_bnet_ul:{"top":49.5,"left":26,color:"#72d427"},
				if_in_utility_bnet_dl:{"top":64.5,"left":16,color:"#3399ff"},
				liuruzij_bnet_ul:{"top":65.5,"left":31.7,color:"#72d427"},
				liucuzij_bnet_dl:{"top":80,"left":30.7,color:"#3399ff"},
				flow:{"top":76,"left":79,color:"#72d427"},
				flow_ul:{"top":22,"left":79,color:"#72d427"}
			/*	if_in_utility_bnet_ul:{"top":34.5,"left":82,color:"#72d427"},
				if_in_utility_bnet_dl:{"top":52.5,"left":80.5,color:"#3399ff"},
				max_if_in_utility_bnet_ul:{"top":57.5,"left":70.5,color:"#72d427"},
				max_if_in_utility_bnet_dl:{"top":74.5,"left":68.5,color:"#3399ff"},*/
		}
		var Family=JSON.stringify(Coordinate);
		return Family;
	},
	
	/*
	 * CMNET坐标
	 */
	CMNETModelCoordinate:function(){
		var Coordinate={
				liuruzij_3rd_ul:{"top":189,"left":482,color:"#72d427"},
				liucuzij_3rd_dl:{"top":269,"left":460,color:"#3399ff"},
				if_in_utility_3rd_ul:{"top":343,"left":280,color:"#72d427"},
				if_in_utility_3rd_dl:{"top":416,"left":280,color:"#3399ff"},
				liuruzij_bnet_ul:{"top":759,"left":450,color:"#72d427"},
				liucuzij_bnet_dl:{"top":829,"left":450,color:"#3399ff"},
				if_in_utility_bnet_ul:{"top":583,"left":276,color:"#72d427"},
				if_in_utility_bnet_dl:{"top":656,"left":276,color:"#3399ff"},
				flow:{"top":336,"left":1156,color:"#72d427"},
				flow_ul:{"top":656,"left":1206,color:"#72d427"}
		}
		var Family=JSON.stringify(Coordinate);
		return Family;
	},
	/*
	 * 全网政企
	 */
	Gavbe:function(){
		var Gavbe={
				cust_nums:{id:"cust_nums",text:"集团客户",unitHandler:function(){},company:"(万个)",auxiliary:"集团客户",company_auxiliary:"万个",bz_company_auxiliary:"个",threshold:"2"},
				line_nums:{id:"line_nums",text:"集团专线",unitHandler:function(){},company:"(万条)",auxiliary:"集团专线",company_auxiliary:"万条",bz_company_auxiliary:"条",threshold:"2"},
				fault_cust_nums:{id:"fault_cust_nums",text:"故障客户",unitHandler:function(){},company:"(个)",auxiliary:"故障客户",company_auxiliary:"个",bz_company_auxiliary:"个",threshold:"2"},
				fault_line_nums:{id:"fault_line_nums",text:"故障专线",unitHandler:function(){},company:"(条)",auxiliary:"故障专线",company_auxiliary:"条",bz_company_auxiliary:"条",threshold:"2"},
				iot_customer_nums:{id:"iot_customer_nums",text:"物联网客户数",unitHandler:function(){},company:"(万个)",auxiliary:"物联网客户数",company_auxiliary:"万个",bz_company_auxiliary:"个",threshold:"2"},
				iot_card_nums:{id:"iot_card_nums",text:"物联网发卡量",unitHandler:function(){},company:"(万张)",auxiliary:"物联网发卡量",company_auxiliary:"万张",bz_company_auxiliary:"个",threshold:"2"},
				iot_card_act_nums:{id:"iot_card_act_nums",text:"物联网活跃用户数",unitHandler:function(){},company:"(万人)",auxiliary:"物联网活跃用户数",company_auxiliary:"万人",bz_company_auxiliary:"个",threshold:"2"}
		}
		var Gavbe=JSON.stringify(Gavbe);
		return Gavbe;
	},
	/*
	 * 计算比例
	 * 
	 */
	proportion:function(company,value,valuehb){
		var proportion={};
		if(!utils.isStringEmpty(value)&&!utils.isStringEmpty(valuehb)){
			value=value*100;
			valuehb=valuehb*100;
		}
		if(company=="(%)"){
			if(!utils.isStringEmpty(valuehb)){
				if(value>valuehb&&valuehb>0&&value>0){
					proportion.value_auxiliary=((parseInt(value)-parseInt(valuehb))/100);
					proportion.value=((parseInt(value)-parseInt(valuehb))/100)+"%";proportion.bool=0;
				}else if(value<valuehb&&valuehb>0&&value>0){
					proportion.value_auxiliary=((parseInt(value)-parseInt(valuehb))*-1/100);
					proportion.value=((parseInt(value)-parseInt(valuehb))*-1/100)+"%";proportion.bool=1;
				}else{proportion.value="0%";proportion.bool=2;proportion.value_auxiliary="0"}
			}else{proportion.value="---";proportion.bool=2;proportion.value_auxiliary="0"}
		}else{
			if(!utils.isStringEmpty(valuehb)){
				if(value>valuehb&&valuehb>0&&value>0){
					proportion.value_auxiliary=(utils.changeTwoDecimal((parseInt(value)/parseInt(valuehb)-1)*100));
					proportion.value=(utils.changeTwoDecimal((parseInt(value)/parseInt(valuehb)-1)*100))+"%";proportion.bool=0;
				}else if(value<valuehb&&valuehb>0&&value>0){
					proportion.value_auxiliary=(utils.changeTwoDecimal((1-(parseInt(value)/parseInt(valuehb)))*100));
					proportion.value=(utils.changeTwoDecimal((1-(parseInt(value)/parseInt(valuehb)))*100))+"%";proportion.bool=1;
				}else{proportion.value="0%";proportion.bool=2;proportion.value_auxiliary="0"}
			}else{proportion.value="---";proportion.bool=2;proportion.value_auxiliary="0"}
		}
		return proportion;
	}, 
	/*
	 * 转换单位
	 * 
	 */
	conversion:function(company,value){
		var Erl="";
		if(!utils.isStringEmpty(value)){
			if(isNaN(value)){
				Erl="";
			}else{
				if(company=="(%)"&&value==100){
					Erl=value;
				}else if(value=="---"||value=="--"||value=="----"){
					Erl=value;
				}else{
					switch(company){
					case "(万Erl)":
						Erl=utils.changeTwoDecimal(parseInt(value)/10000,1);
						break;
					case "(亿Erl)":
						Erl=utils.changeTwoDecimal(parseInt(value)/100000000,1);
						break;
					case "(Erl)":
						Erl=utils.changeTwoDecimal(value,1);
						break;
					case "(万人)":
						Erl=utils.changeTwoDecimal(parseInt(value)/10000,1);
						break;
					case "(人)":
						Erl=value;
						break;
					case "(万张)":
						Erl=utils.changeTwoDecimal(parseInt(value)/10000,1);
						break;
					case "(万个)":
						Erl=utils.changeTwoDecimal(parseInt(value)/10000,1);
						break;
					case "(个)":
						Erl=utils.changeTwoDecimal(parseInt(value));
						break;
					case "(KB)":
						Erl=utils.changeTwoDecimal(value,1);
						break;
					case "(MB)":
						Erl=utils.changeTwoDecimal(parseInt(value)/1024,1);
						break;
					case "(GB)":
						Erl=utils.changeTwoDecimal(parseInt(value)/1048576,1);
						break;
					case "(TB)":
						Erl=utils.changeTwoDecimal(parseInt(value)/1073741824,1);
						break;
					case "(%)":
						Erl=utils.changeTwoDecimal(value);
						break;
					case "(ms)":
						Erl=utils.changeTwoDecimal(value,1);
						break;
					case "(us)":
						Erl=parseInt(utils.changeTwoDecimal(parseInt(value)/1000,1));
						break;
					case "(万条)":
						Erl=utils.changeTwoDecimal(parseInt(value)/10000,1);
						break;
					case "(条)":
						Erl=utils.changeTwoDecimal(parseInt(value),1);
						break;
					case "(Mbps)":
						Erl=utils.changeTwoDecimal(parseInt(value)/1024,1);
						break;
					case "(Kbps)":
						Erl=utils.changeTwoDecimal(value,1);
						break;
					default:
						Erl=value;
						break;
					}	
				}
			}
			
		}else{
			Erl="---";	
		}
		return Erl;
	},
	//全网屏蔽
	shield:function(){
		var shield={};
		shield={
				placeholder:"placeholder",
				s_015:"s_015",
				user_cnt:"user_cnt",
				sjmy:"sjmy",
				s_206:"s_206",
				s_213:"s_213",
				/*s_123:"s_123"*/
		}
		return shield;
	},
	//全网屏蔽（-g）
	shield_g:function(){
		var shield={};
		shield={
				placeholder:"placeholder"
		}
		return shield;
	},
	Wireless_shield_g:function(){
		var shield={};
		shield={
				placeholder:"placeholder"
		}
		return shield;
	},
	//局部屏蔽
	_shield:function(){
		var shield={};
		shield={
				placeholder:"placeholder",
				s_015:"s_015",
				s_206:"s_206",
				s_213:"s_213",
		}
		return shield;
	},
	// 家庭屏蔽
	Family_shield:function(){
		var shield={};
		shield={
				placeholder:"placeholder",
				opened_user_cnt:"opened_user_cnt",
				olt_order_cnt:"olt_order_cnt",
				tv_jammed_user_ratio:"tv_jammed_user_ratio",
				ouotc:"ouotc",
		}
		return shield;
	},
	//重要网站屏蔽
	Website_shield:function(){
		var shield={};
		shield={
				placeholder:"placeholder",
		}
		return shield;
	},
	//政企业务屏蔽
	Gavbe_shield:function(){
		var shield={};
		shield={
				placeholder:"placeholder",
		}
		return shield;
	},
	//政企业务颜色
	Gavbe_color:function(id,value){
		var color="#66e6ff";
		if(id=="fault_cust_nums"&&value>0){
			color="#da6d6d";
		}else if(id=="fault_line_nums"&&value>0){
			color="#da6d6d";
		}else if(id=="cust_nums"&&value>0){
			color="#72d427";
		}else if(id=="line_nums"&&value>0){
			color="#72d427";
		}
		return color;
	},
	  //日期转换毫秒数
    starttimeHaoMiao :function(begintime){
    	var t = Date.parse(begintime.replace(/-/g, "/"));
    	if (!isNaN(t)) {
	        return new Date(Date.parse(begintime.replace(/-/g, "/")));
	    } else {
	        return new Date();
	    }
    },
    
	//获取今天后几分钟或前几分钟的日期 Minutes 大于0 表示后几分钟，小于0 表示前几分钟
	getNowstrhourOfgetMinutes:function(time,hour,separ1,separ2,time_bool){
		var myDate = pmars.starttimeHaoMiao(time);
		var min=parseInt(myDate.getMinutes())%5;
		if(time_bool==true){
			myDate.setMinutes(myDate.strDate()-1);
			if(myDate.getDate()==0){
				myDate.setMinutes(myDate.getMonth()-1);
			}
		}
		if(parseInt(myDate.getMinutes())%5==0){
			myDate.setMinutes(myDate.getMinutes()+ hour);
		}else{
			myDate.setMinutes(myDate.getMinutes()+ (hour-min));
		}
		var stryear = myDate.getFullYear();//获取完整的年份(4位,1970-????)
		var strMonth = myDate.getMonth()+1;       //获取当前月份(0-11,0代表1月)
		var strDate = myDate.getDate();        //获取当前日(1-31)
		var strhour = myDate.getHours(); //获取当前小时数(0-23)
		var strm = myDate.getMinutes();     //获取当前分钟数(0-59)
		var strs = myDate.getSeconds();     //获取当前秒数(0-59)
		return stryear+separ1+utils.leftPad(strMonth,2)+separ1+utils.leftPad(strDate,2)
		+" "+utils.leftPad(strhour,2)+separ2+utils.leftPad(strm,2)+separ2+"00";
	},
	InterceptionTime:function(time,Tparticle){
		var Interception="";
		if(Tparticle>=525600){
			Interception=time.substring(0, 4);
		}else if(Tparticle>=40320){
			Interception=time.substring(5, 7);
		}else if(Tparticle>=1440){
			Interception=time.substring(5, 10);
		}else if(Tparticle>=60){
			Interception=time.substring(11, 16);
		}else if(Tparticle>=1){
			Interception=time.substring(11, 16);
		}else if(Tparticle==0){
			Interception=time.substring(11, 16);
		}
		return Interception;
	},
	TrendUrl:function(name){
		var url="";
		switch(name){
		case "":
			url="/static/images/overview/qst.png";
			break;
		default:
			url="/static/images/overview/qst.png";
			break;
		}
		return url;
	},
	classification:function(value){
		var classification="";
		switch(value){
		case "bz_ydyw":
			classification=["LeftTwo_name","_yd_Model","_shield","ydyw"];
			break;
		case "bz_zywz":
			classification=["Website","_zywz_Model","Website_shield","zywz"];
			break;
		case "qw_zqyw":
			classification=["Gavbe","_zqyw_Model","Gavbe_shield","zqyw"];
			break;
		case "qw_ydyw":
			classification=["Left_name","_Model","shield","ydyw"];
			break;
		case "qw_jtyw":
			classification=["Family","_jtyw_Model","Family_shield","jtyw"];
			break;
		case "ydyw_g_div":
			classification=["Left_name_g","_ydyw_g_Model","shield_g","ydyw_g"];
			break;
		default:
			classification="";
			break;
		}	
		return classification;
	},
	//分类
	classification_all:function(id){
		var classification={
			s_209:{classification:"用户数",name:"4G用户数",Belonged:"全网"},
			s_091:{classification:"用户数",name:"用户数",Belonged:"全网"},
			s_263:{classification:"用户数",name:"4G用户数",Belonged:"全网"},
			s_019:{classification:"用户数",name:"2G用户数",Belonged:"全网"},
			s_262:{classification:"用户数",name:"4G+用户数",Belonged:"全网"},
			vsruc:{classification:"用户数",name:"volte注册用户数",Belonged:"全网"},
			mme_sub_nbrsub:{classification:"用户数",name:"LTE附着用户数",Belonged:"全网"},
			msc_subscrib_in_vlr:{classification:"用户数",name:"VLR用户数",Belonged:"全网"},
			inter_roam_in_user_num:{classification:"用户数",name:"国漫用户数",Belonged:"全网"},
			prov_roam_in_user_num:{classification:"用户数",name:"省漫用户数",Belonged:"全网"},
			s_261:{classification:"用户数",name:"即时通信活跃用户数",Belonged:"全网"},
			ydylgj:{classification:"用户数",name:"一带一路漫入用户数",Belonged:"全网"},
			hwl:{classification:"业务量",name:"话务量",Belonged:"全网"},
			hwl2:{classification:"业务量",name:"话务量",Belonged:"全网"},
			s_083:{classification:"业务量",name:"流量",Belonged:"全网"},
			gsm_flow_all:{classification:"业务量",name:"2G流量",Belonged:"全网"},
			lte_flow_all:{classification:"业务量",name:"4G流量",Belonged:"全网"},
			gsm_teletraffic:{classification:"业务量",name:"2G话务量",Belonged:"全网"},
			volte_teletraffic:{classification:"业务量",name:"volte话务量",Belonged:"全网"},
			lte_prb_use_ratio:{classification:"上网质量",name:"4G无线利用率",Belonged:"全网"},
			lte_wireless_conn_ratio:{classification:"上网质量",name:"4G无线接通率",Belonged:"全网"},
			lte_wireless_drop_ratio:{classification:"上网质量",name:"4G无线掉线率",Belonged:"全网"},
			mr_coverage_ratio:{classification:"上网质量",name:"MR覆盖率",Belonged:"全网"},
			volte_esrvcc_sw_succ_ratio:{classification:"语音质量",name:"eSRVCC切换成功率",Belonged:"全网"},
			volte_voice_sw_succ_ratio:{classification:"语音质量",name:"VoLTE切换成功率",Belonged:"全网"},
			volte_voice_drop_ratio:{classification:"语音质量",name:"VoLTE掉线率",Belonged:"全网"},
			volte_voice_conn_ratio:{classification:"语音质量",name:"VoLTE接通率",Belonged:"全网"},
			gsm_wireless_use_ratio:{classification:"语音质量",name:"GSM无线利用率",Belonged:"全网"},
			gsm_wireless_conn_ratio:{classification:"语音质量",name:"GSM无线接通率",Belonged:"全网"},
			gsm_wireless_drop_ratio:{classification:"语音质量",name:"GSM无线掉话率",Belonged:"全网"},
			pdn_conn_succ_ratio:{classification:"核心网质量",name:"PDN连接建立成功率",Belonged:"全网"},
			csmt_fall_back_succ_ratio:{classification:"核心网质量",name:"CSMT回落成功率",Belonged:"全网"},
			lte_sw_succ_ratio:{classification:"核心网质量",name:"4G切换成功率",Belonged:"全网"},
			lte_attach_suc_ratio:{classification:"核心网质量",name:"4G附着成功率",Belonged:"全网"},
			mme_sw_succ_ratio:{classification:"核心网质量",name:"MME切换成功率",Belonged:"全网"},
			tau_update_succ_ratio:{classification:"核心网质量",name:"TAU更新成功率",Belonged:"全网"},
			pgw_charging_succ_ratio:{classification:"核心网质量",name:"PGW计费请求成功率",Belonged:"全网"},
			vl_ims_reg_succrate:{classification:"核心网质量",name:"VOLTE初始注册成功率",Belonged:"全网"},
			lte_ul_prb_use_ratio:{classification:"利用率",name:"LTE上行PRB利用率",Belonged:"全网"},
			lte_dl_prb_use_ratio:{classification:"利用率",name:"LTE下行PRB利用率",Belonged:"全网"},
			s_006:{classification:"业务感知",name:"TCP成功率",Belonged:"全网"},
			s_178:{classification:"业务感知",name:"TCP二三次握手成功率",Belonged:"全网"},
			s_027:{classification:"业务感知",name:"HTTP请求成功率",Belonged:"全网"},
			s_139:{classification:"业务感知",name:"HTTP响应时延",Belonged:"全网"},
			s_135:{classification:"业务感知",name:"即时通信HTTP时延",Belonged:"全网"},
			s_114:{classification:"业务感知",name:"即时通信HTTP成功率",Belonged:"全网"}
		}	
		var classification=JSON.stringify(classification);
		return classification;
	},
	classification_guarantee:function(id){
		var classification={
			s_019:{classification:"用户数",name:"2G用户数",Belonged:"场景"},
			s_091:{classification:"用户数",name:"用户数",Belonged:"场景"},
			s_263:{classification:"用户数",name:"4G用户数",Belonged:"场景"},
			s_209:{classification:"用户数",name:"4G用户数",Belonged:"场景"},
			s_262:{classification:"用户数",name:"4G+用户数",Belonged:"场景"},
			user_cnt:{classification:"用户数",name:"国际漫入用户数",Belonged:"场景"},
			s_261:{classification:"用户数",name:"即时通信活跃用户数",Belonged:"场景"},
			sjmy:{classification:"用户数",name:"省际漫入用户数",Belonged:"场景"},
			ydylgj:{classification:"用户数",name:"一带一路漫入用户数",Belonged:"场景"},
			s_083:{classification:"业务量",name:"数据流量",Belonged:"场景"},
			s_213:{classification:"业务量",name:"4G流量",Belonged:"场景"},
			hwl:{classification:"业务量",name:"话务量",Belonged:"场景"},
			hwl2:{classification:"业务量",name:"话务量",Belonged:"场景"},
			gsm_flow_all:{classification:"业务量",name:"2G流量",Belonged:"场景"},
			lte_flow_all:{classification:"业务量",name:"4G流量",Belonged:"场景"},
			gsm_teletraffic:{classification:"业务量",name:"2G话务量",Belonged:"场景"},
			volte_teletraffic:{classification:"业务量",name:"volte话务量",Belonged:"场景"},
			volte_voice_teletraffic:{classification:"业务量",name:"volte语音话务量",Belonged:"场景"},
			gsm_wireless_use_ratio:{classification:"业务质量",name:"GSM无线利用率",Belonged:"场景"},
			gsm_wireless_conn_ratio:{classification:"业务质量",name:"GSM无线接通率",Belonged:"场景"},
			gsm_wireless_drop_ratio:{classification:"业务质量",name:"GSM无线掉话率",Belonged:"场景"},
			lte_prb_use_ratio:{classification:"业务质量",name:"4G无线利用率",Belonged:"场景"},
			lte_wireless_conn_ratio:{classification:"业务质量",name:"4G无线接通率",Belonged:"场景"},
			lte_wireless_drop_ratio:{classification:"业务质量",name:"4G无线掉线率",Belonged:"场景"},
			lte_sw_succ_ratio:{classification:"业务质量",name:"4G切换成功率",Belonged:"场景"},
			lte_attach_suc_ratio:{classification:"业务质量",name:"4G附着成功率",Belonged:"场景"},
			lte_ul_prb_use_ratio:{classification:"业务质量",name:"LTE上行PRB利用率",Belonged:"场景"},
			lte_dl_prb_use_ratio:{classification:"业务质量",name:"LTE下行PRB利用率",Belonged:"场景"},
			mr_coverage_ratio:{classification:"业务质量",name:"MR覆盖率",Belonged:"场景"},
			s_123:{classification:"业务质量",name:"eSRVCC切换成功率",Belonged:"场景"},
			volte_sw_succ_ratio:{classification:"业务质量",name:"VoLTE切换成功率",Belonged:"场景"},
			vwdrc:{classification:"业务质量",name:"VoLTE掉线率",Belonged:"场景"},
			volte_voice_conn_ratio:{classification:"业务质量",name:"VoLTE接通率",Belonged:"场景"},
			volte_wireless_conn_ratio:{classification:"业务质量",name:"VoLTE接通率",Belonged:"场景"},
			volte_wireless_drop_ratio:{classification:"业务质量",name:"VoLTE掉线率",Belonged:"场景"},
			s_006:{classification:"业务感知",name:"TCP成功率",Belonged:"场景"},
			s_178:{classification:"业务感知",name:"TCP二三次握手成功率",Belonged:"场景"},
			s_027:{classification:"业务感知",name:"HTTP请求成功率",Belonged:"场景"},
			s_139:{classification:"业务感知",name:"HTTP响应时延",Belonged:"场景"},
			s_135:{classification:"业务感知",name:"即时通信HTTP时延",Belonged:"场景"},
			s_114:{classification:"业务感知",name:"即时通信HTTP成功率",Belonged:"场景"},
			placeholder:{classification:"",name:"占位符",Belonged:""}
		}	
		var classification=JSON.stringify(classification);
		return classification;
	},
	PeopleConversion:function(velue){
		var json={};
		if(velue>10000){
			json.value=pmars.conversion("(万人)",velue);
			json.company="万人";
			json.length=true;
		}else{
			json.value=utils.Thousand(velue);
			json.company="人";
			json.length=false;
		}
		return json;
	},
	FlowConversion:function(velue){
		var json={};
		if(velue>1024*1024*1024){
			json.value=pmars.conversion("(TB)",velue);
			json.company="TB";
		}else if(velue>1024*1024){
			json.value=pmars.conversion("(GB)",velue);
			json.company="GB";
		}else if(velue>1024){
			json.value=pmars.conversion("(MB)",velue);
			json.company="MB";
		}else{
			json.value=pmars.conversion("(KB)",velue);
			json.company="KB";
		}
		return json;
	},
	NumberConversion:function(velue){
		var json={};
		if(velue>10000){
			json.value=pmars.conversion("(万个)",velue);
			json.company="万个";
		}else{
			json.value=utils.Thousand(velue);
			json.company="个";
		}
		return json;
	},
	ErlConversion:function(velue){
		var json={};
		if(velue>10000){
			json.value=pmars.conversion("(万Erl)",velue);
			json.company="万Erl";
		}else{
			json.value=pmars.conversion("(Erl)",velue);
			json.company="Erl";
		}
		return json;
	},
}