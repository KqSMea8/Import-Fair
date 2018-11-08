<!DOCTYPE html>
<%
String room = request.getParameter("room");//==null?"":new String(request.getParameter("hotspot").getBytes("ISO8859-1"), "utf-8");
String width = request.getParameter("width");
String height = request.getParameter("height");//==null?"":new String(request.getParameter("cellname").getBytes("ISO8859-1"), "utf-8");
String isMulti = request.getParameter("isMulti");

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
<link rel="stylesheet" href="${jslib}/jquery-1.7.2/external/jqgrid/css/ui.jqgrid.css" />
<link rel="stylesheet" href="${jslib}/jquery-1.7.2/external/jqgrid/themes/redmond/jquery-ui-1.9.2.custom.min.css" />

<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciie/ciie.css" />

<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciienew/ciie.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/mapnew.css" />
<!-- 自己的 css -->
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/deviceDetailNew.css" />


<title>中国国际进口博览会</title>
<style type="text/css">
	
</style>
</head>
<body style="width:100%;height:100%;background:rgba(0,0,0,0);overflow:hidden;"> 
	<div id="frameDiv" style="width:100%;height:100%;"></div>
</body>

<script>
var BASEPATH="${ctx}";
var JSLIB="${jslib}";

var room="<%=room%>";
var width="<%=width%>";
var height="<%=height%>";
var isMulti="<%=isMulti%>";


function return3D(){
	parent.closeRoomDetail();
}
$(function(){
	 var html='<div id="roomVideo" class="liveVideo_big" style="display:block;left:0 !important;top:0 !important;width:100%;height:100%;">'
         +'<img style="position:absolute;width:100%;height:100%;pointer-events: none;" src="'+BASEPATH+'/static/styles/local-lsm/map/videoBackFrame.png">'
         +'<div id="roomVideoTitleBar" class="liveVideoTitleBar_big">'
             +'<div id="videoTitle" class="videoTitle_big"></div>'
             +'<div style="float: left;"><span id="roomVideoTitleSpan" class="videoTitleSpan_big">机房视频</span></div>'
             +'<div id="roomVideo_winclose" class="liveVideo_winclose_big"></div>'
         +'</div>'
         +'<div  class="chenggaodu_big">'
         +'</div>'
         +'<div class="videoContent_big" style="padding:0px 25px 10px 25px;">'
             +'<iframe id="roomVideoIframe" src="'+url+'" frameborder="0" style="width:100%;height:100%"></iframe>'
         +'</div>'
     +'</div>';
    var url='../videoOfMachineRoom/videoOfMachineRoom5.jsp?isScreenMode=true&roomName='+room+'&videoWidth='+width+'&singleDivHeight=440';
    var width=$('body').width();
    var height=$('body').height();
    
		$('#frameDiv').html(html);
		$('#roomVideoIframe').width(width-50);
		$('#roomVideoIframe').height(height-160);
		$('#roomVideoIframe').attr('src',url);
		$('#roomVideo_winclose').on('click',return3D);
	
});

</script>


</html>