var userInfo = "";
var userinfoDiv = $(window.top.document.getElementById('userinfo'));
userInfo =  userinfoDiv.find('div[id = "tab_1_1"]').find('div').eq(0).find('div').eq(1).html();
if (userInfo == null) {
    userInfo = $.cookie("inas_portallogin_user_username");
}else{
    var re1 = new RegExp("\n", "g");
    userInfo = userInfo.replace(re1, ""); 
    userInfo = userInfo.trim(); 
};
var zhandianInfo = {
	"高铁" : {
		icon:"gaotie.png",
		pos:[ 31.111522, 121.373291 ],
		zoom: 12,
	},
	"进博会场馆" :{
		icon:"zhongbohui.jpg",
		pos:[ 31.164933, 121.327586 ],
		zoom: 13,
	} ,
	"虹桥枢纽" : {
		icon:"hongqiaozhan.jpg",
		pos:[ 31.186436, 121.31465 ],
		zoom: 14,
	},
	"浦东机场" : {
		icon:"pudongjichang.jpeg",
		pos:[ 31.139715, 121.498623 ],
		zoom: 12,
	},
	"进博会周边" : {
		icon:"zhongbohuizhoubian.png",
		pos:[ 31.199534, 121.373866 ],
		zoom: 13,
	},
	"长途汽车站" : {
		icon:"qichezhan.jpg",
		pos:[ 31.291845, 121.421081 ],
		zoom: 15,
	},
	"上海火车站" : {
		icon:"shanghaizhan.jpeg",
		pos:[ 31.221524, 121.340521 ],
		zoom: 13,
	},
	"上海南站" : {
		icon:"shanghainanzhan.jpg",
		pos:[ 31.162213, 121.343683 ],
		zoom: 14,
	},
	"酒店" : {
		icon:"jiudian.png",
		pos:[ 31.188166, 121.352019 ],
		zoom: 12,
	},
	"市委办公厅" : {
		icon:"shiweibangongting.jpg",
		pos:[ 31.214483, 121.45263 ],
		zoom: 14,
	},
}
var main = {
	init:function () {
		this.querySulan();
		this.appendZhandian(mapIndex.init);
		this.initFontSuofang();
		initClass();
		setInterval(function () {
			main.query();
		},15*60*1000);
	},
	query:function () {
		main.querySulan();
		main.appendZhandian();
		mapIndex.updateLayers();
	},
	//加在左侧流量速览
	querySulan:function () {
		var datastr = {
		    dateType:$(".radiom").siblings(".radioActive").attr("value"),
			hot_area_name:$(".batOfdefault").siblings(".batOfxuanzhong").attr("name").trim()
		};
		commonAjax("/sml/query/cus-trans-rm-monflow-hotpic-index",JSON.stringify(datastr),"post",true,function (data) {
			$("#liuliangsulan").find(".shuzhi").html("--");
			if(data&&data.success){
				data = data.data[0];
				if(!data){
					return;
				}
				$("#leijiliuliang").text(data.FLOWS?data.FLOWS:"--");
				var text1 = data.SERVICE_NAME?data.SERVICE_NAME:"--";
				$("#fengzhizhandian").html($(getCanvasText(180,20,text1,"white","14px")).css({position: "relative",top: "13px"}).attr("title",text1));
				$("#zhandianzhanbi").text(data.RADIO||data.RADIO==0?data.RADIO:"--");
			}
		})
	},
	//加载热力图
	queryReli:function (oneSelf) {
		$("#lteZhanDian").find(".zhandian").removeClass("zhanActive");
		$(oneSelf).addClass("zhanActive");
		mapIndex.updateLayers();
	},
	//加载左侧站dian
	appendZhandian:function (backFun) {
		var datastr = {
		    dateType:$(".radiom").siblings(".radioActive").attr("value"),
			hot_area_name:""
		};
		commonAjax("/sml/query/cus-trans-rm-monflow-showhotpic",JSON.stringify(datastr),"post",true,function (data) {
			if(data&&data.success){
				data = data.data;
				var hot_area_name = $("#lteZhanDian").find(".zhanActive").attr("name");
				hot_area_name = hot_area_name?hot_area_name:"";
				var sumnumber = Math.ceil(data.length/4);
				var nowNumber = $("#lteZhanDian").attr("nowNumber");
				$("#lteZhanDian").attr("sumNumber",sumnumber);
				$("#lteZhanDian").attr("nowNumber",nowNumber?(nowNumber>sumnumber?sumnumber:nowNumber):1);
				var zongHtml = "";
				for(var i=0;i<sumnumber*4;i++){
					if(i >= data.length){
//						zongHtml+='<div class="zhandian"></div>';
						continue;
					}
					var oneSelf = data[i];
					var imgName = zhandianInfo[oneSelf.HOT_AREA_NAME].icon;
					var postion = zhandianInfo[oneSelf.HOT_AREA_NAME].pos;
					var zoom = zhandianInfo[oneSelf.HOT_AREA_NAME].zoom;
					
					var color = "#A8A8A9";
					switch (i){
						case 0:
							color = "#FF4B31"
							break;
						case 1:
							color = "#F59B05"
							break;
						case 2:
							color = "#ECD800"
							break;
						default:
							break;
					}
					zongHtml += '<div class="zhandian '+(hot_area_name==oneSelf.HOT_AREA_NAME||(hot_area_name==""&&i==0)?"zhanActive":"")+'" onclick="main.queryReli(this)" name="'+oneSelf.HOT_AREA_NAME+'">'+
		'						<div class="zhandianChild chuiCenter">'+
		'							<img class="bgimg chuiCenter" src="'+eastcom.baseURL+'/static/images/PTNSCR/mapIndex/zhandian/'+imgName+'"/>'+
		'							<div class="paiming" style="border-color:'+color+' transparent;"></div>'+
		'							<div class="paimingWen">'+(i+1)+'</div>'+
		'							<div class="downInfo">'+
		'								<div class="name fl chuiCenter">'+oneSelf.HOT_AREA_NAME+'</div>'+
		'								<div class="number fl chuiCenter">'+oneSelf.SUMS+'</div>'+
		'								<div class="danwei fl chuiCenter">个</div>'+
		'							</div>'+
		'						</div>'+
		'					</div>'
				}
				$("#lteZhanDian").html(zongHtml);
				if(backFun){
					backFun();
				}
			}
		})
	},
	//初始化缩放字体
	initFontSuofang : function () {
		$(".biaoti").eq(0).html($(getCanvasText(101,20,"当前累计流量","#B2C1D5","15px")).css({position: "relative",top: "13px"}));
		$(".biaoti").eq(1).html($(getCanvasText(101,20,"当前峰值站点","#B2C1D5","15px")).css({position: "relative",top: "13px"}));
		$(".biaoti").eq(2).html($(getCanvasText(117,20,"高流量站点占比","#B2C1D5","15px")).css({position: "relative",top: "13px"}));
	}
}
function initClass () {
	//时间粒度单选框
	$(".radiom").click(function (e) {
		if($(this).hasClass("radioActive")){
			return;
		}
		$(".radiom").removeClass("radioActive");
		$(this).addClass("radioActive");
		main.query();
		e.stopPropagation();
	});
	//左侧 TAB 切换
	$(".batOfdefault ").click(function (e) {
		if($(this).hasClass("batOfxuanzhong")){
			return;
		}
		$(".batOfdefault").removeClass("batOfxuanzhong");
		$(this).addClass("batOfxuanzhong");
		main.querySulan();
//		main.appendZhandian();
		e.stopPropagation();
	})
	//左侧缩小放大
	$(".icon-ctrl").click(function (e) {
		if($(this).hasClass("suoxiao")){
			$(this).removeClass("suoxiao").addClass("fangda");
			$(this).parent().siblings(".list").hide();
		}else{
			$(this).removeClass("fangda").addClass("suoxiao");
			$(this).parent().siblings(".list").show();
		}
		e.stopPropagation();
	})
	//左边翻滚站点
	$(".zhandianFangun").click(function (e) {
		var scrTopN = $("#lteZhanDian")[0].scrollHeight;
		var scrollTop = $("#lteZhanDian")[0].scrollTop;
		var height = $("#lteZhanDian").height();
		var sumNumber = parseInt($("#lteZhanDian").attr("sumNumber"));
		var nowNumber = parseInt($("#lteZhanDian").attr("nowNumber"));
		if($(this).hasClass("up")){
			if(nowNumber==1){
				$("#lteZhanDian").animate({"scrollTop":scrTopN-height},1000);
				$("#lteZhanDian").attr("nowNumber",sumNumber);
			}else{
				$("#lteZhanDian").animate({"scrollTop":(nowNumber-2)*height},1000);
				$("#lteZhanDian").attr("nowNumber",nowNumber-1);
			}
		}else{
			if(nowNumber==sumNumber){
				$("#lteZhanDian").animate({"scrollTop":0},1000);
				$("#lteZhanDian").attr("nowNumber",1);
			}else{
				$("#lteZhanDian").animate({"scrollTop":scrollTop+height},1000);
				$("#lteZhanDian").attr("nowNumber",nowNumber+1);
			}
		}
		e.stopPropagation();
	});
	$("#lteZhanDian").on("mousewheel DOMMouseScroll", function (e) {
	    var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||  // chrome & ie
	                (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));              // firefox
	    if (delta > 0) {
	        // 向上滚
	        $(".zhandianFangun.up").click();
	    } else if (delta < 0) {
	        // 向下滚
	        $(".zhandianFangun.down").click();
	    }
	    e.stopPropagation();
//	    return false;
	});
}
function getCanvasText (width,height,text,color,font) {
	var canvas = document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;
	var context = canvas.getContext("2d"); 	
	context.fillStyle = color;	
	context.font = font+" 微软雅黑"; //字体样式
	context.textAlign = "statr"; //对齐方式为左对齐	
	context.textBaseline = "top"; //基线	
	context.fillText(text, 0, 0, 200);
	return canvas;
}
