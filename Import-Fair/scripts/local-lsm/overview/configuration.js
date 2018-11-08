var distribution_id="";
var Postpone={};
var configuration = {
	init : function() {
		this.Weathers();
	},
	zywz_configuration:function(){
		
	},
	Jurisdiction:function(parameter,id,category,categoryName){
		var Jurisdiction={};
		Postpone.categoryName=categoryName;
		Jurisdiction.time=10000;
		Postpone.category=category;
		cdm.getIsmEaebmCfg({id:pmars.phone()}, function(Cfg) {
			if(!utils.isStringEmpty(Cfg.data[pmars.phone()])){
				var _id=[];
				var Cfg=Cfg.data[pmars.phone()].content;
				var _Cfg=eval("("+Cfg+")");
				if(!utils.isStringEmpty(_Cfg[parameter])){
					try {
						_isStringEmpty=(_Cfg[parameter]).split(",");
						for(var f=0;f<_isStringEmpty.length-1;f++){
							_id[f]=_isStringEmpty[f];
						}
						Jurisdiction.name=["","标准组1", "标准组2", "标准组3", "标准组4", "标准组5","标准组6"];
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
							overviewleftyd[categoryName](_id,Jurisdiction);
						}else{
							overviewleft[categoryName](_id,Jurisdiction);
						}
					}else{
						Jurisdiction.name=["","标准组1", "标准组2", "标准组3", "标准组4", "标准组5","标准组6"];
						Jurisdiction.id=id;
						if(category=="jb"){
							overviewleftyd[categoryName](id,Jurisdiction);
						}else{
							overviewleft[categoryName](id,Jurisdiction);
						}
					}
				}else{
					Jurisdiction.name=["","标准组1", "标准组2", "标准组3", "标准组4", "标准组5","标准组6"];
					Jurisdiction.id=id;
					if(category=="jb"){
						overviewleftyd[categoryName](id,Jurisdiction);
					}else{
						overviewleft[categoryName](id,Jurisdiction);
					}
				}
			}else{
				Jurisdiction.name=["","标准组1", "标准组2", "标准组3", "标准组4", "标准组5","标准组6"];
				Jurisdiction.id=id;
				if(category=="jb"){
					overviewleftyd[categoryName](id,Jurisdiction);
				}else{
					overviewleft[categoryName](id,Jurisdiction);
				}
			};
		});
	},
	model:function(id,htmlStr){
		var html="";
			html+='<div class="modal-dialog" style="width: 1600px; height:900px; margin: 20px auto;">';
			html+='<div class="modal-header"><h4 class="modal-title" style="font-size:40px"><span>指标配置</span></h4></div>';
			html+='<div class="modal-content"style="margin-top:20px">';
			html+='<div style="margin-top:20px;">';
			html+='<div style="margin-left:20px;width:300px;height:50px"><div style="width:150px"><span style="font-size:20px">轮播周期:</span></div><select class="form-control" style="width:150px;height:50px;margin-top: -40px;margin-left: 120px;background-color: rgba(1,0,69,0.75) !important;color: #fff;" id="'+id+'_configuration_model_select"><option>5</option ><option  selected = "selected">10</option><option>15</option><option>20</option></select></div>';
			html+='<div style="margin-left:400px;width:300px;height:50px;margin-top: -50px;"><button type="button" class="btn btn-lg btn-primary" style="height: 50px;margin-right:20px;margin-bottom:20px;" onclick="add_configuration_model('+id+')">添加组</button><button type="button" class="btn btn-default btn-lg" style="margin-bottom:20px;height: 50px;background-color: rgba(250, 250, 250, 1) !important;color:#000" id="'+id+'_remove_configuration_model" onclick="remove_configuration_model('+id+')">删除组</button></div></div>';
			html+='<div class="modal-body" id="_configuration_modal_body" style="height:900px;border: solid 1px #2431ac;background-color: rgba(0,4,66,0.75);border-radius: 15px;margin-top:20px">'+htmlStr+'</div>';
			html+='<div style="margin-top:20px">';
			html+='<button type="button" class="btn btn-lg btn-primary" style="margin-left:40%;margin-right:20px;margin-bottom:20px;font-size:30px" onclick="model_confirm('+id+')">确认</button>';
			html+='<button type="button" class="btn btn-default btn-lg" style="margin-bottom:20px;font-size:30px;background-color: rgba(250, 250, 250, 1) !important;color:#000" onclick="model_close()">取消</button></div></div></div>';
			document.getElementById("index_modal").innerHTML = html;
	},
	Assemble:function(Situation,id){
		Postpone={};
		Postpone.parameter=id;
		Postpone.Situation=Situation[id];
		var _isStringEmpty=Situation[id]._isStringEmpty;
		var length=_isStringEmpty.data.length;
		var grouping=_isStringEmpty.data.grouping;
		var isStringEmpty=_isStringEmpty.yl;
		var parameter=eval("("+pmars[pmars.classification(id)[0]]()+")");
		var attribute=pmars.classification(id)[1];
		var shield=pmars.classification(id)[2];
		var html='';
		var _html='';
		var count=0;
		var height=420;
		var _json={};
		var ydyw_span_time="";
		if(!utils.isStringEmpty(_isStringEmpty)){
			cdm.getIsmEaebmCfg({id:pmars.phone()}, function(Cfg) {
				if(Cfg.success){
					if(!utils.isStringEmpty(Cfg.data[pmars.phone()])){
						var Cfg=Cfg.data[pmars.phone()].content;
						var _Cfg=eval("("+Cfg+")");
						if(!utils.isStringEmpty(_Cfg[attribute])){
							try {
								_isStringEmpty_lenght=(_Cfg[attribute]).split(",");
								span_name=["","标准组1", "标准组2", "标准组3", "标准组4", "标准组5"];
								ydyw_span_time=_Cfg[attribute][(_Cfg[attribute]).length-1];
							} catch(e) {
								span_name=_Cfg[attribute][(_Cfg[attribute]).length-1];
								ydyw_span_time=_Cfg[attribute][(_Cfg[attribute]).length-2];
							}
						}else{
							span_name=["","标准组1", "标准组2", "标准组3", "标准组4", "标准组5"];
							ydyw_span_time=Situation[id].time;
						}
						$("#"+id+"_zbpz_select").val(ydyw_span_time).change();
						for(var d=0;d<length;d++){
							var Initialize='';
							var width=0;
							if(grouping[d]>4&&grouping[d]<=6){width=32;}else if(grouping[d]<=4){width=48;}
							for(var f=0;f<grouping[d];f++){
								if(utils.isStringEmpty(pmars[shield]()[isStringEmpty[count].id])){
									Initialize +='<div style="border: 0px solid #1A4176;width:'+width+'%;margin-top:10px; height:38%;margin-left:1%;float:left;margin-top:5px;" bool="false" id="_Model_'+isStringEmpty[count].id+'" ><span>'+parameter[isStringEmpty[count].id].auxiliary+'</span></div>';
									if(count<_isStringEmpty.length){
										_isStringEmpty[count].bool=true;
									}
									_json[isStringEmpty[count].id]=isStringEmpty[count].id;
									count++;
								}
							}
							html +='<div style="border: 4px solid #1A4176;border-radius:10px;height: auto;height: 200px; width: 432px;float:left;margin-left:20px;margin-bottom:10px"  bool="true" onclick="distribution_Model_click(this)" id="distribution_Model_'+d+'"><input type="text" class="form-control" id="_Model_'+(d+1)+'" value="'+span_name[(d+1)]+'"style="width: 70%;height:30px;border: 3px solid #1A4176;background-color: rgba(1,0,69,0.75) !important;margin-left: 5px;margin-top: 5px;color:#fff">'+Initialize+'</div>';
						}
						height=420;
					}else{
						span_name=["","标准组1", "标准组2", "标准组3", "标准组4", "标准组5"];
						for(var d=0;d<length;d++){
							var Initialize='';
							var width=0;
							if(grouping[d]>4&&grouping[d]<=6){width=32;}else if(grouping[d]<=4){width=48;}
							for(var f=0;f<grouping[d];f++){
								if(utils.isStringEmpty(pmars._shield()[_isStringEmpty[count].id])){
									Initialize +='<div style="border: 0px solid #1A4176;width:'+width+'%;margin-top:10px; height:38%;margin-left:1%;float:left;margin-top:5px;" bool="false" id="_Model_'+_isStringEmpty[count].id+'" ><span>'+parameter[_isStringEmpty[count].id].auxiliary+'</span></div>'
									if(count<_isStringEmpty.length){
										_isStringEmpty[count].bool=true;
									}
									_json[_isStringEmpty[count].id]=_isStringEmpty[count].id;
									count++;
								}
							}
							html +='<div style="border: 4px solid #1A4176;border-radius:10px;height: auto;height: 200px; width: 432px;float:left;margin-left:30px;margin-bottom:10px"  bool="true" onclick="distribution_Model_click(this)" id="distribution_Model_'+d+'"><input type="text" class="form-control" id="_Model_'+(d+1)+'" value="'+span_name[(d+1)]+'"style="width: 70%;height:30px;border: 3px solid #1A4176;background-color: rgba(1,0,69,0.75) !important;margin-left: 5px;margin-top: 5px;color:#fff">'+Initialize+'</div>';
						}
						height=420;
					};
					for(var s=0;s<_isStringEmpty.length;s++){
						if(!utils.isStringEmpty(_json[_isStringEmpty[s].id])){
							if(utils.isStringEmpty(pmars._shield()[_isStringEmpty[s].id])){
								_html += '<div style="border: 4px solid #fff;margin-top:10px;border-radius:10px;height: auto;height: 100px; width:155px;float:left;margin-left:20px" bool="true" id="Model_'+_isStringEmpty[s].id+'"  onclick="distribution_Model(this);">'+parameter[_isStringEmpty[s].id].auxiliary+'</div>';
							}
						}else{
							if(utils.isStringEmpty(pmars._shield()[_isStringEmpty[s].id])){
								_html += '<div style="border: 4px solid #1A4176;margin-top:10px;border-radius:10px;height: auto;height: 100px; width:155px;float:left;margin-left:20px" bool="false" id="Model_'+_isStringEmpty[s].id+'" onclick="distribution_Model(this);">'+parameter[_isStringEmpty[s].id].auxiliary+'</div>';
							}
						}
					}
				}
				var htmlStr='<div id="'+id+'_zbpz_Modal" style="height: 900px; width: 1530px"><div style="height:'+height+'px;width:1440px;margin-top:20px;margin-left:60px" id="distribution_Modal_html">'+html+'</div><div style="margin-top:10px;margin-left:60px">'+_html+'</div></div>';
				configuration.model(id,htmlStr);
			});
		};
	}
}
function  img_onmouseover(parameter){
	$('#'+parameter+'_img').css('visibility','visible');
}
function  img_mouseout(parameter){
	$('#'+parameter+'_img').css('visibility','hidden');
}
function  Roll_img_ydyw_onmouseover(parameter){
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
	var grouping_length=Postpone.Situation.Maximumarr;
	if(s>=grouping_length){
		utils.showHintPrompt("分组最大不能超过"+utils.Arabia_To_SimplifiedChinese(grouping_length)+"个",false,true);
	}else{
		var length=s+1;
		var _html ='<div style="border: 4px solid #1A4176;border-radius:10px;height: auto;height: 200px; width: 432px;float:left;margin-left:30px;margin-bottom:10px" bool="false" id="distribution_Model_'+s+'" onclick="distribution_Model_click(this)"><input type="text" class="form-control" id="_Model_'+s+'" value="标准组'+(length)+'"style="width: 70%;height:30px;border: 3px solid #1A4176;background-color: rgba(1,0,69,0.75) !important;margin-left: 5px;margin-top: 5px;color:#fff"></div>';
		$("#distribution_Modal_html").append(_html);
	}
}
//删除组
function remove_configuration_model(parameter){
	if(!utils.isStringEmpty(distribution_id)){
		var s = $("#distribution_Modal_html >div").length;
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
		utils.showHintPrompt("请选择组", false, true);
	}
}

//提交
function model_confirm(parameter){
	var parameter=parameter.id;
	var h=[];
	var s = $("#distribution_Modal_html >div").length;
	var input_value=[];
	var j=0
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
		input_value[a+1]=$("#_Model_"+(a+1)).val();
	}
	cdm.getIsmEaebmCfg({id:pmars.phone()}, function(Cfg) {
		if(Cfg.success){
			if(!utils.isStringEmpty(Cfg.data[pmars.phone()])){
			var Cfg=Cfg.data[pmars.phone()].content;
			var _Cfg=eval("("+Cfg+")");
			h[h.length]=$("#"+parameter+"_configuration_model_select").val();
			h[h.length]=input_value;
			var M="";
			
			if(parameter=="zywz"){
				 M ={_yd_Model:_Cfg._yd_Model,_left_Model:_Cfg._left_Model,_Model:_Cfg._Model,_jtyw_Model:_Cfg._jtyw_Model,_zywz_Model:h,_zqyw_Model:_Cfg._zqyw_Model};	
			}else 	if(parameter=="zqyw"){
				 M ={_yd_Model:_Cfg._yd_Model,_left_Model:_Cfg._left_Model,_Model:_Cfg._Model,_jtyw_Model:_Cfg._jtyw_Model,_zywz_Model:_Cfg._zywz_Model,_zqyw_Model:h};	
			}
			cdm.getIsmUpdate({content:JSON.stringify(M)}, function(Update) {
				if(Update.success){
					utils.showSuccessPrompt("修改成功",false,true);
					$("#index_modal").modal('hide');
					if(Postpone.category=="jb"){
						overviewleftyd[parameter]();
					}else{
						overviewleft[parameter]();
					}
				}else{
					utils.showErrPrompt("修改失败，请再次尝试修改",false,true);
					$("#index_modal").modal('hide');
				}
			});
			}else{
				h[h.length]=$("#"+parameter+"_configuration_model_select").val();
				h[h.length]=input_value;
				var M="";
				if(parameter=="zywz"){
					 M ={_yd_Model:"",_left_Model:"",_Model:"",_jtyw_Model:"",_zywz_Model:h,_zqyw_Model:""};	
				}else 	if(parameter=="zqyw"){
					M ={_yd_Model:"",_left_Model:"",_Model:"",_jtyw_Model:"",_zywz_Model:"",_zqyw_Model:h};	
				}
				cdm.getIsmInsert({content:JSON.stringify(M)}, function(Insert) {
					if(Insert.success){
						utils.showSuccessPrompt("添加成功",false,true);
						$("#index_modal").modal('hide');
						if(Postpone.category=="jb"){
							overviewleftyd[parameter]();
						}else{
							overviewleft[parameter]();
						}
					}else{
						utils.showErrPrompt("添加失败，请再次尝试添加",false,true);
						$("#index_modal").modal('hide');
					}
					window.clearInterval(Postpone.Situation[parameter]["Slide_"+parameter+"_time_remove"]);
				});
			}
		}
	});
}
//取消
function model_close(){
	$("#index_modal").modal('hide');
}