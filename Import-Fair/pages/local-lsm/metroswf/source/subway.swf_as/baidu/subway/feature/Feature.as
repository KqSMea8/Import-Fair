package baidu.subway.feature 
{
    import baidu.subway.mark.*;
    import baidu.subway.symbol.*;
    import flash.display.*;
    
    public class Feature extends flash.display.Sprite
    {
        public function Feature()
        {
            super();
            return;
        }

        public function draw():void
        {
            trace("abs class do nothing");
            return;
        }

        public function changeShadow(arg1:Number):void
        {
            trace("abs class do nothing");
            return;
        }

        public function changeLabel(arg1:Number):void
        {
            trace("abs class do nothing");
            return;
        }

        protected var _mark:baidu.subway.mark.Mark;

        protected var _symbol:baidu.subway.symbol.ISymbol;
    }
}
