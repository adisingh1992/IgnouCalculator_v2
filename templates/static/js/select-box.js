
!function(a){a.fn.customselect=function(b,c){var d={csclass:"custom-select",search:!0,numitems:4,searchblank:!1,showblank:!0,searchvalue:!1,hoveropen:!1,emptytext:"",showdisabled:!1,useoptionclass:!1,mobilecheck:function(){return navigator.platform&&navigator.userAgent.match(/(android|iphone|ipad|blackberry)/i)}};b&&"object"==typeof b&&a.extend(d,b);var e="function"==typeof d.mobilecheck?d.mobilecheck.call():d.mobilecheck,f=e?a(this).filter("select"):a(this).filter("select:not([multiple])");return f.each(function(){var f=a(this);f.data("cs-options")&&a.extend(d,f.data("cs-options"));var g=f.parents(d.selector+":first"),h={init:function(){var b={init:function(){b.container(),b.value(),b.subcontainer()},container:function(){g=a("<div/>").addClass(d.csclass),e&&(g.addClass(d.csclass+"-mobile"),f.css("opacity",0)),f.before(g),f.appendTo(g),f.off("change",b._onchange).change(b._onchange);var c=null;g.hover(function(){c&&clearTimeout(c),g.addClass(d.csclass+"-hover")},function(){d.hoveropen&&(c=setTimeout(h.close,750)),g.removeClass(d.csclass+"-hover")}),a(document).mouseup(function(){g.is(d.selector+"-open")&&(g.is(d.selector+"-hover")?g.find("input").focus():h.close())})},value:function(){var b=a("<a href='#'><span/></a>").appendTo(g);f.appendTo(g);var c="",e=null;b.click(function(a){a.preventDefault()}).focus(function(){g.addClass(d.csclass+"-focus")}).blur(function(){g.removeClass(d.csclass+"-focus")}),a("html").keyup(function(a){if(b.is(":focus")){var g=a.which,h=f.find("option").not(":disabled");if(g>=48&&90>=g){c+=String.fromCharCode(g).toLowerCase();for(var i=0;i<h.length;i++){var j=h.eq(i),k=(j.text()+"").toLowerCase();if((!j.is(":disabled")&&d.searchblank||k.length>0)&&0==k.indexOf(c)){f.val(j.attr("value")).change();break}}e&&clearTimeout(e),e=setTimeout(function(){c=""},1e3),a.preventDefault()}else if(27==g)e&&clearTimeout(e),c="",a.preventDefault();else if(38==g){var l=f.find("option:selected"),m=h.index(l);m>0?f.val(h.eq(m-1).attr("value")):f.val(h.eq(h.length-1).attr("value")),f.change(),a.preventDefault()}else if(40==g){var l=f.find("option:selected"),m=h.index(l);m<h.length-1?f.val(h.eq(m+1).attr("value")):f.val(h.eq(0).attr("value")),f.change(),a.preventDefault()}}});var i=f.find("option:selected");b.find("span").html(i.text().length>0?i.text():d.emptytext),b.removeAttr("class"),d.useoptionclass&&i.attr("class")&&b.addClass(i.attr("class")||""),d.hoveropen?b.mouseover(h.open):b.click(h.toggle)},subcontainer:function(){var b=a("<div/>").appendTo(g),c=a("<input type='input'/>").appendTo(b);c.keyup(function(b){a.inArray(b.which,[13,38,40])<0&&(d.search?h.search(a(this).val()):(h.searchmove(a(this).val()),a(this).val("")))}).keydown(function(a){switch(a.which){case 13:val=g.find("ul li.active.option-hover").data("value"),disabled=g.find("ul li.active.option-hover").is(".option-disabled"),h.select(val,disabled);break;case 38:h.selectUp();break;case 40:h.selectDown();break;case 27:h.close();break;default:return!0}return a.preventDefault(),!1}).blur(function(){a(this).val("")}),d.search||c.addClass(d.csclass+"-hidden-input");var e=a("<div/>").appendTo(b),i=a("<ul/>").appendTo(e);f.find("option").each(function(b){var c=a(this).attr("value"),e=a(this).text(),f=a(this).is(":disabled");!(d.showblank||c.length>0)||!d.showdisabled&&f||a("<li/>",{"class":"active"+(0==b?" option-hover":"")+(a(this).is(":disabled")?" option-disabled":"")+(d.useoptionclass&&a(this).attr("class")?" "+a(this).attr("class"):""),"data-value":c,text:e.length>0?e:d.emptytext}).appendTo(i)});var j=i.find("li");i.find("li").click(function(){h.select(a(this).data("value"),a(this).is(".option-disabled"))}),g.find("div div").css({"overflow-y":j.length>d.numitems?"scroll":"visible"}),a("<li/>",{"class":"no-results",text:"No results"}).appendTo(i)},_onchange:function(){f.val(a(this).val()),h.select(a(this).val())}};f.is("select"+d.selector)&&!f.data("cs-options")&&b.init()},toggle:function(){g.is(d.selector+"-open")?h.close():h.open()},open:function(){e||(g.addClass(d.csclass+"-open"),g.find("input").focus(),g.find("ul li.no-results").hide(),h._selectMove(f.get(0).selectedIndex))},close:function(){g.removeClass(d.csclass+"-open"),g.find("input").val("").blur(),g.find("ul li").not(".no-results").addClass("active");var a=g.find("ul li").not(".no-results");g.find("div div").css({"overflow-y":a.length>d.numitems?"scroll":"visible"}),g.find("a").focus()},search:function(b){b=a.trim(b.toLowerCase());var c=g.find("ul li.no-results").hide(),e=g.find("ul li").not(".no-results");e.each(function(){var c=(a(this).text()+"").toLowerCase(),e=(a(this).data("value")+"").toLowerCase(),f=!1;d.searchblank||e.length>0?d.searchvalue&&e.indexOf(b)>=0?f=!0:c.indexOf(b)>=0&&(f=!0):0==b.length&&(f=!0),f?a(this).addClass("active"):a(this).removeClass("active")}),e=e.filter(".active").filter(":visible"),g.find("div div").css({"overflow-y":e.length>d.numitems?"scroll":"visible"}),e.length>0?h._selectMove(0):c.show()},searchmove:function(b){var c=[];f.find("option").each(function(d){0==a(this).text().toLowerCase().indexOf(b.toLowerCase())&&c.push(d)}),c.length>0&&h._selectMove(c[0])},select:function(a,b){if(!b){f.val()!=a&&f.val(a).change();var c=f.find("option:selected"),e=g.find("a");e.find("span").text(c.text().length>0?c.text():d.emptytext),e.removeAttr("class"),d.useoptionclass&&c.attr("class")&&e.addClass(c.attr("class")||""),h.close()}},selectUp:function(){var a=g.find("ul li.active").not(".no-results"),b=a.index(a.filter(".option-hover")),c=b-1;c=0>c?a.length-1:c,h._selectMove(c)},selectDown:function(){var a=g.find("ul li.active").not(".no-results"),b=a.index(a.filter(".option-hover")),c=b+1;c=c>a.length-1?0:c,h._selectMove(c)},destroy:function(){f.data("cs-options")&&(f.removeData("cs-options").insertAfter(g),g.remove())},_selectMove:function(a){var b=g.find("ul li.active");b.removeClass("option-hover").eq(a).addClass("option-hover");var c=g.find("div div");if("scroll"==c.css("overflow-y")){c.scrollTop(0);var d=b.eq(a);offset=d.offset().top+d.outerHeight()-c.offset().top-c.height(),offset>0&&c.scrollTop(offset)}}},i=b;i&&"object"==typeof i&&(i="init",c=null),d.selector="."+d.csclass,i=i?i:"init","function"==typeof h[i]&&h[i].call(this,c),"destroy"!=i&&f.data("cs-options",d)}),this}}(jQuery);
// multiselect section
(function($){
    var defaults = {
        columns: 1,     // how many columns should be use to show options
        search : false, // include option search box

        // search filter options
        searchOptions : {
            delay        : 250,                  // time (in ms) between keystrokes until search happens
            showOptGroups: false,                // show option group titles if no options remaining
            searchText   : true,                 // search within the text
            searchValue  : false,                // search within the value
            onSearch     : function( element ){} // fires on keyup before search on options happens
        },

        // plugin texts
        texts: {
            placeholder    : 'Select options', // text to use in dummy input
            search         : 'Search',         // search input placeholder text
            selectedOptions: ' selected',      // selected suffix text
            selectAll      : 'Select all',     // select all text
            unselectAll    : 'Unselect all',   // unselect all text
            noneSelected   : 'None Selected'   // None selected text
        },

        // general options
        selectAll          : false, // add select all option
        selectGroup        : false, // select entire optgroup
        minHeight          : 200,   // minimum height of option overlay
        maxHeight          : null,  // maximum height of option overlay
        maxWidth           : null,  // maximum width of option overlay (or selector)
        maxPlaceholderWidth: null,  // maximum width of placeholder button
        maxPlaceholderOpts : 3,    // maximum number of placeholder options to show until "# selected" shown instead
        showCheckbox       : true,  // display the checkbox to the user
        optionAttributes   : [],    // attributes to copy to the checkbox from the option element

        // Callbacks
        onLoad        : function( element ){},         // fires at end of list initialization
        onOptionClick : function( element, option ){}, // fires when an option is clicked
        onControlClose: function( element ){},         // fires when the options list is closed
        onSelectAll   : function( element ){},         // fires when (un)select all is clicked

        // @NOTE: these are for future development
        minSelect: false, // minimum number of items that can be selected
        maxSelect: false, // maximum number of items that can be selected
    };

    var msCounter = 1;

    // FOR LEGACY BROWSERS (talking to you IE8)
    if( typeof Array.prototype.map !== 'function' ) {
        Array.prototype.map = function( callback, thisArg ) {
            if( typeof thisArg === 'undefined' ) {
                thisArg = this;
            }

            return $.isArray( thisArg ) ? $.map( thisArg, callback ) : [];
        };
    }
    if( typeof String.prototype.trim !== 'function' ) {
        String.prototype.trim = function() {
            return this.replace(/^\s+|\s+$/g, '');
        };
    }

    function MultiSelect( element, options )
    {
        this.element           = element;
        this.options           = $.extend( true, {}, defaults, options );
        this.updateSelectAll   = true;
        this.updatePlaceholder = true;

        /* Make sure its a multiselect list */
        if( !$(this.element).attr('multiple') ) {
            throw new Error( '[jQuery-MultiSelect] Select list must be a multiselect list in order to use this plugin' );
        }

        /* Options validation checks */
        if( this.options.search ){
            if( !this.options.searchOptions.searchText && !this.options.searchOptions.searchValue ){
                throw new Error( '[jQuery-MultiSelect] Either searchText or searchValue should be true.' );
            }
        }

        /** BACKWARDS COMPATIBILITY **/
        if( 'placeholder' in this.options ) {
            this.options.texts.placeholder = this.options.placeholder;
            delete this.options.placeholder;
        }
        if( 'default' in this.options.searchOptions ) {
            this.options.texts.search = this.options.searchOptions['default'];
            delete this.options.searchOptions['default'];
        }
        /** END BACKWARDS COMPATIBILITY **/

        // load this instance
        this.load();
    }

    MultiSelect.prototype = {
        /* LOAD CUSTOM MULTISELECT DOM/ACTIONS */
        load: function() {
            var instance = this;

            // make sure this is a select list and not loaded
            if( (instance.element.nodeName != 'SELECT') || $(instance.element).hasClass('jqmsLoaded') ) {
                return true;
            }

            // sanity check so we don't double load on a select element
            $(instance.element).addClass('jqmsLoaded').data( 'plugin_multiselect-instance', instance );

            // add option container
            $(instance.element).after('<div class="ms-options-wrap"><button type="button"><span>None Selected</span></button><div class="ms-options"><ul></ul></div></div>');

            var placeholder = $(instance.element).next('.ms-options-wrap').find('> button:first-child');
            var optionsWrap = $(instance.element).next('.ms-options-wrap').find('> .ms-options');
            var optionsList = optionsWrap.find('> ul');

            // don't show checkbox (add class for css to hide checkboxes)
            if( !instance.options.showCheckbox ) {
                optionsWrap.addClass('hide-checkbox');
            }

            // check if list is disabled
            if( $(instance.element).prop( 'disabled' ) ) {
                placeholder.prop( 'disabled', true );
            }

            // set placeholder maxWidth
            if( instance.options.maxPlaceholderWidth ) {
                placeholder.css( 'maxWidth', instance.options.maxPlaceholderWidth );
            }

            // cacl default maxHeight
            var maxHeight = ($(window).height() - optionsWrap.offset().top + $(window).scrollTop() - 20);

            // override with user defined maxHeight
            if( instance.options.maxHeight ) {
                maxHeight = instance.options.maxHeight;
            }

            // maxHeight cannot be less than options.minHeight
            maxHeight = maxHeight < instance.options.minHeight ? instance.options.minHeight : maxHeight;

            optionsWrap.css({
                maxWidth : instance.options.maxWidth,
                minHeight: instance.options.minHeight,
                maxHeight: maxHeight,
            });

            // isolate options scroll
            // @source: https://github.com/nobleclem/jQuery-IsolatedScroll
            optionsWrap.bind( 'touchmove mousewheel DOMMouseScroll', function ( e ) {
                if( ($(this).outerHeight() < $(this)[0].scrollHeight) ) {
                    var e0 = e.originalEvent,
                        delta = e0.wheelDelta || -e0.detail;

                    if( ($(this).outerHeight() + $(this)[0].scrollTop) > $(this)[0].scrollHeight ) {
                        e.preventDefault();
                        this.scrollTop += ( delta < 0 ? 1 : -1 );
                    }
                }
            });

            // hide options menus if click happens off of the list placeholder button
            $(document).off('click.ms-hideopts').on('click.ms-hideopts', function( event ){
                if( !$(event.target).closest('.ms-options-wrap').length ) {
                    $('.ms-options-wrap.ms-active > .ms-options').each(function(){
                        $(this).closest('.ms-options-wrap').removeClass('ms-active');

                        var thisInst = $(this).parent().prev('.jqmsLoaded').data('plugin_multiselect-instance');

                        // USER CALLBACK
                        if( typeof thisInst.options.onControlClose == 'function' ) {
                            thisInst.options.onControlClose( thisInst.element );
                        }
                    });
                }
            // hide open option lists if escape key pressed
            }).bind('keydown', function( event ){
                if( (event.keyCode || event.which) == 27 ) { // esc key
                    $(this).trigger('click.ms-hideopts');
                }
            });

            // handle pressing enter|space while tabbing through
            placeholder.bind('keydown', function( event ){
                var code = (event.keyCode || event.which);
                if( (code == 13) || (code == 32) ) { // enter OR space
                    placeholder.trigger( 'mousedown' );
                }
            });

            // disable button action
            placeholder.bind('mousedown',function( event ){
                // ignore if its not a left click
                if( event.which && (event.which != 1) ) {
                    return true;
                }

                // hide other menus before showing this one
                $('.ms-options-wrap.ms-active > .ms-options').each(function(){
                    if( $(this).parent().prev()[0] != optionsWrap.parent().prev()[0] ) {
                        $(this).closest('.ms-options-wrap').removeClass('ms-active');

                        var thisInst = $(this).parent().prev('.jqmsLoaded').data('plugin_multiselect-instance');

                        // USER CALLBACK
                        if( typeof thisInst.options.onControlClose == 'function' ) {
                            thisInst.options.onControlClose( thisInst.element );
                        }
                    }
                });

                // show/hide options
                optionsWrap.closest('.ms-options-wrap').toggleClass('ms-active');

                // recalculate height
                if( optionsWrap.closest('.ms-options-wrap').hasClass('ms-active') ) {
                    optionsWrap.css( 'maxHeight', '' );

                    // cacl default maxHeight
                    var maxHeight = ($(window).height() - optionsWrap.offset().top + $(window).scrollTop() - 20);

                    // override with user defined maxHeight
                    if( instance.options.maxHeight ) {
                        maxHeight = instance.options.maxHeight;
                    }

                    // maxHeight cannot be less than options.minHeight
                    maxHeight = maxHeight < instance.options.minHeight ? instance.options.minHeight : maxHeight;

                    optionsWrap.css( 'maxHeight', maxHeight );
                }
                else if( typeof instance.options.onControlClose == 'function' ) {
                    instance.options.onControlClose( instance.element );
                }
            }).click(function( event ){ event.preventDefault(); });

            // add placeholder copy
            if( instance.options.texts.placeholder ) {
                placeholder.find('span').text( instance.options.texts.placeholder );
            }

            // add search box
            if( instance.options.search ) {
                optionsList.before('<div class="ms-search"><input type="text" value="" placeholder="'+ instance.options.texts.search +'" /></div>');

                var search = optionsWrap.find('.ms-search input');
                search.on('keyup', function(){
                    // ignore keystrokes that don't make a difference
                    if( $(this).data('lastsearch') == $(this).val() ) {
                        return true;
                    }

                    // pause timeout
                    if( $(this).data('searchTimeout') ) {
                        clearTimeout( $(this).data('searchTimeout') );
                    }

                    var thisSearchElem = $(this);

                    $(this).data('searchTimeout', setTimeout(function(){
                        thisSearchElem.data('lastsearch', thisSearchElem.val() );

                        // USER CALLBACK
                        if( typeof instance.options.searchOptions.onSearch == 'function' ) {
                            instance.options.searchOptions.onSearch( instance.element );
                        }

                        // search non optgroup li's
                        var searchString = $.trim( search.val().toLowerCase() );
                        if( searchString ) {
                            optionsList.find('li[data-search-term*="'+ searchString +'"]:not(.optgroup)').removeClass('ms-hidden');
                            optionsList.find('li:not([data-search-term*="'+ searchString +'"], .optgroup)').addClass('ms-hidden');
                        }
                        else {
                            optionsList.find('.ms-hidden').removeClass('ms-hidden');
                        }

                        // show/hide optgroups based on if there are items visible within
                        if( !instance.options.searchOptions.showOptGroups ) {
                            optionsList.find('.optgroup').each(function(){
                                if( $(this).find('li:not(.ms-hidden)').length ) {
                                    $(this).show();
                                }
                                else {
                                    $(this).hide();
                                }
                            });
                        }

                        instance._updateSelectAllText();
                    }, instance.options.searchOptions.delay ));
                });
            }

            // add global select all options
            if( instance.options.selectAll ) {
                optionsList.before('<a href="#" class="ms-selectall global">' + instance.options.texts.selectAll + '</a>');
            }

            // handle select all option
            optionsWrap.on('click', '.ms-selectall', function( event ){
                event.preventDefault();

                instance.updateSelectAll   = false;
                instance.updatePlaceholder = false;

                var select = optionsWrap.parent().prev();

                if( $(this).hasClass('global') ) {
                    // check if any options are not selected if so then select them
                    if( optionsList.find('li:not(.optgroup, .selected, .ms-hidden)').length ) {
                        // get unselected vals, mark as selected, return val list
                        optionsList.find('li:not(.optgroup, .selected, .ms-hidden)').addClass('selected');
                        optionsList.find('li.selected input[type="checkbox"]:not(:disabled)').prop( 'checked', true );
                    }
                    // deselect everything
                    else {
                        optionsList.find('li:not(.optgroup, .ms-hidden).selected').removeClass('selected');
                        optionsList.find('li:not(.optgroup, .ms-hidden, .selected) input[type="checkbox"]:not(:disabled)').prop( 'checked', false );
                    }
                }
                else if( $(this).closest('li').hasClass('optgroup') ) {
                    var optgroup = $(this).closest('li.optgroup');

                    // check if any selected if so then select them
                    if( optgroup.find('li:not(.selected, .ms-hidden)').length ) {
                        optgroup.find('li:not(.selected, .ms-hidden)').addClass('selected');
                        optgroup.find('li.selected input[type="checkbox"]:not(:disabled)').prop( 'checked', true );
                    }
                    // deselect everything
                    else {
                        optgroup.find('li:not(.ms-hidden).selected').removeClass('selected');
                        optgroup.find('li:not(.ms-hidden, .selected) input[type="checkbox"]:not(:disabled)').prop( 'checked', false );
                    }
                }

                var vals = [];
                optionsList.find('li.selected input[type="checkbox"]').each(function(){
                    vals.push( $(this).val() );
                });
                select.val( vals ).trigger('change');

                instance.updateSelectAll   = true;
                instance.updatePlaceholder = true;

                // USER CALLBACK
                if( typeof instance.options.onSelectAll == 'function' ) {
                    instance.options.onSelectAll( instance.element );
                }

                instance._updateSelectAllText();
                instance._updatePlaceholderText();
            });

            // add options to wrapper
            var options = [];
            $(instance.element).children().each(function(){
                if( this.nodeName == 'OPTGROUP' ) {
                    var groupOptions = [];

                    $(this).children('option').each(function(){
                        var thisOptionAtts = {};
                        for( var i = 0; i < instance.options.optionAttributes.length; i++ ) {
                            var thisOptAttr = instance.options.optionAttributes[ i ];

                            if( $(this).attr( thisOptAttr ) !== undefined ) {
                                thisOptionAtts[ thisOptAttr ] = $(this).attr( thisOptAttr );
                            }
                        }

                        groupOptions.push({
                            name   : $(this).text(),
                            value  : $(this).val(),
                            checked: $(this).prop( 'selected' ),
                            attributes: thisOptionAtts
                        });
                    });

                    options.push({
                        label  : $(this).attr('label'),
                        options: groupOptions
                    });
                }
                else if( this.nodeName == 'OPTION' ) {
                    var thisOptionAtts = {};
                    for( var i = 0; i < instance.options.optionAttributes.length; i++ ) {
                        var thisOptAttr = instance.options.optionAttributes[ i ];

                        if( $(this).attr( thisOptAttr ) !== undefined ) {
                            thisOptionAtts[ thisOptAttr ] = $(this).attr( thisOptAttr );
                        }
                    }

                    options.push({
                        name      : $(this).text(),
                        value     : $(this).val(),
                        checked   : $(this).prop( 'selected' ),
                        attributes: thisOptionAtts
                    });
                }
                else {
                    // bad option
                    return true;
                }
            });
            instance.loadOptions( options, true, false );

            // update un/select all logic
            instance._updateSelectAllText( false );

            // BIND SELECT ACTION
            optionsWrap.on( 'click', 'input[type="checkbox"]', function(){
                $(this).closest( 'li' ).toggleClass( 'selected' );

                var select = optionsWrap.parent().prev();

                // toggle clicked option
                select.find('option[value="'+ $(this).val() +'"]').prop(
                    'selected', $(this).is(':checked')
                ).closest('select').trigger('change');

                // USER CALLBACK
                if( typeof instance.options.onOptionClick == 'function' ) {
                    instance.options.onOptionClick(instance.element, this);
                }

                instance._updateSelectAllText();
                instance._updatePlaceholderText();
            });

            // BIND FOCUS EVENT
            optionsWrap.on('focusin', 'input[type="checkbox"]', function(){
                $(this).closest('label').addClass('focused');
            }).on('focusout', 'input[type="checkbox"]', function(){
                $(this).closest('label').removeClass('focused');
            });

            // USER CALLBACK
            if( typeof instance.options.onLoad === 'function' ) {
                instance.options.onLoad( instance.element );
            }

            // hide native select list
            $(instance.element).hide();
        },

        /* LOAD SELECT OPTIONS */
        loadOptions: function( options, overwrite, updateSelect ) {
            overwrite    = (typeof overwrite == 'boolean') ? overwrite : true;
            updateSelect = (typeof updateSelect == 'boolean') ? updateSelect : true;

            var instance    = this;
            var optionsList = $(instance.element).next('.ms-options-wrap').find('> .ms-options > ul');
            var optionsWrap = $(instance.element).next('.ms-options-wrap').find('> .ms-options');
            var select      = optionsWrap.parent().prev();

            if( overwrite ) {
                optionsList.find('> li').remove();

                if( updateSelect ) {
                    select.find('> *').remove();
                }
            }

            for( var key in options ) {
                // Prevent prototype methods injected into options from being iterated over.
                if( !options.hasOwnProperty( key ) ) {
                    continue;
                }

                var thisOption      = options[ key ];
                var container       = $('<li/>');
                var appendContainer = true;

                // OPTGROUP
                if( thisOption.hasOwnProperty('options') ) {
                    var optGroup = $('<optgroup label="'+ thisOption.label +'"></optgroup>');

                    optionsList.find('> li.optgroup > span.label').each(function(){
                        if( $(this).text() == thisOption.label ) {
                            container       = $(this).closest('.optgroup');
                            appendContainer = false;
                        }
                    });

                    // prepare to append optgroup to select element
                    if( updateSelect ) {
                        if( select.find('optgroup[label="'+ thisOption.label +'"]').length ) {
                            optGroup = select.find('optgroup[label="'+ thisOption.label +'"]');
                        }
                        else {
                            select.append( optGroup );
                        }
                    }

                    // setup container
                    if( appendContainer ) {
                        container.addClass('optgroup');
                        container.append('<span class="label">'+ thisOption.label +'</span>');
                        container.find('> .label').css({
                            clear: 'both'
                        });

                        // add select all link
                        if( instance.options.selectGroup ) {
                            container.append('<a href="#" class="ms-selectall">' + instance.options.texts.selectAll + '</a>');
                        }

                        container.append('<ul/>');
                    }

                    for( var gKey in thisOption.options ) {
                        // Prevent prototype methods injected into options from
                        // being iterated over.
                        if( !thisOption.options.hasOwnProperty( gKey ) ) {
                            continue;
                        }

                        var thisGOption = thisOption.options[ gKey ];
                        var gContainer  = $('<li/>').addClass('ms-reflow');

                        // no clue what this is we hit (skip)
                        if( !thisGOption.hasOwnProperty('value') ) {
                            continue;
                        }

                        instance._addOption( gContainer, thisGOption );

                        container.find('> ul').append( gContainer );

                        // add option to optgroup in select element
                        if( updateSelect ) {
                            var selOption = $('<option value="'+ thisGOption.value +'">'+ thisGOption.name +'</option>');

                            // add custom user attributes
                            if( thisGOption.hasOwnProperty('attributes') && Object.keys( thisGOption.attributes ).length ) {
                                selOption.attr( thisGOption.attributes );
                            }

                            // mark option as selected
                            if( thisGOption.checked ) {
                                selOption.prop( 'selected', true );
                            }

                            optGroup.append( selOption );
                        }
                    }
                }
                // OPTION
                else if( thisOption.hasOwnProperty('value') ) {
                    container.addClass('ms-reflow');

                    // add option to ms dropdown
                    instance._addOption( container, thisOption );

                    if( updateSelect ) {
                        var selOption = $('<option value="'+ thisOption.value +'">'+ thisOption.name +'</option>');

                        // add custom user attributes
                        if( thisOption.hasOwnProperty('attributes') && Object.keys( thisOption.attributes ).length ) {
                            selOption.attr( thisOption.attributes );
                        }

                        // mark option as selected
                        if( thisOption.checked ) {
                            selOption.prop( 'selected', true );
                        }

                        select.append( selOption );
                    }
                }
                else {
                    // no clue what this is we hit (skip)
                    continue;
                }

                if( appendContainer ) {
                    optionsList.append( container );
                }
            }

            // pad out label for room for the checkbox
            var chkbx = optionsList.find('.ms-reflow input[type="checkbox"]').eq(0);
            if( chkbx.length && chkbx.css('display').match(/block$/) ) {
                var checkboxWidth = chkbx.outerWidth();
                    checkboxWidth = checkboxWidth ? checkboxWidth : 15;

                optionsList.find('.ms-reflow label').css(
                    'padding-left',
                    (parseInt( chkbx.closest('label').css('padding-left') ) * 2) + checkboxWidth
                );

                optionsList.find('.ms-reflow').removeClass('ms-reflow');
            }

            // update placeholder text
            instance._updatePlaceholderText();

            // RESET COLUMN STYLES
            optionsWrap.find('ul').css({
                'column-count'        : '',
                'column-gap'          : '',
                '-webkit-column-count': '',
                '-webkit-column-gap'  : '',
                '-moz-column-count'   : '',
                '-moz-column-gap'     : ''
            });

            // COLUMNIZE
            if( select.find('optgroup').length ) {
                // float non grouped options
                optionsList.find('> li:not(.optgroup)').css({
                    'float': 'left',
                    width: (100 / instance.options.columns) +'%'
                });

                // add CSS3 column styles
                optionsList.find('li.optgroup').css({
                    clear: 'both'
                }).find('> ul').css({
                    'column-count'        : instance.options.columns,
                    'column-gap'          : 0,
                    '-webkit-column-count': instance.options.columns,
                    '-webkit-column-gap'  : 0,
                    '-moz-column-count'   : instance.options.columns,
                    '-moz-column-gap'     : 0
                });

                // for crappy IE versions float grouped options
                if( this._ieVersion() && (this._ieVersion() < 10) ) {
                    optionsList.find('li.optgroup > ul > li').css({
                        'float': 'left',
                        width: (100 / instance.options.columns) +'%'
                    });
                }
            }
            else {
                // add CSS3 column styles
                optionsList.css({
                    'column-count'        : instance.options.columns,
                    'column-gap'          : 0,
                    '-webkit-column-count': instance.options.columns,
                    '-webkit-column-gap'  : 0,
                    '-moz-column-count'   : instance.options.columns,
                    '-moz-column-gap'     : 0
                });

                // for crappy IE versions float grouped options
                if( this._ieVersion() && (this._ieVersion() < 10) ) {
                    optionsList.find('> li').css({
                        'float': 'left',
                        width: (100 / instance.options.columns) +'%'
                    });
                }
            }
        },

        /* UPDATE MULTISELECT CONFIG OPTIONS */
        settings: function( options ) {
            this.options = $.extend( true, {}, this.options, options );
            this.reload();
        },

        /* RESET THE DOM */
        unload: function() {
            $(this.element).next('.ms-options-wrap').remove();
            $(this.element).show(function(){
                $(this).css('display','').removeClass('jqmsLoaded');
            });
        },

        /* RELOAD JQ MULTISELECT LIST */
        reload: function() {
            // remove existing options
            $(this.element).next('.ms-options-wrap').remove();
            $(this.element).removeClass('jqmsLoaded');

            // load element
            this.load();
        },

        // RESET BACK TO DEFAULT VALUES & RELOAD
        reset: function() {
            var defaultVals = [];
            $(this.element).find('option').each(function(){
                if( $(this).prop('defaultSelected') ) {
                    defaultVals.push( $(this).val() );
                }
            });

            $(this.element).val( defaultVals );

            this.reload();
        },

        disable: function( status ) {
            status = (typeof status === 'boolean') ? status : true;
            $(this.element).prop( 'disabled', status );
            $(this.element).next('.ms-options-wrap').find('button:first-child')
                .prop( 'disabled', status );
        },

        /** PRIVATE FUNCTIONS **/
        // update the un/select all texts based on selected options and visibility
        _updateSelectAllText: function( visibleOnly ){
            if( !this.updateSelectAll ) {
                return;
            }

            if( typeof visibleOnly !== 'boolean' ) {
                visibleOnly = true;
            }

            var instance = this;

            // select all not used at all so just do nothing
            if( !instance.options.selectAll && !instance.options.selectGroup ) {
                return;
            }

            var optionsWrap = $(instance.element).next('.ms-options-wrap').find('> .ms-options');

            // update un/select all text
            optionsWrap.find('.ms-selectall').each(function(){
                var unselected = $(this).parent().find('li:not(.optgroup,.selected,.ms-hidden)');

                $(this).text(
                    unselected.length ? instance.options.texts.selectAll : instance.options.texts.unselectAll
                );
            });
        },

        // update selected placeholder text
        _updatePlaceholderText: function(){
            if( !this.updatePlaceholder ) {
                return;
            }

            var instance       = this;
            var placeholder    = $(instance.element).next('.ms-options-wrap').find('> button:first-child');
            var placeholderTxt = placeholder.find('span');
            var optionsWrap    = $(instance.element).next('.ms-options-wrap').find('> .ms-options');
            var select         = optionsWrap.parent().prev();
            var selectVals     = select.val() ? select.val() : [];

            // if there are disabled options get those values as well
            if( select.find('option:selected:disabled').length ) {
                selectVals = [];
                select.find('option:selected').each(function(){
                    selectVals.push( $(this).val() );
                });
            }

            // get selected options
            var selOpts = [];
            for( var key in selectVals ) {
                selOpts.push(
                    $.trim( select.find('option[value="'+ selectVals[ key ] +'"]').text() )
                );

                if( selOpts.length >= instance.options.maxPlaceholderOpts ) {
                    break;
                }
            }

            // UPDATE PLACEHOLDER TEXT WITH OPTIONS SELECTED
            placeholderTxt.text( selOpts.join( ', ' ) );

            if( selOpts.length ) {
                optionsWrap.closest('.ms-options-wrap').addClass('ms-has-selections');
            }
            else {
                optionsWrap.closest('.ms-options-wrap').removeClass('ms-has-selections');
            }

            // if copy is larger than button width use "# selected"
            if( (placeholderTxt.width() > placeholder.width()) || (selOpts.length != selectVals.length) ) {
                placeholderTxt.text( select.val().length + instance.options.texts.selectedOptions );
            }
            // replace placeholder text
            else if( !selOpts.length ) {
                placeholderTxt.text( instance.options.texts.placeholder );
            }
        },

        // Add option to the custom dom list
        _addOption: function( container, option ) {
            var instance = this;
            var thisOption = $('<label/>', {
                for : 'ms-opt-'+ msCounter,
                text: option.name
            });

            var thisCheckbox = $('<input>', {
                type : 'checkbox',
                title: option.name,
                id   : 'ms-opt-'+ msCounter,
                value: option.value
            });

            // add user defined attributes
            if( option.hasOwnProperty('attributes') && Object.keys( option.attributes ).length ) {
                thisCheckbox.attr( option.attributes );
            }

            if( option.checked ) {
                container.addClass('default selected');
                thisCheckbox.prop( 'checked', true );
            }

            thisOption.prepend( thisCheckbox );

            var searchTerm = '';
            if( instance.options.searchOptions.searchText ) {
                searchTerm += ' ' + option.name.toLowerCase();
            }
            if( instance.options.searchOptions.searchValue ) {
                searchTerm += ' ' + option.value.toLowerCase();
            }

            container.attr( 'data-search-term', $.trim( searchTerm ) ).prepend( thisOption );

            msCounter = msCounter + 1;
        },

        // check ie version
        _ieVersion: function() {
            var myNav = navigator.userAgent.toLowerCase();
            return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
        }
    };

    // ENABLE JQUERY PLUGIN FUNCTION
    $.fn.multiselect = function( options ){
        var args = arguments;
        var ret;

        // menuize each list
        if( (options === undefined) || (typeof options === 'object') ) {
            return this.each(function(){
                if( !$.data( this, 'plugin_multiselect' ) ) {
                    $.data( this, 'plugin_multiselect', new MultiSelect( this, options ) );
                }
            });
        } else if( (typeof options === 'string') && (options[0] !== '_') && (options !== 'init') ) {
            this.each(function(){
                var instance = $.data( this, 'plugin_multiselect' );

                if( instance instanceof MultiSelect && typeof instance[ options ] === 'function' ) {
                    ret = instance[ options ].apply( instance, Array.prototype.slice.call( args, 1 ) );
                }

                // special destruct handler
                if( options === 'unload' ) {
                    $.data( this, 'plugin_multiselect', null );
                }
            });

            return ret;
        }
    };
}(jQuery));

