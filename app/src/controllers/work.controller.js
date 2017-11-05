function WorkController($scope, ProjectFactory) {
  /**
   * On load for controller. We'll do our basic setup in it.
   */
  const onLoad = () => {
    ProjectFactory.getProjects()
      .then(response => {
        $scope.projects = response.data;
      })
      .catch(error => {
        console.log("Something went terribly wrong!!");
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

  // All set let's invoke onLoad
  onLoad();
}

module.exports = {
  name: "WorkController",
  controller: ["$scope", "ProjectFactory", WorkController]
};
