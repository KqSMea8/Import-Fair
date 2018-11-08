var CURRYEAR = "";
var thresholdList = {
    play_succ_ratio:95,                       //电视播放成功率       //05
    play_res_delay:2000,                         //电视播放响应时长      //06
    epg_resp_delay:0,                         //电视EPG加载时延      //07
    screen_jammed_num_ratio:0,                //卡顿次数占比    
    screen_jammed_users_ratio:10,             //卡顿用户占比         //09
    screen_jammed_duration_ratio:5,            //卡顿时长占比          //08

    ul_txp_link_use_ratio: 50,                   //上联TXP链路利用率
    dl_sw_link_use_ratio: 50,                   //下联TXP链路利用率
    ul_pile_link_use_ratio: 70                   //堆叠互联链路利用率
}
var LOADINGTIME = 500;         //loading时间
var addBigWinOfTime={win:null},addBigWinOfTimeSlot={win:null},addBigWinOfTimeSlotOfjqGrid14={win:null};

var TIMEOFECHARTS= "";
var internetTV = {
    init: function() {
        //internetTV.initTime();
        internetTV.initEvent();
        internetTV.initEcharts();
        //internetTV.initGridTab();
        /*internetTV.loadEchartsDataOfIndex();
        internetTV.loadEchartsDataOfIndexAndRate();
        internetTV.loadEchartsDataOfBarBar();

        internetTV.loadGridTabData();*/
        internetTV.initLoad();
        
        
     //internetTV.loadEchartsDataOfTvService('migu','echartsadd_12_re',obj);
    },
    initLoad:function(){
    	var hour_date = new Date();
        hour_date.setDate(hour_date.getDate());
        
        var splitTime = 5 * 60 * 1000;
		var startMin = hour_date.getTime();
		var mod = startMin % splitTime;
		  if(mod > 0) {
			  startMin -= mod; 
		  }
		  hour_date.setTime(startMin);
		  var start=hour_date.format("yyyy-MM-dd hh:mm");

       var endMin = new Date(hour_date.getTime() - 6* 60 * 60 * 1000);

       var end= endMin.format("yyyy-MM-dd hh:mm");
       var obj={
     		  "start":end,
     		  "end":start,
       };
     internetTV.loadEchartsDataLineAll("echartsadd_all",obj);
        internetTV.loadEchartsDataOfIndex234();
        internetTV.loadEchartsDataOfIndex();
        internetTV.loadEchartsDataOfIndexAndRate01();
        internetTV.loadEchartsDataOfIndexAndRate();
        //internetTV.loadEchartsDataOfRate();
        internetTV.loadEchartsDataOfBarBar();
        
       // internetTV.loadEchartsDataOfTvService('tv');//tv互联网电视业务  migu咪咕视频  content上海内容中心 
        internetTV.loadEchartsDataOfTvService('migu');
        internetTV.loadEchartsDataOfTvService('content');
        //internetTV.loadGridTabData('jqGrid14');
        
    },
    initTime: function(par) {
        
        if(par.indexOf("_re")!=-1){
        	var hour_date = new Date();
            hour_date.setDate(hour_date.getDate());
            
            var splitTime = 5 * 60 * 1000;
    		var startMin = hour_date.getTime();
    		var mod = startMin % splitTime;
    		  if(mod > 0) {
    			  startMin -= mod; 
    		  }
    		  hour_date.setTime(startMin);

           if("echartsadd_12_re"==par){
        	   var endMin = new Date(hour_date.getTime() - 6 * 60 * 60 * 1000);

                $("#startTime_"+par).val(endMin.format("yyyy-MM-dd"));
            }else{
        	    $("#endTime_"+par).val(hour_date.format("yyyy-MM-dd hh:mm"));
            	var endMin = new Date(hour_date.getTime() - 6 * 60 * 60 * 1000);
                $("#startTime_"+par).val(endMin.format("yyyy-MM-dd hh:mm"));
            }
        }else{
        	var hour_date = new Date();
            hour_date.setDate(hour_date.getDate() - 1);
            $("#startTime_"+par).val(hour_date.format("yyyy-MM-dd"));
        }
        
    },
    initTimeOfSlot: function(par) {
        var hour_date = new Date();
        hour_date.setDate(hour_date.getDate() - 4); //barbarbarTime
        $("#startTime").val(hour_date.format("yyyy-MM-dd hh"));

        var hour_date_end = new Date();
        hour_date_end.setDate(hour_date_end.getDate() - 0);
        $("#endTime").val(hour_date_end.format("yyyy-MM-dd hh"));


        if (par == "jqGrid14") {
            var hour_date = new Date();
            hour_date.setHours(hour_date.getHours() - 4);     //tableTime
            $("#startTime_"+par).val(hour_date.format("yyyy-MM-dd hh"));

            var hour_date_end = new Date();
            hour_date_end.setHours(hour_date_end.getHours() - 0);
            $("#endTime_"+par).val(hour_date_end.format("yyyy-MM-dd hh"));
        }
    },
    initEvent: function() {
        $(".changeToBig").on('click', internetTV.addBigWinOfEcharts);
        $(".changeToBigOfGrid").on('click', internetTV.addBigWinOfGrid);
        $(".choiceTimeSlot13").on('click', internetTV.addBigWinOfTimeSlot);
        $(".choiceTimeSlot14").on('click', internetTV.addBigWinOfTimeSlotOfjqGrid14);
        $(".choiceTime01").on('click', internetTV.addBigWinOfTime01);
        $(".choiceTime02").on('click', internetTV.addBigWinOfTime02);
        $(".choiceTime03").on('click', internetTV.addBigWinOfTime03);
        $(".choiceTime04").on('click', internetTV.addBigWinOfTime04);
        $(".choiceTime05").on('click', internetTV.addBigWinOfTime05);
        $(".choiceTime06").on('click', internetTV.addBigWinOfTime06);
        $(".choiceTime08").on('click', internetTV.addBigWinOfTime08);
        $(".choiceTime09").on('click', internetTV.addBigWinOfTime09);
        $(".choiceTime10").on('click', internetTV.addBigWinOfTime10);
        $(".choiceTime11").on('click', internetTV.addBigWinOfTime11);
        
        //choiceTimeadd_01
        $(".additionalTime").on('click', internetTV.addBigWinOfTimeAddCommon);
        
    },
    addBigWinOfEcharts: function(evet) {
        var currEcharts = $(this).attr('name');
       /* var docWidth = $(document).width();
        var docHeight = $(document).height();
        var winWidth = docWidth * 0.7;
        var winHeight = docHeight * 0.5;
        var win = new LSMScreen.SimpleWindow({
            title: $(this).siblings().text(),
            width: winWidth,
            height: winHeight,
            x: (docWidth - winWidth) * 0.5,
            y: (docHeight - winHeight) * 0.5,
            beforeClose: function() {}
        });*/
        var docWidth=$('body').width();
        var docHeight=$('body').height();
        var winWidth=docWidth*0.8;
        var winHeight=400;
        //var winY=$(evet.currentTarget).parent().parent().offset().top;

        var win = new LSMScreen.SimpleWindow({
            title: $(this).siblings().text(),
            width:winWidth,
            height:winHeight,
            x:(docWidth-winWidth)/2,
            y:50,
    		modal:true,
            beforeClose: function() {}
        });
        var contentHtml = '';

        contentHtml += '<div name="time" style="height:21px">' +
            //'<span class="fr" style="margin-right: 60px;color: #fff;font-size: 20px;">时</span>' +
            '<input id="echarts_time" class="Wdate TimeFiled fl" style="width: 137px;float: right;border: none;color: #fff;background: none;cursor: pointer;font-size: 20px;height:27px" onclick="WdatePicker({dateFmt : \'yyyy-MM-dd HH\',maxDate:\'%y-%M-{%d} 23\'})"/>' +
            '</div>' +
            '<div id="echartsCommon" style="width:100%;height:90%"></div>';

        $(win.content).html(contentHtml);


        //放大初始时间
        $("#echarts_time").val($("#" + currEcharts + "_time").val());
        //拿去缓存数据
        var data = _CacheFun._getCache(currEcharts);
        if(currEcharts.indexOf("_re")!=-1){
        	
            var grid = {
                    x: '8%',
                    y: '6%',
                    x2: '8%',
                    y2: '15%',
                    borderWidth:0
            };
            data.grid = grid;
            eastcom_echarts_drawChart.init("echartsCommon", data);
        }else{
            var xx = data.xx;
            var yy = data.yy;
            var yyy = data.yyy;
            if (
                //currEcharts == "echarts05" ||
                //currEcharts == "echarts08" ||
                //currEcharts == "echarts09" ||
                currEcharts == "echarts12"
            ) {
                eastcom_echarts_line_rate.loadDataToChart("echartsCommon", xx, yy);
            } else if (currEcharts == "echarts10" || currEcharts == "echarts11") {
                if (currEcharts == "echarts10") {
                    eastcom_echarts_line_bar.loadDataToChart("echartsCommon", xx, yy,thresholdList.ul_txp_link_use_ratio);
                }
                if (currEcharts == "echarts11") {
                    eastcom_echarts_line_bar.loadDataToChart("echartsCommon", xx, yy,thresholdList.dl_sw_link_use_ratio);
                }
            }else if(currEcharts == "echartsadd_04"|| currEcharts == "echartsadd_05"
    			|| currEcharts == "echartsadd_06"|| currEcharts == "echartsadd_07"
        			|| currEcharts == "echartsadd_08"|| currEcharts == "echartsadd_09"){
            	eastcom_echarts_line_bar.loadDataToChart("echartsCommon", xx, yy,thresholdList.dl_sw_link_use_ratio,['流量(MB)','请求成功率(%)']);
            } else if (currEcharts == "echartsadd_10") {
            	eastcom_echarts_line_bar_content.loadDataToChart("echartsCommon", xx, yy,eastcom_echarts_line_bar_content.legend);
            } else if (currEcharts == "echarts13") {
                eastcom_echarts_bar_bar.loadDataToChart("echartsCommon", xx, yy, yyy);
            } else {
                if (currEcharts == "echarts06") {
                    eastcom_echarts_line.loadDataToChart("echartsCommon", xx, yy,thresholdList.play_res_delay,"echarts06");
                }else if (currEcharts == "echarts05") {
                    eastcom_echarts_line.loadDataToChart("echartsCommon", xx, yy,thresholdList.play_succ_ratio);
                }else if (currEcharts == "echarts08") {
                    eastcom_echarts_line.loadDataToChart("echartsCommon", xx, yy,thresholdList.screen_jammed_duration_ratio,"echarts08");
                }else if (currEcharts == "echarts09") {
                    eastcom_echarts_line.loadDataToChart("echartsCommon", xx, yy,thresholdList.screen_jammed_users_ratio,"echarts09");
                }else if (currEcharts == "echartsadd_01") {
                    eastcom_echarts_line.loadDataToChart("echartsCommon", xx, yy,thresholdList.screen_jammed_users_ratio,"echartsadd_01");
                }else if (currEcharts == "echartsadd_02") {
                    eastcom_echarts_line.loadDataToChart("echartsCommon", xx, yy,thresholdList.screen_jammed_users_ratio,"echartsadd_02");
                }else if (currEcharts == "echartsadd_03") {
                    eastcom_echarts_line.loadDataToChart("echartsCommon", xx, yy,thresholdList.screen_jammed_users_ratio,"echartsadd_03");
                }else{
                    eastcom_echarts_line.loadDataToChart("echartsCommon", xx, yy);
                }
                
            }
        }
       
    },
    addBigWinOfGrid: function() {
        var currEcharts = $(this).attr('name');
        /*var docWidth = $(document).width();
        var docHeight = $(document).height();
        var winWidth = docWidth * 0.7;
        var winHeight = docHeight * 0.5;*/
        var docWidth=$('body').width();
        var docHeight=$('body').height();
        var winWidth=docWidth*0.8;
        var winHeight=400;
        var win = new LSMScreen.SimpleWindow({
            title: "服务器性能列表",
            /*width: winWidth,
            height: winHeight,
            x: (docWidth - winWidth) * 0.5,
            y: (docHeight - winHeight) * 0.5,*/
            width:winWidth,
            height:winHeight,
            x:(docWidth-winWidth)/2,
            y:50,
    		modal:true,
            beforeClose: function() {}
        });
        var contentHtml = '';

        contentHtml += ''
            //+'<div name="time" style="height:21px">' +
            //'<span class="fr" style="margin-right: 60px;color: #fff;font-size: 20px;">时</span>' +
            //'<input id="echarts_time" class="Wdate TimeFiled fl" style="width: 137px;float: right;border: none;color: #fff;background: none;cursor: pointer;font-size: 20px;height:27px" onclick="WdatePicker({dateFmt : \'yyyy-MM-dd HH\',maxDate:\'%y-%M-{%d} 23\'})"/>' +
            //'</div>' +
            +'<div id="echartsCommon" style="width:100%;height:90%"><table id="gridTableCommon"></table></div>';

        $(win.content).html(contentHtml);


        //放大初始时间

        //拿去缓存数据
        var data = _CacheFun._getCache("jqGrid14");
        internetTV.initGridTab("123");
        internetTV.loadGridTableCommon(data);
        
    },
    addBigWinOfEchartsOfPie: function(par) {
        /*var docWidth = $(document).width();
        var docHeight = $(document).height();
        var winWidth = docWidth * 0.7;
        var winHeight = docHeight * 0.5;*/
        var docWidth=$('body').width();
        var docHeight=$('body').height();
        var winWidth=docWidth*0.8;
        var winHeight=400;
        var win = new LSMScreen.SimpleWindow({
            title: "卡顿详情("+par+"点)",
            /*width: winWidth,
            height: winHeight,
            x: (docWidth - winWidth) * 0.5,
            y: (docHeight - winHeight) * 0.5,*/
            width:winWidth,
            height:winHeight,
            x:(docWidth-winWidth)/2,
            y:50,
    		modal:true,
            beforeClose: function() {}
        });
        var contentHtml = '';

        contentHtml += '<div name="time" style="height:21px">' +
            //'<span class="fr" style="margin-right: 60px;color: #fff;font-size: 20px;">时</span>' +
            '<input id="echarts_time" class="Wdate TimeFiled fl" style="width: 137px;float: right;border: none;color: #fff;background: none;cursor: pointer;font-size: 20px;height:27px" onclick="WdatePicker({dateFmt : \'yyyy-MM-dd HH\',maxDate:\'%y-%M-{%d} 23\'})"/>' +
            '</div>' +
            '<div id="echartsPie" style="width:100%;height:90%"></div>';

        $(win.content).html(contentHtml);
        internetTV.loadEchartsDataOfPie(CURRYEAR+par);
        
    },
    addBigWinOfTime: function(evet) {
        var currEcharts = $(this).attr('name');
        TIMEOFECHARTS = currEcharts;
        if (addBigWinOfTime.win == null) {
                /*var docWidth = $(document).width();
                var docHeight = $(document).height();
                var winWidth = 450;
                var winHeight = 251;*/
                var docWidth=$('body').width();
                var winWidth=docWidth*0.24*0.9;
                var winHeight=110;
                var winX=$(evet.currentTarget).parent().parent().offset().left+winWidth*0.05;
                var winY=$(evet.currentTarget).parent().parent().offset().top+72;

                addBigWinOfTime.win = new LSMScreen.SimpleWindow({
                    title: "选择时间",
                    width: winWidth,
                    height: winHeight,
                    x: winX,
                    y: winY,
            		modal:true,
                    /*x: (docWidth - winWidth) * 0.5,
                    y: (docHeight - winHeight) * 0.5,*/
                    beforeClose: function() {}
                });
                var contentHtml = '';
                contentHtml += '<div style="">'
                            +     '<div>' 
                            +        '<span style="color:#fff;font-size:16px">选择时间</span><span style="color:#fff;padding:0px 5px">:</span>' 
                            +        '<input id="startTime" class="Wdate TimeFiled" style="width: 123px;height: 24px;color: #fff;cursor: pointer;font-size: 16px;" onclick="WdatePicker({dateFmt : \'yyyy-MM-dd\',maxDate:\'%y-%M-{%d} 23\'})"/>' 
                            +        '<input name="'+currEcharts+'" type="button" class="btn btn-success btn-xs" value="确定">'
                            +     '</div>' 
                           // +     '<div style="padding-top: 20px;text-align:center;">'
                            //+     '</div>'
                            +  '</div>'; 

                $(addBigWinOfTime.win.content).html(contentHtml);

                internetTV.initTime();

               $(addBigWinOfTime.win.content).find(":button").on('click',function(evt){
                if($(evt.currentTarget).val()=="确定"){
                    var whatType = TIMEOFECHARTS; 
                    //var whatType = $(evt.currentTarget).attr('name'); 
                    if (whatType == "echarts01") {
                        internetTV.loadEchartsDataOfIndexAndRate01(whatType);
                    }else if ( whatType == "echarts10" || whatType == "echarts11" || whatType == "echarts12") {
                        internetTV.loadEchartsDataOfIndexAndRate(whatType);
                    }else if(whatType == "echarts02" || whatType == "echarts03" || whatType == "echarts04" ){
                        internetTV.loadEchartsDataOfIndex234(whatType);
                    }else{
                        internetTV.loadEchartsDataOfIndex(whatType);
                    }
                }
                 addBigWinOfTime.win.closeWin(); 
               });       
        }else{
               $("body").append(addBigWinOfTime.win.win);
        };
    },
    addBigWinOfTimeSlot: function(evet) {
        var currEcharts = $(this).attr('name');
        TIMEOFECHARTS = currEcharts;
        if (addBigWinOfTimeSlot.win == null) {
                /*var docWidth = $(document).width();
                var docHeight = $(document).height();
                var winWidth = 450;
                var winHeight = 251;*/
                /*var docWidth=$('body').width();
                //var winWidth=docWidth*0.24*0.9;
                var winWidth=docWidth*0.34*0.9;
                var winHeight=150;
                var winX=$(evet.currentTarget).parent().parent().offset().left+winWidth*0.25;
                var winY=$(evet.currentTarget).parent().parent().offset().top+52;*/

                var docWidth=$(evet.currentTarget).parent().parent().width();
                var docHeight=$(evet.currentTarget).parent().parent().height();
                var winWidth=docWidth*0.7;
                var winHeight=150;
                var winX=(docWidth - winWidth) * 0.5;
                var winY=(docHeight - winHeight) * 0.5;

                addBigWinOfTimeSlot.win = new LSMScreen.SimpleWindow({
                    title: "选择时间",
                    /*width: winWidth,
                    height: winHeight,
                    x: (docWidth - winWidth) * 0.5,
                    y: (docHeight - winHeight) * 0.5,*/
                    width: winWidth,
                    height: winHeight,
                    x: winX,
                    y: winY,
                    parentDom:$(evet.currentTarget).parent().parent()[0],
                    hideOnClose:true,
            		modal:true,
                    beforeClose: function() {}
                });
                var contentHtml = '';
                contentHtml += '<div style="" >'
                            +     '<div style="padding-left:20px">' 
                            +        '<span style="color:#fff;font-size:19px">开始时间</span><span style="color:#fff;padding:0px 10px">:</span>' 
                            +        '<input id="startTime" class="Wdate TimeFiled" style="width: 192px;height: 30px;color: #fff;cursor: pointer;font-size: 19px;" onclick="WdatePicker({dateFmt : \'yyyy-MM-dd HH\',maxDate:\'%y-%M-{%d} 23\'})"/>' 
                            +     '</div>' 
                            +     '<div style="padding-left:20px;margin-top: 17px;">' 
                            +        '<span style="color:#fff;font-size:19px">结束时间</span><span style="color:#fff;padding:0px 10px">:</span>' 
                            +        '<input id="endTime" class="Wdate TimeFiled" style="width: 192px;height: 30px;color: #fff;cursor: pointer;font-size: 19px;" onclick="WdatePicker({dateFmt : \'yyyy-MM-dd HH\',maxDate:\'%y-%M-{%d} 23\'})"/>' 
                            +        '<input name="'+currEcharts+'" type="button" style="margin-left:10px;margin-top: -6px;" class="btn btn-success btn-xs" value="确定">'
                            +     '</div>' 
                            //+     '<div style="padding-top: 20px;text-align:center;">'
                            //+     '</div>'
                            +  '</div>'; 

                $(addBigWinOfTimeSlot.win.content).html(contentHtml);

                internetTV.initTimeOfSlot(currEcharts);

               $(addBigWinOfTimeSlot.win.content).find(":button").on('click',function(evt){
                if($(evt.currentTarget).val()=="确定"){
                    var whatType = TIMEOFECHARTS;
                    //var whatType = $(evt.currentTarget).attr('name');
                    if (whatType == "echarts13") {
                        internetTV.loadEchartsDataOfBarBar(whatType);
                    }else if (whatType == "jqGrid14") {
                        internetTV.loadGridTabData(whatType);
                    }else{
                        internetTV.loadEchartsDataOfRate(whatType);
                    }

                    
                }
               addBigWinOfTimeSlot.win.closeWin(); 
               });        
        }else{
               //$("body").append(addBigWinOfTimeSlot.win.win);
               addBigWinOfTimeSlot.win.show();
        }
    },
    addBigWinOfTimeSlotOfjqGrid14: function(evet) {
        var currEcharts = $(this).attr('name');
        TIMEOFECHARTS = currEcharts;
        if (addBigWinOfTimeSlotOfjqGrid14.win == null) {
                /*var docWidth = $(document).width();
                var docHeight = $(document).height();
                var winWidth = 450;
                var winHeight = 251;*/
                 /*var docWidth=$('body').width();
                //var winWidth=docWidth*0.24*0.9;
                var winWidth=docWidth*0.34*0.9;
                var winHeight=150;
                var winX=$(evet.currentTarget).parent().parent().offset().left+winWidth*0.25;
                var winY=$(evet.currentTarget).parent().parent().offset().top+52;*/

                var docWidth=$(evet.currentTarget).parent().parent().width();
                var docHeight=$(evet.currentTarget).parent().parent().height();
                var winWidth=docWidth*0.7;
                var winHeight=150;
                var winX=(docWidth - winWidth) * 0.5;
                var winY=(docHeight - winHeight) * 0.5;
                addBigWinOfTimeSlotOfjqGrid14.win = new LSMScreen.SimpleWindow({
                    title: "选择时间",
                    width: winWidth,
                    height: winHeight,
                    x: winX,
                    y: winY,
                    parentDom:$(evet.currentTarget).parent().parent()[0],
                    hideOnClose:true,
            		modal:true,
                    beforeClose: function() {}
                });
                var contentHtml = '';
                contentHtml += '<div style="" >'
                            +     '<div style="padding-left:20px">' 
                            +        '<span style="color:#fff;font-size:19px">开始时间</span><span style="color:#fff;padding:0px 10px">:</span>' 
                            +        '<input id="startTime_'+currEcharts+'" class="Wdate TimeFiled" style="width: 192px;height: 30px;color: #fff;cursor: pointer;font-size: 19px;" onclick="WdatePicker({dateFmt : \'yyyy-MM-dd HH\',maxDate:\'%y-%M-{%d} 23\'})"/>' 
                            +     '</div>' 
                            +     '<div style="padding-left:20px;margin-top: 17px;">' 
                            +        '<span style="color:#fff;font-size:19px">结束时间</span><span style="color:#fff;padding:0px 10px">:</span>' 
                            +        '<input id="endTime_'+currEcharts+'" class="Wdate TimeFiled" style="width: 192px;height: 30px;color: #fff;cursor: pointer;font-size: 19px;" onclick="WdatePicker({dateFmt : \'yyyy-MM-dd HH\',maxDate:\'%y-%M-{%d} 23\'})"/>' 
                            +        '<input name="'+currEcharts+'" type="button" style="margin-left:10px;margin-top: -6px;" class="btn btn-success btn-xs" value="确定">'
                            +     '</div>' 
                            //+     '<div style="padding-top: 20px;text-align:center;">'
                            //+     '</div>'
                            +  '</div>'; 

                $(addBigWinOfTimeSlotOfjqGrid14.win.content).html(contentHtml);

                internetTV.initTimeOfSlot(currEcharts);

               $(addBigWinOfTimeSlotOfjqGrid14.win.content).find(":button").on('click',function(evt){
                if($(evt.currentTarget).val()=="确定"){
                    var whatType = TIMEOFECHARTS;
                    //var whatType = $(evt.currentTarget).attr('name');
                    if (whatType == "echarts13") {
                        internetTV.loadEchartsDataOfBarBar(whatType);
                    }else if (whatType == "jqGrid14") {
                        internetTV.loadGridTabData(whatType);
                    }else{
                        internetTV.loadEchartsDataOfRate(whatType);
                    }

                    
                }
               addBigWinOfTimeSlotOfjqGrid14.win.closeWin(); 
               });        
        }else{
               //$("body").append(addBigWinOfTimeSlotOfjqGrid14.win.win);
               addBigWinOfTimeSlotOfjqGrid14.win.show();
        }
    },
    initEcharts: function() {

        //echarts01
        /*var xx = [];
        var yy = [];
        var yy0 = [];
        var yy1 = [];
        for (var i = 0; i < 5; i++) {
            xx.push((Math.random() * 1000).toFixed(0));
            yy0.push((Math.random() * 1000).toFixed(2));
            yy1.push((Math.random() * 1000).toFixed(2));
        };
        yy.push(yy0);
        yy.push(yy1);
        eastcom_echarts_line.loadDataToChart("echarts01", xx, yy,0);
        //緩存数据
        var data = {
            xx: xx,
            yy: yy
        };
        _CacheFun._bindCache("echarts01", data);*/

        //echarts02
        /*var xx = [];
        var yy = [];
        var yy0 = [];
        var yy1 = [];
        for (var i = 0; i < 5; i++) {
            xx.push((Math.random() * 1000).toFixed(0));
            yy0.push((Math.random() * 1000).toFixed(2));
            yy1.push((Math.random() * 1000).toFixed(2));
        };
        yy.push(yy0);
        yy.push(yy1);
        eastcom_echarts_line.loadDataToChart("echarts02", xx, yy,30);
        //緩存数据
        var data = {
            xx: xx,
            yy: yy
        };
        _CacheFun._bindCache("echarts02", data);*/

        //echarts03
        /*var xx = [];
        var yy = [];
        var yy0 = [];
        var yy1 = [];
        for (var i = 0; i < 5; i++) {
            xx.push((Math.random() * 1000).toFixed(0));
            yy0.push((Math.random() * 1000).toFixed(2));
            yy1.push((Math.random() * 1000).toFixed(2));
        };
        yy.push(yy0);
        yy.push(yy1);
        eastcom_echarts_line.loadDataToChart("echarts03", xx, yy,0);
        //緩存数据
        var data = {
            xx: xx,
            yy: yy
        };
        _CacheFun._bindCache("echarts03", data);*/

        //echarts04
        /*var xx = [];
        var yy = [];
        var yy0 = [];
        var yy1 = [];
        for (var i = 0; i < 5; i++) {
            xx.push((Math.random() * 1000).toFixed(0));
            yy0.push((Math.random() * 1000).toFixed(2));
            yy1.push((Math.random() * 1000).toFixed(2));
        };
        yy.push(yy0);
        yy.push(yy1);
        eastcom_echarts_line.loadDataToChart("echarts04", xx, yy,50);
        //緩存数据
        var data = {
            xx: xx,
            yy: yy
        };
        _CacheFun._bindCache("echarts04", data);*/


        //echarts05
        /*var xx = [];
        var yy = [];
        var yy0 = [];
        var yy1 = [];
        for (var i = 0; i < 5; i++) {
            xx.push((Math.random() * 1000).toFixed(0));
            yy0.push((Math.random() * 1000).toFixed(2));
            yy1.push((Math.random() * 1000).toFixed(2));
        };
        yy.push(yy0);
        yy.push(yy1);
        eastcom_echarts_line_rate.loadDataToChart("echarts05", xx, yy);
        //緩存数据
        var data = {
            xx: xx,
            yy: yy
        };
        _CacheFun._bindCache("echarts05", data);*/


        //echarts06
        /*var xx = [];
        var yy = [];
        var yy0 = [];
        var yy1 = [];
        for (var i = 0; i < 5; i++) {
            xx.push((Math.random() * 1000).toFixed(0));
            yy0.push((Math.random() * 1000).toFixed(2));
            yy1.push((Math.random() * 1000).toFixed(2));
        };
        yy.push(yy0);
        yy.push(yy1);
        eastcom_echarts_line.loadDataToChart("echarts06", xx, yy);
        //緩存数据
        var data = {
            xx: xx,
            yy: yy
        };
        _CacheFun._bindCache("echarts06", data);*/


        //echarts07
        /*var xx = [];
        var yy = [];
        var yy0 = [];
        var yy1 = [];
        for (var i = 0; i < 5; i++) {
            xx.push((Math.random() * 1000).toFixed(0));
            yy0.push((Math.random() * 1000).toFixed(2));
            yy1.push((Math.random() * 1000).toFixed(2));
        };
        yy.push(yy0);
        yy.push(yy1);
        eastcom_echarts_line.loadDataToChart("echarts07", xx, yy);
        //緩存数据
        var data = {
            xx: xx,
            yy: yy
        };
        _CacheFun._bindCache("echarts07", data);*/


        //echarts08
        /*var xx = [];
        var yy = [];
        var yy0 = [];
        var yy1 = [];
        for (var i = 0; i < 5; i++) {
            xx.push((Math.random() * 1000).toFixed(0));
            yy0.push((Math.random() * 1000).toFixed(2));
            yy1.push((Math.random() * 1000).toFixed(2));
        };
        yy.push(yy0);
        yy.push(yy1);
        eastcom_echarts_line_rate.loadDataToChart("echarts08", xx, yy);
        //緩存数据
        var data = {
            xx: xx,
            yy: yy
        };
        _CacheFun._bindCache("echarts08", data);*/

        //echarts09
        /*var xx = [];
        var yy = [];
        var yy0 = [];
        var yy1 = [];
        for (var i = 0; i < 5; i++) {
            xx.push((Math.random() * 1000).toFixed(0));
            yy0.push((Math.random() * 1000).toFixed(2));
            yy1.push((Math.random() * 1000).toFixed(2));
        };
        yy.push(yy0);
        yy.push(yy1);
        eastcom_echarts_line_rate.loadDataToChart("echarts09", xx, yy);
        //緩存数据
        var data = {
            xx: xx,
            yy: yy
        };
        _CacheFun._bindCache("echarts09", data);*/

        //echarts10
        /*var xx = [];
        var yy = [];
        var yy0 = [];
        var yy1 = [];
        for (var i = 0; i < 5; i++) {
            xx.push((Math.random() * 1000).toFixed(0));
            yy0.push((Math.random() * 1000).toFixed(2));
            yy1.push((Math.random() * 1000).toFixed(2));
        };
        yy.push(yy0);
        yy.push(yy1);
        eastcom_echarts_line_bar.loadDataToChart("echarts10", xx, yy);
        //緩存数据
        var data = {
            xx: xx,
            yy: yy
        };
        _CacheFun._bindCache("echarts10", data);*/

        //echarts11
        /*var xx = [];
        var yy = [];
        var yy0 = [];
        var yy1 = [];
        for (var i = 0; i < 5; i++) {
            xx.push((Math.random() * 1000).toFixed(0));
            yy0.push((Math.random() * 1000).toFixed(2));
            yy1.push((Math.random() * 1000).toFixed(2));
        };
        yy.push(yy0);
        yy.push(yy1);
        eastcom_echarts_line_bar.loadDataToChart("echarts11", xx, yy);
        //緩存数据
        var data = {
            xx: xx,
            yy: yy
        };
        _CacheFun._bindCache("echarts11", data);*/

        //echarts12
        /*var xx = [];
        var yy = [];
        var yy0 = [];
        var yy1 = [];
        for (var i = 0; i < 5; i++) {
            xx.push((Math.random() * 1000).toFixed(0));
            yy0.push((Math.random() * 1000).toFixed(2));
            yy1.push((Math.random() * 1000).toFixed(2));
        };
        yy.push(yy0);
        yy.push(yy1);
        eastcom_echarts_line_bar.loadDataToChart("echarts12", xx, yy);
        //緩存数据
        var data = {
            xx: xx,
            yy: yy
        };
        _CacheFun._bindCache("echarts12", data);*/

        //echarts13
        /*var xx = [];
        var yy = [];
        var yy0 = [];
        var yy1 = [];
        var yy2 = [];
        var yy3 = [];
        for (var i = 0; i < 5; i++) {
            xx.push((Math.random() * 1000).toFixed(0));
            yy0.push((Math.random() * 1000).toFixed(2));
            yy1.push((Math.random() * 1000).toFixed(2));
            yy2.push((Math.random() * 1000).toFixed(2));
            yy3.push((Math.random() * 1000).toFixed(2));
        };
        yy.push(yy0);
        yy.push(yy1);
        yy.push(yy2);
        yy.push(yy3);
        eastcom_echarts_bar_bar.loadDataToChart("echarts13", xx, yy);
        //緩存数据
        var data = {
            xx: xx,
            yy: yy
        };
        _CacheFun._bindCache("echarts13", data);*/
    },
    initGridTab: function(id) {
        var gridId = "gridTable";
        if (id) {
            gridId = "gridTableCommon";
        }
        var colModel=[
                {label:"统计时间",name:'rpt_time',index:'rpt_time', width:200,align:"center"},
                {label:"服务器IP",name:'server_ip',index:'server_ip', width:160,align:"center"},
                //{label:"归属（CDN/其他等）",name:'userName',index:'userName', width:80,align:"center",hidden:true},
                {label:"请求数",name:'req_cnt',index:'req_cnt', width:80,align:"center"},
                {label:"请求成功率(%)",name:'req_succ_ratio',index:'req_succ_ratio', width:150,align:"center"},
                {label:"HTTP响应时延(ms)",name:'http_resp_time',index:'http_resp_time',width:180,align:"center"},                
                {label:"用户问题",name:'error_code_4xx_cnt',index:'error_code_4xx_cnt', width:120,align:"center"},                
                {label:"服务器问题",name:'error_code_5xx_cnt',index:'error_code_5xx_cnt', width:120,align:"center"},                
                {label:"卡屏次数",name:'screen_jammed_num',index:'screen_jammed_num', width:100,align:"center"},                
                //{label:"卡屏时间(us)",name:'screen_jammed_duration',index:'screen_jammed_duration', width:120, align:"center"}               
            ];
        
        var shrinkToFit = false;
        if (gridId == "gridTableCommon") {
            if ($("#echartsCommon").width() > 1110) {
                shrinkToFit = true;
            }
        }

        $("#"+gridId).jqGrid({
            datatype: "local",
            height: gridId == "gridTable"?168:$("#echartsCommon").parent().height()-54,
            colModel: colModel,
            autowidth: true, 
            //shrinkToFit: gridId == "gridTable"?false:true,
            shrinkToFit: shrinkToFit,
            rowNum:999999999,
            //sortable: false, //如果sortable设置成true，就不能冻结了。
            //viewrecords:true,
            //pager: "#con_grid_div_gridPager",
            //pgtext : "{0}共{1}页",
            //caption: "第一个jqGrid例子",
            onSelectRow: function(rowid, status) {}
        });



        /*var mydata = [
                {id:"1",userName:"polaris",gender:"男",email:"fef@163.com",QQ:"33334444",mobilePhone:"13223423424",birthday:"1985-10-01"},
                {id:"2",userName:"李四",gender:"女",email:"faf@gmail.com",QQ:"222222222",mobilePhone:"13223423",birthday:"1986-07-01"},
                {id:"3",userName:"王五",gender:"男",email:"fae@163.com",QQ:"99999999",mobilePhone:"1322342342",birthday:"1985-10-01"},
                {id:"4",userName:"马六",gender:"女",email:"aaaa@gmail.com",QQ:"23333333",mobilePhone:"132234662",birthday:"1987-05-01"},
                {id:"5",userName:"赵钱",gender:"男",email:"4fja@gmail.com",QQ:"22222222",mobilePhone:"1343434662",birthday:"1982-10-01"},
                {id:"6",userName:"小毛",gender:"男",email:"ahfi@yahoo.com",QQ:"4333333",mobilePhone:"1328884662",birthday:"1987-12-01"},
                {id:"7",userName:"小李",gender:"女",email:"note@sina.com",QQ:"21122323",mobilePhone:"13220046620",birthday:"1985-10-01"},
                {id:"8",userName:"小三",gender:"男",email:"oefh@sohu.com",QQ:"242424366",mobilePhone:"1327734662",birthday:"1988-12-01"},
                {id:"9",userName:"孙先",gender:"男",email:"76454533@qq.com",QQ:"76454533",mobilePhone:"132290062",birthday:"1989-11-21"}
            ];
        for(var i=0;i<=mydata.length;i++){
                          jQuery("#gridTable").jqGrid('addRowData',i+1,mydata[i]);
                      };
        $("#gridTable").trigger("reloadGrid"); 
*/
    },
    loadGridTabData:function(par){
            var startTimeStr = $("#startTime_"+par).val();
            var endTimeStr = $("#endTime_"+par).val();
            var stat_time,end_time;
            if ( startTimeStr == undefined) {
                var newDate = new Date();
                newDate.setHours(newDate.getHours() - 4);   ////tableTime
                var endDate = new Date();
                endDate.setHours(endDate.getHours());
                stat_time = newDate.Format("yyyyMMddhh00");
                end_time = endDate.Format("yyyyMMddhh00");
            }else{
                stat_time = (startTimeStr.replace(/-/g,"").replace(/:/g,"").replace(/ /g,"")+"0000000").substring(0,12);
                end_time = (endTimeStr.replace(/-/g,"").replace(/:/g,"").replace(/ /g,"")+"0000000").substring(0,12);
            }
            var  param = {
                          stat_time:stat_time,
                          end_time :end_time,
                          FLUSHCACHE:"true" 
            };
            $("#jqGrid14").mask(' ');
            $("#gridTable").clearGridData();
            //jQuery("jqGrid14").jqGrid('clearGridData');
            $.ajax({
                url :LSMConsts.G_URLCONFIG.baseUrl+"/services/sml/query/cfg-screen-tv-server-pf",
                type : 'post',
                async : true,
                dataType : "json",
                contentType :"application/json",
                data:JSON.stringify(param),
                success : function(data) {
                    var resultArr = data.data;
                    _CacheFun._bindCache("jqGrid14", resultArr);

                     
                    $("#gridTable").jqGrid('setGridParam', {
                        datatype : 'local',
                        data : resultArr
                      }).trigger("reloadGrid");
                   /* for (var i = 0; i < resultArr.length; i++) {
                            jQuery("#gridTable").jqGrid('addRowData',i+1,resultArr[i]);
                            $("#gridTable").trigger("reloadGrid"); 
                    };*/
                },
                complete: function(XMLHttpRequest, textStatus){
                      //HideLoading();
                      $("#jqGrid14").unmask();
                },
                error: function(){
                      //请求出错处理
                }
        });






            /*$("#gridTable").jqGrid("setGridParam", {
                      url : LSMConsts.G_URLCONFIG.baseUrl+"/services/sml/query/cfg-screen-tv-server-pf",
                      datatype : "json",
                      mtype : 'POST',
                      jsonReader:{
                        root: "data.elements",
                        records:"data.total",
                        total:"data.pageNum",
                        page:"data.pageNo"
                      },
                      postData : {params:JSON.stringify(data)},
                      page : 1
                    }).trigger("reloadGrid");*/
    },
    loadGridTableCommon:function(resultArr){
        /*for (var i = 0; i < resultArr.length; i++) {
                jQuery("#gridTableCommon").jqGrid('addRowData',i+1,resultArr[i]);
                $("#gridTableCommon").trigger("reloadGrid"); 
        };*/
        $("#gridTableCommon").clearGridData();
        $("#gridTableCommon").jqGrid('setGridParam', {
                        datatype : 'local',
                        data : resultArr
                      }).trigger("reloadGrid");
    },
    loadEchartsDataOfIndex234:function(par){
        var  xx02 = [];
        var  yy02 = [];
        var  yy02_today = [];
        var  yy02_yesterday = [];

        var  xx03 = [];
        var  yy03 = [];
        var  yy03_today = [];
        var  yy03_yesterday = [];

        var  xx04 = [];
        var  yy04 = [];
        var  yy04_today = [];
        var  yy04_yesterday = [];

        //昨日数据
        var startTimeStr = $("#startTime_"+par).val();
        var endTimeStr = $("#startTime_"+par).val();
        var stat_time_yesterday,end_time_yesterday;
        if ( startTimeStr == undefined) {
            var newDate = new Date();
            newDate.setDate(newDate.getDate() - 1);
            newDate.setHours(newDate.getHours() - 12);
            var endDate = new Date();
            endDate.setDate(endDate.getDate() - 1);
            stat_time_yesterday = newDate.Format("yyyyMMddhh00");
            end_time_yesterday = endDate.Format("yyyyMMddhh00");
        }else{
            var bioaDate = new Date();

            var newDate = new Date(startTimeStr);  
            newDate.setHours(bioaDate.getHours() - 12);
            var endDate = new Date(endTimeStr);  
            endDate.setHours(bioaDate.getHours());
            stat_time_yesterday = newDate.Format("yyyyMMddhh00");
            end_time_yesterday = endDate.Format("yyyyMMddhh00");


            //stat_time_yesterday = (startTimeStr.replace(/-/g,"").replace(/:/g,"").replace(/ /g,"")+"0000000").substring(0,12);
            //end_time_yesterday = (endTimeStr.replace(/-/g,"").replace(/:/g,"").replace(/ /g,"")+"2300000").substring(0,12);
        }


        
        
        //当天数据
        var nowDate = new Date();
        nowDate.setHours(nowDate.getHours() - 12);

        var endDate = new Date();
        var stat_time_today = nowDate.Format("yyyyMMddhh00");
        var end_time_today = endDate.Format("yyyyMMddhh00");
        var param = {
                stat_time:stat_time_today,
                end_time:end_time_today,
                stat_time_:stat_time_yesterday,
                end_time_:end_time_yesterday,
                queryType:'hour',
                kpiType:'user',
                FLUSHCACHE:"true"
        };
        $.ajax({
                url :LSMConsts.G_URLCONFIG.baseUrl+"/services/sml/query/cfg-screen-tv-kpi",
                type : 'post',
                async : false,
                dataType : "json",
                contentType :"application/json",
                data:JSON.stringify(param),
                success : function(data) {
                    var resultArr = data.data;
                    for (var i = 0; i < resultArr.length; i++) {
                                var currObj = resultArr[i];

                                xx02.push(currObj.time_id.substring(11,16));
                                yy02_today.push(currObj.online_user_num ==null?"-":currObj.online_user_num);
                                yy02_yesterday.push(currObj.online_user_num ==null?"-":currObj.online_user_num-5000);

                                xx03.push(currObj.time_id.substring(11,16));
                                yy03_today.push(currObj.live_num ==null?"-":currObj.live_num);
                                yy03_yesterday.push(currObj.live_num ==null?"-":currObj.live_num-5000);

                                xx04.push(currObj.time_id.substring(11,16));
                                yy04_today.push(currObj.request_num ==null?"-":currObj.request_num);
                                yy04_yesterday.push(currObj.request_num_ ==null?"-":currObj.request_num_);


                               
                    };
                },
                complete: function(XMLHttpRequest, textStatus){
                      //HideLoading();
                      
                      
                },
                error: function(){
                      //请求出错处理
                }
        });
        //昨日数据
        /*var startTimeStr = $("#startTime").val();
        var endTimeStr = $("#startTime").val();
        var stat_time_yesterday,end_time_yesterday;
        if ( startTimeStr == undefined) {
            var newDate = new Date();
            newDate.setDate(newDate.getDate() - 1);
            newDate.setHours(newDate.getHours() - 12);
            var endDate = new Date();
            endDate.setDate(endDate.getDate() - 1);
            stat_time_yesterday = newDate.Format("yyyyMMddhh00");
            end_time_yesterday = endDate.Format("yyyyMMddhh00");
        }else{
            var bioaDate = new Date();

            var newDate = new Date(startTimeStr);  
            newDate.setHours(bioaDate.getHours() - 12);
            var endDate = new Date(endTimeStr);  
            endDate.setHours(bioaDate.getHours());
            stat_time_yesterday = newDate.Format("yyyyMMddhh00");
            end_time_yesterday = endDate.Format("yyyyMMddhh00");


            //stat_time_yesterday = (startTimeStr.replace(/-/g,"").replace(/:/g,"").replace(/ /g,"")+"0000000").substring(0,12);
            //end_time_yesterday = (endTimeStr.replace(/-/g,"").replace(/:/g,"").replace(/ /g,"")+"2300000").substring(0,12);
        }
        
        var param = {
                stat_time:stat_time_yesterday,
                end_time:end_time_yesterday,
                queryType:'hour',
                kpiType:'user',
                FLUSHCACHE:"true"
        };
        $.ajax({
                url :LSMConsts.G_URLCONFIG.baseUrl+"/services/sml/query/cfg-screen-tv-kpi",
                type : 'post',
                async : false,
                dataType : "json",
                contentType :"application/json",
                data:JSON.stringify(param),
                success : function(data) {
                    var resultArr = data.data;
                    for (var i = 0; i < resultArr.length; i++) {
                                var currObj = resultArr[i];

                                //xx06.push(currObj.time_id.replace(":00:00","").substring(5,30));
                                yy02_yesterday.push(currObj.online_user_num ==null?"0":currObj.online_user_num);
                                yy03_yesterday.push(currObj.live_num ==null?"0":currObj.live_num);
                                yy04_yesterday.push(currObj.request_num ==null?"0":currObj.request_num);

                    };
                },
                complete: function(XMLHttpRequest, textStatus){
                      //HideLoading();
                },
                error: function(){
                      //请求出错处理
                }
        });*/

        if (par == undefined || par == "echarts02" ) {
            $("#echarts02").mask(' ');
            //组装数据 
            yy02.push(yy02_today);
            yy02.push(yy02_yesterday);
            //开始画图
            eastcom_echarts_line.loadDataToChart("echarts02", xx02, yy02);
            setTimeout(' $("#echarts02").unmask();',LOADINGTIME);
           
            //緩存数据
            var data = {xx: xx02,yy: yy02};
           _CacheFun._bindCache("echarts02", data);
        };
        if (par == undefined || par == "echarts03" ) {
            $("#echarts03").mask(' ');
            //组装数据 
            yy03.push(yy03_today);
            yy03.push(yy03_yesterday);
            //开始画图
            eastcom_echarts_line.loadDataToChart("echarts03", xx03, yy03);
            setTimeout(' $("#echarts03").unmask();',LOADINGTIME);
            //緩存数据
            var data = {xx: xx03,yy: yy03};
           _CacheFun._bindCache("echarts03", data);
        };
        if (par == undefined || par == "echarts04" ) {
            $("#echarts04").mask(' ');
            //组装数据 
            yy04.push(yy04_today);
            yy04.push(yy04_yesterday);
            //开始画图
            eastcom_echarts_line.loadDataToChart("echarts04", xx04, yy04);
            setTimeout(' $("#echarts04").unmask();',LOADINGTIME);
            //緩存数据
            var data = {xx: xx04,yy: yy04};
           _CacheFun._bindCache("echarts04", data);
        };


        
    }, 
    loadEchartsDataOfIndex:function(par){
        /*var  xx02 = [];
        var  yy02 = [];
        var  yy02_today = [];
        var  yy02_yesterday = [];

        var  xx03 = [];
        var  yy03 = [];
        var  yy03_today = [];
        var  yy03_yesterday = [];

        var  xx04 = [];
        var  yy04 = [];
        var  yy04_today = [];
        var  yy04_yesterday = [];*/




        var  xx06 = [];
        var  yy06 = [];
        var  yy06_today = [];
        var  yy06_yesterday = [];

        var  xx07 = [];
        var  yy07 = [];
        var  yy07_today = [];
        var  yy07_yesterday = [];

        var  xx05 = [];
        var  yy05 = [];
        var  yy05_today = [];
        var  yy05_yesterday = [];

        var  xx08 = [];
        var  yy08 = [];
        var  yy08_today = [];
        var  yy08_yesterday = [];

        var  xx09 = [];
        var  yy09 = [];
        var  yy09_today = [];
        var  yy09_yesterday = [];
        
        var  xx_add01 = [];
        var  yy_add01 = [];
        var  yy_add01_today = [];
        var  yy_add01_yesterday = [];
        
        var  xx_add02 = [];
        var  yy_add02 = [];
        var  yy_add02_today = [];
        var  yy_add02_yesterday = [];
        
        var  xx_add03 = [];
        var  yy_add03 = [];
        var  yy_add03_today = [];
        var  yy_add03_yesterday = [];
        
        //昨日数据
        var startTimeStr = $("#startTime_"+par).val();
        var endTimeStr = $("#startTime_"+par).val();
        var stat_time_yesterday,end_time_yesterday;
        if ( startTimeStr == undefined) {
            var newDate = new Date();
            newDate.setDate(newDate.getDate() - 1);
            newDate.setHours(newDate.getHours() - 12);
            var endDate = new Date();
            endDate.setDate(endDate.getDate() - 1);
            stat_time_yesterday = newDate.Format("yyyyMMddhh00");
            end_time_yesterday = endDate.Format("yyyyMMddhh00");
        }else{
            var bioaDate = new Date();

            var newDate = new Date(startTimeStr);  
            newDate.setHours(bioaDate.getHours() - 12);
            var endDate = new Date(endTimeStr);  
            endDate.setHours(bioaDate.getHours());
            stat_time_yesterday = newDate.Format("yyyyMMddhh00");
            end_time_yesterday = endDate.Format("yyyyMMddhh00");
        } 
        
        //当天数据
        var nowDate = new Date();
        nowDate.setHours(nowDate.getHours() - 12);

        var endDate = new Date();
        var stat_time_today = nowDate.Format("yyyyMMddhh00");
        var end_time_today = endDate.Format("yyyyMMddhh00");
        var param = {
                stat_time:stat_time_today,
                end_time:end_time_today,
                stat_time_:stat_time_yesterday,
                end_time_:end_time_yesterday,
                queryType:'hour',
                kpiType:'prov',
                FLUSHCACHE:"true"
        };
        $.ajax({
                url :LSMConsts.G_URLCONFIG.baseUrl+"/services/sml/query/cfg-screen-tv-kpi",
                type : 'post',
                async : false,
                dataType : "json",
                contentType :"application/json",
                data:JSON.stringify(param),
                success : function(data) {
                    var resultArr = data.data;
                    for (var i = 0; i < resultArr.length; i++) {
                                var currObj = resultArr[i];

                                /*xx02.push(currObj.time_id.substring(11,16));
                                yy02_today.push(currObj.online_user_num ==null?"0":currObj.online_user_num);

                                xx03.push(currObj.time_id.substring(11,16));
                                yy03_today.push(currObj.live_num ==null?"0":currObj.live_num);

                                xx04.push(currObj.time_id.substring(11,16));
                                yy04_today.push(currObj.request_num ==null?"0":currObj.request_num);*/



                                xx06.push(currObj.time_id.substring(11,16));
                                yy06_today.push(currObj.play_res_delay ==null?"-":currObj.play_res_delay);
                                yy06_yesterday.push(currObj.play_res_delay_ ==null?"-":currObj.play_res_delay_);

                                xx07.push(currObj.time_id.substring(11,16));
                                yy07_today.push(currObj.epg_resp_delay ==null?"-":currObj.epg_resp_delay);
                                yy07_yesterday.push(currObj.epg_resp_delay_ ==null?"-":currObj.epg_resp_delay_);

                                xx05.push(currObj.time_id.substring(11,16));
                                yy05_today.push(currObj.play_succ_ratio ==null?"-":currObj.play_succ_ratio);
                                yy05_yesterday.push(currObj.play_succ_ratio_ ==null?"-":currObj.play_succ_ratio_);

                                xx08.push(currObj.time_id.substring(11,16));
                                yy08_today.push(currObj.screen_jammed_duration_ratio ==null?"-":currObj.screen_jammed_duration_ratio);
                                yy08_yesterday.push(currObj.screen_jammed_duration_ratio_ ==null?"-":currObj.screen_jammed_duration_ratio_);

                                xx09.push(currObj.time_id.substring(11,16));
                                yy09_today.push(currObj.screen_jammed_users_ratio ==null?"-":currObj.screen_jammed_users_ratio);
                                yy09_yesterday.push(currObj.screen_jammed_users_ratio_ ==null?"-":currObj.screen_jammed_users_ratio_);
                                
                                xx_add01.push(currObj.time_id.substring(11,16));
                                yy_add01_today.push(currObj.screen_jammed_num_ratio ==null?"-":currObj.screen_jammed_num_ratio);
                                yy_add01_yesterday.push(currObj.screen_jammed_num_ratio_ ==null?"-":currObj.screen_jammed_num_ratio_);

                                xx_add02.push(currObj.time_id.substring(11,16));
                                yy_add02_today.push(currObj.epg_access_succ_ratio ==null?"-":currObj.epg_access_succ_ratio);
                                yy_add02_yesterday.push(currObj.epg_access_succ_ratio_ ==null?"-":currObj.epg_access_succ_ratio_);

                                xx_add03.push(currObj.time_id.substring(11,16));
                                yy_add03_today.push(currObj.epg_resp_delay_standard_ratio ==null?"-":currObj.epg_resp_delay_standard_ratio);
                                yy_add03_yesterday.push(currObj.epg_resp_delay_standard_ratio_ ==null?"-":currObj.epg_resp_delay_standard_ratio_);

                                

                    };
                },
                complete: function(XMLHttpRequest, textStatus){
                      //HideLoading();
                      
                      
                },
                error: function(){
                      //请求出错处理
                }
        });
        //昨日数据
        /*var startTimeStr = $("#startTime").val();
        var endTimeStr = $("#startTime").val();
        var stat_time_yesterday,end_time_yesterday;
        if ( startTimeStr == undefined) {
            var newDate = new Date();
            newDate.setDate(newDate.getDate() - 1);
            newDate.setHours(newDate.getHours() - 12);
            var endDate = new Date();
            endDate.setDate(endDate.getDate() - 1);
            stat_time_yesterday = newDate.Format("yyyyMMddhh00");
            end_time_yesterday = endDate.Format("yyyyMMddhh00");
        }else{
            var bioaDate = new Date();

            var newDate = new Date(startTimeStr);  
            newDate.setHours(bioaDate.getHours() - 12);
            var endDate = new Date(endTimeStr);  
            endDate.setHours(bioaDate.getHours());
            stat_time_yesterday = newDate.Format("yyyyMMddhh00");
            end_time_yesterday = endDate.Format("yyyyMMddhh00");


            //stat_time_yesterday = (startTimeStr.replace(/-/g,"").replace(/:/g,"").replace(/ /g,"")+"0000000").substring(0,12);
            //end_time_yesterday = (endTimeStr.replace(/-/g,"").replace(/:/g,"").replace(/ /g,"")+"2300000").substring(0,12);
        }
        
        var param = {
                stat_time:stat_time_yesterday,
                end_time:end_time_yesterday,
                queryType:'hour',
                kpiType:'prov',
                FLUSHCACHE:"true"
        };
        $.ajax({
                url :LSMConsts.G_URLCONFIG.baseUrl+"/services/sml/query/cfg-screen-tv-kpi",
                type : 'post',
                async : false,
                dataType : "json",
                contentType :"application/json",
                data:JSON.stringify(param),
                success : function(data) {
                    var resultArr = data.data;
                    for (var i = 0; i < resultArr.length; i++) {
                                var currObj = resultArr[i];

                                //xx06.push(currObj.time_id.replace(":00:00","").substring(5,30));
                                // yy02_yesterday.push(currObj.online_user_num ==null?"0":currObj.online_user_num);
                                // yy03_yesterday.push(currObj.live_num ==null?"0":currObj.live_num);
                                // yy04_yesterday.push(currObj.request_num ==null?"0":currObj.request_num);


                                yy06_yesterday.push(currObj.play_res_delay ==null?"0":currObj.play_res_delay);
                                yy07_yesterday.push(currObj.epg_resp_delay ==null?"0":currObj.epg_resp_delay);


                                yy05_yesterday.push(currObj.play_succ_ratio ==null?"0":currObj.play_succ_ratio);
                                yy08_yesterday.push(currObj.screen_jammed_duration_ratio ==null?"0":currObj.screen_jammed_duration_ratio);
                                yy09_yesterday.push(currObj.screen_jammed_users_ratio ==null?"0":currObj.screen_jammed_users_ratio);

                               
                    };
                },
                complete: function(XMLHttpRequest, textStatus){
                      //HideLoading();
                },
                error: function(){
                      //请求出错处理
                }
        });*/

        /*if (par == undefined || par == "echarts02" ) {
            $("#echarts02").mask(' ');
            //组装数据 
            yy02.push(yy02_today);
            yy02.push(yy02_yesterday);
            //开始画图
            eastcom_echarts_line.loadDataToChart("echarts02", xx02, yy02);
            setTimeout(' $("#echarts02").unmask();',LOADINGTIME);
           
            //緩存数据
            var data = {xx: xx02,yy: yy02};
           _CacheFun._bindCache("echarts02", data);
        };
        if (par == undefined || par == "echarts03" ) {
            $("#echarts03").mask(' ');
            //组装数据 
            yy03.push(yy03_today);
            yy03.push(yy03_yesterday);
            //开始画图
            eastcom_echarts_line.loadDataToChart("echarts03", xx03, yy03);
            setTimeout(' $("#echarts03").unmask();',LOADINGTIME);
            //緩存数据
            var data = {xx: xx03,yy: yy03};
           _CacheFun._bindCache("echarts03", data);
        };
        if (par == undefined || par == "echarts04" ) {
            $("#echarts04").mask(' ');
            //组装数据 
            yy04.push(yy04_today);
            yy04.push(yy04_yesterday);
            //开始画图
            eastcom_echarts_line.loadDataToChart("echarts04", xx04, yy04);
            setTimeout(' $("#echarts04").unmask();',LOADINGTIME);
            //緩存数据
            var data = {xx: xx04,yy: yy04};
           _CacheFun._bindCache("echarts04", data);
        };
*/

        if (par == undefined || par == "echarts06" ) {
            $("#echarts06").mask(' ');
            //组装数据 
            yy06.push(yy06_today);
            yy06.push(yy06_yesterday);
            //开始画图
            eastcom_echarts_line.loadDataToChart("echarts06", xx06, yy06,thresholdList.play_res_delay);
            setTimeout(' $("#echarts06").unmask();',LOADINGTIME);
            //緩存数据
            var data = {xx: xx06,yy: yy06};
           _CacheFun._bindCache("echarts06", data);
        };
        /*if (par == undefined || par == "echarts07" ) {
            $("#echarts07").mask(' ');
            //组装数据 
            yy07.push(yy07_today);
            yy07.push(yy07_yesterday);
            //开始画图
            eastcom_echarts_line.loadDataToChart("echarts07", xx07, yy07,thresholdList.epg_resp_delay);
            setTimeout(' $("#echarts07").unmask();',LOADINGTIME);
            //緩存数据
            var data = {xx: xx07,yy: yy07};
           _CacheFun._bindCache("echarts07", data);
        };  */



        if (par == undefined || par == "echarts05" ) {
            $("#echarts05").mask(' ');
            //组装数据 
            yy05.push(yy05_today);
            yy05.push(yy05_yesterday);
            //开始画图
            eastcom_echarts_line.loadDataToChart("echarts05", xx05, yy05,thresholdList.play_succ_ratio);
            setTimeout(' $("#echarts05").unmask();',LOADINGTIME);
            //緩存数据
            var data = {xx: xx05,yy: yy05};
           _CacheFun._bindCache("echarts05", data);
        };
        if (par == undefined || par == "echarts08" ) {
            $("#echarts08").mask(' ');
            //组装数据 
            yy08.push(yy08_today);
            yy08.push(yy08_yesterday);
            //开始画图
            eastcom_echarts_line.loadDataToChart("echarts08", xx08, yy08,thresholdList.screen_jammed_duration_ratio);
            setTimeout(' $("#echarts08").unmask();',LOADINGTIME);
            //緩存数据
            var data = {xx: xx08,yy: yy08};
           _CacheFun._bindCache("echarts08", data);
        }; 
        if (par == undefined || par == "echarts09" ) {
            $("#echarts09").mask(' ');
            //组装数据 
            yy09.push(yy09_today);
            yy09.push(yy09_yesterday);
            //开始画图
            eastcom_echarts_line.loadDataToChart("echarts09", xx09, yy09,thresholdList.screen_jammed_users_ratio);
            setTimeout(' $("#echarts09").unmask();',LOADINGTIME);
            //緩存数据
            var data = {xx: xx09,yy: yy09};
           _CacheFun._bindCache("echarts09", data);
        };   
        
        if (par == undefined || par == "echartsadd_01" ) {
            $("#echartsadd_01").mask(' ');
            //组装数据 
            yy_add01.push(yy_add01_today);
            yy_add01.push(yy_add01_yesterday);
            //开始画图
            eastcom_echarts_line.loadDataToChart("echartsadd_01", xx_add01, yy_add01,thresholdList.screen_jammed_users_ratio);
            setTimeout(' $("#echartsadd_01").unmask();',LOADINGTIME);
            //緩存数据
            var data = {xx: xx_add01,yy: yy_add01};
           _CacheFun._bindCache("echartsadd_01", data);
        };  
        if (par == undefined || par == "echartsadd_02" ) {
        	$("#echartsadd_02").mask(' ');
            //组装数据 
            yy_add02.push(yy_add02_today);
            yy_add02.push(yy_add02_yesterday);
            //开始画图
            eastcom_echarts_line.loadDataToChart("echartsadd_02", xx_add02, yy_add02,thresholdList.screen_jammed_users_ratio);
            setTimeout(' $("#echartsadd_02").unmask();',LOADINGTIME);
            //緩存数据
            var data = {xx: xx_add02,yy: yy_add02};
           _CacheFun._bindCache("echartsadd_02", data);
        };
        if (par == undefined || par == "echartsadd_03" ) {
        	$("#echartsadd_03").mask(' ');
            //组装数据 
            yy_add03.push(yy_add03_today);
            yy_add03.push(yy_add03_yesterday);
            //开始画图
            eastcom_echarts_line.loadDataToChart("echartsadd_03", xx_add03, yy_add03,thresholdList.screen_jammed_users_ratio);
            setTimeout(' $("#echartsadd_03").unmask();',LOADINGTIME);
            //緩存数据
            var data = {xx: xx_add03,yy: yy_add03};
           _CacheFun._bindCache("echartsadd_03", data);
        };
    }, 
    loadEchartsDataOfIndexAndRate01:function(par){
        var  xx01 = [];
        var  yy01 = [];
        var  yy01_today = [];
        var  yy01_yesterday = [];


        var  xx10 = [];
        var  yy10 = [];
        var  yy10_speed = [];
        var  yy10_rate = [];

        var  xx11 = [];
        var  yy11 = [];
        var  yy11_speed = [];
        var  yy11_rate = [];

        var  xx12 = [];
        var  yy12 = [];
        var  yy12_speed = [];
        var  yy12_rate = [];
        //昨日数据 
        var startTimeStr = $("#startTime_"+par).val();
        var endTimeStr = $("#startTime_"+par).val();
        var stat_time_yesterday,end_time_yesterday;
        if ( startTimeStr == undefined) {
            var newDate = new Date();
            newDate.setDate(newDate.getDate() - 1);
            newDate.setHours(newDate.getHours() - 12);
            var endDate = new Date();
            endDate.setDate(endDate.getDate() - 1);
            stat_time_yesterday = newDate.Format("yyyyMMddhhmm");
            end_time_yesterday = endDate.Format("yyyyMMddhhmm");
        }else{
            var bioaDate = new Date();

            var newDate = new Date(startTimeStr);  
            newDate.setHours(bioaDate.getHours() - 12);
            var endDate = new Date(endTimeStr);  
            endDate.setHours(bioaDate.getHours());
            stat_time_yesterday = newDate.Format("yyyyMMddhhmm");
            end_time_yesterday = endDate.Format("yyyyMMddhhmm");

        }

        //当天数据
        var param = {};
       
        var nowDate = new Date();
        nowDate.setHours(nowDate.getHours() - 12);

        var endDate = new Date();
        var stat_time_today = nowDate.Format("yyyyMMddhhmm");
        var end_time_today = endDate.Format("yyyyMMddhhmm");
        param = {
                stat_time:stat_time_today,
                end_time:end_time_today,
                stat_time_:stat_time_yesterday,
                end_time_:end_time_yesterday,
                kpiType:"",
                queryType:"5min",
                FLUSHCACHE:"true"
        };
        
        $.ajax({
                url :LSMConsts.G_URLCONFIG.baseUrl+"/services/sml/query/cfg-screen-tv-kpi",
                type : 'post',
                async : false,
                dataType : "json",
                contentType :"application/json",
                data:JSON.stringify(param),
                success : function(data) {
                    var resultArr = data.data;
                    for (var i = 0; i < resultArr.length; i++) {
                                var currObj = resultArr[i];
                                xx01.push(currObj.time_id.substring(11,16));
                                yy01_today.push(currObj.ott_peak_flow ==null?"-":currObj.ott_peak_flow);
                                yy01_yesterday.push(currObj.ott_peak_flow_ ==null?"-":currObj.ott_peak_flow_);

                                /*xx10.push(currObj.time_id.substring(11,16));
                                yy10_speed.push(currObj.ul_txp_link_use_flow_rate ==null?"-":currObj.ul_txp_link_use_flow_rate);
                                yy10_rate.push(currObj.ul_txp_link_use_ratio ==null?"-":currObj.ul_txp_link_use_ratio);

                                xx11.push(currObj.time_id.substring(11,16));
                                yy11_speed.push(currObj.dl_sw_link_use_flow_rate ==null?"-":currObj.dl_sw_link_use_flow_rate);
                                yy11_rate.push(currObj.dl_sw_link_use_ratio ==null?"-":currObj.dl_sw_link_use_ratio);

                                xx12.push(currObj.time_id.substring(11,16));
                                yy12_speed.push(currObj.ul_pile_link_use_flow_rate ==null?"-":currObj.ul_pile_link_use_flow_rate);
                                yy12_rate.push(currObj.ul_pile_link_use_ratio ==null?"-":currObj.ul_pile_link_use_ratio);*/

                    };
                },
                complete: function(XMLHttpRequest, textStatus){
                      //HideLoading();
                },
                error: function(){
                      //请求出错处理
                }
        });
        //昨日数据
        /*var startTimeStr = $("#startTime").val();
        var endTimeStr = $("#startTime").val();
        var stat_time_yesterday,end_time_yesterday;
        if ( startTimeStr == undefined) {
            var newDate = new Date();
            newDate.setDate(newDate.getDate() - 1);
            newDate.setHours(newDate.getHours() - 12);
            var endDate = new Date();
            endDate.setDate(endDate.getDate() - 1);
            stat_time_yesterday = newDate.Format("yyyyMMddhh00");
            end_time_yesterday = endDate.Format("yyyyMMddhh00");
        }else{
            var bioaDate = new Date();

            var newDate = new Date(startTimeStr);  
            newDate.setHours(bioaDate.getHours() - 12);
            var endDate = new Date(endTimeStr);  
            endDate.setHours(bioaDate.getHours());
            stat_time_yesterday = newDate.Format("yyyyMMddhh00");
            end_time_yesterday = endDate.Format("yyyyMMddhh00");


            //stat_time_yesterday = (startTimeStr.replace(/-/g,"").replace(/:/g,"").replace(/ /g,"")+"0000000").substring(0,12);
            //end_time_yesterday = (endTimeStr.replace(/-/g,"").replace(/:/g,"").replace(/ /g,"")+"2300000").substring(0,12);
        }
        
        var param = {
                stat_time:stat_time_yesterday,
                end_time:end_time_yesterday,
                queryType:"5min",
                FLUSHCACHE:"true"
        };
        $.ajax({
                url :LSMConsts.G_URLCONFIG.baseUrl+"/services/sml/query/cfg-screen-tv-kpi",
                type : 'post',
                async : false,
                dataType : "json",
                contentType :"application/json",
                data:JSON.stringify(param),
                success : function(data) {
                    var resultArr = data.data;
                    for (var i = 0; i < resultArr.length; i++) {
                                var currObj = resultArr[i];
                           
                                yy01_yesterday.push(currObj.ott_peak_flow ==null?"0":currObj.ott_peak_flow);
                               
                    };
                },
                complete: function(XMLHttpRequest, textStatus){
                      //HideLoading();
                },
                error: function(){
                      //请求出错处理
                }
        });*/

        if (par == undefined || par == "echarts01" ) {
            $("#echarts01").mask(' ');
            //组装数据 
            yy01.push(yy01_today);
            yy01.push(yy01_yesterday);
            //开始画图
            eastcom_echarts_line.loadDataToChart("echarts01", xx01, yy01);
            setTimeout(' $("#echarts01").unmask();',LOADINGTIME);
            //緩存数据
            var data = {xx: xx01,yy: yy01};
           _CacheFun._bindCache("echarts01", data);
        };

        /*if (par == undefined || par == "echarts10" ) {
            $("#echarts10").mask(' ');
            //组装数据 
            yy10.push(yy10_speed);
            yy10.push(yy10_rate);
            //开始画图
            eastcom_echarts_line_bar.loadDataToChart("echarts10", xx10, yy10,thresholdList.ul_txp_link_use_ratio);
            setTimeout(' $("#echarts10").unmask();',LOADINGTIME);
            //緩存数据
            var data = {xx: xx10,yy: yy10};
           _CacheFun._bindCache("echarts10", data);
        };
        if (par == undefined || par == "echarts11" ) {
            $("#echarts11").mask(' ');
            //组装数据 
            yy11.push(yy11_speed);
            yy11.push(yy11_rate);
            //开始画图
            eastcom_echarts_line_bar.loadDataToChart("echarts11", xx11, yy11,thresholdList.dl_sw_link_use_ratio);
            setTimeout(' $("#echarts11").unmask();',LOADINGTIME);

            //緩存数据
            var data = {xx: xx11,yy: yy11};
           _CacheFun._bindCache("echarts11", data);
        };*/
        /*if (par == undefined || par == "echarts12" ) {
            $("#echarts12").mask(' ');
            //组装数据 
            yy12.push(yy12_speed);
            yy12.push(yy12_rate);
            //开始画图
            eastcom_echarts_line_bar.loadDataToChart("echarts12", xx12, yy12,thresholdList.ul_pile_link_use_ratio);
            setTimeout(' $("#echarts12").unmask();',LOADINGTIME);

            //緩存数据
            var data = {xx: xx12,yy: yy12};
           _CacheFun._bindCache("echarts12", data);
        };*/
        
    }, 
    loadEchartsDataOfIndexAndRate:function(par){
        var  xx01 = [];
        var  yy01 = [];
        var  yy01_today = [];
        var  yy01_yesterday = [];


        var  xx10 = [];
        var  yy10 = [];
        var  yy10_speed = [];
        var  yy10_rate = [];

        var  xx11 = [];
        var  yy11 = [];
        var  yy11_speed = [];
        var  yy11_rate = [];

        var  xx12 = [];
        var  yy12 = [];
        var  yy12_speed = [];
        var  yy12_rate = [];
        //昨日数据 
        var startTimeStr = $("#startTime_"+par).val();
        var endTimeStr = $("#startTime_"+par).val();
        var stat_time_yesterday,end_time_yesterday;
        if ( startTimeStr == undefined) {
            var newDate = new Date();
            newDate.setDate(newDate.getDate() - 1);
            newDate.setHours(newDate.getHours() - 12);
            var endDate = new Date();
            endDate.setDate(endDate.getDate() - 1);
            stat_time_yesterday = newDate.Format("yyyyMMddhh00");
            end_time_yesterday = endDate.Format("yyyyMMddhh00");
        }else{
            var bioaDate = new Date();

            var newDate = new Date(startTimeStr);  
            newDate.setHours(bioaDate.getHours() - 12);
            var endDate = new Date(endTimeStr);  
            endDate.setHours(bioaDate.getHours());
            stat_time_yesterday = newDate.Format("yyyyMMddhh00");
            end_time_yesterday = endDate.Format("yyyyMMddhh00");

        }

        //当天数据
        var param = {};
        if (par == "echarts01") {
            var nowDate = new Date();
            nowDate.setHours(nowDate.getHours() - 12);

            var endDate = new Date();
            var stat_time_today = nowDate.Format("yyyyMMddhh00");
            var end_time_today = endDate.Format("yyyyMMddhh00");
            param = {
                    stat_time:stat_time_today,
                    end_time:end_time_today,
                    stat_time_:stat_time_yesterday,
                    end_time_:end_time_yesterday,
                    kpiType:"",
                    queryType:"5min",
                    FLUSHCACHE:"true"
            };
        }else{
            var startTimeStr = $("#startTime_"+par).val();
            var endTimeStr = $("#startTime_"+par).val();
            var stat_time_today,end_time_today;
            if ( startTimeStr == undefined) {
            //if ( true) {
                var newDate = new Date();
                newDate.setDate(newDate.getDate());
                newDate.setHours(newDate.getHours() - 6);
                var endDate = new Date();
                endDate.setDate(endDate.getDate());
                stat_time_today = newDate.Format("yyyyMMddhhmm");
                end_time_today = endDate.Format("yyyyMMddhhmm");
            }else{
                var bioaDate = new Date();
                var newDate = new Date(startTimeStr);  
                newDate.setHours(bioaDate.getHours() - 6);
                newDate.setMinutes(bioaDate.getMinutes());
                var endDate = new Date(endTimeStr);  
                endDate.setHours(bioaDate.getHours());
                endDate.setMinutes(bioaDate.getMinutes());
                stat_time_today = newDate.Format("yyyyMMddhhmm");
                end_time_today = endDate.Format("yyyyMMddhhmm");

                //stat_time_today = (startTimeStr.replace(/-/g,"").replace(/:/g,"").replace(/ /g,"")+"0000000").substring(0,12);
                //end_time_today = (endTimeStr.replace(/-/g,"").replace(/:/g,"").replace(/ /g,"")+"2300000").substring(0,12);
            };
            param = {
                    stat_time:stat_time_today,
                    end_time:end_time_today,
                    stat_time_:stat_time_yesterday,
                    end_time_:end_time_yesterday,
                    kpiType:"",
                    queryType:"5min",
                    FLUSHCACHE:"true"
            };
        
        };
        $.ajax({
                url :LSMConsts.G_URLCONFIG.baseUrl+"/services/sml/query/cfg-screen-tv-kpi",
                type : 'post',
                async : false,
                dataType : "json",
                contentType :"application/json",
                data:JSON.stringify(param),
                success : function(data) {
                    var resultArr = data.data;
                    for (var i = 0; i < resultArr.length; i++) {
                                var currObj = resultArr[i];
                                xx01.push(currObj.time_id.substring(11,16));
                                yy01_today.push(currObj.ott_peak_flow ==null?"-":currObj.ott_peak_flow);
                                yy01_yesterday.push(currObj.ott_peak_flow_ ==null?"-":currObj.ott_peak_flow_);

                                xx10.push(currObj.time_id.substring(11,16));
                                yy10_speed.push(currObj.ul_txp_link_use_flow_rate ==null?"-":currObj.ul_txp_link_use_flow_rate);
                                yy10_rate.push(currObj.ul_txp_link_use_ratio ==null?"-":currObj.ul_txp_link_use_ratio);

                                xx11.push(currObj.time_id.substring(11,16));
                                yy11_speed.push(currObj.dl_sw_link_use_flow_rate ==null?"-":currObj.dl_sw_link_use_flow_rate);
                                yy11_rate.push(currObj.dl_sw_link_use_ratio ==null?"-":currObj.dl_sw_link_use_ratio);

                                xx12.push(currObj.time_id.substring(11,16));
                                yy12_speed.push(currObj.ul_pile_link_use_flow_rate ==null?"-":currObj.ul_pile_link_use_flow_rate);
                                yy12_rate.push(currObj.ul_pile_link_use_ratio ==null?"-":currObj.ul_pile_link_use_ratio);

                    };
                },
                complete: function(XMLHttpRequest, textStatus){
                      //HideLoading();
                },
                error: function(){
                      //请求出错处理
                }
        });
        //昨日数据
        /*var startTimeStr = $("#startTime").val();
        var endTimeStr = $("#startTime").val();
        var stat_time_yesterday,end_time_yesterday;
        if ( startTimeStr == undefined) {
            var newDate = new Date();
            newDate.setDate(newDate.getDate() - 1);
            newDate.setHours(newDate.getHours() - 12);
            var endDate = new Date();
            endDate.setDate(endDate.getDate() - 1);
            stat_time_yesterday = newDate.Format("yyyyMMddhh00");
            end_time_yesterday = endDate.Format("yyyyMMddhh00");
        }else{
            var bioaDate = new Date();

            var newDate = new Date(startTimeStr);  
            newDate.setHours(bioaDate.getHours() - 12);
            var endDate = new Date(endTimeStr);  
            endDate.setHours(bioaDate.getHours());
            stat_time_yesterday = newDate.Format("yyyyMMddhh00");
            end_time_yesterday = endDate.Format("yyyyMMddhh00");


            //stat_time_yesterday = (startTimeStr.replace(/-/g,"").replace(/:/g,"").replace(/ /g,"")+"0000000").substring(0,12);
            //end_time_yesterday = (endTimeStr.replace(/-/g,"").replace(/:/g,"").replace(/ /g,"")+"2300000").substring(0,12);
        }
        
        var param = {
                stat_time:stat_time_yesterday,
                end_time:end_time_yesterday,
                queryType:"5min",
                FLUSHCACHE:"true"
        };
        $.ajax({
                url :LSMConsts.G_URLCONFIG.baseUrl+"/services/sml/query/cfg-screen-tv-kpi",
                type : 'post',
                async : false,
                dataType : "json",
                contentType :"application/json",
                data:JSON.stringify(param),
                success : function(data) {
                    var resultArr = data.data;
                    for (var i = 0; i < resultArr.length; i++) {
                                var currObj = resultArr[i];
                           
                                yy01_yesterday.push(currObj.ott_peak_flow ==null?"0":currObj.ott_peak_flow);
                               
                    };
                },
                complete: function(XMLHttpRequest, textStatus){
                      //HideLoading();
                },
                error: function(){
                      //请求出错处理
                }
        });*/

        /*if (par == undefined || par == "echarts01" ) {
            $("#echarts01").mask(' ');
            //组装数据 
            yy01.push(yy01_today);
            yy01.push(yy01_yesterday);
            //开始画图
            eastcom_echarts_line.loadDataToChart("echarts01", xx01, yy01);
            setTimeout(' $("#echarts01").unmask();',LOADINGTIME);
            //緩存数据
            var data = {xx: xx01,yy: yy01};
           _CacheFun._bindCache("echarts01", data);
        };
*/
        if (par == undefined || par == "echarts10" ) {
            $("#echarts10").mask(' ');
            //组装数据 
            yy10.push(yy10_speed);
            yy10.push(yy10_rate);
            //开始画图
            eastcom_echarts_line_bar.loadDataToChart("echarts10", xx10, yy10,thresholdList.ul_txp_link_use_ratio);
            setTimeout(' $("#echarts10").unmask();',LOADINGTIME);
            //緩存数据
            var data = {xx: xx10,yy: yy10};
           _CacheFun._bindCache("echarts10", data);
        };
        if (par == undefined || par == "echarts11" ) {
            $("#echarts11").mask(' ');
            //组装数据 
            yy11.push(yy11_speed);
            yy11.push(yy11_rate);
            //开始画图
            eastcom_echarts_line_bar.loadDataToChart("echarts11", xx11, yy11,thresholdList.dl_sw_link_use_ratio);
            setTimeout(' $("#echarts11").unmask();',LOADINGTIME);

            //緩存数据
            var data = {xx: xx11,yy: yy11};
           _CacheFun._bindCache("echarts11", data);
        };
        
        /*if (par == undefined || par == "echarts12" ) {
            $("#echarts12").mask(' ');
            //组装数据 
            yy12.push(yy12_speed);
            yy12.push(yy12_rate);
            //开始画图
            eastcom_echarts_line_bar.loadDataToChart("echarts12", xx12, yy12,thresholdList.ul_pile_link_use_ratio);
            setTimeout(' $("#echarts12").unmask();',LOADINGTIME);

            //緩存数据
            var data = {xx: xx12,yy: yy12};
           _CacheFun._bindCache("echarts12", data);
        };*/
        
        
        
    },     
    //废弃
    loadEchartsDataOfRate:function(par){
        var startTimeStr = $("#startTime").val();
        var endTimeStr = $("#endTime").val();
        var stat_time,end_time;
        if ( startTimeStr == undefined) {
            var newDate = new Date();
            stat_time = newDate.Format("yyyyMMdd0000");
            end_time = newDate.Format("yyyyMMdd2300");
        }else{
            stat_time = (startTimeStr.replace(/-/g,"").replace(/:/g,"").replace(/ /g,"")+"0000000").substring(0,12);
            end_time = (endTimeStr.replace(/-/g,"").replace(/:/g,"").replace(/ /g,"")+"0000000").substring(0,12);
        }
        //console.log(stat_time);
        //console.log(end_time);
        var param = {
                stat_time:stat_time,
                end_time:end_time,
                FLUSHCACHE:"true"
        };
        var  xx05 = [];
        var  yy05 = [];
        var  yy05_today = [];

        var  xx08 = [];
        var  yy08 = [];
        var  yy08_today = [];
        
        var  xx09 = [];
        var  yy09 = [];
        var  yy09_today = [];


        var  xx12 = [];
        var  yy12 = [];
        var  yy12_today = [];

        $.ajax({
                url :LSMConsts.G_URLCONFIG.baseUrl+"/services/sml/query/cfg-screen-tv-kpi",
                type : 'post',
                async : false,
                dataType : "json",
                contentType :"application/json",
                data:JSON.stringify(param),
                success : function(data) {
                    var resultArr = data.data;
                    for (var i = 0; i < resultArr.length; i++) {
                                var currObj = resultArr[i];
                                CURRYEAR = currObj.time_id.substring(0,4);
                                xx05.push(currObj.time_id.replace(":00:00","").substring(5,30));
                                yy05_today.push(currObj.play_succ_ratio ==null?"0":currObj.play_succ_ratio);

                                xx08.push(currObj.time_id.replace(":00:00","").substring(5,30));
                                yy08_today.push(currObj.screen_jammed_duration_ratio ==null?"0":currObj.screen_jammed_duration_ratio);

                                xx09.push(currObj.time_id.replace(":00:00","").substring(5,30));
                                yy09_today.push(currObj.screen_jammed_users_ratio ==null?"0":currObj.screen_jammed_users_ratio);

                                //xx05.push(currObj.time_id.replace(":00:00","").substring(5,30));
                                //yy05_today.push(currObj.play_succ_ratio ==null?"0":currObj.play_succ_ratio);
                    };
                },
                complete: function(XMLHttpRequest, textStatus){
                      //HideLoading();
                },
                error: function(){
                      //请求出错处理
                }
        });

        if (par == undefined || par == "echarts05" ) {
            //组装数据 
            yy05.push(yy05_today);
            //开始画图
            eastcom_echarts_line_rate.loadDataToChart("echarts05", xx05, yy05);
            //緩存数据
            var data = {xx: xx05,yy: yy05};
           _CacheFun._bindCache("echarts05", data);
        };
        if (par == undefined || par == "echarts08" ) {
            //组装数据 
            yy08.push(yy08_today);
            //开始画图
            eastcom_echarts_line_rate.loadDataToChart("echarts08", xx08, yy08);
            //緩存数据
            var data = {xx: xx08,yy: yy08};
           _CacheFun._bindCache("echarts08", data);
        };
        if (par == undefined || par == "echarts09" ) {
            //组装数据 
            yy09.push(yy09_today);
            //开始画图
            eastcom_echarts_line_rate.loadDataToChart("echarts09", xx09, yy09);
            //緩存数据
            var data = {xx: xx09,yy: yy09};
           _CacheFun._bindCache("echarts09", data);
        };
        /*if (par == undefined || par == "echarts12" ) {
            //组装数据 
            yy12.push(yy12_today);
            //开始画图
            eastcom_echarts_line_rate.loadDataToChart("echarts12", xx12, yy12);
            //緩存数据
            var data = {xx: xx12,yy: yy12};
           _CacheFun._bindCache("echarts12", data);
        }*/
    },
    loadEchartsDataOfBarBar:function(par){
        var startTimeStr = $("#startTime").val();
        var endTimeStr = $("#endTime").val();
        var stat_time,end_time;
        if ( startTimeStr == undefined) {
            var newDate = new Date();
            newDate.setDate(newDate.getDate() - 4); //barbarbarTime
            var endDate = new Date();
            stat_time = newDate.Format("yyyyMMddhh00");
            end_time = endDate.Format("yyyyMMddhh00");
        }else{
            stat_time = (startTimeStr.replace(/-/g,"").replace(/:/g,"").replace(/ /g,"")+"0000000").substring(0,12);
            end_time = (endTimeStr.replace(/-/g,"").replace(/:/g,"").replace(/ /g,"")+"0000000").substring(0,12);
        }
        //console.log(stat_time);
        //console.log(end_time);
        var param = {
                stat_time:stat_time,
                end_time:end_time,
                FLUSHCACHE:"true"
        };
        /*
         terminal_fault_num           终端故障数      
         operator_network_fault_num   运营商网络故障数
         cdn_fault_num                CDN平台故障数   
         home_network_fault_num       家庭网络故障数
        */
        var  xx13 = [];
        var  yy13 = [];
        var  yyy13 = [];
        var  yy13_terminal_fault_num = [];
        var  yy13_operator_network_fault_num = [];
        var  yy13_cdn_fault_num = [];
        var  yy13_home_network_fault_num = [];

        var  yyy13_terminal_fault_num = [];
        var  yyy13_operator_network_fault_num = [];
        var  yyy13_cdn_fault_num = [];
        var  yyy13_home_network_fault_num = [];

        $.ajax({
                url :LSMConsts.G_URLCONFIG.baseUrl+"/services/sml/query/cfg-screen-tv-fault-trend",
                type : 'post',
                async : false,
                dataType : "json",
                contentType :"application/json",
                data:JSON.stringify(param),
                success : function(data) {
                    var resultArr = data.data;
                    for (var i = 0; i < resultArr.length; i++) {
                                var currObj = resultArr[i];
                                CURRYEAR = currObj.time_id.substring(0,4);

                                xx13.push(currObj.time_id.replace(":00:00","").substring(5,30));

                                yy13_terminal_fault_num.push(currObj.terminal_fault_num ==null?"0":currObj.terminal_fault_num);
                                yy13_operator_network_fault_num.push(currObj.operator_network_fault_num ==null?"0":currObj.operator_network_fault_num);
                                yy13_cdn_fault_num.push(currObj.cdn_fault_num ==null?"0":currObj.cdn_fault_num);
                                yy13_home_network_fault_num.push(currObj.home_network_fault_num ==null?"0":currObj.home_network_fault_num);

                                /*yy13_terminal_fault_num.push(Math.log10(currObj.terminal_fault_num ==null?"0":currObj.terminal_fault_num));
                                yy13_operator_network_fault_num.push(Math.log10(currObj.operator_network_fault_num ==null?"0":currObj.operator_network_fault_num));
                                yy13_cdn_fault_num.push(Math.log10(currObj.cdn_fault_num ==null?"0":currObj.cdn_fault_num));
                                yy13_home_network_fault_num.push(Math.log10(currObj.home_network_fault_num ==null?"0":currObj.home_network_fault_num));


                                yyy13_terminal_fault_num.push(currObj.terminal_fault_num ==null?"0":currObj.terminal_fault_num);
                                yyy13_operator_network_fault_num.push(currObj.operator_network_fault_num ==null?"0":currObj.operator_network_fault_num);
                                yyy13_cdn_fault_num.push(currObj.cdn_fault_num ==null?"0":currObj.cdn_fault_num);
                                yyy13_home_network_fault_num.push(currObj.home_network_fault_num ==null?"0":currObj.home_network_fault_num);*/
                                
                    };
                },
                complete: function(XMLHttpRequest, textStatus){
                      //HideLoading();
                },
                error: function(){
                      //请求出错处理
                }
        });

        if (par == undefined || par == "echarts13" ) {
            $("#echarts13").mask(' ');
            //组装数据 
            yy13.push(yy13_terminal_fault_num);
            yy13.push(yy13_operator_network_fault_num);
            yy13.push(yy13_cdn_fault_num);
            yy13.push(yy13_home_network_fault_num);

            yyy13.push(yyy13_terminal_fault_num);
            yyy13.push(yyy13_operator_network_fault_num);
            yyy13.push(yyy13_cdn_fault_num);
            yyy13.push(yyy13_home_network_fault_num);
            //开始画图
            eastcom_echarts_bar_bar.loadDataToChart("echarts13", xx13, yy13,yyy13);
            setTimeout(' $("#echarts13").unmask();',LOADINGTIME);
            //緩存数据
            var data = {xx: xx13,yy: yy13,yyy:yyy13};
           _CacheFun._bindCache("echarts13", data);
        };        
    },
    updateTvServiceChart:function(type,chartId,vendorMap){
    	var typeChartMap={
    		//'tv':['echartsadd_04','echartsadd_05','echartsadd_06'],
    		'migu':['echartsadd_08'],
/*    		'migu':['echartsadd_07','echartsadd_08','echartsadd_09'],
*/
    		'content':['echartsadd_10']
    	};
    	var chartKeyMap={
    		'echartsadd_04':'华为',
    		'echartsadd_05':'中兴',
    		'echartsadd_06':'烽火',
    		'echartsadd_07':'华为',
    		'echartsadd_08':'中兴',
    		'echartsadd_09':'烽火',
    		'echartsadd_10':'咪咕视频直播华为,咪咕视频直播杭研&烽火,基地模式OTT,咪咕视频直播中兴2,咪咕视频点播,咪咕视频直播中兴1'
    	};
    	var chartList=typeChartMap[type];
    	var ci=0;
    	for(var ci=0;ci<chartList.length;ci++){
    		var cur_chartId=chartList[ci];
    		var xx=[];
            var yy=[];
            var series0=[];
            var series1=[];
            var list=[];
            var i=0;
            var record={};
    		if (chartId == undefined || chartId == cur_chartId ) {
    			if(cur_chartId=='echartsadd_10'){
    				var legend=[];
    				var keys=chartKeyMap[cur_chartId].split(',');
    				for(var ki=0;ki<keys.length;ki++){
    					var key=keys[ki];
    					list=vendorMap[key];
    					if(list==null){
            				list=[];
            			}
    					xx=[];
    					series0=[];
    					series1=[];
    					
    					legend.push(key+'峰值');
    					legend.push(key+'容量利用率');
    					for(i=0;i<list.length;i++){
                    		record=list[i];
                    		xx.push(record.time.split(' ')[1]);
                    		series0.push(record.peak_flow_rate);
                    		series1.push(record.capacity_utilization);
                    		
                    	}
    					yy.push(series0);
    					yy.push(series1);
    				}
    				eastcom_echarts_line_bar_content.legend=legend;
    				eastcom_echarts_line_bar_content.loadDataToChart(cur_chartId, xx, yy,legend);
    			}else{
    				list=vendorMap[chartKeyMap[cur_chartId]];
        			if(list==null){
        				list=[];
        			}
        			for(i=0;i<list.length;i++){
                		record=list[i];
                		xx.push(record.time.split(' ')[1]+':00');
                		series0.push(record.peak_flow_rate);
                		series1.push(record.capacity_utilization);
                	}
                	yy=[series0,series1];
                	eastcom_echarts_line_bar.loadDataToChart(cur_chartId, xx, yy,thresholdList.ul_txp_link_use_ratio,['峰值(Gbps)','容量利用率(%)']);
    			}
    			
            	var data = {xx: xx,yy: yy};
                _CacheFun._bindCache(cur_chartId, data);
    			
    		}
    	}
    },
    loadEchartsDataOfTvService:function(type,par){
    	var url=LSMConsts.G_URLCONFIG.baseUrl+"/services/sml/query/cfg-screen-tv-trend?type="+type;
    	var startTimeStr = $("#startTime_"+par).val();
        var endTimeStr = $("#endTime_"+par).val();
        var stat_time,end_time;
        if ( startTimeStr == undefined) {
           
        }else{
            var newDate = new Date(startTimeStr);
            stat_time=newDate.Format('yyyyMMdd07');
            //newDate.setHours(newDate.getHours()+12);
            end_time=newDate.Format('yyyyMMdd19');
            
            url+='&startTime='+encodeURIComponent(stat_time);
            url+='&endTime='+encodeURIComponent(end_time);
        }
       
        $.ajax({
                url:url,
                type : 'get',
                async : true,
                dataType : "json",
                contentType :"application/json",
                success : function(data) {
                    var vendorMap = data.data;
                    internetTV.updateTvServiceChart(type,par,vendorMap);
                },
                complete: function(XMLHttpRequest, textStatus){
                      //HideLoading();
                },
                error: function(){
                      //请求出错处理
                }
        });

    }, 
    loadEchartsDataOfPie:function(par){
        var stat_time = (par.replace(/-/g,"").replace(/:/g,"").replace(/ /g,"")+"0000000").substring(0,12);
        var end_time = (par.replace(/-/g,"").replace(/:/g,"").replace(/ /g,"")+"0000000").substring(0,12);
        var param = {
                stat_time:stat_time,
                end_time:end_time,
                FLUSHCACHE:"true"
        };
        /*
         terminal_fault_num           终端故障数      
         operator_network_fault_num   运营商网络故障数
         cdn_fault_num                CDN平台故障数   
         home_network_fault_num       家庭网络故障数
        */
        var  dataPie = [];

        $.ajax({
                url :LSMConsts.G_URLCONFIG.baseUrl+"/services/sml/query/cfg-screen-tv-fault-trend",
                type : 'post',
                async : false,
                dataType : "json",
                contentType :"application/json",
                data:JSON.stringify(param),
                success : function(data) {
                    var resultArr = data.data;
                    if (resultArr.length > 0) {
                        var currObj = resultArr[0];
                        var obj1 =  {value:currObj.terminal_fault_num ==null?"0":currObj.terminal_fault_num, name:'终端问题'};
                        var obj2 =  {value:currObj.operator_network_fault_num ==null?"0":currObj.operator_network_fault_num, name:'网络侧问题'};
                        var obj3 =  {value:currObj.cdn_fault_num ==null?"0":currObj.cdn_fault_num, name:'内容侧问题'};
                        var obj4 =  {value:currObj.home_network_fault_num ==null?"0":currObj.home_network_fault_num, name:'用户家庭网络问题'};

                        dataPie.push(obj1);
                        dataPie.push(obj2);
                        dataPie.push(obj3);
                        dataPie.push(obj4);
                    }
                },
                complete: function(XMLHttpRequest, textStatus){
                      //HideLoading();
                },
                error: function(){
                      //请求出错处理
                }
        });
        eastcom_echarts_pie.loadDataToChart("echartsPie",dataPie)
    },
    //周涛
    loadEchartsDataLineAll:function(currEcharts,time){
    	var stat_time;
    	var end_time ;
    	/*var startTime_echartsadd_04="2018-09-16 10:25";
    	var endTime_echartsadd_04="2018-09-16 11:25";*/
    	if(time==""||time=="undefined"||time==null){
    		var startTime_echartsadd_04=$("#startTime_"+currEcharts).val();
        	var endTime_echartsadd_04=$("#endTime_"+currEcharts).val();
        	 stat_time = startTime_echartsadd_04.replace(/-/g,"").replace(/:/g,"").replace(/ /g,"");
             end_time = endTime_echartsadd_04.replace(/-/g,"").replace(/:/g,"").replace(/ /g,"");
           
    	}else{
       	 	stat_time = time.start;
            end_time = time.end;
            stat_time = stat_time.replace(/-/g,"").replace(/:/g,"").replace(/ /g,"");
            end_time = end_time.replace(/-/g,"").replace(/:/g,"").replace(/ /g,"");
          
          
    	}
    	 console.log("loadEchartsDataLineAll");
        console.log(stat_time);
        console.log(end_time);
        console.log("loadEchartsDataLineAll");
        var param = {
                stat_time:stat_time,
                end_time:end_time,
        };

        $.ajax({
                url :LSMConsts.G_URLCONFIG.baseUrl+"/services/sml/query/area-sqmtv?startTime="+stat_time+"&endTime="+end_time,
                type : 'post',
                async : false,
                dataType : "json",
                contentType :"application/json",
                data:JSON.stringify(param),
                success : function(data) {
                    var resultArr = data.data;
                    if (resultArr!=null) {
                    	var keys=Object.keys(resultArr);
                    	var HUAWEI_FENGHUO=[];
            			
            			var ottJieHUAWEI=[]; //华为
            			var ottJieFENGHUO=[]; //烽火
            			
            			var ottMiGuHUAWEI=[]; //华为咪咕
            			var ottMiGuFENGHUO=[]; //烽火咪咕
            			
            			var ottHUAWEI=[]; //华为
            			var ottFENGHUO=[]; //烽火
            			console.log(keys);
            			console.log(resultArr);
            			console.log(resultArr.length);
                    	for(var i=0;i<keys.length;i++){
                    		if((keys[i].indexOf("OTT（总）")!=-1)&&(keys[i].indexOf("烽火")==-1)&&(keys[i].indexOf("华为")==-1)){
                    			var ottAllData={};
                    			ottAllData={
                    				type:"OTT（总）",
                    				data:resultArr[keys[i]]
                    			};
                    			HUAWEI_FENGHUO=ottAllData;
                    		}else if(keys[i].indexOf("烽火-OTT（总）")!=-1){
                    			var ottAllData={};

                    			ottAllData={
                        				type:"烽火-OTT（总）",
                        				data:resultArr[keys[i]]
                        			};
                    			ottFENGHUO=ottAllData;
                    		}else if(keys[i].indexOf("华为-OTT（总）")!=-1){
                    			var ottAllData={};

                    			ottAllData={
                        				type:"华为-OTT（总）",
                        				data:resultArr[keys[i]]
                        			};
                    			ottHUAWEI=ottAllData;

                    		}else if(keys[i].indexOf("烽火-咪咕视频")!=-1){
                    			var ottAllData={};

                    			ottAllData={
                        				type:"烽火-咪咕视频",
                        				data:resultArr[keys[i]]
                        			};
                    			ottMiGuFENGHUO=ottAllData;

                    		}else if(keys[i].indexOf("华为-咪咕视频")!=-1){
                    			var ottAllData={};

                    			ottAllData={
                        				type:"华为-咪咕视频",
                        				data:resultArr[keys[i]]
                        			};
                    			ottMiGuHUAWEI=ottAllData;

                    		}else if(keys[i].indexOf("华为-OTT")!=-1){
                    			var name= keys[i].replace("华为-OTT","");
                    			var ottdata={};
                    			ottdata[name]=resultArr[keys[i]]
                    			ottJieHUAWEI.push(ottdata);
                    			
                    		}else if(keys[i].indexOf("烽火-OTT")!=-1){
                    			var name= keys[i].replace("烽火-OTT","");
                    			var ottdata={};
                    			ottdata[name]=resultArr[keys[i]]
                    			ottJieFENGHUO.push(ottdata);
                    		}
                    	}
                    	if(currEcharts=="echartsadd_04_re"){
                        	eastcom_echarts_ott.loadDataToChart("echartsadd_04_re",HUAWEI_FENGHUO); 

                    	}else if(currEcharts=="echartsadd_10_re"){
                        	eastcom_echarts_ott.loadDataToChart("echartsadd_10_re",ottHUAWEI);  //华为总
                    	}else if(currEcharts=="echartsadd_06_re"){
                        	eastcom_echarts_ott.loadDataToChart("echartsadd_06_re",ottFENGHUO);  //烽火总
                    	}else if(currEcharts=="echartsadd_08_re"){
                        	eastcom_echarts_ott.loadDataToChart("echartsadd_08_re",ottJieFENGHUO);  //烽火子
                    	}else if(currEcharts=="echartsadd_07_re"){
                        	eastcom_echarts_ott.loadDataToChart("echartsadd_07_re",ottJieHUAWEI);  //华为子
                    	}else if(currEcharts=="echartsadd_11_re"){
                        	eastcom_echarts_ott.loadDataToChart("echartsadd_11_re",ottMiGuHUAWEI);  //华为咪咕
                    	}else if(currEcharts=="echartsadd_12_re"){
                        	eastcom_echarts_ott.loadDataToChart("echartsadd_12_re",ottMiGuFENGHUO);  //烽火咪咕 
                    	}else if(currEcharts=="echartsadd_all"){
                    		eastcom_echarts_ott.loadDataToChart("echartsadd_04_re",HUAWEI_FENGHUO); 
                        	
                        	eastcom_echarts_ott.loadDataToChart("echartsadd_10_re",ottHUAWEI);  //华为总
                        	eastcom_echarts_ott.loadDataToChart("echartsadd_06_re",ottFENGHUO);  //烽火总
                        	
                        	eastcom_echarts_ott.loadDataToChart("echartsadd_08_re",ottJieFENGHUO);  //烽火子
                        	eastcom_echarts_ott.loadDataToChart("echartsadd_07_re",ottJieHUAWEI);  //华为子
                        	
                        	eastcom_echarts_ott.loadDataToChart("echartsadd_11_re",ottMiGuHUAWEI);  //华为咪咕
                        	//eastcom_echarts_ott.loadDataToChart("echartsadd_12_re",ottMiGuFENGHUO);  //烽火咪咕                     	}
                    	
                    }
                   }
                },
                complete: function(XMLHttpRequest, textStatus){
                      //HideLoading();
                },
                error: function(){
                      //请求出错处理
                }
        });
       // eastcom_echarts_pie.loadDataToChart("echartsPie",dataPie)
    },

};