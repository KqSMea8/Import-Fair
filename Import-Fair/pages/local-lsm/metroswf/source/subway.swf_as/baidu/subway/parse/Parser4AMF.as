package baidu.subway.parse 
{
    import flash.utils.*;
    
    public class Parser4AMF extends baidu.subway.parse.Parser
    {
        public function Parser4AMF()
        {
            super();
            return;
        }

        public override function parse(arg1:*):void
        {
            if (arg1 is flash.utils.ByteArray) 
            {
                this._bytes = arg1;
                this._bytes.position = 0;
            }
            else 
            {
                trace("INVALID DATA TYPE!");
            }
            return;
        }

        private var _bytes:flash.utils.ByteArray;
    }
}
