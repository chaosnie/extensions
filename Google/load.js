_load = function(u) { 
  var e = document.createElement('script'); 
  e.setAttribute('language','javascript'); 
  e.setAttribute('type', 'text/javascript');
  e.setAttribute('src',u); document.body.appendChild(e); 
};
_loadCss = function(u) { 
  var e = document.createElement('link'); 
  e.setAttribute('type', 'text/css'); 
  e.setAttribute('href', u); 
  e.setAttribute('rel', 'stylesheet'); 
  e.setAttribute('media', 'screen');
  try {
    document.getElementsByTagName('head')[0].appendChild(e);
  } catch(z) {
    document.body.appendChild(e);
  }
 
};
 
_loadCss('http://chromedict.googlecode.com/svn/trunk/bitly.css?v=b2.200');
var _bitly_long_url = document.URL;
if (document.location && document.location.hash) {
    _bitly_long_url = _bitly_long_url + document.location.hash;
}
_load('http://chromedict.googlecode.com/svn/trunk/sidebar.js?ls=0&v=b2.200&u='+encodeURIComponent(_bitly_long_url)+"&t="+(new Date()).getTime());