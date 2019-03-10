function HomeController($scope, AssetFactory, jQuery) {
  const onLoad = () => {
    AssetFactory.getAboutMe()
      .then((response) => {
        $scope.defaultMeme = response.data.defaultMeme;
        $scope.aboutMe = response.data.info;
      })
      .catch((error) => {
        console.log('Something went terribly wrong!');
        console.error(error);
      });
  };

  $scope.defaultMeme = '';
  $scope.aboutMe = [];

  onLoad();
}
module.exports = {
  name: 'HomeController',
  controller: ['$scope', 'AssetFactory', 'jQuery', HomeController]
};
