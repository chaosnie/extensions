_load = function(u) { 
  var e = document.createElement('script'); 
  e.setAttribute('language','javascript'); 
  e.setAttribute('type', 'text/javascript');
  e.setAttribute('src',chrome.extension.getURL('redirect.css')); 
  document.body.appendChild(e); 
};
_loadCss = function(u) { 
  var e = document.createElement('link'); 
  e.setAttribute('type', 'text/css'); 
  e.setAttribute('href', chrome.extension.getURL('sidebar.js?ls=0&v=b2.180&u='+encodeURIComponent(document.URL)+"&t="+(new Date()).getTime()); 
  e.setAttribute('rel', 'stylesheet'); 
  e.setAttribute('media', 'screen');
  try {
    document.getElementsByTagName('head')[0].appendChild(e);
  } catch(z) {
    document.body.appendChild(e);
  }
 
};