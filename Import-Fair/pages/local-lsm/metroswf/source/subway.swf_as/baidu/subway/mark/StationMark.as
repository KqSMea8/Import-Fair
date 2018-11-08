package baidu.subway.mark 
{
    import flash.text.*;
    
    public class StationMark extends baidu.subway.mark.Mark
    {
        public function StationMark(arg1:String, arg2:Boolean, arg3:Number, arg4:Number, arg5:Boolean)
        {
            super();
            this._lb = arg1;
            this._iu = arg2;
            this._rx = arg3;
            this._ry = arg4;
            this._slb = arg5;
            return;
        }

        public override function draw():void
        {
            var loc1:*=new flash.text.TextFormat();
            loc1.size = 16;
            loc1.font = "宋体";
			loc1.bold=true;
            //loc1.color = this._iu ? 3355443 : 13421772;
			loc1.color = 0xffffff;
            var loc2:*=this._lb.split("\\n");
            this._lb = loc2.join("\n");
            this._stationLabel = new flash.text.TextField();
            this._stationLabel.text = this._lb;
            this._stationLabel.autoSize = "left";
            this._stationLabel.selectable = false;
            this._stationLabel.mouseEnabled = false;
            this._stationLabel.setTextFormat(loc1);
            this._stationLabel.antiAliasType = "advanced";
            this._stationLabel.x = this._rx;
            this._stationLabel.y = this._ry;
            this._stationLabel.visible = this._slb;
            addChild(this._stationLabel);
            this._stationLabel.mouseEnabled = false;
            this._oldW = this._stationLabel.width;
            this._oldH = this._stationLabel.height;
            return;
        }

        public override function changeLabel(arg1:Number):void
        {
            var loc1:*=NaN;
            var loc2:*=NaN;
            var loc3:*=NaN;
            var loc4:*=NaN;
            var loc5:*=NaN;
            var loc6:*=NaN;
            if (!this._stationLabel) 
            {
                return;
            }
            this._stationLabel.scaleY = arg1;
            this._stationLabel.scaleX = arg1;
            if (arg1 != 1) 
            {
                if (this._newX) 
                {
                    this._stationLabel.x = this._newX;
                    this._stationLabel.y = this._newY;
                }
                else 
                {
                    loc1 = this._oldW;
                    loc2 = this._oldH;
                    loc3 = this._stationLabel.width;
                    loc4 = this._stationLabel.height;
                    if (this._stationLabel.x < -loc1) 
                    {
                        loc5 = loc1 - loc3;
                    }
                    else if (this._stationLabel.x < 0 && this._stationLabel.x > -loc1) 
                    {
                        loc5 = (loc1 - loc3) / 2;
                    }
                    else 
                    {
                        loc5 = 0;
                    }
                    if (this._stationLabel.y < -loc2) 
                    {
                        loc6 = loc2 - loc4;
                    }
                    else if (this._stationLabel.y < 0 && this._stationLabel.y > -loc2) 
                    {
                        loc6 = (loc2 - loc4) / 2;
                    }
                    else 
                    {
                        loc6 = 0;
                    }
                    this._stationLabel.x = this._stationLabel.x + loc5;
                    this._stationLabel.y = this._stationLabel.y + loc6;
                    this._newX = this._stationLabel.x;
                    this._newY = this._stationLabel.y;
                }
            }
            else 
            {
                this._stationLabel.x = this._rx;
                this._stationLabel.y = this._ry;
            }
            return;
        }

        public override function highlight():void
        {
            var loc1:*=new flash.text.TextFormat();
            loc1.bold = true;
            if (this._stationLabel) 
            {
                this._stationLabel.visible = true;
                this._stationLabel.setTextFormat(loc1);
            }
            return;
        }

        public override function unHighlight():void
        {
            var loc1:*=new flash.text.TextFormat();
            loc1.bold = false;
            if (this._stationLabel) 
            {
                this._stationLabel.visible = this._slb;
                this._stationLabel.setTextFormat(loc1);
            }
            return;
        }

        private var _lb:String;

        private var _iu:Boolean;

        private var _rx:Number;

        private var _ry:Number;

        private var _slb:Boolean;

        private var _stationLabel:flash.text.TextField;

        private var _newX:Number;

        private var _newY:Number=0;

        private var _oldW:Number;

        private var _oldH:Number=0;
    }
}
