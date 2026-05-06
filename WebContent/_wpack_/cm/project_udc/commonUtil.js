/*amd /cm/project_udc/commonUtil.xml 10497 db1382dd9fc538e24868b39b9c61009dc7dcd788ecbf8dcd80516796b6c70c20 */
define({declaration:{A:{version:'1.0',encoding:'UTF-8'}},E:[{T:1,N:'html',A:{xmlns:'http://www.w3.org/1999/xhtml','xmlns:ev':'http://www.w3.org/2001/xml-events','xmlns:w2':'http://www.inswave.com/websquare','xmlns:xf':'http://www.w3.org/2002/xforms'},E:[{T:1,N:'head',A:{},E:[{T:1,N:'w2:type',E:[{T:3,text:'COMPONENT'}]},{T:1,N:'w2:buildDate'},{T:1,N:'w2:MSA'},{T:1,N:'xf:model',E:[{T:1,N:'w2:dataCollection',A:{baseNode:'map'}},{T:1,N:'w2:workflowCollection'}]},{T:1,N:'w2:layoutInfo'},{T:1,N:'w2:publicInfo',A:{method:'scwin.getJSON,scwin.isJSON,scwin.isArray, scwin.isEmpty,scwin.getObjectType,\r\n                               scwin.isMobile,scwin.isXmlDoc,scwin.setGridViewDelCheckBox,scwin.getChildren,scwin.getGridViewDataList,\r\n                               scwin.getComponent,scwin.createComponent,scwin.setInterval,scwin.clearInterval,scwin.clearTimeout,\r\n                               scwin.copyClipboard,scwin.getFunctionByName,scwin.isMobile,scwin.isEmpty,scwin.getComponent,scwin.setTimeout,scwin.clearTimeout,\r\n                               scwin.getLanguage'}},{T:1,N:'script',A:{lazy:'false',type:'text/javascript'},E:[{T:4,cdata:function(scopeObj){with(scopeObj){scwin.getJSON = function (_$p, value) {
    try {
        if (scwin.isXmlDoc(_$p, value) === true) {
            return JSON.parse(WebSquare.json.XML2JSONString(value));
        } else {
            return JSON.parse(value);
        }
    } catch (ex) {
        return value;
    }
};
scwin.isJSON = function (_$p, json) {
    try {
        if (jQuery.isPlainObject(json) === false && scwin.isArray(_$p, json) === false) {
            return false;
        }
        if (typeof json === 'object') {
            try {
                JSON.stringify(json);
                return true;
            } catch (ex) {
                return false;
            }
        } else if (typeof json === 'string') {
            try {
                JSON.parse(json);
                return true;
            } catch (ex) {
                return false;
            }
        }
        return false;
    } catch (ex) {
        console.error(ex);
        return false;
    }
};
scwin.isArray = function (_$p, array) {
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
scwin.isEmpty = function (_$p, value) {
    if (typeof value === 'undefined' || value === null || value === '') {
        return true;
    } else {
        return false;
    }
};
scwin.getObjectType = function (_$p, obj) {
    var objType = typeof obj;
    if (objType !== 'object') {
        return objType;
    } else if (scwin.isArray(_$p, obj)) {
        return 'array';
    } else if (scwin.isJSON(_$p, obj)) {
        return 'json';
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
scwin.isMobile = function (_$p) {
    return WebSquare.util.isMobile();
};
scwin.isXmlDoc = function (_$p, data) {
    if (typeof data != 'object')
        return false;
    if (typeof data.documentElement != 'undefined' && data.nodeType == 9 || typeof data.documentElement == 'undefined' && data.nodeType == 1) {
        return true;
    }
    return false;
};
scwin.setGridViewDelCheckBox = function (_$p, gridViewObjArr) {
    try {
        if (scwin.getObjectType(_$p, gridViewObjArr) === 'array') {
            for (idx in gridViewObjArr) {
                setGridViewDelCheckBox(_$p, gridViewObjArr[idx]);
            }
        } else {
            setGridViewDelCheckBox(_$p, gridViewObjArr);
        }
        function setGridViewDelCheckBox(_$p, gridViewObj) {
            gridViewObj.bind('oncellclick', function (row, col) {
                var columnId = gridViewObj.getColumnID(col);
                if (columnId == 'chk') {
                    var dltObj = scwin.getGridViewDataList(_$p, this);
                    var realRowIndex = this.getRealRowIndex(row);
                    if (dltObj.getFilterList().length > 0) {
                        realRowIndex = dltObj.getFilteredRowIndex(realRowIndex);
                    }
                    var newValue = dltObj.getCellData(realRowIndex, columnId);
                    scwin._setGridViewRowCheckBox(_$p, this, realRowIndex, newValue === '1' ? true : false);
                }
            });
            gridViewObj.bind('onheaderclick', function (headerId) {
                if (headerId == 'chk') {
                    var newValue = this.getHeaderValue(headerId);
                    var dltObj = scwin.getGridViewDataList(_$p, this);
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
scwin._setGridViewRowCheckBox = function (_$p, gridViewObj, rowIndex, newValue) {
    var rowIndexArr = gridViewObj.getChildrenRowIndexArray(rowIndex);
    var dltObj = scwin.getGridViewDataList(_$p, gridViewObj);
    for (var idx in rowIndexArr) {
        var childRowIndexArr = gridViewObj.getChildrenRowIndexArray(rowIndexArr[idx]);
        if (childRowIndexArr.length > 0) {
            scwin._setGridViewRowCheckBox(_$p, gridViewObj, rowIndexArr[idx], newValue);
        } else {
            scwin._deleteGridViewRow(_$p, gridViewObj, rowIndexArr[idx], newValue);
        }
    }
    scwin._deleteGridViewRow(_$p, gridViewObj, rowIndex, newValue);
};
scwin._deleteGridViewRow = function (_$p, gridViewObj, rowIndex, newValue) {
    gridViewObj.setCellChecked(rowIndex, 'chk', newValue);
    var dltObj = scwin.getGridViewDataList(_$p, gridViewObj);
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
scwin.getChildren = function (_$p, comObj, options) {
    return WebSquare.util.getChildren(comObj, options);
};
scwin.getGridViewDataList = function (_$p, gridViewObj) {
    var dataListId = gridViewObj.getDataList();
    if (dataListId !== '') {
        var dataList = _$p.getComponentById(dataListId);
        if (typeof dataList === 'undefined' || dataList === null) {
            console.log('DataList(' + dataListId + ')를 찾을 수 없습니다.');
            return null;
        } else {
            return dataList;
        }
    } else {
        console.log(gridViewObj.getID() + '는 DataList가 세팅되어 있지 않습니다.');
        return null;
    }
};
scwin.getComponent = function (_$p, compId) {
    var object = _$p.getComponentById(compId);
    if (typeof object === 'undefined') {
        return null;
    } else {
        return object;
    }
};
scwin.createComponent = function (_$p, strCompId, strCompName, option, parent, itemSet) {
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
            return _$p.dynamicCreate(strCompId, strCompName, option, parent, itemSet);
        }
    } catch (ex) {
        console.error(ex);
        return null;
    }
};
scwin.setInterval = function (_$p, func, options) {
    _$p.setInterval(func, options);
};
scwin.clearInterval = function (_$p, keyname, force) {
    _$p.clearInterval(keyname, force);
};
scwin.setTimeout = function (_$p, func, options) {
    _$p.setTimeout(func, options);
};
scwin.clearTimeout = function (_$p, keyname, force) {
    _$p.clearTimeout(keyname, force);
};
scwin.copyClipboard = function (_$p, comObj) {
    if (typeof comObj !== 'undefined') {
        comObj.select();
    }
    document.execCommand('Copy');
};
scwin.getFunctionByName = function (_$p, functionName, context) {
    var rtnFunc;
    try {
        var namespaces = functionName.split('.');
        var func = namespaces.pop();
        for (var i = 0; i < namespaces.length; i++) {
            context = context[namespaces[i]];
        }
        rtnFunc = context[func];
    } catch (ex) {
        rtnFunc = null;
    }
    return rtnFunc;
};
scwin.getLanguage = function (_$p) {
    var language = navigator.language || navigator.userLanguage || navigator.systemLanguage;
    if (scwin.isEmpty(_$p, language) === false && language.length > 1) {
        return language.substring(0, 2);
    } else {
        return '';
    }
};
scwin.getServerDateTime = function (_$p, sDateFormat) {
    if (scwin.isEmpty(_$p, sDateFormat)) {
        sDateFormat = 'yyyyMMdd';
    }
    return WebSquare.date.getCurrentServerDate(sDateFormat);
};
}}}]}]},{T:1,N:'body'}]}]})