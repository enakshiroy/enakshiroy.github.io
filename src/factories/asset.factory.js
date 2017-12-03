function AssetFactory($http) {
  const projectApi = "assets/projects.json";
  const aboutMeApi = "assets/about-me.json";
  const getProjects = () => $http.get(projectApi);
  const getAboutMe = () => $http.get(aboutMeApi);
  return {
    getProjects,
    getAboutMe
  };
}

module.exports = {
  name: "AssetFactory",
  factory: ["$http", AssetFactory]
};
