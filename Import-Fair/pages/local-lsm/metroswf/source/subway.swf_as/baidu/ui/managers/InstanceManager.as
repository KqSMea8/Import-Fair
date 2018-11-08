package baidu.ui.managers 
{
    import flash.system.*;
    import flash.utils.*;
    
    public class InstanceManager extends Object
    {
        public function InstanceManager()
        {
            super();
            return;
        }

        public static function createInstance(arg1:*):*
        {
            if (arg1 is String) 
            {
                arg1 = getClass(arg1);
            }
            if (arg1 is Class) 
            {
                return new arg1();
            }
            return arg1;
        }

        public static function createSingletonInstance(arg1:*):*
        {
            return createUniqueInstance(arg1, "singleton");
        }

        public static function createUniqueInstance(arg1:*, arg2:*):*
        {
            if (arg1 is String) 
            {
                arg1 = getClass(arg1);
            }
            if (arg1 is Class) 
            {
                if (instances[arg1] == null) 
                {
                    instances[arg1] = new flash.utils.Dictionary();
                }
                if (instances[arg1][arg2] == null) 
                {
                    instances[arg1][arg2] = createInstance(arg1);
                }
                return instances[arg1][arg2];
            }
            return arg1;
        }

        public static function getClass(arg1:String):Class
        {
            return flash.system.ApplicationDomain.currentDomain.getDefinition(arg1) as Class;
        }

        
        {
            instances = new flash.utils.Dictionary();
        }

        private static var instances:flash.utils.Dictionary;
    }
}
