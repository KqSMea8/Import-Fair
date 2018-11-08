package 
{
    import baidu.subway.*;
    import flash.display.*;
    import flash.events.*;
    import flash.external.*;
    import flash.system.*;
    import flash.ui.*;
    
    public class Main extends flash.display.Sprite
    {
		public static var stationTypeMap:Object={};
		public static var stationUponGroundMap:Object={};
		public static var stationContinuityMap:Object={"铁力路":true,"上海赛车场":true};
		
		//质差指标
		public static var userMap:Object={};
		public static var maxUser:Number=0;
		public static var maxRadius:Number=45;
		public static var reverseFlag:Boolean=false;//默认数值越大圈越大
		
        public function Main()
        {
			trace("main start");
            super();
            flash.system.Security.allowDomain("*");
            stage.scaleMode = flash.display.StageScaleMode.NO_SCALE;
            stage.align = flash.display.StageAlign.TOP_LEFT;
            addEventListener(flash.events.Event.ENTER_FRAME, this.checkReady);
            return;
        }

        private function initUI():void
        {
            var loc2:*=null;
            try 
            {
                loc2 = new flash.ui.ContextMenu();
                loc2.hideBuiltInItems();
                this.contextMenu = loc2;
            }
            catch (err:Error)
            {
            };
            var loc1:*=new baidu.subway.Subway();
            addChild(loc1);
            loc1.configExternalInterface();
            try 
            {
				trace("try call ExternalInterface NS_SW_swfLoaded");
                if (flash.external.ExternalInterface.available) 
                {
                    flash.external.ExternalInterface.call("NS_SW_swfLoaded");
                }
            }
            catch (err:Error)
            {
				trace("ExternalInterface error");
            };
            return;
        }

        private function checkReady(arg1:flash.events.Event):void
        {
            var loc1:*=stage.stageWidth;
            var loc2:*=stage.stageHeight;
            if (loc1 > 0 && loc2 > 0) 
            {
                removeEventListener(flash.events.Event.ENTER_FRAME, this.checkReady);
                this.initUI();
            }
            return;
        }
    }
}
