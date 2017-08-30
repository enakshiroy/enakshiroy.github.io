const angular = require('angular');
const app = angular.module('enakshi', []);

// add factories
(() => {
    const controllers = require('./factories');
    controllers.forEach(({
        name,
        factory
    }) => app.factory(name, factory));
})();

// add controllers
(() => {
    const controllers = require('./controllers');
    controllers.forEach(({
        name,
        controller
    }) => app.controller(name, controller));
})();