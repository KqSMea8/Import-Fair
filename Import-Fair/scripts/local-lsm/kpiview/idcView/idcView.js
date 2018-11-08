var idcView = idcView || {};
var CHARTCOMPONENTARR = [];


idcView.getGroupData = function(){
        groupType = groupType == 0?'大客户':'机房'; 
        $.ajax({
            //url :LSMConsts.G_URLCONFIG.baseUrl+"/services/sml/query/lsm-re-idcGroup",
            url :LSMConsts.G_URLCONFIG.urlInasSml+"/query/lsm-re-idcGroup",
            type : 'get',
            async : true,
            dataType : "json",
            contentType :"application/json",
            //data:JSON.stringify(param),
            success : function(res) {
                var data = res.data;
                for (var item in data) {  
                    var currObj = data[item];
                    if (currObj.groupname == groupType) {
                        var objDemo = {id:'',name:'',upkey:'in_',downkey:'out_',unit:'Gbps',rate:1,fixed:2,period:60};
                        objDemo.id = currObj.id;
                        objDemo.name = currObj.name;
                        //增加趋势图y轴最大值
                        objDemo.max = (currObj.name).substring((currObj.name).length-6).replace(/[^0-9]/ig,"");
                        idcView.GROUPS.push(objDemo);
                    }
                }
                idcView.init(); 
                
            },
            complete: function(XMLHttpRequest, textStatus){
            },
            error: function(){
                  //请求出错处理
            }
        });

};

idcView.GROUPS = [
        /*{name:'指标1',upkey:'index1',downkey:'index2',unit:'万人',rate:1,fixed:2,period:60},
        {name:'指标2',upkey:'index1',downkey:'index2',unit:'万人',rate:1,fixed:2,period:60},
        {name:'指标3',upkey:'index1',downkey:'index2',unit:'万人',rate:1,fixed:2,period:60},
        {name:'指标4',upkey:'index1',downkey:'index2',unit:'万人',rate:1,fixed:2,period:60},
        {name:'指标5',upkey:'index1',downkey:'index2',unit:'万人',rate:1,fixed:2,period:60},
        {name:'指标6',upkey:'index1',downkey:'index2',unit:'万人',rate:1,fixed:2,period:60},
        {name:'指标7',upkey:'index1',downkey:'index2',unit:'万人',rate:1,fixed:2,period:60},
        {name:'指标8',upkey:'index1',downkey:'index2',unit:'万人',rate:1,fixed:2,period:60},
        {name:'指标9',upkey:'index1',downkey:'index2',unit:'万人',rate:1,fixed:2,period:60},
        {name:'指标10',upkey:'index1',downkey:'index2',unit:'万人',rate:1,fixed:2,period:60},
        {name:'指标11',upkey:'index1',downkey:'index2',unit:'万人',rate:1,fixed:2,period:60},
        {name:'指标12',upkey:'index1',downkey:'index2',unit:'万人',rate:1,fixed:2,period:60},
        {name:'指标13',upkey:'index1',downkey:'index2',unit:'万人',rate:1,fixed:2,period:60},
        {name:'指标14',upkey:'index1',downkey:'index2',unit:'万人',rate:1,fixed:2,period:60}*/
];


idcView.getTimeOfbefore6=function (){
    var date=new Date();
    date.setHours(date.getHours()-6);
    //var startDateStr=date.Format('yyyy-MM-dd hh:mm');
    //var startDateStr=date.Format('yyyyMMddhh00');
    
    //var wsStart=startDateStr.replace(/:/g,'').replace(/-/g,'').replace(' ','');
    //var wsEnd=endDateStr.replace(/:/g,'').replace(/-/g,'').replace(' ','');
    
    return date;
};
idcView.init = function(){
    $("#idcView").empty();
    new idcView.ChartGroup('idcView');
    setTimeout(idcView.initLoadData,100);
};
idcView.initLoadData = function(){
    for (var i = 0; i < CHARTCOMPONENTARR.length; i++) {
            var chartComponent = CHARTCOMPONENTARR[i];
            chartComponent.update();
    }
};


idcView.ChartGroup = function(){
    this.initialize.apply(this, arguments);
};
idcView.ChartGroup.prototype.constructor=idcView.ChartGroup;
idcView.ChartGroup.prototype.groupName='';
idcView.ChartGroup.prototype.chartComponents=[];
idcView.ChartGroup.prototype.jqGroup=null;
idcView.ChartGroup.prototype.initialize=function(targetId){
    var groups=idcView.GROUPS;
    this.chartComponents=[];
    for(var i=0;i<groups.length;i++){
        var group=groups[i];
        var chartComponent=new idcView.ChartComponent(group);
        $('#'+targetId).append(chartComponent.jqChart);

        this.chartComponents.push(chartComponent);
        CHARTCOMPONENTARR.push(chartComponent);
        //添加loading
        chartComponent.showLoading();

        //chartComponent.update();
    }

};

//单个图表
idcView.ChartComponent=function ()
{
    this.initialize.apply(this, arguments);
};
idcView.ChartComponent.prototype.constructor=idcView.ChartComponent;
idcView.ChartComponent.prototype.dataCache=[];
idcView.ChartComponent.prototype.kpiConfig={};
idcView.ChartComponent.prototype.title='';
idcView.ChartComponent.prototype.unit='';
idcView.ChartComponent.prototype.jqChart=null;
idcView.ChartComponent.prototype.ec=null;
idcView.ChartComponent.prototype.chart=null;
idcView.ChartComponent.prototype.timeWin=null;
idcView.ChartComponent.prototype.colors=['#2883f3','#33cffc','#f0ff00','#05ff1d'];
idcView.ChartComponent.prototype.startTimeDate="";
idcView.ChartComponent.prototype.indexId="";
idcView.ChartComponent.prototype.initialize=function(kpiConfig){
    this.kpiConfig=kpiConfig;
    //this.title=kpiConfig.name+'('+kpiConfig.unit+')';
    this.title=kpiConfig.name;
    this.unit=kpiConfig.unit;
    this.startTimeDate=idcView.getTimeOfbefore6();
    this.indexId = kpiConfig.id;
    var html='<div class="kpiview_chart_parent">'
                +'<div class="kpiview_chart_cmp_parent" ><div class="kpiview_chart_cmp"></div></div>'
                +'<div class="kpiview_charttitle">'+this.title+'</div>'
                +'<div class="kpiview_charttime" style="position:absolute;right:24px;top:3px;"></div>'
                +'<div class="kpiview_chartmax" style="position:absolute;right:5px;top:5px;"></div>'
                +'<div class="kpiview_chartExcel" title="导出" style="position:absolute;right:5px;bottom:5px;"></div>'
            +'</div>';
    this.jqChart=$(html);
    this.jqChart.find('.kpiview_chartmax').on('click',this.toMax.bind(this));
    this.jqChart.find('.kpiview_charttime').on('click',this.showTimeChooser.bind(this));
    this.jqChart.find('.kpiview_chartExcel').on('click',this.excelChartData.bind(this));
    require(['echarts','echarts/chart/line','echarts/chart/bar','echarts/chart/pie'],function(ec){
        this.ec=ec;
        this.chart=ec.init(this.jqChart.find('.kpiview_chart_cmp')[0],'macarons');
    }.bind(this));

};
idcView.ChartComponent.prototype.showTimeChooser=function(e){
    if(this.timeWin==null){
        /*var docWidth=$('body').width();
        var winWidth=docWidth*0.25*0.9;
        var winHeight=110;
        var winX=this.jqChart.offset().left+winWidth*0.03;
        var winY=this.jqChart.offset().top+30;*/
        var docWidth=$(e.currentTarget).parent().width();
        var docHeight=$(e.currentTarget).parent().height();
        var winWidth=docWidth*0.9;
        var winHeight=110;
        var winX=(docWidth - winWidth) * 0.5;
        var winY=(docHeight - winHeight) * 0.5;
        
        this.timeWin=new LSMScreen.SimpleWindow({
            title:"时间选择",
            width:winWidth,
            height:winHeight,
            x:winX,
            y:winY,
            parentDom:$(e.currentTarget).parent()[0],
            hideOnClose:true,
    		modal:true,
            beforeClose:function(){
            }.bind(this)
        });
        var timeInputHtml='<div class="kpiview_timewin">'
                              +'开始时间：<input readonly="readonly" type="text" onfocus="WdatePicker({dateFmt:\'yyyy-MM-dd HH\'})" class="Wdate kpiview_timechooser" style="width:140px;height:25px;"/>'
                              +'<div style="display:inline-block"><button type="button" style="margin-left:5px;margin-top: -6px;" class="kpiview_query btn btn-success btn-xs active">查询</button></div>'
                          +'</div>';
        
        $(this.timeWin.content).html(timeInputHtml);
        $(this.timeWin.content).find('.kpiview_query').on('click',this.queryChart.bind(this));
        
        var date=new Date();
        date.setHours(date.getHours()-6);
        var startDateStr=date.Format('yyyy-MM-dd hh');
        $(this.timeWin.content).find('.kpiview_timechooser').val(startDateStr);
        
    }else{
        //$('body').append(this.timeWin.win);
        this.timeWin.show();
    }
    
};
idcView.ChartComponent.prototype.queryChart=function(e){
    var selectedDateStr=$(e.currentTarget).parent().parent().find('.kpiview_timechooser').val();
    var selectedDate=new Date();
    if(selectedDateStr!=null&&selectedDateStr!=''){
        selectedDate = new Date(Date.parse((selectedDateStr+':00:00').replace(/-/g,   "/")));
    }
    this.startTimeDate = selectedDate;
    this.showLoading();
    this.update('selectedDate');
    
    this.timeWin.hide();
    
};
idcView.ChartComponent.prototype.toMax=function(e){
    /*var docWidth = $(document).width();
    var docHeight = $(document).height();
    var winWidth = docWidth * 0.7;
    var winHeight = docHeight * 0.5;*/
    var docWidth=$('body').width();
    var docHeight=$('body').height();
    var winWidth=docWidth*0.8;
    var winHeight=400;
    var win=new LSMScreen.SimpleWindow({
        title:this.title,
        /*width: winWidth,
        height: winHeight>600?600:winHeight,
        x: (docWidth - winWidth) * 0.5,
        y: (docHeight - winHeight) * 0.5,*/
        width:winWidth,
        height:winHeight,
        x:(docWidth-winWidth)/2,
        y:50,
		modal:true,
        beforeClose:function(){
            this.jqChart.append($(win.content).find('.kpiview_chart_cmp_parent'));
            this.chart.resize();
        }.bind(this)
    });
    
    $(win.content).append(this.jqChart.find('.kpiview_chart_cmp_parent'));
    this.chart.resize();
};

idcView.ChartComponent.prototype.showLoading=function(){
    this.jqChart.mask(' ');
};
idcView.ChartComponent.prototype.hideLoading=function(){
    this.jqChart.unmask();
};
idcView.ChartComponent.prototype.update=function(par){
        var start_time,startDate; 
        if(par == "selectedDate"){
            startDate = this.startTimeDate;
        }else{
            startDate = new Date();
            startDate.setHours(startDate.getHours()-6);
        };
        start_time = startDate.Format('yyyyMMddhh00');
        //console.log(start_time,end_time);
        /*var data = [
                    {"time_id":'2018-02-05 16:37:26',"in_":(Math.random()*1000).toFixed(0),"out_":(Math.random()*1000).toFixed(0)},
                    {"time_id":'2018-02-05 17:37:26',"in_":(Math.random()*1000).toFixed(0),"out_":(Math.random()*1000).toFixed(0)},
                    {"time_id":'2018-02-05 18:37:26',"in_":(Math.random()*1000).toFixed(0),"out_":(Math.random()*1000).toFixed(0)},
                    {"time_id":'2018-02-05 19:37:26',"in_":(Math.random()*1000).toFixed(0),"out_":(Math.random()*1000).toFixed(0)},
                    {"time_id":'2018-02-05 20:37:26',"in_":(Math.random()*1000).toFixed(0),"out_":(Math.random()*1000).toFixed(0)},
                    {"time_id":'2018-02-05 21:37:26',"in_":(Math.random()*1000).toFixed(0),"out_":(Math.random()*1000).toFixed(0)},
                    {"time_id":'2018-02-05 22:37:26',"in_":(Math.random()*1000).toFixed(0),"out_":(Math.random()*1000).toFixed(0)},
                    {"time_id":'2018-02-05 23:37:26',"in_":(Math.random()*1000).toFixed(0),"out_":(Math.random()*1000).toFixed(0)},
                    {"time_id":'2018-02-05 24:37:26',"in_":(Math.random()*1000).toFixed(0),"out_":(Math.random()*1000).toFixed(0)},
                    {"time_id":'2018-02-05 25:37:26',"in_":(Math.random()*1000).toFixed(0),"out_":(Math.random()*1000).toFixed(0)}
        ]*/
            var currChartComponent = this;  //定义外侧this
            $.ajax({
                url :LSMConsts.G_URLCONFIG.baseUrl+'/services/sml/query/lsm-idcTraffic?groupId='+this.indexId+'&startTime='+start_time,
                type : 'get',
                async : true,
                dataType : "json",
                contentType :"application/json",
                //data:JSON.stringify(param),
                success : function(res) {
                    var data = res.data;
                    var dataArr = data[currChartComponent.indexId];

                    currChartComponent.dataCache = dataArr; 
                    currChartComponent.updateChartByData();
                },
                complete: function(XMLHttpRequest, textStatus){
                },
                error: function(){
                      //请求出错处理
                }
        });    
};
idcView.ChartComponent.prototype.updateChartByData=function(){
    this.chart=this.ec.init(this.jqChart.find('.kpiview_chart_cmp')[0],'macarons');
    this.hideLoading();
    var list=this.dataCache;
    var config=this.kpiConfig;
    var upkey=config.upkey;
    var downkey=config.downkey;
    
    var yaxisName='('+config.unit+')';
    var xArr=[];
    var dataArrNow=[];
    var dataArrCompare=[];
    var legends=['上行流速','下行流速'];
    if(config.source==idcView.SOURCE_WS){
        for(var i=0;i<list.length;i++){
            var record=list[i];
            var time=record.time;
            var value=record[upkey];
            var compareValue=record[downkey];
            value=(value*config.rate).toFixed(config.fixed);
            compareValue=(compareValue*config.rate).toFixed(config.fixed);
            time=time.substring(11,16);
            xArr.push(time);
            dataArrNow.push(value);
            dataArrCompare.push(compareValue);
        }
    }
    
    var lineColor=this.colors[Math.floor(this.colors.length*Math.random())];
    var series=[{
        name: legends[1],
        type: 'line',
        data: dataArrCompare,
        itemStyle:{normal:{lineStyle:{width:1,color:'blue'}}}
    },{
        name: legends[0],
        type: 'line',
        data: dataArrNow,
        //itemStyle:{normal:{lineStyle:{width:1,color:lineColor}}}
         itemStyle: {normal: {areaStyle: {type: 'default',color:'#549982'}}}
    }];
    
    var option = {
            color:['#549982','blue','#7B68EE'],
            title: {
                text: config.name+'('+config.unit+')',
                show:false,
                x:'center',
                textStyle:{
                    color:LSMScreen.CHARTCONFIG.xAxisLabelColor
                }
                
            },
            tooltip : {
                trigger: 'axis',
                formatter:'{b0}<br/>{a1}:{c1}<br/>{a0}:{c0}'
            },
            legend: {
                show : true,
                data:legends,
                y:'bottom',
                x:'center',
                textStyle:{
                    color:LSMScreen.CHARTCONFIG.xAxisLabelColor
                }
            },
            grid: {
                x: 45,
                y: 40,
                x2: 25,
                y2: 55,
                borderWidth:0
            },
            toolbox: {
                show : false
            },
            calculable : false,
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : xArr,
                    axisLine:{show:true,lineStyle:{color:'#078ceb',width:1}},
                    splitLine:{show:false},
                    axisLabel:{
                        textStyle:{
                            color:LSMScreen.CHARTCONFIG.xAxisLabelColor
                        }
                    },
                    axisTick:{show:true,lineStyle:{color:'#fff'}}
                }
            ],
            yAxis : [
                {   
                    name:'('+this.unit+')',
                    type : 'value',
                    min:0,
                    //max:config.max,        //(是否添加最大值)
                    axisLine:{show:true,lineStyle:{color:'#078ceb',width:1}},
                    splitLine:{show:true,lineStyle:{color:'#0d2a52'}},
                    splitArea:{show:false},
                    axisLabel:{
                        textStyle:{
                                    color:LSMScreen.CHARTCONFIG.yAxisLabelColor
                        }
                    }
                }
            ],
            series : series
        };
    this.chart.resize();
    this.chart.setOption(option,true);
};
idcView.ChartComponent.prototype.excelChartData = function(){
    var datasArr = [];
            var dataArr = [];
            var realData = this.dataCache;
            var inTotal = 0;
            var outTotal = 0;
            for (var i = 0; i < realData.length; i++) {
                dataArr = [];
                dataArr.push(realData[i].time);
                dataArr.push(realData[i].in_);
                dataArr.push(realData[i].out_);
                datasArr.push(dataArr);

                //计算总和
                /*inTotal +=realData[i].in_
                outTotal +=realData[i].out_*/
                
            }
            //添加总和数据
            /*dataArr = [];
            dataArr.push("总和");
            dataArr.push(inTotal);
            dataArr.push(outTotal);
            datasArr.push(dataArr);*/


            if (datasArr.length == 0) {
                dataArr = [];
                dataArr.push("暂无数据！");
                dataArr.push("");
                dataArr.push("");
                datasArr.push(dataArr);
            }
    var propertys = ['time','in_','out_'] ;
    var heads = ['时间','上行流速','下行流速'];      
    var exportParam = {
                             "type":"xls",
                             "title": this.title,
                             "propertys":propertys,             //["TIMEID", "USER_NAME"],
                             "heads": heads,                    //["时间", "客户名称"],
                             "ifId": "",
                             "datas": datasArr,
                             "params": {}
                         };
    var exportParams = JSON.stringify(exportParam);
    //var exportURL = LSMConsts.G_URLCONFIG.baseUrl+"/LsmScreen/sml/export/exportOriginal";
    var exportURL = LSMConsts.G_URLCONFIG.urlInasSml+"/export/exportOriginal";
    exportAjax(exportURL, exportParams);  
};