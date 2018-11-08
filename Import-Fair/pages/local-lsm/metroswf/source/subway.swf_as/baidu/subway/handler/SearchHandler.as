package baidu.subway.handler 
{
    import baidu.subway.event.*;
    import baidu.subway.feature.*;
    import flash.display.*;
    import flash.geom.*;
    
    public class SearchHandler extends baidu.subway.handler.Handler
    {
        public function SearchHandler()
        {
            super();
            return;
        }

        public function set forceNotSearch(arg1:Boolean):void
        {
            this._forceNotSearch = arg1;
            return;
        }

        public function set forceNotSet(arg1:Boolean):void
        {
            this._forceNotSet = arg1;
            return;
        }

        public override function set param(arg1:*):void
        {
            if (arg1 is flash.display.Sprite) 
            {
                this._layer = arg1;
            }
            return;
        }

        public function set hasSetStartPoint(arg1:Boolean):void
        {
            this._hasSetStartPoint = arg1;
            return;
        }

        public function get hasSetStartPoint():Boolean
        {
            return this._hasSetStartPoint;
        }

        public function set hasSetEndPoint(arg1:Boolean):void
        {
            this._hasSetEndPoint = arg1;
            return;
        }

        public function get hasSetEndPoint():Boolean
        {
            return this._hasSetEndPoint;
        }

        public function setPoint(arg1:baidu.subway.feature.Station):void
        {
            if (!this._hasSetStartPoint) 
            {
                this.setStartPoint(arg1);
            }
            else if (!this._hasSetEndPoint) 
            {
                this.setEndPoint(arg1);
            }
            else 
            {
                this.setStartPoint(arg1);
            }
            return;
        }

        private function setStartPoint(arg1:baidu.subway.feature.Station):void
        {
            var loc5:*=null;
            var loc1:*=new flash.geom.Point(arg1.x, arg1.y);
            var loc2:*=this._layer.localToGlobal(loc1);
            var loc3:*=loc2.x;
            var loc4:*=loc2.y;
            if (!this._hasSetStartPoint) 
            {
                this._hasSetStartPoint = true;
            }
            loc5 = new baidu.subway.event.SubwayEvent(baidu.subway.event.SubwayEvent.SH_SET_START);
            if (this._hasSetEndPoint) 
            {
                loc5.data = {"st":arg1, "px":loc3, "py":loc4, "shouldStartSearch":true && !this._forceNotSearch, "shouldSetJSStation":true && !this._forceNotSet};
            }
            else 
            {
                loc5.data = {"st":arg1, "px":loc3, "py":loc4, "shouldStartSearch":false, "shouldSetJSStation":true && !this._forceNotSet};
            }
            var loc6:*;
            this._forceNotSearch = loc6 = false;
            this._forceNotSearch = loc6;
            dispatchEvent(loc5);
            return;
        }

        private function setEndPoint(arg1:baidu.subway.feature.Station):void
        {
            var loc5:*=null;
            var loc1:*=new flash.geom.Point(arg1.x, arg1.y);
            var loc2:*=this._layer.localToGlobal(loc1);
            var loc3:*=loc2.x;
            var loc4:*=loc2.y;
            if (!this._hasSetEndPoint) 
            {
                this._hasSetEndPoint = true;
            }
            loc5 = new baidu.subway.event.SubwayEvent(baidu.subway.event.SubwayEvent.SH_SET_END);
            loc5.data = {"st":arg1, "px":loc3, "py":loc4, "shouldStartSearch":true && !this._forceNotSearch, "shouldSetJSStation":true && !this._forceNotSet};
            var loc6:*;
            this._forceNotSearch = loc6 = false;
            this._forceNotSearch = loc6;
            dispatchEvent(loc5);
            return;
        }

        public override function reset():void
        {
            this._hasSetStartPoint = false;
            this._hasSetEndPoint = false;
            this._forceNotSearch = false;
            this._forceNotSet = false;
            return;
        }

        protected override function attachEvent():void
        {
            return;
        }

        protected override function detachEvent():void
        {
            return;
        }

        private const TWEEN_TIME:Number=0.2;

        private var _layer:flash.display.Sprite;

        private var _hasSetStartPoint:Boolean=false;

        private var _hasSetEndPoint:Boolean=false;

        private var _forceNotSearch:Boolean=false;

        private var _forceNotSet:Boolean=false;
    }
}
