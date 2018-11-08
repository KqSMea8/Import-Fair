<!DOCTYPE html>
<html lang="zh-CN" style="width:100%;height:100%;background:rgba(0,0,0,0);">
<head>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%
	String authItem = request.getParameter("authItem");
%>
<meta charset="UTF-8" http-equiv="X-UA-Compatible" content="IE=Edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<%@ include file="/common/lib.jsp"%>
<c:set var="hotspot" value="common" />
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/My97DatePicker/WdatePicker.js"></script>
<link rel="stylesheet" href="${ctx}/static/jslib/My97DatePicker/WdatePicker.css" />
<%@ include file="/common/bootstrap.jsp"%> 
<link rel="stylesheet" href="${jslib}/jquery-1.7.2/external/jqgrid/css/ui.jqgrid.css" />
<link rel="stylesheet" href="${jslib}/jquery-1.7.2/external/jqgrid/themes/redmond/jquery-ui-1.9.2.custom.min.css" />

<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciie/ciie.css" />

<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciienew/ciie.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciie/ciie.css" />

<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciienew/ciie.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciienew/navi.css" />


<title>中国国际进口博览会</title>
<style type="text/css">
	html{
		width:100%;
		height:100%;
		padding:0;
		margin:0;
		overflow:hidden;
	}
	body{
		width:100%;
		height:100%;
		padding:0;
		margin:0;
		overflow:hidden;
	}
	.frameBG{
		width:100%;
		height:100%;
		background:url(../../../static/styles/local-lsm/ciienew/images/bgL.jpg) center 0px no-repeat;
		background-size:100% 100%;
	}
	.modal-close{
		background-image: url(../../../static/styles/local-lsm/map/close.png);
		background-size:100% 100%;
	    width: 48px;
	    height: 48px;
	    cursor:pointer;
	}
</style>
</head>
<body class="frameBG"  style="overflow:hidden;"> 
	<iframe allowtransparency="true" frameborder="0" id="SCREENFRAME" style="background:rgba(0,0,0,0);"></iframe>
	<div class="modal fade" id="modalWin" style="position:absolute;">
		<div class="modal-dialog" id="modalWin-win" style="width: 1600px; height: 900px; margin: 20px auto;">
			<div class="modal-content">
				<div id="modalWin-title" class="modal-header" style="font-size:40px;text-align: left;"></div>
				<div id="modalWin-body" class="modal-body" >
				</div>
				<div onclick="closeModal();" style="position:absolute;top:20px;right:10px;" class="modal-close"></div>
			</div>
		</div>
	</div>
</body>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/navigator.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/navigatorSingle.js"></script>

<script>
var BASEPATH="${ctx}";
var JSLIB="${jslib}";
var comp=null;
var authItem="<%=authItem%>";
$(function(){
	var targetType=$.cookie('targetType');
	var navi=null;
	$('#SCREENFRAME').width($('body').width()+20);
	$('#SCREENFRAME').height($('body').height()+20);
	if(targetType=='大屏版'){
		navi=new CIIENEW.Navigator(authItem);
	}else{
		navi=new CIIENEW.NavigatorSingle(authItem);
	}
	$(navi.bubble).show();
	navi.showItem(authItem);
	
	
});

function showWin(title,width,height,htmlStr){
	width=Math.min($('body').width(),width);
	height=Math.min($('body').height(),height);
	$('#modalWin-win').width(width);
	$('#modalWin-win').height(height);
	$('#modalWin-title').text(title);
	$('#modalWin-body').html('');
	$('#modalWin').modal('show');
	$('#modalWin-body').html(htmlStr);
}
function closeModal(){
	$('#modalWin').modal('hide');
}
</script>


</html>