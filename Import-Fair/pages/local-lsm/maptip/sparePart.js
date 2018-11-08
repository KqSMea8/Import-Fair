var sparePart = {
    cacheData:null,
    init:function(){
        sparePart.intEvent();
        sparePart.loadsparePartInfoTongji();
        sparePart.loadsparePartInfo();

    },
    intEvent:function(){
        $("span[name='tongjiAndmingxi']").on('click', function(event) {
            event.preventDefault();
            var id = $(this).attr('id');

            $("span[name='tongjiAndmingxi']").removeClass('getSelectgsearwga');
            $(this).addClass('getSelectgsearwga');


            $('.jyuhgtrefd').css('display', 'none');
            $("#"+id+"Div").css('display', 'block');
            if (id == "mingxi") {
                sparePart.loadsparePartInfo();
            }
        });
    },
    loadsparePartInfoTongji:function(){
        $("#commonAddressCellTbody_tongji").empty();

        var url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-rm-spareparts-st';
        $.ajax({
            url: url,
            type: 'get',         //数据发送方式
            dataType: 'json',     //接受数据格式
            //contentType: "application/json",
            //accessType: "application/json",
            //timeout:5000,
            data:{},
            beforeSend: function(XMLHttpRequest){
            },
            complete: function(XMLHttpRequest,textStatus){
            }
        }).done(function(result){
            //console.log(result) 
            var data = result.data;

            var htmlStr = '';
            for (var i = 0; i < data.length; i++) {
                var currObj = data[i];
                htmlStr += '<tr>'
                        +       '<td class="">'+currObj.s_source+'</td>'
                        +       '<td class="ciiekpistyle" style="cursor:pointer;text-decoration:underline" onclick="sparePart.drillToDetail(\''+currObj.s_source+'\')">'+currObj.total+'</td>'
                        +   '</tr>'
            }
            $("#commonAddressCellTbody_tongji").html(htmlStr); 


            // for (var i = 0; i < 20; i++) {
            //     htmlStr += '<tr>'
            //             +       '<td class="">所在仓库_'+i+'</td>'
            //             +       '<td class="ciiekpistyle">1</td>'
            //             +   '</tr>'
            // };   
            
            


        });



    },
    drillToDetail:function(s_source_param){
        $("#commonAddressCellTbody").empty();
        $("span[name='tongjiAndmingxi']").removeClass('getSelectgsearwga');
        $("#mingxi").addClass('getSelectgsearwga');
        $('.jyuhgtrefd').css('display', 'none');
        $("#mingxiDiv").css('display', 'block');
        var htmlStr = '';

        var data = sparePart.cacheData;
        for (var i = 0; i < data.length; i++) {
            var currObj = data[i];

           var s_name = currObj.s_name==null?"-":currObj.s_name;
           var vendor = currObj.vendor==null?"-":currObj.vendor;
           var device_type = currObj.device_type==null?"-":currObj.device_type;
           var device_model = currObj.device_model==null?"-":currObj.device_model;
           var s_grid = currObj.s_grid==null?"-":currObj.s_grid;
           var s_source = currObj.s_source==null?"-":currObj.s_source;
           var call_status = currObj.call_status==null?"-":currObj.call_status;


           if (s_source_param == s_source ) {
               htmlStr += '<tr>'
                    +       '<td>'+s_name+'</td>'
                    +       '<td class="ciiekpistyle">'+vendor+'</td>'
                    +       '<td class="ciiekpistyle">'+device_type+'</td>'
                    +       '<td class="ciiekpistyle">'+device_model+'</td>'
                    +       '<td class="ciiekpistyle">'+s_grid+'</td>'
                    +       '<td class="ciiekpistyle">'+s_source+'</td>'
                    +       '<td class="ciiekpistyle">'+call_status+'</td>'
                    +   '</tr>'
           }
        }
        $("#commonAddressCellTbody").html(htmlStr); 


    },
    loadsparePartInfo:function(){
        $("#commonAddressCellTbody").empty();

        var url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-rm-spareparts';
        $.ajax({
            url: url,
            type: 'get',         //数据发送方式
            dataType: 'json',     //接受数据格式
            //contentType: "application/json",
            //accessType: "application/json",
            //timeout:5000,
            data:{},
            beforeSend: function(XMLHttpRequest){
            },
            complete: function(XMLHttpRequest,textStatus){
            }
        }).done(function(result){
            //console.log(result) 
            var data = result.data;

            sparePart.cacheData = data;

            var htmlStr = '';
            for (var i = 0; i < data.length; i++) {
                var currObj = data[i];

                /*

                "id": "-2128199204",
                            "s_code": "FSMF_01",
                            "s_name": "FSMF",
                            "vendor": "诺基亚",
                            "device_type": null,
                            "device_model": "084792A",
                            "s_grid": "青浦",
                            "s_source": "中国上海国家会展中心A0机房综合",
                            "insert_time": 1539421356000,
                            "call_status": "已调度"


                */


               var s_name = currObj.s_name==null?"-":currObj.s_name;
               var vendor = currObj.vendor==null?"-":currObj.vendor;
               var device_type = currObj.device_type==null?"-":currObj.device_type;
               var device_model = currObj.device_model==null?"-":currObj.device_model;
               var s_grid = currObj.s_grid==null?"-":currObj.s_grid;
               var s_source = currObj.s_source==null?"-":currObj.s_source;
               var call_status = currObj.call_status==null?"-":currObj.call_status;

               htmlStr += '<tr>'
                    +       '<td>'+s_name+'</td>'
                    +       '<td class="ciiekpistyle">'+vendor+'</td>'
                    +       '<td class="ciiekpistyle">'+device_type+'</td>'
                    +       '<td class="ciiekpistyle">'+device_model+'</td>'
                    +       '<td class="ciiekpistyle">'+s_grid+'</td>'
                    +       '<td class="ciiekpistyle">'+s_source+'</td>'
                    +       '<td class="ciiekpistyle">'+call_status+'</td>'
                    +   '</tr>'
            }
            $("#commonAddressCellTbody").html(htmlStr); 


             // var htmlStr = '';
        // for (var i = 0; i < 20; i++) {
        //     htmlStr += '<tr>'
        //             +       '<td>备品备件_'+i+'</td>'
        //             +       '<td class="ciiekpistyle">厂家_'+i+'</td>'
        //             +       '<td class="ciiekpistyle">类型_'+i+'</td>'
        //             +       '<td class="ciiekpistyle">型号_'+i+'</td>'
        //             +       '<td class="ciiekpistyle">所在仓库_'+i+'</td>'
        //             +       '<td class="ciiekpistyle">'+i+'</td>'
        //             +   '</tr>'
        // };   
        // $("#commonAddressCellTbody").html(htmlStr); 
            


        });





       
    },
};