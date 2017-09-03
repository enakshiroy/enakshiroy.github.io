function HomeController($scope, ProjectFactory) {

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

    /**
     * Tells whether a project is at a particular index or not.
     * @param {*} project 
     * @param {*} index 
     */
    const isAt = (project, index) => $scope.projects.indexOf(project) === index;

    $scope.isExpanded = false;

    /**
     * All the projects.
     */
    $scope.projects = [];

    $scope.expand = () => {
        $scope.isExpanded = true;
    };

    $scope.selectedProject = null;

    $scope.select = (project) => {
        $scope.selectedProject = project;
    };

    $scope.isLast = (project = $scope.selectedProject) => {
        return isAt($scope.selectedProject, $scope.projects.length - 1);
    };

    $scope.isFirst = (project = $scope.selectedProject) => {
        return isAt($scope.selectedProject, 0);
    };

    $scope.next = (project = $scope.selectedProject) => {
        const index = $scope.projects.indexOf(project);
        return $scope.projects[index + 1] || null;
    };
    $scope.prev = (project = $scope.selectedProject) => {
        const index = $scope.projects.indexOf(project);
        return $scope.projects[index - 1] || null;
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