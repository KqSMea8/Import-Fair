
function CONTENTHTMLOFCOMMON(currEcharts){
     var htmlStr = '<div style="">'
                                 +     '<div style="padding-left: 10px;">' 
                                 +        '<span style="color:#fff;font-size:16px">开始时间</span><span style="color:#fff;padding:0px 5px">:</span>' 
                                 +        '<input id="startTime_'+currEcharts+'" class="Wdate TimeFiled" style="width: 150px;height: 24px;color: #fff;cursor: pointer;font-size: 16px;" onclick="WdatePicker({dateFmt : \'yyyy-MM-dd HH:mm\',maxDate:\'%y-%M-{%d}\'})"/>'
                                 +        '<span style="color:#fff;font-size:16px;margin-left:10px;">结束时间</span><span style="color:#fff;padding:0px 5px">:</span>' 
                                 +        '<input id="endTime_'+currEcharts+'" class="Wdate TimeFiled" style="width: 150px;height: 24px;color: #fff;cursor: pointer;font-size: 16px;" onclick="WdatePicker({dateFmt : \'yyyy-MM-dd HH:mm\',maxDate:\'%y-%M-{%d}\'})"/>'
                                 +        '<input name="'+currEcharts+'" style="margin-left:5px;margin-top: -6px;" type="button" class="btn btn-success btn-xs" value="确定">'
                                 +     '</div>' 
                                // +     '<div style="padding-top: 20px;text-align:center;">'
                                 //+     '</div>'
                                 +  '</div>';
     return htmlStr;                         
}


var addBigWinOfTime01={win:null};
internetTV.addBigWinOfTime01 =function(evet) {
        var currEcharts = $(this).attr('name');
        TIMEOFECHARTS = currEcharts;
        if (addBigWinOfTime01.win == null) {
                var docWidth=$(evet.currentTarget).parent().parent().width();
                var docHeight=$(evet.currentTarget).parent().parent().height();
                var winWidth=docWidth*0.9;
                var winHeight=110;
                var winX=(docWidth - winWidth) * 0.5;
                var winY=(docHeight - winHeight) * 0.5;
                addBigWinOfTime01.win = new LSMScreen.SimpleWindow({
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
                var contentHtml = CONTENTHTMLOFCOMMON(currEcharts);
                

                $(addBigWinOfTime01.win.content).html(contentHtml);

                internetTV.initTime(currEcharts);

               $(addBigWinOfTime01.win.content).find(":button").on('click',function(evt){
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
                 addBigWinOfTime01.win.closeWin(); 
               });       
        }else{
               //$("body").append(addBigWinOfTime01.win.win);
               addBigWinOfTime01.win.show();
        };
};
var addBigWinOfTime02={win:null};
internetTV.addBigWinOfTime02 =function(evet) {
        var currEcharts = $(this).attr('name');
        TIMEOFECHARTS = currEcharts;
        if (addBigWinOfTime02.win == null) {
                
                /*var docWidth=$('body').width();
                var winWidth=docWidth*0.24*0.9;
                var winHeight=110;
                var winX=$(evet.currentTarget).parent().parent().offset().left+winWidth*0.05;
                var winY=$(evet.currentTarget).parent().parent().offset().top+72;*/

                var docWidth=$(evet.currentTarget).parent().parent().width();
                var docHeight=$(evet.currentTarget).parent().parent().height();
                var winWidth=docWidth*0.9;
                var winHeight=110;
                var winX=(docWidth - winWidth) * 0.5;
                var winY=(docHeight - winHeight) * 0.5;
                addBigWinOfTime02.win = new LSMScreen.SimpleWindow({
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
                var contentHtml = CONTENTHTMLOFCOMMON(currEcharts);
                

                $(addBigWinOfTime02.win.content).html(contentHtml);

                internetTV.initTime(currEcharts);

               $(addBigWinOfTime02.win.content).find(":button").on('click',function(evt){
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
                 addBigWinOfTime02.win.closeWin(); 
               });       
        }else{
               //$("body").append(addBigWinOfTime02.win.win);
               addBigWinOfTime02.win.show();
        };
};
var addBigWinOfTime03={win:null};
internetTV.addBigWinOfTime03 =function(evet) {
        var currEcharts = $(this).attr('name');
        TIMEOFECHARTS = currEcharts;
        if (addBigWinOfTime03.win == null) {
                
                /*var docWidth=$('body').width();
                var winWidth=docWidth*0.24*0.9;
                var winHeight=110;
                var winX=$(evet.currentTarget).parent().parent().offset().left+winWidth*0.05;
                var winY=$(evet.currentTarget).parent().parent().offset().top+72;*/

                var docWidth=$(evet.currentTarget).parent().parent().width();
                var docHeight=$(evet.currentTarget).parent().parent().height();
                var winWidth=docWidth*0.9;
                var winHeight=110;
                var winX=(docWidth - winWidth) * 0.5;
                var winY=(docHeight - winHeight) * 0.5;
                addBigWinOfTime03.win = new LSMScreen.SimpleWindow({
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
                var contentHtml = CONTENTHTMLOFCOMMON(currEcharts);
                

                $(addBigWinOfTime03.win.content).html(contentHtml);

                internetTV.initTime(currEcharts);

               $(addBigWinOfTime03.win.content).find(":button").on('click',function(evt){
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
                 addBigWinOfTime03.win.closeWin(); 
               });       
        }else{
               //$("body").append(addBigWinOfTime03.win.win);
               addBigWinOfTime03.win.show();
        };
};
var addBigWinOfTime04={win:null};
internetTV.addBigWinOfTime04 =function(evet) {
        var currEcharts = $(this).attr('name');
        TIMEOFECHARTS = currEcharts;
        if (addBigWinOfTime04.win == null) {
                
                /*var docWidth=$('body').width();
                var winWidth=docWidth*0.24*0.9;
                var winHeight=110;
                var winX=$(evet.currentTarget).parent().parent().offset().left+winWidth*0.05;
                var winY=$(evet.currentTarget).parent().parent().offset().top+72;*/

                var docWidth=$(evet.currentTarget).parent().parent().width();
                var docHeight=$(evet.currentTarget).parent().parent().height();
                var winWidth=docWidth*0.9;
                var winHeight=110;
                var winX=(docWidth - winWidth) * 0.5;
                var winY=(docHeight - winHeight) * 0.5;
                addBigWinOfTime04.win = new LSMScreen.SimpleWindow({
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
                var contentHtml = CONTENTHTMLOFCOMMON(currEcharts);
                

                $(addBigWinOfTime04.win.content).html(contentHtml);

                internetTV.initTime(currEcharts);

               $(addBigWinOfTime04.win.content).find(":button").on('click',function(evt){
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
                 addBigWinOfTime04.win.closeWin(); 
               });       
        }else{
               //$("body").append(addBigWinOfTime04.win.win);
               addBigWinOfTime04.win.show();
        };
};
var addBigWinOfTime05={win:null};
internetTV.addBigWinOfTime05 =function(evet) {
        var currEcharts = $(this).attr('name');
        TIMEOFECHARTS = currEcharts;
        if (addBigWinOfTime05.win == null) {
                
                /*var docWidth=$('body').width();
                var winWidth=docWidth*0.24*0.9;
                var winHeight=110;
                var winX=$(evet.currentTarget).parent().parent().offset().left+winWidth*0.05;
                var winY=$(evet.currentTarget).parent().parent().offset().top+72;*/

                var docWidth=$(evet.currentTarget).parent().parent().width();
                var docHeight=$(evet.currentTarget).parent().parent().height();
                var winWidth=docWidth*0.9;
                var winHeight=110;
                var winX=(docWidth - winWidth) * 0.5;
                var winY=(docHeight - winHeight) * 0.5;
                addBigWinOfTime05.win = new LSMScreen.SimpleWindow({
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
                var contentHtml = CONTENTHTMLOFCOMMON(currEcharts);
                

                $(addBigWinOfTime05.win.content).html(contentHtml);

                internetTV.initTime(currEcharts);

               $(addBigWinOfTime05.win.content).find(":button").on('click',function(evt){
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
                 addBigWinOfTime05.win.closeWin(); 
               });       
        }else{
               //$("body").append(addBigWinOfTime05.win.win);
               addBigWinOfTime05.win.show();
        };
};
var addBigWinOfTime06={win:null};
internetTV.addBigWinOfTime06 =function(evet) {
        var currEcharts = $(this).attr('name');
        TIMEOFECHARTS = currEcharts;
        if (addBigWinOfTime06.win == null) {
                
                /*var docWidth=$('body').width();
                var winWidth=docWidth*0.24*0.9;
                var winHeight=110;
                var winX=$(evet.currentTarget).parent().parent().offset().left+winWidth*0.05;
                var winY=$(evet.currentTarget).parent().parent().offset().top+72;*/


                var docWidth=$(evet.currentTarget).parent().parent().width();
                var docHeight=$(evet.currentTarget).parent().parent().height();
                var winWidth=docWidth*0.9;
                var winHeight=110;
                var winX=(docWidth - winWidth) * 0.5;
                var winY=(docHeight - winHeight) * 0.5;
                addBigWinOfTime06.win = new LSMScreen.SimpleWindow({
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
                var contentHtml = CONTENTHTMLOFCOMMON(currEcharts);
                

                $(addBigWinOfTime06.win.content).html(contentHtml);

                internetTV.initTime(currEcharts);

               $(addBigWinOfTime06.win.content).find(":button").on('click',function(evt){
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
                 addBigWinOfTime06.win.closeWin(); 
               });       
        }else{
               //$("body").append(addBigWinOfTime06.win.win);
               addBigWinOfTime06.win.show();
        };
};
var addBigWinOfTime08={win:null};
internetTV.addBigWinOfTime08 =function(evet) {
        var currEcharts = $(this).attr('name');
        TIMEOFECHARTS = currEcharts;
        if (addBigWinOfTime08.win == null) {
                
                /*var docWidth=$('body').width();
                var winWidth=docWidth*0.24*0.9;
                var winHeight=110;
                var winX=$(evet.currentTarget).parent().parent().offset().left+winWidth*0.05;
                var winY=$(evet.currentTarget).parent().parent().offset().top+72;*/

                var docWidth=$(evet.currentTarget).parent().parent().width();
                var docHeight=$(evet.currentTarget).parent().parent().height();
                var winWidth=docWidth*0.9;
                var winHeight=110;
                var winX=(docWidth - winWidth) * 0.5;
                var winY=(docHeight - winHeight) * 0.5;
                addBigWinOfTime08.win = new LSMScreen.SimpleWindow({
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
                var contentHtml = CONTENTHTMLOFCOMMON(currEcharts);
                

                $(addBigWinOfTime08.win.content).html(contentHtml);

                internetTV.initTime(currEcharts);

               $(addBigWinOfTime08.win.content).find(":button").on('click',function(evt){
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
                 addBigWinOfTime08.win.closeWin(); 
               });       
        }else{
               //$("body").append(addBigWinOfTime08.win.win);
               addBigWinOfTime08.win.show();
        };
};
var addBigWinOfTime09={win:null};
internetTV.addBigWinOfTime09 =function(evet) {
        var currEcharts = $(this).attr('name');
        TIMEOFECHARTS = currEcharts;
        if (addBigWinOfTime09.win == null) {
                
                /*var docWidth=$('body').width();
                var winWidth=docWidth*0.24*0.9;
                var winHeight=110;
                var winX=$(evet.currentTarget).parent().parent().offset().left+winWidth*0.05;
                var winY=$(evet.currentTarget).parent().parent().offset().top+72;*/

                var docWidth=$(evet.currentTarget).parent().parent().width();
                var docHeight=$(evet.currentTarget).parent().parent().height();
                var winWidth=docWidth*0.9;
                var winHeight=110;
                var winX=(docWidth - winWidth) * 0.5;
                var winY=(docHeight - winHeight) * 0.5;
                addBigWinOfTime09.win = new LSMScreen.SimpleWindow({
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
                var contentHtml = CONTENTHTMLOFCOMMON(currEcharts);
                

                $(addBigWinOfTime09.win.content).html(contentHtml);

                internetTV.initTime(currEcharts);

               $(addBigWinOfTime09.win.content).find(":button").on('click',function(evt){
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
                 addBigWinOfTime09.win.closeWin(); 
               });       
        }else{
               //$("body").append(addBigWinOfTime09.win.win);
               addBigWinOfTime09.win.show();
        };
};
var addBigWinOfTime10={win:null};
internetTV.addBigWinOfTime10 =function(evet) {
        var currEcharts = $(this).attr('name');
        TIMEOFECHARTS = currEcharts;
        if (addBigWinOfTime10.win == null) {
                
                /*var docWidth=$('body').width();
                var winWidth=docWidth*0.24*0.9;
                var winHeight=110;
                var winX=$(evet.currentTarget).parent().parent().offset().left+winWidth*0.05;
                var winY=$(evet.currentTarget).parent().parent().offset().top+72;*/

                var docWidth=$(evet.currentTarget).parent().parent().width();
                var docHeight=$(evet.currentTarget).parent().parent().height();
                var winWidth=docWidth*0.9;
                var winHeight=110;
                var winX=(docWidth - winWidth) * 0.5;
                var winY=(docHeight - winHeight) * 0.5;
                addBigWinOfTime10.win = new LSMScreen.SimpleWindow({
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
                var contentHtml = CONTENTHTMLOFCOMMON(currEcharts);
                

                $(addBigWinOfTime10.win.content).html(contentHtml);

                internetTV.initTime(currEcharts);

               $(addBigWinOfTime10.win.content).find(":button").on('click',function(evt){
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
                 addBigWinOfTime10.win.closeWin(); 
               });       
        }else{
               //$("body").append(addBigWinOfTime10.win.win);
               addBigWinOfTime10.win.show();
        };
};
var addBigWinOfTime11={win:null};
internetTV.addBigWinOfTime11 =function(evet) {
        var currEcharts = $(this).attr('name');
        TIMEOFECHARTS = currEcharts;
        if (addBigWinOfTime11.win == null) {
                
                /*var docWidth=$('body').width();
                var winWidth=docWidth*0.24*0.9;
                var winHeight=110;
                var winX=$(evet.currentTarget).parent().parent().offset().left+winWidth*0.05;
                var winY=$(evet.currentTarget).parent().parent().offset().top+72;*/

                var docWidth=$(evet.currentTarget).parent().parent().width();
                var docHeight=$(evet.currentTarget).parent().parent().height();
                var winWidth=docWidth*0.9;
                var winHeight=110;
                var winX=(docWidth - winWidth) * 0.5;
                var winY=(docHeight - winHeight) * 0.5;
                addBigWinOfTime11.win = new LSMScreen.SimpleWindow({
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
                var contentHtml = CONTENTHTMLOFCOMMON(currEcharts);
                

                $(addBigWinOfTime11.win.content).html(contentHtml);

                internetTV.initTime(currEcharts);

               $(addBigWinOfTime11.win.content).find(":button").on('click',function(evt){
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
                 addBigWinOfTime11.win.closeWin(); 
               });       
        }else{
               //$("body").append(addBigWinOfTime11.win.win);
               addBigWinOfTime11.win.show();
        };
};


var addBigWinOfTimeAddCommon={};
internetTV.addBigWinOfTimeAddCommon =function(evet) {
        var currEcharts = $(this).attr('name');
        TIMEOFECHARTS = currEcharts;
        if (addBigWinOfTimeAddCommon['win_'+currEcharts] == null) {
                
                /*var docWidth=$('body').width();
                var winWidth=docWidth*0.24*0.9;
                var winHeight=110;
                var winX=$(evet.currentTarget).parent().parent().offset().left+winWidth*0.05;
                var winY=$(evet.currentTarget).parent().parent().offset().top+72;*/

                var docWidth=$(evet.currentTarget).parent().parent().width();
                var docHeight=$(evet.currentTarget).parent().parent().height();
                var winWidth=docWidth*0.9;
                var winHeight=110;
                var winX=(docWidth - winWidth) * 0.5;
                var winY=(docHeight - winHeight) * 0.5;
                addBigWinOfTimeAddCommon['win_'+currEcharts] = new LSMScreen.SimpleWindow({
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
                var contentHtml = CONTENTHTMLOFCOMMON(currEcharts);
                

                $(addBigWinOfTimeAddCommon['win_'+currEcharts].content).html(contentHtml);

                internetTV.initTime(currEcharts);

               $(addBigWinOfTimeAddCommon['win_'+currEcharts].content).find(":button").on('click',function(evt){
                if($(evt.currentTarget).val()=="确定"){
                    var whatType = TIMEOFECHARTS; 
                    internetTV.loadEchartsDataLineAll(whatType);
                }
                addBigWinOfTimeAddCommon['win_'+currEcharts].closeWin(); 
               });       
        }else{
               //$("body").append(addBigWinOfTime11.win.win);
        	addBigWinOfTimeAddCommon['win_'+currEcharts].show();
        };
};