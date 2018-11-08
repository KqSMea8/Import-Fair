$('#optical_img').attr('src',eastcom.baseURL+'/static/styles/local-lsm/roam/images/Roam/gj.png');
$('#optical1_img').attr('src',eastcom.baseURL+'/static/styles/local-lsm/roam/images/Roam/gj1.png');
$('#optical2_img').attr('src',eastcom.baseURL+'/static/styles/local-lsm/roam/images/Roam/sj1.png');
$('#optical3_img').attr('src',eastcom.baseURL+'/static/styles/local-lsm/roam/images/Roam/moren.png');
$('#optical1_img_span').text("国际");
$('#optical2_img_span').text("省际");
var Html="";
var name="国际";
var bool_1=true;
var hotspot="J-国家会展中心";
var position_gj={1:{"top":60,"left":15,"img":"sh","name":"上海","text":"上海"},2:{"top":120,"left":15,"img":"ba","name":"保障区域","text":"进口博览会"},3:{"top":180,"left":15,"img":"hz","name":"国家会展中心","text":"J-国家会展中心"},4:{"top":240,"left":15,"img":"fj","name":"浦东机场","text":"J-浦东机场"},5:{"top":300,"left":15,"img":"fj","name":"虹桥机场","text":"J-虹桥机场"}};
for(var c=1;c<6;c++){
	if(c==3){
		Html+='<div id="optical_'+c+'" style="height: 50px;position: absolute;cursor:pointer; color:#00fcff; top:'+position_gj[c].top+'px;left:'+position_gj[c].left+'px" data-img="'+position_gj[c].img+'" data-name="'+position_gj[c].img+'" data-text="'+position_gj[c].text+'" data-optical="'+c+'" onclick="roamNavClick(this)"><img id="optical_'+c+'_img" src='+eastcom.baseURL+'/static/styles/local-lsm/roam/images/Roam/'+position_gj[c].img+'_bluce.png style="width: 30px;position: relative;top:10px"><div style="font-size:30px;padding-left:30px;top: -25px;position: relative;" id="optical_'+c+'_div">'+position_gj[c].name+'</div></div>';
	}else{
		Html+='<div id="optical_'+c+'" style="height: 50px;position: absolute;cursor:pointer;top:'+position_gj[c].top+'px;left:'+position_gj[c].left+'px" data-img="'+position_gj[c].img+'" data-name="'+position_gj[c].img+'" data-text="'+position_gj[c].text+'" data-optical="'+c+'" onclick="roamNavClick(this)"><img id="optical_'+c+'_img" src='+eastcom.baseURL+'/static/styles/local-lsm/roam/images/Roam/'+position_gj[c].img+'_white.png style="width: 30px;position: relative;top:10px"><div style="font-size:30px;padding-left:30px;top: -25px;position: relative;" id="optical_'+c+'_div">'+position_gj[c].name+'</div></div>';	
	}
}
document.getElementById("optical").innerHTML = Html;

if(window.location.href.indexOf('roamcentersvg')==-1&&isScreenMode!="true"){
	$('#roamCtrl').css('height','60px');
	$('#roamCtrl').show();
	$('#roamCtrl').on('mouseover',roamNavOver);
	$('#roamCtrl').on('mouseout',roamNavOut);
}
function roamNavOver(e){
	$('#roamCtrl').css('height','auto');
}
function roamNavOut(e){
	$('#roamCtrl').css('height','60px');
}
function BoolClick(e){
	 _name=$("#"+e.id).data("name");
	 if(_name!=name){
		 name=$("#"+e.id).data("name");
		 bool=$("#optical_img").data("bool");
		 this.dm=LSMScreen.DataManager.getInstance();
		 this.cdm=LSMScreen.CacheDataManager.getInstance();
		 if(bool==false){
			 $("#optical1_img").css('display','none');
			 $("#optical2_img").css('display','block');
			 $('#optical_img').attr('src',eastcom.baseURL+'/static/styles/local-lsm/roam/images/Roam/sj.png');
			 $("#optical_img").data("bool",true);
			 bool_1=true;
			 var Html="";
			 var position_sj={1:{"top":60,"left":15,"img":"sh","name":"上海","text":"上海"},
					 2:{"top":120,"left":15,"img":"ba","name":"保障区域","text":"进口博览会"},
					 3:{"top":180,"left":15,"img":"hz","name":"国家会展中心","text":"J-国家会展中心"},
					 4:{"top":240,"left":15,"img":"fj","name":"浦东机场","text":"J-浦东机场"},
					 5:{"top":300,"left":15,"img":"fj","name":"虹桥机场","text":"J-虹桥机场"},
					 6:{"top":360,"left":15,"img":"hc","name":"虹桥站","text":"J-虹桥站"},
					 7:{"top":420,"left":15,"img":"hc","name":"上海站","text":"J-上海站"},
					 8:{"top":480,"left":15,"img":"hc","name":"上海南站","text":"J-上海南站"}};
				 for(var c=1;c<9;c++){
					 if(hotspot==position_sj[c].text){
						 Html+='<div id="optical_'+c+'" style="height: 50px;position: absolute;cursor:pointer;color:#00fcff; top:'+position_sj[c].top+'px;left:'+position_sj[c].left+'px" data-img="'+position_sj[c].img+'" data-text="'+position_sj[c].text+'" data-name="'+position_sj[c].img+'" data-optical="'+c+'" onclick="roamNavClick(this)"><img id="optical_'+c+'_img" src='+eastcom.baseURL+'/static/styles/local-lsm/roam/images/Roam/'+position_sj[c].img+'_bluce.png style="width: 30px;position: relative;top:10px"><div style="font-size:30px;padding-left:30px;top: -25px;position: relative;" id="optical_'+c+'_div">'+position_sj[c].name+'</div></div>'; 
					 }else{
						 if(c!=t){
							 Html+='<div id="optical_'+c+'" style="height: 50px;position: absolute;cursor:pointer;top:'+position_sj[c].top+'px;left:'+position_sj[c].left+'px" data-img="'+position_sj[c].img+'" data-text="'+position_sj[c].text+'" data-name="'+position_sj[c].img+'" data-optical="'+c+'" onclick="roamNavClick(this)"><img id="optical_'+c+'_img" src='+eastcom.baseURL+'/static/styles/local-lsm/roam/images/Roam/'+position_sj[c].img+'_white.png style="width: 30px;position: relative;top:10px"><div style="font-size:30px;padding-left:30px;top: -25px;position: relative;" id="optical_'+c+'_div">'+position_sj[c].name+'</div></div>';
						}
					 }
				 }
			 $("#optical").empty();
			 document.getElementById("optical").innerHTML = Html; 
			 bool=true;
			 this.roamType='pro';
			 $('#chinaDiv').css('display','block');
			 $('#worldDiv').css('display','none');
		 }else if(bool==true){
			 $("#optical2_img").css('display','none');
			 $("#optical1_img").css('display','block');
			 $('#optical_img').attr('src',eastcom.baseURL+'/static/styles/local-lsm/roam/images/Roam/gj.png');
			 $("#optical_img").data("bool",false);
			 bool_1=false;
			 var Html=""; var t="";
			 for(var c=1;c<6;c++){
				 if(hotspot==position_gj[c].text){
					 t=c;
					 Html+='<div id="optical_'+c+'" style="height: 50px;position: absolute;cursor:pointer; color:#00fcff; top:'+position_gj[c].top+'px;left:'+position_gj[c].left+'px" data-img="'+position_gj[c].img+'" data-name="'+position_gj[c].img+'" data-text="'+position_gj[c].text+'" data-optical="'+c+'" onclick="roamNavClick(this)"><img id="optical_'+c+'_img" src='+eastcom.baseURL+'/static/styles/local-lsm/roam/images/Roam/'+position_gj[c].img+'_bluce.png style="width: 30px;position: relative;top:10px"><div style="font-size:30px;padding-left:30px;top: -25px;position: relative;" id="optical_'+c+'_div">'+position_gj[c].name+'</div></div>';
				 }else{
					 
				 } 
			 }
			 for(var c=1;c<6;c++){
				 if(c==3&&utils.isStringEmpty(t)){
					 hotspot="J-国家会展中心";this.roamType="intl";
					 Html+='<div id="optical_'+c+'" style="height: 50px;position: absolute;cursor:pointer; color:#00fcff; top:'+position_gj[c].top+'px;left:'+position_gj[c].left+'px" data-img="'+position_gj[c].img+'" data-name="'+position_gj[c].img+'" data-text="'+position_gj[c].text+'" data-optical="'+c+'" onclick="roamNavClick(this)"><img id="optical_'+c+'_img" src='+eastcom.baseURL+'/static/styles/local-lsm/roam/images/Roam/'+position_gj[c].img+'_bluce.png style="width: 30px;position: relative;top:10px"><div style="font-size:30px;padding-left:30px;top: -25px;position: relative;" id="optical_'+c+'_div">'+position_gj[c].name+'</div></div>';
				 }else{
					 if(c!=t){
						 Html+='<div id="optical_'+c+'" style="height: 50px;position: absolute;cursor:pointer;top:'+position_gj[c].top+'px;left:'+position_gj[c].left+'px" data-img="'+position_gj[c].img+'" data-text="'+position_gj[c].text+'" data-name="'+position_gj[c].img+'" data-optical="'+c+'" onclick="roamNavClick(this)"><img id="optical_'+c+'_img" src='+eastcom.baseURL+'/static/styles/local-lsm/roam/images/Roam/'+position_gj[c].img+'_white.png style="width: 30px;position: relative;top:10px"><div style="font-size:30px;padding-left:30px;top: -25px;position: relative;" id="optical_'+c+'_div">'+position_gj[c].name+'</div></div>'; 
					 }
				 }
			 }
			 $("#optical").empty();
			 document.getElementById("optical").innerHTML = Html; 
			 bool=false;
			 this.roamType='intl';
			 /*this.showAirRoam(true);*/
			 $('#chinaDiv').css('display','none');
			 $('#worldDiv').css('display','block');
			 /*this.update();
			 parent.updateRoamType(this.roamType);*/
		 }
		 updateByNav(hotspot,bool,this.roamType);
	 }
}
function roamNavClick(e){
	 var img=$(e).data("img");
	 var bool=bool_1;
	 var optical=$(e).data("optical");
	 var img=$(e).data("img");
	 var hot=$(e).data("text");
	 var roamType="";
	 var bool=false;
	 var hotspot="";
	 for(var c=1;c<9;c++){
		 $('#optical_'+c+'_img').attr('src',eastcom.baseURL+'/static/styles/local-lsm/roam/images/Roam/'+$('#optical_'+c).data("img")+'_white.png');
		 $('#optical_'+c+'_div').css('color',"#ffffff");
	 }
	 $('#optical_'+optical+'_img').attr('src',eastcom.baseURL+'/static/styles/local-lsm/roam/images/Roam/'+img+'_bluce.png');
	 $('#optical_'+optical+'_div').css('color',"#00fcff");
	 hotspot=hot;
	 if(bool==false){
		 roamType='pro';
	 }else{
		 roamType='intl';
	 }
	 updateByNav(hotspot,bool,roamType);
	 
}