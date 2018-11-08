<!DOCTYPE html>
<%
String hotspot = request.getParameter("hotspot");//==null?"":new String(request.getParameter("hotspot").getBytes("ISO8859-1"), "utf-8");
String nettype = request.getParameter("nettype");
String cellname = request.getParameter("cellname");//==null?"":new String(request.getParameter("cellname").getBytes("ISO8859-1"), "utf-8");
String lacci = request.getParameter("lacci");
%>
<html lang="zh-CN" style="width:100%;height:100%;background:rgba(0,0,0,0);">
<head>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<meta charset="UTF-8" http-equiv="X-UA-Compatible" content="IE=Edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<%@ include file="/common/lib.jsp"%>
<c:set var="hotspot" value="common" />
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/My97DatePicker/WdatePicker.js"></script>
<link rel="stylesheet" href="${ctx}/static/jslib/My97DatePicker/WdatePicker.css" />
<%@ include file="/common/bootstrap.jsp"%> 
<%@ include file="/common/echarts.jsp"%>
<link rel="stylesheet" href="${jslib}/jquery-1.7.2/external/jqgrid/css/ui.jqgrid.css" />
<link rel="stylesheet" href="${jslib}/jquery-1.7.2/external/jqgrid/themes/redmond/jquery-ui-1.9.2.custom.min.css" />

<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciie/ciie.css" />

<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciienew/ciie.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/mapnew.css" />


<title>中国国际进口博览会</title>
<style type="text/css">
	.leaflet-left {
	    left:30px;
	}
	.leaflet-top {
	    top:30px;
	}
	
	#recentFault{
		font-size:24px;
	}
	
	#recentFault>div{
		margin-top:10px;
	}
	#recentFault>div:nth-child(2n+1){
		width:130px;
	}
	#recentFault>div:nth-child(2n+2){
		width:280px;
		color:#66e6ff;
	}
	.tipTypeTitle{
		margin-top:20px;
		margin-bottom:20px;
	}
	
</style>
</head>
<body style="width:910px;height:640px;background:rgba(0,0,0,0);"> 
	<div class="maptipbg">
		<div id="cellname" class="fontImportantInfo ciiekpistyle"></div>
		<div class="horizontalRow fontSubInfo tipTypeTitle">
			<div class="tipIcon1"></div>
			<div>用户及业务量</div>
		</div>
		<div class="horizontalRow fontSubInfo tipKpiPanel">
			<div class="tipKpis">
				<div>用户数</div>
				<div><span id="user">--</span><span style="font-size:20px;">人</span></div>
			</div>
			<div class="tipKpis">
				<div>流量</div>
				<div><span id="flow">--</span><span style="font-size:20px;">MB</span></div>
			</div>
			<div class="tipKpis">
				<div>话务量</div>
				<div><span id="traffic">--</span><span style="font-size:20px;">Erl</span></div>
			</div>
		</div>
		<div class="horizontalRow fontSubInfo tipTypeTitle" style="display:none;">
			<div class="tipIcon2"></div>
			<div>业务使用偏好</div>
		</div>
		<div id="chart" class="horizontalRow" style="height:280px;display:none;">
			
		</div>
		
		<div class="horizontalRow fontSubInfo tipTypeTitle">
			<div class="tipIcon3"></div>
			<div>故障情况</div>
		</div>
		<div style="font-size:24px;">
			当前无故障
		</div>
		<div id="recentFault" class="horizontalRow ">
		</div>
		
	</div>
</body>

<!-- jquery loadmask -->
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/spinner/jquery.ux.loadMaskcss.js"></script>

<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/consts.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/utils.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/screenDataManager.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/cacheDataManager.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/ciienew/ciie_config.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/dragger.js"></script>

<script>
var BASEPATH="${ctx}";
var JSLIB="${jslib}";

var LACCI="<%=lacci %>";//"6152:37993";
var CELLNAME="";

$(function(){
	getUsers();
	//getPie();
	getRecentFault();
});


function getUsers(){
    var cdm=LSMScreen.CacheDataManager.getInstance();
    cdm.getCellKpiTopN({
		ids:LACCI
    },function(result){
    	var list=result;
    	for(var i=0;i<list.length;i++){
    		var record=list[i];
    		CELLNAME=record.cell_name;
    		$('#cellname').text(record.cell_name);
    		record['hwl']=record['gsmhwl']==null?record['ltehwl']:record['gsmhwl'];
			var value0=record['s_091']==null?'--':record['s_091'];//总用户数
			var value1=record['s_083']==null?'--':(record['s_083']/1024).toFixed(2);//流量
			var value2=record['hwl']==null?'--':record['hwl'];//话务量
			
			$('#user').text(value0);
			$('#flow').text(value1);
			$('#traffic').text(value2);
			break;
    	}
    	getRecentFault();
    });
}
function getPie(){
	var queryTime = getCurrentTimeMin(10);
	$.getJSON(LSMScreen.CacheDataManager.IPPORT + '/stream/ue/bytes/site-majors-time?hours=1&time=' + queryTime + '&site=' + encodeURIComponent(LACCI),function(data){
        //console.log(data);
        var jsondata = [];
        var totalDataThroughPut=0;
        var nameBusiness=[];
        for (var name in data){
            
            var renderObject = data[name];
            var dataThroughPut4G = 0,
                    dataThroughPut3G = 0,
                    dataThroughPut2G = 0,
                    dataThroughPut = 0;

                dataThroughPut4G = dataThroughPut4G + renderObject['4G上行流量']/ 1024 ;//记录4G流量,单位是MB
                dataThroughPut4G = dataThroughPut4G + renderObject['4G下行流量'] / 1024;


                dataThroughPut3G = dataThroughPut3G + renderObject['3G上行流量'] / 1024;//记录4G流量,单位是MB
                dataThroughPut3G = dataThroughPut3G + renderObject['3G下行流量'] / 1024;


                dataThroughPut2G = dataThroughPut2G + renderObject['2G上行流量'] / 1024;//记录4G流量,单位是MB
                dataThroughPut2G = dataThroughPut2G + renderObject['2G下行流量'] / 1024;
            realTime = renderObject.time.substring(11,16);
            dataThroughPut = dataThroughPut4G+ dataThroughPut3G +dataThroughPut2G;
            if(dataThroughPut==0) continue;
            totalDataThroughPut = totalDataThroughPut + dataThroughPut;
            dataThroughPut = parseInt(dataThroughPut*100)/100 ;
            var testDataObject = new Object();
            testDataObject.name = name;
            testDataObject.value = dataThroughPut;
            jsondata.push(testDataObject);
            nameBusiness.push(name);
        }
        var tmp0=[];
        for(var i=0;i<jsondata.length;i++){
        	if(jsondata[i].value>0){
        		tmp0.push(jsondata[i]);
        	}
        }
        jsondata=tmp0;
        if(jsondata.length>10){
        	jsondata=jsondata.sort(function(a,b){return b["value"]-a["value"];});//按value 降序
            var tmp=[];
        	var finalData=[];
            var otherName="其他";
            var otherValue=0;
            for(var i=0;i<jsondata.length;i++){
            	if(jsondata[i].name!=otherName){
            		tmp.push(jsondata[i]);
            	}else{
            		otherValue=jsondata[i].value;
            	}
            }
            for(var i=0;i<tmp.length;i++){
            	if(i<9){
            		finalData.push(tmp[i]);
            	}else{
            		otherValue+=tmp[i].value*1;
            	}
            }
            finalData.push({name:otherName,value:otherValue});
            jsondata=finalData;
        }
        
        //开始绘制饼图
        require(
                [
                    'echarts',
                    'echarts/chart/pie' // 使用柱状图就加载bar模块，按需加载
                ],
                function (ec) {
                    // 基于准备好的dom，初始化echarts图表
                    var myChart = ec.init(document.getElementById('chart'));

                    var option = {
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        legend: {
                            orient : 'vertical',
                            x : 'left',
                            y: 'center',
                            z: 2,
                            textStyle: {
                                color: '#ffffff',
                                fontSize: 24
                            },
                            data:jsondata
                        },
                        toolbox: false,
                        calculable : true,
                        series : [
                            {
                                name:'总流量(MB)',
                                type:'pie',
                                radius : ['50%', '80%'],
                                center: ['75%', '45%'],
                                itemStyle : {
                                    normal : {
                                        label : {
                                            show : false
                                        },
                                        labelLine : {
                                            show : false
                                        }
                                    },
                                    emphasis : {
                                        label : {
                                            show : true,
                                            position : 'center',
                                            textStyle : {
                                                fontSize : '30',
                                                fontWeight : 'bold'
                                            }
                                        }
                                    }
                                },
                                data: jsondata
                            }
                        ]
                    };
                    myChart.setOption(option,true);
                }
        );
    });
}
function getRecentFault(){
	//ZBHZXE1GNG01H1 中国博览会会展中心-街道站6NL1H_54
	var html='';
	if(CELLNAME=='中国博览会会展中心A0馆NL9W_140'){
		html='<div>故障时间:</div><div>2018-7-24 22:23:47</div>'
			+'<div>故障对象:</div><div>中国博览会会展中心A0馆NL9W_140</div>'
			+'<div>故障标题:</div><div>小区退服告警</div>'
			+'<div>故障级别:</div><div><div style="background:#ff5252;border-radius:5px;color:#ffffff;width:100px;text-align:center;">一级</div></div>'
			+'<div>恢复时间:</div><div>2018-7-24 22:57:08</div>'
			+'<div>故障历时:</div><div>0.57小时</div>';
	}else if(CELLNAME=='中国博览会会展中心-街道站6NL1H_54'){
		html='<div>故障时间:</div><div>2018-7-18 23:00:05</div>'
			+'<div>故障对象:</div><div>中国博览会会展中心-街道站6NL1H_54</div>'
			+'<div>故障标题:</div><div>小区不可用告警</div>'
			+'<div>故障级别:</div><div><div style="background:#ff5252;border-radius:5px;color:#ffffff;width:100px;text-align:center;">一级</div></div>'
			+'<div>恢复时间:</div><div>2018-7-19 01:00:12</div>'
			+'<div>故障历时:</div><div>2小时</div>';
	}else{
		html='近期无历史故障';
	}
	$('#recentFault').html(html);
}
function getCurrentTimeMin(n){
    var timeBegin = new Date();
    //timeBegin.setHours(timeBegin.getHours()-1);
    timeBegin.setMinutes(timeBegin.getMinutes()-n);
    var result = date2str(timeBegin,"yyyy-MM-dd hh:mm:ss");
    return result;
    //var timeBeginStr = timeBegin.format("yyyy-MM-dd hh:mm:ss");
}
function date2str(x,y) {
    var z = {M:x.getMonth()+1,d:x.getDate(),h:x.getHours(),m:x.getMinutes(),s:x.getSeconds()};
    y = y.replace(/(M+|d+|h+|m+|s+)/g,function(v) {return ((v.length>1?"0":"")+eval('z.'+v.slice(-1))).slice(-2)});
    return y.replace(/(y+)/g,function(v) {return x.getFullYear().toString().slice(-v.length)});
}

</script>
</html>