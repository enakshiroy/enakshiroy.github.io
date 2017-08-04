const angular = require('angular');
const app = angular.module('enakshi', [
    require('angular-route')
]);
app.constant('Routes', require('./routes'));

// config module with routes.
(() => {
    function config($routeProvider, Routes) {
        // TODO: Remove this ugly hack and loda tempalte gracefully.
        const base = 'dist/';
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
    }
    app.config([
        '$routeProvider',
        'Routes',
        config
    ]);
})();

// run function after configuraing application.
// We'll mainly defined some global function which we'll be using.
(() => {
    function run($rootScope, $location) {

        /**
         * Opens the link in new tab.
         * @param {string} path/link to be opened..
         */
        function open(link) {

        }

        /**
         * Tells whether supplied path is active or not.
         */
        $rootScope.isActive = (path) => {
            return path === $location.path();
        };

        /**
         * Opens the resumes in new tab.
         */
        $rootScope.showResume = () => {
            const path = 'path to file';
            open(path);
        };
    };
    app.run(['$rootScope', '$location', run]);
})();

// add controllers
(() => {
    const controllers = require('./controllers');
    controllers.forEach(({
        name,
        controller
    }) => app.controller(name, controller));
})();