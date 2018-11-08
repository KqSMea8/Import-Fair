<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>图片排序</title>
<%@ include file="/common/lib.jsp"%>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/consts.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/utils.js"></script>
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/assets/controller/fileOrder.css" />

<style>
* {margin:0; padding:0;list-style: none}

.fileContainer {width:760px; position:relative; margin:10px auto;}
.fileContainer li {width:200px; height:150px; float:left; list-style:none; margin:10px;padding:10px;}
.fileContainer li:hover{ border-color: #9a9fa4; box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.85);}
.fileContainer .active{ border:1px dashed red;}

.deleteIcon{
	cursor:pointer;
	width:16px;
	height:16px;
	background: url(images/delete1.png);
	background-size:100% 100%;
	-moz-background-size:100% 100%; /* 老版本的 Firefox */
	background-repeat:no-repeat;
	position:absolute;
	right:5px;
	bottom:5px;
}



</style>
</head>
<body>
<form id="fileUploader" action="" method="post" target="fakeFrame" enctype="multipart/form-data">
    <input type="file" name="file" id="file" multiple="multiple" style="color:#ffffff"/>
    <input onclick="subimtBtn();" type="button"  value="上传" style="height:20px;width:60px;"/>
    <span style="display:inline-block;width:100px;"></span>
    <input onclick="saveOrder();" type="button"  value="保存排序"  style="height:20px;width:80px;"/>
</form>
<ul id="ul1" class="fileContainer">
	
</ul>
<div id="mask" style="width:100%;height:100%;position:absolute;display:block;">
	<img src="images/uploading.gif" style="z-index:999999;position:absolute;top:50%;margin-top:-7px;left:50%;margin-left:-95px;"></img>
</div>
<iframe id="fakeFrame" name="fakeFrame" style="display:none;"></iframe>
</body>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/fileOrder.js"></script>
</html>