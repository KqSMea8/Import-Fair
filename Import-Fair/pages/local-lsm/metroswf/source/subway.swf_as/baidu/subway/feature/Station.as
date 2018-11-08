package baidu.subway.feature 
{
    import baidu.subway.event.*;
    import baidu.subway.mark.*;
    import baidu.subway.symbol.*;
    import baidu.subway.symbol.icon.*;
    import baidu.subway.symbol.station.*;
    import baidu.subway.ui.tips.*;
    import baidu.subway.vo.*;
    import flash.display.*;
    import flash.events.*;
    
    public class Station extends baidu.subway.feature.Feature
    {
        public function Station(arg1:baidu.subway.vo.StationVO)
        {
            var loc1:*=null;
            super();
            this._stationVO = arg1;
            _mark = new baidu.subway.mark.StationMark(this._stationVO.lb, this._stationVO.iu, this._stationVO.rx, this._stationVO.ry, this._stationVO.slb);
            addChild(_mark);
            if (this._stationVO.icon != "") 
            {
                loc1 = new flash.display.Sprite();
                addChild(loc1);
                this._isymbol = new baidu.subway.symbol.icon.IconSymbol(loc1, this._stationVO.icon);
            }
            this._shp = new flash.display.Sprite();
            addChild(this.shp);
			var stationType:String=Main.stationTypeMap[this._stationVO.lb];//3g,4g  
            if (this._stationVO.iu)  
            {
                if (this._stationVO.ex) 
                {
					
                    _symbol = new baidu.subway.symbol.station.ExStationSymbol(this.shp, this._stationVO.dx, this._stationVO.dy, this._stationVO.icon,stationType,this._stationVO.lb,this._stationVO.ex);
                }
                else 
                {
					if(stationType!=null){
						_symbol = new baidu.subway.symbol.station.ExStationSymbol(this.shp, this._stationVO.dx, this._stationVO.dy, this._stationVO.icon,stationType,this._stationVO.lb);
					}else{
						_symbol = new baidu.subway.symbol.station.StationSymbol(this.shp, this._stationVO.color, this._stationVO.ex, this._stationVO.iu, this._stationVO.dx, this._stationVO.dy, this._stationVO.icon);
					}
                }
            }
            else 
            {
                _symbol = new baidu.subway.symbol.station.NUStationSymbol(this.shp, this._stationVO.dx, this._stationVO.dy, this._stationVO.icon);
            }
            if (this._stationVO.iu) 
            {
                var loc2:*;
                this.shp.useHandCursor = loc2 = true;
                this.shp.buttonMode = loc2 = loc2;
                this.shp.mouseEnabled = loc2;
                this.shp.addEventListener(flash.events.MouseEvent.ROLL_OVER, this.onStationEvent);
                this.shp.addEventListener(flash.events.MouseEvent.ROLL_OUT, this.onStationEvent);
                this.shp.addEventListener(flash.events.MouseEvent.CLICK, this.onStationEvent);
            }
            else 
            {
                this.shp.useHandCursor = loc2 = false;
                this.shp.buttonMode = loc2 = loc2;
                this.shp.mouseEnabled = loc2;
            }
            return;
        }

        public function get stationVO():baidu.subway.vo.StationVO
        {
            return this._stationVO;
        }

        public function get shp():flash.display.Sprite
        {
            return this._shp;
        }

        public override function draw():void
        {
			
            _mark.draw();
            _symbol.draw();
            if (this._isymbol) 
            {
                this._isymbol.draw();
            }
            return;
        }
		
		public function drawCircle():void
        {
			var exSymbol=_symbol as baidu.subway.symbol.station.ExStationSymbol;
			if(exSymbol!=null){
				exSymbol.drawCircle();
			}
		}
		
		public function hideCircle():void
        {
			var exSymbol=_symbol as baidu.subway.symbol.station.ExStationSymbol;
			if(exSymbol!=null){
				exSymbol.hideCircle();
			}
		}
		public function showCircle():void
        {
			var exSymbol=_symbol as baidu.subway.symbol.station.ExStationSymbol;
			if(exSymbol!=null){
				exSymbol.showCircle();
			}
		}
		

        public override function changeLabel(arg1:Number):void
        {
            _mark.changeLabel(arg1);
            return;
        }

        public function hightLightStation():void
        {
            _mark.highlight();
            return;
        }

        public function unHightLightStation():void
        {
            _mark.unHighlight();
            return;
        }

        public function createOverTips(arg1:Array, arg2:Number):void
        {
            if (!this._overTips) 
            {
                this._overTips = new baidu.subway.ui.tips.OverTips(this._stationVO.sid, this._stationVO.lb, arg1, 0, 0, this._stationVO.ex, arg2);
                this.shp.addChild(this._overTips);
            }
            return;
        }

        public function removeOverTips():void
        {
            if (this._overTips && this.shp.contains(this._overTips)) 
            {
                this.shp.removeChild(this._overTips);
                this._overTips = null;
            }
            return;
        }

        private function onStationEvent(arg1:flash.events.MouseEvent):void
        {
            var loc1:*=null;
            if (arg1.type != flash.events.MouseEvent.ROLL_OVER) 
            {
                if (arg1.type != flash.events.MouseEvent.ROLL_OUT) 
                {
                    if (arg1.type == flash.events.MouseEvent.CLICK) 
                    {
                        loc1 = new baidu.subway.event.SubwayEvent(baidu.subway.event.SubwayEvent.STATION_CLICK, true);
                    }
                }
                else 
                {
                    loc1 = new baidu.subway.event.SubwayEvent(baidu.subway.event.SubwayEvent.STATION_OUT, true);
                    if (this._sot && contains(this._sot)) 
                    {
                        removeChild(this._sot);
                        this._sot = null;
                    }
                }
            }
            else 
            {
                loc1 = new baidu.subway.event.SubwayEvent(baidu.subway.event.SubwayEvent.STATION_OVER, true);
                if (!this._sot) 
                {
                    this._sot = new SOT() as flash.display.MovieClip;
                    if (this._stationVO.ex) 
                    {
                        var loc2:*;
                        this._sot.scaleY = loc2 = 1.2;
                        this._sot.scaleX = loc2;
                    }
                    this.addChildAt(this._sot, 0);
                    this._sot.mouseEnabled = false;
                }
            }
            dispatchEvent(loc1);
            return;
        }

        private var _stationVO:baidu.subway.vo.StationVO;

        private var _isymbol:baidu.subway.symbol.ISymbol;

        private var _sot:flash.display.MovieClip;

        private var _shp:flash.display.Sprite;

        private var _overTips:baidu.subway.ui.tips.OverTips;
    }
}
