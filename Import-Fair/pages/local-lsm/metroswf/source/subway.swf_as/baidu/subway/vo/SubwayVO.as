package baidu.subway.vo 
{
    public class SubwayVO extends Object
    {
        public function SubwayVO()
        {
            super();
            return;
        }

        public function get cid():String
        {
            return this._cid;
        }

        public function set cid(arg1:String):void
        {
            this._cid = arg1;
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

        public function get c():String
        {
            return this._c;
        }

        public function set c(arg1:String):void
        {
            this._c = arg1;
            return;
        }

        public function get src():String
        {
            return this._src;
        }

        public function set src(arg1:String):void
        {
            this._src = arg1;
            return;
        }

        public function get bg():String
        {
            return this._bg;
        }

        public function set bg(arg1:String):void
        {
            this._bg = arg1;
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

        public function get lines():Array
        {
            return this._lines;
        }

        public function set lines(arg1:Array):void
        {
            this._lines = arg1;
            return;
        }

        private var _cid:String="";

        private var _n:int=0;

        private var _c:String="";

        private var _src:String="";

        private var _bg:String="";

        private var _icon:String="";

        private var _lines:Array;
    }
}
