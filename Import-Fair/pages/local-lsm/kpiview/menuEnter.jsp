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


<title>全网总览</title>
<script>
    $(document).ready(function(){

        var winHeight = document.body.clientHeight; 
        console.log(winHeight);
        $(".containerIframe").height(winHeight - $(".menuDiv").height());
        //初始函数
        menuEnter.init();
           
});    

</script>
</head>
<body style="width:100%;height:100%;overflow:hidden;"> 
    <div name="menu" class="menuDiv">
        <span style="position: absolute;color: #fff;font-size: 25px;padding-top: 7px;padding-left: 10px;">上海移动全网指标概览</span>
        <ul class="menuLi" style="margin-left: 400px;">
            <li class="onclickLi addBottom" name="frame1">全网</li>
            <li class="clearBottom specialLi" style="position: relative;">
                 <span>区域</span>
                 <div class="li_menu_div">
                     <div class="onclickLi" name="frame2" style="border-bottom:1px solid #0c0d22">区域汇总</div>
                     <div class="onclickLi" name="frame3" style="border-bottom:1px solid #0c0d22">小区详情</div>
                     <div class="onclickLi" name="frame4">业务详情</div>
                 </div>
            </li>
            <li class="onclickLi" name="frame5">业务</li>
            <li class="onclickLi" name="frame6">互联网电视</li>
            <li class="clearBottom specialLi" style="position: relative;">
                 <span>IDC流量监控</span>
                 <div class="li_menu_div" style="height: 72px">
                     <div class="onclickLi" name="frame7" style="border-bottom:1px solid #0c0d22">IDC大客户</div>
                     <div class="onclickLi" name="frame8">IDC机房</div>
                 </div>
            </li>
        </ul>
        <div name="helpPic" class="helpPic" style="float: right;padding: 5px 10px 0px 0px;">
            <img style="width:40px; height: 40px;cursor: pointer;" title="帮助文档" src="${ctx}/static/styles/local-lsm/kpiview/menuEnter/images/helpPic.png">
        </div>
    <div class="clear"></div>    
    </div>
    <div name="iframe" class="containerIframe" style="padding:0 0px 0 20px" >
        <iframe id="frame1" class="singleIframe" name="全网" style="width:100%;height:100%;left:0px;border:none;background: #0c0d22;" frameborder="no" src="kpiview.jsp" ></iframe>
        <iframe id="frame2" class="singleIframe" name="区域汇总" style="width:100%;height:100%;left:0px;border:none;background: #0c0d22;display: none;" frameborder="no" src="" ></iframe>
        <iframe id="frame3" class="singleIframe" name="小区详情" style="width:100%;height:100%;left:0px;border:none;background: #0c0d22;display: none;" frameborder="no" src="" ></iframe>
        <iframe id="frame4" class="singleIframe" name="业务详情" style="width:100%;height:100%;left:0px;border:none;background: #0c0d22;display: none;" frameborder="no" src="" ></iframe>
        <iframe id="frame5" class="singleIframe" name="业务" style="width:100%;height:100%;left:0px;border:none;background: #0c0d22;display: none;" frameborder="no" src="" ></iframe>
        <iframe id="frame6" class="singleIframe" name="互联网电视" style="width:100%;height:100%;left:0px;border:none;background: #0c0d22;display: none;" frameborder="no" src="" ></iframe>
        <iframe id="frame7" class="singleIframe" name="IDC大客户" style="width:100%;height:100%;left:0px;border:none;background: #0c0d22;display: none;" frameborder="no" src="" ></iframe>
        <iframe id="frame8" class="singleIframe" name="IDC机房" style="width:100%;height:100%;left:0px;border:none;background: #0c0d22;display: none;" frameborder="no" src="" ></iframe>
    </div>
    







</body>
<%@ include file="/pages/local-lsm/common/screenbaseinclude.jsp"%>
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/common/custom_small.css" />
<link rel="stylesheet" href="${ctx}/scripts/local-lsm/common/lou-multi-select-e052211/css/multi-select.css" />
<style type="text/css">
    body,html{
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
    ul{
        margin-bottom:0px;
    }
    .menuDiv{
        background-color: #09477e;
    }
    .menuDiv ul li{
        float: left;
        color: #fff;
        min-width: 100px;
        height: 50px;
        cursor: pointer;
        font-size: 20px;
        padding:10px 0px;
        text-align: center; 
        margin:0px 10px;
    }
    .menuDiv ul li:hover{
        border-bottom: 2px solid #fff;
    }
    .addBottom{
        border-bottom: 2px solid #fff;
    }
    .clearBottom{
        border-bottom:none !important;
    }

    .containerIframe{
        background: #0c0d22;
        border-top: 1px solid #081428;
        width: 100%;
    }
    .li_menu_div{
        position: absolute;
        top: 50px;
        left: 0px;
        width:100%;
        height: 110px;
        background-color: #09477e;
        display: none;
    }
    .li_menu_div div{
        height: 35px;
    }




    .help-page{
        white-space:pre-wrap;
        text-align:left;
        word-wrap:break-word;
        height:300px;
        overflow-y:auto;
        position:relative;
    }
    .helpTable{
        border-top:solid 1px #000000;
        border-left:solid 1px #000000;
        width:90%;
        margin-left: 75px;
    }
    .helpTableTitle{
        border-bottom:solid 1px #000000;
        border-right:solid 1px #000000;
        background: #09477e;
        word-wrap: break-word; word-break: break-all;
        white-space:normal;
    }
    .helpTableData{
        border-bottom:solid 1px #0c1b39;
        border-right:solid 1px #0c1b39;
        word-wrap: break-word; word-break: break-all;
        white-space:normal;
    }
    .helpTitle{
        font-weight:bold;
        display: block;
        padding-left:50px
    }


    

</style>
   
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/jquery.ux.loadMask.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/lou-multi-select-e052211/js/jquery.multi-select.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/dragger.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/kpiview/menuEnter/menuEnter.js"></script>
<script>


</script>
</html>