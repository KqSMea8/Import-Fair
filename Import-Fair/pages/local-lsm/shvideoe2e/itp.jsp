<!DOCTYPE html>
<html lang="zh-CN">
<head>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%
//String minor = request.getParameter("minor")==null?"":new String(request.getParameter("minor").getBytes("ISO8859-1"), "utf-8");
String minor = request.getParameter("minor");
String majorName = request.getParameter("majorName")==null?"视频":request.getParameter("majorName");
%>
<meta charset="UTF-8" http-equiv="X-UA-Compatible" content="IE=Edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>视屏端到端保障大屏钻取</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link rel="stylesheet" href="styleItp.css" />
	<%@ include file="/common/lib.jsp"%>
	<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/My97DatePicker/WdatePicker.js"></script>
<link rel="stylesheet" href="${ctx}/static/jslib/My97DatePicker/skin/My97DatePicker/WdatePicker.css" />
	<%@ include file="/common/bootstrap.jsp"%> 
	<%@ include file="/common/echarts.jsp"%>
</head>

<body>
    <div class="itp">
    <!--s-->
    <div class="itp_title">
    	<div id="pageTitle" class="ititle">--</div><span id="pageTime" class="itp_time">--</span>
    	<div id="pageClose" class="closeBtn"><img src="images/close.png"  style="width:80px;height:80px;"/></div>
    </div>
    <!--2-->
    <div class="itp_centre">
    	<!--left-->
        <div class="ic_left">
        	<div class="il_content">
           		<div class="ic_icon"><img id="appImg" src="images/yk.png" /></div>
                
                <div class="ic_middle">
                    <div class="imic1">
                        <div class="imic1_icon">
                            <i class="icon icon-i01"></i> 
                            <span>附着/切换</span>
                        </div>   
                    </div>
                    <div class="imic2">
                    	 <div class="imic2_icon">
                            <i class="icon icon-i02"></i> 
                            <span>DNS查询</span>
                        </div>   
                    </div>
                    <div class="imic2">
                     	<div class="imic2_icon">
                            <i class="icon icon-i03"></i> 
                            <span>TCP握手</span>
                        </div>   
                    </div>
                    <div class="imic3">
                    	 <div class="imic3_icon">
                            <i class="icon icon-i04"></i> 
                            <span>HTTP业务</span>
                        </div>   
                    </div>
                </div>
                
                <div class="ic_table">
                	<table width="100%" border="0">
                      <tr class="ttr1">
                        <td class="ttd1" id="kpi0Name">用户数</td>
                        <td class="ttd2" id="kpi0Value">--</td>
                        <td class="ttd3" id="kpi0Unit">人</td>
                      </tr>
                      <tr class="ttr2">
                        <td class="ttd1" id="kpi1Name">流量</td>
                        <td class="ttd2" id="kpi1Value">--</td>
                        <td class="ttd3" id="kpi1Unit">GB</td>
                      </tr>
                      <tr class="ttr1">
                        <td class="ttd1" id="kpi2Name">下载速率</td>
                        <td class="ttd2" id="kpi2Value">--</td>
                        <td class="ttd3" id="kpi2Unit">Kbps</td>
                      </tr>
                      <tr class="ttr2">
                        <td class="ttd1" id="kpi3Name">用户渗透率</td>
                        <td class="ttd2" id="kpi3Value">--</td>
                        <td class="ttd3" id="kpi3Unit">%</td>
                      </tr>
                      <tr class="ttr0">
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                      </tr>
                      <tr class="ttr1">
                        <td class="ttd1" id="kpi4Name">本省率</td>
                        <td class="ttd2" id="kpi4Value">--</td>
                        <td class="ttd3" id="kpi4Unit">%</td>
                      </tr>
                      <tr class="ttr2">
                        <td class="ttd1" id="kpi5Name">本网率</td>
                        <td class="ttd2" id="kpi5Value">--</td>
                        <td class="ttd3" id="kpi5Unit">%</td>
                      </tr>
                      <tr class="ttr0">
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                      </tr>
                       <tr class="ttr1">
                        <td class="ttd1" id="kpi6Name">TCP时延</td>
                        <td class="ttd2" id="kpi6Value">--</td>
                        <td class="ttd3" id="kpi6Unit">ms</td>
                      </tr>
                      <tr class="ttr2">
                        <td class="ttd1" id="kpi7Name">TCP成功率</td>
                        <td class="ttd2" id="kpi7Value">--</td>
                        <td class="ttd3" id="kpi7Unit">%</td>
                      </tr>
                      <tr class="ttr0">
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                      </tr>
                      <tr class="ttr1">
                        <td class="ttd1" id="kpi8Name">播放成功率</td>
                        <td class="ttd2" id="kpi8Value">--</td>
                        <td class="ttd3" id="kpi8Unit">%</td>
                      </tr>
                      <tr class="ttr2">
                        <td class="ttd1" id="kpi9Name">播放时延</td>
                        <td class="ttd2" id="kpi9Value">--</td>
                        <td class="ttd3" id="kpi9Unit">ms</td>
                      </tr>
                      <tr class="ttr1">
                        <td class="ttd1" id="kpi10Name">全网业务占比</td>
                        <td class="ttd2" id="kpi10Value">--</td>
                        <td class="ttd3" id="kpi10Unit">%</td>
                      </tr>
                  </table>
</div>
            </div>
        
        
        <div class="arrow_box">
        	<div class="arrow arrow-1"></div>
            <div class="arrow arrow-2"></div>
            <div class="arrow arrow-3"></div>
        </div>
        
        </div>
        
        
        <!--right-->
        <div class="ic_right">
        	<div class="ir_tmt">
           		<div class="tmt_1">
           			<div id="chartParent0" index="0" class="chartContent chartParent">
	                	<div id="chartContent0" style="position:relative;width:100%;height:100%;"></div>
	                </div>
                  	<div class="tl_title">
	                  <div class="tl_font" id="chartTitle0">用户数<span>（人）</span></div>
	                  <div class="tl_b1"><img class="chartbtn" title="刷新" name="0" func="refresh" src="images/b1.png" /></div>
	                  <div class="tl_b2"><img class="chartbtn" title="切换指标" name="0" func="kpichange" src="images/config.png" /></div>
	                  <div class="tl_b3"><img class="chartbtn" title="选择时间" name="0" func="timechange" src="images/time.png" /></div>
	                </div>
	                
                </div>
                <div class="tmt_2">
                	<div id="chartParent1" index="1" class="chartContent chartParent">
	                	<div id="chartContent1" style="position:relative;width:100%;height:100%;"></div>
	                </div>
                  	<div class="tl_title">
	                  <div class="tl_font" id="chartTitle1">流量<span>（GB）</span></div>
	                  <div class="tl_b1"><img class="chartbtn" title="刷新" name="1" func="refresh" src="images/b1.png" /></div>
	                  <div class="tl_b2"><img class="chartbtn" title="切换指标" name="1" func="kpichange" src="images/config.png" /></div>
	                  <div class="tl_b3"><img class="chartbtn" title="选择时间" name="1" func="timechange" src="images/time.png" /></div>
	                </div>
                </div>
            </div>
            <div class="ir_tmb">
            	<div class="tmb">
            		<div id="chartParent2" index="2" class="chartContent chartParent">
	                	<div id="chartContent2" style="position:relative;width:100%;height:100%;"></div>
	                </div>
                  	<div class="tl_title">
	                  <div class="tl_font" id="chartTitle2">下载速率<span>（Kbps）</span></div>
	                  <div class="tl_b1"><img class="chartbtn" title="刷新" name="2" func="refresh" src="images/b1.png" /></div>
	                  <div class="tl_b2"><img class="chartbtn" title="切换指标" name="2" func="kpichange" src="images/config.png" /></div>
	                  <div class="tl_b3"><img class="chartbtn" title="选择时间" name="2" func="timechange" src="images/time.png" /></div>
	                </div>
	                
                </div>
                <div class="tmb">
                	<div id="chartParent3" index="3" class="chartContent chartParent">
	                	<div id="chartContent3" style="position:relative;width:100%;height:100%;"></div>
	                </div>
                  	<div class="tl_title">
	                  <div class="tl_font" id="chartTitle3">TCP成功率<span>（%）</span></div>
	                  <div class="tl_b1"><img class="chartbtn" title="刷新" name="3" func="refresh" src="images/b1.png" /></div>
	                  <div class="tl_b2"><img class="chartbtn" title="切换指标" name="3" func="kpichange" src="images/config.png" /></div>
	                  <div class="tl_b3"><img class="chartbtn" title="选择时间" name="3" func="timechange" src="images/time.png" /></div>
	                </div>
                </div>
            </div>
            
        </div>
        <!--------->
    </div>
    <!--3-->
     <div class="itp_down">
    	<!--left-->
        <div class="id_left" style="padding:20px;position:relative;">
        	<div id="ringChartParentParent" style="width:100%;height:100%;">
	        	<div id="ringChartParent" style="width:100%;height:100%;">
	            	<div id="ringChart" style="width:100%;height:100%;"></div>
	            	<div style="position:absolute;top:50%;left:50%;margin-left:-40px;margin-top:-25px;text-align:center;font-size:20px;font-weight:normal;color:white;width:80px;height:50px;">流量流向占比</div>
	            </div>
	        </div>
        </div>
     	<!--right-->
        <div class="id_right" style="position:relative;">
       		<div class="ir_nav">
                <div class="nav nav_mr"><img type="SGW" class="gridTabIcon gridTabIconSelected" src="images/ts_sgw.png" /></div>
                <div class="nav nav_mr"><img type="SP-IP" class="gridTabIcon" src="images/t_spip.png" /></div>
                <div class="nav nav_mr"><img type="HOST" class="gridTabIcon" src="images/t_host.png" /></div>
<!--                 <div class="nav nav_mr"><img type="终端" class="gridTabIcon" src="images/t_zd.png" /></div> -->
<!--                 <div class="nav nav_mr"><img type="小区" class="gridTabIcon" src="images/t_xq.png" /></div> -->
             </div>
             <div class="ir_content" >
             	<div id="tabGridParent" style="position:absolute;padding:20px 20px 20px 20px;width:100%;height:100%;">
        		
        		</div>
             </div>
             <div style="position:absolute;top:0px;right:80px;color:white;font-weight:bold;">
               	<div style="display:none;margin-right:20px;" id="hour_time_txt" class="hour_time_txt">--</div>
               	<div class="day_txt">小时</div>
                   <div class="btn_day" style="cursor:pointer;">
                   <img id="btn_period" name="realtime" style="height:36px;" src="${ctx}/static/styles/local-lsm/common/images/realtime.png" /></div>
                   <div class="realtime_txt">实时</div>
              </div>
             <img id="zcDrill" title="更多" src="images/i02.png" style="position:absolute;right:20px;top:0px;cursor:pointer;"/>
             <img id="exportTab" title="导出" src="images/b2.png" style="position:absolute;right:60px;top:0px;cursor:pointer;"/>
        </div>
     	<!--------->   
     </div>
    <!--4-->
     <div class="itp_bottom"></div>     
    </div>	
    <!--e-->
    </div>
    
    <%@ include file="/pages/local-lsm/common/screenbaseinclude.jsp"%>
    <link rel="stylesheet" href="${ctx}/static/styles/local-lsm/common/custom.css" />
    <link rel="stylesheet" href="baseCss.css" />
    <script type="text/javascript" src="${ctx}/scripts/local-lsm/common/dragger.js"></script>
    <script type="text/javascript" src="${ctx}/scripts/local-lsm/shvideoe2e/itp.js"></script>
    <script type="text/javascript">
    	var BASEPATH="${ctx}";
    	var minor="<%=minor%>";
    	var majorName="<%=majorName%>";
    	var drillpage=new SHVIDEOSCREEN.MinorDrillPage(majorName,minor);
    	
    	function closeDrillApp(){
    		if(drillpage) drillpage.closeDrillApp();
    	}
    </script>
</body>
</html>
