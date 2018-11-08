var oUl= document.getElementById("ul1");
var aLi = oUl.getElementsByTagName("li");
var disX = 0;
var disY = 0;
var minZindex = 1;
var aPos =[];
var fileWidth=200;
var fileHeight=150;

function iframeLoad() {  
	window.location.reload();
}
function subimtBtn() {  
	var fileInput=document.getElementById("file");
	if(fileInput.value==""){
		alert("请先选择要上传的文件");
		return;
	}else{
		var form=document.getElementById("fileUploader");
		showLoadBar(true);
		form.submit();
	}
}  
//原move.js脚本
//通过class获取元素
function getClass(cls){
  var ret = [];
  var els = document.getElementsByTagName("*");
  for (var i = 0; i < els.length; i++){
      //判断els[i]中是否存在cls这个className;.indexOf("cls")判断cls存在的下标，如果下标>=0则存在;
      if(els[i].className === cls || els[i].className.indexOf("cls")>=0 || els[i].className.indexOf(" cls")>=0 || els[i].className.indexOf(" cls ")>0){
          ret.push(els[i]);
      }
  }
  return ret;
}
function getStyle(obj,attr){//解决JS兼容问题获取正确的属性值
	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj,false)[attr];
}
function startMove(obj,json,fun){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var isStop = true;
		for(var attr in json){
			var iCur = 0;
			//判断运动的是不是透明度值
			if(attr=="opacity"){
				iCur = parseInt(parseFloat(getStyle(obj,attr))*100);
			}else{
				iCur = parseInt(getStyle(obj,attr));
			}
			var ispeed = (json[attr]-iCur)/8;
			//运动速度如果大于0则向下取整，如果小于0想上取整；
			ispeed = ispeed>0?Math.ceil(ispeed):Math.floor(ispeed);
			//判断所有运动是否全部完成
			if(iCur!=json[attr]){
				isStop = false;
			}
			//运动开始
			if(attr=="opacity"){
				obj.style.filter = "alpha:(opacity:"+(json[attr]+ispeed)+")";
				obj.style.opacity = (json[attr]+ispeed)/100;
			}else{
				obj.style[attr] = iCur+ispeed+"px";
			}
		}
		//判断是否全部完成
		if(isStop){
			clearInterval(obj.timer);
			if(fun){
				fun();
			}
		}
	},30);
}

function initLisEvent(){
	for(var i=0;i<aLi.length;i++){
		var t = aLi[i].offsetTop;
		var l = aLi[i].offsetLeft;
		aLi[i].style.top = t+"px";
		aLi[i].style.left = l+"px";
		aPos[i] = {left:l,top:t};
		aLi[i].index = i;
	}
	for(var i=0;i<aLi.length;i++){
		aLi[i].style.position = "absolute";
		aLi[i].style.margin = 0;
		setDrag(aLi[i]);
	}
}

//拖拽
function setDrag(obj){
	
	////////////////////鼠标事件
	document.ontouchmove=function(event){
		event.preventDefault();
		var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
		var scrollLeft = document.documentElement.scrollLeft||document.body.scrollLeft;
		//当鼠标拖动时计算div的位置
		var l = event.clientX -disX +scrollLeft;
		var t = event.clientY -disY + scrollTop;
		obj.style.left = l + "px";
		obj.style.top = t + "px";
		/*for(var i=0;i<aLi.length;i++){
			aLi[i].className = "";
			if(obj==aLi[i])continue;//如果是自己则跳过自己不加红色虚线
			if(colTest(obj,aLi[i])){
				aLi[i].className = "active";
			}
		}*/
		for(var i=0;i<aLi.length;i++){
			aLi[i].className = "";
		}
		var oNear = findMin(obj);
		if(oNear){
			oNear.className = "active";
		}
	}
	
	document.ontouchend = function(){
		event.preventDefault();
		document.ontouchmove = null;//当鼠标弹起时移出移动事件
		document.ontouchend = null;//移出up事件，清空内存
		//检测是否普碰上，在交换位置
		var oNear = findMin(obj);
		if(oNear){
			oNear.className = "";
			oNear.style.zIndex = minZindex++;
			obj.style.zIndex = minZindex++;
			startMove(oNear,aPos[obj.index]);
			startMove(obj,aPos[oNear.index]);
			//交换index
			oNear.index += obj.index;
			obj.index = oNear.index - obj.index;
			oNear.index = oNear.index - obj.index;
		}else{

			startMove(obj,aPos[obj.index]);
		}
	}
	
	//////////////////手机触控事件
	
	function documentTouchMove(event){
		if (event.targetTouches.length == 1) {
			event.preventDefault();
			var touch = event.targetTouches[0];
			var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
			var scrollLeft = document.documentElement.scrollLeft||document.body.scrollLeft;
			//当鼠标拖动时计算div的位置
			var l = touch.pageX -disX +scrollLeft;
			var t = touch.pageY -disY + scrollTop;
			obj.style.left = l + "px";
			obj.style.top = t + "px";
			/*for(var i=0;i<aLi.length;i++){
				aLi[i].className = "";
				if(obj==aLi[i])continue;//如果是自己则跳过自己不加红色虚线
				if(colTest(obj,aLi[i])){
					aLi[i].className = "active";
				}
			}*/
			for(var i=0;i<aLi.length;i++){
				aLi[i].className = "";
			}
			var oNear = findMin(obj);
			if(oNear){
				oNear.className = "active";
			}
		}
	}
	
	function documentTouchEnd(){
		document.removeEventListener('touchmove',documentTouchMove);
		document.removeEventListener('touchend',documentTouchEnd)
		//检测是否普碰上，在交换位置
		var oNear = findMin(obj);
		if(oNear){
			oNear.className = "";
			oNear.style.zIndex = minZindex++;
			obj.style.zIndex = minZindex++;
			startMove(oNear,aPos[obj.index]);
			startMove(obj,aPos[oNear.index]);
			//交换index
			oNear.index += obj.index;
			obj.index = oNear.index - obj.index;
			oNear.index = oNear.index - obj.index;
		}else{

			startMove(obj,aPos[obj.index]);
		}
	}
	
	obj.addEventListener('touchmove',function(){
		obj.style.cursor = "move";
	});
	obj.addEventListener('touchstart',function(event){
		if (event.targetTouches.length == 1) {
//			event.preventDefault();
			var touch = event.targetTouches[0];
			var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
			var scrollLeft = document.documentElement.scrollLeft||document.body.scrollLeft;
			obj.style.zIndex = minZindex++;
			//当鼠标按下时计算鼠标与拖拽对象的距离
			disX = touch.pageX +scrollLeft-obj.offsetLeft;
			disY = touch.pageY +scrollTop-obj.offsetTop;
			document.addEventListener('touchmove',documentTouchMove);
			document.addEventListener('touchend',documentTouchEnd)
			clearInterval(obj.timer);
			return false;//低版本出现禁止符号
		}
	});
	
}
//碰撞检测
function colTest(obj1,obj2){
	var t1 = obj1.offsetTop;
	var r1 = obj1.offsetWidth+obj1.offsetLeft;
	var b1 = obj1.offsetHeight+obj1.offsetTop;
	var l1 = obj1.offsetLeft;

	var t2 = obj2.offsetTop;
	var r2 = obj2.offsetWidth+obj2.offsetLeft;
	var b2 = obj2.offsetHeight+obj2.offsetTop;
	var l2 = obj2.offsetLeft;

	if(t1>b2||r1<l2||b1<t2||l1>r2){
		return false;
	}else{
		return true;
	}
}
//勾股定理求距离
function getDis(obj1,obj2){
	var a = obj1.offsetLeft-obj2.offsetLeft;
	var b = obj1.offsetTop-obj2.offsetTop;
	return Math.sqrt(Math.pow(a,2)+Math.pow(b,2));
}
//找到距离最近的
function findMin(obj){
	var minDis = 999999999;
	var minIndex = -1;
	for(var i=0;i<aLi.length;i++){
		if(obj==aLi[i])continue;
		if(colTest(obj,aLi[i])){
			var dis = getDis(obj,aLi[i]);
			if(dis<minDis){
				minDis = dis;
				minIndex = i;
			}
		}
	}
	if(minIndex==-1){
		return null;
	}else{
		return aLi[minIndex];
	}
}	
//接口相关代码
function getSavedFiles(){
	var _url=LSMConsts.serviceUrl+"/FileManager?opt=list";
	SUtils.crossSafeAjax({
  		type:"GET",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result_) 
  		{
  			var arr=result_;
  			showLoadBar(false);
  			createLis(arr);
  		},
  		error:function(){
  			console.log("文件列表请求失败");
  		}
	});
}
function createLis(arr){
	arr.sort(function(a,b){return a.order-b.order;});//按order 升序
	for(var i=0;i<arr.length;i++){
		var record=arr[i];
		createLiDom(i+1,record.file,record.show);
	}
	initLisEvent();
}
function createLiDom(index,fileName,show){
	var li=document.createElement("li");
	li.fileName=fileName;
	var checked="";
	if(show=="true"){
		checked='checked="checked"';
	}
	var fileNode=SUtils.getFileNode(fileName,fileWidth,fileHeight,false);
	
	$(li).html(
			fileNode
			+'<span style="color:white;font-weight:bold;font-size:24px;position:absolute;top:5px;left:5px;">'+index+'</span>'
			+'<input type="checkbox" style="position:absolute;top:10px;right:5px;" '+checked+'/>'
			+'<div class="deleteIcon" onclick="deleteFile('+index+',\''+fileName+'\')"/>'
	);
	$("#ul1").append(li);
}
function deleteFile(index,fileName){
	if (confirm("确认要删除编号"+index+"的文件吗？")) { 
		showLoadBar(true);
		var _url=LSMConsts.serviceUrl+"/FileManager?opt=delete&fileName="+fileName;
		SUtils.crossSafeAjax({
	  		type:"GET",
	  		async:false,
	  		dataType:"application/json",
	  		contentType:"application/json",
	  		processData:false,
	  		url:encodeURI(_url),
	  		success : function(result_) 
	  		{
	  			iframeLoad();
	  		},
	  		error:function(){
	  			console.log("文件列表请求失败");
	  		}
		});
    } 
}
function saveOrder(){
	showLoadBar(true);
	var oUl= document.getElementById("ul1");
	var aLi = oUl.getElementsByTagName("li");
//	var order="";
	var list=[];
	for(var i=0;i<aLi.length;i++){
		var index=aLi[i].index+"";
		var fileName=aLi[i].fileName+"";
		var show=$(aLi[i]).find("input[type='checkbox']").is(':checked')+"";
		list.push({order:index,file:fileName,show:show});
//		order+=aLi[i].index+",";
	}
//	alert(order);
	
	var _url=LSMConsts.serviceUrl+"/FileManager?opt=reorder";
	SUtils.crossSafeAjax({
  		type:"POST",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		data:JSON.stringify(list),
  		success : function(result_) 
  		{
  			var parentWindow=window.parent.window?window.parent.window:window.parent.contentWindow;
  			parentWindow.reorderFiles();
  			iframeLoad();
  		},
  		error:function(){
  			console.log("重新排序接口请求失败");
  		}
	});
}
function showLoadBar(show){
	var mask=document.getElementById("mask");
	if(show){
		mask.style.display="block";
	}else{
		mask.style.display="none";
	}
}
function initPage(){//iframeLoad
	$("#fakeFrame").on("load",iframeLoad);
	$("#fileUploader").attr("action",LSMConsts.serviceUrl+"/FileManager?opt=upload");
	getSavedFiles();
}
(function(){
	initPage();
}());