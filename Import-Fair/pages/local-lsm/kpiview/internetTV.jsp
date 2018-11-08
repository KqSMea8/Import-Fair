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
        <div name="oneArea" style="color:#fff;">
            <div name="title" class="titleClass" >
               业务总览
            </div> 
            <div name="echarts" style="padding-top:1px ">
                <!-- OTT峰值流量（Gbps） -->
                <div class="fl w25 height1 marginRight5" style="display: none;">
                    <div>
                        <div name="smallTitle" class="smallTitle textCenter">OTT流速（gbps）</div>
                        <div name="echarts01" class="fr changeToBig" style="cursor: pointer" title="放大"><img src="${ctx}/static/styles/local-lsm/kpiview/internetTV/images/maxim.png"></div>
                        <div name="echarts01" class="fr choiceTime01" style="cursor: pointer;padding-top: 1px;" title="选择时间"><img src="${ctx}/scripts/local-lsm/common/My97DatePicker/skin/datePicker.gif"></div>
                    </div>
                    <!-- <div name="time" style="height:21px">
                        <span class="fr" style="margin-right: 10px">时</span>
                         <input id="echarts01_time" class="Wdate TimeFiled fl" style="width: 95px;float: right;border: none;color: #fff;background: none;cursor: pointer;" onclick="WdatePicker({dateFmt : 'yyyy-MM-dd HH',maxDate:'%y-%M-{%d} 23'})"/>
                    </div> -->
                    <div name="realEcharts" id="echarts01" style="width:100%;height:90%;position: relative;"></div>
                </div>
                <!-- 在线用户数（万人）-->
                <div class="fl w25 height1 marginRight5" style="width:33%;">
                    <div>
                        <div name="smallTitle" class="smallTitle textCenter">在线用户数(人)</div>
                        <div name="echarts02" class="fr changeToBig" style="cursor: pointer" title="放大"><img src="${ctx}/static/styles/local-lsm/kpiview/internetTV/images/maxim.png"></div>
                        <div name="echarts02" class="fr choiceTime02" style="cursor: pointer;padding-top: 1px;" title="选择时间"><img src="${ctx}/scripts/local-lsm/common/My97DatePicker/skin/datePicker.gif"></div>
                    </div>
                    <!-- <div name="time" style="height:21px">
                        <span class="fr" style="margin-right: 10px">时</span>
                        <input id="echarts02_time" class="Wdate TimeFiled fl" style="width: 95px;float: right;border: none;color: #fff;background: none;cursor: pointer;" onclick="WdatePicker({dateFmt : 'yyyy-MM-dd HH',maxDate:'%y-%M-{%d} 23'})"/>
                   </div> -->
                    <div name="realEcharts" id="echarts02" style="width:100%;height:90%;position: relative;"></div>
                </div>
                <!-- 直播次数(万次1) -->
                <div class="fl w25 height1 marginRight5" style="width:33%;">
                    <div>
                        <div name="smallTitle" class="smallTitle textCenter">直播次数(次)</div>
                        <div name="echarts03" class="fr changeToBig" style="cursor: pointer" title="放大"><img src="${ctx}/static/styles/local-lsm/kpiview/internetTV/images/maxim.png"></div>
                        <div name="echarts03" class="fr choiceTime03" style="cursor: pointer;padding-top: 1px;" title="选择时间"><img src="${ctx}/scripts/local-lsm/common/My97DatePicker/skin/datePicker.gif"></div>
                    </div>
                    <!-- <div name="time" style="height:21px">
                        <span class="fr" style="margin-right: 10px">时</span>
                        <input id="echarts03_time" class="Wdate TimeFiled fl" style="width: 95px;float: right;border: none;color: #fff;background: none;cursor: pointer;" onclick="WdatePicker({dateFmt : 'yyyy-MM-dd HH',maxDate:'%y-%M-{%d} 23'})"/>
                    </div> -->
                    <div name="realEcharts" id="echarts03" style="width:100%;height:90%;position: relative;"></div>
                </div>
                <!-- 点播次数(万次) -->
                <div class="fl w25 height1" style="width:33%;">
                    <div>
                        <div name="smallTitle" class="smallTitle textCenter">点播次数(次)</div>
                        <div name="echarts04" class="fr changeToBig" style="cursor: pointer" title="放大"><img src="${ctx}/static/styles/local-lsm/kpiview/internetTV/images/maxim.png"></div>
                        <div name="echarts04" class="fr choiceTime04" style="cursor: pointer;padding-top: 1px;" title="选择时间"><img src="${ctx}/scripts/local-lsm/common/My97DatePicker/skin/datePicker.gif"></div>
                    </div>
                    <!-- <div name="time" style="height:21px">
                        <span class="fr" style="margin-right: 10px">时</span>
                        <input id="echarts04_time" class="Wdate TimeFiled fl" style="width: 95px;float: right;border: none;color: #fff;background: none;cursor: pointer;" onclick="WdatePicker({dateFmt : 'yyyy-MM-dd HH',maxDate:'%y-%M-{%d} 23'})"/>
                    </div> -->
                    <div name="realEcharts" id="echarts04" style="width:100%;height:90%;position: relative;"></div>
                </div>
            <div class="clear"></div>    
            </div>
        <div class="clear"></div>    
        </div> 
        <div name="twoArea" style="color:#fff;">
            <div name="title" class="titleClass" >
               质量指标
            </div> 
            <div name="echarts" style="padding-top:1px ">
                <!-- 电视播放成功率(%) -->
                <div class="fl w25 height1 marginRight5">
                    <div>
                        <div name="smallTitle" class="smallTitle textCenter">电视播放成功率(%)</div>
                        <div name="echarts05" class="fr changeToBig" style="cursor: pointer" title="放大"><img src="${ctx}/static/styles/local-lsm/kpiview/internetTV/images/maxim.png"></div>
                        <div name="echarts05" class="fr choiceTime05" style="cursor: pointer;padding-top: 1px;" title="选择时间"><img src="${ctx}/scripts/local-lsm/common/My97DatePicker/skin/datePicker.gif"></div>
                        
                    </div>
                    <!-- <div name="time" style="height:21px">
                        <span class="fr" style="margin-right: 10px">时</span>
                        <input id="echarts05_time" class="Wdate TimeFiled fl" style="width: 95px;float: right;border: none;color: #fff;background: none;cursor: pointer;" onclick="WdatePicker({dateFmt : 'yyyy-MM-dd HH',maxDate:'%y-%M-{%d} 23'})"/>
                    </div> -->
                    <div name="realEcharts" id="echarts05" style="width:100%;height:90%;position: relative;"></div>
                </div>
                <!-- 电视播放响应时长(s) -->
                <div class="fl w25 height1 marginRight5">
                    <div>
                        <div name="smallTitle" class="smallTitle textCenter">电视播放响应时长(s)</div>
                        <div name="echarts06" class="fr changeToBig" style="cursor: pointer" title="放大"><img src="${ctx}/static/styles/local-lsm/kpiview/internetTV/images/maxim.png"></div>
                        <div name="echarts06" class="fr choiceTime06" style="cursor: pointer;padding-top: 1px;" title="选择时间"><img src="${ctx}/scripts/local-lsm/common/My97DatePicker/skin/datePicker.gif"></div>
                    </div>
                    <!-- <div name="time" style="height:21px">
                        <span class="fr" style="margin-right: 10px">时</span>
                        <input id="echarts06_time" class="Wdate TimeFiled fl" style="width: 95px;float: right;border: none;color: #fff;background: none;cursor: pointer;" onclick="WdatePicker({dateFmt : 'yyyy-MM-dd HH',maxDate:'%y-%M-{%d} 23'})"/>
                    </div> -->
                    <div name="realEcharts" id="echarts06" style="width:100%;height:90%;position: relative;"></div>
                </div>
                <!-- 卡顿用户占比(%) -->
                <div class="fl w25 height1 marginRight5">
                    <div>
                        <div name="smallTitle" class="smallTitle textCenter">卡顿用户占比(%)</div>
                        <div name="echarts09" class="fr changeToBig" style="cursor: pointer" title="放大"><img src="${ctx}/static/styles/local-lsm/kpiview/internetTV/images/maxim.png"></div>
                        <div name="echarts09" class="fr choiceTime09" style="cursor: pointer;padding-top: 1px;" title="选择时间"><img src="${ctx}/scripts/local-lsm/common/My97DatePicker/skin/datePicker.gif"></div>
                    </div>
                    <!-- <div name="time" style="height:21px">
                        <span class="fr" style="margin-right: 10px">时</span>
                        <input id="echarts09_time" class="Wdate TimeFiled fl" style="width: 95px;float: right;border: none;color: #fff;background: none;cursor: pointer;" onclick="WdatePicker({dateFmt : 'yyyy-MM-dd HH',maxDate:'%y-%M-{%d} 23'})"/>
                    </div> -->
                    <div name="realEcharts" id="echarts09" style="width:100%;height:90%;position: relative;"></div>
                </div>
                <!-- 电视EPG加载时延(s)-->
                <!-- <div class="fl w25 height1 marginRight5">
                    <div>
                        <div name="smallTitle" class="smallTitle textCenter">电视EPG加载时延(ms)</div>
                        <div name="echarts07" class="fr changeToBig" style="cursor: pointer" title="放大"><img src="${ctx}/static/styles/local-lsm/kpiview/internetTV/images/maxim.png"></div>
                        <div name="echarts07" class="fr choiceTime" style="cursor: pointer;padding-top: 1px;" title="选择时间"><img src="${ctx}/scripts/local-lsm/common/My97DatePicker/skin/datePicker.gif"></div>
                    </div>
                    <div name="realEcharts" id="echarts07" style="width:100%;height:90%;position: relative;"></div>
                </div> -->
                <!-- 卡顿时长占比(%) -->
                <div class="fl w25 height1">
                    <div>
                        <div name="smallTitle" class="smallTitle textCenter" style="pointer-events:none;">卡顿时长占比(%)</div>
                        
                        <div name="echarts08" class="fr changeToBig" style="cursor: pointer" title="放大"><img src="${ctx}/static/styles/local-lsm/kpiview/internetTV/images/maxim.png"></div>
                        <div name="echarts08" class="fr choiceTime08" style="cursor: pointer;padding-top: 1px;" title="选择时间"><img src="${ctx}/scripts/local-lsm/common/My97DatePicker/skin/datePicker.gif"></div>
                        <div name="echarts13" class="fr changeToBig" style="cursor:pointer;margin-top:-22px;margin-right:3px;" title="卡顿趋势"><img width="16" height="16" src="${ctx}/static/styles/local-lsm/images/Chart.png"></div>
                    </div>
                    <!-- <div name="time" style="height:21px">
                        <span class="fr" style="margin-right: 10px">时</span>
                        <input id="echarts08_time" class="Wdate TimeFiled fl" style="width: 95px;float: right;border: none;color: #fff;background: none;cursor: pointer;" onclick="WdatePicker({dateFmt : 'yyyy-MM-dd HH',maxDate:'%y-%M-{%d} 23'})"/>
                    </div> -->
                    <div name="realEcharts" id="echarts08" style="width:100%;height:90%;position: relative;"></div>
                </div>
                <!-- 卡顿次数占比(%) -->
                <div class="fl w25 height1" style="margin-top:5px;width:33%;">
                    <div>
                        <div name="smallTitle" class="smallTitle textCenter">卡顿次数占比(%)</div>
                        <div name="echartsadd_01" class="fr changeToBig" style="cursor: pointer" title="放大"><img src="${ctx}/static/styles/local-lsm/kpiview/internetTV/images/maxim.png"></div>
                        <div name="echartsadd_01" class="fr choiceTimeadd_01 additionalTime" style="cursor: pointer;padding-top: 1px;" title="选择时间"><img src="${ctx}/scripts/local-lsm/common/My97DatePicker/skin/datePicker.gif"></div>
                    </div>
                    <!-- <div name="time" style="height:21px">
                        <span class="fr" style="margin-right: 10px">时</span>
                        <input id="echarts08_time" class="Wdate TimeFiled fl" style="width: 95px;float: right;border: none;color: #fff;background: none;cursor: pointer;" onclick="WdatePicker({dateFmt : 'yyyy-MM-dd HH',maxDate:'%y-%M-{%d} 23'})"/>
                    </div> -->
                    <div name="realEcharts" id="echartsadd_01" style="width:100%;height:90%;position: relative;"></div>
                </div>
                <!-- EPG访问成功率(%) -->
                <div class="fl w25 height1" style="margin-top:5px;margin-left:5px;width:33%;">
                    <div>
                        <div name="smallTitle" class="smallTitle textCenter">EPG访问成功率(%)</div>
                        <div name="echartsadd_02" class="fr changeToBig" style="cursor: pointer" title="放大"><img src="${ctx}/static/styles/local-lsm/kpiview/internetTV/images/maxim.png"></div>
                        <div name="echartsadd_02" class="fr choiceTimeadd_02 additionalTime" style="cursor: pointer;padding-top: 1px;" title="选择时间"><img src="${ctx}/scripts/local-lsm/common/My97DatePicker/skin/datePicker.gif"></div>
                    </div>
                    <!-- <div name="time" style="height:21px">
                        <span class="fr" style="margin-right: 10px">时</span>
                        <input id="echarts08_time" class="Wdate TimeFiled fl" style="width: 95px;float: right;border: none;color: #fff;background: none;cursor: pointer;" onclick="WdatePicker({dateFmt : 'yyyy-MM-dd HH',maxDate:'%y-%M-{%d} 23'})"/>
                    </div> -->
                    <div name="realEcharts" id="echartsadd_02" style="width:100%;height:90%;position: relative;"></div>
                </div>
                <!-- EPG响应时长达标率(%) -->
                <div class="fl w25 height1" style="margin-top:5px;margin-left:5px;width:33%;">
                    <div>
                        <div name="smallTitle" class="smallTitle textCenter">EPG响应时长达标率(%)</div>
                        <div name="echartsadd_03" class="fr changeToBig" style="cursor: pointer" title="放大"><img src="${ctx}/static/styles/local-lsm/kpiview/internetTV/images/maxim.png"></div>
                        <div name="echartsadd_03" class="fr choiceTimeadd_03 additionalTime" style="cursor: pointer;padding-top: 1px;" title="选择时间"><img src="${ctx}/scripts/local-lsm/common/My97DatePicker/skin/datePicker.gif"></div>
                    </div>
                    <!-- <div name="time" style="height:21px">
                        <span class="fr" style="margin-right: 10px">时</span>
                        <input id="echarts08_time" class="Wdate TimeFiled fl" style="width: 95px;float: right;border: none;color: #fff;background: none;cursor: pointer;" onclick="WdatePicker({dateFmt : 'yyyy-MM-dd HH',maxDate:'%y-%M-{%d} 23'})"/>
                    </div> -->
                    <div name="realEcharts" id="echartsadd_03" style="width:100%;height:90%;position: relative;"></div>
                </div>
            <div class="clear"></div>    
            </div>
        <div class="clear"></div>     
        </div> 
        <div name="fourArea" style="color:#fff;">
            <div name="title" class="titleClass" >
               链路利用率
            </div> 
            <div name="echarts" style="padding-top:5px">
                <!-- 上联TXP链路利用率(%)    边缘节点上联TXP链路利用率-->
                <div class="fl w25 height1 marginRight5" style="width:49.5%;">
                    <div>
                        <div name="smallTitle" class="smallTitle textCenter">边缘节点上联TXP链路利用率(%)</div>
                        <div name="echarts10" class="fr changeToBig" style="cursor: pointer" title="放大"><img src="${ctx}/static/styles/local-lsm/kpiview/internetTV/images/maxim.png"></div>
                        <div name="echarts10" class="fr choiceTime10" style="cursor: pointer;padding-top: 1px;" title="选择时间"><img src="${ctx}/scripts/local-lsm/common/My97DatePicker/skin/datePicker.gif"></div>
                    </div>
                    <!-- <div name="time" style="height:21px">
                        <span class="fr" style="margin-right: 10px">时</span>
                        <input id="echarts10_time" class="Wdate TimeFiled fl" style="width: 95px;float: right;border: none;color: #fff;background: none;cursor: pointer;" onclick="WdatePicker({dateFmt : 'yyyy-MM-dd HH',maxDate:'%y-%M-{%d} 23'})"/>
                    </div> -->
                    <div name="realEcharts" id="echarts10" style="width:100%;height:90%;position: relative;"></div>
                </div>
                <!-- 下联交换机链路利用率(%)    边缘节点内部互联链路利用率 -->
                <div class="fl w25 height1 marginRight5" style="width:49.5%;">
                    <div>
                        <div name="smallTitle" class="smallTitle textCenter">边缘节点内部互联链路利用率(%)</div>
                        <div name="echarts11" class="fr changeToBig" style="cursor: pointer" title="放大"><img src="${ctx}/static/styles/local-lsm/kpiview/internetTV/images/maxim.png"></div>
                        <div name="echarts11" class="fr choiceTime11" style="cursor: pointer;padding-top: 1px;" title="选择时间"><img src="${ctx}/scripts/local-lsm/common/My97DatePicker/skin/datePicker.gif"></div>
                    </div>
                    <!-- <div name="time" style="height:21px">
                        <span class="fr" style="margin-right: 10px">时</span>
                        <input id="echarts11_time" class="Wdate TimeFiled fl" style="width: 95px;float: right;border: none;color: #fff;background: none;cursor: pointer;" onclick="WdatePicker({dateFmt : 'yyyy-MM-dd HH',maxDate:'%y-%M-{%d} 23'})"/>
                    </div> -->
                    <div name="realEcharts" id="echarts11" style="width:100%;height:90%;position: relative;"></div>
                </div>
                <!-- 堆叠互联利用率(%) -->
                <!-- <div class="fl w25 height1">
                    <div>
                        <div name="smallTitle" class="smallTitle textCenter">堆叠互联利用率(%)</div>
                        <div name="echarts12" class="fr changeToBig" style="cursor: pointer" title="放大"><img src="${ctx}/static/styles/local-lsm/kpiview/internetTV/images/maxim.png"></div>
                        <div name="echarts12" class="fr choiceTime" style="cursor: pointer;padding-top: 1px;" title="选择时间"><img src="${ctx}/scripts/local-lsm/common/My97DatePicker/skin/datePicker.gif"></div>
                    </div>
                    <div name="realEcharts" id="echarts12" style="width:100%;height:90%;position: relative;"></div>
                </div> -->
            <div class="clear"></div>    
            </div>
        <div class="clear"></div>     
        </div> 
        <div name="threeArea" style="color:#fff;display:none;">
            <div class="titleClass"> 
                <div name="title" class="fl w100" style="border:none;width:100%;">
                   	卡顿趋势
                </div>
            <div class="clear"></div>      
            </div>
            <div name="echarts" style="padding-top:1px ">
                <!-- 卡顿趋势 -->
                <div class="fl w50 height1 marginRight5" style="width:100%;">
                    <div>
                        <div name="smallTitle" class="smallTitle textCenter" style="opacity: 0;">卡顿趋势</div>
                        <div name="echarts13" class="fr changeToBig" style="cursor: pointer" title="放大"><img src="${ctx}/static/styles/local-lsm/kpiview/internetTV/images/maxim.png"></div>
                        <div name="echarts13" class="fr choiceTimeSlot choiceTimeSlot13" style="cursor: pointer;padding-top: 1px;" title="选择时间"><img src="${ctx}/scripts/local-lsm/common/My97DatePicker/skin/datePicker.gif"></div>
                    </div>
                    <!-- <div name="time" style="height:21px">
                        <span class="fr" style="margin-right: 10px">时</span>
                        <input id="echarts13_time" class="Wdate TimeFiled fl" style="width: 95px;float: right;border: none;color: #fff;background: none;cursor: pointer;" onclick="WdatePicker({dateFmt : 'yyyy-MM-dd HH',maxDate:'%y-%M-{%d} 23'})"/>
                    </div> -->
                    <div name="realEcharts" id="echarts13" style="width:100%;height:90%;position: relative;"></div>
                </div>
            <div class="clear"></div>    
            </div>
        <div class="clear"></div>    
        </div> 
    <div class="clear"></div>
    <div name="fourArea" style="color:#fff;">
            <div name="title" class="titleClass" >
              IPTV
            </div> 
           
             <!-- 华为 -烽火-->
                <div class=" w50 height1 marginRight5" style="width:99.5%;">
                    <div>
                        <div name="smallTitle" class="smallTitle textCenter"></div>
                        <div name="" class="fr changeToBig" style="cursor: pointer" title="放大"><img src="${ctx}/static/styles/local-lsm/kpiview/internetTV/images/maxim.png"></div>
                        <div name="" class="fr choiceTimeadd_04 additionalTime" style="cursor: pointer;padding-top: 1px;" title="选择时间"><img src="${ctx}/scripts/local-lsm/common/My97DatePicker/skin/datePicker.gif"></div>
                    </div>
                    <div name="realEcharts" id="" style="width:100%;height:90%;position: relative;"></div>
                </div>
           
        <div class="clear"></div>     
        </div> 
        
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
                <div class=" w50 height1 marginRight5" style="width:99.5%;">
                    <div>
                        <div name="smallTitle" class="smallTitle textCenter" style="margin-left:7.5%;">华为+烽火</div>
                        
                        <div name="echartsadd_04_re" class="fr changeToBig" style="cursor: pointer" title="放大"><img src="${ctx}/static/styles/local-lsm/kpiview/internetTV/images/maxim.png"></div>
                        <div name="echartsadd_04_re" class="fr choiceTimeadd_04_re additionalTime" style="cursor: pointer;padding-top: 1px;" title="选择时间"><img src="${ctx}/scripts/local-lsm/common/My97DatePicker/skin/datePicker.gif"></div>
                    </div>
                    <div name="realEcharts" id="echartsadd_04_re" style="width:100%;height:90%;position: relative;"></div>
                </div>
            <div name="echarts" style="padding-top:5px">
                <!-- 华为-->
                <div class="fl w50 height1 marginRight5" style="width:49.5%;">
                    <div>
                        <div name="smallTitle" class="smallTitle textCenter">华为</div>
                        <div name="echartsadd_10_re" class="fr changeToBig" style="cursor: pointer" title="放大"><img src="${ctx}/static/styles/local-lsm/kpiview/internetTV/images/maxim.png"></div>
                        <div name="echartsadd_10_re" class="fr choiceTimeadd_10_re additionalTime" style="cursor: pointer;padding-top: 1px;" title="选择时间"><img src="${ctx}/scripts/local-lsm/common/My97DatePicker/skin/datePicker.gif"></div>
                    </div>
                    <div name="realEcharts" id="echartsadd_10_re" style="width:100%;height:90%;position: relative;"></div>
                </div>
                <!-- 烽火 -->
                <div class="fl w50 height1 marginRight5" style="width:49.5%;">
                    <div>
                        <div name="smallTitle" class="smallTitle textCenter">烽火</div>
                        <div name="echartsadd_06_re" class="fr changeToBig" style="cursor: pointer" title="放大"><img src="${ctx}/static/styles/local-lsm/kpiview/internetTV/images/maxim.png"></div>
                        <div name="echartsadd_06_re" class="fr choiceTimeadd_06_re additionalTime" style="cursor: pointer;padding-top: 1px;" title="选择时间"><img src="${ctx}/scripts/local-lsm/common/My97DatePicker/skin/datePicker.gif"></div>
                    </div>
                    <!-- <div name="time" style="height:21px">
                        <span class="fr" style="margin-right: 10px">时</span>
                        <input id="echarts11_time" class="Wdate TimeFiled fl" style="width: 95px;float: right;border: none;color: #fff;background: none;cursor: pointer;" onclick="WdatePicker({dateFmt : 'yyyy-MM-dd HH',maxDate:'%y-%M-{%d} 23'})"/>
                    </div> -->
                    <div name="realEcharts" id="echartsadd_06_re" style="width:100%;height:90%;position: relative;"></div>
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
                        <div name="echartsadd_07_re" class="fr changeToBig" style="cursor: pointer" title="放大"><img src="${ctx}/static/styles/local-lsm/kpiview/internetTV/images/maxim.png"></div>
                        <div name="echartsadd_07_re" class="fr choiceTimeadd_07_re additionalTime" style="cursor: pointer;padding-top: 1px;" title="选择时间"><img src="${ctx}/scripts/local-lsm/common/My97DatePicker/skin/datePicker.gif"></div>
                    </div>
                    <!-- <div name="time" style="height:21px">
                        <span class="fr" style="margin-right: 10px">时</span>
                        <input id="echarts10_time" class="Wdate TimeFiled fl" style="width: 95px;float: right;border: none;color: #fff;background: none;cursor: pointer;" onclick="WdatePicker({dateFmt : 'yyyy-MM-dd HH',maxDate:'%y-%M-{%d} 23'})"/>
                    </div> -->
                    <div name="realEcharts" id="echartsadd_07_re" style="width:100%;height:90%;position: relative;"></div>
                </div>
                <!-- 烽火 -->
                <div class="fl w25 height1 marginRight5" style="width:49.5%;">
                    <div>
                        <div name="smallTitle" class="smallTitle textCenter">烽火(节点)</div>
                        <div name="echartsadd_08_re" class="fr changeToBig" style="cursor: pointer" title="放大"><img src="${ctx}/static/styles/local-lsm/kpiview/internetTV/images/maxim.png"></div>
                        <div name="echartsadd_08_re" class="fr choiceTimeadd_08_re additionalTime" style="cursor: pointer;padding-top: 1px;" title="选择时间"><img src="${ctx}/scripts/local-lsm/common/My97DatePicker/skin/datePicker.gif"></div>
                    </div>
                    <!-- <div name="time" style="height:21px">
                        <span class="fr" style="margin-right: 10px">时</span>
                        <input id="echarts11_time" class="Wdate TimeFiled fl" style="width: 95px;float: right;border: none;color: #fff;background: none;cursor: pointer;" onclick="WdatePicker({dateFmt : 'yyyy-MM-dd HH',maxDate:'%y-%M-{%d} 23'})"/>
                    </div> -->
                    <div name="realEcharts" id="echartsadd_08_re" style="width:100%;height:90%;position: relative;"></div>
                </div>
            <div class="clear"></div>    
            </div>
        <div class="clear"></div>     
        </div> 
        
        
        <div class="clear"></div>
    <div name="fourArea" style="color:#fff;margin-bottom:10px;">
            <div name="title" class="titleClass" >
             	 咪咕视频
            </div> 
            <div name="echarts" style="padding-top:5px">
                <div class="fl w25 height1 marginRight5" style="width:32.9%;">
                    <div>
                        <div name="smallTitle" class="smallTitle textCenter">华为</div>
                        <div name="echartsadd_11_re" class="fr changeToBig" style="cursor: pointer" title="放大"><img src="${ctx}/static/styles/local-lsm/kpiview/internetTV/images/maxim.png"></div>
                        <div name="echartsadd_11_re" class="fr choiceTimeadd_11_re additionalTime" style="cursor: pointer;padding-top: 1px;" title="选择时间"><img src="${ctx}/scripts/local-lsm/common/My97DatePicker/skin/datePicker.gif"></div>
                    </div>
                    <div name="realEcharts" id="echartsadd_11_re" style="width:100%;height:90%;position: relative;"></div>
                </div>
                <div class="fl w25 height1 marginRight5" style="width:32.9%;">
                    <div>
                        <div name="smallTitle" class="smallTitle textCenter">中兴</div>
                        <div name="echartsadd_08" class="fr changeToBig" style="cursor: pointer" title="放大"><img src="${ctx}/static/styles/local-lsm/kpiview/internetTV/images/maxim.png"></div>
                        <div name="echartsadd_08" class="fr choiceTimeadd_08 additionalTime" style="cursor: pointer;padding-top: 1px;" title="选择时间"><img src="${ctx}/scripts/local-lsm/common/My97DatePicker/skin/datePicker.gif"></div>
                    </div>
                    <div name="realEcharts" id="echartsadd_08" style="width:100%;height:90%;position: relative;"></div>
                </div>
                
                <div class="fl w25 height1 marginRight5" style="width:32.9%;">
                    <div>
                        <div name="smallTitle" class="smallTitle textCenter">杭研</div>
                        <div name="echartsadd_13_re" class="fr changeToBig" style="cursor: pointer" title="放大"><img src="${ctx}/static/styles/local-lsm/kpiview/internetTV/images/maxim.png"></div>
                        <div name="echartsadd_13_re" class="fr choiceTimeadd_13_re additionalTime" style="cursor: pointer;padding-top: 1px;" title="选择时间"><img src="${ctx}/scripts/local-lsm/common/My97DatePicker/skin/datePicker.gif"></div>
                    </div>
                    <div name="realEcharts" id="echartsadd_13_re" style="width:100%;height:90%;position: relative;"></div>
                </div>
            <div class="clear"></div>    
            </div>
        <div class="clear"></div>     
        </div> 
        
        <div class="clear"></div>
    <div name="fourArea" style="color:#fff;">
            <div name="title" class="titleClass" >
             	上海内容中心
            </div> 
            <div name="echarts" style="padding-top:5px">
                <div class="fl w25 height1 marginRight5" style="width:99.5%;margin-bottom:20px;">
                    <div>
                        <div name="smallTitle" class="smallTitle textCenter" style="pointer-events:none;color:#0c0d22;">上海内容中心</div>
                        <div name="echartsadd_10" class="fr changeToBig" style="cursor: pointer" title="放大"><img src="${ctx}/static/styles/local-lsm/kpiview/internetTV/images/maxim.png"></div>
                        <div name="echartsadd_10" class="fr choiceTimeadd_10 additionalTime" style="cursor: pointer;padding-top: 1px;" title="选择时间"><img src="${ctx}/scripts/local-lsm/common/My97DatePicker/skin/datePicker.gif"></div>
                    </div>
                    <!-- <div name="time" style="height:21px">
                        <span class="fr" style="margin-right: 10px">时</span>
                        <input id="echarts10_time" class="Wdate TimeFiled fl" style="width: 95px;float: right;border: none;color: #fff;background: none;cursor: pointer;" onclick="WdatePicker({dateFmt : 'yyyy-MM-dd HH',maxDate:'%y-%M-{%d} 23'})"/>
                    </div> -->
                    <div name="realEcharts" id="echartsadd_10" style="width:100%;height:90%;position: relative;"></div>
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
<script type="text/javascript" src="${ctx}/scripts/local-lsm/kpiview/internetTV/internetTV.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/kpiview/internetTV/internetTVAssist.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/kpiview/internetTV/drawPic.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/kpiview/internetTV/timeJs.js"></script>
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