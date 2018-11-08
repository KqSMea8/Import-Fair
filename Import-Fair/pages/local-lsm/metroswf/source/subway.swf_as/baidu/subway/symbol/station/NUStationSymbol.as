package baidu.subway.symbol.station 
{
    import baidu.subway.symbol.*;
    import baidu.subway.util.*;
    import flash.display.*;
    import gs.*;
    import gs.easing.*;
    
    public class NUStationSymbol extends Object implements baidu.subway.symbol.ISymbol
    {
        public function NUStationSymbol(arg1:flash.display.Sprite, arg2:Number, arg3:Number, arg4:String)
        {
            super();
            this._shp = arg1;
            this._dx = arg2;
            this._dy = arg3;
            this._icon = arg4;
            return;
        }

        public function draw():void
        {
            this._shp.x = this._dx;
            this._shp.y = this._dy;
            var loc1:*=this._shp.graphics;
            loc1.clear();
            loc1.lineStyle(this.ST_CIRCLE_BORDER, baidu.subway.util.Util.NOT_USED_COLOR);
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
            trace("NUStationSymbol return null");
            return null;
        }

        private const ST_CIRCLE_RADIUS:Number=5;

        private const ST_CIRCLE_BORDER:Number=2;

        private const ST_TWEEN_TIME:Number=0.5;

        private var _shp:flash.display.Sprite;

        private var _dx:Number;

        private var _dy:Number;

        private var _icon:String;
		
		public var radius:Number=0;
    }
}
