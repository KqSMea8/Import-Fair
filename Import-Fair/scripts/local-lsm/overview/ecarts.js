var chart1="";
var chart2="";
var ecarts = {
		/*
		 * time:时间
		 * id:数据的id
		 * trend:趋势数据
		 * parameter：类
		 */
	qw_ecarts:function(time,id,trend,parameter) {
		var company=parameter[id].company;
		var company_auxiliary=parameter[id].company_auxiliary;
		var threshold=parameter[id].threshold;
		var Today=[];
		var Yesterday=[];
		var Trend_time=[];
		if(!utils.isStringEmpty(trend[id])){
			for(var s=0;s<trend[id].length;s++){
				if(trend[id][s].time==time){
					if(id=="epg_resp_delay"||id=="play_res_delay"){
						var _value_span='<span>当前值:</span><span >'+pmars.conversion(parameter[id].company_auxiliary_original,trend[id][s].value)+company_auxiliary+'</span>';
					}else{
						var _value_span='<span>当前值:</span><span >'+pmars.conversion(company,trend[id][s].value)+company_auxiliary+'</span>';
					}
					$('#ecarts_val').html(_value_span);
				}
				if(utils.isStringEmpty(trend[id][s].value)){
					Today[s]="";
				}else{
					if(id=="epg_resp_delay"||id=="play_res_delay"){
						Today[s]=pmars.conversion(parameter[id].company_auxiliary_original,trend[id][s].value);
					}else{
						Today[s]=pmars.conversion(company,trend[id][s].value);
					}
				}
				if(utils.isStringEmpty(trend[id][s].tb)){
					Yesterday[s]="";
				}else{
					if(id=="epg_resp_delay"||id=="play_res_delay"){
						Yesterday[s]=pmars.conversion(parameter[id].company_auxiliary_original,trend[id][s].tb);
					}else{
						Yesterday[s]=pmars.conversion(company,trend[id][s].tb);
					}
				}
				if(parameter[id].ecarts_legend_data=="小时"){
					Trend_time[s]=trend[id][s].time.substring(11, 16);
				}else{
					Trend_time[s]=trend[id][s].time.substring(5, 10);
				}
			}
		}
		var option = {
				color:['#1991e9','#ffa526','#1991e9'],
			    title : {
			        show:false
			    },
			    tooltip : {
			        trigger: 'axis',
			        formatter: function(params){
			        	var str=''+params[0].name+'<br/>';
			        		if(params.length==2){
			        			if(utils.isStringEmpty(params[1].value)){
			        				if(!utils.isStringEmpty(params[1].value)){
			        					str+=params[1].marker+ " " + params[1].seriesName +" : "+params[1].value +"</br>"
			        				}else{
			        					str+=params[0].marker+ " " + params[0].seriesName +" : "+params[0].value +"</br>"
			        				}
				        		}else{
				        			if(utils.isStringEmpty(params[0].value)){
			        					str+=params[1].marker+ " " + params[1].seriesName +" : "+params[1].value +"</br>"
			        				}else{
			        					str+=params[1].marker+ " " + params[1].seriesName +" : "+params[1].value +"</br>"
					        			str+=params[0].marker+ " " + params[0].seriesName +" : "+params[0].value +"</br>"
			        				}
				        		}
			        		}else{
			        			if(utils.isStringEmpty(params[0].value)){
					        		str="";
				        		}else{
				        			str+=params[0].marker+ " " + params[0].seriesName +" : "+params[0].value +"</br>"
				        		}
			        		}
	                    return str
			        }
			    },
			    legend: {data:[],textStyle:{color:'#ffffff',fontSize:22}},
			    toolbox: {show : false},
			    calculable : false,
			    animation:false,
		   		addDataAnimation: false,
			    grid:{borderWidth:0,x:100,y:30,x2:30,y2:30},
			    xAxis : [{type : 'category',
			            data : Trend_time,
			            axisLine:{show:true,lineStyle:{color:'#adc7dd'}},
			            axisLabel:{textStyle:{color:'#adc7dd',fontSize:20}},
			            splitLine:{show:false},
			            axisTick:{show:true,lineStyle:{color:'#adc7dd'}}
			        }],
			    yAxis : [{
			            type : 'value',
			            axisLine:{show:false},
			            splitLine:{show:false},
			            axisLabel:{textStyle:{color:'#adc7dd',fontSize:20}},
			            axisTick:{show:true,lineStyle:{color:'#adc7dd'}},
			            scale:true,
			            splitNumber:4,
			            min: function(value) {
			            	var min="";
			            	if(threshold==1){
			            		if((value.min-5)<0){if(value.min<10){min=0;}else{min=parseInt(value.min);}}else{min= parseInt(value.min - 5);}}
			            	else if(threshold==2){min=0;}
			            	else{min=parseInt(value.min-1);if(min<=0){min=0;}}
			            	return min;
			            },
			            max:function(value) {
			            	var max="";
			            	if(value.max<1){max=1;}else{
				            	if(threshold==1){
				            		max=parseInt(value.max)+2
				            		if(max>=100){max=100;}
				            	}else if(threshold==3){
				            		max=parseInt(value.max)*5
				            	}else{
				            		max=Math.ceil(value.max)
				            	}
			            	}
			            	return max;
			            }}],
			    series : []
			};
		if(parameter[id].ecarts_legend_data=="小时"){
			option.legend.data=[];
			option.series=[];
	        option.legend.data=['今日','6 日'];
	        option.series = [{name:'6 日', fontSize : 16,type:'line', symbol:'emptyCircle',symbolSize:[5,5],data:Yesterday, smooth:true,itemStyle:{normal:{lineStyle:{width:2},areaStyle:{color : 'rgba(25,145,233,0.3)'}}}},
	                         {name:'今日',fontSize : 16,type:'line',symbol:'emptyCircle',data:Today,symbolSize:[5,5],smooth:true,itemStyle:{normal:{lineStyle:{width:2}}}}]
		}else{
			 option.legend.data=[];
			 option.series=[];
			 option.color=[];
			 option.color=['#ffa526'];
			 option.legend.data=['最近一周'];
			 option.series =[{name:'最近一周',fontSize : 16,type:'line', symbol:'emptyCircle',data:Today,symbolSize:[5,5],smooth:true,itemStyle:{normal:{lineStyle:{width:2}}}}]
		}
		$('#ecarts_span').html(parameter[id].auxiliary+"("+parameter[id].company_auxiliary+")");
		eastcom_echarts.init("ecarts",option,true);
	},	
	qw_ecarts_model:function(time,id,trend,parameter) {
		var company=parameter[id].company;
		var threshold=parameter[id].threshold;
		var company_auxiliary=parameter[id].company_auxiliary;
		var Today=[];
		var Yesterday=[];
		var Trend_time=[];
		if(!utils.isStringEmpty(trend[id])){
			for(var s=0;s<trend[id].length;s++){
				if(utils.isStringEmpty(trend[id][s].value)){
					Today[s]="";
				}else{
					if(id=="epg_resp_delay"||id=="play_res_delay"){
						Today[s]=pmars.conversion(parameter[id].company_auxiliary_original,trend[id][s].value);
					}else{
						Today[s]=pmars.conversion(company,trend[id][s].value);
					}
				}
				if(utils.isStringEmpty(trend[id][s].tb)){
					Yesterday[s]="";
				}else{
					if(id=="epg_resp_delay"||id=="play_res_delay"){
						Yesterday[s]=pmars.conversion(parameter[id].company_auxiliary_original,trend[id][s].tb);
					}else{
						Yesterday[s]=pmars.conversion(company,trend[id][s].tb);
					}
				}
				if(parameter[id].ecarts_legend_data=="小时"){
					Trend_time[s]=trend[id][s].time.substring(11, 16);
				}else{
					Trend_time[s]=trend[id][s].time.substring(5, 10);
				}
			}
		}
		var option = {
				color:['#1991e9','#ffa526','#1991e9'],
			    title : {show:false},
			    tooltip : {
			        trigger: 'axis',
			        formatter: function(params){
			        	var str=''+params[0].name+'<br/>';
			        		if(params.length==2){
			        			if(utils.isStringEmpty(params[0].value)){
			        				if(utils.isStringEmpty(params[1].value)){
			        					str+=params[0].marker+ " " + params[0].seriesName +" : "+params[0].value +"</br>"
			        				}else{
			        					str+=params[1].marker+ " " + params[1].seriesName +" : "+params[1].value +"</br>"
			        				}
				        		}else{
				        			if(utils.isStringEmpty(params[1].value)){
			        					str+=params[0].marker+ " " + params[0].seriesName +" : "+params[0].value +"</br>"
			        				}else{
			        					str+=params[1].marker+ " " + params[1].seriesName +" : "+params[1].value +"</br>"
					        			str+=params[0].marker+ " " + params[0].seriesName +" : "+params[0].value +"</br>"
			        				}
				        		}
			        		}else{
			        			if(utils.isStringEmpty(params[0].value)){
					        		str="";
				        		}else{
				        			str+=params[0].marker+ " " + params[0].seriesName +" : "+params[0].value +"</br>"
				        		}
			        		}
	                    return str
			        }
			    },
			    legend: { data:[],textStyle:{color:'#ffffff',fontSize:30}, y: '5px',icon:'circle', itemWidth: 20,itemHeight: 20},
			    toolbox: {show : false},
			    calculable : false,
			    animation:false,
		   		addDataAnimation: false,
			    grid:{left: '40px',right: '30px',bottom:'2%',containLabel: true},
			    xAxis : [{
			            type : 'category',
			            data : Trend_time,
			            axisLine:{show:true,lineStyle:{color:'#adc7dd'}},
			            axisLabel:{textStyle:{color:'#adc7dd',fontSize:30},rotate:40},
			            splitLine:{show:false},
			            axisTick:{show:true,lineStyle:{color:'#adc7dd'}}
			        }],
			    yAxis : [{
			            type : 'value',
			            axisLine:{show:false},
			            splitLine:{show:false},
			            axisLabel:{textStyle:{color:'#adc7dd',fontSize:30}},
			            axisTick:{show:true,lineStyle:{color:'#adc7dd'}},
			            scale:true,
			            min: function(value) {
			            	var min="";
			            	if(threshold==1){
			            		if((value.min-5)<0){if(value.min<10){min=0;}else{min=parseInt(value.min);}}else{min= parseInt(value.min - 5);}}
			            	else if(threshold==2){min=0;}
			            	else{min=parseInt(value.min-1);if(min<=0){min=0;}}
			            	return min;
			            },
			            max:function(value) {
			            	var max="";
			            	if(value.max<1){max=1;}else{
				            	if(threshold==1){
				            		max=parseInt(value.max)+2
				            		if(max>=100){max=100;}
				            	}else if(threshold==3){
				            		max=parseInt(value.max)*5
				            	}else{
				            		max=Math.ceil(value.max)
				            	}
			            	}
			            	return max;
			            }}]
			};
		if(parameter[id].ecarts_legend_data=="小时"){
			option.legend.data=[];
			option.series=[];
	        option.legend.data=['今日','6 日'];
	        option.series = [{name:'6 日', fontSize : 16,type:'line', symbol:'emptyCircle',symbolSize:[5,5],data:Yesterday, smooth:true,itemStyle:{normal:{lineStyle:{width:2},areaStyle:{color : 'rgba(25,145,233,0.3)'}}}},
	                         {name:'今日',fontSize : 16,type:'line',symbol:'emptyCircle',data:Today,symbolSize:[5,5],smooth:true,itemStyle:{normal:{lineStyle:{width:2}}}}]
		}else{
			 option.legend.data=[];
			 option.series=[];
			 option.color=[];
			 option.color=['#ffa526'];
			 option.legend.data=['最近一周'];
			 option.series =[{name:'最近一周',fontSize : 16,type:'line', symbol:'emptyCircle',data:Today,symbolSize:[5,5],smooth:true,itemStyle:{normal:{lineStyle:{width:2}}}}]
		}
		$('#ecarts_Modal_span').html(parameter[id].auxiliary);
		$('#ecarts_Modal_span_val').html("(单位:  "+parameter[id].company_auxiliary+")");
		eastcom_echarts.init("ecarts_Modal",option,false);
	},	
	bz_ecarts:function(time,id,trend,parameter) {
		var company=parameter[id].company;
		var threshold=parameter[id].threshold;
		var company_auxiliary=parameter[id].company_auxiliary;
		var Today=[];
		var Yesterday=[];
		var Trend_time=[];
		if(!utils.isStringEmpty(trend[id])){
			for(var s=0;s<trend[id].length;s++){
				if(trend[id][s].time==time){
					var _value_span='<span>当前值:</span><span >'+pmars.conversion(company,trend[id][s].value)+company_auxiliary+'</span>';
					$('#bz_ecarts_val').html(_value_span);
				}
				if(utils.isStringEmpty(trend[id][s].value)){
					Today[s]="";
				}else{
					Today[s]=pmars.conversion(company,trend[id][s].value);
				}
				if(utils.isStringEmpty(trend[id][s].tb)){
					Yesterday[s]="";
				}else{
					Yesterday[s]=pmars.conversion(company,trend[id][s].tb);
				}
				if(parameter[id].ecarts_legend_data=="小时"){
					Trend_time[s]=trend[id][s].time.substring(11, 16);
				}else{
					Trend_time[s]=trend[id][s].time.substring(5, 10);
				}
			}
		}
		var option = {
				color:['#1991e9','#ffa526','#1991e9'],
			    title : {
			        show:false
			    },
			    tooltip : {
			        trigger: 'axis',
			        formatter: function(params){
			        	var str=''+params[0].name+'<br/>';
			        		if(params.length==2){
			        			if(utils.isStringEmpty(params[1].value)){
			        				if(!utils.isStringEmpty(params[1].value)){
			        					str+=params[1].marker+ " " + params[1].seriesName +" : "+params[1].value +"</br>"
			        				}else{
			        					str+=params[0].marker+ " " + params[0].seriesName +" : "+params[0].value +"</br>"
			        				}
				        		}else{
				        			if(utils.isStringEmpty(params[0].value)){
			        					str+=params[1].marker+ " " + params[1].seriesName +" : "+params[1].value +"</br>"
			        				}else{
			        					str+=params[1].marker+ " " + params[1].seriesName +" : "+params[1].value +"</br>"
					        			str+=params[0].marker+ " " + params[0].seriesName +" : "+params[0].value +"</br>"
			        				}
				        		}
			        		}else{
			        			if(utils.isStringEmpty(params[0].value)){
					        		str="";
				        		}else{
				        			str+=params[0].marker+ " " + params[0].seriesName +" : "+params[0].value +"</br>"
				        		}
			        		}
	                    return str
			        }
			    },
			    legend: {data:[],textStyle:{color:'#ffffff',fontSize:22}},
			    toolbox: {show : false},
			    calculable : false,
			    animation:false,
		   		addDataAnimation: false,
			    grid:{borderWidth:0,x:100,y:30,x2:30,y2:30},
			    xAxis : [{type : 'category',
			            data : Trend_time,
			            axisLine:{show:true,lineStyle:{color:'#adc7dd'}},
			            axisLabel:{textStyle:{color:'#adc7dd',fontSize:20}},
			            splitLine:{show:false},
			            axisTick:{show:true,lineStyle:{color:'#adc7dd'}}
			        }],
			    yAxis : [{
			            type : 'value',
			            axisLine:{show:false},
			            splitLine:{show:false},
			            axisLabel:{textStyle:{color:'#adc7dd',fontSize:20}},
			            axisTick:{show:true,lineStyle:{color:'#adc7dd'}},
			            scale:true,
			            splitNumber:4,
			            min: function(value) {
			            	var min="";
			            	if(threshold==1){
			            		if((value.min-5)<0){if(value.min<10){min=0;}else{min=parseInt(value.min);}}else{min= parseInt(value.min - 5);}}
			            	else if(threshold==2){min=0;}
			            	else{min=parseInt(value.min-1);if(min<=0){min=0;}}
			            	return min;
			            },
			            max:function(value) {
			            	var max="";
			            	if(value.max<1){max=1;}else{
				            	if(threshold==1){
				            		max=parseInt(value.max)+2
				            		if(max>=100){max=100;}
				            	}else if(threshold==3){
				            		max=parseInt(value.max)*5
				            	}else{
				            		max=Math.ceil(value.max)
				            	}
			            	}
			            	return max;
			            }}],
			    series : []
			};
		if(parameter[id].ecarts_legend_data=="小时"){
			option.legend.data=[];
			option.series=[];
	        option.legend.data=['今日','6 日'];
	        option.series = [{name:'6 日', fontSize : 16,type:'line', symbol:'emptyCircle',symbolSize:[5,5],data:Yesterday, smooth:true,itemStyle:{normal:{lineStyle:{width:2},areaStyle:{color : 'rgba(25,145,233,0.3)'}}}},
	                         {name:'今日',fontSize : 16,type:'line',symbol:'emptyCircle',data:Today,symbolSize:[5,5],smooth:true,itemStyle:{normal:{lineStyle:{width:2}}}}]
		}else{
			 option.legend.data=[];
			 option.series=[];
			 option.color=[];
			 option.color=['#ffa526'];
			 option.legend.data=['最近一周'];
			 option.series =[{name:'最近一周',fontSize : 16,type:'line', symbol:'emptyCircle',data:Today,symbolSize:[5,5],smooth:true,itemStyle:{normal:{lineStyle:{width:2}}}}]
		}
		$('#bz_ecarts_span').html(parameter[id].auxiliary+"("+parameter[id].company_auxiliary+")");
		eastcom_echarts.init("bz_ecarts",option,true);
	},	
	bz_ecarts_model:function(time,id,trend,parameter) {
		var company=parameter[id].company;
		var threshold=parameter[id].threshold;
		var company_auxiliary=parameter[id].company_auxiliary;
		var Today=[];
		var Yesterday=[];
		var Trend_time=[];
		if(!utils.isStringEmpty(trend[id])){
			for(var s=0;s<trend[id].length;s++){
				if(utils.isStringEmpty(trend[id][s].value)){
					Today[s]="";
				}else{
					Today[s]=pmars.conversion(company,trend[id][s].value);
				}
				if(utils.isStringEmpty(trend[id][s].tb)){
					Yesterday[s]="";
				}else{
					Yesterday[s]=pmars.conversion(company,trend[id][s].tb);
				}
				if(parameter[id].ecarts_legend_data=="小时"){
					Trend_time[s]=trend[id][s].time.substring(11, 16);
				}else{
					Trend_time[s]=trend[id][s].time.substring(5, 10);
				}
			}
		}
		var option = {
				color:['#1991e9','#ffa526','#1991e9'],
			    title : {show:false},
			    tooltip : {
			        trigger: 'axis',
			        formatter: function(params){
			        	var str=''+params[0].name+'<br/>';
			        		if(params.length==2){
			        			if(utils.isStringEmpty(params[0].value)){
			        				if(utils.isStringEmpty(params[1].value)){
			        					str+=params[0].marker+ " " + params[0].seriesName +" : "+params[0].value +"</br>"
			        				}else{
			        					str+=params[1].marker+ " " + params[1].seriesName +" : "+params[1].value +"</br>"
			        				}
				        		}else{
				        			if(utils.isStringEmpty(params[1].value)){
			        					str+=params[0].marker+ " " + params[0].seriesName +" : "+params[0].value +"</br>"
			        				}else{
			        					str+=params[1].marker+ " " + params[1].seriesName +" : "+params[1].value +"</br>"
					        			str+=params[0].marker+ " " + params[0].seriesName +" : "+params[0].value +"</br>"
			        				}
				        		}
			        		}else{
			        			if(utils.isStringEmpty(params[0].value)){
					        		str="";
				        		}else{
				        			str+=params[0].marker+ " " + params[0].seriesName +" : "+params[0].value +"</br>"
				        		}
			        		}
	                    return str
			        }
			    },
			    legend: { data:[],textStyle:{color:'#ffffff',fontSize:30}, y: '5px',icon:'circle', itemWidth: 20,itemHeight: 20},
			    toolbox: {show : false},
			    calculable : false,
			    animation:false,
		   		addDataAnimation: false,
			    grid:{left: '40px',right: '30px',bottom:'2%',containLabel: true},
			    xAxis : [{
			            type : 'category',
			            data : Trend_time,
			            axisLine:{show:true,lineStyle:{color:'#adc7dd'}},
			            axisLabel:{textStyle:{color:'#adc7dd',fontSize:30},rotate:40},
			            splitLine:{show:false},
			            axisTick:{show:true,lineStyle:{color:'#adc7dd'}}
			        }],
			    yAxis : [{
			            type : 'value',
			            axisLine:{show:false},
			            splitLine:{show:false},
			            axisLabel:{textStyle:{color:'#adc7dd',fontSize:30}},
			            axisTick:{show:true,lineStyle:{color:'#adc7dd'}},
			            scale:true,
			            min: function(value) {
			            	var min="";
			            	if(threshold==1){
			            		if((value.min-5)<0){if(value.min<10){min=0;}else{min=parseInt(value.min);}}else{min= parseInt(value.min - 5);}}
			            	else if(threshold==2){min=0;}
			            	else{min=parseInt(value.min-1);if(min<=0){min=0;}}
			            	return min;
			            },
			            max:function(value) {
			            	var max="";
			            	if(value.max<1){max=1;}else{
				            	if(threshold==1){
				            		max=parseInt(value.max)+2;
				            		if(max>=100){max=100;}
				            	}else if(threshold==3){
				            		max=parseInt(value.max)*5;
				            	}else{
				            		max=Math.ceil(value.max);
				            	}
			            	}
			            	return max;
			            }}]
			};
		if(parameter[id].ecarts_legend_data=="小时"){
			option.legend.data=[];
			option.series=[];
	        option.legend.data=['今日','6 日'];
	        option.series = [{name:'6 日', fontSize : 16,type:'line', symbol:'emptyCircle',symbolSize:[5,5],data:Yesterday, smooth:true,itemStyle:{normal:{lineStyle:{width:2},areaStyle:{color : 'rgba(25,145,233,0.3)'}}}},
	                         {name:'今日',fontSize : 16,type:'line',symbol:'emptyCircle',data:Today,symbolSize:[5,5],smooth:true,itemStyle:{normal:{lineStyle:{width:2}}}}]
		}else{
			 option.legend.data=[];
			 option.series=[];
			 option.color=[];
			 option.color=['#ffa526'];
			 option.legend.data=['最近一周'];
			 option.series =[{name:'最近一周',fontSize : 16,type:'line', symbol:'emptyCircle',data:Today,symbolSize:[5,5],smooth:true,itemStyle:{normal:{lineStyle:{width:2}}}}]
		}
		$('#bz_ecarts_Modal_span').html(parameter[id].auxiliary);
		$('#bz_ecarts_Modal_span_val').html("(单位:  "+parameter[id].company_auxiliary+")");
		eastcom_echarts.init("bz_ecarts_Modal",option,false);
	},
	qw_aqxi:function(id,value,clolor,Name){
		option = {
			    toolbox: {
			        show: false,
			        feature: {
			            mark: {
			                show: true
			            },
			            restore: {
			                show: true
			            },
			            saveAsImage: {
			                show: true
			            }
			        }
			    },
			    series: [{
			        name: "指标",
			        type: "gauge",
			        startAngle: 180, //总的360，设置180就是半圆
			        endAngle: 0,
			        center: ["50%", "77%"], //整体的位置设置
			        radius: 100,
			        axisLine: {
			            lineStyle: {
			                width: 10, //柱子的宽度
			                color: [[value, clolor], [1, "#dce3ec"]] //0.298是百分比的比例值（小数），还有对应两个颜色值
			            }
			        },
			        axisTick: {
			            show: false
			        },
			        axisLabel: {
			            show: false
			        },
			        splitLine: {
			            show: false
			        },
			        pointer: {
			            width: 0, //指针的宽度
			            length: "0", //指针长度，按照半圆半径的百分比
			            color: "#2d99e2"
			        },
			        detail: {
			            show: false
			        },
			        data: [{ //显示数据
			            value: value
			        }]
			    }]
			};
		eastcom_echarts.init(id,option,null);
	}
}
require.config({  
	paths: {  
	    echartsMin: eastcom.baseURL+'/scripts/local-lsm/overview/echarts.min'
    }  
});  
var eastcom_echarts = {
		init: function (chartId, option,bool) {//初始化方法
			var chart="";
			if(!utils.isStringEmpty(chart1)&&bool==true){
				chart1.dispose();
			}
			if(!utils.isStringEmpty(chart2)&&bool==false){
				chart2.dispose();
			}
			require(['echartsMin','echarts/chart/line', 'echarts/chart/pie', 'echarts/chart/gauge' ],initEcharts);function initEcharts(ec){
			if(bool==true){
				chart=ec.init(document.getElementById(chartId),'marcarons');
				chart.setOption(option);
				chart1=chart;
			}
			if(bool==false){
				chart=ec.init(document.getElementById(chartId),'marcarons');
				chart.setOption(option);
				chart2=chart;
			}
			if(bool==null){
				chart=ec.init(document.getElementById(chartId),'marcarons');
				chart.setOption(option);
			}
			if(chartId == "top"){
				chart.on('click', function(params) {
					overviewleftyd.jqgrid(params.name);
				});
			}
		};	
	}
};

