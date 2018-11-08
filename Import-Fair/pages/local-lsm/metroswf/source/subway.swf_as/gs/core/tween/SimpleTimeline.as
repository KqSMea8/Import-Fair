package gs.core.tween 
{
    public class SimpleTimeline extends gs.core.tween.Tweenable
    {
        public function SimpleTimeline(arg1:Object=null)
        {
            super(0, arg1);
            return;
        }

        public function addChild(arg1:gs.core.tween.Tweenable):void
        {
            if (!(arg1.timeline == null) && !arg1.gc) 
            {
                arg1.timeline.remove(arg1, true);
            }
            arg1.timeline = this;
            if (arg1.gc) 
            {
                arg1.setEnabled(true, true);
            }
            if (this._firstChild == null) 
            {
                arg1.nextNode = null;
            }
            else 
            {
                this._firstChild.prevNode = arg1;
                arg1.nextNode = this._firstChild;
            }
            this._firstChild = arg1;
            arg1.prevNode = null;
            return;
        }

        public function remove(arg1:gs.core.tween.Tweenable, arg2:Boolean=false):void
        {
            if (!arg1.gc && !arg2) 
            {
                arg1.setEnabled(false, true);
            }
            if (arg1.nextNode == null) 
            {
                if (this._lastChild == arg1) 
                {
                    this._lastChild = arg1.prevNode;
                }
            }
            else 
            {
                arg1.nextNode.prevNode = arg1.prevNode;
            }
            if (arg1.prevNode == null) 
            {
                if (this._firstChild == arg1) 
                {
                    this._firstChild = arg1.nextNode;
                }
            }
            else 
            {
                arg1.prevNode.nextNode = arg1.nextNode;
            }
            var loc1:*;
            arg1.prevNode = loc1 = null;
            arg1.nextNode = loc1;
            return;
        }

        public override function renderTime(arg1:Number, arg2:Boolean=false, arg3:Boolean=false):void
        {
            var loc3:*=NaN;
            var loc4:*=null;
            var loc1:*=this._firstChild;
            var loc2:*=this.cachedTime;
            var loc5:*;
            this.cachedTime = loc5 = arg1;
            this.cachedTotalTime = loc5;
            while (loc1 != null) 
            {
                loc4 = loc1.nextNode;
                if (loc1.active || arg1 >= loc1.startTime && !loc1.cachedPaused && !(loc1.cachedDuration == 0)) 
                {
                    if (!loc1.cachedReversed) 
                    {
                        loc1.renderTime((arg1 - loc1.startTime) * loc1.cachedTimeScale, arg2, false);
                    }
                    else 
                    {
                        loc3 = loc1.cacheIsDirty ? loc1.totalDuration : loc1.cachedTotalDuration;
                        loc1.renderTime(loc3 - (arg1 - loc1.startTime) * loc1.cachedTimeScale, arg2, false);
                    }
                }
                else if (loc1.cachedDuration == 0 && !loc1.cachedPaused && loc1.startTime > loc2 && loc1.startTime <= arg1) 
                {
                    loc1.renderTime(0, arg2, true);
                }
                loc1 = loc4;
            }
            return;
        }

        public function get rawTime():Number
        {
            return this.cachedTotalTime;
        }

        protected var _firstChild:gs.core.tween.Tweenable;

        protected var _lastChild:gs.core.tween.Tweenable;

        public var autoRemoveChildren:Boolean;
    }
}
