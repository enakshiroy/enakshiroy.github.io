function HomeController($scope, ProjectFactory) {

    $scope.isExpanded = false;

    $scope.expand = () => {
        $scope.isExpanded = true;
    };

    /**
     * All the projects.
     */
    $scope.projects = [];

    /**
     * On load for controller. We'll do our basic setup in it.
     */
    const onLoad = () => {
        ProjectFactory.getProjects()
            .then((response) => {
                $scope.projects = response.data;
            }, (error) => {
                console.log('Something went terribly wrong!!');
                console.error(error);
            });
    };

    // All set. Let's invoke onLoad.
    onLoad();
}
module.exports = {
    name: 'HomeController',
    controller: [
        '$scope',
        'ProjectFactory',
        HomeController
    ]
};