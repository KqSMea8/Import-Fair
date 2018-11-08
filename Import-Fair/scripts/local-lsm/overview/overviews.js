var cdm = LSMScreen.CacheDataManager.getInstance();
var overviews = {
	init : function() {
		this.Weathers();
		this.Schedule();
	},
	Weathers:function(){
		cdm.getWeather({stat_time:utils.getNowDate("")}, function(Weather) {
			if(Weather.success){
				var Weather=Weather.data[0];
				if(!utils.isStringEmpty(Weather)){
					var weather_img=matching.weather(Weather.icon);
					$('#weather_img').attr('src',weather_img);
					$('#weather_text').text(Weather.condition);
					$('#temperature').text(Weather.temp+"℃");
	                $('#screenTitleTime_g').css("padding-right","300px");
			  }
			}else{
                $('#screenTitleTime_g').css("padding-right","0px");
			}
		});
	},
	Schedule:function(){
		cdm.getSchedule({}, function(Schedule) {
			if(Schedule.success){
				if(Schedule.data.length>0){
					var newarry=[];
					for(var d=0;d<Schedule.data.length;d++){
						newarry[d]=Schedule.data[d].msg_content;
					}
					 $(document).ready(function(){
			             $("#schedule").empty();
			                var sum=0;
			                var length=0;
			                for(var g=0;g<newarry.length;g++){
			                    var alarm = newarry[g]
			                    var divStr = "<span id='_schedule_"+g+"' class='icon-selector'>"+alarm+"</span><br/>";
			                    $("#_schedule").append(divStr);
			                };
			                $("#_schedule").css("white-space","nowrap");
			                $("#_schedule").css("overflow","hidden");
			                $("#_schedule").css("width","0px");
			                $("#_schedule").css("height","0px");
			                for(var g=0;g<newarry.length;g++){
			                    var alarm = newarry[g]
			                    var divStr = "<span id='_schedule_s_"+g+"' class='icon-selector'>"+alarm+"</span><br/>";
			                    $("#_schedule_s").append(divStr);
			                };
			                $("#_schedule_s").css("white-space","nowrap");
			                $("#_schedule_s").css("overflow","hidden");
			                $("#_schedule_s").css("width","0px");
			                $("#_schedule_s").css("height","0px");
			                for(var i=0;i<newarry.length;i++){
			                    var alarm = newarry[i];
			                    var divStr = "<div id='contentItem_"+i+"' class='contentItem' style='cursor:pointer;'><img id='rcap_img' src='"+eastcom.baseURL+"/static/styles/local-lsm/ciie/images/rcap.png' style='width:36px;margin-top:-5px;margin-right:10px;'><span>"+alarm+"</span></div>";
			                    $("#schedule").append(divStr);
			                    var boxWidth=$("#_schedule_"+i).width()+150;     
			                    sum+=boxWidth;
			                    var boxWidths=$("#_schedule_s_"+i).width()+150;  
			                    length+=boxWidths;
			                };
			                var v=30;
			                var b=-5;
		                    var time=length/65;
	                    	$(".scrollBox").css({"animation-duration":time+"s"},{"-moz-animation-duration":time+"s"},{"-webkit-animation-duration":time+"s"});
			                $(".scrollBox").width(sum);  
			                $("div:[data-name='scrollBoxs']").width(length);
			                var width = $(".scrollBox").width();      
			                var widths = $("div:[data-name='scrollBoxs']").width(); 
			                $(".scrollBox").css({"marginLeft":-width});
			                $("div:[data-name='scrollBoxs']").css({"marginLeft":-widths});
			                $("div:[data-name='scrollBoxs'] div img").css({"marginTop":b});
			                $("div:[data-name='scrollBoxs'] div img ").width(v);
			                $(".scrollBox").addClass("scroll");
			                $("#_schedule").empty();
			                $("#_schedule_s").empty();
			                $('#screenTitleTime').css("padding-right","800px");
							$('.titleTime_s div:[id="screenTitleTime"]').css("padding-right","750px");
							$('.screentitle_roam div:[class="titleTime"] div:[id="screenTitleTime"]').css("text-indent","2200px");
				    });
				}else{
					$('#screenTitleTime').css("padding-right","0px");
					$('.screentitle_roam div:[class="titleTime"] div:[id="screenTitleTime"]').css("text-indent","2600px");
				}
			}
		});
	}
}