package baidu.subway.symbol 
{
    import flash.display.*;
    
    public interface ISymbol
    {
        function draw():void;

        function changeShadow(arg1:Number=1):void;

        function drawResult(... rest):flash.display.DisplayObject;
    }
}
