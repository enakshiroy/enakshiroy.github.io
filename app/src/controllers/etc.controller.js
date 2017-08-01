function EtcController($scope) {
    $scope.greetings = `Hola! Etc Page`;
}
module.exports = {
    name: 'EtcController',
    controller: [
        '$scope',
        EtcController
    ]
};