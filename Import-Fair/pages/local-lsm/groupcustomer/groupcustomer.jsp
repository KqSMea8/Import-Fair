<!DOCTYPE html>
<html lang="zh-CN" style="">
<head>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<meta charset="UTF-8" http-equiv="X-UA-Compatible" content="IE=Edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<%@ include file="/common/lib.jsp"%>
<c:set var="hotspot" value="common" />
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/My97DatePicker/WdatePicker.js"></script>
<link rel="stylesheet" href="${ctx}/static/jslib/My97DatePicker/skin/My97DatePicker/WdatePicker.css" />
<%@ include file="/common/bootstrap.jsp"%> 
<%@ include file="/common/echarts.jsp"%>
<link rel="stylesheet" href="${jslib}/jquery-1.7.2/external/jqgrid/css/ui.jqgrid.css" />
<link rel="stylesheet" href="${jslib}/jquery-1.7.2/external/jqgrid/themes/redmond/jquery-ui-1.9.2.custom.min.css" />


<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciie/ciie.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciie/ciie_jqgrid.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/map.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciie/groupcustomer.css" />
<title>MWC集客专线保障</title>
<style type="text/css">
	.leaflet-left {
	    left:30px;
	}
	.leaflet-top {
	    top:30px;
	}
	
	
</style>
</head>
<body> 
<div class="bodybackground" style="overflow:hidden;">
	<div style="float:left;width:1700px;height:100%;padding:40px;">
		<div style="width:100%;">
			<div class="ciiepanel" style="width:560px;height:700px;float:left;">
				<div class="ciietitle">
					<div class="gc-icon-scale"></div>
					<div>保障规模</div>
				</div>
				<div class="ciiecontent" style="padding:15px 15px 0px 15px;">
					<div style="width:100%;">
						<div class="gc-customerShield" style="float:left;"></div>
						<div class="" style="float:left;margin-left:30px;padding-top:50px;">
							<div class="kpiTitleLarge" style="letter-spacing:5px;">保障客户<span class="kpiUnitLarge">(个)</span></div>
							<div id="allCustomer" class="kpiValueLarge" style="margin-top:15px;">--</div>
						</div>
					</div>
					<div style="clear:both;"></div>
					<div style="width:100%;margin-top:30px;">
						<div class="gc-splineShield" style="float:left;"></div>
						<div class="" style="float:left;margin-left:30px;padding-top:50px;">
							<div class="kpiTitleLarge" style="letter-spacing:5px;">保障专线<span class="kpiUnitLarge">(条)</span></div>
							<div id="allSpline" class="kpiValueLarge" style="margin-top:15px;">--</div>
						</div>
					</div>
					<div style="clear:both;"></div>
					<div style="width:100%;margin-top:30px;">
						<div class="lineCountBox" style="float:left;text-align:center;">
							<div class="kpiTitleLarge">传输专线</div>
							<div id="spline_transmit" class="kpiValueLarge">--</div>
						</div>
						<div class="lineCountBox" style="float:left;margin-left:50px;text-align:center;">
							<div class="kpiTitleLarge">互联网专线</div>
							<div id="spline_internet" class="kpiValueLarge">--</div>
						</div>
					</div>
					<div style="clear:both;"></div>
				</div>
			</div>
			<div style="margin-left:50px;width:1000px;height:700px;float:left;">
				<div class="ciiepanel" style="height:350px;" >
					<div class="ciietitle">
						<div class="gc-icon-fault"></div>
						<div>故障概况</div>
					</div>
					<div class="ciiecontent" style="padding:15px 15px 0px 15px;">
						<div style="width:50%;margin-top:30px;float:left;">
							<div class="gc-faultCustomer" style="float:left;"></div>
							<div class="" style="float:left;margin-left:10px;padding-top:50px;">
								<div class="kpiTitleLarge" style="letter-spacing:5px;">故障客户<span class="kpiUnitLarge">(个)</span></div>
								<div id="faultCustomer" class="kpiValueLarge" style="margin-top:15px;color:#ff5252;">0</div>
							</div>
						</div>
						<div style="width:50%;margin-top:30px;float:left;">
							<div class="gc-faultSpline" style="float:left;"></div>
							<div class="" style="float:left;margin-left:10px;padding-top:50px;">
								<div class="kpiTitleLarge" style="letter-spacing:5px;">故障专线<span class="kpiUnitLarge">(条)</span></div>
								<div id="faultSpline" class="kpiValueLarge" style="margin-top:15px;color:#ff5252;">0</div>
							</div>
						</div>
					</div>
				</div>
				<div style="clear:both;"></div>
				<div class="ciiepanel" style="height:350px;" >
					<div class="ciietitle">
						<div class="gc-icon-complain"></div>
						<div>投诉概况</div>
					</div>
					<div class="ciiecontent" style="padding:15px 15px 0px 15px;">
						<div style="width:50%;margin-top:30px;float:left;">
							<div class="gc-complainCustomer" style="float:left;"></div>
							<div class="" style="float:left;margin-left:10px;padding-top:50px;">
								<div class="kpiTitleLarge" style="letter-spacing:5px;">投诉客户<span class="kpiUnitLarge">(个)</span></div>
								<div id="complainCustomer" class="kpiValueLarge" style="margin-top:15px;color:#f2acff;">0</div>
							</div>
						</div>
						<div style="width:50%;margin-top:30px;float:left;">
							<div class="gc-complainSpline" style="float:left;"></div>
							<div class="" style="float:left;margin-left:10px;padding-top:50px;">
								<div class="kpiTitleLarge" style="letter-spacing:5px;">投诉专线<span class="kpiUnitLarge">(条)</span></div>
								<div id="complainSpline" class="kpiValueLarge" style="margin-top:15px;color:#f2acff;">0</div>
							</div>
						</div>
					</div>
				</div>
				<div style="clear:both;"></div>
			</div>
			
		</div>
		<div style="width:100%;padding-right:40px;">
			<div class="ciiepanel" style="width:100%;height:400px;float:left;">
				<div class="ciietitle">
					<div class="gc-icon-performance_trend"></div>
					<div>互联网专线性能概况</div>
				</div>
				<div class="ciiecontent" style="height:380px;padding:15px 15px 0px 15px;">
					<div id="chart0_0" style="width:100%;height:100%;"></div>
				</div>
			</div>
		</div>
	</div>
	<div class="blockCenter" style="width:3000px;height:100%;padding:0;">
		<div class="mapFrame" style="width:100%;height:798px;position:relative;">
			<div style="width:100%;height:100%;position:relative;">
				<div class="mapFrameLT"></div>
				<div class="mapFrameBR"></div>
				<div class="map" id="map">
					<iframe id="mapIFrame" src="mapTopo.jsp" style="width:100%;height:100%;border-radius:100px;" frameborder="0"></iframe>
				</div>
			</div>
		</div>
		<div class="gc-topobg" style="margin-top:40px;" >
			<div class="ciiepanel" style="width:100%;height:100%;float:left;padding:20px;">
				<div class="ciietitle" style="border-bottom:none;">
					<div class="gc-icon-sptopo"></div>
					<div>专线拓扑</div>
				</div>
				<div id="topoDiv" class="ciiecontent" style="width:100%;padding:15px 15px 0px 15px;">
					
				</div>
			</div>
		</div>
	</div>
	<div class="blockRight" style="width:1700px;padding:40px;" >
		<div style="width:100%;">
			<div class="ciiepanel" style="width:100%;height:700px;float:left;">
				<div class="ciietitle">
					<div class="gc-icon-spline"></div>
					<div>保障专线</div>
				</div>
				<div class="ciiecontent" style="padding:0px;">
					<table id="table" style="width:100%;height:100%;"></table>
				</div>
			</div>
		</div>
		<div id="singleLineParent" style="width:100%;display:none;">
			<div class="ciiepanel" style="width:100%;height:400px;float:left;">
				<div class="ciietitle">
					<div class="gc-icon-performance_trend"></div>
					<div>专线性能<span id="singleLineId"></span></div>
				</div>
				<div class="ciiecontent" style="height:380px;padding:15px 15px 0px 15px;">
					<div id="chart0_1" style="width:100%;height:100%;"></div>
				</div>
			</div>
		</div>
	</div>
	<div class="screentitle">
		<div class="titleAndLogo">
			<div class="logo"></div>
			<div class="titleTxt">上海移动重要区域实时保障</div>
		</div>
		<div style="clear:both;"></div>
		<div id="screenTitleTime" class="titleTime">
		</div>
		<div class="subtitle">MWC专线保障</div>
	</div>
</div>
<div id="demo" class="icon-play" style="display:none;cursor:pointer;position:absolute;top:5px;left:35px;"></div>
<div class="modal fade"  id="modalWin" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog" style="width:850px;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<h4 class="modal-title" id="modalWinTitle">
				</h4>
			</div>
			<div class="modal-body" id="modalWinBody" style="width:100%;overflow:auto;">
			</div>
			<div class="modal-footer">
                <button type="button" class="btn btn-success" id="modalConfirm">确定</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal">取消</button>
            </div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>

<div class="modal fade"  id="modalWinLarge" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog" style="width:850px;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<h4 class="modal-title" id="modalWinTitleLarge">
				</h4>
			</div>
			<div class="modal-body" id="modalWinBodyLarge" style="width:100%;overflow:auto;">
			</div>
			<div class="modal-footer">
                <button type="button" class="btn btn-success" id="modalConfirmLarge">确定</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal">取消</button>
            </div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>
</body>

<script type="text/javascript" src="${jslib}/jquery-1.7.2/external/jqgrid/js/i18n/grid.locale-cn.js"></script>
<script type="text/javascript" src="${jslib}/jquery-1.7.2/external/jqgrid/js/jquery.jqGrid.min.js"></script>
<script type="text/javascript" src="${jslib}/twaver/twaver.js"></script>
<!-- jquery loadmask -->
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/spinner/jquery.ux.loadMaskcss.js"></script>
<!-- 需要内网使用百度api -->
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/baiduapi/baiduApiScript.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/baiduapi/codemirror.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/baiduapi/javascript.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/baiduapi/BMap.js"></script>

<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/consts.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/utils.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/screenDataManager.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/ciie/ciie_config.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/dragger.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/groupcustomer/groupcustomer.js"></script>

<script>
var BASEPATH="${ctx}";
var mapReady=false;
var thisPageReady=false;
$(function(){
	thisPageReady=true;
	start();
});

function mapReadyFunc(){
	mapReady=true;
	start();
}
function start(){
	if(mapReady&&thisPageReady){
		new GROUPCUSTOMER.Screen();
	}
	
}
setInterval(refreshTime,1000);
function refreshTime(){
	var date=new Date();
	var space='        ';
	var showTime=date.Format('yyyy-MM-dd'+space+'hh:mm:ss');
	var weekday=new Array(7);
	weekday[0]="星期日";
	weekday[1]="星期一";
	weekday[2]="星期二";
	weekday[3]="星期三";
	weekday[4]="星期四";
	weekday[5]="星期五";
	weekday[6]="星期六";
	showTime+=space+weekday[date.getDay()];
	$('#screenTitleTime').text(showTime);
};
</script>
</html>