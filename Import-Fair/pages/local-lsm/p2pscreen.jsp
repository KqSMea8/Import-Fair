<!DOCTYPE html>
<html lang="zh-CN">
<head>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<meta charset="UTF-8" http-equiv="X-UA-Compatible" content="IE=Edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<%@ include file="/common/lib.jsp"%>
<%@ include file="/common/bootstrap.jsp"%>
<%@ include file="/common/echarts.jsp"%>
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/style.css" />
<title>端到端大屏</title>
</head>
<body>
    <div class="ETE">
<!--LEFT-->
<!--L_TOP-->         
        <div class="ETE_left">
			<div class="left_top">
                 <div class="left_table"> 
                     <div class="L1"><h1><ins class="titleKpi" id="titleTimeRange">--</ins><span>(信令)</span></h1></div>
                     <div class="L2"><h1><h>活跃用户数&nbsp;</h><ins class="titleKpi" id="titleKpiUser">--</ins><span>&nbsp;万</span></h1></div>
                     <div class="L3"><h1><h>数据流量&nbsp;</h><ins class="titleKpi" id="titleKpiTraffic">--</ins><span>&nbsp;GB</span></h1></div>
                     <div class="L4"><h1><h>鉴权成功率&nbsp;</h><ins class="titleKpi" id="titleKpiAuthSucc">--</ins><span>&nbsp;%</span></h1></div>
                     <div class="L5"><h1><h>附着成功率&nbsp;</h><ins class="titleKpi" id="titleKpiAttachSucc">--</ins><span>&nbsp;%</span></h1></div>
                     <div class="L6"><h1><h>下载速率&nbsp;</h><ins class="titleKpi" id="titleKpiDLSpeed">--</ins><span>&nbsp;Mbps</span></h1></div>
                 </div>
        
                 <div class="circle_line"> 
                    <div class="Lline1-box">
                    	<div class="line-1"></div>
                    </div> 
                    <div class="Lline2-box">
                		<div class="line-1"></div>
           			</div>
                    <div class="Lline3-box">
                		<div class="line-1"></div>
           			</div>
                    <div class="Lline4-box">
                		<div class="line-1"></div>
           			</div>  
                    <div class="Lline5-box">
                		<div class="line-1"></div>
           			</div>                        
                 </div>
                  <div class="clear"></div> 
          </div>

            <div class="left_topology">
                <div class="topology">
                    <div class="tp1">
                        <div class="text_box" style="position:relative;"> 
                            <span id="alarmTextSpan">当前无设备告警</span> 
                            <i id="alarmBtn" class="icon icon-Chart hand"></i>
                        </div>
                        <div class="tp1_box">
                            <div class="tp1_box_terminal">
                                <div class="terminal"> 
                                    <i class="tpicon tpicon-terminal hand"></i> 
                                    <span class="tpicon-note">终端</span> 
                                </div>
                            </div>
                        
                            <div class="tp1_box_ENodeB">
                                <div class="ENodeB"> 
                                    <i class="tpicon tpicon-ENodeB hand"></i> 
                                    <span class="tpicon-note">ENodeB</span> 
                                </div>
                            </div>
                            <div class="tp1_box_MME">
                                <div class="MME"> 
                                    <i class="tpicon tpicon-MME hand"></i> 
                                    <span class="tpicon-note">MME</span> 
                                </div>
                            </div>
                        </div>
                    </div>
                   
                    <div class="tp2">
                        <div class="tp2_box_HSS">
                            <div class="HSS"> 
                                <i class="tpicon tpicon-HSS  hand"></i> 
                                <span class="tpicon-note">HSS</span> 
                            </div>
                        </div>
                        <div class="tp2_box_SAEGW">
                            <div class="SAEGW"> 
                                <i class="tpicon tpicon-SAEGW hand"></i> 
                                <span class="tpicon-note">SAEGW</span> 
                            </div>
                        </div>
                        <div class="tp2_box_DNS">
                            <div class="DNS">
                                <i class="tpicon tpicon-DNS hand"></i> 
                                <span class="tpicon-note">DNS</span>
                            </div>
                        </div>
                        <div class="tp2_box_firewall">
                             <div class="firewall">
                                <i class="tpicon tpicon-firewall hand"></i> 
                                <span class="tpicon-note">防火墙</span>
                            </div>  	
                        </div>
                    </div>
                  
                    <div class="tp3">
                    	<div class="tp3_box_gateway">
                            <div class="gateway"> 
                                <i class="tpicon tpicon-gateway hand"></i> 
                                <span class="tpicon-note">综合网关</span> 
                            </div>                        
                        </div>
                        <div class="tp3_box_CMNET">
                            <div class="CMNET"> 
                                <i class="tpicon tpicon-CMNET hand"></i> 
                                <span class="tpicon-note">CMNET</span> 
                            </div>                         
                        </div>
                        <div class="tp3_box_ICP">
                            <div class="ICP"> 
                                <i class="tpicon tpicon-ICP hand"></i> 
                                <span class="tpicon-note">ICP</span> 
                            </div>                         
                        </div>
                    </div>
                </div>
                <div class="arrow">
        	        <div class="arrow_pic arrow-1"></div>
                    <div class="arrow_pic arrow-2"></div>
                    <div class="arrow_pic arrow-3"></div>
                    <div class="arrow_pic arrow-4"></div>
                    <div class="arrow_pic arrow-5"></div>
                    <div class="arrow_pic arrow-6"></div>
                    <div class="arrow_pic arrow-7"></div>
                    <div class="arrow_pic arrow-8"></div>
                    <div class="arrow_pic arrow-9"></div>
                    <div class="arrow_pic arrow-10"></div>
                    <div class="arrow_pic arrow-11"></div>
                </div>
            </div>
        
<!--L_CENTRE-->                
            <div class="left_centre">
                <div class="left-Chart1">
               		<div class="title-1">
                   		<div class="title">附着成功率</div>
                        <div class="titleline">
                            <div class="line-title">
                           	  <div class="line-t1"></div>
                            </div>
                        </div>
                        
                        <div class="title_time">（--:--）</div>
                    </div>
                    <div class="chart1_content">
                    </div>
                </div>
                
                <div class="left-Chart2">
                <!--<div class="title-1">
                   		<div class="title">拨测指标</div>
                        <div class="titleline">
                            <div class="line-title">
                           	  <div class="line-t1"></div>
                            </div>
                        </div>
                        
                        <div class="title_time">（--:--）</div>
                  </div>-->
                  <a class="backBtn">返回</a>
                    <div class="chart1_content">
                    </div>          
                </div>
        
                <div class="left-Chart3">
               		<div class="title-1">
                   		<div class="title">DNS解析成功率</div>
                        <div class="titleline">
                            <div class="line-title">
                           	  <div class="line-t1"></div>
                            </div>
                        </div>
                        <div class="title_time">（--:--）</div>
                    </div>
                    <div class="chart1_content">
                    </div>                
                </div>
            </div>
            
<!--L_UNDER-->            
           <div class="left_under">
                <div class="left-Chart4">
               	      
                </div>
             <div class="left-Chart5">
                    
             </div>
  
                <div class="left-Chart6">
                	<div class="title-1">
                   		<div class="title">地址池利用率</div>
                        <div class="titleline">
                          <div class="line-title">
                                <div class="line-t1"></div>
                            </div>
                        </div>
                        
                        <div class="title_time">（--:--）</div>
                    </div>
                
                    <div class="chart1_content">
                    </div>
                    <div class="title-3">
                        <div class="title1">拨测指标</div> 
                    </div> 
                    <div class="left_KPI">
                        <div class="KPI1">
                        	<div class="KPI_green">
                                <div class="KPI1_span1">HSS</div>
                                <div class="KPI1_span2">OK</div>
                            </div>
                        </div>
                        <div class="KPI2">
                        	<div class="KPI_green">
                                <div class="KPI1_span1">MME</div>
                                <div class="KPI1_span2">OK</div>
                            </div>                        
                        </div>
                        <div class="KPI3">
                         	<div class="KPI_green">
                                <div class="KPI1_span1">SAEGW</div>
                                <div class="KPI1_span2">OK</div>
                            </div>                       
                        </div>
                     </div>
                 </div>
          </div>
      </div>
      
<!--CENTRE-->   
<!--C_TOP-->  
        <div class="ETE_centre">
       		<div class="centre_top">
                <div class="centre_table"> 
                    <div class="C1">
                    <h1><h>视频用户数&nbsp;&nbsp;</h><ins class="titleKpi" id="titleKpiVideoUser">--</ins><span>&nbsp;&nbsp;万</span></h1>
                    </div>
                    <div class="C2">
                    <h1><h>视频流量&nbsp;&nbsp;</h><ins class="titleKpi" id="titleKpiVideoTraffic">--</ins><span>&nbsp;&nbsp;GB</span></h1>
                    </div>
                    <div class="C3">
                    <h1><h>视频下载速率&nbsp;&nbsp;</h><ins class="titleKpi" id="titleKpiVideoDL">--</ins><span>&nbsp;&nbsp;Mbps</span></h1>
                    </div>
                    <div class="C4">
                    <h1><h>视频播放成功率&nbsp;&nbsp;</h><ins class="titleKpi" id="titleKpiVideoSucc">--</ins><span>&nbsp;&nbsp;%</span></h1>
                    </div>
                </div>
                <div class="circle_line"> 
                    <div class="Cline1-box">
                    	<div class="line-1"></div>
                    </div> 
                    <div class="Cline2-box">
                	<div class="line-1"></div>
           	     </div>
                    <div class="Cline3-box">
                	<div class="line-1"></div>
           	    </div>
                       
                 </div>
                  <div class="clear"></div> 
            </div>
<!--C_CENTRE-->            
        <div class="centre_centre">
        	<div class="centre-Chart1">
                    <div class="title-1">
                    	<div class="title">业务</div>
                    	<div class="titleline">
                    	<div class="line-title">
                    		<div class="line-t1"></div>
                   		</div>	
                    </div>
                    <div class="title_time">（--:--）</div>
                </div>
                    
              	<div class="chart1_content">
                </div>       
            </div>
            <div class="centre-Chart2">
             <div class="title-1">
                    	<div class="title">业务流量速率</div>
                    	<div class="titleline">
                    	<div class="line-title">
                    		<div class="line-t1"></div>
                   		</div>	
                    </div>
                    <a class="backBtn">返回</a>
                    <div class="title_time">（--:--）</div>
                </div>
              	<div class="chart1_content">
                </div>                 
                
            </div>
            <div class="centre-Chart3">
             <div class="title-1">
                    	<div class="title">HTTP/TCP成功率</div>
                    	<div class="titleline">
                    	<div class="line-title">
                    		<div class="line-t1"></div>
                   		</div>	
                    </div>
                    <a class="backBtn">返回</a>
                    <div class="title_time">（--:--）</div>
                </div>
              	<div class="chart1_content">
                </div>               
               </div>
            </div>

<!--C_UNDER-->        
        <div class="centre_under">
            <div class="centre-Chart4">
                 <div class="title-1">
                    	<div class="title">终端</div>
                    	<div class="titleline">
                    	<div class="line-title">
                    		<div class="line-t1"></div>
                   		</div>	
                    </div>
                    <a class="backBtn">返回</a>
                    <div class="title_time">（--:--）</div>
                </div>
                    
              	<div class="chart1_content">
                </div>   
                
                <div class="Chart4_table">
                </div> 
                          
            </div>
            
            <div class="centre-Chart5">
                 <div class="title-1">
                    	<div class="title">设备下载速率(Kbps)</div>
                    	<div class="titleline">
                    	<div class="line-title">
                    		<div class="line-t1"></div>
                   		</div>	
                    </div>
                    <div class="title_time">（--:--）</div>
                </div>
                <div class="chart1_content">
               
                
                </div>            
            
            
            
            </div>
            
            <div class="centre-Chart6">
                <div class="centre-Chart6_top">
                     <div class="title-1">
                            <div class="title">业务源</div>
                            <div class="titleline">
                            <div class="line-title">
                                <div class="line-t1"></div>
                            </div>	
                        </div>
                        <div class="title_time">（--:--）</div>
                    </div>
                    <div class="chart1_content">
                    </div>   
                 </div>  
                
                <div class="centre-Chart6_under"> 
                    <div class="title-1">
                            <div class="title">业务源流量速率</div>
                            <div class="titleline">
                            <div class="line-title">
                                <div class="line-t1"></div>
                            </div>	
                        </div>
                        <div class="title_time">（--:--）</div>
                    </div>
                    <div class="chart1_content">
                    </div>   
                 </div>  
                </div>               
            </div>       

        </div>
	<!--RIGHT-->    
        <div class="ETE_right">
        	<iframe id="rightmap" style="width:100%;height:100%;" frameborder="no" src= ></iframe>
        </div>

</div>
</body>
<%@ include file="/pages/local-lsm/common/screenbaseinclude.jsp"%>
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/componentsStyle.css" />
<script type="text/javascript" src="${ctx}/scripts/local-lsm/p2pscreen.js"></script>
<script>
	/** 立即执行方法*/
	(function () { 
		new P2PScreen.ScreenController();
		document.getElementById("rightmap").src=LSMScreen.IPPORT+"/sh/shUltimate/indexUltimate.html";
	}());
</script>
</html>