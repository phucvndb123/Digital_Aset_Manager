/*amd /cm/dam/main/main.xml 4887 8ee6454bb72d33c0edfea257e12ff4e6ef40d8074cf8a9b395101cd0317927a1 */
define({declaration:{A:{version:'1.0',encoding:'UTF-8'}},E:[{T:7,N:'xml-stylesheet',instruction:'href="/cm/css/base.css" type="text/css"'},{T:7,N:'xml-stylesheet',instruction:'href="/cm/dam/css/dam.css" type="text/css"'},{T:1,N:'html',A:{xmlns:'http://www.w3.org/1999/xhtml','xmlns:ev':'http://www.w3.org/2001/xml-events','xmlns:w2':'http://www.inswave.com/websquare','xmlns:xf':'http://www.w3.org/2002/xforms'},E:[{T:1,N:'head',E:[{T:1,N:'w2:type',E:[{T:3,text:'COMPONENT'}]},{T:1,N:'w2:buildDate'},{T:1,N:'w2:MSA'},{T:1,N:'xf:model',E:[{T:1,N:'w2:dataCollection',A:{baseNode:'map'}},{T:1,N:'w2:workflowCollection'}]},{T:1,N:'w2:layoutInfo'},{T:1,N:'w2:publicInfo',A:{method:''}},{T:1,N:'script',A:{lazy:'false',type:'text/javascript'},E:[{T:4,cdata:function(scopeObj){with(scopeObj){scwin.onpageload = function () {
    scwin._setActive(0);
};
scwin._setActive = function (idx) {
    var ids = [
        'btn_navDashboard',
        'btn_navFileBrowser',
        'btn_navAssetDetails',
        'btn_navVersionControl'
    ];
    var titles = [
        'Dashboard',
        'File Browser',
        'Asset Details',
        'Version Control'
    ];
    for (var i = 0; i < ids.length; i++) {
        var comp = $p.getComponentById(ids[i]);
        if (comp)
            comp.removeClass('dam-active');
    }
    var activeComp = $p.getComponentById(ids[idx]);
    if (activeComp)
        activeComp.addClass('dam-active');
    txt_pageTitle.setLabel(titles[idx]);
    tab_main.setSelectedTab(idx);
};
scwin.btn_navDashboard_onclick = function () {
    scwin._setActive(0);
};
scwin.btn_navFileBrowser_onclick = function () {
    scwin._setActive(1);
};
scwin.btn_navAssetDetails_onclick = function () {
    scwin._setActive(2);
};
scwin.btn_navVersionControl_onclick = function () {
    scwin._setActive(3);
};
scwin.btn_logout_onclick = function () {
    if (confirm('Logout?'))
        location.href = '/';
};
}}}]}]},{T:1,N:'body',A:{'ev:onpageload':'scwin.onpageload'},E:[{T:1,N:'xf:group',A:{id:'grp_appShell',class:'dam-shell'},E:[{T:1,N:'xf:group',A:{id:'grp_header',class:'dam-header'},E:[{T:1,N:'xf:group',A:{class:'dam-header-left'},E:[{T:1,N:'xf:image',A:{id:'img_logo',class:'dam-logo',src:'/cm/dam/images/logo.svg'}},{T:1,N:'w2:textbox',A:{id:'txt_appTitle',class:'dam-app-title',label:'Digital Asset Manager'}},{T:1,N:'xf:image',A:{id:'img_hamburger',class:'dam-hamburger',src:'/cm/dam/images/hamburger.svg'}}]},{T:1,N:'xf:group',A:{class:'dam-header-right'},E:[{T:1,N:'xf:image',A:{id:'img_bell',class:'dam-bell',src:'/cm/dam/images/bell.svg'}},{T:1,N:'xf:image',A:{id:'img_avatar',class:'dam-avatar',src:'/cm/dam/images/avatar.svg'}},{T:1,N:'xf:trigger',A:{id:'btn_logout',class:'dam-btn-logout','ev:onclick':'scwin.btn_logout_onclick'},E:[{T:1,N:'xf:label',E:[{T:4,cdata:'Logout'}]}]}]}]},{T:1,N:'xf:group',A:{id:'grp_body',class:'dam-body'},E:[{T:1,N:'xf:group',A:{id:'grp_sidebar',class:'dam-sidebar'},E:[{T:1,N:'xf:group',A:{id:'btn_navDashboard',class:'dam-nav-item dam-active','ev:onclick':'scwin.btn_navDashboard_onclick'},E:[{T:1,N:'xf:image',A:{class:'dam-nav-icon',src:'/cm/dam/images/ic_dashboard.svg'}},{T:1,N:'w2:textbox',A:{class:'dam-nav-text',label:'Dashboard'}}]},{T:1,N:'xf:group',A:{id:'btn_navFileBrowser',class:'dam-nav-item','ev:onclick':'scwin.btn_navFileBrowser_onclick'},E:[{T:1,N:'xf:image',A:{class:'dam-nav-icon',src:'/cm/dam/images/ic_folder.svg'}},{T:1,N:'w2:textbox',A:{class:'dam-nav-text',label:'File Browser'}}]},{T:1,N:'xf:group',A:{id:'btn_navAssetDetails',class:'dam-nav-item','ev:onclick':'scwin.btn_navAssetDetails_onclick'},E:[{T:1,N:'xf:image',A:{class:'dam-nav-icon',src:'/cm/dam/images/ic_document.svg'}},{T:1,N:'w2:textbox',A:{class:'dam-nav-text',label:'Asset Details'}}]},{T:1,N:'xf:group',A:{id:'btn_navVersionControl',class:'dam-nav-item','ev:onclick':'scwin.btn_navVersionControl_onclick'},E:[{T:1,N:'xf:image',A:{class:'dam-nav-icon',src:'/cm/dam/images/ic_clock.svg'}},{T:1,N:'w2:textbox',A:{class:'dam-nav-text',label:'Version Control'}}]}]},{T:1,N:'xf:group',A:{id:'grp_content',class:'dam-content'},E:[{T:1,N:'w2:textbox',A:{id:'txt_pageTitle',class:'dam-page-title',label:'Dashboard'}},{T:1,N:'w2:tabControl',A:{id:'tab_main',class:'dam-tab-shell',alwaysDraw:'false'},E:[{T:1,N:'w2:tabs',A:{id:'tab_dashboard',label:'Dashboard'}},{T:1,N:'w2:tabs',A:{id:'tab_fileBrowser',label:'File Browser'}},{T:1,N:'w2:tabs',A:{id:'tab_assetDetails',label:'Asset Details'}},{T:1,N:'w2:tabs',A:{id:'tab_versionControl',label:'Version Control'}},{T:1,N:'w2:content',A:{id:'cnt_dashboard',src:'/cm/dam/main/dashboard.xml',scope:'true'}},{T:1,N:'w2:content',A:{id:'cnt_fileBrowser',src:'/cm/dam/main/fileBrowser.xml',scope:'true'}},{T:1,N:'w2:content',A:{id:'cnt_assetDetails',src:'/cm/dam/main/assetDetails.xml',scope:'true'}},{T:1,N:'w2:content',A:{id:'cnt_versionControl',src:'/cm/dam/main/versionControl.xml',scope:'true'}}]}]}]}]}]}]}]})