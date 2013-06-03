(function (w, doc, $) {

    'use strict';

    (function () {
        $.get('html-head.html', function (resp) {
            $('head').prepend(resp);
        });
    }());

    function _get_element() {
        var args = Array.prototype.slice.call(arguments),
            name = args.shift();

        if (args[0]) { name += '-' + args[0]; }

        $.get(name + '.html', function (resp) {
            $('#' + name).replaceWith(resp);
        });
        return true;
    }

    function get_header() {
        return _get_element('header', arguments[0]);
    }

    function get_sidebar() {
        return _get_element('sidebar', arguments[0]);
    }

    function get_footer() {
        return _get_element('footer', arguments[0]);
    }

    w.helpers = {
        get_sidebar: get_sidebar,
        get_header: get_header,
        get_footer: get_footer
    };

}(this, this.document, this.jQuery));