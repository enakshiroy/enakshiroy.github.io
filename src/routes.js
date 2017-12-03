module.exports = [
    // default route.
    {
        url: '/',
        templateUrl: 'views/home.html',
        controller: 'HomeController'
    },
    {
        url: '/work',
        templateUrl: 'views/work.html',
        controller: 'WorkController'
    }
];