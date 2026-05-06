/*amd /cm/dam/main/dashboard.xml 12011 a06d267fbeb72d0be658dac8028d72d8a971e10f370cb3fb3a6e48e19402dcde */
define({declaration:{A:{version:'1.0',encoding:'UTF-8'}},E:[{T:7,N:'xml-stylesheet',instruction:'href="/cm/css/base.css" type="text/css"'},{T:7,N:'xml-stylesheet',instruction:'href="/cm/dam/css/dam.css" type="text/css"'},{T:1,N:'html',A:{xmlns:'http://www.w3.org/1999/xhtml','xmlns:ev':'http://www.w3.org/2001/xml-events','xmlns:w2':'http://www.inswave.com/websquare','xmlns:xf':'http://www.w3.org/2002/xforms'},E:[{T:1,N:'head',E:[{T:1,N:'w2:type',E:[{T:3,text:'COMPONENT'}]},{T:1,N:'w2:buildDate'},{T:1,N:'w2:MSA'},{T:1,N:'xf:model',E:[{T:1,N:'w2:dataCollection',A:{baseNode:'map'},E:[{T:1,N:'w2:dataMap',A:{baseNode:'map',id:'dma_stats'},E:[{T:1,N:'w2:keyInfo',E:[{T:1,N:'w2:key',A:{id:'TOTAL_FILES',name:'TOTAL_FILES',dataType:'number'}},{T:1,N:'w2:key',A:{id:'TOTAL_SIZE_GB',name:'TOTAL_SIZE_GB',dataType:'number'}},{T:1,N:'w2:key',A:{id:'NEW_UPLOADS_TODAY',name:'NEW_UPLOADS_TODAY',dataType:'number'}}]}]},{T:1,N:'w2:dataList',A:{baseNode:'list',repeatNode:'map',id:'dlt_distribution',saveRemovedData:'true'},E:[{T:1,N:'w2:columnInfo',E:[{T:1,N:'w2:column',A:{id:'FILE_TYPE',name:'FILE_TYPE',dataType:'text'}},{T:1,N:'w2:column',A:{id:'CNT',name:'CNT',dataType:'number'}},{T:1,N:'w2:column',A:{id:'RATIO',name:'RATIO',dataType:'number'}}]}]},{T:1,N:'w2:dataList',A:{baseNode:'list',repeatNode:'map',id:'dlt_trend',saveRemovedData:'true'},E:[{T:1,N:'w2:columnInfo',E:[{T:1,N:'w2:column',A:{id:'MONTH_LABEL',name:'MONTH_LABEL',dataType:'text'}},{T:1,N:'w2:column',A:{id:'STORAGE_GB',name:'STORAGE_GB',dataType:'number'}}]}]},{T:1,N:'w2:dataList',A:{baseNode:'list',repeatNode:'map',id:'dlt_recent',saveRemovedData:'true'},E:[{T:1,N:'w2:columnInfo',E:[{T:1,N:'w2:column',A:{id:'ASSET_ID',name:'ASSET_ID',dataType:'number'}},{T:1,N:'w2:column',A:{id:'FILE_NM',name:'FILE_NM',dataType:'text'}},{T:1,N:'w2:column',A:{id:'FILE_TYPE',name:'FILE_TYPE',dataType:'text'}},{T:1,N:'w2:column',A:{id:'OWNER_NM',name:'OWNER_NM',dataType:'text'}},{T:1,N:'w2:column',A:{id:'STATUS',name:'STATUS',dataType:'text'}},{T:1,N:'w2:column',A:{id:'PREVIEW_URL',name:'PREVIEW_URL',dataType:'text'}},{T:1,N:'w2:column',A:{id:'UPLOAD_DT',name:'UPLOAD_DT',dataType:'text'}},{T:1,N:'w2:column',A:{id:'TIME_AGO',name:'TIME_AGO',dataType:'text'}}]}]}]},{T:1,N:'w2:workflowCollection'},{T:1,N:'xf:submission',A:{id:'sbm_getStats',action:'/api/dashboard/getStats',method:'post',mediatype:'application/json',encoding:'UTF-8',mode:'asynchronous','ev:submitdone':'scwin.sbm_getStats_submitdone','ev:submiterror':'scwin.sbm_submiterror'}},{T:1,N:'xf:submission',A:{id:'sbm_getDistribution',action:'/api/dashboard/getDistribution',method:'post',mediatype:'application/json',encoding:'UTF-8',mode:'asynchronous','ev:submitdone':'scwin.sbm_getDistribution_submitdone','ev:submiterror':'scwin.sbm_submiterror'}},{T:1,N:'xf:submission',A:{id:'sbm_getStorageTrend',action:'/api/dashboard/getStorageTrend',method:'post',mediatype:'application/json',encoding:'UTF-8',mode:'asynchronous','ev:submitdone':'scwin.sbm_getStorageTrend_submitdone','ev:submiterror':'scwin.sbm_submiterror'}},{T:1,N:'xf:submission',A:{id:'sbm_getRecentUploads',action:'/api/dashboard/getRecentUploads',method:'post',mediatype:'application/json',encoding:'UTF-8',mode:'asynchronous','ev:submitdone':'scwin.sbm_getRecentUploads_submitdone','ev:submiterror':'scwin.sbm_submiterror'}}]},{T:1,N:'w2:layoutInfo'},{T:1,N:'w2:publicInfo',A:{method:''}},{T:1,N:'script',A:{lazy:'false',type:'text/javascript'},E:[{T:4,cdata:function(scopeObj){with(scopeObj){scwin.onpageload = function () {
    var mockStats = {
        TOTAL_FILES: 1248,
        TOTAL_SIZE_GB: 842.5,
        NEW_UPLOADS_TODAY: 406
    };
    dma_stats.setJSON(mockStats);
    txt_totalFiles.setLabel('1,248');
    txt_totalSizeGb.setLabel('842.50 GB');
    txt_newUploads.setLabel('406');
    var mockRecent = [
        {
            FILE_NM: 'Project_Proposal_v2.pdf',
            OWNER_NM: 'John Doe',
            TIME_AGO: '2 hours ago'
        },
        {
            FILE_NM: 'Q3_Financial_Report.xlsx',
            OWNER_NM: 'Jane Smith',
            TIME_AGO: '4 hours ago'
        },
        {
            FILE_NM: 'Hero_Banner_Final.png',
            OWNER_NM: 'Mike Johnson',
            TIME_AGO: '5 hours ago'
        },
        {
            FILE_NM: 'Brand_Guidelines.pdf',
            OWNER_NM: 'Sarah Lee',
            TIME_AGO: '1 day ago'
        },
        {
            FILE_NM: 'Marketing_Video_Draft.mp4',
            OWNER_NM: 'David Kim',
            TIME_AGO: '2 days ago'
        }
    ];
    gen_recent.removeAll();
    for (var i = 0; i < mockRecent.length; i++) {
        gen_recent.insertChild(i);
        var fNm = gen_recent.getChild(i, 'txt_recFileNm');
        var tAgo = gen_recent.getChild(i, 'txt_recUploadDt');
        fNm.setLabel(mockRecent[i].FILE_NM);
        tAgo.setLabel('Uploaded ' + mockRecent[i].TIME_AGO + ' by ' + mockRecent[i].OWNER_NM);
    }
    var mockDist = [
        {
            FILE_TYPE: 'Images',
            CNT: 450,
            RATIO: 40
        },
        {
            FILE_TYPE: 'Videos',
            CNT: 120,
            RATIO: 10
        },
        {
            FILE_TYPE: 'Documents',
            CNT: 500,
            RATIO: 45
        },
        {
            FILE_TYPE: 'Audio',
            CNT: 50,
            RATIO: 5
        }
    ];
    dlt_distribution.setJSON(mockDist);
    scwin.drawDistributionChart(mockDist);
    var mockTrend = [
        {
            MONTH_LABEL: 'Jan 20',
            STORAGE_GB: 100
        },
        {
            MONTH_LABEL: 'Mar 22',
            STORAGE_GB: 200
        },
        {
            MONTH_LABEL: 'May 22',
            STORAGE_GB: 300
        },
        {
            MONTH_LABEL: 'Jul 22',
            STORAGE_GB: 450
        },
        {
            MONTH_LABEL: 'Sep 23',
            STORAGE_GB: 600
        },
        {
            MONTH_LABEL: 'Nov 23',
            STORAGE_GB: 850
        },
        {
            MONTH_LABEL: 'Oct 23',
            STORAGE_GB: 1100
        }
    ];
    dlt_trend.setJSON(mockTrend);
    scwin.drawTrendChart(mockTrend);
};
scwin.drawDistributionChart = function (dataList) {
    var totalCnt = 0;
    for (var i = 0; i < dataList.length; i++) {
        totalCnt += Number(dataList[i].CNT);
    }
    var fcData = [];
    for (var i = 0; i < dataList.length; i++) {
        var pct = (Number(dataList[i].CNT) / totalCnt * 100).toFixed(1);
        fcData.push({
            'label': dataList[i].FILE_TYPE + ' ' + pct + '%',
            'value': String(dataList[i].CNT)
        });
    }
    var chartOptions = {
        'showLegend': '1',
        'legendPosition': 'bottom',
        'showLabels': '0',
        'showValues': '0',
        'legendBorderAlpha': '0',
        'legendShadow': '0',
        'paletteColors': '#66c296,#a1d575,#4e7fcd,#e08d66',
        'pieRadius': '70',
        'doughnutRadius': '40',
        'baseFontColor': '#1f2733',
        'showBorder': '0',
        'bgColor': '#ffffff',
        'bgAlpha': '0'
    };
    chart_distribution.setChartAttribute(chartOptions);
    chart_distribution.setJSONData({ 'data': fcData });
};
scwin.drawTrendChart = function (dataList) {
    var fcData = [];
    for (var i = 0; i < dataList.length; i++) {
        fcData.push({
            'label': dataList[i].MONTH_LABEL,
            'value': String(dataList[i].STORAGE_GB)
        });
    }
    var chartOptions = {
        'showBorder': '0',
        'bgColor': '#ffffff',
        'bgAlpha': '0',
        'theme': 'fusion',
        'showValues': '0',
        'paletteColors': '#4e7fcd',
        'plotFillAlpha': '50'
    };
    chart_trend.setChartAttribute(chartOptions);
    chart_trend.setJSONData({ 'data': fcData });
};
scwin.sbm_getStats_submitdone = function (e) {
    var payload = e && e.responseJSON && e.responseJSON.dma_stats ? e.responseJSON.dma_stats : {};
    dma_stats.setJSON(payload);
    txt_totalFiles.setLabel(String(payload.TOTAL_FILES || 0));
    txt_totalSizeGb.setLabel(scwin._formatGb(payload.TOTAL_SIZE_GB));
    txt_newUploads.setLabel(String(payload.NEW_UPLOADS_TODAY || 0));
};
scwin.sbm_getDistribution_submitdone = function (e) {
    var rows = e && e.responseJSON && e.responseJSON.dlt_distribution ? e.responseJSON.dlt_distribution : [];
    dlt_distribution.setJSON(rows);
    scwin.drawDistributionChart(rows);
    dlt_distribution.setJSON(rows);
};
scwin.sbm_getStorageTrend_submitdone = function (e) {
    var rows = e && e.responseJSON && e.responseJSON.dlt_trend ? e.responseJSON.dlt_trend : [];
    dlt_trend.setJSON(rows);
};
scwin.sbm_getRecentUploads_submitdone = function (e) {
};
scwin.sbm_submiterror = function () {
};
scwin._formatGb = function (value) {
    var n = Number(value);
    if (isNaN(n)) {
        n = 0;
    }
    return n.toFixed(2) + ' GB';
};
scwin._getFileIcon = function (fileType) {
    if (fileType === 'Images')
        return '/cm/dam/images/preview/image.svg';
    if (fileType === 'Videos')
        return '/cm/dam/images/preview/video.svg';
    if (fileType === 'Audio')
        return '/cm/dam/images/preview/audio.svg';
    return '/cm/dam/images/preview/document.svg';
};
}}}]}]},{T:1,N:'body',A:{'ev:onpageload':'scwin.onpageload'},E:[{T:1,N:'xf:group',A:{class:'dam-page'},E:[{T:1,N:'w2:textbox',A:{id:'txt_pageTitle',class:'dam-title',label:'Dashboard'}},{T:1,N:'xf:group',A:{class:'dam-dashboard-grid'},E:[{T:1,N:'xf:group',A:{class:'dam-panel dam-stats'},E:[{T:1,N:'w2:textbox',A:{class:'dam-stats-title',label:'Key Asset Stats'}},{T:1,N:'xf:group',A:{class:'dam-card dam-card-purple'},E:[{T:1,N:'xf:group',A:{class:'dam-card-content'},E:[{T:1,N:'w2:textbox',A:{id:'txt_totalFiles',class:'dam-card-value',label:'0'}},{T:1,N:'w2:textbox',A:{class:'dam-card-label',label:'Total Assets'}}]},{T:1,N:'xf:group',A:{class:'dam-card-icon-wrap'},E:[{T:1,N:'xf:image',A:{src:'/cm/dam/images/ic_user.svg',class:'dam-card-icon'}}]}]},{T:1,N:'xf:group',A:{class:'dam-card dam-card-green'},E:[{T:1,N:'xf:group',A:{class:'dam-card-content'},E:[{T:1,N:'w2:textbox',A:{id:'txt_totalSizeGb',class:'dam-card-value',label:'0.00 GB'}},{T:1,N:'w2:textbox',A:{class:'dam-card-label',label:'Storage Used'}}]},{T:1,N:'xf:group',A:{class:'dam-card-icon-wrap'},E:[{T:1,N:'xf:image',A:{src:'/cm/dam/images/ic_database.svg',class:'dam-card-icon'}}]}]},{T:1,N:'xf:group',A:{class:'dam-card dam-card-pink'},E:[{T:1,N:'xf:group',A:{class:'dam-card-content'},E:[{T:1,N:'w2:textbox',A:{id:'txt_newUploads',class:'dam-card-value',label:'0'}},{T:1,N:'w2:textbox',A:{class:'dam-card-label',label:'New Uploads Today'}}]},{T:1,N:'xf:group',A:{class:'dam-card-icon-wrap'},E:[{T:1,N:'xf:image',A:{src:'/cm/dam/images/ic_upload.svg',class:'dam-card-icon'}}]}]}]},{T:1,N:'xf:group',A:{class:'dam-panel dam-donut'},E:[{T:1,N:'w2:textbox',A:{class:'dam-panel-title',label:'Asset Distribution by Type'}},{T:1,N:'xf:group',A:{class:'dam-chart-wrap'},E:[{T:1,N:'w2:fusionchart',A:{id:'chart_distribution',chartType:'doughnut2d',drawType:'javascript',class:'dam-chart',accessibility:'false',showBorder:'0',bgColor:'#ffffff',bgAlpha:'0',enableSmartLabels:'1',baseFontColor:'#1f2733'}}]}]},{T:1,N:'xf:group',A:{class:'dam-panel dam-line'},E:[{T:1,N:'w2:textbox',A:{class:'dam-panel-title',label:'Storage Usage Trend'}},{T:1,N:'xf:group',A:{class:'dam-chart-wrap'},E:[{T:1,N:'w2:fusionchart',A:{id:'chart_trend',chartType:'Area2D',drawType:'javascript',class:'dam-chart',accessibility:'false',showBorder:'0',bgColor:'#ffffff',bgAlpha:'0'}}]}]},{T:1,N:'xf:group',A:{class:'dam-panel dam-recent'},E:[{T:1,N:'w2:textbox',A:{class:'dam-panel-title',label:'Recent Uploads'}},{T:1,N:'w2:generator',A:{id:'gen_recent',class:'dam-recent-list'},E:[{T:1,N:'xf:group',A:{id:'grp_row',class:'dam-recent-row'},E:[{T:1,N:'xf:group',A:{class:'dam-timeline-dot'},E:[{T:1,N:'xf:image',A:{src:'/cm/dam/images/ic_document.svg'}}]},{T:1,N:'xf:group',A:{class:'dam-recent-card'},E:[{T:1,N:'w2:textbox',A:{id:'txt_recFileNm',class:'dam-recent-name'}},{T:1,N:'w2:textbox',A:{id:'txt_recUploadDt',class:'dam-recent-meta'}}]}]}]}]}]}]}]}]}]})