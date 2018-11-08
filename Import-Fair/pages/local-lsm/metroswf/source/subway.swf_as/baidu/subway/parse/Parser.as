package baidu.subway.parse 
{
    import baidu.subway.vo.*;
    
    public class Parser extends Object
    {
        public function Parser()
        {
            super();
            return;
        }

        public function parse(arg1:*):void
        {
            trace("abs class do nothing");
            return;
        }

        public function get swVO():baidu.subway.vo.SubwayVO
        {
            return this._swVO;
        }

        protected var _swVO:baidu.subway.vo.SubwayVO;
    }
}
