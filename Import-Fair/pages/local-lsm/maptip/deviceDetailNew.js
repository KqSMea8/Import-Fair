var indexList = {
    _2G_15minIndex:[
                    {name:"2G话务量",id:"gsmhwl",indexType:"gsm",rate:1,unit:"Erl",toFixed:2,iconClass:"tipIconwuxiangdiaohualv",tableWidth:300,sorts:1,indexShow:true,tableHide:false},
                    {name:"用户数",id:"s_091",indexType:"kpi",rate:1,unit:"人",toFixed:0,iconClass:"tipIconwuxiangdiaohualv",tableWidth:200,sorts:2,indexShow:true,tableHide:false},
                    {name:"流量",id:"s_206",indexType:"kpi",rate:1024,unit:"MB",toFixed:2,iconClass:"tipIconwuxiangdiaohualv",tableWidth:200,sorts:3,indexShow:true,tableHide:false},
                    {name:"2G无线利用率",id:"gsm_wireless_use_ratio",indexType:"gsm",rate:1,unit:"%",toFixed:2,iconClass:"tipIconwuxiangdiaohualv",tableWidth:300,sorts:4,indexShow:true,tableHide:false},
                    //{name:"2G无线接通率",id:"gsm_wireless_conn_ratio",indexType:"gsm",rate:1,unit:"%",toFixed:2,iconClass:"tipIconwuxiangdiaohualv",tableWidth:300,sorts:5,indexShow:true,tableHide:false},
                    {name:"2G接通率",id:"gsm_conn_ratio",indexType:"gsm",rate:1,unit:"%",toFixed:2,iconClass:"tipIconwuxiangdiaohualv",tableWidth:300,sorts:5,indexShow:true,tableHide:false},
                    //{name:"上行TBF建立成功率",id:"gsm_ul_tbf_succ_ratio",indexType:"kpi",rate:1,unit:"%",toFixed:2,iconClass:"tipIconwuxiangdiaohualv",tableWidth:300,sorts:6,indexShow:true,tableHide:false},
                    //{name:"下行TBF建立成功率",id:"s_091",indexType:"kpi",rate:1,unit:"%",toFixed:2,iconClass:"tipIconwuxiangdiaohualv",tableWidth:300,sorts:7,indexShow:true,tableHide:false},
                    //{name:"GSM频带45占比",id:"gsm_disturb_45_ratio",indexType:"kpi",rate:1,unit:"%",toFixed:0,iconClass:"tipIconwuxiangdiaohualv",tableWidth:300,sorts:8,indexShow:true,tableHide:false},
                    {name:"2G掉话率",id:"gsm_wireless_drop_ratio",indexType:"gsm",rate:1,unit:"%",toFixed:2,iconClass:"tipIconwuxiangdiaohualv",tableWidth:300,sorts:8,indexShow:true,tableHide:false},


                    {name:"小区名称",id:"cell_name",indexType:"",rate:1,unit:"",toFixed:2,iconClass:"",tableWidth:350,sorts:0,indexShow:false,tableHide:false},
                    {name:"lacci",id:"lacci",indexType:"",rate:1,unit:"",toFixed:2,iconClass:"",tableWidth:10,sorts:999,indexShow:false,tableHide:true}

    ],
    _4G_1minIndex:[
                    {name:"用户数",id:"s_091",indexType:"kpi",rate:1,unit:"人",toFixed:0,iconClass:"tipIconwuxiangdiaohualv",tableWidth:200,sorts:3,indexShow:true,tableHide:false},
                    {name:"流量",id:"lte_flow_",indexType:"lte",rate:1024,unit:"MB",toFixed:2,iconClass:"tipIconwuxiangdiaohualv",tableWidth:200,sorts:4,indexShow:true,tableHide:false},
                    //{name:"最大用户数",id:"max_volte_user_cnt_",indexType:"lte",rate:1,unit:"人",toFixed:2,iconClass:"tipIconwuxiangdiaohualv",tableWidth:300,sorts:3,indexShow:true,tableHide:false},
                    {name:"4G接通率",id:"lte_wireless_conn_ratio_",indexType:"lte",rate:1,unit:"%",toFixed:2,iconClass:"tipIconwuxiangdiaohualv",tableWidth:300,sorts:1,indexShow:true,tableHide:false},
                    {name:"4G掉话率",id:"lte_wireless_drop_ratio_",indexType:"lte",rate:1,unit:"%",toFixed:2,iconClass:"tipIconwuxiangdiaohualv",tableWidth:300,sorts:2,indexShow:true,tableHide:false},
                    //{name:"FDD无线利用率",id:"lte_wireless_use_ratio_fdd_",indexType:"lte",rate:1,unit:"%",toFixed:2,iconClass:"tipIconwuxiangdiaohualv",tableWidth:300,sorts:6,indexShow:true,tableHide:false},
                    //{name:"4G上行流量",id:"lte_flow_ul_",indexType:"lte",rate:1,unit:"%",toFixed:2,iconClass:"tipIconwuxiangdiaohualv",tableWidth:300,sorts:7,indexShow:true,tableHide:false},
                    //{name:"VOLTE平均用户数",id:"avg_volte_user_cnt_",indexType:"lte",rate:1,unit:"%",toFixed:2,iconClass:"tipIconwuxiangdiaohualv",tableWidth:300,sorts:8,indexShow:true,tableHide:false},
                    ////{name:"4G上行干扰电平",id:"lte_ul_interfere_level_",indexType:"lte",rate:1,unit:"%",toFixed:2,iconClass:"tipIconwuxiangdiaohualv",tableWidth:300,sorts:9,indexShow:true,tableHide:false},
                    //{name:"切换成功率",id:"lte_sw_succ_ratio_",indexType:"lte",rate:1,unit:"%",toFixed:2,iconClass:"tipIconwuxiangdiaohualv",tableWidth:300,sorts:10,indexShow:true,tableHide:false},
                    ////{name:"无线利用率",id:"lte_wireless_use_ratio_",indexType:"lte",rate:1,unit:"%",toFixed:2,iconClass:"tipIconwuxiangdiaohualv",tableWidth:300,sorts:11,indexShow:true,tableHide:false},
                    //{name:"4G下行流量",id:"lte_flow_dl_",indexType:"lte",rate:1,unit:"%",toFixed:2,iconClass:"tipIconwuxiangdiaohualv",tableWidth:300,sorts:12,indexShow:true,tableHide:false},
                    {name:"上行PRB利用率",id:"lte_ul_prb_use_ratio_",indexType:"lte",rate:1,unit:"%",toFixed:2,iconClass:"tipIconwuxiangdiaohualv",tableWidth:300,sorts:13,indexShow:true,tableHide:false},
                    {name:"下行PRB利用率",id:"lte_dl_prb_use_ratio_",indexType:"lte",rate:1,unit:"%",toFixed:2,iconClass:"tipIconwuxiangdiaohualv",tableWidth:300,sorts:14,indexShow:true,tableHide:false},
                    {name:"RRC连接数",id:"lte_rrc_conn_cnt_",indexType:"lte",rate:1,unit:"个",toFixed:0,iconClass:"tipIconwuxiangdiaohualv",tableWidth:300,sorts:15,indexShow:true,tableHide:false},
                    //{name:"上行PRB利用率-FDD",id:"lte_ul_prb_use_ratio_fdd_",indexType:"lte",rate:1,unit:"%",toFixed:2,iconClass:"tipIconwuxiangdiaohualv",tableWidth:350,sorts:16,indexShow:true,tableHide:false},
                    //{name:"下行PRB利用率-FDD",id:"lte_dl_prb_use_ratio_fdd_",indexType:"lte",rate:1,unit:"%",toFixed:2,iconClass:"tipIconwuxiangdiaohualv",tableWidth:350,sorts:17,indexShow:true,tableHide:false},
                    {name:"平均干扰电平",id:"lte_ul_interfere_level_",indexType:"lte",rate:1,unit:"dBm",toFixed:2,iconClass:"tipIconwuxiangdiaohualv",tableWidth:350,sorts:16,indexShow:true,tableHide:false},
                    {name:"无线利用率",id:"lte_wireless_use_ratio_",indexType:"lte",rate:1,unit:"%",toFixed:2,iconClass:"tipIconwuxiangdiaohualv",tableWidth:350,sorts:17,indexShow:true,tableHide:false},
                    {name:"小区名称",id:"cell_name",indexType:"",rate:1,unit:"",toFixed:2,iconClass:"",tableWidth:350,sorts:0,indexShow:false,tableHide:false},
                    {name:"lacci_",id:"lacci_",indexType:"",rate:1,unit:"",toFixed:2,iconClass:"",tableWidth:10,sorts:999,indexShow:false,tableHide:true}
    ],

    
    _4G_15minIndex:[
                    {name:"用户数",id:"s_091",indexType:"kpi",rate:1,unit:"人",toFixed:0,iconClass:"tipIconwuxiangdiaohualv",tableWidth:200,sorts:3,indexShow:true,tableHide:false},
                    {name:"流量",id:"s_213",indexType:"kpi",rate:1024,unit:"MB",toFixed:2,iconClass:"tipIconliuliang",tableWidth:200,sorts:4,indexShow:true,tableHide:false},
                    {name:"4G话务量",id:"ltehwl",indexType:"lte",rate:1,unit:"Erl",toFixed:2,iconClass:"tipIconhuawuliang",tableWidth:300,sorts:1,indexShow:true,tableHide:false},
                    {name:"4G接通率",id:"s_211",indexType:"kpi",rate:1,unit:"%",toFixed:2,iconClass:"tipIconwuxianjietonglv",tableWidth:300,sorts:2,indexShow:true,tableHide:false},
                    {name:"4G掉话率",id:"s_185",indexType:"kpi",rate:1,unit:"%",toFixed:2,iconClass:"tipIconvoltediaohualv",tableWidth:300,sorts:5,indexShow:true,tableHide:false},
                    //{name:"VOLTE接通率",id:"lte_wireless_conn_ratio",indexType:"lte",rate:1,unit:"%",toFixed:2,iconClass:"tipIconwuxianjietonglv",tableWidth:300,sorts:6,indexShow:true,tableHide:false},
                    {name:"平均干扰电平",id:"ulmeannl_prb",indexType:"lte",rate:1,unit:"dBm",toFixed:2,iconClass:"tipIconwuxiangdiaohualv",tableWidth:350,sorts:5,indexShow:true,tableHide:false},

                    {name:"上行PRB利用率",id:"lte_ul_prb_use_ratio",indexType:"lte",rate:1,unit:"%",toFixed:2,iconClass:"tipIconupprbliyonglv",tableWidth:300,sorts:7,indexShow:true,tableHide:false},
                    {name:"下行PRB利用率",id:"lte_dl_prb_use_ratio",indexType:"lte",rate:1,unit:"%",toFixed:2,iconClass:"tipIcondownprbliyonglv",tableWidth:300,sorts:8,indexShow:true,tableHide:false},
                    {name:"RRC连接数",id:"succconnestab",indexType:"lte",rate:1,unit:"个",toFixed:0,iconClass:"tipIconrrczuidalianjieshu",tableWidth:300,sorts:9,indexShow:true,tableHide:false},


                    {name:"小区名称",id:"cell_name",indexType:"",rate:1,unit:"",toFixed:2,iconClass:"",tableWidth:350,sorts:0,indexShow:false,tableHide:false},
                    {name:"lacci",id:"lacci",indexType:"",rate:1,unit:"",toFixed:2,iconClass:"",tableWidth:10,sorts:999,indexShow:false,tableHide:true}
    ],
}



var deviceDetailNew = {
    lte_flow_flag:null,
    init: function() {
        deviceDetailNew.initDom();
        deviceDetailNew.initDomEvent();
        deviceDetailNew.loadData();
        //deviceDetailNew.loadEcharts();
        
        //deviceDetailNew.loadCommonAddressCell();

    },
    initDom:function(){
        //填充

    },
    initDomEvent: function() {
        $(".outserverAndwarning").on('click', function(event) {
            event.preventDefault();
            $(".outserverAndwarning").removeClass('selectLi');
            $(this).addClass('selectLi');
            //处理事件

            $("#cellOutServiceTab").hide();
            $("#alarmInfo").hide();

            var values = $(this).attr('values');
            if (values == "outServer") {
                $("#cellOutServiceTab").show();
                $("#alarmInfo").hide();

            }else{
                $("#cellOutServiceTab").hide();
                $("#alarmInfo").show();
            }





        });
        $(".keyindexAndcommonaddresscell").on('click', function(event) {
            event.preventDefault();
            var values = $(this).attr('values');
            $(".keyindexAndcommonaddresscell").removeClass('selectLi');
            $(this).addClass('selectLi');
            $(".contentDivOfkeyOfcell").css('display', 'none');
            $('div[name = "' + values + '"]').css('display', '');
        });

        $(".tipKpis_4,.tipKpis_5").on('click', function(event) {
            event.preventDefault();
            var titleDom = $(this).find('div.pr').html();

            $("#echartsTitle").html(titleDom);
            $("#echartsTitle").find('div').eq(0).removeClass().addClass('tipIconqushitu');

            var indexType = $(this).find('span.clearValueSpan').attr('indexType');
            var ids = $(this).find('span.clearValueSpan').attr('id');
            deviceDetailNew.loadEcharts(indexType,ids);
        });


        //关联的传输设备
        $("#associatedTransmissionEquipment").on('click', function(event) {
            event.preventDefault();
            var param = $(this).text();
            parent.showTopoOfTransmission('transmissionEquipment',param);

        });
        //关联的传输子网 - 西区中博会
        $("#associatedTransmissionSubnet_1").on('click', function(event) {
            event.preventDefault();
            parent.showTopoOfTransmission('transmissionSubnet_1');

        });
        //关联的传输子网 - 青浦虹桥205环
        $("#associatedTransmissionSubnet_2").on('click', function(event) {
            event.preventDefault();
            parent.showTopoOfTransmission('transmissionSubnet_2');

        });

    },
    loadData:function(){
        //填充小区名称
        //$("#cellnameList").val(CELLNAME);
        deviceDetailNew.getUsers();
        deviceDetailNew.getAlamInfo();
        //deviceDetailNew.getTopoInfo();

        

    },

    loadEcharts: function(indexType,ids) {  
        $("#chart").empty();

        /*
            信令：lsm-cell-kpi-trend?ids=
            gsm网管:lsm-cell-gsm-wg-trend?ids=
            lte网管：lsm-cell-lte-wg-trend?ids=
        */
        var url = '';//
        if(indexType == "kpi" || indexType == "kpi_1min"){
            var url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-cell-kpi-trend?ids='+ encodeURIComponent(LACCI);
        }else if(indexType == "gsm"){
            var url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-cell-gsm-wg-trend?ids='+ encodeURIComponent(LACCI);
        }else if(indexType == "lte"){
            var url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-cell-lte-wg-trend?ids='+ encodeURIComponent(LACCI);
        }else if(indexType == "lte_1min"){
            var url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-cell-lte-wg-min-trend?ids='+ encodeURIComponent(LACCI);
        }
        url+='&smooth='+SMOOTH;

        $.ajax({
            url: url,
            type: 'get',         //数据发送方式
            dataType: 'json',     //接受数据格式
            //contentType: "application/json",
            //accessType: "application/json",
            //timeout:5000,
            data:{},
            beforeSend: function(XMLHttpRequest){
                $("#chartLoading").show();
            },
            complete: function(XMLHttpRequest,textStatus){
                $("#chartLoading").hide();
            }
        }).done(function(result){
            //console.log(result) 
            var data = result.data;
            var xdata = [];
            var ydata = [];
            for (var i = 0; i < data.length; i++) {
                //ydata.push((Math.random()*100).toFixed(2));
                var currPoint = data[i];
                xdata.push(currPoint.time.substring(11,16));  //2018-08-27 12:00:00
                var yd = currPoint[ids];
                if (ids == "s_206" || ids == "s_213" || ids == "lte_flow_") {
                    yd = (yd/1024).toFixed(2);
                }
                if (ids == "succconnestab"){
                    yd = (yd/1).toFixed(0);

                }
                ydata.push(yd==null?"0":yd);
            }
            //开始绘制饼图
            require(
                [
                    'echarts',
                    'echarts/chart/line' // 使用柱状图就加载bar模块，按需加载
                ],
                function(ec) {
                    // 基于准备好的dom，初始化echarts图表
                    var myChart = ec.init(document.getElementById('chart'), 'macarons');
                    var option = {
                        title: {
                            show: false,
                            text: '',
                        },
                        tooltip: {
                            show: true,
                            trigger: 'axis'
                        },
                        legend: {
                            show: false,
                            data: []
                        },
                        toolbox: {
                            show: false,
                        },
                        calculable: false,
                        grid: {
                            borderWidth: 0,
                            x: 80,
                            y: 50,
                            x2: 30,
                            y2: 30
                        },
                        xAxis: [{
                            type: 'category',
                            splitLine: false,
                            splitArea: false,
                            axisLabel: {
                                textStyle: {
                                    color: "#fff"
                                }
                            },
                            boundaryGap: false,
                            //data: ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00']
                            data: xdata
                        }],
                        yAxis: [{
                            type: 'value',
                            splitLine: false,
                            splitArea: false,
                            axisLabel: {
                                textStyle: {
                                    color: "#fff"
                                }
                            },
                        }],
                        series: [{
                            name: '值',
                            type: 'line',
                            //symbol:'emptyCircle',
                            //data: [11, 11, 15, 13, 12, 13, 10, 45, 12, 65, 67, 56, 89, 90],
                            data: ydata,
                        }]

                    }

                    myChart.setOption(option, true);
                }
            ); //require


        }.bind(this));
    },
    
};

deviceDetailNew.getUsers = function(){

        //清空数据
        //基础信息数据
        $(".clearValueSpan_").text('');
        //指标数据
        $(".clearValueSpan").text('--');

        //获取数据
        var cdm=LSMScreen.CacheDataManager.getInstance();
        cdm.getCellKpiTopN({
            ids:LACCI
        },function(result){
            var list=result;
            for(var i=0;i<list.length;i++){
                var record=list[i];
                CELLNAME=record.cell_name;
                LAT=record.lat;
                LON=record.lon;



                var cell_nt=record.cell_nt ==null?"gsm":record.cell_nt;  //小区类型,以供判断指标显示情况(2G,4G不同)  //lte_flow_
                deviceDetailNew.lte_flow_flag=record.lte_flow_ ==null?"_15min":"_1min";  //流量   以判断是否 1min指标 或  5分钟指标

                // BELONGED 4G指标粒度 特殊选择
                if (BELONGED && BELONGED == "15" ) {
                    deviceDetailNew.lte_flow_flag = "_15min";
                }else if(BELONGED && BELONGED == "1"){
                    deviceDetailNew.lte_flow_flag = "_1min";
                }


                //IS_G  2G指标粒度 特殊选择
                if (IS_G && IS_G == "yes" ) {
                    deviceDetailNew.lte_flow_flag = "_15min";   //若是集团屏  4G 指标强制用 15min 粒度
                }else if(IS_G && IS_G == "no"){
                }


                var timeTypeStr = "";   //显示小区名称后面 的 时间粒度    格式:  【15分钟】

                if (cell_nt == "gsm") {
                    timeTypeStr = "【1小时】";
                }else if (cell_nt == "lte"){
                    if (deviceDetailNew.lte_flow_flag == "_15min") {
                        timeTypeStr = "【15分钟】";
                    }else if (deviceDetailNew.lte_flow_flag == "_1min") {
                        timeTypeStr = "【1分钟】";
                    } 
                };




                //填充基础信息
                //$('#cellnameList').val(record.cell_name);
                //$('#cellnameList').text(record.cell_name + timeTypeStr);
                $('#timeTypeStr').text(timeTypeStr);
                $('#cellnameList').text(record.cell_name);
                $('#cellnameList').attr('title', record.cell_name);
                $("#lacciSpan").text(record.lacci == null?"":record.lacci.replace(":","-"));
                $("#cellNetSpan").text( cell_nt=='gsm'?"2G":"4G");

                $("#lacciSpan").text(record.lacci == null?"":record.lacci.replace(":","-"));
                $("#citySpan").text(record.city == null?"":record.city);
                $("#stationSpan").text(record.station == null?"":record.station);
                $("#stationSpan").attr('title',record.station == null?"":record.station);
                $("#roomSpan").text(record.room == null?"":record.room);
                $("#roomSpan").attr("title",record.room == null?"":record.room);
                $("#maintenancedeptSpan").text(record.maintenancedept == null?"":record.maintenancedept);


                //topo传输基础信息

                //var trans_dv = record.trans_dv == null?"汇聚怒江02/SHNJ11-2T/3-18-A-1/PTNZX9008":record.trans_dv;
                var trans_dv = record.trans_dv == null?"":record.trans_dv;
                $("#associatedTransmissionEquipment").text(trans_dv);
                $("#associatedTransmissionEquipment").attr('title', trans_dv);
                if (trans_dv != "") {
                    $("#associatedTransmissionEquipmentTd").show();
                }
                
                //var trans_sub_dv = record.trans_sub_dv == null?"西区中博会":record.trans_sub_dv;  
                //var trans_sub_dv = record.trans_sub_dv == null?"青浦虹桥205环":record.trans_sub_dv;  
                //var trans_sub_dv = record.trans_sub_dv == null?"西区中博会,青浦虹桥205环":record.trans_sub_dv;  
                var trans_sub_dv = record.trans_sub_dv == null?"":record.trans_sub_dv;  
                //判断是否显示逗号
                if (trans_sub_dv.indexOf("中博会") > -1 && trans_sub_dv.indexOf("虹桥205") > -1 ) {
                    $("#symbolOfcomma").show();  
                }
                //值写死
                if (trans_sub_dv.indexOf("中博会") > -1  ) {
                    $("#associatedTransmissionSubnet_1").show();
                    $("#associatedTransmissionSubnet_1").text('西区中博会');
                    $("#associatedTransmissionSubnet_1").attr('title', '西区中博会');
                    $("#associatedTransmissionSubnetTd").show();
                }

                if (trans_sub_dv.indexOf("虹桥205") > -1 ) {
                    $("#associatedTransmissionSubnet_2").show();
                    $("#associatedTransmissionSubnet_2").text('青浦虹桥205环');
                    $("#associatedTransmissionSubnet_2").attr('title', '青浦虹桥205环');
                    $("#associatedTransmissionSubnetTd").show();
                }

                if (trans_sub_dv.indexOf("中博会") == -1 && trans_sub_dv.indexOf("虹桥205") == -1  ) {
                    $("#noClickIndex").show();
                    $("#noClickIndex").text(trans_sub_dv);
                    $("#noClickIndex").attr('title', trans_sub_dv);
                    if (trans_sub_dv!="") {
                        $("#associatedTransmissionSubnetTd").show();
                    }

                }


                //以供同址使用
                deviceDetailNew.netType = cell_nt;
                deviceDetailNew.lteType = record.lte_type;

                //初始化指标 dom
                if (cell_nt =="lte") {
                    if (deviceDetailNew.lte_flow_flag == "_15min") { //5分钟粒度指标
                        var currIndexArr = indexList._4G_15minIndex;
                        currIndexArr.sort(function(a, b) {return a.sorts - b.sorts});
                        //{name:"用户数",id:"s_091",indexType:"kpi",rate:1,unit:"人",toFixed:0,iconClass:"tipIconwuxiangdiaohualv",tableWidth:300,indexShow:true},
                        var showNum = 0;  //统计指标显示数量,区分表格隐藏的指标数据
                        var htmlStr = '';
                            htmlStr += '<div class="horizontalRow fontSubInfo tipKpiPanel indexShowHide4G" style="display: none;">';
                            for (var i = 0; i < currIndexArr.length; i++) {
                                var currIndex = currIndexArr[i];

                                var name = currIndex.name;
                                var id = currIndex.id;
                                var indexType = currIndex.indexType;
                                var unit = currIndex.unit;
                                // var iconClass = currIndex.iconClass;
                                var iconClass ="";
                                var rate = currIndex.rate;
                                var toFixed = currIndex.toFixed;
                                var titleName = name + (unit == ""?"":("（"+unit+"）"));
                                if (showNum == 5) {
                                    htmlStr += '</div>'
                                    htmlStr += '<div class="horizontalRow fontSubInfo tipKpiPanel indexShowHide4G" style="display: none;">'
                                };
                                if (currIndex.indexShow) {
                                    var classRewgfgweg = showNum < 5 ?"tipKpis_5":"tipKpis_4";
                                    //var classRewgfgweg = showNum < 5 ?"tipKpis_5":"tipKpis_4";
                                    htmlStr += '<div class="'+classRewgfgweg+'">'
                                    htmlStr +=     '<div class="pr"><div class="'+iconClass+'"></div><span class="tiptitle">'+titleName+'</span></div>'
                                    //htmlStr +=     '<div><span class="clearValueSpan" indexType="'+indexType+'" id="'+id+'">'+(record[id]==null?'--':(record[id]/rate).toFixed(toFixed))+'</span><span style="font-size:20px;">'+unit+'</span></div>'
                                    htmlStr +=     '<div><span class="clearValueSpan" indexType="'+indexType+'" id="'+id+'">'+(record[id]==null?'--':(record[id]/rate).toFixed(toFixed))+'</span><span style="font-size:20px;"></span></div>'
                                    htmlStr += '</div>'
                                    showNum ++;
                                }
                            }
                            htmlStr += '</div>';
                        $("#_4GIndexDiv").html(htmlStr);
                    };
                    if (deviceDetailNew.lte_flow_flag == "_1min") { //1分钟粒度指标
                        var currIndexArr = indexList._4G_1minIndex;
                        currIndexArr.sort(function(a, b) {return a.sorts - b.sorts});
                        //{name:"用户数",id:"s_091",indexType:"kpi",rate:1,unit:"人",toFixed:0,iconClass:"tipIconwuxiangdiaohualv",tableWidth:300,indexShow:true},
                        var showNum = 0;  //统计指标显示数量,区分表格隐藏的指标数据
                        var htmlStr = '';
                            htmlStr += '<div class="horizontalRow fontSubInfo tipKpiPanel indexShowHide4G" style="display: none;">';
                            for (var i = 0; i < currIndexArr.length; i++) {
                                var currIndex = currIndexArr[i];

                                var name = currIndex.name;
                                var id = currIndex.id;
                                var indexType = currIndex.indexType;
                                var unit = currIndex.unit;
                                // var iconClass = currIndex.iconClass;
                                var iconClass ="";
                                var rate = currIndex.rate;
                                var toFixed = currIndex.toFixed;
                                var titleName = name + (unit == ""?"":("（"+unit+"）"));
                                if (showNum == 5) {
                                    htmlStr += '</div>'
                                    htmlStr += '<div class="horizontalRow fontSubInfo tipKpiPanel indexShowHide4G" style="display: none;">'
                                };
                                if (currIndex.indexShow) {
                                    var classRewgfgweg = showNum < 5 ?"tipKpis_5":"tipKpis_4";
                                    htmlStr += '<div class="'+classRewgfgweg+'">'
                                    htmlStr +=     '<div class="pr"><div class="'+iconClass+'"></div><span class="tiptitle">'+titleName+'</span></div>'
                                    // htmlStr +=     '<div><span class="clearValueSpan" indexType="'+indexType+'_1min" id="'+id+'">'+(record[id]==null?'--':(record[id]/rate).toFixed(toFixed))+'</span><span style="font-size:20px;">'+unit+'</span></div>'
                                    htmlStr +=     '<div><span class="clearValueSpan" indexType="'+indexType+'_1min" id="'+id+'">'+(record[id]==null?'--':(record[id]/rate).toFixed(toFixed))+'</span><span style="font-size:20px;"></span></div>'
                                    htmlStr += '</div>'
                                    showNum ++;
                                }
                            }
                            htmlStr += '</div>';
                        $("#_4GIndexDiv").html(htmlStr);
                    }

                }else{   //处理2G 指标
                    var currIndexArr = indexList._2G_15minIndex;
                    currIndexArr.sort(function(a, b) {return a.sorts - b.sorts});
                    //{name:"用户数",id:"s_091",indexType:"kpi",rate:1,unit:"人",toFixed:0,iconClass:"tipIconwuxiangdiaohualv",tableWidth:300,indexShow:true},
                    var showNum = 0;  //统计指标显示数量,区分表格隐藏的指标数据
                    var htmlStr = '';
                        htmlStr += '<div class="horizontalRow fontSubInfo tipKpiPanel indexShowHide2G" style="display: none;">';
                        for (var i = 0; i < currIndexArr.length; i++) {
                            var currIndex = currIndexArr[i];

                            var name = currIndex.name;
                            var id = currIndex.id;
                            var indexType = currIndex.indexType;
                            var unit = currIndex.unit;
                            //var iconClass = currIndex.iconClass;
                            var iconClass ="";
                            var rate = currIndex.rate;
                            var toFixed = currIndex.toFixed;
                            var titleName = name + (unit == ""?"":("（"+unit+"）"));
                            if (showNum == 4) {
                                htmlStr += '</div>'
                                htmlStr += '<div class="horizontalRow fontSubInfo tipKpiPanel indexShowHide2G" style="display: none;">'
                            };
                            if (currIndex.indexShow) {
                                htmlStr += '<div class="tipKpis_4">'
                                htmlStr +=     '<div class="pr"><div class="'+iconClass+'"></div><span class="tiptitle">'+titleName+'</span></div>'
                                // htmlStr +=     '<div><span class="clearValueSpan" indexType="'+indexType+'" id="'+id+'">'+(record[id]==null?'--':(record[id]/rate).toFixed(toFixed))+'</span><span style="font-size:20px;">'+unit+'</span></div>'
                                htmlStr +=     '<div><span class="clearValueSpan" indexType="'+indexType+'" id="'+id+'">'+(record[id]==null?'--':(record[id]/rate).toFixed(toFixed))+'</span><span style="font-size:20px;"></span></div>'
                                htmlStr += '</div>'
                                showNum ++;
                            }
                        }
                        htmlStr += '</div>';
                    $("#_2GIndexDiv").html(htmlStr);
                };

                //注册事件
                $(".tipKpis_4,.tipKpis_5").on('click', function(event) {
                    event.preventDefault();
                    var titleDom = $(this).find('div.pr').html();

                    $("#echartsTitle").html(titleDom);
                    //$("#echartsTitle").find('div').eq(0).removeClass().addClass('tipIconqushitu');
                    $("#echartsTitle").find('div').eq(0).removeClass().addClass('icon-shu');

                    $("#echartsTitle").find('div').eq(0).css({
                        position: 'absolute',
                        top: '-8px',
                        display: 'inline-block',
                    });//margin-left:
                    $("#echartsTitle").find('span').eq(0).css({
                        marginLeft: '15px',
                    });



                    var indexType = $(this).find('span.clearValueSpan').attr('indexType');
                    var ids = $(this).find('span.clearValueSpan').attr('id');
                    deviceDetailNew.loadEcharts(indexType,ids);
                });






                if (cell_nt =="lte") {
                    $(".indexShowHide4G").css('display', '');
                    $(".indexShowHide4G").eq(0).find(".tipKpis_5").eq(0).trigger('click');
                }else{
                    $(".indexShowHide2G").css('display', '');
                    $(".indexShowHide2G").eq(0).find(".tipKpis_4").eq(0).trigger('click');
                }


                // //2G
                // var s_206=record['s_206']==null?'--':(record['s_206']/1024).toFixed(2);     //2G流量
                // var gsmhwl=record['gsmhwl']==null?'--':(record['gsmhwl']/1).toFixed(2);     //GSM话务量
                // var gsm_wireless_use_ratio=record['gsm_wireless_use_ratio']==null?'--':(record['gsm_wireless_use_ratio']/1).toFixed(2);     //GSM无线利用率
                // var gsm_wireless_conn_ratio=record['gsm_wireless_conn_ratio']==null?'--':(record['gsm_wireless_conn_ratio']/1).toFixed(2);     //GSM无线接通率
                // var gsm_wireless_drop_ratio=record['gsm_wireless_drop_ratio']==null?'--':(record['gsm_wireless_drop_ratio']/1).toFixed(2);     //GSM无线掉话率
                // //自己造的
                // //var GSMDROPRATESELF= 100 - (gsm_wireless_conn_ratio == "--"?"0":gsm_wireless_conn_ratio);     //GSM无线掉话率
                
                // var gsm_ul_tbf_succ_ratio=record['gsm_ul_tbf_succ_ratio']==null?'--':(record['gsm_ul_tbf_succ_ratio']/1).toFixed(2);     //上行TBF建立成功率
                // var gsm_dl_tbf_succ_ratio=record['gsm_dl_tbf_succ_ratio']==null?'--':(record['gsm_dl_tbf_succ_ratio']/1).toFixed(2);     //下行TBF建立成功率
                // var gsm_disturb_45_ratio=record['gsm_disturb_45_ratio']==null?'--':(record['gsm_disturb_45_ratio']/1).toFixed(2);     //GSM频带45占比

                // //4G    lte_ flow_all
                // //var s_213=record['s_213']==null?'--':(record['s_213']/1024).toFixed(2);     //4G流量
                // var s_091=record['s_091']==null?'--':(record['s_091']/1).toFixed(0);     //4G用户数
                // var s_213=record['s_213']==null?'--':(record['s_213']/1024).toFixed(2);     //4G流量
                // var ltehwl=record['ltehwl']==null?'--':(record['ltehwl']/1).toFixed(2);     //4G话务量
                // var s_211=record['s_211']==null?'--':(record['s_211']/1).toFixed(2);     //无线接通率
                // var lte_wireless_drop_ratio=record['lte_wireless_drop_ratio']==null?'--':(record['lte_wireless_drop_ratio']/1).toFixed(2);     //无线掉话率
                // var lte_wireless_conn_ratio=record['lte_wireless_conn_ratio']==null?'--':(record['lte_wireless_conn_ratio']/1).toFixed(2);     //VOLTE接通率
                // var s_185=record['s_185']==null?'--':(record['s_185']/1).toFixed(2);     //VOLTE掉话率
                // var lte_ul_prb_use_ratio=record['lte_ul_prb_use_ratio']==null?'--':(record['lte_ul_prb_use_ratio']/1).toFixed(2);     //上行PRB利用率
                // var lte_dl_prb_use_ratio=record['lte_dl_prb_use_ratio']==null?'--':(record['lte_dl_prb_use_ratio']/1).toFixed(2);     //下行PRB利用率
                // var succconnestab=record['succconnestab']==null?'--':(record['succconnestab']/1).toFixed(0);     //RRC最大连接数    RRC连接建立成功次数


                
                

                // $('#s_206').text(s_206);
                // $('#gsmhwl').text(gsmhwl);
                // $('#gsm_wireless_use_ratio').text(gsm_wireless_use_ratio);
                // $('#gsm_wireless_conn_ratio').text(gsm_wireless_conn_ratio);
                // $('#gsm_wireless_drop_ratio').text(gsm_wireless_drop_ratio);
                // $('#gsm_ul_tbf_succ_ratio').text(gsm_ul_tbf_succ_ratio);
                // $('#gsm_dl_tbf_succ_ratio').text(gsm_dl_tbf_succ_ratio);
                // $('#gsm_disturb_45_ratio').text(gsm_disturb_45_ratio);

                // $('#s_091').text(s_091);
                // $('#s_213').text(s_213);
                // $('#ltehwl').text(ltehwl);
                // $('#s_211').text(s_211);
                // $('#lte_wireless_drop_ratio').text(lte_wireless_drop_ratio);
                // $('#lte_wireless_conn_ratio').text(lte_wireless_conn_ratio);
                // $('#s_185').text(s_185);
                // $('#lte_ul_prb_use_ratio').text(lte_ul_prb_use_ratio);
                // $('#lte_dl_prb_use_ratio').text(lte_dl_prb_use_ratio);
                // $('#succconnestab').text(succconnestab);





                break;
            }
            //getRecentFault();
            deviceDetailNew.getCommonAddressCell();
        });

};
deviceDetailNew.getAlamInfo = function(){

    var url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-alarm-cell?lacci='+ encodeURIComponent(LACCI.replace(":","-"));
    $.ajax({
        url: url,
        type: 'get',         //数据发送方式
        dataType: 'json',     //接受数据格式
        //contentType: "application/json",
        //accessType: "application/json",
        //timeout:5000,
        data:{},
        beforeSend: function(XMLHttpRequest){
        },
        complete: function(XMLHttpRequest,textStatus){
        }
    }).done(function(result){

        /*
{
    "success": true,
    "msg": "success",
    "data": {
        "rt": {
            "descr": null,
            "type": "rt"
        },
        "his": {
            "descr": null,
            "type": "his"
        }
    }
}


        */
        var data = result.data;

        var his = data.his;
        var rt = data.rt;

        $("#outServerHis").text(his.descr == null?"无":his.descr);
        $("#outServerRt").text(rt.descr == null?"无":rt.descr);

        // $("#alarmHis").text(his.descr == null?"无":his.descr);
        // $("#alarmRt").text(rt.descr == null?"无":rt.descr);
        // $("#alarmHis").text('时间：2018-10-18 19:14:27,描述：小区不可用告警,时间：2018-10-18 19:43:32,描述：小区不可用告警');
        // $("#alarmRt").text('时间：2018-10-18 19:14:27,描述：小区不可用告警,时间：2018-10-18 19:43:32,描述：小区不可用告警');


    });

};

deviceDetailNew.getTopoInfo = function(){
    $("#associatedTransmissionEquipment").text('汇聚怒江02/SHNJ11-2T/3-18-A-1/PTNZX9008');
    $("#associatedTransmissionEquipment").attr('title', '汇聚怒江02/SHNJ11-2T/3-18-A-1/PTNZX9008');

    //判断是否显示逗号
    $("#symbolOfcomma").show();  
    //值写死
    $("#associatedTransmissionSubnet_1").text('西区中博会');
    $("#associatedTransmissionSubnet_1").attr('title', '西区中博会');

    $("#associatedTransmissionSubnet_2").text('青浦虹桥205环');
    $("#associatedTransmissionSubnet_2").attr('title', '青浦虹桥205环');

}

//http://10.222.42.22:8080/lsmWs/sml/pm/lsm-cell-kpi?cache=true&sidx=s_091&sord=desc&topN=-1&smooth=true&lat=31.249326&lon=121.448771&netType=lte&hotspot=进口博览会&lteType=TDD
deviceDetailNew.getCommonAddressCell = function(){
    var cdm=LSMScreen.CacheDataManager.getInstance();
    cdm.getCellKpiTopN({
        hotspot:'进口博览会',
        sidx:'s_091',
        sord:'desc',
        topN:-1,
        smooth:true,
        lat:LAT,
        lon:LON,
        netType:deviceDetailNew.netType,
        lteType:deviceDetailNew.lteType,
        //kpis:'cell_name,ltehwlhb,lte_wireless_conn_ratio,lte_wireless_drop_ratio,lte_wireless_use_ratio,gsm_teletraffic,gsm_wireless_conn_ratio,gsm_wireless_drop_ratio,gsm_wireless_use_ratio',
    },function(result){
        deviceDetailNew.loadCommonAddressCell(result)
        
    }.bind(this));

};
deviceDetailNew.loadCommonAddressCell=function(rowData) {

    //清空表格
    $('#tableWaiDiv').empty();
    $('#tableWaiDiv').html('<table id="table2"></table>');



        
    var colModel = [];
    var currIndexArr = {};
    if(deviceDetailNew.netType == "lte"){  //4g
        if (deviceDetailNew.lte_flow_flag == "_15min") {  //处理5分钟指标
            currIndexArr = indexList._4G_15minIndex;
        }else{
            currIndexArr = indexList._4G_1minIndex;
        }
    }else{  //2g
        currIndexArr = indexList._2G_15minIndex;
    }

    currIndexArr.sort(function(a, b) {return a.sorts - b.sorts});
    for (var i = 0; i < currIndexArr.length; i++) {
        var currIndex = currIndexArr[i];
        var label = currIndex.name + (currIndex.unit == ""?"":("（"+currIndex.unit+"）"));
        var obj = { 
                    label:label,
                    name : currIndex.id,
                    index : currIndex.id,
                    width:currIndex.tableWidth,
                    sortable:true,
                    hidden:currIndex.tableHide,
                    // formatter:function(cellVal,options,rowObjs){
                    //       return  "<a href='javascript:openWin(\""+cellVal+"\")'><span style='color:red'>"+cellVal+"</span></a>"      
                    // }
                };

        if (currIndex.id == "s_206" || currIndex.id == "s_213" || currIndex.id == "lte_flow_") {
            obj.formatter = function(cellVal,options,rowObjs){
                return (cellVal/1024).toFixed(2)

            }

        };        
        colModel.push(obj);        
    };    

    var opt1={
            datatype : function(){},
            //colNames:colNames,
            colModel : colModel,
            loadui:'disable',
            width:'100%',
            height:318,//560
            rowNum:30000,
            autowidth: false,
            shrinkToFit: true,
            ondblClickRow:function(rowid,iRow,iCol,e){
                var rowObj = $('#table2').jqGrid('getRowData',rowid);
                deviceDetailNew.showOtherCell(rowObj);
                console.log(rowObj);
            }
        };
    
    $('#table2').jqGrid(opt1);
    $('#table2')[0].addJSONData(rowData);



    //$("#commonAddressCellThead").html(htmlStrHead);
    //$("#commonAddressCellTbody").html(htmlStr);
    //$("#commonAddressCellTbody>tr").on('dblclick',deviceDetailNew.showOtherCell);
};
deviceDetailNew.loadCommonAddressCellBak=function(rowData) {
        /*var rowData = [
            2g:{cell_name: '虹桥高铁机房十八HC',gsm_teletraffic: 90,gsm_wireless_conn_ratio: 100,gsm_wireless_drop_ratio: 0.00,gsm_wireless_use_ratio: 45},
            4g:{cell_name: '虹桥高铁机房十八HC',gsm_teletraffic: 90,gsm_wireless_conn_ratio: 100,gsm_wireless_drop_ratio: 0.00,gsm_wireless_use_ratio: 45},
            
        ];*/

        $("#commonAddressCellThead").empty();
        $("#commonAddressCellTbody").empty();
        var htmlStrHead = '';
        var htmlStr = '';


        if(deviceDetailNew.netType == "lte"){
            htmlStrHead +=  '<tr>'
                        +        '<th>小区名称</th>'
                        +        '<th>话务量(Erl)</th>'
                        +        '<th>4G接通率(%)</th>'
                        +        '<th>4G掉话率(%)</th>'
                        +        '<th>4G利用率(%)</th>'
                        +    '</tr>';

            for (var i = 0; i < rowData.length; i++) {
                var currRow = rowData[i];
                htmlStr += '<tr cell_name="'+currRow.cell_name+'" lacci="'+currRow.lacci+'">'
                        +       '<td>'+currRow.cell_name+'</td>'
                        //+       '<td class="ciiekpistyle">'+(currRow.lte_teletraffic ==null?"-":currRow.lte_teletraffic)+'</td>'
                        +       '<td class="ciiekpistyle">'+(currRow.ltehwl ==null?"-":currRow.ltehwl)+'</td>'
                        +       '<td class="ciiekpistyle">'+(currRow.lte_wireless_conn_ratio==null?"-":currRow.lte_wireless_conn_ratio)+'</td>'
                        +       '<td class="ciiekpistyle">'+(currRow.lte_wireless_drop_ratio==null?"-":currRow.lte_wireless_drop_ratio)+'</td>'
                        //+       '<td class="ciiekpistyle">'+(currRow.lte_wireless_use_ratio==null?"-":currRow.lte_wireless_use_ratio)+'</td>'
                        +       '<td class="ciiekpistyle">'+(currRow.lte_prb_use_ratio==null?"-":currRow.lte_prb_use_ratio)+'</td>'
                        +   '</tr>'
            };

        }else{
            htmlStrHead +=  '<tr>'
                        +        '<th>小区名称</th>'

                        +        '<th>用户数(人)</th>'
                        +        '<th>流量(MB)</th>'
                        +        '<th>GSM话务量(Erl)</th>'
                        +        '<th>GSM无线利用率(%)</th>'

                        +        '<th>GSM无线接通率（%）</th>'
                        +        '<th>上行TBF建立成功率(%)</th>'
                        +        '<th>下行TBF建立成功率(%)</th>'
                        +        '<th>GSM频带45占比(%)</th>'
                        +    '</tr>';

            for (var i = 0; i < rowData.length; i++) {
                var currRow = rowData[i];
                htmlStr += '<tr cell_name="'+currRow.cell_name+'" lacci="'+currRow.lacci+'">'
                        +       '<td>'+currRow.cell_name+'</td>'
                        +       '<td class="ciiekpistyle">'+(currRow.s_091==null?"-":currRow.s_091)+'</td>'
                        +       '<td class="ciiekpistyle">'+(currRow.s_206==null?"-":currRow.s_206)+'</td>'
                        +       '<td class="ciiekpistyle">'+(currRow.gsmhwl ==null?"-":currRow.gsmhwl)+'</td>'
                        +       '<td class="ciiekpistyle">'+(currRow.gsm_wireless_use_ratio==null?"-":currRow.gsm_wireless_use_ratio)+'</td>'
                        
                        +       '<td class="ciiekpistyle">'+(currRow.gsm_wireless_conn_ratio==null?"-":currRow.gsm_wireless_conn_ratio)+'</td>'
                        +       '<td class="ciiekpistyle">'+(currRow.gsm_ul_tbf_succ_ratio==null?"-":currRow.gsm_ul_tbf_succ_ratio)+'</td>'
                        +       '<td class="ciiekpistyle">'+(currRow.gsm_dl_tbf_succ_ratio==null?"-":currRow.gsm_dl_tbf_succ_ratio)+'</td>'
                        +       '<td class="ciiekpistyle">'+(currRow.gsm_disturb_45_ratio==null?"-":currRow.gsm_disturb_45_ratio)+'</td>'
                        +   '</tr>'
            };
        }






        $("#commonAddressCellThead").html(htmlStrHead);
        $("#commonAddressCellTbody").html(htmlStr);
        $("#commonAddressCellTbody>tr").on('dblclick',deviceDetailNew.showOtherCell);
};
deviceDetailNew.showOtherCell=function(e) {
	//var cell_name=$(e.currentTarget).attr('cell_name');
	//var lacci=$(e.currentTarget).attr('lacci');
    var cell_name=e.cell_name;
    var lacci=(e.lacci || e.lacci_).replace("-",":");


	window.location.href='deviceDetailNew.jsp?cellname='+encodeURIComponent(cell_name)+'&lacci='+encodeURIComponent(lacci);
};



