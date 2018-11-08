package baidu.subway.mark 
{
    import flash.text.*;
    
    public class LineMark extends baidu.subway.mark.Mark
    {
        public function LineMark(arg1:String, arg2:Number, arg3:Number, arg4:Number, arg5:uint)
        {
            super();
            this._lb = arg1;
            this._lbx = arg2;
            this._lby = arg3;
            this._lbr = arg4;
            this._lc = arg5;
            return;
        }

        public override function draw():void
        {
            var loc1:*=new flash.text.TextFormat();
            loc1.size = 16;
            loc1.font = "黑体";
            loc1.color = this._lc;
            this._lineLabel = new flash.text.TextField();
            this._lineLabel.htmlText = this._lb.replace("br", "\n");
            this._lineLabel.autoSize = "left";
            this._lineLabel.selectable = false;
            this._lineLabel.setTextFormat(loc1);
            this._lineLabel.antiAliasType = "advanced";
            this._lineLabel.x = this._lbx;
            this._lineLabel.y = this._lby;
            addChild(this._lineLabel);
            this._lineLabel.mouseEnabled = false;
            this._oldW = this._lineLabel.width;
            this._oldH = this._lineLabel.height;
            return;
        }

        public override function changeLabel(arg1:Number):void
        {
            var loc1:*=NaN;
            var loc2:*=NaN;
            var loc3:*=NaN;
            var loc4:*=NaN;
            if (!this._lineLabel) 
            {
                return;
            }
            this._lineLabel.scaleY = arg1;
            this._lineLabel.scaleX = arg1;
            if (arg1 != 1) 
            {
                if (this._newX) 
                {
                    this._lineLabel.x = this._newX;
                    this._lineLabel.y = this._newY;
                }
                else 
                {
                    loc1 = this._oldW;
                    loc2 = this._oldH;
                    loc3 = this._lineLabel.width;
                    loc4 = this._lineLabel.height;
                    this._lineLabel.x = this._lineLabel.x + (loc1 - loc3) / 2;
                    this._lineLabel.y = this._lineLabel.y + (loc2 - loc4) / 2;
                    this._newX = this._lineLabel.x;
                    this._newY = this._lineLabel.y;
                }
            }
            else 
            {
                this._lineLabel.x = this._lbx;
                this._lineLabel.y = this._lby;
            }
            return;
        }

        public override function highlight():void
        {
            return;
        }

        public override function unHighlight():void
        {
            return;
        }

        private var _lb:String;

        private var _lbx:Number;

        private var _lby:Number;

        private var _lbr:Number;

        private var _lc:uint;

        private var _lineLabel:flash.text.TextField;

        private var _newX:Number;

        private var _newY:Number=0;

        private var _oldW:Number;

        private var _oldH:Number=0;
    }
}
