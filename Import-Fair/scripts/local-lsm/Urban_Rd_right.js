//jQuery.support.cors = true;


var eastcom_URLs = "http://10.221.247.7:8080";

var currMenue = "下行速率500k";

var currtable_obj_id = "table_loadSpeed";
var currtable_id =  "loadSpeed";

var currTop_style_obj_id = "first_div_top";
var currTop_htmlValue_id = "top_name_one";

var Urban_Rd_right = {
				 mainHotspot:"高架",
				 timeIndex:0,
				 timeList:[],
	             init : function(){
	            	 	var baseHour=5;
	            	 	var baseMin=0;
	            	 	while(baseHour<24){//填充时间列表 05:00-23:55
	            	 		var hourStr=baseHour<10?"0"+baseHour:baseHour;
	            	 		var minStr=baseMin<10?"0"+baseMin:baseMin;
	            	 		var timeStr=hourStr+":"+minStr;
	            	 		this.timeList.push(timeStr);
	            	 		
	            	 		baseMin+=5;
	            	 		if(baseMin>=60){
	            	 			baseMin=0;
	            	 			baseHour+=1;
	            	 		}
	            	 	}
	            	 	
	            	 	$("#mainHotspot").on('click',this.showRegionSelector.bind(this));
	            	 	$("#ctrlBtn").on('click',this.ctrlBtnClick.bind(this));
                        Urban_Rd_right.getEchartsData();
                        //Urban_Rd_right.initTop(currMenue);
                        Urban_Rd_right.initDataShang();
                        Urban_Rd_right.tabChange(currtable_obj_id,currtable_id);
	             }, 
	             refresh : function(){
	            	 	if(this.isPlay()==true) return;
	            	 	$("#mainHotspot").text(this.mainHotspot);
	            	 	$(".UR2S_content3").css("display",this.mainHotspot=="高架"?"block":"none");
                        Urban_Rd_right.getEchartsData();
                        //Urban_Rd_right.initTop(currMenue);
                        Urban_Rd_right.initDataShang();
                        Urban_Rd_right.tabChange(currtable_obj_id,currtable_id);
	             },
	             refreshStyles : function(){
	             	    currMenue = "下行速率500k";
                        $("#first_div_top").addClass('select_background_pictrue');  
						$("#table_loadSpeed").removeClass('Rselect_bg') ;
						$("#table_user").removeClass('Rselect_bg') ;
						$("#table_lostRate").removeClass('Rselect_bg') ;
						$("#div_loadSpeed").css('display', 'none');
						$("#div_user").css('display', 'none');
						$("#div_lostRate").css('display', 'none');

                   	    $("#table_loadSpeed").addClass('Rselect_bg');
                   	    $("#div_loadSpeed").css('display', 'block');
                       	   
                       
	             },
	             getEchartsData : function(paramTime){
                          var timeBegin = new Date();
                          timeBegin.setHours(timeBegin.getHours()-1); 
                          //timeBegin.setMinutes(timeBegin.getMinutes()-15); 
                          var timeBeginStr = timeBegin.format("yyyy-MM-dd hh:mm:ss");

                          var timeEnd = new Date();
                          timeEnd.setMinutes(timeEnd.getMinutes()-15); 
                          var timeEndStr = timeEnd.format("yyyy-MM-dd hh:mm:ss");

                          var timeBeginCompare = new Date();
                           timeBeginCompare.setHours(timeBeginCompare.getHours()-1);                           
                          timeBeginCompare.setMinutes(timeBeginCompare.getMinutes()-15); 
                          var timeBeginCompareStr = timeBeginCompare.format("yyyy-MM-dd hh:mm:ss");

                          var timeEndCompare = new Date();
                           
                           timeEndCompare.setMinutes(timeEndCompare.getMinutes()-15); 
                          var timeEndCompareStr = timeEndCompare.format("yyyy-MM-dd hh:mm:ss");


	             	       var url  = eastcom_URL+"/stream/union/hotspot-times-compare?hotspot="+encodeURIComponent('南北高架')+"&timeBegin="+timeBeginStr+"&timeEnd="+timeEndStr+"&timeBeginCompare="+timeBeginCompareStr+"&timeEndCompare="+timeEndCompareStr;
	                       //var  url = eastcom_URL+"/stream/union/hotspot-times-compare?hotspot=南北高架&timeBegin=2016-05-21 19:40:46&timeEnd=2016-05-21 20:40:59&timeBeginCompare=2016-05-20 19:42:57&timeEndCompare=2016-05-20 20:43:17" 
	          	    	    $.ajax({
	                                 url : url,
	                                 type : "get",
	                                 async : true, //异步执行
	                                 data : {},
	                                 dataType : "json" //返回数据形式为json
	                          }).done(function (data) {   
	                         
                                  var loadSpeed = [];
                                  var user = [];
                                  var lostRate = [];
                                  var time = [];
                                  var smallloadSeed = [];
                                  var smallUser = [];
                                  var smalllastRate = [];
                                  for (var i = 0; i < data.length; i++) {
                                  	          var item = data[i];    //item["下行速率500k"]
                                  	          time.push(item.time);
                                  	          smallloadSeed.push(Urban_Rd_right.changeTwoDecimal(item["下行速率500k"]));
                                  	          smallUser.push(Urban_Rd_right.changeTwoDecimal(item["总用户数"]));
                                  	          smalllastRate.push(Urban_Rd_right.changeTwoDecimal((item["TCP掉线率"]*100)));
                                        
                                  };
                                  loadSpeed.push(time);
                                  user.push(time);
                                  lostRate.push(time);
                                  loadSpeed.push(smallloadSeed);
                                  user.push(smallUser);
                                  lostRate.push(smalllastRate);
                                  //--------------------------------
                                  var str = time[time.length-1];
                                  $("#timeShow").html(str.substring(11,16));
                                  //--------------------------------
                                  Urban_Rd_right.initeEcharts(loadSpeed,"UR2S_content_div_loadSpeed","下载速率(Kbps)");
                                  Urban_Rd_right.initeEcharts(user,"UR2S_content_div_user","用户数(人)");
                                  Urban_Rd_right.initeEcharts(lostRate,"UR2S_content_div_lostRate","掉线率(%)");

	                         });
	             }, 
	             initeEcharts : function(val,charId,name){    //
                                 require([
                                            'echarts',
                                            'echarts/chart/line', // 使用柱状图就加载bar模块，按需加载
                                            'echarts/chart/bar'
                                         ],
	                                function (ec) {
	                                    // 基于准备好的dom，初始化echarts图表
			                                    var myChart = ec.init(document.getElementById(charId));

			                                    var option = {
			                                        title : {
			                                            x: 'center',
			                                            textStyle: {
			                                                fontSize: 30,
			                                                color: '#ffffff'
			                                            }
			                                        },
			                                        axis: {
			                                            splitNumber: 3,
			                                                    axisLabel: {
			                                                textStyle: {
			                                                    color: '#ffffff'
			                                                }
			                                            }
			                                        },
			                                        tooltip : {
			                                            trigger: 'axis'
			                                        },
			                                        /*legend: {
			                                            data: ['总用户'],
			                                            textStyle: {
			                                                fontSize: 24,
			                                                color: '#ffffff'
			                                            },
			                                            y: 'bottom',
			                                            x: 'center'
			                                        },*/
			                                        calculable : true,
			                                        grid: {
			                                            x: '10%',
			                                            width: '78%',
			                                            borderWidth: 0
			                                            //backgroundColor: '#252c34'
			                                        },
			                                        xAxis : [
			                                            {   show:false,
			                                                type: 'category',
			                                                axisLabel: {
			                                                    textStyle: {
			                                                        fontSize: 20,
			                                                        color: '#ffffff'
			                                                    }
			                                                },
			                                                boundaryGap: false,
			                                                name: '',
			                                                splitLine: {
			                                                    show: true,
			                                                    lineStyle: {
			                                                        color: ['#003250'],
			                                                        width: 1,
			                                                        type: 'solid'
			                                                    }
			                                                },
			                                                data : val[0]
			                                            }
			                                        ],
			                                        yAxis : [
			                                            {   show:false, 
			                                                type : 'value',
			                                                splitNumber: 3,
			                                                axisLabel: {
			                                                    textStyle: {
			                                                        fontSize: 20,
			                                                        color: '#ffffff'
			                                                    }
			                                                },
			                                                nameTextStyle: {
			                                                    fontSize: 20,
			                                                    color: '#00fcff'
			                                                },
			                                                name: name,
			                                                splitLine: {
			                                                    show: true,
			                                                    lineStyle: {
			                                                        color: ['#003250'],
			                                                        width: 1,
			                                                        type: 'solid'
			                                                    }
			                                                }
			                                            }
			                                        ],
			                                        series : [
			                                            {
			                                                itemStyle:{
			                                                    normal: {color:'#fc018f'}
			                                                },
			                                                name: name,
			                                                type: 'line',
			                                                data: val[1],
			                                                symbol:'none',
			                                                smooth: true
			                                            }
			                                        ]
			                                    }
	                                    // 为echarts对象加载数据,并添加单击响应事件
	                                    myChart.setOption(option,true);
	                                }
                                );
                                               
	             },

	             initDataShang : function(paramTime,paramTimeCompare){
	             	        var time = new Date();
	             	        time.setMinutes(time.getMinutes()-15); 
	             	       // var timeStr = time.format("yyyy-MM-dd hh:mm:ss"); 
	             	        var timeStr_q = time.format("yyyy-MM-dd"); 
	             	        var timeStr_h = time.format("hh:mm:ss"); 
	             	        

	             	        var timeCompare = new Date();
	             	        timeCompare.setDate(timeCompare.getDate()-1); 
	             	        //var timeCompareStr = timeCompare.format("yyyy-MM-dd hh:mm:ss"); 
	             	        var timeCompareStr_q = timeCompare.format("yyyy-MM-dd"); 
	             	        var timeCompareStr_h = timeCompare.format("hh:mm:ss"); 
	             	        
	             	        if(paramTime!=null){
	             	        	timeStr_q=paramTime.split(" ")[0];
	             	        	timeStr_h=paramTime.split(" ")[1];
	             	        }
	             	       if(paramTimeCompare!=null){
	             	    	  timeCompareStr_q=paramTimeCompare.split(" ")[0];
	             	    	  timeCompareStr_h=paramTimeCompare.split(" ")[1];
	             	       }
                             

                            var url = eastcom_URL+"/stream/union/hotspots-time-compare?time="+timeStr_q+"%20"+timeStr_h+"&timeCompare="+timeCompareStr_q+"%20"+timeCompareStr_h;
                            //var url = eastcom_URL+"/stream/union/hotspots-time-compare?time=2016-05-21%2019:40:46&timeCompare=2016-05-20%2019:42:57";
                            var data = ["南北高架"];
                            var dataStr = JSON.stringify(data); 
	          	    	    $.ajax({
	                                 url : url,
	                                 type : "post",
	                                 async : true, //异步执行
	                                 dataType : "json", //返回数据形式为json
	                                 contentType :"application/json",
	                                 data : dataStr
	                          })
	                          .done(function (data) { 
                                         var item = data["南北高架"];
                                         $("#loadSpeed_data").html(Urban_Rd_right.changeTwoDecimal(item["下行速率500k"])+'<span>&nbsp;Kbps</span>');  
                                         $("#user_data").html(Urban_Rd_right.changeTwoDecimal(item["总用户数"])+'<span>&nbsp;人</span>');  
                                         $("#lostRate_data").html(Urban_Rd_right.changeTwoDecimal(item["TCP掉线率"]*100)+'<span>&nbsp;%</span>');


	                          });  
                            //南北指标
                            var urlA = eastcom_URL+"/stream/union/hotspots-time-compare?time="+timeStr_q+"%20"+timeStr_h+"&timeCompare="+timeCompareStr_q+"%20"+timeCompareStr_h;
	                        //var urlA = eastcom_URL+"/stream/union/hotspots-time-compare?time=2016-05-21%2019:40:46&timeCompare=2016-05-20%2019:42:57";
                            var dataA = ["南北高架"];
                            var dataStrA = JSON.stringify(dataA); 
	          	    	    $.ajax({
	                                 url : urlA,
	                                 type : "post",
	                                 async : true, //异步执行
	                                 dataType : "json", //返回数据形式为json
	                                 contentType :"application/json",
	                                 data : dataStrA
	                          })
	                          .done(function (data) { 
                                         var item = data["南北高架"];
                                         $("#loadSpeed_nanbei_data").html(item["下行速率500k"] == 0?"0":Urban_Rd_right.changeTwoDecimal(item["下行速率500k"]));  
                                         $("#user_nanbei_data").html(item["总用户数"] == 0?"0":Urban_Rd_right.changeTwoDecimal(item["总用户数"]));  
                                         $("#lostRate_nanbei_data").html(item["TCP掉线率"] == 0?"0":Urban_Rd_right.changeTwoDecimal(item["TCP掉线率"]*100)+" %");  
	                          }); 
                              //环比指标
                              var urlB = eastcom_URL+"/stream/union/hotspots-time-compare?time="+timeStr_q+"%20"+timeStr_h+"&timeCompare="+timeCompareStr_q+"%20"+timeCompareStr_h;
  	                         //var urlB = eastcom_URL+"/stream/union/hotspots-time-compare?time=2016-05-21%2019:40:46&timeCompare=2016-05-20%2019:42:57";
                              var dataB = [this.mainHotspot];
                              var dataStrB = JSON.stringify(dataB); 
  	          	    	    $.ajax({
  	                                 url : urlB,
  	                                 type : "post",
  	                                 async : true, //异步执行
  	                                 dataType : "json", //返回数据形式为json
  	                                 contentType :"application/json",
  	                                 data : dataStrB
  	                          })
  	                          .done(function (data) { 
                                           var item = data[this.mainHotspot];
                                           var f1 = "";
                                           var f2 = "";
                                           var f3 = "";
                                           if((item["下行速率500k历史比"]-1)>0){
                                           	 f1 = "+";
                                           };
                                           if((item["总用户数历史比"]-1)>0){
                                           	 f2 = "+";
                                           };
                                           if((item["TCP掉线率历史比"]-1)>0){
                                           	 f3 = "+";
                                           };
                                           $("#loadSpeed_huanbi_data").html(item["下行速率500k历史比"] == 0?"--":f1+Urban_Rd_right.changeTwoDecimal((item["下行速率500k历史比"]-1)*100));  
                                           $("#user_huanbi_data").html(item["总用户数历史比"] == 0?"--":f2+Urban_Rd_right.changeTwoDecimal((item["总用户数历史比"]-1)*100));  
                                           $("#lostRate_huanbi_data").html(item["TCP掉线率历史比"] == 0?"--":f3+Urban_Rd_right.changeTwoDecimal((item["TCP掉线率历史比"]-1)*100)); 
                                           
  	                          }.bind(this));  
  	                           //内环指标
                              var urlC = eastcom_URL+"/stream/union/hotspots-time-compare?time="+timeStr_q+"%20"+timeStr_h+"&timeCompare="+timeCompareStr_q+"%20"+timeCompareStr_h;
  	                        //var urlC = eastcom_URL+"/stream/union/hotspots-time-compare?time=2016-05-21%2019:40:46&timeCompare=2016-05-20%2019:42:57";
                              var dataC = ["内环"];
                              var dataStrC = JSON.stringify(dataC); 
  	          	    	    $.ajax({
  	                                 url : urlC,
  	                                 type : "post",
  	                                 async : true, //异步执行
  	                                 dataType : "json", //返回数据形式为json
  	                                 contentType :"application/json",
  	                                 data : dataStrC
  	                          })
  	                          .done(function (data) { 
                                           var item = data["内环"];
                                           $("#loadSpeed_neihuan_data").html(item["下行速率500k"] == 0?"--":item["下行速率500k"]);  
                                           $("#user_neihuan_data").html(item["总用户数"] == 0?"--":item["总用户数"]);  
                                           $("#lostRate_neihuan_data").html(item["TCP掉线率"] == 0?"--":item["TCP掉线率"]+" %");  
  	                          });   
  	                           //中环指标
                              var urlD = eastcom_URL+"/stream/union/hotspots-time-compare?time="+timeStr_q+"%20"+timeStr_h+"&timeCompare="+timeCompareStr_q+"%20"+timeCompareStr_h;
  	                        //var urlD = eastcom_URL+"/stream/union/hotspots-time-compare?time=2016-05-21%2019:40:46&timeCompare=2016-05-20%2019:42:57";
                              var dataD = ["中环"];
                              var dataStrD = JSON.stringify(dataD); 
  	          	    	    $.ajax({
  	                                 url : urlD,
  	                                 type : "post",
  	                                 async : true, //异步执行
  	                                 dataType : "json", //返回数据形式为json
  	                                 contentType :"application/json",
  	                                 data : dataStrD
  	                          })
  	                          .done(function (data) { 
                                           var item = data["中环"];
                                           $("#loadSpeed_zhonghuan_data").html(item["下行速率500k"] == 0?"--":item["下行速率500k"]);  
                                           $("#user_zhonghuan_data").html(item["总用户数"] == 0?"--":item["总用户数"]);  
                                           $("#lostRate_zhonghuan_data").html(item["TCP掉线率"] == 0?"--":item["TCP掉线率"]+" %");  
  	                          });   
  	                           //外环指标
                              var urlE = eastcom_URL+"/stream/union/hotspots-time-compare?time="+timeStr_q+"%20"+timeStr_h+"&timeCompare="+timeCompareStr_q+"%20"+timeCompareStr_h;
  	                        //var urlE = eastcom_URL+"/stream/union/hotspots-time-compare?time=2016-05-21%2019:40:46&timeCompare=2016-05-20%2019:42:57";
                              var dataE = ["外环"];
                              var dataStrE = JSON.stringify(dataE); 
  	          	    	    $.ajax({
  	                                 url : urlE,
  	                                 type : "post",
  	                                 async : true, //异步执行
  	                                 dataType : "json", //返回数据形式为json
  	                                 contentType :"application/json",
  	                                 data : dataStrE
  	                          })
  	                          .done(function (data) { 
                                           var item = data["外环"];
                                           $("#loadSpeed_waihuan_data").html(item["下行速率500k"] == 0?"--":item["下行速率500k"]);  
                                           $("#user_waihuan_data").html(item["总用户数"] == 0?"--":item["总用户数"]);  
                                           $("#lostRate_waihuan_data").html(item["TCP掉线率"] == 0?"--":item["TCP掉线率"]+" %");  
  	                          });   
  	                           //延安路指标
                              var urlF = eastcom_URL+"/stream/union/hotspots-time-compare?time="+timeStr_q+"%20"+timeStr_h+"&timeCompare="+timeCompareStr_q+"%20"+timeCompareStr_h;
  	                        //var urlF = eastcom_URL+"/stream/union/hotspots-time-compare?time=2016-05-21%2019:40:46&timeCompare=2016-05-20%2019:42:57";
                              var dataF = ["延安路"];
                              var dataStrF = JSON.stringify(dataF); 
  	          	    	    $.ajax({
  	                                 url : urlF,
  	                                 type : "post",
  	                                 async : true, //异步执行
  	                                 dataType : "json", //返回数据形式为json
  	                                 contentType :"application/json",
  	                                 data : dataStrF
  	                          })
  	                          .done(function (data) { 
                                           var item = data["延安路"];
                                           $("#loadSpeed_yananlu_data").html(item["下行速率500k"] == 0?"--":item["下行速率500k"]);  
                                           $("#user_yananlu_data").html(item["总用户数"] == 0?"--":item["总用户数"]);  
                                           $("#lostRate_yananlu_data").html(item["TCP掉线率"] == 0?"--":item["TCP掉线率"]+" %");  
  	                          });    

	             }, 
	             initTop : function(sortKey,paramTime){
	             	        var hotArr =[]; 
                            //查询高架下的所有物理热点
                            var urlA = eastcom_URL+"/services/ws/fast_query/area/re/re_areaHotRel?hotspot="+encodeURIComponent(this.mainHotspot)+"&hot_type=1";
                            //var urlA = "http://10.221.247.7:8080/services/ws/fast_query/area/re/re_areaHotRel?hotspot="+encodeURIComponent('高架')+"&hot_type=1";
                           
             	    	    $.ajax({
                                    type : "get",
                                    async : true, //异步执行
                                    url : urlA,
                                    data : {},
                                    dataType : "json" //返回数据形式为json
                             }) .done(function (data) {
                            
             	                    var arr = [];     
                                    for (var i = 0; i < data.length; i++) {
                                    	 var item = data[i];
                                         arr.push(item.hot_name);
                                    };
				           //----------------------------------------------------------------------------------------------
					             	        //查询数据
					             	        var timeBegin = new Date();
					             	        timeBegin.setMinutes(timeBegin.getMinutes()-59); 
					             	        var timeBeginStr = timeBegin.format("yyyy-MM-dd hh:mm:ss");
					             	        if(paramTime!=null){
					             	        	timeBeginStr=paramTime;
					             	        }
				                            var url = eastcom_URL+"/stream/union/hotspots-time-rank?time="+timeBeginStr+"&sortKey="+encodeURIComponent(sortKey)+"&num=3&order=desc";
				                            var data = arr;
				                            var dataStr = JSON.stringify(data); 
					          	    	    $.ajax({
					                                 url : url,
					                                 type : "post",
					                                 async : true, //异步执行
					                                 dataType : "json", //返回数据形式为json
					                                 contentType :"application/json",
					                                 data : dataStr
					                          }) .done(function (data) { 
					                        	  Urban_Rd_right.setHotspotTop(data);
                                                  Urban_Rd_right.changeTable(currTop_style_obj_id,currTop_htmlValue_id); 
					                          });  
				           //----------------------------------------------------------------------------------------------
				            //  //等待top3,加载完毕,添加tabel
                       });
	             },
	             setHotspotTop:function(data){
	            	 var unit = ""; 
           	         var sortKey=currMenue;
           	         if(sortKey == "下行速率500k"){unit = "Kbps";
                             $("#top_name_one").html(data[0].hotspot);  
                             $("#top_value_one").html(Urban_Rd_right.changeTwoDecimal(data[0]["下行速率500k"])+'<span>&nbsp;'+unit+'</span>');  
                            
                             $("#top_name_two").html(data[1].hotspot);  
                             $("#top_value_two").html(Urban_Rd_right.changeTwoDecimal(data[1]["下行速率500k"])+'<span>&nbsp;'+unit+'</span>');  
                            
                             $("#top_name_three").html(data[2].hotspot);  
                             $("#top_value_three").html(Urban_Rd_right.changeTwoDecimal(data[2]["下行速率500k"])+'<span>&nbsp;'+unit+'</span>');
           	         };
           	         if(sortKey == "总用户数"){unit = "人";
                              $("#top_name_one").html(data[0].hotspot);  
                              $("#top_value_one").html(Urban_Rd_right.changeTwoDecimal(data[0]["总用户数"])+'<span>&nbsp;'+unit+'</span>');  
                             
                              $("#top_name_two").html(data[1].hotspot);  
                              $("#top_value_two").html(Urban_Rd_right.changeTwoDecimal(data[1]["总用户数"])+'<span>&nbsp;'+unit+'</span>');  
                             
                              $("#top_name_three").html(data[2].hotspot);  
                              $("#top_value_three").html(Urban_Rd_right.changeTwoDecimal(data[2]["总用户数"])+'<span>&nbsp;'+unit+'</span>');
           	         };
           	         if(sortKey == "TCP掉线率"){unit = "%";
                                 $("#top_name_one").html(data[0].hotspot);  
                                 $("#top_value_one").html(Urban_Rd_right.changeTwoDecimal(data[0]["TCP掉线率"]*100)+'<span>&nbsp;'+unit+'</span>');  
                                
                                 $("#top_name_two").html(data[1].hotspot);  
                                 $("#top_value_two").html(Urban_Rd_right.changeTwoDecimal(data[1]["TCP掉线率"]*100)+'<span>&nbsp;'+unit+'</span>');  
                                
                                 $("#top_name_three").html(data[2].hotspot);  
                                 $("#top_value_three").html(Urban_Rd_right.changeTwoDecimal(data[2]["TCP掉线率"]*100)+'<span>&nbsp;'+unit+'</span>');
           	        }; 
	             },
	             changeTable : function(obj,id){
                                $(".UR3_box1").removeClass('select_background_pictrue');
                                $("#"+obj).addClass('select_background_pictrue');
                                
                                var loadName = $("#"+id).html();
                                Urban_Rd_right.initTableData(loadName);
                                
                                //刷新用
                                currTop_style_obj_id = obj;
                                currTop_htmlValue_id = id;

	             },
	             initTableData : function(hotspot){
	             	    var sortKey = currMenue;
	             	    var time = new Date();
	             	    time.setMinutes(time.getMinutes()-15); 
	             	    var timeStr = time.format("yyyy-MM-dd hh:mm:ss");
	             	    if(sortKey == "总用户数" || sortKey == "下行速率500k"){
                            var url = eastcom_URL+"/stream/rank/sites-allidrs-time?hotspot="+encodeURIComponent(hotspot)+"&time="+timeStr+"&num=5&sortKey="+encodeURIComponent(sortKey)+"&order=asc"
	             	    };
	             	    if(sortKey == "TCP掉线率"){
	                        var url = eastcom_URL+"/stream/rank/sites-allidrs-time?hotspot="+encodeURIComponent(hotspot)+"&time="+timeStr+"&num=5&sortKey="+encodeURIComponent(sortKey)+"&order=desc"
	             	    };
                        //var url = eastcom_URL+"/stream/rank/sites-allidrs-time?hotspot=""&time=2016-05-21 13:50:44&num=20&sortKey=总用户数&order=asc"
        	    	    $.ajax({
                               type : "get",
                               async : true, //异步执行
                               url : url,
                               data : {},
                               dataType : "json" //返回数据形式为json
                        })
                        .done(function (data) {   

	             	      var htmlStr = "";
	             	      for (var i = 0; i < data.length; i++) {
	             	      	      var row = "list2";
	             	      	      if ((i%2)==0) {row = "list3";}; 
	             	      	      var item = data[i]; 
	             	      	      if(i>4){break;};
			             	      htmlStr += '<li>'
			             	              +       '<div class="l4 '+row+'" style="width:20%">'
										  +         '<a href="javascript:void(0)" title="'+item.name+'">'
										  +         '<div style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:98%;color: white;">'+item.name+'</div></a>'
			             	              +       '</div>'
			             	              +       '<div class="l5 '+row+'" style="width:15%"><p class="txt_number">'+Urban_Rd_right.changeTwoDecimal(item["总用户数"])+'<p></div>'
			             	              //+       '<div class="l4 '+row+'" style="width:20%">'+item.name+'</div>'
			             	              +       '<div class="r4 '+row+'" style="width:15%"><p class="txt_number">'+Urban_Rd_right.changeTwoDecimal((item["4G流量"])/1024)+'<p></div>'
			             	              +       '<div class="l5 '+row+'" style="width:20%"><p class="txt_number">'+Urban_Rd_right.changeTwoDecimal(item["下行速率500k"])+'<p></div>'
			             	              +       '<div class="l5 '+row+'" style="width:15%"><p class="txt_number">'+Urban_Rd_right.changeTwoDecimal(item["TCP掉线率"]*100)+'<p></div>'
			             	              +       '<div class="r5 '+row+'" style="width:15%"><p class="txt_number">'+Urban_Rd_right.changeTwoDecimal(item["4GRRC连接建立成功率"]*100)+'<p></div>'
			             	             // +       '<div class="l6 '+row+'" style="width:10%"></div>'
			             	              + '</li>'
	             	      };

                              $("#table_div_li").html(htmlStr);
                        });
	             },
	             tabChange : function(obj,type){
	            	 		if(this.isPlay()==true) return;
	            	 		
							$("#table_loadSpeed").removeClass('Rselect_bg') ;
							$("#table_user").removeClass('Rselect_bg') ;
							$("#table_lostRate").removeClass('Rselect_bg') ;
							$("#div_loadSpeed").css('display', 'none');
							$("#div_user").css('display', 'none');
							$("#div_lostRate").css('display', 'none');
                           
                           //刷新,获取当前值  
                           currtable_obj_id = obj;
                           currtable_id = type;


                           if(type == "loadSpeed"){
                           	    currMenue = "下行速率500k";
                           	    $("#"+obj).addClass('Rselect_bg');
                           	    $("#div_"+type).css('display', 'block');
                           	    //Urban_Rd_right.initTableData("下行速率500k");
                           	    Urban_Rd_right.initTop("下行速率500k");
                               // Urban_Rd_right.changeTable($("#first_div_top"),"top_name_one");

                           };
                           if(type == "user"){
                           	    currMenue = "总用户数";
                           	    $("#"+obj).addClass('Rselect_bg');
                           	    $("#div_"+type).css('display', 'block');
                           	    //Urban_Rd_right.initTableData("总用户数");
                           	    Urban_Rd_right.initTop("总用户数");
                               // Urban_Rd_right.changeTable($("#first_div_top"),"top_name_one");
                           };
                           if(type == "lostRate"){
                           	    currMenue = "TCP掉线率";
                           	    $("#"+obj).addClass('Rselect_bg');
                           	    $("#div_"+type).css('display', 'block');
                           	    //Urban_Rd_right.initTableData("TCP掉线率");
                           	    Urban_Rd_right.initTop("TCP掉线率");
                               // Urban_Rd_right.changeTable($("#first_div_top"),"top_name_one"); 
                           };
	             },
	             changeTwoDecimal : function(floatvar){
		    	              var f_x = parseFloat(floatvar);
	                          if (isNaN(f_x)){return 0;}
		    	              var f_x = Math.round(floatvar*100)/100; 
		    	              return f_x;
		        },
		        showRegionSelector : function(){
		        	var docWidth=$(document).width();
		        	var docHeight=$(document).height();
		        	var winWidth=500;
		        	var winHeight=600;
		        	var win=new LSMScreen.SimpleWindow({
		        		title:"保障区域",
		        		width:winWidth,
		        		height:winHeight,
		        		x:(docWidth-winWidth)*0.5,
		        		y:(docHeight-winHeight)*0.5,
		        		beforeClose:function(){
		        			
		        		}.bind(this)
		        	});
		        	var tableDom=document.createElement("table");
		        	$(win.content).append(tableDom);
		        	var cols=[
		        	    {colName:'保障区域',name : 'name',index : 'name',width : 500}
		        	];
		        	var opt1={
		        	        datatype : function(){},
		        	        colNames:['保障区域'],
		        	        colModel : cols,
		        	        loadui:'disable',
		        	        afterInsertRow:function(rowid,rowdata){
		        	        	var tr=grid.find("tbody").find("tr")[rowid];
		        	        	$(tr).attr("name",rowdata.id);
		        	        	$(tr).on('click',this.regionClick.bind(this));
		        	        }.bind(this),
		        	        height:winHeight-60
		        		};
		        	
		        	var grid=$(tableDom).jqGrid(opt1);
		        	grid.closest('.ui-jqgrid-view').find('div.ui-jqgrid-hdiv').hide();
		        	var arr=LSMConsts.allAreas;
		        	for(var i=0;i<arr.length;i++){
		        		var record=arr[i];
		        		grid.jqGrid('addRowData', i+1, record);
		        	}
		        },
		        regionClick : function(evt){
		        	var id=$(evt.currentTarget).attr("name");
		        	SUtils.updeteBaseHotspotsById(id,function(){
		        		this.mainHotspot=LSMConsts.hotspots[0];
		        		this.refresh();
		        	}.bind(this));
		        },
		        ctrlBtnClick:function(evt){
		        	if($("#ctrlBtn").hasClass("pause")){
		        		this.stop();
		        	}else if($("#ctrlBtn").hasClass("play")){
		        		this.start();
		        	}
		        },
		        start:function(){
		        	$("#ctrlBtn").removeClass("play");
	        		$("#ctrlBtn").addClass("pause");
	        		this.timeIndex=0;
	        		this.playNext();
		        },
		        stop:function(){
		        	$("#ctrlBtn").removeClass("pause");
	        		$("#ctrlBtn").addClass("play");
                	this.refresh();
		        },
		        isPlay:function(){
		        	return $("#ctrlBtn").hasClass("pause");
		        },
		        playNext:function(){
		        	if(this.isPlay()){
		        		var time=this.timeList[this.timeIndex];
		        		$("#timeShow").html(time);
		        		var date = new Date();
	             	    var dateStr = date.format("yyyy-MM-dd"); 
		        		var dateCompare = new Date();
		        		dateCompare.setDate(dateCompare.getDate()-1); 
		        		var dateCompareStr=dateCompare.format("yyyy-MM-dd");
             	        
		        		var paramTime=dateStr+" "+time+":00";
		        		var paremTimeCompare=dateCompareStr+" "+time+":00";
	                    Urban_Rd_right.initTop(currMenue,paramTime);
	                    Urban_Rd_right.initDataShang(paramTime,paremTimeCompare);
	                    this.timeIndex++;
	                    if(this.timeIndex>=this.timeList.length){
	                    	this.stop();
	                    }else{
	                    	setTimeout(this.playNext.bind(this),2000);
	                    }
		        	}
		        }
};
