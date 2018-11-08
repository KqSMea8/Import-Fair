var cdnAnalysis={
	thresholdMap:{},
	titleKpis:[{name:indexParam+"ajax",data:[
			   {name:"succ_request_ratio",label:"请求命中率",value:"succ_request_ratio,,"},
	           {name:"return_ratio",label:"回源率",value:"return_ratio,,"},
	           {name:"return_fail_ratio",label:"回源失败率",value:"return_fail_ratio,,"},
	           {name:"http_status_code_2xx_ratio",label:"2xx占比",value:"http_status_code_2xx_ratio,,"},
	           {name:"http_status_code_3xx_ratio",label:"3xx占比",value:"http_status_code_3xx_ratio,,"},
	           {name:"http_status_code_4xx_ratio",label:"4xx占比",value:"http_status_code_4xx_ratio,,"},
	           {name:"http_status_code_5xx_ratio",label:"5xx占比",value:"http_status_code_5xx_ratio,,"},
	           {name:"gain_ratio",label:"增益比",value:"gain_ratio,,"},
	           ],label:"指标概况"}
	],
	
	init : function(){
		cdnAnalysis.initTime();
		_CacheFun._bindCache(indexParam,cdnAnalysis.titleKpis);
		cdnAnalysis.titleKpis.map(function (num,index) {
			_CacheFun._bindCache(num.name,num.data);
		})
		CDNConsts.G_URLCONFIG.urlInasSml = "http://10.221.235.17:8080/INAS/sml";
		CDNConsts.G_URLCONFIG.urlWs = "http://10.221.235.17:8080/services/ws";
		initCss();
		initJqGrid.init();
		/*
		 * 加载数据方法
		 */
		homeIndex.getIndexKPI(cdnAnalysis.titleKpis[0].name);
		cdnAnalysis.query();
	},
	initTime : function(){
			var date1 = new Date(),
				date2 = new Date(),
				date3 = new Date();
			date1.setHours(date1.getHours() - 5);
			date1.setDate(date1.getDate() - 3);
			date2.setDate(date2.getDate() - 3);
			$("#timeField_hour").val(date1.format("yyyy-MM-dd hh"));
			$("#timeField_day").val(date2.format("yyyy-MM-dd"));
			$("#timeField_hour_s").val(date1.format("yyyy-MM-dd hh"));
			$("#timeField_day_s").val(date2.format("yyyy-MM-dd"));
			$("#timeField_hour_e").val(date2.format("yyyy-MM-dd hh"));
			$("#timeField_day_e").val(date3.format("yyyy-MM-dd"));
		},
		changeTimeType : function(num){
			//$("#timeField_Month").hide();
			if(num == "1"){
				$("#timeField_day").hide();
				$("#timeField_hour").show();
			}else if(num == "2"){
				$("#timeField_hour").hide();
				$("#timeField_day").show();
			}else if(num == "3"){
				$("#timeField_day_s").hide();
				$("#timeField_day_e").hide();
				$("#timeField_hour_s").show();
				$("#timeField_hour_e").show();
			}else if(num == "4"){
				$("#timeField_hour_s").hide();
				$("#timeField_hour_e").hide();
				$("#timeField_day_s").show();
				$("#timeField_day_e").show();
			}
		},
		getTimeParam:function(){
			var timeType=$(".RadioStyle:checked").val();
			var times=$("#timeField_"+timeType).val();
			times=formatTime.getLongTime(times,timeType);
			
			return {
				"time_id":times,
				"timeType":timeType
			}
		},
		getTimeRangeParam:function(){
			var timeType=$(".RadioStyle1:checked").val();
			var times=$("#timeField_"+timeType+"_s").val();
			var timee=$("#timeField_"+timeType+"_e").val();
			times=formatTime.getLongTime(times,timeType);
			timee=formatTime.getLongTime(timee,timeType);
			
			return {
				"startTime":times,
				"endTime":timee,
				"timeType":timeType
			}
		},
	query:function(){
		cdnAnalysis.getInfoOfSulv();
		cdnAnalysis.getInfoOfHuiYuan();
		cdnAnalysis.getInfoOfYvMing();
		cdnAnalysis.createGetEchart();
	},
	/*
	 * 表格数据查询
	 */
	getInfoOfTable:function(id,Host,isVFer,group,backFun){
		var url = "/sml/query/cachecdn-dn-acsd";
		var timeType = $("input[name=timeType1]:checked").val();
		var startT = formatTime.getLongTime($("#timeField_"+timeType+"_s").val(),timeType);
		var startE = formatTime.getLongTime($("#timeField_"+timeType+"_e").val(),timeType);
		var dataStr = {
			timeType:timeType,
			limit:"100",
			type:isVFer,
			startTime:startT,
			endTime:startE,
			host:Host,
			groupBy:group,
			ifId:"cachecdn-dn-acsd"
		};
		if(backFun){
			commonAjax(url,JSON.stringify(dataStr),"",true,function (data) {
				if(data.success){
					var resurt = data.data.datas;
					backFun(resurt)
				}
			});
		}else{
			$("#"+id).jqGrid("setGridParam", {
	            url: eastcom.baseURL +url,
	            datatype: "json",
	            mtype: 'POST',
	            //sortname: column,	//指定默认排序的列
	            //sortorder: "desc",//指定默认排序方式
	            jsonReader: {
	                root: "data.elements",
	                records: "data.total",
	                total: "data.pageNum",
	                page: "data.pageNo"
	            },
	            postData: {params: JSON.stringify(dataStr)},
	            page: 1
	        }).trigger("reloadGrid");
		}
	},
	/*
	 * HOST域名的速率信息
	 */
	getInfoOfSulv:function(){
		var httpValue = $("#rateGridHost").val();
		var _isVfer = $("#rateGridHost_C").val();
		cdnAnalysis.getInfoOfTable("con_grid_divrate_grid",httpValue,_isVfer,"host");
	},
	/*
	 * HOST域名的回源信息
	 */
	getInfoOfHuiYuan:function(){
		var httpValue = $("#backGridHost").val();
		var _isVfer = $("#backGridHost_C").val();
		cdnAnalysis.getInfoOfTable("con_grid_divback_grid",httpValue,_isVfer,"host");
	},
	/*
	 * 域名访问信息
	 */
	getInfoOfYvMing:function(){
		var id = "con_grid_divorg_grid";
		var httpValue = $("#bfGridHost").val();
		var _isVfer = $("#bfGridHost_C").val();
		cdnAnalysis.getInfoOfTable(id,httpValue,_isVfer,"default");
	},
	/*
	 * 时间：2018-3-13
	 * 描述：请求命中率趋势图
	 */
	createGetEchart:function () {
		var httpValue = "";
		var _isVfer = $("#GETIndex_C").val();
		cdnAnalysis.getInfoOfTable("con_grid_divrate_grid",httpValue,_isVfer,"time",function (dataJia) {
			HCSCharts.loadGETRankChart("index_trend_GETIndex_chart_div",dataJia);
		});
		
	}
};
function initCss(){
	$("#rateGridHost").keydown(function (e) {
		if(e.keyCode==13){
			cdnAnalysis.getInfoOfSulv();
		}
	})
	$("#backGridHost").keydown(function (e) {
		if(e.keyCode==13){
			cdnAnalysis.getInfoOfHuiYuan();
		}
	})
	$("#bfGridHost").keydown(function (e) {
		if(e.keyCode==13){
			cdnAnalysis.getInfoOfYvMing();
		}
	})
	$("#GETIndex_C").change(function () {
		cdnAnalysis.createGetEchart();
	});
	//指标列表左右滚动
	var leftRightDivID = "index_list";
	var listDivId = "indexKPIList";
	!$('#'+leftRightDivID) || (function() {
		$('#'+leftRightDivID).delegate("div[class='con_about_tab'] a[class='ico_left']", 'click', function() {
			var showDiv = $("#"+listDivId+" ul:visible");
			if(showDiv.prev().prev().length == 0){
				$('#'+leftRightDivID).find(".ico_left").parent().hide();
				$('#'+leftRightDivID).find(".left_none").parent().show();
			}
			$('#'+leftRightDivID).find(".ico_right").parent().show();
			$('#'+leftRightDivID).find(".right_none").parent().hide();
			showDiv.hide();
			showDiv.prev().show();
		});
		$('#'+leftRightDivID).delegate("div[class='con_about_tab'] a[class='ico_right']", 'click', function() {
			var showDiv = $("#"+listDivId+" ul:visible");
			if(showDiv.next().next().length == 0){
				$('#'+leftRightDivID).find(".ico_right").parent().hide();
				$('#'+leftRightDivID).find(".right_none").parent().show();
			}
			$('#'+leftRightDivID).find(".ico_left").parent().show();
			$('#'+leftRightDivID).find(".left_none").parent().hide();
			showDiv.hide();
			showDiv.next().show();
		});
	})();
	//图标按钮切换
	!$('span[name="index_rank_trend_ico"]') || (function() {
		$('span[name="index_rank_trend_ico"]').delegate("i[name]", 'click', function() {
			if ($(this).hasClass("analyImg")) {
				var name = $(this).attr("name");
				$("#"+name+"_grid_div").hide();
				$("#"+name+"_chart_div").show();
			}
			if ($(this).hasClass("analyData")) {
				var name = $(this).attr("name");
				$("#"+name+"_grid_div").show();
				$("#"+name+"_chart_div").hide();
				//jqGridResize(name+"_grid_div_grid");
				$("#"+name+"_grid_div_grid").jqGrid("jqGridResize");
			}
		});
	})();
	//大小文件切换
	!$('#bigFileCtrl') || (function() {
		$('#bigFileCtrl').delegate("a", 'click', function() {
			if ($(this).hasClass("btn-default")) {
				$('#bigFileCtrl').find(".btn-primary").removeClass("btn-primary").addClass("btn-default");
				var name = $(this).attr("name");
				$("#FileKand").val(name);
				$(this).removeClass("btn-default").addClass("btn-primary");
				$("#isFver").val($(this).attr("name"));
				homeIndex.getIndexKPI(cdnAnalysis.titleKpis[0].name);
			}
			if ($(this).hasClass("btn-primary")) {
			}
		});
	})();
}; 
