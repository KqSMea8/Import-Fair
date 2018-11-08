package baidu.dv.core 
{
    import flash.display.*;
    import flash.events.*;
    
    public class DVBase extends flash.display.Sprite
    {
        public function DVBase()
        {
            this._styles = {};
            this._invalidHash = {};
            super();
            this.initStyle();
            return;
        }

        protected function initStyle():void
        {
            return;
        }

        protected function applyChanges():void
        {
            return;
        }

        protected function resetInvalidHash(arg1:String=null):void
        {
            var loc1:*=false;
            var loc2:*=null;
            if (arg1 != null) 
            {
                this._invalidHash[arg1] = false;
                loc1 = true;
                loc3 = 0;
                loc4 = this._invalidHash;
                for (loc2 in loc4) 
                {
                    if (this._invalidHash[loc2] != true) 
                    {
                        continue;
                    }
                    loc1 = false;
                    break;
                }
                if (loc1) 
                {
                    this._invalid = false;
                }
            }
            else 
            {
                this._invalid = false;
                var loc3:*=0;
                var loc4:*=this._invalidHash;
                for (arg1 in loc4) 
                {
                    this._invalidHash[arg1] = false;
                }
            }
            return;
        }

        protected function isInvalid(arg1:String):Boolean
        {
            if (this._invalidHash[arg1] == true) 
            {
                return true;
            }
            return false;
        }

        protected function isInvalidOnly(arg1:String):Boolean
        {
            var loc1:*=null;
            if (this._invalidHash[arg1] == true) 
            {
                var loc2:*=0;
                var loc3:*=this._invalidHash;
                for (loc1 in loc3) 
                {
                    if (loc1 == arg1) 
                    {
                        continue;
                    }
                    if (this._invalidHash[loc1] != true) 
                    {
                        continue;
                    }
                    return false;
                }
                return true;
            }
            return false;
        }

        protected function invalidate(arg1:String):void
        {
            this._invalidHash[arg1] = true;
            this._invalid = true;
            if (this._listeningForRender) 
            {
                return;
            }
            if (stage) 
            {
                stage.addEventListener(flash.events.Event.RENDER, this.validateAll);
                stage.invalidate();
            }
            else 
            {
                this.addEventListener(flash.events.Event.ADDED_TO_STAGE, this.doAddedToStage);
            }
            this._listeningForRender = true;
            return;
        }

        private function doAddedToStage(arg1:flash.events.Event):void
        {
            this.removeEventListener(flash.events.Event.ADDED_TO_STAGE, this.doAddedToStage);
            if (this._invalid) 
            {
                stage.addEventListener(flash.events.Event.RENDER, this.validateAll);
                stage.invalidate();
            }
            return;
        }

        public override function get width():Number
        {
            return this._width;
        }

        public override function set width(arg1:Number):void
        {
            if (isNaN(arg1) || this._width == arg1) 
            {
                return;
            }
            this._width = arg1;
            this.invalidate(INVALID_TYPE_SIZE);
            return;
        }

        public override function get height():Number
        {
            return this._height;
        }

        public override function set height(arg1:Number):void
        {
            if (isNaN(arg1) || this._height == arg1) 
            {
                return;
            }
            this._height = arg1;
            this.invalidate(INVALID_TYPE_SIZE);
            return;
        }

        public override function get name():String
        {
            return this._styles["name"] ? this._styles["name"] : "";
        }

        public override function set name(arg1:String):void
        {
            if (arg1 == this._styles["name"]) 
            {
                return;
            }
            this._styles["name"] = arg1;
            return;
        }

        public function get data():*
        {
            return this._styles["data"];
        }

        public function set data(arg1:*):void
        {
            this._styles["data"] = arg1;
            this.invalidate(INVALID_TYPE_DATA);
            return;
        }

        public function get color():uint
        {
            return this._color;
        }

        public function set color(arg1:uint):void
        {
            this._color = arg1;
            this.invalidate(INVALID_TYPE_STYLE);
            return;
        }

        public function getStyle(arg1:String):*
        {
            return this._styles[arg1];
        }

        public function setStyle(arg1:String, arg2:*):void
        {
            if (this._styles[arg1] == arg2) 
            {
                return;
            }
            this._styles[arg1] = arg2;
            this.invalidate(INVALID_TYPE_STYLE);
            return;
        }

        public function setStyles(arg1:Object):void
        {
            var loc1:*=null;
            if (arg1 != null) 
            {
                var loc2:*=0;
                var loc3:*=arg1;
                for (loc1 in loc3) 
                {
                    this.setStyle(loc1, arg1[loc1]);
                }
            }
            else 
            {
                this.initStyle();
                this.invalidate(INVALID_TYPE_STYLE);
            }
            return;
        }

        public function validateNow():void
        {
            this.validateAll();
            return;
        }

        public function validateAll(arg1:flash.events.Event=null):void
        {
            if (this._listeningForRender) 
            {
                try 
                {
                }
                catch (e:Error)
                {
                };
                this._listeningForRender = false;
            }
            if (this._invalid) 
            {
                this.applyChanges();
                this.resetInvalidHash();
            }
            return;
        }

        public function clearStyle():void
        {
            this.initStyle();
            return;
        }

        public function destroy():void
        {
            return;
        }

        protected static const INVALID_TYPE_SIZE:String="size";

        protected static const INVALID_TYPE_STYLE:String="style";

        protected static const INVALID_TYPE_DATA:String="data";

        protected var _width:Number=1;

        protected var _height:Number=1;

        protected var _color:uint=0;

        protected var _styles:Object;

        protected var _invalid:Boolean=false;

        protected var _invalidHash:Object;

        protected var _listeningForRender:Boolean=false;
    }
}
