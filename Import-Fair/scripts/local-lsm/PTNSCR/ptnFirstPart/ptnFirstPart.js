var typeGOl={
		site:'',
		hist:'',
};
var ptnFirstPart = {
	init : function() {
		ptnFirstPart.tabInit();
		typeGOl={
				site:'site',
				hist:'curr',
			};
		ptnFirstPart.flowRatepeakData(typeGOl);
		ptnFirstPart.peakPredictData();
		
		//预警详情
		ptnFirstPart.initGrid_yujing();
		ptnFirstPart.roseInit();

	},
	initLoad:function(){
		ptnFirstPart.tabInit();
		ptnFirstPart.peakPredictData();
		ptnFirstPart.flowRatepeakData(typeGOl);
		ptnFirstPart.initGridData();
	},
	nowOrHistory:function(id,choosetab,tabvalue){
		if(id=="btn1"){
			$("#btn2").removeClass('colorchange');
			$("#btn2").addClass('colorLight');
		}else if(id=="btn2"){
			$("#btn1").removeClass('colorchange');
			$("#btn1").addClass('colorLight');
		}else if(id=="btn3"){
			$("#btn4").removeClass('colorchange');
			$("#btn4").addClass('colorLight');
		}else if(id=="btn4"){
			$("#btn3").removeClass('colorchange');
			$("#btn3").addClass('colorLight');
		}
		$("#"+id).addClass('colorchange');
		$("#"+id).removeClass('colorLight');
		typeGOl[choosetab]=tabvalue;
		ptnFirstPart.flowRatepeakData(typeGOl);
	},
	
	//预警表格
	initGrid_yujing : function() {
		function addCellAttr(rowId, val, rawObject, cm, rdata) {
    		return "style='color:white'";
    	}
		var columnName = [];
		var colModel = [ {
			label : '热点区域',
			name : 'HOT_AREA_NAME',
			index : 'HOT_AREA_NAME',
			align : 'center',
			width : '85',
		}, {
			label : '预警对象',
			name : 'LOOP_NAME',
			index : 'LOOP_NAME',
			align : 'center',
			width : '120',
		}, {
			label : '预警时长(天)',
			name : 'NUMS',
			index : 'NUMS',
			align : 'center',
			width : '115',
			sorttype:'number',
			formatter : function(cellvalue) {
				var value = cellvalue == undefined ? "-" : cellvalue;
				return '<span style="">' + value + '</span>'
			}
		}, {
			label : '级别',
			name : 'ELEVELS',
			index : 'ELEVELS',
			align : 'center',
			width : '55',
			cellattr: addCellAttr,
			formatter:function(cellvalue, options, rowObject) {
				
				if (cellvalue == "yel"){
					cellvalue = "重要";
					return '<div style="margin:2px;background:darkorange">'+cellvalue+'</div>';
				}else if(cellvalue == "red"){
					cellvalue = "紧急";
					return '<div style="margin:2px;background:red">'+cellvalue+'</div>';
				}else if(cellvalue == "blue"){
					cellvalue = "一般";
					return '<div style="margin:2px;background:deepskyblue">'+cellvalue+'</div>';
				}else if(cellvalue == undefined||cellvalue == null||cellvalue == " "){
					return '<div style="margin:2px;"></div>';
				}
			}
		} ];

		$("#table_yujing").jqGrid({
			height : 160,
			rowNum : 100000,
			datatype : "local",
			shrinkToFit : true,
			autoScroll : true,
			autowidth : false,
			width : $("#ex").width() - 5,
			colModel : colModel,
			sortable : true,
			sortorder : "desc",
			pager : "#table_yujing_gridPager",
			pgtext : "{0}共{1}页",
			//caption: "第一个jqGrid例子",
			onSelectRow : function(rowid, status) {

			},
			gridComplete : function() {
				var grid = $("#table_yujing");
				var ids = grid.getDataIDs();
				for (var i = 0; i < ids.length; i++) {
					grid.setRowData(ids[i], false, {
						height : 25
					});
				}
			},
			loadComplete : function() {
				var grid = $("#table_yujing");
				var ids = grid.getDataIDs();
				for (var i = 0; i < ids.length; i++) {
					grid.setRowData(ids[i], false, {
						height : 25
					});
				}
			},
			onSelectRow : function(rowid, iRow, iCol, e) {
				//e.preventDefault();
				//alert("233");
			}
		});
		$("th[id^=table_yujing_]").css('color', '#fff');
		ptnFirstPart.initGridData();
		// $("th[id^=table0_]").css('background', '#8e91ff');

		/* mydata =[{"pic_center":"677","cnt":"677","is_check_num":"677","up_stand_down_chall_num":"677"},
		          
		          {"pic_center":"677","cnt":"677","is_check_num":"677","up_stand_down_chall_num":"677"},
		          {"pic_center":"677","cnt":"677","is_check_num":"677","up_stand_down_chall_num":"677"},
		          {"pic_center":"677","cnt":"677","is_check_num":"677","up_stand_down_chall_num":"677"},
		          {"pic_center":"677","cnt":"677","is_check_num":"677","up_stand_down_chall_num":"677"},] ;*/

	},

	/**
	 * 
	 *预警详情 */
	initGridData : function() {
		jQuery("#table_yujing").jqGrid("clearGridData");
		$
				.ajax({
					url : eastcom.baseURL
							+ '/sml/query/cus-trans-rm-monflow-eardetail',
					type : 'POST',
					async : true,
					dataType : "json",
					contentType : "application/json",
					data : "",
					success : function(res) {
						if (res.success) {
							var obj={
				    				"进博会场馆":0,
				    				"虹桥枢纽":0,
				    				"高铁":0,
				    				"上海南站":0,
				    				"浦东机场":0,
				    				"酒店":0,
				    				"市委办公厅":0,
				    				"进博会周边":0,
				    				"上海火车站":0,
				    				"长途汽车站":0,
				    		};
							var mydata = res.data;
							for (var i = 0; i < mydata.length; i++) {
								$("#table_yujing").jqGrid('addRowData', i + 1,
										mydata[i]);
								if(mydata[i].ELEVELS=="red"){
									obj[mydata[i].HOT_AREA_NAME]=parseInt(obj[mydata[i].HOT_AREA_NAME])+1;
								}
							}
							;
							window.parent.ptnSecondGobel=obj;
							$("#table_yujing").trigger("reloadGrid");
						} else {

						}
					},
					complete : function(XMLHttpRequest, textStatus) {
					},
					error : function() {
						eastcom.showMsg("danger", "请求异常,数据加载失败!");
						setTimeout('clearMsg("one")',10000)
					}
				});

	},
	/**
	 * 
	 *页首tab */
	tabInit : function() {

		$
				.ajax({
					url : eastcom.baseURL
							+ '/sml/query/cus_trans-rm-monflow-index',
					type : 'POST',
					async : true,
					dataType : "json",
					contentType : "application/json",
					data : "",
					success : function(res) {
						if (res.success) {
							var data = res.data;
							if (data.length > 0) {
								$("#dayFlow")
										.html(
												(data[0].FLOW/1024).toFixed(2)
														+ '<span class="titleColorWithe " style="margin-left:5px;">TB</span>');
								$("#historyFlow")
										.html(
												(data[0].PEAK_FLOW_DAILY_HIST/1024).toFixed(2)
														+ '<span class="titleColorWithe " style="margin-left:5px;">TB</span>');
								var peak_title="";
								console.log(data[0].PEAK_FLOW_RATE_SITE.length);
								if(data[0].PEAK_FLOW_RATE_SITE.length>8){
									peak_title=data[0].PEAK_FLOW_RATE_SITE.toString().substring('0',8)+'...';
								}else{
									peak_title=data[0].PEAK_FLOW_RATE_SITE;
								}
								$("#peakSite").attr('title',data[0].PEAK_FLOW_RATE_SITE);
								$("#peakSite")
										.html(peak_title);
							} else {
								$("#dayFlow").html("--");
								$("#historyFlow").html("--");
								$("#peakSite").html("--");
							}
						} else {
							$("#dayFlow").html("--");
							$("#historyFlow").html("--");
							$("#peakSite").html("--");
						}
					},
					complete : function(XMLHttpRequest, textStatus) {
					},
					error : function() {
						$("#dayFlow").html("--");
						$("#historyFlow").html("--");
						$("#peakSite").html("--");
						eastcom.showMsg("danger", "请求异常,数据加载失败!");
						setTimeout('clearMsg("one")',10000)
					}
				});

	},
	/**
	 * 
	 * 玫瑰图初始化数据*/
	roseInit : function() {
		$("#chart_yujing_titile").html('');
		$.ajax({
			url : eastcom.baseURL + '/sml/query/cus-trans-rm-monflow-ewradio',
			type : 'POST',
			async : true,
			dataType : "json",
			contentType : "application/json",
			data : "",
			success : function(res) {
				if (res.success) {
					var data = res.data;
					
					var rosedata = {
						legend : [],
						data : []
					};
					
					if (data.length > 0) {
						$("#chart_yujing_titile").html("【"+data[0].RED_RADIO+'%，'+data[0].CTIME+"】");
						var singledataPGREE={
								value:data[0].PGREE+data[0].LGREE, 
								name:data[0].GREE_RADIO+'%',
								name1:'端口：'+data[0].PGREE+'个<br/>环网：'+data[0].LGREE+'个'
									};
						var singledataPRED={
								value:data[0].PRED+data[0].LRED, 
								name:data[0].RED_RADIO+'%',
								name1:'端口预警：'+data[0].PRED+'个<br/>环网预警：'+data[0].LRED+'个'
									};
						var singledataPYEL={
								value:data[0].PYEL+data[0].LYEL, 
								name:data[0].YEL_RADIO+'%',
								name1:'端口预警：'+data[0].PYEL+'个<br/>环网预警：'+data[0].LYEL+'个'
									};
						var singledataBLUE={
								value:data[0].LBLUE, 
								name:data[0].BLUE_RADIO+'%',
								name1:'环网预警：'+data[0].LBLUE+'个'
									};
						/*//玫瑰图
						var keys = Object.keys(data[0]);
						for (var i = 0; i < keys.length; i++) {
							if (keys[i].indexOf('_RADIO') != -1) {
								
								var datas = {
									value : data[0][keys[i]],
									name : data[0][keys[i]] + '%'
								};
								
								//if(data[0][keys[i]]!=0){
									rosedata.legend.push(data[0][keys[i]] + '%');
									rosedata.data.push(datas);
								//}
								
							}
						}
						
*/						rosedata.data.push(singledataPGREE);
						rosedata.data.push(singledataPYEL);
						rosedata.data.push(singledataPRED);
						rosedata.data.push(singledataBLUE);
						
						eastcom_echarts_rose_pie.loadDataToChart(
								"chart_yujing", rosedata);
					} else {

					}
				} else {

				}
			},
			complete : function(XMLHttpRequest, textStatus) {
			},
			error : function() {

				eastcom.showMsg("danger", "请求异常,数据加载失败!");
				setTimeout('clearMsg("one")',10000)
			}
		});

	},
	/**
	 * 
	 * 进博会今日流量高峰预测数据 */
	peakPredictData : function() {
		$
				.ajax({
					url : eastcom.baseURL
							+ '/sml/query/cus_trans-rm-monflow-forecast',
					type : 'POST',
					async : true,
					dataType : "json",
					contentType : "application/json",
					data : "",
					success : function(res) {
						if (res.success) {
							var data = res.data;
							var predictData = {
								kpis : [ '实际值', '预测值' ],
								xx : [],
								yy : [],
							};
							var yy_pre = [];
							var yy_now = [];
							var all_data=[];
							for (var i = 0; i < data.length; i++) {
								predictData.xx.push(data[i].TIME_ID);
								yy_pre.push(data[i].PREFLOW);
								var now=data[i].ATFLOW;
								var pre=data[i].PREFLOW;
								if(now==null){
									now=0;
								}
								if(pre==null){
									pre=0;
								}
								if(data[i].ATFLOW==null){
									yy_now.push('-');
								}else{
									yy_now.push(data[i].ATFLOW);
								}
								var obj={
									now:now,
									index:i,
									pre:pre
								}
								all_data.push(obj);
							}
							function compare(property){
						           return function(a,b){
						               var value1 = a[property];
						               var value2 = b[property];
						               return value2 - value1;
						           }
						       }
							
							predictData.yy.push(yy_now);
							predictData.yy.push(yy_pre);
							
							all_data.sort(compare('now'));
							var obj = {
									value : all_data[0].now,
									symbol : 'circle', // 数据级个性化拐点图形
									symbolSize : 4,
									itemStyle : {
										normal : {
											label : {
												show : true,
												formatter:function(param){                   
													 return param.value+'GB';                   
													                    },
												textStyle : {
													fontSize : '16',
													fontFamily : '微软雅黑',
													fontWeight : 'bold',
													color : "white",
												}
											}
										}
									}
								};
								predictData.yy[0][all_data[0].index] = obj;
							all_data.sort(compare('pre'));
							var obj = {
									
									value : all_data[0].pre,
									symbol : 'circle', // 数据级个性化拐点图形
									symbolSize : 4,
									
									itemStyle : {
										normal : {
											label : {
												show : true,
												formatter:function(param){                   
													 return param.value+'GB';                   
													                    },
												textStyle : {
													fontSize : '16',
													fontFamily : '微软雅黑',
													fontWeight : 'bold',
													color : "white",
												}
											}
										}
									}
								};
								predictData.yy[1][all_data[0].index] = obj;
							/*if (data.length == 1) {

							} else if (data.length == 2) {
								var num = "";
								if (data[0].PREFLOW > data[1].PREFLOW) {
									num = 0;
								} else {
									num = 1;
								}
								var obj = {
									value : data[num].PREFLOW,
									symbol : 'circle', // 数据级个性化拐点图形
									symbolSize : 4,
									itemStyle : {
										normal : {
											label : {
												show : true,
												textStyle : {
													fontSize : '16',
													fontFamily : '微软雅黑',
													fontWeight : 'bold',
													color : "white",
												}
											}
										}
									}
								};
								predictData.yy[1][num] = obj;
								if (data[0].ATFLOW > data[1].ATFLOW) {
									num = 0;
								} else {
									num = 1;
								}
								var obj = {
									value : data[num].ATFLOW,
									symbol : 'circle', // 数据级个性化拐点图形
									symbolSize : 4,
									itemStyle : {
										normal : {
											label : {
												show : true,
												textStyle : {
													fontSize : '16',
													fontFamily : '微软雅黑',
													fontWeight : 'bold',
													color : "white",
												}
											}
										}
									}
								};
								predictData.yy[0][num] = obj;
							} else if (data.length > 2) {
								for (var j = 1; j < data.length - 1; j++) {
									var pre_pre = data[j].PREFLOW
											- data[j - 1].PREFLOW;
									var next_pre = data[j].PREFLOW
											- data[j + 1].PREFLOW;
									var pre_now = data[j].ATFLOW
											- data[j - 1].ATFLOW;
									var next_now = data[j].ATFLOW
											- data[j + 1].ATFLOW;
									if (pre_pre > 0 && next_pre > 0) {
										var obj = {
											value : data[j].PREFLOW,
											symbol : 'circle', // 数据级个性化拐点图形
											symbolSize : 4,
											itemStyle : {
												normal : {
													label : {
														show : true,
														textStyle : {
															fontSize : '16',
															fontFamily : '微软雅黑',
															fontWeight : 'bold',
															color : "white",
														}
													}
												}
											}
										};
										predictData.yy[1][j] = obj;
									}
									if (pre_now > 0 && next_now > 0) {
										var obj = {
											value : data[j].ATFLOW,
											symbol : 'circle', // 数据级个性化拐点图形
											symbolSize : 4,
											itemStyle : {
												normal : {
													label : {
														show : true,
														textStyle : {
															fontSize : '16',
															fontFamily : '微软雅黑',
															fontWeight : 'bold',
															color : "white",
														}
													}
												}
											}
										};
										predictData.yy[0][j] = obj;
									}
								}
							}*/

							//进博会今日流量峰值
							

							eastcom_echarts_line.loadDataToChart("chart_jinBoHuiYuCE", predictData.xx,predictData.yy, predictData.kpis);
						} else {

						}
					},
					complete : function(XMLHttpRequest, textStatus) {
					},
					error : function() {

						eastcom.showMsg("danger", "请求异常,数据加载失败!");
						setTimeout('clearMsg("one")',10000)
					}
				});

	},

	/**
	 * 
	 * 流速峰值排名 */
	flowRatepeakData : function(type) {
		
		$.ajax({
					url : eastcom.baseURL
							+ '/sml/query/cus_trans-rm-monflow-flowradio',
					type : 'POST',
					async : true,
					dataType : "json",
					contentType : "application/json",
					data : JSON.stringify(type),
					success : function(res) {
						var res_data=res.data;
						//流速峰值排名
						var obj={
								legend:['单站流速峰值(Mbps)', '区域流速峰值(Mbps)'],
								site:[],
								area:[],
								hot_name:[],
						};
						
						if(type.hist=="hist"){
							for(var i=0;i<res_data.length;i++){
								obj.site.push(res_data[i].PEAK_FLOW_RATE_SITE_HIST);
								obj.area.push(res_data[i].PEAK_FLOW_RATE_AREA_HIST);
								obj.hot_name.push(res_data[i].HOT_AREA_NAME);
							}
						}else{
							for(var i=0;i<res_data.length;i++){
								obj.site.push(res_data[i].PEAK_FLOW_RATE_SITE);
								obj.area.push(res_data[i].PEAK_FLOW_RATE_AREA);
								obj.hot_name.push(res_data[i].HOT_AREA_NAME);
							}
						}
						
						

						eastcom_echarts_chart_liuSu.loadDataToChart(
								"chart_liuSu", obj)

					},
					complete : function(XMLHttpRequest, textStatus) {
					},
					error : function() {

						eastcom.showMsg("danger", "请求异常,数据加载失败!");
						setTimeout('clearMsg("one")',3000)
					}
				});

	},
};
function clearMsg(){
	var allElements = document.getElementsByTagName('div');
		    for (var i=0; i< allElements.length; i++ ){
		       if (allElements[i].classList[0] == 'alert'&&allElements[i].classList[2]=="alert-dismissible" ) {
		        $(allElements[i]).remove();
		        return;
		       }
	   }				
}