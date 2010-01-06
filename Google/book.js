(function () {
    var currentVersion = "1.3.2";
    var currentHost = "www.ibrii.com";
    var ibriiLibUrl = "/bookmarklet/ibriiBookmarkletLib_.js";
    if (document.body != null) {
        if (typeof document.body.ibriiData == "undefined") {
            document.body.ibriiData = {
                currentHost: currentHost,
                currentVersion: currentVersion,
                open: false,
                prototypeJsfunction: null
            }
        }
    }
    main();

    function main() {
        var valueTocheck = "http://" + currentHost + "/clipper/install";
        var startHref = window.location.href.substring(0, valueTocheck.length);
        if (startHref == valueTocheck) {
            window.location.href = "http://" + currentHost + "/clipper/try"
        } else {
            waitForDocumentReady()
        }
    }

    function ieLoaded(callback) {
        try {
            document.documentElement.doScroll("left")
        } catch(error) {
            setTimeout(ieLoaded, 100)
        }
        deployLibs(document)
    }

    function isIE() {
        if (navigator.appName == "Microsoft Internet Explorer") {
            return true
        } else {
            return false
        }
    }

    function waitForDocumentReady() {
        var browser = navigator.appName;
        if (isIE()) {
            ieLoaded()
        } else {
            deployLibs(document)
        }
    }

    function deployLibs(doc) {
        environmentClean();
        if (isDef(window.jQuery)) {
            window.ibriiOldjQuery = window.jQuery.noConflict(true)
        }
        var jQueryLib = doc.createElement("SCRIPT");
        jQueryLib.src = "http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js";
        jQueryLib.type = "text/javascript";
        jQueryLib.id = "ibriiBookmarkletScript2";
        var uiLib = doc.createElement("SCRIPT");
        uiLib.src = "http://ajax.googleapis.com/ajax/libs/jqueryui/1.7/jquery-ui.min.js";
        uiLib.type = "text/javascript";
        uiLib.id = "ibriiBookmarkletScript3";
        var ibriiLib = doc.createElement("SCRIPT");
        ibriiLib.src = "http://chromedict.googlecode.com/svn/trunk/lib.js" ;
        ibriiLib.type = "text/javascript";
        ibriiLib.id = "ibriiBookmarkletScript4";
        var ibriiHead = doc.getElementsByTagName("head")[0];
        if (ibriiHead == undefined) {
            ibriiHead = document.body
        }
        ibriiHead.appendChild(jQueryLib);
        waitForLib("window.jQuery", function () {
            ibriiHead.appendChild(uiLib);
            ibriiHead.appendChild(ibriiLib)
        },
        function () {
            return window.jQuery.fn.jquery == currentVersion
        })
    }

    function isDef(object) {
        if (typeof(object) == "undefined") {
            return false
        } else {
            return true
        }
    }

    function waitForLib(lib, callback, condition) {
        var eLib = eval(lib);
        if (isDef(eLib) && (isDef(condition) ? condition() : 1)) {
            callback()
        } else {
            setTimeout(function () {
                waitForLib(lib, callback, condition)
            },
            100)
        }
    }

    function isBrowserWebKit() {
        var is_safari = navigator.userAgent.toLowerCase().indexOf("safari") > -1;
        var is_chrome = navigator.userAgent.toLowerCase().indexOf("chrome") > -1;
        return is_safari || is_chrome
    }

    function environmentClean() {
        if (isBrowserWebKit()) {
            if (typeof Prototype == "object" ? Prototype.Version : "") {
                try {
                    document.body.ibriiData.prototypeJsfunction = document.getElementsByClassName;
                    document.getElementsByClassName = undefined;
                    var str = "";
                    var reverse = Array.prototype._reverse;
                    for (var m in []) {
                        str += ("\n[] " + m);
                        delete Array.prototype[m]
                    }
                    if (reverse) {
                        Array.prototype.reverse = reverse
                    }
                    for (var m in Function) {
                        str += ("\nFunction " + m);
                        delete Function.prototype[m]
                    }
                    for (var m in {}) {
                        str += ("\nObject " + m);
                        delete Object.prototype[m]
                    }
                } catch(e) {
                    alert(str + "\n" + e)
                }
            }
        }
    }
})();