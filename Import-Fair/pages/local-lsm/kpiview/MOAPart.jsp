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


<title>MOA部分截取</title>
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
 /* .selectDiv{
            background: #7a7eff;
            border-radius: 7px;
            color: #fff;
        }  */
        .chooseTypeLine{
            border-bottom: 3px solid #757aff;
            color: #757aff;
        }
        .detailItem{
            background: #ebecff;
            border-radius: 10px;
            margin-bottom: 10px;
        }
    	.pad_right{ padding-right:2em;}
		#scroll_div {overflow: hidden;margin-left:5px;margin-top:5px;padding-top:5px;border-top:solid 1px #eeeeee;}
		#scroll_begin,#scroll_end {display: inline;width:100%;}
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
<body id="main" style="width:100%;height:100%;overflow-y:hidden;margin-left:20px;"> 
<div style="width:99%;height:100%;overflow-y:auto;position:relative;margin: 0px 5px">
    <div style=";">
    	<div style="padding: 10px  0px;margin-bottom:5px;margin-top:0px;border-bottom: 1px solid #757aff;">
				<input  id="timeField_day"  class="Wdate TimeFiled " style="margin-left: 10px;margin-right: 10px;color:#fff; width: 150px;height:34px;"
			               onclick="WdatePicker({dateFmt : 'yyyy-MM-dd',maxDate:'%y-%M-{%d-1}'})"/> <button id="queryBtn" class="btn btn-primary" style="margin-left: 20px;" type="button">
		                查 询
		            </button>
                  
              </div>
    	<div id="ex" class="fl" style="width:49.5%;padding-right:5px;">
    		<div name="title" class="titleClass" >
             	指标呈现
<!--              	<span>指标名称</span>
 -->             	<input id="index_name" style="width: 155px; font-family:微软雅黑; font-weight: 100;font-size: 14px; position: relative;top: -3px;margin-left:20px;height:21px;" type="text" name="yuexian1" id="yuexian" value="" placeholder="输入指标名称,回车查询!"  onkeypress="getKey();" />
             	
<%--              	<div name="zhibiaochenxian" class="fr choiceTimeadd_10_re additionalTime" style="cursor: pointer;padding-top: 1px;" title="选择时间"><img src="${ctx}/scripts/local-lsm/common/My97DatePicker/skin/datePicker.gif"></div>
 --%>            </div> 
            <div style="border: 1px solid #09477e;min-height:370px;">
           
         <div class="content" style="width:100%;height:30px;padding: 5px 0 0;color: #fff;">
            <div name="businessChoose" class="chooseTypeLine" style="float:left;width:25%;height:100%;text-align: center;" onclick="internetTV.changeYewu(this,'yidong')">
                移动业务
            </div>
            <div name="businessChoose" style="float: left;width:25%;height:100%;text-align: center;" onclick="internetTV.changeYewu(this,'jiating')">
                家庭业务
            </div>
            <div name="businessChoose" style="float: left;width:25%;height:100%;text-align: center;" onclick="internetTV.changeYewu(this,'zhengqi')">
                政企业务
            </div>
            <div name="businessChoose" style="float: left;width:25%;height:100%;text-align: center;" onclick="internetTV.changeYewu(this,'xin')">
                新业务
            </div>
        </div>
        <div id="maskDiv" class="content" style="width:100%;">
    		<div id="addScroller">
    				<div id="_yidong" style="width:100%;">
					<table id="con_grid_div_yidong"></table>
					<div id="con_grid_div_yidonggridPager"></div>
				</div>
				<div id="_jiating" style="width:100%;display:none;">
					<table id="con_grid_div_jiating"></table>
					<div id="con_grid_div_jiatinggridPager"></div>
				</div>
				<div id="_zhengqi" style="width:100%;display:none;">
					<table id="con_grid_div_zhengqi"></table>
					<div id="con_grid_div_zhengqigridPager"></div>
				</div>
				<div id="_xin" style="width:100%;display:none;">
					<table id="con_grid_div_xin"></table>
					<div id="con_grid_div_xingridPager"></div>
				</div>
    		</div>
    	</div>
            </div>
    	</div>
    	<div class="fl" style="width:49.5%;">
    		<div name="title" class="titleClass" >
             	指标趋势
<%--              	<div name="echartsadd_10_re" class="fr choiceTimeadd_10_re additionalTime" style="cursor: pointer;padding-top: 1px;" title="选择时间"><img src="${ctx}/scripts/local-lsm/common/My97DatePicker/skin/datePicker.gif"></div>
 --%>            </div> 
            
            <div style="border: 1px solid #09477e;min-height:370px;">
            	<div name="realEcharts" id="echarts02" style="width:100%;height:100%;height:350px;position: relative;"></div>
            </div>
    	</div>
    	 <div class="clear"></div> 
    </div>
   <div class="clear"></div> 
    
   <div style="margin-bottom:5px;">
    	<div class="fl" style="width:49.5%;padding-right:5px;">
    		<div name="title" class="titleClass" >
             	全网短板
             	
            </div> 
            <div style="border: 1px solid #09477e;min-height:370px;">
            	<div id="uuuu">
                <div style="margin-bottom: 5px;height: 29px;padding-top: 5px;color: #fff;">
                    <div values="down_stand" name="zerenOrguanzhu" class="chooseTypeLine" style="float:left;width:28%;height:100%;text-align: center;" onclick="internetTV.changeEcharts(this)">
                        未达基准值
                    </div> 
                    <div values="up_stand_down_chall" name="zerenOrguanzhu" style="float: left;width:44%;height:100%;text-align: center;" onclick="internetTV.changeEcharts(this)">
                        已达基准值未达挑战值
                    </div>
                    <div values="duanban" name="zerenOrguanzhu" style="float: left;width:28%;height:100%;text-align: center;" onclick="internetTV.changeEcharts(this)">
                        总短板指标
                    </div>

                    <div style="clear:both"></div>
                </div>
                <div id="echartsDiv">
                    <div id="chart" style="width: 100%;min-height: 320px;"></div>
                </div>
            </div>
            </div>
    	</div>
    	<div class="fl" style="width:49.5%;">
    		<div name="title" class="titleClass" >
             	各中心短板
<%--              	<div name="duanban" class="fr choiceTimeadd_10_re additionalTime" style="cursor: pointer;padding-top: 1px;" title="选择时间"><img src="${ctx}/scripts/local-lsm/common/My97DatePicker/skin/datePicker.gif"></div>
 --%>             	
            </div> 
            <div style="border: 1px solid #09477e; min-height:370px;padding:5px;">
            	<div id="" style="width:100%;">
					<table id="table0"></table>
<!-- 					<div id="table0_gridPager"></div>
 -->				</div>
            </div>
    	</div>
    	 <div class="clear"></div> 
    </div>
     <div class="clear"></div> 
     </div>
</body>

<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/jquery.ux.loadMask.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/lou-multi-select-e052211/js/jquery.multi-select.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/dragger.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/kpiview/MOAPart/internetTV.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/kpiview/MOAPart/drawPic.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/kpiview/MOAPart/commonAjax.js"></script>

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