package baidu.subway.ui.control 
{
    import baidu.dv.core.*;
    import baidu.dv.events.*;
    import baidu.dv.legend.*;
    import baidu.subway.util.*;
    import flash.display.*;
    import flash.events.*;
    import flash.text.*;
    
    public class AdvancedLegend extends baidu.dv.core.DVBase
    {
        public function AdvancedLegend()
        {
            super();
            return;
        }

        public override function get width():Number
        {
            validateAll();
            return _width;
        }

        public override function set width(arg1:Number):void
        {
            this._hasSetWidth = true;
            super.width = arg1;
            return;
        }

        public override function get height():Number
        {
            validateAll();
            return _height;
        }

        public override function set height(arg1:Number):void
        {
            this._hasSetHeight = true;
            super.height = arg1;
            return;
        }

        public override function set data(arg1:*):void
        {
            if (!(arg1 is Array)) 
            {
                return;
            }
            super.data = arg1;
            return;
        }

        public function get numItems():uint
        {
            validateAll();
            return this._items ? this._items.length : 0;
        }

        public function getItemAt(arg1:uint):flash.display.Sprite
        {
            validateAll();
            if (this._items) 
            {
                return this._items[arg1];
            }
            return null;
        }

        protected override function initStyle():void
        {
            this._styles = this.DEFAULT_STYLES;
            return;
        }

        protected override function applyChanges():void
        {
            if (this.data == null) 
            {
                return;
            }
            if (isInvalidOnly(INVALID_TYPE_SIZE)) 
            {
                this.applySizeChange();
            }
            else 
            {
                this.initInterface();
            }
            return;
        }

        private function applySizeChange():void
        {
            var loc10:*=null;
            var loc11:*=null;
            var loc1:*=this._styles["direction"];
            var loc2:*=this._styles["itemHorizontalGap"];
            var loc3:*=this._styles["itemVerticalGap"];
            var loc4:*=this._styles["xPadding"];
            var loc5:*=this._styles["yPadding"];
            var loc6:*={"w":0, "h":0};
            if (!this._hasSetHeight) 
            {
                this._height = -1;
            }
            if (!this._hasSetWidth) 
            {
                this._width = -1;
            }
            var loc7:*=this._items[0];
            loc7.x = loc4;
            loc7.y = loc5;
            this._width = loc7.width + 2 * loc4;
            var loc8:*=1;
            var loc9:*=this._items.length;
            while (loc8 < loc9) 
            {
                loc10 = this._items[loc8];
                loc11 = this._items[loc8 - 1];
                loc6["w"] = Math.max(loc6["w"], loc11.x + loc11.width + loc2);
                loc6["h"] = Math.max(loc6["h"], loc11.y + loc11.height + loc3);
                if (loc1 != baidu.dv.legend.LegendDirection.VERTICAL) 
                {
                    loc10.x = loc11.x + loc11.width + loc2;
                    loc10.y = loc11.y;
                    if (this._hasSetWidth) 
                    {
                        if (loc10.x + loc10.width > this._width) 
                        {
                            loc10.x = loc4;
                            loc10.y = loc6["h"] + loc3;
                        }
                        this._height = loc10.y + loc10.height + loc5;
                    }
                    else 
                    {
                        this._width = loc10.x + loc10.width + loc4;
                        this._height = Math.max(this._height, loc10.height, loc11.height) + 2 * loc5;
                    }
                }
                else 
                {
                    loc10.y = loc11.y + loc11.height + loc3;
                    loc10.x = loc11.x;
                    if (this._hasSetHeight) 
                    {
                        if (loc10.y + loc10.height > this._height) 
                        {
                            loc10.y = loc5;
                            loc10.x = loc6["w"];
                        }
                        this._width = loc10.x + loc10.width + loc4;
                    }
                    else 
                    {
                        this._width = Math.max(this._width, loc10.width, loc11.width) + 2 * loc4;
                        this._height = loc10.y + loc10.height + loc5;
                    }
                }
                ++loc8;
            }
            if (this._bg) 
            {
                this._bg.width = this._width;
                this._bg.height = this._height;
            }
            return;
        }

        private function initInterface():void
        {
            var loc10:*=0;
            var loc11:*=0;
            var loc12:*=null;
            var loc13:*=undefined;
            var loc14:*=null;
            var loc15:*=0;
            var loc16:*=null;
            var loc17:*=null;
            if (this._bg) 
            {
                this.removeChild(this._bg);
            }
            if (this._items) 
            {
                loc10 = 0;
                loc11 = this._items.length;
                while (loc10 < loc11) 
                {
                    this.removeChild(this._items[loc10]);
                    ++loc10;
                }
            }
            this._items = [];
            var loc1:*=this._styles["direction"];
            var loc2:*=this._styles["itemHorizontalGap"];
            var loc3:*=this._styles["itemVerticalGap"];
            var loc4:*=this._styles["xPadding"];
            var loc5:*=this._styles["yPadding"];
            var loc6:*=0;
            var loc7:*=this.data.length;
            while (loc6 < loc7) 
            {
                loc12 = this.data[loc6];
                loc13 = loc12.icon || baidu.subway.util.LegendIconType.BLOCK;
                loc14 = loc12.label || "Legend" + loc6;
                loc15 = loc12.color || 0xffffff;
                loc16 = this.drawItem(loc13, loc14, loc15);
                this._items.push(loc16);
                this.addChild(loc16);
                loc16.addEventListener(flash.events.MouseEvent.ROLL_OVER, this.doItemEvent);
                loc16.addEventListener(flash.events.MouseEvent.ROLL_OUT, this.doItemEvent);
                loc16.addEventListener(flash.events.MouseEvent.CLICK, this.doItemEvent);
                ++loc6;
            }
            var loc8:*=this._styles["border"];
            var loc9:*=this._styles["background"];
            if (loc8 || loc9) 
            {
                this._bg = new flash.display.Sprite();
                this.addChildAt(this._bg, 0);
                loc17 = this._bg.graphics;
                if (loc8) 
                {
                    loc17.lineStyle(0, this._styles["borderColor"], 0.5);
                }
                if (loc9) 
                {
                    //loc17.beginFill(this._styles["backgroundColor"], 0.5);
					loc17.beginFill(0x041c28, 0.8);
                }
                loc17.drawRect(0, 0, this._width, this._height);
                loc17.endFill();
            }
            this.applySizeChange();
            return;
        }

        protected function doItemEvent(arg1:flash.events.MouseEvent):void
        {
            var loc6:*=null;
            if (arg1.buttonDown) 
            {
                return;
            }
            var loc1:*=arg1.target as flash.display.Sprite;
            loc1.buttonMode = true;
            var loc2:*=loc1.parent.getChildIndex(loc1);
            if (this._bg) 
            {
                loc2 = loc2 - 1;
            }
            var loc3:*=loc1.width;
            var loc4:*=loc1.height;
            var loc5:*=loc1.graphics;
            var loc7:*=arg1.type;
			
			var itemEventType:String="";
			if(loc7==flash.events.MouseEvent.ROLL_OVER){
				itemEventType=baidu.dv.events.ItemEvent.ITEM_OVER;
			}else if(loc7==flash.events.MouseEvent.ROLL_OUT){
				itemEventType=baidu.dv.events.ItemEvent.ITEM_OUT;
			}else if(loc7==flash.events.MouseEvent.CLICK){
				itemEventType=baidu.dv.events.ItemEvent.ITEM_CLICK;
			}
			var event:*=new baidu.dv.events.ItemEvent(itemEventType);
            event.index = loc2;
			this.dispatchEvent(event);
        }

        protected function drawItem(arg1:*, arg2:String, arg3:int):flash.display.Sprite
        {
			var fontSize:*=15;
            var loc4:*=null;
            var loc5:*=null;
            var loc8:*=NaN;
            var loc9:*=NaN;
            var loc1:*=new flash.display.Sprite();
            var loc2:*=new flash.text.TextField();
            loc2.textColor = 0xffffff;
            loc2.autoSize = "left";
            loc2.selectable = false;
            loc2.htmlText = arg2.replace("br", "");
			
            
            loc2.mouseEnabled = false;
            var loc3:*=null;//this._styles["labelTextFormat"];
			loc3 = new flash.text.TextFormat();
            loc3.color = 0xffffff;
            loc3.size = 18;
			loc3.bold=true;
            if (loc3) 
            {
                loc2.setTextFormat(loc3);
            }
            if (arg1 is flash.display.Sprite) 
            {
                loc4 = arg1;
            }
            else if (arg1 != baidu.subway.util.LegendIconType.LINE) 
            {
                if (arg1 == baidu.subway.util.LegendIconType.BLOCK) 
                {
                    loc4 = new flash.display.Sprite();
					
					loc5 = loc4.graphics;
					loc5.lineStyle();
					loc8 = 13;
					if(arg3!=0xffffff){
						loc5.beginFill(arg3);
					}else{
						loc5.beginFill(arg3,0);
					}
					loc5.drawCircle(15,15, loc8);
					loc5.endFill();
				
                    
                }
            }
            else 
            {
                loc4 = new flash.display.Sprite();
                loc5 = loc4.graphics;
                loc5.lineStyle(2, arg3, 1, false, "normal", "none");
                loc5.moveTo(0, 1);
                loc5.lineTo(25, 1);
            }
            if (loc4) 
            {
                loc1.addChild(loc4);
                loc4.mouseEnabled = false;
            }
			loc1.addChild(loc2);
            var loc6:*=loc4 ? Math.max(loc2.height, loc4.height) : loc2.height;
            loc4.x = 0;
            loc4.y = 0;//(loc6 - loc4.height) / 2;
            loc2.x = 0;//loc4.width + 5;
			loc2.y = (loc4.height-loc3.size)/2;//(loc6 - loc2.height) / 2;
			if(arg2.length==1){
				loc2.x = (loc4.width-loc3.size*(arg2.length-1))/2-5;//loc4.width + 5;
			}else if(arg2.length==2){
				loc2.x = (loc4.width-loc3.size*(arg2.length-1))/2;//loc4.width + 5;
			}
            
            var loc7:*=loc1.graphics;
            loc7.clear();
            loc7.beginFill(arg3, 0);
            loc7.drawRect(0, 0, loc2.x + loc2.width, loc6);
            loc7.endFill();
            return loc1;
        }

        private const DEFAULT_STYLES:Object={"border":false, "borderColor":12763842, "background":false, "backgroundColor":16119285, "labelTextFormat":null, "direction":baidu.dv.legend.LegendDirection.HORIZONTAL, "itemHorizontalGap":10, "itemVerticalGap":0, "xPadding":5, "yPadding":0};

        protected var _bg:flash.display.Sprite;

        private var _items:Array;

        private var _hasSetWidth:Boolean=false;

        private var _hasSetHeight:Boolean=false;
    }
}
