function HomeController($scope, ProjectFactory, jQuery) {
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

  $scope.memes = [
    {
      src: `https://www.phenompeople.com/sites/default/files/blog/2016/12/Blog-Post-Meme-5.jpg`
    },
    {
      src: `https://s-media-cache-ak0.pinimg.com/originals/ac/b4/63/acb463cb6c220575691c034a85c818d2.jpg`
    },
    {
      src: `http://www.tidy-mind.com/wp-content/uploads/2013/06/2013-06-25_142513-624x459.png`
    },
    {
      src: `https://cdn.zeplin.io/5971dcc52c32725133f3ae6b/assets/C93A7A0B-9ACB-4EA8-A61F-1C412926601C.png`
    }
  ];
  $scope.activeMeme = 0;

  $scope.selectedProject = null;

  $scope.select = project => {
    $scope.selectedProject = project;
  };

  $scope.isVisible = false;
  $scope.onShown = () => {
    console.log("Modal is shown");
  };
  $scope.onHide = () => {
    console.log("modal is hidden");
  };

  // All set. Let's invoke onLoad.
  onLoad();
}
module.exports = {
  name: "HomeController",
  controller: ["$scope", "ProjectFactory", "jQuery", HomeController]
};
