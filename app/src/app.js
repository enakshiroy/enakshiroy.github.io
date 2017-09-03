const jQuery = require('jquery');
window.$ = window.jQuery = jQuery;
require('bootstrap');
jQuery.noConflict(true);

const angular = require('angular');
const app = angular.module('enakshi', []);

// ugly hack to get jqiuery selector in directive.
// TODO: Use broserify-shim.
app.constant('jQuery', jQuery);

// add factories
(() => {
    const controllers = require('./factories');
    controllers.forEach(({
        name,
        factory
    }) => app.factory(name, factory));
})();

// add directives
(() => {
    const directives = require('./directives');
    directives.forEach(({
        name,
        directive
    }) => {
        app.directive(name, directive);
    });
})();

// add controllers
(() => {
    const controllers = require('./controllers');
    controllers.forEach(({
        name,
        controller
    }) => app.controller(name, controller));
})();


// on load.
(() => {
    window.onload = () => {
        const modal = jQuery('#projectModal');
        const toggleBlur = () => {
            const containers = jQuery('.container');
            containers.each((index, value) => {
                jQuery(value).toggleClass('blur');
            });
        };
        // toggle blur on sho an hide.
        modal.on('hidden.bs.modal', toggleBlur);
        modal.on('shown.bs.modal', toggleBlur);
    };
})();