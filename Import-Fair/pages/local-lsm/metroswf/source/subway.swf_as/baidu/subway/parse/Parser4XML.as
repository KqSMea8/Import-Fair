package baidu.subway.parse 
{
    import baidu.subway.feature.*;
    import baidu.subway.vo.*;
    
    public class Parser4XML extends baidu.subway.parse.Parser
    {
        public function Parser4XML()
        {
            super();
            return;
        }

        public override function parse(arg1:*):void
        {
            var loc1:*=null;
            var loc2:*=null;
            var loc3:*=0;
            var loc4:*=0;
            var loc5:*=null;
            var loc6:*=null;
            var loc7:*=null;
            var loc8:*=0;
            var loc9:*=0;
            var loc10:*=null;
            if (arg1 is String) 
            {
                this._sw = new XMLList(arg1);
                _swVO = new baidu.subway.vo.SubwayVO();
                _swVO.cid = this._sw.@cid;
                _swVO.n = this._sw.@n;
                _swVO.c = this._sw.@c;
                _swVO.src = this._sw.@src;
                _swVO.bg = this._sw.@bg;
                _swVO.icon = this._sw.@icon;
                loc2 = [];
                loc3 = 0;
                loc4 = this._sw.l.length();
                while (loc3 < loc4) 
                {
                    loc1 = this._sw.l[loc3];
                    loc5 = new baidu.subway.vo.LineVO();
                    loc5.lid = _swVO.cid + "|" + loc1.@lid;
                    loc5.lb = loc1.@lb;
                    loc5.slb = loc1.@slb;
                    loc5.n = loc1.@n;
                    loc5.loop = loc1.@loop == "true";
                    loc5.lbx = loc1.@lbx;
                    loc5.lby = loc1.@lby;
                    loc5.lbr = loc1.@lbr;
                    loc5.lc = loc1.@lc;
                    loc7 = [];
                    loc8 = 0;
                    loc9 = loc1.p.length();
					
					var stationNameMap:Object={};
                    while (loc8 < loc9) 
                    {
                        loc6 = loc1.p[loc8];
                        loc10 = new baidu.subway.vo.StationVO();
                        loc10.sid = loc5.lid + "|" + loc6.@sid;
                        loc10.lb = loc6.@lb;
                        loc10.x = loc6.@x;
                        loc10.y = loc6.@y;
                        loc10.rx = loc6.@rx;
                        loc10.ry = loc6.@ry;
                        loc10.st = loc6.@st == "true";
                        loc10.ex = loc6.@ex == "true";
                        loc10.iu = loc6.@iu == "true";
                        loc10.rc = loc6.@rc == "true";
                        loc10.slb = loc6.@slb == "true";
                        loc10.checkiu = loc6.@checkiu != "false" ? 0 : 1;
                        loc10.ln = loc6.@ln;
                        loc10.interval = loc6.@int;
                        loc10.icon = loc6.@icon ? loc6.@icon : "";
                        loc10.dx = loc6.@dx == 0 ? 0 : loc6.@dx;
                        loc10.dy = loc6.@dy == 0 ? 0 : loc6.@dy;
                        loc10.color = loc5.lc;
                        loc7.push(new baidu.subway.feature.Station(loc10));
						
						/*var next;
						var last;
						var nextLb:String="";
						var lastLb:String="";
						var currentLb:String=loc10.lb;
						if(loc8==0){
							next=loc1.p[loc8+1];
							nextLb=next.@lb;
							if(Main.stationTypeMap[nextLb]!="4g"){
								Main.stationContinuityMap[currentLb]=false;
							}else{
								if(Main.stationContinuityMap[currentLb]==null) Main.stationContinuityMap[currentLb]=true;
							}
						}else if(loc8==loc9-1){
							last=loc1.p[loc8-1];
							lastLb=last.@lb;
							if(Main.stationTypeMap[lastLb]!="4g"){
								Main.stationContinuityMap[currentLb]=false;
							}else{
								if(Main.stationContinuityMap[currentLb]==null) Main.stationContinuityMap[currentLb]=true;
							}
						}else{
							next=loc1.p[loc8+1];
							last=loc1.p[loc8-1];
							
							nextLb=next.@lb;
							lastLb=last.@lb;
							if(stationNameMap[nextLb]==true){//分支线终点
								if(Main.stationTypeMap[lastLb]!="4g"){
									Main.stationContinuityMap[currentLb]=false;
								}else{
									if(Main.stationContinuityMap[currentLb]==null) Main.stationContinuityMap[currentLb]=true;
								}
							}else if(stationNameMap[currentLb]==true){//分支点
								if(Main.stationTypeMap[nextLb]!="4g"){
									Main.stationContinuityMap[currentLb]=false;
								}
							}else{
								if(Main.stationTypeMap[nextLb]!="4g"||Main.stationTypeMap[lastLb]!="4g"){
									Main.stationContinuityMap[currentLb]=false;
								}else{
									if(Main.stationContinuityMap[currentLb]==null) Main.stationContinuityMap[currentLb]=true;
								}
							}
							
						}
						stationNameMap[currentLb]=true;*/
						
						
                        ++loc8;
                    }
                    loc5.stations = loc7;
                    loc2.push(new baidu.subway.feature.Line(loc5));
                    ++loc3;
                }
                _swVO.lines = loc2;
            }
            else 
            {
                trace("INVALID DATA TYPE!");
            }
            return;
        }

        private var _sw:XMLList;
    }
}
