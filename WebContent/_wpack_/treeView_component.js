/*amd /treeView_component.xml 10101 9e2be5aa2c8a38436278739bd8d4de3b955943cf41c49814971abb8ff7a8eb57 */
define({declaration:{A:{version:'1.0',encoding:'UTF-8',standalone:'no'}},E:[{T:1,N:'html',A:{xmlns:'http://www.w3.org/1999/xhtml','xmlns:ev':'http://www.w3.org/2001/xml-events','xmlns:w2':'http://www.inswave.com/websquare','xmlns:xf':'http://www.w3.org/2002/xforms'},E:[{T:1,N:'head',E:[{T:1,N:'w2:type',E:[{T:3,text:'COMPONENT'}]},{T:1,N:'xf:model',E:[{T:1,N:'w2:dataCollection',A:{baseNode:'map'},E:[{T:1,N:'w2:dataMap',A:{id:'dmFolder',baseNode:'map'},E:[{T:1,N:'w2:keyInfo',E:[{T:1,N:'w2:key',A:{id:'FOLDER_ID',name:'FOLDER_ID',dataType:'text'}},{T:1,N:'w2:key',A:{id:'FOLDER_NM',name:'FOLDER_NM',dataType:'text'}},{T:1,N:'w2:key',A:{id:'PARENT_FOLDER_ID',name:'PARENT_FOLDER_ID',dataType:'text'}},{T:1,N:'w2:key',A:{id:'PATH_DEPTH',name:'PATH_DEPTH',dataType:'text'}}]}]},{T:1,N:'w2:dataList',A:{id:'dlAsset',baseNode:'list',repeatNode:'map'},E:[{T:1,N:'w2:columnInfo',E:[{T:1,N:'w2:column',A:{id:'CHK',name:'CHK',dataType:'text'}},{T:1,N:'w2:column',A:{id:'ICON',name:'ICON',dataType:'text'}},{T:1,N:'w2:column',A:{id:'FILE_NM',name:'FILE_NM',dataType:'text'}},{T:1,N:'w2:column',A:{id:'FILE_TYPE',name:'FILE_TYPE',dataType:'text'}},{T:1,N:'w2:column',A:{id:'FILE_SIZE',name:'FILE_SIZE',dataType:'text'}},{T:1,N:'w2:column',A:{id:'STATUS',name:'STATUS',dataType:'text'}},{T:1,N:'w2:column',A:{id:'OWNER_NM',name:'OWNER_NM',dataType:'text'}},{T:1,N:'w2:column',A:{id:'UPLOAD_DT',name:'UPLOAD_DT',dataType:'text'}}]}]},{T:1,N:'w2:dataMap',A:{id:'dmAssetDetail',baseNode:'map'},E:[{T:1,N:'w2:keyInfo',E:[{T:1,N:'w2:key',A:{id:'FILE_NM',name:'FILE_NM',dataType:'text'}},{T:1,N:'w2:key',A:{id:'DESCRIPTION',name:'DESCRIPTION',dataType:'text'}},{T:1,N:'w2:key',A:{id:'FILE_TYPE',name:'FILE_TYPE',dataType:'text'}},{T:1,N:'w2:key',A:{id:'ASSET_DATA',name:'ASSET_DATA',dataType:'text'}},{T:1,N:'w2:key',A:{id:'FILE_SIZE',name:'FILE_SIZE',dataType:'text'}},{T:1,N:'w2:key',A:{id:'OWNER_NM',name:'OWNER_NM',dataType:'text'}},{T:1,N:'w2:key',A:{id:'UPLOAD_DT',name:'UPLOAD_DT',dataType:'text'}}]}]}]}]},{T:1,N:'script',A:{lazy:'false',type:'text/javascript'},E:[{T:4,cdata:function(scopeObj){with(scopeObj){scwin.onpageload = function () {
    scwin.loadFolders();
};
scwin.callApi = function (url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                callback(JSON.parse(xhr.responseText || '{}'));
            }
        }
    };
    xhr.send();
};
scwin.loadFolders = function () {
    scwin.callApi('/api/dam/folders', function (folders) {
        if (folders && folders.length > 0) {
            var defaultFolderId = folders[0].folderId || folders[0].FOLDER_ID;
            dmFolder.set('FOLDER_ID', defaultFolderId);
            dmFolder.set('FOLDER_NM', folders[0].folderNm || folders[0].FOLDER_NM || '');
            scwin.loadAssets(defaultFolderId);
        }
    });
};
scwin.loadAssets = function (folderId) {
    scwin.callApi('/api/dam/assets?folderId=' + folderId, function (list) {
        var rows = [];
        for (var i = 0; i < (list || []).length; i++) {
            var item = list[i];
            rows.push({
                'CHK': '',
                'ICON': item.fileType || '',
                'ASSET_ID': item.assetId,
                'FILE_NM': item.fileNm || '',
                'FILE_TYPE': item.fileType || '',
                'FILE_SIZE': item.fileSize || '',
                'STATUS': 'Published',
                'OWNER_NM': item.ownerNm || '',
                'UPLOAD_DT': item.uploadDt || ''
            });
        }
        dlAsset.setJSON(rows);
        if (rows.length > 0) {
            scwin.loadAssetDetail(rows[0].ASSET_ID, rows[0]);
        }
    });
};
scwin.grdAsset_onrowindexchange = function (gridObj, oldRowIndex, newRowIndex) {
    var rowData = dlAsset.getRowJSON(newRowIndex);
    if (rowData && rowData.ASSET_ID) {
        scwin.loadAssetDetail(rowData.ASSET_ID, rowData);
    }
};
scwin.loadAssetDetail = function (assetId, fallbackRow) {
    scwin.callApi('/api/dam/assets/' + assetId, function (response) {
        var base = fallbackRow || {};
        var asset = response.asset || base;
        dmAssetDetail.set('FILE_NM', asset.fileNm || base.FILE_NM || '');
        dmAssetDetail.set('DESCRIPTION', asset.fileNm || base.FILE_NM || '');
        dmAssetDetail.set('FILE_TYPE', asset.fileType || base.FILE_TYPE || '');
        dmAssetDetail.set('ASSET_DATA', response.versions && response.versions.length > 0 ? response.versions[0].verNo : '-');
        dmAssetDetail.set('FILE_SIZE', asset.fileSize || base.FILE_SIZE || '');
        dmAssetDetail.set('OWNER_NM', asset.ownerNm || base.OWNER_NM || '');
        dmAssetDetail.set('UPLOAD_DT', asset.uploadDt || base.UPLOAD_DT || '');
    });
};
}}}]}]},{T:1,N:'body',A:{'ev:onpageload':'scwin.onpageload'},E:[{T:1,N:'xf:group',A:{class:'sub_contents',style:'height:100%;'},E:[{T:1,N:'xf:group',A:{class:'pgtbox'},E:[{T:1,N:'w2:textbox',A:{class:'pgt_tit',label:'File Browser',tagname:'h2'}}]},{T:1,N:'xf:group',A:{class:'lybox',style:'height:92%;'},E:[{T:1,N:'xf:group',A:{class:'ly_column col_7',style:'height:100%;'},E:[{T:1,N:'xf:group',A:{class:'sbx',style:'padding:12px;height:48%;border:1px solid #d9dde3;border-radius:8px;box-sizing:border-box;'},E:[{T:1,N:'xf:group',A:{class:'titbox'},E:[{T:1,N:'w2:textbox',A:{label:'Folder Structure',tagname:'h3'}}]},{T:1,N:'xf:group',A:{class:'tvwbox',style:'height:calc(100% - 32px);'},E:[{T:1,N:'w2:treeview',A:{id:'trvFolder',class:'tvw',style:'height:100%;',dataType:'listed',tooltipGroupClass:'false'},E:[{T:1,N:'w2:node',E:[{T:1,N:'w2:label',E:[{T:4,cdata:'Digital Assets'}]},{T:1,N:'w2:value',E:[{T:4,cdata:'1'}]},{T:1,N:'w2:folder',E:[{T:4,cdata:'true'}]},{T:1,N:'w2:iconImage',E:[{T:4,cdata:'/cm/images/base/ico_ds_tree.png'}]},{T:1,N:'w2:node',E:[{T:1,N:'w2:label',E:[{T:4,cdata:'Marketing Documents'}]},{T:1,N:'w2:value',E:[{T:4,cdata:'2'}]},{T:1,N:'w2:folder',E:[{T:4,cdata:'true'}]},{T:1,N:'w2:iconImage',E:[{T:4,cdata:'/cm/images/base/ico_ds_tree.png'}]},{T:1,N:'w2:node',E:[{T:1,N:'w2:label',E:[{T:4,cdata:'Campaign Banners'}]},{T:1,N:'w2:value',E:[{T:4,cdata:'3'}]},{T:1,N:'w2:folder',E:[{T:4,cdata:'true'}]},{T:1,N:'w2:iconImage',E:[{T:4,cdata:'/cm/images/base/ico_ds_tree.png'}]}]},{T:1,N:'w2:node',E:[{T:1,N:'w2:label',E:[{T:4,cdata:'PDF Brochures'}]},{T:1,N:'w2:value',E:[{T:4,cdata:'4'}]},{T:1,N:'w2:folder',E:[{T:4,cdata:'true'}]},{T:1,N:'w2:iconImage',E:[{T:4,cdata:'/cm/images/base/ico_docu.png'}]}]},{T:1,N:'w2:node',E:[{T:1,N:'w2:label',E:[{T:4,cdata:'Social Media Assets'}]},{T:1,N:'w2:value',E:[{T:4,cdata:'5'}]},{T:1,N:'w2:folder',E:[{T:4,cdata:'true'}]},{T:1,N:'w2:iconImage',E:[{T:4,cdata:'/cm/images/base/ico_ds_tree.png'}]}]}]},{T:1,N:'w2:node',E:[{T:1,N:'w2:label',E:[{T:4,cdata:'Video Assets'}]},{T:1,N:'w2:value',E:[{T:4,cdata:'6'}]},{T:1,N:'w2:folder',E:[{T:4,cdata:'true'}]},{T:1,N:'w2:iconImage',E:[{T:4,cdata:'/cm/images/base/ico_ds_tree.png'}]}]},{T:1,N:'w2:node',E:[{T:1,N:'w2:label',E:[{T:4,cdata:'Internal Manuals'}]},{T:1,N:'w2:value',E:[{T:4,cdata:'7'}]},{T:1,N:'w2:folder',E:[{T:4,cdata:'true'}]},{T:1,N:'w2:iconImage',E:[{T:4,cdata:'/cm/images/base/ico_ds_tree.png'}]}]}]}]}]}]},{T:1,N:'xf:group',A:{class:'sbx',style:'padding:12px;height:48%;margin-top:8px;border:1px solid #d9dde3;border-radius:8px;box-sizing:border-box;'},E:[{T:1,N:'xf:group',A:{class:'titbox'},E:[{T:1,N:'w2:textbox',A:{label:'File List',tagname:'h3'}}]},{T:1,N:'xf:group',A:{class:'gvwbox',style:'height:calc(100% - 32px);'},E:[{T:1,N:'w2:gridView',A:{id:'grdAsset',class:'gvw',dataList:'data:dlAsset',autoFit:'allColumn',focusMode:'row','ev:onrowindexchange':'scwin.grdAsset_onrowindexchange'},E:[{T:1,N:'w2:header',E:[{T:1,N:'w2:row',E:[{T:1,N:'w2:column',A:{id:'hdChk',inputType:'checkbox',width:'38',value:''}},{T:1,N:'w2:column',A:{id:'hdIcon',inputType:'text',width:'60',value:'Icon'}},{T:1,N:'w2:column',A:{id:'hdFileNm',inputType:'text',width:'240',value:'Name'}},{T:1,N:'w2:column',A:{id:'hdType',inputType:'text',width:'140',value:'Type'}},{T:1,N:'w2:column',A:{id:'hdSize',inputType:'text',width:'120',value:'Size'}},{T:1,N:'w2:column',A:{id:'hdStatus',inputType:'text',width:'120',value:'Status'}}]}]},{T:1,N:'w2:gBody',E:[{T:1,N:'w2:row',E:[{T:1,N:'w2:column',A:{id:'CHK',inputType:'checkbox',width:'38',displayMode:'always'}},{T:1,N:'w2:column',A:{id:'ICON',inputType:'text',width:'60',displayMode:'label'}},{T:1,N:'w2:column',A:{id:'FILE_NM',inputType:'text',width:'240',displayMode:'label'}},{T:1,N:'w2:column',A:{id:'FILE_TYPE',inputType:'text',width:'140',displayMode:'label'}},{T:1,N:'w2:column',A:{id:'FILE_SIZE',inputType:'text',width:'120',displayMode:'label'}},{T:1,N:'w2:column',A:{id:'STATUS',inputType:'text',width:'120',displayMode:'label'}}]}]}]}]}]}]},{T:1,N:'xf:group',A:{class:'ly_column col_3',style:'height:100%;'},E:[{T:1,N:'xf:group',A:{class:'sbx',style:'padding:12px;height:97%;border:1px solid #d9dde3;border-radius:8px;box-sizing:border-box;'},E:[{T:1,N:'xf:group',A:{class:'titbox'},E:[{T:1,N:'w2:textbox',A:{label:'Asset Details',tagname:'h3'}}]},{T:1,N:'xf:group',A:{style:'margin-top:8px;'},E:[{T:1,N:'w2:textbox',A:{label:'Name'}},{T:1,N:'xf:input',A:{ref:'data:dmAssetDetail/FILE_NM',style:'width:100%;'}}]},{T:1,N:'xf:group',A:{style:'margin-top:8px;'},E:[{T:1,N:'w2:textbox',A:{label:'Description'}},{T:1,N:'xf:textarea',A:{ref:'data:dmAssetDetail/DESCRIPTION',style:'width:100%;height:120px;'}}]},{T:1,N:'xf:group',A:{style:'margin-top:8px;'},E:[{T:1,N:'w2:textbox',A:{label:'Asset Type'}},{T:1,N:'xf:input',A:{ref:'data:dmAssetDetail/FILE_TYPE',style:'width:100%;'}}]},{T:1,N:'xf:group',A:{style:'margin-top:8px;'},E:[{T:1,N:'w2:textbox',A:{label:'Asset Data'}},{T:1,N:'xf:select1',A:{ref:'data:dmAssetDetail/ASSET_DATA',style:'width:100%;'},E:[{T:1,N:'xf:choices',E:[{T:1,N:'xf:item',E:[{T:1,N:'xf:label',E:[{T:3,text:'Draft'}]},{T:1,N:'xf:value',E:[{T:3,text:'Draft'}]}]},{T:1,N:'xf:item',E:[{T:1,N:'xf:label',E:[{T:3,text:'Published'}]},{T:1,N:'xf:value',E:[{T:3,text:'Published'}]}]}]}]}]}]}]}]}]}]}]}]})