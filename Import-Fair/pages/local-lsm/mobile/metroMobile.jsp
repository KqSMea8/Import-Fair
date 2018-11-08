<!DOCTYPE HTML>
<html>
  
  <head>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%
String isScreenMode = request.getParameter("isScreenMode");
String basePath=request.getRequestURL().substring(0,request.getRequestURL().indexOf("/", 7));
String baseIp=basePath.split("//")[1].split(":")[0];
%>
   <style>
   	tspan{
   		fill:#ffffff;
   	}
   	.transparentObj{  
	      filter:alpha(opacity=30);  
	      -moz-opacity:0.3;  
	      -khtml-opacity: 0.3;  
	      opacity: 0.3;  
	}   
	.legend {
		margin-left:10px;
		display:inline-block;
		cursor:pointer;
		font-weight:bold;
	    font-size:24px;
	    line-height:36px;
	    text-align:center;
	}
	.circleLegend {
	    width: 36px;
	    height: 36px;
	    -moz-border-radius: 18px;
	    -webkit-border-radius: 18px;
	    border-radius: 18px;
	}
	
	.indicators {
		    display: block;
		    width: 180px;
		    height: 92px;
		    position: relative;
		}
		.timeSpan{
			font-size:36px;
			font-weight:bold;
			color:#ffffff;
			cursor:pointer;
			margin-left:8px;
		}
		.kpiSpan{
			font-size:18px;
			font-weight:bold;
			color:#ffffff;
			cursor:pointer;
			margin-left:8px;
		}
		.kpiSpanSelected{
			text-decoration: underline;
		}
		
		.ctrlBtn{
			width:48px;
			height:48px;
			cursor:pointer;
			display:inline-block;
		}
		
		.zoomBtn{
			width:48px;
			height:48px;
			cursor:pointer;
			display:inline-block;
		}
		.toFullScreen{
			background: url(resource/fullscreen.png) center 0px no-repeat;
		}
		.toNormal{
			background: url(resource/normal.png) center 0px no-repeat;
		}
		
		.play{
			background: url(resource/play.png) center 0px no-repeat;
		}
		.pause{
			background: url(resource/pause.png) center 0px no-repeat;
		}
   </style>
    <script type="text/javascript">
    var baseIp="<%=baseIp%>";
    void
      function(e, n, t, o, i, a, c) {
        e.alogObjectName = i,
        e[i] = e[i] ||
        function() { (e[i].q = e[i].q || []).push(arguments)
        },
        e[i].l = e[i].l || +new Date,
        a = n.createElement(t),
        a.async = !0,
        a.src = o,
        c = n.getElementsByTagName(t)[0],
        c.parentNode.insertBefore(a, c)
      } (window, document, "script", "./hunter/alog/alog.mobile.min.js", "alog"),
      void
      function() {
        function e() {}
        window.PDC = {
          mark: function(e, n) {
            alog("speed.set", e, n || +new Date),
            alog.fire && alog.fire("mark")
          },
          init: function(e) {
            alog("speed.set", "options", e)
          },
          view_start: e,
          tti: e,
          page_ready: e
        }
      } (),
      void
      function(e) {
        var n = !1;
        e.onerror = function(e, t, o, i) {
          var a = !0;
          return ! t && /^script error/i.test(e) && (n ? a = !1 : n = !0),
          a && alog("exception.send", "exception", {
            msg: e,
            js: t,
            ln: o,
            col: i
          }),
          !1
        },
        alog("exception.on", "catch",
        function(e) {
          alog("exception.send", "exception", {
            msg: e.msg,
            js: e.path,
            ln: e.ln,
            method: e.method,
            flag: "catch"
          })
        })
      } (window);</script>
    <script type="text/javascript">var c_t0 = +new Date,
      c_srt0 = 1472712866111 || 0;</script>
    <meta charset="utf-8" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
    <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" media="(device-height: 568px)" />
    <meta name="format-detection" content="telephone=no" searchtype="map">
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <meta name="baidu-tc-cerfication" content="ef2982c3430a61a4c8620d5e47f8b968" />
    <link rel="apple-touch-startup-image" href="./simple/static/common/images/startup_320_460_96280c8.jpg" />
    <link rel="apple-touch-icon-precomposed" href="./simple/static/common/images/logo_0800ec5.png" />
    <title>百度地图</title>
    <style>em{font-style:normal;display:inline-block;text-align:center}::-ms-clear{display:none}::-ms-reveal{display:none}.star-box{display:inline-block;height:15px;width:75px;background:url(./simple/static/common/images/new_star_a9ede79.png) repeat-x 0 0;background-size:15px 33px;font-size:14px;vertical-align:middle}.star-box .star-scroe{display:inline-block;height:15px;background:url(./simple/static/common/images/new_star_a9ede79.png) repeat-x 0 -19px;background-size:15px 33px}#wrapper{position:relative}.common-widget-popup{position:fixed;max-width:196px;display:block;padding:11px 27px;background-color:#FFF;border-radius:2px;color:#000;font-size:14px;text-align:center;margin:0 auto;z-index:9999;-webkit-box-shadow:1px 1px 2px rgba(0,0,0,.4)}</style>
    <style type="text/css">@charset "UTF-8";*{-webkit-tap-highlight-color:transparent}.styleguide,.styleguide *{box-sizing:border-box;-webkit-box-sizing:border-box}blockquote,body,dd,dl,dt,fieldset,form,h1,h2,h3,h4,menu,ol,p,q,ul{margin:0;padding:0}ol,ul{list-style:none}a,button,input{outline:0}a{color:inherit;text-decoration:none}a:focus,a:hover,a:visited{text-decoration:none;outline:0}a:active,a:hover{outline:0}html{-webkit-text-size-adjust:100%}body{margin:0}small{font-size:80%}pre{overflow:auto}button,input,optgroup,select,textarea{color:inherit;font:inherit;margin:0}button,html input[type=button],input[type=reset],input[type=submit]{-webkit-appearance:button}fieldset{border:1px solid silver;margin:0 2px;padding:.35em .625em .75em}table{border-collapse:collapse;border-spacing:0}td,th{padding:0}body{background:#011925;color:#ffffff;font-size:14px;font-family:Helvetica,Arial,"Helvetica Neue","Droid Sans","Heiti SC","Microsoft YaHei",sans-serif}p{line-height:20px}.-bg-lighter{background-color:#fff!important}.-bg-normal{background-color:#011925!important}.-bg-light{background-color:#f9f9f9!important}.-bg-dark{background-color:#eaeaea!important}.-bg-darker{background-color:#000!important}.-bg-brand{background-color:#6bb1f7!important}.-bg-alert{background-color:#ff3a2b!important}.-bg-transparent{opacity:.8!important}.-shadow-card{-webkit-box-shadow:0 2px 1px -1px rgba(0,0,0,.2)!important}.-shadow-dialog{-webkit-box-shadow:2px 2px 7px rgba(0,0,0,.4)!important}.-ft-small{font-size:12px!important}.-ft-base{font-size:14px!important}.-ft-middle{font-size:15px!important}.-ft-large{font-size:16px!important}.-ft-alert{color:#ff3a2b!important}.-ft-brand{color:#4b8ff9!important}.-ft-primary{color:#ffffff!important}.-ft-secondary{color:#555!important}.-ft-tertiary{color:#848484!important}.-ft-fourth{color:#cfcfcf!important}.-ft-fifth{color:#fff!important}.-spacing-small{margin-bottom:5px!important}.-spacing-base{margin-bottom:10px!important}.-spacing-large{margin-bottom:15px!important}.-border-round{-webkit-border-radius:3px;border-radius:3px}.-clearfix:after,.-clearfix:before,.clearfix:after,.clearfix:before{display:table;content:" "}.-clearfix:after,.clearfix:after{clear:both}.-vcenter:before{content:"";display:inline-block;height:100%;vertical-align:middle;margin-right:-4px}.-hcenter{margin-left:auto;margin-right:auto;text-align:center}.btn-group,.flex-row,.row{width:100%;-webkit-box-align:center;display:-webkit-box!important;display:-webkit-flex!important;-webkit-align-items:center}.-align-top.btn-group,.-align-top.flex-row,.row.-align-top{-webkit-box-align:start;-webkit-align-items:flex-start}.btn-group>*,.flex-row>*,.row>*{display:block!important;-webkit-box-flex:1;-webkit-flex:1}.btn-group>.-col-auto,.flex-row>.-col-auto,.row>.-col-auto{display:block!important;-webkit-box-flex:0;-webkit-flex:0 0 auto}.-col1{-webkit-box-flex:0!important;-webkit-flex:none!important;width:8.33333%!important}.-col2{-webkit-box-flex:0!important;-webkit-flex:none!important;width:16.66667%!important}.-col3{-webkit-box-flex:0!important;-webkit-flex:none!important;width:25%!important}.-col4{-webkit-box-flex:0!important;-webkit-flex:none!important;width:33.33333%!important}.-col5{-webkit-box-flex:0!important;-webkit-flex:none!important;width:41.66667%!important}.-col6{-webkit-box-flex:0!important;-webkit-flex:none!important;width:50%!important}.-col7{-webkit-box-flex:0!important;-webkit-flex:none!important;width:58.33333%!important}.-col8{-webkit-box-flex:0!important;-webkit-flex:none!important;width:66.66667%!important}.-col9{-webkit-box-flex:0!important;-webkit-flex:none!important;width:75%!important}.-col10{-webkit-box-flex:0!important;-webkit-flex:none!important;width:83.33333%!important}.-col11{-webkit-box-flex:0!important;-webkit-flex:none!important;width:91.66667%!important}.-col12{-webkit-box-flex:0!important;-webkit-flex:none!important;width:100%!important}.card,.container{display:block;padding:10px;overflow:hidden}.card.-large,.container.-large{padding:15px 10px}.card.-compacted,.container.-compacted{padding:0 10px}.card.-lighter,.container.-lighter{background-color:#fff;color:#ffffff}.card.-light,.container.-light{background-color:#f9f9f9;color:#ffffff}.card.-normal,.container.-normal{background-color:#011925;color:#ffffff}.card.-dark,.container.-dark{background-color:#eaeaea;color:#ffffff}.container.-border{border-bottom:#d4d4d4 solid 1px}.card{border:1px solid #d4d4d4;-webkit-border-radius:3px;border-radius:3px}.btn{border:1px solid #d4d4d4;padding:0 10px;color:inherit;background-color:inherit}.btn:active{background-color:#e5e5e5}.btn,.btn.-large{height:44px;min-width:44px;font-size:15px}.btn.-small{height:36px;min-width:36px;font-size:14px}.btn.-mini{height:30px;min-wdith:30px;font-size:12px;padding:0 5px}.btn.-lighter{color:#ffffff;background-color:#fff}.btn.-lighter:active{background-color:#011925}.btn.-light{color:#ffffff;background-color:#f9f9f9}.btn.-light:active{background-color:#ececec}.btn.-brand{color:#fff;background-color:#6bb1f7;border-color:#6bb1f7}.btn.-brand:active{background-color:#53a4f6;border-color:#53a4f6}.btn.-alert{color:#fff;background-color:#ff3a2b;border-color:#ff3a2b}.btn.-alert:active{background-color:#ff2212;border-color:#ff2212}.btn.-flat{border:0}.btn.-flat:active{background-color:inherit;opacity:.2}a.btn{display:inline-block;text-align:center;overflow:hidden}a.btn:before{content:"";display:inline-block;height:100%;vertical-align:middle;margin-right:0;margin-top:.3em}.btn-group .btn:not(:last-child){border-right:0;border-top-right-radius:0;border-bottom-right-radius:0}.btn-group .btn:not(:first-child){border-top-left-radius:0;border-bottom-left-radius:0}.btn-group.-flat{border-top:#d4d4d4 solid 1px;border-bottom:#d4d4d4 solid 1px}.btn-group.-flat .btn{border:0;border-radius:0;position:relative}.btn-group.-flat .btn:after{content:"";display:block;position:absolute;right:0;height:16px;width:1px;background-color:#d4d4d4;top:50%;margin-top:-.5em}.btn-group.-flat .btn:last-child:after{width:0}input[type=text],select{-webkit-border-radius:0;-webkit-appearance:none;border:0}.input-text{font-size:14px;border:1px solid #d4d4d4;position:relative}.input-text input[type=text]{width:100%;padding:8px}.input-text.-icon>.icon{position:absolute;top:50%;margin-top:-10px;left:6px;font-size:16px}.input-text.-icon input[type=text]{padding-left:30px}.input-text.-brand{border-color:#6bb1f7}.input-text.-alert{border-color:#ff3a2b}.input-group{position:relative;width:100%;display:-webkit-box;-webkit-box-pack:start}.input-group .input-text{-webkit-box-flex:1}.input-group .btn:first-child{border-right:0}.input-group .btn:last-child{border-left:0}.input-group .btn,.input-group .input-text{height:38px}.select-box{height:30px;font-size:14px;border:1px solid #d4d4d4;display:inline-block;position:relative}.select-box select{display:inline-block;height:100%;width:100%;padding-right:30px;padding-left:3px;background-color:#fff}.select-box:after{display:inline-block;font-family:mwa;content:"\e61b";-webkit-font-smoothing:antialiased;color:#848484;position:absolute;font-size:12px;right:3px;top:50%;margin-top:-8px;pointer-events:none}.wa-label{padding:0
      4px;height:24px;line-height:24px;min-width:24px;border-radius:2px;color:#fff;background-color:#eaeaea;display:inline-block;text-align:center}.wa-label.-small{padding:0 2px;height:16px;line-height:16px;min-width:16px}.wa-label.-large{padding:0 8px;height:30px;line-height:30px;min-width:30px}ul.tab{margin:0;padding:0;width:100%;display:table;table-layout:fixed}ul.tab>li{display:table-cell;position:relative;border-bottom:#d4d4d4 solid 1px;font-size:15px;text-align:center;line-height:1}ul.tab>li:before{content:"";display:block;position:absolute;left:0;height:16px;width:1px;background-color:#d4d4d4;top:50%;margin-top:-.5em}ul.tab>li.active{border-bottom:0;color:#4b8ff9;background-color:#d1dcef}ul.tab>li.active+li:before,ul.tab>li.active:before{width:0;height:0}ul.tab>li:first-child:before{width:0}ul.tab>li>a{height:50px;display:block}ul.tab>li>a:active{background-color:#d1dcef}ul.tab>li>a:before{content:"";display:inline-block;height:100%;vertical-align:middle;margin-right:-4px;margin-top:.3em}.common-widget-hideoverlay{width:100%;position:fixed;height:100%;top:0;left:0;background:#011925}.common-widget-nav.fixshake{top:-1px}.common-widget-nav{height:50px;position:relative;text-align:center;z-index:999}.common-widget-nav .btn{position:absolute}.common-widget-nav .btn:first-child{top:0;left:0}.common-widget-nav .btn:last-child{width:64px;top:10px;right:0;border-left:#d4d4d4 solid 1px;font-size:14px}.common-widget-nav .back-btn{width:50px;height:50px;font-size:14px;padding:0}.common-widget-nav .title{display:inline-block;vertical-align:middle;width:100%}.common-widget-nav .title span{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin:0 60px}.common-widget-nav.nav-slide{top:0;-webkit-transition:top .4s;-moz-transition:top .4s;-o-transition:top .4s;transition:top .4s}.common-widget-nav .exit{position:absolute;width:50px;height:50px;z-index:10;top:0;left:0}.common-widget-nav .drive_sy_select{display:block;width:50px;height:32px;line-height:32px;color:#3385ff;border:1px solid #cbcdcf;position:absolute;right:10px;top:50%;margin-top:-16px;background-color:#F6F6F6}#subway-holder{width:100%;height:100%;background-color:#fff;overflow:hidden;-webkit-tap-highlight-color:rgba(0,0,0,0)}#swZoomControl{-webkit-user-select:none}.block_zoom_btn{display:-webkit-box;-webkit-box-align:center;-webkit-box-pack:center;-webkit-box-sizing:border-box;height:35px;width:35px;background:rgba(255,255,255,.8)}.block_zoom_out_btn{position:fixed;top:120px;right:10px;z-index:10;-webkit-box-shadow:1px 1px 2px rgba(0,0,0,.4)}.block_zoom_in_btn{position:fixed;top:85px;right:10px;z-index:10;-webkit-box-shadow:1px 0 2px rgba(0,0,0,.4)}.inline_zoom_btn{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAAkCAYAAABYFB7QAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAmFJREFUeNrsW81OwkAQ3paCgEDTxHiiT+CtvoQmHjxAoidPIsRnkIPv4M/NeOUEMfEx+hScDImBA0bDjzPERCXZBXbX7YLzJRNalnRn5mO3s/u1znQ6ZSLUG01eUxXsFmxn7vsXsBpYB0/u766ZCqB/Xj+mMYsL4un8/DKOY9nrLZW/RYii6Ne5K+mMk0qlHjhJ3vU871FXFgX9mIbOuBwAN3/QJt2PFKE46sbj8TavfTQa+bqyKOrHNHTFhaMKZkZuXNDmGyUUpsEpI0gDpuk/y59L6d0sEKFEqFkUC9bcQlkQlKwn1LPdwZPTo0Gr9Vx6f/9grpvM/28ymbBcLsuqlYMeEaqI/WjvDOwGDgtY9CbkRgqsD3ZJhCoCKuo2fLST6l91Y4TuoQQilLBGU27t/JhYohH6f+Fc1K+sVjNsRxzHVuXP3VA1w9yI4KsmxvOHKo27iWqGSYhUkwR88ekeSkURgQglmCOU1AzFhbxnz1I+nU4zT1bNGA7fhO35fG7pa62TmjGPMAz73W7XxxhWARSjwnZYfax0Pfx9uVzuOVAZ4VbMympGvdEMRO2wnnxdxR/2rWY8rRmnUvmD9aswf1EUSeXPUXiMc9FzMc4XsVqzJ/DHCObjUXiMc6n8LYKuxzgJVOUSjBRp6+YwqS80QmmE2gTb1Ay25DsnNEJ5pZ5lagZNuYqwTc0gQglEKME8oQ6lTq00sIpQ3P4SqTQ6VRPb1AwdwO06UVwq/Ui/H4oqje8XWTa7NVNW0PA4CHxWrRxqU03CMBxggKgmJGmZTAZ90RIXvh/Ki0u1n08BBgAwZsB35lPMnAAAAABJRU5ErkJggg==) 0 0 no-repeat;-webkit-background-size:50px 15px}.inline_zoom_in{width:16px;height:16px;background-position:0 0}.inline_zoom_out{width:16px;height:6px;background-position:-17px 0}.disable_zoom_btn{opacity:.53}.disable_zoom_btn .inline_zoom_in{background-position:-34px 0}.disable_zoom_btn .inline_zoom_out{background-position:-17px -12px}.zoom_btn_tap{background-color:#fafaf9;opacity:.85;border:1px solid #75b4e0;z-index:11}#sw_pw{display:none;z-index:7;position:absolute;left:0;top:0;width:225px;text-align:center;line-height:28px;-webkit-box-sizing:border-box;background-color:rgba(0,0,0,.8);border:.3em solid transparent;border-style:none solid solid;border-radius:2px;-webkit-border-radius:2px;-webkit-box-shadow:2px 2px 7px rgba(0,0,0,.3)}#sw_pw:after{content:"";position:absolute;width:0;height:0;left:50%;bottom:-12px;margin:0 0 0 -6px;border-left:5px solid transparent;border-top:8px solid rgba(0,0,0,.8);border-right:5px solid transparent}#sw_pw .sw-pw-title{position:relative;width:100%;height:46px;line-height:46px;color:#fff}#sw_pw ul li{height:100%}#sw_pw .sw-pw-tc{width:100%}#sw_pw .sw-pw-tl,#sw_pw .sw-pw-tr{position:absolute;top:0;width:41px;color:#747474}#sw_pw .sw-pw-tl{left:0;border-right:1px solid rgba(255,255,255,.2);background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAlCAYAAAAuqZsAAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ bWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6 eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEz NDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv IiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RS ZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpD cmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNl SUQ9InhtcC5paWQ6QjA3NjMyREJDNzQ2MTFFMTlBQUM5QzlCRDZGODZCQkYiIHhtcE1NOkRvY3Vt ZW50SUQ9InhtcC5kaWQ6QjA3NjMyRENDNzQ2MTFFMTlBQUM5QzlCRDZGODZCQkYiPiA8eG1wTU06 RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCMDc2MzJEOUM3NDYxMUUxOUFB QzlDOUJENkY4NkJCRiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCMDc2MzJEQUM3NDYxMUUx OUFBQzlDOUJENkY4NkJCRiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1w bWV0YT4gPD94cGFja2V0IGVuZD0iciI/PllB9T8AAAKuSURBVHjaxFjRcdpAEAX+mVEqiFxB5AoQ HZAKElcArsBWBSgVQCoAVwCuwEoFlivwGQpI7jKrzGXn7ep0EsPO7BjLp/O73bdv9xifTqdRpCXW c+sz65n1lNy3mvzZemX9aN34C6bTKdx8HAHMgVlaX0QeaGv9J4EcBJgD9EA/hzAH7N4Cq/oAW1tf KX+vKEXP7PlMSLFvhQX32BWY49GBOIRO7FKy57wBlnoUQHu5yJX+g4mymdvgFWzkAM3JtwGgmiJw a2/pvQoEYBQCLKNI8RfuaeNjT245gAUdqgHdmkqUPiOctLdJVYkithkAVO/K5cC+M30KAZVSxboo /ybnn1eIR5r5qUyI7P4GX6nqJHskbQsxQ7wqu6aSn2qrgHLrXjqAat5ZC0WlRuzVE0J3uhtBCjRt a3qjX92JIMiOIqYtYgumzpo+7RRtu/E0zvknokMF5GgdQv4Ze/5DWL8CFVe2aNuedGsLCi1vS+WL F4WKNkL2Dnh414FnO1b1R5vKuRaxjKUF2YKBqjuCGtF6nyL5+XxOJWCcL2/CpjzdRYRuGpDShQQs ARUj9U/OnRh7Yr9/CW1JXU4fYxXoHIMCu+iB+gBLIt/LgShDYCYktGCDfCBgvyRgVQgZwTy/jIzy EnQNMZV1QCT4bJ+3XFCkS81/WijdkiYAdSak04BWtabWEmIbsNZYgU00YE+gjyErQeo31GpShVMH Yc+/dwsEzh97/D6ojT2ZMlM1XwN8WP9Ma7NAbZvbtBoEjE+jBT2TusCu5SIbI7z/wLWN1rdKi0o6 cqwTuAmYyTm5NQW/82atWvlnBbo7apxD98qDJxl7mkC76JQ2Qm0CI1xKF95Gb4oLXHJDwJlxjy/u
      LgruGtNFM8lqnNtfK2JqN3CVeW1gzWj9jThd0xd59R8BBgAAiefGO1Bt1gAAAABJRU5ErkJggg==") no-repeat 50% 50%;-webkit-background-size:19px 19px}#sw_pw .sw-pw-tr{right:0;border-left:1px solid rgba(255,255,255,.2);background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAmCAYAAABDClKtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ bWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6 eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEz NDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv IiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RS ZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpD cmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNl SUQ9InhtcC5paWQ6QjA3NjMyREZDNzQ2MTFFMTlBQUM5QzlCRDZGODZCQkYiIHhtcE1NOkRvY3Vt ZW50SUQ9InhtcC5kaWQ6QjA3NjMyRTBDNzQ2MTFFMTlBQUM5QzlCRDZGODZCQkYiPiA8eG1wTU06 RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCMDc2MzJEREM3NDYxMUUxOUFB QzlDOUJENkY4NkJCRiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCMDc2MzJERUM3NDYxMUUx OUFBQzlDOUJENkY4NkJCRiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1w bWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqheQ+MAAAEtSURBVHja7JftDYIwEIbB8JeEUXACZQPd oGygE+gGxAnQEZzAOgEdwREIDKBXUgjBIqW5Npj0kvcHpG0erveFX1WVZ8l2oBhEhRoLw/BroW8J KgeR3vMVlI5BrSwAHQZAnngmYxtMe4oIL41ZAp6iNqF4/BQTa0oBxmxAcaAHKFJY+wKtAaw0CRUJ oHjGHiY8VpqCKmYCdRkJUKmJ7Ms1gZqkqOs6w/bUGXRCOGePCcXjaItwDsW8PoZ0zhM70IeeyiZi jH/Isf+CF9MAOdCppDj+LJ6yim6j9802B6VqQa818BFjY6AHakHp9Crj15ctCaiFIi7Q/wCKLRHq vjSoVNKWunH4rTBDv5Cv7NKeKfvvU2nINzHAuexzUA7KQTkoB6UxDicKvc+qfQQYABaiUBxugCsr AAAAAElFTkSuQmCC") no-repeat 50% 50%;-webkit-background-size:19px 19px}#sw_pw .sw-pw-content{background-color:#fff;border:1px solid rgba(0,0,0,.8)}#sw_pw .sw-pw-notification{color:#fff;line-height:33px;margin-top:2px}#sw_pw .sw-pw-line{background-color:#fff;padding:8px;margin-top:0}#sw_pw .sw-pw-line-title{height:22px;line-height:22px;text-align:left;border-bottom:2px green solid;overflow:hidden}#sw_pw .sw-pw-line-title span{color:#fff;background-color:green;padding:0 4px;line-height:24px;display:inline-block}#sw_pw .sw-pw-line-list{height:20px;line-height:20px;margin-top:4px;overflow:hidden;color:#000;position:relative}#sw_pw .sw-pw-line-list .sw-pw-line-dir{position:absolute;left:0;width:90px;text-align:left}#sw_pw .sw-pw-line-list .sw-pw-line-dir span{float:left}#sw_pw .sw-pw-line-list .sw-pw-line-dir-name{max-width:62px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}#sw_pw .sw-pw-line-list .sw-pw-line-time{position:absolute;right:0;text-align:right}#sw_pw .sw-pw-line-list .sw-pw-text-gray{color:gray}#sw_pw .sw-pw-line-list .sw-pw-text-gray-bkg{background-color:#ccc;margin-left:4px}#sw_pw .sw-pw-line-list .sw-pw-text-inline-block{display:inline-block;margin-left:2px;text-align:left}.common-widget-map{width:100%;height:100%;position:absolute;left:0;top:0;visibility:hidden;z-index:-10}.map-holder{width:100%;height:100%;-webkit-tap-highlight-color:rgba(0,0,0,0)}.BMap_mask{background:transparent url("data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAtJREFUGFdjYAACAAAFAAGq1chRAAAAAElFTkSuQmCC")}.BMap_noscreen{display:none}.BMap_button{cursor:pointer}.BMap_cpyCtrl a{font-size:11px;color:#7979CC}.BMap_scaleCtrl{width:70px;height:22px;bottom:10px;left:10px;-moz-user-select:none}.BMap_scaleCtrl div.BMap_scaleTxt{font-size:11px;font-family:Arial,sans-serif;white-space:nowrap}.BMap_scaleCtrl div{position:absolute}.BMap_scaleHBar{width:100%;height:3px;font-size:0;bottom:0;background-color:#000}.BMap_scaleLBar,.BMap_scaleRBar{width:1px;height:6px;bottom:0;font-size:0;background-color:#000}.BMap_scaleLBar{left:0}.BMap_scaleRBar{right:0}.BMap_scaleTxt{text-align:center;width:100%;cursor:default;line-height:18px}</style>
  	<script type="text/javascript" src="stationconfig.js"></script>
  	<script type="text/javascript" src="utils.js"></script>
  	<script type="text/javascript" src="sbwhandler.js"></script>
  	<link rel="stylesheet" href="progressBarStyle.css" />
  </head>
  <script>alog('speed.set', 'ht', +new Date);</script>
  <script type="text/javascript">!
    function() {
      window.DP = {
        init: function(e) {
          $.extend(window.alogObjectConfig, e)
        },
        first_screen: function(e) {
          var t = function() {
            alog("speed.set", "fs", new Date),
            this.removeEventListener("load", t, !1)
          },
          n = e ? document.querySelector(e) : null;
          return n && !n.complete ? void n.addEventListener("load", t, !1) : void alog("speed.set", "fs", new Date)
        },
        ready: function(e) { ("complete" === document.readyState || "loaded" === document.readyState) && e(),
          document.addEventListener("DOMContentLoaded", e, !1)
        }
      }
    } (),
    DP.ready(function() {
      alog("speed.set", "drt", +new Date)
    }),
    window.alogObjectConfig = {
      product: "16",
      speed: {
        sample: .4
      },
      monkey: {
        sample: .05
      },
      exception: {
        sample: .5
      },
      feature: {
        sample: .05
      },
      cus: {
        sample: 1
      }
    },
    void
    function(e, t, n, a, o, d) {
      function r(t) {
        e.attachEvent ? e.attachEvent("onload", t, !1) : e.addEventListener && e.addEventListener("load", t)
      }
      function i(e, n, a) {
        a = a || 15;
        var o = new Date;
        o.setTime((new Date).getTime() + 1e3 * a),
        t.cookie = e + "=" + escape(n) + ";path=/;expires=" + o.toGMTString()
      }
      function c(e) {
        var n = t.cookie.match(new RegExp("(^| )" + e + "=([^;]*)(;|$)"));
        return null != n ? unescape(n[2]) : null
      }
      function s() {
        var e = c("PMS_JT");
        if (e) {
          i("PMS_JT", "", -1);
          try {
            e = e.match(/{["']s["']:(\d+),["']r["']:["']([\s\S]+)["']}/),
            e = e && e[1] && e[2] ? {
              s: parseInt(e[1], 10),
              r: e[2]
            }: {}
          } catch(n) {
            e = {}
          }
          e.r && t.referrer.replace(/#.*/, "") != e.r || alog("speed.set", "wt", e.s)
        }
      }
      r(function() {
        alog("speed.set", "lt", +new Date),
        o = t.createElement(n),
        o.async = !0,
        o.src = a + "?v=" + ~ (new Date / 864e5),
        d = t.getElementsByTagName(n)[0],
        d.parentNode.insertBefore(o, d)
      }),
      s()
    } (window, document, "script", "./hunter/alog/dp.mobile.min.js");</script>
  
  <body style="background:transparent;overflow:hidden;">
    <div id="fis_elm__0">
      <script>(function() {
          var allowCallNaUp = 0; // 从微信出来的url, 需要调起 
          var callNAOnOpenWebapp = 0; // 自有用户调起，像打开收藏的url操作

          callNAOnOpenWebapp = 1;

          if (!allowCallNaUp && !callNAOnOpenWebapp) {
            return;
          }

          // 微信内不会执行调起
          var ua = navigator.userAgent;
          if (ua.indexOf("MicroMessenger") !== -1) {
            return;
          }

          var openapi = "baidumap:\/\/map\/component?target=subway_page_openapi&comName=subway&param=%7B%22cityid%22%3A%22131%22%2C%22cityname%22%3A%22beijing%22%7D&src=webapp-aladdin.default.all.fromunknown";
          window.addEventListener('load',
          function() {
            var nativeUtil = require('common:widget/util/native-util.js');
            var opts = {
              forbidDownLoad: (callNAOnOpenWebapp === 1 ? true: false)
            };

            // 添加调用NA成功统计
            // weixin统计独立统计，还是使用openNativeUtils.php中的统计，不计入自有用户里面
            if (callNAOnOpenWebapp && openapi.indexOf('weixin') === -1) {
              openapi = openapi.replace(/src=(.+)$/, 'src=webapp.default.all.callnaonopenwebapp');
            }
            //nativeUtil.callNA(openapi, opts);
          });
        })();</script>
    </div>
    <div id="fis_elm__1"></div>
    <div id="fis_elm__2"></div>
    <div id="page_data"></div>
    <div id="fis_elm__3">
      <div class="common-widget-hideoverlay"></div>
    </div>
    <div id="wrapper">
      <div id="pager">
        <div id="page-wrapper">
          <div id="main">
            <div id="fis_elm__4" style="display:none;">
              <div class="styleguide common-widget-nav -shadow-card -bg-normal row">
                <a jsaction="jump" href="javascript:void(0)" class="btn -flat needsclick back-btn -col-auto">
                  <i class="icon -back-arrow"></i>
                </a>
                <div class="title -ft-large">
                  <span>地铁专题图</span></div>
              </div>
            </div>
            <div id="fis_elm__5">
              <div id="subway-holder" style="background-color:transparent;"></div>
            </div>
            <div id="fis_elm__6">
              <div id="swZoomControl" class="needsclick" style="visibility:hidden;">
                <div id="swZoomOut" class="block_zoom_btn block_zoom_out_btn">
                  <div class="inline_zoom_btn inline_zoom_out"></div>
                </div>
                <div id="swZoomIn" class="block_zoom_btn block_zoom_in_btn">
                  <div class="inline_zoom_btn inline_zoom_in"></div>
                </div>
              </div>
            </div>
            <div id="fis_elm__7"></div>
          </div>
          <textarea class="g_fis_bigrender" style="display:none;">BigPipe.asyncLoad({id: "common-bottombanner-widget-fis", useCache: true});</textarea>
          <div id="common-bottombanner-widget-fis"></div>
          <textarea class="g_fis_bigrender" style="display:none;">BigPipe.asyncLoad({id: "common-footer-widget", useCache: true});</textarea>
          <div id="common-footer-widget"></div>
          <div id="monitor" user-data='{"module":"subway","action":"show","page":"show"}'></div>
        </div>
      </div>
    </div>
    <div id="fis_elm__8">
      <div class="common-widget-map">
        <div class="map-holder" id="map-holder"></div>
      </div>
    </div>
    <img id="statImg" style="display:none" />
    <img id="pbstatImg" style="display:none" />
    <img id="error-img" style="display:none;" />
    <script>window._APP_HASH = {
        module: "subway",
        action: "show",
        page: "show",
        da_page: "subwaypg",
        third_party: null || ''
      };
      window._STAT_INFO = {
        ldata: null,
        da_trd: null || '',
        mmaptrdtwo: null || ''
      };
      window._WISE_INFO = {
        "netype": "1",
        "netspeed": "164"
      } || {};
      window._SERVER_TIME = 278 || 0;
      var serverTime = parseInt(window._SERVER_TIME, 10) || 0;
      if (serverTime > 0) {
        alog('speed.set', 'p_srt', +serverTime);
      }

      window._EXP_INFO = {
        expvar: null,
        expgrp: null,
        useNewVectorData: 1,
        useXijiangData: 0
      };

      window.TVC = {
        "ditu": {
          "normal": {
            "version": "088",
            "updateDate": "20160824"
          },
          "satellite": {
            "version": "009",
            "updateDate": "20150601"
          },
          "normalTraffic": {
            "version": "081",
            "updateDate": "20150815"
          },
          "satelliteTraffic": {
            "version": "083",
            "updateDate": "20150815"
          },
          "mapJS": {
            "version": "104",
            "updateDate": "20160824"
          },
          "satelliteStreet": {
            "version": "083",
            "updateDate": "20150815"
          },
          "panoClick": {
            "version": "1033",
            "updateDate": "201400823"
          },
          "panoUdt": {
            "version": "20160824",
            "updateDate": "20160824"
          },
          "panoSwfAPI": {
            "version": "20150123",
            "updateDate": "20150123"
          },
          "panoSwfPlace": {
            "version": "20141112",
            "updateDate": "20141112"
          },
          "earthVector": {
            "version": "001",
            "updateDate": "20151125"
          }
        },
        "webapp": {
          "high_normal": {
            "version": "001",
            "updateDate": "20141209"
          },
          "lower_normal": {
            "version": "002",
            "updateDate": "20150529"
          }
        },
        "api_for_mobile": {
          "vector": {
            "version": "002",
            "updateDate": "20150529"
          },
          "vectorIcon": {
            "version": "002",
            "updateDate": "20150529"
          }
        }
      } || {};
      window.MSV = {
        "mapstyle": {
          "updateDate": "20160823",
          "version": "001"
        }
      } || {};

      window._isPushState = "true" === "true";
      window.spaConfig = {
        spa: true
      };

      window._DEFAULT_CITY = {
        "index": "{\"content\":{\"baike\":0,\"city_type\":2,\"cname\":\"\\u4e0a\\u6d77\\u5e02\",\"code\":289,\"geo\":\"1|13523265.31,3641114.64;13523265.31,3641114.64|13523265.31,3641114.64;\",\"if_current\":1,\"level\":12,\"sup\":1,\"sup_bus\":1,\"sup_business_area\":1,\"sup_lukuang\":1,\"sup_subway\":1,\"tips\":\"\\u4e0a\\u6d77\",\"uid\":\"4141110d95d0f74fefe4a5f0\"},\"result\":{\"data_security_filt_res\":0,\"jump_back\":0,\"qid\":\"\",\"time\":0,\"type\":1,\"uii_type\":\"china_main\",\"region\":\"0\",\"uii_qt\":\"index\",\"login_debug\":1},\"current_city\":{\"code\":289,\"sup\":1,\"sup_bus\":1,\"sup_business_area\":1,\"sup_lukuang\":1,\"sup_subway\":1,\"type\":2,\"up_province_name\":\"\\u4e0a\\u6d77\\u5e02\"}}",
        "loopindex": -1,
        "addrbyip": "{\"error\":0,\"content\":{\"address\":\"\",\"address_detail\":{\"city\":\"\",\"city_code\":0,\"district\":\"\",\"province\":\"\",\"street\":\"\",\"street_number\":\"\",\"accuracy\":null},\"point\":{\"x\":\"0.00\",\"y\":\"0.00\"}}}",
        "default_city": "\u4e0a\u6d77\u5e02",
        "ipGeo": "1|13523265.31,3641114.64;13523265.31,3641114.64|13523265.31,3641114.64;"
      } || {};
      window._CURRENT_CITY = null || {};

      window._MAP_LOADED = false;</script>
    <div id="fis_elm__9">
      <script type="text/javascript">window.localcache = function(e) {
          "use strict";
          function t(e, t) {
            return c[e] === t
          }
          function n() {
            return ! 0
          }
          var r, o = "LOCAL_CACHE_JS",
          c = {},
          l = !1;
          if (e.localStorage) {
            r = e.localStorage;
            try {
              var a = r.getItem(o);
              a && (c = JSON.parse(a)),
              l = !0
            } catch(u) {
              window.console && console.log(u)
            }
          }
          return {
            store: function(e, t, n) {
              if (l) try {
                r.setItem(t, n);
                var a = c[e];
                return t !== a && (r.removeItem(a), c[e] = t, r.setItem(o, JSON.stringify(c))),
                !0
              } catch(u) {
                return window.console && console.log(u),
                !1
              }
            },
            load: function(e, o) {
              if (!e || !o) return null;
              if (!l || !t(e, o)) return null;
              try {
                var c = r.getItem(o);
                return n(c) ? c: null
              } catch(a) {
                return window.console && console.log(a),
                null
              }
            },
            loadJS: function(e, t) {
              var n = this.load(e, t);
              if (n) {
                var r = document.getElementsByTagName("head")[0],
                o = document.createElement("script");
                return o.type = "text/javascript",
                o.appendChild(document.createTextNode(n)),
                r.appendChild(o),
                !0
              }
              return ! 1
            }
          }
        } (window);;
        window.libCache = function(e) {
          "use strict";
          function t() {
            var e = new Date;
            e.setTime(e.getTime() + 2592e6),
            document.cookie = o + "=" + c + "; path=/mobile/;expires=" + e.toGMTString()
          }
          function i() {
            var e = new Date(0);
            document.cookie = o + "=; path=/mobile/;expires=" + e.toGMTString()
          }
          var o = "core-libs-js",
          c = "/static/core/js/libs/core-libs_59fb947.js",
          r = e.localcache;
          return {
            store: function(e) {
              if (r) {
                var i = r.store(o, c, e);
                i && t()
              }
            },
            load: function() {
              var e = !1;
              if (r && (e = r.loadJS(o, c)), !e) {
                i();
                var t = document.createElement("script");
                t.type = "text/javascript",
                t.src = "./simple" + c,
                document.writeln(t.outerHTML)
              }
            }
          }
        } (window);;</script>
      <script type="text/javascript">window.libCache.load();
        alog('speed.set', 'c_int', +new Date);
        alog('speed.set', 'c_htch', +new Date);
        // PDC && PDC.mark("c_int");
        // PDC && PDC.mark("c_htch");
        </script>
    </div>
    <script type="text/javascript">
    var SUBWAY;
    !function() {
        var e = window.localStorage,
        t = {
          getItem: e.getItem,
          setItem: e.setItem,
          removeItem: e.removeItem
        }; ["getItem", "setItem", "removeItem"].forEach(function(r) {
          e[r] = function() {
            var m = Array.prototype.slice.apply(arguments);
            try {
              return t[r].apply(e, m)
            } catch(o) {}
          }
        })
      } ();</script>
    <script type="text/javascript">window.onerror = function(e, o, n) {
        var r = window.navigator.userAgent.toLowerCase(),
        i = ""; - 1 != r.indexOf("android") ? i = "android": -1 != r.indexOf("iphone") && (i = "iphone");
        var d = document.getElementById("error-img"),
        m = "./simple/static/common/images/senderror_871c794.gif";
        return m = m + "?message=" + encodeURIComponent(e) + "&page=" + encodeURIComponent(o) + "&line=" + encodeURIComponent(n) + "&os=" + encodeURIComponent(i),
        d.src = m,
        !1
      };</script>
    <div id="fis_elm__10">
      <style>@charset "UTF-8";@font-face{font-family:mwa;src:url(/mobile/simple/static/styleguide/icons/mwa_8077edf.eot);src:url(/mobile/simple/static/styleguide/icons/mwa_f9e0ebd.woff) format("woff"),url(/mobile/simple/static/styleguide/icons/mwa_77e7dd3.ttf) format("truetype")}.icon{display:inline-block;font-family:mwa;font-weight:400;font-style:normal;font-variant:normal;line-height:1;text-transform:none;-webkit-font-smoothing:antialiased;font-size:16px;width:1em;height:1em}.icon.-large{font-size:20px;width:1em;height:1em}.icon.-walk:before{content:"\e602"}.icon.-traffic:before{content:"\e603"}.icon.-telephone:before{content:"\e604"}.icon.-taxi:before{content:"\e605"}.icon.-start:before{content:"\e606"}.icon.-solid-marker:before{content:"\e607"}.icon.-search:before{content:"\e608"}.icon.-route:before{content:"\e609"}.icon.-reverse:before{content:"\e60a"}.icon.-recommend:before{content:"\e60b"}.icon.-profile:before{content:"\e60c"}.icon.-plus:before{content:"\e60d"}.icon.-place:before{content:"\e60e"}.icon.-minus:before{content:"\e60f"}.icon.-metro:before{content:"\e610"}.icon.-message:before{content:"\e611"}.icon.-menu:before{content:"\e612"}.icon.-marker:before{content:"\e613"}.icon.-location:before{content:"\e614"}.icon.-label:before{content:"\e615"}.icon.-gotop:before{content:"\e616"}.icon.-forward-arrow:before{content:"\e617"}.icon.-flight:before{content:"\e618"}.icon.-end:before{content:"\e619"}.icon.-drive:before{content:"\e61a"}.icon.-down-angle:before{content:"\e61b"}.icon.-close:before{content:"\e61c"}.icon.-clock:before{content:"\e61d"}.icon.-bus:before{content:"\e61e"}.icon.-back-arrow:before{content:"\e61f"}.icon.-apps:before{content:"\e620"}.icon.-map:before{content:"\e621"}.icon.-list:before{content:"\e622"}.icon.-selected:before{content:"\e623"}.icon.-drop-marker:before{content:"\e624"}.icon.-route-smooth:before{content:"\e625"}.icon.-search-thin:before{content:"\e626"}.icon.-bus-station:before{content:"\e600"}.icon.-footprint:before{content:"\e601"}.icon.-more:before{content:"\e627"}.icon.-question:before{content:"\e628"}.icon.-snack:before{content:"\e629"}.icon.-street-view:before{content:"\e62a"}.icon.-wallet:before{content:"\e62b"}.icon.-cater:before{content:"\e62c"}.icon.-hotel:before{content:"\e62d"}.icon.-nav:before{content:"\e62e"}.icon.-walk-solid:before{content:"\e62f"}.icon.-drive-solid:before{content:"\e630"}.icon.-bus-solid:before{content:"\e631"}.icon.-route-thick:before{content:"\e632"}.icon.-place-thick:before{content:"\e633"}.icon.-marker-thick:before{content:"\e634"}.icon.-profile-thick:before{content:"\e635"}.thumbnail{display:block;padding:0}.thumbnail div.thumb-img,.thumbnail>img{display:block;max-width:100%;margin:0 auto 1px;text-align:center}.thumbnail>.caption{display:block;padding:0;margin:5px auto 0;text-align:center;font-size:12px}.thumbnail.-round>div.thumb-img{-webkit-border-radius:50%;border-radius:50%}a.thumbnail:active{background-color:#e5e5e5}a.thumbnail.-round:active{background:0 0}a.thumbnail.-round:active>div.thumb-img{-webkit-box-shadow:inset 0 0 0 200px rgba(0,0,0,.5);box-shadow:inset 0 0 0 200px rgba(0,0,0,.5)}a.thumbnail.-round.-transparency:active{background:0 0}a.thumbnail.-round.-transparency:active div.thumb-img,a.thumbnail.-round.-transparency:active>img{-webkit-box-shadow:none;box-shadow:none;opacity:.7}ul.list-group{margin:0;list-style-type:none;width:100%;border:1px solid #d4d4d4}ul.list-group>li{position:relative;padding:0 10px}ul.list-group>li:active{background-color:#011925}ul.list-group>li>a{border-bottom:#d4d4d4 solid 1px;display:block;padding:10px}ul.list-group>li:last-child>a{border-bottom:0}ul.list-group.-large>li>a{padding:15px 10px}ul.list-group.-icon>li{position:relative}ul.list-group.-icon>li:after{content:"\e617";font-family:mwa;position:absolute;color:#cfcfcf;font-size:12px;top:50%;right:10px;margin-top:-.5em}.popover{position:relative}.popover:after,.popover:before{display:table;content:" "}.popover:after{clear:both}.popover .content{box-shadow:2px 2px 7px rgba(0,0,0,.4)!important;color:#ffffff;background-color:#fff;padding:10px;position:relative;overflow:hidden;text-align:center}.popover .content:after,.popover .content:before{display:table;content:" "}.popover .content:after{clear:both}.popover.-top-angle .angle{width:0;height:0;position:absolute;border-bottom:10px solid #fff;border-left:8px solid transparent;border-right:8px solid transparent;top:-10px;left:-8px;margin-top:0;margin-left:50%}.popover.-bottom-angle .angle{width:0;height:0;position:absolute;border-top:10px solid #fff;border-left:8px solid transparent;border-right:8px solid transparent;top:100%;left:-8px;margin-top:0;margin-left:50%}.popover.-dark .content{background-color:#000;color:#fff}.popover.-dark.-top-angle .angle{border-bottom:#000 10px solid}.popover.-dark.-bottom-angle .angle{border-top:#000 10px solid}ul.tab.-secondary>li{border-top:#d4d4d4 solid 1px;font-size:14px}ul.tab.-secondary>li>a{height:auto;padding:15px 0}ul.tab.-secondary>li.active{font-size:14px;background-color:#fff;border-left:#d4d4d4 solid 1px;border-right:#d4d4d4 solid 1px}ul.tab.-secondary>li.active:first-child{border-left:0}ul.tab.-secondary>li.active:last-child{border-right:0}</style></div>
    <style>.ui-suggestion{position:absolute;top:0;left:0;display:none;z-index:999;font-size:16px;border-bottom:1px solid #b1b1b1;background-color:#fff;width:93%;-webkit-box-sizing:border-box}.ui-suggestion ul{list-style:none;background:#fff}.ui-suggestion ul li{border-bottom:1px solid #e7e7e7;height:44px;line-height:44px;position:relative;width:90%;margin:0 auto}.ui-suggestion ul li:last-child{border-bottom:0}.ui-suggestion .ui-suggestion-result{padding:0 10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;-webkit-tap-highlight-color:rgba(0,0,0,0);cursor:pointer}.ui-suggestion .ui-suggestion-result font{color:#878787}.ui-suggestion .ui-suggestion-content{position:relative}.ui-suggestion .ui-suggestion-button{border-top:1px solid #e7e7e7;height:44px;line-height:44px}.ui-suggestion-button span{text-decoration:none;text-align:center;color:#4B4B4B;display:inline-block;font-size:14px;padding:0 10px;cursor:pointer}.query-icon{position:absolute;margin-top:14px;width:16px;z-index:1;height:16px;margin-left:-10px}.history-icon{position:absolute;margin-top:14px;width:16px;z-index:1;height:16px;margin-left:-10px;font-size:16px}.ui-input-mask{position:relative;z-index:100}.ui-suggestion-mask{position:relative;z-index:999;display:-webkit-box;-webkit-box-align:center}.ui-suggestion-mask input{-webkit-box-flex:1;display:block}.ui-suggestion-button span{display:inline-block}.ui-suggestion-button span.ui-suggestion-clear{float:left;color:#848484}.ui-suggestion-button span.ui-suggestion-close{float:right;background:url(./simple/static/common/images/suggestion-icon_5c7d911.png) no-repeat 11px -32px;background-size:25px 60px;position:absolute;right:7px;width:20px;height:26px;margin-top:7px;margin-left:20px;z-index:1;-webkit-box-sizing:content-box}.ui-suggestion .ui-suggestion-plus{position:absolute}.ui-suggestion-highlight{background:#ededed}.ui-suggestion-button span{text-decoration:none;text-align:center;color:#4B4B4B;font-size:14px;padding:0 10px;cursor:pointer}.ui-suggestion .ui-suggestion-plus{right:0;top:0;bottom:0;width:52px;background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAI5JREFUSEtjZCACLF261J6RkbELpPT///9l0dHRB4nQRlgJ0ODny5Yt+w/CIDZhHUSqgBkKo4nURljZqMHwMBohQQFK/ECvnkT3LgX8kyAzGZATPwWGgTMPSiYCGvyEWgYiGfyEAcjxoKaroWZ5EM52QBUjJLkRExajQUH7Qgg5E4HYxMQLUWpgmYiUxA8AOdLMz+iDKvIAAAAASUVORK5CYII=") no-repeat scroll center center #fff;-webkit-background-size:11px 11px}@media all and (min-device-width:768px) and (max-device-width:1024px){.ui-suggestion{font-size:18px}.ui-suggestion .ui-suggestion-button{height:44px;line-height:44px}}.ui-input-mask input{outline:0}.ui-suggestion-quickdel{background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAAqCAYAAAAqAaJlAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALzSURBVHjaxJlpb9NAEIZ9pEmcpCWhpUiQqoJK8P9/DggooPYLLQ1J1SN1bDNTvRstrr23y0gjR44dP56daydx5Ccj0inpgHRImuDIsiYtcGRdkV77PCx2BNwnnZHuWN67IV2S/nYBjy0h35LuRWHkhvTcBjo2vIYhDx1XQids5Z+kpS8sL/M70t2oW7kj/QrfbpVU8V1G+gHL37WwUV6S3pI+2MIy6EeHAPKRBMBs5XtT2B4s+pygsltOEXR509vULz5B3vxfwkzvYTQlLEf9RPNjeQCgjeb7PumRyg04kI41GWJB+hlVKnME5aLwCauXaQL8Rs4QMuyxVCrbQE9JK9I/jsBLpKgKn02AL+uwbNW54qY1LFpJ52yBZVAh3C8cKLLSDtLZWoZ9o8mnPfj3qnbeFLgJNEYgjQ0CbiFgE7hAorlpguttgVWgU4MVYVe54HKc4s0ODZfSFtgXVFzPheIuhc/Y1H5T4FUA0H9ay55jCnqN45l0rkK2EO71JRCoSACPgTN0zJc64FCgwm8fYXselagNOAoIKjjjRNMmmgLPFcHhC7qtCUkURjJFma5CdjiF52+sGoKp7sOLAKxFYtAB2YLGHQAzY5W0deWGoG15dB4YeNsbZA4bQgFatgSTa2lW9RbLFG99EBDUt5dokl+i3LI/vDJoZGxAQwJXYq4gLDs02HLbgoYCFuOmrTUvDPZdLqCqwsFG+m6wp3uyU8hhgYFivtDHW7pWprqFY0x7xppJzVnTHuwegRYrOp8+HuZaQgXwNUBnmut/yBvGOtiRQSOeBxiArA1mE5yTv6kmMvzGe7Cgy3zMpotSyUNDjDxJVxXKZ4hBhquUsOjGxEolLLwfdTOP1eXU06hlwJwq/FK4RPpMoBtYdOnifzmcfKLx4RAihii3kUewsEtc4bpRR25xhWDSxonNwweYMs4CQXK+PtdZ0xVWyBjF44VDvi3gk5dRx38tNckugnCE3NmXcmiJqljAeuJPO+c92V8BBgA85NXw63SPuAAAAABJRU5ErkJggg%3D%3D") no-repeat;-webkit-background-size:100%;-webkit-background-origin:content-box;cursor:pointer;width:20px;height:20px;padding:8px 10px;visibility:hidden;-webkit-box-sizing:content-box}.ui-suggestion .ui-suggestion-result span:nth-of-type(2){margin-left:15px}.ui-suggestion .ui-suggestion-result span:nth-of-type(3){color:silver;font-size:77%} .fix_gr_mk{background-size:85px 558px}.mkr_trans{-webkit-background-size:85px 558px;-webkit-tap-highlight-color:rgba(0,0,0,0)}.dest_mkr{-webkit-background-size:94px 41px}.navi_mkr{-webkit-background-size:38px 40px}.drv_dest{-webkit-background-size:233px 18px}.bus_direction{-webkit-background-size:17px auto}.rt_bus{-webkit-background-size:27px 32px}.stop-name{white-space:nowrap}.subway{display:inline-block;height:15px;line-height:15px;margin-left:3px;border-radius:3px;font-size:10px;padding:0 2px}.line_step{width:70px;height:35px;background-color:rgba(255,255,255,.8);left:50%!important;bottom:14px!important;margin-left:-35px;z-index:11!important;-webkit-box-shadow:1px 1px 2px rgba(0,0,0,.4)}.line_step div{width:50%;height:100%;-webkit-box-sizing:border-box;display:inline-block;position:relative}.line_step.level_up{bottom:93px!important}.step_pre{border-right:1px solid #ececec}.line_step .disable b{opacity:.5}.nplb{position:absolute;left:.8em;top:-1em;background:#fff;padding:1px 3px;border:1px solid #a7a7a7;color:#666}.events_mrk{-webkit-background-size:26px 173px;background-size:26px 173px}.stop-name-overlay{position:absolute;font-size:12px;-webkit-box-shadow:2px 2px 7px rgba(0,0,0,.4);background-color:rgba(248,248,248,.9);padding:4px}.stop-name-overlay .titleWrap{display:-webkit-box}.stop-name-overlay .title{color:#3D70B6;-webkit-box-flex:1 100%;-webkit-box-align:center;-webkit-box-sizing:border-box}.stop-name-overlay .title,.stop-name-overlay .content{line-height:15px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block}.stop-name-overlay:after{content:'';display:block;width:8px;height:8px;background:url(./simple/static/common/images/bubble-arrow_f7aa915.png);background-size:8px auto;position:absolute;left:0;bottom:-8px;opacity:.9;-webkit-box-shadow:2px 2px 7px rgba(0,0,0,.4)}.stop-name-overlay.left:after{left:auto;right:0;-webkit-transform:rotate(90deg)}.stop-name-overlay.bottom:after{bottom:auto;top:-7px;-webkit-transform:rotate(-90deg)}.stop-name-overlay.left.bottom:after{-webkit-transform:rotate(-180deg)}#streetview-btn-container{width:35px;height:35px;position:relative;display:none}#streetview-btn-container .btn_bg{width:35px;height:35px;line-height:35px;text-align:center;background:rgba(255,255,255,.8);-webkit-box-shadow:1px 1px 2px rgba(0,0,0,.4);border-radius:3px;z-index:0}#streetview-btn-container .btn_bg>i{position:absolute;display:block;width:20px;height:20px;font-size:20px;left:7.5px;top:7.5px}#streetview-btn-container .btn_bg>i.off{color:#686A5B}#streetview-btn-container .btn_bg>i.on{color:#62BADF}.eye-img{width:83px;height:57px;position:absolute;left:-31px;top:-97px;z-index:1000}.common-widget-map .eye-marker{position:absolute;z-index:200;width:20px;height:30px;background:url(./simple/static/common/images/pano_a0fa2ec.png)
      0 0 no-repeat;background-size:20px auto;display:none}.common-widget-map .eye-marker .eye-popup{width:91px;height:25px;line-height:35px;background:#494848;color:#fff;position:absolute;left:-35px;top:-34.5px;box-shadow:1px 1px 2px rgba(0,0,0,.4);opacity:.92;display:none;border-bottom-left-radius:5px;border-bottom-right-radius:5px}.common-widget-map .eye-marker .eyeImg{display:none;width:91px;height:66px;background-color:#494848;position:absolute;left:-35px;top:-100.5px;opacity:.92;border-top-left-radius:5px;border-top-right-radius:5px;background-image:url(./simple/static/common/images/imgback_36438af.png);background-position:center;background-repeat:no-repeat;background-size:83px 54px}.common-widget-map .eye-marker .eye-popup .sname{display:block;width:70px;height:22px;line-height:22px;font-size:15px;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;text-align:center;position:relative;left:3px}.common-widget-map .eye-marker .eye-popup i.icon{position:absolute;right:2px;top:3px;color:#bbb}.common-widget-map .eye-marker .eye-popup:after{content:'';width:10px;height:10px;display:block;background:#494848;box-shadow:2px 2px 2px #ccc;position:absolute;top:20px;left:41.5px;-webkit-transform:rotate(45deg)}.tf_btn{width:35px;height:35px}.tf_btn .btn_bg{position:absolute;width:35px;height:35px;background:rgba(255,255,255,.8);-webkit-box-shadow:1px 1px 2px rgba(0,0,0,.4);border-radius:3px;z-index:0}.tf_btn .tf_icon{position:absolute;top:7.5px;left:7.5px;width:20px;height:20px;font-size:20px;color:#62BADF}.tf_close .tf_icon{color:#686A5B}.tf_btn .txt{position:absolute;top:18px;width:100%;text-align:center;font-size:10px;color:#44454D}.tf_on .tf_icon{background-position:0 0;opacity:1}#zoom-btn-container{-webkit-box-shadow:1px 1px 2px rgba(0,0,0,.4);background:rgba(255,255,255,.8);border-radius:3px}.bl_btn{background:url(./simple/static/common/widget/apiext/images/result_bgs_b6bbaa6.png) 0 0 no-repeat;-webkit-background-size:58px 160px}.zoom_btn{display:-webkit-box;-webkit-box-align:center;-webkit-box-pack:center;-webkit-box-sizing:border-box}.zoom_btn{height:35px;width:35px}.zoom_btn_in{margin-bottom:-1px;border-bottom:1px solid #ececec}.zoom_btn_on{background-color:#eee}.zin,.zout{width:16px;height:16px;font-size:16px;color:#686A5B}.blue_disable .zin{opacity:.53}.blue_disable .zout{opacity:.53}.pad_clear{background:url(./simple/static/common/widget/apiext/images/clearbtn_b2e61b4.png) no-repeat 0 0;background-size:16px 33px}.pad_btn_top{position:absolute;height:35px}.pad_btn_top .pad_btn{position:relative;width:37px;height:37px;-webkit-tap-highlight-color:rgba(0,0,0,0)}.pad_btn_top .pad_btn .btn_bg{position:absolute;width:35px;height:35px;-webkit-box-shadow:1px 1px 2px rgba(0,0,0,.4);background-color:#f4f4f3;z-index:0}.pad_btn_top .pad_btn_on .btn_bg{border:1px solid #80b5d9}.pad_btn_top .pad_btn .pad_clear{position:absolute;top:5px;left:11px;display:inline-block;width:16px;height:17px}.pad_btn_top .pad_btn .pad_tf{position:absolute;top:5px;left:16px;display:inline-block;width:15px}.pad_btn_top .pad_btn .txt{position:absolute;top:20px;width:100%;text-align:center;font-size:10px;color:#44454d}.pad_btn_top .pad_clear{background-position:0 0}.clear_btn_false .pad_clear{background-position:0 -17px}.pad_btn_top .clear_btn_false .txt{color:#babab9}.map-geo .geo-btn,.map-geo-info{height:35px;width:35px;background:rgba(255,255,255,.8);-webkit-box-shadow:1px 1px 2px rgba(0,0,0,.4);border-radius:3px}.map-geo .geo-btn .txt{display:none}.map-geo .geo-btn b{height:20px;width:20px;font-size:20px;position:absolute;left:7.5px;top:7.5px;color:#686A5B}.map-geo .geo-fail{}.map-geo .geo-fail b{background-position:-4px 1px}.map-geo .geo-btn.active{background-color:#eee}.map-geo .geo-btn.active b{background-position:-4px 1px}.map-geo-info{width:auto;padding:0 3px 0 8px}.map-geo-info b{font-size:14px!important;line-height:36px!important;font-weight:400}.map-geo-info em{color:#333;width:12px;height:12px;font-size:12px;vertical-align:middle;margin-left:8px;margin-top:-3px}.menu-ctrl-btn{height:35px;width:35px;-webkit-box-shadow:1px 1px 2px rgba(0,0,0,.4);border-radius:3px;background:rgba(255,255,255,.8)}.menu-ctrl-btn .menu-ctrl-icon{width:16px;height:16px;background-image:url(./simple/static/common/widget/apiext/images/map-menu-icon_c22e5a2.png);background-repeat:no-repeat;-webkit-background-size:contain;margin-left:10px;margin-top:10px}.menu-ctrl-drop{background:rgba(255,255,255,.9);-webkit-box-shadow:1px 1px 2px rgba(0,0,0,.4);border-radius:3px;color:#333}.menu-ctrl-drop ul li{display:block;width:120px;height:40px;line-height:36px;font-size:14px;padding:0 0 0 20px;overflow:hidden;border-bottom:1px solid #ddd}.menu-ctrl-drop ul li:last-child{border-bottom:0}#menu-info-center span{color:#848484}.line_step .step_next b{background:url(./simple/static/common/widget/apiext/images/step-next_17ea435.png) no-repeat 0 0;-webkit-background-size:contain;background-position:center}.line_step div b{position:absolute;top:50%;left:50%;height:14px;width:16px;margin:-7px 0 0 -8px;background:url(./simple/static/common/widget/apiext/images/step-prev_e6308da.png) no-repeat 0 0;background-size:contain;background-position:center}.iw{width:100%;-webkit-box-sizing:border-box;border:.3em solid transparent;-webkit-background-clip:padding}.iw_rt{position:relative;height:46px;width:212px;-webkit-box-sizing:border-box;display:-webkit-box;-webkit-box-align:center;margin:2px 5px 0 2px;background-color:rgba(255,255,255,.8);-webkit-box-shadow:2px 2px 7px rgba(0,0,0,.4);color:#333}.iw_rt .iw_bg{display:-webkit-box}.iw_bg .iw_poir{-webkit-box-flex:1}.iw_rt:after{content:"";position:absolute;left:50%;bottom:-8px;width:10px;height:8px;margin:0 0 0 -5px;background-image:url(./simple/static/common/widget/apiext/images/info-win-ar_1cc0dce.png);background-repeat:no-repeat;background-size:contain}.iw_s{text-align:center;vertical-align:middle;height:100%;-webkit-box-sizing:border-box}.iw_rt .iw_s1{color:#cbcbcb}.iw_rt b{color:#333;font-weight:700}.iw_rt_gr{margin-left:-4px}.iw_busline{margin:32px 0 0 -3px}.iw_busline .iw_cc{text-align:center;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;padding:0 6px}.iw_r{-webkit-box-ordinal-group:3}.iw_r,.iw_l{height:100%;font-size:4.5em;text-align:center;color:#747474;border:0;-webkit-box-sizing:border-box;line-height:.7em;border:1px solid rgba(255,255,255,.2);width:41px}.iw_r{border-style:none none none solid}.iw_l{border-style:none solid none none}.iw_line{height:64px;width:228px;padding:0 11px;line-height:20px}.iw_bustrans .iw_cc{text-align:center;display:block}.iw_bustrans .iw_cc p{color:#ffba31}.iw_c{overflow:hidden;display:-webkit-box;-webkit-box-align:center;-webkit-box-flex:1}.iw_cc{-webkit-box-sizing:border-box;width:100%;border:0}.iw_cc .crl_ar b{line-height:20px}.iw_cc .crl_ar .d-addr{font-weight:400;color:#545454;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;padding:0 3px}.iw_rt.iw_et_dt .iw_bg{display:block}.iw_rt.iw_et_dt{height:auto;width:254px}.iw_et_dt .iw_c{display:block;text-align:left}.iw_et_dt
      .iw_c .iw-et{text-align:center;margin-top:5px;text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.iw_et_dt .iw_c .ev-des{margin:5px;background:#eee;color:#333;padding:5px;line-height:22px;min-height:88px;word-break:break-all}.iw-ct{color:#333;display:-webkit-box;margin:0 0 -8px 0;background-color:rgba(255,255,255,.8);-webkit-box-shadow:2px 2px 7px rgba(0,0,0,.4);-webkit-box-align:center;-webkit-box-sizing:border-box;-webkit-background-clip:padding;position:absolute;line-height:28px;text-align:center;border:0;-webkit-user-select:none}.iw-ct:after{content:"";position:absolute;left:50%;bottom:-8px;width:10px;height:8px;margin:0 0 0 -5px;background-image:url(./simple/static/common/widget/apiext/images/info-win-ar_1cc0dce.png);background-repeat:no-repeat;background-size:contain}.iw-c{color:#333;border:0;text-align:center;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;-webkit-box-flex:1;-webkit-box-align:center;-webkit-box-sizing:border-box}.poi-info-window .iw-c{max-width:130px}.iw-c-title{text-align:center;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:0 6px;min-width:50px}.iw-c-title b,.iw-c-title p{height:20px;line-height:20px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.iw-c-title b{display:block;margin-top:3px}.iw-c-title-pano{padding:0 20px 0 6px;margin-right:6px;background:url(./simple/static/common/widget/apiext/images/pano_a0fa2ec.png) no-repeat right center;background-size:20px 28px;-webkit-background-size:20px 28px}.iw-l,.iw-r{display:block;width:41px;height:46px;text-align:center;color:#747474;border:1px solid #c6c6c6;-webkit-box-sizing:border-box;padding-left:4px}.iw-l{border-style:none solid none none}.iw-r{border-style:none none none solid}.iw-c-c{padding:8px;line-height:20px;white-space:normal;display:-webkit-box;-webkit-box-align:center;text-align:center}.iw-c-c .iw-c-title{height:28px;text-align:center;margin-top:5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.iw-c-c .iw-c-list{padding:5px;text-align:left;line-height:22px;min-height:88px;background:#eee;color:#333;word-break:break-all}.iw-c-c .iw-c-tip{color:#ec8971}.iw-c-c .nearest-stop{width:100%}.iw_c_4{white-space:nowrap}.iw_c_0,.iw_c_1,.iw_c_3,.iw_c_5,.iw_c_6,.iw_c_7,.iw_c_11{min-width:212px;max-width:228px}.iw_c_10{width:254px;display:block;-webkit-box-sizing:border-box;box-sizing:border-box;margin:5px 0;padding:0 5px}.iw-c-10{width:auto}.iw-r-12{border-style:none none none solid;line-height:46px;color:#4C90F9;text-align:center;white-space:nowrap;display:block;width:46px;height:46px;border-left:1px solid #C6C6C6;-webkit-box-sizing:border-box;background:0 0;font-size:14px}.streetview-btn:active,.btn_bg:active,.zoom_btn:active,.geo-btn:active{background-color:#e5e5e5!important} .common-widget-back-top{display:none;position:fixed;right:10px;bottom:95px;z-index:10000;padding:10px;background-color:#555;line-height:1}</style>
    <script type="text/javascript">// 只有地图页才加载样式文件，减少首页资源加载
      if (window._EXP_INFO.useNewVectorData && window._APP_HASH.page === 'map') {
        // 加载矢量地图数据所需的样式及icon元信息等文件
        (function() {
          var vctMapFSUpdateDate = '20150501';
          var vctMapFSVersion = '001';
          if (typeof MSV !== 'undefined' && MSV.mapstyle) {
            vctMapFSUpdateDate = MSV.mapstyle.updateDate;
            vctMapFSVersion = MSV.mapstyle.version;
          }
          var vctMapFSTimeStamp = 'udt=' + vctMapFSUpdateDate + '&v=' + vctMapFSVersion;
          // debug
          // var vctMapStyleDomain = 'http://cp01-pis-map-16.epc.baidu.com:8080/sty/';
          var vctMapStyleDomain = 'http://online0.map.bdimg.com/sty/';
          document.write('<script type="text/javascript" src="' + vctMapStyleDomain + 'vpl.js?' + vctMapFSTimeStamp + '"><\/script>');
          document.write('<script type="text/javascript" src="' + vctMapStyleDomain + 'icons_pl2_0.js?' + vctMapFSTimeStamp + '"><\/script>');
        })();  
      }</script>
      <div style="position:absolute;right:5px;bottom:5px;padding:5px;border:solid 1px #00489f;background:#041c28;background-color:rgba(4,28,40,0.5);">
      	<div class="legend circleLegend" style="background:#e91b39;">1</div>
      	<div class="legend circleLegend" style="background:#8ac53f;">2</div>
      	<div class="legend circleLegend" style="background:#fad315;">3</div>
      	<div class="legend circleLegend" style="background:#502e8d;">4</div>
      	<div class="legend circleLegend" style="background:#9056a3;">5</div>
      	<div class="legend circleLegend" style="background:#d61870;">6</div>
      	<div class="legend circleLegend" style="background:#f37121;">7</div>
      	<div class="legend circleLegend" style="background:#009eda;">8</div>
      	<div class="legend circleLegend" style="background:#79c8ed;">9</div>
      	<div class="legend circleLegend" style="background:#bca8d1;">10</div>
      	<div class="legend circleLegend" style="background:#852e3d;">11</div>
      	<div class="legend circleLegend" style="background:#007c65;">12</div>
      	<div class="legend circleLegend" style="background:#e895c0;">13</div>
      	<div class="legend circleLegend" style="background:#8dd1bf;">16</div>
      	
      	<div class="legend">换乘站</div>
      	<div class="legend">地面站</div>
      	<div class="legend">地下站</div>
      	<div class="legend">2，3G</div>
      	<div class="legend">4G</div>
      	<div class="legend">无4G覆盖地下站</div>
      	
      	<div class="legend">显示全部</div>
      </div>
      
	<div id="ctrlDiv" style="position:absolute;width:180px;right:5px;top:5px;background:#041c28;border:solid 1px #00489f;padding:8px 8px 8px 8px;">
		<span id="timeSpan" class="timeSpan"></span>
		<div id="ctrlBtn" class="ctrlBtn play"></div>
		<div id="zoomBtn" class="zoomBtn toFullScreen" style="display:none;"></div>
	</div>
	<div style="position:absolute;top:0px;left:0px;background:#041c28;border:solid 1px #00489f;padding:8px 8px 8px 8px;">
		<span class="kpiSpan kpiSpanSelected">高客流</span>
		<span class="kpiSpan">低活跃</span>
		<span class="kpiSpan">低流量</span>
		<span class="kpiSpan">低速率</span>
		<span class="kpiSpan">低感知</span>
		
		<span class="kpiSpan">高进出</span>
		<span class="kpiSpan">低4G流量比</span>
		<span class="kpiSpan">低DOU</span>
		<span class="kpiSpan">高TAU</span>
		
		<span class="kpiSpan">高时延</span>
		<span class="kpiSpan">移动低速率</span>
		<span class="kpiSpan">移动高TAU</span>
		<span class="kpiSpan">低Volte接通</span>
		
	</div>
	
	<div id="ctrlMask" style="position:absolute;top:0px;left:0px;width:100%;height:100%;display:none;background:#eeeeee;filter:alpha(opacity=50); -moz-opacity:0.5; -khtml-opacity: 0.5; opacity: 0.5;">
	</div>
	<div class="progressbar" data-perc="50" style="display:none;position:absolute;left:50%;top:50%;margin-left:-280px;margin-top:-10px;">
		<div class="bar color3"><span></span></div>
		<div class="label"><span></span></div>
	</div>
  </body>
  <script>require.resourceMap({
      "res": {
        "mapapi:widget\/api\/bmap\/Map_Impl.js": {
          "url": "simple\/static\/mapapi\/widget\/api\/bmap\/Map_Impl_4938d3b.js",
          "deps": ["mapapi:static\/js\/lib\/tangram-patch.js", "mapapi:widget\/api\/bmap\/common\/Animation.js", "mapapi:widget\/api\/bmap\/common\/Transitions.js", "mapapi:widget\/api\/bmap\/common\/Size.js"]
        },
        "mapapi:widget\/api\/bmap\/operation\/touch.js": {
          "url": "simple\/static\/mapapi\/widget\/api\/bmap\/operation\/touch_f4d41c6.js",
          "deps": ["mapapi:static\/js\/lib\/tangram-patch.js", "mapapi:widget\/api\/BMap.js", "mapapi:widget\/api\/bmap\/common\/Animation.js", "mapapi:widget\/api\/bmap\/common\/Pixel.js", "mapapi:widget\/api\/bmap\/common\/ApiUtil.js", "mapapi:widget\/api\/bmap\/overlay\/Marker.js", "mapapi:widget\/api\/bmap\/overlay\/OverlayInternal.js", "mapapi:widget\/api\/bmap\/geo\/Point.js"]
        },
        "mapapi:widget\/api\/bmap\/control\/ScaleControl_Impl.js": {
          "url": "simple\/static\/mapapi\/widget\/api\/bmap\/control\/ScaleControl_Impl_3f7008b.js",
          "deps": ["mapapi:static\/js\/lib\/tangram-patch.js", "mapapi:widget\/api\/bmap\/control\/Control.js", "mapapi:widget\/api\/bmap\/geo\/Point.js"]
        },
        "mapapi:widget\/api\/bmap\/overlay\/Graph_Impl.js": {
          "pkg": "mapapi:p5",
          "deps": ["mapapi:widget\/api\/bmap\/common\/Pixel.js", "mapapi:widget\/api\/bmap\/common\/ApiUtil.js", "mapapi:widget\/api\/bmap\/overlay\/Drawer\/DrawerSelector_Impl.js", "mapapi:widget\/api\/bmap\/overlay\/Graph.js", "mapapi:widget\/api\/bmap\/overlay\/OverlayInternal.js", "mapapi:widget\/api\/bmap\/geo\/Point.js"]
        },
        "mapapi:widget\/api\/bmap\/overlay\/Polyline_Impl.js": {
          "pkg": "mapapi:p5",
          "deps": ["mapapi:widget\/api\/bmap\/common\/Pixel.js", "mapapi:widget\/api\/bmap\/common\/ApiUtil.js", "mapapi:widget\/api\/bmap\/overlay\/Polyline.js", "mapapi:widget\/api\/bmap\/overlay\/Graph.js"]
        },
        "mapapi:widget\/api\/bmap\/overlay\/Drawer\/Drawer_Impl.js": {
          "pkg": "mapapi:p5"
        },
        "mapapi:widget\/api\/bmap\/overlay\/Drawer\/SvgDrawer_Impl.js": {
          "pkg": "mapapi:p5",
          "deps": ["mapapi:static\/js\/lib\/tangram-patch.js", "mapapi:widget\/api\/bmap\/common\/Pixel.js", "mapapi:widget\/api\/bmap\/overlay\/Drawer\/Drawer_Impl.js", "mapapi:widget\/api\/bmap\/common\/ApiUtil.js"]
        },
        "mapapi:widget\/api\/bmap\/overlay\/Drawer\/CanvasDrawer_Impl.js": {
          "pkg": "mapapi:p5",
          "deps": ["mapapi:static\/js\/lib\/tangram-patch.js", "mapapi:widget\/api\/bmap\/common\/ApiUtil.js", "mapapi:widget\/api\/bmap\/overlay\/Drawer\/Drawer_Impl.js"]
        },
        "mapapi:widget\/api\/bmap\/overlay\/Drawer\/DrawerSelector_Impl.js": {
          "pkg": "mapapi:p5",
          "deps": ["mapapi:widget\/api\/bmap\/common\/ApiUtil.js", "mapapi:widget\/api\/bmap\/overlay\/Drawer\/CanvasDrawer_Impl.js", "mapapi:widget\/api\/bmap\/overlay\/Drawer\/SvgDrawer_Impl.js"]
        },
        "mapapi:widget\/api\/bmap\/overlay\/OverlayInternal_Impl.js": {
          "pkg": "mapapi:p4",
          "deps": ["mapapi:static\/js\/lib\/tangram-patch.js", "mapapi:widget\/api\/bmap\/common\/Pixel.js", "mapapi:widget\/api\/bmap\/overlay\/Marker.js", "mapapi:widget\/api\/bmap\/overlay\/Overlay.js", "mapapi:widget\/api\/bmap\/common\/ApiUtil.js"]
        },
        "mapapi:widget\/api\/bmap\/overlay\/Marker_Impl.js": {
          "pkg": "mapapi:p4",
          "deps": ["mapapi:static\/js\/lib\/tangram-patch.js", "mapapi:widget\/api\/bmap\/common\/MapConfig.js", "mapapi:widget\/api\/bmap\/common\/Pixel.js", "mapapi:widget\/api\/bmap\/common\/Size.js", "mapapi:widget\/api\/bmap\/common\/ApiUtil.js", "mapapi:widget\/api\/bmap\/overlay\/Icon.js", "mapapi:widget\/api\/bmap\/overlay\/Marker.js", "mapapi:widget\/api\/bmap\/overlay\/Overlay.js", "mapapi:widget\/api\/bmap\/overlay\/OverlayInternal.js", "mapapi:widget\/api\/bmap\/geo\/Point.js"]
        },
        "mapapi:widget\/api\/bmap\/overlay\/Icon_Impl.js": {
          "pkg": "mapapi:p4"
        },
        "mapapi:widget\/api\/bmap\/vectormap\/VectorDrawLib_Impl2.js": {
          "url": "simple\/static\/mapapi\/widget\/api\/bmap\/vectormap\/VectorDrawLib_Impl2_fc8737d.js",
          "deps": ["mapapi:static\/js\/lib\/tangram-patch.js", "mapapi:widget\/api\/bmap\/common\/DataRequest.js", "mapapi:widget\/api\/bmap\/geo\/Point.js", "mapapi:widget\/api\/bmap\/common\/ApiUtil.js"]
        },
        "mapapi:widget\/api\/bmap\/vectormap\/VectorDrawLib_Impl.js": {
          "url": "simple\/static\/mapapi\/widget\/api\/bmap\/vectormap\/VectorDrawLib_Impl_0e7f2fa.js",
          "deps": ["mapapi:static\/js\/lib\/tangram-patch.js", "mapapi:widget\/api\/bmap\/common\/DataRequest.js", "mapapi:widget\/api\/bmap\/geo\/Point.js"]
        },
        "mapapi:widget\/api\/bmap\/vectormap\/LowerFeatureStyle.js": {
          "url": "simple\/static\/mapapi\/widget\/api\/bmap\/vectormap\/LowerFeatureStyle_3f5ba57.js"
        },
        "mapapi:widget\/api\/bmap\/vectormap\/VectorMDLayer_Impl.js": {
          "url": "simple\/static\/mapapi\/widget\/api\/bmap\/vectormap\/VectorMDLayer_Impl_feaf959.js",
          "deps": ["mapapi:static\/js\/lib\/tangram-patch.js", "mapapi:widget\/api\/bmap\/common\/DataRequest.js", "mapapi:widget\/api\/bmap\/layer\/TileLayer.js", "mapapi:widget\/api\/bmap\/geo\/Point.js"]
        },
        "mapapi:widget\/api\/bmap\/streetview\/StreetViewOverlay.js": {
          "url": "simple\/static\/mapapi\/widget\/api\/bmap\/streetview\/StreetViewOverlay_3e79da8.js",
          "deps": ["mapapi:static\/js\/lib\/tangram-patch.js", "mapapi:widget\/api\/bmap\/common\/ApiUtil.js", "mapapi:widget\/api\/bmap\/common\/Size.js", "mapapi:widget\/api\/bmap\/streetview\/StreetViewUtil.js"]
        },
        "mapapi:widget\/api\/bmap\/streetview\/StreetView_Async.js": {
          "pkg": "mapapi:p1",
          "deps": ["mapapi:static\/js\/lib\/tangram-patch.js", "mapapi:widget\/api\/BMap.js", "mapapi:widget\/api\/bmap\/common\/Size.js", "mapapi:widget\/api\/bmap\/streetview\/StreetView.js", "mapapi:widget\/api\/bmap\/streetview\/StreetViewUtil.js", "mapapi:widget\/api\/bmap\/common\/ApiUtil.js", "mapapi:widget\/api\/bmap\/streetview\/StreetViewOverlayManager.js"]
        },
        "mapapi:widget\/api\/bmap\/streetview\/StreetViewService_Async.js": {
          "pkg": "mapapi:p1",
          "deps": ["mapapi:static\/js\/lib\/tangram-patch.js", "mapapi:widget\/api\/BMap.js", "mapapi:widget\/api\/bmap\/common\/ApiUtil.js", "mapapi:widget\/api\/bmap\/common\/DataRequest.js", "mapapi:widget\/api\/bmap\/streetview\/StreetViewTileData_Async.js", "mapapi:widget\/api\/bmap\/geo\/Point.js", "mapapi:widget\/api\/bmap\/common\/Pixel.js", "mapapi:widget\/api\/bmap\/streetview\/StreetViewUtil.js", "mapapi:widget\/api\/bmap\/streetview\/CachePool_Async.js"]
        },
        "mapapi:widget\/api\/bmap\/streetview\/StreetViewTileData_Async.js": {
          "pkg": "mapapi:p1",
          "deps": ["mapapi:static\/js\/lib\/tangram-patch.js", "mapapi:widget\/api\/bmap\/common\/Size.js", "mapapi:widget\/api\/bmap\/streetview\/StreetViewUtil.js"]
        },
        "mapapi:widget\/api\/bmap\/streetview\/StreetViewOperation_Async.js": {
          "pkg": "mapapi:p1",
          "deps": ["mapapi:static\/js\/lib\/tangram-patch.js", "mapapi:widget\/api\/BMap.js", "mapapi:widget\/api\/bmap\/common\/Animation.js", "mapapi:widget\/api\/bmap\/common\/Pixel.js", "mapapi:widget\/api\/bmap\/common\/ApiUtil.js", "mapapi:widget\/api\/bmap\/streetview\/StreetViewUtil.js"]
        },
        "mapapi:widget\/api\/bmap\/streetview\/StreetViewOverlayManager_Async.js": {
          "pkg": "mapapi:p1",
          "deps": ["mapapi:static\/js\/lib\/tangram-patch.js", "mapapi:widget\/api\/bmap\/common\/MapConfig.js", "mapapi:widget\/api\/bmap\/streetview\/StreetViewOverlay.js", "mapapi:widget\/api\/bmap\/common\/ApiUtil.js", "mapapi:widget\/api\/bmap\/common\/Size.js", "mapapi:widget\/api\/bmap\/common\/Pixel.js", "mapapi:widget\/api\/bmap\/streetview\/StreetViewUtil.js"]
        },
        "mapapi:widget\/api\/bmap\/streetview\/CachePool_Async.js": {
          "pkg": "mapapi:p1"
        },
        "mapapi:widget\/api\/bmap\/streetview\/ImagePool_Async.js": {
          "pkg": "mapapi:p1"
        },
        "mapapi:widget\/api\/bmap\/streetview\/StreetViewGLRenderer_Async.js": {
          "pkg": "mapapi:p3",
          "deps": ["mapapi:static\/js\/lib\/tangram-patch.js", "mapapi:widget\/api\/bmap\/streetview\/StreetViewUtil.js", "mapapi:widget\/api\/bmap\/streetview\/StreetViewLinksGLRenderer_Async.js", "mapapi:widget\/api\/bmap\/streetview\/StreetViewTileGLRenderer_Async.js"]
        },
        "mapapi:widget\/api\/bmap\/streetview\/StreetViewTileGLRenderer_Async.js": {
          "pkg": "mapapi:p3",
          "deps": ["mapapi:widget\/api\/bmap\/streetview\/StreetViewUtil.js", "mapapi:static\/js\/lib\/tangram-patch.js", "mapapi:widget\/api\/bmap\/streetview\/GLMatrix_Async.js", "mapapi:widget\/api\/bmap\/streetview\/GLSphere_Async.js", "mapapi:widget\/api\/bmap\/common\/ApiUtil.js", "mapapi:widget\/api\/bmap\/common\/Animation.js", "mapapi:widget\/api\/bmap\/common\/Transitions.js", "mapapi:widget\/api\/bmap\/streetview\/CachePool_Async.js", "mapapi:widget\/api\/bmap\/streetview\/ImagePool_Async.js", "mapapi:widget\/api\/bmap\/common\/Pixel.js"]
        },
        "mapapi:widget\/api\/bmap\/streetview\/StreetViewLinksGLRenderer_Async.js": {
          "pkg": "mapapi:p3",
          "deps": ["mapapi:static\/js\/lib\/tangram-patch.js", "mapapi:widget\/api\/bmap\/streetview\/GLCircle_Async.js", "mapapi:widget\/api\/bmap\/streetview\/GLRing_Async.js", "mapapi:widget\/api\/bmap\/common\/MapConfig.js", "mapapi:widget\/api\/bmap\/geo\/Point.js", "mapapi:widget\/api\/bmap\/common\/ApiUtil.js"]
        },
        "mapapi:widget\/api\/bmap\/streetview\/GLCircle_Async.js": {
          "pkg": "mapapi:p3",
          "deps": ["mapapi:static\/js\/lib\/tangram-patch.js", "mapapi:widget\/api\/bmap\/common\/ApiUtil.js"]
        },
        "mapapi:widget\/api\/bmap\/streetview\/GLMatrix_Async.js": {
          "pkg": "mapapi:p3"
        },
        "mapapi:widget\/api\/bmap\/streetview\/GLRing_Async.js": {
          "pkg": "mapapi:p3",
          "deps": ["mapapi:static\/js\/lib\/tangram-patch.js", "mapapi:widget\/api\/bmap\/common\/ApiUtil.js"]
        },
        "mapapi:widget\/api\/bmap\/streetview\/GLSphere_Async.js": {
          "pkg": "mapapi:p3",
          "deps": ["mapapi:static\/js\/lib\/tangram-patch.js", "mapapi:widget\/api\/bmap\/common\/ApiUtil.js"]
        },
        "mapapi:widget\/api\/bmap\/streetview\/StreetViewRenderer_Async.js": {
          "pkg": "mapapi:p2",
          "deps": ["mapapi:static\/js\/lib\/tangram-patch.js", "mapapi:widget\/api\/bmap\/streetview\/StreetViewUtil.js", "mapapi:widget\/api\/bmap\/streetview\/StreetViewTileRenderer_Async.js", "mapapi:widget\/api\/bmap\/streetview\/StreetViewLinksRenderer_Async.js"]
        },
        "mapapi:widget\/api\/bmap\/streetview\/StreetViewTileRenderer_Async.js": {
          "pkg": "mapapi:p2",
          "deps": ["mapapi:static\/js\/lib\/tangram-patch.js", "mapapi:widget\/api\/bmap\/common\/Pixel.js", "mapapi:widget\/api\/bmap\/common\/Size.js", "mapapi:widget\/api\/bmap\/streetview\/StreetViewUtil.js", "mapapi:widget\/api\/bmap\/common\/ApiUtil.js", "mapapi:widget\/api\/bmap\/streetview\/ImagePool_Async.js", "mapapi:widget\/api\/bmap\/streetview\/CachePool_Async.js"]
        },
        "mapapi:widget\/api\/bmap\/streetview\/StreetViewLinksRenderer_Async.js": {
          "pkg": "mapapi:p2",
          "deps": ["mapapi:static\/js\/lib\/tangram-patch.js", "mapapi:widget\/api\/bmap\/common\/Pixel.js", "mapapi:widget\/api\/bmap\/geo\/Point.js", "mapapi:widget\/api\/bmap\/common\/ApiUtil.js", "mapapi:widget\/api\/bmap\/streetview\/StreetViewUtil.js"]
        },
        "mapapi:static\/js\/lib\/tangram.js": {
          "pkg": "mapapi:p0"
        },
        "mapapi:static\/js\/lib\/tangram-patch.js": {
          "pkg": "mapapi:p0",
          "deps": ["mapapi:static\/js\/lib\/tangram.js"]
        },
        "mapapi:widget\/api\/BMap.js": {
          "pkg": "mapapi:p0"
        },
        "mapapi:widget\/api\/bmap\/Map.js": {
          "pkg": "mapapi:p0",
          "deps": ["mapapi:static\/js\/lib\/tangram-patch.js", "mapapi:widget\/api\/BMap.js", "mapapi:widget\/api\/bmap\/layer\/TileMgr.js", "mapapi:widget\/api\/bmap\/common\/MapType.js", "mapapi:widget\/api\/bmap\/common\/Pixel.js", "mapapi:widget\/api\/bmap\/common\/Size.js", "mapapi:widget\/api\/bmap\/common\/ApiUtil.js", "mapapi:widget\/api\/bmap\/overlay\/OverlayInternal.js", "mapapi:widget\/api\/bmap\/geo\/Bounds.js", "mapapi:widget\/api\/bmap\/geo\/Point.js", "mapapi:widget\/api\/bmap\/hotspot\/Hotspot.js", "mapapi:widget\/api\/bmap\/layer\/NormalMapTileLayer.js"]
        },
        "mapapi:widget\/api\/bmap\/common\/Transitions.js": {
          "pkg": "mapapi:p0"
        },
        "mapapi:widget\/api\/bmap\/common\/Animation.js": {
          "pkg": "mapapi:p0",
          "deps": ["mapapi:static\/js\/lib\/tangram-patch.js", "mapapi:widget\/api\/bmap\/common\/ApiUtil.js", "mapapi:widget\/api\/bmap\/common\/Transitions.js"]
        },
        "mapapi:widget\/api\/bmap\/common\/MapConfig.js": {
          "pkg": "mapapi:p0"
        },
        "mapapi:widget\/api\/bmap\/common\/ApiUtil.js": {
          "pkg": "mapapi:p0",
          "deps": ["mapapi:static\/js\/lib\/tangram-patch.js", "mapapi:widget\/api\/bmap\/common\/Pixel.js"]
        },
        "mapapi:widget\/api\/bmap\/common\/DataRequest.js": {
          "pkg": "mapapi:p0",
          "deps": ["mapapi:widget\/api\/bmap\/common\/ApiUtil.js"]
        },
        "mapapi:widget\/api\/bmap\/common\/Pixel.js": {
          "pkg": "mapapi:p0"
        },
        "mapapi:widget\/api\/bmap\/common\/Size.js": {
          "pkg": "mapapi:p0"
        },
        "mapapi:widget\/api\/bmap\/common\/MapType.js": {
          "pkg": "mapapi:p0",
          "deps": ["mapapi:static\/js\/lib\/tangram-patch.js", "mapapi:widget\/api\/bmap\/geo\/MercatorProjection.js", "mapapi:widget\/api\/bmap\/layer\/TileLayer.js"]
        },
        "mapapi:widget\/api\/bmap\/hotspot\/Hotspot.js": {
          "pkg": "mapapi:p0",
          "deps": ["mapapi:static\/js\/lib\/tangram-patch.js", "mapapi:widget\/api\/BMap.js", "mapapi:widget\/api\/bmap\/geo\/Point.js", "mapapi:widget\/api\/bmap\/overlay\/Graph.js"]
        },
        "mapapi:widget\/api\/bmap\/control\/Control.js": {
          "pkg": "mapapi:p0",
          "deps": ["mapapi:static\/js\/lib\/tangram-patch.js", "mapapi:widget\/api\/bmap\/common\/Size.js", "mapapi:widget\/api\/bmap\/common\/ApiUtil.js"]
        },
        "mapapi:widget\/api\/bmap\/control\/ScaleControl.js": {
          "pkg": "mapapi:p0",
          "deps": ["mapapi:static\/js\/lib\/tangram-patch.js", "mapapi:widget\/api\/bmap\/common\/Size.js", "mapapi:widget\/api\/bmap\/control\/Control.js"]
        },
        "mapapi:widget\/api\/bmap\/geo\/Bounds.js": {
          "pkg": "mapapi:p0",
          "deps": ["mapapi:static\/js\/lib\/tangram-patch.js", "mapapi:widget\/api\/bmap\/geo\/Point.js"]
        },
        "mapapi:widget\/api\/bmap\/geo\/Point.js": {
          "pkg": "mapapi:p0"
        },
        "mapapi:widget\/api\/bmap\/geo\/MercatorProjection.js": {
          "pkg": "mapapi:p0",
          "deps": ["mapapi:static\/js\/lib\/tangram-patch.js", "mapapi:widget\/api\/bmap\/common\/Pixel.js", "mapapi:widget\/api\/bmap\/geo\/Point.js"]
        },
        "mapapi:widget\/api\/bmap\/overlay\/Overlay.js": {
          "pkg": "mapapi:p0",
          "deps": ["mapapi:static\/js\/lib\/tangram-patch.js", "mapapi:widget\/api\/BMap.js", "mapapi:widget\/api\/bmap\/common\/ApiUtil.js"]
        },
        "mapapi:widget\/api\/bmap\/overlay\/OverlayInternal.js": {
          "pkg": "mapapi:p0",
          "deps": ["mapapi:static\/js\/lib\/tangram-patch.js", "mapapi:widget\/api\/bmap\/overlay\/Overlay.js"]
        },
        "mapapi:widget\/api\/bmap\/overlay\/OverlayMgr.js": {
          "pkg": "mapapi:p0",
          "deps": ["mapapi:static\/js\/lib\/tangram-patch.js", "mapapi:widget\/api\/BMap.js", "mapapi:widget\/api\/bmap\/overlay\/OverlayInternal.js"]
        },
        "mapapi:widget\/api\/bmap\/overlay\/Graph.js": {
          "pkg": "mapapi:p0",
          "deps": ["mapapi:static\/js\/lib\/tangram-patch.js", "mapapi:widget\/api\/bmap\/common\/ApiUtil.js", "mapapi:widget\/api\/bmap\/geo\/Bounds.js", "mapapi:widget\/api\/bmap\/overlay\/OverlayInternal.js", "mapapi:widget\/api\/bmap\/geo\/Point.js"]
        },
        "mapapi:widget\/api\/bmap\/overlay\/Icon.js": {
          "pkg": "mapapi:p0",
          "deps": ["mapapi:static\/js\/lib\/tangram-patch.js", "mapapi:widget\/api\/bmap\/common\/Size.js"]
        },
        "mapapi:widget\/api\/bmap\/overlay\/Marker.js": {
          "pkg": "mapapi:p0",
          "deps": ["mapapi:static\/js\/lib\/tangram-patch.js", "mapapi:widget\/api\/bmap\/common\/MapConfig.js", "mapapi:widget\/api\/bmap\/common\/Size.js", "mapapi:widget\/api\/bmap\/common\/ApiUtil.js", "mapapi:widget\/api\/bmap\/overlay\/Icon.js", "mapapi:widget\/api\/bmap\/overlay\/Overlay.js", "mapapi:widget\/api\/bmap\/overlay\/OverlayInternal.js", "mapapi:widget\/api\/bmap\/geo\/Point.js"]
        },
        "mapapi:widget\/api\/bmap\/overlay\/Polyline.js": {
          "pkg": "mapapi:p0",
          "deps": ["mapapi:static\/js\/lib\/tangram-patch.js", "mapapi:widget\/api\/bmap\/overlay\/Graph.js", "mapapi:widget\/api\/bmap\/overlay\/OverlayInternal.js"]
        },
        "mapapi:widget\/api\/bmap\/layer\/TileMgr.js": {
          "pkg": "mapapi:p0",
          "deps": ["mapapi:static\/js\/lib\/tangram-patch.js", "mapapi:widget\/api\/BMap.js", "mapapi:widget\/api\/bmap\/common\/Transitions.js", "mapapi:widget\/api\/bmap\/common\/Animation.js", "mapapi:widget\/api\/bmap\/common\/Pixel.js", "mapapi:widget\/api\/bmap\/common\/Size.js", "mapapi:widget\/api\/bmap\/common\/ApiUtil.js", "mapapi:widget\/api\/bmap\/vectormap\/VectorMDLayer.js", "mapapi:widget\/api\/bmap\/layer\/RasterTrafficLayer.js", "mapapi:widget\/api\/bmap\/layer\/Tile.js", "mapapi:widget\/api\/bmap\/layer\/TileLayer.js", "mapapi:widget\/api\/bmap\/geo\/Point.js"]
        },
        "mapapi:widget\/api\/bmap\/layer\/Tile.js": {
          "pkg": "mapapi:p0",
          "deps": ["mapapi:static\/js\/lib\/tangram-patch.js", "mapapi:widget\/api\/bmap\/common\/ApiUtil.js"]
        },
        "mapapi:widget\/api\/bmap\/layer\/TileLayer.js": {
          "pkg": "mapapi:p0",
          "deps": ["mapapi:static\/js\/lib\/tangram-patch.js", "mapapi:widget\/api\/bmap\/common\/ApiUtil.js"]
        },
        "mapapi:widget\/api\/bmap\/layer\/NormalMapTileLayer.js": {
          "pkg": "mapapi:p0",
          "deps": ["mapapi:widget\/api\/bmap\/layer\/TileLayer.js"]
        },
        "mapapi:widget\/api\/bmap\/layer\/RasterTrafficLayer.js": {
          "pkg": "mapapi:p0",
          "deps": ["mapapi:static\/js\/lib\/tangram-patch.js", "mapapi:widget\/api\/bmap\/layer\/TileLayer.js"]
        },
        "mapapi:widget\/api\/bmap\/layer\/SpotshotLayer.js": {
          "pkg": "mapapi:p0",
          "deps": ["mapapi:static\/js\/lib\/tangram-patch.js", "mapapi:widget\/api\/bmap\/layer\/TileLayer.js"]
        },
        "mapapi:widget\/api\/bmap\/vectormap\/VectorMDLayer.js": {
          "pkg": "mapapi:p0",
          "deps": ["mapapi:static\/js\/lib\/tangram-patch.js", "mapapi:widget\/api\/bmap\/layer\/TileLayer.js"]
        },
        "mapapi:widget\/api\/bmap\/streetview\/StreetViewUtil.js": {
          "pkg": "mapapi:p0",
          "deps": ["mapapi:static\/js\/lib\/tangram-patch.js", "mapapi:widget\/api\/bmap\/common\/Pixel.js"]
        },
        "mapapi:widget\/api\/bmap\/streetview\/StreetView.js": {
          "pkg": "mapapi:p0",
          "deps": ["mapapi:static\/js\/lib\/tangram-patch.js", "mapapi:widget\/api\/BMap.js", "mapapi:widget\/api\/bmap\/streetview\/StreetViewUtil.js", "mapapi:widget\/api\/bmap\/streetview\/StreetViewOverlayManager.js"]
        },
        "mapapi:widget\/api\/bmap\/streetview\/StreetViewCoverageLayer.js": {
          "pkg": "mapapi:p0",
          "deps": ["mapapi:widget\/api\/bmap\/streetview\/StreetViewUtil.js", "mapapi:widget\/api\/bmap\/layer\/TileLayer.js"]
        },
        "mapapi:widget\/api\/bmap\/streetview\/StreetViewOverlayManager.js": {
          "pkg": "mapapi:p0",
          "deps": ["mapapi:static\/js\/lib\/tangram-patch.js"]
        },
        "mapapi:widget\/api\/api.js": {
          "pkg": "mapapi:p0",
          "deps": ["mapapi:widget\/api\/BMap.js", "mapapi:widget\/api\/bmap\/Map.js", "mapapi:widget\/api\/bmap\/hotspot\/Hotspot.js", "mapapi:widget\/api\/bmap\/common\/MapType.js", "mapapi:widget\/api\/bmap\/geo\/Point.js", "mapapi:widget\/api\/bmap\/common\/Pixel.js", "mapapi:widget\/api\/bmap\/common\/Size.js", "mapapi:widget\/api\/bmap\/geo\/Bounds.js", "mapapi:widget\/api\/bmap\/layer\/TileLayer.js", "mapapi:widget\/api\/bmap\/layer\/RasterTrafficLayer.js", "mapapi:widget\/api\/bmap\/layer\/SpotshotLayer.js", "mapapi:widget\/api\/bmap\/vectormap\/VectorMDLayer.js", "mapapi:widget\/api\/bmap\/overlay\/Overlay.js", "mapapi:widget\/api\/bmap\/overlay\/OverlayMgr.js", "mapapi:widget\/api\/bmap\/overlay\/Marker.js", "mapapi:widget\/api\/bmap\/overlay\/Icon.js", "mapapi:widget\/api\/bmap\/overlay\/Polyline.js", "mapapi:widget\/api\/bmap\/control\/Control.js", "mapapi:widget\/api\/bmap\/control\/ScaleControl.js", "mapapi:widget\/api\/bmap\/streetview\/StreetView.js", "mapapi:widget\/api\/bmap\/streetview\/StreetViewOverlay.js", "mapapi:widget\/api\/bmap\/streetview\/StreetViewCoverageLayer.js"]
        },
        "common:widget\/apiext\/circleoverlay.js": {
          "url": "simple\/static\/common\/widget\/apiext\/circleoverlay_f9b1c91.js",
          "deps": ["mapapi:widget\/api\/api.js"]
        },
        "common:widget\/apiext\/customicon.js": {
          "url": "simple\/static\/common\/widget\/apiext\/customicon_0bdc1f9.js",
          "deps": ["mapapi:widget\/api\/api.js", "mapapi:widget\/api\/bmap\/common\/Size.js"]
        },
        "common:widget\/apiext\/custommarker.js": {
          "url": "simple\/static\/common\/widget\/apiext\/custommarker_b750bcd.js",
          "deps": ["mapapi:widget\/api\/api.js"]
        },
        "common:widget\/apiext\/geocontrol.js": {
          "url": "simple\/static\/common\/widget\/apiext\/geocontrol_cd30de7.js",
          "deps": ["mapapi:widget\/api\/api.js", "common:widget\/util\/device-util.js", "core:widget\/url\/url.js", "common:widget\/map\/map.js", "core:widget\/geolocation\/location.js", "common:widget\/popup\/popup.js", "core:widget\/stat\/pbstat.js"]
        },
        "common:widget\/apiext\/linestepcontrol.js": {
          "url": "simple\/static\/common\/widget\/apiext\/linestepcontrol_efeeff4.js",
          "deps": ["mapapi:widget\/api\/api.js", "common:widget\/util\/ui-util.js", "core:widget\/stat\/pbstat.js"]
        },
        "common:widget\/apiext\/zoomcontrol.js": {
          "url": "simple\/static\/common\/widget\/apiext\/zoomcontrol_0473564.js",
          "deps": ["mapapi:widget\/api\/api.js", "common:widget\/util\/device-util.js", "core:widget\/stat\/pbstat.js"]
        },
        "common:widget\/apiext\/streetviewcontrol.js": {
          "url": "simple\/static\/common\/widget\/apiext\/streetviewcontrol_85aabba.js",
          "deps": ["mapapi:widget\/api\/api.js", "common:widget\/util\/device-util.js", "core:widget\/url\/url.js", "common:widget\/popup\/popup.js", "core:widget\/stat\/pbstat.js"]
        },
        "common:widget\/apiext\/trafficcontrol.js": {
          "url": "simple\/static\/common\/widget\/apiext\/trafficcontrol_a181d26.js",
          "deps": ["mapapi:widget\/api\/api.js", "core:widget\/util\/url-util.js", "common:widget\/util\/device-util.js", "common:widget\/util\/map-util.js", "common:widget\/popup\/popup.js", "core:widget\/url\/url.js", "common:static\/js\/mapconst.js", "core:widget\/geolocation\/location.js", "core:widget\/stat\/pbstat.js", "common:widget\/map\/map.js"]
        },
        "common:widget\/apiext\/userheading.js": {
          "url": "simple\/static\/common\/widget\/apiext\/userheading_06a6b84.js"
        },
        "common:widget\/apiext\/infowindowoverlay.js": {
          "url": "simple\/static\/common\/widget\/apiext\/infowindowoverlay_3513d89.js",
          "deps": ["mapapi:widget\/api\/api.js", "core:widget\/pagemgr\/pagemgr.js"]
        },
        "common:widget\/apiext\/poiinfowindow.js": {
          "url": "simple\/static\/common\/widget\/apiext\/poiinfowindow_40759aa.js",
          "deps": ["common:static\/js\/mapconst.js", "core:widget\/url\/url.js", "core:widget\/util\/url-util.js", "common:widget\/util\/map-util.js", "core:widget\/geolocation\/location.js", "common:widget\/apiext\/infowindowoverlay.js", "core:widget\/stat\/pbstat.js"]
        },
        "common:widget\/apiext\/trsinfowindow.js": {
          "url": "simple\/static\/common\/widget\/apiext\/trsinfowindow_df607ca.js",
          "deps": ["common:static\/js\/mapconst.js", "common:widget\/util\/map-util.js", "common:widget\/apiext\/infowindowoverlay.js"]
        },
        "common:widget\/apiext\/tfcinfowindow.js": {
          "url": "simple\/static\/common\/widget\/apiext\/tfcinfowindow_aa9420c.js",
          "deps": ["common:static\/js\/mapconst.js", "common:widget\/util\/map-util.js", "common:widget\/apiext\/infowindowoverlay.js"]
        },
        "common:widget\/apiext\/addrinfowindow.js": {
          "url": "simple\/static\/common\/widget\/apiext\/addrinfowindow_cfcaa57.js",
          "deps": ["common:static\/js\/mapconst.js", "core:widget\/url\/url.js", "common:widget\/util\/map-util.js", "common:widget\/apiext\/infowindowoverlay.js", "core:widget\/stat\/pbstat.js"]
        },
        "common:widget\/backtop\/backtop.js": {
          "url": "simple\/static\/common\/widget\/backtop\/backtop_77b45e9.js"
        }
      },
      "pkg": {
        "mapapi:p5": {
          "url": "simple\/static\/mapapi\/pkg\/poly_async_36dc89e.js",
          "has": ["mapapi:widget\/api\/bmap\/overlay\/Graph_Impl.js", "mapapi:widget\/api\/bmap\/overlay\/Polyline_Impl.js", "mapapi:widget\/api\/bmap\/overlay\/Drawer\/Drawer_Impl.js", "mapapi:widget\/api\/bmap\/overlay\/Drawer\/SvgDrawer_Impl.js", "mapapi:widget\/api\/bmap\/overlay\/Drawer\/CanvasDrawer_Impl.js", "mapapi:widget\/api\/bmap\/overlay\/Drawer\/DrawerSelector_Impl.js"]
        },
        "mapapi:p4": {
          "url": "simple\/static\/mapapi\/pkg\/marker_async_83f5528.js",
          "has": ["mapapi:widget\/api\/bmap\/overlay\/OverlayInternal_Impl.js", "mapapi:widget\/api\/bmap\/overlay\/Marker_Impl.js", "mapapi:widget\/api\/bmap\/overlay\/Icon_Impl.js"]
        },
        "mapapi:p1": {
          "url": "simple\/static\/mapapi\/pkg\/streetview_common_async_4b32297.js",
          "has": ["mapapi:widget\/api\/bmap\/streetview\/StreetView_Async.js", "mapapi:widget\/api\/bmap\/streetview\/StreetViewService_Async.js", "mapapi:widget\/api\/bmap\/streetview\/StreetViewTileData_Async.js", "mapapi:widget\/api\/bmap\/streetview\/StreetViewOperation_Async.js", "mapapi:widget\/api\/bmap\/streetview\/StreetViewOverlayManager_Async.js", "mapapi:widget\/api\/bmap\/streetview\/CachePool_Async.js", "mapapi:widget\/api\/bmap\/streetview\/ImagePool_Async.js"]
        },
        "mapapi:p3": {
          "url": "simple\/static\/mapapi\/pkg\/streetview_webgl_async_66ceb7e.js",
          "has": ["mapapi:widget\/api\/bmap\/streetview\/StreetViewGLRenderer_Async.js", "mapapi:widget\/api\/bmap\/streetview\/StreetViewTileGLRenderer_Async.js", "mapapi:widget\/api\/bmap\/streetview\/StreetViewLinksGLRenderer_Async.js", "mapapi:widget\/api\/bmap\/streetview\/GLCircle_Async.js", "mapapi:widget\/api\/bmap\/streetview\/GLMatrix_Async.js", "mapapi:widget\/api\/bmap\/streetview\/GLRing_Async.js", "mapapi:widget\/api\/bmap\/streetview\/GLSphere_Async.js"]
        },
        "mapapi:p2": {
          "url": "simple\/static\/mapapi\/pkg\/streetview_2d_async_ebf1966.js",
          "has": ["mapapi:widget\/api\/bmap\/streetview\/StreetViewRenderer_Async.js", "mapapi:widget\/api\/bmap\/streetview\/StreetViewTileRenderer_Async.js", "mapapi:widget\/api\/bmap\/streetview\/StreetViewLinksRenderer_Async.js"]
        },
        "mapapi:p0": {
          "url": "simple\/static\/mapapi\/pkg\/api_d3ffb1d.js",
          "has": ["mapapi:static\/js\/lib\/tangram.js", "mapapi:static\/js\/lib\/tangram-patch.js", "mapapi:widget\/api\/BMap.js", "mapapi:widget\/api\/bmap\/Map.js", "mapapi:widget\/api\/bmap\/common\/Transitions.js", "mapapi:widget\/api\/bmap\/common\/Animation.js", "mapapi:widget\/api\/bmap\/common\/MapConfig.js", "mapapi:widget\/api\/bmap\/common\/ApiUtil.js", "mapapi:widget\/api\/bmap\/common\/DataRequest.js", "mapapi:widget\/api\/bmap\/common\/Pixel.js", "mapapi:widget\/api\/bmap\/common\/Size.js", "mapapi:widget\/api\/bmap\/common\/MapType.js", "mapapi:widget\/api\/bmap\/hotspot\/Hotspot.js", "mapapi:widget\/api\/bmap\/control\/Control.js", "mapapi:widget\/api\/bmap\/control\/ScaleControl.js", "mapapi:widget\/api\/bmap\/geo\/Bounds.js", "mapapi:widget\/api\/bmap\/geo\/Point.js", "mapapi:widget\/api\/bmap\/geo\/MercatorProjection.js", "mapapi:widget\/api\/bmap\/overlay\/Overlay.js", "mapapi:widget\/api\/bmap\/overlay\/OverlayInternal.js", "mapapi:widget\/api\/bmap\/overlay\/OverlayMgr.js", "mapapi:widget\/api\/bmap\/overlay\/Graph.js", "mapapi:widget\/api\/bmap\/overlay\/Icon.js", "mapapi:widget\/api\/bmap\/overlay\/Marker.js", "mapapi:widget\/api\/bmap\/overlay\/Polyline.js", "mapapi:widget\/api\/bmap\/layer\/TileMgr.js", "mapapi:widget\/api\/bmap\/layer\/Tile.js", "mapapi:widget\/api\/bmap\/layer\/TileLayer.js", "mapapi:widget\/api\/bmap\/layer\/NormalMapTileLayer.js", "mapapi:widget\/api\/bmap\/layer\/RasterTrafficLayer.js", "mapapi:widget\/api\/bmap\/layer\/SpotshotLayer.js", "mapapi:widget\/api\/bmap\/vectormap\/VectorMDLayer.js", "mapapi:widget\/api\/bmap\/streetview\/StreetViewUtil.js", "mapapi:widget\/api\/bmap\/streetview\/StreetView.js", "mapapi:widget\/api\/bmap\/streetview\/StreetViewCoverageLayer.js", "mapapi:widget\/api\/bmap\/streetview\/StreetViewOverlayManager.js", "mapapi:widget\/api\/api.js"]
        }
      }
    });
    LazyLoad.js(["./simple/static/core/pkg/core-js_04b6adb.js", "./simple/static/common/widget/callnatohere/callnatohere_e683123.js", "./simple/static/common/pkg/common_sync_js_1_677d9b3.js", "./simple/static/common/pkg/api-ext_0f5bed6.js", "./simple/static/common/pkg/common_sync_js_0_b0210bf.js", "./simple/static/subway/pkg/subway_3acf6d6.js"],
    function() { (require("common:widget/util/native-util.js")).init();;
      alog('speed.set', 'c_jsld', +new Date);

      window.COM_STAT_CODE = {
        "CROSS_TRANSIT_PLAN_CLICK": "common_1",
        "SHARE_CLICK": "common_2",
        "INDEX_TOP_BANNER_SHOW": "common_3",
        "INDEX_TOP_BANNER_CLICK": "common_4",
        "INDEX_TOP_BANNER_CLOSE": "common_5",
        "GEO_ALL": "common_6",
        "GEO_SUC_ALL": "common_7",
        "SHARE_GEO_FIVE_SUC": "common_8",
        "SHARE_GEO_THIRTY_SUC": "common_9",
        "NATIVE_GEO_SUC": "common_10",
        "WLAN_GEO_SUCCESS": "common_11",
        "PRECISEIP_GEO_SUCESS": "common_12",
        "URL_GEO_SUCESS": "common_13",
        "WLAN_GEO_ERROR": "common_14",
        "HTML5_GEO_ALL": "common_15",
        "WLAN_GEO_RADIUS": "common_16",
        "HTML5_GEO_FAIL": "common_17",
        "HTML5_GEO_SUC": "common_18",
        "HTML5_GET_GEO_SUC": "common_19",
        "NATIVE_GEO_ALL": "common_20",
        "NATIVE_GEO_APINFO_FAIL": "common_21",
        "NATIVE_GEO_FAIL": "common_23",
        "URL_GEO_APINFO_SUC_BACK": "common_25",
        "NATIVE_GEO_GETINFO_SUC": "common_26",
        "SHARE_GEO_SUC": "common_27",
        "URL_GEO_STARTGET": "common_28",
        "TO_DRIVE": "common_29",
        "TO_BUS": "common_30",
        "TO_WALK": "common_31",
        "SUG_ONLINE_SHOW": "common_32",
        "SUG_HISTORY_SEARCH": "common_33",
        "SUG_ONLINE_SEARCH": "common_34",
        "SUG_CLEAR_HISTORY_BTN": "common_35",
        "SUG_HISTORY_SHUTUP": "common_36",
        "NAV_VIEW_MAP": "common_40",
        "SHARESMS_CLICK": "common_41",
        "FRONT_PV_TIMES": "common_42",
        "FRONT_PV_VT": "common_43",
        "STAT_USER_LOGIN_SHOW": "common_44",
        "STAT_USER_MYCENTER_LOGOUT_CLICK": "common_45",
        "STAT_INDEX_HEAD_MYCENTER_CLICK": "common_46",
        "STAT_USER_TO_EXCHANGE_CLICK": "common_47",
        "STAT_USER_TO_RULE_CLICK": "common_48",
        "HEADER_APP_DOWNLOAD": "common_49",
        "HEADER_APP_OPEN": "common_50",
        "FOOTER_MYCENTER_CLICK": "common_51",
        "FOOTER_FEEDBACK_CLICK": "common_52",
        "FOOTER_RECOMMEN_CLICK": "common_53",
        "COVER_APP_DOWNLOAD": "common_54",
        "COVER_APP_OPEN": "common_55",
        "COVER_DISPLAY": "common_56",
        "COVER_HIDE": "common_57",
        "TOP_BANNER_APP_DOWNLOAD": "common_58",
        "TOP_BANNER_APP_OPEN": "common_59",
        "STAT_FROMDESTOP_OPEN": "common_60",
        "STAT_IP_GEO_IN_CITY": "common_61",
        "MAP_GEO_ICON_CLICK": "common_62",
        "MAP_GEO_ADDR_CLICK": "common_63",
        "MAP_MENU_ICON_CLICK": "common_64",
        "MAP_MENU_CHANGE_CITY_CLICK": "common_65",
        "MAP_MENU_SVENTRY_CLICK": "common_66",
        "MAP_MENU_USER_CENTER_CLICK": "common_67",
        "MAP_MENU_FEEDBACK_CLICK": "common_68",
        "MAP_MENU_BDAPP_CLICK": "common_69",
        "MAP_LINE_STEP_PRE": "common_70",
        "MAP_LINE_STEP_NEXT": "common_71",
        "MAP_ZOOMIN_ICON_CLICK": "common_72",
        "MAP_ZOOMOUT_ICON_CLICK": "common_73",
        "MAP_TRAFFIC_ICON_ON": "common_74",
        "MAP_TRAFFIC_ON_PV": "common_75",
        "MAP_TRAFFIC_ICON_OFF": "common_76",
        "MAP_TRAFFIC_OFF_PV": "common_77",
        "MAP_TRAFFIC_TIPS": "common_78",
        "MAP_TRAFFIC_MARKER_CLICK": "common_79",
        "MAP_IW_NB_SEARCH": "common_80",
        "MAP_IW_LINE_SEARCH": "common_81",
        "MAP_IW_DETAIL_SEARCH": "common_82",
        "MAP_IW_BSL_DETAIL": "common_83",
        "MAP_IW_NAV_LIST": "common_84",
        "MAP_IW_WLK_LIST": "common_85",
        "MAP_VECTOR_MARKER_CLICK": "common_86",
        "MAP_GEOLOCATION_MARKER_CLICK": "common_87",
        "MAP_POI_MARKER_CLICK": "common_88",
        "MAP_GR_MARKER_CLICK": "common_89",
        "MAP_NAV_DIR_MARKER_CLICK": "common_90",
        "MAP_BUS_DIR_MARKER_CLICK": "common_91",
        "MAP_WLK_DIR_MARKER_CLICK": "common_92",
        "STAT_USER_LOGIN_SUCCESS": "common_93",
        "TOP_BANNER_APP_ERROR_OPEN": "common_94",
        "TOP_BANNER_APP_ERROR_DOWN": "common_95",
        "TOP_BANNER_APP_ERROR_CANCEL": "common_96",
        "STAT_BUS_SEARCH": "common_97",
        "STAT_NAV_SEARCH": "common_98",
        "STAT_WALK_SEARCH": "common_99",
        "BOTTOM_BANNER_APP_DOWNLOAD": "common_100",
        "BOTTOM_BANNER_APP_OPEN": "common_101",
        "BOTTOM_BANNER_SHOW": "common_102",
        "HEADER_APP_SHOW": "common_103",
        "BACK_TO_ALADDIN": "common_104",
        "STREETVIEW_POI_CLICK": "common_105",
        "STREETVIEW_POI_INTER_CLICK": "common_106",
        "STREETVIEW_INTER_SLIDE_CLICK": "common_107",
        "STREETVIEW_FROM_SHARE_SHOW": "common_108",
        "STREETVIEW_OUTER_PV": "common_109",
        "STREETVIEW_INTER_PV": "common_110",
        "ALADDIN_URL_NAVIGATE": "common_111",
        "NAV_VIEW_DETAIL": "common_112"
      } || {};
      if (!window.COM_STAT_CODE) {
        throw "COM_STAT_CODE parse error";
      }
      window.COM_PB_STAT = {
        "OPEN_FROM_DESKTOP": "openfromdesktop",
        "SHARE_SMS_BTN": "sharesmsbtn",
        "USER_CENTER_BTN": "usercenterbtn",
        "FEEDBACK_BTN": "feedbackbtn",
        "APP_RECOMMEND_BTN": "apprecommendbtn",
        "BUS_SEARCH_BTN": "transitsearchbtn",
        "NAV_SEARCH_BTN": "drivesearchbtn",
        "WALK_SEARCH_BTN": "walksearchbtn",
        "BICYCLE_SEARCH_BTN": "bicyclesearchbtn",
        "PLAN_SWITCH_TAB": "planswitchtab",
        "START_GEO_BTN": "startgeobtn",
        "SET_MYLOC_BTN": "setmylocbtn",
        "MAP_MYLOC_BTN": "mapmylocbtn",
        "TRAFIIC_TURN_ON_BTN": "trafficturnonbtn",
        "TRAFIIC_TURN_OFF_BTN": "trafficturnoffbtn",
        "NO_TRAFFIC_POP": "notrafficpop",
        "ONLINE_SUGG": "onlinesugg",
        "HISTORY_SUGG": "historysugg",
        "ONLINE_SUGG_ITEM": "onlinesuggitem",
        "HISTORY_SUGG_ITEM": "historysuggitem",
        "SUGG_CLOSE_BTN": "suggclosebtn",
        "SUGG_CLEAR_BTN": "suggclearbtn",
        "TEL_BTN": "telbtn",
        "MAP_BTN": "mapbtn",
        "IW_NAV_BTN": "iwnavbtn",
        "IW_NEARBY_BTN": "iwnearbybtn",
        "IW_DETAIL_BTN": "iwdetailbtn",
        "IW_CONFIRM_BTN": "iwconfirmbtn",
        "MAP_STEP_PRE_BTN": "mapprestepbtn",
        "MAP_STEP_NEXT_BTN": "mapnextstepbtn",
        "MAP_ZOOMIN_BTN": "mapzoominbtn",
        "MAP_ZOOMOUT_BTN": "mapzoomoutbtn",
        "LOGIN_SUCCESS": "loginsuccess",
        "LOGIN_BTN": "loginbtn",
        "LOGOUT_BTN": "logoutbtn",
        "HEADER_BANNER": "headerbanner",
        "HEADER_BANNER_CLICK": "headerbannerclick",
        "HEADER_BANNER_GONA_FAIL": "headerbannergonafail",
        "TOP_BANNER_IOS": "topbannerios",
        "TOP_BANNER_ANDROID": "topbannerandroid",
        "TOP_BANNER_CLICK_IOS": "topbannerclickios",
        "TOP_BANNER_CLICK_ANDROID": "topbannerclickandroid",
        "TOP_BANNER_GONA_FAIL": "topbannerclickgonafail",
        "TOP_BANNER_CLOSE_BTN_IOS": "topbannerclosebtnios",
        "TOP_BANNER_CLOSE_BTN_ANDROID": "topbannerclosebtnandroid",
        "COVER_BANNER_IOS": "coverbannerios",
        "COVER_BANNER_ANDROID": "coverbannerandroid",
        "COVER_BANNER_GONA_FAIL": "coverbannergonafail",
        "COVER_BANNER_CLOSE_BTN_IOS": "coverbannerclosebtnios",
        "COVER_BANNER_CLOSE_BTN_ANDROID_WIFI": "coverbannerclosebtnandroidwifi",
        "COVER_BANNER_CLOSE_BTN_ANDROID_NOTWIFI": "coverbannerclosebtnandroidnotwifi",
        "BOTTOM_BANNER_IOS": "bottombannerios",
        "BOTTOM_BANNER_ANDROID": "bottombannerandroid",
        "BOTTOM_BANNER_CLICK_IOS": "bottombannerclickios",
        "BOTTOM_BANNER_CLICK_ANDROID_WIFI": "bottombannerclickandroidwifi",
        "BOTTOM_BANNER_CLICK_ANDROID_NOTWIFI": "bottombannerclickandroidnotwifi",
        "BOTTOM_BANNER_GONA_FAIL": "bottombannergonafail",
        "BOTTOM_BANNER_CLOSE_BTN_IOS": "bottombannerclosebtnios",
        "BOTTOM_BANNER_CLOSE_BTN_ANDROID": "bottombannerclosebtnandroid",
        "FOOTER_BANNER": "footerbanner",
        "SEARCH_CONTAIN_MYLOC": "searchcontainmyloc",
        "SEARCH_NOT_CONTAIN_MYLOC": "searchnotcontainmyloc",
        "DOWNLOAD_APP_TOPBANNER": "downloadapptopbanner",
        "DOWNLOAD_CANCEL_TOPBANNER": "downloadcanceltopbanner",
        "DOWNLOAD_APP_BOTTOMBANNER": "downloadappbottombanner",
        "DOWNLOAD_CANCEL_BOTTOMBANNER": "downloadcancelbottombanner",
        "DOWNLOAD_APP_DRIVE_IOS": "downloadappdriveios",
        "DOWNLOAD_CANCEL_DRIVENAV_IOS": "downloadcanceldrivenavios",
        "DOWNLOAD_APP_DRIVENAV_ANDROID": "downloadappdrivenavandroid",
        "DOWNLOAD_CANCEL_DRIVENAV_ANDROID": "downloadcanceldrivenavandroid",
        "DOWNLOAD_APP_WALKNAV_ANDROID": "downloadappwalknavandroid",
        "DOWNLOAD_CANCEL_WALKNAV_ANDROID": "downloadcancelwalknavandroid",
        "DOWNLOAD_APP_WALKNAV_IOS": "downloadappwalknavios",
        "DOWNLOAD_CANCEL_WALKNAV_IOS": "downloadcancelwalknavios",
        "DOWNLOAD_APP_COVER": "downloadappcover",
        "STREETVIEW_ENTRY_ICON": "streetviewentryicon",
        "STREETVIEW_ENTRY_BUBBLE": "streetviewentrybubble",
        "STREETVIEW_CALLOUT_WELLCOVER": "streetviewcalloutwellcover",
        "STREETVIEW_GYRO_ON": "streetviewgyroon",
        "STREETVIEW_GYRO_OFF": "streetviewgyrooff",
        "STREETVIEW_INTER_ENTRY_ICON": "streetviewinterentryicon",
        "STREETVIEW_POI_BUBBLE": "streetviewpoibubble",
        "STREETVIEW_NIGHT_VIEW_ON": "streetviewnightviewon",
        "STREETVIEW_EYE_MAP_EXPAND": "streetvieweyemapexpand",
        "STREETVIEW_EYE_MAP_COLLAPSE": "streetvieweyemapcollapse",
        "STREETVIEW_EYE_MAP_EXPAND_INTER": "streetvieweyemapexpandinter",
        "STREETVIEW_EYE_MAP_COLLAPSE_INTER": "streetvieweyemapcollapseinter",
        "STREETVIEW_INTER_IMGEXIT_CLICK": "streetviewinterimgexitclick",
        "STREETVIEW_EYE_MAP_TRANSFORM_SCENE": "streetvieweyemaptransformscene",
        "STREETVIEW_FULLSCREEN": "streetviewfullscreen",
        "STREETVIEW_INTER_ALBUM_SWITCH": "streetviewinteralbumswitch",
        "STREETVIEW_INTER_DISPLAY": "streetviewinterdisplay",
        "STREETVIEW_LINK_CLICK": "streetviewlinkclick",
        "WEBP_LOSSY_TRUE": "webplossytrue",
        "WEBP_LOSSY_FALSE": "webplossyfalse",
        "WEBP_LOSSLESS_TRUE": "webplosslesstrue",
        "WEBP_LOSSLESS_FALSE": "webplosslessfalse",
        "STREETVIEW_DBLCLICK_ZOOM": "streetviewdblclickzoom",
        "STREETVIEW_PINCH_ZOOM": "streetviewpinchzoom",
        "STREETVIEW_WEBGL_RENDER_IOS": "streetviewwebglrenderios",
        "STREETVIEW_WEBGL_RENDER_ANDROID": "streetviewwebglrenderandroid",
        "STREETVIEW_CSS_RENDER_IOS": "streetviewcssrenderios",
        "STREETVIEW_CSS_RENDER_ANDROID": "streetviewcssrenderandroid",
        "STREETVIEW_CLICK_ON_ROAD": "streetviewclickonroad",
        "STREETVIEW_TO_HORIZON": "streetviewtohorizon",
        "STREETVIEW_TO_VERTICAL": "streetviewtovertical",
        "COMMON_NAV_TO_MAP": "commonnavtomap",
        "MAPBANNER_STRONG_SHOW_IOS": "mapbannerstrongshowios",
        "MAPBANNER_STRONG_SHOW_ANDROID": "mapbannerstrongshowandroid",
        "MAPBANNER_WEAK_SHOW_IOS": "mapbannerweakshowios",
        "MAPBANNER_WEAK_SHOW_ANDROID": "mapbannerweakshowandroid",
        "MAPBANNER_CLICK_IOS": "mapbannerclickios",
        "MAPBANNER_CLICK_ANDROID_WIFI": "mapbannerclickandroidwifi",
        "MAPBANNER_CLICK_ANDROID_NOTWIFI": "mapbannerclickandroidnotwifi",
        "CALL_NA_GOTO_WEIXIN": "callnagotoweixin",
        "CALL_NA_SPECIAL_BROSWER_TIP": "callnaspecialbroswertip",
        "CALLNA_TOHERE_LIST": "callnatoherelist",
        "CALLNA_TOHERE_TRANSIT": "callnatoheretransit",
        "CALLNA_TOHERE_DRIVING": "callnatoheredriving",
        "CALLNA_TOHERE_WALKING": "callnatoherewalking",
        "CALLNA_TOHERE_RIDING": "callnatohereriding"
      } || {};
      if (!window.COM_PB_STAT) {
        throw "COM_PB_STAT parse error";
      }

      require('common:widget/monitor/monitor.js').init();
      require('common:widget/initapp/initapp.js').init();
      require('common:widget/geolocation/initgeo.js').init();

      if (window.eventRecorder) {
        window.eventRecorder.stop();
      }
      window.addEventListener('load',
      function() {
        setTimeout(function() {
          if (window.eventRecorder) {
            window.eventRecorder.play();
            window.eventRecorder = null;
            try {
              delete window.eventRecorder;
            } catch(e) {}
          }
          require.async("common:widget/backtop/backtop.js",
          function(exports) {
            exports.init()
          });
          require.loadCss({
            url: "./simple/static/common/widget/async-legacy-css/async-legacy-css.inline_8a52fd1.css"
          });
        },
        0);
      });

      ;
      require('common:widget/map/preloader/preloader.js').init();;
      if (appPage.switchedPage) {
        return;
      };
      window._APP_HASH = {
        module: "subway",
        action: "show",
        page: "show",
        da_page: "subwaypg",
        third_party: null || ''
      };
      window._STAT_INFO = {
        ldata: null,
        da_trd: null || '',
        mmaptrdtwo: null || '',
        da_ad: null || ''
      };

      window._MAP_BOUNDS = null || '';

      STAT_CODE = {
        "SUBWAY_STATION_MARKER_CLICK": "subway_1",
        "SUBWAY_IW_NB_SEARCH": "subway_2",
        "SUBWAY_IW_LINE_SEARCH": "subway_3",
        "SUBWAY_IW_DETAIL_SEARCH": "subway_4"
      } || {};
      if (!STAT_CODE) {
        throw "STAT_CODE parse error";
      }
      PB_STAT = null || {};
      if (!PB_STAT) {
        throw "PB_STAT parse error";
      }

      window._CURRENT_CITY = null || {};

      require('core:widget/geolocation/initLocation.js').changeCity(true);

      ;
      
      var isReplace = 0 ? true: false; (require("common:widget/nav/nav.js")).init(isReplace);; (require('subway:widget/zoomcontrol/zoomcontrol.js')).init();;
      var model = require('subway:static/js/model/subway.js');
      var locator = require('core:widget/geolocation/location.js');
      var data = {
        "city": 289,
        "cityNode": ["shanghai", "\u4e0a\u6d77", "289"],
        "version": 1464233958
      };
      var default_city = locator.getCityCode() > 1 ? locator.getCityCode() : '';
      data.city = data.city && data.city != 1 ? data.city: default_city;

      model.fetch(data,
      function(data) {
        if (data.shortName) {
          $('.common-widget-nav .title span').text(data.shortName + '地铁');
        }
        var subway = require('subway:widget/subway/subway.js');
        SUBWAY=subway;
        subway.init(data);
        $("#swZoomControl").css({
          "visibility": ""
        });
      },
      function(error) {
        var text = "您所在的城市不支持地铁专题图";
        window.bottombanner_hide = true;
        if (error > -1) {
          text = "数据获取失败，请刷新页面"
        }

        var popup = require('common:widget/popup/popup.js');
        popup.open({
          'text': text
        });
        if (error < -1) {
          setTimeout(function() {
            var url = require('core:widget/url/url.js');
            url.update({
              'module': 'index',
              'action': 'setsubwaycity'
            });
          },
          2000);
        }
      });;
      appPage.asyncLoad([{
        id: "common-bottombanner-widget-fis",
        useCache: true
      },
      {
        id: "common-footer-widget",
        useCache: true
      }], null);;
      return;
    })
    
    
    //添加功能
    
    //线路高亮
    function setHighlightLine(lineName){
    	$(".stationSelector").each(function(index,element){
    		var ln=$(element).attr("ln");
    		if(ln.indexOf(lineName)!=-1){
    			$(element).removeClass("transparentObj");
    		}else{
    			$(element).addClass("transparentObj");
    		}
    	});
    	$(".lineSelector").each(function(index,element){
    		var lid=$(element).attr("lid");
    		if(lid.indexOf(lineName)!=-1){
    			$(element).removeClass("transparentObj");
    		}else{
    			$(element).addClass("transparentObj");
    		}
    	});
    }
    function setHighlight4G(){
    	$(".stationSelector").each(function(index,element){
    		var ntType=$(element).attr("ntType");
    		if(ntType=="4g"){
    			$(element).removeClass("transparentObj");
    		}else{
    			$(element).addClass("transparentObj");
    		}
    	});
    	$(".lineSelector").each(function(index,element){
    		$(element).addClass("transparentObj");
    	});
    }
    function setHighlight23G(){
    	$(".stationSelector").each(function(index,element){
    		var ntType=$(element).attr("ntType");
    		if(ntType=="3g"){
    			$(element).removeClass("transparentObj");
    		}else{
    			$(element).addClass("transparentObj");
    		}
    	});
    	$(".lineSelector").each(function(index,element){
    		$(element).addClass("transparentObj");
    	});
    }
    function setHighlightUpon(){
    	$(".stationSelector").each(function(index,element){
    		var type=$(element).attr("stationType");
    		if(type!="地下"){
    			$(element).removeClass("transparentObj");
    		}else{
    			$(element).addClass("transparentObj");
    		}
    	});
    	$(".lineSelector").each(function(index,element){
    		$(element).addClass("transparentObj");
    	});
    }
    function setHighlightDown(){
    	$(".stationSelector").each(function(index,element){
    		var type=$(element).attr("stationType");
    		if(type=="地下"){
    			$(element).removeClass("transparentObj");
    		}else{
    			$(element).addClass("transparentObj");
    		}
    	});
    	$(".lineSelector").each(function(index,element){
    		$(element).addClass("transparentObj");
    	});
    }
    function setHighlightEx(){
    	$(".stationSelector").each(function(index,element){
    		var type=$(element).attr("ex");
    		if(type=="true"){
    			$(element).removeClass("transparentObj");
    		}else{
    			$(element).addClass("transparentObj");
    		}
    	});
    	$(".lineSelector").each(function(index,element){
    		$(element).addClass("transparentObj");
    	});
    }
    
    function setHighlightUncontinuous(){
    	$(".stationSelector").each(function(index,element){
    		var type=$(element).attr("uc");
    		if(type=="true"){
    			$(element).removeClass("transparentObj");
    		}else{
    			$(element).addClass("transparentObj");
    		}
    	});
    	$(".lineSelector").each(function(index,element){
    		$(element).addClass("transparentObj");
    	});
    }
    
    function resetHighlight(){
    	$(".stationSelector").each(function(index,element){
    		$(element).removeClass("transparentObj");
    	});
    	$(".lineSelector").each(function(index,element){
    		$(element).removeClass("transparentObj");
    	});
    }
    
    function legendClick(evt){
    	var legendLb=$(evt.currentTarget).text();
    	switch(legendLb){
    		case "换乘站":
    			setHighlightEx();
    			break;
    		case "地面站":
    			setHighlightUpon();
    			break;
    		case "地下站":
    			setHighlightDown();
    			break;
    		case "2，3G":
    			setHighlight23G();
    			break;
    		case "4G":
    			setHighlight4G();
    			break;
    		case "无4G覆盖地下站":
    			setHighlightUncontinuous();
    			break;
    		case "显示全部":
    			resetHighlight();
    			break;
   			default:
   				setHighlightLine("地铁"+legendLb+"号线");
   				NS_SW_chooseLineBySwf(legendLb);
   				break;
    	}
    }
    
    function getStationBgJQByName(station){
    	return $(".stationBgCircleSelector[stationName='"+station+"']");
    }
    
    $(document).ready(function(){
    	$(".legend").on('click',legendClick);
    	$("#ctrlDiv").css("left",$(document).width()-220)
    	if("true"=="<%=isScreenMode%>"){
			$("#rankChartWin").css("display","block");
		}else{
			//$("#zoomBtn").css("display","inline-block");
		}
    });
    </script>
