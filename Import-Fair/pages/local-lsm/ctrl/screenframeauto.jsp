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
	.icon-play{
		width:60px;
		height:60px;
		background:url(play.png) center 0px no-repeat;
		background-size:100% 100%;
	}
	.icon-pause{
		width:60px;
		height:60px;
		background:url(pause.png) center 0px no-repeat;
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
	<div id="mask" style="position:absolute;top:0;left:0;width:100%;height:100%;"></div>
	<div id="playCtrl" class="" style="cursor:pointer;position:absolute;top:30px;left:20px;"></div>
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
var INTERVAL_KEY=0;

var list=['场景保障-场景GIS','保障概览-场景概览','场景保障-场景导航','漫游保障-漫游概览','专线保障-政企客户'];//,'3D-ONLY'
var index=0;
var navi=null;
$(function(){
	$('#SCREENFRAME').width($('body').width()+20);
	$('#SCREENFRAME').height($('body').height()+20);
	navi=new CIIENEW.NavigatorSingle(authItem);
	$(navi.bubble).show();
	navi.showItem(list[index]);
	//$('#SCREENFRAME').attr('src','../ciienew/ciie3Donly.jsp')
	$(navi.bubble).on('click',stopLoop);
	$('#mask').on('click',stopLoop);
	$('#playCtrl').on('click',ctrlClick);
	startLoop();
});
function loopShow(){
	index++;
	index=index%list.length;
	if(list[index]=='3D-ONLY'){
		$('#SCREENFRAME').attr('src','../ciienew/ciie3Donly.jsp')
	}else{
		navi.showItem(list[index]);
	}
	
}
function ctrlClick(){
	var cls=$('#playCtrl').attr('class');
	if(cls=='icon-play'){
		startLoop();
	}else if(cls=='icon-pause'){
		stopLoop();
	}
}
function stopLoop(){
	$('#mask').hide();
	$('#playCtrl').attr('class','icon-play');
	clearInterval(INTERVAL_KEY);
}
function startLoop(){
	$('#mask').show();
	$('#playCtrl').attr('class','icon-pause');
	clearInterval(INTERVAL_KEY);
	INTERVAL_KEY=setInterval(loopShow,45*1000);
}

function showWin(title,width,htmlStr){
	width=Math.min($('body').width(),width);
	$('#modalWin-win').width(width);
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