<!DOCTYPE html>
<html lang="zh-CN" >
<head>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<meta charset="UTF-8" http-equiv="X-UA-Compatible" content="IE=Edge">
<%@ include file="/common/lib.jsp"%>
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/metro/metronewscreen.css" />
<title>地铁线路图</title>
</head>
<body style="width:2560px;height:1200px;overflow:hidden;">
	<iframe id="metroSwfFrame" class="metroFrame borderBox" frameborder="no" allowtransparency="true" style="width:2560px;height:1200px;" src="../metroswf/index.jsp?isScreenMode=true&width=2560&height=1200"></iframe>
</body>
<script>
window.onkeypress=parent.window.onkeypress;//选择页面快捷键
	function NS_SW_chooseLineBySwf(lineIndex){
		try{
			parent.NS_SW_chooseLineBySwf(lineIndex);
		}catch(e){
			console.log("metronewscreen.NS_SW_chooseLineBySwf failed");
		}
	}
	function timeLinePlayCallBack(time){
		try{
			parent.timeLinePlayCallBack(time);
		}catch(e){
			console.log("metro2->parent.timeLinePlayCallBack error");
		}
	}
</script>
</html>
	