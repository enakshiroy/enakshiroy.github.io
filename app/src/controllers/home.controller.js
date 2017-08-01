function HomeController($scope) {
    $scope.greetings = `Hola! Home Page`;
}
module.exports = {
    name: 'HomeController',
    controller: [
        '$scope',
        HomeController
    ]
};