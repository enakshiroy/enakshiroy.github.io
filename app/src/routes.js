module.exports = [
    // default route.
    {
        url: '/',
        templateUrl: '../views/home.html',
        controller: 'HomeController'
    },
    {
        url: '/etc',
        templateUrl: '../views/etc.html',
        controller: 'EtcController'
    }
];