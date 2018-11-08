var metroAddBounce_yewu = {
	               init : function(){
                        metroAddBounce_yewu.initTime();
                        metroAddBounce_yewu.loadPortfolioTable();
                        metroAddBounce_yewu.loadDataPre();
	               	    
	               },
                   doQuery : function(){
                        metroAddBounce_yewu.loadDataPre();
                   },
                   exportGrid:function(){
                	   SUtils.exportJQGrid($("#yewutab5").jqGrid(),"业务量");
                   },
                   initTime : function(){
                            var date = new Date();
                            var startDay = new Date(date.getTime() - 1*24*60*60*1000); //前一天当前小时
                            $("#timeDay").val(startDay.format("yyyy-MM-dd"));  
                              //处理周的时间
                                var today = new Date();
                                var weekToday = new Date();//获取上周最大日期
                                weekToday.setDate(weekToday.getDate());
                                
                                var tY = today.getFullYear();
                                var tM = today.getMonth()+1;
                                var tD = today.getDate()-1;
                                var s_week = getYearWeek(tY,tM,tD);
                                var week = getYearWeek(tY,tM,tD);
                                tM = tM<10?("0"+tM):tM;
                                tD = tD<10?("0"+tD):tD;
                                if(week=='01'){
                                    tY = tY - 1;
                                    s_week = getNumOfWeeks(tY);
                                    week = getNumOfWeeks(tY);
                                }else{
                                    s_week = week ;
                                    week = week - 1;
                                }
                                
                                s_week = s_week<10?("0"+s_week):s_week;
                                week = week<10?("0"+week):week;
                                
                                $("#timeWeek").val(tY+"-"+week);  
                                
                                
                                $('#timeWeek').bind('focus',function(){
                                    WdatePicker({isShowWeek:true,errDealMode:3,maxDate:weekToday.format("yyyy-MM-dd"),autoPickDate:true,firstDayOfWeek:1,
                                    onpicked:function() {$dp.$('timeWeek').value=$dp.cal.getP('y')+'-'+$dp.cal.getP('W');}
                                })});
                   },
                   loadDataPre : function(){
                            var timeType = "day";
                            if ($("#yewu_day").attr('value') == "1"){
                                  timeType = "day";   
                             }else if($("#yewu_week").attr('value') == "1"){
                                  timeType = "week";   
                             };
                             var time = $("#timeDay").val(); 
                             if (timeType == "day"){
                                 time = $("#timeDay").val();
                             }else if (timeType == "week"){
                                 time = $("#timeWeek").val();
                             };
                            console.log(timeType +"-----"+time);
                            var timeArr = FormatDateTimeS(timeType,time);
                            console.log(timeArr[0] +"-----"+timeArr[1]);

                            var urlP =LSMConsts.G_URLCONFIG.urlWs+ "/fast_query/area/pm/line?startTime="+timeArr[0]+"&endTime="+timeArr[1]+"&metro_name=地铁全线&orderName=time_id&orderType=asc&isAll=true"; 
                            if(timeType == "week"){urlP += "&timeType=week";};
                            urlP = encodeURI(urlP);
                            var resP = commonAjax(urlP,"","get",false,"",function(data){});
                            //处理数值为null的
                            for (var i = 0; i < resP.length; i++) {
                                  var currResP = resP[i];
                                  currResP.time_id = currResP.time_id == null ? 0: currResP.time_id;
                                  currResP.bytes_2g = currResP.bytes_2g == null ? 0: currResP.bytes_2g;
                                  currResP.bytes_3g = currResP.bytes_3g == null ? 0: currResP.bytes_3g;
                                  currResP.bytes_4g = currResP.bytes_4g == null ? 0: currResP.bytes_4g;
                                  currResP.bytes = currResP.bytes == null ? 0: currResP.bytes;
                                  currResP.teletraffic = currResP.teletraffic == null ? 0: currResP.teletraffic;
                                  currResP.user_cnt = currResP.user_cnt == null ? 0: currResP.user_cnt;
                            };
                            if(timeType == "week"){
                                   for (var i = 0; i < resP.length; i++) {
                                            var currObj = resP[i];
                                            var oldtime = currObj.time_id;
                                            var yearZ = oldtime.substring(0,4);
                                            var weekZ = oldtime.substring(4,6);
                                            var newtime = yearZ+"-"+weekZ+"周";
                                            currObj.time_id = newtime;
                                   };
                            };
                            metroAddBounce_yewu.loadPortfolioEchart_liuliang(resP);
                            metroAddBounce_yewu.loadPortfolioEchart_huawuliang(resP);
                            metroAddBounce_yewu.loadPortfolioEchart_yonghushu(resP);
                            metroAddBounce_yewu.loadPortfolioTableData(timeType,time);
                   },
                   changeTimeType : function(id,name){
                            $("div[name = '"+name+"']").find("div").removeClass('customRadioSelected');
                            $("div[name = '"+name+"']").attr('value', "0");
                            $("#"+id).find("div").addClass('customRadioSelected');
                            $("#"+id).attr('value', "1");

                            if (id == "yewu_day") {
                                $("#timeDay").css('display', 'inline-block');    
                                $("#timeWeek").css('display', 'none');    
                            }else{
                                $("#timeDay").css('display', 'none');    
                                $("#timeWeek").css('display', 'inline-block');    
                            };
                            //metroAddBounce_yewu.loadDataPre();
                  },
                  changeEchats : function(id,name){
                            $("div[name = '"+name+"']").css('display', 'none'); 
                            $("#"+id).css('display', 'block');
                               
                            $("#main_liuliang_a").css('color', '#fff');
                            $("#main_huawuliang_a").css('color', '#fff');
                            $("#main_yonghushu_a").css('color', '#fff');
                            $("#"+id+"_a").css('color', '#00e7f1');
                  },
                  eConsole :function(param) {    
                      if (typeof param.seriesIndex == 'undefined') {    
                                      return;    
                      };    
                      if (param.type == 'click') {    
                             //alert(param.name); 
                            var timeType = "day";
                            /*if ($("#yewu_day").attr('value') == "1"){
                                  timeType = "day";   
                             }else if($("#yewu_week").attr('value') == "1"){
                                  timeType = "week";   
                             };*/
                             if (param.name.indexOf("周")> -1){
                                  timeType = "week";   
                             };
                             metroAddBounce_yewu.loadPortfolioTableData(timeType,param.name);   
                      };    
                  },    
	              loadPortfolioEchart_liuliang : function(data){
                       var x = [];
                       var y_2g = [];
                       var y_3g = [];
                       var y_4g = [];
                       var y_all = [];
                       for (var i = 0; i < data.length; i++) {
                            var currObj = data[i];
                            x.push(currObj.time_id);
                            y_2g.push(currObj.bytes_2g);
                            y_3g.push(currObj.bytes_3g);
                            y_4g.push(currObj.bytes_4g);
                            y_all.push(currObj.bytes);
                       };
                       
                //使用
                	require(
                	       [
                	          'echarts',
                			  'echarts/chart/bar',
                	          'echarts/chart/line' // 使用柱状图就加载bar模块，按需加载
                	       ],
                	       function(ec){
                		       	//基于准备好的dom,初始化echarts图表
                		       	var myChart = ec.init(document.getElementById('main_liuliang'));
                                var ecConfig = require('echarts/config');  
                                myChart.on(ecConfig.EVENT.CLICK, metroAddBounce_yewu.eConsole);     
                		       	var option = {
                		       		color:['#33ccff','#00ff5a','#fced00','#7B68EE'],
                		       		//数据提示框配置
                		       		tooltip: {
                				       		trigger: 'axis', //触发类型，默认数据触发，可选为：'item' | 'axis' 其实就是是否共享提示框
                                            formatter:function(params){
                                    			var tip="流量<br/>"
                                    				+params[1].seriesName+':'+params[1].value+' GB('+(params[1].value/params[0].value*100).toFixed(2)+'%)'+'<br/>'
                                    				+params[2].seriesName+':'+params[2].value+' GB('+(params[2].value/params[0].value*100).toFixed(2)+'%)'+'<br/>'
                                    				+params[3].seriesName+':'+params[3].value+' GB('+(params[3].value/params[0].value*100).toFixed(2)+'%)'+'<br/>'
                                    				+params[0].seriesName+':'+params[0].value;
                                    			return tip;
                                    		}
                		       		},

                		       		//图例配置
                		       		/*legend: {
                				       		data: ['蒸发量(ml)'], //这里需要与series内的每一组数据的name值保持一致
                							selected : {'降水量(ml)':false},
                				       		x:800,
                				       		y:37
                		       		},*/
    		       				    legend: {
    		       				        data:["总流量","2G流量","3G流量","4G流量"],
    		       				        textStyle :
    		       		        		{
    		       				        	color:LSMScreen.CHARTCONFIG.xAxisLabelColor,
    		       		            		fontSize:LSMScreen.CHARTCONFIG.axisLabelSize*0.7
    		       		        		},
    		       				    },
                					grid:{
								    	borderWidth:0,
								    	x:120,
								    	y:30,
								    	x2:30,
								    	y2:70
								    },
                		       		calculable: false,   //点击拐弯处,可以拖拽
            		       		    xAxis : [
            		       		        {   
            		       		            type : 'category',
            		       		            axisLabel : {
            		       		            	textStyle :
            		       		            		{
            		       			            		color:LSMScreen.CHARTCONFIG.xAxisLabelColor,
            		       			            		fontSize:LSMScreen.CHARTCONFIG.axisLabelSize
            		       		            		},
                                                rotate : 15,       //x轴上的字段名,旋转60度
                                                interval : "auto"    //auto自动隐藏显示不下的,    0 全部显示    
            		       		            },
            		       		            axisLine:{
            		       		            	lineStyle:{
            		       		            		color: LSMScreen.CHARTCONFIG.xAxisColor,
            		       			                width: 2,
            		       			                type: 'solid'
            		       		            	}
            		       		            },
            		       		            splitLine:{
            		       		            	lineStyle:{
            		       		            		color: LSMScreen.CHARTCONFIG.xAxisColor,
            		       		            		width: 1,
            		       			                type: 'solid'
            		       		            	}
            		       		            },
            		       		            formatter: '{value}',
            		       		            boundaryGap : false,
                                            data : x //xArr
            		       		        }
            		       		    ],
            		       		    yAxis : [
            		       		        {
            		       		            type : 'value',
            		       		            axisLabel : {
            		       		            	textStyle :
            		       		            		{
            		       		            		color:LSMScreen.CHARTCONFIG.xAxisLabelColor,
            		       		            		fontSize:LSMScreen.CHARTCONFIG.axisLabelSize
            		       		            		}
            		       		            },
            		       		            axisLine:{
            		       		            	lineStyle:{
            		       		            		color: LSMScreen.CHARTCONFIG.yAxisColor,
            		       			                width: 2,
            		       			                type: 'solid'
            		       		            	}
            		       		            },
            		       		            splitLine:{
            		       		            	lineStyle:{
            		       		            		color:LSMScreen.CHARTCONFIG.yAxisColor,
            		       		            		width: 1,
            		       			                type: 'solid'
            		       		            	}
            		       		            },
            		       		            formatter: '{value}',
            		       		            min:0
            		       		        }
            		       		    ],
                		       		//图表Series数据序列配置
                		       		series : [
                		       		    {
                		       		        name:'总流量',
                		       		        type:'line',
                		       		        data:y_all, //pftChartArr,
                		       		        itemStyle:{normal:{lineStyle:{width:2}}}
                		       		    },{
                		       		        name:'2G流量',
                		       		        type:'line',
                		       		        data:y_2g, //sigChartArr,
                		       		        itemStyle:{normal:{lineStyle:{width:2}}}
                		       		    },{
                                            name:'3G流量',
                                            type:'line',
                                            data:y_3g, //sigChartArr,
                                            itemStyle:{normal:{lineStyle:{width:2}}}
                                        },{
                                            name:'4G流量',
                                            type:'line',
                                            data:y_4g, //sigChartArr,
                                            itemStyle:{normal:{lineStyle:{width:2}}}
                                        }
                		       		]
                		        };
                		        // 为echarts对象加载数据 
                		       myChart.setOption(option);
                			
                			}
                		);
	               },
                   loadPortfolioEchart_huawuliang : function(data){
                      var x = [];
                      var y = [];
                      
                      for (var i = 0; i < data.length; i++) {
                           var currObj = data[i];
                           x.push(currObj.time_id);
                           y.push(currObj.teletraffic);
                          
                      };
                //使用
                    require(
                           [
                              'echarts',
                              'echarts/chart/bar',
                              'echarts/chart/line' // 使用柱状图就加载bar模块，按需加载
                           ],
                           function(ec){
                                //基于准备好的dom,初始化echarts图表
                                var myChart = ec.init(document.getElementById('main_huawuliang'));
                                var ecConfig = require('echarts/config');  
                                myChart.on(ecConfig.EVENT.CLICK, metroAddBounce_yewu.eConsole);
                                var option = {
                                    
                                    //数据提示框配置
                                    tooltip: {
                                            trigger: 'axis', //触发类型，默认数据触发，可选为：'item' | 'axis' 其实就是是否共享提示框
                                            formatter:'{b}<br/>{a}:{c}(Erl)'
                                    },

                                    //图例配置
                                    /*legend: {
                                            data: ['蒸发量(ml)'], //这里需要与series内的每一组数据的name值保持一致
                                            selected : {'降水量(ml)':false},
                                            x:800,
                                            y:37
                                    },*/
                                    /*legend: {
                                        data:["大客流用户数","信令用户数"],
                                        textStyle :
                                        {
                                            color:LSMScreen.CHARTCONFIG.xAxisLabelColor,
                                            fontSize:LSMScreen.CHARTCONFIG.axisLabelSize*0.7
                                        },
                                    },*/
                                    grid:{
                                        borderWidth:0,
                                        x:120,
                                        y:30,
                                        x2:30,
                                        y2:70
                                    },
                                    calculable: false,   //点击拐弯处,可以拖拽
                                    xAxis : [
                                        {   
                                            type : 'category',
                                            axisLabel : {
                                                textStyle :
                                                    {
                                                        color:LSMScreen.CHARTCONFIG.xAxisLabelColor,
                                                        fontSize:LSMScreen.CHARTCONFIG.axisLabelSize
                                                    },
                                                rotate : 15,       //x轴上的字段名,旋转60度
                                                interval : "auto"    //auto自动隐藏显示不下的,    0 全部显示    
                                            },
                                            axisLine:{
                                                lineStyle:{
                                                    color: LSMScreen.CHARTCONFIG.xAxisColor,
                                                    width: 2,
                                                    type: 'solid'
                                                }
                                            },
                                            splitLine:{
                                                lineStyle:{
                                                    color: LSMScreen.CHARTCONFIG.xAxisColor,
                                                    width: 1,
                                                    type: 'solid'
                                                }
                                            },
                                            formatter: '{value}',
                                            boundaryGap : false,
                                            data : x //xArr
                                        }
                                    ],
                                    yAxis : [
                                        {
                                            type : 'value',
                                            axisLabel : {
                                                textStyle :
                                                    {
                                                    color:LSMScreen.CHARTCONFIG.xAxisLabelColor,
                                                    fontSize:LSMScreen.CHARTCONFIG.axisLabelSize
                                                    }
                                            },
                                            axisLine:{
                                                lineStyle:{
                                                    color: LSMScreen.CHARTCONFIG.yAxisColor,
                                                    width: 2,
                                                    type: 'solid'
                                                }
                                            },
                                            splitLine:{
                                                lineStyle:{
                                                    color:LSMScreen.CHARTCONFIG.yAxisColor,
                                                    width: 1,
                                                    type: 'solid'
                                                }
                                            },
                                            formatter: '{value}',
                                            min:0
                                        }
                                    ],
                                    //图表Series数据序列配置
                                    series : [
                                        {
                                            name:'话务量',
                                            type:'line',
                                            data:y, //pftChartArr,
                                            itemStyle:{normal:{color:'yellow',lineStyle:{width:2}}}
                                        }
                                    ]
                                };
                                // 为echarts对象加载数据 
                               myChart.setOption(option);
                            
                            }
                        );
                   },
                   loadPortfolioEchart_yonghushu : function(data){
                    var x = [];
                    var y = [];
                    
                    for (var i = 0; i < data.length; i++) {
                         var currObj = data[i];
                         x.push(currObj.time_id);
                         y.push(currObj.user_cnt);
                        
                    };
                    
                //使用
                    require(
                           [
                              'echarts',
                              'echarts/chart/bar',
                              'echarts/chart/line' // 使用柱状图就加载bar模块，按需加载
                           ],
                           function(ec){
                                //基于准备好的dom,初始化echarts图表
                                var myChart = ec.init(document.getElementById('main_yonghushu'));
                                var ecConfig = require('echarts/config');  
                                myChart.on(ecConfig.EVENT.CLICK, metroAddBounce_yewu.eConsole);
                                var option = {
                                    
                                    //数据提示框配置
                                    tooltip: {
                                            trigger: 'axis', //触发类型，默认数据触发，可选为：'item' | 'axis' 其实就是是否共享提示框
                                            formatter:'{b}<br/>{a}:{c}(人)'
                                    },

                                    //图例配置
                                    /*legend: {
                                            data: ['蒸发量(ml)'], //这里需要与series内的每一组数据的name值保持一致
                                            selected : {'降水量(ml)':false},
                                            x:800,
                                            y:37
                                    },*/
                                    /*legend: {
                                        data:["大客流用户数","信令用户数"],
                                        textStyle :
                                        {
                                            color:LSMScreen.CHARTCONFIG.xAxisLabelColor,
                                            fontSize:LSMScreen.CHARTCONFIG.axisLabelSize*0.7
                                        },
                                    },*/
                                    grid:{
                                        borderWidth:0,
                                        x:140,
                                        y:30,
                                        x2:30,
                                        y2:70
                                    },
                                    calculable: false,   //点击拐弯处,可以拖拽
                                    xAxis : [
                                        {
                                            type : 'category',
                                            axisLabel : {
                                                textStyle :
                                                    {
                                                        color:LSMScreen.CHARTCONFIG.xAxisLabelColor,
                                                        fontSize:LSMScreen.CHARTCONFIG.axisLabelSize
                                                    },
                                                rotate : 15,       //x轴上的字段名,旋转60度
                                                interval : "auto"    //auto自动隐藏显示不下的,    0 全部显示        
                                            },
                                            axisLine:{
                                                lineStyle:{
                                                    color: LSMScreen.CHARTCONFIG.xAxisColor,
                                                    width: 2,
                                                    type: 'solid'
                                                }
                                            },
                                            splitLine:{
                                                lineStyle:{
                                                    color: LSMScreen.CHARTCONFIG.xAxisColor,
                                                    width: 1,
                                                    type: 'solid'
                                                }
                                            },
                                            formatter: '{value}',
                                            boundaryGap : false,
                                            data : x //xArr
                                        }
                                    ],
                                    yAxis : [
                                        {
                                            type : 'value',
                                            axisLabel : {
                                                textStyle :
                                                    {
                                                    color:LSMScreen.CHARTCONFIG.xAxisLabelColor,
                                                    fontSize:LSMScreen.CHARTCONFIG.axisLabelSize
                                                    }
                                            },
                                            axisLine:{
                                                lineStyle:{
                                                    color: LSMScreen.CHARTCONFIG.yAxisColor,
                                                    width: 2,
                                                    type: 'solid'
                                                }
                                            },
                                            splitLine:{
                                                lineStyle:{
                                                    color:LSMScreen.CHARTCONFIG.yAxisColor,
                                                    width: 1,
                                                    type: 'solid'
                                                }
                                            },
                                            formatter: '{value}',
                                            min:0
                                        }
                                    ],
                                    //图表Series数据序列配置
                                    series : [
                                        {
                                            name:'用户数',
                                            type:'line',
                                            data:y, //pftChartArr,
                                            itemStyle:{normal:{color:'green',lineStyle:{width:2}}}
                                        }
                                    ]
                                };
                                // 为echarts对象加载数据 
                               myChart.setOption(option);
                            
                            }
                        );
                   },
	               loadPortfolioTable : function(){
	               	    console.log("加载业务量表格...");
                         var colNames=['地铁线路','总流量(GB)','4G流量(GB)', '3G流量(GB)', '2G流量(GB)', '话务量(Erl)','用户数'];
                               var colModel=[
                                                {name:'metro_name',index:'metro_name', width:151,formatter:function(cellVal,options,rowObjs){

                                                                var background = "00e7f1";  
                                                                var cellVal_Z = "全";
                                                                if (cellVal == "地铁全线"){
                                                                     //background = "e91b39";
                                                                     cellVal_Z = "全"  
                                                                }else if (cellVal == "地铁1号线"){
                                                                     background = "e91b39";
                                                                     cellVal_Z = "1"  
                                                                }else if(cellVal == "地铁2号线"){
                                                                     background = "8ac53f";
                                                                     cellVal_Z = "2"  
                                                                }else if(cellVal == "地铁3号线"){
                                                                     background = "fad315";
                                                                     cellVal_Z = "3"  
                                                                }else if(cellVal == "地铁4号线"){
                                                                     background = "502e8d";
                                                                     cellVal_Z = "4"  
                                                                }else if(cellVal == "地铁5号线"){
                                                                     background = "9056a3";
                                                                     cellVal_Z = "5"  
                                                                }else if(cellVal == "地铁6号线"){
                                                                     background = "d61870";
                                                                     cellVal_Z = "6"  
                                                                }else if(cellVal == "地铁7号线"){
                                                                     background = "f37121";
                                                                     cellVal_Z = "7"  
                                                                }else if(cellVal == "地铁8号线"){
                                                                     background = "009eda";
                                                                     cellVal_Z = "8"  
                                                                }else if(cellVal == "地铁9号线"){
                                                                     background = "79c8ed";
                                                                     cellVal_Z = "9"  
                                                                }else if(cellVal == "地铁10号线"){
                                                                     background = "bca8d1";
                                                                     cellVal_Z = "10"  
                                                                }else if(cellVal == "地铁11号线"){
                                                                     background = "852e3d";
                                                                     cellVal_Z = "11"  
                                                                }else if(cellVal == "地铁12号线"){
                                                                     background = "007c65";
                                                                     cellVal_Z = "12"  
                                                                }else if(cellVal == "地铁13号线"){
                                                                     background = "e895c0";
                                                                     cellVal_Z = "13"  
                                                                }else if(cellVal == "地铁16号线"){
                                                                     background = "8dd1bf";
                                                                     cellVal_Z = "16"  
                                                                };
                                                                var htmlStr = '<div title="'+cellVal+'" style="background: #'+background+'; border-radius: 8px; width: 36px; height: 36px; color: white; margin-left: 45%;">'+cellVal_Z+'</div>';
                                                                return htmlStr;
                                                   }
                                                },
                                                {name:'bytes',index:'bytes', width:181,},
                                                {name:'bytes_4g',index:'bytes_4g', width:181,},
                                                {name:'bytes_3g',index:'bytes_3g', width:171},
                                                {name:'bytes_2g',index:'bytes_2g', width:171},
                                                {name:'teletraffic',index:'teletraffic', width:171,},
                                                {name:'user_cnt',index:'user_cnt', width:171}               
                                                             
                                            ];
                                 
                                            $("#yewutab5").jqGrid({
                                                datatype: "local",
                                                height:371,
                                                width:1196,
                                                //rowNum:5,
                                                rowList:[10,20,30],
                                                //sortname:'id',
                                                //shrinkToFit:false,  
                                                //autoScroll: true,
                                                colNames:colNames,
                                                colModel:colModel,
                                                //sortable:true,
                                                viewrecords:true
                                                //caption: "第一个jqGrid例子"
                                            }).navGrid("#yewupager5",{edit:false,add:false ,del:false});

                                            
	             
	           },
               loadPortfolioTableData : function(timeType,time){
                console.log(timeType+"--图转表--"+time);
                var timeArr = FormatDateTimeS(timeType,time);
                var urlT = LSMConsts.G_URLCONFIG.urlWs + "/fast_query/area/pm/line?startTime="+timeArr[1]+"&endTime="+timeArr[1]+"&orderName=bytes&orderType=desc";
                if (timeType == "week") {urlT += "&timeType=week";};
                jQuery("#yewutab5").jqGrid('clearGridData');
                $("#load_yewutab5").css('display', 'block');
                commonAjax(urlT,"","get",true,"",function(resT){
                     var mydata = resT;  
                        
                        for(var i=0;i<=mydata.length;i++){
                            jQuery("#yewutab5").jqGrid('addRowData',i+1,mydata[i]);
                        };  
                        $("#load_yewutab5").css('display', 'none');          
                   });
               },
};
//求一年总共有多少周
    function getNumOfWeeks(year){
        var d=new Date(year,0,1);
        var yt=( ( year%4==0 && year%100!=0) || year%400==0)? 366:365; 
        return Math.ceil((yt-d.getDay())/7.0);
    };
    var getYearWeek = function (a, b, c) { 
        var date1 = new Date(a, parseInt(b) - 1, c), date2 = new Date(a, 0, 1), 
        d = Math.round((date1.valueOf() - date2.valueOf()) / 86400000); 
        return Math.ceil((d + ((date2.getDay() + 1) - 1)) / 7); 
    };
    function FormatDateTimeS(timeType,time){
            var timeArr = []; 
            var re1=new RegExp("-","g");
            var re2=new RegExp(":","g");
            var re3=new RegExp(" ","g");
            var re4=new RegExp("周","g");
          if(timeType == "day"){
                 var timeDate = new Date(time);
                 var per_time = new Date(timeDate.getTime() - 10*24*60*60*1000);
                    
                 var pre_timeStr = per_time.format("yyyy-MM-dd")
                 var endtimeStr = timeDate.format("yyyy-MM-dd")
                
                pre_timeStr=pre_timeStr.replace(re1,""); 
                pre_timeStr=pre_timeStr.replace(re2,""); 
                pre_timeStr=pre_timeStr.replace(re3,"");

                endtimeStr=endtimeStr.replace(re1,""); 
                endtimeStr=endtimeStr.replace(re2,""); 
                endtimeStr=endtimeStr.replace(re3,"");
                

                 timeArr.push(pre_timeStr);
                 timeArr.push(endtimeStr);
          };
          if (timeType == "week") {
                   var startWeek = getWeeksbeforeWeek(time,8); 
                  
                   startWeek=startWeek.replace(re1,""); 
                   startWeek=startWeek.replace(re2,""); 
                   startWeek=startWeek.replace(re3,""); 
                   startWeek=startWeek.replace(re4,""); 
                   time=time.replace(re1,""); 
                   time=time.replace(re2,""); 
                   time=time.replace(re3,""); 
                   time=time.replace(re4,""); 

                   timeArr.push(startWeek+"00");
                   timeArr.push(time+"00");

          };


          return timeArr;

    };
    function getWeeksbeforeWeek(yearWeek,num){  
     var yearWeekArr = yearWeek.split("-");  
     var lastYear = yearWeekArr[0] - 1;  

     var d=new Date(lastYear,0,1); 
     var yt=( ( lastYear%4==0 && lastYear%100!=0) || lastYear%400==0)? 366:365; 
     var lastYearOfWeek = Math.ceil((yt-d.getDay())/7.0);  
 
     var newYear = yearWeekArr[0]; 
     var newWeek = yearWeekArr[1];  
     console.log(newWeek-num); 

     if((newWeek-num)<1){     
           newYear = lastYear;     
           newWeek = newWeek-num +lastYearOfWeek;
    }else{     
           newWeek = newWeek-num; 
    };   
    return newYear+"-"+newWeek;    
};  

    function commonAjax(url,dataStr,type,async,loadingId,callback){
     
        if(!type ||type =="" ||type ==null){type = 'POST';};
        if(!async ||async =="" ||async ==null){async = false;};
        var result = "";
        $.ajax({
                    url : url ,
                    type : type,
                    async : async,
                    dataType : "json",
                    contentType :"application/json",
                    data:dataStr,
                    success : function(data) {
                        result = data;
                        callback(data);
                    },
                    complete: function(XMLHttpRequest, textStatus){
                          //HideLoading();
                          if(loadingId != ""){
                              $("#"+loadingId).unmask();
                          };
                    },
                    error: function(){
                          //请求出错处理
                          //eastcom.showMsg("danger","请求异常,数据加载失败!");
                    }
            });
        return result;
};