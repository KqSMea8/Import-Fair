package baidu.ui.managers 
{
    import __AS3__.vec.*;
    import flash.display.*;
    import flash.events.*;
    import flash.geom.*;
    import flash.system.*;
    import flash.ui.*;
    import flash.utils.*;
    
    public class CursorManager extends Object
    {
        public function CursorManager()
        {
            this.tigger2Cursor = new flash.utils.Dictionary(true);
            super();
            this.container = new flash.display.Sprite();
            this.container.mouseEnabled = false;
            this.container.tabEnabled = false;
            this.container.mouseChildren = false;
            return;
        }

        public function get root():flash.display.DisplayObjectContainer
        {
            return this._root;
        }

        public function set root(arg1:flash.display.DisplayObjectContainer):void
        {
            if (this._root != null) 
            {
                trace("Error:root只允许设置一次，之后不允许修改。");
            }
            else 
            {
                this._root = arg1;
                this._root.addChild(this.container);
            }
            return;
        }

        public function showCursor(arg1:*, arg2:Boolean=true):void
        {
            var loc2:*=null;
            var loc3:*=null;
            var loc4:*=null;
            var loc5:*=null;
            var loc6:*=null;
            var loc7:*=null;
            var loc8:*=null;
            var loc1:*=baidu.ui.managers.InstanceManager.createSingletonInstance(arg1);
            if (flash.system.ApplicationDomain.currentDomain.hasDefinition("flash.ui.MouseCursorData") && loc1.width <= 32 && loc1.height <= 32 && !this.forceUseMovieClipCursor) 
            {
                this.nativeCursor = true;
            }
            else 
            {
                this.nativeCursor = false;
                if (arg2) 
                {
                    flash.ui.Mouse.hide();
                }
                else 
                {
                    flash.ui.Mouse.show();
                    flash.ui.Mouse.cursor = flash.ui.MouseCursor.AUTO;
                }
                if (loc1 == this.currentCursor) 
                {
                    return;
                }
            }
            if (this.nativeCursor) 
            {
                loc2 = new flash.display.BitmapData(loc1.width, loc1.height, true, 0);
                loc3 = new flash.display.Sprite();
                loc3.addChild(loc1);
                loc4 = loc1.getBounds(loc3);
                loc5 = loc1.transform.matrix;
                loc5.translate(-loc4.x, -loc4.y);
                loc2.draw(loc1, loc5, loc1.transform.colorTransform, null, null, true);
                loc6 = new Vector.<flash.display.BitmapData>();
                loc6.push(loc2);
                loc7 = flash.system.ApplicationDomain.currentDomain.getDefinition("flash.ui.MouseCursorData") as Class;
                loc8 = new loc7();
                loc8.data = loc6;
                loc8.hotSpot = new flash.geom.Point(-loc4.x, -loc4.y);
                Object(flash.ui.Mouse).registerCursor(CURSOR_NAME, loc8);
                flash.ui.Mouse.cursor = CURSOR_NAME;
                this.currentCursor = loc1;
            }
            else if (this.container != null) 
            {
                if (this.currentCursor != loc1) 
                {
                    if (this.currentCursor != null) 
                    {
                        this.container.removeChild(this.currentCursor);
                    }
                    this.currentCursor = loc1;
                    this.container.addChild(this.currentCursor);
                }
                baidu.ui.managers.DepthManager.bringToTop(this.container);
                this.root.stage.addEventListener(flash.events.MouseEvent.MOUSE_MOVE, this.handleMove, false);
                this.handleMove(null);
            }
            return;
        }

        private function handleMove(arg1:flash.events.MouseEvent):void
        {
            if (!this.nativeCursor) 
            {
                this.container.x = this.container.parent.mouseX;
                this.container.y = this.container.parent.mouseY;
                baidu.ui.managers.DepthManager.bringToTop(this.container);
                if (arg1 != null) 
                {
                    arg1.updateAfterEvent();
                }
            }
            return;
        }

        public function hideCursor(arg1:*):void
        {
            arg1 = baidu.ui.managers.InstanceManager.createSingletonInstance(arg1);
            if (arg1 != this.currentCursor) 
            {
                return;
            }
            this.hideCurrentCursor();
            return;
        }

        public function hideCurrentCursor():void
        {
            if (this.nativeCursor) 
            {
                flash.ui.Mouse.cursor = flash.ui.MouseCursor.AUTO;
            }
            else 
            {
                if (this.container != null) 
                {
                    if (this.currentCursor != null) 
                    {
                        this.container.removeChild(this.currentCursor);
                    }
                }
                this.currentCursor = null;
                flash.ui.Mouse.show();
                if (this.root != null) 
                {
                    this.root.stage.removeEventListener(flash.events.MouseEvent.MOUSE_MOVE, this.handleMove);
                }
            }
            return;
        }

        public function register(arg1:flash.display.InteractiveObject, arg2:*):void
        {
            if (arg2 == null) 
            {
                this.handleTriggerOut(null);
                arg1.removeEventListener(flash.events.MouseEvent.ROLL_OVER, this.handleTriggerOver, false);
                arg1.removeEventListener(flash.events.MouseEvent.ROLL_OUT, this.handleTriggerOut, false);
                arg1.removeEventListener(flash.events.MouseEvent.MOUSE_UP, this.handleTriggerUp, false);
                delete this.tigger2Cursor[arg1];
            }
            else 
            {
                this.tigger2Cursor[arg1] = baidu.ui.managers.InstanceManager.createSingletonInstance(arg2);
                arg1.addEventListener(flash.events.MouseEvent.ROLL_OVER, this.handleTriggerOver, false);
                arg1.addEventListener(flash.events.MouseEvent.ROLL_OUT, this.handleTriggerOut, false);
                arg1.addEventListener(flash.events.MouseEvent.MOUSE_UP, this.handleTriggerUp, false);
            }
            return;
        }

        public function unregister(arg1:flash.display.InteractiveObject):void
        {
            this.register(arg1, null);
            return;
        }

        private function handleTriggerOver(arg1:flash.events.MouseEvent):void
        {
            var loc1:*=arg1.currentTarget as flash.display.InteractiveObject;
            var loc2:*=this.tigger2Cursor[loc1] as flash.display.DisplayObject;
            if (loc2 && !arg1.buttonDown) 
            {
                this.showCursor(loc2);
            }
            return;
        }

        private function handleTriggerOut(arg1:flash.events.MouseEvent):void
        {
            this.hideCurrentCursor();
            return;
        }

        private function handleTriggerUp(arg1:flash.events.MouseEvent):void
        {
            var loc1:*=arg1.currentTarget as flash.display.InteractiveObject;
            var loc2:*=this.tigger2Cursor[loc1] as flash.display.DisplayObject;
            if (loc2 && loc1.hitTestPoint(arg1.stageX, arg1.stageY, true)) 
            {
                this.showCursor(loc2);
            }
            return;
        }

        public static function getInstance():baidu.ui.managers.CursorManager
        {
            return baidu.ui.managers.InstanceManager.createSingletonInstance(baidu.ui.managers.CursorManager);
        }

        private static const CURSOR_NAME:String="__baidu_smart_custom_cursor";

        private var tigger2Cursor:flash.utils.Dictionary;

        private var _root:flash.display.DisplayObjectContainer=null;

        private var container:flash.display.DisplayObjectContainer=null;

        private var currentCursor:flash.display.DisplayObject=null;

        private var nativeCursor:Boolean=false;

        public var forceUseMovieClipCursor:Boolean=false;
    }
}
