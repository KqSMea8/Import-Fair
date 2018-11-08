var matching={
		log : function(value){
			var name={"1":["地震局","地震","上海市地震局","中国地震局"],
					  "2":["电网","国网上海市电力公司青浦供电公司"],
					  "3":["法院","人民法院","上海市高级人民法院","最高人民法院"],
					  "4":["防汛","上海市防汛信息中心"],
					  "5":["工会","上海市总工会"],
					  "6":["工商管理局","上海市工商行政管理局","工商行政管理局"],
					  "7":["国徽","上海市人民政府办公厅","中国人民武装警察部队司令部信息化部","中国人民武装警察部队警卫局","武装警察","武警上海总队","武警","上海市人民代表大会常务委员会办公厅","人民代表","上海市人民政府外事办公室","人民政府","上海市人民政府办公信息处理中心"],
					  "8":["海关","中华人民共和国上海海关","中华人民共和国上海出入境检验检疫局","入境检验"],
					  "9":["海事局","中华人民共和国上海海事局","交通运输部东海航海保障中心上海航标处","中华人民共和国江苏海事局"],
					  "10":["海洋预报","国家海洋环境预报中心","国家海洋预报中心"],
					  "11":["华示","华示（上海）实业有限公司"],
					  "12":["检察院","上海市人民检察院","上海市人民检察院第二分院"],
					  "13":["减灾网","民政部国家减灾中心","减灾"],
					  "14":["经信委","上海市经济和信息化委员会","经济和信息化"],
					  "15":["警徽","公安","上海市公安局","武警上海总队","武警","上海市公安局嘉定分局","上海市公安局技术侦察总队","上海市公安局交通警察总队","警察","上海市公安边防总队","上海市公安局青浦分局","上海市公安局网络安全保卫总队","上海市公安局城市轨道和公交总队","上海市公安边防总队边防支队"],
					  "16":["开店宝支付服务有限公司","开店宝"],
					  "17":["科技网络","上海科技网络通信有限公司"],
					  "18":["科思达","上海科思达网络信息咨询服务有限公司"],
					  "19":["旅游局","上海市旅游局"],
					  "20":["默认"],
					  "21":["上海市气象局","上海市公共气象服务中心"],
					  "22":["青浦科技委","上海市青浦区科学技术委员会"],
					  "23":["上海三角标识","上海市城乡建设和交通管理委员会","国家计算机网络与信息安全管理中心上海分中心","上海市体育局","上海市城乡建设和交通发展研究院"],
					  "24":["上海水务海洋","上海市供水调度监测中心"],
					  "25":["社保","上海市社会保障卡服务中心","上海市劳动和社会保障学会","社会保障","上海市人力资源和社会保障局信息中心","上海市人力资源和社会保障咨询服务中心"],
					  "26":["食药监局","上海市食品药品监督管理局科技情报研究所","药品监督管理局"],
					  "27":["税务局","上海市地方税务局"],
					  "28":["统一战线","中共上海市委统战部事业管理中心"],
					  "29":["网上房地产","上海市房地产交易中心"],
					  "30":["无线电管理局","上海市无线电管理局","上海市无线电监测站"],
					  "31":["消防局","上海市消防局","消防"],
					  "32":["上海市医疗保险事业管理中心","上海市医药集中招标采购事务管理所","上海市医疗保险监督检查所"],
					  "33":["浙江渔业局","浙江省海洋与渔业局"],
					  "34":["政协","政协上海市委员会办公厅","委员会"],
					  "35":["质监局","上海市质量技术监督局","质量技术监督局"],
					  "36":["中国浦东干部学院","浦东干部学院"],
					  "37":["军徽","上海警备区司令部","中国人民解放军61398部队","解放军"],
					  "38":["锦江汽车","上海锦江汽车服务有限公司"],
					  "39":["新华通讯社","新华通讯社"],
					  "40":["上海仪电","上海仪电"],
					  "41":["通联金融","上海通联金融信息服务有限公司"],
					  "42":["电信科技","电信科技"]};
			var company =20;
			var namelength=utils.getJsonName(name);
			for(var f=1;f<=namelength.length;f++){
				for(var q=0;q<name[f].length;q++){
					var bool = value.indexOf(name[f][q]);
					if(bool>=0){
						company=f+"";
					}
				}
			}			
			var img="";
			switch(company){
			case "1":
				img=eastcom.baseURL+"/static/images/spline/log/1.png";
				break;
			case "2":
				img=eastcom.baseURL+"/static/images/spline/log/2.png";
				break;
			case "3":
				img=eastcom.baseURL+"/static/images/spline/log/3.png";
				break;
			case "4":
				img=eastcom.baseURL+"/static/images/spline/log/4.png";
				break;
			case "5":
				img=eastcom.baseURL+"/static/images/spline/log/5.png";
				break;
			case "6":
				img=eastcom.baseURL+"/static/images/spline/log/6.png";
				break;
			case "7":
				img=eastcom.baseURL+"/static/images/spline/log/7.png";
				break;
			case "8":
				img=eastcom.baseURL+"/static/images/spline/log/8.png";
				break;
			case "9":
				img=eastcom.baseURL+"/static/images/spline/log/9.png";
				break;
			case "10":
				img=eastcom.baseURL+"/static/images/spline/log/10.png";
				break;
			case "11":
				img=eastcom.baseURL+"/static/images/spline/log/11.png";
				break;
			case "12":
				img=eastcom.baseURL+"/static/images/spline/log/12.png";
				break;
			case "13":
				img=eastcom.baseURL+"/static/images/spline/log/13.png";
				break;
			case "14":
				img=eastcom.baseURL+"/static/images/spline/log/14.png";
				break;
			case "15":
				img=eastcom.baseURL+"/static/images/spline/log/15.png";
				break;
			case "16":
				img=eastcom.baseURL+"/static/images/spline/log/16.png";
				break;
			case "17":
				img=eastcom.baseURL+"/static/images/spline/log/17.png";
				break;
			case "18":
				img=eastcom.baseURL+"/static/images/spline/log/18.png";
				break;
			case "19":
				img=eastcom.baseURL+"/static/images/spline/log/19.png";
				break;
			case "20":
				img=eastcom.baseURL+"/static/images/spline/log/20.png";
				break;
			case "21":
				img=eastcom.baseURL+"/static/images/spline/log/21.png";
				break;
			case "22":
				img=eastcom.baseURL+"/static/images/spline/log/22.png";
				break;
			case "23":
				img=eastcom.baseURL+"/static/images/spline/log/23.png";
				break;
			case "24":
				img=eastcom.baseURL+"/static/images/spline/log/24.png";
				break;
			case "25":
				img=eastcom.baseURL+"/static/images/spline/log/25.png";
				break;
			case "26":
				img=eastcom.baseURL+"/static/images/spline/log/26.png";
				break;
			case "27":
				img=eastcom.baseURL+"/static/images/spline/log/27.png";
				break;
			case "28":
				img=eastcom.baseURL+"/static/images/spline/log/28.png";
				break;
			case "29":
				img=eastcom.baseURL+"/static/images/spline/log/29.png";
				break;
			case "30":
				img=eastcom.baseURL+"/static/images/spline/log/30.png";
				break;
			case "31":
				img=eastcom.baseURL+"/static/images/spline/log/31.png";
				break;
			case "32":
				img=eastcom.baseURL+"/static/images/spline/log/32.png";
				break;
			case "33":
				img=eastcom.baseURL+"/static/images/spline/log/33.png";
				break;
			case "34":
				img=eastcom.baseURL+"/static/images/spline/log/34.png";
				break;
			case "35":
				img=eastcom.baseURL+"/static/images/spline/log/35.png";
				break;
			case "36":
				img=eastcom.baseURL+"/static/images/spline/log/36.png";
				break;
			case "37":
				img=eastcom.baseURL+"/static/images/spline/log/37.png";
				break;
			case "38":
				img=eastcom.baseURL+"/static/images/spline/log/38.png";
				break;
			case "39":
				img=eastcom.baseURL+"/static/images/spline/log/39.png";
				break;
			case "40":
				img=eastcom.baseURL+"/static/images/spline/log/40.png";
				break;
			case "41":
				img=eastcom.baseURL+"/static/images/spline/log/41.png";
				break;
			case "42":
				img=eastcom.baseURL+"/static/images/spline/log/42.png";
				break;
			default:
				img=eastcom.baseURL+"/static/images/spline/log/20.png";
				break;
			}	
			return img;
		},
		weather : function(value){
			var img="";
			switch(value){
			case "dayu":
				img=eastcom.baseURL+"/static/images/overview/weather/dayu.png";
				break;
			case "duoyun":
				img=eastcom.baseURL+"/static/images/overview/weather/duoyun.png";
				break;
			case "qing":
				img=eastcom.baseURL+"/static/images/overview/weather/qingtian.png";
				break;
			case "xiaoyu":
				img=eastcom.baseURL+"/static/images/overview/weather/xiaoyu.png";
				break;
			case "yintian":
				img=eastcom.baseURL+"/static/images/overview/weather/yitian.png";
				break;
			default:
				img="";
				break;
			}	
			return img;
		}
}