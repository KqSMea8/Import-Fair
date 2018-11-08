$(function(){
    //数组中去重复的, 一个一个去除
    Array.prototype.distinct = function(){
     var arr = this,
      result = [],
      i,
      j,
      len = arr.length;
     for(i = 0; i < len; i++){
      for(j = i + 1; j < len; j++){
       if(arr[i] === arr[j]){
        j = ++i;
       }
      }
      result.push(arr[i]);
     }
     return result;
    }
    //var arra = [1,2,3,4,4,1,1,2,1,1,1];
    //arra.distinct();    //返回[3,4,2,1]


})


//通用Ajax请求
function commonAjax(url,dataStr,type,async,loadingId,callback,completeFun,errorFun){
     
        if(!type ||type =="" ||type ==null){type = 'POST';};
        if(!async ||async =="" ||async ==null){async = false;};
        var result = "";
        $.ajax({
                    url :eastcom.baseURL+url ,
                   // url :LSMConsts.G_URLCONFIG.baseUrl+url ,
                    type : type,
                    async : async,
                    dataType : "json",
                    contentType :"application/json",
                    data:JSON.stringify(dataStr),
                    success : function(data) {
                        result = data;
                        if (callback) {
                            callback(data);
                        };
                    },
                    complete: function(XMLHttpRequest, textStatus){
                          //HideLoading();
                          if(loadingId != ""){
                              $("#"+loadingId).unmask();
                          };
                          if (completeFun) {
                                completeFun(XMLHttpRequest, textStatus);
                          };
                    },
                    error: function(){
                          //请求出错处理
                          //eastcom.showMsg("danger","请求异常,数据加载失败!");
                          if (errorFun) {
                             errorFun();
                          }
                    }
            });
        return result;
};


function getCurrUserIphone(){
  //var phoneNum=$.cookie('accessTokenselfbusphone');
  phoneNum=CK_NUMBER ;
  //phoneNum='15021394296';   //写死 老大手机号
  return phoneNum
};

function getUserName(){

  return CK_NAME;
  //return "熊海芳";
  //return "陈良伟";
}

//当前周 向前推是第几周
function getlastNumWeek(currWeek,num){
  var res = "";
  var year = currWeek.toString().substring(0,4);
  var week = currWeek.toString().substring(4,6);

  if (week > num) {
    return currWeek - num;
  }else{
    var lastYear = year -1 ;
    var lastYearWeekNum = getNumOfWeeks(lastYear);

    var resY = lastYear;
    var resW = parseInt(week) + parseInt(lastYearWeekNum) - parseInt(num);

    return resY +""+ resW; 
  }


  function getNumOfWeeks(year) {
      var d = new Date(year, 0, 1);
      var yt = ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) ? 366 : 365;
      return Math.ceil((yt - d.getDay()) / 7.0);
  };

}
//当前周 向后推是第几周
function getnextNumWeek(currWeek,num){

  var res = "";
  var year = currWeek.toString().substring(0,4);
  var week = currWeek.toString().substring(4,6);
  
  var currYearWeekNum = getNumOfWeeks(year);
  
  var weektota =  parseInt(week) + parseInt(num);

  if (weektota > currYearWeekNum) {
    
    var nextYear = parseInt(year) + 1 ;
        //var nextYearWeekNum = getNumOfWeeks(nextYear);

        var resY = nextYear;
        var resW = parseInt(week) - parseInt(currYearWeekNum) + parseInt(num);

        return resY +""+ resW; 
    
    
    
  }else{
    return parseInt(currWeek) + parseInt(num);
  }


  function getNumOfWeeks(year) {
      var d = new Date(year, 0, 1);
      var yt = ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) ? 366 : 365;
      return Math.ceil((yt - d.getDay()) / 7.0);
  };

}


//记录日志方法
function addLog(scene_name,model_name,operate_type,operate_descr){
    var param = {
        "dbId":"ism",
            "tableName":"DM_NEI_ENT_LOG",
            "type":"insert",
            "data":{
                "oa_name":CK_OA_NAME,                          //"oa用户名",
                "user_name": getUserName(),                       //"姓名",
                "dept_name": CK_DEPARTMENT,                       //"部门名称",
                "phone_no": getCurrUserIphone(),                         //"手机号",
                "scene_name":scene_name,                        //"场景名称",
                "model_name": model_name,                       //"模块名称",
                "operate_type": operate_type,                       //"0|1|2|3",  // 1 查询 2 新增
                "operate_descr": operate_descr,                      //"具体操作：查询"
            }

    };
    function callback(){};
    var url = '/sml/update/insert';
    commonAjax(url, param, 'POST', true, '', callback);
};