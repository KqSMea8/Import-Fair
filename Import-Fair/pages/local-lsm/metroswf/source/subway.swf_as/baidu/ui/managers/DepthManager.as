package baidu.ui.managers 
{
    import flash.display.*;
    
    public class DepthManager extends Object
    {
        public function DepthManager()
        {
            super();
            return;
        }

        public static function bringToBottom(arg1:flash.display.DisplayObject):void
        {
            var loc1:*=arg1.parent;
            if (loc1 == null) 
            {
                return;
            }
            if (loc1.getChildIndex(arg1) != 0) 
            {
                loc1.setChildIndex(arg1, 0);
            }
            return;
        }

        public static function bringToTop(arg1:flash.display.DisplayObject):void
        {
            var loc1:*=arg1.parent;
            if (loc1 == null) 
            {
                return;
            }
            var loc2:*=loc1.numChildren - 1;
            if (loc1.getChildIndex(arg1) != loc2) 
            {
                loc1.setChildIndex(arg1, loc2);
            }
            return;
        }

        public static function isTop(arg1:flash.display.DisplayObject):Boolean
        {
            var loc1:*=arg1.parent;
            if (loc1 == null) 
            {
                return true;
            }
            return loc1.numChildren - 1 == loc1.getChildIndex(arg1);
        }

        public static function isBottom(arg1:flash.display.DisplayObject):Boolean
        {
            var loc1:*=arg1.parent;
            if (loc1 == null) 
            {
                return true;
            }
            return loc1.getChildIndex(arg1) == 0;
        }

        public static function isJustBelow(arg1:flash.display.DisplayObject, arg2:flash.display.DisplayObject):Boolean
        {
            var loc1:*=arg1.parent;
            if (loc1 == null) 
            {
                return false;
            }
            if (arg2.parent != loc1) 
            {
                return false;
            }
            return loc1.getChildIndex(arg1) == loc1.getChildIndex(arg2) - 1;
        }

        public static function isJustAbove(arg1:flash.display.DisplayObject, arg2:flash.display.DisplayObject):Boolean
        {
            return isJustBelow(arg2, arg1);
        }
    }
}
