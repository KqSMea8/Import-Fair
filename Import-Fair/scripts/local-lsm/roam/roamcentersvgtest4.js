var CIIENEW=CIIENEW||{};
CIIENEW.Roam=function ()
{
	this.initialize.apply(this,arguments);
};
CIIENEW.Roam.prototype.constructor=CIIENEW.Roam;
CIIENEW.Roam.prototype.hotspot='进口博览会';
CIIENEW.Roam.prototype.dm=null;
CIIENEW.Roam.prototype.cdm=null;
CIIENEW.Roam.prototype.roamType='intl';
CIIENEW.Roam.prototype.hotspotList=[];
CIIENEW.Roam.prototype.startIndex=0;
CIIENEW.Roam.prototype.selectedHot=null;
CIIENEW.Roam.prototype.lineWidth=3;
CIIENEW.Roam.prototype.chartLabelSize=24;
CIIENEW.Roam.prototype.alarmColors=['#00ffaa','#fff066','#ff933c','#ff5252'];
CIIENEW.Roam.prototype.mapBaseWidth=2400;
CIIENEW.Roam.prototype.mapBaseHeight=1120;
CIIENEW.Roam.prototype.play=true;
CIIENEW.Roam.prototype.mapPosIndex=0;
CIIENEW.Roam.prototype.mapPosList=[
  {name:'北美洲',x:482.5,y:502.5,scale:2},
  {name:'南美洲',x:745,y:995,scale:2.5},
  {name:'非洲',x:1340,y:842.5,scale:2.5},
  {name:'欧洲',x:1220,y:500,scale:4.5},
  {name:'亚洲',x:1787.5,y:650,scale:2.5},
  {name:'澳洲',x:2077.5,y:1012.5,scale:4}
];
CIIENEW.Roam.prototype.mapPosMap={
   '加拿大':{x:0,y:0}
};
CIIENEW.Roam.prototype.worldDataCache=[];
CIIENEW.Roam.prototype.worldPlayInterval=0;
CIIENEW.Roam.prototype.worldShowIndex=0;

CIIENEW.Roam.prototype.provinceDataCache=[];
CIIENEW.Roam.prototype.provincePlayInterval=0;
CIIENEW.Roam.prototype.provinceShowIndex=0;
CIIENEW.Roam.prototype.provincePointMap={
	'黑龙江':{x:1762.219970703125,y:177.77999877929687},
	'吉林':{x:1748.8900146484375,y:291.1099853515625},
	'辽宁':{x:1691.1099853515625,y:366.66998291015625},
	'内蒙古':{x:1442.219970703125,y:317.7799987792969},
	'河北':{x:1517.7799072265625,y:475.55999755859375},
	'北京':{x:1537.7799072265625,y:422.2200012207031},
	'天津':{x:1562.219970703125,y:448.8899841308594},
	'山东':{x:1588.8900146484375,y:540},
	'河南':{x:1480,y:620},
	'山西':{x:1444.43994140625,y:528.8900146484375},
	'陕西':{x:1364.43994140625,y:611.1099853515625},
	'宁夏':{x:1291.1099853515625,y:528.8900146484375},
	'甘肃':{x:1244.43994140625,y:593.3300170898437},
	'青海':{x:1022.219970703125,y:564.4400024414062},
	'新疆':{x:822.219970703125,y:364.44000244140625},
	'西藏':{x:775.5599975585937,y:697.7799682617187},
	'四川':{x:1180,y:720},
	'云南':{x:1160,y:937.7799682617187},
	'贵州':{x:1326.669921875,y:853.3299560546875},
	'重庆':{x:1340,y:760},
	'广西':{x:1377.780029296875,y:948.8899536132812},
	'湖南':{x:1446.669921875,y:822.219970703125},
	'广东':{x:1488.8900146484375,y:953.3299560546875},
	'海南':{x:1411.1099853515625,y:1095.5599365234375},
	'湖北':{x:1453.3299560546875,y:722.219970703125},
	'江西':{x:1555.5599365234375,y:813.3299560546875},
	'福建':{x:1637.7799072265625,y:860},
	'台湾':{x:1722.219970703125,y:915.5599975585937},
	'浙江':{x:1666.669921875,y:768.8899536132812},
	'江苏':{x:1653.3299560546875,y:626.6699829101562},
	'安徽':{x:1582.219970703125,y:684.4400024414062}
};
CIIENEW.Roam.prototype.pointMap={
	'智利':{x:672,y:1000},
	'越南':{x:1902,y:758},
	'英国':{x:1140,y:518},
	'印度尼西亚':{x:1986,y:852},
	'印度':{x:1680,y:674},
	'意大利':{x:1228,y:584},
	'伊朗':{x:1520,y:658},
	'匈牙利':{x:1264,y:542},
	'新西兰':{x:2322,y:1132},
	'新加坡':{x:1876,y:832},
	'香港':{x:1934,y:708},
	'希腊':{x:1298,y:612},
	'西班牙':{x:1122,y:604},
	'乌拉圭':{x:776,y:1044},
	'乌克兰':{x:1332,y:534},
	'文莱':{x:1946,y:814},
	'土耳其':{x:1368,y:608},
	'泰国':{x:1844,y:752},
	'台湾':{x:1980,y:698},
	'斯洛文尼亚':{x:1238,y:562},
	'斯里兰卡':{x:1710,y:800},
	'沙特阿拉伯':{x:1446,y:698},
	'塞浦路斯':{x:1368,y:636},
	'瑞士':{x:1198,y:558},
	'瑞典':{x:1236,y:430},
	'日本':{x:2092,y:604},
	'葡萄牙':{x:1092,y:604},
	'挪威':{x:1202,y:444},
	'墨西哥':{x:458,y:718},
	'摩洛哥':{x:1092,y:652},
	'缅甸':{x:1810,y:716},
	'秘鲁':{x:614,y:892},
	'美国':{x:590,y:626},
	'马来西亚':{x:1862,y:818},
	'马耳他':{x:1248,y:630},
	'罗马尼亚':{x:1300,y:566},
	'卢森堡':{x:1180,y:534},

	'阿尔巴尼亚':{x:1276,y:596},
	'阿根廷':{x:754,y:1048},
	'阿拉伯联合酋长国':{x:1520,y:704},
	'阿曼':{x:1546,y:706},
	'阿塞拜疆':{x:1468,y:598},
	'埃及':{x:1364,y:672},
	'爱尔兰共和国':{x:1104,y:510},
	'爱沙尼亚':{x:1302,y:460},
	'奥地利':{x:1234,y:548},
	'澳门':{x:1924,y:584},
	'澳洲':{x:2160,y:1062},
	'巴勒斯坦':{x:1371.1099853515625,y:664.4400024414062},
	'巴林':{x:1497.7799072265625,y:691.1099853515625},
	'巴西':{x:838,y:946},
	'保加利亚':{x:1300,y:586},
	'比利时':{x:1174,y:528},
	'冰岛':{x:1050,y:408},
	'波兰':{x:1272,y:512},
	'丹麦':{x:1204,y:484},
	'德国':{x:1226,y:514},
	'俄罗斯':{x:1374,y:476},
	'厄瓜多尔':{x:596,y:848},
	'法国':{x:1156,y:546},
	'菲律宾':{x:1988,y:748},
	'斐济':{x:2384,y:952},
	'芬兰':{x:1292,y:444},
	'哈萨克':{x:1594,y:518},
	'韩国':{x:2012,y:608},
	'荷兰':{x:1180,y:516},
	'加拿大':{x:658,y:548},
	'柬埔寨':{x:1876,y:772},
	'捷克':{x:1238,y:530},
	'卡达':{x:1496,y:694},
	'科威特':{x:1468,y:670},
	'克罗地亚':{x:1248,y:564},
	'立陶宛':{x:1294,y:496},
	'乌兹别克':{x:1605.449951171875,y:588.0999755859375}
};
CIIENEW.Roam.prototype.imgMap={
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

CIIENEW.Roam.prototype.polygonMap={
	'美国':'polygon1236,polygon133',
	'新加坡':'polygon526',
	'台湾':'polygon290',
	'日本':'polygon322',
	'德国':'polygon698',
	'澳洲':'polygon895',
	'英国':'polygon728,711',
	'中国':'polygon291',
	'泰国':'polygon577',
	'韩国':'polygon338',
	'马来西亚':'polygon562',
	'法国':'polygon741',
	'瑞士':'polygon700',
	'印度尼西亚':'polygon472',
	'意大利':'polygon728,749',
	'荷兰':'polygon703',
	'巴勒斯坦':'polygon796',
	'丹麦':'polygon609',
	'印度':'polygon584',
	'丹麦':'polygon609',
	'乌克兰':'polygon675',
	'乌拉圭':'polygon1277',
	'伊朗':'polygon786',
	'俄罗斯':'path21',
	'保加利亚':'polygon680',
	'克罗地亚':'polygon690',
	'冰岛':'polygon944',
	'加拿大':'polygon1080,polygon1190,polygon1045,polygon1161',
	'匈牙利':'polygon678',
	'卡达':'polygon802',
	'卢森堡':'polygon705',
	'印度':'polygon584',
	'印度尼西亚':'polygon472',
	'厄瓜多尔':'polygon1273',
	'台湾':'polygon290',
	'哈萨克':'polygon340',
	'土耳其':'polygon790,polygon791',
	'埃及':'polygon824',
	'塞浦路斯':'polygon794',
	'墨西哥':'polygon1256',
	'奥地利':'polygon695',
	'巴勒斯坦':'polygon796',
	'巴林':'polygon802',
	'巴西':'polygon141',
	'希腊':'polygon764',
	'德国':'polygon698',
	'意大利':'polygon749',
	'挪威':'polygon651',
	'捷克':'polygon697',
	'摩洛哥':'polygon838',
	'文莱':'polygon566',
	'斐济':'polygon344',
	'斯洛文尼亚':'polygon694',
	'斯里兰卡':'polygon581',
	'新加坡':'polygon526',
	'新西兰':'polygon933,polygon934',
	'日本':'polygon322',
	'智利':'polygon1333',
	'柬埔寨':'polygon570',
	'比利时':'polygon704',
	'沙特阿拉伯':'polygon801',
	'法国':'polygon741',
	'波兰':'polygon696',
	'泰国':'polygon577',
	'澳洲':'polygon895',
	'爱尔兰共和国':'polygon711',
	'爱沙尼亚':'polygon668',
	'瑞典':'polygon655',
	'瑞士':'polygon700',
	'科威特':'polygon793',
	'秘鲁':'polygon1274',
	'立陶宛':'polygon673',
	'缅甸':'polygon578',
	'罗马尼亚':'polygon677',
	'美国':'polygon1236,polygon133',
	'芬兰':'path77',
	'英国':'polygon728',
	'荷兰':'polygon703',
	'菲律宾':'polygon416,polygon394,polygon408,polygon421',
	'葡萄牙':'polygon753',
	'西班牙':'path83',
	'越南':'polygon569',
	'阿塞拜疆':'polygon785',
	'阿尔巴尼亚':'polygon682',
	'阿拉伯联合酋长国':'polygon803',
	'阿曼':'polygon819',
	'阿根廷':'polygon1278',
	'韩国':'polygon338',
	'马来西亚':'polygon562',
	'马耳他':'polygon743',
	
	'蒙古国':'polygon338',
	'哈萨克斯坦':'polygon339',
	'巴基斯坦':'polygon593',
	'阿富汗':'polygon595',
	'乌兹别克':'polygon340',
	'土库曼斯坦':'polygon341',
	'苏丹':'polygon824',
	'利比亚':'polygon833',
	'查德':'polygon855',
	'阿尔及利亚':'polygon836',
	'马里':'polygon840',
	'尼日尔':'polygon857',
	'刚果共和国':'polygon869',
	'埃塞俄比亚':'polygon825',
	'安哥拉':'polygon872',
	'马达加斯加岛':'polygon887',
	'玻利维亚':'polygon1274',
	'格陵兰岛':'path99'

};
CIIENEW.Roam.prototype.provinceMap={
	'北京':'path21',
	'天津':'path20',
	'上海':'path26',
	'重庆':'path10',
	'河北':'path28',
	'山西':'path12',
	'辽宁':'path22',
	'吉林':'path23',
	'黑龙江':'path24',
	'江苏':'path27',
	'浙江':'path18',
	'安徽':'path19',
	'福建':'path17',
	'江西':'path16',
	'山东':'path25',
	'河南':'path29',
	'湖北':'path14',
	'湖南':'path13',
	'广东':'path15',
	'海南':'path31',
	'四川':'path5',
	'贵州':'path8',
	'云南':'path7',
	'陕西':'path11',
	'甘肃':'path1',
	'青海':'path4',
	'台湾':'path30',
	'内蒙古':'path0',
	'广西':'path9',
	'西藏':'path6',
	'宁夏':'path2',
	'新疆':'path3'
};
CIIENEW.Roam.prototype.gradientCount=30;
CIIENEW.Roam.prototype.gradientBase=['#bbe834','#00ffaa','#66e6ff','#087aed','#6666ff','#7da3f0'];
CIIENEW.Roam.prototype.gradientArr=[];

CIIENEW.Roam.prototype.initialize=function(_hotspot){
	if(_hotspot!=null){
		this.hotspot=_hotspot;
	}
	
	var eachStep=this.gradientCount/(this.gradientBase.length-1);
	for(var i=0;i<this.gradientBase.length-1;i++){
		var gradient = new gradientColor(this.gradientBase[i],this.gradientBase[i+1],eachStep);
		this.gradientArr=this.gradientArr.concat(gradient);
	}
	
	this.dm=LSMScreen.DataManager.getInstance();
	this.cdm=LSMScreen.CacheDataManager.getInstance();
	
	this.markWorld();
	this.markChina();
	
	//$('#world').on('click',this.logSvgPos.bind(this));
	//$('#china').on('click',this.logSvgPos.bind(this));
	$('#switchBtn').on('click',this.switchRoamType.bind(this));
	$('#airportroamclose').on('click',this.closeAirport.bind(this));
	
	$('polygon').on('click',this.showPolygonAndPath.bind(this));
	$('path').on('click',this.showPolygonAndPath.bind(this));
	
	
//	this.update();
//	setInterval(this.update.bind(this),60*1000);
//	
//	if(this.play) setInterval(this.posChange.bind(this),5*1000);
	
};
CIIENEW.Roam.prototype.posChange=function(){
	
};
CIIENEW.Roam.prototype.showPolygonAndPath=function(e){
	var id=$(e.currentTarget).attr('id');
	var show=id+':{x:'+e.pageX+',y:'+e.pageY+'}';
	console.log(show);
	alert(show);
};
CIIENEW.Roam.prototype.logSvgPos=function(e){
//	2400*1120
//	console.log(e.clientX+','+e.clientY);
	console.log('{x:'+e.clientX+',y:'+e.clientY+'}');
};
CIIENEW.Roam.prototype.markWorld=function(){
	var list0=$('#world').find('polygon');
	var list1=$('#world').find('path');
	
	for(var i=0;i<list0.length;i++){
		$(list0[i]).attr('id','polygon'+i);
	}
	for(var i=0;i<list1.length;i++){
		$(list1[i]).attr('id','path'+i);
	}
	
	this.resetWorldMap();
	
	
};
CIIENEW.Roam.prototype.resetWorldMap=function(){
	$('#world').find('text').text('');
	
	$('#world').find('polygon').css('fill','rgba(61,117,227,1)');
	$('#world').find('path').css('fill','rgba(61,117,227,1)');
	
	$('#world').find('polygon').css('stroke','#ffffff');//142f6f
	$('#world').find('polygon').css('stroke-width','0.5');
	
	$('#world').find('path').css('stroke','#ffffff');
	$('#world').find('path').css('stroke-width','0.5');
	
	$('#world').find('#path149').css('fill','rgba(64,95,189,1)');
	$('#world').find('#path149').css('border','solid 1px #142f6f');
	
	$('#world').find('#path39').css('fill','rgba(64,95,189,1)');
	$('#world').find('#path39').css('border','solid 1px #142f6f');
	
	$('#world').find('#polygon290').css('fill','rgba(64,95,189,1)');
	$('#world').find('#polygon290').css('border','solid 1px #142f6f');
};
CIIENEW.Roam.prototype.markChina=function(){
	var list0=$('#china').find('polygon');
	var list1=$('#china').find('path');
	
	for(var i=0;i<list0.length;i++){
		$(list0[i]).attr('id','polygon'+i);
	}
	for(var i=0;i<list1.length;i++){
		$(list1[i]).attr('id','path'+i);
	}
	
	$('#china').find('text').text('');
	
	$('#china').find('polygon').css('fill','rgba(61,117,227,1)');
	$('#china').find('path').css('fill','rgba(61,117,227,1)');
	
	$('#china').find('polygon').css('stroke','#142f6f');
	$('#china').find('polygon').css('stroke-width','0.1');
	
	$('#china').find('path').css('stroke','#142f6f');
	$('#china').find('path').css('stroke-width','0.1');
	
	$('#china').find('#path26').css('fill','rgba(151,229,255,1)');
	$('#china').find('#path26').css('border','solid 1px #142f6f');
};
CIIENEW.Roam.prototype.closeAirport=function(e){
	this.hideAirRoam(true);
};
CIIENEW.Roam.prototype.updateHotspot=function(hot){
	this.hotspot=hot;
	if(this.hotspot=='进口博览会'){
	}else{
		this.hideAirRoam(true);
	}
	this.update();
	
};

CIIENEW.Roam.prototype.switchRoamType=function(e){
	var cls=$(e.currentTarget).attr('class');
	if(cls=="roamcenterswitch_intl"){
		$(e.currentTarget).attr('class','roamcenterswitch_pro');
		$('#worldDiv').css('display','none');
		$('#chinaDiv').css('display','block');
		this.roamType='pro';
	}else{
		$(e.currentTarget).attr('class','roamcenterswitch_intl');
		$('#chinaDiv').css('display','none');
		$('#worldDiv').css('display','block');
		this.roamType='intl';
	}
	this.update();
	parent.updateRoamType(this.roamType);
};

CIIENEW.Roam.prototype.update=function(){
	if(this.roamType=='intl'){
		this.cdm.getIntlRoamTopN({topN:200,hot_name:this.hotspot},this.drawWorldChart.bind(this));
	}else if(this.roamType=='pro'){
		this.cdm.getProRoamTopN({topN:200,hot_name:this.hotspot},this.drawProChart.bind(this));
	}
	
	this.cdm.getIntlRoamIn({
		intl_name:null,
		hot_name:'J-浦东机场'
	},function(result){
		var record=result.data;
		record=record['J-浦东机场'];
		var value=record.user_cnt+'';
		var currentNum=$('#airportpd>div').length-1;
		$('#airportpd>div').text('0');
		for(var i=value.length-1;i>=0;i--){
			$('#airportpd>div:eq('+currentNum+')').text(value.charAt(i));
			currentNum--;
		}
	});
	
	this.cdm.getIntlRoamIn({
		intl_name:null,
		hot_name:'J-虹桥机场'
	},function(result){
		var record=result.data;
		record=record['J-虹桥机场'];
		var value=record.user_cnt+'';
		var currentNum=$('#airportpd>div').length-1;
		$('#airporthq>div').text('0');
		for(var i=value.length-1;i>=0;i--){
			$('#airporthq>div:eq('+currentNum+')').text(value.charAt(i));
			currentNum--;
		}
	});
};


CIIENEW.Roam.prototype.drawProChart=function(result){
	$('#tipDivPro').html('');
	var list=result.data;
	this.provinceDataCache=list;
	this.startProvincePlay();
};
CIIENEW.Roam.prototype.startProvincePlay=function(){
	clearInterval(this.provincePlayInterval);
	this.provinceShowIndex=0;
	this.nextProvinceGroup();
	this.provincePlayInterval=setInterval(this.nextProvinceGroup.bind(this),5000);
};
CIIENEW.Roam.prototype.nextProvinceGroup=function(){
	var list=this.provinceDataCache;
	if(this.provinceShowIndex>=list.length){
		this.provinceShowIndex=0;
	}
	var start=this.provinceShowIndex;
	var count=0;
	var map=this.provincePointMap;
	$('#tipDivPro').html('');
	var existPosList=[];
	for(var i=this.provinceShowIndex;i<list.length&&count<10;i++){
		var record=list[i];
		var name=record.pro_name.split('(')[0];
		name=name.replace(/\s/g,'');
		var value=record.user_cnt;
		//var pos={x:Math.random()*2400,y:Math.random()*1200}
		var pos={x:0,y:200}
		if(map[name]!=null){
			pos=map[name];
		}else{
			console.log(name);
		}
		
		var originX=pos.x;
		var originY=pos.y;
		//roamTipNew 282*112
		var movePos=this.resortTip({x:originX,y:originY},{x:originX,y:originY},existPosList,0,0);
		var centerX=movePos.x;
		var centerY=movePos.y;
		
		if(centerX<0){
			centerX=0;
		}else if(centerX+282>$('#tipDivPro').width()){
			centerX=$('#tipDivPro').width()-282;
		}
		
		if(centerY<0){
			centerY=0;
		}else if(centerY+112>$('#tipDivPro').height()){
			centerY=$('#tipDivPro').height()-32;
		}
		
		var marker='<img src="'+BASEPATH+'/static/styles/local-lsm/roam/images/mappoint.png" style="position:absolute;top:'+originY+'px;left:'+originX+'px;">'
		$('#tipDivPro').append(marker);
		
		var tip='<div pro_name="'+name+'" class="roamTipNew" style="z-index:1;padding:5px 0px 0px 40px;font-size:28px;position:absolute;top:'+centerY+'px;left:'+centerX+'px;">'
		+'<span>'+name+'</span>'
		+'<div style="border:solid 0px #ff0000;margin-left:-35px;">'
			+'<img style="float:left;" src="'+BASEPATH+'/static/styles/local-lsm/roam/images/pro.png">'
			+'<div style="width:110px;float:left;text-align:right;" class="ciiekpistyle fontImportantInfo">'+value+'</div><div style="float:left;padding-top:15px;" class="ciiekpistyle fontUnitTime">人</div>'
		+'</div>'
		+'</div>';
		$('#tipDivPro').append(tip);
		
		
		count++;
		this.provinceShowIndex++;
		existPosList.push(movePos);
	}
	setTimeout(function(){
		$('#tipDivPro>div').addClass('roamTipAnimation');
	},200);
	$('#topTitle').text('省际漫入用户数TOP '+(start+1)+'~'+(this.worldShowIndex+1));
};
CIIENEW.Roam.prototype.drawWorldChart=function(result){
	$('#tipDiv').html('');
	var list=result.data;
	this.resetWorldMap();
	for(var i=0;i<list.length&&i<this.gradientArr.length;i++){
		var record=list[i];
		var name=record.intl_name.split('(')[0];
		console.log(name+':'+this.polygonMap[name]);
		if(this.polygonMap[name]!=null){
			var ids=this.polygonMap[name].split(',');
			for(var j=0;j<ids.length;j++){
				$('#world').find('#'+ids[j]).css('fill',this.gradientArr[i]);
			}
			
		}
		
	}
	this.worldDataCache=list;
	this.startWorldPlay();
};
CIIENEW.Roam.prototype.startWorldPlay=function(){
	clearInterval(this.worldPlayInterval);
	this.worldShowIndex=0;
	this.nextWorldGroup();
	this.worldPlayInterval=setInterval(this.nextWorldGroup.bind(this),5000);
};
CIIENEW.Roam.prototype.nextWorldGroup=function(){
	
	var list=this.worldDataCache;
	if(this.worldShowIndex>=list.length){
		this.worldShowIndex=0;
	}
	var start=this.worldShowIndex;
	var count=0;
	var map=this.pointMap;
	$('#tipDiv').html('');
	var existPosList=[];
	for(var i=this.worldShowIndex;i<list.length&&count<10;i++){
		var record=list[i];
		var name=record.intl_name.split('(')[0];
		name=name.replace(/\s/g,'');
		var value=record.user_cnt;
		//var pos={x:Math.random()*2400,y:Math.random()*1200}
		var pos={x:0,y:200}
		if(map[name]!=null){
			pos=map[name];
		}else{
			console.log(name);
		}
		var showName=name;
		if(showName=="香港"||showName=="澳门"||showName=="台湾"){
			showName="中国"+showName;
		}
		var originX=pos.x;
		var originY=pos.y;
		//roamTipNew 282*112
		var movePos=this.resortTip({x:originX,y:originY},{x:originX,y:originY},existPosList,0,0);
		var centerX=movePos.x;
		var centerY=movePos.y;
		
		if(centerX<0){
			centerX=0;
		}else if(centerX+282>$('#tipDiv').width()){
			centerX=$('#tipDiv').width()-282;
		}
		
		if(centerY<0){
			centerY=0;
		}else if(centerY+112>$('#tipDiv').height()){
			centerY=$('#tipDiv').height()-32;
		}
		
		var marker='<img src="'+BASEPATH+'/static/styles/local-lsm/roam/images/mappoint.png" style="position:absolute;top:'+originY+'px;left:'+originX+'px;">'
		$('#tipDiv').append(marker);
		
		var tip='<div intl_name="'+name+'" class="roamTipNew" style="z-index:1;padding:5px 0px 0px 40px;font-size:28px;position:absolute;top:'+centerY+'px;left:'+centerX+'px;">'
		+'<span>'+showName+'</span>'
		+'<div style="border:solid 0px #ff0000;margin-left:-35px;">'
			+'<img style="float:left;" src="'+BASEPATH+'/static/styles/local-lsm/roam/images/country_map/'+this.imgMap[name]+'.png">'
			+'<div style="width:110px;float:left;text-align:right;" class="ciiekpistyle fontImportantInfo">'+value+'</div><div style="float:left;padding-top:15px;" class="ciiekpistyle fontUnitTime">人</div>'
		+'</div>'
		+'</div>';
		$('#tipDiv').append(tip);
		
		
		count++;
		this.worldShowIndex++;
		existPosList.push(movePos);
	}
	setTimeout(function(){
		$('#tipDiv>div').addClass('roamTipAnimation');
	},200);
	$('#topTitle').text('国际与港澳台漫入用户数TOP '+(start+1)+'~'+(this.worldShowIndex+1));
};
CIIENEW.Roam.prototype.resortTip=function(pos,origin,existPosList,rad,r){
	var gap=10;
	var tipWidth=282;
	var tipHeight=112;
	var hasMoved=false;
	for(var j=0;j<existPosList.length;j++){
		var epos=existPosList[j];
		if(
			((pos.x*1<epos.x*1+tipWidth)&&(pos.x*1>epos.x*1-tipWidth)
			&&(pos.y*1<epos.y*1+tipHeight)&&(pos.y*1>epos.y*1-tipHeight))
		){
			rad-=Math.PI/12;
			if(rad<=-2*Math.PI){
				r+=20;
			}
			pos.x=origin.x+r*Math.cos(rad);
			pos.y=origin.y+r*Math.sin(rad);
			
			
			hasMoved=true;
		}
	}
	if(hasMoved){
		pos=this.resortTip(pos,origin,existPosList,rad,r);
	}
	return pos;
};

CIIENEW.Roam.prototype.blockOver=function(e){
	var intl_name=$(e.currentTarget).attr('intl_name');
	$('.roammaptip[intl_name='+intl_name+']').css('display','block');
	$('.roammaptip[intl_name='+intl_name+']').css('top',e.clientY-68);
	$('.roammaptip[intl_name='+intl_name+']').css('left',e.clientX);
};
CIIENEW.Roam.prototype.blockOut=function(e){
	var intl_name=$(e.currentTarget).attr('intl_name');
	$('.roammaptip[intl_name='+intl_name+']').css('display','none');
};

CIIENEW.Roam.prototype.blockOverPro=function(e){
	var pro_name=$(e.currentTarget).attr('pro_name');
	$('.roammaptip[pro_name='+pro_name+']').css('display','block');
	$('.roammaptip[pro_name='+pro_name+']').css('top',e.clientY-68);
	$('.roammaptip[pro_name='+pro_name+']').css('left',e.clientX);
};
CIIENEW.Roam.prototype.blockOutPro=function(e){
	var pro_name=$(e.currentTarget).attr('pro_name');
	$('.roammaptip[pro_name='+pro_name+']').css('display','none');
};

CIIENEW.Roam.prototype.showAirRoam=function(isPermenent){
	$('#airportroam').css('display','block');
	if(isPermenent){
		$('#airportroam').attr('isPermenent','true');
	}
};
CIIENEW.Roam.prototype.hideAirRoam=function(force){
	if(force){
		$('#airportroam').attr('isPermenent','false');
	}
	if($('#airportroam').attr('isPermenent')!='true'){
		$('#airportroam').css('display','none');
	}
};