package baidu.subway.handler 
{
    import baidu.subway.event.*;
    import flash.display.*;
    import flash.events.*;
    import flash.geom.*;
    
    public class DragHandler extends baidu.subway.handler.Handler
    {
        public function DragHandler(arg1:flash.display.Stage)
        {
            super();
            this.stage = arg1;
            return;
        }

        public function get moved():Boolean
        {
            return this._moved;
        }

        public function set moved(arg1:Boolean):void
        {
            this._moved = arg1;
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
            this._dragStartMousePoint = new flash.geom.Point(this.stage.mouseX, this.stage.mouseY);
            this._dragStartLocation = new flash.geom.Point(this._layer.x, this._layer.y);
            return;
        }

        private function onDragLayerMove(arg1:flash.events.MouseEvent):void
        {
            this._moved = true;
            var loc1:*=this.stage.mouseX - this._dragStartMousePoint.x + this._dragStartLocation.x;
            var loc2:*=this.stage.mouseY - this._dragStartMousePoint.y + this._dragStartLocation.y;
            var loc3:*=this._layer.parent.width / 2 + this.stage.stageWidth / 2;
            var loc4:*=this.stage.stageWidth / 2 - this._layer.parent.width / 2;
            var loc5:*=this.stage.stageHeight / 2 - this._layer.parent.height / 2;
            var loc6:*=this._layer.parent.height / 2 + this.stage.stageHeight / 2;
            loc1 = Math.min(Math.max(loc4, loc1), loc3);
            loc2 = Math.min(Math.max(loc5, loc2), loc6);
            var loc7:*=new baidu.subway.event.SubwayEvent(baidu.subway.event.SubwayEvent.DH_LAYER_MOVE);
            loc7.data = {"px":loc1, "py":loc2};
            dispatchEvent(loc7);
            return;
        }

        private function onDragLayerUp(arg1:flash.events.MouseEvent):void
        {
            var loc1:*=new baidu.subway.event.SubwayEvent(baidu.subway.event.SubwayEvent.DH_LAYER_UP);
            dispatchEvent(loc1);
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
            this.getLimitRec();
            this.stage.addEventListener(flash.events.MouseEvent.MOUSE_MOVE, this.onDragLayerMove);
            this.stage.addEventListener(flash.events.MouseEvent.MOUSE_UP, this.onDragLayerUp);
            return;
        }

        protected override function detachEvent():void
        {
            this.stage.removeEventListener(flash.events.MouseEvent.MOUSE_MOVE, this.onDragLayerMove);
            this.stage.removeEventListener(flash.events.MouseEvent.MOUSE_UP, this.onDragLayerUp);
            return;
        }

        private var _layer:flash.display.Sprite;

        private var stage:flash.display.Stage;

        private var _dragStartMousePoint:flash.geom.Point;

        private var _dragStartLocation:flash.geom.Point;

        private var _moved:Boolean=false;

        private var _limitRec:Object;

        private var lineWidth:Number;

        private var lineHeight:Number;
    }
}
