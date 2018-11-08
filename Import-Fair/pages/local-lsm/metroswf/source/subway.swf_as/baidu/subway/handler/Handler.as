package baidu.subway.handler 
{
    import flash.display.*;
    import flash.events.*;
    
    public class Handler extends flash.events.EventDispatcher
    {
        public function Handler()
        {
            super();
            return;
        }

        public function set param(arg1:*):void
        {
            trace("abs class do nothing");
            return;
        }

        public function get active():Boolean
        {
            return this._active;
        }

        public function set active(arg1:Boolean):void
        {
            if (this._active == arg1) 
            {
                return;
            }
            this._active = arg1;
            if (this._active) 
            {
                this.attachEvent();
            }
            else 
            {
                this.detachEvent();
            }
            return;
        }

        public function reset():void
        {
            return;
        }

        protected function attachEvent():void
        {
            trace("abs class do nothing");
            return;
        }

        protected function detachEvent():void
        {
            trace("abs class do nothing");
            return;
        }

        protected var _active:Boolean;

        protected var _obj:flash.display.Sprite;
    }
}
