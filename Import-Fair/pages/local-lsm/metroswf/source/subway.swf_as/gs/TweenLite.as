package gs 
{
    import flash.display.*;
    import flash.events.*;
    import flash.utils.*;
    import gs.core.tween.*;
    import gs.plugins.*;
    
    public class TweenLite extends gs.core.tween.Tweenable
    {
        public function TweenLite(arg1:Object, arg2:Number, arg3:Object)
        {
            var loc1:*=0;
            var loc2:*=null;
            var loc3:*=null;
            super(arg2, arg3);
            this.ease = typeof this.vars.ease == "function" ? this.vars.ease : defaultEase;
            this.target = arg1;
            if (this.vars.easeParams != null) 
            {
                this.vars.proxiedEase = this.ease;
                this.ease = this.easeProxy;
            }
            this.propTweenLookup = {};
            if (!(arg1 in masterList)) 
            {
                masterList[arg1] = [this];
            }
            else 
            {
                loc1 = arg3.overwrite == undefined || !overwriteManager.enabled && arg3.overwrite > 1 ? overwriteManager.mode : int(arg3.overwrite);
                if (loc1 != 1) 
                {
                    masterList[arg1].push(this);
                }
                else 
                {
                    loc2 = masterList[arg1];
                    var loc4:*=0;
                    var loc5:*=loc2;
                    for each (loc3 in loc5) 
                    {
                        if (!!loc3.gc) 
                        {
                            continue;
                        }
                        loc3.setEnabled(false, false);
                    }
                    masterList[arg1] = [this];
                }
            }
            if (this.active || this.vars.immediateRender) 
            {
                this.renderTime(0, false, true);
            }
            return;
        }

        
        {
            plugins = {};
            killDelayedCallsTo = TweenLite.killTweensOf;
            defaultEase = TweenLite.easeOut;
            masterList = new flash.utils.Dictionary(false);
            timingSprite = new flash.display.Sprite();
            _reservedProps = {"ease":1, "delay":1, "overwrite":1, "onComplete":1, "onCompleteParams":1, "useFrames":1, "runBackwards":1, "startAt":1, "onUpdate":1, "onUpdateParams":1, "roundProps":1, "onStart":1, "onStartParams":1, "onReverseComplete":1, "onReverseCompleteParams":1, "onRepeat":1, "onRepeatParams":1, "proxiedEase":1, "easeParams":1, "yoyo":1, "onCompleteListener":1, "onUpdateListener":1, "onStartListener":1, "orientToBezier":1, "timeScale":1, "immediateRender":1, "repeat":1, "repeatDelay":1, "timeline":1, "data":1};
        }

        public static function to(arg1:Object, arg2:Number, arg3:Object):gs.TweenLite
        {
            return new TweenLite(arg1, arg2, arg3);
        }

        public static function from(arg1:Object, arg2:Number, arg3:Object):gs.TweenLite
        {
            arg3.runBackwards = true;
            if (arg3.immediateRender != false) 
            {
                arg3.immediateRender = true;
            }
            return new TweenLite(arg1, arg2, arg3);
        }

        public static function delayedCall(arg1:Number, arg2:Function, arg3:Array=null, arg4:Boolean=false):gs.TweenLite
        {
            return new TweenLite(arg2, 0, {"delay":arg1, "onComplete":arg2, "onCompleteParams":arg3, "immediateRender":false, "useFrames":arg4, "overwrite":0});
        }

        protected static function updateAll(arg1:flash.events.Event=null):void
        {
            var loc1:*=null;
            var loc2:*=null;
            var loc3:*=null;
            var loc4:*=0;
            rootTimeline.renderTime((flash.utils.getTimer() * 0.001 - rootTimeline.startTime) * rootTimeline.cachedTimeScale, false, false);
            var loc5:*;
            rootFrame++;
            rootFramesTimeline.renderTime((rootFrame - rootFramesTimeline.startTime) * rootFramesTimeline.cachedTimeScale, false, false);
            if (!(rootFrame % 60)) 
            {
                loc1 = masterList;
                loc5 = 0;
                loc6 = loc1;
                for (loc2 in loc6) 
                {
                    loc3 = loc1[loc2];
                    loc4 = loc3.length;
                    while (loc4-- > 0) 
                    {
                        if (!loc3[loc4].gc) 
                        {
                            continue;
                        }
                        loc3.splice(loc4, 1);
                    }
                    if (loc3.length != 0) 
                    {
                        continue;
                    }
                    delete loc1[loc2];
                }
            }
            return;
        }

        public static function removeTween(arg1:gs.TweenLite):void
        {
            if (arg1 != null) 
            {
                arg1.setEnabled(false, false);
            }
            return;
        }

        public static function killTweensOf(arg1:Object, arg2:Boolean=false):void
        {
            var loc1:*=null;
            var loc2:*=0;
            if (!(arg1 == null) && arg1 in masterList) 
            {
                loc1 = masterList[arg1];
                loc2 = loc1.length;
                while (loc2-- > 0) 
                {
                    if (!!loc1[loc2].gc) 
                    {
                        continue;
                    }
                    if (arg2) 
                    {
                        loc1[loc2].complete(false, false);
                        continue;
                    }
                    loc1[loc2].setEnabled(false, false);
                }
                delete masterList[arg1];
            }
            return;
        }

        protected function init():void
        {
            var loc1:*=null;
            var loc2:*=0;
            var loc3:*=undefined;
            var loc4:*=false;
            var loc6:*=null;
            var loc5:*=this.vars.isTV != true ? this.vars : this.vars.exposedVars;
            this.propTweenLookup = {};
            if (!(loc5.timeScale == undefined) && this.target is gs.core.tween.Tweenable) 
            {
                this._firstPropTween = this.insertPropTween(this.target, "timeScale", this.target.timeScale, loc5.timeScale, "timeScale", false, this._firstPropTween);
            }
            var loc7:*=0;
            var loc8:*=loc5;
            for (loc1 in loc8) 
            {
                if (loc1 in _reservedProps) 
                {
                    continue;
                }
                if (loc1 in plugins) 
                {
                    loc3 = new plugins[loc1]();
                    if (loc3.onInitTween(this.target, loc5[loc1], this) != false) 
                    {
                        this._firstPropTween = this.insertPropTween(loc3, "changeFactor", 0, 1, loc3.overwriteProps.length != 1 ? "_MULTIPLE_" : loc3.overwriteProps[0], true, this._firstPropTween);
                        this._hasPlugins = true;
                        if (loc3.priority != 0) 
                        {
                            this._firstPropTween.priority = loc3.priority;
                            loc4 = true;
                        }
                        if (!(loc3.onDisable == null) || !(loc3.onEnable == null)) 
                        {
                            this._notifyPluginsOfEnabled = true;
                        }
                    }
                    else 
                    {
                        this._firstPropTween = this.insertPropTween(this.target, loc1, this.target[loc1], loc5[loc1], loc1, false, this._firstPropTween);
                    }
                    continue;
                }
                this._firstPropTween = this.insertPropTween(this.target, loc1, this.target[loc1], loc5[loc1], loc1, false, this._firstPropTween);
            }
            if (loc4) 
            {
                this._firstPropTween = onPluginEvent("onInit", this._firstPropTween);
            }
            if (this.vars.runBackwards == true) 
            {
                loc6 = this._firstPropTween;
                while (loc6 != null) 
                {
                    loc6.start = loc6.start + loc6.change;
                    loc6.change = -loc6.change;
                    loc6 = loc6.nextNode;
                }
            }
            _hasUpdate = Boolean(!(this.vars.onUpdate == null));
            if (this._overwrittenProps != null) 
            {
                this.killVars(this._overwrittenProps);
            }
            if (gs.TweenLite.overwriteManager.enabled && !(this._firstPropTween == null) && gs.TweenLite.overwriteManager.mode > 1 && this.target in masterList) 
            {
                overwriteManager.manageOverwrites(this, this.propTweenLookup, masterList[this.target]);
            }
            this.initted = true;
            return;
        }

        protected function insertPropTween(arg1:Object, arg2:String, arg3:Number, arg4:*, arg5:String, arg6:Boolean, arg7:gs.core.tween.PropTween):gs.core.tween.PropTween
        {
            var loc2:*=null;
            var loc3:*=0;
            var loc1:*=new gs.core.tween.PropTween(arg1, arg2, arg3, typeof arg4 != "number" ? Number(arg4) : arg4 - arg3, arg5, arg6, arg7);
            if (arg7 != null) 
            {
                arg7.prevNode = loc1;
            }
            if (arg6 && arg5 == "_MULTIPLE_") 
            {
                loc2 = arg1.overwriteProps;
                loc3 = loc2.length - 1;
                while (loc3 > -1) 
                {
                    this.propTweenLookup[loc2[loc3]] = loc1;
                    --loc3;
                }
            }
            else 
            {
                this.propTweenLookup[arg5] = loc1;
            }
            return loc1;
        }

        public override function renderTime(arg1:Number, arg2:Boolean=false, arg3:Boolean=false):void
        {
            var loc1:*=NaN;
            var loc2:*=false;
            var loc3:*=this.cachedTime;
            this.active = true;
            if (arg1 >= this.cachedDuration) 
            {
                var loc5:*;
                this.cachedTime = loc5 = this.cachedDuration;
                this.cachedTotalTime = loc5;
                loc1 = 1;
                loc2 = true;
            }
            else if (arg1 <= 0) 
            {
                loc1 = loc5 = 0;
                this.cachedTime = loc5 = loc5;
                this.cachedTotalTime = loc5;
                if (arg1 < 0) 
                {
                    this.active = false;
                }
            }
            else 
            {
                this.cachedTime = loc5 = arg1;
                this.cachedTotalTime = loc5;
                loc1 = this.ease(arg1, 0, 1, this.cachedDuration);
            }
            if (this.cachedTime == loc3 && !arg3) 
            {
                return;
            }
            if (!this.initted) 
            {
                this.init();
                if (!(this.vars.onStart == null) && !arg2) 
                {
                    this.vars.onStart.apply(null, this.vars.onStartParams);
                }
            }
            var loc4:*=this._firstPropTween;
            while (loc4 != null) 
            {
                loc4.target[loc4.property] = loc4.start + loc1 * loc4.change;
                loc4 = loc4.nextNode;
            }
            if (_hasUpdate && !arg2) 
            {
                this.vars.onUpdate.apply(null, this.vars.onUpdateParams);
            }
            if (loc2) 
            {
                this.complete(true, arg2);
            }
            return;
        }

        public override function complete(arg1:Boolean=false, arg2:Boolean=false):void
        {
            if (!arg1) 
            {
                this.renderTime(this.cachedTotalDuration, arg2, Boolean(this.cachedDuration == 0));
                return;
            }
            if (this._hasPlugins) 
            {
                onPluginEvent("onComplete", this._firstPropTween);
            }
            if (this.timeline.autoRemoveChildren) 
            {
                this.setEnabled(false, false);
            }
            else 
            {
                this.active = false;
            }
            if (!(this.vars.onComplete == null) && (!(this.cachedTotalTime == 0) || this.cachedDuration == 0) && !arg2) 
            {
                this.vars.onComplete.apply(null, this.vars.onCompleteParams);
            }
            return;
        }

        public function killVars(arg1:Object, arg2:Boolean=true):void
        {
            var loc1:*=null;
            var loc2:*=null;
            if (this._overwrittenProps == null) 
            {
                this._overwrittenProps = {};
            }
            var loc3:*=0;
            var loc4:*=arg1;
            for (loc1 in loc4) 
            {
                if (loc1 in this.propTweenLookup) 
                {
                    loc2 = this.propTweenLookup[loc1];
                    if (loc2.isPlugin && loc2.name == "_MULTIPLE_") 
                    {
                        loc2.target.killProps(arg1);
                        if (loc2.target.overwriteProps.length == 0) 
                        {
                            this.removePropTween(loc2);
                            delete this.propTweenLookup[loc1];
                        }
                    }
                    else 
                    {
                        this.removePropTween(loc2);
                        delete this.propTweenLookup[loc1];
                    }
                }
                if (!arg2) 
                {
                    continue;
                }
                this._overwrittenProps[loc1] = 1;
            }
            return;
        }

        protected function removePropTween(arg1:gs.core.tween.PropTween):void
        {
            if (arg1.isPlugin && !(arg1.target.onDisable == null)) 
            {
                arg1.target.onDisable();
            }
            if (arg1.nextNode != null) 
            {
                arg1.nextNode.prevNode = arg1.prevNode;
            }
            if (arg1.prevNode == null) 
            {
                if (this._firstPropTween == arg1) 
                {
                    this._firstPropTween = arg1.nextNode;
                }
            }
            else 
            {
                arg1.prevNode.nextNode = arg1.nextNode;
            }
            return;
        }

        public override function setEnabled(arg1:Boolean, arg2:Boolean=false):void
        {
            if (arg1 == this.gc) 
            {
                if (arg1) 
                {
                    if (!(this.target in gs.TweenLite.masterList)) 
                    {
                        gs.TweenLite.masterList[this.target] = [this];
                    }
                    else 
                    {
                        gs.TweenLite.masterList[this.target].push(this);
                    }
                }
                super.setEnabled(arg1, arg2);
                if (this._notifyPluginsOfEnabled) 
                {
                    onPluginEvent(arg1 ? "onEnable" : "onDisable", this._firstPropTween);
                }
            }
            return;
        }

        protected function easeProxy(arg1:Number, arg2:Number, arg3:Number, arg4:Number):Number
        {
            return this.vars.proxiedEase.apply(null, arguments.concat(this.vars.easeParams));
        }

        public static function initClass():void
        {
            rootFrame = 0;
            rootTimeline = new gs.core.tween.SimpleTimeline(null);
            rootFramesTimeline = new gs.core.tween.SimpleTimeline(null);
            rootTimeline.startTime = flash.utils.getTimer() * 0.001;
            rootFramesTimeline.startTime = rootFrame;
            var loc1:*;
            rootFramesTimeline.autoRemoveChildren = loc1 = true;
            rootTimeline.autoRemoveChildren = loc1;
            timingSprite.addEventListener(flash.events.Event.ENTER_FRAME, updateAll, false, 0, true);
            if (overwriteManager == null) 
            {
                overwriteManager = {"mode":1, "enabled":false};
            }
            return;
        }

        protected static function easeOut(arg1:Number, arg2:Number, arg3:Number, arg4:Number):Number
        {
            var loc1:*;
            arg1 = loc1 = arg1 / arg4;
            return (-arg3) * loc1 * (arg1 - 2) + arg2;
        }

        public static const version:Number=11.0989;

        public var target:Object;

        public var ease:Function;

        public var propTweenLookup:Object;

        protected var _firstPropTween:gs.core.tween.PropTween;

        protected var _overwrittenProps:Object;

        protected var _hasPlugins:Boolean;

        protected var _notifyPluginsOfEnabled:Boolean;

        public static var masterList:flash.utils.Dictionary;

        public static var timingSprite:flash.display.Sprite;

        protected static var _reservedProps:Object;

        public static var onPluginEvent:Function;

        public static var killDelayedCallsTo:Function;

        public static var defaultEase:Function;

        public static var overwriteManager:Object;

        public static var rootFrame:Number;

        public static var rootTimeline:gs.core.tween.SimpleTimeline;

        public static var rootFramesTimeline:gs.core.tween.SimpleTimeline;

        public static var plugins:Object;
    }
}
