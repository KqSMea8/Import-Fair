package baidu.subway.symbol.station 
{
    import baidu.subway.symbol.*;
    import flash.display.*;
    import gs.*;
    import gs.easing.*;
    
    public class ExStationSymbol extends Object implements baidu.subway.symbol.ISymbol
    {
        public function ExStationSymbol(arg1:flash.display.Sprite, arg2:Number, arg3:Number, arg4:String,gType:String="",stationName:String="",isEx:Boolean=false)
        {
            super();
            this._shp = arg1;
            this._dx = arg2;
            this._dy = arg3;
            this._icon = arg4;
			this._gType=gType;
			this._stationName=stationName;
			this._isEx=isEx;
            return;
        }

        public function draw():void
        {
			
            var loc1:*=null;
			var locEx:*=null;
            this._shp.x = this._dx;
            this._shp.y = this._dy;
			
			
			
			var uponFlag:Boolean=Main.stationUponGroundMap[this._stationName]==true;
			var unContinuityFlag:Boolean=Main.stationContinuityMap[this._stationName];
			
            //loc1 = new StationIcon;
			if(unContinuityFlag){
				loc1 = new Station4GUC();
			}else if(this._gType=="3g"){
				if(uponFlag){
					loc1 = new Station3GUp();
				}else{
					loc1 = new Station3GDown();
				}
			}else if(this._gType=="4g"){
				if(uponFlag){
					loc1 = new Station4GUp();
				}else{
					loc1 = new Station4GDown();
				}
			}else{
				loc1 = new StationIcon;
			}
			
			if(this._isEx){
				locEx=new StationIcon;
				this._shp.addChild(locEx);
			}
			
			
			
            this._shp.addChild(loc1);
            this._shp.alpha = 0;
            var loc2:*;
            this._shp.scaleY = loc2 = 1.5;
            this._shp.scaleX = loc2;
            gs.TweenLite.to(this._shp, this.ST_TWEEN_TIME, {"alpha":1, "scaleX":1, "scaleY":1, "ease":gs.easing.Quad.easeOut});
			
            return;
        }
		public function drawCircle():void
        {
			var userCount:Number=Main.userMap[this._stationName];
			var maxUser:Number=Main.maxUser;
			var reverseFlag:Boolean=Main.reverseFlag;
			var maxRadius:Number=Main.maxRadius;
			var ratio:Number=0;
			var radius:Number=0;
			if(maxUser!=0){
				ratio=userCount/maxUser;
				if(reverseFlag){
					ratio=1-ratio;
				}
				radius=ratio*maxRadius;
			}
			if(isNaN(radius)){
				radius=0;
			}
			
			
			var g:*=this._shp.graphics;
            g.clear();
			g.lineStyle(this.ST_CIRCLE_BORDER, 0xff0000,0.5);
			g.beginFill(0xff0000, 0.5);
            g.drawCircle(0, 0, radius);
			
			g.lineStyle(this.ST_CIRCLE_BORDER, 0xffffff,0.5);
			g.beginFill(0xffffff, 1);
            g.drawCircle(0, 0, 8);
			
            g.endFill();
		}
		public function hideCircle():void
        {
			this._shp.graphics.clear();
		}
		public function showCircle():void
        {
			this.drawCircle();
		}
        public function changeShadow(arg1:Number=1):void
        {
            return;
        }

        public function drawResult(... rest):flash.display.DisplayObject
        {
            trace("ExStationSybmol return null");
            return null;
        }

        private const ST_CIRCLE_RADIUS:Number=5;

        private const ST_CIRCLE_BORDER:Number=2;

        private const ST_TWEEN_TIME:Number=0.5;

        private var _shp:flash.display.Sprite;

        private var _dx:Number;

        private var _dy:Number;

        private var _icon:String;
		
		private var _gType:String;
		
		private var _stationName:String;
		
		private var _isEx:Boolean=false;
    }
}
