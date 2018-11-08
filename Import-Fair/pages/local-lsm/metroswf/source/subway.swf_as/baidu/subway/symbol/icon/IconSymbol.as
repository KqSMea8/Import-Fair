package baidu.subway.symbol.icon 
{
    import baidu.subway.symbol.*;
    import flash.display.*;
    import flash.system.*;
    
    public class IconSymbol extends Object implements baidu.subway.symbol.ISymbol
    {
        public function IconSymbol(arg1:flash.display.Sprite, arg2:String)
        {
            super();
            this._shp = arg1;
            this._icon = arg2;
            return;
        }

        public function draw():void
        {
            var loc1:*=null;
            var loc2:*=null;
            var loc3:*=null;
            var loc4:*=null;
            if (this._icon != "") 
            {
                loc1 = this._icon.split(",");
                try 
                {
                    loc2 = flash.system.ApplicationDomain.currentDomain;
                    loc3 = loc2.getDefinition(loc1[0] as String) as Class;
                    loc4 = new loc3();
                    loc4.x = Number(loc1[1]);
                    loc4.y = Number(loc1[2]);
                    this._shp.addChild(loc4);
                }
                catch (error:Error)
                {
                };
            }
            return;
        }

        public function changeShadow(arg1:Number=1):void
        {
            return;
        }

        public function drawResult(... rest):flash.display.DisplayObject
        {
            trace("IconSymbol return null");
            return null;
        }

        private var _shp:flash.display.Sprite;

        private var _icon:String;
    }
}
