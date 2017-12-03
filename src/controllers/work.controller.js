function WorkController($scope, AssetFactory, ErEvents) {
  /**
   * On load for controller. We'll do our basic setup in it.
   */
  const onLoad = () => {
    AssetFactory.getProjects()
      .then(response => {
        $scope.projects = response.data;
      })
      .catch(error => {
        console.log('Something went terribly wrong!!');
        console.error(error);
      });
  };

  /**
   * All the projects.
   */
  $scope.projects = [];

  $scope.selectedProject = null;

  $scope.select = project => {
    $scope.selectedProject = project;
    $scope.isVisible = true;
  };

  $scope.next = () => {
    if ($scope.isLast($scope.selectedProject)) {
      return;
    }
    const index = $scope.projects.indexOf($scope.selectedProject);
    $scope.selectedProject = $scope.projects[index + 1];
    $scope.$broadcast(ErEvents.SCROLL_TO_TOP);
  };

  $scope.prev = () => {
    if ($scope.isFirst($scope.selectedProject)) {
      return;
    }
    const index = $scope.projects.indexOf($scope.selectedProject);
    $scope.selectedProject = $scope.projects[index - 1];
    $scope.$broadcast(ErEvents.SCROLL_TO_TOP);
  };

  $scope.isLast = project =>
    $scope.projects.indexOf(project) === $scope.projects.length - 1;
  $scope.isFirst = project => $scope.projects.indexOf(project) === 0;

  // All set let's invoke onLoad
  onLoad();
}

module.exports = {
  name: 'WorkController',
  controller: ['$scope', 'AssetFactory', 'ErEvents', WorkController]
};
