scwin.initMainLoad = function () {
    if (typeof wfm_side !== 'undefined' && wfm_side && wfm_side.getWindow && wfm_side.getWindow().scwin && typeof wfm_side.getWindow().scwin.getInitData === 'function') {
        wfm_side.getWindow().scwin.getInitData();
    }
    var deviceWidth = com.num.parseFloat($('body').css('width'));
    if (deviceWidth < 1280) {
        $('.wrap').removeClass('show_menu');
        $('.btn_toggle_menu').removeClass('on');
    }
    gcm.win.addEventOnBeforeUnload();
};
scwin.setHeaderMenu = function () {
    if (typeof wfm_header !== 'undefined' && wfm_header && wfm_header.getWindow && wfm_header.getWindow().scwin) {
        if (typeof wfm_header.getWindow().scwin.setGenerator === 'function') {
            wfm_header.getWindow().scwin.setGenerator();
        }
        if (typeof wfm_header.getWindow().scwin.setMenuCss === 'function') {
            wfm_header.getWindow().scwin.setMenuCss();
        }
    }
};
scwin.getLayoutId = function () {
    if (typeof $p.main().$p.getComponentById('tac_layout') === 'object') {
        return 'T';
    } else if (typeof $p.main().$p.getComponentById('wdc_main') === 'object') {
        return 'M';
    } else if (typeof $p.main().$p.getComponentById('wfm_layout') === 'object') {
        return 'S';
    }
    return null;
};
scwin.isMobileSize = function () {
    var size = {
        width: window.innerWidth || document.body.clientWidth,
        height: window.innerHeight || document.body.clientHeight
    };
    if (size.width <= 1024) {
        return true;
    } else {
        return false;
    }
};
scwin.closeBeforePage = function (frameObj) {
    if (checkBeforeCloseModified(frameObj)) {
        if (confirm(com.data.getMessage('MSG_CM_00006'))) {
            return true;
        } else {
            return false;
        }
    } else {
        return true;
    }
    function checkBeforeCloseModified(frameObj) {
        var changeCheckMainFrame = gcm.data.getChangeCheckedMainFrame(frameObj.scope.$p);
        if (!com.util.isEmpty(changeCheckMainFrame)) {
            var changeCheckDcList = gcm.data.getChangeCheckedMainFrame(frameObj.scope.$p)._changeCheckDcList;
            if (!com.util.isEmpty(changeCheckDcList) && com.util.isArray(changeCheckDcList) && changeCheckDcList.length > 0) {
                for (var i = 0; i < changeCheckDcList.length; i++) {
                    var dlObj = com.util.getComponent(changeCheckDcList[i]);
                    if (!com.util.isEmpty(dlObj) && (dlObj.getObjectType() == 'dataList' || dlObj.getObjectType() == 'dataMap')) {
                        if (dlObj.getModifiedIndex().length > 0) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }
    ;
};
scwin.pushStateMain = function () {
    var data = {
        menuInfo: {
            menuNm: '메인',
            menuCode: 'MAIN'
        }
    };
    gcm.win.pushState(data);
};