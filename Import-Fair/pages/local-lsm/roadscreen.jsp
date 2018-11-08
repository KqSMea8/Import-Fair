<!DOCTYPE html>
<html lang="zh-CN" >
<head>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<meta charset="UTF-8" http-equiv="X-UA-Compatible" content="IE=Edge">
<title>城市道路大屏</title>
</head>
<body style="width:6400px;height:1200px;padding:0px 0px 0px 0px;margin:0px 0px 0px 0px;">
<table style ="width:100%;height:100%;" cellpadding="0" cellspacing="0">
	<tr>
		<td style="width:25%;height:100%;">
			<iframe id="frame1" style="width:100%;height:100%;left:0px;border:none;" frameborder="no" src="Urban_Rd_left.jsp" ></iframe>
		</td>    

		<!-- <td style="width:50%;height:100%;">
			<iframe id="frame2" style="width:100%;height:100%;left:0px;border:none;" frameborder="no" src="Urban_Rd_centre.jsp" ></iframe>
		</td> -->
		<td style="width:50%;height:100%;">
			<iframe id="frame2" style="width:100%;height:100%;left:0px;border:none;" scrolling="no" frameborder="no" src="Urban_Rd_centre.jsp" ></iframe>
		</td>
		<td style="width:25%;height:100%;">
			<iframe id="frame3" style="width:100%;height:100%;left:0px;border:none;" frameborder="no" src="Urban_Rd_right.jsp" ></iframe>
		</td>
	</tr>
</table>
</body>


<!-- <script type="text/javascript" src="${ctx}/scripts/local-lsm/common/consts.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/utils.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/ctrl.js"></script>
 -->

</html>