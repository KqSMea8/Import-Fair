var excelPrototypeConfig = [];
var metroAddBounce_zhicha = {
	               init : function(){
	            	   metroAddBounce_zhicha.initTime();
                   metroAddBounce_zhicha.loadPortfolioTable();
	            	   metroAddBounce_zhicha.loadPortfolioTableDataPre();
	               },
                   initTime : function(){
                            var date = new Date();
                            var startDay = new Date(date.getTime() - 1*24*60*60*1000); //前一天当前小时
                            $("#timeDay_zhicha").val(startDay.format("yyyy-MM-dd"));  
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
                                
                                $("#timeWeek_zhicha").val(tY+"-"+week);  
                                
                                
                                $('#timeWeek_zhicha').bind('focus',function(){
                                    WdatePicker({isShowWeek:true,errDealMode:3,maxDate:weekToday.format("yyyy-MM-dd"),autoPickDate:true,firstDayOfWeek:1,
                                    onpicked:function() {$dp.$('timeWeek_zhicha').value=$dp.cal.getP('y')+'-'+$dp.cal.getP('W');}
                                })});
                   },
                   doQuery : function(){
                             metroAddBounce_zhicha.loadPortfolioTableDataPre();
                   },
                   changeTimeType : function(id,name){
                            $("div[name = '"+name+"']").find("div").removeClass('customRadioSelected');
                            $("div[name = '"+name+"']").attr('value', "0");
                            $("#"+id).find("div").addClass('customRadioSelected');
                            $("#"+id).attr('value', "1");
                            
                            if (id == "zhicha_day") {
                                $("#timeDay_zhicha").css('display', 'inline-block');    
                                $("#timeWeek_zhicha").css('display', 'none');    
                            }else{
                                $("#timeDay_zhicha").css('display', 'none');    
                                $("#timeWeek_zhicha").css('display', 'inline-block');    
                            };

                             //metroAddBounce_zhicha.loadPortfolioTableDataPre();
                  },
	               loadPortfolioTable : function(){
	               	    console.log("加载质差表格...");
	               	 var colNames=['线路名','取样时间', '小区名', '覆盖区域', '劣化次数'];
                     var colModel=[
                                      {name:'line_name',index:'line_name', width:200,formatter:function(cellVal,options,rowObjs){

                                                      var background = "fff";  
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
                                                      var htmlStr = '<div style="background: #'+background+'; border-radius: 8px; width: 36px; height: 36px; color: white; margin-left: 50%;">'+cellVal_Z+'</div>';
                                                      return htmlStr;
                                         }
                                      },
                                      {name:'time_id',index:'time_id', width:250,},
                                      {name:'cell_name',index:'cell_name', width:370},
                                      {name:'coverage',index:'coverage', width:180},
                                      {name:'bad_hour_num',index:'bad_hour_num', width:200,},
                                  ];
                                  
                                  var headTitle = []; 
                                  for (var i = 0; i < colModel.length; i++) {
                                          headTitle.push(colModel[i].name);
                                  };
                                  excelPrototypeConfig.push(headTitle);
                                  excelPrototypeConfig.push(colNames);

                                            $("#zhichatab5").jqGrid({
                                                datatype: "local",
                                                height:654,
                                                width:1195,
                                                //rowNum:5,
                                                rowList:[10,20,30],
                                                //sortname:'id',
                                                //shrinkToFit:false,  
                                                //autoScroll: true,
                                                colNames:colNames,
                                                colModel:colModel,
                                                scrollOffset:1,
                                                //sortable:true,
                                                viewrecords:true
                                                //caption: "第一个jqGrid例子"
                                            }).navGrid("#zhichapager5",{edit:false,add:false ,del:false});
                                            
	             
	               },
	               loadPortfolioTableDataPre :function(){
	            	    var timeType = "day";
                    var lineType = $("#lineType").val();
                    var lineTypeText = $("#lineType").find("option:selected").text();
	            	    if ($("#zhicha_day").attr('value') == "1"){
                             timeType = "day";   
                        }else if($("#zhicha_week").attr('value') == "1"){
                             timeType = "week";   
                        };
                        var time = $("#timeDay_zhicha").val(); 
                        if (timeType == "day"){
                            time = $("#timeDay_zhicha").val();
                        }else if (timeType == "week"){
                            time = $("#timeWeek_zhicha").val();
                        };
                       
	            	     metroAddBounce_zhicha.loadPortfolioTableData(timeType,time,lineType,lineTypeText);
	               },
	               loadPortfolioTableData : function(timeType,time,lineType,lineTypeText){
                       console.log(timeType +"----"+time+"----"+lineType);
                       var timeArr = FormatDateTimeS(timeType,time);
                       console.log(timeType +"*****"+timeArr[0]+"*****"+timeArr[1]+"*****"+lineType);
                       var urlT = eastcom.baseURL.substring(0,eastcom.baseURL.lastIndexOf("/")) + "/INAS/sml/query/area-line-badcell";
                       //var urlT = "http://10.221.247.7:8080/INAS/sml/query/area-line-badcell";
                       var dataP= {                                                     
                                  "startTime" : timeArr[1],
                                  "endTime" : timeArr[1],
                                  "timeType" : timeType,
                                  "line_metro" : lineType,
                                  "isTopN" : "isTopN"
                            };                                                   
                      var dataPStr=JSON.stringify(dataP); 

                      $("#load_zhichatab5").css('display', 'block');
                      commonAjax(urlT,dataPStr,"post",true,"",function(resT){
                           var mydata = resT.data;  
                         jQuery("#zhichatab5").jqGrid('clearGridData');           
                         for(var i=0;i<=mydata.length;i++){
                             jQuery("#zhichatab5").jqGrid('addRowData',i+1,mydata[i]);
                         };  
                         $("#load_zhichatab5").css('display', 'none');              
                      });
	               },
	               exportData : function(){
                          var timeType = "day";
                          var lineType = $("#lineType").val();
                          var lineTypeText = $("#lineType").find("option:selected").text();
                          if ($("#zhicha_day").attr('value') == "1"){
                                   timeType = "day";   
                              }else if($("#zhicha_week").attr('value') == "1"){
                                   timeType = "week";   
                              };
                              var time = $("#timeDay_zhicha").val(); 
                              if (timeType == "day"){
                                  time = $("#timeDay_zhicha").val();
                              }else if (timeType == "week"){
                                  time = $("#timeWeek_zhicha").val();
                              };
                              var timeArr = FormatDateTimeS(timeType,time);
                            
                            var urlT = eastcom.baseURL.substring(0,eastcom.baseURL.lastIndexOf("/")) + "/INAS/sml/query/area-line-badcell";
                            //var urlT = "http://10.221.247.7:8080/INAS/sml/query/area-line-badcell";
                            var dataP= {                                                     
                                       "startTime" : timeArr[1],
                                       "endTime" : timeArr[1],
                                       "timeType" : timeType,
                                       "line_metro" : "",
                                       "isTopN" : "",
                                 };                                                   
                           var dataPStr=JSON.stringify(dataP); 
                           var excelData = commonAjax(urlT,dataPStr,"post",false,"",function(resT){});

                           var datasArr = [];
                           var dataArr = [];
                           var data = excelData.data;
                           for (var i = 0; i < data.length; i++) {
                               dataArr = [];
                               dataArr.push(data[i].line_name);
                               dataArr.push(data[i].time_id);
                               dataArr.push(data[i].cell_name);
                               dataArr.push(data[i].coverage);
                               dataArr.push(data[i].bad_hour_num);
                               datasArr.push(dataArr);
                           }
                           if (datasArr.length == 0) {
                               dataArr = [];
                               dataArr.push("暂无数据！");
                               dataArr.push("");
                               dataArr.push("");
                               dataArr.push("");
                               dataArr.push("");
                               datasArr.push(dataArr);
                           }
                     var exportParam = {
                                            "type": "xls",
                                            "title": "质差小区TOP排名",
                                            "propertys":excelPrototypeConfig[0],            //["TIMEID", "USER_NAME"],
                                            "heads": excelPrototypeConfig[1],               //["时间", "客户名称"],
                                            "ifId": "",
                                            "datas": datasArr,
                                            "params": {}
                                        };
                   var exportParams = JSON.stringify(exportParam);
                    var exportURL = eastcom.baseURL.substring(0,eastcom.baseURL.lastIndexOf("/")) + "/INAS/sml/export/exportOriginal";
                    //var exportURL = "http://10.221.235.17:8080/INAS/sml/export/exportOriginal";
                    exportAjax(exportURL, exportParams);  

                       
	               }
};
function exportAjax(URL, exportParam) {

                 var myForm = document.createElement("form");
                 myForm.method = "post";
                 myForm.target = "_blank";
                 myForm.acceptCharset = "utf-8";
                 myForm.action = URL;
                 document.body.appendChild(myForm);
                 var newElement = document.createElement("input");
                 newElement.setAttribute("name", "params");
                 newElement.setAttribute("type", "hidden");
                 newElement.setAttribute("value", exportParam);
                 myForm.appendChild(newElement);
                 myForm.submit();
                 document.body.removeChild(myForm);

};