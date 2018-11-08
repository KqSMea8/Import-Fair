package baidu.subway 
{
    import baidu.dv.events.*;
    import baidu.dv.legend.*;
    import baidu.subway.data.*;
    import baidu.subway.event.*;
    import baidu.subway.feature.*;
    import baidu.subway.handler.*;
    import baidu.subway.ui.control.*;
    import baidu.subway.ui.info.*;
    import baidu.subway.ui.tips.*;
    import baidu.subway.util.*;
    import baidu.subway.vo.*;
    import baidu.ui.managers.*;
    import flash.display.*;
    import flash.events.*;
    import flash.external.*;
    import flash.filters.*;
    import flash.geom.*;
    import flash.net.*;
    import flash.system.*;
    import flash.text.*;
    import flash.utils.*;
    import gs.*;
    import gs.easing.*;
	
	
    
    public class Subway extends flash.display.Sprite
    {
        public function Subway()
        {
			trace("subway constructor");
            super();
            return;
        }
		
        private function drawLinesAndStations(arg1:flash.events.TimerEvent):void
        {
            var evt:flash.events.TimerEvent;
            var line:baidu.subway.feature.Line;
            var i:int;
            var stLen:int;
            var stt:flash.utils.Timer;
            var fun:Function;

            var loc1:*;
            line = null;
            i = 0;
            stLen = 0;
            stt = null;
            fun = null;
            evt = arg1;
            line = this._swVO.lines[this._lineIndex];
            this._linesLayer.addChild(line);
            if (line.lineVO.lb == "九广铁路东铁") 
            {
                trace();
            }
            line.draw();
            line.addEventListener(baidu.subway.event.SubwayEvent.LINE_OVER, this.onLineEvent);
            line.addEventListener(baidu.subway.event.SubwayEvent.LINE_OUT, this.onLineEvent);
            line.addEventListener(baidu.subway.event.SubwayEvent.LINE_CLICK, this.onLineEvent);
            var loc2:*;
            var loc3:*=((loc2 = this)._lineIndex + 1);
            loc2._lineIndex = loc3;
            i = 0;
            stLen = line.lineVO.stations.length;
            stt = new flash.utils.Timer(Math.ceil(80 / stLen));
            fun = function (arg1:flash.events.TimerEvent):void
            {
                var loc1:*=line.lineVO.stations[i];
                if (loc1.stationVO.st) 
                {
                    loc1.x = loc1.stationVO.x;
                    loc1.y = loc1.stationVO.y;
                    line.addChild(loc1);
                    loc1.draw();
					
					
                    if (loc1.stationVO.iu) 
                    {
                        loc1.addEventListener(baidu.subway.event.SubwayEvent.STATION_OVER, onStationEvent);
                        loc1.addEventListener(baidu.subway.event.SubwayEvent.STATION_OUT, onStationEvent);
                        loc1.addEventListener(baidu.subway.event.SubwayEvent.STATION_CLICK, onStationEvent);
                    }
                }
                var loc2:*;
                i++;
                if (i == stLen) 
                {
                    if (stt) 
                    {
                        if (stt.running) 
                        {
                            stt.stop();
                        }
                        stt.removeEventListener(flash.events.TimerEvent.TIMER, fun);
                        stt = null;
                    }
                }
                return;
            }
            stt.addEventListener(flash.events.TimerEvent.TIMER, fun);
            stt.start();
            if (this._lineIndex == this._lineLen) 
            {
                this.deactiveLineTimer();
                this.loadBgIconContent();
                this.addControlUI();
				this.scaleToLevel(this._scale);
            }
            return;
        }

        private function loadBgIconContent():void
        {
            var loc1:*=new flash.display.Loader();
            loc1.contentLoaderInfo.addEventListener(flash.events.Event.COMPLETE, this.setBgIconContent);
            try 
            {
                loc1.load(new flash.net.URLRequest(this._swVO.src));
            }
            catch (error:Error)
            {
            };
            return;
        }

        private function setBgIconContent(arg1:flash.events.Event):void
        {
            var evt:flash.events.Event;
            var app:flash.system.ApplicationDomain;
            var BG:Class;
            var ICON:Class;

            var loc1:*;
            BG = null;
            ICON = null;
            evt = arg1;
            app = evt.target.applicationDomain;
            try 
            {
                BG = app.getDefinition(this._swVO.bg) as Class;
                this._bgLayer.addChild(new BG());
				this._bgLayer.alpha=0.2;
            }
            catch (error:Error)
            {
                trace("设置了src属性，但是里面没有bg链接资源");
            }
            try 
            {
                ICON = app.getDefinition(this._swVO.icon) as Class;
                this._iconLayer.addChild(new ICON());
            }
            catch (error:Error)
            {
                trace("设置了src属性，但是里面没有icon链接资源");
            }
            return;
        }

        private function addScaleBar():void
        {
            this._scaleBar = new baidu.subway.ui.control.ScaleBar();
            this._scaleBar.x = this.PADDING_POSITION;
            this._scaleBar.y = this.PADDING_POSITION;
			this._scaleBar.visible=false;
            stage.addChild(this._scaleBar);
            this._scaleBar.addEventListener(baidu.subway.event.SubwayEvent.SB_SCALE_CHANGE, this.changeScale);
            return;
        }

        private function addLegend():void
        {
            var loc5:*=null;
            var loc1:*=new flash.text.TextFormat();
            loc1.size = 12;
            loc1.color = 5000268;
            loc1.font = "宋体";
            var loc2:*=[];
            var loc3:*=0;
            var loc4:*=this._swVO.lines.length;
            while (loc3 < loc4) 
            {
                loc5 = this._swVO.lines[loc3];
                loc2.push({"icon":baidu.subway.util.LegendIconType.BLOCK, "label":loc5.lineVO.lb, "color":loc5.lineVO.lc});
                ++loc3;
            }
			//特殊过滤
			loc2.push({"icon":baidu.subway.util.LegendIconType.BLOCK, "label":"2,3G", "color":0xffffff});
			loc2.push({"icon":baidu.subway.util.LegendIconType.BLOCK, "label":"4G", "color":0xffffff});
			loc2.push({"icon":baidu.subway.util.LegendIconType.BLOCK, "label":"换乘站", "color":0xffffff});
			loc2.push({"icon":baidu.subway.util.LegendIconType.BLOCK, "label":"地下站", "color":0xffffff});
			loc2.push({"icon":baidu.subway.util.LegendIconType.BLOCK, "label":"地面站", "color":0xffffff});
			loc2.push({"icon":baidu.subway.util.LegendIconType.BLOCK, "label":"无4G覆盖地下站", "color":0xffffff});
			
			
            this._legend = new baidu.subway.ui.control.AdvancedLegend();
            this._legend.height = 40;//Math.ceil(loc2.length / 5) * 25;
            this._legend.data = loc2;
            this._legend.setStyles({"border":true, "background":true, "direction":baidu.dv.legend.LegendDirection.VERTICAL, "labelTextFormat":loc1, "itemHorizontalGap":5, "itemVerticalGap":4, "xPadding":5, "yPadding":4});
            stage.addChild(this._legend);
            this._legend.x = stage.stageWidth - this._legend.width - this.PADDING_POSITION;
            this._legend.y = stage.stageHeight-45;//this.PADDING_POSITION;
            //this._legend.addEventListener(baidu.dv.events.ItemEvent.ITEM_OVER, this.onLegendEvent);
            //this._legend.addEventListener(baidu.dv.events.ItemEvent.ITEM_OUT, this.onLegendEvent);
			this._legend.addEventListener(baidu.dv.events.ItemEvent.ITEM_CLICK, this.onLegendEvent);
			
            return;
        }

        private function onLegendEvent(arg1:baidu.dv.events.ItemEvent):void
        {
			flash.external.ExternalInterface.call("NS_SW_chooseLineBySwf",arg1.index);
            this._highlightIndex = arg1.index;
			this.deactiveHighlightTimer();
			this._highlightTimer = new flash.utils.Timer(200, 1);
			this._highlightTimer.addEventListener(flash.events.TimerEvent.TIMER, this.highLightLineByIndex);
			this._highlightTimer.start();
            /*if (arg1.type != baidu.dv.events.ItemEvent.ITEM_OVER) 
            {
                this.deactiveHighlightTimer();
            }
            else 
            {
                this.deactiveHighlightTimer();
                this._highlightTimer = new flash.utils.Timer(200, 1);
                this._highlightTimer.addEventListener(flash.events.TimerEvent.TIMER, this.highLightLineByIndex);
                this._highlightTimer.start();
            }*/
            return;
        }

        private function onLineEvent(arg1:baidu.subway.event.SubwayEvent):void
        {
            var loc3:*=NaN;
            var loc4:*=NaN;
            var loc1:*=arg1.type;
            var loc2:*=arg1.target as baidu.subway.feature.Line;
            if (loc1 != baidu.subway.event.SubwayEvent.LINE_OVER) 
            {
                if (loc1 != baidu.subway.event.SubwayEvent.LINE_OUT) 
                {
                    if (loc1 == baidu.subway.event.SubwayEvent.LINE_CLICK) 
                    {
                        this.clearSearchResult();
                    }
                }
                else if (this._lineTips && contains(this._lineTips)) 
                {
                    removeChild(this._lineTips);
                    this._lineTips = null;
                }
            }
            else if (!this._lineTips) 
            {
                loc3 = stage.mouseX;
                loc4 = stage.mouseY;
                this._lineTips = new baidu.subway.ui.tips.LineTips(loc2.lineVO.lb, loc2.lineVO.lc, loc3, loc4, this._linesLayer.scaleX);
                addChild(this._lineTips);
            }
            return;
        }

        private function onStationEvent(arg1:baidu.subway.event.SubwayEvent):void
        {
            var loc5:*=null;
            var loc6:*=null;
            var loc7:*=0;
            var loc8:*=0;
            var loc9:*=null;
            var loc10:*=0;
            var loc11:*=0;
            var loc12:*=null;
            var loc1:*=arg1.type;
            var loc2:*=arg1.target as baidu.subway.feature.Station;
            var loc3:*=loc2.parent as baidu.subway.feature.Line;
            var loc4:*=false;
            if (this._inSearchResult) 
            {
                if (this._highLightedLine && this._highLightedLine == loc3) 
                {
                    this._overStation = loc2;
                    loc4 = true;
                }
                else 
                {
                    if (loc1 == baidu.subway.event.SubwayEvent.STATION_CLICK) 
                    {
                        this.clearSearchResult();
                    }
                    return;
                }
            }
            if (!loc4) 
            {
                this._linesLayer.addChild(loc3);
            }
            loc3.addChild(loc2);
            if (loc1 != baidu.subway.event.SubwayEvent.STATION_OVER) 
            {
                if (loc1 != baidu.subway.event.SubwayEvent.STATION_OUT) 
                {
                    if (loc1 == baidu.subway.event.SubwayEvent.STATION_CLICK) 
                    {
                        this.hideStationOverTips(loc2);
                        if (this._inSearchResult) 
                        {
                            this.clearSearchResult();
                        }
                        this._sHandler.setPoint(loc2);
                    }
                }
                else 
                {
                    this.hideStationOverTips(loc2);
                }
            }
            else 
            {
                loc5 = loc2.stationVO.ln.split(",");
                loc6 = [];
                loc7 = 0;
                loc8 = loc5.length;
                while (loc7 < loc8) 
                {
                    loc9 = loc5[loc7];
                    loc10 = 0;
                    loc11 = this._swVO.lines.length;
                    while (loc10 < loc11) 
                    {
                        loc12 = this._swVO.lines[loc10] as baidu.subway.feature.Line;
                        if (loc9 == loc12.lineVO.lid) 
                        {
                            loc6.push({"lid":loc12.lineVO.lid, "lb":loc12.lineVO.lb, "color":loc12.lineVO.lc});
                            break;
                        }
                        ++loc10;
                    }
                    ++loc7;
                }
                this.showStationOverTips(loc6, false, loc2);
            }
            return;
        }

        private function showStationOverTips(arg1:Array, arg2:Boolean, arg3:baidu.subway.feature.Station=null):void
        {
            var loc1:*=null;
            var loc2:*=null;
            if (arg2) 
            {
                if (!this._overTips) 
                {
                    loc1 = new flash.geom.Point(this._overStation.x, this._overStation.y);
                    loc2 = this._linesLayer.localToGlobal(loc1);
                    this._overTips = new baidu.subway.ui.tips.OverTips(this._overStation.stationVO.sid, this._overStation.stationVO.lb, arg1, loc2.x, loc2.y, this._overStation.stationVO.ex, this._linesLayer.scaleX, arg2);
                    addChild(this._overTips);
                }
            }
            else if (arg3) 
            {
                arg3.createOverTips(arg1, this._linesLayer.scaleX);
            }
            return;
        }

        private function hideStationOverTips(arg1:baidu.subway.feature.Station=null):void
        {
            if (arg1) 
            {
                arg1.removeOverTips();
            }
            else if (this._overTips && contains(this._overTips)) 
            {
                removeChild(this._overTips);
                this._overTips = null;
                this._overStation = null;
            }
            return;
        }

        private function setStartPoint(arg1:baidu.subway.event.SubwayEvent):void
        {
			
			
            var loc1:*=arg1.data.st;
			
			flash.external.ExternalInterface.call("NS_SW_setStartStation", loc1.stationVO.sid);
			return;
			
			
            var loc2:*=arg1.data.px;
            var loc3:*=arg1.data.py;
            var loc4:*=arg1.data.shouldStartSearch;
            var loc5:*=arg1.data.shouldSetJSStation;
            if (this._startTips && contains(this._startTips)) 
            {
                removeChild(this._startTips);
                this._startTips = null;
            }
            this._startTips = new baidu.subway.ui.tips.StartTips();
            addChild(this._startTips);
            this._startTips.x = loc2;
            this._startTips.y = loc3 - 5;
            gs.TweenLite.to(this._startTips, this.TWEEN_TIME, {"x":loc2, "y":loc3, "ease":gs.easing.Quad.easeOut});
            this._startTips.addEventListener(baidu.subway.event.SubwayEvent.START_TIP_DRAGED, this.startTipsDraged);
            if (this._startStation != loc1) 
            {
                this._startStation = loc1;
                if (loc5) 
                {
                    try 
                    {
                        flash.external.ExternalInterface.call("NS_SW_setStartStation", loc1.stationVO.sid);
                    }
                    catch (err:Error)
                    {
                    };
                }
                if (loc4) 
                {
                    this.startSearch();
                }
            }
            return;
        }

        private function setEndPoint(arg1:baidu.subway.event.SubwayEvent):void
        {
            var loc1:*=arg1.data.st;
			flash.external.ExternalInterface.call("NS_SW_setStartStation", loc1.stationVO.sid);
			return;
			
            var loc2:*=arg1.data.px;
            var loc3:*=arg1.data.py;
            var loc4:*=arg1.data.shouldStartSearch;
            var loc5:*=arg1.data.shouldSetJSStation;
            if (this._endTips && contains(this._endTips)) 
            {
                removeChild(this._endTips);
                this._endTips = null;
            }
            this._endTips = new baidu.subway.ui.tips.EndTips();
            addChild(this._endTips);
            this._endTips.x = loc2;
            this._endTips.y = loc3 - 5;
            gs.TweenLite.to(this._endTips, this.TWEEN_TIME, {"x":loc2, "y":loc3, "ease":gs.easing.Quad.easeOut});
            this._endTips.addEventListener(baidu.subway.event.SubwayEvent.END_TIP_DRAGED, this.endTipsDraged);
            if (this._endStation != loc1) 
            {
                this._endStation = loc1;
                if (loc5) 
                {
                    try 
                    {
                        flash.external.ExternalInterface.call("NS_SW_setEndStation", loc1.stationVO.sid);
                    }
                    catch (err:Error)
                    {
                    };
                }
                if (loc4) 
                {
                    this.startSearch();
                }
            }
            return;
        }

        private function addControlUI():void
        {
            this.addScaleBar();
            this.addLegend();
            return;
        }

        private function startTipsDraged(arg1:baidu.subway.event.SubwayEvent):void
        {
            var loc1:*=null;
            var loc4:*=null;
            var loc5:*=0;
            var loc6:*=0;
            var loc7:*=null;
            var loc2:*=0;
            var loc3:*=this._swVO.lines.length;
            while (loc2 < loc3) 
            {
                loc4 = this._swVO.lines[loc2] as baidu.subway.feature.Line;
                loc5 = 0;
                loc6 = loc4.lineVO.stations.length;
                while (loc5 < loc6) 
                {
                    loc7 = loc4.lineVO.stations[loc5] as baidu.subway.feature.Station;
                    if (!(!loc7.stationVO.iu || loc7 == this._endStation)) 
                    {
                        if (this._startTips.dot.hitTestObject(loc7.shp)) 
                        {
                            loc1 = loc7;
                            break;
                        }
                    }
                    ++loc5;
                }
                if (loc1) 
                {
                    break;
                }
                ++loc2;
            }
            this._sHandler.setPoint(loc1 || this._startStation);
            return;
        }

        private function endTipsDraged(arg1:baidu.subway.event.SubwayEvent):void
        {
            var loc1:*=null;
            var loc4:*=null;
            var loc5:*=0;
            var loc6:*=0;
            var loc7:*=null;
            var loc2:*=0;
            var loc3:*=this._swVO.lines.length;
            while (loc2 < loc3) 
            {
                loc4 = this._swVO.lines[loc2] as baidu.subway.feature.Line;
                loc5 = 0;
                loc6 = loc4.lineVO.stations.length;
                while (loc5 < loc6) 
                {
                    loc7 = loc4.lineVO.stations[loc5] as baidu.subway.feature.Station;
                    if (!(!loc7.stationVO.iu || loc7 == this._endStation)) 
                    {
                        if (this._endTips.dot.hitTestObject(loc7.shp)) 
                        {
                            loc1 = loc7;
                            break;
                        }
                    }
                    ++loc5;
                }
                if (loc1) 
                {
                    break;
                }
                ++loc2;
            }
            this._sHandler.hasSetEndPoint = false;
            this._sHandler.setPoint(loc1 || this._endStation);
            return;
        }

        private function startSearch():void
        {
            this.addMask();
            this.showLoading();
            try 
            {
                flash.external.ExternalInterface.call("NS_SW_doSearch", this._startStation.stationVO.sid, this._endStation.stationVO.sid);
            }
            catch (err:Error)
            {
            };
            return;
        }

        private function showSearchResult(arg1:Array, arg2:Boolean):void
        {
            var loc1:*=null;
            var loc2:*=null;
            var loc3:*=null;
            var loc4:*=null;
            var loc5:*=null;
            var loc6:*=null;
            var loc7:*=NaN;
            var loc8:*=NaN;
            var loc9:*=null;
            var loc10:*=NaN;
            var loc11:*=NaN;
            this._inSearchResult = true;
            this.hideLoading();
            if (!arg1 || arg1.length == 0) 
            {
                this.clearSearchResult(null, false);
            }
            else 
            {
                loc1 = arg1[0]["lid"];
                loc2 = arg1[0]["sid"];
                loc3 = arg1[arg1.length - 1]["lid"];
                loc4 = arg1[arg1.length - 1]["eid"];
                loc5 = this.getStationByID(loc1, loc2);
                loc6 = this.getStationByID(loc3, loc4);
                if (!arg2) 
                {
                    var loc12:*;
                    this._sHandler.hasSetEndPoint = loc12 = false;
                    this._sHandler.hasSetStartPoint = loc12;
                    this._endStation = loc12 = null;
                    this._startStation = loc12;
                }
                if (!this._startStation || !(loc5.stationVO.lb == this._startStation.stationVO.lb)) 
                {
                    this._sHandler.forceNotSet = loc12 = true;
                    this._sHandler.forceNotSearch = loc12;
                    this._sHandler.setPoint(loc5);
                }
                if (!this._endStation || !arg2 || !(loc6.stationVO.lb == this._endStation.stationVO.lb)) 
                {
                    this._sHandler.forceNotSet = loc12 = true;
                    this._sHandler.forceNotSearch = loc12;
                    this._sHandler.setPoint(loc6);
                }
                this.addMask();
                this.drawResultLines(arg1);
                this.drawResultTips(arg1);
                if (!arg2) 
                {
                    loc7 = (this._startStation.x + this._endStation.x) / 2;
                    loc8 = (this._startStation.y + this._endStation.y) / 2;
                    loc9 = this._resultLayer.localToGlobal(new flash.geom.Point(loc7, loc8));
                    loc10 = this._linesLayer.x + stage.stageWidth / 2 - loc9.x;
                    loc11 = this._linesLayer.y + stage.stageHeight / 2 - loc9.y;
                    this.adjustPositionWork(loc10, loc11);
                }
                flash.external.ExternalInterface.call("NS_SW_judge");
            }
            return;
        }

        private function drawResultLines(arg1:Array):void
        {
            var loc3:*=0;
            var loc4:*=0;
            var loc5:*=null;
            var loc6:*=null;
            while (this._resultLayer.numChildren) 
            {
                this._resultLayer.removeChildAt(0);
            }
            while (this._linesHighlightLayer.numChildren) 
            {
                this._linesHighlightLayer.removeChildAt(0);
            }
            if (this._overTips && contains(this._overTips)) 
            {
                removeChild(this._overTips);
                this._overTips = null;
                this._overStation = null;
            }
            var loc1:*=0;
            var loc2:*=arg1.length;
            while (loc1 < loc2) 
            {
                loc3 = 0;
                loc4 = this._swVO.lines.length;
                while (loc3 < loc4) 
                {
                    loc5 = this._swVO.lines[loc3];
                    if (loc5.lineVO.lid == arg1[loc1]["lid"]) 
                    {
                        loc6 = loc5.drawResult(arg1[loc1]["lid"], arg1[loc1]["sid"], arg1[loc1]["nid"], arg1[loc1]["eid"]);
                        if (loc6) 
                        {
                            this._resultLayer.addChild(loc6);
                        }
                        break;
                    }
                    ++loc3;
                }
                ++loc1;
            }
            return;
        }

        private function drawResultTips(arg1:Array):void
        {
            var loc7:*=null;
            var loc8:*=null;
            var loc9:*=null;
            var loc10:*=null;
            var loc11:*=null;
            var loc12:*=null;
            var loc13:*=null;
            if (this._startInfo && contains(this._startInfo)) 
            {
                removeChild(this._startInfo);
                this._startInfo = null;
            }
            if (this._endInfo && contains(this._endInfo)) 
            {
                removeChild(this._endInfo);
                this._startInfo = null;
            }
            if (this._transInfos) 
            {
                var loc14:*=0;
                var loc15:*=this._transInfos;
                for each (loc7 in loc15) 
                {
                    if (!contains(loc7)) 
                    {
                        continue;
                    }
                    removeChild(loc7);
                }
                this._transInfos = [];
                this._tranStation = [];
            }
            this._tipsPadding = {"start":{"x":10, "y":-10}, "end":{"x":10, "y":0}, "trans":[]};
            this._startInfo = new baidu.subway.ui.info.StartInfo();
            var loc1:*={};
            var loc2:*=this.getLineObjectByID(arg1[0]["lid"]);
            loc1["lid"] = loc2.lineVO.lid;
            loc1["lc"] = loc2.lineVO.lc;
            loc1["lb"] = loc2.lineVO.lb;
            var loc3:*=this.getStationByID(loc2.lineVO.lid, arg1[0]["sid"]);
            loc1["sid"] = loc3.stationVO.sid;
            loc1["stlb"] = loc3.stationVO.lb;
            this._startInfo.infoObj = loc1;
            addChild(this._startInfo);
            baidu.subway.util.Util.adjustStartPosition(this._startStation, this._startTips, this._startInfo, this._tipsPadding["start"], this._linesLayer, this._resultLayer);
            this._tipsPadding["trans"] = [];
            this._tranStation = [];
            this._transInfos = [];
            var loc4:*=0;
            var loc5:*=arg1.length - 1;
            while (loc4 < loc5) 
            {
                loc8 = {};
                loc9 = this.getLineObjectByID(arg1[loc4]["lid"]);
                loc8["lidFrom"] = loc9.lineVO.lid;
                loc8["lbFrom"] = loc9.lineVO.lb;
                loc8["lcFrom"] = loc9.lineVO.lc;
                loc10 = this.getLineObjectByID(arg1[loc4 + 1]["lid"]);
                loc8["lidTo"] = loc10.lineVO.lid;
                loc8["lbTo"] = loc10.lineVO.lb;
                loc8["lcTo"] = loc10.lineVO.lc;
                loc11 = this.getStationByID(loc9.lineVO.lid, arg1[loc4]["eid"]);
                this._tranStation[loc4] = loc11;
                loc8["sid"] = loc11.stationVO.sid;
                loc8["stlb"] = loc11.stationVO.lb;
                loc8["distance"] = arg1[loc4]["distance"] || "0";
                loc8["time"] = arg1[loc4]["time"] || "0";
                loc12 = new baidu.subway.ui.info.TransInfo();
                loc12.infoObj = loc8;
                this._transInfos[loc4] = loc12;
                addChild(loc12);
                loc13 = {"x":10, "y":0};
                baidu.subway.util.Util.adjustTransPosition(loc11, loc12, loc13, this._linesLayer, this._resultLayer);
                this._tipsPadding["trans"][loc4] = loc13;
                ++loc4;
            }
            this._endInfo = new baidu.subway.ui.info.EndInfo();
            var loc6:*={};
            loc2 = this.getLineObjectByID(arg1[arg1.length - 1]["lid"]);
            loc6["lid"] = loc2.lineVO.lid;
            loc3 = this.getStationByID(loc2.lineVO.lid, arg1[arg1.length - 1]["eid"]);
            loc6["sid"] = loc3.stationVO.sid;
            loc6["stlb"] = loc3.stationVO.lb;
            loc6["price"] = arg1[arg1.length - 1]["price"] || "0";
            loc6["time"] = arg1[arg1.length - 1]["time"] || "0";
            this._endInfo.infoObj = loc6;
            addChild(this._endInfo);
            baidu.subway.util.Util.adjustEndPosition(this._endStation, this._endTips, this._endInfo, this._tipsPadding["end"], this._linesLayer, this._resultLayer);
            this._endInfo.addEventListener(baidu.subway.event.SubwayEvent.INFO_CLEAR_RESULT, this.clearSearchResult);
            return;
        }

        private function highLightLineByIndex(arg1:flash.events.TimerEvent):void
        {
            var loc6:*=null;
            this.deactiveHighlightTimer();
            this.clearSearchResult();
            this._inSearchResult = true;
            if (this._highlightIndex < 0 || this._highlightIndex >= this._swVO.lines.length) 
            {
				if(this._highlightIndex<this._swVO.lines.length+6){
					this.extraFilter();
				}
				
                return;
            }
            var loc1:*=this._swVO.lines[this._highlightIndex] as baidu.subway.feature.Line;
            this._highLightedLine = loc1;
            var loc2:*=loc1.lineVO.lid;
            var loc3:*=loc1.lineVO.stations;
            this._linesHighlightLayer.addChild(loc1);
            var loc4:*=0;
            var loc5:*=loc3.length;
            while (loc4 < loc5) 
            {
                loc6 = loc3[loc4] as baidu.subway.feature.Station;
                if (loc1.lineVO.loop) 
                {
                    if (loc6.stationVO.ex) 
                    {
                        loc6.hightLightStation();
                    }
                }
                else if (loc4 == 0 || loc4 == loc5 - 1 || loc6.stationVO.ex) 
                {
                    loc6.hightLightStation();
                }
                ++loc4;
            } 
			
            this.addMask();
            this.adjustPosition(this._highlightIndex);
            return;
        }
		
		private function extraFilter():void
        {
			if(this._highlightIndex>=this._swVO.lines.length&&this._highlightIndex<this._swVO.lines.length+6){
			
				var unlightAlpha:Number=0.2;
				var nameMap:Object={};
				for(var i:int=0;i<this._swVO.lines.length;i++){
					var loc1:*=this._swVO.lines[i] as baidu.subway.feature.Line;
					//var loc2:*=loc1.lineVO.lid;
					var loc3:*=loc1.lineVO.stations;
					var loc4:*=0;
					var loc5:*=loc3.length;
					var loc6:*=null;
					var stationMap:Object={};
					
					loc1.shp.alpha=unlightAlpha;
					
					while (loc4 < loc5) 
					{
						loc6 = loc3[loc4] as baidu.subway.feature.Station;
						var stationType:String=Main.stationTypeMap[loc6.stationVO.lb];
						var isUpon:Boolean=Main.stationUponGroundMap[loc6.stationVO.lb];
						var isContinuity:Boolean=Main.stationContinuityMap[loc6.stationVO.lb];
						if(this._highlightIndex==this._swVO.lines.length){//2,3G
							if (stationType=="3g") 
							{
								loc6.alpha=1;
								
							}else{
								loc6.alpha=unlightAlpha;
								
							}
							loc6.hideCircle();
						}else if(this._highlightIndex==this._swVO.lines.length+1){//4G
							
							if (stationType=="4g") 
							{
								loc6.alpha=1;
								
							}else{
								loc6.alpha=unlightAlpha;
							}
							loc6.hideCircle();
						}else if(this._highlightIndex==this._swVO.lines.length+2){//换乘站
							if (loc6.stationVO.ex) 
							{
								loc6.alpha=1;
								
							}else{
								loc6.alpha=unlightAlpha;
							}
							loc6.hideCircle();
						}else if(this._highlightIndex==this._swVO.lines.length+3){//地下站
							if (!isUpon) 
							{
								loc6.alpha=1;
								
							}else{
								loc6.alpha=unlightAlpha;
							}
							loc6.hideCircle();
						}else if(this._highlightIndex==this._swVO.lines.length+4){//地面站
							if (isUpon) 
							{
								loc6.alpha=1;
								
							}else{
								loc6.alpha=unlightAlpha;
							}
							loc6.hideCircle();
						}else if(this._highlightIndex==this._swVO.lines.length+5){//4G不连续站
							if (isContinuity==true) 
							{
								loc6.alpha=1;
								
							}else{
								loc6.alpha=unlightAlpha;
							}
							loc6.hideCircle();
						}
						
						
						++loc4;
					}
				}
				
			}
				
		}
        private function unHighLightLine():void
        {
            var loc1:*=null;
            var loc2:*=0;
            var loc3:*=0;
            var loc4:*=null;
            var loc5:*=null;
            this.deactiveHighlightTimer();
            this._highLightedLine = null;
            if (this._linesHighlightLayer.numChildren) 
            {
                loc5 = this._linesHighlightLayer.getChildAt(0) as baidu.subway.feature.Line;
                loc1 = loc5.lineVO.stations;
                this._linesLayer.addChild(loc5);
                loc2 = 0;
                loc3 = loc1.length;
                while (loc2 < loc3) 
                {
                    loc4 = loc1[loc2] as baidu.subway.feature.Station;
                    if (loc2 == 0 || loc2 == loc3 - 1 || loc4.stationVO.ex) 
                    {
                        loc4.unHightLightStation();
                    }
                    ++loc2;
                }
            }
			this.resetAlpha();
			
            return;
        }
		private function resetAlpha():void
        {
			for(var i:int=0;i<this._swVO.lines.length;i++){
				var loc1:*=this._swVO.lines[i] as baidu.subway.feature.Line;
				var loc3:*=loc1.lineVO.stations;
				var loc4:*=0;
				var loc5:*=loc3.length;
				var loc6:*=null;
				
				loc1.shp.alpha=1;
				while (loc4 < loc5) 
				{
					loc6 = loc3[loc4] as baidu.subway.feature.Station;		
					loc6.alpha=1;
					loc6.showCircle();
					
					++loc4;
				}
			}
		}

        private function onDragLayerDown(arg1:flash.events.MouseEvent):void
        {
            var evt:flash.events.MouseEvent;
            var cm:baidu.ui.managers.CursorManager;

            var loc1:*;
            evt = arg1;
            flash.external.ExternalInterface.addCallback("NS_SW_doMouseWheel", function ():void
            {
                return;
            })
            this._dragLayer.removeEventListener(flash.events.MouseEvent.MOUSE_DOWN, this.onDragLayerDown);
            this._dHandler.param = this._linesLayer;
            this._dHandler.active = true;
            this._dHandler.moved = false;
            if (!this._inSearchResult) 
            {
                this.hideMask();
            }
            cm = baidu.ui.managers.CursorManager.getInstance();
            if (!cm.root) 
            {
                cm.root = stage;
            }
            cm.showCursor("MoveCursor");
            return;
        }

        private function onDragLayerMove(arg1:baidu.subway.event.SubwayEvent):void
        {
            var loc1:*=arg1.data.px;
            var loc2:*=arg1.data.py;
            this._linesLayer.x = loc1;
            this._linesLayer.y = loc2;
            this._bgLayer.x = loc1;
            this._bgLayer.y = loc2;
            this._iconLayer.x = loc1;
            this._iconLayer.y = loc2;
            this._linesHighlightLayer.x = loc1;
            this._linesHighlightLayer.y = loc2;
            this._resultLayer.x = loc1;
            this._resultLayer.y = loc2;
            this.adjustTipsAndInfosPosition();
            return;
        }

        private function onDragLayerUp(arg1:baidu.subway.event.SubwayEvent):void
        {
            this._dragLayer.addEventListener(flash.events.MouseEvent.MOUSE_DOWN, this.onDragLayerDown);
            if (this._dHandler) 
            {
                this._dHandler.active = false;
            }
            flash.external.ExternalInterface.addCallback("NS_SW_doMouseWheel", this.NS_SW_doMouseWheel);
            baidu.ui.managers.CursorManager.getInstance().hideCursor("MoveCursor");
            if (!this._dHandler.moved) 
            {
                if (this._sHandler.hasSetStartPoint || this._sHandler.hasSetEndPoint || this._inSearchResult) 
                {
                    if (!(this._sHandler.hasSetStartPoint && this._sHandler.hasSetEndPoint && !this._inSearchResult)) 
                    {
                        this.clearSearchResult();
                    }
                }
            }
            return;
        }

        private function onDragLayerWheel(arg1:int):void
        {
            var delta:int;
            var wheelID:int;

            var loc1:*;
            wheelID = 0;
            delta = arg1;
            flash.external.ExternalInterface.addCallback("NS_SW_doMouseWheel", function ():void
            {
                return;
            })
            wheelID = flash.utils.setInterval(function ():void
            {
                flash.utils.clearInterval(wheelID);
                flash.external.ExternalInterface.addCallback("NS_SW_doMouseWheel", NS_SW_doMouseWheel);
                return;
            }, 850)
            if (delta < 0) 
            {
                if (this._scale != 0) 
                {
                    if (this._scale == 1) 
                    {
                        this._scale = 2;
                    }
                }
                else 
                {
                    this._scale = 1;
                }
            }
            else if (delta > 0) 
            {
                if (this._scale != 2) 
                {
                    if (this._scale == 1) 
                    {
                        this._scale = 0;
                    }
                }
                else 
                {
                    this._scale = 1;
                }
            }
            this.scaleToLevel(this._scale);
            return;
        }

        private function changeScale(arg1:baidu.subway.event.SubwayEvent):void
        {
            var loc1:*=arg1.type;
			this.scaleToLevel(this._scaleBar.scaleLevel)
        }

        private function scaleToLevel(arg1:int, arg2:int=-2):void
        {
			//flash.external.ExternalInterface.call("alert('"+arg1+"')");
            var loc2:*=NaN;
            var loc3:*=NaN;
            var loc4:*=NaN;
            if (this._kHandler)  
            {
                this._kHandler.active = false;
            }
            this._dragLayer.removeEventListener(flash.events.MouseEvent.MOUSE_DOWN, this.onDragLayerDown);
            if (this._iconLayer && !(this._scale == 0)) 
            {
                this._iconLayer.visible = false;
            }
            var loc1:*=1;
            if (arg1 != 0) 
            {
                if (arg1 == 2) 
                {
                    loc2 = this._linesLayer.scaleX;
                    loc3 = Math.max(this._linesLayer.width, this._linesHighlightLayer.width) / loc2;
                    loc4 = Math.max(this._linesLayer.height, this._linesHighlightLayer.height) / loc2;
                    loc1 = Math.min(stage.stageWidth / loc3, stage.stageHeight / loc4, 0.8);
                }
            }
            else 
            {
                loc1 = 2;
            }
            gs.TweenLite.to(this._bgLayer, 4 * this.TWEEN_TIME, {"scaleX":loc1, "scaleY":loc1, "ease":gs.easing.Quad.easeOut});
            gs.TweenLite.to(this._linesHighlightLayer, 4 * this.TWEEN_TIME, {"scaleX":loc1, "scaleY":loc1, "ease":gs.easing.Quad.easeOut});
            gs.TweenLite.to(this._resultLayer, 4 * this.TWEEN_TIME, {"scaleX":loc1, "scaleY":loc1, "ease":gs.easing.Quad.easeOut});
            gs.TweenLite.to(this._linesLayer, 4 * this.TWEEN_TIME, {"scaleX":loc1, "scaleY":loc1, "ease":gs.easing.Quad.easeOut, "onComplete":this.onScaleChangeComplete, "onCompleteParams":[loc1]});
            if (this._scaleBar) 
            {
                this._scaleBar.scaleLevel = arg1;
            }
            return;
        }

        private function onScaleChangeComplete(arg1:Number):void
        {
            var loc3:*=null;
            if (this._kHandler) 
            {
                this._kHandler.active = true;
            }
            this._dragLayer.addEventListener(flash.events.MouseEvent.MOUSE_DOWN, this.onDragLayerDown);
            this.normalStationLabel();
            if (this._iconLayer && this._scale == 0) 
            {
                this._iconLayer.visible = true;
            }
            var loc1:*=0;
            var loc2:*=this._swVO.lines.length;
            while (loc1 < loc2) 
            {
                (this._swVO.lines[loc1] as baidu.subway.feature.Line).changeShadow(arg1);
                ++loc1;
            }
            if (this._resultLayer) 
            {
                loc3 = new flash.filters.DropShadowFilter();
                loc3 = new flash.filters.DropShadowFilter();
                loc3.blurX = 0;
                loc3.blurY = 0;
                loc3.distance = 3 * arg1;
                loc3.angle = 45;
                loc3.color = 13421772;
                loc3.alpha = 0.8;
                this._resultLayer.filters = [loc3];
            }
            this.adjustTipsAndInfosPosition();
            if (this._scale == 2) 
            {
                this.adjustPosition(-1);
            }
            return;
        }

        private function normalStationLabel():void
        {
            var loc2:*=NaN;
            var loc5:*=null;
            var loc6:*=0;
            var loc7:*=0;
            var loc8:*=null;
            var loc1:*=this._linesLayer.scaleX;
            if (loc1 < 1) 
            {
                return;
            }
            if (loc1 != 1) 
            {
                loc2 = 0.6;
            }
            else 
            {
                loc2 = 1;
            }
            var loc3:*=0;
            var loc4:*=this._swVO.lines.length;
            while (loc3 < loc4) 
            {
                loc5 = this._swVO.lines[loc3];
                loc6 = 0;
                loc7 = loc5.lineVO.stations.length;
                while (loc6 < loc7) 
                {
                    loc8 = loc5.lineVO.stations[loc6];
                    if (loc8.stationVO.st) 
                    {
                        loc8.changeLabel(loc2);
                    }
                    ++loc6;
                }
                loc5.changeLabel(loc2);
                ++loc3;
            }
            return;
        }

        private function adjustPosition(arg1:int, arg2:Boolean=true, arg3:Number=0, arg4:Number=0):void
        {
            var loc1:*=NaN;
            var loc2:*=NaN;
            var loc3:*=null;
            var loc4:*=null;
            var loc5:*=null;
            var loc6:*=null;
            var loc7:*=null;
            var loc8:*=NaN;
            var loc9:*=NaN;
            this._dragLayer.removeEventListener(flash.events.MouseEvent.MOUSE_DOWN, this.onDragLayerDown);
            if (arg1 != -1) 
            {
                if (arg2) 
                {
                    loc4 = this._swVO.lines[arg1] as baidu.subway.feature.Line;
                    loc5 = loc4.getBounds(stage);
                    loc1 = this._linesLayer.x;
                    loc2 = this._linesLayer.y;
                    loc6 = loc4.lineVO.stations;
                    loc7 = loc6[Math.ceil(loc6.length / 2)] as baidu.subway.feature.Station;
                    if (loc5.width < stage.stageWidth) 
                    {
                        loc8 = (stage.stageWidth - loc5.width) / 2;
                        if (loc5.x < loc8) 
                        {
                            loc1 = loc1 + (loc8 - loc5.x);
                        }
                        else if (loc5.x + loc5.width > stage.stageWidth - loc8) 
                        {
                            loc1 = loc1 - (loc5.x + loc5.width - stage.stageWidth + loc8);
                        }
                    }
                    else 
                    {
                        loc1 = loc1 + (stage.stageWidth / 2 - this._linesLayer.localToGlobal(new flash.geom.Point(loc7.x, loc7.y)).x);
                    }
                    if (loc5.height < stage.stageHeight) 
                    {
                        loc9 = (stage.stageHeight - loc5.height) / 2;
                        if (loc5.y < loc9) 
                        {
                            loc2 = loc2 + (loc9 - loc5.y);
                        }
                        else if (loc5.y + loc5.height > stage.stageHeight - loc9) 
                        {
                            loc2 = loc2 - (loc5.y + loc5.height - stage.stageHeight + loc9);
                        }
                    }
                    else 
                    {
                        loc2 = loc2 + (stage.stageHeight / 2 - this._linesLayer.localToGlobal(new flash.geom.Point(loc7.x, loc7.y)).y);
                    }
                }
                else 
                {
                    loc1 = this._linesLayer.x;
                    loc2 = this._linesLayer.y;
                    loc1 = loc1 + (stage.stageWidth / 2 - this._linesLayer.localToGlobal(new flash.geom.Point(arg3, arg4)).x);
                    loc2 = loc2 + (stage.stageHeight / 2 - this._linesLayer.localToGlobal(new flash.geom.Point(arg3, arg4)).y);
                }
            }
            else 
            {
                loc3 = this._linesLayer.getBounds(stage);
                loc1 = (stage.stageWidth - this._linesLayer.width) / 2 + (this._linesLayer.x - loc3.x);
                loc2 = (stage.stageHeight - this._linesLayer.height) / 2 + (this._linesLayer.y - loc3.y);
            }
            this.adjustPositionWork(loc1, loc2);
            return;
        }

        private function adjustTipsAndInfosPosition():void
        {
            var loc1:*=null;
            var loc2:*=null;
            var loc3:*=null;
            var loc4:*=0;
            var loc5:*=0;
            if (this._startTips && this._startStation) 
            {
                loc1 = this._linesLayer.localToGlobal(new flash.geom.Point(this._startStation.x, this._startStation.y));
                this._startTips.x = loc1.x;
                this._startTips.y = loc1.y;
            }
            if (this._overTips && this._overStation) 
            {
                loc1 = this._linesLayer.localToGlobal(new flash.geom.Point(this._overStation.x, this._overStation.y));
                this._overTips.x = loc1.x;
                this._overTips.y = loc1.y;
            }
            if (this._endTips && this._endStation) 
            {
                loc1 = this._linesLayer.localToGlobal(new flash.geom.Point(this._endStation.x, this._endStation.y));
                this._endTips.x = loc1.x;
                this._endTips.y = loc1.y;
            }
            if (this._startInfo && this._startStation) 
            {
                loc1 = this._linesLayer.localToGlobal(new flash.geom.Point(this._startStation.x, this._startStation.y));
                this._startInfo.x = loc1.x + this._tipsPadding["start"]["x"];
                this._startInfo.y = loc1.y + this._tipsPadding["start"]["y"];
            }
            if (this._endInfo && this._endStation) 
            {
                loc1 = this._linesLayer.localToGlobal(new flash.geom.Point(this._endStation.x, this._endStation.y));
                this._endInfo.x = loc1.x + this._tipsPadding["end"]["x"];
                this._endInfo.y = loc1.y + this._tipsPadding["end"]["y"];
            }
            if (this._transInfos && this._tranStation && this._transInfos.length == this._tranStation.length) 
            {
                loc4 = 0;
                loc5 = this._transInfos.length;
                while (loc4 < loc5) 
                {
                    loc2 = this._tranStation[loc4] as baidu.subway.feature.Station;
                    loc3 = this._transInfos[loc4] as baidu.subway.ui.info.TransInfo;
                    if (loc2) 
                    {
                        loc1 = this._linesLayer.localToGlobal(new flash.geom.Point(loc2.x, loc2.y));
                        loc3.x = loc1.x + this._tipsPadding["trans"][loc4]["x"];
                        loc3.y = loc1.y + this._tipsPadding["trans"][loc4]["y"];
                    }
                    ++loc4;
                }
            }
            return;
        }

        private function clearSearchResult(arg1:baidu.subway.event.SubwayEvent=null, arg2:Boolean=true):void
        {
            var loc1:*=null;
            this._sHandler.reset();
            this._inSearchResult = false;
            this._startStation = null;
            this._endStation = null;
            this._tranStation = [];
            this.unHighLightLine();
            if (this._startInfo && contains(this._startInfo)) 
            {
                removeChild(this._startInfo);
                this._startInfo = null;
            }
            if (this._endInfo && contains(this._endInfo)) 
            {
                removeChild(this._endInfo);
                this._startInfo = null;
            }
            if (this._transInfos) 
            {
                var loc2:*=0;
                var loc3:*=this._transInfos;
                for each (loc1 in loc3) 
                {
                    if (!(loc1 && contains(loc1))) 
                    {
                        continue;
                    }
                    removeChild(loc1);
                }
                this._transInfos = [];
                this._tranStation = [];
            }
            if (this._startTips && contains(this._startTips)) 
            {
                removeChild(this._startTips);
                this._startTips = null;
            }
            if (this._overTips) 
            {
                if (this._overStationParent) 
                {
                    this._overStationParent.addChild(this._overStation);
                }
                this.hideStationOverTips();
                if (arg2) 
                {
                    flash.external.ExternalInterface.call("NS_SW_clearSearchSiteResult");
                }
            }
            if (this._endTips && contains(this._endTips)) 
            {
                removeChild(this._endTips);
                this._endTips = null;
            }
            while (this._resultLayer.numChildren) 
            {
                this._resultLayer.removeChildAt(0);
            }
            this._resultLayer.graphics.clear();
            this.hideMask();
            this.hideLoading();
            if (arg2) 
            {
                try 
                {
                    flash.external.ExternalInterface.call("NS_SW_clearSearchResult");
                }
                catch (err:Error)
                {
                };
            }
            return;
        }

        private function getLineObjectByID(arg1:String):baidu.subway.feature.Line
        {
            var loc3:*=null;
            var loc1:*=0;
            var loc2:*=this._swVO.lines.length;
            while (loc1 < loc2) 
            {
                loc3 = this._swVO.lines[loc1] as baidu.subway.feature.Line;
                if (loc3.lineVO.lid == arg1) 
                {
                    return loc3;
                }
                ++loc1;
            }
            return null;
        }

        private function getStationByID(arg1:String, arg2:String):baidu.subway.feature.Station
        {
            var loc4:*=null;
            var loc1:*=this.getLineObjectByID(arg1);
            var loc2:*=0;
            var loc3:*=loc1.lineVO.stations.length;
            while (loc2 < loc3) 
            {
                loc4 = loc1.lineVO.stations[loc2] as baidu.subway.feature.Station;
                if (loc4.stationVO.sid == arg2) 
                {
                    return loc4;
                }
                ++loc2;
            }
            return null;
        }

        private function deactiveHighlightTimer():void
        {
            if (this._highlightTimer) 
            {
                if (this._highlightTimer.running) 
                {
                    this._highlightTimer.stop();
                }
                this._highlightTimer.removeEventListener(flash.events.TimerEvent.TIMER, this.highLightLineByIndex);
                this._highlightTimer = null;
            }
            return;
        }

        private function deactiveLineTimer():void
        {
            if (this._lineTimer) 
            {
                if (this._lineTimer.running) 
                {
                    this._lineTimer.stop();
                }
                this._lineTimer.removeEventListener(flash.events.TimerEvent.TIMER, this.drawLinesAndStations);
                this._lineTimer = null;
            }
            return;
        }

        private function NS_SW_setCity(arg1:String):void
        {
            this.city = arg1;
            return;
        }
		private function NS_SW_setHighlightLine(arg1:int):void
        {
		
            this._highlightIndex = arg1;
			this.deactiveHighlightTimer();
			this._highlightTimer = new flash.utils.Timer(200, 1);
			this._highlightTimer.addEventListener(flash.events.TimerEvent.TIMER, this.highLightLineByIndex);
			this._highlightTimer.start();
            return;
        }
		private function NS_SW_resetHighlightLine():void
        {
			this.deactiveHighlightTimer();
            this.clearSearchResult();
		}
		
		
		private function NS_SW_setStationTypeMap(map:Object):void{
			Main.stationTypeMap=map;
			return;
		}
		private function NS_SW_setStationUponGroundMap(map:Object):void{
			Main.stationUponGroundMap=map;
			return;
		}
		private function NS_SW_setUserMap(arr:Array,kpiKey:String,reverseFlag:Boolean,maxRadius:Number,maxCount:int):void{
			var map:Object={};
			var max:Number=0;
			var count:int=0;
			for(var i:int=0;i<arr.length;i++){
				var record:Object=arr[i];
				if(!isNaN(record[kpiKey])){
					if(count<maxCount){
						map[record.station]=record[kpiKey];
					}
					max=Math.max(max,record[kpiKey]);
					count++;
				}
			}
			Main.maxRadius=maxRadius;
			Main.maxUser=max;
			Main.userMap=map;
			Main.reverseFlag=reverseFlag;
			
			redraw();
			return;
		}
		
		private function redraw():void{
			var ilength:int = this._swVO.lines.length;
			for(var i:int=0;i<ilength;i++){
				var line = this._swVO.lines[i];
				
				for(var j:int=0;j<line.lineVO.stations.length;j++){
					var loc1:*=line.lineVO.stations[j];
					loc1.drawCircle();
				}
			}
		}
		
        private function NS_SW_setSearchResult(arg1:Array=null, arg2:Boolean=true):void
        {
            this.showSearchResult(arg1, arg2);
            return;
        }

        private function NS_SW_getColorByLineUid(arg1:String):String
        {
            var loc1:*=this.getLineObjectByID(arg1).lineVO.lc;
            var loc2:*="#" + baidu.subway.util.Util.DecToHex(loc1);
            return loc2;
        }

        private function addResultLayer():void
        {
            this._resultLayer = new flash.display.Sprite();
            this._resultLayer.scaleX = this._linesLayer.scaleX || 1;
            this._resultLayer.scaleY = this._linesLayer.scaleY || 1;
            this._resultLayer.x = this._linesLayer.x || stage.stageWidth / 2;
            this._resultLayer.y = this._linesLayer.y || stage.stageHeight / 2;
            addChild(this._resultLayer);
            this._resultLayer.mouseEnabled = false;
            return;
        }

        private function NS_SW_doMouseWheel(arg1:int=0):void
        {
            var loc1:*=false;
            if (this._startTips && this._startTips.isDraging || this._endTips && this._endTips.isDraging) 
            {
                loc1 = true;
            }
            if (!loc1) 
            {
                this.onDragLayerWheel(arg1);
            }
            return;
        }

        private function NS_SW_getInterval(arg1:String="", arg2:String=""):Number
        {
            var loc13:*=null;
            var loc14:*=null;
            if (!arg1 || !arg2 || arg1 == "" || arg2 == "") 
            {
                return 0;
            }
            var loc1:*=0;
            var loc2:*=arg1.split("|");
            var loc3:*=loc2[0] + "|" + loc2[1];
            var loc4:*=this.getLineObjectByID(loc3);
            var loc5:*=loc4.lineVO.loop;
            var loc6:*=-1;
            var loc7:*=-1;
            var loc8:*=0;
            var loc9:*=0;
            var loc10:*=loc4.lineVO.stations;
            var loc11:*=0;
            var loc12:*=loc10.length;
            while (loc11 < loc12) 
            {
                loc13 = loc10[loc11] as baidu.subway.feature.Station;
                loc14 = loc13.stationVO.sid;
                if (loc14 == arg1) 
                {
                    loc8 = loc13.stationVO.interval;
                    loc6 = loc11;
                }
                if (loc14 == arg2) 
                {
                    loc9 = loc13.stationVO.interval;
                    loc7 = loc11;
                }
                if (!(loc6 == -1) && !(loc7 == -1)) 
                {
                    break;
                }
                ++loc11;
            }
            if (loc5) 
            {
                if (loc6 < loc7 && !(loc7 == 0)) 
                {
                    loc1 = loc8;
                }
                else 
                {
                    loc1 = loc9;
                }
            }
            else if (loc6 < loc7) 
            {
                loc1 = loc8;
            }
            else 
            {
                loc1 = loc9;
            }
            return loc1;
        }

        private function NS_SW_searchStation(arg1:String):void
        {
            var loc1:*=null;
            var loc7:*=null;
            var loc12:*=null;
            var loc13:*=null;
            var loc14:*=null;
            if (!arg1 || arg1 == "") 
            {
                return;
            }
            this.clearSearchResult(null, false);
            this.addMask();
            var loc2:*=false;
            var loc3:*=0;
            var loc4:*=0;
            var loc5:*=0;
            var loc6:*=0;
            loc3 = 0;
            loc4 = this._swVO.lines.length;
            while (loc3 < loc4) 
            {
                loc7 = this._swVO.lines[loc3] as baidu.subway.feature.Line;
                loc5 = 0;
                loc6 = loc7.lineVO.stations.length;
                while (loc5 < loc6) 
                {
                    loc12 = loc7.lineVO.stations[loc5] as baidu.subway.feature.Station;
                    loc13 = loc12.stationVO.sid.split("|");
                    if (loc13[loc13.length - 1] == arg1) 
                    {
                        loc1 = loc12;
                        loc2 = true;
                        break;
                    }
                    ++loc5;
                }
                if (loc2) 
                {
                    loc2 = false;
                    break;
                }
                ++loc3;
            }
            if (!loc1) 
            {
                return;
            }
            var loc8:*=loc1.stationVO.ln.split(",");
            var loc9:*=[];
            loc3 = 0;
            loc4 = loc8.length;
            while (loc3 < loc4) 
            {
                loc14 = loc8[loc3];
                loc5 = 0;
                loc6 = this._swVO.lines.length;
                while (loc5 < loc6) 
                {
                    loc7 = this._swVO.lines[loc5] as baidu.subway.feature.Line;
                    if (loc14 == loc7.lineVO.lid) 
                    {
                        loc9.push({"lid":loc7.lineVO.lid, "lb":loc7.lineVO.lb, "color":loc7.lineVO.lc});
                        break;
                    }
                    ++loc5;
                }
                ++loc3;
            }
            var loc10:*=new flash.geom.Point(loc1.x, loc1.y);
            var loc11:*=this._linesLayer.localToGlobal(loc10);
            this._inSearchResult = true;
            this._overStation = loc1;
            this._overStationParent = loc1.parent as baidu.subway.feature.Line;
            this._resultLayer.addChild(loc1);
            this.showStationOverTips(loc9, true);
            this.adjustPosition(1, false, loc1.x, loc1.y);
            return;
        }

        public function configExternalInterface():void
        {
            if (flash.external.ExternalInterface.available) 
            {
                flash.external.ExternalInterface.addCallback("NS_SW_setCity", this.NS_SW_setCity);
                flash.external.ExternalInterface.addCallback("NS_SW_setSearchResult", this.NS_SW_setSearchResult);
                flash.external.ExternalInterface.addCallback("NS_SW_getColorByLineUid", this.NS_SW_getColorByLineUid);
                flash.external.ExternalInterface.addCallback("NS_SW_doMouseWheel", this.NS_SW_doMouseWheel);
                flash.external.ExternalInterface.addCallback("NS_SW_getInterval", this.NS_SW_getInterval);
                flash.external.ExternalInterface.addCallback("NS_SW_searchStation", this.NS_SW_searchStation);
				flash.external.ExternalInterface.addCallback("NS_SW_setStationTypeMap", this.NS_SW_setStationTypeMap);
				flash.external.ExternalInterface.addCallback("NS_SW_setStationUponGroundMap", this.NS_SW_setStationUponGroundMap);
				flash.external.ExternalInterface.addCallback("NS_SW_setUserMap", this.NS_SW_setUserMap);
				flash.external.ExternalInterface.addCallback("NS_SW_setHighlightLine", this.NS_SW_setHighlightLine);
				flash.external.ExternalInterface.addCallback("NS_SW_resetHighlightLine", this.NS_SW_resetHighlightLine);
				
            }
            return;
        }

        public function set city(arg1:String):void
        {
            if (arg1 && !(arg1 == this._city)) 
            {
                this._city = arg1;
                this.init();
            }
            return;
        }

        private function init():void
        { 
			var isScreen=flash.external.ExternalInterface.call("NS_SW_isScreen");
           if(isScreen=="true"){
			this._scale = 0;
		   }else{
			this._scale = 1;
		   }
            
            var loc1:*;
            this._lineIndex = loc1 = 0;
            this._lineLen = loc1;
            this._inSearchResult = false;
            stage.addEventListener(flash.events.Event.RESIZE, this.doResize);
            this.clearUI();
            this.addBgLayer();
            this.addIconLayer();
            this.addDragLayer();
            this.addLineLayer();
            this.addResultLayer();
            this.initHandler();
            this.showLoading();
            this.getSubwayData();
            return;
        }

        private function doResize(arg1:flash.events.Event):void
        {
            var loc7:*=NaN;
            var loc8:*=NaN;
            var loc9:*=NaN;
            var loc1:*=stage.stageWidth;
            var loc2:*=stage.stageHeight;
            var loc3:*=loc1 / 2;
            var loc4:*=loc2 / 2;
            var loc5:*=0;
            var loc6:*=0;
            if (this._stageSizeW) 
            {
                loc5 = (loc1 - this._stageSizeW) / 2;
                loc6 = (loc2 - this._stageSizeH) / 2;
            }
            if (!this._stageSizeW) 
            {
                loc7 = loc3;
                loc8 = loc4;
            }
            else 
            {
                loc7 = this._linesLayer.x + loc5;
                loc8 = this._linesLayer.y + loc6;
            }
            if (this._bgLayer) 
            {
                this._bgLayer.x = loc7;
                this._bgLayer.y = loc8;
            }
            if (this._iconLayer) 
            {
                this._iconLayer.x = loc7;
                this._iconLayer.y = loc8;
            }
            if (this._linesLayer) 
            {
                this._linesLayer.x = loc7;
                this._linesLayer.y = loc8;
            }
            if (this._linesHighlightLayer) 
            {
                this._linesHighlightLayer.x = loc7;
                this._linesHighlightLayer.y = loc8;
            }
            if (this._linesMaskLayer) 
            {
                this._linesMaskLayer.width = loc1;
                this._linesMaskLayer.height = loc2;
            }
            if (this._dragLayer) 
            {
                this._dragLayer.width = loc1;
                this._dragLayer.height = loc2;
            }
            if (this._resultLayer) 
            {
                this._resultLayer.x = loc7;
                this._resultLayer.y = loc8;
            }
            this.adjustTipsAndInfosPosition();
            if (this._legend) 
            {
               this._legend.x = stage.stageWidth - this._legend.width - this.PADDING_POSITION;
				this._legend.y = stage.stageHeight-45;//this.PADDING_POSITION;
            }
            if (this._loading) 
            {
                this._loading.x = loc3;
                this._loading.y = loc4;
            }
            this._stageSizeW = loc1;
            this._stageSizeH = loc2;
            return;
        }

        private function clearUI():void
        {
            while (numChildren) 
            {
                removeChildAt(0);
            }
            if (this._legend && stage.contains(this._legend)) 
            {
                stage.removeChild(this._legend);
            }
            if (this._scaleBar && stage.contains(this._scaleBar)) 
            {
                stage.removeChild(this._scaleBar);
            }
            this.deactiveHighlightTimer();
            this.deactiveLineTimer();
            return;
        }

        private function addBgLayer():void
        {
            this._bgLayer = new flash.display.Sprite();
            this._bgLayer.x = stage.stageWidth / 2;
            this._bgLayer.y = stage.stageHeight / 2;
            addChild(this._bgLayer);
            return;
        }

        private function addIconLayer():void
        {
            this._iconLayer = new flash.display.Sprite();
            this._iconLayer.x = stage.stageWidth / 2;
            this._iconLayer.y = stage.stageHeight / 2;
            addChild(this._iconLayer);
            this._iconLayer.visible = false;
            return;
        }

        private function addDragLayer():void
        {
            this._dragLayer = new flash.display.Sprite();
            var loc2:*;
            this._dragLayer.y = loc2 = 0;
            this._dragLayer.x = loc2;
            var loc1:*=this._dragLayer.graphics;
            loc1.lineStyle();
            loc1.beginFill(16777215, 0);
            loc1.drawRect(0, 0, stage.stageWidth, stage.stageHeight);
            loc1.endFill();
            addChild(this._dragLayer);
            this._dragLayer.addEventListener(flash.events.MouseEvent.MOUSE_DOWN, this.onDragLayerDown);
            return;
        }

        private function addLineLayer():void
        {
            this._linesLayer = new flash.display.Sprite();
            this._linesLayer.x = stage.stageWidth / 2;
            this._linesLayer.y = stage.stageHeight / 2;
            addChild(this._linesLayer);
            this._linesLayer.mouseEnabled = false;
            this._linesHighlightLayer = new flash.display.Sprite();
            this._linesHighlightLayer.x = stage.stageWidth / 2;
            this._linesHighlightLayer.y = stage.stageHeight / 2;
            addChild(this._linesHighlightLayer);
            this._linesHighlightLayer.mouseEnabled = false;
            return;
        }

        private function adjustPositionWork(arg1:Number, arg2:Number):void
        {
            var px:Number;
            var py:Number;
            var deltX:Number;
            var deltY:Number;
            var toX:Number;
            var toY:Number;
            var trif:baidu.subway.ui.info.TransInfo;

            var loc1:*;
            toX = NaN;
            toY = NaN;
            trif = null;
            px = arg1;
            py = arg2;
            gs.TweenLite.to(this._bgLayer, 4 * this.TWEEN_TIME, {"x":px, "y":py, "ease":gs.easing.Quad.easeOut});
            gs.TweenLite.to(this._iconLayer, 4 * this.TWEEN_TIME, {"x":px, "y":py, "ease":gs.easing.Quad.easeOut});
            gs.TweenLite.to(this._linesHighlightLayer, 4 * this.TWEEN_TIME, {"x":px, "y":py, "ease":gs.easing.Quad.easeOut});
            gs.TweenLite.to(this._resultLayer, 4 * this.TWEEN_TIME, {"x":px, "y":py, "ease":gs.easing.Quad.easeOut});
            gs.TweenLite.to(this._linesLayer, 4 * this.TWEEN_TIME, {"x":px, "y":py, "ease":gs.easing.Quad.easeOut, "onComplete":function ():void
            {
                _dragLayer.addEventListener(flash.events.MouseEvent.MOUSE_DOWN, onDragLayerDown);
                return;
            }})
            deltX = px - this._linesLayer.x;
            deltY = py - this._linesLayer.y;
            if (this._startTips) 
            {
                toX = this._startTips.x + deltX;
                toY = this._startTips.y + deltY;
                gs.TweenLite.to(this._startTips, 4 * this.TWEEN_TIME, {"x":toX, "y":toY, "ease":gs.easing.Quad.easeOut});
            }
            if (this._overTips) 
            {
                toX = this._overTips.x + deltX;
                toY = this._overTips.y + deltY;
                gs.TweenLite.to(this._overTips, 4 * this.TWEEN_TIME, {"x":toX, "y":toY, "ease":gs.easing.Quad.easeOut});
            }
            if (this._endTips) 
            {
                toX = this._endTips.x + deltX;
                toY = this._endTips.y + deltY;
                gs.TweenLite.to(this._endTips, 4 * this.TWEEN_TIME, {"x":toX, "y":toY, "ease":gs.easing.Quad.easeOut});
            }
            if (this._startInfo) 
            {
                toX = this._startInfo.x + deltX;
                toY = this._startInfo.y + deltY;
                gs.TweenLite.to(this._startInfo, 4 * this.TWEEN_TIME, {"x":toX, "y":toY, "ease":gs.easing.Quad.easeOut});
            }
            if (this._endInfo) 
            {
                toX = this._endInfo.x + deltX;
                toY = this._endInfo.y + deltY;
                gs.TweenLite.to(this._endInfo, 4 * this.TWEEN_TIME, {"x":toX, "y":toY, "ease":gs.easing.Quad.easeOut});
            }
            if (this._transInfos) 
            {
                var loc2:*=0;
                var loc3:*=this._transInfos;
                for each (trif in loc3) 
                {
                    toX = trif.x + deltX;
                    toY = trif.y + deltY;
                    gs.TweenLite.to(trif, 4 * this.TWEEN_TIME, {"x":toX, "y":toY, "ease":gs.easing.Quad.easeOut});
                }
            }
            return;
        }

        private function initHandler():void
        {
            if (this._sHandler) 
            {
                this._sHandler.active = false;
            }
            this._sHandler = new baidu.subway.handler.SearchHandler();
            this._sHandler.addEventListener(baidu.subway.event.SubwayEvent.SH_SET_START, this.setStartPoint);
            this._sHandler.addEventListener(baidu.subway.event.SubwayEvent.SH_SET_END, this.setEndPoint);
            this._sHandler.param = this._linesLayer;
            this._sHandler.active = true;
            if (this._kHandler) 
            {
                this._kHandler.active = false;
            }
            this._kHandler = new baidu.subway.handler.KeyHandler(stage);
            this._kHandler.addEventListener(baidu.subway.event.SubwayEvent.KH_LAYER_MOVE, this.onDragLayerMove);
            this._kHandler.addEventListener(baidu.subway.event.SubwayEvent.KH_SCALE_CHANGE, this.changeScale);
            this._kHandler.param = this._linesLayer;
            this._kHandler.active = true;
            if (this._dHandler) 
            {
                this._dHandler.active = false;
            }
            this._dHandler = new baidu.subway.handler.DragHandler(stage);
            this._dHandler.addEventListener(baidu.subway.event.SubwayEvent.DH_LAYER_MOVE, this.onDragLayerMove);
            this._dHandler.addEventListener(baidu.subway.event.SubwayEvent.DH_LAYER_UP, this.onDragLayerUp);
            return;
        }

        private function addMask():void
        {
            var loc2:*=null;
            var loc1:*=Math.min(this.getChildIndex(this._linesHighlightLayer), getChildIndex(this._resultLayer), 4);
            if (!this._linesMaskLayer) 
            {
                this._linesMaskLayer = new flash.display.Sprite();
                loc2 = this._linesMaskLayer.graphics;
                loc2.lineStyle();
                loc2.beginFill(0x041c28, 0.9);
                loc2.drawRect(0, 0, stage.stageWidth, stage.stageHeight);
                loc2.endFill();
            }
            addChildAt(this._linesMaskLayer, loc1);
            this._linesMaskLayer.mouseEnabled = false;
            return;
        }

        private function hideMask():void
        {
            if (this._linesMaskLayer) 
            {
                if (contains(this._linesMaskLayer)) 
                {
                    removeChild(this._linesMaskLayer);
                }
                this._linesMaskLayer = null;
            }
            return;
        }

        private function showLoading():void
        {
            if (!this._loading) 
            {
                this._loading = new Loading();
            }
            if (!contains(this._loading)) 
            {
                addChild(this._loading);
            }
            this._loading.x = stage.stageWidth / 2;
            this._loading.y = stage.stageHeight / 2;
            return;
        }

        private function hideLoading():void
        {
            if (this._loading) 
            {
                if (contains(this._loading)) 
                {
                    removeChild(this._loading);
                }
                this._loading = null;
            }
            return;
        }

        private function getSubwayData():void
        {
			trace("subway getSubwayData");
            if (!this._dm) 
            {
                this._dm = baidu.subway.data.DataManager.getInstance();
                this._dm.addEventListener(baidu.subway.event.SubwayEvent.DM_DATA_COMPLETE, this.onDataComplete);
                this._dm.addEventListener(baidu.subway.event.SubwayEvent.DM_DATA_ERROR, this.onDataError);
            }
            this._dm.getData(this._city, this.DATATYPE);
            return;
        }

        private function onDataComplete(arg1:baidu.subway.event.SubwayEvent):void
        {
            this._swVO = arg1.data as baidu.subway.vo.SubwayVO;
            if (!this._swVO) 
            {
                trace("unknow error!");
                return;
            }
            this.hideLoading();
            this.addLineAndStation();
            return;
        }

        private function onDataError(arg1:baidu.subway.event.SubwayEvent):void
        {
            trace("网络错误或者跨域错误或者数据格式错误");
            return;
        }

        private function addLineAndStation():void
        {
            this._lineLen = this._swVO.lines.length;
            this._lineTimer = new flash.utils.Timer(50);
            this._lineTimer.addEventListener(flash.events.TimerEvent.TIMER, this.drawLinesAndStations);
            this._lineTimer.start();
            return;
        }

        private const DATATYPE:String="XML";

        private const PADDING_POSITION:Number=10;

        private const TWEEN_TIME:Number=0.2;

        private var _linesLayer:flash.display.Sprite;

        private var _linesMaskLayer:flash.display.Sprite;

        private var _linesHighlightLayer:flash.display.Sprite;

        private var _resultLayer:flash.display.Sprite;

        private var _loading:Loading;

        private var _dm:baidu.subway.data.DataManager;

        private var _swVO:baidu.subway.vo.SubwayVO;

        private var _lineLen:int=0;

        private var _lineIndex:int=0;

        private var _scaleBar:baidu.subway.ui.control.ScaleBar;

        private var _legend:baidu.subway.ui.control.AdvancedLegend;

        private var _endInfo:baidu.subway.ui.info.EndInfo;

        private var _startInfo:baidu.subway.ui.info.StartInfo;

        private var _transInfos:Array;

        private var _tranStation:Array;

        private var _tipsPadding:Object;

        private var _startTips:baidu.subway.ui.tips.StartTips;

        private var _overTips:baidu.subway.ui.tips.OverTips;

        private var _endTips:baidu.subway.ui.tips.EndTips;

        private var _lineTips:baidu.subway.ui.tips.LineTips;

        private var _startStation:baidu.subway.feature.Station;

        private var _overStation:baidu.subway.feature.Station;

        private var _overStationParent:baidu.subway.feature.Line;

        private var _endStation:baidu.subway.feature.Station;

        private var _transStations:Array;

        private var _highLightedLine:baidu.subway.feature.Line;

        private var _sHandler:baidu.subway.handler.SearchHandler;

        private var _dHandler:baidu.subway.handler.DragHandler;

        private var _kHandler:baidu.subway.handler.KeyHandler;

        private var _city:String;

        private var _scale:int=1;

        private var _stageSizeW:Number;

        private var _stageSizeH:Number;

        private var _highlightTimer:flash.utils.Timer;

        private var _highlightIndex:int;

        private var _lineTimer:flash.utils.Timer;

        private var _bgLayer:flash.display.Sprite;

        private var _iconLayer:flash.display.Sprite;

        private var _dragLayer:flash.display.Sprite;

        private var _features:Array;

        private var _inSearchResult:Boolean=false;
    }
}
