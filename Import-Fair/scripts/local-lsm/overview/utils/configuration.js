var distribution_id="";
var Postpone={};
Postpone.phone=false;
var Cache={};
var configuration = {
	Jurisdiction:function(parameter,id,category,categoryName){
		var Jurisdiction={};
		Jurisdiction.time=10000;
		switch(parameter){
		case "_Model":
			Jurisdiction.name=["","网络概况", "用户数", "业务规模", "无线上网质量", "无线语音质量", "核心网指标"];
			Jurisdiction.id=["msc_subscrib_in_vlr", "s_083", "volte_teletraffic", "lte_wireless_conn_ratio", "gsm_wireless_conn_ratio", "volte_voice_conn_ratio", "msc_subscrib_in_vlr", "mme_sub_nbrsub", "vsruc", "prov_roam_in_user_num", "inter_roam_in_user_num", "ydylgj", "lte_flow_all", "volte_teletraffic", "lte_dl_prb_use_ratio", "gsm_teletraffic", "gsm_flow_all", "gsm_wireless_conn_ratio", "lte_wireless_conn_ratio", "lte_wireless_drop_ratio", "s_114", "s_135", "s_027", "s_139", "volte_voice_conn_ratio", "volte_voice_drop_ratio", "gsm_wireless_conn_ratio", "gsm_wireless_drop_ratio", "csmt_fall_back_succ_ratio", "volte_esrvcc_sw_succ_ratio", "mme_sub_nbrsub", "tau_update_succ_ratio", "pdn_conn_succ_ratio", "pgw_charging_succ_ratio", "mme_sw_succ_ratio", "csmt_fall_back_succ_ratio"];
			break;
		case "_jtyw_Model":
			Jurisdiction.name=["","业务质量", "业务规模"];
			Jurisdiction.id=["play_res_delay", "epg_resp_delay", "screen_jammed_num_ratio", "sjdr", "fbb_user_nums", "online_user_cnt", "tv_user_num", "peak_tv_online_user_num"];
			break;
		case "_zywz_Model":
			Jurisdiction.name=["","拨测质量"];
			Jurisdiction.id=["page_load_time","succ_ratio","packet_loss_rate","delay"];
			break;
		case "_zqyw_Model":
			Jurisdiction.name=["","用户规模","业务量"];
			Jurisdiction.id=["cust_nums","line_nums","fault_cust_nums","fault_line_nums"];
			break;
		case "_left_Model":
			Jurisdiction.name=["","标准组1", "标准组2", "标准组3", "标准组4", "标准组5","标准组6"];
			Jurisdiction.id=id;
			break;
		case "_yd_Model":
			Jurisdiction.name=["", "网络概况", "用户数", "业务规模", "无线上网质量", "无线语音质量"];
			Jurisdiction.id=["s_261", "s_083", "volte_voice_teletraffic", "lte_wireless_conn_ratio", "gsm_wireless_conn_ratio", "volte_wireless_conn_ratio", "s_261", "sjmy", "user_cnt", "ydylgj", "placeholder", "placeholder", "s_083", "lte_flow_all", "gsm_flow_all", "volte_voice_teletraffic", "gsm_teletraffic", "placeholder", "lte_wireless_conn_ratio", "lte_wireless_drop_ratio", "s_114", "s_135", "s_027", "s_139", "volte_wireless_conn_ratio", "volte_wireless_drop_ratio", "gsm_wireless_conn_ratio", "gsm_wireless_drop_ratio", "placeholder", "placeholder"];
			break;
		case "_ydyw_g_Model":
			Jurisdiction.name=["","",""];
			Jurisdiction.id=["s_091","msc_subscrib_in_vlr","mme_sub_nbrsub","vsruc","prov_roam_in_user_num","inter_roam_in_user_num","s_019","s_262","s_263"];
			break;
		default:
			Jurisdiction.name=["","",""];
			Jurisdiction.id=[];
			break;
		};
		var Cfg=Cache.Cfg;
		if(!utils.isStringEmpty(Cfg)){
			if(!utils.isStringEmpty(Cfg.data[pmars.phone()])){
				var _id=[];
				var Cfg=Cfg.data[pmars.phone()].content;
				var _isStringEmpty=[];
				var _Cfg=eval("("+Cfg+")");
				if(!utils.isStringEmpty(_Cfg[parameter])){
					try {
						_isStringEmpty=(_Cfg[parameter]).split(",");
						for(var f=0;f<_isStringEmpty.length-1;f++){
							_id[f]=_isStringEmpty[f];
						}
					} catch(e) {
						_isStringEmpty=_Cfg[parameter];
						for(var f=0;f<_isStringEmpty.length-2;f++){
							_id[f]=_isStringEmpty[f];
						}
						Jurisdiction.name=_isStringEmpty[_isStringEmpty.length-1];
					}
					if(_id.length>0){
						if(utils.checkInteger(_isStringEmpty[_isStringEmpty.length-2]+"")){
							Jurisdiction.time=parseInt(_isStringEmpty[_isStringEmpty.length-2])*1000;
						}else{
							Jurisdiction.time=parseInt(_isStringEmpty[_isStringEmpty.length-1])*1000;
						}
						Jurisdiction.id=_id;
						if(category=="jb"){
							overviewleftyd[categoryName](Jurisdiction);
						}else if(category=="_g"){
							overview_g_left[categoryName](Jurisdiction);
						}else{
							overviewleft[categoryName](Jurisdiction);
						}
					}else{
						if(category=="jb"){
							overviewleftyd[categoryName](Jurisdiction);
						}else if(category=="_g"){
							overview_g_left[categoryName](Jurisdiction);
						}else{
							overviewleft[categoryName](Jurisdiction);
						}
					}
				}else{
					if(category=="jb"){
						overviewleftyd[categoryName](Jurisdiction);
					}else if(category=="_g"){
						overview_g_left[categoryName](Jurisdiction);
					}else{
						overviewleft[categoryName](Jurisdiction);
					}
				}
			}else{
				if(category=="jb"){
					overviewleftyd[categoryName](Jurisdiction);
				}else if(category=="_g"){
					overview_g_left[categoryName](Jurisdiction);
				}else{
					overviewleft[categoryName](Jurisdiction);
				}
			};
		}else{
			if(category=="jb"){
				overviewleftyd[categoryName](Jurisdiction);
			}else if(category=="_g"){
				overview_g_left[categoryName](Jurisdiction);
			}else{
				overviewleft[categoryName](Jurisdiction);
			}
		}
	},
	IsmEaebmCfg:function(category,categoryName,bool){
		cdm.getIsmEaebmCfg({id:pmars.phone()}, function(Cfg) {
			Cache.Cfg=Cfg;
			if(utils.isStringEmpty(bool)){
				if(category=="jb"){
					overviewleftyd[categoryName](true);
				}else if(category=="_g"){
					overview_g_left[categoryName](true);
				}else{
					overviewleft[categoryName](true);
				}
			}		
		});
	},
	model:function(id,htmlStr,length){
		var html="";
			html+='<div class="modal-dialog" style="width: 1600px; height:850px; margin: 20px auto;">';
			html+='<div class="modal-header"><h4 class="modal-title" style="font-size:40px"><span>指标配置</span></h4></div>';
			html+='<div class="modal-content"style="margin-top:20px">';
			html+='<div style="margin-top:20px;">';
			html+='<div style="margin-left:20px;width:300px;height:50px"><div style="width:150px"><span style="font-size:20px">轮播周期:</span></div><select class="form-control" style="width:150px;height:50px;margin-top: -40px;margin-left: 120px;background-color: rgba(1,0,69,0.75) !important;color: #fff;font-size: 22px;" id="'+id+'_configuration_model_select"><option>5</option ><option  selected = "selected">10</option><option>15</option><option>20</option></select></div>';
			html+='<div style="margin-left:400px;width:300px;height:50px;margin-top: -60px;"><button type="button" class="btn btn-lg btn-primary" style="height: 50px;margin-right:20px;margin-bottom:20px;" onclick="add_configuration_model('+id+')">添加组</button><button type="button" class="btn btn-default btn-lg" style="margin-bottom:20px;height: 50px;background-color: rgba(250, 250, 250, 1) !important;color:#000" id="'+id+'_remove_configuration_model" onclick="remove_configuration_model('+id+')">删除组</button></div></div>';
			html+='<div class="modal-body" id="_configuration_modal_body" style="height:850px;border: solid 1px #2431ac;background-color: rgba(0,4,66,0.75);border-radius: 15px;margin-top:20px">'+htmlStr+'</div>';
			html+='<div style="margin-top:20px">';
			html+='<button type="button" class="btn btn-lg btn-primary" style="margin-left:40%;margin-right:20px;margin-bottom:20px;font-size:30px" onclick="model_confirm('+id+')">确认</button>';
			html+='<button type="button" class="btn btn-default btn-lg" style="margin-bottom:20px;font-size:30px;background-color: rgba(250, 250, 250, 1) !important;color:#000" onclick="model_close()">取消</button></div></div></div>';
			document.getElementById("index_modal").innerHTML = html;
	},
	Assemble:function(Situation,id){
		Postpone={};
		Postpone.parameter=id;
		Postpone.Situation=Situation[id];
		var source=Situation[id].source;//数据库数据
		var length=Situation[id].data.length;//分组
		var grouping=Situation[id].data.grouping;//分组情况
		var original=Situation[id].original;//原始数据
		var parameter=eval("("+pmars[pmars.classification(id)[0]]()+")");
		var attribute=pmars.classification(id)[1];
		var shield=pmars.classification(id)[2];
		var html='';
		var _html='';
		var count=0;
		var height=420;
		var _json={};
		var time="";
		span_name=Situation[id].name;
		time=Situation[id].time;
		span_name=Situation[id].name;
		time=Situation[id].time;
		$("#"+id+"_zbpz_select").val(time).change();
		for(var d=0;d<length;d++){
			var Initialize='';
			var width=0;
			if(Situation[id].Maximum>4&&Situation[id].Maximum<=6){width=32;}else if(Situation[id].Maximum<=4){width=48;}
			for(var f=0;f<grouping[d];f++){
				if(utils.isStringEmpty(pmars[shield]()[source[count].id])){
					Initialize +='<div style="border: 0px solid #1A4176;width:'+width+'%;margin-top:10px; height:38%;margin-left:1%;float:left;margin-top:5px;font-size: 24px;" bool="false" id="_Model_'+source[count].id+'" ><span>'+parameter[source[count].id].auxiliary+'</span></div>';
					if(count<source.length){
						source[count].bool=true;
					}
					_json[source[count].id]=source[count].id;
					count++;
				}
			}
			html +='<div style="border: 4px solid #1A4176;border-radius:10px;height: auto;height: 200px; width: 475px;float:left;margin-left:20px;margin-bottom:10px"  bool="true" onclick="distribution_Model_click(this)" id="distribution_Model_'+d+'"><input type="text" class="form-control" id="_Model_'+(d+1)+'" value="'+span_name[(d+1)]+'"style="width: 70%;height:30px;border: 3px solid #1A4176;background-color: rgba(1,0,69,0.75) !important;margin-left: 5px;margin-top: 5px;color:#fff;font-size: 22px;">'+Initialize+'</div>';
		}
		height=420;
		var width1=169;
		var height1=100;
		var left=20;
		if(original.length>24&&original.length<36){width1=148;height1=80;}else if(original.length>36){width1=138;height1=80;left=15};
		for(var s=0;s<original.length;s++){
			if(!utils.isStringEmpty(_json[original[s]])){
				if(utils.isStringEmpty(pmars[shield]()[source[s]])){
					_html += '<div style="border: 4px solid #fff;margin-top:10px;border-radius:10px;height: auto;height:'+height1+'px; width:'+width1+'px;float:left;margin-left:'+left+'px;font-size: 24px;" bool="true" id="Model_'+original[s]+'"  onclick="distribution_Model(this);">'+parameter[original[s]].auxiliary+'</div>';
				}
			}else{
				if(utils.isStringEmpty(pmars[shield]()[original[s]])){
					_html += '<div style="border: 4px solid #1A4176;margin-top:10px;border-radius:10px;height: auto;height:'+height1+'px; width:'+width1+'px;float:left;margin-left:'+left+'px;font-size: 24px;" bool="false" id="Model_'+original[s]+'" onclick="distribution_Model(this);">'+parameter[original[s]].auxiliary+'</div>';
				}
			}
		}
		var htmlStr='<div id="'+id+'_zbpz_Modal" style="height: 810px; width: 1568px"><div style="height:'+height+'px;width:1560px;padding-top: 10px;;padding-left:30px" id="distribution_Modal_html">'+html+'</div><div style="margin-top:10px;margin-left:30px">'+_html+'</div></div>';
		configuration.model(id,htmlStr,original.length);
	}
}
function  img_onmouseover(parameter){
	$('#'+parameter+'_img').css('visibility','visible');
}
function  img_mouseout(parameter){
	$('#'+parameter+'_img').css('visibility','hidden');
}
function  Roll_img_onmouseover(parameter){
	$('#'+parameter+'_Roll_img_div').css('visibility','visible');
}
function  Roll_img_mouseout(parameter){
	$('#'+parameter+'_Roll_img_div').css('visibility','hidden');
}
function Roll_img_click(parameter){
	if(Situation[parameter].Roll_bool==true){
		Situation[parameter].Roll_bool=false;
		$('#'+parameter+'_Roll_img').attr('src',eastcom.baseURL+'/static/images/overview/k_2.png');
		window.clearInterval(Situation[parameter]["Slide_"+parameter+"_time_remove"]);
	}else{
		Situation[parameter].Roll_bool=true;
		$('#'+parameter+'_Roll_img').attr('src',eastcom.baseURL+'/static/images/overview/k_1.png');
		Situation[parameter]["Slide_"+parameter+"_time_remove"]=setInterval(function() {
			situation_right_slide(parameter);
		 }, Situation[parameter].time);
	}
}
function distribution_Model_click(obgect){
	distribution_id=obgect.id;
	$("#distribution_Modal_html >div").css("border","4px solid #1A4176");
	$("#distribution_Modal_html >div").attr("bool","false");
	var id=[];
	for(var g=0;g<$("#distribution_Modal_html >div").length;g++){
		for(var f=0;f<$("#"+$("#distribution_Modal_html >div")[g].id+">div").length;f++){
			$("#"+($("#"+$("#distribution_Modal_html >div")[g].id+" >div")[f].id).replace('_','')).css("border","4px solid #fff");
		}
	}
	for(var s=0;s<$("#"+$("#"+obgect.id)[0].id+" >div").length;s++){
		$("#"+($("#"+$("#"+obgect.id)[0].id+" >div")[s].id).replace('_','')).css("border","4px solid #00FF00");
	}
	$("#"+obgect.id).css("border","4px solid #fff");
}
function distribution_Model(obgect) {
	var bool=false;
	if (!utils.isStringEmpty(distribution_id)) {
		for (var s = 0; s < $("#" + $("#" + distribution_id)[0].id + " >div").length; s++) {
			if (($("#" + $("#" + distribution_id)[0].id + " >div")[s].id).replace('_', '') == obgect.id) {
				$('#'+distribution_id+'>div[id=_'+obgect.id+']').remove();
				$("#" + obgect.id).attr('bool', "false");
				$("#" + obgect.id).css("border", "4px solid #1A4176");
				bool=true;
			}
		}
	}else {
		utils.showHintPrompt("请选择组", false, true);
	}
	var d = 0;
	var name = $('#' + obgect.id).text();
	var width=0;
	 if(Postpone.Situation.Maximum>4&&Postpone.Situation.Maximum<=6){
		width=32;
	}else if(Postpone.Situation.Maximum<=4){
		width=48;
	}
	var _html = '<div style="border: 0px solid #1A4176;width:'+width+'%;margin-top:10px; height:80px;margin-left:1%;float:left;margin-top:5px;" id="_'+ obgect.id+ '" data-id="'+ obgect.id+ '"><span>'+ (name.replace('<br/>', '')).replace('(GB)', '').replace('(万人)','').replace('(%)', '') + '</span></div>';
	if (!utils.isStringEmpty(distribution_id)) {
		var f = $("#" + distribution_id + " >div").length;
		if (f < Postpone.Situation.Maximum) {
			if(bool==false){
				$("#" + distribution_id).append(_html);
				$("#" + obgect.id).css("border", "4px solid #9400D3");
				$("#" + obgect.id).attr('bool', "true");
			}
		} else {
			utils.showHintPrompt("一组最多只能有"+utils.Arabia_To_SimplifiedChinese(Postpone.Situation.Maximum)+"个", false, true);
		}
	} else {
		utils.showHintPrompt("请选择组", false, true);
	}
}
//添加组
function add_configuration_model(parameter){
	var s = $("#distribution_Modal_html >div").length;
	var id=$("#distribution_Modal_html >div");
	var arr={};
	for(var d=0;d<s;d++){
		arr[$("#distribution_Modal_html >div")[d].id.replace("distribution_Model_","")]=$("#distribution_Modal_html >div")[d].id
	}
	var grouping_length=Postpone.Situation.Maximumarr;
	if(s>=grouping_length){
		utils.showHintPrompt("分组最大不能超过"+utils.Arabia_To_SimplifiedChinese(grouping_length)+"个",false,true);
	}else{
		for(var r=0;r<grouping_length;r++){
			if(utils.isStringEmpty(arr[r])){
				var _html ='<div style="border: 4px solid #1A4176;border-radius:10px;height: auto;height: 200px; width: 475px;float:left;margin-left:20px;margin-bottom:10px;font-size: 24px;" bool="false" id="distribution_Model_'+r+'" onclick="distribution_Model_click(this)"><input type="text" class="form-control" id="_Model_'+(r+1)+'" value="标准组'+(r+1)+'"style="width: 70%;height:30px;border: 3px solid #1A4176;background-color: rgba(1,0,69,0.75) !important;margin-left: 5px;margin-top: 5px;color:#fff;font-size: 22px;"></div>';
				$("#distribution_Modal_html").append(_html);
				break;
			}
		}
	}
}
//删除组
function remove_configuration_model(parameter){
	var s = $("#distribution_Modal_html >div").length;
	if(!utils.isStringEmpty(distribution_id)){
		if(s>1){
			var f=$("#"+distribution_id+" >div").length;
			for(var h=0;h<f;h++){
				$("#"+$("#"+distribution_id+" >div")[h].id.replace('_', '')).attr('bool',"false")
				$("#"+$("#"+distribution_id+" >div")[h].id.replace('_', '')).css("border","4px solid #1A4176");
			}
			$("#"+distribution_id).remove();
			var t=$("#distribution_Modal_html >div").length;
		}
		distribution_id="";
	}else{
		/*if(s>1){
			var f=$("#"+$("#distribution_Modal_html >div")[s-1].id+" >div").length;
			for(var g=0;g<f;g++){
				$("#"+$("#"+$("#distribution_Modal_html >div")[s-1].id+" >div")[g].id.replace('_', '')).attr('bool',"false")
				$("#"+$("#"+$("#distribution_Modal_html >div")[s-1].id+" >div")[g].id.replace('_', '')).css("border","4px solid #1A4176");
			}	
			$("#"+$("#distribution_Modal_html >div")[s-1].id).remove();
			t=$("#distribution_Modal_html >div").length;
		}else{
			utils.showHintPrompt("分组最少不能低于1个",false,true);
		}*/
		utils.showHintPrompt("请选择组",false,true);
	}
}

//提交
function model_confirm(parameter){
	var parameter=parameter.id;
	var h=[];
	var s = $("#distribution_Modal_html >div").length;
	var ication=pmars.classification(parameter);
	var input_value=[];
	var j=0
	var arr={};
	for(var d=0;d<s;d++){
		arr[d+1]=$("#distribution_Modal_html >div >input")[d].id
	}
	var grouping_length=Postpone.Situation.Maximumarr;
	for(var a=0;a<s;a++){
		var d=$("#"+$("#distribution_Modal_html>div")[a].id+">div").length;
		if(d<Postpone.Situation.Maximum){
			if(d>0){
				for(var r=0;r<d;r++){
					h[j]=$("#"+$("#distribution_Modal_html>div")[a].id+">div")[r].id.replace('_Model_', '');j++
				}
				var k=Postpone.Situation.Maximum-d;
				for(var q=0;q<k;q++){
					h[j]="placeholder";j++
				}
			}
		}else{
			for(var f=0;f<d;f++){
				h[j]=$("#"+$("#distribution_Modal_html>div")[a].id+">div")[f].id.replace('_Model_', '');	
				j++;
			}	
		}
	 input_value[a+1]=$("#"+arr[a+1]).val();
	}
	var Cfg=Cache.Cfg
	if(Cfg.success){
		var M="";
		if(!utils.isStringEmpty(Cfg.data[pmars.phone()])){
			var Cfg=Cfg.data[pmars.phone()].content;
			var _Cfg=eval("("+Cfg+")");
			h[h.length]=$("#"+parameter+"_configuration_model_select").val();
			h[h.length]=input_value;
			if(parameter=="bz_ydyw"){
				 M ={_yd_Model:h,_left_Model:_Cfg._left_Model,_Model:_Cfg._Model,_jtyw_Model:_Cfg._jtyw_Model,_zywz_Model:_Cfg._zywz_Model,_zqyw_Model:_Cfg._zqyw_Model};	
			}else if(parameter=="bz_zywz"){
				 M ={_yd_Model:_Cfg._yd_Model,_left_Model:_Cfg._left_Model,_Model:_Cfg._Model,_jtyw_Model:_Cfg._jtyw_Model,_zywz_Model:h,_zqyw_Model:_Cfg._zqyw_Model};	
			}else if(parameter=="qw_zqyw"){
				 M ={_yd_Model:_Cfg._yd_Model,_left_Model:_Cfg._left_Model,_Model:_Cfg._Model,_jtyw_Model:_Cfg._jtyw_Model,_zywz_Model:_Cfg._zywz_Model,_zqyw_Model:h};	
			}else if(parameter=="qw_ydyw"){
				 M ={_yd_Model:_Cfg._yd_Model,_left_Model:_Cfg._left_Model,_Model:h,_jtyw_Model:_Cfg._jtyw_Model,_zywz_Model:_Cfg._zywz_Model,_zqyw_Model:_Cfg._zqyw_Model};	
			}else if(parameter=="qw_jtyw"){
				 M ={_yd_Model:_Cfg._yd_Model,_left_Model:_Cfg._left_Model,_Model:_Cfg._Model,_jtyw_Model:h,_zywz_Model:_Cfg._zywz_Model,_zqyw_Model:_Cfg._zqyw_Model};	
			}
		}else{
			h[h.length]=$("#"+parameter+"_configuration_model_select").val();
			h[h.length]=input_value;
			if(parameter=="bz_ydyw"){
				 M ={_yd_Model:h,_left_Model:"",_Model:"",_jtyw_Model:"",_zywz_Model:"",_zqyw_Model:""};	
			}else if(parameter=="bz_zywz"){
				M ={_yd_Model:"",_left_Model:"",_Model:"",_jtyw_Model:"",_zywz_Model:h,_zqyw_Model:""};	
			}else if(parameter=="qw_zqyw"){
				M ={_yd_Model:"",_left_Model:"",_Model:"",_jtyw_Model:"",_zywz_Model:"",_zqyw_Model:h};	
			}else if(parameter=="qw_ydyw"){
				M ={_yd_Model:"",_left_Model:"",_Model:h,_jtyw_Model:"",_zywz_Model:"",_zqyw_Model:""};	
			}else if(parameter=="qw_jtyw"){
				M ={_yd_Model:"",_left_Model:"",_Model:"",_jtyw_Model:h,_zywz_Model:"",_zqyw_Model:""};	
			}
		}
		cdm.getIsmAdu({content:JSON.stringify(M)}, function(Update) {
			if(Update.success){
				cdm.getIsmEaebmCfg({id:pmars.phone()}, function(Cfg) {
					Cache.Cfg=Cfg;
					utils.showSuccessPrompt("修改成功",false,true);
					$("#index_modal").modal('hide');
					if(parameter=="bz_ydyw"||parameter=="bz_zywz"){
						overviewleftyd[ication[3]]();
					}else if(parameter=="qw_zqyw"||parameter=="qw_ydyw"||parameter=="qw_jtyw"){
						overviewleft[ication[3]]();
					};});
			}else{
				utils.showErrPrompt("修改失败，请再次尝试修改",false,true);
				$("#index_modal").modal('hide');
			}
		});
	}
}
//取消
function model_close(){
	$("#index_modal").modal('hide');
}
//左移
function situation_left_click(parameter){
	var parameter=parameter.id;
	$('#'+parameter+'_left').attr('src',eastcom.baseURL+'/static/images/overview/L1.png');
	$('#'+parameter+'_right').attr('src',eastcom.baseURL+'/static/images/overview/R2.png');
	situation_left_slide(parameter);
	window.clearInterval(Situation[parameter]["Slide_"+parameter+"_time_remove"]);
	window.clearTimeout(Situation[parameter]["Slide_"+parameter+"_Timeout_remove"]);
    if(Situation[parameter].yd_Roll_bool==true){
    	Situation[parameter]["Slide_"+parameter+"_Timeout_remove"]=setTimeout(function() {
    		Situation[parameter]["Slide_"+parameter+"_time_remove"]=setInterval(function() {
        		situation_left_slide(parameter);
        		$('#'+parameter+'_left').attr('src',eastcom.baseURL+'/static/images/overview/L2.png');
        		$('#'+parameter+'_right').attr('src',eastcom.baseURL+'/static/images/overview/R2.png');
        	}, Situation[parameter].time);
    	}, 40000);	
    }
}
function situation_left_slide(parameter) {
	var bool = false;
	if (Situation[parameter].slidePosition == 1) {Situation[parameter].slidePosition--;bool = true;}
	if (Situation[parameter].slidePosition== 0) {Situation[parameter].slidePosition = Situation[parameter].data.length;$("#"+parameter+"_ul").css("left",(Situation[parameter].slidePosition + 1)* (parseInt($("#"+parameter+"_ul li")[0].style.width) * -1)+ "px");};
	var left_value = parseInt($("#"+parameter+"_ul")[0].style.left)+ (parseInt($("#"+parameter+"_ul li")[0].style.width));
	if (left_value < 0) {
		if ((left_value * -1) % parseInt($("#"+parameter+"_ul li")[0].style.width) == 0) {
			if (bool == false) {Situation[parameter].slidePosition--;}
			if($("#"+parameter+"_current_page_span").data("span")!=false){
	  			$("#"+parameter+"_current_page_span").html(Situation[parameter].slidePosition);	
	  		}
			if(Situation[parameter].display==true){
	  			$("#"+parameter+"_copy").css('display', 'none');;	
	  			$("#"+parameter).css('display', 'block');
	  			$("#"+parameter+"_div_span").html(Situation[parameter].span[Situation[parameter].slidePosition]);
	  		}
			$("#"+parameter+"_ul").animate({"left":left_value+"px"},700);
	  		$("#"+parameter+"_Grouping_span").html("--- "+Situation[parameter].name[Situation[parameter].slidePosition]);
		}
	}
}
//右移
function situation_right_click(parameter){
	var parameter=parameter.id;
	$('#'+parameter+'_left').attr('src',eastcom.baseURL+'/static/images/overview/L2.png');
	$('#'+parameter+'_right').attr('src',eastcom.baseURL+'/static/images/overview/R1.png');
	situation_right_slide(parameter);
    window.clearInterval(Situation[parameter]["Slide_"+parameter+"_time_remove"]);
    window.clearTimeout(Situation[parameter]["Slide_"+parameter+"_Timeout_remove"]);
    if(Situation[parameter].yd_Roll_bool==true){
    	Situation[parameter]["Slide_"+parameter+"_time_remove"]=setTimeout(function() {
        	Situation[parameter]["Slide_"+parameter+"_time_remove"]=setInterval(function() {
        		situation_right_slide(parameter);
        		$('#'+parameter+'_left').attr('src',eastcom.baseURL+'/static/images/overview/L2.png');
        		$('#'+parameter+'_right').attr('src',eastcom.baseURL+'/static/images/overview/R2.png');
        	}, Situation[parameter].time);
    	}, 40000);
    }
}
function  situation_right_slide(parameter){
	if(Situation[parameter].slidePosition==(Situation[parameter].data.length)){Situation[parameter].slidePosition=0;$("#"+parameter+"_ul").css("left","0px");}
    var left_value=parseInt($("#"+parameter+"_ul")[0].style.left)+(parseInt($("#"+parameter+"_ul li")[0].style.width)*-1);
    if(left_value<0){
	  	if((left_value*-1)%parseInt($("#"+parameter+"_ul li")[0].style.width)==0){
	  		Situation[parameter].slidePosition++;
	  		if($("#"+parameter+"_current_page_span").data("span")!=false){
	  			$("#"+parameter+"_current_page_span").html(Situation[parameter].slidePosition);	
	  		}
	  		if(Situation[parameter].display==true){
	  			$("#"+parameter+"_copy").css('display', 'none');;	
	  			$("#"+parameter).css('display', 'block');
	  			$("#"+parameter+"_div_span").html(Situation[parameter].span[Situation[parameter].slidePosition]);	
	  		}
	  		$("#"+parameter+"_ul").animate({"left":left_value+"px"},700);
	  		$("#"+parameter+"_Grouping_span").html("--- "+Situation[parameter].name[Situation[parameter].slidePosition]);
	  	}
    }
}