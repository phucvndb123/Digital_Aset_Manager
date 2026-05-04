window.com = {};
com.sbm = {};
com.sbm.execute = function (sbmObj, requestData, compObj) {
    return new Promise(function (resolve, reject) {
        if (typeof sbmObj === 'object') {
            var _sbmObj = typeof sbmObj == 'object' ? sbmObj : typeof sbmObj == 'string' ? $p.getSubmission(sbmObj) : sbmObj;
            if (com.util.isEmpty(_sbmObj.action)) {
                var alertMsg = com.data.getMessage('MSG_CM_00002', 'action');
                com.win.alert(alertMsg);
                return false;
            }
            if (com.util.isEmpty(_sbmObj.submitDoneHandler)) {
                _sbmObj._promise_submitDoneHandler = function (rtn) {
                    resolve(rtn);
                };
            }
            if (com.util.isEmpty(_sbmObj.submitErrorHandler)) {
                _sbmObj._promise_submitErrorHandler = function (rtn) {
                    reject(rtn);
                };
            }
            $p.executeSubmission(_sbmObj, requestData, compObj);
        }
    });
};
com.sbm.executeDynamic = function (options, requestData, obj) {
    var submissionObj = com.util.getComponent(options.id);
    if (submissionObj === null) {
        com.sbm.create(options);
        submissionObj = com.util.getComponent(options.id);
    } else {
        $p.deleteSubmission(options.id);
        com.sbm.create(options);
        submissionObj = com.util.getComponent(options.id);
    }
    return com.sbm.execute(submissionObj, requestData, obj);
};
com.sbm.executeWorkflow = function (workflowObj) {
    $p.executeWorkflow(workflowObj);
};
com.sbm.create = function (options) {
    var ref = options.ref || '';
    var target = options.target || '';
    var action = options.action;
    var mode = options.mode || gcm.DEFAULT_OPTIONS_MODE;
    var mediatype = options.mediatype || gcm.DEFAULT_OPTIONS_MEDIATYPE;
    var method = (options.method || 'post').toLowerCase();
    var processMsg = options.processMsg || '';
    var instance = options.instance || 'none';
    var submitHandler = typeof options.submitHandler === 'function' ? options.submitHandler : typeof options.submitHandler === 'string' ? options.submitHandler.indexOf('scwin') === 0 ? $p.id + options.submitHandler : options.submitHandler : '';
    var submitDoneHandler = typeof options.submitDoneHandler === 'function' ? options.submitDoneHandler : typeof options.submitDoneHandler === 'string' ? options.submitDoneHandler.indexOf('scwin') === 0 ? $p.id + options.submitDoneHandler : options.submitDoneHandler : '';
    var submitErrorHandler = typeof options.submitErrorHandler === 'function' ? options.submitErrorHandler : typeof options.submitErrorHandler === 'string' ? options.submitErrorHandler.indexOf('scwin') === 0 ? $p.id + options.submitErrorHandler : options.submitErrorHandler : '';
    var resJson = null;
    if (options.isProcessMsg === true && processMsg === '') {
        processMsg = '해당 작업을 처리중입니다';
    } else if (options.isProcessMsg === false) {
        processMsg = '';
    }
    var submissionObj = {
        'id': options.id,
        'ref': ref,
        'target': target,
        'action': action,
        'method': method,
        'mediatype': mediatype,
        'encoding': 'UTF-8',
        'mode': mode,
        'processMsg': processMsg,
        'submitHandler': submitHandler,
        'submitDoneHandler': submitDoneHandler,
        'submitErrorHandler': submitErrorHandler
    };
    $p.createSubmission(submissionObj);
};
com.sbm.getResultCode = function (e) {
    var rsCode = gcm.MESSAGE_CODE.STATUS_ERROR;
    try {
        rsCode = e.responseJSON.rsMsg.statusCode;
    } catch (ex) {
        console.error('결과 상태 메세지가 없습니다.', ex);
    }
    return rsCode;
};
com.sbm.getStatusMessage = function (e) {
    try {
        return e.responseJSON.rsMsg.statusMsg;
    } catch (ex) {
        console.error('결과 상태 메세지가 없습니다.', ex);
        return '';
    }
};
com.sbm.resultMsg = function (resultData) {
    if (com.util.isEmpty(resultData.statusCode)) {
        return;
    }
    var message = resultData.message || resultData.statusMsg || '';
    var msgCode = gcm.MESSAGE_CODE;
    switch (resultData.statusCode) {
    case msgCode.STATUS_ERROR:
        if (resultData.errorCode == 'E0001') {
            var alertMsg = com.data.getMessage('MSG_CM_00003', message);
            com.win.alert(alertMsg, function () {
                gcm.win.reload();
            });
        } else if (com.util.isEmpty(message) === false) {
            com.win.alert(message);
        }
        break;
    case msgCode.STATUS_SUCCESS:
        if (com.util.isEmpty(message) === false) {
            com.win.showToastMessage(gcm.MESSAGE_CODE.STATUS_SUCCESS, message);
        }
        break;
    case msgCode.STATUS_INFO:
        com.win.showToastMessage(gcm.MESSAGE_CODE.STATUS_INFO, message);
        break;
    }
};
com.sbm.setAction = function (sbmObj, sbmAction) {
    try {
        if (!com.util.isEmpty(sbmObj)) {
            sbmObj.isDefultSubmissionAction = null;
            sbmObj.action = sbmAction || '';
            sbmObj.__action = sbmAction || '';
        }
    } catch (ex) {
        console.error(ex);
    }
};
com.data = {};
com.data.setCommonCode = function (codeOptions, callbackFunc) {
    var codeOptionsLen = 0;
    if (codeOptions) {
        codeOptionsLen = codeOptions.length;
    } else {
        console.error('=== com.setCommonCode Parameter Type Error ===\nex) com.setCommonCode([{"code:":"04","compID":"sbx_Gender"}],"scwin.callbackFunction")\n===================================');
        return;
    }
    var i, j, codeObj, dltId, dltIdArr = [], paramCode = '', compArr, compArrLen, tmpIdArr;
    var dataListOption = _getCodeDataListOptions(gcm.COMMON_CODE_INFO.FILED_ARR);
    for (i = 0; i < codeOptionsLen; i++) {
        codeObj = codeOptions[i];
        try {
            dltId = gcm.DATA_PREFIX + codeObj.code;
            if (typeof gcm.commonCodeList[dltId] !== 'undefined' && codeObj.useLocalCache === false) {
                delete gcm.commonCodeList[dltId];
                $p.data.remove(dltId);
            }
            if (typeof gcm.commonCodeList[dltId] === 'undefined') {
                dltIdArr.push(dltId);
                if (i > 0) {
                    paramCode += ',';
                }
                paramCode += codeObj.code;
                dataListOption.id = dltId;
                $p.data.create(dataListOption);
            } else {
                dataListOption.id = dltId;
                $p.data.create(dataListOption);
                var dataListObj = $p.getComponentById(dataListOption.id);
                dataListObj.setJSON(gcm.commonCodeList[dltId]);
            }
            if (codeObj.compID) {
                compArr = codeObj.compID.replaceAll(' ', '').split(',');
                compArrLen = compArr.length;
                for (j = 0; j < compArrLen; j++) {
                    tmpIdArr = compArr[j].split(':');
                    if (tmpIdArr.length === 1) {
                        var comp = com.util.getComponent(tmpIdArr[0]);
                        if (!com.util.isEmpty(comp)) {
                            comp.setNodeSet('data:' + dltId, gcm.COMMON_CODE_INFO.LABEL, gcm.COMMON_CODE_INFO.VALUE);
                        } else {
                            console.warn('[com.data.setCommonCode] Component(' + tmpIdArr[0] + ')를 찾을 수 없습니다.');
                        }
                    } else {
                        var gridObj = com.util.getComponent(tmpIdArr[0]);
                        if (!com.util.isEmpty(gridObj)) {
                            gridObj.setColumnNodeSet(tmpIdArr[1], 'data:' + dltId, gcm.COMMON_CODE_INFO.LABEL, gcm.COMMON_CODE_INFO.VALUE);
                        } else {
                            console.warn('[com.data.setCommonCode] GridView(' + tmpIdArr[0] + ')를 찾을 수 없습니다.');
                        }
                    }
                }
            }
        } catch (ex) {
            console.error(ex);
        }
    }
    var searchCodeGrpOption = {
        id: '_sbm_searchCode',
        action: '/common/selectCodeList',
        target: 'data:json,' + com.str.serialize(dltIdArr),
        isProcessMsg: false
    };
    searchCodeGrpOption.submitDoneHandler = function (e) {
        for (var codeGrpDataListId in e.responseJSON) {
            if (codeGrpDataListId.indexOf(gcm.DATA_PREFIX) > -1) {
                gcm.commonCodeList[codeGrpDataListId] = e.responseJSON[codeGrpDataListId];
            }
        }
        if (typeof callbackFunc === 'function') {
            callbackFunc();
        }
    };
    if (paramCode !== '') {
        if (com.util.isEmpty(com.util.getComponent(searchCodeGrpOption.id))) {
            com.sbm.create(searchCodeGrpOption);
        } else {
            $p.deleteSubmission(searchCodeGrpOption.id);
            com.sbm.create(searchCodeGrpOption);
        }
        var sbmObj = com.util.getComponent(searchCodeGrpOption.id);
        var reqData = {
            'dma_commonCode': {
                'GRP_CD': paramCode,
                'DATA_PREFIX': gcm.DATA_PREFIX
            }
        };
        sbmObj.setRequestData(reqData);
    } else {
        if (typeof callbackFunc === 'function') {
            callbackFunc();
        }
    }
    function _getCodeDataListOptions(infoArr) {
        var option = {
            'type': 'dataList',
            'option': {
                'baseNode': 'list',
                'repeatNode': 'map'
            },
            'columnInfo': []
        };
        for (var idx in infoArr) {
            option.columnInfo.push({ 'id': infoArr[idx] });
        }
        return option;
    }
};
com.data.getCommonCodeDataList = function (cdGrp) {
    return com.util.getComponent(gcm.DATA_PREFIX + cdGrp);
};
com.data.executeCommonCode = function () {
    var sbmSearchCode = com.util.getComponent('_sbm_searchCode');
    com.sbm.execute(sbmSearchCode);
};
com.data.getParameter = function (paramKey) {
    return gcm.data.getParameter($p, paramKey);
};
com.data.getColumnName = function (comObj) {
    try {
        if (typeof comObj.getRef === 'function') {
            var ref = comObj.getRef();
            var refArray = ref.substring(5).split('.');
            var dataCollectionName = refArray[0];
            var columnId = refArray[1];
            if (typeof refArray !== 'undefined' && refArray.length === 2) {
                var dataCollection = comObj.getScopeWindow().$p.getComponentById(dataCollectionName);
                var dataType = dataCollection.getObjectType().toLowerCase();
                if (dataType === 'datamap') {
                    return dataCollection.getName(columnId);
                } else if (dataType === 'datalist') {
                    return dataCollection.getColumnName(columnId);
                }
            } else {
                return '';
            }
        }
    } catch (ex) {
        console.error(ex);
    } finally {
        dataCollection = null;
    }
};
com.data.getDataCollection = function (comObj) {
    try {
        if (typeof comObj !== 'undefined' && typeof comObj.getRef === 'function') {
            if (comObj.getPluginName() === 'gridView') {
                return comObj.getDataListInfo();
            } else {
                var ref = comObj.options.ref;
                if (typeof ref !== 'undefined' && ref !== '') {
                    var refArray = ref.substring(5).split('.');
                    if (typeof refArray !== 'undefined' && refArray.length === 2) {
                        var dataObjInfo = {};
                        dataObjInfo.runtimeDataCollectionId = comObj.getScopeWindow().$p.getFrameId() + '_' + refArray[0];
                        dataObjInfo.dataColletionId = refArray[0];
                        dataObjInfo.columnId = refArray[1];
                        return dataObjInfo;
                    } else {
                        return null;
                    }
                } else {
                    return null;
                }
            }
        }
    } catch (e) {
        console.error('[com.data.getDataCollection] Exception :: ' + e.message);
    }
};
com.data.getMessage = function (msgId) {
    var message = '';
    if (com.util.isEmpty(msgId) === false) {
        message = WebSquare.WebSquareLang[msgId];
    }
    if (com.util.isEmpty(message) === false) {
        var tmpMessage = message;
        if (arguments.length > 1) {
            for (var i = 2; i < arguments.length; i++) {
                if (com.util.isEmpty(arguments[i]) === false) {
                    tmpMessage = tmpMessage.indexOf('$[' + (i - 1) + ']') != -1 ? com.str.replaceAll(tmpMessage, '$[' + (i - 1) + ']', arguments[i]) : tmpMessage;
                }
            }
            return tmpMessage;
        } else {
            return tmpMessage;
        }
    } else {
        return '';
    }
};
com.data.isModified = function (dcObjArr) {
    var result = false;
    if (com.util.getObjectType(dcObjArr) === 'array') {
        for (var idx in dcObjArr) {
            if (com.util.getObjectType(dcObjArr[idx]) === 'object') {
                if (isModified(dcObjArr[idx]) === true) {
                    result = true;
                }
            }
        }
    } else if (com.util.getObjectType(dcObjArr) === 'object') {
        result = isModified(dcObjArr);
    }
    return result;
    function isModified(dcObj) {
        if (typeof dcObj !== 'undefined' && typeof dcObj !== null) {
            var modifiedIndex = dcObj.getModifiedIndex();
            if (modifiedIndex.length === 0) {
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    }
};
com.data.downloadMultipleDataList = function (optionsParam, infoArrParam) {
    var options = {
        common: {
            fileName: optionsParam.common.fileName || 'dataList.xlsx',
            showProcess: optionsParam.common.showProcess || true,
            autoSizeColumn: optionsParam.common.autoSizeColumn || false,
            multipleSheet: optionsParam.common.multipleSheet || true,
            printSet: optionsParam.common.printSet || {}
        },
        excelInfo: []
    };
    if (optionsParam.excelInfo.length > 0) {
        var excelInfoCount = optionsParam.excelInfo.length;
        for (var idx = 0; idx < excelInfoCount; idx++) {
            var wframeId = optionsParam.excelInfo[idx].wframeId || $p.getFrameId();
            var dataListId = optionsParam.excelInfo[idx].dataListId;
            var dataListObj = null;
            if (com.util.isEmpty(wframeId) === false) {
                dataListObj = $p.getComponentById(wframeId + '_' + dataListId);
            } else {
                dataListObj = $p.getComponentById(dataListId);
            }
            if (typeof dataListObj === 'undefined') {
                console.warn('[com.data.downloadMultipleDataList] excelInfo.dataListId에 설정된 DataList(' + dataListId + ')를 찾을 수 없습니다.');
                return;
            }
            var excelInfo = {
                dataListId: dataListId,
                sheetName: optionsParam.excelInfo[idx].sheetName || dataListId,
                removeColumns: optionsParam.excelInfo[idx].removeColumns || '',
                foldColumns: optionsParam.excelInfo[idx].foldColumns || '',
                startRowIndex: optionsParam.excelInfo[idx].startRowIndex || 0,
                startColumnIndex: optionsParam.excelInfo[idx].startColumnIndex || 0,
                headerColor: optionsParam.excelInfo[idx].headerColor || '#33CCCC',
                bodyColor: optionsParam.excelInfo[idx].bodyColor || '#FFFFFF',
                wframeId: wframeId,
                infoArr: optionsParam.excelInfo[idx].infoArr
            };
            options.excelInfo.push(excelInfo);
        }
    } else {
        console.warn('[com.data.downloadMultipleDataList] options.excelInfo 정보가 입력되지 않았습니다.');
        return;
    }
    WebSquare.util.multipleDataListDownload(options, infoArrParam);
};
com.data.downloadMultipleGridView = function (optionsParam, infoArrParam) {
    var options = {
        common: {
            fileName: optionsParam.common.fileName || 'gridView.xlsx',
            showProcess: optionsParam.common.showProcess || true,
            autoSizeColumn: optionsParam.common.autoSizeColumn || false,
            multipleSheet: optionsParam.common.multipleSheet || true,
            printSet: optionsParam.common.printSet || {}
        },
        excelInfo: []
    };
    if (optionsParam.excelInfo.length > 0) {
        var excelInfoCount = optionsParam.excelInfo.length;
        for (var idx = 0; idx < excelInfoCount; idx++) {
            var wframeId = optionsParam.excelInfo[idx].wframeId || $p.getFrameId();
            var gridId = optionsParam.excelInfo[idx].gridId;
            var gridObj = null;
            if (com.util.isEmpty(wframeId) === false) {
                gridObj = $p.getComponentById(wframeId + '_' + gridId);
            } else {
                gridObj = $p.getComponentById(gridId);
            }
            if (typeof gridObj === 'undefined') {
                console.warn('[com.data.downloadMultipleDataList] excelInfo.gridId에 설정된 ' + gridId + ' GridView를 찾을 수 없습니다.');
                return;
            }
            var excelInfo = {
                gridId: gridId,
                sheetName: optionsParam.excelInfo[idx].sheetName || gridId,
                removeColumns: optionsParam.excelInfo[idx].removeColumns || '',
                foldColumns: optionsParam.excelInfo[idx].foldColumns || '',
                startRowIndex: optionsParam.excelInfo[idx].startRowIndex || 0,
                startColumnIndex: optionsParam.excelInfo[idx].startColumnIndex || 0,
                headerColor: optionsParam.excelInfo[idx].headerColor || '#33CCCC',
                bodyColor: optionsParam.excelInfo[idx].bodyColor || '#FFFFFF',
                wframeId: wframeId,
                infoArr: optionsParam.excelInfo[idx].infoArr
            };
            options.excelInfo.push(excelInfo);
        }
    } else {
        console.warn('[com.data.downloadMultipleGridView] options.excelInfo 정보가 입력되지 않았습니다.');
        return;
    }
    WebSquare.util.multipleExcelDownload(options, infoArrParam);
};
com.data.downloadGridViewExcel = function (grdObj, options, infoArr) {
    if (com.util.isEmpty(options)) {
        options = {};
    }
    if (typeof infoArr === 'undefined') {
        infoArr = {};
    }
    gcm.data.setDownloadGridViewOption(grdObj, options);
    var opts = {
        fileName: options.fileName || 'excel.xlsx',
        sheetName: options.sheetName || 'sheet',
        type: options.type || '0',
        convertIndex: options.convertIndex || '',
        removeColumns: options.removeColumns || '',
        removeHeaderRows: options.removeHeaderRows || '',
        foldColumns: options.foldColumns || '',
        useHeaderCheckBoxLabel: options.useHeaderCheckBoxLabel || 'true',
        startRowIndex: options.startRowIndex || 0,
        startColumnIndex: options.startColumnIndex || 0,
        headerColor: options.headerColor || '#eeeeee',
        headerFontName: options.headerFontName || '',
        headerFontSize: options.headerFontSize || '10',
        headerFontColor: options.headerFontColor || '',
        bodyColor: options.bodyColor || '#FFFFFF',
        bodyFontName: options.bodyFontName || '',
        bodyFontSize: options.bodyFontSize || '10',
        bodyFontColor: options.bodyFontColor || '',
        subTotalColor: options.subTotalColor || '#CCFFCC',
        subTotalFontName: options.subTotalFontName || '',
        subTotalFontSize: options.subTotalFontSize || '10',
        subTotalFontColor: options.subTotalFontColor || '',
        footerColor: options.footerColor || '#008000',
        footerFontName: options.footerFontName || '',
        footerFontSize: options.footerFontSize || '10',
        footerFontColor: options.footerFontColor || '',
        oddRowBackgroundColor: options.oddRowBackgroundColor || '',
        evenRowBackgroundColor: options.evenRowBackgroundColor || '',
        rowNumHeaderColor: options.rowNumHeaderColor || '',
        rowNumHeaderFontName: options.rowNumHeaderFontName || '',
        rowNumHeaderFontSize: options.rowNumHeaderFontSize || '',
        rowNumHeaderFontColor: options.rowNumHeaderFontColor || '',
        rowNumBodyColor: options.rowNumBodyColor || '',
        rowNumBodyFontName: options.rowNumBodyFontName || '',
        rowNumBodyFontSize: options.rowNumBodyFontSize || '',
        rowNumBodyFontColor: options.rowNumBodyFontColor || '',
        rowNumFooterColor: options.rowNumFooterColor || '',
        rowNumFooterFontName: options.rowNumFooterFontName || '',
        rowNumFooterFontSize: options.rowNumFooterFontSize || '',
        rowNumFooterFontColor: options.rowNumFooterFontColor || '',
        rowNumSubTotalColor: options.rowNumSubTotalColor || '',
        rowNumSubTotalFontName: options.rowNumSubTotalFontName || '',
        rowNumSubTotalFontSize: options.rowNumSubTotalFontSize || '',
        rowNumSubTotalFontColor: options.rowNumSubTotalFontColor || '',
        rowNumHeaderValue: options.rowNumHeaderValue || '',
        rowNumVisible: options.rowNumVisible || 'false',
        showProcess: WebSquare.util.getBoolean(options.showProcess) || true,
        massStorage: WebSquare.util.getBoolean(options.massStorage) || true,
        showConfirm: WebSquare.util.getBoolean(options.showConfirm) || false,
        dataProvider: options.dataProvider || '',
        splitProvider: options.splitProvider || '',
        providerRequestXml: options.providerRequestXml || '',
        userDataXml: options.userDataXml || '',
        bodyWordwrap: WebSquare.util.getBoolean(options.bodyWordwrap) || false,
        useEuroLocale: options.useEuroLocale || 'false',
        useHeader: options.useHeader || 'true',
        useSubTotal: options.useSubTotal || 'false',
        useFooter: options.useFooter || 'true',
        separator: options.separator || ',',
        subTotalScale: options.subTotalScale || -1,
        subTotalRoundingMode: options.subTotalRoundingMode || '',
        useStyle: options.useStyle || '',
        freezePane: options.freezePane || '',
        autoSizeColumn: options.autoSizeColumn || 'false',
        displayGridlines: options.displayGridlines || '',
        colMerge: options.colMerge || '',
        colMergeTextAlign: options.colMergeTextAlign || 'center',
        mergeCell: options.mergeCell || 'false',
        useDataFormat: options.useDataFormat || '',
        useHeaderDataFormat: options.useHeaderDataFormat || '',
        customToDataType: options.customToDataType || '',
        indent: options.indent || '',
        columnMove: options.columnMove || '',
        columnOrder: options.columnOrder || '',
        fitToPage: options.fitToPage || 'false',
        landScape: options.landScape || 'false',
        fitWidth: options.fitWidth || '1',
        fitHeight: options.fitHeight || '1',
        scale: options.scale || '100',
        pageSize: options.pageSize || 'A4',
        lazyInfoArr: options.lazyInfoArr || 'false',
        dataHandler: options.dataHandler || '',
        onSuccessCallback: options.onSuccessCallback || function (e) {
        },
        onFailureCallback: options.onFailureCallback || function (e) {
        }
    };
    grdObj.advancedExcelDownload(opts, infoArr);
};
com.data.downloadGridViewCSV = function (grdObj, options) {
    if (com.util.isEmpty(options)) {
        options = {};
    }
    gcm.data.setDownloadGridViewOption(grdObj, options);
    var opts = {
        fileName: options.fileName || 'excel.csv',
        type: options.type || '1',
        delim: options.delim || ',',
        removeColumns: options.removeColumns || '',
        header: options.header || '1',
        hidden: options.hidden || 0,
        checkButton: options.checkButton || '1',
        saveList: options.saveList || ''
    };
    grdObj.saveCSV(opts);
};
com.data.uploadGridViewExcel = function (grdObj, options) {
    if (com.util.isEmpty(options)) {
        options = {};
    }
    var width = '490';
    var height = '218';
    var top = document.body.offsetHeight / 2 - parseInt(height) / 2 + $(document).scrollTop();
    var left = document.body.offsetWidth / 2 - parseInt(width) / 2 + $(document).scrollLeft();
    var opts = {
        type: options.type || '0',
        sheetNo: options.sheetNo || 0,
        sheetName: options.sheetName || '',
        activeSheet: options.activeSheet || false,
        startRowIndex: options.startRowIndex || 1,
        startColumnIndex: options.startColumnIndex || 0,
        endColumnIndex: options.endColumnIndex || 0,
        headerExist: options.headerExist || '0',
        footerExist: options.footerExist || '1',
        append: options.append || '0',
        hidden: options.hidden || '0',
        fillHidden: options.fillHidden || '0',
        skipSpace: options.skipSpace || '0',
        useMaxByteLength: options.useMaxByteLength || false,
        byteCheckEncoding: options.byteCheckEncoding || 'EUC-KR',
        dateFormat: options.dateFormat || 'yyyy-MM-dd',
        decimal: options.decimal || 4,
        trim: options.trim || 0,
        insertColumns: options.insertColumns || '',
        removeColumns: options.removeColumns || '',
        useModalDisable: options.useModalDisable || false,
        cellDataConvertor: options.cellDataConvertor || '',
        optionParam: options.optionParam || undefined,
        popupUrl: options.popupUrl || '',
        status: options.status || 'R',
        pwd: options.pwd || '',
        features: 'top=' + top + ',height=' + height + ',left=' + left + ',width=' + width + ',location=no,menubar=no,resizable=yes,scrollbars=auto,status=no,titlebar=yes,toolbar=no',
        wframe: true
    };
    grdObj.advancedExcelUpload(opts);
};
com.data.uploadGridViewCSV = function (grdObj, options) {
    if (com.util.isEmpty(options)) {
        options = {};
    }
    var width = '490';
    var height = '218';
    var top = document.body.offsetHeight / 2 - parseInt(height) / 2 + $(document).scrollTop();
    var left = document.body.offsetWidth / 2 - parseInt(width) / 2 + $(document).scrollLeft();
    var opts = {
        type: options.type || '0',
        header: options.header || '0',
        delim: options.delim || ',',
        escapeChar: options.escapeChar || '',
        startRowIndex: options.startRowIndex || 0,
        append: options.append || '0',
        hidden: options.hidden || 1,
        fillHidden: options.fillHidden || '0',
        skipSpace: options.skipSpace || '0',
        expression: options.expression || '1',
        popupUrl: options.popupUrl || '',
        features: 'top=' + top + ',height=' + height + ',left=' + left + ',width=' + width + ',location=no,menubar=no,resizable=yes,scrollbars=auto,status=no,titlebar=yes,toolbar=no',
        wframe: true
    };
    grdObj.readCSV(opts);
};
com.data.validateGroup = function (grpObj, valInfoArr, tacObj, tabId) {
    var objArr = com.util.getChildren(grpObj, {
        includePlugin: 'checkbox checkcombobox datePicker editor input inputCalendar multiselect radio selectbox searchbox secret textarea',
        recursive: true
    });
    var errors = [];
    try {
        for (var objIdx in objArr) {
            var obj = objArr[objIdx];
            var dataObjInfo = com.data.getDataCollection(obj);
            var dataCollection = null;
            var columnId = null;
            var value = null;
            if (dataObjInfo !== undefined && dataObjInfo !== null) {
                dataCollection = $p.getComponentById(dataObjInfo.runtimeDataCollectionId);
                columnId = dataObjInfo.columnId;
            }
            if (dataCollection !== null && dataCollection.getObjectType() === 'dataMap') {
                value = dataCollection.get(dataObjInfo.columnId);
                if (typeof value === 'string') {
                    value = value.trim();
                }
            } else {
                var tempIdArr = obj.getID().split('_');
                if (obj.getPluginName() !== 'editor') {
                    if (typeof obj.getValue === 'function') {
                        value = obj.getValue();
                        if (typeof value === 'string') {
                            value = value.trim();
                        }
                    } else {
                        continue;
                    }
                } else {
                    value = obj.getHTML();
                    if (typeof value === 'string') {
                        value = value.trim();
                    }
                }
            }
            var valInfo = { id: columnId };
            var isVaild = false;
            for (var valIdx in valInfoArr) {
                if (typeof valInfoArr[valIdx].id !== 'undefined' && valInfoArr[valIdx].id === columnId) {
                    valInfo = valInfoArr[valIdx];
                    isVaild = true;
                    break;
                }
            }
            if (typeof objArr[objIdx].options.mandatory !== 'undefined' && objArr[objIdx].options.mandatory) {
                valInfo.mandatory = true;
                isVaild = true;
            }
            if (typeof objArr[objIdx].options.minlength !== 'undefined' && objArr[objIdx].options.minlength > 0 && objArr[objIdx].getPluginName() !== 'inputCalendar') {
                valInfo.minLength = objArr[objIdx].options.minlength;
                isVaild = true;
            }
            if (typeof objArr[objIdx].options.minByteLength !== 'undefined' && objArr[objIdx].options.minByteLength > 0 && objArr[objIdx].getPluginName() !== 'inputCalendar') {
                valInfo.minByteLength = objArr[objIdx].options.minByteLength;
                isVaild = true;
            }
            if (isVaild === true) {
                _setResult(dataCollection, obj.getID(), valInfo, value);
            }
        }
        if (errors.length > 0) {
            if (typeof tacObj !== 'undefined' && typeof tabId !== 'undefined' && tabId !== '') {
                var tabIndex = tacObj.getTabIndex(tabId);
                Promise.resolve().then(function () {
                    return tacObj.setSelectedTabIndex(tabIndex);
                });
            }
            var option = { callBackParam: { 'objId': errors[0].objId } };
            com.win.alert(errors[0].message, function (param) {
                var obj = $p.getComponentById(param.objId);
                obj.focus();
            }, option);
            return false;
        } else {
            return true;
        }
        function _setResult(dataCollection, objId, valInfo, value) {
            var msgInfo = gcm.data.getValResultMsg(valInfo, value);
            if (com.util.isEmpty(msgInfo.message) === false) {
                var comObj = $p.getComponentById(objId);
                var errIdx = errors.length;
                errors[errIdx] = {};
                errors[errIdx].columnId = valInfo.id;
                errors[errIdx].objId = objId;
                if (com.util.isEmpty(valInfo.label) === false) {
                    errors[errIdx].columnName = valInfo.label;
                } else if (com.util.isEmpty(dataCollection) === false) {
                    errors[errIdx].columnName = com.data.getColumnName(comObj);
                } else if (typeof comObj.getInvalidMessage === 'function') {
                    errors[errIdx].columnName = comObj.getInvalidMessage();
                }
                if (msgInfo.msgType == '2') {
                    errors[errIdx].message = msgInfo.message;
                } else {
                    if (com.util.isEmpty(errors[errIdx].columnName) === false) {
                        errors[errIdx].message = com.str.attachPostposition(errors[errIdx].columnName) + ' ' + msgInfo.message;
                    } else {
                        errors[errIdx].message = msgInfo.message;
                    }
                }
            }
        }
    } catch (ex) {
        console.error('Exception :: Object Id : ' + obj.getID() + ', Plug-in Name: ' + obj.getPluginName() + ', ' + ex.message);
    } finally {
        objArr = null;
    }
};
com.data.validateGridView = function (gridViewObj, valInfoArr, tacObj, tabId) {
    if (gridViewObj === null) {
        return false;
    }
    var dataList = com.util.getGridViewDataList(gridViewObj);
    if (dataList === null) {
        return false;
    }
    var errors = [];
    try {
        var modifiedIdx = dataList.getModifiedIndex();
        for (var dataIdx = 0; dataIdx < modifiedIdx.length; dataIdx++) {
            var valInfo = {};
            var isVaild = false;
            var modifiedData = dataList.getRowJSON(modifiedIdx[dataIdx]);
            if (modifiedData.rowStatus === 'D') {
                continue;
            }
            for (var valIdx in valInfoArr) {
                if (typeof valInfoArr[valIdx].id !== 'undefined' && modifiedData[valInfoArr[valIdx].id] !== 'undefined') {
                    var value = modifiedData[valInfoArr[valIdx].id];
                    if (typeof value === 'string') {
                        value = value.trim();
                    }
                    _setResult(modifiedIdx[dataIdx], dataList, gridViewObj.getID(), valInfoArr[valIdx], value);
                }
            }
        }
        if (errors.length > 0) {
            if (typeof tacObj !== 'undefined' && typeof tabId !== 'undefined' && tabId !== '') {
                var tabIndex = tacObj.getTabIndex(tabId);
                tacObj.setSelectedTabIndex(tabIndex);
            }
            var option = {
                callBackParam: {
                    'objId': errors[0].objId,
                    'columnId': errors[0].columnId,
                    'rowIndex': errors[0].rowIndex
                }
            };
            com.win.alert(errors[0].message, function (param) {
                var grdiViewObj = $p.getComponentById(param.objId);
                grdiViewObj.setFocusedCell(param.rowIndex, param.columnId, true);
            }, option);
            return false;
        } else {
            return true;
        }
        function _setResult(rowIndex, dataList, gridViewObjId, valInfo, value) {
            var msgInfo = gcm.data.getValResultMsg(valInfo, value, dataList, rowIndex);
            if (com.util.isEmpty(msgInfo.message) === false) {
                var errIdx = errors.length;
                errors[errIdx] = {};
                errors[errIdx].columnId = valInfo.id;
                errors[errIdx].objId = gridViewObjId;
                if (com.util.isEmpty(valInfo.label) === false) {
                    errors[errIdx].columnName = valInfo.label;
                } else {
                    errors[errIdx].columnName = dataList.getColumnName(valInfo.id);
                }
                errors[errIdx].rowIndex = rowIndex;
                if (msgInfo.msgType == '2') {
                    errors[errIdx].message = msgInfo.message;
                } else {
                    errors[errIdx].message = com.str.attachPostposition(errors[errIdx].columnName) + ' ' + msgInfo.message;
                }
            }
        }
    } catch (ex) {
        console.error(ex);
    }
};
com.data.createDataList = function (dsId, colArr, typeArr, options) {
    try {
        var dltObj = com.util.getComponent(dsId);
        if (!com.util.isEmpty(dltObj)) {
            $p.data.remove(dsId);
        }
        var colInfoJSON = [];
        if (typeof colArr !== 'undefined') {
            colInfoJSON = [];
            for (var i = 0; i < colArr.length; i++) {
                var dataType = 'text';
                if (typeof typeArr !== 'undefined') {
                    dataType = typeArr[i];
                }
                var colInfo = {
                    'id': colArr[i],
                    'dataType': dataType,
                    'name': colArr[i]
                };
                colInfoJSON.push(colInfo);
            }
        }
        if (typeof options === 'undefined') {
            options = {};
            options.baseNode = 'list';
            options.repeatNode = 'map';
            options.saveRemovedData = 'true';
        }
        ;
        var dataCollectionJSON = {
            id: dsId,
            type: 'dataList',
            option: {
                'baseNode': options.baseNode || 'list',
                'repeatNode': options.repeatNode || 'map',
                'saveRemovedData': options.saveRemovedData || 'true'
            },
            columnInfo: colInfoJSON
        };
        var codeDataObj = $p.data.create(dataCollectionJSON);
        return com.util.getComponent(dsId);
    } catch (ex) {
        console.error(ex);
    }
};
com.data.createDataMap = function (dsId, colArr, typeArr, options) {
    try {
        var dltObj = com.util.getComponent(dsId);
        if (!com.util.isEmpty(dltObj)) {
            $p.data.remove(dsId);
        }
        var colInfoJSON = [];
        if (typeof colArr !== 'undefined') {
            colInfoJSON = [];
            for (var i = 0; i < colArr.length; i++) {
                var dataType = 'text';
                if (typeof typeArr !== 'undefined') {
                    dataType = typeArr[i];
                }
                var colInfo = {
                    'id': colArr[i],
                    'type': dataType,
                    'name': colArr[i]
                };
                colInfoJSON.push(colInfo);
            }
        }
        if (typeof options === 'undefined') {
            options = { 'baseNode': 'map' };
        }
        ;
        var dataCollectionJSON = {
            'id': dsId,
            'type': 'dataMap',
            'option': { 'baseNode': options.baseNode || 'map' },
            'keyInfo': colInfoJSON
        };
        $p.data.create(dataCollectionJSON);
        return com.util.getComponent(dsId);
    } catch (ex) {
        console.error(ex);
    }
};
com.data.undoAll = function (dltId) {
    try {
        var dltObj = null;
        if (typeof dltId === 'string') {
            dltObj = com.util.getComponent(dltId);
        } else {
            dltObj = dltId;
        }
        var rowCount = dltObj.getRowCount();
        var removeIdx = [];
        var undoIdx = [];
        dltObj.setBroadcast(false);
        for (var i = 0; i < rowCount; i++) {
            if (dltObj.getRowStatus(i) == 'C') {
                removeIdx.push(i);
                continue;
            }
            undoIdx.push(i);
        }
        dltObj.removeRows(removeIdx);
        dltObj.undoRows(undoIdx);
        dltObj.setBroadcast(true, true);
    } catch (ex) {
        console.error(ex);
    }
};
com.data.undoRow = function (dltId) {
    try {
        var dltObj = null;
        if (typeof dltId === 'string') {
            dltObj = com.util.getComponent(dltId);
        } else {
            dltObj = dltId;
        }
        var checkedIdx = dltObj.getMatchedIndex('chk', '1');
        dltObj.setBroadcast(false);
        for (var idx = checkedIdx.length - 1; idx >= 0; idx--) {
            if (dltObj.getRowStatus(checkedIdx[idx]) == 'C') {
                dltObj.removeRow(checkedIdx[idx]);
            } else {
                dltObj.undoRow(checkedIdx[idx]);
            }
        }
        dltObj.setBroadcast(true, true);
    } catch (ex) {
        console.error(ex);
    }
};
com.data.undoGridView = function (grdId) {
    try {
        var grdObj = null;
        if (typeof grdId === 'string') {
            grdObj = com.util.getComponent(grdId);
        } else {
            grdObj = grdId;
        }
        if (typeof grdObj === 'object' && grdObj !== '') {
            var dltObj = com.util.getGridViewDataList(grdObj);
            if (dltObj === null) {
                return;
            }
            if (com.data.isModified(dltObj)) {
                com.win.confirm(com.data.getMessage('MSG_CM_00052'), function (res) {
                    if (res.clickValue === true) {
                        com.data.undoAll(dltObj);
                    }
                });
            }
        }
    } catch (ex) {
        console.error(ex);
    }
};
com.data.deleteRow = function (dltId) {
    try {
        var dltObj = null;
        if (typeof dltId === 'string') {
            dltObj = com.util.getComponent(dltId);
        } else {
            dltObj = dltId;
        }
        var checkedIdx = dltObj.getMatchedIndex('chk', '1');
        dltObj.setBroadcast(false);
        for (var idx = checkedIdx.length - 1; idx >= 0; idx--) {
            if (dltObj.getRowStatus(checkedIdx[idx]) == 'C') {
                dltObj.removeRow(checkedIdx[idx]);
            } else {
                dltObj.deleteRow(checkedIdx[idx]);
                dltObj.setCellData(checkedIdx[idx], 'chk', '');
            }
        }
        dltObj.setBroadcast(true, true);
    } catch (ex) {
        console.error(ex);
    }
};
com.data.insertRow = function (grdId) {
    try {
        var grdObj = null;
        if (typeof grdId === 'string') {
            grdObj = com.util.getComponent(grdId);
        } else {
            grdObj = grdId;
        }
        if (typeof grdObj === 'object' && grdObj !== '') {
            var dltObj = com.util.getGridViewDataList(grdObj);
            if (dltObj === null) {
                return;
            }
            var focusedRowIdx = grdObj.getFocusedRowIndex();
            if (focusedRowIdx > -1) {
                return dltObj.insertRow(focusedRowIdx + 1);
            } else {
                return dltObj.insertRow();
            }
        }
    } catch (ex) {
        console.error(ex);
    }
};
com.data.getMatchedJSON = function (dataListObj, condArr) {
    if (typeof dataListObj === 'string') {
        dataListObj = $p.getComponentById(dataListObj);
    }
    var returnData = [];
    var allData = dataListObj.getAllJSON();
    if (com.util.isArray(condArr) === false) {
        condArr = [condArr];
    }
    for (var idx = 0; idx < allData.length; idx++) {
        var result = true;
        for (var conIdx = 0; conIdx < condArr.length; conIdx++) {
            var colValue = allData[idx][condArr[conIdx].columnId.trim()];
            var value = condArr[conIdx].value;
            var operator = condArr[conIdx].operator.trim();
            var logical = (condArr[conIdx].logical || '&&').trim();
            if (operator === '==') {
                if (colValue == value) {
                    if (logical === '||') {
                        result = true;
                        break;
                    }
                } else {
                    if (logical === '&&') {
                        result = false;
                    }
                }
            } else if (operator === '!=') {
                if (colValue != value) {
                    if (logical === '||') {
                        result = true;
                        break;
                    }
                } else {
                    if (logical === '&&') {
                        result = false;
                    }
                }
            } else if (operator === '>') {
                if (colValue > value) {
                    if (logical === '||') {
                        result = true;
                        break;
                    }
                } else {
                    if (logical === '&&') {
                        result = false;
                    }
                }
            } else if (operator === '<') {
                if (colValue < value) {
                    if (logical === '||') {
                        result = true;
                        break;
                    }
                } else {
                    if (logical === '&&') {
                        result = false;
                    }
                }
            } else if (operator === '>=') {
                if (colValue >= value) {
                    if (logical === '||') {
                        result = true;
                        break;
                    }
                } else {
                    if (logical === '&&') {
                        result = false;
                    }
                }
            } else if (operator === '<=') {
                if (colValue <= value) {
                    if (logical === '||') {
                        result = true;
                        break;
                    }
                } else {
                    if (logical === '&&') {
                        result = false;
                    }
                }
            } else if (operator === 'LIKE') {
                if (colValue.indexOf(value) > -1) {
                    if (logical === '||') {
                        result = true;
                        break;
                    }
                } else {
                    if (logical === '&&') {
                        result = false;
                    }
                }
            } else {
                result = false;
            }
        }
        if (result === true) {
            returnData.push(allData[idx]);
        }
    }
    return returnData;
};
com.data.setChangeCheckedDc = function (dataObjArr) {
    gcm.data.setChangeCheckedDc($p, dataObjArr);
};
com.data.setUserData = function (comObj, key, value) {
    comObj.setUserData('__' + key, value);
};
com.data.getUserData = function (comObj, key) {
    return comObj.getUserData('__' + key);
};
com.util = {};
com.util.getJSON = function (value) {
    try {
        if (com.util.isXmlDoc(value) === true) {
            return JSON.parse(WebSquare.json.XML2JSONString(value));
        } else {
            return JSON.parse(value);
        }
    } catch (ex) {
        return value;
    }
};
com.util.isJSON = function (json) {
    try {
        if (typeof json === 'object') {
            try {
                if (com.util.isArray(json)) {
                    if (com.util.isPlainObject(json[0])) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    if (com.util.isPlainObject(json)) {
                        return true;
                    } else {
                        return false;
                    }
                }
            } catch (ex) {
                return false;
            }
        } else if (typeof json === 'string' && com.util.isPlainObject(json)) {
            try {
                var jsonObj = JSON.parse(json);
                if (com.util.isArray(jsonObj)) {
                    if (com.util.isPlainObject(jsonObj[0])) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return true;
                }
            } catch (ex) {
                console.error(ex);
                return false;
            }
        }
        return false;
    } catch (ex) {
        console.error(ex);
        return false;
    }
};
com.util.isArray = function (array) {
    try {
        if (typeof array !== 'undefined' && array !== null && typeof array == 'object') {
            if (array.constructor.name && array.constructor.name.toLowerCase() == 'array')
                return true;
            if (array.constructor && array.constructor == Array)
                return true;
        }
        return false;
    } catch (ex) {
        console.error(ex);
        return false;
    }
};
com.util.isEmpty = function (value) {
    if (typeof value === 'undefined' || value === null || value === '') {
        return true;
    } else {
        return false;
    }
};
com.util.getObjectType = function (obj) {
    var objType = typeof obj;
    if (objType !== 'object') {
        return objType;
    } else if (com.util.isArray(obj)) {
        return 'array';
    } else if (com.util.isJSON(obj)) {
        return 'json';
    } else if (objType === 'object' && com.util.isJSON(obj) === false) {
        return 'object';
    } else if (obj === null) {
        return 'null';
    } else {
        var tmpDoc = WebSquare.xml.parse('<data></data>');
        if (obj.constructor === tmpDoc.constructor || obj.constructor === tmpDoc.childNodes[0].constructor) {
            return 'xml';
        } else {
            return objType;
        }
    }
};
com.util.isPlainObject = function (obj) {
    var consObj, protObj;
    if (Object.prototype.toString.call(obj) !== '[object Object]')
        return false;
    consObj = obj.constructor;
    if (consObj === undefined)
        return true;
    protObj = consObj.prototype;
    if (Object.prototype.toString.call(protObj) !== '[object Object]')
        return false;
    if (protObj.hasOwnProperty('isPrototypeOf') === false) {
        return false;
    }
    return true;
};
com.util.isMobile = function () {
    return WebSquare.util.isMobile();
};
com.util.isXmlDoc = function (data) {
    if (typeof data != 'object')
        return false;
    if (typeof data.documentElement != 'undefined' && data.nodeType == 9 || typeof data.documentElement == 'undefined' && data.nodeType == 1) {
        return true;
    }
    return false;
};
com.util.setGridViewDelCheckBox = function (gridViewObjArr) {
    try {
        if (com.util.getObjectType(gridViewObjArr) === 'array') {
            for (var idx in gridViewObjArr) {
                setGridViewDelCheckBox(gridViewObjArr[idx]);
            }
        } else {
            setGridViewDelCheckBox(gridViewObjArr);
        }
        function setGridViewDelCheckBox(gridViewObj) {
            gridViewObj.bind('oncellclick', function (row, col) {
                var columnId = gridViewObj.getColumnID(col);
                if (columnId == 'chk') {
                    var dltObj = com.util.getGridViewDataList(this);
                    var realRowIndex = this.getRealRowIndex(row);
                    if (dltObj.getFilterList().length > 0) {
                        realRowIndex = dltObj.getFilteredRowIndex(realRowIndex);
                    }
                    var newValue = dltObj.getCellData(realRowIndex, columnId);
                    com.util._setGridViewRowCheckBox(this, realRowIndex, newValue === '1' ? true : false);
                }
            });
            gridViewObj.bind('onheaderclick', function (headerId) {
                if (headerId == 'chk') {
                    var newValue = this.getHeaderValue(headerId);
                    var dltObj = com.util.getGridViewDataList(this);
                    var rowCount = dltObj.getRowCount();
                    var removeIdx = [];
                    var deleteIdx = [];
                    var undoIdx = [];
                    for (var i = 0; i < rowCount; i++) {
                        var realRowIndex = dltObj.getRealRowIndex(i);
                        if (dltObj.getFilterList().length > 0) {
                            realRowIndex = dltObj.getFilteredRowIndex(realRowIndex);
                        }
                        if (dltObj.getRowStatus(realRowIndex) == 'C') {
                            removeIdx.push(realRowIndex);
                            continue;
                        }
                        if (newValue) {
                            deleteIdx.push(realRowIndex);
                        } else {
                            undoIdx.push(realRowIndex);
                        }
                    }
                    if (newValue) {
                        dltObj.deleteRows(deleteIdx);
                        dltObj.removeRows(removeIdx);
                    } else {
                        dltObj.undeleteRows(undoIdx);
                    }
                }
            });
        }
    } catch (ex) {
        console.error(ex);
    }
};
com.util._setGridViewRowCheckBox = function (gridViewObj, rowIndex, newValue) {
    var rowIndexArr = gridViewObj.getChildrenRowIndexArray(rowIndex);
    var dltObj = com.util.getGridViewDataList(gridViewObj);
    for (var idx in rowIndexArr) {
        var childRowIndexArr = gridViewObj.getChildrenRowIndexArray(rowIndexArr[idx]);
        if (childRowIndexArr.length > 0) {
            com.util._setGridViewRowCheckBox(gridViewObj, rowIndexArr[idx], newValue);
        } else {
            com.util._deleteGridViewRow(gridViewObj, rowIndexArr[idx], newValue);
        }
    }
    com.util._deleteGridViewRow(gridViewObj, rowIndex, newValue);
};
com.util._deleteGridViewRow = function (gridViewObj, rowIndex, newValue) {
    gridViewObj.setCellChecked(rowIndex, 'chk', newValue);
    var dltObj = com.util.getGridViewDataList(gridViewObj);
    if (newValue) {
        var rowStatus = dltObj.getRowStatus(rowIndex);
        if (rowStatus == 'C') {
            dltObj.deleteRow(rowIndex);
            dltObj.removeRow(rowIndex);
        } else {
            dltObj.deleteRow(rowIndex);
        }
    } else {
        dltObj.undeleteRow(rowIndex);
    }
};
com.util.getChildren = function (comObj, options) {
    return WebSquare.util.getChildren(comObj, options);
};
com.util.getGridViewDataList = function (gridViewObj) {
    var dataListId = gridViewObj.getDataList();
    if (dataListId !== '') {
        var dataList = $p.getComponentById(dataListId);
        if (typeof dataList === 'undefined' || dataList === null) {
            console.warn('[com.util.getGridViewDataList] DataList(' + dataListId + ')를 찾을 수 없습니다.');
            return null;
        } else {
            return dataList;
        }
    } else {
        console.warn('[com.util.getGridViewDataList] ' + gridViewObj.getID() + '는 DataList가 세팅되어 있지 않습니다.');
        return null;
    }
};
com.util.getComponent = function (compId) {
    var object = $p.getComponentById(compId);
    if (typeof object === 'undefined') {
        return null;
    } else {
        return object;
    }
};
com.util.createComponent = function (strCompId, strCompName, option, parent, itemSet) {
    try {
        if (typeof strCompId !== 'undefined' && strCompId !== '' && typeof strCompName !== 'undefined' && strCompName !== '') {
            if (typeof option == 'undefined') {
                option = {};
            }
            if (typeof parent == 'undefined') {
                parent = '';
            }
            if (typeof itemSet == 'undefined') {
                itemSet = '';
            }
            return $p.dynamicCreate(strCompId, strCompName, option, parent, itemSet);
        }
    } catch (ex) {
        console.error(ex);
        return null;
    }
};
com.util.setInterval = function (func, options) {
    $p.setInterval(func, options);
};
com.util.clearInterval = function (func, options) {
    $p.clearInterval(func, options);
};
com.util.setTimeout = function (func, options) {
    $p.setTimeout(func, options);
};
com.util.clearTimeout = function (func, options) {
    $p.clearTimeout(func, options);
};
com.util.copyClipboard = function (comObj) {
    if (typeof comObj !== 'undefined') {
        comObj.select();
    }
    document.execCommand('Copy');
};
com.util.getObject = function (_objectId, _scopeObj) {
    if (typeof _objectId === 'object' && !com.util.isEmpty(_objectId.event)) {
        return com.util.getComponent($p.getEventTarget(_objectId.realId));
    } else {
        return gcm.util.getObject($p, _objectId, _scopeObj);
    }
};
com.util.getFunction = function (_funcStr, _scopeId) {
    return gcm.util.getFunction($p, _funcStr, _scopeId);
};
com.util.getUserAgent = function () {
    return gcm.util.getUserAgent();
};
com.win = {};
com.win.goHome = function () {
    if (gcm.CONTEXT_PATH == '') {
        top.window.location.href = '/';
    } else {
        top.window.location.href = gcm.CONTEXT_PATH;
    }
};
com.win.logout = function () {
    gcm.win.removeEventOnBeforeUnload();
    var logoutGrpOption = {
        id: '_sbm_Logout',
        action: '/main/logout',
        target: '',
        submitDoneHandler: 'com.win.goHome',
        isProcessMsg: false
    };
    com.sbm.executeDynamic(logoutGrpOption);
};
com.win.isAdmin = function () {
    scwin.isAdmin = $p.main().wfm_side.getWindow().dma_defInfo.get('IS_ADMIN');
    if (scwin.isAdmin === 'Y') {
        return true;
    } else {
        return false;
    }
};
com.win.getFullPath = function (path) {
    var rtn_path = '';
    if (gcm.CONTEXT_PATH == '') {
        rtn_path = path;
    } else {
        rtn_path = gcm.CONTEXT_PATH + path;
    }
    return rtn_path;
};
com.win.setEnterKeyEvent = function (grpObj, objFunc) {
    var objArr = com.util.getChildren(grpObj, {
        includePlugin: 'checkbox checkcombobox editor input inputCalendar multiselect radio selectbox searchbox secret textarea autoComplete',
        recursive: true
    });
    try {
        for (var i = 0; i < objArr.length; i++) {
            try {
                if (typeof objFunc === 'function') {
                    objArr[i].bind('onkeyup', function (e) {
                        if (e.keyCode === 13) {
                            if (typeof this.getRef === 'function') {
                                var ref = this.getRef();
                                var refArray = ref.substring(5).split('.');
                                if (typeof refArray !== 'undefined' && refArray.length === 2) {
                                    var dataCollectionName = refArray[0];
                                    var columnId = refArray[1];
                                    var dataCollection = this.getScopeWindow().$p.getComponentById(dataCollectionName);
                                    var dataType = dataCollection.getObjectType().toLowerCase();
                                    if (dataType === 'datamap') {
                                        dataCollection.set(columnId, this.getValue());
                                    } else if (dataType === 'datalist' && typeof rowIndex !== 'undefined') {
                                        dataCollection.setCellData(dataCollection.getRowPosition(), columnId, this.getValue());
                                    }
                                }
                                objFunc();
                            }
                        }
                    });
                }
            } catch (e) {
                console.error('[com.win.setEnterKeyEvent] Exception :: ' + e.message);
            }
        }
    } catch (ex) {
        console.error(ex);
    } finally {
        objArr = null;
    }
};
com.win.alert = function (messageStr, closeCallbackFncName, opts) {
    return new Promise(function (resolve, reject) {
        if (typeof opts !== 'object') {
            opts = {};
        }
        if (com.util.isEmpty(closeCallbackFncName)) {
            closeCallbackFncName = function () {
                resolve();
            };
        }
        gcm.win.messagBox($p, 'alert', messageStr, closeCallbackFncName, opts);
    });
};
com.win.confirm = function (messageStr, closeCallbackFncName, opts) {
    return new Promise(function (resolve, reject) {
        if (typeof opts !== 'object') {
            opts = {};
        }
        if (com.util.isEmpty(closeCallbackFncName)) {
            closeCallbackFncName = function (rtn) {
                if (!com.util.isEmpty(rtn) && !com.util.isEmpty(rtn.clickValue)) {
                    resolve(rtn.clickValue);
                } else {
                    resolve(false);
                }
            };
        }
        gcm.win.messagBox($p, 'confirm', messageStr, closeCallbackFncName, opts);
    });
};
com.win.showToastMessage = function (messageType, message) {
    gcm.win.showToastMessage(messageType, message);
};
com.win.getLanguage = function () {
    var language = navigator.language || navigator.userLanguage || navigator.systemLanguage;
    if (com.util.isEmpty(language) === false && language.length > 1) {
        return language.substring(0, 2);
    } else {
        return '';
    }
};
com.win.getPopupId = function () {
    var parent = opener || parent;
    if ($p.getPopupId()) {
        return $p.getPopupId();
    } else {
        return window.scwin.$w.getPopupId();
    }
};
com.win.openPopup = function (url, opts, data) {
    return new Promise(function (resolve, reject) {
        if (typeof opts !== 'object') {
            opts = {};
        }
        if (com.util.isEmpty(data)) {
            data = {};
        }
        if (com.util.isEmpty(data.callbackFn)) {
            data.callbackFn = function (rtn) {
                if (!com.util.isEmpty(rtn)) {
                    if (!com.util.isEmpty(rtn.clickValue)) {
                        resolve(rtn.clickValue);
                    } else {
                        resolve(rtn);
                    }
                } else {
                    resolve(false);
                }
            };
        }
        gcm.win.openPopup($p, url, opts, data);
    });
};
com.win.closePopup = function (callbackParam, callbackFnStr) {
    if (!com.util.isEmpty($p, callbackParam)) {
        $p.getFrame().scope.scwin._popup = { callbackParam: callbackParam };
    }
    gcm.win.closePopup($p, com.win.getPopupId(), com.str.serialize(callbackParam), callbackFnStr);
};
com.win.closeAllPopup = function () {
    var popupList = WebSquare.uiplugin.popup.popupList;
    for (var idx = 0; idx < popupList.length; idx++) {
        $p.closePopup(WebSquare.uiplugin.popup.popupList[idx].id);
    }
};
com.win.isPopup = function () {
    return isPopup($p);
    function isPopup(scope) {
        if (scope.isPopup()) {
            return true;
        } else if (scope.top().$p.getFrameId() === scope.getFrameId()) {
            return false;
        } else {
            return isPopup(scope.parent().$p);
        }
    }
};
com.win.openMenu = function (menuNm, url, menuCode, paramObj, option) {
    return gcm.win.openMenu($p, menuNm, url, menuCode, paramObj, option);
};
com.win.moveUrl = function (moveUrl, paramObj) {
    var paramObj = {
        'dataObject': {
            'type': 'json',
            'name': 'paramData',
            'data': paramObj
        }
    };
    Promise.resolve().then(function () {
        return $p.getFrame().setSrc(gcm.CONTEXT_PATH + moveUrl, paramObj);
    });
};
com.win.setWFrameSrc = function (wframeObj, moveUrl, paramObj) {
    var paramObj = {
        'dataObject': {
            'type': 'json',
            'name': 'paramData',
            'data': paramObj
        }
    };
    wframeObj.setSrc(gcm.CONTEXT_PATH + moveUrl, paramObj);
};
com.win.getFrame = function () {
    try {
        return $p.getFrame();
    } catch (ex) {
        console.error(ex);
    }
};
com.win.getParent = function () {
    try {
        return $p.parent();
    } catch (ex) {
        console.error(ex);
    }
};
com.win.setLangCode = function (langCode) {
    WebSquare.cookie.setCookie('system_language', langCode);
};
com.win.getLangCode = function (langCode) {
    return WebSquare.cookie.getCookie('system_language');
};
com.num = {};
com.num.round = function (value, point) {
    var num = 1;
    if (typeof point !== 'undefined') {
        num = Math.pow(10, point);
    }
    return Math.round(Number(value) * num) / num;
};
com.num.floor = function (value, point) {
    var num = 1;
    if (typeof point !== 'undefined') {
        num = Math.pow(10, point);
    }
    return Math.floor(Number(value) * num) / num;
};
com.num.ceil = function (value, point) {
    var num = 1;
    if (typeof point !== 'undefined') {
        num = Math.pow(10, point);
    }
    return Math.ceil(Number(value) * num) / num;
};
com.num.formatMoney = function (value, type) {
    var amount;
    if (type == 'plusZero') {
        amount = new String(value) + '0';
    } else {
        amount = new String(value);
    }
    amount = amount.split('.');
    var amount1 = amount[0].split('').reverse();
    var amount2 = amount[1];
    var output = '';
    for (var i = 0; i <= amount1.length - 1; i++) {
        output = amount1[i] + output;
        if ((i + 1) % 3 == 0 && amount1.length - 1 !== i)
            output = ',' + output;
    }
    if (type == 'dollar') {
        if (!amount2) {
            output = '$ ' + output;
        } else {
            output = '$ ' + output + '.' + amount2;
        }
    } else if (type == 'won') {
        if (!amount2) {
            output = output + '원';
        } else {
            output = output + '.' + amount2 + '원';
        }
    } else {
        if (!amount2) {
            output = output;
        } else {
            output = output + '.' + amount2;
        }
    }
    return output;
};
com.num.formatNumber = function (value) {
    return WebSquare.util.setNumber(value);
};
com.num.isNumber = function (value) {
    return !isNaN(value);
};
com.num.isOdd = function (value) {
    return WebSquare.util.isOdd(value);
};
com.num.parseInt = function (value, defaultValue) {
    return WebSquare.util.parseInt(value, defaultValue);
};
com.num.parseFloat = function (value, defaultValue) {
    return WebSquare.util.parseFloat(value, defaultValue);
};
com.num.formatByte = function (value) {
    var unitType = [
        'Bytes',
        'KB',
        'MB',
        'GB',
        'TB',
        'PB'
    ];
    if (value == 0 || value == '0' || isNaN(value)) {
        return 0 + ' ' + unitType[0];
    }
    var index = Math.floor(Math.log(value) / Math.log(1024));
    return (value / Math.pow(1024, index)).toFixed(1) + ' ' + unitType[index];
};
com.str = {};
com.str.serialize = function (object, replacer, space) {
    if (typeof object === 'string') {
        return object;
    } else if (com.util.isJSON(object)) {
        return JSON.stringify(object, replacer, space);
    } else if (com.util.isXmlDoc(object)) {
        return WebSquare.xml.serialize(object);
    } else {
        return object;
    }
};
com.str.lpad = function (str, length, char) {
    if (typeof str === 'number') {
        str = str.toString();
    }
    if (char.length > length) {
        console.warn('[com.str.lpad] 오류 : 채우고자 하는 문자열이 요청 길이보다 큽니다');
        return str + '';
    }
    while (str.length < length) {
        str = char + str;
    }
    str = str.length >= length ? str.substring(0, length) : str;
    return str;
};
com.str.rpad = function (str, length, char) {
    if (char.length > length) {
        console.warn('[com.str.rpad] 오류 : 채우고자 하는 문자열이 요청 길이보다 큽니다');
        return str + '';
    }
    while (str.length < length) {
        str += char;
    }
    str = str.length >= length ? str.substring(0, length) : str;
    return str;
};
com.str.formatSSN = function (str) {
    var front = String(str).substr(0, 6);
    var back = String(str).substr(6, 7);
    var output = front + '-' + back;
    return output;
};
com.str.formatPhone = function (str) {
    try {
        str = str.replace(/\s+/g, '');
        var commCdList = ['0505'];
        var commCdNum = str.substr(0, 4);
        if (commCdList.indexOf(commCdNum) > -1) {
            return str.replace(/^(01[0136789]{1}|02|0[3-9]{1}[0-9]{1}[0-9]{1})-?([*0-9]{3,4})-?([0-9]{4})$/, '$1-$2-$3');
        } else if (str.length <= 11) {
            return str.replace(/^(01[0136789]{1}|02|0[3-9]{1}[0-9]{1})-?([*0-9]{3,4})-?([0-9]{4})$/, '$1-$2-$3');
        } else {
            return str;
        }
    } catch (ex) {
        console.error(ex);
    }
};
com.str.formatTime = function (str) {
    try {
        var hour = String(str).substr(0, 2);
        var minute = String(str).substr(2, 2);
        var second = String(str).substr(4, 2);
        if (com.util.isEmpty(second)) {
            return hour + ':' + minute;
        } else {
            return hour + ':' + minute + ':' + second;
        }
    } catch (ex) {
        console.error(ex);
        return str;
    }
};
com.str.getLocale = function (str) {
    var locale = 0;
    if (str.length > 0) {
        var charCode = str.charCodeAt(0);
        if (charCode >= 44032 && charCode <= 55203) {
            locale = 1;
        } else if (charCode >= 4352 && charCode <= 4601 || charCode >= 12593 && charCode <= 12686) {
            locale = 2;
        } else if (charCode >= 48 && charCode <= 57) {
            locale = 4;
        } else if (charCode >= 32 && charCode <= 47 || charCode >= 58 && charCode <= 64 || charCode >= 91 && charCode <= 96 || charCode >= 123 && charCode <= 126) {
            locale = 8;
        } else if (charCode >= 65 && charCode <= 90) {
            locale = 16;
        } else if (charCode >= 97 && charCode <= 122) {
            locale = 32;
        } else {
            locale = 48;
        }
    }
    return locale;
};
com.str.existKorean = function (value) {
    var check = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    if (check.test(value)) {
        return true;
    } else {
        return false;
    }
};
com.str.isKorean = function (str) {
    var result = false;
    for (var i = 0; i < str.length; i++) {
        var c = str.charAt(i);
        if (!com.str.existKorean(c)) {
            result = false;
            break;
        } else {
            result = true;
        }
    }
    return result;
};
com.str.isFinalConsonant = function (str) {
    var code = str.charCodeAt(str.length - 1);
    if (code < 44032 || code > 55197) {
        return false;
    }
    if ((code - 16) % 28 == 0) {
        return false;
    }
    return true;
};
com.str.attachPostposition = function (str) {
    if (com.win.getLanguage() === 'ko') {
        if (com.str.isFinalConsonant(str)) {
            str = str + '은';
        } else {
            str = str + '는';
        }
        return str;
    } else {
        return str;
    }
};
com.str.isBizID = function (str) {
    var sum = 0;
    var aBizID = new Array(10);
    var checkID = new Array('1', '3', '7', '1', '3', '7', '1', '3', '5');
    for (var i = 0; i < 10; i++) {
        aBizID[i] = str.substring(i, i + 1);
    }
    for (var i = 0; i < 9; i++) {
        sum += aBizID[i] * checkID[i];
    }
    sum = sum + parseInt(aBizID[8] * 5 / 10);
    var temp = sum % 10;
    var temp1 = 0;
    if (temp != 0) {
        temp1 = 10 - temp;
    } else {
        temp1 = 0;
    }
    if (temp1 != aBizID[9]) {
        return false;
    }
    return true;
};
com.str.isSSN = function (str) {
    var checkID = new Array(2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5);
    var i = 0, sum = 0;
    var temp = 0;
    var yy = '';
    if (str.length != 13) {
        return false;
    }
    for (i = 0; i < 13; i++) {
        if (str.charAt(i) < '0' || str.charAt(i) > '9') {
            return false;
        }
    }
    if (str.substring(6, 13) == '5000000' || str.substring(6, 13) == '6000000' || str.substring(6, 13) == '7000000' || str.substring(6, 13) == '8000000') {
        return true;
    }
    for (i = 0; i < 12; i++) {
        sum += str.charAt(i) * checkID[i];
    }
    temp = sum - Math.floor(sum / 11) * 11;
    temp = 11 - temp;
    temp = temp - Math.floor(temp / 10) * 10;
    if (str.charAt(6) == '1' || str.charAt(6) == '2' || str.charAt(6) == '5' || str.charAt(6) == '6') {
        yy = '19';
    } else {
        yy = '20';
    }
    if (parseInt(com.date.getServerDateTime('yyyy')) - parseInt(yy + str.substring(0, 2)) < 0) {
        return false;
    }
    if (str.charAt(6) != '5' && str.charAt(6) != '6' && str.charAt(6) != '7' && str.charAt(6) != '8') {
        if (temp == com.num.parseInt(str.charAt(12))) {
            return true;
        } else {
            return false;
        }
    } else {
        if ((temp + 2) % 10 == com.num.parseInt(str.charAt(12))) {
            return true;
        } else {
            return false;
        }
    }
    return false;
};
com.str.isEmail = function (str) {
    if (typeof str != 'undefined' && str != '') {
        var format = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (format.test(str)) {
            return true;
        } else {
            return false;
        }
    }
    return true;
};
com.str.isPhone = function (str) {
    try {
        var phoneNum = com.str.formatPhone(str);
        var isDash = phoneNum.indexOf('-') > 1;
        return isDash;
    } catch (ex) {
        console.error(ex);
        return false;
    }
};
com.str.replaceAll = function (str, orgStr, repStr) {
    try {
        str = '' + str;
        return str.split(orgStr).join(repStr);
    } catch (ex) {
        console.error(ex);
        return str;
    }
};
com.str.trim = function (str) {
    try {
        if (typeof str == 'undefined' || str == null) {
            str = '';
        }
        if (typeof str !== 'string') {
            str = str + '';
        }
        return str.trim();
    } catch (ex) {
        console.error(ex);
    }
};
com.str.getByteLength = function (str, ignoreChar) {
    return WebSquare.util.getStringByteSize(str, ignoreChar);
};
com.date = {};
com.date.addMinute = function (pYmd, offset) {
    return WebSquare.date.dateTimeAdd(pYmd, offset, 'minute');
};
com.date.addHour = function (pYmd, offset) {
    return WebSquare.date.dateTimeAdd(pYmd, offset, 'hour');
};
com.date.addDate = function (pYmd, offset) {
    return WebSquare.date.dateAdd(pYmd, offset);
};
com.date.addMonth = function (pYmd, offset) {
    try {
        var date = '';
        var isDate = com.date.isDate(pYmd);
        if (!isDate) {
            return;
        }
        if (typeof offset == 'undefined' || isNaN(offset)) {
            offset = 0;
        }
        var dY = (pYmd + '').substring(0, 4);
        var dM = (pYmd + '').substring(4, 6);
        var dD = (pYmd + '').substring(6, 8);
        var dTime = (pYmd + '').substring(8);
        dM = dM * 1 + offset * 1;
        if (dM > 0) {
            dY = dY * 1 + Math.floor(dM / 12);
            dM = dM % 12;
        } else {
            dY = dY * 1 - Math.floor((dM * -1 + 12) / 12);
            dM = dM % 12 + 12;
        }
        if (Number(dD) >= 30) {
            var chkMonth1 = [2];
            var chkMonth2 = [
                4,
                6,
                9,
                11
            ];
            if (chkMonth1.indexOf(dM) > -1) {
                if (com.date.isLeafYear(dY + '01' + '01')) {
                    dD = '29';
                } else {
                    dD = '28';
                }
            } else if (chkMonth2.indexOf(dM) > -1) {
                if (Number(dD) > 30) {
                    dD = '30';
                }
            }
        }
        var cDate = new Date(dY, dM - 1, dD);
        var cYear = cDate.getFullYear();
        var cMonth = cDate.getMonth() + 1;
        if ((cMonth + '').length < 2) {
            cMonth = '0' + cMonth;
        }
        var cDay = cDate.getDate();
        if ((cDay + '').length < 2) {
            cDay = '0' + cDay;
        }
        date = cYear + '' + cMonth + '' + cDay + '' + dTime;
        return date;
    } catch (ex) {
        console.error(ex);
    }
};
com.date.getServerDateTime = function (sDateFormat) {
    if (com.util.isEmpty(sDateFormat)) {
        sDateFormat = 'yyyyMMdd';
    }
    return WebSquare.date.getCurrentServerDate(sDateFormat);
};
com.date.formatDate = function (str, type) {
    var output = '';
    var date = new String(str);
    if (type == 'slash') {
        date = date.substring(2, date.length);
        for (var i = 0; i <= date.length - 1; i++) {
            output = output + date[i];
            if ((i + 1) % 2 == 0 && date.length - 1 !== i)
                output = output + '/';
        }
    } else if (type == 'date') {
        if (date.length == 8) {
            output = date.substr(0, 4) + '/' + date.substr(4, 2) + '/' + date.substr(6, 2);
        }
    } else if (type == 'colon') {
        if (date.length == 8) {
            output = date.substr(0, 4) + ':' + date.substr(4, 2) + ':' + date.substr(6, 2);
        }
    } else if (!com.util.isEmpty(type)) {
        if (date.length == 8) {
            output = date.substr(0, 4) + type + date.substr(4, 2) + type + date.substr(6, 2);
        }
    } else {
        var year = date.substr(0, 4);
        var month = date.substr(4, 2);
        var day = date.substr(6, 2);
        var output = year + '년 ' + month + '월 ' + day + '일';
    }
    return output;
};
com.date.formatTime = function (value) {
    var hour = String(value).substr(0, 2);
    var minute = String(value).substr(2, 2);
    var second = String(value).substr(4, 2);
    var output = hour + ':' + minute + ':' + second;
    return output;
};
com.date.formatDateTime = function (value, sDateFormat) {
    if (com.util.isEmpty(sDateFormat)) {
        sDateFormat = 'yyyyMMdd';
    }
    return WebSquare.date.getFormattedDate(value, sDateFormat);
};
com.date.isDate = function (sDate, timeChk) {
    var flag = true;
    try {
        if (sDate.length == 8) {
            sDate = sDate + '000000';
        }
        var y1 = parseInt(sDate.substring(0, 4), 10);
        var m1 = parseInt(sDate.substring(4, 6), 10);
        var d1 = parseInt(sDate.substring(6, 8), 10);
        var h1 = parseInt(sDate.substring(8, 10), 10);
        var t1 = parseInt(sDate.substring(10, 12), 10);
        var s1 = parseInt(sDate.substring(12), 10);
        if (isNaN(y1) || isNaN(m1) || isNaN(d1) || isNaN(h1) || isNaN(t1) || isNaN(s1))
            flag = false;
        if (m1 < 1 || m1 > 12)
            flag = false;
        var maxDay = 31;
        if (m1 == 2) {
            maxDay = y1 % 400 == 0 || y1 % 4 == 0 && y1 % 100 != 0 ? 29 : 28;
        } else if (m1 == 4 || m1 == 6 || m1 == 9 || m1 == 11) {
            maxDay = 30;
        }
        if (d1 < 1 || d1 > maxDay) {
            flag = false;
        }
        if (h1 + t1 + s1 != '') {
            if (h1 < 0 || h1 > 24) {
                flag = false;
            } else if (h1 == 24) {
                if (typeof timeChk == 'boolean' && !timeChk)
                    flag = false;
                if (t1 > 0)
                    flag = false;
                if (s1 > 0)
                    flag = false;
            }
            if (t1 < 0 || t1 > 59)
                flag = false;
            if (s1 < 0 || s1 > 59)
                flag = false;
        }
    } catch (ex) {
        console.error(ex);
        flag = false;
    }
    return flag;
};
com.date.diffDate = function (fromDate, toDate) {
    try {
        if (!com.date.isDate(fromDate) || !com.date.isDate(toDate)) {
            return;
        }
        var diffDate = WebSquare.date.dateDiff(fromDate, toDate);
        return diffDate;
    } catch (ex) {
        console.error(ex);
    }
};
com.date.isLeafYear = function (pYmd) {
    try {
        var isLeafYear = false;
        if (!com.date.isDate(pYmd)) {
            return;
        } else {
            pYmd = pYmd.substr(0, 8);
            var y1 = parseInt(pYmd.substr(0, 4), 10);
            isLeafYear = y1 % 400 == 0 || y1 % 4 == 0 && y1 % 100 != 0 ? true : false;
        }
        return isLeafYear;
    } catch (ex) {
        console.error(ex);
    }
};
com.date.getDay = function (value, type) {
    var dayVal;
    if (type == 'num') {
        var dayVal = WebSquare.date._getDay(value);
        if (dayVal == 0) {
            return '7';
        } else {
            return String(dayVal);
        }
    } else {
        return WebSquare.date.getDay(value);
    }
};
com.date.getLunar = function (value) {
    return WebSquare.date.toLunar(value);
};
com.date.getLastDateOfMonth = function (yearMonth) {
    try {
        if (typeof yearMonth !== 'string') {
            yearMonth = com.str.serialize(yearMonth);
        }
        var year = yearMonth.substring(0, 4);
        var month = yearMonth.substring(4, 6);
        return new Date(year, month, 0).getDate();
    } catch (ex) {
        console.error(ex);
        return null;
    }
};
com.hkey = {};
com.hkey.setShortKey = function (frame) {
    var frameP = null;
    if (typeof frame === 'object' && frame !== $p) {
        frameP = frame.$p;
    } else {
        frameP = $p;
    }
    var programCd = gcm.win.getProgramId(frameP);
    var programShortKeyInfo = com.data.getMatchedJSON(gcm.hkey.dataList, {
        columnId: 'PROGRAM_CD',
        operator: '==',
        value: programCd
    });
    if (!com.util.isEmpty(programCd) && !com.util.isEmpty(programShortKeyInfo) && programShortKeyInfo.length === 0) {
        var searchCodeGrpOption = {
            id: '_sbm_selectShortcutList',
            action: '/main/selectShortcutList',
            target: '',
            method: 'post',
            mediatype: 'application/json',
            mode: 'asynchronous',
            isProcessMsg: false,
            submitDoneHandler: function (e) {
                var rsMsg = e.responseJSON.rsMsg;
                if (rsMsg.statusCode == gcm.MESSAGE_CODE.STATUS_SUCCESS) {
                    gcm.hkey.dataList.setJSON(e.responseJSON.dlt_shortcutList, true);
                }
            }
        };
        var param = { dma_shortcut: { PROGRAM_CD: programCd } };
        com.sbm.create(searchCodeGrpOption);
        var subObj = com.util.getComponent('_sbm_selectShortcutList');
        subObj.setRequestData(param);
    }
};
com.hkey.setCkEditorShortKeyDownAction = function () {
    $p.setTimeout(function () {
        var chkEditorIframe = $p.$('.cke_wysiwyg_frame');
        for (var i = 0; i < chkEditorIframe.length; i++) {
            var iframeTargetElement = chkEditorIframe[i].contentWindow.document;
            if (iframeTargetElement.addEventListener) {
                iframeTargetElement.addEventListener('keydown', gcm.hkey.keydownEvent);
            } else if (iframeTargetElement.attachEvent) {
                iframeTargetElement.attachEvent('keydown', gcm.hkey.keydownEvent);
            }
        }
    }, {
        delay: 1000,
        key: 'ckEditorKeyDownEventBindingTimer'
    });
};
com.ext = {};
if (WebSquare.core.getConfiguration('debug') === 'false') {
    var debugMode = $p.getParameter('debugMode');
    if (debugMode == 'true') {
        gcm.DEBUG_MODE = true;
    } else {
        gcm.DEBUG_MODE = false;
    }
} else {
    gcm.DEBUG_MODE = true;
}
console.log = function () {
    if (gcm.DEBUG_MODE === true) {
        return Function.prototype.bind.call(console.log, console);
    } else {
        return new Function();
    }
}();
console.info = function () {
    if (gcm.DEBUG_MODE === true) {
        return Function.prototype.bind.call(console.info, console);
    } else {
        return new Function();
    }
}();
console.trace = function () {
    if (gcm.DEBUG_MODE === true) {
        return Function.prototype.bind.call(console.trace, console);
    } else {
        return new Function();
    }
}();
console.error = function () {
    if (gcm.DEBUG_MODE === true) {
        return Function.prototype.bind.call(console.error, console);
    } else {
        return new Function();
    }
}();
console.warn = function () {
    if (gcm.DEBUG_MODE === true) {
        return Function.prototype.bind.call(console.warn, console);
    } else {
        return new Function();
    }
}();
console.debug = function () {
    if (gcm.DEBUG_MODE === true) {
        return Function.prototype.bind.call(console.debug, console);
    } else {
        return new Function();
    }
}();
console.dir = function () {
    if (gcm.DEBUG_MODE === true) {
        return Function.prototype.bind.call(console.dir, console);
    } else {
        return new Function();
    }
}();
if (gcm.util.getUserAgent() !== 'msie') {
    console.table = function () {
        if (gcm.DEBUG_MODE === true) {
            return Function.prototype.bind.call(console.table, console);
        } else {
            return new Function();
        }
    }();
} else {
    console.table = function () {
        if (gcm.DEBUG_MODE === true) {
            return Function.prototype.bind.call(console.log, console);
        } else {
            return new Function();
        }
    }();
}
console.count = function () {
    if (gcm.DEBUG_MODE === true) {
        return Function.prototype.bind.call(console.count, console);
    } else {
        return new Function();
    }
}();
console.time = function () {
    if (gcm.DEBUG_MODE === true) {
        return Function.prototype.bind.call(console.time, console);
    } else {
        return new Function();
    }
}();
console.timeEnd = function () {
    if (gcm.DEBUG_MODE === true) {
        return Function.prototype.bind.call(console.timeEnd, console);
    } else {
        return new Function();
    }
}();