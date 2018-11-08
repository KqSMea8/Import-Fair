<!DOCTYPE html>
<html lang="zh-CN">
<head>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%
String isScreenMode = request.getParameter("isScreenMode");
String hotspotId = request.getParameter("hotspotId");
%>
<meta charset="UTF-8" http-equiv="X-UA-Compatible" content="IE=Edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<%@ include file="/common/lib.jsp"%>
<c:set var="hotspot" value="common" />
<link type="text/css" rel="stylesheet" href="${ctx}/scripts/local-lsm/common/slide/css/reset.css" />
<link type="text/css" rel="stylesheet" href="${ctx}/scripts/local-lsm/common/slide/css/style.css" />
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/slide/jquery_slide.js"></script>
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/componentsStyle.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/common/style.css" />
<%@ include file="/common/bootstrap.jsp"%>
<title>大屏监控</title>
</head>
<body> 
<div class="Disney_R">
    <!--RIGHT 开始--->
    <div class="disney_right">
  
    </div>
    <!--RIGHT 结束--->
    <div id="swfIframe"  style="width:1600px;height:1200px;position:absolute;top:0px;left:0px;background:transparent;">
    	<div class="disney3Top" style="background:none;position:relative;height:120px;">
    		<div class="picTitle" style="left:60px;"><img src="images/title_temp.png" /><span class="subtitle" id="rightTime" style="position:absolute;left:350px;float:none;"></span></div>
    	</div>
    	<div style="width:49%;height:520px;margin:5px;display:inline-block;background:url(images/p7.png);background-size:100% 100%;">
    	
    	</div>
    	<div style="width:49%;height:520px;margin:5px;display:inline-block;background:url(images/p8.png);background-size:100% 100%;">
    	
    	</div>
    	<div style="width:49%;height:520px;margin:5px;display:inline-block;background:url(images/p9.png);background-size:100% 100%;">
    	
    	</div>
    	<div style="width:49%;height:520px;margin:5px;display:inline-block;background:url(images/p10.png);background-size:100% 100%;">
    	
    	</div>
    </div>
    
</div>

</body>
<script>
</script>
</html>