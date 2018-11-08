package baidu.subway.ui.tips 
{
    import flash.display.*;
    import flash.events.*;
    import flash.external.*;
    import flash.text.*;
    import gs.*;
    import gs.easing.*;
    
    public class OverTips extends flash.display.Sprite
    {
        public function OverTips(arg1:String, arg2:String, arg3:Array, arg4:Number, arg5:Number, arg6:Boolean, arg7:Number, arg8:Boolean=false)
        {
            super();
            this._sid = arg1;
            this._name = arg2;
            this._tipsArr = arg3;
            this._px = arg4;
            this._py = arg5;
            this._ex = arg6;
            this._scale = arg7;
            this._searchTip = arg8;
            this.initUI();
            addEventListener(flash.events.Event.ADDED_TO_STAGE, this.onAddedToStage);
            return;
        }

        private function onAddedToStage(arg1:flash.events.Event):void
        {
            if (!this._searchTip) 
            {
                var loc1:*;
                this.scaleY = loc1 = 1 / this._scale;
                this.scaleX = loc1;
            }
            this.x = this._px;
            this.y = this._py - 25;
            if (this._searchTip) 
            {
                this._py = this._py - this._scale * (this._ex ? 10 : 6);
                this.y = this._py;
            }
            else 
            {
                this.visible = true;
                this._py = this._py - this._scale * (this._ex ? 10 : 6);
                gs.TweenLite.to(this, this.TWEEN_TIME, {"y":this._py, "ease":gs.easing.Quad.easeOut});
            }
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
            this._jsArr = flash.external.ExternalInterface.call("FH_siteHover", this._sid);
            if (!this._jsArr || this._jsArr.length == 0) 
            {
                return;
            }
            this.addTipsLabel();
            return;
        }

        private function addTipsLabel():void
        {
            var loc4:*=null;
            var loc12:*=null;
            var loc13:*=null;
            var loc14:*=null;
            var loc15:*=null;
            var loc16:*=null;
            var loc17:*=null;
            var loc18:*=null;
            var loc19:*=null;
            var loc20:*=null;
            if (!this._label) 
            {
                this._label = new flash.display.Sprite();
                this.addChild(this._label);
            }
            var loc1:*=new flash.text.TextFormat("宋体", 12, 0, true);
            var loc2:*=new flash.text.TextField();
            loc2.text = this._name;
            loc2.autoSize = "left";
            loc2.selectable = false;
            loc2.setTextFormat(loc1);
            this._label.addChild(loc2);
            var loc3:*=0;
            var loc5:*=this._tipsArr.length;
            var loc6:*=0;
            var loc7:*=0;
            var loc8:*=0;
            var loc9:*=0;
            var loc10:*=new flash.text.TextFormat("Arial", 12, 0);
            var loc11:*=new flash.text.TextFormat("Arial", 12, 11509145);
            loc3 = 0;
            while (loc3 < loc5) 
            {
                loc7 = 0;
                loc8 = 0;
                loc9 = this._jsArr.length;
                while (loc8 < loc9) 
                {
                    loc4 = this._tipsArr[loc3]["lid"].split("|");
                    if (loc4[loc4.length - 1] == this._jsArr[loc8]["lid"]) 
                    {
                        loc12 = new flash.text.TextField();
                        loc12.text = this._jsArr[loc8]["direction"];
                        loc12.autoSize = "left";
                        loc12.selectable = false;
                        loc12.setTextFormat(loc10);
                        loc12.x = 2;
                        loc12.y = loc2.height + 27 + this.INTERVAL * loc3 + 18 * loc7;
                        this._label.addChild(loc12);
                        loc13 = new flash.text.TextField();
                        loc13.text = "方向";
                        loc13.autoSize = "left";
                        loc13.selectable = false;
                        loc13.setTextFormat(loc11);
                        loc13.x = loc12.x + loc12.width - 3;
                        loc13.y = loc12.y;
                        this._label.addChild(loc13);
                        if (loc13.x + loc13.width > loc6) 
                        {
                            loc6 = loc13.x + loc13.width;
                        }
                        ++loc7;
                        if (loc7 == 2) 
                        {
                            loc7 = 0;
                            break;
                        }
                    }
                    ++loc8;
                }
                ++loc3;
            }
            loc3 = 0;
            while (loc3 < loc5) 
            {
                loc7 = 0;
                loc8 = 0;
                loc9 = this._jsArr.length;
                while (loc8 < loc9) 
                {
                    loc4 = this._tipsArr[loc3]["lid"].split("|");
                    if (loc4[loc4.length - 1] == this._jsArr[loc8]["lid"]) 
                    {
                        loc14 = new SIcon();
                        loc14.x = loc6 + 20;
                        loc14.y = loc2.height + 32 + this.INTERVAL * loc3 + 18 * loc7;
                        this._label.addChild(loc14);
                        loc15 = new flash.text.TextField();
                        if (this._jsArr[loc8]["stime"] != "") 
                        {
                            loc15.text = this._jsArr[loc8]["stime"];
                            loc15.setTextFormat(loc10);
                        }
                        else 
                        {
                            loc15.text = " - -  :- -";
                            loc15.setTextFormat(loc11);
                        }
                        loc15.autoSize = "left";
                        loc15.selectable = false;
                        loc15.x = loc14.x + loc14.width + 1;
                        loc15.y = loc2.height + 27 + this.INTERVAL * loc3 + 18 * loc7;
                        this._label.addChild(loc15);
                        loc16 = new EIcon();
                        loc16.x = loc6 + 75;
                        loc16.y = loc2.height + 32 + this.INTERVAL * loc3 + 18 * loc7;
                        this._label.addChild(loc16);
                        loc17 = new flash.text.TextField();
                        if (this._jsArr[loc8]["etime"] != "") 
                        {
                            loc17.text = this._jsArr[loc8]["etime"];
                            loc17.setTextFormat(loc10);
                        }
                        else 
                        {
                            loc17.text = " - - : - -";
                            loc17.setTextFormat(loc11);
                        }
                        loc17.autoSize = "left";
                        loc17.selectable = false;
                        loc17.x = loc16.x + loc16.width + 1;
                        loc17.y = loc2.height + 27 + this.INTERVAL * loc3 + 18 * loc7;
                        this._label.addChild(loc17);
                        ++loc7;
                        if (loc7 == 2) 
                        {
                            loc7 = 0;
                            break;
                        }
                    }
                    ++loc8;
                }
                ++loc3;
            }
            loc3 = 0;
            while (loc3 < loc5) 
            {
                loc18 = new flash.text.TextFormat("Arial", 12, 16777215);
                loc19 = new flash.text.TextField();
                loc19.text = this._tipsArr[loc3]["lb"].replace("br", "");
                loc19.autoSize = "left";
                loc19.selectable = false;
                loc19.setTextFormat(loc18);
                loc20 = new flash.display.Sprite();
                loc20.graphics.lineStyle(1, this._tipsArr[loc3]["color"], 1);
                loc20.graphics.beginFill(this._tipsArr[loc3]["color"]);
                loc20.graphics.drawRoundRect(0, 0, loc19.width + 5, loc19.height, 4, 4);
                loc20.graphics.endFill();
                loc19.x = (loc20.width - loc19.width) / 2;
                loc19.y = (loc20.height - loc19.height) / 2;
                loc20.addChild(loc19);
                loc20.graphics.moveTo(2, loc20.height - 1);
                loc20.graphics.lineTo(loc6 + 120, loc20.height - 1);
                loc20.x = 2;
                loc20.y = loc2.height + 5 + this.INTERVAL * loc3;
                this._label.addChild(loc20);
                ++loc3;
            }
            this._label.x = -30;
            this._label.y = -(this._label.height + 18);
            this.addTipsShape(this._label.width, this._label.height);
            return;
        }

        private function addTipsShape(arg1:Number, arg2:Number):void
        {
            var txtW:Number;
            var txtH:Number;
            var shapeW:Number;
            var shapeH:Number;
            var gp:flash.display.Graphics;
            var infoBtn:InfoBtn;

            var loc1:*;
            txtW = arg1;
            txtH = arg2;
            shapeW = txtW + 10;
            shapeH = txtH + 20;
            if (!this._bg) 
            {
                this._bg = new flash.display.Sprite();
                this.addChildAt(this._bg, 0);
            }
            gp = this._bg.graphics;
            gp.clear();
            gp.lineStyle();
            gp.beginFill(12040635);
            gp.drawRoundRect(-36, -shapeH - 5 - 1, shapeW + 2, shapeH + 2, 6, 6);
            gp.endFill();
            gp.beginFill(16777215);
            gp.drawRoundRect(-35, -shapeH - 5, shapeW, shapeH, 4, 4);
            gp.endFill();
            gp.beginFill(16777215);
            gp.lineStyle(1, 12040635, 1, false, "normal", "none");
            gp.moveTo(-5, -5);
            gp.lineTo(-5, -4);
            gp.lineTo(0, 0);
            gp.lineTo(5, -4);
            gp.lineTo(5, -5);
            gp.lineStyle();
            gp.endFill();
            gp.beginFill(16711680, 0);
            gp.drawRect((-shapeW) / 2, -5, shapeW, 5 + 10);
            gp.endFill();
            infoBtn = new InfoBtn();
            var loc2:*;
            infoBtn.useHandCursor = loc2 = true;
            infoBtn.buttonMode = loc2;
            infoBtn.x = shapeW - 35 - infoBtn.width - 5;
            infoBtn.y = 4 - shapeH;
            infoBtn.addEventListener(flash.events.MouseEvent.CLICK, function (arg1:flash.events.MouseEvent):void
            {
                flash.external.ExternalInterface.call("NS_SW_openStationDetail", _sid);
                arg1.stopImmediatePropagation();
                arg1.stopPropagation();
                return;
            })
            addChild(infoBtn);
            return;
        }

        private const TWEEN_TIME:Number=0.2;

        private const INTERVAL:Number=70;

        private var _sid:String;

        private var _name:String;

        private var _tipsArr:Array;

        private var _px:Number;

        private var _py:Number;

        private var _ex:Boolean;

        private var _scale:Number;

        private var _searchTip:Boolean;

        private var _label:flash.display.Sprite;

        private var _bg:flash.display.Sprite;

        private var _jsArr:Array;
    }
}
