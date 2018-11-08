<!DOCTYPE html>
<html lang="zh-CN" > 
<head>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<meta charset="UTF-8" http-equiv="X-UA-Compatible" content="IE=Edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<%@ include file="/common/lib.jsp"%>
<c:set var="hotspot" value="common" />
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/My97DatePicker/WdatePicker.js"></script>
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/${hotspot}/style.css" />
<link rel="stylesheet" href="${ctx}/static/jslib/My97DatePicker/skin/My97DatePicker/WdatePicker.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/kpiview.css" />
<%@ include file="/common/bootstrap.jsp"%> 
<%@ include file="/common/echarts.jsp"%>


<title>互联网电视</title>
<%@ include file="/pages/local-lsm/common/screenbaseinclude.jsp"%>
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/common/custom_small.css" />
<link rel="stylesheet" href="${ctx}/scripts/local-lsm/common/lou-multi-select-e052211/css/multi-select.css" />
<style type="text/css">
    html{
        width:100%;
        height:100%;
        margin: 0px;
        padding:0px;
    }
    .fl{
        float: left;
    }
    .fr{
        float: right;
    }
    .w25{
        width: 24.6%;
        border:1px solid #09477e;
    }
    .w50{
        width: 49.5%;
        border:1px solid #09477e;
    }
    .marginRight5{
        margin-right: 5px;
    }
    .height1, .height2{
        padding: 2px 4px;
        height: 250.6px;
        position: relative;
    }
    .textCenter{
        text-align: center;
        color:#078ceb;
    }
    .smallTitle{
        display: inline-block;
        width: 85%;
    }
    .titleClass{
        font-size: 18px;
        color:#fff;
        font-weight: 700;
        border-bottom: 0px solid #fff;
        padding-top: 10px;
    }

    .tempWinClose {
        width: 24px;
        height: 24px;
        background-size:100% 100%;
    }

    /* 设置滚动条的样式 */
    /*::-webkit-scrollbar { width: 12px;}*/
    /* 滚动槽 */
    /*::-webkit-scrollbar-track {    
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        border-radius: 10px;}*/
    /* 滚动条滑块 */
    /*::-webkit-scrollbar-thumb {    
        border-radius: 10px;    
        background: rgba(0,0,0,0.5);    
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
    }
    ::-webkit-scrollbar-thumb:window-inactive {    background: rgba(255,0,0,0.4);}*/
</style>
</head>
<body style="width:100%;height:100%;overflow-y:hidden;"> 
    <div style="width:99%;height:100%;overflow-y:auto;position:relative;margin: 0px 5px">
          <div name="fourArea" style="color:#fff;">
            <div name="title" class="titleClass" >
              互联网电视业务
            </div> 
            <!-- 华为-烽火-->
            <%-- <div name="echarts" style="padding-top:5px">
                <div class="fl w25 height1 marginRight5" style="width:99.5%;margin-bottom:20px;">
                    <div>
                        <div name="smallTitle" class="smallTitle textCenter" style="pointer-events:none;color:#0c0d22;">上海内容中心</div>
                        <div name="echartsadd_gailan" class="fr changeToBig" style="cursor: pointer" title="放大"><img src="${ctx}/static/styles/local-lsm/kpiview/internetTV/images/maxim.png"></div>
                        <div name="echartsadd_gailan" class="fr choiceTimeadd_10 additionalTime" style="cursor: pointer;padding-top: 1px;" title="选择时间"><img src="${ctx}/scripts/local-lsm/common/My97DatePicker/skin/datePicker.gif"></div>
                    </div>
                    <!-- <div name="time" style="height:21px">
                        <span class="fr" style="margin-right: 10px">时</span>
                        <input id="echarts10_time" class="Wdate TimeFiled fl" style="width: 95px;float: right;border: none;color: #fff;background: none;cursor: pointer;" onclick="WdatePicker({dateFmt : 'yyyy-MM-dd HH',maxDate:'%y-%M-{%d} 23'})"/>
                    </div> -->
                    <div name="realEcharts" id="echartsadd_gailan" style="width:100%;height:90%;position: relative;"></div>
                </div>
            <div class="clear"></div>    
            </div> --%>
             <!-- 华为 -烽火-->
                <div class=" w50 height1 marginRight5" style="width:49.5%;">
                    <div>
                        <div name="smallTitle" class="smallTitle textCenter">华为-烽火</div>
                        <div name="echartsadd_04" class="fr changeToBig" style="cursor: pointer" title="放大"><img src="${ctx}/static/styles/local-lsm/kpiview/internetTV/images/maxim.png"></div>
                        <div name="echartsadd_04" class="fr choiceTimeadd_04 additionalTime" style="cursor: pointer;padding-top: 1px;" title="选择时间"><img src="${ctx}/scripts/local-lsm/common/My97DatePicker/skin/datePicker.gif"></div>
                    </div>
                    <div name="realEcharts" id="echartsadd_04" style="width:100%;height:90%;position: relative;"></div>
                </div>
            <div name="echarts" style="padding-top:5px">
                <!-- 华为-->
                <div class="fl w50 height1 marginRight5" style="width:49.5%;">
                    <div>
                        <div name="smallTitle" class="smallTitle textCenter">华为</div>
                        <div name="echartsadd_10" class="fr changeToBig" style="cursor: pointer" title="放大"><img src="${ctx}/static/styles/local-lsm/kpiview/internetTV/images/maxim.png"></div>
                        <div name="echartsadd_10" class="fr choiceTimeadd_10 additionalTime" style="cursor: pointer;padding-top: 1px;" title="选择时间"><img src="${ctx}/scripts/local-lsm/common/My97DatePicker/skin/datePicker.gif"></div>
                    </div>
                    <div name="realEcharts" id="echartsadd_10" style="width:100%;height:90%;position: relative;"></div>
                </div>
                <!-- 烽火 -->
                <div class="fl w50 height1 marginRight5" style="width:49.5%;">
                    <div>
                        <div name="smallTitle" class="smallTitle textCenter">烽火</div>
                        <div name="echartsadd_06" class="fr changeToBig" style="cursor: pointer" title="放大"><img src="${ctx}/static/styles/local-lsm/kpiview/internetTV/images/maxim.png"></div>
                        <div name="echartsadd_06" class="fr choiceTimeadd_06 additionalTime" style="cursor: pointer;padding-top: 1px;" title="选择时间"><img src="${ctx}/scripts/local-lsm/common/My97DatePicker/skin/datePicker.gif"></div>
                    </div>
                    <!-- <div name="time" style="height:21px">
                        <span class="fr" style="margin-right: 10px">时</span>
                        <input id="echarts11_time" class="Wdate TimeFiled fl" style="width: 95px;float: right;border: none;color: #fff;background: none;cursor: pointer;" onclick="WdatePicker({dateFmt : 'yyyy-MM-dd HH',maxDate:'%y-%M-{%d} 23'})"/>
                    </div> -->
                    <div name="realEcharts" id="echartsadd_06" style="width:100%;height:90%;position: relative;"></div>
                </div>
            <div class="clear"></div>    
            </div>
        <div class="clear"></div>     
        </div> 
        
         <div class="clear"></div>
    <div name="fourArea" style="color:#fff;">
            <div name="title" class="titleClass" >
             	
            </div> 
            <div name="echarts" style="padding-top:5px">
                <!-- 华为-->
                <div class="fl w25 height1 marginRight5" style="width:49.5%;">
                    <div>
                        <div name="smallTitle" class="smallTitle textCenter">华为(节点)</div>
                        <div name="echartsadd_07" class="fr changeToBig" style="cursor: pointer" title="放大"><img src="${ctx}/static/styles/local-lsm/kpiview/internetTV/images/maxim.png"></div>
                        <div name="echartsadd_07" class="fr choiceTimeadd_07 additionalTime" style="cursor: pointer;padding-top: 1px;" title="选择时间"><img src="${ctx}/scripts/local-lsm/common/My97DatePicker/skin/datePicker.gif"></div>
                    </div>
                    <!-- <div name="time" style="height:21px">
                        <span class="fr" style="margin-right: 10px">时</span>
                        <input id="echarts10_time" class="Wdate TimeFiled fl" style="width: 95px;float: right;border: none;color: #fff;background: none;cursor: pointer;" onclick="WdatePicker({dateFmt : 'yyyy-MM-dd HH',maxDate:'%y-%M-{%d} 23'})"/>
                    </div> -->
                    <div name="realEcharts" id="echartsadd_07" style="width:100%;height:90%;position: relative;"></div>
                </div>
                <!-- 烽火 -->
                <div class="fl w25 height1 marginRight5" style="width:49.5%;">
                    <div>
                        <div name="smallTitle" class="smallTitle textCenter">烽火(节点)</div>
                        <div name="echartsadd_08" class="fr changeToBig" style="cursor: pointer" title="放大"><img src="${ctx}/static/styles/local-lsm/kpiview/internetTV/images/maxim.png"></div>
                        <div name="echartsadd_08" class="fr choiceTimeadd_08 additionalTime" style="cursor: pointer;padding-top: 1px;" title="选择时间"><img src="${ctx}/scripts/local-lsm/common/My97DatePicker/skin/datePicker.gif"></div>
                    </div>
                    <!-- <div name="time" style="height:21px">
                        <span class="fr" style="margin-right: 10px">时</span>
                        <input id="echarts11_time" class="Wdate TimeFiled fl" style="width: 95px;float: right;border: none;color: #fff;background: none;cursor: pointer;" onclick="WdatePicker({dateFmt : 'yyyy-MM-dd HH',maxDate:'%y-%M-{%d} 23'})"/>
                    </div> -->
                    <div name="realEcharts" id="echartsadd_08" style="width:100%;height:90%;position: relative;"></div>
                </div>
            <div class="clear"></div>    
            </div>
        <div class="clear"></div>     
        </div> 
        
        
        <div class="clear"></div>
    <div name="fourArea" style="color:#fff;">
            <div name="title" class="titleClass" >
             	 咪咕视频
            </div> 
            <div name="echarts" style="padding-top:5px">
                <div class="fl w25 height1 marginRight5" style="width:49.5%;">
                    <div>
                        <div name="smallTitle" class="smallTitle textCenter">华为</div>
                        <div name="echartsadd_11" class="fr changeToBig" style="cursor: pointer" title="放大"><img src="${ctx}/static/styles/local-lsm/kpiview/internetTV/images/maxim.png"></div>
                        <div name="echartsadd_11" class="fr choiceTimeadd_11 additionalTime" style="cursor: pointer;padding-top: 1px;" title="选择时间"><img src="${ctx}/scripts/local-lsm/common/My97DatePicker/skin/datePicker.gif"></div>
                    </div>
                    <div name="realEcharts" id="echartsadd_11" style="width:100%;height:90%;position: relative;"></div>
                </div>
                <div class="fl w25 height1 marginRight5" style="width:49.5%;">
                    <div>
                        <div name="smallTitle" class="smallTitle textCenter">烽火</div>
                        <div name="echartsadd_12" class="fr changeToBig" style="cursor: pointer" title="放大"><img src="${ctx}/static/styles/local-lsm/kpiview/internetTV/images/maxim.png"></div>
                        <div name="echartsadd_12" class="fr choiceTimeadd_12 additionalTime" style="cursor: pointer;padding-top: 1px;" title="选择时间"><img src="${ctx}/scripts/local-lsm/common/My97DatePicker/skin/datePicker.gif"></div>
                    </div>
                    <div name="realEcharts" id="echartsadd_12" style="width:100%;height:90%;position: relative;"></div>
                </div>
            <div class="clear"></div>    
            </div>
        <div class="clear"></div>     
        </div> 
    </div>
    
</body>

<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/jquery.ux.loadMask.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/lou-multi-select-e052211/js/jquery.multi-select.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/dragger.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/kpiview/internetTV-Modify/internetTV.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/kpiview/internetTV-Modify/internetTVAssist.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/kpiview/internetTV-Modify/drawPic.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/kpiview/internetTV-Modify/timeJs.js"></script>
<script>
    $(document).ready(function(){
        //初始高度
        var winHeight = document.body.clientHeight; 
        var winHeight = document.body.clientHeight; 
        //var winWidth = 1400; 
        //var winHeight = 1080; 
        //$(".height1").height(winHeight*0.206 + "px");
        
        //初始函数
        internetTV.init();
        setInterval(internetTV.initLoad,5*60*1000);
           
});    

</script>
</html>