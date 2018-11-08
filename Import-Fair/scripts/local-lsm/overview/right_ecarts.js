var right_ecarts = {
	yyhw : function() {
		var time = [];
		var today = [];
		var yesterday = [];
		var cdm = LSMScreen.CacheDataManager.getInstance();
		var ltehwl=0;
		cdm.getHotlteWg({ids : pmars.jkblh()}, function(result) {
			var company="";
			var json="";
			for (var s = 0; s < result.length; s++) {
				if(result[s].time==pmars.getNowstrhourOfgetMinutes(result[result.length-1].time,-120,"-",":")){
					ltehwl=result[s].ltehwl;
				}
				json=pmars.ErlConversion(ltehwl);
			}
			
			for (var s = 0; s < result.length; s++) {
				if(result[s].time==pmars.getNowstrhourOfgetMinutes(result[result.length-1].time,-120,"-",":")){
					ltehwl=result[s].ltehwl;
				}
				time[s] = result[s].time.substring(11, 16);
				if(utils.isStringEmpty(result[s].ltehwl)){
					today[s]="";
				}else{
					today[s] = pmars.conversion("("+json.company+")",result[s].ltehwl);
				}
				if(utils.isStringEmpty(result[s].ltehwltb)){
					yesterday[s]="";
				}else{
					yesterday[s]= pmars.conversion("("+json.company+")",result[s].ltehwltb);
				}
			}
			var option = {
					color:['#1991e9','#ffa526','#1991e9'],
					title : {
						show : false
					},
					tooltip : {
						trigger: 'axis',
						formatter : function(params) {
							var str = '' + params[0].name + '<br/>';
							if (params.length == 2) {
								if (utils.isStringEmpty(params[0].value)) {
									if (utils.isStringEmpty(params[1].value)) {
										str += params[0].marker + " "
												+ params[0].seriesName + " : "
												+ params[0].value + "</br>"
									} else {
										str += params[1].marker + " "
												+ params[1].seriesName + " : "
												+ params[1].value + "</br>"
									}
								} else {
									if (utils.isStringEmpty(params[1].value)) {
										str += params[0].marker + " "
												+ params[0].seriesName + " : "
												+ params[0].value + "</br>"
									} else {
										str += params[0].marker + " "
												+ params[0].seriesName + " : "
												+ params[0].value + "</br>"
										str += params[1].marker + " "
												+ params[1].seriesName + " : "
												+ params[1].value + "</br>"
									}
								}
							} else {
								if (utils.isStringEmpty(params[0].value)) {
									str = "";
								} else {
									str += params[0].marker + " "
											+ params[0].seriesName + " : "
											+ params[0].value + "</br>"
								}
							}
							return str
						}
					},
					legend : {
						data : [ '今日', '6 日' ],
						textStyle : {
							color : '#ffffff',
							fontSize : 16
						}
					},
					toolbox : {
						show : false
					},
					calculable : false,
					animation:false,
			   		addDataAnimation: false,
					grid : {
						borderWidth : 0,
						x : 70,
						y : 30,
						x2 : 30,
						y2 : 30
					},
					xAxis : [ {
						type : 'category',
						data : time,
						axisLine : {
							show : true,
							lineStyle : {
								color : '#adc7dd'
							}
						},
						axisLabel : {
							textStyle : {
								color : '#adc7dd',
								fontSize : 20
							}
						},
						splitLine : {
							show : false
						},
						axisTick : {
							show : true,
							lineStyle : {
								color : '#adc7dd'
							}
						}
					} ],
					yAxis : [ {
						type : 'value',
						axisLine : {
							show : false
						},
						splitLine : {
							show : false
						},
						axisLabel : {
							textStyle : {
								color : '#adc7dd',
								fontSize : 20
							}
						},
						axisTick : {
							show : true,
							lineStyle : {
								color : '#adc7dd'
							}
						},
						scale : true,
						splitNumber:3,
						min: function(value) {
			            	var min=0;
			            	return min;
			            },
			            max:function(value) {
			            	var max="";
			            	if(value.max<1){max=1;}else{
				            	max=Math.ceil(value.max)
			            	}
			            	return max;
			            }
					} ],
					series : [{
						name : '6 日',
						type : 'line',
						symbol : 'emptyCircle',
						// showAllSymbol:true,
						symbolSize : [ 5, 5 ],
						data : yesterday,
						smooth : true,
						itemStyle : {
							normal : {
								lineStyle : {width : 2},areaStyle:{color : 'rgba(25,145,233,0.3)'}
							}
						}
					},{
						name : '今日',
						type : 'line',
						symbol : 'emptyCircle',
						data : today,
						symbolSize : [ 5, 5 ],
						smooth : true,
						itemStyle : {
							normal : {
								lineStyle : {width : 2}
							}
						}
					} ]
				};
				$("#hwl_span_value").html("当前值:<br/>"+pmars.conversion("("+json.company+")",ltehwl)+"<br/>"+json.company);
				eastcom_echarts.init("yyhw", option);
		});
	},
	_yyhw : function() {
		var time = [];
		var today = [];
		var yesterday = [];
		var cdm = LSMScreen.CacheDataManager.getInstance();
		cdm.getHotlteWg({ids : pmars.jkblh()}, function(result) {
			var company="";
			var json="";
			var ltehwl="";
			for (var s = 0; s < result.length; s++) {
				if(result[s].time==pmars.getNowstrhourOfgetMinutes(result[result.length-1].time,-120,"-",":")){
					ltehwl=result[s].ltehwl;
				}
				json=pmars.ErlConversion(ltehwl);
			}
			for (var s = 0; s < result.length; s++) {
				time[s] = result[s].time.substring(11, 16);
				if(utils.isStringEmpty(result[s].ltehwl)){
					today[s]="";
				}else{
					
					today[s] = pmars.conversion("("+json.company+")",result[s].ltehwl);
				}
				if(utils.isStringEmpty(result[s].ltehwltb)){
					yesterday[s]="";
				}else{
					yesterday[s]= pmars.conversion("("+json.company+")",result[s].ltehwltb);;
				}
			}
			$("#hul_ecarts_Modal_company").text("(单位: "+json.company+")");
			eastcom_echarts.init("hul_ecarts_Modal_option", option);
		});
		var option = {
			color:['#1991e9','#ffa526','#1991e9'],
			title : {
				show : false
			},
			tooltip : {
				trigger: 'axis',
				formatter : function(params) {
					var str = '' + params[0].name + '<br/>';
					if (params.length == 2) {
						if (utils.isStringEmpty(params[0].value)) {
							if (utils.isStringEmpty(params[1].value)) {
								str += params[0].marker + " "
										+ params[0].seriesName + " : "
										+ params[0].value + "</br>"
							} else {
								str += params[1].marker + " "
										+ params[1].seriesName + " : "
										+ params[1].value + "</br>"
							}
						} else {
							if (utils.isStringEmpty(params[1].value)) {
								str += params[0].marker + " "
										+ params[0].seriesName + " : "
										+ params[0].value + "</br>"
							} else {
								str += params[0].marker + " "
										+ params[0].seriesName + " : "
										+ params[0].value + "</br>"
								str += params[1].marker + " "
										+ params[1].seriesName + " : "
										+ params[1].value + "</br>"
							}
						}
					} else {
						if (utils.isStringEmpty(params[0].value)) {
							str = "";
						} else {
							str += params[0].marker + " "
									+ params[0].seriesName + " : "
									+ params[0].value + "</br>"
						}
					}
					return str
				}
			},
			legend : {
				data : [ '今日', '6 日' ],
				textStyle : {color : '#ffffff',fontSize : 30},
				icon:'circle',
		        y: '5px',
		        itemWidth: 20,           
		    	itemHeight: 20
			},
			toolbox : {
				show : false
			},
			calculable : false,
			animation:false,
	   		addDataAnimation: false,
			 grid:{
			    	left: '40px',
			        right: '30px',
			        bottom: '2%',
			        containLabel: true
			    },
			    xAxis : [
			        {
			            type : 'category',
			            data : time,
			            axisLine:{show:true,lineStyle:{color:'#adc7dd'}},
			            axisLabel:{textStyle:{color:'#adc7dd',fontSize:30},rotate:40},
			            splitLine:{show:false},
			            axisTick:{show:true,lineStyle:{color:'#adc7dd'}}
			        }
			    ],
			yAxis : [ {
				type : 'value',
				axisLine : {
					show : false
				},
				splitLine : {
					show : false
				},
				axisLabel : {
					textStyle : {
						color : '#adc7dd',
						fontSize : 30
					}
				},
				axisTick : {
					show : true,
					lineStyle : {
						color : '#adc7dd'
					}
				},
				scale : true,
				min: function(value) {
	            	var min=0;
	            	return min;
	            },
	            max:function(value) {
	            	var max="";
	            	if(value.max<1){max=1;}else{
		            	max=Math.ceil(value.max)
	            	}
	            	return max;
	            }
			} ],
			series : [{
				name : '6 日',
				type : 'line',
				symbol : 'emptyCircle',
				symbolSize : [ 5, 5 ],
				data : yesterday,
				smooth : true,
				itemStyle : {
					normal : {
						lineStyle : {width : 2},areaStyle:{color : 'rgba(25,145,233,0.3)'}
					}
				}
			},{
				name : '今日',
				type : 'line',
				symbol : 'emptyCircle',
				data : today,
				symbolSize : [ 5, 5 ],
				smooth : true,
				itemStyle : {
					normal : {
						lineStyle : {
							width : 2
						}
					}
				}
			} ]
		};
	},
	sgll : function() {
		var time = [];
		var today = [];
		var yesterday = [];
		var cdm = LSMScreen.CacheDataManager.getInstance();
		cdm.getHotkpiTrend({ids : pmars.jkblh()}, function(result) {
			for (var s = 0; s < result.length; s++) {
				if(result[s].time==pmars.getNowstrhourOfgetMinutes(result[result.length-1].time,-120,"-",":")){
					$("#4G_span_value").html("当前值:<br/>"+utils.ErlFromGb(result[s].s_213)+"<br/>GB");
				}
				time[s] = result[s].time.substring(11, 16);
				if(utils.isStringEmpty(result[s].s_213)){
					today[s]="";
				}else{
					today[s] = utils.ErlFromGb(result[s].s_213);
				}
				if(utils.isStringEmpty(result[s].s_213tb)){
					yesterday[s]="";
				}else{
					yesterday[s]= utils.ErlFromGb(result[s].s_213tb);
				}
			}
			eastcom_echarts.init("4Gll", option);
		});
		var option = {
				color:['#1991e9','#ffa526','#1991e9'],
				title : {
					show : false
				},
				tooltip : {
					trigger: 'axis',
					formatter : function(params) {
						var str = '' + params[0].name + '<br/>';
						if (params.length == 2) {
							if (utils.isStringEmpty(params[0].value)) {
								if (utils.isStringEmpty(params[1].value)) {
									str += params[0].marker + " "
											+ params[0].seriesName + " : "
											+ params[0].value + "</br>"
								} else {
									str += params[1].marker + " "
											+ params[1].seriesName + " : "
											+ params[1].value + "</br>"
								}
							} else {
								if (utils.isStringEmpty(params[1].value)) {
									str += params[0].marker + " "
											+ params[0].seriesName + " : "
											+ params[0].value + "</br>"
								} else {
									str += params[0].marker + " "
											+ params[0].seriesName + " : "
											+ params[0].value + "</br>"
									str += params[1].marker + " "
											+ params[1].seriesName + " : "
											+ params[1].value + "</br>"
								}
							}
						} else {
							if (utils.isStringEmpty(params[0].value)) {
								str = "";
							} else {
								str += params[0].marker + " "
										+ params[0].seriesName + " : "
										+ params[0].value + "</br>"
							}
						}
						return str
					}
				},
				legend : {
					data : [ '今日', '6 日' ],
					textStyle : {
						color : '#ffffff',
						fontSize : 16
					}
				},
				toolbox : {
					show : false
				},
				calculable : false,
				animation:false,
		   		addDataAnimation: false,
				grid : {
					borderWidth : 0,
					x : 70,
					y : 30,
					x2 : 30,
					y2 : 30
				},
				xAxis : [ {
					type : 'category',
					data : time,
					axisLine : {
						show : true,
						lineStyle : {
							color : '#adc7dd'
						}
					},
					axisLabel : {
						textStyle : {
							color : '#adc7dd',
							fontSize : 20
						}
					},
					splitLine : {
						show : false
					},
					axisTick : {
						show : true,
						lineStyle : {
							color : '#adc7dd'
						}
					}
				} ],
				yAxis : [ {
					type : 'value',
					axisLine : {
						show : false
					},
					splitLine : {
						show : false
					},
					axisLabel : {
						textStyle : {
							color : '#adc7dd',
							fontSize : 20
						}
					},
					axisTick : {
						show : true,
						lineStyle : {
							color : '#adc7dd'
						}
					},
					scale : true,
					min: function(value) {
		            	var min=0;
		            	return min;
		            },
		            max:function(value) {
		            	var max="";
		            	if(value.max<1){max=1;}else{
			            	max=Math.ceil(value.max)
		            	}
		            	return max;
		            },
					splitNumber:3
				} ],
				series : [{
					name : '6 日',
					type : 'line',
					symbol : 'emptyCircle',
					symbolSize : [ 5, 5 ],
					data : yesterday,
					smooth : true,
					itemStyle : {
						normal : {
							lineStyle : {width : 2},areaStyle:{color : 'rgba(25,145,233,0.3)'}
						}
					}
				}, {
					name : '今日',
					type : 'line',
					symbol : 'emptyCircle',
					data : today,
					symbolSize : [ 5, 5 ],
					smooth : true,
					itemStyle : {
						normal : {
							lineStyle : {
								width : 2
							}
						}
					}
				} ]
			};
	},
	_sgll : function() {
	    var time = [];
		var today = [];
		var yesterday = [];
		var cdm = LSMScreen.CacheDataManager.getInstance();
		cdm.getHotkpiTrend({ids : pmars.jkblh()
		}, function(result) {
			for (var s = 0; s < result.length; s++) {
				time[s] = result[s].time.substring(11, 16);
				if(utils.isStringEmpty(result[s].s_213)){
					today[s]="";
				}else{
					today[s] = utils.ErlFromGb(result[s].s_213);
				}
				if(utils.isStringEmpty(result[s].s_213tb)){
					yesterday[s]="";
				}else{
					yesterday[s]= utils.ErlFromGb(result[s].s_213tb);
				}
			}
			eastcom_echarts.init("4Gll_ecarts_Modal_option", option);
		});
		var option = {
				color:['#1991e9','#ffa526','#1991e9'],
				title : {
					show : false
				},
				tooltip : {
					trigger: 'axis',
					formatter : function(params) {
						var str = '' + params[0].name + '<br/>';
						if (params.length == 2) {
							if (utils.isStringEmpty(params[0].value)) {
								if (utils.isStringEmpty(params[1].value)) {
									str += params[0].marker + " "
											+ params[0].seriesName + " : "
											+ params[0].value + "</br>"
								} else {
									str += params[1].marker + " "
											+ params[1].seriesName + " : "
											+ params[1].value + "</br>"
								}
							} else {
								if (utils.isStringEmpty(params[1].value)) {
									str += params[0].marker + " "
											+ params[0].seriesName + " : "
											+ params[0].value + "</br>"
								} else {
									str += params[0].marker + " "
											+ params[0].seriesName + " : "
											+ params[0].value + "</br>"
									str += params[1].marker + " "
											+ params[1].seriesName + " : "
											+ params[1].value + "</br>"
								}
							}
						} else {
							if (utils.isStringEmpty(params[0].value)) {
								str = "";
							} else {
								str += params[0].marker + " "
										+ params[0].seriesName + " : "
										+ params[0].value + "</br>"
							}
						}
						return str
					}
				},
				legend : {
					data : [ '今日', '6 日' ],
					textStyle : {color : '#ffffff',fontSize : 30},
					icon:'circle',
			        y: '5px',
			        itemWidth: 20,           
			    	itemHeight: 20
				},
				toolbox : {
					show : false
				},
				calculable : false,
				animation:false,
		   		addDataAnimation: false,
				 grid:{
				    	left: '40px',
				        right: '30px',
				        bottom: '2%',
				        containLabel: true
				    },
				    xAxis : [
				        {
				            type : 'category',
				            data : time,
				            axisLine:{show:true,lineStyle:{color:'#adc7dd'}},
				            axisLabel:{textStyle:{color:'#adc7dd',fontSize:30},rotate:40},
				            splitLine:{show:false},
				            axisTick:{show:true,lineStyle:{color:'#adc7dd'}}
				        }
				    ],
				yAxis : [ {
					type : 'value',
					axisLine : {
						show : false
					},
					splitLine : {
						show : false
					},
					axisLabel : {
						textStyle : {
							color : '#adc7dd',
							fontSize : 30
						}
					},
					axisTick : {
						show : true,
						lineStyle : {
							color : '#adc7dd'
						}
					},
					scale : true,
					min: function(value) {
		            	var min=0;
		            	return min;
		            },
		            max:function(value) {
		            	var max="";
		            	if(value.max<1){max=1;}else{
			            	max=Math.ceil(value.max)
		            	}
		            	return max;
		            }
				} ],
				series : [ {
					name : '6 日',
					type : 'line',
					symbol : 'emptyCircle',
					symbolSize : [ 5, 5 ],
					data : yesterday,
					smooth : true,
					itemStyle : {
						normal : {
							lineStyle : {width : 2},areaStyle:{color : 'rgba(25,145,233,0.3)'}
						}
					}
				},{
					name : '今日',
					type : 'line',
					symbol : 'emptyCircle',
					data : today,
					symbolSize : [ 5, 5 ],
					smooth : true,
					itemStyle : {
						normal : {
							lineStyle : {width : 2}
						}
					}
				}]
			};
	},
	zdzb:function(){
		var echartData=[];
		cdm.getIsmTerminalRank({hotspot:pmars.jkblh()}, function(Rank) {
			if(Rank.success){
				for(var s=0;s<Rank.data.length;s++){
					var option = {};
					option.value=Rank.data[s].device_count;
					option.name=Rank.data[s].terminal_brand;
					option.count=Rank.data[s].device_total_count
					echartData[s]=option;
				}
				var rich = {
						yellow : {color : "#fff",fontSize : 20,padding : [ 11,0 ],align : 'center'},
						total : {color : "#ffc72b",fontSize : 40 ,align : 'center'},
						white : {color : "#fff",align : 'center',fontSize : 24 ,padding : [ 10, 0 ]},
						blue : {color : '#49dff0',fontSize : 16,align : 'center'},
						hr : {borderColor : '#6f81da',width : '100%',borderWidth : 1,height : 0}};
				var option = {
						title : {
							text : '终端占比',
							left : 'center',
							top : 210,
							padding : [ 14, 0 ],
							textStyle : {color : '#fff',fontSize : 40,align : 'center'}
						},
						series : [ {
							name : '终端占比',
							type : 'pie',
							radius : [ '52%', '70%' ],
							center: ['50%', '60%'],
							hoverAnimation : true,
							color : [ '#c487ee', '#deb140', '#49dff0', '#008B45','#FFD700'],
							/*color : [ '#008B45', '#00CD00', '#00EE00', '#00FA9A','#00FFFF'],*/
							label : {
								normal : {
									formatter : function(params, ticket, callback) {
										var total = 0; // 考生总数量
										var percent = 0; // 考生占比
										echartData.forEach(function(value, index, array) {total = value.count;});
										percent = ((params.value / total) * 100).toFixed(1);
										return '{white|' + percent + '%}\n{hr|}\n{yellow|'
												+ params.name + '}';
									},
									rich : rich
								},
							},
							labelLine : {
								normal : {
									length : 55,
									length2 : 0,
									lineStyle : {color : '#6f81da'}}},
							data : echartData
						} ]
					};
				for(var q=0;q<order.length;q++){
					if(order[q]==4){
						eastcom_echarts.init("zdzb",option);
					}
				}
				overviewright.jqgrid(echartData[0].name);
			}
		});
	},
	zdzb_ecarts:function(id){
		var echartData=[];
		cdm.getIsmTerminalRank({hotspot:pmars.jkblh()}, function(Rank) {
			if(Rank.success){
				for(var s=0;s<Rank.data.length;s++){
					var option = {};
					option.value=Rank.data[s].device_count;
					option.name=Rank.data[s].terminal_brand;
					option.count=Rank.data[s].device_total_count
					echartData[s]=option;
				}
				var rich = {
						yellow : {color : "#fff",fontSize : 30,padding : [ 11,0 ],align : 'center'},
						total : {color : "#ffc72b",fontSize : 70 ,align : 'center'},
						white : {color : "#fff",align : 'center',fontSize : 34 ,padding : [ 10, 0 ]},
						blue : {color : '#49dff0',fontSize : 26,align : 'center'},
						hr : {borderColor : '#6f81da',width : '100%',borderWidth : 1,height : 0}
					};
				var option = {
						title : {
							text : '终端占比',
							left : 'center',
							top : 'center',
							padding : [ 24, 0 ],
							top : 450,
							textStyle : {color : '#fff',fontSize : 60,align : 'center'}
						},
						series : [ {
							name : '终端占比',
							type : 'pie',
							radius : [ '62%', '80%' ],
							center: ['50%', '54%'],
							hoverAnimation : true,
							color : [ '#c487ee', '#deb140', '#49dff0', '#008B45','#FFD700'],
							/*color : [ '#008B45', '#00CD00', '#00EE00', '#00FA9A','#00FFFF'],*/
							label : {
								normal : {
									formatter : function(params, ticket, callback) {
										var total = 0; // 考生总数量
										var percent = 0; // 考生占比
										echartData.forEach(function(value, index, array) {total = value.count;});
										percent = ((params.value / total) * 100).toFixed(1);
										return '{white|' + percent + '%}\n{hr|}\n{yellow|'+ params.name + '}';
									},
									rich : rich
								},
							},
							labelLine : {
								normal : {length :75,length2 : 0,lineStyle : {color : '#6f81da'}}
							},
							data : echartData
						} ]
					};
				eastcom_echarts.init(id,option);
			}
		});
	}
}
require.config({  
	paths: {  
	    echartsMin: eastcom.baseURL+'/scripts/local-lsm/overview/echarts.min'
    }  
});  
var eastcom_echarts = {
		init: function (chartId, option) {// 初始化方法
			require(['echartsMin','echarts/chart/line', 'echarts/chart/pie' ],initEcharts);function initEcharts(ec){
			var chart0=ec.init(document.getElementById(chartId),'marcarons');
			chart0.setOption(option);
			if(chartId == "zdzb"){
				chart0.on('click', function(params) {
					for(var q=0;q<order.length;q++){
						if(order[q]==5){
							overviewright.jqgrid(params.name);
						}
					}
				});
			}
		};	
	}
};

