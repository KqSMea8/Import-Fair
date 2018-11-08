package baidu.subway.handler 
{
    import baidu.subway.event.*;
    import flash.display.*;
    import flash.events.*;
    import flash.geom.*;
    import flash.ui.*;
    
    public class KeyHandler extends baidu.subway.handler.Handler
    {
        public function KeyHandler(arg1:flash.display.Stage)
        {
            super();
            this.stage = arg1;
            return;
        }

        public override function set param(arg1:*):void
        {
            if (arg1 is flash.display.Sprite) 
            {
                this._layer = arg1;
            }
            else 
            {
                trace("error in drag handler...");
            }
            return;
        }

        private function onDragLayerKeyDown(arg1:flash.events.KeyboardEvent):void
        {
            var loc4:*=null;
            var loc5:*=NaN;
            var loc6:*=NaN;
            if (this._acceleration < 50) 
            {
                this._acceleration = this._acceleration + 0.5;
            }
            var loc1:*=0;
            var loc2:*=0;
            var loc3:*=0;
            var loc7:*=arg1.keyCode;
        }

        private function onDragLayerKeyUp(arg1:flash.events.KeyboardEvent):void
        {
            this._acceleration = 5;
            return;
        }

        private function getLimitRec():void
        {
            var loc1:*=this._layer.getBounds(this.stage);
            var loc2:*=this._layer.localToGlobal(new flash.geom.Point(0, 0));
            var loc3:*=loc2.y - loc1.y;
            var loc4:*=this._layer.height - loc3;
            var loc5:*=loc2.x - loc1.x;
            var loc6:*=this._layer.width - loc5;
            this._limitRec = {"LX":this.stage.stageWidth / 2 - loc6, "RX":this.stage.stageWidth / 2 + loc5, "TY":this.stage.stageHeight / 2 - loc4, "BY":this.stage.stageHeight / 2 + loc3};
            return;
        }

        public override function reset():void
        {
            trace("Drag Handler do nothing here...");
            return;
        }

        protected override function attachEvent():void
        {
            this.stage.addEventListener(flash.events.KeyboardEvent.KEY_DOWN, this.onDragLayerKeyDown);
            this.stage.addEventListener(flash.events.KeyboardEvent.KEY_UP, this.onDragLayerKeyUp);
            return;
        }

        protected override function detachEvent():void
        {
            this.stage.removeEventListener(flash.events.KeyboardEvent.KEY_DOWN, this.onDragLayerKeyDown);
            this.stage.removeEventListener(flash.events.KeyboardEvent.KEY_UP, this.onDragLayerKeyUp);
            return;
        }

        private const KEYCODE_MAIN_ADD:int=187;

        private const KEYCODE_MAIN_SUBTRACT:int=189;

        private var _layer:flash.display.Sprite;

        private var stage:flash.display.Stage;

        private var _acceleration:Number=5;

        private var _limitRec:Object;
    }
}
