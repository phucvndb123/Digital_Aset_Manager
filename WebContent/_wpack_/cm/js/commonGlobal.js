requires('uiplugin.popup');
window.gcm = {
    CONTEXT_PATH: '',
    SERVICE_URL: '',
    DEFAULT_OPTIONS_MODE: 'asynchronous',
    DEFAULT_OPTIONS_MEDIATYPE: 'application/json',
    MESSAGE_CODE: {
        STATUS_ERROR: 'E',
        STATUS_SUCCESS: 'S',
        STATUS_WARNING: 'W',
        STATUS_INFO: 'I'
    },
    MESSAGE_IDX: 1,
    DATA_PREFIX: 'dlt_commonCode',
    COMMON_CODE_INFO: {
        LABEL: 'CODE_NM',
        VALUE: 'COM_CD',
        FILED_ARR: [
            'GRP_CD',
            'COM_CD',
            'CODE_NM'
        ]
    },
    commonCodeList: [],
    CB_FUNCTION_MANAGER: {
        cbFuncIdx: 0,
        cbFuncSave: {}
    },
    FILE_DOWNLOAD_URL: '/file/downloadFile/',
    IS_USE_BROWSER_SHORTCUT: true,
    IS_RESTFUL_URL: false,
    DEBUG_MODE: true
};
gcm.templateConfig = {
    enableWrmMenuDataset: false,
    enableWrmProgramAuthority: false,
    enableHistoryMenuSync: false,
    enableWrmExcelProvider: false
};
gcm.win = {};
gcm.win.getI18NUrl = function (xmlUrl) {
    var baseURL = gcm.CONTEXT_PATH + '/I18N';
    var rsUrl = '';
    var locale = WebSquare.cookie.getCookie('locale');
    var bXml = '/blank.xml';
    xmlUrl = gcm.util.getParameter('w2xPath', xmlUrl) || xmlUrl;
    xmlUrl = xmlUrl.replace(/\?.*/, '');
    if (xmlUrl.search(bXml) > -1 && xmlUrl.search(WebSquare.baseURI) == -1) {
        xmlUrl = WebSquare.baseURI + '/blank.xml';
    }
    var rsURL = baseURL + '?w2xPath=' + WebSquare.jsLoader.getUri(WebSquare.core.getURL(xmlUrl));
    if (locale != null && locale != '') {
        rsURL = rsURL + '&locale=' + unescape(locale);
    }
    return rsURL;
};
gcm.win.getScope = function (comObj) {
    try {
        if (typeof comObj === 'string') {
            var scopeObj = com.util.getComponent(comObj);
            if (scopeObj !== null) {
                return scopeObj.getScopeWindow();
            }
        } else {
            return comObj.getScopeWindow();
        }
    } catch (ex) {
        console.error(ex);
        return null;
    }
};
gcm.win.getActiveWindowInfo = function () {
    var activeInfo = {
        'type': '',
        'window': '',
        'programCd': ''
    };
    var popupList = $p.getPopupWindowList();
    var popupWindow = null;
    if (popupList.length > 0) {
        for (var i = popupList.length - 1; i > -1; i--) {
            if (document.activeElement.id + '_wframe' === popupList[i].$p.getFrameId()) {
                popupWindow = $p.getPopupWindow(document.activeElement.id);
            }
        }
    }
    if (popupWindow !== null) {
        activeInfo['type'] = 'P';
        activeInfo['programCd'] = gcm.win.getProgramId(popupWindow.$p);
        activeInfo['window'] = popupWindow;
    } else if (typeof $p.main().scwin.getLayoutId === 'function') {
        activeInfo['type'] = $p.main().scwin.getLayoutId();
        if (activeInfo['type'] == 'T') {
            var selectedTabId = $p.main().tac_layout.getSelectedTabID();
            var findProgramList = gcm.menuComp.getMatchedJSON('MENU_CD', selectedTabId, true);
            if (findProgramList.length > 0) {
                activeInfo['programCd'] = findProgramList[0].PROGRAM_CD;
            }
            activeInfo['window'] = $p.main().tac_layout.getWindow(selectedTabId);
        } else if (activeInfo['type'] == 'M') {
            var selectedWindowId = $p.main().wdc_main.getSelectedWindowId();
            var findProgramList = gcm.menuComp.getMatchedJSON('MENU_CD', selectedWindowId, true);
            if (findProgramList.length > 0) {
                activeInfo['programCd'] = findProgramList[0].PROGRAM_CD;
            }
            activeInfo['window'] = $p.main().wdc_main.getWindow(selectedWindowId);
        } else if (activeInfo['type'] == 'S') {
            if (gcm.templateConfig.enableWrmMenuDataset && !com.util.isEmpty($p.main().wfm_layout) && !com.util.isEmpty(gcm.data.getParameter($p.main().wfm_layout.getWindow().$p, 'menuInfo')) && !com.util.isEmpty(gcm.data.getParameter($p.main().wfm_layout.getWindow().$p, 'menuInfo').programCd)) {
                activeInfo['programCd'] = gcm.data.getParameter($p.main().wfm_layout.getWindow().$p, 'menuInfo').programCd;
            }
            activeInfo['window'] = $p.main().wfm_layout.getWindow();
        }
    } else {
        activeInfo['type'] = 'P';
        activeInfo['programCd'] = gcm.win.getProgramId($p);
        activeInfo['window'] = $p.getFrame();
    }
    return activeInfo;
};
gcm.win.showToastMessage = function (messageType, message) {
    if (com.util.isEmpty($p.main().wfm_footer)) {
        return;
    }
    var messageIdx = new Date().getTime();
    var wfmFooter = $p.main().wfm_footer.getWindow();
    var className = '';
    if (gcm.MESSAGE_CODE.STATUS_ERROR === messageType) {
        className = 'error';
    } else if (gcm.MESSAGE_CODE.STATUS_SUCCESS === messageType) {
        className = 'success';
    } else if (gcm.MESSAGE_CODE.STATUS_WARNING === messageType) {
        className = 'warning';
    } else {
        className = 'info';
    }
    wfmFooter.$p.dynamicCreate('grp_notice_' + messageIdx, 'group', { style: 'opacity: 0.0;' }, wfmFooter.grp_noticeArea);
    var grpNotice = wfmFooter.$p.getComponentById('grp_notice_' + messageIdx);
    grpNotice.addClass('notice');
    wfmFooter.$p.dynamicCreate('grp_noticeInfo_' + messageIdx, 'group', { style: 'opacity: 0.0' }, grpNotice);
    var grpNoticeInfo = wfmFooter.$p.getComponentById('grp_noticeInfo_' + messageIdx);
    grpNoticeInfo.addClass(className);
    wfmFooter.$p.dynamicCreate('tbx_message_' + messageIdx, 'textbox', {
        style: 'display:inline; margin-left:3px',
        label: message
    }, grpNoticeInfo);
    wfmFooter.$p.$('#' + grpNotice.getID()).fadeTo(1000, 1);
    wfmFooter.$p.$('#' + grpNoticeInfo.getID()).fadeTo(1000, 1);
    com.util.setTimeout(function (idx) {
        var grpNotice = wfmFooter.$p.getComponentById('grp_notice_' + idx);
        if (!com.util.isEmpty(grpNotice)) {
            wfmFooter.$p.$('#' + grpNotice.getID()).fadeTo(1000, 0);
        }
        var grpNoticeInfo = wfmFooter.$p.getComponentById('grp_noticeInfo_' + idx);
        if (!com.util.isEmpty(grpNoticeInfo)) {
            wfmFooter.$p.$('#' + grpNoticeInfo.getID()).fadeTo(1000, 0);
        }
        com.util.setTimeout(function (idx) {
            var tbxMessage = wfmFooter.$p.getComponentById('tbx_message_' + idx);
            if (!com.util.isEmpty(tbxMessage)) {
                tbxMessage.remove();
            }
            var grpNoticeInfo = wfmFooter.$p.getComponentById('grp_noticeInfo_' + idx);
            if (!com.util.isEmpty(grpNoticeInfo)) {
                grpNoticeInfo.remove();
            }
            var grpNotice = wfmFooter.$p.getComponentById('grp_notice_' + idx);
            if (!com.util.isEmpty(grpNotice)) {
                grpNotice.remove();
            }
            var objArr = com.util.getChildren(wfmFooter.grp_noticeArea, {
                includePlugin: 'group textbox',
                recursive: true
            });
        }, {
            delay: 1500,
            args: [idx],
            key: 'MessageRemove' + idx
        });
    }, {
        delay: 3000,
        args: [messageIdx],
        key: 'MessageFadeOut' + messageIdx
    });
};
gcm.win.openMenu = function ($p, menuNm, url, menuCode, paramObj, option) {
    if (com.util.isEmpty(url)) {
        com.win.alert('메뉴에 프로그램이 등록되지 않았습니다.');
        return false;
    }
    if (url == '/') {
        var url = document.location.href + '/';
        window.open(url, '', 'width=1200, height=700, left=450, top=100');
        return false;
    } else {
        menuCode = menuCode || '';
        var layout = $p.main().scwin.getLayoutId();
        var tmpUrl;
        var menuCodeParm = menuCode;
        var frameMode;
        var data = {};
        var closable = true;
        var fixed = false;
        if (url.indexOf('/') !== 0) {
            url = '/' + url;
        }
        url = gcm.CONTEXT_PATH + url;
        if (typeof paramObj !== 'undefined' && paramObj !== null) {
            data = paramObj;
        }
        data.menuInfo = {
            menuNm: menuNm,
            menuCode: menuCode,
            src: url
        };
        if (!com.util.isEmpty(option) && !com.util.isEmpty(option.menuType)) {
            data.menuInfo.menuType = option.menuType;
        }
        if (!com.util.isEmpty(option) && !com.util.isEmpty(option.closable)) {
            closable = option.closable;
        }
        if (!com.util.isEmpty(option) && !com.util.isEmpty(option.fixed)) {
            fixed = option.fixed;
        }
        var frameMode = '';
        if (layout == 'T') {
            var tabObj = {
                closable: closable,
                openAction: 'select',
                label: menuNm
            };
            var contObj = {
                frameMode: 'wframePreload',
                scope: true,
                src: url,
                alwaysDraw: false,
                title: menuNm,
                dataObject: {
                    type: 'json',
                    name: 'paramData',
                    data: data
                }
            };
            return Promise.resolve().then(function () {
                return $p.main().tac_layout.addTab(menuCode, tabObj, contObj);
            }).then(function (tabId) {
                $p.main().tac_layout.setSelectedTabIndex(tabId);
                return tabId;
            }).then(function (tabId) {
                if (!com.util.isEmpty(option) && option.isHistory && !com.util.isEmpty(menuCode)) {
                    gcm.win.pushState(data);
                }
                return tabId;
            });
        } else if (layout == 'M') {
            var options = {
                title: menuNm,
                src: url,
                windowTitle: menuNm,
                windowId: menuCode,
                openAction: 'selectWindow',
                frameMode: 'wframe',
                fixed: fixed === true ? true : false,
                _closable: closable === false ? false : true,
                closeAction: function (title) {
                    var winScope = $p.main().wdc_main.getWindowByUniqueId(this.id);
                    if (winScope.scwin._closable === false) {
                        return false;
                    } else {
                        var isOnbeforecloseall = $p.main().wdc_main.getUserData('isOnbeforeCloseAll');
                        if (typeof isOnbeforecloseall === 'undefined' || isOnbeforecloseall === false) {
                            var isClose = $p.main().scwin.closeBeforePage(winScope.$p.getFrame());
                            if (isClose === false) {
                                $p.main().wdc_main.setFocus($p.main().wdc_main.getSelectedIndex());
                            }
                            $p.main().wdc_main.setUserData('isOnbeforeCloseAll', false);
                            return isClose;
                        }
                        return true;
                    }
                },
                dataObject: {
                    type: 'json',
                    name: 'paramData',
                    data: data
                }
            };
            return Promise.resolve().then(function () {
                $p.main().wdc_main.createWindow(options);
                return options;
            }).then(function (options) {
                var winScope = $p.main().wdc_main.getWindow(options.windowId);
                winScope.scwin._closable = options._closable;
                if (!com.util.isEmpty(option) && option.isHistory && !com.util.isEmpty(menuCode)) {
                    gcm.win.pushState(data);
                }
            });
        } else if (layout == 'S') {
            var isClose = $p.main().scwin.closeBeforePage($p.main().wfm_layout.getWindow().$p.getFrame());
            if (isClose) {
                if (gcm.templateConfig.enableWrmMenuDataset && !com.util.isEmpty($p.main().wfm_side) && !com.util.isEmpty($p.main().wfm_side.getWindow().dlt_menu)) {
                    var programCd = $p.main().wfm_side.getWindow().dlt_menu.getMatchedColumnData('SRC_PATH', url, 'PROGRAM_CD');
                    data.menuInfo.programCd = programCd[0];
                }
                if (!com.util.isEmpty(option) && option.isHistory && !com.util.isEmpty(menuCode)) {
                    gcm.win.pushState(data);
                }
                var param = {
                    dataObject: {
                        type: 'json',
                        name: 'paramData',
                        data: data
                    }
                };
                return Promise.resolve().then(function () {
                    return $p.main().wfm_layout.setSrc(url, param);
                });
            } else {
                return false;
            }
        }
    }
    return false;
};
gcm.win.openPopup = function ($p, url, opt, data) {
    data.menuInfo = { src: url };
    var _dataObj = {
        type: 'json',
        data: data,
        name: 'paramData'
    };
    var width = opt.width || 500;
    var height = opt.height || 500;
    try {
        var deviceWidth = parseFloat($('body').css('width'));
        var deviceHeight = parseFloat($('body').css('height'));
        if (!opt.notMinSize) {
            var borderSize = 4;
            if (opt.type != 'browserPopup') {
                borderSize = 4;
                if (deviceWidth > 0 && width > deviceWidth) {
                    width = deviceWidth - borderSize;
                }
                if (deviceHeight > 0 && height > deviceHeight) {
                    height = deviceHeight - borderSize;
                }
            } else {
                if (window.screen.availHeight <= height) {
                    height = window.screen.availHeight - 100;
                }
            }
        }
    } catch (ex) {
        console.error(ex);
    }
    opt.type = opt.type || 'wframePopup';
    opt.frameModal = opt.frameModal || '';
    opt.className = opt.frameModal == 'frame' ? opt.className ? opt.className + ' f_pop' : 'f_pop' : '';
    if (opt.type == 'browserPopup') {
        var top = Math.floor((window.screen.availHeight - 50 - com.num.parseInt(height)) / 2) + (window.screen.availTop || 0) + 'px';
        var left = Math.floor((window.screen.availWidth - com.num.parseInt(width)) / 2) + (window.screen.availLeft || 0) + 'px';
    } else {
        var frameTop = 0;
        var frameLeft = 0;
        if (opt.frameModal === 'frame') {
            frameTop = $p.getFrame().render.getBoundingClientRect().top / 2;
            frameLeft = $p.getFrame().render.getBoundingClientRect().left / 2;
        }
        var top = document.body.offsetHeight / 2 - com.num.parseInt(height) / 2 - frameTop + $(document).scrollTop() + 'px';
        var left = document.body.offsetWidth / 2 - com.num.parseInt(width) / 2 - frameLeft + $(document).scrollLeft() + 'px';
    }
    if (typeof _dataObj.data !== 'undefined') {
        if (typeof _dataObj.data.callbackFn == 'function') {
            var cbFuncIdx = ++gcm.CB_FUNCTION_MANAGER['cbFuncIdx'];
            var idx = '__close_callback_Func__' + new Date().getTime() + '_' + cbFuncIdx;
            gcm.CB_FUNCTION_MANAGER['cbFuncSave'][$p.id + idx] = _dataObj.data.callbackFn;
            _dataObj.data.callbackFn = $p.id + idx;
        } else if (typeof _dataObj.data.callbackFn === 'undefined') {
            _dataObj.data.callbackFn = '';
        } else if (typeof _dataObj.data.callbackFn === 'string') {
            _dataObj.data.callbackFn = $p.id + _dataObj.data.callbackFn;
        }
    }
    var options = {
        id: opt.id,
        popupName: opt.popupName || '',
        type: opt.type,
        width: width + 'px',
        height: height + 'px',
        top: opt.top || top || '140px',
        left: opt.left || left || '500px',
        modal: opt.modal == false ? false : true,
        frameModal: opt.frameModal,
        dataObject: _dataObj,
        alwaysOnTop: opt.alwaysOnTop || true,
        useModalStack: opt.useModalStack == false ? false : true,
        resizable: opt.resizable == false ? false : true,
        useMaximize: opt.useMaximize || false,
        className: opt.className || '',
        scrollbars: true,
        windowDragMove: opt.windowDragMove || true,
        closeAction: function () {
            var popupWindow = $p.getPopupWindow(this.id);
            var isClose = true;
            if (popupWindow.$p.getFrameId() === null) {
                if (typeof $p.main().scwin.closeBeforePage === 'function') {
                    isClose = $p.main().scwin.closeBeforePage(window.$p.main().$p.getFrame());
                }
            } else {
                if (typeof $p.main().scwin.closeBeforePage === 'function') {
                    isClose = $p.main().scwin.closeBeforePage(popupWindow.$p.getFrame());
                }
            }
            if (!isClose) {
                return false;
            }
            var messageType = gcm.data.getParameter(popupWindow.$p, 'messageType') || 'alert';
            var callbackFuncStr = gcm.data.getParameter(popupWindow.$p, 'callbackFn');
            var callbackFunc = gcm.util.getCallBackFunction(callbackFuncStr);
            if (typeof callbackFunc === 'function') {
                var popup = popupWindow.scwin._popup;
                if (!com.util.isEmpty(popup) && !com.util.isEmpty(popup.callbackParam)) {
                    callbackFunc(com.util.getJSON(popup.callbackParam));
                } else if (!com.util.isEmpty(popupWindow.$p.main().scwin._popup) && !com.util.isEmpty(popupWindow.$p.main().scwin._popup.callbackParam)) {
                    callbackFunc(com.util.getJSON(popupWindow.$p.main().scwin._popup.callbackParam));
                } else {
                    if (messageType === 'confirm') {
                        callbackFunc({ clickValue: false });
                    }
                }
            }
            return true;
        },
        popupUrl: '../popup'
    };
    $p.openPopup(gcm.CONTEXT_PATH + url, options);
};
gcm.win.closePopup = function ($p, popId, callbackParamStr, callbackFnStr) {
    com.util.setTimeout(function () {
        if ($p.isWFramePopup()) {
            $p.closePopup(popId);
        } else {
            $w.closePopup();
            var func = gcm.util.getCallBackFunction(callbackFnStr);
            if (func) {
                func(com.util.getJSON(callbackParamStr));
            } else if (opener !== null) {
                var func = opener.gcm.util.getCallBackFunction(callbackFnStr);
                func(com.util.getJSON(callbackParamStr));
            }
        }
    }, {
        delay: 10,
        key: 'closePopup' + (Math.random() * 16).toString().replace('.', '')
    });
};
gcm.win.messagBox = function ($p, messageType, messageStr, closeCallbackFncName, opts) {
    var messageStr = messageStr || '';
    var messageType = messageType || 'alert';
    var popId = messageType || 'Tmp';
    popId = popId + (Math.random() * 16).toString().replace('.', '');
    if (typeof opts.callBackParam !== 'object') {
        opts.callBackParam = {};
    }
    if (com.util.isArray(messageStr)) {
        var sysMsg = com.data.getMessage(messageStr);
        if (typeof sysMsg === 'string' && sysMsg != '') {
            messageStr = sysMsg;
        } else {
            messageStr = '';
        }
    } else {
        var sysMsg = com.data.getMessage(messageStr);
        if (typeof sysMsg === 'string' && com.util.isEmpty(sysMsg) === false) {
            messageStr = sysMsg;
        }
    }
    var data = {
        'message': messageStr,
        'callbackFn': closeCallbackFncName,
        'messageType': messageType,
        'id': popId,
        'callBackParam': opts.callBackParam
    };
    var options = {
        id: popId,
        popupName: messageType == 'alert' ? com.data.getMessage('MSG_CM_00046') : com.data.getMessage('MSG_CM_00047'),
        width: 380,
        height: 223,
        frameModal: 'top',
        className: 'messagebox'
    };
    com.win.openPopup('/cm/xml/messageBox.xml', options, data);
};
gcm.win.setProgramAuthority = function ($p) {
    if (!gcm.templateConfig.enableWrmProgramAuthority) {
        return;
    }
    var menuInfo = com.data.getParameter('menuInfo');
    if (typeof menuInfo !== 'undefined' && typeof menuInfo.menuCode !== 'undefined' && menuInfo.menuCode.trim() !== '') {
        var menuCd = menuInfo.menuCode;
        var menuInfoList = $p.main().wfm_side.getWindow().dlt_menu.getMatchedJSON('MENU_CD', menuCd);
        if (menuInfoList.length > 0) {
            var programAuthorityList = $p.main().wfm_side.getWindow().dlt_programAuthority.getMatchedJSON('PROGRAM_CD', menuInfoList[0].PROGRAM_CD);
            if (programAuthorityList.length > 0) {
                var programAuthority = programAuthorityList[0];
                var objArr = com.util.getChildren($p.getFrame(), {
                    excludePlugin: 'group textbox output calendar image span',
                    recursive: true
                });
                for (var i = 0; i < objArr.length; i++) {
                    if (objArr[i].getPluginName() === 'anchor' || objArr[i].getPluginName() === 'trigger') {
                        if (objArr[i].getOriginalID().indexOf('btn_search') > -1) {
                            if (programAuthority.IS_AUTH_SELECT !== 'Y') {
                                objArr[i].hide();
                            }
                        } else if (objArr[i].getOriginalID().indexOf('btn_add') > -1) {
                            if (programAuthority.IS_AUTH_SAVE !== 'Y') {
                                objArr[i].hide();
                            }
                        } else if (objArr[i].getOriginalID().indexOf('btn_cancel') > -1) {
                            if (programAuthority.IS_AUTH_SAVE !== 'Y') {
                                objArr[i].hide();
                            }
                        } else if (objArr[i].getOriginalID().indexOf('btn_save') > -1) {
                            if (programAuthority.IS_AUTH_SAVE !== 'Y') {
                                objArr[i].hide();
                            }
                        } else if (objArr[i].getOriginalID().indexOf('btn_excel') > -1) {
                            if (programAuthority.IS_AUTH_EXCEL !== 'Y') {
                                objArr[i].hide();
                            }
                        }
                    }
                }
            }
        }
    }
};
gcm.win.processCommonData = function ($p) {
    var scwin = gcm.util.getObject($p, 'scwin');
    var commonDataWorkflow = {
        'id': 'wkf_commonDataWorkflow',
        'processMsg': '',
        'step': [],
        'resolveCallback': '',
        'rejectCallback': ''
    };
    if (typeof scwin.ondataload === 'function') {
        commonDataWorkflow['resolveCallback'] = scwin.ondataload;
    }
    var sbmSearchCode = com.util.getComponent('_sbm_searchCode');
    if (com.util.isEmpty(sbmSearchCode) === false) {
        commonDataWorkflow.step = [
            {
                'type': 'submit',
                'action': '_sbm_searchCode'
            },
            {
                'type': 'submitDone',
                'action': '_sbm_searchCode'
            }
        ];
    }
    var sbmSelectShortcutList = com.util.getComponent('_sbm_selectShortcutList');
    if (com.util.isEmpty(sbmSelectShortcutList) === false) {
        commonDataWorkflow.step.push({
            'type': 'submit',
            'action': '_sbm_selectShortcutList'
        });
        commonDataWorkflow.step.push({
            'type': 'submitDone',
            'action': '_sbm_selectShortcutList'
        });
    }
    if (commonDataWorkflow.step.length > 0) {
        com.sbm.executeWorkflow(commonDataWorkflow);
    } else {
        if (typeof scwin.ondataload === 'function') {
            scwin.ondataload();
        }
    }
};
gcm.win.setHistoryBackEvent = function () {
    if (window.addEventListener) {
        window.addEventListener('popstate', gcm.win.changePageState);
    } else {
        window.attachEvent('popstate', gcm.win.changePageState);
    }
};
gcm.win.pushState = function (data) {
    if (data.menuInfo.menuCode === 'MAIN') {
        history.pushState({ 'data': data }, data.menuInfo.menuNm, gcm.CONTEXT_PATH + '/');
    } else {
        history.pushState({ 'data': data }, data.menuInfo.menuNm, '?menuCd=' + data.menuInfo.menuCode);
    }
};
gcm.win.changePageState = function () {
    if (!com.util.isEmpty(history.state) && !com.util.isEmpty(history.state.data) && !com.util.isEmpty(history.state.data.menuInfo)) {
        var options = {};
        options.isHistory = false;
        var data = history.state.data;
        if (gcm.templateConfig.enableHistoryMenuSync && !com.util.isEmpty($p.main().wfm_side) && !com.util.isEmpty($p.main().wfm_side.getWindow().trv_menu) && typeof $p.main().wfm_side.getWindow().trv_menu.findNodeByValue === 'function') {
            $p.main().wfm_side.getWindow().trv_menu.findNodeByValue(data.menuInfo.menuCode, true);
        }
        gcm.win.openMenu($p.main().$p, data.menuInfo.menuNm, data.menuInfo.src, data.menuInfo.menuCode, data.param, options);
    }
};
gcm.win.addEventOnBeforeUnload = function () {
    if (window.addEventListener) {
        window.addEventListener('beforeunload', gcm.win.setOnBeforeUnload);
    } else {
        window.attachEvent('onbeforeunload', gcm.win.setOnBeforeUnload);
    }
};
gcm.win.removeEventOnBeforeUnload = function () {
    if (window.removeEventListener) {
        window.removeEventListener('beforeunload', gcm.win.setOnBeforeUnload);
    } else {
        window.detachEvent('onbeforeunload', gcm.win.setOnBeforeUnload);
    }
};
gcm.win.setOnBeforeUnload = function (e) {
    event.preventDefault();
    event.returnValue = 'You didn\'t save changes';
    return event.returnValue;
};
gcm.win.errorHandler = function (e) {
    if (e.status == 404) {
        com.win.alert(e.responseURL + ' URL이 존재하지 않습니다.');
    }
};
gcm.win.reload = function () {
    gcm.win.removeEventOnBeforeUnload();
    window.location.reload();
};
gcm.win.getProgramId = function ($p) {
    var programId = '';
    if (com.util.isEmpty($p.getMetaValue('meta_programId'))) {
        var src = '';
        if (!com.util.isEmpty($p.getFrame())) {
            src = $p.getFrame().getSrc();
        } else {
            src = $p.getParameter('w2xPath');
        }
        if (src.indexOf('/ui/') >= 0) {
            programId = src.substring(src.lastIndexOf('/') + 1, src.lastIndexOf('.'));
        }
    } else {
        programId = $p.getMetaValue('meta_programId');
    }
    return programId;
};
gcm.data = {};
gcm.data.getValResultMsg = function (valInfo, value, dataCollectionObj, rowIndex) {
    var msgInfo = {
        msgType: '1',
        message: ''
    };
    if (typeof valInfo.mandatory !== 'undefined' && valInfo.mandatory === true && value.length === 0) {
        msgInfo.message = '필수 입력 항목 입니다.';
    } else if (typeof valInfo.minLength !== 'undefined' && valInfo.minLength > 0 && value.length < valInfo.minLength) {
        msgInfo.message = '최소 길이 ' + valInfo.minLength + '자리 이상으로 입력해야 합니다.';
    } else if (typeof valInfo.minByteLength !== 'undefined' && valInfo.minByteLength > 0 && com.str.getByteLength(value) < valInfo.minByteLength) {
        msgInfo.message = '최소 길이 ' + valInfo.minByteLength + '자리 이상으로 입력해야 합니다.';
    } else if (typeof valInfo.isEmail !== 'undefined' && valInfo.isEmail && com.util.isEmpty(value) === false && com.str.isEmail(value) === false) {
        msgInfo.message = '유효한 이메일 주소가 아닙니다.';
    } else if (typeof valInfo.isPhone !== 'undefined' && valInfo.isPhone && com.util.isEmpty(value) === false && com.str.isPhone(value) === false) {
        msgInfo.message = '유효한 전화번호가 아닙니다.';
    } else if (typeof valInfo.valFunc === 'function') {
        var resultMsg = valInfo.valFunc(value, dataCollectionObj, rowIndex);
        if (com.util.isEmpty(resultMsg) === false) {
            msgInfo.msgType = '2';
            msgInfo.message = resultMsg;
        }
    }
    return msgInfo;
};
gcm.data.setDownloadGridViewOption = function (grdObj, options) {
    if (typeof options === 'undefined') {
        options = { hiddenVisible: false };
    }
    var fileName = options.fileName;
    if (com.util.isEmpty(fileName)) {
        var dataCollectionId = com.data.getDataCollection(grdObj).id;
        if (com.util.isEmpty(dataCollectionId) === false) {
            fileName = dataCollectionId;
        } else {
            fileName = 'excel_download';
        }
        if (options.fileType == undefined || options.fileType == '') {
            fileName = fileName + '.xlsx';
        } else {
            fileName = fileName + '.' + options.fileType;
        }
        options.fileName = fileName;
    }
    fileName = fileName.toLowerCase();
    if (options.useProvider == 'true' && gcm.templateConfig.enableWrmExcelProvider) {
        options.dataProvider = 'com.inswave.wrm.provider.ExcelDown';
    }
    if (options.useSplitProvider == 'true' && gcm.templateConfig.enableWrmExcelProvider) {
        options.splitProvider = 'com.inswave.wrm.provider.ExcelSplitDown';
    }
    if (options.useProvider || options.useSplitProvider) {
        var colCnt = grdObj.getColumnCount();
        var columnsIDArr = new Array();
        for (var i = 0; i < colCnt; i++) {
            var isRemoveCol = false;
            if (typeof options.excludeColumns != 'undefined' && options.excludeColumns != null && options.excludeColumns.length > 0) {
                for (var k = 0; k < options.excludeColumns.length; k++) {
                    if (grdObj.getColumnID(i) == options.excludeColumns[k]) {
                        isRemoveCol = true;
                        break;
                    }
                }
            }
            if (isRemoveCol) {
                continue;
            }
            columnsIDArr.push(grdObj.getColumnID(i));
        }
        var xmlDoc = WebSquare.xml.parse(options.providerRequestXml, false);
        WebSquare.xml.setValue(xmlDoc, 'data/keyMap', columnsIDArr.join(','));
        options.providerRequestXml = WebSquare.xml.serialize(xmlDoc);
        delete options.useProvider;
        delete options.useSplitProvider;
    }
    if (typeof options.hiddenVisible === 'undefined' || options.hiddenVisible == false) {
        var grdCnt = grdObj.getColCnt();
        var hiddenColIndex = [];
        for (var idx = 0; idx < grdCnt; idx++) {
            if (!grdObj.getColumnVisible(idx)) {
                hiddenColIndex.push(idx);
            }
        }
        if (hiddenColIndex.length > 0) {
            if (typeof options.removeColumns !== 'undefined' && options.removeColumns.length > 0) {
                options.removeColumns = options.removeColumns + ',' + hiddenColIndex.join(',');
            } else {
                options.removeColumns = hiddenColIndex.join(',');
            }
            var _removeColumnArr = options.removeColumns.split(',');
            options.removeColumns = _removeColumnArr.reduce(function (a, b) {
                if (a.indexOf(b) < 0) {
                    a.push(b);
                }
                return a;
            }, []).join(',');
        }
    }
    if (com.util.isEmpty(options.dataHandler) == true && options.checkedData == true) {
        options.dataHandler = function (gridViewId) {
            var gridViewObj = com.util.getComponent(gridViewId);
            var checkedColumnId = options.checkedColumnId || 'chk';
            var arrIdx = gridViewObj.getCheckedIndex(checkedColumnId);
            return arrIdx.reduce(function (arr, idx) {
                arr = arr.concat(gridViewObj.getRowData(idx));
                return arr;
            }, []);
        };
    }
};
gcm.data.loadMessage = function () {
    var lang = com.util.isEmpty(com.win.getLanguage()) ? 'ko' : com.win.getLanguage();
    var getMessageOption = {
        id: '_sbm_getLanguagePack',
        action: '/message/getAllMessage/' + lang,
        method: 'get',
        submitDoneHandler: function (e) {
            WebSquare.WebSquareLang = e.responseJSON.message;
        },
        isProcessMsg: false
    };
    com.sbm.executeDynamic(getMessageOption);
};
gcm.data.initChangeCheckedDc = function ($p) {
    var scwin = gcm.util.getObject($p, 'scwin');
    if (!com.util.isEmpty(com.data.getParameter('menuInfo'))) {
        scwin._changeCheckDcList = [];
    }
};
gcm.data.setChangeCheckedDc = function ($p, dcObjArr) {
    var mainFrameScwin = gcm.data.getChangeCheckedMainFrame($p);
    if (!com.util.isEmpty(mainFrameScwin) && !com.util.isEmpty(mainFrameScwin._changeCheckDcList)) {
        if (com.util.isArray(dcObjArr)) {
            for (var id in dcObjArr) {
                mainFrameScwin._changeCheckDcList.push(dcObjArr[id].getID());
            }
        } else {
            mainFrameScwin._changeCheckDcList.push(dcObjArr.getID());
        }
    }
};
gcm.data.getChangeCheckedMainFrame = function ($p) {
    var scwin = gcm.util.getObject($p, 'scwin');
    if (typeof scwin._changeCheckDcList !== 'undefined') {
        return scwin;
    } else if ($p.main().$p.getFrameId() !== $p.getFrameId()) {
        return gcm.data.getChangeCheckedMainFrame($p.parent().$p);
    } else {
        return null;
    }
};
gcm.data.getParameter = function ($p, paramKey) {
    var paramData = '';
    try {
        paramData = $p.getParameter('paramData');
        if (com.util.isEmpty(paramData) === false && com.util.isJSON(paramData)) {
            if (com.util.isEmpty(paramKey) === false) {
                return paramData[paramKey];
            } else {
                return paramData;
            }
        } else {
            paramData = getUrlParameter('paramData');
            if (com.util.isEmpty(paramData) === false) {
                paramData = com.util.getJSON(WebSquare.text.BASE64Decode(paramData));
                if (com.util.isEmpty(paramKey) === false) {
                    return paramData[paramKey];
                } else {
                    return paramData;
                }
            }
        }
    } catch (ex) {
        console.error(ex);
        return '';
    }
    return paramData;
    function getUrlParameter(paramKey) {
        var param = [];
        var paramArray = location.search.split(/[\&\?\#]/);
        for (var i = 0; i < paramArray.length; i++) {
            if (com.util.isEmpty(paramArray[i]) === false) {
                var valueIdx = paramArray[i].indexOf('=');
                if (valueIdx > 0) {
                    var key = paramArray[i].substring(0, valueIdx);
                    var value = paramArray[i].substring(valueIdx + 1);
                    if (key === paramKey) {
                        return value;
                    }
                }
            }
        }
    }
};
gcm.sbm = {};
gcm.sbm.preSubmitFunction = function (sbmObj) {
    if (com.util.isEmpty(gcm.CONTEXT_PATH) === false && sbmObj.action.indexOf(gcm.CONTEXT_PATH) !== 0) {
        sbmObj.action = gcm.CONTEXT_PATH + sbmObj.action;
    }
    if (gcm.IS_RESTFUL_URL === true) {
        gcm.sbm.setActionParam(sbmObj);
    }
};
gcm.sbm.setActionParam = function (sbmObj) {
    var requestData = sbmObj.requestData || WebSquare.ModelUtil.getRefToReqData(sbmObj);
    if (com.util.isEmpty(requestData)) {
        return;
    }
    if (typeof requestData === 'string') {
        requestData = JSON.parse(requestData);
    }
    if (com.util.isEmpty(sbmObj.__action)) {
        sbmObj.__action = sbmObj.action;
    }
    var actionUrl = sbmObj.__action;
    var queryParam = {};
    if (sbmObj.__action.indexOf('/{') > -1) {
        actionUrl = actionUrl.substr(0, actionUrl.indexOf('/{'));
    }
    if (com.util.isJSON(requestData)) {
        for (var key in requestData) {
            if (com.util.isEmpty(requestData[key]) === false && com.util.isJSON(requestData[key]) === false) {
                queryParam[key] = encodeURIComponent(requestData[key]);
            } else if (com.util.isJSON(requestData[key]) && com.util.isArray(requestData[key]) === false) {
                for (var subKey in requestData[key]) {
                    if (com.util.isEmpty(requestData[key][subKey]) === false && com.util.isJSON(requestData[key][subKey]) === false) {
                        queryParam[subKey] = encodeURIComponent(requestData[key][subKey]);
                    }
                }
            }
        }
        var actionArr = sbmObj.__action.split(/(\{[^}]*})/g);
        for (var i = 0; i < actionArr.length; i++) {
            if (actionArr[i].match(/(\{[^}]*})/g) !== null) {
                var paramKey = actionArr[i].substr(1, actionArr[i].indexOf('}') - 1);
                if (typeof queryParam[paramKey] !== 'undefined') {
                    actionUrl += '/' + queryParam[paramKey];
                    delete queryParam[paramKey];
                }
            }
        }
        if (sbmObj.method === 'get') {
            for (key in queryParam) {
                if (actionUrl.indexOf('?') === -1) {
                    actionUrl += '?' + key + '=' + queryParam[key];
                } else {
                    actionUrl += '&' + key + '=' + queryParam[key];
                }
            }
        }
        sbmObj.action = actionUrl;
    }
};
gcm.sbm.callbackSubmitFunction = function (resObj, sbmObj) {
    var $p = gcm.win.getScope(sbmObj).scwin.$w;
    if (resObj.responseStatusCode < 100 || resObj.responseStatusCode > 599) {
        var detailStr = 'HTTP STATUS INFO';
        detailStr += resObj.responseStatusCode;
        detailStr += ' - URI:';
        detailStr += resObj.resourceUri;
        var msgObj = {
            statusCode: 'E',
            errorCode: resObj.responseStatusCode,
            message: '서버와 연결할 수 없습니다. 자세한 내용은 관리자에게 문의하시기 바랍니다.',
            messageDetail: detailStr
        };
        com.sbm.resultMsg(msgObj);
        return false;
    }
    if (com.util.isEmpty(resObj.errorType) && typeof sbmObj._promise_submitDoneHandler === 'function') {
        sbmObj._promise_submitDoneHandler(resObj);
    } else if (!com.util.isEmpty(resObj.errorType) && typeof sbmObj._promise_submitErrorHandler === 'function') {
        sbmObj._promise_submitErrorHandler(resObj);
    }
    var rsJSON = resObj.responseJSON || null;
    if (rsJSON && rsJSON.rsMsg) {
        com.sbm.resultMsg(rsJSON.rsMsg);
    }
};
gcm.sbm.submitErrorHandler = function (resObj) {
    var $p = gcm.win.getScope(resObj.id).scwin.$w;
    var detailStr = 'HTTP STATUS INFO';
    detailStr += resObj.responseReasonPhrase;
    detailStr += ' ';
    detailStr += resObj.responseStatusCode;
    detailStr += 'URI:';
    detailStr += resObj.resourceUri;
    detailStr += resObj.responseBody;
    var msgObj = {
        statusCode: 'E',
        errorCode: 'E9998',
        message: '서버 오류입니다. 자세한 내용은 관리자에게 문의하시기 바랍니다.',
        messageDetail: detailStr
    };
    com.sbm.resultMsg(msgObj);
};
gcm.util = {};
gcm.util.getUserAgent = function () {
    try {
        var agt = navigator.userAgent.toLowerCase();
        if (agt.indexOf('edg') != -1) {
            return 'Edge';
        } else if (agt.indexOf('chrome') != -1) {
            return 'Chrome';
        } else if (agt.indexOf('opera') != -1) {
            return 'Opera';
        } else if (agt.indexOf('staroffice') != -1) {
            return 'Star Office';
        } else if (agt.indexOf('webtv') != -1) {
            return 'WebTV';
        } else if (agt.indexOf('beonex') != -1) {
            return 'Beonex';
        } else if (agt.indexOf('chimera') != -1) {
            return 'Chimera';
        } else if (agt.indexOf('netpositive') != -1) {
            return 'NetPositive';
        } else if (agt.indexOf('phoenix') != -1) {
            return 'Phoenix';
        } else if (agt.indexOf('firefox') != -1) {
            return 'Firefox';
        } else if (agt.indexOf('safari') != -1) {
            return 'Safari';
        } else if (agt.indexOf('skipstone') != -1) {
            return 'SkipStone';
        } else if (agt.indexOf('msie') != -1 || agt.indexOf('trident') != -1) {
            return 'msie';
        } else if (agt.indexOf('netscape') != -1) {
            return 'Netscape';
        } else if (agt.indexOf('mozilla/5.0') != -1) {
            return 'Mozilla';
        } else {
            return '';
        }
    } catch (ex) {
        return '';
    }
};
gcm.util.getParameter = function (param, url) {
    if (com.util.isEmpty(url)) {
        url = unescape(location.href);
    }
    var paramArr = url.substring(url.indexOf('?') + 1, url.length).split('&');
    var value = '';
    for (var i = 0; i < paramArr.length; i++) {
        var temp = paramArr[i].split('=');
        if (temp[0].toUpperCase() == param.toUpperCase()) {
            value = paramArr[i].split('=')[1];
            break;
        }
    }
    return value;
};
gcm.util.getObject = function ($p, _objectId, _scopeObj) {
    var scopeObj = _scopeObj || '';
    var topFrameId = $p.main().$p.getFrameId();
    if (scopeObj == 'parent') {
        scopeObj = $p.parent().$p;
    } else if (scopeObj == 'top') {
        scopeObj = $p.main().$p;
    } else if (scopeObj == '') {
        scopeObj = $p;
    } else {
        var isComp = WebSquare.util.getComponentById(topFrameId + '_' + scopeObj);
        if (isComp) {
            scopeObj = isComp.getWindow().$p;
        }
    }
    var objectId = _objectId || '';
    var objectComp;
    try {
        if (objectId != '' && scopeObj && scopeObj.id && scopeObj.id.indexOf(topFrameId) == 0) {
            objectComp = scopeObj.getComponentById(objectId);
        } else if (objectId != '' && objectId.indexOf(topFrameId) == 0) {
            objectComp = WebSquare.util.getComponentById(objectId);
        }
        if (com.util.isEmpty(objectComp)) {
            objectComp = window[scopeObj.id + objectId];
        }
    } catch (ex) {
        console.error(ex);
    }
    return objectComp;
};
gcm.util.getFunction = function ($p, _funcStr, _scopeId) {
    try {
        var fun;
        if (typeof _funcStr == 'undefined') {
            return;
        } else {
            if (typeof _funcStr == 'string') {
                var funcArr = _funcStr.split('.');
                var funcCnt = funcArr.length;
                var frameWin;
                if (!com.util.isEmpty(_scopeId)) {
                    if (_scopeId == 'top') {
                        frameWin = $p.main();
                    } else if (_scopeId == 'parent') {
                        frameWin = $p.parent();
                    } else {
                        var findObj = gcm.util.getObject($p, _scopeId, 'top');
                        if (findObj && typeof findObj.getWindow == 'function') {
                            frameWin = findObj.getWindow();
                        } else {
                            return;
                        }
                    }
                } else {
                    frameWin = $p.getFrame().getWindow();
                }
                var targetObj = frameWin;
                while (funcCnt > 0) {
                    var funcStr = funcArr[funcArr.length - funcCnt];
                    var findFunc = targetObj[funcStr];
                    if (typeof findFunc == 'undefined') {
                        break;
                    } else {
                        fun = findFunc;
                        targetObj = fun;
                        funcCnt--;
                    }
                }
                if (typeof fun == 'function') {
                    return fun;
                }
            } else if (typeof _funcStr == 'function') {
                return _funcStr;
            }
        }
    } catch (ex) {
        console.error(ex);
    }
};
gcm.util.getCallBackFunction = function (callbackFnStr) {
    if (!com.util.isEmpty(callbackFnStr)) {
        if (callbackFnStr.indexOf('__close_callback_Func__') > -1) {
            var func = gcm.CB_FUNCTION_MANAGER['cbFuncSave'][callbackFnStr];
            delete gcm.CB_FUNCTION_MANAGER['cbFuncSave'][callbackFnStr];
            return func;
        } else {
            var func = window.WebSquare.util.getGlobalFunction(callbackFnStr);
            return func;
        }
    }
};
gcm.hkey = {};
gcm.hkey.event = {
    loadingEvent: 'Y',
    keydownEvent: function (e) {
        if (gcm.hkey.event.loadingEvent == 'Y') {
            gcm.hkey.event['checkEvent'].apply(this, [e]);
        }
    },
    checkEvent: function (e) {
        try {
            var lastKey = e.key || e.keyCode || e.which;
            var complexKey = '';
            if (com.util.isEmpty(lastKey)) {
                return;
            }
            if (e.ctrlKey && e.altKey) {
                complexKey = 'ctrlAltKey';
            } else if (e.ctrlKey && e.shiftKey) {
                complexKey = 'ctrlShiftKey';
            } else if (e.altKey && e.shiftKey) {
                complexKey = 'altShiftKey';
            } else {
                if (e.altKey) {
                    complexKey = 'altKey';
                } else if (e.ctrlKey) {
                    complexKey = 'ctrlKey';
                } else if (e.shiftKey) {
                    complexKey = 'shiftKey';
                } else {
                    complexKey = 'singleKey';
                }
            }
            if (lastKey != 'Control' && lastKey != 'Alt' && lastKey != 'Shift') {
                if (typeof lastKey === 'number' || lastKey === 'Unidentified') {
                    if (e.keyCode >= 112 && e.keyCode <= 123) {
                        var f_number = [
                            'F1',
                            'F2',
                            'F3',
                            'F4',
                            'F5',
                            'F6',
                            'F7',
                            'F8',
                            'F9',
                            'F10',
                            'F11',
                            'F12'
                        ];
                        lastKey = f_number[e.keyCode - 112];
                    } else if (e.keyCode == 9) {
                        lastKey = 'Tab';
                    } else if (e.keyCode == 27) {
                        lastKey = 'Escape';
                    } else if (e.keyCode == 187) {
                        lastKey = '=';
                    } else if (e.keyCode == 189) {
                        lastKey = '-';
                    } else {
                        lastKey = String.fromCharCode(e.keyCode).toUpperCase();
                    }
                }
                if (gcm.hkey.event.isPreventKey(complexKey, lastKey)) {
                    gcm.hkey.event.runEvent.apply(e, [
                        complexKey,
                        lastKey
                    ]);
                    if (gcm.IS_USE_BROWSER_SHORTCUT === false) {
                        if ('onhelp' in window) {
                            window.onhelp = function () {
                                return false;
                            };
                        }
                        if (e.preventDefault) {
                            e.preventDefault();
                        } else if (e.returnValue) {
                            e.returnValue = false;
                        }
                    }
                }
            }
        } catch (ex) {
            console.error(ex);
        }
    },
    runEvent: function (complexKey, eventKey) {
        try {
            gcm.hkey.event.runGlobalEvent(complexKey, eventKey);
            var charCode = eventKey.charCodeAt(0);
            if (charCode == 13 || charCode == 39) {
                return;
            }
            var checkShortcut = {};
            var programCd = '';
            eventKey = eventKey.toUpperCase();
            var activeWindowInfo = gcm.win.getActiveWindowInfo();
            var findframe = activeWindowInfo['window'];
            var searchEvent = com.data.getMatchedJSON(gcm.hkey.dataList, [
                {
                    columnId: 'PROGRAM_CD',
                    operator: '==',
                    value: activeWindowInfo['programCd'],
                    logical: '&&'
                },
                {
                    columnId: 'COMPLEX_KEY',
                    operator: '==',
                    value: complexKey,
                    logical: '&&'
                },
                {
                    columnId: 'LAST_KEY',
                    operator: '==',
                    value: eventKey,
                    logical: '&&'
                }
            ]);
            if (typeof searchEvent == 'undefined' || searchEvent.length == 0) {
                searchEvent = com.data.getMatchedJSON(gcm.hkey.dataList, [
                    {
                        columnId: 'PROGRAM_CD',
                        operator: '==',
                        value: 'TOP',
                        logical: '&&'
                    },
                    {
                        columnId: 'COMPLEX_KEY',
                        operator: '==',
                        value: complexKey,
                        logical: '&&'
                    },
                    {
                        columnId: 'LAST_KEY',
                        operator: '==',
                        value: eventKey,
                        logical: '&&'
                    }
                ]);
            }
            if (typeof searchEvent != 'undefined' && searchEvent.length > 0) {
                var shortuctObj = searchEvent[0];
                if (shortuctObj['EVENT_TYPE'] === 'F') {
                    if (shortuctObj['EVENT_YN'] == 'Y') {
                        var funcTokenArr = shortuctObj['EVENT_TARGET'].split('.');
                        var runFunction = findframe;
                        if (funcTokenArr.length > 0) {
                            for (var i = 0; i < funcTokenArr.length; i++) {
                                runFunction = runFunction[funcTokenArr[i].trim()];
                            }
                        } else {
                            runFunction = false;
                        }
                        if (typeof runFunction == 'function') {
                            runFunction();
                        }
                    }
                } else if (shortuctObj['EVENT_TYPE'] === 'B') {
                    if (shortuctObj['EVENT_YN'] == 'Y') {
                        var runComponent = findframe.$p.getComponentById(shortuctObj['EVENT_TARGET'].trim());
                        if (runComponent) {
                            runComponent.trigger('click');
                        }
                    }
                }
            }
            gcm.hkey.dataList.removeColumnFilterAll();
        } catch (ex) {
            console.error(ex);
        }
    },
    addEvent: function (object) {
        var successFlag = false;
        try {
            var programCd = object['PROGRAM_CD'] || '';
            var keyCodeObj = gcm.hkey.event._keyToken(object.shortCutKey.toUpperCase());
            var eventTarget = object['EVENT_TARGET'] || '';
            var eventName = object['EVENT_NAME'] || '';
            var eventDetail = object['EVENT_DETAIL'] || '';
            var eventType = object['EVENT_TYPE'].toUpperCase() == 'B' || object['EVENT_TYPE'].toUpperCase() == 'BUTTON' ? 'B' : 'F';
            var eventYn = object['EVENT_YN'] || 'Y';
            if (programCd == '' || eventTarget == '') {
                return false;
            } else {
                var isKey = com.data.getMatchedJSON(gcm.hkey.dataList.getID(), [
                    {
                        columnId: 'PROGRAM_CD',
                        operator: '==',
                        value: object['PROGRAM_CD'],
                        logical: '&&'
                    },
                    {
                        columnId: 'COMPLEX_KEY',
                        operator: '==',
                        value: keyCodeObj['COMPLEX_KEY'],
                        logical: '&&'
                    },
                    {
                        columnId: 'LAST_KEY',
                        operator: '==',
                        value: keyCodeObj['LAST_KEY'].toUpperCase(),
                        logical: '&&'
                    }
                ]);
                if (isKey.length > 0) {
                    var index = gcm.hkey.dataList.getRealRowIndex(0);
                    gcm.hkey.dataList.setRowJSON(insertIdx, {
                        'PROGRAM_CD': programCd,
                        'COMPLEX_KEY': keyCodeObj['COMPLEX_KEY'],
                        'LAST_KEY': keyCodeObj['LAST_KEY'],
                        'EVENT_TARGET': eventTarget,
                        'EVENT_NAME': eventName,
                        'EVENT_DETAIL': eventDetail,
                        'EVENT_TYPE': eventType,
                        'EVENT_YN': eventYn
                    }, true);
                } else {
                    var insertIdx = gcm.hkey.dataList.insertRow();
                    gcm.hkey.dataList.setRowJSON(insertIdx, {
                        'PROGRAM_CD': programCd,
                        'COMPLEX_KEY': keyCodeObj['COMPLEX_KEY'],
                        'LAST_KEY': keyCodeObj['LAST_KEY'],
                        'EVENT_TARGET': eventTarget,
                        'EVENT_NAME': eventName,
                        'EVENT_DETAIL': eventDetail,
                        'EVENT_TYPE': eventType,
                        'EVENT_YN': eventYn
                    }, true);
                }
                gcm.hkey.dataList.removeColumnFilterAll();
                return true;
            }
        } catch (ex) {
            console.error(ex);
        }
        return WebSquare.util.getBoolean(successFlag);
    },
    _keyToken: function (keyCode) {
        try {
            var rtnVal = {
                'COMPLEX_KEY': '',
                'LAST_KEY': ''
            };
            var token = keyCode.split('+');
            if (token.length > 2) {
                var firstKey = token[0].toUpperCase();
                var secondKey = token[1].toUpperCase();
                var lastKey = isNaN(Number(token[2])) ? token[2] : 'NUM' + token[2];
                if (firstKey == 'ALT') {
                    rtnVal['COMPLEX_KEY'] = 'altShiftKey';
                    rtnVal['LAST_KEY'] = lastKey;
                } else if (firstKey == 'CTRL') {
                    if (secondKey == 'SHIFT') {
                        rtnVal['COMPLEX_KEY'] = 'ctrlShiftKey';
                        rtnVal['LAST_KEY'] = lastKey;
                    } else {
                        rtnVal['COMPLEX_KEY'] = 'ctrlAltKey';
                        rtnVal['LAST_KEY'] = lastKey;
                    }
                }
            } else if (token.length == 2) {
                var firstKey = token[0].toUpperCase();
                var lastKey = isNaN(Number(token[1])) ? token[1] : 'NUM' + token[1];
                if (firstKey == 'CTRL' || firstKey == 'CTRLKEY') {
                    rtnVal['COMPLEX_KEY'] = 'ctrlKey';
                    rtnVal['LAST_KEY'] = lastKey;
                } else if (firstKey == 'ALT' || firstKey == 'ALTKEY') {
                    rtnVal['COMPLEX_KEY'] = 'altKey';
                    rtnVal['LAST_KEY'] = lastKey;
                } else if (firstKey == 'SHIFT' || firstKey == 'SHIFTKEY') {
                    rtnVal['COMPLEX_KEY'] = 'shiftKey';
                    rtnVal['LAST_KEY'] = lastKey;
                } else if (firstKey == 'ALTSHIFTKEY') {
                    rtnVal['COMPLEX_KEY'] = 'altShiftKey';
                    rtnVal['LAST_KEY'] = lastKey;
                } else if (firstKey == 'CTRLSHIFTKEY') {
                    rtnVal['COMPLEX_KEY'] = 'ctrlShiftKey';
                    rtnVal['LAST_KEY'] = lastKey;
                } else if (firstKey == 'CTRLALTKEY') {
                    rtnVal['COMPLEX_KEY'] = 'ctrlAltKey';
                    rtnVal['LAST_KEY'] = lastKey;
                } else {
                    rtnVal['COMPLEX_KEY'] = 'singleKey';
                    rtnVal['LAST_KEY'] = lastKey;
                }
            } else {
                var lastKey = isNaN(Number(token[0])) ? token[0] : 'NUM' + token[0];
                rtnVal['COMPLEX_KEY'] = 'singleKey';
                rtnVal['LAST_KEY'] = lastKey;
            }
            return rtnVal;
        } catch (ex) {
            console.error(ex);
        }
    },
    delEvent: function (keyCode, options) {
        var rtnVal = true;
        try {
            if (keyCode.lastIndexOf('+') > 0) {
                keyCode = keyCode.toUpperCase();
                var _idx = keyCode.lastIndexOf('+');
                var lastKey = keyCode.slice(_idx + 1).toUpperCase();
                var complexKey = keyCode.slice(0, _idx);
                var complexKeyArr = '';
                if (!isNaN(Number(lastKey))) {
                    lastKey = 'NUM' + lastKey;
                }
                if (complexKey == 'ALT' || complexKey == 'ALTKEY') {
                    complexKeyArr = 'altKey';
                } else if (complexKey == 'CTRL' || complexKey == 'CTRLKEY') {
                    complexKeyArr = 'ctrlKey';
                } else if (complexKey == 'SHIFT' || complexKey == 'SHIFTKEY') {
                    complexKeyArr = 'shiftKey';
                } else if (complexKey == 'ALT+SHIFT' || complexKey == 'ALTSHIFTKEY') {
                    complexKeyArr = 'altShiftKey';
                } else if (complexKey == 'CTRL+SHIFT' || complexKey == 'CTRLSHIFTKEY') {
                    complexKeyArr = 'ctrlShiftKey';
                } else if (complexKey == 'CTRL+ALT' || complexKey == 'CTRLALTKEY') {
                    complexKeyArr = 'ctrlAltKey';
                } else if (complexKey == 'SINGLE' || complexKey == 'SINGLEKEY') {
                    complexKeyArr = 'singleKey';
                }
                var isKey = com.data.getMatchedJSON(gcm.hkey.dataList.getID(), [
                    {
                        columnId: 'PROGRAM_CD',
                        operator: '==',
                        value: options['PROGRAM_CD'],
                        logical: '&&'
                    },
                    {
                        columnId: 'COMPLEX_KEY',
                        operator: '==',
                        value: complexKeyArr,
                        logical: '&&'
                    },
                    {
                        columnId: 'LAST_KEY',
                        operator: '==',
                        value: lastKey,
                        logical: '&&'
                    }
                ]);
                if (isKey.length > 0) {
                    gcm.hkey.dataList.removeRow(0);
                }
                gcm.hkey.dataList.removeColumnFilterAll();
            }
        } catch (ex) {
            console.error(ex);
            rtnVal = false;
        }
        return rtnVal;
    },
    isPreventKey: function (complexKey, lastKey) {
        var exTag = [
            'INPUT',
            'TEXTAREA',
            'IFRAME'
        ];
        var controlKeyList = [
            'F1',
            'F2',
            'F3',
            'F4',
            'F5',
            'F6',
            'F7',
            'F8',
            'F9',
            'F10',
            'F11',
            'F12',
            'ctrlKey',
            'altKey',
            'ctrlAltKey',
            'ctrlShiftKey',
            'altShiftKey',
            'Escape'
        ];
        var activeTag = document.activeElement.tagName;
        if (exTag.indexOf(activeTag) === -1) {
            if (complexKey === 'singleKey' && lastKey === 'Tab' || complexKey === 'shiftKey' && lastKey === 'Tab' || complexKey === 'singleKey' && lastKey === 'Enter') {
                return false;
            } else {
                return true;
            }
        } else if (exTag.indexOf(activeTag) > -1 && (complexKey === 'ctrlKey' && lastKey === 'A' || complexKey === 'ctrlKey' && lastKey === 'C' || complexKey === 'ctrlKey' && lastKey === 'V' || complexKey === 'ctrlKey' && lastKey === 'X' || complexKey === 'ctrlKey' && lastKey === 'Y' || complexKey === 'ctrlKey' && lastKey === 'Z' || complexKey === 'ctrlShiftKey' && lastKey === 'Z')) {
            return false;
        } else if (controlKeyList.indexOf(complexKey) !== -1 || controlKeyList.indexOf(lastKey) !== -1) {
            return true;
        }
    },
    runGlobalEvent: function (complexKey, eventKey) {
        try {
            if (eventKey === 'F1') {
            } else if (eventKey === 'Escape') {
                var lastPopupIdx = $p.getPopupWindowList().length - 1;
                if (lastPopupIdx >= 0) {
                    var popupFrameId = $p.getPopupWindowList()[lastPopupIdx].$p.getFrameId();
                    var messageType = gcm.data.getParameter($p.getPopupWindowList()[lastPopupIdx].$p, 'messageType');
                    if (!com.util.isEmpty(messageType) && (messageType === 'alert' || messageType === 'confirm')) {
                        var popupId = popupFrameId.substring(0, popupFrameId.lastIndexOf('_wframe'));
                        $p.closePopup(popupId);
                    }
                }
            }
        } catch (ex) {
            console.error(ex);
        }
    }
};
gcm.hkey.init = function ($p) {
    try {
        var dataListCreationOpt = {
            id: 'dlt_shortcutList',
            type: 'dataList',
            option: {
                'baseNode': 'list',
                'repeatNode': 'map',
                'saveRemovedData': 'true'
            },
            columnInfo: [
                {
                    'id': 'SHORTCUT_SEQ',
                    'dataType': 'text',
                    'name': '단축키순번'
                },
                {
                    'id': 'PROGRAM_CD',
                    'dataType': 'text',
                    'name': '프로그램코드'
                },
                {
                    'id': 'COMPLEX_KEY',
                    'dataType': 'text',
                    'name': '복합키'
                },
                {
                    'id': 'LAST_KEY',
                    'dataType': 'text',
                    'name': '단축키'
                },
                {
                    'id': 'EVENT_TYPE',
                    'dataType': 'text',
                    'name': '이벤트타입'
                },
                {
                    'id': 'EVENT_TARGET',
                    'dataType': 'text',
                    'name': '이벤트타겟'
                },
                {
                    'id': 'EVENT_DETAIL',
                    'dataType': 'text',
                    'name': '이벤트설명'
                },
                {
                    'id': 'EVENT_YN',
                    'dataType': 'text',
                    'name': '사용여부'
                },
                {
                    'id': 'EVENT_NAME',
                    'dataType': 'text',
                    'name': '이벤트명'
                }
            ]
        };
        $p.data.create(dataListCreationOpt);
        gcm.hkey.dataList = $p.getComponentById('dlt_shortcutList');
        var shortcutTargetElement = document;
        if (shortcutTargetElement.addEventListener) {
            shortcutTargetElement.addEventListener('keydown', gcm.hkey.event.keydownEvent);
        } else if (shortcutTargetElement.attachEvent) {
            shortcutTargetElement.attachEvent('keydown', gcm.hkey.event.keydownEvent);
        }
    } catch (ex) {
        console.error(ex);
    }
};
gcm.hkey.isUseShortCut = function (shortcutFlag) {
    try {
        if (shortcutFlag == 'Y') {
            gcm.hkey.event.loadingEvent = 'Y';
            document.onkeydown = gcm.hkey.event['checkEvent'];
        } else {
            gcm.hkey.event.loadingEvent = 'N';
            document.onkeydown = null;
        }
    } catch (ex) {
        console.error(ex);
    }
};
gcm.hkey.setEventPause = function (_targetComp, _flag, _eventList) {
    try {
        var comp = $p.getComponentById(_targetComp);
        var flag = WebSquare.util.getBoolean(_flag);
        var eventList = typeof _eventList != 'undefined' ? _eventList : null;
        if (typeof comp == 'undefined')
            return -1;
        if (comp.options.pluginName == 'dataList') {
            comp.setBroadcast(flag);
            if (flag) {
                comp.broadcast({
                    'linkedDataList': ['notifyDataChanged'],
                    'gridView': ['notifyDataChanged'],
                    'generalComp': 'both'
                });
            }
            comp.setEventPause(eventList, flag);
            for (var i in comp.childCompHash) {
                var childComp = com.util.getObject(comp.childCompHash[i].id);
                if (typeof childComp != 'undefined') {
                    childComp.setEventPause(eventList, flag);
                }
            }
            for (var i in comp.refCompHash) {
                var refComp = com.util.getObject(comp.refCompHash[i].id);
                if (typeof refComp != 'undefined') {
                    refComp.setEventPause(eventList, flag);
                }
            }
        } else {
            comp.setEventPause(eventList, !flag);
        }
    } catch (ex) {
        console.error(ex);
    }
};
gcm.ext = {};