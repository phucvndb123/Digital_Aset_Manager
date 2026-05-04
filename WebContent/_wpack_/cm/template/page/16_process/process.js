/*amd /cm/template/page/16_process/process.xml 16140 992f17147f211db19e03525f98b9fc3e1abea9297c70ba76084f0641d61494e7 */
define({declaration:{A:{version:'1.0',encoding:'UTF-8'}},E:[{T:1,N:'html',A:{xmlns:'http://www.w3.org/1999/xhtml','xmlns:ev':'http://www.w3.org/2001/xml-events','xmlns:w2':'http://www.inswave.com/websquare','xmlns:xf':'http://www.w3.org/2002/xforms'},E:[{T:1,N:'head',E:[{T:1,N:'w2:type',E:[{T:3,text:'COMPONENT'}]},{T:1,N:'w2:buildDate'},{T:1,N:'w2:MSA'},{T:1,N:'xf:model',E:[{T:1,N:'w2:dataCollection',A:{baseNode:'map'}},{T:1,N:'w2:workflowCollection'}]},{T:1,N:'w2:layoutInfo'},{T:1,N:'w2:publicInfo',A:{method:''}},{T:1,N:'script',A:{lazy:'false',type:'text/javascript'},E:[{T:4,cdata:function(scopeObj){with(scopeObj){scwin.onpageload = function () {
    $('.btn_fav').click(function () {
        $('.btn_fav').toggleClass('on');
    });
};
scwin.setScreen = function (idx) {
    if (idx == 1) {
        screen1.show();
        screen2.hide();
        screen3.hide();
        screen4.hide();
        screen5.hide();
        step1.addClass('on');
        step2.removeClass('on');
        step3.removeClass('on');
        step4.removeClass('on');
        step5.removeClass('on');
    } else if (idx == 2) {
        screen1.hide();
        screen2.show();
        screen3.hide();
        screen4.hide();
        screen5.hide();
        step1.removeClass('on');
        step2.addClass('on');
        step3.removeClass('on');
        step4.removeClass('on');
        step5.removeClass('on');
    } else if (idx == 3) {
        screen1.hide();
        screen2.hide();
        screen3.show();
        screen4.hide();
        screen5.hide();
        step1.removeClass('on');
        step2.removeClass('on');
        step3.addClass('on');
        step4.removeClass('on');
        step5.removeClass('on');
    } else if (idx == 4) {
        screen1.hide();
        screen2.hide();
        screen3.hide();
        screen4.show();
        screen5.hide();
        step1.removeClass('on');
        step2.removeClass('on');
        step3.removeClass('on');
        step4.addClass('on');
        step5.removeClass('on');
    } else if (idx == 5) {
        screen1.hide();
        screen2.hide();
        screen3.hide();
        screen4.hide();
        screen5.show();
        step1.removeClass('on');
        step2.removeClass('on');
        step3.removeClass('on');
        step4.removeClass('on');
        step5.addClass('on');
    }
};
scwin.step1_onclick = function (e) {
    scwin.setScreen(1);
};
scwin.step2_onclick = function (e) {
    scwin.setScreen(2);
};
scwin.step3_onclick = function (e) {
    scwin.setScreen(3);
};
scwin.step4_onclick = function (e) {
    scwin.setScreen(4);
};
scwin.step5_onclick = function (e) {
    scwin.setScreen(5);
};
scwin.next1_onclick = function (e) {
    scwin.setScreen(2);
};
scwin.next2_onclick = function (e) {
    scwin.setScreen(3);
};
scwin.next3_onclick = function (e) {
    scwin.setScreen(4);
};
scwin.next4_onclick = function (e) {
    scwin.setScreen(5);
};
scwin.prev2_onclick = function (e) {
    scwin.setScreen(1);
};
scwin.prev3_onclick = function (e) {
    scwin.setScreen(2);
};
scwin.prev4_onclick = function (e) {
    scwin.setScreen(3);
};
scwin.prev5_onclick = function (e) {
    scwin.setScreen(4);
};
}}}]}]},{T:1,N:'body',A:{'ev:onpageload':'scwin.onpageload'},E:[{T:1,N:'xf:group',A:{class:'sub_contents',id:'',style:''},E:[{T:1,N:'xf:group',A:{class:'pgtbox',id:'',style:''},E:[{T:1,N:'xf:trigger',A:{class:'btn_fav',id:'',style:'',type:'button'},E:[{T:1,N:'xf:label'}]},{T:1,N:'w2:textbox',A:{class:'pgt_tit',id:'',label:'화면타이틀',style:'',tagname:''}},{T:1,N:'xf:group',A:{class:'breadcrumb',id:'',style:''},E:[{T:1,N:'xf:group',A:{id:'',style:'',tagname:'ul'},E:[{T:1,N:'xf:group',A:{class:'home',id:'',style:'',tagname:'li'},E:[{T:1,N:'w2:anchor',A:{id:'',outerDiv:'false',style:''},E:[{T:1,N:'xf:label',E:[{T:4,cdata:'Home'}]}]}]},{T:1,N:'xf:group',A:{id:'',style:'',tagname:'li'},E:[{T:1,N:'w2:anchor',A:{id:'',outerDiv:'false',style:''},E:[{T:1,N:'xf:label',E:[{T:4,cdata:'1Depth Menu'}]}]}]},{T:1,N:'xf:group',A:{id:'',style:'',tagname:'li'},E:[{T:1,N:'w2:anchor',A:{id:'',outerDiv:'false',style:''},E:[{T:1,N:'xf:label',E:[{T:4,cdata:'2Depth Menu'}]}]}]},{T:1,N:'xf:group',A:{id:'',style:'',tagname:'li'},E:[{T:1,N:'w2:span',A:{id:'',label:'3Depth Menu',style:''}}]}]}]}]},{T:1,N:'xf:group',A:{class:'processbar',id:'',style:'',tagname:'ul'},E:[{T:1,N:'xf:group',A:{class:'on','ev:onclick':'scwin.step1_onclick',id:'step1',tagname:'li'},E:[{T:1,N:'w2:span',A:{class:'num',id:'',label:'1',style:''}},{T:1,N:'xf:group',A:{class:'dot_wrap',id:'',style:''},E:[{T:1,N:'w2:span',A:{class:'dot on',id:'',label:'',style:''}},{T:1,N:'w2:span',A:{class:'dot',id:'',label:'',style:''}},{T:1,N:'w2:span',A:{class:'dot',id:'',label:'',style:''}},{T:1,N:'w2:span',A:{class:'dot',id:'',label:'',style:''}},{T:1,N:'w2:span',A:{class:'dot',id:'',label:'',style:''}}]},{T:1,N:'w2:textbox',A:{id:'',label:'Step1',style:''}}]},{T:1,N:'xf:group',A:{'ev:onclick':'scwin.step2_onclick',id:'step2',style:'',tagname:'li'},E:[{T:1,N:'w2:span',A:{class:'num',id:'',label:'2',style:''}},{T:1,N:'xf:group',A:{class:'dot_wrap',id:'',style:''},E:[{T:1,N:'w2:span',A:{class:'dot on',id:'',label:'',style:''}},{T:1,N:'w2:span',A:{class:'dot on',id:'',label:'',style:''}},{T:1,N:'w2:span',A:{class:'dot',id:'',label:'',style:''}},{T:1,N:'w2:span',A:{class:'dot',id:'',label:'',style:''}},{T:1,N:'w2:span',A:{class:'dot',id:'',label:'',style:''}}]},{T:1,N:'w2:textbox',A:{id:'',label:'Step2',style:''}}]},{T:1,N:'xf:group',A:{'ev:onclick':'scwin.step3_onclick',id:'step3',style:'',tagname:'li'},E:[{T:1,N:'w2:span',A:{class:'num',id:'',label:'3',style:''}},{T:1,N:'xf:group',A:{class:'dot_wrap',id:'',style:''},E:[{T:1,N:'w2:span',A:{class:'dot on',id:'',label:'',style:''}},{T:1,N:'w2:span',A:{class:'dot on',id:'',label:'',style:''}},{T:1,N:'w2:span',A:{class:'dot on',id:'',label:'',style:''}},{T:1,N:'w2:span',A:{class:'dot',id:'',label:'',style:''}},{T:1,N:'w2:span',A:{class:'dot',id:'',label:'',style:''}}]},{T:1,N:'w2:textbox',A:{id:'',label:'Step3',style:''}}]},{T:1,N:'xf:group',A:{'ev:onclick':'scwin.step4_onclick',id:'step4',style:'',tagname:'li'},E:[{T:1,N:'w2:span',A:{class:'num',id:'',label:'4',style:''}},{T:1,N:'xf:group',A:{class:'dot_wrap',id:'',style:''},E:[{T:1,N:'w2:span',A:{class:'dot on',id:'',label:'',style:''}},{T:1,N:'w2:span',A:{class:'dot on',id:'',label:'',style:''}},{T:1,N:'w2:span',A:{class:'dot on',id:'',label:'',style:''}},{T:1,N:'w2:span',A:{class:'dot on',id:'',label:'',style:''}},{T:1,N:'w2:span',A:{class:'dot',id:'',label:'',style:''}}]},{T:1,N:'w2:textbox',A:{id:'',label:'Step4',style:''}}]},{T:1,N:'xf:group',A:{'ev:onclick':'scwin.step5_onclick',id:'step5',style:'',tagname:'li'},E:[{T:1,N:'w2:span',A:{class:'num',id:'',label:'5',style:''}},{T:1,N:'xf:group',A:{class:'dot_wrap',id:'',style:''},E:[{T:1,N:'w2:span',A:{class:'dot on',id:'',label:'',style:''}},{T:1,N:'w2:span',A:{class:'dot on',id:'',label:'',style:''}},{T:1,N:'w2:span',A:{class:'dot on ',id:'',label:'',style:''}},{T:1,N:'w2:span',A:{class:'dot on ',id:'',label:'',style:''}},{T:1,N:'w2:span',A:{class:'dot on ',id:'',label:'',style:''}}]},{T:1,N:'w2:textbox',A:{id:'',label:'Step5',style:''}}]}]},{T:1,N:'xf:group',A:{id:'screen1'},E:[{T:1,N:'xf:group',A:{class:'titbox',id:'',style:''},E:[{T:1,N:'w2:textbox',A:{class:'',id:'',label:'Step1 : Title',style:'',tagname:'h4'}}]},{T:1,N:'xf:group',A:{class:'tblbox',id:'',style:''},E:[{T:1,N:'xf:group',A:{adaptive:'layout',adaptiveThreshold:'600',class:'w2tb tbl',id:'',style:'',tagname:'table'},E:[{T:1,N:'w2:attributes',E:[{T:1,N:'w2:summary'}]},{T:1,N:'xf:group',A:{tagname:'colgroup'},E:[{T:1,N:'xf:group',A:{style:'width:150px;',tagname:'col'}},{T:1,N:'xf:group',A:{style:'',tagname:'col'}}]},{T:1,N:'xf:group',A:{style:'',tagname:'tr'},E:[{T:1,N:'xf:group',A:{class:'w2tb_th',style:'',tagname:'th'},E:[{T:1,N:'w2:textbox',A:{class:'req',id:'',label:'테이블헤더',ref:'',style:'',userData2:''}}]},{T:1,N:'xf:group',A:{class:'w2tb_td',style:'',tagname:'td'}}]}]}]},{T:1,N:'xf:group',A:{class:'btnbox',id:'',style:''},E:[{T:1,N:'xf:group',A:{class:'rt',id:''},E:[{T:1,N:'xf:trigger',A:{class:'btn_cm ','ev:onclick':'scwin.prev1_onclick',id:'',style:'',type:'button'},E:[{T:1,N:'xf:label',E:[{T:4,cdata:'취소'}]}]},{T:1,N:'xf:trigger',A:{class:'btn_cm pt','ev:onclick':'scwin.next1_onclick',id:'next1',style:'',type:'button'},E:[{T:1,N:'xf:label',E:[{T:4,cdata:'다음'}]}]}]}]}]},{T:1,N:'xf:group',A:{id:'screen2',style:'display: none;'},E:[{T:1,N:'xf:group',A:{class:'titbox',id:'',style:''},E:[{T:1,N:'w2:textbox',A:{class:'',id:'',label:'Step2 : Title',style:'',tagname:'h4'}}]},{T:1,N:'xf:group',A:{class:'tblbox',id:'',style:''},E:[{T:1,N:'xf:group',A:{adaptive:'layout',adaptiveThreshold:'600',class:'w2tb tbl',id:'',style:'',tagname:'table'},E:[{T:1,N:'w2:attributes',E:[{T:1,N:'w2:summary'}]},{T:1,N:'xf:group',A:{tagname:'colgroup'},E:[{T:1,N:'xf:group',A:{style:'width:150px;',tagname:'col'}},{T:1,N:'xf:group',A:{style:'',tagname:'col'}}]},{T:1,N:'xf:group',A:{style:'',tagname:'tr'},E:[{T:1,N:'xf:group',A:{class:'w2tb_th',style:'',tagname:'th'},E:[{T:1,N:'w2:textbox',A:{class:'req',id:'',label:'테이블헤더',ref:'',style:'',userData2:''}}]},{T:1,N:'xf:group',A:{class:'w2tb_td',style:'',tagname:'td'}}]},{T:1,N:'xf:group',A:{style:'',tagname:'tr'},E:[{T:1,N:'xf:group',A:{class:'w2tb_th',style:'',tagname:'th'},E:[{T:1,N:'w2:textbox',A:{class:'req',id:'',label:'테이블헤더',ref:'',style:'',userData2:''}}]},{T:1,N:'xf:group',A:{class:'w2tb_td',style:'',tagname:'td'}}]}]}]},{T:1,N:'xf:group',A:{class:'btnbox',id:'',style:''},E:[{T:1,N:'xf:group',A:{class:'rt',id:''},E:[{T:1,N:'xf:trigger',A:{class:'btn_cm ','ev:onclick':'scwin.prev2_onclick',id:'prev2',style:'',type:'button'},E:[{T:1,N:'xf:label',E:[{T:4,cdata:'이전'}]}]},{T:1,N:'xf:trigger',A:{class:'btn_cm pt','ev:onclick':'scwin.next2_onclick',id:'next2',style:'',type:'button'},E:[{T:1,N:'xf:label',E:[{T:4,cdata:'다음'}]}]}]}]}]},{T:1,N:'xf:group',A:{id:'screen3',style:'display: none;'},E:[{T:1,N:'xf:group',A:{class:'titbox',id:'',style:''},E:[{T:1,N:'w2:textbox',A:{class:'',id:'',label:'Step3 : Title',style:'',tagname:'h4'}}]},{T:1,N:'xf:group',A:{class:'tblbox',id:'',style:''},E:[{T:1,N:'xf:group',A:{adaptive:'layout',adaptiveThreshold:'600',class:'w2tb tbl',id:'',style:'',tagname:'table'},E:[{T:1,N:'w2:attributes',E:[{T:1,N:'w2:summary'}]},{T:1,N:'xf:group',A:{tagname:'colgroup'},E:[{T:1,N:'xf:group',A:{style:'width:150px;',tagname:'col'}},{T:1,N:'xf:group',A:{style:'',tagname:'col'}}]},{T:1,N:'xf:group',A:{style:'',tagname:'tr'},E:[{T:1,N:'xf:group',A:{class:'w2tb_th',style:'',tagname:'th'},E:[{T:1,N:'w2:textbox',A:{class:'req',id:'',label:'테이블헤더',ref:'',style:'',userData2:''}}]},{T:1,N:'xf:group',A:{class:'w2tb_td',style:'',tagname:'td'}}]},{T:1,N:'xf:group',A:{style:'',tagname:'tr'},E:[{T:1,N:'xf:group',A:{class:'w2tb_th',style:'',tagname:'th'},E:[{T:1,N:'w2:textbox',A:{class:'req',id:'',label:'테이블헤더',ref:'',style:'',userData2:''}}]},{T:1,N:'xf:group',A:{class:'w2tb_td',style:'',tagname:'td'}}]},{T:1,N:'xf:group',A:{style:'',tagname:'tr'},E:[{T:1,N:'xf:group',A:{class:'w2tb_th',style:'',tagname:'th'},E:[{T:1,N:'w2:textbox',A:{class:'req',id:'',label:'테이블헤더',ref:'',style:'',userData2:''}}]},{T:1,N:'xf:group',A:{class:'w2tb_td',style:'',tagname:'td'}}]}]}]},{T:1,N:'xf:group',A:{class:'btnbox',id:'',style:''},E:[{T:1,N:'xf:group',A:{class:'rt',id:''},E:[{T:1,N:'xf:trigger',A:{class:'btn_cm ','ev:onclick':'scwin.prev3_onclick',id:'prev3',style:'',type:'button'},E:[{T:1,N:'xf:label',E:[{T:4,cdata:'이전'}]}]},{T:1,N:'xf:trigger',A:{class:'btn_cm pt','ev:onclick':'scwin.next3_onclick',id:'next3',style:'',type:'button'},E:[{T:1,N:'xf:label',E:[{T:4,cdata:'다음'}]}]}]}]}]},{T:1,N:'xf:group',A:{id:'screen4',style:'display: none;'},E:[{T:1,N:'xf:group',A:{class:'titbox',id:'',style:''},E:[{T:1,N:'w2:textbox',A:{class:'',id:'',label:'Step4 : Title',style:'',tagname:'h4'}}]},{T:1,N:'xf:group',A:{class:'tblbox',id:'',style:''},E:[{T:1,N:'xf:group',A:{adaptive:'layout',adaptiveThreshold:'600',class:'w2tb tbl',id:'',style:'',tagname:'table'},E:[{T:1,N:'w2:attributes',E:[{T:1,N:'w2:summary'}]},{T:1,N:'xf:group',A:{tagname:'colgroup'},E:[{T:1,N:'xf:group',A:{style:'width:150px;',tagname:'col'}},{T:1,N:'xf:group',A:{style:'',tagname:'col'}}]},{T:1,N:'xf:group',A:{style:'',tagname:'tr'},E:[{T:1,N:'xf:group',A:{class:'w2tb_th',style:'',tagname:'th'},E:[{T:1,N:'w2:textbox',A:{class:'req',id:'',label:'테이블헤더',ref:'',style:'',userData2:''}}]},{T:1,N:'xf:group',A:{class:'w2tb_td',style:'',tagname:'td'}}]},{T:1,N:'xf:group',A:{style:'',tagname:'tr'},E:[{T:1,N:'xf:group',A:{class:'w2tb_th',style:'',tagname:'th'},E:[{T:1,N:'w2:textbox',A:{class:'req',id:'',label:'테이블헤더',ref:'',style:'',userData2:''}}]},{T:1,N:'xf:group',A:{class:'w2tb_td',style:'',tagname:'td'}}]},{T:1,N:'xf:group',A:{style:'',tagname:'tr'},E:[{T:1,N:'xf:group',A:{class:'w2tb_th',style:'',tagname:'th'},E:[{T:1,N:'w2:textbox',A:{class:'req',id:'',label:'테이블헤더',ref:'',style:'',userData2:''}}]},{T:1,N:'xf:group',A:{class:'w2tb_td',style:'',tagname:'td'}}]},{T:1,N:'xf:group',A:{style:'',tagname:'tr'},E:[{T:1,N:'xf:group',A:{class:'w2tb_th',style:'',tagname:'th'},E:[{T:1,N:'w2:textbox',A:{class:'req',id:'',label:'테이블헤더',ref:'',style:'',userData2:''}}]},{T:1,N:'xf:group',A:{class:'w2tb_td',style:'',tagname:'td'}}]}]}]},{T:1,N:'xf:group',A:{class:'btnbox',id:'',style:''},E:[{T:1,N:'xf:group',A:{class:'rt',id:''},E:[{T:1,N:'xf:trigger',A:{class:'btn_cm ','ev:onclick':'scwin.prev4_onclick',id:'prev4',style:'',type:'button'},E:[{T:1,N:'xf:label',E:[{T:4,cdata:'이전'}]}]},{T:1,N:'xf:trigger',A:{class:'btn_cm pt','ev:onclick':'scwin.next4_onclick',id:'next4',style:'',type:'button'},E:[{T:1,N:'xf:label',E:[{T:4,cdata:'다음'}]}]}]}]}]},{T:1,N:'xf:group',A:{id:'screen5',style:'display: none;'},E:[{T:1,N:'xf:group',A:{class:'titbox',id:'',style:''},E:[{T:1,N:'w2:textbox',A:{class:'',id:'',label:'Step4 : Title',style:'',tagname:'h4'}}]},{T:1,N:'xf:group',A:{class:'tblbox',id:'',style:''},E:[{T:1,N:'xf:group',A:{adaptive:'layout',adaptiveThreshold:'600',class:'w2tb tbl',id:'',style:'',tagname:'table'},E:[{T:1,N:'w2:attributes',E:[{T:1,N:'w2:summary'}]},{T:1,N:'xf:group',A:{tagname:'colgroup'},E:[{T:1,N:'xf:group',A:{style:'width:150px;',tagname:'col'}},{T:1,N:'xf:group',A:{style:'',tagname:'col'}}]},{T:1,N:'xf:group',A:{style:'',tagname:'tr'},E:[{T:1,N:'xf:group',A:{class:'w2tb_th',style:'',tagname:'th'},E:[{T:1,N:'w2:textbox',A:{class:'req',id:'',label:'테이블헤더',ref:'',style:'',userData2:''}}]},{T:1,N:'xf:group',A:{class:'w2tb_td',style:'',tagname:'td'}}]},{T:1,N:'xf:group',A:{style:'',tagname:'tr'},E:[{T:1,N:'xf:group',A:{class:'w2tb_th',style:'',tagname:'th'},E:[{T:1,N:'w2:textbox',A:{class:'req',id:'',label:'테이블헤더',ref:'',style:'',userData2:''}}]},{T:1,N:'xf:group',A:{class:'w2tb_td',style:'',tagname:'td'}}]},{T:1,N:'xf:group',A:{style:'',tagname:'tr'},E:[{T:1,N:'xf:group',A:{class:'w2tb_th',style:'',tagname:'th'},E:[{T:1,N:'w2:textbox',A:{class:'req',id:'',label:'테이블헤더',ref:'',style:'',userData2:''}}]},{T:1,N:'xf:group',A:{class:'w2tb_td',style:'',tagname:'td'}}]},{T:1,N:'xf:group',A:{style:'',tagname:'tr'},E:[{T:1,N:'xf:group',A:{class:'w2tb_th',style:'',tagname:'th'},E:[{T:1,N:'w2:textbox',A:{class:'req',id:'',label:'테이블헤더',ref:'',style:'',userData2:''}}]},{T:1,N:'xf:group',A:{class:'w2tb_td',style:'',tagname:'td'}}]},{T:1,N:'xf:group',A:{style:'',tagname:'tr'},E:[{T:1,N:'xf:group',A:{class:'w2tb_th',style:'',tagname:'th'},E:[{T:1,N:'w2:textbox',A:{class:'req',id:'',label:'테이블헤더',ref:'',style:'',userData2:''}}]},{T:1,N:'xf:group',A:{class:'w2tb_td',style:'',tagname:'td'}}]}]}]},{T:1,N:'xf:group',A:{class:'btnbox',id:'',style:''},E:[{T:1,N:'xf:group',A:{class:'rt',id:''},E:[{T:1,N:'xf:trigger',A:{class:'btn_cm ','ev:onclick':'scwin.prev5_onclick',id:'prev5',style:'',type:'button'},E:[{T:1,N:'xf:label',E:[{T:4,cdata:'이전'}]}]},{T:1,N:'xf:trigger',A:{class:'btn_cm pt',id:'',style:'',type:'button'},E:[{T:1,N:'xf:label',E:[{T:4,cdata:'확인'}]}]}]}]}]}]}]}]}]})