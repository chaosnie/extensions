(function () {
    var jQuery = undefined;
    var $ = undefined;
    var oldjQuery;
    var currentHost = document.body.ibriiData.currentHost;
    var currentVersion = document.body.ibriiData.currentVersion;
    var embedMouseOverEvents = {};
    var frameDivs = undefined;
    main();

    function main() {
        if (! (document.body.ibriiData.open)) {
            waitForLib("window.jQuery.ui", function () {
                loaded()
            })
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

    function isDef(object) {
        if (typeof(object) == "undefined") {
            return false
        } else {
            return true
        }
    }

    function isIE() {
        if (navigator.appName == "Microsoft Internet Explorer") {
            return true
        } else {
            return false
        }
    }

    function isFirefox() {
        if (navigator.userAgent.indexOf("Firefox") != -1) {
            return true
        } else {
            return false
        }
    }

    function loaded() {
        document.getElementsByClassName = document.body.ibriiData.prototypeJsfunction;
        jQuery = $ = window.jQuery.noConflict(true);
        if (isDef(window.ibriiOldjQuery)) {
            window.jQuery = window.$ = window.ibriiOldjQuery
        }
        jQuery.fn.outerHTML = function () {
            return jQuery("<div>").append(this.eq(0).clone()).html()
        };
        var currentLocation = window.location.href;
        var hostWithoutWWW = currentHost;
        if (hostWithoutWWW.length >= 4) {
            if (hostWithoutWWW.substring(0, 4) == "www.") {
                hostWithoutWWW = hostWithoutWWW.substring(4, hostWithoutWWW.length)
            }
        }
        if (currentLocation.indexOf(hostWithoutWWW) > 0) {
            if ((currentLocation.match("#installClipper$")) == "#installClipper") {
                window.location = "http://" + currentHost + "/clipper/try";
                return
            }
        }
//        var ibriiUrl = "http://" + currentHost + "/secured/Bookmarklet.aspx";
        var ibriiUrl = "https://www.google.com";
        var docBody = jQuery(document.body);
        var oldBackAttValue;
        if (isIE()) {
            oldBackAttValue = document.body.style.backgroundAttachment;
            document.body.style.backgroundAttachment = "fixed"
        }
        var doc = document;
        if (docBody[0].tagName == "FRAMESET") {
            var iframes = jQuery("frame", docBody);
            var biggerFrame = {
                area: 0,
                element: null
            };
            iframes.each(function () {
                var me = jQuery("body", this.contentWindow.document);
                var area = me.width() * me.height();
                if (area > biggerFrame.area) {
                    biggerFrame.area = area;
                    biggerFrame.element = me
                }
            });
            docBody = jQuery(biggerFrame.element);
            if ($.browser.msie) {
                doc = biggerFrame.element[0].document
            } else {
                doc = biggerFrame.element[0].ownerDocument
            }
        }
        var iBookEl = doc.createElement("DIV");
        var bookmarkletHeader = doc.createElement("DIV");
        var bookmarkletHeader_a = doc.createElement("A");
        var resizableWorkaroundOverlay = doc.createElement("DIV");
        var iframeDiv = doc.createElement("DIV");
        var iframeDiv_iframe = doc.createElement("IFRAME");
        var resizeHandleW = doc.createElement("DIV");
        var resizeHandleE = doc.createElement("DIV");
        bookmarkletHeader.setAttribute("id", "ibriiBookmarkletHeader");
        jQuery(bookmarkletHeader).attr("style", "height:28px;                                              position:absolute;                                             right:0px;                                              width:100%;cursor:move;z-index:1;");
        bookmarkletHeader_a.setAttribute("id", "ibriiCloseButton");
        bookmarkletHeader_a.setAttribute("href", "#");
        jQuery(bookmarkletHeader_a).attr("style", "color:white;font-size:21px;                                               font-weight:bold;position:absolute;                                               right:0px;text-decoration:none;font-family:arial;padding-right:15px;padding-left:5px;");
        bookmarkletHeader_a.innerHTML = "x";
        resizableWorkaroundOverlay.setAttribute("id", "ibriiResizableWorkaroundOverlay");
        jQuery(resizableWorkaroundOverlay).attr("style", "position:absolute;                                                         width:100%;height:100%;z-index:1;display:none;background-color:white;filter: alpha(opacity = 0);opacity:0;");
        iframeDiv.setAttribute("id", "ibriiIframeDiv");
        jQuery(iframeDiv).attr("style", "height:100%;width:100%;");
        iframeDiv_iframe.setAttribute("frameBorder", "0");
        iframeDiv_iframe.setAttribute("src", ibriiUrl);
        jQuery(iframeDiv_iframe).attr("style", "font-size:medium;                             height:100%;                             right:0;                             top:0;                             left:0;                             width:100%;                             background-color:#666666;                             position:absolute;                             border:1px solid #666666;                             overflow:hidden;                             ");
        resizeHandleW.className = "ui-resizable-handle ui-resizable-w";
        jQuery(resizeHandleW).attr("style", "position:absolute;left:-8px;top:0px;width:15px;height:100%;z-index:1;cursor:e-resize;filter:alpha(opacity=0);background-color:#FFFFFF;opacity:0;");
        resizeHandleE.className = "ui-resizable-handle ui-resizable-e";
        jQuery(resizeHandleE).attr("style", "position:absolute;right:-13px;top:0px;width:15px;height:100%;z-index:1;cursor:e-resize;filter:alpha(opacity=0);background-color:#FFFFFF;opacity:0;");
        iBookEl.setAttribute("id", "ibriiBookmarklet");
        jQuery(iBookEl).attr("style", "position:fixed;                                        top:0px;                                        right:0px;                                        width:330px;                                        height:100%;                                        z-index:2147483647;                                        font-size:16px;                                        _position:absolute;                                        _top:expression(eval(document.documentElement.scrollTop || document.body.scrollTop));                                        ");
        docBody.append(iBookEl);
        iBookEl.appendChild(bookmarkletHeader);
        bookmarkletHeader.appendChild(bookmarkletHeader_a);
        iBookEl.appendChild(resizableWorkaroundOverlay);
        iBookEl.appendChild(resizeHandleW);
        iBookEl.appendChild(resizeHandleE);
        iBookEl.appendChild(iframeDiv);
        iframeDiv.appendChild(iframeDiv_iframe);
        var ibriiBookmarklet = jQuery(iBookEl);
        document.body.ibriiData.open = true;
        jQuery("#ibriiCloseButton").click(function () {
            var deleteSelector;
            if (jQuery.browser.msie) {
                deleteSelector = "#ibriiBookmarklet, .ibriiDraggerContainer"
            } else {
                deleteSelector = "#ibriiBookmarklet, .ibriiDragger"
            }
            var toDelete = jQuery(deleteSelector, document.body);
            toDelete.each(function () {
                jQuery(this).remove()
            });
            if (isDef(oldBackAttValue)) {
                document.body.style.backgroundAttachment = oldBackAttValue
            }
            document.body.ibriiData.open = false;
            jQuery("img,a").each(function () {
                var me = $(this);
                var oldCursor = me.data("ibriiOldCursor");
                me.css("cursor", (oldCursor) ? oldCursor : "");
                var stopPropagationFunction = me.data("ibriiStopPropagationFunction");
                me.unbind("dragstart", stopPropagationFunction);
                if (isIE()) {
                    var aParent = me.data("ibriiOldImageParent");
                    if (aParent) {
                        me.replaceWith(aParent)
                    }
                }
            });
            jQuery("object:not(object:has(embed)), embed").each(function () {
                this.onmouseover = embedMouseOverEvents.oldMouseover;
                this.onmouseout = embedMouseOverEvents.oldMouseout
            });
            jQuery(".ibriiFrame").remove();
            return false
        });
        var workaroundOverlay = jQuery(document.getElementById("ibriiResizableWorkaroundOverlay"));
        var isIeBrowser = isIE();
        ibriiBookmarklet.draggable({
            handle: "#ibriiBookmarkletHeader",
            axis: "x",
            container: "html",
            stop: function (e, ui) {
                workaroundOverlay.hide();
                if (isIeBrowser) {
                    ibriiBookmarklet.css({
                        height: "100%"
                    })
                } else {
                    ibriiBookmarklet.css({
                        height: "100%",
                        position: "fixed",
                        top: "0"
                    })
                }
            },
            start: function (e, ui) {
                workaroundOverlay.show()
            },
            snap: "window"
        }).resizable({
            handles: {
                w: ".ui-resizable-w",
                e: ".ui-resizable-e"
            },
            stop: function (e, ui) {
                workaroundOverlay.hide();
                if (isIeBrowser) {
                    ibriiBookmarklet.css({
                        height: "100%"
                    })
                } else {
                    ibriiBookmarklet.css({
                        height: "100%",
                        position: "fixed",
                        top: "0"
                    })
                }
            },
            start: function (e, ui) {
                workaroundOverlay.show()
            },
            minWidth: "330"
        });
        if (true) {
            if (jQuery.browser.msie) {
                var draggerDivContainer = jQuery("<span class='ibriiDraggerContainer' style='                 position:absolute !important;                border:1px solid #F589B5 !important;                z-index:2147483646;                font-size:16px !important;                background-image:url(http://" + currentHost + "/imgs/bookmarkletGradient.png);                 padding:0px !important;                margin:0px !important;                color:#FFFFFF !important;                line-height:16px !important;                 ' >                    <a href='http://www.ibrii.wrong' class='ibriiDragger' unselectable='false'                     style='                     font-weight:bold !important;                    z-index:2147483646 !important;                    cursor:move !important;                    display:inline-block !important;                    width:90px;                    height:18px;                    font-size:12px !important;                    font-family:Sans-serif !important;                     padding-left:0px !important;                    padding-right:0px !important;                    padding-top:0px !important;                    padding-top:3px; !important;                     margin:0px !important;                    text-decoration:none !important;                    text-align:center !important;                     line-height:16px !important;                     color:#FFFFFF !important;                    background-color:#EF317C !important;                 '>                 <span style='background-image:url(http://" + currentHost + "/imgs/bookmarkletMoveCross.png);                 display:inline-block;                height:16px;                width:16px;                float:left;                position:relative;                left:4px;                '></span>                 Drag me</a></span>")
            } else {
                var draggerDivContainer = jQuery("<a href='http://www.ibrii.wrong' class='ibriiDragger ibriiDraggerContainer' unselectable='false' style='position:absolute;background-color:#EF317C !important;background-image:url(http://" + currentHost + "/imgs/bookmarkletGradient.png);padding-top:3px;height:19px;color:#FFFFFF !important;font-weight:bold !important;z-index:2147483646 !important;border:1px solid #F589B5 !important;cursor:move !important;padding-left:1em !important;padding-right:1em !important;font-size:12px !important;text-decoration:none !important;font-family:Sans-serif !important;-moz-border-radius-topleft:8px;-moz-border-radius-topright:8px;-webkit-border-top-left-radius:5px;-webkit-border-top-right-radius:5px;'><span style='background-image:url(http://" + currentHost + "/imgs/bookmarkletMoveCross.png);display:inline-block;height:16px;width:16px;float: left; position: relative; right: 5px;'></span> Drag me</a>")
            }
            var objectsInIframe = new Array();
            var objectsInIframeOffSet = new Array();
            frameDivs = createFrame(2, 5, "ibriiFrame");
            var getObjectInIframe = function (element) {
                try {
                    var body = element.contentWindow.document.body;
                    var flashObjectIframe = jQuery("object:not(>embed), embed", body);
                    flashObjectIframe.each(function () {
                        objectsInIframe.push(this)
                    });
                    var iframeObjects = jQuery("iframe", element);
                    if (iframeObjects.length == 0) {
                        return
                    } else {
                        iframeObjects.each(function () {
                            var body = this.contentWindow.document.body;
                            var flashObjectIframe = jQuery("object:not(>embed), embed", body);
                            flashObjectIframe.each(function () {
                                objectsInIframe.push(this)
                            });
                            getObjectInIframe(this)
                        })
                    }
                } catch(err) {}
            };
            var iframeObjects = jQuery("iframe");
            iframeObjects.each(function () {
                var test = $(this).offset();
                if ($(this).attr("src") != null) {
                    if ($(this).attr("src").indexOf("Bookmarklet.aspx") == -1) {
                        objectsInIframeOffSet.push($(this).offset());
                        getObjectInIframe(this)
                    }
                }
            });
            if (objectsInIframe.length > 0) {
                for (var k = 0; k < objectsInIframe.length; k++) {
                    var dragger = draggerDivContainer.clone();
                    dragger.css("left", objectsInIframeOffSet[k].left + "px");
                    dragger.css("top", (objectsInIframeOffSet[k].top - 20) + "px");
                }
            }
            var flashObject = jQuery("object:not(>embed), embed");
            flashObject.each(function () {
                var dragger = draggerDivContainer.clone();
                CreateFrameInternals(this)
            })
        }
        var isSupported = false;


    }

    function CreateFrameInternals(element) {
        var me = element;
        var jMe = jQuery(element);
        var jMeParent = jMe.parent();
        if (jMe.height() == 0 && jMe.width() == 0 && jMeParent[0].tagName == "OBJECT") {
            me = jMeParent[0]
        }
        embedMouseOverEvents.oldMouseover = me.onmouseover;
        embedMouseOverEvents.oldMouseout = me.onmouseout;
        me.onmouseover = embedMouseOverEvents.mouseover;
        me.onmouseout = embedMouseOverEvents.mouseout
    }

    function createFrame(margin, width, id) {
        if (! (id)) {
            id = "ibriiFrameID"
        }
        var backColor = "#EF317C";
        var zIndex = "2147483645";
        var frameL = jQuery("<div class='ibriiFrame ibriiFrameLeft' id='" + id + "l'></div>");
        var frameR = jQuery("<div class='ibriiFrame ibriiFrameRight' id='" + id + "r'></div>");
        var frameT = jQuery("<div class='ibriiFrame ibriiFrameTop' id='" + id + "t'></div>");
        var frameB = jQuery("<div class='ibriiFrame ibriiFrameBottom' id='" + id + "b'></div>");
        frameL.css({
            "background-color": backColor,
            position: "absolute",
            "z-index": zIndex
        }).hide();
        frameR.css({
            "background-color": backColor,
            position: "absolute",
            "z-index": zIndex
        }).hide();
        frameT.css({
            "background-color": backColor,
            position: "absolute",
            "z-index": zIndex
        }).hide();
        frameB.css({
            "background-color": backColor,
            position: "absolute",
            "z-index": zIndex
        }).hide();
        var body = $(document.body);
        body.append(frameL);
        body.append(frameR);
        body.append(frameT);
        body.append(frameB);
        var bufferReturn = {
            frameL: frameL,
            frameR: frameR,
            frameT: frameT,
            frameB: frameB,
            margin: margin,
            width: width
        };
        return bufferReturn
    }

    function showFrame(embed, frameDivs) {
        var me = $(embed);
        var meOffset = me.offset();
        var meParent = me.parent();
        if (meOffset.top == 0 && meOffset.left == 0 && meParent[0].tagName == "OBJECT") {
            me = meParent;
            meOffset = meParent.offset()
        }
        var h = me.height();
        var w = me.width();
        var y = meOffset.top;
        var x = meOffset.left;
        var frameL = frameDivs.frameL;
        var frameR = frameDivs.frameR;
        var frameT = frameDivs.frameT;
        var frameB = frameDivs.frameB;
        var margin = frameDivs.margin;
        var width = frameDivs.width;
        frameL.css({
            top: y - margin - width,
            left: x - margin - width,
            width: width + "px",
            height: h + (margin * 2) + (width * 2) + "px"
        }).show();
        frameR.css({
            top: y - margin - width,
            left: x + w + margin,
            width: width + "px",
            height: h + (margin * 2) + (width * 2) + "px"
        }).show();
        frameT.css({
            top: y - margin - width,
            left: x - margin - width,
            width: w + (margin * 2) + (width * 2) + "px",
            height: width
        }).show();
        frameB.css({
            top: y + h + margin,
            left: x - margin - width,
            width: w + (margin * 2) + (width * 2) + "px",
            height: width
        }).show()
    }

    function hideFrame(frameDivs) {
        frameDivs.frameL.hide();
        frameDivs.frameR.hide();
        frameDivs.frameT.hide();
        frameDivs.frameB.hide()
    }
})();