var KpiDemo = KpiDemo || {};



KpiDemo.GROUPS = [{
    group: '用户数',
    kpis: [
        {name:'全网VLR用户数',key:'msc_subscrib_in_vlr'},
        {name:'LTE附着用户数',key:'lte_mme_sub_nbrsub'},
        {name:'Volte注册用户数',key:'volte_scscf_register_user_cnt'}
    ]
},{
    group: '业务量',
    kpis: [
        {name:'SGI流量',key:'msc_subscrib_in_vlr'},
        {name:'VOLTE语音话务量（SCSCF）',key:'lte_mme_sub_nbrsub'},
        {name:'GSM空口流量',key:'volte_scscf_register_user_cnt'},
        {name:'GSM话务量',key:'volte_scscf_register_user_cnt'},
        {name:'WLAN AC流量',key:'volte_scscf_register_user_cnt'},
        {name:'VOLTE语音话务量（ENB）',key:'volte_scscf_register_user_cnt'}
    ]
},{
    group: 'LTE&EPC指标',
    kpis: [
        {name:'LTE无线接通率',key:'msc_subscrib_in_vlr'},
        {name:'LTE附着成功率',key:'lte_mme_sub_nbrsub'},
        {name:'上行PRB利用率',key:'lte_mme_sub_nbrsub'},
        {name:'下行PRB利用率',key:'volte_scscf_register_user_cnt'},
        {name:'LTE无线掉线率',key:'volte_scscf_register_user_cnt'}
    ]
},{
    group: '语音质量',
    kpis: [
        {name:'VOTLE语音无线接通率',key:'msc_subscrib_in_vlr'},
        {name:'GSM无线接通率',key:'lte_mme_sub_nbrsub'},
        {name:'VOLTE语音无线掉线率',key:'volte_scscf_register_user_cnt'},
        {name:'GSM接通率（GSM无线接入性）',key:'volte_scscf_register_user_cnt'}
    ]
}];

KpiDemo.initFun = function() {
    this.initialize.apply(this, arguments);
};
KpiDemo.initFun.prototype.constructor = KpiDemo.initFun;
KpiDemo.initFun.prototype.initialize = function(par) {
    var groups = KpiDemo.GROUPS;
    for (var i = 0; i < groups.length; i++) {
        var group = groups[i];
        var chartGroup = new KpiDemo.chartGroup(group);
        $("#"+par).append(chartGroup.jqGroup);
    }
}




KpiDemo.chartGroup=function (){
    this.initialize.apply(this, arguments);
};
KpiDemo.chartGroup.prototype.constructor = KpiDemo.chartGroup;
KpiDemo.chartGroup.prototype.groupName = "";
KpiDemo.chartGroup.prototype.chartComponents = "";
KpiDemo.chartGroup.prototype.jqGroup = null;
KpiDemo.chartGroup.prototype.initialize=function(par){
       
        var groupName = par.group;
        var kpis = par.kpis;
        this.groupName = groupName;
        this.chartComponents = [];

        var btnVisible='';
        if(kpis.length<5){
            btnVisible='display:none';
        }
        var html='<div class="kpiview_content" >'
                +'<div class="kpiview_titleBar" >'
                    +'<div class="kpiview_titleColorIcon"></div>'
                    +'<span class="kpiview_titleTxt">'+this.groupName+'</span>'
                    +'<div class="kpiview_toExpand kpiview_ctrlBtn" style="'+btnVisible+'" ></div>'
                +'</div>'
                +'<div class="kpiview_charts" ></div>'
            +'</div>';

         this.jqGroup = $(html);   
         var jqChartPanel = this.jqGroup.find('.kpiview_charts');
         this.jqGroup.find('.kpiview_ctrlBtn').on('click', this.ctrlChartShow.bind(this));
         for (var i = 0; i < kpis.length; i++) {
             var kpi = kpis[i];

             jqChartPanel.append(kpi.name);


         }



}
KpiDemo.chartGroup.prototype.ctrlChartShow=function(e){
    if($(e.currentTarget).hasClass('kpiview_toCollapse')){
        $(e.currentTarget).removeClass('kpiview_toCollapse').addClass('kpiview_toExpand');
        this.hideCharts();
    }else if($(e.currentTarget).hasClass('kpiview_toExpand')){
        $(e.currentTarget).removeClass('kpiview_toExpand').addClass('kpiview_toCollapse');
        this.showCharts();
    }
};