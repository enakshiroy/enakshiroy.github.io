function HomeController($scope) {

    $scope.isExpanded = false;
    $scope.expand = () => {
        $scope.isExpanded = true;
    };
}
module.exports = {
    name: 'HomeController',
    controller: [
        '$scope',
        HomeController
    ]
};