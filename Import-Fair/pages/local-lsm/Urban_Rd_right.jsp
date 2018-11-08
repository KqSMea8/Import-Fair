<!DOCTYPE html>
<html lang="zh-CN">
<head>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<meta charset="UTF-8" http-equiv="X-UA-Compatible" content="IE=Edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<%@ include file="/common/lib.jsp"%>
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/Urbanstyle.css" />
<%@ include file="/common/bootstrap.jsp"%>
<%@ include file="/common/echarts.jsp"%>
<%@ include file="/pages/local-lsm/common/screenbaseinclude.jsp"%>
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/common/custom.css" />
<title>Urban Rd_right</title>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/Urban_Rd_right.js"></script>
<script>
var eastcom_URL =  eastcom.baseURL.substring(0,eastcom.baseURL.lastIndexOf("/"));
eastcom_URL="http://10.221.247.7:58080";
	$(document).ready(function(){
		SUtils.initCommonScene(function(){
			Urban_Rd_right.init();
			setInterval("Urban_Rd_right.refresh()",5*60*1000);
		});
	});
</script>
</head>
<body> 

<div class="UrbanRd_R">
    
    <div class="UrbanRd_right">
        <div class="U_R1">
	        <div id="mainHotspot" style="display: inline-block;cursor:pointer;">高架</div>
	        <span class="" id="timeShow" style="display:inline-block;width:200px;">--:--</span>
	        <div id="ctrlBtn" class="ctrlBtn play" style="vertical-align:bottom;"></div>
        </div>
        <div class="U_R2">
        	<div class="UR2_content">
                <div class="UR2C_top">
                	<div id="table_loadSpeed" class="UR2_select1 Rselect_bg" style="cursor: pointer;" onclick="Urban_Rd_right.tabChange(this.id,'loadSpeed')">下载速率</div>
                    <div id="table_user" class="UR2_select2" style="cursor: pointer;" onclick="Urban_Rd_right.tabChange(this.id,'user')">用户数</div>
                    <div id="table_lostRate" class="UR2_select3" style="cursor: pointer;" onclick="Urban_Rd_right.tabChange(this.id,'lostRate')">掉线率</div>
                </div>
                <div id="div_loadSpeed" class="UR2C_down">
                	<div class="UR2S_content1" id="loadSpeed_data">--<span>&nbsp;Kbps</span></div>
                    <div class="UR2S_content2" id="UR2S_content_div_loadSpeed">
                             <img src="${ctx}/static/styles/local-lsm/Urbn_images/R_chart.png" />
                    </div>
                    <div class="UR2S_content3">
                        <table width="100%" border="0">
                          <tr>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td class="tt1">内环：</td>
                            <td class="tt2">
                                <!-- <span class="tli1">&nbsp;</span> -->
                                <span class="tli2" id="loadSpeed_neihuan_data">--</span>
                               
                                <!-- <span class="tli3">&nbsp;</span> -->
                            </td>
                            <td class="tt2">南北：</td>
                            <td class="tt2">
                                <!-- <span class="tli1">&nbsp;</span> -->
                                <span class="tli2" id="loadSpeed_nanbei_data">--</span>
                               
                                <!-- <span class="tli3">&nbsp;</span> -->
                            </td>
                          </tr>
                          <tr>
                            <td class="tt1">环比：</td>
                            <td class="tt3">
                                <span id="loadSpeed_huanbi_f" style="display: none" class="tli1">+</span>
                                <span class="tli2" id="loadSpeed_huanbi_data">--</span>
                                <span class="tli3">%</span>
                            </td>
                            <td class="tt1">中环：</td>
                            <td class="tt2">
                               	<!-- <span class="tli1">&nbsp;</span> -->
                                <span class="tli2" id="loadSpeed_zhonghuan_data">--</span>
                               
                                <!-- <span class="tli3">&nbsp;</span> -->
                            </td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                          </tr>
                          <tr>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td class="tt1">外环：</td>
                            <td class="tt2">
                                <!-- <span class="tli1">&nbsp;</span> -->
                                <span class="tli2" id="loadSpeed_waihuan_data">--</span>
                               
                                <!-- <span class="tli3">&nbsp;</span> -->
                            </td>
                            <td class="tt2">延安路：</td>
                            <td class="tt2">
                                <!-- <span class="tli1">&nbsp;</span> -->
                                <span class="tli2" id="loadSpeed_yananlu_data">--</span>
                               
                                <!-- <span class="tli3">&nbsp;</span> -->
                            </td>
                          </tr>
                        </table>

                    </div>
                </div>
                <div id="div_user" class="UR2C_down" style="display: none;">
                	<div class="UR2S_content1" id="user_data">--<span>&nbsp;Kbps</span></div>
                    <div class="UR2S_content2" id="UR2S_content_div_user">
                             <img src="${ctx}/static/styles/local-lsm/Urbn_images/R_chart.png" />
                    </div>
                    <div class="UR2S_content3">
                        <table width="100%" border="0">
                          <tr>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td class="tt1">内环：</td>
                            <td class="tt2">
                                <!-- <span class="tli1">&nbsp;</span> -->
                                <span class="tli2" id="user_neihuan_data">--</span>
                                <!-- <span class="tli3">&nbsp;</span> -->
                            </td>
                            <td class="tt2">南北：</td>
                            <td class="tt2">
                                <!-- <span class="tli1">&nbsp;</span> -->
                                <span class="tli2" id="user_nanbei_data">--</span>
                                <!-- <span class="tli3">&nbsp;</span> -->
                            </td>
                          </tr>
                          <tr>
                            <td class="tt1">环比：</td>
                            <td class="tt3">
                                <span id="user_huanbi_f" style="display: none" class="tli1">+</span>
                                <span class="tli2" id="user_huanbi_data">--</span>
                                <span class="tli3">%</span>
                            </td>
                            <td class="tt1">中环：</td>
                            <td class="tt2">
                               	<!-- <span class="tli1">&nbsp;</span> -->
                                <span class="tli2" id="user_zhonghuan_data">--</span>
                                <!-- <span class="tli3">&nbsp;</span> -->
                            </td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                          </tr>
                          <tr>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td class="tt1">外环：</td>
                            <td class="tt2">
                                <!-- <span class="tli1">&nbsp;</span> -->
                                <span class="tli2" id="user_waihuan_data">--</span>
                                <!-- <span class="tli3">&nbsp;</span> -->
                            </td>
                            <td class="tt2">延安路：</td>
                            <td class="tt2">
                                <!-- <span class="tli1">&nbsp;</span> -->
                                <span class="tli2" id="user_yananlu_data">--</span>
                               
                                <!-- <span class="tli3">&nbsp;</span> -->
                            </td>
                          </tr>
                        </table>

                    </div>
                </div>
                <div id="div_lostRate" class="UR2C_down" style="display: none;">
                	<div class="UR2S_content1" id="lostRate_data">--<span>&nbsp;Kbps</span></div>
                    <div class="UR2S_content2" id="UR2S_content_div_lostRate">
                             <img src="${ctx}/static/styles/local-lsm/Urbn_images/R_chart.png" />
                    </div>
                    <div class="UR2S_content3">
                        <table width="100%" border="0">
                          <tr>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td class="tt1">内环：</td>
                            <td class="tt2">
                                <!-- <span class="tli1">&nbsp;</span> -->
                                <span class="tli2" id="lostRate_neihuan_data">--</span>
                                <!-- <span class="tli3">&nbsp;</span> -->
                            </td>
                            <td class="tt2">南北：</td>
                            <td class="tt2">
                                <!-- <span class="tli1">&nbsp;</span> -->
                                <span class="tli2" id="lostRate_nanbei_data">--</span>
                                <!-- <span class="tli3">&nbsp;</span> -->
                            </td>
                          </tr>
                          <tr>
                            <td class="tt1">环比：</td>
                            <td class="tt3">
                                <span id="lostRate_huanbi_f" style="display: none" class="tli1">+</span>
                                <span class="tli2" id="lostRate_huanbi_data">--</span>
                                <span class="tli3">%</span>
                            </td>
                            <td class="tt1">中环：</td>
                            <td class="tt2">
                               	<!-- <span class="tli1">&nbsp;</span> -->
                                <span class="tli2" id="lostRate_zhonghuan_data">--</span>
                                <!-- <span class="tli3">&nbsp;</span> -->
                            </td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                          </tr>
                          <tr>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td class="tt1">外环：</td>
                            <td class="tt2">
                                <!-- <span class="tli1">&nbsp;</span> -->
                                <span class="tli2" id="lostRate_waihuan_data">--</span>
                                <!-- <span class="tli3">&nbsp;</span> -->
                            </td>
                            <td class="tt2">延安路：</td>
                            <td class="tt2">
                                <!-- <span class="tli1">&nbsp;</span> -->
                                <span class="tli2" id="lostRate_yananlu_data">--</span>
                               
                                <!-- <span class="tli3">&nbsp;</span> -->
                            </td>
                          </tr>
                        </table>

                    </div>
                </div>
            </div>
        </div>
        <div class="U_R3">
        	<div class="UR3_content">
                <div class="UR3_title" ><h2>微区域TOP3</h2></div>
                <div class="UR3_down">
                    <div>
                    <div id="first_div_top" class="UR3_box1" style="cursor: pointer;" onclick="Urban_Rd_right.changeTable(this.id,'top_name_one')">
                         <div class="box_title" id="top_name_one"></div>
                         <div class="box_content" id="top_value_one">--<span>&nbsp;Mbps</span></div>
                    </div>
                    </div>
                    <div id="two_div_top" class="UR3_box1" style="cursor: pointer;" onclick="Urban_Rd_right.changeTable(this.id,'top_name_two')">
                         <div class="box_title" id="top_name_two"></div>
                         <div class="box_content" id="top_value_two">--<span>&nbsp;Mbps</span></div>
                    </div>
                    <div id="three_div_top" class="UR3_box1" style="cursor: pointer;" onclick="Urban_Rd_right.changeTable(this.id,'top_name_three')">
                         <div class="box_title" id="top_name_three"></div>
                         <div class="box_content" id="top_value_three">--<span>&nbsp;Mbps</span></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="U_R4">
        	<div class="UR3_title" ><h2>质差小区TOP5</h2></div>
            <div class="UR4_content">
             <div id="table">
                    <ul>
                        <li>
                            <div class="l4 list1 list1_border" style="width:20%">小区名</div>
                            <div class="l5 list1 list1_border" style="width:15%">总用户数(人)</div>
                            <div class="r4 list1 list1_border" style="width:15%">4G流量(MB)</div>
                            <div class="l5 list1 list1_border" style="width:20%">下载速率(Kbps)</div>
                            <div class="l5 list1 list1_border" style="width:15%">TCP掉线率(%)</div>
                            <div class="r5 list1 list1_border" style="width:15%">RRC连接成功率(%)</div>
                            <!-- <div class="l6 list1"></div> -->
                        </li>
                        <div id="table_div_li" style="overflow: auto;height: 400px; width: 100%;">
                        	
                        
                        
                        </div>
                        <li class="li_hight"></li>
                                                                         
                        </ul>
                        </div>
            </div>
        </div>
    </div>
    
</div>

</body>
