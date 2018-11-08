package baidu.subway.event 
{
    import flash.events.*;
    
    public class SubwayEvent extends flash.events.Event
    {
        public function SubwayEvent(arg1:String, arg2:Boolean=false, arg3:Boolean=false)
        {
            super(arg1, arg2, arg3);
            return;
        }

        public static const DM_DATA_COMPLETE:String="DataManagerDataComplete";

        public static const DM_DATA_ERROR:String="DataManagerDataError";

        public static const DH_LAYER_MOVE:String="DragHandlerLayerMove";

        public static const DH_LAYER_UP:String="DragHandlerLayerUp";

        public static const KH_LAYER_MOVE:String="KeyHandlerLayerMove";

        public static const KH_SCALE_CHANGE:String="KeyHandlerScaleChange";

        public static const SH_SET_START:String="SearchHandlerSetStart";

        public static const SH_SET_END:String="SearchHandlerSetEnd";

        public static const SB_SCALE_CHANGE:String="ScaleBarScaleChange";

        public static const STATION_OVER:String="StationOver";

        public static const STATION_OUT:String="StationOut";

        public static const STATION_CLICK:String="StationClick";

        public static const LINE_OVER:String="LineOver";

        public static const LINE_OUT:String="LineOut";

        public static const LINE_CLICK:String="LineClick";

        public static const START_TIP_DRAGED:String="START_TIP_DRAGED";

        public static const END_TIP_DRAGED:String="END_TIP_DRAGED";

        public static const INFO_CLEAR_RESULT:String="InfoClearResult";

        public var data:*;
    }
}
