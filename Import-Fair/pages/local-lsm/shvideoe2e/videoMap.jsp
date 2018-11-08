<!DOCTYPE html>
<html lang="zh-CN">
<head>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%
String url = request.getParameter("url");
%>
<meta charset="UTF-8" http-equiv="X-UA-Compatible" content="IE=Edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>视频地图</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>

<body style="padding:0px;margin:0px;">
    <iframe frameborder="0" style="width:2100px;height:1200px;" src="<%=url %>"></iframe>
    <div style="width:2100px;text-shadow:#ffffff 1px 0 0,#ffffff 0 1px 0,#ffffff -1px 0 0,#ffffff 0 -1px 0; text-align:center;font-size:34px;position:absolute;top:0px;color:#7ad1fc;">MWC场景视频业务实时监测</div>
</body>
</html>
