var CIIENEW = CIIENEW || {};
CIIENEW.Screen = function() {
    this.initialize.apply(this, arguments);
}
;
CIIENEW.Screen.prototype.constructor = CIIENEW.Screen;
CIIENEW.Screen.prototype.hotspot = '进口博览会';
CIIENEW.Screen.prototype.dm = null;
CIIENEW.Screen.prototype.cdm = null;
CIIENEW.Screen.prototype.hotspotList = [];
CIIENEW.Screen.prototype.Ation = [];
//获取id
CIIENEW.Screen.prototype.gsm = [];
//4G数据
CIIENEW.Screen.prototype.lte = [];
//2G数据
CIIENEW.Screen.prototype.startIndex = 0;
CIIENEW.Screen.prototype.sidxGSM = 'gsmhwl';
//话务量
CIIENEW.Screen.prototype.sidxTDD = 's_213';
//4g流量
CIIENEW.Screen.prototype.sidxFDD = 's_213';
//4g流量
CIIENEW.Screen.prototype.callbool = [];


var click_color_arr = [null,null];//获取点击的id

var color_arr=[null,null];//0 4G 1 2G

var Roll_bool=true;//是否翻滚

var Situation = {};//全局变量
Situation.Timing={};
Situation.data_bool=false;
Situation.Roll_bool_two=true;
Situation.Lte_select_bool=false;
Situation.Gsm_select_bool=false;
Situation.runstatustitle_bool=true;
Situation.hotspot="进口博览会";
Situation.ifId="lsm-station-ltecell-15";
Situation.color_arr=[{baseStationKey:"",baseStationLaccis:""},{baseStationKey:"",baseStationLaccis:""}];
Situation.Hotspot2={
		"J-WH馆":"J-WH2.png",
		"J-1号馆":"J-1H.png",
		"J-2号馆":"J-2H.png",
		"J-3号馆":"J-3H.png",
		"J-4.1号馆":"J-4H.png",
		"J-4.2号馆":"J-4H.png",
		"J-5.1号馆":"J-5H.png",
		"J-5.2号馆":"J-5H.png",
		"J-6.1号馆":"J-6H.png",
		"J-6.2号馆":"J-6H.png",
		"J-7.1号馆":"J-7H.png",
		"J-7.2号馆":"J-7H.png",
		"J-8.1号馆":"J-8H.png",
		"J-8.2号馆":"J-8H.png",
		"J-A0办公楼":"J-A0B.png",
		"J-B0办公楼":"J-B0B.png",
		"J-C0办公楼":"J-C0B.png",
		"J-D0洲际酒店":"J-D0H.png",
		"J-新闻中心":"J-NEWSCENTER.png",
		"J-东厅":"J-EH.png",
		"J-北厅":"J-NH.png",
		"J-西厅":"J-WH.png",
		"J-会展大道北":"J-NR.png",
		"J-会展大道东":"J-ER.png",
		"J-会展大道南":"J-SR.png",
		"J-会展大道西":"J-WR.png",
		"J-入口广场":"J-ENTER.png",
		"J-商业区":"J-BUS.png",
		"J-周边外围":"J-SUR.png",
		"J-重要场所":"J-TheBund.png",
		"J-国家会展中心":"J-国家会展中心"}
CIIENEW.Screen.prototype.initialize = function() {
	if($.cookie('targetType')=="PC版"){this.hotspot="J-国家会展中心";Situation.hotspot="J-国家会展中心";}
	$('#ciierig_bjpz').attr('src',eastcom.baseURL+'/static/images/overview/zbpz.png');
    $('#Roll_img_one').on('click', this.Click.bind(this));
    $('#ss_model_lte').on('click', this.Select_lte.bind(this));
    $('#ss_model_gsm').on('click', this.Select_gsm.bind(this));
    $('#confirm_lte').on('click', this.Select_lte_confirm.bind(this));
    $('#confirm_gsm').on('click', this.Select_gsm_confirm.bind(this));
    $('#close_lte').on('click', this.Select_lte_close.bind(this));
    $('#Roll_img_two').on('click', this.Roll_img_two.bind(this));
    $('#close_gsm').on('click', this.Select_gsm_close.bind(this));
    this.init();
};
CIIENEW.Screen.prototype.init=function(_hotspot){
    if (_hotspot != null) {
        this.hotspot = _hotspot;
        Situation.hotspot=_hotspot;
    }
 /*   if(!utils.isStringEmpty(Situation.Hotspot2[Situation.hotspot])){
    	$("#Roll_img_div_one").css("display","block");
    }else{
    	$("#Roll_img_div_one").css("display","none");
    }*/
    $("#Roll_img_div_one").css("display","block");
    $("#Roll_img_two").css("display","none");
    $('#Roll_img_one').attr('src',eastcom.baseURL+'/static/images/overview/k_1.png');
    Situation.data_bool=false;
	Situation.runstatustitle_bool=true;
	window.clearInterval(Situation.Minutetwo);
    this.dm = LSMScreen.DataManager.getInstance();
    this.cdm = LSMScreen.CacheDataManager.getInstance();
    CIIENEW.Screen.cdm = this.cdm;
    setInterval(this.update.bind(this), 60 * 1000);
    $('#Roll_img_one').attr('src',eastcom.baseURL+'/static/images/overview/k_1.png');
	$('#Roll_img_div').css('display','block');
	$('#Roll_img_div2').css('display','none');
	window.clearInterval(Situation.Minutetwo);
	Situation.ifId="lsm-station-ltecell-15";
	this.Situation();
}
CIIENEW.Screen.prototype.Roll_img_two= function() {
	$("#Modal").modal("show");
}
CIIENEW.Screen.prototype.Select_lte= function() {
    $("#Select_lte").modal("show");
    $('.modal-backdrop').removeClass("modal-backdrop");
    $("#lte").val();
    Situation.Lte_select_bool=true;
}
CIIENEW.Screen.prototype.Select_lte_confirm= function() {
	if(Situation.data_bool==true){
		if($("#lte").val()=="ulmeannl_prb"){
			Situation.Lte_sidx="lte_ul_interfere_level_";
		}else if($("#lte").val()=="succconnestab"){
			Situation.Lte_sidx="lte_rrc_conn_cnt_";
		}else if($("#lte").val()=="lte_ul_prb_use_ratio"){
			Situation.Lte_sidx="lte_ul_prb_use_ratio_";
		}else if($("#lte").val()=="s_213"){
			Situation.Lte_sidx="lte_flow_";
		}
	}else{
		Situation.Lte_sidx=$("#lte").val();
	}
	this.update();
	 $("#Select_lte").modal("hide");
}
CIIENEW.Screen.prototype.Select_gsm_confirm= function() {
	 Situation.Gsm_sidx= $("#gsm").val();
	 this.update();
	 $("#Select_gsm").modal("hide");
	 Situation.Gsm_select_bool=true;
}
CIIENEW.Screen.prototype.Select_lte_close= function() {
	 $("#Select_lte").modal("hide");
}
CIIENEW.Screen.prototype.Select_gsm = function() {
    $("#Select_gsm").modal("show");
    $('.modal-backdrop').removeClass("modal-backdrop");
}
CIIENEW.Screen.prototype.Select_gsm_close= function() {
	 $("#Select_gsm").modal("hide");
}
CIIENEW.Screen.prototype.Click = function() {
	if(Situation.data_bool==false){
		$('#Roll_img_one').attr('src',eastcom.baseURL+'/static/images/overview/k_2.png');
		$('#Roll_img_div').css('display','none');
		$('#Roll_img_div2').css('display','block');
	    $("#Roll_img_two").css("display","block");
		Situation.data_bool=true;
		/*Situation.runstatustitle_bool=false;*/
		window.clearInterval(Situation.Minutetwo);
		Situation.Minutetwo = setInterval(function() {CIIENEW.Screen.prototype.Rotatetwo();}, 90 * 1000);
		Situation.ifId="lsm-station-ltecell-1";
	}else{
		$('#Roll_img_one').attr('src',eastcom.baseURL+'/static/images/overview/k_1.png');
		$('#Roll_img_div').css('display','block');
		$('#Roll_img_div2').css('display','none');
		$("#Roll_img_two").css("display","none");
		Situation.data_bool=false;
		/*Situation.runstatustitle_bool=true;*/
		window.clearInterval(Situation.Minutetwo);
		Situation.ifId="lsm-station-ltecell-15";
	}
	 Situation.click1=true;
	 Situation.click2=true;
	 Situation.click3=true;
	 this.Situation();
}
CIIENEW.Screen.prototype.Situation = function() {
	Situation.GSM={HUAWEI:{
		gsmhwl:{id:"gsmhwl",text:"话务量",company : "(Erl)",company_auxiliary:"Erl",company_auxiliary_original:"(Erl)"},
		gsm_conn_ratio:{id:"gsm_conn_ratio",text:"2G接通率",company : "(%)",company_auxiliary:"%",company_auxiliary_original:"(%)"},
		gsm_wireless_drop_ratio:{id:"gsm_wireless_drop_ratio",text:"2G掉话率",company : "(%)",company_auxiliary:"%",company_auxiliary_original:"(%)"},
		gsm_wireless_use_ratio:{id:"gsm_wireless_use_ratio",text:"2G利用率",company : "(%)",company_auxiliary:"%",company_auxiliary_original:"(%)"}},
	Noxi:{
		s_091:{id:"s_091",text:"用户数",company : "(万人)",company_auxiliary:"万人",company_auxiliary_original:"(万人)"},
		s_083:{id:"s_083",text:"流量",company : "(MB)",company_auxiliary:"MB",company_auxiliary_original:"(MB)"},
		s_252:{id:"s_252",text:"2GTCP成功率",company : "(%)",company_auxiliary:"%",company_auxiliary_original:"(%)"},
		s_137:{id:"s_137",text:"2GTCP掉线率",company : "(%)",company_auxiliary:"%",company_auxiliary_original:"(%)"}}};
	Situation.Gsm_sidx="gsmhwl";
	if(Situation.data_bool==true){
		Situation.TDD={
				lte_flow_:{id:"lte_flow_",text:"流量",company : "(MB)",company_auxiliary:"MB",company_auxiliary_original:"(MB)"},
				lte_ul_prb_use_ratio_:{id:"lte_ul_prb_use_ratio_",text:"上行PRB利用率",company : "(%)",company_auxiliary:"%",company_auxiliary_original:"(%)"},
				lte_rrc_conn_cnt_:{id:"lte_rrc_conn_cnt_",text:"RRC连接数",company : "(个)",company_auxiliary:"个",company_auxiliary_original:"(个)"},
				lte_ul_interfere_level_:{id:"lte_ul_interfere_level_",text:"平均干扰电平",company : "(dBm)",company_auxiliary:"dBm",company_auxiliary_original:"(dBm)"},
		};
		Situation.FDD={
				lte_flow_:{id:"lte_flow_",text:"流量",company : "(MB)",company_auxiliary:"MB",company_auxiliary_original:"(MB)"},
				lte_ul_prb_use_ratio_:{id:"lte_ul_prb_use_ratio_",text:"上行PRB利用率",company : "(%)",company_auxiliary:"%",company_auxiliary_original:"(%)"},
				lte_rrc_conn_cnt_:{id:"lte_rrc_conn_cnt_",text:"RRC连接数",company : "(个)",company_auxiliary:"个",company_auxiliary_original:"(个)"},
				lte_ul_interfere_level_:{id:"lte_ul_interfere_level_",text:"平均干扰电平",company : "(dBm)",company_auxiliary:"dBm",company_auxiliary_original:"(dBm)"},
		};
		Situation.Lte_sidx="lte_flow_";
	}else{
		Situation.TDD={
				s_213:{id:"s_213",text:"流量",company : "(MB)",company_auxiliary:"MB",company_auxiliary_original:"(MB)"},
				lte_ul_prb_use_ratio:{id:"lte_ul_prb_use_ratio",text:"上行PRB利用率",company : "(%)",company_auxiliary:"%",company_auxiliary_original:"(%)"},
				succconnestab:{id:"succconnestab",text:"RRC连接数",company : "(个)",company_auxiliary:"个",company_auxiliary_original:"(个)"},
				ulmeannl_prb:{id:"ulmeannl_prb",text:"平均干扰电平",company : "(dBm)",company_auxiliary:"dBm",company_auxiliary_original:"(dBm)"}
		};
		Situation.FDD={
				s_213:{id:"s_213",text:"流量",company : "(MB)",company_auxiliary:"MB",company_auxiliary_original:"(MB)"},
				lte_ul_prb_use_ratio:{id:"lte_ul_prb_use_ratio",text:"上行PRB利用率",company : "(%)",company_auxiliary:"%",company_auxiliary_original:"(%)"},
				succconnestab:{id:"succconnestab",text:"RRC连接数",company : "(个)",company_auxiliary:"个",company_auxiliary_original:"(个)"},
				ulmeannl_prb:{id:"ulmeannl_prb",text:"平均干扰电平",company : "(%)",company_auxiliary:"dBm",company_auxiliary_original:"(dBm)"}
		};
		Situation.Lte_sidx="s_213";
	}
    this.update();
}
CIIENEW.Screen.prototype.update = function() {
	CIIENEW.Screen.cdm.getBaseStationOperation({
        hotspot: Situation.hotspot,
        ifId:Situation.ifId,
    }, CIIENEW.Screen.prototype.drawAtion.bind(this));
};
CIIENEW.Screen.prototype.drawAtion = function(result) {
	var color_arr_=[{baseStationKey:"",baseStationLaccis:""},{baseStationKey:"",baseStationLaccis:""}];
	Situation.drawAtion={};var baseStationLaccis1="";var baseStationLaccis2="";
    CIIENEW.Screen.prototype.callbool=[];
    var parameter = eval("(" + pmars.ciierigId() + ")");
    var ciieright = eval("(" + pmars.ciieright() + ")");
    Situation.original=utils.getJsonName(ciieright);
    var ciierigKpis = eval("(" + pmars.ciierigKpis() + ")");
    var margin = "";
    var width = 250;
    var l = 0;
    var zero1 = false;
    var zero2 = false;
    var htmlMar = '<div style="width:58%;">';
    htmlMar += '<div class="celltitlebar" style="margin-top:10px;margin-left: 40px;"></div>';
    htmlMar += '<div class="celltitletxt" style="margin-left:10px;">4G小区</div>';
    htmlMar += '<div class="celltitletime" style="margin-top:30px;"></div>';
    htmlMar += '<div style="clear:both;"></div></div>';
    htmlMar += '<div style="width:42%;">';
    htmlMar += '<div class="celltitlebar" style="margin-top:10px;margin-left: 80px;"></div>';
    htmlMar += '<div class="celltitletxt" style="margin-left:10px;">2G小区</div>';
    htmlMar += '<div class="celltitletime" style="margin-top:30px;"></div>';
    htmlMar += '<div style="clear:both;"></div></div>';
    var resultKey=[];
    var baseArr=[];
    for (var f = 0; f < 5; f++) {
        var Ation = Situation.original[f];
        var color = "";
        for(var s=1;s<=2;s++){
	    	  if(utils.isStringEmpty(result[ciieright[Ation].text_auxiliary + "-"+s])){
	    		  resultKey[ciieright[Ation].text_auxiliary + "-"+s]=0;
	          }else{
	              if (result[ciieright[Ation].text_auxiliary + "-"+s].length > 9) {
	            	  resultKey[ciieright[Ation].text_auxiliary + "-"+s] = 9;
	              }else{
	            	  resultKey[ciieright[Ation].text_auxiliary + "-"+s]=result[ciieright[Ation].text_auxiliary + "-"+s].length;
	              }
	          }
              baseArr[ciieright[Ation].text_auxiliary + "-"+s]=result[ciieright[Ation].text_auxiliary + "-"+s];
        	 if (resultKey[ciieright[Ation].text_auxiliary + "-"+s] > 0) {
             	if (f < 3&&zero1==false){
         			color_arr_[0]={baseStationKey:ciieright[Ation].text_auxiliary+ "-"+s,baseStationLaccis:result[ciieright[Ation].text_auxiliary + "-"+s].join(",")};
         			zero1=true;
             	}else if(f >=3&&zero2==false){
         			color_arr_[1]={baseStationKey:ciieright[Ation].text_auxiliary+ "-"+s,baseStationLaccis:result[ciieright[Ation].text_auxiliary + "-"+s].join(",")};
         			zero2=true;
             	}
             }
        }
        Situation.color_arr=color_arr_;
        if (f < 3) {color = "4G";width = 263;
        if(Situation.color_arr[0].baseStationKey[Situation.color_arr[0].baseStationKey.length-1]=="1"){
        	 baseStationLaccis1=Situation.color_arr[0].baseStationLaccis;
        }else if(Situation.color_arr[0].baseStationKey[Situation.color_arr[0 ].baseStationKey.length-1]=="2"){
        	 baseStationLaccis2=Situation.color_arr[0].baseStationLaccis;
        }} 
        else if (f > 2 && f < 5) {color = "2G";width = 250;
        if(Situation.color_arr[1].baseStationKey[Situation.color_arr[1].baseStationKey.length-1]=="1"){
       	 baseStationLaccis1=Situation.color_arr[1].baseStationLaccis
       }else if(Situation.color_arr[1].baseStationKey[Situation.color_arr[1].baseStationKey.length-1]=="2"){
       	 baseStationLaccis2=Situation.color_arr[1].baseStationLaccis
       }}
        if (f == 2) {margin = "margin-right:20px"}
        else {margin = "";}
        htmlMar += '<div class="runstatusbox" style="width:' + width + 'px;height:220px;' + margin + '" id="' + Ation + '">';
        htmlMar += '<div class="runstatustitle">' + ciieright[Ation].text + '</div>	';
        htmlMar += '<div style="width:100%;height:125px;position:relative;">';
        htmlMar += '<div class="runstatusvalue" data-color="' + color + '" id="' + ciieright[Ation].text_auxiliary + '-1" onclick="runstatustitle(this)" data-id="' + Ation + '" data-zero="' + zero1 + '" data-baseStationLaccis="'+baseArr[ciieright[Ation].text_auxiliary+'-1']+'" style="cursor:pointer;margin-left:30px">';
        htmlMar += '<div class="circle-red div_left_center"></div>';
        htmlMar += '<div class="runstatuscount">' + resultKey[ciieright[Ation].text_auxiliary + "-1"] + '</div></div>';
        htmlMar += '<div class="runstatusvalue" data-color="' + color + '" id="' + ciieright[Ation].text_auxiliary + '-2" onclick="runstatustitle(this)" data-id="' + Ation + '" data-zero="' + zero2 + '" data-baseStationLaccis="'+baseArr[ciieright[Ation].text_auxiliary+'-2']+'" style="cursor:pointer;margin-left:20px">';
        htmlMar += '<div class="circle-orange div_left_center"></div>';
        htmlMar += '<div class="runstatuscount">' + resultKey[ciieright[Ation].text_auxiliary + "-2"] + '</div></div></div></div>';
    }
    $("#jzzt").empty();
    $("#jzzt").html(htmlMar);
    CIIENEW.Screen.prototype.Rotatetwo();
};
CIIENEW.Screen.prototype.Rotatetwo = function() {
    var Gsm_sidx=Situation.Gsm_sidx;
    var Lte_sidx=Situation.Lte_sidx;
    var filterFormat="";
    if(Situation.data_bool==true){
    	filterFormat="--time_min=is notEmpty";
    }
    this.getCellKpiTopNGsm(Gsm_sidx,Situation.color_arr[1].baseStationLaccis);
    this.getCellKpiTopNLte(Lte_sidx,filterFormat,Situation.color_arr[0].baseStationLaccis);
};
CIIENEW.Screen.prototype.getCellKpiTopNGsm= function(Gsm_sidx,basestationlaccis) {
	CIIENEW.Screen.cdm.getCellKpiTopN({
        netType: 'gsm',
        hotspot: Situation.hotspot,
        sidx: Gsm_sidx,
        baseStationKey: Situation.color_arr[1].baseStationKey,
        ifId:Situation.ifId,
        baseStationLaccis:basestationlaccis
    }, function(Trend) {
    	Situation.GSMLISTid = {name: Situation.color_arr[1].baseStationKey};
       CIIENEW.Screen.prototype.drawGsmCells(Trend);
    });
};
CIIENEW.Screen.prototype.getCellKpiTopNLte= function(Lte_sidx,filterFormat,basestationlaccis) {
	CIIENEW.Screen.cdm.getCellKpiTopN({
        netType: 'lte',
        hotspot: Situation.hotspot,
        lteType: 'TDD',
        sidx: Lte_sidx,
        baseStationKey: Situation.color_arr[0].baseStationKey,
        filterFormat:filterFormat,
        ifId:Situation.ifId,
        baseStationLaccis:basestationlaccis
    }, function(Trend) {
    	Situation.TDDLISTid = {name: Situation.color_arr[0].baseStationKey};
        CIIENEW.Screen.prototype.drawTddCells(Trend);
    });
    CIIENEW.Screen.cdm.getCellKpiTopN({
        netType: 'lte',
        hotspot: Situation.hotspot,
        lteType: 'FDD',
        sidx: Lte_sidx,
        baseStationKey: Situation.color_arr[0].baseStationKey,
        filterFormat:filterFormat,
        ifId:Situation.ifId,
        baseStationLaccis:basestationlaccis
    }, function(Trend) {
    	Situation.FDDLISTid = {name: Situation.color_arr[0].baseStationKey};
        CIIENEW.Screen.prototype.drawFddCells(Trend);
    });
};

CIIENEW.Screen.prototype.runstatustitle = function(obgect) {
	if(Situation.runstatustitle_bool==true){
	 	var Kpis = $("#" + obgect.id).data("id");
	    var color = $("#" + obgect.id).data("color");
	    var basestationlaccis = $("#" + obgect.id).data("basestationlaccis");
	    var key = obgect.id
	    var Gsm_sidx=Situation.Gsm_sidx;
	    var Lte_sidx=Situation.Lte_sidx;
	    var filterFormat="";
	    if(Situation.data_bool==true){
	    	filterFormat="--time_min=is notEmpty";
	    }
	    click_color_arr=[null,null];
	    if (color == "2G") {
	    	color_arr[1]=obgect.id;
	        this.getCellKpiTopNGsm(Gsm_sidx,basestationlaccis);
	        click_color_arr[1]=key;
	        Situation.color_arr[1].baseStationKey=obgect.id;
	    } else if (color == "4G") {
	    	color_arr[0]=obgect.id;
	    	this.getCellKpiTopNLte(Lte_sidx,filterFormat,basestationlaccis);
	        click_color_arr[0]=key;
	    	Situation.color_arr[0].baseStationKey=obgect.id;
	    }
	}
};
CIIENEW.Screen.prototype.drawGsmCells = function(result) {
    var list = result;
    var html = '';
    var Belonged="15";
    var rotates= "null";
    if(Situation.data_bool==true){rotates="rotates";}
    Situation.GSMLIST=[];
    Situation.GSMLISTARRID=[];
    if(!utils.isStringEmpty(Situation.GSM)){
    	for (var i = 0; i < list.length; i++) {
            var record = list[i];
            var name = record.cell_name;
            var vendor = record.vendor;
            var bsm = record.bsm;
            var id = record.id;
            var cellHtml = '';
            var _id = id.replace(':', '');
            Situation.GSMLIST[i] = {"name": name,"id": id};
            if (i < 5) {
            	Situation.GSMLISTARRID[i] = {"vendor": vendor, "id": id};
            }
            if (vendor == '诺西') {
            	var Noxi=utils.getJsonName(Situation.GSM.Noxi);
            	
            	var value0 = record[Noxi[0]] == null ? '--' : record[Noxi[0]];
                //用户数
            	var value1 = record[Noxi[1]] == null ? '--' : pmars.conversion(Situation.GSM.Noxi[Noxi[1]].company_auxiliary_original,record[Noxi[1]]);
                //流量
            	var value2 = record[Noxi[2]] == null ? '--' : record[Noxi[2]];
                //2GTCP成功率
                value3 = record[Noxi[3]] == null ? '--' : record[Noxi[3]];
                //2GTCP掉线率
                var color="#fff";
                var GSMname= Situation.drawAtion[Situation.GSMLISTid.name];;
                if(!utils.isStringEmpty(GSMname)){
            		var spstr =Situation.GSMLISTid.name.split("");
                    if(i<GSMname){if(spstr[spstr.length-1]=="1"){color="#e84242"} else if(spstr[spstr.length-1]=="2"){color="#e89144"} else if(spstr[spstr.length-1]=="3"){color="#e7ea43"}}
            	 }
                cellHtml = '<div class="cellblock" id="Gsm' + i + '" data-id="' + id + '" >' +'<div style="width:100%;padding:10px;">' + '<div class="icon-lightdot" style="float:left;margin-top:10px;"></div>' +'<div class="fontSubInfo cellTitle" lacci="' + record.lacci + '" lat="' + record.lat + '" lon="' + record.lon +'" Belonged="'+Belonged+'" style="cursor:pointer;float:left;margin-left:10px;white-space:nowrap;width:360px;" title="' + name + '">' +name + '</div>' + '<div style="clear:both;"></div>' + '</div>' + '<div class="cellblockdark">' +'<div style="width:30% !important">'+Situation.GSM.Noxi[Noxi[0]].text+'</div>' + '<div id="Gsm' + _id + '_'+Noxi[0]+'" style="color:'+color+'">' + value0 + '</div>' +'<div  style="padding-top: 5px; padding-left: 5px;">'+Situation.GSM.Noxi[Noxi[0]].company_auxiliary+'</div>'+ '</div>' + '<div class="cellsubkpis">' +'<div class="cellsubkpi">' + '<div>'+Situation.GSM.Noxi[Noxi[1]].text+'</div>' + '<div class="ciiekpivalue"><span id="Gsm' + _id +'_'+Noxi[1]+'">' + value1 + '</span><span style="font-size:14px;">'+Situation.GSM.Noxi[Noxi[1]].company_auxiliary+'</span></div>' + '</div>' +'<div class="cellsubkpi">' + '<div>'+Situation.GSM.Noxi[Noxi[2]].text+'</div>' + '<div class="ciiekpivalue"><span id="Gsm' + _id +'_'+Noxi[2]+'">' + value2 + '</span><span style="font-size:14px;">'+Situation.GSM.Noxi[Noxi[2]].company_auxiliary+'</span></div>' +'</div>' + '<div class="cellsubkpi">' + '<div>'+Situation.GSM.Noxi[Noxi[3]].text+'</div>' + '<div class="ciiekpivalue"><span id="Gsm' + _id + '_'+Noxi[3]+'">' + value3 +'</span><span style="font-size:14px;">'+Situation.GSM.Noxi[Noxi[3]].company_auxiliary+'</span></div>' + '</div>' + '</div>' + '</div>';
            } else {
            	var HUAWEI=utils.getJsonName(Situation.GSM.HUAWEI);
                //华为
            	var  value0 = record[HUAWEI[0]] == null ? '--' : record[HUAWEI[0]];
                //话务量
            	var value1 = record[HUAWEI[1]] == null ? '--' : record[HUAWEI[1]];
                //GSM接通率(无线接入性)
            	var value2 = record[HUAWEI[2]] == null ? '--' : record[HUAWEI[2]];
                //2G掉话率
            	var value3 = record[HUAWEI[3]] == null ? '--' : record[HUAWEI[3]];
                //GSM无线利用率
            	 var color="#fff";
            	var GSMname= Situation.GSMLISTid.name;
            	 if(!utils.isStringEmpty(GSMname)){
            		var spstr =GSMname.split("");
                    if(bsm=="true"){if(spstr[spstr.length-1]=="1"){color="#e84242"} else if(spstr[spstr.length-1]=="2"){color="#e89144"} else if(spstr[spstr.length-1]=="3"){color="#e7ea43"}}
            	 }
            	cellHtml = '<div class="cellblock" id="Gsm' + i + '" data-id="' + id + '" >' + '<div style="width:100%;padding:10px;">' + '<div class="icon-lightdot" style="float:left;margin-top:10px;"></div>' + '<div class="fontSubInfo cellTitle" lacci="' + record.lacci + '" lat="' + record.lat + '" lon="' + record.lon + '" Belonged="'+Belonged+'" style="cursor:pointer;float:left;margin-left:10px;white-space:nowrap;width:360px;color:'+color+'" title="' + name + '">' + name+ '</div>' + '<div style="clear:both;"></div>' + '</div>' + '<div class="cellblockdark">' + '<div style="width:30% !important">'+Situation.GSM.HUAWEI[HUAWEI[0]].text+'</div>' + '<div id="Gsm' + _id + '_'+HUAWEI[0]+'">' + value0 + '</div>' + '<div  style="padding-top: 5px;padding-left: 5px;">'+Situation.GSM.HUAWEI[HUAWEI[0]].company_auxiliary+'</div>' + '</div>' + '<div class="cellsubkpis">' + '<div class="cellsubkpi">' + '<div>'+Situation.GSM.HUAWEI[HUAWEI[1]].text+'</div>' + '<div class="ciiekpivalue"><span id="Gsm' + _id + '_'+HUAWEI[1]+'">' + value1 + '</span><span style="font-size:14px;">'+Situation.GSM.HUAWEI[HUAWEI[1]].company_auxiliary+'</span></div>' + '</div>' + '<div class="cellsubkpi">' + '<div>'+Situation.GSM.HUAWEI[HUAWEI[2]].text+'</div>' + '<div class="ciiekpivalue"><span id="Gsm' + _id + '_'+HUAWEI[2]+'">' + value2 + '</span><span style="font-size:14px;">'+Situation.GSM.HUAWEI[HUAWEI[2]].company_auxiliary+'</span></div>' + '</div>' + '<div class="cellsubkpi">' + '<div>'+Situation.GSM.HUAWEI[HUAWEI[3]].text+'</div>' + '<div class="ciiekpivalue"><span id="Gsm' + _id + '_'+HUAWEI[3]+'">' + value3 + '</span><span style="font-size:14px;">'+Situation.GSM.HUAWEI[HUAWEI[3]].company_auxiliary+'</span></div>' + '</div>' + '</div>' + '</div>';
            }
           html += cellHtml;
           if(i==0){Situation.click1_1=true;}
        }
        $("#GSMLIST").empty();
        $('#GSMLIST').html(html);
        $('#GSMLIST').find('.icon-samelatlng').on('click', this.findSameLatLon.bind(this));
        $('#GSMLIST').find('.cellTitle').on('click', this.locateCell.bind(this));
    }
};
CIIENEW.Screen.prototype.drawTddCells = function(result) {
    var list = result;
    var html = '';
    var rotates= "null";
    var Belonged="";
    Situation.TDDLIST=[];
    Situation.TDDLISTARRID=[];
    if(Situation.data_bool==false){
    	Belonged="15";
    }else{
    	Belonged="1";
    } 
    if(Situation.data_bool==true){
    	rotates="rotates";
    }
    for (var i = 0; i < list.length; i++) {
        var record = list[i];
        var name = record.cell_name;
        var id = record.id;
        var bsm=record.bsm;
        var _id = id.replace(':', '');
        Situation.TDDLIST[i] = {"name": name,"id": id};
        if (i < 5) {Situation.TDDLISTARRID[i] = {"id": id}; }
        var TDD=utils.getJsonName(Situation.TDD);
        var value0 = record[TDD[0]] == null ? '--' : pmars.conversion(Situation.TDD[TDD[0]].company_auxiliary_original,record[TDD[0]]);
        //流量
        var value1 = record[TDD[1]] == null ? '--' : record[TDD[1]];
        //4G无线接通率
        var value2 = record[TDD[2]] == null ? '--' : record[TDD[2]];
        //VOLTE语音掉话率
        var value3 = record[TDD[3]] == null ? '--' : record[TDD[3]];
        //RRC连接建立请求次数
        var color="#fff";
        var TDDname= Situation.TDDLISTid.name;
       	if(!utils.isStringEmpty(TDDname)){
       		var spstr =TDDname.split("");
       		if(bsm=="true"){if(spstr[spstr.length-1]=="1"){color="#e84242"} else if(spstr[spstr.length-1]=="2"){color="#e89144"} else if(spstr[spstr.length-1]=="3"){color="#e7ea43"}}
       	}
        var cellHtml = '<div class="cellblock " id="Tdd' + i + '" data-id="' + id + '">' + '<div style="width:100%;padding:10px;">' + '<div class="icon-lightdot" style="float:left;margin-top:10px;"></div>' + '<div class="fontSubInfo cellTitle" lacci="' + record.lacci + '" lat="' + record.lat + '" lon="' + record.lon + '" Belonged="'+Belonged+'" style="cursor:pointer;float:left;margin-left:10px;white-space:nowrap;width:350px;color:'+color+'" title="' + name + '">' + utils.showOutLength(name,22) + '</div>' + '<div style="clear:both;"></div>' + '</div>' + '<div class="cellblockdark">' + '<div style="width:30% !important">'+Situation.TDD[TDD[0]].text+'</div>' + '<div id="Tdd' + _id + '_'+TDD[0]+'">' + value0 + '</div>' + '<div style="padding-top: 5px;padding-left: 5px;">'+Situation.TDD[TDD[0]].company_auxiliary+'</div>' + '</div>' + '<div class="cellsubkpis">' + '<div class="cellsubkpi" style="font-size: 20px;width: 38%;">' + '<div>'+Situation.TDD[TDD[1]].text+'</div>' + '<div class="ciiekpivalue"><span id="Tdd' + _id + '_'+TDD[1]+'">' + value1 + '</span><span style="font-size:14px;">'+Situation.TDD[TDD[1]].company_auxiliary+'</span></div>' + '</div>' + '<div class="cellsubkpi" style="font-size: 20px;width: 30%;">' + '<div>'+Situation.TDD[TDD[2]].text+'</div>' + '<div class="ciiekpivalue"><span  id="Tdd' + _id + '_'+TDD[2]+'">' + value2 + '</span><span style="font-size:14px;">'+Situation.TDD[TDD[2]].company_auxiliary+'</span></div>' + '</div>' + '<div class="cellsubkpi " style="font-size: 20px;width: 32%;">' + '<div>'+Situation.TDD[TDD[3]].text+'</div>' + '<div class="ciiekpivalue"><span id="Tdd' + _id + '_'+TDD[3]+'">' + value3 + '</span><span style="font-size:14px;">'+Situation.TDD[TDD[3]].company_auxiliary+'</span></div>' + '</div>' + '</div>' + '</div>';

        html += cellHtml;
        if(i==0){Situation.click2_1=true;}
    }
    $("#TDDLIST").empty();
    $('#TDDLIST').html(html);
    if(Situation.Roll_bool_two=true){
        setTimeout(function(){
   		 for (var i = 0; i < list.length; i++) {
   			 $("#Tdd" + i).removeClass(rotates);
   		 }
       }, 100);
       setTimeout(function(){ 
   		for (var i = 0; i < list.length; i++) {
   		   $("#Tdd" + i).addClass(rotates);
   		 }
   		}, 200);	
    }
	$('#TDDLIST').find('.cellTitle').on('click', this.locateCell.bind(this));
};
CIIENEW.Screen.prototype.drawFddCells = function(result) {
    var list = result;
    var html = '';
    var rotates= "null";
    var Belonged="";
    Situation.FDDLIST=[];
    Situation.FDDLISTARRID=[];
    if(Situation.data_bool==false){Belonged="15";}
    else{Belonged="1";} 
    if(Situation.data_bool==true){
    	rotates="rotates";
    }
    for (var i = 0; i < list.length; i++) {
        var record = list[i];
        var name = record.cell_name;
        var id = record.id;
        var _id = id.replace(':', '');
        var bsm=record.bsm;
        Situation.FDDLIST[i] = {"name": name,"id": id};
        if (i < 5) {Situation.FDDLISTARRID[i] = {"id": id};}
        var FDD=utils.getJsonName(Situation.FDD);
        var value0 = record[FDD[0]] == null ? '--' : pmars.conversion(Situation.FDD[FDD[0]].company_auxiliary_original,record[FDD[0]]);
        //流量
        var value1 = record[FDD[1]] == null ? '--' : record[FDD[1]];
        //4G无线接通率
        var value2 = record[FDD[2]] == null ? '--' : record[FDD[2]];
        //VOLTE语音掉话率
        var value3 = record[FDD[3]] == null ? '--' : record[FDD[3]];
        //RRC连接建立请求次数
        var color="#fff";
        var FDDname= Situation.FDDLISTid.name;
       	if(!utils.isStringEmpty(FDDname)){
       		var spstr =FDDname.split("");
       		if(bsm=="true"){if(spstr[spstr.length-1]=="1"){color="#e84242"} else if(spstr[spstr.length-1]=="2"){color="#e89144"} else if(spstr[spstr.length-1]=="3"){color="#e7ea43"}};
       	}
        var cellHtml = '<div class="cellblock "  id="Fdd' + i + '" data-id="' + id + '">' + '<div style="width:100%;padding:10px;">' + '<div class="icon-lightdot" style="float:left;margin-top:10px;"></div>' + '<div class="fontSubInfo cellTitle" lacci="' + record.lacci + '" lat="' + record.lat + '" lon="' + record.lon + '" Belonged="'+Belonged+'" style="cursor:pointer;float:left;margin-left:10px;white-space:nowrap;width:350px;color:'+color+'" title="' + name + '">' + utils.showOutLength(name,22) + '</div>' + '<div style="clear:both;"></div>' + '</div>' + '<div class="cellblockdark">' + '<div style="width:30% !important">'+Situation.FDD[FDD[0]].text+'</div>' + '<div id="Fdd' + _id + '_'+FDD[0]+'">' + value0 + '</div>' + '<div style="padding-top: 5px;padding-left: 5px;">'+Situation.FDD[FDD[0]].company_auxiliary+'</div>' + '</div>' + '<div class="cellsubkpis">' + '<div class="cellsubkpi" style="font-size: 20px;width: 38%;">' + '<div>'+Situation.FDD[FDD[1]].text+'</div>' + '<div class="ciiekpivalue     font-size: 20px;"><span id="Fdd' + _id + '_'+FDD[1]+'">' + value1 + '</span><span style="font-size:14px;">'+Situation.FDD[FDD[1]].company_auxiliary+'</span></div>' + '</div>' + '<div class="cellsubkpi" style="font-size: 20px;width: 30%;">' + '<div>'+Situation.FDD[FDD[2]].text+'</div>' + '<div class="ciiekpivalue"><span id="Fdd' + _id + '_'+FDD[2]+'">' + value2 + '</span><span style="font-size:14px;">'+Situation.FDD[FDD[2]].company_auxiliary+'</span></div>' + '</div>' + '<div class="cellsubkpi" style="font-size: 20px;width: 32%;">' + '<div>'+Situation.FDD[FDD[3]].text+'</div>' + '<div class="ciiekpivalue"><span id="Fdd' + _id + '_'+FDD[3]+'">' + value3 + '</span><span style="font-size:14px;">'+Situation.FDD[FDD[3]].company_auxiliary+'</span></div>' + '</div>' + '</div>' + '</div>';

        html += cellHtml;
        if(i==0){Situation.click3_1=true;}
    }
    $("#FDDLIST").empty();
    $('#FDDLIST').html(html);
    if(Situation.Roll_bool_two=true){
        setTimeout(function(){
   		 for (var i = 0; i < list.length; i++) {
   			 $("#Fdd" + i).removeClass(rotates);
   		 }
      }, 100);
   	setTimeout(function(){ 
   		for (var i = 0; i < list.length; i++) {
   		   $("#Fdd" + i).addClass(rotates);
   		 }
   	}, 200);
    }
    $('#FDDLIST').find('.cellTitle').on('click', this.locateCell.bind(this));	
};
CIIENEW.Screen.prototype.locateCell = function(e) {
    var name = $(e.currentTarget).text();
    var lat = $(e.currentTarget).attr('lat');
    var lon = $(e.currentTarget).attr('lon');
    var lacci = $(e.currentTarget).attr('lacci');
    var Belonged = $(e.currentTarget).attr('Belonged');
    if(isScreenMode=="true"){
    	parent.locateCell(lacci, name, lat, lon,true,Belonged);
    }else{
    	window.location.href='ciiecenter.jsp?locatecell=true&fromModel=ciie&lacci='+encodeURIComponent(lacci)
    	+"&cellName="+encodeURIComponent(name)
    	+"&lat="+encodeURIComponent(lat)
    	+"&lon="+encodeURIComponent(lon)
    	+"&bool=true"
    	+"&Belonged="+encodeURIComponent(Belonged);
    	
    }
};
CIIENEW.Screen.prototype.findSameLatLon = function(e) {
    var name = $(e.currentTarget).attr('name');
    var lat = $(e.currentTarget).attr('lat');
    var lon = $(e.currentTarget).attr('lon');
    var type = $(e.currentTarget).attr('type');
    var lacci = $(e.currentTarget).attr('lacci');
    var Belonged = $(e.currentTarget).attr('Belonged');
    var lteType = '';
    var gridHeight = 760;
    var gridWidth = 1350;

    parent.locateCell(lacci, name, lat, lon,Belonged);

    $('#modalWinTitle').text(name + '同址小区列表');
    $('#modalWinBody').html('<table id="modalWinTable"></table>');
    $('#modalWin').modal();

    var cols = [];
    var colNames = [];
    var netType = '';
    var TDD=utils.getJsonName(Situation.TDD);
    var FDD=utils.getJsonName(Situation.FDD);
    switch (type) {
    case '诺西':
        cols = [{
            colName: '小区名称',
            name: 'cell_name',
            index: 'cell_name'
        }, {
            colName: '用户数',
            name: 's_091',
            index: 's_091'
        }, {
            colName: '流量',
            name: 's_083',
            index: 's_083',
            formatter: function(value) {
                return value == null ? '--' : (value / 1024).toFixed(2)
            }
        }, {
            colName: 'TCP成功率',
            name: 's_252',
            index: 's_252'
        }, {
            colName: 'TCP掉线率',
            name: 's_137',
            index: 's_137'
        }];
        netType = 'gsm';
        break;
    case '华为':
        cols = [{
            colName: '小区名称',
            name: 'cell_name',
            index: 'cell_name'
        }, {
            colName: '话务量',
            name: 'gsmhwl',
            index: 'gsmhwl'
        }, {
            colName: '2G接通率',
            name: 'gsm_conn_ratio',
            index: 'gsm_conn_ratio'
        }, {
            colName: '2G掉话率',
            name: 'gsm_conn_ratio',
            index: 'gsm_conn_ratio',
            formatter: function(value) {
                return value == null ? '--' : (100 - value).toFixed(2)
            }
        }, {
            colName: '2G利用率',
            name: 'gsm_wireless_use_ratio',
            index: 'gsm_wireless_use_ratio'
        }];
        netType = 'gsm';
        break;
    case 'TDD':

        cols = [{
            colName: '小区名称',
            name: 'cell_name',
            index: 'cell_name'
        }, {
            colName: Situation.TDD[TDD[0]].text,
            name: TDD[0],
            index: TDD[0],
            formatter: function(value) {
                return value == null ? '--' : pmars.conversion(Situation.TDD[TDD[0]].company_auxiliary_original,value);
            }
        }, {
            colName: Situation.TDD[TDD[1]].text,
            name: TDD[1],
            index: TDD[1]
        }, {
            colName: Situation.TDD[TDD[2]].text,
            name: TDD[2],
            index: TDD[2]
        }, {
            colName: Situation.TDD[TDD[3]].text,
            name: TDD[3],
            index: TDD[3]
        }];
        netType = 'lte';
        lteType = 'TDD';
        break;
    case 'FDD':
        cols = [{
            colName: '小区名称',
            name: 'cell_name',
            index: 'cell_name'
        }, {
            colName: Situation.FDD[FDD[0]].text,
            name: FDD[0],
            index: FDD[0],
            formatter: function(value) {
                return value == null ? '--' : pmars.conversion(Situation.FDD[FDD[0]].company_auxiliary_original,value);
            }
        }, {
            colName: Situation.FDD[FDD[1]].text,
            name: FDD[1],
            index: FDD[1]
        }, {
            colName: Situation.FDD[FDD[2]].text,
            name: FDD[2],
            index: FDD[2]
        }, {
            colName: Situation.FDD[FDD[3]].text,
            name: FDD[3],
            index: FDD[3]
        }];
        netType = 'lte';
        lteType = 'FDD';
        break;
    }

    for (var i = 0; i < cols.length; i++) {
        colNames.push(cols[i].colName);
    }
    $('#modalWinTable').jqGrid({
        datatype: function() {},
        colNames: colNames,
        colModel: cols,
        loadui: 'disable',
        height: gridHeight,
        width: gridWidth,
        rowNum: 1000,
        autoWidth: true,
        shrinkToFit: true,
        autoScroll: false
    });
    CIIENEW.Screen.cdm.getCellKpiTopN({
        lat: lat,
        lon: lon,
        netType: netType,
        lteType: lteType,
        hotspot: Situation.hotspot,
        sidx: this.sidxGSM,
        topN: -1
    }, function(result) {
        $('#modalWinTable')[0].addJSONData(result);
    });
};
function runstatustitle(obgect) {
    CIIENEW.Screen.prototype.runstatustitle(obgect);
}
function _close() {
    $("#ciierig_Modal").modal('hide');
}
function ciierig_Roll_img_ydyw_onmouseover2(){
	$('#Roll_img_div2').css('visibility','visible');
}
function ciierig_Roll_img_mouseout2(){
	$('#Roll_img_div2').css('visibility','hidden');
}
function ciierig_Roll_img_one_onmouseover(){
	$('#Roll_img_div_one').css('visibility','visible');
}
function ciierig_Roll_img_one_mouseout(){
	$('#Roll_img_div_one').css('visibility','hidden');
}

function Roll_img_div_two_onmouseover(){
	$('#Roll_img_two').css('visibility','visible');
}
function Roll_img_div_two_mouseout(){
	$('#Roll_img_two').css('visibility','hidden');
}

function Roll_img_click2(){
	if(Situation.Roll_bool_two==true){
		Situation.Roll_bool_two=false;
		$('#Roll_img2').attr('src',eastcom.baseURL+'/static/images/overview/k_2.png');	
		window.clearInterval(Situation.Minutetwo);
	}else{
		Situation.Roll_bool_two=true;
		window.clearInterval(Situation.Timing.Fdd_1);
		window.clearInterval(Situation.Timing.Fdd_2);
		window.clearInterval(Situation.Timing.Tdd_1);
		window.clearInterval(Situation.Timing.Tdd_2);
	    $('#Roll_img2').attr('src',eastcom.baseURL+'/static/images/overview/k_1.png');	
	}
}