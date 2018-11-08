<!DOCTYPE html>
<html lang="zh-CN">
<head>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<meta charset="UTF-8" http-equiv="X-UA-Compatible" content="IE=Edge">
<meta content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport"/>
<%@ include file="/common/lib.jsp"%>
<%@ include file="/common/bootstrap.jsp"%>
<link type="text/css" rel="stylesheet" href="${ctx}/scripts/local-lsm/common/slide/css/reset.css" />
<link type="text/css" rel="stylesheet" href="${ctx}/scripts/local-lsm/common/slide/css/style.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/componentsStyle.css" />
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/slide/jquery_slide.js"></script>
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/assets/controller/controller.css" />
<title>控制器</title>
</head>
<body > 
	<div class="main_menu main">
		<div class="container_image MainMenu">
			<div name="screen_1" class="screen_1" ></div>
			<div name="screen_2" class="screen_2" ></div>
			<div name="screen_3" class="screen_3" ></div>
<!-- 			<a href="javascript:void(0)" tip="0" class="i_btn prev_L"></a> -->
<!-- 			<a href="javascript:void(0)" tip="1" class="i_btn next_R"></a> -->
<!-- 			<ul class="slide_img"> -->
<!-- 				<li name="screen_1"> -->
<%-- 					<a href="javascript:void(0);"><img  src="${ctx}/static/styles/local-lsm/assets/controller/L_03.png" /></a> --%>
<!-- 					<div class="bg"></div> -->
<!-- 				</li> -->
<!-- 				<li class="on" name="screen_2"> -->
<%-- 					<a href="javascript:void(0)"><img  src="${ctx}/static/styles/local-lsm/assets/controller/C_03.png" /></a> --%>
<!-- 					<div class="bg"></div> -->
<!-- 				</li> -->
<!-- 				<li name="screen_3"> -->
<%-- 					<a href="javascript:void(0)"><img  src="${ctx}/static/styles/local-lsm/assets/controller/R_03.png" /></a> --%>
<!-- 					<div class="bg"></div> -->
<!-- 				</li> -->
<!-- 			</ul> -->
		</div>
	</div>
	<div class="ctrl_screen1 main">
		<table class="screen1TableLayout" style="width:100%;height:100%;">
			<tr style="width:100%;height:100%;">
				<td style="width:30px;height:100%;">
					<div class="screen1Ctrl">
						<div class="screen1Return"></div>
					</div>
				</td>
				<td style="width:150px;height:100%;">
					<div class="screen1Left">
						<ul id="screen1_regionkpi" class="nav navbar-nav screen1_regionkpi"></ul>
					</div>
				</td>
				<td style="height:100%;">
					<div class="screen1Right">
						<div id="screen1_tabsub" >
							<div id="screen1_tab" >
								<ul class="nav navbar-nav">
							         <li class="dropdown">
							            <a href="#" class="tabli s1navtop">网元告警</a>
							         </li>
							          <li class="dropdown">
							            <a href="#" class="tabli s1navtop">性能告警</a>
							         </li>
							          <li class="dropdown">
							            <a href="#" class="tabli s1navtop">用户投诉</a>
							         </li>
							      </ul>
							</div>
							<div id="screen1_sub" >
								<div class="sceneImgs">
									<div class="scene0 scene1"><span class="scenemask"></span><span class="sceneText">加勒比海盗</span><div class="subhot">子热点</div><div class="subcell">小区</div></div>
									<div class="scene0 scene2"><span class="scenemask"></span><span class="sceneText">古迹探索营</span><div class="subhot">子热点</div><div class="subcell">小区</div></div>
									<div class="scene0 scene3"><span class="scenemask"></span><span class="sceneText">旋转木马</span><div class="subhot">子热点</div><div class="subcell">小区</div></div>
									<div class="scene0 scene4"><span class="scenemask"></span><span class="sceneText">停车场</span><div class="subhot">子热点</div><div class="subcell">小区</div></div>
									<div class="scene0 scene5"><span class="scenemask"></span><span class="sceneText">大门口</span><div class="subhot">子热点</div><div class="subcell">小区</div></div>
								</div>
								<div class="chartDiv"></div>
							</div>
						</div>
					</div>
				</td>
			</tr>
		</table>
	</div>
	<div class="ctrl_screen2 main">
		<table class="screen2TableLayout" style="width:100%;height:100%;">
				<tr style="width:100%;height:100%;">
					<td style="width:150px;height:100%;">
						<div class="screen2Left">
							<ul class="nav navbar-nav">
					         <li class="dropdown">
					            <a href="#" class="tabli s1navtop">中国博览会</a>
					         </li>
					          <li class="dropdown">
					            <a href="#" class="tabli s1navtop">虹桥枢纽</a>
					         </li>
					          <li class="dropdown">
					            <a href="#" class="tabli s1navtop">虹口足球场</a>
					         </li>
					         <li class="dropdown">
					            <a href="#" class="tabli s1navtop">上海南站</a>
					         </li>
					         <li class="dropdown">
					            <a href="#" class="tabli s1navtop">大宁商圈</a>
					         </li>
					         <li class="dropdown">
					            <a href="#" class="tabli s1navtop">交通枢纽</a>
					         </li>
					         <li class="dropdown">
					            <a href="#" class="tabli s1navtop">寺庙</a>
					         </li>
					         <li class="dropdown">
					            <a href="#" class="tabli s1navtop">商业场所</a>
					         </li>
					         <li class="dropdown">
					            <a href="#" class="tabli s1navtop">游玩场所</a>
					         </li>
					         <li class="dropdown">
					            <a href="#" class="tabli s1navtop">收费站</a>
					         </li>
					      	</ul>
						</div>
					</td>
					<td style="height:100%;">
						<div class="screen2Right">
							<div class="screen2Btn_2" >
								<ul class="nav navbar-nav">
							         <li class="dropdown">
							            <a href="#" class="tabli s1navtop">卫星</a>
							         </li>
							          <li class="dropdown">
							            <a href="#" class="tabli s1navtop">地图</a>
							         </li>
							          <li class="dropdown">
							            <a href="#" class="tabli s1navtop aNavSelected">迪斯尼</a>
							         </li>
							         <li class="dropdown">
							            <a href="#" class="tabli s1navtop">文件管理</a>
							         </li>
							      </ul>
							</div>
							<iframe id="map" class="screen2MapFrame" frameborder="no" src="" ></iframe>
						</div>
					</td>
				</tr>
			</table>
	</div>
	<div class="ctrl_screen3 main">
		<div id="screen3Menu" class="container_image">
			<div name="0" class="chart1" ></div>
			<div name="1" class="chart2" ></div>
			<div name="2" class="chart3" ></div>
			<div name="3" class="chart4" ></div>
<!-- 			<a href="javascript:void(0)" tip="0" class="i_btn prev_L"></a> -->
<!-- 			<a href="javascript:void(0)" tip="1" class="i_btn next_R"></a> -->
<!-- 			<ul class="slide_img"> -->
<!-- 				<li class="on"> -->
<%-- 					<a href="javascript:void(0);"><img  src="${ctx}/static/styles/local-lsm/assets/controller/t1.png" /></a> --%>
<!-- 					<div class="bg"></div> -->
<!-- 				</li> -->
<!-- 				<li> -->
<%-- 					<a href="javascript:void(0)"><img  src="${ctx}/static/styles/local-lsm/assets/controller/t2.png" /></a> --%>
<!-- 					<div class="bg"></div> -->
<!-- 				</li> -->
<!-- 				<li> -->
<%-- 					<a href="javascript:void(0)"><img  src="${ctx}/static/styles/local-lsm/assets/controller/chartChina.png" /></a> --%>
<!-- 					<div class="bg"></div> -->
<!-- 				</li> -->
<!-- 				<li> -->
<%-- 					<a href="javascript:void(0)"><img  src="${ctx}/static/styles/local-lsm/assets/controller/chartWorld.png" /></a> --%>
<!-- 					<div class="bg"></div> -->
<!-- 				</li> -->
<!-- 			</ul> -->
		</div>
<!-- 		<div class="screen3MenuIcon"> -->
<!-- 			<div name="0" class="roundIcon roundIconSelected"></div> -->
<!-- 			<div name="1" class="roundIcon"></div> -->
<!-- 			<div name="2" class="roundIcon"></div> -->
<!-- 			<div name="3" class="roundIcon"></div> -->
<!-- 		</div> -->

		<div class="screen3Btn">
			<ul class="nav navbar-nav">
		         <li class="dropdown">
		            <a href="#" class="tabli s1navtop aNavSelected">用户</a>
		         </li>
		          <li class="dropdown">
		            <a href="#" class="tabli s1navtop">业务</a>
		         </li>
		          <li class="dropdown">
		            <a href="#" class="tabli s1navtop">客流</a>
		         </li>
		         <li class="dropdown">
		            <a href="#" class="tabli s1navtop">园区</a>
		         </li>
		      </ul>
		</div>
	</div>
	<div class="returnBtn">返回首页</div>
	<div id="ctrlStatusImg" class="statusBtn ctrlStatusOff"></div>
	<span class="reconnectText" onclick="window.location.reload();">重连</span>
	
</body>
<%@ include file="/pages/local-lsm/common/screenbaseinclude.jsp"%>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/ctrl.js"></script>
<script>

$("#map").height($(document).height()-$(".screen2Btn_2").height()-10);
var ctrl;
(function(){
	SUtils.initScene(function(){
		ctrl=new ScreenController.WsConnection(ScreenController.ROLE_CONTROLLER);
		ctrl.initController();
	});
}());


function reorderFiles(){
	ctrl.reorderFiles();
}
</script>
</html>