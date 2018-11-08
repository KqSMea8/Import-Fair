var CIIENEW=CIIENEW||{};
CIIENEW.Roam=function ()
{
	this.initialize.apply(this,arguments);
};
CIIENEW.Roam.prototype.constructor=CIIENEW.Roam;
CIIENEW.Roam.prototype.hotspot='J-国家会展中心';
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
CIIENEW.Roam.prototype.initialize=function(_hotspot){
	if(_hotspot!=null){
		this.hotspot=_hotspot;
	}
	this.dm=LSMScreen.DataManager.getInstance();
	this.cdm=LSMScreen.CacheDataManager.getInstance();
	
	require(['echarts',  
	            'echarts/chart/line'
	            ],this.initEcharts.bind(this));
	
	
};
CIIENEW.Roam.prototype.initEcharts=function(ec){
	this.ec=echarts=ec;
	this.ec=echarts;
	this.chart0=this.ec.init($("#roaminchart")[0],'marcarons');
	
	this.update();
	setInterval(this.update.bind(this),60*1000);
	$('.roamTypeBlock').on('click',this.roamTypeBlockClick.bind(this));
};	
CIIENEW.Roam.prototype.roamTypeBlockClick=function(e){
	this.trendType=$(e.currentTarget).attr('trendType');
	this.updateIntlTrend();
};
CIIENEW.Roam.prototype.update=function(){
	this.intl_name=LSMScreen.CacheDataManager.roadCountry;
	if(this.hotspot=="上海"){
		this.hotspot="";
	}
	this.updateLeftRecords();
	this.updateIntlTrend();
	this.updateTopN();	
};
CIIENEW.Roam.prototype.updateTopN=function(){
	this.cdm.getUserDist({hot_name:this.hotspot,roamType:"intl",topN:8},this.updateIntlTable.bind(this));
	this.cdm.getUserDist({hot_name:this.hotspot,roamType:"pro",topN:8},this.updateProvTable.bind(this));
};
CIIENEW.Roam.prototype.updateIntlTable=function(user){
	var list=user.data;
	var html='';
	for(var i=0;i<list.length;i++){
		var record=list[i];
		var name=record.id.split('(')[0].replace(/\s+/g,'');
		var value=record.user_cnt;
		var tb=record.user_cnttb;
		var tbTxt='--';
		var icon='';
		var showName=name;
		if(showName=="香港"||showName=="澳门"||showName=="台湾"){
			showName="中国"+showName;
		}
		if(!utils.isStringEmpty(tb)&&tb!=0){
			tbTxt=((value-tb)/tb*100).toFixed(2);
			if(tbTxt=="0.00"){tbTxt="0";}
			if(value>tb){
				icon='<div class="icon-up" style="margin-top:20px;float:left;" ></div>';
			}else if(value<tb){
				icon='<div class="icon-down" style="margin-top:20px;float:left;" ></div>';
			}
		}
		var flag='America.png';
		if(this.countryMap[name]!=null){
			flag=this.countryMap[name];
		}
		var row='<div class="roamTableRow">'
				+'<div style="width:9.5%;"><img alt="" src="'+BASEPATH+'/static/styles/local-lsm/roam/images/'+(i+1)+'.png"></div>'
				+'<div style="width:23.5%;" title="'+showName+'"><img alt="" src="'+BASEPATH+'/static/styles/local-lsm/roam/images/country_map/'+flag+'.png" style="float:left;margin-right:20px;width:45px;height:45px;"><div style="float:left;font-size: 28px;">'+utils.showOutLength(showName,8)+'</div></div>'
				+'<div style="width:23.5%;font-size:40px;" class="ciiekpistyle fontContentTitle">'+record.user_cnt+'</div>'
				+'<div style="width:21.5%;">'
					+icon
					+'<div class="ciiekpistyle fontContentTitle" style="float:left;font-size:40px;">'+tbTxt+'</div>'
					+'<div class="ciiekpistyle fontUnitTime" style="float:left;line-height:45px;">%</div>'
				+'</div>'
				+'<div style="width:21.5%;font-size:40px;" class="ciiekpistyle fontContentTitle">'+record.user_cnt_dist+'</div>'
				+'<div style="clear:both"></div>'
			+'</div>';
		html+=row;
	}
	$("#intlTopN").empty();
	$('#intlTopN').html(html);
};
CIIENEW.Roam.prototype.updateProvTable=function(user){
	var list=user.data;
	var html='';
	for(var i=0;i<list.length;i++){
		var record=list[i];
		var name=record.id.split('(')[0].replace(/\s+/g,'');
		var value=record.user_cnt;
		var tb=record.user_cnttb;
		var tbTxt='--';
		var icon='';
		if(!utils.isStringEmpty(tb)&&tb!=0){
			tbTxt=((value-tb)/tb*100).toFixed(2);
			if(tbTxt=="0.00"){tbTxt="0";}
			if(value>tb){
				icon='<div class="icon-up" style="margin-top:20px;float:left;" ></div>';
			}else if(value<tb){
				icon='<div class="icon-down" style="margin-top:20px;float:left;" ></div>';
			}
		}
		var flag='beijing.png';
		if(this.provinceMap[name]!=null){
			flag=this.provinceMap[name];
		}
		var row='<div class="roamTableRow">'
				+'<div style="width:9.5%;"><img alt="" src="'+BASEPATH+'/static/styles/local-lsm/roam/images/'+(i+1)+'.png"></div>'
				+'<div style="width:23.5%;" title="'+name+'"><img alt="" src="'+BASEPATH+'/static/styles/local-lsm/roam/images/province/'+flag+'" style="float:left;margin-right:20px;"><div style="float:left;">'+utils.showOutLength(name,4)+'</div></div>'
				+'<div style="width:23.5%;font-size:40px;" class="ciiekpistyle fontContentTitle">'+record.user_cnt+'</div>'
				+'<div style="width:21.5%;">'
					+icon
					+'<div class="ciiekpistyle fontContentTitle" style="float:left;font-size:40px;">'+tbTxt+'</div>'
					+'<div class="ciiekpistyle fontUnitTime" style="float:left;line-height:45px;">%</div>'
				+'</div>'
				+'<div style="width:21.5%;font-size:40px;" class="ciiekpistyle fontContentTitle">'+record.user_cnt_dist+'</div>'
				+'<div style="clear:both"></div>'
			+'</div>';
		html+=row;
	}
	$('#provTopN').html(html);
};
CIIENEW.Roam.prototype.updateLeftRecords=function(){
		this.cdm.getUserDistAll({
			hot_name:this.hotspot
		},this.UserDistAll.bind(this));
};
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
CIIENEW.Roam.prototype.UserDistAll=function(all){
	if(all.success){
		var all=all.data;
		if(!utils.isStringEmpty(all.intl)){
			var value_intl=all.intl.user_cnt;
			var tb_intl=all.intl.user_cnttb;
			var g2_uc=all.intl.g2_uc;
			var g4_uc=all.intl.g4_uc;
			var fdd_uc=all.intl.fdd_uc;
			var valueTxt_intl='--';
			var tbTxt_intl='--';
			if(!utils.isStringEmpty(value_intl)){
				if(value_intl>10000){
					$('#intlroamin').text(pmars.conversion("(万人)",value_intl));
					$('#intlroamin_dw').text("万人");
				}else{
					$('#intlroamin').text(this.toThousand(value_intl));
					$('#intlroamin_dw').text("人");
				}
			}else{
				$('#intlroamin').text(this.toThousand(valueTxt_intl));
				$('#intlroamin_dw').text("人");
			}
			if(!utils.isStringEmpty(tb_intl)&&tb_intl!=0){
				tbTxt_intl=((value_intl-tb_intl)/tb_intl*100).toFixed(1);
			}
			$('#intlroamintb').text(tbTxt_intl);
			if(parseInt(tbTxt_intl)<0){
				$("#icon-up1").attr('class',"icon-down");
			}else{
				$("#icon-up1").attr('class',"icon-up");
			}
			if(g2_uc>10000){
				$('#intlroamin_g2_uc').text(pmars.conversion("(万人)",g2_uc));
				$('#intlroamin_g2_uc_dw').text("万人");
			}else{
				$('#intlroamin_g2_uc').text(this.toThousand(g2_uc));
				$('#intlroamin_g2_uc_dw').text("人");
			}
			if(g4_uc>10000){
				$('#intlroamin_g4_uc').text(pmars.conversion("(万人)",g4_uc));
				$('#intlroamin_g4_uc_dw').text("万人");
			}else{
				$('#intlroamin_g4_uc').text(this.toThousand(g4_uc));
				$('#intlroamin_g4_uc_dw').text("人");
			}
			if(fdd_uc>10000){
				$('#intlroamin_fdd_uc').text(pmars.conversion("(万人)",fdd_uc));
				$('#intlroamin_fdd_uc_dw').text("万人");
			}else{
				$('#intlroamin_fdd_uc').text(this.toThousand(fdd_uc));
				$('#intlroamin_fdd_uc_dw').text("人");
			}
			if(all.intl.user_cnt_dist>10000){
				$('#roamSelectors_intl_g').text(pmars.conversion("(万人)",all.intl.user_cnt_dist));
				$('#roamSelectors_intl_g_dw').text("万人");
			}else{
				$('#roamSelectors_intl_g').text(this.toThousand(all.intl.user_cnt_dist));
				$('#roamSelectors_intl_g_dw').text("人");
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
			if(!utils.isStringEmpty(value_pro)){
				if(value_pro>10000){
					$('#provroamin').text(pmars.conversion("(万人)",value_pro));
					$('#provroamin_dw').text("万人");
				}else{
					$('#provroamin').text(this.toThousand(value_pro));
					$('#provroamin_dw').text("人");
				}
			}else{
				$('#provroamin').text(this.toThousand(valueTxt_pro));
				$('#provroamin_dw').text("人");
			}
			if(!utils.isStringEmpty(tb_pro)&&tb_pro!=0){
				tbTxt_pro=((value_pro-tb_pro)/tb_pro*100).toFixed(1);
			}
			if(parseInt(tbTxt_pro)<0){
				$("#icon-up2").attr('class',"icon-down");
			}else{
				$("#icon-up1").attr('class',"icon-up");
			}
			$('#provroamintb').text(tbTxt_pro);
			if(g2_uc>10000){
				$('#provroamin_g2_uc').text(pmars.conversion("(万人)",g2_uc));
				$('#provroamin_g2_uc_dw').text("万人");
			}else{
				$('#provroamin_g2_uc').text(this.toThousand(g2_uc));
				$('#provroamin_g2_uc_dw').text("人");
			}
			if(g4_uc>10000){
				$('#provroamin_g4_uc').text(pmars.conversion("(万人)",g4_uc));
				$('#provroamin_g4_uc_dw').text("万人");
			}else{
				$('#provroamin_g4_uc').text(this.toThousand(g4_uc));
				$('#provroamin_g4_uc_dw').text("人");
			}
			if(fdd_uc>10000){
				$('#provroamin_fdd_uc').text(pmars.conversion("(万人)",fdd_uc));
				$('#provroamin_fdd_uc_dw').text("万人");
			}else{
				$('#provroamin_fdd_uc').text(this.toThousand(fdd_uc));
				$('#provroamin_fdd_uc_dw').text("人");
			}
			if(all.pro.user_cnt_dist>10000){
				$('#roamSelectors_pro_g').text(pmars.conversion("(万人)",all.pro.user_cnt_dist));
				$('#roamSelectors_pro_g_dw').text("万人");
			}else{
				$('#roamSelectors_pro_g').text(this.toThousand(all.pro.user_cnt_dist));
				$('#roamSelectors_pro_g_dw').text("人");
			}
		}
		if(!utils.isStringEmpty(all.intl_ys)){
			var value_intl_ys=all.intl_ys.user_cnt;
			var tb_intl_ys=all.intl_ys.user_cnttb;
			var valueTxt_intl_ys='--';
			var tbTxt_intl_ys='--';
			if(!utils.isStringEmpty(value_intl_ys)){
				if(value_intl_ys>10000){
					$('#roadroamin').text(pmars.conversion("(万人)",value_intl_ys));
					$('#roadroamin_dw').text("万人");
				}else{
					$('#roadroamin').text(this.toThousand(value_intl_ys));
					$('#roadroamin_dw').text("人");
				}
			}else{
				$('#roadroamin').text(this.toThousand(valueTxt_intl_ys));
				$('#roadroamin_dw').text("人");
			}
			if(!utils.isStringEmpty(tb_intl_ys)&&tb_intl_ys!=0){
				tbTxt_intl_ys=((value_intl_ys-tb_intl_ys)/tb_intl_ys*100).toFixed(1);
			}
			if(parseInt(tbTxt_intl_ys)<0){
				$("#icon-up3").attr('class',"icon-down");
			}else{
				$("#icon-up3").attr('class',"icon-up");
			}
			$('#roadroamintb').text(tbTxt_intl_ys);
			if(all.intl_ys.user_cnt_dist>10000){
				$('#roamSelectors_intl_ys_g').text(pmars.conversion("(万人)",all.intl_ys.user_cnt_dist));
				$('#roamSelectors_intl_ys_g_dw').text("万人");
			}else{
				$('#roamSelectors_intl_ys_g').text(this.toThousand(all.intl_ys.user_cnt_dist));
				$('#roamSelectors_intl_ys_g_dw').text("人");
			}
		}
		if(!utils.isStringEmpty(all.intl_czg)){
			var value_intl_ys=all.intl_czg.user_cnt;
			var tb_intl_ys=all.intl_czg.user_cnttb;
			var valueTxt_intl_ys='--';
			var tbTxt_intl_ys='--';
			if(!utils.isStringEmpty(value_intl_ys)){
				if(value_intl_ys>10000){
					$('#czg').text(pmars.conversion("(万人)",value_intl_ys));
					$('#czg_dw').text("万人");
				}else{
					$('#czg').text(this.toThousand(value_intl_ys));
					$('#czg_dw').text("人");
				}
			}else{
				$('#czg').text(this.toThousand(valueTxt_intl_ys));
				$('#czg_dw').text("人");
			}
			if(!utils.isStringEmpty(tb_intl_ys)&&tb_intl_ys!=0){
				tbTxt_intl_ys=((value_intl_ys-tb_intl_ys)/tb_intl_ys*100).toFixed(1);
			}
			if(parseInt(tbTxt_intl_ys)<0){
				$("#icon-up3").attr('class',"icon-down");
			}else{
				$("#icon-up3").attr('class',"icon-up");
			}
			$('#czgtb').text(tbTxt_intl_ys);
			if(all.intl_czg.user_cnt_dist>10000){
				$('#roamSelectors_intl_czg_g').text(pmars.conversion("(万人)",all.intl_czg.user_cnt_dist));
				$('#roamSelectors_intl_czg_g_dw').text("万人");
			}else{
				$('#roamSelectors_intl_czg_g').text(this.toThousand(all.intl_czg.user_cnt_dist));
				$('#roamSelectors_intl_czg_g_dw').text("人");
			}
		}
	}
}
CIIENEW.Roam.prototype.updateIntlTrend=function(){
	if(this.trendType=='intl'){
		$('#trendTitle').text('国际及港澳台漫入用户数');
		this.cdm.getNewRoamInTrend({
			type:"intl",
			hotspot:this.hotspot
		},this.drawIntlTrend.bind(this));
	}else if(this.trendType=='road'){
		$('#trendTitle').text('元首参会国漫入用户数');
		this.cdm.getNewRoamInTrend({
			type:"intl_ys",
			hotspot:this.hotspot
		},this.drawIntlTrend.bind(this));
	}else if(this.trendType=='pro'){
		$('#trendTitle').text('省际漫入用户数');
		this.cdm.getNewRoamInTrend({
			type:"pro",
			hotspot:this.hotspot
		},this.drawIntlTrend.bind(this));
	}else if(this.trendType=='intl_czg'){
		$('#trendTitle').text('参展国漫入用户数');
		this.cdm.getNewRoamInTrend({
			type:"intl_czg",
			hotspot:this.hotspot
		},this.drawIntlTrend.bind(this));
	}
};


CIIENEW.Roam.prototype.drawIntlTrend=function(result){
	this.chart0=this.ec.init($("#roaminchart")[0],'marcarons');
	var list=result.data;
	if(list==null){
		list=[];
	}
	var xArr=[];
	var userArr=[];
	var userArrLast=[];
	for(var i=0;i<list.length;i++){
		var record=list[i];
		xArr.push(record.time.substring(11,16));
		if(record.user_cnt==null) record.user_cnt=undefined;
		if(record.user_cnttb==null) record.user_cnttb=undefined;
		userArr.push(record.user_cnt);
		userArrLast.push(record.user_cnttb);
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
		        data:['今日','6日'],
		        textStyle:{color:'#ffffff',fontSize:this.chartLabelSize}
		    },
		    toolbox: {show : false},
		    toolbox: {show : false},
		    calculable : false,
		    animation:false,
	   		addDataAnimation: false,
		    grid:{borderWidth:0,x:130,y:30,x2:0,y2:30},
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