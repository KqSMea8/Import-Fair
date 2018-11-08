package baidu.subway.feature 
{
    import baidu.subway.event.*;
    import baidu.subway.mark.*;
    import baidu.subway.symbol.line.*;
    import baidu.subway.vo.*;
    import flash.display.*;
    import flash.events.*;
    
    public class Line extends baidu.subway.feature.Feature
    {
        public function Line(arg1:baidu.subway.vo.LineVO)
        {
            super();
            this._lineVO = arg1;
            _mark = new baidu.subway.mark.LineMark(this._lineVO.lb, this._lineVO.lbx, this._lineVO.lby, this._lineVO.lbr, this._lineVO.lc);
            addChild(_mark);
            this._shp = new flash.display.Sprite();
            addChild(this.shp);
            if (this._lineVO.lb.indexOf("机场专线") == -1) 
            {
                if (this._lineVO.lb.indexOf("东铁线") == -1) 
                {
                    _symbol = new baidu.subway.symbol.line.LineSymbol(this.shp, this._lineVO.lc, this._lineVO.loop, this._lineVO.stations);
                }
                else 
                {
                    _symbol = new baidu.subway.symbol.line.HKDongTieLineSymbol(this.shp, this._lineVO.lc, this._lineVO.loop, this._lineVO.stations);
                }
            }
            else 
            {
                _symbol = new baidu.subway.symbol.line.BJAirPortLineSymbol(this.shp, this._lineVO.lc, this._lineVO.loop, this._lineVO.stations);
            }
            this.shp.addEventListener(flash.events.MouseEvent.ROLL_OVER, this.onLineEvent);
            this.shp.addEventListener(flash.events.MouseEvent.ROLL_OUT, this.onLineEvent);
            this.shp.addEventListener(flash.events.MouseEvent.CLICK, this.onLineEvent);
            return;
        }

        public function get lineVO():baidu.subway.vo.LineVO
        {
            return this._lineVO;
        }

        public function get shp():flash.display.Sprite
        {
            return this._shp;
        }

        public override function draw():void
        {
            _mark.draw();
            _symbol.draw();
            return;
        }

        public override function changeShadow(arg1:Number):void
        {
            _symbol.changeShadow(arg1);
            return;
        }

        public override function changeLabel(arg1:Number):void
        {
            _mark.changeLabel(arg1);
            return;
        }

        public function drawResult(arg1:String, arg2:String, arg3:String, arg4:String):flash.display.DisplayObject
        {
            var loc1:*=_symbol.drawResult(arg1, arg2, arg3, arg4);
            return loc1;
        }

        private function onLineEvent(arg1:flash.events.MouseEvent):void
        {
            var loc1:*=null;
            if (arg1.type != flash.events.MouseEvent.ROLL_OVER) 
            {
                if (arg1.type != flash.events.MouseEvent.ROLL_OUT) 
                {
                    if (arg1.type == flash.events.MouseEvent.CLICK) 
                    {
                        loc1 = new baidu.subway.event.SubwayEvent(baidu.subway.event.SubwayEvent.LINE_CLICK);
                    }
                }
                else 
                {
                    loc1 = new baidu.subway.event.SubwayEvent(baidu.subway.event.SubwayEvent.LINE_OUT);
                }
            }
            else 
            {
                loc1 = new baidu.subway.event.SubwayEvent(baidu.subway.event.SubwayEvent.LINE_OVER);
            }
            dispatchEvent(loc1);
            return;
        }

        private var _lineVO:baidu.subway.vo.LineVO;

        private var _shp:flash.display.Sprite;
    }
}
