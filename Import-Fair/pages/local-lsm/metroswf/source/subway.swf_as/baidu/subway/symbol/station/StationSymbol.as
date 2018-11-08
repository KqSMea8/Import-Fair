package baidu.subway.symbol.station 
{
    import baidu.subway.symbol.*;
    import flash.display.*;
    import gs.*;
    import gs.easing.*;
    
    public class StationSymbol extends Object implements baidu.subway.symbol.ISymbol
    {
        public function StationSymbol(arg1:flash.display.Sprite, arg2:uint, arg3:Boolean, arg4:Boolean, arg5:Number, arg6:Number, arg7:String)
        {
            super();
            this._shp = arg1;
            this._lc = arg2;
            this._ex = arg3;
            this._iu = arg4;
            this._dx = arg5;
            this._dy = arg6;
            this._icon = arg7;
            return;
        }

        public function draw():void
        {
            this._shp.x = this._dx;
            this._shp.y = this._dy;
            var loc1:*=this._shp.graphics;
            loc1.clear();
            if (this._iu) 
            {
                loc1.lineStyle(this.ST_CIRCLE_BORDER, this._lc);
            }
            else 
            {
                loc1.lineStyle(this.ST_CIRCLE_BORDER, 13421772);
            }
            loc1.beginFill(16777215, 1);
            loc1.drawCircle(0, 0, this.ST_CIRCLE_RADIUS);
            loc1.endFill();
            this._shp.alpha = 0;
            var loc2:*;
            this._shp.scaleY = loc2 = 1.5;
            this._shp.scaleX = loc2;
            gs.TweenLite.to(this._shp, this.ST_TWEEN_TIME, {"alpha":1, "scaleX":1, "scaleY":1, "ease":gs.easing.Quad.easeOut});
            return;
        }

        public function changeShadow(arg1:Number=1):void
        {
            return;
        }

        public function drawResult(... rest):flash.display.DisplayObject
        {
            trace("StationSymbol return null");
            return null;
        }

        private const ST_CIRCLE_RADIUS:Number=5;

        private const ST_CIRCLE_BORDER:Number=2;

        private const ST_TWEEN_TIME:Number=0.5;

        private var _shp:flash.display.Sprite;

        private var _lc:uint;

        private var _ex:Boolean;

        private var _iu:Boolean;

        private var _dx:Number;

        private var _dy:Number;

        private var _icon:String;
		
		public var radius:Number=0;
    }
}
