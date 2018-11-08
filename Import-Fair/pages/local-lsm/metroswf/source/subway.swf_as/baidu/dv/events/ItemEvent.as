package baidu.dv.events 
{
    import flash.events.*;
    
    public class ItemEvent extends flash.events.Event
    {
        public function ItemEvent(arg1:String, arg2:Boolean=false, arg3:Boolean=false)
        {
            super(arg1, arg2, arg3);
            return;
        }

        public override function toString():String
        {
            return formatToString("ItemEvent", "type", "bubbles", "cancelable");
        }

        public override function clone():flash.events.Event
        {
            var loc1:*=new baidu.dv.events.ItemEvent(type, bubbles, cancelable);
            loc1.index = this.index;
            return loc1;
        }

        public static const ITEM_OVER:String="item_over";

        public static const ITEM_OUT:String="item_out";

        public static const ITEM_CLICK:String="item_click";

        public var index:int;
    }
}
