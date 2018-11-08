package baidu.subway.vo 
{
    public class LineVO extends Object
    {
        public function LineVO()
        {
            super();
            return;
        }

        public function get lid():String
        {
            return this._lid;
        }

        public function set lid(arg1:String):void
        {
            this._lid = arg1;
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

        public function get slb():String
        {
            return this._slb;
        }

        public function set slb(arg1:String):void
        {
            this._slb = arg1;
            return;
        }

        public function get n():int
        {
            return this._n;
        }

        public function set n(arg1:int):void
        {
            this._n = arg1;
            return;
        }

        public function get loop():Boolean
        {
            return this._loop;
        }

        public function set loop(arg1:Boolean):void
        {
            this._loop = arg1;
            return;
        }

        public function get lbx():Number
        {
            return this._lbx;
        }

        public function set lbx(arg1:Number):void
        {
            this._lbx = arg1;
            return;
        }

        public function get lby():Number
        {
            return this._lby;
        }

        public function set lby(arg1:Number):void
        {
            this._lby = arg1;
            return;
        }

        public function get lbr():Number
        {
            return this._lbr;
        }

        public function set lbr(arg1:Number):void
        {
            this._lbr = arg1;
            return;
        }

        public function get lc():uint
        {
            return this._lc;
        }

        public function set lc(arg1:uint):void
        {
            this._lc = arg1;
            return;
        }

        public function get stations():Array
        {
            return this._stations;
        }

        public function set stations(arg1:Array):void
        {
            this._stations = arg1;
            return;
        }

        private var _lid:String;

        private var _lb:String;

        private var _slb:String;

        private var _n:int;

        private var _loop:Boolean;

        private var _lbx:Number;

        private var _lby:Number;

        private var _lbr:Number;

        private var _lc:uint;

        private var _stations:Array;
    }
}
