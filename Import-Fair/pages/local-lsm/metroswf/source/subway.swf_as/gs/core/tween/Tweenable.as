package gs.core.tween 
{
    import gs.*;
    
    public class Tweenable extends Object
    {
        public function Tweenable(arg1:Number=0, arg2:Object=null)
        {
            super();
            this.vars = arg2 || {};
            var loc2:*;
            this.cachedTotalDuration = loc2 = arg1 || 0;
            this.cachedDuration = loc2;
            this._delay = this.vars.delay || 0;
            this.cachedTimeScale = this.vars.timeScale || 1;
            this.active = Boolean(arg1 == 0 && this._delay == 0 && !(this.vars.immediateRender == false));
            this.cachedTime = loc2 = 0;
            this.cachedTotalTime = loc2;
            this.data = this.vars.data;
            if (!_classInitted) 
            {
                if (isNaN(gs.TweenLite.rootFrame)) 
                {
                    gs.TweenLite.initClass();
                    _classInitted = true;
                }
                else 
                {
                    return;
                }
            }
            var loc1:*=this.vars.timeline is gs.core.tween.SimpleTimeline ? this.vars.timeline : this.vars.useFrames ? gs.TweenLite.rootFramesTimeline : gs.TweenLite.rootTimeline;
            this.startTime = loc1.cachedTotalTime + this._delay;
            loc1.addChild(this);
            return;
        }

        public function renderTime(arg1:Number, arg2:Boolean=false, arg3:Boolean=false):void
        {
            return;
        }

        public function complete(arg1:Boolean=false, arg2:Boolean=false):void
        {
            return;
        }

        public function setEnabled(arg1:Boolean, arg2:Boolean=false):void
        {
            if (arg1 == this.gc) 
            {
                this.gc = !arg1;
                if (arg1) 
                {
                    this.active = Boolean(!this.cachedPaused && this.cachedTotalTime > 0 && this.cachedTotalTime < this.cachedTotalDuration);
                    if (!arg2) 
                    {
                        this.timeline.addChild(this);
                    }
                }
                else 
                {
                    this.active = false;
                    if (!arg2) 
                    {
                        this.timeline.remove(this);
                    }
                }
            }
            return;
        }

        public function get delay():Number
        {
            return this._delay;
        }

        public function set delay(arg1:Number):void
        {
            this.startTime = this.startTime + (arg1 - this._delay);
            this._delay = arg1;
            return;
        }

        public function get duration():Number
        {
            return this.cachedDuration;
        }

        public function set duration(arg1:Number):void
        {
            var loc1:*;
            this.cachedTotalDuration = loc1 = arg1;
            this.cachedDuration = loc1;
            return;
        }

        public function get totalDuration():Number
        {
            return this.cachedTotalDuration;
        }

        public function set totalDuration(arg1:Number):void
        {
            this.duration = arg1;
            return;
        }

        public static const version:Number=0.67;

        protected var _delay:Number;

        protected var _hasUpdate:Boolean;

        public var vars:Object;

        public var startTime:Number;

        public var active:Boolean;

        public var gc:Boolean;

        public var initted:Boolean;

        public var timeline:gs.core.tween.SimpleTimeline;

        public var cachedTime:Number;

        public var cachedTotalTime:Number;

        public var cachedDuration:Number;

        public var cachedTotalDuration:Number;

        public var cachedTimeScale:Number;

        public var cachedReversed:Boolean;

        public var nextNode:gs.core.tween.Tweenable;

        public var prevNode:gs.core.tween.Tweenable;

        public var cacheIsDirty:Boolean;

        public var cachedPaused:Boolean;

        public var data:*;

        protected static var _classInitted:Boolean;
    }
}
