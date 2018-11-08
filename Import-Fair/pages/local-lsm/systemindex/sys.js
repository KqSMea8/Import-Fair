var ICON_CONFIG={
	"系统菜单":''
};
var itemList=[
              {
            	  name:'系统菜单',
            	  icon:'sys0.png',
            	  selected:true,
            	  systems:[
            	    {img:'sys0_0.jpg',url:'../areamonitor/areaMonitor1.jsp'},
            	    {img:'sys0_1.jpg',url:'../areamonitor/areaMonitor2.jsp?isScreenMode=true'},
            	    {img:'sys0_2.jpg',url:'http://10.221.213.86:8080/shjk/shjk_hstopics.html'},
            	    {img:'sys0_3.jpg',url:'../shvideoe2e/videoScreen.jsp'}
	              ]
              }
         ];

$(function () {
	var htmlStr='';
	for(var i=0;i<itemList.length;i++){
		var record=itemList[i];
		var selectedClass="";
		if(record.selected){
			selectedClass="listSelected";
			setImgs(i);
		}
		
		htmlStr+='<li index="'+i+'" class="listItem '+selectedClass+'" title="'+record.name+'"><img class="itemImg" src="assets/images/'+record.icon+'"></img><span class="itemName">'+record.name+'</span><div style="clear:both;"></div></li>';
	}
	$('#listul').html(htmlStr);
	
	$(".imgItem").on('click',function(e){
		var url=$(e.currentTarget).attr("url");
		if(url&&url!=""){
			window.open(url,"_blank");
		}
	});
	
	$(".listItem").on('click',function(e){
		$(".listItem").removeClass('listSelected');
		$(e.currentTarget).addClass('listSelected');
		var index=$(e.currentTarget).attr("index");
		setImgs(index);
	});
});

function setImgs(index){
	var systems=itemList[index].systems;
	
	for(var i=0;i<systems.length;i++){
		if(systems[i].img==null){
			$(".imgItem:eq("+i+")").attr("style","");
			$(".imgItem:eq("+i+")").attr("url","");
		}else{
			$(".imgItem:eq("+i+")").attr("style","background-image:url(assets/images/"+systems[i].img+");background-size:100% 100%;");
			$(".imgItem:eq("+i+")").attr("url",systems[i].url);
		}
		
	}
}