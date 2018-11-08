package baidu.subway.ui.info 
{
    import baidu.subway.event.*;
    import flash.display.*;
    import flash.events.*;
    import flash.external.*;
    import flash.text.*;
    
    public class EndInfo extends flash.display.Sprite
    {
        public function EndInfo()
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
            var loc1:*=new EndInfoSkin();
            addChild(loc1);
            this._label = loc1.getChildByName("st") as flash.text.TextField;
            if (this.getTextCNLen(this._infoObj["stlb"]) > 6) 
            {
                this._label.text = (this._infoObj["stlb"] as String).substr(0, 5) + "...";
            }
            else 
            {
                this._label.text = this._infoObj["stlb"];
            }
            var loc2:*=new flash.text.TextFormat("Arial", 12, 0, true);
            this._label.setTextFormat(loc2);
            this._label.autoSize = "left";
            this._label.width = this._label.textWidth;
            this._label.height = this._label.textHeight;
            this._price = loc1.getChildByName("p") as flash.text.TextField;
            this._price.text = this._infoObj["price"];
            this._time = loc1.getChildByName("t") as flash.text.TextField;
            this._time.text = this._infoObj["time"];
            this._infoBtn = loc1.getChildByName("sbt") as flash.display.MovieClip;
            this._clearBtn = loc1.getChildByName("cbt") as flash.display.MovieClip;
            this._infoBtn.buttonMode = true;
            this._clearBtn.buttonMode = true;
            this._infoBtn.addEventListener(flash.events.MouseEvent.CLICK, this.sbtnClick);
            this._clearBtn.addEventListener(flash.events.MouseEvent.CLICK, this.cbtnClick);
            addEventListener(flash.events.MouseEvent.ROLL_OVER, this.onTipsOver);
            return;
        }

        private function onTipsOver(arg1:flash.events.MouseEvent):void
        {
            this.parent.setChildIndex(this, this.parent.numChildren - 1);
            return;
        }

        private function sbtnClick(arg1:flash.events.MouseEvent):void
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

        private function cbtnClick(arg1:flash.events.MouseEvent):void
        {
            dispatchEvent(new baidu.subway.event.SubwayEvent(baidu.subway.event.SubwayEvent.INFO_CLEAR_RESULT));
            return;
        }

        private function getTextCNLen(arg1:String):int
        {
            var loc1:*=arg1.match(new RegExp("[^\\x00-\\x80]", "g"));
            var loc2:*=Math.ceil((arg1.length - loc1.length) / 2) + loc1.length;
            return loc2;
        }

        private var _label:flash.text.TextField;

        private var _price:flash.text.TextField;

        private var _time:flash.text.TextField;

        private var _infoBtn:flash.display.MovieClip;

        private var _clearBtn:flash.display.MovieClip;

        private var _infoObj:Object;
    }
}
