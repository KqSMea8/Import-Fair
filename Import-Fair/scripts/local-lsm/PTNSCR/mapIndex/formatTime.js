"user strict";
var formatTime = {
		getStratEnd:{
			START_HOUR:new Date(new Date().setHours(new Date().getHours() - 1)).format("yyyy-MM-dd hh")+"",
			START_DAY:new Date(new Date().setDate(new Date().getDate() - 1)).format("yyyy-MM-dd")+"",
			START_MONTH:new Date(new Date().setMonth(new Date().getMonth() - 1)).format("yyyy-MM")+"",
			END_HOUR:new Date().format("yyyy-MM-dd hh")+"",
			END_DAY:new Date().format("yyyy-MM-dd")+"",
			END_MONTH:new Date().format("yyyy-MM")+""
		},
		getPastTime : function(time,pastTime,timeType){
				date = new Date(time);
			if(timeType == "hour"){		//获取过去pastTime小时
				var pastTime = pastTime;
				date.setHours(date.getHours()-pastTime);
				return date.format("yyyyMMddhh") + "00";	//201612191300
			}else if(timeType == "day"){	//获取过去pastTime天
				var pastTime = pastTime;
				date.setDate(date.getDate() - pastTime);
				return date.format("yyyyMMdd") + "0000";	//201612190000
			}else if(timeType == "month"){	//过去pastTime个月
				var pastTime = pastTime;
				date.setMonth(date.getMonth()-pastTime);
				return date.format("yyyyMM") + "000000";	//201612000000
			}
			return date.format("yyyyMMddhhmmss");	//意外情况返回这个
		},
//		-----------返回时间字符串--------------------
		getDateTime : function(time,type){
			var len=12-time.length;
			while (len--){
				time+="0";
			}
			var date ="";
			var year = time.substring(0,4);
			if(year=="0000"){
				return date;
			}else{
				date+=year;
			}
			var month = time.substring(4,6);
			if(month=="00"||type=="year"){
				return date;
			}else{
				date+="-"+month;
			}
			var day = time.substring(6,8);
			if(day=="00"||type=="month"){
				return date;
			}else{
				date+="-"+day;
			}
			var hour = time.substring(8,10);
			if(hour=="00"||type=="day"){
				return date;
			}else{
				date+=" "+hour;
			}
			var min = time.substring(10,12);
			if(min=="00"||type=="hour"){
				return date;
			}else{
				date+=":"+min;
			}
			return date;
		},
		getLongTime	:function (date,type){
			var timeStr = date.toString();
			var year = timeStr.substring(0,4)==""?"0000":timeStr.substring(0,4);
			var month = timeStr.substring(5,7)==""||type=="year"?"00":timeStr.substring(5,7);
			var day = timeStr.substring(8,10)==""||type=="month"?"00":timeStr.substring(8,10);
			var hour = timeStr.substring(11,13)==""||type=="day"?"00":timeStr.substring(11,13);
			var min = timeStr.substring(14,16)==""||type=="hour"?"00":timeStr.substring(14,16);
			return year+month+day+hour+min;
		}
};
/**
 *  对Date的扩展，将 Date 转化为指定格式的String
 * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
 * 例子： 
 * (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
 * (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
 */
Date.prototype.format = function (fmt) { //author: meizz 
	"use strict";
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};