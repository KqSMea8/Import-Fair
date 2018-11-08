<%@ page language="java" contentType="text/html;charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<%@ include file="/common/lib.jsp"%>
<c:set var="hotspot" value="common" />
<!-- echarts -->
<%@ include file="/common/echarts.jsp"%>
<%@ include file="/common/fontawesome/fontawesome4.3.0.jsp"%>
<%@ include file="/common/bootstrap.jsp"%>
<script type="text/javascript"
	src="${ctx}/scripts/local-lsm/common/My97DatePicker/WdatePicker.js"></script>
<link rel="stylesheet"
	href="${ctx}/static/jslib/My97DatePicker/WdatePicker.css" />
<link rel="stylesheet"
	href="${jslib}/jquery-1.7.2/external/jqgrid/css/ui.jqgrid.css" />
<link rel="stylesheet"
	href="${jslib}/jquery-1.7.2/external/jqgrid/themes/redmond/jquery-ui-1.9.2.custom.min.css" />
<link rel="stylesheet"
	href="${ctx}/static/styles/local-lsm/roam/roam.css" />
<link rel="stylesheet"
	href="${ctx}/static/styles/local-lsm/overviewleft/communityManage.css" />
<head>
    <!--自己的js-->
	<script type="text/javascript">
        $(document).ready(function () {
        	var ptnSecondGobel={};
        });
    </script>
    <style type="text/css">
		html,body{
			margin: 0;
			padding: 0;
			position: relative;
			width: 4400px;height: 1200px;
		}
		/*iframe{
			border-style: none;
		}*/
    </style>
</head>
<body style="">
	<div style="width: 100%;height: 1070px;position: relative;top: 130px;z-index: 1;">
		<iframe class="iframeDiv" src="${ctx}/pages/local-lsm/PTNSCR/ptnFirstPart.jsp" frameborder="0" style="width: 778px;height: 100%;"></iframe>
		<iframe class="iframeDiv" src="${ctx}/pages/local-lsm/PTNSCR/ptnSencondPart.jsp" frameborder="0" style="width: 1558px;height: 100%;"></iframe>
		<iframe class="iframeDiv" src="${ctx}/pages/local-lsm/PTNSCR/mapIndex.jsp" frameborder="0" style="width: 2050px;height: 100%;"></iframe>
	</div>
	<div class="" style="background: url(${ctx}/static/images/PTNSCR/bg.png);position: absolute;top: 0;width: 100%;height: 100%;">
		
	</div>
</body>
</html>