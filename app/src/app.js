const angular = require('angular');
const app = angular.module('enakshi', [
    require('angular-route')
]);
app.constant('Routes', require('./routes'));

// config module with routes.
(() => {
    function config($routeProvider, $locationProvider, Routes) {
        // TODO: Remove this ugly hack and loda tempalte gracefully.
        const base = '../src/';
        Routes.forEach(({ url, templateUrl, controller }) => {
            templateUrl = `${base}${templateUrl}`;
            $routeProvider.when(url, {
                templateUrl, controller
            });
        });
        // redirect to default router i.e. Home Page.
        $routeProvider.otherwise({ redirectTo: '/' });
        // configure html5 to get links working on jsfiddle
        $locationProvider.html5Mode(true);
    }
    app.config([
        '$routeProvider',
        '$locationProvider',
        'Routes',
        config
    ]);
})();

// add controllers
(() => {
    const controllers = require('./controllers');
    controllers.forEach(({ name, controller }) => app.controller(name, controller));
})();
