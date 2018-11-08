var CIIENEW=CIIENEW||{};
CIIENEW.Roam=function ()
{
	this.initialize.apply(this,arguments);
};
CIIENEW.Roam.prototype.constructor=CIIENEW.Roam;
CIIENEW.Roam.prototype.hotspot='';
CIIENEW.Roam.prototype.dm=null;
CIIENEW.Roam.prototype.cdm=null;
CIIENEW.Roam.prototype.hotspotList=[];
CIIENEW.Roam.prototype.startIndex=0;
CIIENEW.Roam.prototype.selectedHot=null;
CIIENEW.Roam.prototype.lineWidth=3;
CIIENEW.Roam.prototype.chartLabelSize=24;
CIIENEW.Roam.prototype.trendType='intl';
CIIENEW.Roam.prototype.roamType='intl';
CIIENEW.Roam.prototype.countryMap={
		'阿尔巴尼亚':'Albania',
		'阿根廷':'Argentina',
		'阿拉伯联合酋长国':'UAE',
		'阿曼':'Omen',
		'阿塞拜疆':'Azerbaijan',
		'埃及':'Egypt',
		'爱尔兰共和国':'Ireland',
		'爱沙尼亚':'Estonia',
		'奥地利':'Austria',
		'澳洲':'Australia',
		'澳大利亚':'Australia',
		'巴基斯坦':'Pakistan',
		'巴勒斯坦':'Palestine',
		'巴林':'Bahrain',
		'巴西':'Brazil',
		'保加利亚':'Bulgaria',
		'比利时':'Belgium',
		'冰岛':'Iceland',
		'波兰':'poland',
		'丹麦':'Denmark',
		'德国':'Germany',
		'俄罗斯':'Russia',
		'厄瓜多尔':'Ecuador',
		'法国':'France',
		'菲律宾':'Philippines',
		'斐济群岛':'Fiji',
		'芬兰':'Finland',
		'哥伦比亚':'Columbia',
		'哈萨克':'Kazakhstan',
		'韩国':'Korea',
		'荷兰':'Netherlands',
		'黑山共和国':'Montenegro',
		'加拿大':'Canada',
		'柬埔寨':'Cambodia',
		'捷克':'Czech',
		'卡达':'Kata',
		'科威特':'Kuwait',
		'克罗地亚':'Croatia',
		'拉脱维亚':'Latvia',
		'立陶宛':'Lithuania',
		'卢森堡':'Luxembourg',
		'罗马尼亚':'Romania',
		'马耳他':'Malta',
		'马来西亚':'Malaysia',
		'美国':'America',
		'秘鲁':'Peru',
		'缅甸':'Myanmar',
		'墨西哥':'Mexico',
		'尼泊尔':'Nepal',
		'挪威':'Norway',
		'葡萄牙':'Portugal',
		'日本':'Japan',
		'瑞典':'Sweden',
		'瑞士':'Switzerland',
		'塞浦路斯':'Cyprus',
		'沙特阿拉伯':'SaudiArabia',
		'斯里兰卡':'SriLanka',
		'斯洛文尼亚':'Slovenia',
		'泰国':'Thailand',
		'土耳其':'Turkey',
		'文莱':'Brunei',
		'乌克兰':'Ukraine',
		'乌拉圭':'Uruguay',
		'西班牙':'Spain',
		'希腊':'Greece',
		'新加坡':'Singapore',
		'新西兰':'NewZealand',
		'匈牙利':'Hungary',
		'亚美尼亚':'Armenia',
		'伊朗':'Iran',
		'意大利':'Italy',
		'印度':'India',
		'印度尼西亚':'Indonesia',
		'英国':'Britain',
		'越南':'Vietnam',
		'香港':'China',
		'澳门':'China',
		'台湾':'China'
};
CIIENEW.Roam.prototype.provinceMap={
	'安徽':'anhui.png',
	'澳门':'aomen.png',
	'北京':'beijing.png',
	'重庆':'chongqing.png',
	'福建':'fujian.png',
	'甘肃':'gansu.png',
	'广东':'guangdong.png',
	'广西':'guangxi.png',
	'贵州':'guizhou.png',
	'海南':'hainan.png',
	'河北':'hebei.png',
	'黑龙江':'heilongjiang.png',
	'河南':'henan.png',
	'湖北':'hubei.png',
	'湖南':'hunan.png',
	'江苏':'jiangsu.png',
	'江西':'jiangxi.png',
	'吉林':'jilin.png',
	'辽宁':'liaoning.png',
	'内蒙古':'neimenggu.png',
	'宁夏':'ningxia.png',
	'青海':'qinghai.png',
	'山东':'shandong.png',
	'上海':'shanghai.png',
	'陕西':'shannnxi.png',
	'山西':'shanxi.png',
	'四川':'sichuan.png',
	'台湾':'taiwan.png',
	'天津':'tianjin.png',
	'香港':'xianggang.png',
	'新疆':'xinjiang.png',
	'西藏':'xizang.png',
	'云南':'yunnan.png',
	'浙江':'zhejiang.png'
};
var Situation={};
Situation.roamType="intl";
Situation.hotspot_Bool=true;
CIIENEW.Roam.prototype.initialize=function(_hotspot){
	if(_hotspot!=null){
		this.hotspot=_hotspot;
	}
	this.dm=LSMScreen.DataManager.getInstance();
	this.cdm=LSMScreen.CacheDataManager.getInstance();
	require(['echarts','echarts/chart/line'],this.initEcharts.bind(this));
};
CIIENEW.Roam.prototype.initEcharts=function(ec){
	this.ec=echarts=ec;
	this.ec=echarts;
	setInterval(this.update.bind(this),300*1000);
	setInterval(this.ECARTS.bind(this),300*1000);
	$('.roamTypeBlock').on('click',this.roamTypeBlockClick.bind(this));
	$('#room_g_return').on('click',this.returns.bind(this));
	this.update();
};	
CIIENEW.Roam.prototype.roamTypeBlockClick=function(e){
	this.trendType=$(e.currentTarget).attr('trendType');
	this.updateIntlTrend();
};
CIIENEW.Roam.prototype.returns=function(){
	if(Situation.roamType=='intl'){$('#room_g_div_span').text('国际漫入用户流量');}
	else if(Situation.roamType=='pro'){$('#room_g_div_span').text('省际漫入用户流量');}
}
CIIENEW.Roam.prototype.update=function(){
	Situation.Company="";
	Situation.hotspot_Bool=true;
	if(this.hotspot=="上海"){this.hotspot="";}
	this.intl_name=LSMScreen.CacheDataManager.roadCountry;
	this.cdm.getUserDistAll({hot_name:this.hotspot},this.UserDistAll.bind(this));
	Situation.hotspot=this.hotspot;
	this.ECARTS(this);
	if(this.roamType=='intl'){$('#traffic_intl_span').text('国际漫入用户数');}
	else if(this.roamType=='pro'){$('#traffic_intl_span').text('省际漫入用户数');}
};
CIIENEW.Roam.prototype.updateTopN=function(){
	Situation.Trend={};
	Situation.TrendBool=[];
	var hotspot=Situation.hotspot;
	if(hotspot=="上海"){hotspot="";}
	Situation.roamType=this.roamType;
	if(this.roamType=='intl'){this.cdm.getIntlRoamInTrend({intl_name:null,hot_name:hotspot},this.Situation.bind(this));}
	else if(this.roamType=='pro'){this.cdm.getProvRoamInTrend({intl_name:null,hot_name:hotspot},this.Situation.bind(this));}
	
	if(this.roamType=='intl'){this.cdm.getIntlRoamIn({intl_name:null,hot_name:hotspot},this.RoamIn.bind(this));}
	else if(this.roamType=='pro'){this.cdm.getProvRoamIn({intl_name:null,hot_name:hotspot},this.RoamIn.bind(this));}
	
	if(Situation.hotspot_Bool==true&&utils.isStringEmpty(hotspot)){
		Situation.hotspot_Bool=false;
		this.cdm.getIsmAllltewgTrend({},this.wgTrend.bind(this));this.cdm.getIsmAllltewg({},this.wg.bind(this));}
	else{
		if(this.roamType=='intl'){this.cdm.getNewRoamInTrend({type:"intl",hotspot:hotspot},this.TrafficIntl.bind(this));}
		else if(this.roamType=='pro'){this.cdm.getNewRoamInTrend({type:"pro",hotspot:hotspot},this.TrafficIntl.bind(this));}}
	this.DataHandler(this);
};

CIIENEW.Roam.prototype.Situation=function(result){
	Situation.Trend.bytes=result.data;
	Situation.TrendBool[1]=true;
}
CIIENEW.Roam.prototype.UserDistAll=function(result){
	Situation.UserDistBool=true;
	Situation.UserDist=result.data;
	this.UserDistAlls(result);
	
}
CIIENEW.Roam.prototype.RoamIn=function(result){
	var record=result.data;
	if(!utils.isStringEmpty(this.hotspot)){
		record=result.data[this.hotspot];
	}
	Situation.Hotintl=record;
	Situation.TrendBool[4]=true;
	for(var key in record){
		$('#'+key).text(record[key]);
	}
}
CIIENEW.Roam.prototype.DataHandler=function(result){
	if(result.roamType=='intl'){$('#room_g_div_span').text('国际漫入用户流量');}
	else if(result.roamType=='pro'){$('#room_g_div_span').text('省际漫入用户流量');}
	Situation.DataHandler=true;
	this.returns();
};
CIIENEW.Roam.prototype.ECARTS=function(result){
	var parameter=eval("("+pmars.room_g()+")");
	var parameter_name=utils.getJsonName(parameter);
	var Ecarts_2=setInterval(function() {
		if(Situation.DataHandler==true){
			var t=0
			for(var q=0;q<Situation.TrendBool.length;q++){
				if(Situation.TrendBool[q]==true){t++;}
			}
			if(t>=2){
				Situation.TrendBool=[];
				window.clearInterval(Ecarts_2);
				if(Situation.Hotintl.bytesdist<0.1){
					var value0=Situation.Hotintl.bytesdist*1024;
					$("#room_g_ecarts_val2").html("今日累计值:"+pmars.conversion("(Kbps)",value0)+"GB");
				}else{
					$("#room_g_ecarts_val2").html("今日累计值:"+pmars.conversion("(Kbps)",Situation.Hotintl.bytesdist)+"TB");
				}
				$("#room_g_ecarts_val").html("当前值:"+Situation.Hotintl.bytes+parameter.bytes.company_auxiliary);
				result.drawIntlTrend(Situation.Trend.bytes);
			}
		}
	}, 100);
};
CIIENEW.Roam.prototype.wg=function(result){
	var record=result.data;
	if(!utils.isStringEmpty(this.hotspot)){record=result.data[this.hotspot];}
	var company0="";var company1="";var value0="";var value1="";
	var json2=pmars.PeopleConversion(record.inter_roam_in_user_num);//国际漫入
	value1=json2.value;company1=json2.company;
	var json1=pmars.PeopleConversion(record.prov_roam_in_user_num);//省际漫入
	value0=json1.value;company0=json1.company;
	//日累计
	if(utils.isStringEmpty(this.hotspot)){
		Situation.roamSelectors={};
		Situation.roamSelectors.intl_g=value1;
		Situation.roamSelectors.intl_g_dw=company1;
		Situation.roamSelectors.pro_g=value0;
		Situation.roamSelectors.pro_g_dw=company0;
		$('#roamSelectors_intl_g').text(value1);
		$('#roamSelectors_intl_g_dw').text(company1);
		$('#roamSelectors_pro_g').text(value0);
		$('#roamSelectors_pro_g_dw').text(company0);
	}
}
CIIENEW.Roam.prototype.wgTrend=function(result){
	var record=result.data;
	if(!utils.isStringEmpty(this.hotspot)){
		record=result.data[this.hotspot];
	}
	if(Situation.roamType=="intl"){
		this.drawTrafficIntl("inter_roam_in_user_num",record,"(万人)");
		$("#traffic_intl_span").html("国际漫入用户数");
	}else if(Situation.roamType=="pro"){
		this.drawTrafficIntl("prov_roam_in_user_num",record,"(万人)");
		$("#traffic_intl_span").html("省际漫入用户数");
	}
}
CIIENEW.Roam.prototype.toThousand=function(num){
	var num = (num || 0).toString(), re = /\d{3}$/, result = '';
    while ( re.test(num) ) {
        result = RegExp.lastMatch + result;
        if (num !== RegExp.lastMatch) {
            result = ',' + result;
            num = RegExp.leftContext;
        } else {
            num = '';
            break;
        }
    }
    if (num) { result = num + result; }
    return result;
}
CIIENEW.Roam.prototype.updateIntlTrend=function(){
	var value0="";var value1="";var company0="";var company1="";
	if(this.trendType=='intl'){
		var json1=pmars.PeopleConversion(Situation.UserDist.intl.user_cnt);//当前
		value0=json1.value;company0=json1.company;
		var json2=pmars.PeopleConversion(Situation.UserDist.intl.user_cnt_dist);//累计
		value1=json2.value;company1=json2.company;
		$('#traffic_intl_span').text('国际及港澳台漫入用户数');
		$('#traffic_intl_ecarts_val').text("当前值:"+value0+company0);
		this.cdm.getNewRoamInTrend({type:"intl",hotspot:this.hotspot},this.TrafficIntl.bind(this));
	}else if(this.trendType=='road'){
		var json1=pmars.PeopleConversion(Situation.UserDist.intl_ys.user_cnt);//当前
		value0=json1.value;company0=json1.company;
		var json2=pmars.PeopleConversion(Situation.UserDist.intl_ys.user_cnt_dist);//累计
		value1=json2.value;company1=json2.company;
		$('#traffic_intl_span').text('元首参会国漫入用户数');
		$('#traffic_intl_ecarts_val').text("当前值:"+value0+company0);
		this.cdm.getNewRoamInTrend({type:"intl_ys",hotspot:this.hotspot},this.TrafficIntl.bind(this));
	}else if(this.trendType=='pro'){
		var json1=pmars.PeopleConversion(Situation.UserDist.pro.user_cnt);//当前
		value0=json1.value;company0=json1.company;
		var json2=pmars.PeopleConversion(Situation.UserDist.pro.user_cnt_dist);//累计
		value1=json2.value;company1=json2.company;
		$('#traffic_intl_span').text('省际漫入用户数');
		$('#traffic_intl_ecarts_val').text("当前值:"+value0+company0);
		this.cdm.getNewRoamInTrend({type:"pro",hotspot:this.hotspot},this.TrafficIntl.bind(this));
	}else if(this.trendType=='intl_czg'){
		var json1=pmars.PeopleConversion(Situation.UserDist.intl_czg.user_cnt);//当前
		value0=json1.value;company0=json1.company;
		var json2=pmars.PeopleConversion(Situation.UserDist.intl_czg.user_cnt_dist);//累计
		value1=json2.value;company1=json2.company;
		$('#traffic_intl_span').text('参展国漫入用户数');
		$('#traffic_intl_ecarts_val').text("当前值:"+value0+company0);
		this.cdm.getNewRoamInTrend({type:"intl_czg",hotspot:this.hotspot},this.TrafficIntl.bind(this));
	}
	Situation.Company=company0;
};
CIIENEW.Roam.prototype.TrafficIntl=function(record){
	this.drawTrafficIntl("user_cnt",record.data,"("+Situation.Company+")");
}
CIIENEW.Roam.prototype.UserDistAlls=function(all){
	if(all.success){
		var all=all.data;
		Situation.UserDistAll=all;
		if(!utils.isStringEmpty(all.intl)){
			var value_intl=all.intl.user_cnt;
			var tb_intl=all.intl.user_cnttb;
			var g2_uc=all.intl.g2_uc;
			var g4_uc=all.intl.g4_uc;
			var fdd_uc=all.intl.fdd_uc;
			var valueTxt_intl='--';
			var tbTxt_intl='--';
			var json=pmars.PeopleConversion(value_intl);//当前用户数
			$('#intlroamin').text(json.value);$('#intlroamin_dw').text(json.company);
			if(this.roamType=='intl'){$("#traffic_intl_ecarts_val").html("当前值:"+json.value+json.company);Situation.Company=json.company;}
			if(!utils.isStringEmpty(tb_intl)&&tb_intl!=0){
				tbTxt_intl=((value_intl-tb_intl)/tb_intl*100).toFixed(1);
			}
			$('#intlroamintb').text(tbTxt_intl);
			if(parseInt(tbTxt_intl)<0){
				$("#icon-up1").attr('class',"icon-down");
			}else{
				$("#icon-up1").attr('class',"icon-up");
			}
			var json=pmars.PeopleConversion(g2_uc);//2G用户数
			$('#intlroamin_g2_uc').text(json.value);$('#intlroamin_g2_uc_dw').text(json.company);
			var json=pmars.PeopleConversion(fdd_uc);//4G+用户数
			$('#intlroamin_g4_uc').text(json.value);$('#intlroamin_g4_uc_dw').text(json.company);
			var json=pmars.PeopleConversion((value_intl-fdd_uc-g2_uc));//4G用户数
			$('#intlroamin_fdd_uc').text(json.value);$('#intlroamin_fdd_uc_dw').text(json.company);
			if(!utils.isStringEmpty(this.hotspot)){
				var json=pmars.PeopleConversion(all.intl.user_cnt_dist);
				$('#roamSelectors_intl_g').text(json.value);$('#roamSelectors_intl_g_dw').text(json.company);
			}
		}
		if(!utils.isStringEmpty(all.pro)){
			var value_pro=all.pro.user_cnt;
			var tb_pro=all.pro.user_cnttb;
			var g2_uc=all.pro.g2_uc;
			var g4_uc=all.pro.g4_uc;
			var fdd_uc=all.pro.fdd_uc;
			var valueTxt_pro='--';
			var tbTxt_pro='--';
			var json=pmars.PeopleConversion(value_pro);//当前用户数
			$('#provroamin').text(json.value);$('#provroamin_dw').text(json.company);
			if(this.roamType=='pro'){$("#traffic_intl_ecarts_val").html("当前值:"+json.value+json.company);Situation.Company=json.company;}
			if(!utils.isStringEmpty(tb_pro)&&tb_pro!=0){
				tbTxt_pro=((value_pro-tb_pro)/tb_pro*100).toFixed(1);
			}
			if(parseInt(tbTxt_pro)<0){
				$("#icon-up2").attr('class',"icon-down");
			}else{
				$("#icon-up1").attr('class',"icon-up");
			}
			$('#provroamintb').text(tbTxt_pro);
			var json=pmars.PeopleConversion(g2_uc);//2G用户数
			$('#provroamin_g2_uc').text(json.value);$('#provroamin_g2_uc_dw').text(json.company);
			var json=pmars.PeopleConversion(fdd_uc);//4G+用户数
			$('#provroamin_fdd_uc').text(json.value);$('#provroamin_fdd_uc_dw').text(json.company);
			var json=pmars.PeopleConversion((value_pro-fdd_uc-g2_uc));//4G用户数
			$('#provroamin_g4_uc').text(json.value);$('#provroamin_g4_uc_dw').text(json.company);
			if(!utils.isStringEmpty(this.hotspot)){
				var json=pmars.PeopleConversion(all.pro.user_cnt_dist);
				$('#roamSelectors_pro_g').text(json.value);$('#roamSelectors_pro_g_dw').text(json.company);
			}
		}
		if(!utils.isStringEmpty(all.intl_ys)){
			var value_intl_ys=all.intl_ys.user_cnt;
			var tb_intl_ys=all.intl_ys.user_cnttb;
			var valueTxt_intl_ys='--';
			var tbTxt_intl_ys='--';
			var json=pmars.PeopleConversion(value_intl_ys);
			$('#roadroamin').text(json.value);$('#roadroamin_dw').text(json.company);
			if(!utils.isStringEmpty(tb_intl_ys)&&tb_intl_ys!=0){
				tbTxt_intl_ys=((value_intl_ys-tb_intl_ys)/tb_intl_ys*100).toFixed(1);
			}
			if(parseInt(tbTxt_intl_ys)<0){
				$("#icon-up3").attr('class',"icon-down");
			}else{
				$("#icon-up3").attr('class',"icon-up");
			}
			$('#roadroamintb').text(tbTxt_intl_ys);
			var json=pmars.PeopleConversion(all.intl_ys.user_cnt_dist);
			$('#roamSelectors_intl_ys_g').text(json.value);$('#roamSelectors_intl_ys_g_dw').text(json.company);
		}
		if(!utils.isStringEmpty(all.intl_czg)){
			var value_intl_czg=all.intl_czg.user_cnt;
			var tb_intl_ys=all.intl_czg.user_cnttb;
			var valueTxt_intl_ys='--';
			var tbTxt_intl_ys='--';
			var json=pmars.PeopleConversion(value_intl_czg);
			$('#czg').text(json.value);$('#czg_dw').text(json.company);
			if(!utils.isStringEmpty(tb_intl_ys)&&tb_intl_ys!=0){
				tbTxt_intl_ys=((value_intl_czg-tb_intl_ys)/tb_intl_ys*100).toFixed(1);
			}
			if(parseInt(tbTxt_intl_ys)<0){
				$("#icon-up3").attr('class',"icon-down");
			}else{
				$("#icon-up3").attr('class',"icon-up");
			}
			$('#czgtb').text(tbTxt_intl_ys);
			var json=pmars.PeopleConversion(all.intl_czg.user_cnt_dist);
			$('#roamSelectors_intl_czg_g').text(json.value);$('#roamSelectors_intl_czg_g_dw').text(json.company);
		}
	}
	this.updateTopN();
}
CIIENEW.Roam.prototype.drawIntlTrend=function(result){
	this.chart0=this.ec.init($("#room_g_ecarts")[0],'marcarons');
	var list=result;
	if(list==null){list=[];}
	var xArr=[];
	var userArr=[];
	var userArrLast=[];
	for(var i=0;i<list.length;i++){
		var record=list[i];
		xArr.push(record.time.substring(11,16));
		userArr.push(record.bytes==null?undefined:record.bytes);
		userArrLast.push(record.bytestb==null?undefined:record.bytestb);
	}
	var option = {
			color:['#ffa526','#1991e9','#1991e9'],
		    title : {
		        show:false
		    },
		    tooltip : {
		        trigger: 'axis'
		    },
		    legend: {
		    	x:'160',
		        data:['今日','6日'],
		        textStyle:{color:'#ffffff',fontSize:this.chartLabelSize}
		    },
		    toolbox: {
		        show : false
		    },
		    calculable : false,
		    animation:false,
	   		addDataAnimation: false,
		    grid:{borderWidth:0,x:100,y:30,x2:30,y2:40},
		    xAxis : [
		        {
		            type : 'category',
		            data : xArr,
		            axisLine:{show:true,lineStyle:{color:'#adc7dd'}},
		            axisLabel:{textStyle:{color:'#adc7dd',fontSize:this.chartLabelSize}},
		            splitLine:{show:false},
		            axisTick:{show:true,lineStyle:{color:'#adc7dd'}}
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            axisLine:{show:false},
		            splitLine:{show:false},
		            axisLabel:{textStyle:{color:'#adc7dd',fontSize:this.chartLabelSize}},
		            axisTick:{show:true,lineStyle:{color:'#adc7dd'}},
		            scale:true,
		            splitNumber:2,
		            min:0
		        }
		    ],
		    series : [{
	        	name:'今日',
	        	fontSize : 16,// 文字的字体大小
	            type:'line',
	            symbol:'emptyCircle',
	            data:userArr,
	            symbolSize:[5,5],
	            smooth:true,
	            itemStyle:{normal:{lineStyle:{width:this.lineWidth}}}
	        },{
		            name:'6日',
		        	fontSize : 16,// 文字的字体大小
		            type:'line',
		            symbol:'emptyCircle',
		            //showAllSymbol:true,
		            symbolSize:[5,5],
		            data:userArrLast,
		            smooth:true,
		            itemStyle:{normal:{lineStyle:{width:this.lineWidth},areaStyle:{color : 'rgba(25,145,233,0.3)'}}}
		    }]
		};
	this.chart0.setOption(option,true);
};
CIIENEW.Roam.prototype.drawTrafficIntl=function(id,result,company){
	this.chart0=this.ec.init($("#traffic_intl_ecarts")[0],'marcarons');
	var list=result;
	if(list==null){
		list=[];
	}
	var xArr=[];
	var userArr=[];
	var userArrLast=[];
	for(var i=0;i<list.length;i++){
		var record=list[i];
		xArr.push(record.time.substring(11,16));
		if(record[id]==null){record[id]=undefined} else {record[id]=pmars.conversion(company,record[id])};
		if(record[id+"tb"]==null) {record[id+"tb"]=undefined}  else  {record[id+"tb"]=pmars.conversion(company,record[id+"tb"])};
		userArr.push(record[id]);
		userArrLast.push(record[id+"tb"]);
	}
	var option = {
			color:['#ffa526','#1991e9','#1991e9'],
		    title : {
		        show:false
		    },
		    tooltip : {
		        trigger: 'axis'
		    },
		    legend: {
		    	x:'160',
		        data:['今日','6日'],
		        textStyle:{color:'#ffffff',fontSize:this.chartLabelSize}
		    },
		    toolbox: {
		        show : false
		    },
		    calculable : false,
		    animation:false,
	   		addDataAnimation: false,
		    grid:{borderWidth:0,x:100,y:30,x2:0,y2:60},
		    xAxis : [
		        {
		            type : 'category',
		            data : xArr,
		            axisLine:{show:true,lineStyle:{color:'#adc7dd'}},
		            axisLabel:{textStyle:{color:'#adc7dd',fontSize:this.chartLabelSize}},
		            splitLine:{show:false},
		            axisTick:{show:true,lineStyle:{color:'#adc7dd'}}
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            axisLine:{show:false},
		            splitLine:{show:false},
		            axisLabel:{textStyle:{color:'#adc7dd',fontSize:this.chartLabelSize}},
		            axisTick:{show:true,lineStyle:{color:'#adc7dd'}},
		            scale:true,
		            splitNumber:2,
		            min:0
		        }
		    ],
		    series : [{
	        	name:'今日',
	        	fontSize : 16,// 文字的字体大小
	            type:'line',
	            symbol:'emptyCircle',
	            data:userArr,
	            symbolSize:[5,5],
	            smooth:true,
	            itemStyle:{normal:{lineStyle:{width:this.lineWidth}}}
	        },{
		            name:'6日',
		        	fontSize : 16,// 文字的字体大小
		            type:'line',
		            symbol:'emptyCircle',
		            //showAllSymbol:true,
		            symbolSize:[5,5],
		            data:userArrLast,
		            smooth:true,
		            itemStyle:{normal:{lineStyle:{width:this.lineWidth},areaStyle:{color : 'rgba(25,145,233,0.3)'}}}
		    }]
		};
	this.chart0.setOption(option,true);
};
function  _onmouseover(obgect){
	 var attribute = eval("(" + Popoverposition.roam_g_left_yhs() + ")")[$(obgect).data("length")];
	 var g2_uc="";var g4_uc="";var fdd_uc="";var time1="";var source="";
	 obgect.id=obgect.id.replace("_id","");
	 if(obgect.id=="intlroamin"){
		value_intl=Situation.UserDistAll.intl.user_cnt;
		g2_uc=Situation.UserDistAll.intl.g2_uc;
		fdd_uc=Situation.UserDistAll.intl.fdd_uc;
		g4_uc=(value_intl-g2_uc-fdd_uc);
		source="信令";time1=pmars.getNowstrhourOfgetMinutes(Situation.UserDistAll.intl.time, 60* -1, "-", ":").substring(11, 16);
		time2=Situation.UserDistAll.intl.time.substring(11, 16);
	}else if(obgect.id=="provroamin"){
		value_pro=Situation.UserDistAll.pro.user_cnt;
		g2_uc=Situation.UserDistAll.pro.g2_uc;
		fdd_uc=Situation.UserDistAll.pro.fdd_uc;
		g4_uc=(value_pro-g2_uc-fdd_uc);
		source="信令";time1=pmars.getNowstrhourOfgetMinutes(Situation.UserDistAll.pro.time, 60* -1, "-", ":").substring(11, 16);
		time2=Situation.UserDistAll.pro.time.substring(11, 16);
	}else if(obgect.id=="roadroamin"){
		value_intl_ys=Situation.UserDistAll.intl_ys.user_cnt;
		g2_uc=Situation.UserDistAll.intl_ys.g2_uc;
		fdd_uc=Situation.UserDistAll.intl_ys.fdd_uc;
		g4_uc=(value_intl_ys-g2_uc-fdd_uc);
		source="信令";time1=pmars.getNowstrhourOfgetMinutes(Situation.UserDistAll.intl_ys.time, 60* -1, "-", ":").substring(11, 16);
		time2=Situation.UserDistAll.intl_ys.time.substring(11, 16);
	}else if(obgect.id=="czg"){
		value_intl_czg=Situation.UserDistAll.intl_czg.user_cnt;
		g2_uc=Situation.UserDistAll.intl_czg.g2_uc;
		fdd_uc=Situation.UserDistAll.intl_czg.fdd_uc;
		g4_uc=(value_intl_czg-g2_uc-fdd_uc);
		source="信令";time1=pmars.getNowstrhourOfgetMinutes(Situation.UserDistAll.intl_czg.time, 60* -1, "-", ":").substring(11, 16);
		time2=Situation.UserDistAll.intl_czg.time.substring(11, 16);
	}
	if(g2_uc>10000){g2_uc=pmars.conversion("(万人)",g2_uc)+"万人";}
	else{g2_uc=utils.Thousand(g2_uc)+"人";}
	if(g4_uc>10000){g4_uc=pmars.conversion("(万人)",g4_uc)+"万人";}
	else{g4_uc=utils.Thousand(g4_uc)+"人";}
	if(fdd_uc>10000){fdd_uc=pmars.conversion("(万人)",fdd_uc)+"万人";}
	else{fdd_uc=utils.Thousand(fdd_uc)+"人";}
	
	var html = '<div style="width:320px;height:240px !important;z-index:20;position: absolute;top:' + attribute.top1 + 'px;left:' + attribute.Left1 + 'px" class="' + attribute.rotate + '">';
    html += '<img src="' + eastcom.baseURL  + '/static/images/overview/popover5.png" style="width:100%;height:100%">';
    html += '<div style="position: absolute;top:' + attribute.top + 'px;font-size: 23px;left: ' + attribute.padding_left + 'px;    width: 260px;" class=' + attribute.rotate_span + '>';
    html += '<div style="margin-top: '+attribute.top+'px;"><div ><span>时&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;间:</span><span style="color:#66E6FF;margin-left:10px"">' + time1 + '~' + time2 + '</span></div></div>';
    html += '<div style="margin-top: '+attribute.top+'px;"><div ><span>数据来源:</span><span style="color:#66E6FF;margin-left: 10px;">' + source + '</span></div></div>';
    html += '<div style="margin-top: '+attribute.top+'px;"><div ><span>2G用户数:</span><span style="color:#66E6FF;margin-left: 10px;">' + g2_uc+ '</span></div></div>';
    html += '<div style="margin-top: '+attribute.top+'px;"><div ><span>4G用户数:</span><span style="color:#66E6FF;margin-left: 10px;">' + g4_uc+ '</span></div></div>';
    html += '<div style="margin-top: '+attribute.top+'px;"><div ><span>4G+用户数:</span><span style="color:#66E6FF;margin-left: 10px;">' + fdd_uc+ '</span></div></div>';
    html += '</div></div>';
    document.getElementById("popover").innerHTML = html;
}
function mouseout(){
	$("#popover").empty();
}