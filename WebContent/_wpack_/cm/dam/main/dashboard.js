/*amd /cm/dam/main/dashboard.xml 8485 9d5126485b594f43e48fd865011268ab41c5bcb1c5c9f827e381a746a98794e5 */
define({declaration:{A:{version:'1.0',encoding:'UTF-8'}},E:[{T:7,N:'xml-stylesheet',instruction:'href="/cm/css/base.css" type="text/css"'},{T:7,N:'xml-stylesheet',instruction:'href="/cm/dam/css/dam.css" type="text/css"'},{T:1,N:'html',A:{xmlns:'http://www.w3.org/1999/xhtml','xmlns:ev':'http://www.w3.org/2001/xml-events','xmlns:w2':'http://www.inswave.com/websquare','xmlns:xf':'http://www.w3.org/2002/xforms'},E:[{T:1,N:'head',E:[{T:1,N:'w2:type',E:[{T:3,text:'COMPONENT'}]},{T:1,N:'w2:buildDate'},{T:1,N:'w2:MSA'},{T:1,N:'xf:model',E:[{T:1,N:'w2:dataCollection',A:{baseNode:'map'},E:[{T:1,N:'w2:dataMap',A:{baseNode:'map',id:'dma_stats'},E:[{T:1,N:'w2:keyInfo',E:[{T:1,N:'w2:key',A:{id:'TOTAL_FILES',name:'TOTAL_FILES',dataType:'number'}},{T:1,N:'w2:key',A:{id:'TOTAL_SIZE_GB',name:'TOTAL_SIZE_GB',dataType:'number'}},{T:1,N:'w2:key',A:{id:'NEW_UPLOADS_TODAY',name:'NEW_UPLOADS_TODAY',dataType:'number'}}]}]},{T:1,N:'w2:dataList',A:{baseNode:'list',repeatNode:'map',id:'dlt_distribution',saveRemovedData:'true'},E:[{T:1,N:'w2:columnInfo',E:[{T:1,N:'w2:column',A:{id:'FILE_TYPE',name:'FILE_TYPE',dataType:'text'}},{T:1,N:'w2:column',A:{id:'CNT',name:'CNT',dataType:'number'}},{T:1,N:'w2:column',A:{id:'RATIO',name:'RATIO',dataType:'number'}}]}]},{T:1,N:'w2:dataList',A:{baseNode:'list',repeatNode:'map',id:'dlt_trend',saveRemovedData:'true'},E:[{T:1,N:'w2:columnInfo',E:[{T:1,N:'w2:column',A:{id:'MONTH_LABEL',name:'MONTH_LABEL',dataType:'text'}},{T:1,N:'w2:column',A:{id:'STORAGE_GB',name:'STORAGE_GB',dataType:'number'}}]}]},{T:1,N:'w2:dataList',A:{baseNode:'list',repeatNode:'map',id:'dlt_recent',saveRemovedData:'true'},E:[{T:1,N:'w2:columnInfo',E:[{T:1,N:'w2:column',A:{id:'ASSET_ID',name:'ASSET_ID',dataType:'number'}},{T:1,N:'w2:column',A:{id:'FILE_NM',name:'FILE_NM',dataType:'text'}},{T:1,N:'w2:column',A:{id:'FILE_TYPE',name:'FILE_TYPE',dataType:'text'}},{T:1,N:'w2:column',A:{id:'OWNER_NM',name:'OWNER_NM',dataType:'text'}},{T:1,N:'w2:column',A:{id:'STATUS',name:'STATUS',dataType:'text'}},{T:1,N:'w2:column',A:{id:'PREVIEW_URL',name:'PREVIEW_URL',dataType:'text'}},{T:1,N:'w2:column',A:{id:'UPLOAD_DT',name:'UPLOAD_DT',dataType:'text'}},{T:1,N:'w2:column',A:{id:'TIME_AGO',name:'TIME_AGO',dataType:'text'}}]}]}]},{T:1,N:'w2:workflowCollection'},{T:1,N:'xf:submission',A:{id:'sbm_getStats',action:'/api/dashboard/getStats',method:'post',mediatype:'application/json',encoding:'UTF-8',mode:'asynchronous','ev:submitdone':'scwin.sbm_getStats_submitdone','ev:submiterror':'scwin.sbm_submiterror'}},{T:1,N:'xf:submission',A:{id:'sbm_getDistribution',action:'/api/dashboard/getDistribution',method:'post',mediatype:'application/json',encoding:'UTF-8',mode:'asynchronous','ev:submitdone':'scwin.sbm_getDistribution_submitdone','ev:submiterror':'scwin.sbm_submiterror'}},{T:1,N:'xf:submission',A:{id:'sbm_getStorageTrend',action:'/api/dashboard/getStorageTrend',method:'post',mediatype:'application/json',encoding:'UTF-8',mode:'asynchronous','ev:submitdone':'scwin.sbm_getStorageTrend_submitdone','ev:submiterror':'scwin.sbm_submiterror'}},{T:1,N:'xf:submission',A:{id:'sbm_getRecentUploads',action:'/api/dashboard/getRecentUploads',method:'post',mediatype:'application/json',encoding:'UTF-8',mode:'asynchronous','ev:submitdone':'scwin.sbm_getRecentUploads_submitdone','ev:submiterror':'scwin.sbm_submiterror'}}]},{T:1,N:'w2:layoutInfo'},{T:1,N:'w2:publicInfo',A:{method:''}},{T:1,N:'script',A:{lazy:'false',type:'text/javascript'},E:[{T:4,cdata:function(scopeObj){with(scopeObj){scwin.onpageload = function () {
    $p.executeSubmission($p.getSubmission('sbm_getStats'));
    $p.executeSubmission($p.getSubmission('sbm_getDistribution'));
    $p.executeSubmission($p.getSubmission('sbm_getStorageTrend'));
    $p.executeSubmission($p.getSubmission('sbm_getRecentUploads'));
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
};
scwin.sbm_getStorageTrend_submitdone = function (e) {
    var rows = e && e.responseJSON && e.responseJSON.dlt_trend ? e.responseJSON.dlt_trend : [];
    dlt_trend.setJSON(rows);
};
scwin.sbm_getRecentUploads_submitdone = function (e) {
    var rows = e && e.responseJSON && e.responseJSON.dlt_recent ? e.responseJSON.dlt_recent : [];
    for (var i = 0; i < rows.length; i++) {
        rows[i].TIME_AGO = 'Uploaded ' + rows[i].UPLOAD_DT;
    }
    dlt_recent.setJSON(rows);
};
scwin.sbm_submiterror = function () {
    txt_totalFiles.setLabel('0');
    txt_totalSizeGb.setLabel('0.00 GB');
    txt_newUploads.setLabel('0');
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
}}}]}]},{T:1,N:'body',A:{'ev:onpageload':'scwin.onpageload'},E:[{T:1,N:'xf:group',A:{class:'dam-page'},E:[{T:1,N:'w2:textbox',A:{id:'txt_pageTitle',class:'dam-title',label:'Dashboard'}},{T:1,N:'xf:group',A:{class:'dam-dashboard-grid'},E:[{T:1,N:'xf:group',A:{class:'dam-panel dam-stats'},E:[{T:1,N:'w2:textbox',A:{class:'dam-stats-title',label:'Key Asset Stats'}},{T:1,N:'xf:group',A:{class:'dam-card dam-card-purple'},E:[{T:1,N:'xf:group',A:{class:'dam-card-content'},E:[{T:1,N:'w2:textbox',A:{id:'txt_totalFiles',class:'dam-card-value',label:'0'}},{T:1,N:'w2:textbox',A:{class:'dam-card-label',label:'Total Assets'}}]},{T:1,N:'xf:image',A:{src:'/cm/dam/images/ic_dashboard.svg',class:'dam-card-icon'}}]},{T:1,N:'xf:group',A:{class:'dam-card dam-card-green'},E:[{T:1,N:'xf:group',A:{class:'dam-card-content'},E:[{T:1,N:'w2:textbox',A:{id:'txt_totalSizeGb',class:'dam-card-value',label:'0.00 GB'}},{T:1,N:'w2:textbox',A:{class:'dam-card-label',label:'Storage Used'}}]},{T:1,N:'xf:image',A:{src:'/cm/dam/images/ic_folder.svg',class:'dam-card-icon'}}]},{T:1,N:'xf:group',A:{class:'dam-card dam-card-pink'},E:[{T:1,N:'xf:group',A:{class:'dam-card-content'},E:[{T:1,N:'w2:textbox',A:{id:'txt_newUploads',class:'dam-card-value',label:'0'}},{T:1,N:'w2:textbox',A:{class:'dam-card-label',label:'New Uploads Today'}}]},{T:1,N:'xf:image',A:{src:'/cm/dam/images/ic_document.svg',class:'dam-card-icon'}}]}]},{T:1,N:'xf:group',A:{class:'dam-panel dam-donut'},E:[{T:1,N:'w2:textbox',A:{class:'dam-panel-title',label:'Asset Distribution by Type'}},{T:1,N:'xf:group',A:{class:'dam-chart-wrap'},E:[{T:1,N:'w2:fusionchart',A:{id:'chart_distribution',chartType:'doughnut2d',drawType:'javascript',ref:'data:dlt_distribution',seriesType:'advanced',class:'dam-chart'}}]}]},{T:1,N:'xf:group',A:{class:'dam-panel dam-line'},E:[{T:1,N:'w2:textbox',A:{class:'dam-panel-title',label:'Storage Usage Trend'}},{T:1,N:'xf:group',A:{class:'dam-chart-wrap'},E:[{T:1,N:'w2:fusionchart',A:{id:'chart_trend',chartType:'MSLine',drawType:'javascript',ref:'data:dlt_trend',seriesType:'advanced',class:'dam-chart'}}]}]},{T:1,N:'xf:group',A:{class:'dam-panel dam-recent'},E:[{T:1,N:'w2:textbox',A:{class:'dam-panel-title',label:'Recent Uploads'}},{T:1,N:'xf:group',A:{class:'dam-recent-list'},E:[{T:1,N:'xf:repeat',A:{id:'rep_recent',nodeset:'data:dlt_recent'},E:[{T:1,N:'xf:group',A:{class:'dam-recent-row'},E:[{T:1,N:'xf:group',A:{class:'dam-timeline-dot'}},{T:1,N:'xf:group',A:{class:'dam-recent-card'},E:[{T:1,N:'xf:group',A:{class:'dam-recent-icon'},E:[{T:1,N:'xf:image',A:{src:'/cm/dam/images/ic_document.svg'}}]},{T:1,N:'xf:group',A:{class:'dam-recent-info'},E:[{T:1,N:'w2:textbox',A:{id:'txt_recFileNm',class:'dam-recent-name',ref:'FILE_NM'}},{T:1,N:'xf:group',A:{class:'dam-recent-meta'},E:[{T:1,N:'w2:textbox',A:{id:'txt_recOwnerNm',class:'dam-recent-user',ref:'OWNER_NM'}},{T:1,N:'w2:textbox',A:{class:'dam-recent-sep',label:'•'}},{T:1,N:'w2:textbox',A:{id:'txt_recUploadDt',class:'dam-recent-time',ref:'TIME_AGO'}}]}]}]}]}]}]}]}]}]}]}]}]})