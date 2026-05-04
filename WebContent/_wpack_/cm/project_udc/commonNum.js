/*amd /cm/project_udc/commonNum.xml 3262 22a970e7946ba08abc990992c25d40fb35e6851650dc8eb1d4ce8a71c525ef23 */
define({declaration:{A:{version:'1.0',encoding:'UTF-8'}},E:[{T:1,N:'html',A:{xmlns:'http://www.w3.org/1999/xhtml','xmlns:ev':'http://www.w3.org/2001/xml-events','xmlns:w2':'http://www.inswave.com/websquare','xmlns:xf':'http://www.w3.org/2002/xforms'},E:[{T:1,N:'head',A:{},E:[{T:1,N:'w2:type',E:[{T:3,text:'COMPONENT'}]},{T:1,N:'w2:buildDate'},{T:1,N:'w2:MSA'},{T:1,N:'xf:model',E:[{T:1,N:'w2:dataCollection',A:{baseNode:'map'}},{T:1,N:'w2:workflowCollection'}]},{T:1,N:'w2:layoutInfo'},{T:1,N:'w2:publicInfo',A:{method:'scwin.round, scwin.floor, scwin.ceil, scwin.formatMoney, scwin.formatNumber,\n                               scwin.isNumber, scwin.isOdd, scwin.parseInt, scwin.parseFloat, scwin.formatByte'}},{T:1,N:'script',A:{lazy:'false',type:'text/javascript'},E:[{T:4,cdata:function(scopeObj){with(scopeObj){scwin.round = function (_$p, value, point) {
    var num = 1;
    if (typeof point !== 'undefined') {
        num = Math.pow(10, point);
    }
    return Math.round(Number(value) * num) / num;
};
scwin.floor = function (_$p, value, point) {
    var num = 1;
    if (typeof point !== 'undefined') {
        num = Math.pow(10, point);
    }
    return Math.floor(Number(value) * num) / num;
};
scwin.ceil = function (_$p, value, point) {
    var num = 1;
    if (typeof point !== 'undefined') {
        num = Math.pow(10, point);
    }
    return Math.ceil(Number(value) * num) / num;
};
scwin.formatMoney = function (_$p, value, type) {
    var amount;
    if (type == 'plusZero') {
        amount = new String(value) + '0';
    } else {
        amount = new String(value);
    }
    amount = amount.split('.');
    var amount1 = amount[0].split('').reverse();
    var amount2 = amount[1];
    var output = '';
    for (var i = 0; i <= amount1.length - 1; i++) {
        output = amount1[i] + output;
        if ((i + 1) % 3 == 0 && amount1.length - 1 !== i)
            output = ',' + output;
    }
    if (type == 'dollar') {
        if (!amount2) {
            output = '$ ' + output;
        } else {
            output = '$ ' + output + '.' + amount2;
        }
    } else if (type == 'won') {
        if (!amount2) {
            output = output + '원';
        } else {
            output = output + '.' + amount2 + '원';
        }
    } else {
        if (!amount2) {
            output = output;
        } else {
            output = output + '.' + amount2;
        }
    }
    return output;
};
scwin.formatNumber = function (_$p, value) {
    return WebSquare.util.setNumber(value);
};
scwin.isNumber = function (_$p, value) {
    return !isNaN(value);
};
scwin.isOdd = function (_$p, value) {
    return WebSquare.util.isOdd(value);
};
scwin.parseInt = function (_$p, value) {
    return WebSquare.util.parseInt(value);
};
scwin.parseFloat = function (_$p, value) {
    return WebSquare.util.parseFloat(value);
};
scwin.formatByte = function (_$p, value) {
    var unitType = [
        'Bytes',
        'KB',
        'MB',
        'GB',
        'TB',
        'PB'
    ];
    if (value == 0 || value == '0' || isNaN(value)) {
        return 0 + ' ' + unitType[0];
    }
    var index = Math.floor(Math.log(value) / Math.log(1024));
    return (value / Math.pow(1024, index)).toFixed(1) + ' ' + unitType[index];
};
}}}]}]},{T:1,N:'body'}]}]})