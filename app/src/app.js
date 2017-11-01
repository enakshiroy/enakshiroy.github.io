const jQuery = require('jquery');
window.$ = window.jQuery = jQuery;
require('bootstrap');
jQuery.noConflict(true);

const angular = require('angular');
const app = angular.module('enakshi', [
    require('angular-route')
]);

// ugly hack to get jqiuery selector in directive.
// TODO: Use broserify-shim
app.constant('jQuery', jQuery);
app.constant('Routes', require('./routes'));

// config module with routes.
(() => {
    function config($routeProvider, $locationProvider, Routes) {
        // TODO: Remove this ugly hack and load tempalte gracefully.
        const base = '../';
        Routes.forEach(({
            url,
            templateUrl,
            controller
        }) => {
            templateUrl = `${base}${templateUrl}`;
            $routeProvider.when(url, {
                templateUrl,
                controller
            });
        });
        // redirect to default router i.e. Home Page.
        $routeProvider.otherwise({
            redirectTo: '/'
        });
        $locationProvider.hashPrefix('');
        // configure html5 to get links working on jsfiddle
        // $locationProvider.html5Mode({
        //     enabled: false
        // });
    }
    app.config([
        '$routeProvider',
        '$locationProvider',
        'Routes',
        config
    ]);
})();

// add factories
(() => {
    const controllers = require('./factories');
    controllers.forEach(({
        name,
        factory
    }) => app.factory(name, factory));
})();

// add filters 
(() => {
    const filters = require('./filters');
    filters.forEach(({
        name,
        filter
    }) => app.filter(name, filter));
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

// run 
(() => {
    function run($rootScope, $location) {
        $rootScope.isActive = viewLocation => viewLocation === $location.path();
    }
    app.run(['$rootScope', '$location', run])
})();


// on load.
// (() => {
//     window.onload = () => {
//         const modal = jQuery('#projectModal');
//         const toggleBlur = () => {
//             const containers = jQuery('body > section');
//             containers.each((index, value) => {
//                 jQuery(value).toggleClass('blur');
//             });
//         };
//         // toggle blur on sho an hide.
//         modal.on('hidden.bs.modal', toggleBlur);
//         modal.on('shown.bs.modal', toggleBlur);
//     };
// })();