<!DOCTYPE html>
<html lang="zh-CN">
<head>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<meta charset="UTF-8" http-equiv="X-UA-Compatible" content="IE=Edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<%@ include file="/common/lib.jsp"%>
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/Urbanstyle.css" />
<%@ include file="/common/bootstrap.jsp"%>
<title>城市道路保障支撑</title>

<script>
 
  var eastcom_URL =  eastcom.baseURL.substring(0,eastcom.baseURL.lastIndexOf("/"));
  $(document).ready(function(){
	  		$("#frame2").height($(document).height()-100);
	  		$("#frame2").width($(document).width()-120);
         $("#frame2").attr('src', eastcom_URL+'/sh/shUltimate/roadGuardBig.html');
  });
    
</script>
</head>
<body> 
 <div class="UrbanRd_centre">
       <div class="U_C1">
           <li class="UC1_title">城市道路保障支撑</li>
           <span class="UC1_time"><span>
       </div>
        <iframe id="frame2" style="width:100%;height:100%;left:50px;bottom:0px;border:none;position:absolute;" frameborder="no" ></iframe>
	</div>
</body>
