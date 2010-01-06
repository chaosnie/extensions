var xmlhttp = null;

function openclass() {
    window.open("http://www.weather.com.cn/static/custom/select.html", "newwindow", "height=300, width=600,scrollbars=no,toolbar=no,menubar=no,resizable=no,location=no,status=no")
}

function createXMLHTTPRequext() {
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest()
    } else if (window.ActiveXObject) {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
        if (!xmlhttp) {
            xmlhttp = new ActiveXObject('Microsoft.XMLHTTP')
        }
    }
}
var allcookies = document.cookie;
var pos1 = allcookies.indexOf("city1=");
var pos2 = allcookies.indexOf("city2=");
var pos3 = allcookies.indexOf("city3=");
var pos4 = allcookies.indexOf("city4=");
var pos5 = allcookies.indexOf("city5=");
var pod1 = allcookies.indexOf("ctid1=");
var pod2 = allcookies.indexOf("ctid2=");
var pod3 = allcookies.indexOf("ctid3=");
var pod4 = allcookies.indexOf("ctid4=");
var pod5 = allcookies.indexOf("ctid5=");
var jsonobj;

function HandleStateChange() {
    if (xmlhttp.readyState == 4) {
        var jsontext = xmlhttp.responseText;
        var func = new Function("return " + jsontext);
        jsonobj = func()
    }
}

function PostOrder(xmldoc) {
    createXMLHTTPRequext();
    xmlhttp.open("GET", xmldoc, false);
    xmlhttp.onreadystatechange = HandleStateChange;
    xmlhttp.send(null)
}
var datetime = 'http://www.weather.com.cn/data/cityinfo/101010100.html';
var xmlhttp;
PostOrder(datetime);
HandleStateChange();
var ptime = jsonobj.weatherinfo.ptime;
if (ptime == "12:00") {
    var stime = "11:00";
    ptime = stime
} else {
    ptime = ptime
}
document.write('<meta http-equiv="content-type" content="text/html;charset=utf-8" />');
document.write('<link href="http://www.weather.com.cn/m/c/style.css" rel="stylesheet" type="text/css" /> ');
document.write('<table width="100%" border="0" cellpadding="6" cellspacing="0" class="tdb">');
document.write('  <tr>');
document.write('    <td class="title01 tdbdz">我的城市天气   (' + ptime + '发布)</td>');
document.write('    <td width="35%" align="center" class="tdbdz"><a href="javascript:void(null)" onClick="openclass()"><img src="http://www.weather.com.cn/m/i/global/btn_dingzhi.gif" alt="订制我的城市天气" /></a></td>');
document.write('  </tr>');
if (pos1 == -1 & pod1 == -1) {
    var value1 = '北京';
    var id1 = '101010100';
    var xmldoc = 'http://www.weather.com.cn/data/cityinfo/' + id1 + '.html';
    var xmlhttp;
    PostOrder(xmldoc);
    HandleStateChange();
    var temp1 = jsonobj.weatherinfo.temp1;
    var temp2 = jsonobj.weatherinfo.temp2;
    var img1 = jsonobj.weatherinfo.img1;
    var img2 = jsonobj.weatherinfo.img2;
    document.write('  <tr>');
    document.write('    <td colspan="2"><table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="F7FFFF">');
    document.write('    <tr>');
    document.write('        <td width="30%" height="28" align="center"><a href="/html/weather/' + id1 + '.shtml" target="_blank">' + value1 + '</a></td>');
    document.write('        <td width="30%" align="center"><img src="http://www.weather.com.cn/m/i/weatherpic/29x20/' + img1 + '" /> <img src="http://www.weather.com.cn/m/i/weatherpic/29x20/' + img2 + '" /></td>');
    document.write('        <td width="28%"><span class="font7 fontb">' + temp1 + '</span>/<span class="font6 fontb">' + temp2 + '</span></td>');
    document.write('        <td width="12%" align="right"><a href="/html/weather/' + id1 + '.shtml" target="_blank">详情</a></td>');
    document.write('    </tr>')
} else {
    var start1 = pos1 + 6;
    var end1 = allcookies.indexOf(";", start1);
    if (end1 == -1) end1 = allcookies.length;
    var value1 = allcookies.substring(start1, end1);
    value1 = unescape(value1);
    var first1 = pod1 + 6;
    var last1 = allcookies.indexOf(";", first1);
    if (last1 == -1) last1 = allcookies.length;
    var id1 = allcookies.substring(first1, last1);
    id1 = unescape(id1);
    var xmldoc = 'http://www.weather.com.cn/data/cityinfo/' + id1 + '.html';
    var xmlhttp;
    PostOrder(xmldoc);
    HandleStateChange();
    var temp1 = jsonobj.weatherinfo.temp1;
    var temp2 = jsonobj.weatherinfo.temp2;
    var img1 = jsonobj.weatherinfo.img1;
    var img2 = jsonobj.weatherinfo.img2;
    document.write('  <tr>');
    document.write('    <td colspan="2"><table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="F7FFFF">');
    document.write('    <tr>');
    document.write('        <td width="30%" height="28" align="center"><a href="/html/weather/' + id1 + '.shtml" target="_blank">' + value1 + '</a></td>');
    document.write('        <td width="30%" align="center"><img src="http://www.weather.com.cn/m/i/weatherpic/29x20/' + img1 + '" /> <img src="http://www.weather.com.cn/m/i/weatherpic/29x20/' + img2 + '" /></td>');
    document.write('        <td width="28%"><span class="font7 fontb">' + temp1 + '</span>/<span class="font6 fontb">' + temp2 + '</span></td>');
    document.write('        <td width="12%" align="right"><a href="/html/weather/' + id1 + '.shtml" target="_blank">详情</a></td>');
    document.write('      </tr>')
}
if (pos2 == -1 & pod2 == -1) {
    var value2 = '武汉';
    var id2 = '101200101';
    var xmldoc = 'http://www.weather.com.cn/data/cityinfo/' + id2 + '.html';
    var xmlhttp;
    PostOrder(xmldoc);
    HandleStateChange();
    var temp1 = jsonobj.weatherinfo.temp1;
    var temp2 = jsonobj.weatherinfo.temp2;
    var img1 = jsonobj.weatherinfo.img1;
    var img2 = jsonobj.weatherinfo.img2;
    document.write('      <tr>');
    document.write('        <td width="30%" height="28" align="center"><a href="/html/weather/' + id2 + '.shtml" target="_blank">' + value2 + '</a></td>');
    document.write('        <td width="30%" align="center"><img src="http://www.weather.com.cn/m/i/weatherpic/29x20/' + img1 + '" /> <img src="http://www.weather.com.cn/m/i/weatherpic/29x20/' + img2 + '" /></td>');
    document.write('        <td width="28%">' + temp1 + '/' + temp2 + '</td>');
    document.write('        <td width="12%" align="right"><a href="/html/weather/' + id2 + '.shtml" target="_blank">详情</a></td>');
    document.write('      </tr>')
} else {
    var start2 = pos2 + 6;
    var end2 = allcookies.indexOf(";", start2);
    if (end2 == -1) end2 = allcookies.length;
    var value2 = allcookies.substring(start2, end2);
    value2 = unescape(value2);
    var first2 = pod2 + 6;
    var last2 = allcookies.indexOf(";", first2);
    if (last2 == -1) last2 = allcookies.length;
    var id2 = allcookies.substring(first2, last2);
    id2 = unescape(id2);
    var xmldoc = 'http://www.weather.com.cn/data/cityinfo/' + id2 + '.html';
    PostOrder(xmldoc);
    HandleStateChange();
    var temp1 = jsonobj.weatherinfo.temp1;
    var temp2 = jsonobj.weatherinfo.temp2;
    var img1 = jsonobj.weatherinfo.img1;
    var img2 = jsonobj.weatherinfo.img2;
    document.write('      <tr>');
    document.write('        <td width="30%" height="28" align="center"><a href="/html/weather/' + id2 + '.shtml" target="_blank">' + value2 + '</a></td>');
    document.write('        <td width="30%" align="center"><img src="http://www.weather.com.cn/m/i/weatherpic/29x20/' + img1 + '" /> <img src="http://www.weather.com.cn/m/i/weatherpic/29x20/' + img2 + '" /></td>');
    document.write('        <td width="28%">' + temp1 + '/' + temp2 + '</td>');
    document.write('        <td width="12%" align="right"><a href="/html/weather/' + id2 + '.shtml" target="_blank">详情</a></td>');
    document.write('      </tr>')
}
if (pos3 == -1 & pod3 == -1) {
    var value3 = '广州';
    var id3 = '101280101';
    var xmldoc = 'http://www.weather.com.cn/data/cityinfo/' + id3 + '.html';
    PostOrder(xmldoc);
    HandleStateChange();
    var temp1 = jsonobj.weatherinfo.temp1;
    var temp2 = jsonobj.weatherinfo.temp2;
    var img1 = jsonobj.weatherinfo.img1;
    var img2 = jsonobj.weatherinfo.img2;
    document.write('      <tr>');
    document.write('        <td height="28" align="center"><a href="/html/weather/' + id3 + '.shtml" target="_blank">' + value3 + '</a></td>');
    document.write('        <td align="center"><img src="http://www.weather.com.cn/m/i/weatherpic/29x20/' + img1 + '" /> <img src="http://www.weather.com.cn/m/i/weatherpic/29x20/' + img2 + '" /></td>');
    document.write('        <td>' + temp1 + '/' + temp2 + '</td>');
    document.write('        <td width="12%" align="right"><a href="/html/weather/' + id3 + '.shtml" target="_blank">详情</a></td>');
    document.write('      </tr>')
} else {
    var start3 = pos3 + 6;
    var end3 = allcookies.indexOf(";", start3);
    if (end3 == -1) end3 = allcookies.length;
    var value3 = allcookies.substring(start3, end3);
    value3 = unescape(value3);
    var first3 = pod3 + 6;
    var last3 = allcookies.indexOf(";", first3);
    if (last3 == -1) last3 = allcookies.length;
    var id3 = allcookies.substring(first3, last3);
    id3 = unescape(id3);
    var xmldoc = 'http://www.weather.com.cn/data/cityinfo/' + id3 + '.html';
    PostOrder(xmldoc);
    HandleStateChange();
    var temp1 = jsonobj.weatherinfo.temp1;
    var temp2 = jsonobj.weatherinfo.temp2;
    var img1 = jsonobj.weatherinfo.img1;
    var img2 = jsonobj.weatherinfo.img2;
    document.write('      <tr>');
    document.write('        <td height="28" align="center"><a href="/html/weather/' + id3 + '.shtml" target="_blank">' + value3 + '</a></td>');
    document.write('        <td align="center"><img src="http://www.weather.com.cn/m/i/weatherpic/29x20/' + img1 + '" /> <img src="http://www.weather.com.cn/m/i/weatherpic/29x20/' + img2 + '" /></td>');
    document.write('        <td>' + temp1 + '/' + temp2 + '</td>');
    document.write('        <td width="12%" align="right"><a href="/html/weather/' + id3 + '.shtml" target="_blank">详情</a></td>');
    document.write('      </tr>')
}
if (pos4 == -1 & pod4 == -1) {
    var value4 = '上海';
    var id4 = '101020100';
    var xmldoc = 'http://www.weather.com.cn/data/cityinfo/' + id4 + '.html';
    PostOrder(xmldoc);
    HandleStateChange();
    var temp1 = jsonobj.weatherinfo.temp1;
    var temp2 = jsonobj.weatherinfo.temp2;
    var img1 = jsonobj.weatherinfo.img1;
    var img2 = jsonobj.weatherinfo.img2;
    document.write('      <tr>');
    document.write('        <td height="28" align="center"><a href="/html/weather/' + id4 + '.shtml" target="_blank">' + value4 + '</a></td>');
    document.write('        <td align="center"><img src="http://www.weather.com.cn/m/i/weatherpic/29x20/' + img1 + '" /> <img src="http://www.weather.com.cn/m/i/weatherpic/29x20/' + img2 + '" /></td>');
    document.write('        <td>' + temp1 + '/' + temp2 + '</td>');
    document.write('        <td width="12%" align="right"><a href="/html/weather/' + id4 + '.shtml" target="_blank">详情</a></td>');
    document.write('      </tr>')
} else {
    var start4 = pos4 + 6;
    var end4 = allcookies.indexOf(";", start4);
    if (end4 == -1) end4 = allcookies.length;
    var value4 = allcookies.substring(start4, end4);
    value4 = unescape(value4);
    var first4 = pod4 + 6;
    var last4 = allcookies.indexOf(";", first4);
    if (last4 == -1) last4 = allcookies.length;
    var id4 = allcookies.substring(first4, last4);
    id4 = unescape(id4);
    var xmldoc = 'http://www.weather.com.cn/data/cityinfo/' + id4 + '.html';
    PostOrder(xmldoc);
    HandleStateChange();
    var temp1 = jsonobj.weatherinfo.temp1;
    var temp2 = jsonobj.weatherinfo.temp2;
    var img1 = jsonobj.weatherinfo.img1;
    var img2 = jsonobj.weatherinfo.img2;
    document.write('      <tr>');
    document.write('        <td height="28" align="center"><a href="/html/weather/' + id4 + '.shtml" target="_blank">' + value4 + '</a></td>');
    document.write('        <td align="center"><img src="http://www.weather.com.cn/m/i/weatherpic/29x20/' + img1 + '" /> <img src="http://www.weather.com.cn/m/i/weatherpic/29x20/' + img2 + '" /></td>');
    document.write('        <td>' + temp1 + '/' + temp2 + '</td>');
    document.write('        <td width="12%" align="right"><a href="/html/weather/' + id4 + '.shtml" target="_blank">详情</a></td>');
    document.write('      </tr>')
}
if (pos5 == -1 & pod5 == -1) {
    var value5 = '重庆';
    var id5 = '101040100';
    var xmldoc = 'http://www.weather.com.cn/data/cityinfo/' + id5 + '.html';
    PostOrder(xmldoc);
    HandleStateChange();
    var temp1 = jsonobj.weatherinfo.temp1;
    var temp2 = jsonobj.weatherinfo.temp2;
    var img1 = jsonobj.weatherinfo.img1;
    var img2 = jsonobj.weatherinfo.img2;
    document.write('      <tr>');
    document.write('        <td height="29" align="center"><a href="/html/weather/' + id5 + '.shtml" target="_blank">' + value5 + '</a></td>');
    document.write('        <td align="center"><img src="http://www.weather.com.cn/m/i/weatherpic/29x20/' + img1 + '" /> <img src="http://www.weather.com.cn/m/i/weatherpic/29x20/' + img2 + '" /></td>');
    document.write('        <td>' + temp1 + '/' + temp2 + '</td>');
    document.write('        <td width="12%" align="right"><a href="/html/weather/' + id5 + '.shtml" target="_blank">详情</a></td>');
    document.write('      </tr>')
} else {
    var start5 = pos5 + 6;
    var end5 = allcookies.indexOf(";", start5);
    if (end5 == -1) end5 = allcookies.length;
    var value5 = allcookies.substring(start5, end5);
    value5 = unescape(value5);
    var first5 = pod5 + 6;
    var last5 = allcookies.indexOf(";", first5);
    if (last5 == -1) last5 = allcookies.length;
    var id5 = allcookies.substring(first5, last5);
    id5 = unescape(id5);
    var xmldoc = 'http://www.weather.com.cn/data/cityinfo/' + id5 + '.html';
    PostOrder(xmldoc);
    HandleStateChange();
    var temp1 = jsonobj.weatherinfo.temp1;
    var temp2 = jsonobj.weatherinfo.temp2;
    var img1 = jsonobj.weatherinfo.img1;
    var img2 = jsonobj.weatherinfo.img2;
    document.write('      <tr>');
    document.write('        <td height="29" align="center"><a href="/html/weather/' + id5 + '.shtml" target="_blank">' + value5 + '</a></td>');
    document.write('        <td align="center"><img src="http://www.weather.com.cn/m/i/weatherpic/29x20/' + img1 + '" /> <img src="http://www.weather.com.cn/m/i/weatherpic/29x20/' + img2 + '" /></td>');
    document.write('        <td>' + temp1 + '/' + temp2 + '</td>');
    document.write('        <td width="12%" align="right"><a href="/html/weather/' + id5 + '.shtml" target="_blank">详情</a></td>');
    document.write('      </tr>')
}
document.write('    </table></td>');
document.write('  </tr>');
document.write('</table>');