function createDiv()
{

var sidebar = document.createElement('div');
var divIdName = 'iqdb_sidebar';
sidebar.setAttribute('id',divIdName);
document.body.appendChild(sidebar);
document.getElementById("iqdb_sidebar").innerHTML = '<iframe id="iqdb_frame" frameborder=0 src="http://iqdb.org/"   ></iframe>';
	
}

function clear(){		 
document.body.removeChild(document.getElementById("iqdb_sidebar"));
document.body.removeChild(document.getElementById("iqdb_button"));}

function createButton(){
	var button = document.createElement('div');
	var divIdName = 'iqdb_button';
	button.setAttribute('id',divIdName);
	button.innerHTML = "X";
	button.addEventListener('click', function() {
    clear();
		 
        }, false);
	document.body.appendChild(button);
	
	}



if (window == top) {
  tabLoad();
  window.addEventListener("focus", tabLoad);
}

var port = null;


function tabLoad() {
  if (port == null) {
    port = chrome.extension.connect();
	
	
    port.postMessage({});
  }
  
  
  
  
  port.onMessage.addListener(function (msg) {
									   clear();

	
  });
  
  
  port.onMessage.addListener(function (msg) {
									   createButton();


	
  });
  port.onMessage.addListener(function (msg) {
									   createDiv();

	
  });

};


document.getElementById("url").value = "";
