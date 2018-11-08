package baidu.subway.data 
{
    import baidu.subway.event.*;
    import baidu.subway.parse.*;
    import flash.events.*;
    import flash.net.*;
    
    public class DataManager extends flash.events.EventDispatcher
    {
        public function DataManager(arg1:singleton)
        {
            super();
            return;
        }

        public function getData(arg1:String, arg2:String):void
        {
            this._loader = new flash.net.URLLoader();
            this._loader.addEventListener(flash.events.Event.COMPLETE, this.onDataComplete);
            this._loader.addEventListener(flash.events.IOErrorEvent.IO_ERROR, this.onDataError);
            this._loader.addEventListener(flash.events.SecurityErrorEvent.SECURITY_ERROR, this.onDataError);
            var loc1:*=arg1.substr(0, arg1.indexOf("?"));
            var loc2:*=arg1.substring(arg1.indexOf("?"), arg1.length);
            var loc3:*="";
            if (arg2.toUpperCase() != "AMF") 
            {
                loc3 = loc1 + ".xml" + loc2;
                this._parse = new baidu.subway.parse.Parser4XML();
            }
            else 
            {
                loc3 = loc1 + ".dat" + loc2;
                this._parse = new baidu.subway.parse.Parser4AMF();
                this._loader.dataFormat = flash.net.URLLoaderDataFormat.BINARY;
            }
			trace("xml地址:"+loc3);
            this._loader.load(new flash.net.URLRequest(loc3));
            return;
        }

        private function onDataComplete(arg1:flash.events.Event):void
        {
            var evt:flash.events.Event;
            var event:baidu.subway.event.SubwayEvent;

            var loc1:*;
            event = null;
            evt = arg1;
            this._loader.removeEventListener(flash.events.Event.COMPLETE, this.onDataComplete);
            this._loader.removeEventListener(flash.events.IOErrorEvent.IO_ERROR, this.onDataError);
            this._loader.removeEventListener(flash.events.SecurityErrorEvent.SECURITY_ERROR, this.onDataError);
            try 
            {
                this._parse.parse(this._loader.data);
                event = new baidu.subway.event.SubwayEvent(baidu.subway.event.SubwayEvent.DM_DATA_COMPLETE);
                event.data = this._parse.swVO;
            }
            catch (err:Error)
            {
                event = new baidu.subway.event.SubwayEvent(baidu.subway.event.SubwayEvent.DM_DATA_ERROR);
            }
            finally
            {
                dispatchEvent(event);
            }
            return;
        }

        private function onDataError(arg1:flash.events.Event):void
        {
            this._loader.removeEventListener(flash.events.Event.COMPLETE, this.onDataComplete);
            this._loader.removeEventListener(flash.events.IOErrorEvent.IO_ERROR, this.onDataError);
            this._loader.removeEventListener(flash.events.SecurityErrorEvent.SECURITY_ERROR, this.onDataError);
            if (arg1 is flash.events.IOErrorEvent) 
            {
                trace("io error");
            }
            else if (arg1 is flash.events.SecurityErrorEvent) 
            {
                trace("security error");
            }
            else 
            {
                trace("unknow error");
            }
            var loc1:*=new baidu.subway.event.SubwayEvent(baidu.subway.event.SubwayEvent.DM_DATA_ERROR);
            dispatchEvent(loc1);
            return;
        }

        public static function getInstance():baidu.subway.data.DataManager
        {
            if (!_instance) 
            {
                _instance = new DataManager(new singleton());
            }
            return _instance;
        }

        private var _loader:flash.net.URLLoader;

        private var _parse:baidu.subway.parse.Parser;

        private static var _instance:baidu.subway.data.DataManager;
    }
}


class singleton extends Object
{
    public function singleton()
    {
        super();
        return;
    }
}