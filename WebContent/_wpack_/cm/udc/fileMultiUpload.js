/*amd /cm/udc/fileMultiUpload.xml 17985 548cde7ab21ec1ac9063aadb7bef616f65d7eef2ffeae18da55cf26e87eb0732 */
define({declaration:{A:{version:'1.0',encoding:'UTF-8',standalone:'no'}},E:[{T:1,N:'html',A:{xmlns:'http://www.w3.org/1999/xhtml','xmlns:ev':'http://www.w3.org/2001/xml-events','xmlns:w2':'http://www.inswave.com/websquare','xmlns:xf':'http://www.w3.org/2002/xforms'},E:[{T:1,N:'head',A:{},E:[{T:1,N:'w2:type',A:{palette:'support'},E:[{T:3,text:'COMPONENT'}]},{T:1,N:'w2:buildDate'},{T:1,N:'w2:publicInfo',A:{method:'scwin.startFileUpload'}},{T:1,N:'xf:model',E:[{T:1,N:'w2:dataCollection',A:{baseNode:'map'},E:[{T:1,N:'w2:dataList',A:{baseNode:'list','ev:onremoverow':'scwin.dlt_file_onremoverow',id:'dlt_file',repeatNode:'map',saveRemovedData:'true',idAttribute:''},E:[{T:1,N:'w2:columnInfo',E:[{T:1,N:'w2:column',A:{id:'chk',name:'선택',dataType:'text',ignoreStatus:'true',importFormatter:''}},{T:1,N:'w2:column',A:{id:'FILE_SEQ',name:'파일순번',dataType:'number'}},{T:1,N:'w2:column',A:{id:'DATA_SEQ',name:'데이터순번',dataType:'number'}},{T:1,N:'w2:column',A:{id:'FILE_GRP_SEQ',name:'파일그룹순번',dataType:'number'}},{T:1,N:'w2:column',A:{id:'FILE_STORED_PATH',name:'파일저장경로',dataType:'text'}},{T:1,N:'w2:column',A:{id:'STORED_FILE_NM',name:'저장파일명',dataType:'text'}},{T:1,N:'w2:column',A:{id:'ORIGIN_FILE_NM',name:'원본파일명',dataType:'text'}},{T:1,N:'w2:column',A:{id:'FILE_SIZE',name:'파일크기',dataType:'text'}},{T:1,N:'w2:column',A:{id:'status',name:'파일전송상태',dataType:'text'}}]}]},{T:1,N:'w2:dataMap',A:{baseNode:'map',id:'dma_fileInfo'},E:[{T:1,N:'w2:keyInfo',E:[{T:1,N:'w2:key',A:{dataType:'text',id:'FILE_GRP_SEQ',name:'파일그룹순번'}}]},{T:1,N:'w2:data'}]},{T:1,N:'w2:aliasDataList',A:{scope:'',id:'aliasFileDataList'}}]},{T:1,N:'w2:workflowCollection'}]},{T:1,N:'script',A:{lazy:'false',type:'text/javascript'},E:[{T:4,cdata:function(scopeObj){with(scopeObj){scwin.maxFileCount = 0;
scwin.maxFileSize = 0;
scwin.totalFileSize = 0;
scwin.filter = '*.*';
scwin.dataSeq = 0;
scwin.fileGrpSeq = 0;
scwin.subDir = '';
scwin.onpageload = function () {
    mpd_multiFileUpload.setStyle('margin-top', '-28px');
    mpd_multiFileUpload.setSize(80, 30);
    scwin.setDownloadProperty();
    scwin.setFileStatus();
    scwin.setDropEventHandler();
};
scwin.setDownloadProperty = function () {
    var propertyData = $p.getOptions();
    scwin.maxFileCount = $c.num.parseFloat(propertyData.maxFileCount) || 10;
    scwin.maxFileSize = $c.num.parseFloat(propertyData.maxFileSize) * 1024 * 1024 || 500 * 1024 * 1024;
    scwin.totalFileSize = $c.num.parseFloat(propertyData.totalFileSize) * 1024 * 1024 || 500 * 1024 * 1024;
    scwin.filter = propertyData.filter || '*.*';
    scwin.dataSeq = propertyData.dataSeq || 0;
    scwin.fileGrpSeq = propertyData.fileGrpSeq || 0;
    if ($c.util.isEmpty($p, scwin.fileGrpSeq) === false) {
        scwin.fileGrpSeq = scwin.fileGrpSeq;
    } else {
        scwin.fileGrpSeq = 0;
    }
    mpd_multiFileUpload.setMaxFileCount(scwin.maxFileCount);
    mpd_multiFileUpload.setMaxFileSize(scwin.maxFileSize);
    scwin.callbackFileUploadSetting();
};
scwin.callbackFileUploadSetting = function () {
    var filter = '';
    if ($c.util.isEmpty($p, scwin.filter) === false) {
        var extArr = scwin.filter.split(',');
        for (var idx in extArr) {
            filter += '*.' + extArr[idx].trim() + ';';
        }
    } else {
        filter = '*.*';
    }
    mpd_multiFileUpload.setFilter('Filter', filter);
    mpd_multiFileUpload.removeAllFiles();
    dlt_file.removeAll();
    scwin.setFileStatus();
};
scwin.setDropEventHandler = function () {
    var fileDragDom = grd_file.render;
    $p.getFrame().render.ondragover = function (e) {
        WebSquare.event.stopEvent(e);
    };
    $p.getFrame().render.ondragenter = function (e) {
        WebSquare.event.stopEvent(e);
    };
    $p.getFrame().render.ondragleave = function (e) {
        WebSquare.event.stopEvent(e);
    };
    $p.getFrame().render.ondrop = function (e) {
        scwin.doHandleDrop(e);
    };
};
scwin.doHandleDrop = function (e) {
    try {
        WebSquare.event.stopEvent(e);
        var fileData = e.dataTransfer.files;
        var uploadFileData = [];
        for (var idx = 0; idx < fileData.length; idx++) {
            var isExisted = false;
            for (var fileIdx in mpd_multiFileUpload.fileArray) {
                if (fileData[idx].name === mpd_multiFileUpload.fileArray[fileIdx].name) {
                    isExisted = true;
                }
            }
            if (isExisted === false) {
                uploadFileData.push(fileData[idx]);
                mpd_multiFileUpload.fileArray.push(fileData[idx]);
                mpd_multiFileUpload.fileNameArr.push(fileData[idx].name);
                mpd_multiFileUpload._inx++;
            }
        }
        scwin.selectCallback(uploadFileData);
        console.table(mpd_multiFileUpload.fileArray);
    } catch (ex) {
        console.error(ex);
    }
};
scwin.setFileStatus = function () {
    var fileInfo = scwin.getCurrentFileInfo();
    tbx_fileCount.setValue(fileInfo.fileCount + ' / ' + scwin.maxFileCount);
    tbx_fileSize.setValue($c.num.formatByte(fileInfo.fileSize) + ' / ' + $c.num.formatByte(scwin.totalFileSize));
};
scwin.selectCallback = function (data) {
    var isValid = true;
    var fileInfo = scwin.getCurrentFileInfo();
    var newFileInfo = {
        fileCount: 0,
        fileSize: 0
    };
    for (var idx in data) {
        if (scwin.maxFileSize > 0 && scwin.maxFileSize < data[idx].size) {
            var alertMsg = data[idx].name + ' 파일의 크기가 ' + $c.num.formatByte(scwin.maxFileSize) + ' 를 초과 했습니다';
            $c.popup.alert($p, alertMsg);
            mpd_multiFileUpload.removeFile(data[idx].name);
            delete data[idx];
        } else {
            newFileInfo.fileCount++;
            newFileInfo.fileSize += data[idx].size;
        }
    }
    if (scwin.maxFileCount > 0 && scwin.maxFileCount < fileInfo.fileCount + newFileInfo.fileCount) {
        var alertMsg = '업로드 가능한 전체 파일 개수가 ' + scwin.maxFileCount + ' 개를 초과 했습니다';
        $c.popup.alert($p, alertMsg);
        isValid = false;
    }
    if (scwin.totalFileSize > 0 && scwin.totalFileSize < fileInfo.fileSize + newFileInfo.fileSize && isValid === true) {
        var alertMsg = '업로드 가능한 전체 파일 용량이 ' + $c.num.formatByte(scwin.totalFileSize) + ' 를 초과 했습니다';
        $c.popup.alert($p, alertMsg);
        isValid = false;
    }
    if (isValid === false) {
        for (var idx in data) {
            mpd_multiFileUpload.removeFile(data[idx].name);
        }
        return;
    }
    if (data.length > 0) {
        var newFileCount = data.length;
        var fileInfoList = [];
        for (var idx in data) {
            var fileInfo = {
                'FILE_SEQ': scwin.fileId,
                'ORIGIN_FILE_NM': data[idx].name,
                'FILE_SIZE': data[idx].size
            };
            fileInfoList.push(fileInfo);
        }
        var lastIdx = dlt_file.getRowCount();
        var totalFileCount = lastIdx + fileInfoList.length;
        dlt_file.insertJSON(lastIdx, fileInfoList);
        for (var idx = lastIdx; idx < totalFileCount; idx++) {
            grd_file.setCellClass(idx, 'status', 'progress');
        }
        grd_file.setFocusedCell(totalFileCount - 1, 'FILE_SEQ', false);
    }
    scwin.setFileStatus();
};
scwin.getCurrentFileInfo = function () {
    var fileInfo = {
        fileCount: 0,
        fileSize: 0
    };
    var fileList = dlt_file.getAllJSON();
    for (var idx in fileList) {
        var rowStatus = fileList[idx].rowStatus;
        if (rowStatus === 'C' || rowStatus === 'U' || rowStatus === 'R') {
            fileInfo.fileCount++;
            fileInfo.fileSize += $c.num.parseInt(fileList[idx].FILE_SIZE);
        }
    }
    ;
    return fileInfo;
};
scwin.clearFiles = function () {
    dlt_file.removeAll();
    mpd_multiFileUpload.setMaxFileCount(scwin.maxFileCount);
};
scwin.mpd_multiFileUpload_onprogress = function (data) {
    var rowIdx = dlt_file.getMatchedIndex('ORIGIN_FILE_NM', data.fileName);
    for (var idx = 0; idx < rowIdx.length; idx++) {
        var fileInfo = dlt_file.getRowJSON(rowIdx[idx]);
        if (fileInfo.rowStatus === 'C' && $c.util.isEmpty($p, fileInfo.fileId) === true) {
            if (data.percentData < 100) {
                dlt_file.setCellData(rowIdx[idx], 'status', data.percentData);
            } else {
                dlt_file.setCellData(rowIdx[idx], 'status', 'S');
            }
        }
    }
};
scwin.mpd_multiFileUpload_ondone = function (data) {
    var newFileCount = data.length;
    for (var fileIdx = 0; fileIdx < newFileCount; fileIdx++) {
        var rowIdx = dlt_file.getMatchedIndex('ORIGIN_FILE_NM', data[fileIdx].localFile);
        dlt_file.setBroadcast(false);
        for (var idx = 0; idx < rowIdx.length; idx++) {
            var fileInfo = dlt_file.getRowJSON(rowIdx[idx]);
            if (fileInfo.rowStatus === 'C' && fileInfo.status === 'S') {
                dlt_file.setCellData(rowIdx[idx], 'DATA_SEQ', scwin.dataSeq);
                dlt_file.setCellData(rowIdx[idx], 'FILE_GRP_SEQ', scwin.fileGrpSeq);
                dlt_file.setCellData(rowIdx[idx], 'FILE_STORED_PATH', data[fileIdx].key);
                dlt_file.setCellData(rowIdx[idx], 'STORED_FILE_NM', data[fileIdx].file);
                dlt_file.setCellData(rowIdx[idx], 'FILE_SIZE', data[fileIdx].size);
                grd_file.refreshCell(rowIdx[idx], 'ORIGIN_FILE_NM');
            }
        }
        dlt_file.setBroadcast(true, true);
    }
    var jsonData = dlt_file.getMatchedJSON('status', 'S');
    scwin.emit_onFileUploadDone(jsonData);
};
scwin.setDisplayStatus = function (value) {
    if (value === 'S') {
        return '<div  style="width:90%; height:80%;" class="div_progress">&nbsp;&nbsp; <div style="display: inline-block;vertical-align: middle;"><strong>100%</strong></div>&nbsp;&nbsp;</div>';
    } else if (value === 'E') {
        return '<div style="width:90%; height:80%;" class="div_progress">&nbsp;&nbsp; <div style="display: inline-block;vertical-align: middle;"><strong>Error</strong>&nbsp;&nbsp;</div></div>';
    } else if ($c.num.parseInt(value) > 0 && $c.num.parseInt(value) < 100) {
        return '<div style="width:' + parseInt(value * 0.9) + '%; height:80%; " class="div_progress">&nbsp;&nbsp;<div style="display: inline-block;vertical-align: middle;"><strong>' + value + ' %</strong>&nbsp;&nbsp;</div></div>';
    } else {
        return '<div style="width:90%; height:80%;" class="div_progressNone"><div style="display: inline-block;vertical-align: middle;">&nbsp;</div></div>';
    }
};
scwin.dlt_file_onremoverow = function (info) {
    for (var idx in info.removedDataObj) {
        var fileName = info.removedDataObj[idx][6];
        mpd_multiFileUpload.removeFile(fileName);
    }
    scwin.setFileStatus();
};
scwin.customFormatterFileNm = function (data, formattedData, rowIndex, colIndex) {
    var fileSeq = dlt_file.getCellData(rowIndex, 'FILE_SEQ');
    var fileGrpSeq = dlt_file.getCellData(rowIndex, 'FILE_GRP_SEQ');
    if ($c.util.isEmpty($p, fileSeq) === false) {
        return '<a href=\'' + fileSeq + '\' target=\'_blank\'>' + formattedData + '</a>';
    } else {
        return formattedData;
    }
};
scwin.displayFileSize = function (value) {
    return $c.num.formatByte(value);
};
scwin.setUploadParam = function () {
    mpd_multiFileUpload.setParam(0, 'subDir', '');
    var fileCount = mpd_multiFileUpload.getFileCount();
    for (var idx = 1; idx <= fileCount; idx++) {
        mpd_multiFileUpload.setParam(idx, 'FILE_GRP_SEQ', scwin.fileGrpSeq);
    }
};
scwin.mpd_multiFileUpload_onerror = function (data) {
    $c.popuo.alert($p, '파일 업로드에 실패했습니다.');
};
scwin.undoFileUpload = function () {
    dlt_file.undoAll();
    dlt_file.removeRows(dlt_file.getInsertedIndex());
    mpd_multiFileUpload.removeAllFiles();
};
scwin.setFileUpload = function (option, callbackUploadDoneFunc) {
    try {
        if (com.util.isEmpty(option.fileGrpSeq) === false) {
            scwin.fileGrpSeq = option.fileGrpSeq;
        } else {
            scwin.fileGrpSeq = 0;
        }
        scwin.maxFileCount = option.maxFileCount;
        scwin.maxFileSize = option.maxFileSize;
        scwin.totalFileSize = option.totalFileSize;
        if (com.util.isEmpty(option.filter) == false) {
            scwin.filter = option.filter;
        }
        mpd_multiFileUpload.setMaxFileCount(scwin.maxFileCount);
        mpd_multiFileUpload.setMaxFileSize(scwin.maxFileSize);
        if (typeof option.subDir !== 'undefined') {
            scwin.subDir = option.subDir;
        }
        scwin.callbackFileUploadSetting();
    } catch (ex) {
        console.error(ex);
    }
};
scwin.startFileUpload = function () {
    try {
        if (mpd_multiFileUpload.getFileInfos().length > 0) {
            scwin.setUploadParam();
            mpd_multiFileUpload.startUpload();
        } else {
        }
    } catch (ex) {
        console.error(ex);
    }
};
scwin.getUpdatedFile = function () {
    return dlt_file.getModifiedJSON({ saveRemovedData: false });
};
scwin.btnfileDel_onclick = function (e) {
    var jsonData = dlt_file.getAllJSON();
    var delData = [];
    for (var i = jsonData.length - 1; i >= 0; i--) {
        if (jsonData[i].chk != '1') {
            continue;
        }
        if (jsonData[i].rowStatus == 'C' && jsonData[i].status != 'S') {
            dlt_file.removeRow(i);
        } else {
            dlt_file.deleteRow(i);
            var delJson = dlt_file.getRowJSON(i);
            delData.push(delJson);
        }
    }
    if (delData.length > 0) {
        scwin.emit_onFileDelete(delData);
    }
};
scwin.emit_onFileUploadDone = function (data) {
    $p.emit('onFileUploadDone', data);
};
scwin.emit_onFileDelete = function (delData) {
    $p.emit('onFileDelete', delData);
};
}}}]},{T:1,N:'style',A:{type:'text/css'},E:[{T:4,cdata:'.div_progress{display:inline-block;margin-left:3%;background-color:#0065b7;vertical-align:middle;text-align:center;color:#ffff}.div_progressNone{display:inline-block;margin-left:3%;vertical-align:middle;text-align:center}'}]}]},{T:1,N:'body',A:{'ev:onpageload':'scwin.onpageload'},E:[{T:1,N:'xf:group',A:{class:'',id:'',style:'','ev:ondrop':'return false;'},E:[{T:1,N:'xf:group',A:{class:'titbox',id:'',style:''},E:[{T:1,N:'xf:group',A:{id:'',class:'lt'},E:[{T:1,N:'xf:trigger',A:{style:'',id:'',type:'button',class:'btn_cm  row_add'},E:[{T:1,N:'xf:label',E:[{T:4,cdata:'추가'}]}]},{T:1,N:'xf:trigger',A:{class:'btn_cm  row_del',id:'btnfileDel',style:'',type:'button',nextTabID:'','ev:onclick':'scwin.btnfileDel_onclick'},E:[{T:1,N:'xf:label',E:[{T:4,cdata:'삭제'}]}]},{T:1,N:'w2:multiupload',A:{'ev:onComplete':'',maxcount:'','ev:onprogress':'scwin.mpd_multiFileUpload_onprogress',fireEventOnError:'',filter:'',mode:'html5_transparent','ev:ondone':'scwin.mpd_multiFileUpload_ondone','ev:onerror':'scwin.mpd_multiFileUpload_onerror',displaySizeUnit:'MB',action:'',style:'',wmode:'false',id:'mpd_multiFileUpload',maxsize:'1000000000',uploadButton:'',selectCallback:'scwin.selectCallback'}}]},{T:1,N:'xf:group',A:{class:'fl',id:'',style:''}},{T:1,N:'xf:group',A:{class:'rt mt10',id:'',style:''},E:[{T:1,N:'w2:textbox',A:{class:'ett',id:'',label:'파일 수 :',style:''}},{T:1,N:'w2:textbox',A:{class:'',id:'tbx_fileCount',label:'0개/ 10개',style:''}},{T:1,N:'w2:textbox',A:{class:'ett',id:'',label:'총 용량 :',style:''}},{T:1,N:'w2:textbox',A:{class:'',id:'tbx_fileSize',label:'0MB / 200MB',style:''}}]}]},{T:1,N:'xf:group',A:{adaptiveThreshold:'',class:'gvwbox',id:'',style:''},E:[{T:1,N:'w2:gridView',A:{autoFit:'allColumn',class:'gvw',dataList:'data:dlt_file',defaultCellHeight:'26',disabledScrollHidden:'','ev:oncellclick':'','ev:onheaderclick':'',focusMode:'row',id:'grd_file',rowNumVisible:'',rowNumWidth:'',rowStatusHeaderValue:'상태',rowStatusVisible:'true',rowStatusWidth:'50',scrollByColumn:'false',scrollByColumnAdaptive:'false',sortable:'true',style:'height:130px;width:100%;',visibleRowNum:'5',wheelRows:'0',readOnlyTabIgnore:'',summary:'',readOnlyBackgroundImgCSS:''},E:[{T:1,N:'w2:caption',A:{id:'caption1',style:'',value:'this is a grid caption.'}},{T:1,N:'w2:header',A:{id:'header1',style:''},E:[{T:1,N:'w2:row',A:{id:'row1',style:''},E:[{T:1,N:'w2:column',A:{blockSelect:'false',displayMode:'label',fixColumnWidth:'true',id:'chk',inputType:'checkbox',removeBorderStyle:'false',style:'',value:'선택',width:'40',checkboxLabel:'선택'}},{T:1,N:'w2:column',A:{blockSelect:'false',displayMode:'label',id:'column11',inputType:'text',removeBorderStyle:'false',style:'',value:'파일명',width:'350'}},{T:1,N:'w2:column',A:{blockSelect:'false',displayMode:'label',id:'column14',inputType:'text',removeBorderStyle:'false',style:'',value:'전송결과',width:'100'}},{T:1,N:'w2:column',A:{blockSelect:'false',displayMode:'label',id:'column7',inputType:'text',removeBorderStyle:'false',style:'',value:'파일크기',width:'100'}}]}]},{T:1,N:'w2:gBody',A:{id:'gBody1',style:''},E:[{T:1,N:'w2:row',A:{id:'row2',style:''},E:[{T:1,N:'w2:column',A:{blockSelect:'false',displayMode:'label',id:'chk',inputType:'checkbox',removeBorderStyle:'false',width:'30',checkboxLabel:'선택'}},{T:1,N:'w2:column',A:{blockSelect:'false',customFormatter:'scwin.customFormatterFileNm',displayMode:'label',id:'ORIGIN_FILE_NM',inputType:'text',readOnly:'true',removeBorderStyle:'false',textAlign:'left',width:'350'}},{T:1,N:'w2:column',A:{blockSelect:'false',class:'progress',dataType:'',displayFormatter:'scwin.setDisplayStatus',displayMode:'label',expression:'',id:'status',inputType:'text',readOnly:'true',removeBorderStyle:'false',width:'100',style:'',textAlign:'left'}},{T:1,N:'w2:column',A:{blockSelect:'false',displayFormatter:'scwin.displayFileSize',displayMode:'label',id:'FILE_SIZE',inputType:'text',readOnly:'true',removeBorderStyle:'false',textAlign:'right',width:'100'}}]}]}]}]}]}]}]}]})