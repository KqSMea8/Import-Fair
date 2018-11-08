var cdm = LSMScreen.CacheDataManager.getInstance();
var Situation = {};
//全局变量
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
var overviewleft = {
    init: function() {
        configuration.IsmEaebmCfg("", "caching");
    },
    caching: function(bool) {
        if (bool == true) {
            overviewleft.cache();
        }
    },
    cache: function() {
        overviewleft.ydyw();
        overviewleft.zqyw();
        overviewleft.jtyw();
        overviewleft.wlw();
        overviewleft.CMNET();
        overviewleft.ThresCfg();
        setInterval(function() {overviewleft.ydyw();}, 200000);
        setInterval(function() {overviewleft.jtyw();}, 200000);
        setInterval(function() {overviewleft.CMNET();}, 200000);
        setInterval(function() {overviewleft.zqyw();}, 3600000);
        if (Situation.aqxi_bool == false) {
            Situation.aqxi = setInterval(function() {overviewleft.wlw();}, 3600000);
            window.clearInterval(Situation.wlw);
        } else {
            Situation.wlw = setInterval(function() {overviewleft.aqxi();}, 3600000);
            window.clearInterval(Situation.aqxi);
        }
        setInterval(function() { overviewleft.ThresCfg();}, 3600000);
        click();
    },
    ydyw: function() {
        Situation.qw_ydyw = {};
        Situation.qw_ydyw.classification = {};
        var parameter = eval("(" + pmars.Left_name() + ")");
        var parameter_name = utils.getJsonName(parameter);
        var result_id = [];
        var kpi_id = [];
        var gsm_id = [];
        var In_id = [];
        var Pro_id = [];
        var Intl_id = [];
        var a = 0;
        var b = 0;
        var c = 0;
        var d = 0;
        var e = 0;
        var f = 0;
        var id = [];
        var toshieldnumber = 0;
        for (var pm = 0; pm < parameter_name.length; pm++) {
            if (parameter[parameter_name[pm]].ascription == "1" && utils.isStringEmpty(pmars.shield()[parameter[parameter_name[pm]].id])) {
                result_id[a] = parameter_name[pm];
                a++;
                Situation.qw_ydyw.classification.ecarts_result_id = result_id;
            } else if (parameter[parameter_name[pm]].ascription == "2" && utils.isStringEmpty(pmars.shield()[parameter[parameter_name[pm]].id])) {
                kpi_id[b] = parameter_name[pm];
                b++;
                Situation.qw_ydyw.classification.ecarts_kpi_id = kpi_id;
            } else if (parameter[parameter_name[pm]].ascription == "3" && utils.isStringEmpty(pmars.shield()[parameter[parameter_name[pm]].id])) {
                gsm_id[c] = parameter_name[pm];
                c++;
                Situation.qw_ydyw.classification.ecarts_gsm_id = gsm_id;
            } else if (parameter[parameter_name[pm]].ascription == "4" && utils.isStringEmpty(pmars.shield()[parameter[parameter_name[pm]].id])) {
                In_id[d] = parameter_name[pm];
                d++;
                Situation.qw_ydyw.classification.ecarts_In_id = In_id;
            } else if (parameter[parameter_name[pm]].ascription == "5" && utils.isStringEmpty(pmars.shield()[parameter[parameter_name[pm]].id])) {
                Pro_id[e] = parameter_name[pm];
                e++;
                Situation.qw_ydyw.classification.ecarts_Pro_id = Pro_id;
            } else if (parameter[parameter_name[pm]].ascription == "6" && utils.isStringEmpty(pmars.shield()[parameter[parameter_name[pm]].id])) {
                Intl_id[f] = parameter_name[pm];
                f++;
                Situation.qw_ydyw.classification.ecarts_Intl_id = Intl_id;
            }
            if (utils.isStringEmpty(pmars.shield()[parameter_name[pm]])) {
                id[toshieldnumber] = parameter_name[pm];
                toshieldnumber++;
            }
        }
        overviewleft.ydyw_trend();
        //获取趋势数据
        var length = parseInt(parseInt(id.length) / 6);
        (parseInt(id.length) % 6 == 0) ? length : length++;
        if(length>6){length=6}
        Situation.qw_ydyw.Maximumarr = length;
        configuration.Jurisdiction("_Model", id, "", "ydyw_div");
        $('#qw_ydyw_img').attr('src', eastcom.baseURL + '/static/images/overview/zbpz.png');
    },
    ydyw_div: function(Jurisdiction) {
        var id = Jurisdiction.id;
        Situation.qw_ydyw.name = Jurisdiction.name;
        Situation.qw_ydyw.time = Jurisdiction.time;
        Situation.qw_ydyw.Roll_bool = false;
        Situation.qw_ydyw.slidePosition = 1;
        Situation.qw_ydyw.Maximum = 6;
        var parameter = eval("(" + pmars.Left_name() + ")");
        var base = {};
        var bool = [];
        cdm.getIsmAllltewg({}, function(result) {
            if (result.success) {
                var h = 0;
                var ecarts_result_id_json = {};
                for (var d1 = 0; d1 < Situation.qw_ydyw.classification.ecarts_result_id.length; d1++) {
                    ecarts_result_id_json[Situation.qw_ydyw.classification.ecarts_result_id[d1]] = Situation.qw_ydyw.classification.ecarts_result_id[d1];
                }
                for (var d = 0; d < id.length; d++) {
                    if (!utils.isStringEmpty(parameter[id[d]]) && !utils.isStringEmpty(ecarts_result_id_json[id[d]]) && utils.isStringEmpty(pmars.shield()[id[d]])) {
                        if (utils.isStringEmpty(result.data[id[d]])) {
                            base[id[d]] = {
                                id: id[d],
                                name: parameter[id[d]],
                                value: "---",
                                hb: "---",
                                tb: "---",
                                time: result.data.time
                            };
                            h++;
                        } else {
                            base[id[d]] = {
                                id: id[d],
                                name: parameter[id[d]],
                                value: result.data[id[d]],
                                hb: result.data[id[d] + "hb"],
                                tb: result.data[id[d] + "tb"],
                                time: result.data.time
                            };
                            h++;
                        }
                    }
                }
                bool[0] = true;
            }
        });
        cdm.getIsmallkpi({}, function(kpi) {
            if (kpi.success) {
                var h = 0;
                var ecarts_kpi_id_json = {};
                for (var d2 = 0; d2 < Situation.qw_ydyw.classification.ecarts_kpi_id.length; d2++) {
                    ecarts_kpi_id_json[Situation.qw_ydyw.classification.ecarts_kpi_id[d2]] = Situation.qw_ydyw.classification.ecarts_kpi_id[d2];
                }
                for (var d = 0; d < id.length; d++) {
                    if (!utils.isStringEmpty(parameter[id[d]]) && !utils.isStringEmpty(ecarts_kpi_id_json[id[d]]) && utils.isStringEmpty(pmars.shield()[id[d]])) {
                        if (utils.isStringEmpty(kpi.data[id[d]])) {
                            base[id[d]] = {
                                id: id[d],
                                name: parameter[id[d]],
                                value: "---",
                                hb: "---",
                                tb: "---",
                                time: kpi.data.time
                            };
                            h++;
                        } else {
                            base[id[d]] = {
                                id: id[d],
                                name: parameter[id[d]],
                                value: kpi.data[id[d]],
                                hb: kpi.data[id[d] + "hb"],
                                tb: kpi.data[id[d] + "tb"],
                                time: kpi.data.time
                            };
                            h++;
                        }
                    }
                }
                bool[1] = true;
            }
        });
        cdm.getIsmAllgsmwg({}, function(gsm) {
            var h = 0;
            var ecarts_gsm_id_json = {};
            for (var d3 = 0; d3 < Situation.qw_ydyw.classification.ecarts_gsm_id.length; d3++) {
                ecarts_gsm_id_json[Situation.qw_ydyw.classification.ecarts_gsm_id[d3]] = Situation.qw_ydyw.classification.ecarts_gsm_id[d3];
            }
            for (var d = 0; d < id.length; d++) {
                if (!utils.isStringEmpty(parameter[id[d]]) && !utils.isStringEmpty(ecarts_gsm_id_json[id[d]]) && utils.isStringEmpty(pmars.shield()[id[d]])) {
                    if (utils.isStringEmpty(gsm.data[id[d]])) {
                        base[id[d]] = {
                            id: id[d],
                            name: parameter[id[d]],
                            value: "---",
                            hb: "---",
                            tb: "---",
                            time: gsm.data.time
                        };
                        h++;
                    } else {
                        base[id[d]] = {
                            id: id[d],
                            name: parameter[id[d]],
                            value: gsm.data[id[d]],
                            hb: gsm.data[id[d] + "hb"],
                            tb: gsm.data[id[d] + "tb"],
                            time: gsm.data.time
                        };
                        h++;
                    }
                }
            }
            bool[2] = true;
        });
        cdm.getUserDistAll({}, function(all) {
            var h = 0;
            var ecarts_In_id_json = {};
            var ecarts_Pro_id_json = {};
            var ecarts_Intl_id_json = {};
            /* for (var d4 = 0; d4 < Situation.qw_ydyw.classification.ecarts_In_id.length; d4++) {
                ecarts_In_id_json[Situation.qw_ydyw.classification.ecarts_In_id[d4]] = Situation.qw_ydyw.classification.ecarts_In_id[d4];
            }*/
            /*      for (var d5 = 0; d5 < Situation.qw_ydyw.classification.ecarts_Pro_id.length; d5++) {
                ecarts_Pro_id_json[Situation.qw_ydyw.classification.ecarts_Pro_id[d5]] = Situation.qw_ydyw.classification.ecarts_Pro_id[d5];
            }*/
            for (var d6 = 0; d6 < Situation.qw_ydyw.classification.ecarts_Intl_id.length; d6++) {
                ecarts_Intl_id_json[Situation.qw_ydyw.classification.ecarts_Intl_id[d6]] = Situation.qw_ydyw.classification.ecarts_Intl_id[d6];
            }
            var all = all.data;
            for (var d = 0; d < id.length; d++) {
                if (id[d] == "ydylgj" && !utils.isStringEmpty(parameter[id[d]]) && utils.isStringEmpty(pmars.shield()[id[d]]) && !utils.isStringEmpty(ecarts_Intl_id_json[id[d]])) {
                    if (utils.isStringEmpty(all.intl_ys)) {
                        base[id[d]] = {
                            id: id[d],
                            name: parameter[id[d]],
                            value: "---",
                            hb: "---",
                            tb: "---",
                            time: all.intl_ys.time
                        };
                        h++;
                    } else {
                        base[id[d]] = {
                            id: id[d],
                            name: parameter[id[d]],
                            value: all.intl_ys.user_cnt,
                            hb: all.intl_ys.user_cnthb,
                            tb: all.intl_ys.user_cnttb,
                            time: all.intl_ys.time
                        };
                        h++;
                    }
                }
            }
            bool[3] = true;
        });
        var original_id = utils.getJsonName(parameter);
        var toshield = [];
        var toshieldnumber = 0;
        for (var q = 0; q < original_id.length; q++) {
            if (utils.isStringEmpty(pmars.shield()[original_id[q]])) {
                toshield[toshieldnumber] = original_id[q];
                toshieldnumber++;
            }
        }
        Situation.qw_ydyw.ecarts_base_model = setInterval(function() {
            var t = 0
            for (var e = 0; e < bool.length; e++) {
                if (bool[e] == true) {
                    t++;
                }
            }
            if (!utils.isStringEmpty(Situation.ThresCfg)) {
                if (t >= 4 && Situation.ThresCfg.bool == true) {
                    var base1 = base;
                    base = [];
                    for (var q = 0; q < id.length; q++) {
                        if (utils.isStringEmpty(pmars.shield()[id[q]])) {
                            base[id[q]] = base1[id[q]];
                        }
                    }
                    var base_name = utils.getJsonName(base);
                    Situation.ecarts_model_id = base_name[0];
                    Situation.ecarts_model_time = base[base_name[0]].time;
                    window.clearInterval(Situation.qw_ydyw.ecarts_base_model);
                    var k = parseInt(parseInt(id.length) / 6);
                    (parseInt(id.length) % 6 == 0) ? k : k++;
                    var q = [];
                    var x = 0;
                    var j = 0;
                    var arr = 0;
                    var u = "";
                    for (var h = 0; h < k; h++) {
                        h < parseInt(parseInt(id.length) / 6) ? q[h] = 6 : q[h] = parseInt(id.length) % 6;
                        arr = q[h];
                        for (var n = 0; n < arr; n++) {
                            if (!utils.isStringEmpty(pmars.shield()[id[x]])) {
                                q[h] = q[h] - 1;
                            }
                            x++;
                        }
                    }
                    var ecarts_setInterval_bool = true;
                    var ecarts_trend_model = setInterval(function() {
                        var ecarts_bool_length = 0;
                        for (var t = 0; t < 4; t++) {
                            if (!utils.isStringEmpty(Situation.qw_ydyw.ecarts_bool) && Situation.qw_ydyw.ecarts_bool[t] == true) {
                                ecarts_bool_length++;
                            }
                        }
                        if (ecarts_bool_length == 4) {
                            if (ecarts_setInterval_bool == true) {
                                window.clearInterval(ecarts_trend_model);
                                ecarts.qw_ecarts(Situation.ecarts_model_time, Situation.ecarts_model_id, Situation.qw_ydyw.trend, parameter);
                                ecarts_setInterval_bool = false;
                            }
                        }
                        $('#qw_trend_img').html('<img  id=" bz_trend_img" src=' + eastcom.baseURL + pmars.TrendUrl(parameter[Situation.ecarts_model_id].auxiliary) + ' style="width:44px;">');
                    }, 100);
                    var source = [];
                    var sourcelength = 0;
                    for (var d = 0; d < id.length; d++) {
                        if (!utils.isStringEmpty(base[id[d]]) && utils.isStringEmpty(pmars.shield()[id[d]])) {
                            source[sourcelength] = base[id[d]];
                            sourcelength++;
                        } else {
                            console.log(id[d]);
                        }
                    }
                    Situation.qw_ydyw.source = source;
                    Situation.qw_ydyw.original = toshield;
                    Situation.qw_ydyw.data = {
                        length: k,
                        grouping: q
                    };
                    for (var g = 0; g < k; g++) {
                        var html = '';
                        for (var c = 0; c < q[g]; c++) {
                            var right = 10;
                            var ydyw_img = "";
                            var margin = 20;
                            var color = "#da6d6d";
                            var display = "";
                            var data_color = "";
                            var _class = "";
                            var _class_span = "";
                            var _margin_right = 24;
                            var min1 = 100;
                            var max1 = 150;
                            var min2 = 50;
                            var max2 = 100;
                            var min3 = "";
                            var max3 = "";
                            var min4 = "";
                            var max4 = -1;
                            var color2 = "#66E6FF";
                            var ThresCfgName_time = "";
                            var array = parameter[source[j].id];
                            var proportion = pmars.proportion(array.company, source[j].value, source[j].hb);
                            //获取当前的环比
                            var value_auxiliary = pmars.conversion(array.company, source[j].value);
                            //格式当信息
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
                            }
                            ;if (!utils.isStringEmpty(level) && level.thres_type == "区间") {
                                if (proportion.bool == 0) {
                                    if (min2 <= value_auxiliary && value_auxiliary < max2) {
                                        ydyw_img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/orange.png";
                                        color = "#FF8C00";
                                        color2 = "#FF8C00";
                                        _class = "";
                                        _class_span = "";
                                    } else if (min1 <= value_auxiliary && value_auxiliary < max1) {
                                        ydyw_img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/red2.png";
                                        color = "#da6d6d";
                                        color2 = "#da6d6d";
                                        _class = "";
                                        _class_span = "";
                                    } else {
                                        ydyw_img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/green.png";
                                        color = "#00FF00";
                                        color2 = "#66E6FF";
                                        _class = "";
                                        _class_span = "";
                                    }
                                } else if (proportion.bool == 1) {
                                    if (min2 <= value_auxiliary && value_auxiliary < max2) {
                                        ydyw_img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/orange.png";
                                        color = "#FF8C00";
                                        color2 = "#FF8C00";
                                        _class = "rotate";
                                        _class_span = "rotate_span";
                                    } else if (min1 <= value_auxiliary && value_auxiliary < max1) {
                                        ydyw_img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/red2.png";
                                        color = "#da6d6d";
                                        color2 = "#da6d6d";
                                        _class = "rotate";
                                        _class_span = "rotate_span";
                                    } else {
                                        ydyw_img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/green.png";
                                        color = "#00FF00";
                                        color2 = "#66E6FF";
                                        _class = "rotate";
                                        _class_span = "rotate_span";
                                    }
                                } else {
                                    ydyw_img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/green.png";
                                    color = "#00FF00";
                                    color2 = "#66E6FF";
                                    _class = "";
                                    _class_span = "";
                                    display = "none"
                                }
                            } else if (!utils.isStringEmpty(level) && level.thres_type == "波动") {
                                if (proportion.bool == 0) {
                                    if (min2 <= proportion.value_auxiliary && proportion.value_auxiliary < max2) {
                                        ydyw_img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/orange.png";
                                        color = "#FF8C00";
                                        color2 = "#FF8C00";
                                        _class = "";
                                        _class_span = "";
                                    } else if (min1 <= proportion.value_auxiliary && proportion.value_auxiliary < max1) {
                                        ydyw_img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/red2.png";
                                        color = "#da6d6d";
                                        color2 = "#da6d6d";
                                        _class = "";
                                        _class_span = "";
                                    } else {
                                        ydyw_img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/green.png";
                                        color = "#00FF00";
                                        color2 = "#66E6FF";
                                        _class = "";
                                        _class_span = "";
                                    }
                                } else if (proportion.bool == 1) {
                                    if (min2 <= proportion.value_auxiliary && proportion.value_auxiliary < max2) {
                                        ydyw_img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/orange.png";
                                        color = "#FF8C00";
                                        color2 = "#FF8C00";
                                        _class = "rotate";
                                        _class_span = "rotate_span";
                                    } else if (min1 <= proportion.value_auxiliary && proportion.value_auxiliary < max1) {
                                        ydyw_img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/red2.png";
                                        color = "#da6d6d";
                                        color2 = "#da6d6d";
                                        _class = "rotate";
                                        _class_span = "rotate_span";
                                    } else {
                                        ydyw_img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/green.png";
                                        color = "#00FF00";
                                        color2 = "#66E6FF";
                                        _class = "rotate";
                                        _class_span = "rotate_span";
                                    }
                                } else {
                                    ydyw_img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/green.png";
                                    color = "#00FF00";
                                    color2 = "#66E6FF";
                                    _class = "";
                                    _class_span = "";
                                    display = "none";
                                }
                            } else {
                            	if (proportion.bool == 0) {
                                    if (min2 <= proportion.value_auxiliary && proportion.value_auxiliary < max2) {
                                        ydyw_img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/orange.png";
                                        color = "#FF8C00";
                                        color2 = "#FF8C00";
                                        _class = "";
                                        _class_span = "";
                                    } else if (min1 <= proportion.value_auxiliary && proportion.value_auxiliary < max1) {
                                        ydyw_img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/red2.png";
                                        color = "#da6d6d";
                                        color2 = "#da6d6d";
                                        _class = "";
                                        _class_span = "";
                                    } else {
                                        ydyw_img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/green.png";
                                        color = "#00FF00";
                                        color2 = "#66E6FF";
                                        _class = "";
                                        _class_span = "";
                                    }
                                } else if (proportion.bool == 1) {
                                    if (min2 <= proportion.value_auxiliary && proportion.value_auxiliary < max2) {
                                        ydyw_img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/orange.png";
                                        color = "#FF8C00";
                                        color2 = "#FF8C00";
                                        _class = "rotate";
                                        _class_span = "rotate_span";
                                    } else if (min1 <= proportion.value_auxiliary && proportion.value_auxiliary < max1) {
                                        ydyw_img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/red2.png";
                                        color = "#da6d6d";
                                        color2 = "#da6d6d";
                                        _class = "rotate";
                                        _class_span = "rotate_span";
                                    } else {
                                        ydyw_img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/green.png";
                                        color = "#00FF00";
                                        color2 = "#66E6FF";
                                        _class = "rotate";
                                        _class_span = "rotate_span";
                                    }
                                } else {
                                    ydyw_img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/green.png";
                                    color = "#00FF00";
                                    color2 = "#66E6FF";
                                    _class = "";
                                    _class_span = "";
                                    display = "none";
                                }
                            }
                            ;if (c == 2 || c == 5) {
                                _margin_right = 0;
                            }
                            html += '<div style="position: relative;width:426px;height:157.5px;cursor: pointer;margin-top:16px;margin-right:' + _margin_right + 'px;border-radius:5px; background-color: rgba(0, 102, 255, 0.35);float:left" onmouseout ="mouseout(this)"  onclick="_click(this.id);" id="' + source[j].id + '" data-uname="' + source[j].id + '">\
						<div style="width:200px;display: inline-block;line-height: 48px;width:200px;float:left;margin-top:10px;margin-left: 20px;text-align: left;"><span style="font-size:28px;">' + source[j].name.text + '</span></div>\
						<div style="float:right;position: absolute;top: 27.5px;right: 20px;color:' + color2 + ';" id="' + source[j].id + '_span"><span style="font-size: 62px;"  onmouseover="ydyw_onmouseover(this);" id="' + source[j].id + '_span"  data-color="ydyw_suspension_' + c + '">' + value_auxiliary + '</span></div>\
						<div style="float:right;position: absolute;top: 102.5px;right: 20px;color:' + color + '"><img src="' + ydyw_img + '" style="width:20px;height:20px;margin-top: 4px;display:' + display + '"  class="' + _class + '"><span style="font-size: 32px;">' + proportion.value + '</span></div>\
						</div>\
						';
                            j++;
                        }
                        u += '<li class="carousel-item">' + html + '</li>'
                    }
                    var htmlStr = '<ul class="carousel-inner" id="qw_ydyw_ul" style="height:350px">' + u + '</ul>'
                    $("#qw_ydyw").empty();
                    document.getElementById("qw_ydyw").innerHTML = htmlStr;
                    $("#carousel_1").FtCarousel({
                        index: 0,
                        auto: false
                    });
                    var ydyw_current_page_span = 1;
                    var Localclass = 'qw_ydyw';
                    var htmlStr = '<div><img id="Website_left" onclick="situation_left_click(' + Localclass + ')" src="' + eastcom.baseURL + '/static/images/overview/L2.png" style="cursor:pointer;z-index: 10; position: absolute;left: 1140px; top: -2px;width: 40px;height:40px"><img id="Website_right" onclick="situation_right_click(' + Localclass + ')" src="' + eastcom.baseURL + '/static/images/overview/R2.png" style="cursor:pointer;z-index: 10; position: absolute;left: 1220px;top:-2px; width: 40px;height:40px"></div>\
                    <div style="width:32px;height:32px;float: right; z-index: 10; position: absolute;left: 1185px; top: 2px;background-color:#294FC7;border-radius: 15px;"><div style="font-size: 20px;z-index: 10; position: absolute;left: 8px; top: -9px;"><span  id="qw_ydyw_current_page_span" style="margin-left:2px;">' + ydyw_current_page_span + '</span></div></div>';
                    $("#qw_ydyw_switch").empty();
                    document.getElementById("qw_ydyw_switch").innerHTML = htmlStr;
                    window.clearInterval(Situation.qw_ydyw.Slide_time_remove);
                    //全网 移动业务自动
                    $("#qw_ydyw_Grouping_span").html("--- " + Situation.qw_ydyw.name[Situation.qw_ydyw.slidePosition]);
                    if (Situation.qw_ydyw.Roll_bool == true) {
                        Situation.qw_ydyw.Slide_time_remove = setInterval(function() {
                            ydyw_right_slide();
                        }, Situation.qw_ydyw.time);
                    }
                }
            }
        }, 100);
    },
    ydyw_trend: function() {
        var cache = [];
        var bool = [];
        cdm.getIsmAllltewgTrend({}, function(result) {
            for (var d = 0; d < Situation.qw_ydyw.classification.ecarts_result_id.length; d++) {
                var h = 0;
                var isStringEmpty = [];
                if (result.success) {
                    for (var s = 0; s < result.data.length; s++) {
                        isStringEmpty[h] = {
                            value: result.data[s][Situation.qw_ydyw.classification.ecarts_result_id[d]],
                            tb: result.data[s][Situation.qw_ydyw.classification.ecarts_result_id[d] + "tb"],
                            time: result.data[s].time
                        }
                        h++;
                    }
                    cache[Situation.qw_ydyw.classification.ecarts_result_id[d]] = isStringEmpty;
                    Situation.qw_ydyw.trend = cache;
                }
            }
            bool[0] = true;
            Situation.qw_ydyw.ecarts_bool = bool;
        });
        cdm.getIsmallkpiTrend({}, function(kpi) {
            for (var d = 0; d < Situation.qw_ydyw.classification.ecarts_kpi_id.length; d++) {
                var h = 0;
                var isStringEmpty = [];
                if (kpi.success) {
                    for (var s = 0; s < kpi.data.length; s++) {
                        isStringEmpty[h] = {
                            value: kpi.data[s][Situation.qw_ydyw.classification.ecarts_kpi_id[d]],
                            tb: kpi.data[s][Situation.qw_ydyw.classification.ecarts_kpi_id[d] + "tb"],
                            time: kpi.data[s].time
                        }
                        h++;
                    }
                    cache[Situation.qw_ydyw.classification.ecarts_kpi_id[d]] = isStringEmpty;
                    Situation.qw_ydyw.trend = cache;
                }
            }
            bool[1] = true;
            Situation.qw_ydyw.ecarts_bool = bool;
        });
        cdm.getIsmAllgsmwgTrend({}, function(gsm) {
            for (var d = 0; d < Situation.qw_ydyw.classification.ecarts_gsm_id.length; d++) {
                var h = 0;
                var isStringEmpty = [];
                if (gsm.success) {
                    for (var s = 0; s < gsm.data.length; s++) {
                        isStringEmpty[h] = {
                            value: gsm.data[s][Situation.qw_ydyw.classification.ecarts_gsm_id[d]],
                            tb: gsm.data[s][Situation.qw_ydyw.classification.ecarts_gsm_id[d] + "tb"],
                            time: gsm.data[s].time
                        }
                        h++;
                    }
                    cache[Situation.qw_ydyw.classification.ecarts_gsm_id[d]] = isStringEmpty;
                    Situation.qw_ydyw.trend = cache;
                }
            }
            bool[2] = true;
            Situation.qw_ydyw.ecarts_bool = bool;
        });
        /*        cdm.getNewRoamInTrend({
            type: "intl",
            hotspot: "all"
        }, function(In) {
            for (var d = 0; d < Situation.qw_ydyw.classification.ecarts_In_id.length; d++) {
                var h = 0;
                var isStringEmpty = [];
                if (In.success) {
                    for (var s = 0; s < In.data.length; s++) {
                        isStringEmpty[h] = {
                            value: In.data[s][Situation.qw_ydyw.classification.ecarts_In_id[d]],
                            tb: In.data[s][Situation.qw_ydyw.classification.ecarts_In_id[d] + "tb"],
                            time: In.data[s].time+":00"
                        }
                        h++;
                    }
                    cache[Situation.qw_ydyw.classification.ecarts_In_id[d]] = isStringEmpty;
                    Situation.qw_ydyw.trend = cache;
                }
            }
            bool[3] = true;
            Situation.qw_ydyw.ecarts_bool = bool;
        });*/
        cdm.getNewRoamInTrend({
            type: "intl_ys",
            hotspot: "all"
        }, function(Intl) {
            for (var d = 0; d < Situation.qw_ydyw.classification.ecarts_Intl_id.length; d++) {
                var h = 0;
                var isStringEmpty = [];
                if (Intl.success) {
                    for (var s = 0; s < Intl.data.length; s++) {
                        isStringEmpty[h] = {
                            value: Intl.data[s].user_cnt,
                            tb: Intl.data[s].user_cnttb,
                            time: Intl.data[s].time + ":00"
                        }
                        h++;
                    }
                    cache[Situation.qw_ydyw.classification.ecarts_Intl_id[d]] = isStringEmpty;
                    Situation.qw_ydyw.trend = cache;
                }
            }
            bool[3] = true;
            Situation.qw_ydyw.ecarts_bool = bool;
        });
    },
    zqyw: function() {
        Situation.qw_zqyw = {};
        var original_id = utils.getJsonName(eval("(" + pmars.Gavbe() + ")"));
        var id = [];
        var toshieldnumber = 0;
        for (var q = 0; q < original_id.length; q++) {
            if (utils.isStringEmpty(pmars.Gavbe_shield()[original_id[q]])) {
                id[toshieldnumber] = original_id[q];
                toshieldnumber++;
            }
        }
        $('#qw_zqyw_img').attr('src', eastcom.baseURL + '/static/images/overview/zbpz.png');
        configuration.Jurisdiction("_zqyw_Model", id, "", "zqyw_div");
        var length = parseInt(parseInt(original_id.length) / 4);
        (parseInt(original_id.length) % 4 == 0) ? length : length++;
        Situation.qw_zqyw.Maximumarr = length;
    },
    zqyw_div: function(Jurisdiction) {
        Jurisdiction.id = ["cust_nums", "line_nums", "fault_cust_nums", "fault_line_nums"];
        var id = Jurisdiction.id;
        Situation.qw_zqyw.name = Jurisdiction.name;
        Situation.qw_zqyw.time = Jurisdiction.time;
        Situation.qw_zqyw.slidePosition = 1;
        Situation.qw_zqyw.Roll_bool = false;
        Situation.qw_zqyw.Maximum = 4;
        var s = "";
        var html = "";
        var Website = eval("(" + pmars.Gavbe() + ")");
        cdm.getIsmallTerm({}, function(Site) {
            if (Site.success) {
                var j = 0;
                var d = "";
                var g = "";
                var h = 0;
                var Site = Site.data;
                var isStringEmpty = [];
                for (var d = 0; d < id.length; d++) {
                    if (utils.isStringEmpty(pmars.Gavbe_shield()[id[d]])) {
                        isStringEmpty[h] = {
                            id: id[d],
                            name: Website[id[d]].text,
                            value: Site[id[d]]
                        };
                        h++;
                    }
                    g++;
                }
                var original_id = utils.getJsonName(Website);
                var toshield = [];
                var toshieldnumber = 0;
                for (var q = 0; q < original_id.length; q++) {
                    if (utils.isStringEmpty(pmars.Gavbe_shield()[original_id[q]])) {
                        toshield[toshieldnumber] = original_id[q];
                        toshieldnumber++;
                    }
                }
                var k = parseInt(parseInt(g) / 4);
                (parseInt(g) % 4 == 0) ? k : k++;
                var q = [];
                var x = 0;
                for (var h = 0; h < k; h++) {
                    h < parseInt(parseInt(g) / 4) ? q[h] = 4 : q[h] = parseInt(g) % 4;
                    for (var n = 0; n < 4; n++) {
                        if (!utils.isStringEmpty(pmars.Gavbe_shield()[id[x]])) {
                            q[h] = q[h] - 1;
                        }
                        x++;
                    }
                }
                Situation.qw_zqyw.original = toshield;
                Situation.qw_zqyw.source = isStringEmpty;
                Situation.qw_zqyw.data = {
                    length: k,
                    grouping: q
                };
                for (var a = 0; a < k; a++) {
                    var html = '';
                    for (var c = 0; c < q[a]; c++) {
                        var zqyw_margin_right = 20;
                        var array = Website[isStringEmpty[j].id];
                        var color = pmars.Gavbe_color(isStringEmpty[j].id, isStringEmpty[j].value);
                        var value0=pmars.conversion(array.company, isStringEmpty[j].value) ;
                        if(isStringEmpty[j].id=="fault_cust_nums"||isStringEmpty[j].id=="fault_line_nums"){
                        	value0=isStringEmpty[j].value;
                        }
                        if (c == 3) {
                            zqyw_margin_right = 0;
                        }
                        html += '<div style="float:left;margin-right:' + zqyw_margin_right + 'px">\
							<div style="font-size: 26px;text-align: left;">' + isStringEmpty[j].name + '</div>\
							<div style="background-color: rgba(0, 102, 255, 0.15);border-radius:5px;width:202.5px;height:110px;font-size:40px;text-align: center;"><span style="text-align: center;vertical-align: middle;line-height: 2.3;color:' + color + ';">' + value0+ '</span><span style="    font-size: 20px;color:' + color + ';">' + array.company_auxiliary + '</span></div>\
						</div>\
						';
                        j++;
                    }
                    s += '<li class="carousel-item">' + html + '</li>'
                }
                ;var htmlStr = '<ul class="carousel-inner" id="qw_zqyw_ul" style="margin-top: 68px;height: 180px;">' + s + '</ul>'
                $("#qw_zqyw").empty();
                document.getElementById("qw_zqyw").innerHTML = htmlStr;
                $("#carousel_3").FtCarousel({
                    index: 0,
                    auto: false
                });
                var parameter = 'qw_zqyw';
                var htmlStr = '<div><img id="Website_left" onclick="situation_left_click(' + parameter + ')" src="' + eastcom.baseURL + '/static/images/overview/L2.png" style="cursor:pointer;z-index: 10; position: absolute;left: 740px; top: -2px;width: 40px;height:40px"><img id="Website_right" onclick="situation_right_click(' + parameter + ')" src="' + eastcom.baseURL + '/static/images/overview/R2.png" style="cursor:pointer;z-index: 10; position: absolute;left: 820px;top:-2px; width: 40px;height:40px"></div>\
				<div style="width:32px;height:32px;float: right; z-index: 10; position: absolute;left: 785px; top: 2px;background-color:#294FC7;border-radius: 15px;"><div style="font-size: 20px;z-index: 10; position: absolute;left: 8px; top: -19px;"><span  id="qw_zqyw_current_page_span" style="margin-left:2px;">' + Situation.qw_zqyw.slidePosition + '</span></div></div>';
                $("#qw_zqyw_switch").empty();
                /*  document.getElementById("qw_zqyw_switch").innerHTML = htmlStr;*/
                /* $("#" + parameter + "_Grouping_span").html("--- " + Situation[parameter].name[Situation[parameter].slidePosition]);*/
                if (Situation[parameter].Roll_bool == true) {
                    Situation[parameter]["Slide_" + parameter + "_time_remove"] = setInterval(function() {
                        situation_right_slide(parameter);
                    }, Situation[parameter].time);
                }
                if(Situation.CLICK=="qw_ydyw"){
                	configuration.Assemble(Situation, parameter);
                }
            }
        });
    },
    jtyw: function() {
        Situation.qw_jtyw = {};
        Situation.qw_jtyw.classification = {};
        var parameter = eval("(" + pmars.Family() + ")");
        var parameter_name = utils.getJsonName(parameter);
        var Wg_id = [];
        var WgH_id = [];
        var id = [];
        var a = 0;
        var b = 0;
        var toshieldnumber = 0;
        for (var pm = 0; pm < parameter_name.length; pm++) {
            if (parameter[parameter_name[pm]].ascription == "1" && utils.isStringEmpty(pmars.Family_shield()[parameter[parameter_name[pm]].id])) {
                Wg_id[a] = parameter_name[pm];
                a++;
                Situation.qw_jtyw.classification.Wg_id = Wg_id;
            } else if (parameter[parameter_name[pm]].ascription == "2" && utils.isStringEmpty(pmars.Family_shield()[parameter[parameter_name[pm]].id])) {
                WgH_id[b] = parameter_name[pm];
                b++;
                Situation.qw_jtyw.classification.WgH_id = WgH_id;
            }
            if (utils.isStringEmpty(pmars.Family_shield()[parameter_name[pm]])) {
                id[toshieldnumber] = parameter_name[pm];
                toshieldnumber++;
            }
        }
        overviewleft.jtyw_trend();
        //获取趋势数据
        var length = parseInt(parseInt(id.length) / 4);
        (parseInt(id.length) % 4 == 0) ? length : length++;
        Situation.qw_jtyw.Maximumarr = length;
        configuration.Jurisdiction("_jtyw_Model", id, "", "jtyw_div");
        $('#qw_jtyw_img').attr('src', eastcom.baseURL + '/static/images/overview/zbpz.png');

    },
    jtyw_div: function(Jurisdiction) {
        var id = Jurisdiction.id;
        Situation.qw_jtyw.name = Jurisdiction.name;
        Situation.qw_jtyw.time = Jurisdiction.time;
        Situation.qw_jtyw.Roll_bool = false;
        Situation.qw_jtyw.slidePosition = 1;
        Situation.qw_jtyw.Maximum = 4;
        var Family = eval("(" + pmars.Family() + ")");
        var base = {};
        var bool = [];
        var u = "";
        cdm.getFbbWg({}, function(Wg) {
            if (Wg.success) {
                var h = 0;
                var Wg_id_json = {};
                for (var d1 = 0; d1 < Situation.qw_jtyw.classification.Wg_id.length; d1++) {
                    Wg_id_json[Situation.qw_jtyw.classification.Wg_id[d1]] = Situation.qw_jtyw.classification.Wg_id[d1];
                }
                for (var d = 0; d < id.length; d++) {
                    if (!utils.isStringEmpty(Family[id[d]]) && !utils.isStringEmpty(Wg_id_json[id[d]]) && utils.isStringEmpty(pmars.Family_shield()[id[d]])) {
                        if (utils.isStringEmpty(Wg.data[id[d]])) {
                            base[id[d]] = {
                                id: id[d],
                                name: Family[id[d]],
                                value: "---",
                                hb: "---",
                                tb: "---",
                                time: Wg.data.time
                            };
                            h++;
                        } else {
                            base[id[d]] = {
                                id: id[d],
                                name: Family[id[d]],
                                value: Wg.data[id[d]],
                                hb: Wg.data[id[d] + "hb"],
                                tb: Wg.data[id[d] + "tb"],
                                time: Wg.data.time
                            };
                            h++;
                        }
                    }
                }
                bool[0] = true;
            }
        });
        cdm.getFbbWgH({}, function(WgH) {
            if (WgH.success) {
                var h = 0;
                var WgH_id_json = {};
                for (var d1 = 0; d1 < Situation.qw_jtyw.classification.WgH_id.length; d1++) {
                    WgH_id_json[Situation.qw_jtyw.classification.WgH_id[d1]] = Situation.qw_jtyw.classification.WgH_id[d1];
                }
                for (var d = 0; d < id.length; d++) {
                    if (!utils.isStringEmpty(Family[id[d]]) && !utils.isStringEmpty(WgH_id_json[id[d]]) && utils.isStringEmpty(pmars.Family_shield()[id[d]])) {
                        if (utils.isStringEmpty(WgH.data[id[d]])) {
                            base[id[d]] = {
                                id: id[d],
                                name: Family[id[d]],
                                value: "---",
                                hb: "---",
                                tb: "---",
                                time: WgH.data.time
                            };
                            h++;
                        } else {
                            base[id[d]] = {
                                id: id[d],
                                name: Family[id[d]],
                                value: WgH.data[id[d]],
                                hb: WgH.data[id[d] + "hb"],
                                tb: WgH.data[id[d] + "tb"],
                                time: WgH.data.time
                            };
                            h++;
                        }
                    }
                }
                bool[1] = true;
            }
        });
        var original_id = utils.getJsonName(Family);
        var toshield = [];
        var toshieldnumber = 0;
        for (var q = 0; q < original_id.length; q++) {
            if (utils.isStringEmpty(pmars.Family_shield()[original_id[q]])) {
                toshield[toshieldnumber] = original_id[q];
                toshieldnumber++;
            }
        }
        Situation.qw_jtyw.ecarts_base_model = setInterval(function() {
            var t = 0
            for (var e = 0; e < bool.length; e++) {
                if (bool[e] == true) {
                    t++;
                }
            }
            if (t >= 2) {
                var base1 = base;
                base = [];
                for (var q = 0; q < id.length; q++) {
                    if (utils.isStringEmpty(pmars.Family_shield()[id[q]])) {
                        base[id[q]] = base1[id[q]];
                    }
                }
                var base_name = utils.getJsonName(base);
                var k = parseInt(parseInt(id.length) / 4);
                (parseInt(id.length) % 4 == 0) ? k : k++;
                var q = [];
                var x = 0;
                var j = 0;
                var arr = 0;
                var u = "";
                for (var h = 0; h < k; h++) {
                    h < parseInt(parseInt(id.length) / 4) ? q[h] = 4 : q[h] = parseInt(id.length) % 4;
                    arr = q[h];
                    for (var n = 0; n < arr; n++) {
                        if (!utils.isStringEmpty(pmars.Family_shield()[id[x]])) {
                            q[h] = q[h] - 1;
                        }
                        x++;
                    }
                }
                var source = [];
                window.clearInterval(Situation.qw_jtyw.ecarts_base_model);
                var source = [];
                var sourcelength = 0;
                for (var d = 0; d < id.length; d++) {
                    if (!utils.isStringEmpty(base[id[d]]) && utils.isStringEmpty(pmars.Family_shield()[id[d]])) {
                        source[sourcelength] = base[id[d]];
                        sourcelength++;
                    }
                }
                Situation.qw_jtyw.source = source;
                Situation.qw_jtyw.data = {
                    length: k,
                    grouping: q
                };
                Situation.qw_jtyw.original = toshield;
                for (var a = 0; a < k; a++) {
                    var html = "";
                    for (var c = 0; c < q[a]; c++) {
                        var top1 = "";
                        var top2 = "";
                        var hb = '';
                        var color = "#00FF00";
                        var display = "";
                        var ydyw_img = "";
                        var _class = "";
                        var _class_span = "";
                        var jtyw_margin_right = 20;
                        var min1 = 0;
                        var max1 = 50;
                        var min2 = 50;
                        var max2 = 100;
                        var array = Family[source[j].id];
                        if (source[j].id == "fbb_cover_user_num") {
                            source[j].value = 6200000;
                            source[j].hb = 6200000 * (1 - 0.0119);
                        } else if (source[j].id == "onu_op_qualification_ratio") {
                            source[j].value = 98.44;
                            source[j].hb = 98.14;
                        }
                        var proportion = pmars.proportion(array.company, source[j].value, source[j].hb);
                        //获取当前的环比
                        var value_auxiliary = pmars.conversion(array.company_auxiliary_original, source[j].value);
                        //格式当value
                        if (proportion.bool == 0) {
                            if (min2 <= proportion.value_auxiliary && proportion.value_auxiliary < max2) {
                                ydyw_img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/red2.png";
                                color = "#da6d6d";
                                _class = "";
                                _class_span = "rotate_span";
                            } else if (min1 <= proportion.value_auxiliary && proportion.value_auxiliary < max1) {
                                ydyw_img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/green.png";
                                color = "#00FF00";
                                _class = "";
                                _class_span = "";
                            }
                        } else if (proportion.bool == 1) {
                            if (min2 <= proportion.value_auxiliary && proportion.value_auxiliary < max2) {
                                color = "#da6d6d";
                                ydyw_img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/red2.png";
                                _class = "rotate";
                                _class_span = "";
                            } else if (min1 <= proportion.value_auxiliary && proportion.value_auxiliary < max1) {
                                ydyw_img = eastcom.baseURL + "/static/styles/local-lsm/ciienew/images/green.png";
                                color = "#00FF00";
                                _class = "rotate";
                                _class_span = "rotate_span";
                            }
                        } else {
                            color = "#00FF00";
                            display = "none"
                        }
                        ;if (!utils.isStringEmpty(value_auxiliary)) {
                            value_auxiliary = value_auxiliary + array.company_auxiliary;
                        } else {
                            value_auxiliary = "---";
                        }
                        if (c == 3) {
                            jtyw_margin_right = 0;
                        }
                        if (source[j].id == "fbb_cover_user_num" || source[j].id == "onu_op_qualification_ratio") {
                            html += '<div style="margin-right:' + jtyw_margin_right + 'px;float:left;"  id="' + source[j].id + '"  data-color="jtyw_suspension_' + c + '">\
							<div style="font-size: 26px;text-align: left;">' + Family[source[j].id].text + '</div>\
							<div style="background-color: rgba(0, 102, 255, 0.15);border-radius:5px;width:238.5px;height:110px;">\
							<div style="text-align: center;color:#66E6FF;margin-right: 10px;"><span style="font-size: 40px;">' + value_auxiliary + '</span></div>\
							<div style="width:100%;height:40px;margin-top: -20px;color:' + color + ';padding-right: 10px;font-size: 28px;"><img src="' + ydyw_img + '" style="width:20px;height:20px;display:' + display + '"  class="' + _class + '"><span>' + proportion.value + '</span></div>\
							</div></div>\
							';
                        } else {
                            html += '<div style="margin-right:' + jtyw_margin_right + 'px;cursor: pointer;float:left;"  id="' + source[j].id + '" onclick="jtyw_click(this.id)" data-color="jtyw_suspension_' + c + '">\
							<div style="font-size: 26px;text-align: left;">' + Family[source[j].id].text + '</div>\
							<div style="background-color: rgba(0, 102, 255, 0.15);border-radius:5px;width:238.5px;height:110px;">\
							<div style="text-align: center;color:#66E6FF;margin-right: 10px;"><span style="font-size: 40px;">' + value_auxiliary + '</span></div>\
							<div style="width:100%;height:40px;margin-top: -20px;color:' + color + ';padding-right: 10px;font-size: 28px;"><img src="' + ydyw_img + '" style="width:20px;height:20px;display:' + display + '"  class="' + _class + '"><span>' + proportion.value + '</span></div>\
							</div></div>\
							';
                        }
                        j++;
                    }
                    ;u += '<li class="carousel-item">' + html + '</li>'
                }
                var htmlStr = '<ul class="carousel-inner" id="qw_jtyw_ul" style="height:180px">' + u + '</ul>'
                $("#qw_jtyw").empty();
                document.getElementById("qw_jtyw").innerHTML = htmlStr;
                $("#carousel_2").FtCarousel({
                    index: 0,
                    auto: false
                });
                var jtyw_current_page_span = 1;
                var Localclass = 'qw_jtyw';
                var htmlStr = '<div><img id="Website_left" onclick="situation_left_click(' + Localclass + ')" src="' + eastcom.baseURL + '/static/images/overview/L2.png" style="cursor:pointer;z-index: 10; position: absolute;left: 900px; top: -2px;width: 40px;height:40px"><img id="Website_right" onclick="situation_right_click(' + Localclass + ')" src="' + eastcom.baseURL + '/static/images/overview/R2.png" style="cursor:pointer;z-index: 10; position: absolute;left: 980px;top:-2px; width: 40px;height:40px"></div>\
				<div style="width:32px;height:32px;float: right; z-index: 10; position: absolute;left: 945px; top: 2px;background-color:#294FC7;border-radius: 15px;"><div style="font-size: 20px;z-index: 10; position: absolute;left: 8px; top: -19px;"><span  id="qw_jtyw_current_page_span" style="margin-left:2px;">' + jtyw_current_page_span + '</span></div></div>';
                $("#qw_jtyw_switch").empty();
                document.getElementById("qw_jtyw_switch").innerHTML = htmlStr;
                window.clearInterval(Situation.qw_jtyw.Slide_time_remove);
                //全网 移动业务自动
                $("#qw_jtyw_Grouping_span").html("--- " + Situation.qw_jtyw.name[Situation.qw_jtyw.slidePosition]);
                if (Situation.qw_jtyw.Roll_bool == true) {
                    Situation.qw_jtyw.Slide_time_remove = setInterval(function() {
                        qw_jtyw_right_slide();
                    }, Situation.qw_jtyw.time);
                }
                if(Situation.CLICK=="qw_jtyw"){
                	configuration.Assemble(Situation, Localclass);
                }
            }
        }, 100);
    },
    jtyw_trend: function() {
        var cache = [];
        cdm.getFbbWgTrend({}, function(bWg) {
            for (var d = 0; d < Situation.qw_jtyw.classification.Wg_id.length; d++) {
                var h = 0;
                var isStringEmpty = [];
                if (bWg.success) {
                    for (var s = 0; s < bWg.data.length; s++) {
                        isStringEmpty[h] = {
                            value: bWg.data[s][Situation.qw_jtyw.classification.Wg_id[d]],
                            tb: bWg.data[s][Situation.qw_jtyw.classification.Wg_id[d] + "tb"],
                            time: bWg.data[s].time
                        }
                        h++;
                    }
                    cache[Situation.qw_jtyw.classification.Wg_id[d]] = isStringEmpty;
                    Situation.qw_jtyw.trend = cache;
                }
            }
        });
        cdm.getFbbWgHTrend({}, function(bWgHTrend) {
            for (var d = 0; d < Situation.qw_jtyw.classification.WgH_id.length; d++) {
                var h = 0;
                var isStringEmpty = [];
                if (bWgHTrend.success) {
                    for (var s = 0; s < bWgHTrend.data.length; s++) {
                        isStringEmpty[h] = {
                            value: bWgHTrend.data[s][Situation.qw_jtyw.classification.WgH_id[d]],
                            tb: bWgHTrend.data[s][Situation.qw_jtyw.classification.WgH_id[d] + "tb"],
                            time: bWgHTrend.data[s].time
                        }
                        h++;
                    }
                    cache[Situation.qw_jtyw.classification.WgH_id[d]] = isStringEmpty;
                    Situation.qw_jtyw.trend = cache;
                }
            }
        });
    },
    cmnet_trend: function() {
        var id = pmars.CMNETID();
        var CMNet_trend = [];
        cdm.getCMNETTrend({}, function(cmnet) {
            if (cmnet.success) {
                cmnet = cmnet.data;
                for (var d = 0; d < id.length; d++) {
                    var h = 0;
                    var isStringEmpty = [];
                    for (var s = 0; s < cmnet.length; s++) {
                        isStringEmpty[h] = {
                            value: cmnet[s][id[d]],
                            tb: cmnet[s][id[d] + "tb"],
                            time: cmnet[s].time
                        };
                        h++;
                    }
                    CMNet_trend[id[d]] = isStringEmpty;
                    Situation.qw_cmnet.trend = CMNet_trend;
                }
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
        Situation.qw_cmnet = {};
        cdm.getCMNET({}, function(CMNet) {
            if (CMNet.success) {
                cdm.getCMNEPtnflow({}, function(flow) {
                    if (flow.success) {
                        CMNet = CMNet.data;
                        flow = flow.data;

                        Situation.qw_cmnet = {};
                        Situation.qw_cmnet.source = {};
                        for (var c = 0; c < CMNETID.length; c++) {
                            if (c < CMNETID.length - 2) {
                                if (utils.isStringEmpty(CMNet[CMNETID[c]])) {
                                    CMNet[CMNETID[c]] = "---";
                                } else {
                                    CMNet[CMNETID[c]] = utils.changeTwoDecimal(pmars.conversion(parameter[CMNETID[c]].company, CMNet[CMNETID[c]]));
                                }
                                htmlStr += '<div style="z-index:10;position: absolute;top:' + Coordinate[CMNETID[c]].top + '%;left:' + Coordinate[CMNETID[c]].left + '%;background-color: rgba(0, 102, 255, 0);width:73px;height:0px;color:' + Coordinate[CMNETID[c]].color + ';font-size:22px;cursor:pointer;"id="' + CMNETID[c] + '" onclick="_cmnet_click(this)">' + CMNet[CMNETID[c]] + parameter[CMNETID[c]].company_auxiliary + '</div>';
                            } else {
                                if (utils.isStringEmpty(flow[CMNETID[c]])) {
                                    flow[CMNETID[c]] = "---";
                                } else {
                                    flow[CMNETID[c]] = flow[CMNETID[c]];
                                }
                                htmlStr += '<div style="z-index:10;position: absolute;top:' + Coordinate[CMNETID[c]].top + '%;left:' + Coordinate[CMNETID[c]].left + '%;background-color: rgba(0, 102, 255, 0);width:73px;height:0px;color:' + Coordinate[CMNETID[c]].color + ';font-size:22px;"id="' + CMNETID[c] + '">' + flow[CMNETID[c]] + parameter[CMNETID[c]].company_auxiliary + '</div>';
                            }
                            var time1 = CMNet.time;
                            Situation.qw_cmnet.source.time = time1;
                        }
                        $("#cmnet_div").empty();
                        document.getElementById("cmnet_div").innerHTML = htmlStr;
                        overviewleft.cmnet_trend();
                    }
                });
            }
        });
    },
    ThresCfg: function() {
        cdm.getThresCfg({}, function(Cfg) {
            if (Cfg.success) {
                Situation.ThresCfg = {};
                Situation.ThresCfg = Cfg.data;
                Situation.ThresCfg.bool = true;
            }
        });
    }
}
function click() {
    $("#k_img").live('click', function() {
        window.location.href = eastcom.baseURL + "/pages/local-lsm/overview/overviewleftyd.jsp?isScreenMode=" + isScreenMode
    });
    $("#qw_aqxi_Roll_img").live('click', function() {
        if (Situation.aqxi_bool == false) {
            $('#qw_aqxi_Roll_img').attr('src', eastcom.baseURL + '/static/images/overview/k_1.png');
            Situation.aqxi_bool = true;
            overviewleft.aqxi();
        } else {
            $('#qw_aqxi_Roll_img').attr('src', eastcom.baseURL + '/static/images/overview/k_2.png');
            Situation.aqxi_bool = false;
            overviewleft.wlw();
        }
    });
    $("#zt_img").live('click', function() {
        var bool = true;
        for (var d = 0; d < Situation.qw_ydyw.source.length; d++) {
            if (Situation.qw_ydyw.source[d].id == Situation.ecarts_model_id) {
                $("#Trend_Modal").modal("show");
                var parameter = eval("(" + pmars.Left_name() + ")");
                ecarts.qw_ecarts_model(Situation.ecarts_model_time, Situation.ecarts_model_id, Situation.qw_ydyw.trend, parameter);
                bool = false;
            }
        }
        if (bool == true) {
            for (var d = 0; d < Situation.qw_jtyw.source.length; d++) {
                if (Situation.qw_jtyw.source[d].id == Situation.ecarts_model_id) {
                    $("#Trend_Modal").modal("show");
                    var parameter = eval("(" + pmars.Family() + ")");
                    ecarts.qw_ecarts_model(Situation.ecarts_model_time, Situation.ecarts_model_id, Situation.qw_jtyw.trend, parameter);
                    bool = false;
                }
            }
        }
        if (bool == true) {
            $("#Trend_Modal").modal("show");
            var CMNET = eval("(" + pmars.CMNET() + ")");
            ecarts.qw_ecarts_model(Situation.qw_cmnet.source.time, Situation.ecarts_model_id, Situation.qw_cmnet.trend, CMNET);
            bool = false;
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
                            if (c < CMNETID.length - 2) {
                                if (utils.isStringEmpty(CMNET[CMNETID[c]])) {
                                    CMNET[CMNETID[c]] = "---";
                                } else {
                                    CMNET[CMNETID[c]] = utils.changeTwoDecimal(pmars.conversion(parameter[CMNETID[c]].company, CMNET[CMNETID[c]]));
                                }
                                htmlStr += '<div style="z-index:10;position: absolute;top:' + Coordinate[CMNETID[c]].top + 'px;left:' + Coordinate[CMNETID[c]].left + 'px;background-color: rgba(0, 102, 255, 0);color:' + Coordinate[CMNETID[c]].color + ';font-size:32px;"id="' + CMNETID[c] + '" ">' + CMNET[CMNETID[c]] + parameter[CMNETID[c]].company_auxiliary + '</div>'
                            } else {
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
}
function _click(id) {
    Situation.ecarts_model_id = id;
    for (var d = 0; d < Situation.qw_ydyw.source.length; d++) {
        if (Situation.qw_ydyw.source[d].id == id) {
            Situation.ecarts_model_time = Situation.qw_ydyw.source[d].time;
            var parameter = eval("(" + pmars.Left_name() + ")");
            ecarts.qw_ecarts(Situation.ecarts_model_time, Situation.ecarts_model_id, Situation.qw_ydyw.trend, parameter);
            $('#ecarts_trend').attr('src', eastcom.baseURL + pmars.TrendUrl(parameter[id].auxiliary));
        }
    }
}
function jtyw_click(id) {
    Situation.ecarts_model_id = id;
    for (var g = 0; g < Situation.qw_jtyw.source.length; g++) {
        if (Situation.qw_jtyw.source[g].id == id) {
            var Family = eval("(" + pmars.Family() + ")");
            ecarts.qw_ecarts(Situation.qw_jtyw.source[g].time, id, Situation.qw_jtyw.trend, Family);
        }
    }
}
function _cmnet_click(obgect) {
    Situation.ecarts_model_id = obgect.id;
    var CMNET = eval("(" + pmars.CMNET() + ")");
    ecarts.qw_ecarts(Situation.qw_cmnet.source.time, obgect.id, Situation.qw_cmnet.trend, CMNET);
}
function mouseout() {
    $('#popover').css('display', 'none');
}
function _model(parameter) {
	Situation.CLICK=parameter;
    $("#index_modal").empty();
    configuration.Assemble(Situation, parameter);
    $("#index_modal").modal("show");
}
function ydyw_onmouseover(obgect) {
    var ecarts_bool_length = 0;
    for (var t = 0; t < 6; t++) {
        if (!utils.isStringEmpty(Situation.qw_ydyw.ecarts_bool) && Situation.qw_ydyw.ecarts_bool[t] == true) {
            ecarts_bool_length++;
        }
    }
    if (ecarts_bool_length == 4) {
        $('#popover').css('display', 'block');
        var parameter = eval("(" + pmars.Left_name() + ")");
        var position = eval("(" + Popoverposition.overviewleft() + ")");
        var classification = eval("(" + pmars.classification_all() + ")");
        var _data_color = $(obgect).data("color");
        var isStringEmpty = [];
        if (Situation.qw_ydyw.source.length > 0) {
            for (var s = 0; s < Situation.qw_ydyw.source.length; s++) {
                if (Situation.qw_ydyw.source[s].id == obgect.id.replace("_span", "")) {
                    isStringEmpty = Situation.qw_ydyw.source[s];
                    if (!utils.isStringEmpty(isStringEmpty.time) && !utils.isStringEmpty(isStringEmpty.value) && isStringEmpty.value != "---" && Situation.ThresCfg.bool == true && !utils.isStringEmpty(classification[isStringEmpty.id])) {
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
