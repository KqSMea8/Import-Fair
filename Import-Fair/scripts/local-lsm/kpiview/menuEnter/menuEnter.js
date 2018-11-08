var iframeUrl = {
    frame1:"kpiview.jsp",
    frame2:"../areamonitor/extraMenuFrame.jsp?menuId=MENU_DAREAS",
    frame3:"../areamonitor/extraMenuFrame.jsp?menuId=MENU_DCELLS",
    frame4:"../areamonitor/extraMenuFrame.jsp?menuId=MENU_DAPPS",
    frame5:"../shvideoe2e/videoScreen.jsp",
    frame6:"internetTV.jsp",
    frame7:"idcView.jsp?groupType=0",
    frame8:"idcView.jsp?groupType=1"
}
var menuEnter = {
    init:function(){
        menuEnter.initEvent();
    },
    initEvent:function(){
        $(".menuDiv").find('.onclickLi').on('click',menuEnter.changeIframe);

        $(".specialLi").on('mouseover', function(event) {
            event.preventDefault();
            $(this).find(".li_menu_div").css('display', 'block');
            
        });
        $(".specialLi").on('mouseout', function(event) {
            event.preventDefault();
            $(this).find(".li_menu_div").css('display', 'none');
            
        });

        $(".helpPic").on('click', menuEnter.addBigWinOfhelp);
    },
    changeIframe:function(){
        var currIframe = $(this).attr('name');
        //处理li样式
        $("li,.onclickLi").removeClass('addBottom');
        $(this).addClass('addBottom');
        //特殊小菜单 处理父li样式
        $(".li_menu_div").css('display', 'none');
        $(this).parents("li").removeClass('clearBottom');
        $(this).parents("li").addClass('addBottom');
        //处理显示的iframe
        $(".singleIframe").css('display', 'none'); 
        $("#"+currIframe) .css('display', 'block'); 

        $("#"+currIframe).attr('src', iframeUrl[currIframe]);


    },
    addBigWinOfhelp: function() {
        var currEcharts = $(this).attr('name');
        var docWidth = $(document).width();
        var docHeight = $(document).height();
        var winWidth = docWidth * 0.7;
        var winHeight = docHeight * 0.9;
        var win = new LSMScreen.SimpleWindow({
            title: "帮助文档",
            width: winWidth,
            height: winHeight,
            x: (docWidth - winWidth) * 0.5,
            y: (docHeight - winHeight) * 0.5,
            beforeClose: function() {}
        });
        var contentHtml = '';

        contentHtml += '' 
                    +  '<div id="helpDiv" style="width:100%;height:98%">'
                    +     '<div style="float:left;width:99%;height:100%;border:1px solid #078ceb;margin:0px 5px;color: #fff;font-size: 23px;overflow: auto;">'
                    +        '<div>'
                    

                    +        '<span class="helpTitle" style="padding-left:0px">指标说明</span>'
                    +        '<span style="padding-left:50px">本应用所用网络质量统计数据，主要来自LTE网管报表、GSM网管报表以及DPI信令系统。</span>'
                    +        '<span class="helpTitle">1. 数据来源概述</span>'
                    +        '<table class="helpTable">'
                    +        '<tr><td class="helpTableTitle" style="width:200px">数据源</td><td class="helpTableTitle">说明</td><td class="helpTableTitle" style="width:300px">统计周期</td></tr>'
                    +        '<tr><td class="helpTableData">LTE网管</td><td class="helpTableData">涵盖LTE小区业务量、负荷和质量指标</td><td class="helpTableData">15分钟</td></tr>'
                    +        '<tr><td class="helpTableData">GSM网管</td><td class="helpTableData">涵盖GSM小区业务量、负荷和质量指标</td><td class="helpTableData">1小时</td></tr>'
                    +        '<tr><td class="helpTableData">DPI信令</td><td class="helpTableData">涵盖用户数、业务感知指标</td><td class="helpTableData">5分钟</td></tr>'
                    +        '</table>'

                    +        '<span class="helpTitle">2. 关键指标</span>'
                    +        '<table class="helpTable">'
                    +        '<tr><td class="helpTableTitle" style="width:200px">指标名称</td><td class="helpTableTitle">说明</td><td class="helpTableTitle" style="width:300px">数据源</td></tr>'
                    +        '<tr><td class="helpTableData">区域用户数</td><td class="helpTableData">统计保障区域1小时内与网络存在交互信令的剔重用户</td><td class="helpTableData">DPI信令（每5分钟刷新）</td></tr>'
                    +        '<tr><td class="helpTableData">核心区域用户数</td><td class="helpTableData">统计保障核心区域1小时内与网络存在交互信令的剔重用户数</td><td class="helpTableData">DPI信令（每5分钟刷新）</td></tr>'
                    +        '<tr><td class="helpTableData">CS话务量</td><td class="helpTableData">区域内GSM小区的语音话务量</td><td class="helpTableData">GSM网管(1小时)</td></tr>'
                    +        '<tr><td class="helpTableData">VOLTE无线话务量</td><td class="helpTableData">区域内LTE小区的Volte语音话务量</td><td class="helpTableData">LTE网管(15分钟)</td></tr>'
                    +        '<tr><td class="helpTableData">GSM流量</td><td class="helpTableData">区域内GSM小区的数据流量</td><td class="helpTableData">GSM网管(1小时)</td></tr>'
                    +        '<tr><td class="helpTableData">LTE流量</td><td class="helpTableData">区域内LTE小区的数据流量</td><td class="helpTableData">LTE网管(15分钟)</td></tr>'
                    +        '<tr><td class="helpTableData">GSM流量(信令)</td><td class="helpTableData">区域内GSM小区5分钟内的数据流量</td><td class="helpTableData">DPI信令（5分钟）</td></tr>'
                    +        '<tr><td class="helpTableData">LTE流量(信令)</td><td class="helpTableData">区域内LTE小区5分钟内的数据流量</td><td class="helpTableData">DPI信令（5分钟）</td></tr>'
                    +        '<tr><td class="helpTableData">LTE无线接通率</td><td class="helpTableData">体现区域内LTE小区无线接入质量</td><td class="helpTableData">LTE网管(15分钟)</td></tr>'
                    +        '<tr><td class="helpTableData">Volte语音无线接通率</td><td class="helpTableData">体现区域内LTE小区Volte语音无线接入质量</td><td class="helpTableData">LTE网管(15分钟)</td></tr>'
                    +        '</table>'
                    +        ''    
                    +        '<span class="helpTitle">3. 质差规则</span>'
                    +        '<span style="padding-left:75px">1) 质差区域判别规则</span>'
                    +        '<table class="helpTable">'
                    +        '<tr><td class="helpTableTitle" style="width:200px">质差对象</td><td class="helpTableTitle">质差规则</td></tr>'
                    +        '<tr><td class="helpTableData" rowspan="4">LTE质差</td><td class="helpTableData">LTE无线接通率<90%且E-RAB建立请求次数 > 1000</td></tr>'
                    +        '<tr><td class="helpTableData">LTE无线掉线率>5%且E-RAB建立成功次数 >1000</td></tr>'
                    +        '<tr><td class="helpTableData">LTE上行PRB平均利用率>60%且E-RAB建立请求次数 > 1000 且 上行用户平均速率<0.1Mbps</td></tr>'
                    +        '<tr><td class="helpTableData">LTE下行PRB平均利用率>60%且E-RAB建立请求次数 > 1000 且 下行用户平均速率<1Mbps</td></tr>'
                    +        '<tr><td class="helpTableData">GSM质差</td><td class="helpTableData">GSM无线接通率<90%且GSM-TCH尝试次 > 1000</td></tr>'
                    +        '<tr><td class="helpTableData">LTE信令质差</td><td class="helpTableData">LTE TCP23次握手成功率<70%且TCP23次握手次数>10000</td></tr>'
                    +        '</table>'

                    +        '<span style="padding-left:75px">2) 质差小区判别规则</span>'
                    +        '<table class="helpTable">'
                    +        '<tr><td class="helpTableTitle" style="width:200px">质差对象</td><td class="helpTableTitle">质差规则</td></tr>'
                    +        '<tr><td class="helpTableData" rowspan="4">LTE质差小区</td><td class="helpTableData">LTE无线接通率<90%且E-RAB建立请求次数 > 400，连续4个周期指标劣化</td></tr>'
                    +        '<tr><td class="helpTableData">LTE无线掉线率>5%且E-RAB建立成功次数 > 400，连续4个周期指标劣化</td></tr>'
                    +        '<tr><td class="helpTableData">LTE上行PRB平均利用率>60%且E-RAB建立请求次数 > 500 且 上行用户平均速率<0.1Mbps</td></tr>'
                    +        '<tr><td class="helpTableData">LTE下行PRB平均利用率>60%且E-RAB建立请求次数 > 500 且 下行用户平均速率<1Mbps</td></tr>'
                    +        '<tr><td class="helpTableData">GSM质差小区</td><td class="helpTableData">GSM无线接通率<90%且GSM-TCH尝试次 > 100</td></tr>'
                    +        '<tr><td class="helpTableData">LTE信令质差小区</td><td class="helpTableData">LTE TCP23次握手成功率<70%且TCP23次握手次数>1000</td></tr>'
                    +        '</table>'

                    +        '<span style="padding-left:75px">3) 质差业务判别规则</span>'
                    +        '<table class="helpTable">'
                    +        '<tr><td class="helpTableTitle" style="width:200px">质差对象</td><td class="helpTableTitle">质差规则</td></tr>'
                    +        '<tr><td class="helpTableData" rowspan="4">质差业务</td><td class="helpTableData">TCP建链成功率<80%且TCP建链次数>1000</td></tr>'
                    +        '<tr><td class="helpTableData">TCP建链时延>1s且TCP建链次数>1000</td></tr>'
                    +        '<tr><td class="helpTableData">HTTP响应成功率<80%且HTTP请求次>1000</td></tr>'
                    +        '<tr><td class="helpTableData">HTTP响应时延>1s且HTTP请求次>1000</td></tr>'
                    +        '</table>'


                    +        '<div>'    
                    +     '</div>'
                    //+     '<div style="float:left;width:49.5%;height:100%;border:1px solid pink">'
                    //+     ''
                   // +     '</div>'
                    +  '</div>'

        $(win.content).html(contentHtml);
        $(win.title).css('text-align', 'center');
        $(win.title).find('span').css('vertical-align', 'sub');
    }
}