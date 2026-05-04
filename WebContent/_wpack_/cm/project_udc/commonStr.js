/*amd /cm/project_udc/commonStr.xml 8379 c33334dab077b9177e0cf91af92a99dce2e7d3475740fc55a26495f2bc006c89 */
define({declaration:{A:{version:'1.0',encoding:'UTF-8'}},E:[{T:1,N:'html',A:{xmlns:'http://www.w3.org/1999/xhtml','xmlns:ev':'http://www.w3.org/2001/xml-events','xmlns:w2':'http://www.inswave.com/websquare','xmlns:xf':'http://www.w3.org/2002/xforms'},E:[{T:1,N:'head',A:{},E:[{T:1,N:'w2:type',E:[{T:3,text:'COMPONENT'}]},{T:1,N:'w2:buildDate'},{T:1,N:'w2:MSA'},{T:1,N:'xf:model',E:[{T:1,N:'w2:dataCollection',A:{baseNode:'map'}},{T:1,N:'w2:workflowCollection'}]},{T:1,N:'w2:layoutInfo'},{T:1,N:'w2:publicInfo',A:{method:'scwin.lpad,scwin.rpad,scwin.formatSSN,scwin.formatPhone,\n                               scwin.formatTime,scwin.getLocale,scwin.existKorean,scwin.isKorean,\n                               scwin.isFinalConsonant,scwin.attachPostposition,scwin.isBizID,scwin.isSSN,\n                               scwin.isEmail,scwin.isPhone,scwin.replaceAll,scwin.trim,scwin.getByteLength,scwin.formatTime,scwin.isFinalConsonant,scwin.isEmail'}},{T:1,N:'script',A:{lazy:'false',type:'text/javascript'},E:[{T:4,cdata:function(scopeObj){with(scopeObj){scwin.lpad = function (_$p, str, length, charVal) {
    if (typeof str === 'number') {
        str = str.toString();
    }
    if (charVal.length > length) {
        console.log('오류 : 채우고자 하는 문자열이 요청 길이보다 큽니다');
        return str + '';
    }
    while (str.length < length) {
        str = charVal + str;
    }
    str = str.length >= length ? str.substring(0, length) : str;
    return str;
};
scwin.rpad = function (_$p, str, length, charVal) {
    if (charVal.length > length) {
        console.log('오류 : 채우고자 하는 문자열이 요청 길이보다 큽니다');
        return str + '';
    }
    while (str.length < length)
        str += charVal;
    str = str.length >= length ? str.substring(0, length) : str;
    return str;
};
scwin.formatSSN = function (_$p, str) {
    var front = String(str).substr(0, 6);
    var back = String(str).substr(6, 7);
    var output = front + '-' + back;
    return output;
};
scwin.formatPhone = function (_$p, str) {
    try {
        str = str.replace(/\s+/g, '');
        var commCdList = ['0505'];
        var commCdNum = str.substr(0, 4);
        if (commCdList.indexOf(commCdNum) > -1) {
            return str.replace(/^(01[0136789]{1}|02|0[3-9]{1}[0-9]{1}[0-9]{1})-?([*0-9]{3,4})-?([0-9]{4})$/, '$1-$2-$3');
        } else if (str.length <= 11) {
            return str.replace(/^(01[0136789]{1}|02|0[3-9]{1}[0-9]{1})-?([*0-9]{3,4})-?([0-9]{4})$/, '$1-$2-$3');
        } else {
            return str;
        }
    } catch (ex) {
        console.error(ex);
    }
};
scwin.formatTime = function (_$p, str) {
    try {
        var hour = String(str).substr(0, 2);
        var minute = String(str).substr(2, 2);
        var second = String(str).substr(4, 2);
        if (com.util.isEmpty(second)) {
            return hour + ':' + minute;
        } else {
            return hour + ':' + minute + ':' + second;
        }
    } catch (ex) {
        console.error(ex);
        return str;
    }
};
scwin.getLocale = function (_$p, str) {
    var locale = 0;
    if (str.length > 0) {
        var charCode = str.charCodeAt(0);
        if (charCode >= 44032 && charCode <= 55203) {
            locale = 1;
        } else if (charCode >= 4352 && charCode <= 4601 || charCode >= 12593 && charCode <= 12686) {
            locale = 2;
        } else if (charCode >= 48 && charCode <= 57) {
            locale = 4;
        } else if (charCode >= 32 && charCode <= 47 || charCode >= 58 && charCode <= 64 || charCode >= 91 && charCode <= 96 || charCode >= 123 && charCode <= 126) {
            locale = 8;
        } else if (charCode >= 65 && charCode <= 90) {
            locale = 16;
        } else if (charCode >= 97 && charCode <= 122) {
            locale = 32;
        } else {
            locale = 48;
        }
    }
    return locale;
};
scwin.existKorean = function (_$p, value) {
    check = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    if (check.test(value)) {
        return true;
    } else {
        return false;
    }
};
scwin.isKorean = function (_$p, str) {
    var result = false;
    for (var i = 0; i < str.length; i++) {
        c = str.charAt(i);
        if (!scwin.existKorean(c)) {
            result = false;
            break;
        } else {
            result = true;
        }
    }
    return result;
};
scwin.isFinalConsonant = function (_$p, str) {
    var code = str.charCodeAt(str.length - 1);
    if (code < 44032 || code > 55197) {
        return false;
    }
    if ((code - 16) % 28 == 0) {
        return false;
    }
    return true;
};
scwin.attachPostposition = function (_$p, str) {
    if ($c.util.getLanguage(_$p, 'ko') === true) {
        if (scwin.isFinalConsonant(__$p, str)) {
            str = str + '은';
        } else {
            str = str + '는';
        }
        return str;
    } else {
        return str;
    }
};
scwin.isBizID = function (_$p, str) {
    var sum = 0;
    var aBizID = new Array(10);
    var checkID = new Array('1', '3', '7', '1', '3', '7', '1', '3', '5');
    for (var i = 0; i < 10; i++) {
        aBizID[i] = str.substring(i, i + 1);
    }
    for (var i = 0; i < 9; i++) {
        sum += aBizID[i] * checkID[i];
    }
    sum = sum + parseInt(aBizID[8] * 5 / 10);
    temp = sum % 10;
    temp1 = 0;
    if (temp != 0) {
        temp1 = 10 - temp;
    } else {
        temp1 = 0;
    }
    if (temp1 != aBizID[9]) {
        return false;
    }
    return true;
};
scwin.isSSN = function (_$p, str) {
    var checkID = new Array(2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5);
    var i = 0, sum = 0;
    var temp = 0;
    var yy = '';
    if (str.length != 13) {
        return false;
    }
    for (i = 0; i < 13; i++) {
        if (str.charAt(i) < '0' || str.charAt(i) > '9') {
            return false;
        }
    }
    if (str.substring(6, 13) == '5000000' || str.substring(6, 13) == '6000000' || str.substring(6, 13) == '7000000' || str.substring(6, 13) == '8000000') {
        return true;
    }
    for (i = 0; i < 12; i++) {
        sum += str.charAt(i) * checkID[i];
    }
    temp = sum - Math.floor(sum / 11) * 11;
    temp = 11 - temp;
    temp = temp - Math.floor(temp / 10) * 10;
    if (str.charAt(6) == '1' || str.charAt(6) == '2' || str.charAt(6) == '5' || str.charAt(6) == '6') {
        yy = '19';
    } else {
        yy = '20';
    }
    if (parseInt($c.util.getServerDateTime(_$p, 'yyyy')) - parseInt(yy + str.substring(0, 2)) < 0) {
        return false;
    }
    if (str.charAt(6) != '5' && str.charAt(6) != '6' && str.charAt(6) != '7' && str.charAt(6) != '8') {
        if (temp == $c.num.parseInt(_$p, str.charAt(12))) {
            return true;
        } else {
            return false;
        }
    } else {
        if ((temp + 2) % 10 == $c.num.parseInt(_$p, str.charAt(12))) {
            return true;
        } else {
            return false;
        }
    }
    return false;
};
scwin.isEmail = function (_$p, str) {
    if (typeof str != 'undefined' && str != '') {
        var format = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (format.test(str)) {
            return true;
        } else {
            return false;
        }
    }
    return true;
};
scwin.isPhone = function (_$p, str) {
    try {
        var phoneNum = scwin.formatPhone(_$p, str);
        var isDash = phoneNum.indexOf('-') > 1;
        return isDash;
    } catch (ex) {
        console.error(exx);
        return false;
    }
};
scwin.replaceAll = function (_$p, str, orgStr, repStr) {
    try {
        str = '' + str;
        return str.split(orgStr).join(repStr);
    } catch (ex) {
        console.error(ex);
        return str;
    }
};
scwin.trim = function (_$p, str) {
    try {
        if (typeof str == 'undefined' || str == null) {
            str = '';
        }
        if (typeof str !== 'string') {
            str = str + '';
        }
        return str.trim();
    } catch (ex) {
        console.error(ex);
    }
};
scwin.getByteLength = function (_$p, str, ignoreChar) {
    return WebSquare.util.getStringByteSize(str, ignoreChar);
};
scwin.isFinalConsonant = function (_$p, str) {
    var code = str.charCodeAt(str.length - 1);
    if (code < 44032 || code > 55197) {
        return false;
    }
    if ((code - 16) % 28 == 0) {
        return false;
    }
    return true;
};
}}}]}]},{T:1,N:'body'}]}]})