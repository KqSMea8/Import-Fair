package baidu.subway.ui.info 
{
    import flash.display.*;
    import flash.events.*;
    import flash.external.*;
    import flash.text.*;
    
    public class StartInfo extends flash.display.Sprite
    {
        public function StartInfo()
        {
            super();
            return;
        }

        public function set infoObj(arg1:Object):void
        {
            if (arg1 != this._infoObj) 
            {
                this._infoObj = arg1;
                this.init();
            }
            return;
        }

        public function get infoObj():Object
        {
            return this._infoObj;
        }

        private function init():void
        {
            var loc6:*=null;
            var loc7:*=null;
            this.drawStationlabel();
            this._jsArr = flash.external.ExternalInterface.call("FH_siteHover", this._infoObj["sid"]);
            var loc1:*=0;
            var loc2:*=new flash.text.TextFormat("Arial", 12, 0);
            var loc3:*=new flash.text.TextFormat("Arial", 12, 11509145);
            var loc4:*=0;
            var loc5:*=this._jsArr.length;
            while (loc4 < loc5) 
            {
                if (this._infoObj["lid"].indexOf(this._jsArr[loc4]["lid"]) != -1) 
                {
                    loc6 = new flash.text.TextField();
                    loc6.text = this._jsArr[loc4]["direction"];
                    loc6.autoSize = "left";
                    loc6.selectable = false;
                    loc6.setTextFormat(loc2);
                    loc6.x = 2;
                    loc6.y = this._lbSt.height + 33 + 18 * loc1;
                    this._info.addChild(loc6);
                    loc7 = new flash.text.TextField();
                    loc7.text = "方向";
                    loc7.autoSize = "left";
                    loc7.selectable = false;
                    loc7.setTextFormat(loc3);
                    loc7.x = loc6.x + loc6.width - 3;
                    loc7.y = loc6.y;
                    this._info.addChild(loc7);
                    if (loc7.x + loc7.width > this._maxWidth) 
                    {
                        this._maxWidth = loc7.x + loc7.width;
                    }
                    ++loc1;
                    if (loc1 == 2) 
                    {
                        loc1 = 0;
                        break;
                    }
                }
                ++loc4;
            }
            this.drawLineIcon();
            this.drawDirections();
            this.drawBg();
            addEventListener(flash.events.MouseEvent.ROLL_OVER, this.onTipsOver);
            return;
        }

        private function onTipsOver(arg1:flash.events.MouseEvent):void
        {
            this.parent.setChildIndex(this, this.parent.numChildren - 1);
            return;
        }

        private function drawStationlabel():void
        {
            this._info = new flash.display.Sprite();
            var loc1:*=new flash.text.TextFormat("宋体", 12, 0, true);
            this._lbSt = new flash.text.TextField();
            this._lbSt.text = this._infoObj["stlb"];
            this._lbSt.autoSize = "left";
            this._lbSt.selectable = false;
            this._lbSt.setTextFormat(loc1);
            this._lbSt.y = 3;
            this._info.addChild(this._lbSt);
            return;
        }

        private function drawLineIcon():void
        {
            var loc1:*=new flash.text.TextFormat("Arial", 12, 16777215);
            var loc2:*=new flash.text.TextField();
            loc2.text = this._infoObj["lb"];
            loc2.autoSize = "left";
            loc2.selectable = false;
            loc2.setTextFormat(loc1);
            var loc3:*=new flash.display.Sprite();
            loc3.graphics.lineStyle(1, this._infoObj["lc"], 1);
            loc3.graphics.beginFill(this._infoObj["lc"]);
            loc3.graphics.drawRoundRect(0, 0, loc2.width + 5, loc2.height, 4, 4);
            loc3.graphics.endFill();
            loc2.x = (loc3.width - loc2.width) / 2;
            loc2.y = (loc3.height - loc2.height) / 2;
            loc3.addChild(loc2);
            loc3.graphics.moveTo(2, loc3.height - 1);
            loc3.graphics.lineTo(this._maxWidth + 120, loc3.height - 1);
            loc3.x = 2;
            loc3.y = this._lbSt.height + 9;
            this._info.addChild(loc3);
            return;
        }

        private function drawDirections():void
        {
            var loc5:*=null;
            var loc6:*=null;
            var loc7:*=null;
            var loc8:*=null;
            var loc1:*=0;
            var loc2:*=new flash.text.TextFormat("Arial", 12, 0);
            var loc3:*=0;
            var loc4:*=this._jsArr.length;
            while (loc3 < loc4) 
            {
                if (this._infoObj["lid"].indexOf(this._jsArr[loc3]["lid"]) != -1) 
                {
                    loc5 = new SIcon();
                    loc5.x = this._maxWidth + 20;
                    loc5.y = this._lbSt.height + 38 + 18 * loc1;
                    this._info.addChild(loc5);
                    loc6 = new flash.text.TextField();
                    loc6.text = this._jsArr[loc3]["stime"];
                    loc6.autoSize = "left";
                    loc6.selectable = false;
                    loc6.setTextFormat(loc2);
                    loc6.x = loc5.x + loc5.width + 1;
                    loc6.y = this._lbSt.height + 33 + 18 * loc1;
                    this._info.addChild(loc6);
                    loc7 = new EIcon();
                    loc7.x = this._maxWidth + 75;
                    loc7.y = this._lbSt.height + 38 + 18 * loc1;
                    this._info.addChild(loc7);
                    loc8 = new flash.text.TextField();
                    loc8.text = this._jsArr[loc3]["etime"];
                    loc8.autoSize = "left";
                    loc8.selectable = false;
                    loc8.setTextFormat(loc2);
                    loc8.x = loc7.x + loc7.width + 1;
                    loc8.y = this._lbSt.height + 33 + 18 * loc1;
                    this._info.addChild(loc8);
                    ++loc1;
                    if (loc1 == 2) 
                    {
                        loc1 = 0;
                        break;
                    }
                }
                ++loc3;
            }
            return;
        }

        private function drawBg():void
        {
            var shapeW:Number;
            var shapeH:Number;
            var gp:flash.display.Graphics;
            var infoBtn:InfoBtn;

            var loc1:*;
            shapeW = this._info.width + 20;
            shapeH = this._info.height + 20;
            if (!this._bg) 
            {
                this._bg = new flash.display.Sprite();
                this.addChildAt(this._bg, 0);
            }
            gp = this._bg.graphics;
            gp.clear();
            gp.lineStyle();
            gp.beginFill(12040635);
            gp.drawRoundRect(-1, -1, shapeW + 2, shapeH + 2, 6, 6);
            gp.endFill();
            gp.beginFill(16777215);
            gp.drawRoundRect(0, 0, shapeW, shapeH, 4, 4);
            gp.endFill();
            this._info.x = 10;
            this._info.y = 5;
            this._bg.addChild(this._info);
            infoBtn = new InfoBtn();
            var loc2:*;
            infoBtn.useHandCursor = loc2 = true;
            infoBtn.buttonMode = loc2;
            infoBtn.x = shapeW - 48;
            infoBtn.y = 8;
            infoBtn.addEventListener(flash.events.MouseEvent.CLICK, function (arg1:flash.events.MouseEvent):void
            {
                flash.external.ExternalInterface.call("NS_SW_openStationDetail", _infoObj["sid"]);
                arg1.stopImmediatePropagation();
                arg1.stopPropagation();
                return;
            })
            addChild(infoBtn);
            return;
        }

        private function btnClick(arg1:flash.events.MouseEvent):void
        {
            try 
            {
                flash.external.ExternalInterface.call("NS_SW_openStationDetail", this._infoObj["sid"]);
            }
            catch (err:Error)
            {
            };
            return;
        }

        private var _info:flash.display.Sprite;

        private var _bg:flash.display.Sprite;

        private var _lbSt:flash.text.TextField;

        private var _maxWidth:Number=0;

        private var _infoObj:Object;

        private var _jsArr:Array;
    }
}
