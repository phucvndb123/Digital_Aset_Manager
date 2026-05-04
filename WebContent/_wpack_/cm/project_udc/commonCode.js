/*amd /cm/project_udc/commonCode.xml 6866 9d5de366180b4d8de333820e5c2184b5f7b060a7f73924fa0eb14f647efd0678 */
define({declaration:{A:{version:'1.0',encoding:'UTF-8'}},E:[{T:1,N:'html',A:{xmlns:'http://www.w3.org/1999/xhtml','xmlns:ev':'http://www.w3.org/2001/xml-events','xmlns:w2':'http://www.inswave.com/websquare','xmlns:xf':'http://www.w3.org/2002/xforms'},E:[{T:1,N:'head',E:[{T:1,N:'w2:type',E:[{T:3,text:'COMPONENT'}]},{T:1,N:'w2:buildDate'},{T:1,N:'w2:publicInfo',A:{method:'scwin.setCommonCode,scwin.getCodeDataListInfo,scwin.clearCodeDataListInfo'}},{T:1,N:'xf:model',E:[{T:1,N:'w2:dataCollection',A:{baseNode:'map'},E:[{T:1,N:'w2:dataMap',A:{baseNode:'map',id:'dma_commonCode'},E:[{T:1,N:'w2:keyInfo',E:[{T:1,N:'w2:key',A:{id:'GRP_CD',name:'GRP_CD',dataType:'text'}},{T:1,N:'w2:key',A:{id:'DATA_PREFIX',name:'name2',dataType:'text'}},{T:1,N:'w2:key',A:{id:'SCOPE_ID',name:'name3',dataType:'text'}}]}]},{T:1,N:'w2:dataList',A:{baseNode:'list',repeatNode:'map',id:'dlt_codeList',saveRemovedData:'true'},E:[{T:1,N:'w2:columnInfo',E:[{T:1,N:'w2:column',A:{id:'CODE_NM',name:'CODE_NM',dataType:'text'}},{T:1,N:'w2:column',A:{id:'COM_CD',name:'COM_CD',dataType:'text'}},{T:1,N:'w2:column',A:{id:'GRP_CD',name:'GRP_CD',dataType:'text'}}]}]}]},{T:1,N:'w2:workflowCollection'},{T:1,N:'xf:submission',A:{id:'sbm_menuData',ref:'',target:'data:json,dataList1',action:'',method:'post',mediatype:'application/json',encoding:'UTF-8',instance:'',replace:'',errorHandler:'',customHandler:'',mode:'asynchronous',processMsg:'','ev:submit':'','ev:submitdone':'scwin.sbm_menuData_submitdone','ev:submiterror':'',abortTrigger:''}},{T:1,N:'xf:submission',A:{id:'sbm_selectCodeList',ref:'data:json,{"id":"dma_commonCode","key":"dma_commonCode"}',target:'',action:'',method:'get',mediatype:'application/json',encoding:'UTF-8',instance:'',replace:'',errorHandler:'',customHandler:'',mode:'asynchronous',processMsg:'','ev:submit':'','ev:submitdone':'scwin.sbm_selectCodeList_submitdone','ev:submiterror':'',abortTrigger:''}}]},{T:1,N:'w2:layoutInfo'},{T:1,N:'script',A:{type:'text/javascript',lazy:'false'},E:[{T:4,cdata:function(scopeObj){with(scopeObj){scwin.scopeList = [];
scwin.commonCodeList = [];
scwin.COMMON_CODE_INFO = {
    DATALIST: 'dlt_codeList',
    LABEL: 'CODE_NM',
    VALUE: 'COM_CD',
    GROUP_COLUMN: 'GRP_CD',
    FILED_ARR: [
        'CODE_NM',
        'COM_CD',
        'GRP_CD'
    ]
};
scwin.selCodeAction = '/common/selectCodeList';
scwin.codeActionMethod = 'post';
scwin.DATA_PREFIX = 'dlt_commonCode';
scwin.onpageload = function () {
};
scwin.setCommonCode = function (_$p, codeOptions, callbackFunc) {
    var codeOptionsLen = 0;
    if (codeOptions) {
        codeOptionsLen = codeOptions.length;
    } else {
        console.error('=== com.setCommonCode Parameter Type Error ===\nex) com.setCommonCode([{\'code:\':\'04\',\'compID\':\'sbx_Gender\'}],\'scwin.callbackFunction\')\n===================================');
    }
    var i, j, codeObj, dltId, dltIdArr = [], paramCode = '', compArr, compArrLen, tmpIdArr;
    var dataListOption = _getCodeDataListOptions(scwin.COMMON_CODE_INFO.FILED_ARR);
    for (i = 0; i < codeOptionsLen; i++) {
        codeObj = codeOptions[i];
        try {
            dltId = scwin.DATA_PREFIX + codeObj.code;
            if (typeof scwin.commonCodeList[dltId] === 'undefined') {
                dltIdArr.push(dltId);
                if (i > 0) {
                    paramCode += ',';
                }
                paramCode += codeObj.code;
                dataListOption.id = dltId;
                _$p.data.create(dataListOption);
            } else {
                dataListOption.id = dltId;
                _$p.data.create(dataListOption);
                var dataListObj = _$p.getComponentById(dataListOption.id);
                dataListObj.setJSON($c.util.getJSON(_$p, scwin.commonCodeList[dltId]));
            }
            if (codeObj.compID) {
                compArr = codeObj.compID.replaceAll(' ', '').split(',');
                compArrLen = compArr.length;
                for (j = 0; j < compArrLen; j++) {
                    tmpIdArr = compArr[j].split(':');
                    if (tmpIdArr.length === 1) {
                        var comp = _$p.getComponentById(tmpIdArr[0]);
                        comp.setNodeSet('data:' + dltId, scwin.COMMON_CODE_INFO.LABEL, scwin.COMMON_CODE_INFO.VALUE);
                    } else {
                        var gridObj = _$p.getComponentById(tmpIdArr[0]);
                        gridObj.setColumnNodeSet(tmpIdArr[1], 'data:' + dltId, scwin.COMMON_CODE_INFO.LABEL, scwin.COMMON_CODE_INFO.VALUE);
                    }
                }
            } else if (codeObj.dataList) {
                compArr = codeObj.compID.replaceAll(' ', '').split(',');
                compArrLen = compArr.length;
                for (j = 0; j < compArrLen; j++) {
                    var comp = _$p.getComponentById(compArr[j]);
                }
            }
        } catch (ex) {
            console.error(ex);
        }
    }
    var dltIdArrStr = '';
    if (dltIdArr.length > 1) {
        dltIdArrStr = $c.common.strSerialize(_$p, dltIdArr);
    } else {
        dltIdArrStr = dltIdArr;
    }
    var searchCodeGrpOption = {
        id: '_sbm_searchCode',
        action: scwin.selCodeAction,
        target: 'data:json,' + dltIdArrStr,
        isProcessMsg: false
    };
    searchCodeGrpOption.submitDoneHandler = function (e) {
        for (var codeGrpDataListId in e.responseJSON) {
            if (codeGrpDataListId.indexOf(scwin.DATA_PREFIX) > -1) {
                scwin.commonCodeList[codeGrpDataListId] = $c.common.strSerialize(_$p, e.responseJSON[codeGrpDataListId]);
            }
            if (!codeObj.compID) {
            }
        }
        if (typeof callbackFunc === 'function') {
            callbackFunc();
        }
    };
    if (paramCode !== '') {
        $c.common.create(_$p, searchCodeGrpOption);
        var sbmObj = $c.util.getComponent(_$p, searchCodeGrpOption.id);
        var reqData = {
            'dma_commonCode': {
                'GRP_CD': paramCode,
                'DATA_PREFIX': scwin.DATA_PREFIX
            }
        };
        sbmObj.setRequestData(reqData);
        $c.common.execute(_$p, sbmObj);
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
scwin.getCodeDataListInfo = function (_$p) {
    return scwin.COMMON_CODE_INFO;
};
scwin.clearCodeDataListInfo = function (_$p) {
    scwin.commonCodeList = [];
};
}}}]}]},{T:1,N:'body',A:{'ev:onpageload':'scwin.onpageload'}}]}]})