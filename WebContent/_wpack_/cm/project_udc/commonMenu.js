/*amd /cm/project_udc/commonMenu.xml 7983 2b991c801e26653c16f036b864aa86a7cecc83b5c6a2ae9edefbb0538b8f8875 */
define({declaration:{A:{version:'1.0',encoding:'UTF-8'}},E:[{T:1,N:'html',A:{xmlns:'http://www.w3.org/1999/xhtml','xmlns:ev':'http://www.w3.org/2001/xml-events','xmlns:w2':'http://www.inswave.com/websquare','xmlns:xf':'http://www.w3.org/2002/xforms'},E:[{T:1,N:'head',E:[{T:1,N:'w2:type',E:[{T:3,text:'COMPONENT'}]},{T:1,N:'w2:buildDate'},{T:1,N:'w2:publicInfo',A:{method:'scwin.initCommonMenu,scwin.getHeaderType,scwin.setHeaderType,\r\n		                       scwin.openMenu,scwin.getSideType,scwin.setSideType,\r\n							   scwin.setLayoutType,  scwin.getLayoutType, scwin.setLayoutId, \r\n							   scwin.getMenuInfo,scwin.setMenuInfo,scwin.getMenuDataList'}},{T:1,N:'xf:model',E:[{T:1,N:'w2:dataCollection',A:{baseNode:'map'}},{T:1,N:'w2:workflowCollection'},{T:1,N:'xf:submission',A:{id:'sbm_menuData',ref:'',target:'data:json,dataList1',action:'',method:'post',mediatype:'application/json',encoding:'UTF-8',instance:'',replace:'',errorHandler:'',customHandler:'',mode:'asynchronous',processMsg:'','ev:submit':'','ev:submitdone':'scwin.sbm_menuData_submitdone','ev:submiterror':'',abortTrigger:''}}]},{T:1,N:'w2:layoutInfo'},{T:1,N:'script',A:{type:'text/javascript',lazy:'false'},E:[{T:4,cdata:function(scopeObj){with(scopeObj){scwin.menuCallBackArr = [];
scwin.COMMON_MENU_INFO = {
    DATA_LIST: 'dlt_menu',
    LEVEL_FIELD: 'MENU_LEVEL',
    ID_FIELD: 'MENU_CD',
    NAME_FIELD: 'MENU_NM',
    SRC_FIELD: 'SRC_PATH',
    PARENT_FIELD: 'PARENT_MENU_CD',
    FILED_ARR: [
        'BIZ_TYPE',
        'IS_USE',
        'SORT_ORDER',
        'PROGRAM_CD'
    ]
};
scwin.MENU_COMPONENT_TYPE = {
    SIDE: '2',
    HEADER: '2'
};
scwin.LAYOUT_TYPE = 'T';
scwin.LAYOUT_ID = '';
if (scwin.LAYOUT_TYPE == 'T') {
    scwin.LAYOUT_ID = 'tac_layout';
} else if (scwin.LAYOUT_TYPE == 'M') {
    scwin.LAYOUT_ID = 'wdc_main';
} else if (scwin.LAYOUT_TYPE == 'S') {
    scwin.LAYOUT_ID = 'wfm_main';
}
scwin.selMenuAction = '/main/init';
scwin.codeActionMethod = 'post';
scwin.onpageload = function () {
};
scwin.initCommonMenu = function (_$p, _callBack) {
    scwin.menuCallBackArr.push(_callBack);
    scwin.createCommonMenuDataList(_$p);
};
scwin.getMenuInfo = function () {
    return scwin.COMMON_MENU_INFO;
};
scwin.setMenuInfo = function (_$p, menuInfo) {
    scwin.COMMON_MENU_INFO = menuInfo;
};
scwin.getHeaderType = function (_$p) {
    return scwin.MENU_COMPONENT_TYPE.HEADER;
};
scwin.setHeaderType = function (_$p, headerType) {
    scwin.MENU_COMPONENT_TYPE.HEADER = headerType;
};
scwin.getSideType = function (_$p) {
    return scwin.MENU_COMPONENT_TYPE.SIDE;
};
scwin.setSideType = function (_$p, sideType) {
    scwin.MENU_COMPONENT_TYPE.SIDE = sideType;
};
scwin.getLayoutType = function (_$p) {
    return scwin.LAYOUT_TYPE;
};
scwin.setLayoutType = function (_$p, type) {
    scwin.LAYOUT_TYPE = type;
};
scwin.setLayoutId = function (_$p, id) {
    scwin.LAYOUT_ID = id;
};
scwin.createCommonMenuDataList = function (_$p) {
    var columnInfoJson = {};
    var columnInfoList = [];
    scwin.COMMON_MENU_INFO.FILED_ARR.push(scwin.COMMON_MENU_INFO.LEVEL_FIELD);
    scwin.COMMON_MENU_INFO.FILED_ARR.push(scwin.COMMON_MENU_INFO.ID_FIELD);
    scwin.COMMON_MENU_INFO.FILED_ARR.push(scwin.COMMON_MENU_INFO.NAME_FIELD);
    scwin.COMMON_MENU_INFO.FILED_ARR.push(scwin.COMMON_MENU_INFO.SRC_FIELD);
    scwin.COMMON_MENU_INFO.FILED_ARR.push(scwin.COMMON_MENU_INFO.PARENT_FIELD);
    var len = scwin.COMMON_MENU_INFO.FILED_ARR.length;
    for (var j = 0; j < len; j++) {
        columnInfoJson = {
            'id': scwin.COMMON_MENU_INFO.FILED_ARR[j],
            'name': scwin.COMMON_MENU_INFO.FILED_ARR[j],
            'dataType': 'text'
        };
        columnInfoList.push(columnInfoJson);
    }
    $c.common.createDataList(_$p, scwin.COMMON_MENU_INFO.DATA_LIST, columnInfoList);
    scwin.getTranMenuData(_$p);
};
scwin.getTranMenuData = function (_$p) {
    sbm_menuData.action = scwin.selMenuAction;
    sbm_menuData.target = 'data:json,' + scwin.COMMON_MENU_INFO.DATA_LIST;
    $p.executeSubmission(sbm_menuData);
};
scwin.sbm_menuData_submitdone = function (e) {
    var jsonData = $p.getComponentById(scwin.COMMON_MENU_INFO.DATA_LIST).getAllJSON();
    scwin.menuCallBackArr[0](jsonData);
    scwin.menuCallBackArr.shift();
};
scwin.getMenuDataList = function (_$p) {
    return $p.getComponentById(scwin.COMMON_MENU_INFO.DATA_LIST);
};
scwin.openMenu = function (_$p, menuNm, url, menuCode, paramObj, menuType, closable) {
    if (url == '/') {
        var url = document.location.href + '/';
        window.open(url, '', 'width=1200, height=700, left=450, top=100');
    } else {
        menuCode = menuCode || '';
        var data;
        if (url.indexOf('/') !== 0) {
            url = '/' + url;
        }
        if (typeof paramObj !== 'undefined' && paramObj !== null) {
            data = paramObj;
        } else {
            data = {};
        }
        var frameMode = '';
        if (paramObj && paramObj.frameMode) {
            frameMode = paramObj.frameMode;
        }
        data.menuNm = menuNm;
        data.menuCode = menuCode;
        data.menuType = menuType;
        data.url = url;
        data.closable = closable;
        data.frameMode = frameMode;
        if (scwin.LAYOUT_TYPE == 'T') {
            data.openAction = 'select';
            scwin.addTab(_$p, data);
        } else if (scwin.LAYOUT_TYPE == 'M') {
            data.openAction = 'existWindow';
            scwin.addWindows(_$p, data);
        } else {
            scwin.replaceWindows(_$p, data);
        }
    }
};
scwin.replaceWindows = function (_$p, data) {
    var win_main = _$p.top().$p.getComponentById(scwin.LAYOUT_ID);
    var url = data.url;
    var obj = {
        dataObject: {
            'type': 'json',
            'name': 'param',
            'data': data
        }
    };
    if (win_main.getSrc() == url)
        return;
    win_main.setSrc(url, obj);
};
scwin.addWindows = function (_$p, data) {
    var win_main = _$p.top().$p.getComponentById(scwin.LAYOUT_ID);
    var menuId = data.menuCode;
    var menuNm = data.menuNm;
    ;
    var url = data.url;
    ;
    var openAction = data.openAction || 'existWindow';
    var frameMode = data.frameMode || 'wframe';
    var closable = data.closable;
    if (typeof closable === 'undefined' || closable == 'true' || closable === true) {
        closable = true;
    } else {
        closable = false;
    }
    var options = {
        title: menuNm,
        src: url,
        windowTitle: menuNm,
        windowId: menuId,
        openAction: openAction,
        frameMode: frameMode,
        dataObject: {
            type: 'json',
            name: 'param',
            data: data
        }
    };
    win_main.createWindow(options);
};
scwin.addTab = function (_$p, data) {
    var menuId = data.menuCode;
    var menuNm = data.menuNm;
    ;
    var url = data.url;
    ;
    var openAction = data.openAction;
    var frameMode = data.frameMode || 'wframePreload';
    var closable = data.closable;
    if (typeof closable === 'undefined' || closable == 'true' || closable === true) {
        closable = true;
    } else {
        closable = false;
    }
    data.menuNm = menuNm;
    data.menuCode = menuId;
    var tabOptions = {
        label: menuNm || '',
        openAction: openAction,
        closable: closable
    };
    var contentsOptions = {
        frameMode: frameMode,
        wframe: true,
        scope: true,
        src: url,
        alwaysDraw: false,
        dataObject: {
            type: 'json',
            name: 'param',
            data: data
        }
    };
    ;
    var tab_main = _$p.top().$p.getComponentById(scwin.LAYOUT_ID);
    var tabID = tab_main.addTab(menuId, tabOptions, contentsOptions);
    if (tab_main.getSelectedTabID() !== menuId) {
        var tabIndex = tab_main.getTabIndex(menuId);
        if (tabIndex > -1) {
            tab_main.setSelectedTabIndex(tabIndex);
        }
    }
};
}}}]}]},{T:1,N:'body',A:{'ev:onpageload':'scwin.onpageload'}}]}]})