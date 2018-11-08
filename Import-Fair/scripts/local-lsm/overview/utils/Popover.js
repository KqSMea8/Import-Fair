var Popover = {
    popover: function(isStringEmpty, attribute, parameter, ThresCfg, classification) {
        var json = {};var Explain="";
        var min1 = 100;var max1 = 150;
        var min2 = 50;var max2 = 100;
        var min3 = "";var max3 = "";
        var min4 = "";var max4 = "";
        var ThresCfgName_time="";
        if (parameter[isStringEmpty.id].Tparticle > 59) {
            ThresCfgName_time = "小时";
        } else {
            ThresCfgName_time = parameter[isStringEmpty.id].Tparticle + "分钟";
        }
        var ThresCfgName = "[" + classification.classification + "]-[" + classification.name + "]-[" + ThresCfgName_time + "]-[" + classification.Belonged + "]";
        var level = Situation.ThresCfg[ThresCfgName];
        if (!utils.isStringEmpty(level)) {
            if (!utils.isStringEmpty(level.level_1)) {
                json.threshold1=level.level_1;
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
            }else{
            	json.threshold1="---";
            }
            if (!utils.isStringEmpty(level.level_2)) {
            	 json.threshold2=level.level_2;
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
            }else{
            	json.threshold2="---";
            }
            if (!utils.isStringEmpty(level.level_3)) {
            	 json.threshold3=level.level_3;
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
            }else{
            	json.threshold3="---";
            }
            if (!utils.isStringEmpty(level.level_4)) {
            	json.threshold4=level.level_4;
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
            }else{
            	json.threshold4="---";
            }
        }else{
        	json.threshold1="---";
        	json.threshold2="---";
        	json.threshold3="---";
        	json.threshold4="---";
        }
        json.time1 = pmars.getNowstrhourOfgetMinutes(isStringEmpty.time, (parameter[isStringEmpty.id].Tparticle) * -1, "-", ":").substring(11, 16);
        json.time2 = (isStringEmpty.time).substring(11, 16);
        json.source = parameter[isStringEmpty.id].source;
        json.hbproportion = pmars.proportion(parameter[isStringEmpty.id].company, isStringEmpty.value, isStringEmpty.hb);
        json.tb = isStringEmpty.tb;
        json.tbproportion = pmars.proportion(parameter[isStringEmpty.id].company, isStringEmpty.value, isStringEmpty.tb);
        if (parameter[isStringEmpty.id].company == "(人)") {
            json.hbincrement = pmars.conversion(parameter[isStringEmpty.id].company, (isStringEmpty.value - isStringEmpty.hb)) + parameter[isStringEmpty.id].company_auxiliary;
        } else {
            json.hbincrement = utils.changeTwoDecimal(pmars.conversion(parameter[isStringEmpty.id].company, (isStringEmpty.value - isStringEmpty.hb))) + parameter[isStringEmpty.id].company_auxiliary;
        }
        if (!utils.isStringEmpty(level)&&level.thres_type == "区间") {
        	Explain="(值区间)";
            if (json.hbproportion.bool == 0) {
                if (min2 <= isStringEmpty.value && isStringEmpty.value < max2) {
                    json.hbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/orange.png";
                    json.hbproportion.left = 0;
                    json.hbproportion.color = "#FF8C00";
                    json.hbproportion._class = "";
                } else if (min1 <= isStringEmpty.value && isStringEmpty.value < max1) {
                    json.hbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/red2.png";
                    json.hbproportion.left = 0;
                    json.hbproportion.color = "#da6d6d";
                    json.hbproportion._class = "";
                } else {
                    json.hbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/green.png";
                    json.hbproportion.left = 0;
                    json.hbproportion.color = "#00FF00";
                    json.hbproportion._class = "";
                }
            } else if (json.hbproportion.bool == 1) {
                if (min2 <= isStringEmpty.value && isStringEmpty.value < max2) {
                	  json.hbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/orange.png";
                    json.hbproportion.color = "#FF8C00";
                    json.hbproportion._class = "rotate";
                } else if (min1 <= isStringEmpty.value && isStringEmpty.value < max1) {
                    json.hbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/red2.png";
                    json.hbproportion.color = "#da6d6d";
                    json.hbproportion._class = "rotate";
                } else {
                    json.hbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/green.png";
                    json.hbproportion.color = "#00FF00";
                    json.hbproportion._class = "rotate";
                }
            } else if (json.hbproportion.bool == 2) {
                    json.hbproportion.left = 10;
                    json.hbproportion.color = "#00FF00";
                    json.hbproportion.display = "none";
                    json.hbproportion._class = "";
            }
            if (json.tbproportion.bool == 0) {
                if (min2 <= isStringEmpty.tb && isStringEmpty.tb < max2) {
                    json.tbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/orange.png";
                    json.tbproportion.left = 0;
                    json.tbproportion.color = "#FF8C00";
                    json.tbproportion._class = "";
                } else if (min1 <= isStringEmpty.tb && isStringEmpty.tb < max1) {
                    json.tbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/red2.png";
                    json.tbproportion.left = 0;
                    json.tbproportion.color = "#da6d6d";
                    json.tbproportion._class = "";
                } else {
                    json.tbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/green.png";
                    json.tbproportion.left = 0;
                    json.tbproportion.color = "#00FF00";
                    json.tbproportion._class = "";
                }
            } else if (json.tbproportion.bool == 1) {
                if (min2 <= isStringEmpty.tb && isStringEmpty.tb < max2) {
                	json.tbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/orange.png";
                    json.tbproportion.color = "#FF8C00";
                    json.tbproportion._class = "rotate";
                } else if (min1 <= isStringEmpty.tb && isStringEmpty.tb < max1) {
                    json.tbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/red2.png";
                    json.tbproportion.color = "#da6d6d";
                    json.tbproportion._class = "rotate";
                } else {
                    json.tbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/green.png";
                    json.tbproportion.left = 0;
                    json.tbproportion.color = "#00FF00";
                    json.tbproportion._class = "rotate"
                }
            } else if (json.tbproportion.bool == 2) {
                    json.tbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/green.png";
                    json.tbproportion.left = 10;
                    json.tbproportion.color = "#00FF00";
                    json.tbproportion._class = "";
                    json.tbproportion.display = "none";
            }
        }else if(!utils.isStringEmpty(level)&&level.thres_type == "波动"){
        	Explain="(环比波动)";
        	if (json.hbproportion.bool == 0) {
                if (min2 <= json.hbproportion.value_auxiliary && json.hbproportion.value_auxiliary < max2) {
                    json.hbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/orange.png";
                    json.hbproportion.left = 0;
                    json.hbproportion.color = "#FF8C00";
                    json.hbproportion._class = "";
                } else if (min1 <= json.hbproportion.value_auxiliary && json.hbproportion.value_auxiliary < max1) {
                    json.hbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/red2.png";
                    json.hbproportion.left = 0;
                    json.hbproportion.color = "#da6d6d";
                    json.hbproportion._class = "";
                } else {
                    json.hbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/green.png";
                    json.hbproportion.left = 0;
                    json.hbproportion.color = "#00FF00";
                    json.hbproportion._class = "";
                }
            } else if (json.hbproportion.bool == 1) {
                if (min2 <= json.hbproportion.value_auxiliary && json.hbproportion.value_auxiliary < max2) {
                	json.hbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/orange.png";
                    json.hbproportion.color = "#FF8C00";
                    json.hbproportion._class = "rotate";
                } else if (min1 <= json.hbproportion.value_auxiliary && json.hbproportion.value_auxiliary < max1) {
                    json.hbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/red2.png";
                    json.hbproportion.color = "#da6d6d";
                    json.hbproportion._class = "rotate";
                } else {
                    json.hbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/green.png";
                    json.hbproportion.color = "#00FF00";
                    json.hbproportion._class = "rotate";
                }
            } else if (json.hbproportion.bool == 2) {
                    json.hbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/green.png";
                    json.hbproportion.left = 10;
                    json.hbproportion.color = "#00FF00";
                    json.hbproportion._class = "";
                    json.hbproportion.display = "none";
            }
            if (json.tbproportion.bool == 0) {
                if (min2 <= json.tbproportion.value_auxiliary && json.tbproportion.value_auxiliary < max2) {
                    json.tbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/orange.png";
                    json.tbproportion.left = 0;
                    json.tbproportion.color = "#FF8C00";
                    json.tbproportion._class = "";
                } else if (min1 <= json.tbproportion.value_auxiliary && json.tbproportion.value_auxiliary < max1) {
                    json.tbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/red2.png";
                    json.tbproportion.left = 0;
                    json.tbproportion.color = "#da6d6d";
                    json.tbproportion._class = "";
                } else {
                    json.tbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/green.png";
                    json.tbproportion.left = 0;
                    json.tbproportion.color = "#00FF00";
                    json.tbproportion._class = ""
                }
            } else if (json.tbproportion.bool == 1) {
                if (min2 <= json.tbproportion.value_auxiliary && json.tbproportion.value_auxiliary < max2) {
                    json.tbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/orange.png";
                    json.tbproportion.color = "#FF8C00";
                    json.tbproportion._class = "rotate";
                } else if (min1 <= json.tbproportion.value_auxiliary && json.tbproportion.value_auxiliary < max1) {
                    json.tbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/red2.png";
                    json.tbproportion.color = "#da6d6d";
                    json.tbproportion._class = "rotate";
                } else {
                    json.tbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/green.png";
                    json.tbproportion.left = 0;
                    json.tbproportion.color = "#00FF00";
                    json.tbproportion._class = "rotate"
                }
            } else  if (json.tbproportion.bool == 2) {
                    json.tbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/green.png";
                    json.tbproportion.left = 10;
                    json.tbproportion.color = "#00FF00";
                    json.tbproportion._class = "";
                    json.tbproportion.display = "none";
            } 
        }else{
        	 Explain="(环比波动)";
		   	 json.threshold2="(50,100]";
			 json.threshold1="(100,]";
			 if (json.hbproportion.bool == 0) {
	                if (min2 <= json.hbproportion.value_auxiliary && json.hbproportion.value_auxiliary < max2) {
	                    json.hbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/orange.png";
	                    json.hbproportion.left = 0;
	                    json.hbproportion.color = "#FF8C00";
	                    json.hbproportion._class = "";
	                } else if (min1 <= json.hbproportion.value_auxiliary && json.hbproportion.value_auxiliary < max1) {
	                    json.hbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/red2.png";
	                    json.hbproportion.left = 0;
	                    json.hbproportion.color = "#da6d6d";
	                    json.hbproportion._class = "";
	                } else {
	                    json.hbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/green.png";
	                    json.hbproportion.left = 0;
	                    json.hbproportion.color = "#00FF00";
	                    json.hbproportion._class = "";
	                }
	            } else if (json.hbproportion.bool == 1) {
	                if (min2 <= json.hbproportion.value_auxiliary && json.hbproportion.value_auxiliary < max2) {
	                	json.hbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/orange.png";
	                    json.hbproportion.color = "#FF8C00";
	                    json.hbproportion._class = "rotate";
	                } else if (min1 <= json.hbproportion.value_auxiliary && json.hbproportion.value_auxiliary < max1) {
	                    json.hbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/red2.png";
	                    json.hbproportion.color = "#da6d6d";
	                    json.hbproportion._class = "rotate";
	                } else {
	                    json.hbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/green.png";
	                    json.hbproportion.color = "#00FF00";
	                    json.hbproportion._class = "rotate";
	                }
	            } else if (json.hbproportion.bool == 2) {
	                    json.hbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/green.png";
	                    json.hbproportion.left = 10;
	                    json.hbproportion.color = "#00FF00";
	                    json.hbproportion._class = "";
	                    json.hbproportion.display = "none";
	            }
	            if (json.tbproportion.bool == 0) {
	                if (min2 <= json.tbproportion.value_auxiliary && json.tbproportion.value_auxiliary < max2) {
	                    json.tbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/orange.png";
	                    json.tbproportion.left = 0;
	                    json.tbproportion.color = "#FF8C00";
	                    json.tbproportion._class = "";
	                } else if (min1 <= json.tbproportion.value_auxiliary && json.tbproportion.value_auxiliary < max1) {
	                    json.tbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/red2.png";
	                    json.tbproportion.left = 0;
	                    json.tbproportion.color = "#da6d6d";
	                    json.tbproportion._class = "";
	                } else {
	                    json.tbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/green.png";
	                    json.tbproportion.left = 0;
	                    json.tbproportion.color = "#00FF00";
	                    json.tbproportion._class = ""
	                }
	            } else if (json.tbproportion.bool == 1) {
	                if (min2 <= json.tbproportion.value_auxiliary && json.tbproportion.value_auxiliary < max2) {
	                    json.tbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/orange.png";
	                    json.tbproportion.color = "#FF8C00";
	                    json.tbproportion._class = "rotate";
	                } else if (min1 <= json.tbproportion.value_auxiliary && json.tbproportion.value_auxiliary < max1) {
	                    json.tbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/red2.png";
	                    json.tbproportion.color = "#da6d6d";
	                    json.tbproportion._class = "rotate";
	                } else {
	                    json.tbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/green.png";
	                    json.tbproportion.left = 0;
	                    json.tbproportion.color = "#00FF00";
	                    json.tbproportion._class = "rotate"
	                }
	            } else  if (json.tbproportion.bool == 2) {
	                    json.tbproportion.img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/green.png";
	                    json.tbproportion.left = 10;
	                    json.tbproportion.color = "#00FF00";
	                    json.tbproportion._class = "";
	                    json.tbproportion.display = "none";
	            } 
        }
        if (utils.isStringEmpty(isStringEmpty.hb) || utils.isStringEmpty(isStringEmpty.value)) {
            json.hbincrement = "---";
        }
        if (utils.isStringEmpty(isStringEmpty.tb) || utils.isStringEmpty(isStringEmpty.value)) {
            json.tbincrement = "---";
        } else {
	        if (parameter[isStringEmpty.id].company == "(人)") {
	            json.tbincrement = pmars.conversion(parameter[isStringEmpty.id].company, (isStringEmpty.value - isStringEmpty.tb)) + parameter[isStringEmpty.id].company_auxiliary;
	        } else {
	            json.tbincrement = utils.changeTwoDecimal(pmars.conversion(parameter[isStringEmpty.id].company, (isStringEmpty.value - isStringEmpty.tb))) + parameter[isStringEmpty.id].company_auxiliary;
	        }
        };
        var html = '<div style="width:340px;height:340px;z-index:10;position: absolute;top:' + attribute.top1 + 'px;left:' + attribute.Left1 + 'px" class="' + attribute.rotate + '">';
        html += '<img src="' + attribute.img + '" style="width:100%;height:100%">';
        html += '<div style="position: absolute;top:' + attribute.top + 'px;font-size: 20px;left: ' + attribute.padding_left + 'px;    width: 280px;" class=' + attribute.rotate_span + '>';
        html += '<div style="padding-top: 28px;"><div ><span>时&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;间:</span><span style="color:#66E6FF;margin-left:10px"">' + json.time1 + '~' + json.time2 + '</span></div></div>';
        html += '<div style="padding-top: 5px;"><div ><span>数据来源:</span><span style="color:#66E6FF;margin-left: 10px;">' + json.source + '</span></div></div>';
        html += '<div style="padding-top: 5px;"><div ><span>环比增幅:</span><img src="' + json.hbproportion.img + '" style="width:20px;height:20px;margin-left: 10px;display:' + json.hbproportion.display + '" class="' + json.hbproportion._class + '"><span style="color:' + json.hbproportion.color + ';margin-left: ' + json.hbproportion.left + 'px;">' + json.hbproportion.value + '</span></div></div>';
        html += '<div style="padding-top: 5px;"><div ><span>环比增量:</span><span style="color:#66E6FF;margin-left:10px">' + json.hbincrement + '</span></div></div>';
        html += '<div style="padding-top: 5px;"><div ><span>同比增幅:</span><img src="' + json.tbproportion.img + '" style="width:20px;height:20px;margin-left: 10px;display:' + json.tbproportion.display + '" class="' + json.tbproportion._class + '"><span style="color:' + json.tbproportion.color + ';margin-left: ' + json.tbproportion.left + 'px;">' + json.tbproportion.value + '</span></div></div>';
        html += '<div style="padding-top: 5px;"><div ><span>同比增量:</span><span style="color:#66E6FF;margin-left: 10px;">' + json.tbincrement + '</span></div></div>';
        html += '<div style="padding-top: 5px;"><div ><span>一级阈值:</span><span style="color:#66E6FF;margin-left: 10px;">' + json.threshold1+ '</span><span style="float:right;color:#66E6FF;font-size: 14px;">'+Explain+'</span></div></div>';
        html += '<div style="padding-top: 5px;"><div ><span>二级阈值:</span><span style="color:#66E6FF;margin-left: 10px;">' + json.threshold2+ '</span><span style="float:right;color:#66E6FF;font-size: 14px;">'+Explain+'</span></div></div>';
        html += '</div></div>';
        document.getElementById("popover").innerHTML = html;
    }

}
