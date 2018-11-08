package baidu.subway.ui.tips 
{
    import baidu.subway.event.*;
    import flash.display.*;
    import flash.events.*;
    
    public class EndTips extends flash.display.Sprite
    {
        public function EndTips()
        {
            super();
            this.initUI();
            return;
        }

        public function get dot():flash.display.Sprite
        {
            return this._dot;
        }

        public function get isDraging():Boolean
        {
            return this._isDraging;
        }

        private function initUI():void
        {
            var loc1:*=new StationEndTipsSkin();
            addChild(loc1);
            this._dot = loc1.getChildByName("d") as flash.display.MovieClip;
            this._dot.visible = false;
            this._pop = loc1.getChildByName("p") as flash.display.MovieClip;
            this._pop.gotoAndStop(1);
            buttonMode = true;
            addEventListener(flash.events.MouseEvent.ROLL_OVER, this.onPopEvent);
            addEventListener(flash.events.MouseEvent.ROLL_OUT, this.onPopEvent);
            addEventListener(flash.events.MouseEvent.MOUSE_DOWN, this.onPopEvent);
            addEventListener(flash.events.MouseEvent.MOUSE_UP, this.onPopEvent);
            return;
        }

        private function onPopEvent(arg1:flash.events.MouseEvent):void
        {
            var loc1:*=arg1.type;
        }

        private var _dot:flash.display.MovieClip;

        private var _pop:flash.display.MovieClip;

        private var _px:Number;

        private var _py:Number;

        private var _isDraging:Boolean=false;
    }
}
