var order=["0","1","2","3"];
var _id=["0","1","2","3"];
var _d=0;
var html={
	 initial:function(array){
		 $("#right_0").css('display','none');
		 $("#right_1").css('display','none');
		 $("#right_2").css('display','none');
		 $("#right_3").css('display','none');
		 if(!utils.isStringEmpty(array)){
			 order=[];
			 order=(array).split(",");
		 }
		 for(var c=0;c<order.length;c++){
			 if(order[c]=="placeholder"){
				 _d++;
			 }
		 }
		 for(var c=0;c<order.length;c++){
			 if(order[c]=="placeholder"){
				 if(_d==4){
					 this["html_"+_id[c]](c); 
				 }
			 }else{
				 this["html_"+order[c]](c);
				 $("#right_"+c).css('display','block');
			 }
		 }
		$('#zbpz_img').attr('src',eastcom.baseURL+"/static/images/overview/bjpz.png");
	 },
	 html_0:function(id){
		var html='';
		html +='<div class="icon-yhs" style="margin-top: 10px;"></div><div class="fontContentTitle" style="margin-left: 20px;">用户数</div>';
		html +='<div style="background-color:rgba(0, 102, 255, 0.15);margin-top:10px;height:400px;width:100%"><div class="icon-217_zu" style="margin-top:25px;margin-left:10px;"></div></div>';
		html +='<div style="width: 200px; height: 130px;margin-top: -365px; margin-left:10px;border-radius: 5px; text-align: center;">';
		html +='<span style="font-size: 34px; color: #66E6FF; display: inline-block; margin-top: 15px" id="bdyh_id"></span><span style="font-size: 26px; color: #66E6FF">万人</span><br /><span style="font-size: 26px;">本地用户</span></div>';
		html +='<div style="width: 200px; height: 130px;margin-top: -245px; margin-left: 260px; border-radius: 5px; text-align: center;">';
		html +='<span style="font-size: 34px; color: #66E6FF; display: inline-block; margin-top: 15px" id="yhs_id"></span><span style="font-size: 26px; color: #66E6FF">万人</span><br /><span style="font-size: 26px;">活跃用户</span></div>';
		html +='<div style="width: 200px; height: 130px;margin-top: -135px; margin-left: 10px; border-radius: 5px; text-align: center;">';
		html +='<span style="font-size: 34px; color: #66E6FF; display: inline-block; margin-top: 15px" id="sj_id"></span><span style="font-size: 26px; color: #66E6FF">万人</span><br /><span style="font-size: 26px;">省际</span></div>';
		html +='<div style="width: 200px; height: 130px;margin-top: -365px; border-radius: 5px; margin-left: 500px; text-align: center;">';
		html +='<span style="font-size: 34px; color: #66E6FF; display: inline-block; margin-top: 15px" id="gj_id"></span><span style="font-size: 26px; color: #66E6FF">人</span><br /> <span style="font-size: 26px;">国际及港澳台</span></div>';
		html +='<div style="width: 200px; height: 130px;margin-top: -135px; border-radius: 5px; margin-left: 500px; text-align: center;">';
		html +='<span style="font-size: 34px; color: #66E6FF; display: inline-block; margin-top: 15px" id="ydyl_id"></span><span style="font-size: 26px; color: #66E6FF">人</span><br /><span style="font-size: 26px;">元首参会国</span></div>';
		$('#right_'+id).html(html);
		setTimeout(function(){overviewright.hys();overviewright.UserDistAll();},500);
	 },
	html_1:function(id){
		 var html=''; 
			html +='<div class="icon-wul" style="margin-top: 10px;"></div><div class="fontContentTitle" style="margin-left: 20px;">业务量</div><div class="icon-fd" style="margin-top: 10px; margin-left: 10px;cursor:pointer;float: right;margin-right: 30px;" id="hw_img"></div><div class="icon-fd" style="margin-top: 10px; margin-left: 10px;cursor:pointer;float: right;margin-right: 30px;position: relative;left: 90px;top: 270px;z-index: 10;" id="liu_img"></div>';
			html +='<div style="background-color: rgba(0, 102, 255, 0.15);width: 710px; height: 400px;margin-top:10px;"><div id="_hw_val"></div><div style="width: 710px; height: 400px;position: absolute;"><div style="width: 130px; height: 130px; background-color: rgba(0, 102, 255, 0.35); border-radius: 5px; margin-top: 10px;margin-left: 20px;">';
			html +='<div style="margin-left: 15px;text-align: center;font-size: 20px;height: 100px; width: 100px;padding-top: 10px;"><span id="hwl_span_value"></span></div></div>';
			html +='<span style="font-size: 24px;margin-left: 20px;">语音话务量</span><div id="yyhw" style="width: 550px; height: 170px; margin-left: 140px; margin-top: -170px;"></div>';
			html +='<div id="_4Gll_val"></div><div style="width: 130px; height: 130px; background-color: rgba(0, 102, 255, 0.35); border-radius: 5px; margin-top: 60px;margin-left: 20px;">';
			html +='<div style="margin-left: 15px;text-align: center;font-size: 20px;height: 100px; width: 100px;padding-top: 10px;"><span id="4G_span_value"></span></div></div>';
			html +='<span style="font-size: 24px;margin-left: 45px;">4G流量</span> <div id="4Gll" style="width: 550px; height: 170px; margin-left: 140px; margin-top: -170px;"></div></div></div>';
			$('#right_'+id).html(html);
			setTimeout(function(){right_ecarts.yyhw();right_ecarts.sgll();},500);
	 },
	 html_2:function(id){
		 var html=''; 
			html +='<div class="icon-top" style="margin-top: 10px;"></div><div class="fontContentTitle" style="margin-left: 20px;">TOP业务</div>';
			html +='<div onmouseover="Roll_img_ydyw_onmouseover();" onmouseout ="Roll_img_mouseout()" style="font-size: 20px;float: right; color: #fff;cursor:pointer;margin-top: 20px; margin-right: 100px;"><div style="visibility: hidden;" id="bz_top5_Roll_img_div"><span style="margin-right:20px">自有业务:</span><span>是</span><img id="bz_top5_Roll_img" onclick="Roll_img_click()" src="'+eastcom.baseURL+'/static/images/overview/k_2.png" style="margin: 0 7px;cursor:pointer;"><span>否</span></div></div>'
			html +='<div style="background-color: rgba(0, 102, 255, 0.15);width: 710px;height:400px;margin-top:10px"><div id="top" style="width: 610px; height: 385px;"></div></div>';
			$('#right_'+id).html(html);
			setTimeout(function(){overviewright.top();},500);
	 },
	 html_3:function(id){
		 var html=''; 
			html +='<div id="appGrid" style="width: 100%; height: 460px;"><div id="appGridHeader" class="horizontalRow fontSubInfo" style="text-align: center; margin-top: 10px;">';
			html +='<div>业务</div><div>用户数<div class="fontUnitTime">(人)</div></div><div>流量<div class="fontUnitTime">(GB)</div></div><div>下载速率<div class="fontUnitTime">(Mbps)</div></div>';
			html +='</div><div id="appGridBody" class="horizontalRow"></div></div>';
			$('#right_'+id).html(html);
			setTimeout(function(){overviewright.top();},500);
	 },
	 html_4:function(id){
		 var html=''; 
			html +='<div class="icon-zdzb" style="margin-top: 10px;"></div><div class="fontContentTitle" style="margin-left: 20px;">终端占比</div><div class="icon-fd" style="margin-top: 10px; margin-left: 10px;cursor:pointer;float: right;margin-right: 30px;" id="top_img"></div>';
			html +='<div style="background-color: rgba(0, 102, 255, 0.15);width: 710px; height: 400px;margin-top:10px;"><div id="_hw_val"></div><div style="width: 710px; height: 400px;">';
			html +='<div id="zdzb" style="width: 710px; height: 400px;"></div></div>';
			$('#right_'+id).html(html);
			setTimeout(function(){right_ecarts.zdzb();},500);
	 },
	 html_5:function(id){
		 var html=''; 
			html +='<div id="con_list" class="con_list" style="width:100%;height:100%;">';
			html +='<div class="con_chart" style="margin-top: 80px;"><div id="con_grid_div"><table id="dtpz"></table></div><div class="clear"></div></div>';
			$('#right_'+id).html(html);
			for(var q=0;q<order.length;q++){
				if(order[q]==4){}else{
					setTimeout(function(){right_ecarts.zdzb();},500);
				}
			}
	 }
}