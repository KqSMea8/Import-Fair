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

<title>Urban Rd_left</title>
<!-- 需要内网使用百度api -->
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/baiduapi/baiduApiScript.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/baiduapi/codemirror.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/baiduapi/javascript.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/baiduapi/BMap.js"></script>
<!-- 公共工具及大屏数据请求接口类 -->
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/consts.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/utils.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/screenDataManager.js"></script>


<script type="text/javascript" src="${ctx}/scripts/local-lsm/Urban_Rd_left.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/Urban_Rd_chart.js"></script>
<script>
 
  var eastcom_URL =  eastcom.baseURL.substring(0,eastcom.baseURL.lastIndexOf("/"));
    $(document).ready(function(){
          $("#frameleft").attr('src', eastcom_URL+'/sh/shUltimate/topDis.html');
          //$("#frameleft").attr('src', 'http://10.221.247.7:8080/sh/shUltimate/topDis.html');
           Urban_Rd_left.init();
           setInterval("Urban_Rd_left.init()",5*60*1000);
           
           
           new UrbanRoad.ChinaChart($("#chinaChart")[0],$("#chinaRankTable")[0]);
           new UrbanRoad.WorldChart($("#worldChart")[0],$("#worldRankTable")[0]);
    });
</script>

</head>
<body> 

<div class="UrbanRd_L">
    <!--LEFT开始-->
    <div class="UrbanRd_left"> 
        <div class="U_L1"><h2>漫游来访用户</h2></div>
        <div class="U_L2">
            <div class="U_L2_content">
            <div class="left_map1">
                <div class="map1">
                	<div id="chinaChart"></div>
                    <div id="chinaRankTable" class="Lmap_content">
                        <div class="content_Ranking">
                        <table  width="100%" border="0">
                          <tr>
                            <td class="t1">江苏</td>
                            <td class="t2">
                                <div class="t2_content">
                                  <div class="t2_box1"></div>
                                  <div class="t2_txt">275.56<span>&nbsp;万</span></div>
                                </div>
                            </td>
                            <td class="t3"><div class="t2_txt">32.37<span>&nbsp;%</span></div></td>
                          </tr>
                          <tr>
                            <td class="t1">浙江</td>
                            <td class="t2">
                                <div class="t2_content">
                                  <div class="t3_box1"></div>
                                  <div class="t2_txt">270.36<span>&nbsp;万</span></div>
                                </div>
                            </td>
                            <td class="t3"><div class="t2_txt">31.76<span>&nbsp;%</span></div></td>
                          </tr>
                          <tr>
                            <td class="t1">上海</td>
                            <td class="t2">
                                <div class="t2_content">
                                  <div class="t4_box1"></div>
                                  <div class="t2_txt">176.64<span>&nbsp;万</span></div>
                                </div>
                            </td>
                            <td class="t3"><div class="t2_txt">20.75<span>&nbsp;%</span></div></td>
                          </tr>
                          <tr>
                            <td class="t1">广东</td>
                            <td class="t2">
                                <div class="t2_content">
                                  <div class="t5_box1"></div>
                                  <div class="t2_txt">53.08<span>&nbsp;万</span></div>
                                </div>
                            </td>
                            <td class="t3"><div class="t2_txt">6.23<span>&nbsp;%</span></div></td>
                          </tr>
                          <tr>
                            <td class="t1">北京</td>
                            <td class="t2">
                                <div class="t2_content">
                                  <div class="t6_box1"></div>
                                  <div class="t2_txt">44.82<span>&nbsp;万</span></div>
                                </div>
                            </td>
                            <td class="t3"><div class="t2_txt">5.26<span>&nbsp;%</span></div></td>
                          </tr>
                          <tr>
                            <td class="t1">河南</td>
                            <td class="t2">
                                <div class="t2_content">
                                  <div class="t7_box1"></div>
                                  <div class="t2_txt">34.57<span>&nbsp;万</span></div>
                                </div>
                            </td>
                            <td class="t3"><div class="t2_txt">4.06<span>&nbsp;%</span></div></td>
                          </tr>
                          <tr>
                            <td class="t1">山东</td>
                            <td class="t2">
                                <div class="t2_content">
                                  <div class="t8_box1"></div>
                                  <div class="t2_txt">20.16<span>&nbsp;万</span></div>
                                </div>
                            </td>
                            <td class="t3"><div class="t2_txt">2.37<span>&nbsp;%</span></div></td>
                          </tr>
                          <tr>
                            <td class="t1">福建</td>
                            <td class="t2">
                                <div class="t2_content">
                                  <div class="t9_box1"></div>
                                  <div class="t2_txt">2.37<span>&nbsp;万</span></div>
                                </div>
                            </td>
                            <td class="t3"><div class="t2_txt">2.10<span>&nbsp;%</span></div></td>
                          </tr>
                        </table>
                        </div>
                        <div class="content_title">
                            <h>省际漫入</h>
                            <h3>300<span>&nbsp;万</span></h3>
                            <h3>15<span>&nbsp;%</span></h3>
                        </div>
                  </div>
                </div>
            </div>
            <div class="left_map2">
                <div class="map2">
                	<div id="worldChart"></div>
                    <div id="worldRankTable" class="Lmap_content">
                        <div class="content_Ranking">
                        <table width="100%" border="0">
                          <tr>
                            <td class="t1">江苏</td>
                            <td class="t2">
                                <div class="t2_content">
                                  <div class="t2_box1"></div>
                                  <div class="t2_txt">275.56<span>&nbsp;万</span></div>
                                </div>
                            </td>
                            <td class="t3"><div class="t2_txt">32.37<span>&nbsp;%</span></div></td>
                          </tr>
                          <tr>
                            <td class="t1">浙江</td>
                            <td class="t2">
                                <div class="t2_content">
                                  <div class="t3_box1"></div>
                                  <div class="t2_txt">270.36<span>&nbsp;万</span></div>
                                </div>
                            </td>
                            <td class="t3"><div class="t2_txt">31.76<span>&nbsp;%</span></div></td>
                          </tr>
                          <tr>
                            <td class="t1">上海</td>
                            <td class="t2">
                                <div class="t2_content">
                                  <div class="t4_box1"></div>
                                  <div class="t2_txt">176.64<span>&nbsp;万</span></div>
                                </div>
                            </td>
                            <td class="t3"><div class="t2_txt">20.75<span>&nbsp;%</span></div></td>
                          </tr>
                          <tr>
                            <td class="t1">广东</td>
                            <td class="t2">
                                <div class="t2_content">
                                  <div class="t5_box1"></div>
                                  <div class="t2_txt">53.08<span>&nbsp;万</span></div>
                                </div>
                            </td>
                            <td class="t3"><div class="t2_txt">6.23<span>&nbsp;%</span></div></td>
                          </tr>
                          <tr>
                            <td class="t1">北京</td>
                            <td class="t2">
                                <div class="t2_content">
                                  <div class="t6_box1"></div>
                                  <div class="t2_txt">44.82<span>&nbsp;万</span></div>
                                </div>
                            </td>
                            <td class="t3"><div class="t2_txt">5.26<span>&nbsp;%</span></div></td>
                          </tr>
                          <tr>
                            <td class="t1">河南</td>
                            <td class="t2">
                                <div class="t2_content">
                                  <div class="t7_box1"></div>
                                  <div class="t2_txt">34.57<span>&nbsp;万</span></div>
                                </div>
                            </td>
                            <td class="t3"><div class="t2_txt">4.06<span>&nbsp;%</span></div></td>
                          </tr>
                          <tr>
                            <td class="t1">山东</td>
                            <td class="t2">
                                <div class="t2_content">
                                  <div class="t8_box1"></div>
                                  <div class="t2_txt">20.16<span>&nbsp;万</span></div>
                                </div>
                            </td>
                            <td class="t3"><div class="t2_txt">2.37<span>&nbsp;%</span></div></td>
                          </tr>
                          <tr>
                            <td class="t1">福建</td>
                            <td class="t2">
                                <div class="t2_content">
                                  <div class="t9_box1"></div>
                                  <div class="t2_txt">2.37<span>&nbsp;万</span></div>
                                </div>
                            </td>
                            <td class="t3"><div class="t2_txt">2.10<span>&nbsp;%</span></div></td>
                          </tr>
                        </table>
                        </div>
                        <div class="content_title">
                            <h>国际漫入</h>
                            <h3>10<span>&nbsp;万</span></h3>
                            <h3>0.1<span>&nbsp;%</span></h3>
                        </div>
                  </div>
                </div>            
            </div>
            </div>
        </div>
        <div class="U_L3">
            <div class="UL3_title" ><h2>TOP1000小区</h2></div>
            <div class="UL3_content">
                <div class="left_map3" style="position:relative;">
                    <iframe id="frameleft" style="width:100%;height:100%;left:0px;border:none;" frameborder="no" ></iframe>
                    <select id="cityCombo" style="width:70px;position:absolute;top:10px;right:170px;color:#000000;" onchange="cityChange();">
                    	<option value="">全市</option>
                    	<option value="闵行分公司">闵行</option>
                    	<option value="崇明分公司">崇明</option>
                    	<option value="奉贤分公司">奉贤</option>
                    	<option value="青浦分公司">青浦</option>
                    	<option value="宝山分公司">宝山</option>
                    	<option value="南区分公司">南区</option>
                    	<option value="松江分公司">松江</option>
                    	<option value="嘉定分公司">嘉定</option>
                    	<option value="西区分公司">西区</option>
                    	<option value="金山分公司">金山</option>
                    	<option value="浦东分公司">浦东</option>
                    	<option value="北区分公司">北区</option>
                    </select>
                </div>
                <div class="left_table">
                    <div class="L1table">
                    <div id="table">
                    <ul>
                        <!-- <li>
                            <div class="l1 list1 list1_border">排名</div>
                            <div class="r1 list1 list1_border">小区名</div>
                            <div class="l2 list1 list1_border">4G流量(MB)</div>
                            <div class="r2 list1 list1_border">下载速率(Mbps)</div>
                            <div class="l3 list1 list1_border">RRC连接</div>
                            <div class="r3 list1"></div>
                        </li> -->
                         <div  style="overflow: auto;height: 500px;width: 100%;">

                               <div id="table_div_li" style="width: 1100px">
                                   
                               </div>
                        </div>

                    </ul>
                    
                    </div>
                    </div>
                </div>
            </div>
        </div>
       
    </div>
    <!--LEFT结束-->
</div>
<script type="text/javascript">
	function cityChange(){
		var selectedCity=$("#cityCombo").val();
		Urban_Rd_left.initTableData(selectedCity);
	}
</script>
</body>
