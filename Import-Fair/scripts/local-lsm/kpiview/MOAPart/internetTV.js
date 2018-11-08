var R4D10 = R4D10 || {};
var LOADINGTIME = 500;         //loading时间
var addBigWinOfTime={win:null},addBigWinOfTimeSlot={win:null},addBigWinOfTimeSlotOfjqGrid14={win:null};
var fromWhere = "focus";//权限控制
var allKpisS = "";
var timeparamGol="";
var internetTV = {
    init: function() {
    	var tabletab=['yidong','jiating','zhengqi','xin'];
    	internetTV.initTime();
    	console.log($("#_zhengqi").width());
    	for(var i=0;i<tabletab.length;i++){
    		internetTV.initGrid(tabletab[i]);
    	}
    	var time=$("#timeField_day").val();
    	timeparamGol=time;
    	internetTV.zhiBiaoChengXian(time);
    	internetTV.loadEchartsData(time);
    	
    	internetTV.initGrid1();
    	internetTV.loadDataOneTab(time);
    	$("#queryBtn").click(function(){
    		var time=$("#timeField_day").val();
    		timeparamGol=time;
        	internetTV.zhiBiaoChengXian(time);
        	internetTV.loadEchartsData(time);
        	
        	internetTV.initGrid1();
        	internetTV.loadDataOneTab(time);
    		
    	});
    },
    initTime: function(par) {
        
        	var hour_date = new Date();
            hour_date.setDate(hour_date.getDate()-1);
    		 $("#timeField_day").val(hour_date.format("yyyy-MM-dd"));
        
    },
    changeYewu: function(dom, par) {
        $(dom).siblings().removeClass('chooseTypeLine');
        $(dom).addClass('chooseTypeLine');
        var tabletab=['yidong','jiating','zhengqi','xin'];
        for(var i=0;i<tabletab.length;i++){
        	$("#_"+tabletab[i]).css("display","none");
        }
        $("#_"+par).css("display","block");
        //$("#con_grid_div_"+par).jqGrid("jqGridResize");
        $("#con_grid_div_"+par).jqGrid('setGridWidth',$("#ex").width()-5)
        var ret = $("#con_grid_div_"+par).jqGrid('getRowData','1');
		var obj={
				
				"chall_value":ret.chall_value,
				"country_avg":ret.country_avg,
				"standard_value":ret.standard_value,
				"index_name_en":ret.index_name_en 
		};
		internetTV.loadIndex(obj,timeparamGol);
		
    },
    initGrid1:function(){
    	var  columnName=[];
    	var colModel = [{
            label: '责任中心',
            name: 'pic_center',
            index: 'pic_center',
            align: 'center',
            width:'100',
            sortable: false
        }, {
            label: '责任指标<br>数量',
            name: 'cnt',
            index: 'cnt',
            align: 'center',
            width:'120',
            sortable: false
        }, {
            label: '评分指标<br>数量',
            name: 'is_check_num',
            index: 'is_check_num',
            align: 'center',
            sortable: false,
            width:'110',
            formatter: function(cellvalue) {
                var value = cellvalue == undefined ? "-" : cellvalue;
                return '<span style="">' + value + '</span>'
            }
        }, {
            label: '已达基准值<br>未达挑战值',
            name: 'up_stand_down_chall_num',
            index: 'up_stand_down_chall_num',
            align: 'center',
            width:'110',
            sortable: false,
            formatter: function(cellvalue) {
                var value = cellvalue == undefined ? "-" : cellvalue;
                return '<span style="color:#ffcc66;">' + value + '</span>'
            }
        }, {
            label: '未达基准值',
            name: 'down_stand_num',
            index: 'down_stand_num',
            align: 'center',
            width:'110',
            sortable: false,
            formatter: function(cellvalue) {
                var value = cellvalue == undefined ? "-" : cellvalue;
                return '<span style="color:#ff0000;">' + value + '</span>'
            }
        }
        /*, {
                label: '责任人',
                name: '责任人',
                index: '责任人',
                align: 'center',
                sortable: false
            }*/
    ];
    	
				$("#table0").jqGrid({
						height: 272,  
						rowNum: 8,
						datatype: "local",
						shrinkToFit:true,
						autoScroll: true,
						autowidth: false,
						width:$("#ex").width()-5,
						colModel:colModel,
						sortable:false, 
						sortorder:"desc",
						pager: "#table0_gridPager",
						pgtext : "{0}共{1}页",
						//caption: "第一个jqGrid例子",
						onSelectRow : function(rowid,status){
							
						},
                        gridComplete:function(){
                        	
                        },loadComplete:function(){
                            var grid = $("#table0");
                            var ids = grid.getDataIDs();
                            for (var i = 0; i < ids.length; i++) {
                                grid.setRowData ( ids[i], false, {height: 49} );
                            }},
                        onSelectRow:function(rowid,iRow,iCol,e){
                        	//e.preventDefault();
                        	//alert("233");
                        }
				});	 
				 $("th[id^=table0_]").css('color', '#fff');
				 // $("th[id^=table0_]").css('background', '#8e91ff');
			    
	},
    loadDataOneTab: function(time) {
        //获取2接口数据
        function callback(res) {
            if (res.success) {
                var data = res.data;
                
                var timeStr=time;
                
                var time_id = timeStr.replace(/-/g, '').replace(/:/g, '').replace(/ /g, '') + "00000000000";
                time_id = time_id.substring(0, 12);
                var param = {
                    "time_id": time_id
                };

                function callbackC(resC) {
                    var dataC = resC.data;
                    for (var i = 0; i < data.length; i++) {
                        var currObj = data[i];
                        for (var R = 0; R < dataC.length; R++) {
                            var currSmall = dataC[R];
                            if (currObj.pic_center == currSmall.pic_center) {
                                currObj.up_stand_down_chall_num = currSmall.up_stand_down_chall_num;
                                currObj.down_stand_num = currSmall.down_stand_num;
                                currObj.is_check_num = currSmall.is_check_num;
                            }
                        }
                    };
                   // $("#table0")[0].addJSONData(data);
            		for(var i=0;i<data.length;i++){
            	        jQuery("#table0").jqGrid('addRowData',i+1,data[i]);
            	    };
            	    $("#table0").trigger("reloadGrid");
                };
                $("#table-achieve").mask(" ");
                jQuery("#table0").jqGrid("clearGridData");	
                var urlC = '/sml/query/nei-mng-view_stat_ov-qry';
                commonAjax(urlC, param, 'POST', true, 'table-achieve', callbackC);
            };

        };
        var url = '/sml/query/nei-mng-view_stat_ov_resp-qry';
        commonAjax(url, '', 'POST', false, '', callback);

    },
    initGrid:function(cataId){
    	
    	
    	
    	function formatter (val, opt, obj) {
    		 if (obj.index_type == "正向") {
 	            var kpiVal_hb = val;
 	            if (kpiVal_hb > 0) {
 	                return '<div style="color:green;font-size: 20px;">↑</div>';
 	            };
 	            if (kpiVal_hb < 0) {
 	            	return '<div style="color:red;font-size: 20px;">↓</div>';
 	            };
 	            if (kpiVal_hb == 0) {
 	            	return '<div style="color:blue;font-size: 20px;">→</div>';
 	            };
 	           if (kpiVal_hb == null) {
	                kpiVal_hb = "-";
 	               return  kpiVal_hb;

	            }
 	            if (kpiVal_hb != null) {
 	                kpiVal_hb = kpiVal_hb.toString().replace("-", "");
 	            }

 	        }
 	        if (obj.index_type == "反向") {
 	            var kpiVal_hb = val;
 	            if (kpiVal_hb > 0) {
 	               // arrows = "redArrowsUp"
 	                return '<div style="color:red;font-size: 20px;">↑</div>';
 	            };
 	            if (kpiVal_hb < 0) {
 	                //arrows = "greenArrowsDown"
 	                return '<div style="color:green;font-size: 20px;">↓</div>';
 	            };
 	            if (kpiVal_hb == 0) {
 	               // arrows = "chipingW"
 	            	return '<div style="color:blue;font-size: 20px;">→</div>';
 	            };
 	            if (kpiVal_hb == null) {
 	                kpiVal_hb = "-";
  	               return  kpiVal_hb;

 	            }
 	           if (kpiVal_hb != null) {
	                kpiVal_hb = kpiVal_hb.toString().replace("-", "");

	            }
 	        }
        }
    	
		var columnName=['维度','指标名','指标值','变化趋势','index_type','指标英文名称','指标英文名称1','指标英文名称2','指标英文名称3'];
		var colModel = [
		                	{name: 'dimension_name', index: 'dimension_name', width:'90', align: "center"},
	                        {name: 'index_name', index: 'index_name',width:'100',  align: "center"},
	                        {name: 'index_value', index: 'index_value', width:'80', align: "center"},
	                        {name: 'index_value_hb', index: 'index_value_hb', width:'80', align: "center",formatter:formatter},
	                        {name: 'index_type', index: 'index_type', width:'80', align: "center",hidden:true},
	                        {name: 'index_name_en', index: 'index_name_en', width:'80' ,align: "center",hidden:true},
	                        {name: 'chall_value', index: 'chall_value', width:'80', align: "center",hidden:true},
	                        {name: 'country_avg', index: 'country_avg',  width:'80',align: "center",hidden:true},
	                        {name: 'standard_value', index: 'standard_value', width:'80', align: "center",hidden:true},
	                    ];
		$("#con_grid_div_yidong").jqGrid({
			height: 247,  
			rowNum: 6,
			datatype: "local",
			shrinkToFit:true,
			autoScroll: true,
			autowidth: false,
			width:$("#ex").width()-5,
            //scrollOffset:0,
			colNames: columnName,
			colModel:colModel,
			sortable:false, 
			sortorder:"desc",
			pager: "#con_grid_div_yidonggridPager",
			pgtext : "{0}共{1}页",
			//caption: "第一个jqGrid例子",
			onSelectRow : function(rowid,status){
				
			},
            gridComplete:function(){
            	
            },
            onSelectRow:function(rowid,iRow,iCol,e){
            	//e.preventDefault();
            	//alert("233");
            	var ret = $("#con_grid_div_yidong").jqGrid('getRowData',rowid);
        		var obj={
        				
        				"chall_value":ret.chall_value,
        				"country_avg":ret.country_avg,
        				"standard_value":ret.standard_value,
        				"index_name_en":ret.index_name_en 
        		};
        		internetTV.loadIndex(obj,timeparamGol);
            }
	});	 
		$("#con_grid_div_jiating").jqGrid({
			height: 247,  
			rowNum: 6,
			datatype: "local",
			shrinkToFit:true,
			autoScroll: true,
			autowidth: false,
			width:$("#ex").width()-5,
            //scrollOffset:0,
			colNames: columnName,
			colModel:colModel,
			sortable:false, 
			sortorder:"desc",
			pager: "#con_grid_div_jiatinggridPager",
			pgtext : "{0}共{1}页",
			//caption: "第一个jqGrid例子",
			onSelectRow : function(rowid,status){
				
			},
            gridComplete:function(){
            	
            },
            onSelectRow:function(rowid,iRow,iCol,e){
            	//e.preventDefault();
            	//alert("233");
            	var ret = $("#con_grid_div_jiating").jqGrid('getRowData',rowid);
        		var obj={
        				
        				"chall_value":ret.chall_value,
        				"country_avg":ret.country_avg,
        				"standard_value":ret.standard_value,
        				"index_name_en":ret.index_name_en 
        		};
        		internetTV.loadIndex(obj,timeparamGol);
            }
	});	 $("#con_grid_div_zhengqi").jqGrid({
		height: 247,  
		rowNum: 6,
		datatype: "local",
		shrinkToFit:true,
		autoScroll: true,
		autowidth: false,
		width:$("#ex").width()-5,
        //scrollOffset:0,
		colNames: columnName,
		colModel:colModel,
		sortable:false, 
		sortorder:"desc",
		pager: "#con_grid_div_zhengqigridPager",
		pgtext : "{0}共{1}页",
		//caption: "第一个jqGrid例子",
		onSelectRow : function(rowid,status){
			
		},
        gridComplete:function(){
        	
        },
        onSelectRow:function(rowid,iRow,iCol,e){
        	//e.preventDefault();
        	//e.preventDefault();
        	//alert("233");
        	var ret = $("#con_grid_div_zhengqi").jqGrid('getRowData',rowid);
    		var obj={
    				
    				"chall_value":ret.chall_value,
    				"country_avg":ret.country_avg,
    				"standard_value":ret.standard_value,
    				"index_name_en":ret.index_name_en 
    		};
    		internetTV.loadIndex(obj,timeparamGol);
        }
});	 $("#con_grid_div_xin").jqGrid({
	height: 247,  
	rowNum: 6,
	datatype: "local",
	shrinkToFit:true,
	autoScroll: true,
	autowidth: false,
	width:$("#ex").width()-5,
    //scrollOffset:0,
	colNames: columnName,
	colModel:colModel,
	sortable:false, 
	sortorder:"desc",
	pager: "#con_grid_div_xingridPager",
	pgtext : "{0}共{1}页",
	//caption: "第一个jqGrid例子",
	onSelectRow : function(rowid,status){
		
	},
    gridComplete:function(){
    	
    },
    onSelectRow:function(rowid,iRow,iCol,e){
    	//e.preventDefault();
    	//alert("233");
    	var ret = $("#con_grid_div_xin").jqGrid('getRowData',rowid);
		var obj={
				
				"chall_value":ret.chall_value,
				"country_avg":ret.country_avg,
				"standard_value":ret.standard_value,
				"index_name_en":ret.index_name_en 
		};
		internetTV.loadIndex(obj,timeparamGol);
    }
});	 
				/*$("#con_grid_div_"+cataId).jqGrid({
					height: 250,  
					rowNum: 5,
					datatype: "local",
					shrinkToFit:false,
					autoScroll: true,
					autowidth: true,
                    //scrollOffset:0,
					colModel:colModel,
					colNames: columnName,
					sortable:false, 
					sortorder:"desc",
					pager: "#con_grid_div_"+cataId+"gridPager",
					pgtext : "{0}共{1}页",
					//caption: "第一个jqGrid例子",
					
						height: 250,  
						rowNum: 7,
						datatype: "local",
						shrinkToFit:false,
						autoScroll: true,
						autowidth: true,
	                    //scrollOffset:0,
						colModel:colModel,
						colNames: columnName,
						sortable:false, 
						sortorder:"desc",
						pager: "#con_grid_div_"+cataId+"gridPager",
						pgtext : "{0}共{1}页",
						//caption: "第一个jqGrid例子",
						onSelectRow : function(rowid,status){
	
							var ret = $("#con_grid_div_"+cataId).jqGrid('getRowData',rowid);
							var obj={
									
									"chall_value":ret.chall_value,
									"country_avg":ret.country_avg,
									"standard_value":ret.standard_value,
									"index_name_en":ret.index_name_en 
							};
							internetTV.loadIndex(obj);
						},
                        gridComplete:function(){
                        	
                        },
                        onSelectRow:function(rowid,iRow,iCol,e){
                        	//e.preventDefault();
                        }
				});	 
			    */
			    
	},
	getData:function(cata,data){
		jQuery("#con_grid_div_"+cata).jqGrid("clearGridData");	
		for(var i=0;i<data.length;i++){
	        jQuery("#con_grid_div_"+cata).jqGrid('addRowData',i+1,data[i]);
	    };
	    $("#con_grid_div_"+cata).trigger("reloadGrid");
	    
	},
    //指标呈现
    zhiBiaoChengXian: function(timeparam) {
     
        //获取时间参数
    	var timeType = "day"
        var timeStr = "";
        var timeTypeCn = "日";
        var timeTxt = "";
        var time_id_now_day = "";
        var time_id_last_day = "";
        if (timeType == "day") {
            timeTypeCn = "日";
            
            var time_id=timeparam;
            var timeparam1 = timeparam.replace(/-/g,"/");
    		 timeparam1 = new Date(timeparam1 );
           // var time_id = $("#datetime-picker0").val().replace(/月/g, '');
            //timeTxt = $("#datetime-picker0").val();
            var lastDayDate = timeparam1;
            lastDayDate.setDate(lastDayDate.getDate() - 1);

            time_id_now_day = time_id.replace(/-/g, '').replace(/:/g, '').replace(/ /g, '').replace(/周/g, '') + "000000000000";
            time_id_last_day = lastDayDate.Format("yyyy-MM-dd").replace(/-/g, '').replace(/:/g, '').replace(/ /g, '').replace(/周/g, '') + "000000000000";
            time_id_now_day = time_id_now_day.substring(0, 12);
            time_id_last_day = time_id_last_day.substring(0, 12);
        }
      
        var zerenOrguanzhu = "";
        $("div[name=zerenOrguanzhu]").each(function(index, el) {
            if ($(el).hasClass('chooseTypeLine')) {
                var text = $(el).text();
                if (text.indexOf('责任') > -1) {
                    zerenOrguanzhu = "否";
                }
                if (text.indexOf('关注') > -1) {
                    zerenOrguanzhu = "是";
                }
            };
        });
        //责任中心选择
        var zerenChoose = $("#zerenChoose").val();
        //提升 下降 持平
        var typeChoose = $("#typeChoose").val();

        //
        var stand_chall = $("#stand_chall").val();


        //业务选择  
        var businessChoose = "";
        $("div[name=businessChoose]").each(function(index, el) {
            if ($(el).hasClass('chooseTypeLine')) {
                var text = $(el).text();
                if (text.indexOf('移动') > -1) {
                    businessChoose = "移动业务";
                }
                if (text.indexOf('家庭') > -1) {
                    businessChoose = "家庭业务";
                }
                if (text.indexOf('政企') > -1) {
                    businessChoose = "政企业务";
                }
                if (text.indexOf('新') > -1) {
                    businessChoose = "新业务";
                }
            };
        });
        //获取当前手机号 
        var phoneNum = "";
        //参数汇总
        var param = {
            timeType: timeType, // 时间粒度
            timeStr: timeStr,
            zerenOrguanzhu: zerenOrguanzhu, // 是否关注
            zerenChoose: zerenChoose,
            typeChoose: typeChoose, //状态
            businessChoose: businessChoose, //责任中心 
        }

        //存放时间参数 钻取使用
        _timetype = timeType;
        _time = time_id_now_day;

        if (timeType == "day") {
            param = {
                time_id_now: time_id_now_day,
                time_id_last: time_id_last_day,
                perf_state: typeChoose,
                pic_center: zerenChoose,
                is_focus: "否",
                user_no: "15021394296",
                stand_chall: "all",
                queryType: "select",
                name: $("#index_name").val(),
                user_name:"测试(勿删)"
            }
            console.log(param);
            //天查询
            function callbackDay(resDay) {
                var dataArr = resDay.data;
                var data = [];
                var tabdata={
                		"yidong":[],
                		"jiating":[],
                		"zhengqi":[],
                		"xin":[],
                };
                for (var i = 0; i < dataArr.length; i++) {
                	 var curr = dataArr[i];
                	if("新业务"==curr.service_name){
                		tabdata["xin"].push(curr);
                		
                	}else if("移动业务"==curr.service_name){
                		tabdata["yidong"].push(curr);
                	}else if("政企业务"==curr.service_name){
                		tabdata["zhengqi"].push(curr);
                	}else if("家庭业务"==curr.service_name){
                		tabdata["jiating"].push(curr);
                	}
                }
                allKpisS = data;
                var tabletab=['yidong','jiating','zhengqi','xin'];
            	for(var i=0;i<tabletab.length;i++){
            		internetTV.getData(tabletab[i],tabdata[tabletab[i]]);
            	}
            	var ret = $("#con_grid_div_yidong").jqGrid('getRowData',"1");
            	var obj={
						
						"chall_value":ret.chall_value,
						"country_avg":ret.country_avg,
						"standard_value":ret.standard_value,
						"index_name_en":ret.index_name_en 
				};
        		internetTV.loadIndex(obj,timeparamGol);
            }
            $("#maskDiv").mask("");
            var url = '/sml/query/nei-mine-resp-hb-day';
            commonAjax(url, param, 'POST', true, 'maskDiv', callbackDay);
        };
      
    },
    loadIndex: function(objstatic,timeparam) {
        //获取时间粒度
        var timeType = "day";
        
        //获取时间参数
        var timeStr = "";

        var time_id_now_day = "";
        var time_id_last_day = "";
        if (timeType == "day") {
            var time_id = timeparam;
            var timeparam1 = timeparam.replace(/-/g,"/");
   		 timeparam1 = new Date(timeparam1 );
          // var time_id = $("#datetime-picker0").val().replace(/月/g, '');
           //timeTxt = $("#datetime-picker0").val();
           var lastDayDate = timeparam1;
            lastDayDate.setDate(lastDayDate.getDate() - 7);

            time_id_now_day = time_id.replace(/-/g, '').replace(/:/g, '').replace(/ /g, '').replace(/周/g, '') + "000000000000";
            time_id_last_day = lastDayDate.Format("yyyy-MM-dd").replace(/-/g, '').replace(/:/g, '').replace(/ /g, '').replace(/周/g, '') + "000000000000";
            time_id_now_day = time_id_now_day.substring(0, 12);
            time_id_last_day = time_id_last_day.substring(0, 12);
        }
        if (timeType == "week") {
            var time_id = $("#datetime-picker11v").val();
            time_id = time_id.replace(/-/g, '').replace(/:/g, '').replace(/ /g, '').replace(/周/g, '');

            //time_id_last_day =  (time_id -1).toString();
            time_id_last_day = getlastNumWeek(time_id, 1).toString();

            time_id_now_day = time_id.replace(/-/g, '').replace(/:/g, '').replace(/ /g, '').replace(/周/g, '') + "000000000000";
            time_id_last_day = time_id_last_day.replace(/-/g, '').replace(/:/g, '').replace(/ /g, '').replace(/周/g, '') + "000000000000";
            time_id_now_day = time_id_now_day.substring(0, 12);
            time_id_last_day = time_id_last_day.substring(0, 12);
        }
        if (timeType == "month") {
            //var time_id = $("#datetime-picker2").val() + "-01";
            var time_id = $("#datetime-picker2").val().replace(/月/g, '');
            time_id = time_id + "-01";
            var lastMonthDate = new Date(time_id);
            lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);

            time_id_now_day = time_id.replace(/-/g, '').replace(/:/g, '').replace(/ /g, '').replace(/月/g, '') + "000000000000";
            time_id_last_day = lastMonthDate.Format("yyyy-MM-dd").replace(/-/g, '').replace(/:/g, '').replace(/ /g, '').replace(/月/g, '') + "000000000000";
            time_id_now_day = time_id_now_day.substring(0, 12);
            time_id_last_day = time_id_last_day.substring(0, 12);
        }
        timeStr = timeStr.replace(/-/g, '').replace(/:/g, '').replace(/ /g, '').replace(/周/g, '').replace(/月/g, '') + "000000000000";
        timeStr = timeStr.substring(0, 12);


        //清空静态指标值 
       // kpidetailSelf.clearValue();


        if (timeType == "day") {
            //加载静态属性
            

        	 var paramB = {
                     "startTime": time_id_last_day,
                     "endTime": time_id_now_day,
                     "index_name_en": objstatic.index_name_en,
                      "timeType": "day"
                 };

                 function callbackB(resB) {
                     var dataB = resB.data;
                     var datax = [];
                     var datay = [];
                     var datay1 = [];
                     var datay2 = [];
                     var datay3 = [];
                     var datay4 = [];
                     for (var i = 0; i < dataB.length; i++) {
                         var currPoint = dataB[i];
                         var timeStr = currPoint.time_id;
                         //不带使用
                         //var dataxStr = timeStr.toString().substring(5, 10);
                         //带时间轴使用
                         var dataxStr = timeStr.toString();

                         datax.push(dataxStr);

                         //if (index_name_en == null) {
                         //    datay1.push(0);
                         //} else {
                             datay1.push(currPoint.index_value || 0);
                         //}
                         datay2.push(objstatic.standard_value);
                         datay3.push(objstatic.chall_value);
                         datay4.push(objstatic.country_avg);
                     }
                     datay.push(datay1);
                     datay.push(datay2);
                     datay.push(datay3);
                     datay.push(datay4);
                     internetTV.initChart(datax, datay,timeType);


                 };
                 var urlB = '/sml/query/nei-index-details-drill';
                 commonAjax(urlB, paramB, 'POST', true, '', callbackB);
           
        };
        if (timeType == "week") {
            //加载静态属性
            var paramA = {
                "index_name": kpiId,
                "service_name": businessChoose,
                "dimension_name": cata
            };

            function callbackA(resA) {
                if (resA.success) {
                    var dataA = resA.data[0];
                    var index_name_en = dataA.index_name_en //指标英文名
                    var data_source = dataA.data_source || "" //数据来源
                    var index_def = dataA.index_def || "" //指标定义
                    var standard_value = dataA.standard_value //基准值
                    var chall_value = dataA.chall_value //挑战值
                    
                    var country_min = dataA.country_min || "" //全国最低值
                    var country_max = dataA.country_max || "" //全国最高值
                    var country_avg = dataA.country_avg || "" //全国均值
                    var last_period_value = dataA.last_period_value || "" //上期通报值

                    var is_check = dataA.is_check || "" //是否考察

                    $("#data_source").text(data_source);
                    $("#index_def").text(index_def);
                    $("#standard_value").text(standard_value == null?"":standard_value);
                    $("#chall_value").text(chall_value == null?"":chall_value);
                    $("#country_min").text(country_min);
                    $("#country_max").text(country_max);
                    $("#country_avg").text(country_avg);
                    $("#last_period_value").text(last_period_value);
                    $("#is_check").text(is_check);

                    var paramB = {
                        "startTime": time_id_last_day,
                        "endTime": time_id_now_day,
                        "index_name_en": index_name_en,
                        "timeType": "week"
                    };

                    function callbackB(resB) {
                        var dataB = resB.data;
                        var datax = [];
                        var datay = [];
                        var datay1 = [];
                        var datay2 = [];
                        var datay3 = [];
                        var datay4 = [];
                        for (var i = 0; i < dataB.length; i++) {
                            var currPoint = dataB[i];
                            var timeStr = currPoint.time_id;
                            //var dataxStr = timeStr.toString().substring(4,5) + "-" + timeStr.toString().substring(5,8);
                            datax.push(timeStr);

                            datay1.push(currPoint.index_value || 0);
                            datay2.push(standard_value);
                            datay3.push(chall_value);
                            datay4.push(country_avg);
                        }
                        datay.push(datay1);
                        datay.push(datay2);
                        datay.push(datay3);
                        datay.push(datay4);
                        internetTV.initChart(datax, datay,timeType);
                    };
                    var urlB = '/sml/query/nei-index-details-drill';
                    commonAjax(urlB, paramB, 'POST', true, '', callbackB);

                };
            };
            var urlA = '/sml/query/nei-index-details-static-values';
            commonAjax(urlA, paramA, 'POST', true, '', callbackA);
        };
        if (timeType == "month") {
            //加载静态属性
            var paramA = {
                "index_name": kpiId,
                "service_name": businessChoose,
                "dimension_name": cata
            };

            function callbackA(resA) {
                if (resA.success) {
                    var dataA = resA.data[0];
                    var index_name_en = dataA.index_name_en //指标英文名
                    var data_source = dataA.data_source || "" //数据来源
                    var index_def = dataA.index_def || "" //指标定义
                    var standard_value = dataA.standard_value //基准值
                    var chall_value = dataA.chall_value //挑战值
                    
                    var country_min = dataA.country_min || "" //全国最低值
                    var country_max = dataA.country_max || "" //全国最高值
                    var country_avg = dataA.country_avg || "" //全国均值
                    var last_period_value = dataA.last_period_value || "" //上期通报值

                    var is_check = dataA.is_check || "" //是否考察
                   $("#data_source").text(data_source);
                   $("#index_def").text(index_def);
                   $("#standard_value").text(standard_value);
                   $("#standard_value").text(standard_value == null?"":standard_value);
                    $("#chall_value").text(chall_value == null?"":chall_value);
                   $("#country_min").text(country_min);
                   $("#country_max").text(country_max);
                   $("#country_avg").text(country_avg);
                   $("#last_period_value").text(last_period_value);
                   $("#is_check").text(is_check);

                    var paramB = {
                        "startTime": time_id_last_day,
                        "endTime": time_id_now_day,
                        "index_name_en": index_name_en,
                        "timeType": "month"
                    };

                    function callbackB(resB) {
                        var dataB = resB.data;
                        var datax = [];
                        var datay = [];
                        var datay1 = [];
                        var datay2 = [];
                        var datay3 = [];
                        var datay4 = [];
                        for (var i = 0; i < dataB.length; i++) {
                            var currPoint = dataB[i];
                            var timeStr = currPoint.time_id;
                            //var dataxStr = timeStr.toString().substring(4,5) + "-" + timeStr.toString().substring(5,8);
                            datax.push(timeStr);

                            datay1.push(currPoint.index_value || 0);
                            datay2.push(standard_value);
                            datay3.push(chall_value);
                            datay4.push(country_avg);
                        }
                        datay.push(datay1);
                        datay.push(datay2);
                        datay.push(datay3);
                        datay.push(datay4);
                        internetTV.initChart(datax, datay,timeType);
                    };
                    var urlB = '/sml/query/nei-index-details-drill';
                    commonAjax(urlB, paramB, 'POST', true, '', callbackB);

                };
            };
            var urlA = '/sml/query/nei-index-details-static-values';
            commonAjax(urlA, paramA, 'POST', true, '', callbackA);
        }

       // kpidetailSelf.setSubscribeBtnState(is_focus, false);
    },
    changeEcharts: function(dom) {
        $(dom).siblings().removeClass('chooseTypeLine');
        $(dom).addClass('chooseTypeLine');
        //查询
        //切换趋势图
        internetTV.loadEchartsData()
    },
    loadEchartsData: function() {
        //获取时间粒度
        var timeType = "day";
       
        //
        var queryType = "";
        /*var datax = ['2018-07-01', '2018-07-02', '2018-07-03'];
        var datay = [
            [4, 5, 7],
            [5, 4, 7],
            [4, 8, 4],
            [1, 5, 9]
        ]*/
        $("div[name=zerenOrguanzhu]").each(function(index, el) {
            if ($(el).hasClass('chooseTypeLine')) {
                queryType = $(el).attr('values');
            };
        });
        var param = {
            "timeType": timeType, // day|week|month  都可以
            "queryType": queryType
        }

        function callback(res) {
            var data = res.data;
            var datax = [];
            var datay = [];
            var datay1 = [];
            var datay2 = [];
            var datay3 = [];
            var datay4 = [];

            /*if (index_name_en == null) {
                                datay1.push(0);
                            } else {
                                datay1.push(currPoint[index_name_en.toLowerCase()] || 0);
                            }*/

            for (var i = 0; i < data.length; i++) {
                var currPoint = data[i];
                var timeStr = currPoint.time_id;
                var dataxStr = timeStr.toString();
                datax.push(dataxStr);

                if (currPoint.yidong == null) {
                    datay1.push(0);
                } else {
                    datay1.push(currPoint.yidong);
                }

                if (currPoint.jiating == null) {
                    datay2.push(0);
                } else {
                    datay2.push(currPoint.jiating);
                }

                if (currPoint.zhengqi == null) {
                    datay3.push(0);
                } else {
                    datay3.push(currPoint.zhengqi);
                }

                if (currPoint.xin == null) {
                    datay4.push(0);
                } else {
                    datay4.push(currPoint.xin);
                }
            }

            datay.push(datay1);
            datay.push(datay2);
            datay.push(datay3);
            datay.push(datay4);


            internetTV.initChart03(datax, datay, timeType);

        };
        var url = '/sml/query/nei-report-trend';
        commonAjax(url, param, 'POST', true, '', callback);
    },

};

//带时间轴
internetTV.initChart = function(datax, datay, timeType) {
    var timeArr = [];

//    this.chart = echarts.init($('#chart')[0], 'macarons');
//    echObjects.chartId = this.chart;

    //获取最大最小值
    var max = 100;
    var min = 0;

    var arr1 = datay[0];
    var arr2 = datay[1];
    var arr3 = datay[2];

   // $("#echartsValueOfMax").text("-");
    //$("#echartsValueOfMax").text((arr1[arr1.length - 1]) == "" ? "0" : arr1[arr1.length - 1]);


    var prePoint = "";
    var option = {
        title: {
            //text : '时间坐标折线图',
            //subtext : 'dataZoom支持'
        },
        tooltip: {
            trigger: 'item',
        },
        toolbox: {
            show: false,
            feature: {
                mark: {
                    show: true
                },
                dataView: {
                    show: true,
                    readOnly: false
                },
                restore: {
                    show: true
                },
                saveAsImage: {
                    show: true
                }
            }
        },
        dataZoom: {
            show: true,
            start: 50,
            showDetail:false
        },
        legend: {
            data: ['指标值', '基准值', '挑战值', '全国均值'],
            y:'280',
            x:'center',
            padding: 2,
            textStyle: {
                color: LSMScreen.CHARTCONFIG.xAxisLabelColor,
                fontSize: LSMScreen.CHARTCONFIG.axisLabelSize * 0.5
            },
        },
        grid: { //调节图标的位置,宽高,与父元素的边距

        	 x: "12%", //图表左上角的坐标
             y: "5%",
             x2: "11%", // 图表右下角的坐标
             y2: 100,
             borderColor:LSMScreen.CHARTCONFIG.xAxisColor,
            //width: "90%",
        },
        xAxis: [{
            type: 'time',
            splitNumber: 4,
            axisLabel: {
                textStyle: {
                    color:LSMScreen.CHARTCONFIG.xAxisLabelColor,
                    fontSize: 12
                }
            },axisLine: {
                lineStyle: {
                    color: "#078ceb",
                    width: 2,
                    type: 'solid'
                }
            },splitLine: {
                show:true,
                lineStyle: {
                    color: LSMScreen.CHARTCONFIG.xAxisColor,
                    width: 1,
                    type: 'solid'
                }
            },splitArea : {show : false}
        }
        ],
        yAxis: [{
            type: 'value',
            axisLabel: {
                textStyle: {
                    color: LSMScreen.CHARTCONFIG.xAxisLabelColor,
                    fontSize: 12
                }
            },
            axisLine: {
                lineStyle: {
                    color: "#078ceb",
                    width: 2,
                    type: 'solid'
                }
            },
            splitLine: {
                show:true,
                lineStyle: {
                    color: LSMScreen.CHARTCONFIG.xAxisColor,
                    width: 1,
                    type: 'solid'
                }
            },splitArea : {show : false}
        }],
        series: [{
            name: 'series1',
            type: 'line',
            showAllSymbol: true,
            /*symbolSize: function (value){
                return Math.round(value[2]/10) + 2;
            },*/
            data: []
        }]
    };


    var tooltip, xAxisAxisLabel, seriesData1, seriesData2, seriesData3, seriesData4;
    var series = [];
    if (timeType == "day") {
        tooltip = {
            trigger: 'item',
            formatter: function(params) {   //params.dataIndex
                var date = new Date(params.value[0]);
                var time = date.Format("yyyy-MM-dd");
                var index = timeArr.indexOf(time);


                data = date.getFullYear() + '-' +
                    (date.getMonth() + 1) + '-' +
                    date.getDate()
                return data + '<br/>' +
                    //params[0] + ":" + params.value[1]
                    "指标值:"+datay[0][index] + "</br/>" + 
                    "基准值:"+datay[1][index] + "</br/>" +
                    "挑战值:"+datay[2][index] + "</br/>" +
                    "全国均值:"+datay[3][index] + "</br/>";

            }
        };
        xAxisAxisLabel = {
            formatter: function(val) {
                var time = val.Format('yyyy-MM-dd')
                //if (time == prePoint || time.indexOf("1970-01") > -1 || time.indexOf("1981-01") > -1 || time.indexOf("1991-01") > -1 || time.indexOf("2001-01") > -1 || time.indexOf("2011-01") > -1) {
                if (time == prePoint || time<"2018") {
                    prePoint = time;
                    return "";
                } else {
                    prePoint = time;
                    return time;
                }
            },
            textStyle: {
                color:LSMScreen.CHARTCONFIG.xAxisLabelColor,
                fontSize: 12
            },
        };
        seriesData1 = (function() {
            var d = [];
            for (var i = 0; i < datax.length; i++) {
                var arr = [];
                var currObj = datax[i];

                var timeStr = currObj
                var year = timeStr.substring(0, 4);
                var month = parseInt(timeStr.substring(5, 7)) -1;
                var day = timeStr.substring(8, 10);

                var time = new Date(year, month, day, 0, 0);

                var date = time.Format("yyyy-MM-dd");
                timeArr.push(date);

                arr.push(time);
                arr.push(datay[0][i]);
                //arr.push(datay[1][i]);
                //arr.push(datay[2][i]);
                //arr.push(datay[3][i]);

                d.push(arr);
            }
            return d;
        })()
        seriesData2 = (function() {
            var d = [];
            for (var i = 0; i < datax.length; i++) {
                var arr = [];
                var currObj = datax[i];

                var timeStr = currObj
                var year = timeStr.substring(0, 4);
                var month = parseInt(timeStr.substring(5, 7)) -1;
                var day = timeStr.substring(8, 10);

                var time = new Date(year, month, day, 0, 0);

                arr.push(time);
                //arr.push(datay[0][i]);
                arr.push(datay[1][i]);
                //arr.push(datay[2][i]);
                //arr.push(datay[3][i]);

                d.push(arr);
            }
            return d;
        })()
        seriesData3 = (function() {
            var d = [];
            for (var i = 0; i < datax.length; i++) {
                var arr = [];
                var currObj = datax[i];

                var timeStr = currObj
                var year = timeStr.substring(0, 4);
                var month = parseInt(timeStr.substring(5, 7)) -1;
                var day = timeStr.substring(8, 10);

                var time = new Date(year, month, day, 0, 0);

                arr.push(time);
                //arr.push(datay[0][i]);
                //arr.push(datay[1][i]);
                arr.push(datay[2][i]);
                //arr.push(datay[3][i]);

                d.push(arr);
            }
            return d;
        })()
        seriesData4 = (function() {
            var d = [];
            for (var i = 0; i < datax.length; i++) {
                var arr = [];
                var currObj = datax[i];

                var timeStr = currObj
                var year = timeStr.substring(0, 4);
                var month = parseInt(timeStr.substring(5, 7)) -1;
                var day = timeStr.substring(8, 10);

                var time = new Date(year, month, day, 0, 0);

                arr.push(time);
                //arr.push(datay[0][i]);
                //arr.push(datay[1][i]);
                //arr.push(datay[2][i]);
                arr.push(datay[3][i]);

                d.push(arr);
            }
            return d;
        })()
    }

    var series1 = {
        name: '指标值',
        type: 'line',
        showAllSymbol: true,
        /*symbolSize: function (value){
            return Math.round(value[2]/10) + 2;
        },*/
        data: seriesData1
    }
    var series2 = {
        name: '基准值',
        type: 'line',
        showAllSymbol: true,
        /*symbolSize: function (value){
            return Math.round(value[2]/10) + 2;
        },*/
        data: seriesData2
    }
    var series3 = {
        name: '挑战值',
        type: 'line',
        showAllSymbol: true,
        /*symbolSize: function (value){
            return Math.round(value[2]/10) + 2;
        },*/
        data: seriesData3
    }
    var series4 = {
        name: '全国均值',
        type: 'line',
        showAllSymbol: true,
        /*symbolSize: function (value){
            return Math.round(value[2]/10) + 2;
        },*/
        data: seriesData4
    }


    series.push(series1);
    series.push(series2);
    series.push(series3);
    series.push(series4);



    option.tooltip = tooltip;
    option.xAxis[0].axisLabel = xAxisAxisLabel;
    option.series = series;

    eastcom_echarts_drawChart.init("echarts02",option);
};



internetTV.initChart03 = function(datax, datay, timeType) {
    var timeArr = [];


    //this.chart.on(echarts.config.EVENT.DBLCLICK, reportSelf.clickeConsole);
    

    //获取最大最小值
    var max = 100;
    var min = 0;

    var arr1 = datay[0];
    var arr2 = datay[1];
    var arr3 = datay[2];

    var arr1max = eval("Math.max(" + arr1.toString() + ")");
    var arr1min = eval("Math.min(" + arr1.toString() + ")");

    var arr2max = eval("Math.max(" + arr2.toString() + ")");
    var arr2min = eval("Math.min(" + arr2.toString() + ")");

    var arr3max = eval("Math.max(" + arr3.toString() + ")");
    var arr3min = eval("Math.min(" + arr3.toString() + ")");

    var newMax = [];
    newMax.push(arr1max);
    newMax.push(arr2max);
    newMax.push(arr3max);

    var newMin = [];
    newMin.push(arr1min);
    newMin.push(arr2min);
    newMin.push(arr3min);


    max = eval("Math.max(" + newMax.toString() + ")");
    min = eval("Math.min(" + newMin.toString() + ")");

    max = parseInt(max) + 5;
    max = max > 100 ? 100 : max;


    if ((parseInt(min) > 0 || parseInt(min) == 0) && (parseInt(min) - 5) < 0) {
        min = 0;
    } else {
        min = parseInt(min) - 5;
    }
    //min = min < 0?0:min;



    $("#echartsValueOfMax").text((arr1[arr1.length - 1]) == "" ? "0" : arr1[arr1.length - 1]);


    var prePoint = "";
    var option = {
        title: {
            //text : '时间坐标折线图',
            //subtext : 'dataZoom支持'
        },
        tooltip: {
            trigger: 'item',
            /*formatter: function(params) {
                var date = new Date(params.value[0]);
                data = date.getFullYear() + '-' +
                    (date.getMonth() + 1) + '-' +
                    date.getDate() + ' ' +
                    date.getHours() + ':' +
                    date.getMinutes();
                return data + '<br/>' +
                    params.value[1] + ', ' +
                    params.value[2];
            }*/
        },
        toolbox: {
            show: false,
            feature: {
                mark: {
                    show: true
                },
                dataView: {
                    show: true,
                    readOnly: false
                },
                restore: {
                    show: true
                },
                saveAsImage: {
                    show: true
                }
            }
        },
        calculable: false,
        dataZoom: {
            show: true,
            start: 50,
            showDetail: false
        },
        legend: {
            y: '258',
            data: ['移动业务', '家庭业务', '政企业务', '新业务'],
            textStyle: {
                color: LSMScreen.CHARTCONFIG.xAxisLabelColor,
                fontSize: LSMScreen.CHARTCONFIG.axisLabelSize * 0.5
            },
        },
        grid: { //调节图标的位置,宽高,与父元素的边距
        	 x: "12%", //图表左上角的坐标
             y: "5%",
             x2: "11%", // 图表右下角的坐标
             y2: 100,
            //width: "90%",
             borderColor:LSMScreen.CHARTCONFIG.xAxisColor,

        },
        xAxis: [{
            type: 'time',
            splitNumber: 4,
            axisLabel: {
                textStyle: {
                	color: 'red',
                    fontSize: 12
                }
            },axisLine: {
                lineStyle: {
                    color: "#078ceb",
                    width: 2,
                    type: 'solid'
                }
        },splitArea : {show : false},splitLine: {
            show:false,
            lineStyle: {
                color: LSMScreen.CHARTCONFIG.xAxisColor,
                width: 1,
                type: 'solid'
            }
        }}],
        yAxis: [{
            type: 'value',
            axisLabel: {
                textStyle: {
                    color:LSMScreen.CHARTCONFIG.xAxisLabelColor,
                    fontSize: 12
                }
            },axisLine: {
                lineStyle: {
                    color: "#078ceb",
                    width: 2,
                    type: 'solid'
                }
        },splitLine: {
            show:true,
            lineStyle: {
                color: LSMScreen.CHARTCONFIG.xAxisColor,
                width: 1,
                type: 'solid'
            }
        },splitArea : {show : false}}],
        series: [{
            name: 'series1',
            type: 'line',
            showAllSymbol: true,
            /*symbolSize: function (value){
                return Math.round(value[2]/10) + 2;
            },*/
            data: []
        }]
    };


    var tooltip, xAxisAxisLabel, seriesData1, seriesData2, seriesData3, seriesData4;
    var series = [];
    if (timeType == "day") {
        tooltip = {
            trigger: 'item',
            formatter: function(params) { //params.dataIndex
                var date = new Date(params.value[0]);
                var time = date.Format("yyyy-MM-dd");
                var index = timeArr.indexOf(time);


                data = date.getFullYear() + '-' +
                    (date.getMonth() + 1) + '-' +
                    date.getDate()
                return data + '<br/>' +
                    //params[0] + ":" + params.value[1]
                    "移动业务:" + datay[0][index] + "</br>" +
                    "家庭业务:" + datay[1][index] + "</br>" +
                    "政企业务:" + datay[2][index] + "</br>" +
                    "新业务:" + datay[3][index] + "</br>";

            }
        };
        xAxisAxisLabel = {
            formatter: function(val) {
                var time = val.Format('yyyy-MM-dd')
                //if (time == prePoint || time.indexOf("1970-01") > -1 || time.indexOf("1981-01") > -1 || time.indexOf("1991-01") > -1 || time.indexOf("2001-01") > -1 || time.indexOf("2011-01") > -1) {
                if (time == prePoint || time < "2018") {
                    prePoint = time;
                    return "";
                } else {
                    prePoint = time;
                    return time;
                }
            },
            textStyle: {
                color:LSMScreen.CHARTCONFIG.xAxisLabelColor,
                fontSize: 12
            }
        };
        seriesData1 = (function() {
            var d = [];
            for (var i = 0; i < datax.length; i++) {
                var arr = [];
                var currObj = datax[i];

                var timeStr = currObj
                var year = timeStr.substring(0, 4);
                var month = parseInt(timeStr.substring(5, 7)) - 1;
                var day = timeStr.substring(8, 10);

                var time = new Date(year, month, day, 0, 0);

                var date = time.Format("yyyy-MM-dd");
                timeArr.push(date);

                arr.push(time);
                arr.push(datay[0][i]);
                //arr.push(datay[1][i]);
                //arr.push(datay[2][i]);
                //arr.push(datay[3][i]);

                d.push(arr);
            }
            return d;
        })()
        seriesData2 = (function() {
            var d = [];
            for (var i = 0; i < datax.length; i++) {
                var arr = [];
                var currObj = datax[i];

                var timeStr = currObj
                var year = timeStr.substring(0, 4);
                var month = parseInt(timeStr.substring(5, 7)) - 1;
                var day = timeStr.substring(8, 10);

                var time = new Date(year, month, day, 0, 0);

                arr.push(time);
                //arr.push(datay[0][i]);
                arr.push(datay[1][i]);
                //arr.push(datay[2][i]);
                //arr.push(datay[3][i]);

                d.push(arr);
            }
            return d;
        })()
        seriesData3 = (function() {
            var d = [];
            for (var i = 0; i < datax.length; i++) {
                var arr = [];
                var currObj = datax[i];

                var timeStr = currObj
                var year = timeStr.substring(0, 4);
                var month = parseInt(timeStr.substring(5, 7)) - 1;
                var day = timeStr.substring(8, 10);

                var time = new Date(year, month, day, 0, 0);

                arr.push(time);
                //arr.push(datay[0][i]);
                //arr.push(datay[1][i]);
                arr.push(datay[2][i]);
                //arr.push(datay[3][i]);

                d.push(arr);
            }
            return d;
        })()
        seriesData4 = (function() {
            var d = [];
            for (var i = 0; i < datax.length; i++) {
                var arr = [];
                var currObj = datax[i];

                var timeStr = currObj
                var year = timeStr.substring(0, 4);
                var month = parseInt(timeStr.substring(5, 7)) - 1;
                var day = timeStr.substring(8, 10);

                var time = new Date(year, month, day, 0, 0);

                arr.push(time);
                //arr.push(datay[0][i]);
                //arr.push(datay[1][i]);
                //arr.push(datay[2][i]);
                arr.push(datay[3][i]);

                d.push(arr);
            }
            return d;
        })()
    }
    if (timeType == "week") {
        tooltip = {
            trigger: 'item',
            formatter: function(params) {
                var date = new Date(params.value[0]);

                var time = date.Format("yyyy-MM-dd");
                var index = timeArr.indexOf(time);

                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var day = date.getDate();

                var weekOfNum = getYearWeek(year, month, day);

                data = date.getFullYear() + '-' +
                    weekOfNum + "周";
                return data + '<br/>' +
                    //params[0] + ":" + params.value[1];
                    "移动业务:" + datay[0][index] + "</br>" +
                    "家庭业务:" + datay[1][index] + "</br>" +
                    "政企业务:" + datay[2][index] + "</br>" +
                    "新业务:" + datay[3][index] + "</br>";
            }
        };
        xAxisAxisLabel = {
            formatter: function(val) {
                //console.log(val);
                var date = val;

                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var day = date.getDate();
                var weekOfNum = getYearWeek(year, month, day);

                var time = year + "-" + weekOfNum + "周"
                //if (time == prePoint || time.indexOf("1970-1") > -1 || time.indexOf("1981-1") > -1 || time.indexOf("1987-1") > -1 || time.indexOf("1991-1") > -1 || time.indexOf("2001-1") > -1 || time.indexOf("2003-1") > -1 || time.indexOf("2011-1") > -1) {
                if (time == prePoint || time < "2018") {
                    prePoint = time;
                    return "";
                } else {
                    prePoint = time;
                    return time;
                }
                //return val;
            },
            textStyle: {
                color:LSMScreen.CHARTCONFIG.xAxisLabelColor,
                fontSize: 12
            }
        };
        seriesData1 = (function() {
            var d = [];
            for (var i = 0; i < datax.length; i++) {
                var arr = [];
                var currObj = datax[i];
                var timeStr = currObj
                var year = timeStr.substring(0, 4);
                var week = timeStr.substring(5, 7);
                var starDate = getDateRange(year, week);

                var time = new Date(starDate);
                var date = time.Format("yyyy-MM-dd");
                timeArr.push(date);
                //console.log(time.Format("yyyy-MM-dd hh:mm:ss S"));
                arr.push(time)
                arr.push(datay[0][i]);
                d.push(arr);
            }
            return d;
        })()
        seriesData2 = (function() {
            var d = [];
            for (var i = 0; i < datax.length; i++) {
                var arr = [];
                var currObj = datax[i];
                var timeStr = currObj
                var year = timeStr.substring(0, 4);
                var week = timeStr.substring(5, 7);
                var starDate = getDateRange(year, week);

                var time = new Date(starDate);
                //console.log(time.Format("yyyy-MM-dd hh:mm:ss S"));
                arr.push(time)
                arr.push(datay[1][i]);
                d.push(arr);
            }
            return d;
        })()
        seriesData3 = (function() {
            var d = [];
            for (var i = 0; i < datax.length; i++) {
                var arr = [];
                var currObj = datax[i];
                var timeStr = currObj
                var year = timeStr.substring(0, 4);
                var week = timeStr.substring(5, 7);
                var starDate = getDateRange(year, week);

                var time = new Date(starDate);
                //console.log(time.Format("yyyy-MM-dd hh:mm:ss S"));
                arr.push(time)
                arr.push(datay[2][i]);
                d.push(arr);
            }
            return d;
        })()
        seriesData4 = (function() {
            var d = [];
            for (var i = 0; i < datax.length; i++) {
                var arr = [];
                var currObj = datax[i];
                var timeStr = currObj
                var year = timeStr.substring(0, 4);
                var week = timeStr.substring(5, 7);
                var starDate = getDateRange(year, week);

                var time = new Date(starDate);
                //console.log(time.Format("yyyy-MM-dd hh:mm:ss S"));
                arr.push(time)
                arr.push(datay[3][i]);
                d.push(arr);
            }
            return d;
        })()
    }
    if (timeType == "month") {
        tooltip = {
            trigger: 'item',
            formatter: function(params) {
                var date = new Date(params.value[0]);
                var time = date.Format("yyyy-MM-dd");
                var index = timeArr.indexOf(time);
                data = date.getFullYear() + '-' +
                    (date.getMonth() + 1)
                return data + '<br/>' +
                    //params[0] + ":" + params.value[1];
                    "移动业务:" + datay[0][index] + "</br>" +
                    "家庭业务:" + datay[1][index] + "</br>" +
                    "政企业务:" + datay[2][index] + "</br>" +
                    "新业务:" + datay[3][index] + "</br>";
            }
        };
        xAxisAxisLabel = {
            formatter: function(val) {
                //console.log(val);
                var time = val.Format('yyyy-MM')
                //if (time == prePoint || time.indexOf("1970-01") > -1 || time.indexOf("1981-01") > -1 || time.indexOf("1991-01") > -1 || time.indexOf("2001-01") > -1 || time.indexOf("2011-01") > -1) {
                if (time == prePoint || time < "2018") {
                    prePoint = time;
                    return "";
                } else {
                    prePoint = time;
                    return time;
                }
                //return val;
            }
        };
        seriesData1 = (function() {
            var d = [];
            for (var i = 0; i < datax.length; i++) {
                var arr = [];
                var currObj = datax[i];

                var timeStr = currObj
                var year = timeStr.substring(0, 4);
                var month = timeStr.substring(5, 7);
                var day = timeStr.substring(8, 10);

                var time = new Date(year, month - 1, 01, 0, 0);
                //console.log(time.Format("yyyy-MM-dd hh:mm:ss S"));

                var date = time.Format("yyyy-MM-dd");
                timeArr.push(date);

                arr.push(time)
                arr.push(datay[0][i]);

                d.push(arr);
            }

            return d;
        })()
        seriesData2 = (function() {
            var d = [];
            for (var i = 0; i < datax.length; i++) {
                var arr = [];
                var currObj = datax[i];

                var timeStr = currObj
                var year = timeStr.substring(0, 4);
                var month = timeStr.substring(5, 7);
                var day = timeStr.substring(8, 10);

                var time = new Date(year, month - 1, 01, 0, 0);
                //console.log(time.Format("yyyy-MM-dd hh:mm:ss S"));

                arr.push(time)
                arr.push(datay[1][i]);

                d.push(arr);
            }

            return d;
        })()
        seriesData3 = (function() {
            var d = [];
            for (var i = 0; i < datax.length; i++) {
                var arr = [];
                var currObj = datax[i];

                var timeStr = currObj
                var year = timeStr.substring(0, 4);
                var month = timeStr.substring(5, 7);
                var day = timeStr.substring(8, 10);

                var time = new Date(year, month - 1, 01, 0, 0);
                //console.log(time.Format("yyyy-MM-dd hh:mm:ss S"));

                arr.push(time)
                arr.push(datay[2][i]);

                d.push(arr);
            }

            return d;
        })()
        seriesData4 = (function() {
            var d = [];
            for (var i = 0; i < datax.length; i++) {
                var arr = [];
                var currObj = datax[i];

                var timeStr = currObj
                var year = timeStr.substring(0, 4);
                var month = timeStr.substring(5, 7);
                var day = timeStr.substring(8, 10);

                var time = new Date(year, month - 1, 01, 0, 0);
                //console.log(time.Format("yyyy-MM-dd hh:mm:ss S"));

                arr.push(time)
                arr.push(datay[3][i]);

                d.push(arr);
            }

            return d;
        })()
    }

    var series1 = {
        name: '移动业务',
        type: 'line',
        showAllSymbol: true,
        /*symbolSize: function (value){
            return Math.round(value[2]/10) + 2;
        },*/
        data: seriesData1
    }
    var series2 = {
        name: '家庭业务',
        type: 'line',
        showAllSymbol: true,
        /*symbolSize: function (value){
            return Math.round(value[2]/10) + 2;
        },*/
        data: seriesData2
    }
    var series3 = {
        name: '政企业务',
        type: 'line',
        showAllSymbol: true,
        /*symbolSize: function (value){
            return Math.round(value[2]/10) + 2;
        },*/
        data: seriesData3
    }
    var series4 = {
        name: '新业务',
        type: 'line',
        showAllSymbol: true,
        /*symbolSize: function (value){
            return Math.round(value[2]/10) + 2;
        },*/
        data: seriesData4
    }


    series.push(series1);
    series.push(series2);
    series.push(series3);
    series.push(series4);



    option.tooltip = tooltip;
    option.xAxis[0].axisLabel = xAxisAxisLabel;
    option.series = series;

    eastcom_echarts_drawChart.init("chart",option);
};


//越限对象名输入框回车方法
function getKey () {
	if(event.keyCode==13){  
		internetTV.zhiBiaoChengXian(timeparamGol);
    } 
}

