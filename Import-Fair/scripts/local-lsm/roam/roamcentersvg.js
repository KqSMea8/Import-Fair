var CIIENEW=CIIENEW||{};
CIIENEW.Roam=function ()
{
	this.initialize.apply(this,arguments);
};
CIIENEW.Roam.prototype.constructor=CIIENEW.Roam;
CIIENEW.Roam.prototype.hotspot='J-国家会展中心';
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
	
	'蒙古国':{x:1836,y:524},
	'巴基斯坦':{x:1632,y:644},
	'阿富汗':{x:1604,y:634},
	'乌兹别克':{x:1605.449951171875,y:588.0999755859375},
	'土库曼':{x:1530,y:606},
	'苏丹':{x:1366,y:764},
	'利比亚':{x:1240,y:654},
	'查德':{x:1254,y:774},
	'阿尔及利亚':{x:1172,y:626},
	'马里共和国':{x:1090,y:766},
	'尼日':{x:1166,y:760},
	'刚果共和国':{x:1258,y:866},
	'埃塞俄比亚':{x:1414,y:788},
	'安哥拉':{x:1242,y:890},
	'马达加斯加':{x:1470,y:950},
	'玻利维亚':{x:682,y:936},
	'格陵兰':{x:850,y:388},
	
	'南非':{x:1342,y:988},
	'莫桑比克':{x:1368,y:980},
	'津巴布韦':{x:1354,y:944},
	'坦桑尼亚':{x:1390,y:874},
	'纳米比亚':{x:1260,y:968},
	'毛里塔尼亚':{x:1038,y:730},
	'尼日利亚':{x:1200,y:788},
	'哥伦比亚':{x:636,y:816},
	'委内瑞拉':{x:682,y:782},
	'博茨瓦纳':{x:1322,y:974},
	'赞比亚':{x:1340,y:926},
	'肯尼亚':{x:1406,y:844},
	'中非共和国':{x:1272,y:808},
	'喀麦隆':{x:1228,y:814},
	'伊拉克':{x:1440,y:648},
	'白俄罗斯':{x:1318,y:504},
	'科特迪瓦':{x:1108,y:796}
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
	'台湾':'China',
	
//	'智利':'Chile',
//	'蒙古国':'Mongolia',
//	'哈萨克':'Kazakhstan',
//	'巴基斯坦':'Pakistan',
//	'阿富汗':'Afghanistan',
//	'乌兹别克':'Uzbekistan',
//	'土库曼':'Turkmenistan',
//	'苏丹':'Sultan',
//	'利比亚':'Libya',
//	'查德':'Chad',
//	'阿尔及利亚':'Algeria',
//	'马里共和国':'Mali',
//	'尼日':'Niger',
//	'刚果共和国':'Congo',
//	'埃塞俄比亚':'Ethiopia',
//	'安哥拉':'Angola',
//	'马达加斯加':'Madagascar',
//	'玻利维亚':'Bolivia',
//	'格陵兰':'Greenland',
//	
//	'南非':'South Africa',
//	'莫桑比克':'Mozambique',
//	'津巴布韦':'Zimbabwe',
//	'坦桑尼亚':'Tanzania',
//	'纳米比亚':'Namibia',
//	'毛里塔尼亚':'Mauritania',
//	'尼日利亚':'Nigeria',
//	'哥伦比亚':'olombia',
//	'委内瑞拉':'Venezuela',
//	'博茨瓦纳':'Botswana',
//	'赞比亚':'Zambia',
//	'肯尼亚':'Kenya',
//	'中非共和国':'Central African',
//	'喀麦隆':'Cameroon',
//	'伊拉克':'Iraq',
//	'白俄罗斯':'Belarus',
//	'科特迪瓦':'Ivory Coast'
	
	'智利':'Lithuania',
	'蒙古国':'Lithuania',
	'哈萨克':'Lithuania',
	'巴基斯坦':'Lithuania',
	'阿富汗':'Lithuania',
	'乌兹别克':'Lithuania',
	'土库曼':'Lithuania',
	'苏丹':'Lithuania',
	'利比亚':'Lithuania',
	'查德':'Lithuania',
	'阿尔及利亚':'Lithuania',
	'马里共和国':'Lithuania',
	'尼日':'Lithuania',
	'刚果共和国':'Lithuania',
	'埃塞俄比亚':'Lithuania',
	'安哥拉':'Lithuania',
	'马达加斯加':'Lithuania',
	'玻利维亚':'Lithuania',
	'格陵兰':'Lithuania',
	
	'南非':'Lithuania',
	'莫桑比克':'Lithuania',
	'津巴布韦':'Lithuania',
	'坦桑尼亚':'Lithuania',
	'纳米比亚':'Lithuania',
	'毛里塔尼亚':'Lithuania',
	'尼日利亚':'Lithuania',
	'哥伦比亚':'Lithuania',
	'委内瑞拉':'Lithuania',
	'博茨瓦纳':'Lithuania',
	'赞比亚':'Lithuania',
	'肯尼亚':'Lithuania',
	'中非共和国':'Lithuania',
	'喀麦隆':'Lithuania',
	'伊拉克':'Lithuania',
	'白俄罗斯':'Lithuania',
	'科特迪瓦':'Lithuania'
};

CIIENEW.Roam.prototype.polygonMap={
		'阿尔巴尼亚':'polygon681',
		'阿根廷':'polygon1277',
		'阿拉伯联合酋长国':'polygon802',
		'阿曼':'polygon818',
		'阿塞拜疆':'polygon784',
		'埃及':'polygon823',
		'爱尔兰共和国':'polygon710',
		'爱沙尼亚':'polygon667',
		'奥地利':'polygon694',
		'澳洲':'polygon894',
		'巴勒斯坦':'polygon797',
		'巴西':'path141',
		'保加利亚':'polygon679',
		'比利时':'polygon703',
		'冰岛':'polygon943',
		'波兰':'polygon695',
		'丹麦':'polygon608,polygon597,polygon600',
		'德国':'polygon697',
		'俄罗斯':'path21',
		'厄瓜多尔':'polygon1272',
		'法国':'polygon740',
		'菲律宾':'polygon415,polygon393,polygon404,polygon423,polygon420',
		'斐济':'polygon343',
		'芬兰':'path77',
		'哈萨克':'polygon339',
		'韩国':'polygon337',
		'荷兰':'polygon702',
		'加拿大':'polygon1079,polygon1105,polygon1189,polygon1079,polygon1044,polygon1160,polygon1125,polygon1123,polygon1048',
		'柬埔寨':'polygon569',
		'捷克':'polygon696',
		'卡达':'polygon801',
		'科威特':'polygon792',
		'克罗地亚':'polygon689',
		'立陶宛':'polygon672',
		'卢森堡':'polygon704',
		'罗马尼亚':'polygon676',
		'马耳他':'polygon742',
		'马来西亚':'polygon556,polygon561',
		'美国':'polygon1235,polygon133',
		'秘鲁':'polygon1273',
		'缅甸':'polygon577',
		'摩洛哥':'polygon837',
		'墨西哥':'polygon1255',
		'挪威':'polygon650',
		'葡萄牙':'polygon752',
		'日本':'polygon321,polygon309,polygon305',
		'瑞典':'polygon654',
		'瑞士':'polygon699',
		'塞浦路斯':'polygon793',
		'沙特阿拉伯':'polygon800',
		'斯里兰卡':'polygon580',
		'斯洛文尼亚':'polygon693',
		'台湾':'polygon290',
		'泰国':'polygon576',
		'土耳其':'polygon789,polygon790',
		'文莱':'polygon565',
		'乌克兰':'polygon674',
		'乌拉圭':'polygon1276',
		'西班牙':'path83',
		'希腊':'polygon763,polygon782',
		//#N,polygonA
		'新加坡':'polygon527',
		'新西兰':'polygon933,polygon932',
		'匈牙利':'polygon677',
		'伊朗':'polygon785',
		'意大利':'polygon748,polygon747',
		'印度':'polygon583',
		'印度尼西亚':'polygon471,polygon450,polygon519,polygon542,polygon499,polygon459,polygon497',
		'英国':'polygon727',
		'越南':'polygon568',
		'智利':'polygon1332',
		
		'蒙古国':'polygon338',
		'哈萨克':'polygon339',
		'巴基斯坦':'polygon593',
		'阿富汗':'polygon595',
		'乌兹别克':'polygon340',
		'土库曼':'polygon341',
		'苏丹':'polygon824',
		'利比亚':'polygon833',
		'查德':'polygon855',
		'阿尔及利亚':'polygon836',
		'马里共和国':'polygon840',
		'尼日':'polygon857',
		'刚果共和国':'polygon869',
		'埃塞俄比亚':'polygon825',
		'安哥拉':'polygon872',
		'马达加斯加':'polygon887',
		'玻利维亚':'polygon1274',
		'格陵兰':'path99',
		
		'南非':'path91',
		'莫桑比克':'polygon890',
		'津巴布韦':'polygon873',
		'坦桑尼亚':'polygon866',
		'纳米比亚':'polygon875',
		'毛里塔尼亚':'polygon839',
		'尼日利亚':'polygon858',
		'哥伦比亚':'polygon1270',
		'委内瑞拉':'polygon1268',
		'博茨瓦纳':'polygon874',
		'赞比亚':'polygon871',
		'肯尼亚':'polygon829',
		'中非共和国':'polygon832',
		'喀麦隆':'polygon861',
		'伊拉克':'polygon791',
		'白俄罗斯':'polygon673',
		'科特迪瓦':'polygon851'
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
//CIIENEW.Roam.prototype.gradientBase=['#802fbf','#d82993','#e72923','#ff6b0e','#ff990c','#feff0c'];
//CIIENEW.Roam.prototype.gradientBase=['#7da3f0','#6666ff','#087aed','#66e6ff','#00ffaa','#bbe834'];
//CIIENEW.Roam.prototype.gradientBase=['#bbe834','#00ffaa','#66e6ff','#087aed','#6666ff','#7da3f0'];
//CIIENEW.Roam.prototype.gradientBase=['#FFA624','#FFB92B','#FFC830','#FFD936','#FFE43B','#FFF440'];
//'#1800ff','#0033ff',
CIIENEW.Roam.prototype.gradientBase=['#0055fe','#0080ff','#0099ff','#5bc0f8'];

CIIENEW.Roam.prototype.gradientArr=[];

var bool=false;
var name="国际";
CIIENEW.Roam.prototype.initialize=function(_hotspot){
	if(_hotspot!=null){
		this.hotspot=_hotspot;
	}
	
	
	
	this.dm=LSMScreen.DataManager.getInstance();
	this.cdm=LSMScreen.CacheDataManager.getInstance();
	
	this.markWorld();
	this.markChina();
	
	$('#world').on('click',this.logSvgPos.bind(this));
	$('#china').on('click',this.logSvgPos.bind(this));
	$('#switchBtn').on('click',this.switchRoamType.bind(this));
	$('#airportroamclose').on('click',this.closeAirport.bind(this));
	
	$('polygon').on('click',this.showTip.bind(this));
	$('path').on('click',this.showTip.bind(this));
	
	this.update();
	setInterval(this.update.bind(this),60*1000);
	
//	$('#roamCtrl').on('mouseover',this.showRoamCtrl.bind(this));
//	$('#roamCtrl').on('mouseout',this.hideRoamCtrl.bind(this));
	
	$(".airportshowtip").on("mouseover",this.showAirTip.bind(this));
	$(".airportshowtip").on("mouseout",this.hideAirTip.bind(this));
	
	setInterval(this.rotateAirportContent.bind(this),60*1000);
//	airportpdcontent
//	rotateDivX
	
/*	if(this.play) setInterval(this.posChange.bind(this),5*1000);*/
};
CIIENEW.Roam.prototype.showAirTip=function(e){
	var x = $(e.currentTarget).offset().left+$(e.currentTarget).width()+20; 
	var y = Math.min($(e.currentTarget).offset().top-20,$('body').height()-$('#airportpopup').height()); 
	$('#airportpopup').css('left',x);
	$('#airportpopup').css('top',y);
	$('#airportpopup').show();
	
	$('.airportpopupvalue:eq(0)').text($(e.currentTarget).attr('g2_uc'));
	$('.airportpopupvalue:eq(1)').text($(e.currentTarget).attr('g4_uc'));
	$('.airportpopupvalue:eq(2)').text($(e.currentTarget).attr('fdd_uc'));
	
//	airportpopupvalue
};
CIIENEW.Roam.prototype.hideAirTip=function(e){
	$('#airportpopup').hide();
};
CIIENEW.Roam.prototype.rotateAirportContent=function(e){
	$("#airportpdcontent").removeClass("rotateDivX");
	$("#airporthqcontent").removeClass("rotateDivX");
	setTimeout(this.rotateAirportContent2.bind(this),200);
};
CIIENEW.Roam.prototype.rotateAirportContent2=function(e){
	$("#airportpdcontent").addClass("rotateDivX");
	$("#airporthqcontent").addClass("rotateDivX");
};
CIIENEW.Roam.prototype.showRoamCtrl=function(e){
	$('#roamCtrl').css('height','auto');
};
CIIENEW.Roam.prototype.hideRoamCtrl=function(e){
	$('#roamCtrl').css('height','57px');
};
CIIENEW.Roam.prototype.click=function(e){
	 var img=$(e).data("img");
	 var bool=$("#optical_img").data("bool");
	 var optical=$(e).data("optical");
	 var img=$(e).data("img");
	 var hot=$(e).data("text");
	 for(var c=1;c<9;c++){
		 $('#optical_'+c+'_img').attr('src',eastcom.baseURL+'/static/styles/local-lsm/roam/images/Roam/'+$('#optical_'+c).data("img")+'_white.png');
		 $('#optical_'+c+'_div').css('color',"#ffffff");
	 }
	 $('#optical_'+optical+'_img').attr('src',eastcom.baseURL+'/static/styles/local-lsm/roam/images/Roam/'+img+'_bluce.png');
	 $('#optical_'+optical+'_div').css('color',"#00fcff");
	 this.dm=LSMScreen.DataManager.getInstance();
	 this.cdm=LSMScreen.CacheDataManager.getInstance();
	 this.selectedHot=hot;
	 this.hotspot=hot;
	 if(bool==true){
		 this.roamType='pro';
		 $('#chinaDiv').css('display','block');
		 $('#worldDiv').css('display','none');
		 this.update();
		
	 }else{
		 this.roamType='intl';
		 $('#chinaDiv').css('display','none');
		 $('#worldDiv').css('display','block');
		 this.update();
	 }
	 try{
		 parent.updateRoamType(this.roamType);
	 }catch(e){}
	 
	 if(isScreenMode=="true"){
		 this.IntOrPro=bool;
		 parent.showRoamLeft(hot,bool,this.roamType);
		 parent.updateHotspot(hot);
	 }
	 
}

CIIENEW.Roam.prototype.BoolClick=function(e){
	 _name=$("#"+e.id).data("name");
	 if(_name!=name){
		 name=$("#"+e.id).data("name");
		 bool=$("#optical_img").data("bool");
		 this.dm=LSMScreen.DataManager.getInstance();
		 this.cdm=LSMScreen.CacheDataManager.getInstance();
		 if(bool==false){
			 $("#optical1_img").css('display','none');
			 $("#optical2_img").css('display','block');
			 $('#optical_img').attr('src',eastcom.baseURL+'/static/styles/local-lsm/roam/images/Roam/sj.png');
			 $("#optical_img").data("bool",true);
			 var Html="";
			 var position_sj={1:{"top":60,"left":15,"img":"sh","name":"上海","text":"上海"},
					 2:{"top":120,"left":15,"img":"ba","name":"保障区域","text":"进口博览会"},
					 3:{"top":180,"left":15,"img":"hz","name":"国家会展中心","text":"J-国家会展中心"},
					 4:{"top":240,"left":15,"img":"fj","name":"浦东机场","text":"J-浦东机场"},
					 5:{"top":300,"left":15,"img":"fj","name":"虹桥机场","text":"J-虹桥机场"},
					 6:{"top":360,"left":15,"img":"hc","name":"虹桥站","text":"J-虹桥站"},
					 7:{"top":420,"left":15,"img":"hc","name":"上海站","text":"J-上海站"},
					 8:{"top":480,"left":15,"img":"hc","name":"上海南站","text":"J-上海南站"}};
				 for(var c=1;c<9;c++){
					 if(this.hotspot==position_sj[c].text){
						 Html+='<div id="optical_'+c+'" style="height: 50px;position: absolute;cursor:pointer;color:#00fcff; top:'+position_sj[c].top+'px;left:'+position_sj[c].left+'px" data-img="'+position_sj[c].img+'" data-text="'+position_sj[c].text+'" data-name="'+position_sj[c].img+'" data-optical="'+c+'" onclick="MAP.click(this)"><img id="optical_'+c+'_img" src='+eastcom.baseURL+'/static/styles/local-lsm/roam/images/Roam/'+position_sj[c].img+'_bluce.png style="width: 30px;position: relative;top:10px"><div style="font-size:30px;padding-left:30px;top: -25px;position: relative;" id="optical_'+c+'_div">'+position_sj[c].name+'</div></div>'; 
					 }else{
						 if(c!=t){
							 Html+='<div id="optical_'+c+'" style="height: 50px;position: absolute;cursor:pointer;top:'+position_sj[c].top+'px;left:'+position_sj[c].left+'px" data-img="'+position_sj[c].img+'" data-text="'+position_sj[c].text+'" data-name="'+position_sj[c].img+'" data-optical="'+c+'" onclick="MAP.click(this)"><img id="optical_'+c+'_img" src='+eastcom.baseURL+'/static/styles/local-lsm/roam/images/Roam/'+position_sj[c].img+'_white.png style="width: 30px;position: relative;top:10px"><div style="font-size:30px;padding-left:30px;top: -25px;position: relative;" id="optical_'+c+'_div">'+position_sj[c].name+'</div></div>';
						}
					 }
				 }
			 $("#optical").empty();
			 document.getElementById("optical").innerHTML = Html; 
			 bool=true;
			 this.roamType='pro';
			 this.hideAirRoam(true);
			 $('#chinaDiv').css('display','block');
			 $('#worldDiv').css('display','none');
			 this.update();
			 parent.updateRoamType(this.roamType);
		 }else if(bool==true){
			 $("#optical2_img").css('display','none');
			 $("#optical1_img").css('display','block');
			 $('#optical_img').attr('src',eastcom.baseURL+'/static/styles/local-lsm/roam/images/Roam/gj.png');
			 $("#optical_img").data("bool",false);
			 var Html=""; var t="";
			 for(var c=1;c<6;c++){
				 if(this.hotspot==position_gj[c].text){
					 t=c;
					 Html+='<div id="optical_'+c+'" style="height: 50px;position: absolute;cursor:pointer; color:#00fcff; top:'+position_gj[c].top+'px;left:'+position_gj[c].left+'px" data-img="'+position_gj[c].img+'" data-name="'+position_gj[c].img+'" data-text="'+position_gj[c].text+'" data-optical="'+c+'" onclick="MAP.click(this)"><img id="optical_'+c+'_img" src='+eastcom.baseURL+'/static/styles/local-lsm/roam/images/Roam/'+position_gj[c].img+'_bluce.png style="width: 30px;position: relative;top:10px"><div style="font-size:30px;padding-left:30px;top: -25px;position: relative;" id="optical_'+c+'_div">'+position_gj[c].name+'</div></div>';
				 } 
			 }
			 for(var c=1;c<6;c++){
				 if(c==3&&utils.isStringEmpty(t)){
					 this.hotspot="J-国家会展中心";this.roamType="intl";
					 Html+='<div id="optical_'+c+'" style="height: 50px;position: absolute;cursor:pointer; color:#00fcff; top:'+position_gj[c].top+'px;left:'+position_gj[c].left+'px" data-img="'+position_gj[c].img+'" data-name="'+position_gj[c].img+'" data-text="'+position_gj[c].text+'" data-optical="'+c+'" onclick="MAP.click(this)"><img id="optical_'+c+'_img" src='+eastcom.baseURL+'/static/styles/local-lsm/roam/images/Roam/'+position_gj[c].img+'_bluce.png style="width: 30px;position: relative;top:10px"><div style="font-size:30px;padding-left:30px;top: -25px;position: relative;" id="optical_'+c+'_div">'+position_gj[c].name+'</div></div>';							 
				 }else{
					 if(c!=t){
						Html+='<div id="optical_'+c+'" style="height: 50px;position: absolute;cursor:pointer;top:'+position_gj[c].top+'px;left:'+position_gj[c].left+'px" data-img="'+position_gj[c].img+'" data-text="'+position_gj[c].text+'" data-name="'+position_gj[c].img+'" data-optical="'+c+'" onclick="MAP.click(this)"><img id="optical_'+c+'_img" src='+eastcom.baseURL+'/static/styles/local-lsm/roam/images/Roam/'+position_gj[c].img+'_white.png style="width: 30px;position: relative;top:10px"><div style="font-size:30px;padding-left:30px;top: -25px;position: relative;" id="optical_'+c+'_div">'+position_gj[c].name+'</div></div>';  
					 }
				 }
			 }
			 $("#optical").empty();
			 document.getElementById("optical").innerHTML = Html; 
			 bool=false;
			 this.roamType='intl';
			 this.showAirRoam(true);
			 $('#chinaDiv').css('display','none');
			 $('#worldDiv').css('display','block');
			 this.update();
			 parent.updateRoamType(this.roamType);
		 }
		 if(isScreenMode=="true"){
			 this.IntOrPro=bool;
			 parent.showRoamLeft(this.hotspot,bool,this.roamType);
			 parent.updateHotspot(this.hotspot,bool);
		 }
	 }
	 
	
}
CIIENEW.Roam.prototype.showTip=function(e){
	var dataIndex=$(e.currentTarget).attr('dataIndex');
	if(dataIndex>=0){
		var list=[];
		var record={};
		var map={};
		
		if(this.roamType=='intl'){
			$('#tipDiv').html('');
			list=this.worldDataCache;
			record=list[dataIndex];
			map=this.pointMap;
			
			var name=record.id.split('(')[0];
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
			var ratio=$('#world').width()/$('.bgC').width();
			var delta=$('#world').css('margin-left').replace('px','')*1;
			var originX=pos.x*ratio+delta;
			var originY=pos.y;
			
			var centerX=pos.x*ratio+delta;
			var centerY=pos.y;
			
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
			
			var marker='<img src="'+BASEPATH+'/static/styles/local-lsm/roam/images/dot.gif" style="position:absolute;top:'+(originY-32)+'px;left:'+(originX-32)+'px;;">'
			$('#tipDiv').append(marker);
			
			var tip='<div intl_name="'+name+'" class="roamTipNew" style="z-index:1;padding:5px 0px 0px 40px;font-size:28px;position:absolute;top:'+centerY+'px;left:'+centerX+'px;">'
			+'<span>'+showName+'</span>'
			+'<div style="border:solid 0px #ff0000;margin-left:-35px;">'
				+'<img style="float:left;" src="'+BASEPATH+'/static/styles/local-lsm/roam/images/country_map/'+this.imgMap[name]+'.png">'
				+'<div style="width:110px;float:left;text-align:right;" class="ciiekpistyle fontImportantInfo">'+value+'</div><div style="float:left;padding-top:15px;" class="ciiekpistyle fontUnitTime">人</div>'
			+'</div>'
			+'</div>';
			$('#tipDiv').append(tip);
			
		
		}else if(this.roamType=='pro'){
			$('#tipDivPro').html('');
			list=this.provinceDataCache;
			record=list[dataIndex];
			map=this.provincePointMap;
			
			var name=record.id.split('(')[0];
			name=name.replace(/\s/g,'');
			var value=record.user_cnt;
			//var pos={x:Math.random()*2400,y:Math.random()*1200}
			var pos={x:0,y:200}
			if(map[name]!=null){
				pos=map[name];
			}else{
				console.log(name);
			}
			
			var ratio=$('#china').height()/$('#chinaDiv').height();
			
			var originX=pos.x;
			var originY=pos.y*ratio;
			
			var centerX=pos.x;
			var centerY=pos.y*ratio;
			
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
			var marker='<img src="'+BASEPATH+'/static/styles/local-lsm/roam/images/dot.gif" style="position:absolute;top:'+(originY-32)+'px;left:'+(originX-32)+'px;;">'
			$('#tipDivPro').append(marker);
			
			var tip='<div pro_name="'+name+'" class="roamTipNew" style="z-index:1;padding:5px 0px 0px 40px;font-size:28px;position:absolute;top:'+centerY+'px;left:'+centerX+'px;">'
			+'<span>'+name+'</span>'
			+'<div style="border:solid 0px #ff0000;margin-left:-35px;">'
				+'<img style="float:left;" src="'+BASEPATH+'/static/styles/local-lsm/roam/images/pro.png">'
				+'<div style="width:110px;float:left;text-align:right;" class="ciiekpistyle fontImportantInfo">'+value+'</div><div style="float:left;padding-top:15px;" class="ciiekpistyle fontUnitTime">人</div>'
			+'</div>'
			+'</div>';
			$('#tipDivPro').append(tip);
			
		
		}
		
	}else{
		$('#tipDiv').html('');
		$('#tipDivPro').html('');
	}
};
CIIENEW.Roam.prototype.resetGradient=function(gradientCount){
	this.gradientArr=[];
	var eachStep=gradientCount/(this.gradientBase.length-1);
	for(var i=0;i<this.gradientBase.length-1;i++){
		var gradient = new gradientColor(this.gradientBase[i],this.gradientBase[i+1],eachStep);
		this.gradientArr=this.gradientArr.concat(gradient);
	}
};
/*CIIENEW.Roam.prototype.posChange=function(){
	
};*/
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
	
	$('#world').find('polygon').css('fill','rgba(122,187,224,1)');
	$('#world').find('path').css('fill','rgba(122,187,224,1)');
	
	$('#world').find('polygon').css('stroke','#ffffff');//142f6f
	$('#world').find('polygon').css('stroke-width','0.5');
	
	$('#world').find('path').css('stroke','#ffffff');
	$('#world').find('path').css('stroke-width','0.5');
	
	$('#world').find('#path149').css('fill','rgba(64,95,189,1)');
	//$('#world').find('#path149').css('stroke','#ff0000');
	
	$('#world').find('#path39').css('fill','rgba(64,95,189,1)');
	//$('#world').find('#path39').css('stroke','#ff0000');
	
	$('#world').find('#polygon290').css('fill','rgba(64,95,189,1)');
	//$('#world').find('#polygon290').css('stroke','#ff0000');
	
	
	$('#world').find('polygon').attr('dataIndex',-1);
	$('#world').find('path').attr('dataIndex',-1);
	
	
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
	
	$('#china').find('polygon').css('fill','rgba(122,187,224,1)');
	$('#china').find('path').css('fill','rgba(122,187,224,1)');
	
	$('#china').find('polygon').css('stroke','#142f6f');
	$('#china').find('polygon').css('stroke-width','0.1');
	
	$('#china').find('path').css('stroke','#142f6f');
	$('#china').find('path').css('stroke-width','0.1');
	
	$('#china').find('#path26').css('fill','rgba(151,229,255,1)');
	$('#china').find('#path26').css('border','solid 1px #142f6f');
	
	$('#china').find('polygon').attr('dataIndex',-1);
	$('#china').find('path').attr('dataIndex',-1);
};
CIIENEW.Roam.prototype.closeAirport=function(e){
	this.hideAirRoam(true);
};
CIIENEW.Roam.prototype.updateHotspot=function(hot){
	this.hotspot=hot;
	this.update();
	
};

CIIENEW.Roam.prototype.switchRoamType=function(e){
	/*var cls=$(e.currentTarget).attr('class');
	if(cls=="roamcenterswitch_intl"){
		$(e.currentTarget).attr('class','roamcenterswitch_pro');
		$('#worldDiv').css('display','none');
		$('#chinaDiv').css('display','block');
		this.roamType='pro';
		$('#legend').show();
	}else{
		$(e.currentTarget).attr('class','roamcenterswitch_intl');
		$('#chinaDiv').css('display','none');
		$('#worldDiv').css('display','block');
		this.roamType='intl';
		$('#legend').show();
	}
	this.update();
	parent.updateRoamType(this.roamType);*/
};

CIIENEW.Roam.prototype.update=function(){
	var hotspot=this.hotspot
	if(this.hotspot=="上海"){
		hotspot="all";
	}
	if(this.roamType=='intl'){
		this.cdm.getUserDist({hot_name:hotspot,roamType:"intl",topN:2000},this.drawWorldChart.bind(this));
	}else if(this.roamType=='pro'){
		this.cdm.getUserDist({hot_name:hotspot,roamType:"pro",topN:200},this.drawProChart.bind(this));
	}
	
	/*if(this.roamType=='intl'){
		this.cdm.getIntlRoamTopN({topN:200,hot_name:this.hotspot},this.drawWorldChart.bind(this));
	}else if(this.roamType=='pro'){
		this.cdm.getProRoamTopN({topN:200,hot_name:this.hotspot},this.drawProChart.bind(this));
	}*/
	
	
	
	this.cdm.getUserDistAll({
		intl_name:null,
		hot_name:'J-浦东机场'
	},function(result){
		var record=result.data;
		record=record['intl'];
		var value=record.user_cnt_dist;
		$('#airportpddist').text(value);
		$('#airportpddist').attr('g2_uc',record.g2_uc*1);
		$('#airportpddist').attr('g4_uc',record.g4_uc*1);
		$('#airportpddist').attr('fdd_uc',record.fdd_uc*1);
		
		var value=record.user_cnt+'';
		var currentNum=$('#airportpd>div').length-1;
		$('#airportpd>div').text('0');
		for(var i=value.length-1;i>=0;i--){
			$('#airportpd>div:eq('+currentNum+')').text(value.charAt(i));
			currentNum--;
		}
	});
	
	
	this.cdm.getUserDistAll({
		intl_name:null,
		hot_name:'J-虹桥机场'
	},function(result){
		var record=result.data;
		record=record['intl'];
		var value=record.user_cnt_dist;
		$('#airporthqdist').text(value);
		$('#airporthqdist').attr('g2_uc',record.g2_uc*1);
		$('#airporthqdist').attr('g4_uc',record.g4_uc*1);
		$('#airporthqdist').attr('fdd_uc',record.fdd_uc*1);
		
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
	//this.startProvincePlay();
	
	var count=0;
	var step=100;
	$('#legendTips>div').text('0▶');
	this.resetGradient(step);
	var max=1;
	var legends=6;
	if(list.length>0){
		max=list[0].user_cnt;
	}
	for(var i=0;i<list.length;i++){
		var record=list[i];
		var name=record.id.split('(')[0];
		var index=step-Math.floor(record.user_cnt/max*step);
	/*	console.log(name+':'+this.provinceMap[name]);*/
		if(this.provinceMap[name]!=null){
			var ids=this.provinceMap[name].split(',');
			for(var j=0;j<ids.length;j++){
				if(record.user_cnt>0){
					$('#china').find('#'+ids[j]).css('fill',this.gradientArr[index]);
				}
				$('#china').find('#'+ids[j]).attr('dataIndex',i);
			}
		}
	}
	for(var i=0;i<legends-1;i++){
		$('#legendTips>div:eq('+i+')').text(Math.floor(max/legends*(legends-i))+'▶');
	}
	
	
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
		var name=record.id.split('(')[0].replace(/\s+/g,'');
		var value=record.user_cnt;
		//var pos={x:Math.random()*2400,y:Math.random()*1200}
		var pos={x:0,y:200}
		if(map[name]!=null){
			pos=map[name];
		}else{
			/*console.log(name);*/
		}
		
		var originX=pos.x;
		var originY=pos.y;
		//roamTipNew 282*112
		var movePos={};
		var movePos1=this.resortTip({x:originX,y:originY},{x:originX,y:originY},existPosList,0,0);
		var movePos2=this.resortTip({x:originX,y:originY},{x:originX,y:originY},existPosList,0,0,true);
		
		var distance1=(movePos1.x-originX)*(movePos1.x-originX)+(movePos1.y-originY)*(movePos1.y-originY);
		var distance2=(movePos2.x-originX)*(movePos2.x-originX)+(movePos2.y-originY)*(movePos2.y-originY);
		if(distance1<distance2){
			movePos=movePos1;
		}else{
			movePos=movePos2;
		}
		
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
		
		var marker='<img src="'+BASEPATH+'/static/styles/local-lsm/roam/images/dot.gif" style="position:absolute;top:'+(originY-32)+'px;left:'+(originX-32)+'px;;">'
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
	var count=0;
	$('#legendTips>div').text('0▶');
	var step=100;
	this.resetGradient(step);
	var max=1;
	var legends=6;
	if(list.length>0){
		max=list[0].user_cnt;
	}
	for(var i=0;i<list.length;i++){
		var record=list[i];
		var name=record.id.split('(')[0].replace(/\s+/g,'');
		var index=step-Math.floor(record.user_cnt/max*step);
		/*console.log(name+':'+this.polygonMap[name]);*/
		if(this.polygonMap[name]!=null){
			var ids=this.polygonMap[name].split(',');
			for(var j=0;j<ids.length;j++){
				if(record.user_cnt>0){
					$('#world').find('#'+ids[j]).css('fill',this.gradientArr[index]);
				}
				$('#world').find('#'+ids[j]).attr('dataIndex',i);
			}
			console.log(name+":index-"+i+",polygon:"+ids.join(","));
		}
	}
	for(var i=0;i<legends-1;i++){
		$('#legendTips>div:eq('+i+')').text(Math.floor(max/legends*(legends-i))+'▶');
	}
	this.worldDataCache=list;
	//this.startWorldPlay();
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
			/*console.log(name);*/
		}
		var showName=name;
		if(showName=="香港"||showName=="澳门"||showName=="台湾"){
			showName="中国"+showName;
		}
		var originX=pos.x;
		var originY=pos.y;
		//roamTipNew 282*112
		var movePos={};
		var movePos1=this.resortTip({x:originX,y:originY},{x:originX,y:originY},existPosList,0,0);
		var movePos2=this.resortTip({x:originX,y:originY},{x:originX,y:originY},existPosList,0,0,true);
		
		var distance1=(movePos1.x-originX)*(movePos1.x-originX)+(movePos1.y-originY)*(movePos1.y-originY);
		var distance2=(movePos2.x-originX)*(movePos2.x-originX)+(movePos2.y-originY)*(movePos2.y-originY);
		if(distance1<distance2){
			movePos=movePos1;
		}else{
			movePos=movePos2;
		}
		
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
		
		var marker='<img src="'+BASEPATH+'/static/styles/local-lsm/roam/images/dot.gif" style="position:absolute;top:'+(originY-32)+'px;left:'+(originX-32)+'px;;">'
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
CIIENEW.Roam.prototype.resortTip=function(pos,origin,existPosList,rad,r,isReverse){
	var gap=10;
	var tipWidth=282;
	var tipHeight=112;
	var hasMoved=false;
	var deltaRad=isReverse==true?-Math.PI/12:Math.PI/12;
	var deltaR=20;
	for(var j=0;j<existPosList.length;j++){
		var epos=existPosList[j];
		if(
			((pos.x*1<epos.x*1+tipWidth)&&(pos.x*1>epos.x*1-tipWidth)
			&&(pos.y*1<epos.y*1+tipHeight)&&(pos.y*1>epos.y*1-tipHeight))
		){
			rad+=deltaRad;
			if(Math.abs(rad)>=2*Math.PI||r==0){
				r+=deltaR;
			}
			pos.x=origin.x+r*Math.cos(rad);
			pos.y=origin.y+r*Math.sin(rad);
			
			
			hasMoved=true;
		}
	}
	if(hasMoved){
		pos=this.resortTip(pos,origin,existPosList,rad,r,isReverse);
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