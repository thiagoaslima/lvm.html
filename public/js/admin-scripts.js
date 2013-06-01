// admin-scripts.js

(function (w, doc, $, undefined) {
    'use strict';

    var repeatable = function ($el) {
            var el = $el.eq(0).clone(),
                dom = $el.last(),
                group = el.find('.group'),
                number = ~~group.attr('data-number');

            el.find('[data-default]').each(function () {
                var data = $(this).attr('data-default'),
                    attr = data.split(':')[0],
                    value = (data.split(':')[1] === 'null') ? '' : data.split(':')[1];

                switch(attr) {
                    case 'option' :
                        $(this).find("option:selected").prop("selected", false).end().
                                find("option[value=" + value + "]").prop("selected", true);
                        break;

                    case 'value' :
                        $(this).attr('value', value);
                        break;
                }
            });

            dom.after(el);
            renumber($el.parent());
        },

        renumber = function ($el) {
            var groups = $el.find('.group'),
                len = groups.length,
                meta = groups.eq(0).attr('data-meta'),
                keys = groups.eq(0).attr('data-keys').split(','),
                group, i;

            $(keys).each(function (idx) {
                var names = groups.find('[name^=' + meta + '-' + $.trim(keys[idx]) + '-]');
                names.each(function (i) {
                    $(this).attr('name', meta + '-' + $.trim(keys[idx]) + '-' + i);
                });
                groups.find('[id^=' + meta + '-' + $.trim(keys[idx]) + '-]').each(function (i) {
                    $(this).attr('id', meta + '-' + $.trim(keys[idx]) + '-' + i);
                });
                groups.find('[for^=' + meta + '-' + $.trim(keys[idx]) + '-]').each(function (i) {
                    $(this).attr('for', meta + '-' + $.trim(keys[idx]) + '-' + i);
                });
            });

            groups.each(function (index) {
                $(this).attr('data-number', index);
            });
        };

    /* expose functions and variables */
    w.lvm_helpers = {
        repeatable: repeatable
    };

}(this, this.document, this.jQuery));