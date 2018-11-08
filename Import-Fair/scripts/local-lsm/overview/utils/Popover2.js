var Popover2 = {
    popover: function(isStringEmpty, attribute, parameter) {
        var json = {};var Explain="";
    	if(Math.abs(parameter[isStringEmpty.id].Tparticle)>=1440){
        	json.time2 = pmars.getNowstrhourOfgetMinutes(isStringEmpty.time, 0, "-", ":").substring(5, 10);
            json.source = parameter[isStringEmpty.id].source;
            var html = '<div style="width:'+attribute.width+'px;height:'+attribute.height+'px !important;z-index:20;position: absolute;top:' + attribute.top1 + 'px;left:' + attribute.Left1 + 'px" class="' + attribute.rotate + '">';
            html += '<img src="' + attribute.img + '" style="width:100%;height:100%">';
            html += '<div style="position: absolute;top:' + attribute.top + 'px;font-size: 23px;left: ' + attribute.padding_left + 'px;    width: 250px;" class=' + attribute.rotate_span + '>';
            html += '<div style="margin-top: '+attribute.top2+'px;"><div ><span>时&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;间:</span><span style="color:#66E6FF;margin-left:10px"">' + json.time2 + '</span></div></div>';
            html += '<div style="margin-top: '+attribute.top3+'px;"><div ><span>数据来源:</span><span style="color:#66E6FF;margin-left: 10px;">' + json.source + '</span></div></div>';
            html += '</div></div>';
            document.getElementById("popover").innerHTML = html;
    	}else if(parameter[isStringEmpty.id].Tparticle<0){
    		json.time2 = pmars.getNowstrhourOfgetMinutes(isStringEmpty.time, (parameter[isStringEmpty.id].Tparticle) * -1, "-", ":").substring(11, 16);
        	json.time1 = (isStringEmpty.time).substring(11, 16);
            json.source = parameter[isStringEmpty.id].source;
            var html = '<div style="width:'+attribute.width+'px;height:'+attribute.height+'px !important;z-index:20;position: absolute;top:' + attribute.top1 + 'px;left:' + attribute.Left1 + 'px" class="' + attribute.rotate + '">';
            html += '<img src="' + attribute.img + '" style="width:100%;height:100%">';
            html += '<div style="position: absolute;top:' + attribute.top + 'px;font-size: 23px;left: ' + attribute.padding_left + 'px;    width: 250px;" class=' + attribute.rotate_span + '>';
            html += '<div style="margin-top: '+attribute.top2+'px;"><div ><span>时&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;间:</span><span style="color:#66E6FF;margin-left:10px"">' + json.time1 + '~' + json.time2 + '</span></div></div>';
            html += '<div style="margin-top: '+attribute.top3+'px;"><div ><span>数据来源:</span><span style="color:#66E6FF;margin-left: 10px;">' + json.source + '</span></div></div>';
            html += '</div></div>';
            document.getElementById("popover").innerHTML = html;
    	}else{
    		json.time1 = pmars.getNowstrhourOfgetMinutes(isStringEmpty.time, (parameter[isStringEmpty.id].Tparticle) * -1, "-", ":").substring(11, 16);
        	json.time2 = (isStringEmpty.time).substring(11, 16);
            json.source = parameter[isStringEmpty.id].source;
            var html = '<div style="width:'+attribute.width+'px;height:'+attribute.height+'px !important;z-index:20;position: absolute;top:' + attribute.top1 + 'px;left:' + attribute.Left1 + 'px" class="' + attribute.rotate + '">';
            html += '<img src="' + attribute.img + '" style="width:100%;height:100%">';
            html += '<div style="position: absolute;top:' + attribute.top + 'px;font-size: 23px;left: ' + attribute.padding_left + 'px;    width: 250px;" class=' + attribute.rotate_span + '>';
            html += '<div style="margin-top: '+attribute.top2+'px;"><div ><span>时&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;间:</span><span style="color:#66E6FF;margin-left:10px"">' + json.time1 + '~' + json.time2 + '</span></div></div>';
            html += '<div style="margin-top: '+attribute.top3+'px;"><div ><span>数据来源:</span><span style="color:#66E6FF;margin-left: 10px;">' + json.source + '</span></div></div>';
            html += '</div></div>';
            document.getElementById("popover").innerHTML = html;
    	}
    }

}
