const angular = require('angular');
const app = angular.module('enakshi', []);

// add controllers
(() => {
    const controllers = require('./controllers');
    controllers.forEach(({
        name,
        controller
    }) => app.controller(name, controller));
})();