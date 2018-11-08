package baidu.subway.ui.control 
{
    import baidu.subway.event.*;
    import baidu.ui.managers.*;
    import flash.display.*;
    import flash.events.*;
    import gs.*;
    import gs.easing.*;
    
    public class ScaleBar extends flash.display.Sprite
    {
        public function ScaleBar()
        {
            super();
            this.init();
            return;
        }

        public function get scaleLevel():int
        {
            return this._scaleLevel;
        }

        public function set scaleLevel(arg1:int):void
        {
            var loc1:*=NaN;
            if (arg1 < 0) 
            {
                arg1 = 0;
            }
            else if (arg1 > 2) 
            {
                arg1 = 2;
            }
            if (this._scaleLevel != arg1) 
            {
                this._scaleLevel = arg1;
                loc1 = 18 + 10 * arg1;
                gs.TweenLite.to(this._scaleBarDragBar, this.SCALEBAR_TWEEN_TIME, {"y":loc1, "ease":gs.easing.Quad.easeOut});
            }
            return;
        }

        private function init():void
        {
            var loc1:*=new ScaleBarSkin();
            addChild(loc1);
            this._scaleBarUp = loc1.getChildByName("sbu") as flash.display.Sprite;
            this._scaleBarDragBar = loc1.getChildByName("sbdb") as flash.display.Sprite;
            this._scaleBarDown = loc1.getChildByName("sbd") as flash.display.Sprite;
            var loc2:*;
            this._scaleBarUp.useHandCursor = loc2 = true;
            this._scaleBarUp.buttonMode = loc2;
            this._scaleBarDown.useHandCursor = loc2 = true;
            this._scaleBarDown.buttonMode = loc2;
            this._scaleBarDragBar.addEventListener(flash.events.MouseEvent.MOUSE_OVER, this.onScaleDragBarOver);
            this._scaleBarDragBar.addEventListener(flash.events.MouseEvent.MOUSE_OUT, this.onScaleDragBarOut);
            this._scaleBarDragBar.addEventListener(flash.events.MouseEvent.MOUSE_DOWN, this.onScaleDragBarDown);
            this._scaleBarUp.addEventListener(flash.events.MouseEvent.CLICK, this.onScaleUpClick);
            this._scaleBarDown.addEventListener(flash.events.MouseEvent.CLICK, this.onScaleDownClick);
            return;
        }

        private function onScaleDragBarOver(arg1:flash.events.MouseEvent=null):void
        {
            var loc1:*=baidu.ui.managers.CursorManager.getInstance();
            if (!loc1.root) 
            {
                loc1.root = stage;
            }
            loc1.showCursor("ScaleCursor");
            return;
        }

        private function onScaleDragBarOut(arg1:flash.events.MouseEvent=null):void
        {
            if (!arg1.buttonDown) 
            {
                baidu.ui.managers.CursorManager.getInstance().hideCursor("ScaleCursor");
            }
            return;
        }

        private function onScaleDragBarDown(arg1:flash.events.MouseEvent=null):void
        {
            this._offsetY = this._scaleBarDragBar.mouseY;
            this._scaleBarDragBar.removeEventListener(flash.events.MouseEvent.MOUSE_DOWN, this.onScaleDragBarDown);
            stage.addEventListener(flash.events.MouseEvent.MOUSE_UP, this.onScaleDragBarUp);
            stage.addEventListener(flash.events.MouseEvent.MOUSE_MOVE, this.onScaleDragBarMove);
            return;
        }

        private function onScaleDragBarUp(arg1:flash.events.MouseEvent=null):void
        {
            var loc1:*=0;
            var loc2:*=0;
            this._offsetY = 0;
            if (this._scaleBarDragBar.y < 23) 
            {
                loc1 = 18;
                loc2 = 0;
            }
            else if (this._scaleBarDragBar.y > 33) 
            {
                loc1 = 38;
                loc2 = 2;
            }
            else 
            {
                loc1 = 28;
                loc2 = 1;
            }
            gs.TweenLite.to(this._scaleBarDragBar, this.SCALEBAR_TWEEN_TIME, {"y":loc1, "ease":gs.easing.Quad.easeOut, "onComplete":this.dispatchScaleLevel, "onCompleteParams":[loc2]});
            stage.removeEventListener(flash.events.MouseEvent.MOUSE_MOVE, this.onScaleDragBarMove);
            stage.removeEventListener(flash.events.MouseEvent.MOUSE_UP, this.onScaleDragBarUp);
            this._scaleBarDragBar.addEventListener(flash.events.MouseEvent.MOUSE_DOWN, this.onScaleDragBarDown);
            baidu.ui.managers.CursorManager.getInstance().hideCursor("ScaleCursor");
            return;
        }

        private function onScaleDragBarMove(arg1:flash.events.MouseEvent=null):void
        {
            var loc1:*=mouseY - this._offsetY;
            if (loc1 < 13) 
            {
                loc1 = 13;
            }
            else if (loc1 > 43) 
            {
                loc1 = 43;
            }
            gs.TweenLite.to(this._scaleBarDragBar, this.SCALEBAR_TWEEN_TIME, {"y":loc1, "ease":gs.easing.Quad.easeOut});
            return;
        }

        private function onScaleUpClick(arg1:flash.events.MouseEvent=null):void
        {
            var loc1:*=0;
            var loc2:*=NaN;
            if (this._scaleLevel != 0) 
            {
                loc1 = this._scaleLevel - 1;
                loc2 = 18 + 10 * loc1;
                gs.TweenLite.to(this._scaleBarDragBar, this.SCALEBAR_TWEEN_TIME, {"y":loc2, "ease":gs.easing.Quad.easeOut});
                this.dispatchScaleLevel(loc1);
            }
            return;
        }

        private function onScaleDownClick(arg1:flash.events.MouseEvent=null):void
        {
            var loc1:*=0;
            var loc2:*=NaN;
            if (this._scaleLevel != 2) 
            {
                loc1 = this._scaleLevel + 1;
                loc2 = 18 + 10 * loc1;
                gs.TweenLite.to(this._scaleBarDragBar, this.SCALEBAR_TWEEN_TIME, {"y":loc2, "ease":gs.easing.Quad.easeOut});
                this.dispatchScaleLevel(loc1);
            }
            return;
        }

        private function dispatchScaleLevel(arg1:int):void
        {
            var loc1:*=null;
            if (arg1 != this._scaleLevel) 
            {
                this._scaleLevel = arg1;
                loc1 = new baidu.subway.event.SubwayEvent(baidu.subway.event.SubwayEvent.SB_SCALE_CHANGE);
                loc1.data = this._scaleLevel;
                dispatchEvent(loc1);
            }
            return;
        }

        private const SCALEBAR_TWEEN_TIME:Number=0.1;

        private const SCALEBAR_TWEEN_TRANSITION:String="easeOutQuad";

        private var _scaleBarUp:flash.display.Sprite;

        private var _scaleBarDragBar:flash.display.Sprite;

        private var _scaleBarDown:flash.display.Sprite;

        private var _offsetY:Number;

        private var _scaleLevel:int=1;
    }
}
