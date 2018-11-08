package baidu.subway.vo 
{
    public class StationVO extends Object
    {
        public function StationVO()
        {
            super();
            return;
        }

        public function get rc():Boolean
        {
            return this._rc;
        }

        public function set rc(arg1:Boolean):void
        {
            this._rc = arg1;
            return;
        }

        public function get slb():Boolean
        {
            return this._slb;
        }

        public function set slb(arg1:Boolean):void
        {
            this._slb = arg1;
            return;
        }

        public function get ln():String
        {
            return this._ln;
        }

        public function get rx():Number
        {
            return this._rx;
        }

        public function set ln(arg1:String):void
        {
            this._ln = arg1;
            return;
        }

        public function get color():uint
        {
            return this._color;
        }

        public function set color(arg1:uint):void
        {
            this._color = arg1;
            return;
        }

        public function get icon():String
        {
            return this._icon;
        }

        public function set icon(arg1:String):void
        {
            this._icon = arg1;
            return;
        }

        public function get dx():Number
        {
            return this._dx;
        }

        public function get dy():Number
        {
            return this._dy;
        }

        public function set dy(arg1:Number):void
        {
            this._dy = arg1;
            return;
        }

        public function get interval():Number
        {
            return this._interval;
        }

        public function set interval(arg1:Number):void
        {
            this._interval = arg1;
            return;
        }

        public function get checkiu():int
        {
            return this._checkiu;
        }

        public function set checkiu(arg1:int):void
        {
            this._checkiu = arg1;
            return;
        }

        public function get sid():String
        {
            return this._sid;
        }

        public function set sid(arg1:String):void
        {
            this._sid = arg1;
            return;
        }

        public function get lb():String
        {
            return this._lb;
        }

        public function set lb(arg1:String):void
        {
            this._lb = arg1;
            return;
        }

        public function get x():Number
        {
            return this._x;
        }

        public function set x(arg1:Number):void
        {
            this._x = arg1;
            return;
        }

        public function get y():Number
        {
            return this._y;
        }

        public function set y(arg1:Number):void
        {
            this._y = arg1;
            return;
        }

        public function set dx(arg1:Number):void
        {
            this._dx = arg1;
            return;
        }

        public function set rx(arg1:Number):void
        {
            this._rx = arg1;
            return;
        }

        public function get ry():Number
        {
            return this._ry;
        }

        public function set ry(arg1:Number):void
        {
            this._ry = arg1;
            return;
        }

        public function get st():Boolean
        {
            return this._st;
        }

        public function set st(arg1:Boolean):void
        {
            this._st = arg1;
            return;
        }

        public function get ex():Boolean
        {
            return this._ex;
        }

        public function set ex(arg1:Boolean):void
        {
            this._ex = arg1;
            return;
        }

        public function get iu():Boolean
        {
            return this._iu;
        }

        public function set iu(arg1:Boolean):void
        {
            this._iu = arg1;
            return;
        }

        private var _sid:String;

        private var _lb:String;

        private var _x:Number;

        private var _y:Number;

        private var _rx:Number;

        private var _st:Boolean;

        private var _ex:Boolean;

        private var _iu:Boolean;

        private var _rc:Boolean;

        private var _slb:Boolean;

        private var _ln:String;

        private var _color:uint;

        private var _icon:String;

        private var _dx:Number;

        private var _dy:Number;

        private var _interval:Number;

        private var _checkiu:int=0;

        private var _ry:Number;
    }
}
