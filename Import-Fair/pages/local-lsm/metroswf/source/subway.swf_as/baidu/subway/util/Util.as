package baidu.subway.util 
{
    import baidu.subway.feature.*;
    import baidu.subway.ui.info.*;
    import baidu.subway.ui.tips.*;
    import flash.display.*;
    import flash.geom.*;
    
    public class Util extends Object
    {
        public function Util()
        {
            super();
            return;
        }

        public static function DecToHex(arg1:uint):String
        {
            var loc1:*=0;
            var loc2:*=20;
            var loc3:*="";
            while (loc2 >= 0) 
            {
                loc1 = (arg1 >> loc2) % 16;
                if (loc1 >= 10) 
                {
                    var loc4:*=loc1;
                }
                else 
                {
                    loc3 = loc3 + loc1;
                }
                loc2 = loc2 - 4;
            }
            return loc3;
        }

        public static function adjustStartPosition(arg1:baidu.subway.feature.Station, arg2:baidu.subway.ui.tips.StartTips, arg3:baidu.subway.ui.info.StartInfo, arg4:Object, arg5:flash.display.Sprite, arg6:flash.display.Sprite):void
        {
            var loc1:*=arg5.localToGlobal(new flash.geom.Point(arg1.x, arg1.y));
            arg3.x = loc1.x + arg4["x"];
            arg3.y = loc1.y + arg4["y"];
            if (arg3.hitTestObject(arg6)) 
            {
                arg4["x"] = -arg3.width - 20;
                arg4["y"] = -10;
                arg3.x = loc1.x + arg4["x"];
                arg3.y = loc1.y + arg4["y"];
            }
            if (arg3.hitTestObject(arg6)) 
            {
                arg4["x"] = (-arg3.width) / 2 - 10;
                arg4["y"] = -arg3.height - 10;
                arg3.x = loc1.x + arg4["x"];
                arg3.y = loc1.y + arg4["y"];
            }
            if (arg3.hitTestObject(arg6) || arg3.hitTestObject(arg2)) 
            {
                arg4["x"] = (-arg3.width) / 2 - 10;
                arg4["y"] = 10;
                arg3.x = loc1.x + arg4["x"];
                arg3.y = loc1.y + arg4["y"];
            }
            if (arg3.hitTestObject(arg6)) 
            {
                arg4["x"] = 10;
                arg4["y"] = 10;
                arg3.x = loc1.x + arg4["x"];
                arg3.y = loc1.y + arg4["y"];
            }
            if (arg3.hitTestObject(arg6)) 
            {
                arg4["x"] = 10;
                arg4["y"] = -arg3.height - 20;
                arg3.x = loc1.x + arg4["x"];
                arg3.y = loc1.y + arg4["y"];
            }
            if (arg3.hitTestObject(arg6)) 
            {
                arg4["x"] = -arg3.width - 10;
                arg4["y"] = arg3.height - 20;
                arg3.x = loc1.x + arg4["x"];
                arg3.y = loc1.y + arg4["y"];
            }
            if (arg3.hitTestObject(arg6)) 
            {
                arg4["x"] = -arg3.width - 10;
                arg4["y"] = 10;
                arg3.x = loc1.x + arg4["x"];
                arg3.y = loc1.y + arg4["y"];
            }
            if (arg3.hitTestObject(arg6)) 
            {
                arg4["x"] = 10;
                arg4["y"] = 10;
                arg3.x = loc1.x + arg4["x"];
                arg3.y = loc1.y + arg4["y"];
            }
            return;
        }

        public static function adjustTransPosition(arg1:baidu.subway.feature.Station, arg2:baidu.subway.ui.info.TransInfo, arg3:Object, arg4:flash.display.Sprite, arg5:flash.display.Sprite):void
        {
            var loc1:*=arg4.localToGlobal(new flash.geom.Point(arg1.x, arg1.y));
            arg2.x = loc1.x + arg3["x"];
            arg2.y = loc1.y + arg3["y"];
            if (arg2.hitTestObject(arg5)) 
            {
                arg3["x"] = -arg2.width - 10;
                arg3["y"] = 0;
                arg2.x = loc1.x + arg3["x"];
                arg2.y = loc1.y + arg3["y"];
            }
            if (arg2.hitTestObject(arg5)) 
            {
                arg3["x"] = (-arg2.width) / 2;
                arg3["y"] = -arg2.height - 10;
                arg2.x = loc1.x + arg3["x"];
                arg2.y = loc1.y + arg3["y"];
            }
            if (arg2.hitTestObject(arg5)) 
            {
                arg3["x"] = (-arg2.width) / 2 - 10;
                arg3["y"] = 10;
                arg2.x = loc1.x + arg3["x"];
                arg2.y = loc1.y + arg3["y"];
            }
            if (arg2.hitTestObject(arg5)) 
            {
                arg3["x"] = 10;
                arg3["y"] = 10;
                arg2.x = loc1.x + arg3["x"];
                arg2.y = loc1.y + arg3["y"];
            }
            if (arg2.hitTestObject(arg5)) 
            {
                arg3["x"] = 10;
                arg3["y"] = -arg2.height - 10;
                arg2.x = loc1.x + arg3["x"];
                arg2.y = loc1.y + arg3["y"];
            }
            if (arg2.hitTestObject(arg5)) 
            {
                arg3["x"] = -arg2.width - 10;
                arg3["y"] = -arg2.height - 10;
                arg2.x = loc1.x + arg3["x"];
                arg2.y = loc1.y + arg3["y"];
            }
            if (arg2.hitTestObject(arg5)) 
            {
                arg3["x"] = -arg2.width - 10;
                arg3["y"] = 10;
                arg2.x = loc1.x + arg3["x"];
                arg2.y = loc1.y + arg3["y"];
            }
            if (arg2.hitTestObject(arg5)) 
            {
                arg3["x"] = 10;
                arg3["y"] = 10;
                arg2.x = loc1.x + arg3["x"];
                arg2.y = loc1.y + arg3["y"];
            }
            return;
        }

        public static function adjustEndPosition(arg1:baidu.subway.feature.Station, arg2:baidu.subway.ui.tips.EndTips, arg3:baidu.subway.ui.info.EndInfo, arg4:Object, arg5:flash.display.Sprite, arg6:flash.display.Sprite):void
        {
            var loc1:*=arg5.localToGlobal(new flash.geom.Point(arg1.x, arg1.y));
            arg3.x = loc1.x + arg4["x"];
            arg3.y = loc1.y + arg4["y"];
            if (arg3.hitTestObject(arg6)) 
            {
                arg4["x"] = -arg3.width - 10;
                arg4["y"] = 10;
                arg3.x = loc1.x + arg4["x"];
                arg3.y = loc1.y + arg4["y"];
            }
            if (arg3.hitTestObject(arg6)) 
            {
                arg4["x"] = (-arg3.width) / 2 - 10;
                arg4["y"] = -arg3.height - 10;
                arg3.x = loc1.x + arg4["x"];
                arg3.y = loc1.y + arg4["y"];
            }
            if (arg3.hitTestObject(arg6) || arg3.hitTestObject(arg2)) 
            {
                arg4["x"] = (-arg3.width) / 2 - 10;
                arg4["y"] = 10;
                arg3.x = loc1.x + arg4["x"];
                arg3.y = loc1.y + arg4["y"];
            }
            if (arg3.hitTestObject(arg6)) 
            {
                arg4["x"] = 10;
                arg4["y"] = 10;
                arg3.x = loc1.x + arg4["x"];
                arg3.y = loc1.y + arg4["y"];
            }
            if (arg3.hitTestObject(arg6)) 
            {
                arg4["x"] = 10;
                arg4["y"] = -arg3.height - 10;
                arg3.x = loc1.x + arg4["x"];
                arg3.y = loc1.y + arg4["y"];
            }
            if (arg3.hitTestObject(arg6)) 
            {
                arg4["x"] = -arg3.width - 10;
                arg4["y"] = -arg3.height - 10;
                arg3.x = loc1.x + arg4["x"];
                arg3.y = loc1.y + arg4["y"];
            }
            if (arg3.hitTestObject(arg6)) 
            {
                arg4["x"] = -arg3.width - 10;
                arg4["y"] = 10;
                arg3.x = loc1.x + arg4["x"];
                arg3.y = loc1.y + arg4["y"];
            }
            if (arg3.hitTestObject(arg6)) 
            {
                arg4["x"] = 10;
                arg4["y"] = 10;
                arg3.x = loc1.x + arg4["x"];
                arg3.y = loc1.y + arg4["y"];
            }
            return;
        }

        public static const NOT_USED_COLOR:uint=13421772;
    }
}
