var objGol={
    			
    	};

var ptnSecondWarnGird={};//地图预警气泡
var nowLunBoIndex = 0; //此刻轮播（界面右侧）下标
var AllOfPtnInfo = [				//轮播信息（顺序）
		{name:"进博会场馆"},
		{name:"高铁"},
		{name:"虹桥枢纽"},
		{name:"浦东机场"},
		{name:"进博会周边"},
		{name:"长途汽车站"},
		{name:"上海火车站"},
		{name:"上海南站"},
		{name:"酒店"},
		{name:"市委办公厅"},
	]
var ptnSencondPart = {
    init: function() {
    	ptnSencondPart.initGrid_yujing();
    	//进博会场馆流量数据
    	ptnSencondPart.importFairVenueData();
    	ptnSencondPart.importantVenueData();
    	ptnSencondPart.initGridData();
    	var obj={
    			dateType:"minute",
    			hot_area_name:"进博会场馆"
    	};
    	objGol=obj;
    	ptnSencondPart.flowPeakChartData(obj);
    	ptnSencondPart.venuePeakTableData(obj);
    	
    	ptnSencondPart.flowTrendChartData(obj);
    	
    	//调整  --上海重保区域流量名片-- 气泡位置（仅为外框大小调整时整体调整气泡位置） 只用调整后面的倍数
    	$(".chooseImage").each(function (one) {
    		//调整left
    		var left = $(this).css("left");
    		//$(this).css("left",parseFloat(left) * 1.01 +"px");
    		//调整top
    		var top = $(this).css("top");
//  		$(this).css("top",parseFloat(top) * 1  +"px");
    	});
    	
    	$(".radiom").click(function () {
    		
    		if($(this).hasClass("radioActive")){
    			return;
    		}
    		//$(".radiom").removeClass("radioActive");
    		//$(this).addClass("radioActive");
    		$(this).siblings(".radiom").removeClass("radioActive");
    		$(this).addClass("radioActive");
    		if($(this).attr("value").indexOf("hour1")!=-1){
    			var obj={
            			dateType:"hour",
            			hot_area_name:objGol.hot_area_name
            	};
    			objGol=obj;
    			ptnSencondPart.flowPeakChartData(obj);
    		}else if($(this).attr("value").indexOf("min1")!=-1){
    			var obj={
            			dateType:"minute",
            			hot_area_name:objGol.hot_area_name
            	};
    			objGol=obj;
    			ptnSencondPart.flowPeakChartData(obj);
    		}else{
    			var obj={
            			dateType:"minute",
            			hot_area_name:objGol.hot_area_name
            	};
    			objGol=obj;
    		}
    		
    		
    	});
    	$(".suoxiao").click(function (e) {
    		$("#liuliangSuLan").hide();
    		e.stopPropagation();
    	});
    	$(".bgForTitle").click(function (e) {
			$("#liuliangSuLan").show();
			ptnSencondPart.queryTableOfChangGuan();
			e.stopPropagation();
    	})
    	$("#liuliangSuLan").click(function (e) {
    		e.stopPropagation();
    	});
    	$("#cc").click(function(){
    		$("#pop").addClass('showPop');
    	});
    	$(".chooseImage").click(function(e){
    		e.stopPropagation();
    		$(this).parent().find(".chooseImage").removeClass("showImage");
    		var obj={
    				"进博会场馆":[''],
    				"虹桥枢纽":['酒店'],
    				"高铁":['酒店'],
    				"上海南站":['进博会周边','虹桥枢纽','高铁','酒店'],
    				"浦东机场":['进博会周边','进博会场馆','高铁','虹桥枢纽'],
    				"酒店":['进博会场馆','进博会周边','虹桥枢纽','市委办公厅','上海南站'],
    				"市委办公厅":['进博会周边','酒店','虹桥枢纽','高铁'],
    				"进博会周边":[''],
    				"上海火车站":[''],
    				"长途汽车站":['进博会周边','虹桥枢纽'],
    		};
    		var img_src={
    				"进博会场馆":eastcom.baseURL+'/static/images/PTNSCR/mapIndex/zhandian/zhongbohui.jpg',
    				"虹桥枢纽":eastcom.baseURL+'/static/images/PTNSCR/mapIndex/zhandian/hongqiaozhan.jpg',
    				"高铁":eastcom.baseURL+'/static/images/PTNSCR/mapIndex/zhandian/gaotie.png',
    				"上海南站":eastcom.baseURL+'/static/images/PTNSCR/mapIndex/zhandian/shanghainanzhan.jpg',
    				"浦东机场":eastcom.baseURL+'/static/images/PTNSCR/mapIndex/zhandian/pudongjichang.jpeg',
    				"酒店":eastcom.baseURL+'/static/images/PTNSCR/mapIndex/zhandian/jiudian.png',
    				"市委办公厅":eastcom.baseURL+'/static/images/PTNSCR/mapIndex/zhandian/shiweibangongting.jpg',
    				"进博会周边":eastcom.baseURL+'/static/images/PTNSCR/mapIndex/zhandian/zhongbohuizhoubian.png',
    				"上海火车站":eastcom.baseURL+'/static/images/PTNSCR/mapIndex/zhandian/shanghaizhan.jpeg',
    				"长途汽车站":eastcom.baseURL+'/static/images/PTNSCR/mapIndex/zhandian/qichezhan.jpg',
    		};
    		$("#pop").removeClass('pop_right');
    		$("#pop").removeClass('pop_left');
    		$("#pop").removeClass('pop_top');
    		$("#pop").removeClass('pop_top_right');
    		//$(this).css("left");
    		
    		/*if(($(this).attr("name")==$("#pop").attr("name"))&&!$("#pop").hasClass('showPop')){
    			$("#pop").addClass('showPop');
    			//$("#pop").children().addClass('showPop');
    			return;
    		}*/
    		var bottom=$(this).css("bottom");
    		if($(this).attr("direction")=="right"){
    			var right=$(this).css("right");
    			
    			$("#pop").css("right",(parseFloat(right.split("px")[0])+8)+"px");
    			console.log("last--"+$("#pop").css("right"));
    			$("#pop").css("left","auto");
    			$("#pop").addClass('pop_right');
    			$("#popContent").css("left","auto");
    			$("#popContent").css("right","111px");
    		}else if($(this).attr("direction")=="top"){
    			//$("#pop").css("left",$(this).css("left"));
    			var left=$(this).css("left");
    			$("#pop").css("left",(parseFloat(left.split("px")[0])+5)+"px");
    			$("#pop").css("right","auto");
    			$("#pop").addClass('pop_top');
    			$("#popContent").css("left","111px");
    			$("#popContent").css("right","auto");
    			bottom=$(this).css("bottom");
    			bottom=(parseFloat(bottom.split("px")[0])-204)+"px";
    		}else if($(this).attr("direction")=="top_right"){
    			//$("#pop").css("left",$(this).css("left"));
    			var right=$(this).css("right");
    			$("#pop").css("right",(parseFloat(right.split("px")[0])+5)+"px");
    			$("#pop").css("left","auto");
    			$("#pop").addClass('pop_top_right');
    			$("#popContent").css("right","111px");
    			$("#popContent").css("left","auto");
    			bottom=$(this).css("bottom");
    			bottom=(parseFloat(bottom.split("px")[0])-204)+"px";
    		}else {
    			//$("#pop").css("left",$(this).css("left"));
    			var left=$(this).css("left");
    			$("#pop").css("left",(parseFloat(left.split("px")[0])+2)+"px");
    			$("#pop").css("right","auto");
    			$("#pop").addClass('pop_left');
    			$("#popContent").css("left","111px");
    			$("#popContent").css("right","auto");
    		}
    		
    		
			$("#pop").css("bottom",(parseFloat(bottom.split("px")[0])-12)+"px");
    		//$("#pop").css("bottom",$(this).css("bottom"));
    		$("#pop").attr("name",$(this).attr("name"));
    		console.log($(this).css("left")+"--"+$(this).css("bottom"));
    		/*$(this).attr("nameWarn");
    		$(this).attr("nameCount");
    		$(this).attr("nameFlow");*/
    		//var ptnSecondWarn =window.parent.ptnSecondGobel;
    		//console.log(ptnSecondWarn);
    		$("#jiankongTitle").html($(this).attr("name"));
    		$("#jiankongnums").html($(this).attr("nameCount"));
    		$("#jiankongflow").html($(this).attr("nameFlow"));
    		//$("#jiankongflow").html(($(this).attr("nameFlow")/1024).toFixed(2));
    		$("#jiankongWarn").html(parseInt(ptnSecondWarnGird[$(this).attr("name")].red)+parseInt(ptnSecondWarnGird[$(this).attr("name")].yel)+parseInt(ptnSecondWarnGird[$(this).attr("name")].blue));
    		console.log(parseInt(ptnSecondWarnGird[$(this).attr("name")].red)+parseInt(ptnSecondWarnGird[$(this).attr("name")].yel)+parseInt(ptnSecondWarnGird[$(this).attr("name")].blue));
    		$("#pro2").css('width',Math.round($(this).attr("nameRadio"))+'%');
    		$("#pro1").css('width',100-Math.round($(this).attr("nameRadio"))+'%');
    		$("#imgSrc").attr('src',img_src[$(this).attr("name")]);
    		//$("#biLiForPro").html(Math.round($(this).attr("nameRadio"))+"/100");
    		$("#biLiForPro").html($(this).attr("peak")+"/"+$(this).attr("peakStie"));
    		var chooseDivName=$(this).attr('name');
    		var arr_name=obj[chooseDivName];
    		var keys=Object.keys(obj);
    		for(var i=0;i<keys.length;i++){
    			$(this).parent().find("div[name="+keys[i]+"]").addClass('showImage');
    		}
    		//$(this).parent().find("div").addClass('showImage');
    		$("#pop").removeClass('showImage')
    		for(var j=0;j<arr_name.length;j++){
				$(this).parent().find("div[name="+arr_name[j]+"]").removeClass('showImage');
			}
    		$("#pop").removeClass('showPop');
    		objGol.hot_area_name=$(this).attr("name");
    		ptnSencondPart.flowPeakChartData(objGol);
        	ptnSencondPart.venuePeakTableData(objGol);
        	
        	//初始化轮播下标
        	for(var i=0;i<AllOfPtnInfo.length;i++){
        		if(objGol.hot_area_name == AllOfPtnInfo[i].name){
        			nowLunBoIndex = i;
        			break;
        		}
        	}
        	
        	ptnSencondPart.flowTrendChartData(objGol);
    		//$(this).addClass('showImage');
    	})
    	
    	
    },
    initLoad:function(){
    	ptnSencondPart.importFairVenueData();
    	ptnSencondPart.importantVenueData();
    	ptnSencondPart.flowPeakChartData(objGol);
    	ptnSencondPart.venuePeakTableData(objGol);
    	ptnSencondPart.flowTrendChartData(objGol);
    	
	},
    initGrid_yujing:function(){
    	var  columnName=[];
    	var colModel = [{
            label: '电路名称',
            name: 'SERVICE_NAME',
            index: 'SERVICE_NAME',
            align: 'center',
            width:'230',
        }, {
            label: '流量(GB)',
            name: 'FLOW',
            index: 'FLOW',
            align: 'center',
            sorttype:'number',
            width:'69',
        }, {
            label: '流速峰值(Mbps)',
            name: 'PEAK_FLOW_RATE',
            index: 'PEAK_FLOW_RATE',
            align: 'center',
            width:'119',
            sorttype:'number',
            formatter: function(cellvalue) {
                var value = cellvalue == undefined ? "-" : cellvalue;
                return '<span style="">' + value + '</span>'
            }
        }, {
            label: '保证带宽<br/>利用率均值(%)',
            name: 'MEAN_GUARANTEED_BANDWIDTH_UTIL',
            index: 'MEAN_GUARANTEED_BANDWIDTH_UTIL',
            align: 'center',
            width:'140',
            sorttype:'number',
            formatter: function(cellvalue) {
                var value = cellvalue == undefined ? "-" : cellvalue;
                return '<span style="color:#ffcc66;">' + value + '</span>'
            }
        }
    ];
    	
				$("#table_yewuliuliang").jqGrid({
						height: 237,  
						rowNum: 1000000,
						datatype: "local",
						shrinkToFit:true,
						autoScroll: true,
						autowidth: false,
						width:$("#ex").width()-5,
						colModel:colModel,
						sortable:false, 
						sortorder:"desc",
						pager: "#table_yewuliuliang_gridPager",
						pgtext : "{0}共{1}页",
						//caption: "第一个jqGrid例子",
						onSelectRow : function(rowid,status){
							
						},
                        gridComplete:function(){
                        	
                        },loadComplete:function(){
                            var grid = $("#table_yujing");
                            var ids = grid.getDataIDs();
                            for (var i = 0; i < ids.length; i++) {
                                grid.setRowData ( ids[i], false, {height: 49} );
                            }},
                        onSelectRow:function(rowid,iRow,iCol,e){
                        	//e.preventDefault();
                        	//alert("233");
                        }
				});	 
				 $("th[id^=table_yewuliuliang_]").css('color', '#fff');
				 // $("th[id^=table0_]").css('background', '#8e91ff');
		
			    //初始化 --进博会场馆流量表格--
				var colModel1 = [
					{label: '环网名称',name: 'LOOP_NAME',index: 'LOOP_NAME',align: 'center',width:'400', },
					{ label: '环网带宽', name: 'SYSTEM_BANDWIDTH', index: 'SYSTEM_BANDWIDTH', align: 'center', width:'140', },
					{ label: '带宽利用率峰值(%)', name: 'PEAK_BANDWIDTH_UTILIZATION', index: 'PEAK_BANDWIDTH_UTILIZATION', align: 'center', width:'180',
			            formatter: function(cellvalue) {
			            	cellvalue = cellvalue?cellvalue:"";
			            	var background = "";
			            	if(cellvalue>=70){
			            		background = "red";
			            	}else if(cellvalue>=60){
			            		background = "darkorange";
			            	}else if(cellvalue>=50){
			            		background = "deepskyblue";
			            	}
			            	return '<div style="height:40px;line-height: 40px;background:'+background+';">'+cellvalue+'</div>'
			            }
		        	},
	    		];
    	
				$("#tableOfLiuliang").jqGrid({
						height: 271,  
						rowNum: 1000000,
						datatype: "local",
						shrinkToFit:true,
						autoScroll: true,
						autowidth: false,
						colModel:colModel1,
						sortable:true, 
						sortorder:"desc",
						sorttype:"currency",
						sortname:"PEAK_BANDWIDTH_UTILIZATION",
						pager: "#table_yewuliuliang_gridPager",
						pgtext : "{0}共{1}页",
						//caption: "第一个jqGrid例子",
						onSelectRow : function(rowid,status){
							
						},
                        gridComplete:function(){
                        	
                        },loadComplete:function(){
                            var grid = $("#table_yujing");
                            var ids = grid.getDataIDs();
                            for (var i = 0; i < ids.length; i++) {
                                grid.setRowData ( ids[i], false, {height: 49} );
                            }},
                        onSelectRow:function(rowid,iRow,iCol,e){
                        	//e.preventDefault();
                        	//alert("233");
                        }
				});	 
	},
	/*
	 * 
	 * --进博会场馆流量-- 表格数据加载
	 */
	queryTableOfChangGuan:function () {
		$("#tableOfLiuliang").jqGrid("clearGridData");
		commonAjax("/sml/query/cus_trans-rm-monflow-looptable","","post",true,function (data) {
			if(data&&data.success){
				data = data.data;
				for(var i=0;i<data.length;i++){
					$("#tableOfLiuliang").addRowData(i+1, data[i] );
				}
			}
		})
	},
	/***
	 * 
	 * 进博会场馆流量数据*/
	importFairVenueData:function(){
		 $.ajax({
		        url :eastcom.baseURL+'/sml/query/cus_trans-rm-monflow-siteflow' ,
		        type : 'POST',
		        async : true,
		        dataType : "json",
		        contentType :"application/json",
		        data:"",
		        success : function(res) {
	                    if (res.success) {
	                    	var mydata = res.data;
	                    	 for(var i=0;i<mydata.length;i++){
	                    		 if(mydata[i].SITE_NAME.indexOf('A')!=-1){
	                    			 $("#A0").html(mydata[i].LTE_FLOW+" GB");
	                    		 }else if(mydata[i].SITE_NAME.indexOf('B')!=-1){
	                    			 $("#B0").html(mydata[i].LTE_FLOW+" GB");
	                    		 }else if(mydata[i].SITE_NAME.indexOf('C')!=-1){
	                    			 $("#C0").html(mydata[i].LTE_FLOW+" GB");
	                    		 }else if(mydata[i].SITE_NAME.indexOf('D')!=-1){
	                    			 $("#D0").html(mydata[i].LTE_FLOW+" GB");
	                    		 }else if(mydata[i].SITE_NAME.indexOf('E')!=-1){
	                    			 $("#E0").html(mydata[i].LTE_FLOW+" GB");
	                    		 }
	                    	 }
	     				   
	                    }else{
	                    	
	                    }
		        },
	           complete: function(XMLHttpRequest, textStatus){
	            },
	            error: function(){
					  eastcom.showMsg("danger","请求异常,数据加载失败!");
					  setTimeout('clearMsg("one")',10000)
	            }
			});
	},
	/***
	 * 
	 * 上海重保区域流量名片*/
	importantVenueData:function(){
		 $.ajax({
		        url :eastcom.baseURL+'/sml/query/cus-trans-rm-monflow-card' ,
		        type : 'POST',
		        async : true,
		        dataType : "json",
		        contentType :"application/json",
		        data:"",
		        success : function(res) {
	                    if (res.success) {
	                    	var mydata = res.data;
	                    	var obj={};
	                    	 for(var i=0;i<mydata.length;i++){
	                    		 var keys={
	                    				 	FLOW:mydata[i].FLOW,
	                    					 NUMS:mydata[i].NUMS,
	                    					 RADIO:mydata[i].RADIO,
	                    					 peak:mydata[i].PEAK_FLOW_RATE_SITE,
	                    					 peakstie:mydata[i].PEAK_FLOW_RATE,
	                    		 };
	                    		 
	                    		 obj[mydata[i].HOT_AREA_NAME]=keys;
		                    	}
	                    	 
	                    	 $("#cc").find(".chooseImage").each(function(){
	                    		 console.log($(this).attr('name'));
	                    		 if(obj[$(this).attr('name')]!=null &&obj[$(this).attr('name')]!="undefined"){
	                    			 	if(obj[$(this).attr('name')].FLOW==null||obj[$(this).attr('name')].FLOW==""){
	                    			 		obj[$(this).attr('name')].FLOW='---';
	                    			 	}
	                    			 	if(obj[$(this).attr('name')].NUMS==null||obj[$(this).attr('name')].NUMS==""){
	                    			 		obj[$(this).attr('name')].NUMS='---';
	                    			 	}
	                    			 	if(obj[$(this).attr('name')].peakstie==null||obj[$(this).attr('name')].peakstie==""){
	                    			 		obj[$(this).attr('name')].peakstie='---';
	                    			 	}
	                    			 	if(obj[$(this).attr('name')].peak==null||obj[$(this).attr('name')].peak==""){
	                    			 		obj[$(this).attr('name')].peak='---';
	                    			 	}
	                    			 	
		                    			$(this).attr('nameFlow',obj[$(this).attr('name')].FLOW);
		                    			$(this).attr('nameCount',obj[$(this).attr('name')].NUMS);
		                    			$(this).attr('nameRadio',obj[$(this).attr('name')].RADIO);
		                    			$(this).attr('peakStie',obj[$(this).attr('name')].peakstie);
		                    			$(this).attr('peak',obj[$(this).attr('name')].peak);
	                    		 }
	                    		 
	                    		})
	     				   
	                    }else{
	                    	
	                    }
		        },
	           complete: function(XMLHttpRequest, textStatus){
	            },
	            error: function(){
					  eastcom.showMsg("danger","请求异常,数据加载失败!");
					  setTimeout('clearMsg("one")',10000)
	            }
			});
	},
	
	/***
	 * 
	 * 流速峰值趋势图*/
	flowPeakChartData:function(obj){
		var dataStr={
				dateType:obj.dateType,
				hot_area_name:obj.hot_area_name
		};
		 $.ajax({
		        url :eastcom.baseURL+'/sml/query/cus-trans-rm-monflow-flowradio-tread' ,
		        type : 'POST',
		        async : true,
		        dataType : "json",
		        contentType :"application/json",
		        data:JSON.stringify(dataStr),
		        success : function(res) {
	                    if (res.success) {
	                    	var mydata = res.data;
	                    	 var xx=[];
	                    	 var yy={
		                     			data1:[],
		                     			data2:[],
		                     	};
	                    	 
	                    	 if(obj.dateType=="hour"){
	                    		 for(var i=0;i<mydata.length;i++){
		                    		 xx.push(mydata[i].TIME_ID);
		                    		 yy.data1.push(mydata[i].PEAK_FLOW_RATE_AREA);
		                    		 yy.data2.push(mydata[i].PEAK_FLOW_RATE_AREAHB);		                    		 
		                    	 }
                   			
                   		 }else{
                   			 for(var i=0;i<mydata.length;i++){
		                    		 xx.push(mydata[i].TIME_ID);
		                    		 yy.data1.push(mydata[i].PEAK_FLOW_RATE_SITE);
		                    		 yy.data2.push(mydata[i].PEAK_FLOW_RATE_SITEHB);	                    		 
		                    	 }
                   			
                   		 }
	                    	 
	                    	 
	                    	
	                     	
	                     	eastcom_echarts_line.loadDataToChart('chart_2',xx,yy,obj.hot_area_name);
	                    }else{
	                    	
	                    }
		        },
	           complete: function(XMLHttpRequest, textStatus){
	            },
	            error: function(){
					  eastcom.showMsg("danger","请求异常,数据加载失败!");
					  setTimeout('clearMsg("one")',10000)
	            }
			});
	},
	
	/***
	 * 
	 * 进博会场馆业务流量表*/
	venuePeakTableData:function(obj){
		var dataStr={
				hot_area_name:obj.hot_area_name
		};
		jQuery("#table_yewuliuliang").jqGrid("clearGridData");	
		$("#liuLiangtableTile").text(obj.hot_area_name+"业务流量表");
		 $.ajax({
		        url :eastcom.baseURL+'/sml/query/cus-trans-rm-monflow-port-flow' ,
		        type : 'POST',
		        async : true,
		        dataType : "json",
		        contentType :"application/json",
		        data:JSON.stringify(dataStr),
		        success : function(res) {
	                    if (res.success) {
	                    	var mydata=res.data;
	                    	 for(var i=0;i<mydata.length;i++){
	      				        $("#table_yewuliuliang").jqGrid('addRowData',i+1,mydata[i]);
	      				    };
	      				    $("#table_yewuliuliang").trigger("reloadGrid");
	                    }else{
	                    	
	                    }
		        },
	           complete: function(XMLHttpRequest, textStatus){
	            },
	            error: function(){
					  eastcom.showMsg("danger","请求异常,数据加载失败!");
					  setTimeout('clearMsg("one")',10000)
	            }
			});
	},
	
	/***
	 * 
	 * 流量趋势图-流量*/
	flowTrendChartData:function(obj){
		var dataStr={
				nums:"6",
				hot_area_name:obj.hot_area_name
		};
		 $.ajax({
		        url :eastcom.baseURL+'/sml/query/cus_trans-rm-monflow-flow-tread' ,
		        type : 'POST',
		        async : true,
		        dataType : "json",
		        contentType :"application/json",
		        data:JSON.stringify(dataStr),
		        success : function(res) {
		        	ptnSencondPart.flowTrendChartDataLte(function (lte_data) {
		        		var res_data=res.data;
			        	var let_choose_data={};
			        	var xx=[];
			        	var yy={
			        			data1:[],
			        			data2:[],
			        	};
			        	for(var j=0;j<lte_data.length;j++){
			        		var time=lte_data[j].time;
			        		time=time.toString();
			        		time=time.split(' ')[1];
			        		let_choose_data[time]=lte_data[j]['Attach用户数'];
		        		}
			        	
			        	
			        	for(var i=0;i<res_data.length;i++){
			        		xx.push(res_data[i].TIME_ID);
		        			yy.data1.push(res_data[i]['FLOW']);
		        			yy.data2.push(let_choose_data[res_data[i].TIME_ID+':00']);
			        	}
			        	
			        	eastcom_echarts_line_2.loadDataToChart('chart_1',xx,yy,obj.hot_area_name);
		        	});
		        },
	           complete: function(XMLHttpRequest, textStatus){
	            },
	            error: function(){
					  eastcom.showMsg("danger","请求异常,数据加载失败!");
					  setTimeout('clearMsg("one")',10000)
	            }
			});
	},
	/***
	 * 
	 * 流量趋势图-LTE用户附着数*/
	flowTrendChartDataLte:function(FunBack){
		var resdata="";
		 var startTime = new Date();
		 var endTime = new Date();
         startTime.setHours(startTime.getHours()-6);
         
         startTime=startTime.Format('yyyy-MM-dd hh:mm:ss');
         endTime=endTime.Format('yyyy-MM-dd hh:mm:ss');
         var hotspot="PTN-"+objGol.hot_area_name;
		//http://10.221.247.7:8080/stream/union/hotspot-times?startTime=2018-09-27%2013:50:00&hotspot=%E8%BF%AA%E5%A3%AB%E5%B0%BC
		/*var dataStr={
				nums:"6"
		};*/
         $("#chart_1").mask('');
		 $.ajax({
		        url :'http://10.222.42.22:8080/stream/union/hotspot-times?timeBegin='+ encodeURIComponent(startTime)+'&timeEnd='+ encodeURIComponent(endTime)+'&hotspot='+encodeURIComponent(hotspot)+'&indicatorNameList='+encodeURIComponent('time,Attach用户数'),
		        type : 'POST',
		        async : true,
		        dataType : "json",
		        contentType :"application/json",
		        data:'',
		        success : function(res) {
		        	 $("#chart_1").unmask();
		        	resdata=res;
		        	if(FunBack){
		        		FunBack(res);
		        	}
		        },
	           complete: function(XMLHttpRequest, textStatus){
	            },
	            error: function(){
					  eastcom.showMsg("danger","请求异常,数据加载失败!");
					  setTimeout('clearMsg("one")',10000)
	            }
			});
		 
		 return resdata;
	},
	/**
	 * 
	 *预警详情 */
	initGridData : function() {
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
							var obj = {
								"进博会场馆" : {
									red : 0,
									yel : 0,
									blue : 0,
									gree : 0
								},
								"虹桥枢纽" : {
									red : 0,
									yel : 0,
									blue : 0,
									gree : 0
								},
								"高铁" : {
									red : 0,
									yel : 0,
									blue : 0,
									gree : 0
								},
								"上海南站" : {
									red : 0,
									yel : 0,
									blue : 0,
									gree : 0
								},
								"浦东机场" : {
									red : 0,
									yel : 0,
									blue : 0,
									gree : 0
								},
								"酒店" : {
									red : 0,
									yel : 0,
									blue : 0,
									gree : 0
								},
								"市委办公厅" : {
									red : 0,
									yel : 0,
									blue : 0,
									gree : 0
								},
								"进博会周边" : {
									red : 0,
									yel : 0,
									blue : 0,
									gree : 0
								},
								"上海火车站" : {
									red : 0,
									yel : 0,
									blue : 0,
									gree : 0
								},
								"长途汽车站" : {
									red : 0,
									yel : 0,
									blue : 0,
									gree : 0
								},
							};
							var mydata = res.data;
							for (var i = 0; i < mydata.length; i++) {
								obj[mydata[i].HOT_AREA_NAME][mydata[i].ELEVELS]=parseInt(obj[mydata[i].HOT_AREA_NAME][mydata[i].ELEVELS])+1;
								/*if(mydata[i].ELEVELS=="red"){
									obj[mydata[i].HOT_AREA_NAME]=parseInt(obj[mydata[i].HOT_AREA_NAME])+1;
								}*/
							}
							;
							ptnSecondWarnGird=obj;
							console.log(ptnSecondWarnGird);
							 $("#cc").find(".chooseImage").each(function(){
								 if(obj[$(this).attr('name')].red!=0){
									 $(this).removeClass('greenBubble').removeClass('yellowBubble').removeClass('blueBubble').addClass('redBubble');
								 }else if(obj[$(this).attr('name')].yel!=0){
									 $(this).removeClass('greenBubble').removeClass('redBubble').removeClass('blueBubble').addClass('yellowBubble');
								 }else if(obj[$(this).attr('name')].blue!=0){
									 $(this).removeClass('greenBubble').removeClass('yellowBubble').removeClass('redBubble').addClass('blueBubble');
								 }else{
									 $(this).removeClass('redBubble').removeClass('yellowBubble').removeClass('blueBubble').addClass('greenBubble');
								 }
	                    		 console.log($(this).attr('name'));
	                    		 /*if(obj[$(this).attr('name')]!=0){
		                    			$(this).removeClass('greenBubble').addClass('redBubble');
	                    		 }else{
	                    			 $(this).removeClass('redBubble').addClass('greenBubble');
	                    		 }*/
	                    		 
	                    		})
						} else {

						}
					},
					complete : function(XMLHttpRequest, textStatus) {
					},
					error : function() {
						eastcom.showMsg("danger", "请求异常,数据加载失败!");
					}
				});

	},
};

