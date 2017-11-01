function WorkController($scope) {
    $scope.greetings = 'Work Controller.';
}

module.exports = {
    name: 'WorkController',
    controller: [
        '$scope',
        WorkController
    ]
};