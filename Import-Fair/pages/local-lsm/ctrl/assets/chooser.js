var OVERKEY=0;
var OUTKEY=0;
var LIST_CTRL_LAG=400;
var AUTH_BASE=CTX+"/auth";
var LOG_GRID=null;

$(function () {
	
	$("#list").on('mouseover',listCtrl);
	$("#list").on('mouseout',listCtrl);
	$(".drillItem").on('click',listItemCtrl);
	$("#showLog").on('click',showLog);
	window.onkeypress=documentKeyUp;
	if(!isNaN(PAGE)){
		PAGE=PAGE*1;
		if(PAGE<1000){
			//setFrame($(".listItem:eq("+(PAGE-1)+")")[0]);
			setFrame($(".listItem[itemIndex='"+(PAGE)+"']")[0]);
		}else{
			var mainPage=Math.floor(PAGE/1000);
			var subPage=PAGE%1000;
			//setFrame($(".listItem:eq("+(mainPage-1)+")")[0],subPage);
			setFrame($(".listItem[itemIndex='"+(mainPage)+"']")[0],subPage);
		}
	}else{
		setFrame($(".listItem:eq(2)")[0]);
	}
	
	
});
function documentKeyUp(e){
	if(e.keyCode==77||e.keyCode==109){
		var stat=$("#list").attr("stat");
		if(stat=="hidden"){
			showList();
		}else if(stat=="hiding"){
			showList();
		}else if(stat=="show"){
			hideList();
		}else if(stat=="showing"){
			hideList();
		}
		
	}
}
function listCtrl(e){
	var stat=$("#list").attr("stat");
//	console.log(e.type+","+stat);
	if(e.type=="mouseover"){
		if(stat=="hidden"){
			$("#list").attr("stat","showing");
			OVERKEY=setTimeout(showList,LIST_CTRL_LAG);
		}else if(stat=="hiding"){
			$("#list").attr("stat","show");
			clearTimeout(OUTKEY);
		}
		
	}else if(e.type=="mouseout"){
		if(stat=="show"){
			$("#list").attr("stat","hiding");
			OUTKEY=setTimeout(hideList,LIST_CTRL_LAG);
		}else if(stat=="showing"){
			$("#list").attr("stat","hidden");
			clearTimeout(OVERKEY);
		}
	}
}
function showList(){
	$("#list").animate({left:"0px"});
	$("#list").attr("stat","show");
}
function hideList(){
	$("#list").animate({left:"-215px"});
	$("#list").attr("stat","hidden");
}
function listItemCtrl(e){
//	setFrame(e.currentTarget);
//	alert($(e.currentTarget).attr("name"));
//	log($(e.currentTarget).attr("name"));
	window.location.href="chooser.jsp?page="+$(e.currentTarget).attr("index");
}
function setFrame(item,subPage){
	
	$(".listItem").removeClass('listSelected');
	$(item).addClass('listSelected');
	
	if(subPage!=null){
		item=$(item).find(".subIcon")[subPage-1];
	}else{
		item=$(item).find(".itemImg")[0];
	}
	log($(item).attr("name"));
	var url=$(item).attr("url");
	var frameWidth=$(item).attr("frameWidth");
	var frameHeight=$(item).attr("frameHeight");
	$('#container').css('overflow-x','auto');
	$('#container').css('overflow-y','auto');
	if(frameWidth=='100%'){
		frameWidth=$('body').width();
		$('#container').css('overflow-x','hidden');
	}else if(isNaN(frameWidth)){
		frameWidth=6420;	
	}else{
	}
	if(frameHeight=='100%'){
		frameHeight=$('body').height();
		$('#container').css('overflow-y','hidden');
	}else if(isNaN(frameHeight)){
		frameHeight=1240;
	}
	
	$("#iframe").attr("src",url);
	$("#iframe").css("width",frameWidth);
	$("#iframe").css("height",frameHeight);
}


function log(module_name){
	var url = AUTH_BASE+'/log';
	crossSafeAjax({
  		type : 'POST',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		data:JSON.stringify({"module_name":module_name,"message_":"",cost_time:(1000+Math.random()*1000).toFixed(0)}),
  		url : encodeURI(url),
  		success : function(rawData) {
  		},
  		error: function(rawData) {
  		}
	});
}

function showLog(){
	$("#wxapp-modal").show();
	if(LOG_GRID==null){
		LOG_GRID=$("#logGrid").jqGrid({
	        datatype: "json", 
	        colNames: ['操作时间','场景名称','姓名','部门','客户端IP','服务器IP','用时(ms)'],
	        colModel: [
	                   {name: 'time', index: 'time', align: "center",width:280,sortable:false},
	                   {name: 'module_name', index: 'module_name',width:200, align: "center",sortable:false},
	                   {name: 'name', index: 'name',width:150, align: "center",sortable:false},
	                   {name: 'descr', index: 'descr',width:150, align: "center",sortable:false},
	                   {name: 'remote_ip', index: 'remote_ip',width:200, align: "center",sortable:false},
	                   {name: 'server_ip', index: 'server_ip',width:200, align: "center",sortable:false},
	                   {name: 'cost_time', index: 'cost_time',width:150, align: "center",sortable:false}
	               ],
	        height:500,
	        url:CTX+"/sml/query/ipmsds-sys-queryLsmLog",
	        postData:{"params":JSON.stringify({ifId:"ipmsds-sys-queryLsmLog"})},
	        loadtext:'加载中...',
	        mtype:"POST",
	        jsonReader:{
	        	root: "data.elements",  //数据模型
	        	page: "data.pageNo",//数据页码
	        	total: "data.pageNum",//数据总页码
	        	records: "data.total",
	        	repeatitems:false
	        },
	        prmNames:{
	        	page:"page",
	        	rows:"limit",
	        	sort: null,
	        	order: null, 
	        	search:null, 
	        	nd:null, 
	        	npage:null
	        },
	        viewrecords: true,//是否在浏览导航栏显示记录总数
	        autowidth: true,
	        shrinkToFit: false,
	        scrollOffset: 0, 
	        pager:'#logGridPager',
	        pgtext : "第 {0}页，共{1}页，每页10条",
	        rowNum: 10//每页显示记录数
	    });
		$("#logExport").on('click',exportLog);
		updateLogList();
	}
}
function updateLogList(){
	var startTime=$("#startTime").val();
	var endTime=$("#endTime").val();
	var params={ifId:"ipmsds-sys-queryLsmLog"};
	if(startTime!=""){
		params.startTime=startTime;
	}
	if(endTime!=""){
		params.endTime=endTime;
	}
	var opt={
		    url:CTX+"/sml/query/ipmsds-sys-queryLsmLog",
		    postData:{"params":JSON.stringify(params)},
		    page:1
	};
	$("#logGrid").setGridParam(opt) .trigger("reloadGrid");
}
function exportLog(){
	ToExcelOrCSVPage({
        myGrid : LOG_GRID.jqGrid("getGridParam"),
        action : CTX+"/sml/export/export",
        title : "日志列表",    //导出的表名
        isThereCheckBox : false,//第一列是否有选择框或序号，是否导出第一列
        isHidden : false,//是否导出隐藏列，true 导出
        isComplexHeader : false//是否多级表头，暂支持两级表头
      });
}
