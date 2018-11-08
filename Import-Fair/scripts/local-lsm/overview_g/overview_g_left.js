var cdm = LSMScreen.CacheDataManager.getInstance();
var Situation={};//全局变量
/*
 *  Situation 含义
 *  Situation.xxxx 指定json名字 对应其数据名字
 *  name：分组名字
 *  time：滚不时间
 *  original:原始
 *  source:数据库
 *  slidePosition：当前页码
 *  Roll_bool：是否开启滚动
 *  Maximum：一组最大的数
 *  Maximumarr：数组的个数
 *  classification:指标分类
 *  ecarts_model_id：默认放大趋势id
 *  ecarts_model_time：默认放大趋势时间
 *  ecarts_bool:获取趋势是否执行完
 *  trend：趋势数据
 *  
 */
var overview_g_left = {
	init : function() {
		configuration.IsmEaebmCfg("_g", "caching");
	},
	caching: function(bool) {
        if (bool == true) {
        	overview_g_left.cache();
        }
    },
    cache: function() {
    	click();
    	overview_g_left.ydyw_g();
    	overview_g_left.Ecarts();
    	overview_g_left.wirelessss();
    	overview_g_left.ThresCfg();
		Situation.ThresCfg={};
		Situation.ThresCfg.bool=false;
	    Situation.wirelessquality_bool=true;
	    setInterval(function() {overview_g_left.ydyw_g();}, 200000);
	    setInterval(function() {overview_g_left.Ecarts();}, 3000000);
	    setInterval(function() {
	    	if(Situation.wirelessquality_bool==true){overview_g_left.wirelessss();}
	    	else if(Situation.wirelessquality_bool==false){overview_g_left.Core();}}, 200000);
    },
    ydyw_g:function(){
		Situation.qw_ydyw_g={};
		Situation.qw_ydyw_g.classification={};
		var parameter=eval("("+pmars.Left_name_g()+")");
		var parameter_name=utils.getJsonName(parameter);
		var result_id=[];var kpi_id=[];var gsm_id=[];var In_id=[];var Pro_id=[];var Intl_id=[];
		var a=0;var b=0;var c=0;var d=0;var e=0;var f=0;
		var id=[];var toshieldnumber=0;
		for(var pm=0;pm<parameter_name.length;pm++){
			if(parameter[parameter_name[pm]].ascription=="1"&&utils.isStringEmpty(pmars.shield_g()[parameter[parameter_name[pm]].id])){
				result_id[a]=parameter_name[pm];a++;
				Situation.qw_ydyw_g.classification.ecarts_result_id=result_id;
			}else if(parameter[parameter_name[pm]].ascription=="2"&&utils.isStringEmpty(pmars.shield_g()[parameter[parameter_name[pm]].id])){
				kpi_id[b]=parameter_name[pm];b++;
				Situation.qw_ydyw_g.classification.ecarts_kpi_id=kpi_id;
			}else if(parameter[parameter_name[pm]].ascription=="3"&&utils.isStringEmpty(pmars.shield_g()[parameter[parameter_name[pm]].id])){
				gsm_id[c]=parameter_name[pm];c++;
				Situation.qw_ydyw_g.classification.ecarts_gsm_id=gsm_id;
			}else if(parameter[parameter_name[pm]].ascription=="4"&&utils.isStringEmpty(pmars.shield_g()[parameter[parameter_name[pm]].id])){
				In_id[d]=parameter_name[pm];d++;
				Situation.qw_ydyw_g.classification.ecarts_In_id=In_id;
			}else if(parameter[parameter_name[pm]].ascription=="5"&&utils.isStringEmpty(pmars.shield_g()[parameter[parameter_name[pm]].id])){
				Pro_id[e]=parameter_name[pm];e++;
				Situation.qw_ydyw_g.classification.ecarts_Pro_id=Pro_id;
			}else if(parameter[parameter_name[pm]].ascription=="6"&&utils.isStringEmpty(pmars.shield_g()[parameter[parameter_name[pm]].id])){
				Intl_id[f]=parameter_name[pm];f++;
				Situation.qw_ydyw_g.classification.ecarts_Intl_id=Intl_id;
			}
			if(utils.isStringEmpty(pmars.shield_g()[parameter_name[pm]])){
				id[toshieldnumber]=parameter_name[pm];
				toshieldnumber++;
			}
		}
		var length=parseInt(parseInt(id.length)/6);
		(parseInt(id.length)%6==0)? length:length++;
		Situation.qw_ydyw_g.Maximumarr=length;
		configuration.Jurisdiction("_ydyw_g_Model",id,"_g","ydyw_g_div");
	},
	ydyw_g_div: function(Jurisdiction) {
		var id=Jurisdiction.id;
		Situation.qw_ydyw_g.name=Jurisdiction.name;
		Situation.qw_ydyw_g.time=Jurisdiction.time;
		Situation.qw_ydyw_g.Roll_bool=false;
		Situation.qw_ydyw_g.slidePosition=1;
		Situation.qw_ydyw_g.Maximum=6;
		var parameter=eval("("+pmars.Left_name_g()+")");
		var base={};
		var bool=[];
		cdm.getIsmAllltewg({}, function(result) {
			if (result.success) {
				var h=0;
				var ecarts_result_id_json={};
				for(var d1=0;d1<Situation.qw_ydyw_g.classification.ecarts_result_id.length;d1++){
					ecarts_result_id_json[Situation.qw_ydyw_g.classification.ecarts_result_id[d1]]=Situation.qw_ydyw_g.classification.ecarts_result_id[d1];
				}
				for(var d=0;d<id.length;d++){
					if(!utils.isStringEmpty(parameter[id[d]])&&!utils.isStringEmpty(ecarts_result_id_json[id[d]])&&utils.isStringEmpty(pmars.shield()[id[d]])){
						if(utils.isStringEmpty(result.data[id[d]])){
							base[id[d]]={id:id[d],name:parameter[id[d]],value:"---",hb:"---",tb:"---",time:result.data.time};h++;
						}else{
							base[id[d]]={id:id[d],name:parameter[id[d]],value:result.data[id[d]],hb:result.data[id[d]+"hb"],tb:result.data[id[d]+"tb"],time:result.data.time};h++;
						}
					}
				}
				bool[0]=true;
			}
		});
		cdm.getIsmallkpi({}, function(kpi) {
			if (kpi.success) {
				var h=0;
				var ecarts_kpi_id_json={};
				for(var d2=0;d2<Situation.qw_ydyw_g.classification.ecarts_kpi_id.length;d2++){
					ecarts_kpi_id_json[Situation.qw_ydyw_g.classification.ecarts_kpi_id[d2]]=Situation.qw_ydyw_g.classification.ecarts_kpi_id[d2];
				}
				for(var d=0;d<id.length;d++){
					if(!utils.isStringEmpty(parameter[id[d]])&&!utils.isStringEmpty(ecarts_kpi_id_json[id[d]])&&utils.isStringEmpty(pmars.shield()[id[d]])){
						if(utils.isStringEmpty(kpi.data[id[d]])){
							base[id[d]]={id:id[d],name:parameter[id[d]],value:"---",hb:"---",tb:"---",time:kpi.data.time};h++;
						}else{
							if(id[d]=="s_263"){
								base[id[d]]={id:id[d],name:parameter[id[d]],value:(kpi.data.s_091-kpi.data.s_019-kpi.data.s_262),hb:(kpi.data.s_091hb-kpi.data.s_019hb-kpi.data.s_262hb),tb:(kpi.data.s_091tb-kpi.data.s_019tb-kpi.data.s_262tb),time:kpi.data.time};
							}else{
								base[id[d]]={id:id[d],name:parameter[id[d]],value:kpi.data[id[d]],hb:kpi.data[id[d]+"hb"],tb:kpi.data[id[d]+"tb"],time:kpi.data.time};
							}
							h++;
						}
					}
				}
				bool[1]=true;
			}
		});
		cdm.getIsmAllgsmwg({}, function(gsm) {
			var h=0;
			var ecarts_gsm_id_json={};
			for(var d3=0;d3<Situation.qw_ydyw_g.classification.ecarts_gsm_id.length;d3++){
				ecarts_gsm_id_json[Situation.qw_ydyw_g.classification.ecarts_gsm_id[d3]]=Situation.qw_ydyw_g.classification.ecarts_gsm_id[d3];
			}
			for(var d=0;d<id.length;d++){
				if(!utils.isStringEmpty(parameter[id[d]])&&!utils.isStringEmpty(ecarts_gsm_id_json[id[d]])&&utils.isStringEmpty(pmars.shield()[id[d]])){
					if(utils.isStringEmpty(gsm.data[id[d]])){
						base[id[d]]={id:id[d],name:parameter[id[d]],value:"---",hb:"---",tb:"---",time:gsm.data.time};h++;
					}else{
						base[id[d]]={id:id[d],name:parameter[id[d]],value:gsm.data[id[d]],hb:gsm.data[id[d]+"hb"],tb:gsm.data[id[d]+"tb"],time:gsm.data.time};h++;
					}
				}
			}
			bool[2]=true;
		});
		var original_id=utils.getJsonName(parameter);
		var toshield=[];
		var toshieldnumber=0;
		for(var q=0;q<original_id.length;q++){
			if(utils.isStringEmpty(pmars.shield()[original_id[q]])){
				toshield[toshieldnumber]=original_id[q];toshieldnumber++;
			}
		}
		Situation.qw_ydyw_g.ecarts_base_model=setInterval(function() {
			var t=0
			for(var e=0;e<bool.length;e++){
				if(bool[e]==true){t++;}
			}
			if(t>=3){
				var base1=base;
				base=[];
				for(var q=0;q<id.length;q++){if(utils.isStringEmpty(pmars.shield_g()[id[q]])){base[id[q]]=base1[id[q]];}}
				var base_name=utils.getJsonName(base);
				Situation.ecarts_model_id=base_name[0];
				Situation.ecarts_model_time=base[base_name[0]].time;
				window.clearInterval(Situation.qw_ydyw_g.ecarts_base_model);
				var k=parseInt(parseInt(id.length)/6);
				(parseInt(id.length)%6==0)? k:k++;
				var q=[];
				var x=0;
				var j=0;
				var arr=0;
				var u="";
				for (var h=0;h<k;h++){
					h<parseInt(parseInt(id.length)/6)?q[h]=6:q[h]=parseInt(id.length)%6;
					arr=q[h];
					for(var n=0;n<arr;n++){
						if(!utils.isStringEmpty(pmars.shield_g()[id[x]])){q[h]=q[h]-1;}x++;
					}
				}
				var source=[];
				var sourcelength=0;
				for(var d=0;d<id.length;d++){
					if(!utils.isStringEmpty(base[id[d]])&&utils.isStringEmpty(pmars.shield_g()[id[d]])){
						source[sourcelength]=base[id[d]];sourcelength++;
					}
				}
				Situation.qw_ydyw_g.source=source;
				Situation.qw_ydyw_g.original=toshield;
				Situation.qw_ydyw_g.data={length:k,grouping:q};
				for(var g=0;g<k;g++){
					var html = '';
					for (var c=0;c<q[g];c++){
						var right=10;
						var top1=-70;
						var ydyw_img="";
						var margin=20;
						var color="#da6d6d";
						var display="";
						var data_color="";
						var _class="";
						var _class_span="";
						var _margin_right=12;
						var color2 = "#66E6FF";
						var min1 = 100;
                        var max1 = 150;
                        var min2 = 50;
                        var max2 = 100;
						var array=parameter[source[j].id];
						var proportion=pmars.proportion(array.company,source[j].value,source[j].hb);//获取当前的环比
						var value_auxiliary=pmars.conversion(array.company,source[j].value);//格式当信息
						 var classification = eval("(" + pmars.classification_all() + ")")[source[j].id];
	                        if (parameter[source[j].id].Tparticle > 59) {
	                            ThresCfgName_time = "小时";
	                        } else {
	                            ThresCfgName_time = parameter[source[j].id].Tparticle + "分钟";
	                        }
	                        var ThresCfgName = "[" + classification.classification + "]-[" + classification.name + "]-[" + ThresCfgName_time + "]-[" + classification.Belonged + "]";
	                        var level = Situation.ThresCfg[ThresCfgName];
	                        if (!utils.isStringEmpty(level)) {
	                            if (!utils.isStringEmpty(level.level_1)) {
	                                var Section1 = level.level_1.split(",");
	                                if (Section1.length > 1) {
	                                    min1 = parseInt(Section1[0].replace(/[^0-9]/ig, ""));
	                                    max1 = parseInt(Section1[1].replace(/[^0-9]/ig, ""));
	                                    if (utils.isStringEmpty(min1)) {
	                                        min1 = -1;
	                                    }
	                                    if (utils.isStringEmpty(max1)) {
	                                        max1 = 999999;
	                                    }
	                                }
	                            }
	                            if (!utils.isStringEmpty(level.level_2)) {
	                                var Section2 = level.level_2.split(",");
	                                if (Section2.length > 1) {
	                                    min2 = parseInt(Section2[0].replace(/[^0-9]/ig, ""));
	                                    max2 = parseInt(Section2[1].replace(/[^0-9]/ig, ""));
	                                    if (utils.isStringEmpty(min2)) {
	                                        min2 = -1;
	                                    }
	                                    if (utils.isStringEmpty(max2)) {
	                                        max2 = 999999;
	                                    }
	                                }
	                            }
	                            if (!utils.isStringEmpty(level.level_3)) {
	                                var Section3 = level.level_3.split(",");
	                                if (Section3.length > 1) {
	                                    min3 = parseInt(Section3[0].replace(/[^0-9]/ig, ""));
	                                    max3 = parseInt(Section3[1].replace(/[^0-9]/ig, ""));
	                                    if (utils.isStringEmpty(min3)) {
	                                        min3 = -1;
	                                    }
	                                    if (utils.isStringEmpty(max3)) {
	                                        max3 = 999999;
	                                    }
	                                }
	                            }
	                            if (!utils.isStringEmpty(level.level_4)) {
	                                var Section4 = level.level_4.split(",");
	                                if (Section4.length > 1) {
	                                    min4 = parseInt(Section4[0].replace(/[^0-9]/ig, ""));
	                                    max4 = parseInt(Section4[1].replace(/[^0-9]/ig, ""));
	                                    if (utils.isStringEmpty(min4)) {
	                                        min4 = -1;
	                                    }
	                                    if (utils.isStringEmpty(max4)) {
	                                        max4 = 999999;
	                                    }
	                                }
	                            }
	                        };
	                        if (!utils.isStringEmpty(level)&&level.thres_type == "区间") {
	                            if (proportion.bool == 0) {
	                                if (min2 <= value_auxiliary && value_auxiliary < max2) {
	                                    ydyw_img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/orange.png";
	                                    color = "#FF8C00";
	                                    color2= "#FF8C00";
	                                    _class = "";
	                                    _class_span = "";
	                                } else if (min1 <= value_auxiliary && value_auxiliary < max1) {
	                                    ydyw_img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/red2.png";
	                                    color = "#da6d6d";
	                                    color2= "#da6d6d";
	                                    _class = "";
	                                    _class_span = "";
	                                } else {
	                                    ydyw_img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/green.png";
	                                    color = "#00FF00";
	                                    color2= "#66E6FF";
	                                    _class = "";
	                                    _class_span = "";
	                                }
	                            } else if (proportion.bool == 1) {
	                                if (min2 <= value_auxiliary && value_auxiliary < max2) {
	                                    ydyw_img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/orange.png";
	                                    color = "#FF8C00";
	                                    color2= "#FF8C00";
	                                    _class = "rotate";
	                                    _class_span = "rotate_span";
	                                } else if (min1 <= value_auxiliary && value_auxiliary < max1) {
	                                    ydyw_img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/red2.png";
	                                    color = "#da6d6d";
	                                    color2= "#da6d6d";
	                                    _class = "rotate";
	                                    _class_span = "rotate_span";
	                                } else {
	                                    ydyw_img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/green.png";
	                                    color = "#00FF00";
	                                    color2= "#66E6FF";
	                                    _class = "rotate";
	                                    _class_span = "rotate_span";
	                                }
	                            } else{
	                                    ydyw_img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/green.png";
	                                    color = "#00FF00";
	                                    color2= "#66E6FF";
	                                    _class = "";
	                                    _class_span = "";
	                                    display = "none"
	                            }          
	                        }else if(!utils.isStringEmpty(level)&&level.thres_type == "波动"){
	                        	 if (proportion.bool == 0) {
	                                 if (min2 <= proportion.value_auxiliary && proportion.value_auxiliary < max2) {
	                                     ydyw_img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/orange.png";
	                                     color = "#FF8C00";
	                                     color2= "#FF8C00";
	                                     _class = "";
	                                     _class_span = "";
	                                 } else if (min1 <= proportion.value_auxiliary && proportion.value_auxiliary < max1) {
	                                     ydyw_img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/red2.png";
	                                     color = "#da6d6d";
	                                     color2= "#da6d6d";
	                                     _class = "";
	                                     _class_span = "";
	                                 } else {
	                                     ydyw_img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/green.png";
	                                     color = "#00FF00";
	                                     color2= "#66E6FF";
	                                     _class = "";
	                                     _class_span = "";
	                                 }
	                             } else if (proportion.bool == 1) {
	                                 if (min2 <= proportion.value_auxiliary && proportion.value_auxiliary < max2) {
	                                     ydyw_img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/orange.png";
	                                     color = "#FF8C00";
	                                     color2= "#FF8C00";
	                                     _class = "rotate";
	                                     _class_span = "rotate_span";
	                                 } else if (min1 <= proportion.value_auxiliary && proportion.value_auxiliary < max1) {
	                                     ydyw_img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/red2.png";
	                                     color = "#da6d6d";
	                                     color2= "#da6d6d";
	                                     _class = "rotate";
	                                     _class_span = "rotate_span";
	                                 } else {
	                                     ydyw_img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/green.png";
	                                     color = "#00FF00";
	                                     color2= "#66E6FF";
	                                     _class = "rotate";
	                                     _class_span = "rotate_span";
	                                 }
	                             } else{
	                                     ydyw_img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/green.png";
	                                     color = "#00FF00";
	                                     color2= "#66E6FF";
	                                     _class = "";
	                                     _class_span = "";
	                                     display = "none";
	                             } 
	                        }else{
	                        	 if (proportion.bool == 0) {
	                                 if (min2 <= proportion.value_auxiliary && proportion.value_auxiliary < max2) {
	                                     ydyw_img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/orange.png";
	                                     color = "#FF8C00";
	                                     color2= "#FF8C00";
	                                     _class = "";
	                                     _class_span = "";
	                                 } else if (min1 <= proportion.value_auxiliary && proportion.value_auxiliary < max1) {
	                                     ydyw_img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/red2.png";
	                                     color = "#da6d6d";
	                                     color2= "#da6d6d";
	                                     _class = "";
	                                     _class_span = "";
	                                 } else {
	                                     ydyw_img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/green.png";
	                                     color = "#00FF00";
	                                     color2= "#66E6FF";
	                                     _class = "";
	                                     _class_span = "";
	                                 }
	                             } else if (proportion.bool == 1) {
	                                 if (min2 <= proportion.value_auxiliary && proportion.value_auxiliary < max2) {
	                                     ydyw_img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/orange.png";
	                                     color = "#FF8C00";
	                                     color2= "#FF8C00";
	                                     _class = "rotate";
	                                     _class_span = "rotate_span";
	                                 } else if (min1 <= proportion.value_auxiliary && proportion.value_auxiliary < max1) {
	                                     ydyw_img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/red2.png";
	                                     color = "#da6d6d";
	                                     color2= "#da6d6d";
	                                     _class = "rotate";
	                                     _class_span = "rotate_span";
	                                 } else {
	                                     ydyw_img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/green.png";
	                                     color = "#00FF00";
	                                     color2= "#66E6FF";
	                                     _class = "rotate";
	                                     _class_span = "rotate_span";
	                                 }
	                             } else{
	                                     ydyw_img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/green.png";
	                                     color = "#00FF00";
	                                     color2= "#66E6FF";
	                                     _class = "";
	                                     _class_span = "";
	                                     display = "none";
	                             } 
	                        };
						if((value_auxiliary+"").length<=3){top1=10;}
						if(c==2||c==5){
							_margin_right=0;
						}
						html += '<div style="position: relative;width:304px;height:110px;cursor: pointer;margin-top:16px;margin-right:'+_margin_right+'px;border-radius:5px; background-color: rgba(0, 102, 255, 0.35);float:left" onmouseout ="mouseout(this)" id="'+source[j].id+'" data-uname="'+source[j].id+'">\
							<div style="display: inline-block;line-height: 30px;width:200px;float:left;margin-top:10px;margin-left: 20px;text-align: left;"><span style="font-size:20px;">'+source[j].name.text+'</span></div>\
							<div style="float:right;position: relative;top:'+top1+'px;margin-right:20px;color:'+color2+';" id="'+source[j].id+'_span"><span style="font-size: 40px;"  onmouseover="ydyw_onmouseover(this);" id="'+source[j].id+'_span"  data-color="ydyw_suspension_'+c+'">'+value_auxiliary+'</span></div>\
							<div style="float:right;position: absolute;top: 55px;right: 10px;color:'+color+'"><img src="'+ydyw_img+'" style="width:18px;height:18px;margin-top: 4px;display:'+display+'"  class="'+_class+'"><span style="font-size: 22px;">'+proportion.value+'</span></div>\
							</div>\
							';
						j++;
					}	
					u+='<li class="carousel-item">'+html+'</li>'
				}
				var htmlStr='<ul class="carousel-inner" id="qw_ydyw_g_ul" style="height:260px">'+u+'</ul>'
				$("#qw_ydyw_g").empty();
				document.getElementById("qw_ydyw_g").innerHTML = htmlStr;
				$("#carousel_1").FtCarousel({index: 0,auto: false});
				var ydyw_current_page_span=1;
				var Localclass='qw_ydyw_g';
				var htmlStr='<div><img id="Website_left" onclick="situation_left_click('+Localclass+')" src="'+eastcom.baseURL+'/static/images/overview/L2.png" style="cursor:pointer;z-index: 10; position: absolute;left: 820px; top: -2px;width: 40px;height:40px"><img id="Website_right" onclick="situation_right_click('+Localclass+')" src="'+eastcom.baseURL+'/static/images/overview/R2.png" style="cursor:pointer;z-index: 10; position: absolute;left: 900px;top:-2px; width: 40px;height:40px"></div>\
				<div style="width:32px;height:32px;float: right; z-index: 10; position: absolute;left: 865px; top: 2px;background-color:#294FC7;border-radius: 15px;"><div style="font-size: 20px;z-index: 10; position: absolute;left: 8px; top: -9px;"><span  id="qw_ydyw_g_current_page_span" style="margin-left:2px;">'+ydyw_current_page_span+'</span></div></div>';
				$("#qw_ydyw_g_switch").empty();
				document.getElementById("qw_ydyw_g_switch").innerHTML = htmlStr;
				window.clearInterval(Situation.qw_ydyw_g.Slide_time_remove);
				//全网 移动业务自动
				/*$("#qw_ydyw_g_Grouping_span").html("--- "+Situation.qw_ydyw_g.name[Situation.qw_ydyw_g.slidePosition]);*/
				if(Situation.qw_ydyw_g.Roll_bool==true){
					Situation.qw_ydyw_g.Slide_time_remove=setInterval(function() {
						ydyw_right_slide();
					}, Situation.qw_ydyw_g.time);
				}
			}
		}, 100);
	},
	Ecarts:function(){
		Situation.Business_g={};
		Situation.Business_g.data={};
		Situation.Business_g.slidePosition=1;
		Situation.Business_g.Roll_bool=false;
		Situation.Business_g.data.length=3;
		var arr={};
		var bool=[];
		var ecarts={};
		var ecarts_bool=[];
		var parameter=eval("("+pmars.Guarantee()+")");
		var parameter_name=utils.getJsonName(parameter);
		var u="";
		var Localclass='Business_g';
		cdm.getIsmAllltewg({}, function(result) {
			if (result.success) {
				arr.volte_teletraffic={vaelue:result.data.volte_teletraffic,ds:result.data.volte_teletraffic_ds};
				arr.lte_flow_all={vaelue:result.data.lte_flow_all,ds:result.data.lte_flow_all_ds};
			}
			bool[0]=true;
		});
		cdm.getIsmAllgsmwg({}, function(result) {
			if (result.success) {
				arr.gsm_flow_all={vaelue:result.data.gsm_flow_all,ds:result.data.gsm_flow_all_ds};
			}
			bool[1]=true;
		});
		cdm.getIsmAllltewgTrend({}, function(result) {
			var id=["volte_teletraffic","lte_flow_all"];
			if (result.success) {
			for(var q=0;q<id.length;q++){
				var h=0;
				var isStringEmpty=[];
				for(var s=0;s<result.data.length;s++){
					isStringEmpty[h]={value:result.data[s][id[q]],tb:result.data[s][id[q]+"tb"],time:result.data[s].time}
					h++;
				}
				ecarts[id[q]]=isStringEmpty;
			}
		    ecarts_bool[0]=true;
		  }
		});
		cdm.getIsmAllgsmwgTrend({}, function(result) {
			var isStringEmpty=[];
			var h=0;
			if (result.success) {
				for(var s=0;s<result.data.length;s++){
					isStringEmpty[h]={value:result.data[s].gsm_flow_all,tb:result.data[s].gsm_flow_alltb,time:result.data[s].time}
					h++;
				}
				ecarts.gsm_flow_all=isStringEmpty;
				ecarts_bool[1]=true;
			}
		});
		var Ecarts_1=setInterval(function() {
			var t=0
			for(var e=0;e<bool.length;e++){
				if(bool[e]==true){t++;}
			}
			if(t>=2){
				var name=[];
				for(var q=0;q<parameter_name.length;q++){
					var html="";
					html+='<div style="position: relative;font-size: 20px;right: 30px;margin-top: 10px;z-index:10;float: right;cursor:pointer;"><span id="'+parameter_name[q]+'_ecarts_val"style="margin-right: 20px;">当前值:'+utils.changeTwoDecimal(pmars.conversion(parameter[parameter_name[q]].company,arr[parameter_name[q]].vaelue))+parameter[parameter_name[q]].company_auxiliary+'</span><span>|</span><span id="'+parameter_name[q]+'_ecarts_val2" style="margin-left: 20px;">今日累计值:'+utils.changeTwoDecimal(pmars.conversion(parameter[parameter_name[q]].company,arr[parameter_name[q]].ds))+parameter[parameter_name[q]].company_auxiliary+'</span></div>'
					html+='<div id="Ecarts_g_'+parameter_name[q]+'_ecarts" style="position: absolute;height: 258px; width: 940px;"></div>'
					u+='<li class="carousel-item">'+html+'</li>'
					name[q+1]=parameter[parameter_name[q]].auxiliary;
				}
				var htmlStr='<ul class="carousel-inner" id="Business_g_ul" data-ecarts="true" style="height:258px">'+u+'</ul>'
				$("#Business_g").empty();
				document.getElementById("Business_g").innerHTML = htmlStr;
				window.clearInterval(Ecarts_1);
				$("#carousel_2").FtCarousel({index: 0,auto: false});
				Situation.Business_g.slidePosition=1;
				var htmlStr='<div><img id="Website_left" onclick="situation_left_click('+Localclass+')" src="'+eastcom.baseURL+'/static/images/overview/L2.png" style="cursor:pointer;z-index: 10; position: absolute;left: 800px; top: -2px;width: 40px;height:40px"><img id="Website_right" onclick="situation_right_click('+Localclass+')" src="'+eastcom.baseURL+'/static/images/overview/R2.png" style="cursor:pointer;z-index: 10; position: absolute;left: 880px;top:-2px; width: 40px;height:40px"></div>\
				<div style="width:32px;height:32px;float: right; z-index: 10; position: absolute;left: 845px; top: 2px;background-color:#294FC7;border-radius: 15px;"><div style="font-size: 20px;z-index: 10; position: absolute;left: 8px;top:2px;"><span  id="Business_g_current_page_span" style="margin-left:2px;">'+Situation.Business_g.slidePosition+'</span></div></div>';
				$("#Ecarts_g_switch").empty();
				document.getElementById("Ecarts_g_switch").innerHTML = htmlStr;
				$("#Business_g_Grouping_span").html("---"+parameter.volte_teletraffic.auxiliary);
				Situation.Business_g.name=name;
			}
		}, 100);
		var Ecarts_2=setInterval(function() {
			var t=0
			for(var e=0;e<ecarts_bool.length;e++){
				if(ecarts_bool[e]==true){t++;}
			}
			if(t>=2){
				window.clearInterval(Ecarts_2);
				for(var q=0;q<parameter_name.length;q++){
					var Trend_time = [];
					var Today = [];
					var Yesterday = [];
					var threshold=parameter[parameter_name[q]].threshold;
					for(var s=0;s<ecarts[parameter_name[q]].length;s++){
						if(utils.isStringEmpty(ecarts[parameter_name[q]][s].value)){
							Today[s]="";
						}else{
							Today[s]=pmars.conversion(parameter[parameter_name[q]].company,ecarts[parameter_name[q]][s].value);
						}
						if(utils.isStringEmpty(ecarts[parameter_name[q]][s].tb)){
							Yesterday[s]="";
						}else{
							Yesterday[s]=pmars.conversion(parameter[parameter_name[q]].company,ecarts[parameter_name[q]][s].tb);
						}
						Trend_time[s]=ecarts[parameter_name[q]][s].time.substring(11, 16);
					}
					var option = {
						color:['#1991e9','#ffa526','#1991e9'],
					    title : {
					        show:false
					    },
					    tooltip : {
					        trigger: 'axis',
					        formatter: function(params){
					        	var str=''+params[0].name+'<br/>';
					        		if(params.length==2){
					        			if(utils.isStringEmpty(params[1].value)){
					        				if(!utils.isStringEmpty(params[1].value)){
					        					str+=params[1].marker+ " " + params[1].seriesName +" : "+params[1].value +"</br>"
					        				}else{
					        					str+=params[0].marker+ " " + params[0].seriesName +" : "+params[0].value +"</br>"
					        				}
						        		}else{
						        			if(utils.isStringEmpty(params[0].value)){
					        					str+=params[1].marker+ " " + params[1].seriesName +" : "+params[1].value +"</br>"
					        				}else{
					        					str+=params[1].marker+ " " + params[1].seriesName +" : "+params[1].value +"</br>"
							        			str+=params[0].marker+ " " + params[0].seriesName +" : "+params[0].value +"</br>"
					        				}
						        		}
					        		}else{
					        			if(utils.isStringEmpty(params[0].value)){
							        		str="";
						        		}else{
						        			str+=params[0].marker+ " " + params[0].seriesName +" : "+params[0].value +"</br>"
						        		}
					        		}
			                    return str
					        }
					    },
					    legend: { x:'110',data:['今日','6日'],textStyle:{color:'#ffffff',fontSize:22}},
					    toolbox: {show : false},
					    calculable : false,
					    animation:false,
				   		addDataAnimation: false,
					    grid:{borderWidth:0,x:100,y:50,x2:50,y2:30},
					    xAxis : [{type : 'category',
					            data : Trend_time,
					            axisLine:{show:true,lineStyle:{color:'#adc7dd'}},
					            axisLabel:{textStyle:{color:'#adc7dd',fontSize:20}},
					            splitLine:{show:false},
					            axisTick:{show:true,lineStyle:{color:'#adc7dd'}}
					        }],
					    yAxis : [{
					            type : 'value',
					            axisLine:{show:false},
					            splitLine:{show:false},
					            axisLabel:{textStyle:{color:'#adc7dd',fontSize:20}},
					            axisTick:{show:true,lineStyle:{color:'#adc7dd'}},
					            scale:true,
					            min:0,
					            splitNumber:2}],
					    series : [{name:'6日', fontSize : 16,type:'line', symbol:'emptyCircle',symbolSize:[5,5],data:Yesterday, smooth:true,itemStyle:{normal:{lineStyle:{width:2},areaStyle:{color : 'rgba(25,145,233,0.3)'}}}},
			                         {name:'今日',fontSize : 16,type:'line',symbol:'emptyCircle',data:Today,symbolSize:[5,5],smooth:true,itemStyle:{normal:{lineStyle:{width:2}}}}]
					};
					echarts.init("Ecarts_g_"+parameter_name[q]+"_ecarts",option);
					if(q==0||q==parameter_name.length-1){
						echarts.init("Ecarts_g_"+parameter_name[q]+"_ecarts_auxiliary",option);
					}
				}
			}
		}, 100);
	},
	wirelessss : function() {
		Situation.wirelessss={};
		Situation.wirelessss.classification={};
		var parameter=eval("("+pmars.Wireless()+")");
		var parameter_name=utils.getJsonName(parameter);
		var result_id=[];var kpi_id=[];var gsm_id=[];var In_id=[];var Pro_id=[];var Intl_id=[];
		var a=0;var b=0;var c=0;var d=0;var e=0;var f=0;
		var id=[];var toshieldnumber=0;
		for(var pm=0;pm<parameter_name.length;pm++){
			if(parameter[parameter_name[pm]].ascription=="1"&&utils.isStringEmpty(pmars.shield()[parameter[parameter_name[pm]].id])){
				result_id[a]=parameter_name[pm];a++;
				Situation.wirelessss.classification.ecarts_result_id=result_id;
			}else if(parameter[parameter_name[pm]].ascription=="2"&&utils.isStringEmpty(pmars.shield()[parameter[parameter_name[pm]].id])){
				kpi_id[b]=parameter_name[pm];b++;
				Situation.wirelessss.classification.ecarts_kpi_id=kpi_id;
			}else if(parameter[parameter_name[pm]].ascription=="3"&&utils.isStringEmpty(pmars.shield()[parameter[parameter_name[pm]].id])){
				gsm_id[c]=parameter_name[pm];c++;
				Situation.wirelessss.classification.ecarts_gsm_id=gsm_id;
			}else if(parameter[parameter_name[pm]].ascription=="4"&&utils.isStringEmpty(pmars.shield()[parameter[parameter_name[pm]].id])){
				In_id[d]=parameter_name[pm];d++;
				Situation.wirelessss.classification.ecarts_In_id=In_id;
			}else if(parameter[parameter_name[pm]].ascription=="5"&&utils.isStringEmpty(pmars.shield()[parameter[parameter_name[pm]].id])){
				Pro_id[e]=parameter_name[pm];e++;
				Situation.wirelessss.classification.ecarts_Pro_id=Pro_id;
			}else if(parameter[parameter_name[pm]].ascription=="6"&&utils.isStringEmpty(pmars.shield()[parameter[parameter_name[pm]].id])){
				Intl_id[f]=parameter_name[pm];f++;
				Situation.wirelessss.classification.ecarts_Intl_id=Intl_id;
			}
			if(utils.isStringEmpty(pmars.shield()[parameter_name[pm]])){
				id[toshieldnumber]=parameter_name[pm];
				toshieldnumber++;
			}
		}
		overview_g_left.wirelessss_div();
	},
	wirelessss_div:function(){
		var parameter=eval("("+pmars.Wireless()+")");
		var parameter_name=utils.getJsonName(parameter);
		var id=parameter_name;
		var base={};
		var bool=[];
		cdm.getIsmAllltewg({}, function(result) {
			if (result.success) {
				var h=0;
				var ecarts_result_id_json={};
				for(var d1=0;d1<Situation.wirelessss.classification.ecarts_result_id.length;d1++){
					ecarts_result_id_json[Situation.wirelessss.classification.ecarts_result_id[d1]]=Situation.wirelessss.classification.ecarts_result_id[d1];
				}
				for(var d=0;d<id.length;d++){
					if(!utils.isStringEmpty(parameter[id[d]])&&!utils.isStringEmpty(ecarts_result_id_json[id[d]])&&utils.isStringEmpty(pmars.shield()[id[d]])){
						if(utils.isStringEmpty(result.data[id[d]])){
							base[id[d]]={id:id[d],name:parameter[id[d]],value:"---",hb:"---",tb:"---",time:result.data.time};h++;
						}else{
							base[id[d]]={id:id[d],name:parameter[id[d]],value:result.data[id[d]],hb:result.data[id[d]+"hb"],tb:result.data[id[d]+"tb"],time:result.data.time};h++;
						}
					}
				}
				bool[0]=true;
			}
		});
		cdm.getIsmAllgsmwg({}, function(gsm) {
			var h=0;
			var ecarts_gsm_id_json={};
			for(var d3=0;d3<Situation.wirelessss.classification.ecarts_gsm_id.length;d3++){
				ecarts_gsm_id_json[Situation.wirelessss.classification.ecarts_gsm_id[d3]]=Situation.wirelessss.classification.ecarts_gsm_id[d3];
			}
			for(var d=0;d<id.length;d++){
				if(!utils.isStringEmpty(parameter[id[d]])&&!utils.isStringEmpty(ecarts_gsm_id_json[id[d]])&&utils.isStringEmpty(pmars.shield()[id[d]])){
					if(utils.isStringEmpty(gsm.data[id[d]])){
						base[id[d]]={id:id[d],name:parameter[id[d]],value:"---",hb:"---",tb:"---",time:gsm.data.time};h++;
					}else{
						base[id[d]]={id:id[d],name:parameter[id[d]],value:gsm.data[id[d]],hb:gsm.data[id[d]+"hb"],tb:gsm.data[id[d]+"tb"],time:gsm.data.time};h++;
					}
				}
			}
			bool[1]=true;
		});
		Situation.Core=base;
		Situation.wirelessss.ecarts_base_model=setInterval(function() {
			var t=0
			for(var e=0;e<bool.length;e++){
				if(bool[e]==true){t++;}
			}
			if(t>=2&&Situation.ThresCfg.bool==true){
				window.clearInterval(Situation.wirelessss.ecarts_base_model);
				overview_g_left.wirelessss_div_new();
				for(var q=0;q<parameter_name.length;q++){
					var ydyw_img="";var display="";var color="#00FF00";var color2="#66E6FF";var _class="";
					var min1="";var max1="";var min2="";var max2=-1;
					var min3="";var max3=-1;var min4="";var max4=-1;
					var proportion=pmars.proportion(parameter[parameter_name[q]].company,base[parameter_name[q]].value,base[parameter_name[q]].hb);//获取当前的环比
					var value_auxiliary=pmars.conversion(parameter[parameter_name[q]].company,base[parameter_name[q]].value);//格式当信息
					var classification=eval("("+pmars.classification_all()+")")[base[parameter_name[q]].id];
					if(parameter[base[parameter_name[q]].id].Tparticle>59){ThresCfgName_time="小时";}
					else {ThresCfgName_time=parameter[base[parameter_name[q]].id].Tparticle+"分钟";}
					var ThresCfgName="["+classification.classification+"]-["+classification.name+"]-["+ThresCfgName_time+"]-["+classification.Belonged+"]";
					var level=Situation.ThresCfg[ThresCfgName];
					 if(!utils.isStringEmpty(level)){
						 if(!utils.isStringEmpty(level.level_1)){
					    	 var Section1=level.level_1.split(",");
							    if(Section1.length>1){
							    	min1=parseInt(Section1[0].replace(/[^0-9]/ig,""));
							    	max1=parseInt(Section1[1].replace(/[^0-9]/ig,""));
							    	if(utils.isStringEmpty(min1)){min1=-1;}
							    	if(utils.isStringEmpty(max1)){max1=999999;}
							    }
					    }
					    if(!utils.isStringEmpty(level.level_2)){
						    var Section2=level.level_2.split(",");
						    if(Section2.length>1){
						    	min2=parseInt(Section2[0].replace(/[^0-9]/ig,""));
						    	max2=parseInt(Section2[1].replace(/[^0-9]/ig,""));
						    	if(utils.isStringEmpty(min2)){min2=-1;}
						    	if(utils.isStringEmpty(max2)){max2=999999;}
						    }
					    }
					    if(!utils.isStringEmpty(level.level_3)){
						    var Section3=level.level_3.split(",");
						    if(Section3.length>1){
						    	min3=parseInt(Section3[0].replace(/[^0-9]/ig,""));
						    	max3=parseInt(Section3[1].replace(/[^0-9]/ig,""));
						    	if(utils.isStringEmpty(min3)){min3=-1;}
						    	if(utils.isStringEmpty(max3)){max3=999999;}
						    }
					    }
					    if(!utils.isStringEmpty(level.level_4)){
						    var Section4=level.level_4.split(",");
						    if(Section4.length>1){
						    	min4=parseInt(Section4[0].replace(/[^0-9]/ig,""));
						    	max4=parseInt(Section4[1].replace(/[^0-9]/ig,""));
						    	if(utils.isStringEmpty(min4)){min4=-1;}
						    	if(utils.isStringEmpty(max4)){max4=999999;}
						    }
					    } 
					    if(level.thres_type=="区间"){
					    	if(min2<=value_auxiliary&&value_auxiliary<max2){color2="#da6d6d"}
							else if(min1<=value_auxiliary&&value_auxiliary<max1){color2="#FF8C00"};
					    }
					 }
					if(proportion.bool==0){
						if(min1<=proportion.value_auxiliary&&proportion.value_auxiliary<max1){ydyw_img=eastcom.baseURL+"/static/styles/local-lsm/ciienew/images/green.png";color="#00FF00";_class="";_class_span="";}
						else{ydyw_img=eastcom.baseURL+"/static/styles/local-lsm/ciienew/images/green.png";color="#00FF00";_class="";_class_span="";}}
					else if(proportion.bool==1){
						if(min2<=proportion.value_auxiliary&&proportion.value_auxiliary<max2){color="#da6d6d";ydyw_img=eastcom.baseURL+"/static/styles/local-lsm/ciienew/images/red.png";color="#da6d6d";_class="";_class_span="";}
						else if(min1<=proportion.value_auxiliary&&proportion.value_auxiliary<max1){ydyw_img=eastcom.baseURL+"/static/styles/local-lsm/ciienew/images/green.png";color="#00FF00";_class="rotate";_class_span="rotate_span";}
						else {ydyw_img=eastcom.baseURL+"/static/styles/local-lsm/ciienew/images/green.png";color="#00FF00";_class="rotate";_class_span="rotate_span";}}
					else{color="#00FF00";display="none"};
					$('#'+parameter_name[q]+'').text(base[parameter_name[q]].value+"%");
					$('#'+parameter_name[q]+'').css("color",color2);
					$('#'+parameter_name[q]+'_tb').text(proportion.value);
					$('#'+parameter_name[q]+'_tb').css("color",color);
					$('#'+parameter_name[q]+'_img').attr('src', ydyw_img);
					$('#'+parameter_name[q]+'_img').css("display",display);
				}
			}
		}, 100);
	},
	wirelessss_div_new:function(){
		var html="";
		html+='<div class="wireless" style="float:left;margin-right: 12px;font-size: 36px;position: absolute;" onmouseout ="mouseout(this)">';
		html+='<span style="left: 120px;position: absolute;top: 40px;">LTE</span>';
		html+='<span style="position: absolute;top: 130px;right: 170px;font-size: 20px;">无线接通率</span>';
		html+='<span style="position: absolute;top: 130px;right: 30px;font-size: 20px;">无线掉话率</span>';
		html+='<div style="position: relative;width: 130px;top: 175px;float: left;left: 20px; text-align: center;"><span style="font-size: 30px;cursor: pointer;" id="lte_wireless_conn_ratio" onmouseover="Core_onmouseover(this);" data-length="1" >---</span></div>';
		html+='<div style="position: relative;width: 130px;top: 175px;float: left;left: 30px; text-align: center;"><span style="font-size: 30px;cursor: pointer;"  id="lte_wireless_drop_ratio" onmouseover="Core_onmouseover(this);" data-length="1">---</span></div>';
		html+='<div style="position: absolute;top: 260px;left: 30px;width:100px;background-color: rgba(0, 102, 255, 0);height:30px;font-size: 20px;text-align: center;"><img id="lte_wireless_conn_ratio_img" style="top: -23px;position: relative;"><span id="lte_wireless_conn_ratio_tb" style="position: relative;top:-20px;"></span></div>';
		html+='<div style="position: absolute;top: 260px;left: 170px;width:100px;background-color: rgba(0, 102, 255, 0);height:30px;font-size: 20px;text-align: center;"><img id="lte_wireless_drop_ratio_img" style="top: -23px;position: relative;"><span id="lte_wireless_drop_ratio_tb" style="position: relative;top:-20px;"></span></div></div>';
		html+='<div class="wireless" style="float:left;margin-right: 12px;font-size: 36px;position: absolute;left:324px" onmouseout ="mouseout(this)">';
		html+='<span style="left: 110px;position: absolute;top: 40px;">GSM</span>';
		html+='<span style="position: absolute;top: 130px;right: 170px;font-size: 20px;">无线接通率</span>';
		html+='<span style="position: absolute;top: 130px;right: 30px;font-size: 20px;">无线掉话率</span>';
		html+='<div style="position: relative;width: 130px;top: 175px;float: left;left: 20px; text-align: center;"><span style="font-size: 30px;cursor: pointer;" id="gsm_wireless_conn_ratio" onmouseover="Core_onmouseover(this);" data-length="2" >---</span></div>';
		html+='<div style="position: relative;width: 130px;top: 175px;float: left;left: 30px; text-align: center;"><span style="font-size: 30px;cursor: pointer;"  id="gsm_wireless_drop_ratio" onmouseover="Core_onmouseover(this);" data-length="2">---</span></div>';
		html+='<div style="position: absolute;top: 260px;left: 30px;width:100px;background-color: rgba(0, 102, 255, 0);height:30px;font-size: 20px;text-align: center;"><img id="gsm_wireless_conn_ratio_img" style="top: -23px;position: relative;"><span id="gsm_wireless_conn_ratio_tb" style="position: relative;top:-20px;"></span></div>';
		html+='<div style="position: absolute;top: 260px;left: 170px;width:100px;background-color: rgba(0, 102, 255, 0);height:30px;font-size: 20px;text-align: center;"><img id="gsm_wireless_drop_ratio_img" style="top: -23px;position: relative;"><span id="gsm_wireless_drop_ratio_tb" style="position: relative;top:-20px;"></span></div></div>';
		html+='<div class="wireless" style="float:left;margin-right: 12px;font-size: 36px;position: absolute;left:646px" onmouseout ="mouseout(this)">';
		html+='<span style="left: 95px;position: absolute;top: 40px;">VoLTE</span>';
		html+='<span style="position: absolute;top: 130px;right: 170px;font-size: 20px;">无线接通率</span>';
		html+='<span style="position: absolute;top: 130px;right: 30px;font-size: 20px;">无线掉话率</span>';
		html+='<div style="position: relative;width: 130px;top: 175px;float: left;left: 20px; text-align: center;"><span style="font-size: 30px;cursor: pointer;" id="volte_voice_conn_ratio" onmouseover="Core_onmouseover(this);" data-length="3">---</span></div>';
		html+='<div style="position: relative;width: 130px;top: 175px;float: left;left: 30px; text-align: center;"><span style="font-size: 30px;cursor: pointer;"  id="volte_voice_drop_ratio" onmouseover="Core_onmouseover(this);"  data-length="3">---</span></div>';
		html+='<div style="position: absolute;top: 260px;left: 30px;width:100px;background-color: rgba(0, 102, 255, 0);height:30px;font-size: 20px;text-align: center;"><img id="volte_voice_conn_ratio_img" style="top: -23px;position: relative;"><span id="volte_voice_conn_ratio_tb" style="position: relative;top:-20px;"></span></div>';
		html+='<div style="position: absolute;top: 260px;left: 170px;width:100px;background-color: rgba(0, 102, 255, 0);height:30px;font-size: 20px;text-align: center;"><img id="volte_voice_drop_ratio_img" style="top: -23px;position: relative;"><span id="volte_voice_drop_ratio_tb" style="position: relative;top:-20px;"></span></div></div>';
		$("#wirelessquality_g").empty();
		document.getElementById("wirelessquality_g").innerHTML = html;
		document.getElementById("wirelessquality_g_switch").innerHTML = "";
		$("#wirelessquality_text").html("无线质量");
		$("#wirelessquality_css").removeClass("icon-fca");
		$("#wirelessquality_css").addClass("icon_wirelessquality");
	},
	Core:function(){
		Situation.wirelessquality_g={};
		Situation.wirelessquality_g.data={};
		Situation.wirelessquality_g.slidePosition=1;
		Situation.wirelessquality_g.Roll_bool=false;
		Situation.wirelessquality_g.data.length=2;
		Situation.wirelessquality_g.time=20000;
		Situation.wirelessquality_g.name=["","","",""];
		Situation.wirelessquality_g.classification={};
		Situation.wirelessquality_g.Core=[
		          {id:'csmt_fall_back_succ_ratio',name:'CSMT回落成功率',source : "网管",Tparticle : 15},
		          {id:'tau_update_succ_ratio',name:'TAU更新成功率',source : "网管",Tparticle : 15},
		          {id:'mme_sw_succ_ratio',name:'MME内切换成功率',source : "网管",Tparticle : 15},
		          {id:'pgw_charging_succ_ratio',name:'PGW计费请求成功率',source : "网管",Tparticle : 15},
		          {id:'pdn_conn_succ_ratio',name:'PDN连接成功率',source : "网管",Tparticle : 15},
		          {id:'vl_ims_reg_succrate',name:'VOLTE初始注册成功率',source : "网管",Tparticle : 15}];
		var list=Situation.wirelessquality_g.Core;
		var html='';
		var id=Situation.wirelessquality_g.Core;
		var k=parseInt(parseInt(id.length)/4);
		(parseInt(id.length)%4==0)? k:k++;
		var q=[];
		var x=0;
		var j=0;
		var arr=0;
		var u="";
		for (var h=0;h<k;h++){
			h<parseInt(parseInt(id.length)/4)?q[h]=4:q[h]=parseInt(id.length)%4;
			arr=q[h];
			for(var n=0;n<arr;n++){
				if(!utils.isStringEmpty(pmars.shield()[id[x]])){q[h]=q[h]-1;}x++;
			}
		}
		for(var g=0;g<k;g++){
			var html = '';
			for (var c=0;c<q[g];c++){ 
				var record=list[j];
				var item='<div class="bg-frame-round" style="width:228px;margin-right:12px;float: left;" onmouseout="mouseout(this)">'
					+'<div style="position:relative;width:100%;height:200px;">'
						+'<div class="bg-circle"></div>'
						+'<div id="chartc_'+record.id+'" style="width:225px;height:200px;"></div>'
						+'<div class="bg-circle" style="background:none;text-align:center;">'
							+'<div class="div_left_center" onmouseover="_onmouseover(this);" data-id="'+record.id+'" data-length="'+(c+1)+'" style="top: 40px;line-height: 40px;cursor: pointer;"><span id="valuec_'+record.id+'" class="ciiekpistyle fontImportantInfo" style="color: #66e6ff;font-size: 34px;">--</span><br/>'
							+'<span id="ratioc_'+record.id+'" class="ciiekpistyle fontImportantInfo" style="font-size: 20px;">--</span></div>'
						+'</div>'
					+'</div>'
					+'<div id="titlec'+j+'" class="fontSubInfo2" style="width:100%;text-align:center;font-size: 24px;padding:0 40px 0 40px;line-height: 1.3;">'
					+record.name
					+'</div>'
					+'</div>';
				html+=item;
				j++;
			}
			u+='<li class="carousel-item" style="margin-top:10px">'+html+'</li>'
		}
		var Localclass='wirelessquality_g';
		 var htmlStr = '<div><img id="Website_left" onclick="situation_left_click(' + Localclass + ')" src="' + eastcom.baseURL + '/static/images/overview/L2.png" style="cursor:pointer;z-index: 10; position: relative;right:40px;width: 40px;height:40px"><img id="Website_right" onclick="situation_right_click(' + Localclass + ')" src="' + eastcom.baseURL + '/static/images/overview/R2.png" style="cursor:pointer;z-index: 10; position: relative; width: 40px;height:40px"></div>\
	      <div style="width:32px;height:32px;right:45px;top:-45px;float: right; z-index: 10; position: relative;background-color:#294FC7;border-radius: 15px;"><div style="font-size: 20px;z-index: 10; position: relative;right: 7px; top: -19px;"><span  id="wirelessquality_g_current_page_span" style="margin-left:2px;">' + Situation.wirelessquality_g.slidePosition + '</span></div></div>';
		document.getElementById("wirelessquality_g_switch").innerHTML = "";
		document.getElementById("wirelessquality_g_switch").innerHTML = htmlStr;
		var htmlStr='<ul class="carousel-inner" data-ecarts="false" id="wirelessquality_g_ul" >'+u+'</ul>'
		$('#wirelessquality_g').html(htmlStr);
		$("#wirelessquality_g").FtCarousel({index: 0,auto: false});
		$("#wirelessquality_text").html("核心网质量");
		$("#wirelessquality_css").removeClass("icon_wirelessquality");
		$("#wirelessquality_css").addClass("icon-fca");
		var s=$("#wirelessquality_g_ul li").length;
		for(var q=0;q<$($("#wirelessquality_g_ul li")[0]).context.childNodes.length;q++){
			$($($($($("#wirelessquality_g_ul li")[0]).context.childNodes[q]).context.childNodes[0]).context.childNodes[1]).attr("id",$($($($("#wirelessquality_g_ul li")[0]).context.childNodes[q]).context.childNodes[0]).context.childNodes[1].id+"_auxiliary");
			$($($($($($($("#wirelessquality_g_ul li")[0]).context.childNodes[q]).context.childNodes[0]).context.childNodes[2]).context.childNodes[0]).context.childNodes[0]).attr("id",$($($($($($("#wirelessquality_g_ul li")[0]).context.childNodes[q]).context.childNodes[0]).context.childNodes[2]).context.childNodes[0]).context.childNodes[0].id+"_auxiliary");
			$($($($($($($("#wirelessquality_g_ul li")[0]).context.childNodes[q]).context.childNodes[0]).context.childNodes[2]).context.childNodes[0]).context.childNodes[2]).attr("id",$($($($($($("#wirelessquality_g_ul li")[0]).context.childNodes[q]).context.childNodes[0]).context.childNodes[2]).context.childNodes[0]).context.childNodes[2].id+"_auxiliary");
		}
		for(var q=0;q<$($("#wirelessquality_g_ul li")[s-1]).context.childNodes.length;q++){
			$($($($($("#wirelessquality_g_ul li")[s-1]).context.childNodes[q]).context.childNodes[0]).context.childNodes[1]).attr("id",$($($($("#wirelessquality_g_ul li")[s-1]).context.childNodes[q]).context.childNodes[0]).context.childNodes[1].id+"_auxiliary");
			$($($($($($($("#wirelessquality_g_ul li")[s-1]).context.childNodes[q]).context.childNodes[0]).context.childNodes[2]).context.childNodes[0]).context.childNodes[0]).attr("id",$($($($($($("#wirelessquality_g_ul li")[s-1]).context.childNodes[q]).context.childNodes[0]).context.childNodes[2]).context.childNodes[0]).context.childNodes[0].id+"_auxiliary");
			$($($($($($($("#wirelessquality_g_ul li")[s-1]).context.childNodes[q]).context.childNodes[0]).context.childNodes[2]).context.childNodes[0]).context.childNodes[2]).attr("id",$($($($($($("#wirelessquality_g_ul li")[s-1]).context.childNodes[q]).context.childNodes[0]).context.childNodes[2]).context.childNodes[0]).context.childNodes[2].id+"_auxiliary");
		}
		overview_g_left.Core_div();
	},
	Core_div:function(){
		cdm.getIsmAllltewg({}, function(data) {
			var arr={};
			var parameter=eval("("+pmars.Left_name()+")");
			var parameter_name=utils.getJsonName(parameter);
			Situation.parameter=parameter;
			var ecarts_result_id=[];var id=[];var a=0;var b=0;
			var toshieldnumber=0;
			for(var pm=0;pm<parameter_name.length;pm++){
				if(parameter[parameter_name[pm]].ascription=="1"){
					ecarts_result_id[a]=parameter_name[pm];a++;
					Situation.wirelessquality=ecarts_result_id;
				}
			}
			for(var q=0;q<Situation.wirelessquality.length;q++){
				arr[Situation.wirelessquality[q]]={value:data.data[Situation.wirelessquality[q]],hb:data.data[Situation.wirelessquality[q]+"hb"],tb:data.data[Situation.wirelessquality[q]+"tb"],time:data.data.time,id:Situation.wirelessquality[q]};
			}
			Situation.arr=arr;
			var list=Situation.wirelessquality_g.Core;
			for(var i=0;i<list.length;i++){
				var record=list[i];
				var kpiKey=record.id;
				if(!utils.isStringEmpty(arr[kpiKey])){
					var value=arr[kpiKey].value;
					var hb=arr[kpiKey].hb;
					var chartId='chartc_'+kpiKey;
					var proportion=pmars.proportion(parameter[kpiKey].company_auxiliary_original,value,hb);//获取当前的环比
					var value_auxiliary=pmars.conversion(parameter[kpiKey].company_auxiliary_original,value);//格式当信息
					var showRatio=0;
					if(proportion.bool==0){
						showRatio="+"+proportion.value;
					}else if(proportion.bool==1){
						showRatio="-"+proportion.value;
					}
					$('#valuec_'+kpiKey).text(value_auxiliary+parameter[kpiKey].company_auxiliary);
					$('#ratioc_'+kpiKey).text(showRatio);
					$('#valuec_'+kpiKey+"_auxiliary").text(value_auxiliary+parameter[kpiKey].company_auxiliary);
					$('#ratioc_'+kpiKey+"_auxiliary").text(showRatio);
					Heart_circle($($('#'+chartId+"_auxiliary")[0])[0].id,value);
					Heart_circle($($('#'+chartId)[0])[0].id,value);
				}
				
			}
		});
	},
	ThresCfg:function(){
		cdm.getThresCfg({}, function(Cfg) {
			if (Cfg.success) {
				Situation.ThresCfg=Cfg.data;
				Situation.ThresCfg.bool=true;
			}
		});	
	}
}
function mouseout(){
	$("#popover").empty();
}
function click(){
 $("#jt_wirelessquality_Roll_img").live('click', function() {
        if (Situation.wirelessquality_bool == true) {
            $('#jt_wirelessquality_Roll_img').attr('src', eastcom.baseURL + '/static/images/overview/k_2.png');
            Situation.wirelessquality_bool = false;
            overview_g_left.Core();
        } else {
            $('#jt_wirelessquality_Roll_img').attr('src', eastcom.baseURL + '/static/images/overview/k_1.png');
            Situation.wirelessquality_bool = true;
            overview_g_left.wirelessss();
        }
    });
}
function ydyw_onmouseover(obgect){
	  var parameter=eval("("+pmars.Left_name_g()+")");
	  var position=eval("("+Popoverposition.overviewleft_g()+")");
	  var classification=eval("("+pmars.classification_all()+")");
	  var _data_color=$(obgect).data("color");
	  var isStringEmpty=[];
	  if(Situation.qw_ydyw_g.source.length>0){
		  for(var s=0;s<Situation.qw_ydyw_g.source.length;s++){
			  if(Situation.qw_ydyw_g.source[s].id==obgect.id.replace("_span","")){
				  isStringEmpty=Situation.qw_ydyw_g.source[s];
				  if(!utils.isStringEmpty(isStringEmpty.time)&&!utils.isStringEmpty(isStringEmpty.value)&&isStringEmpty.value!="---"&&Situation.ThresCfg.bool==true&&!utils.isStringEmpty(classification[isStringEmpty.id])){
					  setTimeout(function(){ Popover.popover(isStringEmpty,position[_data_color],parameter,Situation.ThresCfg,classification[isStringEmpty.id]);},200);
				  }else{
					  $('#popover').css('display','none');	  
				  }
			  }
		  } 
	  }
}
function Heart_circle(id,value){
	var option = {
			color:['#009bfd','#0a2750'],
		    title : {
		        show:false
		    },
		    tooltip : {
		    	show:false
		    },
		    legend: {
		        data:['指标值'],
		        textStyle:{color:'#ffffff',fontSize:this.chartLabelSize},
		        show:false
		        
		    },
		    toolbox: {
		        show : false
		    },
		    calculable : false,
		    series : [{
	            name:'指标值',
	            type:'pie',
	            radius : [80, 90],
	            center:['51%','51%'],
	            startAngle:45,
	            // for funnel
	            x: '60%',
	            width: '45%',
	            funnelAlign: 'left',
	            data:[{value:value,name:'指标值'},{value:100-value,name:''}],
	            itemStyle:{
	            	normal:{
	            		label:{
	            			show:false,
	            			formatter:'{d}%\n{b}',
	            			textStyle:{color:'#ffffff',fontSize:this.chartLabelSize}
	            		},labelLine:{
	            			show:false
	            		}
	            		
	            	}
	            }
	        }]
		};
	echart.init(id,option);
}
var echarts = {
		init: function (chartId, option) {//初始化方法
			require.config({paths: {echartsMin: eastcom.baseURL+'/scripts/local-lsm/overview/echarts.min'}});  
			require(['echartsMin','echarts/chart/line','echarts/chart/bar', 'echarts/chart/pie' ],initEcharts);function initEcharts(ec){
			var chart0=ec.init(document.getElementById(chartId),'marcarons');
			chart0.setOption(option);
		};	
	}
} 
var echart = {
		init: function (chartId, option) {//初始化方法
			require.config({paths: {echartsMin: eastcom.baseURL+'/static/jslib/echarts/echarts'}}); 
			require(['echarts','echarts/chart/bar','echarts/chart/line','echarts/chart/pie'],initEcharts);function initEcharts(ec){
			var chart0=ec.init(document.getElementById(chartId),'marcarons');
			chart0.setOption(option);
		};	
	}
}
function  _onmouseover(obgect){
	var length=$(obgect).data("length");
	var Location=eval("(" + Popoverposition.Core() + ")");
	Popover2.popover(Situation.arr[$(obgect).data("id")],Location[length],Situation.parameter);
}
function Core_onmouseover(obgect){
	var length=$(obgect).data("length");
	var parameter=eval("("+pmars.Left_name()+")");
	var Location=eval("(" + Popoverposition.Core2() + ")");
	Popover2.popover(Situation.Core[obgect.id],Location[length],parameter);
}