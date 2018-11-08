define("mapapi:widget/api/bmap/vectormap/VectorDrawLib_Impl2.js",function(t,e,i){var a=t("mapapi:static/js/lib/tangram-patch.js"),r=t("mapapi:widget/api/bmap/common/DataRequest.js"),n=(t("mapapi:widget/api/bmap/geo/Point.js"),a.lang.Event),s=t("mapapi:widget/api/bmap/common/ApiUtil.js"),o=0,l=1,h=2,d=3,f=4,v=5,c=6,p=function(t){this.featureStyle=window.FeatureStyle,this.iconSetInfoHigh=window.iconSetInfo_high,this.iconURLs=["http://online1.map.bdimg.com/sty/vpl_icons/","http://online2.map.bdimg.com/sty/vpl_icons/","http://online3.map.bdimg.com/sty/vpl_icons/","http://online4.map.bdimg.com/sty/vpl_icons/"],this.vectorDataURLs=["http://online1.map.bdimg.com/pvd/?qt=tile","http://online2.map.bdimg.com/pvd/?qt=tile","http://online3.map.bdimg.com/pvd/?qt=tile","http://online4.map.bdimg.com/pvd/?qt=tile"],this.mergeDataURLs=["http://map.baidu.com/mobile/?qt=lgvd2","http://map.baidu.com/mobile/?qt=lgvd2","http://map.baidu.com/mobile/?qt=lgvd2","http://map.baidu.com/mobile/?qt=lgvd2"],this.arrLineCap=["round","butt","square"],this.arrLineJoin=["miter","round","bevel"],this.arrTrafficStyles=[[2,"80,191,57,1",2,2,0,[],0,0],[2,"80,191,57,1",3,2,0,[],0,0],[2,"80,191,57,1",4,2,0,[],0,0],[2,"80,191,57,1",5,2,0,[],0,0],[2,"80,191,57,1",6,2,0,[],0,0],[2,"255,159,25,1",2,2,0,[],0,0],[2,"255,159,25,1",3,2,0,[],0,0],[2,"255,159,25,1",4,2,0,[],0,0],[2,"255,159,25,1",5,2,0,[],0,0],[2,"255,159,25,1",6,2,0,[],0,0],[2,"242,48,48,1",2,2,0,[],0,0],[2,"242,48,48,1",3,2,0,[],0,0],[2,"242,48,48,1",4,2,0,[],0,0],[2,"242,48,48,1",5,2,0,[],0,0],[2,"242,48,48,1",6,2,0,[],0,0],[2,"255,255,255,1",4,0,0,[],0,0],[2,"255,255,255,1",5.5,0,0,[],0,0],[2,"255,255,255,1",7,0,0,[],0,0],[2,"255,255,255,1",8.5,0,0,[],0,0],[2,"255,255,255,1",10,0,0,[],0,0]],this.tileMgr=t,this.map=t.map,this.mapType=this.map.getMapType(),this.ratio=this.map.config.devicePixelRatio,this.tileSize=this.mapType.getTileSize(),this.trafficTimeStamp=(new Date).getTime(),this.trafficInterval=3e5,this.isTrafficChange=!1,this.isIphone=a.platform.isIphone,this.versionInfo=null;var e=document.createElement("canvas").getContext("2d");this.isSupportDashedLine=!!e.setLineDash,this.labelCount=0,this.isLabelTimeout=!1,this.iconCache={},this.initVectorMap()};p.prototype={initVectorMap:function(){var t=this,e=t.tileMgr,i=t.map,a=e._createDiv(0);a.style.WebkitTransform="translate3d(0px,0px,0)",t._vectorDiv=a,e._vectorLayerContainer.appendChild(a),t.createLabelCanvas(),setTimeout(function(){i.addEventListener("onmoveend",function(e){"centerAndZoom"!=e._eventSrc&&(t.isTrafficChange=!1,t.drawVectorMap())}),i.addEventListener("onzoomend",function(e){"centerAndZoom"!=e._eventSrc&&(t.isTrafficChange=!1,t.clearLabel(),t.drawVectorMap())}),i.addEventListener("centerandzoom",function(){t.isTrafficChange=!1,t.clearLabel(),t.drawVectorMap()})},1),i.addEventListener("onresize",function(){t.resizeLabelCanvas(),t.isTrafficChange=!1,t.drawVectorMap()}),t.drawVectorMap()},createLabelCanvas:function(){var t=this.map,e=t.tileMgr,i=this.ratio,a=t.getSize(),r=a.width,n=a.height,o=s.create("canvas"),l=o.style;l.cssText="position: absolute;left:0;top:0;width:"+r+"px;height:"+n+"px;z-index:2;",o.width=r*i,o.height=n*i,this.labelCanvas=o,this.labelCtx=o.getContext("2d"),this.labelCtx.scale(i,i),this.labelCtx.textBaseline="top",e._vectorLayerContainer.appendChild(o),t._labelCanvas=o},resizeLabelCanvas:function(){var t=this.map,e=this.ratio,i=t.getSize(),a=i.width,r=i.height,n=this.labelCanvas,s=n.style;s.width=a+"px",s.height=r+"px",n.width=a*e,n.height=r*e,this.labelCtx.scale(e,e),this.labelCtx.textBaseline="top"},reDrawVectorMap:function(){for(var t=this._vectorDiv,e=0,i=t.childNodes.length;i>e;e++)t.childNodes[e]._drawFinished=!1;this.isTrafficChange=!0,this.drawVectorMap()},drawVectorMap:function(){var t=this,e=t.map,i=e.getZoom(),a=e.getCenter(),r=t._vectorDiv;if(!(i>=e.config.vectorMapLevel))return r.style.display="none",void(r.innerHTML="");if(r.style.display="block",e.enableLoadTiles){var s=(new Date).getTime();s-t.trafficTimeStamp>=t.trafficInterval&&(t.trafficTimeStamp=s),this.curViewLabels=[];var o=t.getTilesInfo(),l=o.length;if(0===l)return void this.updateLabel();this.labelCount=l,this.isLabelTimeout=!1;var h="viewKey_"+Math.floor(a.lng)+"_"+Math.floor(a.lat)+"_"+i;e.dispatchEvent(new n("onvectorbegin"));for(var d=0;l>d;d++){var f=o[d][2],v=o[d][0],c=o[d][1];f._drawFinished=!1,this.loadData(v,c,i,f,h)}t.errorTimer&&clearTimeout(t.errorTimer),t.errorTimer=setTimeout(function(){t.isLabelTimeout=!0,t.labelCount=0,t.updateLabel()},1e3)}},getVectorVersionInfo:function(){if(this.versionInfo)return this.versionInfo;var t="undefined"!=typeof TVC?TVC.ditu.normal:{},e=t.version?t.version:"001",i=t.updateDate?t.updateDate:"20150621";return this.versionInfo={ver:e,udt:i},this.versionInfo},getIconVersionInfo:function(){if(this.iconVersionInfo)return this.iconVersionInfo;var t="undefined"!=typeof MSV?MSV.mapstyle:{},e=t.version?t.version:"001",i=t.updateDate?t.updateDate:"20150621";return this.iconVersionInfo={ver:e,udt:i},this.iconVersionInfo},getTilesInfo:function(){var t=this.map,e=this.mapType,i=t.getZoom(),a=t.mercatorCenter,r=e.getZoomUnits(i),n=e.getZoomFactor(i),s=t.guid.replace(/^TANGRAM_/,""),o=Math.ceil(a.lng/n);column=Math.ceil(a.lat/n);var l=this.tileSize,h=[o,column,(a.lng-o*n)/n*l,(a.lat-column*n)/n*l],d=h[0]-Math.ceil((t.width/2-h[2])/l),f=h[1]-Math.ceil((t.height/2-h[3])/l),v=h[0]+Math.ceil((t.width/2+h[2])/l),c=h[1]+Math.ceil((t.height/2+h[3])/l);this.tilesOrder?this.tilesOrder.length=0:this.tilesOrder=[];for(var p=d;v>p;p++)for(var u=f;c>u;u++)this.tilesOrder.push([p,u]);this.tilesOrder.sort(function(t){return function(e,i){return.4*Math.abs(e[0]-t[0])+.6*Math.abs(e[1]-t[1])-(.4*Math.abs(i[0]-t[0])+.6*Math.abs(i[1]-t[1]))}}([h[0]-1,h[1]-1]));var g=-a.lng/r,m=a.lat/r,w=[Math.round(g),Math.round(m)],b=-t.offsetX+t.width/2,y=-t.offsetY+t.height/2,x=this._vectorDiv;x.style.left=b+"px",x.style.top=y+"px",this.arrOldCanvas?this.arrOldCanvas.length=0:this.arrOldCanvas=[];for(var p=0,T=x.childNodes.length;T>p;p++){var C=x.childNodes[p];C._isInCurrentView=!1,this.arrOldCanvas.push(C)}var P=this.objInCanvas;if(P)for(var L in P)delete P[L];else this.objInCanvas={};this.arrOutCanvas?this.arrOutCanvas.length=0:this.arrOutCanvas=[];for(var p=0,T=this.tilesOrder.length;T>p;p++)for(var I=this.tilesOrder[p][0],_=this.tilesOrder[p][1],u=0,X=this.arrOldCanvas.length;X>u;u++){var Y=this.arrOldCanvas[u];if(Y.id==s+"_"+I+"_"+_+"_"+i){Y._isInCurrentView=!0,this.objInCanvas[Y.id]=Y;break}}for(var p=0,T=this.arrOldCanvas.length;T>p;p++){var Y=this.arrOldCanvas[p];Y._isInCurrentView||(Y._vtd=null,delete Y._vtd,Y._drawFinished=!1,this.arrOutCanvas.push(Y))}this.tilesInfo=[];for(var S=l*this.ratio,p=0,T=this.tilesOrder.length;T>p;p++){var I=this.tilesOrder[p][0],_=this.tilesOrder[p][1],D=I*l+w[0],M=(-1-_)*l+w[1],k=s+"_"+I+"_"+_+"_"+i,O=this.objInCanvas[k],V=null;if(O)V=O.style,V.left=D+"px",V.top=M+"px",O._drawFinished?O._vtd&&O._vtd._arrLabelInfo&&this.curViewLabels.push(O._vtd._arrLabelInfo):(O._vtd=null,delete O._vtd,this.tilesInfo.push([I,_,O]));else{if(this.arrOutCanvas.length>0){O=this.arrOutCanvas.shift();var F=O.getContext("2d");F.clearRect(0,0,S,S),V=O.style}else O=document.createElement("canvas"),V=O.style,V.position="absolute",V.background="#F5F3F0",V.width=l+"px",V.height=l+"px",O.setAttribute("width",S),O.setAttribute("height",S),x.appendChild(O);O.id=k,V.left=D+"px",V.top=M+"px",this.tilesInfo.push([I,_,O])}O.style.visibility=""}for(var p=0,T=this.arrOutCanvas.length;T>p;p++)this.arrOutCanvas[p].style.visibility="hidden";return this.tilesInfo},loadData:function(t,e,i,a,n){var s=this,o=s.map,l=s.vectorDataURLs,h=Math.abs(t+e)%l.length,d="x="+t+"&y="+e+"&z="+i,f=s.getVectorVersionInfo(),v=f.ver,c=f.udt,p=o.config.trafficStatus,u="_"+(0>t?"_":"")+(0>e?"$":"")+(p?"traffic":""),g=u+parseInt(Math.abs(t)+""+Math.abs(e)+i).toString(36),m=p?"&trafficstamp="+s.trafficTimeStamp+"&":"&",w=s.mergeDataURLs,b=p?w:l,y=i>=3&&9>=i?100:80,x=b[h]+m+d+"&styles=pl&p=1&limit="+y+"&v="+v+"&udt="+c+"&fn=window."+g;window._EXP_INFO&&1===window._EXP_INFO.useXijiangData&&(x+="&hitxijiangtest=1"),window[g]=function(r){var l=o.getCenter(),h=o.getZoom(),d="viewKey_"+Math.floor(l.lng)+"_"+Math.floor(l.lat)+"_"+h;if(d===n){var f=r,v=o.config.trafficStatus;v&&(f=r[0],f.trafficData=r[1]),s.drawBackGround(f,a,t,e,i,l);var c=s.calcIconAndTextInfo(f,t,e,i);f._arrLabelInfo=c,a._vtd=f,s.curViewLabels.push(c),s.isLabelTimeout===!1&&s.labelCount--,(0===s.labelCount||s.isLabelTimeout===!0)&&s.updateLabel()}delete window[g]},r.request(x)},drawBackGround:function(t,e,i,a,r,n){var s=this,o=e.getContext("2d");s.ratio>1&&!e._scale&&(o.scale(s.ratio,s.ratio),e._scale=!0);var l=s.featureStyle,h=s.tileSize;o.fillStyle="#F5F3F0",o.fillRect(0,0,h,h);for(var d=t[2]||[],f=[],p=[],u=0,g=d.length;g>u;u++){var m=d[u],w=l[m[5]];w[0]===v?(m=s.parseFeature(m,h),m.style0=w,m[4]&&"090301"===m[4]?f.push(m):s.drawPolygon(o,m)):w[0]===c&&(m=s.parseFeature(m,h),m.style0=w,p.push(m))}s.isTrafficChange===!0?s.drawRoads(o,t,e,f,p,i,a,r):setTimeout(function(){var l=s.map.getCenter(),h=s.map.getZoom();l.equals(n)&&h===r&&s.drawRoads(o,t,e,f,p,i,a,r)},10)},drawRoads:function(t,e,i,a,r,n,s,o){for(var l=this,h=l.featureStyle,d=l.tileSize,v=e[1]||[],c=[],p=[],u=[],g={crossoverBridge:[],underGroundRoad:[]},m=0,w=v.length;w>m;m++){var b=v[m],y=b[5],x=y.split(","),T=null,C=null,P=x.length;1==P?T=h[x[0]]:2==P?(T=h[x[0]],C=h[x[1]]):3==P&&(T=h[x[0]],C=h[x[1]]),T&&T[0]===f&&(b=l.parseFeature(b,d),b.style0=T,b.style1=C,o>=17&&("1.0,6.0"===T[3]||"1.0,10.0"===T[3])&&(T[3]=null),b[4]&&b[4].indexOf("050202")>-1?p.push(b):o>=17&&b[4]&&b[4].indexOf("040C05")>-1?g.crossoverBridge.push(b):o>=17&&b[4]&&b[4].indexOf("040C04")>-1?g.underGroundRoad.push(b):c.push(b)),o>=18&&b[10]&&b[10].length>0&&u.push(b[10])}if(l.renderRoad(t,c,g,o),o>=17)for(var L=e[3]||[],m=0,w=L.length;w>m;m++){var b=l.parseFeature(L[m],d),y=b[5],x=y.split(","),T=h[x[0]];C=h[x[1]],l.drawPolyline(t,b[0],T),l.drawPolyline(t,b[0],C)}if(o>=18){t.strokeStyle="rgba(0,0,0,0.3)",t.fillStyle="rgba(0,0,0,0.3)",t.lineWidth=1.5,t.lineCap="butt",t.lineJoin="miter";for(var m=0,w=u.length;w>m;m++)for(var I=u[m],_=0,X=I.length;X>_;_++){var Y=I[_],S=Y[0],D=S[0][0],M=S[1][0];D[1]=d-D[1],M[1]=d-M[1],l.drawArrow(t,D,M,t.lineWidth)}}if(o>=18)for(var m=0,w=r.length;w>m;m++){var b=r[m];l.draw3DBuilding(t,b)}if(o>=12){for(var m=0,w=p.length;w>m;m++){var b=p[m];l.drawPolyline(t,b[0],b.style0),l.drawPolyline(t,b[0],b.style1)}for(var m=0,w=a.length;w>m;m++)l.drawPolygon(t,a[m])}var k=l.map.config.trafficStatus;k&&e.trafficData&&l.drawTraffic(t,e.trafficData),i._drawFinished=!0},parseFeature:function(t,e){for(var i=t[0],a=0,r=0,n=0,s=i.length;s>n;n++)a+=i[n][0],r+=i[n][1],i[n][0]=a,i[n][1]=e-r;return t},parseTrafficFeature:function(t){for(var e=t[1],i=0,a=0,r=0,n=e.length;n>r;r+=2)i+=e[r]/10,a+=e[r+1]/10,e[r]=i,e[r+1]=a;return t},drawPolygon:function(t,e){var i=e.style0,a=i[1],r=e[0];t.fillStyle="rgba("+a+")",t.strokeStyle=t.fillStyle,t.beginPath(),t.moveTo(r[0][0],r[0][1]);for(var n=1,s=r.length;s>n;n++)t.lineTo(r[n][0],r[n][1]);t.closePath(),t.fill();var o=i[3];o&&(t.lineWidth=o,t.stroke())},drawPolyline:function(t,e,i){t.beginPath(),t.moveTo(e[0][0],e[0][1]);for(var a=1,r=e.length;r>a;a++)t.lineTo(e[a][0],e[a][1]);t.strokeStyle="rgba("+i[1]+")",t.lineCap=this.arrLineCap[i[4]],t.lineJoin=this.arrLineJoin[i[5]],t.lineWidth=i[2],t.stroke()},renderRoad:function(t,e,i,a){if(a>=17){for(var r=i.underGroundRoad,n=0,s=r.length;s>n;n++){var o=r[n];this.drawPolyline(t,o[0],o.style0)}for(var n=0,s=r.length;s>n;n++){var o=r[n];this.drawPolyline(t,o[0],o.style1)}for(var n=0,s=e.length;s>n;n++){var o=e[n],l=o.style0,h=o.style1;this.isDashedLine(l,h)?o.isDashed=!0:this.drawPolyline(t,o[0],l)}for(var n=0,s=e.length;s>n;n++){var o=e[n],l=o.style0,h=o.style1;o.isDashed?this.drawDashedPolyline(t,o[0],l,h):h&&this.drawPolyline(t,o[0],h)}for(var d=i.crossoverBridge,n=0,s=d.length;s>n;n++){var o=d[n];this.drawPolyline(t,o[0],o.style0)}for(var n=0,s=d.length;s>n;n++){var o=d[n];this.drawPolyline(t,o[0],o.style1)}}else for(var n=0,s=e.length;s>n;){for(var o=e[n],f=o[4],v=this.getRoadLevel(f),c=n+1;s>c;c++){var p=e[c],u=p[4],g=this.getRoadLevel(u);if(v!=g)break}for(var m=n;c>m;m++){var w=e[m],l=w.style0,h=w.style1;this.isDashedLine(l,h)?w.isDashed=!0:this.drawPolyline(t,w[0],l)}for(var m=n;c>m;m++){var w=e[m],l=w.style0,h=w.style1;w.isDashed?this.drawDashedPolyline(t,w[0],l,h):h&&this.drawPolyline(t,w[0],h)}n=c}},getRoadLevel:function(t){return t&&t.indexOf("0C08")>-1?8:t&&t.indexOf("0C01")>-1?1:0},isDashedLine:function(t,e){return t[3]&&t[3].length>0||e&&e[3]&&e[3].length>0?!0:!1},drawDashedPolyline:function(t,e,i,a){var r,n,s,o,l,h,d,f,v;a&&a[3]&&a[3].length>0?(r=i[2],n=a[2],s="rgba("+i[1]+")",o="rgba("+a[1]+")",arrDash=a[3].split(","),l=arrDash[0],h=this.arrLineCap[i[4]],d=this.arrLineCap[a[4]],f=this.arrLineJoin[i[5]],v=this.arrLineJoin[a[5]]):(r=i[2],n=r,s="rgba(0,0,0,0)",o="rgba("+i[1]+")",arrDash=i[3].split(","),l=arrDash[0],h=this.arrLineCap[i[4]],d=h,f=this.arrLineJoin[i[5]],v=f),t.beginPath(),t.lineWidth=r,t.strokeStyle=s,t.lineCap=h,t.lineJoin=f,t.moveTo(e[0][0],e[0][1]);for(var c=1,p=e.length;p>c;c++)t.lineTo(e[c][0],e[c][1]);if(t.stroke(),t.beginPath(),t.lineWidth=n,t.strokeStyle=o,t.lineCap=d,t.lineJoin=v,this.isSupportDashedLine){t.save(),t.setLineDash(arrDash),t.lineDashOffset=0,t.moveTo(e[0][0],e[0][1]);for(var c=1,p=e.length;p>c;c++)t.lineTo(e[c][0],e[c][1]);t.stroke(),t.restore()}else{for(var u=!0,c=0,p=e.length;p-1>c;c++){var g=e[c][0],m=e[c][1],w=e[c+1][0],b=e[c+1][1],y=w-g,x=b-m,T=0!==y?x/y:x>0?1e15:-1e15,C=Math.sqrt(y*y+x*x),P=l;for(t.moveTo(g,m);C>=.1;){P>C&&(P=C);var L=Math.sqrt(P*P/(1+T*T));0>y&&(L=-L),g+=L,m+=T*L,t[u?"lineTo":"moveTo"](g,m),C-=P,u=!u}}t.stroke()}},drawArrow:function(t,e,i,a){t.beginPath(),t.moveTo(e[0],e[1]),t.lineTo(i[0],i[1]),t.stroke();var r=this.calcArrowPts(e,i,a),n=r[0],s=r[1];t.beginPath(),t.moveTo(n[0],n[1]),t.lineTo(s[0],s[1]),t.lineTo(i[0],i[1]),t.closePath(),t.stroke()},calcArrowPts:function(t,e,i){var a=3.5*Math.pow(i,.8),r=.3,n=e[1]-t[1],s=e[0]-t[0],o=1.8*Math.sqrt(s*s+n*n),l=e[0]+s/o*a,h=e[1]+n/o*a,d=Math.atan2(n,s)+Math.PI,f=[l+a*Math.cos(d-r),h+a*Math.sin(d-r)],v=[l+a*Math.cos(d+r),h+a*Math.sin(d+r)];return[f,v]},draw3DBuilding:function(t,e){var i=e[0],a=e.style0,r="rgba("+a[1]+")",n="rgba("+a[2]+")",s=a[3];t.beginPath(),t.moveTo(i[0][0],i[0][1]);for(var o=1,l=i.length;l>o;o++)t.lineTo(i[o][0],i[o][1]);t.closePath(),t.strokeStyle=n,t.lineWidth=s,t.fillStyle=r,t.stroke(),t.fill()},drawTraffic:function(t,e){for(var i=(this.tileSize,0),a=e.length;a>i;i++){var r=this.parseTrafficFeature(e[i]),n=r[1],s=(this.arrTrafficStyles[r[2]],this.arrTrafficStyles[r[3]]);t.beginPath(),t.moveTo(n[0],n[1]);for(var o=2,l=n.length;l>o;o+=2)t.lineTo(n[o],n[o+1]);t.strokeStyle="rgba(255,255,255,1)",t.lineWidth=4,t.lineCap="butt",t.lineJoin="miter",t.stroke(),t.strokeStyle="rgba("+s[1]+")",t.lineWidth=s[2],t.lineCap=this.arrLineCap[s[3]],t.lineJoin=this.arrLineJoin[s[4]],t.stroke()}},calcIconAndTextInfo:function(t,e,i,a){var r=this,n=r.featureStyle,s=this.tileSize,f=[];f.x=e,f.y=i,f.z=a;for(var v=t[0]||[],c=0,p=v.length;p>c;c++){var u=v[c],g=u[5],m=u[2],w=u[4],b=g.split(","),y=n[b[0]],x=null,T=u[6],C=u[1];if(u[0][1]=s-u[0][1],2==b.length&&(x=n[b[1]]),x&&x[0]!==l&&y[0]===l){var P=x;x=y,y=P}var L={type:"fixed",name:m,rank:u[3],catalog:w,baseX:u[0][0],baseY:u[0][1],iconPos:null,textPos:null,guid:C,style0:y,style1:x},I=m.split("$");if(y&&y[0]===o&&x&&x[0]===l){var _=this.calcIconPos(u,y),X=_.width,Y=_.height;L.iconPos=_;var S=this.calcTxtSize(I,x);a>=3&&9>=a?0===T?(L.textPos=this.calcTextPosTop(u,S,Y),L.textDirTop=!0):1===T?(L.textPos=this.calcTextPosBottom(u,S,Y),L.textDirBottom=!0):2===T?(L.textPos=this.calcTextPosLeft(u,S,X),L.textDirLeft=!0):L.textPos=this.calcTextPos(u,S,X):(12===a&&"65e1ee886c885190f60e77ff"===C&&(T=1),T?(L.textPos=this.calcTextPosLeft(u,S,X),L.textDirLeft=!0):L.textPos=this.calcTextPos(u,S,X))}else if(y&&y[0]===o)L.iconPos=this.calcIconPos(u,y);else if(y&&y[0]===l){var S=this.calcTxtSize(I,y);L.textPos=this.calcTextPos(u,S)}else L=null;L&&f.push(L)}for(var D=t[5]||[],c=0,p=D.length;p>c;c++){var M=D[c],g=M[5],b=g.split(",");if(3===b.length){var k=this.featureStyle[b[2]];k&&(k[0]===d?this.addLineTextPos(f,M,k,s):k[0]===h&&this.addLineBiaoPaiPos(f,M,k,s))}}return f},addLineTextPos:function(t,e,i,a){for(var r=e[2].split(""),n=[],s=0,o=r.length;o>s;s++){var l=this.calcTxtSize(r[s],i);n.push(l)}for(var h=e[8],s=0,o=h.length;o>s;s++){var d=[],f=h[s],v=1===f[1]?!0:!1,c=f[0];v&&(r.reverse(),n.reverse());for(var p=c[0][0][0],u=a-c[0][0][1],g=0,m=n[g][0],w=p-m[0]/2,b=u-m[1]/2,y=w+m[0],x=b+m[1],T=0,C=c.length;C>T;T++){m=n[g][0];var P=c[T],L=m[0],I=m[1],_=P[0][0]-L/2,X=a-P[0][1]-I/2,Y={wd:r[g],angle:P[1],destX:_,destY:X,width:L,height:I};w>_&&(w=_),b>X&&(b=X),_+L>y&&(y=_+L),X+I>x&&(x=X+I),d.push(Y),g++}var S={type:"line",rank:e[3],baseX:p,baseY:u,wordsInfo:d,_minX:w,_minY:b,_maxX:y,_maxY:x,style:i};t.push(S)}},addLineBiaoPaiPos:function(t,e,i,a){var r=e[2],n=e[8],s=n[0],o=s[0],l=o[0][0][0],h=a-o[0][0][1],d=i[1],f=this.iconSetInfoHigh[d],v=Math.ceil(f[3]/2);this.labelCtx.font=this.getBiaoPaiFont();var c=this.labelCtx.measureText(r).width,p={type:"biaopai",name:r,rank:e[3],baseX:l,baseY:h,pos:{destX:l-c/2,destY:h-v/2,width:c,height:v},style:i};t.push(p)},getFont:function(t){var e=[],i=1===t[1]?"italic":"",a=t[3];return e.push(i),this.isIphone?(e.push("bold"),e.push(a+"px"),e.push("arial,黑体")):(e.push(a+"px"),e.push("黑体")),e.join(" ")},getBiaoPaiFont:function(){var t=11,e=[];return this.isIphone?(e.push("bold"),e.push(t+"px"),e.push("arial,黑体")):(e.push(t+"px"),e.push("黑体")),e.join(" ")},calcTxtSize:function(t,e){var i=[],a=this.labelCtx;a.font=this.getFont(e);var r=e[3];if(t.length>1){var n=t[0],s=t[1],o=a.measureText(n).width,l=a.measureText(s).width;i.push([o,r],[l,r])}else{var h=t[0],o=a.measureText(h).width;i.push([o,r])}return i},calcIconPos:function(t,e){var i=t[0],a=i[0],r=i[1],n=e[1];isNaN(n[0])||(n="_"+n);var s=this.iconSetInfoHigh[n],o=s[2]/2,l=s[3]/2;return{destX:a-o/2,destY:r-l/2,width:o,height:l}},calcTextPos:function(t,e,i){var a=[],r=t[0],n=r[0],s=r[1];if(e.length<=1){var o=e[0],l=i?i/2:-o[0]/2,h={destX:n+l,destY:s-o[1]/2,width:o[0],height:o[1]};a.push(h)}else{var o=e[0],l=i?i/2:-o[0]/2,h={destX:n+l,destY:s-o[1],width:o[0],height:o[1]},d=e[1],f=i?i/2:-d[0]/2,v={destX:n+f,destY:s,width:d[0],height:d[1]};a.push(h),a.push(v)}return a},calcTextPosLeft:function(t,e,i){var a=[],r=t[0],n=r[0],s=r[1],o=i/2;if(e.length<=1){var l=e[0],h={destX:n-o-l[0],destY:s-l[1]/2,width:l[0],height:l[1]};a.push(h)}else{var l=e[0],h={destX:n-o-l[0],destY:s-l[1],width:l[0],height:l[1]},l=e[1],d={destX:n-o-l[0],destY:s,width:l[0],height:l[1]};a.push(h),a.push(d)}return a},calcTextPosTop:function(t,e,i){var a=t[0],r=a[0],n=a[1],s=e[0];return[{destX:r-s[0]/2,destY:n-i/2-s[1],width:s[0],height:s[1]}]},calcTextPosBottom:function(t,e,i){var a=t[0],r=a[0],n=a[1],s=e[0];return[{destX:r-s[0]/2,destY:n+i/2,width:s[0],height:s[1]}]},updateLabel:function(){var t=(new Date).getTime(),e=this.map;this.labelCanvas.style.left=-e.offsetX+"px",this.labelCanvas.style.top=-e.offsetY+"px";var i=this.preComputeLabel(this.curViewLabels);if(this.clearLabel(),this.drawIconAndText(i),this.curViewLabels.length>0){var a=(new Date).getTime(),r=new n("onvectorloaded");r.drawingTime=a-t,e.dispatchEvent(r)}},preComputeLabel:function(t){var e=[],i=this.map,a=i.getCenter(),r=i.getZoom(),n=i.getSize(),s=n.width,o=n.height,l=a.lng,h=a.lat,d=this.mapType.getZoomUnits(r),f=this.tileSize,v=d*f,c=(this.ratio,0);5===r&&(c=1),t.sort(function(t,e){return t.x*t.y<e.x*e.y?-1:1});for(var p=0,u=t.length;u>p;p++)for(var g=t[p],m=g.x,w=g.y,b=(g.z,m*v),y=(w+1)*v,x=(b-l)/d+s/2,T=(h-y)/d+o/2,C=0,P=g.length;P>C;C++){{var L=g[C],I=void 0,_=void 0,X=void 0,Y=void 0;L.baseDrawX=x+L.baseX,L.baseDrawY=T+L.baseY}if("fixed"===L.type){var S=L.iconPos,D=L.textPos;if(S&&(S.drawX=x+S.destX,S.drawY=T+S.destY,I=S.drawX,_=S.drawY,X=S.drawX+S.width,Y=S.drawY+S.height),D){var M=D[0];if(M.drawX=x+M.destX,M.drawY=T+M.destY,void 0!=I?(M.drawX<I&&(I=M.drawX),M.drawY<_&&(_=M.drawY),M.drawX+M.width>X&&(X=M.drawX+M.width),M.drawY+M.height>Y&&(Y=M.drawY+M.height)):(I=M.drawX,_=M.drawY,X=M.drawX+M.width,Y=M.drawY+M.height),2==D.length){var k=D[1];k.drawX=x+k.destX,k.drawY=T+k.destY,k.drawX<I&&(I=k.drawX),k.drawY<_&&(_=k.drawY),k.drawX+k.width>X&&(X=k.drawX+k.width),k.drawY+k.height>Y&&(Y=k.drawY+k.height)}}}else if("line"===L.type)L.tileX=x,L.tileY=T,I=x+L._minX,_=T+L._minY,X=x+L._maxX,Y=T+L._maxY;else if("biaopai"===L.type){var O=L.pos;O.drawX=x+O.destX,O.drawY=T+O.destY,I=O.drawX,_=O.drawY,X=O.drawX+O.width,Y=O.drawY+O.height}void 0!=I&&(L.minX=I,L.minY=_,L.maxX=X,L.maxY=Y,e.push(L))}e.sort(function(t,e){return e.rank-t.rank});for(var p=0,u=e.length;u>p;p++){var V=e[p];for(V.isDel=!1,V.arrIntersectIndex=[],C=p+1;u>C;C++){var F=e[C];V.maxX-c<F.minX||V.minX>F.maxX-c||V.maxY-c<F.minY||V.minY>F.maxY-c||V.arrIntersectIndex.push(C)}}for(var p=0,u=e.length;u>p;p++){var z=e[p];if(0==z.isDel)for(var R=z.arrIntersectIndex,C=0,P=R.length;P>C;C++){var B=e[R[C]];B.isDel=!0}}return e},clearLabel:function(){var t=this.map,e=t.getSize(),i=e.width,a=e.height,r=this.ratio;this.labelCtx.clearRect(0,0,i*r,a*r)},drawIconAndText:function(t){for(var e=this.labelCtx,i=(this.ratio,0),a=t.length;a>i;i++){var r=t[i];if(r.isDel===!1){var n=r.baseDrawX,s=r.baseDrawY;if("fixed"===r.type){var o=r.iconPos,h=r.textPos,d=r.style0,f=r.style1;if(o){var v=d[1],c=o.width,p=o.height;this.drawIcon(e,v,n,s,c,p)}if(h){var u=void 0;u=f&&f[0]===l?f:d;var g=u[4],m=u[5],w=u[6];w&&(e.fillStyle="rgba("+m+")",e.fillRect(r.minX,r.minY,r.maxX-r.minX,r.maxY-r.minY)),e.font=this.getFont(u),e.fillStyle="rgba("+g+")";var b=r.name.split("$"),y=h[0];if(m&&(e.strokeStyle="rgba("+m+")",e.strokeText(b[0],y.drawX,y.drawY)),e.fillText(b[0],y.drawX,y.drawY),2===h.length){var x=h[1];m&&e.strokeText(b[1],x.drawX,x.drawY),e.fillText(b[1],x.drawX,x.drawY)}}}else if("line"===r.type){var T=r.wordsInfo,C=r.tileX,P=r.tileY,L=r.style,g=L[4],m=L[5];e.font=this.getFont(L),e.fillStyle="rgba("+g+")";for(var I=0,_=T.length;_>I;I++){var X=T[I],Y=C+X.destX,S=P+X.destY,D=X.angle,M=X.wd;if(D>10&&350>D){e.save();var k=Y+X.width/2,O=S+X.height/2;e.translate(k,O),e.rotate(-D/180*Math.PI),e.fillText(M,-X.width/2,-X.height/2),e.restore()}else m&&(e.strokeStyle="rgba("+m+")",e.strokeText(M,Y,S)),e.fillText(M,Y,S)}}else if("biaopai"===r.type){var V=r.name,L=r.style,v=L[1],F=r.pos,c=F.width,p=F.height,z={name:V,style:L,callback:this.drawBiaoPaiText};this.drawIcon(e,v,n,s,c,p,z)}}}},drawIcon:function(t,e,i,a,r,n,s){var o=this,l=i-r/2,h=a-n/2;if(o.iconCache[e])t.drawImage(o.iconCache[e],l,h,r,n),s&&s.callback(o,l,h,s);else{var d=o.getIconUrl(e),f=new Image,v=o.map,c=v.getCenter(),p=v.getZoom();f.onload=function(){o.iconCache[e]=this;var i=v.getCenter(),a=v.getZoom();i.equals(c)&&p===a&&(t.drawImage(this,l,h,r,n),s&&s.callback(o,l,h,s)),f.onload=null,delete f.onload},f.src=d}},getIconUrl:function(t){var e=this.iconURLs,i=t.length%e.length,a=this.getIconVersionInfo(),r=a.ver,n=a.udt,s="";return window._EXP_INFO&&1===window._EXP_INFO.useXijiangData&&(s="&hitxijiangtest=1"),this.iconURLs[i]+t+".png?v="+r+"&udt="+n+s},drawBiaoPaiText:function(t,e,i,a){var r=t.labelCtx,n=a.name,s=a.style,o=s[5];r.font=t.getBiaoPaiFont(),r.fillStyle="rgba("+o+")",r.fillText(n,e,i)},vectorClick:function(t){var e=this,i=this.detectClickable(t);if(i){var a=new n("onvectorclick");return a.iconInfo=i,a.from="base",e.map.dispatchEvent(a),!0}return!1},detectClickable:function(t){for(var e=this._vectorDiv.getElementsByTagName("canvas"),i=t.offsetX,a=t.offsetY,r=void 0,n=void 0,s=this.tileSize,o=(this.featureStyle,15),l=0,h=e.length;h>l;l++){var d=this.getOffset(e[l]);if(i>d.left&&i<=d.left+s&&a>d.top&&a<=d.top+s){r=e[l];break}}if(void 0===r||void 0===r._vtd||void 0===r._vtd._arrLabelInfo)return!1;for(var f=n=r._vtd._arrLabelInfo,v=0,h=f.length;h>v;v++){var c=f[v],p=c.name&&c.name.replace("$",""),u=(c[1],c.baseX),g=c.baseY;if(!c.isDel&&c.iconPos){var m=u+d.left,w=g+d.top;if(t.offsetX>=m-o&&t.offsetX<=m+o&&t.offsetY>=w-o&&t.offsetY<=w+o)return{type:9,name:p,uid:c.guid||"",point:{x:m,y:w}}}}return!1},getOffset:function(t){for(var e=t.offsetLeft,i=t.offsetTop,t=t.offsetParent;t&&t!=this.map.getContainer();)e+=t.offsetLeft,i+=t.offsetTop,t=t.offsetParent;return{top:i,left:e}}},i.exports=p});