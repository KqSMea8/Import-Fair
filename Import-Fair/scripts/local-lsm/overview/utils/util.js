var g=0;
var utils = {
	//特殊页面返回
	backSkip : function(){
		history.go(-1);
	},
	
	//只能输入英文和数字的正则表达式
	getEngMath : function(str){
		var result = true;
		if(!str){
			result = false;
		}else if(str.length < 6 || str.length > 20){
			result = false;
		}else{
			for (var i = 0; i < str.length; i++) {
				var c = str.charAt(i);
				if (/[^a-zA-Z0-9]/g.test(c)) {
					result = false;
					break;
				}
			}
		}
		return result;
	},
	
	//获取base64编码
	getBase64 : function(source, callback) {
		var file = source.files[0];
		if (window.FileReader) {
			var fr = new FileReader();
			fr.onloadend = function(e) {
				callback(e.target.result);
			};
			fr.readAsDataURL(file);
		}
	},
	
	//只能输入汉字英文和数字的正则表达式
	getCHAEngMath : function(str){
		var result = true;
		if(!str){
			result = false;
		}else if(str.length<3|| str.length> 20){
			result = false;
		}else{
			for (var i = 0; i < str.length; i++) {
				var c = str.charAt(i);
				if (/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\.\_]/g.test(c)) {
					result = false;
					break;
				}
			}
		}
		return result;
	},
	
	//手机号码是否格式正确的验证
	checkPhone:function(phoneVal){
		var result = true;
		if(!phoneVal){
			result = false;
		}else if(phoneVal.length != 11){
			result = false;
		}else{
			var myreg = /^0?1[0-9][0-9]\d{8}$/;
			if(!myreg.test(phoneVal)){
				result = false;
			}
		}
		return result;
	},
	
	//时间格式是否格式正确的验证
	time:function(time){
		var result = true;
		if(!time){
			result = false;
		}else{
			var myreg = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
			if(!myreg.test(time)){
				result = false;
			}
		}
		return result;
	},
	
	//添加逗号
	Thousand:function(num){
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
	},
	
	//金额类数据格式验证
	checkDouble:function(amt){
		var result = true;
		if(!amt){
			result = false;
		}else{
			var myreg = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/;
			if(!myreg.test(amt)){
				result = false;
			}
		}
		return result;
	},
	
	//整数类数据格式验证
	checkInteger:function(amt){
		var result = true;
		if(!amt){
			result = false;
		}else{
			var myreg = /^[0-9]*$/;
			if(!myreg.test(amt)){
				result = false;
			}
		}
		return result;
	},
	
	//汉字验证
	china:function(amt){
		var result = true;
		if(!amt){
			result = false;
		}else{
			var myreg = /^[\u4e00-\u9fa5]/;
			if(!myreg.test(amt)){
				result = false;
			}
		}
		return result;
	},
	
	//除去数字
	RemoveInt : function(strValue) {
		strValue=strValue+"";
		if (strValue != null && strValue != "") {
			var reg = /[a-zA-Z]+|[\u4e00-\u9fa5]|[`~!@#$^&*()=|{}':;',\\[\\].<>?~！@#￥……&*（）——|{}【】‘；：”“'。，、？%+_]/g;
			return strValue.match(reg).join("");
		} else
			return "";
	},
	
	//获取数字
	GetInt : function(strValue) {
		strValue=strValue+"";
		if (strValue != null && strValue != "") {
			var reg = /[\u4e00-\u9fa5]|[a-zA-Z]|[`~!@#$^&*()=|{}':;',\\[\\].<>?~！@#￥……&*（）——|{}【】‘；：”“'。，、？%+_]/g;
			return strValue.replace(reg, "");
		} else
			return "";
	},
	
	requestParam:function(key){
		var url = window.location.href;
		if(url){
			if(url.indexOf('#') != -1){
				url = url.substring(url.indexOf('#')+1,url.length);
				if(url.indexOf('?') != -1){
					url = url.substring(url.indexOf('?')+1,url.length);
					var paramArray = url.split('&');
					for(var i in paramArray){
						if(paramArray[i] && paramArray[i].split('=')[0] == key){
							return paramArray[i].split('=')[1];
						}
					}
				}
			}
		}
	},

	/**
	 * 执行post
	 * @param {Object} serviceName 服务名
	 * @param {Object} postData 最外层数据
	 * @param {Object} busidata 中层数据
	 * @param {Object} svrdata 里层数据
	 * @param {Object} callback 回调
	 */
	doPost:function(serviceName, postData, busidata, svrdata, callback) {
		console.log(new Date());
		processPostData(serviceName, postData, busidata, svrdata, callback, undefined);
	},
	
	//写本地Session文件
	setItem : function(key,value){
		window.sessionStorage.setItem(key,value);
		//window.localStorage.setItem(key,value);
	},
	
	//获取本地session文件
	getItem : function(key){
		var str = window.sessionStorage.getItem(key);
		//var str = window.localStorage.getItem(key);
		if(utils.isStringEmpty(str))
			str = "";
		return str;
	},
	
	//移除本地session文件
	removeItem : function(key){
		window.sessionStorage.removeItem(key);
		//window.localStorage.removeItem(key);
	},
	
	//清空本地session文件
	clearStorage : function(){
		window.sessionStorage.clear();
		if(1!=1){
			for(var i=0;i<window.sessionStorage.length;i++){
				window.sessionStorage.removeItem(window.sessionStorage.key(i));
			}
		}
	},
	
	//写本地文件
	setLItem : function(key,value){
		window.localStorage.setItem(key,value);
	},
	
	//获取本地文件
	getLItem : function(key){
		return window.localStorage.getItem(key);
	},
	
	//移除本地文件
	removeLItem : function(key){
		window.localStorage.removeItem(key);
	},
	
	//清空本地文件
	clearLStorage : function(){
		window.localStorage.clear();
		if(1!=1){
			for(var i=0;i<window.localStorage.length;i++){
				window.localStorage.removeItem(window.localStorage.key(i));
			}
		}
	},

	//判断字符串是否为空
	isStringEmpty : function(str){
		var str=str+"";
		if (str == undefined || str == "undefined" || str == null || str == "null" || str == ""||str== "NaN") {
				return true;
		}
		return false;
	},
	
	isIntEquals : function(target,source){
		try{
			source=parseInt(source);
		}catch(e){
			return false;
		}
		return target==source+''||target==parseInt(source);
	},
	
	parseInt : function(value){
		try{
			return parseInt(value);	
		}catch(e){
			return 	value;
		}	
	},
	
	//将分转换为元
	moneyFromInt : function(value){
		return value/100.00;
	},
	
	addcomma:function(value){
		 var b=parseInt(value).toString();  
		   var len=b.length;  
		   if(len<=3){return value;}  
		   var r=len%3;  
		   return r>0?b.slice(0,r)+","+b.slice(r,len).match(/\d{3}/g).join(","):b.slice(r,len).match(/\d{3}/g).join(",");  
	},
	
	ErlFromGb:function(value){
		 var b=parseInt(value); 
		 var c=(b/1048576)+"";
		 var str = c.substring(0,c.indexOf(".") + 3);
		 return str;
	},
	ErlFromTb:function(value){
		 var b=parseInt(value); 
		 var c=(b/1073741824)+"";
		 var str = c.substring(0,c.indexOf(".") + 3);
		 return str;
	},
	//获取两位小数
	ErlFromTwo:function(value){
		 var b=value; 
		 var str = b.substring(0,b.indexOf(".") + 3);
		 return str;
	},
	// 成功信息
	showSuccessPrompt : function(prompt,bloer1,bloer2){
		EjectFrame(prompt,bloer1,bloer2,"showSuccessPrompt");
	},
	
	// 提示信息
	showHintPrompt : function(prompt,bloer1,bloer2){
		EjectFrame(prompt,bloer1,bloer2,"showHintPrompt");
	},
	
	// 错误信息
	showErrPrompt : function(prompt,bloer1,bloer2){
		EjectFrame(prompt,bloer1,bloer2,"showErrPrompt");
	},
	
	// 警告信息
	showWarnPrompt : function(prompt,bloer1,bloer2){
		EjectFrame(prompt,bloer1,bloer2,"showWarnPrompt");
	},	
	
	// 底端警告信息
	showBottomWarnPrompt : function(prompt,bloer){
		EjectFrame(prompt,bloer,"showBottomWarnPrompt");
	},
	
	//判断是否有中文
	checkNoCh:function(o){
		var str=o.split("\\")[o.split("\\").length-1];
		var re=/[\u0391-\uFFE5]+/g;
		if (str.match(re)!=null) return false; //有中文
		else return true; //无中文
	},
	
	//保留小数点后两位
	changeTwoDecimal:function(x,length){
		if(utils.isStringEmpty(length)){
			length=2;
		}
		var f_x = parseFloat(x);
	    if (isNaN(f_x)) {
	    	console.log('数据有问题，无法转换');
	    	console.log(x);
	    	console.log('function:changeTwoDecimal->parameter error');
	        return false;
	    }
	    if(length==1){
		    var f_x = Math.round(x * 10) / 10;
	    }else{
	    	var f_x = Math.round(x * 100) / 100;
	    }
	    var s_x = f_x.toString();
	    var pos_decimal = s_x.indexOf('.');
	    if (pos_decimal < 0) {
	        pos_decimal = s_x.length;
	        s_x += '.';
	    }
	    while (s_x.length <= pos_decimal + length) {
	        s_x += '0';
	    }
	    if(s_x=="0.00"){
	    	 return "0";
	    }else{
	    	 return s_x;
	    }
	},
	Erl:function(value){
		var b=parseInt(value);
		var c=b+"";
		var arr=[];
		if(c.length>3&&c.length<9){
			arr.value=b/1000;
			arr.Company="万";
		}else if(c.length>8&&c.length<14){
			arr.value=b/10000000;
			arr.Company="亿";
		}
		return arr;
	},
	//求两个时间的天数差 日期格式为 YYYY-MM-dd   
	daysBetween:function(DateOne,DateTwo)
	{   
	    var OneMonth = DateOne.substring(5,DateOne.lastIndexOf ('-'));  
	    var OneDay = DateOne.substring(DateOne.length,DateOne.lastIndexOf ('-')+1);  
	    var OneYear = DateOne.substring(0,DateOne.indexOf ('-'));  
	  
	    var TwoMonth = DateTwo.substring(5,DateTwo.lastIndexOf ('-'));  
	    var TwoDay = DateTwo.substring(DateTwo.length,DateTwo.lastIndexOf ('-')+1);  
	    var TwoYear = DateTwo.substring(0,DateTwo.indexOf ('-'));  
	  
	    var cha=((Date.parse(OneMonth+'/'+OneDay+'/'+OneYear)- Date.parse(TwoMonth+'/'+TwoDay+'/'+TwoYear))/86400000);   
	    return cha;
	},
	
	//格式化 YYYYMMDDHHMMSS或 HHMMSS为 HH时MM分SS秒
	formateTime:function(inStr){
		var tmpStr = inStr;
		if(inStr.length>=14)
			tmpStr = inStr.substr(8,6);
		tmpStr = tmpStr.substr(0,2)+"时"+tmpStr.substr(2,2)+"分"+tmpStr.substr(4,2)+"秒";
		return tmpStr;
	},
	
	//格式化 YYYYMMDDHHMMSS 为 MM月DD日 HH时MM分
	formateMMDDHHMM:function(inStr){
		if(inStr==null) return "";
		if(inStr.length<8) return "";
		if(inStr.length>=14)
			inStr = inStr.substr(4,2)+"月"+inStr.substr(6,2)+"日 "+inStr.substr(8,2)+"时"+inStr.substr(10,2)+"分";
		else if(inStr.length == 12)
			inStr = inStr.substr(4,2)+"月"+inStr.substr(6,2)+"日 "+inStr.substr(8,2)+"时"+inStr.substr(10,2)+"分";
		
		return inStr;
	},
	
	//格式化 YYYYMMDDHHMMSS 为 MM/DD HH:MM
	formateMMDDHHMM_2:function(inStr){
		if(inStr==null) return "";
		if(inStr.length<8) return "";
		if(inStr.length>=14)
			inStr = inStr.substr(4,2)+"/"+inStr.substr(6,2)+" "+inStr.substr(8,2)+":"+inStr.substr(10,2);
		else if(inStr.length == 12)
			inStr = inStr.substr(4,2)+"/"+inStr.substr(6,2)+" "+inStr.substr(8,2)+":"+inStr.substr(10,2);
		
		return inStr;
	},
	
	//格式化 YYYYMMDDHHMMSS 为 YYYY年MM月DD日 HH时MM分SS秒
	formateDateTime:function(inStr){
		if(inStr==null) return "";
		if(inStr.length<8) return "";
		if(inStr.length>=14)
			inStr = inStr.substr(0,4)+"年"+inStr.substr(4,2)+"月"+inStr.substr(6,2)+"日 "+inStr.substr(8,2)+"时"+inStr.substr(10,2)+"分"+inStr.substr(12,2)+"秒";
		else if(inStr.length == 12)
			inStr = inStr.substr(0,4)+"年"+inStr.substr(4,2)+"月"+inStr.substr(6,2)+"日 "+inStr.substr(8,2)+"时"+inStr.substr(10,2)+"分";
		
		return inStr;
	},
	
	//格式化 YYYYMMDD 为 YYYY年MM月DD日
	formateDate:function(inStr){
		if(inStr==null) return "";
		if(inStr.length<8) return "";
		inStr = inStr.substr(0,4)+"年"+inStr.substr(4,2)+"月"+inStr.substr(6,2)+"日";
		return inStr;
	},
	
	//获取月日信息
	getMonthDay:function(inStr){
		if(inStr==null) return "";
		if(inStr.length<8) return "";
		inStr = inStr.substr(4,2)+"月"+inStr.substr(6,2)+"日";
		return inStr;
	},
	
	//格式化 YYYYMMDD 为 YYYY-MM-DD HH:MM:SS
	formateEnDateTime:function(inStr){
		if(inStr==null) return "";
		if(inStr.length<14) return "";
		inStr = inStr.substr(0,4)+"-"+inStr.substr(4,2)+"-"+inStr.substr(6,2)+" "
			  + inStr.substr(8,2)+":"+inStr.substr(10,2)+":"+inStr.substr(12,2);
		return inStr;
	},
	
	//格式化 YYYYMMDD 为 YYYY-MM-DD HH:MM
	formateEnDateMinute:function(inStr){
		if(inStr==null) return "";
		if(inStr.length<12) return "";
		inStr = inStr.substr(0,4)+"-"+inStr.substr(4,2)+"-"+inStr.substr(6,2)+" "
			  + inStr.substr(8,2)+":"+inStr.substr(10,2);
		return inStr;
	},
	
	//格式化 YYYYMMDD 为 YYYY-MM-DD
	formateEnDate:function(inStr){
		if(inStr==null) return "";
		if(inStr.length<8) return "";
		inStr = inStr.substr(0,4)+"-"+inStr.substr(4,2)+"-"+inStr.substr(6,2);
		return inStr;
	},
	
	//格式化 HHMMSS 为 HH:MM:SS
	formateEnTime:function(inStr){
		if(inStr==null) return "";
		if(inStr.length<6) return "";
		inStr = inStr.substr(0,2)+":"+inStr.substr(2,2)+":"+inStr.substr(4,2);
		return inStr;
	},
	
	//格式化 YYYYMMDD 为 YYYY-MM
	formateEnmonth:function(inStr){
		if(inStr==null) return "";
		if(inStr.length<6) return "";
		inStr = inStr.substr(0,4)+"-"+inStr.substr(4,2);
		return inStr;
	},
	
	//格式化 YYYY-MM-DD 为 YYYYMMDD
	formateDate8Len:function(inStr){
		var OneMonth = inStr.substring(5,inStr.lastIndexOf ('-'));  
	    var OneDay = inStr.substring(inStr.length,inStr.lastIndexOf ('-')+1);  
	    var OneYear = inStr.substring(0,inStr.indexOf ('-'));
	    return OneYear+OneMonth+OneDay;
	},
	
	//格式化时间  HH:MM:SS 为 HHMMSS
	formateTime6Len:function(inStr){
		var strM = inStr.substring(3,inStr.lastIndexOf (':'));  
	    var strS = inStr.substring(inStr.length,inStr.lastIndexOf (':')+1);  
	    var strH = inStr.substring(0,inStr.indexOf (':'));
	    return strH+strM+strS;
	},
	
	//获取今天的日期
	getNowDate:function(separ){
		var myDate = new Date();
		var stryear = myDate.getFullYear();//获取完整的年份(4位,1970-????)
		var strMonth = myDate.getMonth()+1;       //获取当前月份(0-11,0代表1月)
		var strDate = myDate.getDate();        //获取当前日(1-31)
		
		return stryear+separ+utils.leftPad(strMonth,2)+separ+utils.leftPad(strDate,2);
	},
	
	//获取今天后几天或前几天的日期 days 大于0 表示后几天，小于0 表示前几天
	getNowDateOfDays:function(days,separ){
		var myDate = new Date(); //今天
		myDate.setDate(myDate.getDate() + days);
		var stryear = myDate.getFullYear();//获取完整的年份(4位,1970-????)
		var strMonth = myDate.getMonth()+1;       //获取当前月份(0-11,0代表1月)
		var strDate = myDate.getDate();        //获取当前日(1-31)
		
		return stryear+separ+utils.leftPad(strMonth,2)+separ+utils.leftPad(strDate,2);
	},
	
	//获取今天后几小时或前几小时的日期 days 大于0 表示后几小时，小于0 表示前几小时
	getNowstrhourOfDays:function(hour,separ1,separ2){
		var myDate = new Date(); //今天
		myDate.setHours(myDate.getHours() + hour);
		var stryear = myDate.getFullYear();//获取完整的年份(4位,1970-????)
		var strMonth = myDate.getMonth()+1;       //获取当前月份(0-11,0代表1月)
		var strDate = myDate.getDate();        //获取当前日(1-31)
		var strhour = myDate.getHours(); //获取当前小时数(0-23)
		var strm = myDate.getMinutes();     //获取当前分钟数(0-59)
		var strs = myDate.getSeconds();     //获取当前秒数(0-59)
		return stryear+separ1+utils.leftPad(strMonth,2)+separ1+utils.leftPad(strDate,2)
		+" "+utils.leftPad(strhour,2)+separ2+utils.leftPad(strm,2)+separ2+utils.leftPad(strs,2);
	},
	
	//获取今天后几分钟或前几分钟的日期 Minutes 大于0 表示后几分钟，小于0 表示前几分钟
	getNowstrhourOfgetMinutes:function(hour,separ1,separ2,time_bool){
		var myDate = new Date(); //今天
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
		+" "+utils.leftPad(strhour,2)+separ2+utils.leftPad(strm,2)+separ2+utils.leftPad(strs,2);
	},
	
	//获取年月日时分秒
	getMinuteDateTime:function(separ1,separ2,separ3){
		var myDate = new Date();
		var stryear = myDate.getFullYear();//获取完整的年份(4位,1970-????)
		var strMonth = myDate.getMonth()+1;       //获取当前月份(0-11,0代表1月)
		var strDate = myDate.getDate();        //获取当前日(1-31)
		var strhour = myDate.getHours(); //获取当前小时数(0-23)
		var strm = myDate.getMinutes();     //获取当前分钟数(0-59)
		
		return stryear+separ1
			  + utils.leftPad(strMonth,2)+separ1
			  + utils.leftPad(strDate,2)+separ2
			  + utils.leftPad(strhour,2)+separ3
			  + utils.leftPad(strm,2)+separ3
	},
	
	//获取中文年月日时分秒
	getChineseDateTime:function(separ3){
		var myDate = new Date();
		var stryear = myDate.getFullYear();//获取完整的年份(4位,1970-????)
		var strMonth = myDate.getMonth()+1;       //获取当前月份(0-11,0代表1月)
		var strDate = myDate.getDate();        //获取当前日(1-31)
		var strhour = myDate.getHours(); //获取当前小时数(0-23)
		var strm = myDate.getMinutes();     //获取当前分钟数(0-59)
		
		return stryear+"年"
			  + utils.leftPad(strMonth,2)+"月"
			  + utils.leftPad(strDate,2)+"日"
			  + utils.leftPad(strhour,2)+separ3
			  + utils.leftPad(strm,2);
	},
	
	//获取当前时分秒
	getNowTime:function(separ){
		var myDate = new Date();
		var strhour = myDate.getHours(); //获取当前小时数(0-23)
		var strm = myDate.getMinutes();     //获取当前分钟数(0-59)
		var strs = myDate.getSeconds();     //获取当前秒数(0-59)
		
		return utils.leftPad(strhour,2)+separ
			  + utils.leftPad(strm,2)+separ
			  + utils.leftPad(strs,2)+separ;
	},
	
	//获取年月日时分秒
	getNowDateTime:function(separ1,separ2,separ3){
		var myDate = new Date();
		var stryear = myDate.getFullYear();//获取完整的年份(4位,1970-????)
		var strMonth = myDate.getMonth()+1;       //获取当前月份(0-11,0代表1月)
		var strDate = myDate.getDate();        //获取当前日(1-31)
		var strhour = myDate.getHours(); //获取当前小时数(0-23)
		var strm = myDate.getMinutes();     //获取当前分钟数(0-59)
		var strs = myDate.getSeconds();     //获取当前秒数(0-59)
		var strms = myDate.getMilliseconds();    //获取当前毫秒数(0-999)
		
		return stryear+separ1
			  + utils.leftPad(strMonth,2)+separ1
			  + utils.leftPad(strDate,2)+separ2
			  + utils.leftPad(strhour,2)+separ3
			  + utils.leftPad(strm,2)+separ3
			  + utils.leftPad(strs,2)+separ3
			  + utils.leftPad(strms,3);
	},
	
	//13位时间戳转换标准时间
	timestampToTime:function (timestamp) {
		var date = new Date();//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        Y = date.getFullYear() + '-';
        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        D = (date.getDate()+1 < 10 ? '0'+(date.getDate()+1) : date.getDate()+1);
        h = date.getHours() + ':';
        m = date.getMinutes() + ':';
        s = date.getSeconds();
        return Y+M+D+h+m+s;
    },
    
	//13位时间戳转换中文时间
	timestampCHToTime:function (timestamp) {
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        Y = date.getFullYear() + '年';
        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '月';
        D = date.getDate() + '日';
        h = date.getHours() + '小时';
        m = date.getMinutes() + '分钟';
        s = date.getSeconds()+ '秒';
        return Y+M+D+" "+h+m+s;
    },
    
	//13位时间戳转换天数并格式化
	timestampToTime_date:function (timestamp) {
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        Y = date.getFullYear();
        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
        D = date.getDate();
        return Y+M+D;
    },
    
    //日期转换毫秒数
    starttimeHaoMiao :function(string){
    	var t = Date.parse(date);
    	if (!isNaN(t)) {
	        return new Date(Date.parse(date.replace(/-/g, "/")));
	    } else {
	        return new Date();
	    }
    },
    
	//质朴长存法  by lifesinger 
	leftPad:function(num, n) {  
	    var len = num.toString().length;  
	    while(len < n) {  
	        num = "0" + num;  
	        len++;  
	    }  
	    return num;  
	},
	
	//超过多少个字，截止显示
	showOutLength:function(str,n){
		var r=/[^\x00-\xff]/g;
		  if(str.replace(r,"mm").length<=n){return str;}
		  var m=Math.floor(n/2);
		  for(var i=m;i<str.length;i++){
		      if(str.substr(0,i).replace(r,"mm").length>=n){
		          return str.substr(0,i)+"...";
		      }
		  }
		  return str;
	},
	
	//截取含中文的字符
	cutCNString:function(str,n){
		var r=/[^\x00-\xff]/g;
		  if(str.replace(r,"mm").length<=n){return str;}
		  var m=Math.floor(n/2);
		  for(var i=m;i<str.length;i++){
		      if(str.substr(0,i).replace(r,"mm").length>=n){
		          return str.substr(0,i);
		      }
		  }
		  return str;
	},
	
	//session数据是否还有效
	isSessionValid:function(inType){
		var shopcode = utils.getItem(inType+".shopcode");
		if(utils.isStringEmpty(shopcode))
			return false;
		else return true;
	},
	
	//sleep
	sleep:function(numberMillis){
		var now = new Date();
		var exitTime = now.getTime() + numberMillis;
		while (true) {
			now = new Date();
			if (now.getTime() > exitTime)
				return;
		}
	},
	
	//获取随机字符串
	randomString:function(len) {
		len = len || 32;
		/****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
		var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
		var maxPos = $chars.length;
		var pwd = '';
		for (var i=0; i<len; i++) {
			pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
		}
		return pwd;
	},
	
	//获取随机字符串
	randomInt:function() {
		var Num=""; 
		for(var i=0;i<6;i++){ Num+=Math.floor(Math.random()*10); } 
		return Num;
	},
	//获取微信跳转页面url
	getWeRedirectUrl:function(appid,url){
		return "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appid
		+ "&redirect_uri=" + url
		+ "&response_type=code&scope=snsapi_base"
		+ "&state=1#wechat_redirect";
	},
	
	//HtmlDecode反编译
	htmlDecode:function(text){
		//1.首先动态创建一个容器标签元素，如DIV
	    var temp = document.createElement("div");
	    //2.然后将要转换的字符串设置为这个元素的innerHTML(ie，火狐，google都支持)
	    temp.innerHTML = text;
	    //3.最后返回这个元素的innerText(ie支持)或者textContent(火狐，google支持)，即得到经过HTML解码的字符串了。
	    var output = temp.innerText || temp.textContent;
	    temp = null;
	    return output;
	},
	
	//获取json名字  数组    json : json  level : 位数
	getFirstKeyInLevel:function (json, level) {
	    var levelNow = 0;
	    var key;
	    var obj = json;
	    do {
	        key = Object.keys(obj)[0];
	        levelNow++;
	        obj = obj[key];
	    } while (key && levelNow < level);
	    return key;
	},
	 
	//获取json名字  数组    json : json  level : 位数
	getFirstKeyInLevel:function (json, level) {
	    var levelNow = 0;
	    var key;
	    var obj = json;
	    do {
	        key = Object.keys(obj)[0];
	        levelNow++;
	        obj = obj[key];
	    } while (key && levelNow < level);
	    return key;
	},
	getJsonnull:function(obj){
		for(var key in obj) {
		 return false;
		}
		return true;
	},
	//获取json数组长度
	getJsonLeng : function(json) {
		var jsonLength = 0;
		for ( var i in json) {
			jsonLength++;
		}
		return jsonLength;
	},
	//获取json名字
	getJsonName : function(json) {
		var getJsonName=[];
		var s=0;
		for ( var i in json) {
			getJsonName[s]=i;
			s++;
		}
		return getJsonName;
	},
	// 获取数组key
	getArrKey : function(object){
		var values = [];
        for (var property in object)
            values.push(property);
        return values;
	},
	// 数字转换中文数字
	Arabia_To_SimplifiedChinese : function(Num) {
		for (i = Num.length - 1; i >= 0; i--) {
			Num = Num.replace(",", "")// 替换Num中的“,”
			Num = Num.replace(" ", "")// 替换Num中的空格
		}
		if (isNaN(Num)) { // 验证输入的字符是否为数字
			// alert("请检查小写金额是否正确");
			return;
		}
		// 字符处理完毕后开始转换，采用前后两部分分别转换
		part = String(Num).split(".");
		newchar = "";
		// 小数点前进行转化
		for (i = part[0].length - 1; i >= 0; i--) {
			if (part[0].length > 10) {
				// alert("位数过大，无法计算");
				return "";
			}// 若数量超过拾亿单位，提示
			tmpnewchar = ""
			perchar = part[0].charAt(i);
			switch (perchar) {
			case "0":
				tmpnewchar = "零" + tmpnewchar;
				break;
			case "1":
				tmpnewchar = "一" + tmpnewchar;
				break;
			case "2":
				tmpnewchar = "二" + tmpnewchar;
				break;
			case "3":
				tmpnewchar = "三" + tmpnewchar;
				break;
			case "4":
				tmpnewchar = "四" + tmpnewchar;
				break;
			case "5":
				tmpnewchar = "五" + tmpnewchar;
				break;
			case "6":
				tmpnewchar = "六" + tmpnewchar;
				break;
			case "7":
				tmpnewchar = "七" + tmpnewchar;
				break;
			case "8":
				tmpnewchar = "八" + tmpnewchar;
				break;
			case "9":
				tmpnewchar = "九" + tmpnewchar;
				break;
			}
			switch (part[0].length - i - 1) {
			case 0:
				tmpnewchar = tmpnewchar;
				break;
			case 1:
				if (perchar != 0)
					tmpnewchar = tmpnewchar + "十";
				break;
			case 2:
				if (perchar != 0)
					tmpnewchar = tmpnewchar + "百";
				break;
			case 3:
				if (perchar != 0)
					tmpnewchar = tmpnewchar + "千";
				break;
			case 4:
				tmpnewchar = tmpnewchar + "万";
				break;
			case 5:
				if (perchar != 0)
					tmpnewchar = tmpnewchar + "十";
				break;
			case 6:
				if (perchar != 0)
					tmpnewchar = tmpnewchar + "百";
				break;
			case 7:
				if (perchar != 0)
					tmpnewchar = tmpnewchar + "千";
				break;
			case 8:
				tmpnewchar = tmpnewchar + "亿";
				break;
			case 9:
				tmpnewchar = tmpnewchar + "十";
				break;
			}
			newchar = tmpnewchar + newchar;
		}
		// 替换所有无用汉字，直到没有此类无用的数字为止
		while (newchar.search("零零") != -1 || newchar.search("零亿") != -1
				|| newchar.search("亿万") != -1 || newchar.search("零万") != -1) {
			newchar = newchar.replace("零亿", "亿");
			newchar = newchar.replace("亿万", "亿");
			newchar = newchar.replace("零万", "万");
			newchar = newchar.replace("零零", "零");
		}
		// 替换以“一十”开头的，为“十”
		if (newchar.indexOf("一十") == 0) {
			newchar = newchar.substr(1);
		}
		// 替换以“零”结尾的，为“”
		if (newchar.lastIndexOf("零") == newchar.length - 1) {
			newchar = newchar.substr(0, newchar.length - 1);
		}
		return newchar;
	},
	
	//获取json的标识符
	split : function(aplit, d) {
		if (!this.isStringEmpty(aplit)) {
			var array = aplit.split(d);
			var nums = [];
			for (var i = 0; i < array.length; i++) {
				nums.push(array[i]);
			}
			return nums;
		}
	},
	 
	//强制修复datables的点击获取  obgect : this  id : id
	Datables_click:function(obgect,id){
		$("#"+id+" tbody tr:[role='row']").css('background-color','#FFFFFF');
		utils.Initselected(id);
		$($(obgect).parent().parent()).addClass("selected");
		$(".selected").css('background-color', '#E0EDFE');
		var Dtable = $("#"+id).DataTable();
		var row = Dtable.rows('.selected').data()[0];
		return row;
	},
	//强制修复datables的点击获取  obgect : this  id : id
	jqGrid_click:function(obgect,id){
		var ret = null;
		//获取当前的行符
		var rowId = $(obgect).parent().parent();
		if (utils.isStringEmpty(rowId[0])) {
			ret = $("#" + id).jqGrid('getRowData',
					$("#"+id).jqGrid('getGridParam', 'selrow'));
		} else {
			ret = $("#" + id).jqGrid('getRowData', (parseInt(rowId[0].id)));
		}
		var asd = $("#"+id).jqGrid();
		//var rowId = $("#list2").jqGrid('getGridParam', 'selrow');
		/*var ret = $("#list2").jqGrid('getRowData', id);*/
		/*if(originalData[i].SUBNET_ID == ret.SUBNET_ID) {
			// 拷贝对象(不能让后续vue使用的对象跟原始json中的对象有相同的引用)
			// *********第一种拷贝对象的方法 ************
			// var proto = Object.getPrototypeOf(originalData[i]);
			// return Object.assign({},Object.create(proto),originalData[i]);
			// **********第二种拷贝对象的方法************
			//return JSON.parse(JSON.stringify(originalData[i]));
			return originalData[i];
		}
		}*/
		return ret;
	},	
	//初始化tr  id : id 
	Initselected:function(id){
		var c=$("#"+id+" tbody tr").is('.selected');
		if(c==true){
			var css= $(".selected").attr("class");
			var array = new Array();
			var array = css.split(" ");
			$(".selected").attr("class", array[0]);
			$("#"+id+" tbody tr:[role='row']").css('background-color','#FFFFFF');
		}
	}
};

//弹框信息
function EjectFrame(prompt, bloer1,bloer2, name) {
	var htmlStr = "";
	if (name == "showSuccessPrompt") {// 成功信息
		htmlStr += '\<div class="modal-dialog" role="document" style="width:40%;">\
			<div class="modal-content" id="modal-content" style="background-color: rgba(255,255,255,1) !important;">\
			<div class="modal-header" style="color:#000">\
			<button type="button" class="close" data-dismiss="modal" aria-hidden="true" id="cancel">×</button>\
			<h4 class="modal-title">成功提示</h4>\
			</div>\
			<div style="margin:0px">\
			<div class="alert alert-success"style="margin-bottom:0px;font-size: 14px !important;"><strong style="font-size: 18px !important;">成功！</strong>'
				+ prompt
				+ '</div>\
			<div class="modal-footer">\
			<button type="button" class="btn btn-primary" data-dismiss="modal" id="success_confirm" onclick="success_confirm()">确认</button>\
			<button type="button" class="btn btn-default" data-dismiss="modal" id="success_close">关闭</button></div>\
			</div><div><div>\
	        ';
		document.getElementById("alarm").innerHTML = htmlStr;
		if (bloer1 == false) {
			document.getElementById('success_confirm').style.display = "none";
		};
		$("#alarm").modal({
			keyboard : false
		});
		if (bloer2 == true) {
			setTimeout(function() {$("#alarm").modal('hide');}, 1500);
		};
	} else if (name == "showHintPrompt") {// 提示信息
		htmlStr += '<div class="modal-dialog" role="document" style="width:40%;">\
			<div class="modal-content" id="modal-content" style="background-color: rgba(255,255,255,1) !important;">\
			<div class="modal-header" style="color:#000">\
			<button type="button" class="close" data-dismiss="modal" aria-hidden="true" id="cancel">×</button>\
			<h4 class="modal-title">提示</h4>\
			</div>\
			<div style="margin:0px">\
			<div class="alert alert-info"style="margin-bottom:0px;font-size: 14px !important;"><strong style="font-size: 18px !important;">提示！</strong>'
				+ prompt
				+ '</div>\
			<div class="modal-footer">\
			<button type="button" class="btn btn-primary" data-dismiss="modal" id="info_confirm" onclick="info_confirm()">确认</button>\
			<button type="button" class="btn btn-default" data-dismiss="modal" id="info_close">关闭</button></div>\
			</div><div><div>\
			';
		document.getElementById("alarm").innerHTML = htmlStr;
		if (bloer1 == false) {
			document.getElementById('info_confirm').style.display = "none";
		}
		$("#alarm").modal({
			keyboard : false
		});
		if (bloer2 == true) {
			setTimeout(function() {$("#alarm").modal('hide');}, 1500);
		};
	} else if (name == "showWarnPrompt") {// 警告信息
		htmlStr += '\<div class="modal-dialog" role="document" style="width:40%;">\
			<div class="modal-content" id="modal-content" style="background-color: rgba(255,255,255,1) !important;">\
			<div class="modal-header" style="color:#000">\
			<button type="button" class="close" data-dismiss="modal" aria-hidden="true" id="cancel">×</button>\
			<h4 class="modal-title">危险提示</h4>\
			</div>\
			<div style="margin:0px">\
			<div class="alert alert-danger"style="margin-bottom:0px;font-size: 14px !important;"><strong style="font-size: 18px !important;">危险！</strong>'
				+ prompt
				+ '</div>\
			<div class="modal-footer">\
			<button type="button" class="btn btn-primary" data-dismiss="modal" id="danger_confirm">确认</button>\
			<button type="button" class="btn btn-default" data-dismiss="modal" id="danger_close">关闭</button></div>\
			</div><div><div>\
	        ';
		document.getElementById("alarm").innerHTML = htmlStr;
		if (bloer1== false) {
			document.getElementById('danger_confirm').style.display = "none";
		}
		$("#alarm").modal({
			keyboard : false
		});
		if (bloer2 == true) {
			setTimeout(function() {$("#alarm").modal('hide');}, 1500);
		};
	} else if (name == "showErrPrompt") {// 错误信息
		htmlStr += '\<div class="modal-dialog" role="document" style="width:40%;" style="background-color: rgba(255,255,255,1) !important;">\
			<div class="modal-content" id="modal-content">\
			<div class="modal-header" style="color:#000">\
			<button type="button" class="close" data-dismiss="modal" aria-hidden="true" id="cancel">×</button>\
			<h4 class="modal-title">错误提示</h4>\
			</div>\
			<div style="margin:0px">\
			<div class="alert alert-warning"style="margin-bottom:0px;font-size: 14px !important;"><strong style="font-size: 18px !important;">错误！</strong>'
				+ prompt
				+ '</div>\
			<div class="modal-footer">\
			<button type="button" class="btn btn-primary" data-dismiss="modal" id="warning_confirm" onclick="warning_confirm()">确认</button>\
			<button type="button" class="btn btn-default" data-dismiss="modal" id="warning_close">关闭</button></div>\
			</div><div><div>\
	        ';
		document.getElementById("alarm").innerHTML = htmlStr;
		if (bloer1 == false) {
			document.getElementById('warning_confirm').style.display = "none";
		}
		$("#alarm").modal({
			keyboard : false
		});
		if (bloer2 == true) {
			setTimeout(function() {$("#alarm").modal('hide');}, 1500);
		};
	} else if (name = "showBottomWarnPrompt") {// 底端警告信息
		if (g < 6) {
			eastcom.showMsg("danger", prompt);
			g++;
		}
	}
	;
}