//smooth scroll function
function smooth_scroller(x) {
    if (x.hash !== "") {
        //event.preventDefault();
        var hash = x.hash;
        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 1200, function () {
            window.location.hash = hash;
        });
    }
}

$(document).ready(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('#scroll').fadeIn();
        } else {
            $('#scroll').fadeOut();
        }
    });
    $('#scroll').click(function () {
        $("html, body").animate({scrollTop: 0}, 900);
        return false;
    });

    $('#myModal, #yt_myModal').on('hidden.bs.modal', function (e) {
        $('body').toggleClass("no-scroll");
    });

    $('#myModal, #yt_myModal').on('shown.bs.modal', function (e) {
        $('body').toggleClass("no-scroll");
    });
});
// end of smooth scroll
// project counting numbers

function smooth() {
    var a = 0;
    $(window).scroll(function () {

        var oTop = $('#counter').offset().top - window.innerHeight;
        if (a == 0 && $(window).scrollTop() > oTop) {
            $('.counter-value').each(function () {
                var $this = $(this),
                        countTo = $this.attr('data-count');
                $({
                    countNum: $this.text()
                }).animate({
                    countNum: countTo
                },
                        {
                            duration: 2000,
                            easing: 'swing',
                            step: function () {
                                $this.text(Math.floor(this.countNum));
                            },
                            complete: function () {
                                $this.text(this.countNum);
                                //alert('finished');
                            }
                        });
            });
            a = 1;
        }
    });
}
// end of project counting

// onexit modal
(function () {
    var guid = 0;
    var exitModalObj = function (element, options) {
        this.guid = guid++;
        this.settings = $.extend({}, exitModalInterface.defaults, options);
        this.$element = $(element);
        this.showCounter = 0;
        this.eventPrefix = '.exitModal' + this.guid;
        this.modalShowEvent = 'show.bs.modal' + this.eventPrefix;
        this.modalShownEvent = 'shown.bs.modal' + this.eventPrefix;
        this.modalHideEvent = 'hide.bs.modal' + this.eventPrefix;
        this.modalHiddenEvent = 'hidden.bs.modal' + this.eventPrefix;
    }

    exitModalObj.prototype = {
        init: function () {
            var plugin = this;
            plugin.$element.modal({
                backdrop: plugin.settings.modalBackdrop,
                keyboard: plugin.settings.modalKeyboard,
                show: false
            });
            plugin.$element.on(plugin.modalShowEvent, function (e) {
                plugin.showCounter++;
                plugin.mouseOutEventUnbind();
                plugin.settings.callbackOnModalShow.call(plugin);
            });
            plugin.$element.on(plugin.modalShownEvent, function (e) {
                plugin.settings.callbackOnModalShown.call(plugin);
            });
            plugin.$element.on(plugin.modalHideEvent, function (e) {
                plugin.settings.callbackOnModalHide.call(plugin);
            });
            plugin.$element.on(plugin.modalHiddenEvent, function (e) {
                if (plugin.settings.numberToShown) {
                    if (plugin.showCounter < plugin.settings.numberToShown) {
                        plugin.mouseOutEventBind();
                    }
                } else {
                    plugin.mouseOutEventBind();
                }
                plugin.settings.callbackOnModalHidden.call(plugin);
            });
            plugin.mouseOutEventBind();
        },
        mouseOutEventBind: function () {
            var plugin = this;
            var oldY = 0;
            $(plugin.settings.viewportSelector).on("mousemove" + plugin.eventPrefix, function (e) {
                if ((e.clientY <= plugin.settings.pageYValueForEventFired) && (e.pageY < oldY)) {
                    plugin.showModal();
                }
                oldY = e.pageY;
            });
        },
        mouseOutEventUnbind: function () {
            var plugin = this;
            $(plugin.settings.viewportSelector).off("mousemove" + plugin.eventPrefix);
        },
        allEventsUnbind: function () {
            var plugin = this;
            $(plugin.settings.viewportSelector).off(plugin.eventPrefix);
            plugin.$element.off(plugin.eventPrefix);
        },
        showModal: function () {
            var plugin = this;
            plugin.$element.modal('show');
        },
        hideModal: function () {
            var plugin = this;
            plugin.$element.modal('hide');
        },
        destroy: function () {
            var plugin = this;
            plugin.allEventsUnbind();
            plugin.$element.data('exitModal', null);
        }
    };

    //plugin
    function exitModalInterface(methodOrOptions) {
        var methodsParameters = Array.prototype.slice.call(arguments, 1);
        return this.each(function () {
            if (!$(this).data('exitModal')) {
                var plugin = new exitModalObj(this, methodOrOptions);
                $(this).data('exitModal', plugin);
                plugin.init();
            } else if (typeof methodOrOptions === 'object') {
                $.error('jQuery.exitModal already initialized');
            } else {
                var plugin = $(this).data('exitModal');
                if (plugin[methodOrOptions]) {
                    plugin[methodOrOptions].apply(plugin, methodsParameters);
                } else {
                    $.error('Method ' + methodOrOptions + ' does not exist on jQuery.exitModal');
                }
            }
        })
    }
    exitModalInterface.defaults = {
        viewportSelector: document,
        showButtonClose: true,
        showButtonCloseOnlyForMobile: true,
        pageYValueForEventFired: 10,
        numberToShown: false,
        modalBackdrop: true,
        modalKeyboard: true,
        modalShowEvent: 'show.bs.modal',
        modalShownEvent: 'shown.bs.modal',
        modalHideEvent: 'hide.bs.modal',
        modalHiddenEvent: 'hidden.bs.modal',
        callbackOnModalShow: function () { },
        callbackOnModalShown: function () { },
        callbackOnModalHide: function () { },
        callbackOnModalHidden: function () { }
    };

    $.fn.exitModal = exitModalInterface;
})();

//table header fixer
/** @preserve jQuery.floatThead 2.0.3 - http://mkoryak.github.io/floatThead/ - Copyright (c) 2012 - 2017 Misha Koryak **/
!function(t){function e(t,e){if(8==f){var o=v.width(),n=s.debounce(function(){var t=v.width();o!=t&&(o=t,e())},1);v.on(t,n)}else v.on(t,s.debounce(e,1))}function o(e){var o=e[0],n=o.parentElement;do{var r=window.getComputedStyle(n).getPropertyValue("overflow");if("visible"!=r)break}while(n=n.parentElement);return t(n==document.body?[]:n)}function n(t){window&&window.console&&window.console.error&&window.console.error("jQuery.floatThead: "+t)}function r(t){var e=t.getBoundingClientRect();return e.width||e.right-e.left}function a(){var t=document.createElement("scrolltester");t.style.cssText="width:100px;height:100px;overflow:scroll!important;position:absolute;top:-9999px;display:block",document.body.appendChild(t);var e=t.offsetWidth-t.clientWidth;return document.body.removeChild(t),e}function i(t){if(t.dataTableSettings)for(var e=0;e<t.dataTableSettings.length;e++){var o=t.dataTableSettings[e].nTable;if(t[0]==o)return!0}return!1}function l(t,e,o){var n=o?"outerWidth":"width";if(p&&t.css("max-width")){var r=0;o&&(r+=parseInt(t.css("borderLeft"),10),r+=parseInt(t.css("borderRight"),10));for(var a=0;a<e.length;a++)r+=e.get(a).offsetWidth;return r}return t[n]()}t.floatThead=t.floatThead||{},t.floatThead.defaults={headerCellSelector:"tr:visible:first>*:visible",zIndex:1001,position:"auto",top:0,bottom:0,scrollContainer:function(){return t([])},responsiveContainer:function(){return t([])},getSizingRow:function(t){return t.find("tbody tr:visible:first>*:visible")},floatTableClass:"floatThead-table",floatWrapperClass:"floatThead-wrapper",floatContainerClass:"floatThead-container",copyTableClass:!0,autoReflow:!1,debug:!1,support:{bootstrap:!0,datatables:!0,jqueryUI:!0,perfectScrollbar:!0}};var s=window._||function(){var e={},o=Object.prototype.hasOwnProperty,n=["Arguments","Function","String","Number","Date","RegExp"];e.has=function(t,e){return o.call(t,e)},e.keys=Object.keys||function(t){if(t!==Object(t))throw new TypeError("Invalid object");var o=[];for(var n in t)e.has(t,n)&&o.push(n);return o};var r=0;return e.uniqueId=function(t){var e=++r+"";return t?t+e:e},t.each(n,function(){var t=this;e["is"+t]=function(e){return Object.prototype.toString.call(e)=="[object "+t+"]"}}),e.debounce=function(t,e,o){var n,r,a,i,l;return function(){a=this,r=arguments,i=new Date;var s=function(){var d=new Date-i;e>d?n=setTimeout(s,e-d):(n=null,o||(l=t.apply(a,r)))},d=o&&!n;return n||(n=setTimeout(s,e)),d&&(l=t.apply(a,r)),l}},e}(),d="undefined"!=typeof MutationObserver,f=function(){for(var t=3,e=document.createElement("b"),o=e.all||[];t=1+t,e.innerHTML="<!--[if gt IE "+t+"]><i><![endif]-->",o[0];);return t>4?t:document.documentMode}(),c=/Gecko\//.test(navigator.userAgent),u=/WebKit\//.test(navigator.userAgent);f||c||u||(f=11);var p=function(){if(u){var e=t("<div>").css("width",0).append(t("<table>").css("max-width","100%").append(t("<tr>").append(t("<th>").append(t("<div>").css("min-width",100).text("X")))));t("body").append(e);var o=0==e.find("table").width();return e.remove(),o}return!1},h=!c&&!f,v=t(window);if(!window.matchMedia){var b=window.onbeforeprint,w=window.onafterprint;window.onbeforeprint=function(){b&&b(),v.triggerHandler("beforeprint")},window.onafterprint=function(){w&&w(),v.triggerHandler("afterprint")}}t.fn.floatThead=function(c){if(c=c||{},8>f)return this;var b=null;if(s.isFunction(p)&&(p=p()),s.isString(c)){var w=c,g=Array.prototype.slice.call(arguments,1),m=this;return this.filter("table").each(function(){var e=t(this),o=e.data("floatThead-lazy");o&&e.floatThead(o);var n=e.data("floatThead-attached");if(n&&s.isFunction(n[w])){var r=n[w].apply(this,g);void 0!==r&&(m=r)}}),m}var y=t.extend({},t.floatThead.defaults||{},c);if(t.each(c,function(e){e in t.floatThead.defaults||!y.debug||n("Used ["+e+"] key to init plugin, but that param is not an option for the plugin. Valid options are: "+s.keys(t.floatThead.defaults).join(", "))}),y.debug){var T=t.fn.jquery.split(".");1==parseInt(T[0],10)&&parseInt(T[1],10)<=7&&n("jQuery version "+t.fn.jquery+" detected! This plugin supports 1.8 or better, or 1.7.x with jQuery UI 1.8.24 -> http://jqueryui.com/resources/download/jquery-ui-1.8.24.zip")}return this.filter(":not(."+y.floatTableClass+")").each(function(){function c(t){return t+".fth-"+R+".floatTHead"}function p(){var e=0;if(k.children("tr:visible").each(function(){e+=t(this).outerHeight(!0)}),"collapse"==M.css("border-collapse")){var o=parseInt(M.css("border-top-width"),10),n=parseInt(M.find("thead tr:first").find(">*:first").css("border-top-width"),10);o>n&&(e-=o/2)}st.outerHeight(e),dt.outerHeight(e)}function w(){var t=l(M,ut,!0),e=V?P:U,o=e.width()||t,n="hidden"!=e.css("overflow-y")?o-N.vertical:o;if(at.width(n),G){var r=100*t/n;tt.css("width",r+"%")}else tt.outerWidth(t)}function g(){D=(s.isFunction(y.top)?y.top(M):y.top)||0,O=(s.isFunction(y.bottom)?y.bottom(M):y.bottom)||0}function m(){var e,o=k.find(y.headerCellSelector);if(nt?e=ot.find("col").length:(e=0,o.each(function(){e+=parseInt(t(this).attr("colspan")||1,10)})),e!=Q){Q=e;for(var n,r=[],a=[],i=[],l=0;e>l;l++)n=o.eq(l).text(),r.push('<th class="floatThead-col" aria-label="'+n+'"/>'),a.push("<col/>"),i.push(t("<fthtd>").css({display:"table-cell",height:0,width:"auto"}));a=a.join(""),r=r.join(""),h&&(rt.empty(),rt.append(i),ut=rt.find("fthtd")),st.html(r),dt=st.find("th"),nt||ot.html(a),ft=ot.find("col"),et.html(a),ct=et.find("col")}return e}function T(){if(!F){if(F=!0,X){var t=l(M,ut,!0),e=J.width();t>e&&M.css("minWidth",t)}M.css(vt),tt.css(vt),tt.append(k),E.before(lt),p()}}function C(){F&&(F=!1,X&&M.width(wt),lt.detach(),M.prepend(k),M.css(bt),tt.css(bt),M.css("minWidth",gt),M.css("minWidth",l(M,ut)))}function x(t){mt!=t&&(mt=t,M.triggerHandler("floatThead",[t,at]))}function j(t){X!=t&&(X=t,at.css({position:X?"absolute":"fixed"}))}function S(t,e,o,n){return h?o:n?y.getSizingRow(t,e,o):e}function z(){var t,e=m();return function(){var o=at.scrollLeft();ft=ot.find("col");var n=S(M,ft,ut,f);if(n.length==e&&e>0){if(!nt)for(t=0;e>t;t++)ft.eq(t).css("width","");C();var a=[];for(t=0;e>t;t++)a[t]=r(n.get(t));for(t=0;e>t;t++)ct.eq(t).width(a[t]),ft.eq(t).width(a[t]);T()}else tt.append(k),M.css(bt),tt.css(bt),p();at.scrollLeft(o),M.triggerHandler("reflowed",[at])}}function I(t){var e=U.css("border-"+t+"-width"),o=0;return e&&~e.indexOf("px")&&(o=parseInt(e,10)),o}function L(){return"auto"==P.css("overflow-x")}function W(){var t,e=U.scrollTop(),o=0,n=B?Y.outerHeight(!0):0,r=K?n:-n,a=at.height(),i=M.offset(),l=0,s=0;if(G){var d=U.offset();o=i.top-d.top+e,B&&K&&(o+=n),l=I("left"),s=I("top"),o-=s}else t=i.top-D-a+O+N.horizontal;var f=v.scrollTop(),c=v.scrollLeft(),p=function(){return(L()?P:U).scrollLeft()||0},h=p();return function(d){V=L();var b=M[0].offsetWidth<=0&&M[0].offsetHeight<=0;if(!b&&it)return it=!1,setTimeout(function(){M.triggerHandler("reflow")},1),null;if(b&&(it=!0,!X))return null;if("windowScroll"==d)f=v.scrollTop(),c=v.scrollLeft();else if("containerScroll"==d)if(P.length){if(!V)return;h=P.scrollLeft()}else e=U.scrollTop(),h=U.scrollLeft();else"init"!=d&&(f=v.scrollTop(),c=v.scrollLeft(),e=U.scrollTop(),h=p());if(!u||!(0>f||0>c)){if(Z)j("windowScrollDone"==d?!0:!1);else if("windowScrollDone"==d)return null;i=M.offset(),B&&K&&(i.top+=n);var w,g,m=M.outerHeight();if(G&&X){if(o>=e){var y=o-e+s;w=y>0?y:0,x(!1)}else w=_?s:e,x(!0);g=l}else!G&&X?(f>t+m+r?w=m-a+r:i.top>=f+D?(w=0,C(),x(!1)):(w=D+f-i.top+o+(K?n:0),T(),x(!0)),g=h):G&&!X?(o>e||e-o>m?(w=i.top-f,C(),x(!1)):(w=i.top+e-f-o,T(),x(!0)),g=i.left+h-c):G||X||(f>t+m+r?w=m+D-f+t+r:i.top>f+D?(w=i.top-f,T(),x(!1)):(w=D,x(!0)),g=i.left+h-c);return{top:Math.round(w),left:Math.round(g)}}}}function H(){var t=null,e=null,o=null;return function(n,r,a){if(null!=n&&(t!=n.top||e!=n.left)){if(8===f)at.css({top:n.top,left:n.left});else{var i="translateX("+n.left+"px) translateY("+n.top+"px)";at.css({"-webkit-transform":i,"-moz-transform":i,"-ms-transform":i,"-o-transform":i,transform:i,top:0,left:0})}t=n.top,e=n.left}r&&w(),a&&p();var l=(V?P:U).scrollLeft();X&&o==l||(at.scrollLeft(l),o=l)}}function q(){if(U.length)if(y.support&&y.support.perfectScrollbar&&U.data().perfectScrollbar)N={horizontal:0,vertical:0};else{if("scroll"==U.css("overflow-x"))N.horizontal=A;else{var t=U.width(),e=l(M,ut),o=r>n?A:0;N.horizontal=e>t-o?A:0}if("scroll"==U.css("overflow-y"))N.vertical=A;else{var n=U.height(),r=M.height(),a=e>t?A:0;N.vertical=r>n-a?A:0}}}var R=s.uniqueId(),M=t(this);if(M.data("floatThead-attached"))return!0;if(!M.is("table"))throw new Error('jQuery.floatThead must be run on a table element. ex: $("table").floatThead();');d=y.autoReflow&&d;var k=M.children("thead:first"),E=M.children("tbody:first");if(0==k.length||0==E.length)return y.debug&&n(0==k.length?"The thead element is missing.":"The tbody element is missing."),M.data("floatThead-lazy",y),void M.unbind("reflow").one("reflow",function(){M.floatThead(y)});M.data("floatThead-lazy")&&M.unbind("reflow"),M.data("floatThead-lazy",!1);var D,O,F=!0,N={vertical:0,horizontal:0},A=a(),Q=0;y.scrollContainer===!0&&(y.scrollContainer=o);var U=y.scrollContainer(M)||t([]),G=U.length>0,P=G?t([]):y.responsiveContainer(M)||t([]),V=L(),X=null;"auto"==y.position?X=null:"fixed"==y.position?X=!1:"absolute"==y.position?X=!0:y.debug&&n('Invalid value given to "position" option, valid is "fixed", "absolute" and "auto". You passed: ',y.position),null==X&&(X=G);var Y=M.find("caption"),B=1==Y.length;if(B)var K="top"===(Y.css("caption-side")||Y.attr("align")||"top");var $=t("<fthfoot>").css({display:"table-footer-group","border-spacing":0,height:0,"border-collapse":"collapse",visibility:"hidden"}),_=!1,J=t([]),Z=9>=f&&!G&&X,tt=t("<table/>"),et=t("<colgroup/>"),ot=M.children("colgroup:first"),nt=!0;0==ot.length&&(ot=t("<colgroup/>"),nt=!1);var rt=t("<fthtr>").css({display:"table-row","border-spacing":0,height:0,"border-collapse":"collapse"}),at=t("<div>").css("overflow","hidden").attr("aria-hidden","true"),it=!1,lt=t("<thead/>"),st=t('<tr class="size-row" aria-hidden="true"/>'),dt=t([]),ft=t([]),ct=t([]),ut=t([]);lt.append(st),M.prepend(ot),h&&($.append(rt),M.append($)),tt.append(et),at.append(tt),y.copyTableClass&&tt.attr("class",M.attr("class")),tt.attr({cellpadding:M.attr("cellpadding"),cellspacing:M.attr("cellspacing"),border:M.attr("border")});var pt=M.css("display");if(tt.css({borderCollapse:M.css("borderCollapse"),border:M.css("border"),display:pt}),G||tt.css("width","auto"),"none"==pt&&(it=!0),tt.addClass(y.floatTableClass).css({margin:0,"border-bottom-width":0}),X){var ht=function(e,o){var n=e.css("position"),r="relative"==n||"absolute"==n,a=e;if(!r||o){var i={paddingLeft:e.css("paddingLeft"),paddingRight:e.css("paddingRight")};at.css(i),a=e.data("floatThead-containerWrap")||e.wrap(t("<div>").addClass(y.floatWrapperClass).css({position:"relative",clear:"both"})).parent(),e.data("floatThead-containerWrap",a),_=!0}return a};G?(J=ht(U,!0),J.prepend(at)):(J=ht(M),M.before(at))}else M.before(at);at.css({position:X?"absolute":"fixed",marginTop:0,top:X?0:"auto",zIndex:y.zIndex,willChange:"transform"}),at.addClass(y.floatContainerClass),g();var vt={"table-layout":"fixed"},bt={"table-layout":M.css("tableLayout")||"auto"},wt=M[0].style.width||"",gt=M.css("minWidth")||"",mt=!1;q();var yt,Tt=function(){(yt=z())()};Tt();var Ct=W(),xt=H();xt(Ct("init"),!0);var jt,St=s.debounce(function(){xt(Ct("windowScrollDone"),!1)},1),zt=function(){xt(Ct("windowScroll"),!1),Z&&St()},It=function(){xt(Ct("containerScroll"),!1)},Lt=function(){M.is(":hidden")||(g(),q(),Tt(),Ct=W(),(xt=H())(Ct("resize"),!0,!0))},Wt=s.debounce(function(){M.is(":hidden")||(q(),g(),Tt(),Ct=W(),xt(Ct("reflow"),!0))},1),Ht=function(){C()},qt=function(){T()},Rt=function(t){t.matches?Ht():qt()};if(window.matchMedia&&window.matchMedia("print").addListener?(jt=window.matchMedia("print"),jt.addListener(Rt)):(v.on("beforeprint",Ht),v.on("afterprint",qt)),G?X?U.on(c("scroll"),It):(U.on(c("scroll"),It),v.on(c("scroll"),zt)):(P.on(c("scroll"),It),v.on(c("scroll"),zt)),v.on(c("load"),Wt),e(c("resize"),Lt),M.on("reflow",Wt),y.support&&y.support.datatables&&i(M)&&M.on("filter",Wt).on("sort",Wt).on("page",Wt),y.support&&y.support.bootstrap&&v.on(c("shown.bs.tab"),Wt),y.support&&y.support.jqueryUI&&v.on(c("tabsactivate"),Wt),d){var Mt=null;s.isFunction(y.autoReflow)&&(Mt=y.autoReflow(M,U)),Mt||(Mt=U.length?U[0]:M[0]),b=new MutationObserver(function(t){for(var e=function(t){return t&&t[0]&&("THEAD"==t[0].nodeName||"TD"==t[0].nodeName||"TH"==t[0].nodeName)},o=0;o<t.length;o++)if(!e(t[o].addedNodes)&&!e(t[o].removedNodes)){Wt();break}}),b.observe(Mt,{childList:!0,subtree:!0})}M.data("floatThead-attached",{destroy:function(){var t=".fth-"+R;return C(),M.css(bt),ot.remove(),h&&$.remove(),lt.parent().length&&lt.replaceWith(k),x(!1),d&&(b.disconnect(),b=null),M.off("reflow reflowed"),U.off(t),P.off(t),_&&(U.length?U.unwrap():M.unwrap()),G?U.data("floatThead-containerWrap",!1):M.data("floatThead-containerWrap",!1),M.css("minWidth",gt),at.remove(),M.data("floatThead-attached",!1),v.off(t),jt&&jt.removeListener(Rt),Ht=qt=function(){},function(){return M.floatThead(y)}},reflow:function(){Wt()},setHeaderHeight:function(){p()},getFloatContainer:function(){return at},getRowGroups:function(){return F?at.find(">table>thead").add(M.children("tbody,tfoot")):M.children("thead,tbody,tfoot")}})}),this}}(function(){var t=window.jQuery;return"undefined"!=typeof module&&module.exports&&!t&&(t=require("jquery")),t}());