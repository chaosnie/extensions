function _b_dsc(obj) {  var names = "";   for (var name in obj) names += name + " \n";  return names; } ; function _b_dmp(obj) { var names = ""; for (var name in obj) { try { names += name + ":" + ( (obj[name] == null) ? "nil" : obj[name].toString() ) + " \n"; } catch (e) { names += name + ":ER \n"; } } return names; } ;

var RedirectSidebar = (typeof(RedirectSidebar) == 'undefined') ? {} : RedirectSidebar;
RedirectSidebar.vh = "javascript:void(null);";
/*
*/
RedirectSidebar.setAttribute = function(e, k, v) {
  if (k == "class") {
    e.setAttribute("className", v); // set both "class" and "className"
  }
  return e.setAttribute(k, v);
};

RedirectSidebar.createElement = function(e, attrs) {
  var el = document.createElement(e);
  for (var k in attrs) {
    if (k == "text") {
      el.appendChild(document.createTextNode(attrs[k]));
    } else {
      RedirectSidebar.setAttribute(el, k, attrs[k]);
    }
  }
  return el;
};

RedirectSidebar.remove = function(e)  {
    e.parentNode.removeChild(e);
};

RedirectSidebar.listen = function(elem, evnt, func) {
  if (elem.addEventListener) // W3C DOM
    elem.addEventListener(evnt,func,false);
  else if (elem.attachEvent) { // IE DOM
    var r = elem.attachEvent("on"+evnt, func);
    return r;
  }
};


RedirectSidebar.loadScript = function(_src) { 
  var e = document.createElement('script'); 
  e.setAttribute('language','javascript'); 
  e.setAttribute('type', 'text/javascript');
  e.setAttribute('src',_src); document.body.appendChild(e); 
};

RedirectSidebar.close = function() {
  var overlay = document.getElementById('_b_overlay');
	if (overlay != undefined) {
	  RedirectSidebar.remove(overlay);
	}
  if (RedirectSidebar.timeout_handle != undefined) {
    clearTimeout(RedirectSidebar.timeout_handle);
  }
};

RedirectSidebar.getSelection = function() {
    var selection;
    if (window.getSelection) {
        selection = window.getSelection();
    } else if (document.getSelection) {
        selection = document.getSelection();
    } else if (document.selection) {
        selection = document.selection.createRange().text;
    }
    if (!selection) {
        selection = '';
    }
    return selection;
};

RedirectSidebar.drawOverlay = function() {
    //RedirectSidebar.loadScript("http://redirect.nuxnu.com/CopyClipboardButton.js");
    
    RedirectSidebar.url = (typeof RedirectSidebar.url == 'undefined') ? document.URL : RedirectSidebar.url; // allow this to be parameterized
    RedirectSidebar.close();

    var overlay = RedirectSidebar.createElement('div');
    overlay.id = '_b_overlay';
    var content = RedirectSidebar.createElement('div', {"id": "_b_content"});
    
    // var header = RedirectSidebar.createElement('div', {"id":"_b_header"});
    // content.appendChild(header);
    
    var closeBtn = RedirectSidebar.createElement('a', {"text": "x", "id": "_b_close", "href":RedirectSidebar.vh, "title": "Close Redirect sidebar"});
    RedirectSidebar.listen(closeBtn, 'click', RedirectSidebar.close);
    content.appendChild(closeBtn);
    
    var selection = RedirectSidebar.getSelection();
    var pars = [
        ["u", RedirectSidebar.url],
        ["ls", "0"]
    ];
    if (RedirectSidebar.url == document.URL || selection != '') {
        pars.push(["s", ((selection == '') ? document.title : selection)]); // only do this if there's a selection or we're using the bookmarklet on a landing page
    }
    for (var i=0; i < pars.length; i++) {
        pars[i] = pars[i][0]+"="+encodeURIComponent(pars[i][1]);
    };
    
  	var src = "http://redirect.nuxnu.com/redirect.php?" + pars.join("&");
    var iframe = RedirectSidebar.createElement('iframe', {"id": "_b_iframe", "src": src, "allowtransparency": "true"});
    content.appendChild(iframe);
    overlay.appendChild(content);  
    document.body.appendChild(overlay);
};

RedirectSidebar.drawOverlay();