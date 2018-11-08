package baidu.subway.symbol.line 
{
    import baidu.subway.feature.*;
    import baidu.subway.symbol.*;
    import baidu.subway.util.*;
    import flash.display.*;
    import flash.events.*;
    import flash.filters.*;
    import flash.utils.*;
    
    public class LineSymbol extends Object implements baidu.subway.symbol.ISymbol
    {
        public function LineSymbol(arg1:flash.display.Sprite, arg2:uint, arg3:Boolean, arg4:Array)
        {
            super();
            this._shp = arg1;
            this._g = this._shp.graphics;
            this._lc = arg2;
            this._loop = arg3;
            this._stations = arg4;
            return;
        }

        public function draw():void
        {
            this._len = this._stations.length;
            this._t = new flash.utils.Timer(Math.ceil(80 / this._len));
            this._t.addEventListener(flash.events.TimerEvent.TIMER, this.drawLine);
            this._t.start();
            return;
        }

        private function drawLine(arg1:flash.events.TimerEvent):void
        {
            var loc5:*=null;
            var loc6:*=null;
            var loc7:*=NaN;
            var loc8:*=NaN;
            var loc9:*=NaN;
            var loc10:*=NaN;
            var loc11:*=NaN;
            var loc12:*=NaN;
            var loc13:*=NaN;
            var loc14:*=NaN;
            var loc1:*=this._stations[this._index];
            var loc2:*=loc1.stationVO.x;
            var loc3:*=loc1.stationVO.y;
            var loc4:*=loc1.stationVO.rc;
            if (loc4) 
            {
                this.checkLineState(this._index + 1);
            }
            else 
            {
                this.checkLineState(this._index);
            }
            if (this._index != 0) 
            {
                if (loc4) 
                {
                    loc5 = this._stations[this._index - 1];
                    loc6 = this._stations[this._index + 1];
                    loc7 = loc5.stationVO.x;
                    loc8 = loc6.stationVO.x;
                    loc9 = loc5.stationVO.y;
                    loc10 = loc6.stationVO.y;
                    loc11 = 2 * loc2 - (loc7 + loc8) / 2;
                    loc12 = 2 * loc3 - (loc9 + loc10) / 2;
                    this._g.curveTo(loc11, loc12, loc8, loc10);
                    var loc15:*;
                    var loc16:*=((loc15 = this)._index + 1);
                    loc15._index = loc16;
                }
                else 
                {
                    this._g.lineTo(loc2, loc3);
                }
            }
            else 
            {
                this._g.moveTo(loc2, loc3);
            }
            if (this._loop) 
            {
                if (this._index == this._len - 1) 
                {
                    loc13 = this._stations[0].stationVO.x;
                    loc14 = this._stations[0].stationVO.y;
                    this._g.lineTo(loc13, loc14);
                }
            }
            loc16 = ((loc15 = this)._index + 1);
            loc15._index = loc16;
            if (this._index == this._len) 
            {
                this._t.stop();
                this._t.removeEventListener(flash.events.TimerEvent.TIMER, this.drawLine);
                this._t = null;
                this.changeShadow(1);
            }
            return;
        }

        public function changeShadow(arg1:Number=1):void
        {
            var loc1:*=new flash.filters.DropShadowFilter();
            loc1.blurX = 0;
            loc1.blurY = 0;
            loc1.distance = 3 * arg1;
            loc1.angle = 45;
            loc1.color = this.LN_SHADOW_COLOR;
            loc1.alpha = 0.8;
            this._shp.filters = [loc1];
            return;
        }

        private function checkLineState(arg1:int):void
        {
            var loc1:*=this._stations[arg1];
            if (!loc1 || !loc1.stationVO.st) 
            {
                return;
            }
            if (loc1.stationVO.iu) 
            {
                this._g.lineStyle(this.LN_THICK_NORMAL, this._lc);
                this._notused = false;
            }
            else 
            {
                if (this._notused) 
                {
                    this._g.lineStyle(this.LN_THICK_NORMAL, baidu.subway.util.Util.NOT_USED_COLOR);
                }
                this._notused = true;
            }
            return;
        }

        public function drawResult(... rest):flash.display.DisplayObject
        {
            var loc9:*=null;
            var loc17:*=0;
            var loc18:*=0;
            var loc19:*=null;
            var loc20:*=NaN;
            var loc21:*=NaN;
            var loc22:*=false;
            var loc23:*=null;
            var loc24:*=null;
            var loc25:*=NaN;
            var loc26:*=NaN;
            var loc27:*=NaN;
            var loc28:*=NaN;
            var loc29:*=NaN;
            var loc30:*=NaN;
            var loc31:*=null;
            var loc32:*=NaN;
            if (rest.length != 4) 
            {
                return null;
            }
            var loc1:*=rest[0];
            var loc2:*=rest[1];
            var loc3:*=rest[2];
            var loc4:*=rest[3];
            var loc5:*=[];
            var loc6:*=-1;
            var loc7:*=-1;
            var loc8:*=-1;
            var loc10:*=0;
            var loc11:*=this._stations.length;
            while (loc10 < loc11) 
            {
                loc9 = this._stations[loc10] as baidu.subway.feature.Station;
                if (loc9.stationVO.sid == loc2) 
                {
                    loc6 = loc10;
                }
                if (loc9.stationVO.sid == loc3) 
                {
                    loc7 = loc10;
                }
                if (loc9.stationVO.sid == loc4) 
                {
                    loc8 = loc10;
                }
                if (!(loc6 == -1) && !(loc8 == -1) && !(loc7 == -1)) 
                {
                    break;
                }
                ++loc10;
            }
            if (this._loop) 
            {
                loc17 = this._stations.length - 1;
                loc18 = loc17;
                while (loc18 > 0) 
                {
                    loc9 = this._stations[loc18] as baidu.subway.feature.Station;
                    if (loc9.stationVO.st) 
                    {
                        loc17 = loc18;
                        break;
                    }
                    --loc18;
                }
                if (loc6 != 0) 
                {
                    if (loc6 != loc17) 
                    {
                        if (loc7 < loc8) 
                        {
                            if (loc7 < loc6) 
                            {
                                if (loc6 > loc8) 
                                {
                                    loc5 = this._stations.slice(loc6, this._stations.length).concat(this._stations.slice(0, loc8 + 1));
                                }
                                else 
                                {
                                    loc5 = this._stations.slice(loc8, this._stations.length).concat(this._stations.slice(0, loc6 + 1));
                                }
                            }
                            else 
                            {
                                loc5 = this._stations.slice(loc6, loc8 + 1);
                            }
                        }
                        else if (loc7 != loc8) 
                        {
                            if (loc7 < loc6) 
                            {
                                loc5 = this._stations.slice(loc8, loc6 + 1);
                            }
                            else 
                            {
                                loc5 = this._stations.slice(loc6, this._stations.length).concat(this._stations.slice(0, loc8 + 1));
                            }
                        }
                        else if (loc7 != 0) 
                        {
                            if (loc6 < loc8) 
                            {
                                loc5 = this._stations.slice(loc6, loc8 + 1);
                            }
                            else 
                            {
                                loc5 = this._stations.slice(loc8, loc6 + 1);
                            }
                        }
                        else if (loc6 != loc17) 
                        {
                            loc5 = this._stations.slice(loc8, loc6 + 1);
                        }
                        else 
                        {
                            loc5 = this._stations.slice(loc6, this._stations.length).concat(this._stations.slice(0, loc8 + 1));
                        }
                    }
                    else if (loc7 > loc8) 
                    {
                        loc5 = this._stations.slice(loc8, loc6 + 1);
                    }
                    else if (loc7 != loc8) 
                    {
                        loc5 = this._stations.slice(loc6, this._stations.length).concat(this._stations.slice(loc7, loc8 + 1));
                    }
                    else if (loc8 != 0) 
                    {
                        loc5 = this._stations.slice(loc8, loc6 + 1);
                    }
                    else 
                    {
                        loc5 = loc5.concat(this._stations.slice(loc6, this._stations.length));
                        loc5.push(this._stations[loc8]);
                    }
                }
                else if (loc7 < loc8) 
                {
                    loc5 = this._stations.slice(loc6, loc8 + 1);
                }
                else if (loc7 != loc8) 
                {
                    loc5 = loc5.concat(this._stations.slice(loc8, this._stations.length));
                    loc5.push(this._stations[loc6]);
                }
                else if (loc8 == loc17) 
                {
                    loc5 = this._stations.slice(loc8, this._stations.length);
                    loc5.push(this._stations[loc6]);
                }
                else 
                {
                    loc5 = this._stations.slice(loc6, loc8 + 1);
                }
            }
            else if (loc6 < loc8) 
            {
                loc5 = this._stations.slice(loc6, loc8 + 1);
            }
            else 
            {
                loc5 = this._stations.slice(loc8, loc6 + 1);
            }
            var loc12:*=new flash.display.Sprite();
            var loc13:*=loc12.graphics;
            loc13.lineStyle(this.LN_WIDTH_RESULT, this._lc);
            var loc14:*=0;
            var loc15:*=loc5.length;
            while (loc14 < loc15) 
            {
                loc19 = loc5[loc14] as baidu.subway.feature.Station;
                loc20 = loc19.stationVO.x;
                loc21 = loc19.stationVO.y;
                loc22 = loc19.stationVO.rc;
                if (loc14 != 0) 
                {
                    if (loc22) 
                    {
                        loc23 = loc5[loc14 - 1] as baidu.subway.feature.Station;
                        loc24 = loc5[loc14 + 1] as baidu.subway.feature.Station;
                        loc25 = loc23.stationVO.x;
                        loc26 = loc24.stationVO.x;
                        loc27 = loc23.stationVO.y;
                        loc28 = loc24.stationVO.y;
                        loc29 = 2 * loc20 - (loc25 + loc26) / 2;
                        loc30 = 2 * loc21 - (loc27 + loc28) / 2;
                        loc13.curveTo(loc29, loc30, loc26, loc28);
                        ++loc14;
                    }
                    else 
                    {
                        loc13.lineTo(loc20, loc21);
                    }
                }
                else 
                {
                    loc13.moveTo(loc20, loc21);
                }
                loc19 = loc5[loc14] as baidu.subway.feature.Station;
                loc20 = loc19.stationVO.x;
                loc21 = loc19.stationVO.y;
                if (loc19.stationVO.dx) 
                {
                    loc20 = loc20 + loc19.stationVO.dx;
                }
                if (loc19.stationVO.dy) 
                {
                    loc21 = loc21 + loc19.stationVO.dy;
                }
                loc22 = loc19.stationVO.rc;
                if (loc19.stationVO.st) 
                {
                    if (loc19.stationVO.ex) 
                    {
                        loc31 = new StationIcon();
                        loc31.x = loc20;
                        loc31.y = loc21;
                    }
                    else 
                    {
                        loc32 = this.LN_WIDTH_RESULT / 2;
                        if (loc14 == 0 || loc14 == loc15 - 1) 
                        {
                            loc32 = loc32 * 1.2;
                        }
                        loc31 = new flash.display.Sprite();
                        loc31.graphics.lineStyle(this.ST_CIRCLE_BORDER, this._lc);
                        loc31.graphics.beginFill(16777215);
                        loc31.graphics.drawCircle(loc20, loc21, loc32);
                        loc31.graphics.endFill();
                    }
                    loc12.addChild(loc31);
                    loc31.mouseEnabled = false;
                }
                ++loc14;
            }
            var loc16:*=new flash.filters.DropShadowFilter();
            loc16.blurX = 0;
            loc16.blurY = 0;
            loc16.distance = 3;
            loc16.angle = 45;
            loc16.color = this.LN_SHADOW_COLOR;
            loc16.alpha = 0.8;
            loc12.filters = [loc16];
            return loc12;
        }

        private const LN_THICK_NORMAL:Number=5;

        private const LN_WIDTH_RESULT:Number=8;

        private const LN_SHADOW_COLOR:uint=13421772;

        private const ST_CIRCLE_BORDER:Number=2;

        private var _shp:flash.display.Sprite;

        private var _g:flash.display.Graphics;

        private var _lc:uint;

        private var _loop:Boolean;

        private var _stations:Array;

        private var _t:flash.utils.Timer;

        private var _len:int=0;

        private var _index:int=0;

        private var _notused:Boolean=false;
    }
}
