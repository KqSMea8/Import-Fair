package baidu.subway.ui.tips 
{
    import flash.display.*;
    import flash.events.*;
    import flash.text.*;
    import gs.*;
    import gs.easing.*;
    
    public class LineTips extends flash.display.Sprite
    {
        public function LineTips(arg1:String, arg2:uint, arg3:Number, arg4:Number, arg5:Number)
        {
            super();
            this._lb = arg1;
            this._lc = arg2;
            this._px = arg3;
            this._py = arg4;
            this._scale = arg5;
            this.initUI();
            addEventListener(flash.events.Event.ADDED_TO_STAGE, this.onAddedToStage);
            return;
        }

        private function onAddedToStage(arg1:flash.events.Event):void
        {
            this.x = this._px;
            this.y = this._py - 25;
            this.visible = true;
            this._py = this._py - this._scale * 6;
            gs.TweenLite.to(this, this.TWEEN_TIME, {"y":this._py, "ease":gs.easing.Quad.easeOut});
            return;
        }

        private function initUI():void
        {
            if (this._label) 
            {
                while (this._label.numChildren) 
                {
                    this._label.removeChildAt(0);
                }
                this._label.graphics.clear();
            }
            if (this._bg) 
            {
                while (this._bg.numChildren) 
                {
                    this._bg.removeChildAt(0);
                }
                this._bg.graphics.clear();
            }
            this.addTipsLabel();
            return;
        }

        private function addTipsLabel():void
        {
            if (!this._label) 
            {
                this._label = new flash.display.Sprite();
                this.addChild(this._label);
            }
            var loc1:*=new flash.text.TextFormat("宋体", 12, 16777215);
            var loc2:*=new flash.text.TextField();
            loc2.text = this._lb;
            loc2.autoSize = "left";
            loc2.selectable = false;
            loc2.setTextFormat(loc1);
            loc2.x = 3;
            loc2.y = 2;
            this._label.addChild(loc2);
            var loc3:*=this._label.graphics;
            loc3.beginFill(this._lc, 1);
            loc3.drawRect(0, 0, this._label.width + 6, this._label.height + 4);
            loc3.endFill();
            this._label.x = -this._label.width / 2;
            this._label.y = -(this._label.height + 8);
            this.addTipsShape(this._label.width, this._label.height);
            return;
        }

        private function addTipsShape(arg1:Number, arg2:Number):void
        {
            var loc1:*=arg1 + 6;
            var loc2:*=arg2 + 6;
            if (!this._bg) 
            {
                this._bg = new flash.display.Sprite();
                this.addChildAt(this._bg, 0);
            }
            var loc3:*=this._bg.graphics;
            loc3.clear();
            loc3.lineStyle();
            loc3.beginFill(12040635);
            loc3.drawRoundRect((-loc1) / 2 - 1, -loc2 - 5 - 1, loc1 + 2, loc2 + 2, 6, 6);
            loc3.endFill();
            loc3.beginFill(16777215);
            loc3.drawRoundRect((-loc1) / 2, -loc2 - 5, loc1, loc2, 4, 4);
            loc3.endFill();
            loc3.beginFill(16777215);
            loc3.lineStyle(1, 12040635, 1, false, "normal", "none");
            loc3.moveTo(-5, -5);
            loc3.lineTo(-5, -4);
            loc3.lineTo(0, 0);
            loc3.lineTo(5, -4);
            loc3.lineTo(5, -5);
            loc3.lineStyle();
            loc3.endFill();
            return;
        }

        private const TWEEN_TIME:Number=0.2;

        private var _lb:String;

        private var _lc:uint;

        private var _px:Number;

        private var _py:Number;

        private var _scale:Number;

        private var _label:flash.display.Sprite;

        private var _bg:flash.display.Sprite;
    }
}
