var Urban_Rd_left = {
		    init : function(){
                    Urban_Rd_left.initTableData(); 

		    },
		    initTableData : function(city){
		    	    var time = new Date();
		    	    time.setMinutes(time.getMinutes()-15); 
		    	    var timeStr = time.format("yyyy-MM-dd hh:mm:ss");
		    	    var url = eastcom_URL+"/stream/rank/sites-allidrs-time?time="+timeStr+"&num=1000&sortKey="+encodeURIComponent('总用户数')+"&order=desc";
		    	    //var url = eastcom_URL+"/stream/rank/sites-allidrs-time?time=2016-05-21 13:50:44&num=10&sortKey=总用户数&order=desc";
		    	    if(city!=null&&city!=""){
		    	    	url+="&sd="+encodeURIComponent(city);
		    	    }
		    	    $.ajax({
	                       type : "get",
	                       async : true, //异步执行
	                       url : url,
	                       data : {},
	                       dataType : "json" //返回数据形式为json
	                })
	                .done(function (data) {
		                    var htmlStr = "";  
		                                htmlStr += '<li>'
	                                        +         '<div class="l1 list1 list1_border" style="width:10%">排名</div>'
	                                        +         '<div class="r1 list1 list1_border" style="width:22%">小区名</div>'
	                                        +         '<div class="r1 list1 list1_border" style="width:16%">总用户数</div>'
	                                        +         '<div class="l2 list1 list1_border" style="width:13%">4G流量(MB)</div>'
	                                        +         '<div class="r2 list1 list1_border" style="width:18%">下载速率(Kbps)</div>'
	                                        +         '<div class="l3 list1 list1_border" style="width:20%">RRC连接成功率(%)</div>'
	                                       // +         '<div class="r3 list1"></div>'
	                                        +      '</li>'
		                        for (var i = 0; i < data.length; i++) {
		                        	var row = "list2";
		                        	if ((i%2)==0) {row = "list3";};
		                        	var item = data[i];
					    	        htmlStr +=  '<li>'
				                            +       '<div class="l1 '+row+'" style="width:10%">'+(i+1)+'</div>'
				                            +       '<div class="r1 '+row+'" style="width:22%">'
				                            +         '<a href="javascript:void(0)" title="'+item.name+'">'
                                            +         '<div style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:98%;color: white;">'+item.name+'</div></a>'
                                            +         '</div>'
				                      //      +       '<div class="r1 '+row+'" style="width:22%">'+item.name+'</div>'
				                            +       '<div class="r1 '+row+'" style="width:16%"><p class="txt_number">'+Urban_Rd_left.changeTwoDecimal(item["总用户数"])+'<p></div>'
				                            +       '<div class="l2 '+row+'" style="width:13%"><p class="txt_number">'+Urban_Rd_left.changeTwoDecimal((item["4G流量"])/1024)+'<p></div>'
				                            +       '<div class="r2 '+row+'" style="width:18%"><p class="txt_number">'+Urban_Rd_left.changeTwoDecimal(item["下行速率"])+'<p></div>'
				                            +       '<div class="l3 '+row+'" style="width:20%"><p class="txt_number">'+Urban_Rd_left.changeTwoDecimal(item["4GRRC连接建立成功率"]*100)+'<p></div>'
				                           // +       '<div class="r3 '+row+'" ></div>'
				                            +    '</li>'
		                         };  
			                $("#table_div_li").html(htmlStr);        
	                       

	                });

		    	    
		    },
		    changeTwoDecimal : function(floatvar){
		    	              var f_x = parseFloat(floatvar);
	                          if (isNaN(f_x)){return 0;}
		    	              var f_x = Math.round(floatvar*100)/100; 
		    	              return f_x;
		    },
};

