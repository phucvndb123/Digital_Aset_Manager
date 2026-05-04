/*amd /cm/project_udc/common.xml 15802 7ebf878e7d8ed2e361592154be23db6f2ddf519f1601e3320a988623669f14bd */
define({declaration:{A:{version:'1.0',encoding:'UTF-8'}},E:[{T:1,N:'html',A:{xmlns:'http://www.w3.org/1999/xhtml','xmlns:ev':'http://www.w3.org/2001/xml-events','xmlns:w2':'http://www.inswave.com/websquare','xmlns:xf':'http://www.w3.org/2002/xforms'},E:[{T:1,N:'head',A:{},E:[{T:1,N:'w2:type',E:[{T:3,text:'COMPONENT'}]},{T:1,N:'w2:buildDate'},{T:1,N:'w2:publicInfo',A:{method:'scwin.execute,scwin.executeDynamic,scwin.create,\r\n		                       scwin.createDataList,scwin.createDataMap,scwin.getParameter, scwin.strSerialize,scwin.getParameter,\r\n		                       scwin.dynamicGridBasic,scwin.dynamicGridAdvanced'}},{T:1,N:'xf:model',E:[{T:1,N:'w2:dataCollection',A:{baseNode:'map'},E:[{T:1,N:'w2:dataMap',A:{baseNode:'map',id:'dma_commonCode'},E:[{T:1,N:'w2:keyInfo',E:[{T:1,N:'w2:key',A:{id:'GRP_CD',name:'GRP_CD',dataType:'text'}},{T:1,N:'w2:key',A:{id:'DATA_PREFIX',name:'name2',dataType:'text'}},{T:1,N:'w2:key',A:{id:'SCOPE_ID',name:'name3',dataType:'text'}}]}]},{T:1,N:'w2:dataList',A:{baseNode:'list',repeatNode:'map',id:'dlt_codeList',saveRemovedData:'true'},E:[{T:1,N:'w2:columnInfo',E:[{T:1,N:'w2:column',A:{id:'CODE_NM',name:'CODE_NM',dataType:'text'}},{T:1,N:'w2:column',A:{id:'COM_CD',name:'COM_CD',dataType:'text'}},{T:1,N:'w2:column',A:{id:'GRP_CD',name:'GRP_CD',dataType:'text'}}]}]}]},{T:1,N:'w2:workflowCollection'},{T:1,N:'xf:submission',A:{id:'sbm_menuData',ref:'',target:'data:json,dataList1',action:'',method:'post',mediatype:'application/json',encoding:'UTF-8',instance:'',replace:'',errorHandler:'',customHandler:'',mode:'asynchronous',processMsg:'','ev:submit':'','ev:submitdone':'scwin.sbm_menuData_submitdone','ev:submiterror':'',abortTrigger:''}},{T:1,N:'xf:submission',A:{id:'sbm_selectCodeList',ref:'data:json,{"id":"dma_commonCode","key":"dma_commonCode"}',target:'',action:'',method:'get',mediatype:'application/json',encoding:'UTF-8',instance:'',replace:'',errorHandler:'',customHandler:'',mode:'asynchronous',processMsg:'','ev:submit':'','ev:submitdone':'scwin.sbm_selectCodeList_submitdone','ev:submiterror':'',abortTrigger:''}}]},{T:1,N:'w2:layoutInfo'},{T:1,N:'script',A:{type:'text/javascript',lazy:'false'},E:[{T:4,cdata:function(scopeObj){with(scopeObj){scwin.DEFAULT_OPTIONS = {
    CONTEXT_PATH: '',
    SERVICE_URL: '',
    SUBMIT_MODE: 'asynchronous',
    SUBMIT_MEDIATYPE: 'application/json'
};
scwin.onpageload = function () {
};
scwin.execute = function (_$p, sbmObj, requestData, compObj) {
    if (sbmObj) {
        var sbmObj = typeof sbmObj == 'object' ? sbmObj : typeof sbmObj == 'string' ? _$p.getSubmission(sbmObj) : sbmObj;
        if (!sbmObj.action) {
            $c.popup.alert(_$p, 'submission action 필수입력값입니다.');
            return false;
        }
        _$p.executeSubmission(sbmObj, requestData, compObj);
    }
};
scwin.executeDynamic = function (_$p, options, requestData, obj) {
    var submissionObj = _$p.getSubmission(options.id);
    if (submissionObj === null) {
        scwin.create(_$p, options);
        submissionObj = _$p.getSubmission(options.id);
    } else {
        _$p.deleteSubmission(options.id);
        scwin.create(_$p, options);
        submissionObj = _$p.getSubmission(options.id);
    }
    scwin.execute(_$p, submissionObj, requestData, obj);
};
scwin.create = function (_$p, options) {
    var ref = options.ref || '';
    var target = options.target || '';
    var action = scwin.DEFAULT_OPTIONS.CONTEXT_PATH + scwin.DEFAULT_OPTIONS.SERVICE_URL + options.action;
    var mode = options.mode || scwin.DEFAULT_OPTIONS.SUBMIT_MODE;
    var mediatype = options.mediatype || scwin.DEFAULT_OPTIONS.SUBMIT_MEDIATYPE;
    var method = (options.method || 'post').toLowerCase();
    var processMsg = options.processMsg || '';
    var instance = options.instance || 'none';
    var submitHandler = typeof options.submitHandler === 'function' ? options.submitHandler : typeof options.submitHandler === 'string' ? $p.id + options.submitHandler : '';
    var submitDoneHandler = typeof options.submitDoneHandler === 'function' ? options.submitDoneHandler : typeof options.submitDoneHandler === 'string' ? $p.id + options.submitDoneHandler : '';
    var submitErrorHandler = typeof options.submitErrorHandler === 'function' ? options.submitErrorHandler : typeof options.submitErrorHandler === 'string' ? $p.id + options.submitErrorHandler : '';
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
    _$p.createSubmission(submissionObj);
};
scwin._sbm_defCallbackSubmission = function (resObj, subObj) {
};
scwin.createDataList = function (_$p, dataListId, columnInfoList, baseNode, repeatNode) {
    var baseNodeId = baseNode ? baseNode : 'list';
    var repeatNodeId = repeatNode ? repeatNode : 'map';
    _$p.data.remove(dataListId);
    var options = {
        'id': dataListId,
        'type': 'dataList',
        'option': {
            'baseNode': baseNodeId,
            'repeatNode': repeatNodeId
        },
        'columnInfo': columnInfoList
    };
    _$p.data.create(options);
};
scwin.createDataMap = function (_$p, dataMapId, keyInfoList, baseNode) {
    var baseNodeId = baseNode ? baseNode : 'map';
    _$p.data.remove(dataMapId);
    var options = {
        'id': dataMapId,
        'type': 'dataMap',
        'option': { 'baseNode': baseNodeId },
        'keyInfo': keyInfoList
    };
    _$p.data.create(options);
};
scwin.dynamicGridBasic = function (_$p, gridId, datalistId) {
    var tmpStr = [];
    var gridObj = _$p.getComponentById(gridId);
    var dataListObj = _$p.getComponentById(datalistId);
    var options = scwin._getGridOption(gridObj);
    options.dataListId = dataListObj.org_id || '';
    if (options.rowNumVisible == 'true' && parseInt(options.rowNumWidth) <= 0) {
        options.rowNumWidth = '20';
    }
    if (options.rowStatusVisible == 'true' && parseInt(options.rowStatusWidth) <= 0) {
        options.rowStatusWidth = '20';
    }
    tmpStr.push('<w2:gridView ');
    tmpStr.push('xmlns:w2="http://www.inswave.com/websquare"  ');
    tmpStr.push('xmlns:ev="http://www.w3.org/2001/xml-events" ');
    tmpStr.push('style="' + options.style + '" ');
    tmpStr.push('autoFit="' + options.autoFit + '" ');
    tmpStr.push('autoFitMinWidth="' + options.autoFitMinWidth + '" ');
    tmpStr.push('class="' + options.className + '" ');
    tmpStr.push('columnMove="' + options.columnMove + '" ');
    tmpStr.push('dataList="data:' + options.dataListId + '" ');
    tmpStr.push('editModeEvent="' + options.editModeEvent + '" ');
    tmpStr.push('fixedColumn="' + options.fixedColumn + '" ');
    tmpStr.push('focusMode="' + options.focusMode + '" ');
    tmpStr.push('focusMove="' + options.focusMove + '" ');
    tmpStr.push('id="' + options.gridId + '" ');
    tmpStr.push('overflowX="' + options.overflowX + '" ');
    tmpStr.push('overflowY="' + options.overflowY + '" ');
    tmpStr.push('readOnly="' + options.readOnly + '" ');
    tmpStr.push('resize="' + options.resize + '" ');
    tmpStr.push('rowNumVisible="' + options.rowNumVisible + '" ');
    tmpStr.push('rowNumWidth="' + options.rowNumWidth + '" ');
    tmpStr.push('rowNumHeaderValue="' + options.rowNumHeaderValue + '" ');
    tmpStr.push('rowStatusVisible="' + options.rowStatusVisible + '" ');
    tmpStr.push('rowStatusHeaderValue="' + options.rowStatusHeaderValue + '" ');
    tmpStr.push('rowStatusWidth="' + options.rowStatusWidth + '" ');
    tmpStr.push('sortable="' + options.sortable + '" ');
    tmpStr.push('sortEvent="' + options.sortEvent + '" ');
    tmpStr.push('visibleRowNum="' + options.visibleRowNum + '" ');
    var eventStr = scwin._getGridEvent(gridObj);
    tmpStr.push('>');
    tmpStr.push('<w2:caption id="caption1" value="this is a grid caption."/>');
    var headerStrArr = scwin._makeHearder(dataListObj, options.gridId);
    for (var i = 0; i < headerStrArr.length; i++) {
        tmpStr.push(headerStrArr[i]);
    }
    var bodyArr = scwin._makeBody(dataListObj, options.gridId);
    for (var i = 0; i < bodyArr.length; i++) {
        tmpStr.push(bodyArr[i]);
    }
    tmpStr.push('</w2:gridView>');
    var xmlStr = tmpStr.join('');
    var data = dataListObj.getAllData();
    var xml = WebSquare.xml.parse(xmlStr, true);
    var _gridObj = _$p.getComponentById(gridId);
    dataListObj.setData([]);
    _gridObj.setGridStyle(xml);
    dataListObj.setData(data);
};
scwin.dynamicGridAdvanced = function (_$p, gridObj, dataListObj) {
};
scwin._getGridOption = function (_gridObj) {
    var options = {
        gridId: _gridObj.org_id || '',
        className: _gridObj.options.className || '',
        readOnly: _gridObj.options.readOnly + '',
        style: _gridObj.options.style,
        autoFit: _gridObj.options.autoFit + '' || 'none',
        autoFitMinWidth: _gridObj.options.autoFitMinWidth + '' || '0',
        columnMove: _gridObj.options.columnMove || 'false',
        editModeEvent: _gridObj.options.editModeEvent || 'onclick',
        fixedColumn: _gridObj.options.fixedColumn || 0,
        focusMode: _gridObj.options.focusMode || 'cell',
        focusMove: _gridObj.options.focusMove || 'true',
        overflowX: _gridObj.options.overflowX || 'auto',
        overflowY: _gridObj.options.overflowY || 'auto',
        readOnly: _gridObj.options.readOnly || 'false',
        resize: _gridObj.options.resize || 'true',
        rowNumVisible: _gridObj.options.rowNumVisible + '' || 'false',
        rowNumWidth: _gridObj.options.rowNumWidth || '0',
        rowNumHeaderValue: _gridObj.options.rowNumHeaderValue || 'No.',
        rowStatusVisible: _gridObj.options.rowStatusVisible + '' || 'false',
        rowStatusHeaderValue: _gridObj.options.rowStatusHeaderValue || '상태',
        rowStatusWidth: _gridObj.options.rowStatusWidth || '0',
        sortable: _gridObj.options.sortable || 'false',
        sortEvent: _gridObj.options.sortEvent || 'ondblclick',
        visibleRowNum: _gridObj.options.visibleRowNum + '' || '8'
    };
    return options;
};
scwin._getGridEvent = function (_gridObj) {
    var gridEventList = _gridObj.userEventList;
    var eventStr = ' ';
    for (var i = 0; i < gridEventList.length; i++) {
        eventStr += ' ev:' + gridEventList[i].name + '=' + '"' + gridEventList[i].param.handler + '"';
    }
    return eventStr;
};
scwin._makeHearder = function (_dataListObj, _gridId, _options) {
    var defaultColWidth = 70;
    if (_options) {
        defaultColWidth = _options.defaultColWidth || 70;
    }
    var tmpStr = [];
    tmpStr.push('<w2:header id="header_' + _gridId + '">');
    var colInfo = _dataListObj.getInfo().columnInfo;
    var keyList = Object.keys(colInfo);
    tmpStr.push('<w2:row id="row1_' + _gridId + '">');
    for (var i = 0; i < keyList.length; i++) {
        var hearderCol = colInfo[keyList[i]];
        var id = hearderCol.id;
        var headerId = 'th_' + id;
        if (!id) {
            headerId = 'th_column_' + i;
        }
        var headerValue = hearderCol.name;
        var colWidth = hearderCol.width;
        if (!colWidth)
            colWidth = defaultColWidth;
        tmpStr.push('<w2:column width="' + colWidth + '" ');
        tmpStr.push('inputType="text" ');
        tmpStr.push('id="' + headerId + '" ');
        tmpStr.push('value="' + headerValue + '" ');
        tmpStr.push('blockSelect="false" ');
        tmpStr.push('displayMode="label" ');
        tmpStr.push('hidden="false">');
        tmpStr.push('</w2:column>');
    }
    tmpStr.push('</w2:row>');
    tmpStr.push('</w2:header>');
    return tmpStr;
};
scwin._makeBody = function (_dataListObj, _gridId, _options) {
    var defaultColWidth = 70;
    var textAlign = '';
    var dateFormat = 'yyyy-MM-dd';
    var numberFormat = '#,###';
    if (_options) {
        defaultColWidth = _options.defaultColWidth || 70;
        dateFormat = _options.dateFormat || 'yyyy-MM-dd';
        numberFormat = _options.numberFormat || '#,###';
        textAlign = _options.textAlign || 'center';
    }
    var tmpStr = [];
    tmpStr.push('<w2:gBody id="gBody1_' + _gridId + '">');
    tmpStr.push('<w2:row id="row2_' + _gridId + '">');
    var colInfo = _dataListObj.getInfo().columnInfo;
    var keyList = Object.keys(colInfo);
    for (var i = 0; i < keyList.length; i++) {
        var bodyCol = colInfo[keyList[i]];
        var columnId = bodyCol.id;
        var dataType = bodyCol.dataType;
        var colWidth = bodyCol.width;
        if (!colWidth)
            colWidth = defaultColWidth;
        var displayFormat = bodyCol.displayFormat || '';
        if (!displayFormat) {
            if (dataType == 'date') {
                displayFormat = dateFormat;
            } else if (dataType == 'number' || dataType == 'bigDecimal') {
                displayFormat = numberFormat;
            }
        }
        var textAlign = bodyCol.textAlign || '';
        if (!textAlign) {
            if (dataType == 'number' || dataType == 'bigDecimal') {
                textAlign = 'right';
            }
        }
        var customFormatter = bodyCol.customFormatter || '';
        var displayFormatter = bodyCol.displayFormatter || '';
        var displayFormatFunc = bodyCol.displayFormatFunc || '';
        var readOnly = bodyCol.readOnly || '';
        tmpStr.push('<w2:column width="' + colWidth + '" ');
        tmpStr.push(' inputType="text" id="' + columnId + '"  ');
        tmpStr.push(' blockSelect="false" ');
        tmpStr.push(' displayMode="label" ');
        tmpStr.push(' hidden="false" ');
        tmpStr.push(' dataType="' + dataType + '" ');
        if (displayFormat) {
            tmpStr.push(' displayFormat="' + displayFormat + '" ');
        }
        if (textAlign) {
            tmpStr.push(' textAlign="' + textAlign + '" ');
        }
        if (customFormatter) {
            tmpStr.push(' customFormatter="' + customFormatter + '" ');
        }
        if (displayFormatter) {
            tmpStr.push(' displayFormatter="' + displayFormatter + '" ');
        }
        if (displayFormatFunc) {
            tmpStr.push(' displayFormatFunc="' + displayFormatFunc + '" ');
        }
        if (readOnly) {
            tmpStr.push(' readOnly="' + readOnly + '" ');
        }
        tmpStr.push('></w2:column>');
    }
    tmpStr.push('</w2:row>');
    tmpStr.push('</w2:gBody>');
    return tmpStr;
};
scwin.getParameter = function (_$p, paramKey) {
    try {
        if (typeof paramKey !== 'undefined') {
            param = _$p.getParameter(paramKey);
            if (typeof param !== 'undefined' && param !== '') {
                return param;
            }
            var param = _$p.getParameter('param');
            if (typeof param !== 'undefined' && param !== '') {
                return param[paramKey];
            }
            return param;
        } else {
            return _$p.getParameter('param');
        }
    } catch (ex) {
        return '';
    }
};
scwin.strSerialize = function (_$p, object) {
    if (typeof object == 'string') {
        return object;
    } else if ($c.util.isJSON(_$p, object)) {
        return JSON.stringify(_$p, object);
    } else if ($c.util.isXmlDoc(_$p, object)) {
        return WebSquare.xml.serialize(object);
    } else {
        return object;
    }
};
}}}]}]},{T:1,N:'body',A:{'ev:onpageload':'scwin.onpageload'}}]}]})