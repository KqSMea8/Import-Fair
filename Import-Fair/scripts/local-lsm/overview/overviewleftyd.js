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
var overviewleftyd = {
	init : function() {
	  configuration.IsmEaebmCfg("jb", "caching");
	},
	caching:function(bool){
		 if (bool == true) {
			overviewleftyd.cache();
	     }
	},
	cache:function(){
		this.ydyw();//移动业务
		this.zqyw();//政企业务
		this.zywz();//重要网站
		this.wlw();//安全信息
		this.CMNET();//CMNET
		this.ThresCfg();
		click();
		setInterval(function() {overviewleftyd.ydyw();}, 200000);
		setInterval(function() {overviewleftyd.CMNET();}, 200000);
		if(Situation.aqxi_bool==false){
        	Situation.aqxi=setInterval(function() {
        		overviewleftyd.wlw();
	        }, 3600000);
        	 window.clearInterval(Situation.wlw);
        }else{
        	Situation.wlw=setInterval(function() {
        		overviewleftyd.aqxi();
	         }, 3600000);
        	 window.clearInterval(Situation.aqxi);
        }
		setInterval(function() {overviewleftyd.zqyw();}, 3600000);
		setInterval(function() {overviewleftyd.zywz();}, 3600000);
		setInterval(function() {overviewleftyd.ThresCfg();}, 3600000);
	},
	ydyw:function(){
		Situation.bz_ydyw={};
		Situation.bz_ydyw.classification={};
		var parameter=eval("("+pmars.LeftTwo_name()+")");
		var parameter_name=utils.getJsonName(parameter);
		var result_id=[];var kpi_id=[];var gsm_id=[];var In_id=[];var Pro_id=[];var Intl_id=[];var Intl_ys_id=[];var Pro_id=[];
		var a=0;var b=0;var c=0;var d=0;var e=0;var f=0;
		var id=[];var toshieldnumber=0;
		for(var pm=0;pm<parameter_name.length;pm++){
			if(parameter[parameter_name[pm]].ascription=="1"&&utils.isStringEmpty(pmars._shield()[parameter[parameter_name[pm]].id])){
				result_id[a]=parameter_name[pm];a++;
				Situation.bz_ydyw.classification.ecarts_result_id=result_id;
			}else if(parameter[parameter_name[pm]].ascription=="2"&&utils.isStringEmpty(pmars._shield()[parameter[parameter_name[pm]].id])){
				kpi_id[b]=parameter_name[pm];b++;
				Situation.bz_ydyw.classification.ecarts_kpi_id=kpi_id;
			}else if(parameter[parameter_name[pm]].ascription=="3"&&utils.isStringEmpty(pmars._shield()[parameter[parameter_name[pm]].id])){
				gsm_id[c]=parameter_name[pm];c++;
				Situation.bz_ydyw.classification.ecarts_gsm_id=gsm_id;
			}else if(parameter[parameter_name[pm]].ascription=="4"&&utils.isStringEmpty(pmars._shield()[parameter[parameter_name[pm]].id])){
				In_id[d]=parameter_name[pm];d++;
				Situation.bz_ydyw.classification.ecarts_In_id=In_id;
			}else if(parameter[parameter_name[pm]].ascription=="5"&&utils.isStringEmpty(pmars._shield()[parameter[parameter_name[pm]].id])){
				Intl_ys_id[d]=parameter_name[pm];d++;
				Situation.bz_ydyw.classification.ecarts_Intl_ys_id=Intl_ys_id;
			}else if(parameter[parameter_name[pm]].ascription=="6"&&utils.isStringEmpty(pmars._shield()[parameter[parameter_name[pm]].id])){
				Pro_id[d]=parameter_name[pm];d++;
				Situation.bz_ydyw.classification.ecarts_Pro_id=Pro_id;
			}
			if(utils.isStringEmpty(pmars._shield()[parameter_name[pm]])){
				id[toshieldnumber]=parameter_name[pm];
				toshieldnumber++;
			}
		}
		overviewleftyd.ydyw_trend();//获取趋势数据
		var length=parseInt(parseInt(parameter_name.length)/6);
		(parseInt(parameter_name.length)%6==0)? length:length++;
		Situation.bz_ydyw.Maximumarr=length;
		configuration.Jurisdiction("_yd_Model",id,"jb","bz_ydyw_div");
		$('#bz_ydyw_img').attr('src',eastcom.baseURL+'/static/images/overview/zbpz.png');
	},
	bz_ydyw_div : function(Jurisdiction) {
		var id=Jurisdiction.id;
		Situation.bz_ydyw.name=Jurisdiction.name;
		Situation.bz_ydyw.time=Jurisdiction.time;
		Situation.bz_ydyw.Roll_bool=false;
		Situation.bz_ydyw.slidePosition=1;
		Situation.bz_ydyw.Maximum=6;
		var parameter=eval("("+pmars.LeftTwo_name()+")");
		var base={};
		var bool=[];
		cdm.getIsmHotltewg({ids:pmars.jkblh()}, function(result)  {
			var result=result.data[pmars.jkblh()];
			if (!utils.isStringEmpty(result)) {
				var h=0;
				var ecarts_result_id_json={};
				for(var d1=0;d1<Situation.bz_ydyw.classification.ecarts_result_id.length;d1++){
					ecarts_result_id_json[Situation.bz_ydyw.classification.ecarts_result_id[d1]]=Situation.bz_ydyw.classification.ecarts_result_id[d1];
				}
				for(var d=0;d<id.length;d++){
					if(!utils.isStringEmpty(parameter[id[d]])&&!utils.isStringEmpty(ecarts_result_id_json[id[d]])&&utils.isStringEmpty(pmars._shield()[id[d]])){
						if(utils.isStringEmpty(result[id[d]])){
							base[id[d]]={id:id[d],name:parameter[id[d]],value:"---",hb:"---",tb:"---",time:result.time};h++;
						}else{
							base[id[d]]={id:id[d],name:parameter[id[d]],value:result[id[d]],hb:result[id[d]+"hb"],tb:result[id[d]+"tb"],time:result.time};h++;
						}
					}
				}
				bool[0]=true;
			}
		});
		cdm.getHotspotKpi({ids:pmars.jkblh()}, function(kpi) {
			var kpi=kpi[pmars.jkblh()];
			if (!utils.isStringEmpty(kpi)) {
				var h=0;
				var ecarts_kpi_id_json={};
				for(var d2=0;d2<Situation.bz_ydyw.classification.ecarts_kpi_id.length;d2++){
					ecarts_kpi_id_json[Situation.bz_ydyw.classification.ecarts_kpi_id[d2]]=Situation.bz_ydyw.classification.ecarts_kpi_id[d2];
				}
				for(var d=0;d<id.length;d++){
					if(!utils.isStringEmpty(parameter[id[d]])&&!utils.isStringEmpty(ecarts_kpi_id_json[id[d]])&&utils.isStringEmpty(pmars._shield()[id[d]])){
						if(utils.isStringEmpty(kpi[id[d]])){
							base[id[d]]={id:id[d],name:parameter[id[d]],value:"---",hb:"---",tb:"---",time:kpi.time};h++;
						}else{
							base[id[d]]={id:id[d],name:parameter[id[d]],value:kpi[id[d]],hb:kpi[id[d]+"hb"],tb:kpi[id[d]+"tb"],time:kpi.time};h++;
						}
					}
				}
				bool[1]=true;
			}
		});
		cdm.getIsmHotgsm({ids:pmars.jkblh()}, function(gsm) {
			var gsm=gsm.data[pmars.jkblh()];
			if (!utils.isStringEmpty(gsm)) {
			var h=0;
			var ecarts_gsm_id_json={};
			for(var d3=0;d3<Situation.bz_ydyw.classification.ecarts_gsm_id.length;d3++){
				ecarts_gsm_id_json[Situation.bz_ydyw.classification.ecarts_gsm_id[d3]]=Situation.bz_ydyw.classification.ecarts_gsm_id[d3];
			}
			for(var d=0;d<id.length;d++){
				if(!utils.isStringEmpty(parameter[id[d]])&&!utils.isStringEmpty(ecarts_gsm_id_json[id[d]])&&utils.isStringEmpty(pmars._shield()[id[d]])){
					if(utils.isStringEmpty(gsm[id[d]])){
						base[id[d]]={id:id[d],name:parameter[id[d]],value:"---",hb:"---",tb:"---",time:gsm.time};h++;
					}else{
						base[id[d]]={id:id[d],name:parameter[id[d]],value:gsm[id[d]],hb:gsm[id[d]+"hb"],tb:gsm[id[d]+"tb"],time:gsm.time};h++;
					}
				}
			}
			bool[2]=true;
			}
		});
		cdm.getUserDistAll({hot_name:pmars.jkblh()},function(All){
			var All=All.data;
			var h=0;
			var ecarts_In_id_json={};
			var ecarts_Intl_ys_id_json={};
			var ecarts_Pro_id_json={};
			for(var d4=0;d4<Situation.bz_ydyw.classification.ecarts_In_id.length;d4++){
				ecarts_In_id_json[Situation.bz_ydyw.classification.ecarts_In_id[d4]]=Situation.bz_ydyw.classification.ecarts_In_id[d4];
			}
			for(var d5=0;d5<Situation.bz_ydyw.classification.ecarts_Intl_ys_id.length;d5++){
				ecarts_Intl_ys_id_json[Situation.bz_ydyw.classification.ecarts_Intl_ys_id[d5]]=Situation.bz_ydyw.classification.ecarts_Intl_ys_id[d5];
			}
			for(var d6=0;d6<Situation.bz_ydyw.classification.ecarts_Pro_id.length;d6++){
				ecarts_Pro_id_json[Situation.bz_ydyw.classification.ecarts_Pro_id[d6]]=Situation.bz_ydyw.classification.ecarts_Pro_id[d6];
			}
			for(var d=0;d<id.length;d++){
				if(!utils.isStringEmpty(parameter[id[d]])&&!utils.isStringEmpty(ecarts_In_id_json[id[d]])&&utils.isStringEmpty(pmars._shield()[id[d]])){
					if(utils.isStringEmpty(All.intl)){
						base[id[d]]={id:id[d],name:parameter[id[d]],value:"---",hb:"---",tb:"---",time:All.intl.time.substring(0, 16)};h++;
					}else{
						base[id[d]]={id:id[d],name:parameter[id[d]],value:All.intl.user_cnt,hb:All.intl.user_cnthb,tb:All.intl.user_cnttb,time:All.intl.time.substring(0, 16)};h++;
					}
				}else if(!utils.isStringEmpty(parameter[id[d]])&&!utils.isStringEmpty(ecarts_Intl_ys_id_json[id[d]])&&utils.isStringEmpty(pmars._shield()[id[d]])){
					if(utils.isStringEmpty(All.intl_ys)){
						base[id[d]]={id:id[d],name:parameter[id[d]],value:"---",hb:"---",tb:"---",time:All.intl_ys.time.substring(0, 16)};h++;
					}else{
						base[id[d]]={id:id[d],name:parameter[id[d]],value:All.intl_ys.user_cnt,hb:All.intl_ys.user_cnthb,tb:All.intl_ys.user_cnttb,time:All.intl_ys.time.substring(0, 16)};h++;
					}
				}else if(!utils.isStringEmpty(parameter[id[d]])&&!utils.isStringEmpty(ecarts_Pro_id_json[id[d]])&&utils.isStringEmpty(pmars._shield()[id[d]])){
					if(utils.isStringEmpty(All.pro)){
						base[id[d]]={id:id[d],name:parameter[id[d]],value:"---",hb:"---",tb:"---",time:All.pro.time.substring(0, 16)};h++;
					}else{
						base[id[d]]={id:id[d],name:parameter[id[d]],value:All.pro.user_cnt,hb:All.pro.user_cnthb,tb:All.pro.user_cnttb,time:All.pro.time.substring(0, 16)};h++;
					}
				}
			}
			bool[3]=true;
		});
		var original_id=utils.getJsonName(parameter);
		var toshield=[];
		var toshieldnumber=0;
		for(var q=0;q<original_id.length;q++){
			if(utils.isStringEmpty(pmars._shield()[original_id[q]])){toshield[toshieldnumber]=original_id[q];toshieldnumber++;}
		}
		Situation.bz_ydyw.ecarts_base_model=setInterval(function() {
			var t=0
			for(var e=0;e<bool.length;e++){if(bool[e]==true){t++;}}
			if(t>=4&&Situation.ThresCfg_bool==true){
				var base1=base;
				base=[];
				for(var q=0;q<id.length;q++){if(utils.isStringEmpty(pmars._shield()[id[q]])){base[id[q]]=base1[id[q]];}}
				var base_name=utils.getJsonName(base);
				Situation.ecarts_model_id=base_name[0];
				Situation.ecarts_model_time=base[base_name[0]].time;
				window.clearInterval(Situation.bz_ydyw.ecarts_base_model);
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
						if(!utils.isStringEmpty(pmars._shield()[id[x]])){q[h]=q[h]-1;}x++;
					}
				}
				var ecarts_setInterval_bool=true;
				var ecarts_trend_model=setInterval(function() {
					var ecarts_bool_length=0;
					for(var t=0;t<6;t++){if(!utils.isStringEmpty(Situation.bz_ydyw.ecarts_bool)&&Situation.bz_ydyw.ecarts_bool[t]==true){ecarts_bool_length++;}}
					if(ecarts_bool_length==6){
					if(ecarts_setInterval_bool==true){window.clearInterval(ecarts_trend_model);ecarts.bz_ecarts(Situation.ecarts_model_time,Situation.ecarts_model_id,Situation.bz_ydyw.trend,parameter);ecarts_setInterval_bool=false;}}
					$('#bz_trend_img').html('<img  id=" bz_trend_img" src='+eastcom.baseURL+pmars.TrendUrl(parameter[Situation.ecarts_model_id].auxiliary)+' style="width:44px;">');
				}, 100);
				var source=[];
				var sourcelength=0;
				for(var d=0;d<id.length;d++){
					if(!utils.isStringEmpty(base[id[d]])&&utils.isStringEmpty(pmars._shield()[id[d]])){
						source[sourcelength]=base[id[d]];sourcelength++;
					}
				}
				Situation.bz_ydyw.source=source;
				Situation.bz_ydyw.data={length:k,grouping:q};
				Situation.bz_ydyw.original=toshield;
				for(var g=0;g<k;g++){
					var html = '';
					for (var c=0;c<q[g];c++){
						var ydyw_img="";
						var margin=20;
						var color="#da6d6d";
						var display="";
						var data_color="";
						var _class="";
						var _class_span="";
						var _margin_right=24;
					    var min1 = 100;
                        var max1 = 150;
                        var min2 = 50;
                        var max2 = 100;
						var min3="";
						var max3="";
						var min4="";
						var max4=-1;
						var color2="#66E6FF";
						var ThresCfgName_time="";
						var array=parameter[source[j].id];
						var proportion=pmars.proportion(array.company,source[j].value,source[j].hb);//获取当前的环比
						 //获取当前的环比
                        var value_auxiliary = pmars.conversion(array.company, source[j].value);
                        //格式当信息
                        var classification = eval("(" + pmars.classification_guarantee() + ")")[source[j].id];
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
                            } else {
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
                             } else {
                        		 color = "#00FF00";
                        		 color2= "#66E6FF";
                        		 _class = "";
                                 _class_span = "";
                                 display = "none"
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
                            } else {
                       		 color = "#00FF00";
                       		 color2= "#66E6FF";
                       		 _class = "";
                                _class_span = "";
                                display = "none"
                       	 }
                        };
						if(c==2||c==5){
							_margin_right=0;
						}
						  html += '<div style="position: relative;width:426px;height:157.5px;cursor: pointer;margin-top:16px;margin-right:'+_margin_right+'px;border-radius:5px; background-color: rgba(0, 102, 255, 0.35);float:left" onmouseout ="mouseout(this)"  onclick="_click(this.id);" id="'+source[j].id+'" data-uname="'+source[j].id+'">\
							<div style="width:200px;display: inline-block;line-height: 48px;width:200px;float:left;margin-top:10px;margin-left: 20px;text-align: left;"><span style="font-size:28px;">'+source[j].name.text+'</span></div>\
							<div style="float:right;position: absolute;top: 27.5px;right: 20px;color:'+color2+';" id="'+source[j].id+'_span"><span style="font-size: 62px;"  onmouseover="jb_ydyw_onmouseover(this);" id="'+source[j].id+'_span"  data-color="jb_ydyw_suspension_'+c+'">'+value_auxiliary+'</span></div>\
							<div style="float:right;position: absolute;top: 102.5px;right: 20px;color:'+color+'"><img src="'+ydyw_img+'" style="width:20px;height:20px;margin-top: 4px;display:'+display+'"  class="'+_class+'"><span style="font-size: 32px;">'+proportion.value+'</span></div>\
							</div>\
							';
						j++;
					}	
					u+='<li class="carousel-item">'+html+'</li>'
				}
				var htmlStr='<ul class="carousel-inner" id="bz_ydyw_ul" style="height:350px">'+u+'</ul>'
				$("#bz_ydyw").empty();
				document.getElementById("bz_ydyw").innerHTML = htmlStr;
				$("#carousel_1").FtCarousel({index: 0,auto: false});
				var ydyw_current_page_span=1;
				var Localclass='bz_ydyw';
				var htmlStr='<div><img id="Website_left" onclick="situation_left_click('+Localclass+')" src="'+eastcom.baseURL+'/static/images/overview/L2.png" style="cursor:pointer;z-index: 10; position: absolute;left: 1140px; top: -2px;width: 40px;height:40px"><img id="Website_right" onclick="situation_right_click('+Localclass+')" src="'+eastcom.baseURL+'/static/images/overview/R2.png" style="cursor:pointer;z-index: 10; position: absolute;left: 1220px;top:-2px; width: 40px;height:40px"></div>\
				<div style="width:32px;height:32px;float: right; z-index: 10; position: absolute;left: 1185px; top: 2px;background-color:#294FC7;border-radius: 15px;"><div style="font-size: 20px;z-index: 10; position: absolute;left: 8px; top: -9px;"><span  id="bz_ydyw_current_page_span" style="margin-left:2px;">'+ydyw_current_page_span+'</span></div></div>';
				$("#bz_ydyw_switch").empty();
				document.getElementById("bz_ydyw_switch").innerHTML = htmlStr;
				window.clearInterval(Situation.bz_ydyw.Slide_time_remove);
				//保障区域 移动业务自动
				$("#bz_ydyw_Grouping_span").html("--- "+Situation.bz_ydyw.name[Situation.bz_ydyw.slidePosition]);
				if(Situation.bz_ydyw.Roll_bool==true){
					Situation.bz_ydyw.Slide_time_remove=setInterval(function() {
						ydyw_right_slide();
					}, Situation.bz_ydyw.time);
				}
			}
		}, 100);
	},
	ydyw_trend:function(){
		var cache=[];
		var bool=[];
		cdm.getIsmHotlteTrend({ids: pmars.jkblh()}, function(result) {
			var result=result.data[pmars.jkblh()];
			for(var d=0;d<Situation.bz_ydyw.classification.ecarts_result_id.length;d++){
				var h=0;
				var isStringEmpty=[];
				for(var s=0;s<result.length;s++){
					isStringEmpty[h]={value:result[s][Situation.bz_ydyw.classification.ecarts_result_id[d]],tb:result[s][Situation.bz_ydyw.classification.ecarts_result_id[d]+"tb"],time:result[s].time}
					h++;
				}
				cache[Situation.bz_ydyw.classification.ecarts_result_id[d]]=isStringEmpty;
				Situation.bz_ydyw.trend=cache;
			}
			bool[0]=true;
			Situation.bz_ydyw.ecarts_bool=bool;
		});
		cdm.getHotspotKpiTrend({ids: pmars.jkblh()}, function(kpi) {
			var kpi=kpi;
			for(var d=0;d<Situation.bz_ydyw.classification.ecarts_kpi_id.length;d++){
				var h=0;
				var isStringEmpty=[];
				for(var s=0;s<kpi.length;s++){
					isStringEmpty[h]={value:kpi[s][Situation.bz_ydyw.classification.ecarts_kpi_id[d]],tb:kpi[s][Situation.bz_ydyw.classification.ecarts_kpi_id[d]+"tb"],time:kpi[s].time};h++;
				}
				cache[Situation.bz_ydyw.classification.ecarts_kpi_id[d]]=isStringEmpty;
				Situation.bz_ydyw.trend=cache;
			}
			bool[1]=true;
			Situation.bz_ydyw.ecarts_bool=bool;
		});
		cdm.getIsmHotgsmTrend({ids: pmars.jkblh()}, function(gsm) {
			var gsm=gsm.data[pmars.jkblh()];
			for(var d=0;d<Situation.bz_ydyw.classification.ecarts_gsm_id.length;d++){
				var h=0;
				var isStringEmpty=[];
				for(var s=0;s<gsm.length;s++){
					isStringEmpty[h]={value:gsm[s][Situation.bz_ydyw.classification.ecarts_gsm_id[d]],tb:gsm[s][Situation.bz_ydyw.classification.ecarts_gsm_id[d]+"tb"],time:gsm[s].time};h++;
				}
				cache[Situation.bz_ydyw.classification.ecarts_gsm_id[d]]=isStringEmpty;
				Situation.bz_ydyw.trend=cache;
			}
			bool[2]=true;
			Situation.bz_ydyw.ecarts_bool=bool;
		});
		cdm.getNewRoamInTrend({type:"intl",hotspot:pmars.jkblh()},function(In){
			var In=In.data;
			for(var d=0;d<Situation.bz_ydyw.classification.ecarts_In_id.length;d++){
				var h=0;
				var isStringEmpty=[];
				for(var s=0;s<In.length;s++){
					isStringEmpty[h]={value:In[s].user_cnt,tb:In[s].user_cnttb,time:In[s].time}
					h++;
				}
				cache[Situation.bz_ydyw.classification.ecarts_In_id[d]]=isStringEmpty;
				Situation.bz_ydyw.trend=cache;
			}
			bool[3]=true;
			Situation.bz_ydyw.ecarts_bool=bool;
		});
		cdm.getNewRoamInTrend({type:"intl_ys",hotspot:pmars.jkblh()},function(In){
			var In=In.data;
			for(var d=0;d<Situation.bz_ydyw.classification.ecarts_Intl_ys_id.length;d++){
				var h=0;
				var isStringEmpty=[];
				for(var s=0;s<In.length;s++){
					isStringEmpty[h]={value:In[s].user_cnt,tb:In[s].user_cnttb,time:In[s].time}
					h++;
				}
				cache[Situation.bz_ydyw.classification.ecarts_Intl_ys_id[d]]=isStringEmpty;
				Situation.bz_ydyw.trend=cache;
			}
			bool[4]=true;
			Situation.bz_ydyw.ecarts_bool=bool;
		});
		cdm.getNewRoamInTrend({type:"pro",hotspot:pmars.jkblh()},function(In){
			var In=In.data;
			for(var d=0;d<Situation.bz_ydyw.classification.ecarts_Pro_id.length;d++){
				var h=0;
				var isStringEmpty=[];
				for(var s=0;s<In.length;s++){
					isStringEmpty[h]={value:In[s].user_cnt,tb:In[s].user_cnttb,time:In[s].time}
					h++;
				}
				cache[Situation.bz_ydyw.classification.ecarts_Pro_id[d]]=isStringEmpty;
				Situation.bz_ydyw.trend=cache;
			}
			bool[5]=true;
			Situation.bz_ydyw.ecarts_bool=bool;
		});
	},
	zqyw : function() {
		var s="";
		var html="";
		var Gavbe=eval("("+pmars.Gavbe()+")");
		var id=["cust_nums","line_nums","fault_cust_nums","fault_line_nums"];
		cdm.getIsmallTerm({type: pmars.jkh()}, function(Term) {
			if(Term.success){
				var h=0;
				var j=0;
				var d="";
				var g="";
				var isStringEmpty=[];
				for(var d=0;d<id.length;d++){
					if(!utils.isStringEmpty(Term.data[id[d]]+"")&&!utils.isStringEmpty(Gavbe[id[d]])){
						isStringEmpty[h]={id:id[d],name:Gavbe[id[d]].auxiliary,value:Term.data[id[d]]};g++;h++;
					}
				}
				var k=parseInt(parseInt(g)/4);
				(parseInt(g)%4==0)? k:k++;
				var q=[];
				for (var l=0;l<k;l++){
					h>parseInt(parseInt(g)/4)?q[l]=4:q[l]=parseInt(g)%4;
				}
				for(var a=0;a<k;a++){
					var html = '';
					for (var c=0;c<q[a];c++){
						var zqyw_margin_right=20;
						var color=pmars.Gavbe_color(isStringEmpty[j].id,isStringEmpty[j].value);
						if(c==3){
							zqyw_margin_right=0;
						}
						html += '<div style="float:left;margin-right:'+zqyw_margin_right+'px">\
							<div style="font-size: 26px;text-align: left;">'+isStringEmpty[j].name+'</div>\
							<div style="background-color: rgba(0, 102, 255, 0.15);border-radius:5px;width:202.5px;height:110px;font-size:46px;text-align: center;"><span style="text-align: center;vertical-align: middle;line-height: 2.3;color:'+color+';">'+isStringEmpty[j].value+'</span><span style="font-size: 20px;color:'+color+';">'+Gavbe[isStringEmpty[j].id].bz_company_auxiliary+'</span></div>\
						</div>\
						';
						j++;
					}
					s += '<li class="carousel-item">' + html + '</li>'
				};
				var htmlStr='<ul class="carousel">'+s+'</ul>'
				$("#zqyw").empty();
				document.getElementById("zqyw").innerHTML = htmlStr;
			}
		});
	},
	zywz:function(){
		Situation.bz_zywz={};
		var Website=eval("("+pmars.Website()+")");
		var parameter_name=utils.getJsonName(Website);
		var id=[];var toshieldnumber=0;
		for(var pm=0;pm<parameter_name.length;pm++){
			if(utils.isStringEmpty(pmars.Website_shield()[parameter_name[pm]])){
				id[toshieldnumber]=parameter_name[pm];toshieldnumber++;
			}
		}
		configuration.Jurisdiction("_zywz_Model",id,"jb","zywz_div");
		var length=parseInt(parseInt(parameter_name.length)/4);
		(parseInt(parameter_name.length)%4==0)? length:length++;
		Situation.bz_zywz.Maximumarr=length;
		$('#bz_zywz_img').attr('src',eastcom.baseURL+'/static/images/overview/zbpz.png');
	},
	zywz_div: function(Jurisdiction) {
		var id=Jurisdiction.id;
		Situation.bz_zywz.name=Jurisdiction.name;
		Situation.bz_zywz.time=Jurisdiction.time;
		Situation.bz_zywz.slidePosition=1;
		Situation.bz_zywz.Roll_bool=false;
		Situation.bz_zywz.Maximum=4;
		Situation.bz_zywz.Maximumarr=2;
		var s="";
		var html="";
		var Website=eval("("+pmars.Website()+")");
		var Originalid=utils.getJsonName(Website);
		cdm.getAllWebsite({}, function(Site) {
			if(Site.success){
				var j=0;
				var d="";
				var g="";
				var h=0;
				var Site=Site.data;
				var isStringEmpty=[];
				for(var d=0;d<id.length;d++){
					if(utils.isStringEmpty(pmars.Website_shield()[id[d]])){
						isStringEmpty[h]={id:id[d],name:Website[id[d]].text,value:Site[id[d]],hb:Site[id[d]+"hb"]};h++;
					}
					g++;
				}
				var original_id=[];
				var toshieldnumber=0;
				for(var d=0;d<Originalid.length;d++){
					if(utils.isStringEmpty(pmars.Website_shield()[Originalid[d]])){original_id[toshieldnumber]=Originalid[d];toshieldnumber++;}
				}
				var k=parseInt(parseInt(g)/4);
				(parseInt(g)%4==0)? k:k++;
				var q=[];
				var x=0;
				for (var h=0;h<k;h++){
					h<parseInt(parseInt(g)/4)?q[h]=4:q[h]=parseInt(g)%4;
					for(var n=0;n<4;n++){
						if(!utils.isStringEmpty(pmars.Website_shield()[id[x]])){q[h]=q[h]-1;}x++;
					}
				}
				Situation.bz_zywz.original=original_id;
				Situation.bz_zywz.source=isStringEmpty;
				Situation.bz_zywz.data={length:k,grouping:q};
				for(var a=0;a<k;a++){
					var html = '';
					for (var c=0;c<q[a];c++){
						var right=10;
						var top1="";
						var top2="";
						var ydyw_img="";
						var margin=20;
						var color="#da6d6d";
						var display="";
						var data_color="";
						var _class="";
						var _class_span="";
						var _margin_right=24;
						var zqyw_margin_right=20;
						var color=pmars.Gavbe_color(isStringEmpty[j].id,isStringEmpty[j].value);
						if(c==3){
							zqyw_margin_right=0;
						}
						var array=Website[isStringEmpty[c].id];
						var proportion=pmars.proportion(array.company,isStringEmpty[c].value,isStringEmpty[c].hb);//获取当前的环比
						if(proportion.bool==0){
							if(proportion.value_auxiliary>=50){ydyw_img=eastcom.baseURL+"/static/styles/local-lsm/ciienew/images/red.png";color="#da6d6d";_class="rotate";_class_span="rotate_span";}
							else{ydyw_img=eastcom.baseURL+"/static/styles/local-lsm/ciienew/images/green.png";color="#00FF00";_class="";_class_span="";}}
						else if(proportion.bool==1){
							if(proportion.value_auxiliary>=50){color="#da6d6d";ydyw_img=eastcom.baseURL+"/static/styles/local-lsm/ciienew/images/red.png";_class="";_class_span="";}
							else{ydyw_img=eastcom.baseURL+"/static/styles/local-lsm/ciienew/images/green.png";color="#00FF00";_class="rotate";_class_span="rotate_span";}}
						else{color="#00FF00";display="none"};
						var val=pmars.conversion(array.company,isStringEmpty[j].value)+array.company_auxiliary;
						html += '<div style="float:left;margin-right:'+zqyw_margin_right+'px">\
							<div style="font-size: 26px;text-align: left;">'+isStringEmpty[j].name+'</div>\
							<div style="background-color: rgba(0, 102, 255, 0.15);border-radius:5px;width:239px;height:110px;font-size:46px;text-align: center;"><span style="text-align: center;vertical-align: middle;line-height: 1.3;color:#66E6FF;">'+val+'</span></div>\
							<div style="float:right;margin-right:'+margin+'px;margin-top:-60px;color:'+color+'"><img src="'+ydyw_img+'" style="width:20px;height:20px;display:'+display+'"  class="'+_class+'"><span style="font-size: 32px;">'+proportion.value+'</span></div>\
						</div>\
						';
						j++;
					}
					s += '<li class="carousel-item">' + html + '</li>'
				};
				var htmlStr='<ul class="carousel-inner" id="bz_zywz_ul" style="margin-top: 70px;height: 180px;">'+s+'</ul>'
				$("#bz_zywz").empty();
				document.getElementById("bz_zywz").innerHTML = htmlStr;
				$("#carousel_3").FtCarousel({index: 0,auto: false});
				var parameter='bz_zywz';
				var htmlStr='<div><img id="Website_left" onclick="situation_left_click('+parameter+')" src="'+eastcom.baseURL+'/static/images/overview/L2.png" style="cursor:pointer;z-index: 10; position: absolute;left: 895px; top: -2px;width: 40px;height:40px"><img id="Website_right" onclick="situation_right_click('+parameter+')" src="'+eastcom.baseURL+'/static/images/overview/R2.png" style="cursor:pointer;z-index: 10; position: absolute;left: 975px;top:-2px; width: 40px;height:40px"></div>\
				<div style="width:32px;height:32px;float: right; z-index: 10; position: absolute;left: 940px; top: 2px;background-color:#294FC7;border-radius: 15px;"><div style="font-size: 20px;z-index: 10; position: absolute;left: 8px; top: -19px;"><span  id="bz_zywz_current_page_span" style="margin-left:2px;">'+Situation.bz_zywz.slidePosition+'</span></div></div>';
				$("#bz_zywz_switch").empty();
				document.getElementById("bz_zywz_switch").innerHTML = htmlStr;
				window.clearInterval(Situation[parameter]["Slide_"+parameter+"_time_remove"]);
				$("#"+parameter+"_Grouping_span").html("--- "+Situation[parameter].name[Situation[parameter].slidePosition]);
				if(Situation[parameter].Roll_bool==true){
				Situation[parameter]["Slide_"+parameter+"_time_remove"]=setInterval(function() {
					situation_right_slide(parameter);
				 }, Situation[parameter].time); 
			  }
			configuration.Assemble(Situation,parameter);
			}
		});
	},
	 aqxi: function() {
	        var name = {
	            a: "网站篡改数",
	            b: "被攻击IP流速",
	            ddos_attack_event_nums: "DDOS攻击事件数",
	            ddos_peak_attack_flow: "DDOS峰值攻击流速",
	            ddos_max_attack_flow: "DDOS最大攻击流量",
	            c: "恶意软件控制量",
	            d: "恶意软件数",
	            e: "漏洞资产数",
	            f: "不良网站数"
	        };
	        var id = ["ddos_attack_event_nums", "ddos_peak_attack_flow", "ddos_max_attack_flow"];
	        cdm.getIsmNetsafety({}, function(result) {
	            if (result.success) {
	                var g = 0;
	                var h = 0;
	                var j = 0;
	                var d = "";
	                var isStringEmpty = [];
	                for (var d = 0; d < id.length; d++) {
	                    utils.isStringEmpty(result.data[id[d]]) ? "" : g++;
	                }
	                result.data.ddos_attack_event_nums = "0";
	                result.data.ddos_max_attack_flow = "0";
	                result.data.ddos_peak_attack_flow = "0";
	                var k = parseInt(parseInt(g) / 4);
	                (parseInt(g) % 4 == 0) ? k : k++;
	                var q = [];
	                for (var h = 0; h < k; h++) {
	                    h < parseInt(parseInt(g) / 4) ? q[h] = 4 : q[h] = parseInt(g) % 4;
	                }
	                var htmlStr = '';
	                for (var a = 0; a < k; a++) {
	                    for (var c = 0; c < q[a]; c++) {
	                        htmlStr += '\<div style="width: 435px; height: 83px;margin-bottom:23px;background-color: #0066ff; border-radius: 15px; background-color: rgba(0, 102, 255, 0.15)">\
								<div class="fl" style="width: 435px; height: 13px">\
								<div class="index-progress">\
								<div class="progress-purple' + c + '"style="width:30%"></div>\
								</div></div>\
								<div style="padding-top:20px"> <span style="font-size: 32px;margin-left:5px;">' + name[id[j]] + '</span>\
								<span style="font-size: 48px;float:right;margin-right:20px;color:#66E6FF;">' + result.data[id[j]] + '</span></div></div>\
								';
	                        j++;
	                    }
	                }
	                $("#aqxi").empty();
	                document.getElementById("aqxi").innerHTML = htmlStr;
	                $('#qw_aqxi_img').attr('src', eastcom.baseURL + '/static/images/overview/anxi.png');
	             	$("#qw_aqxi_div").html("安全信息");
	            }
	        });
	    },
	    wlw: function() {
	        Situation.aqxi_bool = false;
	        var html = '<div style="width: 435px;height:90px;margin-bottom: 20px;background-color: rgba(0, 102, 255, 0.15);">';
	        html += '<img style="margin:11px 0 0 10px" src="' + eastcom.baseURL + '/static/images/overview/zxhwl.png">';
	        html += '<div style="width: 360px;height: 90px;float: right;">';
	        html += '<div style="background-color: rgba(0, 102, 255, 0);width: 140px;height: 90px;float: left" ><span class="span" style="font-size: 26px;">在线用户数</span></div>';
	        html += '<div style="background-color: rgba(0, 102, 255, 0);height: 90px;float: left;color: #66E6FF;" ><span class="span" style="font-size: 32px;"id="online_maxcontexts_number">---</span></div>';
	        html += '<div style="background-color: rgba(0, 102, 255, 0);width: 30px;height: 90px;float: left;" ><span class="span" style="font-size: 26px;">人</span></div>';
	        html += '</div></div>';
	        html += '<div style="width: 207px;height:190px;margin-right:20px;float:left;background-color: rgba(0, 102, 255, 0.15);">';
	        html += '<div style="width: 207px;height:130px;margin-right:20px;">'
	        html += '<div style="width: 207px;height:30px;text-align: center;line-height: 30px;font-size: 32px;color: #66E6FF; position: relative;top: 60%; transform: translateY(-50%); text-align: center;" id="pdpsucccnt_value">---</div></div>';
	        html += '<div style="width: 207px;height:60px;text-align: center;line-height: 30px;font-size: 26px;"><span style="text-align: center; display: block;position: relative;top: 50%;transform: translateY(-50%);">激活成功次数</span></div></div>';
	        html += '<div style="width: 207px;height:190px;background-color: rgba(0, 102, 255, 0.15);float:left">';
	        html += '<div style="width: 207px;height:130px;" id="pdpul"></div>';
	        html += '<div style="width: 207px;height:60px;text-align: center;line-height: 30px;font-size: 26px;"><span style="text-align: center; display: block;position: relative;top: 50%;transform: translateY(-50%);">业务请求成功率</span></div>';
	        html += '<div style="width: 207px;height:30px;text-align: center;line-height: 30px;font-size: 32px;color: #66E6FF;top: -125px;position: relative;" id="pdpul_value">---</div>';
	        html += '</div>';
	        $("#aqxi").empty();
	        document.getElementById("aqxi").innerHTML = html;
	        $('#qw_aqxi_img').attr('src', eastcom.baseURL + '/static/images/overview/wlw.png');
	        $("#qw_aqxi_div").html("物联网业务");
	        cdm.getApnln({}, function(Apnln) {
	            if (Apnln.success) {
	                var Apnln = Apnln.data[0];
	                $("#online_maxcontexts_number").html(utils.Thousand(Apnln.online_maxcontexts_number));
	                ecarts.qw_aqxi("pdpul", Apnln.pdpul / 100, "#00FF00", "业务请求成功率");
	                $("#pdpsucccnt_value").html(Apnln.pdpsucccnt+"次");
	                $("#pdpul_value").html(Apnln.pdpul+"%");
	            }
	        });
	    },
	 CMNET: function() {
	        var parameter = eval("(" + pmars.CMNET() + ")");
	        var CMNETID = pmars.CMNETID();
	        var Coordinate = eval("(" + pmars.CMNETCoordinate() + ")");
	        var htmlStr = "";
	        Situation.bz_cmnet = {};
	        cdm.getCMNET({}, function(CMNet) {
	            if (CMNet.success) {
	            	cdm.getCMNEPtnflow({}, function(flow) {
	            		 if (flow.success) {
	            			  CMNet = CMNet.data;
	            			  flow = flow.data;
	            			  
	                          Situation.bz_cmnet = {};
	                          Situation.bz_cmnet.source = {};
	                          for (var c = 0; c < CMNETID.length; c++) {
	                              if(c<CMNETID.length-2){
	                            	  if (utils.isStringEmpty(CMNet[CMNETID[c]])) {
	                                      CMNet[CMNETID[c]] = "---";
	                                  } else {
	                                      CMNet[CMNETID[c]] = utils.changeTwoDecimal(pmars.conversion(parameter[CMNETID[c]].company, CMNet[CMNETID[c]]));
	                                  }
	                            	  htmlStr += '<div style="z-index:10;position: absolute;top:' + Coordinate[CMNETID[c]].top + '%;left:' + Coordinate[CMNETID[c]].left + '%;background-color: rgba(0, 102, 255, 0);width:73px;height:0px;color:' + Coordinate[CMNETID[c]].color + ';font-size:22px;cursor:pointer;"id="' + CMNETID[c] + '" onclick="_cmnet_click(this)">' + CMNet[CMNETID[c]] + parameter[CMNETID[c]].company_auxiliary + '</div>';
	                              }else{
	                            	  if (utils.isStringEmpty(flow[CMNETID[c]])) {
	                            		  flow[CMNETID[c]] = "---";
	                                  } else {
	                                	  flow[CMNETID[c]] =flow[CMNETID[c]];
	                                  }
	                            	  htmlStr += '<div style="z-index:10;position: absolute;top:' + Coordinate[CMNETID[c]].top + '%;left:' + Coordinate[CMNETID[c]].left + '%;background-color: rgba(0, 102, 255, 0);width:73px;height:0px;color:' + Coordinate[CMNETID[c]].color + ';font-size:22px;"id="' + CMNETID[c] + '">' + flow[CMNETID[c]] + parameter[CMNETID[c]].company_auxiliary + '</div>';
	                              }
	                              var time1 = CMNet.time;
	                              Situation.bz_cmnet.source.time = time1;
	                          }
	                          $("#cmnet_div").empty();
	                          document.getElementById("cmnet_div").innerHTML = htmlStr;
	                          overviewleftyd.cmnet_trend();
	            		 }
	            	});
	            }
	        });
	    },
	cmnet_trend:function(){
		var id=pmars.CMNETID();
		var CMNet_trend=[];
		Situation.bz_cmnet.trend={};
		cdm.getCMNETTrend({}, function(cmnet) {
			if(cmnet.success){
				cmnet=cmnet.data;
				for(var d=0;d<id.length;d++){
					var h=0;
					var isStringEmpty=[];
					for(var s=0;s<cmnet.length;s++){
						isStringEmpty[h]={value:cmnet[s][id[d]],tb:cmnet[s][id[d]+"tb"],time:cmnet[s].time}
						h++;
					}
					CMNet_trend[id[d]]=isStringEmpty;
					Situation.bz_cmnet.trend=CMNet_trend;
				}
			}
		});
	},
	ThresCfg:function(){
		cdm.getThresCfg({}, function(Cfg) {
			if (Cfg.success) {
				Situation.ThresCfg={};
				Situation.ThresCfg=Cfg.data;
				Situation.ThresCfg_bool=true;
			}
		});	
	}
}
function click(){
	$("#k_img").live('click',function(){window.location.href=eastcom.baseURL+"/pages/local-lsm/overview/overviewleft.jsp?isScreenMode="+isScreenMode});
	$("#ciie_img").live('click',function(){window.location.href=eastcom.baseURL+"/pages/local-lsm/ciienew/ciieleft.jsp?isScreenMode="+isScreenMode;parent.overview_right();});
    $("#qw_aqxi_Roll_img").live('click', function() {
   	 if(Situation.aqxi_bool==false){
   		 $('#qw_aqxi_Roll_img').attr('src', eastcom.baseURL + '/static/images/overview/k_1.png');
   		 Situation.aqxi_bool=true;
   		 overviewleftyd.aqxi();
   	 }else{
   		 $('#qw_aqxi_Roll_img').attr('src', eastcom.baseURL + '/static/images/overview/k_2.png');
   		 Situation.aqxi_bool=false;
   		 overviewleftyd.wlw();
   	 }
   });
	$("#cmnet_img").live('click', function() {
        var isStringEmpty = [];
        var cmnet = {};
        var parameter = eval("(" + pmars.CMNET() + ")");
        var CMNETID = pmars.CMNETID();
        var Coordinate = eval("(" + pmars.CMNETModelCoordinate() + ")");
        var length = 0;
        var htmlStr = "";
        cdm.getCMNET({}, function(CMNET) {
            if (CMNET.success) {
            	cdm.getCMNEPtnflow({}, function(flow) {
           		 if (flow.success) {
           			 CMNET = CMNET.data;
           			  flow = flow.data;
           		     for (var c = 0; c < CMNETID.length; c++) {
                         if(c<CMNETID.length-2){
                        	 if (utils.isStringEmpty(CMNET[CMNETID[c]])) {
                                 CMNET[CMNETID[c]] = "---";
                             } else {
                                 CMNET[CMNETID[c]] = utils.changeTwoDecimal(pmars.conversion(parameter[CMNETID[c]].company, CMNET[CMNETID[c]]));
                             }
                             htmlStr += '<div style="z-index:10;position: absolute;top:' + Coordinate[CMNETID[c]].top + 'px;left:' + Coordinate[CMNETID[c]].left + 'px;background-color: rgba(0, 102, 255, 0);color:' + Coordinate[CMNETID[c]].color + ';font-size:32px;"id="' + CMNETID[c] + '" ">' + CMNET[CMNETID[c]] + parameter[CMNETID[c]].company_auxiliary + '</div>'
                         }else{
                        	 if (utils.isStringEmpty(flow[CMNETID[c]])) {
                        		 flow[CMNETID[c]] = "---";
                             } else {
                            	 flow[CMNETID[c]] = flow[CMNETID[c]];
                             }
                             htmlStr += '<div style="z-index:10;position: absolute;top:' + Coordinate[CMNETID[c]].top + 'px;left:' + Coordinate[CMNETID[c]].left + 'px;background-color: rgba(0, 102, 255, 0);color:' + Coordinate[CMNETID[c]].color + ';font-size:32px;"id="' + CMNETID[c] + '" ">' + flow[CMNETID[c]] + parameter[CMNETID[c]].company_auxiliary + '</div>'
                         }
                         length++;
                     }
           		  document.getElementById("CMNet_Modal_index").innerHTML = htmlStr;
           		 }
            	});
            }
        });
        $("#CMNet_Modal").modal("show");
    });
    $("#CMNet_Modal_remove").live('click', function() {
        $("#CMNet_Modal").modal("hide");
    });
	$("#zt_img").live('click',function(){
		var bool=true;
		for(var d=0;d<Situation.bz_ydyw.source.length;d++){
			if(Situation.bz_ydyw.source[d].id==Situation.ecarts_model_id){
				$("#Trend_Modal").modal("show");
				var parameter=eval("("+pmars.LeftTwo_name()+")");
				ecarts.bz_ecarts_model(Situation.ecarts_model_time,Situation.ecarts_model_id,Situation.bz_ydyw.trend,parameter);
				bool=false;
			}
		}
		if(bool==true){
			$("#Trend_Modal").modal("show");
			var CMNET=eval("("+pmars.CMNET()+")");
			ecarts.bz_ecarts_model(Situation.bz_cmnet.source.time,Situation.ecarts_model_id,Situation.bz_cmnet.trend,CMNET);
			bool=false;
		}
	});
}
function _click(id){
	Situation.ecarts_model_id=id;
	for(var d=0;d<Situation.bz_ydyw.source.length;d++){
		if(Situation.bz_ydyw.source[d].id==id){
			Situation.ecarts_model_time=Situation.bz_ydyw.source[d].time;
			var parameter=eval("("+pmars.LeftTwo_name()+")");
			ecarts.bz_ecarts(Situation.ecarts_model_time,Situation.ecarts_model_id,Situation.bz_ydyw.trend,parameter);
			$('#ecarts_trend').attr('src',eastcom.baseURL+pmars.TrendUrl(parameter[id].auxiliary));
		}
	}
}
function _cmnet_click(obgect){
	Situation.ecarts_model_id=obgect.id;
	var CMNET=eval("("+pmars.CMNET()+")");
	ecarts.bz_ecarts(Situation.bz_cmnet.source.time,obgect.id,Situation.bz_cmnet.trend,CMNET);
}
function _model(parameter){
	$("#index_modal").empty();
	configuration.Assemble(Situation,parameter);
	$("#index_modal").modal("show");
}
function jb_ydyw_onmouseover(obgect){
	var ecarts_bool_length=0;
	for(var t=0;t<4;t++){if(!utils.isStringEmpty(Situation.bz_ydyw.ecarts_bool)&&Situation.bz_ydyw.ecarts_bool[t]==true){ecarts_bool_length++;}}
	if(ecarts_bool_length==4){
		$('#popover').css('display','block');
		  var parameter=eval("("+pmars.LeftTwo_name()+")");
		  var position=eval("("+Popoverposition.overviewleftyd()+")");
		  var classification = eval("(" + pmars.classification_guarantee() + ")");
		  var _data_color=$(obgect).data("color");
		  var isStringEmpty=[];
		  if(Situation.bz_ydyw.source.length>0){
			  for(var s=0;s<Situation.bz_ydyw.source.length;s++){
				  if(Situation.bz_ydyw.source[s].id==obgect.id.replace("_span","")){
					  isStringEmpty=Situation.bz_ydyw.source[s];
					  if (!utils.isStringEmpty(isStringEmpty.time) && !utils.isStringEmpty(isStringEmpty.value) && isStringEmpty.value != "---" && Situation.ThresCfg_bool == true && !utils.isStringEmpty(classification[isStringEmpty.id])) {
	                        setTimeout(function() {
	                            Popover.popover(isStringEmpty, position[_data_color], parameter, Situation.ThresCfg, classification[isStringEmpty.id]);
	                        }, 200);
	                        break;
	                    } else {
	                        $('#popover').css('display', 'none');
	                    }
				  }
			  }
		  }  
	}
}
function mouseout(){
	$('#popover').css('display','none');	
}