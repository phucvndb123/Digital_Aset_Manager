/*amd /cm/template/page/11_alert/alert.xml 2285 a9758a5db48aab898eeae945465504ba657a5eebe0e02fae3fec81be7d9a053c */
define({declaration:{A:{version:'1.0',encoding:'UTF-8',standalone:'no'}},E:[{T:1,N:'html',A:{xmlns:'http://www.w3.org/1999/xhtml','xmlns:ev':'http://www.w3.org/2001/xml-events','xmlns:w2':'http://www.inswave.com/websquare','xmlns:xf':'http://www.w3.org/2002/xforms'},E:[{T:1,N:'head',E:[{T:1,N:'w2:type',E:[{T:3,text:'COMPONENT'}]},{T:1,N:'w2:buildDate'},{T:1,N:'w2:MSA'},{T:1,N:'xf:model',E:[{T:1,N:'w2:dataCollection',A:{baseNode:'map'}},{T:1,N:'w2:workflowCollection'}]},{T:1,N:'w2:layoutInfo'},{T:1,N:'w2:publicInfo',A:{method:''}},{T:1,N:'script',A:{lazy:'false',type:'text/javascript'},E:[{T:4,cdata:function(scopeObj){with(scopeObj){scwin.onpageload = function () {
    scwin.openAlert();
};
scwin.btnOpenLayer_onclick = function () {
    scwin.openAlert();
};
scwin.btnCloseLayer_onclick = function (e) {
    scwin.closeAlert();
};
scwin.openAlert = function () {
    $('.ly_popup').css('display', 'block');
    $('body').append('<div class="dim"></div>');
};
scwin.closeAlert = function () {
    $('.ly_popup').css('display', 'none');
    $('.dim').remove();
};
}}}]}]},{T:1,N:'body',A:{'ev:onpageload':'scwin.onpageload'},E:[{T:1,N:'xf:group',A:{id:'',style:'min-height: 310px;',class:'sub_contents'},E:[{T:1,N:'xf:group',A:{class:'titbox',id:'',style:''},E:[{T:1,N:'w2:textbox',A:{class:'',id:'',label:'서브타이틀',style:'',tagname:'h3'}},{T:1,N:'xf:group',A:{class:'rt',id:'',style:''},E:[{T:1,N:'xf:trigger',A:{class:'btn_cm ',id:'btnOpenLayer',style:'',type:'button','ev:onclick':'scwin.btnOpenLayer_onclick'},E:[{T:1,N:'xf:label',E:[{T:4,cdata:'Alert '}]}]}]}]}]},{T:1,N:'xf:group',A:{id:'',style:'display:none;',class:'ly_popup'},E:[{T:1,N:'xf:group',A:{id:'',style:'',class:'ly_head'}},{T:1,N:'xf:group',A:{id:'',style:'',class:'ly_cont'},E:[{T:1,N:'w2:textbox',A:{id:'',style:'',class:'txt1',label:'처리중 오류가 발생했습니다. ',tagname:'p'}},{T:1,N:'w2:textbox',A:{id:'',style:'',class:'txt2',label:'처리중 오류가 발생했습니다.<br/>장애문의 : admin@admin.com',tagname:'p',escape:'false'}},{T:1,N:'xf:group',A:{class:'btnbox',id:'',style:''},E:[{T:1,N:'xf:trigger',A:{class:'btn_cm pt btn_pop',id:'btnCloseLayer',style:'',type:'button','ev:onclick':'scwin.btnCloseLayer_onclick'},E:[{T:1,N:'xf:label',E:[{T:4,cdata:'닫기'}]}]}]}]}]}]}]}]})